import{j as o,s as Fn}from"./index-CgNkqJQS.js";import{r as te,a as gl}from"./vendor-Y8-lBF4Z.js";import{c as xl,r as Cd,l as Nd,s as _l,a as vl,f as er,b as Pd,g as Yr,d as Zr,e as $i,h as zs,u as Ld,R as Dd,i as Id,j as Kr,k as Ud,m as Yi,n as ks,o as Ml,p as tr,t as Fd,q as Od,v as Bd,w as zd,x as Co,y as kd,N as No,S as Gd,z as Po,A as dr,B as Hd,M as Lo,C as Do,D as Io,E as Uo,F as Vd,G as Wd,H as jd,I as Xd,J as bi,K as qd,L as $d,O as Yd,P as Zd,Q as Kd}from"./teamColors-DH2l-k6Y.js";import{m as je,l as Ri,u as Ka,p as Jd,I as Qd}from"./duration-Ohv10wxM.js";import{m as eu}from"./answerCheck-BW-23wj1.js";import{a as Sl,s as tu,b as Jr,u as un,c as zn,d as Mt,m as nu,e as iu,f as su,g as ru,h as Fo,i as au,j as ou,p as cu,k as lu,l as du,o as uu,n as hu,q as fu,r as Qr,t as Oo,v as pu,w as mu,x as yl,y as bl,z as El,A as gu}from"./raceActions-D4qrqAPI.js";import{l as xu,a as _u,d as Qn,m as Bo}from"./packLoader-CVD0NpIQ.js";import{T as vu,S as Mu}from"./ThemeLayer-Bba4Y0Ke.js";import{C as Su}from"./CrosswordView-cbnneJB6.js";function yu(n){return n<=1?{top:!1,cols:1}:n===2?{top:!1,cols:2}:n===3?{top:!0,cols:2}:n===4?{top:!1,cols:2}:n===5?{top:!0,cols:2}:{top:n%2===1,cols:n<=6?3:4}}const bu=n=>String(Math.max(0,Math.ceil(n/1e3)));function zo({team:n,state:e,active:t,now:i}){const s=Nd(e,n.id,i),r=(e.correct[n.id]??0)-(e.missed[n.id]??0),a=s<=1e4;return o.jsxs("div",{className:`bz-block${t?" on":""}${a&&t?" low":""}`,style:{"--tc":n.color},children:[t&&o.jsx("span",{className:"bz-turn",children:"ХОД"}),o.jsx("div",{className:"bz-name",children:n.name}),o.jsx("div",{className:`bz-timer${a?" low":""}`,children:bu(s)}),o.jsxs("div",{className:"bz-meta",children:[o.jsx("span",{className:"bz-pts",children:r>0?`+${r}`:r}),o.jsxs("span",{className:"bz-qn",children:["вопрос ",(e.correct[n.id]??0)+(e.missed[n.id]??0)+(t?1:0)]})]})]})}function Eu({teams:n,state:e,bank:t,questionText:i,verdict:s,answerText:r,dice:a,reveal:c}){const[d,l]=te.useState(()=>Date.now());te.useEffect(()=>{const y=setInterval(()=>l(Date.now()),250);return()=>clearInterval(y)},[]);const u=e.order.map(y=>n.find(b=>b.id===y)).filter(y=>!!y),m=xl(e),{top:h,cols:g}=yu(u.length),_=u.find(y=>y.id===m),v=h?u.slice(0,1):u.slice(0,Math.ceil(u.length/2)),f=h?u.slice(1):u.slice(Math.ceil(u.length/2)),p=h?g:Math.max(1,v.length);return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"БЛИЦ"}),o.jsx("span",{className:"bz-bank",children:Cd(t,e.used)})]}),o.jsx("div",{className:`bz-row${h?" bz-row-top":""}`,style:{"--cols":h?1:p},children:v.map(y=>o.jsx(zo,{team:y,state:e,active:y.id===m,now:d},y.id))}),o.jsx("div",{className:`bz-question${s?` v-${s}`:""}`,style:{"--tc":_==null?void 0:_.color},children:a??(i?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"bz-asking",children:["отвечают: ",o.jsx("b",{children:(_==null?void 0:_.name)??"—"})]}),o.jsx("div",{className:"bz-qtext",children:i}),s&&o.jsxs("div",{className:`bz-verdict ${s}`,children:[s==="ok"?"ВЕРНО":"НЕВЕРНО",r&&o.jsxs("span",{className:"bz-right",children:[" · ",r]})]})]}):c?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"bz-asking",children:c.verdict==="ok"?"ответили верно!":c.verdict==="skip"?"вопрос пропущен":"не угадали"}),o.jsx("div",{className:"bz-qtext",children:c.questionText}),o.jsxs("div",{className:`bz-verdict ${c.verdict==="ok"?"ok":"no"}`,children:["Правильный ответ: ",c.answerText]})]}):o.jsx("div",{className:"bz-asking",children:"следующий вопрос…"}))}),o.jsx("div",{className:"bz-row",style:{"--cols":Math.max(1,f.length)},children:f.map(y=>o.jsx(zo,{team:y,state:e,active:y.id===m,now:d},y.id))})]})}function ko({teams:n,pickedId:e,rolling:t}){const[i,s]=te.useState(0);te.useEffect(()=>{if(!t)return;const a=setInterval(()=>s(c=>(c+1)%Math.max(1,n.length)),110);return()=>clearInterval(a)},[t,n.length]);const r=t?n[i]:n.find(a=>a.id===e)??n[0];return o.jsxs("div",{className:"bz-dice-wrap",children:[o.jsx("div",{className:`bz-dice${t?" rolling":" done"}`,style:{"--tc":r==null?void 0:r.color},children:(r==null?void 0:r.name)??"—"}),o.jsx("div",{className:"bz-dice-cap",children:t?"кто начинает…":"начинает"})]})}const Tl="qp-fx-enabled",Tu=4e3,wu={classic:470,potter:700};function Au(){try{const n=localStorage.getItem(Tl);return n===null?!0:n==="1"}catch{return!0}}function Ru(n){try{localStorage.setItem(Tl,n?"1":"0")}catch{}}function Cu(){return typeof location<"u"&&location.href.includes("nofx=1")}function Nu({theme:n,trigger:e}){const[t,i]=te.useState(Au),s=te.useRef(null),r=te.useRef(0),[a,c]=te.useState(null);te.useEffect(()=>{const l=s.current===null;if(s.current=e,l||!t||n==="new_year"||typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||Cu())return;const u=Date.now();u-r.current<Tu||(r.current=u,c(u))},[e]),te.useEffect(()=>{if(a===null)return;const l=(wu[n]??300)+50,u=setTimeout(()=>c(null),l);return()=>clearTimeout(u)},[a,n]);const d=n==="classic"||n==="potter";return o.jsxs(o.Fragment,{children:[d&&o.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":t,title:t?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>i(l=>{const u=!l;return Ru(u),u}),children:"✨"}),a!==null&&n==="classic"&&o.jsx(Pu,{},a),a!==null&&n==="potter"&&o.jsx(Lu,{},a)]})}function Pu(){return o.jsx("div",{className:"fx-flash fx-cyber","aria-hidden":"true"})}function Lu(){const n=Array.from({length:22},(e,t)=>t);return o.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>o.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const Go=["🥇","🥈","🥉"];function ea({theme:n,place:e}){return n==="classic"?o.jsx(Du,{place:e}):n==="potter"?o.jsx(Uu,{place:e}):n==="new_year"?o.jsx(Iu,{place:e}):o.jsx("span",{className:"award-emoji",children:Go[e-1]??Go[2]})}function Du({place:n}){return o.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ah-orbit"}),o.jsx("span",{className:"ah-face",children:o.jsx("b",{children:n})})]})}function Iu({place:n}){return o.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ab-cap"}),o.jsxs("span",{className:"ab-ball",children:[o.jsx("span",{className:"ab-shine"}),o.jsx("b",{children:n})]})]})}function Uu({place:n}){return o.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"am-ribbon"}),o.jsxs("span",{className:"am-disc",children:[o.jsx("span",{className:"am-shine"}),o.jsx("b",{children:n})]})]})}function ri({pack:n,gameState:e}){const t=Sl(n,e.round_number,e.phase),i=t.label.replace(" →","").toLowerCase(),s=()=>{var r,a,c;if(t.kind==="scoreboard")return void _l();if(t.kind==="break")return void vl();if(t.kind==="finale"){const d=tu((r=n.settings)==null?void 0:r.info_slides);return d==null?void er(e.pack_id,((a=n.settings)==null?void 0:a.play_mode)==="paper"):void Pd(d)}return void Yr(e.round_number+1,Jr((c=n.settings)==null?void 0:c.info_slides,e.round_number+1)??void 0)};return o.jsxs("button",{onClick:s,children:[i.charAt(0).toUpperCase()+i.slice(1)," →"]})}function Fu(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}const Ho="01#$%&/\\<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";function Ou(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Vo(n,e,t=1){const i=Math.max(0,Math.min(1,e));if(i>=1)return n;const s=Ou(t),r=Math.floor(n.length*i);let a="";for(let c=0;c<n.length;c++){const d=n[c];if(c<r||/\s/.test(d)){a+=d;continue}a+=Ho[Math.floor(s()*Ho.length)]}return a}const Bu=14,zu=50;function wl(n,e){const[t,i]=te.useState(n),s=te.useRef(0);return te.useEffect(()=>{const r=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!e||r){i(n);return}s.current+=1;const a=s.current;let c=0;i(Vo(n,0,a));const d=setInterval(()=>{c+=1;const l=c/Bu;if(l>=1){i(n),clearInterval(d);return}i(Vo(n,l,a))},zu);return()=>clearInterval(d)},[n,e]),t}const Wo=new Map,Gs=new Set;function Et(){const n=new Audio;return Gs.add(n),n}function Al(){Gs.forEach(n=>{try{n.pause(),n.currentTime=0,n.src=""}catch{}}),Gs.clear(),document.querySelectorAll("audio, video").forEach(n=>{const e=n;try{e.pause(),e.currentTime=0}catch{}})}async function ku(n){const e=Wo.get(n);if(e)return e;const t=await fetch(n,{mode:"cors",credentials:"omit"});if(!t.ok){const s=await t.text().catch(()=>"");throw/not_found|Object not found/i.test(s)||t.status===404||t.status===400?new Error("ФАЙЛА НЕТ В ХРАНИЛИЩЕ"):new Error(`сервер ответил ${t.status}`)}const i=URL.createObjectURL(await t.blob());return Wo.set(n,i),i}async function Rl(n,e){Gs.add(n);try{return n.src=e,await n.play(),{ok:!0}}catch(t){if((t instanceof Error?t.name:"")==="NotAllowedError")return{ok:!1,reason:"браузер не разрешил звук — кликните по экрану"}}try{return n.src=await ku(e),await n.play(),{ok:!0}}catch(t){return{ok:!1,reason:t instanceof Error&&/ФАЙЛА НЕТ/.test(t.message)?"файла нет в хранилище — трек нужно загрузить заново в редакторе":t instanceof Error&&/Failed to fetch|NetworkError/i.test(t.message)?"файл не скачивается: запрос блокирует браузер, VPN или расширение":`не удалось воспроизвести: ${t instanceof Error?t.message:"ошибка"}`}}}async function Gu(n){const e=[n];try{const t=await fetch(n,{method:"GET",mode:"cors",credentials:"omit"});e.push(`fetch: ${t.status} ${t.statusText}`),e.push(`тип: ${t.headers.get("content-type")??"—"}`),e.push(`размер: ${t.headers.get("content-length")??"—"}`)}catch(t){e.push(`fetch НЕ ПРОШЁЛ: ${t instanceof Error?t.message:"ошибка"}`)}return e.join(`
`)}let ss=0;function Hu(n,e,t){const i=++ss;Al();const s=Et();let r;const a=()=>i!==ss,c=()=>{r&&clearInterval(r);try{s.pause()}catch{}};return s.addEventListener("playing",()=>{var l,u;if(a()){c();return}(l=t.onStart)==null||l.call(t);let d=e;(u=t.onTick)==null||u.call(t,d),r=setInterval(()=>{var m,h;if(a()){c();return}d-=1,(m=t.onTick)==null||m.call(t,Math.max(0,d)),d<=0&&(c(),(h=t.onEnd)==null||h.call(t))},1e3)},{once:!0}),Rl(s,n).then(d=>{var l;if(a()){c();return}d.ok||(c(),(l=t.onError)==null||l.call(t,d.reason))}),{stop:()=>{i===ss&&ss++,c()}}}function Vu({pack:n,round:e,gameState:t,timerNode:i}){var v,f;const s=e.settings,r=s.startDelaySec??5,a=s.afterTimerSec??5,c=e.questions.filter(p=>!p.hidden),d=e.settings.bg_music??((v=n.settings)==null?void 0:v.bg_music),l=((f=n.settings)==null?void 0:f.play_mode)==="paper";te.useEffect(()=>{if(l||t.timer_started_at||document.hidden)return;const p=setTimeout(()=>{Zr()},r*1e3);return()=>clearTimeout(p)},[t.timer_started_at,l]),te.useEffect(()=>{if(!t.timer_started_at||!d||document.hidden)return;const p=Et();return p.src=je(d),p.loop=!0,p.volume=.6,p.play().catch(()=>{}),()=>p.pause()},[t.timer_started_at,d]),te.useEffect(()=>{if(!t.timer_started_at||document.hidden)return;const y=new Date(t.timer_started_at).getTime()+e.timer_seconds*1e3-Date.now()+a*1e3,b=setTimeout(()=>{$i(0)},Math.max(0,y));return()=>clearTimeout(b)},[t.timer_started_at]);const[u,m]=te.useState(r);te.useEffect(()=>{if(l||t.timer_started_at)return;const p=setInterval(()=>m(y=>Math.max(0,y-1)),1e3);return()=>clearInterval(p)},[t.timer_started_at,l]);const h=c.length%2===1?c[0]:null,g=h?c.slice(1):c,_=Math.ceil(g.length/2);return o.jsxs("div",{className:`sprint-screen${h?" with-hero":""}${c.length>7?" many":""}`,children:[h&&o.jsxs("div",{className:`sprint-hero sprint-card${Ri(h.question_text).trim()?Ri(h.question_text):""}`,children:[o.jsx("span",{className:"sprint-num",children:"1"}),o.jsx("div",{className:"sprint-text",children:h.question_text})]}),o.jsx("div",{className:"host-topbar sprint-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")})}),o.jsx("div",{className:"sprint-col",children:g.slice(0,_).map((p,y)=>o.jsx(jo,{n:(h?2:1)+y,q:p},p.id))}),o.jsx("div",{className:"sprint-center",children:t.timer_started_at?o.jsx("div",{className:"sprint-timer",children:i}):o.jsxs("div",{className:"sprint-pre",children:[!l&&o.jsx("div",{className:"sprint-pre-num",children:u}),o.jsx("div",{className:"mono-tag",children:"ЧИТАЕМ ВОПРОСЫ"})]})}),o.jsx("div",{className:"sprint-col",children:g.slice(_).map((p,y)=>o.jsx(jo,{n:(h?2:1)+_+y,q:p},p.id))})]})}function jo({n,q:e}){const t=(e.media.question??[]).find(i=>!/\.(mp3|mp4|webm|wav)$/i.test(i));return o.jsxs("div",{className:"sprint-card",children:[o.jsx("span",{className:"sprint-num",children:n}),o.jsx("div",{className:"sprint-text",children:e.question_text}),t&&o.jsx("img",{src:je(t),alt:"",className:"sprint-img"})]})}const Hs=100,Cl=72,Xo=260,Wu=12.5,ju=9,Xu=.9,qo=80;function qu(n,e){const t=qo+Math.max(0,Math.min(1,n))*(360-qo),i=-90+t,s=[];for(let l=0;l<Xo;l++){const u=l/(Xo-1),m=(i-u*t)*Math.PI/180,h=Wu*(u<.2?.86+.14*(u/.2):1-.97*Math.pow((u-.2)/.8,1.9)),g=Cl+Xu*Math.sin(2*Math.PI*(u*ju)+e),_=Hs+g*Math.cos(m),v=Hs+g*Math.sin(m),f=Math.cos(m),p=Math.sin(m);s.push({cx:_,cy:v,nx:f,ny:p,w:h})}const r=s.map(l=>`${(l.cx+l.nx*l.w).toFixed(2)},${(l.cy+l.ny*l.w).toFixed(2)}`),a=s.slice().reverse().map(l=>`${(l.cx-l.nx*l.w).toFixed(2)},${(l.cy-l.ny*l.w).toFixed(2)}`),c=s[0],d=s[8];return{body:`M${r.join("L")}L${a.join("L")}Z`,mid:`M${s.map(l=>`${l.cx.toFixed(2)},${l.cy.toFixed(2)}`).join("L")}`,hx:c.cx,hy:c.cy,rot:Math.atan2(c.cy-d.cy,c.cx-d.cx)*180/Math.PI}}function Nl({left:n,seconds:e,low:t}){const i=1-Math.max(0,Math.min(1,n/Math.max(1,e))),[s,r]=te.useState(0),a=te.useRef(0);te.useEffect(()=>{let l=!1;const u=()=>{l||(r(-(Date.now()/700)%(Math.PI*2)),a.current=requestAnimationFrame(u))};return a.current=requestAnimationFrame(u),()=>{l=!0,cancelAnimationFrame(a.current)}},[]);const c=qu(i,s),d=t?"lo":"ok";return o.jsxs("div",{className:`snake-timer${t?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 200 200","aria-hidden":!0,children:[o.jsxs("defs",{children:[o.jsxs("linearGradient",{id:`sn-g-${d}`,x1:"0",y1:"0",x2:".3",y2:"1",children:[o.jsx("stop",{offset:"0",stopColor:t?"#c2593f":"#3ab97c"}),o.jsx("stop",{offset:".45",stopColor:t?"#8d2f22":"#177a4a"}),o.jsx("stop",{offset:"1",stopColor:t?"#521410":"#0b4229"})]}),o.jsx("clipPath",{id:`sn-c-${d}`,children:o.jsx("path",{d:c.body})}),o.jsx("filter",{id:`sn-f-${d}`,x:"-30%",y:"-30%",width:"160%",height:"160%",children:o.jsx("feDropShadow",{dx:"0",dy:"0",stdDeviation:"3",floodColor:t?"#b23a2a":"#0f7a4d",floodOpacity:".55"})})]}),o.jsx("circle",{cx:Hs,cy:Hs,r:Cl,fill:"none",stroke:"#d3a62526",strokeWidth:"1.2",strokeDasharray:"2 8"}),o.jsxs("g",{filter:`url(#sn-f-${d})`,children:[o.jsx("path",{d:c.body,fill:`url(#sn-g-${d})`,stroke:"#06301c",strokeWidth:"1.1"}),o.jsxs("g",{clipPath:`url(#sn-c-${d})`,children:[o.jsx("path",{d:c.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"5 10",opacity:".34"}),o.jsx("path",{d:c.mid,fill:"none",stroke:"#8ff0c0",strokeWidth:"3.4",opacity:".22"}),o.jsx("path",{d:c.mid,fill:"none",stroke:"#062e1c",strokeWidth:"26",strokeDasharray:"1.6 14",opacity:".34"})]}),o.jsxs("g",{transform:`translate(${c.hx.toFixed(2)},${c.hy.toFixed(2)}) rotate(${c.rot.toFixed(2)})`,children:[o.jsx("path",{d:"M17.5,0 Q15,-6.4 6,-9.6 Q-4,-12.4 -11,-10 L-11,10 Q-4,12.4 6,9.6 Q15,6.4 17.5,0 Z",fill:t?"#a83c2c":"#1f8a55",stroke:"#06301c",strokeWidth:"1.1"}),o.jsx("path",{d:"M17.5,0 Q9,-3 -8,-3.4 L-8,3.4 Q9,3 17.5,0 Z",fill:"#0d4f31",opacity:".55"}),o.jsx("path",{className:"sn-tongue",d:"M17,0 l12,-4.5 M17,0 l12,4.5",stroke:"#e0243a",strokeWidth:"2.1",fill:"none",strokeLinecap:"round"}),o.jsx("ellipse",{cx:"1",cy:"-6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1",cy:"6",rx:"3.6",ry:"3.1",fill:"#f7cf55",stroke:"#06301c",strokeWidth:".8"}),o.jsx("ellipse",{cx:"1.8",cy:"-6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("ellipse",{cx:"1.8",cy:"6",rx:"1",ry:"2.4",fill:"#101010"}),o.jsx("circle",{cx:"13",cy:"-2.6",r:".9",fill:"#06301c"}),o.jsx("circle",{cx:"13",cy:"2.6",r:".9",fill:"#06301c"})]})]})]}),o.jsx("span",{className:`snake-num${t?" danger":""}`,children:n})]})}let Vs=!1;const ta=new Set;function $o(){Vs||(Vs=!0,ta.forEach(n=>n(!0)))}async function Yo(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n;e.state==="suspended"&&await e.resume();const t=e.state==="running";return e.close(),t}catch{return!1}}function Ja(){const[n,e]=te.useState(Vs);return te.useEffect(()=>{if(Vs)return;ta.add(e);const t=()=>{Yo().then(i=>{i&&$o()})};return window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),Yo().then(i=>{i&&$o()}),()=>{ta.delete(e),window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t)}},[]),n}function Qa(){return Ja()?null:o.jsxs("div",{className:"audio-gate",onClick:()=>{},children:[o.jsx("span",{children:"🔇 Звук заблокирован браузером"}),o.jsx("b",{children:"кликните по экрану один раз"})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const eo="185",$u=0,Zo=1,Yu=2,Ds=1,Zu=2,Xi=3,On=0,zt=1,xn=2,Mn=0,Ei=1,ti=2,Ko=3,Jo=4,Ku=5,$n=100,Ju=101,Qu=102,eh=103,th=104,nh=200,ih=201,sh=202,rh=203,na=204,ia=205,ah=206,oh=207,ch=208,lh=209,dh=210,uh=211,hh=212,fh=213,ph=214,sa=0,ra=1,aa=2,Ci=3,oa=4,ca=5,la=6,da=7,Pl=0,mh=1,gh=2,on=0,Ll=1,Dl=2,Il=3,Ul=4,Fl=5,Ol=6,Bl=7,zl=300,ni=301,Ni=302,ur=303,hr=304,nr=306,ua=1e3,_n=1001,ha=1002,wt=1003,xh=1004,rs=1005,Nt=1006,fr=1007,Zn=1008,Vt=1009,kl=1010,Gl=1011,Zi=1012,to=1013,ln=1014,rn=1015,yn=1016,no=1017,io=1018,Ki=1020,Hl=35902,Vl=35899,Wl=1021,jl=1022,Kt=1023,bn=1026,Kn=1027,Xl=1028,so=1029,ii=1030,ro=1031,ao=1033,Is=33776,Us=33777,Fs=33778,Os=33779,fa=35840,pa=35841,ma=35842,ga=35843,xa=36196,_a=37492,va=37496,Ma=37488,Sa=37489,Ws=37490,ya=37491,ba=37808,Ea=37809,Ta=37810,wa=37811,Aa=37812,Ra=37813,Ca=37814,Na=37815,Pa=37816,La=37817,Da=37818,Ia=37819,Ua=37820,Fa=37821,Oa=36492,Ba=36494,za=36495,ka=36283,Ga=36284,js=36285,Ha=36286,_h=3200,Va=0,vh=1,Dn="",Xt="srgb",Xs="srgb-linear",qs="linear",et="srgb",li=7680,Qo=519,Mh=512,Sh=513,yh=514,oo=515,bh=516,Eh=517,co=518,Th=519,ec=35044,tc="300 es",an=2e3,Ji=2001;function wh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $s(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ah(){const n=$s("canvas");return n.style.display="block",n}const nc={};function ic(...n){const e="THREE."+n.shift();console.log(e,...n)}function ql(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=ql(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=ql(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ti(...n){const e=n.join(" ");e in nc||(nc[e]=!0,Fe(...n))}function Rh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Ch={[sa]:ra,[aa]:la,[oa]:da,[Ci]:ca,[ra]:sa,[la]:aa,[da]:oa,[ca]:Ci};class ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pr=Math.PI/180,Wa=180/Math.PI;function es(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function Nh(n,e){return(n%e+e)%e}function mr(n,e,t){return(1-t)*n+t*e}function Oi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const mo=class mo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mo.prototype.isVector2=!0;let Ze=mo;class Di{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,c){let d=i[s+0],l=i[s+1],u=i[s+2],m=i[s+3],h=r[a+0],g=r[a+1],_=r[a+2],v=r[a+3];if(m!==v||d!==h||l!==g||u!==_){let f=d*h+l*g+u*_+m*v;f<0&&(h=-h,g=-g,_=-_,v=-v,f=-f);let p=1-c;if(f<.9995){const y=Math.acos(f),b=Math.sin(y);p=Math.sin(p*y)/b,c=Math.sin(c*y)/b,d=d*p+h*c,l=l*p+g*c,u=u*p+_*c,m=m*p+v*c}else{d=d*p+h*c,l=l*p+g*c,u=u*p+_*c,m=m*p+v*c;const y=1/Math.sqrt(d*d+l*l+u*u+m*m);d*=y,l*=y,u*=y,m*=y}}e[t]=d,e[t+1]=l,e[t+2]=u,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,s,r,a){const c=i[s],d=i[s+1],l=i[s+2],u=i[s+3],m=r[a],h=r[a+1],g=r[a+2],_=r[a+3];return e[t]=c*_+u*m+d*g-l*h,e[t+1]=d*_+u*h+l*m-c*g,e[t+2]=l*_+u*g+c*h-d*m,e[t+3]=u*_-c*m-d*h-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,d=Math.sin,l=c(i/2),u=c(s/2),m=c(r/2),h=d(i/2),g=d(s/2),_=d(r/2);switch(a){case"XYZ":this._x=h*u*m+l*g*_,this._y=l*g*m-h*u*_,this._z=l*u*_+h*g*m,this._w=l*u*m-h*g*_;break;case"YXZ":this._x=h*u*m+l*g*_,this._y=l*g*m-h*u*_,this._z=l*u*_-h*g*m,this._w=l*u*m+h*g*_;break;case"ZXY":this._x=h*u*m-l*g*_,this._y=l*g*m+h*u*_,this._z=l*u*_+h*g*m,this._w=l*u*m-h*g*_;break;case"ZYX":this._x=h*u*m-l*g*_,this._y=l*g*m+h*u*_,this._z=l*u*_-h*g*m,this._w=l*u*m+h*g*_;break;case"YZX":this._x=h*u*m+l*g*_,this._y=l*g*m+h*u*_,this._z=l*u*_-h*g*m,this._w=l*u*m-h*g*_;break;case"XZY":this._x=h*u*m-l*g*_,this._y=l*g*m-h*u*_,this._z=l*u*_+h*g*m,this._w=l*u*m+h*g*_;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],c=t[5],d=t[9],l=t[2],u=t[6],m=t[10],h=i+c+m;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(u-d)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(i>c&&i>m){const g=2*Math.sqrt(1+i-c-m);this._w=(u-d)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(c>m){const g=2*Math.sqrt(1+c-i-m);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(d+u)/g}else{const g=2*Math.sqrt(1+m-i-c);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(d+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,c=t._x,d=t._y,l=t._z,u=t._w;return this._x=i*u+a*c+s*l-r*d,this._y=s*u+a*d+r*c-i*l,this._z=r*u+a*l+i*d-s*c,this._w=a*u-i*c-s*d-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,a=-a,c=-c);let d=1-t;if(c<.9995){const l=Math.acos(c),u=Math.sin(l);d=Math.sin(d*l)/u,t=Math.sin(t*l)/u,this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this._onChangeCallback()}else this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const go=class go{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,c=e.z,d=e.w,l=2*(a*s-c*i),u=2*(c*t-r*s),m=2*(r*i-a*t);return this.x=t+d*l+a*m-c*u,this.y=i+d*u+c*l-r*m,this.z=s+d*m+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,c=t.y,d=t.z;return this.x=s*d-r*c,this.y=r*a-i*d,this.z=i*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gr.copy(this).projectOnVector(e),this.sub(gr)}reflect(e){return this.sub(gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};go.prototype.isVector3=!0;let J=go;const gr=new J,sc=new Di,xo=class xo{constructor(e,t,i,s,r,a,c,d,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,c,d,l)}set(e,t,i,s,r,a,c,d,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=c,u[3]=t,u[4]=r,u[5]=d,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],c=i[3],d=i[6],l=i[1],u=i[4],m=i[7],h=i[2],g=i[5],_=i[8],v=s[0],f=s[3],p=s[6],y=s[1],b=s[4],T=s[7],A=s[2],S=s[5],N=s[8];return r[0]=a*v+c*y+d*A,r[3]=a*f+c*b+d*S,r[6]=a*p+c*T+d*N,r[1]=l*v+u*y+m*A,r[4]=l*f+u*b+m*S,r[7]=l*p+u*T+m*N,r[2]=h*v+g*y+_*A,r[5]=h*f+g*b+_*S,r[8]=h*p+g*T+_*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],u=e[8];return t*a*u-t*c*l-i*r*u+i*c*d+s*r*l-s*a*d}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],u=e[8],m=u*a-c*l,h=c*d-u*r,g=l*r-a*d,_=t*m+i*h+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=m*v,e[1]=(s*l-u*i)*v,e[2]=(c*i-s*a)*v,e[3]=h*v,e[4]=(u*t-s*d)*v,e[5]=(s*r-c*t)*v,e[6]=g*v,e[7]=(i*d-l*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,c){const d=Math.cos(r),l=Math.sin(r);return this.set(i*d,i*l,-i*(d*a+l*c)+a+e,-s*l,s*d,-s*(-l*a+d*c)+c+t,0,0,1),this}scale(e,t){return Ti("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xr.makeScale(e,t)),this}rotate(e){return Ti("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xr.makeRotation(-e)),this}translate(e,t){return Ti("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};xo.prototype.isMatrix3=!0;let Oe=xo;const xr=new Oe,rc=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ac=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ph(){const n={enabled:!0,workingColorSpace:Xs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===et&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(s.r=wi(s.r),s.g=wi(s.g),s.b=wi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ti("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ti("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Xs]:{primaries:e,whitePoint:i,transfer:qs,toXYZ:rc,fromXYZ:ac,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:et,toXYZ:rc,fromXYZ:ac,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const $e=Ph();function Sn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function wi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let di;class Lh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{di===void 0&&(di=$s("canvas")),di.width=e.width,di.height=e.height;const s=di.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$s("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Sn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Sn(t[i]/255)*255):t[i]=Sn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dh=0;class lo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=es(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(_r(s[a].image)):r.push(_r(s[a]))}else r=_r(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function _r(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Lh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Ih=0;const vr=new J;class Pt extends ai{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=_n,s=_n,r=Nt,a=Zn,c=Kt,d=Vt,l=Pt.DEFAULT_ANISOTROPY,u=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=es(),this.name="",this.source=new lo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=d,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vr).x}get height(){return this.source.getSize(vr).y}get depth(){return this.source.getSize(vr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=zl;Pt.DEFAULT_ANISOTROPY=1;const _o=class _o{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const d=e.elements,l=d[0],u=d[4],m=d[8],h=d[1],g=d[5],_=d[9],v=d[2],f=d[6],p=d[10];if(Math.abs(u-h)<.01&&Math.abs(m-v)<.01&&Math.abs(_-f)<.01){if(Math.abs(u+h)<.1&&Math.abs(m+v)<.1&&Math.abs(_+f)<.1&&Math.abs(l+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,T=(g+1)/2,A=(p+1)/2,S=(u+h)/4,N=(m+v)/4,M=(_+f)/4;return b>T&&b>A?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=S/i,r=N/i):T>A?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=S/s,r=M/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=N/r,s=M/r),this.set(i,s,r,t),this}let y=Math.sqrt((f-_)*(f-_)+(m-v)*(m-v)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(f-_)/y,this.y=(m-v)/y,this.z=(h-u)/y,this.w=Math.acos((l+g+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_o.prototype.isVector4=!0;let ut=_o;class Uh extends ai{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Pt(s),a=i.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new lo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Uh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class $l extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fh extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qs=class Qs{constructor(e,t,i,s,r,a,c,d,l,u,m,h,g,_,v,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,c,d,l,u,m,h,g,_,v,f)}set(e,t,i,s,r,a,c,d,l,u,m,h,g,_,v,f){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=d,p[2]=l,p[6]=u,p[10]=m,p[14]=h,p[3]=g,p[7]=_,p[11]=v,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ui.setFromMatrixColumn(e,0).length(),r=1/ui.setFromMatrixColumn(e,1).length(),a=1/ui.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),c=Math.sin(i),d=Math.cos(s),l=Math.sin(s),u=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const h=a*u,g=a*m,_=c*u,v=c*m;t[0]=d*u,t[4]=-d*m,t[8]=l,t[1]=g+_*l,t[5]=h-v*l,t[9]=-c*d,t[2]=v-h*l,t[6]=_+g*l,t[10]=a*d}else if(e.order==="YXZ"){const h=d*u,g=d*m,_=l*u,v=l*m;t[0]=h+v*c,t[4]=_*c-g,t[8]=a*l,t[1]=a*m,t[5]=a*u,t[9]=-c,t[2]=g*c-_,t[6]=v+h*c,t[10]=a*d}else if(e.order==="ZXY"){const h=d*u,g=d*m,_=l*u,v=l*m;t[0]=h-v*c,t[4]=-a*m,t[8]=_+g*c,t[1]=g+_*c,t[5]=a*u,t[9]=v-h*c,t[2]=-a*l,t[6]=c,t[10]=a*d}else if(e.order==="ZYX"){const h=a*u,g=a*m,_=c*u,v=c*m;t[0]=d*u,t[4]=_*l-g,t[8]=h*l+v,t[1]=d*m,t[5]=v*l+h,t[9]=g*l-_,t[2]=-l,t[6]=c*d,t[10]=a*d}else if(e.order==="YZX"){const h=a*d,g=a*l,_=c*d,v=c*l;t[0]=d*u,t[4]=v-h*m,t[8]=_*m+g,t[1]=m,t[5]=a*u,t[9]=-c*u,t[2]=-l*u,t[6]=g*m+_,t[10]=h-v*m}else if(e.order==="XZY"){const h=a*d,g=a*l,_=c*d,v=c*l;t[0]=d*u,t[4]=-m,t[8]=l*u,t[1]=h*m+v,t[5]=a*u,t[9]=g*m-_,t[2]=_*m-g,t[6]=c*u,t[10]=v*m+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oh,e,Bh)}lookAt(e,t,i){const s=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),An.crossVectors(i,Gt),An.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),An.crossVectors(i,Gt)),An.normalize(),as.crossVectors(Gt,An),s[0]=An.x,s[4]=as.x,s[8]=Gt.x,s[1]=An.y,s[5]=as.y,s[9]=Gt.y,s[2]=An.z,s[6]=as.z,s[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],c=i[4],d=i[8],l=i[12],u=i[1],m=i[5],h=i[9],g=i[13],_=i[2],v=i[6],f=i[10],p=i[14],y=i[3],b=i[7],T=i[11],A=i[15],S=s[0],N=s[4],M=s[8],R=s[12],L=s[1],I=s[5],B=s[9],K=s[13],O=s[2],U=s[6],W=s[10],V=s[14],Y=s[3],re=s[7],fe=s[11],pe=s[15];return r[0]=a*S+c*L+d*O+l*Y,r[4]=a*N+c*I+d*U+l*re,r[8]=a*M+c*B+d*W+l*fe,r[12]=a*R+c*K+d*V+l*pe,r[1]=u*S+m*L+h*O+g*Y,r[5]=u*N+m*I+h*U+g*re,r[9]=u*M+m*B+h*W+g*fe,r[13]=u*R+m*K+h*V+g*pe,r[2]=_*S+v*L+f*O+p*Y,r[6]=_*N+v*I+f*U+p*re,r[10]=_*M+v*B+f*W+p*fe,r[14]=_*R+v*K+f*V+p*pe,r[3]=y*S+b*L+T*O+A*Y,r[7]=y*N+b*I+T*U+A*re,r[11]=y*M+b*B+T*W+A*fe,r[15]=y*R+b*K+T*V+A*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],c=e[5],d=e[9],l=e[13],u=e[2],m=e[6],h=e[10],g=e[14],_=e[3],v=e[7],f=e[11],p=e[15],y=d*g-l*h,b=c*g-l*m,T=c*h-d*m,A=a*g-l*u,S=a*h-d*u,N=a*m-c*u;return t*(v*y-f*b+p*T)-i*(_*y-f*A+p*S)+s*(_*b-v*A+p*N)-r*(_*T-v*S+f*N)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],c=e[9],d=e[2],l=e[6],u=e[10];return t*(a*u-c*l)-i*(r*u-c*d)+s*(r*l-a*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],u=e[8],m=e[9],h=e[10],g=e[11],_=e[12],v=e[13],f=e[14],p=e[15],y=t*c-i*a,b=t*d-s*a,T=t*l-r*a,A=i*d-s*c,S=i*l-r*c,N=s*l-r*d,M=u*v-m*_,R=u*f-h*_,L=u*p-g*_,I=m*f-h*v,B=m*p-g*v,K=h*p-g*f,O=y*K-b*B+T*I+A*L-S*R+N*M;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/O;return e[0]=(c*K-d*B+l*I)*U,e[1]=(s*B-i*K-r*I)*U,e[2]=(v*N-f*S+p*A)*U,e[3]=(h*S-m*N-g*A)*U,e[4]=(d*L-a*K-l*R)*U,e[5]=(t*K-s*L+r*R)*U,e[6]=(f*T-_*N-p*b)*U,e[7]=(u*N-h*T+g*b)*U,e[8]=(a*B-c*L+l*M)*U,e[9]=(i*L-t*B-r*M)*U,e[10]=(_*S-v*T+p*y)*U,e[11]=(m*T-u*S-g*y)*U,e[12]=(c*R-a*I-d*M)*U,e[13]=(t*I-i*R+s*M)*U,e[14]=(v*b-_*A-f*y)*U,e[15]=(u*A-m*b+h*y)*U,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,c=e.y,d=e.z,l=r*a,u=r*c;return this.set(l*a+i,l*c-s*d,l*d+s*c,0,l*c+s*d,u*c+i,u*d-s*a,0,l*d-s*c,u*d+s*a,r*d*d+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,c=t._z,d=t._w,l=r+r,u=a+a,m=c+c,h=r*l,g=r*u,_=r*m,v=a*u,f=a*m,p=c*m,y=d*l,b=d*u,T=d*m,A=i.x,S=i.y,N=i.z;return s[0]=(1-(v+p))*A,s[1]=(g+T)*A,s[2]=(_-b)*A,s[3]=0,s[4]=(g-T)*S,s[5]=(1-(h+p))*S,s[6]=(f+y)*S,s[7]=0,s[8]=(_+b)*N,s[9]=(f-y)*N,s[10]=(1-(h+v))*N,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ui.set(s[0],s[1],s[2]).length();const c=ui.set(s[4],s[5],s[6]).length(),d=ui.set(s[8],s[9],s[10]).length();r<0&&(a=-a),qt.copy(this);const l=1/a,u=1/c,m=1/d;return qt.elements[0]*=l,qt.elements[1]*=l,qt.elements[2]*=l,qt.elements[4]*=u,qt.elements[5]*=u,qt.elements[6]*=u,qt.elements[8]*=m,qt.elements[9]*=m,qt.elements[10]*=m,t.setFromRotationMatrix(qt),i.x=a,i.y=c,i.z=d,this}makePerspective(e,t,i,s,r,a,c=an,d=!1){const l=this.elements,u=2*r/(t-e),m=2*r/(i-s),h=(t+e)/(t-e),g=(i+s)/(i-s);let _,v;if(d)_=r/(a-r),v=a*r/(a-r);else if(c===an)_=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(c===Ji)_=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=m,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,c=an,d=!1){const l=this.elements,u=2/(t-e),m=2/(i-s),h=-(t+e)/(t-e),g=-(i+s)/(i-s);let _,v;if(d)_=1/(a-r),v=a/(a-r);else if(c===an)_=-2/(a-r),v=-(a+r)/(a-r);else if(c===Ji)_=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=m,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=_,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Qs.prototype.isMatrix4=!0;let ht=Qs;const ui=new J,qt=new ht,Oh=new J(0,0,0),Bh=new J(1,1,1),An=new J,as=new J,Gt=new J,oc=new ht,cc=new Di;class Bn{constructor(e=0,t=0,i=0,s=Bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],d=s[1],l=s[5],u=s[9],m=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(d,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-Ye(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return oc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(oc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cc.setFromEuler(this),this.setFromQuaternion(cc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bn.DEFAULT_ORDER="XYZ";class Yl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zh=0;const lc=new J,hi=new Di,hn=new ht,os=new J,Bi=new J,kh=new J,Gh=new Di,dc=new J(1,0,0),uc=new J(0,1,0),hc=new J(0,0,1),fc={type:"added"},Hh={type:"removed"},fi={type:"childadded",child:null},Mr={type:"childremoved",child:null};class It extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new J,t=new Bn,i=new Di,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Oe}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(dc,e)}rotateY(e){return this.rotateOnAxis(uc,e)}rotateZ(e){return this.rotateOnAxis(hc,e)}translateOnAxis(e,t){return lc.copy(e).applyQuaternion(this.quaternion),this.position.add(lc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dc,e)}translateY(e){return this.translateOnAxis(uc,e)}translateZ(e){return this.translateOnAxis(hc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?os.copy(e):os.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(Bi,os,this.up):hn.lookAt(os,Bi,this.up),this.quaternion.setFromRotationMatrix(hn),s&&(hn.extractRotation(s.matrixWorld),hi.setFromRotationMatrix(hn),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fc),fi.child=e,this.dispatchEvent(fi),fi.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hh),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fc),fi.child=e,this.dispatchEvent(fi),fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,e,kh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Gh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,d){return c[d.uuid]===void 0&&(c[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const d=c.shapes;if(Array.isArray(d))for(let l=0,u=d.length;l<u;l++){const m=d[l];r(e.shapes,m)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let d=0,l=this.material.length;d<l;d++)c.push(r(e.materials,this.material[d]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const d=this.animations[c];s.animations.push(r(e.animations,d))}}if(t){const c=a(e.geometries),d=a(e.materials),l=a(e.textures),u=a(e.images),m=a(e.shapes),h=a(e.skeletons),g=a(e.animations),_=a(e.nodes);c.length>0&&(i.geometries=c),d.length>0&&(i.materials=d),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),m.length>0&&(i.shapes=m),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(c){const d=[];for(const l in c){const u=c[l];delete u.metadata,d.push(u)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new J(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jn extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vh={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const c=this._targetRay,d=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const f=t.getJointPose(v,i),p=this._getHandJoint(l,v);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const u=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],h=u.position.distanceTo(m.position),g=.02,_=.005;l.inputState.pinching&&h>g+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=g-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Vh)))}return c!==null&&(c.visible=s!==null),d!==null&&(d.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Jn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Zl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},cs={h:0,s:0,l:0};function yr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=Nh(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=yr(a,r,e+1/3),this.g=yr(a,r,e),this.b=yr(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=Zl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Sn(e.r),this.g=Sn(e.g),this.b=Sn(e.b),this}copyLinearToSRGB(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return $e.workingToColorSpace(Ct.copy(this),e),Math.round(Ye(Ct.r*255,0,255))*65536+Math.round(Ye(Ct.g*255,0,255))*256+Math.round(Ye(Ct.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Ct.copy(this),t);const i=Ct.r,s=Ct.g,r=Ct.b,a=Math.max(i,s,r),c=Math.min(i,s,r);let d,l;const u=(c+a)/2;if(c===a)d=0,l=0;else{const m=a-c;switch(l=u<=.5?m/(a+c):m/(2-a-c),a){case i:d=(s-r)/m+(s<r?6:0);break;case s:d=(r-i)/m+2;break;case r:d=(i-s)/m+4;break}d/=6}return e.h=d,e.s=l,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Xt){$e.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,i=Ct.g,s=Ct.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(cs);const i=mr(Rn.h,cs.h,t),s=mr(Rn.s,cs.s,t),r=mr(Rn.l,cs.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new qe;qe.NAMES=Zl;class ir{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=t}clone(){return new ir(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Kl extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const $t=new J,fn=new J,br=new J,pn=new J,pi=new J,mi=new J,pc=new J,Er=new J,Tr=new J,wr=new J,Ar=new ut,Rr=new ut,Cr=new ut;class Zt{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),$t.subVectors(e,t),s.cross($t);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){$t.subVectors(s,t),fn.subVectors(i,t),br.subVectors(e,t);const a=$t.dot($t),c=$t.dot(fn),d=$t.dot(br),l=fn.dot(fn),u=fn.dot(br),m=a*l-c*c;if(m===0)return r.set(0,0,0),null;const h=1/m,g=(l*d-c*u)*h,_=(a*u-c*d)*h;return r.set(1-g-_,_,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,i,s,r,a,c,d){return this.getBarycoord(e,t,i,s,pn)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,pn.x),d.addScaledVector(a,pn.y),d.addScaledVector(c,pn.z),d)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ar.setScalar(0),Rr.setScalar(0),Cr.setScalar(0),Ar.fromBufferAttribute(e,t),Rr.fromBufferAttribute(e,i),Cr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ar,r.x),a.addScaledVector(Rr,r.y),a.addScaledVector(Cr,r.z),a}static isFrontFacing(e,t,i,s){return $t.subVectors(i,t),fn.subVectors(e,t),$t.cross(fn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),$t.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Zt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,c;pi.subVectors(s,i),mi.subVectors(r,i),Er.subVectors(e,i);const d=pi.dot(Er),l=mi.dot(Er);if(d<=0&&l<=0)return t.copy(i);Tr.subVectors(e,s);const u=pi.dot(Tr),m=mi.dot(Tr);if(u>=0&&m<=u)return t.copy(s);const h=d*m-u*l;if(h<=0&&d>=0&&u<=0)return a=d/(d-u),t.copy(i).addScaledVector(pi,a);wr.subVectors(e,r);const g=pi.dot(wr),_=mi.dot(wr);if(_>=0&&g<=_)return t.copy(r);const v=g*l-d*_;if(v<=0&&l>=0&&_<=0)return c=l/(l-_),t.copy(i).addScaledVector(mi,c);const f=u*_-g*m;if(f<=0&&m-u>=0&&g-_>=0)return pc.subVectors(r,s),c=(m-u)/(m-u+(g-_)),t.copy(s).addScaledVector(pc,c);const p=1/(f+v+h);return a=v*p,c=h*p,t.copy(i).addScaledVector(pi,a).addScaledVector(mi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ts{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(r,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),ds.subVectors(this.max,zi),gi.subVectors(e.a,zi),xi.subVectors(e.b,zi),_i.subVectors(e.c,zi),Cn.subVectors(xi,gi),Nn.subVectors(_i,xi),Gn.subVectors(gi,_i);let t=[0,-Cn.z,Cn.y,0,-Nn.z,Nn.y,0,-Gn.z,Gn.y,Cn.z,0,-Cn.x,Nn.z,0,-Nn.x,Gn.z,0,-Gn.x,-Cn.y,Cn.x,0,-Nn.y,Nn.x,0,-Gn.y,Gn.x,0];return!Nr(t,gi,xi,_i,ds)||(t=[1,0,0,0,1,0,0,0,1],!Nr(t,gi,xi,_i,ds))?!1:(us.crossVectors(Cn,Nn),t=[us.x,us.y,us.z],Nr(t,gi,xi,_i,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mn=[new J,new J,new J,new J,new J,new J,new J,new J],Yt=new J,ls=new ts,gi=new J,xi=new J,_i=new J,Cn=new J,Nn=new J,Gn=new J,zi=new J,ds=new J,us=new J,Hn=new J;function Nr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Hn.fromArray(n,r);const c=s.x*Math.abs(Hn.x)+s.y*Math.abs(Hn.y)+s.z*Math.abs(Hn.z),d=e.dot(Hn),l=t.dot(Hn),u=i.dot(Hn);if(Math.max(-Math.max(d,l,u),Math.min(d,l,u))>c)return!1}return!0}const vt=new J,hs=new Ze;let Wh=0;class Ut extends ai{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ec,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)hs.fromBufferAttribute(this,t),hs.applyMatrix3(e),this.setXY(t,hs.x,hs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Oi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ec&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Jl extends Ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ql extends Ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Tt extends Ut{constructor(e,t,i){super(new Float32Array(e),t,i)}}const jh=new ts,ki=new J,Pr=new J;class sr{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):jh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ki.subVectors(e,this.center);const t=ki.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ki,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ki.copy(e.center).add(Pr)),this.expandByPoint(ki.copy(e.center).sub(Pr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Xh=0;const jt=new ht,Lr=new It,vi=new J,Ht=new ts,Gi=new ts,bt=new J;class Lt extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=es(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wh(e)?Ql:Jl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,i){return jt.makeTranslation(e,t,i),this.applyMatrix4(jt),this}scale(e,t,i){return jt.makeScale(e,t,i),this.applyMatrix4(jt),this}lookAt(e){return Lr.lookAt(e),Lr.updateMatrix(),this.applyMatrix4(Lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ts);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];Gi.setFromBufferAttribute(c),this.morphTargetsRelative?(bt.addVectors(Ht.min,Gi.min),Ht.expandByPoint(bt),bt.addVectors(Ht.max,Gi.max),Ht.expandByPoint(bt)):(Ht.expandByPoint(Gi.min),Ht.expandByPoint(Gi.max))}Ht.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],d=this.morphTargetsRelative;for(let l=0,u=c.count;l<u;l++)bt.fromBufferAttribute(c,l),d&&(vi.fromBufferAttribute(e,l),bt.add(vi)),s=Math.max(s,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ut(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const c=[],d=[];for(let M=0;M<i.count;M++)c[M]=new J,d[M]=new J;const l=new J,u=new J,m=new J,h=new Ze,g=new Ze,_=new Ze,v=new J,f=new J;function p(M,R,L){l.fromBufferAttribute(i,M),u.fromBufferAttribute(i,R),m.fromBufferAttribute(i,L),h.fromBufferAttribute(r,M),g.fromBufferAttribute(r,R),_.fromBufferAttribute(r,L),u.sub(l),m.sub(l),g.sub(h),_.sub(h);const I=1/(g.x*_.y-_.x*g.y);isFinite(I)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(m,-g.y).multiplyScalar(I),f.copy(m).multiplyScalar(g.x).addScaledVector(u,-_.x).multiplyScalar(I),c[M].add(v),c[R].add(v),c[L].add(v),d[M].add(f),d[R].add(f),d[L].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let M=0,R=y.length;M<R;++M){const L=y[M],I=L.start,B=L.count;for(let K=I,O=I+B;K<O;K+=3)p(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const b=new J,T=new J,A=new J,S=new J;function N(M){A.fromBufferAttribute(s,M),S.copy(A);const R=c[M];b.copy(R),b.sub(A.multiplyScalar(A.dot(R))).normalize(),T.crossVectors(S,R);const I=T.dot(d[M])<0?-1:1;a.setXYZW(M,b.x,b.y,b.z,I)}for(let M=0,R=y.length;M<R;++M){const L=y[M],I=L.start,B=L.count;for(let K=I,O=I+B;K<O;K+=3)N(e.getX(K+0)),N(e.getX(K+1)),N(e.getX(K+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const s=new J,r=new J,a=new J,c=new J,d=new J,l=new J,u=new J,m=new J;if(e)for(let h=0,g=e.count;h<g;h+=3){const _=e.getX(h+0),v=e.getX(h+1),f=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,f),u.subVectors(a,r),m.subVectors(s,r),u.cross(m),c.fromBufferAttribute(i,_),d.fromBufferAttribute(i,v),l.fromBufferAttribute(i,f),c.add(u),d.add(u),l.add(u),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(v,d.x,d.y,d.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),m.subVectors(s,r),u.cross(m),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(c,d){const l=c.array,u=c.itemSize,m=c.normalized,h=new l.constructor(d.length*u);let g=0,_=0;for(let v=0,f=d.length;v<f;v++){c.isInterleavedBufferAttribute?g=d[v]*c.data.stride+c.offset:g=d[v]*u;for(let p=0;p<u;p++)h[_++]=l[g++]}return new Ut(h,u,m)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,i=this.index.array,s=this.attributes;for(const c in s){const d=s[c],l=e(d,i);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const d=[],l=r[c];for(let u=0,m=l.length;u<m;u++){const h=l[u],g=e(h,i);d.push(g)}t.morphAttributes[c]=d}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,d=a.length;c<d;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const l in d)d[l]!==void 0&&(e[l]=d[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const d in i){const l=i[d];e.data.attributes[d]=l.toJSON(e.data)}const s={};let r=!1;for(const d in this.morphAttributes){const l=this.morphAttributes[d],u=[];for(let m=0,h=l.length;m<h;m++){const g=l[m];u.push(g.toJSON(e.data))}u.length>0&&(s[d]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],m=r[l];for(let h=0,g=m.length;h<g;h++)u.push(m[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const m=a[l];this.addGroup(m.start,m.count,m.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let qh=0;class Ii extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=es(),this.name="",this.type="Material",this.blending=Ei,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=na,this.blendDst=ia,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(i.blending=this.blending),this.side!==On&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==na&&(i.blendSrc=this.blendSrc),this.blendDst!==ia&&(i.blendDst=this.blendDst),this.blendEquation!==$n&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const c in r){const d=r[c];delete d.metadata,a.push(d)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const gn=new J,Dr=new J,fs=new J,Pn=new J,Ir=new J,ps=new J,Ur=new J;class ed{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Dr.copy(e).add(t).multiplyScalar(.5),fs.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(Dr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(fs),c=Pn.dot(this.direction),d=-Pn.dot(fs),l=Pn.lengthSq(),u=Math.abs(1-a*a);let m,h,g,_;if(u>0)if(m=a*d-c,h=a*c-d,_=r*u,m>=0)if(h>=-_)if(h<=_){const v=1/u;m*=v,h*=v,g=m*(m+a*h+2*c)+h*(a*m+h+2*d)+l}else h=r,m=Math.max(0,-(a*h+c)),g=-m*m+h*(h+2*d)+l;else h=-r,m=Math.max(0,-(a*h+c)),g=-m*m+h*(h+2*d)+l;else h<=-_?(m=Math.max(0,-(-a*r+c)),h=m>0?-r:Math.min(Math.max(-r,-d),r),g=-m*m+h*(h+2*d)+l):h<=_?(m=0,h=Math.min(Math.max(-r,-d),r),g=h*(h+2*d)+l):(m=Math.max(0,-(a*r+c)),h=m>0?r:Math.min(Math.max(-r,-d),r),g=-m*m+h*(h+2*d)+l);else h=a>0?-r:r,m=Math.max(0,-(a*h+c)),g=-m*m+h*(h+2*d)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Dr).addScaledVector(fs,h),g}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const i=gn.dot(this.direction),s=gn.dot(gn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=i-a,d=i+a;return d<0?null:c<0?this.at(d,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,c,d;const l=1/this.direction.x,u=1/this.direction.y,m=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),m>=0?(c=(e.min.z-h.z)*m,d=(e.max.z-h.z)*m):(c=(e.max.z-h.z)*m,d=(e.min.z-h.z)*m),i>d||c>s)||((c>i||i!==i)&&(i=c),(d<s||s!==s)&&(s=d),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,i,s,r){Ir.subVectors(t,e),ps.subVectors(i,e),Ur.crossVectors(Ir,ps);let a=this.direction.dot(Ur),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Pn.subVectors(this.origin,e);const d=c*this.direction.dot(ps.crossVectors(Pn,ps));if(d<0)return null;const l=c*this.direction.dot(Ir.cross(Pn));if(l<0||d+l>a)return null;const u=-c*Pn.dot(Ur);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Un extends Ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=Pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mc=new ht,Vn=new ed,ms=new sr,gc=new J,gs=new J,xs=new J,_s=new J,Fr=new J,vs=new J,xc=new J,Ms=new J;class lt extends It{constructor(e=new Lt,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){vs.set(0,0,0);for(let d=0,l=r.length;d<l;d++){const u=c[d],m=r[d];u!==0&&(Fr.fromBufferAttribute(m,e),a?vs.addScaledVector(Fr,u):vs.addScaledVector(Fr.sub(t),u))}t.add(vs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ms.copy(i.boundingSphere),ms.applyMatrix4(r),Vn.copy(e.ray).recast(e.near),!(ms.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(ms,gc)===null||Vn.origin.distanceToSquared(gc)>(e.far-e.near)**2))&&(mc.copy(r).invert(),Vn.copy(e.ray).applyMatrix4(mc),!(i.boundingBox!==null&&Vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,c=r.index,d=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,m=r.attributes.normal,h=r.groups,g=r.drawRange;if(c!==null)if(Array.isArray(a))for(let _=0,v=h.length;_<v;_++){const f=h[_],p=a[f.materialIndex],y=Math.max(f.start,g.start),b=Math.min(c.count,Math.min(f.start+f.count,g.start+g.count));for(let T=y,A=b;T<A;T+=3){const S=c.getX(T),N=c.getX(T+1),M=c.getX(T+2);s=Ss(this,p,e,i,l,u,m,S,N,M),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),v=Math.min(c.count,g.start+g.count);for(let f=_,p=v;f<p;f+=3){const y=c.getX(f),b=c.getX(f+1),T=c.getX(f+2);s=Ss(this,a,e,i,l,u,m,y,b,T),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(a))for(let _=0,v=h.length;_<v;_++){const f=h[_],p=a[f.materialIndex],y=Math.max(f.start,g.start),b=Math.min(d.count,Math.min(f.start+f.count,g.start+g.count));for(let T=y,A=b;T<A;T+=3){const S=T,N=T+1,M=T+2;s=Ss(this,p,e,i,l,u,m,S,N,M),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),v=Math.min(d.count,g.start+g.count);for(let f=_,p=v;f<p;f+=3){const y=f,b=f+1,T=f+2;s=Ss(this,a,e,i,l,u,m,y,b,T),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function $h(n,e,t,i,s,r,a,c){let d;if(e.side===zt?d=i.intersectTriangle(a,r,s,!0,c):d=i.intersectTriangle(s,r,a,e.side===On,c),d===null)return null;Ms.copy(c),Ms.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ms);return l<t.near||l>t.far?null:{distance:l,point:Ms.clone(),object:n}}function Ss(n,e,t,i,s,r,a,c,d,l){n.getVertexPosition(c,gs),n.getVertexPosition(d,xs),n.getVertexPosition(l,_s);const u=$h(n,e,t,i,gs,xs,_s,xc);if(u){const m=new J;Zt.getBarycoord(xc,gs,xs,_s,m),s&&(u.uv=Zt.getInterpolatedAttribute(s,c,d,l,m,new Ze)),r&&(u.uv1=Zt.getInterpolatedAttribute(r,c,d,l,m,new Ze)),a&&(u.normal=Zt.getInterpolatedAttribute(a,c,d,l,m,new J),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:d,c:l,normal:new J,materialIndex:0};Zt.getNormal(gs,xs,_s,h.normal),u.face=h,u.barycoord=m}return u}class Yh extends Pt{constructor(e=null,t=1,i=1,s,r,a,c,d,l=wt,u=wt,m,h){super(null,a,c,d,l,u,s,r,m,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Or=new J,Zh=new J,Kh=new Oe;class qn{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Or.subVectors(i,t).cross(Zh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Or),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Kh.getNormalMatrix(e),s=this.coplanarPoint(Or).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new sr,Jh=new Ze(.5,.5),ys=new J;class uo{constructor(e=new qn,t=new qn,i=new qn,s=new qn,r=new qn,a=new qn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=an,i=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],d=r[2],l=r[3],u=r[4],m=r[5],h=r[6],g=r[7],_=r[8],v=r[9],f=r[10],p=r[11],y=r[12],b=r[13],T=r[14],A=r[15];if(s[0].setComponents(l-a,g-u,p-_,A-y).normalize(),s[1].setComponents(l+a,g+u,p+_,A+y).normalize(),s[2].setComponents(l+c,g+m,p+v,A+b).normalize(),s[3].setComponents(l-c,g-m,p-v,A-b).normalize(),i)s[4].setComponents(d,h,f,T).normalize(),s[5].setComponents(l-d,g-h,p-f,A-T).normalize();else if(s[4].setComponents(l-d,g-h,p-f,A-T).normalize(),t===an)s[5].setComponents(l+d,g+h,p+f,A+T).normalize();else if(t===Ji)s[5].setComponents(d,h,f,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(e){Wn.center.set(0,0,0);const t=Jh.distanceTo(e.center);return Wn.radius=.7071067811865476+t,Wn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ys.x=s.normal.x>0?e.max.x:e.min.x,ys.y=s.normal.y>0?e.max.y:e.min.y,ys.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ys)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rr extends Ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _c=new ht,ja=new ed,bs=new sr,Es=new J;class ho extends It{constructor(e=new Lt,t=new rr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),bs.copy(i.boundingSphere),bs.applyMatrix4(s),bs.radius+=r,e.ray.intersectsSphere(bs)===!1)return;_c.copy(s).invert(),ja.copy(e.ray).applyMatrix4(_c);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,l=i.index,m=i.attributes.position;if(l!==null){const h=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let _=h,v=g;_<v;_++){const f=l.getX(_);Es.fromBufferAttribute(m,f),vc(Es,f,d,s,e,t,this)}}else{const h=Math.max(0,a.start),g=Math.min(m.count,a.start+a.count);for(let _=h,v=g;_<v;_++)Es.fromBufferAttribute(m,_),vc(Es,_,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function vc(n,e,t,i,s,r,a){const c=ja.distanceSqToPoint(n);if(c<t){const d=new J;ja.closestPointToPoint(n,d),d.applyMatrix4(i);const l=s.ray.origin.distanceTo(d);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(c),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class td extends Pt{constructor(e=[],t=ni,i,s,r,a,c,d,l,u){super(e,t,i,s,r,a,c,d,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nd extends Pt{constructor(e,t,i,s,r,a,c,d,l){super(e,t,i,s,r,a,c,d,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pi extends Pt{constructor(e,t,i=ln,s,r,a,c=wt,d=wt,l,u=bn,m=1){if(u!==bn&&u!==Kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:m};super(h,s,r,a,c,d,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Qh extends Pi{constructor(e,t=ln,i=ni,s,r,a=wt,c=wt,d,l=bn){const u={width:e,height:e,depth:1},m=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,c,d,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class id extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class si extends Lt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const d=[],l=[],u=[],m=[];let h=0,g=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(d),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(m,2));function _(v,f,p,y,b,T,A,S,N,M,R){const L=T/N,I=A/M,B=T/2,K=A/2,O=S/2,U=N+1,W=M+1;let V=0,Y=0;const re=new J;for(let fe=0;fe<W;fe++){const pe=fe*I-K;for(let Ee=0;Ee<U;Ee++){const He=Ee*L-B;re[v]=He*y,re[f]=pe*b,re[p]=O,l.push(re.x,re.y,re.z),re[v]=0,re[f]=0,re[p]=S>0?1:-1,u.push(re.x,re.y,re.z),m.push(Ee/N),m.push(1-fe/M),V+=1}}for(let fe=0;fe<M;fe++)for(let pe=0;pe<N;pe++){const Ee=h+pe+U*fe,He=h+pe+U*(fe+1),Te=h+(pe+1)+U*(fe+1),Be=h+(pe+1)+U*fe;d.push(Ee,He,Be),d.push(He,Te,Be),Y+=6}c.addGroup(g,Y,R),g+=Y,h+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ai extends Lt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,c=0,d=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:d};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],m=[],h=[],g=[];let _=0;const v=[],f=i/2;let p=0;y(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(h,3)),this.setAttribute("uv",new Tt(g,2));function y(){const T=new J,A=new J;let S=0;const N=(t-e)/i;for(let M=0;M<=r;M++){const R=[],L=M/r,I=L*(t-e)+e;for(let B=0;B<=s;B++){const K=B/s,O=K*d+c,U=Math.sin(O),W=Math.cos(O);A.x=I*U,A.y=-L*i+f,A.z=I*W,m.push(A.x,A.y,A.z),T.set(U,N,W).normalize(),h.push(T.x,T.y,T.z),g.push(K,1-L),R.push(_++)}v.push(R)}for(let M=0;M<s;M++)for(let R=0;R<r;R++){const L=v[R][M],I=v[R+1][M],B=v[R+1][M+1],K=v[R][M+1];(e>0||R!==0)&&(u.push(L,I,K),S+=3),(t>0||R!==r-1)&&(u.push(I,B,K),S+=3)}l.addGroup(p,S,0),p+=S}function b(T){const A=_,S=new Ze,N=new J;let M=0;const R=T===!0?e:t,L=T===!0?1:-1;for(let B=1;B<=s;B++)m.push(0,f*L,0),h.push(0,L,0),g.push(.5,.5),_++;const I=_;for(let B=0;B<=s;B++){const O=B/s*d+c,U=Math.cos(O),W=Math.sin(O);N.x=R*W,N.y=f*L,N.z=R*U,m.push(N.x,N.y,N.z),h.push(0,L,0),S.x=U*.5+.5,S.y=W*.5*L+.5,g.push(S.x,S.y),_++}for(let B=0;B<s;B++){const K=A+B,O=I+B;T===!0?u.push(O,O+1,K):u.push(O+1,O,K),M+=3}l.addGroup(p,M,T===!0?1:2),p+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ai(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fo extends Ai{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,i,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new fo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ui extends Lt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(i),d=Math.floor(s),l=c+1,u=d+1,m=e/c,h=t/d,g=[],_=[],v=[],f=[];for(let p=0;p<u;p++){const y=p*h-a;for(let b=0;b<l;b++){const T=b*m-r;_.push(T,-y,0),v.push(0,0,1),f.push(b/c),f.push(1-p/d)}}for(let p=0;p<d;p++)for(let y=0;y<c;y++){const b=y+l*p,T=y+l*(p+1),A=y+1+l*(p+1),S=y+1+l*p;g.push(b,T,S),g.push(T,A,S)}this.setIndex(g),this.setAttribute("position",new Tt(_,3)),this.setAttribute("normal",new Tt(v,3)),this.setAttribute("uv",new Tt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ys extends Lt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const d=Math.min(a+c,Math.PI);let l=0;const u=[],m=new J,h=new J,g=[],_=[],v=[],f=[];for(let p=0;p<=i;p++){const y=[],b=p/i,T=a+b*c,A=e*Math.cos(T),S=Math.sqrt(e*e-A*A);let N=0;p===0&&a===0?N=.5/t:p===i&&d===Math.PI&&(N=-.5/t);for(let M=0;M<=t;M++){const R=M/t,L=s+R*r;m.x=-S*Math.cos(L),m.y=A,m.z=S*Math.sin(L),_.push(m.x,m.y,m.z),h.copy(m).normalize(),v.push(h.x,h.y,h.z),f.push(R+N,1-b),y.push(l++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const b=u[p][y+1],T=u[p][y],A=u[p+1][y],S=u[p+1][y+1];(p!==0||a>0)&&g.push(b,T,S),(p!==i-1||d<Math.PI)&&g.push(T,A,S)}this.setIndex(g),this.setAttribute("position",new Tt(_,3)),this.setAttribute("normal",new Tt(v,3)),this.setAttribute("uv",new Tt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class po extends Lt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const d=[],l=[],u=[],m=[],h=new J,g=new J,_=new J;for(let v=0;v<=i;v++){const f=a+v/i*c;for(let p=0;p<=s;p++){const y=p/s*r;g.x=(e+t*Math.cos(f))*Math.cos(y),g.y=(e+t*Math.cos(f))*Math.sin(y),g.z=t*Math.sin(f),l.push(g.x,g.y,g.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),_.subVectors(g,h).normalize(),u.push(_.x,_.y,_.z),m.push(p/s),m.push(v/i)}}for(let v=1;v<=i;v++)for(let f=1;f<=s;f++){const p=(s+1)*v+f-1,y=(s+1)*(v-1)+f-1,b=(s+1)*(v-1)+f,T=(s+1)*v+f;d.push(p,y,T),d.push(y,b,T)}this.setIndex(d),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Li(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Mc(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Mc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Dt(n){const e={};for(let t=0;t<n.length;t++){const i=Li(n[t]);for(const s in i)e[s]=i[s]}return e}function Mc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ef(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function sd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const tf={clone:Li,merge:Dt};var nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends Ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nf,this.fragmentShader=sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Li(e.uniforms),this.uniformsGroups=ef(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ut().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ht().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class rf extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class jn extends Ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Va,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class af extends Ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class of extends Ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class rd extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Br=new ht,Sc=new J,yc=new J;class cf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=Vt,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uo,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Sc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sc),yc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yc),t.updateMatrixWorld(),Br.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Br,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ji||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Br)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ts=new J,ws=new Di,tn=new J;class ad extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=an,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ts,ws,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ts,ws,tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ts,ws,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ts,ws,tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ln=new J,bc=new Ze,Ec=new Ze;class Bt extends ad{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ln.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ln.x,Ln.y).multiplyScalar(-e/Ln.z),Ln.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ln.x,Ln.y).multiplyScalar(-e/Ln.z)}getViewSize(e,t){return this.getViewBounds(e,bc,Ec),t.subVectors(Ec,bc)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(pr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const d=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/d,t-=a.offsetY*i/l,s*=a.width/d,i*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class lf extends cf{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0}}class ei extends rd{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new lf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class od extends ad{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,c=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=u*this.view.offsetY,d=c-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cd extends rd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Mi=-90,Si=1;class df extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bt(Mi,Si,e,t);s.layers=this.layers,this.add(s);const r=new Bt(Mi,Si,e,t);r.layers=this.layers,this.add(r);const a=new Bt(Mi,Si,e,t);a.layers=this.layers,this.add(a);const c=new Bt(Mi,Si,e,t);c.layers=this.layers,this.add(c);const d=new Bt(Mi,Si,e,t);d.layers=this.layers,this.add(d);const l=new Bt(Mi,Si,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,c,d]=t;for(const l of t)this.remove(l);if(e===an)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===Ji)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,d,l,u]=this.children,m=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(i,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(m,h,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class uf extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const vo=class vo{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};vo.prototype.isMatrix2=!0;let Tc=vo;function wc(n,e,t,i){const s=hf(i);switch(t){case Wl:return n*e;case Xl:return n*e/s.components*s.byteLength;case so:return n*e/s.components*s.byteLength;case ii:return n*e*2/s.components*s.byteLength;case ro:return n*e*2/s.components*s.byteLength;case jl:return n*e*3/s.components*s.byteLength;case Kt:return n*e*4/s.components*s.byteLength;case ao:return n*e*4/s.components*s.byteLength;case Is:case Us:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fs:case Os:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:case ga:return Math.max(n,16)*Math.max(e,8)/4;case fa:case ma:return Math.max(n,8)*Math.max(e,8)/2;case xa:case _a:case Ma:case Sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case va:case Ws:case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case wa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Na:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ua:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Oa:case Ba:case za:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ka:case Ga:return Math.ceil(n/4)*Math.ceil(e/4)*8;case js:case Ha:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hf(n){switch(n){case Vt:case kl:return{byteLength:1,components:1};case Zi:case Gl:case yn:return{byteLength:2,components:1};case no:case io:return{byteLength:2,components:4};case ln:case to:case rn:return{byteLength:4,components:1};case Hl:case Vl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:eo}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=eo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ld(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function ff(n){const e=new WeakMap;function t(c,d){const l=c.array,u=c.usage,m=l.byteLength,h=n.createBuffer();n.bindBuffer(d,h),n.bufferData(d,l,u),c.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:m}}function i(c,d,l){const u=d.array,m=d.updateRanges;if(n.bindBuffer(l,c),m.length===0)n.bufferSubData(l,0,u);else{m.sort((g,_)=>g.start-_.start);let h=0;for(let g=1;g<m.length;g++){const _=m[h],v=m[g];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++h,m[h]=v)}m.length=h+1;for(let g=0,_=m.length;g<_;g++){const v=m[g];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=e.get(c);d&&(n.deleteBuffer(d.buffer),e.delete(c))}function a(c,d){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const u=e.get(c);(!u||u.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,d));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,c,d),l.version=c.version}}return{get:s,remove:r,update:a}}var pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mf=`#ifdef USE_ALPHAHASH
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
#endif`,gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_f=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mf=`#ifdef USE_AOMAP
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
#endif`,Sf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yf=`#ifdef USE_BATCHING
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
#endif`,bf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ef=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Af=`#ifdef USE_IRIDESCENCE
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
#endif`,Rf=`#ifdef USE_BUMPMAP
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
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,If=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Of=`#define PI 3.141592653589793
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
} // validated`,Bf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zf=`vec3 transformedNormal = objectNormal;
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
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wf="gl_FragColor = linearToOutputTexel( gl_FragColor );",jf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xf=`#ifdef USE_ENVMAP
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
#endif`,qf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
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
#endif`,Yf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
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
#endif`,Kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ep=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tp=`#ifdef USE_GRADIENTMAP
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
}`,np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ap=`#ifdef USE_ENVMAP
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
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,up=`PhysicalMaterial material;
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
#endif`,hp=`uniform sampler2D dfgLUT;
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
}`,fp=`
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
#endif`,pp=`#if defined( RE_IndirectDiffuse )
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
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ep=`#if defined( USE_POINTS_UV )
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
#endif`,Tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ap=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`#ifdef USE_MORPHTARGETS
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
#endif`,Pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Op=`#ifdef USE_NORMALMAP
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
#endif`,Bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$p=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qp=`float getShadowMask() {
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
}`,em=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tm=`#ifdef USE_SKINNING
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
#endif`,nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,im=`#ifdef USE_SKINNING
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
#endif`,sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,om=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cm=`#ifdef USE_TRANSMISSION
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
#endif`,lm=`#ifdef USE_TRANSMISSION
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
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mm=`uniform sampler2D t2D;
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`#include <common>
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
}`,Sm=`#if DEPTH_PACKING == 3200
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
}`,ym=`#define DISTANCE
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
}`,bm=`#define DISTANCE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`uniform float scale;
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
}`,Am=`uniform vec3 diffuse;
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
}`,Rm=`#include <common>
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Nm=`#define LAMBERT
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
}`,Pm=`#define LAMBERT
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
}`,Lm=`#define MATCAP
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
}`,Dm=`#define MATCAP
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
}`,Im=`#define NORMAL
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
}`,Um=`#define NORMAL
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
}`,Fm=`#define PHONG
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
}`,Om=`#define PHONG
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
}`,Bm=`#define STANDARD
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
}`,zm=`#define STANDARD
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
}`,km=`#define TOON
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
}`,Gm=`#define TOON
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
}`,Hm=`uniform float size;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,Wm=`#include <common>
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
}`,jm=`uniform vec3 color;
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
}`,Xm=`uniform float rotation;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:pf,alphahash_pars_fragment:mf,alphamap_fragment:gf,alphamap_pars_fragment:xf,alphatest_fragment:_f,alphatest_pars_fragment:vf,aomap_fragment:Mf,aomap_pars_fragment:Sf,batching_pars_vertex:yf,batching_vertex:bf,begin_vertex:Ef,beginnormal_vertex:Tf,bsdfs:wf,iridescence_fragment:Af,bumpmap_pars_fragment:Rf,clipping_planes_fragment:Cf,clipping_planes_pars_fragment:Nf,clipping_planes_pars_vertex:Pf,clipping_planes_vertex:Lf,color_fragment:Df,color_pars_fragment:If,color_pars_vertex:Uf,color_vertex:Ff,common:Of,cube_uv_reflection_fragment:Bf,defaultnormal_vertex:zf,displacementmap_pars_vertex:kf,displacementmap_vertex:Gf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Vf,colorspace_fragment:Wf,colorspace_pars_fragment:jf,envmap_fragment:Xf,envmap_common_pars_fragment:qf,envmap_pars_fragment:$f,envmap_pars_vertex:Yf,envmap_physical_pars_fragment:ap,envmap_vertex:Zf,fog_vertex:Kf,fog_pars_vertex:Jf,fog_fragment:Qf,fog_pars_fragment:ep,gradientmap_pars_fragment:tp,lightmap_pars_fragment:np,lights_lambert_fragment:ip,lights_lambert_pars_fragment:sp,lights_pars_begin:rp,lights_toon_fragment:op,lights_toon_pars_fragment:cp,lights_phong_fragment:lp,lights_phong_pars_fragment:dp,lights_physical_fragment:up,lights_physical_pars_fragment:hp,lights_fragment_begin:fp,lights_fragment_maps:pp,lights_fragment_end:mp,lightprobes_pars_fragment:gp,logdepthbuf_fragment:xp,logdepthbuf_pars_fragment:_p,logdepthbuf_pars_vertex:vp,logdepthbuf_vertex:Mp,map_fragment:Sp,map_pars_fragment:yp,map_particle_fragment:bp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Tp,metalnessmap_pars_fragment:wp,morphinstance_vertex:Ap,morphcolor_vertex:Rp,morphnormal_vertex:Cp,morphtarget_pars_vertex:Np,morphtarget_vertex:Pp,normal_fragment_begin:Lp,normal_fragment_maps:Dp,normal_pars_fragment:Ip,normal_pars_vertex:Up,normal_vertex:Fp,normalmap_pars_fragment:Op,clearcoat_normal_fragment_begin:Bp,clearcoat_normal_fragment_maps:zp,clearcoat_pars_fragment:kp,iridescence_pars_fragment:Gp,opaque_fragment:Hp,packing:Vp,premultiplied_alpha_fragment:Wp,project_vertex:jp,dithering_fragment:Xp,dithering_pars_fragment:qp,roughnessmap_fragment:$p,roughnessmap_pars_fragment:Yp,shadowmap_pars_fragment:Zp,shadowmap_pars_vertex:Kp,shadowmap_vertex:Jp,shadowmask_pars_fragment:Qp,skinbase_vertex:em,skinning_pars_vertex:tm,skinning_vertex:nm,skinnormal_vertex:im,specularmap_fragment:sm,specularmap_pars_fragment:rm,tonemapping_fragment:am,tonemapping_pars_fragment:om,transmission_fragment:cm,transmission_pars_fragment:lm,uv_pars_fragment:dm,uv_pars_vertex:um,uv_vertex:hm,worldpos_vertex:fm,background_vert:pm,background_frag:mm,backgroundCube_vert:gm,backgroundCube_frag:xm,cube_vert:_m,cube_frag:vm,depth_vert:Mm,depth_frag:Sm,distance_vert:ym,distance_frag:bm,equirect_vert:Em,equirect_frag:Tm,linedashed_vert:wm,linedashed_frag:Am,meshbasic_vert:Rm,meshbasic_frag:Cm,meshlambert_vert:Nm,meshlambert_frag:Pm,meshmatcap_vert:Lm,meshmatcap_frag:Dm,meshnormal_vert:Im,meshnormal_frag:Um,meshphong_vert:Fm,meshphong_frag:Om,meshphysical_vert:Bm,meshphysical_frag:zm,meshtoon_vert:km,meshtoon_frag:Gm,points_vert:Hm,points_frag:Vm,shadow_vert:Wm,shadow_frag:jm,sprite_vert:Xm,sprite_frag:qm},_e={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},sn={basic:{uniforms:Dt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Dt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Dt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Dt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Dt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Dt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Dt([_e.points,_e.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Dt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Dt([_e.common,_e.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Dt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Dt([_e.sprite,_e.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Dt([_e.common,_e.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Dt([_e.lights,_e.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};sn.physical={uniforms:Dt([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const As={r:0,b:0,g:0},$m=new ht,dd=new Oe;dd.set(-1,0,0,0,1,0,0,0,1);function Ym(n,e,t,i,s,r){const a=new qe(0);let c=s===!0?0:1,d,l,u=null,m=0,h=null;function g(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){const T=y.backgroundBlurriness>0;b=e.get(b,T)}return b}function _(y){let b=!1;const T=g(y);T===null?f(a,c):T&&T.isColor&&(f(T,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,b){const T=g(b);T&&(T.isCubeTexture||T.mapping===nr)?(l===void 0&&(l=new lt(new si(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Li(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,S,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4($m.makeRotationFromEuler(b.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(dd),l.material.toneMapped=$e.getTransfer(T.colorSpace)!==et,(u!==T||m!==T.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=T,m=T.version,h=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(d===void 0&&(d=new lt(new Ui(2,2),new dn({name:"BackgroundMaterial",uniforms:Li(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(d)),d.material.uniforms.t2D.value=T,d.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,d.material.toneMapped=$e.getTransfer(T.colorSpace)!==et,T.matrixAutoUpdate===!0&&T.updateMatrix(),d.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||m!==T.version||h!==n.toneMapping)&&(d.material.needsUpdate=!0,u=T,m=T.version,h=n.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null))}function f(y,b){y.getRGB(As,sd(n)),t.buffers.color.setClear(As.r,As.g,As.b,b,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),c=b,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,f(a,c)},render:_,addToRenderList:v,dispose:p}}function Zm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function c(I,B,K,O,U){let W=!1;const V=m(I,O,K,B);r!==V&&(r=V,l(r.object)),W=g(I,O,K,U),W&&_(I,O,K,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,T(I,B,K,O),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function d(){return n.createVertexArray()}function l(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function m(I,B,K,O){const U=O.wireframe===!0;let W=i[B.id];W===void 0&&(W={},i[B.id]=W);const V=I.isInstancedMesh===!0?I.id:0;let Y=W[V];Y===void 0&&(Y={},W[V]=Y);let re=Y[K.id];re===void 0&&(re={},Y[K.id]=re);let fe=re[U];return fe===void 0&&(fe=h(d()),re[U]=fe),fe}function h(I){const B=[],K=[],O=[];for(let U=0;U<t;U++)B[U]=0,K[U]=0,O[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:K,attributeDivisors:O,object:I,attributes:{},index:null}}function g(I,B,K,O){const U=r.attributes,W=B.attributes;let V=0;const Y=K.getAttributes();for(const re in Y)if(Y[re].location>=0){const pe=U[re];let Ee=W[re];if(Ee===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(Ee=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(Ee=I.instanceColor)),pe===void 0||pe.attribute!==Ee||Ee&&pe.data!==Ee.data)return!0;V++}return r.attributesNum!==V||r.index!==O}function _(I,B,K,O){const U={},W=B.attributes;let V=0;const Y=K.getAttributes();for(const re in Y)if(Y[re].location>=0){let pe=W[re];pe===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(pe=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(pe=I.instanceColor));const Ee={};Ee.attribute=pe,pe&&pe.data&&(Ee.data=pe.data),U[re]=Ee,V++}r.attributes=U,r.attributesNum=V,r.index=O}function v(){const I=r.newAttributes;for(let B=0,K=I.length;B<K;B++)I[B]=0}function f(I){p(I,0)}function p(I,B){const K=r.newAttributes,O=r.enabledAttributes,U=r.attributeDivisors;K[I]=1,O[I]===0&&(n.enableVertexAttribArray(I),O[I]=1),U[I]!==B&&(n.vertexAttribDivisor(I,B),U[I]=B)}function y(){const I=r.newAttributes,B=r.enabledAttributes;for(let K=0,O=B.length;K<O;K++)B[K]!==I[K]&&(n.disableVertexAttribArray(K),B[K]=0)}function b(I,B,K,O,U,W,V){V===!0?n.vertexAttribIPointer(I,B,K,U,W):n.vertexAttribPointer(I,B,K,O,U,W)}function T(I,B,K,O){v();const U=O.attributes,W=K.getAttributes(),V=B.defaultAttributeValues;for(const Y in W){const re=W[Y];if(re.location>=0){let fe=U[Y];if(fe===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor)),fe!==void 0){const pe=fe.normalized,Ee=fe.itemSize,He=e.get(fe);if(He===void 0)continue;const Te=He.buffer,Be=He.type,j=He.bytesPerElement,se=Be===n.INT||Be===n.UNSIGNED_INT||fe.gpuType===to;if(fe.isInterleavedBufferAttribute){const $=fe.data,Me=$.stride,Pe=fe.offset;if($.isInstancedInterleavedBuffer){for(let Le=0;Le<re.locationSize;Le++)p(re.location+Le,$.meshPerAttribute);I.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Le=0;Le<re.locationSize;Le++)f(re.location+Le);n.bindBuffer(n.ARRAY_BUFFER,Te);for(let Le=0;Le<re.locationSize;Le++)b(re.location+Le,Ee/re.locationSize,Be,pe,Me*j,(Pe+Ee/re.locationSize*Le)*j,se)}else{if(fe.isInstancedBufferAttribute){for(let $=0;$<re.locationSize;$++)p(re.location+$,fe.meshPerAttribute);I.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let $=0;$<re.locationSize;$++)f(re.location+$);n.bindBuffer(n.ARRAY_BUFFER,Te);for(let $=0;$<re.locationSize;$++)b(re.location+$,Ee/re.locationSize,Be,pe,Ee*j,Ee/re.locationSize*$*j,se)}}else if(V!==void 0){const pe=V[Y];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(re.location,pe);break;case 3:n.vertexAttrib3fv(re.location,pe);break;case 4:n.vertexAttrib4fv(re.location,pe);break;default:n.vertexAttrib1fv(re.location,pe)}}}}y()}function A(){R();for(const I in i){const B=i[I];for(const K in B){const O=B[K];for(const U in O){const W=O[U];for(const V in W)u(W[V].object),delete W[V];delete O[U]}}delete i[I]}}function S(I){if(i[I.id]===void 0)return;const B=i[I.id];for(const K in B){const O=B[K];for(const U in O){const W=O[U];for(const V in W)u(W[V].object),delete W[V];delete O[U]}}delete i[I.id]}function N(I){for(const B in i){const K=i[B];for(const O in K){const U=K[O];if(U[I.id]===void 0)continue;const W=U[I.id];for(const V in W)u(W[V].object),delete W[V];delete U[I.id]}}}function M(I){for(const B in i){const K=i[B],O=I.isInstancedMesh===!0?I.id:0,U=K[O];if(U!==void 0){for(const W in U){const V=U[W];for(const Y in V)u(V[Y].object),delete V[Y];delete U[W]}delete K[O],Object.keys(K).length===0&&delete i[B]}}}function R(){L(),a=!0,r!==s&&(r=s,l(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:R,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfObject:M,releaseStatesOfProgram:N,initAttributes:v,enableAttribute:f,disableUnusedAttributes:y}}function Km(n,e,t){let i;function s(d){i=d}function r(d,l){n.drawArrays(i,d,l),t.update(l,i,1)}function a(d,l,u){u!==0&&(n.drawArraysInstanced(i,d,l,u),t.update(l,i,u))}function c(d,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,l,0,u);let h=0;for(let g=0;g<u;g++)h+=l[g];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Jm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(N){return!(N!==Kt&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(N){const M=N===yn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==Vt&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==rn&&!M)}function d(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=d(l);u!==l&&(Fe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const m=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:m,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:T,maxSamples:A,samples:S}}function Qm(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new qn,c=new Oe,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(m,h){const g=m.length!==0||h||i!==0||s;return s=h,i=m.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,h){t=u(m,h,0)},this.setState=function(m,h,g){const _=m.clippingPlanes,v=m.clipIntersection,f=m.clipShadows,p=n.get(m);if(!s||_===null||_.length===0||r&&!f)r?u(null):l();else{const y=r?0:i,b=y*4;let T=p.clippingState||null;d.value=T,T=u(_,h,b,g);for(let A=0;A!==b;++A)T[A]=t[A];p.clippingState=T,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){d.value!==t&&(d.value=t,d.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(m,h,g,_){const v=m!==null?m.length:0;let f=null;if(v!==0){if(f=d.value,_!==!0||f===null){const p=g+v*4,y=h.matrixWorldInverse;c.getNormalMatrix(y),(f===null||f.length<p)&&(f=new Float32Array(p));for(let b=0,T=g;b!==v;++b,T+=4)a.copy(m[b]).applyMatrix4(y,c),a.normal.toArray(f,T),f[T+3]=a.constant}d.value=f,d.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,f}}const In=4,Ac=[.125,.215,.35,.446,.526,.582],Yn=20,eg=256,Hi=new od,Rc=new qe;let zr=null,kr=0,Gr=0,Hr=!1;const tg=new J;class Cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:c=tg}=r;zr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Gr=this._renderer.getActiveMipmapLevel(),Hr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,i,s,d,c),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zr,kr,Gr),this._renderer.xr.enabled=Hr,e.scissorTest=!1,yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ni||e.mapping===Ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Gr=this._renderer.getActiveMipmapLevel(),Hr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:yn,format:Kt,colorSpace:Xs,depthBuffer:!1},s=Nc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nc(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ng(r)),this._blurMaterial=sg(r,e,t),this._ggxMaterial=ig(r,e,t)}return s}_compileMaterial(e){const t=new lt(new Lt,e);this._renderer.compile(t,Hi)}_sceneToCubeUV(e,t,i,s,r){const d=new Bt(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],m=this._renderer,h=m.autoClear,g=m.toneMapping;m.getClearColor(Rc),m.toneMapping=on,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(s),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new si,new Un({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,f=v.material;let p=!1;const y=e.background;y?y.isColor&&(f.color.copy(y),e.background=null,p=!0):(f.color.copy(Rc),p=!0);for(let b=0;b<6;b++){const T=b%3;T===0?(d.up.set(0,l[b],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+u[b],r.y,r.z)):T===1?(d.up.set(0,0,l[b]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+u[b],r.z)):(d.up.set(0,l[b],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+u[b]));const A=this._cubeSize;yi(s,T*A,b>2?A:0,A,A),m.setRenderTarget(s),p&&m.render(v,d),m.render(e,d)}m.toneMapping=g,m.autoClear=h,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ni||e.mapping===Ni;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const d=this._cubeSize;yi(t,0,0,3*d,2*d),i.setRenderTarget(t),i.render(a,Hi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[i];c.material=a;const d=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),m=Math.sqrt(l*l-u*u),h=0+l*1.25,g=m*h,{_lodMax:_}=this,v=this._sizeLods[i],f=3*v*(i>_-In?i-_+In:0),p=4*(this._cubeSize-v);d.envMap.value=e.texture,d.roughness.value=g,d.mipInt.value=_-t,yi(r,f,p,3*v,2*v),s.setRenderTarget(r),s.render(c,Hi),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=_-i,yi(e,f,p,3*v,2*v),s.setRenderTarget(e),s.render(c,Hi)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,c){const d=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const u=3,m=this._lodMeshes[s];m.material=l;const h=l.uniforms,g=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Yn-1),v=r/_,f=isFinite(r)?1+Math.floor(u*v):Yn;f>Yn&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Yn}`);const p=[];let y=0;for(let N=0;N<Yn;++N){const M=N/v,R=Math.exp(-M*M/2);p.push(R),N===0?y+=R:N<f&&(y+=2*R)}for(let N=0;N<p.length;N++)p[N]=p[N]/y;h.envMap.value=e.texture,h.samples.value=f,h.weights.value=p,h.latitudinal.value=a==="latitudinal",c&&(h.poleAxis.value=c);const{_lodMax:b}=this;h.dTheta.value=_,h.mipInt.value=b-i;const T=this._sizeLods[s],A=3*T*(s>b-In?s-b+In:0),S=4*(this._cubeSize-T);yi(t,A,S,3*T,2*T),d.setRenderTarget(t),d.render(m,Hi)}}function ng(n){const e=[],t=[],i=[];let s=n;const r=n-In+1+Ac.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let d=1/c;a>n-In?d=Ac[a-n+In-1]:a===0&&(d=0),t.push(d);const l=1/(c-2),u=-l,m=1+l,h=[u,u,m,u,m,m,u,u,m,m,u,m],g=6,_=6,v=3,f=2,p=1,y=new Float32Array(v*_*g),b=new Float32Array(f*_*g),T=new Float32Array(p*_*g);for(let S=0;S<g;S++){const N=S%3*2/3-1,M=S>2?0:-1,R=[N,M,0,N+2/3,M,0,N+2/3,M+1,0,N,M,0,N+2/3,M+1,0,N,M+1,0];y.set(R,v*_*S),b.set(h,f*_*S);const L=[S,S,S,S,S,S];T.set(L,p*_*S)}const A=new Lt;A.setAttribute("position",new Ut(y,v)),A.setAttribute("uv",new Ut(b,f)),A.setAttribute("faceIndex",new Ut(T,p)),i.push(new lt(A,null)),s>In&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Nc(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yi(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function ig(n,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ar(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function sg(n,e,t){const i=new Float32Array(Yn),s=new J(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ar(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Pc(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ar(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Lc(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ar(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function ar(){return`

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
	`}class ud extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new td(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new si(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:Li(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:Mn});r.uniforms.tEquirect.value=t;const a=new lt(s,r),c=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Nt),new df(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function rg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,g=!1){return h==null?null:g?a(h):r(h)}function r(h){if(h&&h.isTexture){const g=h.mapping;if(g===ur||g===hr)if(e.has(h)){const _=e.get(h).texture;return c(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const v=new ud(_.height);return v.fromEquirectangularTexture(n,h),e.set(h,v),h.addEventListener("dispose",l),c(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const g=h.mapping,_=g===ur||g===hr,v=g===ni||g===Ni;if(_||v){let f=t.get(h);const p=f!==void 0?f.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Cc(n)),f=_?i.fromEquirectangular(h,f):i.fromCubemap(h,f),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),f.texture;if(f!==void 0)return f.texture;{const y=h.image;return _&&y&&y.height>0||v&&y&&d(y)?(i===null&&(i=new Cc(n)),f=_?i.fromEquirectangular(h):i.fromCubemap(h),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),h.addEventListener("dispose",u),f.texture):null}}}return h}function c(h,g){return g===ur?h.mapping=ni:g===hr&&(h.mapping=Ni),h}function d(h){let g=0;const _=6;for(let v=0;v<_;v++)h[v]!==void 0&&g++;return g===_}function l(h){const g=h.target;g.removeEventListener("dispose",l);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function u(h){const g=h.target;g.removeEventListener("dispose",u);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:m}}function ag(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ti("WebGLRenderer: "+i+" extension not supported."),s}}}function og(n,e,t,i){const s={},r=new WeakMap;function a(m){const h=m.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];const g=r.get(h);g&&(e.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(m,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function d(m){const h=m.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER)}function l(m){const h=[],g=m.index,_=m.attributes.position;let v=0;if(_===void 0)return;if(g!==null){const y=g.array;v=g.version;for(let b=0,T=y.length;b<T;b+=3){const A=y[b+0],S=y[b+1],N=y[b+2];h.push(A,S,S,N,N,A)}}else{const y=_.array;v=_.version;for(let b=0,T=y.length/3-1;b<T;b+=3){const A=b+0,S=b+1,N=b+2;h.push(A,S,S,N,N,A)}}const f=new(_.count>=65535?Ql:Jl)(h,1);f.version=v;const p=r.get(m);p&&e.remove(p),r.set(m,f)}function u(m){const h=r.get(m);if(h){const g=m.index;g!==null&&h.version<g.version&&l(m)}else l(m);return r.get(m)}return{get:c,update:d,getWireframeAttribute:u}}function cg(n,e,t){let i;function s(m){i=m}let r,a;function c(m){r=m.type,a=m.bytesPerElement}function d(m,h){n.drawElements(i,h,r,m*a),t.update(h,i,1)}function l(m,h,g){g!==0&&(n.drawElementsInstanced(i,h,r,m*a,g),t.update(h,i,g))}function u(m,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,m,0,g);let v=0;for(let f=0;f<g;f++)v+=h[f];t.update(v,i,1)}this.setMode=s,this.setIndex=c,this.render=d,this.renderInstances=l,this.renderMultiDraw=u}function lg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,c){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function dg(n,e,t){const i=new WeakMap,s=new ut;function r(a,c,d){const l=a.morphTargetInfluences,u=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=u!==void 0?u.length:0;let h=i.get(c);if(h===void 0||h.count!==m){let R=function(){N.dispose(),i.delete(c),c.removeEventListener("dispose",R)};h!==void 0&&h.texture.dispose();const g=c.morphAttributes.position!==void 0,_=c.morphAttributes.normal!==void 0,v=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],y=c.morphAttributes.color||[];let b=0;g===!0&&(b=1),_===!0&&(b=2),v===!0&&(b=3);let T=c.attributes.position.count*b,A=1;T>e.maxTextureSize&&(A=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const S=new Float32Array(T*A*4*m),N=new $l(S,T,A,m);N.type=rn,N.needsUpdate=!0;const M=b*4;for(let L=0;L<m;L++){const I=f[L],B=p[L],K=y[L],O=T*A*4*L;for(let U=0;U<I.count;U++){const W=U*M;g===!0&&(s.fromBufferAttribute(I,U),S[O+W+0]=s.x,S[O+W+1]=s.y,S[O+W+2]=s.z,S[O+W+3]=0),_===!0&&(s.fromBufferAttribute(B,U),S[O+W+4]=s.x,S[O+W+5]=s.y,S[O+W+6]=s.z,S[O+W+7]=0),v===!0&&(s.fromBufferAttribute(K,U),S[O+W+8]=s.x,S[O+W+9]=s.y,S[O+W+10]=s.z,S[O+W+11]=K.itemSize===4?s.w:1)}}h={count:m,texture:N,size:new Ze(T,A)},i.set(c,h),c.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let v=0;v<l.length;v++)g+=l[v];const _=c.morphTargetsRelative?1:1-g;d.getUniforms().setValue(n,"morphTargetBaseInfluence",_),d.getUniforms().setValue(n,"morphTargetInfluences",l)}d.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function ug(n,e,t,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,m=l.geometry,h=e.get(l,m);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",d)===!1&&l.addEventListener("dispose",d),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return h}function c(){r=new WeakMap}function d(l){const u=l.target;u.removeEventListener("dispose",d),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:c}}const hg={[Ll]:"LINEAR_TONE_MAPPING",[Dl]:"REINHARD_TONE_MAPPING",[Il]:"CINEON_TONE_MAPPING",[Ul]:"ACES_FILMIC_TONE_MAPPING",[Ol]:"AGX_TONE_MAPPING",[Bl]:"NEUTRAL_TONE_MAPPING",[Fl]:"CUSTOM_TONE_MAPPING"};function fg(n,e,t,i,s,r){const a=new cn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Pi(e,t):void 0}),c=new cn(e,t,{type:yn,depthBuffer:!1,stencilBuffer:!1}),d=new Lt;d.setAttribute("position",new Tt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Tt([0,2,0,0,2,0],2));const l=new rf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new lt(d,l),m=new od(-1,1,1,-1,0,1);let h=null,g=null,_=!1,v,f=null,p=[],y=!1;this.setSize=function(b,T){a.setSize(b,T),c.setSize(b,T);for(let A=0;A<p.length;A++){const S=p[A];S.setSize&&S.setSize(b,T)}},this.setEffects=function(b){p=b,y=p.length>0&&p[0].isRenderPass===!0;const T=a.width,A=a.height;for(let S=0;S<p.length;S++){const N=p[S];N.setSize&&N.setSize(T,A)}},this.begin=function(b,T){if(_||b.toneMapping===on&&p.length===0)return!1;if(f=T,T!==null){const A=T.width,S=T.height;(a.width!==A||a.height!==S)&&this.setSize(A,S)}return y===!1&&b.setRenderTarget(a),v=b.toneMapping,b.toneMapping=on,!0},this.hasRenderPass=function(){return y},this.end=function(b,T){b.toneMapping=v,_=!0;let A=a,S=c;for(let N=0;N<p.length;N++){const M=p[N];if(M.enabled!==!1&&(M.render(b,S,A,T),M.needsSwap!==!1)){const R=A;A=S,S=R}}if(h!==b.outputColorSpace||g!==b.toneMapping){h=b.outputColorSpace,g=b.toneMapping,l.defines={},$e.getTransfer(h)===et&&(l.defines.SRGB_TRANSFER="");const N=hg[g];N&&(l.defines[N]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(f),b.render(u,m),f=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),d.dispose(),l.dispose()}}const hd=new Pt,Xa=new Pi(1,1),fd=new $l,pd=new Fh,md=new td,Dc=[],Ic=[],Uc=new Float32Array(16),Fc=new Float32Array(9),Oc=new Float32Array(4);function Fi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Dc[s];if(r===void 0&&(r=new Float32Array(s),Dc[s]=r),e!==0){i.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,n[a].toArray(r,c)}return r}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function or(n,e){let t=Ic[e];t===void 0&&(t=new Int32Array(e),Ic[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function _g(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Oc.set(i),n.uniformMatrix2fv(this.addr,!1,Oc),yt(t,i)}}function vg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Fc.set(i),n.uniformMatrix3fv(this.addr,!1,Fc),yt(t,i)}}function Mg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Uc.set(i),n.uniformMatrix4fv(this.addr,!1,Uc),yt(t,i)}}function Sg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function Eg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function Tg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function wg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function Ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function Rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function Cg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Xa.compareFunction=t.isReversedDepthBuffer()?co:oo,r=Xa):r=hd,t.setTexture2D(e||r,s)}function Ng(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||pd,s)}function Pg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||md,s)}function Lg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||fd,s)}function Dg(n){switch(n){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return xg;case 35674:return _g;case 35675:return vg;case 35676:return Mg;case 5124:case 35670:return Sg;case 35667:case 35671:return yg;case 35668:case 35672:return bg;case 35669:case 35673:return Eg;case 5125:return Tg;case 36294:return wg;case 36295:return Ag;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Ng;case 35680:case 36300:case 36308:case 36293:return Pg;case 36289:case 36303:case 36311:case 36292:return Lg}}function Ig(n,e){n.uniform1fv(this.addr,e)}function Ug(n,e){const t=Fi(e,this.size,2);n.uniform2fv(this.addr,t)}function Fg(n,e){const t=Fi(e,this.size,3);n.uniform3fv(this.addr,t)}function Og(n,e){const t=Fi(e,this.size,4);n.uniform4fv(this.addr,t)}function Bg(n,e){const t=Fi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function zg(n,e){const t=Fi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function kg(n,e){const t=Fi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Gg(n,e){n.uniform1iv(this.addr,e)}function Hg(n,e){n.uniform2iv(this.addr,e)}function Vg(n,e){n.uniform3iv(this.addr,e)}function Wg(n,e){n.uniform4iv(this.addr,e)}function jg(n,e){n.uniform1uiv(this.addr,e)}function Xg(n,e){n.uniform2uiv(this.addr,e)}function qg(n,e){n.uniform3uiv(this.addr,e)}function $g(n,e){n.uniform4uiv(this.addr,e)}function Yg(n,e,t){const i=this.cache,s=e.length,r=or(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Xa:a=hd;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Zg(n,e,t){const i=this.cache,s=e.length,r=or(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||pd,r[a])}function Kg(n,e,t){const i=this.cache,s=e.length,r=or(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||md,r[a])}function Jg(n,e,t){const i=this.cache,s=e.length,r=or(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||fd,r[a])}function Qg(n){switch(n){case 5126:return Ig;case 35664:return Ug;case 35665:return Fg;case 35666:return Og;case 35674:return Bg;case 35675:return zg;case 35676:return kg;case 5124:case 35670:return Gg;case 35667:case 35671:return Hg;case 35668:case 35672:return Vg;case 35669:case 35673:return Wg;case 5125:return jg;case 36294:return Xg;case 36295:return qg;case 36296:return $g;case 35678:case 36198:case 36298:case 36306:case 35682:return Yg;case 35679:case 36299:case 36307:return Zg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return Jg}}class e0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Dg(t.type)}}class t0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qg(t.type)}}class n0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const Vr=/(\w+)(\])?(\[|\.)?/g;function Bc(n,e){n.seq.push(e),n.map[e.id]=e}function i0(n,e,t){const i=n.name,s=i.length;for(Vr.lastIndex=0;;){const r=Vr.exec(i),a=Vr.lastIndex;let c=r[1];const d=r[2]==="]",l=r[3];if(d&&(c=c|0),l===void 0||l==="["&&a+2===s){Bc(t,l===void 0?new e0(c,n,e):new t0(c,n,e));break}else{let m=t.map[c];m===void 0&&(m=new n0(c),Bc(t,m)),t=m}}}class Bs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const c=e.getActiveUniform(t,a),d=e.getUniformLocation(t,c.name);i0(c,d,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],d=i[c.id];d.needsUpdate!==!1&&c.setValue(e,d.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function zc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const s0=37297;let r0=0;function a0(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;i.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return i.join(`
`)}const kc=new Oe;function o0(n){$e._getMatrix(kc,$e.workingColorSpace,n);const e=`mat3( ${kc.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case qs:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+a0(n.getShaderSource(e),c)}else return r}function c0(n,e){const t=o0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const l0={[Ll]:"Linear",[Dl]:"Reinhard",[Il]:"Cineon",[Ul]:"ACESFilmic",[Ol]:"AgX",[Bl]:"Neutral",[Fl]:"Custom"};function d0(n,e){const t=l0[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Rs=new J;function u0(){$e.getLuminanceCoefficients(Rs);const n=Rs.x.toFixed(4),e=Rs.y.toFixed(4),t=Rs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qi).join(`
`)}function f0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function p0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:c}}return t}function qi(n){return n!==""}function Hc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const m0=/^[ \t]*#include +<([\w\d./]+)>/gm;function qa(n){return n.replace(m0,x0)}const g0=new Map;function x0(n,e){let t=Ge[e];if(t===void 0){const i=g0.get(e);if(i!==void 0)t=Ge[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qa(t)}const _0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wc(n){return n.replace(_0,v0)}function v0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const M0={[Ds]:"SHADOWMAP_TYPE_PCF",[Xi]:"SHADOWMAP_TYPE_VSM"};function S0(n){return M0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const y0={[ni]:"ENVMAP_TYPE_CUBE",[Ni]:"ENVMAP_TYPE_CUBE",[nr]:"ENVMAP_TYPE_CUBE_UV"};function b0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":y0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const E0={[Ni]:"ENVMAP_MODE_REFRACTION"};function T0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":E0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const w0={[Pl]:"ENVMAP_BLENDING_MULTIPLY",[mh]:"ENVMAP_BLENDING_MIX",[gh]:"ENVMAP_BLENDING_ADD"};function A0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":w0[n.combine]||"ENVMAP_BLENDING_NONE"}function R0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function C0(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const d=S0(t),l=b0(t),u=T0(t),m=A0(t),h=R0(t),g=h0(t),_=f0(r),v=s.createProgram();let f,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qi).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qi).join(`
`),p.length>0&&(p+=`
`)):(f=[jc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qi).join(`
`),p=[jc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+m:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==on?"#define TONE_MAPPING":"",t.toneMapping!==on?Ge.tonemapping_pars_fragment:"",t.toneMapping!==on?d0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,c0("linearToOutputTexel",t.outputColorSpace),u0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qi).join(`
`)),a=qa(a),a=Hc(a,t),a=Vc(a,t),c=qa(c),c=Hc(c,t),c=Vc(c,t),a=Wc(a),c=Wc(c),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",t.glslVersion===tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=y+f+a,T=y+p+c,A=zc(s,s.VERTEX_SHADER,b),S=zc(s,s.FRAGMENT_SHADER,T);s.attachShader(v,A),s.attachShader(v,S),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function N(I){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(v)||"",K=s.getShaderInfoLog(A)||"",O=s.getShaderInfoLog(S)||"",U=B.trim(),W=K.trim(),V=O.trim();let Y=!0,re=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,S);else{const fe=Gc(s,A,"vertex"),pe=Gc(s,S,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+fe+`
`+pe)}else U!==""?Fe("WebGLProgram: Program Info Log:",U):(W===""||V==="")&&(re=!1);re&&(I.diagnostics={runnable:Y,programLog:U,vertexShader:{log:W,prefix:f},fragmentShader:{log:V,prefix:p}})}s.deleteShader(A),s.deleteShader(S),M=new Bs(s,v),R=p0(s,v)}let M;this.getUniforms=function(){return M===void 0&&N(this),M};let R;this.getAttributes=function(){return R===void 0&&N(this),R};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(v,s0)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=S,this}let N0=0;class P0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new L0(e),t.set(e,i)),i}}class L0{constructor(e){this.id=N0++,this.code=e,this.usedTimes=0}}function D0(n){return n===ii||n===Ws||n===js}function I0(n,e,t,i,s,r){const a=new Yl,c=new P0,d=new Set,l=[],u=new Map,m=i.logarithmicDepthBuffer;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return d.add(M),M===0?"uv":`uv${M}`}function v(M,R,L,I,B,K){const O=I.fog,U=B.geometry,W=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,V=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,Y=e.get(M.envMap||W,V),re=Y&&Y.mapping===nr?Y.image.height:null,fe=g[M.type];M.precision!==null&&(h=i.getMaxPrecision(M.precision),h!==M.precision&&Fe("WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const pe=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ee=pe!==void 0?pe.length:0;let He=0;U.morphAttributes.position!==void 0&&(He=1),U.morphAttributes.normal!==void 0&&(He=2),U.morphAttributes.color!==void 0&&(He=3);let Te,Be,j,se;if(fe){const Re=sn[fe];Te=Re.vertexShader,Be=Re.fragmentShader}else{Te=M.vertexShader,Be=M.fragmentShader;const Re=c.getVertexShaderStage(M),pt=c.getFragmentShaderStage(M);c.update(M,Re,pt),j=Re.id,se=pt.id}const $=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Pe=B.isInstancedMesh===!0,Le=B.isBatchedMesh===!0,nt=!!M.map,ke=!!M.matcap,Ke=!!Y,Xe=!!M.aoMap,Ve=!!M.lightMap,ct=!!M.bumpMap&&M.wireframe===!1,dt=!!M.normalMap,ft=!!M.displacementMap,gt=!!M.emissiveMap,rt=!!M.metalnessMap,q=!!M.roughnessMap,C=M.anisotropy>0,ae=M.clearcoat>0,oe=M.dispersion>0,E=M.iridescence>0,x=M.sheen>0,P=M.transmission>0,D=C&&!!M.anisotropyMap,z=ae&&!!M.clearcoatMap,Z=ae&&!!M.clearcoatNormalMap,k=ae&&!!M.clearcoatRoughnessMap,F=E&&!!M.iridescenceMap,G=E&&!!M.iridescenceThicknessMap,ie=x&&!!M.sheenColorMap,ue=x&&!!M.sheenRoughnessMap,le=!!M.specularMap,ce=!!M.specularColorMap,xe=!!M.specularIntensityMap,Se=P&&!!M.transmissionMap,De=P&&!!M.thicknessMap,H=!!M.gradientMap,ge=!!M.alphaMap,de=M.alphaTest>0,me=!!M.alphaHash,be=!!M.extensions;let he=on;M.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(he=n.toneMapping);const Ne={shaderID:fe,shaderType:M.type,shaderName:M.name,vertexShader:Te,fragmentShader:Be,defines:M.defines,customVertexShaderID:j,customFragmentShaderID:se,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:Le,batchingColor:Le&&B._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&B.instanceColor!==null,instancingMorph:Pe&&B.morphTexture!==null,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:nt,matcap:ke,envMap:Ke,envMapMode:Ke&&Y.mapping,envMapCubeUVHeight:re,aoMap:Xe,lightMap:Ve,bumpMap:ct,normalMap:dt,displacementMap:ft,emissiveMap:gt,normalMapObjectSpace:dt&&M.normalMapType===vh,normalMapTangentSpace:dt&&M.normalMapType===Va,packedNormalMap:dt&&M.normalMapType===Va&&D0(M.normalMap.format),metalnessMap:rt,roughnessMap:q,anisotropy:C,anisotropyMap:D,clearcoat:ae,clearcoatMap:z,clearcoatNormalMap:Z,clearcoatRoughnessMap:k,dispersion:oe,iridescence:E,iridescenceMap:F,iridescenceThicknessMap:G,sheen:x,sheenColorMap:ie,sheenRoughnessMap:ue,specularMap:le,specularColorMap:ce,specularIntensityMap:xe,transmission:P,transmissionMap:Se,thicknessMap:De,gradientMap:H,opaque:M.transparent===!1&&M.blending===Ei&&M.alphaToCoverage===!1,alphaMap:ge,alphaTest:de,alphaHash:me,combine:M.combine,mapUv:nt&&_(M.map.channel),aoMapUv:Xe&&_(M.aoMap.channel),lightMapUv:Ve&&_(M.lightMap.channel),bumpMapUv:ct&&_(M.bumpMap.channel),normalMapUv:dt&&_(M.normalMap.channel),displacementMapUv:ft&&_(M.displacementMap.channel),emissiveMapUv:gt&&_(M.emissiveMap.channel),metalnessMapUv:rt&&_(M.metalnessMap.channel),roughnessMapUv:q&&_(M.roughnessMap.channel),anisotropyMapUv:D&&_(M.anisotropyMap.channel),clearcoatMapUv:z&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Z&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:F&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:G&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(M.sheenRoughnessMap.channel),specularMapUv:le&&_(M.specularMap.channel),specularColorMapUv:ce&&_(M.specularColorMap.channel),specularIntensityMapUv:xe&&_(M.specularIntensityMap.channel),transmissionMapUv:Se&&_(M.transmissionMap.channel),thicknessMapUv:De&&_(M.thicknessMap.channel),alphaMapUv:ge&&_(M.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(dt||C),vertexNormals:!!U.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!U.attributes.uv&&(nt||ge),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||U.attributes.normal===void 0&&dt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:Me,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:He,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,decodeVideoTexture:nt&&M.map.isVideoTexture===!0&&$e.getTransfer(M.map.colorSpace)===et,decodeVideoTextureEmissive:gt&&M.emissiveMap.isVideoTexture===!0&&$e.getTransfer(M.emissiveMap.colorSpace)===et,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===xn,flipSided:M.side===zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:be&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&M.extensions.multiDraw===!0||Le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ne.vertexUv1s=d.has(1),Ne.vertexUv2s=d.has(2),Ne.vertexUv3s=d.has(3),d.clear(),Ne}function f(M){const R=[];if(M.shaderID?R.push(M.shaderID):(R.push(M.customVertexShaderID),R.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)R.push(L),R.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(p(R,M),y(R,M),R.push(n.outputColorSpace)),R.push(M.customProgramCacheKey),R.join()}function p(M,R){M.push(R.precision),M.push(R.outputColorSpace),M.push(R.envMapMode),M.push(R.envMapCubeUVHeight),M.push(R.mapUv),M.push(R.alphaMapUv),M.push(R.lightMapUv),M.push(R.aoMapUv),M.push(R.bumpMapUv),M.push(R.normalMapUv),M.push(R.displacementMapUv),M.push(R.emissiveMapUv),M.push(R.metalnessMapUv),M.push(R.roughnessMapUv),M.push(R.anisotropyMapUv),M.push(R.clearcoatMapUv),M.push(R.clearcoatNormalMapUv),M.push(R.clearcoatRoughnessMapUv),M.push(R.iridescenceMapUv),M.push(R.iridescenceThicknessMapUv),M.push(R.sheenColorMapUv),M.push(R.sheenRoughnessMapUv),M.push(R.specularMapUv),M.push(R.specularColorMapUv),M.push(R.specularIntensityMapUv),M.push(R.transmissionMapUv),M.push(R.thicknessMapUv),M.push(R.combine),M.push(R.fogExp2),M.push(R.sizeAttenuation),M.push(R.morphTargetsCount),M.push(R.morphAttributeCount),M.push(R.numDirLights),M.push(R.numPointLights),M.push(R.numSpotLights),M.push(R.numSpotLightMaps),M.push(R.numHemiLights),M.push(R.numRectAreaLights),M.push(R.numDirLightShadows),M.push(R.numPointLightShadows),M.push(R.numSpotLightShadows),M.push(R.numSpotLightShadowsWithMaps),M.push(R.numLightProbes),M.push(R.shadowMapType),M.push(R.toneMapping),M.push(R.numClippingPlanes),M.push(R.numClipIntersection),M.push(R.depthPacking)}function y(M,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function b(M){const R=g[M.type];let L;if(R){const I=sn[R];L=tf.clone(I.uniforms)}else L=M.uniforms;return L}function T(M,R){let L=u.get(R);return L!==void 0?++L.usedTimes:(L=new C0(n,R,M,s),l.push(L),u.set(R,L)),L}function A(M){if(--M.usedTimes===0){const R=l.indexOf(M);l[R]=l[l.length-1],l.pop(),u.delete(M.cacheKey),M.destroy()}}function S(M){c.remove(M)}function N(){c.dispose()}return{getParameters:v,getProgramCacheKey:f,getUniforms:b,acquireProgram:T,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:N}}function U0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let c=n.get(a);return c===void 0&&(c={},n.set(a,c)),c}function i(a){n.delete(a)}function s(a,c,d){n.get(a)[c]=d}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function F0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Xc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function c(h,g,_,v,f,p){let y=n[e];return y===void 0?(y={id:h.id,object:h,geometry:g,material:_,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:f,group:p},n[e]=y):(y.id=h.id,y.object=h,y.geometry=g,y.material=_,y.materialVariant=a(h),y.groupOrder=v,y.renderOrder=h.renderOrder,y.z=f,y.group=p),e++,y}function d(h,g,_,v,f,p){const y=c(h,g,_,v,f,p);_.transmission>0?i.push(y):_.transparent===!0?s.push(y):t.push(y)}function l(h,g,_,v,f,p){const y=c(h,g,_,v,f,p);_.transmission>0?i.unshift(y):_.transparent===!0?s.unshift(y):t.unshift(y)}function u(h,g,_){t.length>1&&t.sort(h||F0),i.length>1&&i.sort(g||Xc),s.length>1&&s.sort(g||Xc),_&&(t.reverse(),i.reverse(),s.reverse())}function m(){for(let h=e,g=n.length;h<g;h++){const _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:d,unshift:l,finish:m,sort:u}}function O0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new qc,n.set(i,[a])):s>=r.length?(a=new qc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function B0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new qe};break;case"SpotLight":t={position:new J,direction:new J,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function z0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let k0=0;function G0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function H0(n){const e=new B0,t=z0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new J);const s=new J,r=new ht,a=new ht;function c(l){let u=0,m=0,h=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let g=0,_=0,v=0,f=0,p=0,y=0,b=0,T=0,A=0,S=0,N=0;l.sort(G0);for(let R=0,L=l.length;R<L;R++){const I=l[R],B=I.color,K=I.intensity,O=I.distance;let U=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ii?U=I.shadow.map.texture:U=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=B.r*K,m+=B.g*K,h+=B.b*K;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],K);N++}else if(I.isDirectionalLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,Y=t.get(I);Y.shadowIntensity=V.intensity,Y.shadowBias=V.bias,Y.shadowNormalBias=V.normalBias,Y.shadowRadius=V.radius,Y.shadowMapSize=V.mapSize,i.directionalShadow[g]=Y,i.directionalShadowMap[g]=U,i.directionalShadowMatrix[g]=I.shadow.matrix,y++}i.directional[g]=W,g++}else if(I.isSpotLight){const W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(B).multiplyScalar(K),W.distance=O,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[v]=W;const V=I.shadow;if(I.map&&(i.spotLightMap[A]=I.map,A++,V.updateMatrices(I),I.castShadow&&S++),i.spotLightMatrix[v]=V.matrix,I.castShadow){const Y=t.get(I);Y.shadowIntensity=V.intensity,Y.shadowBias=V.bias,Y.shadowNormalBias=V.normalBias,Y.shadowRadius=V.radius,Y.shadowMapSize=V.mapSize,i.spotShadow[v]=Y,i.spotShadowMap[v]=U,T++}v++}else if(I.isRectAreaLight){const W=e.get(I);W.color.copy(B).multiplyScalar(K),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[f]=W,f++}else if(I.isPointLight){const W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const V=I.shadow,Y=t.get(I);Y.shadowIntensity=V.intensity,Y.shadowBias=V.bias,Y.shadowNormalBias=V.normalBias,Y.shadowRadius=V.radius,Y.shadowMapSize=V.mapSize,Y.shadowCameraNear=V.camera.near,Y.shadowCameraFar=V.camera.far,i.pointShadow[_]=Y,i.pointShadowMap[_]=U,i.pointShadowMatrix[_]=I.shadow.matrix,b++}i.point[_]=W,_++}else if(I.isHemisphereLight){const W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(K),W.groundColor.copy(I.groundColor).multiplyScalar(K),i.hemi[p]=W,p++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=m,i.ambient[2]=h;const M=i.hash;(M.directionalLength!==g||M.pointLength!==_||M.spotLength!==v||M.rectAreaLength!==f||M.hemiLength!==p||M.numDirectionalShadows!==y||M.numPointShadows!==b||M.numSpotShadows!==T||M.numSpotMaps!==A||M.numLightProbes!==N)&&(i.directional.length=g,i.spot.length=v,i.rectArea.length=f,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=T+A-S,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=N,M.directionalLength=g,M.pointLength=_,M.spotLength=v,M.rectAreaLength=f,M.hemiLength=p,M.numDirectionalShadows=y,M.numPointShadows=b,M.numSpotShadows=T,M.numSpotMaps=A,M.numLightProbes=N,i.version=k0++)}function d(l,u){let m=0,h=0,g=0,_=0,v=0;const f=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const b=l[p];if(b.isDirectionalLight){const T=i.directional[m];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),m++}else if(b.isSpotLight){const T=i.spot[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),g++}else if(b.isRectAreaLight){const T=i.rectArea[_];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),a.identity(),r.copy(b.matrixWorld),r.premultiply(f),a.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const T=i.point[h];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),h++}else if(b.isHemisphereLight){const T=i.hemi[v];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(f),v++}}}return{setup:c,setupView:d,state:i}}function $c(n){const e=new H0(n),t=[],i=[],s=[];function r(h){m.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function c(h){i.push(h)}function d(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const m={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:m,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:c,pushLightProbeGrid:d}}function V0(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new $c(n),e.set(s,[c])):r>=a.length?(c=new $c(n),a.push(c)):c=a[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const W0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j0=`uniform sampler2D shadow_pass;
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
}`,X0=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],q0=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Yc=new ht,Vi=new J,Wr=new J;function $0(n,e,t){let i=new uo;const s=new Ze,r=new Ze,a=new ut,c=new af,d=new of,l={},u=t.maxTextureSize,m={[On]:zt,[zt]:On,[xn]:xn},h=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:W0,fragmentShader:j0}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const _=new Lt;_.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new lt(_,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ds;let p=this.type;this.render=function(S,N,M){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||S.length===0)return;this.type===Zu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ds);const R=n.getRenderTarget(),L=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Mn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const K=p!==this.type;K&&N.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(U=>U.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,U=S.length;O<U;O++){const W=S[O],V=W.shadow;if(V===void 0){Fe("WebGLShadowMap:",W,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const Y=V.getFrameExtents();s.multiply(Y),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Y.x),s.x=r.x*Y.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Y.y),s.y=r.y*Y.y,V.mapSize.y=r.y));const re=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=re,V.map===null||K===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Xi){if(W.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new cn(s.x,s.y,{format:ii,type:yn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),V.map.texture.name=W.name+".shadowMap",V.map.depthTexture=new Pi(s.x,s.y,rn),V.map.depthTexture.name=W.name+".shadowMapDepth",V.map.depthTexture.format=bn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=wt,V.map.depthTexture.magFilter=wt}else W.isPointLight?(V.map=new ud(s.x),V.map.depthTexture=new Qh(s.x,ln)):(V.map=new cn(s.x,s.y),V.map.depthTexture=new Pi(s.x,s.y,ln)),V.map.depthTexture.name=W.name+".shadowMap",V.map.depthTexture.format=bn,this.type===Ds?(V.map.depthTexture.compareFunction=re?co:oo,V.map.depthTexture.minFilter=Nt,V.map.depthTexture.magFilter=Nt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=wt,V.map.depthTexture.magFilter=wt);V.camera.updateProjectionMatrix()}const fe=V.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<fe;pe++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(V.map),n.clear());const Ee=V.getViewport(pe);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),B.viewport(a)}if(W.isPointLight){const Ee=V.camera,He=V.matrix,Te=W.distance||Ee.far;Te!==Ee.far&&(Ee.far=Te,Ee.updateProjectionMatrix()),Vi.setFromMatrixPosition(W.matrixWorld),Ee.position.copy(Vi),Wr.copy(Ee.position),Wr.add(X0[pe]),Ee.up.copy(q0[pe]),Ee.lookAt(Wr),Ee.updateMatrixWorld(),He.makeTranslation(-Vi.x,-Vi.y,-Vi.z),Yc.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Yc,Ee.coordinateSystem,Ee.reversedDepth)}else V.updateMatrices(W);i=V.getFrustum(),T(N,M,V.camera,W,this.type)}V.isPointLightShadow!==!0&&this.type===Xi&&y(V,M),V.needsUpdate=!1}p=this.type,f.needsUpdate=!1,n.setRenderTarget(R,L,I)};function y(S,N){const M=e.update(v);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,g.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new cn(s.x,s.y,{format:ii,type:yn})),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(N,null,M,h,v,null),g.uniforms.shadow_pass.value=S.mapPass.texture,g.uniforms.resolution.value=S.mapSize,g.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(N,null,M,g,v,null)}function b(S,N,M,R){let L=null;const I=M.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)L=I;else if(L=M.isPointLight===!0?d:c,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const B=L.uuid,K=N.uuid;let O=l[B];O===void 0&&(O={},l[B]=O);let U=O[K];U===void 0&&(U=L.clone(),O[K]=U,N.addEventListener("dispose",A)),L=U}if(L.visible=N.visible,L.wireframe=N.wireframe,R===Xi?L.side=N.shadowSide!==null?N.shadowSide:N.side:L.side=N.shadowSide!==null?N.shadowSide:m[N.side],L.alphaMap=N.alphaMap,L.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,L.map=N.map,L.clipShadows=N.clipShadows,L.clippingPlanes=N.clippingPlanes,L.clipIntersection=N.clipIntersection,L.displacementMap=N.displacementMap,L.displacementScale=N.displacementScale,L.displacementBias=N.displacementBias,L.wireframeLinewidth=N.wireframeLinewidth,L.linewidth=N.linewidth,M.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const B=n.properties.get(L);B.light=M}return L}function T(S,N,M,R,L){if(S.visible===!1)return;if(S.layers.test(N.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&L===Xi)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,S.matrixWorld);const K=e.update(S),O=S.material;if(Array.isArray(O)){const U=K.groups;for(let W=0,V=U.length;W<V;W++){const Y=U[W],re=O[Y.materialIndex];if(re&&re.visible){const fe=b(S,re,R,L);S.onBeforeShadow(n,S,N,M,K,fe,Y),n.renderBufferDirect(M,null,K,fe,S,Y),S.onAfterShadow(n,S,N,M,K,fe,Y)}}}else if(O.visible){const U=b(S,O,R,L);S.onBeforeShadow(n,S,N,M,K,U,null),n.renderBufferDirect(M,null,K,U,S,null),S.onAfterShadow(n,S,N,M,K,U,null)}}const B=S.children;for(let K=0,O=B.length;K<O;K++)T(B[K],N,M,R,L)}function A(S){S.target.removeEventListener("dispose",A);for(const M in l){const R=l[M],L=S.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function Y0(n,e){function t(){let H=!1;const ge=new ut;let de=null;const me=new ut(0,0,0,0);return{setMask:function(be){de!==be&&!H&&(n.colorMask(be,be,be,be),de=be)},setLocked:function(be){H=be},setClear:function(be,he,Ne,Re,pt){pt===!0&&(be*=Re,he*=Re,Ne*=Re),ge.set(be,he,Ne,Re),me.equals(ge)===!1&&(n.clearColor(be,he,Ne,Re),me.copy(ge))},reset:function(){H=!1,de=null,me.set(-1,0,0,0)}}}function i(){let H=!1,ge=!1,de=null,me=null,be=null;return{setReversed:function(he){if(ge!==he){const Ne=e.get("EXT_clip_control");he?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ge=he;const Re=be;be=null,this.setClear(Re)}},getReversed:function(){return ge},setTest:function(he){he?$(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(he){de!==he&&!H&&(n.depthMask(he),de=he)},setFunc:function(he){if(ge&&(he=Ch[he]),me!==he){switch(he){case sa:n.depthFunc(n.NEVER);break;case ra:n.depthFunc(n.ALWAYS);break;case aa:n.depthFunc(n.LESS);break;case Ci:n.depthFunc(n.LEQUAL);break;case oa:n.depthFunc(n.EQUAL);break;case ca:n.depthFunc(n.GEQUAL);break;case la:n.depthFunc(n.GREATER);break;case da:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=he}},setLocked:function(he){H=he},setClear:function(he){be!==he&&(be=he,ge&&(he=1-he),n.clearDepth(he))},reset:function(){H=!1,de=null,me=null,be=null,ge=!1}}}function s(){let H=!1,ge=null,de=null,me=null,be=null,he=null,Ne=null,Re=null,pt=null;return{setTest:function(at){H||(at?$(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(at){ge!==at&&!H&&(n.stencilMask(at),ge=at)},setFunc:function(at,Jt,Qt){(de!==at||me!==Jt||be!==Qt)&&(n.stencilFunc(at,Jt,Qt),de=at,me=Jt,be=Qt)},setOp:function(at,Jt,Qt){(he!==at||Ne!==Jt||Re!==Qt)&&(n.stencilOp(at,Jt,Qt),he=at,Ne=Jt,Re=Qt)},setLocked:function(at){H=at},setClear:function(at){pt!==at&&(n.clearStencil(at),pt=at)},reset:function(){H=!1,ge=null,de=null,me=null,be=null,he=null,Ne=null,Re=null,pt=null}}}const r=new t,a=new i,c=new s,d=new WeakMap,l=new WeakMap;let u={},m={},h={},g=new WeakMap,_=[],v=null,f=!1,p=null,y=null,b=null,T=null,A=null,S=null,N=null,M=new qe(0,0,0),R=0,L=!1,I=null,B=null,K=null,O=null,U=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Y=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(re)[1]),V=Y>=1):re.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),V=Y>=2);let fe=null,pe={};const Ee=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),Te=new ut().fromArray(Ee),Be=new ut().fromArray(He);function j(H,ge,de,me){const be=new Uint8Array(4),he=n.createTexture();n.bindTexture(H,he),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<de;Ne++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,be):n.texImage2D(ge+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,be);return he}const se={};se[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),$(n.DEPTH_TEST),a.setFunc(Ci),ct(!1),dt(Zo),$(n.CULL_FACE),Xe(Mn);function $(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function Me(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function Pe(H,ge){return h[H]!==ge?(n.bindFramebuffer(H,ge),h[H]=ge,H===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ge),H===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Le(H,ge){let de=_,me=!1;if(H){de=g.get(ge),de===void 0&&(de=[],g.set(ge,de));const be=H.textures;if(de.length!==be.length||de[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Ne=be.length;he<Ne;he++)de[he]=n.COLOR_ATTACHMENT0+he;de.length=be.length,me=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,me=!0);me&&n.drawBuffers(de)}function nt(H){return v!==H?(n.useProgram(H),v=H,!0):!1}const ke={[$n]:n.FUNC_ADD,[Ju]:n.FUNC_SUBTRACT,[Qu]:n.FUNC_REVERSE_SUBTRACT};ke[eh]=n.MIN,ke[th]=n.MAX;const Ke={[nh]:n.ZERO,[ih]:n.ONE,[sh]:n.SRC_COLOR,[na]:n.SRC_ALPHA,[dh]:n.SRC_ALPHA_SATURATE,[ch]:n.DST_COLOR,[ah]:n.DST_ALPHA,[rh]:n.ONE_MINUS_SRC_COLOR,[ia]:n.ONE_MINUS_SRC_ALPHA,[lh]:n.ONE_MINUS_DST_COLOR,[oh]:n.ONE_MINUS_DST_ALPHA,[uh]:n.CONSTANT_COLOR,[hh]:n.ONE_MINUS_CONSTANT_COLOR,[fh]:n.CONSTANT_ALPHA,[ph]:n.ONE_MINUS_CONSTANT_ALPHA};function Xe(H,ge,de,me,be,he,Ne,Re,pt,at){if(H===Mn){f===!0&&(Me(n.BLEND),f=!1);return}if(f===!1&&($(n.BLEND),f=!0),H!==Ku){if(H!==p||at!==L){if((y!==$n||A!==$n)&&(n.blendEquation(n.FUNC_ADD),y=$n,A=$n),at)switch(H){case Ei:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ti:n.blendFunc(n.ONE,n.ONE);break;case Ko:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",H);break}else switch(H){case Ei:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ti:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ko:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",H);break}b=null,T=null,S=null,N=null,M.set(0,0,0),R=0,p=H,L=at}return}be=be||ge,he=he||de,Ne=Ne||me,(ge!==y||be!==A)&&(n.blendEquationSeparate(ke[ge],ke[be]),y=ge,A=be),(de!==b||me!==T||he!==S||Ne!==N)&&(n.blendFuncSeparate(Ke[de],Ke[me],Ke[he],Ke[Ne]),b=de,T=me,S=he,N=Ne),(Re.equals(M)===!1||pt!==R)&&(n.blendColor(Re.r,Re.g,Re.b,pt),M.copy(Re),R=pt),p=H,L=!1}function Ve(H,ge){H.side===xn?Me(n.CULL_FACE):$(n.CULL_FACE);let de=H.side===zt;ge&&(de=!de),ct(de),H.blending===Ei&&H.transparent===!1?Xe(Mn):Xe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);const me=H.stencilWrite;c.setTest(me),me&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),gt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ct(H){I!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),I=H)}function dt(H){H!==$u?($(n.CULL_FACE),H!==B&&(H===Zo?n.cullFace(n.BACK):H===Yu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),B=H}function ft(H){H!==K&&(V&&n.lineWidth(H),K=H)}function gt(H,ge,de){H?($(n.POLYGON_OFFSET_FILL),(O!==ge||U!==de)&&(O=ge,U=de,a.getReversed()&&(ge=-ge),n.polygonOffset(ge,de))):Me(n.POLYGON_OFFSET_FILL)}function rt(H){H?$(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function q(H){H===void 0&&(H=n.TEXTURE0+W-1),fe!==H&&(n.activeTexture(H),fe=H)}function C(H,ge,de){de===void 0&&(fe===null?de=n.TEXTURE0+W-1:de=fe);let me=pe[de];me===void 0&&(me={type:void 0,texture:void 0},pe[de]=me),(me.type!==H||me.texture!==ge)&&(fe!==de&&(n.activeTexture(de),fe=de),n.bindTexture(H,ge||se[H]),me.type=H,me.texture=ge)}function ae(){const H=pe[fe];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function oe(){try{n.compressedTexImage2D(...arguments)}catch(H){Qe("WebGLState:",H)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(H){Qe("WebGLState:",H)}}function x(){try{n.texSubImage2D(...arguments)}catch(H){Qe("WebGLState:",H)}}function P(){try{n.texSubImage3D(...arguments)}catch(H){Qe("WebGLState:",H)}}function D(){try{n.compressedTexSubImage2D(...arguments)}catch(H){Qe("WebGLState:",H)}}function z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){Qe("WebGLState:",H)}}function Z(){try{n.texStorage2D(...arguments)}catch(H){Qe("WebGLState:",H)}}function k(){try{n.texStorage3D(...arguments)}catch(H){Qe("WebGLState:",H)}}function F(){try{n.texImage2D(...arguments)}catch(H){Qe("WebGLState:",H)}}function G(){try{n.texImage3D(...arguments)}catch(H){Qe("WebGLState:",H)}}function ie(H){return m[H]!==void 0?m[H]:n.getParameter(H)}function ue(H,ge){m[H]!==ge&&(n.pixelStorei(H,ge),m[H]=ge)}function le(H){Te.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Te.copy(H))}function ce(H){Be.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Be.copy(H))}function xe(H,ge){let de=l.get(ge);de===void 0&&(de=new WeakMap,l.set(ge,de));let me=de.get(H);me===void 0&&(me=n.getUniformBlockIndex(ge,H.name),de.set(H,me))}function Se(H,ge){const me=l.get(ge).get(H);d.get(ge)!==me&&(n.uniformBlockBinding(ge,me,H.__bindingPointIndex),d.set(ge,me))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},m={},fe=null,pe={},h={},g=new WeakMap,_=[],v=null,f=!1,p=null,y=null,b=null,T=null,A=null,S=null,N=null,M=new qe(0,0,0),R=0,L=!1,I=null,B=null,K=null,O=null,U=null,Te.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:$,disable:Me,bindFramebuffer:Pe,drawBuffers:Le,useProgram:nt,setBlending:Xe,setMaterial:Ve,setFlipSided:ct,setCullFace:dt,setLineWidth:ft,setPolygonOffset:gt,setScissorTest:rt,activeTexture:q,bindTexture:C,unbindTexture:ae,compressedTexImage2D:oe,compressedTexImage3D:E,texImage2D:F,texImage3D:G,pixelStorei:ue,getParameter:ie,updateUBOMapping:xe,uniformBlockBinding:Se,texStorage2D:Z,texStorage3D:k,texSubImage2D:x,texSubImage3D:P,compressedTexSubImage2D:D,compressedTexSubImage3D:z,scissor:le,viewport:ce,reset:De}}function Z0(n,e,t,i,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ze,u=new WeakMap,m=new Set;let h;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,x){return _?new OffscreenCanvas(E,x):$s("canvas")}function f(E,x,P){let D=1;const z=oe(E);if((z.width>P||z.height>P)&&(D=P/Math.max(z.width,z.height)),D<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Z=Math.floor(D*z.width),k=Math.floor(D*z.height);h===void 0&&(h=v(Z,k));const F=x?v(Z,k):h;return F.width=Z,F.height=k,F.getContext("2d").drawImage(E,0,0,Z,k),Fe("WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+Z+"x"+k+")."),F}else return"data"in E&&Fe("WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),E;return E}function p(E){return E.generateMipmaps}function y(E){n.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(E,x,P,D,z,Z=!1){if(E!==null){if(n[E]!==void 0)return n[E];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let k;D&&(k=e.get("EXT_texture_norm16"),k||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let F=x;if(x===n.RED&&(P===n.FLOAT&&(F=n.R32F),P===n.HALF_FLOAT&&(F=n.R16F),P===n.UNSIGNED_BYTE&&(F=n.R8),P===n.UNSIGNED_SHORT&&k&&(F=k.R16_EXT),P===n.SHORT&&k&&(F=k.R16_SNORM_EXT)),x===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.R8UI),P===n.UNSIGNED_SHORT&&(F=n.R16UI),P===n.UNSIGNED_INT&&(F=n.R32UI),P===n.BYTE&&(F=n.R8I),P===n.SHORT&&(F=n.R16I),P===n.INT&&(F=n.R32I)),x===n.RG&&(P===n.FLOAT&&(F=n.RG32F),P===n.HALF_FLOAT&&(F=n.RG16F),P===n.UNSIGNED_BYTE&&(F=n.RG8),P===n.UNSIGNED_SHORT&&k&&(F=k.RG16_EXT),P===n.SHORT&&k&&(F=k.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.RG8UI),P===n.UNSIGNED_SHORT&&(F=n.RG16UI),P===n.UNSIGNED_INT&&(F=n.RG32UI),P===n.BYTE&&(F=n.RG8I),P===n.SHORT&&(F=n.RG16I),P===n.INT&&(F=n.RG32I)),x===n.RGB_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.RGB8UI),P===n.UNSIGNED_SHORT&&(F=n.RGB16UI),P===n.UNSIGNED_INT&&(F=n.RGB32UI),P===n.BYTE&&(F=n.RGB8I),P===n.SHORT&&(F=n.RGB16I),P===n.INT&&(F=n.RGB32I)),x===n.RGBA_INTEGER&&(P===n.UNSIGNED_BYTE&&(F=n.RGBA8UI),P===n.UNSIGNED_SHORT&&(F=n.RGBA16UI),P===n.UNSIGNED_INT&&(F=n.RGBA32UI),P===n.BYTE&&(F=n.RGBA8I),P===n.SHORT&&(F=n.RGBA16I),P===n.INT&&(F=n.RGBA32I)),x===n.RGB&&(P===n.UNSIGNED_SHORT&&k&&(F=k.RGB16_EXT),P===n.SHORT&&k&&(F=k.RGB16_SNORM_EXT),P===n.UNSIGNED_INT_5_9_9_9_REV&&(F=n.RGB9_E5),P===n.UNSIGNED_INT_10F_11F_11F_REV&&(F=n.R11F_G11F_B10F)),x===n.RGBA){const G=Z?qs:$e.getTransfer(z);P===n.FLOAT&&(F=n.RGBA32F),P===n.HALF_FLOAT&&(F=n.RGBA16F),P===n.UNSIGNED_BYTE&&(F=G===et?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT&&k&&(F=k.RGBA16_EXT),P===n.SHORT&&k&&(F=k.RGBA16_SNORM_EXT),P===n.UNSIGNED_SHORT_4_4_4_4&&(F=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(F=n.RGB5_A1)}return(F===n.R16F||F===n.R32F||F===n.RG16F||F===n.RG32F||F===n.RGBA16F||F===n.RGBA32F)&&e.get("EXT_color_buffer_float"),F}function A(E,x){let P;return E?x===null||x===ln||x===Ki?P=n.DEPTH24_STENCIL8:x===rn?P=n.DEPTH32F_STENCIL8:x===Zi&&(P=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ln||x===Ki?P=n.DEPTH_COMPONENT24:x===rn?P=n.DEPTH_COMPONENT32F:x===Zi&&(P=n.DEPTH_COMPONENT16),P}function S(E,x){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==wt&&E.minFilter!==Nt?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function N(E){const x=E.target;x.removeEventListener("dispose",N),R(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&m.delete(x)}function M(E){const x=E.target;x.removeEventListener("dispose",M),I(x)}function R(E){const x=i.get(E);if(x.__webglInit===void 0)return;const P=E.source,D=g.get(P);if(D){const z=D[x.__cacheKey];z.usedTimes--,z.usedTimes===0&&L(E),Object.keys(D).length===0&&g.delete(P)}i.remove(E)}function L(E){const x=i.get(E);n.deleteTexture(x.__webglTexture);const P=E.source,D=g.get(P);delete D[x.__cacheKey],a.memory.textures--}function I(E){const x=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let D=0;D<6;D++){if(Array.isArray(x.__webglFramebuffer[D]))for(let z=0;z<x.__webglFramebuffer[D].length;z++)n.deleteFramebuffer(x.__webglFramebuffer[D][z]);else n.deleteFramebuffer(x.__webglFramebuffer[D]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[D])}else{if(Array.isArray(x.__webglFramebuffer))for(let D=0;D<x.__webglFramebuffer.length;D++)n.deleteFramebuffer(x.__webglFramebuffer[D]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let D=0;D<x.__webglColorRenderbuffer.length;D++)x.__webglColorRenderbuffer[D]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[D]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const P=E.textures;for(let D=0,z=P.length;D<z;D++){const Z=i.get(P[D]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),a.memory.textures--),i.remove(P[D])}i.remove(E)}let B=0;function K(){B=0}function O(){return B}function U(E){B=E}function W(){const E=B;return E>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),B+=1,E}function V(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function Y(E,x){const P=i.get(E);if(E.isVideoTexture&&C(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&P.__version!==E.version){const D=E.image;if(D===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(D.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(P,E,x);return}}else E.isExternalTexture&&(P.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+x)}function re(E,x){const P=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&P.__version!==E.version){Me(P,E,x);return}else E.isExternalTexture&&(P.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+x)}function fe(E,x){const P=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&P.__version!==E.version){Me(P,E,x);return}t.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+x)}function pe(E,x){const P=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&P.__version!==E.version){Pe(P,E,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+x)}const Ee={[ua]:n.REPEAT,[_n]:n.CLAMP_TO_EDGE,[ha]:n.MIRRORED_REPEAT},He={[wt]:n.NEAREST,[xh]:n.NEAREST_MIPMAP_NEAREST,[rs]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[fr]:n.LINEAR_MIPMAP_NEAREST,[Zn]:n.LINEAR_MIPMAP_LINEAR},Te={[Mh]:n.NEVER,[Th]:n.ALWAYS,[Sh]:n.LESS,[oo]:n.LEQUAL,[yh]:n.EQUAL,[co]:n.GEQUAL,[bh]:n.GREATER,[Eh]:n.NOTEQUAL};function Be(E,x){if(x.type===rn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Nt||x.magFilter===fr||x.magFilter===rs||x.magFilter===Zn||x.minFilter===Nt||x.minFilter===fr||x.minFilter===rs||x.minFilter===Zn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Ee[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Ee[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Ee[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,He[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,He[x.minFilter]),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Te[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===wt||x.minFilter!==rs&&x.minFilter!==Zn||x.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const P=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function j(E,x){let P=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",N));const D=x.source;let z=g.get(D);z===void 0&&(z={},g.set(D,z));const Z=V(x);if(Z!==E.__cacheKey){z[Z]===void 0&&(z[Z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,P=!0),z[Z].usedTimes++;const k=z[E.__cacheKey];k!==void 0&&(z[E.__cacheKey].usedTimes--,k.usedTimes===0&&L(x)),E.__cacheKey=Z,E.__webglTexture=z[Z].texture}return P}function se(E,x,P){return Math.floor(Math.floor(E/P)/x)}function $(E,x,P,D){const Z=E.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,P,D,x.data);else{Z.sort((ue,le)=>ue.start-le.start);let k=0;for(let ue=1;ue<Z.length;ue++){const le=Z[k],ce=Z[ue],xe=le.start+le.count,Se=se(ce.start,x.width,4),De=se(le.start,x.width,4);ce.start<=xe+1&&Se===De&&se(ce.start+ce.count-1,x.width,4)===Se?le.count=Math.max(le.count,ce.start+ce.count-le.start):(++k,Z[k]=ce)}Z.length=k+1;const F=t.getParameter(n.UNPACK_ROW_LENGTH),G=t.getParameter(n.UNPACK_SKIP_PIXELS),ie=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ue=0,le=Z.length;ue<le;ue++){const ce=Z[ue],xe=Math.floor(ce.start/4),Se=Math.ceil(ce.count/4),De=xe%x.width,H=Math.floor(xe/x.width),ge=Se,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,De,H,ge,de,P,D,x.data)}E.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,F),t.pixelStorei(n.UNPACK_SKIP_PIXELS,G),t.pixelStorei(n.UNPACK_SKIP_ROWS,ie)}}function Me(E,x,P){let D=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(D=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(D=n.TEXTURE_3D);const z=j(E,x),Z=x.source;t.bindTexture(D,E.__webglTexture,n.TEXTURE0+P);const k=i.get(Z);if(Z.version!==k.__version||z===!0){if(t.activeTexture(n.TEXTURE0+P),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const de=$e.getPrimaries($e.workingColorSpace),me=x.colorSpace===Dn?null:$e.getPrimaries(x.colorSpace),be=x.colorSpace===Dn||de===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let G=f(x.image,!1,s.maxTextureSize);G=ae(x,G);const ie=r.convert(x.format,x.colorSpace),ue=r.convert(x.type);let le=T(x.internalFormat,ie,ue,x.normalized,x.colorSpace,x.isVideoTexture);Be(D,x);let ce;const xe=x.mipmaps,Se=x.isVideoTexture!==!0,De=k.__version===void 0||z===!0,H=Z.dataReady,ge=S(x,G);if(x.isDepthTexture)le=A(x.format===Kn,x.type),De&&(Se?t.texStorage2D(n.TEXTURE_2D,1,le,G.width,G.height):t.texImage2D(n.TEXTURE_2D,0,le,G.width,G.height,0,ie,ue,null));else if(x.isDataTexture)if(xe.length>0){Se&&De&&t.texStorage2D(n.TEXTURE_2D,ge,le,xe[0].width,xe[0].height);for(let de=0,me=xe.length;de<me;de++)ce=xe[de],Se?H&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,ie,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ie,ue,ce.data);x.generateMipmaps=!1}else Se?(De&&t.texStorage2D(n.TEXTURE_2D,ge,le,G.width,G.height),H&&$(x,G,ie,ue)):t.texImage2D(n.TEXTURE_2D,0,le,G.width,G.height,0,ie,ue,G.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Se&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,le,xe[0].width,xe[0].height,G.depth);for(let de=0,me=xe.length;de<me;de++)if(ce=xe[de],x.format!==Kt)if(ie!==null)if(Se){if(H)if(x.layerUpdates.size>0){const be=wc(ce.width,ce.height,x.format,x.type);for(const he of x.layerUpdates){const Ne=ce.data.subarray(he*be/ce.data.BYTES_PER_ELEMENT,(he+1)*be/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,he,ce.width,ce.height,1,ie,Ne)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,G.depth,ie,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,G.depth,0,ce.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,G.depth,ie,ue,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,G.depth,0,ie,ue,ce.data)}else{Se&&De&&t.texStorage2D(n.TEXTURE_2D,ge,le,xe[0].width,xe[0].height);for(let de=0,me=xe.length;de<me;de++)ce=xe[de],x.format!==Kt?ie!==null?Se?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,ie,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ce.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?H&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,ie,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ie,ue,ce.data)}else if(x.isDataArrayTexture)if(Se){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,le,G.width,G.height,G.depth),H)if(x.layerUpdates.size>0){const de=wc(G.width,G.height,x.format,x.type);for(const me of x.layerUpdates){const be=G.data.subarray(me*de/G.data.BYTES_PER_ELEMENT,(me+1)*de/G.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,G.width,G.height,1,ie,ue,be)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,ie,ue,G.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,G.width,G.height,G.depth,0,ie,ue,G.data);else if(x.isData3DTexture)Se?(De&&t.texStorage3D(n.TEXTURE_3D,ge,le,G.width,G.height,G.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,ie,ue,G.data)):t.texImage3D(n.TEXTURE_3D,0,le,G.width,G.height,G.depth,0,ie,ue,G.data);else if(x.isFramebufferTexture){if(De)if(Se)t.texStorage2D(n.TEXTURE_2D,ge,le,G.width,G.height);else{let de=G.width,me=G.height;for(let be=0;be<ge;be++)t.texImage2D(n.TEXTURE_2D,be,le,de,me,0,ie,ue,null),de>>=1,me>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),G.parentNode!==de){de.appendChild(G),m.add(x),de.onpaint=me=>{const be=me.changedElements;for(const he of m)be.includes(he.image)&&(he.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,G);else{const be=n.RGBA,he=n.RGBA,Ne=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,be,he,Ne,G)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(xe.length>0){if(Se&&De){const de=oe(xe[0]);t.texStorage2D(n.TEXTURE_2D,ge,le,de.width,de.height)}for(let de=0,me=xe.length;de<me;de++)ce=xe[de],Se?H&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ie,ue,ce):t.texImage2D(n.TEXTURE_2D,de,le,ie,ue,ce);x.generateMipmaps=!1}else if(Se){if(De){const de=oe(G);t.texStorage2D(n.TEXTURE_2D,ge,le,de.width,de.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie,ue,G)}else t.texImage2D(n.TEXTURE_2D,0,le,ie,ue,G);p(x)&&y(D),k.__version=Z.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Pe(E,x,P){if(x.image.length!==6)return;const D=j(E,x),z=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+P);const Z=i.get(z);if(z.version!==Z.__version||D===!0){t.activeTexture(n.TEXTURE0+P);const k=$e.getPrimaries($e.workingColorSpace),F=x.colorSpace===Dn?null:$e.getPrimaries(x.colorSpace),G=x.colorSpace===Dn||k===F?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);const ie=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,le=[];for(let he=0;he<6;he++)!ie&&!ue?le[he]=f(x.image[he],!0,s.maxCubemapSize):le[he]=ue?x.image[he].image:x.image[he],le[he]=ae(x,le[he]);const ce=le[0],xe=r.convert(x.format,x.colorSpace),Se=r.convert(x.type),De=T(x.internalFormat,xe,Se,x.normalized,x.colorSpace),H=x.isVideoTexture!==!0,ge=Z.__version===void 0||D===!0,de=z.dataReady;let me=S(x,ce);Be(n.TEXTURE_CUBE_MAP,x);let be;if(ie){H&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,De,ce.width,ce.height);for(let he=0;he<6;he++){be=le[he].mipmaps;for(let Ne=0;Ne<be.length;Ne++){const Re=be[Ne];x.format!==Kt?xe!==null?H?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,0,0,Re.width,Re.height,xe,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,De,Re.width,Re.height,0,Re.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,0,0,Re.width,Re.height,xe,Se,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,De,Re.width,Re.height,0,xe,Se,Re.data)}}}else{if(be=x.mipmaps,H&&ge){be.length>0&&me++;const he=oe(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,De,he.width,he.height)}for(let he=0;he<6;he++)if(ue){H?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,le[he].width,le[he].height,xe,Se,le[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,De,le[he].width,le[he].height,0,xe,Se,le[he].data);for(let Ne=0;Ne<be.length;Ne++){const pt=be[Ne].image[he].image;H?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,0,0,pt.width,pt.height,xe,Se,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,De,pt.width,pt.height,0,xe,Se,pt.data)}}else{H?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,xe,Se,le[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,De,xe,Se,le[he]);for(let Ne=0;Ne<be.length;Ne++){const Re=be[Ne];H?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,0,0,xe,Se,Re.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,De,xe,Se,Re.image[he])}}}p(x)&&y(n.TEXTURE_CUBE_MAP),Z.__version=z.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Le(E,x,P,D,z,Z){const k=r.convert(P.format,P.colorSpace),F=r.convert(P.type),G=T(P.internalFormat,k,F,P.normalized,P.colorSpace),ie=i.get(x),ue=i.get(P);if(ue.__renderTarget=x,!ie.__hasExternalTextures){const le=Math.max(1,x.width>>Z),ce=Math.max(1,x.height>>Z);z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?t.texImage3D(z,Z,G,le,ce,x.depth,0,k,F,null):t.texImage2D(z,Z,G,le,ce,0,k,F,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),q(x)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,D,z,ue.__webglTexture,0,rt(x)):(z===n.TEXTURE_2D||z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,D,z,ue.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(E,x,P){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer){const D=x.depthTexture,z=D&&D.isDepthTexture?D.type:null,Z=A(x.stencilBuffer,z),k=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;q(x)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(x),Z,x.width,x.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(x),Z,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Z,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,E)}else{const D=x.textures;for(let z=0;z<D.length;z++){const Z=D[z],k=r.convert(Z.format,Z.colorSpace),F=r.convert(Z.type),G=T(Z.internalFormat,k,F,Z.normalized,Z.colorSpace);q(x)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(x),G,x.width,x.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(x),G,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,G,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ke(E,x,P){const D=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const z=i.get(x.depthTexture);if(z.__renderTarget=x,(!z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),D){if(z.__webglInit===void 0&&(z.__webglInit=!0,x.depthTexture.addEventListener("dispose",N)),z.__webglTexture===void 0){z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Be(n.TEXTURE_CUBE_MAP,x.depthTexture);const ie=r.convert(x.depthTexture.format),ue=r.convert(x.depthTexture.type);let le;x.depthTexture.format===bn?le=n.DEPTH_COMPONENT24:x.depthTexture.format===Kn&&(le=n.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,le,x.width,x.height,0,ie,ue,null)}}else Y(x.depthTexture,0);const Z=z.__webglTexture,k=rt(x),F=D?n.TEXTURE_CUBE_MAP_POSITIVE_X+P:n.TEXTURE_2D,G=x.depthTexture.format===Kn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===bn)q(x)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,F,Z,0,k):n.framebufferTexture2D(n.FRAMEBUFFER,G,F,Z,0);else if(x.depthTexture.format===Kn)q(x)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,F,Z,0,k):n.framebufferTexture2D(n.FRAMEBUFFER,G,F,Z,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(E){const x=i.get(E),P=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){const D=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),D){const z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,D.removeEventListener("dispose",z)};D.addEventListener("dispose",z),x.__depthDisposeCallback=z}x.__boundDepthTexture=D}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(P)for(let D=0;D<6;D++)ke(x.__webglFramebuffer[D],E,D);else{const D=E.texture.mipmaps;D&&D.length>0?ke(x.__webglFramebuffer[0],E,0):ke(x.__webglFramebuffer,E,0)}else if(P){x.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[D]),x.__webglDepthbuffer[D]===void 0)x.__webglDepthbuffer[D]=n.createRenderbuffer(),nt(x.__webglDepthbuffer[D],E,!1);else{const z=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer[D];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,Z)}}else{const D=E.texture.mipmaps;if(D&&D.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),nt(x.__webglDepthbuffer,E,!1);else{const z=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xe(E,x,P){const D=i.get(E);x!==void 0&&Le(D.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&Ke(E)}function Ve(E){const x=E.texture,P=i.get(E),D=i.get(x);E.addEventListener("dispose",M);const z=E.textures,Z=E.isWebGLCubeRenderTarget===!0,k=z.length>1;if(k||(D.__webglTexture===void 0&&(D.__webglTexture=n.createTexture()),D.__version=x.version,a.memory.textures++),Z){P.__webglFramebuffer=[];for(let F=0;F<6;F++)if(x.mipmaps&&x.mipmaps.length>0){P.__webglFramebuffer[F]=[];for(let G=0;G<x.mipmaps.length;G++)P.__webglFramebuffer[F][G]=n.createFramebuffer()}else P.__webglFramebuffer[F]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){P.__webglFramebuffer=[];for(let F=0;F<x.mipmaps.length;F++)P.__webglFramebuffer[F]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(k)for(let F=0,G=z.length;F<G;F++){const ie=i.get(z[F]);ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&q(E)===!1){P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let F=0;F<z.length;F++){const G=z[F];P.__webglColorRenderbuffer[F]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[F]);const ie=r.convert(G.format,G.colorSpace),ue=r.convert(G.type),le=T(G.internalFormat,ie,ue,G.normalized,G.colorSpace,E.isXRRenderTarget===!0),ce=rt(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,le,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.RENDERBUFFER,P.__webglColorRenderbuffer[F])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(P.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture),Be(n.TEXTURE_CUBE_MAP,x);for(let F=0;F<6;F++)if(x.mipmaps&&x.mipmaps.length>0)for(let G=0;G<x.mipmaps.length;G++)Le(P.__webglFramebuffer[F][G],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+F,G);else Le(P.__webglFramebuffer[F],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);p(x)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(k){for(let F=0,G=z.length;F<G;F++){const ie=z[F],ue=i.get(ie);let le=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),Be(le,ie),Le(P.__webglFramebuffer,E,ie,n.COLOR_ATTACHMENT0+F,le,0),p(ie)&&y(le)}t.unbindTexture()}else{let F=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(F=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(F,D.__webglTexture),Be(F,x),x.mipmaps&&x.mipmaps.length>0)for(let G=0;G<x.mipmaps.length;G++)Le(P.__webglFramebuffer[G],E,x,n.COLOR_ATTACHMENT0,F,G);else Le(P.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,F,0);p(x)&&y(F),t.unbindTexture()}E.depthBuffer&&Ke(E)}function ct(E){const x=E.textures;for(let P=0,D=x.length;P<D;P++){const z=x[P];if(p(z)){const Z=b(E),k=i.get(z).__webglTexture;t.bindTexture(Z,k),y(Z),t.unbindTexture()}}}const dt=[],ft=[];function gt(E){if(E.samples>0){if(q(E)===!1){const x=E.textures,P=E.width,D=E.height;let z=n.COLOR_BUFFER_BIT;const Z=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=i.get(E),F=x.length>1;if(F)for(let ie=0;ie<x.length;ie++)t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,k.__webglMultisampledFramebuffer);const G=E.texture.mipmaps;G&&G.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,k.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,k.__webglFramebuffer);for(let ie=0;ie<x.length;ie++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(z|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(z|=n.STENCIL_BUFFER_BIT)),F){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,k.__webglColorRenderbuffer[ie]);const ue=i.get(x[ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,P,D,0,0,P,D,z,n.NEAREST),d===!0&&(dt.length=0,ft.length=0,dt.push(n.COLOR_ATTACHMENT0+ie),E.depthBuffer&&E.resolveDepthBuffer===!1&&(dt.push(Z),ft.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ft)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),F)for(let ie=0;ie<x.length;ie++){t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,k.__webglColorRenderbuffer[ie]);const ue=i.get(x[ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,k.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&d){const x=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function rt(E){return Math.min(s.maxSamples,E.samples)}function q(E){const x=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function C(E){const x=a.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function ae(E,x){const P=E.colorSpace,D=E.format,z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||P!==Xs&&P!==Dn&&($e.getTransfer(P)===et?(D!==Kt||z!==Vt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",P)),x}function oe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=K,this.getTextureUnits=O,this.setTextureUnits=U,this.setTexture2D=Y,this.setTexture2DArray=re,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=Xe,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function K0(n,e){function t(i,s=Dn){let r;const a=$e.getTransfer(s);if(i===Vt)return n.UNSIGNED_BYTE;if(i===no)return n.UNSIGNED_SHORT_4_4_4_4;if(i===io)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Hl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Vl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===kl)return n.BYTE;if(i===Gl)return n.SHORT;if(i===Zi)return n.UNSIGNED_SHORT;if(i===to)return n.INT;if(i===ln)return n.UNSIGNED_INT;if(i===rn)return n.FLOAT;if(i===yn)return n.HALF_FLOAT;if(i===Wl)return n.ALPHA;if(i===jl)return n.RGB;if(i===Kt)return n.RGBA;if(i===bn)return n.DEPTH_COMPONENT;if(i===Kn)return n.DEPTH_STENCIL;if(i===Xl)return n.RED;if(i===so)return n.RED_INTEGER;if(i===ii)return n.RG;if(i===ro)return n.RG_INTEGER;if(i===ao)return n.RGBA_INTEGER;if(i===Is||i===Us||i===Fs||i===Os)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Is)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Is)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Us)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Os)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===fa||i===pa||i===ma||i===ga)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ga)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xa||i===_a||i===va||i===Ma||i===Sa||i===Ws||i===ya)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===xa||i===_a)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===va)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ma)return r.COMPRESSED_R11_EAC;if(i===Sa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ws)return r.COMPRESSED_RG11_EAC;if(i===ya)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ba||i===Ea||i===Ta||i===wa||i===Aa||i===Ra||i===Ca||i===Na||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Fa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ba)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ea)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ta)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Aa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ra)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ca)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Na)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Pa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===La)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Da)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ia)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ua)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Oa||i===Ba||i===za)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Oa)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ka||i===Ga||i===js||i===Ha)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ka)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ga)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===js)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ha)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ki?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const J0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q0=`
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

}`;class ex{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new id(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new dn({vertexShader:J0,fragmentShader:Q0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Ui(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tx extends ai{constructor(e,t){super();const i=this;let s=null,r=1,a=null,c="local-floor",d=1,l=null,u=null,m=null,h=null,g=null,_=null;const v=typeof XRWebGLBinding<"u",f=new ex,p={},y=t.getContextAttributes();let b=null,T=null;const A=[],S=[],N=new Ze;let M=null;const R=new Bt;R.viewport=new ut;const L=new Bt;L.viewport=new ut;const I=[R,L],B=new uf;let K=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let se=A[j];return se===void 0&&(se=new Sr,A[j]=se),se.getTargetRaySpace()},this.getControllerGrip=function(j){let se=A[j];return se===void 0&&(se=new Sr,A[j]=se),se.getGripSpace()},this.getHand=function(j){let se=A[j];return se===void 0&&(se=new Sr,A[j]=se),se.getHandSpace()};function U(j){const se=S.indexOf(j.inputSource);if(se===-1)return;const $=A[se];$!==void 0&&($.update(j.inputSource,j.frame,l||a),$.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",V);for(let j=0;j<A.length;j++){const se=S[j];se!==null&&(S[j]=null,A[j].disconnect(se))}K=null,O=null,f.reset();for(const j in p)delete p[j];e.setRenderTarget(b),g=null,h=null,m=null,s=null,T=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){c=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return m===null&&v&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",W),s.addEventListener("inputsourceschange",V),y.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(N),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let $=null,Me=null,Pe=null;y.depth&&(Pe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=y.stencil?Kn:bn,Me=y.stencil?Ki:ln);const Le={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:r};m=this.getBinding(),h=m.createProjectionLayer(Le),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),T=new cn(h.textureWidth,h.textureHeight,{format:Kt,type:Vt,depthTexture:new Pi(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const $={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,$),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),T=new cn(g.framebufferWidth,g.framebufferHeight,{format:Kt,type:Vt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(d),l=null,a=await s.requestReferenceSpace(c),Be.setContext(s),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function V(j){for(let se=0;se<j.removed.length;se++){const $=j.removed[se],Me=S.indexOf($);Me>=0&&(S[Me]=null,A[Me].disconnect($))}for(let se=0;se<j.added.length;se++){const $=j.added[se];let Me=S.indexOf($);if(Me===-1){for(let Le=0;Le<A.length;Le++)if(Le>=S.length){S.push($),Me=Le;break}else if(S[Le]===null){S[Le]=$,Me=Le;break}if(Me===-1)break}const Pe=A[Me];Pe&&Pe.connect($)}}const Y=new J,re=new J;function fe(j,se,$){Y.setFromMatrixPosition(se.matrixWorld),re.setFromMatrixPosition($.matrixWorld);const Me=Y.distanceTo(re),Pe=se.projectionMatrix.elements,Le=$.projectionMatrix.elements,nt=Pe[14]/(Pe[10]-1),ke=Pe[14]/(Pe[10]+1),Ke=(Pe[9]+1)/Pe[5],Xe=(Pe[9]-1)/Pe[5],Ve=(Pe[8]-1)/Pe[0],ct=(Le[8]+1)/Le[0],dt=nt*Ve,ft=nt*ct,gt=Me/(-Ve+ct),rt=gt*-Ve;if(se.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(rt),j.translateZ(gt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Pe[10]===-1)j.projectionMatrix.copy(se.projectionMatrix),j.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const q=nt+gt,C=ke+gt,ae=dt-rt,oe=ft+(Me-rt),E=Ke*ke/C*q,x=Xe*ke/C*q;j.projectionMatrix.makePerspective(ae,oe,E,x,q,C),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function pe(j,se){se===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(se.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let se=j.near,$=j.far;f.texture!==null&&(f.depthNear>0&&(se=f.depthNear),f.depthFar>0&&($=f.depthFar)),B.near=L.near=R.near=se,B.far=L.far=R.far=$,(K!==B.near||O!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),K=B.near,O=B.far),B.layers.mask=j.layers.mask|6,R.layers.mask=B.layers.mask&-5,L.layers.mask=B.layers.mask&-3;const Me=j.parent,Pe=B.cameras;pe(B,Me);for(let Le=0;Le<Pe.length;Le++)pe(Pe[Le],Me);Pe.length===2?fe(B,R,L):B.projectionMatrix.copy(R.projectionMatrix),Ee(j,B,Me)};function Ee(j,se,$){$===null?j.matrix.copy(se.matrixWorld):(j.matrix.copy($.matrixWorld),j.matrix.invert(),j.matrix.multiply(se.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(se.projectionMatrix),j.projectionMatrixInverse.copy(se.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Wa*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&g===null))return d},this.setFoveation=function(j){d=j,h!==null&&(h.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(j){return p[j]};let He=null;function Te(j,se){if(u=se.getViewerPose(l||a),_=se,u!==null){const $=u.views;g!==null&&(e.setRenderTargetFramebuffer(T,g.framebuffer),e.setRenderTarget(T));let Me=!1;$.length!==B.cameras.length&&(B.cameras.length=0,Me=!0);for(let ke=0;ke<$.length;ke++){const Ke=$[ke];let Xe=null;if(g!==null)Xe=g.getViewport(Ke);else{const ct=m.getViewSubImage(h,Ke);Xe=ct.viewport,ke===0&&(e.setRenderTargetTextures(T,ct.colorTexture,ct.depthStencilTexture),e.setRenderTarget(T))}let Ve=I[ke];Ve===void 0&&(Ve=new Bt,Ve.layers.enable(ke),Ve.viewport=new ut,I[ke]=Ve),Ve.matrix.fromArray(Ke.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ke.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),ke===0&&(B.matrix.copy(Ve.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Me===!0&&B.cameras.push(Ve)}const Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){m=i.getBinding();const ke=m.getDepthInformation($[0]);ke&&ke.isValid&&ke.texture&&f.init(ke,s.renderState)}if(Pe&&Pe.includes("camera-access")&&v){e.state.unbindTexture(),m=i.getBinding();for(let ke=0;ke<$.length;ke++){const Ke=$[ke].camera;if(Ke){let Xe=p[Ke];Xe||(Xe=new id,p[Ke]=Xe);const Ve=m.getCameraImage(Ke);Xe.sourceTexture=Ve}}}}for(let $=0;$<A.length;$++){const Me=S[$],Pe=A[$];Me!==null&&Pe!==void 0&&Pe.update(Me,se,l||a)}He&&He(j,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),_=null}const Be=new ld;Be.setAnimationLoop(Te),this.setAnimationLoop=function(j){He=j},this.dispose=function(){}}}const nx=new ht,gd=new Oe;gd.set(-1,0,0,0,1,0,0,0,1);function ix(n,e){function t(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,sd(n)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,y,b,T){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(f,p):p.isMeshLambertMaterial?(r(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(f,p),m(f,p)):p.isMeshPhongMaterial?(r(f,p),u(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(f,p),h(f,p),p.isMeshPhysicalMaterial&&g(f,p,T)):p.isMeshMatcapMaterial?(r(f,p),_(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),v(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&c(f,p)):p.isPointsMaterial?d(f,p,y,b):p.isSpriteMaterial?l(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,t(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===zt&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,t(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===zt&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,t(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,t(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const y=e.get(p),b=y.envMap,T=y.envMapRotation;b&&(f.envMap.value=b,f.envMapRotation.value.setFromMatrix4(nx.makeRotationFromEuler(T)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(gd),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform))}function c(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function d(f,p,y,b){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*y,f.scale.value=b*.5,p.map&&(f.map.value=p.map,t(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function l(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function u(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function m(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function h(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function g(f,p,y){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zt&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,p){p.matcap&&(f.matcap.value=p.matcap)}function v(f,p){const y=e.get(p).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function sx(n,e,t,i){let s={},r={},a=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(T,A){const S=A.program;i.uniformBlockBinding(T,S)}function l(T,A){let S=s[T.id];S===void 0&&(f(T),S=u(T),s[T.id]=S,T.addEventListener("dispose",y));const N=A.program;i.updateUBOMapping(T,N);const M=e.render.frame;r[T.id]!==M&&(h(T),r[T.id]=M)}function u(T){const A=m();T.__bindingPointIndex=A;const S=n.createBuffer(),N=T.__size,M=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,N,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,S),S}function m(){for(let T=0;T<c;T++)if(a.indexOf(T)===-1)return a.push(T),T;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const A=s[T.id],S=T.uniforms,N=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let M=0,R=S.length;M<R;M++){const L=S[M];if(Array.isArray(L))for(let I=0,B=L.length;I<B;I++)g(L[I],M,I,N);else g(L,M,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(T,A,S,N){if(v(T,A,S,N)===!0){const M=T.__offset,R=T.value;if(Array.isArray(R)){let L=0;for(let I=0;I<R.length;I++){const B=R[I],K=p(B);_(B,T.__data,L),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(L+=K.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(R,T.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,M,T.__data)}}function _(T,A,S){typeof T=="number"||typeof T=="boolean"?A[0]=T:T.isMatrix3?(A[0]=T.elements[0],A[1]=T.elements[1],A[2]=T.elements[2],A[3]=0,A[4]=T.elements[3],A[5]=T.elements[4],A[6]=T.elements[5],A[7]=0,A[8]=T.elements[6],A[9]=T.elements[7],A[10]=T.elements[8],A[11]=0):ArrayBuffer.isView(T)?A.set(new T.constructor(T.buffer,T.byteOffset,A.length)):T.toArray(A,S)}function v(T,A,S,N){const M=T.value,R=A+"_"+S;if(N[R]===void 0)return typeof M=="number"||typeof M=="boolean"?N[R]=M:ArrayBuffer.isView(M)?N[R]=M.slice():N[R]=M.clone(),!0;{const L=N[R];if(typeof M=="number"||typeof M=="boolean"){if(L!==M)return N[R]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(L.equals(M)===!1)return L.copy(M),!0}}return!1}function f(T){const A=T.uniforms;let S=0;const N=16;for(let R=0,L=A.length;R<L;R++){const I=Array.isArray(A[R])?A[R]:[A[R]];for(let B=0,K=I.length;B<K;B++){const O=I[B],U=Array.isArray(O.value)?O.value:[O.value];for(let W=0,V=U.length;W<V;W++){const Y=U[W],re=p(Y),fe=S%N,pe=fe%re.boundary,Ee=fe+pe;S+=pe,Ee!==0&&N-Ee<re.storage&&(S+=N-Ee),O.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=re.storage}}}const M=S%N;return M>0&&(S+=N-M),T.__size=S,T.__cache={},this}function p(T){const A={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(A.boundary=4,A.storage=4):T.isVector2?(A.boundary=8,A.storage=8):T.isVector3||T.isColor?(A.boundary=16,A.storage=12):T.isVector4?(A.boundary=16,A.storage=16):T.isMatrix3?(A.boundary=48,A.storage=48):T.isMatrix4?(A.boundary=64,A.storage=64):T.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(T)?(A.boundary=16,A.storage=T.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",T),A}function y(T){const A=T.target;A.removeEventListener("dispose",y);const S=a.indexOf(A.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function b(){for(const T in s)n.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:d,update:l,dispose:b}}const rx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nn=null;function ax(){return nn===null&&(nn=new Yh(rx,16,16,ii,yn),nn.name="DFG_LUT",nn.minFilter=Nt,nn.magFilter=Nt,nn.wrapS=_n,nn.wrapT=_n,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}class xd{constructor(e={}){const{canvas:t=Ah(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:h=!1,outputBufferType:g=Vt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const v=g,f=new Set([ao,ro,so]),p=new Set([Vt,ln,Zi,Ki,no,io]),y=new Uint32Array(4),b=new Int32Array(4),T=new J;let A=null,S=null;const N=[],M=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=on,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let I=!1,B=null,K=null,O=null,U=null;this._outputColorSpace=Xt;let W=0,V=0,Y=null,re=-1,fe=null;const pe=new ut,Ee=new ut;let He=null;const Te=new qe(0);let Be=0,j=t.width,se=t.height,$=1,Me=null,Pe=null;const Le=new ut(0,0,j,se),nt=new ut(0,0,j,se);let ke=!1;const Ke=new uo;let Xe=!1,Ve=!1;const ct=new ht,dt=new J,ft=new ut,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function q(){return Y===null?$:1}let C=i;function ae(w,X){return t.getContext(w,X)}try{const w={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:d,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${eo}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",Jt,!1),C===null){const X="webgl2";if(C=ae(X,w),C===null)throw ae(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(w){throw Qe("WebGLRenderer: "+w.message),w}let oe,E,x,P,D,z,Z,k,F,G,ie,ue,le,ce,xe,Se,De,H,ge,de,me,be,he;function Ne(){oe=new ag(C),oe.init(),me=new K0(C,oe),E=new Jm(C,oe,e,me),x=new Y0(C,oe),E.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),K=C.createFramebuffer(),O=C.createFramebuffer(),U=C.createFramebuffer(),P=new lg(C),D=new U0,z=new Z0(C,oe,x,D,E,me,P),Z=new rg(L),k=new ff(C),be=new Zm(C,k),F=new og(C,k,P,be),G=new ug(C,F,k,be,P),H=new dg(C,E,z),xe=new Qm(D),ie=new I0(L,Z,oe,E,be,xe),ue=new ix(L,D),le=new O0,ce=new V0(oe),De=new Ym(L,Z,x,G,_,d),Se=new $0(L,G,E),he=new sx(C,P,E,x),ge=new Km(C,oe,P),de=new cg(C,oe,P),P.programs=ie.programs,L.capabilities=E,L.extensions=oe,L.properties=D,L.renderLists=le,L.shadowMap=Se,L.state=x,L.info=P}Ne(),v!==Vt&&(R=new fg(v,t.width,t.height,c,s,r));const Re=new tx(L,C);this.xr=Re,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const w=oe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=oe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(w){w!==void 0&&($=w,this.setSize(j,se,!1))},this.getSize=function(w){return w.set(j,se)},this.setSize=function(w,X,ne=!0){if(Re.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}j=w,se=X,t.width=Math.floor(w*$),t.height=Math.floor(X*$),ne===!0&&(t.style.width=w+"px",t.style.height=X+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,w,X)},this.getDrawingBufferSize=function(w){return w.set(j*$,se*$).floor()},this.setDrawingBufferSize=function(w,X,ne){j=w,se=X,$=ne,t.width=Math.floor(w*ne),t.height=Math.floor(X*ne),this.setViewport(0,0,w,X)},this.setEffects=function(w){if(v===Vt){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let X=0;X<w.length;X++)if(w[X].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(pe)},this.getViewport=function(w){return w.copy(Le)},this.setViewport=function(w,X,ne,Q){w.isVector4?Le.set(w.x,w.y,w.z,w.w):Le.set(w,X,ne,Q),x.viewport(pe.copy(Le).multiplyScalar($).round())},this.getScissor=function(w){return w.copy(nt)},this.setScissor=function(w,X,ne,Q){w.isVector4?nt.set(w.x,w.y,w.z,w.w):nt.set(w,X,ne,Q),x.scissor(Ee.copy(nt).multiplyScalar($).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(w){x.setScissorTest(ke=w)},this.setOpaqueSort=function(w){Me=w},this.setTransparentSort=function(w){Pe=w},this.getClearColor=function(w){return w.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(w=!0,X=!0,ne=!0){let Q=0;if(w){let ee=!1;if(Y!==null){const ye=Y.texture.format;ee=f.has(ye)}if(ee){const ye=Y.texture.type,Ae=p.has(ye),ve=De.getClearColor(),Ce=De.getClearAlpha(),Ie=ve.r,ze=ve.g,We=ve.b;Ae?(y[0]=Ie,y[1]=ze,y[2]=We,y[3]=Ce,C.clearBufferuiv(C.COLOR,0,y)):(b[0]=Ie,b[1]=ze,b[2]=We,b[3]=Ce,C.clearBufferiv(C.COLOR,0,b))}else Q|=C.COLOR_BUFFER_BIT}X&&(Q|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(Q|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&C.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),B=w},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),De.dispose(),le.dispose(),ce.dispose(),D.dispose(),Z.dispose(),G.dispose(),be.dispose(),he.dispose(),ie.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",So),Re.removeEventListener("sessionend",yo),kn.stop()};function pt(w){w.preventDefault(),ic("WebGLRenderer: Context Lost."),I=!0}function at(){ic("WebGLRenderer: Context Restored."),I=!1;const w=P.autoReset,X=Se.enabled,ne=Se.autoUpdate,Q=Se.needsUpdate,ee=Se.type;Ne(),P.autoReset=w,Se.enabled=X,Se.autoUpdate=ne,Se.needsUpdate=Q,Se.type=ee}function Jt(w){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Qt(w){const X=w.target;X.removeEventListener("dispose",Qt),yd(X)}function yd(w){bd(w),D.remove(w)}function bd(w){const X=D.get(w).programs;X!==void 0&&(X.forEach(function(ne){ie.releaseProgram(ne)}),w.isShaderMaterial&&ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,X,ne,Q,ee,ye){X===null&&(X=gt);const Ae=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,ve=wd(w,X,ne,Q,ee);x.setMaterial(Q,Ae);let Ce=ne.index,Ie=1;if(Q.wireframe===!0){if(Ce=F.getWireframeAttribute(ne),Ce===void 0)return;Ie=2}const ze=ne.drawRange,We=ne.attributes.position;let Ue=ze.start*Ie,tt=(ze.start+ze.count)*Ie;ye!==null&&(Ue=Math.max(Ue,ye.start*Ie),tt=Math.min(tt,(ye.start+ye.count)*Ie)),Ce!==null?(Ue=Math.max(Ue,0),tt=Math.min(tt,Ce.count)):We!=null&&(Ue=Math.max(Ue,0),tt=Math.min(tt,We.count));const xt=tt-Ue;if(xt<0||xt===1/0)return;be.setup(ee,Q,ve,ne,Ce);let mt,it=ge;if(Ce!==null&&(mt=k.get(Ce),it=de,it.setIndex(mt)),ee.isMesh)Q.wireframe===!0?(x.setLineWidth(Q.wireframeLinewidth*q()),it.setMode(C.LINES)):it.setMode(C.TRIANGLES);else if(ee.isLine){let At=Q.linewidth;At===void 0&&(At=1),x.setLineWidth(At*q()),ee.isLineSegments?it.setMode(C.LINES):ee.isLineLoop?it.setMode(C.LINE_LOOP):it.setMode(C.LINE_STRIP)}else ee.isPoints?it.setMode(C.POINTS):ee.isSprite&&it.setMode(C.TRIANGLES);if(ee.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))it.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{const At=ee._multiDrawStarts,we=ee._multiDrawCounts,kt=ee._multiDrawCount,Je=Ce?k.get(Ce).bytesPerElement:1,Wt=D.get(Q).currentProgram.getUniforms();for(let en=0;en<kt;en++)Wt.setValue(C,"_gl_DrawID",en),it.render(At[en]/Je,we[en])}else if(ee.isInstancedMesh)it.renderInstances(Ue,xt,ee.count);else if(ne.isInstancedBufferGeometry){const At=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,we=Math.min(ne.instanceCount,At);it.renderInstances(Ue,xt,we)}else it.render(Ue,xt)};function Mo(w,X,ne){w.transparent===!0&&w.side===xn&&w.forceSinglePass===!1?(w.side=zt,w.needsUpdate=!0,is(w,X,ne),w.side=On,w.needsUpdate=!0,is(w,X,ne),w.side=xn):is(w,X,ne)}this.compile=function(w,X,ne=null){ne===null&&(ne=w),S=ce.get(ne),S.init(X),M.push(S),ne.traverseVisible(function(ee){ee.isLight&&ee.layers.test(X.layers)&&(S.pushLight(ee),ee.castShadow&&S.pushShadow(ee))}),w!==ne&&w.traverseVisible(function(ee){ee.isLight&&ee.layers.test(X.layers)&&(S.pushLight(ee),ee.castShadow&&S.pushShadow(ee))}),S.setupLights();const Q=new Set;return w.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;const ye=ee.material;if(ye)if(Array.isArray(ye))for(let Ae=0;Ae<ye.length;Ae++){const ve=ye[Ae];Mo(ve,ne,ee),Q.add(ve)}else Mo(ye,ne,ee),Q.add(ye)}),S=M.pop(),Q},this.compileAsync=function(w,X,ne=null){const Q=this.compile(w,X,ne);return new Promise(ee=>{function ye(){if(Q.forEach(function(Ae){D.get(Ae).currentProgram.isReady()&&Q.delete(Ae)}),Q.size===0){ee(w);return}setTimeout(ye,10)}oe.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let cr=null;function Ed(w){cr&&cr(w)}function So(){kn.stop()}function yo(){kn.start()}const kn=new ld;kn.setAnimationLoop(Ed),typeof self<"u"&&kn.setContext(self),this.setAnimationLoop=function(w){cr=w,Re.setAnimationLoop(w),w===null?kn.stop():kn.start()},Re.addEventListener("sessionstart",So),Re.addEventListener("sessionend",yo),this.render=function(w,X){if(X!==void 0&&X.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;B!==null&&B.renderStart(w,X);const ne=Re.enabled===!0&&Re.isPresenting===!0,Q=R!==null&&(Y===null||ne)&&R.begin(L,Y);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(X),X=Re.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,X,Y),S=ce.get(w,M.length),S.init(X),S.state.textureUnits=z.getTextureUnits(),M.push(S),ct.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Ke.setFromProjectionMatrix(ct,an,X.reversedDepth),Ve=this.localClippingEnabled,Xe=xe.init(this.clippingPlanes,Ve),A=le.get(w,N.length),A.init(),N.push(A),Re.enabled===!0&&Re.isPresenting===!0){const Ae=L.xr.getDepthSensingMesh();Ae!==null&&lr(Ae,X,-1/0,L.sortObjects)}lr(w,X,0,L.sortObjects),A.finish(),L.sortObjects===!0&&A.sort(Me,Pe,X.reversedDepth),rt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,rt&&De.addToRenderList(A,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xe===!0&&xe.beginShadows();const ee=S.state.shadowsArray;if(Se.render(ee,w,X),Xe===!0&&xe.endShadows(),(Q&&R.hasRenderPass())===!1){const Ae=A.opaque,ve=A.transmissive;if(S.setupLights(),X.isArrayCamera){const Ce=X.cameras;if(ve.length>0)for(let Ie=0,ze=Ce.length;Ie<ze;Ie++){const We=Ce[Ie];Eo(Ae,ve,w,We)}rt&&De.render(w);for(let Ie=0,ze=Ce.length;Ie<ze;Ie++){const We=Ce[Ie];bo(A,w,We,We.viewport)}}else ve.length>0&&Eo(Ae,ve,w,X),rt&&De.render(w),bo(A,w,X)}Y!==null&&V===0&&(z.updateMultisampleRenderTarget(Y),z.updateRenderTargetMipmap(Y)),Q&&R.end(L),w.isScene===!0&&w.onAfterRender(L,w,X),be.resetDefaultState(),re=-1,fe=null,M.pop(),M.length>0?(S=M[M.length-1],z.setTextureUnits(S.state.textureUnits),Xe===!0&&xe.setGlobalState(L.clippingPlanes,S.state.camera)):S=null,N.pop(),N.length>0?A=N[N.length-1]:A=null,B!==null&&B.renderEnd()};function lr(w,X,ne,Q){if(w.visible===!1)return;if(w.layers.test(X.layers)){if(w.isGroup)ne=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(X);else if(w.isLightProbeGrid)S.pushLightProbeGrid(w);else if(w.isLight)S.pushLight(w),w.castShadow&&S.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ke.intersectsSprite(w)){Q&&ft.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ct);const Ae=G.update(w),ve=w.material;ve.visible&&A.push(w,Ae,ve,ne,ft.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ke.intersectsObject(w))){const Ae=G.update(w),ve=w.material;if(Q&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ft.copy(w.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ft.copy(Ae.boundingSphere.center)),ft.applyMatrix4(w.matrixWorld).applyMatrix4(ct)),Array.isArray(ve)){const Ce=Ae.groups;for(let Ie=0,ze=Ce.length;Ie<ze;Ie++){const We=Ce[Ie],Ue=ve[We.materialIndex];Ue&&Ue.visible&&A.push(w,Ae,Ue,ne,ft.z,We)}}else ve.visible&&A.push(w,Ae,ve,ne,ft.z,null)}}const ye=w.children;for(let Ae=0,ve=ye.length;Ae<ve;Ae++)lr(ye[Ae],X,ne,Q)}function bo(w,X,ne,Q){const{opaque:ee,transmissive:ye,transparent:Ae}=w;S.setupLightsView(ne),Xe===!0&&xe.setGlobalState(L.clippingPlanes,ne),Q&&x.viewport(pe.copy(Q)),ee.length>0&&ns(ee,X,ne),ye.length>0&&ns(ye,X,ne),Ae.length>0&&ns(Ae,X,ne),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Eo(w,X,ne,Q){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Q.id]===void 0){const Ue=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Q.id]=new cn(1,1,{generateMipmaps:!0,type:Ue?yn:Vt,minFilter:Zn,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const ye=S.state.transmissionRenderTarget[Q.id],Ae=Q.viewport||pe;ye.setSize(Ae.z*L.transmissionResolutionScale,Ae.w*L.transmissionResolutionScale);const ve=L.getRenderTarget(),Ce=L.getActiveCubeFace(),Ie=L.getActiveMipmapLevel();L.setRenderTarget(ye),L.getClearColor(Te),Be=L.getClearAlpha(),Be<1&&L.setClearColor(16777215,.5),L.clear(),rt&&De.render(ne);const ze=L.toneMapping;L.toneMapping=on;const We=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),S.setupLightsView(Q),Xe===!0&&xe.setGlobalState(L.clippingPlanes,Q),ns(w,ne,Q),z.updateMultisampleRenderTarget(ye),z.updateRenderTargetMipmap(ye),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let tt=0,xt=X.length;tt<xt;tt++){const mt=X[tt],{object:it,geometry:At,material:we,group:kt}=mt;if(we.side===xn&&it.layers.test(Q.layers)){const Je=we.side;we.side=zt,we.needsUpdate=!0,To(it,ne,Q,At,we,kt),we.side=Je,we.needsUpdate=!0,Ue=!0}}Ue===!0&&(z.updateMultisampleRenderTarget(ye),z.updateRenderTargetMipmap(ye))}L.setRenderTarget(ve,Ce,Ie),L.setClearColor(Te,Be),We!==void 0&&(Q.viewport=We),L.toneMapping=ze}function ns(w,X,ne){const Q=X.isScene===!0?X.overrideMaterial:null;for(let ee=0,ye=w.length;ee<ye;ee++){const Ae=w[ee],{object:ve,geometry:Ce,group:Ie}=Ae;let ze=Ae.material;ze.allowOverride===!0&&Q!==null&&(ze=Q),ve.layers.test(ne.layers)&&To(ve,X,ne,Ce,ze,Ie)}}function To(w,X,ne,Q,ee,ye){w.onBeforeRender(L,X,ne,Q,ee,ye),w.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ee.onBeforeRender(L,X,ne,Q,w,ye),ee.transparent===!0&&ee.side===xn&&ee.forceSinglePass===!1?(ee.side=zt,ee.needsUpdate=!0,L.renderBufferDirect(ne,X,Q,ee,w,ye),ee.side=On,ee.needsUpdate=!0,L.renderBufferDirect(ne,X,Q,ee,w,ye),ee.side=xn):L.renderBufferDirect(ne,X,Q,ee,w,ye),w.onAfterRender(L,X,ne,Q,ee,ye)}function is(w,X,ne){X.isScene!==!0&&(X=gt);const Q=D.get(w),ee=S.state.lights,ye=S.state.shadowsArray,Ae=ee.state.version,ve=ie.getParameters(w,ee.state,ye,X,ne,S.state.lightProbeGridArray),Ce=ie.getProgramCacheKey(ve);let Ie=Q.programs;Q.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?X.environment:null,Q.fog=X.fog;const ze=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;Q.envMap=Z.get(w.envMap||Q.environment,ze),Q.envMapRotation=Q.environment!==null&&w.envMap===null?X.environmentRotation:w.envMapRotation,Ie===void 0&&(w.addEventListener("dispose",Qt),Ie=new Map,Q.programs=Ie);let We=Ie.get(Ce);if(We!==void 0){if(Q.currentProgram===We&&Q.lightsStateVersion===Ae)return Ao(w,ve),We}else ve.uniforms=ie.getUniforms(w),B!==null&&w.isNodeMaterial&&B.build(w,ne,ve),w.onBeforeCompile(ve,L),We=ie.acquireProgram(ve,Ce),Ie.set(Ce,We),Q.uniforms=ve.uniforms;const Ue=Q.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ue.clippingPlanes=xe.uniform),Ao(w,ve),Q.needsLights=Rd(w),Q.lightsStateVersion=Ae,Q.needsLights&&(Ue.ambientLightColor.value=ee.state.ambient,Ue.lightProbe.value=ee.state.probe,Ue.directionalLights.value=ee.state.directional,Ue.directionalLightShadows.value=ee.state.directionalShadow,Ue.spotLights.value=ee.state.spot,Ue.spotLightShadows.value=ee.state.spotShadow,Ue.rectAreaLights.value=ee.state.rectArea,Ue.ltc_1.value=ee.state.rectAreaLTC1,Ue.ltc_2.value=ee.state.rectAreaLTC2,Ue.pointLights.value=ee.state.point,Ue.pointLightShadows.value=ee.state.pointShadow,Ue.hemisphereLights.value=ee.state.hemi,Ue.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,Ue.spotLightMatrix.value=ee.state.spotLightMatrix,Ue.spotLightMap.value=ee.state.spotLightMap,Ue.pointShadowMatrix.value=ee.state.pointShadowMatrix),Q.lightProbeGrid=S.state.lightProbeGridArray.length>0,Q.currentProgram=We,Q.uniformsList=null,We}function wo(w){if(w.uniformsList===null){const X=w.currentProgram.getUniforms();w.uniformsList=Bs.seqWithValue(X.seq,w.uniforms)}return w.uniformsList}function Ao(w,X){const ne=D.get(w);ne.outputColorSpace=X.outputColorSpace,ne.batching=X.batching,ne.batchingColor=X.batchingColor,ne.instancing=X.instancing,ne.instancingColor=X.instancingColor,ne.instancingMorph=X.instancingMorph,ne.skinning=X.skinning,ne.morphTargets=X.morphTargets,ne.morphNormals=X.morphNormals,ne.morphColors=X.morphColors,ne.morphTargetsCount=X.morphTargetsCount,ne.numClippingPlanes=X.numClippingPlanes,ne.numIntersection=X.numClipIntersection,ne.vertexAlphas=X.vertexAlphas,ne.vertexTangents=X.vertexTangents,ne.toneMapping=X.toneMapping}function Td(w,X){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;T.setFromMatrixPosition(X.matrixWorld);for(let ne=0,Q=w.length;ne<Q;ne++){const ee=w[ne];if(ee.texture!==null&&ee.boundingBox.containsPoint(T))return ee}return null}function wd(w,X,ne,Q,ee){X.isScene!==!0&&(X=gt),z.resetTextureUnits();const ye=X.fog,Ae=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?X.environment:null,ve=Y===null?L.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:$e.workingColorSpace,Ce=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,Ie=Z.get(Q.envMap||Ae,Ce),ze=Q.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,We=!!ne.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ue=!!ne.morphAttributes.position,tt=!!ne.morphAttributes.normal,xt=!!ne.morphAttributes.color;let mt=on;Q.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(mt=L.toneMapping);const it=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,At=it!==void 0?it.length:0,we=D.get(Q),kt=S.state.lights;if(Xe===!0&&(Ve===!0||w!==fe)){const ot=w===fe&&Q.id===re;xe.setState(Q,w,ot)}let Je=!1;Q.version===we.__version?(we.needsLights&&we.lightsStateVersion!==kt.state.version||we.outputColorSpace!==ve||ee.isBatchedMesh&&we.batching===!1||!ee.isBatchedMesh&&we.batching===!0||ee.isBatchedMesh&&we.batchingColor===!0&&ee.colorTexture===null||ee.isBatchedMesh&&we.batchingColor===!1&&ee.colorTexture!==null||ee.isInstancedMesh&&we.instancing===!1||!ee.isInstancedMesh&&we.instancing===!0||ee.isSkinnedMesh&&we.skinning===!1||!ee.isSkinnedMesh&&we.skinning===!0||ee.isInstancedMesh&&we.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&we.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&we.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&we.instancingMorph===!1&&ee.morphTexture!==null||we.envMap!==Ie||Q.fog===!0&&we.fog!==ye||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==xe.numPlanes||we.numIntersection!==xe.numIntersection)||we.vertexAlphas!==ze||we.vertexTangents!==We||we.morphTargets!==Ue||we.morphNormals!==tt||we.morphColors!==xt||we.toneMapping!==mt||we.morphTargetsCount!==At||!!we.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,we.__version=Q.version);let Wt=we.currentProgram;Je===!0&&(Wt=is(Q,X,ee),B&&Q.isNodeMaterial&&B.onUpdateProgram(Q,Wt,we));let en=!1,En=!1,oi=!1;const st=Wt.getUniforms(),_t=we.uniforms;if(x.useProgram(Wt.program)&&(en=!0,En=!0,oi=!0),Q.id!==re&&(re=Q.id,En=!0),we.needsLights){const ot=Td(S.state.lightProbeGridArray,ee);we.lightProbeGrid!==ot&&(we.lightProbeGrid=ot,En=!0)}if(en||fe!==w){x.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),st.setValue(C,"projectionMatrix",w.projectionMatrix),st.setValue(C,"viewMatrix",w.matrixWorldInverse);const wn=st.map.cameraPosition;wn!==void 0&&wn.setValue(C,dt.setFromMatrixPosition(w.matrixWorld)),E.logarithmicDepthBuffer&&st.setValue(C,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&st.setValue(C,"isOrthographic",w.isOrthographicCamera===!0),fe!==w&&(fe=w,En=!0,oi=!0)}if(we.needsLights&&(kt.state.directionalShadowMap.length>0&&st.setValue(C,"directionalShadowMap",kt.state.directionalShadowMap,z),kt.state.spotShadowMap.length>0&&st.setValue(C,"spotShadowMap",kt.state.spotShadowMap,z),kt.state.pointShadowMap.length>0&&st.setValue(C,"pointShadowMap",kt.state.pointShadowMap,z)),ee.isSkinnedMesh){st.setOptional(C,ee,"bindMatrix"),st.setOptional(C,ee,"bindMatrixInverse");const ot=ee.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),st.setValue(C,"boneTexture",ot.boneTexture,z))}ee.isBatchedMesh&&(st.setOptional(C,ee,"batchingTexture"),st.setValue(C,"batchingTexture",ee._matricesTexture,z),st.setOptional(C,ee,"batchingIdTexture"),st.setValue(C,"batchingIdTexture",ee._indirectTexture,z),st.setOptional(C,ee,"batchingColorTexture"),ee._colorsTexture!==null&&st.setValue(C,"batchingColorTexture",ee._colorsTexture,z));const Tn=ne.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&H.update(ee,ne,Wt),(En||we.receiveShadow!==ee.receiveShadow)&&(we.receiveShadow=ee.receiveShadow,st.setValue(C,"receiveShadow",ee.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&X.environment!==null&&(_t.envMapIntensity.value=X.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=ax()),En){if(st.setValue(C,"toneMappingExposure",L.toneMappingExposure),we.needsLights&&Ad(_t,oi),ye&&Q.fog===!0&&ue.refreshFogUniforms(_t,ye),ue.refreshMaterialUniforms(_t,Q,$,se,S.state.transmissionRenderTarget[w.id]),we.needsLights&&we.lightProbeGrid){const ot=we.lightProbeGrid;_t.probesSH.value=ot.texture,_t.probesMin.value.copy(ot.boundingBox.min),_t.probesMax.value.copy(ot.boundingBox.max),_t.probesResolution.value.copy(ot.resolution)}Bs.upload(C,wo(we),_t,z)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Bs.upload(C,wo(we),_t,z),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&st.setValue(C,"center",ee.center),st.setValue(C,"modelViewMatrix",ee.modelViewMatrix),st.setValue(C,"normalMatrix",ee.normalMatrix),st.setValue(C,"modelMatrix",ee.matrixWorld),Q.uniformsGroups!==void 0){const ot=Q.uniformsGroups;for(let wn=0,ci=ot.length;wn<ci;wn++){const Ro=ot[wn];he.update(Ro,Wt),he.bind(Ro,Wt)}}return Wt}function Ad(w,X){w.ambientLightColor.needsUpdate=X,w.lightProbe.needsUpdate=X,w.directionalLights.needsUpdate=X,w.directionalLightShadows.needsUpdate=X,w.pointLights.needsUpdate=X,w.pointLightShadows.needsUpdate=X,w.spotLights.needsUpdate=X,w.spotLightShadows.needsUpdate=X,w.rectAreaLights.needsUpdate=X,w.hemisphereLights.needsUpdate=X}function Rd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(w,X,ne){const Q=D.get(w);Q.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),D.get(w.texture).__webglTexture=X,D.get(w.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:ne,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,X){const ne=D.get(w);ne.__webglFramebuffer=X,ne.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(w,X=0,ne=0){Y=w,W=X,V=ne;let Q=null,ee=!1,ye=!1;if(w){const ve=D.get(w);if(ve.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(C.FRAMEBUFFER,ve.__webglFramebuffer),pe.copy(w.viewport),Ee.copy(w.scissor),He=w.scissorTest,x.viewport(pe),x.scissor(Ee),x.setScissorTest(He),re=-1;return}else if(ve.__webglFramebuffer===void 0)z.setupRenderTarget(w);else if(ve.__hasExternalTextures)z.rebindTextures(w,D.get(w.texture).__webglTexture,D.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ze=w.depthTexture;if(ve.__boundDepthTexture!==ze){if(ze!==null&&D.has(ze)&&(w.width!==ze.image.width||w.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(w)}}const Ce=w.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ye=!0);const Ie=D.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ie[X])?Q=Ie[X][ne]:Q=Ie[X],ee=!0):w.samples>0&&z.useMultisampledRTT(w)===!1?Q=D.get(w).__webglMultisampledFramebuffer:Array.isArray(Ie)?Q=Ie[ne]:Q=Ie,pe.copy(w.viewport),Ee.copy(w.scissor),He=w.scissorTest}else pe.copy(Le).multiplyScalar($).floor(),Ee.copy(nt).multiplyScalar($).floor(),He=ke;if(ne!==0&&(Q=K),x.bindFramebuffer(C.FRAMEBUFFER,Q)&&x.drawBuffers(w,Q),x.viewport(pe),x.scissor(Ee),x.setScissorTest(He),ee){const ve=D.get(w.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+X,ve.__webglTexture,ne)}else if(ye){const ve=X;for(let Ce=0;Ce<w.textures.length;Ce++){const Ie=D.get(w.textures[Ce]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ce,Ie.__webglTexture,ne,ve)}}else if(w!==null&&ne!==0){const ve=D.get(w.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ve.__webglTexture,ne)}re=-1},this.readRenderTargetPixels=function(w,X,ne,Q,ee,ye,Ae,ve=0){if(!(w&&w.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=D.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce){x.bindFramebuffer(C.FRAMEBUFFER,Ce);try{const Ie=w.textures[ve],ze=Ie.format,We=Ie.type;if(w.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ve),!E.textureFormatReadable(ze)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(We)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=w.width-Q&&ne>=0&&ne<=w.height-ee&&C.readPixels(X,ne,Q,ee,me.convert(ze),me.convert(We),ye)}finally{const Ie=Y!==null?D.get(Y).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(w,X,ne,Q,ee,ye,Ae,ve=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=D.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce)if(X>=0&&X<=w.width-Q&&ne>=0&&ne<=w.height-ee){x.bindFramebuffer(C.FRAMEBUFFER,Ce);const Ie=w.textures[ve],ze=Ie.format,We=Ie.type;if(w.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ve),!E.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ue),C.bufferData(C.PIXEL_PACK_BUFFER,ye.byteLength,C.STREAM_READ),C.readPixels(X,ne,Q,ee,me.convert(ze),me.convert(We),0);const tt=Y!==null?D.get(Y).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,tt);const xt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Rh(C,xt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ue),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ye),C.deleteBuffer(Ue),C.deleteSync(xt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,X=null,ne=0){const Q=Math.pow(2,-ne),ee=Math.floor(w.image.width*Q),ye=Math.floor(w.image.height*Q),Ae=X!==null?X.x:0,ve=X!==null?X.y:0;z.setTexture2D(w,0),C.copyTexSubImage2D(C.TEXTURE_2D,ne,0,0,Ae,ve,ee,ye),x.unbindTexture()},this.copyTextureToTexture=function(w,X,ne=null,Q=null,ee=0,ye=0){let Ae,ve,Ce,Ie,ze,We,Ue,tt,xt;const mt=w.isCompressedTexture?w.mipmaps[ye]:w.image;if(ne!==null)Ae=ne.max.x-ne.min.x,ve=ne.max.y-ne.min.y,Ce=ne.isBox3?ne.max.z-ne.min.z:1,Ie=ne.min.x,ze=ne.min.y,We=ne.isBox3?ne.min.z:0;else{const _t=Math.pow(2,-ee);Ae=Math.floor(mt.width*_t),ve=Math.floor(mt.height*_t),w.isDataArrayTexture?Ce=mt.depth:w.isData3DTexture?Ce=Math.floor(mt.depth*_t):Ce=1,Ie=0,ze=0,We=0}Q!==null?(Ue=Q.x,tt=Q.y,xt=Q.z):(Ue=0,tt=0,xt=0);const it=me.convert(X.format),At=me.convert(X.type);let we;X.isData3DTexture?(z.setTexture3D(X,0),we=C.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(z.setTexture2DArray(X,0),we=C.TEXTURE_2D_ARRAY):(z.setTexture2D(X,0),we=C.TEXTURE_2D),x.activeTexture(C.TEXTURE0),x.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,X.flipY),x.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),x.pixelStorei(C.UNPACK_ALIGNMENT,X.unpackAlignment);const kt=x.getParameter(C.UNPACK_ROW_LENGTH),Je=x.getParameter(C.UNPACK_IMAGE_HEIGHT),Wt=x.getParameter(C.UNPACK_SKIP_PIXELS),en=x.getParameter(C.UNPACK_SKIP_ROWS),En=x.getParameter(C.UNPACK_SKIP_IMAGES);x.pixelStorei(C.UNPACK_ROW_LENGTH,mt.width),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,mt.height),x.pixelStorei(C.UNPACK_SKIP_PIXELS,Ie),x.pixelStorei(C.UNPACK_SKIP_ROWS,ze),x.pixelStorei(C.UNPACK_SKIP_IMAGES,We);const oi=w.isDataArrayTexture||w.isData3DTexture,st=X.isDataArrayTexture||X.isData3DTexture;if(w.isDepthTexture){const _t=D.get(w),Tn=D.get(X),ot=D.get(_t.__renderTarget),wn=D.get(Tn.__renderTarget);x.bindFramebuffer(C.READ_FRAMEBUFFER,ot.__webglFramebuffer),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,wn.__webglFramebuffer);for(let ci=0;ci<Ce;ci++)oi&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,D.get(w).__webglTexture,ee,We+ci),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,D.get(X).__webglTexture,ye,xt+ci)),C.blitFramebuffer(Ie,ze,Ae,ve,Ue,tt,Ae,ve,C.DEPTH_BUFFER_BIT,C.NEAREST);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(ee!==0||w.isRenderTargetTexture||D.has(w)){const _t=D.get(w),Tn=D.get(X);x.bindFramebuffer(C.READ_FRAMEBUFFER,O),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,U);for(let ot=0;ot<Ce;ot++)oi?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_t.__webglTexture,ee,We+ot):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,_t.__webglTexture,ee),st?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Tn.__webglTexture,ye,xt+ot):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Tn.__webglTexture,ye),ee!==0?C.blitFramebuffer(Ie,ze,Ae,ve,Ue,tt,Ae,ve,C.COLOR_BUFFER_BIT,C.NEAREST):st?C.copyTexSubImage3D(we,ye,Ue,tt,xt+ot,Ie,ze,Ae,ve):C.copyTexSubImage2D(we,ye,Ue,tt,Ie,ze,Ae,ve);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else st?w.isDataTexture||w.isData3DTexture?C.texSubImage3D(we,ye,Ue,tt,xt,Ae,ve,Ce,it,At,mt.data):X.isCompressedArrayTexture?C.compressedTexSubImage3D(we,ye,Ue,tt,xt,Ae,ve,Ce,it,mt.data):C.texSubImage3D(we,ye,Ue,tt,xt,Ae,ve,Ce,it,At,mt):w.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ye,Ue,tt,Ae,ve,it,At,mt.data):w.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ye,Ue,tt,mt.width,mt.height,it,mt.data):C.texSubImage2D(C.TEXTURE_2D,ye,Ue,tt,Ae,ve,it,At,mt);x.pixelStorei(C.UNPACK_ROW_LENGTH,kt),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Je),x.pixelStorei(C.UNPACK_SKIP_PIXELS,Wt),x.pixelStorei(C.UNPACK_SKIP_ROWS,en),x.pixelStorei(C.UNPACK_SKIP_IMAGES,En),ye===0&&X.generateMipmaps&&C.generateMipmap(we),x.unbindTexture()},this.initRenderTarget=function(w){D.get(w).__webglFramebuffer===void 0&&z.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?z.setTextureCube(w,0):w.isData3DTexture?z.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?z.setTexture2DArray(w,0):z.setTexture2D(w,0),x.unbindTexture()},this.resetState=function(){W=0,V=0,Y=null,x.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const Cs=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],_d=620,ox=560,cx=300,lx=2800,Zc=850,Kc=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Jc=210,jr=300,Qc=.42,el=740,Ns=n=>-(n+1)*_d,dx=n=>n===1?1:1-Math.pow(2,-10*n),Xr=n=>new Promise(e=>setTimeout(e,n)),tl=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function nl(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${tl[t%tl.length]}`)}function ux({onDone:n}){const e=te.useRef(null),t=te.useRef(null),i=te.useRef(null),s=te.useRef(null),r=te.useRef(null),a=te.useRef(null),c=te.useRef(null),d=te.useRef(null),l=te.useRef(null),u=te.useRef(null),m=te.useRef(n);m.current=n,Ja();const h=te.useMemo(()=>nl(16),[]),g=te.useMemo(()=>nl(16),[]);return te.useEffect(()=>{let _=!1,v=!1;const f=()=>{v||(v=!0,m.current())};let p=null;function y(){if(!p)try{const q=window.AudioContext??window.webkitAudioContext;p=new q}catch{}return p}function b(){const q=y();if(!q)return;q.state==="suspended"&&q.resume();const C=q.currentTime,ae=q.createOscillator();ae.type="sine",ae.frequency.setValueAtTime(130,C),ae.frequency.exponentialRampToValueAtTime(42,C+.16);const oe=q.createGain();oe.gain.setValueAtTime(1,C),oe.gain.exponentialRampToValueAtTime(.001,C+.38),ae.connect(oe).connect(q.destination),ae.start(C),ae.stop(C+.42);const E=Math.floor(q.sampleRate*.14),x=q.createBuffer(1,E,q.sampleRate),P=x.getChannelData(0);for(let k=0;k<E;k++)P[k]=(Math.random()*2-1)*Math.pow(1-k/E,2.2);const D=q.createBufferSource();D.buffer=x;const z=q.createBiquadFilter();z.type="lowpass",z.frequency.value=850;const Z=q.createGain();Z.gain.setValueAtTime(.55,C),Z.gain.exponentialRampToValueAtTime(.001,C+.13),D.connect(z).connect(Z).connect(q.destination),D.start(C)}function T(){const q=i.current;q&&(q.currentTime=0,q.play().catch(()=>{}))}const A=t.current,S=(A==null?void 0:A.getContext("2d"))??null;let N=[],M=0;function R(){A&&(A.width=window.innerWidth,A.height=window.innerHeight)}R();function L(q,C){N=[];let ae=0;const oe=6;function E(P,D,z,Z,k,F){const G=3+Math.floor(Math.random()*3),ie=[[P,D]];let ue=z,le=P,ce=D;for(let xe=0;xe<G;xe++){ue+=(Math.random()-.5)*.6;const Se=Z/G;if(le+=Math.cos(ue)*Se,ce+=Math.sin(ue)*Se,ie.push([le,ce]),k>0&&Math.random()<.5){const De=ue+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);E(le,ce,De,Z*(.35+Math.random()*.3),k-1,F*.78)}}N.push({pts:ie,color:Kc[ae++%Kc.length],width:F})}const x=[C*(.06+Math.random()*.1),C*(.84+Math.random()*.1)];for(let P=0;P<oe;P++){const D=q*(.15+Math.random()*.7),z=P<x.length?x[P]:C*(.1+Math.random()*.8),Z=9+Math.floor(Math.random()*6);for(let k=0;k<Z;k++){const F=k/Z*Math.PI*2+(Math.random()-.5)*.4,G=Math.max(q,C)*(.18+Math.random()*.38);E(D,z,F,G,2,.9)}}}function I(q){if(!S||q<=0)return;const C=Math.min(1,q/2.4),ae=Math.round(N.length*C);for(let oe=0;oe<ae;oe++){const E=N[oe];S.lineWidth=E.width*(.9+q*.1),S.strokeStyle=E.color,S.globalAlpha=.75+q*.1,S.shadowColor=E.color,S.shadowBlur=5+q*2.2,S.beginPath(),E.pts.forEach(([x,P],D)=>D===0?S.moveTo(x,P):S.lineTo(x,P)),S.stroke()}S.globalAlpha=1,S.shadowBlur=0}function B(q,C,ae){S&&(S.clearRect(0,0,C,ae),I(q))}function K(){const q=l.current;q&&(q.classList.remove("intro-hit"),q.offsetWidth,q.classList.add("intro-hit"))}function O(){var C,ae,oe,E;const q=(C=r.current)==null?void 0:C.firstElementChild;q&&(q.classList.remove("intro-rgbslam"),q.offsetWidth,q.classList.add("intro-rgbslam")),(ae=r.current)==null||ae.classList.remove("intro-jitter"),(oe=r.current)==null||oe.offsetWidth,(E=r.current)==null||E.classList.add("intro-jitter"),K(),Xe()}async function U(){for(let q=5;q>=1&&!_;q--){const C=r.current;if(!C)return;C.innerHTML="";const ae=document.createElement("div");ae.className="intro-glyph",ae.setAttribute("data-t",String(q)),ae.textContent=String(q),C.appendChild(ae),O(),b(),await ae.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Zc*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Xr(Zc*.3)}}let W=null,V=null,Y=null,re=0,fe=!1,pe=-1;const He=document.createElement("canvas").getContext("2d");He.font=`700 ${Jc}px "Rajdhani", sans-serif`;const Te=[],Be=[];function j(q,C){const ae=Math.ceil(He.measureText(q).width),oe=Math.max(200,ae+120),E=document.createElement("canvas");E.width=oe,E.height=jr;const x=E.getContext("2d");x.font=`700 ${Jc}px "Rajdhani", sans-serif`,x.textAlign="center",x.textBaseline="middle",x.shadowColor=C,x.shadowBlur=56,x.fillStyle="#d24e01",x.fillText(q,oe/2,jr/2);const P=new nd(E);P.anisotropy=4;let D=oe*Qc,z=jr*Qc;if(D>el){const Z=el/D;D*=Z,z*=Z}return{tex:P,worldW:D,worldH:z}}function se(q,C,ae){const{tex:oe,worldW:E,worldH:x}=j(q,ae),P=new Ui(E,x),D=new Un({map:oe,transparent:!0,depthWrite:!1,opacity:0}),z=new lt(P,D);z.position.set(0,10,C),z.visible=!1,V.add(z);const Z=new lt(P,new Un({map:oe,transparent:!0,depthWrite:!1,blending:ti,color:2875596,opacity:0})),k=new lt(P,new Un({map:oe,transparent:!0,depthWrite:!1,blending:ti,color:10116351,opacity:0}));return Z.position.copy(z.position),k.position.copy(z.position),Z.visible=!1,k.visible=!1,V.add(Z),V.add(k),Be.push(P,D,oe,Z.material,k.material),{mesh:z,ghostCy:Z,ghostMg:k}}const $={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Me,Pe;function Le(){const q=e.current;if(!q)return;W=new xd({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),W.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),V=new Kl,V.fog=new ir(263946,.0011),Y=new Bt(62,window.innerWidth/window.innerHeight,1,6e3),Y.position.set(0,0,40),V.add(new cd(928300,1.1));const C=_d*Cs.length+500,ae=900,oe=new Lt,E=new Float32Array(ae*3),x=new Float32Array(ae*3),P=[2875596,15357964,15357964,10116351];for(let k=0;k<ae;k++){const F=60+Math.random()*260,G=Math.random()*Math.PI*2;E[k*3]=Math.cos(G)*F,E[k*3+1]=Math.sin(G)*F,E[k*3+2]=-Math.random()*C;const ie=new qe(P[k%P.length]);x[k*3]=ie.r,x[k*3+1]=ie.g,x[k*3+2]=ie.b}oe.setAttribute("position",new Ut(E,3)),oe.setAttribute("color",new Ut(x,3));const D=new rr({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});V.add(new ho(oe,D)),Be.push(oe,D),Cs.forEach((k,F)=>{const G=Ns(F),ie="#"+k.light.toString(16).padStart(6,"0");Te.push(se(k.text,G,ie));const ue=new ei(k.light,2.4,900,2);ue.position.set(0,40,G+60),V.add(ue)}),Me=new ei(15357964,4,550,2),Pe=new ei(10116351,2.6,550,2),V.add(Me),V.add(Pe),fe=!0,nt();const z=Math.random()*1e3;$.camZ=0;function Z(k){if(!W||!V||!Y)return;{const ue=Math.sin(k*.0016+z)*1.1+Math.sin(k*.0043)*.5,le=Math.cos(k*.002+z)*.9+Math.cos(k*.0038)*.45;Y.position.x=ue+$.camX,Y.position.y=le+6}Y.position.z=$.camZ+$.warpKick;const F=$.yawKick,G=Y.position.x+Math.sin(F)*640;Y.lookAt(G,Y.position.y-4,$.focusZ),Y.rotateZ(-F*.5);const ie=62+$.fovKick*14;Y.fov!==ie&&(Y.fov=ie,Y.updateProjectionMatrix()),Me.position.set(Math.sin(k*6e-4)*80,30,$.camZ-120),Pe.position.set(Math.cos(k*7e-4)*80,-10,$.camZ-200),Te.forEach(ue=>{ue.mesh.visible&&ue.mesh.quaternion.copy(Y.quaternion),ue.ghostCy.visible&&ue.ghostCy.quaternion.copy(Y.quaternion),ue.ghostMg.visible&&ue.ghostMg.quaternion.copy(Y.quaternion)}),W.render(V,Y),re=requestAnimationFrame(Z)}re=requestAnimationFrame(Z)}function nt(){!fe||!W||!Y||(W.setSize(window.innerWidth,window.innerHeight),Y.aspect=window.innerWidth/window.innerHeight,Y.updateProjectionMatrix())}function ke(){nt(),R(),L(window.innerWidth,window.innerHeight),B(M,window.innerWidth,window.innerHeight)}window.addEventListener("resize",ke,{passive:!0});function Ke(q,C=650){const ae=pe;pe=q;const oe=Te[q];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const E=ae>=0?Te[ae]:null,x=performance.now();function P(){const D=Math.min(1,(performance.now()-x)/C);oe.mesh.material.opacity=D,E&&(E.mesh.material.opacity=1-D),D<1?requestAnimationFrame(P):E&&(E.mesh.visible=!1)}P()}function Xe(){if(pe<0)return;const q=Te[pe];if(!q)return;const C=16+Math.random()*14;q.ghostCy.visible=!0,q.ghostCy.material.opacity=.6,q.ghostCy.position.x=-C,q.ghostMg.visible=!0,q.ghostMg.material.opacity=.6,q.ghostMg.position.x=C,setTimeout(()=>{q.ghostCy.material.opacity=0,q.ghostCy.visible=!1,q.ghostCy.position.x=0,q.ghostMg.material.opacity=0,q.ghostMg.visible=!1,q.ghostMg.position.x=0},140+Math.random()*100)}async function Ve(q,C,ae,oe,E){const x=$.camZ,P=$.camX,D=performance.now();return $.warpKick=(Math.random()-.5)*34,$.yawKick=E*oe,$.fovKick=1,new Promise(z=>{function Z(k){const F=Math.min(1,(k-D)/ae),G=dx(F);$.camZ=x+(q-x)*G,$.camX=P+(C-P)*G,$.warpKick*=.92,$.yawKick*=.975,$.fovKick*=.965,F<1?requestAnimationFrame(Z):z()}requestAnimationFrame(Z)})}function ct(q=1,C=420){if(!fe||!S||!e.current)return;const ae=window.innerWidth,oe=window.innerHeight,E=performance.now()+C;function x(){if(performance.now()>E){B(M,ae,oe);return}S.clearRect(0,0,ae,oe),I(M);const D=5+Math.floor(Math.random()*8*q);for(let Z=0;Z<D;Z++){const k=Math.random()*oe,F=4+Math.random()*52*q,G=(Math.random()-.5)*130*q;try{S.drawImage(e.current,0,k,ae,F,G,k,ae,F)}catch{}}const z=Math.round(6*q);S.globalCompositeOperation="screen";for(let Z=0;Z<z;Z++){const k=Math.random()*oe;S.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],S.globalAlpha=.35+Math.random()*.35,S.lineWidth=.6+Math.random()*1.6,S.beginPath(),S.moveTo(0,k),S.lineTo(ae,k),S.stroke()}if(S.globalCompositeOperation="source-over",S.globalAlpha=1,Math.random()<q*.12){S.globalAlpha=.5;for(let Z=0;Z<220;Z++)S.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",S.fillRect(Math.random()*ae,Math.random()*oe,2,2);S.globalAlpha=1}requestAnimationFrame(x)}x()}function dt(q=1,C=340){if(!fe||!S)return;const ae=window.innerWidth,oe=window.innerHeight,E=ae/2,x=oe/2,P=12+Math.floor(10*q),D=Array.from({length:P},()=>Math.random()*Math.PI*2),z=performance.now();function Z(){const F=(performance.now()-z)/C;if(F>=1){B(M,ae,oe);return}S.save(),S.globalCompositeOperation="screen",D.forEach(G=>{const ie=30+F*300,ue=ie+90+Math.random()*150,le=E+Math.cos(G)*ie,ce=x+Math.sin(G)*ie,xe=E+Math.cos(G)*ue,Se=x+Math.sin(G)*ue;S.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",S.globalAlpha=(1-F)*(.28+Math.random()*.32)*q,S.lineWidth=1.2+Math.random()*1.8,S.beginPath(),S.moveTo(le,ce),S.lineTo(xe,Se),S.stroke()}),S.restore(),requestAnimationFrame(Z)}Z()}async function ft(q=900){const C=window.innerWidth,ae=window.innerHeight;if(!S)return;const oe=performance.now(),E=N.map(()=>Math.random()*.25);await new Promise(x=>{function P(){const D=Math.min(1,(performance.now()-oe)/q);S.clearRect(0,0,C,ae),N.forEach((z,Z)=>{const k=Math.min(1,Math.max(0,(D-E[Z])/(1-E[Z])));if(k<=0)return;const F=z.pts,G=F.length-1,ie=k*G;S.lineWidth=z.width*(1+D*.4),S.strokeStyle=z.color,S.globalAlpha=.65+D*.3,S.shadowColor=z.color,S.shadowBlur=3+D*5,S.beginPath(),S.moveTo(F[0][0],F[0][1]);for(let ce=0;ce<Math.floor(ie);ce++)S.lineTo(F[ce+1][0],F[ce+1][1]);const ue=Math.floor(ie),le=ie-ue;if(ue<G&&le>0){const[ce,xe]=F[ue],[Se,De]=F[ue+1];S.lineTo(ce+(Se-ce)*le,xe+(De-xe)*le)}S.stroke()}),S.globalAlpha=1,S.shadowBlur=0,D<1?requestAnimationFrame(P):x()}P()})}async function gt(){var k;K(),(k=r.current)==null||k.classList.add("intro-jitter");const q=u.current;if(!q)return;q.innerHTML="";const C=window.innerWidth,ae=window.innerHeight,oe=11,E=8,x=C/oe,P=ae/E,D=C/2,z=ae/2,Z=[];for(let F=0;F<E;F++)for(let G=0;G<oe;G++){const ie=G*x,ue=F*P,le=()=>(Math.random()-.5)*16,ce=document.createElement("div");ce.className="intro-shard",ce.style.left=ie+"px",ce.style.top=ue+"px",ce.style.width=x+2+"px",ce.style.height=P+2+"px",ce.style.clipPath=`polygon(${le()}px ${le()}px, ${x+le()}px ${le()}px, ${x+le()}px ${P+le()}px, ${le()}px ${P+le()}px)`,q.appendChild(ce);const xe=ie+x/2-D,Se=ue+P/2-z,De=Math.hypot(xe,Se)||1;Z.push({div:ce,dx:xe/De,dy:Se/De,delay:De/Math.max(C,ae)*220+Math.random()*80})}Z.forEach(({div:F,dx:G,dy:ie,delay:ue})=>{const le=60+Math.random()*140,ce=420+Math.random()*420,xe=(Math.random()-.5)*420;F.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${G*le}px, ${ie*le-20}px) rotate(${xe*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${G*le*1.4}px, ${ie*le+ce}px) rotate(${xe}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:ue,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Xr(1600),q.innerHTML=""}async function rt(){var q;if(L(window.innerWidth,window.innerHeight),Le(),s.current&&(s.current.style.display="flex"),await U(),!_){s.current&&(s.current.style.display="none"),(q=c.current)==null||q.classList.add("intro-on"),T();for(let C=0;C<Cs.length&&!_;C++){const ae=Cs[C];M=ae.crack,d.current&&(d.current.innerHTML=ae.final?ae.sub:`${ae.sub} · трещина канала <b>${ae.crack}/4</b>`),Ke(C),$.focusZ=Ns(C);const oe=C%2===0?1:-1,E=ae.final?0:oe*60,x=ae.final?Ns(C)-cx:Ns(C)+ox;if(await Ve(x,E,lx,.5+ae.crack*.09,oe),_)return;O(),ct(Math.min(1,.5+ae.crack*.14),ae.final?300:260),ae.final||dt(.8+ae.crack*.1,320),B(M,window.innerWidth,window.innerHeight)}_||(await ft(900),!_&&(await Xr(150),await gt(),!_&&f()))}}return rt(),()=>{_=!0,window.removeEventListener("resize",ke),cancelAnimationFrame(re),Be.forEach(q=>q.dispose()),W==null||W.dispose(),p==null||p.close().catch(()=>{})}},[]),o.jsx("div",{className:"host-screen grid-bg intro-screen",children:o.jsxs("div",{className:"intro-root",children:[o.jsx("canvas",{ref:e,className:"intro-gl"}),o.jsx("canvas",{ref:t,className:"intro-crack"}),o.jsx("div",{ref:u,className:"intro-shatter-layer"}),o.jsx("div",{className:"intro-vignette"}),o.jsx("div",{className:"intro-scanlines"}),o.jsx("div",{ref:l,className:"intro-noise"}),o.jsx("div",{className:"intro-bracket tl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket tr",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket bl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket br",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-ticker left",children:o.jsx("div",{className:"intro-ticker-col",children:[...h,...h].map((_,v)=>o.jsx("span",{className:v%6===0?"hi":void 0,children:_},v))})}),o.jsx("div",{className:"intro-ticker right",children:o.jsx("div",{className:"intro-ticker-col",children:[...g,...g].map((_,v)=>o.jsx("span",{className:v%5===0?"hi":void 0,children:_},v))})}),o.jsxs("div",{ref:s,className:"intro-stage",children:[o.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),o.jsx("div",{ref:r,className:"intro-frame"}),o.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),o.jsx("div",{ref:c,className:"intro-flight-label",children:o.jsx("div",{ref:d,className:"intro-subline"})}),o.jsx(Qa,{}),o.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const hx=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],qr=[3400,2700,2200,1900],$a=640,il=560,fx=320,sl=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],$r=220,Ps=300,rl=.46,al=820,Wi=n=>-(n+1)*$a,px=n=>n===1?1:1-Math.pow(2,-10*n),ji=n=>new Promise(e=>setTimeout(e,n));function mx(){const n=new Jn,e=[],t=new jn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new fo(.42,.95,12),s=new lt(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new Ai(.42,.36,1.9,12),a=new lt(r,t);a.rotation.x=Math.PI/2,a.position.set(0,0,-.15),n.add(a),e.push(r);const c=new si(.5,.14,1),d=new jn({color:1316636,metalness:.5,roughness:.6}),l=new lt(c,d);l.position.set(.08,.38,-.1),l.rotation.z=.1,n.add(l),e.push(c,d);const u=new jn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),m=new Ys(.13,12,12),h=new lt(m,u);h.position.set(0,-.05,-2),n.add(h),e.push(m,u);const g=new Ys(.06,8,8);[-.22,.22].forEach(R=>{const L=new lt(g,u);L.position.set(R,.12,-1.7),n.add(L)}),e.push(g);const _=new Ai(.06,.06,1.4,6),v=new jn({color:1711394,metalness:.7,roughness:.4});e.push(_,v);const f=new si(.04,.86,.05),p=new jn({color:658447,metalness:.4,roughness:.6});e.push(f,p);const y=new Ai(.5,.5,.07,16),b=new jn({color:1382429,metalness:.6,roughness:.45});e.push(y,b);const T=new po(.6,.09,8,20);e.push(T);function A(R,L){const I=new Jn,B=new lt(_,v);B.rotation.z=Math.PI/2,B.position.set(R*.72,-.08,.15),I.add(B);const K=R*1.45,O=new lt(y,b);O.rotation.x=Math.PI/2,O.position.set(K,-.08,.15),I.add(O);const U=new jn({color:855826,metalness:.75,roughness:.3,emissive:L,emissiveIntensity:1.4}),W=new lt(T,U);W.position.copy(O.position),I.add(W),e.push(U);const V=new Jn;V.position.copy(O.position);for(let Y=0;Y<5;Y++){const re=new lt(f,p);re.rotation.z=Y/5*Math.PI,V.add(re)}return I.add(V),{pod:I,rim:W,spokes:V}}const S=A(-1,2875596),N=A(1,15357964);n.add(S.pod,N.pod);const M=new ei(2875596,2.2,14,2);return M.position.set(0,0,-1.4),n.add(M),{group:n,rotorL:S,rotorR:N,engineLight:M,disposables:e}}function gx(n=60){const e=new Lt,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new Ut(t,3));const r=new rr({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:ti,depthWrite:!1}),a=new ho(e,r);let c=0;function d(u,m,h,g){for(let _=0;_<g;_++){const v=c;c=(c+1)%n,i[v]=.4+Math.random()*.35,t[v*3]=u,t[v*3+1]=m,t[v*3+2]=h,s[v*3]=(Math.random()-.5)*3.2,s[v*3+1]=(Math.random()-.5)*3.2-1,s[v*3+2]=(Math.random()-.5)*3.2}}function l(u){for(let m=0;m<n;m++){if(i[m]<=0){t[m*3+1]=-9999;continue}i[m]-=u,t[m*3]+=s[m*3]*u,t[m*3+1]+=s[m*3+1]*u,t[m*3+2]+=s[m*3+2]*u,i[m]<=0&&(t[m*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:a,geo:e,mat:r,spawn:d,tick:l}}function xx({onDone:n,phases:e=hx}){const t=te.useRef(null),i=te.useRef(null),s=te.useRef(null),r=te.useRef(null),a=te.useRef(null),c=te.useRef(null),d=te.useRef(null),l=te.useRef(n);l.current=n;const u=te.useRef(e);u.current=e;const m=te.useRef(()=>{});Ja();const h=te.useMemo(()=>e.map(g=>g.text).join(" → "),[e]);return te.useEffect(()=>{let g=!1,_=!1;const v=()=>{_||(_=!0,l.current())};m.current=v;const f=u.current,p=d.current,y=i.current,b=(y==null?void 0:y.getContext("2d"))??null;let T=[],A=0;function S(){y&&(y.width=window.innerWidth,y.height=window.innerHeight)}S();function N(q,C){T=[];let ae=0;const oe=7;function E(P,D,z,Z,k,F){const G=3+Math.floor(Math.random()*4),ie=[[P,D]];let ue=z,le=P,ce=D;for(let xe=0;xe<G;xe++){ue+=(Math.random()-.5)*.9;const Se=Z/G*(.55+Math.random()*.85);if(le+=Math.cos(ue)*Se,ce+=Math.sin(ue)*Se,ie.push([le,ce]),k>0&&Math.random()<.58){const De=ue+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);E(le,ce,De,Z*(.3+Math.random()*.35),k-1,F*.76)}}T.push({pts:ie,color:sl[ae++%sl.length],width:F})}for(let P=0;P<oe;P++){const D=q*(.1+Math.random()*.8),z=C*(.08+Math.random()*.84),Z=7+Math.floor(Math.random()*7);let k=Math.random()*Math.PI*2;for(let F=0;F<Z;F++){k+=Math.PI*2/Z*(.55+Math.random()*.9);const G=Math.max(q,C)*(.16+Math.random()*.46);E(D,z,k,G,2,.9)}}T.slice().forEach(P=>{if(P.pts.length<3||Math.random()>=.55)return;const[D,z]=P.pts[1+Math.floor(Math.random()*(P.pts.length-2))];E(D,z,Math.random()*Math.PI*2,Math.max(q,C)*(.08+Math.random()*.22),1,.55)})}function M(q){if(!b||q<=0)return;const C=Math.min(1,q/2.5),ae=Math.round(T.length*C);for(let oe=0;oe<ae;oe++){const E=T[oe];b.lineWidth=E.width*(.9+q*.1),b.strokeStyle=E.color,b.globalAlpha=.7+q*.07,b.shadowColor=E.color,b.shadowBlur=5+q*2.4,b.beginPath(),E.pts.forEach(([x,P],D)=>D===0?b.moveTo(x,P):b.lineTo(x,P)),b.stroke()}b.globalAlpha=1,b.shadowBlur=0}function R(q,C,ae){b&&(b.clearRect(0,0,C,ae),M(q))}function L(q=!1){const C=a.current;if(!C)return;const ae=q?"fincine-hit-big":"fincine-hit";C.classList.remove("fincine-hit","fincine-hit-big"),C.offsetWidth,C.classList.add(ae)}function I(){p&&(p.currentTime=0,p.play().catch(()=>{}))}let B=null,K=null,O=null,U=0,W=!1,V=-1;const re=document.createElement("canvas").getContext("2d");re.font=`700 ${$r}px "Rajdhani", sans-serif`;const fe=[],pe=[];function Ee(q,C,ae=1){const oe=q.toUpperCase(),E=$r*.05,x=Math.ceil(re.measureText(oe).width),P=Math.max(200,x+140+E*2),D=document.createElement("canvas");D.width=P,D.height=Ps;const z=D.getContext("2d");z.font=`700 ${$r}px "Rajdhani", sans-serif`,z.textAlign="center",z.textBaseline="middle",z.lineJoin="round",z.shadowColor=C,z.shadowBlur=60,z.strokeStyle="#eef6f4",z.lineWidth=E,z.strokeText(oe,P/2,Ps/2),z.fillStyle="#eef6f4",z.fillText(oe,P/2,Ps/2);const Z=new nd(D);Z.anisotropy=4;let k=P*rl*ae,F=Ps*rl*ae;if(k>al*ae){const G=al*ae/k;k*=G,F*=G}return{tex:Z,worldW:k,worldH:F}}function He(q,C,ae,oe){const{tex:E,worldW:x,worldH:P}=Ee(q,ae,oe),D=new Ui(x,P),z=new Un({map:E,transparent:!0,depthWrite:!1,opacity:0}),Z=new lt(D,z);Z.position.set(0,8,C),Z.visible=!1,K.add(Z);const k=new lt(D,new Un({map:E,transparent:!0,depthWrite:!1,blending:ti,color:2875596,opacity:0})),F=new lt(D,new Un({map:E,transparent:!0,depthWrite:!1,blending:ti,color:16723804,opacity:0}));return k.position.copy(Z.position),F.position.copy(Z.position),k.visible=!1,F.visible=!1,K.add(k),K.add(F),pe.push(D,z,E,k.material,F.material),{mesh:Z,ghostCy:k,ghostMg:F}}const Te={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let Be,j,se=null,$=null,Me=0;function Pe(){const q=t.current;if(!q)return;B=new xd({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),B.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),K=new Kl,K.fog=new ir(263946,.0012),O=new Bt(58,window.innerWidth/window.innerHeight,1,6e3),O.position.set(0,0,40),K.add(new cd(928300,1));const C=$a*f.length+600,ae=700,oe=new Lt,E=new Float32Array(ae*3),x=new Float32Array(ae*3),P=[2875596,10116351,15357964];for(let k=0;k<ae;k++){const F=60+Math.random()*280,G=Math.random()*Math.PI*2;E[k*3]=Math.cos(G)*F,E[k*3+1]=Math.sin(G)*F,E[k*3+2]=-Math.random()*C;const ie=new qe(P[k%P.length]);x[k*3]=ie.r,x[k*3+1]=ie.g,x[k*3+2]=ie.b}oe.setAttribute("position",new Ut(E,3)),oe.setAttribute("color",new Ut(x,3));const D=new rr({size:3,vertexColors:!0,transparent:!0,opacity:.8});K.add(new ho(oe,D)),pe.push(oe,D),f.forEach((k,F)=>{const G=Wi(F),ie="#"+k.light.toString(16).padStart(6,"0");fe.push(He(k.text,G,ie,k.final?1.35:1));const ue=new ei(k.light,2.6,950,2);ue.position.set(0,40,G+60),K.add(ue)}),Be=new ei(15357964,3.4,550,2),j=new ei(10116351,2.2,550,2),K.add(Be),K.add(j),se=mx(),O.add(se.group),se.group.position.set(1.3,-1,-6.5),$=gx(),se.group.add($.points),pe.push($.geo,$.mat),K.add(O),W=!0,Le();const z=Math.random()*1e3;Te.camZ=-$a*.6;function Z(k){if(!B||!K||!O||!se||!$)return;const F=Me?Math.min(.05,(k-Me)/1e3):.016;Me=k;const G=.15+Math.min(1,Math.max(0,(V+1)/f.length))*.85,ie=Te.impactT;ie>0&&(Te.impactT=Math.max(0,ie-F));const ue=Math.sin(k*.0016+z)*(1+G*2.2+ie*6)+Math.sin(k*.0043)*.5*G,le=Math.cos(k*.002+z)*(.9+G*1.8+ie*5)+Math.cos(k*.0038)*.45*G;O.position.x=ue+Te.camX,O.position.y=le+6,O.position.z=Te.camZ+Te.warpKick;const ce=Te.yawKick,xe=O.position.x+Math.sin(ce)*640,Se=Te.focusY??O.position.y-4;O.lookAt(xe,Se,Te.focusZ),O.rotateZ(-ce*.55);const De=58+Te.fovKick*(14+G*10)+ie*24;Math.abs(O.fov-De)>.01&&(O.fov=De,O.updateProjectionMatrix()),Be.position.set(Math.sin(k*6e-4)*80,30,Te.camZ-120),j.position.set(Math.cos(k*7e-4)*80,-10,Te.camZ-200),Te.droneRoll=Te.droneRoll*.9+-ce*1.4*.1;const H=1.6+G*2.4;Te.droneBob=Math.sin(k*.001*H)*(.12+G*.35),se.group.rotation.z=Te.droneRoll*.6+(ie>0?Math.sin(k*.09)*1.15*ie:0),se.group.rotation.x=Math.sin(k*.0013)*.06*(1+G)+(ie>0?Math.cos(k*.11)*.75*ie:0);const ge=F*(6+G*10);se.rotorR.spokes.rotation.z+=ge;let de=-1+Te.droneBob;Te.engineOutT>0?(Te.engineOutT-=F,de-=1-Math.max(0,Te.engineOutT)/.5<1?Math.sin((.5-Te.engineOutT)*9)*.4:0,se.rotorL.spokes.rotation.z+=ge*.12,se.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&$.spawn(-1.45,-.08,.15,2)):(se.rotorL.spokes.rotation.z+=ge,se.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(k*.01)*.3),se.group.position.y=de,se.group.position.x=1.3+Math.sin(k*9e-4)*.25*(1+G),se.group.position.z=-6.5-(ie>0?ie*2.6:0),$.tick(F),fe.forEach(me=>{me.mesh.visible&&me.mesh.quaternion.copy(O.quaternion),me.ghostCy.visible&&me.ghostCy.quaternion.copy(O.quaternion),me.ghostMg.visible&&me.ghostMg.quaternion.copy(O.quaternion)}),B.render(K,O),U=requestAnimationFrame(Z)}U=requestAnimationFrame(Z)}function Le(){!W||!B||!O||(B.setSize(window.innerWidth,window.innerHeight),O.aspect=window.innerWidth/window.innerHeight,O.updateProjectionMatrix())}function nt(){Le(),S(),N(window.innerWidth,window.innerHeight),R(A,window.innerWidth,window.innerHeight)}window.addEventListener("resize",nt,{passive:!0});function ke(q,C=600){const ae=V;V=q;const oe=fe[q];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const E=ae>=0?fe[ae]:null,x=performance.now();function P(){const D=Math.min(1,(performance.now()-x)/C);oe.mesh.material.opacity=D,E&&(E.mesh.material.opacity=1-D),D<1?requestAnimationFrame(P):E&&(E.mesh.visible=!1)}P()}function Ke(q=.5){if(V<0)return;const C=fe[V];if(!C)return;const ae=(14+Math.random()*12)*(.7+q*.6),oe=Math.min(1,.45+q*.3);C.ghostCy.visible=!0,C.ghostCy.material.opacity=oe,C.ghostCy.position.x=-ae,C.ghostMg.visible=!0,C.ghostMg.material.opacity=oe,C.ghostMg.position.x=ae,setTimeout(()=>{C.ghostCy.material.opacity=0,C.ghostCy.visible=!1,C.ghostCy.position.x=0,C.ghostMg.material.opacity=0,C.ghostMg.visible=!1,C.ghostMg.position.x=0},(120+Math.random()*90)*(.8+q*.5)),q>.75&&Math.random()<.65&&setTimeout(()=>Ke(q*.55),70+Math.random()*70)}async function Xe(q,C,ae,oe,E){const x=Te.camZ,P=Te.camX,D=performance.now();return Te.warpKick=(Math.random()-.5)*40,Te.yawKick=E*oe,Te.fovKick=1,new Promise(z=>{function Z(k){if(g){z();return}const F=Math.min(1,(k-D)/ae),G=px(F);Te.camZ=x+(q-x)*G,Te.camX=P+(C-P)*G,Te.warpKick*=.91,Te.yawKick*=.972,Te.fovKick*=.96,F<1?requestAnimationFrame(Z):z()}requestAnimationFrame(Z)})}function Ve(q=1,C=420){if(!W||!b||!t.current)return;const ae=window.innerWidth,oe=window.innerHeight,E=performance.now()+C;function x(){if(performance.now()>E){R(A,ae,oe);return}b.clearRect(0,0,ae,oe),M(A);const D=5+Math.floor(Math.random()*9*q);for(let Z=0;Z<D;Z++){const k=Math.random()*oe,F=4+Math.random()*56*q,G=(Math.random()-.5)*150*q;try{b.drawImage(t.current,0,k,ae,F,G,k,ae,F)}catch{}}b.globalCompositeOperation="screen";const z=Math.round(6*q);for(let Z=0;Z<z;Z++){const k=Math.random()*oe;b.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],b.globalAlpha=.35+Math.random()*.35,b.lineWidth=.6+Math.random()*1.8,b.beginPath(),b.moveTo(0,k),b.lineTo(ae,k),b.stroke()}if(b.globalCompositeOperation="source-over",b.globalAlpha=1,Math.random()<q*.14){b.globalAlpha=.5;for(let Z=0;Z<240;Z++)b.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",b.fillRect(Math.random()*ae,Math.random()*oe,2,2);b.globalAlpha=1}requestAnimationFrame(x)}x()}function ct(q=1,C=340){if(!W||!b)return;const ae=window.innerWidth,oe=window.innerHeight,E=ae/2,x=oe/2,P=14+Math.floor(14*q),D=Array.from({length:P},()=>Math.random()*Math.PI*2),z=performance.now();function Z(){const F=(performance.now()-z)/C;if(F>=1){R(A,ae,oe);return}b.save(),b.globalCompositeOperation="screen",D.forEach(G=>{const ie=30+F*340,ue=ie+100+Math.random()*170,le=E+Math.cos(G)*ie,ce=x+Math.sin(G)*ie,xe=E+Math.cos(G)*ue,Se=x+Math.sin(G)*ue;b.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",b.globalAlpha=(1-F)*(.3+Math.random()*.34)*q,b.lineWidth=1.2+Math.random()*2,b.beginPath(),b.moveTo(le,ce),b.lineTo(xe,Se),b.stroke()}),b.restore(),requestAnimationFrame(Z)}Z()}async function dt(q=900){const C=window.innerWidth,ae=window.innerHeight;if(!b)return;const oe=performance.now(),E=T.map(()=>Math.random()*.25);await new Promise(x=>{function P(){if(g){x();return}const D=Math.min(1,(performance.now()-oe)/q);b.clearRect(0,0,C,ae),T.forEach((z,Z)=>{const k=Math.min(1,Math.max(0,(D-E[Z])/(1-E[Z])));if(k<=0)return;const F=z.pts,G=F.length-1,ie=k*G;b.lineWidth=z.width*(1+D*.45),b.strokeStyle=z.color,b.globalAlpha=.65+D*.32,b.shadowColor=z.color,b.shadowBlur=3+D*6,b.beginPath(),b.moveTo(F[0][0],F[0][1]);for(let ce=0;ce<Math.floor(ie);ce++)b.lineTo(F[ce+1][0],F[ce+1][1]);const ue=Math.floor(ie),le=ie-ue;if(ue<G&&le>0){const[ce,xe]=F[ue],[Se,De]=F[ue+1];b.lineTo(ce+(Se-ce)*le,xe+(De-xe)*le)}b.stroke()}),b.globalAlpha=1,b.shadowBlur=0,D<1?requestAnimationFrame(P):x()}P()})}async function ft(){Te.impactT=.55,L(!0),$&&($.spawn(0,-.05,-2,28),$.spawn(-1.45,-.08,.15,16),$.spawn(1.45,-.08,.15,16)),Ve(1.6,340),ct(1.4,260),await ji(160)}async function gt(){L(!0);const q=c.current;if(!q)return;q.innerHTML="";const C=window.innerWidth,ae=window.innerHeight,oe=12,E=8,x=C/oe,P=ae/E,D=C/2,z=ae/2,Z=[];for(let k=0;k<E;k++)for(let F=0;F<oe;F++){const G=F*x,ie=k*P,ue=()=>(Math.random()-.5)*16,le=document.createElement("div");le.className="fincine-shard",le.style.left=G+"px",le.style.top=ie+"px",le.style.width=x+2+"px",le.style.height=P+2+"px",le.style.clipPath=`polygon(${ue()}px ${ue()}px, ${x+ue()}px ${ue()}px, ${x+ue()}px ${P+ue()}px, ${ue()}px ${P+ue()}px)`,q.appendChild(le);const ce=G+x/2-D,xe=ie+P/2-z,Se=Math.hypot(ce,xe)||1;Z.push({div:le,dx:ce/Se,dy:xe/Se,delay:Se/Math.max(C,ae)*200+Math.random()*70})}Z.forEach(({div:k,dx:F,dy:G,delay:ie})=>{const ue=70+Math.random()*160,le=460+Math.random()*460,ce=(Math.random()-.5)*460;k.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${F*ue}px, ${G*ue-22}px) rotate(${ce*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${F*ue*1.4}px, ${G*ue+le}px) rotate(${ce}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:ie,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await ji(1530),q.innerHTML=""}async function rt(){if(N(window.innerWidth,window.innerHeight),Pe(),I(),s.current&&s.current.classList.add("fincine-on"),await ji(900),!g){for(let q=0;q<f.length&&!g;q++){const C=f[q];A=C.crack,r.current&&(r.current.innerHTML=C.final?C.sub:`${C.sub} · рассинхрон канала <b>${C.crack}/4</b>`),ke(q),Te.focusZ=Wi(q),C.final&&(Te.focusY=8);const ae=q%2===0?1:-1;if(C.final){const oe=Wi(q)+il+280;if(await Xe(oe,0,qr[q]??2200,.35,ae),g||(Ke(.4+C.crack*.2),Ve(Math.min(1.5,.45+C.crack*.27),300),R(A,window.innerWidth,window.innerHeight),await ji(700),await Xe(Wi(q)-fx,-150,950,.5,ae),g))return}else{const oe=ae*70,E=Wi(q)+il;if(C.crack>=2&&setTimeout(()=>{g||(Te.engineOutT=.5)},qr[q]*.4),await Xe(E,oe,qr[q]??2200,.55+C.crack*.1,ae),g)return}Ke(.4+C.crack*.2),Ve(Math.min(1.5,.45+C.crack*.27),C.final?360:240+C.crack*30),C.final||ct(.8+C.crack*.2,300+C.crack*20),C.crack>=3&&L(!0),R(A,window.innerWidth,window.innerHeight)}g||(await ft(),!g&&(await dt(850),!g&&(await ji(140),await gt(),!g&&v())))}}return rt(),()=>{g=!0,window.removeEventListener("resize",nt),cancelAnimationFrame(U),pe.forEach(q=>q.dispose()),se==null||se.disposables.forEach(q=>q.dispose()),B==null||B.dispose();try{p==null||p.pause()}catch{}}},[]),o.jsxs("div",{className:"fincine-root",onClick:()=>m.current(),children:[o.jsx("canvas",{ref:t,className:"fincine-gl"}),o.jsx("canvas",{ref:i,className:"fincine-crack"}),o.jsx("div",{ref:c,className:"fincine-shatter-layer"}),o.jsx("div",{className:"fincine-vignette"}),o.jsx("div",{className:"fincine-scanlines"}),o.jsx("div",{ref:a,className:"fincine-noise"}),o.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!h,children:[o.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),o.jsx("div",{ref:r,className:"fincine-sub"})]}),o.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),o.jsx(Qa,{}),o.jsx("audio",{ref:d,src:"/quiz-party/intro.mp3",preload:"auto"})]})}async function _x(n,e){var i;await Fn.from("game_sessions").update({melody:{}}).eq("id",zs());const t=Sl(e,n.round_number,"show_answers");if(t.kind==="scoreboard")return void _l();if(t.kind==="break")return void vl();if(t.kind==="finale")return void er(n.pack_id,((i=e.settings)==null?void 0:i.play_mode)==="paper");await Fn.from("game_sessions").update({phase:"round_intro",round_number:n.round_number+1,question_index:0,timer_started_at:null,reveal:!1,melody:{}}).eq("id",zs())}let Ot=null;function vx(){Ot||(Ot=Et(),Ot.play().catch(()=>{}),Ot.pause())}function Ls(n){return Ot||(Ot=Et()),Ot.pause(),Ot.loop=!1,Ot.volume=1,Rl(Ot,n),Ot}function Mx(){if(Ot)try{Ot.pause(),Ot.currentTime=0}catch{}}const Xn=n=>new Date(Date.now()+n*1e3).toISOString();function Sx({src:n}){return te.useEffect(()=>{const e=Et();e.src=n,e.currentTime=0;let t=!1;e.play().then(()=>{if(t)try{e.pause(),e.src=""}catch{}}).catch(()=>{});const i=setTimeout(()=>{try{e.pause()}catch{}},15e3);return()=>{t=!0,clearTimeout(i);try{e.pause(),e.src=""}catch{}}},[n]),o.jsx("div",{className:"mel-reveal-track",children:"♪ играет 15 секунд"})}function yx({pack:n,round:e,gameState:t}){var Y,re,fe,pe,Ee,He,Te,Be;const i=e.settings,s=i.themes??[],r=t.melody??{},a=un(t.game_id),c=zn(t.game_id,t.round_number),d=r.played??[],l=te.useRef(null),[u,m]=te.useState(Date.now());te.useEffect(()=>{const j=setInterval(()=>m(Date.now()),200);return()=>clearInterval(j)},[]);const h=r.deadline?new Date(r.deadline).getTime():0,g=h?Math.max(0,Math.ceil((h-u)/1e3)):0,_=te.useRef(0);te.useEffect(()=>{_.current=0},[r.stage,r.key]),g>_.current&&(_.current=g);const v=_.current,f=!!h&&u>=h,[p,y]=(r.key??"0-0").split("-").map(Number),b=(Y=s[p])==null?void 0:Y.tracks[y],T=`q-mel-${r.key}-bid`,A=`q-mel-${r.key}`,S=c.filter(j=>j.question_ref===T);te.useEffect(()=>{if(r.stage!=="bids")return;const j=S.map($=>({id:$.team_id,sec:Number($.answer_text)||99,at:$.updated_at})).sort(($,Me)=>$.sec-Me.sec||+new Date($.at)-+new Date(Me.at)).map($=>$.id),se=[...j,...a.map($=>$.id).filter($=>!j.includes($))];JSON.stringify(se)!==JSON.stringify(r.order)&&Mt({...r,order:se,turn:0})},[r.stage,S.map(j=>`${j.team_id}:${j.answer_text}`).join("|")]),te.useEffect(()=>{if(r.stage!=="snippet")return;const j=r.snippetSec??5,se=window.setTimeout(()=>{Mt({...r,stage:"answering",deadline:Xn(i.answerSec??30)})},(j+10)*1e3);return()=>clearTimeout(se)},[r.stage,r.key,r.snippetSec]),te.useEffect(()=>{if(r.stage!=="snippet"||!(b!=null&&b.audio)||document.hidden)return;const j=r.snippetSec??5,se=Ls(je(b.audio));l.current=se;let $,Me=!1;const Pe=()=>{Me||(Me=!0,se.pause(),Mt({...r,stage:"answering",deadline:Xn(i.answerSec??30)}))};se.addEventListener("playing",()=>{Mt({...r,deadline:Xn(j)}),$=window.setTimeout(Pe,j*1e3)},{once:!0});const Le=window.setTimeout(Pe,(j+4)*1e3);return()=>{$&&clearTimeout($),clearTimeout(Le)}},[r.stage,r.key]),te.useEffect(()=>{if(!(!f||document.hidden))if(r.stage==="spinning")Mt({...r,stage:"listen",deadline:Xn(2)});else if(r.stage==="bidding"){const j=S.map($=>({id:$.team_id,sec:Number($.answer_text)||99,at:$.updated_at})).sort(($,Me)=>$.sec-Me.sec||+new Date($.at)-+new Date(Me.at)).map($=>$.id),se=[...j,...a.map($=>$.id).filter($=>!j.includes($))];Mt({...r,stage:"bids",order:se,turn:0,deadline:void 0})}else(r.stage==="answering"||r.stage==="passed")&&(c.some(se=>{var $,Me;return se.question_ref===`q-mel-${r.key}`&&se.team_id===(($=r.order)==null?void 0:$[r.turn??0])&&!!((Me=se.answer_text)!=null&&Me.trim())})?Mt({...r,deadline:void 0}):(Mx(),Mt(nu(r))))},[f,r.stage,c]),te.useEffect(()=>{if(r.stage!=="listen"||!(b!=null&&b.audio)||document.hidden)return;const j=Ls(je(b.audio));l.current=j;let se,$=!1;const Me=()=>{$||($=!0,j.pause(),Mt({...r,stage:"bidding",deadline:Xn(i.bidSec??10)}))};j.addEventListener("playing",()=>{se=window.setTimeout(Me,1e3)},{once:!0});const Pe=window.setTimeout(Me,4e3);return()=>{se&&clearTimeout(se),clearTimeout(Pe)}},[r.stage,r.key]),te.useEffect(()=>{var $;const j=e.settings.bg_music??(($=n.settings)==null?void 0:$.bg_music);if(r.stage!=="answering"&&r.stage!=="bidding"||!j||document.hidden)return;const se=Ls(je(j));return se.loop=!0,se.volume=.45,()=>{se.pause(),se.loop=!1,se.volume=1}},[r.stage]),te.useEffect(()=>{if(r.stage!=="passed"||r.deadline||!(b!=null&&b.audio)||document.hidden)return;const j=Ls(je(b.audio));return l.current=j,j.onended=()=>void Mt({...r,deadline:Xn(i.passAnswerSec??10)}),()=>{j.pause(),j.onended=null}},[r.stage]);const[N,M]=te.useState(!1);if(s.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"УГАДАЙ МЕЛОДИЮ"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"})]});const R=iu(s,d),L=su(r),I=j=>{M(!1),Mt({...r,key:j,stage:"listen",deadline:Xn(3),order:void 0,turn:0,chooser:void 0})},B=()=>{const j=R[Math.floor(Math.random()*R.length)];Mt(lu(r,j,R.length,i.spinSec??5))},K=(re=r.order)==null?void 0:re[r.turn??0],O=a.find(j=>j.id===K),U=Number((fe=S.find(j=>j.team_id===K))==null?void 0:fe.answer_text)||0,W=c.find(j=>j.question_ref===A&&j.team_id===K),V=async j=>{W&&await du(r,W,j,U)};return o.jsxs("div",{className:"host-screen grid-bg mel-screen",onPointerDown:vx,children:[o.jsx(bx,{themes:s,played:d,spinning:r.stage==="spinning",spinKey:r.key,spinLeft:g,spinTotal:i.spinSec??10,onPick:N?I:void 0}),L&&o.jsx("div",{className:"host-actions",children:R.length>0?N?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ ПЛИТКУ НА ЭКРАНЕ"}),o.jsx("button",{className:"ghost",onClick:()=>M(!1),children:"Отмена"})]}):o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:B,children:d.length===0?"Стартуем!":"Рулетка"}),o.jsx("button",{className:"ghost",onClick:()=>M(!0),children:"Выбрать вручную"})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВСЕ ТРЕКИ ОТЫГРАНЫ"}),o.jsx("button",{onClick:()=>void _x(t,n),children:"Завершить раунд →"})]})}),r.stage&&!L&&r.stage!=="spinning"&&gl.createPortal(o.jsx("div",{className:`mel-overlay theme-${n.theme??"classic"}`,children:o.jsxs("div",{className:"mel-modal",children:[o.jsxs("div",{className:"mel-modal-head",children:[o.jsxs("div",{className:"mel-modal-theme",children:[(pe=s[p])==null?void 0:pe.name," · трек ",y+1]}),!!h&&o.jsx("div",{className:"mel-count",children:n.theme==="potter"?o.jsx(Nl,{left:g,seconds:v,low:g<=5}):g})]}),r.stage==="listen"&&o.jsx("div",{className:"mel-big",children:"СЛУШАЕМ 1 СЕКУНДУ…"}),r.stage==="bidding"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mel-big",children:"ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?"}),o.jsx("div",{className:"mel-points-hint",children:"2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0.5 балла"}),o.jsx("div",{className:"mel-bids",children:[...a].sort((j,se)=>j.name.localeCompare(se.name)).map(j=>{const se=S.find($=>$.team_id===j.id);return o.jsxs("div",{className:`mel-bid-row${se?" win":""}`,children:[o.jsx("span",{style:{color:j.color},children:j.name}),o.jsx("b",{children:se?"ставка принята ✓":"…"}),o.jsx("span",{})]},j.id)})})]}),r.stage==="bids"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"СТАВКИ КОМАНД"}),o.jsxs("div",{className:"mel-bids",children:[(r.order??[]).map((j,se)=>{const $=a.find(Pe=>Pe.id===j),Me=S.find(Pe=>Pe.team_id===j);return o.jsxs("div",{className:`mel-bid-row${se===0?" win":""}`,children:[o.jsx("span",{style:{color:$==null?void 0:$.color},children:$==null?void 0:$.name}),o.jsxs("b",{children:[Me==null?void 0:Me.answer_text," сек"]}),se===0?o.jsx("span",{className:"mel-win-tag",children:"ИГРАЕТ"}):o.jsx("span",{})]},j)}),(r.order??[]).length===0&&o.jsx("div",{style:{opacity:.6},children:"ставок нет"})]}),o.jsxs("div",{className:"mel-actions",children:[o.jsxs("button",{disabled:!K,onClick:()=>void Mt(ru(r,U)),children:["Играем ",U||5," сек →"]}),o.jsx("button",{className:"ghost dark",onClick:()=>void Mt(Fo(r)),children:"Пропустить трек"})]})]}),r.stage==="snippet"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:O==null?void 0:O.color},children:[O==null?void 0:O.name," · играет ",U," сек"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void Mt(au(r,i.answerSec??30)),children:"Принимаем ответ →"})})]}),r.stage==="reveal"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"answer-reveal",style:{padding:"18px 28px"},children:[o.jsxs("div",{className:"answer-label",children:["ВЕРНО ✓ · +",r.wonPts??0]}),o.jsx("div",{className:"answer-main",children:b==null?void 0:b.correct})]}),(b==null?void 0:b.audio)&&o.jsx(Sx,{src:je(b.audio)}),o.jsxs("div",{className:"mel-big",style:{color:(Ee=a.find(j=>j.id===r.wonTeam))==null?void 0:Ee.color},children:[(He=a.find(j=>j.id===r.wonTeam))==null?void 0:He.name," забирает баллы"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void Mt(ou(r)),children:"К доске →"})})]}),r.stage!=="reveal"&&r.stage!=="done"&&o.jsx("button",{className:"mel-escape",onClick:async()=>{confirm(`Закрыть трек и вернуться к доске?

Баллы за него никто не получит.`)&&await Mt(Fo(r))},children:"Закрыть"}),(r.stage==="answering"||r.stage==="passed")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:O==null?void 0:O.color},children:[r.stage==="passed"?"ХОД ПЕРЕДАН · ":"",(O==null?void 0:O.name)??"—"]}),o.jsx("div",{className:"mel-points-hint",children:r.stage==="passed"?"за верный ответ — 0.5 балла":`ставка ${U} сек → за верный ответ ${U<=5?2:1} балла`}),o.jsx("div",{className:"mel-answer",children:W!=null&&W.answer_text?o.jsxs(o.Fragment,{children:["Ответ: ",o.jsx("b",{children:W.answer_text})]}):o.jsx("span",{style:{opacity:.6},children:"ждём ответ…"})}),(W==null?void 0:W.is_correct)===!0&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ВЕРНО ✓"}),o.jsx("div",{className:"answer-main",children:b==null?void 0:b.correct})]}),(W==null?void 0:W.is_correct)===!1&&o.jsxs("div",{className:"mel-wrong",children:["✗ НЕВЕРНО · ответ не раскрываем",(r.turn??0)===0&&(((Te=r.order)==null?void 0:Te.length)??0)>1?" — передайте ход второй команде":" — трек закрывается"]}),o.jsxs("div",{className:"mel-actions",children:[o.jsx("button",{disabled:!W,onClick:()=>void V(!0),children:"✓ Верно"}),o.jsx("button",{className:"ghost",onClick:()=>void cu(r,W),children:(r.turn??0)===0&&(((Be=r.order)==null?void 0:Be.length)??0)>1?"✗ Передать ход →":"✗ Закрыть трек"})]})]})]})}),document.body)]})}function bx({themes:n,played:e,spinning:t,spinKey:i,spinLeft:s,spinTotal:r,onPick:a}){const d=n.flatMap((g,_)=>g.tracks.map((v,f)=>`${_}-${f}`)).filter(g=>!e.includes(g)),[l,u]=te.useState(0),m=te.useRef(s);m.current=s,te.useEffect(()=>{if(!t||d.length===0||s<=0)return;let g=!1,_;const v=()=>{if(g)return;u(p=>{let y=Math.floor(Math.random()*d.length);return d.length>1&&y===p&&(y=(y+1)%d.length),y});const f=1-Math.max(0,m.current)/Math.max(1,r);_=window.setTimeout(v,180+f*f*720)};return _=window.setTimeout(v,180),()=>{g=!0,_&&clearTimeout(_)}},[t]);const h=t?s<=1?i:d[l%Math.max(1,d.length)]:void 0;return o.jsxs("div",{className:"mel-board",style:{gridTemplateColumns:`repeat(${n.length}, minmax(0,1fr))`,gridTemplateRows:`auto repeat(${Math.max(...n.map(g=>g.tracks.length),1)}, minmax(0, 1fr))`},children:[n.map((g,_)=>o.jsx("div",{className:"mel-theme",children:g.name||`Тема ${_+1}`},`h${_}`)),n.map((g,_)=>g.tracks.map((v,f)=>{const p=`${_}-${f}`,y=e.includes(p),b=h===p;return o.jsx("div",{className:`mel-tile${y?" done":""}${b?" spin":""}${a&&!y?" pickable":""}`,onClick:a&&!y?()=>a(p):void 0,"data-c":String(_%4),style:{gridColumn:_+1,gridRow:f+2},children:o.jsx("span",{className:"mel-face",children:y?"":f+1})},p)}))]})}const ol=[{body:"#f2e3c9",mask:"#b99a7d",name:"кремовый"},{body:"#8a5a33",mask:"#4c2f17",name:"тигровый"},{body:"#3b3b40",mask:"#232326",name:"чёрный"},{body:"#e8e2d8",mask:"#c96f3b",name:"бело-рыжий"},{body:"#9aa7b5",mask:"#6c7886",name:"голубой"}];function Ex(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Tx(n,e){const t=Ex(n),i=8,s=Array.from({length:5},()=>{const v=Array.from({length:i},()=>.45+t()*.9),f=v.reduce((p,y)=>p+y,0);return{speeds:v,total:f}}),r=Math.max(...s.map(v=>v.total)),a=s.map(v=>e*.92*(r/v.total)),c=(v,f)=>{const p=a[v],b=Math.min(1,Math.max(0,f/p))*i,T=Math.floor(b),A=b-T;let S=0;for(let N=0;N<T;N++)S+=s[v].speeds[N];return S+=(s[v].speeds[Math.min(T,i-1)]??0)*A,Math.min(1,S/s[v].total)},d=["🦋","💤","🐦","🍂"],l=Array.from({length:5},()=>{const v=[];return t()<.6&&v.push({at:(.25+t()*.3)*e,dur:.6+t()*.9,icon:d[Math.floor(t()*d.length)]}),t()<.25&&v.push({at:(.62+t()*.22)*e,dur:.5+t()*.7,icon:d[Math.floor(t()*d.length)]}),v}),u=(v,f)=>l[v].find(p=>f>=p.at&&f<p.at+p.dur),m=(v,f)=>{let p=0;for(const y of l[v])p+=Math.min(Math.max(0,f-y.at),y.dur);return f-p},h=(v,f)=>c(v,m(v,f)),g=a.map((v,f)=>v+l[f].reduce((p,y)=>p+y.dur,0)),_=g.map((v,f)=>({i:f,f:v})).sort((v,f)=>v.f-f.f).map(v=>v.i);return{progress:h,finish:g,places:_,pausedAt:u}}function wx({pack:n,round:e,gameState:t}){var T;const i=e.settings,s=(i.dogs??[]).length===5?i.dogs:["Френк","Батон","Пельмень","Турбо","Ракета"],r=i.raceSec??18,a=((T=t.melody)==null?void 0:T.race)??{},c=un(t.game_id),l=zn(t.game_id,t.round_number).filter(A=>A.question_ref===`q-race-${t.round_number}`),u=te.useRef(!1);te.useEffect(()=>{var N;const A=e.settings.race_music??((N=n.settings)==null?void 0:N.bg_music);if(a.stage!=="running"||!A||document.hidden)return;const S=Et();return S.src=je(A),S.loop=!0,S.volume=.55,S.play().catch(()=>{}),()=>S.pause()},[a.stage]);const[m,h]=te.useState(Date.now());te.useEffect(()=>{const A=setInterval(()=>h(Date.now()),66);return()=>clearInterval(A)},[]);const g=te.useMemo(()=>a.seed!=null?Tx(a.seed,r):null,[a.seed,r]),_=a.startedAt?(m-new Date(a.startedAt).getTime())/1e3:0,v=a.stage==="running"&&g,f=a.stage==="done",p=g&&_>=Math.max(...g.finish)+1;te.useEffect(()=>{if(!v||!p||u.current||document.hidden)return;u.current=!0;const A=new Map(g.places.map((S,N)=>[S,N]));(async()=>{for(const S of l){const N=Number(S.answer_text)-1,M=A.get(N),R=M!=null?5-M:0;await Fn.from("answers").update({is_correct:!0,stake:R}).eq("id",S.id)}await Fn.from("game_sessions").update({melody:{...t.melody,race:{...a,stage:"done"}}}).eq("id",zs())})()},[v,p]),te.useEffect(()=>{!a.stage&&!document.hidden&&b()},[a.stage]);const y=()=>hu(t),b=()=>uu(t);return o.jsxs("div",{className:"host-screen grid-bg race-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")||"СКАЧКИ БУЛЬДОГОВ"})}),(a.stage==="running"||f)&&o.jsxs("div",{className:"race-track hud-frame",children:[o.jsx("div",{className:"race-stands",children:Array.from({length:26},(A,S)=>o.jsx("span",{style:{animationDelay:`${S%5*.3}s`},children:["🎉","👏","🙌","⭐","🎊"][S%5]},S))}),o.jsx("div",{className:"race-finish"}),s.map((A,S)=>{const N=(v||f)&&g?g.progress(S,f?999:_):0,M=g&&(f||p)?g.places.indexOf(S):null,R=v&&!f?g==null?void 0:g.pausedAt(S,_):void 0,L=!!g&&_>=g.finish[S];return o.jsxs("div",{className:"race-lane",children:[o.jsx("span",{className:"race-num",children:S+1}),o.jsxs("div",{className:"race-dog",style:{left:`calc(${6+N*82}% )`},children:[R&&o.jsx("span",{className:"race-pause",children:R.icon}),o.jsx(Rx,{color:ol[S],running:!!v&&!p&&!R&&!L}),o.jsxs("span",{className:"race-name",children:[A,M!=null&&` · ${M+1} место`]})]}),o.jsx("span",{className:"race-treat",children:"🍖"})]},S)})]}),(!a.stage||a.stage==="betting")&&o.jsxs("div",{className:"race-panel",children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА · СТАВКИ ТАЙНЫЕ"}),o.jsx("div",{className:"race-lineup",children:s.map((A,S)=>o.jsxs("div",{className:"race-candidate",children:[o.jsx(Ax,{color:ol[S],n:S+1}),o.jsxs("span",{className:"race-tag",children:[o.jsxs("b",{children:["№",S+1]})," ",A]})]},S))}),o.jsxs("div",{className:"mono-tag",style:{color:l.length===c.length&&c.length>0?"var(--answer)":void 0},children:["СТАВКИ СДЕЛАЛИ: ",l.length," / ",c.length]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{disabled:l.length===0,onClick:()=>void y(),children:"🏁 Старт! (ставки закрываются)"})})]}),f&&g&&o.jsxs("div",{className:"race-result",children:[o.jsx("div",{className:"host-actions",children:o.jsx(ri,{pack:n,gameState:t})}),o.jsxs("div",{className:"answer-reveal",style:{padding:"14px 30px"},children:[o.jsx("div",{className:"answer-label",children:"ПОБЕДИТЕЛЬ"}),o.jsxs("div",{className:"answer-main",children:["№",g.places[0]+1," ",s[g.places[0]]]})]}),o.jsx("div",{className:"mono-tag",children:g.places.map((A,S)=>`${S+1}. ${s[A]}`).join("  ·  ")})]})]})}function Ax({color:n,n:e}){const t=n.body;return o.jsxs("svg",{viewBox:"0 0 150 144",className:"bulldog-sit",children:[o.jsx("path",{d:"M75,60 C112,60 122,86 118,112 C116,128 34,128 32,112 C28,86 38,60 75,60 Z",fill:t}),o.jsx("ellipse",{cx:"34",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("ellipse",{cx:"116",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("path",{d:"M75,72 C89,72 93,96 91,118 C90,123 60,123 59,118 C57,96 61,72 75,72 Z",fill:"#fff",opacity:".88"}),o.jsx("rect",{x:"54",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("rect",{x:"83",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("ellipse",{cx:"60.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("ellipse",{cx:"89.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("circle",{cx:"75",cy:"42",r:"34",fill:t}),o.jsx("path",{d:"M43,26 C29,11 33,-4 47,-2 C58,0 63,13 61,28 C56,34 47,34 43,26 Z",fill:t}),o.jsx("path",{d:"M107,26 C121,11 117,-4 103,-2 C92,0 87,13 89,28 C94,34 103,34 107,26 Z",fill:t}),o.jsx("path",{d:"M47,23 C38,12 41,1 49,2 C56,3 58,15 56,24 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M103,23 C112,12 109,1 101,2 C94,3 92,15 94,24 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"59",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("ellipse",{cx:"91",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("circle",{cx:"61.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("circle",{cx:"93.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("path",{d:"M53,52 C53,45 97,45 97,52 C97,66 87,73 75,73 C63,73 53,66 53,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"75",cy:"53",rx:"7.4",ry:"5.2",fill:"#3a2e33"}),o.jsx("path",{d:"M75,57 v6.5",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M65,64 Q70,69.5 75,65 Q80,69.5 85,64",fill:"none",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M51,71 C60,79 90,79 99,71 L99,78 C90,85 60,85 51,78 Z",fill:"#e63946"}),o.jsx("circle",{cx:"75",cy:"83",r:"10.5",fill:"#f5c542",stroke:"#c99a1e",strokeWidth:"2"}),o.jsx("text",{x:"75",y:"88.5",textAnchor:"middle",fontSize:"14.5",fontWeight:"700",fill:"#5a4210",children:e})]})}function Rx({color:n,running:e}){const t=n.body,i=n.mask;return o.jsxs("svg",{viewBox:"0 0 160 112",className:`bulldog${e?" run":""}`,children:[o.jsxs("g",{className:"bd-dust",children:[o.jsx("circle",{cx:"26",cy:"92",r:"3.4",fill:"#cfd8e3"}),o.jsx("circle",{cx:"18",cy:"86",r:"2.2",fill:"#cfd8e3"}),o.jsx("circle",{cx:"33",cy:"96",r:"1.9",fill:"#cfd8e3"})]}),o.jsxs("g",{className:"bd-speed",stroke:"#9fc3e8",strokeWidth:"2.2",strokeLinecap:"round",opacity:".5",children:[o.jsx("line",{x1:"6",y1:"46",x2:"26",y2:"46"}),o.jsx("line",{x1:"10",y1:"60",x2:"28",y2:"60"})]}),o.jsxs("g",{className:"bd-all",children:[o.jsx("path",{className:"bd-hind h2",d:"M64,74 Q60,84 63,92 Q64,96 71,96 L71,92 Q67,90 68,82 Q70,76 71,74 Z",fill:t}),o.jsx("path",{className:"bd-fore f2",d:"M101,72 Q106,82 104,90 Q105,94 112,94 L112,90 Q108,88 108,81 Q108,74 107,70 Z",fill:t}),o.jsx("path",{d:"M40,60 C36,42 54,34 74,34 C96,34 108,44 110,56 C112,70 100,81 80,82 C58,83 42,76 40,60 Z",fill:t}),o.jsx("path",{d:"M56,74 C66,80 88,80 100,72 C96,80 66,84 56,74 Z",fill:"#fff",opacity:".85"}),o.jsx("circle",{cx:"38",cy:"52",r:"4.5",fill:t,stroke:i,strokeWidth:"1"}),o.jsx("path",{className:"bd-hind h1",d:"M50,70 Q44,80 48,89 Q49,94 57,94 L57,89 Q52,88 53,80 Q56,73 58,70 Z",fill:t}),o.jsx("path",{className:"bd-fore f1",d:"M90,72 Q94,82 91,90 Q92,95 100,95 L100,90 Q96,88 97,80 Q99,74 98,71 Z",fill:t}),o.jsxs("g",{className:"bd-head",children:[o.jsx("circle",{cx:"118",cy:"44",r:"30",fill:t}),o.jsx("path",{d:"M88,32 C74,14 78,-2 92,-1 C103,0 108,14 106,30 C100,36 92,37 88,32 Z",fill:t}),o.jsx("path",{d:"M148,32 C162,14 158,-2 144,-1 C133,0 128,14 130,30 C136,36 144,37 148,32 Z",fill:t}),o.jsx("path",{d:"M92,28 C83,15 86,3 94,4 C101,5 103,17 101,27 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M144,28 C153,15 150,3 142,4 C135,5 133,17 135,27 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"105",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("ellipse",{cx:"131",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("circle",{cx:"107",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("circle",{cx:"133",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("path",{d:"M100,52 C100,45 136,45 136,52 C136,64 128,71 118,71 C108,71 100,64 100,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"118",cy:"53",rx:"6.4",ry:"4.6",fill:"#3a2e33"}),o.jsx("path",{d:"M118,56.5 v6",stroke:"#3a2e33",strokeWidth:"1.8",strokeLinecap:"round"}),o.jsx("path",{d:"M110,62 Q114,67 118,63 Q122,67 126,62",fill:"none",stroke:"#3a2e33",strokeWidth:"1.9",strokeLinecap:"round"}),o.jsx("path",{className:"bd-tongue",d:"M112,65 Q118,76 124,65 Q122,71 118,71.5 Q114,71 112,65 Z",fill:"#ff8da1"})]})]})]})}function v_(){var c;const{gameState:n,loading:e,roomId:t}=Ld(),[i,s]=te.useState(null);if(te.useEffect(()=>{n!=null&&n.pack_id?xu(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),!e&&!t)return o.jsx(Dd,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",a=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"";return o.jsxs(vu,{theme:r,isProjector:!0,children:[r==="new_year"&&o.jsx(Mu,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),o.jsx(Cx,{gameState:n,pack:i}),o.jsx(Nu,{theme:r,trigger:a}),i&&o.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((c=i.settings)==null?void 0:c.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name})]})}function Zs({theme:n}){return n==="new_year"?o.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?o.jsx("div",{className:"title-deco",children:"⚡ ✦ 🪄 ✦ ⚡"}):null}function cl({theme:n}){return n!=="classic"?null:o.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[o.jsx("span",{className:"cd-line"}),o.jsx("span",{className:"cd-chip",children:"◆"}),o.jsx("span",{className:"cd-line"})]})}function Cx({gameState:n,pack:e}){var p,y,b,T;const[t,i]=te.useState([]),[s,r]=te.useState("");te.useEffect(()=>{_u().then(i).catch(()=>i([]))},[]);const a=un((n==null?void 0:n.game_id)??null),c=te.useMemo(()=>Fu(a),[a]),d=te.useMemo(()=>{const A=`${location.origin}${location.pathname}#/player?room=${zs()??""}`;return n!=null&&n.pack_id?`${A}&pack=${n.pack_id}`:A},[n==null?void 0:n.pack_id]),l=((n==null?void 0:n.random_groups)??[]).filter(A=>Array.isArray(A)&&A.length>0),u=l.map(A=>A.join(",")).join("|"),[m,h]=te.useState(!0);te.useEffect(()=>{h(!0)},[u]);const g=l.length>0&&m;if(Xx((p=e==null?void 0:e.rounds)==null?void 0:p[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),!n)return o.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const _=((y=e==null?void 0:e.settings)==null?void 0:y.play_mode)==="paper";if(n.phase==="lobby"||!n.pack_id||!e)return o.jsxs("div",{className:`host-screen grid-bg${_?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&o.jsx(jx,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?o.jsxs("div",{className:"cyber-lobby-head",children:[o.jsx(pl,{side:"left"}),o.jsxs("div",{className:"clh-title",children:[o.jsx(vn,{theme:"classic",lines:["QUIZ","PARTY"]}),o.jsx(cl,{theme:"classic"})]}),o.jsx(pl,{side:"right"})]}):o.jsxs(o.Fragment,{children:[o.jsx(vn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),o.jsx(Zs,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?o.jsxs(o.Fragment,{children:[g&&o.jsx(Hx,{groups:l,onClose:()=>h(!1)}),l.length>0&&!m&&o.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>h(!0),children:"СОСТАВЫ КОМАНД"}),o.jsxs("div",{className:"lobby-teams",children:[a.length>0&&o.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?_?null:o.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):c.map(A=>o.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":A.color,opacity:fu(A)?1:.4},children:[A.icon&&o.jsx("span",{className:"lobby-team-icon",children:A.icon}),A.name]},A.id))]}),!_&&o.jsx("img",{alt:"QR",className:`lobby-qr-corner${g?" lobby-qr-lit":""}`,src:`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=1&data=${encodeURIComponent(d)}`}),!_&&g&&o.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Kr()},children:"⟲ Сменить пакет"}),o.jsx("button",{onClick:()=>{var A,S;return void((A=e==null?void 0:e.settings)!=null&&A.show_intro?Ud():Yr(0,Jr((S=e==null?void 0:e.settings)==null?void 0:S.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):o.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[o.jsxs("select",{value:s,onChange:A=>r(A.target.value),style:{fontSize:"1.2rem"},children:[o.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(A=>o.jsxs("option",{value:A.id,children:[A.name," (",A.status==="ready"?"готов":A.status==="played"?"сыгран":A.status,")"]},A.id))]}),o.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const A=t.find(S=>S.id===s);A&&A.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Id(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return o.jsx(ux,{onDone:()=>{var A;Yr(0,Jr((A=e==null?void 0:e.settings)==null?void 0:A.info_slides,0)??void 0)}});const v=e.rounds[n.round_number];if(!v)return o.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const f=v.questions[n.question_index];if(n.phase==="round_intro"){const A=v.settings.grid;return o.jsxs("div",{className:"host-screen grid-bg round-intro",children:[v.rules_audio&&o.jsx("audio",{autoPlay:!0,src:je(v.rules_audio)}),v.mechanic==="crossword"&&A?o.jsxs("div",{className:"cw-layout",children:[o.jsx(Su,{grid:A,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/A.cols,innerHeight*.8/A.rows))))}),o.jsxs("div",{className:"side",children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Qn(e,n.round_number)]}),o.jsx(vn,{theme:e.theme,lines:v.title_lines}),o.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:Bo(v)}),v.rules.map((S,N)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+N*.5}s`},children:[o.jsx("span",{className:"idx",children:String(N+1).padStart(2,"0")}),S]},N))]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"round-badge",children:[o.jsx("span",{className:"rb-word",children:"РАУНД"}),o.jsx("span",{className:"rb-num",children:Qn(e,n.round_number)})]}),o.jsxs("div",{className:"ri-main",children:[o.jsx(vn,{theme:e.theme,lines:v.title_lines}),o.jsx(Zs,{theme:e.theme}),o.jsx(cl,{theme:e.theme}),o.jsx("div",{className:"meta-line",children:Bo(v)})]}),v.rules.length>0&&o.jsxs("div",{className:"rules-frame","data-count":v.rules.length,children:[o.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),v.rules.map((S,N)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+N*.7}s`},children:[o.jsx("span",{className:"idx",children:String(N+1).padStart(2,"0")}),S]},N))]})]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Yi(0),children:v.mechanic==="jeopardy"?"Начать раунд →":v.mechanic==="race"?"К скачкам →":v.mechanic==="melody"?"К трекам →":v.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(n.phase==="question"&&v.mechanic==="sprint")return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx(Vu,{pack:e,round:v,gameState:n,timerNode:o.jsx(Za,{startedAt:n.timer_started_at,seconds:v.timer_seconds,theme:e.theme})}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{className:"ghost dark",onClick:()=>void $i(0),children:"К ответам →"})})]});if(n.phase==="question"&&v.mechanic==="blitz")return o.jsx(Zx,{pack:e,round:v,gameState:n});if(n.phase==="question"&&v.mechanic==="race")return o.jsx(wx,{pack:e,round:v,gameState:n});if(n.phase==="question"&&v.mechanic==="melody")return o.jsx(yx,{pack:e,round:v,gameState:n});if(n.phase==="question"&&v.mechanic==="jeopardy")return o.jsx(i_,{pack:e,round:v,gameState:n});if(n.phase==="question"&&f){const A=f.media.question??[],S=A.filter(Y=>!/\.(mp3|mp4|webm|wav)$/i.test(Y)),N=A.filter(Y=>/\.(mp3|mp4|webm|wav)$/i.test(Y)),M=!!f.question_text.trim()&&S.length===1&&!f.media.hidden,R=f.answer.mode==="choice"||f.answer.mode==="order"?f.answer.choices:null,L=e.theme==="new_year",I=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>v.timer_seconds-10,B=e.theme==="classic",K=!!f.question_text.trim(),U=e.theme==="potter"&&v.mechanic!=="rebus"?"pt-frame":L&&v.mechanic!=="rebus"?`q-frame${I?" low":""}`:B?"cyber-frame":"",W=!f.media.hidden&&S.length>1&&(f.answer.mode==="choice"&&f.answer.choices.length===S.length||f.answer.mode==="match"&&f.answer.left.length===S.length),V=((b=e.settings)!=null&&b.answers_reveal&&v.answers_reveal==="after_question",v.answers_reveal??"after_round");return o.jsxs("div",{className:`host-screen grid-bg${K?"":" no-qtext"}${S.length&&!f.media.hidden?" has-media":""}${R&&!W||f.answer.mode==="match"&&(f.answer.right_labels??[]).some(Boolean)?" has-choices":""}`,children:[o.jsx(Qa,{}),v.mechanic!=="jeopardy"&&o.jsxs(o.Fragment,{children:[o.jsx(Jx,{startedAt:n.timer_started_at,seconds:v.timer_seconds,q:f,round:v,pack:e,timerRunning:!!n.timer_started_at,manual:_,gameId:n.game_id,roundNumber:n.round_number}),o.jsx(n_,{round:v,gameState:n,isLast:n.question_index+1>=v.questions.length}),o.jsx(t_,{enabled:V==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:v.timer_seconds})]}),o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"qnum",children:["Р",Qn(e,n.round_number)," · ВОПРОС"," ",o.jsx("b",{children:n.question_index+1})," / ",v.questions.length]}),v.mechanic!=="jeopardy"&&o.jsx(Za,{startedAt:n.timer_started_at,seconds:v.timer_seconds,theme:e.theme},f.id)]}),M?o.jsxs("div",{className:"q-split",children:[o.jsxs("div",{className:U,children:[L&&o.jsx(ll,{seed:f.id,low:I}),B&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(dl,{text:f.question_text},f.id)]}),o.jsx("div",{className:"q-media-grid n1",style:Ks(f),children:S.map((Y,re)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:je(Y),alt:""}),f.answer.mode==="match"&&o.jsx("figcaption",{children:re+1})]},re))})]}):o.jsxs(o.Fragment,{children:[K&&o.jsxs("div",{className:U,children:[L&&o.jsx(ll,{seed:f.id,low:I}),B&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),o.jsx(dl,{text:f.question_text},f.id)]}),!f.media.hidden&&S.length>0&&(W?o.jsx("div",{className:`img-answers n${Math.min(S.length,5)}${S.length>1?" eq-row":""}`,children:S.map((Y,re)=>{var fe,pe;return o.jsx(Vx,{src:je(Y),badge:f.answer.mode==="match"?String(re+1):((fe=R==null?void 0:R[re])==null?void 0:fe.key)??"",children:f.answer.mode==="choice"&&((pe=R==null?void 0:R[re])==null?void 0:pe.text)&&o.jsx("span",{className:"ia-text",children:R[re].text})},re)})}):o.jsx("div",{className:`q-media-grid n${Math.min(S.length,4)}${v.mechanic==="rebus"?" rebus":""}${S.length>1?" eq-row":""}${S.length>4?" wrap2":""}`,style:Ks(f),children:S.map((Y,re)=>o.jsx(Js,{src:je(Y)},re))}))]}),N.map((Y,re)=>/\.(mp4|webm)$/i.test(Y)?o.jsx(Kx,{src:je(Y),hidden:!!f.media.hidden,waitFor:!!f.media.voice,go:!!n.timer_started_at},re):null),f.answer.mode==="match"&&(f.answer.right_labels??[]).some(Boolean)&&o.jsx("div",{className:`choices-grid${Ya(f.answer.right_labels??[])}`,children:f.answer.right.map((Y,re)=>{var fe;return o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+re*.3}s`},children:[o.jsx("span",{className:"key",children:Y}),((fe=f.answer.right_labels)==null?void 0:fe[re])??""]},Y)})}),R&&!W&&o.jsx("div",{className:`choices-grid${Ya(R.map(Y=>Y.text))}`,children:R.map((Y,re)=>o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+re*.35}s`},children:[o.jsx("span",{className:"key",children:Y.key}),Y.text]},Y.key))}),(V==="after_question"||v.mechanic==="jeopardy")&&n.reveal&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",children:Qi(f)}),f.answer_note&&o.jsx("div",{style:{opacity:.75},children:f.answer_note}),(()=>{const Y=f.media.answer??[],re=Y.filter(pe=>!/\.(mp3|wav|m4a|ogg)$/i.test(pe)),fe=Y.find(pe=>/\.(mp3|wav|m4a|ogg)$/i.test(pe));return o.jsxs(o.Fragment,{children:[fe&&o.jsx(Sd,{src:je(fe)}),re.length>0&&o.jsx("div",{className:"q-media-grid",style:{maxHeight:"26vh"},children:re.map((pe,Ee)=>o.jsx("img",{src:je(pe),alt:""},Ee))})]})})()]}),o.jsxs("div",{className:"host-actions",children:[o.jsx(Nx,{gameState:n}),(V==="after_question"||v.mechanic==="jeopardy")&&!n.reveal&&o.jsx("button",{onClick:()=>void ks(),children:"Показать ответ"}),n.question_index+1<v.questions.length?o.jsx("button",{onClick:()=>void Yi(n.question_index+1),children:"Дальше →"}):V==="after_round"?o.jsx("button",{onClick:()=>void Ml(),children:"Время ответов →"}):o.jsx(ri,{pack:e,gameState:n})]})]})}if(n.phase==="info"){const A=((T=e==null?void 0:e.settings)==null?void 0:T.info_slides)??[],S=A[n.question_index]??A[0];if(S)return o.jsx(qx,{pack:e,slide:S,packId:n.pack_id,gameState:n})}return n.phase==="recap"?o.jsx(Wx,{pack:e,round:v,gameState:n}):n.phase==="answer_time"?o.jsx(Qx,{pack:e,round:v,gameState:n}):n.phase==="show_answers"&&f?o.jsx(e_,{pack:e,round:v,q:f,gameState:n}):n.phase==="scoreboard"?o.jsx(a_,{pack:e,gameState:n}):n.phase==="break"?o.jsx(o_,{pack:e,round:v,gameState:n}):n.phase==="counting"?o.jsx(c_,{pack:e,gameState:n}):n.phase==="finale"?o.jsx(l_,{pack:e,gameId:n.game_id,gameState:n}):o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!f&&o.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void tr("round_intro"),children:"← К титулу раунда"})})]})}function Nx({gameState:n}){return n.question_index>0?o.jsx("button",{className:"ghost",onClick:()=>void Yi(n.question_index-1),children:"← Назад"}):o.jsx("button",{className:"ghost",onClick:()=>void tr("round_intro"),children:"← К титулу"})}function ll({seed:n,low:e}){const t=te.useMemo(()=>{let i=0;for(const a of n)i=i*31+a.charCodeAt(0)>>>0;const s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=60;return Array.from({length:r},(a,c)=>({left:(c+.5)*(100/r)+(s()-.5)*2.5,len:8+s()*34,delay:s()*.5,sway:3+s()*3}))},[n]);return o.jsx("div",{className:"icicles",children:t.map((i,s)=>o.jsx("span",{className:"icicle",style:{left:`${i.left}%`,height:i.len,"--len":`${i.len}px`,animationDelay:`${i.delay}s, ${i.delay}s`,animationDuration:`${i.sway}s, .7s`}},s))})}function Px(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function Ya(n){const e=Math.max(0,...n.map(t=>(t??"").trim().length));return e<=28?"":e<=55?" c-m":e<=95?" c-l":" c-xl"}function dl({text:n}){const e=n.split(/(\s+)/);let t=0;const i=Ka([n]);return o.jsx("p",{ref:i,className:`q-text${Ri(n)}`,children:e.map((s,r)=>{if(/^\s+$/.test(s))return s;const a=.12*t++;return o.jsx("span",{className:"q-word",style:{animationDelay:`${a}s`},children:s},r)})})}function Lx(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const vn=te.forwardRef(function({theme:e,lines:t},i){const s=Lx(t),r=t.join(`
`),a=wl(r,e==="classic"),c=e==="classic"?a.split(`
`):t;if(e!=="new_year")return o.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,u)=>o.jsxs("span",{style:u===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[u]??l,o.jsx("br",{})]},u))});let d=0;return o.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,u)=>o.jsx("span",{style:{display:"block"},children:[...l].map((m,h)=>m===" "?o.jsx("span",{children:" "},h):o.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*d++}s`},children:m},h))},u))})});function Dx(){Al()}function Ix(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n,t=e.currentTime,i=e.createGain();i.gain.value=.5,i.connect(e.destination);const s=(r,a,c,d,l)=>{const u=e.createOscillator(),m=e.createGain();u.type=d,u.frequency.setValueAtTime(r,t+a),m.gain.setValueAtTime(1e-4,t+a),m.gain.linearRampToValueAtTime(l,t+a+.008),m.gain.setValueAtTime(l,t+a+c-.05),m.gain.exponentialRampToValueAtTime(1e-4,t+a+c),u.connect(m),m.connect(i),u.start(t+a),u.stop(t+a+c+.02)};for(let r=0;r<5;r++)s(1046.5,r*.22,.11,"square",.3);s(784,1.2,1.25,"square",.26),s(392,1.2,1.25,"sine",.3),setTimeout(()=>void e.close(),3e3)}catch{}}function Za({startedAt:n,seconds:e,theme:t,chime:i=!0}){const[s,r]=te.useState(e),a=te.useRef(!1);te.useEffect(()=>{if(!n){r(e),a.current=!1;return}const l=()=>{const m=(Date.now()-new Date(n).getTime())/1e3,h=Math.max(0,Math.ceil(e-m));r(h),h===0&&i&&!a.current&&(a.current=!0,Ix())};l();const u=setInterval(l,250);return()=>clearInterval(u)},[n,e,i]);const c=s<=10;if(t==="new_year"){const u=2*Math.PI*44,m=Math.max(0,Math.min(1,s/e)),h=Array.from({length:40},(_,v)=>{const f=v/40*Math.PI*2,p=7+v%3*3;return{x1:55+Math.cos(f)*39,y1:55+Math.sin(f)*39,x2:55+Math.cos(f)*(44+p-5),y2:55+Math.sin(f)*(44+p-5),rot:f*180/Math.PI}}),g=Array.from({length:7},(_,v)=>{const f=v/7*Math.PI*2+.4;return{cx:55+Math.cos(f)*44,cy:55+Math.sin(f)*44}});return o.jsxs("div",{className:`ny-wreath${c?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 110 110",children:[h.map((_,v)=>o.jsx("line",{x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2,stroke:v%4===0?"#1f6b3a":"#2f8f4e",strokeWidth:"3",strokeLinecap:"round"},v)),o.jsx("circle",{className:"wr-bg",cx:"55",cy:"55",r:44}),o.jsx("circle",{className:"wr-fg",cx:"55",cy:"55",r:44,strokeDasharray:u,strokeDashoffset:u*(1-m)}),g.map((_,v)=>o.jsx("circle",{className:"wr-berry",cx:_.cx,cy:_.cy,r:"3.4"},v)),o.jsx("path",{className:"wr-bow",d:"M46,99 q9,-9 18,0 q-9,5 -18,0"})]}),o.jsx("span",{className:"val",children:s})]})}if(t==="potter")return o.jsx(Nl,{left:s,seconds:e,low:c});const d=!!n&&s>0;return o.jsxs("div",{className:`timer-wrap${c?" low":""}${d?"":" paused"}${n?"":" not-started"}`,children:[o.jsx("span",{className:"tm-orbit","aria-hidden":"true",children:o.jsx("i",{className:"tm-spark"})}),o.jsx("span",{className:`timer-num${c?" danger":""}`,children:s})]})}function Ux(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?o.jsxs(o.Fragment,{children:[s,o.jsx("b",{className:"rebus-hot",children:r})]}):o.jsxs(o.Fragment,{children:[o.jsx("b",{className:"rebus-hot",children:r}),s]})}function Fx(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}function Ks(n){const e=n.media.scale;if(!(e==null||e===100))return{"--ms":Math.min(100,Math.max(50,e))/100}}function Js({src:n,children:e}){const[t,i]=te.useState(1.5);return o.jsxs("figure",{className:"q-img",style:{flexGrow:t,flexBasis:0},children:[o.jsx("img",{src:n,alt:"",onLoad:s=>{const r=s.currentTarget;r.naturalWidth&&r.naturalHeight&&i(r.naturalWidth/r.naturalHeight)}}),e]})}const Ox=5e3,vd=3300,Bx=500,zx=900,ul=100,hl=600,fl=500;function kx(n){const e=n.answer;return e.mode==="choice"?vd+Bx+zx:e.mode==="match"?ul+hl*Math.max(0,Math.min(e.left.length,6)-1)+fl:e.mode==="order"?ul+hl*Math.max(0,e.correct_order.length-1)+fl:1200}function Gx({src:n}){const e=te.useRef(null);return te.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),o.jsx("div",{className:"reveal-video",children:o.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Md(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function Sd({src:n}){return te.useEffect(()=>{if(document.hidden)return;let e=!1;const t=Et();return t.src=n,t.loop=!1,t.play().then(()=>{if(e)try{t.pause(),t.src=""}catch{}}).catch(()=>{}),()=>{e=!0;try{t.pause(),t.src=""}catch{}}},[n]),null}function pl({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return o.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"cp-bar"}),o.jsx("div",{className:"cp-rows",children:e.map((t,i)=>o.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),o.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>o.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function Hx({groups:n,onClose:e}){te.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return o.jsx("div",{className:"groups-overlay",onClick:e,children:o.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[o.jsxs("div",{className:"gm-head",children:[o.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),o.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),o.jsx("div",{className:"lg-list",children:n.map((i,s)=>o.jsxs("div",{className:"lg-team",children:[o.jsxs("div",{className:"lg-name",style:{color:Fd(s)},children:["Команда ",s+1]}),o.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function Vx({src:n,badge:e,children:t}){const[i,s]=te.useState(1.5);return o.jsxs("div",{className:"img-answer",style:{flexGrow:i,flexBasis:0},children:[o.jsxs("span",{className:"ia-frame",children:[o.jsx("span",{className:"ia-key",children:e}),o.jsx("img",{src:n,alt:"",onLoad:r=>{const a=r.currentTarget;a.naturalWidth&&a.naturalHeight&&s(a.naturalWidth/a.naturalHeight)}})]}),t]})}function Wx({pack:n,round:e,gameState:t}){const i=te.useMemo(()=>e.questions.filter(h=>!h.hidden),[e.questions]),[s,r]=te.useState(0),a=i[s],c=s+1>=i.length,d=()=>void Ml(),l=()=>{c?d():r(h=>h+1)};if(te.useEffect(()=>{if(!a){d();return}let h=!0;const g=()=>{h&&l()},_=setTimeout(g,Ox),v=a.media.voice;if(!v)return()=>{h=!1,clearTimeout(_)};const f=Et();f.src=je(v),f.play().catch(()=>{});const p=()=>{clearTimeout(_),g()};return f.addEventListener("ended",p),()=>{h=!1,clearTimeout(_),f.removeEventListener("ended",p);try{f.pause()}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const u=(a.media.question??[]).filter(h=>!/\.(mp3|wav|mp4|webm)$/i.test(h)),m=!!a.question_text.trim();return o.jsxs("div",{className:`host-screen grid-bg recap-screen${u.length?" has-media":""}${m?"":" no-qtext"}`,children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),o.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),o.jsxs("div",{className:"recap-body",children:[m&&o.jsx("p",{className:`q-text${Ri(a.question_text)}`,children:a.question_text}),u.length>0&&o.jsx("div",{className:`q-media-grid n${Math.min(u.length,4)}${u.length>1?" eq-row":""}${u.length>4?" wrap2":""}`,style:Ks(a),children:u.map((h,g)=>o.jsx(Js,{src:je(h)},g))})]},a.id),o.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((h,g)=>o.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost",onClick:d,children:"Пропустить повтор"}),o.jsx("button",{onClick:l,children:c?"К ответам →":"Следующий →"})]})]})}function jx({pack:n}){var e,t;return te.useEffect(()=>{var c,d;const i=((c=n==null?void 0:n.settings)==null?void 0:c.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=Et();s.src=je(i),s.loop=!0,s.volume=.45;let r=!1;const a=()=>{r||(r=!0,s.play().catch(()=>{}),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a))};return s.play().then(()=>{r=!0}).catch(()=>{window.addEventListener("pointerdown",a),window.addEventListener("keydown",a)}),()=>{window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a);try{s.pause()}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}function Xx(n,e){te.useEffect(()=>{if(!n)return;const i=n.questions.filter(a=>!a.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const a of s){const c=je(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const d=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");d.preload="auto",d.src=c,r.push(d)}else{const d=new Image;d.src=c,r.push(d)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[n,e])}function qx({pack:n,slide:e,packId:t,gameState:i}){var c,d;const s=n.rounds.filter(l=>!l.off_scoreboard).map(l=>({id:l.id,name:(l.title_lines??[]).join(" ")||"—",count:l.questions.filter(u=>!u.hidden).length})),r=un(i.game_id),a=Jd(n,r.length);return o.jsxs(o.Fragment,{children:[o.jsx(Qd,{slide:e,rounds:s,stats:a,mediaUrl:je}),o.jsx("div",{className:"host-actions",children:o.jsx(Yx,{slides:((c=n.settings)==null?void 0:c.info_slides)??[],index:$x(n,e),packId:t,paper:((d=n.settings)==null?void 0:d.play_mode)==="paper"})})]})}function $x(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function Yx({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return o.jsxs(o.Fragment,{children:[e>0&&o.jsx("button",{className:"ghost",onClick:()=>void bi(e-1),children:"← Назад"}),e+1<n.length&&o.jsx("button",{className:"ghost",onClick:()=>void bi(e+1),children:"Дальше →"}),s?i?o.jsx("button",{onClick:()=>void Kd(),children:"К подсчёту →"}):o.jsx("button",{onClick:()=>void er(t),children:"К итогам →"}):o.jsx("button",{onClick:()=>void tr("round_intro"),children:"К раунду →"})]})}function Zx({pack:n,round:e,gameState:t}){var p;const{state:i,setState:s}=Od(t.game_id,t.round_number),r=un(t.game_id),a=zn(t.game_id,t.round_number,400),c=te.useMemo(()=>e.questions.map(y=>({id:y.id,hidden:y.hidden})),[e.questions]),d=e.settings;te.useEffect(()=>{var T;const y=d.bg_music??((T=n.settings)==null?void 0:T.bg_music);if(!y)return;const b=Et();return b.src=je(y),b.loop=!0,b.volume=.6,b.play().catch(()=>{}),()=>b.pause()},[e.id,d.bg_music,(p=n.settings)==null?void 0:p.bg_music]);const l=te.useRef(!1),u=async y=>{if(!l.current){l.current=!0,s(y);try{await qd(t.game_id,t.round_number,y),y.finished&&!(i!=null&&i.finished)&&await $d(t.game_id,t.round_number,Oo(Uo(y),d.timeoutPenalty??10))}finally{l.current=!1}}};te.useEffect(()=>{if(i||r.length<2)return;const y=setTimeout(()=>{const b=[...r].sort(()=>Math.random()-.5).map(T=>T.id);u(Bd(b,d.teamSeconds??60))},3e3);return()=>clearTimeout(y)},[i,r.length]),te.useEffect(()=>{if(!i||i.finished||i.current)return;const y=setTimeout(()=>{const b=zd(c,i.used);if(!b)return void u(Co(i));eu(b.id).catch(()=>{}),u(kd(i,b.id,Date.now()))},No);return()=>clearTimeout(y)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const m=i==null?void 0:i.current,h=m?e.questions.find(y=>y.id===m.questionId):void 0,g=i?xl(i):void 0;te.useEffect(()=>{if(!i||!m||!h||!g)return;const y=a.find(T=>T.team_id===g&&T.question_ref===`q-${h.id}`);if(!(y!=null&&y.answer_text)||m.lastAnswer===y.answer_text)return;if(y.answer_text===Gd){u(Po(dr(i,Date.now()),Date.now()));return}const b=Qr(h.answer,y.answer_text)===!0;u(Hd(i,Date.now(),b?"ok":"no",y.answer_text))},[a,m==null?void 0:m.questionId,m==null?void 0:m.lastAnswer]);const _=(m==null?void 0:m.verdict)==="no"&&m.attempts+1>=Lo;if(te.useEffect(()=>{if(!i||!(m!=null&&m.verdict))return;const b=Math.max(0,(_?Yd:No)-(Date.now()-(m.pausedAt??Date.now()))),T=setTimeout(()=>{const A=Date.now(),S=dr(i,A),N=a.find(M=>M.team_id===g&&M.question_ref===`q-${m.questionId}`);N&&Fn.from("answers").update({is_correct:m.verdict==="ok"}).eq("id",N.id).then(()=>{}),u(m.verdict==="ok"?Do(S,A):Io(S,A))},b);return()=>clearTimeout(T)},[m==null?void 0:m.verdict,m==null?void 0:m.lastAnswer]),!i)return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),o.jsx(ko,{teams:r,rolling:!0})]});if(i.finished){const y=Oo(Uo(i),d.timeoutPenalty??10);return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),o.jsxs("table",{className:"score-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),o.jsx("th",{children:"Очки"}),o.jsx("th",{children:"Баллы"})]})}),o.jsx("tbody",{children:y.map(b=>{var T;return o.jsxs("tr",{children:[o.jsxs("td",{children:[b.place,b.shared?"=":""]}),o.jsx("td",{children:((T=r.find(A=>A.id===b.teamId))==null?void 0:T.name)??"—"}),o.jsx("td",{children:b.points}),o.jsx("td",{children:b.score})]},b.teamId)})})]}),o.jsx("div",{className:"host-actions",children:o.jsx(ri,{pack:n,gameState:t})})]})}const v=i.current!=null||Object.values(i.correct).some(y=>y>0)||Object.values(i.missed).some(y=>y>0),f=!m&&i.lastReveal?(()=>{const y=e.questions.find(b=>b.id===i.lastReveal.questionId);if(y)return{questionText:y.question_text,answerText:Qi(y),verdict:i.lastReveal.verdict}})():void 0;return o.jsxs(o.Fragment,{children:[o.jsx(Eu,{teams:r,state:i,bank:c,questionText:h==null?void 0:h.question_text,verdict:m==null?void 0:m.verdict,reveal:f,answerText:(m==null?void 0:m.verdict)==="ok"||(m==null?void 0:m.verdict)==="no"&&m.attempts+1>=Lo?Qi(h):void 0,dice:v?void 0:o.jsx(ko,{teams:r,rolling:!1,pickedId:i.order[0]})}),o.jsxs("div",{className:"host-actions",children:[(m==null?void 0:m.verdict)&&o.jsxs("button",{className:"ghost",onClick:()=>{const y=Date.now(),b=dr(i,y);u(m.verdict==="ok"?Io(b,y):Do(b,y))},children:["Исправить на «",m.verdict==="ok"?"неверно":"верно","»"]}),m&&m.verdict!=="ok"&&o.jsx("button",{className:"ghost",onClick:()=>void u(Po(i,Date.now())),children:"Скип −1"}),o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&u(Co(i))},children:"Завершить раунд"})]})]})}function Qi(n){const e="⚠ ответ не заполнен в редакторе",t=n.answer,i=t.display;return Array.isArray(i)?i.join(" · "):typeof i=="string"&&i?i:typeof t.correct=="string"&&t.correct?String(t.correct).split("/")[0].trim():typeof t.word=="string"&&t.word?t.word.toUpperCase():typeof t.correct_choice=="string"&&t.correct_choice?t.correct_choice:typeof t.correct_order=="string"&&t.correct_order?t.correct_order:Array.isArray(t.correct_pairs)&&t.correct_pairs.length?t.correct_pairs.join("  "):e}function Kx({src:n,hidden:e,waitFor:t,go:i}){const s=te.useRef(null);return te.useEffect(()=>{var r;t&&!i||(r=s.current)==null||r.play().catch(()=>{})},[t,i]),o.jsx("video",{ref:s,src:n,controls:!e,autoPlay:!t,style:e?{width:1,height:1,opacity:0}:{maxHeight:"46vh",borderRadius:14}})}function Jx({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:a=!1,gameId:c,roundNumber:d}){const l=(n.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),u=te.useRef(null),m=te.useRef(null),h=te.useRef(!1);return te.useEffect(()=>{if(Dx(),a&&!l||t)return;let g=!1;const _=(n.media.question??[]).find(p=>/\.(mp3|wav|m4a|ogg)$/i.test(p));h.current=!1;const v=()=>{if(!g){if(h.current=!0,_){const p=Et();p.src=je(_),m.current=p,p.play().catch(()=>{})}Zr(c&&d!=null?{gameId:c,roundNumber:d,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){v();return}const f=Et();return f.src=je(n.media.voice),u.current=f,f.onended=v,f.onerror=v,f.play().then(()=>{if(g)try{f.pause(),f.src=""}catch{}}).catch(v),()=>{var y;g=!0;const p=u.current;if(p){p.onended=null,p.onerror=null;try{p.pause(),p.src=""}catch{}}u.current=null,(y=m.current)==null||y.pause()}},[n.id,a]),te.useEffect(()=>{if(!a||!t||l)return;let g=!1;const _=(n.media.question??[]).find(f=>/\.(mp3|wav|m4a|ogg)$/i.test(f)),v=()=>{if(g||!_)return;const f=Et();f.src=je(_),m.current=f,f.play().catch(()=>{})};if(n.media.voice){const f=Et();f.src=je(n.media.voice),u.current=f,f.onended=v,f.onerror=v,f.play().then(()=>{if(g)try{f.pause(),f.src=""}catch{}}).catch(v)}else v();return()=>{var p;g=!0;const f=u.current;if(f){f.onended=null,f.onerror=null;try{f.pause(),f.src=""}catch{}}u.current=null,(p=m.current)==null||p.pause()}},[n.id,a,t]),te.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const _=u.current;_&&!_.paused&&!_.ended||Zr(c&&d!=null?{gameId:c,roundNumber:d,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(g)},[n.id,t,a]),te.useEffect(()=>{var b;const g=e.settings.bg_music??((b=i==null?void 0:i.settings)==null?void 0:b.bg_music);if(!t||!g||l)return;const _=Et();_.src=je(g),_.loop=!0,_.volume=.6,_.play().catch(()=>{});let v;const f=(r??e.timer_seconds??60)*1e3,p=s?f-(Date.now()-new Date(s).getTime()):f,y=window.setTimeout(()=>{v=window.setInterval(()=>{_.volume=Math.max(0,_.volume-.1),_.volume<=.01&&(v&&clearInterval(v),_.pause())},80)},Math.max(0,p)+3e3);return()=>{clearTimeout(y),v&&clearInterval(v),_.pause()}},[t,n.id]),null}function Qx({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=un(t.game_id),a=zn(t.game_id,t.round_number),c=e.questions.filter(l=>!l.hidden).length;return te.useEffect(()=>{var m;const l=e.settings.bg_music??((m=n.settings)==null?void 0:m.bg_music);if(!l)return;const u=Et();return u.src=je(l),u.loop=!0,u.volume=.6,u.play().catch(()=>{}),()=>u.pause()},[e.id]),o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Qn(n,t.round_number)," :: ВРЕМЯ ОТВЕТОВ"]}),o.jsx("div",{className:"answer-pulse",children:o.jsx(vn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),o.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),o.jsx(Za,{startedAt:t.timer_started_at,seconds:i,theme:n.theme}),!s&&o.jsx("div",{className:"answer-time-teams",children:r.map(l=>{const u=a.filter(h=>{var g;return h.team_id===l.id&&((g=h.answer_text)==null?void 0:g.trim())}).length,m=u>=c;return o.jsxs("div",{className:`at-team${m?" done":""}`,children:[o.jsx("span",{style:{color:l.color},children:l.name})," · ",u,"/",c]},l.id)})}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>void Yi(e.questions.length-1),children:"← Назад"}),o.jsx("button",{onClick:()=>void $i(0),children:"К ответам →"})]})]})}function e_({pack:n,round:e,q:t,gameState:i}){var S;const s=((S=n.settings)==null?void 0:S.play_mode)==="paper",r=zn(i.game_id,i.round_number),a=i.reveal,c=un(i.game_id),[d,l]=te.useState([]);te.useEffect(()=>{Fn.from("teams").select("id,name,color").then(({data:N})=>l(N??[]))},[]);const u=r.filter(N=>N.question_ref===`q-${t.id}`),m=e.questions.length,h=i.question_index;te.useEffect(()=>{if(a||document.hidden)return;const N=setTimeout(()=>{ks()},3e3);return()=>clearTimeout(N)},[a,h]);const[g,_]=te.useState(!1);te.useEffect(()=>{if(_(!1),!a)return;const N=setTimeout(()=>_(!0),kx(t)+600);return()=>clearTimeout(N)},[a,t.id]),te.useEffect(()=>{!g||document.hidden||u.forEach(N=>{if(N.is_correct!=null)return;const M=Qr(t.answer,N.answer_text);M!==null&&Fn.from("answers").update({is_correct:M}).eq("id",N.id).then(()=>{})})},[g,h,u.length,u.map(N=>N.answer_text).join("|")]);const v=t.answer.mode==="choice"?t.answer.choices:null,f=(t.media.question??[]).filter(N=>!/\.(mp3|mp4|webm|wav)$/i.test(N)),p=(t.media.answer??[]).filter(N=>!/\.(mp3|mp4|webm|wav)$/i.test(N)),y=(t.media.question??[]).filter(N=>!/\.(mp3|mp4|webm|wav)$/i.test(N)),b=p.length?p:y,T=t.media.hidden?(t.media.question??[]).find(N=>/\.(mp4|webm)$/i.test(N)):void 0,A=(t.media.answer??[]).find(N=>/\.(mp3|wav|m4a|ogg)$/i.test(N));return o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"mono-tag",children:["РАУНД ",Qn(n,i.round_number)," :: ОТВЕТЫ"]}),o.jsxs("span",{className:"qnum",children:["ВОПРОС ",o.jsx("b",{children:h+1})," / ",m]})]}),o.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[o.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&o.jsxs(o.Fragment,{children:[o.jsx("p",{className:`q-text${Ri(t.question_text)}`,children:t.question_text}),y.length>0&&!t.media.hidden&&o.jsx("div",{className:`q-media-grid n${Math.min(y.length,4)}${y.length>1?" eq-row":""}${y.length>4?" wrap2":""}`,style:Ks(t),children:y.map((N,M)=>o.jsx(Js,{src:je(N)},M))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&o.jsx("p",{className:`q-recall${Ri(t.question_text)}`,children:t.question_text}),a&&o.jsxs("div",{className:"answer-block reveal-in",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),T&&o.jsx(Gx,{src:je(T)}),A&&o.jsx(Sd,{src:je(A)}),e.mechanic==="rebus"?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:Qi(t)}),o.jsx("div",{className:"rebus-answer",children:y.slice(0,2).map((N,M)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:je(N),alt:""}),o.jsx("figcaption",{children:Ux(M===0?t.service.word1:t.service.word2,M===0)})]},M))})]}):t.answer.mode==="match"?o.jsx(r_,{q:t}):v&&f.length===v.length?o.jsx(ml,{q:t,choices:v,imgs:f}):v?o.jsx(ml,{q:t,choices:v}):t.answer.mode==="order"?o.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((N,M)=>{const R=t.answer.choices.find(L=>L.key===N);return o.jsxs("div",{className:"oi",children:[o.jsx("b",{children:N}),o.jsx("span",{className:"oi-pos",children:M+1}),o.jsx("span",{className:"oi-text",children:(R==null?void 0:R.text)??""})]},M)})}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:Qi(t)}),b.length>0&&o.jsx("div",{className:`q-media-grid answer-media n${Math.min(b.length,4)}${b.length>1?" eq-row":""}${b.length>4?" wrap2":""}`,children:b.map((N,M)=>o.jsx(Js,{src:je(N)},M))})]}),g&&t.answer_note&&o.jsx("div",{className:`answer-note${Px(t.answer_note)}`,children:t.answer_note})]})]}),!s&&o.jsxs("div",{className:"team-answers",children:[o.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${u.length}`}),u.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),u.map(N=>{const M=c.find(L=>L.id===N.team_id)??d.find(L=>L.id===N.team_id),R=g?N.is_correct??Qr(t.answer,N.answer_text):null;return o.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${R===!0?"var(--ok)":R===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsx("span",{className:"name",style:{color:M==null?void 0:M.color},children:(M==null?void 0:M.name)??"—"}),o.jsxs("span",{className:"text",children:[a?N.answer_text||"—":"• • •",N.stake!=null&&N.stake!==0&&o.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",N.stake]})]}),R!=null&&o.jsx("span",{className:"mark",style:{color:R?"var(--ok)":"var(--danger)"},children:R?"✓":"✗"})]},N.id)})]})]}),o.jsxs("div",{className:"host-actions",children:[h>0&&o.jsx("button",{className:"ghost",onClick:()=>void $i(h-1,!0),children:"← Назад"}),a?h<m-1?o.jsx("button",{onClick:()=>void $i(h+1),children:"Следующий вопрос →"}):o.jsx(ri,{pack:n,gameState:i}):o.jsx("button",{onClick:()=>void ks(),children:"Показать ответ →"})]})]})}function ml({q:n,choices:e,imgs:t}){const[i,s]=te.useState(0);te.useEffect(()=>{s(0);const u=setTimeout(()=>s(1),2200),m=setTimeout(()=>s(2),vd);return()=>{clearTimeout(u),clearTimeout(m)}},[n.id]);const r=n.answer.correct_choice??"",a=e.filter(u=>u.key!==r),c=new Set(Fx(a.map(u=>u.key),n.id).slice(0,2)),d=u=>i>=1||c.has(u)?i<2?"":u===r?" correct":" dimmed":" hidden-yet",l=u=>c.has(u)?0:.25*e.filter(m=>!c.has(m.key)).findIndex(m=>m.key===u);return t?o.jsx("div",{className:"choice-imgs",children:e.map((u,m)=>o.jsxs("div",{className:`choice-img${d(u.key)}`,style:{animationDelay:`${l(u.key)}s`},children:[o.jsx("img",{src:je(t[m]),alt:""}),o.jsxs("span",{className:"key",children:[u.key,u.text?` — ${u.text}`:""]})]},u.key))}):o.jsx("div",{className:`choices-grid${Ya(e.map(u=>u.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(u=>o.jsxs("div",{className:`choice-plate${d(u.key)}`,style:{animationDelay:`${l(u.key)}s`},children:[o.jsx("span",{className:"key",children:u.key}),u.text]},u.key))})}function t_({enabled:n,startedAt:e,seconds:t}){return te.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{ks()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function n_({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return te.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,a=Math.max(500,r-Date.now()),c=setTimeout(()=>{Yi(e.question_index+1)},a);return()=>clearTimeout(c)},[e.timer_started_at,e.question_index,i]),null}function i_({pack:n,round:e,gameState:t}){const i=e.settings.themes??[],[s,r]=te.useState(void 0),a=Vd(t.melody);te.useEffect(()=>{s!==void 0&&a===s&&r(void 0)},[a,s]);const c=s!==void 0?s:a,d=pu(t),[l,u]=te.useState([]),[m,h]=te.useState(null),g=[...new Set([...d,...l])],_=async y=>{u([...g,y]),h(await gu(t,y,g))},v=e.title_lines.join(" ")||"СВОЯ ИГРА",f=wl(v,n.theme==="classic");if(i.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"СВОЯ ИГРА"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void tr("round_intro"),children:"← К титулу"})})]});const p=Math.max(...i.map(y=>y.tiles.length));return o.jsxs("div",{className:"host-screen grid-bg jp-screen",children:[o.jsx("h1",{className:"neon-title jp-title",children:n.theme==="classic"?f:v}),o.jsxs("div",{className:"jp-board",style:{gridTemplateColumns:`repeat(${i.length}, minmax(0, 1fr))`,gridTemplateRows:`auto repeat(${p}, minmax(0, 1fr))`},children:[m&&o.jsxs("div",{className:"jp-save-err",children:["⚠ ",m]}),i.map((y,b)=>o.jsxs("div",{className:"jp-theme-name",style:{gridColumn:b+1,gridRow:1},children:[y.name||`Тема ${b+1}`,y.hint&&o.jsx("span",{className:"jp-theme-hint",children:y.hint})]},`h${b}`)),i.map((y,b)=>y.tiles.map((T,A)=>{const S=g.includes(`${b}-${A}`);return o.jsx("button",{className:`jp-tile${S?" done":""}`,disabled:S,"data-c":b%8,style:{gridColumn:b+1,gridRow:A+2},onClick:()=>{const N=i.slice(0,b).reduce((M,R)=>M+R.tiles.length,0)+A;r(N),mu(t,N)},children:S?"·":T.value},`${b}-${A}`)}))]}),o.jsx("div",{className:"host-actions",children:o.jsx(ri,{pack:n,gameState:t})}),c!=null&&(()=>{var S,N,M,R;const y=Wd(i,c);if(!y)return null;const{ti:b,i:T,tile:A}=y;return o.jsx(s_,{packTheme:n.theme,round:e,gameState:t,theme:i[b],tile:A,tileIndex:c,showAnswer:!!((N=(S=t.melody)==null?void 0:S.jp)!=null&&N.answer),replayNonce:((R=(M=t.melody)==null?void 0:M.jp)==null?void 0:R.replay)??0,onShowAnswer:()=>void Mt(Xd(t.melody??{})),onReplay:()=>void Mt(jd(t.melody??{})),onClose:()=>{r(null),_(`${b}-${T}`)}})})()]})}function s_({round:n,gameState:e,theme:t,tile:i,tileIndex:s,onClose:r,packTheme:a,showAnswer:c,onShowAnswer:d,replayNonce:l,onReplay:u}){const m=n.settings.clipSeconds??30,h=te.useRef(null),[g,_]=te.useState(m),[v,f]=te.useState(!1),p=zn(e.game_id,e.round_number),y=un(e.game_id),[b,T]=te.useState(null),[A,S]=te.useState({});te.useEffect(()=>{S({})},[s]);const N=()=>{var L;if((L=h.current)==null||L.stop(),!i.audio){f(!1),T("у плитки не задан трек");return}T(null),_(m),h.current=Hu(je(i.audio),m,{onStart:()=>f(!0),onTick:I=>_(I),onEnd:()=>f(!1),onError:I=>{f(!1),T(I)}})};te.useEffect(()=>(N(),()=>{var L;(L=h.current)==null||L.stop()}),[s,l]);const M=p.filter(L=>Zd(L.question_ref,e.round_number)===s).sort((L,I)=>+new Date(L.updated_at)-+new Date(I.updated_at)),R=async(L,I)=>{S(B=>({...B,[L]:I})),await Fn.from("answers").update({is_correct:I}).eq("id",L)};return gl.createPortal(o.jsx("div",{className:`jp-overlay theme-${a??"classic"}`,children:o.jsxs("div",{className:"jp-modal hud-frame",children:[o.jsxs("div",{className:"jp-modal-head",children:[o.jsxs("div",{children:[o.jsx("div",{className:"jp-modal-theme",children:t.name}),o.jsxs("div",{className:"mono-tag",children:["ПЛИТКА · ",i.value]})]}),o.jsx("div",{className:`jp-count${v?" on":""}`,children:String(g).padStart(2,"0")})]}),c&&o.jsxs("div",{className:"answer-reveal hud-frame",style:{padding:"12px 18px"},children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",style:{fontSize:"clamp(24px,3vw,40px)"},children:i.correct})]}),o.jsxs("div",{className:"jp-answers",children:[o.jsx("div",{className:"mono-tag",children:c?"ОТВЕТЫ (ПО СКОРОСТИ)":`ОТВЕТИЛИ: ${M.length}`}),M.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"ждём ответы…"}),M.map((L,I)=>{const B=y.find(O=>O.id===L.team_id),K=A[L.id]??L.is_correct;return o.jsxs("div",{className:"jp-answer",style:{borderLeft:`3px solid ${K===!0?"var(--ok)":K===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsxs("span",{className:"pos",children:["#",I+1]}),o.jsx("span",{className:"name",style:{color:B==null?void 0:B.color},children:(B==null?void 0:B.name)??"—"}),o.jsx("span",{className:"txt",children:c?L.answer_text||"—":"• • •"}),c&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:`jp-grade ok${K===!0?" chosen":""}`,onClick:()=>void R(L.id,!0),children:"✓"}),o.jsx("button",{className:`jp-grade no${K===!1?" chosen":""}`,onClick:()=>void R(L.id,!1),children:"✗"})]})]},L.id)})]}),o.jsxs("div",{className:"jp-modal-foot",children:[!c&&o.jsx("button",{onClick:d,children:"Показать ответ"}),o.jsx("button",{className:"ghost",onClick:u,children:"↻ Переслушать"}),b&&o.jsxs("div",{className:"jp-audio-err",children:["🔇 ",b,o.jsx("button",{className:"ghost",style:{marginLeft:10},onClick:()=>void Gu(je(i.audio)).then(L=>alert(L)),children:"что с файлом?"})]}),M.some(L=>(A[L.id]??L.is_correct)==null)&&o.jsxs("div",{className:"jp-ungraded",children:["⚠ не оценено: ",M.filter(L=>(A[L.id]??L.is_correct)==null).length]}),o.jsx("button",{className:"ghost dark",onClick:r,children:"Закрыть плитку"})]})]})}),document.body)}function r_({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return o.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var d;const a=((d=i.find(l=>l.startsWith(s)))==null?void 0:d.slice(s.length))??"—",c=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return o.jsxs("div",{className:"mi",children:[t[r]&&o.jsx("img",{src:je(t[r]),alt:""}),o.jsxs("div",{className:"mi-label",children:[o.jsxs("b",{children:[s," → ",a]}),c&&c!==a&&o.jsx("span",{className:"mi-text",children:c})]})]},s)})})}function a_({pack:n,gameState:e}){const t=un(e.game_id),i=zn(e.game_id),s=yl(n,t,i),r=bl(n,t,i),a=n.rounds.filter(g=>!g.off_scoreboard),c=El(t,s,i,r),d=c.map(g=>g.team),[l,u]=te.useState(0);te.useEffect(()=>{if(u(0),d.length===0)return;const g=setInterval(()=>u(_=>_>=d.length?_:_+1),2200);return()=>clearInterval(g)},[d.length,e.round_number]);const m=te.useRef(null),h=Ka([d.length,a.length],{shrinkBefore:m});return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),o.jsx("h2",{className:"sb-title",ref:m,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),o.jsx("div",{className:"sb-table-wrap",children:o.jsxs("table",{ref:h,className:`score-table${Md(d.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),a.map((g,_)=>o.jsxs("th",{children:["Р",_+1]},g.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:d.map((g,_)=>{const v=c.find(y=>y.team.id===g.id),f=(v==null?void 0:v.place)??1,p=_>=d.length-l;return o.jsxs("tr",{className:`sb-row${p?" is-in":" is-veiled"}${f===1?" leader":""}`,children:[o.jsxs("td",{children:[f<=3?o.jsx("span",{className:"sb-medal",children:o.jsx(ea,{theme:n.theme,place:f})}):f,(v==null?void 0:v.shared)&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:g.color,fontFamily:"var(--font-display)"},children:o.jsx("span",{className:"sb-name",children:g.name})}),a.map(y=>{const b=r.get(g.id)??[];return o.jsx("td",{children:b[n.rounds.indexOf(y)]??0},y.id)}),o.jsx("td",{className:"total",children:s.get(g.id)??0})]},g.id)})})]})}),o.jsx("div",{className:"host-actions",children:o.jsx(ri,{pack:n,gameState:e})})]})}function o_({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=te.useState(i*60);te.useEffect(()=>{const d=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),l=()=>r(Math.max(0,Math.round(i*60-(Date.now()-d)/1e3)));l();const u=setInterval(l,500);return()=>clearInterval(u)},[t.timer_started_at,i]);const a=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),o.jsx(vn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),o.jsx(Zs,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[a,":",c]}),o.jsx("div",{className:"host-actions",children:o.jsx(ri,{pack:n,gameState:t})})]})}function c_({pack:n,gameState:e}){var c,d;const[i,s]=te.useState(300);te.useEffect(()=>{const l=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),u=()=>s(Math.max(0,Math.round(5*60-(Date.now()-l)/1e3)));u();const m=setInterval(u,500);return()=>clearInterval(m)},[e.timer_started_at]),te.useEffect(()=>{var m,h;const l=((m=n.settings)==null?void 0:m.finale_music)??((h=n.settings)==null?void 0:h.bg_music);if(!l||document.hidden)return;const u=Et();return u.src=je(l),u.loop=!0,u.volume=.55,u.play().catch(()=>{}),()=>{try{u.pause(),u.src=""}catch{}}},[(c=n.settings)==null?void 0:c.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=String(Math.floor(i/60)).padStart(2,"0"),a=String(i%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),o.jsx(vn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),o.jsx(Zs,{theme:n.theme}),o.jsxs("div",{className:"break-timer",children:[r,":",a]}),o.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void er(e.pack_id,!0),children:"К итогам →"})})]})}function l_({pack:n,gameId:e,gameState:t}){var M,R,L,I,B,K;const i=un(e),s=zn(e),r=yl(n,i,s),a=bl(n,i,s),c=El(i,r,s,a),d=!!t.reveal,l=t.question_index??0,[u,m]=te.useState(!((M=n.settings)!=null&&M.show_final_cinematic));te.useEffect(()=>{var W,V;const O=((W=n.settings)==null?void 0:W.finale_music)??((V=n.settings)==null?void 0:V.bg_music);if(!O||document.hidden||!u)return;const U=Et();return U.src=je(O),U.loop=!0,U.volume=.55,U.play().catch(()=>{}),()=>{try{U.pause(),U.src=""}catch{}}},[(R=n.settings)==null?void 0:R.finale_music,(L=n.settings)==null?void 0:L.bg_music,u]);const h=te.useRef(null),g=Ka([c.length],{shrinkBefore:h,minScale:.3}),v=n.rounds.map((O,U)=>({r:O,i:U})).filter(O=>!O.r.off_scoreboard).map(({r:O,i:U})=>{var Y;let W=null,V=-1/0;for(const re of i){const fe=((Y=a.get(re.id))==null?void 0:Y[U])??0;fe>V&&(V=fe,W=re)}return{round:O,idx:U,team:W,score:V}}),f=3e3,p=1e4,y=v.length;te.useEffect(()=>{if(d||l>y||!u)return;const U=setTimeout(()=>void bi(l+1),l===y?p:f);return()=>clearTimeout(U)},[d,l,y,u]);const[b,T]=te.useState(0);if(te.useEffect(()=>{if(T(0),c.length===0)return;let O=!1,U=0,W;const V=()=>{O||(U+=1,T(U),!(U>=c.length)&&(W=setTimeout(V,Math.max(320,900-90*U))))};return W=setTimeout(V,Math.max(320,900-90*U)),()=>{O=!0,clearTimeout(W)}},[c.length,l,d]),!u)return o.jsx(xx,{onDone:()=>m(!0)});const A=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],S=o.jsx(o.Fragment,{children:Array.from({length:5},(O,U)=>o.jsxs("div",{className:"fw-burst",style:{left:`${12+U*19}%`,top:`${18+U%3*14}%`},children:[o.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${A[U%A.length]}55, transparent 70%)`,"--dur":`${2.2+U*.3}s`,"--delay":`${U*.45}s`}}),Array.from({length:10},(W,V)=>o.jsx("span",{className:"fw-spark",style:{background:A[(U+V)%A.length],"--a":`${V*36}deg`,"--dur":`${2.2+U*.3}s`,"--delay":`${U*.45}s`}},V))]},U))}),N=o.jsxs("div",{className:"fin-breakdown",children:[o.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),o.jsx("div",{className:"fin-table-wrap",children:o.jsxs("table",{ref:g,className:`fin-table${Md(c.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),n.rounds.map((O,U)=>!O.off_scoreboard&&o.jsxs("th",{children:["Р",Qn(n,U)]},O.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:c.map(({team:O,place:U,shared:W},V)=>{const Y=V>=c.length-b;return o.jsxs("tr",{className:`fin-row${U<=3?" top3":""}${U===1?" fin-first":""}${Y?" is-in":" is-veiled"}`,children:[o.jsxs("td",{className:"fin-pos",children:[U,W&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:O.color},children:o.jsx("span",{className:"sb-name",children:O.name})}),n.rounds.map((re,fe)=>{var pe;return!re.off_scoreboard&&o.jsx("td",{children:((pe=a.get(O.id))==null?void 0:pe[fe])??0},re.id)}),o.jsx("td",{children:o.jsx("b",{children:r.get(O.id)??0})})]},O.id)})})]})})]});if(d){const O=[...new Set(c.map(V=>V.place))].filter(V=>V<=3).sort((V,Y)=>Y-V);if(l>=O.length)return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[S,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(vn,{ref:h,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),N,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Kr()},children:"⟲ Новая игра"})})]});const U=O[l],W=c.filter(V=>V.place===U);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void bi(l+1),children:[U===1&&S,o.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),o.jsxs("div",{className:`fin-award p${U}`,children:[o.jsxs("div",{className:"fin-award-place",children:[U," МЕСТО"]}),o.jsx("div",{className:"fin-award-medal",children:o.jsx(ea,{theme:n.theme,place:U})}),W.length>0?W.map(V=>o.jsx("div",{className:"fin-award-name",style:{color:V.team.color},children:V.team.name},V.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(l<y){const O=v[l];return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void bi(l+1),children:[o.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),o.jsxs("div",{className:"fin-slide",children:[o.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Qn(n,O.idx)," · ",O.round.title_lines.join(" ")]}),o.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),o.jsx("div",{className:"fin-slide-team",style:{color:(I=O.team)==null?void 0:I.color},children:((B=O.team)==null?void 0:B.name)??"—"})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"3s"}})},l),o.jsx("div",{className:"fin-dots",children:v.map((U,W)=>o.jsx("span",{className:W===l?"on":""},W))})]})}if(l===y){const O=c.filter(U=>U.place===1);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void bi(l+1),children:[S,o.jsx("div",{className:"mono-tag",children:O.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),o.jsxs("div",{className:"fin-award p1",children:[o.jsx("div",{className:"fin-award-medal",children:o.jsx(ea,{theme:n.theme,place:1})}),O.length>0?O.map(U=>o.jsx("div",{className:"fin-award-name",style:{color:U.team.color},children:U.team.name},U.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"}),o.jsx("div",{className:"fin-award-score",children:((K=O[0])==null?void 0:K.total)??0})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[S,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(vn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),N,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Kr()},children:"⟲ Новая игра"})})]})}export{v_ as HostScreen,Ya as choicesLenClass,Px as noteClass,Dx as stopAllMedia};
