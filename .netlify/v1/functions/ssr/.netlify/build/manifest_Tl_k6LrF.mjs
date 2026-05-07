import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { n as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_rmGjuNAn.mjs';
import 'clsx';
import './chunks/shared_9gEenf6c.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/xampp/htdocs/skillbridgeWebsite/","cacheDir":"file:///C:/xampp/htdocs/skillbridgeWebsite/node_modules/.astro/","outDir":"file:///C:/xampp/htdocs/skillbridgeWebsite/dist/","srcDir":"file:///C:/xampp/htdocs/skillbridgeWebsite/src/","publicDir":"file:///C:/xampp/htdocs/skillbridgeWebsite/public/","buildClientDir":"file:///C:/xampp/htdocs/skillbridgeWebsite/dist/","buildServerDir":"file:///C:/xampp/htdocs/skillbridgeWebsite/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai-insights.BeYAy2eU.css"},{"type":"inline","content":".bg-grid[data-astro-cid-zwf5hys5]{background-size:40px 40px;background-image:linear-gradient(to right,rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.03) 1px,transparent 1px)}[data-astro-cid-zwf5hys5]::-webkit-scrollbar{width:6px}[data-astro-cid-zwf5hys5]::-webkit-scrollbar-track{background:#000}[data-astro-cid-zwf5hys5]::-webkit-scrollbar-thumb{background:#333;border-radius:4px}[data-astro-cid-zwf5hys5]::-webkit-scrollbar-thumb:hover{background:#a855f7}.glass-card[data-astro-cid-zwf5hys5]{background:#18181bd9;backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.06)}.typing-dot[data-astro-cid-zwf5hys5]{animation:bounce 1.2s infinite}.typing-dot[data-astro-cid-zwf5hys5]:nth-child(2){animation-delay:.2s}.typing-dot[data-astro-cid-zwf5hys5]:nth-child(3){animation-delay:.4s}@keyframes bounce{0%,80%,to{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}.msg-enter[data-astro-cid-zwf5hys5]{animation:msgIn .25s ease-out}@keyframes msgIn{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.chip[data-astro-cid-zwf5hys5]:hover{background:#a855f726;border-color:#a855f780}#chatInput[data-astro-cid-zwf5hys5]{resize:none;min-height:52px;max-height:160px;overflow-y:auto;font-size:1rem}\n"}],"routeData":{"route":"/ai-insights","isIndex":false,"type":"page","pattern":"^\\/ai-insights\\/?$","segments":[[{"content":"ai-insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ai-insights.astro","pathname":"/ai-insights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/send-message","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/send-message\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"send-message","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/send-message.ts","pathname":"/api/admin/send-message","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/update-status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/update-status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"update-status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/update-status.ts","pathname":"/api/admin/update-status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/forecast","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/forecast\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"forecast","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/forecast.ts","pathname":"/api/forecast","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai-insights.BeYAy2eU.css"},{"type":"inline","content":".bg-grid[data-astro-cid-reuxuyy6]{background-size:40px 40px;background-image:linear-gradient(to right,rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.03) 1px,transparent 1px)}[data-astro-cid-reuxuyy6]::-webkit-scrollbar{width:8px}[data-astro-cid-reuxuyy6]::-webkit-scrollbar-track{background:#000}[data-astro-cid-reuxuyy6]::-webkit-scrollbar-thumb{background:#333;border-radius:4px}[data-astro-cid-reuxuyy6]::-webkit-scrollbar-thumb:hover{background:#00d632}.glass-card[data-astro-cid-reuxuyy6]{background:#18181bcc;backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.05)}\n"}],"routeData":{"route":"/home","isIndex":false,"type":"page","pattern":"^\\/home\\/?$","segments":[[{"content":"home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/home.astro","pathname":"/home","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai-insights.BeYAy2eU.css"},{"type":"inline","content":".bg-grid[data-astro-cid-sgpqyurt]{background-size:50px 50px;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px)}\n"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai-insights.BeYAy2eU.css"},{"type":"inline","content":".bg-grid[data-astro-cid-jgw6h6gj]{background-size:40px 40px;background-image:linear-gradient(to right,rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.03) 1px,transparent 1px)}[data-astro-cid-jgw6h6gj]::-webkit-scrollbar{width:6px}[data-astro-cid-jgw6h6gj]::-webkit-scrollbar-track{background:#000}[data-astro-cid-jgw6h6gj]::-webkit-scrollbar-thumb{background:#333;border-radius:4px}[data-astro-cid-jgw6h6gj]::-webkit-scrollbar-thumb:hover{background:#00d632}.glass-card[data-astro-cid-jgw6h6gj]{background:#18181bd9;backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.06)}.tab-btn[data-astro-cid-jgw6h6gj]{transition:all .2s;color:#71717a;border:1px solid transparent}.tab-btn[data-astro-cid-jgw6h6gj].active{color:#00d632;border-color:#00d632;background:#00d6321a}.tab-btn[data-astro-cid-jgw6h6gj]:not(.active):hover{color:#fff}tbody[data-astro-cid-jgw6h6gj] tr[data-astro-cid-jgw6h6gj]:hover td[data-astro-cid-jgw6h6gj]{background:#ffffff08}\n"}],"routeData":{"route":"/users","isIndex":false,"type":"page","pattern":"^\\/users\\/?$","segments":[[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/users.astro","pathname":"/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai-insights.BeYAy2eU.css"},{"type":"inline","content":".animate-marquee[data-astro-cid-j7pv25f6]{animation:marquee 30s linear infinite}@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.bg-grid[data-astro-cid-j7pv25f6]{background-size:50px 50px;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px)}details[data-astro-cid-j7pv25f6]>summary[data-astro-cid-j7pv25f6]{list-style:none}details[data-astro-cid-j7pv25f6]>summary[data-astro-cid-j7pv25f6]::-webkit-details-marker{display:none}details[data-astro-cid-j7pv25f6][open] summary[data-astro-cid-j7pv25f6]~[data-astro-cid-j7pv25f6]{animation:sweep .3s ease-in-out}@keyframes sweep{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/xampp/htdocs/skillbridgeWebsite/src/pages/ai-insights.astro",{"propagation":"none","containsHead":true}],["C:/xampp/htdocs/skillbridgeWebsite/src/pages/home.astro",{"propagation":"none","containsHead":true}],["C:/xampp/htdocs/skillbridgeWebsite/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/xampp/htdocs/skillbridgeWebsite/src/pages/users.astro",{"propagation":"none","containsHead":true}],["C:/xampp/htdocs/skillbridgeWebsite/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/ai-insights@_@astro":"pages/ai-insights.astro.mjs","\u0000@astro-page:src/pages/api/admin/send-message@_@ts":"pages/api/admin/send-message.astro.mjs","\u0000@astro-page:src/pages/api/admin/update-status@_@ts":"pages/api/admin/update-status.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/api/forecast@_@ts":"pages/api/forecast.astro.mjs","\u0000@astro-page:src/pages/home@_@astro":"pages/home.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/users@_@astro":"pages/users.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Tl_k6LrF.mjs","C:/xampp/htdocs/skillbridgeWebsite/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:/xampp/htdocs/skillbridgeWebsite/src/pages/users.astro?astro&type=script&index=1&lang.ts":"_astro/users.astro_astro_type_script_index_1_lang.BRfm_JLr.js","C:/xampp/htdocs/skillbridgeWebsite/src/pages/ai-insights.astro?astro&type=script&index=0&lang.ts":"_astro/ai-insights.astro_astro_type_script_index_0_lang.BTzEsh4m.js","C:/xampp/htdocs/skillbridgeWebsite/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.J_esBVeF.js","C:/xampp/htdocs/skillbridgeWebsite/src/pages/users.astro?astro&type=script&index=0&lang.ts":"_astro/users.astro_astro_type_script_index_0_lang.CVCusvE4.js","C:/xampp/htdocs/skillbridgeWebsite/src/components/SideMenu.astro?astro&type=script&index=0&lang.ts":"_astro/SideMenu.astro_astro_type_script_index_0_lang.C_qhAS0f.js","C:/xampp/htdocs/skillbridgeWebsite/src/pages/home.astro?astro&type=script&index=0&lang.ts":"_astro/home.astro_astro_type_script_index_0_lang.Bs4V7n6m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/xampp/htdocs/skillbridgeWebsite/src/components/SideMenu.astro?astro&type=script&index=0&lang.ts","const c=document.getElementById(\"menuToggle\"),t=document.getElementById(\"mobileDropdown\"),n=document.getElementById(\"iconHamburger\"),o=document.getElementById(\"iconClose\");let e=!1;function i(){e=!e,t?.classList.toggle(\"hidden\",!e),n?.classList.toggle(\"hidden\",e),o?.classList.toggle(\"hidden\",!e)}c?.addEventListener(\"click\",i);t?.querySelectorAll(\"a\").forEach(l=>l.addEventListener(\"click\",()=>{e=!1,t.classList.add(\"hidden\"),n?.classList.remove(\"hidden\"),o?.classList.add(\"hidden\")}));const d=()=>{localStorage.removeItem(\"sb_admin\"),document.cookie=\"sb_admin_session=; path=/; max-age=0; SameSite=Strict\",window.location.href=\"/login\"};document.getElementById(\"logoutBtnMobile\")?.addEventListener(\"click\",d);document.getElementById(\"logoutBtn\")?.addEventListener(\"click\",d);"]],"assets":["/_astro/searchpage.BSOojcWb.jpeg","/_astro/builders.CYUC4y0l.jpeg","/_astro/cartpage.D7ApGLnk.jpeg","/_astro/homepage.CnpGyEmM.jpeg","/_astro/ai-insights.BeYAy2eU.css","/favicon.svg","/_astro/ai-insights.astro_astro_type_script_index_0_lang.BTzEsh4m.js","/_astro/home.astro_astro_type_script_index_0_lang.Bs4V7n6m.js","/_astro/index.B-jIxwbw.js","/_astro/login.astro_astro_type_script_index_0_lang.J_esBVeF.js","/_astro/users.astro_astro_type_script_index_0_lang.CVCusvE4.js","/_astro/users.astro_astro_type_script_index_1_lang.BRfm_JLr.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"UVo/QbHV9/ivc4XuDBGGa/aBq+4IMDjU/Z36tYN1pcQ=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
