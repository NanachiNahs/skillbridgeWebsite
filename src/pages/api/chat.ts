import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { message, history } = await request.json();
        if (!message?.trim()) {
            return new Response(JSON.stringify({ ok: false, error: 'No message provided' }), { status: 400 });
        }

        // Use service_role key to bypass RLS — admin AI chat needs full read access
        const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
        const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
        const keyToUse = (serviceKey && serviceKey !== 'your_service_role_key_here') ? serviceKey : anonKey;

        const supabase = createClient(
            import.meta.env.PUBLIC_SUPABASE_URL,
            keyToUse
        );

        // Pull live platform context for every query
        const [
            { data: bookings },
            { data: users },
            { data: contractors }
        ] = await Promise.all([
            supabase.from('bookings').select('id, status, created_at, total_amount').limit(100),
            supabase.from('users').select('id, created_at, location').limit(100),
            supabase.from('contractors').select('id, business_name, city, location, created_at').limit(200)
        ]);

        const totalBookings = bookings?.length ?? 0;
        const completed = bookings?.filter(b => b.status === 'completed').length ?? 0;
        const pending = bookings?.filter(b => b.status === 'pending').length ?? 0;
        const disputed = bookings?.filter(b => b.status === 'disputed').length ?? 0;
        const gmv = totalBookings * 150;

        const cityMap: Record<string, number> = {};
        contractors?.forEach(c => {
            const city = c.city || c.location || 'Unknown';
            cityMap[city] = (cityMap[city] || 0) + 1;
        });
        const cityDistribution = Object.entries(cityMap)
            .sort((a, b) => b[1] - a[1])
            .map(([city, count]) => `${city}: ${count} contractors`)
            .join(', ');

        const systemPrompt = `You are SkillBridge AI, an expert business analyst assistant for the SkillBridge admin dashboard.
SkillBridge is a blue-collar home services marketplace in Sarawak, Malaysia (plumbing, electrical, cleaning, etc.)

LIVE PLATFORM CONTEXT (as of now):
- Total users: ${users?.length ?? 0}
- Total contractors: ${contractors?.length ?? 0}
- Total bookings: ${totalBookings}
- Completed: ${completed} | Pending: ${pending} | Disputed: ${disputed}
- Completion rate: ${totalBookings > 0 ? ((completed / totalBookings) * 100).toFixed(1) : 0}%
- Estimated GMV: RM ${gmv} (@ RM150 avg booking)
- Contractor cities: ${cityDistribution || 'No data'}

You answer business questions about SkillBridge clearly and concisely.
Use bullet points where helpful. Be factual. If you don't know something not in the data, say so.
Format responses in plain text — no markdown headers or backtick blocks.`;

        const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: systemPrompt
        });

        // Reconstruct chat history for multi-turn context
        const chat = model.startChat({
            history: (history || []).map((m: { role: string; text: string }) => ({
                role: m.role,
                parts: [{ text: m.text }]
            }))
        });

        const result = await chat.sendMessage(message);
        const reply = result.response.text();

        return new Response(JSON.stringify({ ok: true, reply }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err: any) {
        console.error('Chat API error:', err);
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
