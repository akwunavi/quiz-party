import{j as o,s as Ut}from"./index-GDBgMUUV.js";import{r as J,a as Zl}from"./vendor-Y8-lBF4Z.js";import{c as Kl,r as ld,l as cd,s as Jl,a as Ql,f as $s,b as dd,g as kr,d as Ls,e as ki,h as Zn,u as ud,R as hd,i as fd,j as Gr,k as pd,m as yi,n as Is,o as ec,p as Ys,t as md,q as gd,v as _d,w as xd,x as fo,y as vd,N as po,S as Md,z as mo,A as nr,B as Sd,M as go,C as _o,D as xo,E as vo,F as yd,G as xi,H as Ed,I as bd,J as Td,K as wd}from"./teamColors-B-psf9-l.js";import{m as We,l as Ei,u as za,p as Ad,I as Rd}from"./duration-KGivGqqu.js";import{m as Cd}from"./answerCheck-BnNffFuj.js";import{a as tc,s as Nd,b as Vr,u as hn,c as Bn,o as Pd,d as Dd,i as Ld,e as Hr,f as Mo,g as nc,h as ic,r as sc}from"./raceActions-ChjwKfoM.js";import{l as Id,a as Ud,d as Yn,m as So}from"./packLoader-CQDn3AJG.js";import{T as Fd,S as Od}from"./ThemeLayer-Dmpk1rlS.js";import{C as Bd}from"./CrosswordView-Ca6TVs-x.js";function zd(n){return n<=1?{top:!1,cols:1}:n===2?{top:!1,cols:2}:n===3?{top:!0,cols:2}:n===4?{top:!1,cols:2}:n===5?{top:!0,cols:2}:{top:n%2===1,cols:n<=6?3:4}}const kd=n=>String(Math.max(0,Math.ceil(n/1e3)));function yo({team:n,state:e,active:t,now:i}){const s=cd(e,n.id,i),r=(e.correct[n.id]??0)-(e.missed[n.id]??0),a=s<=1e4;return o.jsxs("div",{className:`bz-block${t?" on":""}${a&&t?" low":""}`,style:{"--tc":n.color},children:[t&&o.jsx("span",{className:"bz-turn",children:"ХОД"}),o.jsx("div",{className:"bz-name",children:n.name}),o.jsx("div",{className:`bz-timer${a?" low":""}`,children:kd(s)}),o.jsxs("div",{className:"bz-meta",children:[o.jsx("span",{className:"bz-pts",children:r>0?`+${r}`:r}),o.jsxs("span",{className:"bz-qn",children:["вопрос ",(e.correct[n.id]??0)+(e.missed[n.id]??0)+(t?1:0)]})]})]})}function Gd({teams:n,state:e,bank:t,questionText:i,verdict:s,answerText:r,dice:a,reveal:l}){const[d,c]=J.useState(()=>Date.now());J.useEffect(()=>{const T=setInterval(()=>c(Date.now()),250);return()=>clearInterval(T)},[]);const h=e.order.map(T=>n.find(R=>R.id===T)).filter(T=>!!T),m=Kl(e),{top:f,cols:g}=zd(h.length),_=h.find(T=>T.id===m),M=f?h.slice(0,1):h.slice(0,Math.ceil(h.length/2)),p=f?h.slice(1):h.slice(Math.ceil(h.length/2)),u=f?g:Math.max(1,M.length);return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"БЛИЦ"}),o.jsx("span",{className:"bz-bank",children:ld(t,e.used)})]}),o.jsx("div",{className:`bz-row${f?" bz-row-top":""}`,style:{"--cols":f?1:u},children:M.map(T=>o.jsx(yo,{team:T,state:e,active:T.id===m,now:d},T.id))}),o.jsx("div",{className:`bz-question${s?` v-${s}`:""}`,style:{"--tc":_==null?void 0:_.color},children:a??(i?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"bz-asking",children:["отвечают: ",o.jsx("b",{children:(_==null?void 0:_.name)??"—"})]}),o.jsx("div",{className:"bz-qtext",children:i}),s&&o.jsxs("div",{className:`bz-verdict ${s}`,children:[s==="ok"?"ВЕРНО":"НЕВЕРНО",r&&o.jsxs("span",{className:"bz-right",children:[" · ",r]})]})]}):l?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"bz-asking",children:l.verdict==="ok"?"ответили верно!":l.verdict==="skip"?"вопрос пропущен":"не угадали"}),o.jsx("div",{className:"bz-qtext",children:l.questionText}),o.jsxs("div",{className:`bz-verdict ${l.verdict==="ok"?"ok":"no"}`,children:["Правильный ответ: ",l.answerText]})]}):o.jsx("div",{className:"bz-asking",children:"следующий вопрос…"}))}),o.jsx("div",{className:"bz-row",style:{"--cols":Math.max(1,p.length)},children:p.map(T=>o.jsx(yo,{team:T,state:e,active:T.id===m,now:d},T.id))})]})}function Eo({teams:n,pickedId:e,rolling:t}){const[i,s]=J.useState(0);J.useEffect(()=>{if(!t)return;const a=setInterval(()=>s(l=>(l+1)%Math.max(1,n.length)),110);return()=>clearInterval(a)},[t,n.length]);const r=t?n[i]:n.find(a=>a.id===e)??n[0];return o.jsxs("div",{className:"bz-dice-wrap",children:[o.jsx("div",{className:`bz-dice${t?" rolling":" done"}`,style:{"--tc":r==null?void 0:r.color},children:(r==null?void 0:r.name)??"—"}),o.jsx("div",{className:"bz-dice-cap",children:t?"кто начинает…":"начинает"})]})}const rc="qp-fx-enabled",Vd=4e3,Hd={classic:470,potter:700};function Wd(){try{const n=localStorage.getItem(rc);return n===null?!0:n==="1"}catch{return!0}}function jd(n){try{localStorage.setItem(rc,n?"1":"0")}catch{}}function Xd(){return typeof location<"u"&&location.href.includes("nofx=1")}function qd({theme:n,trigger:e}){const[t,i]=J.useState(Wd),s=J.useRef(null),r=J.useRef(0),[a,l]=J.useState(null);J.useEffect(()=>{const c=s.current===null;if(s.current=e,c||!t||n==="new_year"||typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||Xd())return;const h=Date.now();h-r.current<Vd||(r.current=h,l(h))},[e]),J.useEffect(()=>{if(a===null)return;const c=(Hd[n]??300)+50,h=setTimeout(()=>l(null),c);return()=>clearTimeout(h)},[a,n]);const d=n==="classic"||n==="potter";return o.jsxs(o.Fragment,{children:[d&&o.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":t,title:t?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>i(c=>{const h=!c;return jd(h),h}),children:"✨"}),a!==null&&n==="classic"&&o.jsx($d,{},a),a!==null&&n==="potter"&&o.jsx(Yd,{},a)]})}function $d(){return o.jsx("div",{className:"fx-flash fx-cyber","aria-hidden":"true"})}function Yd(){const n=Array.from({length:22},(e,t)=>t);return o.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>o.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const bo=["🥇","🥈","🥉"];function Wr({theme:n,place:e}){return n==="classic"?o.jsx(Zd,{place:e}):n==="potter"?o.jsx(Jd,{place:e}):n==="new_year"?o.jsx(Kd,{place:e}):o.jsx("span",{className:"award-emoji",children:bo[e-1]??bo[2]})}function Zd({place:n}){return o.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ah-orbit"}),o.jsx("span",{className:"ah-face",children:o.jsx("b",{children:n})})]})}function Kd({place:n}){return o.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ab-cap"}),o.jsxs("span",{className:"ab-ball",children:[o.jsx("span",{className:"ab-shine"}),o.jsx("b",{children:n})]})]})}function Jd({place:n}){return o.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"am-ribbon"}),o.jsxs("span",{className:"am-disc",children:[o.jsx("span",{className:"am-shine"}),o.jsx("b",{children:n})]})]})}function ei({pack:n,gameState:e}){const t=tc(n,e.round_number,e.phase),i=t.label.replace(" →","").toLowerCase(),s=()=>{var r,a,l;if(t.kind==="scoreboard")return void Jl();if(t.kind==="break")return void Ql();if(t.kind==="finale"){const d=Nd((r=n.settings)==null?void 0:r.info_slides);return d==null?void $s(e.pack_id,((a=n.settings)==null?void 0:a.play_mode)==="paper"):void dd(d)}return void kr(e.round_number+1,Vr((l=n.settings)==null?void 0:l.info_slides,e.round_number+1)??void 0)};return o.jsxs("button",{onClick:s,children:[i.charAt(0).toUpperCase()+i.slice(1)," →"]})}const To="01#$%&/\\<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";function Qd(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function wo(n,e,t=1){const i=Math.max(0,Math.min(1,e));if(i>=1)return n;const s=Qd(t),r=Math.floor(n.length*i);let a="";for(let l=0;l<n.length;l++){const d=n[l];if(l<r||/\s/.test(d)){a+=d;continue}a+=To[Math.floor(s()*To.length)]}return a}const eu=14,tu=50;function ac(n,e){const[t,i]=J.useState(n),s=J.useRef(0);return J.useEffect(()=>{const r=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!e||r){i(n);return}s.current+=1;const a=s.current;let l=0;i(wo(n,0,a));const d=setInterval(()=>{l+=1;const c=l/eu;if(c>=1){i(n),clearInterval(d);return}i(wo(n,c,a))},tu);return()=>clearInterval(d)},[n,e]),t}const Ao=new Map,Us=new Set;function Et(){const n=new Audio;return Us.add(n),n}function oc(){Us.forEach(n=>{try{n.pause(),n.currentTime=0,n.src=""}catch{}}),Us.clear(),document.querySelectorAll("audio, video").forEach(n=>{const e=n;try{e.pause(),e.currentTime=0}catch{}})}async function nu(n){const e=Ao.get(n);if(e)return e;const t=await fetch(n,{mode:"cors",credentials:"omit"});if(!t.ok){const s=await t.text().catch(()=>"");throw/not_found|Object not found/i.test(s)||t.status===404||t.status===400?new Error("ФАЙЛА НЕТ В ХРАНИЛИЩЕ"):new Error(`сервер ответил ${t.status}`)}const i=URL.createObjectURL(await t.blob());return Ao.set(n,i),i}async function lc(n,e){Us.add(n);try{return n.src=e,await n.play(),{ok:!0}}catch(t){if((t instanceof Error?t.name:"")==="NotAllowedError")return{ok:!1,reason:"браузер не разрешил звук — кликните по экрану"}}try{return n.src=await nu(e),await n.play(),{ok:!0}}catch(t){return{ok:!1,reason:t instanceof Error&&/ФАЙЛА НЕТ/.test(t.message)?"файла нет в хранилище — трек нужно загрузить заново в редакторе":t instanceof Error&&/Failed to fetch|NetworkError/i.test(t.message)?"файл не скачивается: запрос блокирует браузер, VPN или расширение":`не удалось воспроизвести: ${t instanceof Error?t.message:"ошибка"}`}}}async function iu(n){const e=[n];try{const t=await fetch(n,{method:"GET",mode:"cors",credentials:"omit"});e.push(`fetch: ${t.status} ${t.statusText}`),e.push(`тип: ${t.headers.get("content-type")??"—"}`),e.push(`размер: ${t.headers.get("content-length")??"—"}`)}catch(t){e.push(`fetch НЕ ПРОШЁЛ: ${t instanceof Error?t.message:"ошибка"}`)}return e.join(`
`)}let Ji=0;function su(n,e,t){const i=++Ji;oc();const s=Et();let r;const a=()=>i!==Ji,l=()=>{r&&clearInterval(r);try{s.pause()}catch{}};return s.addEventListener("playing",()=>{var c,h;if(a()){l();return}(c=t.onStart)==null||c.call(t);let d=e;(h=t.onTick)==null||h.call(t,d),r=setInterval(()=>{var m,f;if(a()){l();return}d-=1,(m=t.onTick)==null||m.call(t,Math.max(0,d)),d<=0&&(l(),(f=t.onEnd)==null||f.call(t))},1e3)},{once:!0}),lc(s,n).then(d=>{var c;if(a()){l();return}d.ok||(l(),(c=t.onError)==null||c.call(t,d.reason))}),{stop:()=>{i===Ji&&Ji++,l()}}}function ru({pack:n,round:e,gameState:t,timerNode:i}){var M,p;const s=e.settings,r=s.startDelaySec??5,a=s.afterTimerSec??5,l=e.questions.filter(u=>!u.hidden),d=e.settings.bg_music??((M=n.settings)==null?void 0:M.bg_music),c=((p=n.settings)==null?void 0:p.play_mode)==="paper";J.useEffect(()=>{if(c||t.timer_started_at||document.hidden)return;const u=setTimeout(()=>{Ls()},r*1e3);return()=>clearTimeout(u)},[t.timer_started_at,c]),J.useEffect(()=>{if(!t.timer_started_at||!d||document.hidden)return;const u=Et();return u.src=We(d),u.loop=!0,u.volume=.6,u.play().catch(()=>{}),()=>u.pause()},[t.timer_started_at,d]),J.useEffect(()=>{if(!t.timer_started_at||document.hidden)return;const T=new Date(t.timer_started_at).getTime()+e.timer_seconds*1e3-Date.now()+a*1e3,R=setTimeout(()=>{ki(0)},Math.max(0,T));return()=>clearTimeout(R)},[t.timer_started_at]);const[h,m]=J.useState(r);J.useEffect(()=>{if(c||t.timer_started_at)return;const u=setInterval(()=>m(T=>Math.max(0,T-1)),1e3);return()=>clearInterval(u)},[t.timer_started_at,c]);const f=l.length%2===1?l[0]:null,g=f?l.slice(1):l,_=Math.ceil(g.length/2);return o.jsxs("div",{className:`sprint-screen${f?" with-hero":""}${l.length>7?" many":""}`,children:[f&&o.jsxs("div",{className:`sprint-hero sprint-card${Ei(f.question_text).trim()?Ei(f.question_text):""}`,children:[o.jsx("span",{className:"sprint-num",children:"1"}),o.jsx("div",{className:"sprint-text",children:f.question_text})]}),o.jsx("div",{className:"host-topbar sprint-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")})}),o.jsx("div",{className:"sprint-col",children:g.slice(0,_).map((u,T)=>o.jsx(Ro,{n:(f?2:1)+T,q:u},u.id))}),o.jsx("div",{className:"sprint-center",children:t.timer_started_at?o.jsx("div",{className:"sprint-timer",children:i}):o.jsxs("div",{className:"sprint-pre",children:[!c&&o.jsx("div",{className:"sprint-pre-num",children:h}),o.jsx("div",{className:"mono-tag",children:"ЧИТАЕМ ВОПРОСЫ"})]})}),o.jsx("div",{className:"sprint-col",children:g.slice(_).map((u,T)=>o.jsx(Ro,{n:(f?2:1)+_+T,q:u},u.id))})]})}function Ro({n,q:e}){const t=(e.media.question??[]).find(i=>!/\.(mp3|mp4|webm|wav)$/i.test(i));return o.jsxs("div",{className:"sprint-card",children:[o.jsx("span",{className:"sprint-num",children:n}),o.jsx("div",{className:"sprint-text",children:e.question_text}),t&&o.jsx("img",{src:We(t),alt:"",className:"sprint-img"})]})}const Fs=100,cc=72,Co=260,au=12.5,ou=9,lu=.9,No=80;function cu(n,e){const t=No+Math.max(0,Math.min(1,n))*(360-No),i=-90+t,s=[];for(let c=0;c<Co;c++){const h=c/(Co-1),m=(i-h*t)*Math.PI/180,f=au*(h<.2?.86+.14*(h/.2):1-.97*Math.pow((h-.2)/.8,1.9)),g=cc+lu*Math.sin(2*Math.PI*(h*ou)+e),_=Fs+g*Math.cos(m),M=Fs+g*Math.sin(m),p=Math.cos(m),u=Math.sin(m);s.push({cx:_,cy:M,nx:p,ny:u,w:f})}const r=s.map(c=>`${(c.cx+c.nx*c.w).toFixed(2)},${(c.cy+c.ny*c.w).toFixed(2)}`),a=s.slice().reverse().map(c=>`${(c.cx-c.nx*c.w).toFixed(2)},${(c.cy-c.ny*c.w).toFixed(2)}`),l=s[0],d=s[8];return{body:`M${r.join("L")}L${a.join("L")}Z`,mid:`M${s.map(c=>`${c.cx.toFixed(2)},${c.cy.toFixed(2)}`).join("L")}`,hx:l.cx,hy:l.cy,rot:Math.atan2(l.cy-d.cy,l.cx-d.cx)*180/Math.PI}}function dc({left:n,seconds:e,low:t}){const i=1-Math.max(0,Math.min(1,n/Math.max(1,e))),[s,r]=J.useState(0),a=J.useRef(0);J.useEffect(()=>{let c=!1;const h=()=>{c||(r(-(Date.now()/700)%(Math.PI*2)),a.current=requestAnimationFrame(h))};return a.current=requestAnimationFrame(h),()=>{c=!0,cancelAnimationFrame(a.current)}},[]);const l=cu(i,s),d=t?"lo":"ok";return o.jsxs("div",{className:`snake-timer${t?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 200 200","aria-hidden":!0,children:[o.jsxs("defs",{children:[o.jsxs("linearGradient",{id:`sn-g-${d}`,x1:"0",y1:"0",x2:".3",y2:"1",children:[o.jsx("stop",{offset:"0",stopColor:t?"#c2593f":"#3ab97c"}),o.jsx("stop",{offset:".45",stopColor:t?"#8d2f22":"#177a4a"}),o.jsx("stop",{offset:"1",stopColor:t?"#521410":"#0b4229"})]}),o.jsx("clipPath",{id:`sn-c-${d}`,children:o.jsx("path",{d:l.body})}),o.jsx("filter",{id:`sn-f-${d}`,x:"-30%",y:"-30%",width:"160%",height:"160%",children:o.jsx("feDropShadow",{dx:"0",dy:"0",stdDeviation:"3",floodColor:t?"#b23a2a":"#0f7a4d",floodOpacity:".55"})})]}),o.jsx("circle",{cx:Fs,cy:Fs,r:cc,fill:"none",stroke:"#d3a62526",strokeWidth:"1.2",strokeDasharray:"2 8"}),o.jsxs("g",{filter:`url(#sn-f-${d})`,children:[o.jsx("path",{d:l.body,fill:`url(#sn-g-${d})`,stroke:"#06301c",strokeWidth:"1.1"}),o.jsxs("g",{clipPath:`url(#sn-c-${d})`,children:[o.jsx("path",{d:l.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"5 10",opacity:".34"}),o.jsx("path",{d:l.mid,fill:"none",stroke:"#8ff0c0",strokeWidth:"3.4",opacity:".22"}),o.jsx("path",{d:l.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"1.6 14",opacity:".34"})]}),o.jsxs("g",{transform:`translate(${l.hx.toFixed(2)},${l.hy.toFixed(2)}) rotate(${l.rot.toFixed(2)})`,children:[o.jsx("path",{d:"M17.5,0 Q15,-6.4 6,-9.6 Q-4,-12.4 -11,-10 L-11,10 Q-4,12.4 6,9.6 Q15,6.4 17.5,0 Z",fill:t?"#a83c2c":"#1f8a55",stroke:"#06301c",strokeWidth:"1.1"}),o.jsx("path",{d:"M17.5,0 Q9,-3 -8,-3.4 L-8,3.4 Q9,3 17.5,0 Z",fill:"#0d4f31",opacity:".55"}),o.jsx("path",{className:"sn-tongue",d:"M17,0 l12,-4.5 M17,0 l12,4.5",stroke:"#e0243a",strokeWidth:"2.1",fill:"none",strokeLinecap:"round"}),o.jsx("ellipse",{cx:"1",cy:"-6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1",cy:"6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1.8",cy:"-6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("ellipse",{cx:"1.8",cy:"6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("circle",{cx:"13",cy:"-2.6",r:".9",fill:"#06301c"}),o.jsx("circle",{cx:"13",cy:"2.6",r:".9",fill:"#06301c"})]})]})]}),o.jsx("span",{className:`snake-num${t?" danger":""}`,children:n})]})}let Os=!1;const jr=new Set;function Po(){Os||(Os=!0,jr.forEach(n=>n(!0)))}async function Do(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n;e.state==="suspended"&&await e.resume();const t=e.state==="running";return e.close(),t}catch{return!1}}function uc(){const[n,e]=J.useState(Os);return J.useEffect(()=>{if(Os)return;jr.add(e);const t=()=>{Do().then(i=>{i&&Po()})};return window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),Do().then(i=>{i&&Po()}),()=>{jr.delete(e),window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t)}},[]),n}function hc(){return uc()?null:o.jsxs("div",{className:"audio-gate",onClick:()=>{},children:[o.jsx("span",{children:"🔇 Звук заблокирован браузером"}),o.jsx("b",{children:"кликните по экрану один раз"})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ka="185",du=0,Lo=1,uu=2,As=1,hu=2,Oi=3,On=0,It=1,xn=2,Sn=0,vi=1,Bs=2,Io=3,Uo=4,fu=5,jn=100,pu=101,mu=102,gu=103,_u=104,xu=200,vu=201,Mu=202,Su=203,Xr=204,qr=205,yu=206,Eu=207,bu=208,Tu=209,wu=210,Au=211,Ru=212,Cu=213,Nu=214,$r=0,Yr=1,Zr=2,bi=3,Kr=4,Jr=5,Qr=6,ea=7,fc=0,Pu=1,Du=2,ln=0,pc=1,mc=2,gc=3,_c=4,xc=5,vc=6,Mc=7,Sc=300,Kn=301,Ti=302,ir=303,sr=304,Zs=306,ta=1e3,vn=1001,na=1002,bt=1003,Lu=1004,Qi=1005,Rt=1006,rr=1007,qn=1008,kt=1009,yc=1010,Ec=1011,Gi=1012,Ga=1013,dn=1014,an=1015,bn=1016,Va=1017,Ha=1018,Vi=1020,bc=35902,Tc=35899,wc=1021,Ac=1022,Zt=1023,Tn=1026,$n=1027,Rc=1028,Wa=1029,Jn=1030,ja=1031,Xa=1033,Rs=33776,Cs=33777,Ns=33778,Ps=33779,ia=35840,sa=35841,ra=35842,aa=35843,oa=36196,la=37492,ca=37496,da=37488,ua=37489,zs=37490,ha=37491,fa=37808,pa=37809,ma=37810,ga=37811,_a=37812,xa=37813,va=37814,Ma=37815,Sa=37816,ya=37817,Ea=37818,ba=37819,Ta=37820,wa=37821,Aa=36492,Ra=36494,Ca=36495,Na=36283,Pa=36284,ks=36285,Da=36286,Iu=3200,Fo=0,Uu=1,Un="",Ht="srgb",Gs="srgb-linear",Vs="linear",tt="srgb",si=7680,Oo=519,Fu=512,Ou=513,Bu=514,qa=515,zu=516,ku=517,$a=518,Gu=519,Bo=35044,zo="300 es",on=2e3,Hi=2001;function Vu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Hu(){const n=Hs("canvas");return n.style.display="block",n}const ko={};function Go(...n){const e="THREE."+n.shift();console.log(e,...n)}function Cc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ue(...n){n=Cc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ke(...n){n=Cc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Mi(...n){const e=n.join(" ");e in ko||(ko[e]=!0,Ue(...n))}function Wu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const ju={[$r]:Yr,[Zr]:Qr,[Kr]:ea,[bi]:Jr,[Yr]:$r,[Qr]:Zr,[ea]:Kr,[Jr]:bi};class ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ar=Math.PI/180,La=180/Math.PI;function ji(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function qe(n,e,t){return Math.max(e,Math.min(t,n))}function Xu(n,e){return(n%e+e)%e}function or(n,e,t){return(1-t)*n+t*e}function Ni(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Dt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ja=class Ja{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ja.prototype.isVector2=!0;let Je=Ja;class Ri{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,l){let d=i[s+0],c=i[s+1],h=i[s+2],m=i[s+3],f=r[a+0],g=r[a+1],_=r[a+2],M=r[a+3];if(m!==M||d!==f||c!==g||h!==_){let p=d*f+c*g+h*_+m*M;p<0&&(f=-f,g=-g,_=-_,M=-M,p=-p);let u=1-l;if(p<.9995){const T=Math.acos(p),R=Math.sin(T);u=Math.sin(u*T)/R,l=Math.sin(l*T)/R,d=d*u+f*l,c=c*u+g*l,h=h*u+_*l,m=m*u+M*l}else{d=d*u+f*l,c=c*u+g*l,h=h*u+_*l,m=m*u+M*l;const T=1/Math.sqrt(d*d+c*c+h*h+m*m);d*=T,c*=T,h*=T,m*=T}}e[t]=d,e[t+1]=c,e[t+2]=h,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,s,r,a){const l=i[s],d=i[s+1],c=i[s+2],h=i[s+3],m=r[a],f=r[a+1],g=r[a+2],_=r[a+3];return e[t]=l*_+h*m+d*g-c*f,e[t+1]=d*_+h*f+c*m-l*g,e[t+2]=c*_+h*g+l*f-d*m,e[t+3]=h*_-l*m-d*f-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,l=Math.cos,d=Math.sin,c=l(i/2),h=l(s/2),m=l(r/2),f=d(i/2),g=d(s/2),_=d(r/2);switch(a){case"XYZ":this._x=f*h*m+c*g*_,this._y=c*g*m-f*h*_,this._z=c*h*_+f*g*m,this._w=c*h*m-f*g*_;break;case"YXZ":this._x=f*h*m+c*g*_,this._y=c*g*m-f*h*_,this._z=c*h*_-f*g*m,this._w=c*h*m+f*g*_;break;case"ZXY":this._x=f*h*m-c*g*_,this._y=c*g*m+f*h*_,this._z=c*h*_+f*g*m,this._w=c*h*m-f*g*_;break;case"ZYX":this._x=f*h*m-c*g*_,this._y=c*g*m+f*h*_,this._z=c*h*_-f*g*m,this._w=c*h*m+f*g*_;break;case"YZX":this._x=f*h*m+c*g*_,this._y=c*g*m+f*h*_,this._z=c*h*_-f*g*m,this._w=c*h*m-f*g*_;break;case"XZY":this._x=f*h*m-c*g*_,this._y=c*g*m-f*h*_,this._z=c*h*_+f*g*m,this._w=c*h*m+f*g*_;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],l=t[5],d=t[9],c=t[2],h=t[6],m=t[10],f=i+l+m;if(f>0){const g=.5/Math.sqrt(f+1);this._w=.25/g,this._x=(h-d)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(i>l&&i>m){const g=2*Math.sqrt(1+i-l-m);this._w=(h-d)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(l>m){const g=2*Math.sqrt(1+l-i-m);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(d+h)/g}else{const g=2*Math.sqrt(1+m-i-l);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(d+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,l=t._x,d=t._y,c=t._z,h=t._w;return this._x=i*h+a*l+s*c-r*d,this._y=s*h+a*d+r*l-i*c,this._z=r*h+a*c+i*d-s*l,this._w=a*h-i*l-s*d-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,l=this.dot(e);l<0&&(i=-i,s=-s,r=-r,a=-a,l=-l);let d=1-t;if(l<.9995){const c=Math.acos(l),h=Math.sin(c);d=Math.sin(d*c)/h,t=Math.sin(t*c)/h,this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this._onChangeCallback()}else this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Qa=class Qa{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,l=e.z,d=e.w,c=2*(a*s-l*i),h=2*(l*t-r*s),m=2*(r*i-a*t);return this.x=t+d*c+a*m-l*h,this.y=i+d*h+l*c-r*m,this.z=s+d*m+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,l=t.y,d=t.z;return this.x=s*d-r*l,this.y=r*a-i*d,this.z=i*l-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return lr.copy(this).projectOnVector(e),this.sub(lr)}reflect(e){return this.sub(lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qa.prototype.isVector3=!0;let q=Qa;const lr=new q,Vo=new Ri,eo=class eo{constructor(e,t,i,s,r,a,l,d,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,l,d,c)}set(e,t,i,s,r,a,l,d,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=l,h[3]=t,h[4]=r,h[5]=d,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],l=i[3],d=i[6],c=i[1],h=i[4],m=i[7],f=i[2],g=i[5],_=i[8],M=s[0],p=s[3],u=s[6],T=s[1],R=s[4],y=s[7],w=s[2],S=s[5],A=s[8];return r[0]=a*M+l*T+d*w,r[3]=a*p+l*R+d*S,r[6]=a*u+l*y+d*A,r[1]=c*M+h*T+m*w,r[4]=c*p+h*R+m*S,r[7]=c*u+h*y+m*A,r[2]=f*M+g*T+_*w,r[5]=f*p+g*R+_*S,r[8]=f*u+g*y+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],d=e[6],c=e[7],h=e[8];return t*a*h-t*l*c-i*r*h+i*l*d+s*r*c-s*a*d}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],d=e[6],c=e[7],h=e[8],m=h*a-l*c,f=l*d-h*r,g=c*r-a*d,_=t*m+i*f+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=m*M,e[1]=(s*c-h*i)*M,e[2]=(l*i-s*a)*M,e[3]=f*M,e[4]=(h*t-s*d)*M,e[5]=(s*r-l*t)*M,e[6]=g*M,e[7]=(i*d-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,l){const d=Math.cos(r),c=Math.sin(r);return this.set(i*d,i*c,-i*(d*a+c*l)+a+e,-s*c,s*d,-s*(-c*a+d*l)+l+t,0,0,1),this}scale(e,t){return Mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(cr.makeScale(e,t)),this}rotate(e){return Mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(cr.makeRotation(-e)),this}translate(e,t){return Mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};eo.prototype.isMatrix3=!0;let Fe=eo;const cr=new Fe,Ho=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wo=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qu(){const n={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=yn(s.r),s.g=yn(s.g),s.b=yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?Vs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Gs]:{primaries:e,whitePoint:i,transfer:Vs,toXYZ:Ho,fromXYZ:Wo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:Ho,fromXYZ:Wo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),n}const Xe=qu();function yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Si(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ri;class $u{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ri===void 0&&(ri=Hs("canvas")),ri.width=e.width,ri.height=e.height;const s=ri.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ri}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yn(t[i]/255)*255):t[i]=yn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yu=0;class Ya{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?r.push(dr(s[a].image)):r.push(dr(s[a]))}else r=dr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function dr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?$u.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Zu=0;const ur=new q;class Ct extends ti{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,i=vn,s=vn,r=Rt,a=qn,l=Zt,d=kt,c=Ct.DEFAULT_ANISOTROPY,h=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=ji(),this.name="",this.source=new Ya(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=d,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ur).x}get height(){return this.source.getSize(ur).y}get depth(){return this.source.getSize(ur).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ta:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ta:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Sc;Ct.DEFAULT_ANISOTROPY=1;const to=class to{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const d=e.elements,c=d[0],h=d[4],m=d[8],f=d[1],g=d[5],_=d[9],M=d[2],p=d[6],u=d[10];if(Math.abs(h-f)<.01&&Math.abs(m-M)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(m+M)<.1&&Math.abs(_+p)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,y=(g+1)/2,w=(u+1)/2,S=(h+f)/4,A=(m+M)/4,v=(_+p)/4;return R>y&&R>w?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=S/i,r=A/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=S/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=A/r,s=v/r),this.set(i,s,r,t),this}let T=Math.sqrt((p-_)*(p-_)+(m-M)*(m-M)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(p-_)/T,this.y=(m-M)/T,this.z=(f-h)/T,this.w=Math.acos((c+g+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};to.prototype.isVector4=!0;let lt=to;class Ku extends ti{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Ct(s),a=i.count;for(let l=0;l<a;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ya(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Ku{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Nc extends Ct{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ju extends Ct{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qs=class qs{constructor(e,t,i,s,r,a,l,d,c,h,m,f,g,_,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,l,d,c,h,m,f,g,_,M,p)}set(e,t,i,s,r,a,l,d,c,h,m,f,g,_,M,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=a,u[9]=l,u[13]=d,u[2]=c,u[6]=h,u[10]=m,u[14]=f,u[3]=g,u[7]=_,u[11]=M,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ai.setFromMatrixColumn(e,0).length(),r=1/ai.setFromMatrixColumn(e,1).length(),a=1/ai.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),l=Math.sin(i),d=Math.cos(s),c=Math.sin(s),h=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const f=a*h,g=a*m,_=l*h,M=l*m;t[0]=d*h,t[4]=-d*m,t[8]=c,t[1]=g+_*c,t[5]=f-M*c,t[9]=-l*d,t[2]=M-f*c,t[6]=_+g*c,t[10]=a*d}else if(e.order==="YXZ"){const f=d*h,g=d*m,_=c*h,M=c*m;t[0]=f+M*l,t[4]=_*l-g,t[8]=a*c,t[1]=a*m,t[5]=a*h,t[9]=-l,t[2]=g*l-_,t[6]=M+f*l,t[10]=a*d}else if(e.order==="ZXY"){const f=d*h,g=d*m,_=c*h,M=c*m;t[0]=f-M*l,t[4]=-a*m,t[8]=_+g*l,t[1]=g+_*l,t[5]=a*h,t[9]=M-f*l,t[2]=-a*c,t[6]=l,t[10]=a*d}else if(e.order==="ZYX"){const f=a*h,g=a*m,_=l*h,M=l*m;t[0]=d*h,t[4]=_*c-g,t[8]=f*c+M,t[1]=d*m,t[5]=M*c+f,t[9]=g*c-_,t[2]=-c,t[6]=l*d,t[10]=a*d}else if(e.order==="YZX"){const f=a*d,g=a*c,_=l*d,M=l*c;t[0]=d*h,t[4]=M-f*m,t[8]=_*m+g,t[1]=m,t[5]=a*h,t[9]=-l*h,t[2]=-c*h,t[6]=g*m+_,t[10]=f-M*m}else if(e.order==="XZY"){const f=a*d,g=a*c,_=l*d,M=l*c;t[0]=d*h,t[4]=-m,t[8]=c*h,t[1]=f*m+M,t[5]=a*h,t[9]=g*m-_,t[2]=_*m-g,t[6]=l*h,t[10]=M*m+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qu,e,eh)}lookAt(e,t,i){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Cn.crossVectors(i,Ot),Cn.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Cn.crossVectors(i,Ot)),Cn.normalize(),es.crossVectors(Ot,Cn),s[0]=Cn.x,s[4]=es.x,s[8]=Ot.x,s[1]=Cn.y,s[5]=es.y,s[9]=Ot.y,s[2]=Cn.z,s[6]=es.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],l=i[4],d=i[8],c=i[12],h=i[1],m=i[5],f=i[9],g=i[13],_=i[2],M=i[6],p=i[10],u=i[14],T=i[3],R=i[7],y=i[11],w=i[15],S=s[0],A=s[4],v=s[8],C=s[12],I=s[1],P=s[5],D=s[9],K=s[13],H=s[2],k=s[6],$=s[10],U=s[14],W=s[3],se=s[7],ce=s[11],me=s[15];return r[0]=a*S+l*I+d*H+c*W,r[4]=a*A+l*P+d*k+c*se,r[8]=a*v+l*D+d*$+c*ce,r[12]=a*C+l*K+d*U+c*me,r[1]=h*S+m*I+f*H+g*W,r[5]=h*A+m*P+f*k+g*se,r[9]=h*v+m*D+f*$+g*ce,r[13]=h*C+m*K+f*U+g*me,r[2]=_*S+M*I+p*H+u*W,r[6]=_*A+M*P+p*k+u*se,r[10]=_*v+M*D+p*$+u*ce,r[14]=_*C+M*K+p*U+u*me,r[3]=T*S+R*I+y*H+w*W,r[7]=T*A+R*P+y*k+w*se,r[11]=T*v+R*D+y*$+w*ce,r[15]=T*C+R*K+y*U+w*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],l=e[5],d=e[9],c=e[13],h=e[2],m=e[6],f=e[10],g=e[14],_=e[3],M=e[7],p=e[11],u=e[15],T=d*g-c*f,R=l*g-c*m,y=l*f-d*m,w=a*g-c*h,S=a*f-d*h,A=a*m-l*h;return t*(M*T-p*R+u*y)-i*(_*T-p*w+u*S)+s*(_*R-M*w+u*A)-r*(_*y-M*S+p*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],l=e[9],d=e[2],c=e[6],h=e[10];return t*(a*h-l*c)-i*(r*h-l*d)+s*(r*c-a*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],l=e[5],d=e[6],c=e[7],h=e[8],m=e[9],f=e[10],g=e[11],_=e[12],M=e[13],p=e[14],u=e[15],T=t*l-i*a,R=t*d-s*a,y=t*c-r*a,w=i*d-s*l,S=i*c-r*l,A=s*c-r*d,v=h*M-m*_,C=h*p-f*_,I=h*u-g*_,P=m*p-f*M,D=m*u-g*M,K=f*u-g*p,H=T*K-R*D+y*P+w*I-S*C+A*v;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/H;return e[0]=(l*K-d*D+c*P)*k,e[1]=(s*D-i*K-r*P)*k,e[2]=(M*A-p*S+u*w)*k,e[3]=(f*S-m*A-g*w)*k,e[4]=(d*I-a*K-c*C)*k,e[5]=(t*K-s*I+r*C)*k,e[6]=(p*y-_*A-u*R)*k,e[7]=(h*A-f*y+g*R)*k,e[8]=(a*D-l*I+c*v)*k,e[9]=(i*I-t*D-r*v)*k,e[10]=(_*S-M*y+u*T)*k,e[11]=(m*y-h*S-g*T)*k,e[12]=(l*C-a*P-d*v)*k,e[13]=(t*P-i*C+s*v)*k,e[14]=(M*R-_*w-p*T)*k,e[15]=(h*w-m*R+f*T)*k,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,l=e.y,d=e.z,c=r*a,h=r*l;return this.set(c*a+i,c*l-s*d,c*d+s*l,0,c*l+s*d,h*l+i,h*d-s*a,0,c*d-s*l,h*d+s*a,r*d*d+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,l=t._z,d=t._w,c=r+r,h=a+a,m=l+l,f=r*c,g=r*h,_=r*m,M=a*h,p=a*m,u=l*m,T=d*c,R=d*h,y=d*m,w=i.x,S=i.y,A=i.z;return s[0]=(1-(M+u))*w,s[1]=(g+y)*w,s[2]=(_-R)*w,s[3]=0,s[4]=(g-y)*S,s[5]=(1-(f+u))*S,s[6]=(p+T)*S,s[7]=0,s[8]=(_+R)*A,s[9]=(p-T)*A,s[10]=(1-(f+M))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ai.set(s[0],s[1],s[2]).length();const l=ai.set(s[4],s[5],s[6]).length(),d=ai.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Xt.copy(this);const c=1/a,h=1/l,m=1/d;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=h,Xt.elements[5]*=h,Xt.elements[6]*=h,Xt.elements[8]*=m,Xt.elements[9]*=m,Xt.elements[10]*=m,t.setFromRotationMatrix(Xt),i.x=a,i.y=l,i.z=d,this}makePerspective(e,t,i,s,r,a,l=on,d=!1){const c=this.elements,h=2*r/(t-e),m=2*r/(i-s),f=(t+e)/(t-e),g=(i+s)/(i-s);let _,M;if(d)_=r/(a-r),M=a*r/(a-r);else if(l===on)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(l===Hi)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=m,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,l=on,d=!1){const c=this.elements,h=2/(t-e),m=2/(i-s),f=-(t+e)/(t-e),g=-(i+s)/(i-s);let _,M;if(d)_=1/(a-r),M=a/(a-r);else if(l===on)_=-2/(a-r),M=-(a+r)/(a-r);else if(l===Hi)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=m,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};qs.prototype.isMatrix4=!0;let ct=qs;const ai=new q,Xt=new ct,Qu=new q(0,0,0),eh=new q(1,1,1),Cn=new q,es=new q,Ot=new q,jo=new ct,Xo=new Ri;class Qn{constructor(e=0,t=0,i=0,s=Qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],l=s[8],d=s[1],c=s[5],h=s[9],m=s[2],f=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(d,c)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-qe(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(f,g),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return jo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xo.setFromEuler(this),this.setFromQuaternion(Xo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qn.DEFAULT_ORDER="XYZ";class Pc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let th=0;const qo=new q,oi=new Ri,fn=new ct,ts=new q,Pi=new q,nh=new q,ih=new Ri,$o=new q(1,0,0),Yo=new q(0,1,0),Zo=new q(0,0,1),Ko={type:"added"},sh={type:"removed"},li={type:"childadded",child:null},hr={type:"childremoved",child:null};class Pt extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new q,t=new Qn,i=new Ri,s=new q(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new Fe}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis($o,e)}rotateY(e){return this.rotateOnAxis(Yo,e)}rotateZ(e){return this.rotateOnAxis(Zo,e)}translateOnAxis(e,t){return qo.copy(e).applyQuaternion(this.quaternion),this.position.add(qo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($o,e)}translateY(e){return this.translateOnAxis(Yo,e)}translateZ(e){return this.translateOnAxis(Zo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ts.copy(e):ts.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Pi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Pi,ts,this.up):fn.lookAt(ts,Pi,this.up),this.quaternion.setFromRotationMatrix(fn),s&&(fn.extractRotation(s.matrixWorld),oi.setFromRotationMatrix(fn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ko),li.child=e,this.dispatchEvent(li),li.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sh),hr.child=e,this.dispatchEvent(hr),hr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ko),li.child=e,this.dispatchEvent(li),li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,e,nh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,d){return l[d.uuid]===void 0&&(l[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const d=l.shapes;if(Array.isArray(d))for(let c=0,h=d.length;c<h;c++){const m=d[c];r(e.shapes,m)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let d=0,c=this.material.length;d<c;d++)l.push(r(e.materials,this.material[d]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const d=this.animations[l];s.animations.push(r(e.animations,d))}}if(t){const l=a(e.geometries),d=a(e.materials),c=a(e.textures),h=a(e.images),m=a(e.shapes),f=a(e.skeletons),g=a(e.animations),_=a(e.nodes);l.length>0&&(i.geometries=l),d.length>0&&(i.materials=d),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),f.length>0&&(i.skeletons=f),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(l){const d=[];for(const c in l){const h=l[c];delete h.metadata,d.push(h)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new q(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ns extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rh={type:"move"};class fr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ns,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ns,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ns,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const l=this._targetRay,d=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,i),u=this._getHandJoint(c,M);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],f=h.position.distanceTo(m.position),g=.02,_=.005;c.inputState.pinching&&f>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(rh)))}return l!==null&&(l.visible=s!==null),d!==null&&(d.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ns;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},is={h:0,s:0,l:0};function pr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Xe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Xe.workingColorSpace){if(e=Xu(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=pr(a,r,e+1/3),this.g=pr(a,r,e),this.b=pr(a,r,e-1/3)}return Xe.colorSpaceToWorking(this,s),this}setStyle(e,t=Ht){function i(r){r!==void 0&&parseFloat(r)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const i=Dc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return Xe.workingToColorSpace(At.copy(this),e),Math.round(qe(At.r*255,0,255))*65536+Math.round(qe(At.g*255,0,255))*256+Math.round(qe(At.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(At.copy(this),t);const i=At.r,s=At.g,r=At.b,a=Math.max(i,s,r),l=Math.min(i,s,r);let d,c;const h=(l+a)/2;if(l===a)d=0,c=0;else{const m=a-l;switch(c=h<=.5?m/(a+l):m/(2-a-l),a){case i:d=(s-r)/m+(s<r?6:0);break;case s:d=(r-i)/m+2;break;case r:d=(i-s)/m+4;break}d/=6}return e.h=d,e.s=c,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Ht){Xe.workingToColorSpace(At.copy(this),e);const t=At.r,i=At.g,s=At.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(is);const i=or(Nn.h,is.h,t),s=or(Nn.s,is.s,t),r=or(Nn.l,is.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new $e;$e.NAMES=Dc;class Za{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new $e(e),this.density=t}clone(){return new Za(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ah extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const qt=new q,pn=new q,mr=new q,mn=new q,ci=new q,di=new q,Jo=new q,gr=new q,_r=new q,xr=new q,vr=new lt,Mr=new lt,Sr=new lt;class Yt{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),qt.subVectors(e,t),s.cross(qt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){qt.subVectors(s,t),pn.subVectors(i,t),mr.subVectors(e,t);const a=qt.dot(qt),l=qt.dot(pn),d=qt.dot(mr),c=pn.dot(pn),h=pn.dot(mr),m=a*c-l*l;if(m===0)return r.set(0,0,0),null;const f=1/m,g=(c*d-l*h)*f,_=(a*h-l*d)*f;return r.set(1-g-_,_,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,i,s,r,a,l,d){return this.getBarycoord(e,t,i,s,mn)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,mn.x),d.addScaledVector(a,mn.y),d.addScaledVector(l,mn.z),d)}static getInterpolatedAttribute(e,t,i,s,r,a){return vr.setScalar(0),Mr.setScalar(0),Sr.setScalar(0),vr.fromBufferAttribute(e,t),Mr.fromBufferAttribute(e,i),Sr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(vr,r.x),a.addScaledVector(Mr,r.y),a.addScaledVector(Sr,r.z),a}static isFrontFacing(e,t,i,s){return qt.subVectors(i,t),pn.subVectors(e,t),qt.cross(pn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),qt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,l;ci.subVectors(s,i),di.subVectors(r,i),gr.subVectors(e,i);const d=ci.dot(gr),c=di.dot(gr);if(d<=0&&c<=0)return t.copy(i);_r.subVectors(e,s);const h=ci.dot(_r),m=di.dot(_r);if(h>=0&&m<=h)return t.copy(s);const f=d*m-h*c;if(f<=0&&d>=0&&h<=0)return a=d/(d-h),t.copy(i).addScaledVector(ci,a);xr.subVectors(e,r);const g=ci.dot(xr),_=di.dot(xr);if(_>=0&&g<=_)return t.copy(r);const M=g*c-d*_;if(M<=0&&c>=0&&_<=0)return l=c/(c-_),t.copy(i).addScaledVector(di,l);const p=h*_-g*m;if(p<=0&&m-h>=0&&g-_>=0)return Jo.subVectors(r,s),l=(m-h)/(m-h+(g-_)),t.copy(s).addScaledVector(Jo,l);const u=1/(p+M+f);return a=M*u,l=f*u,t.copy(i).addScaledVector(ci,a).addScaledVector(di,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Xi{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint($t.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint($t.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=$t.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=r.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,$t):$t.fromBufferAttribute(r,a),$t.applyMatrix4(e.matrixWorld),this.expandByPoint($t);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ss.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ss.copy(i.boundingBox)),ss.applyMatrix4(e.matrixWorld),this.union(ss)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$t),$t.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Di),rs.subVectors(this.max,Di),ui.subVectors(e.a,Di),hi.subVectors(e.b,Di),fi.subVectors(e.c,Di),Pn.subVectors(hi,ui),Dn.subVectors(fi,hi),kn.subVectors(ui,fi);let t=[0,-Pn.z,Pn.y,0,-Dn.z,Dn.y,0,-kn.z,kn.y,Pn.z,0,-Pn.x,Dn.z,0,-Dn.x,kn.z,0,-kn.x,-Pn.y,Pn.x,0,-Dn.y,Dn.x,0,-kn.y,kn.x,0];return!yr(t,ui,hi,fi,rs)||(t=[1,0,0,0,1,0,0,0,1],!yr(t,ui,hi,fi,rs))?!1:(as.crossVectors(Pn,Dn),t=[as.x,as.y,as.z],yr(t,ui,hi,fi,rs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$t).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($t).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gn=[new q,new q,new q,new q,new q,new q,new q,new q],$t=new q,ss=new Xi,ui=new q,hi=new q,fi=new q,Pn=new q,Dn=new q,kn=new q,Di=new q,rs=new q,as=new q,Gn=new q;function yr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Gn.fromArray(n,r);const l=s.x*Math.abs(Gn.x)+s.y*Math.abs(Gn.y)+s.z*Math.abs(Gn.z),d=e.dot(Gn),c=t.dot(Gn),h=i.dot(Gn);if(Math.max(-Math.max(d,c,h),Math.min(d,c,h))>l)return!1}return!0}const xt=new q,os=new Je;let oh=0;class Wt extends ti{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:oh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Bo,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)os.fromBufferAttribute(this,t),os.applyMatrix3(e),this.setXY(t,os.x,os.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ni(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Dt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),s=Dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),s=Dt(s,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Lc extends Wt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ic extends Wt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class En extends Wt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const lh=new Xi,Li=new q,Er=new q;class Ks{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):lh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Li.subVectors(e,this.center);const t=Li.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Li,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Er.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Li.copy(e.center).add(Er)),this.expandByPoint(Li.copy(e.center).sub(Er))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ch=0;const Vt=new ct,br=new Pt,pi=new q,Bt=new Xi,Ii=new Xi,yt=new q;class Kt extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vu(e)?Ic:Lc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Fe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,i){return Vt.makeTranslation(e,t,i),this.applyMatrix4(Vt),this}scale(e,t,i){return Vt.makeScale(e,t,i),this.applyMatrix4(Vt),this}lookAt(e){return br.lookAt(e),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new En(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Bt.setFromBufferAttribute(r),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Ii.setFromBufferAttribute(l),this.morphTargetsRelative?(yt.addVectors(Bt.min,Ii.min),Bt.expandByPoint(yt),yt.addVectors(Bt.max,Ii.max),Bt.expandByPoint(yt)):(Bt.expandByPoint(Ii.min),Bt.expandByPoint(Ii.max))}Bt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)yt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(yt));if(t)for(let r=0,a=t.length;r<a;r++){const l=t[r],d=this.morphTargetsRelative;for(let c=0,h=l.count;c<h;c++)yt.fromBufferAttribute(l,c),d&&(pi.fromBufferAttribute(e,c),yt.add(pi)),s=Math.max(s,i.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Wt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const l=[],d=[];for(let v=0;v<i.count;v++)l[v]=new q,d[v]=new q;const c=new q,h=new q,m=new q,f=new Je,g=new Je,_=new Je,M=new q,p=new q;function u(v,C,I){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,C),m.fromBufferAttribute(i,I),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,C),_.fromBufferAttribute(r,I),h.sub(c),m.sub(c),g.sub(f),_.sub(f);const P=1/(g.x*_.y-_.x*g.y);isFinite(P)&&(M.copy(h).multiplyScalar(_.y).addScaledVector(m,-g.y).multiplyScalar(P),p.copy(m).multiplyScalar(g.x).addScaledVector(h,-_.x).multiplyScalar(P),l[v].add(M),l[C].add(M),l[I].add(M),d[v].add(p),d[C].add(p),d[I].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let v=0,C=T.length;v<C;++v){const I=T[v],P=I.start,D=I.count;for(let K=P,H=P+D;K<H;K+=3)u(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const R=new q,y=new q,w=new q,S=new q;function A(v){w.fromBufferAttribute(s,v),S.copy(w);const C=l[v];R.copy(C),R.sub(w.multiplyScalar(w.dot(C))).normalize(),y.crossVectors(S,C);const P=y.dot(d[v])<0?-1:1;a.setXYZW(v,R.x,R.y,R.z,P)}for(let v=0,C=T.length;v<C;++v){const I=T[v],P=I.start,D=I.count;for(let K=P,H=P+D;K<H;K+=3)A(e.getX(K+0)),A(e.getX(K+1)),A(e.getX(K+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,g=i.count;f<g;f++)i.setXYZ(f,0,0,0);const s=new q,r=new q,a=new q,l=new q,d=new q,c=new q,h=new q,m=new q;if(e)for(let f=0,g=e.count;f<g;f+=3){const _=e.getX(f+0),M=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,p),h.subVectors(a,r),m.subVectors(s,r),h.cross(m),l.fromBufferAttribute(i,_),d.fromBufferAttribute(i,M),c.fromBufferAttribute(i,p),l.add(h),d.add(h),c.add(h),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(M,d.x,d.y,d.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,g=t.count;f<g;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),m.subVectors(s,r),h.cross(m),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(l,d){const c=l.array,h=l.itemSize,m=l.normalized,f=new c.constructor(d.length*h);let g=0,_=0;for(let M=0,p=d.length;M<p;M++){l.isInterleavedBufferAttribute?g=d[M]*l.data.stride+l.offset:g=d[M]*h;for(let u=0;u<h;u++)f[_++]=c[g++]}return new Wt(f,h,m)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,i=this.index.array,s=this.attributes;for(const l in s){const d=s[l],c=e(d,i);t.setAttribute(l,c)}const r=this.morphAttributes;for(const l in r){const d=[],c=r[l];for(let h=0,m=c.length;h<m;h++){const f=c[h],g=e(f,i);d.push(g)}t.morphAttributes[l]=d}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,d=a.length;l<d;l++){const c=a[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const c in d)d[c]!==void 0&&(e[c]=d[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const d in i){const c=i[d];e.data.attributes[d]=c.toJSON(e.data)}const s={};let r=!1;for(const d in this.morphAttributes){const c=this.morphAttributes[d],h=[];for(let m=0,f=c.length;m<f;m++){const g=c[m];h.push(g.toJSON(e.data))}h.length>0&&(s[d]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],m=r[c];for(let f=0,g=m.length;f<g;f++)h.push(m[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const m=a[c];this.addGroup(m.start,m.count,m.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let dh=0;class qi extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=vi,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xr,this.blendDst=qr,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=bi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=si,this.stencilZFail=si,this.stencilZPass=si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==vi&&(i.blending=this.blending),this.side!==On&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xr&&(i.blendSrc=this.blendSrc),this.blendDst!==qr&&(i.blendDst=this.blendDst),this.blendEquation!==jn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==bi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==si&&(i.stencilFail=this.stencilFail),this.stencilZFail!==si&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==si&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const l in r){const d=r[l];delete d.metadata,a.push(d)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Je().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Je().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const _n=new q,Tr=new q,ls=new q,Ln=new q,wr=new q,cs=new q,Ar=new q;class Uc{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Tr.copy(e).add(t).multiplyScalar(.5),ls.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Tr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ls),l=Ln.dot(this.direction),d=-Ln.dot(ls),c=Ln.lengthSq(),h=Math.abs(1-a*a);let m,f,g,_;if(h>0)if(m=a*d-l,f=a*l-d,_=r*h,m>=0)if(f>=-_)if(f<=_){const M=1/h;m*=M,f*=M,g=m*(m+a*f+2*l)+f*(a*m+f+2*d)+c}else f=r,m=Math.max(0,-(a*f+l)),g=-m*m+f*(f+2*d)+c;else f=-r,m=Math.max(0,-(a*f+l)),g=-m*m+f*(f+2*d)+c;else f<=-_?(m=Math.max(0,-(-a*r+l)),f=m>0?-r:Math.min(Math.max(-r,-d),r),g=-m*m+f*(f+2*d)+c):f<=_?(m=0,f=Math.min(Math.max(-r,-d),r),g=f*(f+2*d)+c):(m=Math.max(0,-(a*r+l)),f=m>0?r:Math.min(Math.max(-r,-d),r),g=-m*m+f*(f+2*d)+c);else f=a>0?-r:r,m=Math.max(0,-(a*f+l)),g=-m*m+f*(f+2*d)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Tr).addScaledVector(ls,f),g}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const i=_n.dot(this.direction),s=_n.dot(_n)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),l=i-a,d=i+a;return d<0?null:l<0?this.at(d,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,l,d;const c=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),m>=0?(l=(e.min.z-f.z)*m,d=(e.max.z-f.z)*m):(l=(e.max.z-f.z)*m,d=(e.min.z-f.z)*m),i>d||l>s)||((l>i||i!==i)&&(i=l),(d<s||s!==s)&&(s=d),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,i,s,r){wr.subVectors(t,e),cs.subVectors(i,e),Ar.crossVectors(wr,cs);let a=this.direction.dot(Ar),l;if(a>0){if(s)return null;l=1}else if(a<0)l=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const d=l*this.direction.dot(cs.crossVectors(Ln,cs));if(d<0)return null;const c=l*this.direction.dot(wr.cross(Ln));if(c<0||d+c>a)return null;const h=-l*Ln.dot(Ar);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zi extends qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qo=new ct,Vn=new Uc,ds=new Ks,el=new q,us=new q,hs=new q,fs=new q,Rr=new q,ps=new q,tl=new q,ms=new q;class jt extends Pt{constructor(e=new Kt,t=new zi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(r&&l){ps.set(0,0,0);for(let d=0,c=r.length;d<c;d++){const h=l[d],m=r[d];h!==0&&(Rr.fromBufferAttribute(m,e),a?ps.addScaledVector(Rr,h):ps.addScaledVector(Rr.sub(t),h))}t.add(ps)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ds.copy(i.boundingSphere),ds.applyMatrix4(r),Vn.copy(e.ray).recast(e.near),!(ds.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(ds,el)===null||Vn.origin.distanceToSquared(el)>(e.far-e.near)**2))&&(Qo.copy(r).invert(),Vn.copy(e.ray).applyMatrix4(Qo),!(i.boundingBox!==null&&Vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,l=r.index,d=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,m=r.attributes.normal,f=r.groups,g=r.drawRange;if(l!==null)if(Array.isArray(a))for(let _=0,M=f.length;_<M;_++){const p=f[_],u=a[p.materialIndex],T=Math.max(p.start,g.start),R=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let y=T,w=R;y<w;y+=3){const S=l.getX(y),A=l.getX(y+1),v=l.getX(y+2);s=gs(this,u,e,i,c,h,m,S,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),M=Math.min(l.count,g.start+g.count);for(let p=_,u=M;p<u;p+=3){const T=l.getX(p),R=l.getX(p+1),y=l.getX(p+2);s=gs(this,a,e,i,c,h,m,T,R,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(a))for(let _=0,M=f.length;_<M;_++){const p=f[_],u=a[p.materialIndex],T=Math.max(p.start,g.start),R=Math.min(d.count,Math.min(p.start+p.count,g.start+g.count));for(let y=T,w=R;y<w;y+=3){const S=y,A=y+1,v=y+2;s=gs(this,u,e,i,c,h,m,S,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),M=Math.min(d.count,g.start+g.count);for(let p=_,u=M;p<u;p+=3){const T=p,R=p+1,y=p+2;s=gs(this,a,e,i,c,h,m,T,R,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function uh(n,e,t,i,s,r,a,l){let d;if(e.side===It?d=i.intersectTriangle(a,r,s,!0,l):d=i.intersectTriangle(s,r,a,e.side===On,l),d===null)return null;ms.copy(l),ms.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ms);return c<t.near||c>t.far?null:{distance:c,point:ms.clone(),object:n}}function gs(n,e,t,i,s,r,a,l,d,c){n.getVertexPosition(l,us),n.getVertexPosition(d,hs),n.getVertexPosition(c,fs);const h=uh(n,e,t,i,us,hs,fs,tl);if(h){const m=new q;Yt.getBarycoord(tl,us,hs,fs,m),s&&(h.uv=Yt.getInterpolatedAttribute(s,l,d,c,m,new Je)),r&&(h.uv1=Yt.getInterpolatedAttribute(r,l,d,c,m,new Je)),a&&(h.normal=Yt.getInterpolatedAttribute(a,l,d,c,m,new q),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:l,b:d,c,normal:new q,materialIndex:0};Yt.getNormal(us,hs,fs,f.normal),h.face=f,h.barycoord=m}return h}class hh extends Ct{constructor(e=null,t=1,i=1,s,r,a,l,d,c=bt,h=bt,m,f){super(null,a,l,d,c,h,s,r,m,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cr=new q,fh=new q,ph=new Fe;class Wn{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Cr.subVectors(i,t).cross(fh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Cr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ph.getNormalMatrix(e),s=this.coplanarPoint(Cr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Ks,mh=new Je(.5,.5),_s=new q;class Ka{constructor(e=new Wn,t=new Wn,i=new Wn,s=new Wn,r=new Wn,a=new Wn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(s),l[4].copy(r),l[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=on,i=!1){const s=this.planes,r=e.elements,a=r[0],l=r[1],d=r[2],c=r[3],h=r[4],m=r[5],f=r[6],g=r[7],_=r[8],M=r[9],p=r[10],u=r[11],T=r[12],R=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-a,g-h,u-_,w-T).normalize(),s[1].setComponents(c+a,g+h,u+_,w+T).normalize(),s[2].setComponents(c+l,g+m,u+M,w+R).normalize(),s[3].setComponents(c-l,g-m,u-M,w-R).normalize(),i)s[4].setComponents(d,f,p,y).normalize(),s[5].setComponents(c-d,g-f,u-p,w-y).normalize();else if(s[4].setComponents(c-d,g-f,u-p,w-y).normalize(),t===on)s[5].setComponents(c+d,g+f,u+p,w+y).normalize();else if(t===Hi)s[5].setComponents(d,f,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){Hn.center.set(0,0,0);const t=mh.distanceTo(e.center);return Hn.radius=.7071067811865476+t,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(_s.x=s.normal.x>0?e.max.x:e.min.x,_s.y=s.normal.y>0?e.max.y:e.min.y,_s.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(_s)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fc extends qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nl=new ct,Ia=new Uc,xs=new Ks,vs=new q;class gh extends Pt{constructor(e=new Kt,t=new Fc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(s),xs.radius+=r,e.ray.intersectsSphere(xs)===!1)return;nl.copy(s).invert(),Ia.copy(e.ray).applyMatrix4(nl);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=l*l,c=i.index,m=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let _=f,M=g;_<M;_++){const p=c.getX(_);vs.fromBufferAttribute(m,p),il(vs,p,d,s,e,t,this)}}else{const f=Math.max(0,a.start),g=Math.min(m.count,a.start+a.count);for(let _=f,M=g;_<M;_++)vs.fromBufferAttribute(m,_),il(vs,_,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function il(n,e,t,i,s,r,a){const l=Ia.distanceSqToPoint(n);if(l<t){const d=new q;Ia.closestPointToPoint(n,d),d.applyMatrix4(i);const c=s.ray.origin.distanceTo(d);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(l),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Oc extends Ct{constructor(e=[],t=Kn,i,s,r,a,l,d,c,h){super(e,t,i,s,r,a,l,d,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _h extends Ct{constructor(e,t,i,s,r,a,l,d,c){super(e,t,i,s,r,a,l,d,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wi extends Ct{constructor(e,t,i=dn,s,r,a,l=bt,d=bt,c,h=Tn,m=1){if(h!==Tn&&h!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:m};super(f,s,r,a,l,d,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ya(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xh extends wi{constructor(e,t=dn,i=Kn,s,r,a=bt,l=bt,d,c=Tn){const h={width:e,height:e,depth:1},m=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,l,d,c),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bc extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $i extends Kt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const l=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const d=[],c=[],h=[],m=[];let f=0,g=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(d),this.setAttribute("position",new En(c,3)),this.setAttribute("normal",new En(h,3)),this.setAttribute("uv",new En(m,2));function _(M,p,u,T,R,y,w,S,A,v,C){const I=y/A,P=w/v,D=y/2,K=w/2,H=S/2,k=A+1,$=v+1;let U=0,W=0;const se=new q;for(let ce=0;ce<$;ce++){const me=ce*P-K;for(let Te=0;Te<k;Te++){const He=Te*I-D;se[M]=He*T,se[p]=me*R,se[u]=H,c.push(se.x,se.y,se.z),se[M]=0,se[p]=0,se[u]=S>0?1:-1,h.push(se.x,se.y,se.z),m.push(Te/A),m.push(1-ce/v),U+=1}}for(let ce=0;ce<v;ce++)for(let me=0;me<A;me++){const Te=f+me+k*ce,He=f+me+k*(ce+1),Qe=f+(me+1)+k*(ce+1),Ve=f+(me+1)+k*ce;d.push(Te,He,Ve),d.push(He,Qe,Ve),W+=6}l.addGroup(g,W,C),g+=W,f+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Yi extends Kt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,l=Math.floor(i),d=Math.floor(s),c=l+1,h=d+1,m=e/l,f=t/d,g=[],_=[],M=[],p=[];for(let u=0;u<h;u++){const T=u*f-a;for(let R=0;R<c;R++){const y=R*m-r;_.push(y,-T,0),M.push(0,0,1),p.push(R/l),p.push(1-u/d)}}for(let u=0;u<d;u++)for(let T=0;T<l;T++){const R=T+c*u,y=T+c*(u+1),w=T+1+c*(u+1),S=T+1+c*u;g.push(R,y,S),g.push(y,w,S)}this.setIndex(g),this.setAttribute("position",new En(_,3)),this.setAttribute("normal",new En(M,3)),this.setAttribute("uv",new En(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ai(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(sl(s))s.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(sl(s[0])){const r=[];for(let a=0,l=s.length;a<l;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=Ai(n[t]);for(const s in i)e[s]=i[s]}return e}function sl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function vh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function zc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Mh={clone:Ai,merge:Nt};var Sh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sh,this.fragmentShader=yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ai(e.uniforms),this.uniformsGroups=vh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(s.value);break;case"v2":this.uniforms[i].value=new Je().fromArray(s.value);break;case"v3":this.uniforms[i].value=new q().fromArray(s.value);break;case"v4":this.uniforms[i].value=new lt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Fe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ct().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Eh extends un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bh extends qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Th extends qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class kc extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Nr=new ct,rl=new q,al=new q;class wh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Je(512,512),this.mapType=kt,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new Je(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;rl.setFromMatrixPosition(e.matrixWorld),t.position.copy(rl),al.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(al),t.updateMatrixWorld(),Nr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Hi||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Nr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ms=new q,Ss=new Ri,tn=new q;class Gc extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ms,Ss,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ms,Ss,tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ms,Ss,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ms,Ss,tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const In=new q,ol=new Je,ll=new Je;class zt extends Gc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=La*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return La*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(In.x,In.y).multiplyScalar(-e/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(In.x,In.y).multiplyScalar(-e/In.z)}getViewSize(e,t){return this.getViewBounds(e,ol,ll),t.subVectors(ll,ol)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ar*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const d=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/d,t-=a.offsetY*i/c,s*=a.width/d,i*=a.height/c}const l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ah extends wh{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0}}class Pr extends kc{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ah}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Vc extends Gc{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,l=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,l-=h*this.view.offsetY,d=l-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,l,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Rh extends kc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const mi=-90,gi=1;class Ch extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zt(mi,gi,e,t);s.layers=this.layers,this.add(s);const r=new zt(mi,gi,e,t);r.layers=this.layers,this.add(r);const a=new zt(mi,gi,e,t);a.layers=this.layers,this.add(a);const l=new zt(mi,gi,e,t);l.layers=this.layers,this.add(l);const d=new zt(mi,gi,e,t);d.layers=this.layers,this.add(d);const c=new zt(mi,gi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,l,d]=t;for(const c of t)this.remove(c);if(e===on)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===Hi)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,l,d,c,h]=this.children,m=e.getRenderTarget(),f=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(m,f,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Nh extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const no=class no{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};no.prototype.isMatrix2=!0;let cl=no;function dl(n,e,t,i){const s=Ph(i);switch(t){case wc:return n*e;case Rc:return n*e/s.components*s.byteLength;case Wa:return n*e/s.components*s.byteLength;case Jn:return n*e*2/s.components*s.byteLength;case ja:return n*e*2/s.components*s.byteLength;case Ac:return n*e*3/s.components*s.byteLength;case Zt:return n*e*4/s.components*s.byteLength;case Xa:return n*e*4/s.components*s.byteLength;case Rs:case Cs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ns:case Ps:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sa:case aa:return Math.max(n,16)*Math.max(e,8)/4;case ia:case ra:return Math.max(n,8)*Math.max(e,8)/2;case oa:case la:case da:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ca:case zs:case ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ma:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ga:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case _a:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case va:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ya:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ea:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ba:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case wa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Aa:case Ra:case Ca:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Na:case Pa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ks:case Da:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ph(n){switch(n){case kt:case yc:return{byteLength:1,components:1};case Gi:case Ec:case bn:return{byteLength:2,components:1};case Va:case Ha:return{byteLength:2,components:4};case dn:case Ga:case an:return{byteLength:4,components:1};case bc:case Tc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ka}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ka);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hc(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Dh(n){const e=new WeakMap;function t(l,d){const c=l.array,h=l.usage,m=c.byteLength,f=n.createBuffer();n.bindBuffer(d,f),n.bufferData(d,c,h),l.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:m}}function i(l,d,c){const h=d.array,m=d.updateRanges;if(n.bindBuffer(c,l),m.length===0)n.bufferSubData(c,0,h);else{m.sort((g,_)=>g.start-_.start);let f=0;for(let g=1;g<m.length;g++){const _=m[f],M=m[g];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++f,m[f]=M)}m.length=f+1;for(let g=0,_=m.length;g<_;g++){const M=m[g];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=e.get(l);d&&(n.deleteBuffer(d.buffer),e.delete(l))}function a(l,d){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=e.get(l);(!h||h.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,t(l,d));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,d),c.version=l.version}}return{get:s,remove:r,update:a}}var Lh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ih=`#ifdef USE_ALPHAHASH
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
#endif`,Uh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Oh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zh=`#ifdef USE_AOMAP
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
#endif`,kh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gh=`#ifdef USE_BATCHING
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
#endif`,Vh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xh=`#ifdef USE_IRIDESCENCE
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
#endif`,qh=`#ifdef USE_BUMPMAP
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
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ef=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,nf=`#define PI 3.141592653589793
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
} // validated`,sf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rf=`vec3 transformedNormal = objectNormal;
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
#endif`,af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,of=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",uf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hf=`#ifdef USE_ENVMAP
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
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pf=`#ifdef USE_ENVMAP
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
#endif`,mf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gf=`#ifdef USE_ENVMAP
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
#endif`,_f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sf=`#ifdef USE_GRADIENTMAP
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
}`,yf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ef=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wf=`#ifdef USE_ENVMAP
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
#endif`,Af=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pf=`PhysicalMaterial material;
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
#endif`,Df=`uniform sampler2D dfgLUT;
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
}`,Lf=`
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
#endif`,If=`#if defined( RE_IndirectDiffuse )
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
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ff=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Of=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wf=`#if defined( USE_POINTS_UV )
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
#endif`,jf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$f=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
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
#endif`,Kf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,np=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ip=`#ifdef USE_NORMALMAP
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
#endif`,sp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,op=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,up=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vp=`float getShadowMask() {
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
}`,Mp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sp=`#ifdef USE_SKINNING
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
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ep=`#ifdef USE_SKINNING
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
#endif`,bp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ap=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rp=`#ifdef USE_TRANSMISSION
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
#endif`,Cp=`#ifdef USE_TRANSMISSION
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
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ip=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Up=`uniform sampler2D t2D;
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`#include <common>
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
}`,Gp=`#if DEPTH_PACKING == 3200
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
}`,Vp=`#define DISTANCE
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
}`,Hp=`#define DISTANCE
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
}`,Wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`uniform float scale;
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
}`,qp=`uniform vec3 diffuse;
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
}`,$p=`#include <common>
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
}`,Yp=`uniform vec3 diffuse;
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
}`,Zp=`#define LAMBERT
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
}`,Kp=`#define LAMBERT
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
}`,Jp=`#define MATCAP
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
}`,Qp=`#define MATCAP
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
}`,em=`#define NORMAL
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
}`,tm=`#define NORMAL
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
}`,nm=`#define PHONG
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
}`,im=`#define PHONG
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
}`,sm=`#define STANDARD
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
}`,rm=`#define STANDARD
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
}`,am=`#define TOON
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
}`,om=`#define TOON
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
}`,lm=`uniform float size;
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
}`,cm=`uniform vec3 diffuse;
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
}`,dm=`#include <common>
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
}`,um=`uniform vec3 color;
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
}`,hm=`uniform float rotation;
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
}`,fm=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:Lh,alphahash_pars_fragment:Ih,alphamap_fragment:Uh,alphamap_pars_fragment:Fh,alphatest_fragment:Oh,alphatest_pars_fragment:Bh,aomap_fragment:zh,aomap_pars_fragment:kh,batching_pars_vertex:Gh,batching_vertex:Vh,begin_vertex:Hh,beginnormal_vertex:Wh,bsdfs:jh,iridescence_fragment:Xh,bumpmap_pars_fragment:qh,clipping_planes_fragment:$h,clipping_planes_pars_fragment:Yh,clipping_planes_pars_vertex:Zh,clipping_planes_vertex:Kh,color_fragment:Jh,color_pars_fragment:Qh,color_pars_vertex:ef,color_vertex:tf,common:nf,cube_uv_reflection_fragment:sf,defaultnormal_vertex:rf,displacementmap_pars_vertex:af,displacementmap_vertex:of,emissivemap_fragment:lf,emissivemap_pars_fragment:cf,colorspace_fragment:df,colorspace_pars_fragment:uf,envmap_fragment:hf,envmap_common_pars_fragment:ff,envmap_pars_fragment:pf,envmap_pars_vertex:mf,envmap_physical_pars_fragment:wf,envmap_vertex:gf,fog_vertex:_f,fog_pars_vertex:xf,fog_fragment:vf,fog_pars_fragment:Mf,gradientmap_pars_fragment:Sf,lightmap_pars_fragment:yf,lights_lambert_fragment:Ef,lights_lambert_pars_fragment:bf,lights_pars_begin:Tf,lights_toon_fragment:Af,lights_toon_pars_fragment:Rf,lights_phong_fragment:Cf,lights_phong_pars_fragment:Nf,lights_physical_fragment:Pf,lights_physical_pars_fragment:Df,lights_fragment_begin:Lf,lights_fragment_maps:If,lights_fragment_end:Uf,lightprobes_pars_fragment:Ff,logdepthbuf_fragment:Of,logdepthbuf_pars_fragment:Bf,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:kf,map_fragment:Gf,map_pars_fragment:Vf,map_particle_fragment:Hf,map_particle_pars_fragment:Wf,metalnessmap_fragment:jf,metalnessmap_pars_fragment:Xf,morphinstance_vertex:qf,morphcolor_vertex:$f,morphnormal_vertex:Yf,morphtarget_pars_vertex:Zf,morphtarget_vertex:Kf,normal_fragment_begin:Jf,normal_fragment_maps:Qf,normal_pars_fragment:ep,normal_pars_vertex:tp,normal_vertex:np,normalmap_pars_fragment:ip,clearcoat_normal_fragment_begin:sp,clearcoat_normal_fragment_maps:rp,clearcoat_pars_fragment:ap,iridescence_pars_fragment:op,opaque_fragment:lp,packing:cp,premultiplied_alpha_fragment:dp,project_vertex:up,dithering_fragment:hp,dithering_pars_fragment:fp,roughnessmap_fragment:pp,roughnessmap_pars_fragment:mp,shadowmap_pars_fragment:gp,shadowmap_pars_vertex:_p,shadowmap_vertex:xp,shadowmask_pars_fragment:vp,skinbase_vertex:Mp,skinning_pars_vertex:Sp,skinning_vertex:yp,skinnormal_vertex:Ep,specularmap_fragment:bp,specularmap_pars_fragment:Tp,tonemapping_fragment:wp,tonemapping_pars_fragment:Ap,transmission_fragment:Rp,transmission_pars_fragment:Cp,uv_pars_fragment:Np,uv_pars_vertex:Pp,uv_vertex:Dp,worldpos_vertex:Lp,background_vert:Ip,background_frag:Up,backgroundCube_vert:Fp,backgroundCube_frag:Op,cube_vert:Bp,cube_frag:zp,depth_vert:kp,depth_frag:Gp,distance_vert:Vp,distance_frag:Hp,equirect_vert:Wp,equirect_frag:jp,linedashed_vert:Xp,linedashed_frag:qp,meshbasic_vert:$p,meshbasic_frag:Yp,meshlambert_vert:Zp,meshlambert_frag:Kp,meshmatcap_vert:Jp,meshmatcap_frag:Qp,meshnormal_vert:em,meshnormal_frag:tm,meshphong_vert:nm,meshphong_frag:im,meshphysical_vert:sm,meshphysical_frag:rm,meshtoon_vert:am,meshtoon_frag:om,points_vert:lm,points_frag:cm,shadow_vert:dm,shadow_frag:um,sprite_vert:hm,sprite_frag:fm},Me={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},rn={basic:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Nt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Nt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new $e(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Nt([Me.points,Me.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Nt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Nt([Me.common,Me.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Nt([Me.sprite,Me.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:Nt([Me.common,Me.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:Nt([Me.lights,Me.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};rn.physical={uniforms:Nt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ys={r:0,b:0,g:0},pm=new ct,Wc=new Fe;Wc.set(-1,0,0,0,1,0,0,0,1);function mm(n,e,t,i,s,r){const a=new $e(0);let l=s===!0?0:1,d,c,h=null,m=0,f=null;function g(T){let R=T.isScene===!0?T.background:null;if(R&&R.isTexture){const y=T.backgroundBlurriness>0;R=e.get(R,y)}return R}function _(T){let R=!1;const y=g(T);y===null?p(a,l):y&&y.isColor&&(p(y,1),R=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(T,R){const y=g(R);y&&(y.isCubeTexture||y.mapping===Zs)?(c===void 0&&(c=new jt(new $i(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Ai(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(pm.makeRotationFromEuler(R.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Wc),c.material.toneMapped=Xe.getTransfer(y.colorSpace)!==tt,(h!==y||m!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,m=y.version,f=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(d===void 0&&(d=new jt(new Yi(2,2),new un({name:"BackgroundMaterial",uniforms:Ai(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(d)),d.material.uniforms.t2D.value=y,d.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,d.material.toneMapped=Xe.getTransfer(y.colorSpace)!==tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),d.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||m!==y.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,h=y,m=y.version,f=n.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null))}function p(T,R){T.getRGB(ys,zc(n)),t.buffers.color.setClear(ys.r,ys.g,ys.b,R,r)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,R=1){a.set(T),l=R,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(a,l)},render:_,addToRenderList:M,dispose:u}}function gm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function l(P,D,K,H,k){let $=!1;const U=m(P,H,K,D);r!==U&&(r=U,c(r.object)),$=g(P,H,K,k),$&&_(P,H,K,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(P,D,K,H),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function d(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function m(P,D,K,H){const k=H.wireframe===!0;let $=i[D.id];$===void 0&&($={},i[D.id]=$);const U=P.isInstancedMesh===!0?P.id:0;let W=$[U];W===void 0&&(W={},$[U]=W);let se=W[K.id];se===void 0&&(se={},W[K.id]=se);let ce=se[k];return ce===void 0&&(ce=f(d()),se[k]=ce),ce}function f(P){const D=[],K=[],H=[];for(let k=0;k<t;k++)D[k]=0,K[k]=0,H[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:K,attributeDivisors:H,object:P,attributes:{},index:null}}function g(P,D,K,H){const k=r.attributes,$=D.attributes;let U=0;const W=K.getAttributes();for(const se in W)if(W[se].location>=0){const me=k[se];let Te=$[se];if(Te===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(Te=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(Te=P.instanceColor)),me===void 0||me.attribute!==Te||Te&&me.data!==Te.data)return!0;U++}return r.attributesNum!==U||r.index!==H}function _(P,D,K,H){const k={},$=D.attributes;let U=0;const W=K.getAttributes();for(const se in W)if(W[se].location>=0){let me=$[se];me===void 0&&(se==="instanceMatrix"&&P.instanceMatrix&&(me=P.instanceMatrix),se==="instanceColor"&&P.instanceColor&&(me=P.instanceColor));const Te={};Te.attribute=me,me&&me.data&&(Te.data=me.data),k[se]=Te,U++}r.attributes=k,r.attributesNum=U,r.index=H}function M(){const P=r.newAttributes;for(let D=0,K=P.length;D<K;D++)P[D]=0}function p(P){u(P,0)}function u(P,D){const K=r.newAttributes,H=r.enabledAttributes,k=r.attributeDivisors;K[P]=1,H[P]===0&&(n.enableVertexAttribArray(P),H[P]=1),k[P]!==D&&(n.vertexAttribDivisor(P,D),k[P]=D)}function T(){const P=r.newAttributes,D=r.enabledAttributes;for(let K=0,H=D.length;K<H;K++)D[K]!==P[K]&&(n.disableVertexAttribArray(K),D[K]=0)}function R(P,D,K,H,k,$,U){U===!0?n.vertexAttribIPointer(P,D,K,k,$):n.vertexAttribPointer(P,D,K,H,k,$)}function y(P,D,K,H){M();const k=H.attributes,$=K.getAttributes(),U=D.defaultAttributeValues;for(const W in $){const se=$[W];if(se.location>=0){let ce=k[W];if(ce===void 0&&(W==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),W==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),ce!==void 0){const me=ce.normalized,Te=ce.itemSize,He=e.get(ce);if(He===void 0)continue;const Qe=He.buffer,Ve=He.type,te=He.bytesPerElement,fe=Ve===n.INT||Ve===n.UNSIGNED_INT||ce.gpuType===Ga;if(ce.isInterleavedBufferAttribute){const z=ce.data,he=z.stride,de=ce.offset;if(z.isInstancedInterleavedBuffer){for(let pe=0;pe<se.locationSize;pe++)u(se.location+pe,z.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let pe=0;pe<se.locationSize;pe++)p(se.location+pe);n.bindBuffer(n.ARRAY_BUFFER,Qe);for(let pe=0;pe<se.locationSize;pe++)R(se.location+pe,Te/se.locationSize,Ve,me,he*te,(de+Te/se.locationSize*pe)*te,fe)}else{if(ce.isInstancedBufferAttribute){for(let z=0;z<se.locationSize;z++)u(se.location+z,ce.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let z=0;z<se.locationSize;z++)p(se.location+z);n.bindBuffer(n.ARRAY_BUFFER,Qe);for(let z=0;z<se.locationSize;z++)R(se.location+z,Te/se.locationSize,Ve,me,Te*te,Te/se.locationSize*z*te,fe)}}else if(U!==void 0){const me=U[W];if(me!==void 0)switch(me.length){case 2:n.vertexAttrib2fv(se.location,me);break;case 3:n.vertexAttrib3fv(se.location,me);break;case 4:n.vertexAttrib4fv(se.location,me);break;default:n.vertexAttrib1fv(se.location,me)}}}}T()}function w(){C();for(const P in i){const D=i[P];for(const K in D){const H=D[K];for(const k in H){const $=H[k];for(const U in $)h($[U].object),delete $[U];delete H[k]}}delete i[P]}}function S(P){if(i[P.id]===void 0)return;const D=i[P.id];for(const K in D){const H=D[K];for(const k in H){const $=H[k];for(const U in $)h($[U].object),delete $[U];delete H[k]}}delete i[P.id]}function A(P){for(const D in i){const K=i[D];for(const H in K){const k=K[H];if(k[P.id]===void 0)continue;const $=k[P.id];for(const U in $)h($[U].object),delete $[U];delete k[P.id]}}}function v(P){for(const D in i){const K=i[D],H=P.isInstancedMesh===!0?P.id:0,k=K[H];if(k!==void 0){for(const $ in k){const U=k[$];for(const W in U)h(U[W].object),delete U[W];delete k[$]}delete K[H],Object.keys(K).length===0&&delete i[D]}}}function C(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:C,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:p,disableUnusedAttributes:T}}function _m(n,e,t){let i;function s(d){i=d}function r(d,c){n.drawArrays(i,d,c),t.update(c,i,1)}function a(d,c,h){h!==0&&(n.drawArraysInstanced(i,d,c,h),t.update(c,i,h))}function l(d,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,c,0,h);let f=0;for(let g=0;g<h;g++)f+=c[g];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=l}function xm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Zt&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(A){const v=A===bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==kt&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==an&&!v)}function d(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=d(c);h!==c&&(Ue("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const m=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:m,reversedDepthBuffer:f,maxTextures:g,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:T,maxVaryings:R,maxFragmentUniforms:y,maxSamples:w,samples:S}}function vm(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Wn,l=new Fe,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(m,f){const g=m.length!==0||f||i!==0||s;return s=f,i=m.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,f){t=h(m,f,0)},this.setState=function(m,f,g){const _=m.clippingPlanes,M=m.clipIntersection,p=m.clipShadows,u=n.get(m);if(!s||_===null||_.length===0||r&&!p)r?h(null):c();else{const T=r?0:i,R=T*4;let y=u.clippingState||null;d.value=y,y=h(_,f,R,g);for(let w=0;w!==R;++w)y[w]=t[w];u.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function c(){d.value!==t&&(d.value=t,d.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(m,f,g,_){const M=m!==null?m.length:0;let p=null;if(M!==0){if(p=d.value,_!==!0||p===null){const u=g+M*4,T=f.matrixWorldInverse;l.getNormalMatrix(T),(p===null||p.length<u)&&(p=new Float32Array(u));for(let R=0,y=g;R!==M;++R,y+=4)a.copy(m[R]).applyMatrix4(T,l),a.normal.toArray(p,y),p[y+3]=a.constant}d.value=p,d.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}const Fn=4,ul=[.125,.215,.35,.446,.526,.582],Xn=20,Mm=256,Ui=new Vc,hl=new $e;let Dr=null,Lr=0,Ir=0,Ur=!1;const Sm=new q;class fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:l=Sm}=r;Dr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Ir=this._renderer.getActiveMipmapLevel(),Ur=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,i,s,d,l),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Dr,Lr,Ir),this._renderer.xr.enabled=Ur,e.scissorTest=!1,_i(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Kn||e.mapping===Ti?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Dr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Ir=this._renderer.getActiveMipmapLevel(),Ur=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:bn,format:Zt,colorSpace:Gs,depthBuffer:!1},s=pl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ym(r)),this._blurMaterial=bm(r,e,t),this._ggxMaterial=Em(r,e,t)}return s}_compileMaterial(e){const t=new jt(new Kt,e);this._renderer.compile(t,Ui)}_sceneToCubeUV(e,t,i,s,r){const d=new zt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,f=m.autoClear,g=m.toneMapping;m.getClearColor(hl),m.toneMapping=ln,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(s),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new $i,new zi({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let u=!1;const T=e.background;T?T.isColor&&(p.color.copy(T),e.background=null,u=!0):(p.color.copy(hl),u=!0);for(let R=0;R<6;R++){const y=R%3;y===0?(d.up.set(0,c[R],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+h[R],r.y,r.z)):y===1?(d.up.set(0,0,c[R]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+h[R],r.z)):(d.up.set(0,c[R],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+h[R]));const w=this._cubeSize;_i(s,y*w,R>2?w:0,w,w),m.setRenderTarget(s),u&&m.render(M,d),m.render(e,d)}m.toneMapping=g,m.autoClear=f,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Kn||e.mapping===Ti;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ml());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const l=r.uniforms;l.envMap.value=e;const d=this._cubeSize;_i(t,0,0,3*d,2*d),i.setRenderTarget(t),i.render(a,Ui)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,l=this._lodMeshes[i];l.material=a;const d=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),m=Math.sqrt(c*c-h*h),f=0+c*1.25,g=m*f,{_lodMax:_}=this,M=this._sizeLods[i],p=3*M*(i>_-Fn?i-_+Fn:0),u=4*(this._cubeSize-M);d.envMap.value=e.texture,d.roughness.value=g,d.mipInt.value=_-t,_i(r,p,u,3*M,2*M),s.setRenderTarget(r),s.render(l,Ui),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=_-i,_i(e,p,u,3*M,2*M),s.setRenderTarget(e),s.render(l,Ui)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,l){const d=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");const h=3,m=this._lodMeshes[s];m.material=c;const f=c.uniforms,g=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Xn-1),M=r/_,p=isFinite(r)?1+Math.floor(h*M):Xn;p>Xn&&Ue(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Xn}`);const u=[];let T=0;for(let A=0;A<Xn;++A){const v=A/M,C=Math.exp(-v*v/2);u.push(C),A===0?T+=C:A<p&&(T+=2*C)}for(let A=0;A<u.length;A++)u[A]=u[A]/T;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",l&&(f.poleAxis.value=l);const{_lodMax:R}=this;f.dTheta.value=_,f.mipInt.value=R-i;const y=this._sizeLods[s],w=3*y*(s>R-Fn?s-R+Fn:0),S=4*(this._cubeSize-y);_i(t,w,S,3*y,2*y),d.setRenderTarget(t),d.render(m,Ui)}}function ym(n){const e=[],t=[],i=[];let s=n;const r=n-Fn+1+ul.length;for(let a=0;a<r;a++){const l=Math.pow(2,s);e.push(l);let d=1/l;a>n-Fn?d=ul[a-n+Fn-1]:a===0&&(d=0),t.push(d);const c=1/(l-2),h=-c,m=1+c,f=[h,h,m,h,m,m,h,h,m,m,h,m],g=6,_=6,M=3,p=2,u=1,T=new Float32Array(M*_*g),R=new Float32Array(p*_*g),y=new Float32Array(u*_*g);for(let S=0;S<g;S++){const A=S%3*2/3-1,v=S>2?0:-1,C=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];T.set(C,M*_*S),R.set(f,p*_*S);const I=[S,S,S,S,S,S];y.set(I,u*_*S)}const w=new Kt;w.setAttribute("position",new Wt(T,M)),w.setAttribute("uv",new Wt(R,p)),w.setAttribute("faceIndex",new Wt(y,u)),i.push(new jt(w,null)),s>Fn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function pl(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=Zs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _i(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Em(n,e,t){return new un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Mm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Js(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function bm(n,e,t){const i=new Float32Array(Xn),s=new q(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Js(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ml(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Js(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function gl(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Js(){return`

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
	`}class jc extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Oc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new $i(5,5,5),r=new un({name:"CubemapFromEquirect",uniforms:Ai(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:It,blending:Sn});r.uniforms.tEquirect.value=t;const a=new jt(s,r),l=t.minFilter;return t.minFilter===qn&&(t.minFilter=Rt),new Ch(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Tm(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,g=!1){return f==null?null:g?a(f):r(f)}function r(f){if(f&&f.isTexture){const g=f.mapping;if(g===ir||g===sr)if(e.has(f)){const _=e.get(f).texture;return l(_,f.mapping)}else{const _=f.image;if(_&&_.height>0){const M=new jc(_.height);return M.fromEquirectangularTexture(n,f),e.set(f,M),f.addEventListener("dispose",c),l(M.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const g=f.mapping,_=g===ir||g===sr,M=g===Kn||g===Ti;if(_||M){let p=t.get(f);const u=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==u)return i===null&&(i=new fl(n)),p=_?i.fromEquirectangular(f,p):i.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{const T=f.image;return _&&T&&T.height>0||M&&T&&d(T)?(i===null&&(i=new fl(n)),p=_?i.fromEquirectangular(f):i.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function l(f,g){return g===ir?f.mapping=Kn:g===sr&&(f.mapping=Ti),f}function d(f){let g=0;const _=6;for(let M=0;M<_;M++)f[M]!==void 0&&g++;return g===_}function c(f){const g=f.target;g.removeEventListener("dispose",c);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function h(f){const g=f.target;g.removeEventListener("dispose",h);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:m}}function wm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Mi("WebGLRenderer: "+i+" extension not supported."),s}}}function Am(n,e,t,i){const s={},r=new WeakMap;function a(m){const f=m.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete s[f.id];const g=r.get(f);g&&(e.remove(g),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function l(m,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function d(m){const f=m.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER)}function c(m){const f=[],g=m.index,_=m.attributes.position;let M=0;if(_===void 0)return;if(g!==null){const T=g.array;M=g.version;for(let R=0,y=T.length;R<y;R+=3){const w=T[R+0],S=T[R+1],A=T[R+2];f.push(w,S,S,A,A,w)}}else{const T=_.array;M=_.version;for(let R=0,y=T.length/3-1;R<y;R+=3){const w=R+0,S=R+1,A=R+2;f.push(w,S,S,A,A,w)}}const p=new(_.count>=65535?Ic:Lc)(f,1);p.version=M;const u=r.get(m);u&&e.remove(u),r.set(m,p)}function h(m){const f=r.get(m);if(f){const g=m.index;g!==null&&f.version<g.version&&c(m)}else c(m);return r.get(m)}return{get:l,update:d,getWireframeAttribute:h}}function Rm(n,e,t){let i;function s(m){i=m}let r,a;function l(m){r=m.type,a=m.bytesPerElement}function d(m,f){n.drawElements(i,f,r,m*a),t.update(f,i,1)}function c(m,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,m*a,g),t.update(f,i,g))}function h(m,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,m,0,g);let M=0;for(let p=0;p<g;p++)M+=f[p];t.update(M,i,1)}this.setMode=s,this.setIndex=l,this.render=d,this.renderInstances=c,this.renderMultiDraw=h}function Cm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,l){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=l*(r/3);break;case n.LINES:t.lines+=l*(r/2);break;case n.LINE_STRIP:t.lines+=l*(r-1);break;case n.LINE_LOOP:t.lines+=l*r;break;case n.POINTS:t.points+=l*r;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Nm(n,e,t){const i=new WeakMap,s=new lt;function r(a,l,d){const c=a.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,m=h!==void 0?h.length:0;let f=i.get(l);if(f===void 0||f.count!==m){let C=function(){A.dispose(),i.delete(l),l.removeEventListener("dispose",C)};f!==void 0&&f.texture.dispose();const g=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,M=l.morphAttributes.color!==void 0,p=l.morphAttributes.position||[],u=l.morphAttributes.normal||[],T=l.morphAttributes.color||[];let R=0;g===!0&&(R=1),_===!0&&(R=2),M===!0&&(R=3);let y=l.attributes.position.count*R,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*w*4*m),A=new Nc(S,y,w,m);A.type=an,A.needsUpdate=!0;const v=R*4;for(let I=0;I<m;I++){const P=p[I],D=u[I],K=T[I],H=y*w*4*I;for(let k=0;k<P.count;k++){const $=k*v;g===!0&&(s.fromBufferAttribute(P,k),S[H+$+0]=s.x,S[H+$+1]=s.y,S[H+$+2]=s.z,S[H+$+3]=0),_===!0&&(s.fromBufferAttribute(D,k),S[H+$+4]=s.x,S[H+$+5]=s.y,S[H+$+6]=s.z,S[H+$+7]=0),M===!0&&(s.fromBufferAttribute(K,k),S[H+$+8]=s.x,S[H+$+9]=s.y,S[H+$+10]=s.z,S[H+$+11]=K.itemSize===4?s.w:1)}}f={count:m,texture:A,size:new Je(y,w)},i.set(l,f),l.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let M=0;M<c.length;M++)g+=c[M];const _=l.morphTargetsRelative?1:1-g;d.getUniforms().setValue(n,"morphTargetBaseInfluence",_),d.getUniforms().setValue(n,"morphTargetInfluences",c)}d.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Pm(n,e,t,i,s){let r=new WeakMap;function a(c){const h=s.render.frame,m=c.geometry,f=e.get(c,m);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",d)===!1&&c.addEventListener("dispose",d),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const g=c.skeleton;r.get(g)!==h&&(g.update(),r.set(g,h))}return f}function l(){r=new WeakMap}function d(c){const h=c.target;h.removeEventListener("dispose",d),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:l}}const Dm={[pc]:"LINEAR_TONE_MAPPING",[mc]:"REINHARD_TONE_MAPPING",[gc]:"CINEON_TONE_MAPPING",[_c]:"ACES_FILMIC_TONE_MAPPING",[vc]:"AGX_TONE_MAPPING",[Mc]:"NEUTRAL_TONE_MAPPING",[xc]:"CUSTOM_TONE_MAPPING"};function Lm(n,e,t,i,s,r){const a=new cn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new wi(e,t):void 0}),l=new cn(e,t,{type:bn,depthBuffer:!1,stencilBuffer:!1}),d=new Kt;d.setAttribute("position",new En([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new En([0,2,0,0,2,0],2));const c=new Eh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new jt(d,c),m=new Vc(-1,1,1,-1,0,1);let f=null,g=null,_=!1,M,p=null,u=[],T=!1;this.setSize=function(R,y){a.setSize(R,y),l.setSize(R,y);for(let w=0;w<u.length;w++){const S=u[w];S.setSize&&S.setSize(R,y)}},this.setEffects=function(R){u=R,T=u.length>0&&u[0].isRenderPass===!0;const y=a.width,w=a.height;for(let S=0;S<u.length;S++){const A=u[S];A.setSize&&A.setSize(y,w)}},this.begin=function(R,y){if(_||R.toneMapping===ln&&u.length===0)return!1;if(p=y,y!==null){const w=y.width,S=y.height;(a.width!==w||a.height!==S)&&this.setSize(w,S)}return T===!1&&R.setRenderTarget(a),M=R.toneMapping,R.toneMapping=ln,!0},this.hasRenderPass=function(){return T},this.end=function(R,y){R.toneMapping=M,_=!0;let w=a,S=l;for(let A=0;A<u.length;A++){const v=u[A];if(v.enabled!==!1&&(v.render(R,S,w,y),v.needsSwap!==!1)){const C=w;w=S,S=C}}if(f!==R.outputColorSpace||g!==R.toneMapping){f=R.outputColorSpace,g=R.toneMapping,c.defines={},Xe.getTransfer(f)===tt&&(c.defines.SRGB_TRANSFER="");const A=Dm[g];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,R.setRenderTarget(p),R.render(h,m),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),l.dispose(),d.dispose(),c.dispose()}}const Xc=new Ct,Ua=new wi(1,1),qc=new Nc,$c=new Ju,Yc=new Oc,_l=[],xl=[],vl=new Float32Array(16),Ml=new Float32Array(9),Sl=new Float32Array(4);function Ci(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=_l[s];if(r===void 0&&(r=new Float32Array(s),_l[s]=r),e!==0){i.toArray(r,0);for(let a=1,l=0;a!==e;++a)l+=t,n[a].toArray(r,l)}return r}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Qs(n,e){let t=xl[e];t===void 0&&(t=new Int32Array(e),xl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Im(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Bm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Sl.set(i),n.uniformMatrix2fv(this.addr,!1,Sl),St(t,i)}}function zm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;Ml.set(i),n.uniformMatrix3fv(this.addr,!1,Ml),St(t,i)}}function km(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;vl.set(i),n.uniformMatrix4fv(this.addr,!1,vl),St(t,i)}}function Gm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function Hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function Wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function jm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function Ym(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ua.compareFunction=t.isReversedDepthBuffer()?$a:qa,r=Ua):r=Xc,t.setTexture2D(e||r,s)}function Zm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||$c,s)}function Km(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Yc,s)}function Jm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||qc,s)}function Qm(n){switch(n){case 5126:return Im;case 35664:return Um;case 35665:return Fm;case 35666:return Om;case 35674:return Bm;case 35675:return zm;case 35676:return km;case 5124:case 35670:return Gm;case 35667:case 35671:return Vm;case 35668:case 35672:return Hm;case 35669:case 35673:return Wm;case 5125:return jm;case 36294:return Xm;case 36295:return qm;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Ym;case 35679:case 36299:case 36307:return Zm;case 35680:case 36300:case 36308:case 36293:return Km;case 36289:case 36303:case 36311:case 36292:return Jm}}function eg(n,e){n.uniform1fv(this.addr,e)}function tg(n,e){const t=Ci(e,this.size,2);n.uniform2fv(this.addr,t)}function ng(n,e){const t=Ci(e,this.size,3);n.uniform3fv(this.addr,t)}function ig(n,e){const t=Ci(e,this.size,4);n.uniform4fv(this.addr,t)}function sg(n,e){const t=Ci(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function rg(n,e){const t=Ci(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ag(n,e){const t=Ci(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function og(n,e){n.uniform1iv(this.addr,e)}function lg(n,e){n.uniform2iv(this.addr,e)}function cg(n,e){n.uniform3iv(this.addr,e)}function dg(n,e){n.uniform4iv(this.addr,e)}function ug(n,e){n.uniform1uiv(this.addr,e)}function hg(n,e){n.uniform2uiv(this.addr,e)}function fg(n,e){n.uniform3uiv(this.addr,e)}function pg(n,e){n.uniform4uiv(this.addr,e)}function mg(n,e,t){const i=this.cache,s=e.length,r=Qs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ua:a=Xc;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||a,r[l])}function gg(n,e,t){const i=this.cache,s=e.length,r=Qs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||$c,r[a])}function _g(n,e,t){const i=this.cache,s=e.length,r=Qs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Yc,r[a])}function xg(n,e,t){const i=this.cache,s=e.length,r=Qs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||qc,r[a])}function vg(n){switch(n){case 5126:return eg;case 35664:return tg;case 35665:return ng;case 35666:return ig;case 35674:return sg;case 35675:return rg;case 35676:return ag;case 5124:case 35670:return og;case 35667:case 35671:return lg;case 35668:case 35672:return cg;case 35669:case 35673:return dg;case 5125:return ug;case 36294:return hg;case 36295:return fg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return mg;case 35679:case 36299:case 36307:return gg;case 35680:case 36300:case 36308:case 36293:return _g;case 36289:case 36303:case 36311:case 36292:return xg}}class Mg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Qm(t.type)}}class Sg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vg(t.type)}}class yg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const l=s[r];l.setValue(e,t[l.id],i)}}}const Fr=/(\w+)(\])?(\[|\.)?/g;function yl(n,e){n.seq.push(e),n.map[e.id]=e}function Eg(n,e,t){const i=n.name,s=i.length;for(Fr.lastIndex=0;;){const r=Fr.exec(i),a=Fr.lastIndex;let l=r[1];const d=r[2]==="]",c=r[3];if(d&&(l=l|0),c===void 0||c==="["&&a+2===s){yl(t,c===void 0?new Mg(l,n,e):new Sg(l,n,e));break}else{let m=t.map[l];m===void 0&&(m=new yg(l),yl(t,m)),t=m}}}class Ds{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const l=e.getActiveUniform(t,a),d=e.getUniformLocation(t,l.name);Eg(l,d,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const l=t[r],d=i[l.id];d.needsUpdate!==!1&&l.setValue(e,d.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function El(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const bg=37297;let Tg=0;function wg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const l=a+1;i.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return i.join(`
`)}const bl=new Fe;function Ag(n){Xe._getMatrix(bl,Xe.workingColorSpace,n);const e=`mat3( ${bl.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(n)){case Vs:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Tl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+wg(n.getShaderSource(e),l)}else return r}function Rg(n,e){const t=Ag(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Cg={[pc]:"Linear",[mc]:"Reinhard",[gc]:"Cineon",[_c]:"ACESFilmic",[vc]:"AgX",[Mc]:"Neutral",[xc]:"Custom"};function Ng(n,e){const t=Cg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Es=new q;function Pg(){Xe.getLuminanceCoefficients(Es);const n=Es.x.toFixed(4),e=Es.y.toFixed(4),t=Es.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bi).join(`
`)}function Lg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ig(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let l=1;r.type===n.FLOAT_MAT2&&(l=2),r.type===n.FLOAT_MAT3&&(l=3),r.type===n.FLOAT_MAT4&&(l=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:l}}return t}function Bi(n){return n!==""}function wl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Al(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fa(n){return n.replace(Ug,Og)}const Fg=new Map;function Og(n,e){let t=ze[e];if(t===void 0){const i=Fg.get(e);if(i!==void 0)t=ze[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fa(t)}const Bg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(n){return n.replace(Bg,zg)}function zg(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const kg={[As]:"SHADOWMAP_TYPE_PCF",[Oi]:"SHADOWMAP_TYPE_VSM"};function Gg(n){return kg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Vg={[Kn]:"ENVMAP_TYPE_CUBE",[Ti]:"ENVMAP_TYPE_CUBE",[Zs]:"ENVMAP_TYPE_CUBE_UV"};function Hg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Vg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Wg={[Ti]:"ENVMAP_MODE_REFRACTION"};function jg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Wg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Xg={[fc]:"ENVMAP_BLENDING_MULTIPLY",[Pu]:"ENVMAP_BLENDING_MIX",[Du]:"ENVMAP_BLENDING_ADD"};function qg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Xg[n.combine]||"ENVMAP_BLENDING_NONE"}function $g(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Yg(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,l=t.fragmentShader;const d=Gg(t),c=Hg(t),h=jg(t),m=qg(t),f=$g(t),g=Dg(t),_=Lg(r),M=s.createProgram();let p,u,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Bi).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Bi).join(`
`),u.length>0&&(u+=`
`)):(p=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bi).join(`
`),u=[Cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ln?"#define TONE_MAPPING":"",t.toneMapping!==ln?ze.tonemapping_pars_fragment:"",t.toneMapping!==ln?Ng("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,Rg("linearToOutputTexel",t.outputColorSpace),Pg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bi).join(`
`)),a=Fa(a),a=wl(a,t),a=Al(a,t),l=Fa(l),l=wl(l,t),l=Al(l,t),a=Rl(a),l=Rl(l),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",t.glslVersion===zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const R=T+p+a,y=T+u+l,w=El(s,s.VERTEX_SHADER,R),S=El(s,s.FRAGMENT_SHADER,y);s.attachShader(M,w),s.attachShader(M,S),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(P){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(M)||"",K=s.getShaderInfoLog(w)||"",H=s.getShaderInfoLog(S)||"",k=D.trim(),$=K.trim(),U=H.trim();let W=!0,se=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,w,S);else{const ce=Tl(s,w,"vertex"),me=Tl(s,S,"fragment");Ke("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+ce+`
`+me)}else k!==""?Ue("WebGLProgram: Program Info Log:",k):($===""||U==="")&&(se=!1);se&&(P.diagnostics={runnable:W,programLog:k,vertexShader:{log:$,prefix:p},fragmentShader:{log:U,prefix:u}})}s.deleteShader(w),s.deleteShader(S),v=new Ds(s,M),C=Ig(s,M)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let C;this.getAttributes=function(){return C===void 0&&A(this),C};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(M,bg)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tg++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=w,this.fragmentShader=S,this}let Zg=0;class Kg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Jg(e),t.set(e,i)),i}}class Jg{constructor(e){this.id=Zg++,this.code=e,this.usedTimes=0}}function Qg(n){return n===Jn||n===zs||n===ks}function e_(n,e,t,i,s,r){const a=new Pc,l=new Kg,d=new Set,c=[],h=new Map,m=i.logarithmicDepthBuffer;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return d.add(v),v===0?"uv":`uv${v}`}function M(v,C,I,P,D,K){const H=P.fog,k=D.geometry,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,U=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,W=e.get(v.envMap||$,U),se=W&&W.mapping===Zs?W.image.height:null,ce=g[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&Ue("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const me=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Te=me!==void 0?me.length:0;let He=0;k.morphAttributes.position!==void 0&&(He=1),k.morphAttributes.normal!==void 0&&(He=2),k.morphAttributes.color!==void 0&&(He=3);let Qe,Ve,te,fe;if(ce){const Re=rn[ce];Qe=Re.vertexShader,Ve=Re.fragmentShader}else{Qe=v.vertexShader,Ve=v.fragmentShader;const Re=l.getVertexShaderStage(v),ut=l.getFragmentShaderStage(v);l.update(v,Re,ut),te=Re.id,fe=ut.id}const z=n.getRenderTarget(),he=n.state.buffers.depth.getReversed(),de=D.isInstancedMesh===!0,pe=D.isBatchedMesh===!0,ke=!!v.map,Be=!!v.matcap,et=!!W,Ye=!!v.aoMap,je=!!v.lightMap,dt=!!v.bumpMap&&v.wireframe===!1,pt=!!v.normalMap,_t=!!v.displacementMap,vt=!!v.emissiveMap,ot=!!v.metalnessMap,ie=!!v.roughnessMap,N=v.anisotropy>0,xe=v.clearcoat>0,ge=v.dispersion>0,b=v.iridescence>0,x=v.sheen>0,L=v.transmission>0,O=N&&!!v.anisotropyMap,V=xe&&!!v.clearcoatMap,ee=xe&&!!v.clearcoatNormalMap,Q=xe&&!!v.clearcoatRoughnessMap,G=b&&!!v.iridescenceMap,Y=b&&!!v.iridescenceThicknessMap,ae=x&&!!v.sheenColorMap,ue=x&&!!v.sheenRoughnessMap,le=!!v.specularMap,oe=!!v.specularColorMap,be=!!v.specularIntensityMap,Ce=L&&!!v.transmissionMap,Ie=L&&!!v.thicknessMap,F=!!v.gradientMap,_e=!!v.alphaMap,ne=v.alphaTest>0,ve=!!v.alphaHash,Ee=!!v.extensions;let re=ln;v.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(re=n.toneMapping);const Pe={shaderID:ce,shaderType:v.type,shaderName:v.name,vertexShader:Qe,fragmentShader:Ve,defines:v.defines,customVertexShaderID:te,customFragmentShaderID:fe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:pe,batchingColor:pe&&D._colorsTexture!==null,instancing:de,instancingColor:de&&D.instanceColor!==null,instancingMorph:de&&D.morphTexture!==null,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Xe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ke,matcap:Be,envMap:et,envMapMode:et&&W.mapping,envMapCubeUVHeight:se,aoMap:Ye,lightMap:je,bumpMap:dt,normalMap:pt,displacementMap:_t,emissiveMap:vt,normalMapObjectSpace:pt&&v.normalMapType===Uu,normalMapTangentSpace:pt&&v.normalMapType===Fo,packedNormalMap:pt&&v.normalMapType===Fo&&Qg(v.normalMap.format),metalnessMap:ot,roughnessMap:ie,anisotropy:N,anisotropyMap:O,clearcoat:xe,clearcoatMap:V,clearcoatNormalMap:ee,clearcoatRoughnessMap:Q,dispersion:ge,iridescence:b,iridescenceMap:G,iridescenceThicknessMap:Y,sheen:x,sheenColorMap:ae,sheenRoughnessMap:ue,specularMap:le,specularColorMap:oe,specularIntensityMap:be,transmission:L,transmissionMap:Ce,thicknessMap:Ie,gradientMap:F,opaque:v.transparent===!1&&v.blending===vi&&v.alphaToCoverage===!1,alphaMap:_e,alphaTest:ne,alphaHash:ve,combine:v.combine,mapUv:ke&&_(v.map.channel),aoMapUv:Ye&&_(v.aoMap.channel),lightMapUv:je&&_(v.lightMap.channel),bumpMapUv:dt&&_(v.bumpMap.channel),normalMapUv:pt&&_(v.normalMap.channel),displacementMapUv:_t&&_(v.displacementMap.channel),emissiveMapUv:vt&&_(v.emissiveMap.channel),metalnessMapUv:ot&&_(v.metalnessMap.channel),roughnessMapUv:ie&&_(v.roughnessMap.channel),anisotropyMapUv:O&&_(v.anisotropyMap.channel),clearcoatMapUv:V&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:G&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(v.sheenRoughnessMap.channel),specularMapUv:le&&_(v.specularMap.channel),specularColorMapUv:oe&&_(v.specularColorMap.channel),specularIntensityMapUv:be&&_(v.specularIntensityMap.channel),transmissionMapUv:Ce&&_(v.transmissionMap.channel),thicknessMapUv:Ie&&_(v.thicknessMap.channel),alphaMapUv:_e&&_(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(pt||N),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!k.attributes.uv&&(ke||_e),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&pt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:he,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:He,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:ke&&v.map.isVideoTexture===!0&&Xe.getTransfer(v.map.colorSpace)===tt,decodeVideoTextureEmissive:vt&&v.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(v.emissiveMap.colorSpace)===tt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===xn,flipSided:v.side===It,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ee&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&v.extensions.multiDraw===!0||pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Pe.vertexUv1s=d.has(1),Pe.vertexUv2s=d.has(2),Pe.vertexUv3s=d.has(3),d.clear(),Pe}function p(v){const C=[];if(v.shaderID?C.push(v.shaderID):(C.push(v.customVertexShaderID),C.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)C.push(I),C.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(u(C,v),T(C,v),C.push(n.outputColorSpace)),C.push(v.customProgramCacheKey),C.join()}function u(v,C){v.push(C.precision),v.push(C.outputColorSpace),v.push(C.envMapMode),v.push(C.envMapCubeUVHeight),v.push(C.mapUv),v.push(C.alphaMapUv),v.push(C.lightMapUv),v.push(C.aoMapUv),v.push(C.bumpMapUv),v.push(C.normalMapUv),v.push(C.displacementMapUv),v.push(C.emissiveMapUv),v.push(C.metalnessMapUv),v.push(C.roughnessMapUv),v.push(C.anisotropyMapUv),v.push(C.clearcoatMapUv),v.push(C.clearcoatNormalMapUv),v.push(C.clearcoatRoughnessMapUv),v.push(C.iridescenceMapUv),v.push(C.iridescenceThicknessMapUv),v.push(C.sheenColorMapUv),v.push(C.sheenRoughnessMapUv),v.push(C.specularMapUv),v.push(C.specularColorMapUv),v.push(C.specularIntensityMapUv),v.push(C.transmissionMapUv),v.push(C.thicknessMapUv),v.push(C.combine),v.push(C.fogExp2),v.push(C.sizeAttenuation),v.push(C.morphTargetsCount),v.push(C.morphAttributeCount),v.push(C.numDirLights),v.push(C.numPointLights),v.push(C.numSpotLights),v.push(C.numSpotLightMaps),v.push(C.numHemiLights),v.push(C.numRectAreaLights),v.push(C.numDirLightShadows),v.push(C.numPointLightShadows),v.push(C.numSpotLightShadows),v.push(C.numSpotLightShadowsWithMaps),v.push(C.numLightProbes),v.push(C.shadowMapType),v.push(C.toneMapping),v.push(C.numClippingPlanes),v.push(C.numClipIntersection),v.push(C.depthPacking)}function T(v,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function R(v){const C=g[v.type];let I;if(C){const P=rn[C];I=Mh.clone(P.uniforms)}else I=v.uniforms;return I}function y(v,C){let I=h.get(C);return I!==void 0?++I.usedTimes:(I=new Yg(n,C,v,s),c.push(I),h.set(C,I)),I}function w(v){if(--v.usedTimes===0){const C=c.indexOf(v);c[C]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){l.remove(v)}function A(){l.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:R,acquireProgram:y,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:A}}function t_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let l=n.get(a);return l===void 0&&(l={},n.set(a,l)),l}function i(a){n.delete(a)}function s(a,l,d){n.get(a)[l]=d}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function n_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Nl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Pl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f){let g=0;return f.isInstancedMesh&&(g+=2),f.isSkinnedMesh&&(g+=1),g}function l(f,g,_,M,p,u){let T=n[e];return T===void 0?(T={id:f.id,object:f,geometry:g,material:_,materialVariant:a(f),groupOrder:M,renderOrder:f.renderOrder,z:p,group:u},n[e]=T):(T.id=f.id,T.object=f,T.geometry=g,T.material=_,T.materialVariant=a(f),T.groupOrder=M,T.renderOrder=f.renderOrder,T.z=p,T.group=u),e++,T}function d(f,g,_,M,p,u){const T=l(f,g,_,M,p,u);_.transmission>0?i.push(T):_.transparent===!0?s.push(T):t.push(T)}function c(f,g,_,M,p,u){const T=l(f,g,_,M,p,u);_.transmission>0?i.unshift(T):_.transparent===!0?s.unshift(T):t.unshift(T)}function h(f,g,_){t.length>1&&t.sort(f||n_),i.length>1&&i.sort(g||Nl),s.length>1&&s.sort(g||Nl),_&&(t.reverse(),i.reverse(),s.reverse())}function m(){for(let f=e,g=n.length;f<g;f++){const _=n[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:d,unshift:c,finish:m,sort:h}}function i_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Pl,n.set(i,[a])):s>=r.length?(a=new Pl,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function s_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new $e};break;case"SpotLight":t={position:new q,direction:new q,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function r_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let a_=0;function o_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function l_(n){const e=new s_,t=r_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const s=new q,r=new ct,a=new ct;function l(c){let h=0,m=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let g=0,_=0,M=0,p=0,u=0,T=0,R=0,y=0,w=0,S=0,A=0;c.sort(o_);for(let C=0,I=c.length;C<I;C++){const P=c[C],D=P.color,K=P.intensity,H=P.distance;let k=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Jn?k=P.shadow.map.texture:k=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*K,m+=D.g*K,f+=D.b*K;else if(P.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(P.sh.coefficients[$],K);A++}else if(P.isDirectionalLight){const $=e.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const U=P.shadow,W=t.get(P);W.shadowIntensity=U.intensity,W.shadowBias=U.bias,W.shadowNormalBias=U.normalBias,W.shadowRadius=U.radius,W.shadowMapSize=U.mapSize,i.directionalShadow[g]=W,i.directionalShadowMap[g]=k,i.directionalShadowMatrix[g]=P.shadow.matrix,T++}i.directional[g]=$,g++}else if(P.isSpotLight){const $=e.get(P);$.position.setFromMatrixPosition(P.matrixWorld),$.color.copy(D).multiplyScalar(K),$.distance=H,$.coneCos=Math.cos(P.angle),$.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),$.decay=P.decay,i.spot[M]=$;const U=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,U.updateMatrices(P),P.castShadow&&S++),i.spotLightMatrix[M]=U.matrix,P.castShadow){const W=t.get(P);W.shadowIntensity=U.intensity,W.shadowBias=U.bias,W.shadowNormalBias=U.normalBias,W.shadowRadius=U.radius,W.shadowMapSize=U.mapSize,i.spotShadow[M]=W,i.spotShadowMap[M]=k,y++}M++}else if(P.isRectAreaLight){const $=e.get(P);$.color.copy(D).multiplyScalar(K),$.halfWidth.set(P.width*.5,0,0),$.halfHeight.set(0,P.height*.5,0),i.rectArea[p]=$,p++}else if(P.isPointLight){const $=e.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity),$.distance=P.distance,$.decay=P.decay,P.castShadow){const U=P.shadow,W=t.get(P);W.shadowIntensity=U.intensity,W.shadowBias=U.bias,W.shadowNormalBias=U.normalBias,W.shadowRadius=U.radius,W.shadowMapSize=U.mapSize,W.shadowCameraNear=U.camera.near,W.shadowCameraFar=U.camera.far,i.pointShadow[_]=W,i.pointShadowMap[_]=k,i.pointShadowMatrix[_]=P.shadow.matrix,R++}i.point[_]=$,_++}else if(P.isHemisphereLight){const $=e.get(P);$.skyColor.copy(P.color).multiplyScalar(K),$.groundColor.copy(P.groundColor).multiplyScalar(K),i.hemi[u]=$,u++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=f;const v=i.hash;(v.directionalLength!==g||v.pointLength!==_||v.spotLength!==M||v.rectAreaLength!==p||v.hemiLength!==u||v.numDirectionalShadows!==T||v.numPointShadows!==R||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==A)&&(i.directional.length=g,i.spot.length=M,i.rectArea.length=p,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=y+w-S,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=A,v.directionalLength=g,v.pointLength=_,v.spotLength=M,v.rectAreaLength=p,v.hemiLength=u,v.numDirectionalShadows=T,v.numPointShadows=R,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=A,i.version=a_++)}function d(c,h){let m=0,f=0,g=0,_=0,M=0;const p=h.matrixWorldInverse;for(let u=0,T=c.length;u<T;u++){const R=c[u];if(R.isDirectionalLight){const y=i.directional[m];y.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(R.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(R.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),g++}else if(R.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(R.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(R.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(R.width*.5,0,0),y.halfHeight.set(0,R.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(R.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(R.matrixWorld),y.position.applyMatrix4(p),f++}else if(R.isHemisphereLight){const y=i.hemi[M];y.direction.setFromMatrixPosition(R.matrixWorld),y.direction.transformDirection(p),M++}}}return{setup:l,setupView:d,state:i}}function Dl(n){const e=new l_(n),t=[],i=[],s=[];function r(f){m.camera=f,t.length=0,i.length=0,s.length=0}function a(f){t.push(f)}function l(f){i.push(f)}function d(f){s.push(f)}function c(){e.setup(t)}function h(f){e.setupView(t,f)}const m={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:m,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:l,pushLightProbeGrid:d}}function c_(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let l;return a===void 0?(l=new Dl(n),e.set(s,[l])):r>=a.length?(l=new Dl(n),a.push(l)):l=a[r],l}function i(){e=new WeakMap}return{get:t,dispose:i}}const d_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u_=`uniform sampler2D shadow_pass;
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
}`,h_=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],f_=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],Ll=new ct,Fi=new q,Or=new q;function p_(n,e,t){let i=new Ka;const s=new Je,r=new Je,a=new lt,l=new bh,d=new Th,c={},h=t.maxTextureSize,m={[On]:It,[It]:On,[xn]:xn},f=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:d_,fragmentShader:u_}),g=f.clone();g.defines.HORIZONTAL_PASS=1;const _=new Kt;_.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new jt(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=As;let u=this.type;this.render=function(S,A,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===hu&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=As);const C=n.getRenderTarget(),I=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Sn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const K=u!==this.type;K&&A.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(k=>k.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,k=S.length;H<k;H++){const $=S[H],U=$.shadow;if(U===void 0){Ue("WebGLShadowMap:",$,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const W=U.getFrameExtents();s.multiply(W),r.copy(U.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,U.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,U.mapSize.y=r.y));const se=n.state.buffers.depth.getReversed();if(U.camera._reversedDepth=se,U.map===null||K===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===Oi){if($.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new cn(s.x,s.y,{format:Jn,type:bn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),U.map.texture.name=$.name+".shadowMap",U.map.depthTexture=new wi(s.x,s.y,an),U.map.depthTexture.name=$.name+".shadowMapDepth",U.map.depthTexture.format=Tn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=bt,U.map.depthTexture.magFilter=bt}else $.isPointLight?(U.map=new jc(s.x),U.map.depthTexture=new xh(s.x,dn)):(U.map=new cn(s.x,s.y),U.map.depthTexture=new wi(s.x,s.y,dn)),U.map.depthTexture.name=$.name+".shadowMap",U.map.depthTexture.format=Tn,this.type===As?(U.map.depthTexture.compareFunction=se?$a:qa,U.map.depthTexture.minFilter=Rt,U.map.depthTexture.magFilter=Rt):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=bt,U.map.depthTexture.magFilter=bt);U.camera.updateProjectionMatrix()}const ce=U.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<ce;me++){if(U.map.isWebGLCubeRenderTarget)n.setRenderTarget(U.map,me),n.clear();else{me===0&&(n.setRenderTarget(U.map),n.clear());const Te=U.getViewport(me);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),D.viewport(a)}if($.isPointLight){const Te=U.camera,He=U.matrix,Qe=$.distance||Te.far;Qe!==Te.far&&(Te.far=Qe,Te.updateProjectionMatrix()),Fi.setFromMatrixPosition($.matrixWorld),Te.position.copy(Fi),Or.copy(Te.position),Or.add(h_[me]),Te.up.copy(f_[me]),Te.lookAt(Or),Te.updateMatrixWorld(),He.makeTranslation(-Fi.x,-Fi.y,-Fi.z),Ll.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Ll,Te.coordinateSystem,Te.reversedDepth)}else U.updateMatrices($);i=U.getFrustum(),y(A,v,U.camera,$,this.type)}U.isPointLightShadow!==!0&&this.type===Oi&&T(U,v),U.needsUpdate=!1}u=this.type,p.needsUpdate=!1,n.setRenderTarget(C,I,P)};function T(S,A){const v=e.update(M);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,g.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,g.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new cn(s.x,s.y,{format:Jn,type:bn})),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(A,null,v,f,M,null),g.uniforms.shadow_pass.value=S.mapPass.texture,g.uniforms.resolution.value=S.mapSize,g.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(A,null,v,g,M,null)}function R(S,A,v,C){let I=null;const P=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)I=P;else if(I=v.isPointLight===!0?d:l,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=I.uuid,K=A.uuid;let H=c[D];H===void 0&&(H={},c[D]=H);let k=H[K];k===void 0&&(k=I.clone(),H[K]=k,A.addEventListener("dispose",w)),I=k}if(I.visible=A.visible,I.wireframe=A.wireframe,C===Oi?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:m[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const D=n.properties.get(I);D.light=v}return I}function y(S,A,v,C,I){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===Oi)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);const K=e.update(S),H=S.material;if(Array.isArray(H)){const k=K.groups;for(let $=0,U=k.length;$<U;$++){const W=k[$],se=H[W.materialIndex];if(se&&se.visible){const ce=R(S,se,C,I);S.onBeforeShadow(n,S,A,v,K,ce,W),n.renderBufferDirect(v,null,K,ce,S,W),S.onAfterShadow(n,S,A,v,K,ce,W)}}}else if(H.visible){const k=R(S,H,C,I);S.onBeforeShadow(n,S,A,v,K,k,null),n.renderBufferDirect(v,null,K,k,S,null),S.onAfterShadow(n,S,A,v,K,k,null)}}const D=S.children;for(let K=0,H=D.length;K<H;K++)y(D[K],A,v,C,I)}function w(S){S.target.removeEventListener("dispose",w);for(const v in c){const C=c[v],I=S.target.uuid;I in C&&(C[I].dispose(),delete C[I])}}}function m_(n,e){function t(){let F=!1;const _e=new lt;let ne=null;const ve=new lt(0,0,0,0);return{setMask:function(Ee){ne!==Ee&&!F&&(n.colorMask(Ee,Ee,Ee,Ee),ne=Ee)},setLocked:function(Ee){F=Ee},setClear:function(Ee,re,Pe,Re,ut){ut===!0&&(Ee*=Re,re*=Re,Pe*=Re),_e.set(Ee,re,Pe,Re),ve.equals(_e)===!1&&(n.clearColor(Ee,re,Pe,Re),ve.copy(_e))},reset:function(){F=!1,ne=null,ve.set(-1,0,0,0)}}}function i(){let F=!1,_e=!1,ne=null,ve=null,Ee=null;return{setReversed:function(re){if(_e!==re){const Pe=e.get("EXT_clip_control");re?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),_e=re;const Re=Ee;Ee=null,this.setClear(Re)}},getReversed:function(){return _e},setTest:function(re){re?z(n.DEPTH_TEST):he(n.DEPTH_TEST)},setMask:function(re){ne!==re&&!F&&(n.depthMask(re),ne=re)},setFunc:function(re){if(_e&&(re=ju[re]),ve!==re){switch(re){case $r:n.depthFunc(n.NEVER);break;case Yr:n.depthFunc(n.ALWAYS);break;case Zr:n.depthFunc(n.LESS);break;case bi:n.depthFunc(n.LEQUAL);break;case Kr:n.depthFunc(n.EQUAL);break;case Jr:n.depthFunc(n.GEQUAL);break;case Qr:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=re}},setLocked:function(re){F=re},setClear:function(re){Ee!==re&&(Ee=re,_e&&(re=1-re),n.clearDepth(re))},reset:function(){F=!1,ne=null,ve=null,Ee=null,_e=!1}}}function s(){let F=!1,_e=null,ne=null,ve=null,Ee=null,re=null,Pe=null,Re=null,ut=null;return{setTest:function(rt){F||(rt?z(n.STENCIL_TEST):he(n.STENCIL_TEST))},setMask:function(rt){_e!==rt&&!F&&(n.stencilMask(rt),_e=rt)},setFunc:function(rt,Jt,Qt){(ne!==rt||ve!==Jt||Ee!==Qt)&&(n.stencilFunc(rt,Jt,Qt),ne=rt,ve=Jt,Ee=Qt)},setOp:function(rt,Jt,Qt){(re!==rt||Pe!==Jt||Re!==Qt)&&(n.stencilOp(rt,Jt,Qt),re=rt,Pe=Jt,Re=Qt)},setLocked:function(rt){F=rt},setClear:function(rt){ut!==rt&&(n.clearStencil(rt),ut=rt)},reset:function(){F=!1,_e=null,ne=null,ve=null,Ee=null,re=null,Pe=null,Re=null,ut=null}}}const r=new t,a=new i,l=new s,d=new WeakMap,c=new WeakMap;let h={},m={},f={},g=new WeakMap,_=[],M=null,p=!1,u=null,T=null,R=null,y=null,w=null,S=null,A=null,v=new $e(0,0,0),C=0,I=!1,P=null,D=null,K=null,H=null,k=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,W=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(se)[1]),U=W>=1):se.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),U=W>=2);let ce=null,me={};const Te=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),Qe=new lt().fromArray(Te),Ve=new lt().fromArray(He);function te(F,_e,ne,ve){const Ee=new Uint8Array(4),re=n.createTexture();n.bindTexture(F,re),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<ne;Pe++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(_e+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return re}const fe={};fe[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),fe[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),fe[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),z(n.DEPTH_TEST),a.setFunc(bi),dt(!1),pt(Lo),z(n.CULL_FACE),Ye(Sn);function z(F){h[F]!==!0&&(n.enable(F),h[F]=!0)}function he(F){h[F]!==!1&&(n.disable(F),h[F]=!1)}function de(F,_e){return f[F]!==_e?(n.bindFramebuffer(F,_e),f[F]=_e,F===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=_e),F===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function pe(F,_e){let ne=_,ve=!1;if(F){ne=g.get(_e),ne===void 0&&(ne=[],g.set(_e,ne));const Ee=F.textures;if(ne.length!==Ee.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Pe=Ee.length;re<Pe;re++)ne[re]=n.COLOR_ATTACHMENT0+re;ne.length=Ee.length,ve=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,ve=!0);ve&&n.drawBuffers(ne)}function ke(F){return M!==F?(n.useProgram(F),M=F,!0):!1}const Be={[jn]:n.FUNC_ADD,[pu]:n.FUNC_SUBTRACT,[mu]:n.FUNC_REVERSE_SUBTRACT};Be[gu]=n.MIN,Be[_u]=n.MAX;const et={[xu]:n.ZERO,[vu]:n.ONE,[Mu]:n.SRC_COLOR,[Xr]:n.SRC_ALPHA,[wu]:n.SRC_ALPHA_SATURATE,[bu]:n.DST_COLOR,[yu]:n.DST_ALPHA,[Su]:n.ONE_MINUS_SRC_COLOR,[qr]:n.ONE_MINUS_SRC_ALPHA,[Tu]:n.ONE_MINUS_DST_COLOR,[Eu]:n.ONE_MINUS_DST_ALPHA,[Au]:n.CONSTANT_COLOR,[Ru]:n.ONE_MINUS_CONSTANT_COLOR,[Cu]:n.CONSTANT_ALPHA,[Nu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ye(F,_e,ne,ve,Ee,re,Pe,Re,ut,rt){if(F===Sn){p===!0&&(he(n.BLEND),p=!1);return}if(p===!1&&(z(n.BLEND),p=!0),F!==fu){if(F!==u||rt!==I){if((T!==jn||w!==jn)&&(n.blendEquation(n.FUNC_ADD),T=jn,w=jn),rt)switch(F){case vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bs:n.blendFunc(n.ONE,n.ONE);break;case Io:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ke("WebGLState: Invalid blending: ",F);break}else switch(F){case vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Io:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uo:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",F);break}R=null,y=null,S=null,A=null,v.set(0,0,0),C=0,u=F,I=rt}return}Ee=Ee||_e,re=re||ne,Pe=Pe||ve,(_e!==T||Ee!==w)&&(n.blendEquationSeparate(Be[_e],Be[Ee]),T=_e,w=Ee),(ne!==R||ve!==y||re!==S||Pe!==A)&&(n.blendFuncSeparate(et[ne],et[ve],et[re],et[Pe]),R=ne,y=ve,S=re,A=Pe),(Re.equals(v)===!1||ut!==C)&&(n.blendColor(Re.r,Re.g,Re.b,ut),v.copy(Re),C=ut),u=F,I=!1}function je(F,_e){F.side===xn?he(n.CULL_FACE):z(n.CULL_FACE);let ne=F.side===It;_e&&(ne=!ne),dt(ne),F.blending===vi&&F.transparent===!1?Ye(Sn):Ye(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const ve=F.stencilWrite;l.setTest(ve),ve&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),vt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?z(n.SAMPLE_ALPHA_TO_COVERAGE):he(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(F){P!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),P=F)}function pt(F){F!==du?(z(n.CULL_FACE),F!==D&&(F===Lo?n.cullFace(n.BACK):F===uu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):he(n.CULL_FACE),D=F}function _t(F){F!==K&&(U&&n.lineWidth(F),K=F)}function vt(F,_e,ne){F?(z(n.POLYGON_OFFSET_FILL),(H!==_e||k!==ne)&&(H=_e,k=ne,a.getReversed()&&(_e=-_e),n.polygonOffset(_e,ne))):he(n.POLYGON_OFFSET_FILL)}function ot(F){F?z(n.SCISSOR_TEST):he(n.SCISSOR_TEST)}function ie(F){F===void 0&&(F=n.TEXTURE0+$-1),ce!==F&&(n.activeTexture(F),ce=F)}function N(F,_e,ne){ne===void 0&&(ce===null?ne=n.TEXTURE0+$-1:ne=ce);let ve=me[ne];ve===void 0&&(ve={type:void 0,texture:void 0},me[ne]=ve),(ve.type!==F||ve.texture!==_e)&&(ce!==ne&&(n.activeTexture(ne),ce=ne),n.bindTexture(F,_e||fe[F]),ve.type=F,ve.texture=_e)}function xe(){const F=me[ce];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ge(){try{n.compressedTexImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function x(){try{n.texSubImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function L(){try{n.texSubImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function O(){try{n.compressedTexSubImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function V(){try{n.compressedTexSubImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function ee(){try{n.texStorage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function Q(){try{n.texStorage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function G(){try{n.texImage2D(...arguments)}catch(F){Ke("WebGLState:",F)}}function Y(){try{n.texImage3D(...arguments)}catch(F){Ke("WebGLState:",F)}}function ae(F){return m[F]!==void 0?m[F]:n.getParameter(F)}function ue(F,_e){m[F]!==_e&&(n.pixelStorei(F,_e),m[F]=_e)}function le(F){Qe.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Qe.copy(F))}function oe(F){Ve.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Ve.copy(F))}function be(F,_e){let ne=c.get(_e);ne===void 0&&(ne=new WeakMap,c.set(_e,ne));let ve=ne.get(F);ve===void 0&&(ve=n.getUniformBlockIndex(_e,F.name),ne.set(F,ve))}function Ce(F,_e){const ve=c.get(_e).get(F);d.get(_e)!==ve&&(n.uniformBlockBinding(_e,ve,F.__bindingPointIndex),d.set(_e,ve))}function Ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},m={},ce=null,me={},f={},g=new WeakMap,_=[],M=null,p=!1,u=null,T=null,R=null,y=null,w=null,S=null,A=null,v=new $e(0,0,0),C=0,I=!1,P=null,D=null,K=null,H=null,k=null,Qe.set(0,0,n.canvas.width,n.canvas.height),Ve.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:z,disable:he,bindFramebuffer:de,drawBuffers:pe,useProgram:ke,setBlending:Ye,setMaterial:je,setFlipSided:dt,setCullFace:pt,setLineWidth:_t,setPolygonOffset:vt,setScissorTest:ot,activeTexture:ie,bindTexture:N,unbindTexture:xe,compressedTexImage2D:ge,compressedTexImage3D:b,texImage2D:G,texImage3D:Y,pixelStorei:ue,getParameter:ae,updateUBOMapping:be,uniformBlockBinding:Ce,texStorage2D:ee,texStorage3D:Q,texSubImage2D:x,texSubImage3D:L,compressedTexSubImage2D:O,compressedTexSubImage3D:V,scissor:le,viewport:oe,reset:Ie}}function g_(n,e,t,i,s,r,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Je,h=new WeakMap,m=new Set;let f;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(b,x){return _?new OffscreenCanvas(b,x):Hs("canvas")}function p(b,x,L){let O=1;const V=ge(b);if((V.width>L||V.height>L)&&(O=L/Math.max(V.width,V.height)),O<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const ee=Math.floor(O*V.width),Q=Math.floor(O*V.height);f===void 0&&(f=M(ee,Q));const G=x?M(ee,Q):f;return G.width=ee,G.height=Q,G.getContext("2d").drawImage(b,0,0,ee,Q),Ue("WebGLRenderer: Texture has been resized from ("+V.width+"x"+V.height+") to ("+ee+"x"+Q+")."),G}else return"data"in b&&Ue("WebGLRenderer: Image in DataTexture is too big ("+V.width+"x"+V.height+")."),b;return b}function u(b){return b.generateMipmaps}function T(b){n.generateMipmap(b)}function R(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,x,L,O,V,ee=!1){if(b!==null){if(n[b]!==void 0)return n[b];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Q;O&&(Q=e.get("EXT_texture_norm16"),Q||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let G=x;if(x===n.RED&&(L===n.FLOAT&&(G=n.R32F),L===n.HALF_FLOAT&&(G=n.R16F),L===n.UNSIGNED_BYTE&&(G=n.R8),L===n.UNSIGNED_SHORT&&Q&&(G=Q.R16_EXT),L===n.SHORT&&Q&&(G=Q.R16_SNORM_EXT)),x===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(G=n.R8UI),L===n.UNSIGNED_SHORT&&(G=n.R16UI),L===n.UNSIGNED_INT&&(G=n.R32UI),L===n.BYTE&&(G=n.R8I),L===n.SHORT&&(G=n.R16I),L===n.INT&&(G=n.R32I)),x===n.RG&&(L===n.FLOAT&&(G=n.RG32F),L===n.HALF_FLOAT&&(G=n.RG16F),L===n.UNSIGNED_BYTE&&(G=n.RG8),L===n.UNSIGNED_SHORT&&Q&&(G=Q.RG16_EXT),L===n.SHORT&&Q&&(G=Q.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(G=n.RG8UI),L===n.UNSIGNED_SHORT&&(G=n.RG16UI),L===n.UNSIGNED_INT&&(G=n.RG32UI),L===n.BYTE&&(G=n.RG8I),L===n.SHORT&&(G=n.RG16I),L===n.INT&&(G=n.RG32I)),x===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(G=n.RGB8UI),L===n.UNSIGNED_SHORT&&(G=n.RGB16UI),L===n.UNSIGNED_INT&&(G=n.RGB32UI),L===n.BYTE&&(G=n.RGB8I),L===n.SHORT&&(G=n.RGB16I),L===n.INT&&(G=n.RGB32I)),x===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),L===n.UNSIGNED_INT&&(G=n.RGBA32UI),L===n.BYTE&&(G=n.RGBA8I),L===n.SHORT&&(G=n.RGBA16I),L===n.INT&&(G=n.RGBA32I)),x===n.RGB&&(L===n.UNSIGNED_SHORT&&Q&&(G=Q.RGB16_EXT),L===n.SHORT&&Q&&(G=Q.RGB16_SNORM_EXT),L===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),L===n.UNSIGNED_INT_10F_11F_11F_REV&&(G=n.R11F_G11F_B10F)),x===n.RGBA){const Y=ee?Vs:Xe.getTransfer(V);L===n.FLOAT&&(G=n.RGBA32F),L===n.HALF_FLOAT&&(G=n.RGBA16F),L===n.UNSIGNED_BYTE&&(G=Y===tt?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT&&Q&&(G=Q.RGBA16_EXT),L===n.SHORT&&Q&&(G=Q.RGBA16_SNORM_EXT),L===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function w(b,x){let L;return b?x===null||x===dn||x===Vi?L=n.DEPTH24_STENCIL8:x===an?L=n.DEPTH32F_STENCIL8:x===Gi&&(L=n.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===dn||x===Vi?L=n.DEPTH_COMPONENT24:x===an?L=n.DEPTH_COMPONENT32F:x===Gi&&(L=n.DEPTH_COMPONENT16),L}function S(b,x){return u(b)===!0||b.isFramebufferTexture&&b.minFilter!==bt&&b.minFilter!==Rt?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function A(b){const x=b.target;x.removeEventListener("dispose",A),C(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&m.delete(x)}function v(b){const x=b.target;x.removeEventListener("dispose",v),P(x)}function C(b){const x=i.get(b);if(x.__webglInit===void 0)return;const L=b.source,O=g.get(L);if(O){const V=O[x.__cacheKey];V.usedTimes--,V.usedTimes===0&&I(b),Object.keys(O).length===0&&g.delete(L)}i.remove(b)}function I(b){const x=i.get(b);n.deleteTexture(x.__webglTexture);const L=b.source,O=g.get(L);delete O[x.__cacheKey],a.memory.textures--}function P(b){const x=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(x.__webglFramebuffer[O]))for(let V=0;V<x.__webglFramebuffer[O].length;V++)n.deleteFramebuffer(x.__webglFramebuffer[O][V]);else n.deleteFramebuffer(x.__webglFramebuffer[O]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[O])}else{if(Array.isArray(x.__webglFramebuffer))for(let O=0;O<x.__webglFramebuffer.length;O++)n.deleteFramebuffer(x.__webglFramebuffer[O]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let O=0;O<x.__webglColorRenderbuffer.length;O++)x.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[O]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const L=b.textures;for(let O=0,V=L.length;O<V;O++){const ee=i.get(L[O]);ee.__webglTexture&&(n.deleteTexture(ee.__webglTexture),a.memory.textures--),i.remove(L[O])}i.remove(b)}let D=0;function K(){D=0}function H(){return D}function k(b){D=b}function $(){const b=D;return b>=s.maxTextures&&Ue("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),D+=1,b}function U(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function W(b,x){const L=i.get(b);if(b.isVideoTexture&&N(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&L.__version!==b.version){const O=b.image;if(O===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{he(L,b,x);return}}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+x)}function se(b,x){const L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){he(L,b,x);return}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+x)}function ce(b,x){const L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){he(L,b,x);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+x)}function me(b,x){const L=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&L.__version!==b.version){de(L,b,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+x)}const Te={[ta]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[na]:n.MIRRORED_REPEAT},He={[bt]:n.NEAREST,[Lu]:n.NEAREST_MIPMAP_NEAREST,[Qi]:n.NEAREST_MIPMAP_LINEAR,[Rt]:n.LINEAR,[rr]:n.LINEAR_MIPMAP_NEAREST,[qn]:n.LINEAR_MIPMAP_LINEAR},Qe={[Fu]:n.NEVER,[Gu]:n.ALWAYS,[Ou]:n.LESS,[qa]:n.LEQUAL,[Bu]:n.EQUAL,[$a]:n.GEQUAL,[zu]:n.GREATER,[ku]:n.NOTEQUAL};function Ve(b,x){if(x.type===an&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Rt||x.magFilter===rr||x.magFilter===Qi||x.magFilter===qn||x.minFilter===Rt||x.minFilter===rr||x.minFilter===Qi||x.minFilter===qn)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Te[x.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Te[x.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Te[x.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,He[x.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,He[x.minFilter]),x.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Qe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===bt||x.minFilter!==Qi&&x.minFilter!==qn||x.type===an&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function te(b,x){let L=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",A));const O=x.source;let V=g.get(O);V===void 0&&(V={},g.set(O,V));const ee=U(x);if(ee!==b.__cacheKey){V[ee]===void 0&&(V[ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),V[ee].usedTimes++;const Q=V[b.__cacheKey];Q!==void 0&&(V[b.__cacheKey].usedTimes--,Q.usedTimes===0&&I(x)),b.__cacheKey=ee,b.__webglTexture=V[ee].texture}return L}function fe(b,x,L){return Math.floor(Math.floor(b/L)/x)}function z(b,x,L,O){const ee=b.updateRanges;if(ee.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,L,O,x.data);else{ee.sort((ue,le)=>ue.start-le.start);let Q=0;for(let ue=1;ue<ee.length;ue++){const le=ee[Q],oe=ee[ue],be=le.start+le.count,Ce=fe(oe.start,x.width,4),Ie=fe(le.start,x.width,4);oe.start<=be+1&&Ce===Ie&&fe(oe.start+oe.count-1,x.width,4)===Ce?le.count=Math.max(le.count,oe.start+oe.count-le.start):(++Q,ee[Q]=oe)}ee.length=Q+1;const G=t.getParameter(n.UNPACK_ROW_LENGTH),Y=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ue=0,le=ee.length;ue<le;ue++){const oe=ee[ue],be=Math.floor(oe.start/4),Ce=Math.ceil(oe.count/4),Ie=be%x.width,F=Math.floor(be/x.width),_e=Ce,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ie),t.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,Ie,F,_e,ne,L,O,x.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,G),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function he(b,x,L){let O=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(O=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(O=n.TEXTURE_3D);const V=te(b,x),ee=x.source;t.bindTexture(O,b.__webglTexture,n.TEXTURE0+L);const Q=i.get(ee);if(ee.version!==Q.__version||V===!0){if(t.activeTexture(n.TEXTURE0+L),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ne=Xe.getPrimaries(Xe.workingColorSpace),ve=x.colorSpace===Un?null:Xe.getPrimaries(x.colorSpace),Ee=x.colorSpace===Un||ne===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let Y=p(x.image,!1,s.maxTextureSize);Y=xe(x,Y);const ae=r.convert(x.format,x.colorSpace),ue=r.convert(x.type);let le=y(x.internalFormat,ae,ue,x.normalized,x.colorSpace,x.isVideoTexture);Ve(O,x);let oe;const be=x.mipmaps,Ce=x.isVideoTexture!==!0,Ie=Q.__version===void 0||V===!0,F=ee.dataReady,_e=S(x,Y);if(x.isDepthTexture)le=w(x.format===$n,x.type),Ie&&(Ce?t.texStorage2D(n.TEXTURE_2D,1,le,Y.width,Y.height):t.texImage2D(n.TEXTURE_2D,0,le,Y.width,Y.height,0,ae,ue,null));else if(x.isDataTexture)if(be.length>0){Ce&&Ie&&t.texStorage2D(n.TEXTURE_2D,_e,le,be[0].width,be[0].height);for(let ne=0,ve=be.length;ne<ve;ne++)oe=be[ne],Ce?F&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,oe.width,oe.height,ae,ue,oe.data):t.texImage2D(n.TEXTURE_2D,ne,le,oe.width,oe.height,0,ae,ue,oe.data);x.generateMipmaps=!1}else Ce?(Ie&&t.texStorage2D(n.TEXTURE_2D,_e,le,Y.width,Y.height),F&&z(x,Y,ae,ue)):t.texImage2D(n.TEXTURE_2D,0,le,Y.width,Y.height,0,ae,ue,Y.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ce&&Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,le,be[0].width,be[0].height,Y.depth);for(let ne=0,ve=be.length;ne<ve;ne++)if(oe=be[ne],x.format!==Zt)if(ae!==null)if(Ce){if(F)if(x.layerUpdates.size>0){const Ee=dl(oe.width,oe.height,x.format,x.type);for(const re of x.layerUpdates){const Pe=oe.data.subarray(re*Ee/oe.data.BYTES_PER_ELEMENT,(re+1)*Ee/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,re,oe.width,oe.height,1,ae,Pe)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,oe.width,oe.height,Y.depth,ae,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,le,oe.width,oe.height,Y.depth,0,oe.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?F&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,oe.width,oe.height,Y.depth,ae,ue,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,le,oe.width,oe.height,Y.depth,0,ae,ue,oe.data)}else{Ce&&Ie&&t.texStorage2D(n.TEXTURE_2D,_e,le,be[0].width,be[0].height);for(let ne=0,ve=be.length;ne<ve;ne++)oe=be[ne],x.format!==Zt?ae!==null?Ce?F&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,le,oe.width,oe.height,0,oe.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?F&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,oe.width,oe.height,ae,ue,oe.data):t.texImage2D(n.TEXTURE_2D,ne,le,oe.width,oe.height,0,ae,ue,oe.data)}else if(x.isDataArrayTexture)if(Ce){if(Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,le,Y.width,Y.height,Y.depth),F)if(x.layerUpdates.size>0){const ne=dl(Y.width,Y.height,x.format,x.type);for(const ve of x.layerUpdates){const Ee=Y.data.subarray(ve*ne/Y.data.BYTES_PER_ELEMENT,(ve+1)*ne/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ve,Y.width,Y.height,1,ae,ue,Ee)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,ae,ue,Y.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,Y.width,Y.height,Y.depth,0,ae,ue,Y.data);else if(x.isData3DTexture)Ce?(Ie&&t.texStorage3D(n.TEXTURE_3D,_e,le,Y.width,Y.height,Y.depth),F&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,ae,ue,Y.data)):t.texImage3D(n.TEXTURE_3D,0,le,Y.width,Y.height,Y.depth,0,ae,ue,Y.data);else if(x.isFramebufferTexture){if(Ie)if(Ce)t.texStorage2D(n.TEXTURE_2D,_e,le,Y.width,Y.height);else{let ne=Y.width,ve=Y.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,le,ne,ve,0,ae,ue,null),ne>>=1,ve>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),Y.parentNode!==ne){ne.appendChild(Y),m.add(x),ne.onpaint=ve=>{const Ee=ve.changedElements;for(const re of m)Ee.includes(re.image)&&(re.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Y);else{const Ee=n.RGBA,re=n.RGBA,Pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,re,Pe,Y)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(be.length>0){if(Ce&&Ie){const ne=ge(be[0]);t.texStorage2D(n.TEXTURE_2D,_e,le,ne.width,ne.height)}for(let ne=0,ve=be.length;ne<ve;ne++)oe=be[ne],Ce?F&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,ae,ue,oe):t.texImage2D(n.TEXTURE_2D,ne,le,ae,ue,oe);x.generateMipmaps=!1}else if(Ce){if(Ie){const ne=ge(Y);t.texStorage2D(n.TEXTURE_2D,_e,le,ne.width,ne.height)}F&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,ue,Y)}else t.texImage2D(n.TEXTURE_2D,0,le,ae,ue,Y);u(x)&&T(O),Q.__version=ee.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function de(b,x,L){if(x.image.length!==6)return;const O=te(b,x),V=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+L);const ee=i.get(V);if(V.version!==ee.__version||O===!0){t.activeTexture(n.TEXTURE0+L);const Q=Xe.getPrimaries(Xe.workingColorSpace),G=x.colorSpace===Un?null:Xe.getPrimaries(x.colorSpace),Y=x.colorSpace===Un||Q===G?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const ae=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,le=[];for(let re=0;re<6;re++)!ae&&!ue?le[re]=p(x.image[re],!0,s.maxCubemapSize):le[re]=ue?x.image[re].image:x.image[re],le[re]=xe(x,le[re]);const oe=le[0],be=r.convert(x.format,x.colorSpace),Ce=r.convert(x.type),Ie=y(x.internalFormat,be,Ce,x.normalized,x.colorSpace),F=x.isVideoTexture!==!0,_e=ee.__version===void 0||O===!0,ne=V.dataReady;let ve=S(x,oe);Ve(n.TEXTURE_CUBE_MAP,x);let Ee;if(ae){F&&_e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,Ie,oe.width,oe.height);for(let re=0;re<6;re++){Ee=le[re].mipmaps;for(let Pe=0;Pe<Ee.length;Pe++){const Re=Ee[Pe];x.format!==Zt?be!==null?F?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Re.width,Re.height,be,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Ie,Re.width,Re.height,0,Re.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,Re.width,Re.height,be,Ce,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Ie,Re.width,Re.height,0,be,Ce,Re.data)}}}else{if(Ee=x.mipmaps,F&&_e){Ee.length>0&&ve++;const re=ge(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,Ie,re.width,re.height)}for(let re=0;re<6;re++)if(ue){F?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,le[re].width,le[re].height,be,Ce,le[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ie,le[re].width,le[re].height,0,be,Ce,le[re].data);for(let Pe=0;Pe<Ee.length;Pe++){const ut=Ee[Pe].image[re].image;F?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,ut.width,ut.height,be,Ce,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Ie,ut.width,ut.height,0,be,Ce,ut.data)}}else{F?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,be,Ce,le[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ie,be,Ce,le[re]);for(let Pe=0;Pe<Ee.length;Pe++){const Re=Ee[Pe];F?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,be,Ce,Re.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Ie,be,Ce,Re.image[re])}}}u(x)&&T(n.TEXTURE_CUBE_MAP),ee.__version=V.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function pe(b,x,L,O,V,ee){const Q=r.convert(L.format,L.colorSpace),G=r.convert(L.type),Y=y(L.internalFormat,Q,G,L.normalized,L.colorSpace),ae=i.get(x),ue=i.get(L);if(ue.__renderTarget=x,!ae.__hasExternalTextures){const le=Math.max(1,x.width>>ee),oe=Math.max(1,x.height>>ee);V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?t.texImage3D(V,ee,Y,le,oe,x.depth,0,Q,G,null):t.texImage2D(V,ee,Y,le,oe,0,Q,G,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ie(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,O,V,ue.__webglTexture,0,ot(x)):(V===n.TEXTURE_2D||V>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&V<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,O,V,ue.__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(b,x,L){if(n.bindRenderbuffer(n.RENDERBUFFER,b),x.depthBuffer){const O=x.depthTexture,V=O&&O.isDepthTexture?O.type:null,ee=w(x.stencilBuffer,V),Q=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ie(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(x),ee,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(x),ee,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ee,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,b)}else{const O=x.textures;for(let V=0;V<O.length;V++){const ee=O[V],Q=r.convert(ee.format,ee.colorSpace),G=r.convert(ee.type),Y=y(ee.internalFormat,Q,G,ee.normalized,ee.colorSpace);ie(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(x),Y,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(x),Y,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Y,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(b,x,L){const O=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const V=i.get(x.depthTexture);if(V.__renderTarget=x,(!V.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),O){if(V.__webglInit===void 0&&(V.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),V.__webglTexture===void 0){V.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,x.depthTexture);const ae=r.convert(x.depthTexture.format),ue=r.convert(x.depthTexture.type);let le;x.depthTexture.format===Tn?le=n.DEPTH_COMPONENT24:x.depthTexture.format===$n&&(le=n.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,le,x.width,x.height,0,ae,ue,null)}}else W(x.depthTexture,0);const ee=V.__webglTexture,Q=ot(x),G=O?n.TEXTURE_CUBE_MAP_POSITIVE_X+L:n.TEXTURE_2D,Y=x.depthTexture.format===$n?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Tn)ie(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,G,ee,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,Y,G,ee,0);else if(x.depthTexture.format===$n)ie(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,G,ee,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,Y,G,ee,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(b){const x=i.get(b),L=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const O=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),O){const V=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,O.removeEventListener("dispose",V)};O.addEventListener("dispose",V),x.__depthDisposeCallback=V}x.__boundDepthTexture=O}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(L)for(let O=0;O<6;O++)Be(x.__webglFramebuffer[O],b,O);else{const O=b.texture.mipmaps;O&&O.length>0?Be(x.__webglFramebuffer[0],b,0):Be(x.__webglFramebuffer,b,0)}else if(L){x.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[O]),x.__webglDepthbuffer[O]===void 0)x.__webglDepthbuffer[O]=n.createRenderbuffer(),ke(x.__webglDepthbuffer[O],b,!1);else{const V=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=x.__webglDepthbuffer[O];n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,V,n.RENDERBUFFER,ee)}}else{const O=b.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ke(x.__webglDepthbuffer,b,!1);else{const V=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,V,n.RENDERBUFFER,ee)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(b,x,L){const O=i.get(b);x!==void 0&&pe(O.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&et(b)}function je(b){const x=b.texture,L=i.get(b),O=i.get(x);b.addEventListener("dispose",v);const V=b.textures,ee=b.isWebGLCubeRenderTarget===!0,Q=V.length>1;if(Q||(O.__webglTexture===void 0&&(O.__webglTexture=n.createTexture()),O.__version=x.version,a.memory.textures++),ee){L.__webglFramebuffer=[];for(let G=0;G<6;G++)if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[G]=[];for(let Y=0;Y<x.mipmaps.length;Y++)L.__webglFramebuffer[G][Y]=n.createFramebuffer()}else L.__webglFramebuffer[G]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let G=0;G<x.mipmaps.length;G++)L.__webglFramebuffer[G]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(Q)for(let G=0,Y=V.length;G<Y;G++){const ae=i.get(V[G]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&ie(b)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let G=0;G<V.length;G++){const Y=V[G];L.__webglColorRenderbuffer[G]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[G]);const ae=r.convert(Y.format,Y.colorSpace),ue=r.convert(Y.type),le=y(Y.internalFormat,ae,ue,Y.normalized,Y.colorSpace,b.isXRRenderTarget===!0),oe=ot(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,le,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+G,n.RENDERBUFFER,L.__webglColorRenderbuffer[G])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(L.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ee){t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,x);for(let G=0;G<6;G++)if(x.mipmaps&&x.mipmaps.length>0)for(let Y=0;Y<x.mipmaps.length;Y++)pe(L.__webglFramebuffer[G][Y],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+G,Y);else pe(L.__webglFramebuffer[G],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+G,0);u(x)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){for(let G=0,Y=V.length;G<Y;G++){const ae=V[G],ue=i.get(ae);let le=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(le=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),Ve(le,ae),pe(L.__webglFramebuffer,b,ae,n.COLOR_ATTACHMENT0+G,le,0),u(ae)&&T(le)}t.unbindTexture()}else{let G=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(G=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(G,O.__webglTexture),Ve(G,x),x.mipmaps&&x.mipmaps.length>0)for(let Y=0;Y<x.mipmaps.length;Y++)pe(L.__webglFramebuffer[Y],b,x,n.COLOR_ATTACHMENT0,G,Y);else pe(L.__webglFramebuffer,b,x,n.COLOR_ATTACHMENT0,G,0);u(x)&&T(G),t.unbindTexture()}b.depthBuffer&&et(b)}function dt(b){const x=b.textures;for(let L=0,O=x.length;L<O;L++){const V=x[L];if(u(V)){const ee=R(b),Q=i.get(V).__webglTexture;t.bindTexture(ee,Q),T(ee),t.unbindTexture()}}}const pt=[],_t=[];function vt(b){if(b.samples>0){if(ie(b)===!1){const x=b.textures,L=b.width,O=b.height;let V=n.COLOR_BUFFER_BIT;const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=i.get(b),G=x.length>1;if(G)for(let ae=0;ae<x.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Q.__webglMultisampledFramebuffer);const Y=b.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglFramebuffer);for(let ae=0;ae<x.length;ae++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(V|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(V|=n.STENCIL_BUFFER_BIT)),G){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Q.__webglColorRenderbuffer[ae]);const ue=i.get(x[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,L,O,0,0,L,O,V,n.NEAREST),d===!0&&(pt.length=0,_t.length=0,pt.push(n.COLOR_ATTACHMENT0+ae),b.depthBuffer&&b.resolveDepthBuffer===!1&&(pt.push(ee),_t.push(ee),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_t)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),G)for(let ae=0;ae<x.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,Q.__webglColorRenderbuffer[ae]);const ue=i.get(x[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Q.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&d){const x=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ot(b){return Math.min(s.maxSamples,b.samples)}function ie(b){const x=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(b){const x=a.render.frame;h.get(b)!==x&&(h.set(b,x),b.update())}function xe(b,x){const L=b.colorSpace,O=b.format,V=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||L!==Gs&&L!==Un&&(Xe.getTransfer(L)===tt?(O!==Zt||V!==kt)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",L)),x}function ge(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=K,this.getTextureUnits=H,this.setTextureUnits=k,this.setTexture2D=W,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=me,this.rebindTextures=Ye,this.setupRenderTarget=je,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=ie,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function __(n,e){function t(i,s=Un){let r;const a=Xe.getTransfer(s);if(i===kt)return n.UNSIGNED_BYTE;if(i===Va)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ha)return n.UNSIGNED_SHORT_5_5_5_1;if(i===bc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===yc)return n.BYTE;if(i===Ec)return n.SHORT;if(i===Gi)return n.UNSIGNED_SHORT;if(i===Ga)return n.INT;if(i===dn)return n.UNSIGNED_INT;if(i===an)return n.FLOAT;if(i===bn)return n.HALF_FLOAT;if(i===wc)return n.ALPHA;if(i===Ac)return n.RGB;if(i===Zt)return n.RGBA;if(i===Tn)return n.DEPTH_COMPONENT;if(i===$n)return n.DEPTH_STENCIL;if(i===Rc)return n.RED;if(i===Wa)return n.RED_INTEGER;if(i===Jn)return n.RG;if(i===ja)return n.RG_INTEGER;if(i===Xa)return n.RGBA_INTEGER;if(i===Rs||i===Cs||i===Ns||i===Ps)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Rs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Rs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ps)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ia||i===sa||i===ra||i===aa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oa||i===la||i===ca||i===da||i===ua||i===zs||i===ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oa||i===la)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ca)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===da)return r.COMPRESSED_R11_EAC;if(i===ua)return r.COMPRESSED_SIGNED_R11_EAC;if(i===zs)return r.COMPRESSED_RG11_EAC;if(i===ha)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fa||i===pa||i===ma||i===ga||i===_a||i===xa||i===va||i===Ma||i===Sa||i===ya||i===Ea||i===ba||i===Ta||i===wa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ma)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ga)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_a)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===va)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ma)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ya)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ea)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ba)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ta)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Aa||i===Ra||i===Ca)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Aa)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ca)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Na||i===Pa||i===ks||i===Da)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ks)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Da)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Vi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const x_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,v_=`
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

}`;class M_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Bc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new un({vertexShader:x_,fragmentShader:v_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new Yi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class S_ extends ti{constructor(e,t){super();const i=this;let s=null,r=1,a=null,l="local-floor",d=1,c=null,h=null,m=null,f=null,g=null,_=null;const M=typeof XRWebGLBinding<"u",p=new M_,u={},T=t.getContextAttributes();let R=null,y=null;const w=[],S=[],A=new Je;let v=null;const C=new zt;C.viewport=new lt;const I=new zt;I.viewport=new lt;const P=[C,I],D=new Nh;let K=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let fe=w[te];return fe===void 0&&(fe=new fr,w[te]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(te){let fe=w[te];return fe===void 0&&(fe=new fr,w[te]=fe),fe.getGripSpace()},this.getHand=function(te){let fe=w[te];return fe===void 0&&(fe=new fr,w[te]=fe),fe.getHandSpace()};function k(te){const fe=S.indexOf(te.inputSource);if(fe===-1)return;const z=w[fe];z!==void 0&&(z.update(te.inputSource,te.frame,c||a),z.dispatchEvent({type:te.type,data:te.inputSource}))}function $(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",U);for(let te=0;te<w.length;te++){const fe=S[te];fe!==null&&(S[te]=null,w[te].disconnect(fe))}K=null,H=null,p.reset();for(const te in u)delete u[te];e.setRenderTarget(R),g=null,f=null,m=null,s=null,y=null,Ve.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){l=te,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return f!==null?f:g},this.getBinding=function(){return m===null&&M&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",$),s.addEventListener("inputsourceschange",U),T.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let z=null,he=null,de=null;T.depth&&(de=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,z=T.stencil?$n:Tn,he=T.stencil?Vi:dn);const pe={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};m=this.getBinding(),f=m.createProjectionLayer(pe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new cn(f.textureWidth,f.textureHeight,{format:Zt,type:kt,depthTexture:new wi(f.textureWidth,f.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const z={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,z),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new cn(g.framebufferWidth,g.framebufferHeight,{format:Zt,type:kt,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(d),c=null,a=await s.requestReferenceSpace(l),Ve.setContext(s),Ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function U(te){for(let fe=0;fe<te.removed.length;fe++){const z=te.removed[fe],he=S.indexOf(z);he>=0&&(S[he]=null,w[he].disconnect(z))}for(let fe=0;fe<te.added.length;fe++){const z=te.added[fe];let he=S.indexOf(z);if(he===-1){for(let pe=0;pe<w.length;pe++)if(pe>=S.length){S.push(z),he=pe;break}else if(S[pe]===null){S[pe]=z,he=pe;break}if(he===-1)break}const de=w[he];de&&de.connect(z)}}const W=new q,se=new q;function ce(te,fe,z){W.setFromMatrixPosition(fe.matrixWorld),se.setFromMatrixPosition(z.matrixWorld);const he=W.distanceTo(se),de=fe.projectionMatrix.elements,pe=z.projectionMatrix.elements,ke=de[14]/(de[10]-1),Be=de[14]/(de[10]+1),et=(de[9]+1)/de[5],Ye=(de[9]-1)/de[5],je=(de[8]-1)/de[0],dt=(pe[8]+1)/pe[0],pt=ke*je,_t=ke*dt,vt=he/(-je+dt),ot=vt*-je;if(fe.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(ot),te.translateZ(vt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),de[10]===-1)te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const ie=ke+vt,N=Be+vt,xe=pt-ot,ge=_t+(he-ot),b=et*Be/N*ie,x=Ye*Be/N*ie;te.projectionMatrix.makePerspective(xe,ge,b,x,ie,N),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function me(te,fe){fe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(fe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let fe=te.near,z=te.far;p.texture!==null&&(p.depthNear>0&&(fe=p.depthNear),p.depthFar>0&&(z=p.depthFar)),D.near=I.near=C.near=fe,D.far=I.far=C.far=z,(K!==D.near||H!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),K=D.near,H=D.far),D.layers.mask=te.layers.mask|6,C.layers.mask=D.layers.mask&-5,I.layers.mask=D.layers.mask&-3;const he=te.parent,de=D.cameras;me(D,he);for(let pe=0;pe<de.length;pe++)me(de[pe],he);de.length===2?ce(D,C,I):D.projectionMatrix.copy(C.projectionMatrix),Te(te,D,he)};function Te(te,fe,z){z===null?te.matrix.copy(fe.matrixWorld):(te.matrix.copy(z.matrixWorld),te.matrix.invert(),te.matrix.multiply(fe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(fe.projectionMatrix),te.projectionMatrixInverse.copy(fe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=La*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&g===null))return d},this.setFoveation=function(te){d=te,f!==null&&(f.fixedFoveation=te),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=te)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(D)},this.getCameraTexture=function(te){return u[te]};let He=null;function Qe(te,fe){if(h=fe.getViewerPose(c||a),_=fe,h!==null){const z=h.views;g!==null&&(e.setRenderTargetFramebuffer(y,g.framebuffer),e.setRenderTarget(y));let he=!1;z.length!==D.cameras.length&&(D.cameras.length=0,he=!0);for(let Be=0;Be<z.length;Be++){const et=z[Be];let Ye=null;if(g!==null)Ye=g.getViewport(et);else{const dt=m.getViewSubImage(f,et);Ye=dt.viewport,Be===0&&(e.setRenderTargetTextures(y,dt.colorTexture,dt.depthStencilTexture),e.setRenderTarget(y))}let je=P[Be];je===void 0&&(je=new zt,je.layers.enable(Be),je.viewport=new lt,P[Be]=je),je.matrix.fromArray(et.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(et.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Be===0&&(D.matrix.copy(je.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),he===!0&&D.cameras.push(je)}const de=s.enabledFeatures;if(de&&de.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){m=i.getBinding();const Be=m.getDepthInformation(z[0]);Be&&Be.isValid&&Be.texture&&p.init(Be,s.renderState)}if(de&&de.includes("camera-access")&&M){e.state.unbindTexture(),m=i.getBinding();for(let Be=0;Be<z.length;Be++){const et=z[Be].camera;if(et){let Ye=u[et];Ye||(Ye=new Bc,u[et]=Ye);const je=m.getCameraImage(et);Ye.sourceTexture=je}}}}for(let z=0;z<w.length;z++){const he=S[z],de=w[z];he!==null&&de!==void 0&&de.update(he,fe,c||a)}He&&He(te,fe),fe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:fe}),_=null}const Ve=new Hc;Ve.setAnimationLoop(Qe),this.setAnimationLoop=function(te){He=te},this.dispose=function(){}}}const y_=new ct,Zc=new Fe;Zc.set(-1,0,0,0,1,0,0,0,1);function E_(n,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,zc(n)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,T,R,y){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(p,u):u.isMeshLambertMaterial?(r(p,u),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(p,u),m(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&g(p,u,y)):u.isMeshMatcapMaterial?(r(p,u),_(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),M(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&l(p,u)):u.isPointsMaterial?d(p,u,T,R):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===It&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===It&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const T=e.get(u),R=T.envMap,y=T.envMapRotation;R&&(p.envMap.value=R,p.envMapRotation.value.setFromMatrix4(y_.makeRotationFromEuler(y)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Zc),p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function l(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function d(p,u,T,R){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*T,p.scale.value=R*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function m(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function g(p,u,T){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===It&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,u){u.matcap&&(p.matcap.value=u.matcap)}function M(p,u){const T=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function b_(n,e,t,i){let s={},r={},a=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(y,w){const S=w.program;i.uniformBlockBinding(y,S)}function c(y,w){let S=s[y.id];S===void 0&&(p(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",T));const A=w.program;i.updateUBOMapping(y,A);const v=e.render.frame;r[y.id]!==v&&(f(y),r[y.id]=v)}function h(y){const w=m();y.__bindingPointIndex=w;const S=n.createBuffer(),A=y.__size,v=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,A,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function m(){for(let y=0;y<l;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const w=s[y.id],S=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let v=0,C=S.length;v<C;v++){const I=S[v];if(Array.isArray(I))for(let P=0,D=I.length;P<D;P++)g(I[P],v,P,A);else g(I,v,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,w,S,A){if(M(y,w,S,A)===!0){const v=y.__offset,C=y.value;if(Array.isArray(C)){let I=0;for(let P=0;P<C.length;P++){const D=C[P],K=u(D);_(D,y.__data,I),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(I+=K.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(C,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,y.__data)}}function _(y,w,S){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,S)}function M(y,w,S,A){const v=y.value,C=w+"_"+S;if(A[C]===void 0)return typeof v=="number"||typeof v=="boolean"?A[C]=v:ArrayBuffer.isView(v)?A[C]=v.slice():A[C]=v.clone(),!0;{const I=A[C];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return A[C]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function p(y){const w=y.uniforms;let S=0;const A=16;for(let C=0,I=w.length;C<I;C++){const P=Array.isArray(w[C])?w[C]:[w[C]];for(let D=0,K=P.length;D<K;D++){const H=P[D],k=Array.isArray(H.value)?H.value:[H.value];for(let $=0,U=k.length;$<U;$++){const W=k[$],se=u(W),ce=S%A,me=ce%se.boundary,Te=ce+me;S+=me,Te!==0&&A-Te<se.storage&&(S+=A-Te),H.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=se.storage}}}const v=S%A;return v>0&&(S+=A-v),y.__size=S,y.__cache={},this}function u(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",y),w}function T(y){const w=y.target;w.removeEventListener("dispose",T);const S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function R(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:d,update:c,dispose:R}}const T_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nn=null;function w_(){return nn===null&&(nn=new hh(T_,16,16,Jn,bn),nn.name="DFG_LUT",nn.minFilter=Rt,nn.magFilter=Rt,nn.wrapS=vn,nn.wrapT=vn,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}class A_{constructor(e={}){const{canvas:t=Hu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:f=!1,outputBufferType:g=kt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const M=g,p=new Set([Xa,ja,Wa]),u=new Set([kt,dn,Gi,Vi,Va,Ha]),T=new Uint32Array(4),R=new Int32Array(4),y=new q;let w=null,S=null;const A=[],v=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let P=!1,D=null,K=null,H=null,k=null;this._outputColorSpace=Ht;let $=0,U=0,W=null,se=-1,ce=null;const me=new lt,Te=new lt;let He=null;const Qe=new $e(0);let Ve=0,te=t.width,fe=t.height,z=1,he=null,de=null;const pe=new lt(0,0,te,fe),ke=new lt(0,0,te,fe);let Be=!1;const et=new Ka;let Ye=!1,je=!1;const dt=new ct,pt=new q,_t=new lt,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function ie(){return W===null?z:1}let N=i;function xe(E,B){return t.getContext(E,B)}try{const E={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:d,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ka}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Jt,!1),N===null){const B="webgl2";if(N=xe(B,E),N===null)throw xe(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Ke("WebGLRenderer: "+E.message),E}let ge,b,x,L,O,V,ee,Q,G,Y,ae,ue,le,oe,be,Ce,Ie,F,_e,ne,ve,Ee,re;function Pe(){ge=new wm(N),ge.init(),ve=new __(N,ge),b=new xm(N,ge,e,ve),x=new m_(N,ge),b.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),K=N.createFramebuffer(),H=N.createFramebuffer(),k=N.createFramebuffer(),L=new Cm(N),O=new t_,V=new g_(N,ge,x,O,b,ve,L),ee=new Tm(I),Q=new Dh(N),Ee=new gm(N,Q),G=new Am(N,Q,L,Ee),Y=new Pm(N,G,Q,Ee,L),F=new Nm(N,b,V),be=new vm(O),ae=new e_(I,ee,ge,b,Ee,be),ue=new E_(I,O),le=new i_,oe=new c_(ge),Ie=new mm(I,ee,x,Y,_,d),Ce=new p_(I,Y,b),re=new b_(N,L,b,x),_e=new _m(N,ge,L),ne=new Rm(N,ge,L),L.programs=ae.programs,I.capabilities=b,I.extensions=ge,I.properties=O,I.renderLists=le,I.shadowMap=Ce,I.state=x,I.info=L}Pe(),M!==kt&&(C=new Lm(M,t.width,t.height,l,s,r));const Re=new S_(I,N);this.xr=Re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=ge.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ge.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(E){E!==void 0&&(z=E,this.setSize(te,fe,!1))},this.getSize=function(E){return E.set(te,fe)},this.setSize=function(E,B,Z=!0){if(Re.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}te=E,fe=B,t.width=Math.floor(E*z),t.height=Math.floor(B*z),Z===!0&&(t.style.width=E+"px",t.style.height=B+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(te*z,fe*z).floor()},this.setDrawingBufferSize=function(E,B,Z){te=E,fe=B,z=Z,t.width=Math.floor(E*Z),t.height=Math.floor(B*Z),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(M===kt){Ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(me)},this.getViewport=function(E){return E.copy(pe)},this.setViewport=function(E,B,Z,j){E.isVector4?pe.set(E.x,E.y,E.z,E.w):pe.set(E,B,Z,j),x.viewport(me.copy(pe).multiplyScalar(z).round())},this.getScissor=function(E){return E.copy(ke)},this.setScissor=function(E,B,Z,j){E.isVector4?ke.set(E.x,E.y,E.z,E.w):ke.set(E,B,Z,j),x.scissor(Te.copy(ke).multiplyScalar(z).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(E){x.setScissorTest(Be=E)},this.setOpaqueSort=function(E){he=E},this.setTransparentSort=function(E){de=E},this.getClearColor=function(E){return E.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,Z=!0){let j=0;if(E){let X=!1;if(W!==null){const ye=W.texture.format;X=p.has(ye)}if(X){const ye=W.texture.type,Ae=u.has(ye),Se=Ie.getClearColor(),Ne=Ie.getClearAlpha(),De=Se.r,Oe=Se.g,Ge=Se.b;Ae?(T[0]=De,T[1]=Oe,T[2]=Ge,T[3]=Ne,N.clearBufferuiv(N.COLOR,0,T)):(R[0]=De,R[1]=Oe,R[2]=Ge,R[3]=Ne,N.clearBufferiv(N.COLOR,0,R))}else j|=N.COLOR_BUFFER_BIT}B&&(j|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(j|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&N.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),D=E},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),Ie.dispose(),le.dispose(),oe.dispose(),O.dispose(),ee.dispose(),Y.dispose(),Ee.dispose(),re.dispose(),ae.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",so),Re.removeEventListener("sessionend",ro),zn.stop()};function ut(E){E.preventDefault(),Go("WebGLRenderer: Context Lost."),P=!0}function rt(){Go("WebGLRenderer: Context Restored."),P=!1;const E=L.autoReset,B=Ce.enabled,Z=Ce.autoUpdate,j=Ce.needsUpdate,X=Ce.type;Pe(),L.autoReset=E,Ce.enabled=B,Ce.autoUpdate=Z,Ce.needsUpdate=j,Ce.type=X}function Jt(E){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Qt(E){const B=E.target;B.removeEventListener("dispose",Qt),td(B)}function td(E){nd(E),O.remove(E)}function nd(E){const B=O.get(E).programs;B!==void 0&&(B.forEach(function(Z){ae.releaseProgram(Z)}),E.isShaderMaterial&&ae.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,Z,j,X,ye){B===null&&(B=vt);const Ae=X.isMesh&&X.matrixWorld.determinantAffine()<0,Se=rd(E,B,Z,j,X);x.setMaterial(j,Ae);let Ne=Z.index,De=1;if(j.wireframe===!0){if(Ne=G.getWireframeAttribute(Z),Ne===void 0)return;De=2}const Oe=Z.drawRange,Ge=Z.attributes.position;let Le=Oe.start*De,nt=(Oe.start+Oe.count)*De;ye!==null&&(Le=Math.max(Le,ye.start*De),nt=Math.min(nt,(ye.start+ye.count)*De)),Ne!==null?(Le=Math.max(Le,0),nt=Math.min(nt,Ne.count)):Ge!=null&&(Le=Math.max(Le,0),nt=Math.min(nt,Ge.count));const mt=nt-Le;if(mt<0||mt===1/0)return;Ee.setup(X,j,Se,Z,Ne);let ht,it=_e;if(Ne!==null&&(ht=Q.get(Ne),it=ne,it.setIndex(ht)),X.isMesh)j.wireframe===!0?(x.setLineWidth(j.wireframeLinewidth*ie()),it.setMode(N.LINES)):it.setMode(N.TRIANGLES);else if(X.isLine){let Tt=j.linewidth;Tt===void 0&&(Tt=1),x.setLineWidth(Tt*ie()),X.isLineSegments?it.setMode(N.LINES):X.isLineLoop?it.setMode(N.LINE_LOOP):it.setMode(N.LINE_STRIP)}else X.isPoints?it.setMode(N.POINTS):X.isSprite&&it.setMode(N.TRIANGLES);if(X.isBatchedMesh)if(ge.get("WEBGL_multi_draw"))it.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Tt=X._multiDrawStarts,we=X._multiDrawCounts,Ft=X._multiDrawCount,Ze=Ne?Q.get(Ne).bytesPerElement:1,Gt=O.get(j).currentProgram.getUniforms();for(let en=0;en<Ft;en++)Gt.setValue(N,"_gl_DrawID",en),it.render(Tt[en]/Ze,we[en])}else if(X.isInstancedMesh)it.renderInstances(Le,mt,X.count);else if(Z.isInstancedBufferGeometry){const Tt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,we=Math.min(Z.instanceCount,Tt);it.renderInstances(Le,mt,we)}else it.render(Le,mt)};function io(E,B,Z){E.transparent===!0&&E.side===xn&&E.forceSinglePass===!1?(E.side=It,E.needsUpdate=!0,Ki(E,B,Z),E.side=On,E.needsUpdate=!0,Ki(E,B,Z),E.side=xn):Ki(E,B,Z)}this.compile=function(E,B,Z=null){Z===null&&(Z=E),S=oe.get(Z),S.init(B),v.push(S),Z.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(S.pushLight(X),X.castShadow&&S.pushShadow(X))}),E!==Z&&E.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(S.pushLight(X),X.castShadow&&S.pushShadow(X))}),S.setupLights();const j=new Set;return E.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ye=X.material;if(ye)if(Array.isArray(ye))for(let Ae=0;Ae<ye.length;Ae++){const Se=ye[Ae];io(Se,Z,X),j.add(Se)}else io(ye,Z,X),j.add(ye)}),S=v.pop(),j},this.compileAsync=function(E,B,Z=null){const j=this.compile(E,B,Z);return new Promise(X=>{function ye(){if(j.forEach(function(Ae){O.get(Ae).currentProgram.isReady()&&j.delete(Ae)}),j.size===0){X(E);return}setTimeout(ye,10)}ge.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let er=null;function id(E){er&&er(E)}function so(){zn.stop()}function ro(){zn.start()}const zn=new Hc;zn.setAnimationLoop(id),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(E){er=E,Re.setAnimationLoop(E),E===null?zn.stop():zn.start()},Re.addEventListener("sessionstart",so),Re.addEventListener("sessionend",ro),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(E,B);const Z=Re.enabled===!0&&Re.isPresenting===!0,j=C!==null&&(W===null||Z)&&C.begin(I,W);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(B),B=Re.getCamera()),E.isScene===!0&&E.onBeforeRender(I,E,B,W),S=oe.get(E,v.length),S.init(B),S.state.textureUnits=V.getTextureUnits(),v.push(S),dt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),et.setFromProjectionMatrix(dt,on,B.reversedDepth),je=this.localClippingEnabled,Ye=be.init(this.clippingPlanes,je),w=le.get(E,A.length),w.init(),A.push(w),Re.enabled===!0&&Re.isPresenting===!0){const Ae=I.xr.getDepthSensingMesh();Ae!==null&&tr(Ae,B,-1/0,I.sortObjects)}tr(E,B,0,I.sortObjects),w.finish(),I.sortObjects===!0&&w.sort(he,de,B.reversedDepth),ot=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,ot&&Ie.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ye===!0&&be.beginShadows();const X=S.state.shadowsArray;if(Ce.render(X,E,B),Ye===!0&&be.endShadows(),(j&&C.hasRenderPass())===!1){const Ae=w.opaque,Se=w.transmissive;if(S.setupLights(),B.isArrayCamera){const Ne=B.cameras;if(Se.length>0)for(let De=0,Oe=Ne.length;De<Oe;De++){const Ge=Ne[De];oo(Ae,Se,E,Ge)}ot&&Ie.render(E);for(let De=0,Oe=Ne.length;De<Oe;De++){const Ge=Ne[De];ao(w,E,Ge,Ge.viewport)}}else Se.length>0&&oo(Ae,Se,E,B),ot&&Ie.render(E),ao(w,E,B)}W!==null&&U===0&&(V.updateMultisampleRenderTarget(W),V.updateRenderTargetMipmap(W)),j&&C.end(I),E.isScene===!0&&E.onAfterRender(I,E,B),Ee.resetDefaultState(),se=-1,ce=null,v.pop(),v.length>0?(S=v[v.length-1],V.setTextureUnits(S.state.textureUnits),Ye===!0&&be.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,D!==null&&D.renderEnd()};function tr(E,B,Z,j){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)Z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||et.intersectsSprite(E)){j&&_t.setFromMatrixPosition(E.matrixWorld).applyMatrix4(dt);const Ae=Y.update(E),Se=E.material;Se.visible&&w.push(E,Ae,Se,Z,_t.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||et.intersectsObject(E))){const Ae=Y.update(E),Se=E.material;if(j&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),_t.copy(E.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),_t.copy(Ae.boundingSphere.center)),_t.applyMatrix4(E.matrixWorld).applyMatrix4(dt)),Array.isArray(Se)){const Ne=Ae.groups;for(let De=0,Oe=Ne.length;De<Oe;De++){const Ge=Ne[De],Le=Se[Ge.materialIndex];Le&&Le.visible&&w.push(E,Ae,Le,Z,_t.z,Ge)}}else Se.visible&&w.push(E,Ae,Se,Z,_t.z,null)}}const ye=E.children;for(let Ae=0,Se=ye.length;Ae<Se;Ae++)tr(ye[Ae],B,Z,j)}function ao(E,B,Z,j){const{opaque:X,transmissive:ye,transparent:Ae}=E;S.setupLightsView(Z),Ye===!0&&be.setGlobalState(I.clippingPlanes,Z),j&&x.viewport(me.copy(j)),X.length>0&&Zi(X,B,Z),ye.length>0&&Zi(ye,B,Z),Ae.length>0&&Zi(Ae,B,Z),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function oo(E,B,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[j.id]===void 0){const Le=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[j.id]=new cn(1,1,{generateMipmaps:!0,type:Le?bn:kt,minFilter:qn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}const ye=S.state.transmissionRenderTarget[j.id],Ae=j.viewport||me;ye.setSize(Ae.z*I.transmissionResolutionScale,Ae.w*I.transmissionResolutionScale);const Se=I.getRenderTarget(),Ne=I.getActiveCubeFace(),De=I.getActiveMipmapLevel();I.setRenderTarget(ye),I.getClearColor(Qe),Ve=I.getClearAlpha(),Ve<1&&I.setClearColor(16777215,.5),I.clear(),ot&&Ie.render(Z);const Oe=I.toneMapping;I.toneMapping=ln;const Ge=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),S.setupLightsView(j),Ye===!0&&be.setGlobalState(I.clippingPlanes,j),Zi(E,Z,j),V.updateMultisampleRenderTarget(ye),V.updateRenderTargetMipmap(ye),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let nt=0,mt=B.length;nt<mt;nt++){const ht=B[nt],{object:it,geometry:Tt,material:we,group:Ft}=ht;if(we.side===xn&&it.layers.test(j.layers)){const Ze=we.side;we.side=It,we.needsUpdate=!0,lo(it,Z,j,Tt,we,Ft),we.side=Ze,we.needsUpdate=!0,Le=!0}}Le===!0&&(V.updateMultisampleRenderTarget(ye),V.updateRenderTargetMipmap(ye))}I.setRenderTarget(Se,Ne,De),I.setClearColor(Qe,Ve),Ge!==void 0&&(j.viewport=Ge),I.toneMapping=Oe}function Zi(E,B,Z){const j=B.isScene===!0?B.overrideMaterial:null;for(let X=0,ye=E.length;X<ye;X++){const Ae=E[X],{object:Se,geometry:Ne,group:De}=Ae;let Oe=Ae.material;Oe.allowOverride===!0&&j!==null&&(Oe=j),Se.layers.test(Z.layers)&&lo(Se,B,Z,Ne,Oe,De)}}function lo(E,B,Z,j,X,ye){E.onBeforeRender(I,B,Z,j,X,ye),E.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),X.onBeforeRender(I,B,Z,j,E,ye),X.transparent===!0&&X.side===xn&&X.forceSinglePass===!1?(X.side=It,X.needsUpdate=!0,I.renderBufferDirect(Z,B,j,X,E,ye),X.side=On,X.needsUpdate=!0,I.renderBufferDirect(Z,B,j,X,E,ye),X.side=xn):I.renderBufferDirect(Z,B,j,X,E,ye),E.onAfterRender(I,B,Z,j,X,ye)}function Ki(E,B,Z){B.isScene!==!0&&(B=vt);const j=O.get(E),X=S.state.lights,ye=S.state.shadowsArray,Ae=X.state.version,Se=ae.getParameters(E,X.state,ye,B,Z,S.state.lightProbeGridArray),Ne=ae.getProgramCacheKey(Se);let De=j.programs;j.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,j.fog=B.fog;const Oe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;j.envMap=ee.get(E.envMap||j.environment,Oe),j.envMapRotation=j.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,De===void 0&&(E.addEventListener("dispose",Qt),De=new Map,j.programs=De);let Ge=De.get(Ne);if(Ge!==void 0){if(j.currentProgram===Ge&&j.lightsStateVersion===Ae)return uo(E,Se),Ge}else Se.uniforms=ae.getUniforms(E),D!==null&&E.isNodeMaterial&&D.build(E,Z,Se),E.onBeforeCompile(Se,I),Ge=ae.acquireProgram(Se,Ne),De.set(Ne,Ge),j.uniforms=Se.uniforms;const Le=j.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=be.uniform),uo(E,Se),j.needsLights=od(E),j.lightsStateVersion=Ae,j.needsLights&&(Le.ambientLightColor.value=X.state.ambient,Le.lightProbe.value=X.state.probe,Le.directionalLights.value=X.state.directional,Le.directionalLightShadows.value=X.state.directionalShadow,Le.spotLights.value=X.state.spot,Le.spotLightShadows.value=X.state.spotShadow,Le.rectAreaLights.value=X.state.rectArea,Le.ltc_1.value=X.state.rectAreaLTC1,Le.ltc_2.value=X.state.rectAreaLTC2,Le.pointLights.value=X.state.point,Le.pointLightShadows.value=X.state.pointShadow,Le.hemisphereLights.value=X.state.hemi,Le.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Le.spotLightMatrix.value=X.state.spotLightMatrix,Le.spotLightMap.value=X.state.spotLightMap,Le.pointShadowMatrix.value=X.state.pointShadowMatrix),j.lightProbeGrid=S.state.lightProbeGridArray.length>0,j.currentProgram=Ge,j.uniformsList=null,Ge}function co(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=Ds.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function uo(E,B){const Z=O.get(E);Z.outputColorSpace=B.outputColorSpace,Z.batching=B.batching,Z.batchingColor=B.batchingColor,Z.instancing=B.instancing,Z.instancingColor=B.instancingColor,Z.instancingMorph=B.instancingMorph,Z.skinning=B.skinning,Z.morphTargets=B.morphTargets,Z.morphNormals=B.morphNormals,Z.morphColors=B.morphColors,Z.morphTargetsCount=B.morphTargetsCount,Z.numClippingPlanes=B.numClippingPlanes,Z.numIntersection=B.numClipIntersection,Z.vertexAlphas=B.vertexAlphas,Z.vertexTangents=B.vertexTangents,Z.toneMapping=B.toneMapping}function sd(E,B){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(B.matrixWorld);for(let Z=0,j=E.length;Z<j;Z++){const X=E[Z];if(X.texture!==null&&X.boundingBox.containsPoint(y))return X}return null}function rd(E,B,Z,j,X){B.isScene!==!0&&(B=vt),V.resetTextureUnits();const ye=B.fog,Ae=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?B.environment:null,Se=W===null?I.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Xe.workingColorSpace,Ne=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,De=ee.get(j.envMap||Ae,Ne),Oe=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ge=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Le=!!Z.morphAttributes.position,nt=!!Z.morphAttributes.normal,mt=!!Z.morphAttributes.color;let ht=ln;j.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(ht=I.toneMapping);const it=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Tt=it!==void 0?it.length:0,we=O.get(j),Ft=S.state.lights;if(Ye===!0&&(je===!0||E!==ce)){const at=E===ce&&j.id===se;be.setState(j,E,at)}let Ze=!1;j.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Ft.state.version||we.outputColorSpace!==Se||X.isBatchedMesh&&we.batching===!1||!X.isBatchedMesh&&we.batching===!0||X.isBatchedMesh&&we.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&we.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&we.instancing===!1||!X.isInstancedMesh&&we.instancing===!0||X.isSkinnedMesh&&we.skinning===!1||!X.isSkinnedMesh&&we.skinning===!0||X.isInstancedMesh&&we.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&we.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&we.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&we.instancingMorph===!1&&X.morphTexture!==null||we.envMap!==De||j.fog===!0&&we.fog!==ye||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==be.numPlanes||we.numIntersection!==be.numIntersection)||we.vertexAlphas!==Oe||we.vertexTangents!==Ge||we.morphTargets!==Le||we.morphNormals!==nt||we.morphColors!==mt||we.toneMapping!==ht||we.morphTargetsCount!==Tt||!!we.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,we.__version=j.version);let Gt=we.currentProgram;Ze===!0&&(Gt=Ki(j,B,X),D&&j.isNodeMaterial&&D.onUpdateProgram(j,Gt,we));let en=!1,wn=!1,ni=!1;const st=Gt.getUniforms(),gt=we.uniforms;if(x.useProgram(Gt.program)&&(en=!0,wn=!0,ni=!0),j.id!==se&&(se=j.id,wn=!0),we.needsLights){const at=sd(S.state.lightProbeGridArray,X);we.lightProbeGrid!==at&&(we.lightProbeGrid=at,wn=!0)}if(en||ce!==E){x.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),st.setValue(N,"projectionMatrix",E.projectionMatrix),st.setValue(N,"viewMatrix",E.matrixWorldInverse);const Rn=st.map.cameraPosition;Rn!==void 0&&Rn.setValue(N,pt.setFromMatrixPosition(E.matrixWorld)),b.logarithmicDepthBuffer&&st.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&st.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),ce!==E&&(ce=E,wn=!0,ni=!0)}if(we.needsLights&&(Ft.state.directionalShadowMap.length>0&&st.setValue(N,"directionalShadowMap",Ft.state.directionalShadowMap,V),Ft.state.spotShadowMap.length>0&&st.setValue(N,"spotShadowMap",Ft.state.spotShadowMap,V),Ft.state.pointShadowMap.length>0&&st.setValue(N,"pointShadowMap",Ft.state.pointShadowMap,V)),X.isSkinnedMesh){st.setOptional(N,X,"bindMatrix"),st.setOptional(N,X,"bindMatrixInverse");const at=X.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),st.setValue(N,"boneTexture",at.boneTexture,V))}X.isBatchedMesh&&(st.setOptional(N,X,"batchingTexture"),st.setValue(N,"batchingTexture",X._matricesTexture,V),st.setOptional(N,X,"batchingIdTexture"),st.setValue(N,"batchingIdTexture",X._indirectTexture,V),st.setOptional(N,X,"batchingColorTexture"),X._colorsTexture!==null&&st.setValue(N,"batchingColorTexture",X._colorsTexture,V));const An=Z.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&F.update(X,Z,Gt),(wn||we.receiveShadow!==X.receiveShadow)&&(we.receiveShadow=X.receiveShadow,st.setValue(N,"receiveShadow",X.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&B.environment!==null&&(gt.envMapIntensity.value=B.environmentIntensity),gt.dfgLUT!==void 0&&(gt.dfgLUT.value=w_()),wn){if(st.setValue(N,"toneMappingExposure",I.toneMappingExposure),we.needsLights&&ad(gt,ni),ye&&j.fog===!0&&ue.refreshFogUniforms(gt,ye),ue.refreshMaterialUniforms(gt,j,z,fe,S.state.transmissionRenderTarget[E.id]),we.needsLights&&we.lightProbeGrid){const at=we.lightProbeGrid;gt.probesSH.value=at.texture,gt.probesMin.value.copy(at.boundingBox.min),gt.probesMax.value.copy(at.boundingBox.max),gt.probesResolution.value.copy(at.resolution)}Ds.upload(N,co(we),gt,V)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Ds.upload(N,co(we),gt,V),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&st.setValue(N,"center",X.center),st.setValue(N,"modelViewMatrix",X.modelViewMatrix),st.setValue(N,"normalMatrix",X.normalMatrix),st.setValue(N,"modelMatrix",X.matrixWorld),j.uniformsGroups!==void 0){const at=j.uniformsGroups;for(let Rn=0,ii=at.length;Rn<ii;Rn++){const ho=at[Rn];re.update(ho,Gt),re.bind(ho,Gt)}}return Gt}function ad(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function od(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(E,B,Z){const j=O.get(E);j.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),O.get(E.texture).__webglTexture=B,O.get(E.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:Z,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const Z=O.get(E);Z.__webglFramebuffer=B,Z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,Z=0){W=E,$=B,U=Z;let j=null,X=!1,ye=!1;if(E){const Se=O.get(E);if(Se.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,Se.__webglFramebuffer),me.copy(E.viewport),Te.copy(E.scissor),He=E.scissorTest,x.viewport(me),x.scissor(Te),x.setScissorTest(He),se=-1;return}else if(Se.__webglFramebuffer===void 0)V.setupRenderTarget(E);else if(Se.__hasExternalTextures)V.rebindTextures(E,O.get(E.texture).__webglTexture,O.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Oe=E.depthTexture;if(Se.__boundDepthTexture!==Oe){if(Oe!==null&&O.has(Oe)&&(E.width!==Oe.image.width||E.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");V.setupDepthRenderbuffer(E)}}const Ne=E.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(ye=!0);const De=O.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(De[B])?j=De[B][Z]:j=De[B],X=!0):E.samples>0&&V.useMultisampledRTT(E)===!1?j=O.get(E).__webglMultisampledFramebuffer:Array.isArray(De)?j=De[Z]:j=De,me.copy(E.viewport),Te.copy(E.scissor),He=E.scissorTest}else me.copy(pe).multiplyScalar(z).floor(),Te.copy(ke).multiplyScalar(z).floor(),He=Be;if(Z!==0&&(j=K),x.bindFramebuffer(N.FRAMEBUFFER,j)&&x.drawBuffers(E,j),x.viewport(me),x.scissor(Te),x.setScissorTest(He),X){const Se=O.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,Se.__webglTexture,Z)}else if(ye){const Se=B;for(let Ne=0;Ne<E.textures.length;Ne++){const De=O.get(E.textures[Ne]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ne,De.__webglTexture,Z,Se)}}else if(E!==null&&Z!==0){const Se=O.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Se.__webglTexture,Z)}se=-1},this.readRenderTargetPixels=function(E,B,Z,j,X,ye,Ae,Se=0){if(!(E&&E.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=O.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne){x.bindFramebuffer(N.FRAMEBUFFER,Ne);try{const De=E.textures[Se],Oe=De.format,Ge=De.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),!b.textureFormatReadable(Oe)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(Ge)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-j&&Z>=0&&Z<=E.height-X&&N.readPixels(B,Z,j,X,ve.convert(Oe),ve.convert(Ge),ye)}finally{const De=W!==null?O.get(W).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(E,B,Z,j,X,ye,Ae,Se=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=O.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne)if(B>=0&&B<=E.width-j&&Z>=0&&Z<=E.height-X){x.bindFramebuffer(N.FRAMEBUFFER,Ne);const De=E.textures[Se],Oe=De.format,Ge=De.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),!b.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.bufferData(N.PIXEL_PACK_BUFFER,ye.byteLength,N.STREAM_READ),N.readPixels(B,Z,j,X,ve.convert(Oe),ve.convert(Ge),0);const nt=W!==null?O.get(W).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,nt);const mt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Wu(N,mt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Le),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ye),N.deleteBuffer(Le),N.deleteSync(mt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,Z=0){const j=Math.pow(2,-Z),X=Math.floor(E.image.width*j),ye=Math.floor(E.image.height*j),Ae=B!==null?B.x:0,Se=B!==null?B.y:0;V.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,Z,0,0,Ae,Se,X,ye),x.unbindTexture()},this.copyTextureToTexture=function(E,B,Z=null,j=null,X=0,ye=0){let Ae,Se,Ne,De,Oe,Ge,Le,nt,mt;const ht=E.isCompressedTexture?E.mipmaps[ye]:E.image;if(Z!==null)Ae=Z.max.x-Z.min.x,Se=Z.max.y-Z.min.y,Ne=Z.isBox3?Z.max.z-Z.min.z:1,De=Z.min.x,Oe=Z.min.y,Ge=Z.isBox3?Z.min.z:0;else{const gt=Math.pow(2,-X);Ae=Math.floor(ht.width*gt),Se=Math.floor(ht.height*gt),E.isDataArrayTexture?Ne=ht.depth:E.isData3DTexture?Ne=Math.floor(ht.depth*gt):Ne=1,De=0,Oe=0,Ge=0}j!==null?(Le=j.x,nt=j.y,mt=j.z):(Le=0,nt=0,mt=0);const it=ve.convert(B.format),Tt=ve.convert(B.type);let we;B.isData3DTexture?(V.setTexture3D(B,0),we=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(V.setTexture2DArray(B,0),we=N.TEXTURE_2D_ARRAY):(V.setTexture2D(B,0),we=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const Ft=x.getParameter(N.UNPACK_ROW_LENGTH),Ze=x.getParameter(N.UNPACK_IMAGE_HEIGHT),Gt=x.getParameter(N.UNPACK_SKIP_PIXELS),en=x.getParameter(N.UNPACK_SKIP_ROWS),wn=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,ht.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ht.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,De),x.pixelStorei(N.UNPACK_SKIP_ROWS,Oe),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Ge);const ni=E.isDataArrayTexture||E.isData3DTexture,st=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const gt=O.get(E),An=O.get(B),at=O.get(gt.__renderTarget),Rn=O.get(An.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,at.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let ii=0;ii<Ne;ii++)ni&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,O.get(E).__webglTexture,X,Ge+ii),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,O.get(B).__webglTexture,ye,mt+ii)),N.blitFramebuffer(De,Oe,Ae,Se,Le,nt,Ae,Se,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(X!==0||E.isRenderTargetTexture||O.has(E)){const gt=O.get(E),An=O.get(B);x.bindFramebuffer(N.READ_FRAMEBUFFER,H),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,k);for(let at=0;at<Ne;at++)ni?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,gt.__webglTexture,X,Ge+at):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,gt.__webglTexture,X),st?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,An.__webglTexture,ye,mt+at):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,An.__webglTexture,ye),X!==0?N.blitFramebuffer(De,Oe,Ae,Se,Le,nt,Ae,Se,N.COLOR_BUFFER_BIT,N.NEAREST):st?N.copyTexSubImage3D(we,ye,Le,nt,mt+at,De,Oe,Ae,Se):N.copyTexSubImage2D(we,ye,Le,nt,De,Oe,Ae,Se);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else st?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(we,ye,Le,nt,mt,Ae,Se,Ne,it,Tt,ht.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(we,ye,Le,nt,mt,Ae,Se,Ne,it,ht.data):N.texSubImage3D(we,ye,Le,nt,mt,Ae,Se,Ne,it,Tt,ht):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ye,Le,nt,Ae,Se,it,Tt,ht.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ye,Le,nt,ht.width,ht.height,it,ht.data):N.texSubImage2D(N.TEXTURE_2D,ye,Le,nt,Ae,Se,it,Tt,ht);x.pixelStorei(N.UNPACK_ROW_LENGTH,Ft),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ze),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Gt),x.pixelStorei(N.UNPACK_SKIP_ROWS,en),x.pixelStorei(N.UNPACK_SKIP_IMAGES,wn),ye===0&&B.generateMipmaps&&N.generateMipmap(we),x.unbindTexture()},this.initRenderTarget=function(E){O.get(E).__webglFramebuffer===void 0&&V.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?V.setTextureCube(E,0):E.isData3DTexture?V.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?V.setTexture2DArray(E,0):V.setTexture2D(E,0),x.unbindTexture()},this.resetState=function(){$=0,U=0,W=null,x.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}const bs=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],Kc=620,R_=560,C_=300,N_=2800,Il=850,Ul=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Fl=210,Br=300,Ol=.42,Bl=740,Ts=n=>-(n+1)*Kc,P_=n=>n===1?1:1-Math.pow(2,-10*n),zr=n=>new Promise(e=>setTimeout(e,n)),zl=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function kl(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${zl[t%zl.length]}`)}function D_({onDone:n}){const e=J.useRef(null),t=J.useRef(null),i=J.useRef(null),s=J.useRef(null),r=J.useRef(null),a=J.useRef(null),l=J.useRef(null),d=J.useRef(null),c=J.useRef(null),h=J.useRef(null),m=J.useRef(n);m.current=n,uc();const f=J.useMemo(()=>kl(16),[]),g=J.useMemo(()=>kl(16),[]);return J.useEffect(()=>{let _=!1,M=!1;const p=()=>{M||(M=!0,m.current())};let u=null;function T(){if(!u)try{const ie=window.AudioContext??window.webkitAudioContext;u=new ie}catch{}return u}function R(){const ie=T();if(!ie)return;ie.state==="suspended"&&ie.resume();const N=ie.currentTime,xe=ie.createOscillator();xe.type="sine",xe.frequency.setValueAtTime(130,N),xe.frequency.exponentialRampToValueAtTime(42,N+.16);const ge=ie.createGain();ge.gain.setValueAtTime(1,N),ge.gain.exponentialRampToValueAtTime(.001,N+.38),xe.connect(ge).connect(ie.destination),xe.start(N),xe.stop(N+.42);const b=Math.floor(ie.sampleRate*.14),x=ie.createBuffer(1,b,ie.sampleRate),L=x.getChannelData(0);for(let Q=0;Q<b;Q++)L[Q]=(Math.random()*2-1)*Math.pow(1-Q/b,2.2);const O=ie.createBufferSource();O.buffer=x;const V=ie.createBiquadFilter();V.type="lowpass",V.frequency.value=850;const ee=ie.createGain();ee.gain.setValueAtTime(.55,N),ee.gain.exponentialRampToValueAtTime(.001,N+.13),O.connect(V).connect(ee).connect(ie.destination),O.start(N)}function y(){const ie=i.current;ie&&(ie.currentTime=0,ie.play().catch(()=>{}))}const w=t.current,S=(w==null?void 0:w.getContext("2d"))??null;let A=[],v=0;function C(){w&&(w.width=window.innerWidth,w.height=window.innerHeight)}C();function I(ie,N){A=[];let xe=0;const ge=6;function b(L,O,V,ee,Q,G){const Y=3+Math.floor(Math.random()*3),ae=[[L,O]];let ue=V,le=L,oe=O;for(let be=0;be<Y;be++){ue+=(Math.random()-.5)*.6;const Ce=ee/Y;if(le+=Math.cos(ue)*Ce,oe+=Math.sin(ue)*Ce,ae.push([le,oe]),Q>0&&Math.random()<.5){const Ie=ue+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);b(le,oe,Ie,ee*(.35+Math.random()*.3),Q-1,G*.78)}}A.push({pts:ae,color:Ul[xe++%Ul.length],width:G})}const x=[N*(.06+Math.random()*.1),N*(.84+Math.random()*.1)];for(let L=0;L<ge;L++){const O=ie*(.15+Math.random()*.7),V=L<x.length?x[L]:N*(.1+Math.random()*.8),ee=9+Math.floor(Math.random()*6);for(let Q=0;Q<ee;Q++){const G=Q/ee*Math.PI*2+(Math.random()-.5)*.4,Y=Math.max(ie,N)*(.18+Math.random()*.38);b(O,V,G,Y,2,.9)}}}function P(ie){if(!S||ie<=0)return;const N=Math.min(1,ie/2.4),xe=Math.round(A.length*N);for(let ge=0;ge<xe;ge++){const b=A[ge];S.lineWidth=b.width*(.9+ie*.1),S.strokeStyle=b.color,S.globalAlpha=.75+ie*.1,S.shadowColor=b.color,S.shadowBlur=5+ie*2.2,S.beginPath(),b.pts.forEach(([x,L],O)=>O===0?S.moveTo(x,L):S.lineTo(x,L)),S.stroke()}S.globalAlpha=1,S.shadowBlur=0}function D(ie,N,xe){S&&(S.clearRect(0,0,N,xe),P(ie))}function K(){const ie=c.current;ie&&(ie.classList.remove("intro-hit"),ie.offsetWidth,ie.classList.add("intro-hit"))}function H(){var N,xe,ge,b;const ie=(N=r.current)==null?void 0:N.firstElementChild;ie&&(ie.classList.remove("intro-rgbslam"),ie.offsetWidth,ie.classList.add("intro-rgbslam")),(xe=r.current)==null||xe.classList.remove("intro-jitter"),(ge=r.current)==null||ge.offsetWidth,(b=r.current)==null||b.classList.add("intro-jitter"),K(),Ye()}async function k(){for(let ie=5;ie>=1&&!_;ie--){const N=r.current;if(!N)return;N.innerHTML="";const xe=document.createElement("div");xe.className="intro-glyph",xe.setAttribute("data-t",String(ie)),xe.textContent=String(ie),N.appendChild(xe),H(),R(),await xe.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Il*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await zr(Il*.3)}}let $=null,U=null,W=null,se=0,ce=!1,me=-1;const He=document.createElement("canvas").getContext("2d");He.font=`700 ${Fl}px "Rajdhani", sans-serif`;const Qe=[],Ve=[];function te(ie,N){const xe=Math.ceil(He.measureText(ie).width),ge=Math.max(200,xe+120),b=document.createElement("canvas");b.width=ge,b.height=Br;const x=b.getContext("2d");x.font=`700 ${Fl}px "Rajdhani", sans-serif`,x.textAlign="center",x.textBaseline="middle",x.shadowColor=N,x.shadowBlur=56,x.fillStyle="#d24e01",x.fillText(ie,ge/2,Br/2);const L=new _h(b);L.anisotropy=4;let O=ge*Ol,V=Br*Ol;if(O>Bl){const ee=Bl/O;O*=ee,V*=ee}return{tex:L,worldW:O,worldH:V}}function fe(ie,N,xe){const{tex:ge,worldW:b,worldH:x}=te(ie,xe),L=new Yi(b,x),O=new zi({map:ge,transparent:!0,depthWrite:!1,opacity:0}),V=new jt(L,O);V.position.set(0,10,N),V.visible=!1,U.add(V);const ee=new jt(L,new zi({map:ge,transparent:!0,depthWrite:!1,blending:Bs,color:2875596,opacity:0})),Q=new jt(L,new zi({map:ge,transparent:!0,depthWrite:!1,blending:Bs,color:10116351,opacity:0}));return ee.position.copy(V.position),Q.position.copy(V.position),ee.visible=!1,Q.visible=!1,U.add(ee),U.add(Q),Ve.push(L,O,ge,ee.material,Q.material),{mesh:V,ghostCy:ee,ghostMg:Q}}const z={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let he,de;function pe(){const ie=e.current;if(!ie)return;$=new A_({canvas:ie,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),$.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),U=new ah,U.fog=new Za(263946,.0011),W=new zt(62,window.innerWidth/window.innerHeight,1,6e3),W.position.set(0,0,40),U.add(new Rh(928300,1.1));const N=Kc*bs.length+500,xe=900,ge=new Kt,b=new Float32Array(xe*3),x=new Float32Array(xe*3),L=[2875596,15357964,15357964,10116351];for(let Q=0;Q<xe;Q++){const G=60+Math.random()*260,Y=Math.random()*Math.PI*2;b[Q*3]=Math.cos(Y)*G,b[Q*3+1]=Math.sin(Y)*G,b[Q*3+2]=-Math.random()*N;const ae=new $e(L[Q%L.length]);x[Q*3]=ae.r,x[Q*3+1]=ae.g,x[Q*3+2]=ae.b}ge.setAttribute("position",new Wt(b,3)),ge.setAttribute("color",new Wt(x,3));const O=new Fc({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});U.add(new gh(ge,O)),Ve.push(ge,O),bs.forEach((Q,G)=>{const Y=Ts(G),ae="#"+Q.light.toString(16).padStart(6,"0");Qe.push(fe(Q.text,Y,ae));const ue=new Pr(Q.light,2.4,900,2);ue.position.set(0,40,Y+60),U.add(ue)}),he=new Pr(15357964,4,550,2),de=new Pr(10116351,2.6,550,2),U.add(he),U.add(de),ce=!0,ke();const V=Math.random()*1e3;z.camZ=0;function ee(Q){if(!$||!U||!W)return;{const ue=Math.sin(Q*.0016+V)*1.1+Math.sin(Q*.0043)*.5,le=Math.cos(Q*.002+V)*.9+Math.cos(Q*.0038)*.45;W.position.x=ue+z.camX,W.position.y=le+6}W.position.z=z.camZ+z.warpKick;const G=z.yawKick,Y=W.position.x+Math.sin(G)*640;W.lookAt(Y,W.position.y-4,z.focusZ),W.rotateZ(-G*.5);const ae=62+z.fovKick*14;W.fov!==ae&&(W.fov=ae,W.updateProjectionMatrix()),he.position.set(Math.sin(Q*6e-4)*80,30,z.camZ-120),de.position.set(Math.cos(Q*7e-4)*80,-10,z.camZ-200),Qe.forEach(ue=>{ue.mesh.visible&&ue.mesh.quaternion.copy(W.quaternion),ue.ghostCy.visible&&ue.ghostCy.quaternion.copy(W.quaternion),ue.ghostMg.visible&&ue.ghostMg.quaternion.copy(W.quaternion)}),$.render(U,W),se=requestAnimationFrame(ee)}se=requestAnimationFrame(ee)}function ke(){!ce||!$||!W||($.setSize(window.innerWidth,window.innerHeight),W.aspect=window.innerWidth/window.innerHeight,W.updateProjectionMatrix())}function Be(){ke(),C(),I(window.innerWidth,window.innerHeight),D(v,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Be,{passive:!0});function et(ie,N=650){const xe=me;me=ie;const ge=Qe[ie];if(!ge)return;ge.mesh.visible=!0,ge.mesh.material.opacity=0;const b=xe>=0?Qe[xe]:null,x=performance.now();function L(){const O=Math.min(1,(performance.now()-x)/N);ge.mesh.material.opacity=O,b&&(b.mesh.material.opacity=1-O),O<1?requestAnimationFrame(L):b&&(b.mesh.visible=!1)}L()}function Ye(){if(me<0)return;const ie=Qe[me];if(!ie)return;const N=16+Math.random()*14;ie.ghostCy.visible=!0,ie.ghostCy.material.opacity=.6,ie.ghostCy.position.x=-N,ie.ghostMg.visible=!0,ie.ghostMg.material.opacity=.6,ie.ghostMg.position.x=N,setTimeout(()=>{ie.ghostCy.material.opacity=0,ie.ghostCy.visible=!1,ie.ghostCy.position.x=0,ie.ghostMg.material.opacity=0,ie.ghostMg.visible=!1,ie.ghostMg.position.x=0},140+Math.random()*100)}async function je(ie,N,xe,ge,b){const x=z.camZ,L=z.camX,O=performance.now();return z.warpKick=(Math.random()-.5)*34,z.yawKick=b*ge,z.fovKick=1,new Promise(V=>{function ee(Q){const G=Math.min(1,(Q-O)/xe),Y=P_(G);z.camZ=x+(ie-x)*Y,z.camX=L+(N-L)*Y,z.warpKick*=.92,z.yawKick*=.975,z.fovKick*=.965,G<1?requestAnimationFrame(ee):V()}requestAnimationFrame(ee)})}function dt(ie=1,N=420){if(!ce||!S||!e.current)return;const xe=window.innerWidth,ge=window.innerHeight,b=performance.now()+N;function x(){if(performance.now()>b){D(v,xe,ge);return}S.clearRect(0,0,xe,ge),P(v);const O=5+Math.floor(Math.random()*8*ie);for(let ee=0;ee<O;ee++){const Q=Math.random()*ge,G=4+Math.random()*52*ie,Y=(Math.random()-.5)*130*ie;try{S.drawImage(e.current,0,Q,xe,G,Y,Q,xe,G)}catch{}}const V=Math.round(6*ie);S.globalCompositeOperation="screen";for(let ee=0;ee<V;ee++){const Q=Math.random()*ge;S.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],S.globalAlpha=.35+Math.random()*.35,S.lineWidth=.6+Math.random()*1.6,S.beginPath(),S.moveTo(0,Q),S.lineTo(xe,Q),S.stroke()}if(S.globalCompositeOperation="source-over",S.globalAlpha=1,Math.random()<ie*.12){S.globalAlpha=.5;for(let ee=0;ee<220;ee++)S.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",S.fillRect(Math.random()*xe,Math.random()*ge,2,2);S.globalAlpha=1}requestAnimationFrame(x)}x()}function pt(ie=1,N=340){if(!ce||!S)return;const xe=window.innerWidth,ge=window.innerHeight,b=xe/2,x=ge/2,L=12+Math.floor(10*ie),O=Array.from({length:L},()=>Math.random()*Math.PI*2),V=performance.now();function ee(){const G=(performance.now()-V)/N;if(G>=1){D(v,xe,ge);return}S.save(),S.globalCompositeOperation="screen",O.forEach(Y=>{const ae=30+G*300,ue=ae+90+Math.random()*150,le=b+Math.cos(Y)*ae,oe=x+Math.sin(Y)*ae,be=b+Math.cos(Y)*ue,Ce=x+Math.sin(Y)*ue;S.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",S.globalAlpha=(1-G)*(.28+Math.random()*.32)*ie,S.lineWidth=1.2+Math.random()*1.8,S.beginPath(),S.moveTo(le,oe),S.lineTo(be,Ce),S.stroke()}),S.restore(),requestAnimationFrame(ee)}ee()}async function _t(ie=900){const N=window.innerWidth,xe=window.innerHeight;if(!S)return;const ge=performance.now(),b=A.map(()=>Math.random()*.25);await new Promise(x=>{function L(){const O=Math.min(1,(performance.now()-ge)/ie);S.clearRect(0,0,N,xe),A.forEach((V,ee)=>{const Q=Math.min(1,Math.max(0,(O-b[ee])/(1-b[ee])));if(Q<=0)return;const G=V.pts,Y=G.length-1,ae=Q*Y;S.lineWidth=V.width*(1+O*.4),S.strokeStyle=V.color,S.globalAlpha=.65+O*.3,S.shadowColor=V.color,S.shadowBlur=3+O*5,S.beginPath(),S.moveTo(G[0][0],G[0][1]);for(let oe=0;oe<Math.floor(ae);oe++)S.lineTo(G[oe+1][0],G[oe+1][1]);const ue=Math.floor(ae),le=ae-ue;if(ue<Y&&le>0){const[oe,be]=G[ue],[Ce,Ie]=G[ue+1];S.lineTo(oe+(Ce-oe)*le,be+(Ie-be)*le)}S.stroke()}),S.globalAlpha=1,S.shadowBlur=0,O<1?requestAnimationFrame(L):x()}L()})}async function vt(){var Q;K(),(Q=r.current)==null||Q.classList.add("intro-jitter");const ie=h.current;if(!ie)return;ie.innerHTML="";const N=window.innerWidth,xe=window.innerHeight,ge=11,b=8,x=N/ge,L=xe/b,O=N/2,V=xe/2,ee=[];for(let G=0;G<b;G++)for(let Y=0;Y<ge;Y++){const ae=Y*x,ue=G*L,le=()=>(Math.random()-.5)*16,oe=document.createElement("div");oe.className="intro-shard",oe.style.left=ae+"px",oe.style.top=ue+"px",oe.style.width=x+2+"px",oe.style.height=L+2+"px",oe.style.clipPath=`polygon(${le()}px ${le()}px, ${x+le()}px ${le()}px, ${x+le()}px ${L+le()}px, ${le()}px ${L+le()}px)`,ie.appendChild(oe);const be=ae+x/2-O,Ce=ue+L/2-V,Ie=Math.hypot(be,Ce)||1;ee.push({div:oe,dx:be/Ie,dy:Ce/Ie,delay:Ie/Math.max(N,xe)*220+Math.random()*80})}ee.forEach(({div:G,dx:Y,dy:ae,delay:ue})=>{const le=60+Math.random()*140,oe=420+Math.random()*420,be=(Math.random()-.5)*420;G.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${Y*le}px, ${ae*le-20}px) rotate(${be*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${Y*le*1.4}px, ${ae*le+oe}px) rotate(${be}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:ue,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await zr(1600),ie.innerHTML=""}async function ot(){var ie;if(I(window.innerWidth,window.innerHeight),pe(),s.current&&(s.current.style.display="flex"),await k(),!_){s.current&&(s.current.style.display="none"),(ie=l.current)==null||ie.classList.add("intro-on"),y();for(let N=0;N<bs.length&&!_;N++){const xe=bs[N];v=xe.crack,d.current&&(d.current.innerHTML=xe.final?xe.sub:`${xe.sub} · трещина канала <b>${xe.crack}/4</b>`),et(N),z.focusZ=Ts(N);const ge=N%2===0?1:-1,b=xe.final?0:ge*60,x=xe.final?Ts(N)-C_:Ts(N)+R_;if(await je(x,b,N_,.5+xe.crack*.09,ge),_)return;H(),dt(Math.min(1,.5+xe.crack*.14),xe.final?300:260),xe.final||pt(.8+xe.crack*.1,320),D(v,window.innerWidth,window.innerHeight)}_||(await _t(900),!_&&(await zr(150),await vt(),!_&&p()))}}return ot(),()=>{_=!0,window.removeEventListener("resize",Be),cancelAnimationFrame(se),Ve.forEach(ie=>ie.dispose()),$==null||$.dispose(),u==null||u.close().catch(()=>{})}},[]),o.jsx("div",{className:"host-screen grid-bg intro-screen",children:o.jsxs("div",{className:"intro-root",children:[o.jsx("canvas",{ref:e,className:"intro-gl"}),o.jsx("canvas",{ref:t,className:"intro-crack"}),o.jsx("div",{ref:h,className:"intro-shatter-layer"}),o.jsx("div",{className:"intro-vignette"}),o.jsx("div",{className:"intro-scanlines"}),o.jsx("div",{ref:c,className:"intro-noise"}),o.jsx("div",{className:"intro-bracket tl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket tr",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket bl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket br",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-ticker left",children:o.jsx("div",{className:"intro-ticker-col",children:[...f,...f].map((_,M)=>o.jsx("span",{className:M%6===0?"hi":void 0,children:_},M))})}),o.jsx("div",{className:"intro-ticker right",children:o.jsx("div",{className:"intro-ticker-col",children:[...g,...g].map((_,M)=>o.jsx("span",{className:M%5===0?"hi":void 0,children:_},M))})}),o.jsxs("div",{ref:s,className:"intro-stage",children:[o.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),o.jsx("div",{ref:r,className:"intro-frame"}),o.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),o.jsx("div",{ref:l,className:"intro-flight-label",children:o.jsx("div",{ref:d,className:"intro-subline"})}),o.jsx(hc,{}),o.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}async function L_(n,e){var i;await Ut.from("game_sessions").update({melody:{}}).eq("id",Zn());const t=tc(e,n.round_number,"show_answers");if(t.kind==="scoreboard")return void Jl();if(t.kind==="break")return void Ql();if(t.kind==="finale")return void $s(n.pack_id,((i=e.settings)==null?void 0:i.play_mode)==="paper");await Ut.from("game_sessions").update({phase:"round_intro",round_number:n.round_number+1,question_index:0,timer_started_at:null,reveal:!1,melody:{}}).eq("id",Zn())}let Lt=null;function I_(){Lt||(Lt=Et(),Lt.play().catch(()=>{}),Lt.pause())}function ws(n){return Lt||(Lt=Et()),Lt.pause(),Lt.loop=!1,Lt.volume=1,lc(Lt,n),Lt}function U_(){if(Lt)try{Lt.pause(),Lt.currentTime=0}catch{}}async function ft(n){await Ut.from("game_sessions").update({melody:n}).eq("id",Zn())}const sn=n=>new Date(Date.now()+n*1e3).toISOString();function F_({src:n}){return J.useEffect(()=>{const e=Et();e.src=n,e.currentTime=0;let t=!1;e.play().then(()=>{if(t)try{e.pause(),e.src=""}catch{}}).catch(()=>{});const i=setTimeout(()=>{try{e.pause()}catch{}},15e3);return()=>{t=!0,clearTimeout(i);try{e.pause(),e.src=""}catch{}}},[n]),o.jsx("div",{className:"mel-reveal-track",children:"♪ играет 15 секунд"})}function O_({pack:n,round:e,gameState:t}){var ce,me,Te,He,Qe,Ve,te,fe;const i=e.settings,s=i.themes??[],r=t.melody??{},a=hn(t.game_id),l=Bn(t.game_id,t.round_number),d=r.played??[],c=J.useRef(null),[h,m]=J.useState(Date.now());J.useEffect(()=>{const z=setInterval(()=>m(Date.now()),200);return()=>clearInterval(z)},[]);const f=r.deadline?new Date(r.deadline).getTime():0,g=f?Math.max(0,Math.ceil((f-h)/1e3)):0,_=J.useRef(0);J.useEffect(()=>{_.current=0},[r.stage,r.key]),g>_.current&&(_.current=g);const M=_.current,p=!!f&&h>=f,[u,T]=(r.key??"0-0").split("-").map(Number),R=(ce=s[u])==null?void 0:ce.tracks[T],y=`q-mel-${r.key}-bid`,w=`q-mel-${r.key}`,S=l.filter(z=>z.question_ref===y);J.useEffect(()=>{if(r.stage!=="bids")return;const z=S.map(de=>({id:de.team_id,sec:Number(de.answer_text)||99,at:de.updated_at})).sort((de,pe)=>de.sec-pe.sec||+new Date(de.at)-+new Date(pe.at)).map(de=>de.id),he=[...z,...a.map(de=>de.id).filter(de=>!z.includes(de))];JSON.stringify(he)!==JSON.stringify(r.order)&&ft({...r,order:he,turn:0})},[r.stage,S.map(z=>`${z.team_id}:${z.answer_text}`).join("|")]),J.useEffect(()=>{if(r.stage!=="snippet")return;const z=r.snippetSec??5,he=window.setTimeout(()=>{ft({...r,stage:"answering",deadline:sn(i.answerSec??30)})},(z+10)*1e3);return()=>clearTimeout(he)},[r.stage,r.key,r.snippetSec]),J.useEffect(()=>{if(r.stage!=="snippet"||!(R!=null&&R.audio)||document.hidden)return;const z=r.snippetSec??5,he=ws(We(R.audio));c.current=he;let de,pe=!1;const ke=()=>{pe||(pe=!0,he.pause(),ft({...r,stage:"answering",deadline:sn(i.answerSec??30)}))};he.addEventListener("playing",()=>{ft({...r,deadline:sn(z)}),de=window.setTimeout(ke,z*1e3)},{once:!0});const Be=window.setTimeout(ke,(z+4)*1e3);return()=>{de&&clearTimeout(de),clearTimeout(Be)}},[r.stage,r.key]),J.useEffect(()=>{var z;if(!(!p||document.hidden))if(r.stage==="spinning")ft({...r,stage:"listen",deadline:sn(2)});else if(r.stage==="bidding"){const he=S.map(pe=>({id:pe.team_id,sec:Number(pe.answer_text)||99,at:pe.updated_at})).sort((pe,ke)=>pe.sec-ke.sec||+new Date(pe.at)-+new Date(ke.at)).map(pe=>pe.id),de=[...he,...a.map(pe=>pe.id).filter(pe=>!he.includes(pe))];ft({...r,stage:"bids",order:de,turn:0,deadline:void 0})}else(r.stage==="answering"||r.stage==="passed")&&(l.some(de=>{var pe,ke;return de.question_ref===`q-mel-${r.key}`&&de.team_id===((pe=r.order)==null?void 0:pe[r.turn??0])&&!!((ke=de.answer_text)!=null&&ke.trim())})?ft({...r,deadline:void 0}):(U_(),(r.turn??0)===0&&(((z=r.order)==null?void 0:z.length)??0)>1?ft({...r,stage:"passed",turn:1,deadline:void 0}):ft({...r,stage:"done",deadline:void 0,played:[...d,r.key]})))},[p,r.stage,l]),J.useEffect(()=>{if(r.stage!=="listen"||!(R!=null&&R.audio)||document.hidden)return;const z=ws(We(R.audio));c.current=z;let he,de=!1;const pe=()=>{de||(de=!0,z.pause(),ft({...r,stage:"bidding",deadline:sn(i.bidSec??10)}))};z.addEventListener("playing",()=>{he=window.setTimeout(pe,1e3)},{once:!0});const ke=window.setTimeout(pe,4e3);return()=>{he&&clearTimeout(he),clearTimeout(ke)}},[r.stage,r.key]),J.useEffect(()=>{var de;const z=e.settings.bg_music??((de=n.settings)==null?void 0:de.bg_music);if(r.stage!=="answering"&&r.stage!=="bidding"||!z||document.hidden)return;const he=ws(We(z));return he.loop=!0,he.volume=.45,()=>{he.pause(),he.loop=!1,he.volume=1}},[r.stage]),J.useEffect(()=>{if(r.stage!=="passed"||r.deadline||!(R!=null&&R.audio)||document.hidden)return;const z=ws(We(R.audio));return c.current=z,z.onended=()=>void ft({...r,deadline:sn(i.passAnswerSec??10)}),()=>{z.pause(),z.onended=null}},[r.stage]);const[A,v]=J.useState(!1);if(s.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"УГАДАЙ МЕЛОДИЮ"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"})]});const I=s.flatMap((z,he)=>z.tracks.map((de,pe)=>`${he}-${pe}`)).filter(z=>!d.includes(z)),P=!r.stage||r.stage==="idle"||r.stage==="done",D=z=>{v(!1),ft({...r,key:z,stage:"listen",deadline:sn(3),order:void 0,turn:0,chooser:void 0})},K=()=>{const z=I[Math.floor(Math.random()*I.length)];if(I.length===1){ft({...r,key:z,stage:"listen",deadline:sn(3),order:void 0,turn:0,chooser:void 0});return}ft({...r,key:z,stage:"spinning",deadline:sn(Math.min(i.spinSec??5,8)),order:void 0,turn:0,chooser:void 0})},H=(me=r.order)==null?void 0:me[r.turn??0],k=a.find(z=>z.id===H),$=Number((Te=S.find(z=>z.team_id===H))==null?void 0:Te.answer_text)||0,U=l.find(z=>z.question_ref===w&&z.team_id===H),W=async z=>{if(!U)return;const de=(r.turn??0)===0?$<=5?2:1:.5;await Ut.from("answers").update({is_correct:z,stake:de}).eq("id",U.id),await ft({...r,stage:"reveal",deadline:void 0,played:[...d,r.key],wonPts:de,wonTeam:H,chooser:void 0})},se=async()=>{var z;(r.turn??0)===0&&(((z=r.order)==null?void 0:z.length)??0)>1?await ft({...r,stage:"passed",turn:1,deadline:void 0}):await ft({...r,stage:"done",deadline:void 0,played:[...d,r.key]})};return o.jsxs("div",{className:"host-screen grid-bg mel-screen",onPointerDown:I_,children:[o.jsx(B_,{themes:s,played:d,spinning:r.stage==="spinning",spinKey:r.key,spinLeft:g,spinTotal:i.spinSec??10,onPick:A?D:void 0}),P&&o.jsx("div",{className:"host-actions",children:I.length>0?A?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ ПЛИТКУ НА ЭКРАНЕ"}),o.jsx("button",{className:"ghost",onClick:()=>v(!1),children:"Отмена"})]}):o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:K,children:d.length===0?"Стартуем!":"Рулетка"}),o.jsx("button",{className:"ghost",onClick:()=>v(!0),children:"Выбрать вручную"})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВСЕ ТРЕКИ ОТЫГРАНЫ"}),o.jsx("button",{onClick:()=>void L_(t,n),children:"Завершить раунд →"})]})}),r.stage&&!P&&r.stage!=="spinning"&&Zl.createPortal(o.jsx("div",{className:`mel-overlay theme-${n.theme??"classic"}`,children:o.jsxs("div",{className:"mel-modal",children:[o.jsxs("div",{className:"mel-modal-head",children:[o.jsxs("div",{className:"mel-modal-theme",children:[(He=s[u])==null?void 0:He.name," · трек ",T+1]}),!!f&&o.jsx("div",{className:"mel-count",children:n.theme==="potter"?o.jsx(dc,{left:g,seconds:M,low:g<=5}):g})]}),r.stage==="listen"&&o.jsx("div",{className:"mel-big",children:"СЛУШАЕМ 1 СЕКУНДУ…"}),r.stage==="bidding"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mel-big",children:"ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?"}),o.jsx("div",{className:"mel-points-hint",children:"2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0.5 балла"}),o.jsx("div",{className:"mel-bids",children:[...a].sort((z,he)=>z.name.localeCompare(he.name)).map(z=>{const he=S.find(de=>de.team_id===z.id);return o.jsxs("div",{className:`mel-bid-row${he?" win":""}`,children:[o.jsx("span",{style:{color:z.color},children:z.name}),o.jsx("b",{children:he?"ставка принята ✓":"…"}),o.jsx("span",{})]},z.id)})})]}),r.stage==="bids"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"СТАВКИ КОМАНД"}),o.jsxs("div",{className:"mel-bids",children:[(r.order??[]).map((z,he)=>{const de=a.find(ke=>ke.id===z),pe=S.find(ke=>ke.team_id===z);return o.jsxs("div",{className:`mel-bid-row${he===0?" win":""}`,children:[o.jsx("span",{style:{color:de==null?void 0:de.color},children:de==null?void 0:de.name}),o.jsxs("b",{children:[pe==null?void 0:pe.answer_text," сек"]}),he===0?o.jsx("span",{className:"mel-win-tag",children:"ИГРАЕТ"}):o.jsx("span",{})]},z)}),(r.order??[]).length===0&&o.jsx("div",{style:{opacity:.6},children:"ставок нет"})]}),o.jsxs("div",{className:"mel-actions",children:[o.jsxs("button",{disabled:!H,onClick:()=>void ft({...r,stage:"snippet",snippetSec:$||5,deadline:void 0}),children:["Играем ",$||5," сек →"]}),o.jsx("button",{className:"ghost dark",onClick:()=>void ft({...r,stage:"done",deadline:void 0,played:[...d,r.key]}),children:"Пропустить трек"})]})]}),r.stage==="snippet"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:k==null?void 0:k.color},children:[k==null?void 0:k.name," · играет ",$," сек"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void ft({...r,stage:"answering",deadline:sn(i.answerSec??30)}),children:"Принимаем ответ →"})})]}),r.stage==="reveal"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"answer-reveal",style:{padding:"18px 28px"},children:[o.jsxs("div",{className:"answer-label",children:["ВЕРНО ✓ · +",r.wonPts??0]}),o.jsx("div",{className:"answer-main",children:R==null?void 0:R.correct})]}),(R==null?void 0:R.audio)&&o.jsx(F_,{src:We(R.audio)}),o.jsxs("div",{className:"mel-big",style:{color:(Qe=a.find(z=>z.id===r.wonTeam))==null?void 0:Qe.color},children:[(Ve=a.find(z=>z.id===r.wonTeam))==null?void 0:Ve.name," забирает баллы"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void ft({...r,stage:"done"}),children:"К доске →"})})]}),r.stage!=="reveal"&&r.stage!=="done"&&o.jsx("button",{className:"mel-escape",onClick:async()=>{confirm(`Закрыть трек и вернуться к доске?

Баллы за него никто не получит.`)&&await ft({...r,stage:"done",deadline:void 0,played:[...d,r.key]})},children:"Закрыть"}),(r.stage==="answering"||r.stage==="passed")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:k==null?void 0:k.color},children:[r.stage==="passed"?"ХОД ПЕРЕДАН · ":"",(k==null?void 0:k.name)??"—"]}),o.jsx("div",{className:"mel-points-hint",children:r.stage==="passed"?"за верный ответ — 0.5 балла":`ставка ${$} сек → за верный ответ ${$<=5?2:1} балла`}),o.jsx("div",{className:"mel-answer",children:U!=null&&U.answer_text?o.jsxs(o.Fragment,{children:["Ответ: ",o.jsx("b",{children:U.answer_text})]}):o.jsx("span",{style:{opacity:.6},children:"ждём ответ…"})}),(U==null?void 0:U.is_correct)===!0&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ВЕРНО ✓"}),o.jsx("div",{className:"answer-main",children:R==null?void 0:R.correct})]}),(U==null?void 0:U.is_correct)===!1&&o.jsxs("div",{className:"mel-wrong",children:["✗ НЕВЕРНО · ответ не раскрываем",(r.turn??0)===0&&(((te=r.order)==null?void 0:te.length)??0)>1?" — передайте ход второй команде":" — трек закрывается"]}),o.jsxs("div",{className:"mel-actions",children:[o.jsx("button",{disabled:!U,onClick:()=>void W(!0),children:"✓ Верно"}),o.jsx("button",{className:"ghost",onClick:async()=>{U&&U.is_correct==null&&await Ut.from("answers").update({is_correct:!1,stake:0}).eq("id",U.id),await se()},children:(r.turn??0)===0&&(((fe=r.order)==null?void 0:fe.length)??0)>1?"✗ Передать ход →":"✗ Закрыть трек"})]})]})]})}),document.body)]})}function B_({themes:n,played:e,spinning:t,spinKey:i,spinLeft:s,spinTotal:r,onPick:a}){const d=n.flatMap((g,_)=>g.tracks.map((M,p)=>`${_}-${p}`)).filter(g=>!e.includes(g)),[c,h]=J.useState(0),m=J.useRef(s);m.current=s,J.useEffect(()=>{if(!t||d.length===0||s<=0)return;let g=!1,_;const M=()=>{if(g)return;h(u=>{let T=Math.floor(Math.random()*d.length);return d.length>1&&T===u&&(T=(T+1)%d.length),T});const p=1-Math.max(0,m.current)/Math.max(1,r);_=window.setTimeout(M,180+p*p*720)};return _=window.setTimeout(M,180),()=>{g=!0,_&&clearTimeout(_)}},[t]);const f=t?s<=1?i:d[c%Math.max(1,d.length)]:void 0;return o.jsxs("div",{className:"mel-board",style:{gridTemplateColumns:`repeat(${n.length}, minmax(0,1fr))`,gridTemplateRows:`auto repeat(${Math.max(...n.map(g=>g.tracks.length),1)}, minmax(0, 1fr))`},children:[n.map((g,_)=>o.jsx("div",{className:"mel-theme",children:g.name||`Тема ${_+1}`},`h${_}`)),n.map((g,_)=>g.tracks.map((M,p)=>{const u=`${_}-${p}`,T=e.includes(u),R=f===u;return o.jsx("div",{className:`mel-tile${T?" done":""}${R?" spin":""}${a&&!T?" pickable":""}`,onClick:a&&!T?()=>a(u):void 0,"data-c":String(_%4),style:{gridColumn:_+1,gridRow:p+2},children:o.jsx("span",{className:"mel-face",children:T?"":p+1})},u)}))]})}const Gl=[{body:"#f2e3c9",mask:"#b99a7d",name:"кремовый"},{body:"#8a5a33",mask:"#4c2f17",name:"тигровый"},{body:"#3b3b40",mask:"#232326",name:"чёрный"},{body:"#e8e2d8",mask:"#c96f3b",name:"бело-рыжий"},{body:"#9aa7b5",mask:"#6c7886",name:"голубой"}];function z_(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function k_(n,e){const t=z_(n),i=8,s=Array.from({length:5},()=>{const M=Array.from({length:i},()=>.45+t()*.9),p=M.reduce((u,T)=>u+T,0);return{speeds:M,total:p}}),r=Math.max(...s.map(M=>M.total)),a=s.map(M=>e*.92*(r/M.total)),l=(M,p)=>{const u=a[M],R=Math.min(1,Math.max(0,p/u))*i,y=Math.floor(R),w=R-y;let S=0;for(let A=0;A<y;A++)S+=s[M].speeds[A];return S+=(s[M].speeds[Math.min(y,i-1)]??0)*w,Math.min(1,S/s[M].total)},d=["🦋","💤","🐦","🍂"],c=Array.from({length:5},()=>{const M=[];return t()<.6&&M.push({at:(.25+t()*.3)*e,dur:.6+t()*.9,icon:d[Math.floor(t()*d.length)]}),t()<.25&&M.push({at:(.62+t()*.22)*e,dur:.5+t()*.7,icon:d[Math.floor(t()*d.length)]}),M}),h=(M,p)=>c[M].find(u=>p>=u.at&&p<u.at+u.dur),m=(M,p)=>{let u=0;for(const T of c[M])u+=Math.min(Math.max(0,p-T.at),T.dur);return p-u},f=(M,p)=>l(M,m(M,p)),g=a.map((M,p)=>M+c[p].reduce((u,T)=>u+T.dur,0)),_=g.map((M,p)=>({i:p,f:M})).sort((M,p)=>M.f-p.f).map(M=>M.i);return{progress:f,finish:g,places:_,pausedAt:h}}function G_({pack:n,round:e,gameState:t}){var y;const i=e.settings,s=(i.dogs??[]).length===5?i.dogs:["Френк","Батон","Пельмень","Турбо","Ракета"],r=i.raceSec??18,a=((y=t.melody)==null?void 0:y.race)??{},l=hn(t.game_id),c=Bn(t.game_id,t.round_number).filter(w=>w.question_ref===`q-race-${t.round_number}`),h=J.useRef(!1);J.useEffect(()=>{var A;const w=e.settings.race_music??((A=n.settings)==null?void 0:A.bg_music);if(a.stage!=="running"||!w||document.hidden)return;const S=Et();return S.src=We(w),S.loop=!0,S.volume=.55,S.play().catch(()=>{}),()=>S.pause()},[a.stage]);const[m,f]=J.useState(Date.now());J.useEffect(()=>{const w=setInterval(()=>f(Date.now()),66);return()=>clearInterval(w)},[]);const g=J.useMemo(()=>a.seed!=null?k_(a.seed,r):null,[a.seed,r]),_=a.startedAt?(m-new Date(a.startedAt).getTime())/1e3:0,M=a.stage==="running"&&g,p=a.stage==="done",u=g&&_>=Math.max(...g.finish)+1;J.useEffect(()=>{if(!M||!u||h.current||document.hidden)return;h.current=!0;const w=new Map(g.places.map((S,A)=>[S,A]));(async()=>{for(const S of c){const A=Number(S.answer_text)-1,v=w.get(A),C=v!=null?5-v:0;await Ut.from("answers").update({is_correct:!0,stake:C}).eq("id",S.id)}await Ut.from("game_sessions").update({melody:{...t.melody,race:{...a,stage:"done"}}}).eq("id",Zn())})()},[M,u]),J.useEffect(()=>{!a.stage&&!document.hidden&&R()},[a.stage]);const T=()=>Dd(t),R=()=>Pd(t);return o.jsxs("div",{className:"host-screen grid-bg race-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")||"СКАЧКИ БУЛЬДОГОВ"})}),(a.stage==="running"||p)&&o.jsxs("div",{className:"race-track hud-frame",children:[o.jsx("div",{className:"race-stands",children:Array.from({length:26},(w,S)=>o.jsx("span",{style:{animationDelay:`${S%5*.3}s`},children:["🎉","👏","🙌","⭐","🎊"][S%5]},S))}),o.jsx("div",{className:"race-finish"}),s.map((w,S)=>{const A=(M||p)&&g?g.progress(S,p?999:_):0,v=g&&(p||u)?g.places.indexOf(S):null,C=M&&!p?g==null?void 0:g.pausedAt(S,_):void 0,I=!!g&&_>=g.finish[S];return o.jsxs("div",{className:"race-lane",children:[o.jsx("span",{className:"race-num",children:S+1}),o.jsxs("div",{className:"race-dog",style:{left:`calc(${6+A*82}% )`},children:[C&&o.jsx("span",{className:"race-pause",children:C.icon}),o.jsx(H_,{color:Gl[S],running:!!M&&!u&&!C&&!I}),o.jsxs("span",{className:"race-name",children:[w,v!=null&&` · ${v+1} место`]})]}),o.jsx("span",{className:"race-treat",children:"🍖"})]},S)})]}),(!a.stage||a.stage==="betting")&&o.jsxs("div",{className:"race-panel",children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА · СТАВКИ ТАЙНЫЕ"}),o.jsx("div",{className:"race-lineup",children:s.map((w,S)=>o.jsxs("div",{className:"race-candidate",children:[o.jsx(V_,{color:Gl[S],n:S+1}),o.jsxs("span",{className:"race-tag",children:[o.jsxs("b",{children:["№",S+1]})," ",w]})]},S))}),o.jsxs("div",{className:"mono-tag",style:{color:c.length===l.length&&l.length>0?"var(--answer)":void 0},children:["СТАВКИ СДЕЛАЛИ: ",c.length," / ",l.length]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{disabled:c.length===0,onClick:()=>void T(),children:"🏁 Старт! (ставки закрываются)"})})]}),p&&g&&o.jsxs("div",{className:"race-result",children:[o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})}),o.jsxs("div",{className:"answer-reveal",style:{padding:"14px 30px"},children:[o.jsx("div",{className:"answer-label",children:"ПОБЕДИТЕЛЬ"}),o.jsxs("div",{className:"answer-main",children:["№",g.places[0]+1," ",s[g.places[0]]]})]}),o.jsx("div",{className:"mono-tag",children:g.places.map((w,S)=>`${S+1}. ${s[w]}`).join("  ·  ")})]})]})}function V_({color:n,n:e}){const t=n.body;return o.jsxs("svg",{viewBox:"0 0 150 144",className:"bulldog-sit",children:[o.jsx("path",{d:"M75,60 C112,60 122,86 118,112 C116,128 34,128 32,112 C28,86 38,60 75,60 Z",fill:t}),o.jsx("ellipse",{cx:"34",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("ellipse",{cx:"116",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("path",{d:"M75,72 C89,72 93,96 91,118 C90,123 60,123 59,118 C57,96 61,72 75,72 Z",fill:"#fff",opacity:".88"}),o.jsx("rect",{x:"54",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("rect",{x:"83",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("ellipse",{cx:"60.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("ellipse",{cx:"89.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("circle",{cx:"75",cy:"42",r:"34",fill:t}),o.jsx("path",{d:"M43,26 C29,11 33,-4 47,-2 C58,0 63,13 61,28 C56,34 47,34 43,26 Z",fill:t}),o.jsx("path",{d:"M107,26 C121,11 117,-4 103,-2 C92,0 87,13 89,28 C94,34 103,34 107,26 Z",fill:t}),o.jsx("path",{d:"M47,23 C38,12 41,1 49,2 C56,3 58,15 56,24 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M103,23 C112,12 109,1 101,2 C94,3 92,15 94,24 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"59",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("ellipse",{cx:"91",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("circle",{cx:"61.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("circle",{cx:"93.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("path",{d:"M53,52 C53,45 97,45 97,52 C97,66 87,73 75,73 C63,73 53,66 53,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"75",cy:"53",rx:"7.4",ry:"5.2",fill:"#3a2e33"}),o.jsx("path",{d:"M75,57 v6.5",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M65,64 Q70,69.5 75,65 Q80,69.5 85,64",fill:"none",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M51,71 C60,79 90,79 99,71 L99,78 C90,85 60,85 51,78 Z",fill:"#e63946"}),o.jsx("circle",{cx:"75",cy:"83",r:"10.5",fill:"#f5c542",stroke:"#c99a1e",strokeWidth:"2"}),o.jsx("text",{x:"75",y:"88.5",textAnchor:"middle",fontSize:"14.5",fontWeight:"700",fill:"#5a4210",children:e})]})}function H_({color:n,running:e}){const t=n.body,i=n.mask;return o.jsxs("svg",{viewBox:"0 0 160 112",className:`bulldog${e?" run":""}`,children:[o.jsxs("g",{className:"bd-dust",children:[o.jsx("circle",{cx:"26",cy:"92",r:"3.4",fill:"#cfd8e3"}),o.jsx("circle",{cx:"18",cy:"86",r:"2.2",fill:"#cfd8e3"}),o.jsx("circle",{cx:"33",cy:"96",r:"1.9",fill:"#cfd8e3"})]}),o.jsxs("g",{className:"bd-speed",stroke:"#9fc3e8",strokeWidth:"2.2",strokeLinecap:"round",opacity:".5",children:[o.jsx("line",{x1:"6",y1:"46",x2:"26",y2:"46"}),o.jsx("line",{x1:"10",y1:"60",x2:"28",y2:"60"})]}),o.jsxs("g",{className:"bd-all",children:[o.jsx("path",{className:"bd-hind h2",d:"M64,74 Q60,84 63,92 Q64,96 71,96 L71,92 Q67,90 68,82 Q70,76 71,74 Z",fill:t}),o.jsx("path",{className:"bd-fore f2",d:"M101,72 Q106,82 104,90 Q105,94 112,94 L112,90 Q108,88 108,81 Q108,74 107,70 Z",fill:t}),o.jsx("path",{d:"M40,60 C36,42 54,34 74,34 C96,34 108,44 110,56 C112,70 100,81 80,82 C58,83 42,76 40,60 Z",fill:t}),o.jsx("path",{d:"M56,74 C66,80 88,80 100,72 C96,80 66,84 56,74 Z",fill:"#fff",opacity:".85"}),o.jsx("circle",{cx:"38",cy:"52",r:"4.5",fill:t,stroke:i,strokeWidth:"1"}),o.jsx("path",{className:"bd-hind h1",d:"M50,70 Q44,80 48,89 Q49,94 57,94 L57,89 Q52,88 53,80 Q56,73 58,70 Z",fill:t}),o.jsx("path",{className:"bd-fore f1",d:"M90,72 Q94,82 91,90 Q92,95 100,95 L100,90 Q96,88 97,80 Q99,74 98,71 Z",fill:t}),o.jsxs("g",{className:"bd-head",children:[o.jsx("circle",{cx:"118",cy:"44",r:"30",fill:t}),o.jsx("path",{d:"M88,32 C74,14 78,-2 92,-1 C103,0 108,14 106,30 C100,36 92,37 88,32 Z",fill:t}),o.jsx("path",{d:"M148,32 C162,14 158,-2 144,-1 C133,0 128,14 130,30 C136,36 144,37 148,32 Z",fill:t}),o.jsx("path",{d:"M92,28 C83,15 86,3 94,4 C101,5 103,17 101,27 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M144,28 C153,15 150,3 142,4 C135,5 133,17 135,27 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"105",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("ellipse",{cx:"131",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("circle",{cx:"107",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("circle",{cx:"133",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("path",{d:"M100,52 C100,45 136,45 136,52 C136,64 128,71 118,71 C108,71 100,64 100,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"118",cy:"53",rx:"6.4",ry:"4.6",fill:"#3a2e33"}),o.jsx("path",{d:"M118,56.5 v6",stroke:"#3a2e33",strokeWidth:"1.8",strokeLinecap:"round"}),o.jsx("path",{d:"M110,62 Q114,67 118,63 Q122,67 126,62",fill:"none",stroke:"#3a2e33",strokeWidth:"1.9",strokeLinecap:"round"}),o.jsx("path",{className:"bd-tongue",d:"M112,65 Q118,76 124,65 Q122,71 118,71.5 Q114,71 112,65 Z",fill:"#ff8da1"})]})]})]})}function Ix(){var l;const{gameState:n,loading:e,roomId:t}=ud(),[i,s]=J.useState(null);if(J.useEffect(()=>{n!=null&&n.pack_id?Id(n.pack_id).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id]),!e&&!t)return o.jsx(hd,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",a=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"";return o.jsxs(Fd,{theme:r,isProjector:!0,children:[r==="new_year"&&o.jsx(Od,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),o.jsx(W_,{gameState:n,pack:i}),o.jsx(qd,{theme:r,trigger:a}),i&&o.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((l=i.settings)==null?void 0:l.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name})]})}function Ws({theme:n}){return n==="new_year"?o.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?o.jsx("div",{className:"title-deco",children:"⚡ ✦ 🪄 ✦ ⚡"}):null}function Vl({theme:n}){return n!=="classic"?null:o.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[o.jsx("span",{className:"cd-line"}),o.jsx("span",{className:"cd-chip",children:"◆"}),o.jsx("span",{className:"cd-line"})]})}function W_({gameState:n,pack:e}){var p,u,T,R;const[t,i]=J.useState([]),[s,r]=J.useState("");J.useEffect(()=>{Ud().then(i).catch(()=>i([]))},[]);const a=hn((n==null?void 0:n.game_id)??null),l=J.useMemo(()=>{const y=`${location.origin}${location.pathname}#/player?room=${Zn()??""}`;return n!=null&&n.pack_id?`${y}&pack=${n.pack_id}`:y},[n==null?void 0:n.pack_id]),d=((n==null?void 0:n.random_groups)??[]).filter(y=>Array.isArray(y)&&y.length>0),c=d.map(y=>y.join(",")).join("|"),[h,m]=J.useState(!0);J.useEffect(()=>{m(!0)},[c]);const f=d.length>0&&h;if(ox((p=e==null?void 0:e.rounds)==null?void 0:p[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),!n)return o.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const g=((u=e==null?void 0:e.settings)==null?void 0:u.play_mode)==="paper";if(n.phase==="lobby"||!n.pack_id||!e)return o.jsxs("div",{className:`host-screen grid-bg${g?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&o.jsx(ax,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?o.jsxs("div",{className:"cyber-lobby-head",children:[o.jsx($l,{side:"left"}),o.jsxs("div",{className:"clh-title",children:[o.jsx(Mn,{theme:"classic",lines:["QUIZ","PARTY"]}),o.jsx(Vl,{theme:"classic"})]}),o.jsx($l,{side:"right"})]}):o.jsxs(o.Fragment,{children:[o.jsx(Mn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),o.jsx(Ws,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?o.jsxs(o.Fragment,{children:[f&&o.jsx(ix,{groups:d,onClose:()=>m(!1)}),d.length>0&&!h&&o.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>m(!0),children:"СОСТАВЫ КОМАНД"}),o.jsxs("div",{className:"lobby-teams",children:[a.length>0&&o.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?g?null:o.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):a.map(y=>o.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":y.color,opacity:Ld(y)?1:.4},children:[y.icon&&o.jsx("span",{className:"lobby-team-icon",children:y.icon}),y.name]},y.id))]}),!g&&o.jsx("img",{alt:"QR",className:`lobby-qr-corner${f?" lobby-qr-lit":""}`,src:`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=1&data=${encodeURIComponent(l)}`}),!g&&f&&o.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Gr()},children:"⟲ Сменить пакет"}),o.jsx("button",{onClick:()=>{var y,w;return void((y=e==null?void 0:e.settings)!=null&&y.show_intro?pd():kr(0,Vr((w=e==null?void 0:e.settings)==null?void 0:w.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):o.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[o.jsxs("select",{value:s,onChange:y=>r(y.target.value),style:{fontSize:"1.2rem"},children:[o.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(y=>o.jsxs("option",{value:y.id,children:[y.name," (",y.status==="ready"?"готов":y.status==="played"?"сыгран":y.status,")"]},y.id))]}),o.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const y=t.find(w=>w.id===s);y&&y.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||fd(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return o.jsx(D_,{onDone:()=>{var y;kr(0,Vr((y=e==null?void 0:e.settings)==null?void 0:y.info_slides,0)??void 0)}});const _=e.rounds[n.round_number];if(!_)return o.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const M=_.questions[n.question_index];if(n.phase==="round_intro"){const y=_.settings.grid;return o.jsxs("div",{className:"host-screen grid-bg round-intro",children:[_.rules_audio&&o.jsx("audio",{autoPlay:!0,src:We(_.rules_audio)}),_.mechanic==="crossword"&&y?o.jsxs("div",{className:"cw-layout",children:[o.jsx(Bd,{grid:y,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/y.cols,innerHeight*.8/y.rows))))}),o.jsxs("div",{className:"side",children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Yn(e,n.round_number)]}),o.jsx(Mn,{theme:e.theme,lines:_.title_lines}),o.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:So(_)}),_.rules.map((w,S)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+S*.5}s`},children:[o.jsx("span",{className:"idx",children:String(S+1).padStart(2,"0")}),w]},S))]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"round-badge",children:[o.jsx("span",{className:"rb-word",children:"РАУНД"}),o.jsx("span",{className:"rb-num",children:Yn(e,n.round_number)})]}),o.jsxs("div",{className:"ri-main",children:[o.jsx(Mn,{theme:e.theme,lines:_.title_lines}),o.jsx(Ws,{theme:e.theme}),o.jsx(Vl,{theme:e.theme}),o.jsx("div",{className:"meta-line",children:So(_)})]}),_.rules.length>0&&o.jsxs("div",{className:"rules-frame","data-count":_.rules.length,children:[o.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),_.rules.map((w,S)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+S*.7}s`},children:[o.jsx("span",{className:"idx",children:String(S+1).padStart(2,"0")}),w]},S))]})]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void yi(0),children:_.mechanic==="jeopardy"?"Начать раунд →":_.mechanic==="race"?"К скачкам →":_.mechanic==="melody"?"К трекам →":_.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(n.phase==="question"&&_.mechanic==="sprint")return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx(ru,{pack:e,round:_,gameState:n,timerNode:o.jsx(Ba,{startedAt:n.timer_started_at,seconds:_.timer_seconds,theme:e.theme})}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{className:"ghost dark",onClick:()=>void ki(0),children:"К ответам →"})})]});if(n.phase==="question"&&_.mechanic==="blitz")return o.jsx(ux,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="race")return o.jsx(G_,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="melody")return o.jsx(O_,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="jeopardy")return o.jsx(xx,{pack:e,round:_,gameState:n});if(n.phase==="question"&&M){const y=M.media.question??[],w=y.filter(U=>!/\.(mp3|mp4|webm|wav)$/i.test(U)),S=y.filter(U=>/\.(mp3|mp4|webm|wav)$/i.test(U)),A=!!M.question_text.trim()&&w.length===1&&!M.media.hidden,v=M.answer.mode==="choice"||M.answer.mode==="order"?M.answer.choices:null,C=e.theme==="new_year",I=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>_.timer_seconds-10,P=e.theme==="classic",D=!!M.question_text.trim(),H=e.theme==="potter"&&_.mechanic!=="rebus"?"pt-frame":C&&_.mechanic!=="rebus"?`q-frame${I?" low":""}`:P?"cyber-frame":"",k=!M.media.hidden&&w.length>1&&(M.answer.mode==="choice"&&M.answer.choices.length===w.length||M.answer.mode==="match"&&M.answer.left.length===w.length),$=((T=e.settings)!=null&&T.answers_reveal&&_.answers_reveal==="after_question",_.answers_reveal??"after_round");return o.jsxs("div",{className:`host-screen grid-bg${D?"":" no-qtext"}${w.length&&!M.media.hidden?" has-media":""}${v&&!k||M.answer.mode==="match"&&(M.answer.right_labels??[]).some(Boolean)?" has-choices":""}`,children:[o.jsx(hc,{}),_.mechanic!=="jeopardy"&&o.jsxs(o.Fragment,{children:[o.jsx(fx,{startedAt:n.timer_started_at,seconds:_.timer_seconds,q:M,round:_,pack:e,timerRunning:!!n.timer_started_at,manual:g,gameId:n.game_id,roundNumber:n.round_number}),o.jsx(_x,{round:_,gameState:n,isLast:n.question_index+1>=_.questions.length}),o.jsx(gx,{enabled:$==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:_.timer_seconds})]}),o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"qnum",children:["Р",Yn(e,n.round_number)," · ВОПРОС"," ",o.jsx("b",{children:n.question_index+1})," / ",_.questions.length]}),_.mechanic!=="jeopardy"&&o.jsx(Ba,{startedAt:n.timer_started_at,seconds:_.timer_seconds,theme:e.theme},M.id)]}),A?o.jsxs("div",{className:"q-split",children:[o.jsxs("div",{className:H,children:[C&&o.jsx(Hl,{seed:M.id,low:I}),P&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(Wl,{text:M.question_text},M.id)]}),o.jsx("div",{className:"q-media-grid n1",style:js(M),children:w.map((U,W)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:We(U),alt:""}),M.answer.mode==="match"&&o.jsx("figcaption",{children:W+1})]},W))})]}):o.jsxs(o.Fragment,{children:[D&&o.jsxs("div",{className:H,children:[C&&o.jsx(Hl,{seed:M.id,low:I}),P&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(Wl,{text:M.question_text},M.id)]}),!M.media.hidden&&w.length>0&&(k?o.jsx("div",{className:`img-answers n${Math.min(w.length,5)}${w.length>1?" eq-row":""}`,children:w.map((U,W)=>{var se,ce;return o.jsx(sx,{src:We(U),badge:M.answer.mode==="match"?String(W+1):((se=v==null?void 0:v[W])==null?void 0:se.key)??"",children:M.answer.mode==="choice"&&((ce=v==null?void 0:v[W])==null?void 0:ce.text)&&o.jsx("span",{className:"ia-text",children:v[W].text})},W)})}):o.jsx("div",{className:`q-media-grid n${Math.min(w.length,4)}${_.mechanic==="rebus"?" rebus":""}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,style:js(M),children:w.map((U,W)=>o.jsx(Xs,{src:We(U)},W))}))]}),S.map((U,W)=>/\.(mp4|webm)$/i.test(U)?o.jsx(hx,{src:We(U),hidden:!!M.media.hidden,waitFor:!!M.media.voice,go:!!n.timer_started_at},W):null),M.answer.mode==="match"&&(M.answer.right_labels??[]).some(Boolean)&&o.jsx("div",{className:`choices-grid${Oa(M.answer.right_labels??[])}`,children:M.answer.right.map((U,W)=>{var se;return o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+W*.3}s`},children:[o.jsx("span",{className:"key",children:U}),((se=M.answer.right_labels)==null?void 0:se[W])??""]},U)})}),v&&!k&&o.jsx("div",{className:`choices-grid${Oa(v.map(U=>U.text))}`,children:v.map((U,W)=>o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+W*.35}s`},children:[o.jsx("span",{className:"key",children:U.key}),U.text]},U.key))}),($==="after_question"||_.mechanic==="jeopardy")&&n.reveal&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",children:Wi(M)}),M.answer_note&&o.jsx("div",{style:{opacity:.75},children:M.answer_note}),(()=>{const U=M.media.answer??[],W=U.filter(ce=>!/\.(mp3|wav|m4a|ogg)$/i.test(ce)),se=U.find(ce=>/\.(mp3|wav|m4a|ogg)$/i.test(ce));return o.jsxs(o.Fragment,{children:[se&&o.jsx(ed,{src:We(se)}),W.length>0&&o.jsx("div",{className:"q-media-grid",style:{maxHeight:"26vh"},children:W.map((ce,me)=>o.jsx("img",{src:We(ce),alt:""},me))})]})})()]}),o.jsxs("div",{className:"host-actions",children:[o.jsx(j_,{gameState:n}),($==="after_question"||_.mechanic==="jeopardy")&&!n.reveal&&o.jsx("button",{onClick:()=>void Is(),children:"Показать ответ"}),n.question_index+1<_.questions.length?o.jsx("button",{onClick:()=>void yi(n.question_index+1),children:"Дальше →"}):$==="after_round"?o.jsx("button",{onClick:()=>void ec(),children:"Время ответов →"}):o.jsx(ei,{pack:e,gameState:n})]})]})}if(n.phase==="info"){const y=((R=e==null?void 0:e.settings)==null?void 0:R.info_slides)??[],w=y[n.question_index]??y[0];if(w)return o.jsx(lx,{pack:e,slide:w,packId:n.pack_id,gameState:n})}return n.phase==="recap"?o.jsx(rx,{pack:e,round:_,gameState:n}):n.phase==="answer_time"?o.jsx(px,{pack:e,round:_,gameState:n}):n.phase==="show_answers"&&M?o.jsx(mx,{pack:e,round:_,q:M,gameState:n}):n.phase==="scoreboard"?o.jsx(Sx,{pack:e,gameState:n}):n.phase==="break"?o.jsx(yx,{pack:e,round:_,gameState:n}):n.phase==="counting"?o.jsx(Ex,{pack:e,gameState:n}):n.phase==="finale"?o.jsx(bx,{pack:e,gameId:n.game_id,gameState:n}):o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!M&&o.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Ys("round_intro"),children:"← К титулу раунда"})})]})}function j_({gameState:n}){return n.question_index>0?o.jsx("button",{className:"ghost",onClick:()=>void yi(n.question_index-1),children:"← Назад"}):o.jsx("button",{className:"ghost",onClick:()=>void Ys("round_intro"),children:"← К титулу"})}function Hl({seed:n,low:e}){const t=J.useMemo(()=>{let i=0;for(const a of n)i=i*31+a.charCodeAt(0)>>>0;const s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=60;return Array.from({length:r},(a,l)=>({left:(l+.5)*(100/r)+(s()-.5)*2.5,len:8+s()*34,delay:s()*.5,sway:3+s()*3}))},[n]);return o.jsx("div",{className:"icicles",children:t.map((i,s)=>o.jsx("span",{className:"icicle",style:{left:`${i.left}%`,height:i.len,"--len":`${i.len}px`,animationDelay:`${i.delay}s, ${i.delay}s`,animationDuration:`${i.sway}s, .7s`}},s))})}function X_(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function Oa(n){const e=Math.max(0,...n.map(t=>(t??"").trim().length));return e<=28?"":e<=55?" c-m":e<=95?" c-l":" c-xl"}function Wl({text:n}){const e=n.split(/(\s+)/);let t=0;const i=za([n]);return o.jsx("p",{ref:i,className:`q-text${Ei(n)}`,children:e.map((s,r)=>{if(/^\s+$/.test(s))return s;const a=.12*t++;return o.jsx("span",{className:"q-word",style:{animationDelay:`${a}s`},children:s},r)})})}function q_(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const Mn=J.forwardRef(function({theme:e,lines:t},i){const s=q_(t),r=t.join(`
`),a=ac(r,e==="classic"),l=e==="classic"?a.split(`
`):t;if(e!=="new_year")return o.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((c,h)=>o.jsxs("span",{style:h===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[l[h]??c,o.jsx("br",{})]},h))});let d=0;return o.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((c,h)=>o.jsx("span",{style:{display:"block"},children:[...c].map((m,f)=>m===" "?o.jsx("span",{children:" "},f):o.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*d++}s`},children:m},f))},h))})});function $_(){oc()}function Y_(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n,t=e.currentTime,i=e.createGain();i.gain.value=.5,i.connect(e.destination);const s=(r,a,l,d,c)=>{const h=e.createOscillator(),m=e.createGain();h.type=d,h.frequency.setValueAtTime(r,t+a),m.gain.setValueAtTime(1e-4,t+a),m.gain.linearRampToValueAtTime(c,t+a+.008),m.gain.setValueAtTime(c,t+a+l-.05),m.gain.exponentialRampToValueAtTime(1e-4,t+a+l),h.connect(m),m.connect(i),h.start(t+a),h.stop(t+a+l+.02)};for(let r=0;r<5;r++)s(1046.5,r*.22,.11,"square",.3);s(784,1.2,1.25,"square",.26),s(392,1.2,1.25,"sine",.3),setTimeout(()=>void e.close(),3e3)}catch{}}function Ba({startedAt:n,seconds:e,theme:t,chime:i=!0}){const[s,r]=J.useState(e),a=J.useRef(!1);J.useEffect(()=>{if(!n){r(e),a.current=!1;return}const c=()=>{const m=(Date.now()-new Date(n).getTime())/1e3,f=Math.max(0,Math.ceil(e-m));r(f),f===0&&i&&!a.current&&(a.current=!0,Y_())};c();const h=setInterval(c,250);return()=>clearInterval(h)},[n,e,i]);const l=s<=10;if(t==="new_year"){const h=2*Math.PI*44,m=Math.max(0,Math.min(1,s/e)),f=Array.from({length:40},(_,M)=>{const p=M/40*Math.PI*2,u=7+M%3*3;return{x1:55+Math.cos(p)*39,y1:55+Math.sin(p)*39,x2:55+Math.cos(p)*(44+u-5),y2:55+Math.sin(p)*(44+u-5),rot:p*180/Math.PI}}),g=Array.from({length:7},(_,M)=>{const p=M/7*Math.PI*2+.4;return{cx:55+Math.cos(p)*44,cy:55+Math.sin(p)*44}});return o.jsxs("div",{className:`ny-wreath${l?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 110 110",children:[f.map((_,M)=>o.jsx("line",{x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2,stroke:M%4===0?"#1f6b3a":"#2f8f4e",strokeWidth:"3",strokeLinecap:"round"},M)),o.jsx("circle",{className:"wr-bg",cx:"55",cy:"55",r:44}),o.jsx("circle",{className:"wr-fg",cx:"55",cy:"55",r:44,strokeDasharray:h,strokeDashoffset:h*(1-m)}),g.map((_,M)=>o.jsx("circle",{className:"wr-berry",cx:_.cx,cy:_.cy,r:"3.4"},M)),o.jsx("path",{className:"wr-bow",d:"M46,99 q9,-9 18,0 q-9,5 -18,0"})]}),o.jsx("span",{className:"val",children:s})]})}if(t==="potter")return o.jsx(dc,{left:s,seconds:e,low:l});const d=!!n&&s>0;return o.jsxs("div",{className:`timer-wrap${l?" low":""}${d?"":" paused"}${n?"":" not-started"}`,children:[o.jsx("span",{className:"tm-orbit","aria-hidden":"true",children:o.jsx("i",{className:"tm-spark"})}),o.jsx("span",{className:`timer-num${l?" danger":""}`,children:s})]})}function Z_(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?o.jsxs(o.Fragment,{children:[s,o.jsx("b",{className:"rebus-hot",children:r})]}):o.jsxs(o.Fragment,{children:[o.jsx("b",{className:"rebus-hot",children:r}),s]})}function K_(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}function js(n){const e=n.media.scale;if(!(e==null||e===100))return{"--ms":Math.min(100,Math.max(50,e))/100}}function Xs({src:n,children:e}){const[t,i]=J.useState(1.5);return o.jsxs("figure",{className:"q-img",style:{flexGrow:t,flexBasis:0},children:[o.jsx("img",{src:n,alt:"",onLoad:s=>{const r=s.currentTarget;r.naturalWidth&&r.naturalHeight&&i(r.naturalWidth/r.naturalHeight)}}),e]})}const J_=5e3,Jc=3300,Q_=500,ex=900,jl=100,Xl=600,ql=500;function tx(n){const e=n.answer;return e.mode==="choice"?Jc+Q_+ex:e.mode==="match"?jl+Xl*Math.max(0,Math.min(e.left.length,6)-1)+ql:e.mode==="order"?jl+Xl*Math.max(0,e.correct_order.length-1)+ql:1200}function nx({src:n}){const e=J.useRef(null);return J.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),o.jsx("div",{className:"reveal-video",children:o.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Qc(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function ed({src:n}){return J.useEffect(()=>{if(document.hidden)return;let e=!1;const t=Et();return t.src=n,t.loop=!1,t.play().then(()=>{if(e)try{t.pause(),t.src=""}catch{}}).catch(()=>{}),()=>{e=!0;try{t.pause(),t.src=""}catch{}}},[n]),null}function $l({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return o.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"cp-bar"}),o.jsx("div",{className:"cp-rows",children:e.map((t,i)=>o.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),o.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>o.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function ix({groups:n,onClose:e}){J.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return o.jsx("div",{className:"groups-overlay",onClick:e,children:o.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[o.jsxs("div",{className:"gm-head",children:[o.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),o.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),o.jsx("div",{className:"lg-list",children:n.map((i,s)=>o.jsxs("div",{className:"lg-team",children:[o.jsxs("div",{className:"lg-name",style:{color:md(s)},children:["Команда ",s+1]}),o.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function sx({src:n,badge:e,children:t}){const[i,s]=J.useState(1.5);return o.jsxs("div",{className:"img-answer",style:{flexGrow:i,flexBasis:0},children:[o.jsxs("span",{className:"ia-frame",children:[o.jsx("span",{className:"ia-key",children:e}),o.jsx("img",{src:n,alt:"",onLoad:r=>{const a=r.currentTarget;a.naturalWidth&&a.naturalHeight&&s(a.naturalWidth/a.naturalHeight)}})]}),t]})}function rx({pack:n,round:e,gameState:t}){const i=J.useMemo(()=>e.questions.filter(f=>!f.hidden),[e.questions]),[s,r]=J.useState(0),a=i[s],l=s+1>=i.length,d=()=>void ec(),c=()=>{l?d():r(f=>f+1)};if(J.useEffect(()=>{if(!a){d();return}let f=!0;const g=()=>{f&&c()},_=setTimeout(g,J_),M=a.media.voice;if(!M)return()=>{f=!1,clearTimeout(_)};const p=Et();p.src=We(M),p.play().catch(()=>{});const u=()=>{clearTimeout(_),g()};return p.addEventListener("ended",u),()=>{f=!1,clearTimeout(_),p.removeEventListener("ended",u);try{p.pause()}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const h=(a.media.question??[]).filter(f=>!/\.(mp3|wav|mp4|webm)$/i.test(f)),m=!!a.question_text.trim();return o.jsxs("div",{className:`host-screen grid-bg recap-screen${h.length?" has-media":""}${m?"":" no-qtext"}`,children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),o.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),o.jsxs("div",{className:"recap-body",children:[m&&o.jsx("p",{className:`q-text${Ei(a.question_text)}`,children:a.question_text}),h.length>0&&o.jsx("div",{className:`q-media-grid n${Math.min(h.length,4)}${h.length>1?" eq-row":""}${h.length>4?" wrap2":""}`,style:js(a),children:h.map((f,g)=>o.jsx(Xs,{src:We(f)},g))})]},a.id),o.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((f,g)=>o.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost",onClick:d,children:"Пропустить повтор"}),o.jsx("button",{onClick:c,children:l?"К ответам →":"Следующий →"})]})]})}function ax({pack:n}){var e,t;return J.useEffect(()=>{var l,d;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=Et();s.src=We(i),s.loop=!0,s.volume=.45;let r=!1;const a=()=>{r||(r=!0,s.play().catch(()=>{}),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a))};return s.play().then(()=>{r=!0}).catch(()=>{window.addEventListener("pointerdown",a),window.addEventListener("keydown",a)}),()=>{window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a);try{s.pause()}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}function ox(n,e){J.useEffect(()=>{if(!n)return;const i=n.questions.filter(a=>!a.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const a of s){const l=We(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const d=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");d.preload="auto",d.src=l,r.push(d)}else{const d=new Image;d.src=l,r.push(d)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[n,e])}function lx({pack:n,slide:e,packId:t,gameState:i}){var l,d;const s=n.rounds.filter(c=>!c.off_scoreboard).map(c=>({id:c.id,name:(c.title_lines??[]).join(" ")||"—",count:c.questions.filter(h=>!h.hidden).length})),r=hn(i.game_id),a=Ad(n,r.length);return o.jsxs(o.Fragment,{children:[o.jsx(Rd,{slide:e,rounds:s,stats:a,mediaUrl:We}),o.jsx("div",{className:"host-actions",children:o.jsx(dx,{slides:((l=n.settings)==null?void 0:l.info_slides)??[],index:cx(n,e),packId:t,paper:((d=n.settings)==null?void 0:d.play_mode)==="paper"})})]})}function cx(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function dx({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return o.jsxs(o.Fragment,{children:[e>0&&o.jsx("button",{className:"ghost",onClick:()=>void xi(e-1),children:"← Назад"}),e+1<n.length&&o.jsx("button",{className:"ghost",onClick:()=>void xi(e+1),children:"Дальше →"}),s?i?o.jsx("button",{onClick:()=>void wd(),children:"К подсчёту →"}):o.jsx("button",{onClick:()=>void $s(t),children:"К итогам →"}):o.jsx("button",{onClick:()=>void Ys("round_intro"),children:"К раунду →"})]})}function ux({pack:n,round:e,gameState:t}){const{state:i,setState:s}=gd(t.game_id,t.round_number),r=hn(t.game_id),a=Bn(t.game_id,t.round_number,400),l=J.useMemo(()=>e.questions.map(u=>({id:u.id,hidden:u.hidden})),[e.questions]),d=e.settings,c=J.useRef(!1),h=async u=>{if(!c.current){c.current=!0,s(u);try{if(await Ed(t.game_id,t.round_number,u),u.finished&&!(i!=null&&i.finished)){const T=Mo(vo(u),d.timeoutPenalty??10),{error:R}=await Ut.from("answers").upsert(T.map(y=>({team_id:y.teamId,game_id:t.game_id,question_ref:"q-blitz",round_number:t.round_number,answer_text:`место ${y.place}`,stake:y.score,updated_at:new Date().toISOString()})),{onConflict:"team_id,question_ref"});R&&console.error("блиц: итоги не записались",R)}}finally{c.current=!1}}};J.useEffect(()=>{if(i||r.length<2)return;const u=setTimeout(()=>{const T=[...r].sort(()=>Math.random()-.5).map(R=>R.id);h(_d(T,d.teamSeconds??60))},3e3);return()=>clearTimeout(u)},[i,r.length]),J.useEffect(()=>{if(!i||i.finished||i.current)return;const u=setTimeout(()=>{const T=xd(l,i.used);if(!T)return void h(fo(i));Cd(T.id).catch(()=>{}),h(vd(i,T.id,Date.now()))},po);return()=>clearTimeout(u)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const m=i==null?void 0:i.current,f=m?e.questions.find(u=>u.id===m.questionId):void 0,g=i?Kl(i):void 0;J.useEffect(()=>{if(!i||!m||!f||!g)return;const u=a.find(R=>R.team_id===g&&R.question_ref===`q-${f.id}`);if(!(u!=null&&u.answer_text)||m.lastAnswer===u.answer_text)return;if(u.answer_text===Md){h(mo(nr(i,Date.now()),Date.now()));return}const T=Hr(f.answer,u.answer_text)===!0;h(Sd(i,Date.now(),T?"ok":"no",u.answer_text))},[a,m==null?void 0:m.questionId,m==null?void 0:m.lastAnswer]);const _=(m==null?void 0:m.verdict)==="no"&&m.attempts+1>=go;if(J.useEffect(()=>{if(!i||!(m!=null&&m.verdict))return;const T=Math.max(0,(_?bd:po)-(Date.now()-(m.pausedAt??Date.now()))),R=setTimeout(()=>{const y=Date.now(),w=nr(i,y),S=a.find(A=>A.team_id===g&&A.question_ref===`q-${m.questionId}`);S&&Ut.from("answers").update({is_correct:m.verdict==="ok"}).eq("id",S.id).then(()=>{}),h(m.verdict==="ok"?_o(w,y):xo(w,y))},T);return()=>clearTimeout(R)},[m==null?void 0:m.verdict,m==null?void 0:m.lastAnswer]),!i)return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),o.jsx(Eo,{teams:r,rolling:!0})]});if(i.finished){const u=Mo(vo(i),d.timeoutPenalty??10);return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),o.jsxs("table",{className:"score-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),o.jsx("th",{children:"Очки"}),o.jsx("th",{children:"Баллы"})]})}),o.jsx("tbody",{children:u.map(T=>{var R;return o.jsxs("tr",{children:[o.jsxs("td",{children:[T.place,T.shared?"=":""]}),o.jsx("td",{children:((R=r.find(y=>y.id===T.teamId))==null?void 0:R.name)??"—"}),o.jsx("td",{children:T.points}),o.jsx("td",{children:T.score})]},T.teamId)})})]}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})})]})}const M=i.current!=null||Object.values(i.correct).some(u=>u>0)||Object.values(i.missed).some(u=>u>0),p=!m&&i.lastReveal?(()=>{const u=e.questions.find(T=>T.id===i.lastReveal.questionId);if(u)return{questionText:u.question_text,answerText:Wi(u),verdict:i.lastReveal.verdict}})():void 0;return o.jsxs(o.Fragment,{children:[o.jsx(Gd,{teams:r,state:i,bank:l,questionText:f==null?void 0:f.question_text,verdict:m==null?void 0:m.verdict,reveal:p,answerText:(m==null?void 0:m.verdict)==="ok"||(m==null?void 0:m.verdict)==="no"&&m.attempts+1>=go?Wi(f):void 0,dice:M?void 0:o.jsx(Eo,{teams:r,rolling:!1,pickedId:i.order[0]})}),o.jsxs("div",{className:"host-actions",children:[(m==null?void 0:m.verdict)&&o.jsxs("button",{className:"ghost",onClick:()=>{const u=Date.now(),T=nr(i,u);h(m.verdict==="ok"?xo(T,u):_o(T,u))},children:["Исправить на «",m.verdict==="ok"?"неверно":"верно","»"]}),m&&m.verdict!=="ok"&&o.jsx("button",{className:"ghost",onClick:()=>void h(mo(i,Date.now())),children:"Скип −1"}),o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&h(fo(i))},children:"Завершить раунд"})]})]})}function Wi(n){const e="⚠ ответ не заполнен в редакторе",t=n.answer,i=t.display;return Array.isArray(i)?i.join(" · "):typeof i=="string"&&i?i:typeof t.correct=="string"&&t.correct?String(t.correct).split("/")[0].trim():typeof t.word=="string"&&t.word?t.word.toUpperCase():typeof t.correct_choice=="string"&&t.correct_choice?t.correct_choice:typeof t.correct_order=="string"&&t.correct_order?t.correct_order:Array.isArray(t.correct_pairs)&&t.correct_pairs.length?t.correct_pairs.join("  "):e}function hx({src:n,hidden:e,waitFor:t,go:i}){const s=J.useRef(null);return J.useEffect(()=>{var r;t&&!i||(r=s.current)==null||r.play().catch(()=>{})},[t,i]),o.jsx("video",{ref:s,src:n,controls:!e,autoPlay:!t,style:e?{width:1,height:1,opacity:0}:{maxHeight:"46vh",borderRadius:14}})}function fx({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:a=!1,gameId:l,roundNumber:d}){const c=(n.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),h=J.useRef(null),m=J.useRef(null),f=J.useRef(!1);return J.useEffect(()=>{if($_(),a&&!c||t)return;let g=!1;const _=(n.media.question??[]).find(u=>/\.(mp3|wav|m4a|ogg)$/i.test(u));f.current=!1;const M=()=>{if(!g){if(f.current=!0,_){const u=Et();u.src=We(_),m.current=u,u.play().catch(()=>{})}Ls(l&&d!=null?{gameId:l,roundNumber:d,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){M();return}const p=Et();return p.src=We(n.media.voice),h.current=p,p.onended=M,p.onerror=M,p.play().then(()=>{if(g)try{p.pause(),p.src=""}catch{}}).catch(M),()=>{var T;g=!0;const u=h.current;if(u){u.onended=null,u.onerror=null;try{u.pause(),u.src=""}catch{}}h.current=null,(T=m.current)==null||T.pause()}},[n.id,a]),J.useEffect(()=>{if(!a||!t||c)return;let g=!1;const _=(n.media.question??[]).find(p=>/\.(mp3|wav|m4a|ogg)$/i.test(p)),M=()=>{if(g||!_)return;const p=Et();p.src=We(_),m.current=p,p.play().catch(()=>{})};if(n.media.voice){const p=Et();p.src=We(n.media.voice),h.current=p,p.onended=M,p.onerror=M,p.play().then(()=>{if(g)try{p.pause(),p.src=""}catch{}}).catch(M)}else M();return()=>{var u;g=!0;const p=h.current;if(p){p.onended=null,p.onerror=null;try{p.pause(),p.src=""}catch{}}h.current=null,(u=m.current)==null||u.pause()}},[n.id,a,t]),J.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const _=h.current;_&&!_.paused&&!_.ended||Ls(l&&d!=null?{gameId:l,roundNumber:d,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(g)},[n.id,t,a]),J.useEffect(()=>{var R;const g=e.settings.bg_music??((R=i==null?void 0:i.settings)==null?void 0:R.bg_music);if(!t||!g||c)return;const _=Et();_.src=We(g),_.loop=!0,_.volume=.6,_.play().catch(()=>{});let M;const p=(r??e.timer_seconds??60)*1e3,u=s?p-(Date.now()-new Date(s).getTime()):p,T=window.setTimeout(()=>{M=window.setInterval(()=>{_.volume=Math.max(0,_.volume-.1),_.volume<=.01&&(M&&clearInterval(M),_.pause())},80)},Math.max(0,u)+3e3);return()=>{clearTimeout(T),M&&clearInterval(M),_.pause()}},[t,n.id]),null}function px({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=hn(t.game_id),a=Bn(t.game_id,t.round_number),l=e.questions.filter(c=>!c.hidden).length;return J.useEffect(()=>{var m;const c=e.settings.bg_music??((m=n.settings)==null?void 0:m.bg_music);if(!c)return;const h=Et();return h.src=We(c),h.loop=!0,h.volume=.6,h.play().catch(()=>{}),()=>h.pause()},[e.id]),o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Yn(n,t.round_number)," :: ВРЕМЯ ОТВЕТОВ"]}),o.jsx("div",{className:"answer-pulse",children:o.jsx(Mn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),o.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),o.jsx(Ba,{startedAt:t.timer_started_at,seconds:i,theme:n.theme}),!s&&o.jsx("div",{className:"answer-time-teams",children:r.map(c=>{const h=a.filter(f=>{var g;return f.team_id===c.id&&((g=f.answer_text)==null?void 0:g.trim())}).length,m=h>=l;return o.jsxs("div",{className:`at-team${m?" done":""}`,children:[o.jsx("span",{style:{color:c.color},children:c.name})," · ",h,"/",l]},c.id)})}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>void yi(e.questions.length-1),children:"← Назад"}),o.jsx("button",{onClick:()=>void ki(0),children:"К ответам →"})]})]})}function mx({pack:n,round:e,q:t,gameState:i}){var S;const s=((S=n.settings)==null?void 0:S.play_mode)==="paper",r=Bn(i.game_id,i.round_number),a=i.reveal,l=hn(i.game_id),[d,c]=J.useState([]);J.useEffect(()=>{Ut.from("teams").select("id,name,color").then(({data:A})=>c(A??[]))},[]);const h=r.filter(A=>A.question_ref===`q-${t.id}`),m=e.questions.length,f=i.question_index;J.useEffect(()=>{if(a||document.hidden)return;const A=setTimeout(()=>{Is()},3e3);return()=>clearTimeout(A)},[a,f]);const[g,_]=J.useState(!1);J.useEffect(()=>{if(_(!1),!a)return;const A=setTimeout(()=>_(!0),tx(t)+600);return()=>clearTimeout(A)},[a,t.id]),J.useEffect(()=>{!g||document.hidden||h.forEach(A=>{if(A.is_correct!=null)return;const v=Hr(t.answer,A.answer_text);v!==null&&Ut.from("answers").update({is_correct:v}).eq("id",A.id).then(()=>{})})},[g,f,h.length,h.map(A=>A.answer_text).join("|")]);const M=t.answer.mode==="choice"?t.answer.choices:null,p=(t.media.question??[]).filter(A=>!/\.(mp3|mp4|webm|wav)$/i.test(A)),u=(t.media.answer??[]).filter(A=>!/\.(mp3|mp4|webm|wav)$/i.test(A)),T=(t.media.question??[]).filter(A=>!/\.(mp3|mp4|webm|wav)$/i.test(A)),R=u.length?u:T,y=t.media.hidden?(t.media.question??[]).find(A=>/\.(mp4|webm)$/i.test(A)):void 0,w=(t.media.answer??[]).find(A=>/\.(mp3|wav|m4a|ogg)$/i.test(A));return o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"mono-tag",children:["РАУНД ",Yn(n,i.round_number)," :: ОТВЕТЫ"]}),o.jsxs("span",{className:"qnum",children:["ВОПРОС ",o.jsx("b",{children:f+1})," / ",m]})]}),o.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[o.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&o.jsxs(o.Fragment,{children:[o.jsx("p",{className:`q-text${Ei(t.question_text)}`,children:t.question_text}),T.length>0&&!t.media.hidden&&o.jsx("div",{className:`q-media-grid n${Math.min(T.length,4)}${T.length>1?" eq-row":""}${T.length>4?" wrap2":""}`,style:js(t),children:T.map((A,v)=>o.jsx(Xs,{src:We(A)},v))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&o.jsx("p",{className:`q-recall${Ei(t.question_text)}`,children:t.question_text}),a&&o.jsxs("div",{className:"answer-block reveal-in",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),y&&o.jsx(nx,{src:We(y)}),w&&o.jsx(ed,{src:We(w)}),e.mechanic==="rebus"?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:Wi(t)}),o.jsx("div",{className:"rebus-answer",children:T.slice(0,2).map((A,v)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:We(A),alt:""}),o.jsx("figcaption",{children:Z_(v===0?t.service.word1:t.service.word2,v===0)})]},v))})]}):t.answer.mode==="match"?o.jsx(Mx,{q:t}):M&&p.length===M.length?o.jsx(Yl,{q:t,choices:M,imgs:p}):M?o.jsx(Yl,{q:t,choices:M}):t.answer.mode==="order"?o.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((A,v)=>{const C=t.answer.choices.find(I=>I.key===A);return o.jsxs("div",{className:"oi",children:[o.jsx("b",{children:A}),o.jsx("span",{className:"oi-pos",children:v+1}),o.jsx("span",{className:"oi-text",children:(C==null?void 0:C.text)??""})]},v)})}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:Wi(t)}),R.length>0&&o.jsx("div",{className:`q-media-grid answer-media n${Math.min(R.length,4)}${R.length>1?" eq-row":""}${R.length>4?" wrap2":""}`,children:R.map((A,v)=>o.jsx(Xs,{src:We(A)},v))})]}),g&&t.answer_note&&o.jsx("div",{className:`answer-note${X_(t.answer_note)}`,children:t.answer_note})]})]}),!s&&o.jsxs("div",{className:"team-answers",children:[o.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${h.length}`}),h.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),h.map(A=>{const v=l.find(I=>I.id===A.team_id)??d.find(I=>I.id===A.team_id),C=g?A.is_correct??Hr(t.answer,A.answer_text):null;return o.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${C===!0?"var(--ok)":C===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsx("span",{className:"name",style:{color:v==null?void 0:v.color},children:(v==null?void 0:v.name)??"—"}),o.jsxs("span",{className:"text",children:[a?A.answer_text||"—":"• • •",A.stake!=null&&A.stake!==0&&o.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",A.stake]})]}),C!=null&&o.jsx("span",{className:"mark",style:{color:C?"var(--ok)":"var(--danger)"},children:C?"✓":"✗"})]},A.id)})]})]}),o.jsxs("div",{className:"host-actions",children:[f>0&&o.jsx("button",{className:"ghost",onClick:()=>void ki(f-1,!0),children:"← Назад"}),a?f<m-1?o.jsx("button",{onClick:()=>void ki(f+1),children:"Следующий вопрос →"}):o.jsx(ei,{pack:n,gameState:i}):o.jsx("button",{onClick:()=>void Is(),children:"Показать ответ →"})]})]})}function Yl({q:n,choices:e,imgs:t}){const[i,s]=J.useState(0);J.useEffect(()=>{s(0);const h=setTimeout(()=>s(1),2200),m=setTimeout(()=>s(2),Jc);return()=>{clearTimeout(h),clearTimeout(m)}},[n.id]);const r=n.answer.correct_choice??"",a=e.filter(h=>h.key!==r),l=new Set(K_(a.map(h=>h.key),n.id).slice(0,2)),d=h=>i>=1||l.has(h)?i<2?"":h===r?" correct":" dimmed":" hidden-yet",c=h=>l.has(h)?0:.25*e.filter(m=>!l.has(m.key)).findIndex(m=>m.key===h);return t?o.jsx("div",{className:"choice-imgs",children:e.map((h,m)=>o.jsxs("div",{className:`choice-img${d(h.key)}`,style:{animationDelay:`${c(h.key)}s`},children:[o.jsx("img",{src:We(t[m]),alt:""}),o.jsxs("span",{className:"key",children:[h.key,h.text?` — ${h.text}`:""]})]},h.key))}):o.jsx("div",{className:`choices-grid${Oa(e.map(h=>h.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(h=>o.jsxs("div",{className:`choice-plate${d(h.key)}`,style:{animationDelay:`${c(h.key)}s`},children:[o.jsx("span",{className:"key",children:h.key}),h.text]},h.key))})}function gx({enabled:n,startedAt:e,seconds:t}){return J.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Is()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function _x({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return J.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,a=Math.max(500,r-Date.now()),l=setTimeout(()=>{yi(e.question_index+1)},a);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function xx({pack:n,round:e,gameState:t}){const i=e.settings.themes??[],[s,r]=J.useState(null),a=(t.jeopardy_opened??[]).filter(p=>typeof p=="string"),[l,d]=J.useState([]),[c,h]=J.useState(null),m=[...new Set([...a,...l])],f=async p=>{d(p);const{error:u}=await Ut.from("game_sessions").update({jeopardy_opened:p}).eq("id",Zn());h(u?"Плитки не сохраняются: "+u.message+". Выполни миграцию 0006_jeopardy_opened.sql.":null),await Ut.from("game_sessions").update({timer_started_at:null,reveal:!1}).eq("id",Zn())},g=e.title_lines.join(" ")||"СВОЯ ИГРА",_=ac(g,n.theme==="classic");if(i.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"СВОЯ ИГРА"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Ys("round_intro"),children:"← К титулу"})})]});const M=Math.max(...i.map(p=>p.tiles.length));return o.jsxs("div",{className:"host-screen grid-bg jp-screen",children:[o.jsx("h1",{className:"neon-title jp-title",children:n.theme==="classic"?_:g}),o.jsxs("div",{className:"jp-board",style:{gridTemplateColumns:`repeat(${i.length}, minmax(0, 1fr))`,gridTemplateRows:`auto repeat(${M}, minmax(0, 1fr))`},children:[c&&o.jsxs("div",{className:"jp-save-err",children:["⚠ ",c]}),i.map((p,u)=>o.jsxs("div",{className:"jp-theme-name",style:{gridColumn:u+1,gridRow:1},children:[p.name||`Тема ${u+1}`,p.hint&&o.jsx("span",{className:"jp-theme-hint",children:p.hint})]},`h${u}`)),i.map((p,u)=>p.tiles.map((T,R)=>{const y=m.includes(`${u}-${R}`);return o.jsx("button",{className:`jp-tile${y?" done":""}`,disabled:y,"data-c":u%8,style:{gridColumn:u+1,gridRow:R+2},onClick:()=>{const w=i.slice(0,u).reduce((S,A)=>S+A.tiles.length,0)+R;yi(w).then(()=>Ls({gameId:t.game_id,roundNumber:t.round_number,questionRef:yd(t.round_number,w)})),r({t:u,i:R})},children:y?"·":T.value},`${u}-${R}`)}))]}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})}),s&&o.jsx(vx,{packTheme:n.theme,round:e,gameState:t,theme:i[s.t],tile:i[s.t].tiles[s.i],tileIndex:i.slice(0,s.t).reduce((p,u)=>p+u.tiles.length,0)+s.i,onClose:()=>{f([...m,`${s.t}-${s.i}`]),r(null)}})]})}function vx({round:n,gameState:e,theme:t,tile:i,tileIndex:s,onClose:r,packTheme:a}){const l=n.settings.clipSeconds??30,d=J.useRef(null),[c,h]=J.useState(l),[m,f]=J.useState(!1),[g,_]=J.useState(!1),M=Bn(e.game_id,e.round_number),p=hn(e.game_id),[u,T]=J.useState(null),R=()=>{var S;if((S=d.current)==null||S.stop(),!i.audio){f(!1),T("у плитки не задан трек");return}T(null),h(l),d.current=su(We(i.audio),l,{onStart:()=>f(!0),onTick:A=>h(A),onEnd:()=>f(!1),onError:A=>{f(!1),T(A)}})};J.useEffect(()=>(R(),()=>{var S;(S=d.current)==null||S.stop()}),[s]);const y=M.filter(S=>Td(S.question_ref,e.round_number)===s).sort((S,A)=>+new Date(S.updated_at)-+new Date(A.updated_at)),w=async(S,A)=>{await Ut.from("answers").update({is_correct:A}).eq("id",S)};return Zl.createPortal(o.jsx("div",{className:`jp-overlay theme-${a??"classic"}`,children:o.jsxs("div",{className:"jp-modal hud-frame",children:[o.jsxs("div",{className:"jp-modal-head",children:[o.jsxs("div",{children:[o.jsx("div",{className:"jp-modal-theme",children:t.name}),o.jsxs("div",{className:"mono-tag",children:["ПЛИТКА · ",i.value]})]}),o.jsx("div",{className:`jp-count${m?" on":""}`,children:String(c).padStart(2,"0")})]}),g&&o.jsxs("div",{className:"answer-reveal hud-frame",style:{padding:"12px 18px"},children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",style:{fontSize:"clamp(24px,3vw,40px)"},children:i.correct})]}),o.jsxs("div",{className:"jp-answers",children:[o.jsx("div",{className:"mono-tag",children:g?"ОТВЕТЫ (ПО СКОРОСТИ)":`ОТВЕТИЛИ: ${y.length}`}),y.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"ждём ответы…"}),y.map((S,A)=>{const v=p.find(C=>C.id===S.team_id);return o.jsxs("div",{className:"jp-answer",style:{borderLeft:`3px solid ${S.is_correct===!0?"var(--ok)":S.is_correct===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsxs("span",{className:"pos",children:["#",A+1]}),o.jsx("span",{className:"name",style:{color:v==null?void 0:v.color},children:(v==null?void 0:v.name)??"—"}),o.jsx("span",{className:"txt",children:g?S.answer_text||"—":"• • •"}),g&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:`jp-grade ok${S.is_correct===!0?" chosen":""}`,onClick:()=>void w(S.id,!0),children:"✓"}),o.jsx("button",{className:`jp-grade no${S.is_correct===!1?" chosen":""}`,onClick:()=>void w(S.id,!1),children:"✗"})]})]},S.id)})]}),o.jsxs("div",{className:"jp-modal-foot",children:[!g&&o.jsx("button",{onClick:()=>_(!0),children:"Показать ответ"}),o.jsx("button",{className:"ghost",onClick:R,children:"↻ Переслушать"}),u&&o.jsxs("div",{className:"jp-audio-err",children:["🔇 ",u,o.jsx("button",{className:"ghost",style:{marginLeft:10},onClick:()=>void iu(We(i.audio)).then(S=>alert(S)),children:"что с файлом?"})]}),y.some(S=>S.is_correct==null)&&o.jsxs("div",{className:"jp-ungraded",children:["⚠ не оценено: ",y.filter(S=>S.is_correct==null).length]}),o.jsx("button",{className:"ghost dark",onClick:r,children:"Закрыть плитку"})]})]})}),document.body)}function Mx({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return o.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var d;const a=((d=i.find(c=>c.startsWith(s)))==null?void 0:d.slice(s.length))??"—",l=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return o.jsxs("div",{className:"mi",children:[t[r]&&o.jsx("img",{src:We(t[r]),alt:""}),o.jsxs("div",{className:"mi-label",children:[o.jsxs("b",{children:[s," → ",a]}),l&&l!==a&&o.jsx("span",{className:"mi-text",children:l})]})]},s)})})}function Sx({pack:n,gameState:e}){const t=hn(e.game_id),i=Bn(e.game_id),s=nc(n,t,i),r=ic(n,t,i),a=n.rounds.filter(g=>!g.off_scoreboard),l=sc(t,s,i,r),d=l.map(g=>g.team),[c,h]=J.useState(0);J.useEffect(()=>{if(h(0),d.length===0)return;const g=setInterval(()=>h(_=>_>=d.length?_:_+1),2200);return()=>clearInterval(g)},[d.length,e.round_number]);const m=J.useRef(null),f=za([d.length,a.length],{shrinkBefore:m});return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),o.jsx("h2",{className:"sb-title",ref:m,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),o.jsx("div",{className:"sb-table-wrap",children:o.jsxs("table",{ref:f,className:`score-table${Qc(d.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),a.map((g,_)=>o.jsxs("th",{children:["Р",_+1]},g.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:d.map((g,_)=>{const M=l.find(T=>T.team.id===g.id),p=(M==null?void 0:M.place)??1,u=_>=d.length-c;return o.jsxs("tr",{className:`sb-row${u?" is-in":" is-veiled"}${p===1?" leader":""}`,children:[o.jsxs("td",{children:[p<=3?o.jsx("span",{className:"sb-medal",children:o.jsx(Wr,{theme:n.theme,place:p})}):p,(M==null?void 0:M.shared)&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:g.color,fontFamily:"var(--font-display)"},children:o.jsx("span",{className:"sb-name",children:g.name})}),a.map(T=>{const R=r.get(g.id)??[];return o.jsx("td",{children:R[n.rounds.indexOf(T)]??0},T.id)}),o.jsx("td",{className:"total",children:s.get(g.id)??0})]},g.id)})})]})}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:e})})]})}function yx({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=J.useState(i*60);J.useEffect(()=>{const d=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),c=()=>r(Math.max(0,Math.round(i*60-(Date.now()-d)/1e3)));c();const h=setInterval(c,500);return()=>clearInterval(h)},[t.timer_started_at,i]);const a=String(Math.floor(s/60)).padStart(2,"0"),l=String(s%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),o.jsx(Mn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),o.jsx(Ws,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[a,":",l]}),o.jsx("div",{className:"host-actions",children:o.jsx(ei,{pack:n,gameState:t})})]})}function Ex({pack:n,gameState:e}){var l,d;const[i,s]=J.useState(300);J.useEffect(()=>{const c=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),h=()=>s(Math.max(0,Math.round(5*60-(Date.now()-c)/1e3)));h();const m=setInterval(h,500);return()=>clearInterval(m)},[e.timer_started_at]),J.useEffect(()=>{var m,f;const c=((m=n.settings)==null?void 0:m.finale_music)??((f=n.settings)==null?void 0:f.bg_music);if(!c||document.hidden)return;const h=Et();return h.src=We(c),h.loop=!0,h.volume=.55,h.play().catch(()=>{}),()=>{try{h.pause(),h.src=""}catch{}}},[(l=n.settings)==null?void 0:l.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=String(Math.floor(i/60)).padStart(2,"0"),a=String(i%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),o.jsx(Mn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),o.jsx(Ws,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[r,":",a]}),o.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void $s(e.pack_id,!0),children:"К итогам →"})})]})}function bx({pack:n,gameId:e,gameState:t}){var S,A,v,C,I;const i=hn(e),s=Bn(e),r=nc(n,i,s),a=ic(n,i,s),l=sc(i,r,s,a);J.useEffect(()=>{var K,H;const P=((K=n.settings)==null?void 0:K.finale_music)??((H=n.settings)==null?void 0:H.bg_music);if(!P||document.hidden)return;const D=Et();return D.src=We(P),D.loop=!0,D.volume=.55,D.play().catch(()=>{}),()=>{try{D.pause(),D.src=""}catch{}}},[(S=n.settings)==null?void 0:S.finale_music,(A=n.settings)==null?void 0:A.bg_music]);const d=!!t.reveal,c=t.question_index??0,h=J.useRef(null),m=za([l.length],{shrinkBefore:h}),g=n.rounds.map((P,D)=>({r:P,i:D})).filter(P=>!P.r.off_scoreboard).map(({r:P,i:D})=>{var k;let K=null,H=-1/0;for(const $ of i){const U=((k=a.get($.id))==null?void 0:k[D])??0;U>H&&(H=U,K=$)}return{round:P,idx:D,team:K,score:H}}),_=3e3,M=1e4,p=g.length;J.useEffect(()=>{if(d||c>p)return;const D=setTimeout(()=>void xi(c+1),c===p?M:_);return()=>clearTimeout(D)},[d,c,p]);const[u,T]=J.useState(0);J.useEffect(()=>{if(T(0),l.length===0)return;let P=!1,D=0,K;const H=()=>{P||(D+=1,T(D),!(D>=l.length)&&(K=setTimeout(H,Math.max(320,900-90*D))))};return K=setTimeout(H,Math.max(320,900-90*D)),()=>{P=!0,clearTimeout(K)}},[l.length,c,d]);const R=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],y=o.jsx(o.Fragment,{children:Array.from({length:5},(P,D)=>o.jsxs("div",{className:"fw-burst",style:{left:`${12+D*19}%`,top:`${18+D%3*14}%`},children:[o.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${R[D%R.length]}55, transparent 70%)`,"--dur":`${2.2+D*.3}s`,"--delay":`${D*.45}s`}}),Array.from({length:10},(K,H)=>o.jsx("span",{className:"fw-spark",style:{background:R[(D+H)%R.length],"--a":`${H*36}deg`,"--dur":`${2.2+D*.3}s`,"--delay":`${D*.45}s`}},H))]},D))}),w=o.jsxs("div",{className:"fin-breakdown",children:[o.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),o.jsx("div",{className:"fin-table-wrap",children:o.jsxs("table",{ref:m,className:`fin-table${Qc(l.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),n.rounds.map((P,D)=>!P.off_scoreboard&&o.jsxs("th",{children:["Р",Yn(n,D)]},P.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:l.map(({team:P,place:D,shared:K},H)=>{const k=H>=l.length-u;return o.jsxs("tr",{className:`fin-row${D<=3?" top3":""}${D===1?" fin-first":""}${k?" is-in":" is-veiled"}`,children:[o.jsxs("td",{className:"fin-pos",children:[D,K&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:P.color},children:o.jsx("span",{className:"sb-name",children:P.name})}),n.rounds.map(($,U)=>{var W;return!$.off_scoreboard&&o.jsx("td",{children:((W=a.get(P.id))==null?void 0:W[U])??0},$.id)}),o.jsx("td",{children:o.jsx("b",{children:r.get(P.id)??0})})]},P.id)})})]})})]});if(d){const P=[...new Set(l.map(H=>H.place))].filter(H=>H<=3).sort((H,k)=>k-H);if(c>=P.length)return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[y,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(Mn,{ref:h,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),w,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Gr()},children:"⟲ Новая игра"})})]});const D=P[c],K=l.filter(H=>H.place===D);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void xi(c+1),children:[D===1&&y,o.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),o.jsxs("div",{className:`fin-award p${D}`,children:[o.jsxs("div",{className:"fin-award-place",children:[D," МЕСТО"]}),o.jsx("div",{className:"fin-award-medal",children:o.jsx(Wr,{theme:n.theme,place:D})}),K.length>0?K.map(H=>o.jsx("div",{className:"fin-award-name",style:{color:H.team.color},children:H.team.name},H.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(c<p){const P=g[c];return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void xi(c+1),children:[o.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),o.jsxs("div",{className:"fin-slide",children:[o.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Yn(n,P.idx)," · ",P.round.title_lines.join(" ")]}),o.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),o.jsx("div",{className:"fin-slide-team",style:{color:(v=P.team)==null?void 0:v.color},children:((C=P.team)==null?void 0:C.name)??"—"})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"3s"}})},c),o.jsx("div",{className:"fin-dots",children:g.map((D,K)=>o.jsx("span",{className:K===c?"on":""},K))})]})}if(c===p){const P=l.filter(D=>D.place===1);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void xi(c+1),children:[y,o.jsx("div",{className:"mono-tag",children:P.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),o.jsxs("div",{className:"fin-award p1",children:[o.jsx("div",{className:"fin-award-medal",children:o.jsx(Wr,{theme:n.theme,place:1})}),P.length>0?P.map(D=>o.jsx("div",{className:"fin-award-name",style:{color:D.team.color},children:D.team.name},D.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"}),o.jsx("div",{className:"fin-award-score",children:((I=P[0])==null?void 0:I.total)??0})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[y,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(Mn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),w,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Gr()},children:"⟲ Новая игра"})})]})}export{Ix as HostScreen,Oa as choicesLenClass,X_ as noteClass,$_ as stopAllMedia};
