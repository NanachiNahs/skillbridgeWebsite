import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Tl_k6LrF.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/ai-insights.astro.mjs');
const _page2 = () => import('./pages/api/admin/send-message.astro.mjs');
const _page3 = () => import('./pages/api/admin/update-status.astro.mjs');
const _page4 = () => import('./pages/api/chat.astro.mjs');
const _page5 = () => import('./pages/api/forecast.astro.mjs');
const _page6 = () => import('./pages/home.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/users.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/ai-insights.astro", _page1],
    ["src/pages/api/admin/send-message.ts", _page2],
    ["src/pages/api/admin/update-status.ts", _page3],
    ["src/pages/api/chat.ts", _page4],
    ["src/pages/api/forecast.ts", _page5],
    ["src/pages/home.astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/users.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "ec2436bd-9e9f-4cc1-8c20-879be0444868"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
