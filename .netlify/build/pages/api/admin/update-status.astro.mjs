import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const VALID_TABLES = ["users", "contractors"];
const VALID_STATUSES = ["active", "suspended", "inactive"];
const POST = async ({ request }) => {
  try {
    const { id, table, status } = await request.json();
    if (!id || !table || !status) {
      return new Response(JSON.stringify({ ok: false, error: "Missing parameters" }), { status: 400 });
    }
    if (!VALID_TABLES.includes(table)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid table" }), { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid status" }), { status: 400 });
    }
    const serviceKey = undefined                                         ;
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdmNjdHFmamhqb3hjaXVvcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzU5ODksImV4cCI6MjA3NzY1MTk4OX0.Cvoso9gtFiRvo2DrNt1JFyPQayoN5Nr_NPJnUzUc9xs";
    const keyToUse = serviceKey && serviceKey !== "your_service_role_key_here" ? serviceKey : anonKey;
    const supabase = createClient(
      "https://vjvcctqfjhjoxciuortg.supabase.co",
      keyToUse
    );
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) throw error;
    console.log(`[update-status] ${table}.${id} → ${status}`);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("[admin/update-status]", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
