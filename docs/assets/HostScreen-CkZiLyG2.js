import{j as o,s as Ut}from"./index-CBcYwZlS.js";import{r as J,a as $l}from"./vendor-Y8-lBF4Z.js";import{c as Yl,r as ad,l as od,s as Zl,a as Kl,f as Ys,b as ld,g as kr,d as Is,e as Vi,h as Zn,u as cd,R as dd,i as ud,j as Gr,k as hd,m as yi,n as Us,o as Jl,p as Zs,t as fd,q as pd,v as md,w as gd,x as fo,y as _d,N as po,S as xd,z as mo,A as ir,B as vd,M as go,C as _o,D as xo,E as vo,F as Md,G as xi,H as Sd,I as yd,J as Ed,K as bd}from"./teamColors-CNHyIEZ9.js";import{m as Xe,l as Ei,u as za,p as Td,I as wd}from"./duration-CHB1KAbN.js";import{m as Ad}from"./answerCheck-CAedmUO5.js";import{a as Ql,s as Rd,b as Vr,u as hn,c as Bn,o as Cd,d as Nd,i as Pd,e as Hr,f as Mo,g as ec,h as tc,r as nc}from"./raceActions-DURHQsAX.js";import{l as Dd,a as Ld,d as Yn,m as So}from"./packLoader-C5268v9r.js";import{T as Id,S as Ud}from"./ThemeLayer-DsYCJwkl.js";import{C as Fd}from"./CrosswordView-B-ls3iE8.js";function Od(n){return n<=1?{top:!1,cols:1}:n===2?{top:!1,cols:2}:n===3?{top:!0,cols:2}:n===4?{top:!1,cols:2}:n===5?{top:!0,cols:2}:{top:n%2===1,cols:n<=6?3:4}}const Bd=n=>String(Math.max(0,Math.ceil(n/1e3)));function yo({team:n,state:e,active:t,now:i}){const s=od(e,n.id,i),r=(e.correct[n.id]??0)-(e.missed[n.id]??0),a=s<=1e4;return o.jsxs("div",{className:`bz-block${t?" on":""}${a&&t?" low":""}`,style:{"--tc":n.color},children:[t&&o.jsx("span",{className:"bz-turn",children:"ХОД"}),o.jsx("div",{className:"bz-name",children:n.name}),o.jsx("div",{className:`bz-timer${a?" low":""}`,children:Bd(s)}),o.jsxs("div",{className:"bz-meta",children:[o.jsx("span",{className:"bz-pts",children:r>0?`+${r}`:r}),o.jsxs("span",{className:"bz-qn",children:["вопрос ",(e.correct[n.id]??0)+(e.missed[n.id]??0)+(t?1:0)]})]})]})}function zd({teams:n,state:e,bank:t,questionText:i,verdict:s,answerText:r,dice:a,reveal:l}){const[d,c]=J.useState(()=>Date.now());J.useEffect(()=>{const w=setInterval(()=>c(Date.now()),250);return()=>clearInterval(w)},[]);const f=e.order.map(w=>n.find(C=>C.id===w)).filter(w=>!!w),m=Yl(e),{top:h,cols:g}=Od(f.length),_=f.find(w=>w.id===m),M=h?f.slice(0,1):f.slice(0,Math.ceil(f.length/2)),p=h?f.slice(1):f.slice(Math.ceil(f.length/2)),u=h?g:Math.max(1,M.length);return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"БЛИЦ"}),o.jsx("span",{className:"bz-bank",children:ad(t,e.used)})]}),o.jsx("div",{className:`bz-row${h?" bz-row-top":""}`,style:{"--cols":h?1:u},children:M.map(w=>o.jsx(yo,{team:w,state:e,active:w.id===m,now:d},w.id))}),o.jsx("div",{className:`bz-question${s?` v-${s}`:""}`,style:{"--tc":_==null?void 0:_.color},children:a??(i?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"bz-asking",children:["отвечают: ",o.jsx("b",{children:(_==null?void 0:_.name)??"—"})]}),o.jsx("div",{className:"bz-qtext",children:i}),s&&o.jsxs("div",{className:`bz-verdict ${s}`,children:[s==="ok"?"ВЕРНО":"НЕВЕРНО",r&&o.jsxs("span",{className:"bz-right",children:[" · ",r]})]})]}):l?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"bz-asking",children:l.verdict==="ok"?"ответили верно!":l.verdict==="skip"?"вопрос пропущен":"не угадали"}),o.jsx("div",{className:"bz-qtext",children:l.questionText}),o.jsxs("div",{className:`bz-verdict ${l.verdict==="ok"?"ok":"no"}`,children:["Правильный ответ: ",l.answerText]})]}):o.jsx("div",{className:"bz-asking",children:"следующий вопрос…"}))}),o.jsx("div",{className:"bz-row",style:{"--cols":Math.max(1,p.length)},children:p.map(w=>o.jsx(yo,{team:w,state:e,active:w.id===m,now:d},w.id))})]})}function Eo({teams:n,pickedId:e,rolling:t}){const[i,s]=J.useState(0);J.useEffect(()=>{if(!t)return;const a=setInterval(()=>s(l=>(l+1)%Math.max(1,n.length)),110);return()=>clearInterval(a)},[t,n.length]);const r=t?n[i]:n.find(a=>a.id===e)??n[0];return o.jsxs("div",{className:"bz-dice-wrap",children:[o.jsx("div",{className:`bz-dice${t?" rolling":" done"}`,style:{"--tc":r==null?void 0:r.color},children:(r==null?void 0:r.name)??"—"}),o.jsx("div",{className:"bz-dice-cap",children:t?"кто начинает…":"начинает"})]})}const ic="qp-fx-enabled",kd=4e3,Gd={classic:470,potter:700};function Vd(){try{const n=localStorage.getItem(ic);return n===null?!0:n==="1"}catch{return!0}}function Hd(n){try{localStorage.setItem(ic,n?"1":"0")}catch{}}function Wd(){return typeof location<"u"&&location.href.includes("nofx=1")}function jd({theme:n,trigger:e}){const[t,i]=J.useState(Vd),s=J.useRef(null),r=J.useRef(0),[a,l]=J.useState(null);J.useEffect(()=>{const c=s.current===null;if(s.current=e,c||!t||n==="new_year"||typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||Wd())return;const f=Date.now();f-r.current<kd||(r.current=f,l(f))},[e]),J.useEffect(()=>{if(a===null)return;const c=(Gd[n]??300)+50,f=setTimeout(()=>l(null),c);return()=>clearTimeout(f)},[a,n]);const d=n==="classic"||n==="potter";return o.jsxs(o.Fragment,{children:[d&&o.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":t,title:t?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>i(c=>{const f=!c;return Hd(f),f}),children:"✨"}),a!==null&&n==="classic"&&o.jsx(Xd,{},a),a!==null&&n==="potter"&&o.jsx(qd,{},a)]})}function Xd(){return o.jsx("div",{className:"fx-flash fx-cyber","aria-hidden":"true"})}function qd(){const n=Array.from({length:22},(e,t)=>t);return o.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>o.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const bo=["🥇","🥈","🥉"];function Wr({theme:n,place:e}){return n==="classic"?o.jsx($d,{place:e}):n==="potter"?o.jsx(Zd,{place:e}):n==="new_year"?o.jsx(Yd,{place:e}):o.jsx("span",{className:"award-emoji",children:bo[e-1]??bo[2]})}function $d({place:n}){return o.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ah-orbit"}),o.jsx("span",{className:"ah-face",children:o.jsx("b",{children:n})})]})}function Yd({place:n}){return o.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ab-cap"}),o.jsxs("span",{className:"ab-ball",children:[o.jsx("span",{className:"ab-shine"}),o.jsx("b",{children:n})]})]})}function Zd({place:n}){return o.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"am-ribbon"}),o.jsxs("span",{className:"am-disc",children:[o.jsx("span",{className:"am-shine"}),o.jsx("b",{children:n})]})]})}function ei({pack:n,gameState:e}){const t=Ql(n,e.round_number,e.phase),i=t.label.replace(" →","").toLowerCase(),s=()=>{var r,a,l;if(t.kind==="scoreboard")return void Zl();if(t.kind==="break")return void Kl();if(t.kind==="finale"){const d=Rd((r=n.settings)==null?void 0:r.info_slides);return d==null?void Ys(e.pack_id,((a=n.settings)==null?void 0:a.play_mode)==="paper"):void ld(d)}return void kr(e.round_number+1,Vr((l=n.settings)==null?void 0:l.info_slides,e.round_number+1)??void 0)};return o.jsxs("button",{onClick:s,children:[i.charAt(0).toUpperCase()+i.slice(1)," →"]})}const To="01#$%&/\\<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";function Kd(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function wo(n,e,t=1){const i=Math.max(0,Math.min(1,e));if(i>=1)return n;const s=Kd(t),r=Math.floor(n.length*i);let a="";for(let l=0;l<n.length;l++){const d=n[l];if(l<r||/\s/.test(d)){a+=d;continue}a+=To[Math.floor(s()*To.length)]}return a}const Jd=14,Qd=50;function sc(n,e){const[t,i]=J.useState(n),s=J.useRef(0);return J.useEffect(()=>{const r=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!e||r){i(n);return}s.current+=1;const a=s.current;let l=0;i(wo(n,0,a));const d=setInterval(()=>{l+=1;const c=l/Jd;if(c>=1){i(n),clearInterval(d);return}i(wo(n,c,a))},Qd);return()=>clearInterval(d)},[n,e]),t}const Ao=new Map,Fs=new Set;function At(){const n=new Audio;return Fs.add(n),n}function rc(){Fs.forEach(n=>{try{n.pause(),n.currentTime=0,n.src=""}catch{}}),Fs.clear(),document.querySelectorAll("audio, video").forEach(n=>{const e=n;try{e.pause(),e.currentTime=0}catch{}})}async function eu(n){const e=Ao.get(n);if(e)return e;const t=await fetch(n,{mode:"cors",credentials:"omit"});if(!t.ok){const s=await t.text().catch(()=>"");throw/not_found|Object not found/i.test(s)||t.status===404||t.status===400?new Error("ФАЙЛА НЕТ В ХРАНИЛИЩЕ"):new Error(`сервер ответил ${t.status}`)}const i=URL.createObjectURL(await t.blob());return Ao.set(n,i),i}async function ac(n,e){Fs.add(n);try{return n.src=e,await n.play(),{ok:!0}}catch(t){if((t instanceof Error?t.name:"")==="NotAllowedError")return{ok:!1,reason:"браузер не разрешил звук — кликните по экрану"}}try{return n.src=await eu(e),await n.play(),{ok:!0}}catch(t){return{ok:!1,reason:t instanceof Error&&/ФАЙЛА НЕТ/.test(t.message)?"файла нет в хранилище — трек нужно загрузить заново в редакторе":t instanceof Error&&/Failed to fetch|NetworkError/i.test(t.message)?"файл не скачивается: запрос блокирует браузер, VPN или расширение":`не удалось воспроизвести: ${t instanceof Error?t.message:"ошибка"}`}}}async function tu(n){const e=[n];try{const t=await fetch(n,{method:"GET",mode:"cors",credentials:"omit"});e.push(`fetch: ${t.status} ${t.statusText}`),e.push(`тип: ${t.headers.get("content-type")??"—"}`),e.push(`размер: ${t.headers.get("content-length")??"—"}`)}catch(t){e.push(`fetch НЕ ПРОШЁЛ: ${t instanceof Error?t.message:"ошибка"}`)}return e.join(`
`)}let es=0;function nu(n,e,t){const i=++es;rc();const s=At();let r;const a=()=>i!==es,l=()=>{r&&clearInterval(r);try{s.pause()}catch{}};return s.addEventListener("playing",()=>{var c,f;if(a()){l();return}(c=t.onStart)==null||c.call(t);let d=e;(f=t.onTick)==null||f.call(t,d),r=setInterval(()=>{var m,h;if(a()){l();return}d-=1,(m=t.onTick)==null||m.call(t,Math.max(0,d)),d<=0&&(l(),(h=t.onEnd)==null||h.call(t))},1e3)},{once:!0}),ac(s,n).then(d=>{var c;if(a()){l();return}d.ok||(l(),(c=t.onError)==null||c.call(t,d.reason))}),{stop:()=>{i===es&&es++,l()}}}function iu({pack:n,round:e,gameState:t,timerNode:i}){var M,p;const s=e.settings,r=s.startDelaySec??5,a=s.afterTimerSec??5,l=e.questions.filter(u=>!u.hidden),d=e.settings.bg_music??((M=n.settings)==null?void 0:M.bg_music),c=((p=n.settings)==null?void 0:p.play_mode)==="paper";J.useEffect(()=>{if(c||t.timer_started_at||document.hidden)return;const u=setTimeout(()=>{Is()},r*1e3);return()=>clearTimeout(u)},[t.timer_started_at,c]),J.useEffect(()=>{if(!t.timer_started_at||!d||document.hidden)return;const u=At();return u.src=Xe(d),u.loop=!0,u.volume=.6,u.play().catch(()=>{}),()=>u.pause()},[t.timer_started_at,d]),J.useEffect(()=>{if(!t.timer_started_at||document.hidden)return;const w=new Date(t.timer_started_at).getTime()+e.timer_seconds*1e3-Date.now()+a*1e3,C=setTimeout(()=>{Vi(0)},Math.max(0,w));return()=>clearTimeout(C)},[t.timer_started_at]);const[f,m]=J.useState(r);J.useEffect(()=>{if(c||t.timer_started_at)return;const u=setInterval(()=>m(w=>Math.max(0,w-1)),1e3);return()=>clearInterval(u)},[t.timer_started_at,c]);const h=l.length%2===1?l[0]:null,g=h?l.slice(1):l,_=Math.ceil(g.length/2);return o.jsxs("div",{className:`sprint-screen${h?" with-hero":""}${l.length>7?" many":""}`,children:[h&&o.jsxs("div",{className:`sprint-hero sprint-card${Ei(h.question_text).trim()?Ei(h.question_text):""}`,children:[o.jsx("span",{className:"sprint-num",children:"1"}),o.jsx("div",{className:"sprint-text",children:h.question_text})]}),o.jsx("div",{className:"host-topbar sprint-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")})}),o.jsx("div",{className:"sprint-col",children:g.slice(0,_).map((u,w)=>o.jsx(Ro,{n:(h?2:1)+w,q:u},u.id))}),o.jsx("div",{className:"sprint-center",children:t.timer_started_at?o.jsx("div",{className:"sprint-timer",children:i}):o.jsxs("div",{className:"sprint-pre",children:[!c&&o.jsx("div",{className:"sprint-pre-num",children:f}),o.jsx("div",{className:"mono-tag",children:"ЧИТАЕМ ВОПРОСЫ"})]})}),o.jsx("div",{className:"sprint-col",children:g.slice(_).map((u,w)=>o.jsx(Ro,{n:(h?2:1)+_+w,q:u},u.id))})]})}function Ro({n,q:e}){const t=(e.media.question??[]).find(i=>!/\.(mp3|mp4|webm|wav)$/i.test(i));return o.jsxs("div",{className:"sprint-card",children:[o.jsx("span",{className:"sprint-num",children:n}),o.jsx("div",{className:"sprint-text",children:e.question_text}),t&&o.jsx("img",{src:Xe(t),alt:"",className:"sprint-img"})]})}const Os=100,oc=72,Co=260,su=12.5,ru=9,au=.9,No=80;function ou(n,e){const t=No+Math.max(0,Math.min(1,n))*(360-No),i=-90+t,s=[];for(let c=0;c<Co;c++){const f=c/(Co-1),m=(i-f*t)*Math.PI/180,h=su*(f<.2?.86+.14*(f/.2):1-.97*Math.pow((f-.2)/.8,1.9)),g=oc+au*Math.sin(2*Math.PI*(f*ru)+e),_=Os+g*Math.cos(m),M=Os+g*Math.sin(m),p=Math.cos(m),u=Math.sin(m);s.push({cx:_,cy:M,nx:p,ny:u,w:h})}const r=s.map(c=>`${(c.cx+c.nx*c.w).toFixed(2)},${(c.cy+c.ny*c.w).toFixed(2)}`),a=s.slice().reverse().map(c=>`${(c.cx-c.nx*c.w).toFixed(2)},${(c.cy-c.ny*c.w).toFixed(2)}`),l=s[0],d=s[8];return{body:`M${r.join("L")}L${a.join("L")}Z`,mid:`M${s.map(c=>`${c.cx.toFixed(2)},${c.cy.toFixed(2)}`).join("L")}`,hx:l.cx,hy:l.cy,rot:Math.atan2(l.cy-d.cy,l.cx-d.cx)*180/Math.PI}}function lc({left:n,seconds:e,low:t}){const i=1-Math.max(0,Math.min(1,n/Math.max(1,e))),[s,r]=J.useState(0),a=J.useRef(0);J.useEffect(()=>{let c=!1;const f=()=>{c||(r(-(Date.now()/700)%(Math.PI*2)),a.current=requestAnimationFrame(f))};return a.current=requestAnimationFrame(f),()=>{c=!0,cancelAnimationFrame(a.current)}},[]);const l=ou(i,s),d=t?"lo":"ok";return o.jsxs("div",{className:`snake-timer${t?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 200 200","aria-hidden":!0,children:[o.jsxs("defs",{children:[o.jsxs("linearGradient",{id:`sn-g-${d}`,x1:"0",y1:"0",x2:".3",y2:"1",children:[o.jsx("stop",{offset:"0",stopColor:t?"#c2593f":"#3ab97c"}),o.jsx("stop",{offset:".45",stopColor:t?"#8d2f22":"#177a4a"}),o.jsx("stop",{offset:"1",stopColor:t?"#521410":"#0b4229"})]}),o.jsx("clipPath",{id:`sn-c-${d}`,children:o.jsx("path",{d:l.body})}),o.jsx("filter",{id:`sn-f-${d}`,x:"-30%",y:"-30%",width:"160%",height:"160%",children:o.jsx("feDropShadow",{dx:"0",dy:"0",stdDeviation:"3",floodColor:t?"#b23a2a":"#0f7a4d",floodOpacity:".55"})})]}),o.jsx("circle",{cx:Os,cy:Os,r:oc,fill:"none",stroke:"#d3a62526",strokeWidth:"1.2",strokeDasharray:"2 8"}),o.jsxs("g",{filter:`url(#sn-f-${d})`,children:[o.jsx("path",{d:l.body,fill:`url(#sn-g-${d})`,stroke:"#06301c",strokeWidth:"1.1"}),o.jsxs("g",{clipPath:`url(#sn-c-${d})`,children:[o.jsx("path",{d:l.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"5 10",opacity:".34"}),o.jsx("path",{d:l.mid,fill:"none",stroke:"#8ff0c0",strokeWidth:"3.4",opacity:".22"}),o.jsx("path",{d:l.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"1.6 14",opacity:".34"})]}),o.jsxs("g",{transform:`translate(${l.hx.toFixed(2)},${l.hy.toFixed(2)}) rotate(${l.rot.toFixed(2)})`,children:[o.jsx("path",{d:"M17.5,0 Q15,-6.4 6,-9.6 Q-4,-12.4 -11,-10 L-11,10 Q-4,12.4 6,9.6 Q15,6.4 17.5,0 Z",fill:t?"#a83c2c":"#1f8a55",stroke:"#06301c",strokeWidth:"1.1"}),o.jsx("path",{d:"M17.5,0 Q9,-3 -8,-3.4 L-8,3.4 Q9,3 17.5,0 Z",fill:"#0d4f31",opacity:".55"}),o.jsx("path",{className:"sn-tongue",d:"M17,0 l12,-4.5 M17,0 l12,4.5",stroke:"#e0243a",strokeWidth:"2.1",fill:"none",strokeLinecap:"round"}),o.jsx("ellipse",{cx:"1",cy:"-6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1",cy:"6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1.8",cy:"-6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("ellipse",{cx:"1.8",cy:"6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("circle",{cx:"13",cy:"-2.6",r:".9",fill:"#06301c"}),o.jsx("circle",{cx:"13",cy:"2.6",r:".9",fill:"#06301c"})]})]})]}),o.jsx("span",{className:`snake-num${t?" danger":""}`,children:n})]})}let Bs=!1;const jr=new Set;function Po(){Bs||(Bs=!0,jr.forEach(n=>n(!0)))}async function Do(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n;e.state==="suspended"&&await e.resume();const t=e.state==="running";return e.close(),t}catch{return!1}}function cc(){const[n,e]=J.useState(Bs);return J.useEffect(()=>{if(Bs)return;jr.add(e);const t=()=>{Do().then(i=>{i&&Po()})};return window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),Do().then(i=>{i&&Po()}),()=>{jr.delete(e),window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t)}},[]),n}function dc(){return cc()?null:o.jsxs("div",{className:"audio-gate",onClick:()=>{},children:[o.jsx("span",{children:"🔇 Звук заблокирован браузером"}),o.jsx("b",{children:"кликните по экрану один раз"})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ka="185",lu=0,Lo=1,cu=2,Rs=1,du=2,zi=3,On=0,It=1,xn=2,Sn=0,vi=1,zs=2,Io=3,Uo=4,uu=5,jn=100,hu=101,fu=102,pu=103,mu=104,gu=200,_u=201,xu=202,vu=203,Xr=204,qr=205,Mu=206,Su=207,yu=208,Eu=209,bu=210,Tu=211,wu=212,Au=213,Ru=214,$r=0,Yr=1,Zr=2,bi=3,Kr=4,Jr=5,Qr=6,ea=7,uc=0,Cu=1,Nu=2,ln=0,hc=1,fc=2,pc=3,mc=4,gc=5,_c=6,xc=7,vc=300,Kn=301,Ti=302,sr=303,rr=304,Ks=306,ta=1e3,vn=1001,na=1002,Et=1003,Pu=1004,ts=1005,Rt=1006,ar=1007,qn=1008,kt=1009,Mc=1010,Sc=1011,Hi=1012,Ga=1013,dn=1014,an=1015,bn=1016,Va=1017,Ha=1018,Wi=1020,yc=35902,Ec=35899,bc=1021,Tc=1022,Zt=1023,Tn=1026,$n=1027,wc=1028,Wa=1029,Jn=1030,ja=1031,Xa=1033,Cs=33776,Ns=33777,Ps=33778,Ds=33779,ia=35840,sa=35841,ra=35842,aa=35843,oa=36196,la=37492,ca=37496,da=37488,ua=37489,ks=37490,ha=37491,fa=37808,pa=37809,ma=37810,ga=37811,_a=37812,xa=37813,va=37814,Ma=37815,Sa=37816,ya=37817,Ea=37818,ba=37819,Ta=37820,wa=37821,Aa=36492,Ra=36494,Ca=36495,Na=36283,Pa=36284,Gs=36285,Da=36286,Du=3200,Fo=0,Lu=1,Un="",Ht="srgb",Vs="srgb-linear",Hs="linear",nt="srgb",si=7680,Oo=519,Iu=512,Uu=513,Fu=514,qa=515,Ou=516,Bu=517,$a=518,zu=519,Bo=35044,zo="300 es",on=2e3,ji=2001;function ku(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ws(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Gu(){const n=Ws("canvas");return n.style.display="block",n}const ko={};function Go(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ac(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=Ac(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=Ac(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Mi(...n){const e=n.join(" ");e in ko||(ko[e]=!0,Fe(...n))}function Vu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Hu={[$r]:Yr,[Zr]:Qr,[Kr]:ea,[bi]:Jr,[Yr]:$r,[Qr]:Zr,[ea]:Kr,[Jr]:bi};class ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],or=Math.PI/180,La=180/Math.PI;function qi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function Wu(n,e){return(n%e+e)%e}function lr(n,e,t){return(1-t)*n+t*e}function Ni(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Dt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ja=class Ja{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ja.prototype.isVector2=!0;let et=Ja;class Ri{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,l){let d=i[s+0],c=i[s+1],f=i[s+2],m=i[s+3],h=r[a+0],g=r[a+1],_=r[a+2],M=r[a+3];if(m!==M||d!==h||c!==g||f!==_){let p=d*h+c*g+f*_+m*M;p<0&&(h=-h,g=-g,_=-_,M=-M,p=-p);let u=1-l;if(p<.9995){const w=Math.acos(p),C=Math.sin(w);u=Math.sin(u*w)/C,l=Math.sin(l*w)/C,d=d*u+h*l,c=c*u+g*l,f=f*u+_*l,m=m*u+M*l}else{d=d*u+h*l,c=c*u+g*l,f=f*u+_*l,m=m*u+M*l;const w=1/Math.sqrt(d*d+c*c+f*f+m*m);d*=w,c*=w,f*=w,m*=w}}e[t]=d,e[t+1]=c,e[t+2]=f,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,s,r,a){const l=i[s],d=i[s+1],c=i[s+2],f=i[s+3],m=r[a],h=r[a+1],g=r[a+2],_=r[a+3];return e[t]=l*_+f*m+d*g-c*h,e[t+1]=d*_+f*h+c*m-l*g,e[t+2]=c*_+f*g+l*h-d*m,e[t+3]=f*_-l*m-d*h-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,l=Math.cos,d=Math.sin,c=l(i/2),f=l(s/2),m=l(r/2),h=d(i/2),g=d(s/2),_=d(r/2);switch(a){case"XYZ":this._x=h*f*m+c*g*_,this._y=c*g*m-h*f*_,this._z=c*f*_+h*g*m,this._w=c*f*m-h*g*_;break;case"YXZ":this._x=h*f*m+c*g*_,this._y=c*g*m-h*f*_,this._z=c*f*_-h*g*m,this._w=c*f*m+h*g*_;break;case"ZXY":this._x=h*f*m-c*g*_,this._y=c*g*m+h*f*_,this._z=c*f*_+h*g*m,this._w=c*f*m-h*g*_;break;case"ZYX":this._x=h*f*m-c*g*_,this._y=c*g*m+h*f*_,this._z=c*f*_-h*g*m,this._w=c*f*m+h*g*_;break;case"YZX":this._x=h*f*m+c*g*_,this._y=c*g*m+h*f*_,this._z=c*f*_-h*g*m,this._w=c*f*m-h*g*_;break;case"XZY":this._x=h*f*m-c*g*_,this._y=c*g*m-h*f*_,this._z=c*f*_+h*g*m,this._w=c*f*m+h*g*_;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],l=t[5],d=t[9],c=t[2],f=t[6],m=t[10],h=i+l+m;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(f-d)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(i>l&&i>m){const g=2*Math.sqrt(1+i-l-m);this._w=(f-d)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(l>m){const g=2*Math.sqrt(1+l-i-m);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(d+f)/g}else{const g=2*Math.sqrt(1+m-i-l);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(d+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,l=t._x,d=t._y,c=t._z,f=t._w;return this._x=i*f+a*l+s*c-r*d,this._y=s*f+a*d+r*l-i*c,this._z=r*f+a*c+i*d-s*l,this._w=a*f-i*l-s*d-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,l=this.dot(e);l<0&&(i=-i,s=-s,r=-r,a=-a,l=-l);let d=1-t;if(l<.9995){const c=Math.acos(l),f=Math.sin(c);d=Math.sin(d*c)/f,t=Math.sin(t*c)/f,this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this._onChangeCallback()}else this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Qa=class Qa{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,l=e.z,d=e.w,c=2*(a*s-l*i),f=2*(l*t-r*s),m=2*(r*i-a*t);return this.x=t+d*c+a*m-l*f,this.y=i+d*f+l*c-r*m,this.z=s+d*m+r*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,l=t.y,d=t.z;return this.x=s*d-r*l,this.y=r*a-i*d,this.z=i*l-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return cr.copy(this).projectOnVector(e),this.sub(cr)}reflect(e){return this.sub(cr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qa.prototype.isVector3=!0;let j=Qa;const cr=new j,Vo=new Ri,eo=class eo{constructor(e,t,i,s,r,a,l,d,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,l,d,c)}set(e,t,i,s,r,a,l,d,c){const f=this.elements;return f[0]=e,f[1]=s,f[2]=l,f[3]=t,f[4]=r,f[5]=d,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],l=i[3],d=i[6],c=i[1],f=i[4],m=i[7],h=i[2],g=i[5],_=i[8],M=s[0],p=s[3],u=s[6],w=s[1],C=s[4],S=s[7],b=s[2],E=s[5],R=s[8];return r[0]=a*M+l*w+d*b,r[3]=a*p+l*C+d*E,r[6]=a*u+l*S+d*R,r[1]=c*M+f*w+m*b,r[4]=c*p+f*C+m*E,r[7]=c*u+f*S+m*R,r[2]=h*M+g*w+_*b,r[5]=h*p+g*C+_*E,r[8]=h*u+g*S+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],d=e[6],c=e[7],f=e[8];return t*a*f-t*l*c-i*r*f+i*l*d+s*r*c-s*a*d}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],d=e[6],c=e[7],f=e[8],m=f*a-l*c,h=l*d-f*r,g=c*r-a*d,_=t*m+i*h+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=m*M,e[1]=(s*c-f*i)*M,e[2]=(l*i-s*a)*M,e[3]=h*M,e[4]=(f*t-s*d)*M,e[5]=(s*r-l*t)*M,e[6]=g*M,e[7]=(i*d-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,l){const d=Math.cos(r),c=Math.sin(r);return this.set(i*d,i*c,-i*(d*a+c*l)+a+e,-s*c,s*d,-s*(-c*a+d*l)+l+t,0,0,1),this}scale(e,t){return Mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dr.makeScale(e,t)),this}rotate(e){return Mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dr.makeRotation(-e)),this}translate(e,t){return Mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};eo.prototype.isMatrix3=!0;let Oe=eo;const dr=new Oe,Ho=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wo=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ju(){const n={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===nt&&(s.r=yn(s.r),s.g=yn(s.g),s.b=yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?Hs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vs]:{primaries:e,whitePoint:i,transfer:Hs,toXYZ:Ho,fromXYZ:Wo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Ho,fromXYZ:Wo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),n}const $e=ju();function yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Si(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ri;class Xu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ri===void 0&&(ri=Ws("canvas")),ri.width=e.width,ri.height=e.height;const s=ri.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ri}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ws("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yn(t[i]/255)*255):t[i]=yn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qu=0;class Ya{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?r.push(ur(s[a].image)):r.push(ur(s[a]))}else r=ur(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ur(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let $u=0;const hr=new j;class Ct extends ti{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,i=vn,s=vn,r=Rt,a=qn,l=Zt,d=kt,c=Ct.DEFAULT_ANISOTROPY,f=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=qi(),this.name="",this.source=new Ya(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=d,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hr).x}get height(){return this.source.getSize(hr).y}get depth(){return this.source.getSize(hr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ta:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ta:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=vc;Ct.DEFAULT_ANISOTROPY=1;const to=class to{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const d=e.elements,c=d[0],f=d[4],m=d[8],h=d[1],g=d[5],_=d[9],M=d[2],p=d[6],u=d[10];if(Math.abs(f-h)<.01&&Math.abs(m-M)<.01&&Math.abs(_-p)<.01){if(Math.abs(f+h)<.1&&Math.abs(m+M)<.1&&Math.abs(_+p)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,S=(g+1)/2,b=(u+1)/2,E=(f+h)/4,R=(m+M)/4,v=(_+p)/4;return C>S&&C>b?C<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(C),s=E/i,r=R/i):S>b?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=E/s,r=v/s):b<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),i=R/r,s=v/r),this.set(i,s,r,t),this}let w=Math.sqrt((p-_)*(p-_)+(m-M)*(m-M)+(h-f)*(h-f));return Math.abs(w)<.001&&(w=1),this.x=(p-_)/w,this.y=(m-M)/w,this.z=(h-f)/w,this.w=Math.acos((c+g+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};to.prototype.isVector4=!0;let ct=to;class Yu extends ti{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Ct(s),a=i.count;for(let l=0;l<a;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ya(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Yu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Rc extends Ct{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zu extends Ct{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $s=class $s{constructor(e,t,i,s,r,a,l,d,c,f,m,h,g,_,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,l,d,c,f,m,h,g,_,M,p)}set(e,t,i,s,r,a,l,d,c,f,m,h,g,_,M,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=a,u[9]=l,u[13]=d,u[2]=c,u[6]=f,u[10]=m,u[14]=h,u[3]=g,u[7]=_,u[11]=M,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $s().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ai.setFromMatrixColumn(e,0).length(),r=1/ai.setFromMatrixColumn(e,1).length(),a=1/ai.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),l=Math.sin(i),d=Math.cos(s),c=Math.sin(s),f=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const h=a*f,g=a*m,_=l*f,M=l*m;t[0]=d*f,t[4]=-d*m,t[8]=c,t[1]=g+_*c,t[5]=h-M*c,t[9]=-l*d,t[2]=M-h*c,t[6]=_+g*c,t[10]=a*d}else if(e.order==="YXZ"){const h=d*f,g=d*m,_=c*f,M=c*m;t[0]=h+M*l,t[4]=_*l-g,t[8]=a*c,t[1]=a*m,t[5]=a*f,t[9]=-l,t[2]=g*l-_,t[6]=M+h*l,t[10]=a*d}else if(e.order==="ZXY"){const h=d*f,g=d*m,_=c*f,M=c*m;t[0]=h-M*l,t[4]=-a*m,t[8]=_+g*l,t[1]=g+_*l,t[5]=a*f,t[9]=M-h*l,t[2]=-a*c,t[6]=l,t[10]=a*d}else if(e.order==="ZYX"){const h=a*f,g=a*m,_=l*f,M=l*m;t[0]=d*f,t[4]=_*c-g,t[8]=h*c+M,t[1]=d*m,t[5]=M*c+h,t[9]=g*c-_,t[2]=-c,t[6]=l*d,t[10]=a*d}else if(e.order==="YZX"){const h=a*d,g=a*c,_=l*d,M=l*c;t[0]=d*f,t[4]=M-h*m,t[8]=_*m+g,t[1]=m,t[5]=a*f,t[9]=-l*f,t[2]=-c*f,t[6]=g*m+_,t[10]=h-M*m}else if(e.order==="XZY"){const h=a*d,g=a*c,_=l*d,M=l*c;t[0]=d*f,t[4]=-m,t[8]=c*f,t[1]=h*m+M,t[5]=a*f,t[9]=g*m-_,t[2]=_*m-g,t[6]=l*f,t[10]=M*m+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ku,e,Ju)}lookAt(e,t,i){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Cn.crossVectors(i,Ot),Cn.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Cn.crossVectors(i,Ot)),Cn.normalize(),ns.crossVectors(Ot,Cn),s[0]=Cn.x,s[4]=ns.x,s[8]=Ot.x,s[1]=Cn.y,s[5]=ns.y,s[9]=Ot.y,s[2]=Cn.z,s[6]=ns.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],l=i[4],d=i[8],c=i[12],f=i[1],m=i[5],h=i[9],g=i[13],_=i[2],M=i[6],p=i[10],u=i[14],w=i[3],C=i[7],S=i[11],b=i[15],E=s[0],R=s[4],v=s[8],A=s[12],P=s[1],D=s[5],F=s[9],Q=s[13],Y=s[2],O=s[6],V=s[10],k=s[14],K=s[3],se=s[7],le=s[11],_e=s[15];return r[0]=a*E+l*P+d*Y+c*K,r[4]=a*R+l*D+d*O+c*se,r[8]=a*v+l*F+d*V+c*le,r[12]=a*A+l*Q+d*k+c*_e,r[1]=f*E+m*P+h*Y+g*K,r[5]=f*R+m*D+h*O+g*se,r[9]=f*v+m*F+h*V+g*le,r[13]=f*A+m*Q+h*k+g*_e,r[2]=_*E+M*P+p*Y+u*K,r[6]=_*R+M*D+p*O+u*se,r[10]=_*v+M*F+p*V+u*le,r[14]=_*A+M*Q+p*k+u*_e,r[3]=w*E+C*P+S*Y+b*K,r[7]=w*R+C*D+S*O+b*se,r[11]=w*v+C*F+S*V+b*le,r[15]=w*A+C*Q+S*k+b*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],l=e[5],d=e[9],c=e[13],f=e[2],m=e[6],h=e[10],g=e[14],_=e[3],M=e[7],p=e[11],u=e[15],w=d*g-c*h,C=l*g-c*m,S=l*h-d*m,b=a*g-c*f,E=a*h-d*f,R=a*m-l*f;return t*(M*w-p*C+u*S)-i*(_*w-p*b+u*E)+s*(_*C-M*b+u*R)-r*(_*S-M*E+p*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],l=e[9],d=e[2],c=e[6],f=e[10];return t*(a*f-l*c)-i*(r*f-l*d)+s*(r*c-a*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],d=e[6],c=e[7],f=e[8],m=e[9],h=e[10],g=e[11],_=e[12],M=e[13],p=e[14],u=e[15],w=t*l-i*a,C=t*d-s*a,S=t*c-r*a,b=i*d-s*l,E=i*c-r*l,R=s*c-r*d,v=f*M-m*_,A=f*p-h*_,P=f*u-g*_,D=m*p-h*M,F=m*u-g*M,Q=h*u-g*p,Y=w*Q-C*F+S*D+b*P-E*A+R*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/Y;return e[0]=(l*Q-d*F+c*D)*O,e[1]=(s*F-i*Q-r*D)*O,e[2]=(M*R-p*E+u*b)*O,e[3]=(h*E-m*R-g*b)*O,e[4]=(d*P-a*Q-c*A)*O,e[5]=(t*Q-s*P+r*A)*O,e[6]=(p*S-_*R-u*C)*O,e[7]=(f*R-h*S+g*C)*O,e[8]=(a*F-l*P+c*v)*O,e[9]=(i*P-t*F-r*v)*O,e[10]=(_*E-M*S+u*w)*O,e[11]=(m*S-f*E-g*w)*O,e[12]=(l*A-a*D-d*v)*O,e[13]=(t*D-i*A+s*v)*O,e[14]=(M*C-_*b-p*w)*O,e[15]=(f*b-m*C+h*w)*O,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,l=e.y,d=e.z,c=r*a,f=r*l;return this.set(c*a+i,c*l-s*d,c*d+s*l,0,c*l+s*d,f*l+i,f*d-s*a,0,c*d-s*l,f*d+s*a,r*d*d+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,l=t._z,d=t._w,c=r+r,f=a+a,m=l+l,h=r*c,g=r*f,_=r*m,M=a*f,p=a*m,u=l*m,w=d*c,C=d*f,S=d*m,b=i.x,E=i.y,R=i.z;return s[0]=(1-(M+u))*b,s[1]=(g+S)*b,s[2]=(_-C)*b,s[3]=0,s[4]=(g-S)*E,s[5]=(1-(h+u))*E,s[6]=(p+w)*E,s[7]=0,s[8]=(_+C)*R,s[9]=(p-w)*R,s[10]=(1-(h+M))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ai.set(s[0],s[1],s[2]).length();const l=ai.set(s[4],s[5],s[6]).length(),d=ai.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Xt.copy(this);const c=1/a,f=1/l,m=1/d;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=f,Xt.elements[5]*=f,Xt.elements[6]*=f,Xt.elements[8]*=m,Xt.elements[9]*=m,Xt.elements[10]*=m,t.setFromRotationMatrix(Xt),i.x=a,i.y=l,i.z=d,this}makePerspective(e,t,i,s,r,a,l=on,d=!1){const c=this.elements,f=2*r/(t-e),m=2*r/(i-s),h=(t+e)/(t-e),g=(i+s)/(i-s);let _,M;if(d)_=r/(a-r),M=a*r/(a-r);else if(l===on)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(l===ji)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=m,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,l=on,d=!1){const c=this.elements,f=2/(t-e),m=2/(i-s),h=-(t+e)/(t-e),g=-(i+s)/(i-s);let _,M;if(d)_=1/(a-r),M=a/(a-r);else if(l===on)_=-2/(a-r),M=-(a+r)/(a-r);else if(l===ji)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=m,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};$s.prototype.isMatrix4=!0;let dt=$s;const ai=new j,Xt=new dt,Ku=new j(0,0,0),Ju=new j(1,1,1),Cn=new j,ns=new j,Ot=new j,jo=new dt,Xo=new Ri;class Qn{constructor(e=0,t=0,i=0,s=Qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],l=s[8],d=s[1],c=s[5],f=s[9],m=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(d,c)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-Ye(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-f,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return jo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xo.setFromEuler(this),this.setFromQuaternion(Xo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qn.DEFAULT_ORDER="XYZ";class Cc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qu=0;const qo=new j,oi=new Ri,fn=new dt,is=new j,Pi=new j,eh=new j,th=new Ri,$o=new j(1,0,0),Yo=new j(0,1,0),Zo=new j(0,0,1),Ko={type:"added"},nh={type:"removed"},li={type:"childadded",child:null},fr={type:"childremoved",child:null};class Pt extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new j,t=new Qn,i=new Ri,s=new j(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new Oe}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis($o,e)}rotateY(e){return this.rotateOnAxis(Yo,e)}rotateZ(e){return this.rotateOnAxis(Zo,e)}translateOnAxis(e,t){return qo.copy(e).applyQuaternion(this.quaternion),this.position.add(qo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($o,e)}translateY(e){return this.translateOnAxis(Yo,e)}translateZ(e){return this.translateOnAxis(Zo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?is.copy(e):is.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Pi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Pi,is,this.up):fn.lookAt(is,Pi,this.up),this.quaternion.setFromRotationMatrix(fn),s&&(fn.extractRotation(s.matrixWorld),oi.setFromRotationMatrix(fn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ko),li.child=e,this.dispatchEvent(li),li.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nh),fr.child=e,this.dispatchEvent(fr),fr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ko),li.child=e,this.dispatchEvent(li),li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,e,eh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,th,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,d){return l[d.uuid]===void 0&&(l[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const d=l.shapes;if(Array.isArray(d))for(let c=0,f=d.length;c<f;c++){const m=d[c];r(e.shapes,m)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let d=0,c=this.material.length;d<c;d++)l.push(r(e.materials,this.material[d]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const d=this.animations[l];s.animations.push(r(e.animations,d))}}if(t){const l=a(e.geometries),d=a(e.materials),c=a(e.textures),f=a(e.images),m=a(e.shapes),h=a(e.skeletons),g=a(e.animations),_=a(e.nodes);l.length>0&&(i.geometries=l),d.length>0&&(i.materials=d),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),m.length>0&&(i.shapes=m),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(l){const d=[];for(const c in l){const f=l[c];delete f.metadata,d.push(f)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new j(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ss extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ih={type:"move"};class pr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ss,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ss,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ss,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const l=this._targetRay,d=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,i),u=this._getHandJoint(c,M);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const f=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],h=f.position.distanceTo(m.position),g=.02,_=.005;c.inputState.pinching&&h>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(ih)))}return l!==null&&(l.visible=s!==null),d!==null&&(d.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ss;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Nc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},rs={h:0,s:0,l:0};function mr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=Wu(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=mr(a,r,e+1/3),this.g=mr(a,r,e),this.b=mr(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=Ht){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const i=Nc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return $e.workingToColorSpace(wt.copy(this),e),Math.round(Ye(wt.r*255,0,255))*65536+Math.round(Ye(wt.g*255,0,255))*256+Math.round(Ye(wt.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(wt.copy(this),t);const i=wt.r,s=wt.g,r=wt.b,a=Math.max(i,s,r),l=Math.min(i,s,r);let d,c;const f=(l+a)/2;if(l===a)d=0,c=0;else{const m=a-l;switch(c=f<=.5?m/(a+l):m/(2-a-l),a){case i:d=(s-r)/m+(s<r?6:0);break;case s:d=(r-i)/m+2;break;case r:d=(i-s)/m+4;break}d/=6}return e.h=d,e.s=c,e.l=f,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=Ht){$e.workingToColorSpace(wt.copy(this),e);const t=wt.r,i=wt.g,s=wt.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(rs);const i=lr(Nn.h,rs.h,t),s=lr(Nn.s,rs.s,t),r=lr(Nn.l,rs.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ze;Ze.NAMES=Nc;class Za{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ze(e),this.density=t}clone(){return new Za(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class sh extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const qt=new j,pn=new j,gr=new j,mn=new j,ci=new j,di=new j,Jo=new j,_r=new j,xr=new j,vr=new j,Mr=new ct,Sr=new ct,yr=new ct;class Yt{constructor(e=new j,t=new j,i=new j){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),qt.subVectors(e,t),s.cross(qt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){qt.subVectors(s,t),pn.subVectors(i,t),gr.subVectors(e,t);const a=qt.dot(qt),l=qt.dot(pn),d=qt.dot(gr),c=pn.dot(pn),f=pn.dot(gr),m=a*c-l*l;if(m===0)return r.set(0,0,0),null;const h=1/m,g=(c*d-l*f)*h,_=(a*f-l*d)*h;return r.set(1-g-_,_,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,i,s,r,a,l,d){return this.getBarycoord(e,t,i,s,mn)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,mn.x),d.addScaledVector(a,mn.y),d.addScaledVector(l,mn.z),d)}static getInterpolatedAttribute(e,t,i,s,r,a){return Mr.setScalar(0),Sr.setScalar(0),yr.setScalar(0),Mr.fromBufferAttribute(e,t),Sr.fromBufferAttribute(e,i),yr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Mr,r.x),a.addScaledVector(Sr,r.y),a.addScaledVector(yr,r.z),a}static isFrontFacing(e,t,i,s){return qt.subVectors(i,t),pn.subVectors(e,t),qt.cross(pn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),qt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,l;ci.subVectors(s,i),di.subVectors(r,i),_r.subVectors(e,i);const d=ci.dot(_r),c=di.dot(_r);if(d<=0&&c<=0)return t.copy(i);xr.subVectors(e,s);const f=ci.dot(xr),m=di.dot(xr);if(f>=0&&m<=f)return t.copy(s);const h=d*m-f*c;if(h<=0&&d>=0&&f<=0)return a=d/(d-f),t.copy(i).addScaledVector(ci,a);vr.subVectors(e,r);const g=ci.dot(vr),_=di.dot(vr);if(_>=0&&g<=_)return t.copy(r);const M=g*c-d*_;if(M<=0&&c>=0&&_<=0)return l=c/(c-_),t.copy(i).addScaledVector(di,l);const p=f*_-g*m;if(p<=0&&m-f>=0&&g-_>=0)return Jo.subVectors(r,s),l=(m-f)/(m-f+(g-_)),t.copy(s).addScaledVector(Jo,l);const u=1/(p+M+h);return a=M*u,l=h*u,t.copy(i).addScaledVector(ci,a).addScaledVector(di,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class $i{constructor(e=new j(1/0,1/0,1/0),t=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=r.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,$t):$t.fromBufferAttribute(r,a),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),as.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),as.copy(i.boundingBox)),as.applyMatrix4(e.matrixWorld),this.union(as)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Di),os.subVectors(this.max,Di),ui.subVectors(e.a,Di),hi.subVectors(e.b,Di),fi.subVectors(e.c,Di),Pn.subVectors(hi,ui),Dn.subVectors(fi,hi),kn.subVectors(ui,fi);let t=[0,-Pn.z,Pn.y,0,-Dn.z,Dn.y,0,-kn.z,kn.y,Pn.z,0,-Pn.x,Dn.z,0,-Dn.x,kn.z,0,-kn.x,-Pn.y,Pn.x,0,-Dn.y,Dn.x,0,-kn.y,kn.x,0];return!Er(t,ui,hi,fi,os)||(t=[1,0,0,0,1,0,0,0,1],!Er(t,ui,hi,fi,os))?!1:(ls.crossVectors(Pn,Dn),t=[ls.x,ls.y,ls.z],Er(t,ui,hi,fi,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gn=[new j,new j,new j,new j,new j,new j,new j,new j],$t=new j,as=new $i,ui=new j,hi=new j,fi=new j,Pn=new j,Dn=new j,kn=new j,Di=new j,os=new j,ls=new j,Gn=new j;function Er(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Gn.fromArray(n,r);const l=s.x*Math.abs(Gn.x)+s.y*Math.abs(Gn.y)+s.z*Math.abs(Gn.z),d=e.dot(Gn),c=t.dot(Gn),f=i.dot(Gn);if(Math.max(-Math.max(d,c,f),Math.min(d,c,f))>l)return!1}return!0}const vt=new j,cs=new et;let rh=0;class Wt extends ti{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Bo,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)cs.fromBufferAttribute(this,t),cs.applyMatrix3(e),this.setXY(t,cs.x,cs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ni(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Dt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),s=Dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),s=Dt(s,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Pc extends Wt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Dc extends Wt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class En extends Wt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const ah=new $i,Li=new j,br=new j;class Js{constructor(e=new j,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ah.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Li.subVectors(e,this.center);const t=Li.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Li,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(br.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Li.copy(e.center).add(br)),this.expandByPoint(Li.copy(e.center).sub(br))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let oh=0;const Vt=new dt,Tr=new Pt,pi=new j,Bt=new $i,Ii=new $i,yt=new j;class Kt extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ku(e)?Dc:Pc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,i){return Vt.makeTranslation(e,t,i),this.applyMatrix4(Vt),this}scale(e,t,i){return Vt.makeScale(e,t,i),this.applyMatrix4(Vt),this}lookAt(e){return Tr.lookAt(e),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new En(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Bt.setFromBufferAttribute(r),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Js);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Ii.setFromBufferAttribute(l),this.morphTargetsRelative?(yt.addVectors(Bt.min,Ii.min),Bt.expandByPoint(yt),yt.addVectors(Bt.max,Ii.max),Bt.expandByPoint(yt)):(Bt.expandByPoint(Ii.min),Bt.expandByPoint(Ii.max))}Bt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)yt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(yt));if(t)for(let r=0,a=t.length;r<a;r++){const l=t[r],d=this.morphTargetsRelative;for(let c=0,f=l.count;c<f;c++)yt.fromBufferAttribute(l,c),d&&(pi.fromBufferAttribute(e,c),yt.add(pi)),s=Math.max(s,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Wt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const l=[],d=[];for(let v=0;v<i.count;v++)l[v]=new j,d[v]=new j;const c=new j,f=new j,m=new j,h=new et,g=new et,_=new et,M=new j,p=new j;function u(v,A,P){c.fromBufferAttribute(i,v),f.fromBufferAttribute(i,A),m.fromBufferAttribute(i,P),h.fromBufferAttribute(r,v),g.fromBufferAttribute(r,A),_.fromBufferAttribute(r,P),f.sub(c),m.sub(c),g.sub(h),_.sub(h);const D=1/(g.x*_.y-_.x*g.y);isFinite(D)&&(M.copy(f).multiplyScalar(_.y).addScaledVector(m,-g.y).multiplyScalar(D),p.copy(m).multiplyScalar(g.x).addScaledVector(f,-_.x).multiplyScalar(D),l[v].add(M),l[A].add(M),l[P].add(M),d[v].add(p),d[A].add(p),d[P].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let v=0,A=w.length;v<A;++v){const P=w[v],D=P.start,F=P.count;for(let Q=D,Y=D+F;Q<Y;Q+=3)u(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const C=new j,S=new j,b=new j,E=new j;function R(v){b.fromBufferAttribute(s,v),E.copy(b);const A=l[v];C.copy(A),C.sub(b.multiplyScalar(b.dot(A))).normalize(),S.crossVectors(E,A);const D=S.dot(d[v])<0?-1:1;a.setXYZW(v,C.x,C.y,C.z,D)}for(let v=0,A=w.length;v<A;++v){const P=w[v],D=P.start,F=P.count;for(let Q=D,Y=D+F;Q<Y;Q+=3)R(e.getX(Q+0)),R(e.getX(Q+1)),R(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const s=new j,r=new j,a=new j,l=new j,d=new j,c=new j,f=new j,m=new j;if(e)for(let h=0,g=e.count;h<g;h+=3){const _=e.getX(h+0),M=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,p),f.subVectors(a,r),m.subVectors(s,r),f.cross(m),l.fromBufferAttribute(i,_),d.fromBufferAttribute(i,M),c.fromBufferAttribute(i,p),l.add(f),d.add(f),c.add(f),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(M,d.x,d.y,d.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),f.subVectors(a,r),m.subVectors(s,r),f.cross(m),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(l,d){const c=l.array,f=l.itemSize,m=l.normalized,h=new c.constructor(d.length*f);let g=0,_=0;for(let M=0,p=d.length;M<p;M++){l.isInterleavedBufferAttribute?g=d[M]*l.data.stride+l.offset:g=d[M]*f;for(let u=0;u<f;u++)h[_++]=c[g++]}return new Wt(h,f,m)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,i=this.index.array,s=this.attributes;for(const l in s){const d=s[l],c=e(d,i);t.setAttribute(l,c)}const r=this.morphAttributes;for(const l in r){const d=[],c=r[l];for(let f=0,m=c.length;f<m;f++){const h=c[f],g=e(h,i);d.push(g)}t.morphAttributes[l]=d}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,d=a.length;l<d;l++){const c=a[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const c in d)d[c]!==void 0&&(e[c]=d[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const d in i){const c=i[d];e.data.attributes[d]=c.toJSON(e.data)}const s={};let r=!1;for(const d in this.morphAttributes){const c=this.morphAttributes[d],f=[];for(let m=0,h=c.length;m<h;m++){const g=c[m];f.push(g.toJSON(e.data))}f.length>0&&(s[d]=f,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const f=s[c];this.setAttribute(c,f.clone(t))}const r=e.morphAttributes;for(const c in r){const f=[],m=r[c];for(let h=0,g=m.length;h<g;h++)f.push(m[h].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const m=a[c];this.addGroup(m.start,m.count,m.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let lh=0;class Yi extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=vi,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xr,this.blendDst=qr,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=si,this.stencilZFail=si,this.stencilZPass=si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==vi&&(i.blending=this.blending),this.side!==On&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xr&&(i.blendSrc=this.blendSrc),this.blendDst!==qr&&(i.blendDst=this.blendDst),this.blendEquation!==jn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==bi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==si&&(i.stencilFail=this.stencilFail),this.stencilZFail!==si&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==si&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const l in r){const d=r[l];delete d.metadata,a.push(d)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new et().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new et().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const _n=new j,wr=new j,ds=new j,Ln=new j,Ar=new j,us=new j,Rr=new j;class Lc{constructor(e=new j,t=new j(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){wr.copy(e).add(t).multiplyScalar(.5),ds.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(wr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ds),l=Ln.dot(this.direction),d=-Ln.dot(ds),c=Ln.lengthSq(),f=Math.abs(1-a*a);let m,h,g,_;if(f>0)if(m=a*d-l,h=a*l-d,_=r*f,m>=0)if(h>=-_)if(h<=_){const M=1/f;m*=M,h*=M,g=m*(m+a*h+2*l)+h*(a*m+h+2*d)+c}else h=r,m=Math.max(0,-(a*h+l)),g=-m*m+h*(h+2*d)+c;else h=-r,m=Math.max(0,-(a*h+l)),g=-m*m+h*(h+2*d)+c;else h<=-_?(m=Math.max(0,-(-a*r+l)),h=m>0?-r:Math.min(Math.max(-r,-d),r),g=-m*m+h*(h+2*d)+c):h<=_?(m=0,h=Math.min(Math.max(-r,-d),r),g=h*(h+2*d)+c):(m=Math.max(0,-(a*r+l)),h=m>0?r:Math.min(Math.max(-r,-d),r),g=-m*m+h*(h+2*d)+c);else h=a>0?-r:r,m=Math.max(0,-(a*h+l)),g=-m*m+h*(h+2*d)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(wr).addScaledVector(ds,h),g}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const i=_n.dot(this.direction),s=_n.dot(_n)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),l=i-a,d=i+a;return d<0?null:l<0?this.at(d,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,l,d;const c=1/this.direction.x,f=1/this.direction.y,m=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),f>=0?(r=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(r=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),m>=0?(l=(e.min.z-h.z)*m,d=(e.max.z-h.z)*m):(l=(e.max.z-h.z)*m,d=(e.min.z-h.z)*m),i>d||l>s)||((l>i||i!==i)&&(i=l),(d<s||s!==s)&&(s=d),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,i,s,r){Ar.subVectors(t,e),us.subVectors(i,e),Rr.crossVectors(Ar,us);let a=this.direction.dot(Rr),l;if(a>0){if(s)return null;l=1}else if(a<0)l=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const d=l*this.direction.dot(us.crossVectors(Ln,us));if(d<0)return null;const c=l*this.direction.dot(Ar.cross(Ln));if(c<0||d+c>a)return null;const f=-l*Ln.dot(Rr);return f<0?null:this.at(f/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gi extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qo=new dt,Vn=new Lc,hs=new Js,el=new j,fs=new j,ps=new j,ms=new j,Cr=new j,gs=new j,tl=new j,_s=new j;class jt extends Pt{constructor(e=new Kt,t=new Gi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(r&&l){gs.set(0,0,0);for(let d=0,c=r.length;d<c;d++){const f=l[d],m=r[d];f!==0&&(Cr.fromBufferAttribute(m,e),a?gs.addScaledVector(Cr,f):gs.addScaledVector(Cr.sub(t),f))}t.add(gs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(r),Vn.copy(e.ray).recast(e.near),!(hs.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(hs,el)===null||Vn.origin.distanceToSquared(el)>(e.far-e.near)**2))&&(Qo.copy(r).invert(),Vn.copy(e.ray).applyMatrix4(Qo),!(i.boundingBox!==null&&Vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,l=r.index,d=r.attributes.position,c=r.attributes.uv,f=r.attributes.uv1,m=r.attributes.normal,h=r.groups,g=r.drawRange;if(l!==null)if(Array.isArray(a))for(let _=0,M=h.length;_<M;_++){const p=h[_],u=a[p.materialIndex],w=Math.max(p.start,g.start),C=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let S=w,b=C;S<b;S+=3){const E=l.getX(S),R=l.getX(S+1),v=l.getX(S+2);s=xs(this,u,e,i,c,f,m,E,R,v),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),M=Math.min(l.count,g.start+g.count);for(let p=_,u=M;p<u;p+=3){const w=l.getX(p),C=l.getX(p+1),S=l.getX(p+2);s=xs(this,a,e,i,c,f,m,w,C,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(a))for(let _=0,M=h.length;_<M;_++){const p=h[_],u=a[p.materialIndex],w=Math.max(p.start,g.start),C=Math.min(d.count,Math.min(p.start+p.count,g.start+g.count));for(let S=w,b=C;S<b;S+=3){const E=S,R=S+1,v=S+2;s=xs(this,u,e,i,c,f,m,E,R,v),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),M=Math.min(d.count,g.start+g.count);for(let p=_,u=M;p<u;p+=3){const w=p,C=p+1,S=p+2;s=xs(this,a,e,i,c,f,m,w,C,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function ch(n,e,t,i,s,r,a,l){let d;if(e.side===It?d=i.intersectTriangle(a,r,s,!0,l):d=i.intersectTriangle(s,r,a,e.side===On,l),d===null)return null;_s.copy(l),_s.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(_s);return c<t.near||c>t.far?null:{distance:c,point:_s.clone(),object:n}}function xs(n,e,t,i,s,r,a,l,d,c){n.getVertexPosition(l,fs),n.getVertexPosition(d,ps),n.getVertexPosition(c,ms);const f=ch(n,e,t,i,fs,ps,ms,tl);if(f){const m=new j;Yt.getBarycoord(tl,fs,ps,ms,m),s&&(f.uv=Yt.getInterpolatedAttribute(s,l,d,c,m,new et)),r&&(f.uv1=Yt.getInterpolatedAttribute(r,l,d,c,m,new et)),a&&(f.normal=Yt.getInterpolatedAttribute(a,l,d,c,m,new j),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:l,b:d,c,normal:new j,materialIndex:0};Yt.getNormal(fs,ps,ms,h.normal),f.face=h,f.barycoord=m}return f}class dh extends Ct{constructor(e=null,t=1,i=1,s,r,a,l,d,c=Et,f=Et,m,h){super(null,a,l,d,c,f,s,r,m,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nr=new j,uh=new j,hh=new Oe;class Wn{constructor(e=new j(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Nr.subVectors(i,t).cross(uh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Nr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hh.getNormalMatrix(e),s=this.coplanarPoint(Nr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Js,fh=new et(.5,.5),vs=new j;class Ka{constructor(e=new Wn,t=new Wn,i=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(s),l[4].copy(r),l[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=on,i=!1){const s=this.planes,r=e.elements,a=r[0],l=r[1],d=r[2],c=r[3],f=r[4],m=r[5],h=r[6],g=r[7],_=r[8],M=r[9],p=r[10],u=r[11],w=r[12],C=r[13],S=r[14],b=r[15];if(s[0].setComponents(c-a,g-f,u-_,b-w).normalize(),s[1].setComponents(c+a,g+f,u+_,b+w).normalize(),s[2].setComponents(c+l,g+m,u+M,b+C).normalize(),s[3].setComponents(c-l,g-m,u-M,b-C).normalize(),i)s[4].setComponents(d,h,p,S).normalize(),s[5].setComponents(c-d,g-h,u-p,b-S).normalize();else if(s[4].setComponents(c-d,g-h,u-p,b-S).normalize(),t===on)s[5].setComponents(c+d,g+h,u+p,b+S).normalize();else if(t===ji)s[5].setComponents(d,h,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){Hn.center.set(0,0,0);const t=fh.distanceTo(e.center);return Hn.radius=.7071067811865476+t,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(vs.x=s.normal.x>0?e.max.x:e.min.x,vs.y=s.normal.y>0?e.max.y:e.min.y,vs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ic extends Yi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nl=new dt,Ia=new Lc,Ms=new Js,Ss=new j;class ph extends Pt{constructor(e=new Kt,t=new Ic){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ms.copy(i.boundingSphere),Ms.applyMatrix4(s),Ms.radius+=r,e.ray.intersectsSphere(Ms)===!1)return;nl.copy(s).invert(),Ia.copy(e.ray).applyMatrix4(nl);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=l*l,c=i.index,m=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let _=h,M=g;_<M;_++){const p=c.getX(_);Ss.fromBufferAttribute(m,p),il(Ss,p,d,s,e,t,this)}}else{const h=Math.max(0,a.start),g=Math.min(m.count,a.start+a.count);for(let _=h,M=g;_<M;_++)Ss.fromBufferAttribute(m,_),il(Ss,_,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function il(n,e,t,i,s,r,a){const l=Ia.distanceSqToPoint(n);if(l<t){const d=new j;Ia.closestPointToPoint(n,d),d.applyMatrix4(i);const c=s.ray.origin.distanceTo(d);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(l),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Uc extends Ct{constructor(e=[],t=Kn,i,s,r,a,l,d,c,f){super(e,t,i,s,r,a,l,d,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mh extends Ct{constructor(e,t,i,s,r,a,l,d,c){super(e,t,i,s,r,a,l,d,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wi extends Ct{constructor(e,t,i=dn,s,r,a,l=Et,d=Et,c,f=Tn,m=1){if(f!==Tn&&f!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:m};super(h,s,r,a,l,d,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ya(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class gh extends wi{constructor(e,t=dn,i=Kn,s,r,a=Et,l=Et,d,c=Tn){const f={width:e,height:e,depth:1},m=[f,f,f,f,f,f];super(e,e,t,i,s,r,a,l,d,c),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Fc extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zi extends Kt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const l=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const d=[],c=[],f=[],m=[];let h=0,g=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(d),this.setAttribute("position",new En(c,3)),this.setAttribute("normal",new En(f,3)),this.setAttribute("uv",new En(m,2));function _(M,p,u,w,C,S,b,E,R,v,A){const P=S/R,D=b/v,F=S/2,Q=b/2,Y=E/2,O=R+1,V=v+1;let k=0,K=0;const se=new j;for(let le=0;le<V;le++){const _e=le*D-Q;for(let be=0;be<O;be++){const He=be*P-F;se[M]=He*w,se[p]=_e*C,se[u]=Y,c.push(se.x,se.y,se.z),se[M]=0,se[p]=0,se[u]=E>0?1:-1,f.push(se.x,se.y,se.z),m.push(be/R),m.push(1-le/v),k+=1}}for(let le=0;le<v;le++)for(let _e=0;_e<R;_e++){const be=h+_e+O*le,He=h+_e+O*(le+1),st=h+(_e+1)+O*(le+1),je=h+(_e+1)+O*le;d.push(be,He,je),d.push(He,st,je),K+=6}l.addGroup(g,K,A),g+=K,h+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ki extends Kt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,l=Math.floor(i),d=Math.floor(s),c=l+1,f=d+1,m=e/l,h=t/d,g=[],_=[],M=[],p=[];for(let u=0;u<f;u++){const w=u*h-a;for(let C=0;C<c;C++){const S=C*m-r;_.push(S,-w,0),M.push(0,0,1),p.push(C/l),p.push(1-u/d)}}for(let u=0;u<d;u++)for(let w=0;w<l;w++){const C=w+c*u,S=w+c*(u+1),b=w+1+c*(u+1),E=w+1+c*u;g.push(C,S,E),g.push(S,b,E)}this.setIndex(g),this.setAttribute("position",new En(_,3)),this.setAttribute("normal",new En(M,3)),this.setAttribute("uv",new En(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ai(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(sl(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(sl(s[0])){const r=[];for(let a=0,l=s.length;a<l;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=Ai(n[t]);for(const s in i)e[s]=i[s]}return e}function sl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function _h(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Oc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const xh={clone:Ai,merge:Nt};var vh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vh,this.fragmentShader=Mh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ai(e.uniforms),this.uniformsGroups=_h(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ze().setHex(s.value);break;case"v2":this.uniforms[i].value=new et().fromArray(s.value);break;case"v3":this.uniforms[i].value=new j().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ct().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new dt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Sh extends un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class yh extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Eh extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Bc extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Pr=new dt,rl=new j,al=new j;class bh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.mapType=kt,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;rl.setFromMatrixPosition(e.matrixWorld),t.position.copy(rl),al.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(al),t.updateMatrixWorld(),Pr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ji||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Pr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ys=new j,Es=new Ri,tn=new j;class zc extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ys,Es,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ys,Es,tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ys,Es,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ys,Es,tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const In=new j,ol=new et,ll=new et;class zt extends zc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=La*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return La*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(In.x,In.y).multiplyScalar(-e/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(In.x,In.y).multiplyScalar(-e/In.z)}getViewSize(e,t){return this.getViewBounds(e,ol,ll),t.subVectors(ll,ol)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(or*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const d=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/d,t-=a.offsetY*i/c,s*=a.width/d,i*=a.height/c}const l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Th extends bh{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0}}class Dr extends Bc{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Th}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class kc extends zc{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,l=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,l-=f*this.view.offsetY,d=l-f*this.view.height}this.projectionMatrix.makeOrthographic(r,a,l,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class wh extends Bc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const mi=-90,gi=1;class Ah extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zt(mi,gi,e,t);s.layers=this.layers,this.add(s);const r=new zt(mi,gi,e,t);r.layers=this.layers,this.add(r);const a=new zt(mi,gi,e,t);a.layers=this.layers,this.add(a);const l=new zt(mi,gi,e,t);l.layers=this.layers,this.add(l);const d=new zt(mi,gi,e,t);d.layers=this.layers,this.add(d);const c=new zt(mi,gi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,l,d]=t;for(const c of t)this.remove(c);if(e===on)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===ji)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,l,d,c,f]=this.children,m=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(m,h,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Rh extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const no=class no{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};no.prototype.isMatrix2=!0;let cl=no;function dl(n,e,t,i){const s=Ch(i);switch(t){case bc:return n*e;case wc:return n*e/s.components*s.byteLength;case Wa:return n*e/s.components*s.byteLength;case Jn:return n*e*2/s.components*s.byteLength;case ja:return n*e*2/s.components*s.byteLength;case Tc:return n*e*3/s.components*s.byteLength;case Zt:return n*e*4/s.components*s.byteLength;case Xa:return n*e*4/s.components*s.byteLength;case Cs:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ps:case Ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sa:case aa:return Math.max(n,16)*Math.max(e,8)/4;case ia:case ra:return Math.max(n,8)*Math.max(e,8)/2;case oa:case la:case da:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ca:case ks:case ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ma:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ga:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case _a:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case va:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ya:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ba:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case wa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Aa:case Ra:case Ca:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Na:case Pa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Gs:case Da:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ch(n){switch(n){case kt:case Mc:return{byteLength:1,components:1};case Hi:case Sc:case bn:return{byteLength:2,components:1};case Va:case Ha:return{byteLength:2,components:4};case dn:case Ga:case an:return{byteLength:4,components:1};case yc:case Ec:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ka}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ka);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gc(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Nh(n){const e=new WeakMap;function t(l,d){const c=l.array,f=l.usage,m=c.byteLength,h=n.createBuffer();n.bindBuffer(d,h),n.bufferData(d,c,f),l.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:m}}function i(l,d,c){const f=d.array,m=d.updateRanges;if(n.bindBuffer(c,l),m.length===0)n.bufferSubData(c,0,f);else{m.sort((g,_)=>g.start-_.start);let h=0;for(let g=1;g<m.length;g++){const _=m[h],M=m[g];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++h,m[h]=M)}m.length=h+1;for(let g=0,_=m.length;g<_;g++){const M=m[g];n.bufferSubData(c,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=e.get(l);d&&(n.deleteBuffer(d.buffer),e.delete(l))}function a(l,d){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const f=e.get(l);(!f||f.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,t(l,d));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,d),c.version=l.version}}return{get:s,remove:r,update:a}}var Ph=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dh=`#ifdef USE_ALPHAHASH
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
#endif`,Lh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ih=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Oh=`#ifdef USE_AOMAP
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
#endif`,Bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zh=`#ifdef USE_BATCHING
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
#endif`,kh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wh=`#ifdef USE_IRIDESCENCE
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
#endif`,jh=`#ifdef USE_BUMPMAP
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
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ef=`#define PI 3.141592653589793
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
} // validated`,tf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nf=`vec3 transformedNormal = objectNormal;
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
#endif`,sf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,of=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lf="gl_FragColor = linearToOutputTexel( gl_FragColor );",cf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,df=`#ifdef USE_ENVMAP
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
#endif`,uf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
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
#endif`,ff=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pf=`#ifdef USE_ENVMAP
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
#endif`,mf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vf=`#ifdef USE_GRADIENTMAP
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
}`,Mf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ef=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,bf=`#ifdef USE_ENVMAP
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
#endif`,Tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cf=`PhysicalMaterial material;
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
#endif`,Nf=`uniform sampler2D dfgLUT;
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
}`,Pf=`
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
#endif`,Df=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,If=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Uf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ff=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Of=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vf=`#if defined( USE_POINTS_UV )
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
#endif`,Hf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$f=`#ifdef USE_MORPHTARGETS
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
#endif`,Yf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ep=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,tp=`#ifdef USE_NORMALMAP
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
#endif`,np=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ap=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,op=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_p=`float getShadowMask() {
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
}`,xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vp=`#ifdef USE_SKINNING
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
#endif`,Mp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sp=`#ifdef USE_SKINNING
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
#endif`,yp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ep=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wp=`#ifdef USE_TRANSMISSION
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
#endif`,Ap=`#ifdef USE_TRANSMISSION
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
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lp=`uniform sampler2D t2D;
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Up=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`#include <common>
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
}`,zp=`#if DEPTH_PACKING == 3200
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
}`,kp=`#define DISTANCE
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
}`,Gp=`#define DISTANCE
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
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`uniform float scale;
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
}`,jp=`uniform vec3 diffuse;
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
}`,Xp=`#include <common>
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
}`,qp=`uniform vec3 diffuse;
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
}`,$p=`#define LAMBERT
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
}`,Yp=`#define LAMBERT
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
}`,Zp=`#define MATCAP
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
}`,Kp=`#define MATCAP
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
}`,Jp=`#define NORMAL
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
}`,Qp=`#define NORMAL
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
}`,em=`#define PHONG
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
}`,tm=`#define PHONG
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
}`,nm=`#define STANDARD
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
}`,im=`#define STANDARD
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
}`,sm=`#define TOON
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
}`,rm=`#define TOON
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
}`,am=`uniform float size;
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
}`,om=`uniform vec3 diffuse;
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
}`,lm=`#include <common>
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
}`,cm=`uniform vec3 color;
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
}`,dm=`uniform float rotation;
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
}`,um=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Ph,alphahash_pars_fragment:Dh,alphamap_fragment:Lh,alphamap_pars_fragment:Ih,alphatest_fragment:Uh,alphatest_pars_fragment:Fh,aomap_fragment:Oh,aomap_pars_fragment:Bh,batching_pars_vertex:zh,batching_vertex:kh,begin_vertex:Gh,beginnormal_vertex:Vh,bsdfs:Hh,iridescence_fragment:Wh,bumpmap_pars_fragment:jh,clipping_planes_fragment:Xh,clipping_planes_pars_fragment:qh,clipping_planes_pars_vertex:$h,clipping_planes_vertex:Yh,color_fragment:Zh,color_pars_fragment:Kh,color_pars_vertex:Jh,color_vertex:Qh,common:ef,cube_uv_reflection_fragment:tf,defaultnormal_vertex:nf,displacementmap_pars_vertex:sf,displacementmap_vertex:rf,emissivemap_fragment:af,emissivemap_pars_fragment:of,colorspace_fragment:lf,colorspace_pars_fragment:cf,envmap_fragment:df,envmap_common_pars_fragment:uf,envmap_pars_fragment:hf,envmap_pars_vertex:ff,envmap_physical_pars_fragment:bf,envmap_vertex:pf,fog_vertex:mf,fog_pars_vertex:gf,fog_fragment:_f,fog_pars_fragment:xf,gradientmap_pars_fragment:vf,lightmap_pars_fragment:Mf,lights_lambert_fragment:Sf,lights_lambert_pars_fragment:yf,lights_pars_begin:Ef,lights_toon_fragment:Tf,lights_toon_pars_fragment:wf,lights_phong_fragment:Af,lights_phong_pars_fragment:Rf,lights_physical_fragment:Cf,lights_physical_pars_fragment:Nf,lights_fragment_begin:Pf,lights_fragment_maps:Df,lights_fragment_end:Lf,lightprobes_pars_fragment:If,logdepthbuf_fragment:Uf,logdepthbuf_pars_fragment:Ff,logdepthbuf_pars_vertex:Of,logdepthbuf_vertex:Bf,map_fragment:zf,map_pars_fragment:kf,map_particle_fragment:Gf,map_particle_pars_fragment:Vf,metalnessmap_fragment:Hf,metalnessmap_pars_fragment:Wf,morphinstance_vertex:jf,morphcolor_vertex:Xf,morphnormal_vertex:qf,morphtarget_pars_vertex:$f,morphtarget_vertex:Yf,normal_fragment_begin:Zf,normal_fragment_maps:Kf,normal_pars_fragment:Jf,normal_pars_vertex:Qf,normal_vertex:ep,normalmap_pars_fragment:tp,clearcoat_normal_fragment_begin:np,clearcoat_normal_fragment_maps:ip,clearcoat_pars_fragment:sp,iridescence_pars_fragment:rp,opaque_fragment:ap,packing:op,premultiplied_alpha_fragment:lp,project_vertex:cp,dithering_fragment:dp,dithering_pars_fragment:up,roughnessmap_fragment:hp,roughnessmap_pars_fragment:fp,shadowmap_pars_fragment:pp,shadowmap_pars_vertex:mp,shadowmap_vertex:gp,shadowmask_pars_fragment:_p,skinbase_vertex:xp,skinning_pars_vertex:vp,skinning_vertex:Mp,skinnormal_vertex:Sp,specularmap_fragment:yp,specularmap_pars_fragment:Ep,tonemapping_fragment:bp,tonemapping_pars_fragment:Tp,transmission_fragment:wp,transmission_pars_fragment:Ap,uv_pars_fragment:Rp,uv_pars_vertex:Cp,uv_vertex:Np,worldpos_vertex:Pp,background_vert:Dp,background_frag:Lp,backgroundCube_vert:Ip,backgroundCube_frag:Up,cube_vert:Fp,cube_frag:Op,depth_vert:Bp,depth_frag:zp,distance_vert:kp,distance_frag:Gp,equirect_vert:Vp,equirect_frag:Hp,linedashed_vert:Wp,linedashed_frag:jp,meshbasic_vert:Xp,meshbasic_frag:qp,meshlambert_vert:$p,meshlambert_frag:Yp,meshmatcap_vert:Zp,meshmatcap_frag:Kp,meshnormal_vert:Jp,meshnormal_frag:Qp,meshphong_vert:em,meshphong_frag:tm,meshphysical_vert:nm,meshphysical_frag:im,meshtoon_vert:sm,meshtoon_frag:rm,points_vert:am,points_frag:om,shadow_vert:lm,shadow_frag:cm,sprite_vert:dm,sprite_frag:um},Me={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},rn={basic:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ze(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Nt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Nt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Nt([Me.points,Me.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Nt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Nt([Me.common,Me.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Nt([Me.sprite,Me.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Nt([Me.common,Me.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Nt([Me.lights,Me.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};rn.physical={uniforms:Nt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const bs={r:0,b:0,g:0},hm=new dt,Vc=new Oe;Vc.set(-1,0,0,0,1,0,0,0,1);function fm(n,e,t,i,s,r){const a=new Ze(0);let l=s===!0?0:1,d,c,f=null,m=0,h=null;function g(w){let C=w.isScene===!0?w.background:null;if(C&&C.isTexture){const S=w.backgroundBlurriness>0;C=e.get(C,S)}return C}function _(w){let C=!1;const S=g(w);S===null?p(a,l):S&&S.isColor&&(p(S,1),C=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(w,C){const S=g(C);S&&(S.isCubeTexture||S.mapping===Ks)?(c===void 0&&(c=new jt(new Zi(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Ai(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(hm.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Vc),c.material.toneMapped=$e.getTransfer(S.colorSpace)!==nt,(f!==S||m!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,f=S,m=S.version,h=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(d===void 0&&(d=new jt(new Ki(2,2),new un({name:"BackgroundMaterial",uniforms:Ai(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(d)),d.material.uniforms.t2D.value=S,d.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,d.material.toneMapped=$e.getTransfer(S.colorSpace)!==nt,S.matrixAutoUpdate===!0&&S.updateMatrix(),d.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||m!==S.version||h!==n.toneMapping)&&(d.material.needsUpdate=!0,f=S,m=S.version,h=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null))}function p(w,C){w.getRGB(bs,Oc(n)),t.buffers.color.setClear(bs.r,bs.g,bs.b,C,r)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,C=1){a.set(w),l=C,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(a,l)},render:_,addToRenderList:M,dispose:u}}function pm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function l(D,F,Q,Y,O){let V=!1;const k=m(D,Y,Q,F);r!==k&&(r=k,c(r.object)),V=g(D,Y,Q,O),V&&_(D,Y,Q,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,S(D,F,Q,Y),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function d(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function f(D){return n.deleteVertexArray(D)}function m(D,F,Q,Y){const O=Y.wireframe===!0;let V=i[F.id];V===void 0&&(V={},i[F.id]=V);const k=D.isInstancedMesh===!0?D.id:0;let K=V[k];K===void 0&&(K={},V[k]=K);let se=K[Q.id];se===void 0&&(se={},K[Q.id]=se);let le=se[O];return le===void 0&&(le=h(d()),se[O]=le),le}function h(D){const F=[],Q=[],Y=[];for(let O=0;O<t;O++)F[O]=0,Q[O]=0,Y[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Q,attributeDivisors:Y,object:D,attributes:{},index:null}}function g(D,F,Q,Y){const O=r.attributes,V=F.attributes;let k=0;const K=Q.getAttributes();for(const se in K)if(K[se].location>=0){const _e=O[se];let be=V[se];if(be===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(be=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(be=D.instanceColor)),_e===void 0||_e.attribute!==be||be&&_e.data!==be.data)return!0;k++}return r.attributesNum!==k||r.index!==Y}function _(D,F,Q,Y){const O={},V=F.attributes;let k=0;const K=Q.getAttributes();for(const se in K)if(K[se].location>=0){let _e=V[se];_e===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor));const be={};be.attribute=_e,_e&&_e.data&&(be.data=_e.data),O[se]=be,k++}r.attributes=O,r.attributesNum=k,r.index=Y}function M(){const D=r.newAttributes;for(let F=0,Q=D.length;F<Q;F++)D[F]=0}function p(D){u(D,0)}function u(D,F){const Q=r.newAttributes,Y=r.enabledAttributes,O=r.attributeDivisors;Q[D]=1,Y[D]===0&&(n.enableVertexAttribArray(D),Y[D]=1),O[D]!==F&&(n.vertexAttribDivisor(D,F),O[D]=F)}function w(){const D=r.newAttributes,F=r.enabledAttributes;for(let Q=0,Y=F.length;Q<Y;Q++)F[Q]!==D[Q]&&(n.disableVertexAttribArray(Q),F[Q]=0)}function C(D,F,Q,Y,O,V,k){k===!0?n.vertexAttribIPointer(D,F,Q,O,V):n.vertexAttribPointer(D,F,Q,Y,O,V)}function S(D,F,Q,Y){M();const O=Y.attributes,V=Q.getAttributes(),k=F.defaultAttributeValues;for(const K in V){const se=V[K];if(se.location>=0){let le=O[K];if(le===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(le=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(le=D.instanceColor)),le!==void 0){const _e=le.normalized,be=le.itemSize,He=e.get(le);if(He===void 0)continue;const st=He.buffer,je=He.type,Z=He.bytesPerElement,he=je===n.INT||je===n.UNSIGNED_INT||le.gpuType===Ga;if(le.isInterleavedBufferAttribute){const G=le.data,me=G.stride,ce=le.offset;if(G.isInstancedInterleavedBuffer){for(let fe=0;fe<se.locationSize;fe++)u(se.location+fe,G.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let fe=0;fe<se.locationSize;fe++)p(se.location+fe);n.bindBuffer(n.ARRAY_BUFFER,st);for(let fe=0;fe<se.locationSize;fe++)C(se.location+fe,be/se.locationSize,je,_e,me*Z,(ce+be/se.locationSize*fe)*Z,he)}else{if(le.isInstancedBufferAttribute){for(let G=0;G<se.locationSize;G++)u(se.location+G,le.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let G=0;G<se.locationSize;G++)p(se.location+G);n.bindBuffer(n.ARRAY_BUFFER,st);for(let G=0;G<se.locationSize;G++)C(se.location+G,be/se.locationSize,je,_e,be*Z,be/se.locationSize*G*Z,he)}}else if(k!==void 0){const _e=k[K];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(se.location,_e);break;case 3:n.vertexAttrib3fv(se.location,_e);break;case 4:n.vertexAttrib4fv(se.location,_e);break;default:n.vertexAttrib1fv(se.location,_e)}}}}w()}function b(){A();for(const D in i){const F=i[D];for(const Q in F){const Y=F[Q];for(const O in Y){const V=Y[O];for(const k in V)f(V[k].object),delete V[k];delete Y[O]}}delete i[D]}}function E(D){if(i[D.id]===void 0)return;const F=i[D.id];for(const Q in F){const Y=F[Q];for(const O in Y){const V=Y[O];for(const k in V)f(V[k].object),delete V[k];delete Y[O]}}delete i[D.id]}function R(D){for(const F in i){const Q=i[F];for(const Y in Q){const O=Q[Y];if(O[D.id]===void 0)continue;const V=O[D.id];for(const k in V)f(V[k].object),delete V[k];delete O[D.id]}}}function v(D){for(const F in i){const Q=i[F],Y=D.isInstancedMesh===!0?D.id:0,O=Q[Y];if(O!==void 0){for(const V in O){const k=O[V];for(const K in k)f(k[K].object),delete k[K];delete O[V]}delete Q[Y],Object.keys(Q).length===0&&delete i[F]}}}function A(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:A,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:p,disableUnusedAttributes:w}}function mm(n,e,t){let i;function s(d){i=d}function r(d,c){n.drawArrays(i,d,c),t.update(c,i,1)}function a(d,c,f){f!==0&&(n.drawArraysInstanced(i,d,c,f),t.update(c,i,f))}function l(d,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,c,0,f);let h=0;for(let g=0;g<f;g++)h+=c[g];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=l}function gm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Zt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(R){const v=R===bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==kt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==an&&!v)}function d(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=d(c);f!==c&&(Fe("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const m=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:m,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:w,maxVaryings:C,maxFragmentUniforms:S,maxSamples:b,samples:E}}function _m(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Wn,l=new Oe,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(m,h){const g=m.length!==0||h||i!==0||s;return s=h,i=m.length,g},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,h){t=f(m,h,0)},this.setState=function(m,h,g){const _=m.clippingPlanes,M=m.clipIntersection,p=m.clipShadows,u=n.get(m);if(!s||_===null||_.length===0||r&&!p)r?f(null):c();else{const w=r?0:i,C=w*4;let S=u.clippingState||null;d.value=S,S=f(_,h,C,g);for(let b=0;b!==C;++b)S[b]=t[b];u.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function c(){d.value!==t&&(d.value=t,d.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(m,h,g,_){const M=m!==null?m.length:0;let p=null;if(M!==0){if(p=d.value,_!==!0||p===null){const u=g+M*4,w=h.matrixWorldInverse;l.getNormalMatrix(w),(p===null||p.length<u)&&(p=new Float32Array(u));for(let C=0,S=g;C!==M;++C,S+=4)a.copy(m[C]).applyMatrix4(w,l),a.normal.toArray(p,S),p[S+3]=a.constant}d.value=p,d.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}const Fn=4,ul=[.125,.215,.35,.446,.526,.582],Xn=20,xm=256,Ui=new kc,hl=new Ze;let Lr=null,Ir=0,Ur=0,Fr=!1;const vm=new j;class fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:l=vm}=r;Lr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),Fr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,i,s,d,l),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lr,Ir,Ur),this._renderer.xr.enabled=Fr,e.scissorTest=!1,_i(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Kn||e.mapping===Ti?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),Fr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:bn,format:Zt,colorSpace:Vs,depthBuffer:!1},s=pl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Mm(r)),this._blurMaterial=ym(r,e,t),this._ggxMaterial=Sm(r,e,t)}return s}_compileMaterial(e){const t=new jt(new Kt,e);this._renderer.compile(t,Ui)}_sceneToCubeUV(e,t,i,s,r){const d=new zt(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],m=this._renderer,h=m.autoClear,g=m.toneMapping;m.getClearColor(hl),m.toneMapping=ln,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(s),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new Zi,new Gi({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let u=!1;const w=e.background;w?w.isColor&&(p.color.copy(w),e.background=null,u=!0):(p.color.copy(hl),u=!0);for(let C=0;C<6;C++){const S=C%3;S===0?(d.up.set(0,c[C],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+f[C],r.y,r.z)):S===1?(d.up.set(0,0,c[C]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+f[C],r.z)):(d.up.set(0,c[C],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+f[C]));const b=this._cubeSize;_i(s,S*b,C>2?b:0,b,b),m.setRenderTarget(s),u&&m.render(M,d),m.render(e,d)}m.toneMapping=g,m.autoClear=h,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Kn||e.mapping===Ti;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ml());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const l=r.uniforms;l.envMap.value=e;const d=this._cubeSize;_i(t,0,0,3*d,2*d),i.setRenderTarget(t),i.render(a,Ui)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,l=this._lodMeshes[i];l.material=a;const d=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),m=Math.sqrt(c*c-f*f),h=0+c*1.25,g=m*h,{_lodMax:_}=this,M=this._sizeLods[i],p=3*M*(i>_-Fn?i-_+Fn:0),u=4*(this._cubeSize-M);d.envMap.value=e.texture,d.roughness.value=g,d.mipInt.value=_-t,_i(r,p,u,3*M,2*M),s.setRenderTarget(r),s.render(l,Ui),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=_-i,_i(e,p,u,3*M,2*M),s.setRenderTarget(e),s.render(l,Ui)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,l){const d=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const f=3,m=this._lodMeshes[s];m.material=c;const h=c.uniforms,g=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Xn-1),M=r/_,p=isFinite(r)?1+Math.floor(f*M):Xn;p>Xn&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Xn}`);const u=[];let w=0;for(let R=0;R<Xn;++R){const v=R/M,A=Math.exp(-v*v/2);u.push(A),R===0?w+=A:R<p&&(w+=2*A)}for(let R=0;R<u.length;R++)u[R]=u[R]/w;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=u,h.latitudinal.value=a==="latitudinal",l&&(h.poleAxis.value=l);const{_lodMax:C}=this;h.dTheta.value=_,h.mipInt.value=C-i;const S=this._sizeLods[s],b=3*S*(s>C-Fn?s-C+Fn:0),E=4*(this._cubeSize-S);_i(t,b,E,3*S,2*S),d.setRenderTarget(t),d.render(m,Ui)}}function Mm(n){const e=[],t=[],i=[];let s=n;const r=n-Fn+1+ul.length;for(let a=0;a<r;a++){const l=Math.pow(2,s);e.push(l);let d=1/l;a>n-Fn?d=ul[a-n+Fn-1]:a===0&&(d=0),t.push(d);const c=1/(l-2),f=-c,m=1+c,h=[f,f,m,f,m,m,f,f,m,m,f,m],g=6,_=6,M=3,p=2,u=1,w=new Float32Array(M*_*g),C=new Float32Array(p*_*g),S=new Float32Array(u*_*g);for(let E=0;E<g;E++){const R=E%3*2/3-1,v=E>2?0:-1,A=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];w.set(A,M*_*E),C.set(h,p*_*E);const P=[E,E,E,E,E,E];S.set(P,u*_*E)}const b=new Kt;b.setAttribute("position",new Wt(w,M)),b.setAttribute("uv",new Wt(C,p)),b.setAttribute("faceIndex",new Wt(S,u)),i.push(new jt(b,null)),s>Fn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function pl(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=Ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _i(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Sm(n,e,t){return new un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qs(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ym(n,e,t){const i=new Float32Array(Xn),s=new j(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Qs(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ml(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qs(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function gl(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Qs(){return`

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
	`}class Hc extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Uc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Zi(5,5,5),r=new un({name:"CubemapFromEquirect",uniforms:Ai(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:It,blending:Sn});r.uniforms.tEquirect.value=t;const a=new jt(s,r),l=t.minFilter;return t.minFilter===qn&&(t.minFilter=Rt),new Ah(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Em(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,g=!1){return h==null?null:g?a(h):r(h)}function r(h){if(h&&h.isTexture){const g=h.mapping;if(g===sr||g===rr)if(e.has(h)){const _=e.get(h).texture;return l(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const M=new Hc(_.height);return M.fromEquirectangularTexture(n,h),e.set(h,M),h.addEventListener("dispose",c),l(M.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const g=h.mapping,_=g===sr||g===rr,M=g===Kn||g===Ti;if(_||M){let p=t.get(h);const u=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==u)return i===null&&(i=new fl(n)),p=_?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{const w=h.image;return _&&w&&w.height>0||M&&w&&d(w)?(i===null&&(i=new fl(n)),p=_?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",f),p.texture):null}}}return h}function l(h,g){return g===sr?h.mapping=Kn:g===rr&&(h.mapping=Ti),h}function d(h){let g=0;const _=6;for(let M=0;M<_;M++)h[M]!==void 0&&g++;return g===_}function c(h){const g=h.target;g.removeEventListener("dispose",c);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function f(h){const g=h.target;g.removeEventListener("dispose",f);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:m}}function bm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Mi("WebGLRenderer: "+i+" extension not supported."),s}}}function Tm(n,e,t,i){const s={},r=new WeakMap;function a(m){const h=m.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];const g=r.get(h);g&&(e.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function l(m,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function d(m){const h=m.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER)}function c(m){const h=[],g=m.index,_=m.attributes.position;let M=0;if(_===void 0)return;if(g!==null){const w=g.array;M=g.version;for(let C=0,S=w.length;C<S;C+=3){const b=w[C+0],E=w[C+1],R=w[C+2];h.push(b,E,E,R,R,b)}}else{const w=_.array;M=_.version;for(let C=0,S=w.length/3-1;C<S;C+=3){const b=C+0,E=C+1,R=C+2;h.push(b,E,E,R,R,b)}}const p=new(_.count>=65535?Dc:Pc)(h,1);p.version=M;const u=r.get(m);u&&e.remove(u),r.set(m,p)}function f(m){const h=r.get(m);if(h){const g=m.index;g!==null&&h.version<g.version&&c(m)}else c(m);return r.get(m)}return{get:l,update:d,getWireframeAttribute:f}}function wm(n,e,t){let i;function s(m){i=m}let r,a;function l(m){r=m.type,a=m.bytesPerElement}function d(m,h){n.drawElements(i,h,r,m*a),t.update(h,i,1)}function c(m,h,g){g!==0&&(n.drawElementsInstanced(i,h,r,m*a,g),t.update(h,i,g))}function f(m,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,m,0,g);let M=0;for(let p=0;p<g;p++)M+=h[p];t.update(M,i,1)}this.setMode=s,this.setIndex=l,this.render=d,this.renderInstances=c,this.renderMultiDraw=f}function Am(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,l){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=l*(r/3);break;case n.LINES:t.lines+=l*(r/2);break;case n.LINE_STRIP:t.lines+=l*(r-1);break;case n.LINE_LOOP:t.lines+=l*r;break;case n.POINTS:t.points+=l*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Rm(n,e,t){const i=new WeakMap,s=new ct;function r(a,l,d){const c=a.morphTargetInfluences,f=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,m=f!==void 0?f.length:0;let h=i.get(l);if(h===void 0||h.count!==m){let A=function(){R.dispose(),i.delete(l),l.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const g=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,M=l.morphAttributes.color!==void 0,p=l.morphAttributes.position||[],u=l.morphAttributes.normal||[],w=l.morphAttributes.color||[];let C=0;g===!0&&(C=1),_===!0&&(C=2),M===!0&&(C=3);let S=l.attributes.position.count*C,b=1;S>e.maxTextureSize&&(b=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*b*4*m),R=new Rc(E,S,b,m);R.type=an,R.needsUpdate=!0;const v=C*4;for(let P=0;P<m;P++){const D=p[P],F=u[P],Q=w[P],Y=S*b*4*P;for(let O=0;O<D.count;O++){const V=O*v;g===!0&&(s.fromBufferAttribute(D,O),E[Y+V+0]=s.x,E[Y+V+1]=s.y,E[Y+V+2]=s.z,E[Y+V+3]=0),_===!0&&(s.fromBufferAttribute(F,O),E[Y+V+4]=s.x,E[Y+V+5]=s.y,E[Y+V+6]=s.z,E[Y+V+7]=0),M===!0&&(s.fromBufferAttribute(Q,O),E[Y+V+8]=s.x,E[Y+V+9]=s.y,E[Y+V+10]=s.z,E[Y+V+11]=Q.itemSize===4?s.w:1)}}h={count:m,texture:R,size:new et(S,b)},i.set(l,h),l.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let M=0;M<c.length;M++)g+=c[M];const _=l.morphTargetsRelative?1:1-g;d.getUniforms().setValue(n,"morphTargetBaseInfluence",_),d.getUniforms().setValue(n,"morphTargetInfluences",c)}d.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Cm(n,e,t,i,s){let r=new WeakMap;function a(c){const f=s.render.frame,m=c.geometry,h=e.get(c,m);if(r.get(h)!==f&&(e.update(h),r.set(h,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",d)===!1&&c.addEventListener("dispose",d),r.get(c)!==f&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const g=c.skeleton;r.get(g)!==f&&(g.update(),r.set(g,f))}return h}function l(){r=new WeakMap}function d(c){const f=c.target;f.removeEventListener("dispose",d),i.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:l}}const Nm={[hc]:"LINEAR_TONE_MAPPING",[fc]:"REINHARD_TONE_MAPPING",[pc]:"CINEON_TONE_MAPPING",[mc]:"ACES_FILMIC_TONE_MAPPING",[_c]:"AGX_TONE_MAPPING",[xc]:"NEUTRAL_TONE_MAPPING",[gc]:"CUSTOM_TONE_MAPPING"};function Pm(n,e,t,i,s,r){const a=new cn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new wi(e,t):void 0}),l=new cn(e,t,{type:bn,depthBuffer:!1,stencilBuffer:!1}),d=new Kt;d.setAttribute("position",new En([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new En([0,2,0,0,2,0],2));const c=new Sh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new jt(d,c),m=new kc(-1,1,1,-1,0,1);let h=null,g=null,_=!1,M,p=null,u=[],w=!1;this.setSize=function(C,S){a.setSize(C,S),l.setSize(C,S);for(let b=0;b<u.length;b++){const E=u[b];E.setSize&&E.setSize(C,S)}},this.setEffects=function(C){u=C,w=u.length>0&&u[0].isRenderPass===!0;const S=a.width,b=a.height;for(let E=0;E<u.length;E++){const R=u[E];R.setSize&&R.setSize(S,b)}},this.begin=function(C,S){if(_||C.toneMapping===ln&&u.length===0)return!1;if(p=S,S!==null){const b=S.width,E=S.height;(a.width!==b||a.height!==E)&&this.setSize(b,E)}return w===!1&&C.setRenderTarget(a),M=C.toneMapping,C.toneMapping=ln,!0},this.hasRenderPass=function(){return w},this.end=function(C,S){C.toneMapping=M,_=!0;let b=a,E=l;for(let R=0;R<u.length;R++){const v=u[R];if(v.enabled!==!1&&(v.render(C,E,b,S),v.needsSwap!==!1)){const A=b;b=E,E=A}}if(h!==C.outputColorSpace||g!==C.toneMapping){h=C.outputColorSpace,g=C.toneMapping,c.defines={},$e.getTransfer(h)===nt&&(c.defines.SRGB_TRANSFER="");const R=Nm[g];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,C.setRenderTarget(p),C.render(f,m),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),l.dispose(),d.dispose(),c.dispose()}}const Wc=new Ct,Ua=new wi(1,1),jc=new Rc,Xc=new Zu,qc=new Uc,_l=[],xl=[],vl=new Float32Array(16),Ml=new Float32Array(9),Sl=new Float32Array(4);function Ci(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=_l[s];if(r===void 0&&(r=new Float32Array(s),_l[s]=r),e!==0){i.toArray(r,0);for(let a=1,l=0;a!==e;++a)l+=t,n[a].toArray(r,l)}return r}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function er(n,e){let t=xl[e];t===void 0&&(t=new Int32Array(e),xl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Dm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Lm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Fm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Sl.set(i),n.uniformMatrix2fv(this.addr,!1,Sl),St(t,i)}}function Om(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Ml.set(i),n.uniformMatrix3fv(this.addr,!1,Ml),St(t,i)}}function Bm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;vl.set(i),n.uniformMatrix4fv(this.addr,!1,vl),St(t,i)}}function zm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function Gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function Vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function Hm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function qm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ua.compareFunction=t.isReversedDepthBuffer()?$a:qa,r=Ua):r=Wc,t.setTexture2D(e||r,s)}function $m(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Xc,s)}function Ym(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||qc,s)}function Zm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||jc,s)}function Km(n){switch(n){case 5126:return Dm;case 35664:return Lm;case 35665:return Im;case 35666:return Um;case 35674:return Fm;case 35675:return Om;case 35676:return Bm;case 5124:case 35670:return zm;case 35667:case 35671:return km;case 35668:case 35672:return Gm;case 35669:case 35673:return Vm;case 5125:return Hm;case 36294:return Wm;case 36295:return jm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return Zm}}function Jm(n,e){n.uniform1fv(this.addr,e)}function Qm(n,e){const t=Ci(e,this.size,2);n.uniform2fv(this.addr,t)}function eg(n,e){const t=Ci(e,this.size,3);n.uniform3fv(this.addr,t)}function tg(n,e){const t=Ci(e,this.size,4);n.uniform4fv(this.addr,t)}function ng(n,e){const t=Ci(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ig(n,e){const t=Ci(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function sg(n,e){const t=Ci(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rg(n,e){n.uniform1iv(this.addr,e)}function ag(n,e){n.uniform2iv(this.addr,e)}function og(n,e){n.uniform3iv(this.addr,e)}function lg(n,e){n.uniform4iv(this.addr,e)}function cg(n,e){n.uniform1uiv(this.addr,e)}function dg(n,e){n.uniform2uiv(this.addr,e)}function ug(n,e){n.uniform3uiv(this.addr,e)}function hg(n,e){n.uniform4uiv(this.addr,e)}function fg(n,e,t){const i=this.cache,s=e.length,r=er(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ua:a=Wc;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||a,r[l])}function pg(n,e,t){const i=this.cache,s=e.length,r=er(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Xc,r[a])}function mg(n,e,t){const i=this.cache,s=e.length,r=er(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||qc,r[a])}function gg(n,e,t){const i=this.cache,s=e.length,r=er(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||jc,r[a])}function _g(n){switch(n){case 5126:return Jm;case 35664:return Qm;case 35665:return eg;case 35666:return tg;case 35674:return ng;case 35675:return ig;case 35676:return sg;case 5124:case 35670:return rg;case 35667:case 35671:return ag;case 35668:case 35672:return og;case 35669:case 35673:return lg;case 5125:return cg;case 36294:return dg;case 36295:return ug;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return pg;case 35680:case 36300:case 36308:case 36293:return mg;case 36289:case 36303:case 36311:case 36292:return gg}}class xg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Km(t.type)}}class vg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_g(t.type)}}class Mg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const l=s[r];l.setValue(e,t[l.id],i)}}}const Or=/(\w+)(\])?(\[|\.)?/g;function yl(n,e){n.seq.push(e),n.map[e.id]=e}function Sg(n,e,t){const i=n.name,s=i.length;for(Or.lastIndex=0;;){const r=Or.exec(i),a=Or.lastIndex;let l=r[1];const d=r[2]==="]",c=r[3];if(d&&(l=l|0),c===void 0||c==="["&&a+2===s){yl(t,c===void 0?new xg(l,n,e):new vg(l,n,e));break}else{let m=t.map[l];m===void 0&&(m=new Mg(l),yl(t,m)),t=m}}}class Ls{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const l=e.getActiveUniform(t,a),d=e.getUniformLocation(t,l.name);Sg(l,d,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const l=t[r],d=i[l.id];d.needsUpdate!==!1&&l.setValue(e,d.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function El(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const yg=37297;let Eg=0;function bg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const l=a+1;i.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return i.join(`
`)}const bl=new Oe;function Tg(n){$e._getMatrix(bl,$e.workingColorSpace,n);const e=`mat3( ${bl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Hs:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Tl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+bg(n.getShaderSource(e),l)}else return r}function wg(n,e){const t=Tg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Ag={[hc]:"Linear",[fc]:"Reinhard",[pc]:"Cineon",[mc]:"ACESFilmic",[_c]:"AgX",[xc]:"Neutral",[gc]:"Custom"};function Rg(n,e){const t=Ag[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ts=new j;function Cg(){$e.getLuminanceCoefficients(Ts);const n=Ts.x.toFixed(4),e=Ts.y.toFixed(4),t=Ts.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ng(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ki).join(`
`)}function Pg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Dg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let l=1;r.type===n.FLOAT_MAT2&&(l=2),r.type===n.FLOAT_MAT3&&(l=3),r.type===n.FLOAT_MAT4&&(l=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:l}}return t}function ki(n){return n!==""}function wl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Al(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fa(n){return n.replace(Lg,Ug)}const Ig=new Map;function Ug(n,e){let t=Ge[e];if(t===void 0){const i=Ig.get(e);if(i!==void 0)t=Ge[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fa(t)}const Fg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(n){return n.replace(Fg,Og)}function Og(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Bg={[Rs]:"SHADOWMAP_TYPE_PCF",[zi]:"SHADOWMAP_TYPE_VSM"};function zg(n){return Bg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const kg={[Kn]:"ENVMAP_TYPE_CUBE",[Ti]:"ENVMAP_TYPE_CUBE",[Ks]:"ENVMAP_TYPE_CUBE_UV"};function Gg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":kg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Vg={[Ti]:"ENVMAP_MODE_REFRACTION"};function Hg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Vg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Wg={[uc]:"ENVMAP_BLENDING_MULTIPLY",[Cu]:"ENVMAP_BLENDING_MIX",[Nu]:"ENVMAP_BLENDING_ADD"};function jg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Wg[n.combine]||"ENVMAP_BLENDING_NONE"}function Xg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function qg(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,l=t.fragmentShader;const d=zg(t),c=Gg(t),f=Hg(t),m=jg(t),h=Xg(t),g=Ng(t),_=Pg(r),M=s.createProgram();let p,u,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ki).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ki).join(`
`),u.length>0&&(u+=`
`)):(p=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ki).join(`
`),u=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+m:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ln?"#define TONE_MAPPING":"",t.toneMapping!==ln?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ln?Rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,wg("linearToOutputTexel",t.outputColorSpace),Cg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ki).join(`
`)),a=Fa(a),a=wl(a,t),a=Al(a,t),l=Fa(l),l=wl(l,t),l=Al(l,t),a=Rl(a),l=Rl(l),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",t.glslVersion===zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const C=w+p+a,S=w+u+l,b=El(s,s.VERTEX_SHADER,C),E=El(s,s.FRAGMENT_SHADER,S);s.attachShader(M,b),s.attachShader(M,E),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function R(D){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(M)||"",Q=s.getShaderInfoLog(b)||"",Y=s.getShaderInfoLog(E)||"",O=F.trim(),V=Q.trim(),k=Y.trim();let K=!0,se=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,b,E);else{const le=Tl(s,b,"vertex"),_e=Tl(s,E,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+le+`
`+_e)}else O!==""?Fe("WebGLProgram: Program Info Log:",O):(V===""||k==="")&&(se=!1);se&&(D.diagnostics={runnable:K,programLog:O,vertexShader:{log:V,prefix:p},fragmentShader:{log:k,prefix:u}})}s.deleteShader(b),s.deleteShader(E),v=new Ls(s,M),A=Dg(s,M)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(M,yg)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Eg++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=b,this.fragmentShader=E,this}let $g=0;class Yg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Zg(e),t.set(e,i)),i}}class Zg{constructor(e){this.id=$g++,this.code=e,this.usedTimes=0}}function Kg(n){return n===Jn||n===ks||n===Gs}function Jg(n,e,t,i,s,r){const a=new Cc,l=new Yg,d=new Set,c=[],f=new Map,m=i.logarithmicDepthBuffer;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return d.add(v),v===0?"uv":`uv${v}`}function M(v,A,P,D,F,Q){const Y=D.fog,O=F.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||V,k),se=K&&K.mapping===Ks?K.image.height:null,le=g[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const _e=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,be=_e!==void 0?_e.length:0;let He=0;O.morphAttributes.position!==void 0&&(He=1),O.morphAttributes.normal!==void 0&&(He=2),O.morphAttributes.color!==void 0&&(He=3);let st,je,Z,he;if(le){const Ne=rn[le];st=Ne.vertexShader,je=Ne.fragmentShader}else{st=v.vertexShader,je=v.fragmentShader;const Ne=l.getVertexShaderStage(v),ht=l.getFragmentShaderStage(v);l.update(v,Ne,ht),Z=Ne.id,he=ht.id}const G=n.getRenderTarget(),me=n.state.buffers.depth.getReversed(),ce=F.isInstancedMesh===!0,fe=F.isBatchedMesh===!0,We=!!v.map,ke=!!v.matcap,tt=!!K,Ke=!!v.aoMap,qe=!!v.lightMap,ut=!!v.bumpMap&&v.wireframe===!1,mt=!!v.normalMap,xt=!!v.displacementMap,ne=!!v.emissiveMap,ue=!!v.metalnessMap,pe=!!v.roughnessMap,N=v.anisotropy>0,Ce=v.clearcoat>0,Se=v.dispersion>0,T=v.iridescence>0,x=v.sheen>0,L=v.transmission>0,I=N&&!!v.anisotropyMap,B=Ce&&!!v.clearcoatMap,ee=Ce&&!!v.clearcoatNormalMap,ie=Ce&&!!v.clearcoatRoughnessMap,X=T&&!!v.iridescenceMap,q=T&&!!v.iridescenceThicknessMap,ae=x&&!!v.sheenColorMap,ge=x&&!!v.sheenRoughnessMap,oe=!!v.specularMap,de=!!v.specularColorMap,Re=!!v.specularIntensityMap,Ue=L&&!!v.transmissionMap,Be=L&&!!v.thicknessMap,U=!!v.gradientMap,xe=!!v.alphaMap,te=v.alphaTest>0,ve=!!v.alphaHash,Te=!!v.extensions;let re=ln;v.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(re=n.toneMapping);const De={shaderID:le,shaderType:v.type,shaderName:v.name,vertexShader:st,fragmentShader:je,defines:v.defines,customVertexShaderID:Z,customFragmentShaderID:he,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:fe,batchingColor:fe&&F._colorsTexture!==null,instancing:ce,instancingColor:ce&&F.instanceColor!==null,instancingMorph:ce&&F.morphTexture!==null,outputColorSpace:G===null?n.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:We,matcap:ke,envMap:tt,envMapMode:tt&&K.mapping,envMapCubeUVHeight:se,aoMap:Ke,lightMap:qe,bumpMap:ut,normalMap:mt,displacementMap:xt,emissiveMap:ne,normalMapObjectSpace:mt&&v.normalMapType===Lu,normalMapTangentSpace:mt&&v.normalMapType===Fo,packedNormalMap:mt&&v.normalMapType===Fo&&Kg(v.normalMap.format),metalnessMap:ue,roughnessMap:pe,anisotropy:N,anisotropyMap:I,clearcoat:Ce,clearcoatMap:B,clearcoatNormalMap:ee,clearcoatRoughnessMap:ie,dispersion:Se,iridescence:T,iridescenceMap:X,iridescenceThicknessMap:q,sheen:x,sheenColorMap:ae,sheenRoughnessMap:ge,specularMap:oe,specularColorMap:de,specularIntensityMap:Re,transmission:L,transmissionMap:Ue,thicknessMap:Be,gradientMap:U,opaque:v.transparent===!1&&v.blending===vi&&v.alphaToCoverage===!1,alphaMap:xe,alphaTest:te,alphaHash:ve,combine:v.combine,mapUv:We&&_(v.map.channel),aoMapUv:Ke&&_(v.aoMap.channel),lightMapUv:qe&&_(v.lightMap.channel),bumpMapUv:ut&&_(v.bumpMap.channel),normalMapUv:mt&&_(v.normalMap.channel),displacementMapUv:xt&&_(v.displacementMap.channel),emissiveMapUv:ne&&_(v.emissiveMap.channel),metalnessMapUv:ue&&_(v.metalnessMap.channel),roughnessMapUv:pe&&_(v.roughnessMap.channel),anisotropyMapUv:I&&_(v.anisotropyMap.channel),clearcoatMapUv:B&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:q&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(v.sheenRoughnessMap.channel),specularMapUv:oe&&_(v.specularMap.channel),specularColorMapUv:de&&_(v.specularColorMap.channel),specularIntensityMapUv:Re&&_(v.specularIntensityMap.channel),transmissionMapUv:Ue&&_(v.transmissionMap.channel),thicknessMapUv:Be&&_(v.thicknessMap.channel),alphaMapUv:xe&&_(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(mt||N),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(We||xe),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&mt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:me,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:He,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:We&&v.map.isVideoTexture===!0&&$e.getTransfer(v.map.colorSpace)===nt,decodeVideoTextureEmissive:ne&&v.emissiveMap.isVideoTexture===!0&&$e.getTransfer(v.emissiveMap.colorSpace)===nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===xn,flipSided:v.side===It,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Te&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&v.extensions.multiDraw===!0||fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return De.vertexUv1s=d.has(1),De.vertexUv2s=d.has(2),De.vertexUv3s=d.has(3),d.clear(),De}function p(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)A.push(P),A.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(u(A,v),w(A,v),A.push(n.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function u(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function w(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function C(v){const A=g[v.type];let P;if(A){const D=rn[A];P=xh.clone(D.uniforms)}else P=v.uniforms;return P}function S(v,A){let P=f.get(A);return P!==void 0?++P.usedTimes:(P=new qg(n,A,v,s),c.push(P),f.set(A,P)),P}function b(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),f.delete(v.cacheKey),v.destroy()}}function E(v){l.remove(v)}function R(){l.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:C,acquireProgram:S,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:R}}function Qg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let l=n.get(a);return l===void 0&&(l={},n.set(a,l)),l}function i(a){n.delete(a)}function s(a,l,d){n.get(a)[l]=d}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function e_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Nl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Pl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function l(h,g,_,M,p,u){let w=n[e];return w===void 0?(w={id:h.id,object:h,geometry:g,material:_,materialVariant:a(h),groupOrder:M,renderOrder:h.renderOrder,z:p,group:u},n[e]=w):(w.id=h.id,w.object=h,w.geometry=g,w.material=_,w.materialVariant=a(h),w.groupOrder=M,w.renderOrder=h.renderOrder,w.z=p,w.group=u),e++,w}function d(h,g,_,M,p,u){const w=l(h,g,_,M,p,u);_.transmission>0?i.push(w):_.transparent===!0?s.push(w):t.push(w)}function c(h,g,_,M,p,u){const w=l(h,g,_,M,p,u);_.transmission>0?i.unshift(w):_.transparent===!0?s.unshift(w):t.unshift(w)}function f(h,g,_){t.length>1&&t.sort(h||e_),i.length>1&&i.sort(g||Nl),s.length>1&&s.sort(g||Nl),_&&(t.reverse(),i.reverse(),s.reverse())}function m(){for(let h=e,g=n.length;h<g;h++){const _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:d,unshift:c,finish:m,sort:f}}function t_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Pl,n.set(i,[a])):s>=r.length?(a=new Pl,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function n_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new j,color:new Ze};break;case"SpotLight":t={position:new j,direction:new j,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new j,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new j,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new j,halfWidth:new j,halfHeight:new j};break}return n[e.id]=t,t}}}function i_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let s_=0;function r_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function a_(n){const e=new n_,t=i_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new j);const s=new j,r=new dt,a=new dt;function l(c){let f=0,m=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let g=0,_=0,M=0,p=0,u=0,w=0,C=0,S=0,b=0,E=0,R=0;c.sort(r_);for(let A=0,P=c.length;A<P;A++){const D=c[A],F=D.color,Q=D.intensity,Y=D.distance;let O=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Jn?O=D.shadow.map.texture:O=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=F.r*Q,m+=F.g*Q,h+=F.b*Q;else if(D.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(D.sh.coefficients[V],Q);R++}else if(D.isDirectionalLight){const V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const k=D.shadow,K=t.get(D);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,i.directionalShadow[g]=K,i.directionalShadowMap[g]=O,i.directionalShadowMatrix[g]=D.shadow.matrix,w++}i.directional[g]=V,g++}else if(D.isSpotLight){const V=e.get(D);V.position.setFromMatrixPosition(D.matrixWorld),V.color.copy(F).multiplyScalar(Q),V.distance=Y,V.coneCos=Math.cos(D.angle),V.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),V.decay=D.decay,i.spot[M]=V;const k=D.shadow;if(D.map&&(i.spotLightMap[b]=D.map,b++,k.updateMatrices(D),D.castShadow&&E++),i.spotLightMatrix[M]=k.matrix,D.castShadow){const K=t.get(D);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,i.spotShadow[M]=K,i.spotShadowMap[M]=O,S++}M++}else if(D.isRectAreaLight){const V=e.get(D);V.color.copy(F).multiplyScalar(Q),V.halfWidth.set(D.width*.5,0,0),V.halfHeight.set(0,D.height*.5,0),i.rectArea[p]=V,p++}else if(D.isPointLight){const V=e.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),V.distance=D.distance,V.decay=D.decay,D.castShadow){const k=D.shadow,K=t.get(D);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,K.shadowCameraNear=k.camera.near,K.shadowCameraFar=k.camera.far,i.pointShadow[_]=K,i.pointShadowMap[_]=O,i.pointShadowMatrix[_]=D.shadow.matrix,C++}i.point[_]=V,_++}else if(D.isHemisphereLight){const V=e.get(D);V.skyColor.copy(D.color).multiplyScalar(Q),V.groundColor.copy(D.groundColor).multiplyScalar(Q),i.hemi[u]=V,u++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=m,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==g||v.pointLength!==_||v.spotLength!==M||v.rectAreaLength!==p||v.hemiLength!==u||v.numDirectionalShadows!==w||v.numPointShadows!==C||v.numSpotShadows!==S||v.numSpotMaps!==b||v.numLightProbes!==R)&&(i.directional.length=g,i.spot.length=M,i.rectArea.length=p,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=S+b-E,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,v.directionalLength=g,v.pointLength=_,v.spotLength=M,v.rectAreaLength=p,v.hemiLength=u,v.numDirectionalShadows=w,v.numPointShadows=C,v.numSpotShadows=S,v.numSpotMaps=b,v.numLightProbes=R,i.version=s_++)}function d(c,f){let m=0,h=0,g=0,_=0,M=0;const p=f.matrixWorldInverse;for(let u=0,w=c.length;u<w;u++){const C=c[u];if(C.isDirectionalLight){const S=i.directional[m];S.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),m++}else if(C.isSpotLight){const S=i.spot[g];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),g++}else if(C.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(C.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(C.width*.5,0,0),S.halfHeight.set(0,C.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(C.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(p),h++}else if(C.isHemisphereLight){const S=i.hemi[M];S.direction.setFromMatrixPosition(C.matrixWorld),S.direction.transformDirection(p),M++}}}return{setup:l,setupView:d,state:i}}function Dl(n){const e=new a_(n),t=[],i=[],s=[];function r(h){m.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function l(h){i.push(h)}function d(h){s.push(h)}function c(){e.setup(t)}function f(h){e.setupView(t,h)}const m={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:m,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:l,pushLightProbeGrid:d}}function o_(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let l;return a===void 0?(l=new Dl(n),e.set(s,[l])):r>=a.length?(l=new Dl(n),a.push(l)):l=a[r],l}function i(){e=new WeakMap}return{get:t,dispose:i}}const l_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c_=`uniform sampler2D shadow_pass;
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
}`,d_=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],u_=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],Ll=new dt,Fi=new j,Br=new j;function h_(n,e,t){let i=new Ka;const s=new et,r=new et,a=new ct,l=new yh,d=new Eh,c={},f=t.maxTextureSize,m={[On]:It,[It]:On,[xn]:xn},h=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:l_,fragmentShader:c_}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const _=new Kt;_.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new jt(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rs;let u=this.type;this.render=function(E,R,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===du&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Rs);const A=n.getRenderTarget(),P=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Sn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Q=u!==this.type;Q&&R.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(O=>O.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,O=E.length;Y<O;Y++){const V=E[Y],k=V.shadow;if(k===void 0){Fe("WebGLShadowMap:",V,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const K=k.getFrameExtents();s.multiply(K),r.copy(k.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/K.x),s.x=r.x*K.x,k.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/K.y),s.y=r.y*K.y,k.mapSize.y=r.y));const se=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=se,k.map===null||Q===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===zi){if(V.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new cn(s.x,s.y,{format:Jn,type:bn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),k.map.texture.name=V.name+".shadowMap",k.map.depthTexture=new wi(s.x,s.y,an),k.map.depthTexture.name=V.name+".shadowMapDepth",k.map.depthTexture.format=Tn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Et,k.map.depthTexture.magFilter=Et}else V.isPointLight?(k.map=new Hc(s.x),k.map.depthTexture=new gh(s.x,dn)):(k.map=new cn(s.x,s.y),k.map.depthTexture=new wi(s.x,s.y,dn)),k.map.depthTexture.name=V.name+".shadowMap",k.map.depthTexture.format=Tn,this.type===Rs?(k.map.depthTexture.compareFunction=se?$a:qa,k.map.depthTexture.minFilter=Rt,k.map.depthTexture.magFilter=Rt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Et,k.map.depthTexture.magFilter=Et);k.camera.updateProjectionMatrix()}const le=k.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<le;_e++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,_e),n.clear();else{_e===0&&(n.setRenderTarget(k.map),n.clear());const be=k.getViewport(_e);a.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),F.viewport(a)}if(V.isPointLight){const be=k.camera,He=k.matrix,st=V.distance||be.far;st!==be.far&&(be.far=st,be.updateProjectionMatrix()),Fi.setFromMatrixPosition(V.matrixWorld),be.position.copy(Fi),Br.copy(be.position),Br.add(d_[_e]),be.up.copy(u_[_e]),be.lookAt(Br),be.updateMatrixWorld(),He.makeTranslation(-Fi.x,-Fi.y,-Fi.z),Ll.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Ll,be.coordinateSystem,be.reversedDepth)}else k.updateMatrices(V);i=k.getFrustum(),S(R,v,k.camera,V,this.type)}k.isPointLightShadow!==!0&&this.type===zi&&w(k,v),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,n.setRenderTarget(A,P,D)};function w(E,R){const v=e.update(M);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,g.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new cn(s.x,s.y,{format:Jn,type:bn})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,v,h,M,null),g.uniforms.shadow_pass.value=E.mapPass.texture,g.uniforms.resolution.value=E.mapSize,g.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,v,g,M,null)}function C(E,R,v,A){let P=null;const D=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)P=D;else if(P=v.isPointLight===!0?d:l,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=P.uuid,Q=R.uuid;let Y=c[F];Y===void 0&&(Y={},c[F]=Y);let O=Y[Q];O===void 0&&(O=P.clone(),Y[Q]=O,R.addEventListener("dispose",b)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,A===zi?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:m[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=n.properties.get(P);F.light=v}return P}function S(E,R,v,A,P){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===zi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const Q=e.update(E),Y=E.material;if(Array.isArray(Y)){const O=Q.groups;for(let V=0,k=O.length;V<k;V++){const K=O[V],se=Y[K.materialIndex];if(se&&se.visible){const le=C(E,se,A,P);E.onBeforeShadow(n,E,R,v,Q,le,K),n.renderBufferDirect(v,null,Q,le,E,K),E.onAfterShadow(n,E,R,v,Q,le,K)}}}else if(Y.visible){const O=C(E,Y,A,P);E.onBeforeShadow(n,E,R,v,Q,O,null),n.renderBufferDirect(v,null,Q,O,E,null),E.onAfterShadow(n,E,R,v,Q,O,null)}}const F=E.children;for(let Q=0,Y=F.length;Q<Y;Q++)S(F[Q],R,v,A,P)}function b(E){E.target.removeEventListener("dispose",b);for(const v in c){const A=c[v],P=E.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function f_(n,e){function t(){let U=!1;const xe=new ct;let te=null;const ve=new ct(0,0,0,0);return{setMask:function(Te){te!==Te&&!U&&(n.colorMask(Te,Te,Te,Te),te=Te)},setLocked:function(Te){U=Te},setClear:function(Te,re,De,Ne,ht){ht===!0&&(Te*=Ne,re*=Ne,De*=Ne),xe.set(Te,re,De,Ne),ve.equals(xe)===!1&&(n.clearColor(Te,re,De,Ne),ve.copy(xe))},reset:function(){U=!1,te=null,ve.set(-1,0,0,0)}}}function i(){let U=!1,xe=!1,te=null,ve=null,Te=null;return{setReversed:function(re){if(xe!==re){const De=e.get("EXT_clip_control");re?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),xe=re;const Ne=Te;Te=null,this.setClear(Ne)}},getReversed:function(){return xe},setTest:function(re){re?G(n.DEPTH_TEST):me(n.DEPTH_TEST)},setMask:function(re){te!==re&&!U&&(n.depthMask(re),te=re)},setFunc:function(re){if(xe&&(re=Hu[re]),ve!==re){switch(re){case $r:n.depthFunc(n.NEVER);break;case Yr:n.depthFunc(n.ALWAYS);break;case Zr:n.depthFunc(n.LESS);break;case bi:n.depthFunc(n.LEQUAL);break;case Kr:n.depthFunc(n.EQUAL);break;case Jr:n.depthFunc(n.GEQUAL);break;case Qr:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=re}},setLocked:function(re){U=re},setClear:function(re){Te!==re&&(Te=re,xe&&(re=1-re),n.clearDepth(re))},reset:function(){U=!1,te=null,ve=null,Te=null,xe=!1}}}function s(){let U=!1,xe=null,te=null,ve=null,Te=null,re=null,De=null,Ne=null,ht=null;return{setTest:function(ot){U||(ot?G(n.STENCIL_TEST):me(n.STENCIL_TEST))},setMask:function(ot){xe!==ot&&!U&&(n.stencilMask(ot),xe=ot)},setFunc:function(ot,Jt,Qt){(te!==ot||ve!==Jt||Te!==Qt)&&(n.stencilFunc(ot,Jt,Qt),te=ot,ve=Jt,Te=Qt)},setOp:function(ot,Jt,Qt){(re!==ot||De!==Jt||Ne!==Qt)&&(n.stencilOp(ot,Jt,Qt),re=ot,De=Jt,Ne=Qt)},setLocked:function(ot){U=ot},setClear:function(ot){ht!==ot&&(n.clearStencil(ot),ht=ot)},reset:function(){U=!1,xe=null,te=null,ve=null,Te=null,re=null,De=null,Ne=null,ht=null}}}const r=new t,a=new i,l=new s,d=new WeakMap,c=new WeakMap;let f={},m={},h={},g=new WeakMap,_=[],M=null,p=!1,u=null,w=null,C=null,S=null,b=null,E=null,R=null,v=new Ze(0,0,0),A=0,P=!1,D=null,F=null,Q=null,Y=null,O=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,K=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(se)[1]),k=K>=1):se.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),k=K>=2);let le=null,_e={};const be=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),st=new ct().fromArray(be),je=new ct().fromArray(He);function Z(U,xe,te,ve){const Te=new Uint8Array(4),re=n.createTexture();n.bindTexture(U,re),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<te;De++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(xe+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return re}const he={};he[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),G(n.DEPTH_TEST),a.setFunc(bi),ut(!1),mt(Lo),G(n.CULL_FACE),Ke(Sn);function G(U){f[U]!==!0&&(n.enable(U),f[U]=!0)}function me(U){f[U]!==!1&&(n.disable(U),f[U]=!1)}function ce(U,xe){return h[U]!==xe?(n.bindFramebuffer(U,xe),h[U]=xe,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=xe),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function fe(U,xe){let te=_,ve=!1;if(U){te=g.get(xe),te===void 0&&(te=[],g.set(xe,te));const Te=U.textures;if(te.length!==Te.length||te[0]!==n.COLOR_ATTACHMENT0){for(let re=0,De=Te.length;re<De;re++)te[re]=n.COLOR_ATTACHMENT0+re;te.length=Te.length,ve=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,ve=!0);ve&&n.drawBuffers(te)}function We(U){return M!==U?(n.useProgram(U),M=U,!0):!1}const ke={[jn]:n.FUNC_ADD,[hu]:n.FUNC_SUBTRACT,[fu]:n.FUNC_REVERSE_SUBTRACT};ke[pu]=n.MIN,ke[mu]=n.MAX;const tt={[gu]:n.ZERO,[_u]:n.ONE,[xu]:n.SRC_COLOR,[Xr]:n.SRC_ALPHA,[bu]:n.SRC_ALPHA_SATURATE,[yu]:n.DST_COLOR,[Mu]:n.DST_ALPHA,[vu]:n.ONE_MINUS_SRC_COLOR,[qr]:n.ONE_MINUS_SRC_ALPHA,[Eu]:n.ONE_MINUS_DST_COLOR,[Su]:n.ONE_MINUS_DST_ALPHA,[Tu]:n.CONSTANT_COLOR,[wu]:n.ONE_MINUS_CONSTANT_COLOR,[Au]:n.CONSTANT_ALPHA,[Ru]:n.ONE_MINUS_CONSTANT_ALPHA};function Ke(U,xe,te,ve,Te,re,De,Ne,ht,ot){if(U===Sn){p===!0&&(me(n.BLEND),p=!1);return}if(p===!1&&(G(n.BLEND),p=!0),U!==uu){if(U!==u||ot!==P){if((w!==jn||b!==jn)&&(n.blendEquation(n.FUNC_ADD),w=jn,b=jn),ot)switch(U){case vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zs:n.blendFunc(n.ONE,n.ONE);break;case Io:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",U);break}else switch(U){case vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Io:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uo:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",U);break}C=null,S=null,E=null,R=null,v.set(0,0,0),A=0,u=U,P=ot}return}Te=Te||xe,re=re||te,De=De||ve,(xe!==w||Te!==b)&&(n.blendEquationSeparate(ke[xe],ke[Te]),w=xe,b=Te),(te!==C||ve!==S||re!==E||De!==R)&&(n.blendFuncSeparate(tt[te],tt[ve],tt[re],tt[De]),C=te,S=ve,E=re,R=De),(Ne.equals(v)===!1||ht!==A)&&(n.blendColor(Ne.r,Ne.g,Ne.b,ht),v.copy(Ne),A=ht),u=U,P=!1}function qe(U,xe){U.side===xn?me(n.CULL_FACE):G(n.CULL_FACE);let te=U.side===It;xe&&(te=!te),ut(te),U.blending===vi&&U.transparent===!1?Ke(Sn):Ke(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ve=U.stencilWrite;l.setTest(ve),ve&&(l.setMask(U.stencilWriteMask),l.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),l.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ne(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?G(n.SAMPLE_ALPHA_TO_COVERAGE):me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ut(U){D!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),D=U)}function mt(U){U!==lu?(G(n.CULL_FACE),U!==F&&(U===Lo?n.cullFace(n.BACK):U===cu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):me(n.CULL_FACE),F=U}function xt(U){U!==Q&&(k&&n.lineWidth(U),Q=U)}function ne(U,xe,te){U?(G(n.POLYGON_OFFSET_FILL),(Y!==xe||O!==te)&&(Y=xe,O=te,a.getReversed()&&(xe=-xe),n.polygonOffset(xe,te))):me(n.POLYGON_OFFSET_FILL)}function ue(U){U?G(n.SCISSOR_TEST):me(n.SCISSOR_TEST)}function pe(U){U===void 0&&(U=n.TEXTURE0+V-1),le!==U&&(n.activeTexture(U),le=U)}function N(U,xe,te){te===void 0&&(le===null?te=n.TEXTURE0+V-1:te=le);let ve=_e[te];ve===void 0&&(ve={type:void 0,texture:void 0},_e[te]=ve),(ve.type!==U||ve.texture!==xe)&&(le!==te&&(n.activeTexture(te),le=te),n.bindTexture(U,xe||he[U]),ve.type=U,ve.texture=xe)}function Ce(){const U=_e[le];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Se(){try{n.compressedTexImage2D(...arguments)}catch(U){Qe("WebGLState:",U)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(U){Qe("WebGLState:",U)}}function x(){try{n.texSubImage2D(...arguments)}catch(U){Qe("WebGLState:",U)}}function L(){try{n.texSubImage3D(...arguments)}catch(U){Qe("WebGLState:",U)}}function I(){try{n.compressedTexSubImage2D(...arguments)}catch(U){Qe("WebGLState:",U)}}function B(){try{n.compressedTexSubImage3D(...arguments)}catch(U){Qe("WebGLState:",U)}}function ee(){try{n.texStorage2D(...arguments)}catch(U){Qe("WebGLState:",U)}}function ie(){try{n.texStorage3D(...arguments)}catch(U){Qe("WebGLState:",U)}}function X(){try{n.texImage2D(...arguments)}catch(U){Qe("WebGLState:",U)}}function q(){try{n.texImage3D(...arguments)}catch(U){Qe("WebGLState:",U)}}function ae(U){return m[U]!==void 0?m[U]:n.getParameter(U)}function ge(U,xe){m[U]!==xe&&(n.pixelStorei(U,xe),m[U]=xe)}function oe(U){st.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),st.copy(U))}function de(U){je.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),je.copy(U))}function Re(U,xe){let te=c.get(xe);te===void 0&&(te=new WeakMap,c.set(xe,te));let ve=te.get(U);ve===void 0&&(ve=n.getUniformBlockIndex(xe,U.name),te.set(U,ve))}function Ue(U,xe){const ve=c.get(xe).get(U);d.get(xe)!==ve&&(n.uniformBlockBinding(xe,ve,U.__bindingPointIndex),d.set(xe,ve))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),f={},m={},le=null,_e={},h={},g=new WeakMap,_=[],M=null,p=!1,u=null,w=null,C=null,S=null,b=null,E=null,R=null,v=new Ze(0,0,0),A=0,P=!1,D=null,F=null,Q=null,Y=null,O=null,st.set(0,0,n.canvas.width,n.canvas.height),je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:G,disable:me,bindFramebuffer:ce,drawBuffers:fe,useProgram:We,setBlending:Ke,setMaterial:qe,setFlipSided:ut,setCullFace:mt,setLineWidth:xt,setPolygonOffset:ne,setScissorTest:ue,activeTexture:pe,bindTexture:N,unbindTexture:Ce,compressedTexImage2D:Se,compressedTexImage3D:T,texImage2D:X,texImage3D:q,pixelStorei:ge,getParameter:ae,updateUBOMapping:Re,uniformBlockBinding:Ue,texStorage2D:ee,texStorage3D:ie,texSubImage2D:x,texSubImage3D:L,compressedTexSubImage2D:I,compressedTexSubImage3D:B,scissor:oe,viewport:de,reset:Be}}function p_(n,e,t,i,s,r,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,f=new WeakMap,m=new Set;let h;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(T,x){return _?new OffscreenCanvas(T,x):Ws("canvas")}function p(T,x,L){let I=1;const B=Se(T);if((B.width>L||B.height>L)&&(I=L/Math.max(B.width,B.height)),I<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ee=Math.floor(I*B.width),ie=Math.floor(I*B.height);h===void 0&&(h=M(ee,ie));const X=x?M(ee,ie):h;return X.width=ee,X.height=ie,X.getContext("2d").drawImage(T,0,0,ee,ie),Fe("WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+ee+"x"+ie+")."),X}else return"data"in T&&Fe("WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),T;return T}function u(T){return T.generateMipmaps}function w(T){n.generateMipmap(T)}function C(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(T,x,L,I,B,ee=!1){if(T!==null){if(n[T]!==void 0)return n[T];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ie;I&&(ie=e.get("EXT_texture_norm16"),ie||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=x;if(x===n.RED&&(L===n.FLOAT&&(X=n.R32F),L===n.HALF_FLOAT&&(X=n.R16F),L===n.UNSIGNED_BYTE&&(X=n.R8),L===n.UNSIGNED_SHORT&&ie&&(X=ie.R16_EXT),L===n.SHORT&&ie&&(X=ie.R16_SNORM_EXT)),x===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(X=n.R8UI),L===n.UNSIGNED_SHORT&&(X=n.R16UI),L===n.UNSIGNED_INT&&(X=n.R32UI),L===n.BYTE&&(X=n.R8I),L===n.SHORT&&(X=n.R16I),L===n.INT&&(X=n.R32I)),x===n.RG&&(L===n.FLOAT&&(X=n.RG32F),L===n.HALF_FLOAT&&(X=n.RG16F),L===n.UNSIGNED_BYTE&&(X=n.RG8),L===n.UNSIGNED_SHORT&&ie&&(X=ie.RG16_EXT),L===n.SHORT&&ie&&(X=ie.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(X=n.RG8UI),L===n.UNSIGNED_SHORT&&(X=n.RG16UI),L===n.UNSIGNED_INT&&(X=n.RG32UI),L===n.BYTE&&(X=n.RG8I),L===n.SHORT&&(X=n.RG16I),L===n.INT&&(X=n.RG32I)),x===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(X=n.RGB8UI),L===n.UNSIGNED_SHORT&&(X=n.RGB16UI),L===n.UNSIGNED_INT&&(X=n.RGB32UI),L===n.BYTE&&(X=n.RGB8I),L===n.SHORT&&(X=n.RGB16I),L===n.INT&&(X=n.RGB32I)),x===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),L===n.UNSIGNED_INT&&(X=n.RGBA32UI),L===n.BYTE&&(X=n.RGBA8I),L===n.SHORT&&(X=n.RGBA16I),L===n.INT&&(X=n.RGBA32I)),x===n.RGB&&(L===n.UNSIGNED_SHORT&&ie&&(X=ie.RGB16_EXT),L===n.SHORT&&ie&&(X=ie.RGB16_SNORM_EXT),L===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),L===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),x===n.RGBA){const q=ee?Hs:$e.getTransfer(B);L===n.FLOAT&&(X=n.RGBA32F),L===n.HALF_FLOAT&&(X=n.RGBA16F),L===n.UNSIGNED_BYTE&&(X=q===nt?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT&&ie&&(X=ie.RGBA16_EXT),L===n.SHORT&&ie&&(X=ie.RGBA16_SNORM_EXT),L===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function b(T,x){let L;return T?x===null||x===dn||x===Wi?L=n.DEPTH24_STENCIL8:x===an?L=n.DEPTH32F_STENCIL8:x===Hi&&(L=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===dn||x===Wi?L=n.DEPTH_COMPONENT24:x===an?L=n.DEPTH_COMPONENT32F:x===Hi&&(L=n.DEPTH_COMPONENT16),L}function E(T,x){return u(T)===!0||T.isFramebufferTexture&&T.minFilter!==Et&&T.minFilter!==Rt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function R(T){const x=T.target;x.removeEventListener("dispose",R),A(x),x.isVideoTexture&&f.delete(x),x.isHTMLTexture&&m.delete(x)}function v(T){const x=T.target;x.removeEventListener("dispose",v),D(x)}function A(T){const x=i.get(T);if(x.__webglInit===void 0)return;const L=T.source,I=g.get(L);if(I){const B=I[x.__cacheKey];B.usedTimes--,B.usedTimes===0&&P(T),Object.keys(I).length===0&&g.delete(L)}i.remove(T)}function P(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const L=T.source,I=g.get(L);delete I[x.__cacheKey],a.memory.textures--}function D(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(x.__webglFramebuffer[I]))for(let B=0;B<x.__webglFramebuffer[I].length;B++)n.deleteFramebuffer(x.__webglFramebuffer[I][B]);else n.deleteFramebuffer(x.__webglFramebuffer[I]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[I])}else{if(Array.isArray(x.__webglFramebuffer))for(let I=0;I<x.__webglFramebuffer.length;I++)n.deleteFramebuffer(x.__webglFramebuffer[I]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let I=0;I<x.__webglColorRenderbuffer.length;I++)x.__webglColorRenderbuffer[I]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[I]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const L=T.textures;for(let I=0,B=L.length;I<B;I++){const ee=i.get(L[I]);ee.__webglTexture&&(n.deleteTexture(ee.__webglTexture),a.memory.textures--),i.remove(L[I])}i.remove(T)}let F=0;function Q(){F=0}function Y(){return F}function O(T){F=T}function V(){const T=F;return T>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function k(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function K(T,x){const L=i.get(T);if(T.isVideoTexture&&N(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&L.__version!==T.version){const I=T.image;if(I===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{me(L,T,x);return}}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+x)}function se(T,x){const L=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){me(L,T,x);return}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+x)}function le(T,x){const L=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){me(L,T,x);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+x)}function _e(T,x){const L=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&L.__version!==T.version){ce(L,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+x)}const be={[ta]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[na]:n.MIRRORED_REPEAT},He={[Et]:n.NEAREST,[Pu]:n.NEAREST_MIPMAP_NEAREST,[ts]:n.NEAREST_MIPMAP_LINEAR,[Rt]:n.LINEAR,[ar]:n.LINEAR_MIPMAP_NEAREST,[qn]:n.LINEAR_MIPMAP_LINEAR},st={[Iu]:n.NEVER,[zu]:n.ALWAYS,[Uu]:n.LESS,[qa]:n.LEQUAL,[Fu]:n.EQUAL,[$a]:n.GEQUAL,[Ou]:n.GREATER,[Bu]:n.NOTEQUAL};function je(T,x){if(x.type===an&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Rt||x.magFilter===ar||x.magFilter===ts||x.magFilter===qn||x.minFilter===Rt||x.minFilter===ar||x.minFilter===ts||x.minFilter===qn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,be[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,be[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,be[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,He[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,He[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,st[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Et||x.minFilter!==ts&&x.minFilter!==qn||x.type===an&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Z(T,x){let L=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",R));const I=x.source;let B=g.get(I);B===void 0&&(B={},g.set(I,B));const ee=k(x);if(ee!==T.__cacheKey){B[ee]===void 0&&(B[ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),B[ee].usedTimes++;const ie=B[T.__cacheKey];ie!==void 0&&(B[T.__cacheKey].usedTimes--,ie.usedTimes===0&&P(x)),T.__cacheKey=ee,T.__webglTexture=B[ee].texture}return L}function he(T,x,L){return Math.floor(Math.floor(T/L)/x)}function G(T,x,L,I){const ee=T.updateRanges;if(ee.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,L,I,x.data);else{ee.sort((ge,oe)=>ge.start-oe.start);let ie=0;for(let ge=1;ge<ee.length;ge++){const oe=ee[ie],de=ee[ge],Re=oe.start+oe.count,Ue=he(de.start,x.width,4),Be=he(oe.start,x.width,4);de.start<=Re+1&&Ue===Be&&he(de.start+de.count-1,x.width,4)===Ue?oe.count=Math.max(oe.count,de.start+de.count-oe.start):(++ie,ee[ie]=de)}ee.length=ie+1;const X=t.getParameter(n.UNPACK_ROW_LENGTH),q=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ge=0,oe=ee.length;ge<oe;ge++){const de=ee[ge],Re=Math.floor(de.start/4),Ue=Math.ceil(de.count/4),Be=Re%x.width,U=Math.floor(Re/x.width),xe=Ue,te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Be,U,xe,te,L,I,x.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,X),t.pixelStorei(n.UNPACK_SKIP_PIXELS,q),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function me(T,x,L){let I=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(I=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(I=n.TEXTURE_3D);const B=Z(T,x),ee=x.source;t.bindTexture(I,T.__webglTexture,n.TEXTURE0+L);const ie=i.get(ee);if(ee.version!==ie.__version||B===!0){if(t.activeTexture(n.TEXTURE0+L),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const te=$e.getPrimaries($e.workingColorSpace),ve=x.colorSpace===Un?null:$e.getPrimaries(x.colorSpace),Te=x.colorSpace===Un||te===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let q=p(x.image,!1,s.maxTextureSize);q=Ce(x,q);const ae=r.convert(x.format,x.colorSpace),ge=r.convert(x.type);let oe=S(x.internalFormat,ae,ge,x.normalized,x.colorSpace,x.isVideoTexture);je(I,x);let de;const Re=x.mipmaps,Ue=x.isVideoTexture!==!0,Be=ie.__version===void 0||B===!0,U=ee.dataReady,xe=E(x,q);if(x.isDepthTexture)oe=b(x.format===$n,x.type),Be&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,oe,q.width,q.height):t.texImage2D(n.TEXTURE_2D,0,oe,q.width,q.height,0,ae,ge,null));else if(x.isDataTexture)if(Re.length>0){Ue&&Be&&t.texStorage2D(n.TEXTURE_2D,xe,oe,Re[0].width,Re[0].height);for(let te=0,ve=Re.length;te<ve;te++)de=Re[te],Ue?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,de.width,de.height,ae,ge,de.data):t.texImage2D(n.TEXTURE_2D,te,oe,de.width,de.height,0,ae,ge,de.data);x.generateMipmaps=!1}else Ue?(Be&&t.texStorage2D(n.TEXTURE_2D,xe,oe,q.width,q.height),U&&G(x,q,ae,ge)):t.texImage2D(n.TEXTURE_2D,0,oe,q.width,q.height,0,ae,ge,q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ue&&Be&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,oe,Re[0].width,Re[0].height,q.depth);for(let te=0,ve=Re.length;te<ve;te++)if(de=Re[te],x.format!==Zt)if(ae!==null)if(Ue){if(U)if(x.layerUpdates.size>0){const Te=dl(de.width,de.height,x.format,x.type);for(const re of x.layerUpdates){const De=de.data.subarray(re*Te/de.data.BYTES_PER_ELEMENT,(re+1)*Te/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,re,de.width,de.height,1,ae,De)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,de.width,de.height,q.depth,ae,de.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,oe,de.width,de.height,q.depth,0,de.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,de.width,de.height,q.depth,ae,ge,de.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,oe,de.width,de.height,q.depth,0,ae,ge,de.data)}else{Ue&&Be&&t.texStorage2D(n.TEXTURE_2D,xe,oe,Re[0].width,Re[0].height);for(let te=0,ve=Re.length;te<ve;te++)de=Re[te],x.format!==Zt?ae!==null?Ue?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,de.width,de.height,ae,de.data):t.compressedTexImage2D(n.TEXTURE_2D,te,oe,de.width,de.height,0,de.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,de.width,de.height,ae,ge,de.data):t.texImage2D(n.TEXTURE_2D,te,oe,de.width,de.height,0,ae,ge,de.data)}else if(x.isDataArrayTexture)if(Ue){if(Be&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,oe,q.width,q.height,q.depth),U)if(x.layerUpdates.size>0){const te=dl(q.width,q.height,x.format,x.type);for(const ve of x.layerUpdates){const Te=q.data.subarray(ve*te/q.data.BYTES_PER_ELEMENT,(ve+1)*te/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ve,q.width,q.height,1,ae,ge,Te)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ae,ge,q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,oe,q.width,q.height,q.depth,0,ae,ge,q.data);else if(x.isData3DTexture)Ue?(Be&&t.texStorage3D(n.TEXTURE_3D,xe,oe,q.width,q.height,q.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ae,ge,q.data)):t.texImage3D(n.TEXTURE_3D,0,oe,q.width,q.height,q.depth,0,ae,ge,q.data);else if(x.isFramebufferTexture){if(Be)if(Ue)t.texStorage2D(n.TEXTURE_2D,xe,oe,q.width,q.height);else{let te=q.width,ve=q.height;for(let Te=0;Te<xe;Te++)t.texImage2D(n.TEXTURE_2D,Te,oe,te,ve,0,ae,ge,null),te>>=1,ve>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const te=n.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),q.parentNode!==te){te.appendChild(q),m.add(x),te.onpaint=ve=>{const Te=ve.changedElements;for(const re of m)Te.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,q);else{const Te=n.RGBA,re=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Te,re,De,q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Ue&&Be){const te=Se(Re[0]);t.texStorage2D(n.TEXTURE_2D,xe,oe,te.width,te.height)}for(let te=0,ve=Re.length;te<ve;te++)de=Re[te],Ue?U&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ae,ge,de):t.texImage2D(n.TEXTURE_2D,te,oe,ae,ge,de);x.generateMipmaps=!1}else if(Ue){if(Be){const te=Se(q);t.texStorage2D(n.TEXTURE_2D,xe,oe,te.width,te.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,ge,q)}else t.texImage2D(n.TEXTURE_2D,0,oe,ae,ge,q);u(x)&&w(I),ie.__version=ee.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ce(T,x,L){if(x.image.length!==6)return;const I=Z(T,x),B=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+L);const ee=i.get(B);if(B.version!==ee.__version||I===!0){t.activeTexture(n.TEXTURE0+L);const ie=$e.getPrimaries($e.workingColorSpace),X=x.colorSpace===Un?null:$e.getPrimaries(x.colorSpace),q=x.colorSpace===Un||ie===X?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);const ae=x.isCompressedTexture||x.image[0].isCompressedTexture,ge=x.image[0]&&x.image[0].isDataTexture,oe=[];for(let re=0;re<6;re++)!ae&&!ge?oe[re]=p(x.image[re],!0,s.maxCubemapSize):oe[re]=ge?x.image[re].image:x.image[re],oe[re]=Ce(x,oe[re]);const de=oe[0],Re=r.convert(x.format,x.colorSpace),Ue=r.convert(x.type),Be=S(x.internalFormat,Re,Ue,x.normalized,x.colorSpace),U=x.isVideoTexture!==!0,xe=ee.__version===void 0||I===!0,te=B.dataReady;let ve=E(x,de);je(n.TEXTURE_CUBE_MAP,x);let Te;if(ae){U&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,Be,de.width,de.height);for(let re=0;re<6;re++){Te=oe[re].mipmaps;for(let De=0;De<Te.length;De++){const Ne=Te[De];x.format!==Zt?Re!==null?U?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,0,0,Ne.width,Ne.height,Re,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,Be,Ne.width,Ne.height,0,Ne.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,0,0,Ne.width,Ne.height,Re,Ue,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De,Be,Ne.width,Ne.height,0,Re,Ue,Ne.data)}}}else{if(Te=x.mipmaps,U&&xe){Te.length>0&&ve++;const re=Se(oe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,Be,re.width,re.height)}for(let re=0;re<6;re++)if(ge){U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,oe[re].width,oe[re].height,Re,Ue,oe[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Be,oe[re].width,oe[re].height,0,Re,Ue,oe[re].data);for(let De=0;De<Te.length;De++){const ht=Te[De].image[re].image;U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,0,0,ht.width,ht.height,Re,Ue,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,Be,ht.width,ht.height,0,Re,Ue,ht.data)}}else{U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Re,Ue,oe[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Be,Re,Ue,oe[re]);for(let De=0;De<Te.length;De++){const Ne=Te[De];U?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,0,0,Re,Ue,Ne.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,De+1,Be,Re,Ue,Ne.image[re])}}}u(x)&&w(n.TEXTURE_CUBE_MAP),ee.__version=B.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function fe(T,x,L,I,B,ee){const ie=r.convert(L.format,L.colorSpace),X=r.convert(L.type),q=S(L.internalFormat,ie,X,L.normalized,L.colorSpace),ae=i.get(x),ge=i.get(L);if(ge.__renderTarget=x,!ae.__hasExternalTextures){const oe=Math.max(1,x.width>>ee),de=Math.max(1,x.height>>ee);B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?t.texImage3D(B,ee,q,oe,de,x.depth,0,ie,X,null):t.texImage2D(B,ee,q,oe,de,0,ie,X,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),pe(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,I,B,ge.__webglTexture,0,ue(x)):(B===n.TEXTURE_2D||B>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,I,B,ge.__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(T,x,L){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const I=x.depthTexture,B=I&&I.isDepthTexture?I.type:null,ee=b(x.stencilBuffer,B),ie=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;pe(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(x),ee,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(x),ee,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ee,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,T)}else{const I=x.textures;for(let B=0;B<I.length;B++){const ee=I[B],ie=r.convert(ee.format,ee.colorSpace),X=r.convert(ee.type),q=S(ee.internalFormat,ie,X,ee.normalized,ee.colorSpace);pe(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(x),q,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(x),q,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,q,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ke(T,x,L){const I=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const B=i.get(x.depthTexture);if(B.__renderTarget=x,(!B.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),I){if(B.__webglInit===void 0&&(B.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),B.__webglTexture===void 0){B.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture),je(n.TEXTURE_CUBE_MAP,x.depthTexture);const ae=r.convert(x.depthTexture.format),ge=r.convert(x.depthTexture.type);let oe;x.depthTexture.format===Tn?oe=n.DEPTH_COMPONENT24:x.depthTexture.format===$n&&(oe=n.DEPTH24_STENCIL8);for(let de=0;de<6;de++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,oe,x.width,x.height,0,ae,ge,null)}}else K(x.depthTexture,0);const ee=B.__webglTexture,ie=ue(x),X=I?n.TEXTURE_CUBE_MAP_POSITIVE_X+L:n.TEXTURE_2D,q=x.depthTexture.format===$n?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Tn)pe(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,X,ee,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,q,X,ee,0);else if(x.depthTexture.format===$n)pe(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,X,ee,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,q,X,ee,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(T){const x=i.get(T),L=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const I=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),I){const B=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,I.removeEventListener("dispose",B)};I.addEventListener("dispose",B),x.__depthDisposeCallback=B}x.__boundDepthTexture=I}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(L)for(let I=0;I<6;I++)ke(x.__webglFramebuffer[I],T,I);else{const I=T.texture.mipmaps;I&&I.length>0?ke(x.__webglFramebuffer[0],T,0):ke(x.__webglFramebuffer,T,0)}else if(L){x.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[I]),x.__webglDepthbuffer[I]===void 0)x.__webglDepthbuffer[I]=n.createRenderbuffer(),We(x.__webglDepthbuffer[I],T,!1);else{const B=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=x.__webglDepthbuffer[I];n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,ee)}}else{const I=T.texture.mipmaps;if(I&&I.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),We(x.__webglDepthbuffer,T,!1);else{const B=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,ee)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(T,x,L){const I=i.get(T);x!==void 0&&fe(I.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&tt(T)}function qe(T){const x=T.texture,L=i.get(T),I=i.get(x);T.addEventListener("dispose",v);const B=T.textures,ee=T.isWebGLCubeRenderTarget===!0,ie=B.length>1;if(ie||(I.__webglTexture===void 0&&(I.__webglTexture=n.createTexture()),I.__version=x.version,a.memory.textures++),ee){L.__webglFramebuffer=[];for(let X=0;X<6;X++)if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[X]=[];for(let q=0;q<x.mipmaps.length;q++)L.__webglFramebuffer[X][q]=n.createFramebuffer()}else L.__webglFramebuffer[X]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let X=0;X<x.mipmaps.length;X++)L.__webglFramebuffer[X]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(ie)for(let X=0,q=B.length;X<q;X++){const ae=i.get(B[X]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&pe(T)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let X=0;X<B.length;X++){const q=B[X];L.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[X]);const ae=r.convert(q.format,q.colorSpace),ge=r.convert(q.type),oe=S(q.internalFormat,ae,ge,q.normalized,q.colorSpace,T.isXRRenderTarget===!0),de=ue(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,de,oe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+X,n.RENDERBUFFER,L.__webglColorRenderbuffer[X])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),We(L.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ee){t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture),je(n.TEXTURE_CUBE_MAP,x);for(let X=0;X<6;X++)if(x.mipmaps&&x.mipmaps.length>0)for(let q=0;q<x.mipmaps.length;q++)fe(L.__webglFramebuffer[X][q],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,q);else fe(L.__webglFramebuffer[X],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);u(x)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){for(let X=0,q=B.length;X<q;X++){const ae=B[X],ge=i.get(ae);let oe=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ge.__webglTexture),je(oe,ae),fe(L.__webglFramebuffer,T,ae,n.COLOR_ATTACHMENT0+X,oe,0),u(ae)&&w(oe)}t.unbindTexture()}else{let X=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(X=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(X,I.__webglTexture),je(X,x),x.mipmaps&&x.mipmaps.length>0)for(let q=0;q<x.mipmaps.length;q++)fe(L.__webglFramebuffer[q],T,x,n.COLOR_ATTACHMENT0,X,q);else fe(L.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,X,0);u(x)&&w(X),t.unbindTexture()}T.depthBuffer&&tt(T)}function ut(T){const x=T.textures;for(let L=0,I=x.length;L<I;L++){const B=x[L];if(u(B)){const ee=C(T),ie=i.get(B).__webglTexture;t.bindTexture(ee,ie),w(ee),t.unbindTexture()}}}const mt=[],xt=[];function ne(T){if(T.samples>0){if(pe(T)===!1){const x=T.textures,L=T.width,I=T.height;let B=n.COLOR_BUFFER_BIT;const ee=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=i.get(T),X=x.length>1;if(X)for(let ae=0;ae<x.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ie.__webglMultisampledFramebuffer);const q=T.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ie.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ie.__webglFramebuffer);for(let ae=0;ae<x.length;ae++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(B|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(B|=n.STENCIL_BUFFER_BIT)),X){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ie.__webglColorRenderbuffer[ae]);const ge=i.get(x[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ge,0)}n.blitFramebuffer(0,0,L,I,0,0,L,I,B,n.NEAREST),d===!0&&(mt.length=0,xt.length=0,mt.push(n.COLOR_ATTACHMENT0+ae),T.depthBuffer&&T.resolveDepthBuffer===!1&&(mt.push(ee),xt.push(ee),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,xt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,mt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),X)for(let ae=0;ae<x.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,ie.__webglColorRenderbuffer[ae]);const ge=i.get(x[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ie.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ie.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&d){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ue(T){return Math.min(s.maxSamples,T.samples)}function pe(T){const x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(T){const x=a.render.frame;f.get(T)!==x&&(f.set(T,x),T.update())}function Ce(T,x){const L=T.colorSpace,I=T.format,B=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||L!==Vs&&L!==Un&&($e.getTransfer(L)===nt?(I!==Zt||B!==kt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",L)),x}function Se(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=Q,this.getTextureUnits=Y,this.setTextureUnits=O,this.setTexture2D=K,this.setTexture2DArray=se,this.setTexture3D=le,this.setTextureCube=_e,this.rebindTextures=Ke,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=ne,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=pe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function m_(n,e){function t(i,s=Un){let r;const a=$e.getTransfer(s);if(i===kt)return n.UNSIGNED_BYTE;if(i===Va)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ha)return n.UNSIGNED_SHORT_5_5_5_1;if(i===yc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ec)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Mc)return n.BYTE;if(i===Sc)return n.SHORT;if(i===Hi)return n.UNSIGNED_SHORT;if(i===Ga)return n.INT;if(i===dn)return n.UNSIGNED_INT;if(i===an)return n.FLOAT;if(i===bn)return n.HALF_FLOAT;if(i===bc)return n.ALPHA;if(i===Tc)return n.RGB;if(i===Zt)return n.RGBA;if(i===Tn)return n.DEPTH_COMPONENT;if(i===$n)return n.DEPTH_STENCIL;if(i===wc)return n.RED;if(i===Wa)return n.RED_INTEGER;if(i===Jn)return n.RG;if(i===ja)return n.RG_INTEGER;if(i===Xa)return n.RGBA_INTEGER;if(i===Cs||i===Ns||i===Ps||i===Ds)if(a===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Cs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Cs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ps)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ds)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ia||i===sa||i===ra||i===aa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oa||i===la||i===ca||i===da||i===ua||i===ks||i===ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oa||i===la)return a===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ca)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===da)return r.COMPRESSED_R11_EAC;if(i===ua)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ks)return r.COMPRESSED_RG11_EAC;if(i===ha)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fa||i===pa||i===ma||i===ga||i===_a||i===xa||i===va||i===Ma||i===Sa||i===ya||i===Ea||i===ba||i===Ta||i===wa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fa)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pa)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ma)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ga)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_a)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xa)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===va)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ma)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sa)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ya)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ea)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ba)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ta)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wa)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Aa||i===Ra||i===Ca)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Aa)return a===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ca)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Na||i===Pa||i===Gs||i===Da)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Da)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Wi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const g_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,__=`
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

}`;class x_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new un({vertexShader:g_,fragmentShader:__,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new Ki(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class v_ extends ti{constructor(e,t){super();const i=this;let s=null,r=1,a=null,l="local-floor",d=1,c=null,f=null,m=null,h=null,g=null,_=null;const M=typeof XRWebGLBinding<"u",p=new x_,u={},w=t.getContextAttributes();let C=null,S=null;const b=[],E=[],R=new et;let v=null;const A=new zt;A.viewport=new ct;const P=new zt;P.viewport=new ct;const D=[A,P],F=new Rh;let Q=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let he=b[Z];return he===void 0&&(he=new pr,b[Z]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Z){let he=b[Z];return he===void 0&&(he=new pr,b[Z]=he),he.getGripSpace()},this.getHand=function(Z){let he=b[Z];return he===void 0&&(he=new pr,b[Z]=he),he.getHandSpace()};function O(Z){const he=E.indexOf(Z.inputSource);if(he===-1)return;const G=b[he];G!==void 0&&(G.update(Z.inputSource,Z.frame,c||a),G.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",k);for(let Z=0;Z<b.length;Z++){const he=E[Z];he!==null&&(E[Z]=null,b[Z].disconnect(he))}Q=null,Y=null,p.reset();for(const Z in u)delete u[Z];e.setRenderTarget(C),g=null,h=null,m=null,s=null,S=null,je.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){l=Z,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return m===null&&M&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",V),s.addEventListener("inputsourceschange",k),w.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,me=null,ce=null;w.depth&&(ce=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=w.stencil?$n:Tn,me=w.stencil?Wi:dn);const fe={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};m=this.getBinding(),h=m.createProjectionLayer(fe),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new cn(h.textureWidth,h.textureHeight,{format:Zt,type:kt,depthTexture:new wi(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const G={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new cn(g.framebufferWidth,g.framebufferHeight,{format:Zt,type:kt,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(d),c=null,a=await s.requestReferenceSpace(l),je.setContext(s),je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(Z){for(let he=0;he<Z.removed.length;he++){const G=Z.removed[he],me=E.indexOf(G);me>=0&&(E[me]=null,b[me].disconnect(G))}for(let he=0;he<Z.added.length;he++){const G=Z.added[he];let me=E.indexOf(G);if(me===-1){for(let fe=0;fe<b.length;fe++)if(fe>=E.length){E.push(G),me=fe;break}else if(E[fe]===null){E[fe]=G,me=fe;break}if(me===-1)break}const ce=b[me];ce&&ce.connect(G)}}const K=new j,se=new j;function le(Z,he,G){K.setFromMatrixPosition(he.matrixWorld),se.setFromMatrixPosition(G.matrixWorld);const me=K.distanceTo(se),ce=he.projectionMatrix.elements,fe=G.projectionMatrix.elements,We=ce[14]/(ce[10]-1),ke=ce[14]/(ce[10]+1),tt=(ce[9]+1)/ce[5],Ke=(ce[9]-1)/ce[5],qe=(ce[8]-1)/ce[0],ut=(fe[8]+1)/fe[0],mt=We*qe,xt=We*ut,ne=me/(-qe+ut),ue=ne*-qe;if(he.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ue),Z.translateZ(ne),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ce[10]===-1)Z.projectionMatrix.copy(he.projectionMatrix),Z.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const pe=We+ne,N=ke+ne,Ce=mt-ue,Se=xt+(me-ue),T=tt*ke/N*pe,x=Ke*ke/N*pe;Z.projectionMatrix.makePerspective(Ce,Se,T,x,pe,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function _e(Z,he){he===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(he.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let he=Z.near,G=Z.far;p.texture!==null&&(p.depthNear>0&&(he=p.depthNear),p.depthFar>0&&(G=p.depthFar)),F.near=P.near=A.near=he,F.far=P.far=A.far=G,(Q!==F.near||Y!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),Q=F.near,Y=F.far),F.layers.mask=Z.layers.mask|6,A.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;const me=Z.parent,ce=F.cameras;_e(F,me);for(let fe=0;fe<ce.length;fe++)_e(ce[fe],me);ce.length===2?le(F,A,P):F.projectionMatrix.copy(A.projectionMatrix),be(Z,F,me)};function be(Z,he,G){G===null?Z.matrix.copy(he.matrixWorld):(Z.matrix.copy(G.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(he.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(he.projectionMatrix),Z.projectionMatrixInverse.copy(he.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=La*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&g===null))return d},this.setFoveation=function(Z){d=Z,h!==null&&(h.fixedFoveation=Z),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Z){return u[Z]};let He=null;function st(Z,he){if(f=he.getViewerPose(c||a),_=he,f!==null){const G=f.views;g!==null&&(e.setRenderTargetFramebuffer(S,g.framebuffer),e.setRenderTarget(S));let me=!1;G.length!==F.cameras.length&&(F.cameras.length=0,me=!0);for(let ke=0;ke<G.length;ke++){const tt=G[ke];let Ke=null;if(g!==null)Ke=g.getViewport(tt);else{const ut=m.getViewSubImage(h,tt);Ke=ut.viewport,ke===0&&(e.setRenderTargetTextures(S,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(S))}let qe=D[ke];qe===void 0&&(qe=new zt,qe.layers.enable(ke),qe.viewport=new ct,D[ke]=qe),qe.matrix.fromArray(tt.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(tt.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ke===0&&(F.matrix.copy(qe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),me===!0&&F.cameras.push(qe)}const ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){m=i.getBinding();const ke=m.getDepthInformation(G[0]);ke&&ke.isValid&&ke.texture&&p.init(ke,s.renderState)}if(ce&&ce.includes("camera-access")&&M){e.state.unbindTexture(),m=i.getBinding();for(let ke=0;ke<G.length;ke++){const tt=G[ke].camera;if(tt){let Ke=u[tt];Ke||(Ke=new Fc,u[tt]=Ke);const qe=m.getCameraImage(tt);Ke.sourceTexture=qe}}}}for(let G=0;G<b.length;G++){const me=E[G],ce=b[G];me!==null&&ce!==void 0&&ce.update(me,he,c||a)}He&&He(Z,he),he.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:he}),_=null}const je=new Gc;je.setAnimationLoop(st),this.setAnimationLoop=function(Z){He=Z},this.dispose=function(){}}}const M_=new dt,$c=new Oe;$c.set(-1,0,0,0,1,0,0,0,1);function S_(n,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,Oc(n)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,w,C,S){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(p,u):u.isMeshLambertMaterial?(r(p,u),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(p,u),m(p,u)):u.isMeshPhongMaterial?(r(p,u),f(p,u),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(p,u),h(p,u),u.isMeshPhysicalMaterial&&g(p,u,S)):u.isMeshMatcapMaterial?(r(p,u),_(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),M(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&l(p,u)):u.isPointsMaterial?d(p,u,w,C):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===It&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===It&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const w=e.get(u),C=w.envMap,S=w.envMapRotation;C&&(p.envMap.value=C,p.envMapRotation.value.setFromMatrix4(M_.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply($c),p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function l(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function d(p,u,w,C){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*w,p.scale.value=C*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function f(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function m(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function h(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function g(p,u,w){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===It&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,u){u.matcap&&(p.matcap.value=u.matcap)}function M(p,u){const w=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function y_(n,e,t,i){let s={},r={},a=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(S,b){const E=b.program;i.uniformBlockBinding(S,E)}function c(S,b){let E=s[S.id];E===void 0&&(p(S),E=f(S),s[S.id]=E,S.addEventListener("dispose",w));const R=b.program;i.updateUBOMapping(S,R);const v=e.render.frame;r[S.id]!==v&&(h(S),r[S.id]=v)}function f(S){const b=m();S.__bindingPointIndex=b;const E=n.createBuffer(),R=S.__size,v=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,E),E}function m(){for(let S=0;S<l;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const b=s[S.id],E=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let v=0,A=E.length;v<A;v++){const P=E[v];if(Array.isArray(P))for(let D=0,F=P.length;D<F;D++)g(P[D],v,D,R);else g(P,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(S,b,E,R){if(M(S,b,E,R)===!0){const v=S.__offset,A=S.value;if(Array.isArray(A)){let P=0;for(let D=0;D<A.length;D++){const F=A[D],Q=u(F);_(F,S.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,S.__data)}}function _(S,b,E){typeof S=="number"||typeof S=="boolean"?b[0]=S:S.isMatrix3?(b[0]=S.elements[0],b[1]=S.elements[1],b[2]=S.elements[2],b[3]=0,b[4]=S.elements[3],b[5]=S.elements[4],b[6]=S.elements[5],b[7]=0,b[8]=S.elements[6],b[9]=S.elements[7],b[10]=S.elements[8],b[11]=0):ArrayBuffer.isView(S)?b.set(new S.constructor(S.buffer,S.byteOffset,b.length)):S.toArray(b,E)}function M(S,b,E,R){const v=S.value,A=b+"_"+E;if(R[A]===void 0)return typeof v=="number"||typeof v=="boolean"?R[A]=v:ArrayBuffer.isView(v)?R[A]=v.slice():R[A]=v.clone(),!0;{const P=R[A];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function p(S){const b=S.uniforms;let E=0;const R=16;for(let A=0,P=b.length;A<P;A++){const D=Array.isArray(b[A])?b[A]:[b[A]];for(let F=0,Q=D.length;F<Q;F++){const Y=D[F],O=Array.isArray(Y.value)?Y.value:[Y.value];for(let V=0,k=O.length;V<k;V++){const K=O[V],se=u(K),le=E%R,_e=le%se.boundary,be=le+_e;E+=_e,be!==0&&R-be<se.storage&&(E+=R-be),Y.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=E,E+=se.storage}}}const v=E%R;return v>0&&(E+=R-v),S.__size=E,S.__cache={},this}function u(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",S),b}function w(S){const b=S.target;b.removeEventListener("dispose",w);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function C(){for(const S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:d,update:c,dispose:C}}const E_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nn=null;function b_(){return nn===null&&(nn=new dh(E_,16,16,Jn,bn),nn.name="DFG_LUT",nn.minFilter=Rt,nn.magFilter=Rt,nn.wrapS=vn,nn.wrapT=vn,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}class T_{constructor(e={}){const{canvas:t=Gu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:h=!1,outputBufferType:g=kt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const M=g,p=new Set([Xa,ja,Wa]),u=new Set([kt,dn,Hi,Wi,Va,Ha]),w=new Uint32Array(4),C=new Int32Array(4),S=new j;let b=null,E=null;const R=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,F=null,Q=null,Y=null,O=null;this._outputColorSpace=Ht;let V=0,k=0,K=null,se=-1,le=null;const _e=new ct,be=new ct;let He=null;const st=new Ze(0);let je=0,Z=t.width,he=t.height,G=1,me=null,ce=null;const fe=new ct(0,0,Z,he),We=new ct(0,0,Z,he);let ke=!1;const tt=new Ka;let Ke=!1,qe=!1;const ut=new dt,mt=new j,xt=new ct,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function pe(){return K===null?G:1}let N=i;function Ce(y,z){return t.getContext(y,z)}try{const y={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:d,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ka}`),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",ot,!1),t.addEventListener("webglcontextcreationerror",Jt,!1),N===null){const z="webgl2";if(N=Ce(z,y),N===null)throw Ce(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw Qe("WebGLRenderer: "+y.message),y}let Se,T,x,L,I,B,ee,ie,X,q,ae,ge,oe,de,Re,Ue,Be,U,xe,te,ve,Te,re;function De(){Se=new bm(N),Se.init(),ve=new m_(N,Se),T=new gm(N,Se,e,ve),x=new f_(N,Se),T.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),Q=N.createFramebuffer(),Y=N.createFramebuffer(),O=N.createFramebuffer(),L=new Am(N),I=new Qg,B=new p_(N,Se,x,I,T,ve,L),ee=new Em(P),ie=new Nh(N),Te=new pm(N,ie),X=new Tm(N,ie,L,Te),q=new Cm(N,X,ie,Te,L),U=new Rm(N,T,B),Re=new _m(I),ae=new Jg(P,ee,Se,T,Te,Re),ge=new S_(P,I),oe=new t_,de=new o_(Se),Be=new fm(P,ee,x,q,_,d),Ue=new h_(P,q,T),re=new y_(N,L,T,x),xe=new mm(N,Se,L),te=new wm(N,Se,L),L.programs=ae.programs,P.capabilities=T,P.extensions=Se,P.properties=I,P.renderLists=oe,P.shadowMap=Ue,P.state=x,P.info=L}De(),M!==kt&&(A=new Pm(M,t.width,t.height,l,s,r));const Ne=new v_(P,N);this.xr=Ne,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=Se.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Se.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(Z,he,!1))},this.getSize=function(y){return y.set(Z,he)},this.setSize=function(y,z,$=!0){if(Ne.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=y,he=z,t.width=Math.floor(y*G),t.height=Math.floor(z*G),$===!0&&(t.style.width=y+"px",t.style.height=z+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,y,z)},this.getDrawingBufferSize=function(y){return y.set(Z*G,he*G).floor()},this.setDrawingBufferSize=function(y,z,$){Z=y,he=z,G=$,t.width=Math.floor(y*$),t.height=Math.floor(z*$),this.setViewport(0,0,y,z)},this.setEffects=function(y){if(M===kt){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let z=0;z<y.length;z++)if(y[z].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(_e)},this.getViewport=function(y){return y.copy(fe)},this.setViewport=function(y,z,$,H){y.isVector4?fe.set(y.x,y.y,y.z,y.w):fe.set(y,z,$,H),x.viewport(_e.copy(fe).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(We)},this.setScissor=function(y,z,$,H){y.isVector4?We.set(y.x,y.y,y.z,y.w):We.set(y,z,$,H),x.scissor(be.copy(We).multiplyScalar(G).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(y){x.setScissorTest(ke=y)},this.setOpaqueSort=function(y){me=y},this.setTransparentSort=function(y){ce=y},this.getClearColor=function(y){return y.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(y=!0,z=!0,$=!0){let H=0;if(y){let W=!1;if(K!==null){const Ee=K.texture.format;W=p.has(Ee)}if(W){const Ee=K.texture.type,Ae=u.has(Ee),ye=Be.getClearColor(),Pe=Be.getClearAlpha(),Le=ye.r,ze=ye.g,Ve=ye.b;Ae?(w[0]=Le,w[1]=ze,w[2]=Ve,w[3]=Pe,N.clearBufferuiv(N.COLOR,0,w)):(C[0]=Le,C[1]=ze,C[2]=Ve,C[3]=Pe,N.clearBufferiv(N.COLOR,0,C))}else H|=N.COLOR_BUFFER_BIT}z&&(H|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),F=y},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),Be.dispose(),oe.dispose(),de.dispose(),I.dispose(),ee.dispose(),q.dispose(),Te.dispose(),re.dispose(),ae.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",so),Ne.removeEventListener("sessionend",ro),zn.stop()};function ht(y){y.preventDefault(),Go("WebGLRenderer: Context Lost."),D=!0}function ot(){Go("WebGLRenderer: Context Restored."),D=!1;const y=L.autoReset,z=Ue.enabled,$=Ue.autoUpdate,H=Ue.needsUpdate,W=Ue.type;De(),L.autoReset=y,Ue.enabled=z,Ue.autoUpdate=$,Ue.needsUpdate=H,Ue.type=W}function Jt(y){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Qt(y){const z=y.target;z.removeEventListener("dispose",Qt),Qc(z)}function Qc(y){ed(y),I.remove(y)}function ed(y){const z=I.get(y).programs;z!==void 0&&(z.forEach(function($){ae.releaseProgram($)}),y.isShaderMaterial&&ae.releaseShaderCache(y))}this.renderBufferDirect=function(y,z,$,H,W,Ee){z===null&&(z=ne);const Ae=W.isMesh&&W.matrixWorld.determinantAffine()<0,ye=id(y,z,$,H,W);x.setMaterial(H,Ae);let Pe=$.index,Le=1;if(H.wireframe===!0){if(Pe=X.getWireframeAttribute($),Pe===void 0)return;Le=2}const ze=$.drawRange,Ve=$.attributes.position;let Ie=ze.start*Le,it=(ze.start+ze.count)*Le;Ee!==null&&(Ie=Math.max(Ie,Ee.start*Le),it=Math.min(it,(Ee.start+Ee.count)*Le)),Pe!==null?(Ie=Math.max(Ie,0),it=Math.min(it,Pe.count)):Ve!=null&&(Ie=Math.max(Ie,0),it=Math.min(it,Ve.count));const gt=it-Ie;if(gt<0||gt===1/0)return;Te.setup(W,H,ye,$,Pe);let ft,rt=xe;if(Pe!==null&&(ft=ie.get(Pe),rt=te,rt.setIndex(ft)),W.isMesh)H.wireframe===!0?(x.setLineWidth(H.wireframeLinewidth*pe()),rt.setMode(N.LINES)):rt.setMode(N.TRIANGLES);else if(W.isLine){let bt=H.linewidth;bt===void 0&&(bt=1),x.setLineWidth(bt*pe()),W.isLineSegments?rt.setMode(N.LINES):W.isLineLoop?rt.setMode(N.LINE_LOOP):rt.setMode(N.LINE_STRIP)}else W.isPoints?rt.setMode(N.POINTS):W.isSprite&&rt.setMode(N.TRIANGLES);if(W.isBatchedMesh)if(Se.get("WEBGL_multi_draw"))rt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const bt=W._multiDrawStarts,we=W._multiDrawCounts,Ft=W._multiDrawCount,Je=Pe?ie.get(Pe).bytesPerElement:1,Gt=I.get(H).currentProgram.getUniforms();for(let en=0;en<Ft;en++)Gt.setValue(N,"_gl_DrawID",en),rt.render(bt[en]/Je,we[en])}else if(W.isInstancedMesh)rt.renderInstances(Ie,gt,W.count);else if($.isInstancedBufferGeometry){const bt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,we=Math.min($.instanceCount,bt);rt.renderInstances(Ie,gt,we)}else rt.render(Ie,gt)};function io(y,z,$){y.transparent===!0&&y.side===xn&&y.forceSinglePass===!1?(y.side=It,y.needsUpdate=!0,Qi(y,z,$),y.side=On,y.needsUpdate=!0,Qi(y,z,$),y.side=xn):Qi(y,z,$)}this.compile=function(y,z,$=null){$===null&&($=y),E=de.get($),E.init(z),v.push(E),$.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),y!==$&&y.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights();const H=new Set;return y.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Ee=W.material;if(Ee)if(Array.isArray(Ee))for(let Ae=0;Ae<Ee.length;Ae++){const ye=Ee[Ae];io(ye,$,W),H.add(ye)}else io(Ee,$,W),H.add(Ee)}),E=v.pop(),H},this.compileAsync=function(y,z,$=null){const H=this.compile(y,z,$);return new Promise(W=>{function Ee(){if(H.forEach(function(Ae){I.get(Ae).currentProgram.isReady()&&H.delete(Ae)}),H.size===0){W(y);return}setTimeout(Ee,10)}Se.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let tr=null;function td(y){tr&&tr(y)}function so(){zn.stop()}function ro(){zn.start()}const zn=new Gc;zn.setAnimationLoop(td),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(y){tr=y,Ne.setAnimationLoop(y),y===null?zn.stop():zn.start()},Ne.addEventListener("sessionstart",so),Ne.addEventListener("sessionend",ro),this.render=function(y,z){if(z!==void 0&&z.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(y,z);const $=Ne.enabled===!0&&Ne.isPresenting===!0,H=A!==null&&(K===null||$)&&A.begin(P,K);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(z),z=Ne.getCamera()),y.isScene===!0&&y.onBeforeRender(P,y,z,K),E=de.get(y,v.length),E.init(z),E.state.textureUnits=B.getTextureUnits(),v.push(E),ut.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),tt.setFromProjectionMatrix(ut,on,z.reversedDepth),qe=this.localClippingEnabled,Ke=Re.init(this.clippingPlanes,qe),b=oe.get(y,R.length),b.init(),R.push(b),Ne.enabled===!0&&Ne.isPresenting===!0){const Ae=P.xr.getDepthSensingMesh();Ae!==null&&nr(Ae,z,-1/0,P.sortObjects)}nr(y,z,0,P.sortObjects),b.finish(),P.sortObjects===!0&&b.sort(me,ce,z.reversedDepth),ue=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,ue&&Be.addToRenderList(b,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Re.beginShadows();const W=E.state.shadowsArray;if(Ue.render(W,y,z),Ke===!0&&Re.endShadows(),(H&&A.hasRenderPass())===!1){const Ae=b.opaque,ye=b.transmissive;if(E.setupLights(),z.isArrayCamera){const Pe=z.cameras;if(ye.length>0)for(let Le=0,ze=Pe.length;Le<ze;Le++){const Ve=Pe[Le];oo(Ae,ye,y,Ve)}ue&&Be.render(y);for(let Le=0,ze=Pe.length;Le<ze;Le++){const Ve=Pe[Le];ao(b,y,Ve,Ve.viewport)}}else ye.length>0&&oo(Ae,ye,y,z),ue&&Be.render(y),ao(b,y,z)}K!==null&&k===0&&(B.updateMultisampleRenderTarget(K),B.updateRenderTargetMipmap(K)),H&&A.end(P),y.isScene===!0&&y.onAfterRender(P,y,z),Te.resetDefaultState(),se=-1,le=null,v.pop(),v.length>0?(E=v[v.length-1],B.setTextureUnits(E.state.textureUnits),Ke===!0&&Re.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?b=R[R.length-1]:b=null,F!==null&&F.renderEnd()};function nr(y,z,$,H){if(y.visible===!1)return;if(y.layers.test(z.layers)){if(y.isGroup)$=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(z);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||tt.intersectsSprite(y)){H&&xt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ut);const Ae=q.update(y),ye=y.material;ye.visible&&b.push(y,Ae,ye,$,xt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||tt.intersectsObject(y))){const Ae=q.update(y),ye=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),xt.copy(y.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),xt.copy(Ae.boundingSphere.center)),xt.applyMatrix4(y.matrixWorld).applyMatrix4(ut)),Array.isArray(ye)){const Pe=Ae.groups;for(let Le=0,ze=Pe.length;Le<ze;Le++){const Ve=Pe[Le],Ie=ye[Ve.materialIndex];Ie&&Ie.visible&&b.push(y,Ae,Ie,$,xt.z,Ve)}}else ye.visible&&b.push(y,Ae,ye,$,xt.z,null)}}const Ee=y.children;for(let Ae=0,ye=Ee.length;Ae<ye;Ae++)nr(Ee[Ae],z,$,H)}function ao(y,z,$,H){const{opaque:W,transmissive:Ee,transparent:Ae}=y;E.setupLightsView($),Ke===!0&&Re.setGlobalState(P.clippingPlanes,$),H&&x.viewport(_e.copy(H)),W.length>0&&Ji(W,z,$),Ee.length>0&&Ji(Ee,z,$),Ae.length>0&&Ji(Ae,z,$),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function oo(y,z,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){const Ie=Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new cn(1,1,{generateMipmaps:!0,type:Ie?bn:kt,minFilter:qn,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const Ee=E.state.transmissionRenderTarget[H.id],Ae=H.viewport||_e;Ee.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);const ye=P.getRenderTarget(),Pe=P.getActiveCubeFace(),Le=P.getActiveMipmapLevel();P.setRenderTarget(Ee),P.getClearColor(st),je=P.getClearAlpha(),je<1&&P.setClearColor(16777215,.5),P.clear(),ue&&Be.render($);const ze=P.toneMapping;P.toneMapping=ln;const Ve=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),Ke===!0&&Re.setGlobalState(P.clippingPlanes,H),Ji(y,$,H),B.updateMultisampleRenderTarget(Ee),B.updateRenderTargetMipmap(Ee),Se.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let it=0,gt=z.length;it<gt;it++){const ft=z[it],{object:rt,geometry:bt,material:we,group:Ft}=ft;if(we.side===xn&&rt.layers.test(H.layers)){const Je=we.side;we.side=It,we.needsUpdate=!0,lo(rt,$,H,bt,we,Ft),we.side=Je,we.needsUpdate=!0,Ie=!0}}Ie===!0&&(B.updateMultisampleRenderTarget(Ee),B.updateRenderTargetMipmap(Ee))}P.setRenderTarget(ye,Pe,Le),P.setClearColor(st,je),Ve!==void 0&&(H.viewport=Ve),P.toneMapping=ze}function Ji(y,z,$){const H=z.isScene===!0?z.overrideMaterial:null;for(let W=0,Ee=y.length;W<Ee;W++){const Ae=y[W],{object:ye,geometry:Pe,group:Le}=Ae;let ze=Ae.material;ze.allowOverride===!0&&H!==null&&(ze=H),ye.layers.test($.layers)&&lo(ye,z,$,Pe,ze,Le)}}function lo(y,z,$,H,W,Ee){y.onBeforeRender(P,z,$,H,W,Ee),y.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),W.onBeforeRender(P,z,$,H,y,Ee),W.transparent===!0&&W.side===xn&&W.forceSinglePass===!1?(W.side=It,W.needsUpdate=!0,P.renderBufferDirect($,z,H,W,y,Ee),W.side=On,W.needsUpdate=!0,P.renderBufferDirect($,z,H,W,y,Ee),W.side=xn):P.renderBufferDirect($,z,H,W,y,Ee),y.onAfterRender(P,z,$,H,W,Ee)}function Qi(y,z,$){z.isScene!==!0&&(z=ne);const H=I.get(y),W=E.state.lights,Ee=E.state.shadowsArray,Ae=W.state.version,ye=ae.getParameters(y,W.state,Ee,z,$,E.state.lightProbeGridArray),Pe=ae.getProgramCacheKey(ye);let Le=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?z.environment:null,H.fog=z.fog;const ze=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=ee.get(y.envMap||H.environment,ze),H.envMapRotation=H.environment!==null&&y.envMap===null?z.environmentRotation:y.envMapRotation,Le===void 0&&(y.addEventListener("dispose",Qt),Le=new Map,H.programs=Le);let Ve=Le.get(Pe);if(Ve!==void 0){if(H.currentProgram===Ve&&H.lightsStateVersion===Ae)return uo(y,ye),Ve}else ye.uniforms=ae.getUniforms(y),F!==null&&y.isNodeMaterial&&F.build(y,$,ye),y.onBeforeCompile(ye,P),Ve=ae.acquireProgram(ye,Pe),Le.set(Pe,Ve),H.uniforms=ye.uniforms;const Ie=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ie.clippingPlanes=Re.uniform),uo(y,ye),H.needsLights=rd(y),H.lightsStateVersion=Ae,H.needsLights&&(Ie.ambientLightColor.value=W.state.ambient,Ie.lightProbe.value=W.state.probe,Ie.directionalLights.value=W.state.directional,Ie.directionalLightShadows.value=W.state.directionalShadow,Ie.spotLights.value=W.state.spot,Ie.spotLightShadows.value=W.state.spotShadow,Ie.rectAreaLights.value=W.state.rectArea,Ie.ltc_1.value=W.state.rectAreaLTC1,Ie.ltc_2.value=W.state.rectAreaLTC2,Ie.pointLights.value=W.state.point,Ie.pointLightShadows.value=W.state.pointShadow,Ie.hemisphereLights.value=W.state.hemi,Ie.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ie.spotLightMatrix.value=W.state.spotLightMatrix,Ie.spotLightMap.value=W.state.spotLightMap,Ie.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=E.state.lightProbeGridArray.length>0,H.currentProgram=Ve,H.uniformsList=null,Ve}function co(y){if(y.uniformsList===null){const z=y.currentProgram.getUniforms();y.uniformsList=Ls.seqWithValue(z.seq,y.uniforms)}return y.uniformsList}function uo(y,z){const $=I.get(y);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function nd(y,z){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;S.setFromMatrixPosition(z.matrixWorld);for(let $=0,H=y.length;$<H;$++){const W=y[$];if(W.texture!==null&&W.boundingBox.containsPoint(S))return W}return null}function id(y,z,$,H,W){z.isScene!==!0&&(z=ne),B.resetTextureUnits();const Ee=z.fog,Ae=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?z.environment:null,ye=K===null?P.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:$e.workingColorSpace,Pe=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Le=ee.get(H.envMap||Ae,Pe),ze=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ve=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!$.morphAttributes.position,it=!!$.morphAttributes.normal,gt=!!$.morphAttributes.color;let ft=ln;H.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ft=P.toneMapping);const rt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,bt=rt!==void 0?rt.length:0,we=I.get(H),Ft=E.state.lights;if(Ke===!0&&(qe===!0||y!==le)){const lt=y===le&&H.id===se;Re.setState(H,y,lt)}let Je=!1;H.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Ft.state.version||we.outputColorSpace!==ye||W.isBatchedMesh&&we.batching===!1||!W.isBatchedMesh&&we.batching===!0||W.isBatchedMesh&&we.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&we.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&we.instancing===!1||!W.isInstancedMesh&&we.instancing===!0||W.isSkinnedMesh&&we.skinning===!1||!W.isSkinnedMesh&&we.skinning===!0||W.isInstancedMesh&&we.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&we.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&we.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&we.instancingMorph===!1&&W.morphTexture!==null||we.envMap!==Le||H.fog===!0&&we.fog!==Ee||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Re.numPlanes||we.numIntersection!==Re.numIntersection)||we.vertexAlphas!==ze||we.vertexTangents!==Ve||we.morphTargets!==Ie||we.morphNormals!==it||we.morphColors!==gt||we.toneMapping!==ft||we.morphTargetsCount!==bt||!!we.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,we.__version=H.version);let Gt=we.currentProgram;Je===!0&&(Gt=Qi(H,z,W),F&&H.isNodeMaterial&&F.onUpdateProgram(H,Gt,we));let en=!1,wn=!1,ni=!1;const at=Gt.getUniforms(),_t=we.uniforms;if(x.useProgram(Gt.program)&&(en=!0,wn=!0,ni=!0),H.id!==se&&(se=H.id,wn=!0),we.needsLights){const lt=nd(E.state.lightProbeGridArray,W);we.lightProbeGrid!==lt&&(we.lightProbeGrid=lt,wn=!0)}if(en||le!==y){x.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),at.setValue(N,"projectionMatrix",y.projectionMatrix),at.setValue(N,"viewMatrix",y.matrixWorldInverse);const Rn=at.map.cameraPosition;Rn!==void 0&&Rn.setValue(N,mt.setFromMatrixPosition(y.matrixWorld)),T.logarithmicDepthBuffer&&at.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&at.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),le!==y&&(le=y,wn=!0,ni=!0)}if(we.needsLights&&(Ft.state.directionalShadowMap.length>0&&at.setValue(N,"directionalShadowMap",Ft.state.directionalShadowMap,B),Ft.state.spotShadowMap.length>0&&at.setValue(N,"spotShadowMap",Ft.state.spotShadowMap,B),Ft.state.pointShadowMap.length>0&&at.setValue(N,"pointShadowMap",Ft.state.pointShadowMap,B)),W.isSkinnedMesh){at.setOptional(N,W,"bindMatrix"),at.setOptional(N,W,"bindMatrixInverse");const lt=W.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),at.setValue(N,"boneTexture",lt.boneTexture,B))}W.isBatchedMesh&&(at.setOptional(N,W,"batchingTexture"),at.setValue(N,"batchingTexture",W._matricesTexture,B),at.setOptional(N,W,"batchingIdTexture"),at.setValue(N,"batchingIdTexture",W._indirectTexture,B),at.setOptional(N,W,"batchingColorTexture"),W._colorsTexture!==null&&at.setValue(N,"batchingColorTexture",W._colorsTexture,B));const An=$.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&U.update(W,$,Gt),(wn||we.receiveShadow!==W.receiveShadow)&&(we.receiveShadow=W.receiveShadow,at.setValue(N,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&z.environment!==null&&(_t.envMapIntensity.value=z.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=b_()),wn){if(at.setValue(N,"toneMappingExposure",P.toneMappingExposure),we.needsLights&&sd(_t,ni),Ee&&H.fog===!0&&ge.refreshFogUniforms(_t,Ee),ge.refreshMaterialUniforms(_t,H,G,he,E.state.transmissionRenderTarget[y.id]),we.needsLights&&we.lightProbeGrid){const lt=we.lightProbeGrid;_t.probesSH.value=lt.texture,_t.probesMin.value.copy(lt.boundingBox.min),_t.probesMax.value.copy(lt.boundingBox.max),_t.probesResolution.value.copy(lt.resolution)}Ls.upload(N,co(we),_t,B)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ls.upload(N,co(we),_t,B),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&at.setValue(N,"center",W.center),at.setValue(N,"modelViewMatrix",W.modelViewMatrix),at.setValue(N,"normalMatrix",W.normalMatrix),at.setValue(N,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const lt=H.uniformsGroups;for(let Rn=0,ii=lt.length;Rn<ii;Rn++){const ho=lt[Rn];re.update(ho,Gt),re.bind(ho,Gt)}}return Gt}function sd(y,z){y.ambientLightColor.needsUpdate=z,y.lightProbe.needsUpdate=z,y.directionalLights.needsUpdate=z,y.directionalLightShadows.needsUpdate=z,y.pointLights.needsUpdate=z,y.pointLightShadows.needsUpdate=z,y.spotLights.needsUpdate=z,y.spotLightShadows.needsUpdate=z,y.rectAreaLights.needsUpdate=z,y.hemisphereLights.needsUpdate=z}function rd(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(y,z,$){const H=I.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),I.get(y.texture).__webglTexture=z,I.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,z){const $=I.get(y);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(y,z=0,$=0){K=y,V=z,k=$;let H=null,W=!1,Ee=!1;if(y){const ye=I.get(y);if(ye.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,ye.__webglFramebuffer),_e.copy(y.viewport),be.copy(y.scissor),He=y.scissorTest,x.viewport(_e),x.scissor(be),x.setScissorTest(He),se=-1;return}else if(ye.__webglFramebuffer===void 0)B.setupRenderTarget(y);else if(ye.__hasExternalTextures)B.rebindTextures(y,I.get(y.texture).__webglTexture,I.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const ze=y.depthTexture;if(ye.__boundDepthTexture!==ze){if(ze!==null&&I.has(ze)&&(y.width!==ze.image.width||y.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(y)}}const Pe=y.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(Ee=!0);const Le=I.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Le[z])?H=Le[z][$]:H=Le[z],W=!0):y.samples>0&&B.useMultisampledRTT(y)===!1?H=I.get(y).__webglMultisampledFramebuffer:Array.isArray(Le)?H=Le[$]:H=Le,_e.copy(y.viewport),be.copy(y.scissor),He=y.scissorTest}else _e.copy(fe).multiplyScalar(G).floor(),be.copy(We).multiplyScalar(G).floor(),He=ke;if($!==0&&(H=Q),x.bindFramebuffer(N.FRAMEBUFFER,H)&&x.drawBuffers(y,H),x.viewport(_e),x.scissor(be),x.setScissorTest(He),W){const ye=I.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,ye.__webglTexture,$)}else if(Ee){const ye=z;for(let Pe=0;Pe<y.textures.length;Pe++){const Le=I.get(y.textures[Pe]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Pe,Le.__webglTexture,$,ye)}}else if(y!==null&&$!==0){const ye=I.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ye.__webglTexture,$)}se=-1},this.readRenderTargetPixels=function(y,z,$,H,W,Ee,Ae,ye=0){if(!(y&&y.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=I.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe){x.bindFramebuffer(N.FRAMEBUFFER,Pe);try{const Le=y.textures[ye],ze=Le.format,Ve=Le.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ye),!T.textureFormatReadable(ze)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(Ve)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=y.width-H&&$>=0&&$<=y.height-W&&N.readPixels(z,$,H,W,ve.convert(ze),ve.convert(Ve),Ee)}finally{const Le=K!==null?I.get(K).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(y,z,$,H,W,Ee,Ae,ye=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=I.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe)if(z>=0&&z<=y.width-H&&$>=0&&$<=y.height-W){x.bindFramebuffer(N.FRAMEBUFFER,Pe);const Le=y.textures[ye],ze=Le.format,Ve=Le.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ye),!T.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ie),N.bufferData(N.PIXEL_PACK_BUFFER,Ee.byteLength,N.STREAM_READ),N.readPixels(z,$,H,W,ve.convert(ze),ve.convert(Ve),0);const it=K!==null?I.get(K).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,it);const gt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Vu(N,gt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ie),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Ee),N.deleteBuffer(Ie),N.deleteSync(gt),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,z=null,$=0){const H=Math.pow(2,-$),W=Math.floor(y.image.width*H),Ee=Math.floor(y.image.height*H),Ae=z!==null?z.x:0,ye=z!==null?z.y:0;B.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,Ae,ye,W,Ee),x.unbindTexture()},this.copyTextureToTexture=function(y,z,$=null,H=null,W=0,Ee=0){let Ae,ye,Pe,Le,ze,Ve,Ie,it,gt;const ft=y.isCompressedTexture?y.mipmaps[Ee]:y.image;if($!==null)Ae=$.max.x-$.min.x,ye=$.max.y-$.min.y,Pe=$.isBox3?$.max.z-$.min.z:1,Le=$.min.x,ze=$.min.y,Ve=$.isBox3?$.min.z:0;else{const _t=Math.pow(2,-W);Ae=Math.floor(ft.width*_t),ye=Math.floor(ft.height*_t),y.isDataArrayTexture?Pe=ft.depth:y.isData3DTexture?Pe=Math.floor(ft.depth*_t):Pe=1,Le=0,ze=0,Ve=0}H!==null?(Ie=H.x,it=H.y,gt=H.z):(Ie=0,it=0,gt=0);const rt=ve.convert(z.format),bt=ve.convert(z.type);let we;z.isData3DTexture?(B.setTexture3D(z,0),we=N.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(B.setTexture2DArray(z,0),we=N.TEXTURE_2D_ARRAY):(B.setTexture2D(z,0),we=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment);const Ft=x.getParameter(N.UNPACK_ROW_LENGTH),Je=x.getParameter(N.UNPACK_IMAGE_HEIGHT),Gt=x.getParameter(N.UNPACK_SKIP_PIXELS),en=x.getParameter(N.UNPACK_SKIP_ROWS),wn=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,ft.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ft.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Le),x.pixelStorei(N.UNPACK_SKIP_ROWS,ze),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Ve);const ni=y.isDataArrayTexture||y.isData3DTexture,at=z.isDataArrayTexture||z.isData3DTexture;if(y.isDepthTexture){const _t=I.get(y),An=I.get(z),lt=I.get(_t.__renderTarget),Rn=I.get(An.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,lt.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let ii=0;ii<Pe;ii++)ni&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,I.get(y).__webglTexture,W,Ve+ii),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,I.get(z).__webglTexture,Ee,gt+ii)),N.blitFramebuffer(Le,ze,Ae,ye,Ie,it,Ae,ye,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(W!==0||y.isRenderTargetTexture||I.has(y)){const _t=I.get(y),An=I.get(z);x.bindFramebuffer(N.READ_FRAMEBUFFER,Y),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let lt=0;lt<Pe;lt++)ni?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_t.__webglTexture,W,Ve+lt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_t.__webglTexture,W),at?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,An.__webglTexture,Ee,gt+lt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,An.__webglTexture,Ee),W!==0?N.blitFramebuffer(Le,ze,Ae,ye,Ie,it,Ae,ye,N.COLOR_BUFFER_BIT,N.NEAREST):at?N.copyTexSubImage3D(we,Ee,Ie,it,gt+lt,Le,ze,Ae,ye):N.copyTexSubImage2D(we,Ee,Ie,it,Le,ze,Ae,ye);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else at?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(we,Ee,Ie,it,gt,Ae,ye,Pe,rt,bt,ft.data):z.isCompressedArrayTexture?N.compressedTexSubImage3D(we,Ee,Ie,it,gt,Ae,ye,Pe,rt,ft.data):N.texSubImage3D(we,Ee,Ie,it,gt,Ae,ye,Pe,rt,bt,ft):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Ee,Ie,it,Ae,ye,rt,bt,ft.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Ee,Ie,it,ft.width,ft.height,rt,ft.data):N.texSubImage2D(N.TEXTURE_2D,Ee,Ie,it,Ae,ye,rt,bt,ft);x.pixelStorei(N.UNPACK_ROW_LENGTH,Ft),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Je),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Gt),x.pixelStorei(N.UNPACK_SKIP_ROWS,en),x.pixelStorei(N.UNPACK_SKIP_IMAGES,wn),Ee===0&&z.generateMipmaps&&N.generateMipmap(we),x.unbindTexture()},this.initRenderTarget=function(y){I.get(y).__webglFramebuffer===void 0&&B.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?B.setTextureCube(y,0):y.isData3DTexture?B.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?B.setTexture2DArray(y,0):B.setTexture2D(y,0),x.unbindTexture()},this.resetState=function(){V=0,k=0,K=null,x.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const Oi=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],Yc=620,w_=560,A_=300,R_=2800,Il=850,Ul=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Fl=210,zr=300,Ol=.42,Bl=740,ws=n=>-(n+1)*Yc,C_=n=>n===1?1:1-Math.pow(2,-10*n),Bi=n=>new Promise(e=>setTimeout(e,n));function N_({onDone:n}){const e=J.useRef(null),t=J.useRef(null),i=J.useRef(null),s=J.useRef(null),r=J.useRef(null),a=J.useRef(null),l=J.useRef(null),d=J.useRef(null),c=J.useRef(null),f=J.useRef(null),m=J.useRef(n);return m.current=n,cc(),J.useEffect(()=>{let h=!1,g=!1;const _=()=>{g||(g=!0,m.current())},M=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let p=null;function u(){if(!p)try{const ne=window.AudioContext??window.webkitAudioContext;p=new ne}catch{}return p}function w(){const ne=u();if(!ne)return;ne.state==="suspended"&&ne.resume();const ue=ne.currentTime,pe=ne.createOscillator();pe.type="sine",pe.frequency.setValueAtTime(130,ue),pe.frequency.exponentialRampToValueAtTime(42,ue+.16);const N=ne.createGain();N.gain.setValueAtTime(1,ue),N.gain.exponentialRampToValueAtTime(.001,ue+.38),pe.connect(N).connect(ne.destination),pe.start(ue),pe.stop(ue+.42);const Ce=Math.floor(ne.sampleRate*.14),Se=ne.createBuffer(1,Ce,ne.sampleRate),T=Se.getChannelData(0);for(let B=0;B<Ce;B++)T[B]=(Math.random()*2-1)*Math.pow(1-B/Ce,2.2);const x=ne.createBufferSource();x.buffer=Se;const L=ne.createBiquadFilter();L.type="lowpass",L.frequency.value=850;const I=ne.createGain();I.gain.setValueAtTime(.55,ue),I.gain.exponentialRampToValueAtTime(.001,ue+.13),x.connect(L).connect(I).connect(ne.destination),x.start(ue)}function C(){const ne=i.current;ne&&(ne.currentTime=0,ne.play().catch(()=>{}))}const S=t.current,b=(S==null?void 0:S.getContext("2d"))??null;let E=[],R=0;function v(ne,ue){E=[];let pe=0;const N=4;function Ce(T,x,L,I,B,ee){const ie=3+Math.floor(Math.random()*3),X=[[T,x]];let q=L,ae=T,ge=x;for(let oe=0;oe<ie;oe++){q+=(Math.random()-.5)*.6;const de=I/ie;if(ae+=Math.cos(q)*de,ge+=Math.sin(q)*de,X.push([ae,ge]),B>0&&Math.random()<.45){const Re=q+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);Ce(ae,ge,Re,I*(.35+Math.random()*.3),B-1,ee*.78)}}E.push({pts:X,color:Ul[pe++%Ul.length],width:ee})}const Se=[ue*(.06+Math.random()*.1),ue*(.84+Math.random()*.1)];for(let T=0;T<N;T++){const x=ne*(.15+Math.random()*.7),L=T<Se.length?Se[T]:ue*(.1+Math.random()*.8),I=7+Math.floor(Math.random()*5);for(let B=0;B<I;B++){const ee=B/I*Math.PI*2+(Math.random()-.5)*.4,ie=Math.max(ne,ue)*(.18+Math.random()*.38);Ce(x,L,ee,ie,2,.7)}}}function A(ne){if(!b||ne<=0)return;const ue=Math.min(1,ne/3.2),pe=Math.round(E.length*ue);for(let N=0;N<pe;N++){const Ce=E[N];b.lineWidth=Ce.width*(.8+ne*.08),b.strokeStyle=Ce.color,b.globalAlpha=.7+ne*.1,b.shadowColor=Ce.color,b.shadowBlur=4+ne*1.8,b.beginPath(),Ce.pts.forEach(([Se,T],x)=>x===0?b.moveTo(Se,T):b.lineTo(Se,T)),b.stroke()}b.globalAlpha=1,b.shadowBlur=0}function P(ne,ue,pe){b&&(b.clearRect(0,0,ue,pe),A(ne))}function D(){const ne=c.current;ne&&(ne.classList.remove("intro-hit"),ne.offsetWidth,ne.classList.add("intro-hit"))}function F(){var ue,pe,N,Ce;const ne=(ue=r.current)==null?void 0:ue.firstElementChild;ne&&(ne.classList.remove("intro-rgbslam"),ne.offsetWidth,ne.classList.add("intro-rgbslam")),(pe=r.current)==null||pe.classList.remove("intro-jitter"),(N=r.current)==null||N.offsetWidth,(Ce=r.current)==null||Ce.classList.add("intro-jitter"),D(),ke()}async function Q(){for(let ne=5;ne>=1&&!h;ne--){const ue=r.current;if(!ue)return;ue.innerHTML="";const pe=document.createElement("div");pe.className="intro-glyph",pe.setAttribute("data-t",String(ne)),pe.textContent=String(ne),ue.appendChild(pe),F(),w(),await pe.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Il*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Bi(Il*.3)}}let Y=null,O=null,V=null,k=0,K=!1,se=-1;const _e=document.createElement("canvas").getContext("2d");_e.font=`700 ${Fl}px "Rajdhani", sans-serif`;const be=[],He=[];function st(ne,ue){const pe=Math.ceil(_e.measureText(ne).width),N=Math.max(200,pe+120),Ce=document.createElement("canvas");Ce.width=N,Ce.height=zr;const Se=Ce.getContext("2d");Se.font=`700 ${Fl}px "Rajdhani", sans-serif`,Se.textAlign="center",Se.textBaseline="middle",Se.shadowColor=ue,Se.shadowBlur=56,Se.fillStyle="#d24e01",Se.fillText(ne,N/2,zr/2);const T=new mh(Ce);T.anisotropy=4;let x=N*Ol,L=zr*Ol;if(x>Bl){const I=Bl/x;x*=I,L*=I}return{tex:T,worldW:x,worldH:L}}function je(ne,ue,pe){const{tex:N,worldW:Ce,worldH:Se}=st(ne,pe),T=new Ki(Ce,Se),x=new Gi({map:N,transparent:!0,depthWrite:!1,opacity:0}),L=new jt(T,x);L.position.set(0,10,ue),L.visible=!1,O.add(L);const I=new jt(T,new Gi({map:N,transparent:!0,depthWrite:!1,blending:zs,color:2875596,opacity:0})),B=new jt(T,new Gi({map:N,transparent:!0,depthWrite:!1,blending:zs,color:10116351,opacity:0}));return I.position.copy(L.position),B.position.copy(L.position),I.visible=!1,B.visible=!1,O.add(I),O.add(B),He.push(T,x,N,I.material,B.material),{mesh:L,ghostCy:I,ghostMg:B}}const Z={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let he,G;function me(){const ne=e.current;if(!ne)return;Y=new T_({canvas:ne,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),Y.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),O=new sh,O.background=new Ze(263946),O.fog=new Za(263946,.0011),V=new zt(62,window.innerWidth/window.innerHeight,1,6e3),V.position.set(0,0,40),O.add(new wh(928300,1.1));const ue=Yc*Oi.length+500,pe=900,N=new Kt,Ce=new Float32Array(pe*3),Se=new Float32Array(pe*3),T=[2875596,15357964,15357964,10116351];for(let B=0;B<pe;B++){const ee=60+Math.random()*260,ie=Math.random()*Math.PI*2;Ce[B*3]=Math.cos(ie)*ee,Ce[B*3+1]=Math.sin(ie)*ee,Ce[B*3+2]=-Math.random()*ue;const X=new Ze(T[B%T.length]);Se[B*3]=X.r,Se[B*3+1]=X.g,Se[B*3+2]=X.b}N.setAttribute("position",new Wt(Ce,3)),N.setAttribute("color",new Wt(Se,3));const x=new Ic({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});O.add(new ph(N,x)),He.push(N,x),Oi.forEach((B,ee)=>{const ie=ws(ee),X="#"+B.light.toString(16).padStart(6,"0");be.push(je(B.text,ie,X));const q=new Dr(B.light,2.4,900,2);q.position.set(0,40,ie+60),O.add(q)}),he=new Dr(15357964,4,550,2),G=new Dr(10116351,2.6,550,2),O.add(he),O.add(G),K=!0,ce();const L=Math.random()*1e3;Z.camZ=0;function I(B){if(!Y||!O||!V)return;if(M)V.position.x=Z.camX,V.position.y=6;else{const q=Math.sin(B*.0016+L)*1.1+Math.sin(B*.0043)*.5,ae=Math.cos(B*.002+L)*.9+Math.cos(B*.0038)*.45;V.position.x=q+Z.camX,V.position.y=ae+6}V.position.z=Z.camZ+(M?0:Z.warpKick);const ee=M?0:Z.yawKick,ie=V.position.x+Math.sin(ee)*640;V.lookAt(ie,V.position.y-4,Z.focusZ),M||V.rotateZ(-ee*.5);const X=62+(M?0:Z.fovKick*14);V.fov!==X&&(V.fov=X,V.updateProjectionMatrix()),he.position.set(Math.sin(B*6e-4)*80,30,Z.camZ-120),G.position.set(Math.cos(B*7e-4)*80,-10,Z.camZ-200),be.forEach(q=>{q.mesh.visible&&q.mesh.quaternion.copy(V.quaternion),q.ghostCy.visible&&q.ghostCy.quaternion.copy(V.quaternion),q.ghostMg.visible&&q.ghostMg.quaternion.copy(V.quaternion)}),Y.render(O,V),k=requestAnimationFrame(I)}k=requestAnimationFrame(I)}function ce(){!K||!Y||!V||(Y.setSize(window.innerWidth,window.innerHeight),V.aspect=window.innerWidth/window.innerHeight,V.updateProjectionMatrix())}function fe(){ce(),v(window.innerWidth,window.innerHeight),P(R,window.innerWidth,window.innerHeight)}window.addEventListener("resize",fe,{passive:!0});function We(ne,ue=650){const pe=se;se=ne;const N=be[ne];if(!N)return;N.mesh.visible=!0,N.mesh.material.opacity=0;const Ce=pe>=0?be[pe]:null,Se=performance.now();function T(){const x=Math.min(1,(performance.now()-Se)/ue);N.mesh.material.opacity=x,Ce&&(Ce.mesh.material.opacity=1-x),x<1?requestAnimationFrame(T):Ce&&(Ce.mesh.visible=!1)}T()}function ke(){if(M||se<0)return;const ne=be[se];if(!ne)return;const ue=16+Math.random()*14;ne.ghostCy.visible=!0,ne.ghostCy.material.opacity=.6,ne.ghostCy.position.x=-ue,ne.ghostMg.visible=!0,ne.ghostMg.material.opacity=.6,ne.ghostMg.position.x=ue,setTimeout(()=>{ne.ghostCy.material.opacity=0,ne.ghostCy.visible=!1,ne.ghostCy.position.x=0,ne.ghostMg.material.opacity=0,ne.ghostMg.visible=!1,ne.ghostMg.position.x=0},140+Math.random()*100)}async function tt(ne,ue,pe,N,Ce){const Se=Z.camZ,T=Z.camX,x=performance.now();return Z.warpKick=(Math.random()-.5)*34,Z.yawKick=Ce*N,Z.fovKick=1,new Promise(L=>{function I(B){const ee=Math.min(1,(B-x)/pe),ie=C_(ee);Z.camZ=Se+(ne-Se)*ie,Z.camX=T+(ue-T)*ie,Z.warpKick*=.92,Z.yawKick*=.975,Z.fovKick*=.965,ee<1?requestAnimationFrame(I):L()}requestAnimationFrame(I)})}function Ke(ne=1,ue=420){if(M||!K||!b||!e.current)return;const pe=window.innerWidth,N=window.innerHeight,Ce=performance.now()+ue;function Se(){if(performance.now()>Ce){P(R,pe,N);return}b.clearRect(0,0,pe,N),A(R);const x=5+Math.floor(Math.random()*8*ne);for(let I=0;I<x;I++){const B=Math.random()*N,ee=4+Math.random()*52*ne,ie=(Math.random()-.5)*130*ne;try{b.drawImage(e.current,0,B,pe,ee,ie,B,pe,ee)}catch{}}const L=Math.round(6*ne);b.globalCompositeOperation="screen";for(let I=0;I<L;I++){const B=Math.random()*N;b.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],b.globalAlpha=.35+Math.random()*.35,b.lineWidth=.6+Math.random()*1.6,b.beginPath(),b.moveTo(0,B),b.lineTo(pe,B),b.stroke()}if(b.globalCompositeOperation="source-over",b.globalAlpha=1,Math.random()<ne*.12){b.globalAlpha=.5;for(let I=0;I<220;I++)b.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",b.fillRect(Math.random()*pe,Math.random()*N,2,2);b.globalAlpha=1}requestAnimationFrame(Se)}Se()}function qe(ne=1,ue=340){if(M||!K||!b)return;const pe=window.innerWidth,N=window.innerHeight,Ce=pe/2,Se=N/2,T=12+Math.floor(10*ne),x=Array.from({length:T},()=>Math.random()*Math.PI*2),L=performance.now();function I(){const ee=(performance.now()-L)/ue;if(ee>=1){P(R,pe,N);return}b.save(),b.globalCompositeOperation="screen",x.forEach(ie=>{const X=30+ee*300,q=X+90+Math.random()*150,ae=Ce+Math.cos(ie)*X,ge=Se+Math.sin(ie)*X,oe=Ce+Math.cos(ie)*q,de=Se+Math.sin(ie)*q;b.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",b.globalAlpha=(1-ee)*(.28+Math.random()*.32)*ne,b.lineWidth=1.2+Math.random()*1.8,b.beginPath(),b.moveTo(ae,ge),b.lineTo(oe,de),b.stroke()}),b.restore(),requestAnimationFrame(I)}I()}async function ut(ne=900){const ue=window.innerWidth,pe=window.innerHeight;if(M||!b)return;const N=performance.now(),Ce=E.map(()=>Math.random()*.25);await new Promise(Se=>{function T(){const x=Math.min(1,(performance.now()-N)/ne);b.clearRect(0,0,ue,pe),E.forEach((L,I)=>{const B=Math.min(1,Math.max(0,(x-Ce[I])/(1-Ce[I])));if(B<=0)return;const ee=L.pts,ie=ee.length-1,X=B*ie;b.lineWidth=L.width*(1+x*.4),b.strokeStyle=L.color,b.globalAlpha=.65+x*.3,b.shadowColor=L.color,b.shadowBlur=3+x*5,b.beginPath(),b.moveTo(ee[0][0],ee[0][1]);for(let ge=0;ge<Math.floor(X);ge++)b.lineTo(ee[ge+1][0],ee[ge+1][1]);const q=Math.floor(X),ae=X-q;if(q<ie&&ae>0){const[ge,oe]=ee[q],[de,Re]=ee[q+1];b.lineTo(ge+(de-ge)*ae,oe+(Re-oe)*ae)}b.stroke()}),b.globalAlpha=1,b.shadowBlur=0,x<1?requestAnimationFrame(T):Se()}T()})}async function mt(){var B;D(),(B=r.current)==null||B.classList.add("intro-jitter");const ne=f.current;if(!ne||(ne.innerHTML="",M))return;const ue=window.innerWidth,pe=window.innerHeight,N=11,Ce=8,Se=ue/N,T=pe/Ce,x=ue/2,L=pe/2,I=[];for(let ee=0;ee<Ce;ee++)for(let ie=0;ie<N;ie++){const X=ie*Se,q=ee*T,ae=()=>(Math.random()-.5)*16,ge=document.createElement("div");ge.className="intro-shard",ge.style.left=X+"px",ge.style.top=q+"px",ge.style.width=Se+2+"px",ge.style.height=T+2+"px",ge.style.clipPath=`polygon(${ae()}px ${ae()}px, ${Se+ae()}px ${ae()}px, ${Se+ae()}px ${T+ae()}px, ${ae()}px ${T+ae()}px)`,ne.appendChild(ge);const oe=X+Se/2-x,de=q+T/2-L,Re=Math.hypot(oe,de)||1;I.push({div:ge,dx:oe/Re,dy:de/Re,delay:Re/Math.max(ue,pe)*220+Math.random()*80})}I.forEach(({div:ee,dx:ie,dy:X,delay:q})=>{const ae=60+Math.random()*140,ge=420+Math.random()*420,oe=(Math.random()-.5)*420;ee.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${ie*ae}px, ${X*ae-20}px) rotate(${oe*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${ie*ae*1.4}px, ${X*ae+ge}px) rotate(${oe}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:q,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Bi(1600),ne.innerHTML=""}async function xt(){var ne;if(v(window.innerWidth,window.innerHeight),me(),M){s.current&&(s.current.style.display="flex");for(let ue=5;ue>=1&&!h;ue--)r.current&&(r.current.textContent=String(ue)),await Bi(400);s.current&&(s.current.style.display="none"),C(),l.current&&l.current.classList.add("intro-on");for(const ue of Oi){if(h)return;d.current&&(d.current.textContent=ue.text),await Bi(900)}_();return}if(s.current&&(s.current.style.display="flex"),await Q(),!h){s.current&&(s.current.style.display="none"),(ne=l.current)==null||ne.classList.add("intro-on"),C();for(let ue=0;ue<Oi.length&&!h;ue++){const pe=Oi[ue];R=pe.crack,d.current&&(d.current.innerHTML=pe.final?pe.sub:`${pe.sub} · трещина канала <b>${pe.crack}/4</b>`),We(ue),Z.focusZ=ws(ue);const N=ue%2===0?1:-1,Ce=pe.final?0:N*60,Se=pe.final?ws(ue)-A_:ws(ue)+w_;if(await tt(Se,Ce,R_,.5+pe.crack*.09,N),h)return;F(),Ke(Math.min(1,.5+pe.crack*.14),pe.final?300:260),pe.final||qe(.8+pe.crack*.1,320),P(R,window.innerWidth,window.innerHeight)}h||(await ut(900),!h&&(await Bi(150),await mt(),!h&&_()))}}return xt(),()=>{h=!0,window.removeEventListener("resize",fe),cancelAnimationFrame(k),He.forEach(ne=>ne.dispose()),Y==null||Y.dispose(),p==null||p.close().catch(()=>{})}},[]),o.jsx("div",{className:"host-screen grid-bg intro-screen",children:o.jsxs("div",{className:"intro-root",children:[o.jsx("canvas",{ref:e,className:"intro-gl"}),o.jsx("canvas",{ref:t,className:"intro-crack"}),o.jsx("div",{ref:f,className:"intro-shatter-layer"}),o.jsx("div",{className:"intro-vignette"}),o.jsx("div",{className:"intro-scanlines"}),o.jsx("div",{ref:c,className:"intro-noise"}),o.jsxs("div",{ref:s,className:"intro-stage",children:[o.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),o.jsx("div",{ref:r,className:"intro-frame"}),o.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),o.jsx("div",{ref:l,className:"intro-flight-label",children:o.jsx("div",{ref:d,className:"intro-subline"})}),o.jsx(dc,{}),o.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}async function P_(n,e){var i;await Ut.from("game_sessions").update({melody:{}}).eq("id",Zn());const t=Ql(e,n.round_number,"show_answers");if(t.kind==="scoreboard")return void Zl();if(t.kind==="break")return void Kl();if(t.kind==="finale")return void Ys(n.pack_id,((i=e.settings)==null?void 0:i.play_mode)==="paper");await Ut.from("game_sessions").update({phase:"round_intro",round_number:n.round_number+1,question_index:0,timer_started_at:null,reveal:!1,melody:{}}).eq("id",Zn())}let Lt=null;function D_(){Lt||(Lt=At(),Lt.play().catch(()=>{}),Lt.pause())}function As(n){return Lt||(Lt=At()),Lt.pause(),Lt.loop=!1,Lt.volume=1,ac(Lt,n),Lt}function L_(){if(Lt)try{Lt.pause(),Lt.currentTime=0}catch{}}async function pt(n){await Ut.from("game_sessions").update({melody:n}).eq("id",Zn())}const sn=n=>new Date(Date.now()+n*1e3).toISOString();function I_({src:n}){return J.useEffect(()=>{const e=At();e.src=n,e.currentTime=0;let t=!1;e.play().then(()=>{if(t)try{e.pause(),e.src=""}catch{}}).catch(()=>{});const i=setTimeout(()=>{try{e.pause()}catch{}},15e3);return()=>{t=!0,clearTimeout(i);try{e.pause(),e.src=""}catch{}}},[n]),o.jsx("div",{className:"mel-reveal-track",children:"♪ играет 15 секунд"})}function U_({pack:n,round:e,gameState:t}){var le,_e,be,He,st,je,Z,he;const i=e.settings,s=i.themes??[],r=t.melody??{},a=hn(t.game_id),l=Bn(t.game_id,t.round_number),d=r.played??[],c=J.useRef(null),[f,m]=J.useState(Date.now());J.useEffect(()=>{const G=setInterval(()=>m(Date.now()),200);return()=>clearInterval(G)},[]);const h=r.deadline?new Date(r.deadline).getTime():0,g=h?Math.max(0,Math.ceil((h-f)/1e3)):0,_=J.useRef(0);J.useEffect(()=>{_.current=0},[r.stage,r.key]),g>_.current&&(_.current=g);const M=_.current,p=!!h&&f>=h,[u,w]=(r.key??"0-0").split("-").map(Number),C=(le=s[u])==null?void 0:le.tracks[w],S=`q-mel-${r.key}-bid`,b=`q-mel-${r.key}`,E=l.filter(G=>G.question_ref===S);J.useEffect(()=>{if(r.stage!=="bids")return;const G=E.map(ce=>({id:ce.team_id,sec:Number(ce.answer_text)||99,at:ce.updated_at})).sort((ce,fe)=>ce.sec-fe.sec||+new Date(ce.at)-+new Date(fe.at)).map(ce=>ce.id),me=[...G,...a.map(ce=>ce.id).filter(ce=>!G.includes(ce))];JSON.stringify(me)!==JSON.stringify(r.order)&&pt({...r,order:me,turn:0})},[r.stage,E.map(G=>`${G.team_id}:${G.answer_text}`).join("|")]),J.useEffect(()=>{if(r.stage!=="snippet")return;const G=r.snippetSec??5,me=window.setTimeout(()=>{pt({...r,stage:"answering",deadline:sn(i.answerSec??30)})},(G+10)*1e3);return()=>clearTimeout(me)},[r.stage,r.key,r.snippetSec]),J.useEffect(()=>{if(r.stage!=="snippet"||!(C!=null&&C.audio)||document.hidden)return;const G=r.snippetSec??5,me=As(Xe(C.audio));c.current=me;let ce,fe=!1;const We=()=>{fe||(fe=!0,me.pause(),pt({...r,stage:"answering",deadline:sn(i.answerSec??30)}))};me.addEventListener("playing",()=>{pt({...r,deadline:sn(G)}),ce=window.setTimeout(We,G*1e3)},{once:!0});const ke=window.setTimeout(We,(G+4)*1e3);return()=>{ce&&clearTimeout(ce),clearTimeout(ke)}},[r.stage,r.key]),J.useEffect(()=>{var G;if(!(!p||document.hidden))if(r.stage==="spinning")pt({...r,stage:"listen",deadline:sn(2)});else if(r.stage==="bidding"){const me=E.map(fe=>({id:fe.team_id,sec:Number(fe.answer_text)||99,at:fe.updated_at})).sort((fe,We)=>fe.sec-We.sec||+new Date(fe.at)-+new Date(We.at)).map(fe=>fe.id),ce=[...me,...a.map(fe=>fe.id).filter(fe=>!me.includes(fe))];pt({...r,stage:"bids",order:ce,turn:0,deadline:void 0})}else(r.stage==="answering"||r.stage==="passed")&&(l.some(ce=>{var fe,We;return ce.question_ref===`q-mel-${r.key}`&&ce.team_id===((fe=r.order)==null?void 0:fe[r.turn??0])&&!!((We=ce.answer_text)!=null&&We.trim())})?pt({...r,deadline:void 0}):(L_(),(r.turn??0)===0&&(((G=r.order)==null?void 0:G.length)??0)>1?pt({...r,stage:"passed",turn:1,deadline:void 0}):pt({...r,stage:"done",deadline:void 0,played:[...d,r.key]})))},[p,r.stage,l]),J.useEffect(()=>{if(r.stage!=="listen"||!(C!=null&&C.audio)||document.hidden)return;const G=As(Xe(C.audio));c.current=G;let me,ce=!1;const fe=()=>{ce||(ce=!0,G.pause(),pt({...r,stage:"bidding",deadline:sn(i.bidSec??10)}))};G.addEventListener("playing",()=>{me=window.setTimeout(fe,1e3)},{once:!0});const We=window.setTimeout(fe,4e3);return()=>{me&&clearTimeout(me),clearTimeout(We)}},[r.stage,r.key]),J.useEffect(()=>{var ce;const G=e.settings.bg_music??((ce=n.settings)==null?void 0:ce.bg_music);if(r.stage!=="answering"&&r.stage!=="bidding"||!G||document.hidden)return;const me=As(Xe(G));return me.loop=!0,me.volume=.45,()=>{me.pause(),me.loop=!1,me.volume=1}},[r.stage]),J.useEffect(()=>{if(r.stage!=="passed"||r.deadline||!(C!=null&&C.audio)||document.hidden)return;const G=As(Xe(C.audio));return c.current=G,G.onended=()=>void pt({...r,deadline:sn(i.passAnswerSec??10)}),()=>{G.pause(),G.onended=null}},[r.stage]);const[R,v]=J.useState(!1);if(s.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"УГАДАЙ МЕЛОДИЮ"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"})]});const P=s.flatMap((G,me)=>G.tracks.map((ce,fe)=>`${me}-${fe}`)).filter(G=>!d.includes(G)),D=!r.stage||r.stage==="idle"||r.stage==="done",F=G=>{v(!1),pt({...r,key:G,stage:"listen",deadline:sn(3),order:void 0,turn:0,chooser:void 0})},Q=()=>{const G=P[Math.floor(Math.random()*P.length)];if(P.length===1){pt({...r,key:G,stage:"listen",deadline:sn(3),order:void 0,turn:0,chooser:void 0});return}pt({...r,key:G,stage:"spinning",deadline:sn(Math.min(i.spinSec??5,8)),order:void 0,turn:0,chooser:void 0})},Y=(_e=r.order)==null?void 0:_e[r.turn??0],O=a.find(G=>G.id===Y),V=Number((be=E.find(G=>G.team_id===Y))==null?void 0:be.answer_text)||0,k=l.find(G=>G.question_ref===b&&G.team_id===Y),K=async G=>{if(!k)return;const ce=(r.turn??0)===0?V<=5?2:1:.5;await Ut.from("answers").update({is_correct:G,stake:ce}).eq("id",k.id),await pt({...r,stage:"reveal",deadline:void 0,played:[...d,r.key],wonPts:ce,wonTeam:Y,chooser:void 0})},se=async()=>{var G;(r.turn??0)===0&&(((G=r.order)==null?void 0:G.length)??0)>1?await pt({...r,stage:"passed",turn:1,deadline:void 0}):await pt({...r,stage:"done",deadline:void 0,played:[...d,r.key]})};return o.jsxs("div",{className:"host-screen grid-bg mel-screen",onPointerDown:D_,children:[o.jsx(F_,{themes:s,played:d,spinning:r.stage==="spinning",spinKey:r.key,spinLeft:g,spinTotal:i.spinSec??10,onPick:R?F:void 0}),D&&o.jsx("div",{className:"host-actions",children:P.length>0?R?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ ПЛИТКУ НА ЭКРАНЕ"}),o.jsx("button",{className:"ghost",onClick:()=>v(!1),children:"Отмена"})]}):o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:Q,children:d.length===0?"Стартуем!":"Рулетка"}),o.jsx("button",{className:"ghost",onClick:()=>v(!0),children:"Выбрать вручную"})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВСЕ ТРЕКИ ОТЫГРАНЫ"}),o.jsx("button",{onClick:()=>void P_(t,n),children:"Завершить раунд →"})]})}),r.stage&&!D&&r.stage!=="spinning"&&$l.createPortal(o.jsx("div",{className:`mel-overlay theme-${n.theme??"classic"}`,children:o.jsxs("div",{className:"mel-modal",children:[o.jsxs("div",{className:"mel-modal-head",children:[o.jsxs("div",{className:"mel-modal-theme",children:[(He=s[u])==null?void 0:He.name," · трек ",w+1]}),!!h&&o.jsx("div",{className:"mel-count",children:n.theme==="potter"?o.jsx(lc,{left:g,seconds:M,low:g<=5}):g})]}),r.stage==="listen"&&o.jsx("div",{className:"mel-big",children:"СЛУШАЕМ 1 СЕКУНДУ…"}),r.stage==="bidding"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mel-big",children:"ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?"}),o.jsx("div",{className:"mel-points-hint",children:"2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0.5 балла"}),o.jsx("div",{className:"mel-bids",children:[...a].sort((G,me)=>G.name.localeCompare(me.name)).map(G=>{const me=E.find(ce=>ce.team_id===G.id);return o.jsxs("div",{className:`mel-bid-row${me?" win":""}`,children:[o.jsx("span",{style:{color:G.color},children:G.name}),o.jsx("b",{children:me?"ставка принята ✓":"…"}),o.jsx("span",{})]},G.id)})})]}),r.stage==="bids"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"СТАВКИ КОМАНД"}),o.jsxs("div",{className:"mel-bids",children:[(r.order??[]).map((G,me)=>{const ce=a.find(We=>We.id===G),fe=E.find(We=>We.team_id===G);return o.jsxs("div",{className:`mel-bid-row${me===0?" win":""}`,children:[o.jsx("span",{style:{color:ce==null?void 0:ce.color},children:ce==null?void 0:ce.name}),o.jsxs("b",{children:[fe==null?void 0:fe.answer_text," сек"]}),me===0?o.jsx("span",{className:"mel-win-tag",children:"ИГРАЕТ"}):o.jsx("span",{})]},G)}),(r.order??[]).length===0&&o.jsx("div",{style:{opacity:.6},children:"ставок нет"})]}),o.jsxs("div",{className:"mel-actions",children:[o.jsxs("button",{disabled:!Y,onClick:()=>void pt({...r,stage:"snippet",snippetSec:V||5,deadline:void 0}),children:["Играем ",V||5," сек →"]}),o.jsx("button",{className:"ghost dark",onClick:()=>void pt({...r,stage:"done",deadline:void 0,played:[...d,r.key]}),children:"Пропустить трек"})]})]}),r.stage==="snippet"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:O==null?void 0:O.color},children:[O==null?void 0:O.name," · играет ",V," сек"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void pt({...r,stage:"answering",deadline:sn(i.answerSec??30)}),children:"Принимаем ответ →"})})]}),r.stage==="reveal"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"answer-reveal",style:{padding:"18px 28px"},children:[o.jsxs("div",{className:"answer-label",children:["ВЕРНО ✓ · +",r.wonPts??0]}),o.jsx("div",{className:"answer-main",children:C==null?void 0:C.correct})]}),(C==null?void 0:C.audio)&&o.jsx(I_,{src:Xe(C.audio)}),o.jsxs("div",{className:"mel-big",style:{color:(st=a.find(G=>G.id===r.wonTeam))==null?void 0:st.color},children:[(je=a.find(G=>G.id===r.wonTeam))==null?void 0:je.name," забирает баллы"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void pt({...r,stage:"done"}),children:"К доске →"})})]}),r.stage!=="reveal"&&r.stage!=="done"&&o.jsx("button",{className:"mel-escape",onClick:async()=>{confirm(`Закрыть трек и вернуться к доске?

Баллы за него никто не получит.`)&&await pt({...r,stage:"done",deadline:void 0,played:[...d,r.key]})},children:"Закрыть"}),(r.stage==="answering"||r.stage==="passed")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:O==null?void 0:O.color},children:[r.stage==="passed"?"ХОД ПЕРЕДАН · ":"",(O==null?void 0:O.name)??"—"]}),o.jsx("div",{className:"mel-points-hint",children:r.stage==="passed"?"за верный ответ — 0.5 балла":`ставка ${V} сек → за верный ответ ${V<=5?2:1} балла`}),o.jsx("div",{className:"mel-answer",children:k!=null&&k.answer_text?o.jsxs(o.Fragment,{children:["Ответ: ",o.jsx("b",{children:k.answer_text})]}):o.jsx("span",{style:{opacity:.6},children:"ждём ответ…"})}),(k==null?void 0:k.is_correct)===!0&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ВЕРНО ✓"}),o.jsx("div",{className:"answer-main",children:C==null?void 0:C.correct})]}),(k==null?void 0:k.is_correct)===!1&&o.jsxs("div",{className:"mel-wrong",children:["✗ НЕВЕРНО · ответ не раскрываем",(r.turn??0)===0&&(((Z=r.order)==null?void 0:Z.length)??0)>1?" — передайте ход второй команде":" — трек закрывается"]}),o.jsxs("div",{className:"mel-actions",children:[o.jsx("button",{disabled:!k,onClick:()=>void K(!0),children:"✓ Верно"}),o.jsx("button",{className:"ghost",onClick:async()=>{k&&k.is_correct==null&&await Ut.from("answers").update({is_correct:!1,stake:0}).eq("id",k.id),await se()},children:(r.turn??0)===0&&(((he=r.order)==null?void 0:he.length)??0)>1?"✗ Передать ход →":"✗ Закрыть трек"})]})]})]})}),document.body)]})}function F_({themes:n,played:e,spinning:t,spinKey:i,spinLeft:s,spinTotal:r,onPick:a}){const d=n.flatMap((g,_)=>g.tracks.map((M,p)=>`${_}-${p}`)).filter(g=>!e.includes(g)),[c,f]=J.useState(0),m=J.useRef(s);m.current=s,J.useEffect(()=>{if(!t||d.length===0||s<=0)return;let g=!1,_;const M=()=>{if(g)return;f(u=>{let w=Math.floor(Math.random()*d.length);return d.length>1&&w===u&&(w=(w+1)%d.length),w});const p=1-Math.max(0,m.current)/Math.max(1,r);_=window.setTimeout(M,180+p*p*720)};return _=window.setTimeout(M,180),()=>{g=!0,_&&clearTimeout(_)}},[t]);const h=t?s<=1?i:d[c%Math.max(1,d.length)]:void 0;return o.jsxs("div",{className:"mel-board",style:{gridTemplateColumns:`repeat(${n.length}, minmax(0,1fr))`,gridTemplateRows:`auto repeat(${Math.max(...n.map(g=>g.tracks.length),1)}, minmax(0, 1fr))`},children:[n.map((g,_)=>o.jsx("div",{className:"mel-theme",children:g.name||`Тема ${_+1}`},`h${_}`)),n.map((g,_)=>g.tracks.map((M,p)=>{const u=`${_}-${p}`,w=e.includes(u),C=h===u;return o.jsx("div",{className:`mel-tile${w?" done":""}${C?" spin":""}${a&&!w?" pickable":""}`,onClick:a&&!w?()=>a(u):void 0,"data-c":String(_%4),style:{gridColumn:_+1,gridRow:p+2},children:o.jsx("span",{className:"mel-face",children:w?"":p+1})},u)}))]})}const zl=[{body:"#f2e3c9",mask:"#b99a7d",name:"кремовый"},{body:"#8a5a33",mask:"#4c2f17",name:"тигровый"},{body:"#3b3b40",mask:"#232326",name:"чёрный"},{body:"#e8e2d8",mask:"#c96f3b",name:"бело-рыжий"},{body:"#9aa7b5",mask:"#6c7886",name:"голубой"}];function O_(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function B_(n,e){const t=O_(n),i=8,s=Array.from({length:5},()=>{const M=Array.from({length:i},()=>.45+t()*.9),p=M.reduce((u,w)=>u+w,0);return{speeds:M,total:p}}),r=Math.max(...s.map(M=>M.total)),a=s.map(M=>e*.92*(r/M.total)),l=(M,p)=>{const u=a[M],C=Math.min(1,Math.max(0,p/u))*i,S=Math.floor(C),b=C-S;let E=0;for(let R=0;R<S;R++)E+=s[M].speeds[R];return E+=(s[M].speeds[Math.min(S,i-1)]??0)*b,Math.min(1,E/s[M].total)},d=["🦋","💤","🐦","🍂"],c=Array.from({length:5},()=>{const M=[];return t()<.6&&M.push({at:(.25+t()*.3)*e,dur:.6+t()*.9,icon:d[Math.floor(t()*d.length)]}),t()<.25&&M.push({at:(.62+t()*.22)*e,dur:.5+t()*.7,icon:d[Math.floor(t()*d.length)]}),M}),f=(M,p)=>c[M].find(u=>p>=u.at&&p<u.at+u.dur),m=(M,p)=>{let u=0;for(const w of c[M])u+=Math.min(Math.max(0,p-w.at),w.dur);return p-u},h=(M,p)=>l(M,m(M,p)),g=a.map((M,p)=>M+c[p].reduce((u,w)=>u+w.dur,0)),_=g.map((M,p)=>({i:p,f:M})).sort((M,p)=>M.f-p.f).map(M=>M.i);return{progress:h,finish:g,places:_,pausedAt:f}}function z_({pack:n,round:e,gameState:t}){var S;const i=e.settings,s=(i.dogs??[]).length===5?i.dogs:["Френк","Батон","Пельмень","Турбо","Ракета"],r=i.raceSec??18,a=((S=t.melody)==null?void 0:S.race)??{},l=hn(t.game_id),c=Bn(t.game_id,t.round_number).filter(b=>b.question_ref===`q-race-${t.round_number}`),f=J.useRef(!1);J.useEffect(()=>{var R;const b=e.settings.race_music??((R=n.settings)==null?void 0:R.bg_music);if(a.stage!=="running"||!b||document.hidden)return;const E=At();return E.src=Xe(b),E.loop=!0,E.volume=.55,E.play().catch(()=>{}),()=>E.pause()},[a.stage]);const[m,h]=J.useState(Date.now());J.useEffect(()=>{const b=setInterval(()=>h(Date.now()),66);return()=>clearInterval(b)},[]);const g=J.useMemo(()=>a.seed!=null?B_(a.seed,r):null,[a.seed,r]),_=a.startedAt?(m-new Date(a.startedAt).getTime())/1e3:0,M=a.stage==="running"&&g,p=a.stage==="done",u=g&&_>=Math.max(...g.finish)+1;J.useEffect(()=>{if(!M||!u||f.current||document.hidden)return;f.current=!0;const b=new Map(g.places.map((E,R)=>[E,R]));(async()=>{for(const E of c){const R=Number(E.answer_text)-1,v=b.get(R),A=v!=null?5-v:0;await Ut.from("answers").update({is_correct:!0,stake:A}).eq("id",E.id)}await Ut.from("game_sessions").update({melody:{...t.melody,race:{...a,stage:"done"}}}).eq("id",Zn())})()},[M,u]),J.useEffect(()=>{!a.stage&&!document.hidden&&C()},[a.stage]);const w=()=>Nd(t),C=()=>Cd(t);return o.jsxs("div",{className:"host-screen grid-bg race-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")||"СКАЧКИ БУЛЬДОГОВ"})}),(a.stage==="running"||p)&&o.jsxs("div",{className:"race-track hud-frame",children:[o.jsx("div",{className:"race-stands",children:Array.from({length:26},(b,E)=>o.jsx("span",{style:{animationDelay:`${E%5*.3}s`},children:["🎉","👏","🙌","⭐","🎊"][E%5]},E))}),o.jsx("div",{className:"race-finish"}),s.map((b,E)=>{const R=(M||p)&&g?g.progress(E,p?999:_):0,v=g&&(p||u)?g.places.indexOf(E):null,A=M&&!p?g==null?void 0:g.pausedAt(E,_):void 0,P=!!g&&_>=g.finish[E];return o.jsxs("div",{className:"race-lane",children:[o.jsx("span",{className:"race-num",children:E+1}),o.jsxs("div",{className:"race-dog",style:{left:`calc(${6+R*82}% )`},children:[A&&o.jsx("span",{className:"race-pause",children:A.icon}),o.jsx(G_,{color:zl[E],running:!!M&&!u&&!A&&!P}),o.jsxs("span",{className:"race-name",children:[b,v!=null&&` · ${v+1} место`]})]}),o.jsx("span",{className:"race-treat",children:"🍖"})]},E)})]}),(!a.stage||a.stage==="betting")&&o.jsxs("div",{className:"race-panel",children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА · СТАВКИ ТАЙНЫЕ"}),o.jsx("div",{className:"race-lineup",children:s.map((b,E)=>o.jsxs("div",{className:"race-candidate",children:[o.jsx(k_,{color:zl[E],n:E+1}),o.jsxs("span",{className:"race-tag",children:[o.jsxs("b",{children:["№",E+1]})," ",b]})]},E))}),o.jsxs("div",{className:"mono-tag",style:{color:c.length===l.length&&l.length>0?"var(--answer)":void 0},children:["СТАВКИ СДЕЛАЛИ: ",c.length," / ",l.length]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{disabled:c.length===0,onClick:()=>void w(),children:"🏁 Старт! (ставки закрываются)"})})]}),p&&g&&o.jsxs("div",{className:"race-result",children:[o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})}),o.jsxs("div",{className:"answer-reveal",style:{padding:"14px 30px"},children:[o.jsx("div",{className:"answer-label",children:"ПОБЕДИТЕЛЬ"}),o.jsxs("div",{className:"answer-main",children:["№",g.places[0]+1," ",s[g.places[0]]]})]}),o.jsx("div",{className:"mono-tag",children:g.places.map((b,E)=>`${E+1}. ${s[b]}`).join("  ·  ")})]})]})}function k_({color:n,n:e}){const t=n.body;return o.jsxs("svg",{viewBox:"0 0 150 144",className:"bulldog-sit",children:[o.jsx("path",{d:"M75,60 C112,60 122,86 118,112 C116,128 34,128 32,112 C28,86 38,60 75,60 Z",fill:t}),o.jsx("ellipse",{cx:"34",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("ellipse",{cx:"116",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("path",{d:"M75,72 C89,72 93,96 91,118 C90,123 60,123 59,118 C57,96 61,72 75,72 Z",fill:"#fff",opacity:".88"}),o.jsx("rect",{x:"54",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("rect",{x:"83",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("ellipse",{cx:"60.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("ellipse",{cx:"89.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("circle",{cx:"75",cy:"42",r:"34",fill:t}),o.jsx("path",{d:"M43,26 C29,11 33,-4 47,-2 C58,0 63,13 61,28 C56,34 47,34 43,26 Z",fill:t}),o.jsx("path",{d:"M107,26 C121,11 117,-4 103,-2 C92,0 87,13 89,28 C94,34 103,34 107,26 Z",fill:t}),o.jsx("path",{d:"M47,23 C38,12 41,1 49,2 C56,3 58,15 56,24 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M103,23 C112,12 109,1 101,2 C94,3 92,15 94,24 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"59",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("ellipse",{cx:"91",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("circle",{cx:"61.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("circle",{cx:"93.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("path",{d:"M53,52 C53,45 97,45 97,52 C97,66 87,73 75,73 C63,73 53,66 53,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"75",cy:"53",rx:"7.4",ry:"5.2",fill:"#3a2e33"}),o.jsx("path",{d:"M75,57 v6.5",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M65,64 Q70,69.5 75,65 Q80,69.5 85,64",fill:"none",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M51,71 C60,79 90,79 99,71 L99,78 C90,85 60,85 51,78 Z",fill:"#e63946"}),o.jsx("circle",{cx:"75",cy:"83",r:"10.5",fill:"#f5c542",stroke:"#c99a1e",strokeWidth:"2"}),o.jsx("text",{x:"75",y:"88.5",textAnchor:"middle",fontSize:"14.5",fontWeight:"700",fill:"#5a4210",children:e})]})}function G_({color:n,running:e}){const t=n.body,i=n.mask;return o.jsxs("svg",{viewBox:"0 0 160 112",className:`bulldog${e?" run":""}`,children:[o.jsxs("g",{className:"bd-dust",children:[o.jsx("circle",{cx:"26",cy:"92",r:"3.4",fill:"#cfd8e3"}),o.jsx("circle",{cx:"18",cy:"86",r:"2.2",fill:"#cfd8e3"}),o.jsx("circle",{cx:"33",cy:"96",r:"1.9",fill:"#cfd8e3"})]}),o.jsxs("g",{className:"bd-speed",stroke:"#9fc3e8",strokeWidth:"2.2",strokeLinecap:"round",opacity:".5",children:[o.jsx("line",{x1:"6",y1:"46",x2:"26",y2:"46"}),o.jsx("line",{x1:"10",y1:"60",x2:"28",y2:"60"})]}),o.jsxs("g",{className:"bd-all",children:[o.jsx("path",{className:"bd-hind h2",d:"M64,74 Q60,84 63,92 Q64,96 71,96 L71,92 Q67,90 68,82 Q70,76 71,74 Z",fill:t}),o.jsx("path",{className:"bd-fore f2",d:"M101,72 Q106,82 104,90 Q105,94 112,94 L112,90 Q108,88 108,81 Q108,74 107,70 Z",fill:t}),o.jsx("path",{d:"M40,60 C36,42 54,34 74,34 C96,34 108,44 110,56 C112,70 100,81 80,82 C58,83 42,76 40,60 Z",fill:t}),o.jsx("path",{d:"M56,74 C66,80 88,80 100,72 C96,80 66,84 56,74 Z",fill:"#fff",opacity:".85"}),o.jsx("circle",{cx:"38",cy:"52",r:"4.5",fill:t,stroke:i,strokeWidth:"1"}),o.jsx("path",{className:"bd-hind h1",d:"M50,70 Q44,80 48,89 Q49,94 57,94 L57,89 Q52,88 53,80 Q56,73 58,70 Z",fill:t}),o.jsx("path",{className:"bd-fore f1",d:"M90,72 Q94,82 91,90 Q92,95 100,95 L100,90 Q96,88 97,80 Q99,74 98,71 Z",fill:t}),o.jsxs("g",{className:"bd-head",children:[o.jsx("circle",{cx:"118",cy:"44",r:"30",fill:t}),o.jsx("path",{d:"M88,32 C74,14 78,-2 92,-1 C103,0 108,14 106,30 C100,36 92,37 88,32 Z",fill:t}),o.jsx("path",{d:"M148,32 C162,14 158,-2 144,-1 C133,0 128,14 130,30 C136,36 144,37 148,32 Z",fill:t}),o.jsx("path",{d:"M92,28 C83,15 86,3 94,4 C101,5 103,17 101,27 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M144,28 C153,15 150,3 142,4 C135,5 133,17 135,27 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"105",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("ellipse",{cx:"131",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("circle",{cx:"107",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("circle",{cx:"133",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("path",{d:"M100,52 C100,45 136,45 136,52 C136,64 128,71 118,71 C108,71 100,64 100,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"118",cy:"53",rx:"6.4",ry:"4.6",fill:"#3a2e33"}),o.jsx("path",{d:"M118,56.5 v6",stroke:"#3a2e33",strokeWidth:"1.8",strokeLinecap:"round"}),o.jsx("path",{d:"M110,62 Q114,67 118,63 Q122,67 126,62",fill:"none",stroke:"#3a2e33",strokeWidth:"1.9",strokeLinecap:"round"}),o.jsx("path",{className:"bd-tongue",d:"M112,65 Q118,76 124,65 Q122,71 118,71.5 Q114,71 112,65 Z",fill:"#ff8da1"})]})]})]})}function Dx(){var l;const{gameState:n,loading:e,roomId:t}=cd(),[i,s]=J.useState(null);if(J.useEffect(()=>{n!=null&&n.pack_id?Dd(n.pack_id).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id]),!e&&!t)return o.jsx(dd,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",a=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"";return o.jsxs(Id,{theme:r,isProjector:!0,children:[r==="new_year"&&o.jsx(Ud,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),o.jsx(V_,{gameState:n,pack:i}),o.jsx(jd,{theme:r,trigger:a}),i&&o.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((l=i.settings)==null?void 0:l.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name})]})}function js({theme:n}){return n==="new_year"?o.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?o.jsx("div",{className:"title-deco",children:"⚡ ✦ 🪄 ✦ ⚡"}):null}function kl({theme:n}){return n!=="classic"?null:o.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[o.jsx("span",{className:"cd-line"}),o.jsx("span",{className:"cd-chip",children:"◆"}),o.jsx("span",{className:"cd-line"})]})}function V_({gameState:n,pack:e}){var p,u,w,C;const[t,i]=J.useState([]),[s,r]=J.useState("");J.useEffect(()=>{Ld().then(i).catch(()=>i([]))},[]);const a=hn((n==null?void 0:n.game_id)??null),l=J.useMemo(()=>{const S=`${location.origin}${location.pathname}#/player?room=${Zn()??""}`;return n!=null&&n.pack_id?`${S}&pack=${n.pack_id}`:S},[n==null?void 0:n.pack_id]),d=((n==null?void 0:n.random_groups)??[]).filter(S=>Array.isArray(S)&&S.length>0),c=d.map(S=>S.join(",")).join("|"),[f,m]=J.useState(!0);J.useEffect(()=>{m(!0)},[c]);const h=d.length>0&&f;if(rx((p=e==null?void 0:e.rounds)==null?void 0:p[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),!n)return o.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const g=((u=e==null?void 0:e.settings)==null?void 0:u.play_mode)==="paper";if(n.phase==="lobby"||!n.pack_id||!e)return o.jsxs("div",{className:`host-screen grid-bg${g?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&o.jsx(sx,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?o.jsxs("div",{className:"cyber-lobby-head",children:[o.jsx(Xl,{side:"left"}),o.jsxs("div",{className:"clh-title",children:[o.jsx(Mn,{theme:"classic",lines:["QUIZ","PARTY"]}),o.jsx(kl,{theme:"classic"})]}),o.jsx(Xl,{side:"right"})]}):o.jsxs(o.Fragment,{children:[o.jsx(Mn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),o.jsx(js,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?o.jsxs(o.Fragment,{children:[h&&o.jsx(tx,{groups:d,onClose:()=>m(!1)}),d.length>0&&!f&&o.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>m(!0),children:"СОСТАВЫ КОМАНД"}),o.jsxs("div",{className:"lobby-teams",children:[a.length>0&&o.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?g?null:o.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):a.map(S=>o.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":S.color,opacity:Pd(S)?1:.4},children:[S.icon&&o.jsx("span",{className:"lobby-team-icon",children:S.icon}),S.name]},S.id))]}),!g&&o.jsx("img",{alt:"QR",className:`lobby-qr-corner${h?" lobby-qr-lit":""}`,src:`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=1&data=${encodeURIComponent(l)}`}),!g&&h&&o.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Gr()},children:"⟲ Сменить пакет"}),o.jsx("button",{onClick:()=>{var S,b;return void((S=e==null?void 0:e.settings)!=null&&S.show_intro?hd():kr(0,Vr((b=e==null?void 0:e.settings)==null?void 0:b.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):o.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[o.jsxs("select",{value:s,onChange:S=>r(S.target.value),style:{fontSize:"1.2rem"},children:[o.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(S=>o.jsxs("option",{value:S.id,children:[S.name," (",S.status==="ready"?"готов":S.status==="played"?"сыгран":S.status,")"]},S.id))]}),o.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const S=t.find(b=>b.id===s);S&&S.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||ud(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return o.jsx(N_,{onDone:()=>{var S;kr(0,Vr((S=e==null?void 0:e.settings)==null?void 0:S.info_slides,0)??void 0)}});const _=e.rounds[n.round_number];if(!_)return o.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const M=_.questions[n.question_index];if(n.phase==="round_intro"){const S=_.settings.grid;return o.jsxs("div",{className:"host-screen grid-bg round-intro",children:[_.rules_audio&&o.jsx("audio",{autoPlay:!0,src:Xe(_.rules_audio)}),_.mechanic==="crossword"&&S?o.jsxs("div",{className:"cw-layout",children:[o.jsx(Fd,{grid:S,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/S.cols,innerHeight*.8/S.rows))))}),o.jsxs("div",{className:"side",children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Yn(e,n.round_number)]}),o.jsx(Mn,{theme:e.theme,lines:_.title_lines}),o.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:So(_)}),_.rules.map((b,E)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+E*.5}s`},children:[o.jsx("span",{className:"idx",children:String(E+1).padStart(2,"0")}),b]},E))]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"round-badge",children:[o.jsx("span",{className:"rb-word",children:"РАУНД"}),o.jsx("span",{className:"rb-num",children:Yn(e,n.round_number)})]}),o.jsxs("div",{className:"ri-main",children:[o.jsx(Mn,{theme:e.theme,lines:_.title_lines}),o.jsx(js,{theme:e.theme}),o.jsx(kl,{theme:e.theme}),o.jsx("div",{className:"meta-line",children:So(_)})]}),_.rules.length>0&&o.jsxs("div",{className:"rules-frame","data-count":_.rules.length,children:[o.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),_.rules.map((b,E)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+E*.7}s`},children:[o.jsx("span",{className:"idx",children:String(E+1).padStart(2,"0")}),b]},E))]})]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void yi(0),children:_.mechanic==="jeopardy"?"Начать раунд →":_.mechanic==="race"?"К скачкам →":_.mechanic==="melody"?"К трекам →":_.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(n.phase==="question"&&_.mechanic==="sprint")return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx(iu,{pack:e,round:_,gameState:n,timerNode:o.jsx(Ba,{startedAt:n.timer_started_at,seconds:_.timer_seconds,theme:e.theme})}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{className:"ghost dark",onClick:()=>void Vi(0),children:"К ответам →"})})]});if(n.phase==="question"&&_.mechanic==="blitz")return o.jsx(cx,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="race")return o.jsx(z_,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="melody")return o.jsx(U_,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="jeopardy")return o.jsx(gx,{pack:e,round:_,gameState:n});if(n.phase==="question"&&M){const S=M.media.question??[],b=S.filter(k=>!/\.(mp3|mp4|webm|wav)$/i.test(k)),E=S.filter(k=>/\.(mp3|mp4|webm|wav)$/i.test(k)),R=!!M.question_text.trim()&&b.length===1&&!M.media.hidden,v=M.answer.mode==="choice"||M.answer.mode==="order"?M.answer.choices:null,A=e.theme==="new_year",P=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>_.timer_seconds-10,D=e.theme==="classic",F=!!M.question_text.trim(),Y=e.theme==="potter"&&_.mechanic!=="rebus"?"pt-frame":A&&_.mechanic!=="rebus"?`q-frame${P?" low":""}`:D?"cyber-frame":"",O=!M.media.hidden&&b.length>1&&(M.answer.mode==="choice"&&M.answer.choices.length===b.length||M.answer.mode==="match"&&M.answer.left.length===b.length),V=((w=e.settings)!=null&&w.answers_reveal&&_.answers_reveal==="after_question",_.answers_reveal??"after_round");return o.jsxs("div",{className:`host-screen grid-bg${F?"":" no-qtext"}${b.length&&!M.media.hidden?" has-media":""}${v&&!O||M.answer.mode==="match"&&(M.answer.right_labels??[]).some(Boolean)?" has-choices":""}`,children:[o.jsx(dc,{}),_.mechanic!=="jeopardy"&&o.jsxs(o.Fragment,{children:[o.jsx(ux,{startedAt:n.timer_started_at,seconds:_.timer_seconds,q:M,round:_,pack:e,timerRunning:!!n.timer_started_at,manual:g,gameId:n.game_id,roundNumber:n.round_number}),o.jsx(mx,{round:_,gameState:n,isLast:n.question_index+1>=_.questions.length}),o.jsx(px,{enabled:V==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:_.timer_seconds})]}),o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"qnum",children:["Р",Yn(e,n.round_number)," · ВОПРОС"," ",o.jsx("b",{children:n.question_index+1})," / ",_.questions.length]}),_.mechanic!=="jeopardy"&&o.jsx(Ba,{startedAt:n.timer_started_at,seconds:_.timer_seconds,theme:e.theme},M.id)]}),R?o.jsxs("div",{className:"q-split",children:[o.jsxs("div",{className:Y,children:[A&&o.jsx(Gl,{seed:M.id,low:P}),D&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(Vl,{text:M.question_text},M.id)]}),o.jsx("div",{className:"q-media-grid n1",style:Xs(M),children:b.map((k,K)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:Xe(k),alt:""}),M.answer.mode==="match"&&o.jsx("figcaption",{children:K+1})]},K))})]}):o.jsxs(o.Fragment,{children:[F&&o.jsxs("div",{className:Y,children:[A&&o.jsx(Gl,{seed:M.id,low:P}),D&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(Vl,{text:M.question_text},M.id)]}),!M.media.hidden&&b.length>0&&(O?o.jsx("div",{className:`img-answers n${Math.min(b.length,5)}${b.length>1?" eq-row":""}`,children:b.map((k,K)=>{var se,le;return o.jsx(nx,{src:Xe(k),badge:M.answer.mode==="match"?String(K+1):((se=v==null?void 0:v[K])==null?void 0:se.key)??"",children:M.answer.mode==="choice"&&((le=v==null?void 0:v[K])==null?void 0:le.text)&&o.jsx("span",{className:"ia-text",children:v[K].text})},K)})}):o.jsx("div",{className:`q-media-grid n${Math.min(b.length,4)}${_.mechanic==="rebus"?" rebus":""}${b.length>1?" eq-row":""}`,style:Xs(M),children:b.map((k,K)=>o.jsx(qs,{src:Xe(k)},K))}))]}),E.map((k,K)=>/\.(mp4|webm)$/i.test(k)?o.jsx(dx,{src:Xe(k),hidden:!!M.media.hidden,waitFor:!!M.media.voice,go:!!n.timer_started_at},K):null),M.answer.mode==="match"&&(M.answer.right_labels??[]).some(Boolean)&&o.jsx("div",{className:`choices-grid${Oa(M.answer.right_labels??[])}`,children:M.answer.right.map((k,K)=>{var se;return o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+K*.3}s`},children:[o.jsx("span",{className:"key",children:k}),((se=M.answer.right_labels)==null?void 0:se[K])??""]},k)})}),v&&!O&&o.jsx("div",{className:`choices-grid${Oa(v.map(k=>k.text))}`,children:v.map((k,K)=>o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+K*.35}s`},children:[o.jsx("span",{className:"key",children:k.key}),k.text]},k.key))}),(V==="after_question"||_.mechanic==="jeopardy")&&n.reveal&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",children:Xi(M)}),M.answer_note&&o.jsx("div",{style:{opacity:.75},children:M.answer_note}),(()=>{const k=M.media.answer??[],K=k.filter(le=>!/\.(mp3|wav|m4a|ogg)$/i.test(le)),se=k.find(le=>/\.(mp3|wav|m4a|ogg)$/i.test(le));return o.jsxs(o.Fragment,{children:[se&&o.jsx(Jc,{src:Xe(se)}),K.length>0&&o.jsx("div",{className:"q-media-grid",style:{maxHeight:"26vh"},children:K.map((le,_e)=>o.jsx("img",{src:Xe(le),alt:""},_e))})]})})()]}),o.jsxs("div",{className:"host-actions",children:[o.jsx(H_,{gameState:n}),(V==="after_question"||_.mechanic==="jeopardy")&&!n.reveal&&o.jsx("button",{onClick:()=>void Us(),children:"Показать ответ"}),n.question_index+1<_.questions.length?o.jsx("button",{onClick:()=>void yi(n.question_index+1),children:"Дальше →"}):V==="after_round"?o.jsx("button",{onClick:()=>void Jl(),children:"Время ответов →"}):o.jsx(ei,{pack:e,gameState:n})]})]})}if(n.phase==="info"){const S=((C=e==null?void 0:e.settings)==null?void 0:C.info_slides)??[],b=S[n.question_index]??S[0];if(b)return o.jsx(ax,{pack:e,slide:b,packId:n.pack_id,gameState:n})}return n.phase==="recap"?o.jsx(ix,{pack:e,round:_,gameState:n}):n.phase==="answer_time"?o.jsx(hx,{pack:e,round:_,gameState:n}):n.phase==="show_answers"&&M?o.jsx(fx,{pack:e,round:_,q:M,gameState:n}):n.phase==="scoreboard"?o.jsx(vx,{pack:e,gameState:n}):n.phase==="break"?o.jsx(Mx,{pack:e,round:_,gameState:n}):n.phase==="counting"?o.jsx(Sx,{pack:e,gameState:n}):n.phase==="finale"?o.jsx(yx,{pack:e,gameId:n.game_id,gameState:n}):o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!M&&o.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Zs("round_intro"),children:"← К титулу раунда"})})]})}function H_({gameState:n}){return n.question_index>0?o.jsx("button",{className:"ghost",onClick:()=>void yi(n.question_index-1),children:"← Назад"}):o.jsx("button",{className:"ghost",onClick:()=>void Zs("round_intro"),children:"← К титулу"})}function Gl({seed:n,low:e}){const t=J.useMemo(()=>{let i=0;for(const a of n)i=i*31+a.charCodeAt(0)>>>0;const s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=60;return Array.from({length:r},(a,l)=>({left:(l+.5)*(100/r)+(s()-.5)*2.5,len:8+s()*34,delay:s()*.5,sway:3+s()*3}))},[n]);return o.jsx("div",{className:"icicles",children:t.map((i,s)=>o.jsx("span",{className:"icicle",style:{left:`${i.left}%`,height:i.len,"--len":`${i.len}px`,animationDelay:`${i.delay}s, ${i.delay}s`,animationDuration:`${i.sway}s, .7s`}},s))})}function W_(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function Oa(n){const e=Math.max(0,...n.map(t=>(t??"").trim().length));return e<=28?"":e<=55?" c-m":e<=95?" c-l":" c-xl"}function Vl({text:n}){const e=n.split(/(\s+)/);let t=0;const i=za([n]);return o.jsx("p",{ref:i,className:`q-text${Ei(n)}`,children:e.map((s,r)=>{if(/^\s+$/.test(s))return s;const a=.12*t++;return o.jsx("span",{className:"q-word",style:{animationDelay:`${a}s`},children:s},r)})})}function j_(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const Mn=J.forwardRef(function({theme:e,lines:t},i){const s=j_(t),r=t.join(`
`),a=sc(r,e==="classic"),l=e==="classic"?a.split(`
`):t;if(e!=="new_year")return o.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((c,f)=>o.jsxs("span",{style:f===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[l[f]??c,o.jsx("br",{})]},f))});let d=0;return o.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((c,f)=>o.jsx("span",{style:{display:"block"},children:[...c].map((m,h)=>m===" "?o.jsx("span",{children:" "},h):o.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*d++}s`},children:m},h))},f))})});function X_(){rc()}function q_(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n,t=e.currentTime,i=e.createGain();i.gain.value=.5,i.connect(e.destination);const s=(r,a,l,d,c)=>{const f=e.createOscillator(),m=e.createGain();f.type=d,f.frequency.setValueAtTime(r,t+a),m.gain.setValueAtTime(1e-4,t+a),m.gain.linearRampToValueAtTime(c,t+a+.008),m.gain.setValueAtTime(c,t+a+l-.05),m.gain.exponentialRampToValueAtTime(1e-4,t+a+l),f.connect(m),m.connect(i),f.start(t+a),f.stop(t+a+l+.02)};for(let r=0;r<5;r++)s(1046.5,r*.22,.11,"square",.3);s(784,1.2,1.25,"square",.26),s(392,1.2,1.25,"sine",.3),setTimeout(()=>void e.close(),3e3)}catch{}}function Ba({startedAt:n,seconds:e,theme:t,chime:i=!0}){const[s,r]=J.useState(e),a=J.useRef(!1);J.useEffect(()=>{if(!n){r(e),a.current=!1;return}const c=()=>{const m=(Date.now()-new Date(n).getTime())/1e3,h=Math.max(0,Math.ceil(e-m));r(h),h===0&&i&&!a.current&&(a.current=!0,q_())};c();const f=setInterval(c,250);return()=>clearInterval(f)},[n,e,i]);const l=s<=10;if(t==="new_year"){const f=2*Math.PI*44,m=Math.max(0,Math.min(1,s/e)),h=Array.from({length:40},(_,M)=>{const p=M/40*Math.PI*2,u=7+M%3*3;return{x1:55+Math.cos(p)*39,y1:55+Math.sin(p)*39,x2:55+Math.cos(p)*(44+u-5),y2:55+Math.sin(p)*(44+u-5),rot:p*180/Math.PI}}),g=Array.from({length:7},(_,M)=>{const p=M/7*Math.PI*2+.4;return{cx:55+Math.cos(p)*44,cy:55+Math.sin(p)*44}});return o.jsxs("div",{className:`ny-wreath${l?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 110 110",children:[h.map((_,M)=>o.jsx("line",{x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2,stroke:M%4===0?"#1f6b3a":"#2f8f4e",strokeWidth:"3",strokeLinecap:"round"},M)),o.jsx("circle",{className:"wr-bg",cx:"55",cy:"55",r:44}),o.jsx("circle",{className:"wr-fg",cx:"55",cy:"55",r:44,strokeDasharray:f,strokeDashoffset:f*(1-m)}),g.map((_,M)=>o.jsx("circle",{className:"wr-berry",cx:_.cx,cy:_.cy,r:"3.4"},M)),o.jsx("path",{className:"wr-bow",d:"M46,99 q9,-9 18,0 q-9,5 -18,0"})]}),o.jsx("span",{className:"val",children:s})]})}if(t==="potter")return o.jsx(lc,{left:s,seconds:e,low:l});const d=!!n&&s>0;return o.jsxs("div",{className:`timer-wrap${l?" low":""}${d?"":" paused"}${n?"":" not-started"}`,children:[o.jsx("span",{className:"tm-orbit","aria-hidden":"true",children:o.jsx("i",{className:"tm-spark"})}),o.jsx("span",{className:`timer-num${l?" danger":""}`,children:s})]})}function $_(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?o.jsxs(o.Fragment,{children:[s,o.jsx("b",{className:"rebus-hot",children:r})]}):o.jsxs(o.Fragment,{children:[o.jsx("b",{className:"rebus-hot",children:r}),s]})}function Y_(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}function Xs(n){const e=n.media.scale;if(!(e==null||e===100))return{"--ms":Math.min(100,Math.max(50,e))/100}}function qs({src:n,children:e}){const[t,i]=J.useState(1.5);return o.jsxs("figure",{className:"q-img",style:{flexGrow:t,flexBasis:0},children:[o.jsx("img",{src:n,alt:"",onLoad:s=>{const r=s.currentTarget;r.naturalWidth&&r.naturalHeight&&i(r.naturalWidth/r.naturalHeight)}}),e]})}const Z_=5e3,Zc=3300,K_=500,J_=900,Hl=100,Wl=600,jl=500;function Q_(n){const e=n.answer;return e.mode==="choice"?Zc+K_+J_:e.mode==="match"?Hl+Wl*Math.max(0,Math.min(e.left.length,6)-1)+jl:e.mode==="order"?Hl+Wl*Math.max(0,e.correct_order.length-1)+jl:1200}function ex({src:n}){const e=J.useRef(null);return J.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),o.jsx("div",{className:"reveal-video",children:o.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Kc(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function Jc({src:n}){return J.useEffect(()=>{if(document.hidden)return;let e=!1;const t=At();return t.src=n,t.loop=!1,t.play().then(()=>{if(e)try{t.pause(),t.src=""}catch{}}).catch(()=>{}),()=>{e=!0;try{t.pause(),t.src=""}catch{}}},[n]),null}function Xl({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return o.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"cp-bar"}),o.jsx("div",{className:"cp-rows",children:e.map((t,i)=>o.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),o.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>o.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function tx({groups:n,onClose:e}){J.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return o.jsx("div",{className:"groups-overlay",onClick:e,children:o.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[o.jsxs("div",{className:"gm-head",children:[o.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),o.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),o.jsx("div",{className:"lg-list",children:n.map((i,s)=>o.jsxs("div",{className:"lg-team",children:[o.jsxs("div",{className:"lg-name",style:{color:fd(s)},children:["Команда ",s+1]}),o.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function nx({src:n,badge:e,children:t}){const[i,s]=J.useState(1.5);return o.jsxs("div",{className:"img-answer",style:{flexGrow:i,flexBasis:0},children:[o.jsxs("span",{className:"ia-frame",children:[o.jsx("span",{className:"ia-key",children:e}),o.jsx("img",{src:n,alt:"",onLoad:r=>{const a=r.currentTarget;a.naturalWidth&&a.naturalHeight&&s(a.naturalWidth/a.naturalHeight)}})]}),t]})}function ix({pack:n,round:e,gameState:t}){const i=J.useMemo(()=>e.questions.filter(h=>!h.hidden),[e.questions]),[s,r]=J.useState(0),a=i[s],l=s+1>=i.length,d=()=>void Jl(),c=()=>{l?d():r(h=>h+1)};if(J.useEffect(()=>{if(!a){d();return}let h=!0;const g=()=>{h&&c()},_=setTimeout(g,Z_),M=a.media.voice;if(!M)return()=>{h=!1,clearTimeout(_)};const p=At();p.src=Xe(M),p.play().catch(()=>{});const u=()=>{clearTimeout(_),g()};return p.addEventListener("ended",u),()=>{h=!1,clearTimeout(_),p.removeEventListener("ended",u);try{p.pause()}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const f=(a.media.question??[]).filter(h=>!/\.(mp3|wav|mp4|webm)$/i.test(h)),m=!!a.question_text.trim();return o.jsxs("div",{className:`host-screen grid-bg recap-screen${f.length?" has-media":""}${m?"":" no-qtext"}`,children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),o.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),o.jsxs("div",{className:"recap-body",children:[m&&o.jsx("p",{className:`q-text${Ei(a.question_text)}`,children:a.question_text}),f.length>0&&o.jsx("div",{className:`q-media-grid n${Math.min(f.length,4)}${f.length>1?" eq-row":""}`,style:Xs(a),children:f.map((h,g)=>o.jsx(qs,{src:Xe(h)},g))})]},a.id),o.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((h,g)=>o.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost",onClick:d,children:"Пропустить повтор"}),o.jsx("button",{onClick:c,children:l?"К ответам →":"Следующий →"})]})]})}function sx({pack:n}){var e,t;return J.useEffect(()=>{var l,d;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=At();s.src=Xe(i),s.loop=!0,s.volume=.45;let r=!1;const a=()=>{r||(r=!0,s.play().catch(()=>{}),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a))};return s.play().then(()=>{r=!0}).catch(()=>{window.addEventListener("pointerdown",a),window.addEventListener("keydown",a)}),()=>{window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a);try{s.pause()}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}function rx(n,e){J.useEffect(()=>{if(!n)return;const i=n.questions.filter(a=>!a.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const a of s){const l=Xe(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const d=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");d.preload="auto",d.src=l,r.push(d)}else{const d=new Image;d.src=l,r.push(d)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[n,e])}function ax({pack:n,slide:e,packId:t,gameState:i}){var l,d;const s=n.rounds.filter(c=>!c.off_scoreboard).map(c=>({id:c.id,name:(c.title_lines??[]).join(" ")||"—",count:c.questions.filter(f=>!f.hidden).length})),r=hn(i.game_id),a=Td(n,r.length);return o.jsxs(o.Fragment,{children:[o.jsx(wd,{slide:e,rounds:s,stats:a,mediaUrl:Xe}),o.jsx("div",{className:"host-actions",children:o.jsx(lx,{slides:((l=n.settings)==null?void 0:l.info_slides)??[],index:ox(n,e),packId:t,paper:((d=n.settings)==null?void 0:d.play_mode)==="paper"})})]})}function ox(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function lx({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return o.jsxs(o.Fragment,{children:[e>0&&o.jsx("button",{className:"ghost",onClick:()=>void xi(e-1),children:"← Назад"}),e+1<n.length&&o.jsx("button",{className:"ghost",onClick:()=>void xi(e+1),children:"Дальше →"}),s?i?o.jsx("button",{onClick:()=>void bd(),children:"К подсчёту →"}):o.jsx("button",{onClick:()=>void Ys(t),children:"К итогам →"}):o.jsx("button",{onClick:()=>void Zs("round_intro"),children:"К раунду →"})]})}function cx({pack:n,round:e,gameState:t}){const{state:i,setState:s}=pd(t.game_id,t.round_number),r=hn(t.game_id),a=Bn(t.game_id,t.round_number,400),l=J.useMemo(()=>e.questions.map(u=>({id:u.id,hidden:u.hidden})),[e.questions]),d=e.settings,c=J.useRef(!1),f=async u=>{if(!c.current){c.current=!0,s(u);try{if(await Sd(t.game_id,t.round_number,u),u.finished&&!(i!=null&&i.finished)){const w=Mo(vo(u),d.timeoutPenalty??10),{error:C}=await Ut.from("answers").upsert(w.map(S=>({team_id:S.teamId,game_id:t.game_id,question_ref:"q-blitz",round_number:t.round_number,answer_text:`место ${S.place}`,stake:S.score,updated_at:new Date().toISOString()})),{onConflict:"team_id,question_ref"});C&&console.error("блиц: итоги не записались",C)}}finally{c.current=!1}}};J.useEffect(()=>{if(i||r.length<2)return;const u=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(C=>C.id);f(md(w,d.teamSeconds??60))},3e3);return()=>clearTimeout(u)},[i,r.length]),J.useEffect(()=>{if(!i||i.finished||i.current)return;const u=setTimeout(()=>{const w=gd(l,i.used);if(!w)return void f(fo(i));Ad(w.id).catch(()=>{}),f(_d(i,w.id,Date.now()))},po);return()=>clearTimeout(u)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const m=i==null?void 0:i.current,h=m?e.questions.find(u=>u.id===m.questionId):void 0,g=i?Yl(i):void 0;J.useEffect(()=>{if(!i||!m||!h||!g)return;const u=a.find(C=>C.team_id===g&&C.question_ref===`q-${h.id}`);if(!(u!=null&&u.answer_text)||m.lastAnswer===u.answer_text)return;if(u.answer_text===xd){f(mo(ir(i,Date.now()),Date.now()));return}const w=Hr(h.answer,u.answer_text)===!0;f(vd(i,Date.now(),w?"ok":"no",u.answer_text))},[a,m==null?void 0:m.questionId,m==null?void 0:m.lastAnswer]);const _=(m==null?void 0:m.verdict)==="no"&&m.attempts+1>=go;if(J.useEffect(()=>{if(!i||!(m!=null&&m.verdict))return;const w=Math.max(0,(_?yd:po)-(Date.now()-(m.pausedAt??Date.now()))),C=setTimeout(()=>{const S=Date.now(),b=ir(i,S),E=a.find(R=>R.team_id===g&&R.question_ref===`q-${m.questionId}`);E&&Ut.from("answers").update({is_correct:m.verdict==="ok"}).eq("id",E.id).then(()=>{}),f(m.verdict==="ok"?_o(b,S):xo(b,S))},w);return()=>clearTimeout(C)},[m==null?void 0:m.verdict,m==null?void 0:m.lastAnswer]),!i)return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),o.jsx(Eo,{teams:r,rolling:!0})]});if(i.finished){const u=Mo(vo(i),d.timeoutPenalty??10);return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),o.jsxs("table",{className:"score-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),o.jsx("th",{children:"Очки"}),o.jsx("th",{children:"Баллы"})]})}),o.jsx("tbody",{children:u.map(w=>{var C;return o.jsxs("tr",{children:[o.jsxs("td",{children:[w.place,w.shared?"=":""]}),o.jsx("td",{children:((C=r.find(S=>S.id===w.teamId))==null?void 0:C.name)??"—"}),o.jsx("td",{children:w.points}),o.jsx("td",{children:w.score})]},w.teamId)})})]}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})})]})}const M=i.current!=null||Object.values(i.correct).some(u=>u>0)||Object.values(i.missed).some(u=>u>0),p=!m&&i.lastReveal?(()=>{const u=e.questions.find(w=>w.id===i.lastReveal.questionId);if(u)return{questionText:u.question_text,answerText:Xi(u),verdict:i.lastReveal.verdict}})():void 0;return o.jsxs(o.Fragment,{children:[o.jsx(zd,{teams:r,state:i,bank:l,questionText:h==null?void 0:h.question_text,verdict:m==null?void 0:m.verdict,reveal:p,answerText:(m==null?void 0:m.verdict)==="ok"||(m==null?void 0:m.verdict)==="no"&&m.attempts+1>=go?Xi(h):void 0,dice:M?void 0:o.jsx(Eo,{teams:r,rolling:!1,pickedId:i.order[0]})}),o.jsxs("div",{className:"host-actions",children:[(m==null?void 0:m.verdict)&&o.jsxs("button",{className:"ghost",onClick:()=>{const u=Date.now(),w=ir(i,u);f(m.verdict==="ok"?xo(w,u):_o(w,u))},children:["Исправить на «",m.verdict==="ok"?"неверно":"верно","»"]}),m&&m.verdict!=="ok"&&o.jsx("button",{className:"ghost",onClick:()=>void f(mo(i,Date.now())),children:"Скип −1"}),o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&f(fo(i))},children:"Завершить раунд"})]})]})}function Xi(n){const e="⚠ ответ не заполнен в редакторе",t=n.answer,i=t.display;return Array.isArray(i)?i.join(" · "):typeof i=="string"&&i?i:typeof t.correct=="string"&&t.correct?String(t.correct).split("/")[0].trim():typeof t.word=="string"&&t.word?t.word.toUpperCase():typeof t.correct_choice=="string"&&t.correct_choice?t.correct_choice:typeof t.correct_order=="string"&&t.correct_order?t.correct_order:Array.isArray(t.correct_pairs)&&t.correct_pairs.length?t.correct_pairs.join("  "):e}function dx({src:n,hidden:e,waitFor:t,go:i}){const s=J.useRef(null);return J.useEffect(()=>{var r;t&&!i||(r=s.current)==null||r.play().catch(()=>{})},[t,i]),o.jsx("video",{ref:s,src:n,controls:!e,autoPlay:!t,style:e?{width:1,height:1,opacity:0}:{maxHeight:"46vh",borderRadius:14}})}function ux({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:a=!1,gameId:l,roundNumber:d}){const c=(n.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),f=J.useRef(null),m=J.useRef(null),h=J.useRef(!1);return J.useEffect(()=>{if(X_(),a&&!c||t)return;let g=!1;const _=(n.media.question??[]).find(u=>/\.(mp3|wav|m4a|ogg)$/i.test(u));h.current=!1;const M=()=>{if(!g){if(h.current=!0,_){const u=At();u.src=Xe(_),m.current=u,u.play().catch(()=>{})}Is(l&&d!=null?{gameId:l,roundNumber:d,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){M();return}const p=At();return p.src=Xe(n.media.voice),f.current=p,p.onended=M,p.onerror=M,p.play().then(()=>{if(g)try{p.pause(),p.src=""}catch{}}).catch(M),()=>{var w;g=!0;const u=f.current;if(u){u.onended=null,u.onerror=null;try{u.pause(),u.src=""}catch{}}f.current=null,(w=m.current)==null||w.pause()}},[n.id,a]),J.useEffect(()=>{if(!a||!t||c)return;let g=!1;const _=(n.media.question??[]).find(p=>/\.(mp3|wav|m4a|ogg)$/i.test(p)),M=()=>{if(g||!_)return;const p=At();p.src=Xe(_),m.current=p,p.play().catch(()=>{})};if(n.media.voice){const p=At();p.src=Xe(n.media.voice),f.current=p,p.onended=M,p.onerror=M,p.play().then(()=>{if(g)try{p.pause(),p.src=""}catch{}}).catch(M)}else M();return()=>{var u;g=!0;const p=f.current;if(p){p.onended=null,p.onerror=null;try{p.pause(),p.src=""}catch{}}f.current=null,(u=m.current)==null||u.pause()}},[n.id,a,t]),J.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const _=f.current;_&&!_.paused&&!_.ended||Is(l&&d!=null?{gameId:l,roundNumber:d,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(g)},[n.id,t,a]),J.useEffect(()=>{var C;const g=e.settings.bg_music??((C=i==null?void 0:i.settings)==null?void 0:C.bg_music);if(!t||!g||c)return;const _=At();_.src=Xe(g),_.loop=!0,_.volume=.6,_.play().catch(()=>{});let M;const p=(r??e.timer_seconds??60)*1e3,u=s?p-(Date.now()-new Date(s).getTime()):p,w=window.setTimeout(()=>{M=window.setInterval(()=>{_.volume=Math.max(0,_.volume-.1),_.volume<=.01&&(M&&clearInterval(M),_.pause())},80)},Math.max(0,u)+3e3);return()=>{clearTimeout(w),M&&clearInterval(M),_.pause()}},[t,n.id]),null}function hx({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=hn(t.game_id),a=Bn(t.game_id,t.round_number),l=e.questions.filter(c=>!c.hidden).length;return J.useEffect(()=>{var m;const c=e.settings.bg_music??((m=n.settings)==null?void 0:m.bg_music);if(!c)return;const f=At();return f.src=Xe(c),f.loop=!0,f.volume=.6,f.play().catch(()=>{}),()=>f.pause()},[e.id]),o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Yn(n,t.round_number)," :: ВРЕМЯ ОТВЕТОВ"]}),o.jsx("div",{className:"answer-pulse",children:o.jsx(Mn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),o.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),o.jsx(Ba,{startedAt:t.timer_started_at,seconds:i,theme:n.theme}),!s&&o.jsx("div",{className:"answer-time-teams",children:r.map(c=>{const f=a.filter(h=>{var g;return h.team_id===c.id&&((g=h.answer_text)==null?void 0:g.trim())}).length,m=f>=l;return o.jsxs("div",{className:`at-team${m?" done":""}`,children:[o.jsx("span",{style:{color:c.color},children:c.name})," · ",f,"/",l]},c.id)})}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>void yi(e.questions.length-1),children:"← Назад"}),o.jsx("button",{onClick:()=>void Vi(0),children:"К ответам →"})]})]})}function fx({pack:n,round:e,q:t,gameState:i}){var E;const s=((E=n.settings)==null?void 0:E.play_mode)==="paper",r=Bn(i.game_id,i.round_number),a=i.reveal,l=hn(i.game_id),[d,c]=J.useState([]);J.useEffect(()=>{Ut.from("teams").select("id,name,color").then(({data:R})=>c(R??[]))},[]);const f=r.filter(R=>R.question_ref===`q-${t.id}`),m=e.questions.length,h=i.question_index;J.useEffect(()=>{if(a||document.hidden)return;const R=setTimeout(()=>{Us()},3e3);return()=>clearTimeout(R)},[a,h]);const[g,_]=J.useState(!1);J.useEffect(()=>{if(_(!1),!a)return;const R=setTimeout(()=>_(!0),Q_(t)+600);return()=>clearTimeout(R)},[a,t.id]),J.useEffect(()=>{!g||document.hidden||f.forEach(R=>{if(R.is_correct!=null)return;const v=Hr(t.answer,R.answer_text);v!==null&&Ut.from("answers").update({is_correct:v}).eq("id",R.id).then(()=>{})})},[g,h,f.length,f.map(R=>R.answer_text).join("|")]);const M=t.answer.mode==="choice"?t.answer.choices:null,p=(t.media.question??[]).filter(R=>!/\.(mp3|mp4|webm|wav)$/i.test(R)),u=(t.media.answer??[]).filter(R=>!/\.(mp3|mp4|webm|wav)$/i.test(R)),w=(t.media.question??[]).filter(R=>!/\.(mp3|mp4|webm|wav)$/i.test(R)),C=u.length?u:w,S=t.media.hidden?(t.media.question??[]).find(R=>/\.(mp4|webm)$/i.test(R)):void 0,b=(t.media.answer??[]).find(R=>/\.(mp3|wav|m4a|ogg)$/i.test(R));return o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"mono-tag",children:["РАУНД ",Yn(n,i.round_number)," :: ОТВЕТЫ"]}),o.jsxs("span",{className:"qnum",children:["ВОПРОС ",o.jsx("b",{children:h+1})," / ",m]})]}),o.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[o.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&o.jsxs(o.Fragment,{children:[o.jsx("p",{className:`q-text${Ei(t.question_text)}`,children:t.question_text}),w.length>0&&!t.media.hidden&&o.jsx("div",{className:`q-media-grid n${Math.min(w.length,4)}${w.length>1?" eq-row":""}`,style:Xs(t),children:w.map((R,v)=>o.jsx(qs,{src:Xe(R)},v))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&o.jsx("p",{className:`q-recall${Ei(t.question_text)}`,children:t.question_text}),a&&o.jsxs("div",{className:"answer-block reveal-in",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),S&&o.jsx(ex,{src:Xe(S)}),b&&o.jsx(Jc,{src:Xe(b)}),e.mechanic==="rebus"?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:Xi(t)}),o.jsx("div",{className:"rebus-answer",children:w.slice(0,2).map((R,v)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:Xe(R),alt:""}),o.jsx("figcaption",{children:$_(v===0?t.service.word1:t.service.word2,v===0)})]},v))})]}):t.answer.mode==="match"?o.jsx(xx,{q:t}):M&&p.length===M.length?o.jsx(ql,{q:t,choices:M,imgs:p}):M?o.jsx(ql,{q:t,choices:M}):t.answer.mode==="order"?o.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((R,v)=>{const A=t.answer.choices.find(P=>P.key===R);return o.jsxs("div",{className:"oi",children:[o.jsx("b",{children:R}),o.jsx("span",{className:"oi-pos",children:v+1}),o.jsx("span",{className:"oi-text",children:(A==null?void 0:A.text)??""})]},v)})}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:Xi(t)}),C.length>0&&o.jsx("div",{className:`q-media-grid answer-media n${Math.min(C.length,4)}${C.length>1?" eq-row":""}`,children:C.map((R,v)=>o.jsx(qs,{src:Xe(R)},v))})]}),g&&t.answer_note&&o.jsx("div",{className:`answer-note${W_(t.answer_note)}`,children:t.answer_note})]})]}),!s&&o.jsxs("div",{className:"team-answers",children:[o.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${f.length}`}),f.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),f.map(R=>{const v=l.find(P=>P.id===R.team_id)??d.find(P=>P.id===R.team_id),A=g?R.is_correct??Hr(t.answer,R.answer_text):null;return o.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${A===!0?"var(--ok)":A===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsx("span",{className:"name",style:{color:v==null?void 0:v.color},children:(v==null?void 0:v.name)??"—"}),o.jsxs("span",{className:"text",children:[a?R.answer_text||"—":"• • •",R.stake!=null&&R.stake!==0&&o.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",R.stake]})]}),A!=null&&o.jsx("span",{className:"mark",style:{color:A?"var(--ok)":"var(--danger)"},children:A?"✓":"✗"})]},R.id)})]})]}),o.jsxs("div",{className:"host-actions",children:[h>0&&o.jsx("button",{className:"ghost",onClick:()=>void Vi(h-1,!0),children:"← Назад"}),a?h<m-1?o.jsx("button",{onClick:()=>void Vi(h+1),children:"Следующий вопрос →"}):o.jsx(ei,{pack:n,gameState:i}):o.jsx("button",{onClick:()=>void Us(),children:"Показать ответ →"})]})]})}function ql({q:n,choices:e,imgs:t}){const[i,s]=J.useState(0);J.useEffect(()=>{s(0);const f=setTimeout(()=>s(1),2200),m=setTimeout(()=>s(2),Zc);return()=>{clearTimeout(f),clearTimeout(m)}},[n.id]);const r=n.answer.correct_choice??"",a=e.filter(f=>f.key!==r),l=new Set(Y_(a.map(f=>f.key),n.id).slice(0,2)),d=f=>i>=1||l.has(f)?i<2?"":f===r?" correct":" dimmed":" hidden-yet",c=f=>l.has(f)?0:.25*e.filter(m=>!l.has(m.key)).findIndex(m=>m.key===f);return t?o.jsx("div",{className:"choice-imgs",children:e.map((f,m)=>o.jsxs("div",{className:`choice-img${d(f.key)}`,style:{animationDelay:`${c(f.key)}s`},children:[o.jsx("img",{src:Xe(t[m]),alt:""}),o.jsxs("span",{className:"key",children:[f.key,f.text?` — ${f.text}`:""]})]},f.key))}):o.jsx("div",{className:`choices-grid${Oa(e.map(f=>f.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(f=>o.jsxs("div",{className:`choice-plate${d(f.key)}`,style:{animationDelay:`${c(f.key)}s`},children:[o.jsx("span",{className:"key",children:f.key}),f.text]},f.key))})}function px({enabled:n,startedAt:e,seconds:t}){return J.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Us()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function mx({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return J.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,a=Math.max(500,r-Date.now()),l=setTimeout(()=>{yi(e.question_index+1)},a);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function gx({pack:n,round:e,gameState:t}){const i=e.settings.themes??[],[s,r]=J.useState(null),a=(t.jeopardy_opened??[]).filter(p=>typeof p=="string"),[l,d]=J.useState([]),[c,f]=J.useState(null),m=[...new Set([...a,...l])],h=async p=>{d(p);const{error:u}=await Ut.from("game_sessions").update({jeopardy_opened:p}).eq("id",Zn());f(u?"Плитки не сохраняются: "+u.message+". Выполни миграцию 0006_jeopardy_opened.sql.":null),await Ut.from("game_sessions").update({timer_started_at:null,reveal:!1}).eq("id",Zn())},g=e.title_lines.join(" ")||"СВОЯ ИГРА",_=sc(g,n.theme==="classic");if(i.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"СВОЯ ИГРА"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Zs("round_intro"),children:"← К титулу"})})]});const M=Math.max(...i.map(p=>p.tiles.length));return o.jsxs("div",{className:"host-screen grid-bg jp-screen",children:[o.jsx("h1",{className:"neon-title jp-title",children:n.theme==="classic"?_:g}),o.jsxs("div",{className:"jp-board",style:{gridTemplateColumns:`repeat(${i.length}, minmax(0, 1fr))`,gridTemplateRows:`auto repeat(${M}, minmax(0, 1fr))`},children:[c&&o.jsxs("div",{className:"jp-save-err",children:["⚠ ",c]}),i.map((p,u)=>o.jsxs("div",{className:"jp-theme-name",style:{gridColumn:u+1,gridRow:1},children:[p.name||`Тема ${u+1}`,p.hint&&o.jsx("span",{className:"jp-theme-hint",children:p.hint})]},`h${u}`)),i.map((p,u)=>p.tiles.map((w,C)=>{const S=m.includes(`${u}-${C}`);return o.jsx("button",{className:`jp-tile${S?" done":""}`,disabled:S,"data-c":u%8,style:{gridColumn:u+1,gridRow:C+2},onClick:()=>{const b=i.slice(0,u).reduce((E,R)=>E+R.tiles.length,0)+C;yi(b).then(()=>Is({gameId:t.game_id,roundNumber:t.round_number,questionRef:Md(t.round_number,b)})),r({t:u,i:C})},children:S?"·":w.value},`${u}-${C}`)}))]}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})}),s&&o.jsx(_x,{packTheme:n.theme,round:e,gameState:t,theme:i[s.t],tile:i[s.t].tiles[s.i],tileIndex:i.slice(0,s.t).reduce((p,u)=>p+u.tiles.length,0)+s.i,onClose:()=>{h([...m,`${s.t}-${s.i}`]),r(null)}})]})}function _x({round:n,gameState:e,theme:t,tile:i,tileIndex:s,onClose:r,packTheme:a}){const l=n.settings.clipSeconds??30,d=J.useRef(null),[c,f]=J.useState(l),[m,h]=J.useState(!1),[g,_]=J.useState(!1),M=Bn(e.game_id,e.round_number),p=hn(e.game_id),[u,w]=J.useState(null),C=()=>{var E;if((E=d.current)==null||E.stop(),!i.audio){h(!1),w("у плитки не задан трек");return}w(null),f(l),d.current=nu(Xe(i.audio),l,{onStart:()=>h(!0),onTick:R=>f(R),onEnd:()=>h(!1),onError:R=>{h(!1),w(R)}})};J.useEffect(()=>(C(),()=>{var E;(E=d.current)==null||E.stop()}),[s]);const S=M.filter(E=>Ed(E.question_ref,e.round_number)===s).sort((E,R)=>+new Date(E.updated_at)-+new Date(R.updated_at)),b=async(E,R)=>{await Ut.from("answers").update({is_correct:R}).eq("id",E)};return $l.createPortal(o.jsx("div",{className:`jp-overlay theme-${a??"classic"}`,children:o.jsxs("div",{className:"jp-modal hud-frame",children:[o.jsxs("div",{className:"jp-modal-head",children:[o.jsxs("div",{children:[o.jsx("div",{className:"jp-modal-theme",children:t.name}),o.jsxs("div",{className:"mono-tag",children:["ПЛИТКА · ",i.value]})]}),o.jsx("div",{className:`jp-count${m?" on":""}`,children:String(c).padStart(2,"0")})]}),g&&o.jsxs("div",{className:"answer-reveal hud-frame",style:{padding:"12px 18px"},children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",style:{fontSize:"clamp(24px,3vw,40px)"},children:i.correct})]}),o.jsxs("div",{className:"jp-answers",children:[o.jsx("div",{className:"mono-tag",children:g?"ОТВЕТЫ (ПО СКОРОСТИ)":`ОТВЕТИЛИ: ${S.length}`}),S.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"ждём ответы…"}),S.map((E,R)=>{const v=p.find(A=>A.id===E.team_id);return o.jsxs("div",{className:"jp-answer",style:{borderLeft:`3px solid ${E.is_correct===!0?"var(--ok)":E.is_correct===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsxs("span",{className:"pos",children:["#",R+1]}),o.jsx("span",{className:"name",style:{color:v==null?void 0:v.color},children:(v==null?void 0:v.name)??"—"}),o.jsx("span",{className:"txt",children:g?E.answer_text||"—":"• • •"}),g&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:`jp-grade ok${E.is_correct===!0?" chosen":""}`,onClick:()=>void b(E.id,!0),children:"✓"}),o.jsx("button",{className:`jp-grade no${E.is_correct===!1?" chosen":""}`,onClick:()=>void b(E.id,!1),children:"✗"})]})]},E.id)})]}),o.jsxs("div",{className:"jp-modal-foot",children:[!g&&o.jsx("button",{onClick:()=>_(!0),children:"Показать ответ"}),o.jsx("button",{className:"ghost",onClick:C,children:"↻ Переслушать"}),u&&o.jsxs("div",{className:"jp-audio-err",children:["🔇 ",u,o.jsx("button",{className:"ghost",style:{marginLeft:10},onClick:()=>void tu(Xe(i.audio)).then(E=>alert(E)),children:"что с файлом?"})]}),S.some(E=>E.is_correct==null)&&o.jsxs("div",{className:"jp-ungraded",children:["⚠ не оценено: ",S.filter(E=>E.is_correct==null).length]}),o.jsx("button",{className:"ghost dark",onClick:r,children:"Закрыть плитку"})]})]})}),document.body)}function xx({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return o.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var d;const a=((d=i.find(c=>c.startsWith(s)))==null?void 0:d.slice(s.length))??"—",l=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return o.jsxs("div",{className:"mi",children:[t[r]&&o.jsx("img",{src:Xe(t[r]),alt:""}),o.jsxs("div",{className:"mi-label",children:[o.jsxs("b",{children:[s," → ",a]}),l&&l!==a&&o.jsx("span",{className:"mi-text",children:l})]})]},s)})})}function vx({pack:n,gameState:e}){const t=hn(e.game_id),i=Bn(e.game_id),s=ec(n,t,i),r=tc(n,t,i),a=n.rounds.filter(g=>!g.off_scoreboard),l=nc(t,s,i,r),d=l.map(g=>g.team),[c,f]=J.useState(0);J.useEffect(()=>{if(f(0),d.length===0)return;const g=setInterval(()=>f(_=>_>=d.length?_:_+1),2200);return()=>clearInterval(g)},[d.length,e.round_number]);const m=J.useRef(null),h=za([d.length,a.length],{shrinkBefore:m});return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),o.jsx("h2",{className:"sb-title",ref:m,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),o.jsx("div",{className:"sb-table-wrap",children:o.jsxs("table",{ref:h,className:`score-table${Kc(d.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),a.map((g,_)=>o.jsxs("th",{children:["Р",_+1]},g.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:d.map((g,_)=>{const M=l.find(w=>w.team.id===g.id),p=(M==null?void 0:M.place)??1,u=_>=d.length-c;return o.jsxs("tr",{className:`sb-row${u?" is-in":" is-veiled"}${p===1?" leader":""}`,children:[o.jsxs("td",{children:[p<=3?o.jsx("span",{className:"sb-medal",children:o.jsx(Wr,{theme:n.theme,place:p})}):p,(M==null?void 0:M.shared)&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:g.color,fontFamily:"var(--font-display)"},children:o.jsx("span",{className:"sb-name",children:g.name})}),a.map(w=>{const C=r.get(g.id)??[];return o.jsx("td",{children:C[n.rounds.indexOf(w)]??0},w.id)}),o.jsx("td",{className:"total",children:s.get(g.id)??0})]},g.id)})})]})}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:e})})]})}function Mx({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=J.useState(i*60);J.useEffect(()=>{const d=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),c=()=>r(Math.max(0,Math.round(i*60-(Date.now()-d)/1e3)));c();const f=setInterval(c,500);return()=>clearInterval(f)},[t.timer_started_at,i]);const a=String(Math.floor(s/60)).padStart(2,"0"),l=String(s%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),o.jsx(Mn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),o.jsx(js,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[a,":",l]}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})})]})}function Sx({pack:n,gameState:e}){var l,d;const[i,s]=J.useState(300);J.useEffect(()=>{const c=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),f=()=>s(Math.max(0,Math.round(5*60-(Date.now()-c)/1e3)));f();const m=setInterval(f,500);return()=>clearInterval(m)},[e.timer_started_at]),J.useEffect(()=>{var m,h;const c=((m=n.settings)==null?void 0:m.finale_music)??((h=n.settings)==null?void 0:h.bg_music);if(!c||document.hidden)return;const f=At();return f.src=Xe(c),f.loop=!0,f.volume=.55,f.play().catch(()=>{}),()=>{try{f.pause(),f.src=""}catch{}}},[(l=n.settings)==null?void 0:l.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=String(Math.floor(i/60)).padStart(2,"0"),a=String(i%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),o.jsx(Mn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),o.jsx(js,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[r,":",a]}),o.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Ys(e.pack_id,!0),children:"К итогам →"})})]})}function yx({pack:n,gameId:e,gameState:t}){var E,R,v;const i=hn(e),s=Bn(e),r=ec(n,i,s),a=tc(n,i,s),l=nc(i,r,s,a),d=!!t.reveal,c=t.question_index??0,f=J.useRef(null),m=za([l.length],{shrinkBefore:f}),g=n.rounds.map((A,P)=>({r:A,i:P})).filter(A=>!A.r.off_scoreboard).map(({r:A,i:P})=>{var Q;let D=null,F=-1/0;for(const Y of i){const O=((Q=a.get(Y.id))==null?void 0:Q[P])??0;O>F&&(F=O,D=Y)}return{round:A,idx:P,team:D,score:F}}),_=3e3,M=1e4,p=g.length;J.useEffect(()=>{if(d||c>p)return;const P=setTimeout(()=>void xi(c+1),c===p?M:_);return()=>clearTimeout(P)},[d,c,p]);const[u,w]=J.useState(0);J.useEffect(()=>{if(w(0),l.length===0)return;let A=!1,P=0,D;const F=()=>{A||(P+=1,w(P),!(P>=l.length)&&(D=setTimeout(F,Math.max(320,900-90*P))))};return D=setTimeout(F,Math.max(320,900-90*P)),()=>{A=!0,clearTimeout(D)}},[l.length,c,d]);const C=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],S=o.jsx(o.Fragment,{children:Array.from({length:5},(A,P)=>o.jsxs("div",{className:"fw-burst",style:{left:`${12+P*19}%`,top:`${18+P%3*14}%`},children:[o.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${C[P%C.length]}55, transparent 70%)`,"--dur":`${2.2+P*.3}s`,"--delay":`${P*.45}s`}}),Array.from({length:10},(D,F)=>o.jsx("span",{className:"fw-spark",style:{background:C[(P+F)%C.length],"--a":`${F*36}deg`,"--dur":`${2.2+P*.3}s`,"--delay":`${P*.45}s`}},F))]},P))}),b=o.jsxs("div",{className:"fin-breakdown",children:[o.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),o.jsx("div",{className:"fin-table-wrap",children:o.jsxs("table",{ref:m,className:`fin-table${Kc(l.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),n.rounds.map((A,P)=>!A.off_scoreboard&&o.jsxs("th",{children:["Р",Yn(n,P)]},A.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:l.map(({team:A,place:P,shared:D},F)=>{const Q=F>=l.length-u;return o.jsxs("tr",{className:`fin-row${P<=3?" top3":""}${P===1?" fin-first":""}${Q?" is-in":" is-veiled"}`,children:[o.jsxs("td",{className:"fin-pos",children:[P,D&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:A.color},children:o.jsx("span",{className:"sb-name",children:A.name})}),n.rounds.map((Y,O)=>{var V;return!Y.off_scoreboard&&o.jsx("td",{children:((V=a.get(A.id))==null?void 0:V[O])??0},Y.id)}),o.jsx("td",{children:o.jsx("b",{children:r.get(A.id)??0})})]},A.id)})})]})})]});if(d){const A=[...new Set(l.map(F=>F.place))].filter(F=>F<=3).sort((F,Q)=>Q-F);if(c>=A.length)return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[S,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(Mn,{ref:f,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),b,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Gr()},children:"⟲ Новая игра"})})]});const P=A[c],D=l.filter(F=>F.place===P);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void xi(c+1),children:[P===1&&S,o.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),o.jsxs("div",{className:`fin-award p${P}`,children:[o.jsxs("div",{className:"fin-award-place",children:[P," МЕСТО"]}),o.jsx("div",{className:"fin-award-medal",children:o.jsx(Wr,{theme:n.theme,place:P})}),D.length>0?D.map(F=>o.jsx("div",{className:"fin-award-name",style:{color:F.team.color},children:F.team.name},F.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(c<p){const A=g[c];return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void xi(c+1),children:[o.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),o.jsxs("div",{className:"fin-slide",children:[o.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Yn(n,A.idx)," · ",A.round.title_lines.join(" ")]}),o.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),o.jsx("div",{className:"fin-slide-team",style:{color:(E=A.team)==null?void 0:E.color},children:((R=A.team)==null?void 0:R.name)??"—"}),o.jsx("div",{className:"fin-slide-score",children:Math.max(0,A.score)})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"3s"}})},c),o.jsx("div",{className:"fin-dots",children:g.map((P,D)=>o.jsx("span",{className:D===c?"on":""},D))})]})}if(c===p){const A=l.filter(P=>P.place===1);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void xi(c+1),children:[S,o.jsx("div",{className:"mono-tag",children:A.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),o.jsxs("div",{className:"fin-award p1",children:[o.jsx("div",{className:"fin-award-medal",children:o.jsx(Wr,{theme:n.theme,place:1})}),A.length>0?A.map(P=>o.jsx("div",{className:"fin-award-name",style:{color:P.team.color},children:P.team.name},P.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"}),o.jsx("div",{className:"fin-award-score",children:((v=A[0])==null?void 0:v.total)??0})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[S,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(Mn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),b,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Gr()},children:"⟲ Новая игра"})})]})}export{Dx as HostScreen,Oa as choicesLenClass,W_ as noteClass,X_ as stopAllMedia};
