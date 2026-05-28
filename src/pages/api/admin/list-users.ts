import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const ADMIN_PROXY_ID = '00000000-0000-0000-0000-000000000099';

/**
 * Server-side proxy for listing users/contractors.
 * Uses the service_role key to bypass RLS.
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    const table = url.searchParams.get('table') || 'users';
    if (table !== 'users' && table !== 'contractors') {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid table' }), { status: 400 });
    }

    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    const keyToUse = (serviceKey && serviceKey !== 'your_service_role_key_here') ? serviceKey : anonKey;

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      keyToUse
    );

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .neq('id', ADMIN_PROXY_ID)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, data: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[admin/list-users]', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};
