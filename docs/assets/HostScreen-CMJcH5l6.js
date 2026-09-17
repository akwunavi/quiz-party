import{j as o,s as Nd}from"./index-YP5rAFw7.js";import{r as Z,a as vl}from"./vendor-BbIxR9j-.js";import{c as Ml,r as Pd,l as Ld,s as yl,a as Sl,f as tr,b as Dd,g as ea,d as ta,e as Yi,h as Bn,i as Hs,j as Ri,u as Id,R as Ud,k as Fd,m as na,n as Od,o as Vs,p as bl,q as nr,t as Bd,v as zd,w as kd,x as Gd,y as Lo,z as Hd,N as Do,S as Vd,A as Io,B as fr,C as Wd,M as Uo,D as Fo,E as Oo,F as Bo,G as jd,H as Xd,I as qd,J as $d,K as Yd,L as bi,O as Zd,P as Kd,Q as Jd,T as Qd,U as eu}from"./teamColors-C9lyWbS9.js";import{u as ir,p as tu,I as nu}from"./duration-CFnWiKrz.js";import{f as iu,m as Xe,l as Ci,r as su,a as ru,b as au,c as ou,d as Zi,e as cu,g as lu,h as zo,i as du,p as uu,j as hu,k as fu}from"./reveal-K7wx3QlF.js";import{a as El,s as pu,b as ia,u as Jt,c as En,d as Mt,m as mu,e as gu,f as xu,g as _u,h as ko,i as vu,j as Mu,p as yu,k as Su,l as bu,n as Eu,o as wu,q as Tu,r as pr,t as Ws,v as Au,L as Ru,w as Cu,x as Go,y as Nu,z as Pu,A as wl,B as Tl,C as sa,D as Lu}from"./revealActions-CRDIiuEK.js";import{d as Fn,l as Du,a as Iu,m as Ho}from"./packLoader-BuISPo5u.js";import{T as Uu,S as Fu}from"./ThemeLayer-tQ2ym7e4.js";import{Q as Ou}from"./QrCode-KU1ii00B.js";import{C as Bu}from"./CrosswordView-D6BzlZbz.js";import{r as zu}from"./packCache-Dtk2zpc1.js";import"./pollLoop-C97YFx7h.js";function Al({kind:n,label:e,backLabel:t,colorIndex:i,done:s,hot:r,interactive:a,flip:c,onClick:d,style:l,elRef:m}){const p=n==="jeopardy"?"jp-tile":"mel-tile",u=!!c&&!s,g=["qtile",p,s?"done":"",r?"spin":"",a?"pickable":"",u?"can-flip":""].filter(Boolean).join(" "),M=o.jsxs("span",{className:"qt-flip",children:[o.jsx("span",{className:`qt-face qt-front${n==="melody"?" mel-face":""}`,children:e}),u&&o.jsx("span",{className:"qt-face qt-back","aria-hidden":"true",children:t??e})]});return n==="jeopardy"?o.jsx("button",{className:g,disabled:s,"data-c":i,style:l,ref:m,onClick:d,children:M}):o.jsx("div",{className:g,"data-c":i,style:l,ref:m,onClick:a?d:void 0,children:M})}function ku(n){if(n<=1)return{topCount:n,cols:1};if(n===2)return{topCount:1,cols:2};if(n===3)return{topCount:1,cols:2};if(n===4)return{topCount:2,cols:2};if(n===5)return{topCount:2,cols:2};const e=n<=6?3:4;return{topCount:n%2===1?(n-1)/2:n/2,cols:e}}const Gu=n=>String(Math.max(0,Math.ceil(n/1e3)));function Vo({team:n,state:e,active:t,now:i}){const s=Ld(e,n.id,i),r=(e.correct[n.id]??0)-(e.missed[n.id]??0),a=s<=1e4;return o.jsxs("div",{className:`bz-block${t?" on":""}${a&&t?" low":""}`,style:{"--tc":n.color},children:[t&&o.jsx("span",{className:"bz-turn",children:"ХОД"}),o.jsx("div",{className:"bz-name",children:n.name}),o.jsx("div",{className:`bz-timer${a?" low":""}`,children:Gu(s)}),o.jsxs("div",{className:"bz-meta",children:[o.jsx("span",{className:"bz-pts",children:r>0?`+${r}`:r}),o.jsxs("span",{className:"bz-qn",children:["вопрос ",(e.correct[n.id]??0)+(e.missed[n.id]??0)+(t?1:0)]})]})]})}function Hu({teams:n,state:e,bank:t,questionText:i,verdict:s,answerText:r,dice:a,reveal:c}){const[d,l]=Z.useState(()=>Date.now());Z.useEffect(()=>{const h=setInterval(()=>l(Date.now()),250);return()=>clearInterval(h)},[]);const m=e.order.map(h=>n.find(S=>S.id===h)).filter(h=>!!h),p=Ml(e),{topCount:u}=ku(m.length),g=m.find(h=>h.id===p),M=m.slice(0,u),_=m.slice(u),f=Math.max(1,M.length);return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"БЛИЦ"}),o.jsx("span",{className:"bz-bank",children:Pd(t,e.used)})]}),o.jsx("div",{className:`bz-row${u>0&&u<m.length?" bz-row-top":""}`,style:{"--cols":f},children:M.map(h=>o.jsx(Vo,{team:h,state:e,active:h.id===p,now:d},h.id))}),o.jsx("div",{className:`bz-question${s?` v-${s}`:""}`,style:{"--tc":g==null?void 0:g.color},children:a??(i?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"bz-asking",children:["отвечают: ",o.jsx("b",{children:(g==null?void 0:g.name)??"—"})]}),o.jsx("div",{className:"bz-qtext",children:i}),s&&o.jsxs("div",{className:`bz-verdict ${s}`,children:[s==="ok"?"ВЕРНО":"НЕВЕРНО",r&&o.jsxs("span",{className:"bz-right",children:[" · ",r]})]})]}):c?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"bz-asking",children:c.verdict==="ok"?"ответили верно!":c.verdict==="skip"?"вопрос пропущен":"не угадали"}),o.jsx("div",{className:"bz-qtext",children:c.questionText}),o.jsxs("div",{className:`bz-verdict ${c.verdict==="ok"?"ok":"no"}`,children:["Правильный ответ: ",c.answerText]})]}):o.jsx("div",{className:"bz-asking",children:"следующий вопрос…"}))}),o.jsx("div",{className:"bz-row",style:{"--cols":Math.max(1,_.length)},children:_.map(h=>o.jsx(Vo,{team:h,state:e,active:h.id===p,now:d},h.id))})]})}function Wo({teams:n,pickedId:e,rolling:t}){const[i,s]=Z.useState(0);Z.useEffect(()=>{if(!t)return;const a=setInterval(()=>s(c=>(c+1)%Math.max(1,n.length)),110);return()=>clearInterval(a)},[t,n.length]);const r=t?n[i]:n.find(a=>a.id===e)??n[0];return o.jsxs("div",{className:"bz-dice-wrap",children:[o.jsx("div",{className:`bz-dice${t?" rolling":" done"}`,style:{"--tc":r==null?void 0:r.color},children:(r==null?void 0:r.name)??"—"}),o.jsx("div",{className:"bz-dice-cap",children:t?"кто начинает…":"начинает"})]})}function Ki({src:n,children:e}){const[t,i]=Z.useState(1.5);return o.jsxs("figure",{className:"q-img",style:{flexGrow:t,flexBasis:0},children:[o.jsx("img",{src:n,alt:"",onLoad:s=>{const r=s.currentTarget;r.naturalWidth&&r.naturalHeight&&i(r.naturalWidth/r.naturalHeight)}}),e]})}const Rl="qp-fx-enabled",Vu=4e3,Wu={classic:520,potter:700};function ju(){try{const n=localStorage.getItem(Rl);return n===null?!0:n==="1"}catch{return!0}}function Xu(n){try{localStorage.setItem(Rl,n?"1":"0")}catch{}}function qu(){return typeof location<"u"&&location.href.includes("nofx=1")}function $u({theme:n,trigger:e,hud:t}){const[i,s]=Z.useState(ju),r=Z.useRef(null),a=Z.useRef(0),[c,d]=Z.useState(null);Z.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",i),()=>{document.documentElement.classList.remove("fx-force-motion")}),[i]),Z.useEffect(()=>{const m=r.current===null;if(r.current=e,m||!i||n==="new_year"||qu())return;const p=Date.now();p-a.current<Vu||(a.current=p,d(p))},[e]),Z.useEffect(()=>{if(c===null)return;const m=(Wu[n]??300)+50,p=setTimeout(()=>d(null),m);return()=>clearTimeout(p)},[c,n]);const l=n==="classic"||n==="potter";return o.jsxs(o.Fragment,{children:[l&&o.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":i,title:i?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(m=>{const p=!m;return Xu(p),p}),children:"✨"}),c!==null&&n==="classic"&&o.jsx(Zu,{},c),c!==null&&n==="potter"&&o.jsx(Ku,{},c),n==="classic"&&t&&o.jsx(Yu,{label:t},t)]})}function Yu({label:n}){const[e,t]=Z.useState(()=>90+Math.floor(Math.random()*10));return Z.useEffect(()=>{const i=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(i)},[]),o.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",n," · SIG ",e,"%"]})}function Zu(){return o.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[o.jsx("span",{className:"fx-beam"}),o.jsx("span",{className:"fx-rgb"})]})}function Ku(){const n=Array.from({length:22},(e,t)=>t);return o.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>o.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const jo=["🥇","🥈","🥉"];function ra({theme:n,place:e}){return n==="classic"?o.jsx(Ju,{place:e}):n==="potter"?o.jsx(eh,{place:e}):n==="new_year"?o.jsx(Qu,{place:e}):o.jsx("span",{className:"award-emoji",children:jo[e-1]??jo[2]})}function Ju({place:n}){return o.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ah-orbit"}),o.jsx("span",{className:"ah-face",children:o.jsx("b",{children:n})})]})}function Qu({place:n}){return o.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"ab-cap"}),o.jsxs("span",{className:"ab-ball",children:[o.jsx("span",{className:"ab-shine"}),o.jsx("b",{children:n})]})]})}function eh({place:n}){return o.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"am-ribbon"}),o.jsxs("span",{className:"am-disc",children:[o.jsx("span",{className:"am-shine"}),o.jsx("b",{children:n})]})]})}function Gn({pack:n,gameState:e}){const t=El(n,e.round_number,e.phase),i=t.label.replace(" →","").toLowerCase(),s=()=>{var r,a,c;if(t.kind==="scoreboard")return void yl();if(t.kind==="break")return void Sl();if(t.kind==="finale"){const d=pu((r=n.settings)==null?void 0:r.info_slides);return d==null?void tr(e.pack_id,((a=n.settings)==null?void 0:a.play_mode)==="paper"):void Dd(d)}return void ea(e.round_number+1,ia((c=n.settings)==null?void 0:c.info_slides,e.round_number+1)??void 0)};return o.jsxs("button",{onClick:s,children:[i.charAt(0).toUpperCase()+i.slice(1)," →"]})}function th(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}const Xo="01#$%&/\\<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";function nh(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function qo(n,e,t=1){const i=Math.max(0,Math.min(1,e));if(i>=1)return n;const s=nh(t),r=Math.floor(n.length*i);let a="";for(let c=0;c<n.length;c++){const d=n[c];if(c<r||/\s/.test(d)){a+=d;continue}a+=Xo[Math.floor(s()*Xo.length)]}return a}const ih=14,sh=50;function Cl(n,e){const[t,i]=Z.useState(n),s=Z.useRef(0);return Z.useEffect(()=>{const r=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!e||r){i(n);return}s.current+=1;const a=s.current;let c=0;i(qo(n,0,a));const d=setInterval(()=>{c+=1;const l=c/ih;if(l>=1){i(n),clearInterval(d);return}i(qo(n,l,a))},sh);return()=>clearInterval(d)},[n,e]),t}const mr=new Map,js=new Set;function Et(){const n=new Audio;return js.add(n),n}function Nl(){js.forEach(n=>{try{n.pause(),n.currentTime=0,n.src=""}catch{}}),js.clear(),document.querySelectorAll("audio, video").forEach(n=>{const e=n;try{e.pause(),e.currentTime=0}catch{}})}function rh(n){const t="https://ivan-quiz-party.ru/storage/v1/object/public/quiz-media/";return!t||!n.startsWith(t)?null:n.slice(t.length).split("/").map(decodeURIComponent).join("/")}async function ah(n){const e=mr.get(n);if(e)return e;const t=rh(n);if(t)try{const r=await zu(t);if(r){const a=URL.createObjectURL(r);return mr.set(n,a),a}}catch{}const i=await iu(t??n),s=URL.createObjectURL(i);return mr.set(n,s),s}async function Pl(n,e,t=0){js.add(n);try{return n.src=e,t&&(n.currentTime=t),await n.play(),{ok:!0}}catch(i){if((i instanceof Error?i.name:"")==="NotAllowedError")return{ok:!1,reason:"браузер не разрешил звук — кликните по экрану"}}try{return n.src=await ah(e),t&&(n.currentTime=t),await n.play(),{ok:!0}}catch(i){return{ok:!1,reason:i instanceof Error&&/ФАЙЛА НЕТ/.test(i.message)?"файла нет в хранилище — трек нужно загрузить заново в редакторе":i instanceof Error&&/Failed to fetch|NetworkError/i.test(i.message)?"файл не скачивается: запрос блокирует браузер, VPN или расширение":`не удалось воспроизвести: ${i instanceof Error?i.message:"ошибка"}`}}}async function oh(n){const e=[n];try{const t=await fetch(n,{method:"GET",mode:"cors",credentials:"omit"});e.push(`fetch: ${t.status} ${t.statusText}`),e.push(`тип: ${t.headers.get("content-type")??"—"}`),e.push(`размер: ${t.headers.get("content-length")??"—"}`)}catch(t){e.push(`fetch НЕ ПРОШЁЛ: ${t instanceof Error?t.message:"ошибка"}`)}return e.join(`
`)}let as=0;function ch(n,e,t){const i=++as;Nl();const s=Et();let r;const a=()=>i!==as,c=()=>{r&&clearInterval(r);try{s.pause()}catch{}};return s.addEventListener("playing",()=>{var l,m;if(a()){c();return}(l=t.onStart)==null||l.call(t);let d=e;(m=t.onTick)==null||m.call(t,d),r=setInterval(()=>{var p,u;if(a()){c();return}d-=1,(p=t.onTick)==null||p.call(t,Math.max(0,d)),d<=0&&(c(),(u=t.onEnd)==null||u.call(t))},1e3)},{once:!0}),Pl(s,n).then(d=>{var l;if(a()){c();return}d.ok||(c(),(l=t.onError)==null||l.call(t,d.reason))}),{stop:()=>{i===as&&as++,c()}}}function lh({pack:n,round:e,gameState:t,timerNode:i}){var _,f;const s=e.settings,r=s.startDelaySec??5,a=s.afterTimerSec??5,c=e.questions.filter(h=>!h.hidden),d=e.settings.bg_music??((_=n.settings)==null?void 0:_.bg_music),l=((f=n.settings)==null?void 0:f.play_mode)==="paper";Z.useEffect(()=>{if(l||t.timer_started_at||document.hidden)return;const h=setTimeout(()=>{ta()},r*1e3);return()=>clearTimeout(h)},[t.timer_started_at,l]),Z.useEffect(()=>{if(!t.timer_started_at||!d||document.hidden)return;let h=!1;const S=Et();return S.src=Xe(d),S.loop=!0,S.volume=.6,S.play().then(()=>{if(h)try{S.pause(),S.src=""}catch{}}).catch(()=>{}),()=>{h=!0;try{S.pause(),S.src=""}catch{}}},[t.timer_started_at,d]),Z.useEffect(()=>{if(!t.timer_started_at||document.hidden)return;const S=new Date(t.timer_started_at).getTime()+e.timer_seconds*1e3-Date.now()+a*1e3,w=setTimeout(()=>{Yi(0)},Math.max(0,S));return()=>clearTimeout(w)},[t.timer_started_at]);const[m,p]=Z.useState(r);Z.useEffect(()=>{if(l||t.timer_started_at)return;const h=setInterval(()=>p(S=>Math.max(0,S-1)),1e3);return()=>clearInterval(h)},[t.timer_started_at,l]);const u=c.length%2===1?c[0]:null,g=u?c.slice(1):c,M=Math.ceil(g.length/2);return o.jsxs("div",{className:`sprint-screen${u?" with-hero":""}${c.length>7?" many":""}`,children:[u&&o.jsxs("div",{className:`sprint-hero sprint-card${Ci(u.question_text).trim()?Ci(u.question_text):""}`,children:[o.jsx("span",{className:"sprint-num",children:"1"}),o.jsx("div",{className:"sprint-text",children:u.question_text})]}),o.jsx("div",{className:"host-topbar sprint-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")})}),o.jsx("div",{className:"sprint-col",children:g.slice(0,M).map((h,S)=>o.jsx($o,{n:(u?2:1)+S,q:h},h.id))}),o.jsx("div",{className:"sprint-center",children:t.timer_started_at?o.jsx("div",{className:"sprint-timer",children:i}):o.jsxs("div",{className:"sprint-pre",children:[!l&&o.jsx("div",{className:"sprint-pre-num",children:m}),o.jsx("div",{className:"mono-tag",children:"ЧИТАЕМ ВОПРОСЫ"})]})}),o.jsx("div",{className:"sprint-col",children:g.slice(M).map((h,S)=>o.jsx($o,{n:(u?2:1)+M+S,q:h},h.id))})]})}function $o({n,q:e}){const t=(e.media.question??[]).find(i=>!/\.(mp3|mp4|webm|wav)$/i.test(i));return o.jsxs("div",{className:"sprint-card",children:[o.jsx("span",{className:"sprint-num",children:n}),o.jsx("div",{className:"sprint-text",children:e.question_text}),t&&o.jsx("img",{src:Xe(t),alt:"",className:"sprint-img"})]})}const Yo=16,Zo=6;function sr({left:n,seconds:e,low:t}){const i=Math.max(1,e),r=Math.max(0,Math.min(1,1-n/i))*360,a=100,c=78,d=l=>{const m=(l-90)*Math.PI/180;return{x:a+c*Math.cos(m),y:a+c*Math.sin(m)}};return o.jsxs("div",{className:`mg-circle-timer${t?" low":""}`,children:[o.jsx("div",{className:"mg-circle-glow","aria-hidden":!0}),o.jsxs("svg",{viewBox:"0 0 200 200","aria-hidden":!0,children:[o.jsx("circle",{cx:a,cy:a,r:c,fill:"none",stroke:"rgba(201,166,104,.22)",strokeWidth:"1",strokeDasharray:"2 7"}),Array.from({length:Yo},(l,m)=>{const p=m*(360/Yo),{x:u,y:g}=d(p),M=p<r-.01;return o.jsx("circle",{cx:u,cy:g,r:M?1.5:2.6,className:`mg-star${M?" dim":""}`,style:{animationDelay:`${-(p/360)*2.6}s`}},m)}),o.jsx("g",{style:{transform:`rotate(${r}deg)`,transformOrigin:"100px 100px"},children:Array.from({length:Zo},(l,m)=>{const{x:p,y:u}=d(-m*5.5),g=m/Zo;return o.jsx("circle",{cx:p,cy:u,r:m===0?4.4:Math.max(.6,3.4*(1-g)),className:m===0?"mg-comet-head":"mg-comet-tail",style:{opacity:m===0?1:Math.max(.06,.55*(1-g))}},m)})})]}),o.jsx("span",{className:`mg-circle-num${t?" danger":""}`,children:n})]})}let Xs=!1;const aa=new Set;function Ko(){Xs||(Xs=!0,aa.forEach(n=>n(!0)))}async function Jo(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n;e.state==="suspended"&&await e.resume();const t=e.state==="running";return e.close(),t}catch{return!1}}function to(){const[n,e]=Z.useState(Xs);return Z.useEffect(()=>{if(Xs)return;aa.add(e);const t=()=>{Jo().then(i=>{i&&Ko()})};return window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),Jo().then(i=>{i&&Ko()}),()=>{aa.delete(e),window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t)}},[]),n}function no(){return to()?null:o.jsxs("div",{className:"audio-gate",onClick:()=>{},children:[o.jsx("span",{children:"🔇 Звук заблокирован браузером"}),o.jsx("b",{children:"кликните по экрану один раз"})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const io="185",dh=0,Qo=1,uh=2,Us=1,hh=2,qi=3,zn=0,zt=1,xn=2,Mn=0,Ei=1,ti=2,ec=3,tc=4,fh=5,Yn=100,ph=101,mh=102,gh=103,xh=104,_h=200,vh=201,Mh=202,yh=203,oa=204,ca=205,Sh=206,bh=207,Eh=208,wh=209,Th=210,Ah=211,Rh=212,Ch=213,Nh=214,la=0,da=1,ua=2,Ni=3,ha=4,fa=5,pa=6,ma=7,Ll=0,Ph=1,Lh=2,cn=0,Dl=1,Il=2,Ul=3,Fl=4,Ol=5,Bl=6,zl=7,kl=300,ni=301,Pi=302,gr=303,xr=304,rr=306,ga=1e3,_n=1001,xa=1002,Tt=1003,Dh=1004,os=1005,Nt=1006,_r=1007,Kn=1008,Vt=1009,Gl=1010,Hl=1011,Ji=1012,so=1013,dn=1014,an=1015,Sn=1016,ro=1017,ao=1018,Qi=1020,Vl=35902,Wl=35899,jl=1021,Xl=1022,Kt=1023,bn=1026,Jn=1027,ql=1028,oo=1029,ii=1030,co=1031,lo=1033,Fs=33776,Os=33777,Bs=33778,zs=33779,_a=35840,va=35841,Ma=35842,ya=35843,Sa=36196,ba=37492,Ea=37496,wa=37488,Ta=37489,qs=37490,Aa=37491,Ra=37808,Ca=37809,Na=37810,Pa=37811,La=37812,Da=37813,Ia=37814,Ua=37815,Fa=37816,Oa=37817,Ba=37818,za=37819,ka=37820,Ga=37821,Ha=36492,Va=36494,Wa=36495,ja=36283,Xa=36284,$s=36285,qa=36286,Ih=3200,$a=0,Uh=1,In="",Xt="srgb",Ys="srgb-linear",Zs="linear",tt="srgb",ci=7680,nc=519,Fh=512,Oh=513,Bh=514,uo=515,zh=516,kh=517,ho=518,Gh=519,ic=35044,sc="300 es",on=2e3,es=2001;function Hh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ks(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vh(){const n=Ks("canvas");return n.style.display="block",n}const rc={};function ac(...n){const e="THREE."+n.shift();console.log(e,...n)}function $l(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=$l(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=$l(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function wi(...n){const e=n.join(" ");e in rc||(rc[e]=!0,Fe(...n))}function Wh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const jh={[la]:da,[ua]:pa,[ha]:ma,[Ni]:fa,[da]:la,[pa]:ua,[ma]:ha,[fa]:Ni};class ri{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vr=Math.PI/180,Ya=180/Math.PI;function ns(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function Xh(n,e){return(n%e+e)%e}function Mr(n,e,t){return(1-t)*n+t*e}function Bi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const _o=class _o{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_o.prototype.isVector2=!0;let Ke=_o;class Ii{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,c){let d=i[s+0],l=i[s+1],m=i[s+2],p=i[s+3],u=r[a+0],g=r[a+1],M=r[a+2],_=r[a+3];if(p!==_||d!==u||l!==g||m!==M){let f=d*u+l*g+m*M+p*_;f<0&&(u=-u,g=-g,M=-M,_=-_,f=-f);let h=1-c;if(f<.9995){const S=Math.acos(f),w=Math.sin(S);h=Math.sin(h*S)/w,c=Math.sin(c*S)/w,d=d*h+u*c,l=l*h+g*c,m=m*h+M*c,p=p*h+_*c}else{d=d*h+u*c,l=l*h+g*c,m=m*h+M*c,p=p*h+_*c;const S=1/Math.sqrt(d*d+l*l+m*m+p*p);d*=S,l*=S,m*=S,p*=S}}e[t]=d,e[t+1]=l,e[t+2]=m,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,a){const c=i[s],d=i[s+1],l=i[s+2],m=i[s+3],p=r[a],u=r[a+1],g=r[a+2],M=r[a+3];return e[t]=c*M+m*p+d*g-l*u,e[t+1]=d*M+m*u+l*p-c*g,e[t+2]=l*M+m*g+c*u-d*p,e[t+3]=m*M-c*p-d*u-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,d=Math.sin,l=c(i/2),m=c(s/2),p=c(r/2),u=d(i/2),g=d(s/2),M=d(r/2);switch(a){case"XYZ":this._x=u*m*p+l*g*M,this._y=l*g*p-u*m*M,this._z=l*m*M+u*g*p,this._w=l*m*p-u*g*M;break;case"YXZ":this._x=u*m*p+l*g*M,this._y=l*g*p-u*m*M,this._z=l*m*M-u*g*p,this._w=l*m*p+u*g*M;break;case"ZXY":this._x=u*m*p-l*g*M,this._y=l*g*p+u*m*M,this._z=l*m*M+u*g*p,this._w=l*m*p-u*g*M;break;case"ZYX":this._x=u*m*p-l*g*M,this._y=l*g*p+u*m*M,this._z=l*m*M-u*g*p,this._w=l*m*p+u*g*M;break;case"YZX":this._x=u*m*p+l*g*M,this._y=l*g*p+u*m*M,this._z=l*m*M-u*g*p,this._w=l*m*p-u*g*M;break;case"XZY":this._x=u*m*p-l*g*M,this._y=l*g*p-u*m*M,this._z=l*m*M+u*g*p,this._w=l*m*p+u*g*M;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],c=t[5],d=t[9],l=t[2],m=t[6],p=t[10],u=i+c+p;if(u>0){const g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(m-d)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(i>c&&i>p){const g=2*Math.sqrt(1+i-c-p);this._w=(m-d)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(c>p){const g=2*Math.sqrt(1+c-i-p);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(d+m)/g}else{const g=2*Math.sqrt(1+p-i-c);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(d+m)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,c=t._x,d=t._y,l=t._z,m=t._w;return this._x=i*m+a*c+s*l-r*d,this._y=s*m+a*d+r*c-i*l,this._z=r*m+a*l+i*d-s*c,this._w=a*m-i*c-s*d-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,a=-a,c=-c);let d=1-t;if(c<.9995){const l=Math.acos(c),m=Math.sin(l);d=Math.sin(d*l)/m,t=Math.sin(t*l)/m,this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this._onChangeCallback()}else this._x=this._x*d+i*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const vo=class vo{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(oc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(oc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,c=e.z,d=e.w,l=2*(a*s-c*i),m=2*(c*t-r*s),p=2*(r*i-a*t);return this.x=t+d*l+a*p-c*m,this.y=i+d*m+c*l-r*p,this.z=s+d*p+r*m-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,c=t.y,d=t.z;return this.x=s*d-r*c,this.y=r*a-i*d,this.z=i*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yr.copy(this).projectOnVector(e),this.sub(yr)}reflect(e){return this.sub(yr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};vo.prototype.isVector3=!0;let Q=vo;const yr=new Q,oc=new Ii,Mo=class Mo{constructor(e,t,i,s,r,a,c,d,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,c,d,l)}set(e,t,i,s,r,a,c,d,l){const m=this.elements;return m[0]=e,m[1]=s,m[2]=c,m[3]=t,m[4]=r,m[5]=d,m[6]=i,m[7]=a,m[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],c=i[3],d=i[6],l=i[1],m=i[4],p=i[7],u=i[2],g=i[5],M=i[8],_=s[0],f=s[3],h=s[6],S=s[1],w=s[4],E=s[7],b=s[2],y=s[5],R=s[8];return r[0]=a*_+c*S+d*b,r[3]=a*f+c*w+d*y,r[6]=a*h+c*E+d*R,r[1]=l*_+m*S+p*b,r[4]=l*f+m*w+p*y,r[7]=l*h+m*E+p*R,r[2]=u*_+g*S+M*b,r[5]=u*f+g*w+M*y,r[8]=u*h+g*E+M*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],m=e[8];return t*a*m-t*c*l-i*r*m+i*c*d+s*r*l-s*a*d}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],m=e[8],p=m*a-c*l,u=c*d-m*r,g=l*r-a*d,M=t*p+i*u+s*g;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/M;return e[0]=p*_,e[1]=(s*l-m*i)*_,e[2]=(c*i-s*a)*_,e[3]=u*_,e[4]=(m*t-s*d)*_,e[5]=(s*r-c*t)*_,e[6]=g*_,e[7]=(i*d-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,c){const d=Math.cos(r),l=Math.sin(r);return this.set(i*d,i*l,-i*(d*a+l*c)+a+e,-s*l,s*d,-s*(-l*a+d*c)+c+t,0,0,1),this}scale(e,t){return wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Sr.makeScale(e,t)),this}rotate(e){return wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Sr.makeRotation(-e)),this}translate(e,t){return wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Sr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Mo.prototype.isMatrix3=!0;let Oe=Mo;const Sr=new Oe,cc=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lc=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qh(){const n={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=yn(s.r),s.g=yn(s.g),s.b=yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===In?Zs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ys]:{primaries:e,whitePoint:i,transfer:Zs,toXYZ:cc,fromXYZ:lc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:cc,fromXYZ:lc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const Ye=qh();function yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ti(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let li;class $h{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{li===void 0&&(li=Ks("canvas")),li.width=e.width,li.height=e.height;const s=li.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=li}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ks("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yn(t[i]/255)*255):t[i]=yn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yh=0;class fo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=ns(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(br(s[a].image)):r.push(br(s[a]))}else r=br(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function br(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?$h.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Zh=0;const Er=new Q;class Pt extends ri{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=_n,s=_n,r=Nt,a=Kn,c=Kt,d=Vt,l=Pt.DEFAULT_ANISOTROPY,m=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=ns(),this.name="",this.source=new fo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=d,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Er).x}get height(){return this.source.getSize(Er).y}get depth(){return this.source.getSize(Er).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ga:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ga:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=kl;Pt.DEFAULT_ANISOTROPY=1;const yo=class yo{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const d=e.elements,l=d[0],m=d[4],p=d[8],u=d[1],g=d[5],M=d[9],_=d[2],f=d[6],h=d[10];if(Math.abs(m-u)<.01&&Math.abs(p-_)<.01&&Math.abs(M-f)<.01){if(Math.abs(m+u)<.1&&Math.abs(p+_)<.1&&Math.abs(M+f)<.1&&Math.abs(l+g+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,E=(g+1)/2,b=(h+1)/2,y=(m+u)/4,R=(p+_)/4,v=(M+f)/4;return w>E&&w>b?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=y/i,r=R/i):E>b?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=y/s,r=v/s):b<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),i=R/r,s=v/r),this.set(i,s,r,t),this}let S=Math.sqrt((f-M)*(f-M)+(p-_)*(p-_)+(u-m)*(u-m));return Math.abs(S)<.001&&(S=1),this.x=(f-M)/S,this.y=(p-_)/S,this.z=(u-m)/S,this.w=Math.acos((l+g+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};yo.prototype.isVector4=!0;let ut=yo;class Kh extends ri{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Pt(s),a=i.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new fo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends Kh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Yl extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jh extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const er=class er{constructor(e,t,i,s,r,a,c,d,l,m,p,u,g,M,_,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,c,d,l,m,p,u,g,M,_,f)}set(e,t,i,s,r,a,c,d,l,m,p,u,g,M,_,f){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=r,h[5]=a,h[9]=c,h[13]=d,h[2]=l,h[6]=m,h[10]=p,h[14]=u,h[3]=g,h[7]=M,h[11]=_,h[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new er().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/di.setFromMatrixColumn(e,0).length(),r=1/di.setFromMatrixColumn(e,1).length(),a=1/di.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),c=Math.sin(i),d=Math.cos(s),l=Math.sin(s),m=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const u=a*m,g=a*p,M=c*m,_=c*p;t[0]=d*m,t[4]=-d*p,t[8]=l,t[1]=g+M*l,t[5]=u-_*l,t[9]=-c*d,t[2]=_-u*l,t[6]=M+g*l,t[10]=a*d}else if(e.order==="YXZ"){const u=d*m,g=d*p,M=l*m,_=l*p;t[0]=u+_*c,t[4]=M*c-g,t[8]=a*l,t[1]=a*p,t[5]=a*m,t[9]=-c,t[2]=g*c-M,t[6]=_+u*c,t[10]=a*d}else if(e.order==="ZXY"){const u=d*m,g=d*p,M=l*m,_=l*p;t[0]=u-_*c,t[4]=-a*p,t[8]=M+g*c,t[1]=g+M*c,t[5]=a*m,t[9]=_-u*c,t[2]=-a*l,t[6]=c,t[10]=a*d}else if(e.order==="ZYX"){const u=a*m,g=a*p,M=c*m,_=c*p;t[0]=d*m,t[4]=M*l-g,t[8]=u*l+_,t[1]=d*p,t[5]=_*l+u,t[9]=g*l-M,t[2]=-l,t[6]=c*d,t[10]=a*d}else if(e.order==="YZX"){const u=a*d,g=a*l,M=c*d,_=c*l;t[0]=d*m,t[4]=_-u*p,t[8]=M*p+g,t[1]=p,t[5]=a*m,t[9]=-c*m,t[2]=-l*m,t[6]=g*p+M,t[10]=u-_*p}else if(e.order==="XZY"){const u=a*d,g=a*l,M=c*d,_=c*l;t[0]=d*m,t[4]=-p,t[8]=l*m,t[1]=u*p+_,t[5]=a*m,t[9]=g*p-M,t[2]=M*p-g,t[6]=c*m,t[10]=_*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qh,e,ef)}lookAt(e,t,i){const s=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Rn.crossVectors(i,Gt),Rn.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Rn.crossVectors(i,Gt)),Rn.normalize(),cs.crossVectors(Gt,Rn),s[0]=Rn.x,s[4]=cs.x,s[8]=Gt.x,s[1]=Rn.y,s[5]=cs.y,s[9]=Gt.y,s[2]=Rn.z,s[6]=cs.z,s[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],c=i[4],d=i[8],l=i[12],m=i[1],p=i[5],u=i[9],g=i[13],M=i[2],_=i[6],f=i[10],h=i[14],S=i[3],w=i[7],E=i[11],b=i[15],y=s[0],R=s[4],v=s[8],C=s[12],U=s[1],P=s[5],F=s[9],$=s[13],D=s[2],I=s[6],H=s[10],k=s[14],K=s[3],re=s[7],fe=s[11],pe=s[15];return r[0]=a*y+c*U+d*D+l*K,r[4]=a*R+c*P+d*I+l*re,r[8]=a*v+c*F+d*H+l*fe,r[12]=a*C+c*$+d*k+l*pe,r[1]=m*y+p*U+u*D+g*K,r[5]=m*R+p*P+u*I+g*re,r[9]=m*v+p*F+u*H+g*fe,r[13]=m*C+p*$+u*k+g*pe,r[2]=M*y+_*U+f*D+h*K,r[6]=M*R+_*P+f*I+h*re,r[10]=M*v+_*F+f*H+h*fe,r[14]=M*C+_*$+f*k+h*pe,r[3]=S*y+w*U+E*D+b*K,r[7]=S*R+w*P+E*I+b*re,r[11]=S*v+w*F+E*H+b*fe,r[15]=S*C+w*$+E*k+b*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],c=e[5],d=e[9],l=e[13],m=e[2],p=e[6],u=e[10],g=e[14],M=e[3],_=e[7],f=e[11],h=e[15],S=d*g-l*u,w=c*g-l*p,E=c*u-d*p,b=a*g-l*m,y=a*u-d*m,R=a*p-c*m;return t*(_*S-f*w+h*E)-i*(M*S-f*b+h*y)+s*(M*w-_*b+h*R)-r*(M*E-_*y+f*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],c=e[9],d=e[2],l=e[6],m=e[10];return t*(a*m-c*l)-i*(r*m-c*d)+s*(r*l-a*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],c=e[5],d=e[6],l=e[7],m=e[8],p=e[9],u=e[10],g=e[11],M=e[12],_=e[13],f=e[14],h=e[15],S=t*c-i*a,w=t*d-s*a,E=t*l-r*a,b=i*d-s*c,y=i*l-r*c,R=s*l-r*d,v=m*_-p*M,C=m*f-u*M,U=m*h-g*M,P=p*f-u*_,F=p*h-g*_,$=u*h-g*f,D=S*$-w*F+E*P+b*U-y*C+R*v;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/D;return e[0]=(c*$-d*F+l*P)*I,e[1]=(s*F-i*$-r*P)*I,e[2]=(_*R-f*y+h*b)*I,e[3]=(u*y-p*R-g*b)*I,e[4]=(d*U-a*$-l*C)*I,e[5]=(t*$-s*U+r*C)*I,e[6]=(f*E-M*R-h*w)*I,e[7]=(m*R-u*E+g*w)*I,e[8]=(a*F-c*U+l*v)*I,e[9]=(i*U-t*F-r*v)*I,e[10]=(M*y-_*E+h*S)*I,e[11]=(p*E-m*y-g*S)*I,e[12]=(c*C-a*P-d*v)*I,e[13]=(t*P-i*C+s*v)*I,e[14]=(_*w-M*b-f*S)*I,e[15]=(m*b-p*w+u*S)*I,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,c=e.y,d=e.z,l=r*a,m=r*c;return this.set(l*a+i,l*c-s*d,l*d+s*c,0,l*c+s*d,m*c+i,m*d-s*a,0,l*d-s*c,m*d+s*a,r*d*d+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,c=t._z,d=t._w,l=r+r,m=a+a,p=c+c,u=r*l,g=r*m,M=r*p,_=a*m,f=a*p,h=c*p,S=d*l,w=d*m,E=d*p,b=i.x,y=i.y,R=i.z;return s[0]=(1-(_+h))*b,s[1]=(g+E)*b,s[2]=(M-w)*b,s[3]=0,s[4]=(g-E)*y,s[5]=(1-(u+h))*y,s[6]=(f+S)*y,s[7]=0,s[8]=(M+w)*R,s[9]=(f-S)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=di.set(s[0],s[1],s[2]).length();const c=di.set(s[4],s[5],s[6]).length(),d=di.set(s[8],s[9],s[10]).length();r<0&&(a=-a),qt.copy(this);const l=1/a,m=1/c,p=1/d;return qt.elements[0]*=l,qt.elements[1]*=l,qt.elements[2]*=l,qt.elements[4]*=m,qt.elements[5]*=m,qt.elements[6]*=m,qt.elements[8]*=p,qt.elements[9]*=p,qt.elements[10]*=p,t.setFromRotationMatrix(qt),i.x=a,i.y=c,i.z=d,this}makePerspective(e,t,i,s,r,a,c=on,d=!1){const l=this.elements,m=2*r/(t-e),p=2*r/(i-s),u=(t+e)/(t-e),g=(i+s)/(i-s);let M,_;if(d)M=r/(a-r),_=a*r/(a-r);else if(c===on)M=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===es)M=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=m,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=p,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=M,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,c=on,d=!1){const l=this.elements,m=2/(t-e),p=2/(i-s),u=-(t+e)/(t-e),g=-(i+s)/(i-s);let M,_;if(d)M=1/(a-r),_=a/(a-r);else if(c===on)M=-2/(a-r),_=-(a+r)/(a-r);else if(c===es)M=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=m,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=p,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=M,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};er.prototype.isMatrix4=!0;let ht=er;const di=new Q,qt=new ht,Qh=new Q(0,0,0),ef=new Q(1,1,1),Rn=new Q,cs=new Q,Gt=new Q,dc=new ht,uc=new Ii;class kn{constructor(e=0,t=0,i=0,s=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],d=s[1],l=s[5],m=s[9],p=s[2],u=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-m,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(d,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-Ze(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-m,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return dc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uc.setFromEuler(this),this.setFromQuaternion(uc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Zl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tf=0;const hc=new Q,ui=new Ii,hn=new ht,ls=new Q,zi=new Q,nf=new Q,sf=new Ii,fc=new Q(1,0,0),pc=new Q(0,1,0),mc=new Q(0,0,1),gc={type:"added"},rf={type:"removed"},hi={type:"childadded",child:null},wr={type:"childremoved",child:null};class It extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new Q,t=new kn,i=new Ii,s=new Q(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Oe}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(fc,e)}rotateY(e){return this.rotateOnAxis(pc,e)}rotateZ(e){return this.rotateOnAxis(mc,e)}translateOnAxis(e,t){return hc.copy(e).applyQuaternion(this.quaternion),this.position.add(hc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fc,e)}translateY(e){return this.translateOnAxis(pc,e)}translateZ(e){return this.translateOnAxis(mc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ls.copy(e):ls.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(zi,ls,this.up):hn.lookAt(ls,zi,this.up),this.quaternion.setFromRotationMatrix(hn),s&&(hn.extractRotation(s.matrixWorld),ui.setFromRotationMatrix(hn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gc),hi.child=e,this.dispatchEvent(hi),hi.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rf),wr.child=e,this.dispatchEvent(wr),wr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gc),hi.child=e,this.dispatchEvent(hi),hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,nf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,sf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,d){return c[d.uuid]===void 0&&(c[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const d=c.shapes;if(Array.isArray(d))for(let l=0,m=d.length;l<m;l++){const p=d[l];r(e.shapes,p)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let d=0,l=this.material.length;d<l;d++)c.push(r(e.materials,this.material[d]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const d=this.animations[c];s.animations.push(r(e.animations,d))}}if(t){const c=a(e.geometries),d=a(e.materials),l=a(e.textures),m=a(e.images),p=a(e.shapes),u=a(e.skeletons),g=a(e.animations),M=a(e.nodes);c.length>0&&(i.geometries=c),d.length>0&&(i.materials=d),l.length>0&&(i.textures=l),m.length>0&&(i.images=m),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),g.length>0&&(i.animations=g),M.length>0&&(i.nodes=M)}return i.object=s,i;function a(c){const d=[];for(const l in c){const m=c[l];delete m.metadata,d.push(m)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new Q(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qn extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const af={type:"move"};class Tr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const c=this._targetRay,d=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const f=t.getJointPose(_,i),h=this._getHandJoint(l,_);f!==null&&(h.matrix.fromArray(f.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=f.radius),h.visible=f!==null}const m=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],u=m.position.distanceTo(p.position),g=.02,M=.005;l.inputState.pinching&&u>g+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=g-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(af)))}return c!==null&&(c.visible=s!==null),d!==null&&(d.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Qn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},ds={h:0,s:0,l:0};function Ar(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=Xh(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ar(a,r,e+1/3),this.g=Ar(a,r,e),this.b=Ar(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=Kl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Ye.workingToColorSpace(Ct.copy(this),e),Math.round(Ze(Ct.r*255,0,255))*65536+Math.round(Ze(Ct.g*255,0,255))*256+Math.round(Ze(Ct.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Ct.copy(this),t);const i=Ct.r,s=Ct.g,r=Ct.b,a=Math.max(i,s,r),c=Math.min(i,s,r);let d,l;const m=(c+a)/2;if(c===a)d=0,l=0;else{const p=a-c;switch(l=m<=.5?p/(a+c):p/(2-a-c),a){case i:d=(s-r)/p+(s<r?6:0);break;case s:d=(r-i)/p+2;break;case r:d=(i-s)/p+4;break}d/=6}return e.h=d,e.s=l,e.l=m,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Xt){Ye.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,i=Ct.g,s=Ct.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Cn),this.setHSL(Cn.h+e,Cn.s+t,Cn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Cn),e.getHSL(ds);const i=Mr(Cn.h,ds.h,t),s=Mr(Cn.s,ds.s,t),r=Mr(Cn.l,ds.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new qe;qe.NAMES=Kl;class ar{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=t}clone(){return new ar(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Jl extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const $t=new Q,fn=new Q,Rr=new Q,pn=new Q,fi=new Q,pi=new Q,xc=new Q,Cr=new Q,Nr=new Q,Pr=new Q,Lr=new ut,Dr=new ut,Ir=new ut;class Zt{constructor(e=new Q,t=new Q,i=new Q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),$t.subVectors(e,t),s.cross($t);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){$t.subVectors(s,t),fn.subVectors(i,t),Rr.subVectors(e,t);const a=$t.dot($t),c=$t.dot(fn),d=$t.dot(Rr),l=fn.dot(fn),m=fn.dot(Rr),p=a*l-c*c;if(p===0)return r.set(0,0,0),null;const u=1/p,g=(l*d-c*m)*u,M=(a*m-c*d)*u;return r.set(1-g-M,M,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,i,s,r,a,c,d){return this.getBarycoord(e,t,i,s,pn)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,pn.x),d.addScaledVector(a,pn.y),d.addScaledVector(c,pn.z),d)}static getInterpolatedAttribute(e,t,i,s,r,a){return Lr.setScalar(0),Dr.setScalar(0),Ir.setScalar(0),Lr.fromBufferAttribute(e,t),Dr.fromBufferAttribute(e,i),Ir.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Lr,r.x),a.addScaledVector(Dr,r.y),a.addScaledVector(Ir,r.z),a}static isFrontFacing(e,t,i,s){return $t.subVectors(i,t),fn.subVectors(e,t),$t.cross(fn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),$t.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Zt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,c;fi.subVectors(s,i),pi.subVectors(r,i),Cr.subVectors(e,i);const d=fi.dot(Cr),l=pi.dot(Cr);if(d<=0&&l<=0)return t.copy(i);Nr.subVectors(e,s);const m=fi.dot(Nr),p=pi.dot(Nr);if(m>=0&&p<=m)return t.copy(s);const u=d*p-m*l;if(u<=0&&d>=0&&m<=0)return a=d/(d-m),t.copy(i).addScaledVector(fi,a);Pr.subVectors(e,r);const g=fi.dot(Pr),M=pi.dot(Pr);if(M>=0&&g<=M)return t.copy(r);const _=g*l-d*M;if(_<=0&&l>=0&&M<=0)return c=l/(l-M),t.copy(i).addScaledVector(pi,c);const f=m*M-g*p;if(f<=0&&p-m>=0&&g-M>=0)return xc.subVectors(r,s),c=(p-m)/(p-m+(g-M)),t.copy(s).addScaledVector(xc,c);const h=1/(f+_+u);return a=_*h,c=u*h,t.copy(i).addScaledVector(fi,a).addScaledVector(pi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class is{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(r,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),us.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),us.copy(i.boundingBox)),us.applyMatrix4(e.matrixWorld),this.union(us)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ki),hs.subVectors(this.max,ki),mi.subVectors(e.a,ki),gi.subVectors(e.b,ki),xi.subVectors(e.c,ki),Nn.subVectors(gi,mi),Pn.subVectors(xi,gi),Vn.subVectors(mi,xi);let t=[0,-Nn.z,Nn.y,0,-Pn.z,Pn.y,0,-Vn.z,Vn.y,Nn.z,0,-Nn.x,Pn.z,0,-Pn.x,Vn.z,0,-Vn.x,-Nn.y,Nn.x,0,-Pn.y,Pn.x,0,-Vn.y,Vn.x,0];return!Ur(t,mi,gi,xi,hs)||(t=[1,0,0,0,1,0,0,0,1],!Ur(t,mi,gi,xi,hs))?!1:(fs.crossVectors(Nn,Pn),t=[fs.x,fs.y,fs.z],Ur(t,mi,gi,xi,hs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mn=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Yt=new Q,us=new is,mi=new Q,gi=new Q,xi=new Q,Nn=new Q,Pn=new Q,Vn=new Q,ki=new Q,hs=new Q,fs=new Q,Wn=new Q;function Ur(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Wn.fromArray(n,r);const c=s.x*Math.abs(Wn.x)+s.y*Math.abs(Wn.y)+s.z*Math.abs(Wn.z),d=e.dot(Wn),l=t.dot(Wn),m=i.dot(Wn);if(Math.max(-Math.max(d,l,m),Math.min(d,l,m))>c)return!1}return!0}const vt=new Q,ps=new Ke;let of=0;class Ut extends ri{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:of++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ic,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ps.fromBufferAttribute(this,t),ps.applyMatrix3(e),this.setXY(t,ps.x,ps.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Bi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ic&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ql extends Ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ed extends Ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class wt extends Ut{constructor(e,t,i){super(new Float32Array(e),t,i)}}const cf=new is,Gi=new Q,Fr=new Q;class or{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):cf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gi.subVectors(e,this.center);const t=Gi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Gi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gi.copy(e.center).add(Fr)),this.expandByPoint(Gi.copy(e.center).sub(Fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let lf=0;const jt=new ht,Or=new It,_i=new Q,Ht=new is,Hi=new is,bt=new Q;class Lt extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hh(e)?ed:Ql)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,i){return jt.makeTranslation(e,t,i),this.applyMatrix4(jt),this}scale(e,t,i){return jt.makeScale(e,t,i),this.applyMatrix4(jt),this}lookAt(e){return Or.lookAt(e),Or.updateMatrix(),this.applyMatrix4(Or.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new or);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];Hi.setFromBufferAttribute(c),this.morphTargetsRelative?(bt.addVectors(Ht.min,Hi.min),Ht.expandByPoint(bt),bt.addVectors(Ht.max,Hi.max),Ht.expandByPoint(bt)):(Ht.expandByPoint(Hi.min),Ht.expandByPoint(Hi.max))}Ht.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],d=this.morphTargetsRelative;for(let l=0,m=c.count;l<m;l++)bt.fromBufferAttribute(c,l),d&&(_i.fromBufferAttribute(e,l),bt.add(_i)),s=Math.max(s,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ut(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const c=[],d=[];for(let v=0;v<i.count;v++)c[v]=new Q,d[v]=new Q;const l=new Q,m=new Q,p=new Q,u=new Ke,g=new Ke,M=new Ke,_=new Q,f=new Q;function h(v,C,U){l.fromBufferAttribute(i,v),m.fromBufferAttribute(i,C),p.fromBufferAttribute(i,U),u.fromBufferAttribute(r,v),g.fromBufferAttribute(r,C),M.fromBufferAttribute(r,U),m.sub(l),p.sub(l),g.sub(u),M.sub(u);const P=1/(g.x*M.y-M.x*g.y);isFinite(P)&&(_.copy(m).multiplyScalar(M.y).addScaledVector(p,-g.y).multiplyScalar(P),f.copy(p).multiplyScalar(g.x).addScaledVector(m,-M.x).multiplyScalar(P),c[v].add(_),c[C].add(_),c[U].add(_),d[v].add(f),d[C].add(f),d[U].add(f))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,C=S.length;v<C;++v){const U=S[v],P=U.start,F=U.count;for(let $=P,D=P+F;$<D;$+=3)h(e.getX($+0),e.getX($+1),e.getX($+2))}const w=new Q,E=new Q,b=new Q,y=new Q;function R(v){b.fromBufferAttribute(s,v),y.copy(b);const C=c[v];w.copy(C),w.sub(b.multiplyScalar(b.dot(C))).normalize(),E.crossVectors(y,C);const P=E.dot(d[v])<0?-1:1;a.setXYZW(v,w.x,w.y,w.z,P)}for(let v=0,C=S.length;v<C;++v){const U=S[v],P=U.start,F=U.count;for(let $=P,D=P+F;$<D;$+=3)R(e.getX($+0)),R(e.getX($+1)),R(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,g=i.count;u<g;u++)i.setXYZ(u,0,0,0);const s=new Q,r=new Q,a=new Q,c=new Q,d=new Q,l=new Q,m=new Q,p=new Q;if(e)for(let u=0,g=e.count;u<g;u+=3){const M=e.getX(u+0),_=e.getX(u+1),f=e.getX(u+2);s.fromBufferAttribute(t,M),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,f),m.subVectors(a,r),p.subVectors(s,r),m.cross(p),c.fromBufferAttribute(i,M),d.fromBufferAttribute(i,_),l.fromBufferAttribute(i,f),c.add(m),d.add(m),l.add(m),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(_,d.x,d.y,d.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,g=t.count;u<g;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),m.subVectors(a,r),p.subVectors(s,r),m.cross(p),i.setXYZ(u+0,m.x,m.y,m.z),i.setXYZ(u+1,m.x,m.y,m.z),i.setXYZ(u+2,m.x,m.y,m.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(c,d){const l=c.array,m=c.itemSize,p=c.normalized,u=new l.constructor(d.length*m);let g=0,M=0;for(let _=0,f=d.length;_<f;_++){c.isInterleavedBufferAttribute?g=d[_]*c.data.stride+c.offset:g=d[_]*m;for(let h=0;h<m;h++)u[M++]=l[g++]}return new Ut(u,m,p)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,i=this.index.array,s=this.attributes;for(const c in s){const d=s[c],l=e(d,i);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const d=[],l=r[c];for(let m=0,p=l.length;m<p;m++){const u=l[m],g=e(u,i);d.push(g)}t.morphAttributes[c]=d}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,d=a.length;c<d;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const l in d)d[l]!==void 0&&(e[l]=d[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const d in i){const l=i[d];e.data.attributes[d]=l.toJSON(e.data)}const s={};let r=!1;for(const d in this.morphAttributes){const l=this.morphAttributes[d],m=[];for(let p=0,u=l.length;p<u;p++){const g=l[p];m.push(g.toJSON(e.data))}m.length>0&&(s[d]=m,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const m=s[l];this.setAttribute(l,m.clone(t))}const r=e.morphAttributes;for(const l in r){const m=[],p=r[l];for(let u=0,g=p.length;u<g;u++)m.push(p[u].clone(t));this.morphAttributes[l]=m}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,m=a.length;l<m;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let df=0;class Ui extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=ns(),this.name="",this.type="Material",this.blending=Ei,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oa,this.blendDst=ca,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(i.blending=this.blending),this.side!==zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==oa&&(i.blendSrc=this.blendSrc),this.blendDst!==ca&&(i.blendDst=this.blendDst),this.blendEquation!==Yn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ni&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const c in r){const d=r[c];delete d.metadata,a.push(d)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ke().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const gn=new Q,Br=new Q,ms=new Q,Ln=new Q,zr=new Q,gs=new Q,kr=new Q;class td{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Br.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(Br);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ms),c=Ln.dot(this.direction),d=-Ln.dot(ms),l=Ln.lengthSq(),m=Math.abs(1-a*a);let p,u,g,M;if(m>0)if(p=a*d-c,u=a*c-d,M=r*m,p>=0)if(u>=-M)if(u<=M){const _=1/m;p*=_,u*=_,g=p*(p+a*u+2*c)+u*(a*p+u+2*d)+l}else u=r,p=Math.max(0,-(a*u+c)),g=-p*p+u*(u+2*d)+l;else u=-r,p=Math.max(0,-(a*u+c)),g=-p*p+u*(u+2*d)+l;else u<=-M?(p=Math.max(0,-(-a*r+c)),u=p>0?-r:Math.min(Math.max(-r,-d),r),g=-p*p+u*(u+2*d)+l):u<=M?(p=0,u=Math.min(Math.max(-r,-d),r),g=u*(u+2*d)+l):(p=Math.max(0,-(a*r+c)),u=p>0?r:Math.min(Math.max(-r,-d),r),g=-p*p+u*(u+2*d)+l);else u=a>0?-r:r,p=Math.max(0,-(a*u+c)),g=-p*p+u*(u+2*d)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Br).addScaledVector(ms,u),g}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const i=gn.dot(this.direction),s=gn.dot(gn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=i-a,d=i+a;return d<0?null:c<0?this.at(d,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,c,d;const l=1/this.direction.x,m=1/this.direction.y,p=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),m>=0?(r=(e.min.y-u.y)*m,a=(e.max.y-u.y)*m):(r=(e.max.y-u.y)*m,a=(e.min.y-u.y)*m),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),p>=0?(c=(e.min.z-u.z)*p,d=(e.max.z-u.z)*p):(c=(e.max.z-u.z)*p,d=(e.min.z-u.z)*p),i>d||c>s)||((c>i||i!==i)&&(i=c),(d<s||s!==s)&&(s=d),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,i,s,r){zr.subVectors(t,e),gs.subVectors(i,e),kr.crossVectors(zr,gs);let a=this.direction.dot(kr),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const d=c*this.direction.dot(gs.crossVectors(Ln,gs));if(d<0)return null;const l=c*this.direction.dot(zr.cross(Ln));if(l<0||d+l>a)return null;const m=-c*Ln.dot(kr);return m<0?null:this.at(m/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class On extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _c=new ht,jn=new td,xs=new or,vc=new Q,_s=new Q,vs=new Q,Ms=new Q,Gr=new Q,ys=new Q,Mc=new Q,Ss=new Q;class lt extends It{constructor(e=new Lt,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){ys.set(0,0,0);for(let d=0,l=r.length;d<l;d++){const m=c[d],p=r[d];m!==0&&(Gr.fromBufferAttribute(p,e),a?ys.addScaledVector(Gr,m):ys.addScaledVector(Gr.sub(t),m))}t.add(ys)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(r),jn.copy(e.ray).recast(e.near),!(xs.containsPoint(jn.origin)===!1&&(jn.intersectSphere(xs,vc)===null||jn.origin.distanceToSquared(vc)>(e.far-e.near)**2))&&(_c.copy(r).invert(),jn.copy(e.ray).applyMatrix4(_c),!(i.boundingBox!==null&&jn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,c=r.index,d=r.attributes.position,l=r.attributes.uv,m=r.attributes.uv1,p=r.attributes.normal,u=r.groups,g=r.drawRange;if(c!==null)if(Array.isArray(a))for(let M=0,_=u.length;M<_;M++){const f=u[M],h=a[f.materialIndex],S=Math.max(f.start,g.start),w=Math.min(c.count,Math.min(f.start+f.count,g.start+g.count));for(let E=S,b=w;E<b;E+=3){const y=c.getX(E),R=c.getX(E+1),v=c.getX(E+2);s=bs(this,h,e,i,l,m,p,y,R,v),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const M=Math.max(0,g.start),_=Math.min(c.count,g.start+g.count);for(let f=M,h=_;f<h;f+=3){const S=c.getX(f),w=c.getX(f+1),E=c.getX(f+2);s=bs(this,a,e,i,l,m,p,S,w,E),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(a))for(let M=0,_=u.length;M<_;M++){const f=u[M],h=a[f.materialIndex],S=Math.max(f.start,g.start),w=Math.min(d.count,Math.min(f.start+f.count,g.start+g.count));for(let E=S,b=w;E<b;E+=3){const y=E,R=E+1,v=E+2;s=bs(this,h,e,i,l,m,p,y,R,v),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const M=Math.max(0,g.start),_=Math.min(d.count,g.start+g.count);for(let f=M,h=_;f<h;f+=3){const S=f,w=f+1,E=f+2;s=bs(this,a,e,i,l,m,p,S,w,E),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function uf(n,e,t,i,s,r,a,c){let d;if(e.side===zt?d=i.intersectTriangle(a,r,s,!0,c):d=i.intersectTriangle(s,r,a,e.side===zn,c),d===null)return null;Ss.copy(c),Ss.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ss);return l<t.near||l>t.far?null:{distance:l,point:Ss.clone(),object:n}}function bs(n,e,t,i,s,r,a,c,d,l){n.getVertexPosition(c,_s),n.getVertexPosition(d,vs),n.getVertexPosition(l,Ms);const m=uf(n,e,t,i,_s,vs,Ms,Mc);if(m){const p=new Q;Zt.getBarycoord(Mc,_s,vs,Ms,p),s&&(m.uv=Zt.getInterpolatedAttribute(s,c,d,l,p,new Ke)),r&&(m.uv1=Zt.getInterpolatedAttribute(r,c,d,l,p,new Ke)),a&&(m.normal=Zt.getInterpolatedAttribute(a,c,d,l,p,new Q),m.normal.dot(i.direction)>0&&m.normal.multiplyScalar(-1));const u={a:c,b:d,c:l,normal:new Q,materialIndex:0};Zt.getNormal(_s,vs,Ms,u.normal),m.face=u,m.barycoord=p}return m}class hf extends Pt{constructor(e=null,t=1,i=1,s,r,a,c,d,l=Tt,m=Tt,p,u){super(null,a,c,d,l,m,s,r,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Hr=new Q,ff=new Q,pf=new Oe;class $n{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Hr.subVectors(i,t).cross(ff.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Hr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||pf.getNormalMatrix(e),s=this.coplanarPoint(Hr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new or,mf=new Ke(.5,.5),Es=new Q;class po{constructor(e=new $n,t=new $n,i=new $n,s=new $n,r=new $n,a=new $n){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=on,i=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],d=r[2],l=r[3],m=r[4],p=r[5],u=r[6],g=r[7],M=r[8],_=r[9],f=r[10],h=r[11],S=r[12],w=r[13],E=r[14],b=r[15];if(s[0].setComponents(l-a,g-m,h-M,b-S).normalize(),s[1].setComponents(l+a,g+m,h+M,b+S).normalize(),s[2].setComponents(l+c,g+p,h+_,b+w).normalize(),s[3].setComponents(l-c,g-p,h-_,b-w).normalize(),i)s[4].setComponents(d,u,f,E).normalize(),s[5].setComponents(l-d,g-u,h-f,b-E).normalize();else if(s[4].setComponents(l-d,g-u,h-f,b-E).normalize(),t===on)s[5].setComponents(l+d,g+u,h+f,b+E).normalize();else if(t===es)s[5].setComponents(d,u,f,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){Xn.center.set(0,0,0);const t=mf.distanceTo(e.center);return Xn.radius=.7071067811865476+t,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Es.x=s.normal.x>0?e.max.x:e.min.x,Es.y=s.normal.y>0?e.max.y:e.min.y,Es.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cr extends Ui{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const yc=new ht,Za=new td,ws=new or,Ts=new Q;class mo extends It{constructor(e=new Lt,t=new cr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ws.copy(i.boundingSphere),ws.applyMatrix4(s),ws.radius+=r,e.ray.intersectsSphere(ws)===!1)return;yc.copy(s).invert(),Za.copy(e.ray).applyMatrix4(yc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=c*c,l=i.index,p=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let M=u,_=g;M<_;M++){const f=l.getX(M);Ts.fromBufferAttribute(p,f),Sc(Ts,f,d,s,e,t,this)}}else{const u=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let M=u,_=g;M<_;M++)Ts.fromBufferAttribute(p,M),Sc(Ts,M,d,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function Sc(n,e,t,i,s,r,a){const c=Za.distanceSqToPoint(n);if(c<t){const d=new Q;Za.closestPointToPoint(n,d),d.applyMatrix4(i);const l=s.ray.origin.distanceTo(d);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(c),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class nd extends Pt{constructor(e=[],t=ni,i,s,r,a,c,d,l,m){super(e,t,i,s,r,a,c,d,l,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class id extends Pt{constructor(e,t,i,s,r,a,c,d,l){super(e,t,i,s,r,a,c,d,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Li extends Pt{constructor(e,t,i=dn,s,r,a,c=Tt,d=Tt,l,m=bn,p=1){if(m!==bn&&m!==Jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:p};super(u,s,r,a,c,d,m,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class gf extends Li{constructor(e,t=dn,i=ni,s,r,a=Tt,c=Tt,d,l=bn){const m={width:e,height:e,depth:1},p=[m,m,m,m,m,m];super(e,e,t,i,s,r,a,c,d,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class sd extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class si extends Lt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const d=[],l=[],m=[],p=[];let u=0,g=0;M("z","y","x",-1,-1,i,t,e,a,r,0),M("z","y","x",1,-1,i,t,-e,a,r,1),M("x","z","y",1,1,e,i,t,s,a,2),M("x","z","y",1,-1,e,i,-t,s,a,3),M("x","y","z",1,-1,e,t,i,s,r,4),M("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(d),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(m,3)),this.setAttribute("uv",new wt(p,2));function M(_,f,h,S,w,E,b,y,R,v,C){const U=E/R,P=b/v,F=E/2,$=b/2,D=y/2,I=R+1,H=v+1;let k=0,K=0;const re=new Q;for(let fe=0;fe<H;fe++){const pe=fe*P-$;for(let Ee=0;Ee<I;Ee++){const We=Ee*U-F;re[_]=We*S,re[f]=pe*w,re[h]=D,l.push(re.x,re.y,re.z),re[_]=0,re[f]=0,re[h]=y>0?1:-1,m.push(re.x,re.y,re.z),p.push(Ee/R),p.push(1-fe/v),k+=1}}for(let fe=0;fe<v;fe++)for(let pe=0;pe<R;pe++){const Ee=u+pe+I*fe,We=u+pe+I*(fe+1),we=u+(pe+1)+I*(fe+1),ke=u+(pe+1)+I*fe;d.push(Ee,We,ke),d.push(We,we,ke),K+=6}c.addGroup(g,K,C),g+=K,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ai extends Lt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,c=0,d=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:d};const l=this;s=Math.floor(s),r=Math.floor(r);const m=[],p=[],u=[],g=[];let M=0;const _=[],f=i/2;let h=0;S(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(m),this.setAttribute("position",new wt(p,3)),this.setAttribute("normal",new wt(u,3)),this.setAttribute("uv",new wt(g,2));function S(){const E=new Q,b=new Q;let y=0;const R=(t-e)/i;for(let v=0;v<=r;v++){const C=[],U=v/r,P=U*(t-e)+e;for(let F=0;F<=s;F++){const $=F/s,D=$*d+c,I=Math.sin(D),H=Math.cos(D);b.x=P*I,b.y=-U*i+f,b.z=P*H,p.push(b.x,b.y,b.z),E.set(I,R,H).normalize(),u.push(E.x,E.y,E.z),g.push($,1-U),C.push(M++)}_.push(C)}for(let v=0;v<s;v++)for(let C=0;C<r;C++){const U=_[C][v],P=_[C+1][v],F=_[C+1][v+1],$=_[C][v+1];(e>0||C!==0)&&(m.push(U,P,$),y+=3),(t>0||C!==r-1)&&(m.push(P,F,$),y+=3)}l.addGroup(h,y,0),h+=y}function w(E){const b=M,y=new Ke,R=new Q;let v=0;const C=E===!0?e:t,U=E===!0?1:-1;for(let F=1;F<=s;F++)p.push(0,f*U,0),u.push(0,U,0),g.push(.5,.5),M++;const P=M;for(let F=0;F<=s;F++){const D=F/s*d+c,I=Math.cos(D),H=Math.sin(D);R.x=C*H,R.y=f*U,R.z=C*I,p.push(R.x,R.y,R.z),u.push(0,U,0),y.x=I*.5+.5,y.y=H*.5*U+.5,g.push(y.x,y.y),M++}for(let F=0;F<s;F++){const $=b+F,D=P+F;E===!0?m.push(D,D+1,$):m.push(D+1,D,$),v+=3}l.addGroup(h,v,E===!0?1:2),h+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ai(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class go extends Ai{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,i,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new go(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fi extends Lt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(i),d=Math.floor(s),l=c+1,m=d+1,p=e/c,u=t/d,g=[],M=[],_=[],f=[];for(let h=0;h<m;h++){const S=h*u-a;for(let w=0;w<l;w++){const E=w*p-r;M.push(E,-S,0),_.push(0,0,1),f.push(w/c),f.push(1-h/d)}}for(let h=0;h<d;h++)for(let S=0;S<c;S++){const w=S+l*h,E=S+l*(h+1),b=S+1+l*(h+1),y=S+1+l*h;g.push(w,E,y),g.push(E,b,y)}this.setIndex(g),this.setAttribute("position",new wt(M,3)),this.setAttribute("normal",new wt(_,3)),this.setAttribute("uv",new wt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Js extends Lt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const d=Math.min(a+c,Math.PI);let l=0;const m=[],p=new Q,u=new Q,g=[],M=[],_=[],f=[];for(let h=0;h<=i;h++){const S=[],w=h/i,E=a+w*c,b=e*Math.cos(E),y=Math.sqrt(e*e-b*b);let R=0;h===0&&a===0?R=.5/t:h===i&&d===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const C=v/t,U=s+C*r;p.x=-y*Math.cos(U),p.y=b,p.z=y*Math.sin(U),M.push(p.x,p.y,p.z),u.copy(p).normalize(),_.push(u.x,u.y,u.z),f.push(C+R,1-w),S.push(l++)}m.push(S)}for(let h=0;h<i;h++)for(let S=0;S<t;S++){const w=m[h][S+1],E=m[h][S],b=m[h+1][S],y=m[h+1][S+1];(h!==0||a>0)&&g.push(w,E,y),(h!==i-1||d<Math.PI)&&g.push(E,b,y)}this.setIndex(g),this.setAttribute("position",new wt(M,3)),this.setAttribute("normal",new wt(_,3)),this.setAttribute("uv",new wt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xo extends Lt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const d=[],l=[],m=[],p=[],u=new Q,g=new Q,M=new Q;for(let _=0;_<=i;_++){const f=a+_/i*c;for(let h=0;h<=s;h++){const S=h/s*r;g.x=(e+t*Math.cos(f))*Math.cos(S),g.y=(e+t*Math.cos(f))*Math.sin(S),g.z=t*Math.sin(f),l.push(g.x,g.y,g.z),u.x=e*Math.cos(S),u.y=e*Math.sin(S),M.subVectors(g,u).normalize(),m.push(M.x,M.y,M.z),p.push(h/s),p.push(_/i)}}for(let _=1;_<=i;_++)for(let f=1;f<=s;f++){const h=(s+1)*_+f-1,S=(s+1)*(_-1)+f-1,w=(s+1)*(_-1)+f,E=(s+1)*_+f;d.push(h,S,E),d.push(S,w,E)}this.setIndex(d),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(m,3)),this.setAttribute("uv",new wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Di(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(bc(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(bc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Dt(n){const e={};for(let t=0;t<n.length;t++){const i=Di(n[t]);for(const s in i)e[s]=i[s]}return e}function bc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function xf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function rd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const _f={clone:Di,merge:Dt};var vf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vf,this.fragmentShader=Mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=xf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ke().fromArray(s.value);break;case"v3":this.uniforms[i].value=new Q().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ut().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ht().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class yf extends un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class qn extends Ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$a,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sf extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ih,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bf extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ad extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Vr=new ht,Ec=new Q,wc=new Q;class Ef{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.mapType=Vt,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ec),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),Vr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===es||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const As=new Q,Rs=new Ii,nn=new Q;class od extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(As,Rs,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(As,Rs,nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(As,Rs,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(As,Rs,nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new Q,Tc=new Ke,Ac=new Ke;class Bt extends od{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ya*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ya*2*Math.atan(Math.tan(vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z)}getViewSize(e,t){return this.getViewBounds(e,Tc,Ac),t.subVectors(Ac,Tc)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const d=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/d,t-=a.offsetY*i/l,s*=a.width/d,i*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class wf extends Ef{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0}}class ei extends ad{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new wf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class cd extends od{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,c=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=m*this.view.offsetY,d=c-m*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ld extends ad{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const vi=-90,Mi=1;class Tf extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bt(vi,Mi,e,t);s.layers=this.layers,this.add(s);const r=new Bt(vi,Mi,e,t);r.layers=this.layers,this.add(r);const a=new Bt(vi,Mi,e,t);a.layers=this.layers,this.add(a);const c=new Bt(vi,Mi,e,t);c.layers=this.layers,this.add(c);const d=new Bt(vi,Mi,e,t);d.layers=this.layers,this.add(d);const l=new Bt(vi,Mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,c,d]=t;for(const l of t)this.remove(l);if(e===on)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===es)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,d,l,m]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(i,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,m),e.setRenderTarget(p,u,g),e.xr.enabled=M,i.texture.needsPMREMUpdate=!0}}class Af extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const So=class So{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};So.prototype.isMatrix2=!0;let Rc=So;function Cc(n,e,t,i){const s=Rf(i);switch(t){case jl:return n*e;case ql:return n*e/s.components*s.byteLength;case oo:return n*e/s.components*s.byteLength;case ii:return n*e*2/s.components*s.byteLength;case co:return n*e*2/s.components*s.byteLength;case Xl:return n*e*3/s.components*s.byteLength;case Kt:return n*e*4/s.components*s.byteLength;case lo:return n*e*4/s.components*s.byteLength;case Fs:case Os:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Bs:case zs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case va:case ya:return Math.max(n,16)*Math.max(e,8)/4;case _a:case Ma:return Math.max(n,8)*Math.max(e,8)/2;case Sa:case ba:case wa:case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ea:case qs:case Aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Na:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case za:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ka:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ga:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ha:case Va:case Wa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ja:case Xa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case $s:case qa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rf(n){switch(n){case Vt:case Gl:return{byteLength:1,components:1};case Ji:case Hl:case Sn:return{byteLength:2,components:1};case ro:case ao:return{byteLength:2,components:4};case dn:case so:case an:return{byteLength:4,components:1};case Vl:case Wl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:io}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=io);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Cf(n){const e=new WeakMap;function t(c,d){const l=c.array,m=c.usage,p=l.byteLength,u=n.createBuffer();n.bindBuffer(d,u),n.bufferData(d,l,m),c.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:p}}function i(c,d,l){const m=d.array,p=d.updateRanges;if(n.bindBuffer(l,c),p.length===0)n.bufferSubData(l,0,m);else{p.sort((g,M)=>g.start-M.start);let u=0;for(let g=1;g<p.length;g++){const M=p[u],_=p[g];_.start<=M.start+M.count+1?M.count=Math.max(M.count,_.start+_.count-M.start):(++u,p[u]=_)}p.length=u+1;for(let g=0,M=p.length;g<M;g++){const _=p[g];n.bufferSubData(l,_.start*m.BYTES_PER_ELEMENT,m,_.start,_.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=e.get(c);d&&(n.deleteBuffer(d.buffer),e.delete(c))}function a(c,d){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const m=e.get(c);(!m||m.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,d));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,c,d),l.version=c.version}}return{get:s,remove:r,update:a}}var Nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pf=`#ifdef USE_ALPHAHASH
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
#endif`,Lf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ff=`#ifdef USE_AOMAP
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
#endif`,Of=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bf=`#ifdef USE_BATCHING
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
#endif`,zf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vf=`#ifdef USE_IRIDESCENCE
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
#endif`,Wf=`#ifdef USE_BUMPMAP
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
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Qf=`#define PI 3.141592653589793
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
} // validated`,ep=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tp=`vec3 transformedNormal = objectNormal;
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
#endif`,np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ap="gl_FragColor = linearToOutputTexel( gl_FragColor );",op=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cp=`#ifdef USE_ENVMAP
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
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dp=`#ifdef USE_ENVMAP
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
#endif`,up=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
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
#endif`,fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xp=`#ifdef USE_GRADIENTMAP
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
}`,_p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Sp=`#ifdef USE_ENVMAP
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
#endif`,bp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ap=`PhysicalMaterial material;
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
#endif`,Rp=`uniform sampler2D dfgLUT;
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
}`,Cp=`
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Dp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ip=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kp=`#if defined( USE_POINTS_UV )
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
#endif`,Gp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xp=`#ifdef USE_MORPHTARGETS
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
#endif`,qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Yp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Qp=`#ifdef USE_NORMALMAP
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
#endif`,em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,am=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,om=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mm=`float getShadowMask() {
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
}`,gm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xm=`#ifdef USE_SKINNING
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
#endif`,_m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vm=`#ifdef USE_SKINNING
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
#endif`,Mm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ym=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Em=`#ifdef USE_TRANSMISSION
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
#endif`,wm=`#ifdef USE_TRANSMISSION
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
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pm=`uniform sampler2D t2D;
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fm=`#include <common>
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
}`,Om=`#if DEPTH_PACKING == 3200
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
}`,Bm=`#define DISTANCE
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
}`,zm=`#define DISTANCE
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
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`uniform float scale;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,Wm=`#include <common>
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
}`,jm=`uniform vec3 diffuse;
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
}`,Xm=`#define LAMBERT
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
}`,qm=`#define LAMBERT
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
}`,$m=`#define MATCAP
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
}`,Ym=`#define MATCAP
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
}`,Zm=`#define NORMAL
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
}`,Km=`#define NORMAL
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
}`,Jm=`#define PHONG
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
}`,Qm=`#define PHONG
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
}`,eg=`#define STANDARD
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
}`,tg=`#define STANDARD
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
}`,ng=`#define TOON
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
}`,ig=`#define TOON
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
}`,sg=`uniform float size;
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
}`,rg=`uniform vec3 diffuse;
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
}`,ag=`#include <common>
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
}`,og=`uniform vec3 color;
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
}`,cg=`uniform float rotation;
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
}`,lg=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:Nf,alphahash_pars_fragment:Pf,alphamap_fragment:Lf,alphamap_pars_fragment:Df,alphatest_fragment:If,alphatest_pars_fragment:Uf,aomap_fragment:Ff,aomap_pars_fragment:Of,batching_pars_vertex:Bf,batching_vertex:zf,begin_vertex:kf,beginnormal_vertex:Gf,bsdfs:Hf,iridescence_fragment:Vf,bumpmap_pars_fragment:Wf,clipping_planes_fragment:jf,clipping_planes_pars_fragment:Xf,clipping_planes_pars_vertex:qf,clipping_planes_vertex:$f,color_fragment:Yf,color_pars_fragment:Zf,color_pars_vertex:Kf,color_vertex:Jf,common:Qf,cube_uv_reflection_fragment:ep,defaultnormal_vertex:tp,displacementmap_pars_vertex:np,displacementmap_vertex:ip,emissivemap_fragment:sp,emissivemap_pars_fragment:rp,colorspace_fragment:ap,colorspace_pars_fragment:op,envmap_fragment:cp,envmap_common_pars_fragment:lp,envmap_pars_fragment:dp,envmap_pars_vertex:up,envmap_physical_pars_fragment:Sp,envmap_vertex:hp,fog_vertex:fp,fog_pars_vertex:pp,fog_fragment:mp,fog_pars_fragment:gp,gradientmap_pars_fragment:xp,lightmap_pars_fragment:_p,lights_lambert_fragment:vp,lights_lambert_pars_fragment:Mp,lights_pars_begin:yp,lights_toon_fragment:bp,lights_toon_pars_fragment:Ep,lights_phong_fragment:wp,lights_phong_pars_fragment:Tp,lights_physical_fragment:Ap,lights_physical_pars_fragment:Rp,lights_fragment_begin:Cp,lights_fragment_maps:Np,lights_fragment_end:Pp,lightprobes_pars_fragment:Lp,logdepthbuf_fragment:Dp,logdepthbuf_pars_fragment:Ip,logdepthbuf_pars_vertex:Up,logdepthbuf_vertex:Fp,map_fragment:Op,map_pars_fragment:Bp,map_particle_fragment:zp,map_particle_pars_fragment:kp,metalnessmap_fragment:Gp,metalnessmap_pars_fragment:Hp,morphinstance_vertex:Vp,morphcolor_vertex:Wp,morphnormal_vertex:jp,morphtarget_pars_vertex:Xp,morphtarget_vertex:qp,normal_fragment_begin:$p,normal_fragment_maps:Yp,normal_pars_fragment:Zp,normal_pars_vertex:Kp,normal_vertex:Jp,normalmap_pars_fragment:Qp,clearcoat_normal_fragment_begin:em,clearcoat_normal_fragment_maps:tm,clearcoat_pars_fragment:nm,iridescence_pars_fragment:im,opaque_fragment:sm,packing:rm,premultiplied_alpha_fragment:am,project_vertex:om,dithering_fragment:cm,dithering_pars_fragment:lm,roughnessmap_fragment:dm,roughnessmap_pars_fragment:um,shadowmap_pars_fragment:hm,shadowmap_pars_vertex:fm,shadowmap_vertex:pm,shadowmask_pars_fragment:mm,skinbase_vertex:gm,skinning_pars_vertex:xm,skinning_vertex:_m,skinnormal_vertex:vm,specularmap_fragment:Mm,specularmap_pars_fragment:ym,tonemapping_fragment:Sm,tonemapping_pars_fragment:bm,transmission_fragment:Em,transmission_pars_fragment:wm,uv_pars_fragment:Tm,uv_pars_vertex:Am,uv_vertex:Rm,worldpos_vertex:Cm,background_vert:Nm,background_frag:Pm,backgroundCube_vert:Lm,backgroundCube_frag:Dm,cube_vert:Im,cube_frag:Um,depth_vert:Fm,depth_frag:Om,distance_vert:Bm,distance_frag:zm,equirect_vert:km,equirect_frag:Gm,linedashed_vert:Hm,linedashed_frag:Vm,meshbasic_vert:Wm,meshbasic_frag:jm,meshlambert_vert:Xm,meshlambert_frag:qm,meshmatcap_vert:$m,meshmatcap_frag:Ym,meshnormal_vert:Zm,meshnormal_frag:Km,meshphong_vert:Jm,meshphong_frag:Qm,meshphysical_vert:eg,meshphysical_frag:tg,meshtoon_vert:ng,meshtoon_frag:ig,points_vert:sg,points_frag:rg,shadow_vert:ag,shadow_frag:og,sprite_vert:cg,sprite_frag:lg},_e={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},rn={basic:{uniforms:Dt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Dt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Dt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Dt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Dt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Dt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Dt([_e.points,_e.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Dt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Dt([_e.common,_e.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Dt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Dt([_e.sprite,_e.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Dt([_e.common,_e.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Dt([_e.lights,_e.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};rn.physical={uniforms:Dt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Cs={r:0,b:0,g:0},dg=new ht,ud=new Oe;ud.set(-1,0,0,0,1,0,0,0,1);function ug(n,e,t,i,s,r){const a=new qe(0);let c=s===!0?0:1,d,l,m=null,p=0,u=null;function g(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){const E=S.backgroundBlurriness>0;w=e.get(w,E)}return w}function M(S){let w=!1;const E=g(S);E===null?f(a,c):E&&E.isColor&&(f(E,1),w=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(S,w){const E=g(w);E&&(E.isCubeTexture||E.mapping===rr)?(l===void 0&&(l=new lt(new si(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Di(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,y,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(dg.makeRotationFromEuler(w.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ud),l.material.toneMapped=Ye.getTransfer(E.colorSpace)!==tt,(m!==E||p!==E.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,m=E,p=E.version,u=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(d===void 0&&(d=new lt(new Fi(2,2),new un({name:"BackgroundMaterial",uniforms:Di(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(d)),d.material.uniforms.t2D.value=E,d.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,d.material.toneMapped=Ye.getTransfer(E.colorSpace)!==tt,E.matrixAutoUpdate===!0&&E.updateMatrix(),d.material.uniforms.uvTransform.value.copy(E.matrix),(m!==E||p!==E.version||u!==n.toneMapping)&&(d.material.needsUpdate=!0,m=E,p=E.version,u=n.toneMapping),d.layers.enableAll(),S.unshift(d,d.geometry,d.material,0,0,null))}function f(S,w){S.getRGB(Cs,rd(n)),t.buffers.color.setClear(Cs.r,Cs.g,Cs.b,w,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),c=w,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(a,c)},render:M,addToRenderList:_,dispose:h}}function hg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function c(P,F,$,D,I){let H=!1;const k=p(P,D,$,F);r!==k&&(r=k,l(r.object)),H=g(P,D,$,I),H&&M(P,D,$,I),I!==null&&e.update(I,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,E(P,F,$,D),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function d(){return n.createVertexArray()}function l(P){return n.bindVertexArray(P)}function m(P){return n.deleteVertexArray(P)}function p(P,F,$,D){const I=D.wireframe===!0;let H=i[F.id];H===void 0&&(H={},i[F.id]=H);const k=P.isInstancedMesh===!0?P.id:0;let K=H[k];K===void 0&&(K={},H[k]=K);let re=K[$.id];re===void 0&&(re={},K[$.id]=re);let fe=re[I];return fe===void 0&&(fe=u(d()),re[I]=fe),fe}function u(P){const F=[],$=[],D=[];for(let I=0;I<t;I++)F[I]=0,$[I]=0,D[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:$,attributeDivisors:D,object:P,attributes:{},index:null}}function g(P,F,$,D){const I=r.attributes,H=F.attributes;let k=0;const K=$.getAttributes();for(const re in K)if(K[re].location>=0){const pe=I[re];let Ee=H[re];if(Ee===void 0&&(re==="instanceMatrix"&&P.instanceMatrix&&(Ee=P.instanceMatrix),re==="instanceColor"&&P.instanceColor&&(Ee=P.instanceColor)),pe===void 0||pe.attribute!==Ee||Ee&&pe.data!==Ee.data)return!0;k++}return r.attributesNum!==k||r.index!==D}function M(P,F,$,D){const I={},H=F.attributes;let k=0;const K=$.getAttributes();for(const re in K)if(K[re].location>=0){let pe=H[re];pe===void 0&&(re==="instanceMatrix"&&P.instanceMatrix&&(pe=P.instanceMatrix),re==="instanceColor"&&P.instanceColor&&(pe=P.instanceColor));const Ee={};Ee.attribute=pe,pe&&pe.data&&(Ee.data=pe.data),I[re]=Ee,k++}r.attributes=I,r.attributesNum=k,r.index=D}function _(){const P=r.newAttributes;for(let F=0,$=P.length;F<$;F++)P[F]=0}function f(P){h(P,0)}function h(P,F){const $=r.newAttributes,D=r.enabledAttributes,I=r.attributeDivisors;$[P]=1,D[P]===0&&(n.enableVertexAttribArray(P),D[P]=1),I[P]!==F&&(n.vertexAttribDivisor(P,F),I[P]=F)}function S(){const P=r.newAttributes,F=r.enabledAttributes;for(let $=0,D=F.length;$<D;$++)F[$]!==P[$]&&(n.disableVertexAttribArray($),F[$]=0)}function w(P,F,$,D,I,H,k){k===!0?n.vertexAttribIPointer(P,F,$,I,H):n.vertexAttribPointer(P,F,$,D,I,H)}function E(P,F,$,D){_();const I=D.attributes,H=$.getAttributes(),k=F.defaultAttributeValues;for(const K in H){const re=H[K];if(re.location>=0){let fe=I[K];if(fe===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(fe=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(fe=P.instanceColor)),fe!==void 0){const pe=fe.normalized,Ee=fe.itemSize,We=e.get(fe);if(We===void 0)continue;const we=We.buffer,ke=We.type,j=We.bytesPerElement,se=ke===n.INT||ke===n.UNSIGNED_INT||fe.gpuType===so;if(fe.isInterleavedBufferAttribute){const Y=fe.data,Me=Y.stride,Pe=fe.offset;if(Y.isInstancedInterleavedBuffer){for(let Ce=0;Ce<re.locationSize;Ce++)h(re.location+Ce,Y.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ce=0;Ce<re.locationSize;Ce++)f(re.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,we);for(let Ce=0;Ce<re.locationSize;Ce++)w(re.location+Ce,Ee/re.locationSize,ke,pe,Me*j,(Pe+Ee/re.locationSize*Ce)*j,se)}else{if(fe.isInstancedBufferAttribute){for(let Y=0;Y<re.locationSize;Y++)h(re.location+Y,fe.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Y=0;Y<re.locationSize;Y++)f(re.location+Y);n.bindBuffer(n.ARRAY_BUFFER,we);for(let Y=0;Y<re.locationSize;Y++)w(re.location+Y,Ee/re.locationSize,ke,pe,Ee*j,Ee/re.locationSize*Y*j,se)}}else if(k!==void 0){const pe=k[K];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(re.location,pe);break;case 3:n.vertexAttrib3fv(re.location,pe);break;case 4:n.vertexAttrib4fv(re.location,pe);break;default:n.vertexAttrib1fv(re.location,pe)}}}}S()}function b(){C();for(const P in i){const F=i[P];for(const $ in F){const D=F[$];for(const I in D){const H=D[I];for(const k in H)m(H[k].object),delete H[k];delete D[I]}}delete i[P]}}function y(P){if(i[P.id]===void 0)return;const F=i[P.id];for(const $ in F){const D=F[$];for(const I in D){const H=D[I];for(const k in H)m(H[k].object),delete H[k];delete D[I]}}delete i[P.id]}function R(P){for(const F in i){const $=i[F];for(const D in $){const I=$[D];if(I[P.id]===void 0)continue;const H=I[P.id];for(const k in H)m(H[k].object),delete H[k];delete I[P.id]}}}function v(P){for(const F in i){const $=i[F],D=P.isInstancedMesh===!0?P.id:0,I=$[D];if(I!==void 0){for(const H in I){const k=I[H];for(const K in k)m(k[K].object),delete k[K];delete I[H]}delete $[D],Object.keys($).length===0&&delete i[F]}}}function C(){U(),a=!0,r!==s&&(r=s,l(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:C,resetDefaultState:U,dispose:b,releaseStatesOfGeometry:y,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:f,disableUnusedAttributes:S}}function fg(n,e,t){let i;function s(d){i=d}function r(d,l){n.drawArrays(i,d,l),t.update(l,i,1)}function a(d,l,m){m!==0&&(n.drawArraysInstanced(i,d,l,m),t.update(l,i,m))}function c(d,l,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,l,0,m);let u=0;for(let g=0;g<m;g++)u+=l[g];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function pg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Kt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===Sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Vt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==an&&!v)}function d(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const m=d(l);m!==l&&(Fe("WebGLRenderer:",l,"not supported, using",m,"instead."),l=m);const p=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=n.getParameter(n.MAX_SAMPLES),y=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:g,maxVertexTextures:M,maxTextureSize:_,maxCubemapSize:f,maxAttributes:h,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:E,maxSamples:b,samples:y}}function mg(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new $n,c=new Oe,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const g=p.length!==0||u||i!==0||s;return s=u,i=p.length,g},this.beginShadows=function(){r=!0,m(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){t=m(p,u,0)},this.setState=function(p,u,g){const M=p.clippingPlanes,_=p.clipIntersection,f=p.clipShadows,h=n.get(p);if(!s||M===null||M.length===0||r&&!f)r?m(null):l();else{const S=r?0:i,w=S*4;let E=h.clippingState||null;d.value=E,E=m(M,u,w,g);for(let b=0;b!==w;++b)E[b]=t[b];h.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){d.value!==t&&(d.value=t,d.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function m(p,u,g,M){const _=p!==null?p.length:0;let f=null;if(_!==0){if(f=d.value,M!==!0||f===null){const h=g+_*4,S=u.matrixWorldInverse;c.getNormalMatrix(S),(f===null||f.length<h)&&(f=new Float32Array(h));for(let w=0,E=g;w!==_;++w,E+=4)a.copy(p[w]).applyMatrix4(S,c),a.normal.toArray(f,E),f[E+3]=a.constant}d.value=f,d.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,f}}const Un=4,Nc=[.125,.215,.35,.446,.526,.582],Zn=20,gg=256,Vi=new cd,Pc=new qe;let Wr=null,jr=0,Xr=0,qr=!1;const xg=new Q;class Lc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:c=xg}=r;Wr=this._renderer.getRenderTarget(),jr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,i,s,d,c),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wr,jr,Xr),this._renderer.xr.enabled=qr,e.scissorTest=!1,yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ni||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wr=this._renderer.getRenderTarget(),jr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Sn,format:Kt,colorSpace:Ys,depthBuffer:!1},s=Dc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_g(r)),this._blurMaterial=Mg(r,e,t),this._ggxMaterial=vg(r,e,t)}return s}_compileMaterial(e){const t=new lt(new Lt,e);this._renderer.compile(t,Vi)}_sceneToCubeUV(e,t,i,s,r){const d=new Bt(90,1,t,i),l=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,g=p.toneMapping;p.getClearColor(Pc),p.toneMapping=cn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new si,new On({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,f=_.material;let h=!1;const S=e.background;S?S.isColor&&(f.color.copy(S),e.background=null,h=!0):(f.color.copy(Pc),h=!0);for(let w=0;w<6;w++){const E=w%3;E===0?(d.up.set(0,l[w],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+m[w],r.y,r.z)):E===1?(d.up.set(0,0,l[w]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+m[w],r.z)):(d.up.set(0,l[w],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+m[w]));const b=this._cubeSize;yi(s,E*b,w>2?b:0,b,b),p.setRenderTarget(s),h&&p.render(_,d),p.render(e,d)}p.toneMapping=g,p.autoClear=u,e.background=S}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ni||e.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ic());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const d=this._cubeSize;yi(t,0,0,3*d,2*d),i.setRenderTarget(t),i.render(a,Vi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[i];c.material=a;const d=a.uniforms,l=i/(this._lodMeshes.length-1),m=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-m*m),u=0+l*1.25,g=p*u,{_lodMax:M}=this,_=this._sizeLods[i],f=3*_*(i>M-Un?i-M+Un:0),h=4*(this._cubeSize-_);d.envMap.value=e.texture,d.roughness.value=g,d.mipInt.value=M-t,yi(r,f,h,3*_,2*_),s.setRenderTarget(r),s.render(c,Vi),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=M-i,yi(e,f,h,3*_,2*_),s.setRenderTarget(e),s.render(c,Vi)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,c){const d=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const m=3,p=this._lodMeshes[s];p.material=l;const u=l.uniforms,g=this._sizeLods[i]-1,M=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Zn-1),_=r/M,f=isFinite(r)?1+Math.floor(m*_):Zn;f>Zn&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Zn}`);const h=[];let S=0;for(let R=0;R<Zn;++R){const v=R/_,C=Math.exp(-v*v/2);h.push(C),R===0?S+=C:R<f&&(S+=2*C)}for(let R=0;R<h.length;R++)h[R]=h[R]/S;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=h,u.latitudinal.value=a==="latitudinal",c&&(u.poleAxis.value=c);const{_lodMax:w}=this;u.dTheta.value=M,u.mipInt.value=w-i;const E=this._sizeLods[s],b=3*E*(s>w-Un?s-w+Un:0),y=4*(this._cubeSize-E);yi(t,b,y,3*E,2*E),d.setRenderTarget(t),d.render(p,Vi)}}function _g(n){const e=[],t=[],i=[];let s=n;const r=n-Un+1+Nc.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let d=1/c;a>n-Un?d=Nc[a-n+Un-1]:a===0&&(d=0),t.push(d);const l=1/(c-2),m=-l,p=1+l,u=[m,m,p,m,p,p,m,m,p,p,m,p],g=6,M=6,_=3,f=2,h=1,S=new Float32Array(_*M*g),w=new Float32Array(f*M*g),E=new Float32Array(h*M*g);for(let y=0;y<g;y++){const R=y%3*2/3-1,v=y>2?0:-1,C=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];S.set(C,_*M*y),w.set(u,f*M*y);const U=[y,y,y,y,y,y];E.set(U,h*M*y)}const b=new Lt;b.setAttribute("position",new Ut(S,_)),b.setAttribute("uv",new Ut(w,f)),b.setAttribute("faceIndex",new Ut(E,h)),i.push(new lt(b,null)),s>Un&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Dc(n,e,t){const i=new ln(n,e,t);return i.texture.mapping=rr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yi(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function vg(n,e,t){return new un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lr(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Mg(n,e,t){const i=new Float32Array(Zn),s=new Q(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lr(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Ic(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lr(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Uc(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function lr(){return`

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
	`}class hd extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new nd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new si(5,5,5),r=new un({name:"CubemapFromEquirect",uniforms:Di(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:Mn});r.uniforms.tEquirect.value=t;const a=new lt(s,r),c=t.minFilter;return t.minFilter===Kn&&(t.minFilter=Nt),new Tf(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function yg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,g=!1){return u==null?null:g?a(u):r(u)}function r(u){if(u&&u.isTexture){const g=u.mapping;if(g===gr||g===xr)if(e.has(u)){const M=e.get(u).texture;return c(M,u.mapping)}else{const M=u.image;if(M&&M.height>0){const _=new hd(M.height);return _.fromEquirectangularTexture(n,u),e.set(u,_),u.addEventListener("dispose",l),c(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const g=u.mapping,M=g===gr||g===xr,_=g===ni||g===Pi;if(M||_){let f=t.get(u);const h=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new Lc(n)),f=M?i.fromEquirectangular(u,f):i.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const S=u.image;return M&&S&&S.height>0||_&&S&&d(S)?(i===null&&(i=new Lc(n)),f=M?i.fromEquirectangular(u):i.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",m),f.texture):null}}}return u}function c(u,g){return g===gr?u.mapping=ni:g===xr&&(u.mapping=Pi),u}function d(u){let g=0;const M=6;for(let _=0;_<M;_++)u[_]!==void 0&&g++;return g===M}function l(u){const g=u.target;g.removeEventListener("dispose",l);const M=e.get(g);M!==void 0&&(e.delete(g),M.dispose())}function m(u){const g=u.target;g.removeEventListener("dispose",m);const M=t.get(g);M!==void 0&&(t.delete(g),M.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function Sg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&wi("WebGLRenderer: "+i+" extension not supported."),s}}}function bg(n,e,t,i){const s={},r=new WeakMap;function a(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const M in u.attributes)e.remove(u.attributes[M]);u.removeEventListener("dispose",a),delete s[u.id];const g=r.get(u);g&&(e.remove(g),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(p,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function d(p){const u=p.attributes;for(const g in u)e.update(u[g],n.ARRAY_BUFFER)}function l(p){const u=[],g=p.index,M=p.attributes.position;let _=0;if(M===void 0)return;if(g!==null){const S=g.array;_=g.version;for(let w=0,E=S.length;w<E;w+=3){const b=S[w+0],y=S[w+1],R=S[w+2];u.push(b,y,y,R,R,b)}}else{const S=M.array;_=M.version;for(let w=0,E=S.length/3-1;w<E;w+=3){const b=w+0,y=w+1,R=w+2;u.push(b,y,y,R,R,b)}}const f=new(M.count>=65535?ed:Ql)(u,1);f.version=_;const h=r.get(p);h&&e.remove(h),r.set(p,f)}function m(p){const u=r.get(p);if(u){const g=p.index;g!==null&&u.version<g.version&&l(p)}else l(p);return r.get(p)}return{get:c,update:d,getWireframeAttribute:m}}function Eg(n,e,t){let i;function s(p){i=p}let r,a;function c(p){r=p.type,a=p.bytesPerElement}function d(p,u){n.drawElements(i,u,r,p*a),t.update(u,i,1)}function l(p,u,g){g!==0&&(n.drawElementsInstanced(i,u,r,p*a,g),t.update(u,i,g))}function m(p,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,p,0,g);let _=0;for(let f=0;f<g;f++)_+=u[f];t.update(_,i,1)}this.setMode=s,this.setIndex=c,this.render=d,this.renderInstances=l,this.renderMultiDraw=m}function wg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,c){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Tg(n,e,t){const i=new WeakMap,s=new ut;function r(a,c,d){const l=a.morphTargetInfluences,m=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=m!==void 0?m.length:0;let u=i.get(c);if(u===void 0||u.count!==p){let C=function(){R.dispose(),i.delete(c),c.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();const g=c.morphAttributes.position!==void 0,M=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],h=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let w=0;g===!0&&(w=1),M===!0&&(w=2),_===!0&&(w=3);let E=c.attributes.position.count*w,b=1;E>e.maxTextureSize&&(b=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const y=new Float32Array(E*b*4*p),R=new Yl(y,E,b,p);R.type=an,R.needsUpdate=!0;const v=w*4;for(let U=0;U<p;U++){const P=f[U],F=h[U],$=S[U],D=E*b*4*U;for(let I=0;I<P.count;I++){const H=I*v;g===!0&&(s.fromBufferAttribute(P,I),y[D+H+0]=s.x,y[D+H+1]=s.y,y[D+H+2]=s.z,y[D+H+3]=0),M===!0&&(s.fromBufferAttribute(F,I),y[D+H+4]=s.x,y[D+H+5]=s.y,y[D+H+6]=s.z,y[D+H+7]=0),_===!0&&(s.fromBufferAttribute($,I),y[D+H+8]=s.x,y[D+H+9]=s.y,y[D+H+10]=s.z,y[D+H+11]=$.itemSize===4?s.w:1)}}u={count:p,texture:R,size:new Ke(E,b)},i.set(c,u),c.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let _=0;_<l.length;_++)g+=l[_];const M=c.morphTargetsRelative?1:1-g;d.getUniforms().setValue(n,"morphTargetBaseInfluence",M),d.getUniforms().setValue(n,"morphTargetInfluences",l)}d.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Ag(n,e,t,i,s){let r=new WeakMap;function a(l){const m=s.render.frame,p=l.geometry,u=e.get(l,p);if(r.get(u)!==m&&(e.update(u),r.set(u,m)),l.isInstancedMesh&&(l.hasEventListener("dispose",d)===!1&&l.addEventListener("dispose",d),r.get(l)!==m&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,m))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==m&&(g.update(),r.set(g,m))}return u}function c(){r=new WeakMap}function d(l){const m=l.target;m.removeEventListener("dispose",d),i.releaseStatesOfObject(m),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:a,dispose:c}}const Rg={[Dl]:"LINEAR_TONE_MAPPING",[Il]:"REINHARD_TONE_MAPPING",[Ul]:"CINEON_TONE_MAPPING",[Fl]:"ACES_FILMIC_TONE_MAPPING",[Bl]:"AGX_TONE_MAPPING",[zl]:"NEUTRAL_TONE_MAPPING",[Ol]:"CUSTOM_TONE_MAPPING"};function Cg(n,e,t,i,s,r){const a=new ln(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Li(e,t):void 0}),c=new ln(e,t,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),d=new Lt;d.setAttribute("position",new wt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new wt([0,2,0,0,2,0],2));const l=new yf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),m=new lt(d,l),p=new cd(-1,1,1,-1,0,1);let u=null,g=null,M=!1,_,f=null,h=[],S=!1;this.setSize=function(w,E){a.setSize(w,E),c.setSize(w,E);for(let b=0;b<h.length;b++){const y=h[b];y.setSize&&y.setSize(w,E)}},this.setEffects=function(w){h=w,S=h.length>0&&h[0].isRenderPass===!0;const E=a.width,b=a.height;for(let y=0;y<h.length;y++){const R=h[y];R.setSize&&R.setSize(E,b)}},this.begin=function(w,E){if(M||w.toneMapping===cn&&h.length===0)return!1;if(f=E,E!==null){const b=E.width,y=E.height;(a.width!==b||a.height!==y)&&this.setSize(b,y)}return S===!1&&w.setRenderTarget(a),_=w.toneMapping,w.toneMapping=cn,!0},this.hasRenderPass=function(){return S},this.end=function(w,E){w.toneMapping=_,M=!0;let b=a,y=c;for(let R=0;R<h.length;R++){const v=h[R];if(v.enabled!==!1&&(v.render(w,y,b,E),v.needsSwap!==!1)){const C=b;b=y,y=C}}if(u!==w.outputColorSpace||g!==w.toneMapping){u=w.outputColorSpace,g=w.toneMapping,l.defines={},Ye.getTransfer(u)===tt&&(l.defines.SRGB_TRANSFER="");const R=Rg[g];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,w.setRenderTarget(f),w.render(m,p),f=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),d.dispose(),l.dispose()}}const fd=new Pt,Ka=new Li(1,1),pd=new Yl,md=new Jh,gd=new nd,Fc=[],Oc=[],Bc=new Float32Array(16),zc=new Float32Array(9),kc=new Float32Array(4);function Oi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Fc[s];if(r===void 0&&(r=new Float32Array(s),Fc[s]=r),e!==0){i.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,n[a].toArray(r,c)}return r}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function dr(n,e){let t=Oc[e];t===void 0&&(t=new Int32Array(e),Oc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ng(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Ig(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(yt(t,i))return;kc.set(i),n.uniformMatrix2fv(this.addr,!1,kc),St(t,i)}}function Ug(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(yt(t,i))return;zc.set(i),n.uniformMatrix3fv(this.addr,!1,zc),St(t,i)}}function Fg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(yt(t,i))return;Bc.set(i),n.uniformMatrix4fv(this.addr,!1,Bc),St(t,i)}}function Og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function Gg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function Vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function Wg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function jg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ka.compareFunction=t.isReversedDepthBuffer()?ho:uo,r=Ka):r=fd,t.setTexture2D(e||r,s)}function Xg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||md,s)}function qg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||gd,s)}function $g(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||pd,s)}function Yg(n){switch(n){case 5126:return Ng;case 35664:return Pg;case 35665:return Lg;case 35666:return Dg;case 35674:return Ig;case 35675:return Ug;case 35676:return Fg;case 5124:case 35670:return Og;case 35667:case 35671:return Bg;case 35668:case 35672:return zg;case 35669:case 35673:return kg;case 5125:return Gg;case 36294:return Hg;case 36295:return Vg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return jg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return $g}}function Zg(n,e){n.uniform1fv(this.addr,e)}function Kg(n,e){const t=Oi(e,this.size,2);n.uniform2fv(this.addr,t)}function Jg(n,e){const t=Oi(e,this.size,3);n.uniform3fv(this.addr,t)}function Qg(n,e){const t=Oi(e,this.size,4);n.uniform4fv(this.addr,t)}function e0(n,e){const t=Oi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function t0(n,e){const t=Oi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function n0(n,e){const t=Oi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function i0(n,e){n.uniform1iv(this.addr,e)}function s0(n,e){n.uniform2iv(this.addr,e)}function r0(n,e){n.uniform3iv(this.addr,e)}function a0(n,e){n.uniform4iv(this.addr,e)}function o0(n,e){n.uniform1uiv(this.addr,e)}function c0(n,e){n.uniform2uiv(this.addr,e)}function l0(n,e){n.uniform3uiv(this.addr,e)}function d0(n,e){n.uniform4uiv(this.addr,e)}function u0(n,e,t){const i=this.cache,s=e.length,r=dr(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ka:a=fd;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function h0(n,e,t){const i=this.cache,s=e.length,r=dr(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||md,r[a])}function f0(n,e,t){const i=this.cache,s=e.length,r=dr(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||gd,r[a])}function p0(n,e,t){const i=this.cache,s=e.length,r=dr(t,s);yt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||pd,r[a])}function m0(n){switch(n){case 5126:return Zg;case 35664:return Kg;case 35665:return Jg;case 35666:return Qg;case 35674:return e0;case 35675:return t0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return s0;case 35668:case 35672:return r0;case 35669:case 35673:return a0;case 5125:return o0;case 36294:return c0;case 36295:return l0;case 36296:return d0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return h0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return p0}}class g0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Yg(t.type)}}class x0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m0(t.type)}}class _0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const $r=/(\w+)(\])?(\[|\.)?/g;function Gc(n,e){n.seq.push(e),n.map[e.id]=e}function v0(n,e,t){const i=n.name,s=i.length;for($r.lastIndex=0;;){const r=$r.exec(i),a=$r.lastIndex;let c=r[1];const d=r[2]==="]",l=r[3];if(d&&(c=c|0),l===void 0||l==="["&&a+2===s){Gc(t,l===void 0?new g0(c,n,e):new x0(c,n,e));break}else{let p=t.map[c];p===void 0&&(p=new _0(c),Gc(t,p)),t=p}}}class ks{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const c=e.getActiveUniform(t,a),d=e.getUniformLocation(t,c.name);v0(c,d,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],d=i[c.id];d.needsUpdate!==!1&&c.setValue(e,d.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Hc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const M0=37297;let y0=0;function S0(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;i.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return i.join(`
`)}const Vc=new Oe;function b0(n){Ye._getMatrix(Vc,Ye.workingColorSpace,n);const e=`mat3( ${Vc.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case Zs:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Wc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+S0(n.getShaderSource(e),c)}else return r}function E0(n,e){const t=b0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const w0={[Dl]:"Linear",[Il]:"Reinhard",[Ul]:"Cineon",[Fl]:"ACESFilmic",[Bl]:"AgX",[zl]:"Neutral",[Ol]:"Custom"};function T0(n,e){const t=w0[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ns=new Q;function A0(){Ye.getLuminanceCoefficients(Ns);const n=Ns.x.toFixed(4),e=Ns.y.toFixed(4),t=Ns.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function R0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($i).join(`
`)}function C0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function N0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:c}}return t}function $i(n){return n!==""}function jc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ja(n){return n.replace(P0,D0)}const L0=new Map;function D0(n,e){let t=Ve[e];if(t===void 0){const i=L0.get(e);if(i!==void 0)t=Ve[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ja(t)}const I0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(n){return n.replace(I0,U0)}function U0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $c(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const F0={[Us]:"SHADOWMAP_TYPE_PCF",[qi]:"SHADOWMAP_TYPE_VSM"};function O0(n){return F0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const B0={[ni]:"ENVMAP_TYPE_CUBE",[Pi]:"ENVMAP_TYPE_CUBE",[rr]:"ENVMAP_TYPE_CUBE_UV"};function z0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":B0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const k0={[Pi]:"ENVMAP_MODE_REFRACTION"};function G0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":k0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const H0={[Ll]:"ENVMAP_BLENDING_MULTIPLY",[Ph]:"ENVMAP_BLENDING_MIX",[Lh]:"ENVMAP_BLENDING_ADD"};function V0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":H0[n.combine]||"ENVMAP_BLENDING_NONE"}function W0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function j0(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const d=O0(t),l=z0(t),m=G0(t),p=V0(t),u=W0(t),g=R0(t),M=C0(r),_=s.createProgram();let f,h,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($i).join(`
`),f.length>0&&(f+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($i).join(`
`),h.length>0&&(h+=`
`)):(f=[$c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),h=[$c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+m:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==cn?"#define TONE_MAPPING":"",t.toneMapping!==cn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==cn?T0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,E0("linearToOutputTexel",t.outputColorSpace),A0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($i).join(`
`)),a=Ja(a),a=jc(a,t),a=Xc(a,t),c=Ja(c),c=jc(c,t),c=Xc(c,t),a=qc(a),c=qc(c),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,h=["#define varying in",t.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const w=S+f+a,E=S+h+c,b=Hc(s,s.VERTEX_SHADER,w),y=Hc(s,s.FRAGMENT_SHADER,E);s.attachShader(_,b),s.attachShader(_,y),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",$=s.getShaderInfoLog(b)||"",D=s.getShaderInfoLog(y)||"",I=F.trim(),H=$.trim(),k=D.trim();let K=!0,re=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,b,y);else{const fe=Wc(s,b,"vertex"),pe=Wc(s,y,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+fe+`
`+pe)}else I!==""?Fe("WebGLProgram: Program Info Log:",I):(H===""||k==="")&&(re=!1);re&&(P.diagnostics={runnable:K,programLog:I,vertexShader:{log:H,prefix:f},fragmentShader:{log:k,prefix:h}})}s.deleteShader(b),s.deleteShader(y),v=new ks(s,_),C=N0(s,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(_,M0)),U},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=y0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=y,this}let X0=0;class q0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new $0(e),t.set(e,i)),i}}class $0{constructor(e){this.id=X0++,this.code=e,this.usedTimes=0}}function Y0(n){return n===ii||n===qs||n===$s}function Z0(n,e,t,i,s,r){const a=new Zl,c=new q0,d=new Set,l=[],m=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(v){return d.add(v),v===0?"uv":`uv${v}`}function _(v,C,U,P,F,$){const D=P.fog,I=F.geometry,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||H,k),re=K&&K.mapping===rr?K.image.height:null,fe=g[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const pe=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Ee=pe!==void 0?pe.length:0;let We=0;I.morphAttributes.position!==void 0&&(We=1),I.morphAttributes.normal!==void 0&&(We=2),I.morphAttributes.color!==void 0&&(We=3);let we,ke,j,se;if(fe){const Re=rn[fe];we=Re.vertexShader,ke=Re.fragmentShader}else{we=v.vertexShader,ke=v.fragmentShader;const Re=c.getVertexShaderStage(v),pt=c.getFragmentShaderStage(v);c.update(v,Re,pt),j=Re.id,se=pt.id}const Y=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Pe=F.isInstancedMesh===!0,Ce=F.isBatchedMesh===!0,et=!!v.map,Be=!!v.matcap,$e=!!K,He=!!v.aoMap,ze=!!v.lightMap,ct=!!v.bumpMap&&v.wireframe===!1,dt=!!v.normalMap,ft=!!v.displacementMap,gt=!!v.emissiveMap,rt=!!v.metalnessMap,q=!!v.roughnessMap,N=v.anisotropy>0,ae=v.clearcoat>0,oe=v.dispersion>0,T=v.iridescence>0,x=v.sheen>0,L=v.transmission>0,O=N&&!!v.anisotropyMap,z=ae&&!!v.clearcoatMap,J=ae&&!!v.clearcoatNormalMap,G=ae&&!!v.clearcoatRoughnessMap,B=T&&!!v.iridescenceMap,V=T&&!!v.iridescenceThicknessMap,ie=x&&!!v.sheenColorMap,ue=x&&!!v.sheenRoughnessMap,le=!!v.specularMap,ce=!!v.specularColorMap,xe=!!v.specularIntensityMap,ye=L&&!!v.transmissionMap,De=L&&!!v.thicknessMap,W=!!v.gradientMap,ge=!!v.alphaMap,de=v.alphaTest>0,me=!!v.alphaHash,be=!!v.extensions;let he=cn;v.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(he=n.toneMapping);const Le={shaderID:fe,shaderType:v.type,shaderName:v.name,vertexShader:we,fragmentShader:ke,defines:v.defines,customVertexShaderID:j,customFragmentShaderID:se,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ce,batchingColor:Ce&&F._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&F.instanceColor!==null,instancingMorph:Pe&&F.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:et,matcap:Be,envMap:$e,envMapMode:$e&&K.mapping,envMapCubeUVHeight:re,aoMap:He,lightMap:ze,bumpMap:ct,normalMap:dt,displacementMap:ft,emissiveMap:gt,normalMapObjectSpace:dt&&v.normalMapType===Uh,normalMapTangentSpace:dt&&v.normalMapType===$a,packedNormalMap:dt&&v.normalMapType===$a&&Y0(v.normalMap.format),metalnessMap:rt,roughnessMap:q,anisotropy:N,anisotropyMap:O,clearcoat:ae,clearcoatMap:z,clearcoatNormalMap:J,clearcoatRoughnessMap:G,dispersion:oe,iridescence:T,iridescenceMap:B,iridescenceThicknessMap:V,sheen:x,sheenColorMap:ie,sheenRoughnessMap:ue,specularMap:le,specularColorMap:ce,specularIntensityMap:xe,transmission:L,transmissionMap:ye,thicknessMap:De,gradientMap:W,opaque:v.transparent===!1&&v.blending===Ei&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:de,alphaHash:me,combine:v.combine,mapUv:et&&M(v.map.channel),aoMapUv:He&&M(v.aoMap.channel),lightMapUv:ze&&M(v.lightMap.channel),bumpMapUv:ct&&M(v.bumpMap.channel),normalMapUv:dt&&M(v.normalMap.channel),displacementMapUv:ft&&M(v.displacementMap.channel),emissiveMapUv:gt&&M(v.emissiveMap.channel),metalnessMapUv:rt&&M(v.metalnessMap.channel),roughnessMapUv:q&&M(v.roughnessMap.channel),anisotropyMapUv:O&&M(v.anisotropyMap.channel),clearcoatMapUv:z&&M(v.clearcoatMap.channel),clearcoatNormalMapUv:J&&M(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&M(v.clearcoatRoughnessMap.channel),iridescenceMapUv:B&&M(v.iridescenceMap.channel),iridescenceThicknessMapUv:V&&M(v.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&M(v.sheenColorMap.channel),sheenRoughnessMapUv:ue&&M(v.sheenRoughnessMap.channel),specularMapUv:le&&M(v.specularMap.channel),specularColorMapUv:ce&&M(v.specularColorMap.channel),specularIntensityMapUv:xe&&M(v.specularIntensityMap.channel),transmissionMapUv:ye&&M(v.transmissionMap.channel),thicknessMapUv:De&&M(v.thicknessMap.channel),alphaMapUv:ge&&M(v.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(dt||N),vertexNormals:!!I.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!I.attributes.uv&&(et||ge),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||I.attributes.normal===void 0&&dt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Me,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:We,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,decodeVideoTexture:et&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===tt,decodeVideoTextureEmissive:gt&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===tt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===xn,flipSided:v.side===zt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:be&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&v.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Le.vertexUv1s=d.has(1),Le.vertexUv2s=d.has(2),Le.vertexUv3s=d.has(3),d.clear(),Le}function f(v){const C=[];if(v.shaderID?C.push(v.shaderID):(C.push(v.customVertexShaderID),C.push(v.customFragmentShaderID)),v.defines!==void 0)for(const U in v.defines)C.push(U),C.push(v.defines[U]);return v.isRawShaderMaterial===!1&&(h(C,v),S(C,v),C.push(n.outputColorSpace)),C.push(v.customProgramCacheKey),C.join()}function h(v,C){v.push(C.precision),v.push(C.outputColorSpace),v.push(C.envMapMode),v.push(C.envMapCubeUVHeight),v.push(C.mapUv),v.push(C.alphaMapUv),v.push(C.lightMapUv),v.push(C.aoMapUv),v.push(C.bumpMapUv),v.push(C.normalMapUv),v.push(C.displacementMapUv),v.push(C.emissiveMapUv),v.push(C.metalnessMapUv),v.push(C.roughnessMapUv),v.push(C.anisotropyMapUv),v.push(C.clearcoatMapUv),v.push(C.clearcoatNormalMapUv),v.push(C.clearcoatRoughnessMapUv),v.push(C.iridescenceMapUv),v.push(C.iridescenceThicknessMapUv),v.push(C.sheenColorMapUv),v.push(C.sheenRoughnessMapUv),v.push(C.specularMapUv),v.push(C.specularColorMapUv),v.push(C.specularIntensityMapUv),v.push(C.transmissionMapUv),v.push(C.thicknessMapUv),v.push(C.combine),v.push(C.fogExp2),v.push(C.sizeAttenuation),v.push(C.morphTargetsCount),v.push(C.morphAttributeCount),v.push(C.numDirLights),v.push(C.numPointLights),v.push(C.numSpotLights),v.push(C.numSpotLightMaps),v.push(C.numHemiLights),v.push(C.numRectAreaLights),v.push(C.numDirLightShadows),v.push(C.numPointLightShadows),v.push(C.numSpotLightShadows),v.push(C.numSpotLightShadowsWithMaps),v.push(C.numLightProbes),v.push(C.shadowMapType),v.push(C.toneMapping),v.push(C.numClippingPlanes),v.push(C.numClipIntersection),v.push(C.depthPacking)}function S(v,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function w(v){const C=g[v.type];let U;if(C){const P=rn[C];U=_f.clone(P.uniforms)}else U=v.uniforms;return U}function E(v,C){let U=m.get(C);return U!==void 0?++U.usedTimes:(U=new j0(n,C,v,s),l.push(U),m.set(C,U)),U}function b(v){if(--v.usedTimes===0){const C=l.indexOf(v);l[C]=l[l.length-1],l.pop(),m.delete(v.cacheKey),v.destroy()}}function y(v){c.remove(v)}function R(){c.dispose()}return{getParameters:_,getProgramCacheKey:f,getUniforms:w,acquireProgram:E,releaseProgram:b,releaseShaderCache:y,programs:l,dispose:R}}function K0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let c=n.get(a);return c===void 0&&(c={},n.set(a,c)),c}function i(a){n.delete(a)}function s(a,c,d){n.get(a)[c]=d}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function J0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Yc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Zc(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let g=0;return u.isInstancedMesh&&(g+=2),u.isSkinnedMesh&&(g+=1),g}function c(u,g,M,_,f,h){let S=n[e];return S===void 0?(S={id:u.id,object:u,geometry:g,material:M,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:f,group:h},n[e]=S):(S.id=u.id,S.object=u,S.geometry=g,S.material=M,S.materialVariant=a(u),S.groupOrder=_,S.renderOrder=u.renderOrder,S.z=f,S.group=h),e++,S}function d(u,g,M,_,f,h){const S=c(u,g,M,_,f,h);M.transmission>0?i.push(S):M.transparent===!0?s.push(S):t.push(S)}function l(u,g,M,_,f,h){const S=c(u,g,M,_,f,h);M.transmission>0?i.unshift(S):M.transparent===!0?s.unshift(S):t.unshift(S)}function m(u,g,M){t.length>1&&t.sort(u||J0),i.length>1&&i.sort(g||Yc),s.length>1&&s.sort(g||Yc),M&&(t.reverse(),i.reverse(),s.reverse())}function p(){for(let u=e,g=n.length;u<g;u++){const M=n[u];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:d,unshift:l,finish:p,sort:m}}function Q0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Zc,n.set(i,[a])):s>=r.length?(a=new Zc,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function ex(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Q,color:new qe};break;case"SpotLight":t={position:new Q,direction:new Q,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Q,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Q,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return n[e.id]=t,t}}}function tx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let nx=0;function ix(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function sx(n){const e=new ex,t=tx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Q);const s=new Q,r=new ht,a=new ht;function c(l){let m=0,p=0,u=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let g=0,M=0,_=0,f=0,h=0,S=0,w=0,E=0,b=0,y=0,R=0;l.sort(ix);for(let C=0,U=l.length;C<U;C++){const P=l[C],F=P.color,$=P.intensity,D=P.distance;let I=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ii?I=P.shadow.map.texture:I=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)m+=F.r*$,p+=F.g*$,u+=F.b*$;else if(P.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(P.sh.coefficients[H],$);R++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const k=P.shadow,K=t.get(P);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,i.directionalShadow[g]=K,i.directionalShadowMap[g]=I,i.directionalShadowMatrix[g]=P.shadow.matrix,S++}i.directional[g]=H,g++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(F).multiplyScalar($),H.distance=D,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,i.spot[_]=H;const k=P.shadow;if(P.map&&(i.spotLightMap[b]=P.map,b++,k.updateMatrices(P),P.castShadow&&y++),i.spotLightMatrix[_]=k.matrix,P.castShadow){const K=t.get(P);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,i.spotShadow[_]=K,i.spotShadowMap[_]=I,E++}_++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(F).multiplyScalar($),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),i.rectArea[f]=H,f++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const k=P.shadow,K=t.get(P);K.shadowIntensity=k.intensity,K.shadowBias=k.bias,K.shadowNormalBias=k.normalBias,K.shadowRadius=k.radius,K.shadowMapSize=k.mapSize,K.shadowCameraNear=k.camera.near,K.shadowCameraFar=k.camera.far,i.pointShadow[M]=K,i.pointShadowMap[M]=I,i.pointShadowMatrix[M]=P.shadow.matrix,w++}i.point[M]=H,M++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar($),H.groundColor.copy(P.groundColor).multiplyScalar($),i.hemi[h]=H,h++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=m,i.ambient[1]=p,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==g||v.pointLength!==M||v.spotLength!==_||v.rectAreaLength!==f||v.hemiLength!==h||v.numDirectionalShadows!==S||v.numPointShadows!==w||v.numSpotShadows!==E||v.numSpotMaps!==b||v.numLightProbes!==R)&&(i.directional.length=g,i.spot.length=_,i.rectArea.length=f,i.point.length=M,i.hemi.length=h,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=E+b-y,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=R,v.directionalLength=g,v.pointLength=M,v.spotLength=_,v.rectAreaLength=f,v.hemiLength=h,v.numDirectionalShadows=S,v.numPointShadows=w,v.numSpotShadows=E,v.numSpotMaps=b,v.numLightProbes=R,i.version=nx++)}function d(l,m){let p=0,u=0,g=0,M=0,_=0;const f=m.matrixWorldInverse;for(let h=0,S=l.length;h<S;h++){const w=l[h];if(w.isDirectionalLight){const E=i.directional[p];E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),p++}else if(w.isSpotLight){const E=i.spot[g];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),g++}else if(w.isRectAreaLight){const E=i.rectArea[M];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(f),a.identity(),r.copy(w.matrixWorld),r.premultiply(f),a.extractRotation(r),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(w.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(f),u++}else if(w.isHemisphereLight){const E=i.hemi[_];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(f),_++}}}return{setup:c,setupView:d,state:i}}function Kc(n){const e=new sx(n),t=[],i=[],s=[];function r(u){p.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function c(u){i.push(u)}function d(u){s.push(u)}function l(){e.setup(t)}function m(u){e.setupView(t,u)}const p={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:m,pushLight:a,pushShadow:c,pushLightProbeGrid:d}}function rx(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Kc(n),e.set(s,[c])):r>=a.length?(c=new Kc(n),a.push(c)):c=a[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const ax=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ox=`uniform sampler2D shadow_pass;
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
}`,cx=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],lx=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],Jc=new ht,Wi=new Q,Yr=new Q;function dx(n,e,t){let i=new po;const s=new Ke,r=new Ke,a=new ut,c=new Sf,d=new bf,l={},m=t.maxTextureSize,p={[zn]:zt,[zt]:zn,[xn]:xn},u=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:ax,fragmentShader:ox}),g=u.clone();g.defines.HORIZONTAL_PASS=1;const M=new Lt;M.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new lt(M,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Us;let h=this.type;this.render=function(y,R,v){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||y.length===0)return;this.type===hh&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Us);const C=n.getRenderTarget(),U=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Mn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const $=h!==this.type;$&&R.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(I=>I.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,I=y.length;D<I;D++){const H=y[D],k=H.shadow;if(k===void 0){Fe("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const K=k.getFrameExtents();s.multiply(K),r.copy(k.mapSize),(s.x>m||s.y>m)&&(s.x>m&&(r.x=Math.floor(m/K.x),s.x=r.x*K.x,k.mapSize.x=r.x),s.y>m&&(r.y=Math.floor(m/K.y),s.y=r.y*K.y,k.mapSize.y=r.y));const re=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=re,k.map===null||$===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===qi){if(H.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new ln(s.x,s.y,{format:ii,type:Sn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new Li(s.x,s.y,an),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=bn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Tt,k.map.depthTexture.magFilter=Tt}else H.isPointLight?(k.map=new hd(s.x),k.map.depthTexture=new gf(s.x,dn)):(k.map=new ln(s.x,s.y),k.map.depthTexture=new Li(s.x,s.y,dn)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=bn,this.type===Us?(k.map.depthTexture.compareFunction=re?ho:uo,k.map.depthTexture.minFilter=Nt,k.map.depthTexture.magFilter=Nt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Tt,k.map.depthTexture.magFilter=Tt);k.camera.updateProjectionMatrix()}const fe=k.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<fe;pe++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(k.map),n.clear());const Ee=k.getViewport(pe);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),F.viewport(a)}if(H.isPointLight){const Ee=k.camera,We=k.matrix,we=H.distance||Ee.far;we!==Ee.far&&(Ee.far=we,Ee.updateProjectionMatrix()),Wi.setFromMatrixPosition(H.matrixWorld),Ee.position.copy(Wi),Yr.copy(Ee.position),Yr.add(cx[pe]),Ee.up.copy(lx[pe]),Ee.lookAt(Yr),Ee.updateMatrixWorld(),We.makeTranslation(-Wi.x,-Wi.y,-Wi.z),Jc.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Jc,Ee.coordinateSystem,Ee.reversedDepth)}else k.updateMatrices(H);i=k.getFrustum(),E(R,v,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===qi&&S(k,v),k.needsUpdate=!1}h=this.type,f.needsUpdate=!1,n.setRenderTarget(C,U,P)};function S(y,R){const v=e.update(_);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,g.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new ln(s.x,s.y,{format:ii,type:Sn})),u.uniforms.shadow_pass.value=y.map.depthTexture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(R,null,v,u,_,null),g.uniforms.shadow_pass.value=y.mapPass.texture,g.uniforms.resolution.value=y.mapSize,g.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(R,null,v,g,_,null)}function w(y,R,v,C){let U=null;const P=v.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(P!==void 0)U=P;else if(U=v.isPointLight===!0?d:c,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=U.uuid,$=R.uuid;let D=l[F];D===void 0&&(D={},l[F]=D);let I=D[$];I===void 0&&(I=U.clone(),D[$]=I,R.addEventListener("dispose",b)),U=I}if(U.visible=R.visible,U.wireframe=R.wireframe,C===qi?U.side=R.shadowSide!==null?R.shadowSide:R.side:U.side=R.shadowSide!==null?R.shadowSide:p[R.side],U.alphaMap=R.alphaMap,U.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,U.map=R.map,U.clipShadows=R.clipShadows,U.clippingPlanes=R.clippingPlanes,U.clipIntersection=R.clipIntersection,U.displacementMap=R.displacementMap,U.displacementScale=R.displacementScale,U.displacementBias=R.displacementBias,U.wireframeLinewidth=R.wireframeLinewidth,U.linewidth=R.linewidth,v.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const F=n.properties.get(U);F.light=v}return U}function E(y,R,v,C,U){if(y.visible===!1)return;if(y.layers.test(R.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&U===qi)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,y.matrixWorld);const $=e.update(y),D=y.material;if(Array.isArray(D)){const I=$.groups;for(let H=0,k=I.length;H<k;H++){const K=I[H],re=D[K.materialIndex];if(re&&re.visible){const fe=w(y,re,C,U);y.onBeforeShadow(n,y,R,v,$,fe,K),n.renderBufferDirect(v,null,$,fe,y,K),y.onAfterShadow(n,y,R,v,$,fe,K)}}}else if(D.visible){const I=w(y,D,C,U);y.onBeforeShadow(n,y,R,v,$,I,null),n.renderBufferDirect(v,null,$,I,y,null),y.onAfterShadow(n,y,R,v,$,I,null)}}const F=y.children;for(let $=0,D=F.length;$<D;$++)E(F[$],R,v,C,U)}function b(y){y.target.removeEventListener("dispose",b);for(const v in l){const C=l[v],U=y.target.uuid;U in C&&(C[U].dispose(),delete C[U])}}}function ux(n,e){function t(){let W=!1;const ge=new ut;let de=null;const me=new ut(0,0,0,0);return{setMask:function(be){de!==be&&!W&&(n.colorMask(be,be,be,be),de=be)},setLocked:function(be){W=be},setClear:function(be,he,Le,Re,pt){pt===!0&&(be*=Re,he*=Re,Le*=Re),ge.set(be,he,Le,Re),me.equals(ge)===!1&&(n.clearColor(be,he,Le,Re),me.copy(ge))},reset:function(){W=!1,de=null,me.set(-1,0,0,0)}}}function i(){let W=!1,ge=!1,de=null,me=null,be=null;return{setReversed:function(he){if(ge!==he){const Le=e.get("EXT_clip_control");he?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ge=he;const Re=be;be=null,this.setClear(Re)}},getReversed:function(){return ge},setTest:function(he){he?Y(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(he){de!==he&&!W&&(n.depthMask(he),de=he)},setFunc:function(he){if(ge&&(he=jh[he]),me!==he){switch(he){case la:n.depthFunc(n.NEVER);break;case da:n.depthFunc(n.ALWAYS);break;case ua:n.depthFunc(n.LESS);break;case Ni:n.depthFunc(n.LEQUAL);break;case ha:n.depthFunc(n.EQUAL);break;case fa:n.depthFunc(n.GEQUAL);break;case pa:n.depthFunc(n.GREATER);break;case ma:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=he}},setLocked:function(he){W=he},setClear:function(he){be!==he&&(be=he,ge&&(he=1-he),n.clearDepth(he))},reset:function(){W=!1,de=null,me=null,be=null,ge=!1}}}function s(){let W=!1,ge=null,de=null,me=null,be=null,he=null,Le=null,Re=null,pt=null;return{setTest:function(at){W||(at?Y(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(at){ge!==at&&!W&&(n.stencilMask(at),ge=at)},setFunc:function(at,Qt,en){(de!==at||me!==Qt||be!==en)&&(n.stencilFunc(at,Qt,en),de=at,me=Qt,be=en)},setOp:function(at,Qt,en){(he!==at||Le!==Qt||Re!==en)&&(n.stencilOp(at,Qt,en),he=at,Le=Qt,Re=en)},setLocked:function(at){W=at},setClear:function(at){pt!==at&&(n.clearStencil(at),pt=at)},reset:function(){W=!1,ge=null,de=null,me=null,be=null,he=null,Le=null,Re=null,pt=null}}}const r=new t,a=new i,c=new s,d=new WeakMap,l=new WeakMap;let m={},p={},u={},g=new WeakMap,M=[],_=null,f=!1,h=null,S=null,w=null,E=null,b=null,y=null,R=null,v=new qe(0,0,0),C=0,U=!1,P=null,F=null,$=null,D=null,I=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,K=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(re)[1]),k=K>=1):re.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),k=K>=2);let fe=null,pe={};const Ee=n.getParameter(n.SCISSOR_BOX),We=n.getParameter(n.VIEWPORT),we=new ut().fromArray(Ee),ke=new ut().fromArray(We);function j(W,ge,de,me){const be=new Uint8Array(4),he=n.createTexture();n.bindTexture(W,he),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<de;Le++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,be):n.texImage2D(ge+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,be);return he}const se={};se[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),Y(n.DEPTH_TEST),a.setFunc(Ni),ct(!1),dt(Qo),Y(n.CULL_FACE),He(Mn);function Y(W){m[W]!==!0&&(n.enable(W),m[W]=!0)}function Me(W){m[W]!==!1&&(n.disable(W),m[W]=!1)}function Pe(W,ge){return u[W]!==ge?(n.bindFramebuffer(W,ge),u[W]=ge,W===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ge),W===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ce(W,ge){let de=M,me=!1;if(W){de=g.get(ge),de===void 0&&(de=[],g.set(ge,de));const be=W.textures;if(de.length!==be.length||de[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Le=be.length;he<Le;he++)de[he]=n.COLOR_ATTACHMENT0+he;de.length=be.length,me=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,me=!0);me&&n.drawBuffers(de)}function et(W){return _!==W?(n.useProgram(W),_=W,!0):!1}const Be={[Yn]:n.FUNC_ADD,[ph]:n.FUNC_SUBTRACT,[mh]:n.FUNC_REVERSE_SUBTRACT};Be[gh]=n.MIN,Be[xh]=n.MAX;const $e={[_h]:n.ZERO,[vh]:n.ONE,[Mh]:n.SRC_COLOR,[oa]:n.SRC_ALPHA,[Th]:n.SRC_ALPHA_SATURATE,[Eh]:n.DST_COLOR,[Sh]:n.DST_ALPHA,[yh]:n.ONE_MINUS_SRC_COLOR,[ca]:n.ONE_MINUS_SRC_ALPHA,[wh]:n.ONE_MINUS_DST_COLOR,[bh]:n.ONE_MINUS_DST_ALPHA,[Ah]:n.CONSTANT_COLOR,[Rh]:n.ONE_MINUS_CONSTANT_COLOR,[Ch]:n.CONSTANT_ALPHA,[Nh]:n.ONE_MINUS_CONSTANT_ALPHA};function He(W,ge,de,me,be,he,Le,Re,pt,at){if(W===Mn){f===!0&&(Me(n.BLEND),f=!1);return}if(f===!1&&(Y(n.BLEND),f=!0),W!==fh){if(W!==h||at!==U){if((S!==Yn||b!==Yn)&&(n.blendEquation(n.FUNC_ADD),S=Yn,b=Yn),at)switch(W){case Ei:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ti:n.blendFunc(n.ONE,n.ONE);break;case ec:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",W);break}else switch(W){case Ei:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ti:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ec:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tc:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",W);break}w=null,E=null,y=null,R=null,v.set(0,0,0),C=0,h=W,U=at}return}be=be||ge,he=he||de,Le=Le||me,(ge!==S||be!==b)&&(n.blendEquationSeparate(Be[ge],Be[be]),S=ge,b=be),(de!==w||me!==E||he!==y||Le!==R)&&(n.blendFuncSeparate($e[de],$e[me],$e[he],$e[Le]),w=de,E=me,y=he,R=Le),(Re.equals(v)===!1||pt!==C)&&(n.blendColor(Re.r,Re.g,Re.b,pt),v.copy(Re),C=pt),h=W,U=!1}function ze(W,ge){W.side===xn?Me(n.CULL_FACE):Y(n.CULL_FACE);let de=W.side===zt;ge&&(de=!de),ct(de),W.blending===Ei&&W.transparent===!1?He(Mn):He(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),a.setFunc(W.depthFunc),a.setTest(W.depthTest),a.setMask(W.depthWrite),r.setMask(W.colorWrite);const me=W.stencilWrite;c.setTest(me),me&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),gt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ct(W){P!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),P=W)}function dt(W){W!==dh?(Y(n.CULL_FACE),W!==F&&(W===Qo?n.cullFace(n.BACK):W===uh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),F=W}function ft(W){W!==$&&(k&&n.lineWidth(W),$=W)}function gt(W,ge,de){W?(Y(n.POLYGON_OFFSET_FILL),(D!==ge||I!==de)&&(D=ge,I=de,a.getReversed()&&(ge=-ge),n.polygonOffset(ge,de))):Me(n.POLYGON_OFFSET_FILL)}function rt(W){W?Y(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function q(W){W===void 0&&(W=n.TEXTURE0+H-1),fe!==W&&(n.activeTexture(W),fe=W)}function N(W,ge,de){de===void 0&&(fe===null?de=n.TEXTURE0+H-1:de=fe);let me=pe[de];me===void 0&&(me={type:void 0,texture:void 0},pe[de]=me),(me.type!==W||me.texture!==ge)&&(fe!==de&&(n.activeTexture(de),fe=de),n.bindTexture(W,ge||se[W]),me.type=W,me.texture=ge)}function ae(){const W=pe[fe];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function oe(){try{n.compressedTexImage2D(...arguments)}catch(W){Qe("WebGLState:",W)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(W){Qe("WebGLState:",W)}}function x(){try{n.texSubImage2D(...arguments)}catch(W){Qe("WebGLState:",W)}}function L(){try{n.texSubImage3D(...arguments)}catch(W){Qe("WebGLState:",W)}}function O(){try{n.compressedTexSubImage2D(...arguments)}catch(W){Qe("WebGLState:",W)}}function z(){try{n.compressedTexSubImage3D(...arguments)}catch(W){Qe("WebGLState:",W)}}function J(){try{n.texStorage2D(...arguments)}catch(W){Qe("WebGLState:",W)}}function G(){try{n.texStorage3D(...arguments)}catch(W){Qe("WebGLState:",W)}}function B(){try{n.texImage2D(...arguments)}catch(W){Qe("WebGLState:",W)}}function V(){try{n.texImage3D(...arguments)}catch(W){Qe("WebGLState:",W)}}function ie(W){return p[W]!==void 0?p[W]:n.getParameter(W)}function ue(W,ge){p[W]!==ge&&(n.pixelStorei(W,ge),p[W]=ge)}function le(W){we.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),we.copy(W))}function ce(W){ke.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),ke.copy(W))}function xe(W,ge){let de=l.get(ge);de===void 0&&(de=new WeakMap,l.set(ge,de));let me=de.get(W);me===void 0&&(me=n.getUniformBlockIndex(ge,W.name),de.set(W,me))}function ye(W,ge){const me=l.get(ge).get(W);d.get(ge)!==me&&(n.uniformBlockBinding(ge,me,W.__bindingPointIndex),d.set(ge,me))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),m={},p={},fe=null,pe={},u={},g=new WeakMap,M=[],_=null,f=!1,h=null,S=null,w=null,E=null,b=null,y=null,R=null,v=new qe(0,0,0),C=0,U=!1,P=null,F=null,$=null,D=null,I=null,we.set(0,0,n.canvas.width,n.canvas.height),ke.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:Y,disable:Me,bindFramebuffer:Pe,drawBuffers:Ce,useProgram:et,setBlending:He,setMaterial:ze,setFlipSided:ct,setCullFace:dt,setLineWidth:ft,setPolygonOffset:gt,setScissorTest:rt,activeTexture:q,bindTexture:N,unbindTexture:ae,compressedTexImage2D:oe,compressedTexImage3D:T,texImage2D:B,texImage3D:V,pixelStorei:ue,getParameter:ie,updateUBOMapping:xe,uniformBlockBinding:ye,texStorage2D:J,texStorage3D:G,texSubImage2D:x,texSubImage3D:L,compressedTexSubImage2D:O,compressedTexSubImage3D:z,scissor:le,viewport:ce,reset:De}}function hx(n,e,t,i,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ke,m=new WeakMap,p=new Set;let u;const g=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,x){return M?new OffscreenCanvas(T,x):Ks("canvas")}function f(T,x,L){let O=1;const z=oe(T);if((z.width>L||z.height>L)&&(O=L/Math.max(z.width,z.height)),O<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const J=Math.floor(O*z.width),G=Math.floor(O*z.height);u===void 0&&(u=_(J,G));const B=x?_(J,G):u;return B.width=J,B.height=G,B.getContext("2d").drawImage(T,0,0,J,G),Fe("WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+J+"x"+G+")."),B}else return"data"in T&&Fe("WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),T;return T}function h(T){return T.generateMipmaps}function S(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,x,L,O,z,J=!1){if(T!==null){if(n[T]!==void 0)return n[T];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let G;O&&(G=e.get("EXT_texture_norm16"),G||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let B=x;if(x===n.RED&&(L===n.FLOAT&&(B=n.R32F),L===n.HALF_FLOAT&&(B=n.R16F),L===n.UNSIGNED_BYTE&&(B=n.R8),L===n.UNSIGNED_SHORT&&G&&(B=G.R16_EXT),L===n.SHORT&&G&&(B=G.R16_SNORM_EXT)),x===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(B=n.R8UI),L===n.UNSIGNED_SHORT&&(B=n.R16UI),L===n.UNSIGNED_INT&&(B=n.R32UI),L===n.BYTE&&(B=n.R8I),L===n.SHORT&&(B=n.R16I),L===n.INT&&(B=n.R32I)),x===n.RG&&(L===n.FLOAT&&(B=n.RG32F),L===n.HALF_FLOAT&&(B=n.RG16F),L===n.UNSIGNED_BYTE&&(B=n.RG8),L===n.UNSIGNED_SHORT&&G&&(B=G.RG16_EXT),L===n.SHORT&&G&&(B=G.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(B=n.RG8UI),L===n.UNSIGNED_SHORT&&(B=n.RG16UI),L===n.UNSIGNED_INT&&(B=n.RG32UI),L===n.BYTE&&(B=n.RG8I),L===n.SHORT&&(B=n.RG16I),L===n.INT&&(B=n.RG32I)),x===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(B=n.RGB8UI),L===n.UNSIGNED_SHORT&&(B=n.RGB16UI),L===n.UNSIGNED_INT&&(B=n.RGB32UI),L===n.BYTE&&(B=n.RGB8I),L===n.SHORT&&(B=n.RGB16I),L===n.INT&&(B=n.RGB32I)),x===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(B=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(B=n.RGBA16UI),L===n.UNSIGNED_INT&&(B=n.RGBA32UI),L===n.BYTE&&(B=n.RGBA8I),L===n.SHORT&&(B=n.RGBA16I),L===n.INT&&(B=n.RGBA32I)),x===n.RGB&&(L===n.UNSIGNED_SHORT&&G&&(B=G.RGB16_EXT),L===n.SHORT&&G&&(B=G.RGB16_SNORM_EXT),L===n.UNSIGNED_INT_5_9_9_9_REV&&(B=n.RGB9_E5),L===n.UNSIGNED_INT_10F_11F_11F_REV&&(B=n.R11F_G11F_B10F)),x===n.RGBA){const V=J?Zs:Ye.getTransfer(z);L===n.FLOAT&&(B=n.RGBA32F),L===n.HALF_FLOAT&&(B=n.RGBA16F),L===n.UNSIGNED_BYTE&&(B=V===tt?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT&&G&&(B=G.RGBA16_EXT),L===n.SHORT&&G&&(B=G.RGBA16_SNORM_EXT),L===n.UNSIGNED_SHORT_4_4_4_4&&(B=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(B=n.RGB5_A1)}return(B===n.R16F||B===n.R32F||B===n.RG16F||B===n.RG32F||B===n.RGBA16F||B===n.RGBA32F)&&e.get("EXT_color_buffer_float"),B}function b(T,x){let L;return T?x===null||x===dn||x===Qi?L=n.DEPTH24_STENCIL8:x===an?L=n.DEPTH32F_STENCIL8:x===Ji&&(L=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===dn||x===Qi?L=n.DEPTH_COMPONENT24:x===an?L=n.DEPTH_COMPONENT32F:x===Ji&&(L=n.DEPTH_COMPONENT16),L}function y(T,x){return h(T)===!0||T.isFramebufferTexture&&T.minFilter!==Tt&&T.minFilter!==Nt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function R(T){const x=T.target;x.removeEventListener("dispose",R),C(x),x.isVideoTexture&&m.delete(x),x.isHTMLTexture&&p.delete(x)}function v(T){const x=T.target;x.removeEventListener("dispose",v),P(x)}function C(T){const x=i.get(T);if(x.__webglInit===void 0)return;const L=T.source,O=g.get(L);if(O){const z=O[x.__cacheKey];z.usedTimes--,z.usedTimes===0&&U(T),Object.keys(O).length===0&&g.delete(L)}i.remove(T)}function U(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const L=T.source,O=g.get(L);delete O[x.__cacheKey],a.memory.textures--}function P(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(x.__webglFramebuffer[O]))for(let z=0;z<x.__webglFramebuffer[O].length;z++)n.deleteFramebuffer(x.__webglFramebuffer[O][z]);else n.deleteFramebuffer(x.__webglFramebuffer[O]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[O])}else{if(Array.isArray(x.__webglFramebuffer))for(let O=0;O<x.__webglFramebuffer.length;O++)n.deleteFramebuffer(x.__webglFramebuffer[O]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let O=0;O<x.__webglColorRenderbuffer.length;O++)x.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[O]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const L=T.textures;for(let O=0,z=L.length;O<z;O++){const J=i.get(L[O]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),a.memory.textures--),i.remove(L[O])}i.remove(T)}let F=0;function $(){F=0}function D(){return F}function I(T){F=T}function H(){const T=F;return T>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function k(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function K(T,x){const L=i.get(T);if(T.isVideoTexture&&N(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&L.__version!==T.version){const O=T.image;if(O===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(L,T,x);return}}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+x)}function re(T,x){const L=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){Me(L,T,x);return}else T.isExternalTexture&&(L.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+x)}function fe(T,x){const L=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&L.__version!==T.version){Me(L,T,x);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+x)}function pe(T,x){const L=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&L.__version!==T.version){Pe(L,T,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+x)}const Ee={[ga]:n.REPEAT,[_n]:n.CLAMP_TO_EDGE,[xa]:n.MIRRORED_REPEAT},We={[Tt]:n.NEAREST,[Dh]:n.NEAREST_MIPMAP_NEAREST,[os]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[_r]:n.LINEAR_MIPMAP_NEAREST,[Kn]:n.LINEAR_MIPMAP_LINEAR},we={[Fh]:n.NEVER,[Gh]:n.ALWAYS,[Oh]:n.LESS,[uo]:n.LEQUAL,[Bh]:n.EQUAL,[ho]:n.GEQUAL,[zh]:n.GREATER,[kh]:n.NOTEQUAL};function ke(T,x){if(x.type===an&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Nt||x.magFilter===_r||x.magFilter===os||x.magFilter===Kn||x.minFilter===Nt||x.minFilter===_r||x.minFilter===os||x.minFilter===Kn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Ee[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Ee[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Ee[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,We[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,We[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,we[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Tt||x.minFilter!==os&&x.minFilter!==Kn||x.type===an&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function j(T,x){let L=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",R));const O=x.source;let z=g.get(O);z===void 0&&(z={},g.set(O,z));const J=k(x);if(J!==T.__cacheKey){z[J]===void 0&&(z[J]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),z[J].usedTimes++;const G=z[T.__cacheKey];G!==void 0&&(z[T.__cacheKey].usedTimes--,G.usedTimes===0&&U(x)),T.__cacheKey=J,T.__webglTexture=z[J].texture}return L}function se(T,x,L){return Math.floor(Math.floor(T/L)/x)}function Y(T,x,L,O){const J=T.updateRanges;if(J.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,L,O,x.data);else{J.sort((ue,le)=>ue.start-le.start);let G=0;for(let ue=1;ue<J.length;ue++){const le=J[G],ce=J[ue],xe=le.start+le.count,ye=se(ce.start,x.width,4),De=se(le.start,x.width,4);ce.start<=xe+1&&ye===De&&se(ce.start+ce.count-1,x.width,4)===ye?le.count=Math.max(le.count,ce.start+ce.count-le.start):(++G,J[G]=ce)}J.length=G+1;const B=t.getParameter(n.UNPACK_ROW_LENGTH),V=t.getParameter(n.UNPACK_SKIP_PIXELS),ie=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ue=0,le=J.length;ue<le;ue++){const ce=J[ue],xe=Math.floor(ce.start/4),ye=Math.ceil(ce.count/4),De=xe%x.width,W=Math.floor(xe/x.width),ge=ye,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,De,W,ge,de,L,O,x.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,B),t.pixelStorei(n.UNPACK_SKIP_PIXELS,V),t.pixelStorei(n.UNPACK_SKIP_ROWS,ie)}}function Me(T,x,L){let O=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(O=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(O=n.TEXTURE_3D);const z=j(T,x),J=x.source;t.bindTexture(O,T.__webglTexture,n.TEXTURE0+L);const G=i.get(J);if(J.version!==G.__version||z===!0){if(t.activeTexture(n.TEXTURE0+L),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const de=Ye.getPrimaries(Ye.workingColorSpace),me=x.colorSpace===In?null:Ye.getPrimaries(x.colorSpace),be=x.colorSpace===In||de===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let V=f(x.image,!1,s.maxTextureSize);V=ae(x,V);const ie=r.convert(x.format,x.colorSpace),ue=r.convert(x.type);let le=E(x.internalFormat,ie,ue,x.normalized,x.colorSpace,x.isVideoTexture);ke(O,x);let ce;const xe=x.mipmaps,ye=x.isVideoTexture!==!0,De=G.__version===void 0||z===!0,W=J.dataReady,ge=y(x,V);if(x.isDepthTexture)le=b(x.format===Jn,x.type),De&&(ye?t.texStorage2D(n.TEXTURE_2D,1,le,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,le,V.width,V.height,0,ie,ue,null));else if(x.isDataTexture)if(xe.length>0){ye&&De&&t.texStorage2D(n.TEXTURE_2D,ge,le,xe[0].width,xe[0].height);for(let de=0,me=xe.length;de<me;de++)ce=xe[de],ye?W&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,ie,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ie,ue,ce.data);x.generateMipmaps=!1}else ye?(De&&t.texStorage2D(n.TEXTURE_2D,ge,le,V.width,V.height),W&&Y(x,V,ie,ue)):t.texImage2D(n.TEXTURE_2D,0,le,V.width,V.height,0,ie,ue,V.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ye&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,le,xe[0].width,xe[0].height,V.depth);for(let de=0,me=xe.length;de<me;de++)if(ce=xe[de],x.format!==Kt)if(ie!==null)if(ye){if(W)if(x.layerUpdates.size>0){const be=Cc(ce.width,ce.height,x.format,x.type);for(const he of x.layerUpdates){const Le=ce.data.subarray(he*be/ce.data.BYTES_PER_ELEMENT,(he+1)*be/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,he,ce.width,ce.height,1,ie,Le)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,V.depth,ie,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,V.depth,0,ce.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ye?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,V.depth,ie,ue,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,V.depth,0,ie,ue,ce.data)}else{ye&&De&&t.texStorage2D(n.TEXTURE_2D,ge,le,xe[0].width,xe[0].height);for(let de=0,me=xe.length;de<me;de++)ce=xe[de],x.format!==Kt?ie!==null?ye?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,ie,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ce.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ye?W&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,ie,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ie,ue,ce.data)}else if(x.isDataArrayTexture)if(ye){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,le,V.width,V.height,V.depth),W)if(x.layerUpdates.size>0){const de=Cc(V.width,V.height,x.format,x.type);for(const me of x.layerUpdates){const be=V.data.subarray(me*de/V.data.BYTES_PER_ELEMENT,(me+1)*de/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,V.width,V.height,1,ie,ue,be)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,ie,ue,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,V.width,V.height,V.depth,0,ie,ue,V.data);else if(x.isData3DTexture)ye?(De&&t.texStorage3D(n.TEXTURE_3D,ge,le,V.width,V.height,V.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,ie,ue,V.data)):t.texImage3D(n.TEXTURE_3D,0,le,V.width,V.height,V.depth,0,ie,ue,V.data);else if(x.isFramebufferTexture){if(De)if(ye)t.texStorage2D(n.TEXTURE_2D,ge,le,V.width,V.height);else{let de=V.width,me=V.height;for(let be=0;be<ge;be++)t.texImage2D(n.TEXTURE_2D,be,le,de,me,0,ie,ue,null),de>>=1,me>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),V.parentNode!==de){de.appendChild(V),p.add(x),de.onpaint=me=>{const be=me.changedElements;for(const he of p)be.includes(he.image)&&(he.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,V);else{const be=n.RGBA,he=n.RGBA,Le=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,be,he,Le,V)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(xe.length>0){if(ye&&De){const de=oe(xe[0]);t.texStorage2D(n.TEXTURE_2D,ge,le,de.width,de.height)}for(let de=0,me=xe.length;de<me;de++)ce=xe[de],ye?W&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ie,ue,ce):t.texImage2D(n.TEXTURE_2D,de,le,ie,ue,ce);x.generateMipmaps=!1}else if(ye){if(De){const de=oe(V);t.texStorage2D(n.TEXTURE_2D,ge,le,de.width,de.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie,ue,V)}else t.texImage2D(n.TEXTURE_2D,0,le,ie,ue,V);h(x)&&S(O),G.__version=J.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Pe(T,x,L){if(x.image.length!==6)return;const O=j(T,x),z=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+L);const J=i.get(z);if(z.version!==J.__version||O===!0){t.activeTexture(n.TEXTURE0+L);const G=Ye.getPrimaries(Ye.workingColorSpace),B=x.colorSpace===In?null:Ye.getPrimaries(x.colorSpace),V=x.colorSpace===In||G===B?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const ie=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,le=[];for(let he=0;he<6;he++)!ie&&!ue?le[he]=f(x.image[he],!0,s.maxCubemapSize):le[he]=ue?x.image[he].image:x.image[he],le[he]=ae(x,le[he]);const ce=le[0],xe=r.convert(x.format,x.colorSpace),ye=r.convert(x.type),De=E(x.internalFormat,xe,ye,x.normalized,x.colorSpace),W=x.isVideoTexture!==!0,ge=J.__version===void 0||O===!0,de=z.dataReady;let me=y(x,ce);ke(n.TEXTURE_CUBE_MAP,x);let be;if(ie){W&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,De,ce.width,ce.height);for(let he=0;he<6;he++){be=le[he].mipmaps;for(let Le=0;Le<be.length;Le++){const Re=be[Le];x.format!==Kt?xe!==null?W?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le,0,0,Re.width,Re.height,xe,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le,De,Re.width,Re.height,0,Re.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le,0,0,Re.width,Re.height,xe,ye,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le,De,Re.width,Re.height,0,xe,ye,Re.data)}}}else{if(be=x.mipmaps,W&&ge){be.length>0&&me++;const he=oe(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,De,he.width,he.height)}for(let he=0;he<6;he++)if(ue){W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,le[he].width,le[he].height,xe,ye,le[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,De,le[he].width,le[he].height,0,xe,ye,le[he].data);for(let Le=0;Le<be.length;Le++){const pt=be[Le].image[he].image;W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le+1,0,0,pt.width,pt.height,xe,ye,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le+1,De,pt.width,pt.height,0,xe,ye,pt.data)}}else{W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,xe,ye,le[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,De,xe,ye,le[he]);for(let Le=0;Le<be.length;Le++){const Re=be[Le];W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le+1,0,0,xe,ye,Re.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Le+1,De,xe,ye,Re.image[he])}}}h(x)&&S(n.TEXTURE_CUBE_MAP),J.__version=z.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Ce(T,x,L,O,z,J){const G=r.convert(L.format,L.colorSpace),B=r.convert(L.type),V=E(L.internalFormat,G,B,L.normalized,L.colorSpace),ie=i.get(x),ue=i.get(L);if(ue.__renderTarget=x,!ie.__hasExternalTextures){const le=Math.max(1,x.width>>J),ce=Math.max(1,x.height>>J);z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?t.texImage3D(z,J,V,le,ce,x.depth,0,G,B,null):t.texImage2D(z,J,V,le,ce,0,G,B,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),q(x)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,O,z,ue.__webglTexture,0,rt(x)):(z===n.TEXTURE_2D||z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,O,z,ue.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function et(T,x,L){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const O=x.depthTexture,z=O&&O.isDepthTexture?O.type:null,J=b(x.stencilBuffer,z),G=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;q(x)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(x),J,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(x),J,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,J,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,T)}else{const O=x.textures;for(let z=0;z<O.length;z++){const J=O[z],G=r.convert(J.format,J.colorSpace),B=r.convert(J.type),V=E(J.internalFormat,G,B,J.normalized,J.colorSpace);q(x)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt(x),V,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt(x),V,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,V,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(T,x,L){const O=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const z=i.get(x.depthTexture);if(z.__renderTarget=x,(!z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),O){if(z.__webglInit===void 0&&(z.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),z.__webglTexture===void 0){z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),ke(n.TEXTURE_CUBE_MAP,x.depthTexture);const ie=r.convert(x.depthTexture.format),ue=r.convert(x.depthTexture.type);let le;x.depthTexture.format===bn?le=n.DEPTH_COMPONENT24:x.depthTexture.format===Jn&&(le=n.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,le,x.width,x.height,0,ie,ue,null)}}else K(x.depthTexture,0);const J=z.__webglTexture,G=rt(x),B=O?n.TEXTURE_CUBE_MAP_POSITIVE_X+L:n.TEXTURE_2D,V=x.depthTexture.format===Jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===bn)q(x)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,B,J,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,V,B,J,0);else if(x.depthTexture.format===Jn)q(x)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,B,J,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,V,B,J,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $e(T){const x=i.get(T),L=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const O=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),O){const z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,O.removeEventListener("dispose",z)};O.addEventListener("dispose",z),x.__depthDisposeCallback=z}x.__boundDepthTexture=O}if(T.depthTexture&&!x.__autoAllocateDepthBuffer)if(L)for(let O=0;O<6;O++)Be(x.__webglFramebuffer[O],T,O);else{const O=T.texture.mipmaps;O&&O.length>0?Be(x.__webglFramebuffer[0],T,0):Be(x.__webglFramebuffer,T,0)}else if(L){x.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[O]),x.__webglDepthbuffer[O]===void 0)x.__webglDepthbuffer[O]=n.createRenderbuffer(),et(x.__webglDepthbuffer[O],T,!1);else{const z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=x.__webglDepthbuffer[O];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,J)}}else{const O=T.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),et(x.__webglDepthbuffer,T,!1);else{const z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,J)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(T,x,L){const O=i.get(T);x!==void 0&&Ce(O.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&$e(T)}function ze(T){const x=T.texture,L=i.get(T),O=i.get(x);T.addEventListener("dispose",v);const z=T.textures,J=T.isWebGLCubeRenderTarget===!0,G=z.length>1;if(G||(O.__webglTexture===void 0&&(O.__webglTexture=n.createTexture()),O.__version=x.version,a.memory.textures++),J){L.__webglFramebuffer=[];for(let B=0;B<6;B++)if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[B]=[];for(let V=0;V<x.mipmaps.length;V++)L.__webglFramebuffer[B][V]=n.createFramebuffer()}else L.__webglFramebuffer[B]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let B=0;B<x.mipmaps.length;B++)L.__webglFramebuffer[B]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(G)for(let B=0,V=z.length;B<V;B++){const ie=i.get(z[B]);ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&q(T)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let B=0;B<z.length;B++){const V=z[B];L.__webglColorRenderbuffer[B]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[B]);const ie=r.convert(V.format,V.colorSpace),ue=r.convert(V.type),le=E(V.internalFormat,ie,ue,V.normalized,V.colorSpace,T.isXRRenderTarget===!0),ce=rt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,le,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+B,n.RENDERBUFFER,L.__webglColorRenderbuffer[B])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),et(L.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),ke(n.TEXTURE_CUBE_MAP,x);for(let B=0;B<6;B++)if(x.mipmaps&&x.mipmaps.length>0)for(let V=0;V<x.mipmaps.length;V++)Ce(L.__webglFramebuffer[B][V],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+B,V);else Ce(L.__webglFramebuffer[B],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+B,0);h(x)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let B=0,V=z.length;B<V;B++){const ie=z[B],ue=i.get(ie);let le=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),ke(le,ie),Ce(L.__webglFramebuffer,T,ie,n.COLOR_ATTACHMENT0+B,le,0),h(ie)&&S(le)}t.unbindTexture()}else{let B=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(B=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(B,O.__webglTexture),ke(B,x),x.mipmaps&&x.mipmaps.length>0)for(let V=0;V<x.mipmaps.length;V++)Ce(L.__webglFramebuffer[V],T,x,n.COLOR_ATTACHMENT0,B,V);else Ce(L.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,B,0);h(x)&&S(B),t.unbindTexture()}T.depthBuffer&&$e(T)}function ct(T){const x=T.textures;for(let L=0,O=x.length;L<O;L++){const z=x[L];if(h(z)){const J=w(T),G=i.get(z).__webglTexture;t.bindTexture(J,G),S(J),t.unbindTexture()}}}const dt=[],ft=[];function gt(T){if(T.samples>0){if(q(T)===!1){const x=T.textures,L=T.width,O=T.height;let z=n.COLOR_BUFFER_BIT;const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=i.get(T),B=x.length>1;if(B)for(let ie=0;ie<x.length;ie++)t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);const V=T.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let ie=0;ie<x.length;ie++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(z|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(z|=n.STENCIL_BUFFER_BIT)),B){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,G.__webglColorRenderbuffer[ie]);const ue=i.get(x[ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,L,O,0,0,L,O,z,n.NEAREST),d===!0&&(dt.length=0,ft.length=0,dt.push(n.COLOR_ATTACHMENT0+ie),T.depthBuffer&&T.resolveDepthBuffer===!1&&(dt.push(J),ft.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ft)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),B)for(let ie=0;ie<x.length;ie++){t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,G.__webglColorRenderbuffer[ie]);const ue=i.get(x[ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&d){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function rt(T){return Math.min(s.maxSamples,T.samples)}function q(T){const x=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(T){const x=a.render.frame;m.get(T)!==x&&(m.set(T,x),T.update())}function ae(T,x){const L=T.colorSpace,O=T.format,z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||L!==Ys&&L!==In&&(Ye.getTransfer(L)===tt?(O!==Kt||z!==Vt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",L)),x}function oe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=$,this.getTextureUnits=D,this.setTextureUnits=I,this.setTexture2D=K,this.setTexture2DArray=re,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=He,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=$e,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fx(n,e){function t(i,s=In){let r;const a=Ye.getTransfer(s);if(i===Vt)return n.UNSIGNED_BYTE;if(i===ro)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ao)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gl)return n.BYTE;if(i===Hl)return n.SHORT;if(i===Ji)return n.UNSIGNED_SHORT;if(i===so)return n.INT;if(i===dn)return n.UNSIGNED_INT;if(i===an)return n.FLOAT;if(i===Sn)return n.HALF_FLOAT;if(i===jl)return n.ALPHA;if(i===Xl)return n.RGB;if(i===Kt)return n.RGBA;if(i===bn)return n.DEPTH_COMPONENT;if(i===Jn)return n.DEPTH_STENCIL;if(i===ql)return n.RED;if(i===oo)return n.RED_INTEGER;if(i===ii)return n.RG;if(i===co)return n.RG_INTEGER;if(i===lo)return n.RGBA_INTEGER;if(i===Fs||i===Os||i===Bs||i===zs)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Fs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Fs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Os)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Bs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_a||i===va||i===Ma||i===ya)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ya)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Sa||i===ba||i===Ea||i===wa||i===Ta||i===qs||i===Aa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Sa||i===ba)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ea)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===wa)return r.COMPRESSED_R11_EAC;if(i===Ta)return r.COMPRESSED_SIGNED_R11_EAC;if(i===qs)return r.COMPRESSED_RG11_EAC;if(i===Aa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ra||i===Ca||i===Na||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Fa||i===Oa||i===Ba||i===za||i===ka||i===Ga)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ra)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ca)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Na)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===La)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Da)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ia)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ua)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oa)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ba)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===za)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ka)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ga)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ha||i===Va||i===Wa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ha)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ja||i===Xa||i===$s||i===qa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ja)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$s)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const px=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mx=`
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

}`;class gx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new sd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new un({vertexShader:px,fragmentShader:mx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Fi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xx extends ri{constructor(e,t){super();const i=this;let s=null,r=1,a=null,c="local-floor",d=1,l=null,m=null,p=null,u=null,g=null,M=null;const _=typeof XRWebGLBinding<"u",f=new gx,h={},S=t.getContextAttributes();let w=null,E=null;const b=[],y=[],R=new Ke;let v=null;const C=new Bt;C.viewport=new ut;const U=new Bt;U.viewport=new ut;const P=[C,U],F=new Af;let $=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let se=b[j];return se===void 0&&(se=new Tr,b[j]=se),se.getTargetRaySpace()},this.getControllerGrip=function(j){let se=b[j];return se===void 0&&(se=new Tr,b[j]=se),se.getGripSpace()},this.getHand=function(j){let se=b[j];return se===void 0&&(se=new Tr,b[j]=se),se.getHandSpace()};function I(j){const se=y.indexOf(j.inputSource);if(se===-1)return;const Y=b[se];Y!==void 0&&(Y.update(j.inputSource,j.frame,l||a),Y.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",k);for(let j=0;j<b.length;j++){const se=y[j];se!==null&&(y[j]=null,b[j].disconnect(se))}$=null,D=null,f.reset();for(const j in h)delete h[j];e.setRenderTarget(w),g=null,u=null,p=null,s=null,E=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){c=j,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",H),s.addEventListener("inputsourceschange",k),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Y=null,Me=null,Pe=null;S.depth&&(Pe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=S.stencil?Jn:bn,Me=S.stencil?Qi:dn);const Ce={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(Ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new ln(u.textureWidth,u.textureHeight,{format:Kt,type:Vt,depthTexture:new Li(u.textureWidth,u.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const Y={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),E=new ln(g.framebufferWidth,g.framebufferHeight,{format:Kt,type:Vt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(d),l=null,a=await s.requestReferenceSpace(c),ke.setContext(s),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function k(j){for(let se=0;se<j.removed.length;se++){const Y=j.removed[se],Me=y.indexOf(Y);Me>=0&&(y[Me]=null,b[Me].disconnect(Y))}for(let se=0;se<j.added.length;se++){const Y=j.added[se];let Me=y.indexOf(Y);if(Me===-1){for(let Ce=0;Ce<b.length;Ce++)if(Ce>=y.length){y.push(Y),Me=Ce;break}else if(y[Ce]===null){y[Ce]=Y,Me=Ce;break}if(Me===-1)break}const Pe=b[Me];Pe&&Pe.connect(Y)}}const K=new Q,re=new Q;function fe(j,se,Y){K.setFromMatrixPosition(se.matrixWorld),re.setFromMatrixPosition(Y.matrixWorld);const Me=K.distanceTo(re),Pe=se.projectionMatrix.elements,Ce=Y.projectionMatrix.elements,et=Pe[14]/(Pe[10]-1),Be=Pe[14]/(Pe[10]+1),$e=(Pe[9]+1)/Pe[5],He=(Pe[9]-1)/Pe[5],ze=(Pe[8]-1)/Pe[0],ct=(Ce[8]+1)/Ce[0],dt=et*ze,ft=et*ct,gt=Me/(-ze+ct),rt=gt*-ze;if(se.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(rt),j.translateZ(gt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Pe[10]===-1)j.projectionMatrix.copy(se.projectionMatrix),j.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const q=et+gt,N=Be+gt,ae=dt-rt,oe=ft+(Me-rt),T=$e*Be/N*q,x=He*Be/N*q;j.projectionMatrix.makePerspective(ae,oe,T,x,q,N),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function pe(j,se){se===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(se.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let se=j.near,Y=j.far;f.texture!==null&&(f.depthNear>0&&(se=f.depthNear),f.depthFar>0&&(Y=f.depthFar)),F.near=U.near=C.near=se,F.far=U.far=C.far=Y,($!==F.near||D!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),$=F.near,D=F.far),F.layers.mask=j.layers.mask|6,C.layers.mask=F.layers.mask&-5,U.layers.mask=F.layers.mask&-3;const Me=j.parent,Pe=F.cameras;pe(F,Me);for(let Ce=0;Ce<Pe.length;Ce++)pe(Pe[Ce],Me);Pe.length===2?fe(F,C,U):F.projectionMatrix.copy(C.projectionMatrix),Ee(j,F,Me)};function Ee(j,se,Y){Y===null?j.matrix.copy(se.matrixWorld):(j.matrix.copy(Y.matrixWorld),j.matrix.invert(),j.matrix.multiply(se.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(se.projectionMatrix),j.projectionMatrixInverse.copy(se.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ya*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&g===null))return d},this.setFoveation=function(j){d=j,u!==null&&(u.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(F)},this.getCameraTexture=function(j){return h[j]};let We=null;function we(j,se){if(m=se.getViewerPose(l||a),M=se,m!==null){const Y=m.views;g!==null&&(e.setRenderTargetFramebuffer(E,g.framebuffer),e.setRenderTarget(E));let Me=!1;Y.length!==F.cameras.length&&(F.cameras.length=0,Me=!0);for(let Be=0;Be<Y.length;Be++){const $e=Y[Be];let He=null;if(g!==null)He=g.getViewport($e);else{const ct=p.getViewSubImage(u,$e);He=ct.viewport,Be===0&&(e.setRenderTargetTextures(E,ct.colorTexture,ct.depthStencilTexture),e.setRenderTarget(E))}let ze=P[Be];ze===void 0&&(ze=new Bt,ze.layers.enable(Be),ze.viewport=new ut,P[Be]=ze),ze.matrix.fromArray($e.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray($e.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(He.x,He.y,He.width,He.height),Be===0&&(F.matrix.copy(ze.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Me===!0&&F.cameras.push(ze)}const Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){p=i.getBinding();const Be=p.getDepthInformation(Y[0]);Be&&Be.isValid&&Be.texture&&f.init(Be,s.renderState)}if(Pe&&Pe.includes("camera-access")&&_){e.state.unbindTexture(),p=i.getBinding();for(let Be=0;Be<Y.length;Be++){const $e=Y[Be].camera;if($e){let He=h[$e];He||(He=new sd,h[$e]=He);const ze=p.getCameraImage($e);He.sourceTexture=ze}}}}for(let Y=0;Y<b.length;Y++){const Me=y[Y],Pe=b[Y];Me!==null&&Pe!==void 0&&Pe.update(Me,se,l||a)}We&&We(j,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),M=null}const ke=new dd;ke.setAnimationLoop(we),this.setAnimationLoop=function(j){We=j},this.dispose=function(){}}}const _x=new ht,xd=new Oe;xd.set(-1,0,0,0,1,0,0,0,1);function vx(n,e){function t(f,h){f.matrixAutoUpdate===!0&&f.updateMatrix(),h.value.copy(f.matrix)}function i(f,h){h.color.getRGB(f.fogColor.value,rd(n)),h.isFog?(f.fogNear.value=h.near,f.fogFar.value=h.far):h.isFogExp2&&(f.fogDensity.value=h.density)}function s(f,h,S,w,E){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(f,h):h.isMeshLambertMaterial?(r(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(f,h),p(f,h)):h.isMeshPhongMaterial?(r(f,h),m(f,h),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(f,h),u(f,h),h.isMeshPhysicalMaterial&&g(f,h,E)):h.isMeshMatcapMaterial?(r(f,h),M(f,h)):h.isMeshDepthMaterial?r(f,h):h.isMeshDistanceMaterial?(r(f,h),_(f,h)):h.isMeshNormalMaterial?r(f,h):h.isLineBasicMaterial?(a(f,h),h.isLineDashedMaterial&&c(f,h)):h.isPointsMaterial?d(f,h,S,w):h.isSpriteMaterial?l(f,h):h.isShadowMaterial?(f.color.value.copy(h.color),f.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(f,h){f.opacity.value=h.opacity,h.color&&f.diffuse.value.copy(h.color),h.emissive&&f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(f.map.value=h.map,t(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.bumpMap&&(f.bumpMap.value=h.bumpMap,t(h.bumpMap,f.bumpMapTransform),f.bumpScale.value=h.bumpScale,h.side===zt&&(f.bumpScale.value*=-1)),h.normalMap&&(f.normalMap.value=h.normalMap,t(h.normalMap,f.normalMapTransform),f.normalScale.value.copy(h.normalScale),h.side===zt&&f.normalScale.value.negate()),h.displacementMap&&(f.displacementMap.value=h.displacementMap,t(h.displacementMap,f.displacementMapTransform),f.displacementScale.value=h.displacementScale,f.displacementBias.value=h.displacementBias),h.emissiveMap&&(f.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,f.emissiveMapTransform)),h.specularMap&&(f.specularMap.value=h.specularMap,t(h.specularMap,f.specularMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest);const S=e.get(h),w=S.envMap,E=S.envMapRotation;w&&(f.envMap.value=w,f.envMapRotation.value.setFromMatrix4(_x.makeRotationFromEuler(E)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(xd),f.reflectivity.value=h.reflectivity,f.ior.value=h.ior,f.refractionRatio.value=h.refractionRatio),h.lightMap&&(f.lightMap.value=h.lightMap,f.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,f.lightMapTransform)),h.aoMap&&(f.aoMap.value=h.aoMap,f.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,f.aoMapTransform))}function a(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,h.map&&(f.map.value=h.map,t(h.map,f.mapTransform))}function c(f,h){f.dashSize.value=h.dashSize,f.totalSize.value=h.dashSize+h.gapSize,f.scale.value=h.scale}function d(f,h,S,w){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.size.value=h.size*S,f.scale.value=w*.5,h.map&&(f.map.value=h.map,t(h.map,f.uvTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function l(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.rotation.value=h.rotation,h.map&&(f.map.value=h.map,t(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,t(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function m(f,h){f.specular.value.copy(h.specular),f.shininess.value=Math.max(h.shininess,1e-4)}function p(f,h){h.gradientMap&&(f.gradientMap.value=h.gradientMap)}function u(f,h){f.metalness.value=h.metalness,h.metalnessMap&&(f.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,f.metalnessMapTransform)),f.roughness.value=h.roughness,h.roughnessMap&&(f.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,f.roughnessMapTransform)),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)}function g(f,h,S){f.ior.value=h.ior,h.sheen>0&&(f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),f.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(f.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,f.sheenColorMapTransform)),h.sheenRoughnessMap&&(f.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,f.sheenRoughnessMapTransform))),h.clearcoat>0&&(f.clearcoat.value=h.clearcoat,f.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(f.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,f.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(f.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===zt&&f.clearcoatNormalScale.value.negate())),h.dispersion>0&&(f.dispersion.value=h.dispersion),h.iridescence>0&&(f.iridescence.value=h.iridescence,f.iridescenceIOR.value=h.iridescenceIOR,f.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(f.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,f.iridescenceMapTransform)),h.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),h.transmission>0&&(f.transmission.value=h.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(f.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,f.transmissionMapTransform)),f.thickness.value=h.thickness,h.thicknessMap&&(f.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=h.attenuationDistance,f.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(f.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(f.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=h.specularIntensity,f.specularColor.value.copy(h.specularColor),h.specularColorMap&&(f.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,f.specularColorMapTransform)),h.specularIntensityMap&&(f.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,f.specularIntensityMapTransform))}function M(f,h){h.matcap&&(f.matcap.value=h.matcap)}function _(f,h){const S=e.get(h).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Mx(n,e,t,i){let s={},r={},a=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(E,b){const y=b.program;i.uniformBlockBinding(E,y)}function l(E,b){let y=s[E.id];y===void 0&&(f(E),y=m(E),s[E.id]=y,E.addEventListener("dispose",S));const R=b.program;i.updateUBOMapping(E,R);const v=e.render.frame;r[E.id]!==v&&(u(E),r[E.id]=v)}function m(E){const b=p();E.__bindingPointIndex=b;const y=n.createBuffer(),R=E.__size,v=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,y),y}function p(){for(let E=0;E<c;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const b=s[E.id],y=E.uniforms,R=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let v=0,C=y.length;v<C;v++){const U=y[v];if(Array.isArray(U))for(let P=0,F=U.length;P<F;P++)g(U[P],v,P,R);else g(U,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(E,b,y,R){if(_(E,b,y,R)===!0){const v=E.__offset,C=E.value;if(Array.isArray(C)){let U=0;for(let P=0;P<C.length;P++){const F=C[P],$=h(F);M(F,E.__data,U),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(U+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else M(C,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,E.__data)}}function M(E,b,y){typeof E=="number"||typeof E=="boolean"?b[0]=E:E.isMatrix3?(b[0]=E.elements[0],b[1]=E.elements[1],b[2]=E.elements[2],b[3]=0,b[4]=E.elements[3],b[5]=E.elements[4],b[6]=E.elements[5],b[7]=0,b[8]=E.elements[6],b[9]=E.elements[7],b[10]=E.elements[8],b[11]=0):ArrayBuffer.isView(E)?b.set(new E.constructor(E.buffer,E.byteOffset,b.length)):E.toArray(b,y)}function _(E,b,y,R){const v=E.value,C=b+"_"+y;if(R[C]===void 0)return typeof v=="number"||typeof v=="boolean"?R[C]=v:ArrayBuffer.isView(v)?R[C]=v.slice():R[C]=v.clone(),!0;{const U=R[C];if(typeof v=="number"||typeof v=="boolean"){if(U!==v)return R[C]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(U.equals(v)===!1)return U.copy(v),!0}}return!1}function f(E){const b=E.uniforms;let y=0;const R=16;for(let C=0,U=b.length;C<U;C++){const P=Array.isArray(b[C])?b[C]:[b[C]];for(let F=0,$=P.length;F<$;F++){const D=P[F],I=Array.isArray(D.value)?D.value:[D.value];for(let H=0,k=I.length;H<k;H++){const K=I[H],re=h(K),fe=y%R,pe=fe%re.boundary,Ee=fe+pe;y+=pe,Ee!==0&&R-Ee<re.storage&&(y+=R-Ee),D.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=re.storage}}}const v=y%R;return v>0&&(y+=R-v),E.__size=y,E.__cache={},this}function h(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(b.boundary=16,b.storage=E.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",E),b}function S(E){const b=E.target;b.removeEventListener("dispose",S);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function w(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:d,update:l,dispose:w}}const yx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let sn=null;function Sx(){return sn===null&&(sn=new hf(yx,16,16,ii,Sn),sn.name="DFG_LUT",sn.minFilter=Nt,sn.magFilter=Nt,sn.wrapS=_n,sn.wrapT=_n,sn.generateMipmaps=!1,sn.needsUpdate=!0),sn}class _d{constructor(e={}){const{canvas:t=Vh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:l=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:g=Vt}=e;this.isWebGLRenderer=!0;let M;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=i.getContextAttributes().alpha}else M=a;const _=g,f=new Set([lo,co,oo]),h=new Set([Vt,dn,Ji,Qi,ro,ao]),S=new Uint32Array(4),w=new Int32Array(4),E=new Q;let b=null,y=null;const R=[],v=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let P=!1,F=null,$=null,D=null,I=null;this._outputColorSpace=Xt;let H=0,k=0,K=null,re=-1,fe=null;const pe=new ut,Ee=new ut;let We=null;const we=new qe(0);let ke=0,j=t.width,se=t.height,Y=1,Me=null,Pe=null;const Ce=new ut(0,0,j,se),et=new ut(0,0,j,se);let Be=!1;const $e=new po;let He=!1,ze=!1;const ct=new ht,dt=new Q,ft=new ut,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function q(){return K===null?Y:1}let N=i;function ae(A,X){return t.getContext(A,X)}try{const A={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:d,preserveDrawingBuffer:l,powerPreference:m,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${io}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),N===null){const X="webgl2";if(N=ae(X,A),N===null)throw ae(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw Qe("WebGLRenderer: "+A.message),A}let oe,T,x,L,O,z,J,G,B,V,ie,ue,le,ce,xe,ye,De,W,ge,de,me,be,he;function Le(){oe=new Sg(N),oe.init(),me=new fx(N,oe),T=new pg(N,oe,e,me),x=new ux(N,oe),T.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),$=N.createFramebuffer(),D=N.createFramebuffer(),I=N.createFramebuffer(),L=new wg(N),O=new K0,z=new hx(N,oe,x,O,T,me,L),J=new yg(U),G=new Cf(N),be=new hg(N,G),B=new bg(N,G,L,be),V=new Ag(N,B,G,be,L),W=new Tg(N,T,z),xe=new mg(O),ie=new Z0(U,J,oe,T,be,xe),ue=new vx(U,O),le=new Q0,ce=new rx(oe),De=new ug(U,J,x,V,M,d),ye=new dx(U,V,T),he=new Mx(N,L,T,x),ge=new fg(N,oe,L),de=new Eg(N,oe,L),L.programs=ie.programs,U.capabilities=T,U.extensions=oe,U.properties=O,U.renderLists=le,U.shadowMap=ye,U.state=x,U.info=L}Le(),_!==Vt&&(C=new Cg(_,t.width,t.height,c,s,r));const Re=new xx(U,N);this.xr=Re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=oe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=oe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(A){A!==void 0&&(Y=A,this.setSize(j,se,!1))},this.getSize=function(A){return A.set(j,se)},this.setSize=function(A,X,ne=!0){if(Re.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}j=A,se=X,t.width=Math.floor(A*Y),t.height=Math.floor(X*Y),ne===!0&&(t.style.width=A+"px",t.style.height=X+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(j*Y,se*Y).floor()},this.setDrawingBufferSize=function(A,X,ne){j=A,se=X,Y=ne,t.width=Math.floor(A*ne),t.height=Math.floor(X*ne),this.setViewport(0,0,A,X)},this.setEffects=function(A){if(_===Vt){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let X=0;X<A.length;X++)if(A[X].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(pe)},this.getViewport=function(A){return A.copy(Ce)},this.setViewport=function(A,X,ne,ee){A.isVector4?Ce.set(A.x,A.y,A.z,A.w):Ce.set(A,X,ne,ee),x.viewport(pe.copy(Ce).multiplyScalar(Y).round())},this.getScissor=function(A){return A.copy(et)},this.setScissor=function(A,X,ne,ee){A.isVector4?et.set(A.x,A.y,A.z,A.w):et.set(A,X,ne,ee),x.scissor(Ee.copy(et).multiplyScalar(Y).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(A){x.setScissorTest(Be=A)},this.setOpaqueSort=function(A){Me=A},this.setTransparentSort=function(A){Pe=A},this.getClearColor=function(A){return A.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(A=!0,X=!0,ne=!0){let ee=0;if(A){let te=!1;if(K!==null){const Se=K.texture.format;te=f.has(Se)}if(te){const Se=K.texture.type,Ae=h.has(Se),ve=De.getClearColor(),Ne=De.getClearAlpha(),Ie=ve.r,Ge=ve.g,je=ve.b;Ae?(S[0]=Ie,S[1]=Ge,S[2]=je,S[3]=Ne,N.clearBufferuiv(N.COLOR,0,S)):(w[0]=Ie,w[1]=Ge,w[2]=je,w[3]=Ne,N.clearBufferiv(N.COLOR,0,w))}else ee|=N.COLOR_BUFFER_BIT}X&&(ee|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(ee|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&N.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),F=A},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),De.dispose(),le.dispose(),ce.dispose(),O.dispose(),J.dispose(),V.dispose(),be.dispose(),he.dispose(),ie.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Eo),Re.removeEventListener("sessionend",wo),Hn.stop()};function pt(A){A.preventDefault(),ac("WebGLRenderer: Context Lost."),P=!0}function at(){ac("WebGLRenderer: Context Restored."),P=!1;const A=L.autoReset,X=ye.enabled,ne=ye.autoUpdate,ee=ye.needsUpdate,te=ye.type;Le(),L.autoReset=A,ye.enabled=X,ye.autoUpdate=ne,ye.needsUpdate=ee,ye.type=te}function Qt(A){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function en(A){const X=A.target;X.removeEventListener("dispose",en),bd(X)}function bd(A){Ed(A),O.remove(A)}function Ed(A){const X=O.get(A).programs;X!==void 0&&(X.forEach(function(ne){ie.releaseProgram(ne)}),A.isShaderMaterial&&ie.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,ne,ee,te,Se){X===null&&(X=gt);const Ae=te.isMesh&&te.matrixWorld.determinantAffine()<0,ve=Ad(A,X,ne,ee,te);x.setMaterial(ee,Ae);let Ne=ne.index,Ie=1;if(ee.wireframe===!0){if(Ne=B.getWireframeAttribute(ne),Ne===void 0)return;Ie=2}const Ge=ne.drawRange,je=ne.attributes.position;let Ue=Ge.start*Ie,nt=(Ge.start+Ge.count)*Ie;Se!==null&&(Ue=Math.max(Ue,Se.start*Ie),nt=Math.min(nt,(Se.start+Se.count)*Ie)),Ne!==null?(Ue=Math.max(Ue,0),nt=Math.min(nt,Ne.count)):je!=null&&(Ue=Math.max(Ue,0),nt=Math.min(nt,je.count));const xt=nt-Ue;if(xt<0||xt===1/0)return;be.setup(te,ee,ve,ne,Ne);let mt,it=ge;if(Ne!==null&&(mt=G.get(Ne),it=de,it.setIndex(mt)),te.isMesh)ee.wireframe===!0?(x.setLineWidth(ee.wireframeLinewidth*q()),it.setMode(N.LINES)):it.setMode(N.TRIANGLES);else if(te.isLine){let At=ee.linewidth;At===void 0&&(At=1),x.setLineWidth(At*q()),te.isLineSegments?it.setMode(N.LINES):te.isLineLoop?it.setMode(N.LINE_LOOP):it.setMode(N.LINE_STRIP)}else te.isPoints?it.setMode(N.POINTS):te.isSprite&&it.setMode(N.TRIANGLES);if(te.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))it.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const At=te._multiDrawStarts,Te=te._multiDrawCounts,kt=te._multiDrawCount,Je=Ne?G.get(Ne).bytesPerElement:1,Wt=O.get(ee).currentProgram.getUniforms();for(let tn=0;tn<kt;tn++)Wt.setValue(N,"_gl_DrawID",tn),it.render(At[tn]/Je,Te[tn])}else if(te.isInstancedMesh)it.renderInstances(Ue,xt,te.count);else if(ne.isInstancedBufferGeometry){const At=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Te=Math.min(ne.instanceCount,At);it.renderInstances(Ue,xt,Te)}else it.render(Ue,xt)};function bo(A,X,ne){A.transparent===!0&&A.side===xn&&A.forceSinglePass===!1?(A.side=zt,A.needsUpdate=!0,rs(A,X,ne),A.side=zn,A.needsUpdate=!0,rs(A,X,ne),A.side=xn):rs(A,X,ne)}this.compile=function(A,X,ne=null){ne===null&&(ne=A),y=ce.get(ne),y.init(X),v.push(y),ne.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(y.pushLight(te),te.castShadow&&y.pushShadow(te))}),A!==ne&&A.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(y.pushLight(te),te.castShadow&&y.pushShadow(te))}),y.setupLights();const ee=new Set;return A.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const Se=te.material;if(Se)if(Array.isArray(Se))for(let Ae=0;Ae<Se.length;Ae++){const ve=Se[Ae];bo(ve,ne,te),ee.add(ve)}else bo(Se,ne,te),ee.add(Se)}),y=v.pop(),ee},this.compileAsync=function(A,X,ne=null){const ee=this.compile(A,X,ne);return new Promise(te=>{function Se(){if(ee.forEach(function(Ae){O.get(Ae).currentProgram.isReady()&&ee.delete(Ae)}),ee.size===0){te(A);return}setTimeout(Se,10)}oe.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let ur=null;function wd(A){ur&&ur(A)}function Eo(){Hn.stop()}function wo(){Hn.start()}const Hn=new dd;Hn.setAnimationLoop(wd),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(A){ur=A,Re.setAnimationLoop(A),A===null?Hn.stop():Hn.start()},Re.addEventListener("sessionstart",Eo),Re.addEventListener("sessionend",wo),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(A,X);const ne=Re.enabled===!0&&Re.isPresenting===!0,ee=C!==null&&(K===null||ne)&&C.begin(U,K);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(X),X=Re.getCamera()),A.isScene===!0&&A.onBeforeRender(U,A,X,K),y=ce.get(A,v.length),y.init(X),y.state.textureUnits=z.getTextureUnits(),v.push(y),ct.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),$e.setFromProjectionMatrix(ct,on,X.reversedDepth),ze=this.localClippingEnabled,He=xe.init(this.clippingPlanes,ze),b=le.get(A,R.length),b.init(),R.push(b),Re.enabled===!0&&Re.isPresenting===!0){const Ae=U.xr.getDepthSensingMesh();Ae!==null&&hr(Ae,X,-1/0,U.sortObjects)}hr(A,X,0,U.sortObjects),b.finish(),U.sortObjects===!0&&b.sort(Me,Pe,X.reversedDepth),rt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,rt&&De.addToRenderList(b,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),He===!0&&xe.beginShadows();const te=y.state.shadowsArray;if(ye.render(te,A,X),He===!0&&xe.endShadows(),(ee&&C.hasRenderPass())===!1){const Ae=b.opaque,ve=b.transmissive;if(y.setupLights(),X.isArrayCamera){const Ne=X.cameras;if(ve.length>0)for(let Ie=0,Ge=Ne.length;Ie<Ge;Ie++){const je=Ne[Ie];Ao(Ae,ve,A,je)}rt&&De.render(A);for(let Ie=0,Ge=Ne.length;Ie<Ge;Ie++){const je=Ne[Ie];To(b,A,je,je.viewport)}}else ve.length>0&&Ao(Ae,ve,A,X),rt&&De.render(A),To(b,A,X)}K!==null&&k===0&&(z.updateMultisampleRenderTarget(K),z.updateRenderTargetMipmap(K)),ee&&C.end(U),A.isScene===!0&&A.onAfterRender(U,A,X),be.resetDefaultState(),re=-1,fe=null,v.pop(),v.length>0?(y=v[v.length-1],z.setTextureUnits(y.state.textureUnits),He===!0&&xe.setGlobalState(U.clippingPlanes,y.state.camera)):y=null,R.pop(),R.length>0?b=R[R.length-1]:b=null,F!==null&&F.renderEnd()};function hr(A,X,ne,ee){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLightProbeGrid)y.pushLightProbeGrid(A);else if(A.isLight)y.pushLight(A),A.castShadow&&y.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||$e.intersectsSprite(A)){ee&&ft.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ct);const Ae=V.update(A),ve=A.material;ve.visible&&b.push(A,Ae,ve,ne,ft.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||$e.intersectsObject(A))){const Ae=V.update(A),ve=A.material;if(ee&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ft.copy(A.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ft.copy(Ae.boundingSphere.center)),ft.applyMatrix4(A.matrixWorld).applyMatrix4(ct)),Array.isArray(ve)){const Ne=Ae.groups;for(let Ie=0,Ge=Ne.length;Ie<Ge;Ie++){const je=Ne[Ie],Ue=ve[je.materialIndex];Ue&&Ue.visible&&b.push(A,Ae,Ue,ne,ft.z,je)}}else ve.visible&&b.push(A,Ae,ve,ne,ft.z,null)}}const Se=A.children;for(let Ae=0,ve=Se.length;Ae<ve;Ae++)hr(Se[Ae],X,ne,ee)}function To(A,X,ne,ee){const{opaque:te,transmissive:Se,transparent:Ae}=A;y.setupLightsView(ne),He===!0&&xe.setGlobalState(U.clippingPlanes,ne),ee&&x.viewport(pe.copy(ee)),te.length>0&&ss(te,X,ne),Se.length>0&&ss(Se,X,ne),Ae.length>0&&ss(Ae,X,ne),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Ao(A,X,ne,ee){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[ee.id]===void 0){const Ue=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[ee.id]=new ln(1,1,{generateMipmaps:!0,type:Ue?Sn:Vt,minFilter:Kn,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const Se=y.state.transmissionRenderTarget[ee.id],Ae=ee.viewport||pe;Se.setSize(Ae.z*U.transmissionResolutionScale,Ae.w*U.transmissionResolutionScale);const ve=U.getRenderTarget(),Ne=U.getActiveCubeFace(),Ie=U.getActiveMipmapLevel();U.setRenderTarget(Se),U.getClearColor(we),ke=U.getClearAlpha(),ke<1&&U.setClearColor(16777215,.5),U.clear(),rt&&De.render(ne);const Ge=U.toneMapping;U.toneMapping=cn;const je=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),y.setupLightsView(ee),He===!0&&xe.setGlobalState(U.clippingPlanes,ee),ss(A,ne,ee),z.updateMultisampleRenderTarget(Se),z.updateRenderTargetMipmap(Se),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let nt=0,xt=X.length;nt<xt;nt++){const mt=X[nt],{object:it,geometry:At,material:Te,group:kt}=mt;if(Te.side===xn&&it.layers.test(ee.layers)){const Je=Te.side;Te.side=zt,Te.needsUpdate=!0,Ro(it,ne,ee,At,Te,kt),Te.side=Je,Te.needsUpdate=!0,Ue=!0}}Ue===!0&&(z.updateMultisampleRenderTarget(Se),z.updateRenderTargetMipmap(Se))}U.setRenderTarget(ve,Ne,Ie),U.setClearColor(we,ke),je!==void 0&&(ee.viewport=je),U.toneMapping=Ge}function ss(A,X,ne){const ee=X.isScene===!0?X.overrideMaterial:null;for(let te=0,Se=A.length;te<Se;te++){const Ae=A[te],{object:ve,geometry:Ne,group:Ie}=Ae;let Ge=Ae.material;Ge.allowOverride===!0&&ee!==null&&(Ge=ee),ve.layers.test(ne.layers)&&Ro(ve,X,ne,Ne,Ge,Ie)}}function Ro(A,X,ne,ee,te,Se){A.onBeforeRender(U,X,ne,ee,te,Se),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),te.onBeforeRender(U,X,ne,ee,A,Se),te.transparent===!0&&te.side===xn&&te.forceSinglePass===!1?(te.side=zt,te.needsUpdate=!0,U.renderBufferDirect(ne,X,ee,te,A,Se),te.side=zn,te.needsUpdate=!0,U.renderBufferDirect(ne,X,ee,te,A,Se),te.side=xn):U.renderBufferDirect(ne,X,ee,te,A,Se),A.onAfterRender(U,X,ne,ee,te,Se)}function rs(A,X,ne){X.isScene!==!0&&(X=gt);const ee=O.get(A),te=y.state.lights,Se=y.state.shadowsArray,Ae=te.state.version,ve=ie.getParameters(A,te.state,Se,X,ne,y.state.lightProbeGridArray),Ne=ie.getProgramCacheKey(ve);let Ie=ee.programs;ee.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,ee.fog=X.fog;const Ge=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ee.envMap=J.get(A.envMap||ee.environment,Ge),ee.envMapRotation=ee.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Ie===void 0&&(A.addEventListener("dispose",en),Ie=new Map,ee.programs=Ie);let je=Ie.get(Ne);if(je!==void 0){if(ee.currentProgram===je&&ee.lightsStateVersion===Ae)return No(A,ve),je}else ve.uniforms=ie.getUniforms(A),F!==null&&A.isNodeMaterial&&F.build(A,ne,ve),A.onBeforeCompile(ve,U),je=ie.acquireProgram(ve,Ne),Ie.set(Ne,je),ee.uniforms=ve.uniforms;const Ue=ee.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ue.clippingPlanes=xe.uniform),No(A,ve),ee.needsLights=Cd(A),ee.lightsStateVersion=Ae,ee.needsLights&&(Ue.ambientLightColor.value=te.state.ambient,Ue.lightProbe.value=te.state.probe,Ue.directionalLights.value=te.state.directional,Ue.directionalLightShadows.value=te.state.directionalShadow,Ue.spotLights.value=te.state.spot,Ue.spotLightShadows.value=te.state.spotShadow,Ue.rectAreaLights.value=te.state.rectArea,Ue.ltc_1.value=te.state.rectAreaLTC1,Ue.ltc_2.value=te.state.rectAreaLTC2,Ue.pointLights.value=te.state.point,Ue.pointLightShadows.value=te.state.pointShadow,Ue.hemisphereLights.value=te.state.hemi,Ue.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Ue.spotLightMatrix.value=te.state.spotLightMatrix,Ue.spotLightMap.value=te.state.spotLightMap,Ue.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=y.state.lightProbeGridArray.length>0,ee.currentProgram=je,ee.uniformsList=null,je}function Co(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=ks.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function No(A,X){const ne=O.get(A);ne.outputColorSpace=X.outputColorSpace,ne.batching=X.batching,ne.batchingColor=X.batchingColor,ne.instancing=X.instancing,ne.instancingColor=X.instancingColor,ne.instancingMorph=X.instancingMorph,ne.skinning=X.skinning,ne.morphTargets=X.morphTargets,ne.morphNormals=X.morphNormals,ne.morphColors=X.morphColors,ne.morphTargetsCount=X.morphTargetsCount,ne.numClippingPlanes=X.numClippingPlanes,ne.numIntersection=X.numClipIntersection,ne.vertexAlphas=X.vertexAlphas,ne.vertexTangents=X.vertexTangents,ne.toneMapping=X.toneMapping}function Td(A,X){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;E.setFromMatrixPosition(X.matrixWorld);for(let ne=0,ee=A.length;ne<ee;ne++){const te=A[ne];if(te.texture!==null&&te.boundingBox.containsPoint(E))return te}return null}function Ad(A,X,ne,ee,te){X.isScene!==!0&&(X=gt),z.resetTextureUnits();const Se=X.fog,Ae=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?X.environment:null,ve=K===null?U.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ye.workingColorSpace,Ne=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Ie=J.get(ee.envMap||Ae,Ne),Ge=ee.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,je=!!ne.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Ue=!!ne.morphAttributes.position,nt=!!ne.morphAttributes.normal,xt=!!ne.morphAttributes.color;let mt=cn;ee.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(mt=U.toneMapping);const it=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,At=it!==void 0?it.length:0,Te=O.get(ee),kt=y.state.lights;if(He===!0&&(ze===!0||A!==fe)){const ot=A===fe&&ee.id===re;xe.setState(ee,A,ot)}let Je=!1;ee.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==kt.state.version||Te.outputColorSpace!==ve||te.isBatchedMesh&&Te.batching===!1||!te.isBatchedMesh&&Te.batching===!0||te.isBatchedMesh&&Te.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Te.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Te.instancing===!1||!te.isInstancedMesh&&Te.instancing===!0||te.isSkinnedMesh&&Te.skinning===!1||!te.isSkinnedMesh&&Te.skinning===!0||te.isInstancedMesh&&Te.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Te.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Te.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Te.instancingMorph===!1&&te.morphTexture!==null||Te.envMap!==Ie||ee.fog===!0&&Te.fog!==Se||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==xe.numPlanes||Te.numIntersection!==xe.numIntersection)||Te.vertexAlphas!==Ge||Te.vertexTangents!==je||Te.morphTargets!==Ue||Te.morphNormals!==nt||Te.morphColors!==xt||Te.toneMapping!==mt||Te.morphTargetsCount!==At||!!Te.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,Te.__version=ee.version);let Wt=Te.currentProgram;Je===!0&&(Wt=rs(ee,X,te),F&&ee.isNodeMaterial&&F.onUpdateProgram(ee,Wt,Te));let tn=!1,wn=!1,ai=!1;const st=Wt.getUniforms(),_t=Te.uniforms;if(x.useProgram(Wt.program)&&(tn=!0,wn=!0,ai=!0),ee.id!==re&&(re=ee.id,wn=!0),Te.needsLights){const ot=Td(y.state.lightProbeGridArray,te);Te.lightProbeGrid!==ot&&(Te.lightProbeGrid=ot,wn=!0)}if(tn||fe!==A){x.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),st.setValue(N,"projectionMatrix",A.projectionMatrix),st.setValue(N,"viewMatrix",A.matrixWorldInverse);const An=st.map.cameraPosition;An!==void 0&&An.setValue(N,dt.setFromMatrixPosition(A.matrixWorld)),T.logarithmicDepthBuffer&&st.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&st.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),fe!==A&&(fe=A,wn=!0,ai=!0)}if(Te.needsLights&&(kt.state.directionalShadowMap.length>0&&st.setValue(N,"directionalShadowMap",kt.state.directionalShadowMap,z),kt.state.spotShadowMap.length>0&&st.setValue(N,"spotShadowMap",kt.state.spotShadowMap,z),kt.state.pointShadowMap.length>0&&st.setValue(N,"pointShadowMap",kt.state.pointShadowMap,z)),te.isSkinnedMesh){st.setOptional(N,te,"bindMatrix"),st.setOptional(N,te,"bindMatrixInverse");const ot=te.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),st.setValue(N,"boneTexture",ot.boneTexture,z))}te.isBatchedMesh&&(st.setOptional(N,te,"batchingTexture"),st.setValue(N,"batchingTexture",te._matricesTexture,z),st.setOptional(N,te,"batchingIdTexture"),st.setValue(N,"batchingIdTexture",te._indirectTexture,z),st.setOptional(N,te,"batchingColorTexture"),te._colorsTexture!==null&&st.setValue(N,"batchingColorTexture",te._colorsTexture,z));const Tn=ne.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&W.update(te,ne,Wt),(wn||Te.receiveShadow!==te.receiveShadow)&&(Te.receiveShadow=te.receiveShadow,st.setValue(N,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&X.environment!==null&&(_t.envMapIntensity.value=X.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=Sx()),wn){if(st.setValue(N,"toneMappingExposure",U.toneMappingExposure),Te.needsLights&&Rd(_t,ai),Se&&ee.fog===!0&&ue.refreshFogUniforms(_t,Se),ue.refreshMaterialUniforms(_t,ee,Y,se,y.state.transmissionRenderTarget[A.id]),Te.needsLights&&Te.lightProbeGrid){const ot=Te.lightProbeGrid;_t.probesSH.value=ot.texture,_t.probesMin.value.copy(ot.boundingBox.min),_t.probesMax.value.copy(ot.boundingBox.max),_t.probesResolution.value.copy(ot.resolution)}ks.upload(N,Co(Te),_t,z)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(ks.upload(N,Co(Te),_t,z),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&st.setValue(N,"center",te.center),st.setValue(N,"modelViewMatrix",te.modelViewMatrix),st.setValue(N,"normalMatrix",te.normalMatrix),st.setValue(N,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const ot=ee.uniformsGroups;for(let An=0,oi=ot.length;An<oi;An++){const Po=ot[An];he.update(Po,Wt),he.bind(Po,Wt)}}return Wt}function Rd(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Cd(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(A,X,ne){const ee=O.get(A);ee.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),O.get(A.texture).__webglTexture=X,O.get(A.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ne,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,X){const ne=O.get(A);ne.__webglFramebuffer=X,ne.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,ne=0){K=A,H=X,k=ne;let ee=null,te=!1,Se=!1;if(A){const ve=O.get(A);if(ve.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,ve.__webglFramebuffer),pe.copy(A.viewport),Ee.copy(A.scissor),We=A.scissorTest,x.viewport(pe),x.scissor(Ee),x.setScissorTest(We),re=-1;return}else if(ve.__webglFramebuffer===void 0)z.setupRenderTarget(A);else if(ve.__hasExternalTextures)z.rebindTextures(A,O.get(A.texture).__webglTexture,O.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ge=A.depthTexture;if(ve.__boundDepthTexture!==Ge){if(Ge!==null&&O.has(Ge)&&(A.width!==Ge.image.width||A.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(A)}}const Ne=A.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Se=!0);const Ie=O.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ie[X])?ee=Ie[X][ne]:ee=Ie[X],te=!0):A.samples>0&&z.useMultisampledRTT(A)===!1?ee=O.get(A).__webglMultisampledFramebuffer:Array.isArray(Ie)?ee=Ie[ne]:ee=Ie,pe.copy(A.viewport),Ee.copy(A.scissor),We=A.scissorTest}else pe.copy(Ce).multiplyScalar(Y).floor(),Ee.copy(et).multiplyScalar(Y).floor(),We=Be;if(ne!==0&&(ee=$),x.bindFramebuffer(N.FRAMEBUFFER,ee)&&x.drawBuffers(A,ee),x.viewport(pe),x.scissor(Ee),x.setScissorTest(We),te){const ve=O.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+X,ve.__webglTexture,ne)}else if(Se){const ve=X;for(let Ne=0;Ne<A.textures.length;Ne++){const Ie=O.get(A.textures[Ne]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ne,Ie.__webglTexture,ne,ve)}}else if(A!==null&&ne!==0){const ve=O.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ve.__webglTexture,ne)}re=-1},this.readRenderTargetPixels=function(A,X,ne,ee,te,Se,Ae,ve=0){if(!(A&&A.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=O.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne){x.bindFramebuffer(N.FRAMEBUFFER,Ne);try{const Ie=A.textures[ve],Ge=Ie.format,je=Ie.type;if(A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ve),!T.textureFormatReadable(Ge)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(je)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-ee&&ne>=0&&ne<=A.height-te&&N.readPixels(X,ne,ee,te,me.convert(Ge),me.convert(je),Se)}finally{const Ie=K!==null?O.get(K).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,X,ne,ee,te,Se,Ae,ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=O.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne)if(X>=0&&X<=A.width-ee&&ne>=0&&ne<=A.height-te){x.bindFramebuffer(N.FRAMEBUFFER,Ne);const Ie=A.textures[ve],Ge=Ie.format,je=Ie.type;if(A.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ve),!T.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ue),N.bufferData(N.PIXEL_PACK_BUFFER,Se.byteLength,N.STREAM_READ),N.readPixels(X,ne,ee,te,me.convert(Ge),me.convert(je),0);const nt=K!==null?O.get(K).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,nt);const xt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Wh(N,xt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ue),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Se),N.deleteBuffer(Ue),N.deleteSync(xt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,X=null,ne=0){const ee=Math.pow(2,-ne),te=Math.floor(A.image.width*ee),Se=Math.floor(A.image.height*ee),Ae=X!==null?X.x:0,ve=X!==null?X.y:0;z.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,ne,0,0,Ae,ve,te,Se),x.unbindTexture()},this.copyTextureToTexture=function(A,X,ne=null,ee=null,te=0,Se=0){let Ae,ve,Ne,Ie,Ge,je,Ue,nt,xt;const mt=A.isCompressedTexture?A.mipmaps[Se]:A.image;if(ne!==null)Ae=ne.max.x-ne.min.x,ve=ne.max.y-ne.min.y,Ne=ne.isBox3?ne.max.z-ne.min.z:1,Ie=ne.min.x,Ge=ne.min.y,je=ne.isBox3?ne.min.z:0;else{const _t=Math.pow(2,-te);Ae=Math.floor(mt.width*_t),ve=Math.floor(mt.height*_t),A.isDataArrayTexture?Ne=mt.depth:A.isData3DTexture?Ne=Math.floor(mt.depth*_t):Ne=1,Ie=0,Ge=0,je=0}ee!==null?(Ue=ee.x,nt=ee.y,xt=ee.z):(Ue=0,nt=0,xt=0);const it=me.convert(X.format),At=me.convert(X.type);let Te;X.isData3DTexture?(z.setTexture3D(X,0),Te=N.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(z.setTexture2DArray(X,0),Te=N.TEXTURE_2D_ARRAY):(z.setTexture2D(X,0),Te=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,X.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,X.unpackAlignment);const kt=x.getParameter(N.UNPACK_ROW_LENGTH),Je=x.getParameter(N.UNPACK_IMAGE_HEIGHT),Wt=x.getParameter(N.UNPACK_SKIP_PIXELS),tn=x.getParameter(N.UNPACK_SKIP_ROWS),wn=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,mt.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mt.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Ie),x.pixelStorei(N.UNPACK_SKIP_ROWS,Ge),x.pixelStorei(N.UNPACK_SKIP_IMAGES,je);const ai=A.isDataArrayTexture||A.isData3DTexture,st=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const _t=O.get(A),Tn=O.get(X),ot=O.get(_t.__renderTarget),An=O.get(Tn.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,ot.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,An.__webglFramebuffer);for(let oi=0;oi<Ne;oi++)ai&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,O.get(A).__webglTexture,te,je+oi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,O.get(X).__webglTexture,Se,xt+oi)),N.blitFramebuffer(Ie,Ge,Ae,ve,Ue,nt,Ae,ve,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(te!==0||A.isRenderTargetTexture||O.has(A)){const _t=O.get(A),Tn=O.get(X);x.bindFramebuffer(N.READ_FRAMEBUFFER,D),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,I);for(let ot=0;ot<Ne;ot++)ai?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_t.__webglTexture,te,je+ot):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_t.__webglTexture,te),st?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tn.__webglTexture,Se,xt+ot):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Tn.__webglTexture,Se),te!==0?N.blitFramebuffer(Ie,Ge,Ae,ve,Ue,nt,Ae,ve,N.COLOR_BUFFER_BIT,N.NEAREST):st?N.copyTexSubImage3D(Te,Se,Ue,nt,xt+ot,Ie,Ge,Ae,ve):N.copyTexSubImage2D(Te,Se,Ue,nt,Ie,Ge,Ae,ve);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else st?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(Te,Se,Ue,nt,xt,Ae,ve,Ne,it,At,mt.data):X.isCompressedArrayTexture?N.compressedTexSubImage3D(Te,Se,Ue,nt,xt,Ae,ve,Ne,it,mt.data):N.texSubImage3D(Te,Se,Ue,nt,xt,Ae,ve,Ne,it,At,mt):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Se,Ue,nt,Ae,ve,it,At,mt.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Se,Ue,nt,mt.width,mt.height,it,mt.data):N.texSubImage2D(N.TEXTURE_2D,Se,Ue,nt,Ae,ve,it,At,mt);x.pixelStorei(N.UNPACK_ROW_LENGTH,kt),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Je),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Wt),x.pixelStorei(N.UNPACK_SKIP_ROWS,tn),x.pixelStorei(N.UNPACK_SKIP_IMAGES,wn),Se===0&&X.generateMipmaps&&N.generateMipmap(Te),x.unbindTexture()},this.initRenderTarget=function(A){O.get(A).__webglFramebuffer===void 0&&z.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?z.setTextureCube(A,0):A.isData3DTexture?z.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?z.setTexture2DArray(A,0):z.setTexture2D(A,0),x.unbindTexture()},this.resetState=function(){H=0,k=0,K=null,x.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Ps=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],vd=620,bx=560,Ex=300,wx=2800,Qc=850,el=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],tl=210,Zr=300,nl=.42,il=740,Ls=n=>-(n+1)*vd,Tx=n=>n===1?1:1-Math.pow(2,-10*n),Kr=n=>new Promise(e=>setTimeout(e,n)),sl=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function rl(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${sl[t%sl.length]}`)}function Ax({onDone:n}){const e=Z.useRef(null),t=Z.useRef(null),i=Z.useRef(null),s=Z.useRef(null),r=Z.useRef(null),a=Z.useRef(null),c=Z.useRef(null),d=Z.useRef(null),l=Z.useRef(null),m=Z.useRef(null),p=Z.useRef(n);p.current=n,to();const u=Z.useMemo(()=>rl(16),[]),g=Z.useMemo(()=>rl(16),[]);return Z.useEffect(()=>{let M=!1,_=!1;const f=()=>{_||(_=!0,p.current())};let h=null;function S(){if(!h)try{const q=window.AudioContext??window.webkitAudioContext;h=new q}catch{}return h}function w(){const q=S();if(!q)return;q.state==="suspended"&&q.resume();const N=q.currentTime,ae=q.createOscillator();ae.type="sine",ae.frequency.setValueAtTime(130,N),ae.frequency.exponentialRampToValueAtTime(42,N+.16);const oe=q.createGain();oe.gain.setValueAtTime(1,N),oe.gain.exponentialRampToValueAtTime(.001,N+.38),ae.connect(oe).connect(q.destination),ae.start(N),ae.stop(N+.42);const T=Math.floor(q.sampleRate*.14),x=q.createBuffer(1,T,q.sampleRate),L=x.getChannelData(0);for(let G=0;G<T;G++)L[G]=(Math.random()*2-1)*Math.pow(1-G/T,2.2);const O=q.createBufferSource();O.buffer=x;const z=q.createBiquadFilter();z.type="lowpass",z.frequency.value=850;const J=q.createGain();J.gain.setValueAtTime(.55,N),J.gain.exponentialRampToValueAtTime(.001,N+.13),O.connect(z).connect(J).connect(q.destination),O.start(N)}function E(){const q=i.current;q&&(q.currentTime=0,q.play().catch(()=>{}))}const b=t.current,y=(b==null?void 0:b.getContext("2d"))??null;let R=[],v=0;function C(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}C();function U(q,N){R=[];let ae=0;const oe=6;function T(L,O,z,J,G,B){const V=3+Math.floor(Math.random()*3),ie=[[L,O]];let ue=z,le=L,ce=O;for(let xe=0;xe<V;xe++){ue+=(Math.random()-.5)*.6;const ye=J/V;if(le+=Math.cos(ue)*ye,ce+=Math.sin(ue)*ye,ie.push([le,ce]),G>0&&Math.random()<.5){const De=ue+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);T(le,ce,De,J*(.35+Math.random()*.3),G-1,B*.78)}}R.push({pts:ie,color:el[ae++%el.length],width:B})}const x=[N*(.06+Math.random()*.1),N*(.84+Math.random()*.1)];for(let L=0;L<oe;L++){const O=q*(.15+Math.random()*.7),z=L<x.length?x[L]:N*(.1+Math.random()*.8),J=9+Math.floor(Math.random()*6);for(let G=0;G<J;G++){const B=G/J*Math.PI*2+(Math.random()-.5)*.4,V=Math.max(q,N)*(.18+Math.random()*.38);T(O,z,B,V,2,.9)}}}function P(q){if(!y||q<=0)return;const N=Math.min(1,q/2.4),ae=Math.round(R.length*N);for(let oe=0;oe<ae;oe++){const T=R[oe];y.lineWidth=T.width*(.9+q*.1),y.strokeStyle=T.color,y.globalAlpha=.75+q*.1,y.shadowColor=T.color,y.shadowBlur=5+q*2.2,y.beginPath(),T.pts.forEach(([x,L],O)=>O===0?y.moveTo(x,L):y.lineTo(x,L)),y.stroke()}y.globalAlpha=1,y.shadowBlur=0}function F(q,N,ae){y&&(y.clearRect(0,0,N,ae),P(q))}function $(){const q=l.current;q&&(q.classList.remove("intro-hit"),q.offsetWidth,q.classList.add("intro-hit"))}function D(){var N,ae,oe,T;const q=(N=r.current)==null?void 0:N.firstElementChild;q&&(q.classList.remove("intro-rgbslam"),q.offsetWidth,q.classList.add("intro-rgbslam")),(ae=r.current)==null||ae.classList.remove("intro-jitter"),(oe=r.current)==null||oe.offsetWidth,(T=r.current)==null||T.classList.add("intro-jitter"),$(),He()}async function I(){for(let q=5;q>=1&&!M;q--){const N=r.current;if(!N)return;N.innerHTML="";const ae=document.createElement("div");ae.className="intro-glyph",ae.setAttribute("data-t",String(q)),ae.textContent=String(q),N.appendChild(ae),D(),w(),await ae.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Qc*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Kr(Qc*.3)}}let H=null,k=null,K=null,re=0,fe=!1,pe=-1;const We=document.createElement("canvas").getContext("2d");We.font=`700 ${tl}px "Rajdhani", sans-serif`;const we=[],ke=[];function j(q,N){const ae=Math.ceil(We.measureText(q).width),oe=Math.max(200,ae+120),T=document.createElement("canvas");T.width=oe,T.height=Zr;const x=T.getContext("2d");x.font=`700 ${tl}px "Rajdhani", sans-serif`,x.textAlign="center",x.textBaseline="middle",x.shadowColor=N,x.shadowBlur=56,x.fillStyle="#d24e01",x.fillText(q,oe/2,Zr/2);const L=new id(T);L.anisotropy=4;let O=oe*nl,z=Zr*nl;if(O>il){const J=il/O;O*=J,z*=J}return{tex:L,worldW:O,worldH:z}}function se(q,N,ae){const{tex:oe,worldW:T,worldH:x}=j(q,ae),L=new Fi(T,x),O=new On({map:oe,transparent:!0,depthWrite:!1,opacity:0}),z=new lt(L,O);z.position.set(0,10,N),z.visible=!1,k.add(z);const J=new lt(L,new On({map:oe,transparent:!0,depthWrite:!1,blending:ti,color:2875596,opacity:0})),G=new lt(L,new On({map:oe,transparent:!0,depthWrite:!1,blending:ti,color:10116351,opacity:0}));return J.position.copy(z.position),G.position.copy(z.position),J.visible=!1,G.visible=!1,k.add(J),k.add(G),ke.push(L,O,oe,J.material,G.material),{mesh:z,ghostCy:J,ghostMg:G}}const Y={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Me,Pe;function Ce(){const q=e.current;if(!q)return;H=new _d({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),H.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),k=new Jl,k.fog=new ar(263946,.0011),K=new Bt(62,window.innerWidth/window.innerHeight,1,6e3),K.position.set(0,0,40),k.add(new ld(928300,1.1));const N=vd*Ps.length+500,ae=900,oe=new Lt,T=new Float32Array(ae*3),x=new Float32Array(ae*3),L=[2875596,15357964,15357964,10116351];for(let G=0;G<ae;G++){const B=60+Math.random()*260,V=Math.random()*Math.PI*2;T[G*3]=Math.cos(V)*B,T[G*3+1]=Math.sin(V)*B,T[G*3+2]=-Math.random()*N;const ie=new qe(L[G%L.length]);x[G*3]=ie.r,x[G*3+1]=ie.g,x[G*3+2]=ie.b}oe.setAttribute("position",new Ut(T,3)),oe.setAttribute("color",new Ut(x,3));const O=new cr({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});k.add(new mo(oe,O)),ke.push(oe,O),Ps.forEach((G,B)=>{const V=Ls(B),ie="#"+G.light.toString(16).padStart(6,"0");we.push(se(G.text,V,ie));const ue=new ei(G.light,2.4,900,2);ue.position.set(0,40,V+60),k.add(ue)}),Me=new ei(15357964,4,550,2),Pe=new ei(10116351,2.6,550,2),k.add(Me),k.add(Pe),fe=!0,et();const z=Math.random()*1e3;Y.camZ=0;function J(G){if(!H||!k||!K)return;{const ue=Math.sin(G*.0016+z)*1.1+Math.sin(G*.0043)*.5,le=Math.cos(G*.002+z)*.9+Math.cos(G*.0038)*.45;K.position.x=ue+Y.camX,K.position.y=le+6}K.position.z=Y.camZ+Y.warpKick;const B=Y.yawKick,V=K.position.x+Math.sin(B)*640;K.lookAt(V,K.position.y-4,Y.focusZ),K.rotateZ(-B*.5);const ie=62+Y.fovKick*14;K.fov!==ie&&(K.fov=ie,K.updateProjectionMatrix()),Me.position.set(Math.sin(G*6e-4)*80,30,Y.camZ-120),Pe.position.set(Math.cos(G*7e-4)*80,-10,Y.camZ-200),we.forEach(ue=>{ue.mesh.visible&&ue.mesh.quaternion.copy(K.quaternion),ue.ghostCy.visible&&ue.ghostCy.quaternion.copy(K.quaternion),ue.ghostMg.visible&&ue.ghostMg.quaternion.copy(K.quaternion)}),H.render(k,K),re=requestAnimationFrame(J)}re=requestAnimationFrame(J)}function et(){!fe||!H||!K||(H.setSize(window.innerWidth,window.innerHeight),K.aspect=window.innerWidth/window.innerHeight,K.updateProjectionMatrix())}function Be(){et(),C(),U(window.innerWidth,window.innerHeight),F(v,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Be,{passive:!0});function $e(q,N=650){const ae=pe;pe=q;const oe=we[q];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const T=ae>=0?we[ae]:null,x=performance.now();function L(){const O=Math.min(1,(performance.now()-x)/N);oe.mesh.material.opacity=O,T&&(T.mesh.material.opacity=1-O),O<1?requestAnimationFrame(L):T&&(T.mesh.visible=!1)}L()}function He(){if(pe<0)return;const q=we[pe];if(!q)return;const N=16+Math.random()*14;q.ghostCy.visible=!0,q.ghostCy.material.opacity=.6,q.ghostCy.position.x=-N,q.ghostMg.visible=!0,q.ghostMg.material.opacity=.6,q.ghostMg.position.x=N,setTimeout(()=>{q.ghostCy.material.opacity=0,q.ghostCy.visible=!1,q.ghostCy.position.x=0,q.ghostMg.material.opacity=0,q.ghostMg.visible=!1,q.ghostMg.position.x=0},140+Math.random()*100)}async function ze(q,N,ae,oe,T){const x=Y.camZ,L=Y.camX,O=performance.now();return Y.warpKick=(Math.random()-.5)*34,Y.yawKick=T*oe,Y.fovKick=1,new Promise(z=>{function J(G){const B=Math.min(1,(G-O)/ae),V=Tx(B);Y.camZ=x+(q-x)*V,Y.camX=L+(N-L)*V,Y.warpKick*=.92,Y.yawKick*=.975,Y.fovKick*=.965,B<1?requestAnimationFrame(J):z()}requestAnimationFrame(J)})}function ct(q=1,N=420){if(!fe||!y||!e.current)return;const ae=window.innerWidth,oe=window.innerHeight,T=performance.now()+N;function x(){if(performance.now()>T){F(v,ae,oe);return}y.clearRect(0,0,ae,oe),P(v);const O=5+Math.floor(Math.random()*8*q);for(let J=0;J<O;J++){const G=Math.random()*oe,B=4+Math.random()*52*q,V=(Math.random()-.5)*130*q;try{y.drawImage(e.current,0,G,ae,B,V,G,ae,B)}catch{}}const z=Math.round(6*q);y.globalCompositeOperation="screen";for(let J=0;J<z;J++){const G=Math.random()*oe;y.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],y.globalAlpha=.35+Math.random()*.35,y.lineWidth=.6+Math.random()*1.6,y.beginPath(),y.moveTo(0,G),y.lineTo(ae,G),y.stroke()}if(y.globalCompositeOperation="source-over",y.globalAlpha=1,Math.random()<q*.12){y.globalAlpha=.5;for(let J=0;J<220;J++)y.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",y.fillRect(Math.random()*ae,Math.random()*oe,2,2);y.globalAlpha=1}requestAnimationFrame(x)}x()}function dt(q=1,N=340){if(!fe||!y)return;const ae=window.innerWidth,oe=window.innerHeight,T=ae/2,x=oe/2,L=12+Math.floor(10*q),O=Array.from({length:L},()=>Math.random()*Math.PI*2),z=performance.now();function J(){const B=(performance.now()-z)/N;if(B>=1){F(v,ae,oe);return}y.save(),y.globalCompositeOperation="screen",O.forEach(V=>{const ie=30+B*300,ue=ie+90+Math.random()*150,le=T+Math.cos(V)*ie,ce=x+Math.sin(V)*ie,xe=T+Math.cos(V)*ue,ye=x+Math.sin(V)*ue;y.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",y.globalAlpha=(1-B)*(.28+Math.random()*.32)*q,y.lineWidth=1.2+Math.random()*1.8,y.beginPath(),y.moveTo(le,ce),y.lineTo(xe,ye),y.stroke()}),y.restore(),requestAnimationFrame(J)}J()}async function ft(q=900){const N=window.innerWidth,ae=window.innerHeight;if(!y)return;const oe=performance.now(),T=R.map(()=>Math.random()*.25);await new Promise(x=>{function L(){const O=Math.min(1,(performance.now()-oe)/q);y.clearRect(0,0,N,ae),R.forEach((z,J)=>{const G=Math.min(1,Math.max(0,(O-T[J])/(1-T[J])));if(G<=0)return;const B=z.pts,V=B.length-1,ie=G*V;y.lineWidth=z.width*(1+O*.4),y.strokeStyle=z.color,y.globalAlpha=.65+O*.3,y.shadowColor=z.color,y.shadowBlur=3+O*5,y.beginPath(),y.moveTo(B[0][0],B[0][1]);for(let ce=0;ce<Math.floor(ie);ce++)y.lineTo(B[ce+1][0],B[ce+1][1]);const ue=Math.floor(ie),le=ie-ue;if(ue<V&&le>0){const[ce,xe]=B[ue],[ye,De]=B[ue+1];y.lineTo(ce+(ye-ce)*le,xe+(De-xe)*le)}y.stroke()}),y.globalAlpha=1,y.shadowBlur=0,O<1?requestAnimationFrame(L):x()}L()})}async function gt(){var G;$(),(G=r.current)==null||G.classList.add("intro-jitter");const q=m.current;if(!q)return;q.innerHTML="";const N=window.innerWidth,ae=window.innerHeight,oe=11,T=8,x=N/oe,L=ae/T,O=N/2,z=ae/2,J=[];for(let B=0;B<T;B++)for(let V=0;V<oe;V++){const ie=V*x,ue=B*L,le=()=>(Math.random()-.5)*16,ce=document.createElement("div");ce.className="intro-shard",ce.style.left=ie+"px",ce.style.top=ue+"px",ce.style.width=x+2+"px",ce.style.height=L+2+"px",ce.style.clipPath=`polygon(${le()}px ${le()}px, ${x+le()}px ${le()}px, ${x+le()}px ${L+le()}px, ${le()}px ${L+le()}px)`,q.appendChild(ce);const xe=ie+x/2-O,ye=ue+L/2-z,De=Math.hypot(xe,ye)||1;J.push({div:ce,dx:xe/De,dy:ye/De,delay:De/Math.max(N,ae)*220+Math.random()*80})}J.forEach(({div:B,dx:V,dy:ie,delay:ue})=>{const le=60+Math.random()*140,ce=420+Math.random()*420,xe=(Math.random()-.5)*420;B.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${V*le}px, ${ie*le-20}px) rotate(${xe*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${V*le*1.4}px, ${ie*le+ce}px) rotate(${xe}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:ue,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Kr(1600),q.innerHTML=""}async function rt(){var q;if(U(window.innerWidth,window.innerHeight),Ce(),s.current&&(s.current.style.display="flex"),await I(),!M){s.current&&(s.current.style.display="none"),(q=c.current)==null||q.classList.add("intro-on"),E();for(let N=0;N<Ps.length&&!M;N++){const ae=Ps[N];v=ae.crack,d.current&&(d.current.innerHTML=ae.final?ae.sub:`${ae.sub} · трещина канала <b>${ae.crack}/4</b>`),$e(N),Y.focusZ=Ls(N);const oe=N%2===0?1:-1,T=ae.final?0:oe*60,x=ae.final?Ls(N)-Ex:Ls(N)+bx;if(await ze(x,T,wx,.5+ae.crack*.09,oe),M)return;D(),ct(Math.min(1,.5+ae.crack*.14),ae.final?300:260),ae.final||dt(.8+ae.crack*.1,320),F(v,window.innerWidth,window.innerHeight)}M||(await ft(900),!M&&(await Kr(150),await gt(),!M&&f()))}}return rt(),()=>{M=!0,window.removeEventListener("resize",Be),cancelAnimationFrame(re),ke.forEach(q=>q.dispose()),H==null||H.dispose(),h==null||h.close().catch(()=>{})}},[]),o.jsx("div",{className:"host-screen grid-bg intro-screen",children:o.jsxs("div",{className:"intro-root",children:[o.jsx("canvas",{ref:e,className:"intro-gl"}),o.jsx("canvas",{ref:t,className:"intro-crack"}),o.jsx("div",{ref:m,className:"intro-shatter-layer"}),o.jsx("div",{className:"intro-vignette"}),o.jsx("div",{className:"intro-scanlines"}),o.jsx("div",{ref:l,className:"intro-noise"}),o.jsx("div",{className:"intro-bracket tl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket tr",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket bl",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-bracket br",children:o.jsx("b",{})}),o.jsx("div",{className:"intro-ticker left",children:o.jsx("div",{className:"intro-ticker-col",children:[...u,...u].map((M,_)=>o.jsx("span",{className:_%6===0?"hi":void 0,children:M},_))})}),o.jsx("div",{className:"intro-ticker right",children:o.jsx("div",{className:"intro-ticker-col",children:[...g,...g].map((M,_)=>o.jsx("span",{className:_%5===0?"hi":void 0,children:M},_))})}),o.jsxs("div",{ref:s,className:"intro-stage",children:[o.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),o.jsx("div",{ref:r,className:"intro-frame"}),o.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),o.jsx("div",{ref:c,className:"intro-flight-label",children:o.jsx("div",{ref:d,className:"intro-subline"})}),o.jsx(no,{}),o.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const Rx=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],Jr=[3400,2700,2200,1900],Qa=640,al=560,Cx=320,ol=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Qr=220,Ds=300,cl=.46,ll=820,ji=n=>-(n+1)*Qa,Nx=n=>n===1?1:1-Math.pow(2,-10*n),Xi=n=>new Promise(e=>setTimeout(e,n));function Px(){const n=new Qn,e=[],t=new qn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new go(.42,.95,12),s=new lt(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new Ai(.42,.36,1.9,12),a=new lt(r,t);a.rotation.x=Math.PI/2,a.position.set(0,0,-.15),n.add(a),e.push(r);const c=new si(.5,.14,1),d=new qn({color:1316636,metalness:.5,roughness:.6}),l=new lt(c,d);l.position.set(.08,.38,-.1),l.rotation.z=.1,n.add(l),e.push(c,d);const m=new qn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),p=new Js(.13,12,12),u=new lt(p,m);u.position.set(0,-.05,-2),n.add(u),e.push(p,m);const g=new Js(.06,8,8);[-.22,.22].forEach(C=>{const U=new lt(g,m);U.position.set(C,.12,-1.7),n.add(U)}),e.push(g);const M=new Ai(.06,.06,1.4,6),_=new qn({color:1711394,metalness:.7,roughness:.4});e.push(M,_);const f=new si(.04,.86,.05),h=new qn({color:658447,metalness:.4,roughness:.6});e.push(f,h);const S=new Ai(.5,.5,.07,16),w=new qn({color:1382429,metalness:.6,roughness:.45});e.push(S,w);const E=new xo(.6,.09,8,20);e.push(E);function b(C,U){const P=new Qn,F=new lt(M,_);F.rotation.z=Math.PI/2,F.position.set(C*.72,-.08,.15),P.add(F);const $=C*1.45,D=new lt(S,w);D.rotation.x=Math.PI/2,D.position.set($,-.08,.15),P.add(D);const I=new qn({color:855826,metalness:.75,roughness:.3,emissive:U,emissiveIntensity:1.4}),H=new lt(E,I);H.position.copy(D.position),P.add(H),e.push(I);const k=new Qn;k.position.copy(D.position);for(let K=0;K<5;K++){const re=new lt(f,h);re.rotation.z=K/5*Math.PI,k.add(re)}return P.add(k),{pod:P,rim:H,spokes:k}}const y=b(-1,2875596),R=b(1,15357964);n.add(y.pod,R.pod);const v=new ei(2875596,2.2,14,2);return v.position.set(0,0,-1.4),n.add(v),{group:n,rotorL:y,rotorR:R,engineLight:v,disposables:e}}function Lx(n=60){const e=new Lt,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new Ut(t,3));const r=new cr({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:ti,depthWrite:!1}),a=new mo(e,r);let c=0;function d(m,p,u,g){for(let M=0;M<g;M++){const _=c;c=(c+1)%n,i[_]=.4+Math.random()*.35,t[_*3]=m,t[_*3+1]=p,t[_*3+2]=u,s[_*3]=(Math.random()-.5)*3.2,s[_*3+1]=(Math.random()-.5)*3.2-1,s[_*3+2]=(Math.random()-.5)*3.2}}function l(m){for(let p=0;p<n;p++){if(i[p]<=0){t[p*3+1]=-9999;continue}i[p]-=m,t[p*3]+=s[p*3]*m,t[p*3+1]+=s[p*3+1]*m,t[p*3+2]+=s[p*3+2]*m,i[p]<=0&&(t[p*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:a,geo:e,mat:r,spawn:d,tick:l}}function Dx({onDone:n,phases:e=Rx}){const t=Z.useRef(null),i=Z.useRef(null),s=Z.useRef(null),r=Z.useRef(null),a=Z.useRef(null),c=Z.useRef(null),d=Z.useRef(null),l=Z.useRef(n);l.current=n;const m=Z.useRef(e);m.current=e;const p=Z.useRef(()=>{});to();const u=Z.useMemo(()=>e.map(g=>g.text).join(" → "),[e]);return Z.useEffect(()=>{let g=!1,M=!1;const _=()=>{M||(M=!0,l.current())};p.current=_;const f=m.current,h=d.current,S=i.current,w=(S==null?void 0:S.getContext("2d"))??null;let E=[],b=0;function y(){S&&(S.width=window.innerWidth,S.height=window.innerHeight)}y();function R(q,N){E=[];let ae=0;const oe=7;function T(L,O,z,J,G,B){const V=3+Math.floor(Math.random()*4),ie=[[L,O]];let ue=z,le=L,ce=O;for(let xe=0;xe<V;xe++){ue+=(Math.random()-.5)*.9;const ye=J/V*(.55+Math.random()*.85);if(le+=Math.cos(ue)*ye,ce+=Math.sin(ue)*ye,ie.push([le,ce]),G>0&&Math.random()<.58){const De=ue+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);T(le,ce,De,J*(.3+Math.random()*.35),G-1,B*.76)}}E.push({pts:ie,color:ol[ae++%ol.length],width:B})}for(let L=0;L<oe;L++){const O=q*(.1+Math.random()*.8),z=N*(.08+Math.random()*.84),J=7+Math.floor(Math.random()*7);let G=Math.random()*Math.PI*2;for(let B=0;B<J;B++){G+=Math.PI*2/J*(.55+Math.random()*.9);const V=Math.max(q,N)*(.16+Math.random()*.46);T(O,z,G,V,2,.9)}}E.slice().forEach(L=>{if(L.pts.length<3||Math.random()>=.55)return;const[O,z]=L.pts[1+Math.floor(Math.random()*(L.pts.length-2))];T(O,z,Math.random()*Math.PI*2,Math.max(q,N)*(.08+Math.random()*.22),1,.55)})}function v(q){if(!w||q<=0)return;const N=Math.min(1,q/2.5),ae=Math.round(E.length*N);for(let oe=0;oe<ae;oe++){const T=E[oe];w.lineWidth=T.width*(.9+q*.1),w.strokeStyle=T.color,w.globalAlpha=.7+q*.07,w.shadowColor=T.color,w.shadowBlur=5+q*2.4,w.beginPath(),T.pts.forEach(([x,L],O)=>O===0?w.moveTo(x,L):w.lineTo(x,L)),w.stroke()}w.globalAlpha=1,w.shadowBlur=0}function C(q,N,ae){w&&(w.clearRect(0,0,N,ae),v(q))}function U(q=!1){const N=a.current;if(!N)return;const ae=q?"fincine-hit-big":"fincine-hit";N.classList.remove("fincine-hit","fincine-hit-big"),N.offsetWidth,N.classList.add(ae)}function P(){h&&(h.currentTime=0,h.play().catch(()=>{}))}let F=null,$=null,D=null,I=0,H=!1,k=-1;const re=document.createElement("canvas").getContext("2d");re.font=`700 ${Qr}px "Rajdhani", sans-serif`;const fe=[],pe=[];function Ee(q,N,ae=1){const oe=q.toUpperCase(),T=Qr*.05,x=Math.ceil(re.measureText(oe).width),L=Math.max(200,x+140+T*2),O=document.createElement("canvas");O.width=L,O.height=Ds;const z=O.getContext("2d");z.font=`700 ${Qr}px "Rajdhani", sans-serif`,z.textAlign="center",z.textBaseline="middle",z.lineJoin="round",z.shadowColor=N,z.shadowBlur=60,z.strokeStyle="#eef6f4",z.lineWidth=T,z.strokeText(oe,L/2,Ds/2),z.fillStyle="#eef6f4",z.fillText(oe,L/2,Ds/2);const J=new id(O);J.anisotropy=4;let G=L*cl*ae,B=Ds*cl*ae;if(G>ll*ae){const V=ll*ae/G;G*=V,B*=V}return{tex:J,worldW:G,worldH:B}}function We(q,N,ae,oe){const{tex:T,worldW:x,worldH:L}=Ee(q,ae,oe),O=new Fi(x,L),z=new On({map:T,transparent:!0,depthWrite:!1,opacity:0}),J=new lt(O,z);J.position.set(0,8,N),J.visible=!1,$.add(J);const G=new lt(O,new On({map:T,transparent:!0,depthWrite:!1,blending:ti,color:2875596,opacity:0})),B=new lt(O,new On({map:T,transparent:!0,depthWrite:!1,blending:ti,color:16723804,opacity:0}));return G.position.copy(J.position),B.position.copy(J.position),G.visible=!1,B.visible=!1,$.add(G),$.add(B),pe.push(O,z,T,G.material,B.material),{mesh:J,ghostCy:G,ghostMg:B}}const we={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let ke,j,se=null,Y=null,Me=0;function Pe(){const q=t.current;if(!q)return;F=new _d({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),F.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),$=new Jl,$.fog=new ar(263946,.0012),D=new Bt(58,window.innerWidth/window.innerHeight,1,6e3),D.position.set(0,0,40),$.add(new ld(928300,1));const N=Qa*f.length+600,ae=700,oe=new Lt,T=new Float32Array(ae*3),x=new Float32Array(ae*3),L=[2875596,10116351,15357964];for(let G=0;G<ae;G++){const B=60+Math.random()*280,V=Math.random()*Math.PI*2;T[G*3]=Math.cos(V)*B,T[G*3+1]=Math.sin(V)*B,T[G*3+2]=-Math.random()*N;const ie=new qe(L[G%L.length]);x[G*3]=ie.r,x[G*3+1]=ie.g,x[G*3+2]=ie.b}oe.setAttribute("position",new Ut(T,3)),oe.setAttribute("color",new Ut(x,3));const O=new cr({size:3,vertexColors:!0,transparent:!0,opacity:.8});$.add(new mo(oe,O)),pe.push(oe,O),f.forEach((G,B)=>{const V=ji(B),ie="#"+G.light.toString(16).padStart(6,"0");fe.push(We(G.text,V,ie,G.final?1.35:1));const ue=new ei(G.light,2.6,950,2);ue.position.set(0,40,V+60),$.add(ue)}),ke=new ei(15357964,3.4,550,2),j=new ei(10116351,2.2,550,2),$.add(ke),$.add(j),se=Px(),D.add(se.group),se.group.position.set(1.3,-1,-6.5),Y=Lx(),se.group.add(Y.points),pe.push(Y.geo,Y.mat),$.add(D),H=!0,Ce();const z=Math.random()*1e3;we.camZ=-Qa*.6;function J(G){if(!F||!$||!D||!se||!Y)return;const B=Me?Math.min(.05,(G-Me)/1e3):.016;Me=G;const V=.15+Math.min(1,Math.max(0,(k+1)/f.length))*.85,ie=we.impactT;ie>0&&(we.impactT=Math.max(0,ie-B));const ue=Math.sin(G*.0016+z)*(1+V*2.2+ie*6)+Math.sin(G*.0043)*.5*V,le=Math.cos(G*.002+z)*(.9+V*1.8+ie*5)+Math.cos(G*.0038)*.45*V;D.position.x=ue+we.camX,D.position.y=le+6,D.position.z=we.camZ+we.warpKick;const ce=we.yawKick,xe=D.position.x+Math.sin(ce)*640,ye=we.focusY??D.position.y-4;D.lookAt(xe,ye,we.focusZ),D.rotateZ(-ce*.55);const De=58+we.fovKick*(14+V*10)+ie*24;Math.abs(D.fov-De)>.01&&(D.fov=De,D.updateProjectionMatrix()),ke.position.set(Math.sin(G*6e-4)*80,30,we.camZ-120),j.position.set(Math.cos(G*7e-4)*80,-10,we.camZ-200),we.droneRoll=we.droneRoll*.9+-ce*1.4*.1;const W=1.6+V*2.4;we.droneBob=Math.sin(G*.001*W)*(.12+V*.35),se.group.rotation.z=we.droneRoll*.6+(ie>0?Math.sin(G*.09)*1.15*ie:0),se.group.rotation.x=Math.sin(G*.0013)*.06*(1+V)+(ie>0?Math.cos(G*.11)*.75*ie:0);const ge=B*(6+V*10);se.rotorR.spokes.rotation.z+=ge;let de=-1+we.droneBob;we.engineOutT>0?(we.engineOutT-=B,de-=1-Math.max(0,we.engineOutT)/.5<1?Math.sin((.5-we.engineOutT)*9)*.4:0,se.rotorL.spokes.rotation.z+=ge*.12,se.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&Y.spawn(-1.45,-.08,.15,2)):(se.rotorL.spokes.rotation.z+=ge,se.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(G*.01)*.3),se.group.position.y=de,se.group.position.x=1.3+Math.sin(G*9e-4)*.25*(1+V),se.group.position.z=-6.5-(ie>0?ie*2.6:0),Y.tick(B),fe.forEach(me=>{me.mesh.visible&&me.mesh.quaternion.copy(D.quaternion),me.ghostCy.visible&&me.ghostCy.quaternion.copy(D.quaternion),me.ghostMg.visible&&me.ghostMg.quaternion.copy(D.quaternion)}),F.render($,D),I=requestAnimationFrame(J)}I=requestAnimationFrame(J)}function Ce(){!H||!F||!D||(F.setSize(window.innerWidth,window.innerHeight),D.aspect=window.innerWidth/window.innerHeight,D.updateProjectionMatrix())}function et(){Ce(),y(),R(window.innerWidth,window.innerHeight),C(b,window.innerWidth,window.innerHeight)}window.addEventListener("resize",et,{passive:!0});function Be(q,N=600){const ae=k;k=q;const oe=fe[q];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const T=ae>=0?fe[ae]:null,x=performance.now();function L(){const O=Math.min(1,(performance.now()-x)/N);oe.mesh.material.opacity=O,T&&(T.mesh.material.opacity=1-O),O<1?requestAnimationFrame(L):T&&(T.mesh.visible=!1)}L()}function $e(q=.5){if(k<0)return;const N=fe[k];if(!N)return;const ae=(14+Math.random()*12)*(.7+q*.6),oe=Math.min(1,.45+q*.3);N.ghostCy.visible=!0,N.ghostCy.material.opacity=oe,N.ghostCy.position.x=-ae,N.ghostMg.visible=!0,N.ghostMg.material.opacity=oe,N.ghostMg.position.x=ae,setTimeout(()=>{N.ghostCy.material.opacity=0,N.ghostCy.visible=!1,N.ghostCy.position.x=0,N.ghostMg.material.opacity=0,N.ghostMg.visible=!1,N.ghostMg.position.x=0},(120+Math.random()*90)*(.8+q*.5)),q>.75&&Math.random()<.65&&setTimeout(()=>$e(q*.55),70+Math.random()*70)}async function He(q,N,ae,oe,T){const x=we.camZ,L=we.camX,O=performance.now();return we.warpKick=(Math.random()-.5)*40,we.yawKick=T*oe,we.fovKick=1,new Promise(z=>{function J(G){if(g){z();return}const B=Math.min(1,(G-O)/ae),V=Nx(B);we.camZ=x+(q-x)*V,we.camX=L+(N-L)*V,we.warpKick*=.91,we.yawKick*=.972,we.fovKick*=.96,B<1?requestAnimationFrame(J):z()}requestAnimationFrame(J)})}function ze(q=1,N=420){if(!H||!w||!t.current)return;const ae=window.innerWidth,oe=window.innerHeight,T=performance.now()+N;function x(){if(performance.now()>T){C(b,ae,oe);return}w.clearRect(0,0,ae,oe),v(b);const O=5+Math.floor(Math.random()*9*q);for(let J=0;J<O;J++){const G=Math.random()*oe,B=4+Math.random()*56*q,V=(Math.random()-.5)*150*q;try{w.drawImage(t.current,0,G,ae,B,V,G,ae,B)}catch{}}w.globalCompositeOperation="screen";const z=Math.round(6*q);for(let J=0;J<z;J++){const G=Math.random()*oe;w.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],w.globalAlpha=.35+Math.random()*.35,w.lineWidth=.6+Math.random()*1.8,w.beginPath(),w.moveTo(0,G),w.lineTo(ae,G),w.stroke()}if(w.globalCompositeOperation="source-over",w.globalAlpha=1,Math.random()<q*.14){w.globalAlpha=.5;for(let J=0;J<240;J++)w.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",w.fillRect(Math.random()*ae,Math.random()*oe,2,2);w.globalAlpha=1}requestAnimationFrame(x)}x()}function ct(q=1,N=340){if(!H||!w)return;const ae=window.innerWidth,oe=window.innerHeight,T=ae/2,x=oe/2,L=14+Math.floor(14*q),O=Array.from({length:L},()=>Math.random()*Math.PI*2),z=performance.now();function J(){const B=(performance.now()-z)/N;if(B>=1){C(b,ae,oe);return}w.save(),w.globalCompositeOperation="screen",O.forEach(V=>{const ie=30+B*340,ue=ie+100+Math.random()*170,le=T+Math.cos(V)*ie,ce=x+Math.sin(V)*ie,xe=T+Math.cos(V)*ue,ye=x+Math.sin(V)*ue;w.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",w.globalAlpha=(1-B)*(.3+Math.random()*.34)*q,w.lineWidth=1.2+Math.random()*2,w.beginPath(),w.moveTo(le,ce),w.lineTo(xe,ye),w.stroke()}),w.restore(),requestAnimationFrame(J)}J()}async function dt(q=900){const N=window.innerWidth,ae=window.innerHeight;if(!w)return;const oe=performance.now(),T=E.map(()=>Math.random()*.25);await new Promise(x=>{function L(){if(g){x();return}const O=Math.min(1,(performance.now()-oe)/q);w.clearRect(0,0,N,ae),E.forEach((z,J)=>{const G=Math.min(1,Math.max(0,(O-T[J])/(1-T[J])));if(G<=0)return;const B=z.pts,V=B.length-1,ie=G*V;w.lineWidth=z.width*(1+O*.45),w.strokeStyle=z.color,w.globalAlpha=.65+O*.32,w.shadowColor=z.color,w.shadowBlur=3+O*6,w.beginPath(),w.moveTo(B[0][0],B[0][1]);for(let ce=0;ce<Math.floor(ie);ce++)w.lineTo(B[ce+1][0],B[ce+1][1]);const ue=Math.floor(ie),le=ie-ue;if(ue<V&&le>0){const[ce,xe]=B[ue],[ye,De]=B[ue+1];w.lineTo(ce+(ye-ce)*le,xe+(De-xe)*le)}w.stroke()}),w.globalAlpha=1,w.shadowBlur=0,O<1?requestAnimationFrame(L):x()}L()})}async function ft(){we.impactT=.55,U(!0),Y&&(Y.spawn(0,-.05,-2,28),Y.spawn(-1.45,-.08,.15,16),Y.spawn(1.45,-.08,.15,16)),ze(1.6,340),ct(1.4,260),await Xi(160)}async function gt(){U(!0);const q=c.current;if(!q)return;q.innerHTML="";const N=window.innerWidth,ae=window.innerHeight,oe=12,T=8,x=N/oe,L=ae/T,O=N/2,z=ae/2,J=[];for(let G=0;G<T;G++)for(let B=0;B<oe;B++){const V=B*x,ie=G*L,ue=()=>(Math.random()-.5)*16,le=document.createElement("div");le.className="fincine-shard",le.style.left=V+"px",le.style.top=ie+"px",le.style.width=x+2+"px",le.style.height=L+2+"px",le.style.clipPath=`polygon(${ue()}px ${ue()}px, ${x+ue()}px ${ue()}px, ${x+ue()}px ${L+ue()}px, ${ue()}px ${L+ue()}px)`,q.appendChild(le);const ce=V+x/2-O,xe=ie+L/2-z,ye=Math.hypot(ce,xe)||1;J.push({div:le,dx:ce/ye,dy:xe/ye,delay:ye/Math.max(N,ae)*200+Math.random()*70})}J.forEach(({div:G,dx:B,dy:V,delay:ie})=>{const ue=70+Math.random()*160,le=460+Math.random()*460,ce=(Math.random()-.5)*460;G.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${B*ue}px, ${V*ue-22}px) rotate(${ce*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${B*ue*1.4}px, ${V*ue+le}px) rotate(${ce}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:ie,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Xi(1530),q.innerHTML=""}async function rt(){if(R(window.innerWidth,window.innerHeight),Pe(),P(),s.current&&s.current.classList.add("fincine-on"),await Xi(900),!g){for(let q=0;q<f.length&&!g;q++){const N=f[q];b=N.crack,r.current&&(r.current.innerHTML=N.final?N.sub:`${N.sub} · рассинхрон канала <b>${N.crack}/4</b>`),Be(q),we.focusZ=ji(q),N.final&&(we.focusY=8);const ae=q%2===0?1:-1;if(N.final){const oe=ji(q)+al+280;if(await He(oe,0,Jr[q]??2200,.35,ae),g||($e(.4+N.crack*.2),ze(Math.min(1.5,.45+N.crack*.27),300),C(b,window.innerWidth,window.innerHeight),await Xi(700),await He(ji(q)-Cx,-150,950,.5,ae),g))return}else{const oe=ae*70,T=ji(q)+al;if(N.crack>=2&&setTimeout(()=>{g||(we.engineOutT=.5)},Jr[q]*.4),await He(T,oe,Jr[q]??2200,.55+N.crack*.1,ae),g)return}$e(.4+N.crack*.2),ze(Math.min(1.5,.45+N.crack*.27),N.final?360:240+N.crack*30),N.final||ct(.8+N.crack*.2,300+N.crack*20),N.crack>=3&&U(!0),C(b,window.innerWidth,window.innerHeight)}g||(await ft(),!g&&(await dt(850),!g&&(await Xi(140),await gt(),!g&&_())))}}return rt(),()=>{g=!0,window.removeEventListener("resize",et),cancelAnimationFrame(I),pe.forEach(q=>q.dispose()),se==null||se.disposables.forEach(q=>q.dispose()),F==null||F.dispose();try{h==null||h.pause()}catch{}}},[]),o.jsxs("div",{className:"fincine-root",onClick:()=>p.current(),children:[o.jsx("canvas",{ref:t,className:"fincine-gl"}),o.jsx("canvas",{ref:i,className:"fincine-crack"}),o.jsx("div",{ref:c,className:"fincine-shatter-layer"}),o.jsx("div",{className:"fincine-vignette"}),o.jsx("div",{className:"fincine-scanlines"}),o.jsx("div",{ref:a,className:"fincine-noise"}),o.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!u,children:[o.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),o.jsx("div",{ref:r,className:"fincine-sub"})]}),o.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),o.jsx(no,{}),o.jsx("audio",{ref:d,src:"/quiz-party/intro.mp3",preload:"auto"})]})}async function Ix(n,e){var i;await Bn.patchSession(Hs(),{melody:{}});const t=El(e,n.round_number,"show_answers");if(t.kind==="scoreboard")return void yl();if(t.kind==="break")return void Sl();if(t.kind==="finale")return void tr(n.pack_id,((i=e.settings)==null?void 0:i.play_mode)==="paper");await Bn.patchSession(Hs(),{phase:"round_intro",round_number:n.round_number+1,question_index:0,timer_started_at:null,reveal:!1,melody:{}})}let Ot=null;function Ux(){Ot||(Ot=Et(),Ot.play().catch(()=>{}),Ot.pause())}function Is(n,e=0){return Ot||(Ot=Et()),Ot.pause(),Ot.loop=!1,Ot.volume=1,Pl(Ot,n,e),Ot}function Fx(){if(Ot)try{Ot.pause(),Ot.currentTime=0}catch{}}const Si=n=>new Date(Date.now()+n*1e3).toISOString();function Ox({src:n}){return Z.useEffect(()=>{const e=Et();e.src=n,e.currentTime=0;let t=!1;e.play().then(()=>{if(t)try{e.pause(),e.src=""}catch{}}).catch(()=>{});const i=setTimeout(()=>{try{e.pause()}catch{}},15e3);return()=>{t=!0,clearTimeout(i);try{e.pause(),e.src=""}catch{}}},[n]),o.jsx("div",{className:"mel-reveal-track",children:"♪ играет 15 секунд"})}function Bx({pack:n,round:e,gameState:t}){var K,re,fe,pe,Ee,We,we,ke;const i=e.settings,s=i.themes??[],r=t.melody??{},a=Jt(t.game_id),c=En(t.game_id,t.round_number),d=r.played??[],l=Z.useRef(null),[m,p]=Z.useState(Date.now());Z.useEffect(()=>{const j=setInterval(()=>p(Date.now()),200);return()=>clearInterval(j)},[]);const u=r.deadline?new Date(r.deadline).getTime():0,g=u?Math.max(0,Math.ceil((u-m)/1e3)):0,M=Z.useRef(0);Z.useEffect(()=>{M.current=0},[r.stage,r.key]),g>M.current&&(M.current=g);const _=M.current,f=!!u&&m>=u,[h,S]=(r.key??"0-0").split("-").map(Number),w=(K=s[h])==null?void 0:K.tracks[S],E=`q-mel-${r.key}-bid`,b=`q-mel-${r.key}`,y=c.filter(j=>j.question_ref===E);Z.useEffect(()=>{if(r.stage!=="bids")return;const j=y.map(Y=>({id:Y.team_id,sec:Number(Y.answer_text)||99,at:Y.updated_at})).sort((Y,Me)=>Y.sec-Me.sec||+new Date(Y.at)-+new Date(Me.at)).map(Y=>Y.id),se=[...j,...a.map(Y=>Y.id).filter(Y=>!j.includes(Y))];JSON.stringify(se)!==JSON.stringify(r.order)&&Mt({...r,order:se,turn:0})},[r.stage,y.map(j=>`${j.team_id}:${j.answer_text}`).join("|")]),Z.useEffect(()=>{if(r.stage!=="snippet")return;const j=r.snippetSec??5,se=window.setTimeout(()=>{Mt({...r,stage:"answering",deadline:Si(i.answerSec??30)})},(j+10)*1e3);return()=>clearTimeout(se)},[r.stage,r.key,r.snippetSec]),Z.useEffect(()=>{if(r.stage!=="snippet"||!(w!=null&&w.audio)||document.hidden)return;const j=r.snippetSec??5,se=Is(Xe(w.audio),r.startSec??0);l.current=se;let Y,Me=!1;const Pe=()=>{Me||(Me=!0,se.pause(),Mt({...r,stage:"answering",deadline:Si(i.answerSec??30)}))};se.addEventListener("playing",()=>{Mt({...r,deadline:Si(j)}),Y=window.setTimeout(Pe,j*1e3)},{once:!0});const Ce=window.setTimeout(Pe,(j+4)*1e3);return()=>{Y&&clearTimeout(Y),clearTimeout(Ce)}},[r.stage,r.key]),Z.useEffect(()=>{if(!(!f||document.hidden))if(r.stage==="spinning")Mt({...r,stage:"listen",deadline:Si(2)});else if(r.stage==="bidding"){const j=y.map(Y=>({id:Y.team_id,sec:Number(Y.answer_text)||99,at:Y.updated_at})).sort((Y,Me)=>Y.sec-Me.sec||+new Date(Y.at)-+new Date(Me.at)).map(Y=>Y.id),se=[...j,...a.map(Y=>Y.id).filter(Y=>!j.includes(Y))];Mt({...r,stage:"bids",order:se,turn:0,deadline:void 0})}else(r.stage==="answering"||r.stage==="passed")&&(c.some(se=>{var Y,Me;return se.question_ref===`q-mel-${r.key}`&&se.team_id===((Y=r.order)==null?void 0:Y[r.turn??0])&&!!((Me=se.answer_text)!=null&&Me.trim())})?Mt({...r,deadline:void 0}):(Fx(),Mt(mu(r))))},[f,r.stage,c]),Z.useEffect(()=>{if(r.stage!=="listen"||!(w!=null&&w.audio)||document.hidden)return;const j=r.startSec??0,se=Is(Xe(w.audio),j);l.current=se;let Y,Me=!1;const Pe=()=>{Me||(Me=!0,se.pause(),Mt({...r,stage:"bidding",deadline:Si(i.bidSec??10)}))};let Ce=!1;const et=()=>{if(Ce)return;Ce=!0;const He=se.duration;if(!He||!isFinite(He))return;const ze=Math.min(j,Math.max(0,He-10));if(ze!==j){try{se.currentTime=ze}catch{}Mt({...r,startSec:ze})}};se.addEventListener("loadedmetadata",et,{once:!0});const Be=window.setTimeout(et,400);se.addEventListener("playing",()=>{Y=window.setTimeout(Pe,1e3)},{once:!0});const $e=window.setTimeout(Pe,4e3);return()=>{Y&&clearTimeout(Y),clearTimeout($e),clearTimeout(Be),se.removeEventListener("loadedmetadata",et)}},[r.stage,r.key]),Z.useEffect(()=>{var Y;const j=e.settings.bg_music??((Y=n.settings)==null?void 0:Y.bg_music);if(r.stage!=="answering"&&r.stage!=="bidding"||!j||document.hidden)return;const se=Is(Xe(j));return se.loop=!0,se.volume=.45,()=>{se.pause(),se.loop=!1,se.volume=1}},[r.stage]),Z.useEffect(()=>{if(r.stage!=="passed"||r.deadline||!(w!=null&&w.audio)||document.hidden)return;const j=Is(Xe(w.audio));return l.current=j,j.onended=()=>void Mt({...r,deadline:Si(i.passAnswerSec??10)}),()=>{j.pause(),j.onended=null}},[r.stage]);const[R,v]=Z.useState(!1);if(s.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"УГАДАЙ МЕЛОДИЮ"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"})]});const C=gu(s,d),U=xu(r),P=j=>{v(!1),Mt(Su(r,j,i.trackSec??30))},F=()=>{const j=C[Math.floor(Math.random()*C.length)];Mt(bu(r,j,C.length,i.spinSec??5,i.trackSec??30))},$=(re=r.order)==null?void 0:re[r.turn??0],D=a.find(j=>j.id===$),I=Number((fe=y.find(j=>j.team_id===$))==null?void 0:fe.answer_text)||0,H=c.find(j=>j.question_ref===b&&j.team_id===$),k=async j=>{H&&await Eu(r,H,j,I)};return o.jsxs("div",{className:"host-screen grid-bg mel-screen",onPointerDown:Ux,children:[o.jsx(zx,{themes:s,played:d,spinning:r.stage==="spinning",spinKey:r.key,spinLeft:g,spinTotal:i.spinSec??10,onPick:R?P:void 0,theme:n.theme}),U&&o.jsx("div",{className:"host-actions",children:C.length>0?R?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ ПЛИТКУ НА ЭКРАНЕ"}),o.jsx("button",{className:"ghost",onClick:()=>v(!1),children:"Отмена"})]}):o.jsxs(o.Fragment,{children:[o.jsx("button",{onClick:F,children:d.length===0?"Стартуем!":"Рулетка"}),o.jsx("button",{className:"ghost",onClick:()=>v(!0),children:"Выбрать вручную"})]}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"ВСЕ ТРЕКИ ОТЫГРАНЫ"}),o.jsx("button",{onClick:()=>void Ix(t,n),children:"Завершить раунд →"})]})}),r.stage&&!U&&r.stage!=="spinning"&&vl.createPortal(o.jsx("div",{className:`mel-overlay theme-${n.theme??"classic"}`,children:o.jsxs("div",{className:"mel-modal",children:[o.jsxs("div",{className:"mel-modal-head",children:[o.jsxs("div",{className:"mel-modal-theme",children:[(pe=s[h])==null?void 0:pe.name," · трек ",S+1]}),!!u&&o.jsx("div",{className:"mel-count",children:n.theme==="potter"?o.jsx(sr,{left:g,seconds:_,low:g<=5}):g})]}),r.stage==="listen"&&o.jsx("div",{className:"mel-big",children:"СЛУШАЕМ 1 СЕКУНДУ…"}),r.stage==="bidding"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mel-big",children:"ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?"}),o.jsx("div",{className:"mel-points-hint",children:"2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0.5 балла"}),o.jsx("div",{className:"mel-bids",children:[...a].sort((j,se)=>j.name.localeCompare(se.name)).map(j=>{const se=y.find(Y=>Y.team_id===j.id);return o.jsxs("div",{className:`mel-bid-row${se?" win":""}`,children:[o.jsx("span",{style:{color:j.color},children:j.name}),o.jsx("b",{children:se?"ставка принята ✓":"…"}),o.jsx("span",{})]},j.id)})})]}),r.stage==="bids"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"mono-tag",children:"СТАВКИ КОМАНД"}),o.jsxs("div",{className:"mel-bids",children:[(r.order??[]).map((j,se)=>{const Y=a.find(Pe=>Pe.id===j),Me=y.find(Pe=>Pe.team_id===j);return o.jsxs("div",{className:`mel-bid-row${se===0?" win":""}`,children:[o.jsx("span",{style:{color:Y==null?void 0:Y.color},children:Y==null?void 0:Y.name}),o.jsxs("b",{children:[Me==null?void 0:Me.answer_text," сек"]}),se===0?o.jsx("span",{className:"mel-win-tag",children:"ИГРАЕТ"}):o.jsx("span",{})]},j)}),(r.order??[]).length===0&&o.jsx("div",{style:{opacity:.6},children:"ставок нет"})]}),o.jsxs("div",{className:"mel-actions",children:[o.jsxs("button",{disabled:!$,onClick:()=>void Mt(_u(r,I)),children:["Играем ",I||5," сек →"]}),o.jsx("button",{className:"ghost dark",onClick:()=>void Mt(ko(r)),children:"Пропустить трек"})]})]}),r.stage==="snippet"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:D==null?void 0:D.color},children:[D==null?void 0:D.name," · играет ",I," сек"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void Mt(vu(r,i.answerSec??30)),children:"Принимаем ответ →"})})]}),r.stage==="reveal"&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"answer-reveal",style:{padding:"18px 28px"},children:[o.jsxs("div",{className:"answer-label",children:["ВЕРНО ✓ · +",r.wonPts??0]}),o.jsx("div",{className:"answer-main",children:w==null?void 0:w.correct})]}),(w==null?void 0:w.audio)&&o.jsx(Ox,{src:Xe(w.audio)}),o.jsxs("div",{className:"mel-big",style:{color:(Ee=a.find(j=>j.id===r.wonTeam))==null?void 0:Ee.color},children:[(We=a.find(j=>j.id===r.wonTeam))==null?void 0:We.name," забирает баллы"]}),o.jsx("div",{className:"mel-actions",children:o.jsx("button",{onClick:()=>void Mt(Mu(r)),children:"К доске →"})})]}),r.stage!=="reveal"&&r.stage!=="done"&&o.jsx("button",{className:"mel-escape",onClick:async()=>{confirm(`Закрыть трек и вернуться к доске?

Баллы за него никто не получит.`)&&await Mt(ko(r))},children:"Закрыть"}),(r.stage==="answering"||r.stage==="passed")&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"mel-big",style:{color:D==null?void 0:D.color},children:[r.stage==="passed"?"ХОД ПЕРЕДАН · ":"",(D==null?void 0:D.name)??"—"]}),o.jsx("div",{className:"mel-points-hint",children:r.stage==="passed"?"за верный ответ — 0.5 балла":`ставка ${I} сек → за верный ответ ${I<=5?2:1} балла`}),o.jsx("div",{className:"mel-answer",children:H!=null&&H.answer_text?o.jsxs(o.Fragment,{children:["Ответ: ",o.jsx("b",{children:H.answer_text})]}):o.jsx("span",{style:{opacity:.6},children:"ждём ответ…"})}),(H==null?void 0:H.is_correct)===!0&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ВЕРНО ✓"}),o.jsx("div",{className:"answer-main",children:w==null?void 0:w.correct})]}),(H==null?void 0:H.is_correct)===!1&&o.jsxs("div",{className:"mel-wrong",children:["✗ НЕВЕРНО · ответ не раскрываем",(r.turn??0)===0&&(((we=r.order)==null?void 0:we.length)??0)>1?" — передайте ход второй команде":" — трек закрывается"]}),o.jsxs("div",{className:"mel-actions",children:[o.jsx("button",{disabled:!H,onClick:()=>void k(!0),children:"✓ Верно"}),o.jsx("button",{className:"ghost",onClick:()=>void yu(r,H),children:(r.turn??0)===0&&(((ke=r.order)==null?void 0:ke.length)??0)>1?"✗ Передать ход →":"✗ Закрыть трек"})]})]})]})}),document.body)]})}function zx({themes:n,played:e,spinning:t,spinKey:i,spinLeft:s,spinTotal:r,onPick:a,theme:c}){const l=n.flatMap((S,w)=>S.tracks.map((E,b)=>`${w}-${b}`)).filter(S=>!e.includes(S)),[m,p]=Z.useState(0),u=Z.useRef(s);u.current=s,Z.useEffect(()=>{if(!t||l.length===0||s<=0)return;let S=!1,w;const E=()=>{if(S)return;p(y=>{let R=Math.floor(Math.random()*l.length);return l.length>1&&R===y&&(R=(R+1)%l.length),R});const b=1-Math.max(0,u.current)/Math.max(1,r);w=window.setTimeout(E,180+b*b*720)};return w=window.setTimeout(E,180),()=>{S=!0,w&&clearTimeout(w)}},[t]);const g=t?s<=1?i:l[m%Math.max(1,l.length)]:void 0,M=Z.useRef(new Map),_=Z.useRef(null),f=Z.useRef(null);Z.useLayoutEffect(()=>{if(c!=="potter"||!t||!g)return;const S=_.current,w=M.current.get(g),E=f.current;if(!S||!w||!E)return;const b=S.getBoundingClientRect(),y=w.getBoundingClientRect(),R=y.left-b.left+y.width/2,v=y.top-b.top+y.height/2;E.style.transform=`translate(${R}px, ${v}px)`},[c,t,g]);const h=t&&s<=1;return o.jsxs("div",{className:`mel-board${t?" spinning":""}`,ref:_,style:{gridTemplateColumns:`repeat(${n.length}, minmax(0,1fr))`,gridTemplateRows:`auto repeat(${Math.max(...n.map(S=>S.tracks.length),1)}, minmax(0, 1fr))`},children:[c==="potter"&&t&&o.jsx("span",{ref:f,className:`mg-wisp mel-marker${h?" flare":""}`,"aria-hidden":!0}),n.map((S,w)=>o.jsx("div",{className:"mel-theme",children:S.name||`Тема ${w+1}`},`h${w}`)),n.map((S,w)=>S.tracks.map((E,b)=>{const y=`${w}-${b}`,R=e.includes(y),v=g===y,C=!!a&&!R,U=C&&!v;return o.jsx(Al,{kind:"melody",done:R,hot:v,colorIndex:w%4,interactive:C,flip:U,label:R?"":b+1,onClick:a?()=>a(y):void 0,elRef:P=>{P?M.current.set(y,P):M.current.delete(y)},style:{gridColumn:w+1,gridRow:b+2}},y)}))]})}const dl=[{body:"#f2e3c9",mask:"#b99a7d",name:"кремовый"},{body:"#8a5a33",mask:"#4c2f17",name:"тигровый"},{body:"#3b3b40",mask:"#232326",name:"чёрный"},{body:"#e8e2d8",mask:"#c96f3b",name:"бело-рыжий"},{body:"#9aa7b5",mask:"#6c7886",name:"голубой"}];function kx(n){let e=n>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Gx(n,e){const t=kx(n),i=8,s=Array.from({length:5},()=>{const _=Array.from({length:i},()=>.45+t()*.9),f=_.reduce((h,S)=>h+S,0);return{speeds:_,total:f}}),r=Math.max(...s.map(_=>_.total)),a=s.map(_=>e*.92*(r/_.total)),c=(_,f)=>{const h=a[_],w=Math.min(1,Math.max(0,f/h))*i,E=Math.floor(w),b=w-E;let y=0;for(let R=0;R<E;R++)y+=s[_].speeds[R];return y+=(s[_].speeds[Math.min(E,i-1)]??0)*b,Math.min(1,y/s[_].total)},d=["🦋","💤","🐦","🍂"],l=Array.from({length:5},()=>{const _=[];return t()<.6&&_.push({at:(.25+t()*.3)*e,dur:.6+t()*.9,icon:d[Math.floor(t()*d.length)]}),t()<.25&&_.push({at:(.62+t()*.22)*e,dur:.5+t()*.7,icon:d[Math.floor(t()*d.length)]}),_}),m=(_,f)=>l[_].find(h=>f>=h.at&&f<h.at+h.dur),p=(_,f)=>{let h=0;for(const S of l[_])h+=Math.min(Math.max(0,f-S.at),S.dur);return f-h},u=(_,f)=>c(_,p(_,f)),g=a.map((_,f)=>_+l[f].reduce((h,S)=>h+S.dur,0)),M=g.map((_,f)=>({i:f,f:_})).sort((_,f)=>_.f-f.f).map(_=>_.i);return{progress:u,finish:g,places:M,pausedAt:m}}function Hx({pack:n,round:e,gameState:t}){var E;const i=e.settings,s=(i.dogs??[]).length===5?i.dogs:["Френк","Батон","Пельмень","Турбо","Ракета"],r=i.raceSec??18,a=((E=t.melody)==null?void 0:E.race)??{},c=Jt(t.game_id),l=En(t.game_id,t.round_number).filter(b=>b.question_ref===`q-race-${t.round_number}`),m=Z.useRef(!1);Z.useEffect(()=>{var v;const b=e.settings.race_music??((v=n.settings)==null?void 0:v.bg_music);if(a.stage!=="running"||!b||document.hidden)return;let y=!1;const R=Et();return R.src=Xe(b),R.loop=!0,R.volume=.55,R.play().then(()=>{if(y)try{R.pause(),R.src=""}catch{}}).catch(()=>{}),()=>{y=!0;try{R.pause(),R.src=""}catch{}}},[a.stage]);const[p,u]=Z.useState(Date.now());Z.useEffect(()=>{const b=setInterval(()=>u(Date.now()),66);return()=>clearInterval(b)},[]);const g=Z.useMemo(()=>a.seed!=null?Gx(a.seed,r):null,[a.seed,r]),M=a.startedAt?(p-new Date(a.startedAt).getTime())/1e3:0,_=a.stage==="running"&&g,f=a.stage==="done",h=g&&M>=Math.max(...g.finish)+1;Z.useEffect(()=>{if(!_||!h||m.current||document.hidden)return;m.current=!0;const b=new Map(g.places.map((y,R)=>[y,R]));(async()=>{for(const y of l){const R=Number(y.answer_text)-1,v=b.get(R),C=v!=null?5-v:0;await Bn.patchAnswer(y.id,{is_correct:!0,stake:C})}await Bn.patchSession(Hs(),{melody:{...t.melody,race:{...a,stage:"done"}}})})()},[_,h]),Z.useEffect(()=>{!a.stage&&!document.hidden&&w()},[a.stage]);const S=()=>Tu(t),w=()=>wu(t);return o.jsxs("div",{className:"host-screen grid-bg race-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"qnum",children:e.title_lines.join(" ")||"СКАЧКИ БУЛЬДОГОВ"})}),(a.stage==="running"||f)&&o.jsxs("div",{className:"race-track hud-frame",children:[o.jsx("div",{className:"race-stands",children:Array.from({length:26},(b,y)=>o.jsx("span",{style:{animationDelay:`${y%5*.3}s`},children:["🎉","👏","🙌","⭐","🎊"][y%5]},y))}),o.jsx("div",{className:"race-finish"}),s.map((b,y)=>{const R=(_||f)&&g?g.progress(y,f?999:M):0,v=g&&(f||h)?g.places.indexOf(y):null,C=_&&!f?g==null?void 0:g.pausedAt(y,M):void 0,U=!!g&&M>=g.finish[y];return o.jsxs("div",{className:"race-lane",children:[o.jsx("span",{className:"race-num",children:y+1}),o.jsxs("div",{className:"race-dog",style:{left:`calc(${6+R*82}% )`},children:[C&&o.jsx("span",{className:"race-pause",children:C.icon}),o.jsx(Wx,{color:dl[y],running:!!_&&!h&&!C&&!U}),o.jsxs("span",{className:"race-name",children:[b,v!=null&&` · ${v+1} место`]})]}),o.jsx("span",{className:"race-treat",children:"🍖"})]},y)})]}),(!a.stage||a.stage==="betting")&&o.jsxs("div",{className:"race-panel",children:[o.jsx("div",{className:"mono-tag",children:"ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА · СТАВКИ ТАЙНЫЕ"}),o.jsx("div",{className:"race-lineup",children:s.map((b,y)=>o.jsxs("div",{className:"race-candidate",children:[o.jsx(Vx,{color:dl[y],n:y+1}),o.jsxs("span",{className:"race-tag",children:[o.jsxs("b",{children:["№",y+1]})," ",b]})]},y))}),o.jsxs("div",{className:"mono-tag",style:{color:l.length===c.length&&c.length>0?"var(--answer)":void 0},children:["СТАВКИ СДЕЛАЛИ: ",l.length," / ",c.length]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{disabled:l.length===0,onClick:()=>void S(),children:"🏁 Старт! (ставки закрываются)"})})]}),f&&g&&o.jsxs("div",{className:"race-result",children:[o.jsx("div",{className:"host-actions",children:o.jsx(Gn,{pack:n,gameState:t})}),o.jsxs("div",{className:"answer-reveal",style:{padding:"14px 30px"},children:[o.jsx("div",{className:"answer-label",children:"ПОБЕДИТЕЛЬ"}),o.jsxs("div",{className:"answer-main",children:["№",g.places[0]+1," ",s[g.places[0]]]})]}),o.jsx("div",{className:"mono-tag",children:g.places.map((b,y)=>`${y+1}. ${s[b]}`).join("  ·  ")})]})]})}function Vx({color:n,n:e}){const t=n.body;return o.jsxs("svg",{viewBox:"0 0 150 144",className:"bulldog-sit",children:[o.jsx("path",{d:"M75,60 C112,60 122,86 118,112 C116,128 34,128 32,112 C28,86 38,60 75,60 Z",fill:t}),o.jsx("ellipse",{cx:"34",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("ellipse",{cx:"116",cy:"112",rx:"17",ry:"13",fill:t}),o.jsx("path",{d:"M75,72 C89,72 93,96 91,118 C90,123 60,123 59,118 C57,96 61,72 75,72 Z",fill:"#fff",opacity:".88"}),o.jsx("rect",{x:"54",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("rect",{x:"83",y:"94",width:"13",height:"34",rx:"6.5",fill:t}),o.jsx("ellipse",{cx:"60.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("ellipse",{cx:"89.5",cy:"129",rx:"9",ry:"5.5",fill:"#fff"}),o.jsx("circle",{cx:"75",cy:"42",r:"34",fill:t}),o.jsx("path",{d:"M43,26 C29,11 33,-4 47,-2 C58,0 63,13 61,28 C56,34 47,34 43,26 Z",fill:t}),o.jsx("path",{d:"M107,26 C121,11 117,-4 103,-2 C92,0 87,13 89,28 C94,34 103,34 107,26 Z",fill:t}),o.jsx("path",{d:"M47,23 C38,12 41,1 49,2 C56,3 58,15 56,24 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M103,23 C112,12 109,1 101,2 C94,3 92,15 94,24 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"59",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("ellipse",{cx:"91",cy:"40",rx:"6.6",ry:"7.6",fill:"#241d22"}),o.jsx("circle",{cx:"61.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("circle",{cx:"93.4",cy:"37.2",r:"2.6",fill:"#fff"}),o.jsx("path",{d:"M53,52 C53,45 97,45 97,52 C97,66 87,73 75,73 C63,73 53,66 53,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"75",cy:"53",rx:"7.4",ry:"5.2",fill:"#3a2e33"}),o.jsx("path",{d:"M75,57 v6.5",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M65,64 Q70,69.5 75,65 Q80,69.5 85,64",fill:"none",stroke:"#3a2e33",strokeWidth:"2",strokeLinecap:"round"}),o.jsx("path",{d:"M51,71 C60,79 90,79 99,71 L99,78 C90,85 60,85 51,78 Z",fill:"#e63946"}),o.jsx("circle",{cx:"75",cy:"83",r:"10.5",fill:"#f5c542",stroke:"#c99a1e",strokeWidth:"2"}),o.jsx("text",{x:"75",y:"88.5",textAnchor:"middle",fontSize:"14.5",fontWeight:"700",fill:"#5a4210",children:e})]})}function Wx({color:n,running:e}){const t=n.body,i=n.mask;return o.jsxs("svg",{viewBox:"0 0 160 112",className:`bulldog${e?" run":""}`,children:[o.jsxs("g",{className:"bd-dust",children:[o.jsx("circle",{cx:"26",cy:"92",r:"3.4",fill:"#cfd8e3"}),o.jsx("circle",{cx:"18",cy:"86",r:"2.2",fill:"#cfd8e3"}),o.jsx("circle",{cx:"33",cy:"96",r:"1.9",fill:"#cfd8e3"})]}),o.jsxs("g",{className:"bd-speed",stroke:"#9fc3e8",strokeWidth:"2.2",strokeLinecap:"round",opacity:".5",children:[o.jsx("line",{x1:"6",y1:"46",x2:"26",y2:"46"}),o.jsx("line",{x1:"10",y1:"60",x2:"28",y2:"60"})]}),o.jsxs("g",{className:"bd-all",children:[o.jsx("path",{className:"bd-hind h2",d:"M64,74 Q60,84 63,92 Q64,96 71,96 L71,92 Q67,90 68,82 Q70,76 71,74 Z",fill:t}),o.jsx("path",{className:"bd-fore f2",d:"M101,72 Q106,82 104,90 Q105,94 112,94 L112,90 Q108,88 108,81 Q108,74 107,70 Z",fill:t}),o.jsx("path",{d:"M40,60 C36,42 54,34 74,34 C96,34 108,44 110,56 C112,70 100,81 80,82 C58,83 42,76 40,60 Z",fill:t}),o.jsx("path",{d:"M56,74 C66,80 88,80 100,72 C96,80 66,84 56,74 Z",fill:"#fff",opacity:".85"}),o.jsx("circle",{cx:"38",cy:"52",r:"4.5",fill:t,stroke:i,strokeWidth:"1"}),o.jsx("path",{className:"bd-hind h1",d:"M50,70 Q44,80 48,89 Q49,94 57,94 L57,89 Q52,88 53,80 Q56,73 58,70 Z",fill:t}),o.jsx("path",{className:"bd-fore f1",d:"M90,72 Q94,82 91,90 Q92,95 100,95 L100,90 Q96,88 97,80 Q99,74 98,71 Z",fill:t}),o.jsxs("g",{className:"bd-head",children:[o.jsx("circle",{cx:"118",cy:"44",r:"30",fill:t}),o.jsx("path",{d:"M88,32 C74,14 78,-2 92,-1 C103,0 108,14 106,30 C100,36 92,37 88,32 Z",fill:t}),o.jsx("path",{d:"M148,32 C162,14 158,-2 144,-1 C133,0 128,14 130,30 C136,36 144,37 148,32 Z",fill:t}),o.jsx("path",{d:"M92,28 C83,15 86,3 94,4 C101,5 103,17 101,27 Z",fill:"#f1b8c8"}),o.jsx("path",{d:"M144,28 C153,15 150,3 142,4 C135,5 133,17 135,27 Z",fill:"#f1b8c8"}),o.jsx("ellipse",{cx:"105",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("ellipse",{cx:"131",cy:"42",rx:"6",ry:"7",fill:"#241d22"}),o.jsx("circle",{cx:"107",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("circle",{cx:"133",cy:"39.5",r:"2.4",fill:"#fff"}),o.jsx("path",{d:"M100,52 C100,45 136,45 136,52 C136,64 128,71 118,71 C108,71 100,64 100,52 Z",fill:"#fff",opacity:".92"}),o.jsx("ellipse",{cx:"118",cy:"53",rx:"6.4",ry:"4.6",fill:"#3a2e33"}),o.jsx("path",{d:"M118,56.5 v6",stroke:"#3a2e33",strokeWidth:"1.8",strokeLinecap:"round"}),o.jsx("path",{d:"M110,62 Q114,67 118,63 Q122,67 126,62",fill:"none",stroke:"#3a2e33",strokeWidth:"1.9",strokeLinecap:"round"}),o.jsx("path",{className:"bd-tongue",d:"M112,65 Q118,76 124,65 Q122,71 118,71.5 Q114,71 112,65 Z",fill:"#ff8da1"})]})]})]})}function jx({pack:n,round:e,gameState:t,timerNode:i}){var U;const s=e.settings,r=t.melody??{},a=e.questions[t.question_index],c=((U=n.settings)==null?void 0:U.play_mode)==="paper",d=Jt(t.game_id),l=En(t.game_id,t.round_number),m=t.question_index+1>=e.questions.length,p=r.rv??{},u=a&&p.qid===a.id?p:{},g=a?l.filter(P=>P.question_ref===`q-${a.id}`):[],M=Z.useRef(r);M.current=r;const _=Z.useRef(void 0),f=Z.useRef(void 0);Z.useEffect(()=>{!a||p.qid===a.id||c&&!t.timer_started_at||pr(M.current,su(a.id,s))},[a==null?void 0:a.id,p.qid,c,t.timer_started_at]),Z.useEffect(()=>{if(!a||!u.phase||u.phase==="review")return;const P=`${u.qid}:${u.phase}`,F=ru(u);if(!F)return;const $=()=>{if(document.hidden||Date.now()<F||_.current===P)return;_.current=P;const I=u.phase===1&&!c&&lu(d.map(H=>H.id),g);pr(M.current,zo(u,s,I))};$();const D=window.setInterval($,300);return()=>clearInterval(D)},[a==null?void 0:a.id,u.qid,u.phase,u.startedAt,u.phaseSec]),Z.useEffect(()=>{!a||u.phase!=="review"||f.current===a.id||(f.current=a.id,g.forEach(P=>{if(P.is_correct!=null)return;const F=Ws(a.answer,P.answer_text);F!==null&&Bn.patchAnswer(P.id,{is_correct:F}).catch(()=>{})}))},[a==null?void 0:a.id,u.phase,g.length]),Z.useEffect(()=>()=>{Au(M.current)},[]);const h=(a==null?void 0:a.answer.mode)==="crossword_word"?a.answer.word:"",S=ir([h,u.phase]);if(!a)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"3 ПОПЫТКИ"}),o.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"})]});const w=(a.media.question??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),E=u.phase??1,b=au(w.length,E),y=ou(h),R=a.service.openLetters,v=()=>{if(u.phase==="review"){m||Ri(t.question_index+1);return}pr(r,zo(u,s,!1))};let C=-1;return o.jsxs("div",{className:"host-screen grid-bg has-media rv-screen",children:[o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"qnum",children:["Р",Fn(n,t.round_number)," · ВОПРОС"," ",o.jsx("b",{children:t.question_index+1})," / ",e.questions.length,u.phase!=="review"&&o.jsxs(o.Fragment,{children:[" · ФАЗА ",E]})]}),u.phase!=="review"&&u.phaseSec!=null&&i(u.phaseSec,`${u.qid}-${u.phase}`,u.phase===3)]}),o.jsx("div",{className:b<=3?`q-media-grid n${b} eq-row`:"q-media-grid rv-2x2",style:Zi(a),children:w.slice(0,b).map((P,F)=>o.jsx(Ki,{src:Xe(P)},F))}),o.jsx("div",{className:"rv-word-wrap",children:o.jsx("div",{className:"rv-word",ref:S,children:y.map((P,F)=>o.jsx("span",{className:"rv-group",children:P.map(($,D)=>{C++;const I=cu(C,R,E);return o.jsx("span",{className:`rv-cell${I?" open":""}`,children:I?$:"?"},D)})},F))})}),u.phase==="review"&&o.jsxs("div",{className:"rv-review",children:[o.jsx("div",{className:"rv-answer",children:h}),a.answer_note&&o.jsx("div",{className:"rv-note",children:a.answer_note})]}),u.phase==="review"&&o.jsx("div",{className:"rv-teams",children:g.map(P=>{const F=d.find($=>$.id===P.team_id);return o.jsxs("span",{style:{color:F==null?void 0:F.color},children:[(F==null?void 0:F.name)??"—",": ",P.answer_text||"—",P.stake!=null&&` · фаза ${P.stake}`,P.is_correct===!0?" ✓":P.is_correct===!1?" ✗":""]},P.id)})}),o.jsx("div",{className:"host-actions",children:u.phase==="review"&&m?o.jsx(Gn,{pack:n,gameState:t}):o.jsx("button",{onClick:v,children:"Дальше →"})})]})}function G_(){var d;const{gameState:n,loading:e,roomId:t}=Id(),[i,s]=Z.useState(null);if(Z.useEffect(()=>{n!=null&&n.pack_id?Du(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),!e&&!t)return o.jsx(Ud,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",a=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"",c=(n==null?void 0:n.phase)==="question"?`Q-${((n.round_number+1)*97+n.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null;return o.jsxs(Uu,{theme:r,isProjector:!0,phase:n==null?void 0:n.phase,children:[r==="new_year"&&o.jsx(Fu,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),o.jsx(Xx,{gameState:n,pack:i}),o.jsx($u,{theme:r,trigger:a,hud:c}),i&&o.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((d=i.settings)==null?void 0:d.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name}),o.jsx(Ru,{corner:!0})]})}function Qs({theme:n}){return n==="new_year"?o.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?o.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function ul({theme:n}){return n!=="classic"?null:o.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[o.jsx("span",{className:"cd-line"}),o.jsx("span",{className:"cd-chip",children:"◆"}),o.jsx("span",{className:"cd-line"})]})}function Xx({gameState:n,pack:e}){var h,S,w,E;const[t,i]=Z.useState([]),[s,r]=Z.useState("");Z.useEffect(()=>{Iu().then(i).catch(()=>i([]))},[]);const a=Jt((n==null?void 0:n.game_id)??null),c=Z.useMemo(()=>th(a),[a]),d=Z.useMemo(()=>{const b=`${location.origin}${location.pathname}#/player?room=${Hs()??""}`;return n!=null&&n.pack_id?`${b}&pack=${n.pack_id}`:b},[n==null?void 0:n.pack_id]),l=((n==null?void 0:n.random_groups)??[]).filter(b=>Array.isArray(b)&&b.length>0),m=l.map(b=>b.join(",")).join("|"),[p,u]=Z.useState(!0);Z.useEffect(()=>{u(!0)},[m]);const g=l.length>0&&p;if(l_((h=e==null?void 0:e.rounds)==null?void 0:h[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),d_(e,(n==null?void 0:n.round_number)??0),!n)return o.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const M=((S=e==null?void 0:e.settings)==null?void 0:S.play_mode)==="paper";if(n.phase==="lobby"||!n.pack_id||!e)return o.jsxs("div",{className:`host-screen grid-bg lobby-screen${M?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&o.jsx(c_,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?o.jsxs("div",{className:"cyber-lobby-head",children:[o.jsx(xl,{side:"left"}),o.jsxs("div",{className:"clh-title",children:[o.jsx(vn,{theme:"classic",lines:["QUIZ","PARTY"]}),o.jsx(ul,{theme:"classic"})]}),o.jsx(xl,{side:"right"})]}):o.jsxs(o.Fragment,{children:[o.jsx(vn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),o.jsx(Qs,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?o.jsxs(o.Fragment,{children:[g&&o.jsx(r_,{groups:l,onClose:()=>u(!1)}),l.length>0&&!p&&o.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>u(!0),children:"СОСТАВЫ КОМАНД"}),o.jsxs("div",{className:"lobby-teams",children:[a.length>0&&o.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?M?null:o.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):c.map(b=>o.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":b.color,opacity:Cu(b)?1:.4},children:[b.icon&&o.jsx("span",{className:"lobby-team-icon",children:b.icon}),b.name]},b.id))]}),!M&&o.jsx(Ou,{className:`lobby-qr-corner${g?" lobby-qr-lit":""}`,value:d,title:"QR для подключения"}),!M&&g&&o.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&na()},children:"⟲ Сменить пакет"}),o.jsx("button",{onClick:()=>{var b,y;return void((b=e==null?void 0:e.settings)!=null&&b.show_intro?Od():ea(0,ia((y=e==null?void 0:e.settings)==null?void 0:y.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):o.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[o.jsxs("select",{value:s,onChange:b=>r(b.target.value),style:{fontSize:"1.2rem"},children:[o.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(b=>o.jsxs("option",{value:b.id,children:[b.name," (",b.status==="ready"?"готов":b.status==="played"?"сыгран":b.status,")"]},b.id))]}),o.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const b=t.find(y=>y.id===s);b&&b.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Fd(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return o.jsx(Ax,{onDone:()=>{var b;ea(0,ia((b=e==null?void 0:e.settings)==null?void 0:b.info_slides,0)??void 0)}});const _=e.rounds[n.round_number];if(!_)return o.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const f=_.questions[n.question_index];if(n.phase==="round_intro"){const b=_.settings.grid;return o.jsxs("div",{className:"host-screen grid-bg round-intro",children:[_.rules_audio&&o.jsx("audio",{autoPlay:!0,src:Xe(_.rules_audio)}),e.theme==="potter"&&o.jsx("div",{className:"mg-veil","aria-hidden":!0}),_.mechanic==="crossword"&&b?o.jsxs("div",{className:"cw-layout",children:[o.jsx(Bu,{grid:b,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/b.cols,innerHeight*.8/b.rows))))}),o.jsxs("div",{className:"side",children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Fn(e,n.round_number)]}),o.jsx(vn,{theme:e.theme,lines:_.title_lines}),o.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:Ho(_)}),_.rules.map((y,R)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+R*.5}s`},children:[o.jsx("span",{className:"idx",children:String(R+1).padStart(2,"0")}),y]},R))]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"round-badge",children:[o.jsx("span",{className:"rb-word",children:"РАУНД"}),o.jsx("span",{className:"rb-num",children:Fn(e,n.round_number)})]}),o.jsxs("div",{className:"ri-main",children:[o.jsx(vn,{theme:e.theme,lines:_.title_lines}),o.jsx(Qs,{theme:e.theme}),o.jsx(ul,{theme:e.theme}),o.jsx("div",{className:"meta-line",children:Ho(_)})]}),_.rules.length>0&&o.jsxs("div",{className:"rules-frame","data-count":_.rules.length,children:[o.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),_.rules.map((y,R)=>o.jsxs("div",{className:"rule-item",style:{animationDelay:`${(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+R*.7}s`},children:[o.jsx("span",{className:"idx",children:String(R+1).padStart(2,"0")}),y]},R))]})]}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void Ri(0),children:_.mechanic==="jeopardy"?"Начать раунд →":_.mechanic==="race"?"К скачкам →":_.mechanic==="melody"?"К трекам →":_.mechanic==="four_pics"||_.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(n.phase==="question"&&_.mechanic==="sprint")return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx(lh,{pack:e,round:_,gameState:n,timerNode:o.jsx(Gs,{startedAt:n.timer_started_at,seconds:_.timer_seconds,theme:e.theme})}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{className:"ghost dark",onClick:()=>void Yi(0),children:"К ответам →"})})]});if(n.phase==="question"&&_.mechanic==="blitz")return o.jsx(p_,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="race")return o.jsx(Hx,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="melody")return o.jsx(Bx,{pack:e,round:_,gameState:n});if(n.phase==="question"&&_.mechanic==="four_pics")return o.jsx(jx,{pack:e,round:_,gameState:n,timerNode:(b,y,R)=>{var v,C;return o.jsx(Gs,{startedAt:((C=(v=n.melody)==null?void 0:v.rv)==null?void 0:C.startedAt)??null,seconds:b,theme:e.theme,chime:R},y)}});if(n.phase==="question"&&_.mechanic==="jeopardy")return o.jsx(S_,{pack:e,round:_,gameState:n});if(n.phase==="question"&&f){const b=f.media.question??[],y=b.filter(K=>!/\.(mp3|mp4|webm|wav)$/i.test(K)),R=b.filter(K=>/\.(mp3|mp4|webm|wav)$/i.test(K)),v=!!f.question_text.trim()&&y.length===1&&!f.media.hidden,C=f.answer.mode==="choice"||f.answer.mode==="order"?f.answer.choices:null,U=e.theme==="new_year",P=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>_.timer_seconds-10,F=e.theme==="classic",$=!!f.question_text.trim(),I=e.theme==="potter"&&_.mechanic!=="rebus"?"mg-frame":U&&_.mechanic!=="rebus"?`q-frame${P?" low":""}`:F?"cyber-frame":"",H=!f.media.hidden&&y.length>1&&(f.answer.mode==="choice"&&f.answer.choices.length===y.length||f.answer.mode==="match"&&f.answer.left.length===y.length),k=((w=e.settings)!=null&&w.answers_reveal&&_.answers_reveal==="after_question",_.answers_reveal??"after_round");return o.jsxs("div",{className:`host-screen grid-bg${$?"":" no-qtext"}${y.length&&!f.media.hidden?" has-media":""}${C&&!H||f.answer.mode==="match"&&(f.answer.right_labels??[]).some(Boolean)?" has-choices":""}`,children:[o.jsx(no,{}),_.mechanic!=="jeopardy"&&o.jsxs(o.Fragment,{children:[o.jsx(g_,{startedAt:n.timer_started_at,seconds:_.timer_seconds,q:f,round:_,pack:e,timerRunning:!!n.timer_started_at,manual:M,gameId:n.game_id,roundNumber:n.round_number}),o.jsx(y_,{round:_,gameState:n,isLast:n.question_index+1>=_.questions.length}),o.jsx(M_,{enabled:k==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:_.timer_seconds})]}),o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"qnum",children:["Р",Fn(e,n.round_number)," · ВОПРОС"," ",o.jsx("b",{children:n.question_index+1})," / ",_.questions.length]}),_.mechanic!=="jeopardy"&&o.jsx(Gs,{startedAt:n.timer_started_at,seconds:_.timer_seconds,theme:e.theme},f.id)]}),v?o.jsxs("div",{className:"q-split",children:[o.jsxs("div",{className:I,children:[U&&o.jsx(hl,{seed:f.id,low:P}),F&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),F&&o.jsx("span",{className:"cf-hud-corner","aria-hidden":"true",children:"SYS.QUERY"}),o.jsx(fl,{text:f.question_text},f.id)]}),o.jsx("div",{className:"q-media-grid n1",style:Zi(f),children:y.map((K,re)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:Xe(K),alt:""}),f.answer.mode==="match"&&o.jsx("figcaption",{children:re+1})]},re))})]}):o.jsxs(o.Fragment,{children:[$&&o.jsxs("div",{className:I,children:[U&&o.jsx(hl,{seed:f.id,low:P}),F&&o.jsx("span",{className:"cf-scan","aria-hidden":"true"}),F&&o.jsx("span",{className:"cf-hud-corner","aria-hidden":"true",children:"SYS.QUERY"}),o.jsx(fl,{text:f.question_text},f.id)]}),!f.media.hidden&&y.length>0&&(H?o.jsx("div",{className:`img-answers n${Math.min(y.length,5)}${y.length>1?" eq-row":""}`,children:y.map((K,re)=>{var fe,pe;return o.jsx(a_,{src:Xe(K),badge:f.answer.mode==="match"?String(re+1):((fe=C==null?void 0:C[re])==null?void 0:fe.key)??"",children:f.answer.mode==="choice"&&((pe=C==null?void 0:C[re])==null?void 0:pe.text)&&o.jsx("span",{className:"ia-text",children:C[re].text})},re)})}):o.jsx("div",{className:`q-media-grid n${Math.min(y.length,4)}${_.mechanic==="rebus"?" rebus":""}${y.length>1?" eq-row":""}${y.length>4?" wrap2":""}`,style:Zi(f),children:y.map((K,re)=>o.jsx(Ki,{src:Xe(K)},re))}))]}),R.map((K,re)=>/\.(mp4|webm)$/i.test(K)?o.jsx(m_,{src:Xe(K),hidden:!!f.media.hidden,waitFor:!!f.media.voice,go:!!n.timer_started_at},re):null),f.answer.mode==="match"&&(f.answer.right_labels??[]).some(Boolean)&&o.jsx("div",{className:`choices-grid${eo(f.answer.right_labels??[])}`,children:f.answer.right.map((K,re)=>{var fe;return o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+re*.3}s`},children:[o.jsx("span",{className:"key",children:K}),((fe=f.answer.right_labels)==null?void 0:fe[re])??""]},K)})}),C&&!H&&o.jsx("div",{className:`choices-grid${eo(C.map(K=>K.text))}`,children:C.map((K,re)=>o.jsxs("div",{className:"choice-plate",style:{animationDelay:`${.3+re*.35}s`},children:[o.jsx("span",{className:"key",children:K.key}),K.text]},K.key))}),(k==="after_question"||_.mechanic==="jeopardy")&&n.reveal&&o.jsxs("div",{className:"answer-reveal hud-frame",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",children:ts(f)}),f.answer_note&&o.jsx("div",{style:{opacity:.75},children:f.answer_note}),(()=>{const K=f.media.answer??[],re=K.filter(pe=>!/\.(mp3|wav|m4a|ogg)$/i.test(pe)),fe=K.find(pe=>/\.(mp3|wav|m4a|ogg)$/i.test(pe));return o.jsxs(o.Fragment,{children:[fe&&o.jsx(Sd,{src:Xe(fe)}),re.length>0&&o.jsx("div",{className:"q-media-grid",style:{maxHeight:"26vh"},children:re.map((pe,Ee)=>o.jsx("img",{src:Xe(pe),alt:""},Ee))})]})})()]}),o.jsxs("div",{className:"host-actions",children:[o.jsx(qx,{gameState:n}),(k==="after_question"||_.mechanic==="jeopardy")&&!n.reveal&&o.jsx("button",{onClick:()=>void Vs(),children:"Показать ответ"}),n.question_index+1<_.questions.length?o.jsx("button",{onClick:()=>void Ri(n.question_index+1),children:"Дальше →"}):k==="after_round"?o.jsx("button",{onClick:()=>void bl(),children:"Время ответов →"}):o.jsx(Gn,{pack:e,gameState:n})]})]})}if(n.phase==="info"){const b=((E=e==null?void 0:e.settings)==null?void 0:E.info_slides)??[],y=b[n.question_index]??b[0];if(y)return o.jsx(u_,{pack:e,slide:y,packId:n.pack_id,gameState:n})}return n.phase==="recap"?o.jsx(o_,{pack:e,round:_,gameState:n}):n.phase==="answer_time"?o.jsx(x_,{pack:e,round:_,gameState:n}):n.phase==="show_answers"&&f?o.jsx(__,{pack:e,round:_,q:f,gameState:n}):n.phase==="scoreboard"?o.jsx(w_,{pack:e,gameState:n}):n.phase==="break"?o.jsx(T_,{pack:e,round:_,gameState:n}):n.phase==="counting"?o.jsx(A_,{pack:e,gameState:n}):n.phase==="finale"?o.jsx(R_,{pack:e,gameId:n.game_id,gameState:n}):o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!f&&o.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void nr("round_intro"),children:"← К титулу раунда"})})]})}function qx({gameState:n}){return n.question_index>0?o.jsx("button",{className:"ghost",onClick:()=>void Ri(n.question_index-1),children:"← Назад"}):o.jsx("button",{className:"ghost",onClick:()=>void nr("round_intro"),children:"← К титулу"})}function hl({seed:n,low:e}){const t=Z.useMemo(()=>{let i=0;for(const a of n)i=i*31+a.charCodeAt(0)>>>0;const s=()=>(i=i*1664525+1013904223>>>0,i/4294967296),r=60;return Array.from({length:r},(a,c)=>({left:(c+.5)*(100/r)+(s()-.5)*2.5,len:8+s()*34,delay:s()*.5,sway:3+s()*3}))},[n]);return o.jsx("div",{className:"icicles",children:t.map((i,s)=>o.jsx("span",{className:"icicle",style:{left:`${i.left}%`,height:i.len,"--len":`${i.len}px`,animationDelay:`${i.delay}s, ${i.delay}s`,animationDuration:`${i.sway}s, .7s`}},s))})}function $x(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function eo(n){const e=Math.max(0,...n.map(t=>(t??"").trim().length));return e<=28?"":e<=55?" c-m":e<=95?" c-l":" c-xl"}function fl({text:n}){const e=n.split(/(\s+)/);let t=0;const i=ir([n]);return o.jsx("p",{ref:i,className:`q-text${Ci(n)}`,children:e.map((s,r)=>{if(/^\s+$/.test(s))return s;const a=.12*t++;return o.jsx("span",{className:"q-word",style:{animationDelay:`${a}s`},children:s},r)})})}function Yx(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const vn=Z.forwardRef(function({theme:e,lines:t},i){const s=Yx(t),r=t.join(`
`),a=Cl(r,e==="classic"),c=e==="classic"?a.split(`
`):t;if(e!=="new_year")return o.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,m)=>o.jsxs("span",{style:m===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[m]??l,o.jsx("br",{})]},m))});let d=0;return o.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,m)=>o.jsx("span",{style:{display:"block"},children:[...l].map((p,u)=>p===" "?o.jsx("span",{children:" "},u):o.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*d++}s`},children:p},u))},m))})});function Zx(){Nl()}function Kx(){try{const n=window.AudioContext??window.webkitAudioContext,e=new n,t=e.currentTime,i=e.createGain();i.gain.value=.5,i.connect(e.destination);const s=(r,a,c,d,l)=>{const m=e.createOscillator(),p=e.createGain();m.type=d,m.frequency.setValueAtTime(r,t+a),p.gain.setValueAtTime(1e-4,t+a),p.gain.linearRampToValueAtTime(l,t+a+.008),p.gain.setValueAtTime(l,t+a+c-.05),p.gain.exponentialRampToValueAtTime(1e-4,t+a+c),m.connect(p),p.connect(i),m.start(t+a),m.stop(t+a+c+.02)};for(let r=0;r<5;r++)s(1046.5,r*.22,.11,"square",.3);s(784,1.2,1.25,"square",.26),s(392,1.2,1.25,"sine",.3),setTimeout(()=>void e.close(),3e3)}catch{}}function Gs({startedAt:n,seconds:e,theme:t,chime:i=!0,variant:s}){const[r,a]=Z.useState(e),c=Z.useRef(!1);Z.useEffect(()=>{if(!n){a(e),c.current=!1;return}const m=()=>{const u=(Date.now()-new Date(n).getTime())/1e3,g=Math.max(0,Math.ceil(e-u));a(g),g===0&&i&&!c.current&&(c.current=!0,Kx())};m();const p=setInterval(m,250);return()=>clearInterval(p)},[n,e,i]);const d=r<=10;if(t==="new_year"){const p=2*Math.PI*44,u=Math.max(0,Math.min(1,r/e)),g=Array.from({length:40},(_,f)=>{const h=f/40*Math.PI*2,S=7+f%3*3;return{x1:55+Math.cos(h)*39,y1:55+Math.sin(h)*39,x2:55+Math.cos(h)*(44+S-5),y2:55+Math.sin(h)*(44+S-5),rot:h*180/Math.PI}}),M=Array.from({length:7},(_,f)=>{const h=f/7*Math.PI*2+.4;return{cx:55+Math.cos(h)*44,cy:55+Math.sin(h)*44}});return o.jsxs("div",{className:`ny-wreath${d?" low":""}`,children:[o.jsxs("svg",{viewBox:"0 0 110 110",children:[g.map((_,f)=>o.jsx("line",{x1:_.x1,y1:_.y1,x2:_.x2,y2:_.y2,stroke:f%4===0?"#1f6b3a":"#2f8f4e",strokeWidth:"3",strokeLinecap:"round"},f)),o.jsx("circle",{className:"wr-bg",cx:"55",cy:"55",r:44}),o.jsx("circle",{className:"wr-fg",cx:"55",cy:"55",r:44,strokeDasharray:p,strokeDashoffset:p*(1-u)}),M.map((_,f)=>o.jsx("circle",{className:"wr-berry",cx:_.cx,cy:_.cy,r:"3.4"},f)),o.jsx("path",{className:"wr-bow",d:"M46,99 q9,-9 18,0 q-9,5 -18,0"})]}),o.jsx("span",{className:"val",children:r})]})}if(t==="potter"&&s==="ring")return o.jsx("div",{className:`timer-wrap${d?" low":""}`,children:o.jsx("span",{className:`timer-num${d?" danger":""}`,children:r})});if(t==="potter")return o.jsx(sr,{left:r,seconds:e,low:d});const l=!!n&&r>0;return o.jsxs("div",{className:`timer-wrap${d?" low":""}${l?"":" paused"}${n?"":" not-started"}`,children:[o.jsx("span",{className:"tm-orbit","aria-hidden":"true",children:o.jsx("i",{className:"tm-spark"})}),o.jsx("span",{className:`timer-num${d?" danger":""}`,children:r})]})}function Jx(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?o.jsxs(o.Fragment,{children:[s,o.jsx("b",{className:"rebus-hot",children:r})]}):o.jsxs(o.Fragment,{children:[o.jsx("b",{className:"rebus-hot",children:r}),s]})}function Qx(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}const e_=5e3,Md=3300,t_=500,n_=900,pl=100,ml=600,gl=500;function i_(n){const e=n.answer;return e.mode==="choice"?Md+t_+n_:e.mode==="match"?pl+ml*Math.max(0,Math.min(e.left.length,6)-1)+gl:e.mode==="order"?pl+ml*Math.max(0,e.correct_order.length-1)+gl:1200}function s_({src:n}){const e=Z.useRef(null);return Z.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),o.jsx("div",{className:"reveal-video",children:o.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function yd(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function Sd({src:n}){return Z.useEffect(()=>{if(document.hidden)return;let e=!1;const t=Et();return t.src=n,t.loop=!1,t.play().then(()=>{if(e)try{t.pause(),t.src=""}catch{}}).catch(()=>{}),()=>{e=!0;try{t.pause(),t.src=""}catch{}}},[n]),null}function xl({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return o.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[o.jsx("span",{className:"cp-bar"}),o.jsx("div",{className:"cp-rows",children:e.map((t,i)=>o.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),o.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>o.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function r_({groups:n,onClose:e}){Z.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return o.jsx("div",{className:"groups-overlay",onClick:e,children:o.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[o.jsxs("div",{className:"gm-head",children:[o.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),o.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),o.jsx("div",{className:"lg-list",children:n.map((i,s)=>o.jsxs("div",{className:"lg-team",children:[o.jsxs("div",{className:"lg-name",style:{color:Bd(s)},children:["Команда ",s+1]}),o.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function a_({src:n,badge:e,children:t}){const[i,s]=Z.useState(1.5);return o.jsxs("div",{className:"img-answer",style:{flexGrow:i,flexBasis:0},children:[o.jsxs("span",{className:"ia-frame",children:[o.jsx("span",{className:"ia-key",children:e}),o.jsx("img",{src:n,alt:"",onLoad:r=>{const a=r.currentTarget;a.naturalWidth&&a.naturalHeight&&s(a.naturalWidth/a.naturalHeight)}})]}),t]})}function o_({pack:n,round:e,gameState:t}){const i=Z.useMemo(()=>e.questions.filter(u=>!u.hidden),[e.questions]),[s,r]=Z.useState(0),a=i[s],c=s+1>=i.length,d=()=>void bl(),l=()=>{c?d():r(u=>u+1)};if(Z.useEffect(()=>{if(!a){d();return}let u=!0;const g=()=>{u&&l()},M=setTimeout(g,e_),_=a.media.voice;if(!_)return()=>{u=!1,clearTimeout(M)};let f=!1;const h=Et();h.src=Xe(_),h.play().then(()=>{if(f)try{h.pause(),h.src=""}catch{}}).catch(()=>{});const S=()=>{clearTimeout(M),g()};return h.addEventListener("ended",S),()=>{u=!1,f=!0,clearTimeout(M),h.removeEventListener("ended",S);try{h.pause(),h.src=""}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const m=(a.media.question??[]).filter(u=>!/\.(mp3|wav|mp4|webm)$/i.test(u)),p=!!a.question_text.trim();return o.jsxs("div",{className:`host-screen grid-bg recap-screen${m.length?" has-media":""}${p?"":" no-qtext"}`,children:[o.jsxs("div",{className:"host-topbar",children:[o.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),o.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),o.jsxs("div",{className:"recap-body",children:[p&&o.jsx("p",{className:`q-text${Ci(a.question_text)}`,children:a.question_text}),m.length>0&&o.jsx("div",{className:`q-media-grid n${Math.min(m.length,4)}${m.length>1?" eq-row":""}${m.length>4?" wrap2":""}`,style:Zi(a),children:m.map((u,g)=>o.jsx(Ki,{src:Xe(u)},g))})]},a.id),o.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((u,g)=>o.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost",onClick:d,children:"Пропустить повтор"}),o.jsx("button",{onClick:l,children:c?"К ответам →":"Следующий →"})]})]})}function c_({pack:n}){var e,t;return Z.useEffect(()=>{var c,d;const i=((c=n==null?void 0:n.settings)==null?void 0:c.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=Et();s.src=Xe(i),s.loop=!0,s.volume=.45;let r=!1;const a=()=>{r||(r=!0,s.play().catch(()=>{}),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a))};return s.play().then(()=>{r=!0}).catch(()=>{window.addEventListener("pointerdown",a),window.addEventListener("keydown",a)}),()=>{window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a);try{s.pause()}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}function l_(n,e){Z.useEffect(()=>{if(!n)return;const i=n.questions.filter(a=>!a.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const a of s){const c=Xe(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const d=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");d.preload="auto",d.src=c,r.push(d)}else{const d=new Image;d.src=c,r.push(d)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[n,e])}function d_(n,e){Z.useEffect(()=>{if(!n)return;const t=[n.rounds[e],n.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const i=[...du({id:n.id,rounds:t})];return uu(i),()=>hu(i)},[n,e])}function u_({pack:n,slide:e,packId:t,gameState:i}){var c,d;const s=n.rounds.filter(l=>!l.off_scoreboard).map(l=>({id:l.id,name:(l.title_lines??[]).join(" ")||"—",count:l.questions.filter(m=>!m.hidden).length})),r=Jt(i.game_id),a=tu(n,r.length);return o.jsxs(o.Fragment,{children:[o.jsx(nu,{slide:e,rounds:s,stats:a,mediaUrl:Xe}),o.jsx("div",{className:"host-actions",children:o.jsx(f_,{slides:((c=n.settings)==null?void 0:c.info_slides)??[],index:h_(n,e),packId:t,paper:((d=n.settings)==null?void 0:d.play_mode)==="paper"})})]})}function h_(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function f_({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return o.jsxs(o.Fragment,{children:[e>0&&o.jsx("button",{className:"ghost",onClick:()=>void bi(e-1),children:"← Назад"}),e+1<n.length&&o.jsx("button",{className:"ghost",onClick:()=>void bi(e+1),children:"Дальше →"}),s?i?o.jsx("button",{onClick:()=>void eu(),children:"К подсчёту →"}):o.jsx("button",{onClick:()=>void tr(t),children:"К итогам →"}):o.jsx("button",{onClick:()=>void nr("round_intro"),children:"К раунду →"})]})}function p_({pack:n,round:e,gameState:t}){var h;const{state:i,setState:s}=zd(t.game_id,t.round_number),r=Jt(t.game_id),a=En(t.game_id,t.round_number,400),c=Z.useMemo(()=>e.questions.map(S=>({id:S.id,hidden:S.hidden})),[e.questions]),d=e.settings;Z.useEffect(()=>{var b;const S=d.bg_music??((b=n.settings)==null?void 0:b.bg_music);if(!S)return;let w=!1;const E=Et();return E.src=Xe(S),E.loop=!0,E.volume=.6,E.play().then(()=>{if(w)try{E.pause(),E.src=""}catch{}}).catch(()=>{}),()=>{w=!0;try{E.pause(),E.src=""}catch{}}},[e.id,d.bg_music,(h=n.settings)==null?void 0:h.bg_music]);const l=Z.useRef(!1),m=async S=>{if(!l.current){l.current=!0,s(S);try{await Zd(t.game_id,t.round_number,S),S.finished&&!(i!=null&&i.finished)&&await Kd(t.game_id,t.round_number,Go(Bo(S),d.timeoutPenalty??10))}finally{l.current=!1}}};Z.useEffect(()=>{if(i||r.length<2)return;const S=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(E=>E.id);m(kd(w,d.teamSeconds??60))},3e3);return()=>clearTimeout(S)},[i,r.length]),Z.useEffect(()=>{if(!i||i.finished||i.current)return;const S=setTimeout(()=>{const w=Gd(c,i.used);if(!w)return void m(Lo(i));fu(w.id).catch(()=>{}),m(Hd(i,w.id,Date.now()))},Do);return()=>clearTimeout(S)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const p=i==null?void 0:i.current,u=p?e.questions.find(S=>S.id===p.questionId):void 0,g=i?Ml(i):void 0;Z.useEffect(()=>{if(!i||!p||!u||!g)return;const S=a.find(E=>E.team_id===g&&E.question_ref===`q-${u.id}`);if(!(S!=null&&S.answer_text)||p.lastAnswer===S.answer_text)return;if(S.answer_text===Vd){m(Io(fr(i,Date.now()),Date.now()));return}const w=Ws(u.answer,S.answer_text)===!0;m(Wd(i,Date.now(),w?"ok":"no",S.answer_text))},[a,p==null?void 0:p.questionId,p==null?void 0:p.lastAnswer]);const M=(p==null?void 0:p.verdict)==="no"&&p.attempts+1>=Uo;if(Z.useEffect(()=>{if(!i||!(p!=null&&p.verdict))return;const w=Math.max(0,(M?Jd:Do)-(Date.now()-(p.pausedAt??Date.now()))),E=setTimeout(()=>{const b=Date.now(),y=fr(i,b),R=a.find(v=>v.team_id===g&&v.question_ref===`q-${p.questionId}`);R&&Bn.patchAnswer(R.id,{is_correct:p.verdict==="ok"}).catch(()=>{}),m(p.verdict==="ok"?Fo(y,b):Oo(y,b))},w);return()=>clearTimeout(E)},[p==null?void 0:p.verdict,p==null?void 0:p.lastAnswer]),!i)return o.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[o.jsx("div",{className:"host-topbar",children:o.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),o.jsx(Wo,{teams:r,rolling:!0})]});if(i.finished){const S=Go(Bo(i),d.timeoutPenalty??10);return o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),o.jsxs("table",{className:"score-table",children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),o.jsx("th",{children:"Очки"}),o.jsx("th",{children:"Баллы"})]})}),o.jsx("tbody",{children:S.map(w=>{var E;return o.jsxs("tr",{children:[o.jsxs("td",{children:[w.place,w.shared?"=":""]}),o.jsx("td",{children:((E=r.find(b=>b.id===w.teamId))==null?void 0:E.name)??"—"}),o.jsx("td",{children:w.points}),o.jsx("td",{children:w.score})]},w.teamId)})})]}),o.jsx("div",{className:"host-actions",children:o.jsx(Gn,{pack:n,gameState:t})})]})}const _=i.current!=null||Object.values(i.correct).some(S=>S>0)||Object.values(i.missed).some(S=>S>0),f=!p&&i.lastReveal?(()=>{const S=e.questions.find(w=>w.id===i.lastReveal.questionId);if(S)return{questionText:S.question_text,answerText:ts(S),verdict:i.lastReveal.verdict}})():void 0;return o.jsxs(o.Fragment,{children:[o.jsx(Hu,{teams:r,state:i,bank:c,questionText:u==null?void 0:u.question_text,verdict:p==null?void 0:p.verdict,reveal:f,answerText:(p==null?void 0:p.verdict)==="ok"||(p==null?void 0:p.verdict)==="no"&&p.attempts+1>=Uo?ts(u):void 0,dice:_?void 0:o.jsx(Wo,{teams:r,rolling:!1,pickedId:i.order[0]})}),o.jsxs("div",{className:"host-actions",children:[(p==null?void 0:p.verdict)&&o.jsxs("button",{className:"ghost",onClick:()=>{const S=Date.now(),w=fr(i,S);m(p.verdict==="ok"?Oo(w,S):Fo(w,S))},children:["Исправить на «",p.verdict==="ok"?"неверно":"верно","»"]}),p&&p.verdict!=="ok"&&o.jsx("button",{className:"ghost",onClick:()=>void m(Io(i,Date.now())),children:"Скип −1"}),o.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&m(Lo(i))},children:"Завершить раунд"})]})]})}function ts(n){const e="⚠ ответ не заполнен в редакторе",t=n.answer,i=t.display;return Array.isArray(i)?i.join(" · "):typeof i=="string"&&i?i:typeof t.correct=="string"&&t.correct?String(t.correct).split("/")[0].trim():typeof t.word=="string"&&t.word?t.word.toUpperCase():typeof t.correct_choice=="string"&&t.correct_choice?t.correct_choice:typeof t.correct_order=="string"&&t.correct_order?t.correct_order:Array.isArray(t.correct_pairs)&&t.correct_pairs.length?t.correct_pairs.join("  "):e}function m_({src:n,hidden:e,waitFor:t,go:i}){const s=Z.useRef(null);return Z.useEffect(()=>{var r;t&&!i||(r=s.current)==null||r.play().catch(()=>{})},[t,i]),o.jsx("video",{ref:s,src:n,controls:!e,autoPlay:!t,style:e?{width:1,height:1,opacity:0}:{maxHeight:"46vh",borderRadius:14}})}function g_({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:a=!1,gameId:c,roundNumber:d}){const l=(n.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),m=Z.useRef(null),p=Z.useRef(null),u=Z.useRef(!1);return Z.useEffect(()=>{if(Zx(),a&&!l||t)return;let g=!1;const M=(n.media.question??[]).find(h=>/\.(mp3|wav|m4a|ogg)$/i.test(h));u.current=!1;const _=()=>{if(!g){if(u.current=!0,M){const h=Et();h.src=Xe(M),p.current=h,h.play().catch(()=>{})}ta(c&&d!=null?{gameId:c,roundNumber:d,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){_();return}const f=Et();return f.src=Xe(n.media.voice),m.current=f,f.onended=_,f.onerror=_,f.play().then(()=>{if(g)try{f.pause(),f.src=""}catch{}}).catch(_),()=>{var S;g=!0;const h=m.current;if(h){h.onended=null,h.onerror=null;try{h.pause(),h.src=""}catch{}}m.current=null,(S=p.current)==null||S.pause()}},[n.id,a]),Z.useEffect(()=>{if(!a||!t||l)return;let g=!1;const M=(n.media.question??[]).find(f=>/\.(mp3|wav|m4a|ogg)$/i.test(f)),_=()=>{if(g||!M)return;const f=Et();f.src=Xe(M),p.current=f,f.play().catch(()=>{})};if(n.media.voice){const f=Et();f.src=Xe(n.media.voice),m.current=f,f.onended=_,f.onerror=_,f.play().then(()=>{if(g)try{f.pause(),f.src=""}catch{}}).catch(_)}else _();return()=>{var h;g=!0;const f=m.current;if(f){f.onended=null,f.onerror=null;try{f.pause(),f.src=""}catch{}}m.current=null,(h=p.current)==null||h.pause()}},[n.id,a,t]),Z.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const M=m.current;M&&!M.paused&&!M.ended||ta(c&&d!=null?{gameId:c,roundNumber:d,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(g)},[n.id,t,a]),Z.useEffect(()=>{var E;const g=e.settings.bg_music??((E=i==null?void 0:i.settings)==null?void 0:E.bg_music);if(!t||!g||l)return;let M=!1;const _=Et();_.src=Xe(g),_.loop=!0,_.volume=.6,_.play().then(()=>{if(M)try{_.pause(),_.src=""}catch{}}).catch(()=>{});let f;const h=(r??e.timer_seconds??60)*1e3,S=s?h-(Date.now()-new Date(s).getTime()):h,w=window.setTimeout(()=>{f=window.setInterval(()=>{_.volume=Math.max(0,_.volume-.1),_.volume<=.01&&(f&&clearInterval(f),_.pause())},80)},Math.max(0,S)+3e3);return()=>{M=!0,clearTimeout(w),f&&clearInterval(f);try{_.pause(),_.src=""}catch{}}},[t,n.id]),null}function x_({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=Jt(t.game_id),a=En(t.game_id,t.round_number),c=e.questions.filter(l=>!l.hidden).length;return Z.useEffect(()=>{var u;const l=e.settings.bg_music??((u=n.settings)==null?void 0:u.bg_music);if(!l)return;let m=!1;const p=Et();return p.src=Xe(l),p.loop=!0,p.volume=.6,p.play().then(()=>{if(m)try{p.pause(),p.src=""}catch{}}).catch(()=>{}),()=>{m=!0;try{p.pause(),p.src=""}catch{}}},[e.id]),o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[o.jsxs("div",{className:"mono-tag",children:["РАУНД ",Fn(n,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),o.jsx("div",{className:"answer-pulse",children:o.jsx(vn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),o.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),o.jsx(Gs,{startedAt:t.timer_started_at,seconds:i,theme:n.theme,variant:"ring"}),!s&&o.jsx("div",{className:"answer-time-teams",children:r.map(l=>{const m=a.filter(u=>{var g;return u.team_id===l.id&&((g=u.answer_text)==null?void 0:g.trim())}).length,p=m>=c;return o.jsxs("div",{className:`at-team${p?" done":""}`,children:[o.jsx("span",{style:{color:l.color},children:l.name})," · ",m,"/",c]},l.id)})}),o.jsxs("div",{className:"host-actions",children:[o.jsx("button",{className:"ghost dark",onClick:()=>void Ri(e.questions.length-1),children:"← Назад"}),o.jsx("button",{onClick:()=>void Yi(0),children:"К ответам →"})]})]})}function __({pack:n,round:e,q:t,gameState:i}){var y;const s=((y=n.settings)==null?void 0:y.play_mode)==="paper",r=En(i.game_id,i.round_number),a=i.reveal,c=Jt(i.game_id),[d,l]=Z.useState([]);Z.useEffect(()=>{Nd.from("teams").select("id,name,color").then(({data:R})=>l(R??[]))},[]);const m=r.filter(R=>R.question_ref===`q-${t.id}`),p=e.questions.length,u=i.question_index;Z.useEffect(()=>{if(a||document.hidden)return;const R=setTimeout(()=>{Vs()},3e3);return()=>clearTimeout(R)},[a,u]);const[g,M]=Z.useState(!1);Z.useEffect(()=>{if(M(!1),!a)return;const R=setTimeout(()=>M(!0),i_(t)+600);return()=>clearTimeout(R)},[a,t.id]),Z.useEffect(()=>{!g||document.hidden||m.forEach(R=>{if(R.is_correct!=null)return;const v=Ws(t.answer,R.answer_text);v!==null&&Bn.patchAnswer(R.id,{is_correct:v}).catch(()=>{})})},[g,u,m.length,m.map(R=>R.answer_text).join("|")]);const _=t.answer.mode==="choice"?t.answer.choices:null,f=(t.media.question??[]).filter(R=>!/\.(mp3|mp4|webm|wav)$/i.test(R)),h=(t.media.answer??[]).filter(R=>!/\.(mp3|mp4|webm|wav)$/i.test(R)),S=(t.media.question??[]).filter(R=>!/\.(mp3|mp4|webm|wav)$/i.test(R)),w=h.length?h:S,E=t.media.hidden?(t.media.question??[]).find(R=>/\.(mp4|webm)$/i.test(R)):void 0,b=(t.media.answer??[]).find(R=>/\.(mp3|wav|m4a|ogg)$/i.test(R));return o.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[o.jsxs("div",{className:"host-topbar",children:[o.jsxs("span",{className:"mono-tag",children:["РАУНД ",Fn(n,i.round_number)," :: ОТВЕТЫ"]}),o.jsxs("span",{className:"qnum",children:["ВОПРОС ",o.jsx("b",{children:u+1})," / ",p]})]}),o.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[o.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&o.jsxs(o.Fragment,{children:[o.jsx("p",{className:`q-text${Ci(t.question_text)}`,children:t.question_text}),S.length>0&&!t.media.hidden&&o.jsx("div",{className:`q-media-grid n${Math.min(S.length,4)}${S.length>1?" eq-row":""}${S.length>4?" wrap2":""}`,style:Zi(t),children:S.map((R,v)=>o.jsx(Ki,{src:Xe(R)},v))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&o.jsx("p",{className:`q-recall${Ci(t.question_text)}`,children:t.question_text}),a&&o.jsxs("div",{className:"answer-block reveal-in",children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),E&&o.jsx(s_,{src:Xe(E)}),b&&o.jsx(Sd,{src:Xe(b)}),e.mechanic==="rebus"?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:ts(t)}),o.jsx("div",{className:"rebus-answer",children:S.slice(0,2).map((R,v)=>o.jsxs("figure",{className:"q-img",children:[o.jsx("img",{src:Xe(R),alt:""}),o.jsx("figcaption",{children:Jx(v===0?t.service.word1:t.service.word2,v===0)})]},v))})]}):t.answer.mode==="match"?o.jsx(E_,{q:t}):_&&f.length===_.length?o.jsx(_l,{q:t,choices:_,imgs:f,theme:n.theme}):_?o.jsx(_l,{q:t,choices:_,theme:n.theme}):t.answer.mode==="order"?o.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((R,v)=>{const C=t.answer.choices.find(U=>U.key===R);return o.jsxs("div",{className:"oi",children:[o.jsx("b",{children:R}),o.jsx("span",{className:"oi-pos",children:v+1}),o.jsx("span",{className:"oi-text",children:(C==null?void 0:C.text)??""})]},v)})}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"answer-main",children:ts(t)}),w.length>0&&o.jsx("div",{className:`q-media-grid answer-media n${Math.min(w.length,4)}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,children:w.map((R,v)=>o.jsx(Ki,{src:Xe(R)},v))})]}),g&&t.answer_note&&o.jsx("div",{className:`answer-note${$x(t.answer_note)}`,children:t.answer_note})]})]}),!s&&o.jsxs("div",{className:"team-answers",children:[o.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${m.length}`}),m.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),m.map(R=>{const v=c.find(U=>U.id===R.team_id)??d.find(U=>U.id===R.team_id),C=g?R.is_correct??Ws(t.answer,R.answer_text):null;return o.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${C===!0?"var(--ok)":C===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsx("span",{className:"name",style:{color:v==null?void 0:v.color},children:(v==null?void 0:v.name)??"—"}),o.jsxs("span",{className:"text",children:[a?R.answer_text||"—":"• • •",R.stake!=null&&R.stake!==0&&o.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",R.stake]})]}),C!=null&&o.jsx("span",{className:"mark",style:{color:C?"var(--ok)":"var(--danger)"},children:C?"✓":"✗"})]},R.id)})]})]}),o.jsxs("div",{className:"host-actions",children:[u>0&&o.jsx("button",{className:"ghost",onClick:()=>void Yi(u-1,!0),children:"← Назад"}),a?u<p-1?o.jsx("button",{onClick:()=>void Yi(u+1),children:"Следующий вопрос →"}):o.jsx(Gn,{pack:n,gameState:i}):o.jsx("button",{onClick:()=>void Vs(),children:"Показать ответ →"})]})]})}function _l({q:n,choices:e,imgs:t,theme:i}){const[s,r]=Z.useState(0);Z.useEffect(()=>{r(0);const u=setTimeout(()=>r(1),2200),g=setTimeout(()=>r(2),Md);return()=>{clearTimeout(u),clearTimeout(g)}},[n.id]);const a=n.answer.correct_choice??"",c=e.filter(u=>u.key!==a),d=new Set(Qx(c.map(u=>u.key),n.id).slice(0,2)),l=u=>s>=1||d.has(u)?s<2?"":u===a?" correct":" dimmed":" hidden-yet",m=u=>d.has(u)?0:.25*e.filter(g=>!d.has(g.key)).findIndex(g=>g.key===u),p=i==="potter";return t?o.jsx("div",{className:"choice-imgs",children:e.map((u,g)=>o.jsxs("div",{className:`choice-img${l(u.key)}`,style:{animationDelay:`${m(u.key)}s`},children:[o.jsx("img",{src:Xe(t[g]),alt:""}),o.jsxs("span",{className:"key",children:[u.key,u.text?` — ${u.text}`:""]})]},u.key))}):o.jsx("div",{className:`choices-grid${eo(e.map(u=>u.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(u=>o.jsxs("div",{className:`choice-plate${l(u.key)}`,style:{animationDelay:`${m(u.key)}s`},children:[o.jsx("span",{className:"key",children:u.key}),u.text,p&&l(u.key)===" correct"&&o.jsx(v_,{})]},u.key))})}function v_(){return o.jsx("svg",{className:"mg-check",viewBox:"0 0 24 24",width:"26",height:"26","aria-hidden":"true",children:o.jsx("path",{d:"M4 13l5 5L20 6",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}function M_({enabled:n,startedAt:e,seconds:t}){return Z.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Vs()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function y_({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return Z.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,a=Math.max(500,r-Date.now()),c=setTimeout(()=>{Ri(e.question_index+1)},a);return()=>clearTimeout(c)},[e.timer_started_at,e.question_index,i]),null}function S_({pack:n,round:e,gameState:t}){const i=e.settings.themes??[],[s,r]=Z.useState(void 0),a=jd(t.melody);Z.useEffect(()=>{s!==void 0&&a===s&&r(void 0)},[a,s]);const c=s!==void 0?s:a,d=Z.useRef(null),l=Z.useRef(null),m=Z.useRef(new Map),p=Nu(t),[u,g]=Z.useState([]),[M,_]=Z.useState(null),f=[...new Set([...p,...u])],h=async b=>{g([...f,b]),_(await Lu(t,b,f))},S=e.title_lines.join(" ")||"СВОЯ ИГРА",w=Cl(S,n.theme==="classic");if(i.length===0)return o.jsxs("div",{className:"host-screen grid-bg",children:[o.jsx("div",{className:"mono-tag",children:"СВОЯ ИГРА"}),o.jsx("p",{children:"Темы не заполнены — добавь их в редакторе раунда"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void nr("round_intro"),children:"← К титулу"})})]});const E=Math.max(...i.map(b=>b.tiles.length));return o.jsxs("div",{className:"host-screen grid-bg jp-screen",children:[o.jsx("h1",{className:"neon-title jp-title",children:n.theme==="classic"?w:S}),o.jsxs("div",{className:"jp-board",style:{gridTemplateColumns:`repeat(${i.length}, minmax(0, 1fr))`,gridTemplateRows:`auto repeat(${E}, minmax(0, 1fr))`},children:[M&&o.jsxs("div",{className:"jp-save-err",children:["⚠ ",M]}),i.map((b,y)=>o.jsxs("div",{className:"jp-theme-name",style:{gridColumn:y+1,gridRow:1},children:[b.name||`Тема ${y+1}`,b.hint&&o.jsx("span",{className:"jp-theme-hint",children:b.hint})]},`h${y}`)),i.map((b,y)=>b.tiles.map((R,v)=>{const C=f.includes(`${y}-${v}`);return o.jsx(Al,{kind:"jeopardy",done:C,colorIndex:y%8,flip:!C,label:C?"·":R.value,backLabel:R.value,style:{gridColumn:y+1,gridRow:v+2},elRef:U=>{const P=i.slice(0,y).reduce((F,$)=>F+$.tiles.length,0)+v;U?m.current.set(P,U):m.current.delete(P)},onClick:()=>{var F;const U=i.slice(0,y).reduce(($,D)=>$+D.tiles.length,0)+v;d.current=Xd(t.melody);const P=(F=m.current.get(U))==null?void 0:F.getBoundingClientRect();l.current=P?{tile:U,x:P.left+P.width/2,y:P.top+P.height/2}:null,r(U),Pu(t,U)}},`${y}-${v}`)}))]}),o.jsx("div",{className:"host-actions",children:o.jsx(Gn,{pack:n,gameState:t})}),c!=null&&(()=>{var P,F,$,D,I;const b=qd(i,c);if(!b)return null;const{ti:y,i:R,tile:v}=b,C=s!==void 0&&d.current!=null?d.current:((F=(P=t.melody)==null?void 0:P.jp)==null?void 0:F.replay)??0,U=(($=l.current)==null?void 0:$.tile)===c?{x:l.current.x,y:l.current.y}:null;return o.jsx(b_,{packTheme:n.theme,round:e,gameState:t,theme:i[y],tile:v,tileIndex:c,showAnswer:!!((I=(D=t.melody)==null?void 0:D.jp)!=null&&I.answer),replayNonce:C,origin:U,onShowAnswer:()=>void Mt(Yd(t.melody??{})),onReplay:()=>void Mt($d(t.melody??{})),onClose:()=>{r(null),h(`${y}-${R}`)}})})()]})}function b_({round:n,gameState:e,theme:t,tile:i,tileIndex:s,onClose:r,packTheme:a,showAnswer:c,onShowAnswer:d,replayNonce:l,onReplay:m,origin:p}){const u=n.settings.clipSeconds??30,g=Z.useRef(null),M=Z.useRef(null),[_,f]=Z.useState(void 0);Z.useLayoutEffect(()=>{if(!p||!M.current){f(void 0);return}const D=M.current.getBoundingClientRect();f({"--qt-ox":`${p.x-D.left}px`,"--qt-oy":`${p.y-D.top}px`})},[s]);const[h,S]=Z.useState(u),[w,E]=Z.useState(!1),b=En(e.game_id,e.round_number),y=Jt(e.game_id),[R,v]=Z.useState(null),[C,U]=Z.useState({});Z.useEffect(()=>{U({})},[s]);const P=()=>{var D;if((D=g.current)==null||D.stop(),!i.audio){E(!1),v("у плитки не задан трек");return}v(null),S(u),g.current=ch(Xe(i.audio),u,{onStart:()=>E(!0),onTick:I=>S(I),onEnd:()=>E(!1),onError:I=>{E(!1),v(I)}})};Z.useEffect(()=>(P(),()=>{var D;(D=g.current)==null||D.stop()}),[s,l]);const F=b.filter(D=>Qd(D.question_ref,e.round_number)===s).sort((D,I)=>+new Date(D.updated_at)-+new Date(I.updated_at)),$=async(D,I)=>{U(H=>({...H,[D]:I})),await Bn.patchAnswer(D,{is_correct:I})};return vl.createPortal(o.jsx("div",{className:`jp-overlay theme-${a??"classic"}`,children:o.jsxs("div",{ref:M,className:`jp-modal hud-frame${_?" qt-grow":""}`,style:_,children:[o.jsxs("div",{className:"jp-modal-head",children:[o.jsxs("div",{children:[o.jsx("div",{className:"jp-modal-theme",children:t.name}),o.jsxs("div",{className:"mono-tag",children:["ПЛИТКА · ",i.value]})]}),o.jsx("div",{className:`jp-count${w?" on":""}`,children:String(h).padStart(2,"0")})]}),c&&o.jsxs("div",{className:"answer-reveal hud-frame",style:{padding:"12px 18px"},children:[o.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),o.jsx("div",{className:"answer-main",style:{fontSize:"clamp(24px,3vw,40px)"},children:i.correct})]}),o.jsxs("div",{className:"jp-answers",children:[o.jsx("div",{className:"mono-tag",children:c?"ОТВЕТЫ (ПО СКОРОСТИ)":`ОТВЕТИЛИ: ${F.length}`}),F.length===0&&o.jsx("div",{style:{color:"var(--dim)"},children:"ждём ответы…"}),F.map((D,I)=>{const H=y.find(K=>K.id===D.team_id),k=C[D.id]??D.is_correct;return o.jsxs("div",{className:"jp-answer",style:{borderLeft:`3px solid ${k===!0?"var(--ok)":k===!1?"var(--danger)":"var(--dim)"}`},children:[o.jsxs("span",{className:"pos",children:["#",I+1]}),o.jsx("span",{className:"name",style:{color:H==null?void 0:H.color},children:(H==null?void 0:H.name)??"—"}),o.jsx("span",{className:"txt",children:c?D.answer_text||"—":"• • •"}),c&&o.jsxs(o.Fragment,{children:[o.jsx("button",{className:`jp-grade ok${k===!0?" chosen":""}`,onClick:()=>void $(D.id,!0),children:"✓"}),o.jsx("button",{className:`jp-grade no${k===!1?" chosen":""}`,onClick:()=>void $(D.id,!1),children:"✗"})]})]},D.id)})]}),o.jsxs("div",{className:"jp-modal-foot",children:[!c&&o.jsx("button",{onClick:d,children:"Показать ответ"}),o.jsx("button",{className:"ghost",onClick:m,children:"↻ Переслушать"}),R&&o.jsxs("div",{className:"jp-audio-err",children:["🔇 ",R,o.jsx("button",{className:"ghost",style:{marginLeft:10},onClick:()=>void oh(Xe(i.audio)).then(D=>alert(D)),children:"что с файлом?"})]}),F.some(D=>(C[D.id]??D.is_correct)==null)&&o.jsxs("div",{className:"jp-ungraded",children:["⚠ не оценено: ",F.filter(D=>(C[D.id]??D.is_correct)==null).length]}),o.jsx("button",{className:"ghost dark",onClick:r,children:"Закрыть плитку"})]})]})}),document.body)}function E_({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return o.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var d;const a=((d=i.find(l=>l.startsWith(s)))==null?void 0:d.slice(s.length))??"—",c=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return o.jsxs("div",{className:"mi",children:[t[r]&&o.jsx("img",{src:Xe(t[r]),alt:""}),o.jsxs("div",{className:"mi-label",children:[o.jsxs("b",{children:[s," → ",a]}),c&&c!==a&&o.jsx("span",{className:"mi-text",children:c})]})]},s)})})}function w_({pack:n,gameState:e}){const t=Jt(e.game_id),i=En(e.game_id),s=wl(n,t,i),r=Tl(n,t,i),a=n.rounds.filter(f=>!f.off_scoreboard),c=sa(t,s,i,r),d=c.map(f=>f.team),[l,m]=Z.useState(0);Z.useEffect(()=>{if(m(0),d.length===0)return;const f=setInterval(()=>m(h=>h>=d.length?h:h+1),2200);return()=>clearInterval(f)},[d.length,e.round_number]);const p=Z.useRef(null),u=ir([d.length,a.length],{shrinkBefore:p}),g=Z.useMemo(()=>{const f=new Map(t.map(S=>{const w=s.get(S.id)??0,E=(r.get(S.id)??[])[e.round_number]??0;return[S.id,w-E]})),h=new Map(t.map(S=>[S.id,(r.get(S.id)??[]).slice(0,e.round_number)]));return sa(t,f,i,h).map(S=>S.team)},[t,s,r,i,e.round_number]),M=Z.useRef(new Map),_=Z.useRef(null);return Z.useLayoutEffect(()=>{if(n.theme!=="classic"&&n.theme!=="potter"||d.length===0||l<d.length||_.current===e.round_number||(_.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const h=new Map(g.map((w,E)=>[w.id,E]));d.forEach((w,E)=>{const b=M.current.get(w.id);if(!b)return;const R=(h.get(w.id)??E)-E;if(R===0)return;const v=b.getBoundingClientRect().height;b.style.transition="none",b.style.transform=`translateY(${R*v}px)`,b.classList.add("sb-flip"),b.offsetHeight,requestAnimationFrame(()=>{b.style.transition="",b.style.transform=""})});const S=setTimeout(()=>{M.current.forEach(w=>w.classList.remove("sb-flip"))},900);return()=>clearTimeout(S)},[l,d,g,n.theme,e.round_number]),o.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[o.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),o.jsx("h2",{className:"sb-title",ref:p,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),o.jsx("div",{className:"sb-table-wrap",children:o.jsxs("table",{ref:u,className:`score-table${yd(d.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),a.map((f,h)=>o.jsxs("th",{children:["Р",h+1]},f.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:d.map((f,h)=>{const S=c.find(b=>b.team.id===f.id),w=(S==null?void 0:S.place)??1,E=h>=d.length-l;return o.jsxs("tr",{ref:b=>{b?M.current.set(f.id,b):M.current.delete(f.id)},className:`sb-row${E?" is-in":" is-veiled"}${w===1?" leader":""}`,children:[o.jsxs("td",{children:[w<=3?o.jsx("span",{className:"sb-medal",children:o.jsx(ra,{theme:n.theme,place:w})}):w,(S==null?void 0:S.shared)&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:f.color,fontFamily:"var(--font-display)"},children:o.jsx("span",{className:"sb-name",children:f.name})}),a.map(b=>{const y=r.get(f.id)??[];return o.jsx("td",{children:y[n.rounds.indexOf(b)]??0},b.id)}),o.jsx("td",{className:"total",children:s.get(f.id)??0})]},f.id)})})]})}),o.jsx("div",{className:"host-actions",children:o.jsx(Gn,{pack:n,gameState:e})})]})}function T_({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=Z.useState(i*60);Z.useEffect(()=>{const d=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),l=()=>r(Math.max(0,Math.round(i*60-(Date.now()-d)/1e3)));l();const m=setInterval(l,500);return()=>clearInterval(m)},[t.timer_started_at,i]);const a=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen",children:[n.theme!=="potter"&&o.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),o.jsx(vn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),o.jsx(Qs,{theme:n.theme}),n.theme==="potter"&&o.jsx(sr,{left:s,seconds:i*60,low:s<=30}),o.jsxs("div",{className:"break-timer",children:[a,":",c]}),o.jsx("div",{className:"host-actions",children:o.jsx(Gn,{pack:n,gameState:t})})]})}function A_({pack:n,gameState:e}){var c,d;const[i,s]=Z.useState(300);Z.useEffect(()=>{const l=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),m=()=>s(Math.max(0,Math.round(5*60-(Date.now()-l)/1e3)));m();const p=setInterval(m,500);return()=>clearInterval(p)},[e.timer_started_at]),Z.useEffect(()=>{var p,u;const l=((p=n.settings)==null?void 0:p.finale_music)??((u=n.settings)==null?void 0:u.bg_music);if(!l||document.hidden)return;const m=Et();return m.src=Xe(l),m.loop=!0,m.volume=.55,m.play().catch(()=>{}),()=>{try{m.pause(),m.src=""}catch{}}},[(c=n.settings)==null?void 0:c.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=String(Math.floor(i/60)).padStart(2,"0"),a=String(i%60).padStart(2,"0");return o.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[o.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),o.jsx(vn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),o.jsx(Qs,{theme:n.theme}),n.theme==="potter"&&o.jsx(sr,{left:i,seconds:5*60,low:i<=30}),o.jsxs("div",{className:"break-timer",children:[r,":",a]}),o.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>void tr(e.pack_id,!0),children:"К итогам →"})})]})}function R_({pack:n,gameId:e,gameState:t}){var v,C,U,P,F,$;const i=Jt(e),s=En(e),r=wl(n,i,s),a=Tl(n,i,s),c=sa(i,r,s,a),d=!!t.reveal,l=t.question_index??0,[m,p]=Z.useState(!((v=n.settings)!=null&&v.show_final_cinematic));Z.useEffect(()=>{var H,k;const D=((H=n.settings)==null?void 0:H.finale_music)??((k=n.settings)==null?void 0:k.bg_music);if(!D||document.hidden||!m)return;const I=Et();return I.src=Xe(D),I.loop=!0,I.volume=.55,I.play().catch(()=>{}),()=>{try{I.pause(),I.src=""}catch{}}},[(C=n.settings)==null?void 0:C.finale_music,(U=n.settings)==null?void 0:U.bg_music,m]);const u=Z.useRef(null),g=ir([c.length],{shrinkBefore:u,minScale:.3}),_=n.rounds.map((D,I)=>({r:D,i:I})).filter(D=>!D.r.off_scoreboard).map(({r:D,i:I})=>{var K;let H=null,k=-1/0;for(const re of i){const fe=((K=a.get(re.id))==null?void 0:K[I])??0;fe>k&&(k=fe,H=re)}return{round:D,idx:I,team:H,score:k}}),f=3e3,h=1e4,S=_.length;Z.useEffect(()=>{if(d||l>S||!m)return;const I=setTimeout(()=>void bi(l+1),l===S?h:f);return()=>clearTimeout(I)},[d,l,S,m]);const[w,E]=Z.useState(0);if(Z.useEffect(()=>{if(E(0),c.length===0)return;let D=!1,I=0,H;const k=()=>{D||(I+=1,E(I),!(I>=c.length)&&(H=setTimeout(k,Math.max(320,900-90*I))))};return H=setTimeout(k,Math.max(320,900-90*I)),()=>{D=!0,clearTimeout(H)}},[c.length,l,d]),!m)return o.jsx(Dx,{onDone:()=>p(!0)});const b=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],y=o.jsx(o.Fragment,{children:Array.from({length:5},(D,I)=>o.jsxs("div",{className:"fw-burst",style:{left:`${12+I*19}%`,top:`${18+I%3*14}%`},children:[o.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${b[I%b.length]}55, transparent 70%)`,"--dur":`${2.2+I*.3}s`,"--delay":`${I*.45}s`}}),Array.from({length:10},(H,k)=>o.jsx("span",{className:"fw-spark",style:{background:b[(I+k)%b.length],"--a":`${k*36}deg`,"--dur":`${2.2+I*.3}s`,"--delay":`${I*.45}s`}},k))]},I))}),R=o.jsxs("div",{className:"fin-breakdown",children:[o.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),o.jsx("div",{className:"fin-table-wrap",children:o.jsxs("table",{ref:g,className:`fin-table${yd(c.length)}`,children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{}),o.jsx("th",{children:"Команда"}),n.rounds.map((D,I)=>!D.off_scoreboard&&o.jsxs("th",{children:["Р",Fn(n,I)]},D.id)),o.jsx("th",{children:"Σ"})]})}),o.jsx("tbody",{children:c.map(({team:D,place:I,shared:H},k)=>{const K=k>=c.length-w;return o.jsxs("tr",{className:`fin-row${I<=3?" top3":""}${I===1?" fin-first":""}${K?" is-in":" is-veiled"}`,children:[o.jsxs("td",{className:"fin-pos",children:[I,H&&o.jsx("span",{className:"sb-eq",children:"="})]}),o.jsx("td",{style:{color:D.color},children:o.jsx("span",{className:"sb-name",children:D.name})}),n.rounds.map((re,fe)=>{var pe;return!re.off_scoreboard&&o.jsx("td",{children:((pe=a.get(D.id))==null?void 0:pe[fe])??0},re.id)}),o.jsx("td",{children:o.jsx("b",{children:r.get(D.id)??0})})]},D.id)})})]})})]});if(d){const D=[...new Set(c.map(k=>k.place))].filter(k=>k<=3).sort((k,K)=>K-k);if(l>=D.length)return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[y,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(vn,{ref:u,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),R,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&na()},children:"⟲ Новая игра"})})]});const I=D[l],H=c.filter(k=>k.place===I);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void bi(l+1),children:[I===1&&y,o.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),o.jsxs("div",{className:`fin-award p${I}`,children:[o.jsxs("div",{className:"fin-award-place",children:[I," МЕСТО"]}),o.jsx("div",{className:"fin-award-medal",children:o.jsx(ra,{theme:n.theme,place:I})}),H.length>0?H.map(k=>o.jsx("div",{className:"fin-award-name",style:{color:k.team.color},children:k.team.name},k.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(l<S){const D=_[l];return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void bi(l+1),children:[o.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),o.jsxs("div",{className:"fin-slide",children:[o.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Fn(n,D.idx)," · ",D.round.title_lines.join(" ")]}),o.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),o.jsx("div",{className:"fin-slide-team",style:{color:(P=D.team)==null?void 0:P.color},children:((F=D.team)==null?void 0:F.name)??"—"})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"3s"}})},l),o.jsx("div",{className:"fin-dots",children:_.map((I,H)=>o.jsx("span",{className:H===l?"on":""},H))})]})}if(l===S){const D=c.filter(I=>I.place===1);return o.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void bi(l+1),children:[y,o.jsx("div",{className:"mono-tag",children:D.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),o.jsxs("div",{className:"fin-award p1",children:[o.jsx("div",{className:"fin-award-medal",children:o.jsx(ra,{theme:n.theme,place:1})}),D.length>0?D.map(I=>o.jsx("div",{className:"fin-award-name",style:{color:I.team.color},children:I.team.name},I.team.id)):o.jsx("div",{className:"fin-award-name",children:"—"}),o.jsx("div",{className:"fin-award-score",children:(($=D[0])==null?void 0:$.total)??0})]}),o.jsx("div",{className:"fin-progress",children:o.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return o.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[y,o.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),o.jsx(vn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),R,o.jsx("div",{className:"host-actions",children:o.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&na()},children:"⟲ Новая игра"})})]})}export{G_ as HostScreen,eo as choicesLenClass,$x as noteClass,Zx as stopAllMedia};
