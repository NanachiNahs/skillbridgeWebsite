import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Fixed UUID for the SkillBridge Admin proxy account.
// Created by: supabase/migrations/create_admin_proxy.sql
const ADMIN_PROXY_ID = '00000000-0000-0000-0000-000000000099';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { targetId, targetType, content } = await request.json();

    if (!targetId || !content) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing parameters' }), { status: 400 });
    }

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    let conversationId: string | null = null;

    if (targetType === 'user') {
      // Admin (as contractor ADMIN_PROXY_ID) → User
      // This creates a SEPARATE conversation from any real contractor thread
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', targetId)
        .eq('contractor_id', ADMIN_PROXY_ID)
        .maybeSingle();

      if (existing) {
        conversationId = existing.id;
      } else {
        const { data: newConv, error: convErr } = await supabase
          .from('conversations')
          .insert({ user_id: targetId, contractor_id: ADMIN_PROXY_ID })
          .select('id')
          .single();
        if (convErr) throw convErr;
        conversationId = newConv.id;
      }
    } else {
      // Admin (as user ADMIN_PROXY_ID) → Contractor
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', ADMIN_PROXY_ID)
        .eq('contractor_id', targetId)
        .maybeSingle();

      if (existing) {
        conversationId = existing.id;
      } else {
        const { data: newConv, error: convErr } = await supabase
          .from('conversations')
          .insert({ user_id: ADMIN_PROXY_ID, contractor_id: targetId })
          .select('id')
          .single();
        if (convErr) throw convErr;
        conversationId = newConv.id;
      }
    }

    // Insert the message marked as is_bot so the app shows "SkillBridge Admin"
    const { error: msgErr } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: ADMIN_PROXY_ID,
      content,
      is_bot: true,
    });

    if (msgErr) throw msgErr;

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err: any) {
    console.error('[admin/send-message]', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};
