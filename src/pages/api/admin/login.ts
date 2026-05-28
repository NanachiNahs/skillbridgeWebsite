import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

/**
 * Server-side admin login endpoint.
 * Queries the `admins` table using the service_role key (bypasses RLS).
 * The client never touches the admins table directly.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ ok: false, error: 'Email and password are required' }), { status: 400 });
    }

    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    const keyToUse = (serviceKey && serviceKey !== 'your_service_role_key_here') ? serviceKey : anonKey;

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      keyToUse
    );

    // Query the admins table
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email or password' }), { status: 401 });
    }

    // Simple password match against password_hash
    if (data.password_hash !== password) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email or password' }), { status: 401 });
    }

    // Return admin data for the client to store in localStorage
    return new Response(JSON.stringify({
      ok: true,
      admin: {
        id: data.id,
        email: data.email,
        role: data.role,
        name: `${data.first_name} ${data.last_name}`
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[admin/login]', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};
