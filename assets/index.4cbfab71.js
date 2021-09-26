import{d as e,u as t,a,b as o,r,o as s,c as n,w as l,e as i,f as c,g as u,h as d,i as p,j as m,N as h,k as g,l as f,m as _,n as y,p as v,q as E}from"./vendor.2a44299e.js";var w=e({setup:e=>(window.$dialog=t(),(e,t)=>null)}),S=e({setup:e=>(window.$message=a(),(e,t)=>null)}),b=e({setup:e=>(window.$notification=o(),(e,t)=>null)}),O=e({setup:e=>(e,t)=>{const a=r("n-message-provider"),o=r("n-notification-provider"),d=r("n-dialog-provider");return s(),n(d,null,{default:l((()=>[i(c(w)),i(o,null,{default:l((()=>[i(c(b)),i(a,null,{default:l((()=>[i(c(S)),u(e.$slots,"default")])),_:3})])),_:1})])),_:1})}}),$=e({setup:e=>(e,t)=>{const a=r("router-view"),o=r("n-config-provider");return s(),n(o,null,{default:l((()=>[i(c(O),null,{default:l((()=>[i(a)])),_:1})])),_:1})}});let L;const P={},j=function(e,t){if(!t||0===t.length)return e();if(void 0===L){const e=document.createElement("link").relList;L=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if((e=`/${e}`)in P)return;P[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":L,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))},I=[{path:"/dashboard",name:"dashboard",component:()=>j((()=>import("./index.6c4da830.js")),[]),meta:{title:"Dashboard",sort:0}}];var K=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:I});var k=new class{constructor(){this.prefixKey="VUE3"}getKey(e){return`${this.prefixKey}${e}`.toUpperCase()}set(e,t){t&&(t=JSON.stringify(t)),localStorage.setItem(this.getKey(e),t)}get(e){const t=localStorage.getItem(this.getKey(e));return t?JSON.parse(t):null}remove(e=null){if(e)localStorage.removeItem(this.getKey(e));else for(let t=0;t<localStorage.length;t++){let e=localStorage.key(t);e&&localStorage.removeItem(e)}}clear(){localStorage.clear()}};const A=["/login"];const R=[{path:"/",name:"Root",redirect:"/dashboard",meta:{title:"Root"},children:[{path:"/:path(.*)*",name:"ErrorPage",component:()=>j((()=>import("./404.a4692705.js")),[]),meta:{title:"ErrorPage"}}]},{path:"/Login",name:"Login",component:()=>j((()=>import("./index.dc3a80a2.js")),["assets/index.dc3a80a2.js","assets/vendor.2a44299e.js"]),meta:{title:"登录"}},...(()=>{const e={"./modules/dashboard.ts":K},t=[];Object.keys(e).forEach((a=>{const o=e[a].default||{},r=Array.isArray(o)?[...o]:[o];t.push(...r)}));return t.sort(((e,t)=>(e.meta.sort||0)-(t.meta.sort||0)))})()],T=d({history:p(),routes:R,strict:!0,scrollBehavior:()=>({left:0,top:0})});function x(e){e.use(T),T.beforeEach((async(e,t,a)=>{"/login"!==t.path||"errorPage"!==e.name?A.includes(e.path)||e.meta.ignoreAuth||k.get("X-TOKEN")?a():a({path:"/login",replace:!0}):a("/dashboard")}))}const D=m({components:[h,g,t,f,o,_,a,y]});function N(e){e.use(D)}!async function(){const e=v($);e.use(E()).use(N),await x(e),await T.isReady(),e.mount("#app",!0)}();
