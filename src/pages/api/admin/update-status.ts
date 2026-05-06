import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const VALID_TABLES = ['users', 'contractors'] as const;
const VALID_STATUSES = ['active', 'suspended', 'inactive'] as const;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, table, status } = await request.json();

    if (!id || !table || !status) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing parameters' }), { status: 400 });
    }
    if (!VALID_TABLES.includes(table)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid table' }), { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid status' }), { status: 400 });
    }

    // Prefer service role key (bypasses RLS), fall back to anon key (works when RLS is off)
    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = import.meta.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    const keyToUse = (serviceKey && serviceKey !== 'your_service_role_key_here') ? serviceKey : anonKey;

    const supabase = createClient(
      import.meta.env.EXPO_PUBLIC_SUPABASE_URL,
      keyToUse
    );

    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    console.log(`[update-status] ${table}.${id} → ${status}`);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err: any) {
    console.error('[admin/update-status]', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};
