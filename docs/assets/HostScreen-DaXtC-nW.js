import{j as o,s as kt}from"./index-M8bbDGCf.js";import{r as ee,a as ml}from"./vendor-Y8-lBF4Z.js";import{c as gl,r as Rd,l as Cd,s as xl,a as _l,f as tr,b as Nd,g as Zr,d as ks,e as Zi,h as ti,u as Pd,R as Ld,i as Dd,j as Kr,k as Id,m as Ci,n as Gs,o as vl,p as nr,t as Ud,q as Fd,v as Od,w as Bd,x as Co,y as zd,N as No,S as kd,z as Po,A as ur,B as Gd,M as Lo,C as Do,D as Io,E as Uo,F as Hd,G as Ei,H as Vd,I as Wd,J as jd,K as Xd}from"./teamColors-Bqq2MeLe.js";import{m as qe,l as Ni,u as Ka,p as qd,I as $d}from"./duration-Dzsd1XBq.js";import{m as Yd}from"./answerCheck-nAaq523L.js";import{a as Ml,s as Zd,b as Jr,u as fn,c as kn,o as Kd,d as Jd,i as Qd,e as Qr,f as Fo,g as Sl,h as yl,r as bl}from"./raceActions-BbWGrDjQ.js";import{l as eu,a as tu,d as Qn,m as Oo}from"./packLoader-nWTnIu2S.js";import{T as nu,S as iu}from"./ThemeLayer-CtTZ0R2V.js";import{C as su}from"./CrosswordView-CrH6-f-3.js";function ru(n){return n<=1?{top:!1,cols:1}:n===2?{top:!1,cols:2}:n===3?{top:!0,cols:2}:n===4?{top:!1,cols:2}:n===5?{top:!0,cols:2}:{top:n%2===1,cols:n<=6?3:4}}const au=n=>String(Math.max(0,Math.ceil(n/1e3)));function Bo({team:n,state:e,active:t,now:i}){const s=Cd(e,n.id,i),r=(e.correct[n.id]??0)-(e.missed[n.id]??0),a=s<=1e4;return o.jsxs("div",{className:`bz-block${t?" on":""}${a&&t?" low":""}`,style:{"--tc":n.color},children:[t&&o.jsx("span",{className:"bz-turn",children:"ХОД"}),o.jsx("div",{className:"bz-name",children:n.name}),o.jsx("div",{className:`bz-timer${a?" low":""}`,children:au(s)}),o.jsxs("div",{className:"bz-meta",children:[o.jsx("span",{className:"bz-pts",children:r>0?`+${r}`:r}),o.jsxs("span",{className:"bz-qn",children:["вопрос ",(e.correct[n.id]??0)+(e.missed[n.id]??0)+(t?1:0)]})]})]})}function ou({teams:n,state:e,bank:t,questionText:i,verdict:s,answerText:r,dice:a,reveal:c}){const[d,l]=ee.useState(()=>Date.now());ee.useEffect(()=>{const w=setInterval(()=>l(Date.now()),250);return()=>clearInterval(w)},[]);const h=e.order.map(w=>n.find(T=>T.id===w)).filter(w=>!!w),p=gl(e),{top:f,cols:g}=ru(h.length),x=h.find(w=>w.id===p),v=f?h.slice(0,1):h.slice(0,Math.ceil(h.length/2)),m=f?h.slice(1):h.slice(Math.ceil(h.length/2)),u=f?g:Math.max(1,v.length);return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"БЛИЦ"}),o.jsx("span",{className:"bz-bank",children:Rd(t,e.used)})]}),o.jsx("div",{className:`bz-row${f?" bz-row-top":""}`,style:{"--cols":f?1:u},children:v.map(w=>o.jsx(Bo,{team:w,state:e,active:w.id===p,now:d},w.id))}),o.jsx("div",{className:`bz-question${s?` v-${s}`:""}`,style:{"--tc":x==null?void 0:x.color},children:a??(i?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"bz-asking",children:["отвечают: ",o.jsx("b",{children:(x==null?void 0:x.name)??"—"})]}),o.jsx("div",{className:"bz-qtext",children:i}),s&&o.jsxs("div",{className:`bz-verdict ${s}`,children:[s==="ok"?"ВЕРНО":"НЕВЕРНО",r&&o.jsxs("span",{className:"bz-right",children:[" · ",r]})]})]}):c?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"bz-asking",children:c.verdict==="ok"?"ответили верно!":c.verdict==="skip"?"вопрос пропущен":"не угадали"}),o.jsx("div",{className:"bz-qtext",children:c.questionText}),o.jsxs("div",{className:`bz-verdict ${c.verdict==="ok"?"ok":"no"}`,children:["Правильный ответ: ",c.answerText]})]}):o.jsx("div",{className:"bz-asking",children:"следующий вопрос…"}))}),o.jsx("div",{className:"bz-row",style:{"--cols":Math.max(1,m.length)},children:m.map(w=>o.jsx(Bo,{team:w,state:e,active:w.id===p,now:d},w.id))})]})}function zo({teams:n,pickedId:e,rolling:t}){const[i,s]=ee.useState(0);ee.useEffect(()=>{if(!t)return;const a=setInterval(()=>s(c=>(c+1)%Math.max(1,n.length)),110);return()=>clearInterval(a)},[t,n.length]);const r=t?n[i]:n.find(a=>a.id===e)??n[0];return o.jsxs("div",{className:"bz-dice-wrap",children:[o.jsx("div",{className:`bz-dice${t?" rolling":" done"}`,style:{"--tc":r==null?void 0:r.color},children:(r==null?void 0:r.name)??"—"}),o.jsx("div",{className:"bz-dice-cap",children:t?"кто начинает…":"начинает"})]})}const El="qp-fx-enabled",cu=4e3,lu={classic:470,potter:700};function du(){try{const n=localStorage.getItem(El);return n===null?!0:n==="1"}catch{return!0}}function uu(n){try{localStorage.setItem(El,n?"1":"0")}catch{}}function hu(){return typeof location<"u"&&location.href.includes("nofx=1")}function fu({theme:n,trigger:e}){const[t,i]=ee.useState(du),s=ee.useRef(null),r=ee.useRef(0),[a,c]=ee.useState(null);ee.useEffect(()=>{const l=s.current===null;if(s.current=e,l||!t||n==="new_year"||typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||hu())return;const h=Date.now();h-r.current<cu||(r.current=h,c(h))},[e]),ee.useEffect(()=>{if(a===null)return;const l=(lu[n]??300)+50,h=setTimeout(()=>c(null),l);return()=>clearTimeout(h)},[a,n]);const d=n==="classic"||n==="potter";return o.jsxs(o.Fragment,{children:[d&&o.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":t,title:t?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>i(l=>{const h=!l;return uu(h),h}),children:"✨"}),a!==null&&n==="classic"&&o.jsx(pu,{},a),a!==null&&n==="potter"&&o.jsx(mu,{},a)]})}function pu(){return o.jsx("div",{className:"fx-flash fx-cyber","aria-hidden":"true"})}function mu(){const n=Array.from({length:22},(e,t)=>t);return o.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>o.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const ko=["🥇","🥈","🥉"];function ea({theme:n,place:e}){return n==="classic"?o.jsx(gu,{place:e}):n==="potter"?o.jsx(_u,{place:e}):n==="new_year"?o.jsx(xu,{place:e}):o.jsx("span",{className:"award-emoji",children:ko[e-1]??ko[2]})}function gu({place:n}){return o.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ah-orbit"}),o.jsx("span",{className:"ah-face",children:o.jsx("b",{children:n})})]})}function xu({place:n}){return o.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ab-cap"}),o.jsxs("span",{className:"ab-ball",children:[o.jsx("span",{className:"ab-shine"}),o.jsx("b",{children:n})]})]})}function _u({place:n}){return o.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"am-ribbon"}),o.jsxs("span",{className:"am-disc",children:[o.jsx("span",{className:"am-shine"}),o.jsx("b",{children:n})]})]})}function ai({pack:n,gameState:e}){const t=Ml(n,e.round_number,e.phase),i=t.label.replace(" →","").toLowerCase(),s=()=>{var r,a,c;if(t.kind==="scoreboard")return void xl();if(t.kind==="break")return void _l();if(t.kind==="finale"){const d=Zd((r=n.settings)==null?void 0:r.info_slides);return d==null?void tr(e.pack_id,((a=n.settings)==null?void 0:a.play_mode)==="paper"):void Nd(d)}return void Zr(e.round_number+1,Jr((c=n.settings)==null?void 0:c.info_slides,e.round_number+1)??void 0)};return o.jsxs("button",{onClick:s,children:[i.charAt(0).toUpperCase()+i.slice(1)," →"]})}const Go="01#$%&/\\<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";function vu(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ho(n,e,t=1){const i=Math.max(0,Math.min(1,e));if(i>=1)return n;const s=vu(t),r=Math.floor(n.length*i);let a="";for(let c=0;c<n.length;c++){const d=n[c];if(c<r||/\s/.test(d)){a+=d;continue}a+=Go[Math.floor(s()*Go.length)]}return a}const Mu=14,Su=50;function wl(n,e){const[t,i]=ee.useState(n),s=ee.useRef(0);return ee.useEffect(()=>{const r=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!e||r){i(n);return}s.current+=1;const a=s.current;let c=0;i(Ho(n,0,a));const d=setInterval(()=>{c+=1;const l=c/Mu;if(l>=1){i(n),clearInterval(d);return}i(Ho(n,l,a))},Su);return()=>clearInterval(d)},[n,e]),t}const Vo=new Map,Hs=new Set;function wt(){const n=new Audio;return Hs.add(n),n}function Tl(){Hs.forEach(n=>{try{n.pause(),n.currentTime=0,n.src=""}catch{}}),Hs.clear(),document.querySelectorAll("audio, video").forEach(n=>{const e=n;try{e.pause(),e.currentTime=0}catch{}})}async function yu(n){const e=Vo.get(n);if(e)return e;const t=await fetch(n,{mode:"cors",credentials:"omit"});if(!t.ok){const s=await t.text().catch(()=>"");throw/not_found|Object not found/i.test(s)||t.status===404||t.status===400?new Error("ФАЙЛА НЕТ В ХРАНИЛИЩЕ"):new Error(`сервер ответил ${t.status}`)}const i=URL.createObjectURL(await t.blob());return Vo.set(n,i),i}async function Al(n,e){Hs.add(n);try{return n.src=e,await n.play(),{ok:!0}}catch(t){if((t instanceof Error?t.name:"")==="NotAllowedError")return{ok:!1,reason:"браузер не разрешил звук — кликните по экрану"}}try{return n.src=await yu(e),await n.play(),{ok:!0}}catch(t){return{ok:!1,reason:t instanceof Error&&/ФАЙЛА НЕТ/.test(t.message)?"файла нет в хранилище — трек нужно загрузить заново в редакторе":t instanceof Error&&/Failed to fetch|NetworkError/i.test(t.message)?"файл не скачивается: запрос блокирует браузер, VPN или расширение":`не удалось воспроизвести: ${t instanceof Error?t.message:"ошибка"}`}}}async function bu(n){const e=[n];try{const t=await fetch(n,{method:"GET",mode:"cors",credentials:"omit"});e.push(`fetch: ${t.status} ${t.statusText}`),e.push(`тип: ${t.headers.get("content-type")??"—"}`),e.push(`размер: ${t.headers.get("content-length")??"—"}`)}catch(t){e.push(`fetch НЕ ПРОШЁЛ: ${t instanceof Error?t.message:"ошибка"}`)}return e.join(`
`)}let rs=0;function Eu(n,e,t){const i=++rs;Tl();const s=wt();let r;const a=()=>i!==rs,c=()=>{r&&clearInterval(r);try{s.pause()}catch{}};return s.addEventListener("playing",()=>{var l,h;if(a()){c();return}(l=t.onStart)==null||l.call(t);let d=e;(h=t.onTick)==null||h.call(t,d),r=setInterval(()=>{var p,f;if(a()){c();return}d-=1,(p=t.onTick)==null||p.call(t,Math.max(0,d)),d<=0&&(c(),(f=t.onEnd)==null||f.call(t))},1e3)},{once:!0}),Al(s,n).then(d=>{var l;if(a()){c();return}d.ok||(c(),(l=t.onError)==null||l.call(t,d.reason))}),{stop:()=>{i===rs&&rs++,c()}}}function wu({pack:n,round:e,gameState:t,timerNode:i}){var v,m;const s=e.settings,r=s.startDelaySec??5,a=s.afterTimerSec??5,c=e.questions.filter(u=>!u.hidden),d=e.settings.bg_music??((v=n.settings)==null?void 0:v.bg_music),l=((m=n.settings)==null?void 0:m.play_mode)==="paper";ee.useEffect(()=>{if(l||t.timer_started_at||document.hidden)return;const u=setTimeout(()=>{ks()},r*1e3);return()=>clearTimeout(u)},[t.timer_started_at,l]),ee.useEffect(()=>{if(!t.timer_started_at||!d||document.hidden)return;const u=wt();return u.src=qe(d),u.loop=!0,u.volume=.6,u.play().catch(()=>{}),()=>u.pause()},[t.timer_started_at,d]),ee.useEffect(()=>{if(!t.timer_started_at||document.hidden)return;const w=new Date(t.timer_started_at).getTime()+e.timer_seconds*1e3-Date.now()+a*1e3,T=setTimeout(()=>{Zi(0)},Math.max(0,w));return()=>clearTimeout(T)},[t.timer_started_at]);const[h,p]=ee.useState(r);ee.useEffect(()=>{if(l||t.timer_started_at)return;const u=setInterval(()=>p(w=>Math.max(0,w-1)),1e3);return()=>clearInterval(u)},[t.timer_started_at,l]);const f=c.length%2===1?c[0]:null,g=f?c.slice(1):c,x=Math.ceil(g.length/2);return o.jsxs("div",{className:`sprint-screen${f?" with-hero":""}${c.length>7?" many":""}`,children:[f&&o.jsxs("div",{className:`sprint-hero sprint-card${Ni(f.question_text).trim()?Ni(f.question_text):""}`,children:[o.jsx("span",{className:"sprint-num",children:"1"}),o.jsx("div",{className:"sprint-text",children:f.question_text})]}),o.jsx("div",{className:"host-topbar sprint-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")})}),o.jsx("div",{className:"sprint-col",children:g.slice(0,x).map((u,w)=>o.jsx(Wo,{n:(f?2:1)+w,q:u},u.id))}),o.jsx("div",{className:"sprint-center",children:t.timer_started_at?o.jsx("div",{className:"sprint-timer",children:i}):o.jsxs("div",{className:"sprint-pre",children:[!l&&o.jsx("div",{className:"sprint-pre-num",children:h}),o.jsx("div",{className:"mono-tag",children:"ЧИТАЕМ ВОПРОСЫ"})]})}),o.jsx("div",{className:"sprint-col",children:g.slice(x).map((u,w)=>o.jsx(Wo,{n:(f?2:1)+x+w,q:u},u.id))})]})}function Wo({n,q:e}){const t=(e.media.question??[]).find(i=>!/\.(mp3|mp4|webm|wav)$/i.test(i));return o.jsxs("div",{className:"sprint-card",children:[o.jsx("span",{className:"sprint-num",children:n}),o.jsx("div",{className:"sprint-text",children:e.question_text}),t&&o.jsx("img",{src:qe(t),alt:"",className:"sprint-img"})]})}const Vs=100,Rl=72,jo=260,Tu=12.5,Au=9,Ru=.9,Xo=80;function Cu(n,e){const t=Xo+Math.max(0,Math.min(1,n))*(360-Xo),i=-90+t,s=[];for(let l=0;l<jo;l++){const h=l/(jo-1),p=(i-h*t)*Math.PI/180,f=Tu*(h<.2?.86+.14*(h/.2):1-.97*Math.pow((h-.2)/.8,1.9)),g=Rl+Ru*Math.sin(2*Math.PI*(h*Au)+e),x=Vs+g*Math.cos(p),v=Vs+g*Math.sin(p),m=Math.cos(p),u=Math.sin(p);s.push({cx:x,cy:v,nx:m,ny:u,w:f})}const r=s.map(l=>`${(l.cx+l.nx*l.w).toFixed(2)},${(l.cy+l.ny*l.w).toFixed(2)}`),a=s.slice().reverse().map(l=>`${(l.cx-l.nx*l.w).toFixed(2)},${(l.cy-l.ny*l.w).toFixed(2)}`),c=s[0],d=s[8];return{body:`M${r.join("L")}L${a.join("L")}Z`,mid:`M${s.map(l=>`${l.cx.toFixed(2)},${l.cy.toFixed(2)}`).join("L")}`,hx:c.cx,hy:c.cy,rot:Math.atan2(c.cy-d.cy,c.cx-d.cx)*180/Math.PI}}function Cl({left:n,seconds:e,low:t}){const i=1-Math.max(0,Math.min(1,n/Math.max(1,e))),[s,r]=ee.useState(0),a=ee.useRef(0);ee.useEffect(()=>{let l=!1;const h=()=>{l||(r(-(Date.now()/700)%(Math.PI*2)),a.current=requestAnimationFrame(h))};return a.current=requestAnimationFrame(h),()=>{l=!0,cancelAnimationFrame(a.current)}},[]);const c=Cu(i,s),d=t?"lo":"ok";return o.jsxs("div",{className:`snake-timer${t?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 200 200","aria-hidden":!0,children:[o.jsxs("defs",{children:[o.jsxs("linearGradient",{id:`sn-g-${d}`,x1:"0",y1:"0",x2:".3",y2:"1",children:[o.jsx("stop",{offset:"0",stopColor:t?"#c2593f":"#3ab97c"}),o.jsx("stop",{offset:".45",stopColor:t?"#8d2f22":"#177a4a"}),o.jsx("stop",{offset:"1",stopColor:t?"#521410":"#0b4229"})]}),o.jsx("clipPath",{id:`sn-c-${d}`,children:o.jsx("path",{d:c.body})}),o.jsx("filter",{id:`sn-f-${d}`,x:"-30%",y:"-30%",width:"160%",height:"160%",children:o.jsx("feDropShadow",{dx:"0",dy:"0",stdDeviation:"3",floodColor:t?"#b23a2a":"#0f7a4d",floodOpacity:".55"})})]}),o.jsx("circle",{cx:Vs,cy:Vs,r:Rl,fill:"none",stroke:"#d3a62526",strokeWidth:"1.2",strokeDasharray:"2 8"}),o.jsxs("g",{filter:`url(#sn-f-${d})`,children:[o.jsx("path",{d:c.body,fill:`url(#sn-g-${d})`,stroke:"#06301c",strokeWidth:"1.1"}),o.jsxs("g",{clipPath:`url(#sn-c-${d})`,children:[o.jsx("path",{d:c.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"5 10",opacity:".34"}),o.jsx("path",{d:c.mid,fill:"none",stroke:"#8ff0c0",strokeWidth:"3.4",opacity:".22"}),o.jsx("path",{d:c.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"1.6 14",opacity:".34"})]}),o.jsxs("g",{transform:`translate(${c.hx.toFixed(2)},${c.hy.toFixed(2)}) rotate(${c.rot.toFixed(2)})`,children:[o.jsx("path",{d:"M17.5,0 Q15,-6.4 6,-9.6 Q-4,-12.4 -11,-10 L-11,10 Q-4,12.4 6,9.6 Q15,6.4 17.5,0 Z",fill:t?"#a83c2c":"#1f8a55",stroke:"#06301c",strokeWidth:"1.1"}),o.jsx("path",{d:"M17.5,0 Q9,-3 -8,-3.4 L-8,3.4 Q9,3 17.5,0 Z",fill:"#0d4f31",opacity:".55"}),o.jsx("path",{className:"sn-tongue",d:"M17,0 l12,-4.5 M17,0 l12,4.5",stroke:"#e0243a",strokeWidth:"2.1",fill:"none",strokeLinecap:"round"}),o.jsx("ellipse",{cx:"1",cy:"-6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1",cy:"6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1.8",cy:"-6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("ellipse",{cx:"1.8",cy:"6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("circle",{cx:"13",cy:"-2.6",r:".9",fill:"#06301c"}),o.jsx("circle",{cx:"13",cy:"2.6",r:".9",fill:"#06301c"})]})]})]}),o.jsx("span",{className:`snake-num${t?" danger":""}`,children:n})]})}let Ws=!1;const ta=new Set;function qo(){Ws||(Ws=!0,ta.forEach(n=>n(!0)))}async function $o(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n;e.state==="suspended"&&await e.resume();const t=e.state==="running";return e.close(),t}catch{return!1}}function Ja(){const[n,e]=ee.useState(Ws);return ee.useEffect(()=>{if(Ws)return;ta.add(e);const t=()=>{$o().then(i=>{i&&qo()})};return window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),$o().then(i=>{i&&qo()}),()=>{ta.delete(e),window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t)}},[]),n}function Qa(){return Ja()?null:o.jsxs("div",{className:"audio-gate",onClick:()=>{},children:[o.jsx("span",{children:"🔇 Звук заблокирован браузером"}),o.jsx("b",{children:"кликните по экрану один раз"})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const eo="185",Nu=0,Yo=1,Pu=2,Is=1,Lu=2,$i=3,Bn=0,zt=1,vn=2,yn=0,wi=1,ni=2,Zo=3,Ko=4,Du=5,$n=100,Iu=101,Uu=102,Fu=103,Ou=104,Bu=200,zu=201,ku=202,Gu=203,na=204,ia=205,Hu=206,Vu=207,Wu=208,ju=209,Xu=210,qu=211,$u=212,Yu=213,Zu=214,sa=0,ra=1,aa=2,Pi=3,oa=4,ca=5,la=6,da=7,Nl=0,Ku=1,Ju=2,ln=0,Pl=1,Ll=2,Dl=3,Il=4,Ul=5,Fl=6,Ol=7,Bl=300,ii=301,Li=302,hr=303,fr=304,ir=306,ua=1e3,Mn=1001,ha=1002,Tt=1003,Qu=1004,as=1005,Nt=1006,pr=1007,Zn=1008,Wt=1009,zl=1010,kl=1011,Ki=1012,to=1013,un=1014,on=1015,En=1016,no=1017,io=1018,Ji=1020,Gl=35902,Hl=35899,Vl=1021,Wl=1022,Jt=1023,wn=1026,Kn=1027,jl=1028,so=1029,si=1030,ro=1031,ao=1033,Us=33776,Fs=33777,Os=33778,Bs=33779,fa=35840,pa=35841,ma=35842,ga=35843,xa=36196,_a=37492,va=37496,Ma=37488,Sa=37489,js=37490,ya=37491,ba=37808,Ea=37809,wa=37810,Ta=37811,Aa=37812,Ra=37813,Ca=37814,Na=37815,Pa=37816,La=37817,Da=37818,Ia=37819,Ua=37820,Fa=37821,Oa=36492,Ba=36494,za=36495,ka=36283,Ga=36284,Xs=36285,Ha=36286,eh=3200,Va=0,th=1,Un="",qt="srgb",qs="srgb-linear",$s="linear",tt="srgb",di=7680,Jo=519,nh=512,ih=513,sh=514,oo=515,rh=516,ah=517,co=518,oh=519,Qo=35044,ec="300 es",cn=2e3,Qi=2001;function ch(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ys(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function lh(){const n=Ys("canvas");return n.style.display="block",n}const tc={};function nc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Xl(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=Xl(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=Xl(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ti(...n){const e=n.join(" ");e in tc||(tc[e]=!0,Fe(...n))}function dh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const uh={[sa]:ra,[aa]:la,[oa]:da,[Pi]:ca,[ra]:sa,[la]:aa,[da]:oa,[ca]:Pi};class oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mr=Math.PI/180,Wa=180/Math.PI;function ts(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function hh(n,e){return(n%e+e)%e}function gr(n,e,t){return(1-t)*n+t*e}function zi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const mo=class mo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mo.prototype.isVector2=!0;let Ke=mo;class Ui{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,c){let d=i[s+0],l=i[s+1],h=i[s+2],p=i[s+3],f=r[a+0],g=r[a+1],x=r[a+2],v=r[a+3];if(p!==v||d!==f||l!==g||h!==x){let m=d*f+l*g+h*x+p*v;m<0&&(f=-f,g=-g,x=-x,v=-v,m=-m);let u=1-c;if(m<.9995){const w=Math.acos(m),T=Math.sin(w);u=Math.sin(u*w)/T,c=Math.sin(c*w)/T,d=d*u+f*c,l=l*u+g*c,h=h*u+x*c,p=p*u+v*c}else{d=d*u+f*c,l=l*u+g*c,h=h*u+x*c,p=p*u+v*c;const w=1/Math.sqrt(d*d+l*l+h*h+p*p);d*=w,l*=w,h*=w,p*=w}}e[t]=d,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,a){const c=i[s],d=i[s+1],l=i[s+2],h=i[s+3],p=r[a],f=r[a+1],g=r[a+2],x=r[a+3];return e[t]=c*x+h*p+d*g-l*f,e[t+1]=d*x+h*f+l*p-c*g,e[t+2]=l*x+h*g+c*f-d*p,e[t+3]=h*x-c*p-d*f-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,d=Math.sin,l=c(i/2),h=c(s/2),p=c(r/2),f=d(i/2),g=d(s/2),x=d(r/2);switch(a){case"XYZ":this._x=f*h*p+l*g*x,this._y=l*g*p-f*h*x,this._z=l*h*x+f*g*p,this._w=l*h*p-f*g*x;break;case"YXZ":this._x=f*h*p+l*g*x,this._y=l*g*p-f*h*x,this._z=l*h*x-f*g*p,this._w=l*h*p+f*g*x;break;case"ZXY":this._x=f*h*p-l*g*x,this._y=l*g*p+f*h*x,this._z=l*h*x+f*g*p,this._w=l*h*p-f*g*x;break;case"ZYX":this._x=f*h*p-l*g*x,this._y=l*g*p+f*h*x,this._z=l*h*x-f*g*p,this._w=l*h*p+f*g*x;break;case"YZX":this._x=f*h*p+l*g*x,this._y=l*g*p+f*h*x,this._z=l*h*x-f*g*p,this._w=l*h*p-f*g*x;break;case"XZY":this._x=f*h*p-l*g*x,this._y=l*g*p-f*h*x,this._z=l*h*x+f*g*p,this._w=l*h*p+f*g*x;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],c=t[5],d=t[9],l=t[2],h=t[6],p=t[10],f=i+c+p;if(f>0){const g=.5/Math.sqrt(f+1);this._w=.25/g,this._x=(h-d)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(i>c&&i>p){const g=2*Math.sqrt(1+i-c-p);this._w=(h-d)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(c>p){const g=2*Math.sqrt(1+c-i-p);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(d+h)/g}else{const g=2*Math.sqrt(1+p-i-c);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(d+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,c=t._x,d=t._y,l=t._z,h=t._w;return this._x=i*h+a*c+s*l-r*d,this._y=s*h+a*d+r*c-i*l,this._z=r*h+a*l+i*d-s*c,this._w=a*h-i*c-s*d-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,a=-a,c=-c);let d=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);d=Math.sin(d*l)/h,t=Math.sin(t*l)/h,this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this._onChangeCallback()}else this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const go=class go{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ic.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ic.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,c=e.z,d=e.w,l=2*(a*s-c*i),h=2*(c*t-r*s),p=2*(r*i-a*t);return this.x=t+d*l+a*p-c*h,this.y=i+d*h+c*l-r*p,this.z=s+d*p+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,c=t.y,d=t.z;return this.x=s*d-r*c,this.y=r*a-i*d,this.z=i*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xr.copy(this).projectOnVector(e),this.sub(xr)}reflect(e){return this.sub(xr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};go.prototype.isVector3=!0;let Z=go;const xr=new Z,ic=new Ui,xo=class xo{constructor(e,t,i,s,r,a,c,d,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,c,d,l)}set(e,t,i,s,r,a,c,d,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=d,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],c=i[3],d=i[6],l=i[1],h=i[4],p=i[7],f=i[2],g=i[5],x=i[8],v=s[0],m=s[3],u=s[6],w=s[1],T=s[4],y=s[7],A=s[2],S=s[5],C=s[8];return r[0]=a*v+c*w+d*A,r[3]=a*m+c*T+d*S,r[6]=a*u+c*y+d*C,r[1]=l*v+h*w+p*A,r[4]=l*m+h*T+p*S,r[7]=l*u+h*y+p*C,r[2]=f*v+g*w+x*A,r[5]=f*m+g*T+x*S,r[8]=f*u+g*y+x*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-i*r*h+i*c*d+s*r*l-s*a*d}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],h=e[8],p=h*a-c*l,f=c*d-h*r,g=l*r-a*d,x=t*p+i*f+s*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=p*v,e[1]=(s*l-h*i)*v,e[2]=(c*i-s*a)*v,e[3]=f*v,e[4]=(h*t-s*d)*v,e[5]=(s*r-c*t)*v,e[6]=g*v,e[7]=(i*d-l*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,c){const d=Math.cos(r),l=Math.sin(r);return this.set(i*d,i*l,-i*(d*a+l*c)+a+e,-s*l,s*d,-s*(-l*a+d*c)+c+t,0,0,1),this}scale(e,t){return Ti("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_r.makeScale(e,t)),this}rotate(e){return Ti("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_r.makeRotation(-e)),this}translate(e,t){return Ti("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};xo.prototype.isMatrix3=!0;let Oe=xo;const _r=new Oe,sc=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rc=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fh(){const n={enabled:!0,workingColorSpace:qs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=bn(s.r),s.g=bn(s.g),s.b=bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?$s:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ti("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ti("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[qs]:{primaries:e,whitePoint:i,transfer:$s,toXYZ:sc,fromXYZ:rc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:sc,fromXYZ:rc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),n}const Ye=fh();function bn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ai(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ui;class ph{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ui===void 0&&(ui=Ys("canvas")),ui.width=e.width,ui.height=e.height;const s=ui.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ui}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ys("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bn(t[i]/255)*255):t[i]=bn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mh=0;class lo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=ts(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(vr(s[a].image)):r.push(vr(s[a]))}else r=vr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function vr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ph.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let gh=0;const Mr=new Z;class Pt extends oi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=Mn,s=Mn,r=Nt,a=Zn,c=Jt,d=Wt,l=Pt.DEFAULT_ANISOTROPY,h=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=ts(),this.name="",this.source=new lo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=d,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mr).x}get height(){return this.source.getSize(Mr).y}get depth(){return this.source.getSize(Mr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Bl;Pt.DEFAULT_ANISOTROPY=1;const _o=class _o{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const d=e.elements,l=d[0],h=d[4],p=d[8],f=d[1],g=d[5],x=d[9],v=d[2],m=d[6],u=d[10];if(Math.abs(h-f)<.01&&Math.abs(p-v)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(p+v)<.1&&Math.abs(x+m)<.1&&Math.abs(l+g+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,y=(g+1)/2,A=(u+1)/2,S=(h+f)/4,C=(p+v)/4,M=(x+m)/4;return T>y&&T>A?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=S/i,r=C/i):y>A?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=S/s,r=M/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=C/r,s=M/r),this.set(i,s,r,t),this}let w=Math.sqrt((m-x)*(m-x)+(p-v)*(p-v)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(m-x)/w,this.y=(p-v)/w,this.z=(f-h)/w,this.w=Math.acos((l+g+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_o.prototype.isVector4=!0;let ut=_o;class xh extends oi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Pt(s),a=i.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new lo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends xh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ql extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _h extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const er=class er{constructor(e,t,i,s,r,a,c,d,l,h,p,f,g,x,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,c,d,l,h,p,f,g,x,v,m)}set(e,t,i,s,r,a,c,d,l,h,p,f,g,x,v,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=a,u[9]=c,u[13]=d,u[2]=l,u[6]=h,u[10]=p,u[14]=f,u[3]=g,u[7]=x,u[11]=v,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new er().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/hi.setFromMatrixColumn(e,0).length(),r=1/hi.setFromMatrixColumn(e,1).length(),a=1/hi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),c=Math.sin(i),d=Math.cos(s),l=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const f=a*h,g=a*p,x=c*h,v=c*p;t[0]=d*h,t[4]=-d*p,t[8]=l,t[1]=g+x*l,t[5]=f-v*l,t[9]=-c*d,t[2]=v-f*l,t[6]=x+g*l,t[10]=a*d}else if(e.order==="YXZ"){const f=d*h,g=d*p,x=l*h,v=l*p;t[0]=f+v*c,t[4]=x*c-g,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-c,t[2]=g*c-x,t[6]=v+f*c,t[10]=a*d}else if(e.order==="ZXY"){const f=d*h,g=d*p,x=l*h,v=l*p;t[0]=f-v*c,t[4]=-a*p,t[8]=x+g*c,t[1]=g+x*c,t[5]=a*h,t[9]=v-f*c,t[2]=-a*l,t[6]=c,t[10]=a*d}else if(e.order==="ZYX"){const f=a*h,g=a*p,x=c*h,v=c*p;t[0]=d*h,t[4]=x*l-g,t[8]=f*l+v,t[1]=d*p,t[5]=v*l+f,t[9]=g*l-x,t[2]=-l,t[6]=c*d,t[10]=a*d}else if(e.order==="YZX"){const f=a*d,g=a*l,x=c*d,v=c*l;t[0]=d*h,t[4]=v-f*p,t[8]=x*p+g,t[1]=p,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=g*p+x,t[10]=f-v*p}else if(e.order==="XZY"){const f=a*d,g=a*l,x=c*d,v=c*l;t[0]=d*h,t[4]=-p,t[8]=l*h,t[1]=f*p+v,t[5]=a*h,t[9]=g*p-x,t[2]=x*p-g,t[6]=c*h,t[10]=v*p+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vh,e,Mh)}lookAt(e,t,i){const s=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Cn.crossVectors(i,Ht),Cn.lengthSq()===0&&(Math.abs(i.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Cn.crossVectors(i,Ht)),Cn.normalize(),os.crossVectors(Ht,Cn),s[0]=Cn.x,s[4]=os.x,s[8]=Ht.x,s[1]=Cn.y,s[5]=os.y,s[9]=Ht.y,s[2]=Cn.z,s[6]=os.z,s[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],c=i[4],d=i[8],l=i[12],h=i[1],p=i[5],f=i[9],g=i[13],x=i[2],v=i[6],m=i[10],u=i[14],w=i[3],T=i[7],y=i[11],A=i[15],S=s[0],C=s[4],M=s[8],N=s[12],U=s[1],O=s[5],k=s[9],Q=s[13],B=s[2],D=s[6],q=s[10],I=s[14],Y=s[3],de=s[7],he=s[11],me=s[15];return r[0]=a*S+c*U+d*B+l*Y,r[4]=a*C+c*O+d*D+l*de,r[8]=a*M+c*k+d*q+l*he,r[12]=a*N+c*Q+d*I+l*me,r[1]=h*S+p*U+f*B+g*Y,r[5]=h*C+p*O+f*D+g*de,r[9]=h*M+p*k+f*q+g*he,r[13]=h*N+p*Q+f*I+g*me,r[2]=x*S+v*U+m*B+u*Y,r[6]=x*C+v*O+m*D+u*de,r[10]=x*M+v*k+m*q+u*he,r[14]=x*N+v*Q+m*I+u*me,r[3]=w*S+T*U+y*B+A*Y,r[7]=w*C+T*O+y*D+A*de,r[11]=w*M+T*k+y*q+A*he,r[15]=w*N+T*Q+y*I+A*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],c=e[5],d=e[9],l=e[13],h=e[2],p=e[6],f=e[10],g=e[14],x=e[3],v=e[7],m=e[11],u=e[15],w=d*g-l*f,T=c*g-l*p,y=c*f-d*p,A=a*g-l*h,S=a*f-d*h,C=a*p-c*h;return t*(v*w-m*T+u*y)-i*(x*w-m*A+u*S)+s*(x*T-v*A+u*C)-r*(x*y-v*S+m*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],c=e[9],d=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-i*(r*h-c*d)+s*(r*l-a*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],h=e[8],p=e[9],f=e[10],g=e[11],x=e[12],v=e[13],m=e[14],u=e[15],w=t*c-i*a,T=t*d-s*a,y=t*l-r*a,A=i*d-s*c,S=i*l-r*c,C=s*l-r*d,M=h*v-p*x,N=h*m-f*x,U=h*u-g*x,O=p*m-f*v,k=p*u-g*v,Q=f*u-g*m,B=w*Q-T*k+y*O+A*U-S*N+C*M;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/B;return e[0]=(c*Q-d*k+l*O)*D,e[1]=(s*k-i*Q-r*O)*D,e[2]=(v*C-m*S+u*A)*D,e[3]=(f*S-p*C-g*A)*D,e[4]=(d*U-a*Q-l*N)*D,e[5]=(t*Q-s*U+r*N)*D,e[6]=(m*y-x*C-u*T)*D,e[7]=(h*C-f*y+g*T)*D,e[8]=(a*k-c*U+l*M)*D,e[9]=(i*U-t*k-r*M)*D,e[10]=(x*S-v*y+u*w)*D,e[11]=(p*y-h*S-g*w)*D,e[12]=(c*N-a*O-d*M)*D,e[13]=(t*O-i*N+s*M)*D,e[14]=(v*T-x*A-m*w)*D,e[15]=(h*A-p*T+f*w)*D,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,c=e.y,d=e.z,l=r*a,h=r*c;return this.set(l*a+i,l*c-s*d,l*d+s*c,0,l*c+s*d,h*c+i,h*d-s*a,0,l*d-s*c,h*d+s*a,r*d*d+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,c=t._z,d=t._w,l=r+r,h=a+a,p=c+c,f=r*l,g=r*h,x=r*p,v=a*h,m=a*p,u=c*p,w=d*l,T=d*h,y=d*p,A=i.x,S=i.y,C=i.z;return s[0]=(1-(v+u))*A,s[1]=(g+y)*A,s[2]=(x-T)*A,s[3]=0,s[4]=(g-y)*S,s[5]=(1-(f+u))*S,s[6]=(m+w)*S,s[7]=0,s[8]=(x+T)*C,s[9]=(m-w)*C,s[10]=(1-(f+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=hi.set(s[0],s[1],s[2]).length();const c=hi.set(s[4],s[5],s[6]).length(),d=hi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),$t.copy(this);const l=1/a,h=1/c,p=1/d;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=p,$t.elements[9]*=p,$t.elements[10]*=p,t.setFromRotationMatrix($t),i.x=a,i.y=c,i.z=d,this}makePerspective(e,t,i,s,r,a,c=cn,d=!1){const l=this.elements,h=2*r/(t-e),p=2*r/(i-s),f=(t+e)/(t-e),g=(i+s)/(i-s);let x,v;if(d)x=r/(a-r),v=a*r/(a-r);else if(c===cn)x=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(c===Qi)x=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=p,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,c=cn,d=!1){const l=this.elements,h=2/(t-e),p=2/(i-s),f=-(t+e)/(t-e),g=-(i+s)/(i-s);let x,v;if(d)x=1/(a-r),v=a/(a-r);else if(c===cn)x=-2/(a-r),v=-(a+r)/(a-r);else if(c===Qi)x=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=p,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};er.prototype.isMatrix4=!0;let ht=er;const hi=new Z,$t=new ht,vh=new Z(0,0,0),Mh=new Z(1,1,1),Cn=new Z,os=new Z,Ht=new Z,ac=new ht,oc=new Ui;class zn{constructor(e=0,t=0,i=0,s=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],d=s[1],l=s[5],h=s[9],p=s[2],f=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(d,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-Ze(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(f,g),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ac,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oc.setFromEuler(this),this.setFromQuaternion(oc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class $l{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sh=0;const cc=new Z,fi=new Ui,pn=new ht,cs=new Z,ki=new Z,yh=new Z,bh=new Ui,lc=new Z(1,0,0),dc=new Z(0,1,0),uc=new Z(0,0,1),hc={type:"added"},Eh={type:"removed"},pi={type:"childadded",child:null},Sr={type:"childremoved",child:null};class It extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new Z,t=new zn,i=new Ui,s=new Z(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Oe}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.multiply(fi),this}rotateOnWorldAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.premultiply(fi),this}rotateX(e){return this.rotateOnAxis(lc,e)}rotateY(e){return this.rotateOnAxis(dc,e)}rotateZ(e){return this.rotateOnAxis(uc,e)}translateOnAxis(e,t){return cc.copy(e).applyQuaternion(this.quaternion),this.position.add(cc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lc,e)}translateY(e){return this.translateOnAxis(dc,e)}translateZ(e){return this.translateOnAxis(uc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?cs.copy(e):cs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(ki,cs,this.up):pn.lookAt(cs,ki,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),fi.setFromRotationMatrix(pn),this.quaternion.premultiply(fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hc),pi.child=e,this.dispatchEvent(pi),pi.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Eh),Sr.child=e,this.dispatchEvent(Sr),Sr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hc),pi.child=e,this.dispatchEvent(pi),pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ki,e,yh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ki,bh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,d){return c[d.uuid]===void 0&&(c[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const d=c.shapes;if(Array.isArray(d))for(let l=0,h=d.length;l<h;l++){const p=d[l];r(e.shapes,p)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let d=0,l=this.material.length;d<l;d++)c.push(r(e.materials,this.material[d]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const d=this.animations[c];s.animations.push(r(e.animations,d))}}if(t){const c=a(e.geometries),d=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),f=a(e.skeletons),g=a(e.animations),x=a(e.nodes);c.length>0&&(i.geometries=c),d.length>0&&(i.materials=d),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),f.length>0&&(i.skeletons=f),g.length>0&&(i.animations=g),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(c){const d=[];for(const l in c){const h=c[l];delete h.metadata,d.push(h)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new Z(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jn extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wh={type:"move"};class yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const c=this._targetRay,d=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),u=this._getHandJoint(l,v);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],f=h.position.distanceTo(p.position),g=.02,x=.005;l.inputState.pinching&&f>g+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=g-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(wh)))}return c!==null&&(c.visible=s!==null),d!==null&&(d.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Jn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Yl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},ls={h:0,s:0,l:0};function br(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=hh(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=br(a,r,e+1/3),this.g=br(a,r,e),this.b=br(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=qt){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=Yl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Ye.workingToColorSpace(Ct.copy(this),e),Math.round(Ze(Ct.r*255,0,255))*65536+Math.round(Ze(Ct.g*255,0,255))*256+Math.round(Ze(Ct.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Ct.copy(this),t);const i=Ct.r,s=Ct.g,r=Ct.b,a=Math.max(i,s,r),c=Math.min(i,s,r);let d,l;const h=(c+a)/2;if(c===a)d=0,l=0;else{const p=a-c;switch(l=h<=.5?p/(a+c):p/(2-a-c),a){case i:d=(s-r)/p+(s<r?6:0);break;case s:d=(r-i)/p+2;break;case r:d=(i-s)/p+4;break}d/=6}return e.h=d,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=qt){Ye.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,i=Ct.g,s=Ct.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(ls);const i=gr(Nn.h,ls.h,t),s=gr(Nn.s,ls.s,t),r=gr(Nn.l,ls.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new $e;$e.NAMES=Yl;class sr{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new $e(e),this.density=t}clone(){return new sr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Zl extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yt=new Z,mn=new Z,Er=new Z,gn=new Z,mi=new Z,gi=new Z,fc=new Z,wr=new Z,Tr=new Z,Ar=new Z,Rr=new ut,Cr=new ut,Nr=new ut;class Kt{constructor(e=new Z,t=new Z,i=new Z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Yt.subVectors(e,t),s.cross(Yt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Yt.subVectors(s,t),mn.subVectors(i,t),Er.subVectors(e,t);const a=Yt.dot(Yt),c=Yt.dot(mn),d=Yt.dot(Er),l=mn.dot(mn),h=mn.dot(Er),p=a*l-c*c;if(p===0)return r.set(0,0,0),null;const f=1/p,g=(l*d-c*h)*f,x=(a*h-c*d)*f;return r.set(1-g-x,x,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(e,t,i,s,r,a,c,d){return this.getBarycoord(e,t,i,s,gn)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,gn.x),d.addScaledVector(a,gn.y),d.addScaledVector(c,gn.z),d)}static getInterpolatedAttribute(e,t,i,s,r,a){return Rr.setScalar(0),Cr.setScalar(0),Nr.setScalar(0),Rr.fromBufferAttribute(e,t),Cr.fromBufferAttribute(e,i),Nr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Rr,r.x),a.addScaledVector(Cr,r.y),a.addScaledVector(Nr,r.z),a}static isFrontFacing(e,t,i,s){return Yt.subVectors(i,t),mn.subVectors(e,t),Yt.cross(mn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Yt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,c;mi.subVectors(s,i),gi.subVectors(r,i),wr.subVectors(e,i);const d=mi.dot(wr),l=gi.dot(wr);if(d<=0&&l<=0)return t.copy(i);Tr.subVectors(e,s);const h=mi.dot(Tr),p=gi.dot(Tr);if(h>=0&&p<=h)return t.copy(s);const f=d*p-h*l;if(f<=0&&d>=0&&h<=0)return a=d/(d-h),t.copy(i).addScaledVector(mi,a);Ar.subVectors(e,r);const g=mi.dot(Ar),x=gi.dot(Ar);if(x>=0&&g<=x)return t.copy(r);const v=g*l-d*x;if(v<=0&&l>=0&&x<=0)return c=l/(l-x),t.copy(i).addScaledVector(gi,c);const m=h*x-g*p;if(m<=0&&p-h>=0&&g-x>=0)return fc.subVectors(r,s),c=(p-h)/(p-h+(g-x)),t.copy(s).addScaledVector(fc,c);const u=1/(m+v+f);return a=v*u,c=f*u,t.copy(i).addScaledVector(mi,a).addScaledVector(gi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ns{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(r,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ds.copy(i.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),us.subVectors(this.max,Gi),xi.subVectors(e.a,Gi),_i.subVectors(e.b,Gi),vi.subVectors(e.c,Gi),Pn.subVectors(_i,xi),Ln.subVectors(vi,_i),Hn.subVectors(xi,vi);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-Hn.z,Hn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,Hn.z,0,-Hn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-Hn.y,Hn.x,0];return!Pr(t,xi,_i,vi,us)||(t=[1,0,0,0,1,0,0,0,1],!Pr(t,xi,_i,vi,us))?!1:(hs.crossVectors(Pn,Ln),t=[hs.x,hs.y,hs.z],Pr(t,xi,_i,vi,us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xn=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Zt=new Z,ds=new ns,xi=new Z,_i=new Z,vi=new Z,Pn=new Z,Ln=new Z,Hn=new Z,Gi=new Z,us=new Z,hs=new Z,Vn=new Z;function Pr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Vn.fromArray(n,r);const c=s.x*Math.abs(Vn.x)+s.y*Math.abs(Vn.y)+s.z*Math.abs(Vn.z),d=e.dot(Vn),l=t.dot(Vn),h=i.dot(Vn);if(Math.max(-Math.max(d,l,h),Math.min(d,l,h))>c)return!1}return!0}const Mt=new Z,fs=new Ke;let Th=0;class Ut extends oi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Th++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qo,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Kl extends Ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Jl extends Ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Et extends Ut{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Ah=new ns,Hi=new Z,Lr=new Z;class rr{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ah.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hi.subVectors(e,this.center);const t=Hi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Hi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hi.copy(e.center).add(Lr)),this.expandByPoint(Hi.copy(e.center).sub(Lr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Rh=0;const Xt=new ht,Dr=new It,Mi=new Z,Vt=new ns,Vi=new ns,bt=new Z;class Lt extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ch(e)?Jl:Kl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,i){return Xt.makeTranslation(e,t,i),this.applyMatrix4(Xt),this}scale(e,t,i){return Xt.makeScale(e,t,i),this.applyMatrix4(Xt),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Et(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ns);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const i=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];Vi.setFromBufferAttribute(c),this.morphTargetsRelative?(bt.addVectors(Vt.min,Vi.min),Vt.expandByPoint(bt),bt.addVectors(Vt.max,Vi.max),Vt.expandByPoint(bt)):(Vt.expandByPoint(Vi.min),Vt.expandByPoint(Vi.max))}Vt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],d=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)bt.fromBufferAttribute(c,l),d&&(Mi.fromBufferAttribute(e,l),bt.add(Mi)),s=Math.max(s,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ut(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const c=[],d=[];for(let M=0;M<i.count;M++)c[M]=new Z,d[M]=new Z;const l=new Z,h=new Z,p=new Z,f=new Ke,g=new Ke,x=new Ke,v=new Z,m=new Z;function u(M,N,U){l.fromBufferAttribute(i,M),h.fromBufferAttribute(i,N),p.fromBufferAttribute(i,U),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,N),x.fromBufferAttribute(r,U),h.sub(l),p.sub(l),g.sub(f),x.sub(f);const O=1/(g.x*x.y-x.x*g.y);isFinite(O)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(p,-g.y).multiplyScalar(O),m.copy(p).multiplyScalar(g.x).addScaledVector(h,-x.x).multiplyScalar(O),c[M].add(v),c[N].add(v),c[U].add(v),d[M].add(m),d[N].add(m),d[U].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let M=0,N=w.length;M<N;++M){const U=w[M],O=U.start,k=U.count;for(let Q=O,B=O+k;Q<B;Q+=3)u(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const T=new Z,y=new Z,A=new Z,S=new Z;function C(M){A.fromBufferAttribute(s,M),S.copy(A);const N=c[M];T.copy(N),T.sub(A.multiplyScalar(A.dot(N))).normalize(),y.crossVectors(S,N);const O=y.dot(d[M])<0?-1:1;a.setXYZW(M,T.x,T.y,T.z,O)}for(let M=0,N=w.length;M<N;++M){const U=w[M],O=U.start,k=U.count;for(let Q=O,B=O+k;Q<B;Q+=3)C(e.getX(Q+0)),C(e.getX(Q+1)),C(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,g=i.count;f<g;f++)i.setXYZ(f,0,0,0);const s=new Z,r=new Z,a=new Z,c=new Z,d=new Z,l=new Z,h=new Z,p=new Z;if(e)for(let f=0,g=e.count;f<g;f+=3){const x=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),c.add(h),d.add(h),l.add(h),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(v,d.x,d.y,d.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,g=t.count;f<g;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(c,d){const l=c.array,h=c.itemSize,p=c.normalized,f=new l.constructor(d.length*h);let g=0,x=0;for(let v=0,m=d.length;v<m;v++){c.isInterleavedBufferAttribute?g=d[v]*c.data.stride+c.offset:g=d[v]*h;for(let u=0;u<h;u++)f[x++]=l[g++]}return new Ut(f,h,p)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,i=this.index.array,s=this.attributes;for(const c in s){const d=s[c],l=e(d,i);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const d=[],l=r[c];for(let h=0,p=l.length;h<p;h++){const f=l[h],g=e(f,i);d.push(g)}t.morphAttributes[c]=d}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,d=a.length;c<d;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const l in d)d[l]!==void 0&&(e[l]=d[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const d in i){const l=i[d];e.data.attributes[d]=l.toJSON(e.data)}const s={};let r=!1;for(const d in this.morphAttributes){const l=this.morphAttributes[d],h=[];for(let p=0,f=l.length;p<f;p++){const g=l[p];h.push(g.toJSON(e.data))}h.length>0&&(s[d]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],p=r[l];for(let f=0,g=p.length;f<g;f++)h.push(p[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Ch=0;class Fi extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=wi,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=na,this.blendDst=ia,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(i.blending=this.blending),this.side!==Bn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==na&&(i.blendSrc=this.blendSrc),this.blendDst!==ia&&(i.blendDst=this.blendDst),this.blendEquation!==$n&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Pi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const c in r){const d=r[c];delete d.metadata,a.push(d)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const _n=new Z,Ir=new Z,ps=new Z,Dn=new Z,Ur=new Z,ms=new Z,Fr=new Z;class Ql{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ir.copy(e).add(t).multiplyScalar(.5),ps.copy(t).sub(e).normalize(),Dn.copy(this.origin).sub(Ir);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ps),c=Dn.dot(this.direction),d=-Dn.dot(ps),l=Dn.lengthSq(),h=Math.abs(1-a*a);let p,f,g,x;if(h>0)if(p=a*d-c,f=a*c-d,x=r*h,p>=0)if(f>=-x)if(f<=x){const v=1/h;p*=v,f*=v,g=p*(p+a*f+2*c)+f*(a*p+f+2*d)+l}else f=r,p=Math.max(0,-(a*f+c)),g=-p*p+f*(f+2*d)+l;else f=-r,p=Math.max(0,-(a*f+c)),g=-p*p+f*(f+2*d)+l;else f<=-x?(p=Math.max(0,-(-a*r+c)),f=p>0?-r:Math.min(Math.max(-r,-d),r),g=-p*p+f*(f+2*d)+l):f<=x?(p=0,f=Math.min(Math.max(-r,-d),r),g=f*(f+2*d)+l):(p=Math.max(0,-(a*r+c)),f=p>0?r:Math.min(Math.max(-r,-d),r),g=-p*p+f*(f+2*d)+l);else f=a>0?-r:r,p=Math.max(0,-(a*f+c)),g=-p*p+f*(f+2*d)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Ir).addScaledVector(ps,f),g}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const i=_n.dot(this.direction),s=_n.dot(_n)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=i-a,d=i+a;return d<0?null:c<0?this.at(d,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,c,d;const l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),p>=0?(c=(e.min.z-f.z)*p,d=(e.max.z-f.z)*p):(c=(e.max.z-f.z)*p,d=(e.min.z-f.z)*p),i>d||c>s)||((c>i||i!==i)&&(i=c),(d<s||s!==s)&&(s=d),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,i,s,r){Ur.subVectors(t,e),ms.subVectors(i,e),Fr.crossVectors(Ur,ms);let a=this.direction.dot(Fr),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Dn.subVectors(this.origin,e);const d=c*this.direction.dot(ms.crossVectors(Dn,ms));if(d<0)return null;const l=c*this.direction.dot(Ur.cross(Dn));if(l<0||d+l>a)return null;const h=-c*Dn.dot(Fr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class On extends Fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pc=new ht,Wn=new Ql,gs=new rr,mc=new Z,xs=new Z,_s=new Z,vs=new Z,Or=new Z,Ms=new Z,gc=new Z,Ss=new Z;class lt extends It{constructor(e=new Lt,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Ms.set(0,0,0);for(let d=0,l=r.length;d<l;d++){const h=c[d],p=r[d];h!==0&&(Or.fromBufferAttribute(p,e),a?Ms.addScaledVector(Or,h):Ms.addScaledVector(Or.sub(t),h))}t.add(Ms)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),gs.copy(i.boundingSphere),gs.applyMatrix4(r),Wn.copy(e.ray).recast(e.near),!(gs.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(gs,mc)===null||Wn.origin.distanceToSquared(mc)>(e.far-e.near)**2))&&(pc.copy(r).invert(),Wn.copy(e.ray).applyMatrix4(pc),!(i.boundingBox!==null&&Wn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,c=r.index,d=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,f=r.groups,g=r.drawRange;if(c!==null)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const m=f[x],u=a[m.materialIndex],w=Math.max(m.start,g.start),T=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let y=w,A=T;y<A;y+=3){const S=c.getX(y),C=c.getX(y+1),M=c.getX(y+2);s=ys(this,u,e,i,l,h,p,S,C,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,g.start),v=Math.min(c.count,g.start+g.count);for(let m=x,u=v;m<u;m+=3){const w=c.getX(m),T=c.getX(m+1),y=c.getX(m+2);s=ys(this,a,e,i,l,h,p,w,T,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){const m=f[x],u=a[m.materialIndex],w=Math.max(m.start,g.start),T=Math.min(d.count,Math.min(m.start+m.count,g.start+g.count));for(let y=w,A=T;y<A;y+=3){const S=y,C=y+1,M=y+2;s=ys(this,u,e,i,l,h,p,S,C,M),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,g.start),v=Math.min(d.count,g.start+g.count);for(let m=x,u=v;m<u;m+=3){const w=m,T=m+1,y=m+2;s=ys(this,a,e,i,l,h,p,w,T,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Nh(n,e,t,i,s,r,a,c){let d;if(e.side===zt?d=i.intersectTriangle(a,r,s,!0,c):d=i.intersectTriangle(s,r,a,e.side===Bn,c),d===null)return null;Ss.copy(c),Ss.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ss);return l<t.near||l>t.far?null:{distance:l,point:Ss.clone(),object:n}}function ys(n,e,t,i,s,r,a,c,d,l){n.getVertexPosition(c,xs),n.getVertexPosition(d,_s),n.getVertexPosition(l,vs);const h=Nh(n,e,t,i,xs,_s,vs,gc);if(h){const p=new Z;Kt.getBarycoord(gc,xs,_s,vs,p),s&&(h.uv=Kt.getInterpolatedAttribute(s,c,d,l,p,new Ke)),r&&(h.uv1=Kt.getInterpolatedAttribute(r,c,d,l,p,new Ke)),a&&(h.normal=Kt.getInterpolatedAttribute(a,c,d,l,p,new Z),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:d,c:l,normal:new Z,materialIndex:0};Kt.getNormal(xs,_s,vs,f.normal),h.face=f,h.barycoord=p}return h}class Ph extends Pt{constructor(e=null,t=1,i=1,s,r,a,c,d,l=Tt,h=Tt,p,f){super(null,a,c,d,l,h,s,r,p,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Br=new Z,Lh=new Z,Dh=new Oe;class qn{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Br.subVectors(i,t).cross(Lh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Br),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Dh.getNormalMatrix(e),s=this.coplanarPoint(Br).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new rr,Ih=new Ke(.5,.5),bs=new Z;class uo{constructor(e=new qn,t=new qn,i=new qn,s=new qn,r=new qn,a=new qn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=cn,i=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],d=r[2],l=r[3],h=r[4],p=r[5],f=r[6],g=r[7],x=r[8],v=r[9],m=r[10],u=r[11],w=r[12],T=r[13],y=r[14],A=r[15];if(s[0].setComponents(l-a,g-h,u-x,A-w).normalize(),s[1].setComponents(l+a,g+h,u+x,A+w).normalize(),s[2].setComponents(l+c,g+p,u+v,A+T).normalize(),s[3].setComponents(l-c,g-p,u-v,A-T).normalize(),i)s[4].setComponents(d,f,m,y).normalize(),s[5].setComponents(l-d,g-f,u-m,A-y).normalize();else if(s[4].setComponents(l-d,g-f,u-m,A-y).normalize(),t===cn)s[5].setComponents(l+d,g+f,u+m,A+y).normalize();else if(t===Qi)s[5].setComponents(d,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){jn.center.set(0,0,0);const t=Ih.distanceTo(e.center);return jn.radius=.7071067811865476+t,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(bs.x=s.normal.x>0?e.max.x:e.min.x,bs.y=s.normal.y>0?e.max.y:e.min.y,bs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ar extends Fi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xc=new ht,ja=new Ql,Es=new rr,ws=new Z;class ho extends It{constructor(e=new Lt,t=new ar){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Es.copy(i.boundingSphere),Es.applyMatrix4(s),Es.radius+=r,e.ray.intersectsSphere(Es)===!1)return;xc.copy(s).invert(),ja.copy(e.ray).applyMatrix4(xc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,l=i.index,p=i.attributes.position;if(l!==null){const f=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let x=f,v=g;x<v;x++){const m=l.getX(x);ws.fromBufferAttribute(p,m),_c(ws,m,d,s,e,t,this)}}else{const f=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let x=f,v=g;x<v;x++)ws.fromBufferAttribute(p,x),_c(ws,x,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function _c(n,e,t,i,s,r,a){const c=ja.distanceSqToPoint(n);if(c<t){const d=new Z;ja.closestPointToPoint(n,d),d.applyMatrix4(i);const l=s.ray.origin.distanceTo(d);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(c),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ed extends Pt{constructor(e=[],t=ii,i,s,r,a,c,d,l,h){super(e,t,i,s,r,a,c,d,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class td extends Pt{constructor(e,t,i,s,r,a,c,d,l){super(e,t,i,s,r,a,c,d,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Di extends Pt{constructor(e,t,i=un,s,r,a,c=Tt,d=Tt,l,h=wn,p=1){if(h!==wn&&h!==Kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:p};super(f,s,r,a,c,d,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Uh extends Di{constructor(e,t=un,i=ii,s,r,a=Tt,c=Tt,d,l=wn){const h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,c,d,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class nd extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ri extends Lt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const d=[],l=[],h=[],p=[];let f=0,g=0;x("z","y","x",-1,-1,i,t,e,a,r,0),x("z","y","x",1,-1,i,t,-e,a,r,1),x("x","z","y",1,1,e,i,t,s,a,2),x("x","z","y",1,-1,e,i,-t,s,a,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(d),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(p,2));function x(v,m,u,w,T,y,A,S,C,M,N){const U=y/C,O=A/M,k=y/2,Q=A/2,B=S/2,D=C+1,q=M+1;let I=0,Y=0;const de=new Z;for(let he=0;he<q;he++){const me=he*O-Q;for(let Te=0;Te<D;Te++){const Ve=Te*U-k;de[v]=Ve*w,de[m]=me*T,de[u]=B,l.push(de.x,de.y,de.z),de[v]=0,de[m]=0,de[u]=S>0?1:-1,h.push(de.x,de.y,de.z),p.push(Te/C),p.push(1-he/M),I+=1}}for(let he=0;he<M;he++)for(let me=0;me<C;me++){const Te=f+me+D*he,Ve=f+me+D*(he+1),Ae=f+(me+1)+D*(he+1),ze=f+(me+1)+D*he;d.push(Te,Ve,ze),d.push(Ve,Ae,ze),Y+=6}c.addGroup(g,Y,N),g+=Y,f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ri extends Lt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,c=0,d=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:d};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],p=[],f=[],g=[];let x=0;const v=[],m=i/2;let u=0;w(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Et(p,3)),this.setAttribute("normal",new Et(f,3)),this.setAttribute("uv",new Et(g,2));function w(){const y=new Z,A=new Z;let S=0;const C=(t-e)/i;for(let M=0;M<=r;M++){const N=[],U=M/r,O=U*(t-e)+e;for(let k=0;k<=s;k++){const Q=k/s,B=Q*d+c,D=Math.sin(B),q=Math.cos(B);A.x=O*D,A.y=-U*i+m,A.z=O*q,p.push(A.x,A.y,A.z),y.set(D,C,q).normalize(),f.push(y.x,y.y,y.z),g.push(Q,1-U),N.push(x++)}v.push(N)}for(let M=0;M<s;M++)for(let N=0;N<r;N++){const U=v[N][M],O=v[N+1][M],k=v[N+1][M+1],Q=v[N][M+1];(e>0||N!==0)&&(h.push(U,O,Q),S+=3),(t>0||N!==r-1)&&(h.push(O,k,Q),S+=3)}l.addGroup(u,S,0),u+=S}function T(y){const A=x,S=new Ke,C=new Z;let M=0;const N=y===!0?e:t,U=y===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,m*U,0),f.push(0,U,0),g.push(.5,.5),x++;const O=x;for(let k=0;k<=s;k++){const B=k/s*d+c,D=Math.cos(B),q=Math.sin(B);C.x=N*q,C.y=m*U,C.z=N*D,p.push(C.x,C.y,C.z),f.push(0,U,0),S.x=D*.5+.5,S.y=q*.5*U+.5,g.push(S.x,S.y),x++}for(let k=0;k<s;k++){const Q=A+k,B=O+k;y===!0?h.push(B,B+1,Q):h.push(B+1,B,Q),M+=3}l.addGroup(u,M,y===!0?1:2),u+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fo extends Ri{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,i,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new fo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Oi extends Lt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(i),d=Math.floor(s),l=c+1,h=d+1,p=e/c,f=t/d,g=[],x=[],v=[],m=[];for(let u=0;u<h;u++){const w=u*f-a;for(let T=0;T<l;T++){const y=T*p-r;x.push(y,-w,0),v.push(0,0,1),m.push(T/c),m.push(1-u/d)}}for(let u=0;u<d;u++)for(let w=0;w<c;w++){const T=w+l*u,y=w+l*(u+1),A=w+1+l*(u+1),S=w+1+l*u;g.push(T,y,S),g.push(y,A,S)}this.setIndex(g),this.setAttribute("position",new Et(x,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zs extends Lt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const d=Math.min(a+c,Math.PI);let l=0;const h=[],p=new Z,f=new Z,g=[],x=[],v=[],m=[];for(let u=0;u<=i;u++){const w=[],T=u/i,y=a+T*c,A=e*Math.cos(y),S=Math.sqrt(e*e-A*A);let C=0;u===0&&a===0?C=.5/t:u===i&&d===Math.PI&&(C=-.5/t);for(let M=0;M<=t;M++){const N=M/t,U=s+N*r;p.x=-S*Math.cos(U),p.y=A,p.z=S*Math.sin(U),x.push(p.x,p.y,p.z),f.copy(p).normalize(),v.push(f.x,f.y,f.z),m.push(N+C,1-T),w.push(l++)}h.push(w)}for(let u=0;u<i;u++)for(let w=0;w<t;w++){const T=h[u][w+1],y=h[u][w],A=h[u+1][w],S=h[u+1][w+1];(u!==0||a>0)&&g.push(T,y,S),(u!==i-1||d<Math.PI)&&g.push(y,A,S)}this.setIndex(g),this.setAttribute("position",new Et(x,3)),this.setAttribute("normal",new Et(v,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class po extends Lt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const d=[],l=[],h=[],p=[],f=new Z,g=new Z,x=new Z;for(let v=0;v<=i;v++){const m=a+v/i*c;for(let u=0;u<=s;u++){const w=u/s*r;g.x=(e+t*Math.cos(m))*Math.cos(w),g.y=(e+t*Math.cos(m))*Math.sin(w),g.z=t*Math.sin(m),l.push(g.x,g.y,g.z),f.x=e*Math.cos(w),f.y=e*Math.sin(w),x.subVectors(g,f).normalize(),h.push(x.x,x.y,x.z),p.push(u/s),p.push(v/i)}}for(let v=1;v<=i;v++)for(let m=1;m<=s;m++){const u=(s+1)*v+m-1,w=(s+1)*(v-1)+m-1,T=(s+1)*(v-1)+m,y=(s+1)*v+m;d.push(u,w,y),d.push(w,T,y)}this.setIndex(d),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Ii(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(vc(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(vc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Dt(n){const e={};for(let t=0;t<n.length;t++){const i=Ii(n[t]);for(const s in i)e[s]=i[s]}return e}function vc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Fh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function id(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Oh={clone:Ii,merge:Dt};var Bh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hn extends Fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bh,this.fragmentShader=zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=Fh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ke().fromArray(s.value);break;case"v3":this.uniforms[i].value=new Z().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ut().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ht().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class kh extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xn extends Fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Va,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gh extends Fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hh extends Fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sd extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const zr=new ht,Mc=new Z,Sc=new Z;class Vh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.mapType=Wt,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uo,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),Sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sc),t.updateMatrixWorld(),zr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Qi||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ts=new Z,As=new Ui,nn=new Z;class rd extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ts,As,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ts,As,nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ts,As,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ts,As,nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const In=new Z,yc=new Ke,bc=new Ke;class Bt extends rd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(In.x,In.y).multiplyScalar(-e/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(In.x,In.y).multiplyScalar(-e/In.z)}getViewSize(e,t){return this.getViewBounds(e,yc,bc),t.subVectors(bc,yc)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const d=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/d,t-=a.offsetY*i/l,s*=a.width/d,i*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Wh extends Vh{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0}}class ei extends sd{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Wh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ad extends rd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,c=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,d=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class od extends sd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Si=-90,yi=1;class jh extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bt(Si,yi,e,t);s.layers=this.layers,this.add(s);const r=new Bt(Si,yi,e,t);r.layers=this.layers,this.add(r);const a=new Bt(Si,yi,e,t);a.layers=this.layers,this.add(a);const c=new Bt(Si,yi,e,t);c.layers=this.layers,this.add(c);const d=new Bt(Si,yi,e,t);d.layers=this.layers,this.add(d);const l=new Bt(Si,yi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,c,d]=t;for(const l of t)this.remove(l);if(e===cn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===Qi)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,d,l,h]=this.children,p=e.getRenderTarget(),f=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,f,g),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Xh extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const vo=class vo{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};vo.prototype.isMatrix2=!0;let Ec=vo;function wc(n,e,t,i){const s=qh(i);switch(t){case Vl:return n*e;case jl:return n*e/s.components*s.byteLength;case so:return n*e/s.components*s.byteLength;case si:return n*e*2/s.components*s.byteLength;case ro:return n*e*2/s.components*s.byteLength;case Wl:return n*e*3/s.components*s.byteLength;case Jt:return n*e*4/s.components*s.byteLength;case ao:return n*e*4/s.components*s.byteLength;case Us:case Fs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Os:case Bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:case ga:return Math.max(n,16)*Math.max(e,8)/4;case fa:case ma:return Math.max(n,8)*Math.max(e,8)/2;case xa:case _a:case Ma:case Sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case va:case js:case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Na:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ua:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Oa:case Ba:case za:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ka:case Ga:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xs:case Ha:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qh(n){switch(n){case Wt:case zl:return{byteLength:1,components:1};case Ki:case kl:case En:return{byteLength:2,components:1};case no:case io:return{byteLength:2,components:4};case un:case to:case on:return{byteLength:4,components:1};case Gl:case Hl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:eo}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=eo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function $h(n){const e=new WeakMap;function t(c,d){const l=c.array,h=c.usage,p=l.byteLength,f=n.createBuffer();n.bindBuffer(d,f),n.bufferData(d,l,h),c.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:p}}function i(c,d,l){const h=d.array,p=d.updateRanges;if(n.bindBuffer(l,c),p.length===0)n.bufferSubData(l,0,h);else{p.sort((g,x)=>g.start-x.start);let f=0;for(let g=1;g<p.length;g++){const x=p[f],v=p[g];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++f,p[f]=v)}p.length=f+1;for(let g=0,x=p.length;g<x;g++){const v=p[g];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=e.get(c);d&&(n.deleteBuffer(d.buffer),e.delete(c))}function a(c,d){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,d));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,c,d),l.version=c.version}}return{get:s,remove:r,update:a}}var Yh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ef=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,rf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,af=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,of=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,df=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_f=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Sf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ef=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Af=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Rf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Cf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,If=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Uf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ff=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Of=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Bf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Hf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Vf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$f=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Qf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ip=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ap=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,op=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ap=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ip=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Up=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Op=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,im=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,om=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,um=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_m=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Sm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Am=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Yh,alphahash_pars_fragment:Zh,alphamap_fragment:Kh,alphamap_pars_fragment:Jh,alphatest_fragment:Qh,alphatest_pars_fragment:ef,aomap_fragment:tf,aomap_pars_fragment:nf,batching_pars_vertex:sf,batching_vertex:rf,begin_vertex:af,beginnormal_vertex:of,bsdfs:cf,iridescence_fragment:lf,bumpmap_pars_fragment:df,clipping_planes_fragment:uf,clipping_planes_pars_fragment:hf,clipping_planes_pars_vertex:ff,clipping_planes_vertex:pf,color_fragment:mf,color_pars_fragment:gf,color_pars_vertex:xf,color_vertex:_f,common:vf,cube_uv_reflection_fragment:Mf,defaultnormal_vertex:Sf,displacementmap_pars_vertex:yf,displacementmap_vertex:bf,emissivemap_fragment:Ef,emissivemap_pars_fragment:wf,colorspace_fragment:Tf,colorspace_pars_fragment:Af,envmap_fragment:Rf,envmap_common_pars_fragment:Cf,envmap_pars_fragment:Nf,envmap_pars_vertex:Pf,envmap_physical_pars_fragment:Hf,envmap_vertex:Lf,fog_vertex:Df,fog_pars_vertex:If,fog_fragment:Uf,fog_pars_fragment:Ff,gradientmap_pars_fragment:Of,lightmap_pars_fragment:Bf,lights_lambert_fragment:zf,lights_lambert_pars_fragment:kf,lights_pars_begin:Gf,lights_toon_fragment:Vf,lights_toon_pars_fragment:Wf,lights_phong_fragment:jf,lights_phong_pars_fragment:Xf,lights_physical_fragment:qf,lights_physical_pars_fragment:$f,lights_fragment_begin:Yf,lights_fragment_maps:Zf,lights_fragment_end:Kf,lightprobes_pars_fragment:Jf,logdepthbuf_fragment:Qf,logdepthbuf_pars_fragment:ep,logdepthbuf_pars_vertex:tp,logdepthbuf_vertex:np,map_fragment:ip,map_pars_fragment:sp,map_particle_fragment:rp,map_particle_pars_fragment:ap,metalnessmap_fragment:op,metalnessmap_pars_fragment:cp,morphinstance_vertex:lp,morphcolor_vertex:dp,morphnormal_vertex:up,morphtarget_pars_vertex:hp,morphtarget_vertex:fp,normal_fragment_begin:pp,normal_fragment_maps:mp,normal_pars_fragment:gp,normal_pars_vertex:xp,normal_vertex:_p,normalmap_pars_fragment:vp,clearcoat_normal_fragment_begin:Mp,clearcoat_normal_fragment_maps:Sp,clearcoat_pars_fragment:yp,iridescence_pars_fragment:bp,opaque_fragment:Ep,packing:wp,premultiplied_alpha_fragment:Tp,project_vertex:Ap,dithering_fragment:Rp,dithering_pars_fragment:Cp,roughnessmap_fragment:Np,roughnessmap_pars_fragment:Pp,shadowmap_pars_fragment:Lp,shadowmap_pars_vertex:Dp,shadowmap_vertex:Ip,shadowmask_pars_fragment:Up,skinbase_vertex:Fp,skinning_pars_vertex:Op,skinning_vertex:Bp,skinnormal_vertex:zp,specularmap_fragment:kp,specularmap_pars_fragment:Gp,tonemapping_fragment:Hp,tonemapping_pars_fragment:Vp,transmission_fragment:Wp,transmission_pars_fragment:jp,uv_pars_fragment:Xp,uv_pars_vertex:qp,uv_vertex:$p,worldpos_vertex:Yp,background_vert:Zp,background_frag:Kp,backgroundCube_vert:Jp,backgroundCube_frag:Qp,cube_vert:em,cube_frag:tm,depth_vert:nm,depth_frag:im,distance_vert:sm,distance_frag:rm,equirect_vert:am,equirect_frag:om,linedashed_vert:cm,linedashed_frag:lm,meshbasic_vert:dm,meshbasic_frag:um,meshlambert_vert:hm,meshlambert_frag:fm,meshmatcap_vert:pm,meshmatcap_frag:mm,meshnormal_vert:gm,meshnormal_frag:xm,meshphong_vert:_m,meshphong_frag:vm,meshphysical_vert:Mm,meshphysical_frag:Sm,meshtoon_vert:ym,meshtoon_frag:bm,points_vert:Em,points_frag:wm,shadow_vert:Tm,shadow_frag:Am,sprite_vert:Rm,sprite_frag:Cm},Se={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},an={basic:{uniforms:Dt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Dt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Dt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Dt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Dt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new $e(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Dt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Dt([Se.points,Se.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Dt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Dt([Se.common,Se.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Dt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Dt([Se.sprite,Se.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:Dt([Se.common,Se.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:Dt([Se.lights,Se.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};an.physical={uniforms:Dt([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Rs={r:0,b:0,g:0},Nm=new ht,ld=new Oe;ld.set(-1,0,0,0,1,0,0,0,1);function Pm(n,e,t,i,s,r){const a=new $e(0);let c=s===!0?0:1,d,l,h=null,p=0,f=null;function g(w){let T=w.isScene===!0?w.background:null;if(T&&T.isTexture){const y=w.backgroundBlurriness>0;T=e.get(T,y)}return T}function x(w){let T=!1;const y=g(w);y===null?m(a,c):y&&y.isColor&&(m(y,1),T=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(w,T){const y=g(T);y&&(y.isCubeTexture||y.mapping===ir)?(l===void 0&&(l=new lt(new ri(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Ii(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ld),l.material.toneMapped=Ye.getTransfer(y.colorSpace)!==tt,(h!==y||p!==y.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,p=y.version,f=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(d===void 0&&(d=new lt(new Oi(2,2),new hn({name:"BackgroundMaterial",uniforms:Ii(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(d)),d.material.uniforms.t2D.value=y,d.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,d.material.toneMapped=Ye.getTransfer(y.colorSpace)!==tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),d.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||p!==y.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,h=y,p=y.version,f=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null))}function m(w,T){w.getRGB(Rs,id(n)),t.buffers.color.setClear(Rs.r,Rs.g,Rs.b,T,r)}function u(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),c=T,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,m(a,c)},render:x,addToRenderList:v,dispose:u}}function Lm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function c(O,k,Q,B,D){let q=!1;const I=p(O,B,Q,k);r!==I&&(r=I,l(r.object)),q=g(O,B,Q,D),q&&x(O,B,Q,D),D!==null&&e.update(D,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(O,k,Q,B),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function d(){return n.createVertexArray()}function l(O){return n.bindVertexArray(O)}function h(O){return n.deleteVertexArray(O)}function p(O,k,Q,B){const D=B.wireframe===!0;let q=i[k.id];q===void 0&&(q={},i[k.id]=q);const I=O.isInstancedMesh===!0?O.id:0;let Y=q[I];Y===void 0&&(Y={},q[I]=Y);let de=Y[Q.id];de===void 0&&(de={},Y[Q.id]=de);let he=de[D];return he===void 0&&(he=f(d()),de[D]=he),he}function f(O){const k=[],Q=[],B=[];for(let D=0;D<t;D++)k[D]=0,Q[D]=0,B[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Q,attributeDivisors:B,object:O,attributes:{},index:null}}function g(O,k,Q,B){const D=r.attributes,q=k.attributes;let I=0;const Y=Q.getAttributes();for(const de in Y)if(Y[de].location>=0){const me=D[de];let Te=q[de];if(Te===void 0&&(de==="instanceMatrix"&&O.instanceMatrix&&(Te=O.instanceMatrix),de==="instanceColor"&&O.instanceColor&&(Te=O.instanceColor)),me===void 0||me.attribute!==Te||Te&&me.data!==Te.data)return!0;I++}return r.attributesNum!==I||r.index!==B}function x(O,k,Q,B){const D={},q=k.attributes;let I=0;const Y=Q.getAttributes();for(const de in Y)if(Y[de].location>=0){let me=q[de];me===void 0&&(de==="instanceMatrix"&&O.instanceMatrix&&(me=O.instanceMatrix),de==="instanceColor"&&O.instanceColor&&(me=O.instanceColor));const Te={};Te.attribute=me,me&&me.data&&(Te.data=me.data),D[de]=Te,I++}r.attributes=D,r.attributesNum=I,r.index=B}function v(){const O=r.newAttributes;for(let k=0,Q=O.length;k<Q;k++)O[k]=0}function m(O){u(O,0)}function u(O,k){const Q=r.newAttributes,B=r.enabledAttributes,D=r.attributeDivisors;Q[O]=1,B[O]===0&&(n.enableVertexAttribArray(O),B[O]=1),D[O]!==k&&(n.vertexAttribDivisor(O,k),D[O]=k)}function w(){const O=r.newAttributes,k=r.enabledAttributes;for(let Q=0,B=k.length;Q<B;Q++)k[Q]!==O[Q]&&(n.disableVertexAttribArray(Q),k[Q]=0)}function T(O,k,Q,B,D,q,I){I===!0?n.vertexAttribIPointer(O,k,Q,D,q):n.vertexAttribPointer(O,k,Q,B,D,q)}function y(O,k,Q,B){v();const D=B.attributes,q=Q.getAttributes(),I=k.defaultAttributeValues;for(const Y in q){const de=q[Y];if(de.location>=0){let he=D[Y];if(he===void 0&&(Y==="instanceMatrix"&&O.instanceMatrix&&(he=O.instanceMatrix),Y==="instanceColor"&&O.instanceColor&&(he=O.instanceColor)),he!==void 0){const me=he.normalized,Te=he.itemSize,Ve=e.get(he);if(Ve===void 0)continue;const Ae=Ve.buffer,ze=Ve.type,ae=Ve.bytesPerElement,fe=ze===n.INT||ze===n.UNSIGNED_INT||he.gpuType===to;if(he.isInterleavedBufferAttribute){const W=he.data,ge=W.stride,pe=he.offset;if(W.isInstancedInterleavedBuffer){for(let xe=0;xe<de.locationSize;xe++)u(de.location+xe,W.meshPerAttribute);O.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let xe=0;xe<de.locationSize;xe++)m(de.location+xe);n.bindBuffer(n.ARRAY_BUFFER,Ae);for(let xe=0;xe<de.locationSize;xe++)T(de.location+xe,Te/de.locationSize,ze,me,ge*ae,(pe+Te/de.locationSize*xe)*ae,fe)}else{if(he.isInstancedBufferAttribute){for(let W=0;W<de.locationSize;W++)u(de.location+W,he.meshPerAttribute);O.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let W=0;W<de.locationSize;W++)m(de.location+W);n.bindBuffer(n.ARRAY_BUFFER,Ae);for(let W=0;W<de.locationSize;W++)T(de.location+W,Te/de.locationSize,ze,me,Te*ae,Te/de.locationSize*W*ae,fe)}}else if(I!==void 0){const me=I[Y];if(me!==void 0)switch(me.length){case 2:n.vertexAttrib2fv(de.location,me);break;case 3:n.vertexAttrib3fv(de.location,me);break;case 4:n.vertexAttrib4fv(de.location,me);break;default:n.vertexAttrib1fv(de.location,me)}}}}w()}function A(){N();for(const O in i){const k=i[O];for(const Q in k){const B=k[Q];for(const D in B){const q=B[D];for(const I in q)h(q[I].object),delete q[I];delete B[D]}}delete i[O]}}function S(O){if(i[O.id]===void 0)return;const k=i[O.id];for(const Q in k){const B=k[Q];for(const D in B){const q=B[D];for(const I in q)h(q[I].object),delete q[I];delete B[D]}}delete i[O.id]}function C(O){for(const k in i){const Q=i[k];for(const B in Q){const D=Q[B];if(D[O.id]===void 0)continue;const q=D[O.id];for(const I in q)h(q[I].object),delete q[I];delete D[O.id]}}}function M(O){for(const k in i){const Q=i[k],B=O.isInstancedMesh===!0?O.id:0,D=Q[B];if(D!==void 0){for(const q in D){const I=D[q];for(const Y in I)h(I[Y].object),delete I[Y];delete D[q]}delete Q[B],Object.keys(Q).length===0&&delete i[k]}}}function N(){U(),a=!0,r!==s&&(r=s,l(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:N,resetDefaultState:U,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfObject:M,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:w}}function Dm(n,e,t){let i;function s(d){i=d}function r(d,l){n.drawArrays(i,d,l),t.update(l,i,1)}function a(d,l,h){h!==0&&(n.drawArraysInstanced(i,d,l,h),t.update(l,i,h))}function c(d,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,l,0,h);let f=0;for(let g=0;g<h;g++)f+=l[g];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Im(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Jt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const M=C===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Wt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==on&&!M)}function d(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=d(l);h!==l&&(Fe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const p=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:f,maxTextures:g,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:y,maxSamples:A,samples:S}}function Um(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new qn,c=new Oe,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(p,f){const g=p.length!==0||f||i!==0||s;return s=f,i=p.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,f){t=h(p,f,0)},this.setState=function(p,f,g){const x=p.clippingPlanes,v=p.clipIntersection,m=p.clipShadows,u=n.get(p);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{const w=r?0:i,T=w*4;let y=u.clippingState||null;d.value=y,y=h(x,f,T,g);for(let A=0;A!==T;++A)y[A]=t[A];u.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function l(){d.value!==t&&(d.value=t,d.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(p,f,g,x){const v=p!==null?p.length:0;let m=null;if(v!==0){if(m=d.value,x!==!0||m===null){const u=g+v*4,w=f.matrixWorldInverse;c.getNormalMatrix(w),(m===null||m.length<u)&&(m=new Float32Array(u));for(let T=0,y=g;T!==v;++T,y+=4)a.copy(p[T]).applyMatrix4(w,c),a.normal.toArray(m,y),m[y+3]=a.constant}d.value=m,d.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Fn=4,Tc=[.125,.215,.35,.446,.526,.582],Yn=20,Fm=256,Wi=new ad,Ac=new $e;let kr=null,Gr=0,Hr=0,Vr=!1;const Om=new Z;class Rc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:c=Om}=r;kr=this._renderer.getRenderTarget(),Gr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,i,s,d,c),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(kr,Gr,Hr),this._renderer.xr.enabled=Vr,e.scissorTest=!1,bi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ii||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kr=this._renderer.getRenderTarget(),Gr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:En,format:Jt,colorSpace:qs,depthBuffer:!1},s=Cc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cc(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Bm(r)),this._blurMaterial=km(r,e,t),this._ggxMaterial=zm(r,e,t)}return s}_compileMaterial(e){const t=new lt(new Lt,e);this._renderer.compile(t,Wi)}_sceneToCubeUV(e,t,i,s,r){const d=new Bt(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,f=p.autoClear,g=p.toneMapping;p.getClearColor(Ac),p.toneMapping=ln,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new ri,new On({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let u=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,u=!0):(m.color.copy(Ac),u=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(d.up.set(0,l[T],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+h[T],r.y,r.z)):y===1?(d.up.set(0,0,l[T]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+h[T],r.z)):(d.up.set(0,l[T],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+h[T]));const A=this._cubeSize;bi(s,y*A,T>2?A:0,A,A),p.setRenderTarget(s),u&&p.render(v,d),p.render(e,d)}p.toneMapping=g,p.autoClear=f,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ii||e.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const d=this._cubeSize;bi(t,0,0,3*d,2*d),i.setRenderTarget(t),i.render(a,Wi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[i];c.material=a;const d=a.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h),f=0+l*1.25,g=p*f,{_lodMax:x}=this,v=this._sizeLods[i],m=3*v*(i>x-Fn?i-x+Fn:0),u=4*(this._cubeSize-v);d.envMap.value=e.texture,d.roughness.value=g,d.mipInt.value=x-t,bi(r,m,u,3*v,2*v),s.setRenderTarget(r),s.render(c,Wi),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=x-i,bi(e,m,u,3*v,2*v),s.setRenderTarget(e),s.render(c,Wi)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,c){const d=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const h=3,p=this._lodMeshes[s];p.material=l;const f=l.uniforms,g=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Yn-1),v=r/x,m=isFinite(r)?1+Math.floor(h*v):Yn;m>Yn&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const u=[];let w=0;for(let C=0;C<Yn;++C){const M=C/v,N=Math.exp(-M*M/2);u.push(N),C===0?w+=N:C<m&&(w+=2*N)}for(let C=0;C<u.length;C++)u[C]=u[C]/w;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=a==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:T}=this;f.dTheta.value=x,f.mipInt.value=T-i;const y=this._sizeLods[s],A=3*y*(s>T-Fn?s-T+Fn:0),S=4*(this._cubeSize-y);bi(t,A,S,3*y,2*y),d.setRenderTarget(t),d.render(p,Wi)}}function Bm(n){const e=[],t=[],i=[];let s=n;const r=n-Fn+1+Tc.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let d=1/c;a>n-Fn?d=Tc[a-n+Fn-1]:a===0&&(d=0),t.push(d);const l=1/(c-2),h=-l,p=1+l,f=[h,h,p,h,p,p,h,h,p,p,h,p],g=6,x=6,v=3,m=2,u=1,w=new Float32Array(v*x*g),T=new Float32Array(m*x*g),y=new Float32Array(u*x*g);for(let S=0;S<g;S++){const C=S%3*2/3-1,M=S>2?0:-1,N=[C,M,0,C+2/3,M,0,C+2/3,M+1,0,C,M,0,C+2/3,M+1,0,C,M+1,0];w.set(N,v*x*S),T.set(f,m*x*S);const U=[S,S,S,S,S,S];y.set(U,u*x*S)}const A=new Lt;A.setAttribute("position",new Ut(w,v)),A.setAttribute("uv",new Ut(T,m)),A.setAttribute("faceIndex",new Ut(y,u)),i.push(new lt(A,null)),s>Fn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Cc(n,e,t){const i=new dn(n,e,t);return i.texture.mapping=ir,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function bi(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function zm(n,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:or(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function km(n,e,t){const i=new Float32Array(Yn),s=new Z(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:or(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Nc(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:or(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Pc(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:or(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function or(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class dd extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ed(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ri(5,5,5),r=new hn({name:"CubemapFromEquirect",uniforms:Ii(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:yn});r.uniforms.tEquirect.value=t;const a=new lt(s,r),c=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Nt),new jh(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Gm(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,g=!1){return f==null?null:g?a(f):r(f)}function r(f){if(f&&f.isTexture){const g=f.mapping;if(g===hr||g===fr)if(e.has(f)){const x=e.get(f).texture;return c(x,f.mapping)}else{const x=f.image;if(x&&x.height>0){const v=new dd(x.height);return v.fromEquirectangularTexture(n,f),e.set(f,v),f.addEventListener("dispose",l),c(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const g=f.mapping,x=g===hr||g===fr,v=g===ii||g===Li;if(x||v){let m=t.get(f);const u=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==u)return i===null&&(i=new Rc(n)),m=x?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const w=f.image;return x&&w&&w.height>0||v&&w&&d(w)?(i===null&&(i=new Rc(n)),m=x?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function c(f,g){return g===hr?f.mapping=ii:g===fr&&(f.mapping=Li),f}function d(f){let g=0;const x=6;for(let v=0;v<x;v++)f[v]!==void 0&&g++;return g===x}function l(f){const g=f.target;g.removeEventListener("dispose",l);const x=e.get(g);x!==void 0&&(e.delete(g),x.dispose())}function h(f){const g=f.target;g.removeEventListener("dispose",h);const x=t.get(g);x!==void 0&&(t.delete(g),x.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function Hm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ti("WebGLRenderer: "+i+" extension not supported."),s}}}function Vm(n,e,t,i){const s={},r=new WeakMap;function a(p){const f=p.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete s[f.id];const g=r.get(f);g&&(e.remove(g),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(p,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function d(p){const f=p.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER)}function l(p){const f=[],g=p.index,x=p.attributes.position;let v=0;if(x===void 0)return;if(g!==null){const w=g.array;v=g.version;for(let T=0,y=w.length;T<y;T+=3){const A=w[T+0],S=w[T+1],C=w[T+2];f.push(A,S,S,C,C,A)}}else{const w=x.array;v=x.version;for(let T=0,y=w.length/3-1;T<y;T+=3){const A=T+0,S=T+1,C=T+2;f.push(A,S,S,C,C,A)}}const m=new(x.count>=65535?Jl:Kl)(f,1);m.version=v;const u=r.get(p);u&&e.remove(u),r.set(p,m)}function h(p){const f=r.get(p);if(f){const g=p.index;g!==null&&f.version<g.version&&l(p)}else l(p);return r.get(p)}return{get:c,update:d,getWireframeAttribute:h}}function Wm(n,e,t){let i;function s(p){i=p}let r,a;function c(p){r=p.type,a=p.bytesPerElement}function d(p,f){n.drawElements(i,f,r,p*a),t.update(f,i,1)}function l(p,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,p*a,g),t.update(f,i,g))}function h(p,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,p,0,g);let v=0;for(let m=0;m<g;m++)v+=f[m];t.update(v,i,1)}this.setMode=s,this.setIndex=c,this.render=d,this.renderInstances=l,this.renderMultiDraw=h}function jm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,c){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Xm(n,e,t){const i=new WeakMap,s=new ut;function r(a,c,d){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=h!==void 0?h.length:0;let f=i.get(c);if(f===void 0||f.count!==p){let N=function(){C.dispose(),i.delete(c),c.removeEventListener("dispose",N)};f!==void 0&&f.texture.dispose();const g=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,v=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],u=c.morphAttributes.normal||[],w=c.morphAttributes.color||[];let T=0;g===!0&&(T=1),x===!0&&(T=2),v===!0&&(T=3);let y=c.attributes.position.count*T,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*A*4*p),C=new ql(S,y,A,p);C.type=on,C.needsUpdate=!0;const M=T*4;for(let U=0;U<p;U++){const O=m[U],k=u[U],Q=w[U],B=y*A*4*U;for(let D=0;D<O.count;D++){const q=D*M;g===!0&&(s.fromBufferAttribute(O,D),S[B+q+0]=s.x,S[B+q+1]=s.y,S[B+q+2]=s.z,S[B+q+3]=0),x===!0&&(s.fromBufferAttribute(k,D),S[B+q+4]=s.x,S[B+q+5]=s.y,S[B+q+6]=s.z,S[B+q+7]=0),v===!0&&(s.fromBufferAttribute(Q,D),S[B+q+8]=s.x,S[B+q+9]=s.y,S[B+q+10]=s.z,S[B+q+11]=Q.itemSize===4?s.w:1)}}f={count:p,texture:C,size:new Ke(y,A)},i.set(c,f),c.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let v=0;v<l.length;v++)g+=l[v];const x=c.morphTargetsRelative?1:1-g;d.getUniforms().setValue(n,"morphTargetBaseInfluence",x),d.getUniforms().setValue(n,"morphTargetInfluences",l)}d.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function qm(n,e,t,i,s){let r=new WeakMap;function a(l){const h=s.render.frame,p=l.geometry,f=e.get(l,p);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",d)===!1&&l.addEventListener("dispose",d),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==h&&(g.update(),r.set(g,h))}return f}function c(){r=new WeakMap}function d(l){const h=l.target;h.removeEventListener("dispose",d),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const $m={[Pl]:"LINEAR_TONE_MAPPING",[Ll]:"REINHARD_TONE_MAPPING",[Dl]:"CINEON_TONE_MAPPING",[Il]:"ACES_FILMIC_TONE_MAPPING",[Fl]:"AGX_TONE_MAPPING",[Ol]:"NEUTRAL_TONE_MAPPING",[Ul]:"CUSTOM_TONE_MAPPING"};function Ym(n,e,t,i,s,r){const a=new dn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Di(e,t):void 0}),c=new dn(e,t,{type:En,depthBuffer:!1,stencilBuffer:!1}),d=new Lt;d.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Et([0,2,0,0,2,0],2));const l=new kh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new lt(d,l),p=new ad(-1,1,1,-1,0,1);let f=null,g=null,x=!1,v,m=null,u=[],w=!1;this.setSize=function(T,y){a.setSize(T,y),c.setSize(T,y);for(let A=0;A<u.length;A++){const S=u[A];S.setSize&&S.setSize(T,y)}},this.setEffects=function(T){u=T,w=u.length>0&&u[0].isRenderPass===!0;const y=a.width,A=a.height;for(let S=0;S<u.length;S++){const C=u[S];C.setSize&&C.setSize(y,A)}},this.begin=function(T,y){if(x||T.toneMapping===ln&&u.length===0)return!1;if(m=y,y!==null){const A=y.width,S=y.height;(a.width!==A||a.height!==S)&&this.setSize(A,S)}return w===!1&&T.setRenderTarget(a),v=T.toneMapping,T.toneMapping=ln,!0},this.hasRenderPass=function(){return w},this.end=function(T,y){T.toneMapping=v,x=!0;let A=a,S=c;for(let C=0;C<u.length;C++){const M=u[C];if(M.enabled!==!1&&(M.render(T,S,A,y),M.needsSwap!==!1)){const N=A;A=S,S=N}}if(f!==T.outputColorSpace||g!==T.toneMapping){f=T.outputColorSpace,g=T.toneMapping,l.defines={},Ye.getTransfer(f)===tt&&(l.defines.SRGB_TRANSFER="");const C=$m[g];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,T.setRenderTarget(m),T.render(h,p),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),d.dispose(),l.dispose()}}const ud=new Pt,Xa=new Di(1,1),hd=new ql,fd=new _h,pd=new ed,Lc=[],Dc=[],Ic=new Float32Array(16),Uc=new Float32Array(9),Fc=new Float32Array(4);function Bi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Lc[s];if(r===void 0&&(r=new Float32Array(s),Lc[s]=r),e!==0){i.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,n[a].toArray(r,c)}return r}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function cr(n,e){let t=Dc[e];t===void 0&&(t=new Int32Array(e),Dc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Zm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function Qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function eg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Fc.set(i),n.uniformMatrix2fv(this.addr,!1,Fc),yt(t,i)}}function tg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Uc.set(i),n.uniformMatrix3fv(this.addr,!1,Uc),yt(t,i)}}function ng(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Ic.set(i),n.uniformMatrix4fv(this.addr,!1,Ic),yt(t,i)}}function ig(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function ug(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Xa.compareFunction=t.isReversedDepthBuffer()?co:oo,r=Xa):r=ud,t.setTexture2D(e||r,s)}function hg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||fd,s)}function fg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||pd,s)}function pg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||hd,s)}function mg(n){switch(n){case 5126:return Zm;case 35664:return Km;case 35665:return Jm;case 35666:return Qm;case 35674:return eg;case 35675:return tg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return sg;case 35668:case 35672:return rg;case 35669:case 35673:return ag;case 5125:return og;case 36294:return cg;case 36295:return lg;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return ug;case 35679:case 36299:case 36307:return hg;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return pg}}function gg(n,e){n.uniform1fv(this.addr,e)}function xg(n,e){const t=Bi(e,this.size,2);n.uniform2fv(this.addr,t)}function _g(n,e){const t=Bi(e,this.size,3);n.uniform3fv(this.addr,t)}function vg(n,e){const t=Bi(e,this.size,4);n.uniform4fv(this.addr,t)}function Mg(n,e){const t=Bi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Sg(n,e){const t=Bi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function yg(n,e){const t=Bi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function bg(n,e){n.uniform1iv(this.addr,e)}function Eg(n,e){n.uniform2iv(this.addr,e)}function wg(n,e){n.uniform3iv(this.addr,e)}function Tg(n,e){n.uniform4iv(this.addr,e)}function Ag(n,e){n.uniform1uiv(this.addr,e)}function Rg(n,e){n.uniform2uiv(this.addr,e)}function Cg(n,e){n.uniform3uiv(this.addr,e)}function Ng(n,e){n.uniform4uiv(this.addr,e)}function Pg(n,e,t){const i=this.cache,s=e.length,r=cr(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Xa:a=ud;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Lg(n,e,t){const i=this.cache,s=e.length,r=cr(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||fd,r[a])}function Dg(n,e,t){const i=this.cache,s=e.length,r=cr(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||pd,r[a])}function Ig(n,e,t){const i=this.cache,s=e.length,r=cr(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hd,r[a])}function Ug(n){switch(n){case 5126:return gg;case 35664:return xg;case 35665:return _g;case 35666:return vg;case 35674:return Mg;case 35675:return Sg;case 35676:return yg;case 5124:case 35670:return bg;case 35667:case 35671:return Eg;case 35668:case 35672:return wg;case 35669:case 35673:return Tg;case 5125:return Ag;case 36294:return Rg;case 36295:return Cg;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Pg;case 35679:case 36299:case 36307:return Lg;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Ig}}class Fg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=mg(t.type)}}class Og{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ug(t.type)}}class Bg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const Wr=/(\w+)(\])?(\[|\.)?/g;function Oc(n,e){n.seq.push(e),n.map[e.id]=e}function zg(n,e,t){const i=n.name,s=i.length;for(Wr.lastIndex=0;;){const r=Wr.exec(i),a=Wr.lastIndex;let c=r[1];const d=r[2]==="]",l=r[3];if(d&&(c=c|0),l===void 0||l==="["&&a+2===s){Oc(t,l===void 0?new Fg(c,n,e):new Og(c,n,e));break}else{let p=t.map[c];p===void 0&&(p=new Bg(c),Oc(t,p)),t=p}}}class zs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const c=e.getActiveUniform(t,a),d=e.getUniformLocation(t,c.name);zg(c,d,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],d=i[c.id];d.needsUpdate!==!1&&c.setValue(e,d.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Bc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const kg=37297;let Gg=0;function Hg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;i.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return i.join(`
`)}const zc=new Oe;function Vg(n){Ye._getMatrix(zc,Ye.workingColorSpace,n);const e=`mat3( ${zc.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case $s:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function kc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Hg(n.getShaderSource(e),c)}else return r}function Wg(n,e){const t=Vg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const jg={[Pl]:"Linear",[Ll]:"Reinhard",[Dl]:"Cineon",[Il]:"ACESFilmic",[Fl]:"AgX",[Ol]:"Neutral",[Ul]:"Custom"};function Xg(n,e){const t=jg[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Cs=new Z;function qg(){Ye.getLuminanceCoefficients(Cs);const n=Cs.x.toFixed(4),e=Cs.y.toFixed(4),t=Cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $g(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function Yg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Zg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:c}}return t}function Yi(n){return n!==""}function Gc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function qa(n){return n.replace(Kg,Qg)}const Jg=new Map;function Qg(n,e){let t=He[e];if(t===void 0){const i=Jg.get(e);if(i!==void 0)t=He[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qa(t)}const e0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vc(n){return n.replace(e0,t0)}function t0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const n0={[Is]:"SHADOWMAP_TYPE_PCF",[$i]:"SHADOWMAP_TYPE_VSM"};function i0(n){return n0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const s0={[ii]:"ENVMAP_TYPE_CUBE",[Li]:"ENVMAP_TYPE_CUBE",[ir]:"ENVMAP_TYPE_CUBE_UV"};function r0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":s0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const a0={[Li]:"ENVMAP_MODE_REFRACTION"};function o0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":a0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const c0={[Nl]:"ENVMAP_BLENDING_MULTIPLY",[Ku]:"ENVMAP_BLENDING_MIX",[Ju]:"ENVMAP_BLENDING_ADD"};function l0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":c0[n.combine]||"ENVMAP_BLENDING_NONE"}function d0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function u0(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const d=i0(t),l=r0(t),h=o0(t),p=l0(t),f=d0(t),g=$g(t),x=Yg(r),v=s.createProgram();let m,u,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Yi).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Yi).join(`
`),u.length>0&&(u+=`
`)):(m=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),u=[Wc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ln?"#define TONE_MAPPING":"",t.toneMapping!==ln?He.tonemapping_pars_fragment:"",t.toneMapping!==ln?Xg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Wg("linearToOutputTexel",t.outputColorSpace),qg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yi).join(`
`)),a=qa(a),a=Gc(a,t),a=Hc(a,t),c=qa(c),c=Gc(c,t),c=Hc(c,t),a=Vc(a),c=Vc(c),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const T=w+m+a,y=w+u+c,A=Bc(s,s.VERTEX_SHADER,T),S=Bc(s,s.FRAGMENT_SHADER,y);s.attachShader(v,A),s.attachShader(v,S),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(O){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(v)||"",Q=s.getShaderInfoLog(A)||"",B=s.getShaderInfoLog(S)||"",D=k.trim(),q=Q.trim(),I=B.trim();let Y=!0,de=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,S);else{const he=kc(s,A,"vertex"),me=kc(s,S,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+D+`
`+he+`
`+me)}else D!==""?Fe("WebGLProgram: Program Info Log:",D):(q===""||I==="")&&(de=!1);de&&(O.diagnostics={runnable:Y,programLog:D,vertexShader:{log:q,prefix:m},fragmentShader:{log:I,prefix:u}})}s.deleteShader(A),s.deleteShader(S),M=new zs(s,v),N=Zg(s,v)}let M;this.getUniforms=function(){return M===void 0&&C(this),M};let N;this.getAttributes=function(){return N===void 0&&C(this),N};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(v,kg)),U},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Gg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=S,this}let h0=0;class f0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new p0(e),t.set(e,i)),i}}class p0{constructor(e){this.id=h0++,this.code=e,this.usedTimes=0}}function m0(n){return n===si||n===js||n===Xs}function g0(n,e,t,i,s,r){const a=new $l,c=new f0,d=new Set,l=[],h=new Map,p=i.logarithmicDepthBuffer;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return d.add(M),M===0?"uv":`uv${M}`}function v(M,N,U,O,k,Q){const B=O.fog,D=k.geometry,q=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?O.environment:null,I=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,Y=e.get(M.envMap||q,I),de=Y&&Y.mapping===ir?Y.image.height:null,he=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&Fe("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const me=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Te=me!==void 0?me.length:0;let Ve=0;D.morphAttributes.position!==void 0&&(Ve=1),D.morphAttributes.normal!==void 0&&(Ve=2),D.morphAttributes.color!==void 0&&(Ve=3);let Ae,ze,ae,fe;if(he){const Ne=an[he];Ae=Ne.vertexShader,ze=Ne.fragmentShader}else{Ae=M.vertexShader,ze=M.fragmentShader;const Ne=c.getVertexShaderStage(M),pt=c.getFragmentShaderStage(M);c.update(M,Ne,pt),ae=Ne.id,fe=pt.id}const W=n.getRenderTarget(),ge=n.state.buffers.depth.getReversed(),pe=k.isInstancedMesh===!0,xe=k.isBatchedMesh===!0,ke=!!M.map,Be=!!M.matcap,Je=!!Y,Xe=!!M.aoMap,We=!!M.lightMap,ct=!!M.bumpMap&&M.wireframe===!1,dt=!!M.normalMap,ft=!!M.displacementMap,xt=!!M.emissiveMap,rt=!!M.metalnessMap,X=!!M.roughnessMap,R=M.anisotropy>0,ie=M.clearcoat>0,se=M.dispersion>0,b=M.iridescence>0,_=M.sheen>0,P=M.transmission>0,L=R&&!!M.anisotropyMap,z=ie&&!!M.clearcoatMap,$=ie&&!!M.clearcoatNormalMap,G=ie&&!!M.clearcoatRoughnessMap,F=b&&!!M.iridescenceMap,H=b&&!!M.iridescenceThicknessMap,ne=_&&!!M.sheenColorMap,le=_&&!!M.sheenRoughnessMap,oe=!!M.specularMap,re=!!M.specularColorMap,Me=!!M.specularIntensityMap,be=P&&!!M.transmissionMap,De=P&&!!M.thicknessMap,V=!!M.gradientMap,ve=!!M.alphaMap,ce=M.alphaTest>0,_e=!!M.alphaHash,we=!!M.extensions;let ue=ln;M.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(ue=n.toneMapping);const Le={shaderID:he,shaderType:M.type,shaderName:M.name,vertexShader:Ae,fragmentShader:ze,defines:M.defines,customVertexShaderID:ae,customFragmentShaderID:fe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:xe,batchingColor:xe&&k._colorsTexture!==null,instancing:pe,instancingColor:pe&&k.instanceColor!==null,instancingMorph:pe&&k.morphTexture!==null,outputColorSpace:W===null?n.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ke,matcap:Be,envMap:Je,envMapMode:Je&&Y.mapping,envMapCubeUVHeight:de,aoMap:Xe,lightMap:We,bumpMap:ct,normalMap:dt,displacementMap:ft,emissiveMap:xt,normalMapObjectSpace:dt&&M.normalMapType===th,normalMapTangentSpace:dt&&M.normalMapType===Va,packedNormalMap:dt&&M.normalMapType===Va&&m0(M.normalMap.format),metalnessMap:rt,roughnessMap:X,anisotropy:R,anisotropyMap:L,clearcoat:ie,clearcoatMap:z,clearcoatNormalMap:$,clearcoatRoughnessMap:G,dispersion:se,iridescence:b,iridescenceMap:F,iridescenceThicknessMap:H,sheen:_,sheenColorMap:ne,sheenRoughnessMap:le,specularMap:oe,specularColorMap:re,specularIntensityMap:Me,transmission:P,transmissionMap:be,thicknessMap:De,gradientMap:V,opaque:M.transparent===!1&&M.blending===wi&&M.alphaToCoverage===!1,alphaMap:ve,alphaTest:ce,alphaHash:_e,combine:M.combine,mapUv:ke&&x(M.map.channel),aoMapUv:Xe&&x(M.aoMap.channel),lightMapUv:We&&x(M.lightMap.channel),bumpMapUv:ct&&x(M.bumpMap.channel),normalMapUv:dt&&x(M.normalMap.channel),displacementMapUv:ft&&x(M.displacementMap.channel),emissiveMapUv:xt&&x(M.emissiveMap.channel),metalnessMapUv:rt&&x(M.metalnessMap.channel),roughnessMapUv:X&&x(M.roughnessMap.channel),anisotropyMapUv:L&&x(M.anisotropyMap.channel),clearcoatMapUv:z&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:$&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:F&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:H&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:le&&x(M.sheenRoughnessMap.channel),specularMapUv:oe&&x(M.specularMap.channel),specularColorMapUv:re&&x(M.specularColorMap.channel),specularIntensityMapUv:Me&&x(M.specularIntensityMap.channel),transmissionMapUv:be&&x(M.transmissionMap.channel),thicknessMapUv:De&&x(M.thicknessMap.channel),alphaMapUv:ve&&x(M.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(dt||R),vertexNormals:!!D.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!D.attributes.uv&&(ke||ve),fog:!!B,useFog:M.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||D.attributes.normal===void 0&&dt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ge,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ve,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:ue,decodeVideoTexture:ke&&M.map.isVideoTexture===!0&&Ye.getTransfer(M.map.colorSpace)===tt,decodeVideoTextureEmissive:xt&&M.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(M.emissiveMap.colorSpace)===tt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===vn,flipSided:M.side===zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:we&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&M.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Le.vertexUv1s=d.has(1),Le.vertexUv2s=d.has(2),Le.vertexUv3s=d.has(3),d.clear(),Le}function m(M){const N=[];if(M.shaderID?N.push(M.shaderID):(N.push(M.customVertexShaderID),N.push(M.customFragmentShaderID)),M.defines!==void 0)for(const U in M.defines)N.push(U),N.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(u(N,M),w(N,M),N.push(n.outputColorSpace)),N.push(M.customProgramCacheKey),N.join()}function u(M,N){M.push(N.precision),M.push(N.outputColorSpace),M.push(N.envMapMode),M.push(N.envMapCubeUVHeight),M.push(N.mapUv),M.push(N.alphaMapUv),M.push(N.lightMapUv),M.push(N.aoMapUv),M.push(N.bumpMapUv),M.push(N.normalMapUv),M.push(N.displacementMapUv),M.push(N.emissiveMapUv),M.push(N.metalnessMapUv),M.push(N.roughnessMapUv),M.push(N.anisotropyMapUv),M.push(N.clearcoatMapUv),M.push(N.clearcoatNormalMapUv),M.push(N.clearcoatRoughnessMapUv),M.push(N.iridescenceMapUv),M.push(N.iridescenceThicknessMapUv),M.push(N.sheenColorMapUv),M.push(N.sheenRoughnessMapUv),M.push(N.specularMapUv),M.push(N.specularColorMapUv),M.push(N.specularIntensityMapUv),M.push(N.transmissionMapUv),M.push(N.thicknessMapUv),M.push(N.combine),M.push(N.fogExp2),M.push(N.sizeAttenuation),M.push(N.morphTargetsCount),M.push(N.morphAttributeCount),M.push(N.numDirLights),M.push(N.numPointLights),M.push(N.numSpotLights),M.push(N.numSpotLightMaps),M.push(N.numHemiLights),M.push(N.numRectAreaLights),M.push(N.numDirLightShadows),M.push(N.numPointLightShadows),M.push(N.numSpotLightShadows),M.push(N.numSpotLightShadowsWithMaps),M.push(N.numLightProbes),M.push(N.shadowMapType),M.push(N.toneMapping),M.push(N.numClippingPlanes),M.push(N.numClipIntersection),M.push(N.depthPacking)}function w(M,N){a.disableAll(),N.instancing&&a.enable(0),N.instancingColor&&a.enable(1),N.instancingMorph&&a.enable(2),N.matcap&&a.enable(3),N.envMap&&a.enable(4),N.normalMapObjectSpace&&a.enable(5),N.normalMapTangentSpace&&a.enable(6),N.clearcoat&&a.enable(7),N.iridescence&&a.enable(8),N.alphaTest&&a.enable(9),N.vertexColors&&a.enable(10),N.vertexAlphas&&a.enable(11),N.vertexUv1s&&a.enable(12),N.vertexUv2s&&a.enable(13),N.vertexUv3s&&a.enable(14),N.vertexTangents&&a.enable(15),N.anisotropy&&a.enable(16),N.alphaHash&&a.enable(17),N.batching&&a.enable(18),N.dispersion&&a.enable(19),N.batchingColor&&a.enable(20),N.gradientMap&&a.enable(21),N.packedNormalMap&&a.enable(22),N.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),N.fog&&a.enable(0),N.useFog&&a.enable(1),N.flatShading&&a.enable(2),N.logarithmicDepthBuffer&&a.enable(3),N.reversedDepthBuffer&&a.enable(4),N.skinning&&a.enable(5),N.morphTargets&&a.enable(6),N.morphNormals&&a.enable(7),N.morphColors&&a.enable(8),N.premultipliedAlpha&&a.enable(9),N.shadowMapEnabled&&a.enable(10),N.doubleSided&&a.enable(11),N.flipSided&&a.enable(12),N.useDepthPacking&&a.enable(13),N.dithering&&a.enable(14),N.transmission&&a.enable(15),N.sheen&&a.enable(16),N.opaque&&a.enable(17),N.pointsUvs&&a.enable(18),N.decodeVideoTexture&&a.enable(19),N.decodeVideoTextureEmissive&&a.enable(20),N.alphaToCoverage&&a.enable(21),N.numLightProbeGrids>0&&a.enable(22),N.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function T(M){const N=g[M.type];let U;if(N){const O=an[N];U=Oh.clone(O.uniforms)}else U=M.uniforms;return U}function y(M,N){let U=h.get(N);return U!==void 0?++U.usedTimes:(U=new u0(n,N,M,s),l.push(U),h.set(N,U)),U}function A(M){if(--M.usedTimes===0){const N=l.indexOf(M);l[N]=l[l.length-1],l.pop(),h.delete(M.cacheKey),M.destroy()}}function S(M){c.remove(M)}function C(){c.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:T,acquireProgram:y,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:C}}function x0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let c=n.get(a);return c===void 0&&(c={},n.set(a,c)),c}function i(a){n.delete(a)}function s(a,c,d){n.get(a)[c]=d}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function _0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function jc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Xc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f){let g=0;return f.isInstancedMesh&&(g+=2),f.isSkinnedMesh&&(g+=1),g}function c(f,g,x,v,m,u){let w=n[e];return w===void 0?(w={id:f.id,object:f,geometry:g,material:x,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:u},n[e]=w):(w.id=f.id,w.object=f,w.geometry=g,w.material=x,w.materialVariant=a(f),w.groupOrder=v,w.renderOrder=f.renderOrder,w.z=m,w.group=u),e++,w}function d(f,g,x,v,m,u){const w=c(f,g,x,v,m,u);x.transmission>0?i.push(w):x.transparent===!0?s.push(w):t.push(w)}function l(f,g,x,v,m,u){const w=c(f,g,x,v,m,u);x.transmission>0?i.unshift(w):x.transparent===!0?s.unshift(w):t.unshift(w)}function h(f,g,x){t.length>1&&t.sort(f||_0),i.length>1&&i.sort(g||jc),s.length>1&&s.sort(g||jc),x&&(t.reverse(),i.reverse(),s.reverse())}function p(){for(let f=e,g=n.length;f<g;f++){const x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:d,unshift:l,finish:p,sort:h}}function v0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Xc,n.set(i,[a])):s>=r.length?(a=new Xc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function M0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new $e};break;case"SpotLight":t={position:new Z,direction:new Z,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return n[e.id]=t,t}}}function S0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let y0=0;function b0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function E0(n){const e=new M0,t=S0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Z);const s=new Z,r=new ht,a=new ht;function c(l){let h=0,p=0,f=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let g=0,x=0,v=0,m=0,u=0,w=0,T=0,y=0,A=0,S=0,C=0;l.sort(b0);for(let N=0,U=l.length;N<U;N++){const O=l[N],k=O.color,Q=O.intensity,B=O.distance;let D=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===si?D=O.shadow.map.texture:D=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)h+=k.r*Q,p+=k.g*Q,f+=k.b*Q;else if(O.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(O.sh.coefficients[q],Q);C++}else if(O.isDirectionalLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const I=O.shadow,Y=t.get(O);Y.shadowIntensity=I.intensity,Y.shadowBias=I.bias,Y.shadowNormalBias=I.normalBias,Y.shadowRadius=I.radius,Y.shadowMapSize=I.mapSize,i.directionalShadow[g]=Y,i.directionalShadowMap[g]=D,i.directionalShadowMatrix[g]=O.shadow.matrix,w++}i.directional[g]=q,g++}else if(O.isSpotLight){const q=e.get(O);q.position.setFromMatrixPosition(O.matrixWorld),q.color.copy(k).multiplyScalar(Q),q.distance=B,q.coneCos=Math.cos(O.angle),q.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),q.decay=O.decay,i.spot[v]=q;const I=O.shadow;if(O.map&&(i.spotLightMap[A]=O.map,A++,I.updateMatrices(O),O.castShadow&&S++),i.spotLightMatrix[v]=I.matrix,O.castShadow){const Y=t.get(O);Y.shadowIntensity=I.intensity,Y.shadowBias=I.bias,Y.shadowNormalBias=I.normalBias,Y.shadowRadius=I.radius,Y.shadowMapSize=I.mapSize,i.spotShadow[v]=Y,i.spotShadowMap[v]=D,y++}v++}else if(O.isRectAreaLight){const q=e.get(O);q.color.copy(k).multiplyScalar(Q),q.halfWidth.set(O.width*.5,0,0),q.halfHeight.set(0,O.height*.5,0),i.rectArea[m]=q,m++}else if(O.isPointLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),q.distance=O.distance,q.decay=O.decay,O.castShadow){const I=O.shadow,Y=t.get(O);Y.shadowIntensity=I.intensity,Y.shadowBias=I.bias,Y.shadowNormalBias=I.normalBias,Y.shadowRadius=I.radius,Y.shadowMapSize=I.mapSize,Y.shadowCameraNear=I.camera.near,Y.shadowCameraFar=I.camera.far,i.pointShadow[x]=Y,i.pointShadowMap[x]=D,i.pointShadowMatrix[x]=O.shadow.matrix,T++}i.point[x]=q,x++}else if(O.isHemisphereLight){const q=e.get(O);q.skyColor.copy(O.color).multiplyScalar(Q),q.groundColor.copy(O.groundColor).multiplyScalar(Q),i.hemi[u]=q,u++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=f;const M=i.hash;(M.directionalLength!==g||M.pointLength!==x||M.spotLength!==v||M.rectAreaLength!==m||M.hemiLength!==u||M.numDirectionalShadows!==w||M.numPointShadows!==T||M.numSpotShadows!==y||M.numSpotMaps!==A||M.numLightProbes!==C)&&(i.directional.length=g,i.spot.length=v,i.rectArea.length=m,i.point.length=x,i.hemi.length=u,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+A-S,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=C,M.directionalLength=g,M.pointLength=x,M.spotLength=v,M.rectAreaLength=m,M.hemiLength=u,M.numDirectionalShadows=w,M.numPointShadows=T,M.numSpotShadows=y,M.numSpotMaps=A,M.numLightProbes=C,i.version=y0++)}function d(l,h){let p=0,f=0,g=0,x=0,v=0;const m=h.matrixWorldInverse;for(let u=0,w=l.length;u<w;u++){const T=l[u];if(T.isDirectionalLight){const y=i.directional[p];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(T.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),g++}else if(T.isRectAreaLight){const y=i.rectArea[x];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:c,setupView:d,state:i}}function qc(n){const e=new E0(n),t=[],i=[],s=[];function r(f){p.camera=f,t.length=0,i.length=0,s.length=0}function a(f){t.push(f)}function c(f){i.push(f)}function d(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const p={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:d}}function w0(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new qc(n),e.set(s,[c])):r>=a.length?(c=new qc(n),a.push(c)):c=a[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const T0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,R0=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],C0=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],$c=new ht,ji=new Z,jr=new Z;function N0(n,e,t){let i=new uo;const s=new Ke,r=new Ke,a=new ut,c=new Gh,d=new Hh,l={},h=t.maxTextureSize,p={[Bn]:zt,[zt]:Bn,[vn]:vn},f=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:T0,fragmentShader:A0}),g=f.clone();g.defines.HORIZONTAL_PASS=1;const x=new Lt;x.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new lt(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Is;let u=this.type;this.render=function(S,C,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Lu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Is);const N=n.getRenderTarget(),U=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),k=n.state;k.setBlending(yn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Q=u!==this.type;Q&&C.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(D=>D.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,D=S.length;B<D;B++){const q=S[B],I=q.shadow;if(I===void 0){Fe("WebGLShadowMap:",q,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;s.copy(I.mapSize);const Y=I.getFrameExtents();s.multiply(Y),r.copy(I.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,I.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,I.mapSize.y=r.y));const de=n.state.buffers.depth.getReversed();if(I.camera._reversedDepth=de,I.map===null||Q===!0){if(I.map!==null&&(I.map.depthTexture!==null&&(I.map.depthTexture.dispose(),I.map.depthTexture=null),I.map.dispose()),this.type===$i){if(q.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}I.map=new dn(s.x,s.y,{format:si,type:En,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),I.map.texture.name=q.name+".shadowMap",I.map.depthTexture=new Di(s.x,s.y,on),I.map.depthTexture.name=q.name+".shadowMapDepth",I.map.depthTexture.format=wn,I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=Tt,I.map.depthTexture.magFilter=Tt}else q.isPointLight?(I.map=new dd(s.x),I.map.depthTexture=new Uh(s.x,un)):(I.map=new dn(s.x,s.y),I.map.depthTexture=new Di(s.x,s.y,un)),I.map.depthTexture.name=q.name+".shadowMap",I.map.depthTexture.format=wn,this.type===Is?(I.map.depthTexture.compareFunction=de?co:oo,I.map.depthTexture.minFilter=Nt,I.map.depthTexture.magFilter=Nt):(I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=Tt,I.map.depthTexture.magFilter=Tt);I.camera.updateProjectionMatrix()}const he=I.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<he;me++){if(I.map.isWebGLCubeRenderTarget)n.setRenderTarget(I.map,me),n.clear();else{me===0&&(n.setRenderTarget(I.map),n.clear());const Te=I.getViewport(me);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),k.viewport(a)}if(q.isPointLight){const Te=I.camera,Ve=I.matrix,Ae=q.distance||Te.far;Ae!==Te.far&&(Te.far=Ae,Te.updateProjectionMatrix()),ji.setFromMatrixPosition(q.matrixWorld),Te.position.copy(ji),jr.copy(Te.position),jr.add(R0[me]),Te.up.copy(C0[me]),Te.lookAt(jr),Te.updateMatrixWorld(),Ve.makeTranslation(-ji.x,-ji.y,-ji.z),$c.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),I._frustum.setFromProjectionMatrix($c,Te.coordinateSystem,Te.reversedDepth)}else I.updateMatrices(q);i=I.getFrustum(),y(C,M,I.camera,q,this.type)}I.isPointLightShadow!==!0&&this.type===$i&&w(I,M),I.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(N,U,O)};function w(S,C){const M=e.update(v);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,g.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,g.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new dn(s.x,s.y,{format:si,type:En})),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(C,null,M,f,v,null),g.uniforms.shadow_pass.value=S.mapPass.texture,g.uniforms.resolution.value=S.mapSize,g.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(C,null,M,g,v,null)}function T(S,C,M,N){let U=null;const O=M.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(O!==void 0)U=O;else if(U=M.isPointLight===!0?d:c,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=U.uuid,Q=C.uuid;let B=l[k];B===void 0&&(B={},l[k]=B);let D=B[Q];D===void 0&&(D=U.clone(),B[Q]=D,C.addEventListener("dispose",A)),U=D}if(U.visible=C.visible,U.wireframe=C.wireframe,N===$i?U.side=C.shadowSide!==null?C.shadowSide:C.side:U.side=C.shadowSide!==null?C.shadowSide:p[C.side],U.alphaMap=C.alphaMap,U.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,U.map=C.map,U.clipShadows=C.clipShadows,U.clippingPlanes=C.clippingPlanes,U.clipIntersection=C.clipIntersection,U.displacementMap=C.displacementMap,U.displacementScale=C.displacementScale,U.displacementBias=C.displacementBias,U.wireframeLinewidth=C.wireframeLinewidth,U.linewidth=C.linewidth,M.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const k=n.properties.get(U);k.light=M}return U}function y(S,C,M,N,U){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&U===$i)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,S.matrixWorld);const Q=e.update(S),B=S.material;if(Array.isArray(B)){const D=Q.groups;for(let q=0,I=D.length;q<I;q++){const Y=D[q],de=B[Y.materialIndex];if(de&&de.visible){const he=T(S,de,N,U);S.onBeforeShadow(n,S,C,M,Q,he,Y),n.renderBufferDirect(M,null,Q,he,S,Y),S.onAfterShadow(n,S,C,M,Q,he,Y)}}}else if(B.visible){const D=T(S,B,N,U);S.onBeforeShadow(n,S,C,M,Q,D,null),n.renderBufferDirect(M,null,Q,D,S,null),S.onAfterShadow(n,S,C,M,Q,D,null)}}const k=S.children;for(let Q=0,B=k.length;Q<B;Q++)y(k[Q],C,M,N,U)}function A(S){S.target.removeEventListener("dispose",A);for(const M in l){const N=l[M],U=S.target.uuid;U in N&&(N[U].dispose(),delete N[U])}}}function P0(n,e){function t(){let V=!1;const ve=new ut;let ce=null;const _e=new ut(0,0,0,0);return{setMask:function(we){ce!==we&&!V&&(n.colorMask(we,we,we,we),ce=we)},setLocked:function(we){V=we},setClear:function(we,ue,Le,Ne,pt){pt===!0&&(we*=Ne,ue*=Ne,Le*=Ne),ve.set(we,ue,Le,Ne),_e.equals(ve)===!1&&(n.clearColor(we,ue,Le,Ne),_e.copy(ve))},reset:function(){V=!1,ce=null,_e.set(-1,0,0,0)}}}function i(){let V=!1,ve=!1,ce=null,_e=null,we=null;return{setReversed:function(ue){if(ve!==ue){const Le=e.get("EXT_clip_control");ue?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ve=ue;const Ne=we;we=null,this.setClear(Ne)}},getReversed:function(){return ve},setTest:function(ue){ue?W(n.DEPTH_TEST):ge(n.DEPTH_TEST)},setMask:function(ue){ce!==ue&&!V&&(n.depthMask(ue),ce=ue)},setFunc:function(ue){if(ve&&(ue=uh[ue]),_e!==ue){switch(ue){case sa:n.depthFunc(n.NEVER);break;case ra:n.depthFunc(n.ALWAYS);break;case aa:n.depthFunc(n.LESS);break;case Pi:n.depthFunc(n.LEQUAL);break;case oa:n.depthFunc(n.EQUAL);break;case ca:n.depthFunc(n.GEQUAL);break;case la:n.depthFunc(n.GREATER);break;case da:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=ue}},setLocked:function(ue){V=ue},setClear:function(ue){we!==ue&&(we=ue,ve&&(ue=1-ue),n.clearDepth(ue))},reset:function(){V=!1,ce=null,_e=null,we=null,ve=!1}}}function s(){let V=!1,ve=null,ce=null,_e=null,we=null,ue=null,Le=null,Ne=null,pt=null;return{setTest:function(at){V||(at?W(n.STENCIL_TEST):ge(n.STENCIL_TEST))},setMask:function(at){ve!==at&&!V&&(n.stencilMask(at),ve=at)},setFunc:function(at,Qt,en){(ce!==at||_e!==Qt||we!==en)&&(n.stencilFunc(at,Qt,en),ce=at,_e=Qt,we=en)},setOp:function(at,Qt,en){(ue!==at||Le!==Qt||Ne!==en)&&(n.stencilOp(at,Qt,en),ue=at,Le=Qt,Ne=en)},setLocked:function(at){V=at},setClear:function(at){pt!==at&&(n.clearStencil(at),pt=at)},reset:function(){V=!1,ve=null,ce=null,_e=null,we=null,ue=null,Le=null,Ne=null,pt=null}}}const r=new t,a=new i,c=new s,d=new WeakMap,l=new WeakMap;let h={},p={},f={},g=new WeakMap,x=[],v=null,m=!1,u=null,w=null,T=null,y=null,A=null,S=null,C=null,M=new $e(0,0,0),N=0,U=!1,O=null,k=null,Q=null,B=null,D=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,Y=0;const de=n.getParameter(n.VERSION);de.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(de)[1]),I=Y>=1):de.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(de)[1]),I=Y>=2);let he=null,me={};const Te=n.getParameter(n.SCISSOR_BOX),Ve=n.getParameter(n.VIEWPORT),Ae=new ut().fromArray(Te),ze=new ut().fromArray(Ve);function ae(V,ve,ce,_e){const we=new Uint8Array(4),ue=n.createTexture();n.bindTexture(V,ue),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<ce;Le++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(ve,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,we):n.texImage2D(ve+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,we);return ue}const fe={};fe[n.TEXTURE_2D]=ae(n.TEXTURE_2D,n.TEXTURE_2D,1),fe[n.TEXTURE_CUBE_MAP]=ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[n.TEXTURE_2D_ARRAY]=ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),fe[n.TEXTURE_3D]=ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),W(n.DEPTH_TEST),a.setFunc(Pi),ct(!1),dt(Yo),W(n.CULL_FACE),Xe(yn);function W(V){h[V]!==!0&&(n.enable(V),h[V]=!0)}function ge(V){h[V]!==!1&&(n.disable(V),h[V]=!1)}function pe(V,ve){return f[V]!==ve?(n.bindFramebuffer(V,ve),f[V]=ve,V===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ve),V===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ve),!0):!1}function xe(V,ve){let ce=x,_e=!1;if(V){ce=g.get(ve),ce===void 0&&(ce=[],g.set(ve,ce));const we=V.textures;if(ce.length!==we.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let ue=0,Le=we.length;ue<Le;ue++)ce[ue]=n.COLOR_ATTACHMENT0+ue;ce.length=we.length,_e=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,_e=!0);_e&&n.drawBuffers(ce)}function ke(V){return v!==V?(n.useProgram(V),v=V,!0):!1}const Be={[$n]:n.FUNC_ADD,[Iu]:n.FUNC_SUBTRACT,[Uu]:n.FUNC_REVERSE_SUBTRACT};Be[Fu]=n.MIN,Be[Ou]=n.MAX;const Je={[Bu]:n.ZERO,[zu]:n.ONE,[ku]:n.SRC_COLOR,[na]:n.SRC_ALPHA,[Xu]:n.SRC_ALPHA_SATURATE,[Wu]:n.DST_COLOR,[Hu]:n.DST_ALPHA,[Gu]:n.ONE_MINUS_SRC_COLOR,[ia]:n.ONE_MINUS_SRC_ALPHA,[ju]:n.ONE_MINUS_DST_COLOR,[Vu]:n.ONE_MINUS_DST_ALPHA,[qu]:n.CONSTANT_COLOR,[$u]:n.ONE_MINUS_CONSTANT_COLOR,[Yu]:n.CONSTANT_ALPHA,[Zu]:n.ONE_MINUS_CONSTANT_ALPHA};function Xe(V,ve,ce,_e,we,ue,Le,Ne,pt,at){if(V===yn){m===!0&&(ge(n.BLEND),m=!1);return}if(m===!1&&(W(n.BLEND),m=!0),V!==Du){if(V!==u||at!==U){if((w!==$n||A!==$n)&&(n.blendEquation(n.FUNC_ADD),w=$n,A=$n),at)switch(V){case wi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ni:n.blendFunc(n.ONE,n.ONE);break;case Zo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ko:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",V);break}else switch(V){case wi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ni:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Zo:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ko:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",V);break}T=null,y=null,S=null,C=null,M.set(0,0,0),N=0,u=V,U=at}return}we=we||ve,ue=ue||ce,Le=Le||_e,(ve!==w||we!==A)&&(n.blendEquationSeparate(Be[ve],Be[we]),w=ve,A=we),(ce!==T||_e!==y||ue!==S||Le!==C)&&(n.blendFuncSeparate(Je[ce],Je[_e],Je[ue],Je[Le]),T=ce,y=_e,S=ue,C=Le),(Ne.equals(M)===!1||pt!==N)&&(n.blendColor(Ne.r,Ne.g,Ne.b,pt),M.copy(Ne),N=pt),u=V,U=!1}function We(V,ve){V.side===vn?ge(n.CULL_FACE):W(n.CULL_FACE);let ce=V.side===zt;ve&&(ce=!ce),ct(ce),V.blending===wi&&V.transparent===!1?Xe(yn):Xe(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),r.setMask(V.colorWrite);const _e=V.stencilWrite;c.setTest(_e),_e&&(c.setMask(V.stencilWriteMask),c.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),c.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),xt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?W(n.SAMPLE_ALPHA_TO_COVERAGE):ge(n.SAMPLE_ALPHA_TO_COVERAGE)}function ct(V){O!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),O=V)}function dt(V){V!==Nu?(W(n.CULL_FACE),V!==k&&(V===Yo?n.cullFace(n.BACK):V===Pu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ge(n.CULL_FACE),k=V}function ft(V){V!==Q&&(I&&n.lineWidth(V),Q=V)}function xt(V,ve,ce){V?(W(n.POLYGON_OFFSET_FILL),(B!==ve||D!==ce)&&(B=ve,D=ce,a.getReversed()&&(ve=-ve),n.polygonOffset(ve,ce))):ge(n.POLYGON_OFFSET_FILL)}function rt(V){V?W(n.SCISSOR_TEST):ge(n.SCISSOR_TEST)}function X(V){V===void 0&&(V=n.TEXTURE0+q-1),he!==V&&(n.activeTexture(V),he=V)}function R(V,ve,ce){ce===void 0&&(he===null?ce=n.TEXTURE0+q-1:ce=he);let _e=me[ce];_e===void 0&&(_e={type:void 0,texture:void 0},me[ce]=_e),(_e.type!==V||_e.texture!==ve)&&(he!==ce&&(n.activeTexture(ce),he=ce),n.bindTexture(V,ve||fe[V]),_e.type=V,_e.texture=ve)}function ie(){const V=me[he];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function se(){try{n.compressedTexImage2D(...arguments)}catch(V){et("WebGLState:",V)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(V){et("WebGLState:",V)}}function _(){try{n.texSubImage2D(...arguments)}catch(V){et("WebGLState:",V)}}function P(){try{n.texSubImage3D(...arguments)}catch(V){et("WebGLState:",V)}}function L(){try{n.compressedTexSubImage2D(...arguments)}catch(V){et("WebGLState:",V)}}function z(){try{n.compressedTexSubImage3D(...arguments)}catch(V){et("WebGLState:",V)}}function $(){try{n.texStorage2D(...arguments)}catch(V){et("WebGLState:",V)}}function G(){try{n.texStorage3D(...arguments)}catch(V){et("WebGLState:",V)}}function F(){try{n.texImage2D(...arguments)}catch(V){et("WebGLState:",V)}}function H(){try{n.texImage3D(...arguments)}catch(V){et("WebGLState:",V)}}function ne(V){return p[V]!==void 0?p[V]:n.getParameter(V)}function le(V,ve){p[V]!==ve&&(n.pixelStorei(V,ve),p[V]=ve)}function oe(V){Ae.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),Ae.copy(V))}function re(V){ze.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),ze.copy(V))}function Me(V,ve){let ce=l.get(ve);ce===void 0&&(ce=new WeakMap,l.set(ve,ce));let _e=ce.get(V);_e===void 0&&(_e=n.getUniformBlockIndex(ve,V.name),ce.set(V,_e))}function be(V,ve){const _e=l.get(ve).get(V);d.get(ve)!==_e&&(n.uniformBlockBinding(ve,_e,V.__bindingPointIndex),d.set(ve,_e))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},p={},he=null,me={},f={},g=new WeakMap,x=[],v=null,m=!1,u=null,w=null,T=null,y=null,A=null,S=null,C=null,M=new $e(0,0,0),N=0,U=!1,O=null,k=null,Q=null,B=null,D=null,Ae.set(0,0,n.canvas.width,n.canvas.height),ze.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:W,disable:ge,bindFramebuffer:pe,drawBuffers:xe,useProgram:ke,setBlending:Xe,setMaterial:We,setFlipSided:ct,setCullFace:dt,setLineWidth:ft,setPolygonOffset:xt,setScissorTest:rt,activeTexture:X,bindTexture:R,unbindTexture:ie,compressedTexImage2D:se,compressedTexImage3D:b,texImage2D:F,texImage3D:H,pixelStorei:le,getParameter:ne,updateUBOMapping:Me,uniformBlockBinding:be,texStorage2D:$,texStorage3D:G,texSubImage2D:_,texSubImage3D:P,compressedTexSubImage2D:L,compressedTexSubImage3D:z,scissor:oe,viewport:re,reset:De}}function L0(n,e,t,i,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ke,h=new WeakMap,p=new Set;let f;const g=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,_){return x?new OffscreenCanvas(b,_):Ys("canvas")}function m(b,_,P){let L=1;const z=se(b);if((z.width>P||z.height>P)&&(L=P/Math.max(z.width,z.height)),L<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const $=Math.floor(L*z.width),G=Math.floor(L*z.height);f===void 0&&(f=v($,G));const F=_?v($,G):f;return F.width=$,F.height=G,F.getContext("2d").drawImage(b,0,0,$,G),Fe("WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+$+"x"+G+")."),F}else return"data"in b&&Fe("WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),b;return b}function u(b){return b.generateMipmaps}function w(b){n.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,_,P,L,z,$=!1){if(b!==null){if(n[b]!==void 0)return n[b];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let G;L&&(G=e.get("EXT_texture_norm16"),G||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let F=_;if(_===n.RED&&(P===n.FLOAT&&(F=n.R32F),P===n.HALF_FLOAT&&(F=n.R16F),P===n.UNSIGNED_BYTE&&(F=n.R8),P===n.UNSIGNED_SHORT&&G&&(F=G.R16_EXT),P===n.SHORT&&G&&(F=G.R16_SNORM_EXT)),_===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.R8UI),P===n.UNSIGNED_SHORT&&(F=n.R16UI),P===n.UNSIGNED_INT&&(F=n.R32UI),P===n.BYTE&&(F=n.R8I),P===n.SHORT&&(F=n.R16I),P===n.INT&&(F=n.R32I)),_===n.RG&&(P===n.FLOAT&&(F=n.RG32F),P===n.HALF_FLOAT&&(F=n.RG16F),P===n.UNSIGNED_BYTE&&(F=n.RG8),P===n.UNSIGNED_SHORT&&G&&(F=G.RG16_EXT),P===n.SHORT&&G&&(F=G.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.RG8UI),P===n.UNSIGNED_SHORT&&(F=n.RG16UI),P===n.UNSIGNED_INT&&(F=n.RG32UI),P===n.BYTE&&(F=n.RG8I),P===n.SHORT&&(F=n.RG16I),P===n.INT&&(F=n.RG32I)),_===n.RGB_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.RGB8UI),P===n.UNSIGNED_SHORT&&(F=n.RGB16UI),P===n.UNSIGNED_INT&&(F=n.RGB32UI),P===n.BYTE&&(F=n.RGB8I),P===n.SHORT&&(F=n.RGB16I),P===n.INT&&(F=n.RGB32I)),_===n.RGBA_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.RGBA8UI),P===n.UNSIGNED_SHORT&&(F=n.RGBA16UI),P===n.UNSIGNED_INT&&(F=n.RGBA32UI),P===n.BYTE&&(F=n.RGBA8I),P===n.SHORT&&(F=n.RGBA16I),P===n.INT&&(F=n.RGBA32I)),_===n.RGB&&(P===n.UNSIGNED_SHORT&&G&&(F=G.RGB16_EXT),P===n.SHORT&&G&&(F=G.RGB16_SNORM_EXT),P===n.UNSIGNED_INT_5_9_9_9_REV&&(F=n.RGB9_E5),P===n.UNSIGNED_INT_10F_11F_11F_REV&&(F=n.R11F_G11F_B10F)),_===n.RGBA){const H=$?$s:Ye.getTransfer(z);P===n.FLOAT&&(F=n.RGBA32F),P===n.HALF_FLOAT&&(F=n.RGBA16F),P===n.UNSIGNED_BYTE&&(F=H===tt?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT&&G&&(F=G.RGBA16_EXT),P===n.SHORT&&G&&(F=G.RGBA16_SNORM_EXT),P===n.UNSIGNED_SHORT_4_4_4_4&&(F=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(F=n.RGB5_A1)}return(F===n.R16F||F===n.R32F||F===n.RG16F||F===n.RG32F||F===n.RGBA16F||F===n.RGBA32F)&&e.get("EXT_color_buffer_float"),F}function A(b,_){let P;return b?_===null||_===un||_===Ji?P=n.DEPTH24_STENCIL8:_===on?P=n.DEPTH32F_STENCIL8:_===Ki&&(P=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===un||_===Ji?P=n.DEPTH_COMPONENT24:_===on?P=n.DEPTH_COMPONENT32F:_===Ki&&(P=n.DEPTH_COMPONENT16),P}function S(b,_){return u(b)===!0||b.isFramebufferTexture&&b.minFilter!==Tt&&b.minFilter!==Nt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function C(b){const _=b.target;_.removeEventListener("dispose",C),N(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&p.delete(_)}function M(b){const _=b.target;_.removeEventListener("dispose",M),O(_)}function N(b){const _=i.get(b);if(_.__webglInit===void 0)return;const P=b.source,L=g.get(P);if(L){const z=L[_.__cacheKey];z.usedTimes--,z.usedTimes===0&&U(b),Object.keys(L).length===0&&g.delete(P)}i.remove(b)}function U(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const P=b.source,L=g.get(P);delete L[_.__cacheKey],a.memory.textures--}function O(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(_.__webglFramebuffer[L]))for(let z=0;z<_.__webglFramebuffer[L].length;z++)n.deleteFramebuffer(_.__webglFramebuffer[L][z]);else n.deleteFramebuffer(_.__webglFramebuffer[L]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[L])}else{if(Array.isArray(_.__webglFramebuffer))for(let L=0;L<_.__webglFramebuffer.length;L++)n.deleteFramebuffer(_.__webglFramebuffer[L]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let L=0;L<_.__webglColorRenderbuffer.length;L++)_.__webglColorRenderbuffer[L]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[L]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const P=b.textures;for(let L=0,z=P.length;L<z;L++){const $=i.get(P[L]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),a.memory.textures--),i.remove(P[L])}i.remove(b)}let k=0;function Q(){k=0}function B(){return k}function D(b){k=b}function q(){const b=k;return b>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),k+=1,b}function I(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function Y(b,_){const P=i.get(b);if(b.isVideoTexture&&R(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&P.__version!==b.version){const L=b.image;if(L===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(L.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{ge(P,b,_);return}}else b.isExternalTexture&&(P.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+_)}function de(b,_){const P=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&P.__version!==b.version){ge(P,b,_);return}else b.isExternalTexture&&(P.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+_)}function he(b,_){const P=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&P.__version!==b.version){ge(P,b,_);return}t.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+_)}function me(b,_){const P=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&P.__version!==b.version){pe(P,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+_)}const Te={[ua]:n.REPEAT,[Mn]:n.CLAMP_TO_EDGE,[ha]:n.MIRRORED_REPEAT},Ve={[Tt]:n.NEAREST,[Qu]:n.NEAREST_MIPMAP_NEAREST,[as]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[pr]:n.LINEAR_MIPMAP_NEAREST,[Zn]:n.LINEAR_MIPMAP_LINEAR},Ae={[nh]:n.NEVER,[oh]:n.ALWAYS,[ih]:n.LESS,[oo]:n.LEQUAL,[sh]:n.EQUAL,[co]:n.GEQUAL,[rh]:n.GREATER,[ah]:n.NOTEQUAL};function ze(b,_){if(_.type===on&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Nt||_.magFilter===pr||_.magFilter===as||_.magFilter===Zn||_.minFilter===Nt||_.minFilter===pr||_.minFilter===as||_.minFilter===Zn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Te[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Te[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Te[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Ve[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Ve[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Tt||_.minFilter!==as&&_.minFilter!==Zn||_.type===on&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const P=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function ae(b,_){let P=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",C));const L=_.source;let z=g.get(L);z===void 0&&(z={},g.set(L,z));const $=I(_);if($!==b.__cacheKey){z[$]===void 0&&(z[$]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,P=!0),z[$].usedTimes++;const G=z[b.__cacheKey];G!==void 0&&(z[b.__cacheKey].usedTimes--,G.usedTimes===0&&U(_)),b.__cacheKey=$,b.__webglTexture=z[$].texture}return P}function fe(b,_,P){return Math.floor(Math.floor(b/P)/_)}function W(b,_,P,L){const $=b.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,P,L,_.data);else{$.sort((le,oe)=>le.start-oe.start);let G=0;for(let le=1;le<$.length;le++){const oe=$[G],re=$[le],Me=oe.start+oe.count,be=fe(re.start,_.width,4),De=fe(oe.start,_.width,4);re.start<=Me+1&&be===De&&fe(re.start+re.count-1,_.width,4)===be?oe.count=Math.max(oe.count,re.start+re.count-oe.start):(++G,$[G]=re)}$.length=G+1;const F=t.getParameter(n.UNPACK_ROW_LENGTH),H=t.getParameter(n.UNPACK_SKIP_PIXELS),ne=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let le=0,oe=$.length;le<oe;le++){const re=$[le],Me=Math.floor(re.start/4),be=Math.ceil(re.count/4),De=Me%_.width,V=Math.floor(Me/_.width),ve=be,ce=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,V),t.texSubImage2D(n.TEXTURE_2D,0,De,V,ve,ce,P,L,_.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,F),t.pixelStorei(n.UNPACK_SKIP_PIXELS,H),t.pixelStorei(n.UNPACK_SKIP_ROWS,ne)}}function ge(b,_,P){let L=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(L=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(L=n.TEXTURE_3D);const z=ae(b,_),$=_.source;t.bindTexture(L,b.__webglTexture,n.TEXTURE0+P);const G=i.get($);if($.version!==G.__version||z===!0){if(t.activeTexture(n.TEXTURE0+P),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ce=Ye.getPrimaries(Ye.workingColorSpace),_e=_.colorSpace===Un?null:Ye.getPrimaries(_.colorSpace),we=_.colorSpace===Un||ce===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let H=m(_.image,!1,s.maxTextureSize);H=ie(_,H);const ne=r.convert(_.format,_.colorSpace),le=r.convert(_.type);let oe=y(_.internalFormat,ne,le,_.normalized,_.colorSpace,_.isVideoTexture);ze(L,_);let re;const Me=_.mipmaps,be=_.isVideoTexture!==!0,De=G.__version===void 0||z===!0,V=$.dataReady,ve=S(_,H);if(_.isDepthTexture)oe=A(_.format===Kn,_.type),De&&(be?t.texStorage2D(n.TEXTURE_2D,1,oe,H.width,H.height):t.texImage2D(n.TEXTURE_2D,0,oe,H.width,H.height,0,ne,le,null));else if(_.isDataTexture)if(Me.length>0){be&&De&&t.texStorage2D(n.TEXTURE_2D,ve,oe,Me[0].width,Me[0].height);for(let ce=0,_e=Me.length;ce<_e;ce++)re=Me[ce],be?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,re.width,re.height,ne,le,re.data):t.texImage2D(n.TEXTURE_2D,ce,oe,re.width,re.height,0,ne,le,re.data);_.generateMipmaps=!1}else be?(De&&t.texStorage2D(n.TEXTURE_2D,ve,oe,H.width,H.height),V&&W(_,H,ne,le)):t.texImage2D(n.TEXTURE_2D,0,oe,H.width,H.height,0,ne,le,H.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){be&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,oe,Me[0].width,Me[0].height,H.depth);for(let ce=0,_e=Me.length;ce<_e;ce++)if(re=Me[ce],_.format!==Jt)if(ne!==null)if(be){if(V)if(_.layerUpdates.size>0){const we=wc(re.width,re.height,_.format,_.type);for(const ue of _.layerUpdates){const Le=re.data.subarray(ue*we/re.data.BYTES_PER_ELEMENT,(ue+1)*we/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,ue,re.width,re.height,1,ne,Le)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,re.width,re.height,H.depth,ne,re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ce,oe,re.width,re.height,H.depth,0,re.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?V&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,re.width,re.height,H.depth,ne,le,re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ce,oe,re.width,re.height,H.depth,0,ne,le,re.data)}else{be&&De&&t.texStorage2D(n.TEXTURE_2D,ve,oe,Me[0].width,Me[0].height);for(let ce=0,_e=Me.length;ce<_e;ce++)re=Me[ce],_.format!==Jt?ne!==null?be?V&&t.compressedTexSubImage2D(n.TEXTURE_2D,ce,0,0,re.width,re.height,ne,re.data):t.compressedTexImage2D(n.TEXTURE_2D,ce,oe,re.width,re.height,0,re.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,re.width,re.height,ne,le,re.data):t.texImage2D(n.TEXTURE_2D,ce,oe,re.width,re.height,0,ne,le,re.data)}else if(_.isDataArrayTexture)if(be){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,oe,H.width,H.height,H.depth),V)if(_.layerUpdates.size>0){const ce=wc(H.width,H.height,_.format,_.type);for(const _e of _.layerUpdates){const we=H.data.subarray(_e*ce/H.data.BYTES_PER_ELEMENT,(_e+1)*ce/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,H.width,H.height,1,ne,le,we)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,ne,le,H.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,oe,H.width,H.height,H.depth,0,ne,le,H.data);else if(_.isData3DTexture)be?(De&&t.texStorage3D(n.TEXTURE_3D,ve,oe,H.width,H.height,H.depth),V&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,ne,le,H.data)):t.texImage3D(n.TEXTURE_3D,0,oe,H.width,H.height,H.depth,0,ne,le,H.data);else if(_.isFramebufferTexture){if(De)if(be)t.texStorage2D(n.TEXTURE_2D,ve,oe,H.width,H.height);else{let ce=H.width,_e=H.height;for(let we=0;we<ve;we++)t.texImage2D(n.TEXTURE_2D,we,oe,ce,_e,0,ne,le,null),ce>>=1,_e>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ce=n.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),H.parentNode!==ce){ce.appendChild(H),p.add(_),ce.onpaint=_e=>{const we=_e.changedElements;for(const ue of p)we.includes(ue.image)&&(ue.needsUpdate=!0)},ce.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,H);else{const we=n.RGBA,ue=n.RGBA,Le=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,we,ue,Le,H)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Me.length>0){if(be&&De){const ce=se(Me[0]);t.texStorage2D(n.TEXTURE_2D,ve,oe,ce.width,ce.height)}for(let ce=0,_e=Me.length;ce<_e;ce++)re=Me[ce],be?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,ne,le,re):t.texImage2D(n.TEXTURE_2D,ce,oe,ne,le,re);_.generateMipmaps=!1}else if(be){if(De){const ce=se(H);t.texStorage2D(n.TEXTURE_2D,ve,oe,ce.width,ce.height)}V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne,le,H)}else t.texImage2D(n.TEXTURE_2D,0,oe,ne,le,H);u(_)&&w(L),G.__version=$.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function pe(b,_,P){if(_.image.length!==6)return;const L=ae(b,_),z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+P);const $=i.get(z);if(z.version!==$.__version||L===!0){t.activeTexture(n.TEXTURE0+P);const G=Ye.getPrimaries(Ye.workingColorSpace),F=_.colorSpace===Un?null:Ye.getPrimaries(_.colorSpace),H=_.colorSpace===Un||G===F?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,H);const ne=_.isCompressedTexture||_.image[0].isCompressedTexture,le=_.image[0]&&_.image[0].isDataTexture,oe=[];for(let ue=0;ue<6;ue++)!ne&&!le?oe[ue]=m(_.image[ue],!0,s.maxCubemapSize):oe[ue]=le?_.image[ue].image:_.image[ue],oe[ue]=ie(_,oe[ue]);const re=oe[0],Me=r.convert(_.format,_.colorSpace),be=r.convert(_.type),De=y(_.internalFormat,Me,be,_.normalized,_.colorSpace),V=_.isVideoTexture!==!0,ve=$.__version===void 0||L===!0,ce=z.dataReady;let _e=S(_,re);ze(n.TEXTURE_CUBE_MAP,_);let we;if(ne){V&&ve&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,De,re.width,re.height);for(let ue=0;ue<6;ue++){we=oe[ue].mipmaps;for(let Le=0;Le<we.length;Le++){const Ne=we[Le];_.format!==Jt?Me!==null?V?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le,0,0,Ne.width,Ne.height,Me,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le,De,Ne.width,Ne.height,0,Ne.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le,0,0,Ne.width,Ne.height,Me,be,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le,De,Ne.width,Ne.height,0,Me,be,Ne.data)}}}else{if(we=_.mipmaps,V&&ve){we.length>0&&_e++;const ue=se(oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,De,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(le){V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,oe[ue].width,oe[ue].height,Me,be,oe[ue].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,De,oe[ue].width,oe[ue].height,0,Me,be,oe[ue].data);for(let Le=0;Le<we.length;Le++){const pt=we[Le].image[ue].image;V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le+1,0,0,pt.width,pt.height,Me,be,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le+1,De,pt.width,pt.height,0,Me,be,pt.data)}}else{V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Me,be,oe[ue]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,De,Me,be,oe[ue]);for(let Le=0;Le<we.length;Le++){const Ne=we[Le];V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le+1,0,0,Me,be,Ne.image[ue]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Le+1,De,Me,be,Ne.image[ue])}}}u(_)&&w(n.TEXTURE_CUBE_MAP),$.__version=z.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function xe(b,_,P,L,z,$){const G=r.convert(P.format,P.colorSpace),F=r.convert(P.type),H=y(P.internalFormat,G,F,P.normalized,P.colorSpace),ne=i.get(_),le=i.get(P);if(le.__renderTarget=_,!ne.__hasExternalTextures){const oe=Math.max(1,_.width>>$),re=Math.max(1,_.height>>$);z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?t.texImage3D(z,$,H,oe,re,_.depth,0,G,F,null):t.texImage2D(z,$,H,oe,re,0,G,F,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),X(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,L,z,le.__webglTexture,0,rt(_)):(z===n.TEXTURE_2D||z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,L,z,le.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(b,_,P){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){const L=_.depthTexture,z=L&&L.isDepthTexture?L.type:null,$=A(_.stencilBuffer,z),G=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;X(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(_),$,_.width,_.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(_),$,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,$,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,b)}else{const L=_.textures;for(let z=0;z<L.length;z++){const $=L[z],G=r.convert($.format,$.colorSpace),F=r.convert($.type),H=y($.internalFormat,G,F,$.normalized,$.colorSpace);X(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(_),H,_.width,_.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(_),H,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,H,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(b,_,P){const L=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const z=i.get(_.depthTexture);if(z.__renderTarget=_,(!z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),L){if(z.__webglInit===void 0&&(z.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),z.__webglTexture===void 0){z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),ze(n.TEXTURE_CUBE_MAP,_.depthTexture);const ne=r.convert(_.depthTexture.format),le=r.convert(_.depthTexture.type);let oe;_.depthTexture.format===wn?oe=n.DEPTH_COMPONENT24:_.depthTexture.format===Kn&&(oe=n.DEPTH24_STENCIL8);for(let re=0;re<6;re++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,oe,_.width,_.height,0,ne,le,null)}}else Y(_.depthTexture,0);const $=z.__webglTexture,G=rt(_),F=L?n.TEXTURE_CUBE_MAP_POSITIVE_X+P:n.TEXTURE_2D,H=_.depthTexture.format===Kn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===wn)X(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,F,$,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,H,F,$,0);else if(_.depthTexture.format===Kn)X(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,F,$,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,H,F,$,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(b){const _=i.get(b),P=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const L=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),L){const z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,L.removeEventListener("dispose",z)};L.addEventListener("dispose",z),_.__depthDisposeCallback=z}_.__boundDepthTexture=L}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(P)for(let L=0;L<6;L++)Be(_.__webglFramebuffer[L],b,L);else{const L=b.texture.mipmaps;L&&L.length>0?Be(_.__webglFramebuffer[0],b,0):Be(_.__webglFramebuffer,b,0)}else if(P){_.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[L]),_.__webglDepthbuffer[L]===void 0)_.__webglDepthbuffer[L]=n.createRenderbuffer(),ke(_.__webglDepthbuffer[L],b,!1);else{const z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer[L];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,$)}}else{const L=b.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ke(_.__webglDepthbuffer,b,!1);else{const z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xe(b,_,P){const L=i.get(b);_!==void 0&&xe(L.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&Je(b)}function We(b){const _=b.texture,P=i.get(b),L=i.get(_);b.addEventListener("dispose",M);const z=b.textures,$=b.isWebGLCubeRenderTarget===!0,G=z.length>1;if(G||(L.__webglTexture===void 0&&(L.__webglTexture=n.createTexture()),L.__version=_.version,a.memory.textures++),$){P.__webglFramebuffer=[];for(let F=0;F<6;F++)if(_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer[F]=[];for(let H=0;H<_.mipmaps.length;H++)P.__webglFramebuffer[F][H]=n.createFramebuffer()}else P.__webglFramebuffer[F]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer=[];for(let F=0;F<_.mipmaps.length;F++)P.__webglFramebuffer[F]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(G)for(let F=0,H=z.length;F<H;F++){const ne=i.get(z[F]);ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&X(b)===!1){P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let F=0;F<z.length;F++){const H=z[F];P.__webglColorRenderbuffer[F]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[F]);const ne=r.convert(H.format,H.colorSpace),le=r.convert(H.type),oe=y(H.internalFormat,ne,le,H.normalized,H.colorSpace,b.isXRRenderTarget===!0),re=rt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,re,oe,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.RENDERBUFFER,P.__webglColorRenderbuffer[F])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(P.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture),ze(n.TEXTURE_CUBE_MAP,_);for(let F=0;F<6;F++)if(_.mipmaps&&_.mipmaps.length>0)for(let H=0;H<_.mipmaps.length;H++)xe(P.__webglFramebuffer[F][H],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+F,H);else xe(P.__webglFramebuffer[F],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);u(_)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let F=0,H=z.length;F<H;F++){const ne=z[F],le=i.get(ne);let oe=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(oe=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,le.__webglTexture),ze(oe,ne),xe(P.__webglFramebuffer,b,ne,n.COLOR_ATTACHMENT0+F,oe,0),u(ne)&&w(oe)}t.unbindTexture()}else{let F=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(F=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(F,L.__webglTexture),ze(F,_),_.mipmaps&&_.mipmaps.length>0)for(let H=0;H<_.mipmaps.length;H++)xe(P.__webglFramebuffer[H],b,_,n.COLOR_ATTACHMENT0,F,H);else xe(P.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,F,0);u(_)&&w(F),t.unbindTexture()}b.depthBuffer&&Je(b)}function ct(b){const _=b.textures;for(let P=0,L=_.length;P<L;P++){const z=_[P];if(u(z)){const $=T(b),G=i.get(z).__webglTexture;t.bindTexture($,G),w($),t.unbindTexture()}}}const dt=[],ft=[];function xt(b){if(b.samples>0){if(X(b)===!1){const _=b.textures,P=b.width,L=b.height;let z=n.COLOR_BUFFER_BIT;const $=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=i.get(b),F=_.length>1;if(F)for(let ne=0;ne<_.length;ne++)t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);const H=b.texture.mipmaps;H&&H.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let ne=0;ne<_.length;ne++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(z|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(z|=n.STENCIL_BUFFER_BIT)),F){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,G.__webglColorRenderbuffer[ne]);const le=i.get(_[ne]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,P,L,0,0,P,L,z,n.NEAREST),d===!0&&(dt.length=0,ft.length=0,dt.push(n.COLOR_ATTACHMENT0+ne),b.depthBuffer&&b.resolveDepthBuffer===!1&&(dt.push($),ft.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ft)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),F)for(let ne=0;ne<_.length;ne++){t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.RENDERBUFFER,G.__webglColorRenderbuffer[ne]);const le=i.get(_[ne]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.TEXTURE_2D,le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&d){const _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function rt(b){return Math.min(s.maxSamples,b.samples)}function X(b){const _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function R(b){const _=a.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function ie(b,_){const P=b.colorSpace,L=b.format,z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||P!==qs&&P!==Un&&(Ye.getTransfer(P)===tt?(L!==Jt||z!==Wt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",P)),_}function se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=Q,this.getTextureUnits=B,this.setTextureUnits=D,this.setTexture2D=Y,this.setTexture2DArray=de,this.setTexture3D=he,this.setTextureCube=me,this.rebindTextures=Xe,this.setupRenderTarget=We,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=X,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function D0(n,e){function t(i,s=Un){let r;const a=Ye.getTransfer(s);if(i===Wt)return n.UNSIGNED_BYTE;if(i===no)return n.UNSIGNED_SHORT_4_4_4_4;if(i===io)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Gl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Hl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===zl)return n.BYTE;if(i===kl)return n.SHORT;if(i===Ki)return n.UNSIGNED_SHORT;if(i===to)return n.INT;if(i===un)return n.UNSIGNED_INT;if(i===on)return n.FLOAT;if(i===En)return n.HALF_FLOAT;if(i===Vl)return n.ALPHA;if(i===Wl)return n.RGB;if(i===Jt)return n.RGBA;if(i===wn)return n.DEPTH_COMPONENT;if(i===Kn)return n.DEPTH_STENCIL;if(i===jl)return n.RED;if(i===so)return n.RED_INTEGER;if(i===si)return n.RG;if(i===ro)return n.RG_INTEGER;if(i===ao)return n.RGBA_INTEGER;if(i===Us||i===Fs||i===Os||i===Bs)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Us)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Us)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Os)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Bs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===fa||i===pa||i===ma||i===ga)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ga)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xa||i===_a||i===va||i===Ma||i===Sa||i===js||i===ya)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===xa||i===_a)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===va)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ma)return r.COMPRESSED_R11_EAC;if(i===Sa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===js)return r.COMPRESSED_RG11_EAC;if(i===ya)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ba||i===Ea||i===wa||i===Ta||i===Aa||i===Ra||i===Ca||i===Na||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Fa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ba)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ea)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ta)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Aa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ra)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ca)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Na)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Pa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===La)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Da)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ia)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ua)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Oa||i===Ba||i===za)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Oa)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ka||i===Ga||i===Xs||i===Ha)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ka)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ga)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ha)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const I0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class F0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new nd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new hn({vertexShader:I0,fragmentShader:U0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Oi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class O0 extends oi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,c="local-floor",d=1,l=null,h=null,p=null,f=null,g=null,x=null;const v=typeof XRWebGLBinding<"u",m=new F0,u={},w=t.getContextAttributes();let T=null,y=null;const A=[],S=[],C=new Ke;let M=null;const N=new Bt;N.viewport=new ut;const U=new Bt;U.viewport=new ut;const O=[N,U],k=new Xh;let Q=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let fe=A[ae];return fe===void 0&&(fe=new yr,A[ae]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(ae){let fe=A[ae];return fe===void 0&&(fe=new yr,A[ae]=fe),fe.getGripSpace()},this.getHand=function(ae){let fe=A[ae];return fe===void 0&&(fe=new yr,A[ae]=fe),fe.getHandSpace()};function D(ae){const fe=S.indexOf(ae.inputSource);if(fe===-1)return;const W=A[fe];W!==void 0&&(W.update(ae.inputSource,ae.frame,l||a),W.dispatchEvent({type:ae.type,data:ae.inputSource}))}function q(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",I);for(let ae=0;ae<A.length;ae++){const fe=S[ae];fe!==null&&(S[ae]=null,A[ae].disconnect(fe))}Q=null,B=null,m.reset();for(const ae in u)delete u[ae];e.setRenderTarget(T),g=null,f=null,p=null,s=null,y=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){c=ae,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ae){l=ae},this.getBaseLayer=function(){return f!==null?f:g},this.getBinding=function(){return p===null&&v&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",q),s.addEventListener("inputsourceschange",I),w.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let W=null,ge=null,pe=null;w.depth&&(pe=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=w.stencil?Kn:wn,ge=w.stencil?Ji:un);const xe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};p=this.getBinding(),f=p.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new dn(f.textureWidth,f.textureHeight,{format:Jt,type:Wt,depthTexture:new Di(f.textureWidth,f.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const W={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,W),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new dn(g.framebufferWidth,g.framebufferHeight,{format:Jt,type:Wt,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(d),l=null,a=await s.requestReferenceSpace(c),ze.setContext(s),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function I(ae){for(let fe=0;fe<ae.removed.length;fe++){const W=ae.removed[fe],ge=S.indexOf(W);ge>=0&&(S[ge]=null,A[ge].disconnect(W))}for(let fe=0;fe<ae.added.length;fe++){const W=ae.added[fe];let ge=S.indexOf(W);if(ge===-1){for(let xe=0;xe<A.length;xe++)if(xe>=S.length){S.push(W),ge=xe;break}else if(S[xe]===null){S[xe]=W,ge=xe;break}if(ge===-1)break}const pe=A[ge];pe&&pe.connect(W)}}const Y=new Z,de=new Z;function he(ae,fe,W){Y.setFromMatrixPosition(fe.matrixWorld),de.setFromMatrixPosition(W.matrixWorld);const ge=Y.distanceTo(de),pe=fe.projectionMatrix.elements,xe=W.projectionMatrix.elements,ke=pe[14]/(pe[10]-1),Be=pe[14]/(pe[10]+1),Je=(pe[9]+1)/pe[5],Xe=(pe[9]-1)/pe[5],We=(pe[8]-1)/pe[0],ct=(xe[8]+1)/xe[0],dt=ke*We,ft=ke*ct,xt=ge/(-We+ct),rt=xt*-We;if(fe.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(rt),ae.translateZ(xt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),pe[10]===-1)ae.projectionMatrix.copy(fe.projectionMatrix),ae.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const X=ke+xt,R=Be+xt,ie=dt-rt,se=ft+(ge-rt),b=Je*Be/R*X,_=Xe*Be/R*X;ae.projectionMatrix.makePerspective(ie,se,b,_,X,R),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function me(ae,fe){fe===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(fe.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let fe=ae.near,W=ae.far;m.texture!==null&&(m.depthNear>0&&(fe=m.depthNear),m.depthFar>0&&(W=m.depthFar)),k.near=U.near=N.near=fe,k.far=U.far=N.far=W,(Q!==k.near||B!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),Q=k.near,B=k.far),k.layers.mask=ae.layers.mask|6,N.layers.mask=k.layers.mask&-5,U.layers.mask=k.layers.mask&-3;const ge=ae.parent,pe=k.cameras;me(k,ge);for(let xe=0;xe<pe.length;xe++)me(pe[xe],ge);pe.length===2?he(k,N,U):k.projectionMatrix.copy(N.projectionMatrix),Te(ae,k,ge)};function Te(ae,fe,W){W===null?ae.matrix.copy(fe.matrixWorld):(ae.matrix.copy(W.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(fe.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(fe.projectionMatrix),ae.projectionMatrixInverse.copy(fe.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Wa*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&g===null))return d},this.setFoveation=function(ae){d=ae,f!==null&&(f.fixedFoveation=ae),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ae)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(ae){return u[ae]};let Ve=null;function Ae(ae,fe){if(h=fe.getViewerPose(l||a),x=fe,h!==null){const W=h.views;g!==null&&(e.setRenderTargetFramebuffer(y,g.framebuffer),e.setRenderTarget(y));let ge=!1;W.length!==k.cameras.length&&(k.cameras.length=0,ge=!0);for(let Be=0;Be<W.length;Be++){const Je=W[Be];let Xe=null;if(g!==null)Xe=g.getViewport(Je);else{const ct=p.getViewSubImage(f,Je);Xe=ct.viewport,Be===0&&(e.setRenderTargetTextures(y,ct.colorTexture,ct.depthStencilTexture),e.setRenderTarget(y))}let We=O[Be];We===void 0&&(We=new Bt,We.layers.enable(Be),We.viewport=new ut,O[Be]=We),We.matrix.fromArray(Je.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Je.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Be===0&&(k.matrix.copy(We.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),ge===!0&&k.cameras.push(We)}const pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){p=i.getBinding();const Be=p.getDepthInformation(W[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,s.renderState)}if(pe&&pe.includes("camera-access")&&v){e.state.unbindTexture(),p=i.getBinding();for(let Be=0;Be<W.length;Be++){const Je=W[Be].camera;if(Je){let Xe=u[Je];Xe||(Xe=new nd,u[Je]=Xe);const We=p.getCameraImage(Je);Xe.sourceTexture=We}}}}for(let W=0;W<A.length;W++){const ge=S[W],pe=A[W];ge!==null&&pe!==void 0&&pe.update(ge,fe,l||a)}Ve&&Ve(ae,fe),fe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:fe}),x=null}const ze=new cd;ze.setAnimationLoop(Ae),this.setAnimationLoop=function(ae){Ve=ae},this.dispose=function(){}}}const B0=new ht,md=new Oe;md.set(-1,0,0,0,1,0,0,0,1);function z0(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,id(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,w,T,y){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(m,u):u.isMeshLambertMaterial?(r(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(m,u),p(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&g(m,u,y)):u.isMeshMatcapMaterial?(r(m,u),x(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),v(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&c(m,u)):u.isPointsMaterial?d(m,u,w,T):u.isSpriteMaterial?l(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===zt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===zt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const w=e.get(u),T=w.envMap,y=w.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(B0.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(md),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function c(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function d(m,u,w,T){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*w,m.scale.value=T*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function l(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function p(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function g(m,u,w){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===zt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,u){u.matcap&&(m.matcap.value=u.matcap)}function v(m,u){const w=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function k0(n,e,t,i){let s={},r={},a=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(y,A){const S=A.program;i.uniformBlockBinding(y,S)}function l(y,A){let S=s[y.id];S===void 0&&(m(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",w));const C=A.program;i.updateUBOMapping(y,C);const M=e.render.frame;r[y.id]!==M&&(f(y),r[y.id]=M)}function h(y){const A=p();y.__bindingPointIndex=A;const S=n.createBuffer(),C=y.__size,M=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,S),S}function p(){for(let y=0;y<c;y++)if(a.indexOf(y)===-1)return a.push(y),y;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const A=s[y.id],S=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let M=0,N=S.length;M<N;M++){const U=S[M];if(Array.isArray(U))for(let O=0,k=U.length;O<k;O++)g(U[O],M,O,C);else g(U,M,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,A,S,C){if(v(y,A,S,C)===!0){const M=y.__offset,N=y.value;if(Array.isArray(N)){let U=0;for(let O=0;O<N.length;O++){const k=N[O],Q=u(k);x(k,y.__data,U),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(U+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(N,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,M,y.__data)}}function x(y,A,S){typeof y=="number"||typeof y=="boolean"?A[0]=y:y.isMatrix3?(A[0]=y.elements[0],A[1]=y.elements[1],A[2]=y.elements[2],A[3]=0,A[4]=y.elements[3],A[5]=y.elements[4],A[6]=y.elements[5],A[7]=0,A[8]=y.elements[6],A[9]=y.elements[7],A[10]=y.elements[8],A[11]=0):ArrayBuffer.isView(y)?A.set(new y.constructor(y.buffer,y.byteOffset,A.length)):y.toArray(A,S)}function v(y,A,S,C){const M=y.value,N=A+"_"+S;if(C[N]===void 0)return typeof M=="number"||typeof M=="boolean"?C[N]=M:ArrayBuffer.isView(M)?C[N]=M.slice():C[N]=M.clone(),!0;{const U=C[N];if(typeof M=="number"||typeof M=="boolean"){if(U!==M)return C[N]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(U.equals(M)===!1)return U.copy(M),!0}}return!1}function m(y){const A=y.uniforms;let S=0;const C=16;for(let N=0,U=A.length;N<U;N++){const O=Array.isArray(A[N])?A[N]:[A[N]];for(let k=0,Q=O.length;k<Q;k++){const B=O[k],D=Array.isArray(B.value)?B.value:[B.value];for(let q=0,I=D.length;q<I;q++){const Y=D[q],de=u(Y),he=S%C,me=he%de.boundary,Te=he+me;S+=me,Te!==0&&C-Te<de.storage&&(S+=C-Te),B.__data=new Float32Array(de.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=de.storage}}}const M=S%C;return M>0&&(S+=C-M),y.__size=S,y.__cache={},this}function u(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(A.boundary=16,A.storage=y.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",y),A}function w(y){const A=y.target;A.removeEventListener("dispose",w);const S=a.indexOf(A.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function T(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:d,update:l,dispose:T}}const G0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let sn=null;function H0(){return sn===null&&(sn=new Ph(G0,16,16,si,En),sn.name="DFG_LUT",sn.minFilter=Nt,sn.magFilter=Nt,sn.wrapS=Mn,sn.wrapT=Mn,sn.generateMipmaps=!1,sn.needsUpdate=!0),sn}class gd{constructor(e={}){const{canvas:t=lh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:f=!1,outputBufferType:g=Wt}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const v=g,m=new Set([ao,ro,so]),u=new Set([Wt,un,Ki,Ji,no,io]),w=new Uint32Array(4),T=new Int32Array(4),y=new Z;let A=null,S=null;const C=[],M=[];let N=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let O=!1,k=null,Q=null,B=null,D=null;this._outputColorSpace=qt;let q=0,I=0,Y=null,de=-1,he=null;const me=new ut,Te=new ut;let Ve=null;const Ae=new $e(0);let ze=0,ae=t.width,fe=t.height,W=1,ge=null,pe=null;const xe=new ut(0,0,ae,fe),ke=new ut(0,0,ae,fe);let Be=!1;const Je=new uo;let Xe=!1,We=!1;const ct=new ht,dt=new Z,ft=new ut,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function X(){return Y===null?W:1}let R=i;function ie(E,j){return t.getContext(E,j)}try{const E={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:d,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${eo}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),R===null){const j="webgl2";if(R=ie(j,E),R===null)throw ie(j)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw et("WebGLRenderer: "+E.message),E}let se,b,_,P,L,z,$,G,F,H,ne,le,oe,re,Me,be,De,V,ve,ce,_e,we,ue;function Le(){se=new Hm(R),se.init(),_e=new D0(R,se),b=new Im(R,se,e,_e),_=new P0(R,se),b.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),Q=R.createFramebuffer(),B=R.createFramebuffer(),D=R.createFramebuffer(),P=new jm(R),L=new x0,z=new L0(R,se,_,L,b,_e,P),$=new Gm(U),G=new $h(R),we=new Lm(R,G),F=new Vm(R,G,P,we),H=new qm(R,F,G,we,P),V=new Xm(R,b,z),Me=new Um(L),ne=new g0(U,$,se,b,we,Me),le=new z0(U,L),oe=new v0,re=new w0(se),De=new Pm(U,$,_,H,x,d),be=new N0(U,H,b),ue=new k0(R,P,b,_),ve=new Dm(R,se,P),ce=new Wm(R,se,P),P.programs=ne.programs,U.capabilities=b,U.extensions=se,U.properties=L,U.renderLists=oe,U.shadowMap=be,U.state=_,U.info=P}Le(),v!==Wt&&(N=new Ym(v,t.width,t.height,c,s,r));const Ne=new O0(U,R);this.xr=Ne,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const E=se.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=se.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(E){E!==void 0&&(W=E,this.setSize(ae,fe,!1))},this.getSize=function(E){return E.set(ae,fe)},this.setSize=function(E,j,te=!0){if(Ne.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=E,fe=j,t.width=Math.floor(E*W),t.height=Math.floor(j*W),te===!0&&(t.style.width=E+"px",t.style.height=j+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,E,j)},this.getDrawingBufferSize=function(E){return E.set(ae*W,fe*W).floor()},this.setDrawingBufferSize=function(E,j,te){ae=E,fe=j,W=te,t.width=Math.floor(E*te),t.height=Math.floor(j*te),this.setViewport(0,0,E,j)},this.setEffects=function(E){if(v===Wt){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let j=0;j<E.length;j++)if(E[j].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(me)},this.getViewport=function(E){return E.copy(xe)},this.setViewport=function(E,j,te,K){E.isVector4?xe.set(E.x,E.y,E.z,E.w):xe.set(E,j,te,K),_.viewport(me.copy(xe).multiplyScalar(W).round())},this.getScissor=function(E){return E.copy(ke)},this.setScissor=function(E,j,te,K){E.isVector4?ke.set(E.x,E.y,E.z,E.w):ke.set(E,j,te,K),_.scissor(Te.copy(ke).multiplyScalar(W).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(E){_.setScissorTest(Be=E)},this.setOpaqueSort=function(E){ge=E},this.setTransparentSort=function(E){pe=E},this.getClearColor=function(E){return E.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(E=!0,j=!0,te=!0){let K=0;if(E){let J=!1;if(Y!==null){const Ee=Y.texture.format;J=m.has(Ee)}if(J){const Ee=Y.texture.type,Ce=u.has(Ee),ye=De.getClearColor(),Pe=De.getClearAlpha(),Ie=ye.r,Ge=ye.g,je=ye.b;Ce?(w[0]=Ie,w[1]=Ge,w[2]=je,w[3]=Pe,R.clearBufferuiv(R.COLOR,0,w)):(T[0]=Ie,T[1]=Ge,T[2]=je,T[3]=Pe,R.clearBufferiv(R.COLOR,0,T))}else K|=R.COLOR_BUFFER_BIT}j&&(K|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&(K|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&R.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),k=E},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),De.dispose(),oe.dispose(),re.dispose(),L.dispose(),$.dispose(),H.dispose(),we.dispose(),ue.dispose(),ne.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",So),Ne.removeEventListener("sessionend",yo),Gn.stop()};function pt(E){E.preventDefault(),nc("WebGLRenderer: Context Lost."),O=!0}function at(){nc("WebGLRenderer: Context Restored."),O=!1;const E=P.autoReset,j=be.enabled,te=be.autoUpdate,K=be.needsUpdate,J=be.type;Le(),P.autoReset=E,be.enabled=j,be.autoUpdate=te,be.needsUpdate=K,be.type=J}function Qt(E){et("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function en(E){const j=E.target;j.removeEventListener("dispose",en),Sd(j)}function Sd(E){yd(E),L.remove(E)}function yd(E){const j=L.get(E).programs;j!==void 0&&(j.forEach(function(te){ne.releaseProgram(te)}),E.isShaderMaterial&&ne.releaseShaderCache(E))}this.renderBufferDirect=function(E,j,te,K,J,Ee){j===null&&(j=xt);const Ce=J.isMesh&&J.matrixWorld.determinantAffine()<0,ye=wd(E,j,te,K,J);_.setMaterial(K,Ce);let Pe=te.index,Ie=1;if(K.wireframe===!0){if(Pe=F.getWireframeAttribute(te),Pe===void 0)return;Ie=2}const Ge=te.drawRange,je=te.attributes.position;let Ue=Ge.start*Ie,nt=(Ge.start+Ge.count)*Ie;Ee!==null&&(Ue=Math.max(Ue,Ee.start*Ie),nt=Math.min(nt,(Ee.start+Ee.count)*Ie)),Pe!==null?(Ue=Math.max(Ue,0),nt=Math.min(nt,Pe.count)):je!=null&&(Ue=Math.max(Ue,0),nt=Math.min(nt,je.count));const _t=nt-Ue;if(_t<0||_t===1/0)return;we.setup(J,K,ye,te,Pe);let mt,it=ve;if(Pe!==null&&(mt=G.get(Pe),it=ce,it.setIndex(mt)),J.isMesh)K.wireframe===!0?(_.setLineWidth(K.wireframeLinewidth*X()),it.setMode(R.LINES)):it.setMode(R.TRIANGLES);else if(J.isLine){let At=K.linewidth;At===void 0&&(At=1),_.setLineWidth(At*X()),J.isLineSegments?it.setMode(R.LINES):J.isLineLoop?it.setMode(R.LINE_LOOP):it.setMode(R.LINE_STRIP)}else J.isPoints?it.setMode(R.POINTS):J.isSprite&&it.setMode(R.TRIANGLES);if(J.isBatchedMesh)if(se.get("WEBGL_multi_draw"))it.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const At=J._multiDrawStarts,Re=J._multiDrawCounts,Gt=J._multiDrawCount,Qe=Pe?G.get(Pe).bytesPerElement:1,jt=L.get(K).currentProgram.getUniforms();for(let tn=0;tn<Gt;tn++)jt.setValue(R,"_gl_DrawID",tn),it.render(At[tn]/Qe,Re[tn])}else if(J.isInstancedMesh)it.renderInstances(Ue,_t,J.count);else if(te.isInstancedBufferGeometry){const At=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Re=Math.min(te.instanceCount,At);it.renderInstances(Ue,_t,Re)}else it.render(Ue,_t)};function Mo(E,j,te){E.transparent===!0&&E.side===vn&&E.forceSinglePass===!1?(E.side=zt,E.needsUpdate=!0,ss(E,j,te),E.side=Bn,E.needsUpdate=!0,ss(E,j,te),E.side=vn):ss(E,j,te)}this.compile=function(E,j,te=null){te===null&&(te=E),S=re.get(te),S.init(j),M.push(S),te.traverseVisible(function(J){J.isLight&&J.layers.test(j.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),E!==te&&E.traverseVisible(function(J){J.isLight&&J.layers.test(j.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights();const K=new Set;return E.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Ee=J.material;if(Ee)if(Array.isArray(Ee))for(let Ce=0;Ce<Ee.length;Ce++){const ye=Ee[Ce];Mo(ye,te,J),K.add(ye)}else Mo(Ee,te,J),K.add(Ee)}),S=M.pop(),K},this.compileAsync=function(E,j,te=null){const K=this.compile(E,j,te);return new Promise(J=>{function Ee(){if(K.forEach(function(Ce){L.get(Ce).currentProgram.isReady()&&K.delete(Ce)}),K.size===0){J(E);return}setTimeout(Ee,10)}se.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let lr=null;function bd(E){lr&&lr(E)}function So(){Gn.stop()}function yo(){Gn.start()}const Gn=new cd;Gn.setAnimationLoop(bd),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(E){lr=E,Ne.setAnimationLoop(E),E===null?Gn.stop():Gn.start()},Ne.addEventListener("sessionstart",So),Ne.addEventListener("sessionend",yo),this.render=function(E,j){if(j!==void 0&&j.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;k!==null&&k.renderStart(E,j);const te=Ne.enabled===!0&&Ne.isPresenting===!0,K=N!==null&&(Y===null||te)&&N.begin(U,Y);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(j),j=Ne.getCamera()),E.isScene===!0&&E.onBeforeRender(U,E,j,Y),S=re.get(E,M.length),S.init(j),S.state.textureUnits=z.getTextureUnits(),M.push(S),ct.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Je.setFromProjectionMatrix(ct,cn,j.reversedDepth),We=this.localClippingEnabled,Xe=Me.init(this.clippingPlanes,We),A=oe.get(E,C.length),A.init(),C.push(A),Ne.enabled===!0&&Ne.isPresenting===!0){const Ce=U.xr.getDepthSensingMesh();Ce!==null&&dr(Ce,j,-1/0,U.sortObjects)}dr(E,j,0,U.sortObjects),A.finish(),U.sortObjects===!0&&A.sort(ge,pe,j.reversedDepth),rt=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,rt&&De.addToRenderList(A,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xe===!0&&Me.beginShadows();const J=S.state.shadowsArray;if(be.render(J,E,j),Xe===!0&&Me.endShadows(),(K&&N.hasRenderPass())===!1){const Ce=A.opaque,ye=A.transmissive;if(S.setupLights(),j.isArrayCamera){const Pe=j.cameras;if(ye.length>0)for(let Ie=0,Ge=Pe.length;Ie<Ge;Ie++){const je=Pe[Ie];Eo(Ce,ye,E,je)}rt&&De.render(E);for(let Ie=0,Ge=Pe.length;Ie<Ge;Ie++){const je=Pe[Ie];bo(A,E,je,je.viewport)}}else ye.length>0&&Eo(Ce,ye,E,j),rt&&De.render(E),bo(A,E,j)}Y!==null&&I===0&&(z.updateMultisampleRenderTarget(Y),z.updateRenderTargetMipmap(Y)),K&&N.end(U),E.isScene===!0&&E.onAfterRender(U,E,j),we.resetDefaultState(),de=-1,he=null,M.pop(),M.length>0?(S=M[M.length-1],z.setTextureUnits(S.state.textureUnits),Xe===!0&&Me.setGlobalState(U.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?A=C[C.length-1]:A=null,k!==null&&k.renderEnd()};function dr(E,j,te,K){if(E.visible===!1)return;if(E.layers.test(j.layers)){if(E.isGroup)te=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(j);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Je.intersectsSprite(E)){K&&ft.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ct);const Ce=H.update(E),ye=E.material;ye.visible&&A.push(E,Ce,ye,te,ft.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Je.intersectsObject(E))){const Ce=H.update(E),ye=E.material;if(K&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ft.copy(E.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),ft.copy(Ce.boundingSphere.center)),ft.applyMatrix4(E.matrixWorld).applyMatrix4(ct)),Array.isArray(ye)){const Pe=Ce.groups;for(let Ie=0,Ge=Pe.length;Ie<Ge;Ie++){const je=Pe[Ie],Ue=ye[je.materialIndex];Ue&&Ue.visible&&A.push(E,Ce,Ue,te,ft.z,je)}}else ye.visible&&A.push(E,Ce,ye,te,ft.z,null)}}const Ee=E.children;for(let Ce=0,ye=Ee.length;Ce<ye;Ce++)dr(Ee[Ce],j,te,K)}function bo(E,j,te,K){const{opaque:J,transmissive:Ee,transparent:Ce}=E;S.setupLightsView(te),Xe===!0&&Me.setGlobalState(U.clippingPlanes,te),K&&_.viewport(me.copy(K)),J.length>0&&is(J,j,te),Ee.length>0&&is(Ee,j,te),Ce.length>0&&is(Ce,j,te),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Eo(E,j,te,K){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[K.id]===void 0){const Ue=se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[K.id]=new dn(1,1,{generateMipmaps:!0,type:Ue?En:Wt,minFilter:Zn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const Ee=S.state.transmissionRenderTarget[K.id],Ce=K.viewport||me;Ee.setSize(Ce.z*U.transmissionResolutionScale,Ce.w*U.transmissionResolutionScale);const ye=U.getRenderTarget(),Pe=U.getActiveCubeFace(),Ie=U.getActiveMipmapLevel();U.setRenderTarget(Ee),U.getClearColor(Ae),ze=U.getClearAlpha(),ze<1&&U.setClearColor(16777215,.5),U.clear(),rt&&De.render(te);const Ge=U.toneMapping;U.toneMapping=ln;const je=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),S.setupLightsView(K),Xe===!0&&Me.setGlobalState(U.clippingPlanes,K),is(E,te,K),z.updateMultisampleRenderTarget(Ee),z.updateRenderTargetMipmap(Ee),se.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let nt=0,_t=j.length;nt<_t;nt++){const mt=j[nt],{object:it,geometry:At,material:Re,group:Gt}=mt;if(Re.side===vn&&it.layers.test(K.layers)){const Qe=Re.side;Re.side=zt,Re.needsUpdate=!0,wo(it,te,K,At,Re,Gt),Re.side=Qe,Re.needsUpdate=!0,Ue=!0}}Ue===!0&&(z.updateMultisampleRenderTarget(Ee),z.updateRenderTargetMipmap(Ee))}U.setRenderTarget(ye,Pe,Ie),U.setClearColor(Ae,ze),je!==void 0&&(K.viewport=je),U.toneMapping=Ge}function is(E,j,te){const K=j.isScene===!0?j.overrideMaterial:null;for(let J=0,Ee=E.length;J<Ee;J++){const Ce=E[J],{object:ye,geometry:Pe,group:Ie}=Ce;let Ge=Ce.material;Ge.allowOverride===!0&&K!==null&&(Ge=K),ye.layers.test(te.layers)&&wo(ye,j,te,Pe,Ge,Ie)}}function wo(E,j,te,K,J,Ee){E.onBeforeRender(U,j,te,K,J,Ee),E.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),J.onBeforeRender(U,j,te,K,E,Ee),J.transparent===!0&&J.side===vn&&J.forceSinglePass===!1?(J.side=zt,J.needsUpdate=!0,U.renderBufferDirect(te,j,K,J,E,Ee),J.side=Bn,J.needsUpdate=!0,U.renderBufferDirect(te,j,K,J,E,Ee),J.side=vn):U.renderBufferDirect(te,j,K,J,E,Ee),E.onAfterRender(U,j,te,K,J,Ee)}function ss(E,j,te){j.isScene!==!0&&(j=xt);const K=L.get(E),J=S.state.lights,Ee=S.state.shadowsArray,Ce=J.state.version,ye=ne.getParameters(E,J.state,Ee,j,te,S.state.lightProbeGridArray),Pe=ne.getProgramCacheKey(ye);let Ie=K.programs;K.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?j.environment:null,K.fog=j.fog;const Ge=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;K.envMap=$.get(E.envMap||K.environment,Ge),K.envMapRotation=K.environment!==null&&E.envMap===null?j.environmentRotation:E.envMapRotation,Ie===void 0&&(E.addEventListener("dispose",en),Ie=new Map,K.programs=Ie);let je=Ie.get(Pe);if(je!==void 0){if(K.currentProgram===je&&K.lightsStateVersion===Ce)return Ao(E,ye),je}else ye.uniforms=ne.getUniforms(E),k!==null&&E.isNodeMaterial&&k.build(E,te,ye),E.onBeforeCompile(ye,U),je=ne.acquireProgram(ye,Pe),Ie.set(Pe,je),K.uniforms=ye.uniforms;const Ue=K.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ue.clippingPlanes=Me.uniform),Ao(E,ye),K.needsLights=Ad(E),K.lightsStateVersion=Ce,K.needsLights&&(Ue.ambientLightColor.value=J.state.ambient,Ue.lightProbe.value=J.state.probe,Ue.directionalLights.value=J.state.directional,Ue.directionalLightShadows.value=J.state.directionalShadow,Ue.spotLights.value=J.state.spot,Ue.spotLightShadows.value=J.state.spotShadow,Ue.rectAreaLights.value=J.state.rectArea,Ue.ltc_1.value=J.state.rectAreaLTC1,Ue.ltc_2.value=J.state.rectAreaLTC2,Ue.pointLights.value=J.state.point,Ue.pointLightShadows.value=J.state.pointShadow,Ue.hemisphereLights.value=J.state.hemi,Ue.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Ue.spotLightMatrix.value=J.state.spotLightMatrix,Ue.spotLightMap.value=J.state.spotLightMap,Ue.pointShadowMatrix.value=J.state.pointShadowMatrix),K.lightProbeGrid=S.state.lightProbeGridArray.length>0,K.currentProgram=je,K.uniformsList=null,je}function To(E){if(E.uniformsList===null){const j=E.currentProgram.getUniforms();E.uniformsList=zs.seqWithValue(j.seq,E.uniforms)}return E.uniformsList}function Ao(E,j){const te=L.get(E);te.outputColorSpace=j.outputColorSpace,te.batching=j.batching,te.batchingColor=j.batchingColor,te.instancing=j.instancing,te.instancingColor=j.instancingColor,te.instancingMorph=j.instancingMorph,te.skinning=j.skinning,te.morphTargets=j.morphTargets,te.morphNormals=j.morphNormals,te.morphColors=j.morphColors,te.morphTargetsCount=j.morphTargetsCount,te.numClippingPlanes=j.numClippingPlanes,te.numIntersection=j.numClipIntersection,te.vertexAlphas=j.vertexAlphas,te.vertexTangents=j.vertexTangents,te.toneMapping=j.toneMapping}function Ed(E,j){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(j.matrixWorld);for(let te=0,K=E.length;te<K;te++){const J=E[te];if(J.texture!==null&&J.boundingBox.containsPoint(y))return J}return null}function wd(E,j,te,K,J){j.isScene!==!0&&(j=xt),z.resetTextureUnits();const Ee=j.fog,Ce=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?j.environment:null,ye=Y===null?U.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ye.workingColorSpace,Pe=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ie=$.get(K.envMap||Ce,Pe),Ge=K.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,je=!!te.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ue=!!te.morphAttributes.position,nt=!!te.morphAttributes.normal,_t=!!te.morphAttributes.color;let mt=ln;K.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(mt=U.toneMapping);const it=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,At=it!==void 0?it.length:0,Re=L.get(K),Gt=S.state.lights;if(Xe===!0&&(We===!0||E!==he)){const ot=E===he&&K.id===de;Me.setState(K,E,ot)}let Qe=!1;K.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==Gt.state.version||Re.outputColorSpace!==ye||J.isBatchedMesh&&Re.batching===!1||!J.isBatchedMesh&&Re.batching===!0||J.isBatchedMesh&&Re.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Re.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Re.instancing===!1||!J.isInstancedMesh&&Re.instancing===!0||J.isSkinnedMesh&&Re.skinning===!1||!J.isSkinnedMesh&&Re.skinning===!0||J.isInstancedMesh&&Re.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Re.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Re.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Re.instancingMorph===!1&&J.morphTexture!==null||Re.envMap!==Ie||K.fog===!0&&Re.fog!==Ee||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==Me.numPlanes||Re.numIntersection!==Me.numIntersection)||Re.vertexAlphas!==Ge||Re.vertexTangents!==je||Re.morphTargets!==Ue||Re.morphNormals!==nt||Re.morphColors!==_t||Re.toneMapping!==mt||Re.morphTargetsCount!==At||!!Re.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Re.__version=K.version);let jt=Re.currentProgram;Qe===!0&&(jt=ss(K,j,J),k&&K.isNodeMaterial&&k.onUpdateProgram(K,jt,Re));let tn=!1,Tn=!1,ci=!1;const st=jt.getUniforms(),vt=Re.uniforms;if(_.useProgram(jt.program)&&(tn=!0,Tn=!0,ci=!0),K.id!==de&&(de=K.id,Tn=!0),Re.needsLights){const ot=Ed(S.state.lightProbeGridArray,J);Re.lightProbeGrid!==ot&&(Re.lightProbeGrid=ot,Tn=!0)}if(tn||he!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),st.setValue(R,"projectionMatrix",E.projectionMatrix),st.setValue(R,"viewMatrix",E.matrixWorldInverse);const Rn=st.map.cameraPosition;Rn!==void 0&&Rn.setValue(R,dt.setFromMatrixPosition(E.matrixWorld)),b.logarithmicDepthBuffer&&st.setValue(R,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&st.setValue(R,"isOrthographic",E.isOrthographicCamera===!0),he!==E&&(he=E,Tn=!0,ci=!0)}if(Re.needsLights&&(Gt.state.directionalShadowMap.length>0&&st.setValue(R,"directionalShadowMap",Gt.state.directionalShadowMap,z),Gt.state.spotShadowMap.length>0&&st.setValue(R,"spotShadowMap",Gt.state.spotShadowMap,z),Gt.state.pointShadowMap.length>0&&st.setValue(R,"pointShadowMap",Gt.state.pointShadowMap,z)),J.isSkinnedMesh){st.setOptional(R,J,"bindMatrix"),st.setOptional(R,J,"bindMatrixInverse");const ot=J.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),st.setValue(R,"boneTexture",ot.boneTexture,z))}J.isBatchedMesh&&(st.setOptional(R,J,"batchingTexture"),st.setValue(R,"batchingTexture",J._matricesTexture,z),st.setOptional(R,J,"batchingIdTexture"),st.setValue(R,"batchingIdTexture",J._indirectTexture,z),st.setOptional(R,J,"batchingColorTexture"),J._colorsTexture!==null&&st.setValue(R,"batchingColorTexture",J._colorsTexture,z));const An=te.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&V.update(J,te,jt),(Tn||Re.receiveShadow!==J.receiveShadow)&&(Re.receiveShadow=J.receiveShadow,st.setValue(R,"receiveShadow",J.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&j.environment!==null&&(vt.envMapIntensity.value=j.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=H0()),Tn){if(st.setValue(R,"toneMappingExposure",U.toneMappingExposure),Re.needsLights&&Td(vt,ci),Ee&&K.fog===!0&&le.refreshFogUniforms(vt,Ee),le.refreshMaterialUniforms(vt,K,W,fe,S.state.transmissionRenderTarget[E.id]),Re.needsLights&&Re.lightProbeGrid){const ot=Re.lightProbeGrid;vt.probesSH.value=ot.texture,vt.probesMin.value.copy(ot.boundingBox.min),vt.probesMax.value.copy(ot.boundingBox.max),vt.probesResolution.value.copy(ot.resolution)}zs.upload(R,To(Re),vt,z)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(zs.upload(R,To(Re),vt,z),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&st.setValue(R,"center",J.center),st.setValue(R,"modelViewMatrix",J.modelViewMatrix),st.setValue(R,"normalMatrix",J.normalMatrix),st.setValue(R,"modelMatrix",J.matrixWorld),K.uniformsGroups!==void 0){const ot=K.uniformsGroups;for(let Rn=0,li=ot.length;Rn<li;Rn++){const Ro=ot[Rn];ue.update(Ro,jt),ue.bind(Ro,jt)}}return jt}function Td(E,j){E.ambientLightColor.needsUpdate=j,E.lightProbe.needsUpdate=j,E.directionalLights.needsUpdate=j,E.directionalLightShadows.needsUpdate=j,E.pointLights.needsUpdate=j,E.pointLightShadows.needsUpdate=j,E.spotLights.needsUpdate=j,E.spotLightShadows.needsUpdate=j,E.rectAreaLights.needsUpdate=j,E.hemisphereLights.needsUpdate=j}function Ad(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(E,j,te){const K=L.get(E);K.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),L.get(E.texture).__webglTexture=j,L.get(E.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:te,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,j){const te=L.get(E);te.__webglFramebuffer=j,te.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(E,j=0,te=0){Y=E,q=j,I=te;let K=null,J=!1,Ee=!1;if(E){const ye=L.get(E);if(ye.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(R.FRAMEBUFFER,ye.__webglFramebuffer),me.copy(E.viewport),Te.copy(E.scissor),Ve=E.scissorTest,_.viewport(me),_.scissor(Te),_.setScissorTest(Ve),de=-1;return}else if(ye.__webglFramebuffer===void 0)z.setupRenderTarget(E);else if(ye.__hasExternalTextures)z.rebindTextures(E,L.get(E.texture).__webglTexture,L.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ge=E.depthTexture;if(ye.__boundDepthTexture!==Ge){if(Ge!==null&&L.has(Ge)&&(E.width!==Ge.image.width||E.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(E)}}const Pe=E.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(Ee=!0);const Ie=L.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ie[j])?K=Ie[j][te]:K=Ie[j],J=!0):E.samples>0&&z.useMultisampledRTT(E)===!1?K=L.get(E).__webglMultisampledFramebuffer:Array.isArray(Ie)?K=Ie[te]:K=Ie,me.copy(E.viewport),Te.copy(E.scissor),Ve=E.scissorTest}else me.copy(xe).multiplyScalar(W).floor(),Te.copy(ke).multiplyScalar(W).floor(),Ve=Be;if(te!==0&&(K=Q),_.bindFramebuffer(R.FRAMEBUFFER,K)&&_.drawBuffers(E,K),_.viewport(me),_.scissor(Te),_.setScissorTest(Ve),J){const ye=L.get(E.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye.__webglTexture,te)}else if(Ee){const ye=j;for(let Pe=0;Pe<E.textures.length;Pe++){const Ie=L.get(E.textures[Pe]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Pe,Ie.__webglTexture,te,ye)}}else if(E!==null&&te!==0){const ye=L.get(E.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ye.__webglTexture,te)}de=-1},this.readRenderTargetPixels=function(E,j,te,K,J,Ee,Ce,ye=0){if(!(E&&E.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=L.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ce!==void 0&&(Pe=Pe[Ce]),Pe){_.bindFramebuffer(R.FRAMEBUFFER,Pe);try{const Ie=E.textures[ye],Ge=Ie.format,je=Ie.type;if(E.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ye),!b.textureFormatReadable(Ge)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(je)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=E.width-K&&te>=0&&te<=E.height-J&&R.readPixels(j,te,K,J,_e.convert(Ge),_e.convert(je),Ee)}finally{const Ie=Y!==null?L.get(Y).__webglFramebuffer:null;_.bindFramebuffer(R.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(E,j,te,K,J,Ee,Ce,ye=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=L.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ce!==void 0&&(Pe=Pe[Ce]),Pe)if(j>=0&&j<=E.width-K&&te>=0&&te<=E.height-J){_.bindFramebuffer(R.FRAMEBUFFER,Pe);const Ie=E.textures[ye],Ge=Ie.format,je=Ie.type;if(E.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ye),!b.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ue),R.bufferData(R.PIXEL_PACK_BUFFER,Ee.byteLength,R.STREAM_READ),R.readPixels(j,te,K,J,_e.convert(Ge),_e.convert(je),0);const nt=Y!==null?L.get(Y).__webglFramebuffer:null;_.bindFramebuffer(R.FRAMEBUFFER,nt);const _t=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await dh(R,_t,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ue),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,Ee),R.deleteBuffer(Ue),R.deleteSync(_t),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,j=null,te=0){const K=Math.pow(2,-te),J=Math.floor(E.image.width*K),Ee=Math.floor(E.image.height*K),Ce=j!==null?j.x:0,ye=j!==null?j.y:0;z.setTexture2D(E,0),R.copyTexSubImage2D(R.TEXTURE_2D,te,0,0,Ce,ye,J,Ee),_.unbindTexture()},this.copyTextureToTexture=function(E,j,te=null,K=null,J=0,Ee=0){let Ce,ye,Pe,Ie,Ge,je,Ue,nt,_t;const mt=E.isCompressedTexture?E.mipmaps[Ee]:E.image;if(te!==null)Ce=te.max.x-te.min.x,ye=te.max.y-te.min.y,Pe=te.isBox3?te.max.z-te.min.z:1,Ie=te.min.x,Ge=te.min.y,je=te.isBox3?te.min.z:0;else{const vt=Math.pow(2,-J);Ce=Math.floor(mt.width*vt),ye=Math.floor(mt.height*vt),E.isDataArrayTexture?Pe=mt.depth:E.isData3DTexture?Pe=Math.floor(mt.depth*vt):Pe=1,Ie=0,Ge=0,je=0}K!==null?(Ue=K.x,nt=K.y,_t=K.z):(Ue=0,nt=0,_t=0);const it=_e.convert(j.format),At=_e.convert(j.type);let Re;j.isData3DTexture?(z.setTexture3D(j,0),Re=R.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(z.setTexture2DArray(j,0),Re=R.TEXTURE_2D_ARRAY):(z.setTexture2D(j,0),Re=R.TEXTURE_2D),_.activeTexture(R.TEXTURE0),_.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,j.flipY),_.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),_.pixelStorei(R.UNPACK_ALIGNMENT,j.unpackAlignment);const Gt=_.getParameter(R.UNPACK_ROW_LENGTH),Qe=_.getParameter(R.UNPACK_IMAGE_HEIGHT),jt=_.getParameter(R.UNPACK_SKIP_PIXELS),tn=_.getParameter(R.UNPACK_SKIP_ROWS),Tn=_.getParameter(R.UNPACK_SKIP_IMAGES);_.pixelStorei(R.UNPACK_ROW_LENGTH,mt.width),_.pixelStorei(R.UNPACK_IMAGE_HEIGHT,mt.height),_.pixelStorei(R.UNPACK_SKIP_PIXELS,Ie),_.pixelStorei(R.UNPACK_SKIP_ROWS,Ge),_.pixelStorei(R.UNPACK_SKIP_IMAGES,je);const ci=E.isDataArrayTexture||E.isData3DTexture,st=j.isDataArrayTexture||j.isData3DTexture;if(E.isDepthTexture){const vt=L.get(E),An=L.get(j),ot=L.get(vt.__renderTarget),Rn=L.get(An.__renderTarget);_.bindFramebuffer(R.READ_FRAMEBUFFER,ot.__webglFramebuffer),_.bindFramebuffer(R.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let li=0;li<Pe;li++)ci&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,L.get(E).__webglTexture,J,je+li),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,L.get(j).__webglTexture,Ee,_t+li)),R.blitFramebuffer(Ie,Ge,Ce,ye,Ue,nt,Ce,ye,R.DEPTH_BUFFER_BIT,R.NEAREST);_.bindFramebuffer(R.READ_FRAMEBUFFER,null),_.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(J!==0||E.isRenderTargetTexture||L.has(E)){const vt=L.get(E),An=L.get(j);_.bindFramebuffer(R.READ_FRAMEBUFFER,B),_.bindFramebuffer(R.DRAW_FRAMEBUFFER,D);for(let ot=0;ot<Pe;ot++)ci?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,vt.__webglTexture,J,je+ot):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,vt.__webglTexture,J),st?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,An.__webglTexture,Ee,_t+ot):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,An.__webglTexture,Ee),J!==0?R.blitFramebuffer(Ie,Ge,Ce,ye,Ue,nt,Ce,ye,R.COLOR_BUFFER_BIT,R.NEAREST):st?R.copyTexSubImage3D(Re,Ee,Ue,nt,_t+ot,Ie,Ge,Ce,ye):R.copyTexSubImage2D(Re,Ee,Ue,nt,Ie,Ge,Ce,ye);_.bindFramebuffer(R.READ_FRAMEBUFFER,null),_.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else st?E.isDataTexture||E.isData3DTexture?R.texSubImage3D(Re,Ee,Ue,nt,_t,Ce,ye,Pe,it,At,mt.data):j.isCompressedArrayTexture?R.compressedTexSubImage3D(Re,Ee,Ue,nt,_t,Ce,ye,Pe,it,mt.data):R.texSubImage3D(Re,Ee,Ue,nt,_t,Ce,ye,Pe,it,At,mt):E.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Ee,Ue,nt,Ce,ye,it,At,mt.data):E.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Ee,Ue,nt,mt.width,mt.height,it,mt.data):R.texSubImage2D(R.TEXTURE_2D,Ee,Ue,nt,Ce,ye,it,At,mt);_.pixelStorei(R.UNPACK_ROW_LENGTH,Gt),_.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(R.UNPACK_SKIP_PIXELS,jt),_.pixelStorei(R.UNPACK_SKIP_ROWS,tn),_.pixelStorei(R.UNPACK_SKIP_IMAGES,Tn),Ee===0&&j.generateMipmaps&&R.generateMipmap(Re),_.unbindTexture()},this.initRenderTarget=function(E){L.get(E).__webglFramebuffer===void 0&&z.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?z.setTextureCube(E,0):E.isData3DTexture?z.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?z.setTexture2DArray(E,0):z.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){q=0,I=0,Y=null,_.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Ns=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],xd=620,V0=560,W0=300,j0=2800,Yc=850,Zc=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Kc=210,Xr=300,Jc=.42,Qc=740,Ps=n=>-(n+1)*xd,X0=n=>n===1?1:1-Math.pow(2,-10*n),qr=n=>new Promise(e=>setTimeout(e,n)),el=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function tl(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${el[t%el.length]}`)}function q0({onDone:n}){const e=ee.useRef(null),t=ee.useRef(null),i=ee.useRef(null),s=ee.useRef(null),r=ee.useRef(null),a=ee.useRef(null),c=ee.useRef(null),d=ee.useRef(null),l=ee.useRef(null),h=ee.useRef(null),p=ee.useRef(n);p.current=n,Ja();const f=ee.useMemo(()=>tl(16),[]),g=ee.useMemo(()=>tl(16),[]);return ee.useEffect(()=>{let x=!1,v=!1;const m=()=>{v||(v=!0,p.current())};let u=null;function w(){if(!u)try{const X=window.AudioContext??window.webkitAudioContext;u=new X}catch{}return u}function T(){const X=w();if(!X)return;X.state==="suspended"&&X.resume();const R=X.currentTime,ie=X.createOscillator();ie.type="sine",ie.frequency.setValueAtTime(130,R),ie.frequency.exponentialRampToValueAtTime(42,R+.16);const se=X.createGain();se.gain.setValueAtTime(1,R),se.gain.exponentialRampToValueAtTime(.001,R+.38),ie.connect(se).connect(X.destination),ie.start(R),ie.stop(R+.42);const b=Math.floor(X.sampleRate*.14),_=X.createBuffer(1,b,X.sampleRate),P=_.getChannelData(0);for(let G=0;G<b;G++)P[G]=(Math.random()*2-1)*Math.pow(1-G/b,2.2);const L=X.createBufferSource();L.buffer=_;const z=X.createBiquadFilter();z.type="lowpass",z.frequency.value=850;const $=X.createGain();$.gain.setValueAtTime(.55,R),$.gain.exponentialRampToValueAtTime(.001,R+.13),L.connect(z).connect($).connect(X.destination),L.start(R)}function y(){const X=i.current;X&&(X.currentTime=0,X.play().catch(()=>{}))}const A=t.current,S=(A==null?void 0:A.getContext("2d"))??null;let C=[],M=0;function N(){A&&(A.width=window.innerWidth,A.height=window.innerHeight)}N();function U(X,R){C=[];let ie=0;const se=6;function b(P,L,z,$,G,F){const H=3+Math.floor(Math.random()*3),ne=[[P,L]];let le=z,oe=P,re=L;for(let Me=0;Me<H;Me++){le+=(Math.random()-.5)*.6;const be=$/H;if(oe+=Math.cos(le)*be,re+=Math.sin(le)*be,ne.push([oe,re]),G>0&&Math.random()<.5){const De=le+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);b(oe,re,De,$*(.35+Math.random()*.3),G-1,F*.78)}}C.push({pts:ne,color:Zc[ie++%Zc.length],width:F})}const _=[R*(.06+Math.random()*.1),R*(.84+Math.random()*.1)];for(let P=0;P<se;P++){const L=X*(.15+Math.random()*.7),z=P<_.length?_[P]:R*(.1+Math.random()*.8),$=9+Math.floor(Math.random()*6);for(let G=0;G<$;G++){const F=G/$*Math.PI*2+(Math.random()-.5)*.4,H=Math.max(X,R)*(.18+Math.random()*.38);b(L,z,F,H,2,.9)}}}function O(X){if(!S||X<=0)return;const R=Math.min(1,X/2.4),ie=Math.round(C.length*R);for(let se=0;se<ie;se++){const b=C[se];S.lineWidth=b.width*(.9+X*.1),S.strokeStyle=b.color,S.globalAlpha=.75+X*.1,S.shadowColor=b.color,S.shadowBlur=5+X*2.2,S.beginPath(),b.pts.forEach(([_,P],L)=>L===0?S.moveTo(_,P):S.lineTo(_,P)),S.stroke()}S.globalAlpha=1,S.shadowBlur=0}function k(X,R,ie){S&&(S.clearRect(0,0,R,ie),O(X))}function Q(){const X=l.current;X&&(X.classList.remove("intro-hit"),X.offsetWidth,X.classList.add("intro-hit"))}function B(){var R,ie,se,b;const X=(R=r.current)==null?void 0:R.firstElementChild;X&&(X.classList.remove("intro-rgbslam"),X.offsetWidth,X.classList.add("intro-rgbslam")),(ie=r.current)==null||ie.classList.remove("intro-jitter"),(se=r.current)==null||se.offsetWidth,(b=r.current)==null||b.classList.add("intro-jitter"),Q(),Xe()}async function D(){for(let X=5;X>=1&&!x;X--){const R=r.current;if(!R)return;R.innerHTML="";const ie=document.createElement("div");ie.className="intro-glyph",ie.setAttribute("data-t",String(X)),ie.textContent=String(X),R.appendChild(ie),B(),T(),await ie.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Yc*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await qr(Yc*.3)}}let q=null,I=null,Y=null,de=0,he=!1,me=-1;const Ve=document.createElement("canvas").getContext("2d");Ve.font=`700 ${Kc}px "Rajdhani", sans-serif`;const Ae=[],ze=[];function ae(X,R){const ie=Math.ceil(Ve.measureText(X).width),se=Math.max(200,ie+120),b=document.createElement("canvas");b.width=se,b.height=Xr;const _=b.getContext("2d");_.font=`700 ${Kc}px "Rajdhani", sans-serif`,_.textAlign="center",_.textBaseline="middle",_.shadowColor=R,_.shadowBlur=56,_.fillStyle="#d24e01",_.fillText(X,se/2,Xr/2);const P=new td(b);P.anisotropy=4;let L=se*Jc,z=Xr*Jc;if(L>Qc){const $=Qc/L;L*=$,z*=$}return{tex:P,worldW:L,worldH:z}}function fe(X,R,ie){const{tex:se,worldW:b,worldH:_}=ae(X,ie),P=new Oi(b,_),L=new On({map:se,transparent:!0,depthWrite:!1,opacity:0}),z=new lt(P,L);z.position.set(0,10,R),z.visible=!1,I.add(z);const $=new lt(P,new On({map:se,transparent:!0,depthWrite:!1,blending:ni,color:2875596,opacity:0})),G=new lt(P,new On({map:se,transparent:!0,depthWrite:!1,blending:ni,color:10116351,opacity:0}));return $.position.copy(z.position),G.position.copy(z.position),$.visible=!1,G.visible=!1,I.add($),I.add(G),ze.push(P,L,se,$.material,G.material),{mesh:z,ghostCy:$,ghostMg:G}}const W={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let ge,pe;function xe(){const X=e.current;if(!X)return;q=new gd({canvas:X,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),q.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),I=new Zl,I.fog=new sr(263946,.0011),Y=new Bt(62,window.innerWidth/window.innerHeight,1,6e3),Y.position.set(0,0,40),I.add(new od(928300,1.1));const R=xd*Ns.length+500,ie=900,se=new Lt,b=new Float32Array(ie*3),_=new Float32Array(ie*3),P=[2875596,15357964,15357964,10116351];for(let G=0;G<ie;G++){const F=60+Math.random()*260,H=Math.random()*Math.PI*2;b[G*3]=Math.cos(H)*F,b[G*3+1]=Math.sin(H)*F,b[G*3+2]=-Math.random()*R;const ne=new $e(P[G%P.length]);_[G*3]=ne.r,_[G*3+1]=ne.g,_[G*3+2]=ne.b}se.setAttribute("position",new Ut(b,3)),se.setAttribute("color",new Ut(_,3));const L=new ar({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});I.add(new ho(se,L)),ze.push(se,L),Ns.forEach((G,F)=>{const H=Ps(F),ne="#"+G.light.toString(16).padStart(6,"0");Ae.push(fe(G.text,H,ne));const le=new ei(G.light,2.4,900,2);le.position.set(0,40,H+60),I.add(le)}),ge=new ei(15357964,4,550,2),pe=new ei(10116351,2.6,550,2),I.add(ge),I.add(pe),he=!0,ke();const z=Math.random()*1e3;W.camZ=0;function $(G){if(!q||!I||!Y)return;{const le=Math.sin(G*.0016+z)*1.1+Math.sin(G*.0043)*.5,oe=Math.cos(G*.002+z)*.9+Math.cos(G*.0038)*.45;Y.position.x=le+W.camX,Y.position.y=oe+6}Y.position.z=W.camZ+W.warpKick;const F=W.yawKick,H=Y.position.x+Math.sin(F)*640;Y.lookAt(H,Y.position.y-4,W.focusZ),Y.rotateZ(-F*.5);const ne=62+W.fovKick*14;Y.fov!==ne&&(Y.fov=ne,Y.updateProjectionMatrix()),ge.position.set(Math.sin(G*6e-4)*80,30,W.camZ-120),pe.position.set(Math.cos(G*7e-4)*80,-10,W.camZ-200),Ae.forEach(le=>{le.mesh.visible&&le.mesh.quaternion.copy(Y.quaternion),le.ghostCy.visible&&le.ghostCy.quaternion.copy(Y.quaternion),le.ghostMg.visible&&le.ghostMg.quaternion.copy(Y.quaternion)}),q.render(I,Y),de=requestAnimationFrame($)}de=requestAnimationFrame($)}function ke(){!he||!q||!Y||(q.setSize(window.innerWidth,window.innerHeight),Y.aspect=window.innerWidth/window.innerHeight,Y.updateProjectionMatrix())}function Be(){ke(),N(),U(window.innerWidth,window.innerHeight),k(M,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Be,{passive:!0});function Je(X,R=650){const ie=me;me=X;const se=Ae[X];if(!se)return;se.mesh.visible=!0,se.mesh.material.opacity=0;const b=ie>=0?Ae[ie]:null,_=performance.now();function P(){const L=Math.min(1,(performance.now()-_)/R);se.mesh.material.opacity=L,b&&(b.mesh.material.opacity=1-L),L<1?requestAnimationFrame(P):b&&(b.mesh.visible=!1)}P()}function Xe(){if(me<0)return;const X=Ae[me];if(!X)return;const R=16+Math.random()*14;X.ghostCy.visible=!0,X.ghostCy.material.opacity=.6,X.ghostCy.position.x=-R,X.ghostMg.visible=!0,X.ghostMg.material.opacity=.6,X.ghostMg.position.x=R,setTimeout(()=>{X.ghostCy.material.opacity=0,X.ghostCy.visible=!1,X.ghostCy.position.x=0,X.ghostMg.material.opacity=0,X.ghostMg.visible=!1,X.ghostMg.position.x=0},140+Math.random()*100)}async function We(X,R,ie,se,b){const _=W.camZ,P=W.camX,L=performance.now();return W.warpKick=(Math.random()-.5)*34,W.yawKick=b*se,W.fovKick=1,new Promise(z=>{function $(G){const F=Math.min(1,(G-L)/ie),H=X0(F);W.camZ=_+(X-_)*H,W.camX=P+(R-P)*H,W.warpKick*=.92,W.yawKick*=.975,W.fovKick*=.965,F<1?requestAnimationFrame($):z()}requestAnimationFrame($)})}function ct(X=1,R=420){if(!he||!S||!e.current)return;const ie=window.innerWidth,se=window.innerHeight,b=performance.now()+R;function _(){if(performance.now()>b){k(M,ie,se);return}S.clearRect(0,0,ie,se),O(M);const L=5+Math.floor(Math.random()*8*X);for(let $=0;$<L;$++){const G=Math.random()*se,F=4+Math.random()*52*X,H=(Math.random()-.5)*130*X;try{S.drawImage(e.current,0,G,ie,F,H,G,ie,F)}catch{}}const z=Math.round(6*X);S.globalCompositeOperation="screen";for(let $=0;$<z;$++){const G=Math.random()*se;S.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],S.globalAlpha=.35+Math.random()*.35,S.lineWidth=.6+Math.random()*1.6,S.beginPath(),S.moveTo(0,G),S.lineTo(ie,G),S.stroke()}if(S.globalCompositeOperation="source-over",S.globalAlpha=1,Math.random()<X*.12){S.globalAlpha=.5;for(let $=0;$<220;$++)S.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",S.fillRect(Math.random()*ie,Math.random()*se,2,2);S.globalAlpha=1}requestAnimationFrame(_)}_()}function dt(X=1,R=340){if(!he||!S)return;const ie=window.innerWidth,se=window.innerHeight,b=ie/2,_=se/2,P=12+Math.floor(10*X),L=Array.from({length:P},()=>Math.random()*Math.PI*2),z=performance.now();function $(){const F=(performance.now()-z)/R;if(F>=1){k(M,ie,se);return}S.save(),S.globalCompositeOperation="screen",L.forEach(H=>{const ne=30+F*300,le=ne+90+Math.random()*150,oe=b+Math.cos(H)*ne,re=_+Math.sin(H)*ne,Me=b+Math.cos(H)*le,be=_+Math.sin(H)*le;S.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",S.globalAlpha=(1-F)*(.28+Math.random()*.32)*X,S.lineWidth=1.2+Math.random()*1.8,S.beginPath(),S.moveTo(oe,re),S.lineTo(Me,be),S.stroke()}),S.restore(),requestAnimationFrame($)}$()}async function ft(X=900){const R=window.innerWidth,ie=window.innerHeight;if(!S)return;const se=performance.now(),b=C.map(()=>Math.random()*.25);await new Promise(_=>{function P(){const L=Math.min(1,(performance.now()-se)/X);S.clearRect(0,0,R,ie),C.forEach((z,$)=>{const G=Math.min(1,Math.max(0,(L-b[$])/(1-b[$])));if(G<=0)return;const F=z.pts,H=F.length-1,ne=G*H;S.lineWidth=z.width*(1+L*.4),S.strokeStyle=z.color,S.globalAlpha=.65+L*.3,S.shadowColor=z.color,S.shadowBlur=3+L*5,S.beginPath(),S.moveTo(F[0][0],F[0][1]);for(let re=0;re<Math.floor(ne);re++)S.lineTo(F[re+1][0],F[re+1][1]);const le=Math.floor(ne),oe=ne-le;if(le<H&&oe>0){const[re,Me]=F[le],[be,De]=F[le+1];S.lineTo(re+(be-re)*oe,Me+(De-Me)*oe)}S.stroke()}),S.globalAlpha=1,S.shadowBlur=0,L<1?requestAnimationFrame(P):_()}P()})}async function xt(){var G;Q(),(G=r.current)==null||G.classList.add("intro-jitter");const X=h.current;if(!X)return;X.innerHTML="";const R=window.innerWidth,ie=window.innerHeight,se=11,b=8,_=R/se,P=ie/b,L=R/2,z=ie/2,$=[];for(let F=0;F<b;F++)for(let H=0;H<se;H++){const ne=H*_,le=F*P,oe=()=>(Math.random()-.5)*16,re=document.createElement("div");re.className="intro-shard",re.style.left=ne+"px",re.style.top=le+"px",re.style.width=_+2+"px",re.style.height=P+2+"px",re.style.clipPath=`polygon(${oe()}px ${oe()}px, ${_+oe()}px ${oe()}px, ${_+oe()}px ${P+oe()}px, ${oe()}px ${P+oe()}px)`,X.appendChild(re);const Me=ne+_/2-L,be=le+P/2-z,De=Math.hypot(Me,be)||1;$.push({div:re,dx:Me/De,dy:be/De,delay:De/Math.max(R,ie)*220+Math.random()*80})}$.forEach(({div:F,dx:H,dy:ne,delay:le})=>{const oe=60+Math.random()*140,re=420+Math.random()*420,Me=(Math.random()-.5)*420;F.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${H*oe}px, ${ne*oe-20}px) rotate(${Me*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${H*oe*1.4}px, ${ne*oe+re}px) rotate(${Me}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:le,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await qr(1600),X.innerHTML=""}async function rt(){var X;if(U(window.innerWidth,window.innerHeight),xe(),s.current&&(s.current.style.display="flex"),await D(),!x){s.current&&(s.current.style.display="none"),(X=c.current)==null||X.classList.add("intro-on"),y();for(let R=0;R<Ns.length&&!x;R++){const ie=Ns[R];M=ie.crack,d.current&&(d.current.innerHTML=ie.final?ie.sub:`${ie.sub} · трещина канала <b>${ie.crack}/4</b>`),Je(R),W.focusZ=Ps(R);const se=R%2===0?1:-1,b=ie.final?0:se*60,_=ie.final?Ps(R)-W0:Ps(R)+V0;if(await We(_,b,j0,.5+ie.crack*.09,se),x)return;B(),ct(Math.min(1,.5+ie.crack*.14),ie.final?300:260),ie.final||dt(.8+ie.crack*.1,320),k(M,window.innerWidth,window.innerHeight)}x||(await ft(900),!x&&(await qr(150),await xt(),!x&&m()))}}return rt(),()=>{x=!0,window.removeEventListener("resize",Be),cancelAnimationFrame(de),ze.forEach(X=>X.dispose()),q==null||q.dispose(),u==null||u.close().catch(()=>{})}},[]),o.jsx("div",{className:"host-screen grid-bg intro-screen",children:o.jsxs("div",{className:"intro-root",children:[o.jsx("canvas",{ref:e,className:"intro-gl"}),o.jsx("canvas",{ref:t,className:"intro-crack"}),o.jsx("div",{ref:h,className:"intro-shatter-layer"}),o.jsx("div",{className:"intro-vignette"}),o.jsx("div",{className:"intro-scanlines"}),o.jsx("div",{ref:l,className:"intro-noise"}),o.jsx("div",{className:"intro-bracket tl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket tr",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket bl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket br",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-ticker left",children:o.jsx("div",{className:"intro-ticker-col",children:[...f,...f].map((x,v)=>o.jsx("span",{className:v%6===0?"hi":void 0,children:x},v))})}),o.jsx("div",{className:"intro-ticker right",children:o.jsx("div",{className:"intro-ticker-col",children:[...g,...g].map((x,v)=>o.jsx("span",{className:v%5===0?"hi":void 0,children:x},v))})}),o.jsxs("div",{ref:s,className:"intro-stage",children:[o.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),o.jsx("div",{ref:r,className:"intro-frame"}),o.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),o.jsx("div",{ref:c,className:"intro-flight-label",children:o.jsx("div",{ref:d,className:"intro-subline"})}),o.jsx(Qa,{}),o.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const $0=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],$r=[3400,2700,2200,1900],$a=640,nl=560,Y0=320,il=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Yr=220,Ls=300,sl=.46,rl=820,Xi=n=>-(n+1)*$a,Z0=n=>n===1?1:1-Math.pow(2,-10*n),qi=n=>new Promise(e=>setTimeout(e,n));function K0(){const n=new Jn,e=[],t=new Xn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new fo(.42,.95,12),s=new lt(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new Ri(.42,.36,1.9,12),a=new lt(r,t);a.rotation.x=Math.PI/2,a.position.set(0,0,-.15),n.add(a),e.push(r);const c=new ri(.5,.14,1),d=new Xn({color:1316636,metalness:.5,roughness:.6}),l=new lt(c,d);l.position.set(.08,.38,-.1),l.rotation.z=.1,n.add(l),e.push(c,d);const h=new Xn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),p=new Zs(.13,12,12),f=new lt(p,h);f.position.set(0,-.05,-2),n.add(f),e.push(p,h);const g=new Zs(.06,8,8);[-.22,.22].forEach(N=>{const U=new lt(g,h);U.position.set(N,.12,-1.7),n.add(U)}),e.push(g);const x=new Ri(.06,.06,1.4,6),v=new Xn({color:1711394,metalness:.7,roughness:.4});e.push(x,v);const m=new ri(.04,.86,.05),u=new Xn({color:658447,metalness:.4,roughness:.6});e.push(m,u);const w=new Ri(.5,.5,.07,16),T=new Xn({color:1382429,metalness:.6,roughness:.45});e.push(w,T);const y=new po(.6,.09,8,20);e.push(y);function A(N,U){const O=new Jn,k=new lt(x,v);k.rotation.z=Math.PI/2,k.position.set(N*.72,-.08,.15),O.add(k);const Q=N*1.45,B=new lt(w,T);B.rotation.x=Math.PI/2,B.position.set(Q,-.08,.15),O.add(B);const D=new Xn({color:855826,metalness:.75,roughness:.3,emissive:U,emissiveIntensity:1.4}),q=new lt(y,D);q.position.copy(B.position),O.add(q),e.push(D);const I=new Jn;I.position.copy(B.position);for(let Y=0;Y<5;Y++){const de=new lt(m,u);de.rotation.z=Y/5*Math.PI,I.add(de)}return O.add(I),{pod:O,rim:q,spokes:I}}const S=A(-1,2875596),C=A(1,15357964);n.add(S.pod,C.pod);const M=new ei(2875596,2.2,14,2);return M.position.set(0,0,-1.4),n.add(M),{group:n,rotorL:S,rotorR:C,engineLight:M,disposables:e}}function J0(n=60){const e=new Lt,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new Ut(t,3));const r=new ar({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:ni,depthWrite:!1}),a=new ho(e,r);let c=0;function d(h,p,f,g){for(let x=0;x<g;x++){const v=c;c=(c+1)%n,i[v]=.4+Math.random()*.35,t[v*3]=h,t[v*3+1]=p,t[v*3+2]=f,s[v*3]=(Math.random()-.5)*3.2,s[v*3+1]=(Math.random()-.5)*3.2-1,s[v*3+2]=(Math.random()-.5)*3.2}}function l(h){for(let p=0;p<n;p++){if(i[p]<=0){t[p*3+1]=-9999;continue}i[p]-=h,t[p*3]+=s[p*3]*h,t[p*3+1]+=s[p*3+1]*h,t[p*3+2]+=s[p*3+2]*h,i[p]<=0&&(t[p*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:a,geo:e,mat:r,spawn:d,tick:l}}function Q0({onDone:n,phases:e=$0}){const t=ee.useRef(null),i=ee.useRef(null),s=ee.useRef(null),r=ee.useRef(null),a=ee.useRef(null),c=ee.useRef(null),d=ee.useRef(null),l=ee.useRef(n);l.current=n;const h=ee.useRef(e);h.current=e;const p=ee.useRef(()=>{});Ja();const f=ee.useMemo(()=>e.map(g=>g.text).join(" → "),[e]);return ee.useEffect(()=>{let g=!1,x=!1;const v=()=>{x||(x=!0,l.current())};p.current=v;const m=h.current,u=d.current,w=i.current,T=(w==null?void 0:w.getContext("2d"))??null;let y=[],A=0;function S(){w&&(w.width=window.innerWidth,w.height=window.innerHeight)}S();function C(X,R){y=[];let ie=0;const se=7;function b(P,L,z,$,G,F){const H=3+Math.floor(Math.random()*4),ne=[[P,L]];let le=z,oe=P,re=L;for(let Me=0;Me<H;Me++){le+=(Math.random()-.5)*.9;const be=$/H*(.55+Math.random()*.85);if(oe+=Math.cos(le)*be,re+=Math.sin(le)*be,ne.push([oe,re]),G>0&&Math.random()<.58){const De=le+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);b(oe,re,De,$*(.3+Math.random()*.35),G-1,F*.76)}}y.push({pts:ne,color:il[ie++%il.length],width:F})}for(let P=0;P<se;P++){const L=X*(.1+Math.random()*.8),z=R*(.08+Math.random()*.84),$=7+Math.floor(Math.random()*7);let G=Math.random()*Math.PI*2;for(let F=0;F<$;F++){G+=Math.PI*2/$*(.55+Math.random()*.9);const H=Math.max(X,R)*(.16+Math.random()*.46);b(L,z,G,H,2,.9)}}y.slice().forEach(P=>{if(P.pts.length<3||Math.random()>=.55)return;const[L,z]=P.pts[1+Math.floor(Math.random()*(P.pts.length-2))];b(L,z,Math.random()*Math.PI*2,Math.max(X,R)*(.08+Math.random()*.22),1,.55)})}function M(X){if(!T||X<=0)return;const R=Math.min(1,X/2.5),ie=Math.round(y.length*R);for(let se=0;se<ie;se++){const b=y[se];T.lineWidth=b.width*(.9+X*.1),T.strokeStyle=b.color,T.globalAlpha=.7+X*.07,T.shadowColor=b.color,T.shadowBlur=5+X*2.4,T.beginPath(),b.pts.forEach(([_,P],L)=>L===0?T.moveTo(_,P):T.lineTo(_,P)),T.stroke()}T.globalAlpha=1,T.shadowBlur=0}function N(X,R,ie){T&&(T.clearRect(0,0,R,ie),M(X))}function U(X=!1){const R=a.current;if(!R)return;const ie=X?"fincine-hit-big":"fincine-hit";R.classList.remove("fincine-hit","fincine-hit-big"),R.offsetWidth,R.classList.add(ie)}function O(){u&&(u.currentTime=0,u.play().catch(()=>{}))}let k=null,Q=null,B=null,D=0,q=!1,I=-1;const de=document.createElement("canvas").getContext("2d");de.font=`700 ${Yr}px "Rajdhani", sans-serif`;const he=[],me=[];function Te(X,R,ie=1){const se=X.toUpperCase(),b=Yr*.05,_=Math.ceil(de.measureText(se).width),P=Math.max(200,_+140+b*2),L=document.createElement("canvas");L.width=P,L.height=Ls;const z=L.getContext("2d");z.font=`700 ${Yr}px "Rajdhani", sans-serif`,z.textAlign="center",z.textBaseline="middle",z.lineJoin="round",z.shadowColor=R,z.shadowBlur=60,z.strokeStyle="#eef6f4",z.lineWidth=b,z.strokeText(se,P/2,Ls/2),z.fillStyle="#eef6f4",z.fillText(se,P/2,Ls/2);const $=new td(L);$.anisotropy=4;let G=P*sl*ie,F=Ls*sl*ie;if(G>rl*ie){const H=rl*ie/G;G*=H,F*=H}return{tex:$,worldW:G,worldH:F}}function Ve(X,R,ie,se){const{tex:b,worldW:_,worldH:P}=Te(X,ie,se),L=new Oi(_,P),z=new On({map:b,transparent:!0,depthWrite:!1,opacity:0}),$=new lt(L,z);$.position.set(0,8,R),$.visible=!1,Q.add($);const G=new lt(L,new On({map:b,transparent:!0,depthWrite:!1,blending:ni,color:2875596,opacity:0})),F=new lt(L,new On({map:b,transparent:!0,depthWrite:!1,blending:ni,color:16723804,opacity:0}));return G.position.copy($.position),F.position.copy($.position),G.visible=!1,F.visible=!1,Q.add(G),Q.add(F),me.push(L,z,b,G.material,F.material),{mesh:$,ghostCy:G,ghostMg:F}}const Ae={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let ze,ae,fe=null,W=null,ge=0;function pe(){const X=t.current;if(!X)return;k=new gd({canvas:X,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),k.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Q=new Zl,Q.fog=new sr(263946,.0012),B=new Bt(58,window.innerWidth/window.innerHeight,1,6e3),B.position.set(0,0,40),Q.add(new od(928300,1));const R=$a*m.length+600,ie=700,se=new Lt,b=new Float32Array(ie*3),_=new Float32Array(ie*3),P=[2875596,10116351,15357964];for(let G=0;G<ie;G++){const F=60+Math.random()*280,H=Math.random()*Math.PI*2;b[G*3]=Math.cos(H)*F,b[G*3+1]=Math.sin(H)*F,b[G*3+2]=-Math.random()*R;const ne=new $e(P[G%P.length]);_[G*3]=ne.r,_[G*3+1]=ne.g,_[G*3+2]=ne.b}se.setAttribute("position",new Ut(b,3)),se.setAttribute("color",new Ut(_,3));const L=new ar({size:3,vertexColors:!0,transparent:!0,opacity:.8});Q.add(new ho(se,L)),me.push(se,L),m.forEach((G,F)=>{const H=Xi(F),ne="#"+G.light.toString(16).padStart(6,"0");he.push(Ve(G.text,H,ne,G.final?1.35:1));const le=new ei(G.light,2.6,950,2);le.position.set(0,40,H+60),Q.add(le)}),ze=new ei(15357964,3.4,550,2),ae=new ei(10116351,2.2,550,2),Q.add(ze),Q.add(ae),fe=K0(),B.add(fe.group),fe.group.position.set(1.3,-1,-6.5),W=J0(),fe.group.add(W.points),me.push(W.geo,W.mat),Q.add(B),q=!0,xe();const z=Math.random()*1e3;Ae.camZ=-$a*.6;function $(G){if(!k||!Q||!B||!fe||!W)return;const F=ge?Math.min(.05,(G-ge)/1e3):.016;ge=G;const H=.15+Math.min(1,Math.max(0,(I+1)/m.length))*.85,ne=Ae.impactT;ne>0&&(Ae.impactT=Math.max(0,ne-F));const le=Math.sin(G*.0016+z)*(1+H*2.2+ne*6)+Math.sin(G*.0043)*.5*H,oe=Math.cos(G*.002+z)*(.9+H*1.8+ne*5)+Math.cos(G*.0038)*.45*H;B.position.x=le+Ae.camX,B.position.y=oe+6,B.position.z=Ae.camZ+Ae.warpKick;const re=Ae.yawKick,Me=B.position.x+Math.sin(re)*640,be=Ae.focusY??B.position.y-4;B.lookAt(Me,be,Ae.focusZ),B.rotateZ(-re*.55);const De=58+Ae.fovKick*(14+H*10)+ne*24;Math.abs(B.fov-De)>.01&&(B.fov=De,B.updateProjectionMatrix()),ze.position.set(Math.sin(G*6e-4)*80,30,Ae.camZ-120),ae.position.set(Math.cos(G*7e-4)*80,-10,Ae.camZ-200),Ae.droneRoll=Ae.droneRoll*.9+-re*1.4*.1;const V=1.6+H*2.4;Ae.droneBob=Math.sin(G*.001*V)*(.12+H*.35),fe.group.rotation.z=Ae.droneRoll*.6+(ne>0?Math.sin(G*.09)*1.15*ne:0),fe.group.rotation.x=Math.sin(G*.0013)*.06*(1+H)+(ne>0?Math.cos(G*.11)*.75*ne:0);const ve=F*(6+H*10);fe.rotorR.spokes.rotation.z+=ve;let ce=-1+Ae.droneBob;Ae.engineOutT>0?(Ae.engineOutT-=F,ce-=1-Math.max(0,Ae.engineOutT)/.5<1?Math.sin((.5-Ae.engineOutT)*9)*.4:0,fe.rotorL.spokes.rotation.z+=ve*.12,fe.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&W.spawn(-1.45,-.08,.15,2)):(fe.rotorL.spokes.rotation.z+=ve,fe.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(G*.01)*.3),fe.group.position.y=ce,fe.group.position.x=1.3+Math.sin(G*9e-4)*.25*(1+H),fe.group.position.z=-6.5-(ne>0?ne*2.6:0),W.tick(F),he.forEach(_e=>{_e.mesh.visible&&_e.mesh.quaternion.copy(B.quaternion),_e.ghostCy.visible&&_e.ghostCy.quaternion.copy(B.quaternion),_e.ghostMg.visible&&_e.ghostMg.quaternion.copy(B.quaternion)}),k.render(Q,B),D=requestAnimationFrame($)}D=requestAnimationFrame($)}function xe(){!q||!k||!B||(k.setSize(window.innerWidth,window.innerHeight),B.aspect=window.innerWidth/window.innerHeight,B.updateProjectionMatrix())}function ke(){xe(),S(),C(window.innerWidth,window.innerHeight),N(A,window.innerWidth,window.innerHeight)}window.addEventListener("resize",ke,{passive:!0});function Be(X,R=600){const ie=I;I=X;const se=he[X];if(!se)return;se.mesh.visible=!0,se.mesh.material.opacity=0;const b=ie>=0?he[ie]:null,_=performance.now();function P(){const L=Math.min(1,(performance.now()-_)/R);se.mesh.material.opacity=L,b&&(b.mesh.material.opacity=1-L),L<1?requestAnimationFrame(P):b&&(b.mesh.visible=!1)}P()}function Je(X=.5){if(I<0)return;const R=he[I];if(!R)return;const ie=(14+Math.random()*12)*(.7+X*.6),se=Math.min(1,.45+X*.3);R.ghostCy.visible=!0,R.ghostCy.material.opacity=se,R.ghostCy.position.x=-ie,R.ghostMg.visible=!0,R.ghostMg.material.opacity=se,R.ghostMg.position.x=ie,setTimeout(()=>{R.ghostCy.material.opacity=0,R.ghostCy.visible=!1,R.ghostCy.position.x=0,R.ghostMg.material.opacity=0,R.ghostMg.visible=!1,R.ghostMg.position.x=0},(120+Math.random()*90)*(.8+X*.5)),X>.75&&Math.random()<.65&&setTimeout(()=>Je(X*.55),70+Math.random()*70)}async function Xe(X,R,ie,se,b){const _=Ae.camZ,P=Ae.camX,L=performance.now();return Ae.warpKick=(Math.random()-.5)*40,Ae.yawKick=b*se,Ae.fovKick=1,new Promise(z=>{function $(G){if(g){z();return}const F=Math.min(1,(G-L)/ie),H=Z0(F);Ae.camZ=_+(X-_)*H,Ae.camX=P+(R-P)*H,Ae.warpKick*=.91,Ae.yawKick*=.972,Ae.fovKick*=.96,F<1?requestAnimationFrame($):z()}requestAnimationFrame($)})}function We(X=1,R=420){if(!q||!T||!t.current)return;const ie=window.innerWidth,se=window.innerHeight,b=performance.now()+R;function _(){if(performance.now()>b){N(A,ie,se);return}T.clearRect(0,0,ie,se),M(A);const L=5+Math.floor(Math.random()*9*X);for(let $=0;$<L;$++){const G=Math.random()*se,F=4+Math.random()*56*X,H=(Math.random()-.5)*150*X;try{T.drawImage(t.current,0,G,ie,F,H,G,ie,F)}catch{}}T.globalCompositeOperation="screen";const z=Math.round(6*X);for(let $=0;$<z;$++){const G=Math.random()*se;T.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],T.globalAlpha=.35+Math.random()*.35,T.lineWidth=.6+Math.random()*1.8,T.beginPath(),T.moveTo(0,G),T.lineTo(ie,G),T.stroke()}if(T.globalCompositeOperation="source-over",T.globalAlpha=1,Math.random()<X*.14){T.globalAlpha=.5;for(let $=0;$<240;$++)T.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",T.fillRect(Math.random()*ie,Math.random()*se,2,2);T.globalAlpha=1}requestAnimationFrame(_)}_()}function ct(X=1,R=340){if(!q||!T)return;const ie=window.innerWidth,se=window.innerHeight,b=ie/2,_=se/2,P=14+Math.floor(14*X),L=Array.from({length:P},()=>Math.random()*Math.PI*2),z=performance.now();function $(){const F=(performance.now()-z)/R;if(F>=1){N(A,ie,se);return}T.save(),T.globalCompositeOperation="screen",L.forEach(H=>{const ne=30+F*340,le=ne+100+Math.random()*170,oe=b+Math.cos(H)*ne,re=_+Math.sin(H)*ne,Me=b+Math.cos(H)*le,be=_+Math.sin(H)*le;T.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",T.globalAlpha=(1-F)*(.3+Math.random()*.34)*X,T.lineWidth=1.2+Math.random()*2,T.beginPath(),T.moveTo(oe,re),T.lineTo(Me,be),T.stroke()}),T.restore(),requestAnimationFrame($)}$()}async function dt(X=900){const R=window.innerWidth,ie=window.innerHeight;if(!T)return;const se=performance.now(),b=y.map(()=>Math.random()*.25);await new Promise(_=>{function P(){if(g){_();return}const L=Math.min(1,(performance.now()-se)/X);T.clearRect(0,0,R,ie),y.forEach((z,$)=>{const G=Math.min(1,Math.max(0,(L-b[$])/(1-b[$])));if(G<=0)return;const F=z.pts,H=F.length-1,ne=G*H;T.lineWidth=z.width*(1+L*.45),T.strokeStyle=z.color,T.globalAlpha=.65+L*.32,T.shadowColor=z.color,T.shadowBlur=3+L*6,T.beginPath(),T.moveTo(F[0][0],F[0][1]);for(let re=0;re<Math.floor(ne);re++)T.lineTo(F[re+1][0],F[re+1][1]);const le=Math.floor(ne),oe=ne-le;if(le<H&&oe>0){const[re,Me]=F[le],[be,De]=F[le+1];T.lineTo(re+(be-re)*oe,Me+(De-Me)*oe)}T.stroke()}),T.globalAlpha=1,T.shadowBlur=0,L<1?requestAnimationFrame(P):_()}P()})}async function ft(){Ae.impactT=.55,U(!0),W&&(W.spawn(0,-.05,-2,28),W.spawn(-1.45,-.08,.15,16),W.spawn(1.45,-.08,.15,16)),We(1.6,340),ct(1.4,260),await qi(160)}async function xt(){U(!0);const X=c.current;if(!X)return;X.innerHTML="";const R=window.innerWidth,ie=window.innerHeight,se=12,b=8,_=R/se,P=ie/b,L=R/2,z=ie/2,$=[];for(let G=0;G<b;G++)for(let F=0;F<se;F++){const H=F*_,ne=G*P,le=()=>(Math.random()-.5)*16,oe=document.createElement("div");oe.className="fincine-shard",oe.style.left=H+"px",oe.style.top=ne+"px",oe.style.width=_+2+"px",oe.style.height=P+2+"px",oe.style.clipPath=`polygon(${le()}px ${le()}px, ${_+le()}px ${le()}px, ${_+le()}px ${P+le()}px, ${le()}px ${P+le()}px)`,X.appendChild(oe);const re=H+_/2-L,Me=ne+P/2-z,be=Math.hypot(re,Me)||1;$.push({div:oe,dx:re/be,dy:Me/be,delay:be/Math.max(R,ie)*200+Math.random()*70})}$.forEach(({div:G,dx:F,dy:H,delay:ne})=>{const le=70+Math.random()*160,oe=460+Math.random()*460,re=(Math.random()-.5)*460;G.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${F*le}px, ${H*le-22}px) rotate(${re*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${F*le*1.4}px, ${H*le+oe}px) rotate(${re}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:ne,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await qi(1530),X.innerHTML=""}async function rt(){if(C(window.innerWidth,window.innerHeight),pe(),O(),s.current&&s.current.classList.add("fincine-on"),await qi(900),!g){for(let X=0;X<m.length&&!g;X++){const R=m[X];A=R.crack,r.current&&(r.current.innerHTML=R.final?R.sub:`${R.sub} · рассинхрон канала <b>${R.crack}/4</b>`),Be(X),Ae.focusZ=Xi(X),R.final&&(Ae.focusY=8);const ie=X%2===0?1:-1;if(R.final){const se=Xi(X)+nl+280;if(await Xe(se,0,$r[X]??2200,.35,ie),g||(Je(.4+R.crack*.2),We(Math.min(1.5,.45+R.crack*.27),300),N(A,window.innerWidth,window.innerHeight),await qi(700),await Xe(Xi(X)-Y0,-150,950,.5,ie),g))return}else{const se=ie*70,b=Xi(X)+nl;if(R.crack>=2&&setTimeout(()=>{g||(Ae.engineOutT=.5)},$r[X]*.4),await Xe(b,se,$r[X]??2200,.55+R.crack*.1,ie),g)return}Je(.4+R.crack*.2),We(Math.min(1.5,.45+R.crack*.27),R.final?360:240+R.crack*30),R.final||ct(.8+R.crack*.2,300+R.crack*20),R.crack>=3&&U(!0),N(A,window.innerWidth,window.innerHeight)}g||(await ft(),!g&&(await dt(850),!g&&(await qi(140),await xt(),!g&&v())))}}return rt(),()=>{g=!0,window.removeEventListener("resize",ke),cancelAnimationFrame(D),me.forEach(X=>X.dispose()),fe==null||fe.disposables.forEach(X=>X.dispose()),k==null||k.dispose();try{u==null||u.pause()}catch{}}},[]),o.jsxs("div",{className:"fincine-root",onClick:()=>p.current(),children:[o.jsx("canvas",{ref:t,className:"fincine-gl"}),o.jsx("canvas",{ref:i,className:"fincine-crack"}),o.jsx("div",{ref:c,className:"fincine-shatter-layer"}),o.jsx("div",{className:"fincine-vignette"}),o.jsx("div",{className:"fincine-scanlines"}),o.jsx("div",{ref:a,className:"fincine-noise"}),o.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!f,children:[o.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),o.jsx("div",{ref:r,className:"fincine-sub"})]}),o.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),o.jsx(Qa,{}),o.jsx("audio",{ref:d,src:"/quiz-party/intro.mp3",preload:"auto"})]})}async function ex(n,e){var i;await kt.from("game_sessions").update({melody:{}}).eq("id",ti());const t=Ml(e,n.round_number,"show_answers");if(t.kind==="scoreboard")return void xl();if(t.kind==="break")return void _l();if(t.kind==="finale")return void tr(n.pack_id,((i=e.settings)==null?void 0:i.play_mode)==="paper");await kt.from("game_sessions").update({phase:"round_intro",round_number:n.round_number+1,question_index:0,timer_started_at:null,reveal:!1,melody:{}}).eq("id",ti())}let Ot=null;function tx(){Ot||(Ot=wt(),Ot.play().catch(()=>{}),Ot.pause())}function Ds(n){return Ot||(Ot=wt()),Ot.pause(),Ot.loop=!1,Ot.volume=1,Al(Ot,n),Ot}function nx(){if(Ot)try{Ot.pause(),Ot.currentTime=0}catch{}}async function gt(n){await kt.from("game_sessions").update({melody:n}).eq("id",ti())}const rn=n=>new Date(Date.now()+n*1e3).toISOString();function ix({src:n}){return ee.useEffect(()=>{const e=wt();e.src=n,e.currentTime=0;let t=!1;e.play().then(()=>{if(t)try{e.pause(),e.src=""}catch{}}).catch(()=>{});const i=setTimeout(()=>{try{e.pause()}catch{}},15e3);return()=>{t=!0,clearTimeout(i);try{e.pause(),e.src=""}catch{}}},[n]),o.jsx("div",{className:"mel-reveal-track",children:"♪ играет 15 секунд"})}function sx({pack:n,round:e,gameState:t}){var he,me,Te,Ve,Ae,ze,ae,fe;const i=e.settings,s=i.themes??[],r=t.melody??{},a=fn(t.game_id),c=kn(t.game_id,t.round_number),d=r.played??[],l=ee.useRef(null),[h,p]=ee.useState(Date.now());ee.useEffect(()=>{const W=setInterval(()=>p(Date.now()),200);return()=>clearInterval(W)},[]);const f=r.deadline?new Date(r.deadline).getTime():0,g=f?Math.max(0,Math.ceil((f-h)/1e3)):0,x=ee.useRef(0);ee.useEffect(()=>{x.current=0},[r.stage,r.key]),g>x.current&&(x.current=g);const v=x.current,m=!!f&&h>=f,[u,w]=(r.key??"0-0").split("-").map(Number),T=(he=s[u])==null?void 0:he.tracks[w],y=`q-mel-${r.key}-bid`,A=`q-mel-${r.key}`,S=c.filter(W=>W.question_ref===y);ee.useEffect(()=>{if(r.stage!=="bids")return;const W=S.map(pe=>({id:pe.team_id,sec:Number(pe.answer_text)||99,at:pe.updated_at})).sort((pe,xe)=>pe.sec-xe.sec||+new Date(pe.at)-+new Date(xe.at)).map(pe=>pe.id),ge=[...W,...a.map(pe=>pe.id).filter(pe=>!W.includes(pe))];JSON.stringify(ge)!==JSON.stringify(r.order)&&gt({...r,order:ge,turn:0})},[r.stage,S.map(W=>`${W.team_id}:${W.answer_text}`).join("|")]),ee.useEffect(()=>{if(r.stage!=="snippet")return;const W=r.snippetSec??5,ge=window.setTimeout(()=>{gt({...r,stage:"answering",deadline:rn(i.answerSec??30)})},(W+10)*1e3);return()=>clearTimeout(ge)},[r.stage,r.key,r.snippetSec]),ee.useEffect(()=>{if(r.stage!=="snippet"||!(T!=null&&T.audio)||document.hidden)return;const W=r.snippetSec??5,ge=Ds(qe(T.audio));l.current=ge;let pe,xe=!1;const ke=()=>{xe||(xe=!0,ge.pause(),gt({...r,stage:"answering",deadline:rn(i.answerSec??30)}))};ge.addEventListener("playing",()=>{gt({...r,deadline:rn(W)}),pe=window.setTimeout(ke,W*1e3)},{once:!0});const Be=window.setTimeout(ke,(W+4)*1e3);return()=>{pe&&clearTimeout(pe),clearTimeout(Be)}},[r.stage,r.key]),ee.useEffect(()=>{var W;if(!(!m||document.hidden))if(r.stage==="spinning")gt({...r,stage:"listen",deadline:rn(2)});else if(r.stage==="bidding"){const ge=S.map(xe=>({id:xe.team_id,sec:Number(xe.answer_text)||99,at:xe.updated_at})).sort((xe,ke)=>xe.sec-ke.sec||+new Date(xe.at)-+new Date(ke.at)).map(xe=>xe.id),pe=[...ge,...a.map(xe=>xe.id).filter(xe=>!ge.includes(xe))];gt({...r,stage:"bids",order:pe,turn:0,deadline:void 0})}else(r.stage==="answering"||r.stage==="passed")&&(c.some(pe=>{var xe,ke;return pe.question_ref===`q-mel-${r.key}`&&pe.team_id===((xe=r.order)==null?void 0:xe[r.turn??0])&&!!((ke=pe.answer_text)!=null&&ke.trim())})?gt({...r,deadline:void 0}):(nx(),(r.turn??0)===0&&(((W=r.order)==null?void 0:W.length)??0)>1?gt({...r,stage:"passed",turn:1,deadline:void 0}):gt({...r,stage:"done",deadline:void 0,played:[...d,r.key]})))},[m,r.stage,c]),ee.useEffect(()=>{if(r.stage!=="listen"||!(T!=null&&T.audio)||document.hidden)return;const W=Ds(qe(T.audio));l.current=W;let ge,pe=!1;const xe=()=>{pe||(pe=!0,W.pause(),gt({...r,stage:"bidding",deadline:rn(i.bidSec??10)}))};W.addEventListener("playing",()=>{ge=window.setTimeout(xe,1e3)},{once:!0});const ke=window.setTimeout(xe,4e3);return()=>{ge&&clearTimeout(ge),clearTimeout(ke)}},[r.stage,r.key]),ee.useEffect(()=>{var pe;const W=e.settings.bg_music??((pe=n.settings)==null?void 0:pe.bg_music);if(r.stage!=="answering"&&r.stage!=="bidding"||!W||document.hidden)return;const ge=Ds(qe(W));return ge.loop=!0,ge.volume=.45,()=>{ge.pause(),ge.loop=!1,ge.volume=1}},[r.stage]),ee.useEffect(()=>{if(r.stage!=="passed"||r.deadline||!(T!=null&&T.audio)||document.hidden)return;const W=Ds(qe(T.audio));return l.current=W,W.onended=()=>void gt({...r,deadline:rn(i.passAnswerSec??10)}),()=>{W.pause(),W.onended=null}},[r.stage]);const[C,M]=ee.useState(!1);if(s.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"УГАДАЙ МЕЛОДИЮ"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"})]});const U=s.flatMap((W,ge)=>W.tracks.map((pe,xe)=>`${ge}-${xe}`)).filter(W=>!d.includes(W)),O=!r.stage||r.stage==="idle"||r.stage==="done",k=W=>{M(!1),gt({...r,key:W,stage:"listen",deadline:rn(3),order:void 0,turn:0,chooser:void 0})},Q=()=>{const W=U[Math.floor(Math.random()*U.length)];if(U.length===1){gt({...r,key:W,stage:"listen",deadline:rn(3),order:void 0,turn:0,chooser:void 0});return}gt({...r,key:W,stage:"spinning",deadline:rn(Math.min(i.spinSec??5,8)),order:void 0,turn:0,chooser:void 0})},B=(me=r.order)==null?void 0:me[r.turn??0],D=a.find(W=>W.id===B),q=Number((Te=S.find(W=>W.team_id===B))==null?void 0:Te.answer_text)||0,I=c.find(W=>W.question_ref===A&&W.team_id===B),Y=async W=>{if(!I)return;const pe=(r.turn??0)===0?q<=5?2:1:.5;await kt.from("answers").update({is_correct:W,stake:pe}).eq("id",I.id),await gt({...r,stage:"reveal",deadline:void 0,played:[...d,r.key],wonPts:pe,wonTeam:B,chooser:void 0})},de=async()=>{var W;(r.turn??0)===0&&(((W=r.order)==null?void 0:W.length)??0)>1?await gt({...r,stage:"passed",turn:1,deadline:void 0}):await gt({...r,stage:"done",deadline:void 0,played:[...d,r.key]})};return o.jsxs("div",{className:"host-screen grid-bg mel-screen",onPointerDown:tx,children:[o.jsx(rx,{themes:s,played:d,spinning:r.stage==="spinning",spinKey:r.key,spinLeft:g,spinTotal:i.spinSec??10,onPick:C?k:void 0}),O&&o.jsx("div",{className:"host-actions",children:U.length>0?C?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ ПЛИТКУ НА ЭКРАНЕ"}),o.jsx("button",{className:"ghost",onClick:()=>M(!1),children:"Отмена"})]}):o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:Q,children:d.length===0?"Стартуем!":"Рулетка"}),o.jsx("button",{className:"ghost",onClick:()=>M(!0),children:"Выбрать вручную"})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВСЕ ТРЕКИ ОТЫГРАНЫ"}),o.jsx("button",{onClick:()=>void ex(t,n),children:"Завершить раунд →"})]})}),r.stage&&!O&&r.stage!=="spinning"&&ml.createPortal(o.jsx("div",{className:`mel-overlay theme-${n.theme??"classic"}`,children:o.jsxs("div",{className:"mel-modal",children:[o.jsxs("div",{className:"mel-modal-head",children:[o.jsxs("div",{className:"mel-modal-theme",children:[(Ve=s[u])==null?void 0:Ve.name," · трек ",w+1]}),!!f&&o.jsx("div",{className:"mel-count",children:n.theme==="potter"?o.jsx(Cl,{left:g,seconds:v,low:g<=5}):g})]}),r.stage==="listen"&&o.jsx("div",{className:"mel-big",children:"СЛУШАЕМ 1 СЕКУНДУ…"}),r.stage==="bidding"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mel-big",children:"ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?"}),o.jsx("div",{className:"mel-points-hint",children:"2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0.5 балла"}),o.jsx("div",{className:"mel-bids",children:[...a].sort((W,ge)=>W.name.localeCompare(ge.name)).map(W=>{const ge=S.find(pe=>pe.team_id===W.id);return o.jsxs("div",{className:`mel-bid-row${ge?" win":""}`,children:[o.jsx("span",{style:{color:W.color},children:W.name}),o.jsx("b",{children:ge?"ставка принята ✓":"…"}),o.jsx("span",{})]},W.id)})})]}),r.stage==="bids"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"СТАВКИ КОМАНД"}),o.jsxs("div",{className:"mel-bids",children:[(r.order??[]).map((W,ge)=>{const pe=a.find(ke=>ke.id===W),xe=S.find(ke=>ke.team_id===W);return o.jsxs("div",{className:`mel-bid-row${ge===0?" win":""}`,children:[o.jsx("span",{style:{color:pe==null?void 0:pe.color},children:pe==null?void 0:pe.name}),o.jsxs("b",{children:[xe==null?void 0:xe.answer_text," сек"]}),ge===0?o.jsx("span",{className:"mel-win-tag",children:"ИГРАЕТ"}):o.jsx("span",{})]},W)}),(r.order??[]).length===0&&o.jsx("div",{style:{opacity:.6},children:"ставок нет"})]}),o.jsxs("div",{className:"mel-actions",children:[o.jsxs("button",{disabled:!B,onClick:()=>void gt({...r,stage:"snippet",snippetSec:q||5,deadline:void 0}),children:["Играем ",q||5," сек →"]}),o.jsx("button",{className:"ghost dark",onClick:()=>void gt({...r,stage:"done",deadline:void 0,played:[...d,r.key]}),children:"Пропустить трек"})]})]}),r.stage==="snippet"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:D==null?void 0:D.color},children:[D==null?void 0:D.name," · играет ",q," сек"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void gt({...r,stage:"answering",deadline:rn(i.answerSec??30)}),children:"Принимаем ответ →"})})]}),r.stage==="reveal"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"answer-reveal",style:{padding:"18px 28px"},children:[o.jsxs("div",{className:"answer-label",children:["ВЕРНО ✓ · +",r.wonPts??0]}),o.jsx("div",{className:"answer-main",children:T==null?void 0:T.correct})]}),(T==null?void 0:T.audio)&&o.jsx(ix,{src:qe(T.audio)}),o.jsxs("div",{className:"mel-big",style:{color:(Ae=a.find(W=>W.id===r.wonTeam))==null?void 0:Ae.color},children:[(ze=a.find(W=>W.id===r.wonTeam))==null?void 0:ze.name," забирает баллы"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void gt({...r,stage:"done"}),children:"К доске →"})})]}),r.stage!=="reveal"&&r.stage!=="done"&&o.jsx("button",{className:"mel-escape",onClick:async()=>{confirm(`Закрыть трек и вернуться к доске?

Баллы за него никто не получит.`)&&await gt({...r,stage:"done",deadline:void 0,played:[...d,r.key]})},children:"Закрыть"}),(r.stage==="answering"||r.stage==="passed")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:D==null?void 0:D.color},children:[r.stage==="passed"?"ХОД ПЕРЕДАН · ":"",(D==null?void 0:D.name)??"—"]}),o.jsx("div",{className:"mel-points-hint",children:r.stage==="passed"?"за верный ответ — 0.5 балла":`ставка ${q} сек → за верный ответ ${q<=5?2:1} балла`}),o.jsx("div",{className:"mel-answer",children:I!=null&&I.answer_text?o.jsxs(o.Fragment,{children:["Ответ: ",o.jsx("b",{children:I.answer_text})]}):o.jsx("span",{style:{opacity:.6},children:"ждём ответ…"})}),(I==null?void 0:I.is_correct)===!0&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ВЕРНО ✓"}),o.jsx("div",{className:"answer-main",children:T==null?void 0:T.correct})]}),(I==null?void 0:I.is_correct)===!1&&o.jsxs("div",{className:"mel-wrong",children:["✗ НЕВЕРНО · ответ не раскрываем",(r.turn??0)===0&&(((ae=r.order)==null?void 0:ae.length)??0)>1?" — передайте ход второй команде":" — трек закрывается"]}),o.jsxs("div",{className:"mel-actions",children:[o.jsx("button",{disabled:!I,onClick:()=>void Y(!0),children:"✓ Верно"}),o.jsx("button",{className:"ghost",onClick:async()=>{I&&I.is_correct==null&&await kt.from("answers").update({is_correct:!1,stake:0}).eq("id",I.id),await de()},children:(r.turn??0)===0&&(((fe=r.order)==null?void 0:fe.length)??0)>1?"✗ Передать ход →":"✗ Закрыть трек"})]})]})]})}),document.body)]})}function rx({themes:n,played:e,spinning:t,spinKey:i,spinLeft:s,spinTotal:r,onPick:a}){const d=n.flatMap((g,x)=>g.tracks.map((v,m)=>`${x}-${m}`)).filter(g=>!e.includes(g)),[l,h]=ee.useState(0),p=ee.useRef(s);p.current=s,ee.useEffect(()=>{if(!t||d.length===0||s<=0)return;let g=!1,x;const v=()=>{if(g)return;h(u=>{let w=Math.floor(Math.random()*d.length);return d.length>1&&w===u&&(w=(w+1)%d.length),w});const m=1-Math.max(0,p.current)/Math.max(1,r);x=window.setTimeout(v,180+m*m*720)};return x=window.setTimeout(v,180),()=>{g=!0,x&&clearTimeout(x)}},[t]);const f=t?s<=1?i:d[l%Math.max(1,d.length)]:void 0;return o.jsxs("div",{className:"mel-board",style:{gridTemplateColumns:`repeat(${n.length}, minmax(0,1fr))`,gridTemplateRows:`auto repeat(${Math.max(...n.map(g=>g.tracks.length),1)}, minmax(0, 1fr))`},children:[n.map((g,x)=>o.jsx("div",{className:"mel-theme",children:g.name||`Тема ${x+1}`},`h${x}`)),n.map((g,x)=>g.tracks.map((v,m)=>{const u=`${x}-${m}`,w=e.includes(u),T=f===u;return o.jsx("div",{className:`mel-tile${w?" done":""}${T?" spin":""}${a&&!w?" pickable":""}`,onClick:a&&!w?()=>a(u):void 0,"data-c":String(x%4),style:{gridColumn:x+1,gridRow:m+2},children:o.jsx("span",{className:"mel-face",children:w?"":m+1})},u)}))]})}const al=[{body:"#f2e3c9",mask:"#b99a7d",name:"кремовый"},{body:"#8a5a33",mask:"#4c2f17",name:"тигровый"},{body:"#3b3b40",mask:"#232326",name:"чёрный"},{body:"#e8e2d8",mask:"#c96f3b",name:"бело-рыжий"},{body:"#9aa7b5",mask:"#6c7886",name:"голубой"}];function ax(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ox(n,e){const t=ax(n),i=8,s=Array.from({length:5},()=>{const v=Array.from({length:i},()=>.45+t()*.9),m=v.reduce((u,w)=>u+w,0);return{speeds:v,total:m}}),r=Math.max(...s.map(v=>v.total)),a=s.map(v=>e*.92*(r/v.total)),c=(v,m)=>{const u=a[v],T=Math.min(1,Math.max(0,m/u))*i,y=Math.floor(T),A=T-y;let S=0;for(let C=0;C<y;C++)S+=s[v].speeds[C];return S+=(s[v].speeds[Math.min(y,i-1)]??0)*A,Math.min(1,S/s[v].total)},d=["🦋","💤","🐦","🍂"],l=Array.from({length:5},()=>{const v=[];return t()<.6&&v.push({at:(.25+t()*.3)*e,dur:.6+t()*.9,icon:d[Math.floor(t()*d.length)]}),t()<.25&&v.push({at:(.62+t()*.22)*e,dur:.5+t()*.7,icon:d[Math.floor(t()*d.length)]}),v}),h=(v,m)=>l[v].find(u=>m>=u.at&&m<u.at+u.dur),p=(v,m)=>{let u=0;for(const w of l[v])u+=Math.min(Math.max(0,m-w.at),w.dur);return m-u},f=(v,m)=>c(v,p(v,m)),g=a.map((v,m)=>v+l[m].reduce((u,w)=>u+w.dur,0)),x=g.map((v,m)=>({i:m,f:v})).sort((v,m)=>v.f-m.f).map(v=>v.i);return{progress:f,finish:g,places:x,pausedAt:h}}function cx({pack:n,round:e,gameState:t}){var y;const i=e.settings,s=(i.dogs??[]).length===5?i.dogs:["Френк","Батон","Пельмень","Турбо","Ракета"],r=i.raceSec??18,a=((y=t.melody)==null?void 0:y.race)??{},c=fn(t.game_id),l=kn(t.game_id,t.round_number).filter(A=>A.question_ref===`q-race-${t.round_number}`),h=ee.useRef(!1);ee.useEffect(()=>{var C;const A=e.settings.race_music??((C=n.settings)==null?void 0:C.bg_music);if(a.stage!=="running"||!A||document.hidden)return;const S=wt();return S.src=qe(A),S.loop=!0,S.volume=.55,S.play().catch(()=>{}),()=>S.pause()},[a.stage]);const[p,f]=ee.useState(Date.now());ee.useEffect(()=>{const A=setInterval(()=>f(Date.now()),66);return()=>clearInterval(A)},[]);const g=ee.useMemo(()=>a.seed!=null?ox(a.seed,r):null,[a.seed,r]),x=a.startedAt?(p-new Date(a.startedAt).getTime())/1e3:0,v=a.stage==="running"&&g,m=a.stage==="done",u=g&&x>=Math.max(...g.finish)+1;ee.useEffect(()=>{if(!v||!u||h.current||document.hidden)return;h.current=!0;const A=new Map(g.places.map((S,C)=>[S,C]));(async()=>{for(const S of l){const C=Number(S.answer_text)-1,M=A.get(C),N=M!=null?5-M:0;await kt.from("answers").update({is_correct:!0,stake:N}).eq("id",S.id)}await kt.from("game_sessions").update({melody:{...t.melody,race:{...a,stage:"done"}}}).eq("id",ti())})()},[v,u]),ee.useEffect(()=>{!a.stage&&!document.hidden&&T()},[a.stage]);const w=()=>Jd(t),T=()=>Kd(t);return o.jsxs("div",{className:"host-screen grid-bg race-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")||"СКАЧКИ БУЛЬДОГОВ"})}),(a.stage==="running"||m)&&o.jsxs("div",{className:"race-track hud-frame",children:[o.jsx("div",{className:"race-stands",children:Array.from({length:26},(A,S)=>o.jsx("span",{style:{animationDelay:`${S%5*.3}s`},children:["🎉","👏","🙌","⭐","🎊"][S%5]},S))}),o.jsx("div",{className:"race-finish"}),s.map((A,S)=>{const C=(v||m)&&g?g.progress(S,m?999:x):0,M=g&&(m||u)?g.places.indexOf(S):null,N=v&&!m?g==null?void 0:g.pausedAt(S,x):void 0,U=!!g&&x>=g.finish[S];return o.jsxs("div",{className:"race-lane",children:[o.jsx("span",{className:"race-num",children:S+1}),o.jsxs("div",{className:"race-dog",style:{left:`calc(${6+C*82}% )`},children:[N&&o.jsx("span",{className:"race-pause",children:N.icon}),o.jsx(dx,{color:al[S],running:!!v&&!u&&!N&&!U}),o.jsxs("span",{className:"race-name",children:[A,M!=null&&` · ${M+1} место`]})]}),o.jsx("span",{className:"race-treat",children:"🍖"})]},S)})]}),(!a.stage||a.stage==="betting")&&o.jsxs("div",{className:"race-panel",children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА · СТАВКИ ТАЙНЫЕ"}),o.jsx("div",{className:"race-lineup",children:s.map((A,S)=>o.jsxs("div",{className:"race-candidate",children:[o.jsx(lx,{color:al[S],n:S+1}),o.jsxs("span",{className:"race-tag",children:[o.jsxs("b",{children:["№",S+1]})," ",A]})]},S))}),o.jsxs("div",{className:"mono-tag",style:{color:l.length===c.length&&c.length>0?"var(--answer)":void 0},children:["СТАВКИ СДЕЛАЛИ: ",l.length," / ",c.length]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{disabled:l.length===0,onClick:()=>void w(),children:"🏁 Старт! (ставки закрываются)"})})]}),m&&g&&o.jsxs("div",{className:"race-result",children:[o.jsx("div",{className:"host-actions",children:o.jsx(ai,{pack:n,gameState:t})}),o.jsxs("div",{className:"answer-reveal",style:{padding:"14px 30px"},children:[o.jsx("div",{className:"answer-label",children:"ПОБЕДИТЕЛЬ"}),o.jsxs("div",{className:"answer-main",children:["№",g.places[0]+1," ",s[g.places[0]]]})]}),o.jsx("div",{className:"mono-tag",children:g.places.map((A,S)=>`${S+1}. ${s[A]}`).join("  ·  ")})]})]})}function lx({color:n,n:e}){const t=n.body;return o.jsxs("svg",{viewBox:"0 0 150 144",className:"bulldog-sit",children:[o.jsx("path",{d:"M75,60 C112,60 122,86 118,112 C116,128 34,128 32,112 C28,86 38,60 75,60 Z",fill:t}),o.jsx("ellipse",{cx:"34",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("ellipse",{cx:"116",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("path",{d:"M75,72 C89,72 93,96 91,118 C90,123 60,123 59,118 C57,96 61,72 75,72 Z",fill:"#fff",opacity:".88"}),o.jsx("rect",{x:"54",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("rect",{x:"83",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("ellipse",{cx:"60.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("ellipse",{cx:"89.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("circle",{cx:"75",cy:"42",r:"34",fill:t}),o.jsx("path",{d:"M43,26 C29,11 33,-4 47,-2 C58,0 63,13 61,28 C56,34 47,34 43,26 Z",fill:t}),o.jsx("path",{d:"M107,26 C121,11 117,-4 103,-2 C92,0 87,13 89,28 C94,34 103,34 107,26 Z",fill:t}),o.jsx("path",{d:"M47,23 C38,12 41,1 49,2 C56,3 58,15 56,24 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M103,23 C112,12 109,1 101,2 C94,3 92,15 94,24 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"59",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("ellipse",{cx:"91",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("circle",{cx:"61.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("circle",{cx:"93.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("path",{d:"M53,52 C53,45 97,45 97,52 C97,66 87,73 75,73 C63,73 53,66 53,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"75",cy:"53",rx:"7.4",ry:"5.2",fill:"#3a2e33"}),o.jsx("path",{d:"M75,57 v6.5",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M65,64 Q70,69.5 75,65 Q80,69.5 85,64",fill:"none",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M51,71 C60,79 90,79 99,71 L99,78 C90,85 60,85 51,78 Z",fill:"#e63946"}),o.jsx("circle",{cx:"75",cy:"83",r:"10.5",fill:"#f5c542",stroke:"#c99a1e",strokeWidth:"2"}),o.jsx("text",{x:"75",y:"88.5",textAnchor:"middle",fontSize:"14.5",fontWeight:"700",fill:"#5a4210",children:e})]})}function dx({color:n,running:e}){const t=n.body,i=n.mask;return o.jsxs("svg",{viewBox:"0 0 160 112",className:`bulldog${e?" run":""}`,children:[o.jsxs("g",{className:"bd-dust",children:[o.jsx("circle",{cx:"26",cy:"92",r:"3.4",fill:"#cfd8e3"}),o.jsx("circle",{cx:"18",cy:"86",r:"2.2",fill:"#cfd8e3"}),o.jsx("circle",{cx:"33",cy:"96",r:"1.9",fill:"#cfd8e3"})]}),o.jsxs("g",{className:"bd-speed",stroke:"#9fc3e8",strokeWidth:"2.2",strokeLinecap:"round",opacity:".5",children:[o.jsx("line",{x1:"6",y1:"46",x2:"26",y2:"46"}),o.jsx("line",{x1:"10",y1:"60",x2:"28",y2:"60"})]}),o.jsxs("g",{className:"bd-all",children:[o.jsx("path",{className:"bd-hind h2",d:"M64,74 Q60,84 63,92 Q64,96 71,96 L71,92 Q67,90 68,82 Q70,76 71,74 Z",fill:t}),o.jsx("path",{className:"bd-fore f2",d:"M101,72 Q106,82 104,90 Q105,94 112,94 L112,90 Q108,88 108,81 Q108,74 107,70 Z",fill:t}),o.jsx("path",{d:"M40,60 C36,42 54,34 74,34 C96,34 108,44 110,56 C112,70 100,81 80,82 C58,83 42,76 40,60 Z",fill:t}),o.jsx("path",{d:"M56,74 C66,80 88,80 100,72 C96,80 66,84 56,74 Z",fill:"#fff",opacity:".85"}),o.jsx("circle",{cx:"38",cy:"52",r:"4.5",fill:t,stroke:i,strokeWidth:"1"}),o.jsx("path",{className:"bd-hind h1",d:"M50,70 Q44,80 48,89 Q49,94 57,94 L57,89 Q52,88 53,80 Q56,73 58,70 Z",fill:t}),o.jsx("path",{className:"bd-fore f1",d:"M90,72 Q94,82 91,90 Q92,95 100,95 L100,90 Q96,88 97,80 Q99,74 98,71 Z",fill:t}),o.jsxs("g",{className:"bd-head",children:[o.jsx("circle",{cx:"118",cy:"44",r:"30",fill:t}),o.jsx("path",{d:"M88,32 C74,14 78,-2 92,-1 C103,0 108,14 106,30 C100,36 92,37 88,32 Z",fill:t}),o.jsx("path",{d:"M148,32 C162,14 158,-2 144,-1 C133,0 128,14 130,30 C136,36 144,37 148,32 Z",fill:t}),o.jsx("path",{d:"M92,28 C83,15 86,3 94,4 C101,5 103,17 101,27 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M144,28 C153,15 150,3 142,4 C135,5 133,17 135,27 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"105",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("ellipse",{cx:"131",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("circle",{cx:"107",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("circle",{cx:"133",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("path",{d:"M100,52 C100,45 136,45 136,52 C136,64 128,71 118,71 C108,71 100,64 100,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"118",cy:"53",rx:"6.4",ry:"4.6",fill:"#3a2e33"}),o.jsx("path",{d:"M118,56.5 v6",stroke:"#3a2e33",strokeWidth:"1.8",strokeLinecap:"round"}),o.jsx("path",{d:"M110,62 Q114,67 118,63 Q122,67 126,62",fill:"none",stroke:"#3a2e33",strokeWidth:"1.9",strokeLinecap:"round"}),o.jsx("path",{className:"bd-tongue",d:"M112,65 Q118,76 124,65 Q122,71 118,71.5 Q114,71 112,65 Z",fill:"#ff8da1"})]})]})]})}function t_(){var c;const{gameState:n,loading:e,roomId:t}=Pd(),[i,s]=ee.useState(null);if(ee.useEffect(()=>{n!=null&&n.pack_id?eu(n.pack_id).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id]),!e&&!t)return o.jsx(Ld,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",a=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"";return o.jsxs(nu,{theme:r,isProjector:!0,children:[r==="new_year"&&o.jsx(iu,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),o.jsx(ux,{gameState:n,pack:i}),o.jsx(fu,{theme:r,trigger:a}),i&&o.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((c=i.settings)==null?void 0:c.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name})]})}function Ks({theme:n}){return n==="new_year"?o.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?o.jsx("div",{className:"title-deco",children:"⚡ ✦ 🪄 ✦ ⚡"}):null}function ol({theme:n}){return n!=="classic"?null:o.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[o.jsx("span",{className:"cd-line"}),o.jsx("span",{className:"cd-chip",children:"◆"}),o.jsx("span",{className:"cd-line"})]})}function ux({gameState:n,pack:e}){var m,u,w,T;const[t,i]=ee.useState([]),[s,r]=ee.useState("");ee.useEffect(()=>{tu().then(i).catch(()=>i([]))},[]);const a=fn((n==null?void 0:n.game_id)??null),c=ee.useMemo(()=>{const y=`${location.origin}${location.pathname}#/player?room=${ti()??""}`;return n!=null&&n.pack_id?`${y}&pack=${n.pack_id}`:y},[n==null?void 0:n.pack_id]),d=((n==null?void 0:n.random_groups)??[]).filter(y=>Array.isArray(y)&&y.length>0),l=d.map(y=>y.join(",")).join("|"),[h,p]=ee.useState(!0);ee.useEffect(()=>{p(!0)},[l]);const f=d.length>0&&h;if(Rx((m=e==null?void 0:e.rounds)==null?void 0:m[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),!n)return o.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const g=((u=e==null?void 0:e.settings)==null?void 0:u.play_mode)==="paper";if(n.phase==="lobby"||!n.pack_id||!e)return o.jsxs("div",{className:`host-screen grid-bg${g?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&o.jsx(Ax,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?o.jsxs("div",{className:"cyber-lobby-head",children:[o.jsx(fl,{side:"left"}),o.jsxs("div",{className:"clh-title",children:[o.jsx(Sn,{theme:"classic",lines:["QUIZ","PARTY"]}),o.jsx(ol,{theme:"classic"})]}),o.jsx(fl,{side:"right"})]}):o.jsxs(o.Fragment,{children:[o.jsx(Sn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),o.jsx(Ks,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?o.jsxs(o.Fragment,{children:[f&&o.jsx(Ex,{groups:d,onClose:()=>p(!1)}),d.length>0&&!h&&o.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>p(!0),children:"СОСТАВЫ КОМАНД"}),o.jsxs("div",{className:"lobby-teams",children:[a.length>0&&o.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?g?null:o.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):a.map(y=>o.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":y.color,opacity:Qd(y)?1:.4},children:[y.icon&&o.jsx("span",{className:"lobby-team-icon",children:y.icon}),y.name]},y.id))]}),!g&&o.jsx("img",{alt:"QR",className:`lobby-qr-corner${f?" lobby-qr-lit":""}`,src:`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=1&data=${encodeURIComponent(c)}`}),!g&&f&&o.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Kr()},children:"⟲ Сменить пакет"}),o.jsx("button",{onClick:()=>{var y,A;return void((y=e==null?void 0:e.settings)!=null&&y.show_intro?Id():Zr(0,Jr((A=e==null?void 0:e.settings)==null?void 0:A.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):o.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[o.jsxs("select",{value:s,onChange:y=>r(y.target.value),style:{fontSize:"1.2rem"},children:[o.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(y=>o.jsxs("option",{value:y.id,children:[y.name," (",y.status==="ready"?"готов":y.status==="played"?"сыгран":y.status,")"]},y.id))]}),o.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const y=t.find(A=>A.id===s);y&&y.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Dd(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return o.jsx(q0,{onDone:()=>{var y;Zr(0,Jr((y=e==null?void 0:e.settings)==null?void 0:y.info_slides,0)??void 0)}});const x=e.rounds[n.round_number];if(!x)return o.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const v=x.questions[n.question_index];if(n.phase==="round_intro"){const y=x.settings.grid;return o.jsxs("div",{className:"host-screen grid-bg round-intro",children:[x.rules_audio&&o.jsx("audio",{autoPlay:!0,src:qe(x.rules_audio)}),x.mechanic==="crossword"&&y?o.jsxs("div",{className:"cw-layout",children:[o.jsx(su,{grid:y,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/y.cols,innerHeight*.8/y.rows))))}),o.jsxs("div",{className:"side",children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Qn(e,n.round_number)]}),o.jsx(Sn,{theme:e.theme,lines:x.title_lines}),o.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:Oo(x)}),x.rules.map((A,S)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+S*.5}s`},children:[o.jsx("span",{className:"idx",children:String(S+1).padStart(2,"0")}),A]},S))]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"round-badge",children:[o.jsx("span",{className:"rb-word",children:"РАУНД"}),o.jsx("span",{className:"rb-num",children:Qn(e,n.round_number)})]}),o.jsxs("div",{className:"ri-main",children:[o.jsx(Sn,{theme:e.theme,lines:x.title_lines}),o.jsx(Ks,{theme:e.theme}),o.jsx(ol,{theme:e.theme}),o.jsx("div",{className:"meta-line",children:Oo(x)})]}),x.rules.length>0&&o.jsxs("div",{className:"rules-frame","data-count":x.rules.length,children:[o.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),x.rules.map((A,S)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+S*.7}s`},children:[o.jsx("span",{className:"idx",children:String(S+1).padStart(2,"0")}),A]},S))]})]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Ci(0),children:x.mechanic==="jeopardy"?"Начать раунд →":x.mechanic==="race"?"К скачкам →":x.mechanic==="melody"?"К трекам →":x.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(n.phase==="question"&&x.mechanic==="sprint")return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx(wu,{pack:e,round:x,gameState:n,timerNode:o.jsx(Za,{startedAt:n.timer_started_at,seconds:x.timer_seconds,theme:e.theme})}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{className:"ghost dark",onClick:()=>void Zi(0),children:"К ответам →"})})]});if(n.phase==="question"&&x.mechanic==="blitz")return o.jsx(Lx,{pack:e,round:x,gameState:n});if(n.phase==="question"&&x.mechanic==="race")return o.jsx(cx,{pack:e,round:x,gameState:n});if(n.phase==="question"&&x.mechanic==="melody")return o.jsx(sx,{pack:e,round:x,gameState:n});if(n.phase==="question"&&x.mechanic==="jeopardy")return o.jsx(zx,{pack:e,round:x,gameState:n});if(n.phase==="question"&&v){const y=v.media.question??[],A=y.filter(I=>!/\.(mp3|mp4|webm|wav)$/i.test(I)),S=y.filter(I=>/\.(mp3|mp4|webm|wav)$/i.test(I)),C=!!v.question_text.trim()&&A.length===1&&!v.media.hidden,M=v.answer.mode==="choice"||v.answer.mode==="order"?v.answer.choices:null,N=e.theme==="new_year",U=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>x.timer_seconds-10,O=e.theme==="classic",k=!!v.question_text.trim(),B=e.theme==="potter"&&x.mechanic!=="rebus"?"pt-frame":N&&x.mechanic!=="rebus"?`q-frame${U?" low":""}`:O?"cyber-frame":"",D=!v.media.hidden&&A.length>1&&(v.answer.mode==="choice"&&v.answer.choices.length===A.length||v.answer.mode==="match"&&v.answer.left.length===A.length),q=((w=e.settings)!=null&&w.answers_reveal&&x.answers_reveal==="after_question",x.answers_reveal??"after_round");return o.jsxs("div",{className:`host-screen grid-bg${k?"":" no-qtext"}${A.length&&!v.media.hidden?" has-media":""}${M&&!D||v.answer.mode==="match"&&(v.answer.right_labels??[]).some(Boolean)?" has-choices":""}`,children:[o.jsx(Qa,{}),x.mechanic!=="jeopardy"&&o.jsxs(o.Fragment,{children:[o.jsx(Ix,{startedAt:n.timer_started_at,seconds:x.timer_seconds,q:v,round:x,pack:e,timerRunning:!!n.timer_started_at,manual:g,gameId:n.game_id,roundNumber:n.round_number}),o.jsx(Bx,{round:x,gameState:n,isLast:n.question_index+1>=x.questions.length}),o.jsx(Ox,{enabled:q==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:x.timer_seconds})]}),o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"qnum",children:["Р",Qn(e,n.round_number)," · ВОПРОС"," ",o.jsx("b",{children:n.question_index+1})," / ",x.questions.length]}),x.mechanic!=="jeopardy"&&o.jsx(Za,{startedAt:n.timer_started_at,seconds:x.timer_seconds,theme:e.theme},v.id)]}),C?o.jsxs("div",{className:"q-split",children:[o.jsxs("div",{className:B,children:[N&&o.jsx(cl,{seed:v.id,low:U}),O&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(ll,{text:v.question_text},v.id)]}),o.jsx("div",{className:"q-media-grid n1",style:Js(v),children:A.map((I,Y)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:qe(I),alt:""}),v.answer.mode==="match"&&o.jsx("figcaption",{children:Y+1})]},Y))})]}):o.jsxs(o.Fragment,{children:[k&&o.jsxs("div",{className:B,children:[N&&o.jsx(cl,{seed:v.id,low:U}),O&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(ll,{text:v.question_text},v.id)]}),!v.media.hidden&&A.length>0&&(D?o.jsx("div",{className:`img-answers n${Math.min(A.length,5)}${A.length>1?" eq-row":""}`,children:A.map((I,Y)=>{var de,he;return o.jsx(wx,{src:qe(I),badge:v.answer.mode==="match"?String(Y+1):((de=M==null?void 0:M[Y])==null?void 0:de.key)??"",children:v.answer.mode==="choice"&&((he=M==null?void 0:M[Y])==null?void 0:he.text)&&o.jsx("span",{className:"ia-text",children:M[Y].text})},Y)})}):o.jsx("div",{className:`q-media-grid n${Math.min(A.length,4)}${x.mechanic==="rebus"?" rebus":""}${A.length>1?" eq-row":""}${A.length>4?" wrap2":""}`,style:Js(v),children:A.map((I,Y)=>o.jsx(Qs,{src:qe(I)},Y))}))]}),S.map((I,Y)=>/\.(mp4|webm)$/i.test(I)?o.jsx(Dx,{src:qe(I),hidden:!!v.media.hidden,waitFor:!!v.media.voice,go:!!n.timer_started_at},Y):null),v.answer.mode==="match"&&(v.answer.right_labels??[]).some(Boolean)&&o.jsx("div",{className:`choices-grid${Ya(v.answer.right_labels??[])}`,children:v.answer.right.map((I,Y)=>{var de;return o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+Y*.3}s`},children:[o.jsx("span",{className:"key",children:I}),((de=v.answer.right_labels)==null?void 0:de[Y])??""]},I)})}),M&&!D&&o.jsx("div",{className:`choices-grid${Ya(M.map(I=>I.text))}`,children:M.map((I,Y)=>o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+Y*.35}s`},children:[o.jsx("span",{className:"key",children:I.key}),I.text]},I.key))}),(q==="after_question"||x.mechanic==="jeopardy")&&n.reveal&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",children:es(v)}),v.answer_note&&o.jsx("div",{style:{opacity:.75},children:v.answer_note}),(()=>{const I=v.media.answer??[],Y=I.filter(he=>!/\.(mp3|wav|m4a|ogg)$/i.test(he)),de=I.find(he=>/\.(mp3|wav|m4a|ogg)$/i.test(he));return o.jsxs(o.Fragment,{children:[de&&o.jsx(Md,{src:qe(de)}),Y.length>0&&o.jsx("div",{className:"q-media-grid",style:{maxHeight:"26vh"},children:Y.map((he,me)=>o.jsx("img",{src:qe(he),alt:""},me))})]})})()]}),o.jsxs("div",{className:"host-actions",children:[o.jsx(hx,{gameState:n}),(q==="after_question"||x.mechanic==="jeopardy")&&!n.reveal&&o.jsx("button",{onClick:()=>void Gs(),children:"Показать ответ"}),n.question_index+1<x.questions.length?o.jsx("button",{onClick:()=>void Ci(n.question_index+1),children:"Дальше →"}):q==="after_round"?o.jsx("button",{onClick:()=>void vl(),children:"Время ответов →"}):o.jsx(ai,{pack:e,gameState:n})]})]})}if(n.phase==="info"){const y=((T=e==null?void 0:e.settings)==null?void 0:T.info_slides)??[],A=y[n.question_index]??y[0];if(A)return o.jsx(Cx,{pack:e,slide:A,packId:n.pack_id,gameState:n})}return n.phase==="recap"?o.jsx(Tx,{pack:e,round:x,gameState:n}):n.phase==="answer_time"?o.jsx(Ux,{pack:e,round:x,gameState:n}):n.phase==="show_answers"&&v?o.jsx(Fx,{pack:e,round:x,q:v,gameState:n}):n.phase==="scoreboard"?o.jsx(Hx,{pack:e,gameState:n}):n.phase==="break"?o.jsx(Vx,{pack:e,round:x,gameState:n}):n.phase==="counting"?o.jsx(Wx,{pack:e,gameState:n}):n.phase==="finale"?o.jsx(jx,{pack:e,gameId:n.game_id,gameState:n}):o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!v&&o.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void nr("round_intro"),children:"← К титулу раунда"})})]})}function hx({gameState:n}){return n.question_index>0?o.jsx("button",{className:"ghost",onClick:()=>void Ci(n.question_index-1),children:"← Назад"}):o.jsx("button",{className:"ghost",onClick:()=>void nr("round_intro"),children:"← К титулу"})}function cl({seed:n,low:e}){const t=ee.useMemo(()=>{let i=0;for(const a of n)i=i*31+a.charCodeAt(0)>>>0;const s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=60;return Array.from({length:r},(a,c)=>({left:(c+.5)*(100/r)+(s()-.5)*2.5,len:8+s()*34,delay:s()*.5,sway:3+s()*3}))},[n]);return o.jsx("div",{className:"icicles",children:t.map((i,s)=>o.jsx("span",{className:"icicle",style:{left:`${i.left}%`,height:i.len,"--len":`${i.len}px`,animationDelay:`${i.delay}s, ${i.delay}s`,animationDuration:`${i.sway}s, .7s`}},s))})}function fx(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function Ya(n){const e=Math.max(0,...n.map(t=>(t??"").trim().length));return e<=28?"":e<=55?" c-m":e<=95?" c-l":" c-xl"}function ll({text:n}){const e=n.split(/(\s+)/);let t=0;const i=Ka([n]);return o.jsx("p",{ref:i,className:`q-text${Ni(n)}`,children:e.map((s,r)=>{if(/^\s+$/.test(s))return s;const a=.12*t++;return o.jsx("span",{className:"q-word",style:{animationDelay:`${a}s`},children:s},r)})})}function px(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const Sn=ee.forwardRef(function({theme:e,lines:t},i){const s=px(t),r=t.join(`
`),a=wl(r,e==="classic"),c=e==="classic"?a.split(`
`):t;if(e!=="new_year")return o.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,h)=>o.jsxs("span",{style:h===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[h]??l,o.jsx("br",{})]},h))});let d=0;return o.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,h)=>o.jsx("span",{style:{display:"block"},children:[...l].map((p,f)=>p===" "?o.jsx("span",{children:" "},f):o.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*d++}s`},children:p},f))},h))})});function mx(){Tl()}function gx(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n,t=e.currentTime,i=e.createGain();i.gain.value=.5,i.connect(e.destination);const s=(r,a,c,d,l)=>{const h=e.createOscillator(),p=e.createGain();h.type=d,h.frequency.setValueAtTime(r,t+a),p.gain.setValueAtTime(1e-4,t+a),p.gain.linearRampToValueAtTime(l,t+a+.008),p.gain.setValueAtTime(l,t+a+c-.05),p.gain.exponentialRampToValueAtTime(1e-4,t+a+c),h.connect(p),p.connect(i),h.start(t+a),h.stop(t+a+c+.02)};for(let r=0;r<5;r++)s(1046.5,r*.22,.11,"square",.3);s(784,1.2,1.25,"square",.26),s(392,1.2,1.25,"sine",.3),setTimeout(()=>void e.close(),3e3)}catch{}}function Za({startedAt:n,seconds:e,theme:t,chime:i=!0}){const[s,r]=ee.useState(e),a=ee.useRef(!1);ee.useEffect(()=>{if(!n){r(e),a.current=!1;return}const l=()=>{const p=(Date.now()-new Date(n).getTime())/1e3,f=Math.max(0,Math.ceil(e-p));r(f),f===0&&i&&!a.current&&(a.current=!0,gx())};l();const h=setInterval(l,250);return()=>clearInterval(h)},[n,e,i]);const c=s<=10;if(t==="new_year"){const h=2*Math.PI*44,p=Math.max(0,Math.min(1,s/e)),f=Array.from({length:40},(x,v)=>{const m=v/40*Math.PI*2,u=7+v%3*3;return{x1:55+Math.cos(m)*39,y1:55+Math.sin(m)*39,x2:55+Math.cos(m)*(44+u-5),y2:55+Math.sin(m)*(44+u-5),rot:m*180/Math.PI}}),g=Array.from({length:7},(x,v)=>{const m=v/7*Math.PI*2+.4;return{cx:55+Math.cos(m)*44,cy:55+Math.sin(m)*44}});return o.jsxs("div",{className:`ny-wreath${c?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 110 110",children:[f.map((x,v)=>o.jsx("line",{x1:x.x1,y1:x.y1,x2:x.x2,y2:x.y2,stroke:v%4===0?"#1f6b3a":"#2f8f4e",strokeWidth:"3",strokeLinecap:"round"},v)),o.jsx("circle",{className:"wr-bg",cx:"55",cy:"55",r:44}),o.jsx("circle",{className:"wr-fg",cx:"55",cy:"55",r:44,strokeDasharray:h,strokeDashoffset:h*(1-p)}),g.map((x,v)=>o.jsx("circle",{className:"wr-berry",cx:x.cx,cy:x.cy,r:"3.4"},v)),o.jsx("path",{className:"wr-bow",d:"M46,99 q9,-9 18,0 q-9,5 -18,0"})]}),o.jsx("span",{className:"val",children:s})]})}if(t==="potter")return o.jsx(Cl,{left:s,seconds:e,low:c});const d=!!n&&s>0;return o.jsxs("div",{className:`timer-wrap${c?" low":""}${d?"":" paused"}${n?"":" not-started"}`,children:[o.jsx("span",{className:"tm-orbit","aria-hidden":"true",children:o.jsx("i",{className:"tm-spark"})}),o.jsx("span",{className:`timer-num${c?" danger":""}`,children:s})]})}function xx(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?o.jsxs(o.Fragment,{children:[s,o.jsx("b",{className:"rebus-hot",children:r})]}):o.jsxs(o.Fragment,{children:[o.jsx("b",{className:"rebus-hot",children:r}),s]})}function _x(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}function Js(n){const e=n.media.scale;if(!(e==null||e===100))return{"--ms":Math.min(100,Math.max(50,e))/100}}function Qs({src:n,children:e}){const[t,i]=ee.useState(1.5);return o.jsxs("figure",{className:"q-img",style:{flexGrow:t,flexBasis:0},children:[o.jsx("img",{src:n,alt:"",onLoad:s=>{const r=s.currentTarget;r.naturalWidth&&r.naturalHeight&&i(r.naturalWidth/r.naturalHeight)}}),e]})}const vx=5e3,_d=3300,Mx=500,Sx=900,dl=100,ul=600,hl=500;function yx(n){const e=n.answer;return e.mode==="choice"?_d+Mx+Sx:e.mode==="match"?dl+ul*Math.max(0,Math.min(e.left.length,6)-1)+hl:e.mode==="order"?dl+ul*Math.max(0,e.correct_order.length-1)+hl:1200}function bx({src:n}){const e=ee.useRef(null);return ee.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),o.jsx("div",{className:"reveal-video",children:o.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function vd(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function Md({src:n}){return ee.useEffect(()=>{if(document.hidden)return;let e=!1;const t=wt();return t.src=n,t.loop=!1,t.play().then(()=>{if(e)try{t.pause(),t.src=""}catch{}}).catch(()=>{}),()=>{e=!0;try{t.pause(),t.src=""}catch{}}},[n]),null}function fl({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return o.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"cp-bar"}),o.jsx("div",{className:"cp-rows",children:e.map((t,i)=>o.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),o.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>o.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function Ex({groups:n,onClose:e}){ee.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return o.jsx("div",{className:"groups-overlay",onClick:e,children:o.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[o.jsxs("div",{className:"gm-head",children:[o.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),o.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),o.jsx("div",{className:"lg-list",children:n.map((i,s)=>o.jsxs("div",{className:"lg-team",children:[o.jsxs("div",{className:"lg-name",style:{color:Ud(s)},children:["Команда ",s+1]}),o.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function wx({src:n,badge:e,children:t}){const[i,s]=ee.useState(1.5);return o.jsxs("div",{className:"img-answer",style:{flexGrow:i,flexBasis:0},children:[o.jsxs("span",{className:"ia-frame",children:[o.jsx("span",{className:"ia-key",children:e}),o.jsx("img",{src:n,alt:"",onLoad:r=>{const a=r.currentTarget;a.naturalWidth&&a.naturalHeight&&s(a.naturalWidth/a.naturalHeight)}})]}),t]})}function Tx({pack:n,round:e,gameState:t}){const i=ee.useMemo(()=>e.questions.filter(f=>!f.hidden),[e.questions]),[s,r]=ee.useState(0),a=i[s],c=s+1>=i.length,d=()=>void vl(),l=()=>{c?d():r(f=>f+1)};if(ee.useEffect(()=>{if(!a){d();return}let f=!0;const g=()=>{f&&l()},x=setTimeout(g,vx),v=a.media.voice;if(!v)return()=>{f=!1,clearTimeout(x)};const m=wt();m.src=qe(v),m.play().catch(()=>{});const u=()=>{clearTimeout(x),g()};return m.addEventListener("ended",u),()=>{f=!1,clearTimeout(x),m.removeEventListener("ended",u);try{m.pause()}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const h=(a.media.question??[]).filter(f=>!/\.(mp3|wav|mp4|webm)$/i.test(f)),p=!!a.question_text.trim();return o.jsxs("div",{className:`host-screen grid-bg recap-screen${h.length?" has-media":""}${p?"":" no-qtext"}`,children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),o.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),o.jsxs("div",{className:"recap-body",children:[p&&o.jsx("p",{className:`q-text${Ni(a.question_text)}`,children:a.question_text}),h.length>0&&o.jsx("div",{className:`q-media-grid n${Math.min(h.length,4)}${h.length>1?" eq-row":""}${h.length>4?" wrap2":""}`,style:Js(a),children:h.map((f,g)=>o.jsx(Qs,{src:qe(f)},g))})]},a.id),o.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((f,g)=>o.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost",onClick:d,children:"Пропустить повтор"}),o.jsx("button",{onClick:l,children:c?"К ответам →":"Следующий →"})]})]})}function Ax({pack:n}){var e,t;return ee.useEffect(()=>{var c,d;const i=((c=n==null?void 0:n.settings)==null?void 0:c.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=wt();s.src=qe(i),s.loop=!0,s.volume=.45;let r=!1;const a=()=>{r||(r=!0,s.play().catch(()=>{}),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a))};return s.play().then(()=>{r=!0}).catch(()=>{window.addEventListener("pointerdown",a),window.addEventListener("keydown",a)}),()=>{window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a);try{s.pause()}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}function Rx(n,e){ee.useEffect(()=>{if(!n)return;const i=n.questions.filter(a=>!a.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const a of s){const c=qe(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const d=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");d.preload="auto",d.src=c,r.push(d)}else{const d=new Image;d.src=c,r.push(d)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[n,e])}function Cx({pack:n,slide:e,packId:t,gameState:i}){var c,d;const s=n.rounds.filter(l=>!l.off_scoreboard).map(l=>({id:l.id,name:(l.title_lines??[]).join(" ")||"—",count:l.questions.filter(h=>!h.hidden).length})),r=fn(i.game_id),a=qd(n,r.length);return o.jsxs(o.Fragment,{children:[o.jsx($d,{slide:e,rounds:s,stats:a,mediaUrl:qe}),o.jsx("div",{className:"host-actions",children:o.jsx(Px,{slides:((c=n.settings)==null?void 0:c.info_slides)??[],index:Nx(n,e),packId:t,paper:((d=n.settings)==null?void 0:d.play_mode)==="paper"})})]})}function Nx(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function Px({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return o.jsxs(o.Fragment,{children:[e>0&&o.jsx("button",{className:"ghost",onClick:()=>void Ei(e-1),children:"← Назад"}),e+1<n.length&&o.jsx("button",{className:"ghost",onClick:()=>void Ei(e+1),children:"Дальше →"}),s?i?o.jsx("button",{onClick:()=>void Xd(),children:"К подсчёту →"}):o.jsx("button",{onClick:()=>void tr(t),children:"К итогам →"}):o.jsx("button",{onClick:()=>void nr("round_intro"),children:"К раунду →"})]})}function Lx({pack:n,round:e,gameState:t}){const{state:i,setState:s}=Fd(t.game_id,t.round_number),r=fn(t.game_id),a=kn(t.game_id,t.round_number,400),c=ee.useMemo(()=>e.questions.map(u=>({id:u.id,hidden:u.hidden})),[e.questions]),d=e.settings,l=ee.useRef(!1),h=async u=>{if(!l.current){l.current=!0,s(u);try{if(await Vd(t.game_id,t.round_number,u),u.finished&&!(i!=null&&i.finished)){const w=Fo(Uo(u),d.timeoutPenalty??10),{error:T}=await kt.from("answers").upsert(w.map(y=>({team_id:y.teamId,game_id:t.game_id,question_ref:"q-blitz",round_number:t.round_number,answer_text:`место ${y.place}`,stake:y.score,updated_at:new Date().toISOString()})),{onConflict:"team_id,question_ref"});T&&console.error("блиц: итоги не записались",T)}}finally{l.current=!1}}};ee.useEffect(()=>{if(i||r.length<2)return;const u=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(T=>T.id);h(Od(w,d.teamSeconds??60))},3e3);return()=>clearTimeout(u)},[i,r.length]),ee.useEffect(()=>{if(!i||i.finished||i.current)return;const u=setTimeout(()=>{const w=Bd(c,i.used);if(!w)return void h(Co(i));Yd(w.id).catch(()=>{}),h(zd(i,w.id,Date.now()))},No);return()=>clearTimeout(u)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const p=i==null?void 0:i.current,f=p?e.questions.find(u=>u.id===p.questionId):void 0,g=i?gl(i):void 0;ee.useEffect(()=>{if(!i||!p||!f||!g)return;const u=a.find(T=>T.team_id===g&&T.question_ref===`q-${f.id}`);if(!(u!=null&&u.answer_text)||p.lastAnswer===u.answer_text)return;if(u.answer_text===kd){h(Po(ur(i,Date.now()),Date.now()));return}const w=Qr(f.answer,u.answer_text)===!0;h(Gd(i,Date.now(),w?"ok":"no",u.answer_text))},[a,p==null?void 0:p.questionId,p==null?void 0:p.lastAnswer]);const x=(p==null?void 0:p.verdict)==="no"&&p.attempts+1>=Lo;if(ee.useEffect(()=>{if(!i||!(p!=null&&p.verdict))return;const w=Math.max(0,(x?Wd:No)-(Date.now()-(p.pausedAt??Date.now()))),T=setTimeout(()=>{const y=Date.now(),A=ur(i,y),S=a.find(C=>C.team_id===g&&C.question_ref===`q-${p.questionId}`);S&&kt.from("answers").update({is_correct:p.verdict==="ok"}).eq("id",S.id).then(()=>{}),h(p.verdict==="ok"?Do(A,y):Io(A,y))},w);return()=>clearTimeout(T)},[p==null?void 0:p.verdict,p==null?void 0:p.lastAnswer]),!i)return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),o.jsx(zo,{teams:r,rolling:!0})]});if(i.finished){const u=Fo(Uo(i),d.timeoutPenalty??10);return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),o.jsxs("table",{className:"score-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),o.jsx("th",{children:"Очки"}),o.jsx("th",{children:"Баллы"})]})}),o.jsx("tbody",{children:u.map(w=>{var T;return o.jsxs("tr",{children:[o.jsxs("td",{children:[w.place,w.shared?"=":""]}),o.jsx("td",{children:((T=r.find(y=>y.id===w.teamId))==null?void 0:T.name)??"—"}),o.jsx("td",{children:w.points}),o.jsx("td",{children:w.score})]},w.teamId)})})]}),o.jsx("div",{className:"host-actions",children:o.jsx(ai,{pack:n,gameState:t})})]})}const v=i.current!=null||Object.values(i.correct).some(u=>u>0)||Object.values(i.missed).some(u=>u>0),m=!p&&i.lastReveal?(()=>{const u=e.questions.find(w=>w.id===i.lastReveal.questionId);if(u)return{questionText:u.question_text,answerText:es(u),verdict:i.lastReveal.verdict}})():void 0;return o.jsxs(o.Fragment,{children:[o.jsx(ou,{teams:r,state:i,bank:c,questionText:f==null?void 0:f.question_text,verdict:p==null?void 0:p.verdict,reveal:m,answerText:(p==null?void 0:p.verdict)==="ok"||(p==null?void 0:p.verdict)==="no"&&p.attempts+1>=Lo?es(f):void 0,dice:v?void 0:o.jsx(zo,{teams:r,rolling:!1,pickedId:i.order[0]})}),o.jsxs("div",{className:"host-actions",children:[(p==null?void 0:p.verdict)&&o.jsxs("button",{className:"ghost",onClick:()=>{const u=Date.now(),w=ur(i,u);h(p.verdict==="ok"?Io(w,u):Do(w,u))},children:["Исправить на «",p.verdict==="ok"?"неверно":"верно","»"]}),p&&p.verdict!=="ok"&&o.jsx("button",{className:"ghost",onClick:()=>void h(Po(i,Date.now())),children:"Скип −1"}),o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&h(Co(i))},children:"Завершить раунд"})]})]})}function es(n){const e="⚠ ответ не заполнен в редакторе",t=n.answer,i=t.display;return Array.isArray(i)?i.join(" · "):typeof i=="string"&&i?i:typeof t.correct=="string"&&t.correct?String(t.correct).split("/")[0].trim():typeof t.word=="string"&&t.word?t.word.toUpperCase():typeof t.correct_choice=="string"&&t.correct_choice?t.correct_choice:typeof t.correct_order=="string"&&t.correct_order?t.correct_order:Array.isArray(t.correct_pairs)&&t.correct_pairs.length?t.correct_pairs.join("  "):e}function Dx({src:n,hidden:e,waitFor:t,go:i}){const s=ee.useRef(null);return ee.useEffect(()=>{var r;t&&!i||(r=s.current)==null||r.play().catch(()=>{})},[t,i]),o.jsx("video",{ref:s,src:n,controls:!e,autoPlay:!t,style:e?{width:1,height:1,opacity:0}:{maxHeight:"46vh",borderRadius:14}})}function Ix({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:a=!1,gameId:c,roundNumber:d}){const l=(n.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),h=ee.useRef(null),p=ee.useRef(null),f=ee.useRef(!1);return ee.useEffect(()=>{if(mx(),a&&!l||t)return;let g=!1;const x=(n.media.question??[]).find(u=>/\.(mp3|wav|m4a|ogg)$/i.test(u));f.current=!1;const v=()=>{if(!g){if(f.current=!0,x){const u=wt();u.src=qe(x),p.current=u,u.play().catch(()=>{})}ks(c&&d!=null?{gameId:c,roundNumber:d,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){v();return}const m=wt();return m.src=qe(n.media.voice),h.current=m,m.onended=v,m.onerror=v,m.play().then(()=>{if(g)try{m.pause(),m.src=""}catch{}}).catch(v),()=>{var w;g=!0;const u=h.current;if(u){u.onended=null,u.onerror=null;try{u.pause(),u.src=""}catch{}}h.current=null,(w=p.current)==null||w.pause()}},[n.id,a]),ee.useEffect(()=>{if(!a||!t||l)return;let g=!1;const x=(n.media.question??[]).find(m=>/\.(mp3|wav|m4a|ogg)$/i.test(m)),v=()=>{if(g||!x)return;const m=wt();m.src=qe(x),p.current=m,m.play().catch(()=>{})};if(n.media.voice){const m=wt();m.src=qe(n.media.voice),h.current=m,m.onended=v,m.onerror=v,m.play().then(()=>{if(g)try{m.pause(),m.src=""}catch{}}).catch(v)}else v();return()=>{var u;g=!0;const m=h.current;if(m){m.onended=null,m.onerror=null;try{m.pause(),m.src=""}catch{}}h.current=null,(u=p.current)==null||u.pause()}},[n.id,a,t]),ee.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const x=h.current;x&&!x.paused&&!x.ended||ks(c&&d!=null?{gameId:c,roundNumber:d,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(g)},[n.id,t,a]),ee.useEffect(()=>{var T;const g=e.settings.bg_music??((T=i==null?void 0:i.settings)==null?void 0:T.bg_music);if(!t||!g||l)return;const x=wt();x.src=qe(g),x.loop=!0,x.volume=.6,x.play().catch(()=>{});let v;const m=(r??e.timer_seconds??60)*1e3,u=s?m-(Date.now()-new Date(s).getTime()):m,w=window.setTimeout(()=>{v=window.setInterval(()=>{x.volume=Math.max(0,x.volume-.1),x.volume<=.01&&(v&&clearInterval(v),x.pause())},80)},Math.max(0,u)+3e3);return()=>{clearTimeout(w),v&&clearInterval(v),x.pause()}},[t,n.id]),null}function Ux({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=fn(t.game_id),a=kn(t.game_id,t.round_number),c=e.questions.filter(l=>!l.hidden).length;return ee.useEffect(()=>{var p;const l=e.settings.bg_music??((p=n.settings)==null?void 0:p.bg_music);if(!l)return;const h=wt();return h.src=qe(l),h.loop=!0,h.volume=.6,h.play().catch(()=>{}),()=>h.pause()},[e.id]),o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Qn(n,t.round_number)," :: ВРЕМЯ ОТВЕТОВ"]}),o.jsx("div",{className:"answer-pulse",children:o.jsx(Sn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),o.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),o.jsx(Za,{startedAt:t.timer_started_at,seconds:i,theme:n.theme}),!s&&o.jsx("div",{className:"answer-time-teams",children:r.map(l=>{const h=a.filter(f=>{var g;return f.team_id===l.id&&((g=f.answer_text)==null?void 0:g.trim())}).length,p=h>=c;return o.jsxs("div",{className:`at-team${p?" done":""}`,children:[o.jsx("span",{style:{color:l.color},children:l.name})," · ",h,"/",c]},l.id)})}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>void Ci(e.questions.length-1),children:"← Назад"}),o.jsx("button",{onClick:()=>void Zi(0),children:"К ответам →"})]})]})}function Fx({pack:n,round:e,q:t,gameState:i}){var S;const s=((S=n.settings)==null?void 0:S.play_mode)==="paper",r=kn(i.game_id,i.round_number),a=i.reveal,c=fn(i.game_id),[d,l]=ee.useState([]);ee.useEffect(()=>{kt.from("teams").select("id,name,color").then(({data:C})=>l(C??[]))},[]);const h=r.filter(C=>C.question_ref===`q-${t.id}`),p=e.questions.length,f=i.question_index;ee.useEffect(()=>{if(a||document.hidden)return;const C=setTimeout(()=>{Gs()},3e3);return()=>clearTimeout(C)},[a,f]);const[g,x]=ee.useState(!1);ee.useEffect(()=>{if(x(!1),!a)return;const C=setTimeout(()=>x(!0),yx(t)+600);return()=>clearTimeout(C)},[a,t.id]),ee.useEffect(()=>{!g||document.hidden||h.forEach(C=>{if(C.is_correct!=null)return;const M=Qr(t.answer,C.answer_text);M!==null&&kt.from("answers").update({is_correct:M}).eq("id",C.id).then(()=>{})})},[g,f,h.length,h.map(C=>C.answer_text).join("|")]);const v=t.answer.mode==="choice"?t.answer.choices:null,m=(t.media.question??[]).filter(C=>!/\.(mp3|mp4|webm|wav)$/i.test(C)),u=(t.media.answer??[]).filter(C=>!/\.(mp3|mp4|webm|wav)$/i.test(C)),w=(t.media.question??[]).filter(C=>!/\.(mp3|mp4|webm|wav)$/i.test(C)),T=u.length?u:w,y=t.media.hidden?(t.media.question??[]).find(C=>/\.(mp4|webm)$/i.test(C)):void 0,A=(t.media.answer??[]).find(C=>/\.(mp3|wav|m4a|ogg)$/i.test(C));return o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"mono-tag",children:["РАУНД ",Qn(n,i.round_number)," :: ОТВЕТЫ"]}),o.jsxs("span",{className:"qnum",children:["ВОПРОС ",o.jsx("b",{children:f+1})," / ",p]})]}),o.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[o.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&o.jsxs(o.Fragment,{children:[o.jsx("p",{className:`q-text${Ni(t.question_text)}`,children:t.question_text}),w.length>0&&!t.media.hidden&&o.jsx("div",{className:`q-media-grid n${Math.min(w.length,4)}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,style:Js(t),children:w.map((C,M)=>o.jsx(Qs,{src:qe(C)},M))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&o.jsx("p",{className:`q-recall${Ni(t.question_text)}`,children:t.question_text}),a&&o.jsxs("div",{className:"answer-block reveal-in",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),y&&o.jsx(bx,{src:qe(y)}),A&&o.jsx(Md,{src:qe(A)}),e.mechanic==="rebus"?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:es(t)}),o.jsx("div",{className:"rebus-answer",children:w.slice(0,2).map((C,M)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:qe(C),alt:""}),o.jsx("figcaption",{children:xx(M===0?t.service.word1:t.service.word2,M===0)})]},M))})]}):t.answer.mode==="match"?o.jsx(Gx,{q:t}):v&&m.length===v.length?o.jsx(pl,{q:t,choices:v,imgs:m}):v?o.jsx(pl,{q:t,choices:v}):t.answer.mode==="order"?o.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((C,M)=>{const N=t.answer.choices.find(U=>U.key===C);return o.jsxs("div",{className:"oi",children:[o.jsx("b",{children:C}),o.jsx("span",{className:"oi-pos",children:M+1}),o.jsx("span",{className:"oi-text",children:(N==null?void 0:N.text)??""})]},M)})}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:es(t)}),T.length>0&&o.jsx("div",{className:`q-media-grid answer-media n${Math.min(T.length,4)}${T.length>1?" eq-row":""}${T.length>4?" wrap2":""}`,children:T.map((C,M)=>o.jsx(Qs,{src:qe(C)},M))})]}),g&&t.answer_note&&o.jsx("div",{className:`answer-note${fx(t.answer_note)}`,children:t.answer_note})]})]}),!s&&o.jsxs("div",{className:"team-answers",children:[o.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${h.length}`}),h.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),h.map(C=>{const M=c.find(U=>U.id===C.team_id)??d.find(U=>U.id===C.team_id),N=g?C.is_correct??Qr(t.answer,C.answer_text):null;return o.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${N===!0?"var(--ok)":N===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsx("span",{className:"name",style:{color:M==null?void 0:M.color},children:(M==null?void 0:M.name)??"—"}),o.jsxs("span",{className:"text",children:[a?C.answer_text||"—":"• • •",C.stake!=null&&C.stake!==0&&o.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",C.stake]})]}),N!=null&&o.jsx("span",{className:"mark",style:{color:N?"var(--ok)":"var(--danger)"},children:N?"✓":"✗"})]},C.id)})]})]}),o.jsxs("div",{className:"host-actions",children:[f>0&&o.jsx("button",{className:"ghost",onClick:()=>void Zi(f-1,!0),children:"← Назад"}),a?f<p-1?o.jsx("button",{onClick:()=>void Zi(f+1),children:"Следующий вопрос →"}):o.jsx(ai,{pack:n,gameState:i}):o.jsx("button",{onClick:()=>void Gs(),children:"Показать ответ →"})]})]})}function pl({q:n,choices:e,imgs:t}){const[i,s]=ee.useState(0);ee.useEffect(()=>{s(0);const h=setTimeout(()=>s(1),2200),p=setTimeout(()=>s(2),_d);return()=>{clearTimeout(h),clearTimeout(p)}},[n.id]);const r=n.answer.correct_choice??"",a=e.filter(h=>h.key!==r),c=new Set(_x(a.map(h=>h.key),n.id).slice(0,2)),d=h=>i>=1||c.has(h)?i<2?"":h===r?" correct":" dimmed":" hidden-yet",l=h=>c.has(h)?0:.25*e.filter(p=>!c.has(p.key)).findIndex(p=>p.key===h);return t?o.jsx("div",{className:"choice-imgs",children:e.map((h,p)=>o.jsxs("div",{className:`choice-img${d(h.key)}`,style:{animationDelay:`${l(h.key)}s`},children:[o.jsx("img",{src:qe(t[p]),alt:""}),o.jsxs("span",{className:"key",children:[h.key,h.text?` — ${h.text}`:""]})]},h.key))}):o.jsx("div",{className:`choices-grid${Ya(e.map(h=>h.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(h=>o.jsxs("div",{className:`choice-plate${d(h.key)}`,style:{animationDelay:`${l(h.key)}s`},children:[o.jsx("span",{className:"key",children:h.key}),h.text]},h.key))})}function Ox({enabled:n,startedAt:e,seconds:t}){return ee.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Gs()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function Bx({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return ee.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,a=Math.max(500,r-Date.now()),c=setTimeout(()=>{Ci(e.question_index+1)},a);return()=>clearTimeout(c)},[e.timer_started_at,e.question_index,i]),null}function zx({pack:n,round:e,gameState:t}){const i=e.settings.themes??[],[s,r]=ee.useState(null),a=(t.jeopardy_opened??[]).filter(m=>typeof m=="string"),[c,d]=ee.useState([]),[l,h]=ee.useState(null),p=[...new Set([...a,...c])],f=async m=>{d(m);const{error:u}=await kt.from("game_sessions").update({jeopardy_opened:m}).eq("id",ti());h(u?"Плитки не сохраняются: "+u.message+". Выполни миграцию 0006_jeopardy_opened.sql.":null),await kt.from("game_sessions").update({timer_started_at:null,reveal:!1}).eq("id",ti())},g=e.title_lines.join(" ")||"СВОЯ ИГРА",x=wl(g,n.theme==="classic");if(i.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"СВОЯ ИГРА"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void nr("round_intro"),children:"← К титулу"})})]});const v=Math.max(...i.map(m=>m.tiles.length));return o.jsxs("div",{className:"host-screen grid-bg jp-screen",children:[o.jsx("h1",{className:"neon-title jp-title",children:n.theme==="classic"?x:g}),o.jsxs("div",{className:"jp-board",style:{gridTemplateColumns:`repeat(${i.length}, minmax(0, 1fr))`,gridTemplateRows:`auto repeat(${v}, minmax(0, 1fr))`},children:[l&&o.jsxs("div",{className:"jp-save-err",children:["⚠ ",l]}),i.map((m,u)=>o.jsxs("div",{className:"jp-theme-name",style:{gridColumn:u+1,gridRow:1},children:[m.name||`Тема ${u+1}`,m.hint&&o.jsx("span",{className:"jp-theme-hint",children:m.hint})]},`h${u}`)),i.map((m,u)=>m.tiles.map((w,T)=>{const y=p.includes(`${u}-${T}`);return o.jsx("button",{className:`jp-tile${y?" done":""}`,disabled:y,"data-c":u%8,style:{gridColumn:u+1,gridRow:T+2},onClick:()=>{const A=i.slice(0,u).reduce((S,C)=>S+C.tiles.length,0)+T;Ci(A).then(()=>ks({gameId:t.game_id,roundNumber:t.round_number,questionRef:Hd(t.round_number,A)})),r({t:u,i:T})},children:y?"·":w.value},`${u}-${T}`)}))]}),o.jsx("div",{className:"host-actions",children:o.jsx(ai,{pack:n,gameState:t})}),s&&o.jsx(kx,{packTheme:n.theme,round:e,gameState:t,theme:i[s.t],tile:i[s.t].tiles[s.i],tileIndex:i.slice(0,s.t).reduce((m,u)=>m+u.tiles.length,0)+s.i,onClose:()=>{f([...p,`${s.t}-${s.i}`]),r(null)}})]})}function kx({round:n,gameState:e,theme:t,tile:i,tileIndex:s,onClose:r,packTheme:a}){const c=n.settings.clipSeconds??30,d=ee.useRef(null),[l,h]=ee.useState(c),[p,f]=ee.useState(!1),[g,x]=ee.useState(!1),v=kn(e.game_id,e.round_number),m=fn(e.game_id),[u,w]=ee.useState(null),T=()=>{var S;if((S=d.current)==null||S.stop(),!i.audio){f(!1),w("у плитки не задан трек");return}w(null),h(c),d.current=Eu(qe(i.audio),c,{onStart:()=>f(!0),onTick:C=>h(C),onEnd:()=>f(!1),onError:C=>{f(!1),w(C)}})};ee.useEffect(()=>(T(),()=>{var S;(S=d.current)==null||S.stop()}),[s]);const y=v.filter(S=>jd(S.question_ref,e.round_number)===s).sort((S,C)=>+new Date(S.updated_at)-+new Date(C.updated_at)),A=async(S,C)=>{await kt.from("answers").update({is_correct:C}).eq("id",S)};return ml.createPortal(o.jsx("div",{className:`jp-overlay theme-${a??"classic"}`,children:o.jsxs("div",{className:"jp-modal hud-frame",children:[o.jsxs("div",{className:"jp-modal-head",children:[o.jsxs("div",{children:[o.jsx("div",{className:"jp-modal-theme",children:t.name}),o.jsxs("div",{className:"mono-tag",children:["ПЛИТКА · ",i.value]})]}),o.jsx("div",{className:`jp-count${p?" on":""}`,children:String(l).padStart(2,"0")})]}),g&&o.jsxs("div",{className:"answer-reveal hud-frame",style:{padding:"12px 18px"},children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",style:{fontSize:"clamp(24px,3vw,40px)"},children:i.correct})]}),o.jsxs("div",{className:"jp-answers",children:[o.jsx("div",{className:"mono-tag",children:g?"ОТВЕТЫ (ПО СКОРОСТИ)":`ОТВЕТИЛИ: ${y.length}`}),y.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"ждём ответы…"}),y.map((S,C)=>{const M=m.find(N=>N.id===S.team_id);return o.jsxs("div",{className:"jp-answer",style:{borderLeft:`3px solid ${S.is_correct===!0?"var(--ok)":S.is_correct===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsxs("span",{className:"pos",children:["#",C+1]}),o.jsx("span",{className:"name",style:{color:M==null?void 0:M.color},children:(M==null?void 0:M.name)??"—"}),o.jsx("span",{className:"txt",children:g?S.answer_text||"—":"• • •"}),g&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:`jp-grade ok${S.is_correct===!0?" chosen":""}`,onClick:()=>void A(S.id,!0),children:"✓"}),o.jsx("button",{className:`jp-grade no${S.is_correct===!1?" chosen":""}`,onClick:()=>void A(S.id,!1),children:"✗"})]})]},S.id)})]}),o.jsxs("div",{className:"jp-modal-foot",children:[!g&&o.jsx("button",{onClick:()=>x(!0),children:"Показать ответ"}),o.jsx("button",{className:"ghost",onClick:T,children:"↻ Переслушать"}),u&&o.jsxs("div",{className:"jp-audio-err",children:["🔇 ",u,o.jsx("button",{className:"ghost",style:{marginLeft:10},onClick:()=>void bu(qe(i.audio)).then(S=>alert(S)),children:"что с файлом?"})]}),y.some(S=>S.is_correct==null)&&o.jsxs("div",{className:"jp-ungraded",children:["⚠ не оценено: ",y.filter(S=>S.is_correct==null).length]}),o.jsx("button",{className:"ghost dark",onClick:r,children:"Закрыть плитку"})]})]})}),document.body)}function Gx({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return o.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var d;const a=((d=i.find(l=>l.startsWith(s)))==null?void 0:d.slice(s.length))??"—",c=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return o.jsxs("div",{className:"mi",children:[t[r]&&o.jsx("img",{src:qe(t[r]),alt:""}),o.jsxs("div",{className:"mi-label",children:[o.jsxs("b",{children:[s," → ",a]}),c&&c!==a&&o.jsx("span",{className:"mi-text",children:c})]})]},s)})})}function Hx({pack:n,gameState:e}){const t=fn(e.game_id),i=kn(e.game_id),s=Sl(n,t,i),r=yl(n,t,i),a=n.rounds.filter(g=>!g.off_scoreboard),c=bl(t,s,i,r),d=c.map(g=>g.team),[l,h]=ee.useState(0);ee.useEffect(()=>{if(h(0),d.length===0)return;const g=setInterval(()=>h(x=>x>=d.length?x:x+1),2200);return()=>clearInterval(g)},[d.length,e.round_number]);const p=ee.useRef(null),f=Ka([d.length,a.length],{shrinkBefore:p});return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),o.jsx("h2",{className:"sb-title",ref:p,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),o.jsx("div",{className:"sb-table-wrap",children:o.jsxs("table",{ref:f,className:`score-table${vd(d.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),a.map((g,x)=>o.jsxs("th",{children:["Р",x+1]},g.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:d.map((g,x)=>{const v=c.find(w=>w.team.id===g.id),m=(v==null?void 0:v.place)??1,u=x>=d.length-l;return o.jsxs("tr",{className:`sb-row${u?" is-in":" is-veiled"}${m===1?" leader":""}`,children:[o.jsxs("td",{children:[m<=3?o.jsx("span",{className:"sb-medal",children:o.jsx(ea,{theme:n.theme,place:m})}):m,(v==null?void 0:v.shared)&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:g.color,fontFamily:"var(--font-display)"},children:o.jsx("span",{className:"sb-name",children:g.name})}),a.map(w=>{const T=r.get(g.id)??[];return o.jsx("td",{children:T[n.rounds.indexOf(w)]??0},w.id)}),o.jsx("td",{className:"total",children:s.get(g.id)??0})]},g.id)})})]})}),o.jsx("div",{className:"host-actions",children:o.jsx(ai,{pack:n,gameState:e})})]})}function Vx({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=ee.useState(i*60);ee.useEffect(()=>{const d=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),l=()=>r(Math.max(0,Math.round(i*60-(Date.now()-d)/1e3)));l();const h=setInterval(l,500);return()=>clearInterval(h)},[t.timer_started_at,i]);const a=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),o.jsx(Sn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),o.jsx(Ks,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[a,":",c]}),o.jsx("div",{className:"host-actions",children:o.jsx(ai,{pack:n,gameState:t})})]})}function Wx({pack:n,gameState:e}){var c,d;const[i,s]=ee.useState(300);ee.useEffect(()=>{const l=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),h=()=>s(Math.max(0,Math.round(5*60-(Date.now()-l)/1e3)));h();const p=setInterval(h,500);return()=>clearInterval(p)},[e.timer_started_at]),ee.useEffect(()=>{var p,f;const l=((p=n.settings)==null?void 0:p.finale_music)??((f=n.settings)==null?void 0:f.bg_music);if(!l||document.hidden)return;const h=wt();return h.src=qe(l),h.loop=!0,h.volume=.55,h.play().catch(()=>{}),()=>{try{h.pause(),h.src=""}catch{}}},[(c=n.settings)==null?void 0:c.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=String(Math.floor(i/60)).padStart(2,"0"),a=String(i%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),o.jsx(Sn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),o.jsx(Ks,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[r,":",a]}),o.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void tr(e.pack_id,!0),children:"К итогам →"})})]})}function jx({pack:n,gameId:e,gameState:t}){var M,N,U,O,k,Q;const i=fn(e),s=kn(e),r=Sl(n,i,s),a=yl(n,i,s),c=bl(i,r,s,a),d=!!t.reveal,l=t.question_index??0,[h,p]=ee.useState(!((M=n.settings)!=null&&M.show_final_cinematic));ee.useEffect(()=>{var q,I;const B=((q=n.settings)==null?void 0:q.finale_music)??((I=n.settings)==null?void 0:I.bg_music);if(!B||document.hidden||!h)return;const D=wt();return D.src=qe(B),D.loop=!0,D.volume=.55,D.play().catch(()=>{}),()=>{try{D.pause(),D.src=""}catch{}}},[(N=n.settings)==null?void 0:N.finale_music,(U=n.settings)==null?void 0:U.bg_music,h]);const f=ee.useRef(null),g=Ka([c.length],{shrinkBefore:f}),v=n.rounds.map((B,D)=>({r:B,i:D})).filter(B=>!B.r.off_scoreboard).map(({r:B,i:D})=>{var Y;let q=null,I=-1/0;for(const de of i){const he=((Y=a.get(de.id))==null?void 0:Y[D])??0;he>I&&(I=he,q=de)}return{round:B,idx:D,team:q,score:I}}),m=3e3,u=1e4,w=v.length;ee.useEffect(()=>{if(d||l>w||!h)return;const D=setTimeout(()=>void Ei(l+1),l===w?u:m);return()=>clearTimeout(D)},[d,l,w,h]);const[T,y]=ee.useState(0);if(ee.useEffect(()=>{if(y(0),c.length===0)return;let B=!1,D=0,q;const I=()=>{B||(D+=1,y(D),!(D>=c.length)&&(q=setTimeout(I,Math.max(320,900-90*D))))};return q=setTimeout(I,Math.max(320,900-90*D)),()=>{B=!0,clearTimeout(q)}},[c.length,l,d]),!h)return o.jsx(Q0,{onDone:()=>p(!0)});const A=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],S=o.jsx(o.Fragment,{children:Array.from({length:5},(B,D)=>o.jsxs("div",{className:"fw-burst",style:{left:`${12+D*19}%`,top:`${18+D%3*14}%`},children:[o.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${A[D%A.length]}55, transparent 70%)`,"--dur":`${2.2+D*.3}s`,"--delay":`${D*.45}s`}}),Array.from({length:10},(q,I)=>o.jsx("span",{className:"fw-spark",style:{background:A[(D+I)%A.length],"--a":`${I*36}deg`,"--dur":`${2.2+D*.3}s`,"--delay":`${D*.45}s`}},I))]},D))}),C=o.jsxs("div",{className:"fin-breakdown",children:[o.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),o.jsx("div",{className:"fin-table-wrap",children:o.jsxs("table",{ref:g,className:`fin-table${vd(c.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),n.rounds.map((B,D)=>!B.off_scoreboard&&o.jsxs("th",{children:["Р",Qn(n,D)]},B.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:c.map(({team:B,place:D,shared:q},I)=>{const Y=I>=c.length-T;return o.jsxs("tr",{className:`fin-row${D<=3?" top3":""}${D===1?" fin-first":""}${Y?" is-in":" is-veiled"}`,children:[o.jsxs("td",{className:"fin-pos",children:[D,q&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:B.color},children:o.jsx("span",{className:"sb-name",children:B.name})}),n.rounds.map((de,he)=>{var me;return!de.off_scoreboard&&o.jsx("td",{children:((me=a.get(B.id))==null?void 0:me[he])??0},de.id)}),o.jsx("td",{children:o.jsx("b",{children:r.get(B.id)??0})})]},B.id)})})]})})]});if(d){const B=[...new Set(c.map(I=>I.place))].filter(I=>I<=3).sort((I,Y)=>Y-I);if(l>=B.length)return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[S,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(Sn,{ref:f,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),C,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Kr()},children:"⟲ Новая игра"})})]});const D=B[l],q=c.filter(I=>I.place===D);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void Ei(l+1),children:[D===1&&S,o.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),o.jsxs("div",{className:`fin-award p${D}`,children:[o.jsxs("div",{className:"fin-award-place",children:[D," МЕСТО"]}),o.jsx("div",{className:"fin-award-medal",children:o.jsx(ea,{theme:n.theme,place:D})}),q.length>0?q.map(I=>o.jsx("div",{className:"fin-award-name",style:{color:I.team.color},children:I.team.name},I.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(l<w){const B=v[l];return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void Ei(l+1),children:[o.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),o.jsxs("div",{className:"fin-slide",children:[o.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Qn(n,B.idx)," · ",B.round.title_lines.join(" ")]}),o.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),o.jsx("div",{className:"fin-slide-team",style:{color:(O=B.team)==null?void 0:O.color},children:((k=B.team)==null?void 0:k.name)??"—"})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"3s"}})},l),o.jsx("div",{className:"fin-dots",children:v.map((D,q)=>o.jsx("span",{className:q===l?"on":""},q))})]})}if(l===w){const B=c.filter(D=>D.place===1);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void Ei(l+1),children:[S,o.jsx("div",{className:"mono-tag",children:B.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),o.jsxs("div",{className:"fin-award p1",children:[o.jsx("div",{className:"fin-award-medal",children:o.jsx(ea,{theme:n.theme,place:1})}),B.length>0?B.map(D=>o.jsx("div",{className:"fin-award-name",style:{color:D.team.color},children:D.team.name},D.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"}),o.jsx("div",{className:"fin-award-score",children:((Q=B[0])==null?void 0:Q.total)??0})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[S,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(Sn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),C,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Kr()},children:"⟲ Новая игра"})})]})}export{t_ as HostScreen,Ya as choicesLenClass,fx as noteClass,mx as stopAllMedia};
