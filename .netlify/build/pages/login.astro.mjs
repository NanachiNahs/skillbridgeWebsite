import { d as createComponent, j as renderHead, f as addAttribute, l as renderScript, r as renderTemplate } from '../chunks/astro/server_rmGjuNAn.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                       */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const pageTitle = "SkillBridge Admin - Login";
  const supabaseUrl = "https://vjvcctqfjhjoxciuortg.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdmNjdHFmamhqb3hjaXVvcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzU5ODksImV4cCI6MjA3NzY1MTk4OX0.Cvoso9gtFiRvo2DrNt1JFyPQayoN5Nr_NPJnUzUc9xs";
  return renderTemplate`<html lang="en" class="scroll-smooth" data-astro-cid-sgpqyurt> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><title>${pageTitle}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white font-['Inter'] selection:bg-[#00D632] selection:text-black min-h-screen flex items-center justify-center overflow-hidden bg-grid relative" data-astro-cid-sgpqyurt> <!-- Background glow --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D632] rounded-full blur-[150px] opacity-10 pointer-events-none" data-astro-cid-sgpqyurt></div> <div class="relative z-10 w-full max-w-md p-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl mx-4" data-astro-cid-sgpqyurt> <div class="text-center mb-8" data-astro-cid-sgpqyurt> <div class="w-16 h-16 bg-[#00D632] rounded-2xl mx-auto flex items-center justify-center text-black font-black text-3xl mb-6 shadow-[0_0_20px_rgba(0,214,50,0.5)]" data-astro-cid-sgpqyurt>S</div> <h1 class="text-3xl font-black uppercase tracking-tighter" data-astro-cid-sgpqyurt>Admin <span class="text-[#00D632]" data-astro-cid-sgpqyurt>Login</span></h1> <p class="text-zinc-400 mt-2" data-astro-cid-sgpqyurt>Access the SkillBridge management console</p> </div> <form id="loginForm" class="space-y-6"${addAttribute(supabaseUrl, "data-url")}${addAttribute(supabaseAnonKey, "data-key")} data-astro-cid-sgpqyurt> <div data-astro-cid-sgpqyurt> <label class="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2" data-astro-cid-sgpqyurt>Email Address</label> <input type="email" id="email" required class="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D632] transition" placeholder="admin@skillbridge.com" data-astro-cid-sgpqyurt> </div> <div data-astro-cid-sgpqyurt> <label class="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2" data-astro-cid-sgpqyurt>Password</label> <input type="password" id="password" required class="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D632] transition" placeholder="••••••••" data-astro-cid-sgpqyurt> </div> <div id="errorMessage" class="hidden bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center" data-astro-cid-sgpqyurt></div> <button type="submit" id="submitBtn" class="w-full px-6 py-4 bg-[#00D632] text-black font-black uppercase tracking-wider text-sm rounded-xl hover:bg-white transition duration-300 shadow-[0_0_20px_rgba(0,214,50,0.4)] flex justify-center items-center" data-astro-cid-sgpqyurt> <span data-astro-cid-sgpqyurt>Sign In</span> </button> </form> </div> ${renderScript($$result, "C:/xampp/htdocs/skillbridgeWebsite/src/pages/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/xampp/htdocs/skillbridgeWebsite/src/pages/login.astro", void 0);
const $$file = "C:/xampp/htdocs/skillbridgeWebsite/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
