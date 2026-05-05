import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const GET: APIRoute = async () => {
    try {
        const supabase = createClient(
            import.meta.env.EXPO_PUBLIC_SUPABASE_URL,
            import.meta.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
        );

        const [
            { data: bookings },
            { data: users },
            { data: contractors }
        ] = await Promise.all([
            supabase.from('bookings').select('*').limit(100),
            supabase.from('users').select('id, created_at, location').limit(100),
            supabase.from('contractors').select('id, business_name, location, city, created_at').limit(200)
        ]);

        const totalBookings = bookings?.length ?? 0;
        const completedBookings = bookings?.filter(b => b.status === 'completed').length ?? 0;
        const avgBookingValue = 150;
        const actualGMV = totalBookings * avgBookingValue;
        const completionRate = totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : '0';
        const statusBreakdown = { completed: 0, pending: 0, cancelled: 0, disputed: 0 };
        bookings?.forEach(b => {
            const s = (b.status || 'pending').toLowerCase();
            if (s in statusBreakdown) (statusBreakdown as any)[s]++;
        });

        const cityMap: Record<string, number> = {};
        contractors?.forEach(c => {
            const city = c.city || c.location || 'Unknown';
            cityMap[city] = (cityMap[city] || 0) + 1;
        });
        const cityDistribution = Object.entries(cityMap)
            .sort((a, b) => b[1] - a[1])
            .map(([city, contractorCount]) => ({ city, contractorCount }));

        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
        const thisMonthBookings = bookings?.filter(b => b.created_at >= thisMonthStart).length ?? 0;
        const lastMonthBookings = bookings?.filter(b => b.created_at >= lastMonthStart && b.created_at < thisMonthStart).length ?? 0;

        const genAI = new GoogleGenerativeAI(import.meta.env.EXPO_PUBLIC_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `You are a strict, data-driven business analyst for SkillBridge, a blue-collar home services platform in Sarawak, Malaysia.

ACTUAL PLATFORM DATA (use these exact numbers — do not invent figures):
- Total bookings to date: ${totalBookings}
- Completed bookings: ${completedBookings} (${completionRate}% completion rate)
- Actual GMV: RM ${actualGMV} (at RM ${avgBookingValue} per booking average)
- This month bookings: ${thisMonthBookings}
- Last month bookings: ${lastMonthBookings}
- Total registered users: ${users?.length ?? 0}
- Total contractors: ${contractors?.length ?? 0}
- Contractor distribution by city: ${JSON.stringify(cityDistribution)}
- Booking status breakdown: ${JSON.stringify(statusBreakdown)}

RULES:
1. "revenue": Base Q3 projection on actual GMV (RM ${actualGMV}). Realistic 20-50% quarterly growth. Do NOT suggest millions if GMV is hundreds or thousands.
2. "expansion": Suggest a new city ONLY if top city has 20+ contractors. Otherwise, say current city needs more depth first.
3. "nextExpansion": Suggest next Sarawak city (Miri, Sibu, Bintulu, Samarahan, Serian, Betong, Kapit, Sri Aman etc).
4. "churn": Compute from statuses. High dispute = high churn risk.
5. Keep all text 1 sentence, factual, grounded in numbers above.

Return ONLY valid JSON (no markdown, no backticks):
{"revenue":"RM [amount]","revenueText":"[1 sentence]","churn":"[Level] ([%]%)","churnText":"[1 sentence]","expansion":"[city]","expansionText":"[1 sentence]","nextExpansion":"[city]","nextExpansionText":"[1 sentence]"}`;

        const result = await model.generateContent(prompt);
        let text = result.response.text();
        text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        const forecast = JSON.parse(text);

        return new Response(JSON.stringify({ ok: true, forecast }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err: any) {
        console.error('Forecast API error:', err);
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
