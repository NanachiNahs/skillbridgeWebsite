import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

/**
 * Server-side proxy for all dashboard data queries.
 * Uses the service_role key to bypass RLS.
 * The admin website's client-side JS calls this instead of querying Supabase directly.
 */
export const GET: APIRoute = async () => {
  try {
    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    const keyToUse = (serviceKey && serviceKey !== 'your_service_role_key_here') ? serviceKey : anonKey;

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      keyToUse
    );

    // Fetch all dashboard data in parallel
    const [usersRes, contractorsRes, bookingsRes, recentBksRes, allBksRes] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('contractors').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
      supabase
        .from('bookings')
        .select('id, status, created_at, users(first_name, last_name), contractors(business_name)')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('bookings')
        .select('contractors(business_name)')
    ]);

    return new Response(JSON.stringify({
      ok: true,
      usersCount: usersRes.count || 0,
      contractorsCount: contractorsRes.count || 0,
      bookingsCount: bookingsRes.count || 0,
      recentBookings: recentBksRes.data || [],
      allBookings: allBksRes.data || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[admin/dashboard-data]', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};
