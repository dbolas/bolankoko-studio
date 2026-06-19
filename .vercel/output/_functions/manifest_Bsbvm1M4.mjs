import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_B5MuoxEc.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DbelVFBg.mjs';
import 'es-module-lexer';

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

const manifest = deserializeManifest({"hrefRoot":"file:///home/adsl_2/projet_site_web_peintre/","cacheDir":"file:///home/adsl_2/projet_site_web_peintre/node_modules/.astro/","outDir":"file:///home/adsl_2/projet_site_web_peintre/dist/","srcDir":"file:///home/adsl_2/projet_site_web_peintre/src/","publicDir":"file:///home/adsl_2/projet_site_web_peintre/public/","buildClientDir":"file:///home/adsl_2/projet_site_web_peintre/dist/client/","buildServerDir":"file:///home/adsl_2/projet_site_web_peintre/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"mentions-legales/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BpxyXxtu.css"}],"routeData":{"route":"/mentions-legales","isIndex":false,"type":"page","pattern":"^\\/mentions-legales\\/?$","segments":[[{"content":"mentions-legales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mentions-legales.astro","pathname":"/mentions-legales","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"merci/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BpxyXxtu.css"}],"routeData":{"route":"/merci","isIndex":false,"type":"page","pattern":"^\\/merci\\/?$","segments":[[{"content":"merci","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/merci.astro","pathname":"/merci","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BpxyXxtu.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/audit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/audit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"audit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/audit.ts","pathname":"/api/audit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/adsl_2/projet_site_web_peintre/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/adsl_2/projet_site_web_peintre/src/pages/mentions-legales.astro",{"propagation":"none","containsHead":true}],["/home/adsl_2/projet_site_web_peintre/src/pages/merci.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/api/audit@_@ts":"pages/api/audit.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/mentions-legales@_@astro":"pages/mentions-legales.astro.mjs","\u0000@astro-page:src/pages/merci@_@astro":"pages/merci.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Bsbvm1M4.mjs","/home/adsl_2/projet_site_web_peintre/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CeTgNN5x.mjs","/home/adsl_2/projet_site_web_peintre/src/components/AuditForm.astro?astro&type=script&index=0&lang.ts":"_astro/AuditForm.astro_astro_type_script_index_0_lang.CZH4xA0l.js","/home/adsl_2/projet_site_web_peintre/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.BI9Y4ihH.js","/home/adsl_2/projet_site_web_peintre/src/layouts/Base.astro?astro&type=script&index=0&lang.ts":"_astro/Base.astro_astro_type_script_index_0_lang.CNAV0pO1.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/adsl_2/projet_site_web_peintre/src/components/AuditForm.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"audit-form\"),n=document.getElementById(\"form-status\");if(e&&n){const t=e.querySelector('button[type=\"submit\"]'),r=t.textContent;e.addEventListener(\"submit\",async s=>{if(s.preventDefault(),n.classList.remove(\"text-paper/70\"),n.textContent=\"\",!e.checkValidity()){n.textContent=\"Merci de remplir les champs obligatoires.\",e.reportValidity();return}t.disabled=!0,t.textContent=\"Envoi en cours…\";try{const o=await fetch(e.action,{method:\"POST\",headers:{Accept:\"application/json\"},body:new FormData(e)});if(o.ok){e.reset(),n.textContent=\"Merci ! Votre demande est bien reçue — je reviens vers vous très vite.\",t.textContent=\"Demande envoyée ✓\",t.disabled=!0;return}throw new Error(String(o.status))}catch{n.textContent=\"Oups, l'envoi a échoué. Réessayez ou appelez-moi directement.\",t.disabled=!1,t.textContent=r}})}"],["/home/adsl_2/projet_site_web_peintre/src/components/Nav.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"[data-nav]\");if(e){const o=()=>e.classList.toggle(\"border-ink/10\",window.scrollY>8);o(),window.addEventListener(\"scroll\",o,{passive:!0})}"],["/home/adsl_2/projet_site_web_peintre/src/layouts/Base.astro?astro&type=script&index=0&lang.ts","const a=window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches,r=document.querySelectorAll(\".reveal\");if(a||!(\"IntersectionObserver\"in window))r.forEach(e=>e.classList.add(\"is-visible\"));else{const e=new IntersectionObserver(t=>{t.forEach(i=>{if(i.isIntersecting){const s=i.target,o=s.dataset.delay??\"0\";s.style.animationDelay=`${o}ms`,s.classList.add(\"is-visible\"),e.unobserve(s)}})},{threshold:.15,rootMargin:\"0px 0px -10% 0px\"});r.forEach(t=>e.observe(t))}"]],"assets":["/_astro/fraunces-vietnamese-wght-normal.CnvboYUG.woff2","/_astro/fraunces-latin-ext-wght-normal.Ca2vKHc0.woff2","/_astro/fraunces-latin-wght-normal.ukD16Tqj.woff2","/_astro/manrope-cyrillic-wght-normal.Dvxsihut.woff2","/_astro/manrope-greek-wght-normal.DL7QRZyv.woff2","/_astro/manrope-vietnamese-wght-normal.usUDDRr7.woff2","/_astro/manrope-latin-ext-wght-normal.Ch3YOpNY.woff2","/_astro/fragment-mono-latin-ext-400-normal.BbKYyvR9.woff2","/_astro/manrope-latin-wght-normal.DHIcAJRg.woff2","/_astro/fragment-mono-latin-400-normal.yxdJ5AmL.woff2","/_astro/fragment-mono-latin-ext-400-normal.CT4YFKeK.woff","/_astro/fragment-mono-latin-400-normal.BYwT3kSJ.woff","/_astro/index.BpxyXxtu.css","/favicon.svg","/images/hero.png","/images/portrait.png","/images/projet-1.png","/images/projet-2.png","/images/projet-3.png","/mentions-legales/index.html","/merci/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"+7SWITSmq3IvMwrMdb+fviSrl0+JUrISkE7hZNH89Io="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
