import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const ADMIN_PROXY_ID = "00000000-0000-0000-0000-000000000099";
const POST = async ({ request }) => {
  try {
    const { targetId, targetType, content } = await request.json();
    if (!targetId || !content) {
      return new Response(JSON.stringify({ ok: false, error: "Missing parameters" }), { status: 400 });
    }
    const supabase = createClient(
      "https://vjvcctqfjhjoxciuortg.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdmNjdHFmamhqb3hjaXVvcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzU5ODksImV4cCI6MjA3NzY1MTk4OX0.Cvoso9gtFiRvo2DrNt1JFyPQayoN5Nr_NPJnUzUc9xs"
    );
    let conversationId = null;
    if (targetType === "user") {
      const { data: existing } = await supabase.from("conversations").select("id").eq("user_id", targetId).eq("contractor_id", ADMIN_PROXY_ID).maybeSingle();
      if (existing) {
        conversationId = existing.id;
      } else {
        const { data: newConv, error: convErr } = await supabase.from("conversations").insert({ user_id: targetId, contractor_id: ADMIN_PROXY_ID }).select("id").single();
        if (convErr) throw convErr;
        conversationId = newConv.id;
      }
    } else {
      const { data: existing } = await supabase.from("conversations").select("id").eq("user_id", ADMIN_PROXY_ID).eq("contractor_id", targetId).maybeSingle();
      if (existing) {
        conversationId = existing.id;
      } else {
        const { data: newConv, error: convErr } = await supabase.from("conversations").insert({ user_id: ADMIN_PROXY_ID, contractor_id: targetId }).select("id").single();
        if (convErr) throw convErr;
        conversationId = newConv.id;
      }
    }
    const { error: msgErr } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: ADMIN_PROXY_ID,
      content,
      is_bot: true
    });
    if (msgErr) throw msgErr;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("[admin/send-message]", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
