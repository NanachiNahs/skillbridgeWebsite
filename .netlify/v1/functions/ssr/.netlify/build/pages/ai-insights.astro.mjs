import { d as createComponent, j as renderHead, k as renderComponent, f as addAttribute, r as renderTemplate, l as renderScript } from '../chunks/astro/server_rmGjuNAn.mjs';
import 'piccolore';
/* empty css                                       */
import { $ as $$SideMenu } from '../chunks/SideMenu_gdQ5y7p6.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$AiInsights = createComponent(async ($$result, $$props, $$slots) => {
  const pageTitle = "SkillBridge Admin - AI Insights";
  return renderTemplate`<html lang="en" class="scroll-smooth overflow-x-clip" data-astro-cid-zwf5hys5> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><title>${pageTitle}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white font-['Inter'] selection:bg-purple-500 selection:text-white min-h-screen bg-grid overflow-x-hidden" data-astro-cid-zwf5hys5> ${renderComponent($$result, "SideMenu", $$SideMenu, { "data-astro-cid-zwf5hys5": true })} <main class="lg:ml-64 pt-16 lg:pt-0 flex flex-col h-screen" data-astro-cid-zwf5hys5> <!-- Top Bar --> <div class="shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/60 backdrop-blur-xl" data-astro-cid-zwf5hys5> <div class="flex items-center gap-4" data-astro-cid-zwf5hys5> <br data-astro-cid-zwf5hys5> <div class="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/40 text-purple-400 shrink-0" data-astro-cid-zwf5hys5> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-zwf5hys5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-zwf5hys5></path></svg> </div> <div data-astro-cid-zwf5hys5> <h1 class="text-base lg:text-xl font-black uppercase tracking-tight" data-astro-cid-zwf5hys5>SkillBridge <span class="text-purple-400" data-astro-cid-zwf5hys5>AI</span></h1> <p class="text-xs lg:text-sm text-zinc-500" data-astro-cid-zwf5hys5>Powered by Gemini 2.5 Flash · Aware of live platform data</p> </div> </div> <button id="clearChat" class="text-xs lg:text-sm text-zinc-600 hover:text-red-400 border border-white/5 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider" data-astro-cid-zwf5hys5>
Clear Chat
</button> </div> <!-- Chat Messages --> <div id="chatMessages" class="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-6 space-y-6" data-astro-cid-zwf5hys5> <!-- Welcome message (shown when chat is empty) --> <div id="welcomeBlock" class="max-w-3xl mx-auto" data-astro-cid-zwf5hys5> <div class="text-center mb-10 pt-4" data-astro-cid-zwf5hys5> <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30 mx-auto mb-4" data-astro-cid-zwf5hys5> <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-zwf5hys5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-zwf5hys5></path></svg> </div> <h2 class="text-xl lg:text-3xl font-black text-white mb-2" data-astro-cid-zwf5hys5>How can I help you today?</h2> <p class="text-zinc-500 text-sm lg:text-base" data-astro-cid-zwf5hys5>Ask me anything about your platform — bookings, contractors, revenue, growth strategy.</p> </div> <!-- Suggestion chips --> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" data-astro-cid-zwf5hys5> ${[
    { icon: "\u{1F4CA}", text: "How are bookings trending this month?" },
    { icon: "\u{1F3D9}\uFE0F", text: "Which city should we expand to next?" },
    { icon: "\u26A0\uFE0F", text: "What is our current churn risk?" },
    { icon: "\u{1F4B0}", text: "What is our estimated revenue for Q3?" },
    { icon: "\u{1F527}", text: "Who are the top performing contractors?" },
    { icon: "\u{1F4C9}", text: "Why are there disputed bookings?" }
  ].map((chip) => renderTemplate`<button class="chip text-left px-3 py-3 lg:px-4 lg:py-4 rounded-xl border border-white/8 text-zinc-300 text-sm lg:text-base transition-colors flex items-start gap-3 bg-zinc-900/40"${addAttribute(chip.text, "data-prompt")} data-astro-cid-zwf5hys5> <span class="text-base lg:text-xl shrink-0" data-astro-cid-zwf5hys5>${chip.icon}</span> <span data-astro-cid-zwf5hys5>${chip.text}</span> </button>`)} </div> </div> </div> <!-- Input Bar --> <div class="shrink-0 border-t border-white/5 bg-black/60 backdrop-blur-xl px-4 sm:px-6 py-4" data-astro-cid-zwf5hys5> <div class="max-w-3xl mx-auto" data-astro-cid-zwf5hys5> <div class="flex items-end gap-3 glass-card rounded-2xl border border-white/10 px-4 py-3 focus-within:border-purple-500/50 transition-colors" data-astro-cid-zwf5hys5> <textarea id="chatInput" placeholder="Ask anything about your platform..." rows="1" class="flex-1 bg-transparent text-white placeholder-zinc-600 text-sm lg:text-base outline-none leading-relaxed" data-astro-cid-zwf5hys5></textarea> <button id="sendBtn" class="w-9 h-9 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0" disabled data-astro-cid-zwf5hys5> <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-zwf5hys5> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M12 5l7 7-7 7" data-astro-cid-zwf5hys5></path> </svg> </button> </div> <p class="text-center text-zinc-600 text-xs mt-2" data-astro-cid-zwf5hys5>AI responses are based on live Supabase data. Always verify before acting.</p> </div> </div> </main> ${renderScript($$result, "C:/xampp/htdocs/skillbridgeWebsite/src/pages/ai-insights.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/xampp/htdocs/skillbridgeWebsite/src/pages/ai-insights.astro", void 0);

const $$file = "C:/xampp/htdocs/skillbridgeWebsite/src/pages/ai-insights.astro";
const $$url = "/ai-insights";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AiInsights,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
