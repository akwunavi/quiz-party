import{j as a,s as St,a as Ku}from"./index-CMA40l3a.js";import{u as Zu,R as Ju,a as Qu,s as eh,b as th}from"./useGameState-D5f9TWCk.js";import{r as j}from"./vendor-BbIxR9j-.js";import{c as Qt,t as Bi,h as Tn,m as nh,u as ps,a as fd,S as mn,s as Sc,R as ih,B as sh,b as rh,d as ah,i as oh,e as pd,f as Fo,D as ch,g as Oo,j as md,A as Bo,k as ko,T as zo,Q as wc,l as rs,n as lh,o as Ec,p as as,q as dh,M as uh,r as hh,J as fh,v as ph,w as Rn,x as gd,y as mh,F as gh,z as si,C as Tc,E as xh,G as _h,H as vh,I as Mh,K as Pa,L as ri,N as yh,O as xd,P as bh}from"./JeopardyRound-BEswAJsb.js";import{m as He,a as Li,u as Ln,i as Cr,s as Ac,c as Sh,p as wh,r as Eh,b as _d,d as Th,e as Cc,l as La,f as vd,g as Md,h as yd,j as Ah,k as Ch}from"./jeopardyActions-D-A95ciZ.js";import{t as Ia,n as Rh,l as Nh,a as Ph,b as Lh,g as Ih,s as Dh,c as Uh,d as di,e as _t,q as vt,m as Rr,f as tn,h as ds,r as ki,i as bd,j as vr,k as Ks,o as Fh,p as Oh,u as Sd,v as Da,w as Vi,x as Bh,y as kh,z as Nr,A as zh,N as Rc,B as Gh,S as Hh,C as Pr,D as vs,E as jh,M as Nc,F as Lr,G as Ir,H as Pc,I as Vh,J as Wh,K as Lc,L as $h,O as Ic,P as Ua,Q as ei,R as Xh,T as qh,U as Yh}from"./Hint-w8BSmoqY.js";import{N as Dc,a as Kh,P as Zh,S as Jh,b as Qh,Q as ef,T as tf,i as wd,c as nf,d as sf,e as rf,f as Rt}from"./ThemeLayer-Ta1piWHL.js";import{u as af,F as of,g as nt,f as cf}from"./shell-D-zYpug7.js";import{Q as ar}from"./QrCode-NOtLxubT.js";import{f as Ed,F as Td,u as lf}from"./fromQuestion-DJuYLhsT.js";import{L as df,r as Fa}from"./ranking-BlxZVdjs.js";import{C as uf}from"./CrosswordView-Bk-8tpjN.js";import{room as Ad}from"./index-Dv00JKRY.js";import"./pollLoop-BPx8gArJ.js";function Uc({pack:n}){var e,t;return j.useEffect(()=>{var l,u;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((u=n==null?void 0:n.settings)==null?void 0:u.bg_music);if(!i)return;const s=Qt();s.src=He(i),s.loop=!0,s.volume=.45;let r=!1,o=!1;const c=()=>{o||r||(o=!0,s.play().then(()=>{if(r)try{s.pause(),s.src=""}catch{}}).catch(()=>{}),window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c))};return s.play().then(()=>{if(o=!0,r)try{s.pause(),s.src=""}catch{}}).catch(()=>{r||(window.addEventListener("pointerdown",c),window.addEventListener("keydown",c))}),()=>{r=!0,window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c);try{s.pause(),s.src=""}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}const hf=["stands_crowd.webp","village_mid.webp","village_2.webp","spruce_set.webp","butterfly.webp"];let Dr=!1;function ff(n,e=fetch){if(!Dr){Dr=!0;for(const t of hf)e(`${n}arena/${t}`).then(i=>i.blob()).catch(()=>{Dr=!1})}}let Ms=null;const pf=1e-4;function Fc(){try{if(Ms){Ms.state==="suspended"&&Ms.resume().catch(()=>{});return}const n=window.AudioContext??window.webkitAudioContext;if(!n)return;const e=new n,t=Math.max(1,Math.floor(e.sampleRate*2)),i=e.createBuffer(1,t,e.sampleRate),s=i.getChannelData(0);for(let c=0;c<t;c++)s[c]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=i,r.loop=!0;const o=e.createGain();o.gain.value=pf,r.connect(o),o.connect(e.destination),r.start(),Ms=e,e.state==="suspended"&&e.resume().catch(()=>{})}catch{}}function mf(){const n=()=>Fc();return Fc(),window.addEventListener("pointerdown",n),window.addEventListener("keydown",n),()=>{window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)}}function Cd({hue:n,id:e}){const t=`hsl(${n} 90% 88%)`,i=`hsl(${n} 78% 62%)`,s=`hsl(${n} 60% 26%)`;return a.jsxs("svg",{className:"b-lan",viewBox:"-60 0 120 170","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:`bl-${e}`,cx:"50%",cy:"58%",r:"60%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf0"}),a.jsx("stop",{offset:".22",stopColor:t}),a.jsx("stop",{offset:".62",stopColor:i}),a.jsx("stop",{offset:"1",stopColor:s})]}),a.jsxs("radialGradient",{id:`bg-${e}`,children:[a.jsx("stop",{offset:"0",stopColor:`hsl(${n} 95% 76%)`,stopOpacity:".65"}),a.jsx("stop",{offset:"1",stopColor:`hsl(${n} 95% 60%)`,stopOpacity:"0"})]})]}),a.jsx("ellipse",{className:"glow",cx:"0",cy:"92",rx:"92",ry:"98",fill:`url(#bg-${e})`}),a.jsx("g",{className:"cordg",children:a.jsx("line",{className:"cord",x1:"0",y1:"0",x2:"0",y2:"34",stroke:"#c9a566",strokeWidth:"2.4"})}),a.jsx("g",{transform:"translate(0 34)",children:a.jsxs("g",{className:"lbody",children:[a.jsx("ellipse",{cx:"0",cy:"4",rx:"13",ry:"5",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"1.6"}),a.jsx("path",{d:"M 0 8 C 32 12 46 54 31 96 C 23 116 9 128 0 134 C -9 128 -23 116 -31 96 C -46 54 -32 12 0 8 Z",fill:`url(#bl-${e})`,stroke:"#d9b36a",strokeWidth:"2"}),a.jsxs("g",{className:"ribs",fill:"none",stroke:"#d9b36a",strokeWidth:"1.8",opacity:".85",children:[a.jsx("path",{d:"M 0 8 C 14 40 14 100 0 134"}),a.jsx("path",{d:"M 0 8 C -14 40 -14 100 0 134"}),a.jsx("path",{d:"M 0 8 C 28 40 30 96 0 134"}),a.jsx("path",{d:"M 0 8 C -28 40 -30 96 0 134"})]}),a.jsx("ellipse",{cx:"-14",cy:"44",rx:"6",ry:"14",fill:"#fff",opacity:".35",transform:"rotate(14 -14 44)"}),a.jsx("path",{d:"M -10 136 L 0 156 L 10 136 Z",fill:"#d9b36a",opacity:".9"}),a.jsx("path",{d:"M -18 130 L -14 150 L -6 134 Z M 18 130 L 14 150 L 6 134 Z",fill:"#b88c46",opacity:".8"})]})})]})}const tt={x:960,y:592,rx:250,ry:270},Zs=704,Js=1216,gf=[{py:322,ey:200},{py:474,ey:420},{py:626,ey:630}],xf=[{py:304,ey:188},{py:424,ey:366},{py:544,ey:522},{py:664,ey:664}],_f=n=>n<=12?gf:xf,Oa=(n,e,t,i)=>{const s=n[t],r=e<0?Zs:Js,o=e<0?-30:1950,c=(i-r)/(o-r);return s.py+(s.ey-s.py)*c+Math.sin(c*Math.PI)*38},vf=n=>n<=4?44:n<=6?38:n<=9?34:n<=12?31:n<=16?27:24;function Mf(n){const e=_f(n),t=e.length,i=Math.ceil(n/2),s=Math.max(1,Math.ceil(i/t)),r=c=>(n<=6?580:570)-c*(s===2?300:215),o=[];for(let c=0;c<n;c++){const l=c%2?1:-1,u=Math.floor(c/2),d=Math.floor(u/t),f=u%t,h=l<0?r(d):1920-r(d);o.push({x:h,ay:Oa(e,l,f,h),side:l,k:f,col:d})}return{slots:o,ropes:e,cols:s,sc:n<=6?1.15:n<=12?.8:n<=16?.72:.62,nameW:s===1?270:s===2?204:150,fs:vf(n)}}const yf=(n,e)=>`M ${tt.x} ${tt.y} C ${tt.x+(n-tt.x)*.2} ${tt.y-260}, ${n-(n-tt.x)*.35} ${e-180}, ${n} ${e}`,Ur={Q:.735,U:.694,I:.304,Z:.599," ":.25,P:.577,A:.647,R:.616,T:.575,Y:.638},bf=n=>{const e=(n-380)/1160;return 66+Math.sin(Math.max(0,Math.min(1,e))*Math.PI)*54},Sf=(()=>{let i=960-[..."QUIZ PARTY"].reduce((s,r)=>s+Ur[r]*170+12,-12)/2;return[..."QUIZ PARTY"].flatMap((s,r)=>{const o=i+Ur[s]*170/2;return i+=Ur[s]*170+12,s===" "?[]:[{c:s,i:r,x:o}]})})(),Ba=24,Oc=Array.from({length:Ba},(n,e)=>{const t=e/Ba*Math.PI*2-Math.PI/2;return{x:tt.x+Math.cos(t)*tt.rx,y:tt.y+Math.sin(t)*tt.ry}}),Go=n=>Math.min(Ba,4+n*2);function wf({teams:n,layout:e,fresh:t,qr:i,qrLit:s,litN:r,wait:o,rootRef:c,children:l}){const u=af(),{slots:d,ropes:f,sc:h,nameW:m}=e,g=[-1,1].flatMap(p=>f.flatMap((M,S)=>Array.from({length:9},(b,T)=>{const w=p<0?Zs:Js,R=w+p*(40+T*76);return{x:R,y:Oa(f,p,S,R)+4,o:S*9+T+(p<0?0:1)}}))).sort((p,M)=>p.o-M.o),y=Array.from({length:9},(p,M)=>{const S=M/8;return{x:960+(M%2?14:-14)*(1-S*.4),y:1040-S*190,w:120-S*70,h:24-S*12}}),x=r;return a.jsxs("div",{className:"lb3 lb3-b s1",ref:c,children:[!u&&a.jsx(of,{rects:[],hazeK:0}),a.jsx("div",{className:"b-grade"}),a.jsxs("svg",{className:"lb3-bg b-bg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:"bMoonG",children:[a.jsx("stop",{offset:"0",stopColor:"#fff7dc",stopOpacity:".95"}),a.jsx("stop",{offset:".3",stopColor:"#ffe6a8",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffe6a8",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bMoon",cx:"40%",cy:"38%",r:"70%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf2"}),a.jsx("stop",{offset:".6",stopColor:"#f3e2ae"}),a.jsx("stop",{offset:"1",stopColor:"#c9b27a"})]}),a.jsxs("linearGradient",{id:"bWood",x1:"0",y1:"0",x2:"1",y2:"0",children:[a.jsx("stop",{offset:"0",stopColor:"#1a0f08"}),a.jsx("stop",{offset:".35",stopColor:"#6b4526"}),a.jsx("stop",{offset:".6",stopColor:"#4a2e18"}),a.jsx("stop",{offset:"1",stopColor:"#140b06"})]}),a.jsxs("linearGradient",{id:"bText",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0",stopColor:"#fffbe6"}),a.jsx("stop",{offset:".5",stopColor:"#ffe29a"}),a.jsx("stop",{offset:"1",stopColor:"#f0b350"})]}),a.jsxs("radialGradient",{id:"bPool",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd98a",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffd98a",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bGoldG",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd68a",stopOpacity:".3"}),a.jsx("stop",{offset:"1",stopColor:"#ffd68a",stopOpacity:"0"})]}),a.jsx("filter",{id:"bBlur2",children:a.jsx("feGaussianBlur",{stdDeviation:"5"})}),a.jsxs("filter",{id:"bNoise",x:"0",y:"0",width:"100%",height:"100%",children:[a.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.02 0.3",numOctaves:"3",seed:"3"}),a.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -1"})]})]}),a.jsx("circle",{cx:tt.x,cy:tt.y,r:"430",fill:"url(#bMoonG)",opacity:".5"}),a.jsx("g",{transform:`translate(${tt.x} ${tt.y})`,children:a.jsxs("g",{className:"b-moon",children:[a.jsx("circle",{r:"210",fill:"url(#bMoon)"}),a.jsx("circle",{cx:"-70",cy:"-50",r:"34",fill:"#cdb67f",opacity:".5"}),a.jsx("circle",{cx:"50",cy:"40",r:"52",fill:"#cdb67f",opacity:".38"}),a.jsx("circle",{cx:"-20",cy:"96",r:"22",fill:"#cdb67f",opacity:".45"}),a.jsx("circle",{cx:"94",cy:"-84",r:"20",fill:"#cdb67f",opacity:".4"})]})}),y.map((p,M)=>a.jsxs("g",{className:"b-stones",children:[a.jsx("ellipse",{cx:p.x,cy:p.y,rx:p.w,ry:p.h,fill:"#17352c",stroke:"#0a1d17",strokeWidth:"2"}),a.jsx("ellipse",{className:"b-stone",cx:p.x,cy:p.y,rx:p.w*.9,ry:p.h*.8,fill:"url(#bPool)",opacity:M<2+Math.min(1,n.length/12)*7?.9:.18})]},M)),a.jsxs("g",{className:"b-ringg",children:[[Zs,Js].map((p,M)=>a.jsxs("g",{children:[a.jsx("rect",{x:p-32,y:"250",width:"64",height:"590",rx:"14",fill:"url(#bWood)"}),[0,1,2,3,4,5,6].map(S=>a.jsx("path",{d:`M ${p-32} ${300+S*80} h 64`,stroke:"#0a0502",strokeWidth:"3",opacity:".6"},S)),a.jsx("rect",{x:p-32,y:"250",width:"64",height:"590",rx:"14",filter:"url(#bNoise)",opacity:".5"}),a.jsx("rect",{x:p-42,y:"236",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"}),a.jsx("rect",{x:p-42,y:"826",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"})]},M)),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"#0e0804",strokeWidth:"38"}),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"url(#bWood)",strokeWidth:"30"}),[0,1,2].map(p=>a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx+(p-1)*7,ry:tt.ry+(p-1)*7,fill:"none",stroke:p===1?"#9b6a3a":"#2f1c0e",strokeWidth:"3",strokeDasharray:p===1?"70 22":"40 40",opacity:".8"},p)),Oc.filter((p,M)=>M%2===0).map((p,M)=>a.jsxs("g",{transform:`translate(${p.x} ${p.y}) rotate(${M*47%360})`,children:[a.jsx("ellipse",{cx:"14",cy:"-6",rx:"15",ry:"6",fill:"#2f7a4a",stroke:"#144a2a",strokeWidth:"1.2"}),a.jsx("ellipse",{cx:"-12",cy:"7",rx:"12",ry:"5",fill:"#3f9a5c",stroke:"#144a2a",strokeWidth:"1.2"})]},`l${M}`)),Oc.map((p,M)=>a.jsx("g",{transform:`translate(${p.x} ${p.y})`,children:a.jsx("circle",{className:`b-rb${M<x?" on":""}`,r:"8",fill:"#ffe2a0",opacity:M<x?1:.28,style:{filter:"drop-shadow(0 0 7px #ffc766)"}})},M))]}),a.jsx("g",{className:"b-ropes",fill:"none",stroke:"#c9a566",strokeWidth:"2.4",opacity:".85",children:[-1,1].flatMap(p=>f.map((M,S)=>{const b=p<0?Zs:Js,T=p<0?-30:1950,w=Array.from({length:21},(R,v)=>{const E=b+(T-b)*(v/20);return`${E.toFixed(0)} ${Oa(f,p,S,E).toFixed(0)}`});return a.jsx("path",{d:`M ${w.join(" L ")}`},`${p}${S}`)}))}),g.map((p,M)=>a.jsx("circle",{className:"b-bulb",cx:p.x,cy:p.y,r:"4.5",fill:"#ffe2a0",opacity:M<10+n.length*4?.9:.25,style:{filter:"drop-shadow(0 0 6px #ffc766)"}},M)),d.map((p,M)=>a.jsx("ellipse",{cx:p.x,cy:p.ay+80,rx:"140",ry:"120",fill:"url(#bPool)",opacity:".35"},`p${n[M].id}`)),a.jsx("g",{className:"b-gold",opacity:"0",children:a.jsx("ellipse",{cx:"960",cy:tt.y,rx:"980",ry:"500",fill:"url(#bGoldG)"})}),d.map((p,M)=>a.jsx("path",{className:"b-spark","data-id":n[M].id,d:yf(p.x,p.ay),pathLength:1,fill:"none",stroke:"#fff6cf",strokeWidth:"7",strokeLinecap:"round",strokeDasharray:"0.07 1.2",opacity:"0",style:{filter:"drop-shadow(0 0 10px #ffd37a)"}},`k${n[M].id}`)),a.jsxs("g",{className:"b-logo",children:[a.jsx("path",{className:"b-swag",d:"M 380 66 C 640 140 1280 140 1540 66",fill:"none",stroke:"#c9a566",strokeWidth:"3"}),Array.from({length:15},(p,M)=>{const S=M/14,b=380+S*1160,T=66+Math.sin(S*Math.PI)*54+4;return a.jsx("circle",{className:"b-swag",cx:b,cy:T+2,r:"5",fill:"#ffe2a0",style:{filter:"drop-shadow(0 0 6px #ffc766)"}},M)}),Sf.map(p=>a.jsxs("g",{children:[a.jsx("line",{className:"b-cordL",x1:p.x,y1:bf(p.x)+2,x2:p.x,y2:"112",stroke:"#c9a566",strokeWidth:"2"}),a.jsx("text",{className:"b-letter-glow",x:p.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"#ffd98a",filter:"url(#bBlur2)",opacity:".85",children:p.c}),a.jsx("text",{className:"b-letter",x:p.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"url(#bText)",stroke:"#8a5a22",strokeWidth:"3",children:p.c})]},p.i))]})]}),i&&a.jsxs("div",{className:"b-stand",style:{left:64,top:806,"--lit":s?1:.3},children:[a.jsxs("svg",{viewBox:"0 0 270 270","aria-hidden":!0,children:[a.jsx("ellipse",{className:"b-aura",cx:"135",cy:"125",rx:"200",ry:"170",fill:"url(#bPool)",opacity:s?1:0}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"#2a1a0e",stroke:"#d9b36a",strokeWidth:"4"}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"none",stroke:"#ffe2a0",strokeWidth:"2",opacity:"var(--lit)",style:{filter:"drop-shadow(0 0 8px #ffc766)"}}),[34,80,135,190,236].map((p,M)=>a.jsx("circle",{cx:p,cy:M%2?16:20,r:"4.5",fill:"#ffe2a0",opacity:".75",style:{filter:"drop-shadow(0 0 5px #ffc766)"}},M))]}),a.jsx("div",{className:"b-qrbox",children:i}),a.jsx("div",{className:"b-qrcap",children:"Сканируй, чтобы играть"})]}),d.map((p,M)=>{const S=n[M];return a.jsxs("div",{className:`b-team side${p.side<0?"L":"R"}${t.has(S.id)?" fresh":""}`,"data-id":S.id,style:{left:p.x,top:p.ay,"--tc":Bi(S.hue),"--sc":h,"--nm":`${S.name.length>26?Math.round(e.fs*.84):e.fs}px`,"--nw":`${m}px`},children:[a.jsx("div",{className:"b-scale",children:a.jsx(Cd,{hue:S.hue,id:S.id})}),a.jsx("div",{className:"nm",children:a.jsx("span",{children:S.name})})]},S.id)}),o&&a.jsx("div",{className:"b-wait",children:"ждём команды…"}),l]})}const ti=3.4,or=.11,cr=.8,Bc=.9;function Ef(n){const e=n.reduce((r,o)=>r+o.length,0);let t=2166136261;for(const r of n.flat())for(let o=0;o<r.length;o++)t^=r.charCodeAt(o),t=Math.imul(t,16777619);const i=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296),s=Array.from({length:e},(r,o)=>o);for(let r=e-1;r>0;r--){const o=Math.floor(i()*(r+1));[s[r],s[o]]=[s[o],s[r]]}return s}function Ho(n){const e=n.flatMap((t,i)=>t.map((s,r)=>({name:s,gi:i,j:r})));return{people:e,order:Ef(n),N:e.length,groups:n}}function Rd(n,e){const t=Math.max(1,...e.map(s=>s.length)),i=Math.min(n,4);return s=>{const r=1100+(s%i-(i-1)/2)*410;if(n<=4)return{cx:r,names:650,sigil:330,size:190,pitch:Math.max(28,Math.min(52,380/t))};const o=t<=4;return s<4?{cx:r,names:o?420:300,sigil:o?210:130,size:o?140:110,pitch:Math.max(26,Math.min(44,(o?140:250)/t))}:{cx:r,names:o?780:740,sigil:o?570:575,size:o?140:110,pitch:Math.max(26,Math.min(44,280/t))}}}const Tf=(n,e,t)=>{const i=n*Math.PI*2+e*Math.PI*6;return{x:1030+Math.cos(i)*(t>4?760:700),y:540+Math.sin(i)*230-Math.sin(e*Math.PI)*30}};function Af(n,e,t,i){j.useEffect(()=>{if(!t||!t.length||!i)return;const{people:s,order:r,N:o}=Ho(t),c=t.length,l=Rd(c,t),u=s.map(f=>{const h=l(f.gi);return{x:h.cx,y:h.names+f.j*h.pitch}}),d=()=>{const f=n()+(i==="done"||i==="back"?20:0),h=o*or+cr,m=Math.max(0,Math.min(1,(f-Bc)/(ti+h-Bc))),g=i==="intro"?0:Math.max(0,Math.min(1,(f-ti)/h));e.current.forEach((y,x)=>{if(!y)return;const p=Math.max(0,Math.min(1,(g*h-r[x]*or)/cr)),M=p*p*(3-2*p),S=Tf(r[x]/o,m,c),b=u[x];y.style.transform=`translate(${S.x+(b.x-S.x)*M-b.x}px, ${S.y+(b.y-S.y)*M-b.y}px) scale(${.82+.18*M})`,y.style.opacity=String(i==="back"?0:Math.min(1,m*14)),y.classList.toggle("landed",M>.98)})};return nt.ticker.add(d),d(),()=>nt.ticker.remove(d)},[t,i])}function Cf({groups:n,pills:e}){const{people:t}=Ho(n),i=n.length,s=Rd(i,n),r=t.length;return a.jsxs("div",{className:`rz3 rz-B${i>4?" k8":""}`,children:[a.jsxs("div",{className:"rz-head",children:[a.jsx("b",{children:"Составы команд"}),a.jsxs("span",{children:[i," · ",r," чел."]})]}),n.map((o,c)=>{const l=s(c),u=Tn(Ia(c));return a.jsxs("div",{className:"rz-grp","data-g":c,style:{left:l.cx-190,top:l.sigil,width:380},children:[a.jsx("div",{className:"rz-sg b-sg",style:{height:l.size},children:a.jsx(Cd,{hue:u,id:`sg${c}`})}),a.jsxs("div",{className:"rz-gn",style:{color:Bi(u)},children:["Команда ",c+1]})]},c)}),t.map((o,c)=>{const l=s(o.gi);return a.jsx("span",{ref:u=>{u&&(e.current[c]=u)},className:"rz-n",style:{left:l.cx-115,top:l.names+o.j*l.pitch-20,opacity:0,"--tc":Bi(Tn(Ia(o.gi)))},children:o.name},c)})]})}function Rf(n,e,t,i,s,r){const{groups:o,order:c,people:l,N:u}=Ho(t);if(i==="back"){n.fromTo(e(s),{opacity:0},{opacity:1,duration:1.2,stagger:.05},.5).fromTo(e(".rz-veil"),{opacity:1},{opacity:0,duration:1.2,ease:"power2.inOut"},.3).fromTo(e(".rz-head, .rz-grp"),{opacity:1},{opacity:0,duration:.8,stagger:.04},.2);return}if(i==="done"){n.set(e(s),{opacity:0},0).set(e(".rz-veil, .rz-head, .rz-grp"),{opacity:1},0).fromTo(e(".rz-grp .rz-gn"),{opacity:.35,scale:.92},{opacity:1,scale:1,duration:.7,stagger:.12,ease:"back.out(2)"},.3).fromTo(e(".rz-grp .rz-sg"),{filter:"brightness(1.9)"},{filter:"brightness(1)",duration:1.2,stagger:.12},.3).to({},{duration:2.4},0);return}if(n.to(e(s),{opacity:0,duration:.8},.1).fromTo(e(".rz-veil"),{opacity:0},{opacity:1,duration:.8},.1).fromTo(e(".rz-head"),{opacity:0,y:14},{opacity:1,y:0,duration:.6},.5),i==="intro"){n.to({},{duration:4.6},0);return}n.fromTo(e(".rz-grp"),{opacity:0,y:14},{opacity:1,y:0,duration:.6,stagger:.1},ti-1),o.forEach((d,f)=>{const h=Math.max(...d.map((m,g)=>c[l.findIndex(y=>y.gi===f&&y.j===g)]))*or+cr;n.fromTo(e(`.rz-grp[data-g="${f}"] .rz-sg`),{filter:"brightness(1)"},{filter:"brightness(1.9)",duration:.4,yoyo:!0,repeat:1},ti+h),r==null||r(ti+h,f),n.fromTo(e(`.rz-grp[data-g="${f}"] .rz-gn`),{scale:.9},{scale:1,duration:.5,ease:"back.out(2)"},ti+h)}),n.to({},{duration:ti+u*or+cr+.8},.1)}const jo=n=>`.b-team[data-id="${CSS.escape(n)}"]`;function Nf(n,e,t,i=0){n.fromTo(e(".b-bg"),{opacity:0},{opacity:1,duration:1},i).fromTo(e(".b-moon"),{opacity:0,scale:.7},{opacity:1,scale:1,duration:1.4,ease:"power2.out",transformOrigin:"0px 0px"},i+.2).fromTo(e(".b-ringg"),{opacity:0},{opacity:1,duration:1},i+.5).fromTo(e(".b-rb"),{opacity:0,scale:0},{opacity:s=>{var r;return(r=e(".b-rb")[s])!=null&&r.classList.contains("on")?1:.28},scale:1,duration:.4,stagger:{each:.045,from:"start"},ease:"back.out(3)",transformOrigin:"0px 0px"},i+.8).fromTo(e(".b-swag, .b-cordL"),{opacity:0},{opacity:1,duration:.8},i+1).fromTo(e(".b-letter"),{opacity:0,y:-50},{opacity:1,y:0,duration:.7,stagger:.07,ease:"back.out(1.6)"},i+1.2).fromTo(e(".b-letter-glow"),{opacity:.2},{opacity:1,duration:1,stagger:.05},i+1.9).fromTo(e(".b-stand"),{opacity:0,y:24},{opacity:1,y:0,duration:.9,ease:"power2.out"},i+.9),t.wait&&n.fromTo(e(".b-wait"),{opacity:0,y:10},{opacity:1,y:0,duration:.8},i+2.2),t.settled&&n.fromTo(e(".b-team:not(.fresh)"),{opacity:0},{opacity:1,duration:1.2,stagger:.06},i+.9)}function Pf(n,e,t,i,s){const r=jo(t),o=Go(i);n.set(e(r),{visibility:"visible"},s).fromTo(e(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},s).fromTo(e(".b-rb"),{scale:1},{scale:1.9,duration:.25,yoyo:!0,repeat:1,stagger:.012,transformOrigin:"0px 0px"},s).fromTo(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{strokeDashoffset:.08,opacity:1},{strokeDashoffset:-1,duration:.85,ease:"power1.inOut"},s+.15).to(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{opacity:0,duration:.2},s+.85).fromTo(e(`${r} .cordg`),{scaleY:0},{scaleY:1,duration:.45,ease:"power2.out",transformOrigin:"0px 0px"},s+.9).fromTo(e(`${r} .lbody`),{scale:.18,opacity:0,y:-10},{scale:1,opacity:1,y:0,duration:.8,ease:"back.out(1.7)",transformOrigin:"0px 0px"},s+1.2).fromTo(e(`${r} .ribs`),{scaleX:.2},{scaleX:1,duration:.7,ease:"power2.out",transformOrigin:"0px 0px"},s+1.3).fromTo(e(`${r} .glow`),{opacity:0},{opacity:1,duration:.9},s+1.4).fromTo(e(`${r} .b-lan`),{rotation:-5},{rotation:0,duration:1.6,ease:"elastic.out(1,0.35)",transformOrigin:"50% 0%"},s+1.7).fromTo(e(`${r} .nm`),{clipPath:"inset(0 100% 0 0)",opacity:0},{clipPath:"inset(0 0% 0 0)",opacity:1,duration:.8,ease:"power1.inOut"},s+1.8).to(e(".b-rb"),{opacity:c=>c<o?1:.28,duration:.5},s+.3)}function Fr(n,e,t,i){const s=jo(t);n.to(e(`${s} .glow`),{opacity:.08,duration:1},i).to(e(`${s} .lbody`),{filter:"saturate(.2) brightness(.45)",y:10,duration:1.2},i).to(e(`${s} .nm`),{opacity:.38,duration:1},i)}function Lf(n,e,t,i){const s=jo(t);n.to(e(`${s} .glow`),{opacity:1,duration:.8},i).to(e(`${s} .lbody`),{filter:"none",y:0,duration:.9},i).to(e(`${s} .nm`),{opacity:1,duration:.8},i)}function Or(n,e,t){n.fromTo(e(".b-stand"),{"--lit":.3},{"--lit":1,duration:1.1},t).fromTo(e(".b-aura"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:1.2,transformOrigin:"50% 50%"},t)}function If(n,e,t){n.to(e(".b-stand"),{"--lit":.3,duration:.8},t).to(e(".b-aura"),{opacity:0,duration:.8},t)}function Df(n,e,t,i){n.to(e(".b-rb"),{opacity:s=>s<Go(t)?1:.28,duration:.6},i)}function Uf(n,e,t,i=0){n.to(e(".b-team .nm"),{opacity:0,duration:.7},i+1).to(e(".b-team"),{x:s=>{var r;return(tt.x-(((r=t[s])==null?void 0:r.x)??tt.x))*.9},y:s=>{var r;return(tt.y-(((r=t[s])==null?void 0:r.y)??tt.y))*.9},scale:.15,opacity:0,duration:1.5,stagger:.06,ease:"power2.in",transformOrigin:"0px 0px"},i+1.1).to(e(".b-stand, .b-wait"),{opacity:0,y:40,duration:.9},i+1.6).to(e(".b-bulb, .b-ropes, .b-stones"),{opacity:0,duration:1},i+2.2).to(e(".b-logo"),{opacity:0,y:-80,duration:1,ease:"power2.in"},i+2.4).to(e(".b-rb"),{opacity:0,duration:.8,stagger:.02},i+2.5).to(e(".b-moon"),{scale:1.5,y:-130,opacity:0,duration:1.8,ease:"power2.in",transformOrigin:"0px 0px"},i+3).to(e(".b-ringg"),{y:100,opacity:0,duration:1.6,ease:"power2.in"},i+3.4).to(e(".b-grade"),{opacity:0,duration:1.4},i+3.6)}function Ff({value:n,ink:e="#0d1a15"}){return a.jsx("div",{className:"fo-qr",children:a.jsx(ar,{value:n,quiet:!0,ink:e,title:"QR для подключения"})})}const Of=".b-team, .b-wait";function Bf({teams:n,playerUrl:e,paper:t,groups:i,groupsOpen:s,onGroupsOpen:r,onGroupsClose:o,leaving:c,onLeft:l}){const u=j.useRef(null),d=j.useMemo(()=>n.map(L=>({id:L.id,name:L.name,hue:Tn(L.color),alive:L.alive})),[n]),f=j.useMemo(()=>Mf(d.length),[d.length]),h=j.useMemo(()=>nt.utils.selector(u),[]),m=j.useRef(new Set(d.map(L=>L.id))),[,g]=j.useState(0),y=new Set(d.filter(L=>!m.current.has(L.id)).map(L=>L.id)),x=j.useRef(new Map(d.map(L=>[L.id,L.alive]))),p=j.useRef(new Set),M=j.useRef(Go(d.length)),S=i.map(L=>L.join(",")).join("|"),b=i.length>0&&s,[T,w]=j.useState(i.length?s?"done":"back":void 0),R=j.useRef(null),v=j.useRef([]);Af(()=>{var L;return((L=R.current)==null?void 0:L.time())??0},v,i.length?i:null,T),j.useLayoutEffect(()=>{const L=nt.timeline();return Nf(L,h,{settled:!i.length,wait:d.length===0&&!i.length}),d.filter(z=>!z.alive).forEach(z=>{const O=nt.timeline();Fr(O,h,z.id,0),O.progress(1)}),()=>{L.kill()}},[]),j.useLayoutEffect(()=>{const L=d.filter(O=>!m.current.has(O.id)&&!p.current.has(O.id));L.forEach((O,$)=>{p.current.add(O.id);const k=nt.timeline({onComplete:()=>{m.current.add(O.id),p.current.delete(O.id),g(U=>U+1)}});Pf(k,h,O.id,d.length,$*.35),O.alive||Fr(k,h,O.id,2.6+$*.35)}),d.forEach(O=>{const $=x.current.get(O.id);if($!==void 0&&$!==O.alive&&m.current.has(O.id)){const k=nt.timeline();O.alive?Lf(k,h,O.id,0):Fr(k,h,O.id,0)}x.current.set(O.id,O.alive)}),!L.length&&d.length!==m.current.size&&Df(nt.timeline(),h,d.length,0);const z=new Set(d.map(O=>O.id));m.current.forEach(O=>{z.has(O)||m.current.delete(O)})},[d.map(L=>`${L.id}:${L.alive}`).join("|")]);const E=j.useRef(b),I=j.useRef(S),P=j.useRef(!0);return j.useLayoutEffect(()=>{if(!i.length){w(void 0),E.current=!1,I.current=S,P.current=!1;return}const L=I.current!==S,z=E.current;I.current=S,E.current=b;const O=$=>{var K;(K=R.current)==null||K.kill();const k=nt.timeline();Rf(k,h,i,$,Of,ie=>{k.fromTo(h(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},ie)}),R.current=k,w($);const U=nt.timeline();$==="back"?Or(U,h,.2):Or(U,h,0)};if(P.current){P.current=!1,O(b?"done":"back");return}b&&(L||!z)?O(L?"run":"done"):!b&&z&&O("back")},[S,b]),j.useEffect(()=>{i.length?Or(nt.timeline(),h,0):If(nt.timeline(),h,0)},[i.length]),j.useEffect(()=>{if(!b)return;const L=z=>{z.key==="Escape"&&o()};return addEventListener("keydown",L),()=>removeEventListener("keydown",L)},[b,o]),j.useLayoutEffect(()=>{if(!c)return;const L=f.slots.map((O,$)=>({id:d[$].id,x:O.x,y:O.ay})),z=nt.timeline({onComplete:()=>l==null?void 0:l()});return Uf(z,h,L,0),()=>{z.kill()}},[c]),a.jsxs(wf,{teams:d,layout:f,fresh:y,qr:t?null:a.jsx(Ff,{value:e}),qrLit:i.length>0,litN:M.current,wait:d.length===0&&!t&&!i.length,rootRef:u,children:[i.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"rz-veil",onClick:b?o:void 0,style:{pointerEvents:b?"auto":"none"}}),a.jsx(Cf,{groups:i,pills:v})]}),i.length>0&&!b&&a.jsx("button",{type:"button",className:"lb3-grp-btn",onClick:r,children:"СОСТАВЫ КОМАНД"})]})}function Nd({rects:n,srcs:e,fs:t,panel:i}){const s=j.useRef(null);return j.useEffect(()=>{const r=s.current.getContext("2d"),o=nh({rects:n,srcs:e,panel:i},40),c=()=>{r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,1920,1080),o(r,t)};return nt.ticker.add(c),()=>nt.ticker.remove(c)},[n,e,t,i]),a.jsx("canvas",{ref:s,className:"s4-cv",width:1920,height:1080,"aria-hidden":!0})}function Qs(n,e,t,i,s){const r=Math.min(i/n.w,s/n.h),o=Math.round(n.w*r),c=Math.round(n.h*r);return{x:Math.round(e-o/2),y:t,w:o,h:c}}const kf=n=>n<60?`~${n} мин`:`~${Math.floor(n/60)} ч ${n%60?`${n%60} мин`:""}`.trim();function zf(n){var u;const e=n.slide,t=(e.body??"").split(`
`).map(d=>d.trim()).filter(Boolean),i=e.images??[],s=e.show_rounds&&n.rounds.length?n.rounds.map((d,f)=>({n:f+1,name:d.name,count:d.count})):null,r=e.show_stats&&n.stats?n.stats:null,o=r?[[r.roundsCount,"раундов"],[r.questionsCount,"вопросов"],...r.hasMiniGame?[[1,"мини-игра"]]:[],...r.musicTracks>0?[[r.musicTracks,"треков"]]:[],[kf(r.totalMinutes),"на игру"]]:null;if(i.length>1||i.length===1&&(s||o||t.length===0))return null;const c=i.length===1&&n.image?{src:n.image.src,w:n.image.w,h:n.image.h}:null;if(i.length===1&&!c)return null;const l=t.length===0?"rstats":c?"rimg":t.length>5?"dense":"rules";return{title:(e.title??"").trim()||"ПРАВИЛА",lines:t,rounds:s,stats:o,note:((u=e.note)==null?void 0:u.trim())||null,photo:c,layout:l}}function Pd(n,e){const t=n<=8;let i=t?84:66,s=t?9:5;const r=t?200:168;if(n>12){const m=(1060-r)/n;s=m>=44?4:3,i=Math.floor(m-s)}const o=t?790:760,c=t?76:58,l=t?60:46,u=1150-o,d=e>0?Math.min(c,Math.floor(u/e)):c,f=Math.max(14,Math.min(l,d-Math.max(6,Math.round(d*.2)),i-8)),h=n>12||d<c||f<l;return{big:t,rh:i,gap:s,y0:r,brLeft:o,step:d,berry:f,custom:h,nameFs:i>=60?27:Math.max(14,Math.floor(i*.6)),medFs:Math.min(30,Math.round(i*.43)),totFs:Math.min(44,Math.round(i*.78)),berryFs:Math.min(t?32:26,Math.round(f*.56)),colFs:Math.min(24,Math.max(13,Math.round(f*.55)))}}function Gf(n,e,t){let i=n.filter(s=>s<=e).length;return t.forEach(s=>s.forEach((r,o)=>{r!==0&&o+1>i&&(i=o+1)})),Math.min(i,n.length)}function Ld(n,e,t,i,s){const r=s?new Map(s.order.map((o,c)=>[o,c])):null;return n.map((o,c)=>{const l=e.get(o.team.id)??[],u=r==null?void 0:r.get(o.team.id);return{id:o.team.id,name:o.team.name,color:i(o.team.color),place:o.place,sum:o.total,scores:t.map(d=>l[d]??0),...s?{delta:u==null?0:u-c,prevIdx:u}:{}}})}function Hf(n,e,t){return[...new Set(n.map(s=>s.place))].filter(s=>s<=3).sort((s,r)=>s-r).map(s=>{var o;const r=n.filter(c=>c.place===s);return{k:s-1,place:s,sum:((o=r[0])==null?void 0:o.total)??0,names:r.map(c=>({name:c.team.name,color:e(c.team.color),hue:t(c.team.color)}))}})}function jf(n){if(n<=0)return[];const e=Math.ceil(n/6),t=Math.ceil(n/e),i=Math.min(280,Math.floor((1800-(t-1)*20)/t)),s=i+20,r=e===1?0:e===2?380:270,o=e===1?400:e===2?240:200;return Array.from({length:n},(c,l)=>{const u=Math.floor(l/t),d=l%t,f=Math.min(t,n-u*t);return{x:(n===6?60:Math.round((1920-(f*s-20))/2))+d*s,y:o+u*r,w:i}})}function Vf(n,e){return!n||!e||n===e?null:e==="finale"?"bloom":n==="lobby"&&(e==="info"||e==="intro"||e==="round_intro")?"vine":n==="info"&&e==="round_intro"?"wind":n==="round_intro"&&e==="question"?"fly":e==="scoreboard"?"petal":n==="scoreboard"&&e==="break"?"mist":null}const Id=n=>`${String(Math.floor(Math.max(0,n)/60)).padStart(2,"0")}:${String(Math.max(0,n)%60).padStart(2,"0")}`,Br=n=>n%10===1&&n%100!==11?"балл":n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?"балла":"баллов";function Wf(n){if(n<=0)return{cols:1,rowH:84,fz:32};const e=n<=7?1:n<=16?2:3,t=Math.ceil(n/e),i=Math.min(84,Math.floor((800-(t-1)*10)/t));return{cols:e,rowH:i,fz:Math.min(32,Math.max(15,Math.round(i*.42)))}}function $f(n){switch(n){case"crossword":return"crossword";case"jeopardy":return"jeopardy";case"melody":return"melody";case"anagram":return"anagram";case"sprint":return"sprint";case"blitz":return"blitz";case"four_pics":return"reveal";default:return"standard"}}const Xf=n=>Math.min(112,Math.floor(1500/Math.max(1,...n.map(e=>e.length)))),qf=n=>Math.max(0,...n.map(e=>e.length))>24;function Yf(n,e=20){if(!qf(n))return n;const t=[];for(const i of n){let s="";for(const r of i.split(/\s+/).filter(Boolean))s&&(s+" "+r).length>e?(t.push(s),s=r):s=s?s+" "+r:r;s&&t.push(s)}return t}const Kf="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function Zf({v:n,onReady:e}){const t=n.lines,i=n.layout==="dense",s=n.layout==="rimg"&&!!n.photo,r=n.stats,o=j.useMemo(()=>({grow:[0],reveal:[0],bloom:[0],pulse:0}),[]),c=n.photo,l=j.useMemo(()=>c?[Qs(c,1560,250,560,600)]:[],[c]),u=t.length>7?29:t.length>5?34:40,d=JSON.stringify(n),f=ps(),{root:h}=fd(e,(x,p)=>{x.fromTo(p(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(p(".ru-vine"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.6,ease:"power2.inOut"},.2).fromTo(p(".ru-pl"),{opacity:0,x:-24,clipPath:"inset(0 100% 0 0 round 40px)"},{opacity:1,x:0,clipPath:"inset(0 0% 0 0 round 40px)",duration:.6,stagger:i?.3:.45,ease:"power2.out"},.9);const M=.9+t.length*(i?.3:.45);x.fromTo(p(".ru-rd"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.1},.9).fromTo(p(".ru-st"),{opacity:0,scale:.6},{opacity:1,scale:1,duration:.5,stagger:.12,ease:"back.out(2)"},1.6).fromTo(p(".ru-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},M),s&&x.fromTo(o.grow,{0:0},{0:1,duration:1.1,ease:"power2.inOut"},.4).fromTo(o.reveal,{0:0},{0:1,duration:.95,ease:"power2.inOut"},1.4).fromTo(o,{pulse:0},{pulse:1.15,duration:1.1},.4)},null,[d,o]),m=[{x:60,y:30,w:1160,h:980},{x:1250,y:180,w:620,h:780}],g=t.length===0,y=s?!1:!!n.rounds;return j.useLayoutEffect(()=>{const x=h.current;if(!x)return;const p=R=>x.querySelector(R),M=p(".ru-note"),S=M?M.offsetTop-12:1060,b=p(".ru-title");if(b){b.style.fontSize=g?"170px":"";const R=p(".ru-right"),v=g&&R&&R.offsetHeight>0?R.offsetLeft:1880;let E=parseFloat(getComputedStyle(b).fontSize)||120;for(;b.offsetLeft+b.offsetWidth>v&&E>48;)E-=4,b.style.fontSize=`${E}px`}const T=p(".ru-list");if(T){T.style.setProperty("--fz",`${u}px`);let R=u;for(;T.offsetTop+T.offsetHeight>S&&R>18;)R-=1,T.style.setProperty("--fz",`${R}px`)}const w=p(".ru-right");if(w){w.style.transform="";const R=w.offsetHeight,v=S-w.offsetTop;R>v&&R>0&&(w.style.transformOrigin="0 0",w.style.transform=`scale(${Math.max(.4,v/R).toFixed(3)})`)}},[d,u,f,g,h]),a.jsxs(mn,{rects:m,n:null,rootRef:h,cls:`s5 ru ru-${n.layout}`,children:[a.jsx("h1",{className:"ru-title",style:g?{fontSize:170,top:330}:void 0,children:n.title.split("").map((x,p)=>a.jsx("span",{className:"ch",children:x===" "?" ":x},p))}),!g&&a.jsx("svg",{className:"ru-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"ru-vine",d:"M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010"})}),!g&&a.jsx("ol",{className:"ru-list",style:{"--fz":`${u}px`},children:t.map((x,p)=>a.jsxs("li",{className:"ru-pl",children:[a.jsx("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Kf})}),a.jsx("span",{className:"idx",children:String(p+1).padStart(2,"0")}),a.jsx("span",{className:"t",children:x})]},p))}),a.jsxs("div",{className:`ru-right${s?" img":""}`,children:[y&&n.rounds&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"ru-h",children:"Раунды вечера"}),a.jsx("ul",{className:"ru-rounds",children:n.rounds.map((x,p)=>a.jsxs("li",{className:"ru-rd",children:[a.jsx("b",{children:x.n}),a.jsx("span",{children:x.name}),x.count>0&&a.jsxs("em",{children:[x.count," вопр."]})]},p))})]}),r&&a.jsx("div",{className:"ru-stats",children:r.map(([x,p],M)=>a.jsxs("div",{className:"ru-st",children:[a.jsx("b",{className:String(x).length>5?"sm":"",children:x}),a.jsx("span",{children:p})]},M))})]}),s&&c&&a.jsxs(a.Fragment,{children:[a.jsx(Nd,{rects:l,srcs:[c.src],fs:o}),c.caption&&a.jsx("div",{className:"ru-cap",style:{left:l[0].x,width:l[0].w,top:l[0].y+l[0].h+28},children:c.caption})]}),n.note&&a.jsx("div",{className:"ru-note",children:n.note})]})}const Jf={crossword:"#ffd98a",standard:"#7ff2d8",jeopardy:"#c9b6ff",melody:"#8fc8ff",anagram:"#ffc27a"},Qf={sprint:{cls:"spA",emblem:rh},blitz:{cls:"bz bzC",mood:"calm",emblem:sh},reveal:{cls:"rv rvA",emblem:ih}};function ep({id:n}){if(n==="crossword")return a.jsxs("svg",{className:"em em-cw",viewBox:"0 0 290 270",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"vn vh",d:"M 4 184 L 284 184"}),a.jsx("path",{className:"vn vv",d:"M 90 14 L 90 262"}),[..."РОМАН"].map((c,l)=>a.jsxs("g",{className:"ce r",transform:`translate(${14+l*50} 162)`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"r"+l)),[..."ГЕРОЙ"].map((c,l)=>l===3?null:a.jsxs("g",{className:"ce c",transform:`translate(64 ${12+l*50})`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"c"+l))]});if(n==="standard")return a.jsx("svg",{className:"em em-q",viewBox:"0 40 220 220",width:"180","aria-hidden":!0,children:a.jsx("g",{transform:"translate(110 222)",children:a.jsxs("g",{className:"qb",children:[Array.from({length:8},(i,s)=>a.jsx("g",{transform:`rotate(${s*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"9",ry:"20"})},s)),a.jsx("circle",{r:"8"})]})})});if(n==="jeopardy")return a.jsx("svg",{className:"em em-jp",viewBox:"0 0 260 260",width:"240","aria-hidden":!0,children:a.jsxs("g",{transform:"translate(130 130)",children:[[["100",-45],["200",45],["300",135],["400",225]].map(([i,s],r)=>a.jsx("g",{transform:`rotate(${s})`,children:a.jsxs("g",{className:"jpt","data-i":r,children:[a.jsx("path",{d:"M 0 -26 C -34 -50 -38 -98 0 -112 C 38 -98 34 -50 0 -26 Z"}),a.jsx("g",{transform:"translate(0 -72)",children:a.jsx("text",{textAnchor:"middle",dominantBaseline:"middle",style:{transform:`rotate(${-s}deg)`},children:i})})]})},r)),a.jsx("circle",{r:"24",className:"jpc"})]})});if(n==="melody")return a.jsxs("svg",{className:"em em-ml",viewBox:"0 0 290 240",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"ms",d:"M 14 44 C 90 6 200 6 276 46"}),[60,145,230].map((i,s)=>a.jsx("g",{transform:`translate(${i} ${30+(s===1?-4:6)})`,children:a.jsxs("g",{className:"bell","data-i":s,children:[a.jsx("path",{className:"bs",d:"M 0 0 L 0 26"}),a.jsx("path",{className:"bc",d:"M -34 96 C -30 60 -18 34 0 30 C 18 34 30 60 34 96 C 20 90 -20 90 -34 96 Z"}),a.jsx("circle",{className:"bk",cy:"102",r:"7"})]})},s)),[[40,150],[250,120],[150,180]].map(([i,s],r)=>a.jsx("text",{className:"nt",x:i,y:s,"data-i":r,children:"♪"},r))]});const e="ЛЕТО",t=[2,0,3,1];return a.jsxs("svg",{className:"em em-an",viewBox:"0 0 270 230",width:"250","aria-hidden":!0,children:[[...e].map((i,s)=>a.jsx("path",{className:"cup",d:`M ${16+s*62} 168 C ${16+s*62+4} 196 ${16+s*62+22} 206 ${16+s*62+28} 206 C ${16+s*62+36} 206 ${16+s*62+52} 196 ${16+s*62+56} 168 C ${16+s*62+40} 178 ${16+s*62+16} 178 ${16+s*62} 168 Z`},s)),[...e].map((i,s)=>a.jsx("g",{transform:`translate(${44+s*62} 120)`,children:a.jsxs("g",{className:"sd","data-o":t[s],"data-i":s,children:[a.jsx("circle",{r:"25"}),a.jsx("text",{y:"2",children:i})]})},s))]})}function tp(n,e,t){oh(n,e);const i=.9;t==="crossword"&&n.fromTo(e(".em .vn"),{strokeDashoffset:300,opacity:1},{strokeDashoffset:0,duration:.9,stagger:.25,ease:"power2.out"},i).fromTo(e(".em .ce.r"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.3).fromTo(e(".em .ce.c"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.9),t==="standard"&&n.fromTo(e(".em .qb"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},i+.2),t==="jeopardy"&&n.fromTo(e(".em .jpt"),{scale:0,opacity:0},{scale:1,opacity:1,svgOrigin:"0 0",duration:.5,stagger:.18,ease:"back.out(2)"},i).to(e('.em .jpt[data-i="1"]'),{y:-22,duration:.6,ease:"sine.inOut",yoyo:!0,repeat:1},i+1.2),t==="melody"&&n.fromTo(e(".em .bell"),{rotation:-26,opacity:0},{rotation:0,opacity:1,svgOrigin:"0 0",duration:1.2,stagger:.25,ease:"elastic.out(1,0.35)"},i).fromTo(e(".em .nt"),{opacity:0,y:14},{opacity:1,y:-16,duration:.7,stagger:.2},i+.8),t==="anagram"&&n.fromTo(e(".em .sd"),{y:-150,opacity:0},{y:0,opacity:1,duration:.7,stagger:.16,ease:"bounce.out"},i).fromTo(e(".em .cup"),{opacity:0},{opacity:1,duration:.4,stagger:.1},i-.2)}function np({kind:n,intro:e,onReady:t}){const i=Qf[n],s=Yf(e.titleLines),r=Xf(s),o=`${n}|${JSON.stringify(e)}`,c=ps(),{root:l}=fd(t,(d,f)=>tp(d,f,n),null,[o]);j.useLayoutEffect(()=>{const d=l.current;if(!d)return;const f=d.querySelector(".s1-intro-main"),h=d.querySelector(".s1-intro-title"),m=d.querySelector(".s1-intro-rules");m&&Sc([...m.querySelectorAll(".t")],()=>m.offsetTop+m.offsetHeight<=1050,22);const g=m?m.offsetLeft:1880,y=()=>Math.max(0,...[...(h==null?void 0:h.querySelectorAll(".ln"))??[]].map(x=>[...x.children].reduce((p,M)=>p+M.offsetWidth,0)));f&&h&&Sc([h],()=>{const x=f.offsetLeft+f.clientWidth/2,p=i?Math.min(y(),f.clientWidth):y();return x+p/2<=g&&x-p/2>=20&&f.offsetTop+f.offsetHeight<=1050},40)},[o,c,l,i]);const u=a.jsx(ah,{intro:s===e.titleLines?e:{...e,titleLines:s},emblem:i?i.emblem:a.jsx(ep,{id:n})});return i?a.jsx(mn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:i.cls,moodOverride:i.mood,children:u}):a.jsx(mn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:`rv ri ri-${n}`,children:a.jsx("div",{style:{"--acc":Jf[n],"--tfs":`${r}px`},children:u})})}const ip="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",sp=["","gold","silver","bronze"];function rp({v:n,rootRef:e,reveal:t}){const{rows:i,flip:s,cols:r}=n,o=i.length,c=r.length,l=Pd(o,c),{big:u,rh:d,gap:f,y0:h,custom:m}=l,g=Array.from({length:c},(w,R)=>Math.max(0,...i.map(v=>v.scores[R]??0))),y=t!==void 0,x=w=>!y||w>=o-t,p=ps(),M=i.map(w=>w.name).join("|");j.useLayoutEffect(()=>{const w=e.current;w&&w.querySelectorAll(".bd-nm").forEach(R=>{R.style.fontSize=m?`${l.nameFs}px`:"";let v=parseFloat(getComputedStyle(R).fontSize)||27;for(;R.offsetHeight>d-4&&v>12;)v-=1,R.style.fontSize=`${v}px`})},[M,d,m,l.nameFs,p,e]);const S=[{x:200,y:20,w:1520,h:1040}],b=i.map((w,R)=>R>0&&i[R-1].place===w.place?R:-1).filter(w=>w>=0),T=w=>m?w:void 0;return a.jsxs(mn,{rects:S,n:null,rootRef:e,cls:`s5 bd bd-${n.kind}${u?" big":""}${y?" bd-game":""}${y&&t>=o?" all-in":""}`,children:[a.jsxs("div",{className:"bd-title",children:[a.jsx("b",{children:n.title}),a.jsx("span",{children:n.sub})]}),a.jsxs("div",{className:"bd-colh",style:{top:h-40},children:[r.map((w,R)=>a.jsx("i",{className:R===c-1&&s?"last":"",style:{left:m?l.brLeft+R*l.step:(u?790:760)+R*(u?76:58),width:m?l.berry:u?60:46,...m?{fontSize:l.colFs}:{}},children:w},R)),a.jsx("em",{children:"Σ"})]}),i.map((w,R)=>{const v=w.delta??0;return a.jsxs("div",{className:`bd-row${w.place<=3?" pod p"+w.place:""}${y&&x(R)?" is-in":""}`,"data-i":R,style:{top:h+R*(d+f),height:d,...m?{"--rh":`${d}px`}:{}},children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:ip})}),a.jsx("span",{className:`bd-med ${sp[w.place]??""}`,style:T({fontSize:l.medFs}),children:w.place}),a.jsx("span",{className:"bd-chip",style:v===0?{visibility:"hidden",...T({fontSize:Math.min(22,Math.round(d*.55))})}:T({fontSize:Math.min(22,Math.round(d*.55))}),children:v>0?`▲ ${v}`:`▼ ${-v}`}),a.jsx("span",{className:"bd-nm",style:{color:w.color},children:w.name}),a.jsx("span",{className:"bd-brs",style:T({left:l.brLeft,gap:l.step-l.berry}),children:Array.from({length:c},(E,I)=>{const P=w.scores[I]??0;return a.jsx("i",{className:`bd-bry${P===g[I]&&g[I]>0?" best":""}${P===0?" z":""}${s&&I===c-1?" last":""}`,style:T({width:l.berry,height:l.berry,fontSize:l.berryFs}),children:P},I)})}),a.jsx("span",{className:"bd-tot",style:T({fontSize:l.totFs}),children:s?a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"a",children:w.prevSum??w.sum}),a.jsx("b",{className:"b",children:w.sum})]}):a.jsx("b",{children:w.sum})})]},w.id)}),b.map(w=>a.jsxs("svg",{className:`bd-knot${y&&x(w-1)?" is-in":""}`,style:{top:h+w*(d+f)-f-12,...m?{width:Math.min(70,d+4)}:{}},viewBox:"0 0 60 30","aria-hidden":!0,children:[a.jsx("path",{d:"M 6 4 C 20 4 18 26 30 26 C 42 26 40 4 54 4"}),a.jsx("circle",{cx:"30",cy:"15",r:"6"})]},w))]})}function Yi({hue:n,o:e=1}){const t=`hsl(${n} 55% 74%)`,i=`hsl(${n} 40% 28%)`;return a.jsxs("svg",{className:"lb-fl",viewBox:"-90 -82 180 250","aria-hidden":!0,children:[a.jsx("path",{className:"stem",d:"M 0 56 C -10 100 10 130 0 164"}),a.jsx("path",{className:"lf",d:"M 0 112 C -30 100 -50 112 -56 126 C -34 130 -14 126 0 112 Z"}),a.jsx("path",{className:"lf",d:"M 0 128 C 30 114 50 124 58 138 C 34 144 14 140 0 128 Z"}),a.jsx("g",{transform:"translate(0 0)",children:a.jsxs("g",{className:"bl",style:{transform:`scale(${e})`},children:[Array.from({length:8},(s,r)=>a.jsx("g",{transform:`rotate(${r*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-36",rx:"19",ry:"38",style:{fill:t,stroke:i}})},r)),a.jsx("circle",{r:"17",className:"ct"})]})})]})}const ys=n=>Math.sin(n*91.7+13.1)*43758.5453%1,ap=[32,352,205,150,270,12,185,48,320,95,228,0],kc=(n,e)=>n.length?n[e%n.length]:ap[e%12];function op(n,e,t,i){const s=t.state;s==="last"&&n.fromTo(e(".fl-lab, .fl-q"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6,stagger:.15},.2).fromTo(e(".fl-ans .l"),{opacity:0,scale:.25,y:40},{opacity:1,scale:1,y:0,duration:.55,stagger:.13,ease:"back.out(2)"},1.1).fromTo(e(".fl-vine"),{strokeDashoffset:1200},{strokeDashoffset:0,duration:1.6,ease:"power1.inOut"},2).fromTo(e(".fl-dawn"),{opacity:0},{opacity:1,duration:2.4,ease:"power1.in"},2.4).fromTo(e(".fl-go"),{opacity:0,x:-20},{opacity:1,x:0,duration:.6},3.4),s==="antic"&&(n.fromTo(e(".fl-bud"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.6,stagger:.07,ease:"back.out(1.6)"},.2).fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.6).fromTo(e(".fl-orb"),{x:0,y:0,opacity:0},{opacity:1,x:r=>0*r,duration:.01},.8),e(".fl-orb").forEach((r,o)=>{const c=o/30*Math.PI*2,l=520+o%5*60;n.fromTo(r,{x:Math.cos(c)*l,y:Math.sin(c)*l*.5},{x:0,y:0,duration:2.6,ease:"power2.in"},1+o%10*.08)}),n.fromTo(e(".fl-pod"),{scale:.7},{scale:1.1,duration:3,ease:"power2.in"},1).fromTo(e(".fl-pod"),{rotation:-3},{rotation:3,duration:.12,yoyo:!0,repeat:15,ease:"none"},2.6).fromTo(e(".fl-flash"),{opacity:0},{opacity:.9,duration:.5,yoyo:!0,repeat:1},4.2)),s==="medals"&&(i===void 0?[2,1,0]:[i]).forEach((o,c)=>{const l=.5+c*1.5;n.fromTo(e(`.fl-md[data-k="${o}"] .stem`),{scaleY:0},{scaleY:1,duration:.7,ease:"power2.out",transformOrigin:"50% 100%"},l).fromTo(e(`.fl-md[data-k="${o}"] .bl`),{scale:.2},{scale:1,svgOrigin:"0 0",duration:.9,ease:"back.out(1.8)"},l+.5).fromTo(e(`.fl-md[data-k="${o}"] .disc, .fl-md[data-k="${o}"] .nm, .fl-md[data-k="${o}"] .pt`),{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.12},l+1.1)}),s==="retro"&&t.cards.forEach((r,o)=>{if(i!==void 0&&o!==i)return;const c=i===void 0?o:0;n.fromTo(e(`.fl-rc[data-i="${o}"]`),{opacity:0,y:40,scale:.9},{opacity:1,y:0,scale:1,duration:.6,ease:"back.out(1.5)"},.4+c*.7).fromTo(e(`.fl-rc[data-i="${o}"] .win`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.5},.8+c*.7)}),s==="winner"&&n.fromTo(e(".fl-rays"),{opacity:0,rotation:-30},{opacity:1,rotation:0,duration:2,ease:"power2.out"},.1).fromTo(e(".fl-big .stem"),{scaleY:0},{scaleY:1,duration:.8,ease:"power2.out",transformOrigin:"50% 100%"},.3).fromTo(e(".fl-big .bl"),{scale:.15},{scale:1,svgOrigin:"0 0",duration:1.6,ease:"back.out(1.5)"},.9).fromTo(e(".fl-w1"),{opacity:0,y:-14},{opacity:1,y:0,duration:.7},2).fromTo(e(".fl-w2 .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.04,ease:"back.out(1.8)"},2.3).fromTo(e(".fl-w3"),{opacity:0},{opacity:1,duration:.7},3.2).fromTo(e(".fl-pet"),{opacity:0,y:-80},{opacity:.95,y:r=>120+r%7*120,rotation:r=>r%2?160:-160,duration:3.4,stagger:.07,ease:"sine.out"},2.2),s==="party"&&(n.fromTo(e(".fl-lant"),{y:1200,opacity:0},{y:0,opacity:1,duration:3.6,stagger:.12,ease:"power2.out"},.2).fromTo(e(".fl-th .ch"),{opacity:0,y:36,rotation:-7},{opacity:1,y:0,rotation:0,duration:.6,stagger:.05,ease:"back.out(1.8)"},1).fromTo(e(".fl-pod3 > *"),{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.2},2.4),e(".fl-fw").forEach((r,o)=>n.fromTo(r,{scale:0,opacity:1},{scale:1,duration:1.1,ease:"power2.out"},1.2+o*.5).to(r,{opacity:0,duration:1.2},1.9+o*.5))),s==="break"&&n.fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.2).fromTo(e(".fl-clock"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:.8,ease:"back.out(1.6)"},.6)}const kr=n=>n.split("").map((e,t)=>a.jsx("span",{className:"ch",children:e===" "?" ":e},t));function cp({v:n,rootRef:e}){const t=n.state,i=t==="winner"||t==="party"||t==="medals"||t==="last",s="hues"in n?n.hues:[],r=s.join(","),o=j.useMemo(()=>Array.from({length:46},(d,f)=>({x:120+Math.abs(ys(f))*1680,d:Math.abs(ys(f+7))*3,s:.6+Math.abs(ys(f+3))*.9,h:kc(s,f),y:90+Math.abs(ys(f+11))*880})),[r]),c=ps(),l=JSON.stringify(n);j.useLayoutEffect(()=>{const d=e.current;if(!d)return;d.querySelectorAll(".fl-md").forEach(h=>{const m=h.querySelector(".nm"),g=h.querySelector(".pt");if(!m||!g)return;m.style.fontSize="";let y=parseFloat(getComputedStyle(m).fontSize)||38;for(;m.offsetTop+m.offsetHeight+50>1070&&y>16;)y-=2,m.style.fontSize=`${y}px`;const x=m.offsetTop+m.offsetHeight+8;g.offsetTop<x&&(g.style.top=`${x}px`)});const f=d.querySelector(".fl-w2");if(f){const h=f.style.fontSize;let m=parseFloat(h)||100;const g=f.querySelector(":scope > div")?[...f.querySelectorAll(":scope > div")]:[f],y=()=>Math.max(0,...g.map(x=>[...x.querySelectorAll(":scope > .ch")].reduce((p,M)=>p+M.offsetWidth,0)));for(;(y()>f.clientWidth||f.offsetHeight>170)&&m>30;)m-=4,f.style.fontSize=`${m}px`}},[l,c,e]);const u=[{x:300,y:200,w:1400,h:700}];return a.jsxs(mn,{rects:u,n:null,rootRef:e,cls:`s5 fl fl-${t}`,moodOverride:i?"warning":void 0,children:[n.state==="last"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-dawn"}),a.jsxs("div",{className:"fl-lab",style:{left:120,width:1500,top:120},children:["Последний ответ · раунд ",n.round," · вопрос ",n.q," из ",n.of]}),a.jsx("div",{className:"fl-q",style:{left:120,width:1500,top:180},children:n.text}),a.jsx("div",{className:"fl-ans",style:{left:120,width:1500,top:380},children:n.answer.toUpperCase().split("").map((d,f)=>a.jsx("span",{className:"l",children:d},f))}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"fl-vine",d:"M 220 740 C 520 790 760 700 1020 750 S 1500 800 1780 740"})}),a.jsx("div",{className:"fl-go",children:"Подводим итоги →"})]}),n.state==="antic"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:90},children:n.title??"Подводим итоги"}),a.jsx("div",{className:"fl-t2",style:{left:300,width:1500,top:190},children:n.sub??"Скоро объявим победителей"}),n.hues.map((d,f)=>{const h=f/n.hues.length*Math.PI*2-Math.PI/2;return a.jsx("div",{className:"fl-bud",style:{left:1100+Math.cos(h)*640-40,top:590+Math.sin(h)*300-40},children:a.jsx(Yi,{hue:d,o:.38})},f)}),a.jsx("div",{className:"fl-pod",style:{left:1010,top:490},children:a.jsx(Yi,{hue:46,o:.5})}),Array.from({length:30},(d,f)=>a.jsx("i",{className:"fl-orb",style:{left:1091,top:581}},f)),a.jsx("div",{className:"fl-flash"}),n.clock&&a.jsx("div",{className:"fl-clock fl-clock-sm",children:n.clock})]}),n.state==="medals"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:50},children:"Награждение"}),n.slots.map(d=>{var y;const[f,h]=[[1100,250],[560,330],[1640,420]][d.k]??[1100,250],m=["gold","silver","bronze"][d.k],g=d.names.length>1||d.names.some(x=>x.name.length>20);return a.jsxs("div",{className:"fl-md","data-k":d.k,style:{left:f-200,top:0,width:400},children:[a.jsx("div",{className:"stem",style:{left:197,top:h+90,height:720-h}}),a.jsx("div",{className:"fl-fw1",style:{left:100,top:h-100},children:a.jsx(Yi,{hue:((y=d.names[0])==null?void 0:y.hue)??46,o:1})}),a.jsx("div",{className:`disc ${m}`,style:{left:160,top:h-10},children:d.place}),a.jsx("div",{className:"nm",style:{top:800,color:d.names.length===1?d.names[0].color:void 0},children:d.names.length===1?d.names[0].name:d.names.map((x,p)=>a.jsx("div",{style:{color:x.color},children:x.name},p))}),a.jsxs("div",{className:"pt",style:{top:800+(g?118:70)},children:[d.sum," ",Br(d.sum)]})]},d.k)})]}),n.state==="retro"&&(()=>{const d=jf(n.cards.length),f=n.cards.length!==6,h=[...new Set(d.map(m=>m.y))];return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:h.length>1?40:60},children:"Победители раундов"}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:h.map(m=>a.jsx("path",{className:"fl-limb",d:"M 70 380 C 500 340 1400 420 1850 360",transform:m!==400?`translate(0 ${m-400})`:void 0},m))}),n.cards.map((m,g)=>{var y,x;return g>=(n.shown??n.cards.length)?null:a.jsxs("div",{className:"fl-rc","data-i":g,style:{left:d[g].x,top:d[g].y,...f&&d[g].w!==280?{width:d[g].w}:{},...h.length>2?{minHeight:230}:{}},children:[a.jsx("i",{className:"cord"}),a.jsx("b",{className:"rn",children:m.n}),a.jsx("span",{className:"rname",children:m.name}),a.jsx("span",{className:"win",style:{color:(y=m.team)==null?void 0:y.color},children:((x=m.team)==null?void 0:x.name)??"—"}),a.jsxs("em",{children:[m.pts," ",Br(m.pts)]})]},g)})]})})(),n.state==="winner"&&a.jsxs(a.Fragment,{children:[a.jsx("svg",{className:"fl-rays",viewBox:"-960 -540 1920 1080","aria-hidden":!0,children:Array.from({length:16},(d,f)=>a.jsx("path",{d:"M 0 0 L -60 -1200 L 60 -1200 Z",transform:`rotate(${f*22.5})`},f))}),a.jsx("div",{className:"fl-w1",style:{left:300,width:1500,top:60},children:n.names.length>1?"ПОБЕДИТЕЛИ":"ПОБЕДИТЕЛЬ"}),a.jsxs("div",{className:"fl-big",style:{left:770,top:150},children:[a.jsx("div",{className:"stem"}),a.jsx(Yi,{hue:46,o:1})]}),a.jsx("div",{className:"fl-w2",style:{left:300,width:1500,top:700,fontSize:n.names.length>1||n.names.some(d=>d.name.length>20)?64:100},children:n.names.length===1?kr(n.names[0].name):n.names.map((d,f)=>a.jsx("div",{children:kr(d.name)},f))}),a.jsxs("div",{className:"fl-w3",style:{left:300,width:1500,top:880},children:[n.sum," ",Br(n.sum)]}),o.map((d,f)=>a.jsx("i",{className:"fl-pet",style:{left:d.x,top:-40,"--h":d.h,transform:`scale(${d.s})`}},f))]}),n.state==="party"&&a.jsxs(a.Fragment,{children:[Array.from({length:5},(d,f)=>a.jsx("div",{className:"fl-fw",style:{left:260+f*350,top:180+f%2*150},children:Array.from({length:14},(h,m)=>a.jsx("i",{style:{transform:`rotate(${m*25.7}deg) translateY(-110px)`,background:Bi(kc(s,f*3+m))}},m))},f)),o.slice(0,26).map((d,f)=>a.jsx("div",{className:"fl-lant",style:{left:d.x,top:d.y,transform:`scale(${d.s*.9})`},children:a.jsx(Yi,{hue:d.h,o:1})},f)),a.jsx("div",{className:"fl-th",style:{left:300,width:1500,top:380},children:kr("Спасибо за игру!")}),a.jsx("div",{className:"fl-pod3",style:{left:300,width:1500,top:560},children:n.top.map((d,f)=>a.jsxs("span",{style:{color:d.color},children:[a.jsx("b",{children:f+1}),d.name]},f))})]}),n.state==="break"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:210,width:1500,top:150},children:"Перерыв"}),a.jsx("div",{className:"fl-t2",style:{left:210,width:1500,top:270},children:n.sub}),a.jsx("div",{className:"fl-clock",children:n.clock})]})]})}const bs=n=>Math.abs(Math.sin(n*91.7+13.1)*43758.5453%1),lp=()=>Array.from({length:40},(n,e)=>({y:60+bs(e)*960,d:bs(e+5)*.5,s:.7+bs(e+9),r:bs(e+3)*360}));function dp({state:n,bits:e}){return a.jsxs(a.Fragment,{children:[n==="vine"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-veil"}),a.jsx("svg",{className:"tr-vine",viewBox:"0 0 1920 1080","aria-hidden":!0,children:Array.from({length:7},(t,i)=>a.jsx("path",{d:`M ${130+i*280} -20 C ${60+i*280} 260 ${230+i*280} 420 ${130+i*280} 560 S ${60+i*280} 860 ${150+i*280} 1100`},i))})]}),n==="wind"&&e.slice(0,26).map((t,i)=>a.jsx("i",{className:"tr-leaf",style:{top:t.y,transform:`scale(${t.s})`}},i)),n==="fly"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-flash"}),Array.from({length:36},(t,i)=>a.jsx("i",{className:"tr-orb",style:{left:960,top:540}},i))]}),n==="petal"&&e.map((t,i)=>a.jsx("i",{className:"tr-pet",style:{top:t.y-140,"--h":i*37%360}},i)),n==="mist"&&[0,1,2,3].map(t=>a.jsx("div",{className:"tr-fog",style:{top:t*270}},t)),n==="bloom"&&a.jsxs("svg",{className:"tr-iris",viewBox:"-300 -300 600 600","aria-hidden":!0,children:[Array.from({length:8},(t,i)=>a.jsx("g",{transform:`rotate(${i*45})`,children:a.jsx("ellipse",{className:"p",cx:"0",cy:"-150",rx:"60",ry:"150"})},i)),a.jsx("circle",{r:"46",fill:"#f0c055"})]})]})}function up(n,e,t,i){t==="vine"&&n.set(e(".tr-vine path"),{strokeDashoffset:0},0).set(e(".tr-veil"),{opacity:1},0).to(e(".tr-vine path"),{strokeDashoffset:-1400,duration:.7,stagger:.06,ease:"power2.in"},.1).to(e(".tr-veil"),{opacity:0,duration:.5},.2),t==="wind"&&n.fromTo(e(".tr-leaf"),{x:-400,opacity:0,rotation:s=>s*40},{x:2400,opacity:1,rotation:s=>s*40+540,duration:1.5,stagger:.03,ease:"power1.inOut"},0),t==="fly"&&(e(".tr-orb").forEach((s,r)=>n.fromTo(s,{x:0,y:0,opacity:1,scale:.4},{x:Math.cos(r)*(300+r%7*120),y:Math.sin(r)*(200+r%5*90),scale:1.2,duration:.9,ease:"power2.out"},0).to(s,{opacity:0,duration:.6},.8)),n.fromTo(e(".tr-flash"),{opacity:.95},{opacity:0,duration:.45},0)),t==="petal"&&n.fromTo(e(".tr-pet"),{x:-200,opacity:0},{x:s=>2100+s%4*80,opacity:1,y:s=>i[s].y+140,rotation:s=>i[s].r+500,duration:1.7,stagger:.025,ease:"sine.inOut"},0),t==="mist"&&n.set(e(".tr-fog"),{xPercent:0},0).to(e(".tr-fog"),{xPercent:110,duration:.8,stagger:.1,ease:"power2.in"},.1),t==="bloom"&&n.set(e(".tr-iris"),{scale:1,rotation:50},0).to(e(".tr-iris"),{scale:3.2,opacity:0,rotation:90,duration:.8,ease:"power2.out"},0)}function hp({kind:n,onDone:e}){const t=j.useRef(null),i=j.useMemo(lp,[]),s=j.useRef(e);return s.current=e,j.useLayoutEffect(()=>{const r=nt.utils.selector(t),o=nt.timeline({onComplete:()=>s.current()});return up(o,r,n,i),()=>{o.kill()}},[n,i]),a.jsx("div",{ref:t,className:`s5 tr tr-ov tr-${n}`,"aria-hidden":!0,children:a.jsx(dp,{state:n,bits:i})})}const Dd=n=>{n.tl.play()};function fp({view:n}){return a.jsx("div",{className:"fo-screen",children:a.jsx(Zf,{v:n,onReady:Dd})})}function pp({kind:n,intro:e}){return a.jsx("div",{className:"fo-screen",children:a.jsx(np,{kind:n,intro:e,onReady:Dd})})}function Ud({view:n,reveal:e,flipKey:t}){const i=j.useRef(null);Fo(i,"in",(u,d)=>{u.fromTo(d(".bd-title"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6},.1).fromTo(d(".bd-colh"),{opacity:0},{opacity:1,duration:.5},.4)});const s=n.rows.length,r=s>0&&e>=s,o=Pd(s,n.cols.length),c=j.useRef(null),l=j.useRef(n.rows);return l.current=n.rows,j.useLayoutEffect(()=>{if(!r||!t||c.current===t||!i.current||(c.current=t,typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const u=nt.utils.selector(i),d=nt.timeline({delay:.6});l.current.forEach((f,h)=>{const m=((f.prevIdx??h)-h)*(o.rh+o.gap);m&&d.fromTo(u(`.bd-row[data-i="${h}"]`),{y:m},{y:0,duration:1.3,ease:"power3.inOut",clearProps:"transform"},0)})},[r,t]),a.jsx("div",{className:"fo-screen",children:a.jsx(rp,{v:n,rootRef:i,reveal:e})})}function Ii({view:n,step:e,only:t,onClick:i}){const s=j.useRef(null),r=j.useRef(n);return r.current=n,Fo(s,e,(o,c)=>op(o,c,r.current,t)),a.jsx("div",{className:"fo-screen",onClick:i,children:a.jsx(cp,{v:n,rootRef:s})})}function mp({hues:n,onDone:e}){const t=j.useRef(e);return t.current=e,j.useEffect(()=>{const i=setTimeout(()=>t.current(),5600);return()=>clearTimeout(i)},[]),a.jsx(Ii,{view:{state:"antic",hues:n},step:"antic"})}function gp({num:n,paper:e,startedAt:t,seconds:i,teams:s}){const r=j.useRef(null),o=pd(t,i,!0);Fo(r,"in",(f,h)=>{f.fromTo(h(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(h(".at5-sub"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},.5).fromTo(h(".at5-timer"),{clipPath:"inset(100% -40% 0 -40%)"},{clipPath:"inset(0% -40% 0 -40%)",duration:1.3,ease:"power2.out"},.2).fromTo(h(".at5-t"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.05},.8)});const c=Wf((s==null?void 0:s.length)??0),l=ps(),u=(s??[]).map(f=>f.name).join("|");j.useLayoutEffect(()=>{var f;(f=r.current)==null||f.querySelectorAll(".at5-t .nm").forEach(h=>{h.style.fontSize="";const m=h.parentElement;let g=parseFloat(getComputedStyle(h).fontSize)||30;for(;h.offsetHeight>m.clientHeight-6&&g>12;)g-=1,h.style.fontSize=`${g}px`})},[u,l,c.rowH,c.fz]);const d=e?"Сдавайте бланки":"Отвечайте!";return a.jsx("div",{className:"fo-screen",children:a.jsxs(mn,{rects:e?[{x:560,y:160,w:800,h:880}]:[{x:60,y:30,w:600,h:1e3},{x:680,y:220,w:1200,h:830}],n:t?o.left:null,rootRef:r,cls:`s5 ru at5${e?" paper":""}`,children:[a.jsx("h1",{className:"ru-title",children:d.split("").map((f,h)=>a.jsx("span",{className:"ch",children:f===" "?" ":f},h))}),a.jsxs("div",{className:"at5-sub",children:["Раунд ",n," · ",e?"передайте бланки ведущему":"капитаны отправляют ответы с телефонов"]}),a.jsx("div",{className:"at5-timer",children:a.jsx(ch,{n:o.left,total:i,size:e?420:380,seeds:24,stem:e?530:585})}),s&&a.jsx("ul",{className:"at5-teams",style:{gridTemplateColumns:`repeat(${c.cols}, 1fr)`,gridAutoRows:c.rowH,"--fz":`${c.fz}px`},children:s.map(f=>a.jsxs("li",{className:`at5-t${f.done?" done":""}`,children:[a.jsx("span",{className:"nm",style:{color:f.color},children:f.name}),a.jsxs("em",{children:[f.got,"/",f.total]})]},f.id))})]})})}function xp({q:n,roundName:e,qno:t,seconds:i}){const s=j.useMemo(()=>Ed(n,He,""),[n.id,n.question_text,JSON.stringify(n.media),JSON.stringify(n.answer)]);return a.jsx("div",{className:"fo-screen",children:a.jsx(Td,{q:s,roundName:e,qno:t,startedAt:null,seconds:i,reveal:!1,calm:!0,from:"D"})})}function _p({on:n,phase:e}){const t=j.useRef(e),[i,s]=j.useState(null);j.useLayoutEffect(()=>{const o=n?Vf(t.current,e):null;t.current=e,o&&(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||s(c=>({kind:o,n:((c==null?void 0:c.n)??0)+1})))},[n,e]);const r=j.useCallback(()=>s(null),[]);return!n||!i?null:a.jsx(hp,{kind:i.kind,onDone:r},i.n)}function vp({theme:n,teams:e,playerUrl:t,showQr:i,lit:s}){const r=n==="ny_book";return a.jsxs(a.Fragment,{children:[e.length>0&&a.jsx(Dc,{where:Kh,children:r?a.jsx(Zh,{teams:e}):a.jsx(Jh,{teams:e})}),i&&a.jsx(Dc,{where:Qh,children:r?a.jsx(ef,{lit:s,children:a.jsx(ar,{value:t,quiet:!0,ink:"#1d2b4a",title:"QR для подключения",className:"ny-qr-svg"})}):a.jsx(tf,{lit:s,children:a.jsx(ar,{value:t,quiet:!0,ink:"#0b1735",title:"QR для подключения",className:"ny-qr-svg"})})})]})}const Fd="qp-fx-enabled",Mp=4e3,yp={classic:520,potter:700};function bp(){try{const n=localStorage.getItem(Fd);return n===null?!0:n==="1"}catch{return!0}}function Sp(n){try{localStorage.setItem(Fd,n?"1":"0")}catch{}}function wp(){return typeof location<"u"&&location.href.includes("nofx=1")}function Ep({theme:n,trigger:e,hud:t}){const[i,s]=j.useState(bp),r=j.useRef(null),o=j.useRef(0),[c,l]=j.useState(null);j.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",i),()=>{document.documentElement.classList.remove("fx-force-motion")}),[i]),j.useEffect(()=>{const d=r.current===null;if(r.current=e,d||!i||n==="new_year"||wp())return;const f=Date.now();f-o.current<Mp||(o.current=f,l(f))},[e]),j.useEffect(()=>{if(c===null)return;const d=(yp[n]??300)+50,f=setTimeout(()=>l(null),d);return()=>clearTimeout(f)},[c,n]);const u=n==="classic"||n==="potter";return a.jsxs(a.Fragment,{children:[u&&a.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":i,title:i?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(d=>{const f=!d;return Sp(f),f}),children:"✨"}),c!==null&&n==="classic"&&a.jsx(Ap,{},c),c!==null&&n==="potter"&&a.jsx(Cp,{},c),n==="classic"&&t&&a.jsx(Tp,{label:t},t)]})}function Tp({label:n}){const[e,t]=j.useState(()=>90+Math.floor(Math.random()*10));return j.useEffect(()=>{const i=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(i)},[]),a.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",n," · SIG ",e,"%"]})}function Ap(){return a.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[a.jsx("span",{className:"fx-beam"}),a.jsx("span",{className:"fx-rgb"})]})}function Cp(){const n=Array.from({length:22},(e,t)=>t);return a.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>a.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const zc=["🥇","🥈","🥉"];function ka({theme:n,place:e}){return n==="classic"?a.jsx(Rp,{place:e}):n==="potter"?a.jsx(Pp,{place:e}):n==="new_year"?a.jsx(Np,{place:e}):a.jsx("span",{className:"award-emoji",children:zc[e-1]??zc[2]})}function Rp({place:n}){return a.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ah-orbit"}),a.jsx("span",{className:"ah-face",children:a.jsx("b",{children:n})})]})}function Np({place:n}){return a.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ab-cap"}),a.jsxs("span",{className:"ab-ball",children:[a.jsx("span",{className:"ab-shine"}),a.jsx("b",{children:n})]})]})}function Pp({place:n}){return a.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"am-ribbon"}),a.jsxs("span",{className:"am-disc",children:[a.jsx("span",{className:"am-shine"}),a.jsx("b",{children:n})]})]})}function Lp(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}function Ip({rules:n,delay:e}){const t=Oo([n.join("|")],{items:".rule-item",minScale:.5});return a.jsxs("div",{className:"rules-frame","data-count":n.length,children:[a.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),a.jsx("div",{className:"rules-fit",children:a.jsx("div",{className:"rules-body",ref:t,children:n.map((i,s)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${e(s)}s`},children:[a.jsx("span",{className:"idx",children:String(s+1).padStart(2,"0")}),i]},s))})})]})}const Dp={1:["#f6d56a","#b8861b","#7b5410"],2:["#eef2f6","#9aa7b4","#5b6671"],3:["#ecae7a","#a8612c","#6b3a17"]};function Up({place:n}){const[e,t,i]=Dp[n],s=`fm${n}`;let r="";for(let o=0;o<10;o++){const c=o*Math.PI/5-Math.PI/2,l=o%2?7:17;r+=`${o?"L":"M"}${(50+Math.cos(c)*l).toFixed(1)} ${(54+Math.sin(c)*l).toFixed(1)}`}return a.jsxs("svg",{className:`fin-medal m${n}`,viewBox:"0 0 100 124","aria-hidden":"true",children:[a.jsx("defs",{children:a.jsxs("radialGradient",{id:s,cx:"35%",cy:"30%",children:[a.jsx("stop",{offset:"0",stopColor:e}),a.jsx("stop",{offset:".6",stopColor:t}),a.jsx("stop",{offset:"1",stopColor:i})]})}),a.jsx("path",{d:"M30 56 L18 120 L40 108 L50 123 L60 108 L82 120 L70 56Z",fill:"#b3263a",stroke:"#7a1626",strokeWidth:"2"}),a.jsx("circle",{cx:"50",cy:"48",r:"40",fill:`url(#${s})`,stroke:i,strokeWidth:"3"}),a.jsx("circle",{cx:"50",cy:"48",r:"31",fill:"none",stroke:"rgba(255,255,255,.55)",strokeWidth:"2"}),a.jsx("path",{d:`${r}Z`,transform:"translate(0 -6)",fill:"rgba(255,255,255,.92)"})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vo="185",Fp=0,Gc=1,Op=2,er=1,Bp=2,os=3,Wn=0,Ht=1,Sn=2,An=0,Di=1,ui=2,Hc=3,jc=4,kp=5,ni=100,zp=101,Gp=102,Hp=103,jp=104,Vp=200,Wp=201,$p=202,Xp=203,za=204,Ga=205,qp=206,Yp=207,Kp=208,Zp=209,Jp=210,Qp=211,em=212,tm=213,nm=214,Ha=0,ja=1,Va=2,zi=3,Wa=4,$a=5,Xa=6,qa=7,Od=0,im=1,sm=2,fn=0,Bd=1,kd=2,zd=3,Gd=4,Hd=5,jd=6,Vd=7,Wd=300,hi=301,Gi=302,zr=303,Gr=304,Mr=306,Ya=1e3,wn=1001,Ka=1002,Nt=1003,rm=1004,Ss=1005,Dt=1006,Hr=1007,ai=1008,$t=1009,$d=1010,Xd=1011,us=1012,Wo=1013,gn=1014,un=1015,Nn=1016,$o=1017,Xo=1018,hs=1020,qd=35902,Yd=35899,Kd=1021,Zd=1022,nn=1023,Pn=1026,oi=1027,Jd=1028,qo=1029,fi=1030,Yo=1031,Ko=1033,tr=33776,nr=33777,ir=33778,sr=33779,Za=35840,Ja=35841,Qa=35842,eo=35843,to=36196,no=37492,io=37496,so=37488,ro=37489,lr=37490,ao=37491,oo=37808,co=37809,lo=37810,uo=37811,ho=37812,fo=37813,po=37814,mo=37815,go=37816,xo=37817,_o=37818,vo=37819,Mo=37820,yo=37821,bo=36492,So=36494,wo=36495,Eo=36283,To=36284,dr=36285,Ao=36286,am=3200,Co=0,om=1,Hn="",Yt="srgb",ur="srgb-linear",hr="linear",it="srgb",_i=7680,Vc=519,cm=512,lm=513,dm=514,Zo=515,um=516,hm=517,Jo=518,fm=519,Wc=35044,$c="300 es",hn=2e3,fs=2001;function pm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function fr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function mm(){const n=fr("canvas");return n.style.display="block",n}const Xc={};function qc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Qd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=Qd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=Qd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ui(...n){const e=n.join(" ");e in Xc||(Xc[e]=!0,Oe(...n))}function gm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const xm={[Ha]:ja,[Va]:Xa,[Wa]:qa,[zi]:$a,[ja]:Ha,[Xa]:Va,[qa]:Wa,[$a]:zi};class mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jr=Math.PI/180,Ro=180/Math.PI;function ms(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function _m(n,e){return(n%e+e)%e}function Vr(n,e,t){return(1-t)*n+t*e}function Ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const lc=class lc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};lc.prototype.isVector2=!0;let Ze=lc;class Wi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,c){let l=i[s+0],u=i[s+1],d=i[s+2],f=i[s+3],h=r[o+0],m=r[o+1],g=r[o+2],y=r[o+3];if(f!==y||l!==h||u!==m||d!==g){let x=l*h+u*m+d*g+f*y;x<0&&(h=-h,m=-m,g=-g,y=-y,x=-x);let p=1-c;if(x<.9995){const M=Math.acos(x),S=Math.sin(M);p=Math.sin(p*M)/S,c=Math.sin(c*M)/S,l=l*p+h*c,u=u*p+m*c,d=d*p+g*c,f=f*p+y*c}else{l=l*p+h*c,u=u*p+m*c,d=d*p+g*c,f=f*p+y*c;const M=1/Math.sqrt(l*l+u*u+d*d+f*f);l*=M,u*=M,d*=M,f*=M}}e[t]=l,e[t+1]=u,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,o){const c=i[s],l=i[s+1],u=i[s+2],d=i[s+3],f=r[o],h=r[o+1],m=r[o+2],g=r[o+3];return e[t]=c*g+d*f+l*m-u*h,e[t+1]=l*g+d*h+u*f-c*m,e[t+2]=u*g+d*m+c*h-l*f,e[t+3]=d*g-c*f-l*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,c=Math.cos,l=Math.sin,u=c(i/2),d=c(s/2),f=c(r/2),h=l(i/2),m=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*d*f+u*m*g,this._y=u*m*f-h*d*g,this._z=u*d*g+h*m*f,this._w=u*d*f-h*m*g;break;case"YXZ":this._x=h*d*f+u*m*g,this._y=u*m*f-h*d*g,this._z=u*d*g-h*m*f,this._w=u*d*f+h*m*g;break;case"ZXY":this._x=h*d*f-u*m*g,this._y=u*m*f+h*d*g,this._z=u*d*g+h*m*f,this._w=u*d*f-h*m*g;break;case"ZYX":this._x=h*d*f-u*m*g,this._y=u*m*f+h*d*g,this._z=u*d*g-h*m*f,this._w=u*d*f+h*m*g;break;case"YZX":this._x=h*d*f+u*m*g,this._y=u*m*f+h*d*g,this._z=u*d*g-h*m*f,this._w=u*d*f-h*m*g;break;case"XZY":this._x=h*d*f-u*m*g,this._y=u*m*f-h*d*g,this._z=u*d*g+h*m*f,this._w=u*d*f+h*m*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],c=t[5],l=t[9],u=t[2],d=t[6],f=t[10],h=i+c+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-u)*m,this._z=(o-s)*m}else if(i>c&&i>f){const m=2*Math.sqrt(1+i-c-f);this._w=(d-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+u)/m}else if(c>f){const m=2*Math.sqrt(1+c-i-f);this._w=(r-u)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+f-i-c);this._w=(o-s)/m,this._x=(r+u)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,c=t._x,l=t._y,u=t._z,d=t._w;return this._x=i*d+o*c+s*u-r*l,this._y=s*d+o*l+r*c-i*u,this._z=r*d+o*u+i*l-s*c,this._w=o*d-i*c-s*l-r*u,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,o=-o,c=-c);let l=1-t;if(c<.9995){const u=Math.acos(c),d=Math.sin(u);l=Math.sin(l*u)/d,t=Math.sin(t*u)/d,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const dc=class dc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,c=e.z,l=e.w,u=2*(o*s-c*i),d=2*(c*t-r*s),f=2*(r*i-o*t);return this.x=t+l*u+o*f-c*d,this.y=i+l*d+c*u-r*f,this.z=s+l*f+r*d-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,c=t.y,l=t.z;return this.x=s*l-r*c,this.y=r*o-i*l,this.z=i*c-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Wr.copy(this).projectOnVector(e),this.sub(Wr)}reflect(e){return this.sub(Wr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dc.prototype.isVector3=!0;let J=dc;const Wr=new J,Yc=new Wi,uc=class uc{constructor(e,t,i,s,r,o,c,l,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,u)}set(e,t,i,s,r,o,c,l,u){const d=this.elements;return d[0]=e,d[1]=s,d[2]=c,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=o,d[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[3],l=i[6],u=i[1],d=i[4],f=i[7],h=i[2],m=i[5],g=i[8],y=s[0],x=s[3],p=s[6],M=s[1],S=s[4],b=s[7],T=s[2],w=s[5],R=s[8];return r[0]=o*y+c*M+l*T,r[3]=o*x+c*S+l*w,r[6]=o*p+c*b+l*R,r[1]=u*y+d*M+f*T,r[4]=u*x+d*S+f*w,r[7]=u*p+d*b+f*R,r[2]=h*y+m*M+g*T,r[5]=h*x+m*S+g*w,r[8]=h*p+m*b+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],u=e[7],d=e[8];return t*o*d-t*c*u-i*r*d+i*c*l+s*r*u-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],u=e[7],d=e[8],f=d*o-c*u,h=c*l-d*r,m=u*r-o*l,g=t*f+i*h+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=f*y,e[1]=(s*u-d*i)*y,e[2]=(c*i-s*o)*y,e[3]=h*y,e[4]=(d*t-s*l)*y,e[5]=(s*r-c*t)*y,e[6]=m*y,e[7]=(i*l-u*t)*y,e[8]=(o*t-i*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,c){const l=Math.cos(r),u=Math.sin(r);return this.set(i*l,i*u,-i*(l*o+u*c)+o+e,-s*u,s*l,-s*(-u*o+l*c)+c+t,0,0,1),this}scale(e,t){return Ui("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($r.makeScale(e,t)),this}rotate(e){return Ui("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($r.makeRotation(-e)),this}translate(e,t){return Ui("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};uc.prototype.isMatrix3=!0;let ke=uc;const $r=new ke,Kc=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vm(){const n={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=Cn(s.r),s.g=Cn(s.g),s.b=Cn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ui("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ui("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ur]:{primaries:e,whitePoint:i,transfer:hr,toXYZ:Kc,fromXYZ:Zc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:Kc,fromXYZ:Zc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),n}const Ye=vm();function Cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Fi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let vi;class Mm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{vi===void 0&&(vi=fr("canvas")),vi.width=e.width,vi.height=e.height;const s=vi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=vi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Cn(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cn(t[i]/255)*255):t[i]=Cn(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ym=0;class Qo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=ms(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,c=s.length;o<c;o++)s[o].isDataTexture?r.push(Xr(s[o].image)):r.push(Xr(s[o]))}else r=Xr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Xr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Mm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let bm=0;const qr=new J;class Ut extends mi{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,i=wn,s=wn,r=Dt,o=ai,c=nn,l=$t,u=Ut.DEFAULT_ANISOTROPY,d=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=ms(),this.name="",this.source=new Qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qr).x}get height(){return this.source.getSize(qr).y}get depth(){return this.source.getSize(qr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ya:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case Ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ya:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case Ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Wd;Ut.DEFAULT_ANISOTROPY=1;const hc=class hc{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,u=l[0],d=l[4],f=l[8],h=l[1],m=l[5],g=l[9],y=l[2],x=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(f-y)<.01&&Math.abs(g-x)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+y)<.1&&Math.abs(g+x)<.1&&Math.abs(u+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(u+1)/2,b=(m+1)/2,T=(p+1)/2,w=(d+h)/4,R=(f+y)/4,v=(g+x)/4;return S>b&&S>T?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=w/i,r=R/i):b>T?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=w/s,r=v/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=R/r,s=v/r),this.set(i,s,r,t),this}let M=Math.sqrt((x-g)*(x-g)+(f-y)*(f-y)+(h-d)*(h-d));return Math.abs(M)<.001&&(M=1),this.x=(x-g)/M,this.y=(f-y)/M,this.z=(h-d)/M,this.w=Math.acos((u+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hc.prototype.isVector4=!0;let ft=hc;class Sm extends mi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Ut(s),o=i.count;for(let c=0;c<o;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Qo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pn extends Sm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class eu extends Ut{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class wm extends Ut{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _r=class _r{constructor(e,t,i,s,r,o,c,l,u,d,f,h,m,g,y,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,u,d,f,h,m,g,y,x)}set(e,t,i,s,r,o,c,l,u,d,f,h,m,g,y,x){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=c,p[13]=l,p[2]=u,p[6]=d,p[10]=f,p[14]=h,p[3]=m,p[7]=g,p[11]=y,p[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _r().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Mi.setFromMatrixColumn(e,0).length(),r=1/Mi.setFromMatrixColumn(e,1).length(),o=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),c=Math.sin(i),l=Math.cos(s),u=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=o*d,m=o*f,g=c*d,y=c*f;t[0]=l*d,t[4]=-l*f,t[8]=u,t[1]=m+g*u,t[5]=h-y*u,t[9]=-c*l,t[2]=y-h*u,t[6]=g+m*u,t[10]=o*l}else if(e.order==="YXZ"){const h=l*d,m=l*f,g=u*d,y=u*f;t[0]=h+y*c,t[4]=g*c-m,t[8]=o*u,t[1]=o*f,t[5]=o*d,t[9]=-c,t[2]=m*c-g,t[6]=y+h*c,t[10]=o*l}else if(e.order==="ZXY"){const h=l*d,m=l*f,g=u*d,y=u*f;t[0]=h-y*c,t[4]=-o*f,t[8]=g+m*c,t[1]=m+g*c,t[5]=o*d,t[9]=y-h*c,t[2]=-o*u,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const h=o*d,m=o*f,g=c*d,y=c*f;t[0]=l*d,t[4]=g*u-m,t[8]=h*u+y,t[1]=l*f,t[5]=y*u+h,t[9]=m*u-g,t[2]=-u,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*u,g=c*l,y=c*u;t[0]=l*d,t[4]=y-h*f,t[8]=g*f+m,t[1]=f,t[5]=o*d,t[9]=-c*d,t[2]=-u*d,t[6]=m*f+g,t[10]=h-y*f}else if(e.order==="XZY"){const h=o*l,m=o*u,g=c*l,y=c*u;t[0]=l*d,t[4]=-f,t[8]=u*d,t[1]=h*f+y,t[5]=o*d,t[9]=m*f-g,t[2]=g*f-m,t[6]=c*d,t[10]=y*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Em,e,Tm)}lookAt(e,t,i){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Fn.crossVectors(i,Vt),Fn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Fn.crossVectors(i,Vt)),Fn.normalize(),ws.crossVectors(Vt,Fn),s[0]=Fn.x,s[4]=ws.x,s[8]=Vt.x,s[1]=Fn.y,s[5]=ws.y,s[9]=Vt.y,s[2]=Fn.z,s[6]=ws.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[4],l=i[8],u=i[12],d=i[1],f=i[5],h=i[9],m=i[13],g=i[2],y=i[6],x=i[10],p=i[14],M=i[3],S=i[7],b=i[11],T=i[15],w=s[0],R=s[4],v=s[8],E=s[12],I=s[1],P=s[5],L=s[9],z=s[13],O=s[2],$=s[6],k=s[10],U=s[14],K=s[3],ie=s[7],pe=s[11],he=s[15];return r[0]=o*w+c*I+l*O+u*K,r[4]=o*R+c*P+l*$+u*ie,r[8]=o*v+c*L+l*k+u*pe,r[12]=o*E+c*z+l*U+u*he,r[1]=d*w+f*I+h*O+m*K,r[5]=d*R+f*P+h*$+m*ie,r[9]=d*v+f*L+h*k+m*pe,r[13]=d*E+f*z+h*U+m*he,r[2]=g*w+y*I+x*O+p*K,r[6]=g*R+y*P+x*$+p*ie,r[10]=g*v+y*L+x*k+p*pe,r[14]=g*E+y*z+x*U+p*he,r[3]=M*w+S*I+b*O+T*K,r[7]=M*R+S*P+b*$+T*ie,r[11]=M*v+S*L+b*k+T*pe,r[15]=M*E+S*z+b*U+T*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],c=e[5],l=e[9],u=e[13],d=e[2],f=e[6],h=e[10],m=e[14],g=e[3],y=e[7],x=e[11],p=e[15],M=l*m-u*h,S=c*m-u*f,b=c*h-l*f,T=o*m-u*d,w=o*h-l*d,R=o*f-c*d;return t*(y*M-x*S+p*b)-i*(g*M-x*T+p*w)+s*(g*S-y*T+p*R)-r*(g*b-y*w+x*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],c=e[9],l=e[2],u=e[6],d=e[10];return t*(o*d-c*u)-i*(r*d-c*l)+s*(r*u-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],u=e[7],d=e[8],f=e[9],h=e[10],m=e[11],g=e[12],y=e[13],x=e[14],p=e[15],M=t*c-i*o,S=t*l-s*o,b=t*u-r*o,T=i*l-s*c,w=i*u-r*c,R=s*u-r*l,v=d*y-f*g,E=d*x-h*g,I=d*p-m*g,P=f*x-h*y,L=f*p-m*y,z=h*p-m*x,O=M*z-S*L+b*P+T*I-w*E+R*v;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/O;return e[0]=(c*z-l*L+u*P)*$,e[1]=(s*L-i*z-r*P)*$,e[2]=(y*R-x*w+p*T)*$,e[3]=(h*w-f*R-m*T)*$,e[4]=(l*I-o*z-u*E)*$,e[5]=(t*z-s*I+r*E)*$,e[6]=(x*b-g*R-p*S)*$,e[7]=(d*R-h*b+m*S)*$,e[8]=(o*L-c*I+u*v)*$,e[9]=(i*I-t*L-r*v)*$,e[10]=(g*w-y*b+p*M)*$,e[11]=(f*b-d*w-m*M)*$,e[12]=(c*E-o*P-l*v)*$,e[13]=(t*P-i*E+s*v)*$,e[14]=(y*S-g*T-x*M)*$,e[15]=(d*T-f*S+h*M)*$,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,c=e.y,l=e.z,u=r*o,d=r*c;return this.set(u*o+i,u*c-s*l,u*l+s*c,0,u*c+s*l,d*c+i,d*l-s*o,0,u*l-s*c,d*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,c=t._z,l=t._w,u=r+r,d=o+o,f=c+c,h=r*u,m=r*d,g=r*f,y=o*d,x=o*f,p=c*f,M=l*u,S=l*d,b=l*f,T=i.x,w=i.y,R=i.z;return s[0]=(1-(y+p))*T,s[1]=(m+b)*T,s[2]=(g-S)*T,s[3]=0,s[4]=(m-b)*w,s[5]=(1-(h+p))*w,s[6]=(x+M)*w,s[7]=0,s[8]=(g+S)*R,s[9]=(x-M)*R,s[10]=(1-(h+y))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=Mi.set(s[0],s[1],s[2]).length();const c=Mi.set(s[4],s[5],s[6]).length(),l=Mi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Kt.copy(this);const u=1/o,d=1/c,f=1/l;return Kt.elements[0]*=u,Kt.elements[1]*=u,Kt.elements[2]*=u,Kt.elements[4]*=d,Kt.elements[5]*=d,Kt.elements[6]*=d,Kt.elements[8]*=f,Kt.elements[9]*=f,Kt.elements[10]*=f,t.setFromRotationMatrix(Kt),i.x=o,i.y=c,i.z=l,this}makePerspective(e,t,i,s,r,o,c=hn,l=!1){const u=this.elements,d=2*r/(t-e),f=2*r/(i-s),h=(t+e)/(t-e),m=(i+s)/(i-s);let g,y;if(l)g=r/(o-r),y=o*r/(o-r);else if(c===hn)g=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(c===fs)g=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=h,u[12]=0,u[1]=0,u[5]=f,u[9]=m,u[13]=0,u[2]=0,u[6]=0,u[10]=g,u[14]=y,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,i,s,r,o,c=hn,l=!1){const u=this.elements,d=2/(t-e),f=2/(i-s),h=-(t+e)/(t-e),m=-(i+s)/(i-s);let g,y;if(l)g=1/(o-r),y=o/(o-r);else if(c===hn)g=-2/(o-r),y=-(o+r)/(o-r);else if(c===fs)g=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=0,u[12]=h,u[1]=0,u[5]=f,u[9]=0,u[13]=m,u[2]=0,u[6]=0,u[10]=g,u[14]=y,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};_r.prototype.isMatrix4=!0;let pt=_r;const Mi=new J,Kt=new pt,Em=new J(0,0,0),Tm=new J(1,1,1),Fn=new J,ws=new J,Vt=new J,Jc=new pt,Qc=new Wi;class $n{constructor(e=0,t=0,i=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Jc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qc.setFromEuler(this),this.setFromQuaternion(Qc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Am=0;const el=new J,yi=new Wi,_n=new pt,Es=new J,Zi=new J,Cm=new J,Rm=new Wi,tl=new J(1,0,0),nl=new J(0,1,0),il=new J(0,0,1),sl={type:"added"},Nm={type:"removed"},bi={type:"childadded",child:null},Yr={type:"childremoved",child:null};class Bt extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new J,t=new $n,i=new Wi,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new ke}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(tl,e)}rotateY(e){return this.rotateOnAxis(nl,e)}rotateZ(e){return this.rotateOnAxis(il,e)}translateOnAxis(e,t){return el.copy(e).applyQuaternion(this.quaternion),this.position.add(el.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tl,e)}translateY(e){return this.translateOnAxis(nl,e)}translateZ(e){return this.translateOnAxis(il,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Es.copy(e):Es.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Zi,Es,this.up):_n.lookAt(Es,Zi,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),yi.setFromRotationMatrix(_n),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sl),bi.child=e,this.dispatchEvent(bi),bi.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nm),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sl),bi.child=e,this.dispatchEvent(bi),bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,Cm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,Rm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){const f=l[u];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(r(e.materials,this.material[l]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];s.animations.push(r(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),u=o(e.textures),d=o(e.images),f=o(e.shapes),h=o(e.skeletons),m=o(e.animations),g=o(e.nodes);c.length>0&&(i.geometries=c),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(c){const l=[];for(const u in c){const d=c[u];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Bt.DEFAULT_UP=new J(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ci extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pm={type:"move"};class Kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ci,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ci,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ci,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const c=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const y of e.hand.values()){const x=t.getJointPose(y,i),p=this._getHandJoint(u,y);x!==null&&(p.matrix.fromArray(x.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=x.radius),p.visible=x!==null}const d=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],h=d.position.distanceTo(f.position),m=.02,g=.005;u.inputState.pinching&&h>m+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Pm)))}return c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ci;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Zr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=_m(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Zr(o,r,e+1/3),this.g=Zr(o,r,e),this.b=Zr(o,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function i(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],c=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const i=nu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Ye.workingToColorSpace(It.copy(this),e),Math.round(Ke(It.r*255,0,255))*65536+Math.round(Ke(It.g*255,0,255))*256+Math.round(Ke(It.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(It.copy(this),t);const i=It.r,s=It.g,r=It.b,o=Math.max(i,s,r),c=Math.min(i,s,r);let l,u;const d=(c+o)/2;if(c===o)l=0,u=0;else{const f=o-c;switch(u=d<=.5?f/(o+c):f/(2-o-c),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=d,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Yt){Ye.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,s=It.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(Ts);const i=Vr(On.h,Ts.h,t),s=Vr(On.s,Ts.s,t),r=Vr(On.l,Ts.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Xe;Xe.NAMES=nu;class yr{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new yr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class iu extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zt=new J,vn=new J,Jr=new J,Mn=new J,Si=new J,wi=new J,rl=new J,Qr=new J,ea=new J,ta=new J,na=new ft,ia=new ft,sa=new ft;class en{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Zt.subVectors(e,t),s.cross(Zt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Zt.subVectors(s,t),vn.subVectors(i,t),Jr.subVectors(e,t);const o=Zt.dot(Zt),c=Zt.dot(vn),l=Zt.dot(Jr),u=vn.dot(vn),d=vn.dot(Jr),f=o*u-c*c;if(f===0)return r.set(0,0,0),null;const h=1/f,m=(u*l-c*d)*h,g=(o*d-c*l)*h;return r.set(1-m-g,g,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,i,s,r,o,c,l){return this.getBarycoord(e,t,i,s,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mn.x),l.addScaledVector(o,Mn.y),l.addScaledVector(c,Mn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return na.setScalar(0),ia.setScalar(0),sa.setScalar(0),na.fromBufferAttribute(e,t),ia.fromBufferAttribute(e,i),sa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(na,r.x),o.addScaledVector(ia,r.y),o.addScaledVector(sa,r.z),o}static isFrontFacing(e,t,i,s){return Zt.subVectors(i,t),vn.subVectors(e,t),Zt.cross(vn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Zt.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return en.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,c;Si.subVectors(s,i),wi.subVectors(r,i),Qr.subVectors(e,i);const l=Si.dot(Qr),u=wi.dot(Qr);if(l<=0&&u<=0)return t.copy(i);ea.subVectors(e,s);const d=Si.dot(ea),f=wi.dot(ea);if(d>=0&&f<=d)return t.copy(s);const h=l*f-d*u;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(i).addScaledVector(Si,o);ta.subVectors(e,r);const m=Si.dot(ta),g=wi.dot(ta);if(g>=0&&m<=g)return t.copy(r);const y=m*u-l*g;if(y<=0&&u>=0&&g<=0)return c=u/(u-g),t.copy(i).addScaledVector(wi,c);const x=d*g-m*f;if(x<=0&&f-d>=0&&m-g>=0)return rl.subVectors(r,s),c=(f-d)/(f-d+(m-g)),t.copy(s).addScaledVector(rl,c);const p=1/(x+y+h);return o=y*p,c=h*p,t.copy(i).addScaledVector(Si,o).addScaledVector(wi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class gs{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=r.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Jt):Jt.fromBufferAttribute(r,o),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),As.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),As.copy(i.boundingBox)),As.applyMatrix4(e.matrixWorld),this.union(As)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),Cs.subVectors(this.max,Ji),Ei.subVectors(e.a,Ji),Ti.subVectors(e.b,Ji),Ai.subVectors(e.c,Ji),Bn.subVectors(Ti,Ei),kn.subVectors(Ai,Ti),qn.subVectors(Ei,Ai);let t=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-qn.z,qn.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,qn.z,0,-qn.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-qn.y,qn.x,0];return!ra(t,Ei,Ti,Ai,Cs)||(t=[1,0,0,0,1,0,0,0,1],!ra(t,Ei,Ti,Ai,Cs))?!1:(Rs.crossVectors(Bn,kn),t=[Rs.x,Rs.y,Rs.z],ra(t,Ei,Ti,Ai,Cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yn=[new J,new J,new J,new J,new J,new J,new J,new J],Jt=new J,As=new gs,Ei=new J,Ti=new J,Ai=new J,Bn=new J,kn=new J,qn=new J,Ji=new J,Cs=new J,Rs=new J,Yn=new J;function ra(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Yn.fromArray(n,r);const c=s.x*Math.abs(Yn.x)+s.y*Math.abs(Yn.y)+s.z*Math.abs(Yn.z),l=e.dot(Yn),u=t.dot(Yn),d=i.dot(Yn);if(Math.max(-Math.max(l,u,d),Math.min(l,u,d))>c)return!1}return!0}const wt=new J,Ns=new Ze;let Lm=0;class kt extends mi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Wc,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ns.fromBufferAttribute(this,t),Ns.applyMatrix3(e),this.setXY(t,Ns.x,Ns.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class su extends kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ru extends kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ct extends kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Im=new gs,Qi=new J,aa=new J;class br{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Im.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Qi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(aa)),this.expandByPoint(Qi.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Dm=0;const qt=new pt,oa=new Bt,Ci=new J,Wt=new gs,es=new gs,At=new J;class Ft extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pm(e)?ru:su)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return oa.lookAt(e),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ct(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Wt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const c=t[r];es.setFromBufferAttribute(c),this.morphTargetsRelative?(At.addVectors(Wt.min,es.min),Wt.expandByPoint(At),At.addVectors(Wt.max,es.max),Wt.expandByPoint(At)):(Wt.expandByPoint(es.min),Wt.expandByPoint(es.max))}Wt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)At.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(At));if(t)for(let r=0,o=t.length;r<o;r++){const c=t[r],l=this.morphTargetsRelative;for(let u=0,d=c.count;u<d;u++)At.fromBufferAttribute(c,u),l&&(Ci.fromBufferAttribute(e,u),At.add(Ci)),s=Math.max(s,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new kt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const c=[],l=[];for(let v=0;v<i.count;v++)c[v]=new J,l[v]=new J;const u=new J,d=new J,f=new J,h=new Ze,m=new Ze,g=new Ze,y=new J,x=new J;function p(v,E,I){u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,E),f.fromBufferAttribute(i,I),h.fromBufferAttribute(r,v),m.fromBufferAttribute(r,E),g.fromBufferAttribute(r,I),d.sub(u),f.sub(u),m.sub(h),g.sub(h);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(y.copy(d).multiplyScalar(g.y).addScaledVector(f,-m.y).multiplyScalar(P),x.copy(f).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(P),c[v].add(y),c[E].add(y),c[I].add(y),l[v].add(x),l[E].add(x),l[I].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,E=M.length;v<E;++v){const I=M[v],P=I.start,L=I.count;for(let z=P,O=P+L;z<O;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new J,b=new J,T=new J,w=new J;function R(v){T.fromBufferAttribute(s,v),w.copy(T);const E=c[v];S.copy(E),S.sub(T.multiplyScalar(T.dot(E))).normalize(),b.crossVectors(w,E);const P=b.dot(l[v])<0?-1:1;o.setXYZW(v,S.x,S.y,S.z,P)}for(let v=0,E=M.length;v<E;++v){const I=M[v],P=I.start,L=I.count;for(let z=P,O=P+L;z<O;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new J,r=new J,o=new J,c=new J,l=new J,u=new J,d=new J,f=new J;if(e)for(let h=0,m=e.count;h<m;h+=3){const g=e.getX(h+0),y=e.getX(h+1),x=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,x),d.subVectors(o,r),f.subVectors(s,r),d.cross(f),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,x),c.add(d),l.add(d),u.add(d),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(x,u.x,u.y,u.z)}else for(let h=0,m=t.count;h<m;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),d.subVectors(o,r),f.subVectors(s,r),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(c,l){const u=c.array,d=c.itemSize,f=c.normalized,h=new u.constructor(l.length*d);let m=0,g=0;for(let y=0,x=l.length;y<x;y++){c.isInterleavedBufferAttribute?m=l[y]*c.data.stride+c.offset:m=l[y]*d;for(let p=0;p<d;p++)h[g++]=u[m++]}return new kt(h,d,f)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,i=this.index.array,s=this.attributes;for(const c in s){const l=s[c],u=e(l,i);t.setAttribute(c,u)}const r=this.morphAttributes;for(const c in r){const l=[],u=r[c];for(let d=0,f=u.length;d<f;d++){const h=u[d],m=e(h,i);l.push(m)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const u=o[c];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],d=[];for(let f=0,h=u.length;f<h;f++){const m=u[f];d.push(m.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const u in s){const d=s[u];this.setAttribute(u,d.clone(t))}const r=e.morphAttributes;for(const u in r){const d=[],f=r[u];for(let h=0,m=f.length;h<m;h++)d.push(f[h].clone(t));this.morphAttributes[u]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,d=o.length;u<d;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Um=0;class $i extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=ms(),this.name="",this.type="Material",this.blending=Di,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Ga,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(i.blending=this.blending),this.side!==Wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==za&&(i.blendSrc=this.blendSrc),this.blendDst!==Ga&&(i.blendDst=this.blendDst),this.blendEquation!==ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const c in r){const l=r[c];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bn=new J,ca=new J,Ps=new J,zn=new J,la=new J,Ls=new J,da=new J;class au{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ca.copy(e).add(t).multiplyScalar(.5),Ps.copy(t).sub(e).normalize(),zn.copy(this.origin).sub(ca);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ps),c=zn.dot(this.direction),l=-zn.dot(Ps),u=zn.lengthSq(),d=Math.abs(1-o*o);let f,h,m,g;if(d>0)if(f=o*l-c,h=o*c-l,g=r*d,f>=0)if(h>=-g)if(h<=g){const y=1/d;f*=y,h*=y,m=f*(f+o*h+2*c)+h*(o*f+h+2*l)+u}else h=r,f=Math.max(0,-(o*h+c)),m=-f*f+h*(h+2*l)+u;else h=-r,f=Math.max(0,-(o*h+c)),m=-f*f+h*(h+2*l)+u;else h<=-g?(f=Math.max(0,-(-o*r+c)),h=f>0?-r:Math.min(Math.max(-r,-l),r),m=-f*f+h*(h+2*l)+u):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+u):(f=Math.max(0,-(o*r+c)),h=f>0?r:Math.min(Math.max(-r,-l),r),m=-f*f+h*(h+2*l)+u);else h=o>0?-r:r,f=Math.max(0,-(o*h+c)),m=-f*f+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ca).addScaledVector(Ps,h),m}intersectSphere(e,t){bn.subVectors(e.center,this.origin);const i=bn.dot(this.direction),s=bn.dot(bn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),c=i-o,l=i+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,c,l;const u=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,s=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,s=(e.min.x-h.x)*u),d>=0?(r=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(c=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(c=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||c>s)||((c>i||i!==i)&&(i=c),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,i,s,r){la.subVectors(t,e),Ls.subVectors(i,e),da.crossVectors(la,Ls);let o=this.direction.dot(da),c;if(o>0){if(s)return null;c=1}else if(o<0)c=-1,o=-o;else return null;zn.subVectors(this.origin,e);const l=c*this.direction.dot(Ls.crossVectors(zn,Ls));if(l<0)return null;const u=c*this.direction.dot(la.cross(zn));if(u<0||l+u>o)return null;const d=-c*zn.dot(da);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vn extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Od,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const al=new pt,Kn=new au,Is=new br,ol=new J,Ds=new J,Us=new J,Fs=new J,ua=new J,Os=new J,cl=new J,Bs=new J;class ut extends Bt{constructor(e=new Ft,t=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Os.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const d=c[l],f=r[l];d!==0&&(ua.fromBufferAttribute(f,e),o?Os.addScaledVector(ua,d):Os.addScaledVector(ua.sub(t),d))}t.add(Os)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(Is.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Is,ol)===null||Kn.origin.distanceToSquared(ol)>(e.far-e.near)**2))&&(al.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(al),!(i.boundingBox!==null&&Kn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,c=r.index,l=r.attributes.position,u=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(c!==null)if(Array.isArray(o))for(let g=0,y=h.length;g<y;g++){const x=h[g],p=o[x.materialIndex],M=Math.max(x.start,m.start),S=Math.min(c.count,Math.min(x.start+x.count,m.start+m.count));for(let b=M,T=S;b<T;b+=3){const w=c.getX(b),R=c.getX(b+1),v=c.getX(b+2);s=ks(this,p,e,i,u,d,f,w,R,v),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let x=g,p=y;x<p;x+=3){const M=c.getX(x),S=c.getX(x+1),b=c.getX(x+2);s=ks(this,o,e,i,u,d,f,M,S,b),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=h.length;g<y;g++){const x=h[g],p=o[x.materialIndex],M=Math.max(x.start,m.start),S=Math.min(l.count,Math.min(x.start+x.count,m.start+m.count));for(let b=M,T=S;b<T;b+=3){const w=b,R=b+1,v=b+2;s=ks(this,p,e,i,u,d,f,w,R,v),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let x=g,p=y;x<p;x+=3){const M=x,S=x+1,b=x+2;s=ks(this,o,e,i,u,d,f,M,S,b),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function Fm(n,e,t,i,s,r,o,c){let l;if(e.side===Ht?l=i.intersectTriangle(o,r,s,!0,c):l=i.intersectTriangle(s,r,o,e.side===Wn,c),l===null)return null;Bs.copy(c),Bs.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Bs);return u<t.near||u>t.far?null:{distance:u,point:Bs.clone(),object:n}}function ks(n,e,t,i,s,r,o,c,l,u){n.getVertexPosition(c,Ds),n.getVertexPosition(l,Us),n.getVertexPosition(u,Fs);const d=Fm(n,e,t,i,Ds,Us,Fs,cl);if(d){const f=new J;en.getBarycoord(cl,Ds,Us,Fs,f),s&&(d.uv=en.getInterpolatedAttribute(s,c,l,u,f,new Ze)),r&&(d.uv1=en.getInterpolatedAttribute(r,c,l,u,f,new Ze)),o&&(d.normal=en.getInterpolatedAttribute(o,c,l,u,f,new J),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:c,b:l,c:u,normal:new J,materialIndex:0};en.getNormal(Ds,Us,Fs,h.normal),d.face=h,d.barycoord=f}return d}class Om extends Ut{constructor(e=null,t=1,i=1,s,r,o,c,l,u=Nt,d=Nt,f,h){super(null,o,c,l,u,d,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ha=new J,Bm=new J,km=new ke;class Qn{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ha.subVectors(i,t).cross(Bm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(ha),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||km.getNormalMatrix(e),s=this.coplanarPoint(ha).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new br,zm=new Ze(.5,.5),zs=new J;class ec{constructor(e=new Qn,t=new Qn,i=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=hn,i=!1){const s=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],u=r[3],d=r[4],f=r[5],h=r[6],m=r[7],g=r[8],y=r[9],x=r[10],p=r[11],M=r[12],S=r[13],b=r[14],T=r[15];if(s[0].setComponents(u-o,m-d,p-g,T-M).normalize(),s[1].setComponents(u+o,m+d,p+g,T+M).normalize(),s[2].setComponents(u+c,m+f,p+y,T+S).normalize(),s[3].setComponents(u-c,m-f,p-y,T-S).normalize(),i)s[4].setComponents(l,h,x,b).normalize(),s[5].setComponents(u-l,m-h,p-x,T-b).normalize();else if(s[4].setComponents(u-l,m-h,p-x,T-b).normalize(),t===hn)s[5].setComponents(u+l,m+h,p+x,T+b).normalize();else if(t===fs)s[5].setComponents(l,h,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){Zn.center.set(0,0,0);const t=zm.distanceTo(e.center);return Zn.radius=.7071067811865476+t,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(zs.x=s.normal.x>0?e.max.x:e.min.x,zs.y=s.normal.y>0?e.max.y:e.min.y,zs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Sr extends $i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ll=new pt,No=new au,Gs=new br,Hs=new J;class tc extends Bt{constructor(e=new Ft,t=new Sr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere),Gs.applyMatrix4(s),Gs.radius+=r,e.ray.intersectsSphere(Gs)===!1)return;ll.copy(s).invert(),No.copy(e.ray).applyMatrix4(ll);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=h,y=m;g<y;g++){const x=u.getX(g);Hs.fromBufferAttribute(f,x),dl(Hs,x,l,s,e,t,this)}}else{const h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let g=h,y=m;g<y;g++)Hs.fromBufferAttribute(f,g),dl(Hs,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function dl(n,e,t,i,s,r,o){const c=No.distanceSqToPoint(n);if(c<t){const l=new J;No.closestPointToPoint(n,l),l.applyMatrix4(i);const u=s.ray.origin.distanceTo(l);if(u<s.near||u>s.far)return;r.push({distance:u,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ou extends Ut{constructor(e=[],t=hi,i,s,r,o,c,l,u,d){super(e,t,i,s,r,o,c,l,u,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cu extends Ut{constructor(e,t,i,s,r,o,c,l,u){super(e,t,i,s,r,o,c,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hi extends Ut{constructor(e,t,i=gn,s,r,o,c=Nt,l=Nt,u,d=Pn,f=1){if(d!==Pn&&d!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,o,c,l,d,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Gm extends Hi{constructor(e,t=gn,i=hi,s,r,o=Nt,c=Nt,l,u=Pn){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,s,r,o,c,l,u),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class lu extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class pi extends Ft{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const c=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],u=[],d=[],f=[];let h=0,m=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ct(u,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(f,2));function g(y,x,p,M,S,b,T,w,R,v,E){const I=b/R,P=T/v,L=b/2,z=T/2,O=w/2,$=R+1,k=v+1;let U=0,K=0;const ie=new J;for(let pe=0;pe<k;pe++){const he=pe*P-z;for(let me=0;me<$;me++){const Pe=me*I-L;ie[y]=Pe*M,ie[x]=he*S,ie[p]=O,u.push(ie.x,ie.y,ie.z),ie[y]=0,ie[x]=0,ie[p]=w>0?1:-1,d.push(ie.x,ie.y,ie.z),f.push(me/R),f.push(1-pe/v),U+=1}}for(let pe=0;pe<v;pe++)for(let he=0;he<R;he++){const me=h+he+$*pe,Pe=h+he+$*(pe+1),ge=h+(he+1)+$*(pe+1),Be=h+(he+1)+$*pe;l.push(me,Pe,Be),l.push(Pe,ge,Be),K+=6}c.addGroup(m,K,E),m+=K,h+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Oi extends Ft{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],h=[],m=[];let g=0;const y=[],x=i/2;let p=0;M(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(d),this.setAttribute("position",new Ct(f,3)),this.setAttribute("normal",new Ct(h,3)),this.setAttribute("uv",new Ct(m,2));function M(){const b=new J,T=new J;let w=0;const R=(t-e)/i;for(let v=0;v<=r;v++){const E=[],I=v/r,P=I*(t-e)+e;for(let L=0;L<=s;L++){const z=L/s,O=z*l+c,$=Math.sin(O),k=Math.cos(O);T.x=P*$,T.y=-I*i+x,T.z=P*k,f.push(T.x,T.y,T.z),b.set($,R,k).normalize(),h.push(b.x,b.y,b.z),m.push(z,1-I),E.push(g++)}y.push(E)}for(let v=0;v<s;v++)for(let E=0;E<r;E++){const I=y[E][v],P=y[E+1][v],L=y[E+1][v+1],z=y[E][v+1];(e>0||E!==0)&&(d.push(I,P,z),w+=3),(t>0||E!==r-1)&&(d.push(P,L,z),w+=3)}u.addGroup(p,w,0),p+=w}function S(b){const T=g,w=new Ze,R=new J;let v=0;const E=b===!0?e:t,I=b===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,x*I,0),h.push(0,I,0),m.push(.5,.5),g++;const P=g;for(let L=0;L<=s;L++){const O=L/s*l+c,$=Math.cos(O),k=Math.sin(O);R.x=E*k,R.y=x*I,R.z=E*$,f.push(R.x,R.y,R.z),h.push(0,I,0),w.x=$*.5+.5,w.y=k*.5*I+.5,m.push(w.x,w.y),g++}for(let L=0;L<s;L++){const z=T+L,O=P+L;b===!0?d.push(O,O+1,z):d.push(O+1,O,z),v+=3}u.addGroup(p,v,b===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class nc extends Oi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,c=Math.PI*2){super(0,e,t,i,s,r,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c}}static fromJSON(e){return new nc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xi extends Ft{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,c=Math.floor(i),l=Math.floor(s),u=c+1,d=l+1,f=e/c,h=t/l,m=[],g=[],y=[],x=[];for(let p=0;p<d;p++){const M=p*h-o;for(let S=0;S<u;S++){const b=S*f-r;g.push(b,-M,0),y.push(0,0,1),x.push(S/c),x.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<c;M++){const S=M+u*p,b=M+u*(p+1),T=M+1+u*(p+1),w=M+1+u*p;m.push(S,b,w),m.push(b,T,w)}this.setIndex(m),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(y,3)),this.setAttribute("uv",new Ct(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.width,e.height,e.widthSegments,e.heightSegments)}}class pr extends Ft{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+c,Math.PI);let u=0;const d=[],f=new J,h=new J,m=[],g=[],y=[],x=[];for(let p=0;p<=i;p++){const M=[],S=p/i,b=o+S*c,T=e*Math.cos(b),w=Math.sqrt(e*e-T*T);let R=0;p===0&&o===0?R=.5/t:p===i&&l===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const E=v/t,I=s+E*r;f.x=-w*Math.cos(I),f.y=T,f.z=w*Math.sin(I),g.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),x.push(E+R,1-S),M.push(u++)}d.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){const S=d[p][M+1],b=d[p][M],T=d[p+1][M],w=d[p+1][M+1];(p!==0||o>0)&&m.push(S,b,w),(p!==i-1||l<Math.PI)&&m.push(b,T,w)}this.setIndex(m),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(y,3)),this.setAttribute("uv",new Ct(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ic extends Ft{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const l=[],u=[],d=[],f=[],h=new J,m=new J,g=new J;for(let y=0;y<=i;y++){const x=o+y/i*c;for(let p=0;p<=s;p++){const M=p/s*r;m.x=(e+t*Math.cos(x))*Math.cos(M),m.y=(e+t*Math.cos(x))*Math.sin(M),m.z=t*Math.sin(x),u.push(m.x,m.y,m.z),h.x=e*Math.cos(M),h.y=e*Math.sin(M),g.subVectors(m,h).normalize(),d.push(g.x,g.y,g.z),f.push(p/s),f.push(y/i)}}for(let y=1;y<=i;y++)for(let x=1;x<=s;x++){const p=(s+1)*y+x-1,M=(s+1)*(y-1)+x-1,S=(s+1)*(y-1)+x,b=(s+1)*y+x;l.push(p,M,b),l.push(M,S,b)}this.setIndex(l),this.setAttribute("position",new Ct(u,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ic(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function ji(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(ul(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(ul(s[0])){const r=[];for(let o=0,c=s.length;o<c;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=ji(n[t]);for(const s in i)e[s]=i[s]}return e}function ul(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Hm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function du(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const jm={clone:ji,merge:Ot};var Vm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vm,this.fragmentShader=Wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=Hm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new pt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class $m extends xn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Jn extends $i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Co,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xm extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=am,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qm extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class uu extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const fa=new pt,hl=new J,fl=new J;class Ym{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=$t,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ec,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;hl.setFromMatrixPosition(e.matrixWorld),t.position.copy(hl),fl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fl),t.updateMatrixWorld(),fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===fs||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const js=new J,Vs=new Wi,on=new J;class hu extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(js,Vs,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(js,Vs,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(js,Vs,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(js,Vs,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new J,pl=new Ze,ml=new Ze;class Gt extends hu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ro*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ro*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gn.x,Gn.y).multiplyScalar(-e/Gn.z)}getViewSize(e,t){return this.getViewBounds(e,pl,ml),t.subVectors(ml,pl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(jr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/u,s*=o.width/l,i*=o.height/u}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Km extends Ym{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0}}class li extends uu{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Km}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class fu extends hu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,c=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,o=r+u*this.view.width,c-=d*this.view.offsetY,l=c-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class pu extends uu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ri=-90,Ni=1;class Zm extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gt(Ri,Ni,e,t);s.layers=this.layers,this.add(s);const r=new Gt(Ri,Ni,e,t);r.layers=this.layers,this.add(r);const o=new Gt(Ri,Ni,e,t);o.layers=this.layers,this.add(o);const c=new Gt(Ri,Ni,e,t);c.layers=this.layers,this.add(c);const l=new Gt(Ri,Ni,e,t);l.layers=this.layers,this.add(l);const u=new Gt(Ri,Ni,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,c,l]=t;for(const u of t)this.remove(u);if(e===hn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,c,l,u,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,h,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Jm extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const fc=class fc{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};fc.prototype.isMatrix2=!0;let gl=fc;function xl(n,e,t,i){const s=Qm(i);switch(t){case Kd:return n*e;case Jd:return n*e/s.components*s.byteLength;case qo:return n*e/s.components*s.byteLength;case fi:return n*e*2/s.components*s.byteLength;case Yo:return n*e*2/s.components*s.byteLength;case Zd:return n*e*3/s.components*s.byteLength;case nn:return n*e*4/s.components*s.byteLength;case Ko:return n*e*4/s.components*s.byteLength;case tr:case nr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ir:case sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ja:case eo:return Math.max(n,16)*Math.max(e,8)/4;case Za:case Qa:return Math.max(n,8)*Math.max(e,8)/2;case to:case no:case so:case ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case io:case lr:case ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case co:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case lo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case uo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ho:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case fo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case po:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case mo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case go:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case _o:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case vo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case yo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case bo:case So:case wo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Eo:case To:return Math.ceil(n/4)*Math.ceil(e/4)*8;case dr:case Ao:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qm(n){switch(n){case $t:case $d:return{byteLength:1,components:1};case us:case Xd:case Nn:return{byteLength:2,components:1};case $o:case Xo:return{byteLength:2,components:4};case gn:case Wo:case un:return{byteLength:4,components:1};case qd:case Yd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vo}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function mu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function e0(n){const e=new WeakMap;function t(c,l){const u=c.array,d=c.usage,f=u.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,u,d),c.onUploadCallback();let m;if(u instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)m=n.HALF_FLOAT;else if(u instanceof Uint16Array)c.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=n.SHORT;else if(u instanceof Uint32Array)m=n.UNSIGNED_INT;else if(u instanceof Int32Array)m=n.INT;else if(u instanceof Int8Array)m=n.BYTE;else if(u instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function i(c,l,u){const d=l.array,f=l.updateRanges;if(n.bindBuffer(u,c),f.length===0)n.bufferSubData(u,0,d);else{f.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<f.length;m++){const g=f[h],y=f[m];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,f[h]=y)}f.length=h+1;for(let m=0,g=f.length;m<g;m++){const y=f[m];n.bufferSubData(u,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(n.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const d=e.get(c);(!d||d.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const u=e.get(c);if(u===void 0)e.set(c,t(c,l));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,c,l),u.version=c.version}}return{get:s,remove:r,update:o}}var t0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,n0=`#ifdef USE_ALPHAHASH
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
#endif`,i0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,a0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,o0=`#ifdef USE_AOMAP
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
#endif`,c0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l0=`#ifdef USE_BATCHING
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
#endif`,d0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,u0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,h0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,f0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,p0=`#ifdef USE_IRIDESCENCE
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
#endif`,m0=`#ifdef USE_BUMPMAP
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
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,M0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,b0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,S0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,w0=`#define PI 3.141592653589793
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
} // validated`,E0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,T0=`vec3 transformedNormal = objectNormal;
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
#endif`,A0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,N0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,P0="gl_FragColor = linearToOutputTexel( gl_FragColor );",L0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,I0=`#ifdef USE_ENVMAP
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
#endif`,D0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
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
#endif`,F0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O0=`#ifdef USE_ENVMAP
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
#endif`,B0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,k0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,z0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H0=`#ifdef USE_GRADIENTMAP
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
}`,j0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,V0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,X0=`#ifdef USE_ENVMAP
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
#endif`,q0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Y0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Z0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,J0=`PhysicalMaterial material;
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
#endif`,Q0=`uniform sampler2D dfgLUT;
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
}`,eg=`
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
#endif`,tg=`#if defined( RE_IndirectDiffuse )
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
#endif`,ng=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ig=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ug=`#if defined( USE_POINTS_UV )
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
#endif`,hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xg=`#ifdef USE_MORPHTARGETS
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
#endif`,_g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wg=`#ifdef USE_NORMALMAP
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
#endif`,Eg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ag=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ng=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Pg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ig=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Og=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zg=`float getShadowMask() {
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
}`,Gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hg=`#ifdef USE_SKINNING
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
#endif`,jg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vg=`#ifdef USE_SKINNING
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
#endif`,Wg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$g=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yg=`#ifdef USE_TRANSMISSION
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
#endif`,Kg=`#ifdef USE_TRANSMISSION
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
#endif`,Zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nx=`uniform sampler2D t2D;
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`#include <common>
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
}`,cx=`#if DEPTH_PACKING == 3200
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
}`,lx=`#define DISTANCE
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
}`,dx=`#define DISTANCE
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
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`uniform float scale;
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
}`,px=`uniform vec3 diffuse;
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
}`,mx=`#include <common>
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
}`,gx=`uniform vec3 diffuse;
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
}`,xx=`#define LAMBERT
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
}`,_x=`#define LAMBERT
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
}`,vx=`#define MATCAP
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
}`,Mx=`#define MATCAP
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
}`,yx=`#define NORMAL
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
}`,bx=`#define NORMAL
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
}`,Sx=`#define PHONG
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
}`,wx=`#define PHONG
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
}`,Ex=`#define STANDARD
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
}`,Tx=`#define STANDARD
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
}`,Ax=`#define TOON
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
}`,Cx=`#define TOON
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
}`,Rx=`uniform float size;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Px=`#include <common>
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
}`,Lx=`uniform vec3 color;
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
}`,Ix=`uniform float rotation;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:t0,alphahash_pars_fragment:n0,alphamap_fragment:i0,alphamap_pars_fragment:s0,alphatest_fragment:r0,alphatest_pars_fragment:a0,aomap_fragment:o0,aomap_pars_fragment:c0,batching_pars_vertex:l0,batching_vertex:d0,begin_vertex:u0,beginnormal_vertex:h0,bsdfs:f0,iridescence_fragment:p0,bumpmap_pars_fragment:m0,clipping_planes_fragment:g0,clipping_planes_pars_fragment:x0,clipping_planes_pars_vertex:_0,clipping_planes_vertex:v0,color_fragment:M0,color_pars_fragment:y0,color_pars_vertex:b0,color_vertex:S0,common:w0,cube_uv_reflection_fragment:E0,defaultnormal_vertex:T0,displacementmap_pars_vertex:A0,displacementmap_vertex:C0,emissivemap_fragment:R0,emissivemap_pars_fragment:N0,colorspace_fragment:P0,colorspace_pars_fragment:L0,envmap_fragment:I0,envmap_common_pars_fragment:D0,envmap_pars_fragment:U0,envmap_pars_vertex:F0,envmap_physical_pars_fragment:X0,envmap_vertex:O0,fog_vertex:B0,fog_pars_vertex:k0,fog_fragment:z0,fog_pars_fragment:G0,gradientmap_pars_fragment:H0,lightmap_pars_fragment:j0,lights_lambert_fragment:V0,lights_lambert_pars_fragment:W0,lights_pars_begin:$0,lights_toon_fragment:q0,lights_toon_pars_fragment:Y0,lights_phong_fragment:K0,lights_phong_pars_fragment:Z0,lights_physical_fragment:J0,lights_physical_pars_fragment:Q0,lights_fragment_begin:eg,lights_fragment_maps:tg,lights_fragment_end:ng,lightprobes_pars_fragment:ig,logdepthbuf_fragment:sg,logdepthbuf_pars_fragment:rg,logdepthbuf_pars_vertex:ag,logdepthbuf_vertex:og,map_fragment:cg,map_pars_fragment:lg,map_particle_fragment:dg,map_particle_pars_fragment:ug,metalnessmap_fragment:hg,metalnessmap_pars_fragment:fg,morphinstance_vertex:pg,morphcolor_vertex:mg,morphnormal_vertex:gg,morphtarget_pars_vertex:xg,morphtarget_vertex:_g,normal_fragment_begin:vg,normal_fragment_maps:Mg,normal_pars_fragment:yg,normal_pars_vertex:bg,normal_vertex:Sg,normalmap_pars_fragment:wg,clearcoat_normal_fragment_begin:Eg,clearcoat_normal_fragment_maps:Tg,clearcoat_pars_fragment:Ag,iridescence_pars_fragment:Cg,opaque_fragment:Rg,packing:Ng,premultiplied_alpha_fragment:Pg,project_vertex:Lg,dithering_fragment:Ig,dithering_pars_fragment:Dg,roughnessmap_fragment:Ug,roughnessmap_pars_fragment:Fg,shadowmap_pars_fragment:Og,shadowmap_pars_vertex:Bg,shadowmap_vertex:kg,shadowmask_pars_fragment:zg,skinbase_vertex:Gg,skinning_pars_vertex:Hg,skinning_vertex:jg,skinnormal_vertex:Vg,specularmap_fragment:Wg,specularmap_pars_fragment:$g,tonemapping_fragment:Xg,tonemapping_pars_fragment:qg,transmission_fragment:Yg,transmission_pars_fragment:Kg,uv_pars_fragment:Zg,uv_pars_vertex:Jg,uv_vertex:Qg,worldpos_vertex:ex,background_vert:tx,background_frag:nx,backgroundCube_vert:ix,backgroundCube_frag:sx,cube_vert:rx,cube_frag:ax,depth_vert:ox,depth_frag:cx,distance_vert:lx,distance_frag:dx,equirect_vert:ux,equirect_frag:hx,linedashed_vert:fx,linedashed_frag:px,meshbasic_vert:mx,meshbasic_frag:gx,meshlambert_vert:xx,meshlambert_frag:_x,meshmatcap_vert:vx,meshmatcap_frag:Mx,meshnormal_vert:yx,meshnormal_frag:bx,meshphong_vert:Sx,meshphong_frag:wx,meshphysical_vert:Ex,meshphysical_frag:Tx,meshtoon_vert:Ax,meshtoon_frag:Cx,points_vert:Rx,points_frag:Nx,shadow_vert:Px,shadow_frag:Lx,sprite_vert:Ix,sprite_frag:Dx},ye={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},dn={basic:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Ot([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Ot([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Ot([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Ot([ye.points,ye.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Ot([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Ot([ye.common,ye.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Ot([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Ot([ye.sprite,ye.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Ot([ye.common,ye.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Ot([ye.lights,ye.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};dn.physical={uniforms:Ot([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Ws={r:0,b:0,g:0},Ux=new pt,gu=new ke;gu.set(-1,0,0,0,1,0,0,0,1);function Fx(n,e,t,i,s,r){const o=new Xe(0);let c=s===!0?0:1,l,u,d=null,f=0,h=null;function m(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){const b=M.backgroundBlurriness>0;S=e.get(S,b)}return S}function g(M){let S=!1;const b=m(M);b===null?x(o,c):b&&b.isColor&&(x(b,1),S=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(M,S){const b=m(S);b&&(b.isCubeTexture||b.mapping===Mr)?(u===void 0&&(u=new ut(new pi(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:ji(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=b,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ux.makeRotationFromEuler(S.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(gu),u.material.toneMapped=Ye.getTransfer(b.colorSpace)!==it,(d!==b||f!==b.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=b,f=b.version,h=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new ut(new Xi(2,2),new xn({name:"BackgroundMaterial",uniforms:ji(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(b.colorSpace)!==it,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||f!==b.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=b,f=b.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function x(M,S){M.getRGB(Ws,du(n)),t.buffers.color.setClear(Ws.r,Ws.g,Ws.b,S,r)}function p(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,S=1){o.set(M),c=S,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,x(o,c)},render:g,addToRenderList:y,dispose:p}}function Ox(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function c(P,L,z,O,$){let k=!1;const U=f(P,O,z,L);r!==U&&(r=U,u(r.object)),k=m(P,O,z,$),k&&g(P,O,z,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,b(P,L,z,O),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return n.createVertexArray()}function u(P){return n.bindVertexArray(P)}function d(P){return n.deleteVertexArray(P)}function f(P,L,z,O){const $=O.wireframe===!0;let k=i[L.id];k===void 0&&(k={},i[L.id]=k);const U=P.isInstancedMesh===!0?P.id:0;let K=k[U];K===void 0&&(K={},k[U]=K);let ie=K[z.id];ie===void 0&&(ie={},K[z.id]=ie);let pe=ie[$];return pe===void 0&&(pe=h(l()),ie[$]=pe),pe}function h(P){const L=[],z=[],O=[];for(let $=0;$<t;$++)L[$]=0,z[$]=0,O[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:O,object:P,attributes:{},index:null}}function m(P,L,z,O){const $=r.attributes,k=L.attributes;let U=0;const K=z.getAttributes();for(const ie in K)if(K[ie].location>=0){const he=$[ie];let me=k[ie];if(me===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(me=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(me=P.instanceColor)),he===void 0||he.attribute!==me||me&&he.data!==me.data)return!0;U++}return r.attributesNum!==U||r.index!==O}function g(P,L,z,O){const $={},k=L.attributes;let U=0;const K=z.getAttributes();for(const ie in K)if(K[ie].location>=0){let he=k[ie];he===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(he=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(he=P.instanceColor));const me={};me.attribute=he,he&&he.data&&(me.data=he.data),$[ie]=me,U++}r.attributes=$,r.attributesNum=U,r.index=O}function y(){const P=r.newAttributes;for(let L=0,z=P.length;L<z;L++)P[L]=0}function x(P){p(P,0)}function p(P,L){const z=r.newAttributes,O=r.enabledAttributes,$=r.attributeDivisors;z[P]=1,O[P]===0&&(n.enableVertexAttribArray(P),O[P]=1),$[P]!==L&&(n.vertexAttribDivisor(P,L),$[P]=L)}function M(){const P=r.newAttributes,L=r.enabledAttributes;for(let z=0,O=L.length;z<O;z++)L[z]!==P[z]&&(n.disableVertexAttribArray(z),L[z]=0)}function S(P,L,z,O,$,k,U){U===!0?n.vertexAttribIPointer(P,L,z,$,k):n.vertexAttribPointer(P,L,z,O,$,k)}function b(P,L,z,O){y();const $=O.attributes,k=z.getAttributes(),U=L.defaultAttributeValues;for(const K in k){const ie=k[K];if(ie.location>=0){let pe=$[K];if(pe===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(pe=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(pe=P.instanceColor)),pe!==void 0){const he=pe.normalized,me=pe.itemSize,Pe=e.get(pe);if(Pe===void 0)continue;const ge=Pe.buffer,Be=Pe.type,re=Pe.bytesPerElement,X=Be===n.INT||Be===n.UNSIGNED_INT||pe.gpuType===Wo;if(pe.isInterleavedBufferAttribute){const Q=pe.data,Me=Q.stride,Le=pe.offset;if(Q.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ie.locationSize;Ce++)p(ie.location+Ce,Q.meshPerAttribute);P.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Ce=0;Ce<ie.locationSize;Ce++)x(ie.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Ce=0;Ce<ie.locationSize;Ce++)S(ie.location+Ce,me/ie.locationSize,Be,he,Me*re,(Le+me/ie.locationSize*Ce)*re,X)}else{if(pe.isInstancedBufferAttribute){for(let Q=0;Q<ie.locationSize;Q++)p(ie.location+Q,pe.meshPerAttribute);P.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Q=0;Q<ie.locationSize;Q++)x(ie.location+Q);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Q=0;Q<ie.locationSize;Q++)S(ie.location+Q,me/ie.locationSize,Be,he,me*re,me/ie.locationSize*Q*re,X)}}else if(U!==void 0){const he=U[K];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(ie.location,he);break;case 3:n.vertexAttrib3fv(ie.location,he);break;case 4:n.vertexAttrib4fv(ie.location,he);break;default:n.vertexAttrib1fv(ie.location,he)}}}}M()}function T(){E();for(const P in i){const L=i[P];for(const z in L){const O=L[z];for(const $ in O){const k=O[$];for(const U in k)d(k[U].object),delete k[U];delete O[$]}}delete i[P]}}function w(P){if(i[P.id]===void 0)return;const L=i[P.id];for(const z in L){const O=L[z];for(const $ in O){const k=O[$];for(const U in k)d(k[U].object),delete k[U];delete O[$]}}delete i[P.id]}function R(P){for(const L in i){const z=i[L];for(const O in z){const $=z[O];if($[P.id]===void 0)continue;const k=$[P.id];for(const U in k)d(k[U].object),delete k[U];delete $[P.id]}}}function v(P){for(const L in i){const z=i[L],O=P.isInstancedMesh===!0?P.id:0,$=z[O];if($!==void 0){for(const k in $){const U=$[k];for(const K in U)d(U[K].object),delete U[K];delete $[k]}delete z[O],Object.keys(z).length===0&&delete i[L]}}}function E(){I(),o=!0,r!==s&&(r=s,u(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:E,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:x,disableUnusedAttributes:M}}function Bx(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function c(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let m=0;m<d;m++)h+=u[m];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=c}function kx(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==nn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===Nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==$t&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==un&&!v)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const d=l(u);d!==u&&(Oe("WebGLRenderer:",u,"not supported, using",d,"instead."),u=d);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:b,maxSamples:T,samples:w}}function zx(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Qn,c=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||s;return s=h,i=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=d(f,h,0)},this.setState=function(f,h,m){const g=f.clippingPlanes,y=f.clipIntersection,x=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!x)r?d(null):u();else{const M=r?0:i,S=M*4;let b=p.clippingState||null;l.value=b,b=d(g,h,S,m);for(let T=0;T!==S;++T)b[T]=t[T];p.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,h,m,g){const y=f!==null?f.length:0;let x=null;if(y!==0){if(x=l.value,g!==!0||x===null){const p=m+y*4,M=h.matrixWorldInverse;c.getNormalMatrix(M),(x===null||x.length<p)&&(x=new Float32Array(p));for(let S=0,b=m;S!==y;++S,b+=4)o.copy(f[S]).applyMatrix4(M,c),o.normal.toArray(x,b),x[b+3]=o.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,x}}const jn=4,_l=[.125,.215,.35,.446,.526,.582],ii=20,Gx=256,ts=new fu,vl=new Xe;let pa=null,ma=0,ga=0,xa=!1;const Hx=new J;class Ml{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:c=Hx}=r;pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(pa,ma,ga),this._renderer.xr.enabled=xa,e.scissorTest=!1,Pi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hi||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Nn,format:nn,colorSpace:ur,depthBuffer:!1},s=yl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=jx(r)),this._blurMaterial=Wx(r,e,t),this._ggxMaterial=Vx(r,e,t)}return s}_compileMaterial(e){const t=new ut(new Ft,e);this._renderer.compile(t,ts)}_sceneToCubeUV(e,t,i,s,r){const l=new Gt(90,1,t,i),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(vl),f.toneMapping=fn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ut(new pi,new Vn({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,x=y.material;let p=!1;const M=e.background;M?M.isColor&&(x.color.copy(M),e.background=null,p=!0):(x.color.copy(vl),p=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(l.up.set(0,u[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[S],r.y,r.z)):b===1?(l.up.set(0,0,u[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[S],r.z)):(l.up.set(0,u[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[S]));const T=this._cubeSize;Pi(s,b*T,S>2?T:0,T,T),f.setRenderTarget(s),p&&f.render(y,l),f.render(e,l)}f.toneMapping=m,f.autoClear=h,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===hi||e.mapping===Gi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const c=r.uniforms;c.envMap.value=e;const l=this._cubeSize;Pi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ts)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms,u=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(u*u-d*d),h=0+u*1.25,m=f*h,{_lodMax:g}=this,y=this._sizeLods[i],x=3*y*(i>g-jn?i-g+jn:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=g-t,Pi(r,x,p,3*y,2*y),s.setRenderTarget(r),s.render(c,ts),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Pi(e,x,p,3*y,2*y),s.setRenderTarget(e),s.render(c,ts)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,c){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[s];f.material=u;const h=u.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ii-1),y=r/g,x=isFinite(r)?1+Math.floor(d*y):ii;x>ii&&Oe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ii}`);const p=[];let M=0;for(let R=0;R<ii;++R){const v=R/y,E=Math.exp(-v*v/2);p.push(E),R===0?M+=E:R<x&&(M+=2*E)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;h.envMap.value=e.texture,h.samples.value=x,h.weights.value=p,h.latitudinal.value=o==="latitudinal",c&&(h.poleAxis.value=c);const{_lodMax:S}=this;h.dTheta.value=g,h.mipInt.value=S-i;const b=this._sizeLods[s],T=3*b*(s>S-jn?s-S+jn:0),w=4*(this._cubeSize-b);Pi(t,T,w,3*b,2*b),l.setRenderTarget(t),l.render(f,ts)}}function jx(n){const e=[],t=[],i=[];let s=n;const r=n-jn+1+_l.length;for(let o=0;o<r;o++){const c=Math.pow(2,s);e.push(c);let l=1/c;o>n-jn?l=_l[o-n+jn-1]:o===0&&(l=0),t.push(l);const u=1/(c-2),d=-u,f=1+u,h=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,g=6,y=3,x=2,p=1,M=new Float32Array(y*g*m),S=new Float32Array(x*g*m),b=new Float32Array(p*g*m);for(let w=0;w<m;w++){const R=w%3*2/3-1,v=w>2?0:-1,E=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];M.set(E,y*g*w),S.set(h,x*g*w);const I=[w,w,w,w,w,w];b.set(I,p*g*w)}const T=new Ft;T.setAttribute("position",new kt(M,y)),T.setAttribute("uv",new kt(S,x)),T.setAttribute("faceIndex",new kt(b,p)),i.push(new ut(T,null)),s>jn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function yl(n,e,t){const i=new pn(n,e,t);return i.texture.mapping=Mr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pi(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Vx(n,e,t){return new xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Wx(n,e,t){const i=new Float32Array(ii),s=new J(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function bl(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Sl(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function wr(){return`

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
	`}class xu extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ou(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new pi(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:An});r.uniforms.tEquirect.value=t;const o=new ut(s,r),c=t.minFilter;return t.minFilter===ai&&(t.minFilter=Dt),new Zm(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function $x(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?o(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===zr||m===Gr)if(e.has(h)){const g=e.get(h).texture;return c(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const y=new xu(g.height);return y.fromEquirectangularTexture(n,h),e.set(h,y),h.addEventListener("dispose",u),c(y.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const m=h.mapping,g=m===zr||m===Gr,y=m===hi||m===Gi;if(g||y){let x=t.get(h);const p=x!==void 0?x.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Ml(n)),x=g?i.fromEquirectangular(h,x):i.fromCubemap(h,x),x.texture.pmremVersion=h.pmremVersion,t.set(h,x),x.texture;if(x!==void 0)return x.texture;{const M=h.image;return g&&M&&M.height>0||y&&M&&l(M)?(i===null&&(i=new Ml(n)),x=g?i.fromEquirectangular(h):i.fromCubemap(h),x.texture.pmremVersion=h.pmremVersion,t.set(h,x),h.addEventListener("dispose",d),x.texture):null}}}return h}function c(h,m){return m===zr?h.mapping=hi:m===Gr&&(h.mapping=Gi),h}function l(h){let m=0;const g=6;for(let y=0;y<g;y++)h[y]!==void 0&&m++;return m===g}function u(h){const m=h.target;m.removeEventListener("dispose",u);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function d(h){const m=h.target;m.removeEventListener("dispose",d);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Xx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ui("WebGLRenderer: "+i+" extension not supported."),s}}}function qx(n,e,t,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];const m=r.get(h);m&&(e.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER)}function u(f){const h=[],m=f.index,g=f.attributes.position;let y=0;if(g===void 0)return;if(m!==null){const M=m.array;y=m.version;for(let S=0,b=M.length;S<b;S+=3){const T=M[S+0],w=M[S+1],R=M[S+2];h.push(T,w,w,R,R,T)}}else{const M=g.array;y=g.version;for(let S=0,b=M.length/3-1;S<b;S+=3){const T=S+0,w=S+1,R=S+2;h.push(T,w,w,R,R,T)}}const x=new(g.count>=65535?ru:su)(h,1);x.version=y;const p=r.get(f);p&&e.remove(p),r.set(f,x)}function d(f){const h=r.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&u(f)}else u(f);return r.get(f)}return{get:c,update:l,getWireframeAttribute:d}}function Yx(n,e,t){let i;function s(f){i=f}let r,o;function c(f){r=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*o),t.update(h,i,1)}function u(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,r,f*o,m),t.update(h,i,m))}function d(f,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,m);let y=0;for(let x=0;x<m;x++)y+=h[x];t.update(y,i,1)}this.setMode=s,this.setIndex=c,this.render=l,this.renderInstances=u,this.renderMultiDraw=d}function Kx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,c){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:et("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Zx(n,e,t){const i=new WeakMap,s=new ft;function r(o,c,l){const u=o.morphTargetInfluences,d=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=d!==void 0?d.length:0;let h=i.get(c);if(h===void 0||h.count!==f){let E=function(){R.dispose(),i.delete(c),c.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();const m=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,x=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let S=0;m===!0&&(S=1),g===!0&&(S=2),y===!0&&(S=3);let b=c.attributes.position.count*S,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*T*4*f),R=new eu(w,b,T,f);R.type=un,R.needsUpdate=!0;const v=S*4;for(let I=0;I<f;I++){const P=x[I],L=p[I],z=M[I],O=b*T*4*I;for(let $=0;$<P.count;$++){const k=$*v;m===!0&&(s.fromBufferAttribute(P,$),w[O+k+0]=s.x,w[O+k+1]=s.y,w[O+k+2]=s.z,w[O+k+3]=0),g===!0&&(s.fromBufferAttribute(L,$),w[O+k+4]=s.x,w[O+k+5]=s.y,w[O+k+6]=s.z,w[O+k+7]=0),y===!0&&(s.fromBufferAttribute(z,$),w[O+k+8]=s.x,w[O+k+9]=s.y,w[O+k+10]=s.z,w[O+k+11]=z.itemSize===4?s.w:1)}}h={count:f,texture:R,size:new Ze(b,T)},i.set(c,h),c.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let y=0;y<u.length;y++)m+=u[y];const g=c.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Jx(n,e,t,i,s){let r=new WeakMap;function o(u){const d=s.render.frame,f=u.geometry,h=e.get(u,f);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),r.get(u)!==d&&(t.update(u.instanceMatrix,n.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,n.ARRAY_BUFFER),r.set(u,d))),u.isSkinnedMesh){const m=u.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return h}function c(){r=new WeakMap}function l(u){const d=u.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:c}}const Qx={[Bd]:"LINEAR_TONE_MAPPING",[kd]:"REINHARD_TONE_MAPPING",[zd]:"CINEON_TONE_MAPPING",[Gd]:"ACES_FILMIC_TONE_MAPPING",[jd]:"AGX_TONE_MAPPING",[Vd]:"NEUTRAL_TONE_MAPPING",[Hd]:"CUSTOM_TONE_MAPPING"};function e_(n,e,t,i,s,r){const o=new pn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Hi(e,t):void 0}),c=new pn(e,t,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),l=new Ft;l.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ct([0,2,0,0,2,0],2));const u=new $m({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ut(l,u),f=new fu(-1,1,1,-1,0,1);let h=null,m=null,g=!1,y,x=null,p=[],M=!1;this.setSize=function(S,b){o.setSize(S,b),c.setSize(S,b);for(let T=0;T<p.length;T++){const w=p[T];w.setSize&&w.setSize(S,b)}},this.setEffects=function(S){p=S,M=p.length>0&&p[0].isRenderPass===!0;const b=o.width,T=o.height;for(let w=0;w<p.length;w++){const R=p[w];R.setSize&&R.setSize(b,T)}},this.begin=function(S,b){if(g||S.toneMapping===fn&&p.length===0)return!1;if(x=b,b!==null){const T=b.width,w=b.height;(o.width!==T||o.height!==w)&&this.setSize(T,w)}return M===!1&&S.setRenderTarget(o),y=S.toneMapping,S.toneMapping=fn,!0},this.hasRenderPass=function(){return M},this.end=function(S,b){S.toneMapping=y,g=!0;let T=o,w=c;for(let R=0;R<p.length;R++){const v=p[R];if(v.enabled!==!1&&(v.render(S,w,T,b),v.needsSwap!==!1)){const E=T;T=w,w=E}}if(h!==S.outputColorSpace||m!==S.toneMapping){h=S.outputColorSpace,m=S.toneMapping,u.defines={},Ye.getTransfer(h)===it&&(u.defines.SRGB_TRANSFER="");const R=Qx[m];R&&(u.defines[R]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,S.setRenderTarget(x),S.render(d,f),x=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),c.dispose(),l.dispose(),u.dispose()}}const _u=new Ut,Po=new Hi(1,1),vu=new eu,Mu=new wm,yu=new ou,wl=[],El=[],Tl=new Float32Array(16),Al=new Float32Array(9),Cl=new Float32Array(4);function qi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=wl[s];if(r===void 0&&(r=new Float32Array(s),wl[s]=r),e!==0){i.toArray(r,0);for(let o=1,c=0;o!==e;++o)c+=t,n[o].toArray(r,c)}return r}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Er(n,e){let t=El[e];t===void 0&&(t=new Int32Array(e),El[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function t_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function n_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function s_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function r_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Cl.set(i),n.uniformMatrix2fv(this.addr,!1,Cl),Tt(t,i)}}function a_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Al.set(i),n.uniformMatrix3fv(this.addr,!1,Al),Tt(t,i)}}function o_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),Tt(t,i)}}function c_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function d_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function u_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function h_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function f_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function p_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function g_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Po.compareFunction=t.isReversedDepthBuffer()?Jo:Zo,r=Po):r=_u,t.setTexture2D(e||r,s)}function x_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Mu,s)}function __(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||yu,s)}function v_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||vu,s)}function M_(n){switch(n){case 5126:return t_;case 35664:return n_;case 35665:return i_;case 35666:return s_;case 35674:return r_;case 35675:return a_;case 35676:return o_;case 5124:case 35670:return c_;case 35667:case 35671:return l_;case 35668:case 35672:return d_;case 35669:case 35673:return u_;case 5125:return h_;case 36294:return f_;case 36295:return p_;case 36296:return m_;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return __;case 36289:case 36303:case 36311:case 36292:return v_}}function y_(n,e){n.uniform1fv(this.addr,e)}function b_(n,e){const t=qi(e,this.size,2);n.uniform2fv(this.addr,t)}function S_(n,e){const t=qi(e,this.size,3);n.uniform3fv(this.addr,t)}function w_(n,e){const t=qi(e,this.size,4);n.uniform4fv(this.addr,t)}function E_(n,e){const t=qi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function T_(n,e){const t=qi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function A_(n,e){const t=qi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function C_(n,e){n.uniform1iv(this.addr,e)}function R_(n,e){n.uniform2iv(this.addr,e)}function N_(n,e){n.uniform3iv(this.addr,e)}function P_(n,e){n.uniform4iv(this.addr,e)}function L_(n,e){n.uniform1uiv(this.addr,e)}function I_(n,e){n.uniform2uiv(this.addr,e)}function D_(n,e){n.uniform3uiv(this.addr,e)}function U_(n,e){n.uniform4uiv(this.addr,e)}function F_(n,e,t){const i=this.cache,s=e.length,r=Er(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Po:o=_u;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||o,r[c])}function O_(n,e,t){const i=this.cache,s=e.length,r=Er(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Mu,r[o])}function B_(n,e,t){const i=this.cache,s=e.length,r=Er(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||yu,r[o])}function k_(n,e,t){const i=this.cache,s=e.length,r=Er(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||vu,r[o])}function z_(n){switch(n){case 5126:return y_;case 35664:return b_;case 35665:return S_;case 35666:return w_;case 35674:return E_;case 35675:return T_;case 35676:return A_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return N_;case 35669:case 35673:return P_;case 5125:return L_;case 36294:return I_;case 36295:return D_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return F_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return k_}}class G_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=M_(t.type)}}class H_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=z_(t.type)}}class j_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Rl(n,e){n.seq.push(e),n.map[e.id]=e}function V_(n,e,t){const i=n.name,s=i.length;for(_a.lastIndex=0;;){const r=_a.exec(i),o=_a.lastIndex;let c=r[1];const l=r[2]==="]",u=r[3];if(l&&(c=c|0),u===void 0||u==="["&&o+2===s){Rl(t,u===void 0?new G_(c,n,e):new H_(c,n,e));break}else{let f=t.map[c];f===void 0&&(f=new j_(c),Rl(t,f)),t=f}}}class rr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);V_(c,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const c=t[r],l=i[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Nl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const W_=37297;let $_=0;function X_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const c=o+1;i.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return i.join(`
`)}const Pl=new ke;function q_(n){Ye._getMatrix(Pl,Ye.workingColorSpace,n);const e=`mat3( ${Pl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case hr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ll(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+X_(n.getShaderSource(e),c)}else return r}function Y_(n,e){const t=q_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const K_={[Bd]:"Linear",[kd]:"Reinhard",[zd]:"Cineon",[Gd]:"ACESFilmic",[jd]:"AgX",[Vd]:"Neutral",[Hd]:"Custom"};function Z_(n,e){const t=K_[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $s=new J;function J_(){Ye.getLuminanceCoefficients($s);const n=$s.x.toFixed(4),e=$s.y.toFixed(4),t=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Q_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function ev(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function tv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:c}}return t}function cs(n){return n!==""}function Il(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lo(n){return n.replace(nv,sv)}const iv=new Map;function sv(n,e){let t=je[e];if(t===void 0){const i=iv.get(e);if(i!==void 0)t=je[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Lo(t)}const rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(n){return n.replace(rv,av)}function av(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const ov={[er]:"SHADOWMAP_TYPE_PCF",[os]:"SHADOWMAP_TYPE_VSM"};function cv(n){return ov[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lv={[hi]:"ENVMAP_TYPE_CUBE",[Gi]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE_UV"};function dv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":lv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const uv={[Gi]:"ENVMAP_MODE_REFRACTION"};function hv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":uv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const fv={[Od]:"ENVMAP_BLENDING_MULTIPLY",[im]:"ENVMAP_BLENDING_MIX",[sm]:"ENVMAP_BLENDING_ADD"};function pv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":fv[n.combine]||"ENVMAP_BLENDING_NONE"}function mv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function gv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=cv(t),u=dv(t),d=hv(t),f=pv(t),h=mv(t),m=Q_(t),g=ev(r),y=s.createProgram();let x,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cs).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cs).join(`
`),p.length>0&&(p+=`
`)):(x=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),p=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fn?"#define TONE_MAPPING":"",t.toneMapping!==fn?je.tonemapping_pars_fragment:"",t.toneMapping!==fn?Z_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,Y_("linearToOutputTexel",t.outputColorSpace),J_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cs).join(`
`)),o=Lo(o),o=Il(o,t),o=Dl(o,t),c=Lo(c),c=Il(c,t),c=Dl(c,t),o=Ul(o),c=Ul(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,x=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",t.glslVersion===$c?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+x+o,b=M+p+c,T=Nl(s,s.VERTEX_SHADER,S),w=Nl(s,s.FRAGMENT_SHADER,b);s.attachShader(y,T),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(P){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(y)||"",z=s.getShaderInfoLog(T)||"",O=s.getShaderInfoLog(w)||"",$=L.trim(),k=z.trim(),U=O.trim();let K=!0,ie=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,T,w);else{const pe=Ll(s,T,"vertex"),he=Ll(s,w,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+$+`
`+pe+`
`+he)}else $!==""?Oe("WebGLProgram: Program Info Log:",$):(k===""||U==="")&&(ie=!1);ie&&(P.diagnostics={runnable:K,programLog:$,vertexShader:{log:k,prefix:x},fragmentShader:{log:U,prefix:p}})}s.deleteShader(T),s.deleteShader(w),v=new rr(s,y),E=tv(s,y)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(y,W_)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=w,this}let xv=0;class _v{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vv(e),t.set(e,i)),i}}class vv{constructor(e){this.id=xv++,this.code=e,this.usedTimes=0}}function Mv(n){return n===fi||n===lr||n===dr}function yv(n,e,t,i,s,r){const o=new tu,c=new _v,l=new Set,u=[],d=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,E,I,P,L,z){const O=P.fog,$=L.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,U=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||k,U),ie=K&&K.mapping===Mr?K.image.height:null,pe=m[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const he=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,me=he!==void 0?he.length:0;let Pe=0;$.morphAttributes.position!==void 0&&(Pe=1),$.morphAttributes.normal!==void 0&&(Pe=2),$.morphAttributes.color!==void 0&&(Pe=3);let ge,Be,re,X;if(pe){const Re=dn[pe];ge=Re.vertexShader,Be=Re.fragmentShader}else{ge=v.vertexShader,Be=v.fragmentShader;const Re=c.getVertexShaderStage(v),gt=c.getFragmentShaderStage(v);c.update(v,Re,gt),re=Re.id,X=gt.id}const Q=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Le=L.isInstancedMesh===!0,Ce=L.isBatchedMesh===!0,qe=!!v.map,Ge=!!v.matcap,Je=!!K,$e=!!v.aoMap,Ve=!!v.lightMap,dt=!!v.bumpMap&&v.wireframe===!1,ht=!!v.normalMap,mt=!!v.displacementMap,Mt=!!v.emissiveMap,ot=!!v.metalnessMap,Y=!!v.roughnessMap,N=v.anisotropy>0,ae=v.clearcoat>0,oe=v.dispersion>0,A=v.iridescence>0,_=v.sheen>0,D=v.transmission>0,F=N&&!!v.anisotropyMap,G=ae&&!!v.clearcoatMap,Z=ae&&!!v.clearcoatNormalMap,H=ae&&!!v.clearcoatRoughnessMap,B=A&&!!v.iridescenceMap,V=A&&!!v.iridescenceThicknessMap,se=_&&!!v.sheenColorMap,ue=_&&!!v.sheenRoughnessMap,le=!!v.specularMap,ce=!!v.specularColorMap,ve=!!v.specularIntensityMap,Se=D&&!!v.transmissionMap,De=D&&!!v.thicknessMap,W=!!v.gradientMap,_e=!!v.alphaMap,de=v.alphaTest>0,xe=!!v.alphaHash,Ee=!!v.extensions;let fe=fn;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(fe=n.toneMapping);const Ie={shaderID:pe,shaderType:v.type,shaderName:v.name,vertexShader:ge,fragmentShader:Be,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:X,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Ce,batchingColor:Ce&&L._colorsTexture!==null,instancing:Le,instancingColor:Le&&L.instanceColor!==null,instancingMorph:Le&&L.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:qe,matcap:Ge,envMap:Je,envMapMode:Je&&K.mapping,envMapCubeUVHeight:ie,aoMap:$e,lightMap:Ve,bumpMap:dt,normalMap:ht,displacementMap:mt,emissiveMap:Mt,normalMapObjectSpace:ht&&v.normalMapType===om,normalMapTangentSpace:ht&&v.normalMapType===Co,packedNormalMap:ht&&v.normalMapType===Co&&Mv(v.normalMap.format),metalnessMap:ot,roughnessMap:Y,anisotropy:N,anisotropyMap:F,clearcoat:ae,clearcoatMap:G,clearcoatNormalMap:Z,clearcoatRoughnessMap:H,dispersion:oe,iridescence:A,iridescenceMap:B,iridescenceThicknessMap:V,sheen:_,sheenColorMap:se,sheenRoughnessMap:ue,specularMap:le,specularColorMap:ce,specularIntensityMap:ve,transmission:D,transmissionMap:Se,thicknessMap:De,gradientMap:W,opaque:v.transparent===!1&&v.blending===Di&&v.alphaToCoverage===!1,alphaMap:_e,alphaTest:de,alphaHash:xe,combine:v.combine,mapUv:qe&&g(v.map.channel),aoMapUv:$e&&g(v.aoMap.channel),lightMapUv:Ve&&g(v.lightMap.channel),bumpMapUv:dt&&g(v.bumpMap.channel),normalMapUv:ht&&g(v.normalMap.channel),displacementMapUv:mt&&g(v.displacementMap.channel),emissiveMapUv:Mt&&g(v.emissiveMap.channel),metalnessMapUv:ot&&g(v.metalnessMap.channel),roughnessMapUv:Y&&g(v.roughnessMap.channel),anisotropyMapUv:F&&g(v.anisotropyMap.channel),clearcoatMapUv:G&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:Z&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:B&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:V&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:se&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ue&&g(v.sheenRoughnessMap.channel),specularMapUv:le&&g(v.specularMap.channel),specularColorMapUv:ce&&g(v.specularColorMap.channel),specularIntensityMapUv:ve&&g(v.specularIntensityMap.channel),transmissionMapUv:Se&&g(v.transmissionMap.channel),thicknessMapUv:De&&g(v.thicknessMap.channel),alphaMapUv:_e&&g(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(ht||N),vertexNormals:!!$.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!$.attributes.uv&&(qe||_e),fog:!!O,useFog:v.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||$.attributes.normal===void 0&&ht===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Me,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Pe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:fe,decodeVideoTexture:qe&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===it,decodeVideoTextureEmissive:Mt&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===it,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Sn,flipSided:v.side===Ht,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ee&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&v.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function x(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)E.push(I),E.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(p(E,v),M(E,v),E.push(n.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function p(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function M(v,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function S(v){const E=m[v.type];let I;if(E){const P=dn[E];I=jm.clone(P.uniforms)}else I=v.uniforms;return I}function b(v,E){let I=d.get(E);return I!==void 0?++I.usedTimes:(I=new gv(n,E,v,s),u.push(I),d.set(E,I)),I}function T(v){if(--v.usedTimes===0){const E=u.indexOf(v);u[E]=u[u.length-1],u.pop(),d.delete(v.cacheKey),v.destroy()}}function w(v){c.remove(v)}function R(){c.dispose()}return{getParameters:y,getProgramCacheKey:x,getUniforms:S,acquireProgram:b,releaseProgram:T,releaseShaderCache:w,programs:u,dispose:R}}function bv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let c=n.get(o);return c===void 0&&(c={},n.set(o,c)),c}function i(o){n.delete(o)}function s(o,c,l){n.get(o)[c]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Sv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Ol(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Bl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function c(h,m,g,y,x,p){let M=n[e];return M===void 0?(M={id:h.id,object:h,geometry:m,material:g,materialVariant:o(h),groupOrder:y,renderOrder:h.renderOrder,z:x,group:p},n[e]=M):(M.id=h.id,M.object=h,M.geometry=m,M.material=g,M.materialVariant=o(h),M.groupOrder=y,M.renderOrder=h.renderOrder,M.z=x,M.group=p),e++,M}function l(h,m,g,y,x,p){const M=c(h,m,g,y,x,p);g.transmission>0?i.push(M):g.transparent===!0?s.push(M):t.push(M)}function u(h,m,g,y,x,p){const M=c(h,m,g,y,x,p);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function d(h,m,g){t.length>1&&t.sort(h||Sv),i.length>1&&i.sort(m||Ol),s.length>1&&s.sort(m||Ol),g&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let h=e,m=n.length;h<m;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:u,finish:f,sort:d}}function wv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Bl,n.set(i,[o])):s>=r.length?(o=new Bl,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Ev(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new Xe};break;case"SpotLight":t={position:new J,direction:new J,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function Tv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Av=0;function Cv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Rv(n){const e=new Ev,t=Tv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new J);const s=new J,r=new pt,o=new pt;function c(u){let d=0,f=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,g=0,y=0,x=0,p=0,M=0,S=0,b=0,T=0,w=0,R=0;u.sort(Cv);for(let E=0,I=u.length;E<I;E++){const P=u[E],L=P.color,z=P.intensity,O=P.distance;let $=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===fi?$=P.shadow.map.texture:$=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=L.r*z,f+=L.g*z,h+=L.b*z;else if(P.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(P.sh.coefficients[k],z);R++}else if(P.isDirectionalLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const U=P.shadow,K=t.get(P);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,i.directionalShadow[m]=K,i.directionalShadowMap[m]=$,i.directionalShadowMatrix[m]=P.shadow.matrix,M++}i.directional[m]=k,m++}else if(P.isSpotLight){const k=e.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(L).multiplyScalar(z),k.distance=O,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,i.spot[y]=k;const U=P.shadow;if(P.map&&(i.spotLightMap[T]=P.map,T++,U.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[y]=U.matrix,P.castShadow){const K=t.get(P);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,i.spotShadow[y]=K,i.spotShadowMap[y]=$,b++}y++}else if(P.isRectAreaLight){const k=e.get(P);k.color.copy(L).multiplyScalar(z),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),i.rectArea[x]=k,x++}else if(P.isPointLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){const U=P.shadow,K=t.get(P);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,K.shadowCameraNear=U.camera.near,K.shadowCameraFar=U.camera.far,i.pointShadow[g]=K,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=P.shadow.matrix,S++}i.point[g]=k,g++}else if(P.isHemisphereLight){const k=e.get(P);k.skyColor.copy(P.color).multiplyScalar(z),k.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[p]=k,p++}}x>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==m||v.pointLength!==g||v.spotLength!==y||v.rectAreaLength!==x||v.hemiLength!==p||v.numDirectionalShadows!==M||v.numPointShadows!==S||v.numSpotShadows!==b||v.numSpotMaps!==T||v.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=x,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=b+T-w,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,v.directionalLength=m,v.pointLength=g,v.spotLength=y,v.rectAreaLength=x,v.hemiLength=p,v.numDirectionalShadows=M,v.numPointShadows=S,v.numSpotShadows=b,v.numSpotMaps=T,v.numLightProbes=R,i.version=Av++)}function l(u,d){let f=0,h=0,m=0,g=0,y=0;const x=d.matrixWorldInverse;for(let p=0,M=u.length;p<M;p++){const S=u[p];if(S.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(x),f++}else if(S.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(x),b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(x),m++}else if(S.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(x),o.identity(),r.copy(S.matrixWorld),r.premultiply(x),o.extractRotation(r),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(x),h++}else if(S.isHemisphereLight){const b=i.hemi[y];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(x),y++}}}return{setup:c,setupView:l,state:i}}function kl(n){const e=new Rv(n),t=[],i=[],s=[];function r(h){f.camera=h,t.length=0,i.length=0,s.length=0}function o(h){t.push(h)}function c(h){i.push(h)}function l(h){s.push(h)}function u(){e.setup(t)}function d(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:u,setupLightsView:d,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function Nv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let c;return o===void 0?(c=new kl(n),e.set(s,[c])):r>=o.length?(c=new kl(n),o.push(c)):c=o[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const Pv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lv=`uniform sampler2D shadow_pass;
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
}`,Iv=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],Dv=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],zl=new pt,ns=new J,va=new J;function Uv(n,e,t){let i=new ec;const s=new Ze,r=new Ze,o=new ft,c=new Xm,l=new qm,u={},d=t.maxTextureSize,f={[Wn]:Ht,[Ht]:Wn,[Sn]:Sn},h=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:Pv,fragmentShader:Lv}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ft;g.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ut(g,h),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=er;let p=this.type;this.render=function(w,R,v){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||w.length===0)return;this.type===Bp&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=er);const E=n.getRenderTarget(),I=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),L=n.state;L.setBlending(An),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const z=p!==this.type;z&&R.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach($=>$.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,$=w.length;O<$;O++){const k=w[O],U=k.shadow;if(U===void 0){Oe("WebGLShadowMap:",k,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const K=U.getFrameExtents();s.multiply(K),r.copy(U.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/K.x),s.x=r.x*K.x,U.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/K.y),s.y=r.y*K.y,U.mapSize.y=r.y));const ie=n.state.buffers.depth.getReversed();if(U.camera._reversedDepth=ie,U.map===null||z===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===os){if(k.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new pn(s.x,s.y,{format:fi,type:Nn,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),U.map.texture.name=k.name+".shadowMap",U.map.depthTexture=new Hi(s.x,s.y,un),U.map.depthTexture.name=k.name+".shadowMapDepth",U.map.depthTexture.format=Pn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Nt,U.map.depthTexture.magFilter=Nt}else k.isPointLight?(U.map=new xu(s.x),U.map.depthTexture=new Gm(s.x,gn)):(U.map=new pn(s.x,s.y),U.map.depthTexture=new Hi(s.x,s.y,gn)),U.map.depthTexture.name=k.name+".shadowMap",U.map.depthTexture.format=Pn,this.type===er?(U.map.depthTexture.compareFunction=ie?Jo:Zo,U.map.depthTexture.minFilter=Dt,U.map.depthTexture.magFilter=Dt):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Nt,U.map.depthTexture.magFilter=Nt);U.camera.updateProjectionMatrix()}const pe=U.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<pe;he++){if(U.map.isWebGLCubeRenderTarget)n.setRenderTarget(U.map,he),n.clear();else{he===0&&(n.setRenderTarget(U.map),n.clear());const me=U.getViewport(he);o.set(r.x*me.x,r.y*me.y,r.x*me.z,r.y*me.w),L.viewport(o)}if(k.isPointLight){const me=U.camera,Pe=U.matrix,ge=k.distance||me.far;ge!==me.far&&(me.far=ge,me.updateProjectionMatrix()),ns.setFromMatrixPosition(k.matrixWorld),me.position.copy(ns),va.copy(me.position),va.add(Iv[he]),me.up.copy(Dv[he]),me.lookAt(va),me.updateMatrixWorld(),Pe.makeTranslation(-ns.x,-ns.y,-ns.z),zl.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),U._frustum.setFromProjectionMatrix(zl,me.coordinateSystem,me.reversedDepth)}else U.updateMatrices(k);i=U.getFrustum(),b(R,v,U.camera,k,this.type)}U.isPointLightShadow!==!0&&this.type===os&&M(U,v),U.needsUpdate=!1}p=this.type,x.needsUpdate=!1,n.setRenderTarget(E,I,P)};function M(w,R){const v=e.update(y);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new pn(s.x,s.y,{format:fi,type:Nn})),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,v,h,y,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,v,m,y,null)}function S(w,R,v,E){let I=null;const P=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)I=P;else if(I=v.isPointLight===!0?l:c,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const L=I.uuid,z=R.uuid;let O=u[L];O===void 0&&(O={},u[L]=O);let $=O[z];$===void 0&&($=I.clone(),O[z]=$,R.addEventListener("dispose",T)),I=$}if(I.visible=R.visible,I.wireframe=R.wireframe,E===os?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:f[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const L=n.properties.get(I);L.light=v}return I}function b(w,R,v,E,I){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===os)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const z=e.update(w),O=w.material;if(Array.isArray(O)){const $=z.groups;for(let k=0,U=$.length;k<U;k++){const K=$[k],ie=O[K.materialIndex];if(ie&&ie.visible){const pe=S(w,ie,E,I);w.onBeforeShadow(n,w,R,v,z,pe,K),n.renderBufferDirect(v,null,z,pe,w,K),w.onAfterShadow(n,w,R,v,z,pe,K)}}}else if(O.visible){const $=S(w,O,E,I);w.onBeforeShadow(n,w,R,v,z,$,null),n.renderBufferDirect(v,null,z,$,w,null),w.onAfterShadow(n,w,R,v,z,$,null)}}const L=w.children;for(let z=0,O=L.length;z<O;z++)b(L[z],R,v,E,I)}function T(w){w.target.removeEventListener("dispose",T);for(const v in u){const E=u[v],I=w.target.uuid;I in E&&(E[I].dispose(),delete E[I])}}}function Fv(n,e){function t(){let W=!1;const _e=new ft;let de=null;const xe=new ft(0,0,0,0);return{setMask:function(Ee){de!==Ee&&!W&&(n.colorMask(Ee,Ee,Ee,Ee),de=Ee)},setLocked:function(Ee){W=Ee},setClear:function(Ee,fe,Ie,Re,gt){gt===!0&&(Ee*=Re,fe*=Re,Ie*=Re),_e.set(Ee,fe,Ie,Re),xe.equals(_e)===!1&&(n.clearColor(Ee,fe,Ie,Re),xe.copy(_e))},reset:function(){W=!1,de=null,xe.set(-1,0,0,0)}}}function i(){let W=!1,_e=!1,de=null,xe=null,Ee=null;return{setReversed:function(fe){if(_e!==fe){const Ie=e.get("EXT_clip_control");fe?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),_e=fe;const Re=Ee;Ee=null,this.setClear(Re)}},getReversed:function(){return _e},setTest:function(fe){fe?Q(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(fe){de!==fe&&!W&&(n.depthMask(fe),de=fe)},setFunc:function(fe){if(_e&&(fe=xm[fe]),xe!==fe){switch(fe){case Ha:n.depthFunc(n.NEVER);break;case ja:n.depthFunc(n.ALWAYS);break;case Va:n.depthFunc(n.LESS);break;case zi:n.depthFunc(n.LEQUAL);break;case Wa:n.depthFunc(n.EQUAL);break;case $a:n.depthFunc(n.GEQUAL);break;case Xa:n.depthFunc(n.GREATER);break;case qa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=fe}},setLocked:function(fe){W=fe},setClear:function(fe){Ee!==fe&&(Ee=fe,_e&&(fe=1-fe),n.clearDepth(fe))},reset:function(){W=!1,de=null,xe=null,Ee=null,_e=!1}}}function s(){let W=!1,_e=null,de=null,xe=null,Ee=null,fe=null,Ie=null,Re=null,gt=null;return{setTest:function(ct){W||(ct?Q(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(ct){_e!==ct&&!W&&(n.stencilMask(ct),_e=ct)},setFunc:function(ct,sn,rn){(de!==ct||xe!==sn||Ee!==rn)&&(n.stencilFunc(ct,sn,rn),de=ct,xe=sn,Ee=rn)},setOp:function(ct,sn,rn){(fe!==ct||Ie!==sn||Re!==rn)&&(n.stencilOp(ct,sn,rn),fe=ct,Ie=sn,Re=rn)},setLocked:function(ct){W=ct},setClear:function(ct){gt!==ct&&(n.clearStencil(ct),gt=ct)},reset:function(){W=!1,_e=null,de=null,xe=null,Ee=null,fe=null,Ie=null,Re=null,gt=null}}}const r=new t,o=new i,c=new s,l=new WeakMap,u=new WeakMap;let d={},f={},h={},m=new WeakMap,g=[],y=null,x=!1,p=null,M=null,S=null,b=null,T=null,w=null,R=null,v=new Xe(0,0,0),E=0,I=!1,P=null,L=null,z=null,O=null,$=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,K=0;const ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ie)[1]),U=K>=1):ie.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),U=K>=2);let pe=null,he={};const me=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),ge=new ft().fromArray(me),Be=new ft().fromArray(Pe);function re(W,_e,de,xe){const Ee=new Uint8Array(4),fe=n.createTexture();n.bindTexture(W,fe),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<de;Ie++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(_e+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return fe}const X={};X[n.TEXTURE_2D]=re(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Q(n.DEPTH_TEST),o.setFunc(zi),dt(!1),ht(Gc),Q(n.CULL_FACE),$e(An);function Q(W){d[W]!==!0&&(n.enable(W),d[W]=!0)}function Me(W){d[W]!==!1&&(n.disable(W),d[W]=!1)}function Le(W,_e){return h[W]!==_e?(n.bindFramebuffer(W,_e),h[W]=_e,W===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=_e),W===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ce(W,_e){let de=g,xe=!1;if(W){de=m.get(_e),de===void 0&&(de=[],m.set(_e,de));const Ee=W.textures;if(de.length!==Ee.length||de[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,Ie=Ee.length;fe<Ie;fe++)de[fe]=n.COLOR_ATTACHMENT0+fe;de.length=Ee.length,xe=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,xe=!0);xe&&n.drawBuffers(de)}function qe(W){return y!==W?(n.useProgram(W),y=W,!0):!1}const Ge={[ni]:n.FUNC_ADD,[zp]:n.FUNC_SUBTRACT,[Gp]:n.FUNC_REVERSE_SUBTRACT};Ge[Hp]=n.MIN,Ge[jp]=n.MAX;const Je={[Vp]:n.ZERO,[Wp]:n.ONE,[$p]:n.SRC_COLOR,[za]:n.SRC_ALPHA,[Jp]:n.SRC_ALPHA_SATURATE,[Kp]:n.DST_COLOR,[qp]:n.DST_ALPHA,[Xp]:n.ONE_MINUS_SRC_COLOR,[Ga]:n.ONE_MINUS_SRC_ALPHA,[Zp]:n.ONE_MINUS_DST_COLOR,[Yp]:n.ONE_MINUS_DST_ALPHA,[Qp]:n.CONSTANT_COLOR,[em]:n.ONE_MINUS_CONSTANT_COLOR,[tm]:n.CONSTANT_ALPHA,[nm]:n.ONE_MINUS_CONSTANT_ALPHA};function $e(W,_e,de,xe,Ee,fe,Ie,Re,gt,ct){if(W===An){x===!0&&(Me(n.BLEND),x=!1);return}if(x===!1&&(Q(n.BLEND),x=!0),W!==kp){if(W!==p||ct!==I){if((M!==ni||T!==ni)&&(n.blendEquation(n.FUNC_ADD),M=ni,T=ni),ct)switch(W){case Di:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ui:n.blendFunc(n.ONE,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",W);break}else switch(W){case Di:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ui:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Hc:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jc:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",W);break}S=null,b=null,w=null,R=null,v.set(0,0,0),E=0,p=W,I=ct}return}Ee=Ee||_e,fe=fe||de,Ie=Ie||xe,(_e!==M||Ee!==T)&&(n.blendEquationSeparate(Ge[_e],Ge[Ee]),M=_e,T=Ee),(de!==S||xe!==b||fe!==w||Ie!==R)&&(n.blendFuncSeparate(Je[de],Je[xe],Je[fe],Je[Ie]),S=de,b=xe,w=fe,R=Ie),(Re.equals(v)===!1||gt!==E)&&(n.blendColor(Re.r,Re.g,Re.b,gt),v.copy(Re),E=gt),p=W,I=!1}function Ve(W,_e){W.side===Sn?Me(n.CULL_FACE):Q(n.CULL_FACE);let de=W.side===Ht;_e&&(de=!de),dt(de),W.blending===Di&&W.transparent===!1?$e(An):$e(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);const xe=W.stencilWrite;c.setTest(xe),xe&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Mt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(W){P!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),P=W)}function ht(W){W!==Fp?(Q(n.CULL_FACE),W!==L&&(W===Gc?n.cullFace(n.BACK):W===Op?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),L=W}function mt(W){W!==z&&(U&&n.lineWidth(W),z=W)}function Mt(W,_e,de){W?(Q(n.POLYGON_OFFSET_FILL),(O!==_e||$!==de)&&(O=_e,$=de,o.getReversed()&&(_e=-_e),n.polygonOffset(_e,de))):Me(n.POLYGON_OFFSET_FILL)}function ot(W){W?Q(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function Y(W){W===void 0&&(W=n.TEXTURE0+k-1),pe!==W&&(n.activeTexture(W),pe=W)}function N(W,_e,de){de===void 0&&(pe===null?de=n.TEXTURE0+k-1:de=pe);let xe=he[de];xe===void 0&&(xe={type:void 0,texture:void 0},he[de]=xe),(xe.type!==W||xe.texture!==_e)&&(pe!==de&&(n.activeTexture(de),pe=de),n.bindTexture(W,_e||X[W]),xe.type=W,xe.texture=_e)}function ae(){const W=he[pe];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function oe(){try{n.compressedTexImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function _(){try{n.texSubImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function D(){try{n.texSubImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function F(){try{n.compressedTexSubImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function G(){try{n.compressedTexSubImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function Z(){try{n.texStorage2D(...arguments)}catch(W){et("WebGLState:",W)}}function H(){try{n.texStorage3D(...arguments)}catch(W){et("WebGLState:",W)}}function B(){try{n.texImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function V(){try{n.texImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function se(W){return f[W]!==void 0?f[W]:n.getParameter(W)}function ue(W,_e){f[W]!==_e&&(n.pixelStorei(W,_e),f[W]=_e)}function le(W){ge.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),ge.copy(W))}function ce(W){Be.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),Be.copy(W))}function ve(W,_e){let de=u.get(_e);de===void 0&&(de=new WeakMap,u.set(_e,de));let xe=de.get(W);xe===void 0&&(xe=n.getUniformBlockIndex(_e,W.name),de.set(W,xe))}function Se(W,_e){const xe=u.get(_e).get(W);l.get(_e)!==xe&&(n.uniformBlockBinding(_e,xe,W.__bindingPointIndex),l.set(_e,xe))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},pe=null,he={},h={},m=new WeakMap,g=[],y=null,x=!1,p=null,M=null,S=null,b=null,T=null,w=null,R=null,v=new Xe(0,0,0),E=0,I=!1,P=null,L=null,z=null,O=null,$=null,ge.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:Q,disable:Me,bindFramebuffer:Le,drawBuffers:Ce,useProgram:qe,setBlending:$e,setMaterial:Ve,setFlipSided:dt,setCullFace:ht,setLineWidth:mt,setPolygonOffset:Mt,setScissorTest:ot,activeTexture:Y,bindTexture:N,unbindTexture:ae,compressedTexImage2D:oe,compressedTexImage3D:A,texImage2D:B,texImage3D:V,pixelStorei:ue,getParameter:se,updateUBOMapping:ve,uniformBlockBinding:Se,texStorage2D:Z,texStorage3D:H,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:F,compressedTexSubImage3D:G,scissor:le,viewport:ce,reset:De}}function Ov(n,e,t,i,s,r,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ze,d=new WeakMap,f=new Set;let h;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(A,_){return g?new OffscreenCanvas(A,_):fr("canvas")}function x(A,_,D){let F=1;const G=oe(A);if((G.width>D||G.height>D)&&(F=D/Math.max(G.width,G.height)),F<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(F*G.width),H=Math.floor(F*G.height);h===void 0&&(h=y(Z,H));const B=_?y(Z,H):h;return B.width=Z,B.height=H,B.getContext("2d").drawImage(A,0,0,Z,H),Oe("WebGLRenderer: Texture has been resized from ("+G.width+"x"+G.height+") to ("+Z+"x"+H+")."),B}else return"data"in A&&Oe("WebGLRenderer: Image in DataTexture is too big ("+G.width+"x"+G.height+")."),A;return A}function p(A){return A.generateMipmaps}function M(A){n.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(A,_,D,F,G,Z=!1){if(A!==null){if(n[A]!==void 0)return n[A];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let H;F&&(H=e.get("EXT_texture_norm16"),H||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let B=_;if(_===n.RED&&(D===n.FLOAT&&(B=n.R32F),D===n.HALF_FLOAT&&(B=n.R16F),D===n.UNSIGNED_BYTE&&(B=n.R8),D===n.UNSIGNED_SHORT&&H&&(B=H.R16_EXT),D===n.SHORT&&H&&(B=H.R16_SNORM_EXT)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.R8UI),D===n.UNSIGNED_SHORT&&(B=n.R16UI),D===n.UNSIGNED_INT&&(B=n.R32UI),D===n.BYTE&&(B=n.R8I),D===n.SHORT&&(B=n.R16I),D===n.INT&&(B=n.R32I)),_===n.RG&&(D===n.FLOAT&&(B=n.RG32F),D===n.HALF_FLOAT&&(B=n.RG16F),D===n.UNSIGNED_BYTE&&(B=n.RG8),D===n.UNSIGNED_SHORT&&H&&(B=H.RG16_EXT),D===n.SHORT&&H&&(B=H.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.RG8UI),D===n.UNSIGNED_SHORT&&(B=n.RG16UI),D===n.UNSIGNED_INT&&(B=n.RG32UI),D===n.BYTE&&(B=n.RG8I),D===n.SHORT&&(B=n.RG16I),D===n.INT&&(B=n.RG32I)),_===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.RGB8UI),D===n.UNSIGNED_SHORT&&(B=n.RGB16UI),D===n.UNSIGNED_INT&&(B=n.RGB32UI),D===n.BYTE&&(B=n.RGB8I),D===n.SHORT&&(B=n.RGB16I),D===n.INT&&(B=n.RGB32I)),_===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(B=n.RGBA16UI),D===n.UNSIGNED_INT&&(B=n.RGBA32UI),D===n.BYTE&&(B=n.RGBA8I),D===n.SHORT&&(B=n.RGBA16I),D===n.INT&&(B=n.RGBA32I)),_===n.RGB&&(D===n.UNSIGNED_SHORT&&H&&(B=H.RGB16_EXT),D===n.SHORT&&H&&(B=H.RGB16_SNORM_EXT),D===n.UNSIGNED_INT_5_9_9_9_REV&&(B=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(B=n.R11F_G11F_B10F)),_===n.RGBA){const V=Z?hr:Ye.getTransfer(G);D===n.FLOAT&&(B=n.RGBA32F),D===n.HALF_FLOAT&&(B=n.RGBA16F),D===n.UNSIGNED_BYTE&&(B=V===it?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT&&H&&(B=H.RGBA16_EXT),D===n.SHORT&&H&&(B=H.RGBA16_SNORM_EXT),D===n.UNSIGNED_SHORT_4_4_4_4&&(B=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(B=n.RGB5_A1)}return(B===n.R16F||B===n.R32F||B===n.RG16F||B===n.RG32F||B===n.RGBA16F||B===n.RGBA32F)&&e.get("EXT_color_buffer_float"),B}function T(A,_){let D;return A?_===null||_===gn||_===hs?D=n.DEPTH24_STENCIL8:_===un?D=n.DEPTH32F_STENCIL8:_===us&&(D=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===gn||_===hs?D=n.DEPTH_COMPONENT24:_===un?D=n.DEPTH_COMPONENT32F:_===us&&(D=n.DEPTH_COMPONENT16),D}function w(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Nt&&A.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function R(A){const _=A.target;_.removeEventListener("dispose",R),E(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function v(A){const _=A.target;_.removeEventListener("dispose",v),P(_)}function E(A){const _=i.get(A);if(_.__webglInit===void 0)return;const D=A.source,F=m.get(D);if(F){const G=F[_.__cacheKey];G.usedTimes--,G.usedTimes===0&&I(A),Object.keys(F).length===0&&m.delete(D)}i.remove(A)}function I(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const D=A.source,F=m.get(D);delete F[_.__cacheKey],o.memory.textures--}function P(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(_.__webglFramebuffer[F]))for(let G=0;G<_.__webglFramebuffer[F].length;G++)n.deleteFramebuffer(_.__webglFramebuffer[F][G]);else n.deleteFramebuffer(_.__webglFramebuffer[F]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[F])}else{if(Array.isArray(_.__webglFramebuffer))for(let F=0;F<_.__webglFramebuffer.length;F++)n.deleteFramebuffer(_.__webglFramebuffer[F]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let F=0;F<_.__webglColorRenderbuffer.length;F++)_.__webglColorRenderbuffer[F]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[F]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=A.textures;for(let F=0,G=D.length;F<G;F++){const Z=i.get(D[F]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(D[F])}i.remove(A)}let L=0;function z(){L=0}function O(){return L}function $(A){L=A}function k(){const A=L;return A>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),L+=1,A}function U(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function K(A,_){const D=i.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&D.__version!==A.version){const F=A.image;if(F===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(D,A,_);return}}else A.isExternalTexture&&(D.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function ie(A,_){const D=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&D.__version!==A.version){Me(D,A,_);return}else A.isExternalTexture&&(D.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function pe(A,_){const D=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&D.__version!==A.version){Me(D,A,_);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function he(A,_){const D=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&D.__version!==A.version){Le(D,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}const me={[Ya]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[Ka]:n.MIRRORED_REPEAT},Pe={[Nt]:n.NEAREST,[rm]:n.NEAREST_MIPMAP_NEAREST,[Ss]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Hr]:n.LINEAR_MIPMAP_NEAREST,[ai]:n.LINEAR_MIPMAP_LINEAR},ge={[cm]:n.NEVER,[fm]:n.ALWAYS,[lm]:n.LESS,[Zo]:n.LEQUAL,[dm]:n.EQUAL,[Jo]:n.GEQUAL,[um]:n.GREATER,[hm]:n.NOTEQUAL};function Be(A,_){if(_.type===un&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===Hr||_.magFilter===Ss||_.magFilter===ai||_.minFilter===Dt||_.minFilter===Hr||_.minFilter===Ss||_.minFilter===ai)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,me[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,me[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,me[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,Pe[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,Pe[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Nt||_.minFilter!==Ss&&_.minFilter!==ai||_.type===un&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function re(A,_){let D=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",R));const F=_.source;let G=m.get(F);G===void 0&&(G={},m.set(F,G));const Z=U(_);if(Z!==A.__cacheKey){G[Z]===void 0&&(G[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,D=!0),G[Z].usedTimes++;const H=G[A.__cacheKey];H!==void 0&&(G[A.__cacheKey].usedTimes--,H.usedTimes===0&&I(_)),A.__cacheKey=Z,A.__webglTexture=G[Z].texture}return D}function X(A,_,D){return Math.floor(Math.floor(A/D)/_)}function Q(A,_,D,F){const Z=A.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,D,F,_.data);else{Z.sort((ue,le)=>ue.start-le.start);let H=0;for(let ue=1;ue<Z.length;ue++){const le=Z[H],ce=Z[ue],ve=le.start+le.count,Se=X(ce.start,_.width,4),De=X(le.start,_.width,4);ce.start<=ve+1&&Se===De&&X(ce.start+ce.count-1,_.width,4)===Se?le.count=Math.max(le.count,ce.start+ce.count-le.start):(++H,Z[H]=ce)}Z.length=H+1;const B=t.getParameter(n.UNPACK_ROW_LENGTH),V=t.getParameter(n.UNPACK_SKIP_PIXELS),se=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ue=0,le=Z.length;ue<le;ue++){const ce=Z[ue],ve=Math.floor(ce.start/4),Se=Math.ceil(ce.count/4),De=ve%_.width,W=Math.floor(ve/_.width),_e=Se,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,De,W,_e,de,D,F,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,B),t.pixelStorei(n.UNPACK_SKIP_PIXELS,V),t.pixelStorei(n.UNPACK_SKIP_ROWS,se)}}function Me(A,_,D){let F=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(F=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(F=n.TEXTURE_3D);const G=re(A,_),Z=_.source;t.bindTexture(F,A.__webglTexture,n.TEXTURE0+D);const H=i.get(Z);if(Z.version!==H.__version||G===!0){if(t.activeTexture(n.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const de=Ye.getPrimaries(Ye.workingColorSpace),xe=_.colorSpace===Hn?null:Ye.getPrimaries(_.colorSpace),Ee=_.colorSpace===Hn||de===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let V=x(_.image,!1,s.maxTextureSize);V=ae(_,V);const se=r.convert(_.format,_.colorSpace),ue=r.convert(_.type);let le=b(_.internalFormat,se,ue,_.normalized,_.colorSpace,_.isVideoTexture);Be(F,_);let ce;const ve=_.mipmaps,Se=_.isVideoTexture!==!0,De=H.__version===void 0||G===!0,W=Z.dataReady,_e=w(_,V);if(_.isDepthTexture)le=T(_.format===oi,_.type),De&&(Se?t.texStorage2D(n.TEXTURE_2D,1,le,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,le,V.width,V.height,0,se,ue,null));else if(_.isDataTexture)if(ve.length>0){Se&&De&&t.texStorage2D(n.TEXTURE_2D,_e,le,ve[0].width,ve[0].height);for(let de=0,xe=ve.length;de<xe;de++)ce=ve[de],Se?W&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,se,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,se,ue,ce.data);_.generateMipmaps=!1}else Se?(De&&t.texStorage2D(n.TEXTURE_2D,_e,le,V.width,V.height),W&&Q(_,V,se,ue)):t.texImage2D(n.TEXTURE_2D,0,le,V.width,V.height,0,se,ue,V.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Se&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,le,ve[0].width,ve[0].height,V.depth);for(let de=0,xe=ve.length;de<xe;de++)if(ce=ve[de],_.format!==nn)if(se!==null)if(Se){if(W)if(_.layerUpdates.size>0){const Ee=xl(ce.width,ce.height,_.format,_.type);for(const fe of _.layerUpdates){const Ie=ce.data.subarray(fe*Ee/ce.data.BYTES_PER_ELEMENT,(fe+1)*Ee/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,fe,ce.width,ce.height,1,se,Ie)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,V.depth,se,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,V.depth,0,ce.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,V.depth,se,ue,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,V.depth,0,se,ue,ce.data)}else{Se&&De&&t.texStorage2D(n.TEXTURE_2D,_e,le,ve[0].width,ve[0].height);for(let de=0,xe=ve.length;de<xe;de++)ce=ve[de],_.format!==nn?se!==null?Se?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,se,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?W&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,se,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,se,ue,ce.data)}else if(_.isDataArrayTexture)if(Se){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,le,V.width,V.height,V.depth),W)if(_.layerUpdates.size>0){const de=xl(V.width,V.height,_.format,_.type);for(const xe of _.layerUpdates){const Ee=V.data.subarray(xe*de/V.data.BYTES_PER_ELEMENT,(xe+1)*de/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,V.width,V.height,1,se,ue,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,se,ue,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,V.width,V.height,V.depth,0,se,ue,V.data);else if(_.isData3DTexture)Se?(De&&t.texStorage3D(n.TEXTURE_3D,_e,le,V.width,V.height,V.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,se,ue,V.data)):t.texImage3D(n.TEXTURE_3D,0,le,V.width,V.height,V.depth,0,se,ue,V.data);else if(_.isFramebufferTexture){if(De)if(Se)t.texStorage2D(n.TEXTURE_2D,_e,le,V.width,V.height);else{let de=V.width,xe=V.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,le,de,xe,0,se,ue,null),de>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),V.parentNode!==de){de.appendChild(V),f.add(_),de.onpaint=xe=>{const Ee=xe.changedElements;for(const fe of f)Ee.includes(fe.image)&&(fe.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,V);else{const Ee=n.RGBA,fe=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,fe,Ie,V)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Se&&De){const de=oe(ve[0]);t.texStorage2D(n.TEXTURE_2D,_e,le,de.width,de.height)}for(let de=0,xe=ve.length;de<xe;de++)ce=ve[de],Se?W&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,se,ue,ce):t.texImage2D(n.TEXTURE_2D,de,le,se,ue,ce);_.generateMipmaps=!1}else if(Se){if(De){const de=oe(V);t.texStorage2D(n.TEXTURE_2D,_e,le,de.width,de.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se,ue,V)}else t.texImage2D(n.TEXTURE_2D,0,le,se,ue,V);p(_)&&M(F),H.__version=Z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Le(A,_,D){if(_.image.length!==6)return;const F=re(A,_),G=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+D);const Z=i.get(G);if(G.version!==Z.__version||F===!0){t.activeTexture(n.TEXTURE0+D);const H=Ye.getPrimaries(Ye.workingColorSpace),B=_.colorSpace===Hn?null:Ye.getPrimaries(_.colorSpace),V=_.colorSpace===Hn||H===B?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const se=_.isCompressedTexture||_.image[0].isCompressedTexture,ue=_.image[0]&&_.image[0].isDataTexture,le=[];for(let fe=0;fe<6;fe++)!se&&!ue?le[fe]=x(_.image[fe],!0,s.maxCubemapSize):le[fe]=ue?_.image[fe].image:_.image[fe],le[fe]=ae(_,le[fe]);const ce=le[0],ve=r.convert(_.format,_.colorSpace),Se=r.convert(_.type),De=b(_.internalFormat,ve,Se,_.normalized,_.colorSpace),W=_.isVideoTexture!==!0,_e=Z.__version===void 0||F===!0,de=G.dataReady;let xe=w(_,ce);Be(n.TEXTURE_CUBE_MAP,_);let Ee;if(se){W&&_e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,De,ce.width,ce.height);for(let fe=0;fe<6;fe++){Ee=le[fe].mipmaps;for(let Ie=0;Ie<Ee.length;Ie++){const Re=Ee[Ie];_.format!==nn?ve!==null?W?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,0,0,Re.width,Re.height,ve,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,De,Re.width,Re.height,0,Re.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,0,0,Re.width,Re.height,ve,Se,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,De,Re.width,Re.height,0,ve,Se,Re.data)}}}else{if(Ee=_.mipmaps,W&&_e){Ee.length>0&&xe++;const fe=oe(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,De,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ue){W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,le[fe].width,le[fe].height,ve,Se,le[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,De,le[fe].width,le[fe].height,0,ve,Se,le[fe].data);for(let Ie=0;Ie<Ee.length;Ie++){const gt=Ee[Ie].image[fe].image;W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,0,0,gt.width,gt.height,ve,Se,gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,De,gt.width,gt.height,0,ve,Se,gt.data)}}else{W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,ve,Se,le[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,De,ve,Se,le[fe]);for(let Ie=0;Ie<Ee.length;Ie++){const Re=Ee[Ie];W?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,0,0,ve,Se,Re.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,De,ve,Se,Re.image[fe])}}}p(_)&&M(n.TEXTURE_CUBE_MAP),Z.__version=G.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Ce(A,_,D,F,G,Z){const H=r.convert(D.format,D.colorSpace),B=r.convert(D.type),V=b(D.internalFormat,H,B,D.normalized,D.colorSpace),se=i.get(_),ue=i.get(D);if(ue.__renderTarget=_,!se.__hasExternalTextures){const le=Math.max(1,_.width>>Z),ce=Math.max(1,_.height>>Z);G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?t.texImage3D(G,Z,V,le,ce,_.depth,0,H,B,null):t.texImage2D(G,Z,V,le,ce,0,H,B,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Y(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,G,ue.__webglTexture,0,ot(_)):(G===n.TEXTURE_2D||G>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&G<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,F,G,ue.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(A,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const F=_.depthTexture,G=F&&F.isDepthTexture?F.type:null,Z=T(_.stencilBuffer,G),H=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Y(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),Z,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,A)}else{const F=_.textures;for(let G=0;G<F.length;G++){const Z=F[G],H=r.convert(Z.format,Z.colorSpace),B=r.convert(Z.type),V=b(Z.internalFormat,H,B,Z.normalized,Z.colorSpace);Y(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),V,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),V,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,V,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ge(A,_,D){const F=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const G=i.get(_.depthTexture);if(G.__renderTarget=_,(!G.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),F){if(G.__webglInit===void 0&&(G.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),G.__webglTexture===void 0){G.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Be(n.TEXTURE_CUBE_MAP,_.depthTexture);const se=r.convert(_.depthTexture.format),ue=r.convert(_.depthTexture.type);let le;_.depthTexture.format===Pn?le=n.DEPTH_COMPONENT24:_.depthTexture.format===oi&&(le=n.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,le,_.width,_.height,0,se,ue,null)}}else K(_.depthTexture,0);const Z=G.__webglTexture,H=ot(_),B=F?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,V=_.depthTexture.format===oi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Pn)Y(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,B,Z,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,V,B,Z,0);else if(_.depthTexture.format===oi)Y(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,B,Z,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,V,B,Z,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(A){const _=i.get(A),D=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const F=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),F){const G=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,F.removeEventListener("dispose",G)};F.addEventListener("dispose",G),_.__depthDisposeCallback=G}_.__boundDepthTexture=F}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let F=0;F<6;F++)Ge(_.__webglFramebuffer[F],A,F);else{const F=A.texture.mipmaps;F&&F.length>0?Ge(_.__webglFramebuffer[0],A,0):Ge(_.__webglFramebuffer,A,0)}else if(D){_.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[F]),_.__webglDepthbuffer[F]===void 0)_.__webglDepthbuffer[F]=n.createRenderbuffer(),qe(_.__webglDepthbuffer[F],A,!1);else{const G=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer[F];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,Z)}}else{const F=A.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),qe(_.__webglDepthbuffer,A,!1);else{const G=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(A,_,D){const F=i.get(A);_!==void 0&&Ce(F.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Je(A)}function Ve(A){const _=A.texture,D=i.get(A),F=i.get(_);A.addEventListener("dispose",v);const G=A.textures,Z=A.isWebGLCubeRenderTarget===!0,H=G.length>1;if(H||(F.__webglTexture===void 0&&(F.__webglTexture=n.createTexture()),F.__version=_.version,o.memory.textures++),Z){D.__webglFramebuffer=[];for(let B=0;B<6;B++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[B]=[];for(let V=0;V<_.mipmaps.length;V++)D.__webglFramebuffer[B][V]=n.createFramebuffer()}else D.__webglFramebuffer[B]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let B=0;B<_.mipmaps.length;B++)D.__webglFramebuffer[B]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(H)for(let B=0,V=G.length;B<V;B++){const se=i.get(G[B]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Y(A)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let B=0;B<G.length;B++){const V=G[B];D.__webglColorRenderbuffer[B]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[B]);const se=r.convert(V.format,V.colorSpace),ue=r.convert(V.type),le=b(V.internalFormat,se,ue,V.normalized,V.colorSpace,A.isXRRenderTarget===!0),ce=ot(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,le,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+B,n.RENDERBUFFER,D.__webglColorRenderbuffer[B])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),qe(D.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture),Be(n.TEXTURE_CUBE_MAP,_);for(let B=0;B<6;B++)if(_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ce(D.__webglFramebuffer[B][V],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+B,V);else Ce(D.__webglFramebuffer[B],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+B,0);p(_)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(H){for(let B=0,V=G.length;B<V;B++){const se=G[B],ue=i.get(se);let le=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(le=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),Be(le,se),Ce(D.__webglFramebuffer,A,se,n.COLOR_ATTACHMENT0+B,le,0),p(se)&&M(le)}t.unbindTexture()}else{let B=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(B=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(B,F.__webglTexture),Be(B,_),_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ce(D.__webglFramebuffer[V],A,_,n.COLOR_ATTACHMENT0,B,V);else Ce(D.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,B,0);p(_)&&M(B),t.unbindTexture()}A.depthBuffer&&Je(A)}function dt(A){const _=A.textures;for(let D=0,F=_.length;D<F;D++){const G=_[D];if(p(G)){const Z=S(A),H=i.get(G).__webglTexture;t.bindTexture(Z,H),M(Z),t.unbindTexture()}}}const ht=[],mt=[];function Mt(A){if(A.samples>0){if(Y(A)===!1){const _=A.textures,D=A.width,F=A.height;let G=n.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=i.get(A),B=_.length>1;if(B)for(let se=0;se<_.length;se++)t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,H.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,H.__webglMultisampledFramebuffer);const V=A.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglFramebuffer);for(let se=0;se<_.length;se++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(G|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(G|=n.STENCIL_BUFFER_BIT)),B){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,H.__webglColorRenderbuffer[se]);const ue=i.get(_[se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,D,F,0,0,D,F,G,n.NEAREST),l===!0&&(ht.length=0,mt.length=0,ht.push(n.COLOR_ATTACHMENT0+se),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ht.push(Z),mt.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,mt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),B)for(let se=0;se<_.length;se++){t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,H.__webglColorRenderbuffer[se]);const ue=i.get(_[se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,H.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ot(A){return Math.min(s.maxSamples,A.samples)}function Y(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(A){const _=o.render.frame;d.get(A)!==_&&(d.set(A,_),A.update())}function ae(A,_){const D=A.colorSpace,F=A.format,G=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||D!==ur&&D!==Hn&&(Ye.getTransfer(D)===it?(F!==nn||G!==$t)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",D)),_}function oe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(u.width=A.naturalWidth||A.width,u.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(u.width=A.displayWidth,u.height=A.displayHeight):(u.width=A.width,u.height=A.height),u}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.getTextureUnits=O,this.setTextureUnits=$,this.setTexture2D=K,this.setTexture2DArray=ie,this.setTexture3D=pe,this.setTextureCube=he,this.rebindTextures=$e,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Y,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Bv(n,e){function t(i,s=Hn){let r;const o=Ye.getTransfer(s);if(i===$t)return n.UNSIGNED_BYTE;if(i===$o)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Xo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===qd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Yd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$d)return n.BYTE;if(i===Xd)return n.SHORT;if(i===us)return n.UNSIGNED_SHORT;if(i===Wo)return n.INT;if(i===gn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===Nn)return n.HALF_FLOAT;if(i===Kd)return n.ALPHA;if(i===Zd)return n.RGB;if(i===nn)return n.RGBA;if(i===Pn)return n.DEPTH_COMPONENT;if(i===oi)return n.DEPTH_STENCIL;if(i===Jd)return n.RED;if(i===qo)return n.RED_INTEGER;if(i===fi)return n.RG;if(i===Yo)return n.RG_INTEGER;if(i===Ko)return n.RGBA_INTEGER;if(i===tr||i===nr||i===ir||i===sr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===tr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===tr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Za||i===Ja||i===Qa||i===eo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===to||i===no||i===io||i===so||i===ro||i===lr||i===ao)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===to||i===no)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===io)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===so)return r.COMPRESSED_R11_EAC;if(i===ro)return r.COMPRESSED_SIGNED_R11_EAC;if(i===lr)return r.COMPRESSED_RG11_EAC;if(i===ao)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===oo||i===co||i===lo||i===uo||i===ho||i===fo||i===po||i===mo||i===go||i===xo||i===_o||i===vo||i===Mo||i===yo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===oo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===co)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===lo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===uo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ho)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===po)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===go)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_o)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===yo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bo||i===So||i===wo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===bo)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===So)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Eo||i===To||i===dr||i===Ao)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Eo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===To)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const kv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zv=`
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

}`;class Gv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new lu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new xn({vertexShader:kv,fragmentShader:zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new Xi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hv extends mi{constructor(e,t){super();const i=this;let s=null,r=1,o=null,c="local-floor",l=1,u=null,d=null,f=null,h=null,m=null,g=null;const y=typeof XRWebGLBinding<"u",x=new Gv,p={},M=t.getContextAttributes();let S=null,b=null;const T=[],w=[],R=new Ze;let v=null;const E=new Gt;E.viewport=new ft;const I=new Gt;I.viewport=new ft;const P=[E,I],L=new Jm;let z=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let X=T[re];return X===void 0&&(X=new Kr,T[re]=X),X.getTargetRaySpace()},this.getControllerGrip=function(re){let X=T[re];return X===void 0&&(X=new Kr,T[re]=X),X.getGripSpace()},this.getHand=function(re){let X=T[re];return X===void 0&&(X=new Kr,T[re]=X),X.getHandSpace()};function $(re){const X=w.indexOf(re.inputSource);if(X===-1)return;const Q=T[X];Q!==void 0&&(Q.update(re.inputSource,re.frame,u||o),Q.dispatchEvent({type:re.type,data:re.inputSource}))}function k(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",U);for(let re=0;re<T.length;re++){const X=w[re];X!==null&&(w[re]=null,T[re].disconnect(X))}z=null,O=null,x.reset();for(const re in p)delete p[re];e.setRenderTarget(S),m=null,h=null,f=null,s=null,b=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){c=re,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(re){u=re},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",k),s.addEventListener("inputsourceschange",U),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Q=null,Me=null,Le=null;M.depth&&(Le=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=M.stencil?oi:Pn,Me=M.stencil?hs:gn);const Ce={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ce),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new pn(h.textureWidth,h.textureHeight,{format:nn,type:$t,depthTexture:new Hi(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Q={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new pn(m.framebufferWidth,m.framebufferHeight,{format:nn,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await s.requestReferenceSpace(c),Be.setContext(s),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function U(re){for(let X=0;X<re.removed.length;X++){const Q=re.removed[X],Me=w.indexOf(Q);Me>=0&&(w[Me]=null,T[Me].disconnect(Q))}for(let X=0;X<re.added.length;X++){const Q=re.added[X];let Me=w.indexOf(Q);if(Me===-1){for(let Ce=0;Ce<T.length;Ce++)if(Ce>=w.length){w.push(Q),Me=Ce;break}else if(w[Ce]===null){w[Ce]=Q,Me=Ce;break}if(Me===-1)break}const Le=T[Me];Le&&Le.connect(Q)}}const K=new J,ie=new J;function pe(re,X,Q){K.setFromMatrixPosition(X.matrixWorld),ie.setFromMatrixPosition(Q.matrixWorld);const Me=K.distanceTo(ie),Le=X.projectionMatrix.elements,Ce=Q.projectionMatrix.elements,qe=Le[14]/(Le[10]-1),Ge=Le[14]/(Le[10]+1),Je=(Le[9]+1)/Le[5],$e=(Le[9]-1)/Le[5],Ve=(Le[8]-1)/Le[0],dt=(Ce[8]+1)/Ce[0],ht=qe*Ve,mt=qe*dt,Mt=Me/(-Ve+dt),ot=Mt*-Ve;if(X.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(ot),re.translateZ(Mt),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Le[10]===-1)re.projectionMatrix.copy(X.projectionMatrix),re.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const Y=qe+Mt,N=Ge+Mt,ae=ht-ot,oe=mt+(Me-ot),A=Je*Ge/N*Y,_=$e*Ge/N*Y;re.projectionMatrix.makePerspective(ae,oe,A,_,Y,N),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function he(re,X){X===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(X.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let X=re.near,Q=re.far;x.texture!==null&&(x.depthNear>0&&(X=x.depthNear),x.depthFar>0&&(Q=x.depthFar)),L.near=I.near=E.near=X,L.far=I.far=E.far=Q,(z!==L.near||O!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),z=L.near,O=L.far),L.layers.mask=re.layers.mask|6,E.layers.mask=L.layers.mask&-5,I.layers.mask=L.layers.mask&-3;const Me=re.parent,Le=L.cameras;he(L,Me);for(let Ce=0;Ce<Le.length;Ce++)he(Le[Ce],Me);Le.length===2?pe(L,E,I):L.projectionMatrix.copy(E.projectionMatrix),me(re,L,Me)};function me(re,X,Q){Q===null?re.matrix.copy(X.matrixWorld):(re.matrix.copy(Q.matrixWorld),re.matrix.invert(),re.matrix.multiply(X.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(X.projectionMatrix),re.projectionMatrixInverse.copy(X.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Ro*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(re){l=re,h!==null&&(h.fixedFoveation=re),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=re)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(L)},this.getCameraTexture=function(re){return p[re]};let Pe=null;function ge(re,X){if(d=X.getViewerPose(u||o),g=X,d!==null){const Q=d.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let Me=!1;Q.length!==L.cameras.length&&(L.cameras.length=0,Me=!0);for(let Ge=0;Ge<Q.length;Ge++){const Je=Q[Ge];let $e=null;if(m!==null)$e=m.getViewport(Je);else{const dt=f.getViewSubImage(h,Je);$e=dt.viewport,Ge===0&&(e.setRenderTargetTextures(b,dt.colorTexture,dt.depthStencilTexture),e.setRenderTarget(b))}let Ve=P[Ge];Ve===void 0&&(Ve=new Gt,Ve.layers.enable(Ge),Ve.viewport=new ft,P[Ge]=Ve),Ve.matrix.fromArray(Je.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Je.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set($e.x,$e.y,$e.width,$e.height),Ge===0&&(L.matrix.copy(Ve.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Me===!0&&L.cameras.push(Ve)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=i.getBinding();const Ge=f.getDepthInformation(Q[0]);Ge&&Ge.isValid&&Ge.texture&&x.init(Ge,s.renderState)}if(Le&&Le.includes("camera-access")&&y){e.state.unbindTexture(),f=i.getBinding();for(let Ge=0;Ge<Q.length;Ge++){const Je=Q[Ge].camera;if(Je){let $e=p[Je];$e||($e=new lu,p[Je]=$e);const Ve=f.getCameraImage(Je);$e.sourceTexture=Ve}}}}for(let Q=0;Q<T.length;Q++){const Me=w[Q],Le=T[Q];Me!==null&&Le!==void 0&&Le.update(Me,X,u||o)}Pe&&Pe(re,X),X.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:X}),g=null}const Be=new mu;Be.setAnimationLoop(ge),this.setAnimationLoop=function(re){Pe=re},this.dispose=function(){}}}const jv=new pt,bu=new ke;bu.set(-1,0,0,0,1,0,0,0,1);function Vv(n,e){function t(x,p){x.matrixAutoUpdate===!0&&x.updateMatrix(),p.value.copy(x.matrix)}function i(x,p){p.color.getRGB(x.fogColor.value,du(n)),p.isFog?(x.fogNear.value=p.near,x.fogFar.value=p.far):p.isFogExp2&&(x.fogDensity.value=p.density)}function s(x,p,M,S,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(x,p):p.isMeshLambertMaterial?(r(x,p),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(x,p),f(x,p)):p.isMeshPhongMaterial?(r(x,p),d(x,p),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(x,p),h(x,p),p.isMeshPhysicalMaterial&&m(x,p,b)):p.isMeshMatcapMaterial?(r(x,p),g(x,p)):p.isMeshDepthMaterial?r(x,p):p.isMeshDistanceMaterial?(r(x,p),y(x,p)):p.isMeshNormalMaterial?r(x,p):p.isLineBasicMaterial?(o(x,p),p.isLineDashedMaterial&&c(x,p)):p.isPointsMaterial?l(x,p,M,S):p.isSpriteMaterial?u(x,p):p.isShadowMaterial?(x.color.value.copy(p.color),x.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(x,p){x.opacity.value=p.opacity,p.color&&x.diffuse.value.copy(p.color),p.emissive&&x.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(x.map.value=p.map,t(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,t(p.alphaMap,x.alphaMapTransform)),p.bumpMap&&(x.bumpMap.value=p.bumpMap,t(p.bumpMap,x.bumpMapTransform),x.bumpScale.value=p.bumpScale,p.side===Ht&&(x.bumpScale.value*=-1)),p.normalMap&&(x.normalMap.value=p.normalMap,t(p.normalMap,x.normalMapTransform),x.normalScale.value.copy(p.normalScale),p.side===Ht&&x.normalScale.value.negate()),p.displacementMap&&(x.displacementMap.value=p.displacementMap,t(p.displacementMap,x.displacementMapTransform),x.displacementScale.value=p.displacementScale,x.displacementBias.value=p.displacementBias),p.emissiveMap&&(x.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,x.emissiveMapTransform)),p.specularMap&&(x.specularMap.value=p.specularMap,t(p.specularMap,x.specularMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);const M=e.get(p),S=M.envMap,b=M.envMapRotation;S&&(x.envMap.value=S,x.envMapRotation.value.setFromMatrix4(jv.makeRotationFromEuler(b)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(bu),x.reflectivity.value=p.reflectivity,x.ior.value=p.ior,x.refractionRatio.value=p.refractionRatio),p.lightMap&&(x.lightMap.value=p.lightMap,x.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,x.lightMapTransform)),p.aoMap&&(x.aoMap.value=p.aoMap,x.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,x.aoMapTransform))}function o(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,p.map&&(x.map.value=p.map,t(p.map,x.mapTransform))}function c(x,p){x.dashSize.value=p.dashSize,x.totalSize.value=p.dashSize+p.gapSize,x.scale.value=p.scale}function l(x,p,M,S){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.size.value=p.size*M,x.scale.value=S*.5,p.map&&(x.map.value=p.map,t(p.map,x.uvTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,t(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function u(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.rotation.value=p.rotation,p.map&&(x.map.value=p.map,t(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,t(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function d(x,p){x.specular.value.copy(p.specular),x.shininess.value=Math.max(p.shininess,1e-4)}function f(x,p){p.gradientMap&&(x.gradientMap.value=p.gradientMap)}function h(x,p){x.metalness.value=p.metalness,p.metalnessMap&&(x.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,x.metalnessMapTransform)),x.roughness.value=p.roughness,p.roughnessMap&&(x.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,x.roughnessMapTransform)),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)}function m(x,p,M){x.ior.value=p.ior,p.sheen>0&&(x.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),x.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(x.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,x.sheenColorMapTransform)),p.sheenRoughnessMap&&(x.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,x.sheenRoughnessMapTransform))),p.clearcoat>0&&(x.clearcoat.value=p.clearcoat,x.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(x.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,x.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(x.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&x.clearcoatNormalScale.value.negate())),p.dispersion>0&&(x.dispersion.value=p.dispersion),p.iridescence>0&&(x.iridescence.value=p.iridescence,x.iridescenceIOR.value=p.iridescenceIOR,x.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(x.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,x.iridescenceMapTransform)),p.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),p.transmission>0&&(x.transmission.value=p.transmission,x.transmissionSamplerMap.value=M.texture,x.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(x.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,x.transmissionMapTransform)),x.thickness.value=p.thickness,p.thicknessMap&&(x.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=p.attenuationDistance,x.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(x.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(x.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=p.specularIntensity,x.specularColor.value.copy(p.specularColor),p.specularColorMap&&(x.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,x.specularColorMapTransform)),p.specularIntensityMap&&(x.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,p){p.matcap&&(x.matcap.value=p.matcap)}function y(x,p){const M=e.get(p).light;x.referencePosition.value.setFromMatrixPosition(M.matrixWorld),x.nearDistance.value=M.shadow.camera.near,x.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Wv(n,e,t,i){let s={},r={},o=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,T){const w=T.program;i.uniformBlockBinding(b,w)}function u(b,T){let w=s[b.id];w===void 0&&(x(b),w=d(b),s[b.id]=w,b.addEventListener("dispose",M));const R=T.program;i.updateUBOMapping(b,R);const v=e.render.frame;r[b.id]!==v&&(h(b),r[b.id]=v)}function d(b){const T=f();b.__bindingPointIndex=T;const w=n.createBuffer(),R=b.__size,v=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,w),w}function f(){for(let b=0;b<c;b++)if(o.indexOf(b)===-1)return o.push(b),b;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const T=s[b.id],w=b.uniforms,R=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let v=0,E=w.length;v<E;v++){const I=w[v];if(Array.isArray(I))for(let P=0,L=I.length;P<L;P++)m(I[P],v,P,R);else m(I,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,T,w,R){if(y(b,T,w,R)===!0){const v=b.__offset,E=b.value;if(Array.isArray(E)){let I=0;for(let P=0;P<E.length;P++){const L=E[P],z=p(L);g(L,b.__data,I),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(I+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,b.__data)}}function g(b,T,w){typeof b=="number"||typeof b=="boolean"?T[0]=b:b.isMatrix3?(T[0]=b.elements[0],T[1]=b.elements[1],T[2]=b.elements[2],T[3]=0,T[4]=b.elements[3],T[5]=b.elements[4],T[6]=b.elements[5],T[7]=0,T[8]=b.elements[6],T[9]=b.elements[7],T[10]=b.elements[8],T[11]=0):ArrayBuffer.isView(b)?T.set(new b.constructor(b.buffer,b.byteOffset,T.length)):b.toArray(T,w)}function y(b,T,w,R){const v=b.value,E=T+"_"+w;if(R[E]===void 0)return typeof v=="number"||typeof v=="boolean"?R[E]=v:ArrayBuffer.isView(v)?R[E]=v.slice():R[E]=v.clone(),!0;{const I=R[E];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return R[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function x(b){const T=b.uniforms;let w=0;const R=16;for(let E=0,I=T.length;E<I;E++){const P=Array.isArray(T[E])?T[E]:[T[E]];for(let L=0,z=P.length;L<z;L++){const O=P[L],$=Array.isArray(O.value)?O.value:[O.value];for(let k=0,U=$.length;k<U;k++){const K=$[k],ie=p(K),pe=w%R,he=pe%ie.boundary,me=pe+he;w+=he,me!==0&&R-me<ie.storage&&(w+=R-me),O.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=w,w+=ie.storage}}}const v=w%R;return v>0&&(w+=R-v),b.__size=w,b.__cache={},this}function p(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(T.boundary=16,T.storage=b.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",b),T}function M(b){const T=b.target;T.removeEventListener("dispose",M);const w=o.indexOf(T.__bindingPointIndex);o.splice(w,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function S(){for(const b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:u,dispose:S}}const $v=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let cn=null;function Xv(){return cn===null&&(cn=new Om($v,16,16,fi,Nn),cn.name="DFG_LUT",cn.minFilter=Dt,cn.magFilter=Dt,cn.wrapS=wn,cn.wrapT=wn,cn.generateMipmaps=!1,cn.needsUpdate=!0),cn}class Su{constructor(e={}){const{canvas:t=mm(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=$t}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const y=m,x=new Set([Ko,Yo,qo]),p=new Set([$t,gn,us,hs,$o,Xo]),M=new Uint32Array(4),S=new Int32Array(4),b=new J;let T=null,w=null;const R=[],v=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let P=!1,L=null,z=null,O=null,$=null;this._outputColorSpace=Yt;let k=0,U=0,K=null,ie=-1,pe=null;const he=new ft,me=new ft;let Pe=null;const ge=new Xe(0);let Be=0,re=t.width,X=t.height,Q=1,Me=null,Le=null;const Ce=new ft(0,0,re,X),qe=new ft(0,0,re,X);let Ge=!1;const Je=new ec;let $e=!1,Ve=!1;const dt=new pt,ht=new J,mt=new ft,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function Y(){return K===null?Q:1}let N=i;function ae(C,q){return t.getContext(C,q)}try{const C={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vo}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",sn,!1),N===null){const q="webgl2";if(N=ae(q,C),N===null)throw ae(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw et("WebGLRenderer: "+C.message),C}let oe,A,_,D,F,G,Z,H,B,V,se,ue,le,ce,ve,Se,De,W,_e,de,xe,Ee,fe;function Ie(){oe=new Xx(N),oe.init(),xe=new Bv(N,oe),A=new kx(N,oe,e,xe),_=new Fv(N,oe),A.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),z=N.createFramebuffer(),O=N.createFramebuffer(),$=N.createFramebuffer(),D=new Kx(N),F=new bv,G=new Ov(N,oe,_,F,A,xe,D),Z=new $x(I),H=new e0(N),Ee=new Ox(N,H),B=new qx(N,H,D,Ee),V=new Jx(N,B,H,Ee,D),W=new Zx(N,A,G),ve=new zx(F),se=new yv(I,Z,oe,A,Ee,ve),ue=new Vv(I,F),le=new wv,ce=new Nv(oe),De=new Fx(I,Z,_,V,g,l),Se=new Uv(I,V,A),fe=new Wv(N,D,A,_),_e=new Bx(N,oe,D),de=new Yx(N,oe,D),D.programs=se.programs,I.capabilities=A,I.extensions=oe,I.properties=F,I.renderLists=le,I.shadowMap=Se,I.state=_,I.info=D}Ie(),y!==$t&&(E=new e_(y,t.width,t.height,c,s,r));const Re=new Hv(I,N);this.xr=Re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const C=oe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=oe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(C){C!==void 0&&(Q=C,this.setSize(re,X,!1))},this.getSize=function(C){return C.set(re,X)},this.setSize=function(C,q,ne=!0){if(Re.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}re=C,X=q,t.width=Math.floor(C*Q),t.height=Math.floor(q*Q),ne===!0&&(t.style.width=C+"px",t.style.height=q+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,C,q)},this.getDrawingBufferSize=function(C){return C.set(re*Q,X*Q).floor()},this.setDrawingBufferSize=function(C,q,ne){re=C,X=q,Q=ne,t.width=Math.floor(C*ne),t.height=Math.floor(q*ne),this.setViewport(0,0,C,q)},this.setEffects=function(C){if(y===$t){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let q=0;q<C.length;q++)if(C[q].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(he)},this.getViewport=function(C){return C.copy(Ce)},this.setViewport=function(C,q,ne,ee){C.isVector4?Ce.set(C.x,C.y,C.z,C.w):Ce.set(C,q,ne,ee),_.viewport(he.copy(Ce).multiplyScalar(Q).round())},this.getScissor=function(C){return C.copy(qe)},this.setScissor=function(C,q,ne,ee){C.isVector4?qe.set(C.x,C.y,C.z,C.w):qe.set(C,q,ne,ee),_.scissor(me.copy(qe).multiplyScalar(Q).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(C){_.setScissorTest(Ge=C)},this.setOpaqueSort=function(C){Me=C},this.setTransparentSort=function(C){Le=C},this.getClearColor=function(C){return C.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(C=!0,q=!0,ne=!0){let ee=0;if(C){let te=!1;if(K!==null){const we=K.texture.format;te=x.has(we)}if(te){const we=K.texture.type,Ae=p.has(we),be=De.getClearColor(),Ne=De.getClearAlpha(),Ue=be.r,ze=be.g,We=be.b;Ae?(M[0]=Ue,M[1]=ze,M[2]=We,M[3]=Ne,N.clearBufferuiv(N.COLOR,0,M)):(S[0]=Ue,S[1]=ze,S[2]=We,S[3]=Ne,N.clearBufferiv(N.COLOR,0,S))}else ee|=N.COLOR_BUFFER_BIT}q&&(ee|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(ee|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&N.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),L=C},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),De.dispose(),le.dispose(),ce.dispose(),F.dispose(),Z.dispose(),V.dispose(),Ee.dispose(),fe.dispose(),se.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",mc),Re.removeEventListener("sessionend",gc),Xn.stop()};function gt(C){C.preventDefault(),qc("WebGLRenderer: Context Lost."),P=!0}function ct(){qc("WebGLRenderer: Context Restored."),P=!1;const C=D.autoReset,q=Se.enabled,ne=Se.autoUpdate,ee=Se.needsUpdate,te=Se.type;Ie(),D.autoReset=C,Se.enabled=q,Se.autoUpdate=ne,Se.needsUpdate=ee,Se.type=te}function sn(C){et("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function rn(C){const q=C.target;q.removeEventListener("dispose",rn),ju(q)}function ju(C){Vu(C),F.remove(C)}function Vu(C){const q=F.get(C).programs;q!==void 0&&(q.forEach(function(ne){se.releaseProgram(ne)}),C.isShaderMaterial&&se.releaseShaderCache(C))}this.renderBufferDirect=function(C,q,ne,ee,te,we){q===null&&(q=Mt);const Ae=te.isMesh&&te.matrixWorld.determinantAffine()<0,be=Xu(C,q,ne,ee,te);_.setMaterial(ee,Ae);let Ne=ne.index,Ue=1;if(ee.wireframe===!0){if(Ne=B.getWireframeAttribute(ne),Ne===void 0)return;Ue=2}const ze=ne.drawRange,We=ne.attributes.position;let Fe=ze.start*Ue,st=(ze.start+ze.count)*Ue;we!==null&&(Fe=Math.max(Fe,we.start*Ue),st=Math.min(st,(we.start+we.count)*Ue)),Ne!==null?(Fe=Math.max(Fe,0),st=Math.min(st,Ne.count)):We!=null&&(Fe=Math.max(Fe,0),st=Math.min(st,We.count));const yt=st-Fe;if(yt<0||yt===1/0)return;Ee.setup(te,ee,be,ne,Ne);let xt,rt=_e;if(Ne!==null&&(xt=H.get(Ne),rt=de,rt.setIndex(xt)),te.isMesh)ee.wireframe===!0?(_.setLineWidth(ee.wireframeLinewidth*Y()),rt.setMode(N.LINES)):rt.setMode(N.TRIANGLES);else if(te.isLine){let Pt=ee.linewidth;Pt===void 0&&(Pt=1),_.setLineWidth(Pt*Y()),te.isLineSegments?rt.setMode(N.LINES):te.isLineLoop?rt.setMode(N.LINE_LOOP):rt.setMode(N.LINE_STRIP)}else te.isPoints?rt.setMode(N.POINTS):te.isSprite&&rt.setMode(N.TRIANGLES);if(te.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))rt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const Pt=te._multiDrawStarts,Te=te._multiDrawCounts,jt=te._multiDrawCount,Qe=Ne?H.get(Ne).bytesPerElement:1,Xt=F.get(ee).currentProgram.getUniforms();for(let an=0;an<jt;an++)Xt.setValue(N,"_gl_DrawID",an),rt.render(Pt[an]/Qe,Te[an])}else if(te.isInstancedMesh)rt.renderInstances(Fe,yt,te.count);else if(ne.isInstancedBufferGeometry){const Pt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Te=Math.min(ne.instanceCount,Pt);rt.renderInstances(Fe,yt,Te)}else rt.render(Fe,yt)};function pc(C,q,ne){C.transparent===!0&&C.side===Sn&&C.forceSinglePass===!1?(C.side=Ht,C.needsUpdate=!0,_s(C,q,ne),C.side=Wn,C.needsUpdate=!0,_s(C,q,ne),C.side=Sn):_s(C,q,ne)}this.compile=function(C,q,ne=null){ne===null&&(ne=C),w=ce.get(ne),w.init(q),v.push(w),ne.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(w.pushLight(te),te.castShadow&&w.pushShadow(te))}),C!==ne&&C.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(w.pushLight(te),te.castShadow&&w.pushShadow(te))}),w.setupLights();const ee=new Set;return C.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const we=te.material;if(we)if(Array.isArray(we))for(let Ae=0;Ae<we.length;Ae++){const be=we[Ae];pc(be,ne,te),ee.add(be)}else pc(we,ne,te),ee.add(we)}),w=v.pop(),ee},this.compileAsync=function(C,q,ne=null){const ee=this.compile(C,q,ne);return new Promise(te=>{function we(){if(ee.forEach(function(Ae){F.get(Ae).currentProgram.isReady()&&ee.delete(Ae)}),ee.size===0){te(C);return}setTimeout(we,10)}oe.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Tr=null;function Wu(C){Tr&&Tr(C)}function mc(){Xn.stop()}function gc(){Xn.start()}const Xn=new mu;Xn.setAnimationLoop(Wu),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(C){Tr=C,Re.setAnimationLoop(C),C===null?Xn.stop():Xn.start()},Re.addEventListener("sessionstart",mc),Re.addEventListener("sessionend",gc),this.render=function(C,q){if(q!==void 0&&q.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(C,q);const ne=Re.enabled===!0&&Re.isPresenting===!0,ee=E!==null&&(K===null||ne)&&E.begin(I,K);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(q),q=Re.getCamera()),C.isScene===!0&&C.onBeforeRender(I,C,q,K),w=ce.get(C,v.length),w.init(q),w.state.textureUnits=G.getTextureUnits(),v.push(w),dt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Je.setFromProjectionMatrix(dt,hn,q.reversedDepth),Ve=this.localClippingEnabled,$e=ve.init(this.clippingPlanes,Ve),T=le.get(C,R.length),T.init(),R.push(T),Re.enabled===!0&&Re.isPresenting===!0){const Ae=I.xr.getDepthSensingMesh();Ae!==null&&Ar(Ae,q,-1/0,I.sortObjects)}Ar(C,q,0,I.sortObjects),T.finish(),I.sortObjects===!0&&T.sort(Me,Le,q.reversedDepth),ot=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,ot&&De.addToRenderList(T,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&ve.beginShadows();const te=w.state.shadowsArray;if(Se.render(te,C,q),$e===!0&&ve.endShadows(),(ee&&E.hasRenderPass())===!1){const Ae=T.opaque,be=T.transmissive;if(w.setupLights(),q.isArrayCamera){const Ne=q.cameras;if(be.length>0)for(let Ue=0,ze=Ne.length;Ue<ze;Ue++){const We=Ne[Ue];_c(Ae,be,C,We)}ot&&De.render(C);for(let Ue=0,ze=Ne.length;Ue<ze;Ue++){const We=Ne[Ue];xc(T,C,We,We.viewport)}}else be.length>0&&_c(Ae,be,C,q),ot&&De.render(C),xc(T,C,q)}K!==null&&U===0&&(G.updateMultisampleRenderTarget(K),G.updateRenderTargetMipmap(K)),ee&&E.end(I),C.isScene===!0&&C.onAfterRender(I,C,q),Ee.resetDefaultState(),ie=-1,pe=null,v.pop(),v.length>0?(w=v[v.length-1],G.setTextureUnits(w.state.textureUnits),$e===!0&&ve.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,L!==null&&L.renderEnd()};function Ar(C,q,ne,ee){if(C.visible===!1)return;if(C.layers.test(q.layers)){if(C.isGroup)ne=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(q);else if(C.isLightProbeGrid)w.pushLightProbeGrid(C);else if(C.isLight)w.pushLight(C),C.castShadow&&w.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Je.intersectsSprite(C)){ee&&mt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(dt);const Ae=V.update(C),be=C.material;be.visible&&T.push(C,Ae,be,ne,mt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Je.intersectsObject(C))){const Ae=V.update(C),be=C.material;if(ee&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),mt.copy(C.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),mt.copy(Ae.boundingSphere.center)),mt.applyMatrix4(C.matrixWorld).applyMatrix4(dt)),Array.isArray(be)){const Ne=Ae.groups;for(let Ue=0,ze=Ne.length;Ue<ze;Ue++){const We=Ne[Ue],Fe=be[We.materialIndex];Fe&&Fe.visible&&T.push(C,Ae,Fe,ne,mt.z,We)}}else be.visible&&T.push(C,Ae,be,ne,mt.z,null)}}const we=C.children;for(let Ae=0,be=we.length;Ae<be;Ae++)Ar(we[Ae],q,ne,ee)}function xc(C,q,ne,ee){const{opaque:te,transmissive:we,transparent:Ae}=C;w.setupLightsView(ne),$e===!0&&ve.setGlobalState(I.clippingPlanes,ne),ee&&_.viewport(he.copy(ee)),te.length>0&&xs(te,q,ne),we.length>0&&xs(we,q,ne),Ae.length>0&&xs(Ae,q,ne),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function _c(C,q,ne,ee){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ee.id]===void 0){const Fe=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ee.id]=new pn(1,1,{generateMipmaps:!0,type:Fe?Nn:$t,minFilter:ai,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const we=w.state.transmissionRenderTarget[ee.id],Ae=ee.viewport||he;we.setSize(Ae.z*I.transmissionResolutionScale,Ae.w*I.transmissionResolutionScale);const be=I.getRenderTarget(),Ne=I.getActiveCubeFace(),Ue=I.getActiveMipmapLevel();I.setRenderTarget(we),I.getClearColor(ge),Be=I.getClearAlpha(),Be<1&&I.setClearColor(16777215,.5),I.clear(),ot&&De.render(ne);const ze=I.toneMapping;I.toneMapping=fn;const We=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),w.setupLightsView(ee),$e===!0&&ve.setGlobalState(I.clippingPlanes,ee),xs(C,ne,ee),G.updateMultisampleRenderTarget(we),G.updateRenderTargetMipmap(we),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let st=0,yt=q.length;st<yt;st++){const xt=q[st],{object:rt,geometry:Pt,material:Te,group:jt}=xt;if(Te.side===Sn&&rt.layers.test(ee.layers)){const Qe=Te.side;Te.side=Ht,Te.needsUpdate=!0,vc(rt,ne,ee,Pt,Te,jt),Te.side=Qe,Te.needsUpdate=!0,Fe=!0}}Fe===!0&&(G.updateMultisampleRenderTarget(we),G.updateRenderTargetMipmap(we))}I.setRenderTarget(be,Ne,Ue),I.setClearColor(ge,Be),We!==void 0&&(ee.viewport=We),I.toneMapping=ze}function xs(C,q,ne){const ee=q.isScene===!0?q.overrideMaterial:null;for(let te=0,we=C.length;te<we;te++){const Ae=C[te],{object:be,geometry:Ne,group:Ue}=Ae;let ze=Ae.material;ze.allowOverride===!0&&ee!==null&&(ze=ee),be.layers.test(ne.layers)&&vc(be,q,ne,Ne,ze,Ue)}}function vc(C,q,ne,ee,te,we){C.onBeforeRender(I,q,ne,ee,te,we),C.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),te.onBeforeRender(I,q,ne,ee,C,we),te.transparent===!0&&te.side===Sn&&te.forceSinglePass===!1?(te.side=Ht,te.needsUpdate=!0,I.renderBufferDirect(ne,q,ee,te,C,we),te.side=Wn,te.needsUpdate=!0,I.renderBufferDirect(ne,q,ee,te,C,we),te.side=Sn):I.renderBufferDirect(ne,q,ee,te,C,we),C.onAfterRender(I,q,ne,ee,te,we)}function _s(C,q,ne){q.isScene!==!0&&(q=Mt);const ee=F.get(C),te=w.state.lights,we=w.state.shadowsArray,Ae=te.state.version,be=se.getParameters(C,te.state,we,q,ne,w.state.lightProbeGridArray),Ne=se.getProgramCacheKey(be);let Ue=ee.programs;ee.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?q.environment:null,ee.fog=q.fog;const ze=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ee.envMap=Z.get(C.envMap||ee.environment,ze),ee.envMapRotation=ee.environment!==null&&C.envMap===null?q.environmentRotation:C.envMapRotation,Ue===void 0&&(C.addEventListener("dispose",rn),Ue=new Map,ee.programs=Ue);let We=Ue.get(Ne);if(We!==void 0){if(ee.currentProgram===We&&ee.lightsStateVersion===Ae)return yc(C,be),We}else be.uniforms=se.getUniforms(C),L!==null&&C.isNodeMaterial&&L.build(C,ne,be),C.onBeforeCompile(be,I),We=se.acquireProgram(be,Ne),Ue.set(Ne,We),ee.uniforms=be.uniforms;const Fe=ee.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Fe.clippingPlanes=ve.uniform),yc(C,be),ee.needsLights=Yu(C),ee.lightsStateVersion=Ae,ee.needsLights&&(Fe.ambientLightColor.value=te.state.ambient,Fe.lightProbe.value=te.state.probe,Fe.directionalLights.value=te.state.directional,Fe.directionalLightShadows.value=te.state.directionalShadow,Fe.spotLights.value=te.state.spot,Fe.spotLightShadows.value=te.state.spotShadow,Fe.rectAreaLights.value=te.state.rectArea,Fe.ltc_1.value=te.state.rectAreaLTC1,Fe.ltc_2.value=te.state.rectAreaLTC2,Fe.pointLights.value=te.state.point,Fe.pointLightShadows.value=te.state.pointShadow,Fe.hemisphereLights.value=te.state.hemi,Fe.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Fe.spotLightMatrix.value=te.state.spotLightMatrix,Fe.spotLightMap.value=te.state.spotLightMap,Fe.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=w.state.lightProbeGridArray.length>0,ee.currentProgram=We,ee.uniformsList=null,We}function Mc(C){if(C.uniformsList===null){const q=C.currentProgram.getUniforms();C.uniformsList=rr.seqWithValue(q.seq,C.uniforms)}return C.uniformsList}function yc(C,q){const ne=F.get(C);ne.outputColorSpace=q.outputColorSpace,ne.batching=q.batching,ne.batchingColor=q.batchingColor,ne.instancing=q.instancing,ne.instancingColor=q.instancingColor,ne.instancingMorph=q.instancingMorph,ne.skinning=q.skinning,ne.morphTargets=q.morphTargets,ne.morphNormals=q.morphNormals,ne.morphColors=q.morphColors,ne.morphTargetsCount=q.morphTargetsCount,ne.numClippingPlanes=q.numClippingPlanes,ne.numIntersection=q.numClipIntersection,ne.vertexAlphas=q.vertexAlphas,ne.vertexTangents=q.vertexTangents,ne.toneMapping=q.toneMapping}function $u(C,q){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;b.setFromMatrixPosition(q.matrixWorld);for(let ne=0,ee=C.length;ne<ee;ne++){const te=C[ne];if(te.texture!==null&&te.boundingBox.containsPoint(b))return te}return null}function Xu(C,q,ne,ee,te){q.isScene!==!0&&(q=Mt),G.resetTextureUnits();const we=q.fog,Ae=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?q.environment:null,be=K===null?I.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ye.workingColorSpace,Ne=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Ue=Z.get(ee.envMap||Ae,Ne),ze=ee.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,We=!!ne.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Fe=!!ne.morphAttributes.position,st=!!ne.morphAttributes.normal,yt=!!ne.morphAttributes.color;let xt=fn;ee.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(xt=I.toneMapping);const rt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Pt=rt!==void 0?rt.length:0,Te=F.get(ee),jt=w.state.lights;if($e===!0&&(Ve===!0||C!==pe)){const lt=C===pe&&ee.id===ie;ve.setState(ee,C,lt)}let Qe=!1;ee.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==jt.state.version||Te.outputColorSpace!==be||te.isBatchedMesh&&Te.batching===!1||!te.isBatchedMesh&&Te.batching===!0||te.isBatchedMesh&&Te.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Te.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Te.instancing===!1||!te.isInstancedMesh&&Te.instancing===!0||te.isSkinnedMesh&&Te.skinning===!1||!te.isSkinnedMesh&&Te.skinning===!0||te.isInstancedMesh&&Te.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Te.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Te.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Te.instancingMorph===!1&&te.morphTexture!==null||Te.envMap!==Ue||ee.fog===!0&&Te.fog!==we||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ve.numPlanes||Te.numIntersection!==ve.numIntersection)||Te.vertexAlphas!==ze||Te.vertexTangents!==We||Te.morphTargets!==Fe||Te.morphNormals!==st||Te.morphColors!==yt||Te.toneMapping!==xt||Te.morphTargetsCount!==Pt||!!Te.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Te.__version=ee.version);let Xt=Te.currentProgram;Qe===!0&&(Xt=_s(ee,q,te),L&&ee.isNodeMaterial&&L.onUpdateProgram(ee,Xt,Te));let an=!1,In=!1,gi=!1;const at=Xt.getUniforms(),bt=Te.uniforms;if(_.useProgram(Xt.program)&&(an=!0,In=!0,gi=!0),ee.id!==ie&&(ie=ee.id,In=!0),Te.needsLights){const lt=$u(w.state.lightProbeGridArray,te);Te.lightProbeGrid!==lt&&(Te.lightProbeGrid=lt,In=!0)}if(an||pe!==C){_.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),at.setValue(N,"projectionMatrix",C.projectionMatrix),at.setValue(N,"viewMatrix",C.matrixWorldInverse);const Un=at.map.cameraPosition;Un!==void 0&&Un.setValue(N,ht.setFromMatrixPosition(C.matrixWorld)),A.logarithmicDepthBuffer&&at.setValue(N,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&at.setValue(N,"isOrthographic",C.isOrthographicCamera===!0),pe!==C&&(pe=C,In=!0,gi=!0)}if(Te.needsLights&&(jt.state.directionalShadowMap.length>0&&at.setValue(N,"directionalShadowMap",jt.state.directionalShadowMap,G),jt.state.spotShadowMap.length>0&&at.setValue(N,"spotShadowMap",jt.state.spotShadowMap,G),jt.state.pointShadowMap.length>0&&at.setValue(N,"pointShadowMap",jt.state.pointShadowMap,G)),te.isSkinnedMesh){at.setOptional(N,te,"bindMatrix"),at.setOptional(N,te,"bindMatrixInverse");const lt=te.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),at.setValue(N,"boneTexture",lt.boneTexture,G))}te.isBatchedMesh&&(at.setOptional(N,te,"batchingTexture"),at.setValue(N,"batchingTexture",te._matricesTexture,G),at.setOptional(N,te,"batchingIdTexture"),at.setValue(N,"batchingIdTexture",te._indirectTexture,G),at.setOptional(N,te,"batchingColorTexture"),te._colorsTexture!==null&&at.setValue(N,"batchingColorTexture",te._colorsTexture,G));const Dn=ne.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&W.update(te,ne,Xt),(In||Te.receiveShadow!==te.receiveShadow)&&(Te.receiveShadow=te.receiveShadow,at.setValue(N,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&q.environment!==null&&(bt.envMapIntensity.value=q.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=Xv()),In){if(at.setValue(N,"toneMappingExposure",I.toneMappingExposure),Te.needsLights&&qu(bt,gi),we&&ee.fog===!0&&ue.refreshFogUniforms(bt,we),ue.refreshMaterialUniforms(bt,ee,Q,X,w.state.transmissionRenderTarget[C.id]),Te.needsLights&&Te.lightProbeGrid){const lt=Te.lightProbeGrid;bt.probesSH.value=lt.texture,bt.probesMin.value.copy(lt.boundingBox.min),bt.probesMax.value.copy(lt.boundingBox.max),bt.probesResolution.value.copy(lt.resolution)}rr.upload(N,Mc(Te),bt,G)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(rr.upload(N,Mc(Te),bt,G),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&at.setValue(N,"center",te.center),at.setValue(N,"modelViewMatrix",te.modelViewMatrix),at.setValue(N,"normalMatrix",te.normalMatrix),at.setValue(N,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const lt=ee.uniformsGroups;for(let Un=0,xi=lt.length;Un<xi;Un++){const bc=lt[Un];fe.update(bc,Xt),fe.bind(bc,Xt)}}return Xt}function qu(C,q){C.ambientLightColor.needsUpdate=q,C.lightProbe.needsUpdate=q,C.directionalLights.needsUpdate=q,C.directionalLightShadows.needsUpdate=q,C.pointLights.needsUpdate=q,C.pointLightShadows.needsUpdate=q,C.spotLights.needsUpdate=q,C.spotLightShadows.needsUpdate=q,C.rectAreaLights.needsUpdate=q,C.hemisphereLights.needsUpdate=q}function Yu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(C,q,ne){const ee=F.get(C);ee.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),F.get(C.texture).__webglTexture=q,F.get(C.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ne,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,q){const ne=F.get(C);ne.__webglFramebuffer=q,ne.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(C,q=0,ne=0){K=C,k=q,U=ne;let ee=null,te=!1,we=!1;if(C){const be=F.get(C);if(be.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,be.__webglFramebuffer),he.copy(C.viewport),me.copy(C.scissor),Pe=C.scissorTest,_.viewport(he),_.scissor(me),_.setScissorTest(Pe),ie=-1;return}else if(be.__webglFramebuffer===void 0)G.setupRenderTarget(C);else if(be.__hasExternalTextures)G.rebindTextures(C,F.get(C.texture).__webglTexture,F.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ze=C.depthTexture;if(be.__boundDepthTexture!==ze){if(ze!==null&&F.has(ze)&&(C.width!==ze.image.width||C.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");G.setupDepthRenderbuffer(C)}}const Ne=C.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(we=!0);const Ue=F.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ue[q])?ee=Ue[q][ne]:ee=Ue[q],te=!0):C.samples>0&&G.useMultisampledRTT(C)===!1?ee=F.get(C).__webglMultisampledFramebuffer:Array.isArray(Ue)?ee=Ue[ne]:ee=Ue,he.copy(C.viewport),me.copy(C.scissor),Pe=C.scissorTest}else he.copy(Ce).multiplyScalar(Q).floor(),me.copy(qe).multiplyScalar(Q).floor(),Pe=Ge;if(ne!==0&&(ee=z),_.bindFramebuffer(N.FRAMEBUFFER,ee)&&_.drawBuffers(C,ee),_.viewport(he),_.scissor(me),_.setScissorTest(Pe),te){const be=F.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+q,be.__webglTexture,ne)}else if(we){const be=q;for(let Ne=0;Ne<C.textures.length;Ne++){const Ue=F.get(C.textures[Ne]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ne,Ue.__webglTexture,ne,be)}}else if(C!==null&&ne!==0){const be=F.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,be.__webglTexture,ne)}ie=-1},this.readRenderTargetPixels=function(C,q,ne,ee,te,we,Ae,be=0){if(!(C&&C.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=F.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne){_.bindFramebuffer(N.FRAMEBUFFER,Ne);try{const Ue=C.textures[be],ze=Ue.format,We=Ue.type;if(C.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+be),!A.textureFormatReadable(ze)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(We)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=C.width-ee&&ne>=0&&ne<=C.height-te&&N.readPixels(q,ne,ee,te,xe.convert(ze),xe.convert(We),we)}finally{const Ue=K!==null?F.get(K).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(C,q,ne,ee,te,we,Ae,be=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=F.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne)if(q>=0&&q<=C.width-ee&&ne>=0&&ne<=C.height-te){_.bindFramebuffer(N.FRAMEBUFFER,Ne);const Ue=C.textures[be],ze=Ue.format,We=Ue.type;if(C.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+be),!A.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Fe),N.bufferData(N.PIXEL_PACK_BUFFER,we.byteLength,N.STREAM_READ),N.readPixels(q,ne,ee,te,xe.convert(ze),xe.convert(We),0);const st=K!==null?F.get(K).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,st);const yt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await gm(N,yt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Fe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,we),N.deleteBuffer(Fe),N.deleteSync(yt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,q=null,ne=0){const ee=Math.pow(2,-ne),te=Math.floor(C.image.width*ee),we=Math.floor(C.image.height*ee),Ae=q!==null?q.x:0,be=q!==null?q.y:0;G.setTexture2D(C,0),N.copyTexSubImage2D(N.TEXTURE_2D,ne,0,0,Ae,be,te,we),_.unbindTexture()},this.copyTextureToTexture=function(C,q,ne=null,ee=null,te=0,we=0){let Ae,be,Ne,Ue,ze,We,Fe,st,yt;const xt=C.isCompressedTexture?C.mipmaps[we]:C.image;if(ne!==null)Ae=ne.max.x-ne.min.x,be=ne.max.y-ne.min.y,Ne=ne.isBox3?ne.max.z-ne.min.z:1,Ue=ne.min.x,ze=ne.min.y,We=ne.isBox3?ne.min.z:0;else{const bt=Math.pow(2,-te);Ae=Math.floor(xt.width*bt),be=Math.floor(xt.height*bt),C.isDataArrayTexture?Ne=xt.depth:C.isData3DTexture?Ne=Math.floor(xt.depth*bt):Ne=1,Ue=0,ze=0,We=0}ee!==null?(Fe=ee.x,st=ee.y,yt=ee.z):(Fe=0,st=0,yt=0);const rt=xe.convert(q.format),Pt=xe.convert(q.type);let Te;q.isData3DTexture?(G.setTexture3D(q,0),Te=N.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(G.setTexture2DArray(q,0),Te=N.TEXTURE_2D_ARRAY):(G.setTexture2D(q,0),Te=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,q.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,q.unpackAlignment);const jt=_.getParameter(N.UNPACK_ROW_LENGTH),Qe=_.getParameter(N.UNPACK_IMAGE_HEIGHT),Xt=_.getParameter(N.UNPACK_SKIP_PIXELS),an=_.getParameter(N.UNPACK_SKIP_ROWS),In=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,xt.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xt.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Ue),_.pixelStorei(N.UNPACK_SKIP_ROWS,ze),_.pixelStorei(N.UNPACK_SKIP_IMAGES,We);const gi=C.isDataArrayTexture||C.isData3DTexture,at=q.isDataArrayTexture||q.isData3DTexture;if(C.isDepthTexture){const bt=F.get(C),Dn=F.get(q),lt=F.get(bt.__renderTarget),Un=F.get(Dn.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,lt.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let xi=0;xi<Ne;xi++)gi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(C).__webglTexture,te,We+xi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(q).__webglTexture,we,yt+xi)),N.blitFramebuffer(Ue,ze,Ae,be,Fe,st,Ae,be,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(te!==0||C.isRenderTargetTexture||F.has(C)){const bt=F.get(C),Dn=F.get(q);_.bindFramebuffer(N.READ_FRAMEBUFFER,O),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,$);for(let lt=0;lt<Ne;lt++)gi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,bt.__webglTexture,te,We+lt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,bt.__webglTexture,te),at?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Dn.__webglTexture,we,yt+lt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Dn.__webglTexture,we),te!==0?N.blitFramebuffer(Ue,ze,Ae,be,Fe,st,Ae,be,N.COLOR_BUFFER_BIT,N.NEAREST):at?N.copyTexSubImage3D(Te,we,Fe,st,yt+lt,Ue,ze,Ae,be):N.copyTexSubImage2D(Te,we,Fe,st,Ue,ze,Ae,be);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else at?C.isDataTexture||C.isData3DTexture?N.texSubImage3D(Te,we,Fe,st,yt,Ae,be,Ne,rt,Pt,xt.data):q.isCompressedArrayTexture?N.compressedTexSubImage3D(Te,we,Fe,st,yt,Ae,be,Ne,rt,xt.data):N.texSubImage3D(Te,we,Fe,st,yt,Ae,be,Ne,rt,Pt,xt):C.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,we,Fe,st,Ae,be,rt,Pt,xt.data):C.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,we,Fe,st,xt.width,xt.height,rt,xt.data):N.texSubImage2D(N.TEXTURE_2D,we,Fe,st,Ae,be,rt,Pt,xt);_.pixelStorei(N.UNPACK_ROW_LENGTH,jt),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Xt),_.pixelStorei(N.UNPACK_SKIP_ROWS,an),_.pixelStorei(N.UNPACK_SKIP_IMAGES,In),we===0&&q.generateMipmaps&&N.generateMipmap(Te),_.unbindTexture()},this.initRenderTarget=function(C){F.get(C).__webglFramebuffer===void 0&&G.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?G.setTextureCube(C,0):C.isData3DTexture?G.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?G.setTexture2DArray(C,0):G.setTexture2D(C,0),_.unbindTexture()},this.resetState=function(){k=0,U=0,K=null,_.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Xs=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],wu=620,qv=560,Yv=300,Kv=2800,Gl=850,Hl=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],jl=210,Ma=300,Vl=.42,Wl=740,qs=n=>-(n+1)*wu,Zv=n=>n===1?1:1-Math.pow(2,-10*n),ya=n=>new Promise(e=>setTimeout(e,n)),$l=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function Xl(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${$l[t%$l.length]}`)}function Jv({onDone:n}){const e=j.useRef(null),t=j.useRef(null),i=j.useRef(null),s=j.useRef(null),r=j.useRef(null),o=j.useRef(null),c=j.useRef(null),l=j.useRef(null),u=j.useRef(null),d=j.useRef(null),f=j.useRef(n);f.current=n,md();const h=j.useMemo(()=>Xl(16),[]),m=j.useMemo(()=>Xl(16),[]);return j.useEffect(()=>{let g=!1,y=!1;const x=()=>{y||(y=!0,f.current())};let p=null;function M(){if(!p)try{const Y=window.AudioContext??window.webkitAudioContext;p=new Y}catch{}return p}function S(){const Y=M();if(!Y)return;Y.state==="suspended"&&Y.resume();const N=Y.currentTime,ae=Y.createOscillator();ae.type="sine",ae.frequency.setValueAtTime(130,N),ae.frequency.exponentialRampToValueAtTime(42,N+.16);const oe=Y.createGain();oe.gain.setValueAtTime(1,N),oe.gain.exponentialRampToValueAtTime(.001,N+.38),ae.connect(oe).connect(Y.destination),ae.start(N),ae.stop(N+.42);const A=Math.floor(Y.sampleRate*.14),_=Y.createBuffer(1,A,Y.sampleRate),D=_.getChannelData(0);for(let H=0;H<A;H++)D[H]=(Math.random()*2-1)*Math.pow(1-H/A,2.2);const F=Y.createBufferSource();F.buffer=_;const G=Y.createBiquadFilter();G.type="lowpass",G.frequency.value=850;const Z=Y.createGain();Z.gain.setValueAtTime(.55,N),Z.gain.exponentialRampToValueAtTime(.001,N+.13),F.connect(G).connect(Z).connect(Y.destination),F.start(N)}function b(){const Y=i.current;Y&&(Y.currentTime=0,Y.play().catch(()=>{}))}const T=t.current,w=(T==null?void 0:T.getContext("2d"))??null;let R=[],v=0;function E(){T&&(T.width=window.innerWidth,T.height=window.innerHeight)}E();function I(Y,N){R=[];let ae=0;const oe=6;function A(D,F,G,Z,H,B){const V=3+Math.floor(Math.random()*3),se=[[D,F]];let ue=G,le=D,ce=F;for(let ve=0;ve<V;ve++){ue+=(Math.random()-.5)*.6;const Se=Z/V;if(le+=Math.cos(ue)*Se,ce+=Math.sin(ue)*Se,se.push([le,ce]),H>0&&Math.random()<.5){const De=ue+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);A(le,ce,De,Z*(.35+Math.random()*.3),H-1,B*.78)}}R.push({pts:se,color:Hl[ae++%Hl.length],width:B})}const _=[N*(.06+Math.random()*.1),N*(.84+Math.random()*.1)];for(let D=0;D<oe;D++){const F=Y*(.15+Math.random()*.7),G=D<_.length?_[D]:N*(.1+Math.random()*.8),Z=9+Math.floor(Math.random()*6);for(let H=0;H<Z;H++){const B=H/Z*Math.PI*2+(Math.random()-.5)*.4,V=Math.max(Y,N)*(.18+Math.random()*.38);A(F,G,B,V,2,.9)}}}function P(Y){if(!w||Y<=0)return;const N=Math.min(1,Y/2.4),ae=Math.round(R.length*N);for(let oe=0;oe<ae;oe++){const A=R[oe];w.lineWidth=A.width*(.9+Y*.1),w.strokeStyle=A.color,w.globalAlpha=.75+Y*.1,w.shadowColor=A.color,w.shadowBlur=5+Y*2.2,w.beginPath(),A.pts.forEach(([_,D],F)=>F===0?w.moveTo(_,D):w.lineTo(_,D)),w.stroke()}w.globalAlpha=1,w.shadowBlur=0}function L(Y,N,ae){w&&(w.clearRect(0,0,N,ae),P(Y))}function z(){const Y=u.current;Y&&(Y.classList.remove("intro-hit"),Y.offsetWidth,Y.classList.add("intro-hit"))}function O(){var N,ae,oe,A;const Y=(N=r.current)==null?void 0:N.firstElementChild;Y&&(Y.classList.remove("intro-rgbslam"),Y.offsetWidth,Y.classList.add("intro-rgbslam")),(ae=r.current)==null||ae.classList.remove("intro-jitter"),(oe=r.current)==null||oe.offsetWidth,(A=r.current)==null||A.classList.add("intro-jitter"),z(),$e()}async function $(){for(let Y=5;Y>=1&&!g;Y--){const N=r.current;if(!N)return;N.innerHTML="";const ae=document.createElement("div");ae.className="intro-glyph",ae.setAttribute("data-t",String(Y)),ae.textContent=String(Y),N.appendChild(ae),O(),S(),await ae.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Gl*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await ya(Gl*.3)}}let k=null,U=null,K=null,ie=0,pe=!1,he=-1;const Pe=document.createElement("canvas").getContext("2d");Pe.font=`700 ${jl}px "Rajdhani", sans-serif`;const ge=[],Be=[];function re(Y,N){const ae=Math.ceil(Pe.measureText(Y).width),oe=Math.max(200,ae+120),A=document.createElement("canvas");A.width=oe,A.height=Ma;const _=A.getContext("2d");_.font=`700 ${jl}px "Rajdhani", sans-serif`,_.textAlign="center",_.textBaseline="middle",_.shadowColor=N,_.shadowBlur=56,_.fillStyle="#d24e01",_.fillText(Y,oe/2,Ma/2);const D=new cu(A);D.anisotropy=4;let F=oe*Vl,G=Ma*Vl;if(F>Wl){const Z=Wl/F;F*=Z,G*=Z}return{tex:D,worldW:F,worldH:G}}function X(Y,N,ae){const{tex:oe,worldW:A,worldH:_}=re(Y,ae),D=new Xi(A,_),F=new Vn({map:oe,transparent:!0,depthWrite:!1,opacity:0}),G=new ut(D,F);G.position.set(0,10,N),G.visible=!1,U.add(G);const Z=new ut(D,new Vn({map:oe,transparent:!0,depthWrite:!1,blending:ui,color:2875596,opacity:0})),H=new ut(D,new Vn({map:oe,transparent:!0,depthWrite:!1,blending:ui,color:10116351,opacity:0}));return Z.position.copy(G.position),H.position.copy(G.position),Z.visible=!1,H.visible=!1,U.add(Z),U.add(H),Be.push(D,F,oe,Z.material,H.material),{mesh:G,ghostCy:Z,ghostMg:H}}const Q={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Me,Le;function Ce(){const Y=e.current;if(!Y)return;k=new Su({canvas:Y,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),k.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),U=new iu,U.fog=new yr(263946,.0011),K=new Gt(62,window.innerWidth/window.innerHeight,1,6e3),K.position.set(0,0,40),U.add(new pu(928300,1.1));const N=wu*Xs.length+500,ae=900,oe=new Ft,A=new Float32Array(ae*3),_=new Float32Array(ae*3),D=[2875596,15357964,15357964,10116351];for(let H=0;H<ae;H++){const B=60+Math.random()*260,V=Math.random()*Math.PI*2;A[H*3]=Math.cos(V)*B,A[H*3+1]=Math.sin(V)*B,A[H*3+2]=-Math.random()*N;const se=new Xe(D[H%D.length]);_[H*3]=se.r,_[H*3+1]=se.g,_[H*3+2]=se.b}oe.setAttribute("position",new kt(A,3)),oe.setAttribute("color",new kt(_,3));const F=new Sr({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});U.add(new tc(oe,F)),Be.push(oe,F),Xs.forEach((H,B)=>{const V=qs(B),se="#"+H.light.toString(16).padStart(6,"0");ge.push(X(H.text,V,se));const ue=new li(H.light,2.4,900,2);ue.position.set(0,40,V+60),U.add(ue)}),Me=new li(15357964,4,550,2),Le=new li(10116351,2.6,550,2),U.add(Me),U.add(Le),pe=!0,qe();const G=Math.random()*1e3;Q.camZ=0;function Z(H){if(!k||!U||!K)return;{const ue=Math.sin(H*.0016+G)*1.1+Math.sin(H*.0043)*.5,le=Math.cos(H*.002+G)*.9+Math.cos(H*.0038)*.45;K.position.x=ue+Q.camX,K.position.y=le+6}K.position.z=Q.camZ+Q.warpKick;const B=Q.yawKick,V=K.position.x+Math.sin(B)*640;K.lookAt(V,K.position.y-4,Q.focusZ),K.rotateZ(-B*.5);const se=62+Q.fovKick*14;K.fov!==se&&(K.fov=se,K.updateProjectionMatrix()),Me.position.set(Math.sin(H*6e-4)*80,30,Q.camZ-120),Le.position.set(Math.cos(H*7e-4)*80,-10,Q.camZ-200),ge.forEach(ue=>{ue.mesh.visible&&ue.mesh.quaternion.copy(K.quaternion),ue.ghostCy.visible&&ue.ghostCy.quaternion.copy(K.quaternion),ue.ghostMg.visible&&ue.ghostMg.quaternion.copy(K.quaternion)}),k.render(U,K),ie=requestAnimationFrame(Z)}ie=requestAnimationFrame(Z)}function qe(){!pe||!k||!K||(k.setSize(window.innerWidth,window.innerHeight),K.aspect=window.innerWidth/window.innerHeight,K.updateProjectionMatrix())}function Ge(){qe(),E(),I(window.innerWidth,window.innerHeight),L(v,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Ge,{passive:!0});function Je(Y,N=650){const ae=he;he=Y;const oe=ge[Y];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const A=ae>=0?ge[ae]:null,_=performance.now();function D(){const F=Math.min(1,(performance.now()-_)/N);oe.mesh.material.opacity=F,A&&(A.mesh.material.opacity=1-F),F<1?requestAnimationFrame(D):A&&(A.mesh.visible=!1)}D()}function $e(){if(he<0)return;const Y=ge[he];if(!Y)return;const N=16+Math.random()*14;Y.ghostCy.visible=!0,Y.ghostCy.material.opacity=.6,Y.ghostCy.position.x=-N,Y.ghostMg.visible=!0,Y.ghostMg.material.opacity=.6,Y.ghostMg.position.x=N,setTimeout(()=>{Y.ghostCy.material.opacity=0,Y.ghostCy.visible=!1,Y.ghostCy.position.x=0,Y.ghostMg.material.opacity=0,Y.ghostMg.visible=!1,Y.ghostMg.position.x=0},140+Math.random()*100)}async function Ve(Y,N,ae,oe,A){const _=Q.camZ,D=Q.camX,F=performance.now();return Q.warpKick=(Math.random()-.5)*34,Q.yawKick=A*oe,Q.fovKick=1,new Promise(G=>{function Z(H){const B=Math.min(1,(H-F)/ae),V=Zv(B);Q.camZ=_+(Y-_)*V,Q.camX=D+(N-D)*V,Q.warpKick*=.92,Q.yawKick*=.975,Q.fovKick*=.965,B<1?requestAnimationFrame(Z):G()}requestAnimationFrame(Z)})}function dt(Y=1,N=420){if(!pe||!w||!e.current)return;const ae=window.innerWidth,oe=window.innerHeight,A=performance.now()+N;function _(){if(performance.now()>A){L(v,ae,oe);return}w.clearRect(0,0,ae,oe),P(v);const F=5+Math.floor(Math.random()*8*Y);for(let Z=0;Z<F;Z++){const H=Math.random()*oe,B=4+Math.random()*52*Y,V=(Math.random()-.5)*130*Y;try{w.drawImage(e.current,0,H,ae,B,V,H,ae,B)}catch{}}const G=Math.round(6*Y);w.globalCompositeOperation="screen";for(let Z=0;Z<G;Z++){const H=Math.random()*oe;w.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],w.globalAlpha=.35+Math.random()*.35,w.lineWidth=.6+Math.random()*1.6,w.beginPath(),w.moveTo(0,H),w.lineTo(ae,H),w.stroke()}if(w.globalCompositeOperation="source-over",w.globalAlpha=1,Math.random()<Y*.12){w.globalAlpha=.5;for(let Z=0;Z<220;Z++)w.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",w.fillRect(Math.random()*ae,Math.random()*oe,2,2);w.globalAlpha=1}requestAnimationFrame(_)}_()}function ht(Y=1,N=340){if(!pe||!w)return;const ae=window.innerWidth,oe=window.innerHeight,A=ae/2,_=oe/2,D=12+Math.floor(10*Y),F=Array.from({length:D},()=>Math.random()*Math.PI*2),G=performance.now();function Z(){const B=(performance.now()-G)/N;if(B>=1){L(v,ae,oe);return}w.save(),w.globalCompositeOperation="screen",F.forEach(V=>{const se=30+B*300,ue=se+90+Math.random()*150,le=A+Math.cos(V)*se,ce=_+Math.sin(V)*se,ve=A+Math.cos(V)*ue,Se=_+Math.sin(V)*ue;w.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",w.globalAlpha=(1-B)*(.28+Math.random()*.32)*Y,w.lineWidth=1.2+Math.random()*1.8,w.beginPath(),w.moveTo(le,ce),w.lineTo(ve,Se),w.stroke()}),w.restore(),requestAnimationFrame(Z)}Z()}async function mt(Y=900){const N=window.innerWidth,ae=window.innerHeight;if(!w)return;const oe=performance.now(),A=R.map(()=>Math.random()*.25);await new Promise(_=>{function D(){const F=Math.min(1,(performance.now()-oe)/Y);w.clearRect(0,0,N,ae),R.forEach((G,Z)=>{const H=Math.min(1,Math.max(0,(F-A[Z])/(1-A[Z])));if(H<=0)return;const B=G.pts,V=B.length-1,se=H*V;w.lineWidth=G.width*(1+F*.4),w.strokeStyle=G.color,w.globalAlpha=.65+F*.3,w.shadowColor=G.color,w.shadowBlur=3+F*5,w.beginPath(),w.moveTo(B[0][0],B[0][1]);for(let ce=0;ce<Math.floor(se);ce++)w.lineTo(B[ce+1][0],B[ce+1][1]);const ue=Math.floor(se),le=se-ue;if(ue<V&&le>0){const[ce,ve]=B[ue],[Se,De]=B[ue+1];w.lineTo(ce+(Se-ce)*le,ve+(De-ve)*le)}w.stroke()}),w.globalAlpha=1,w.shadowBlur=0,F<1?requestAnimationFrame(D):_()}D()})}async function Mt(){var H;z(),(H=r.current)==null||H.classList.add("intro-jitter");const Y=d.current;if(!Y)return;Y.innerHTML="";const N=window.innerWidth,ae=window.innerHeight,oe=11,A=8,_=N/oe,D=ae/A,F=N/2,G=ae/2,Z=[];for(let B=0;B<A;B++)for(let V=0;V<oe;V++){const se=V*_,ue=B*D,le=()=>(Math.random()-.5)*16,ce=document.createElement("div");ce.className="intro-shard",ce.style.left=se+"px",ce.style.top=ue+"px",ce.style.width=_+2+"px",ce.style.height=D+2+"px",ce.style.clipPath=`polygon(${le()}px ${le()}px, ${_+le()}px ${le()}px, ${_+le()}px ${D+le()}px, ${le()}px ${D+le()}px)`,Y.appendChild(ce);const ve=se+_/2-F,Se=ue+D/2-G,De=Math.hypot(ve,Se)||1;Z.push({div:ce,dx:ve/De,dy:Se/De,delay:De/Math.max(N,ae)*220+Math.random()*80})}Z.forEach(({div:B,dx:V,dy:se,delay:ue})=>{const le=60+Math.random()*140,ce=420+Math.random()*420,ve=(Math.random()-.5)*420;B.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${V*le}px, ${se*le-20}px) rotate(${ve*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${V*le*1.4}px, ${se*le+ce}px) rotate(${ve}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:ue,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await ya(1600),Y.innerHTML=""}async function ot(){var Y;if(I(window.innerWidth,window.innerHeight),Ce(),s.current&&(s.current.style.display="flex"),await $(),!g){s.current&&(s.current.style.display="none"),(Y=c.current)==null||Y.classList.add("intro-on"),b();for(let N=0;N<Xs.length&&!g;N++){const ae=Xs[N];v=ae.crack,l.current&&(l.current.innerHTML=ae.final?ae.sub:`${ae.sub} · трещина канала <b>${ae.crack}/4</b>`),Je(N),Q.focusZ=qs(N);const oe=N%2===0?1:-1,A=ae.final?0:oe*60,_=ae.final?qs(N)-Yv:qs(N)+qv;if(await Ve(_,A,Kv,.5+ae.crack*.09,oe),g)return;O(),dt(Math.min(1,.5+ae.crack*.14),ae.final?300:260),ae.final||ht(.8+ae.crack*.1,320),L(v,window.innerWidth,window.innerHeight)}g||(await mt(900),!g&&(await ya(150),await Mt(),!g&&x()))}}return ot(),()=>{g=!0,window.removeEventListener("resize",Ge),cancelAnimationFrame(ie),Be.forEach(Y=>Y.dispose()),k==null||k.dispose(),p==null||p.close().catch(()=>{})}},[]),a.jsx("div",{className:"host-screen grid-bg intro-screen",children:a.jsxs("div",{className:"intro-root",children:[a.jsx("canvas",{ref:e,className:"intro-gl"}),a.jsx("canvas",{ref:t,className:"intro-crack"}),a.jsx("div",{ref:d,className:"intro-shatter-layer"}),a.jsx("div",{className:"intro-vignette"}),a.jsx("div",{className:"intro-scanlines"}),a.jsx("div",{ref:u,className:"intro-noise"}),a.jsx("div",{className:"intro-bracket tl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket tr",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket bl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket br",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-ticker left",children:a.jsx("div",{className:"intro-ticker-col",children:[...h,...h].map((g,y)=>a.jsx("span",{className:y%6===0?"hi":void 0,children:g},y))})}),a.jsx("div",{className:"intro-ticker right",children:a.jsx("div",{className:"intro-ticker-col",children:[...m,...m].map((g,y)=>a.jsx("span",{className:y%5===0?"hi":void 0,children:g},y))})}),a.jsxs("div",{ref:s,className:"intro-stage",children:[a.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),a.jsx("div",{ref:r,className:"intro-frame"}),a.jsx("div",{ref:o,className:"intro-subline",children:"инициализация канала связи…"})]}),a.jsx("div",{ref:c,className:"intro-flight-label",children:a.jsx("div",{ref:l,className:"intro-subline"})}),a.jsx(Bo,{}),a.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const Qv=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],ba=[3400,2700,2200,1900],Io=640,ql=560,eM=320,Yl=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Sa=220,Ys=300,Kl=.46,Zl=820,is=n=>-(n+1)*Io,tM=n=>n===1?1:1-Math.pow(2,-10*n),ss=n=>new Promise(e=>setTimeout(e,n));function nM(){const n=new ci,e=[],t=new Jn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new nc(.42,.95,12),s=new ut(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new Oi(.42,.36,1.9,12),o=new ut(r,t);o.rotation.x=Math.PI/2,o.position.set(0,0,-.15),n.add(o),e.push(r);const c=new pi(.5,.14,1),l=new Jn({color:1316636,metalness:.5,roughness:.6}),u=new ut(c,l);u.position.set(.08,.38,-.1),u.rotation.z=.1,n.add(u),e.push(c,l);const d=new Jn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),f=new pr(.13,12,12),h=new ut(f,d);h.position.set(0,-.05,-2),n.add(h),e.push(f,d);const m=new pr(.06,8,8);[-.22,.22].forEach(E=>{const I=new ut(m,d);I.position.set(E,.12,-1.7),n.add(I)}),e.push(m);const g=new Oi(.06,.06,1.4,6),y=new Jn({color:1711394,metalness:.7,roughness:.4});e.push(g,y);const x=new pi(.04,.86,.05),p=new Jn({color:658447,metalness:.4,roughness:.6});e.push(x,p);const M=new Oi(.5,.5,.07,16),S=new Jn({color:1382429,metalness:.6,roughness:.45});e.push(M,S);const b=new ic(.6,.09,8,20);e.push(b);function T(E,I){const P=new ci,L=new ut(g,y);L.rotation.z=Math.PI/2,L.position.set(E*.72,-.08,.15),P.add(L);const z=E*1.45,O=new ut(M,S);O.rotation.x=Math.PI/2,O.position.set(z,-.08,.15),P.add(O);const $=new Jn({color:855826,metalness:.75,roughness:.3,emissive:I,emissiveIntensity:1.4}),k=new ut(b,$);k.position.copy(O.position),P.add(k),e.push($);const U=new ci;U.position.copy(O.position);for(let K=0;K<5;K++){const ie=new ut(x,p);ie.rotation.z=K/5*Math.PI,U.add(ie)}return P.add(U),{pod:P,rim:k,spokes:U}}const w=T(-1,2875596),R=T(1,15357964);n.add(w.pod,R.pod);const v=new li(2875596,2.2,14,2);return v.position.set(0,0,-1.4),n.add(v),{group:n,rotorL:w,rotorR:R,engineLight:v,disposables:e}}function iM(n=60){const e=new Ft,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new kt(t,3));const r=new Sr({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:ui,depthWrite:!1}),o=new tc(e,r);let c=0;function l(d,f,h,m){for(let g=0;g<m;g++){const y=c;c=(c+1)%n,i[y]=.4+Math.random()*.35,t[y*3]=d,t[y*3+1]=f,t[y*3+2]=h,s[y*3]=(Math.random()-.5)*3.2,s[y*3+1]=(Math.random()-.5)*3.2-1,s[y*3+2]=(Math.random()-.5)*3.2}}function u(d){for(let f=0;f<n;f++){if(i[f]<=0){t[f*3+1]=-9999;continue}i[f]-=d,t[f*3]+=s[f*3]*d,t[f*3+1]+=s[f*3+1]*d,t[f*3+2]+=s[f*3+2]*d,i[f]<=0&&(t[f*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:o,geo:e,mat:r,spawn:l,tick:u}}function sM({onDone:n,phases:e=Qv}){const t=j.useRef(null),i=j.useRef(null),s=j.useRef(null),r=j.useRef(null),o=j.useRef(null),c=j.useRef(null),l=j.useRef(null),u=j.useRef(n);u.current=n;const d=j.useRef(e);d.current=e;const f=j.useRef(()=>{});md();const h=j.useMemo(()=>e.map(m=>m.text).join(" → "),[e]);return j.useEffect(()=>{let m=!1,g=!1;const y=()=>{g||(g=!0,u.current())};f.current=y;const x=d.current,p=l.current,M=i.current,S=(M==null?void 0:M.getContext("2d"))??null;let b=[],T=0;function w(){M&&(M.width=window.innerWidth,M.height=window.innerHeight)}w();function R(Y,N){b=[];let ae=0;const oe=7;function A(D,F,G,Z,H,B){const V=3+Math.floor(Math.random()*4),se=[[D,F]];let ue=G,le=D,ce=F;for(let ve=0;ve<V;ve++){ue+=(Math.random()-.5)*.9;const Se=Z/V*(.55+Math.random()*.85);if(le+=Math.cos(ue)*Se,ce+=Math.sin(ue)*Se,se.push([le,ce]),H>0&&Math.random()<.58){const De=ue+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);A(le,ce,De,Z*(.3+Math.random()*.35),H-1,B*.76)}}b.push({pts:se,color:Yl[ae++%Yl.length],width:B})}for(let D=0;D<oe;D++){const F=Y*(.1+Math.random()*.8),G=N*(.08+Math.random()*.84),Z=7+Math.floor(Math.random()*7);let H=Math.random()*Math.PI*2;for(let B=0;B<Z;B++){H+=Math.PI*2/Z*(.55+Math.random()*.9);const V=Math.max(Y,N)*(.16+Math.random()*.46);A(F,G,H,V,2,.9)}}b.slice().forEach(D=>{if(D.pts.length<3||Math.random()>=.55)return;const[F,G]=D.pts[1+Math.floor(Math.random()*(D.pts.length-2))];A(F,G,Math.random()*Math.PI*2,Math.max(Y,N)*(.08+Math.random()*.22),1,.55)})}function v(Y){if(!S||Y<=0)return;const N=Math.min(1,Y/2.5),ae=Math.round(b.length*N);for(let oe=0;oe<ae;oe++){const A=b[oe];S.lineWidth=A.width*(.9+Y*.1),S.strokeStyle=A.color,S.globalAlpha=.7+Y*.07,S.shadowColor=A.color,S.shadowBlur=5+Y*2.4,S.beginPath(),A.pts.forEach(([_,D],F)=>F===0?S.moveTo(_,D):S.lineTo(_,D)),S.stroke()}S.globalAlpha=1,S.shadowBlur=0}function E(Y,N,ae){S&&(S.clearRect(0,0,N,ae),v(Y))}function I(Y=!1){const N=o.current;if(!N)return;const ae=Y?"fincine-hit-big":"fincine-hit";N.classList.remove("fincine-hit","fincine-hit-big"),N.offsetWidth,N.classList.add(ae)}function P(){p&&(p.currentTime=0,p.play().catch(()=>{}))}let L=null,z=null,O=null,$=0,k=!1,U=-1;const ie=document.createElement("canvas").getContext("2d");ie.font=`700 ${Sa}px "Rajdhani", sans-serif`;const pe=[],he=[];function me(Y,N,ae=1){const oe=Y.toUpperCase(),A=Sa*.05,_=Math.ceil(ie.measureText(oe).width),D=Math.max(200,_+140+A*2),F=document.createElement("canvas");F.width=D,F.height=Ys;const G=F.getContext("2d");G.font=`700 ${Sa}px "Rajdhani", sans-serif`,G.textAlign="center",G.textBaseline="middle",G.lineJoin="round",G.shadowColor=N,G.shadowBlur=60,G.strokeStyle="#eef6f4",G.lineWidth=A,G.strokeText(oe,D/2,Ys/2),G.fillStyle="#eef6f4",G.fillText(oe,D/2,Ys/2);const Z=new cu(F);Z.anisotropy=4;let H=D*Kl*ae,B=Ys*Kl*ae;if(H>Zl*ae){const V=Zl*ae/H;H*=V,B*=V}return{tex:Z,worldW:H,worldH:B}}function Pe(Y,N,ae,oe){const{tex:A,worldW:_,worldH:D}=me(Y,ae,oe),F=new Xi(_,D),G=new Vn({map:A,transparent:!0,depthWrite:!1,opacity:0}),Z=new ut(F,G);Z.position.set(0,8,N),Z.visible=!1,z.add(Z);const H=new ut(F,new Vn({map:A,transparent:!0,depthWrite:!1,blending:ui,color:2875596,opacity:0})),B=new ut(F,new Vn({map:A,transparent:!0,depthWrite:!1,blending:ui,color:16723804,opacity:0}));return H.position.copy(Z.position),B.position.copy(Z.position),H.visible=!1,B.visible=!1,z.add(H),z.add(B),he.push(F,G,A,H.material,B.material),{mesh:Z,ghostCy:H,ghostMg:B}}const ge={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let Be,re,X=null,Q=null,Me=0;function Le(){const Y=t.current;if(!Y)return;L=new Su({canvas:Y,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),L.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),z=new iu,z.fog=new yr(263946,.0012),O=new Gt(58,window.innerWidth/window.innerHeight,1,6e3),O.position.set(0,0,40),z.add(new pu(928300,1));const N=Io*x.length+600,ae=700,oe=new Ft,A=new Float32Array(ae*3),_=new Float32Array(ae*3),D=[2875596,10116351,15357964];for(let H=0;H<ae;H++){const B=60+Math.random()*280,V=Math.random()*Math.PI*2;A[H*3]=Math.cos(V)*B,A[H*3+1]=Math.sin(V)*B,A[H*3+2]=-Math.random()*N;const se=new Xe(D[H%D.length]);_[H*3]=se.r,_[H*3+1]=se.g,_[H*3+2]=se.b}oe.setAttribute("position",new kt(A,3)),oe.setAttribute("color",new kt(_,3));const F=new Sr({size:3,vertexColors:!0,transparent:!0,opacity:.8});z.add(new tc(oe,F)),he.push(oe,F),x.forEach((H,B)=>{const V=is(B),se="#"+H.light.toString(16).padStart(6,"0");pe.push(Pe(H.text,V,se,H.final?1.35:1));const ue=new li(H.light,2.6,950,2);ue.position.set(0,40,V+60),z.add(ue)}),Be=new li(15357964,3.4,550,2),re=new li(10116351,2.2,550,2),z.add(Be),z.add(re),X=nM(),O.add(X.group),X.group.position.set(1.3,-1,-6.5),Q=iM(),X.group.add(Q.points),he.push(Q.geo,Q.mat),z.add(O),k=!0,Ce();const G=Math.random()*1e3;ge.camZ=-Io*.6;function Z(H){if(!L||!z||!O||!X||!Q)return;const B=Me?Math.min(.05,(H-Me)/1e3):.016;Me=H;const V=.15+Math.min(1,Math.max(0,(U+1)/x.length))*.85,se=ge.impactT;se>0&&(ge.impactT=Math.max(0,se-B));const ue=Math.sin(H*.0016+G)*(1+V*2.2+se*6)+Math.sin(H*.0043)*.5*V,le=Math.cos(H*.002+G)*(.9+V*1.8+se*5)+Math.cos(H*.0038)*.45*V;O.position.x=ue+ge.camX,O.position.y=le+6,O.position.z=ge.camZ+ge.warpKick;const ce=ge.yawKick,ve=O.position.x+Math.sin(ce)*640,Se=ge.focusY??O.position.y-4;O.lookAt(ve,Se,ge.focusZ),O.rotateZ(-ce*.55);const De=58+ge.fovKick*(14+V*10)+se*24;Math.abs(O.fov-De)>.01&&(O.fov=De,O.updateProjectionMatrix()),Be.position.set(Math.sin(H*6e-4)*80,30,ge.camZ-120),re.position.set(Math.cos(H*7e-4)*80,-10,ge.camZ-200),ge.droneRoll=ge.droneRoll*.9+-ce*1.4*.1;const W=1.6+V*2.4;ge.droneBob=Math.sin(H*.001*W)*(.12+V*.35),X.group.rotation.z=ge.droneRoll*.6+(se>0?Math.sin(H*.09)*1.15*se:0),X.group.rotation.x=Math.sin(H*.0013)*.06*(1+V)+(se>0?Math.cos(H*.11)*.75*se:0);const _e=B*(6+V*10);X.rotorR.spokes.rotation.z+=_e;let de=-1+ge.droneBob;ge.engineOutT>0?(ge.engineOutT-=B,de-=1-Math.max(0,ge.engineOutT)/.5<1?Math.sin((.5-ge.engineOutT)*9)*.4:0,X.rotorL.spokes.rotation.z+=_e*.12,X.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&Q.spawn(-1.45,-.08,.15,2)):(X.rotorL.spokes.rotation.z+=_e,X.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(H*.01)*.3),X.group.position.y=de,X.group.position.x=1.3+Math.sin(H*9e-4)*.25*(1+V),X.group.position.z=-6.5-(se>0?se*2.6:0),Q.tick(B),pe.forEach(xe=>{xe.mesh.visible&&xe.mesh.quaternion.copy(O.quaternion),xe.ghostCy.visible&&xe.ghostCy.quaternion.copy(O.quaternion),xe.ghostMg.visible&&xe.ghostMg.quaternion.copy(O.quaternion)}),L.render(z,O),$=requestAnimationFrame(Z)}$=requestAnimationFrame(Z)}function Ce(){!k||!L||!O||(L.setSize(window.innerWidth,window.innerHeight),O.aspect=window.innerWidth/window.innerHeight,O.updateProjectionMatrix())}function qe(){Ce(),w(),R(window.innerWidth,window.innerHeight),E(T,window.innerWidth,window.innerHeight)}window.addEventListener("resize",qe,{passive:!0});function Ge(Y,N=600){const ae=U;U=Y;const oe=pe[Y];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const A=ae>=0?pe[ae]:null,_=performance.now();function D(){const F=Math.min(1,(performance.now()-_)/N);oe.mesh.material.opacity=F,A&&(A.mesh.material.opacity=1-F),F<1?requestAnimationFrame(D):A&&(A.mesh.visible=!1)}D()}function Je(Y=.5){if(U<0)return;const N=pe[U];if(!N)return;const ae=(14+Math.random()*12)*(.7+Y*.6),oe=Math.min(1,.45+Y*.3);N.ghostCy.visible=!0,N.ghostCy.material.opacity=oe,N.ghostCy.position.x=-ae,N.ghostMg.visible=!0,N.ghostMg.material.opacity=oe,N.ghostMg.position.x=ae,setTimeout(()=>{N.ghostCy.material.opacity=0,N.ghostCy.visible=!1,N.ghostCy.position.x=0,N.ghostMg.material.opacity=0,N.ghostMg.visible=!1,N.ghostMg.position.x=0},(120+Math.random()*90)*(.8+Y*.5)),Y>.75&&Math.random()<.65&&setTimeout(()=>Je(Y*.55),70+Math.random()*70)}async function $e(Y,N,ae,oe,A){const _=ge.camZ,D=ge.camX,F=performance.now();return ge.warpKick=(Math.random()-.5)*40,ge.yawKick=A*oe,ge.fovKick=1,new Promise(G=>{function Z(H){if(m){G();return}const B=Math.min(1,(H-F)/ae),V=tM(B);ge.camZ=_+(Y-_)*V,ge.camX=D+(N-D)*V,ge.warpKick*=.91,ge.yawKick*=.972,ge.fovKick*=.96,B<1?requestAnimationFrame(Z):G()}requestAnimationFrame(Z)})}function Ve(Y=1,N=420){if(!k||!S||!t.current)return;const ae=window.innerWidth,oe=window.innerHeight,A=performance.now()+N;function _(){if(performance.now()>A){E(T,ae,oe);return}S.clearRect(0,0,ae,oe),v(T);const F=5+Math.floor(Math.random()*9*Y);for(let Z=0;Z<F;Z++){const H=Math.random()*oe,B=4+Math.random()*56*Y,V=(Math.random()-.5)*150*Y;try{S.drawImage(t.current,0,H,ae,B,V,H,ae,B)}catch{}}S.globalCompositeOperation="screen";const G=Math.round(6*Y);for(let Z=0;Z<G;Z++){const H=Math.random()*oe;S.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],S.globalAlpha=.35+Math.random()*.35,S.lineWidth=.6+Math.random()*1.8,S.beginPath(),S.moveTo(0,H),S.lineTo(ae,H),S.stroke()}if(S.globalCompositeOperation="source-over",S.globalAlpha=1,Math.random()<Y*.14){S.globalAlpha=.5;for(let Z=0;Z<240;Z++)S.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",S.fillRect(Math.random()*ae,Math.random()*oe,2,2);S.globalAlpha=1}requestAnimationFrame(_)}_()}function dt(Y=1,N=340){if(!k||!S)return;const ae=window.innerWidth,oe=window.innerHeight,A=ae/2,_=oe/2,D=14+Math.floor(14*Y),F=Array.from({length:D},()=>Math.random()*Math.PI*2),G=performance.now();function Z(){const B=(performance.now()-G)/N;if(B>=1){E(T,ae,oe);return}S.save(),S.globalCompositeOperation="screen",F.forEach(V=>{const se=30+B*340,ue=se+100+Math.random()*170,le=A+Math.cos(V)*se,ce=_+Math.sin(V)*se,ve=A+Math.cos(V)*ue,Se=_+Math.sin(V)*ue;S.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",S.globalAlpha=(1-B)*(.3+Math.random()*.34)*Y,S.lineWidth=1.2+Math.random()*2,S.beginPath(),S.moveTo(le,ce),S.lineTo(ve,Se),S.stroke()}),S.restore(),requestAnimationFrame(Z)}Z()}async function ht(Y=900){const N=window.innerWidth,ae=window.innerHeight;if(!S)return;const oe=performance.now(),A=b.map(()=>Math.random()*.25);await new Promise(_=>{function D(){if(m){_();return}const F=Math.min(1,(performance.now()-oe)/Y);S.clearRect(0,0,N,ae),b.forEach((G,Z)=>{const H=Math.min(1,Math.max(0,(F-A[Z])/(1-A[Z])));if(H<=0)return;const B=G.pts,V=B.length-1,se=H*V;S.lineWidth=G.width*(1+F*.45),S.strokeStyle=G.color,S.globalAlpha=.65+F*.32,S.shadowColor=G.color,S.shadowBlur=3+F*6,S.beginPath(),S.moveTo(B[0][0],B[0][1]);for(let ce=0;ce<Math.floor(se);ce++)S.lineTo(B[ce+1][0],B[ce+1][1]);const ue=Math.floor(se),le=se-ue;if(ue<V&&le>0){const[ce,ve]=B[ue],[Se,De]=B[ue+1];S.lineTo(ce+(Se-ce)*le,ve+(De-ve)*le)}S.stroke()}),S.globalAlpha=1,S.shadowBlur=0,F<1?requestAnimationFrame(D):_()}D()})}async function mt(){ge.impactT=.55,I(!0),Q&&(Q.spawn(0,-.05,-2,28),Q.spawn(-1.45,-.08,.15,16),Q.spawn(1.45,-.08,.15,16)),Ve(1.6,340),dt(1.4,260),await ss(160)}async function Mt(){I(!0);const Y=c.current;if(!Y)return;Y.innerHTML="";const N=window.innerWidth,ae=window.innerHeight,oe=12,A=8,_=N/oe,D=ae/A,F=N/2,G=ae/2,Z=[];for(let H=0;H<A;H++)for(let B=0;B<oe;B++){const V=B*_,se=H*D,ue=()=>(Math.random()-.5)*16,le=document.createElement("div");le.className="fincine-shard",le.style.left=V+"px",le.style.top=se+"px",le.style.width=_+2+"px",le.style.height=D+2+"px",le.style.clipPath=`polygon(${ue()}px ${ue()}px, ${_+ue()}px ${ue()}px, ${_+ue()}px ${D+ue()}px, ${ue()}px ${D+ue()}px)`,Y.appendChild(le);const ce=V+_/2-F,ve=se+D/2-G,Se=Math.hypot(ce,ve)||1;Z.push({div:le,dx:ce/Se,dy:ve/Se,delay:Se/Math.max(N,ae)*200+Math.random()*70})}Z.forEach(({div:H,dx:B,dy:V,delay:se})=>{const ue=70+Math.random()*160,le=460+Math.random()*460,ce=(Math.random()-.5)*460;H.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${B*ue}px, ${V*ue-22}px) rotate(${ce*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${B*ue*1.4}px, ${V*ue+le}px) rotate(${ce}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:se,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await ss(1530),Y.innerHTML=""}async function ot(){if(R(window.innerWidth,window.innerHeight),Le(),P(),s.current&&s.current.classList.add("fincine-on"),await ss(900),!m){for(let Y=0;Y<x.length&&!m;Y++){const N=x[Y];T=N.crack,r.current&&(r.current.innerHTML=N.final?N.sub:`${N.sub} · рассинхрон канала <b>${N.crack}/4</b>`),Ge(Y),ge.focusZ=is(Y),N.final&&(ge.focusY=8);const ae=Y%2===0?1:-1;if(N.final){const oe=is(Y)+ql+280;if(await $e(oe,0,ba[Y]??2200,.35,ae),m||(Je(.4+N.crack*.2),Ve(Math.min(1.5,.45+N.crack*.27),300),E(T,window.innerWidth,window.innerHeight),await ss(700),await $e(is(Y)-eM,-150,950,.5,ae),m))return}else{const oe=ae*70,A=is(Y)+ql;if(N.crack>=2&&setTimeout(()=>{m||(ge.engineOutT=.5)},ba[Y]*.4),await $e(A,oe,ba[Y]??2200,.55+N.crack*.1,ae),m)return}Je(.4+N.crack*.2),Ve(Math.min(1.5,.45+N.crack*.27),N.final?360:240+N.crack*30),N.final||dt(.8+N.crack*.2,300+N.crack*20),N.crack>=3&&I(!0),E(T,window.innerWidth,window.innerHeight)}m||(await mt(),!m&&(await ht(850),!m&&(await ss(140),await Mt(),!m&&y())))}}return ot(),()=>{m=!0,window.removeEventListener("resize",qe),cancelAnimationFrame($),he.forEach(Y=>Y.dispose()),X==null||X.disposables.forEach(Y=>Y.dispose()),L==null||L.dispose();try{p==null||p.pause()}catch{}}},[]),a.jsxs("div",{className:"fincine-root",onClick:()=>f.current(),children:[a.jsx("canvas",{ref:t,className:"fincine-gl"}),a.jsx("canvas",{ref:i,className:"fincine-crack"}),a.jsx("div",{ref:c,className:"fincine-shatter-layer"}),a.jsx("div",{className:"fincine-vignette"}),a.jsx("div",{className:"fincine-scanlines"}),a.jsx("div",{ref:o,className:"fincine-noise"}),a.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!h,children:[a.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),a.jsx("div",{ref:r,className:"fincine-sub"})]}),a.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),a.jsx(Bo,{}),a.jsx("audio",{ref:l,src:"/quiz-party/intro.mp3",preload:"auto"})]})}function rM(n){const e=new Map;n.words.forEach((l,u)=>{for(let d=0;d<l.word.length;d++){const f=l.dir==="down"?l.row+d:l.row,h=l.dir==="across"?l.col+d:l.col,m=`${f},${h}`,g=e.get(m)??{r:f,c:h,words:[],ch:l.word[d].toUpperCase()};g.words.push(u),d===0&&(g.num=l.number),e.set(m,g)}});const t=[...e.values()],i=l=>n.words.findIndex(u=>u.number===l),s=l=>n.words[i(l)],r=l=>{const u=s(l),d=i(l);return u?t.filter(f=>f.words.includes(d)).sort((f,h)=>u.dir==="down"?f.r-h.r:f.c-h.c):[]},o=t.map(l=>l.r),c=t.map(l=>l.c);return{grid:n,cells:t,nums:[...n.words.map(l=>l.number)].sort((l,u)=>l-u),W:s,wordCells:r,cellNums:l=>l.words.map(u=>n.words[u].number),dirRu:l=>{var u;return((u=s(l))==null?void 0:u.dir)==="down"?"по вертикали":"по горизонтали"},bb:t.length?{r0:Math.min(...o),r1:Math.max(...o),c0:Math.min(...c),c1:Math.max(...c)}:{r0:0,r1:0,c0:0,c1:0}}}const mr=n=>Rh(n).replace(/\s/g,"");function aM(n,e,t){var o;const i=mr(e??""),s=i?n.words.filter(c=>mr(c.word)===i):[];if(s.length===1)return s[0].number;const r=n.words.find(c=>c.number===t+1);return r&&(!s.length||s.includes(r))?r.number:((o=s[0])==null?void 0:o.number)??(r==null?void 0:r.number)??null}function oM(n,e){return e.map((t,i)=>aM(n,t.answer.mode==="crossword_word"?t.answer.word:void 0,i))}function cM(n,e){const t=mr(n).toUpperCase(),i=mr(e).toUpperCase();return t.length>i.length+2?null:[...t].map((s,r)=>({ch:s,st:r>=i.length?"extra":s===i[r]?"ok":"bad"}))}const gr=n=>n.length>160?" xl xxl":n.length>70?" xl":n.length>40?" lg":"",wa={review:560,complete:660};function lM(n,e,t={}){const i=n.c1-n.c0+1,s=n.r1-n.r0+1;if(e==="question"){const c=t.right??1520,l=1920-c,u=Math.max(200,(t.bottom??876)-96),d=Math.max(24,Math.min(78,Math.floor((c-l)/i),Math.floor(u/s))),f=(l+c)/2;return{P:d,OX:f-i*d/2,OY:96+Math.max(0,(u-s*d)/2)}}if(e==="complete"){const o=Math.max(24,Math.min(66,Math.floor((t.maxW??924)/i),Math.floor(660/s)));return{P:o,OX:70,OY:200+Math.max(0,(660-s*o)/2)}}const r=Math.max(22,Math.min(56,Math.floor((t.maxW??784)/i),Math.floor(560/s)));return{P:r,OX:44,OY:310+Math.max(0,(560-s*r)/2)}}function Eu(n,e){const i=Math.max(40,Math.min(88,Math.floor(680/Math.max(1,n)))),s=Math.max(34,Math.min(62,Math.floor(704/Math.max(1,e+2)))),r=Math.min(s-8,i-10);return{ROW0:392,ROWH:i,COL:s,lt:r}}function dM(n,e){const t=Math.max(40,Math.min(92,Math.floor(740/Math.max(1,n)))),i=Math.max(26,Math.min(40,Math.floor(t-12),Math.floor(560/Math.max(1,e))-8));return{top:300,step:t,pip:i}}function uM(n){const e=n%10,t=n%100;return e===1&&t!==11?"команда":e>=2&&e<=4&&(t<12||t>14)?"команды":"команд"}const Do=1e3,ls=292,hM=Array.from({length:70},(n,e)=>({x:e*977%1900+10,y:e*613%1040+20,s:2+e%3,d:e%9*.6})),fM=[{x:60,y:80,w:860,h:860}];function Tu(n,e,t){const i=lM(n.bb,e,t);return{g:i,cx:o=>i.OX+(o-n.bb.c0)*i.P+i.P/2,cy:o=>i.OY+(o-n.bb.r0)*i.P+i.P/2,orb:i.P*(e==="complete"?.72:.62)}}function Au({m:n,mode:e,title:t,qn:i,qcount:s,cur:r,next:o=null,past:c,shown:l,curLit:u,clue:d,parts:f,lifts:h,tally:m,n:g,total:y,rootRef:x,cls:p="",bottom:M,right:S,maxW:b,side:T,timer:w=!0}){var re;const R=e!=="question",v=e==="complete",{cx:E,cy:I,orb:P}=Tu(n,e,{bottom:M,right:S,maxW:b}),L=r!=null?n.wordCells(r):[],z=new Set(L.map(X=>`${X.r},${X.c}`)),O=new Set(o!=null?n.wordCells(o).map(X=>`${X.r},${X.c}`):[]),$=X=>n.wordCells(X).map((Q,Me)=>`${Me?"L":"M"} ${E(Q.c)} ${I(Q.r)}`).join(" "),k=r!=null?((re=n.W(r))==null?void 0:re.word)??"":"",U=Eu(Math.max(1,...(f??[]).map(X=>X.rows.length)),Math.max(k.length,...(f??[]).map(X=>{var Q;return((Q=n.W(X.num))==null?void 0:Q.word.length)??0}))),K=U.ROWH===88&&U.COL===62&&U.lt===54,ie=K?void 0:{"--lt":`${U.lt}px`,"--ltf":`${Math.round(U.lt*.555)}px`,"--gap":`${U.COL-U.lt}px`},pe=X=>{const Q=n.cellNums(X),Me=`${X.r},${X.c}`,Le=Q.some(qe=>l(qe)),Ce=z.has(Me)&&!v;return v?"rev":Ce?u?"rev":R?"seal":"act":Le?"rev":Q.some(qe=>c(qe))?"seal":"cold"},he=X=>X.rows.map((Q,Me)=>a.jsxs("div",{className:`cwC-trow ${X.cls}`,"data-ti":Me,style:{top:U.ROW0+Me*U.ROWH-U.ROWH/2,...K?null:{height:U.ROWH,...ie},...X.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-nm ${X.cls}`,style:{color:Q.color},children:Q.name}),a.jsx("span",{className:"cwC-cells",children:X.covered?a.jsx("span",{className:"cwC-al",children:Array.from({length:n.W(X.num).word.length},(Le,Ce)=>a.jsx("i",{className:"cwC-lt cov",children:a.jsx("b",{className:"ch",style:{opacity:0},children:"•"})},Ce))}):a.jsx(mM,{answer:Q.answer,word:n.W(X.num).word,judged:X.judged})}),!X.covered&&X.judged&&a.jsx(gM,{v:Q.verdict})]},Q.key)),me=X=>a.jsxs("div",{className:`cwC-ans ${X.cls}`,style:{top:ls-44,...ie,...X.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-lab ${X.cls}`,children:"Правильный ответ"}),a.jsx("span",{className:"cwC-cells",children:a.jsx("span",{className:"cwC-al",children:[...n.W(X.num).word.toUpperCase()].map((Q,Me)=>a.jsx("i",{className:"cwC-lt ok big",children:a.jsx("b",{className:"ch",style:X.covered?{opacity:0}:void 0,children:Q})},Me))})})]}),Pe=X=>a.jsxs("div",{className:`cwC-rec ${X.cls}${gr(X.clue)}`,style:X.hidden?{opacity:0}:void 0,children:[a.jsxs("em",{children:["Разбор · слово ",X.num," · ",n.dirRu(X.num),X.recExtra??""]}),X.clue,X.note?a.jsx("span",{className:"cwC-rnote",children:X.note}):null]}),ge=m?dM(m.rows.length,n.nums.length):null,Be=!ge||ge.step===92&&ge.pip===40;return a.jsxs(mn,{rects:fM,n:g,rootRef:x,cls:`s3 cw cwC ${p}`,children:[ko(t,i,s),a.jsx("div",{className:"cwC-dust","aria-hidden":!0,children:hM.map((X,Q)=>a.jsx("i",{style:{left:X.x,top:X.y,width:X.s,height:X.s,animationDelay:`${X.d}s`}},Q))}),a.jsxs("div",{className:"cwC-map",children:[a.jsxs("svg",{className:"cwC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[n.nums.map(X=>{const Q=v||c(X),Me=X===r&&!v;return a.jsx("path",{className:`cwC-line${Me?" now":Q?" old":""}`,"data-n":X,...X===o?{"data-nx":1}:{},d:$(X)},X)}),h&&L.map((X,Q)=>{const Me=Do+Q*U.COL+U.COL/2,Le=E(X.c),Ce=I(X.r);return a.jsx("path",{className:"cwC-beam","data-k":Q,d:`M ${Le} ${Ce} C ${Le+120} ${Ce} ${Me-160} ${ls} ${Me} ${ls}`},Q)})]}),n.cells.map(X=>{const Q=n.cellNums(X),Me=`${X.r},${X.c}`,Le=z.has(Me)&&!v,Ce=L.findIndex(qe=>qe===X);return a.jsxs("div",{className:`cwC-orb ${pe(X)}${X.words.length>1?" x":""}`,"data-n":Q.join(" "),style:{left:E(X.c)-P/2,top:I(X.r)-P/2,width:P,height:P,"--d":`${(X.r*3+X.c)%7*.5}s`},...Le&&R?{"data-cur":1,"data-k":Ce,...Q.some(qe=>l(qe))?{"data-old":1}:{}}:{},...O.has(Me)?{"data-nx":1}:{},children:[X.words.length>1&&a.jsx("i",{className:"flare"}),a.jsx("span",{className:"core",children:a.jsx("b",{className:"ch",style:{fontSize:P*.56},children:X.ch})}),X.num&&a.jsx("em",{className:"num",style:{left:-P*.1,top:-P*.28},children:X.num})]},Me)})]}),T,!R&&d&&a.jsxs("div",{className:"cwC-clue",children:[r!=null&&a.jsxs("div",{className:"k",children:["слово ",r," · ",n.dirRu(r)," · ",k.length," ",pM(k.length)]}),a.jsx("div",{className:`t${gr(d.text)}`,children:d.text}),d.answer?a.jsx("div",{className:"cwC-open",children:d.answer}):null,d.note?a.jsx("div",{className:"cwC-note",children:d.note}):null]}),R&&!v&&f&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cwC-veil"}),f.map(X=>a.jsxs(j.Fragment,{children:[Pe(X),me(X),he(X),X.cls==="p1"&&h&&L.map((Q,Me)=>a.jsx("div",{className:"cwC-lift","data-k":Me,style:{left:Do+Me*U.COL,top:ls-U.lt/2,...K?null:{width:U.lt,height:U.lt,...ie}},children:a.jsx("i",{className:"cwC-lt ok big"})},"l"+Me))]},X.cls+X.num))]}),v&&m&&a.jsxs("div",{className:"cwC-tally",children:[a.jsxs("div",{className:"cwC-rec pd",children:[a.jsx("em",{children:"Кроссворд разгадан"}),"Угадано слов из ",n.nums.length]}),m.rows.map((X,Q)=>a.jsxs("div",{className:"cwC-tr",style:{top:ge.top+Q*ge.step,...Be?null:{height:Math.min(80,ge.step),"--pip":`${ge.pip}px`,"--pipf":`${Math.round(ge.pip/2)}px`}},children:[a.jsx("span",{className:"cwC-nm",style:{color:X.color},children:X.name}),a.jsx("span",{className:"pips",children:n.nums.map((Me,Le)=>a.jsx("i",{className:X.pips[Le]===!0?"ok":X.pips[Le]===!1?"no":"nil",children:Me},Me))}),a.jsx("b",{className:"sum",children:X.sum})]},X.key))]}),!R&&w&&a.jsx(zo,{n:g,total:y})]})}const pM=n=>{const e=n%10,t=n%100;return e===1&&t!==11?"буква":e>=2&&e<=4&&(t<12||t>14)?"буквы":"букв"};function mM({answer:n,word:e,judged:t=!0}){if(n==null)return a.jsx("span",{className:"cwC-none",children:"не ответили"});const i=cM(n,e);if(!i)return a.jsx("span",{className:`cwC-txt${gr(n)}`,children:a.jsx("b",{className:"ch",children:n})});const s=Math.max(e.length,i.length);return a.jsx("span",{className:"cwC-al",children:Array.from({length:s},(r,o)=>{const c=i[o];return a.jsx("i",{className:`cwC-lt ${c?t?c.st:"neu":"miss"}`,children:a.jsx("b",{className:"ch",children:(c==null?void 0:c.ch)??""})},o)})})}function gM({v:n}){return a.jsx("span",{className:`cwC-mk ${n===!0?"ok":n===!1?"no":"nil"}`,children:n===!0?a.jsxs(a.Fragment,{children:[a.jsx("b",{children:"✓"}),a.jsx("em",{children:"+1"})]}):n===!1?a.jsx("b",{children:"✗"}):a.jsx("b",{children:"—"})})}function xM(n,e,t){const i=gr(n),s=i.includes("xxl")?31:i.includes("xl")?38:i.includes("lg")?44:52,o=40+Math.max(1,Math.ceil(n.length/(1260/(s*.52))))*s*1.14+(e?62:0)+(t?Math.ceil(t.length/90)*30:0);return Math.round(1046-o-24)}function _M({m:n,title:e,qn:t,qcount:i,cur:s,past:r,clue:o,answer:c,note:l,n:u,total:d,side:f,sideN:h}){const m=j.useRef(null),g=j.useMemo(()=>nt.utils.selector(m),[]),y=xM(o,!!c,c?l:""),x=h?1300:void 0;j.useLayoutEffect(()=>{const b=nt.timeline();return b.fromTo(g(".cwC-dust i"),{opacity:0},{opacity:1,duration:1,stagger:.01},0).fromTo(g(".cwC-line"),{strokeDashoffset:900},{strokeDashoffset:0,duration:1.2,stagger:.08,ease:"power2.out"},.2).fromTo(g(".cwC-orb"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,stagger:{each:.016,from:"random"},ease:"back.out(2)"},.4).fromTo(g(".cwC-clue"),{y:30,opacity:0},{y:0,opacity:1,duration:.7},1.2).fromTo(g(".cwC-side"),{opacity:0},{opacity:1,duration:.7},.8),()=>{b.kill()}},[]);const p=!!c,M=j.useRef(p);j.useLayoutEffect(()=>{if(!p||M.current){M.current=p;return}M.current=!0;const b=nt.timeline();return b.fromTo(g(".cwC-orb.rev .ch"),{opacity:0},{opacity:1,duration:.4,stagger:.1},0).fromTo(g(".cwC-open, .cwC-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5,stagger:.15},.3),()=>{b.kill()}},[p]);const S=h>0&&f?a.jsx("div",{className:`cwC-side${h>2?" grid":""}`,style:{left:1340,right:40,top:110,height:Math.max(180,y-130)},children:f}):null;return a.jsx(Au,{m:n,mode:"question",title:e,qn:t,qcount:i,cur:s,past:b=>r.has(b),shown:()=>!1,curLit:p,clue:{text:o,answer:c??void 0,note:c&&l?l:void 0},n:u,total:d,rootRef:m,cls:`st-question${p?" open":""}`,bottom:y,right:x,side:S})}function vM({m:n,title:e,qn:t,qcount:i,cur:s,reviewed:r,revealed:o,checked:c,clue:l,note:u,rows:d,answered:f,tally:h,side:m,sideN:g}){var L;const y=j.useRef(null),x=j.useMemo(()=>nt.utils.selector(y),[]),[p,M]=j.useState(o?"open":"covered"),[S,b]=j.useState(!1);j.useEffect(()=>{o?p==="covered"&&M("anim"):M("covered")},[o]);const T=c&&p==="open",w=S&&h?"complete":"review",R=s!=null?((L=n.W(s))==null?void 0:L.word)??"":"",v=Eu(d.length,R.length);j.useLayoutEffect(()=>{const z=nt.timeline();return z.fromTo(x(".cwC-veil"),{opacity:0},{opacity:1,duration:.6},0).fromTo(x(".cwC-rec, .cwC-lab, .cwC-nm, .cwC-trow, .cwC-ans, .cwC-side"),{opacity:0,y:-14},{opacity:1,y:0,duration:.5,stagger:.03},.1),()=>{z.kill()}},[]),j.useLayoutEffect(()=>{if(p!=="anim"||s==null)return;const z=n.wordCells(s),O=Math.max(1,z.length),{cx:$,cy:k,orb:U}=Tu(n,"review",{maxW:wa.review}),K=nt.timeline({onComplete:()=>M(me=>me==="anim"?"open":me)});K.fromTo(x(".cwC-ans .ch, .cwC-trow .ch"),{opacity:0},{opacity:0,duration:.01},0).fromTo(x(".cwC-ans .cwC-lt, .cwC-trow .cwC-lt, .cwC-trow .cwC-none, .cwC-trow .cwC-txt"),{opacity:0,scale:.4},{opacity:0,scale:.4,duration:.01},0);const ie=Math.min(.12,.5/O);z.forEach((me,Pe)=>{const ge=x(`.cwC-lift[data-k="${Pe}"]`)[0],Be=$(me.c)-(Do+Pe*v.COL+v.lt/2),re=k(me.r)-ls,X=.1+Pe*ie,Q=X+.9;ge&&K.fromTo(ge,{x:Be,y:re,scale:U/v.lt,opacity:1},{keyframes:[{x:Be*.4,y:re*.4-60,scale:1.1,duration:.5,ease:"sine.inOut"},{x:0,y:0,scale:1,duration:.4,ease:"power2.out"}]},X).to(ge,{opacity:0,duration:.15},Q),K.fromTo(x(`.cwC-beam[data-k="${Pe}"]`),{strokeDashoffset:600,opacity:0},{strokeDashoffset:0,opacity:.9,duration:.5,ease:"power1.out"},X).to(x(`.cwC-beam[data-k="${Pe}"]`),{opacity:0,duration:.4},Q-.1).fromTo(x(`.cwC-ans .cwC-lt:nth-child(${Pe+1})`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2},Q).fromTo(x(`.cwC-ans .cwC-lt:nth-child(${Pe+1}) .ch`),{opacity:0},{opacity:1,duration:.2},Q).fromTo(x(`.cwC-orb[data-cur][data-k="${Pe}"]`),{"--on":0,"--glow":.6},{"--on":1,"--glow":1,duration:.35,ease:"power1.out"},Q)});const pe=Math.max(.1+(O-1)*ie+.9+.5,2),he=Math.min(.55,2.4/Math.max(1,d.length));return d.forEach((me,Pe)=>{K.fromTo(x(`.cwC-trow[data-ti="${Pe}"] .cwC-lt, .cwC-trow[data-ti="${Pe}"] .cwC-none, .cwC-trow[data-ti="${Pe}"] .cwC-txt`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.3,stagger:.04,ease:"back.out(2)"},pe+Pe*he).fromTo(x(`.cwC-trow[data-ti="${Pe}"] .ch`),{opacity:0},{opacity:1,duration:.25,stagger:.04},pe+Pe*he+.1)}),K.to({},{duration:.3}),()=>{K.kill()}},[p]),j.useLayoutEffect(()=>{if(!T||w!=="review")return;const z=nt.timeline();return z.fromTo(x(".cwC-mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:.12,ease:"back.out(2.5)"},0),()=>{z.kill()}},[T]);const E=!!h&&T;j.useEffect(()=>{if(!E){b(!1);return}const z=setTimeout(()=>b(!0),8e3);return()=>clearTimeout(z)},[E]),j.useLayoutEffect(()=>{if(w!=="complete")return;const z=nt.timeline();return z.fromTo(x(".cwC-orb"),{"--glow":.4,scale:1},{"--glow":1,scale:1.12,duration:.5,yoyo:!0,repeat:1,stagger:{each:.02,from:"center"}},.2).fromTo(x(".cwC-tally > *"),{opacity:0,x:20},{opacity:1,x:0,duration:.45,stagger:.1},.6),()=>{z.kill()}},[w]);const I=p==="covered",P=s!=null?[{num:s,cls:"p1",covered:I,clue:l,judged:T,recExtra:I&&d.length?` · ответили ${f} ${uM(f)}`:"",note:T&&u?u:void 0,rows:d.map(z=>({...z,verdict:T?z.verdict:null}))}]:[];return a.jsx(Au,{m:n,mode:w,title:e,qn:t,qcount:i,cur:s,past:z=>r.has(z),shown:z=>r.has(z),curLit:p==="open",parts:P,lifts:p==="anim",tally:w==="complete"&&h?{rows:h}:void 0,n:null,total:1,rootRef:y,cls:`st-${w==="complete"?"complete":"review"} rev`,timer:!1,maxW:w==="complete"?wa.complete:wa.review,side:w==="review"&&g>0&&m?a.jsx("div",{className:`cwC-side${g>1?" row":""}`,style:{left:44,top:96,width:540,height:190},children:m}):void 0})}const MM=n=>/\.(mp3|mp4|webm|wav)$/i.test(n),Jl=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n),sc=n=>{var e;return((e=n.settings)==null?void 0:e.grid)??null};function Cu(n){const e=sc(n),t=j.useMemo(()=>rM(e),[e]),i=j.useMemo(()=>oM(e,n.questions),[e,n.questions]);return{m:t,nums:i}}const Ru=(n,e)=>a.jsx("div",{className:"cwC-sc",children:a.jsx("img",{src:n,alt:""})},e);function yM({pack:n,round:e,q:t,qIndex:i,qCount:s,gameState:r,effectsSlot:o,actionsSlot:c}){var v;const{m:l,nums:u}=Cu(e),d=r.timer_started_at,f=pd(d,e.timer_seconds,!0),m=((v=n.settings)!=null&&v.answers_reveal&&e.answers_reveal==="after_question",e.answers_reveal??"after_round")==="after_question"&&r.reveal,g=new Set(u.slice(0,i).filter(E=>E!=null)),y=t.media.question??[],x=t.media.hidden?[]:y.filter(E=>!MM(E)),p=y.filter(E=>/\.(mp4|webm)$/i.test(E)),M=t.media.answer??[],S=m?M.filter(E=>!Jl(E)):[],b=m?M.find(Jl):void 0,T=S.length?S:x,w=t.answer.mode==="crossword_word"?t.answer.word:"",R=[...T.slice(0,4).map((E,I)=>Ru(He(E),I)),...t.media.hidden?[]:p.map((E,I)=>a.jsx("div",{className:"cwC-sc",children:a.jsx(wc,{src:He(E),hidden:!1,waitFor:!!t.media.voice,go:!!d})},"v"+I))];return a.jsxs(a.Fragment,{children:[a.jsx(Bo,{}),o,b&&a.jsx(rs,{src:He(b)}),t.media.hidden&&p.map((E,I)=>a.jsx(wc,{src:He(E),hidden:!0,waitFor:!!t.media.voice,go:!!d},I)),a.jsx(_M,{m:l,title:e.title_lines.join(" "),qn:i+1,qcount:s,cur:u[i]??null,past:g,clue:t.question_text.trim(),answer:m?w.toUpperCase():null,note:t.answer_note??"",n:d?f.left:e.timer_seconds,total:e.timer_seconds,side:R,sideN:R.length}),c]})}function bM({pack:n,round:e,q:t,step:i,answers:s,teams:r,allTeams:o,revealed:c,checked:l,paper:u,effects:d,imgs:f,video:h,actions:m}){const{m:g,nums:y}=Cu(e),x=(E,I)=>I?I.is_correct??Li(E.answer,I.answer_text):null,p=s.filter(E=>E.question_ref===`q-${t.id}`),M=[...r,...o.filter(E=>!r.some(I=>I.id===E.id)&&s.some(I=>I.team_id===E.id))],S=E=>Bi(Tn(E)),b=u?[]:M.map(E=>{var L;const I=p.find(z=>z.team_id===E.id),P=((L=I==null?void 0:I.answer_text)==null?void 0:L.trim())||null;return{key:E.id,name:`${"icon"in E&&E.icon?`${E.icon} `:""}${E.name}`,color:S(E.color),answer:P,verdict:x(t,I)}}),T=p.filter(E=>{var I;return(I=E.answer_text)==null?void 0:I.trim()}).length,w=new Set(y.slice(0,i).filter(E=>E!=null)),R=i>=e.questions.length-1;let v=null;return R&&!u&&M.length&&(v=M.map((E,I)=>{const P=g.nums.map(L=>{const z=y.indexOf(L),O=e.questions[z];return O?x(O,s.find($=>$.question_ref===`q-${O.id}`&&$.team_id===E.id)):null});return{key:E.id,name:E.name,color:S(E.color),pips:P,sum:P.filter(L=>L===!0).length,i:I}}).sort((E,I)=>I.sum-E.sum||E.i-I.i)),a.jsxs(a.Fragment,{children:[d,a.jsx(vM,{m:g,title:e.title_lines.join(" "),qn:i+1,qcount:e.questions.length,cur:y[i]??null,reviewed:w,revealed:c,checked:l,clue:t.question_text.trim(),note:t.answer_note??"",rows:b,answered:T,tally:v,side:[...h?[a.jsx("div",{className:"cwC-sc",children:h},"v")]:[],...f.slice(0,h?1:2).map((E,I)=>Ru(He(E),I))],sideN:Math.min(2,f.length+(h?1:0))}),m]})}const Ea={top:92,bottom:1050,head:56};function SM(n){if(n<=7)return{cols:1,rowH:null,gap:8,nameFs:21,txtFs:32,mk:56,txtLines:2,padL:44};const e=n<=12?1:2,t=Math.ceil(n/e),i=n<=12?6:5,s=Math.floor((Ea.bottom-Ea.top-Ea.head-i*(t-1))/t),r=Math.min(1,s/118);return e===1?{cols:e,rowH:s,gap:i,nameFs:Math.round(Math.max(15,21*Math.sqrt(r))),txtFs:Math.round(Math.max(20,32*r)),mk:Math.round(Math.max(30,56*r)),txtLines:s>=90?2:1,padL:34}:{cols:e,rowH:s,gap:i,nameFs:s>=60?15:13,txtFs:s>=60?20:17,mk:s>=60?30:24,txtLines:1,padL:22}}const ln={width:1800,gap:10,labH:100};function Nu(n){if(n<=0)return{cols:0,rows:0,cw:null,rowH:0,gap:0,nameFs:17,txtFs:25,mk:34,lift:0,height:0};if(n===6)return{cols:6,rows:1,cw:null,rowH:ln.labH,gap:10,nameFs:17,txtFs:25,mk:34,lift:0,height:ln.labH};const e=n<=6?1:n<=12?2:n<=24?3:4,t=Math.ceil(n/e),i=(ln.width-ln.gap*5)/6,s=Math.min(e===1?i:440,Math.floor((ln.width-ln.gap*(t-1))/t)),r=e===1?ln.labH:e===2?56:e===3?40:32,o=e===1?10:6,c=e*r+(e-1)*o,l=e===1?[17,25,34]:e===2?[15,21,30]:e===3?[13,17,24]:[12,15,22];return{cols:t,rows:e,cw:s,rowH:r,gap:o,nameFs:l[0],txtFs:l[1],mk:l[2],lift:Math.max(0,c-ln.labH),height:c}}function rc(n,e,t,i,s=Math.round(t*.6),r=.52){const o=Math.max(1,n.length);for(let c=t;c>s;c-=1)if(Math.ceil(o*r*c/e)<=i)return c;return s}const Pu="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",Lu=(n,e)=>n.text==null?"nil":e?n.ok===!0?"ok":n.ok===!1?"no":"un":"un",Iu=n=>n==="ok"?"✓":n==="no"?"✗":n==="nil"?"—":null,Du=n=>n.stake!=null&&n.stake!==0&&n.text!=null?a.jsxs("small",{className:"stk",children:[" · ",n.stake]}):null;function wM({rows:n,phase:e="all",judged:t=!0,lay:i,count:s}){const r=!!i,o=i?{"--rh":`${i.rowH??118}px`,"--gap":`${i.gap}px`,"--nfs":`${i.nameFs}px`,"--tfs":`${i.txtFs}px`,"--mks":`${i.mk}px`,"--tl":i.txtLines,"--pl":`${i.padL}px`,"--cols":i.cols}:void 0,c=i?(580-(i.cols-1)*12)/i.cols-i.padL-i.mk-30:0;return a.jsxs("div",{className:`s4-teams${r?` g c${i.cols}`:""}`,style:o,children:[a.jsxs("div",{className:"s4-th",children:["Ответы команд",s!=null&&a.jsx("span",{className:"s4-cnt",children:s})]}),n.map((l,u)=>{const d=Lu(l,t),f=e==="all"||t?Iu(d):null,h=l.text??"не ответили",m=r&&l.text!=null?rc(h,c,i.txtFs,i.txtLines):void 0;return a.jsxs("div",{className:`s4-ta ${d}`,"data-i":u,children:[a.jsx("svg",{className:"s4-ta-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Pu})}),a.jsx("span",{className:"nm",style:{color:l.color},children:l.name}),e!=="open"&&a.jsx("span",{className:"dots",children:"• • •"}),e!=="dots"&&a.jsxs("span",{className:"txt",style:m&&m!==i.txtFs?{fontSize:m}:void 0,children:[h,Du(l)]}),(e==="all"||f!=null)&&a.jsx("i",{className:"mk",children:f})]},l.key)})]})}function Uu({rows:n,top:e=958,phase:t="all",judged:i=!0,lay:s,count:r}){const o=!!s,c={top:e};s&&Object.assign(c,{"--cols":s.cols,"--cw":s.cw!=null?`${s.cw}px`:"1fr","--rh":`${s.rowH}px`,"--gap":`${s.gap}px`,"--nfs":`${s.nameFs}px`,"--tfs":`${s.txtFs}px`,"--mks":`${s.mk}px`});const l=s?s.cw??(ln.width-ln.gap*5)/6:0;return a.jsxs(a.Fragment,{children:[r!=null&&a.jsx("div",{className:"s4-scnt",style:{top:e-40},children:r}),a.jsx("div",{className:`s4-strip${o?` g r${s.rows}`:""}`,style:c,children:n.map(u=>{const d=Lu(u,i),f=t==="all"||i?Iu(d):null,h=u.text??"не ответили",m=o&&u.text!=null?rc(h,l-s.mk-40,s.txtFs,1):void 0;return a.jsxs("div",{className:`s4-sl ${d}`,children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Pu})}),a.jsx("span",{className:"nm",style:{color:u.color},children:u.name}),o&&t!=="open"&&t!=="all"&&a.jsx("span",{className:"dots",children:"• • •"}),t!=="dots"&&a.jsxs("span",{className:"txt",style:m&&m!==s.txtFs?{fontSize:m}:void 0,children:[h,Du(u)]}),(t==="all"||f!=null)&&a.jsx("i",{className:"mk",children:f})]},u.key)})})]})}const EM="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",TM={text:"revtext",mc:"revmc",img:"revimg",imgopt:"revimgopt"},Uo={top:84,width:1160};function Fu(n){const e=(t,i)=>Math.ceil(Math.max(1,n.length)*.5*t/Uo.width)<=i;for(const[t,i]of[[40,3],[34,4],[30,5]])if(e(t,i))return t;return 26}const AM=(n,e=Fu(n))=>Uo.top+Math.ceil(Math.max(1,n.length)*.5*e/Uo.width)*e*1.14;function Ta(n,e,t,i,s=40){const r=n.toUpperCase().split(/\s+/).filter(Boolean);for(let o=t;o>=s;o-=2){const c=d=>d.length*(.66*o+6);if(r.some(d=>c(d)>e))continue;let l=1,u=0;for(const d of r){const f=(u?.35*o:0)+c(d);u&&u+f>e?(l++,u=c(d)):u+=f}if(l*o<=i)return{fs:o,lines:l}}return{fs:s,lines:3}}function CM(n,e=0){var h;const t=Fu(n.question),i=AM(n.question,t),s=Math.max(190,Math.round(i+22));let r=[],o=[];if(n.kind==="img"&&n.photos.length){const m=n.photos.slice(0,4),g=((h=n.captions)!=null&&h.length?620:710)-s;if(m.length===1&&!m[0].video)r=[Qs(m[0],380+e,s,640,880-s)];else if(m.length===1)r=[Qs(m[0],650+e,s,900,g)];else{const x=m.reduce((T,w)=>T+w.w/w.h,0),p=Math.round(Math.min(g,(1160-40*(m.length-1))/x)),M=m.map(T=>Math.round(T.w/T.h*p)),S=M.reduce((T,w)=>T+w,0)+40*(m.length-1);let b=Math.round(650+e-S/2);r=M.map(T=>{const w={x:b,y:s,w:T,h:p};return b+=T+40,w})}o=m.map(y=>y.video?EM:y.src)}if(n.kind==="imgopt"&&n.photos.length){const m=n.photos.length,g=m<=3?m:m===4?2:3,y=Math.ceil(m/g),x=1200/g,p=(890-s+40)/y;r=n.photos.map((M,S)=>Qs(M,60+e+x*(S%g+.5),Math.round(s+Math.floor(S/g)*p),x-80,Math.min(520,p-40))),o=n.photos.map(M=>M.src)}const c=Math.max(1,n.options.length),l=1160/c,u=n.kind==="img"&&n.photos.length===1&&!n.photos[0].video,d=u?Ta(n.answer,540,330,104):n.kind==="img"?Ta(n.answer,1160,104,150):Ta(n.answer,1160,150,250),f=u?Math.max(s+70,s+Math.round(r[0].h/2)-40):0;return{side:u,sideTop:f,dx:e,recallFs:t,frame:{rects:r,srcs:o},ans:d,ansBase:n.kind==="img"?104:150,cx:m=>70+e+l*(m+.5),optW:Math.min(270,Math.round(l-20)),flower:Math.min(1,l/290),optFs:Math.min(32,...n.options.map(m=>rc(m.text,Math.min(270,Math.round(l-20)),32,3,20,.56))),noteTop:n.kind==="text"?730:n.kind==="mc"?900:992}}function RM(n,e){n.fromTo(e(".s4-recall"),{opacity:0,y:-10},{opacity:1,y:0,duration:.5},.1)}function NM(n,e){n.fromTo(e(".s4-th, .s4-ta"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.07},.3).fromTo(e(".s4-ta .txt, .s4-ta .mk"),{opacity:0},{opacity:0,duration:.01},.3)}function PM(n,e,t){n.to(e(".s4-ta .dots"),{opacity:0,duration:.3,stagger:.06},t).fromTo(e(".s4-ta .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.07},t)}function LM(n,e,t,i=.2){n.fromTo(e(".s4-ta .mk"),{opacity:0,scale:0,rotation:-40},{opacity:1,scale:1,rotation:0,duration:.4,stagger:i,ease:"back.out(2.4)"},t)}const Ou=n=>n.replace(/\s/g,"").length;function IM(n,e,t,i,s,r=!1){const{R:o,k:c}=s,l=Ou(t.answer);if(t.kind==="text")return n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},o-.4).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},o).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},o+.1).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1.2},o+.6).fromTo(e(".s4-fl"),{scale:0,rotation:-60},{scale:1,rotation:0,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},o+l*c+.3),{show:o+.9,mark:o+l*c+1.2};if(t.kind==="mc"){const d=t.correct;return t.options.forEach((f,h)=>{h===d?n.fromTo(e(`.s4-mf[data-i="${h}"]`),{scale:1},{scale:1.25,svgOrigin:"0 0",duration:.9,ease:"back.out(2)"},o+.9).fromTo(e(`.s4-mf[data-i="${h}"] .pt`),{fill:"#c9b6ff"},{fill:"#ffd986",duration:.9},o+.9).fromTo(e(`.s4-halo[data-i="${h}"]`),{opacity:0,attr:{r:36}},{opacity:1,attr:{r:124},duration:.9,ease:"power2.out"},o+.9).fromTo(e(`.s4-opt[data-i="${h}"]`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.6},o+1):d>=0&&n.to(e(`.s4-mf[data-i="${h}"]`),{scale:.62,rotation:h%2?-16:16,svgOrigin:"0 0",duration:1,ease:"power2.inOut"},o+.2+h*.1).to(e(`.s4-mf[data-i="${h}"] .pt`),{fill:"#5d5a7a",duration:1},o+.2+h*.1).to(e(`.s4-opt[data-i="${h}"]`),{opacity:.45,duration:.8},o+.3+h*.1)}),n.fromTo(e(".s4-gl"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.3,ease:"power1.in"},o),{show:o+.9,mark:o+2.3}}if(t.kind==="img"){const d=s.lt??o+1.1,f=i.bloom.map((m,g)=>g),h=m=>Object.fromEntries(f.map(g=>[g,m]));return r&&f.length&&n.fromTo(i.grow,h(0),{...h(1),duration:.6,ease:"power2.out"},o).fromTo(i.reveal,h(0),{...h(1),duration:.6,ease:"power2.inOut"},o+.2),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o),f.length&&n.fromTo(i.bloom,h(0),{...h(1),duration:1.4,ease:"power1.out"},o+.6),n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},d-.3).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},d-.1).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},d).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1},d+.3),{show:d+.5,mark:d+1.9}}const u=t.correct;return t.photos.forEach((d,f)=>{f===u?n.fromTo(i.bloom,{[f]:0},{[f]:1,duration:1.4,ease:"power1.out"},o+.8):u>=0&&n.fromTo(i.reveal,{[f]:1},{[f]:0,duration:1.1,ease:"power2.in"},o+.2+f*.12)}),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o+.5).fromTo(e(".s4-capt"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},o+1.8),{show:o+1.4,mark:o+2.8}}const Ql=(n,e,t,i)=>Array.from({length:n},(s,r)=>a.jsx("g",{transform:`rotate(${r*360/n})`,children:a.jsx("ellipse",{className:"pt",cx:"0",cy:i,rx:e,ry:t})},r));function Aa(n){const e=n.toUpperCase().split(/\s+/).filter(Boolean);return e.length<=1?(e[0]??"").split("").map((t,i)=>a.jsx("span",{className:"l",children:t},i)):e.map((t,i)=>a.jsx("span",{className:"wd",children:t.split("").map((s,r)=>a.jsx("span",{className:"l",children:s},r))},i))}function DM({d:n,ly:e,fs:t,rows:i,phase:s="all",judged:r=!0,colLay:o,count:c,shown:l=!0,n:u=null,rootRef:d,cls:f="",video:h}){const{dx:m}=e,g=w=>w+m,y=[{x:g(40),y:80,w:1220,h:900},...i?[{x:1270,y:90,w:620,h:860}]:[]],x=e.recallFs!==40?{fontSize:e.recallFs,left:g(70)}:m?{left:g(70)}:void 0,p=w=>({left:g(70),width:1160,top:w,...e.ans.fs!==e.ansBase?{fontSize:e.ans.fs}:{}}),M=n.answer.trim().includes(" ")?" wrap":"",S=n.correct,b=n.kind==="img"?n.photos.findIndex(w=>w.video):-1,T=b>=0?e.frame.rects[b]:null;return a.jsxs(mn,{rects:y,n:u,rootRef:d,cls:`s3 s4 st-${TM[n.kind]}${f}`,children:[a.jsxs("div",{className:"s3-head",children:[a.jsx("b",{children:n.title}),a.jsxs("span",{children:["разбор · вопрос ",n.qn," / ",n.qcount]})]}),e.frame.rects.length>0&&a.jsx(Nd,{rects:e.frame.rects,srcs:e.frame.srcs,fs:t}),n.kind==="text"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:x,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:g(120),top:330,width:1060,height:340}}),a.jsx("div",{className:"s4-lab",style:{left:g(70),width:1160,top:300},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans${M}`,style:p(350),children:Aa(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${g(250)} 650 C ${g(380)} 690 ${g(520)} 620 ${g(650)} 660 S ${g(920)} 690 ${g(1020)} 640`}),a.jsx("path",{className:"s4-vine-light",d:`M ${g(250)} 650 C ${g(380)} 690 ${g(520)} 620 ${g(650)} 660 S ${g(920)} 690 ${g(1020)} 640`}),a.jsx("g",{transform:`translate(${g(1100)} 636)`,children:a.jsxs("g",{className:"s4-fl",children:[Ql(8,13,26,-30),a.jsx("circle",{r:"12",className:"ct"})]})})]})]})]}),n.kind==="mc"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:x,children:n.question}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-ground",d:`M ${g(70)} 700 C ${g(400)} 690 ${g(800)} 712 ${g(1230)} 696`}),l&&S>=0&&a.jsx("path",{className:"s4-gl",d:`M ${g(70)} 700 C ${g(300)} 692 ${e.cx(S)-200} 706 ${e.cx(S)} 700`}),n.options.map((w,R)=>a.jsxs("g",{transform:`translate(${e.cx(R)} 520)${e.flower<1?` scale(${e.flower.toFixed(3)})`:""}`,children:[a.jsx("path",{className:"s4-stem",d:"M 0 60 C -10 110 10 150 0 180"}),a.jsx("circle",{className:"s4-halo","data-i":R,r:"124"}),a.jsxs("g",{className:"s4-mf","data-i":R,children:[Ql(8,22,44,-52),a.jsx("circle",{r:"34",className:"ct"})]})]},w.key))]}),n.options.map((w,R)=>a.jsxs("div",{className:"s4-opt","data-i":R,style:{left:e.cx(R)-e.optW/2,top:730,...e.optW!==270?{width:e.optW}:{},...e.optFs!==32?{fontSize:e.optFs}:{}},children:[a.jsx("b",{children:w.key}),a.jsx("span",{children:w.text})]},w.key)),n.options.map((w,R)=>a.jsx("b",{className:"s4-key",style:{left:e.cx(R)-24,top:496},children:w.key},w.key))]}),n.kind==="img"&&e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:x,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:g(700),top:e.sideTop-90,width:620,height:330}}),a.jsx("div",{className:"s4-lab",style:{left:g(740),width:540,top:e.sideTop-48},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${M}`,style:{left:g(740),width:540,top:e.sideTop,fontSize:e.ans.fs},children:Aa(n.answer)})]})]}),n.kind==="img"&&!e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:x,children:n.question}),l&&n.captions&&e.frame.rects.map((w,R)=>n.captions[R]&&a.jsx("div",{className:"s4-rcap",style:{left:w.x-20,top:w.y+w.h+26,width:w.w+40},children:n.captions[R].first?a.jsxs(a.Fragment,{children:[n.captions[R].plain,a.jsx("b",{children:n.captions[R].hot})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{children:n.captions[R].hot}),n.captions[R].plain]})},"rc"+R)),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:g(120),top:760,width:1060,height:240}}),a.jsx("div",{className:"s4-lab",style:{left:g(70),width:1160,top:744},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${M}`,style:p(780),children:Aa(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${g(330)} 944 C ${g(440)} 970 ${g(520)} 920 ${g(650)} 950 S ${g(860)} 972 ${g(970)} 936`}),a.jsx("path",{className:"s4-vine-light",d:`M ${g(330)} 944 C ${g(440)} 970 ${g(520)} 920 ${g(650)} 950 S ${g(860)} 972 ${g(970)} 936`})]})]})]}),n.kind==="imgopt"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:x,children:n.question}),e.frame.rects.map((w,R)=>a.jsx("b",{className:"s4-pk",style:{left:w.x-6,top:w.y-6},children:n.keys[R]},R)),l&&S>=0&&a.jsxs("div",{className:"s4-capt",style:m?{left:g(70)}:void 0,children:["Ответ: ",a.jsx("b",{children:n.keys[S]}),n.caption?` — ${n.caption}`:""]})]}),i&&a.jsx(wM,{rows:i,phase:s,judged:r,lay:o,count:c}),T&&h&&a.jsx("div",{className:"s4-vid",style:{left:T.x,top:T.y,width:T.w,height:T.h},children:h}),r&&l&&n.note&&a.jsx("div",{className:"s4-note",style:{left:g(70),top:e.noteTop},children:n.note})]})}const Ca=60,UM=290,FM=960,Ra=226,OM=(n,e)=>{var t;return((t=n.correct_pairs.find(i=>i.startsWith(e)))==null?void 0:t.slice(e.length))??""},ac=n=>n.items.map((e,t)=>n.right.indexOf(OM(n,String(t+1))));function BM(n,e,t){const i=t>4?26:n.length>60?25:n.length>40?27:30,s=Math.ceil(n.length*.5*i/Math.max(80,e-(t>4?86:100)));return Math.max(t>4?100:120,Math.round(s*i*1.14+26))}function kM(n,e={}){const t=!!e.long,i=e.lift??0,s=n.items.length,r=n.items.map(b=>b.kind==="img"?b.w/b.h:0),o=n.items.filter(b=>b.kind==="txt").length,c=s>4?250:UM,l=r.reduce((b,T)=>b+T,0),u=Math.round(Math.min((s>4?300:380)-i,l?(1800-Ca*(s-1)-c*o)/l:380)),d=n.items.map((b,T)=>b.kind==="img"?Math.round(r[T]*u):c),f=d.reduce((b,T)=>b+T,0)+Ca*(s-1);let h=FM-f/2;const m=d.map(b=>{const T={x:h,y:Ra,w:b,h:u};return h+=b+Ca,T}),g=s>4?250:t?400:330,y=m.map(b=>{const T=Math.max(g,Math.min(470,Math.round(b.w*.97)));return{x:b.x+b.w/2-T/2,y:Ra+u+56,w:T,h:0}}),x=n.right.length,p=1450,M=p/Math.max(1,x),S=n.right.map((b,T)=>({cx:400+M*(T+.5)+(T%2?14:-14),y:(s>4?T%2?790:640:T%2?936:t?796:806)-i}));if(e.stripTop!=null){const b=ac(n),T=E=>{const I=b.indexOf(E);return I>=0?y[I].w:g},w=Math.max(...S.map((E,I)=>E.y+BM(n.right_labels[I]??"",T(I),s))),R=Math.max(0,w-(e.stripTop-52)),v=Ra+u+40;S.forEach(E=>{E.y=Math.max(v,E.y-R)})}return{img:m,fin:y,bank:S,h:u,lift:i,minW:g}}const ed=n=>n.length>60?" xl":n.length>40?" lg":"";function zM(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function GM(n,e){n.fromTo(e(".mt-img"),{opacity:0,scale:.92},{opacity:1,scale:1,duration:.6,stagger:.1,ease:"power2.out"},.3).fromTo(e(".mtC-bud"),{scale:0},{scale:1,duration:.4,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},.8).fromTo(e(".mt-lab"),{opacity:0,y:40,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.4)"},.9)}function HM(n,e,t,i,s){const r=ac(t);t.items.forEach((o,c)=>{const l=s.t0+c*s.step,u=r[c]>=0?e(`.mt-lab[data-k="${r[c]}"]`)[0]:void 0,d=i.bank[r[c]],f=i.fin[c];n.fromTo(e(`.mtC-img[data-k="${c}"]`),{"--hl":0},{"--hl":1,duration:.3,yoyo:!0,repeat:1},l).fromTo(e(`.mtC-stalk[data-k="${c}"]`),{strokeDashoffset:400},{strokeDashoffset:0,duration:.55,ease:"power2.out"},l+.1).fromTo(e(`.mtC-leaf[data-k="${c}"]`),{opacity:0},{opacity:1,duration:.3,stagger:.12},l+.35),u&&d&&n.fromTo(u,{x:0,y:0,rotation:r[c]%2?3:-3},{keyframes:[{y:-60,rotation:0,duration:.3,ease:"power2.out"},{x:f.x+f.w/2-d.cx,y:f.y-d.y,duration:.6,ease:"power2.inOut"}]},l+.35),n.fromTo(e(`.mt-num[data-k="${c}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.45,ease:"back.out(2.2)"},l+1)}),n.fromTo(e(".mt-pairs > *"),{opacity:0,y:10},{opacity:1,y:0,duration:.35,stagger:.08},s.pairsAt)}function jM({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,cls:c=""}){const l=ac(n),u=n.items.length,d=e.lift,f=[...e.img,{x:300,y:(u>4?620:780)-d,w:1500,h:280},{x:360,y:40,w:1200,h:90}];return a.jsxs(mn,{rects:f,n:s,rootRef:r,cls:`s3 mt mtC st-${t?"reveal":"question"}${i?" done":""} n${u}${c}`,children:[ko(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q mt-q",children:n.text.split(" ").map((h,m)=>a.jsxs("span",{className:"w",children:[h," "]},m))}),a.jsxs("svg",{className:"mtC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("ellipse",{className:"mtC-meadow",cx:"1040",cy:(u>4?740:900)-d,rx:"900",ry:"170"}),t&&n.items.map((h,m)=>{const g=e.img[m],y=e.fin[m],x=g.x+g.w/2,p=g.y+g.h+4,M=y.y+2;return a.jsxs("g",{children:[a.jsx("path",{className:"mtC-stalk","data-k":m,d:`M ${x} ${p} C ${x-10} ${p+18} ${x+10} ${M-18} ${x} ${M}`}),a.jsxs("g",{transform:`translate(${x} ${(p+M)/2})`,children:[a.jsx("path",{className:"mtC-leaf","data-k":m,d:"M 0 0 C 16 -14 34 -12 40 -4 C 28 4 12 6 0 0 Z"}),a.jsx("path",{className:"mtC-leaf","data-k":m,d:"M 0 4 C -16 -8 -34 -6 -40 2 C -28 10 -12 12 0 4 Z"})]})]},m)})]}),e.img.map((h,m)=>{const g=n.items[m];return a.jsxs("div",{className:`mt-img mtC-img${g.kind==="txt"?" txtcard":""}`,"data-k":m,style:{left:h.x,top:h.y,width:h.w,height:h.h},children:[g.kind==="img"?a.jsx("img",{src:g.src,alt:""}):a.jsx("span",{className:`mtC-itxt${ed(g.text)}`,children:g.text}),a.jsx("b",{className:"mt-imgno",children:m+1}),!t&&a.jsx("i",{className:"mtC-bud",style:{left:h.w/2-14}})]},m)}),n.right.map((h,m)=>{const g=l.indexOf(m),y=g>=0?e.fin[g].w:e.minW,x=i&&g>=0?e.fin[g]:{x:e.bank[m].cx-y/2,y:e.bank[m].y};return a.jsxs("div",{className:`mt-lab mtC-lab${ed(n.right_labels[m]??"")}`,"data-k":m,style:{left:x.x,top:x.y,width:y},children:[a.jsx("svg",{className:"mt-labbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:"M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z"})}),a.jsx("span",{className:"key",children:h}),a.jsx("span",{className:"txt",children:n.right_labels[m]??""}),t&&g>=0&&a.jsx("b",{className:"mt-num","data-k":g,children:g+1})]},h)}),o&&a.jsx(Uu,{...o}),t&&a.jsx("div",{className:"mt-pairs",style:d?{top:884-d}:void 0,children:n.items.map((h,m)=>a.jsxs("span",{children:[a.jsx("b",{children:m+1})," — ",a.jsx("b",{children:n.right[l[m]]??"—"})]},m))}),a.jsx(zo,{n:s,total:n.timer})]})}const VM="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function WM(n,e={}){const t=n.choices.length,i=!!e.long,s=858-(e.lift??0),r=t>=6?244:t===5?292:n.media?300:360,o=t>=6?112:t===5?140:i?196:150,c=n.media?470:380,l=1880,u=Array.from({length:t},(h,m)=>c+r/2+(t===1?0:m*(l-c-r)/(t-1))),d=u.map(h=>({x:h,y:s-130-o/2})),f=n.choices.map((h,m)=>({x:u[m],y:350+m%2*(i?130:60)}));return{n:t,cw:r,ch:o,slot:d,home:f,xs:u,VY:s}}const $M=n=>n.length>50?" xl":n.length>28?" lg":"",XM=(n,e)=>n.correct_order.indexOf(e);function qM(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function YM(n,e){n.fromTo(e(".orA-vine"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:1.4,ease:"power2.inOut"},.1).fromTo(e(".orA-bud"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.4,stagger:.2,ease:"back.out(2)"},.5).fromTo(e(".or-place"),{opacity:0},{opacity:1,duration:.4,stagger:.15},.6).fromTo(e(".or-card"),{opacity:0,y:-30,rotation:-4},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.5)"},.8)}function KM(n,e,t,i,s){const r=t.choices.map(c=>c.key),o=s.step;t.correct_order.split("").forEach((c,l)=>{const u=r.indexOf(c),d=u>=0?e(`.or-card[data-i="${u}"]`)[0]:void 0,f=i.home[u],h=i.slot[l],m=s.t0+l*o;d&&f&&h&&n.fromTo(d,{x:0,y:0,rotation:u%2?3:-3},{keyframes:[{x:(h.x-f.x)*.5,y:(h.y-f.y)*.5-50,rotation:h.x>f.x?7:-7,duration:o*.5,ease:"sine.inOut"},{x:h.x-f.x,y:h.y-f.y,rotation:0,duration:o*.45,ease:"power2.out"}]},m),n.fromTo(e(`.orA-stem[data-j="${l}"]`),{strokeDashoffset:120},{strokeDashoffset:0,duration:.3},m+o*.75).fromTo(e(`.orA-fl[data-j="${l}"]`),{scale:0},{scale:1,svgOrigin:"0 0",duration:.5,ease:"back.out(2.2)"},m+o*.8).to(e(`.orA-bud[data-j="${l}"]`),{scale:0,svgOrigin:"0 0",duration:.2},m+o*.75).fromTo(e(`.or-pos[data-i="${u}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.4,ease:"back.out(2.2)"},m+o*.9)}),n.fromTo(e(".orA-light"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:.4+i.n*o,ease:"none"},s.t0)}function ZM({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,media:c,cls:l=""}){const u=e.VY,d=g=>XM(n,g),f=[...e.home,...e.slot].map(g=>({x:g.x-e.cw/2,y:g.y-e.ch/2,w:e.cw,h:e.ch})).concat([{x:360,y:40,w:1200,h:90}]),h=[{x:360,y:u},...e.xs.map((g,y)=>({x:g,y:u+(y%2?12:-12)})),{x:1850,y:u-6}],m=h.reduce((g,y,x)=>x===0?`M ${y.x} ${y.y}`:`${g} C ${(h[x-1].x+y.x)/2} ${h[x-1].y} ${(h[x-1].x+y.x)/2} ${y.y} ${y.x} ${y.y}`,"");return a.jsxs(mn,{rects:f,n:s,rootRef:r,cls:`s3 or orA st-${t?"reveal":"question"}${i?" done":""} n${e.n}${l}`,children:[ko(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q or-q",style:n.media?{left:470,right:240}:void 0,children:n.text.split(" ").map((g,y)=>a.jsxs("span",{className:"w",children:[g," "]},y))}),n.media&&a.jsx("figure",{className:"or-media",children:a.jsx("img",{src:c??n.media,alt:""})}),a.jsxs("svg",{className:"orA-back",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"orA-vine",d:m}),a.jsx("path",{className:"orA-light",d:m}),a.jsxs("g",{className:"orA-seed",transform:`translate(360 ${u})`,children:[a.jsx("ellipse",{rx:"26",ry:"17"}),a.jsx("path",{d:"M -6 -14 C -2 -30 8 -34 16 -32"})]}),a.jsx("g",{transform:`translate(1850 ${u-6})`,children:a.jsxs("g",{className:"orA-flower",children:[Array.from({length:8},(g,y)=>a.jsx("g",{transform:`rotate(${y*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-26",rx:"12",ry:"26"})},y)),a.jsx("circle",{r:"11"})]})}),e.slot.map((g,y)=>a.jsxs("g",{transform:`translate(${g.x} ${h[y+1].y})`,children:[a.jsx("path",{className:"orA-stem","data-j":y,d:`M 0 0 L 0 ${g.y+e.ch/2-h[y+1].y}`}),a.jsx("ellipse",{className:"orA-bud","data-j":y,rx:"18",ry:"22",cy:"-6"}),a.jsxs("g",{className:"orA-fl","data-j":y,style:i?{transform:"scale(1)"}:void 0,children:[Array.from({length:7},(x,p)=>a.jsx("g",{transform:`rotate(${p*51.4})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"11",ry:"22"})},p)),a.jsx("circle",{r:"9"})]})]},y))]}),e.slot.map((g,y)=>a.jsx("b",{className:"or-place",style:{left:g.x,top:u+38},children:y+1},y)),n.choices.map((g,y)=>{const x=i&&d(g.key)>=0?e.slot[d(g.key)]:e.home[y];return a.jsxs("div",{className:`or-card orA-card${$M(g.text)}${t?" placed":""}`,"data-i":y,style:{left:x.x-e.cw/2,top:x.y-e.ch/2,width:e.cw,height:e.ch},children:[a.jsx("svg",{className:"or-cardbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:VM})}),a.jsx("span",{className:"key",children:g.key}),a.jsx("span",{className:"txt",children:g.text}),t&&d(g.key)>=0&&a.jsx("em",{className:"or-pos","data-i":y,children:d(g.key)+1})]},g.key)}),o&&a.jsx(Uu,{top:968,...o}),a.jsx(zo,{n:s,total:n.timer})]})}function JM(n,e,t){const i=n.answer;return i.mode==="match"?"match":i.mode==="order"?"order":i.mode==="choice"?t.qImgs>0&&t.qImgs===i.choices.length?"imgopt":"mc":e==="rebus"||t.revealImgs>0||t.video?"img":"text"}function QM(n,e){const t=n.answer,i=e.trim();if(t.mode==="choice"){const s=t.choices.find(r=>Nh(i,r.key));return s&&s.text.trim()?`${s.key} · ${s.text.trim()}`:i}return t.mode==="match"?i.split(/[,;]\s*/).map(s=>s.trim()).filter(Boolean).join(" "):i}function ey(n,e,t,i,s){const r=`q-${n.id}`,o=i.filter(d=>d.question_ref===r),c=[...e,...t.filter(d=>!e.some(f=>f.id===d.id)&&o.some(f=>f.team_id===d.id))];let l=0;return{rows:c.map(d=>{var m;const f=o.find(g=>g.team_id===d.id),h=((m=f==null?void 0:f.answer_text)==null?void 0:m.trim())||"";return h&&l++,{key:d.id,name:`${d.icon?`${d.icon} `:""}${d.name}`,color:Bi(Tn(d.color??"")),text:h?QM(n,h):null,ok:s&&f&&h?f.is_correct??Li(n.answer,f.answer_text):null,stake:(f==null?void 0:f.stake)??null}}),answered:l}}function ty(n,e,t){return n<=1?t:Math.max(.05,Math.min(t,(e-.3-1.45)/(n-1)))}function ny(n,e,t){return Math.max(.35,Math.min(t,(e-.3-.4)/Math.max(.9,n-.1)))}const td=(n,e=.7)=>Math.min(.14,e/Math.max(1,n-1));function iy(n,e){const[t,i]=j.useState(n?"open":"covered"),[s,r]=j.useState(0);j.useEffect(()=>{n?t==="covered"&&i("anim"):t!=="covered"&&(i("covered"),r(c=>c+1))},[n]);const o=j.useCallback(()=>i(c=>c==="anim"?"open":c),[]);return{stage:t,epoch:s,judged:e&&t==="open",done:o}}const oc=n=>n==="covered"?"dots":n;function cc(n,e,t,i,s,r){const o=j.useRef(null),c=j.useMemo(()=>nt.utils.selector(o),[]),l=j.useRef(n==="open"),u=j.useRef(!1);return j.useLayoutEffect(()=>{const d=nt.timeline();return i(d,c),l.current&&d.progress(1),()=>{d.kill()}},[]),j.useLayoutEffect(()=>{if(n==="covered"||u.current)return;u.current=!0;const d=nt.timeline({onComplete:t});if(s(d,c),n==="open"){d.progress(1);return}return()=>{d.progress()<1&&(u.current=!1,d.kill())}},[n]),j.useLayoutEffect(()=>{if(!e)return;const d=nt.timeline();return r(d,c),()=>{d.kill()}},[e]),o}const Bu=(n,e,t)=>n.to(e(".s4-sl .dots"),{opacity:0,duration:.3,stagger:.04},t).fromTo(e(".s4-sl .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.05},t),ku=(n,e)=>{const t=e(".s4-sl .mk").length;return n.fromTo(e(".s4-sl .mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:Math.min(.1,2/Math.max(1,t)),ease:"back.out(2.4)"},0)},zu=(n,e)=>n.fromTo(e(".s4-sl, .s4-scnt"),{opacity:0,y:14},{opacity:1,y:0,duration:.4,stagger:.05},.6);function sy({inp:n,rows:e,answered:t,revealed:i,checked:s,revealMs:r,video:o}){const{stage:c,epoch:l,judged:u,done:d}=iy(i,s),f=n.kind==="match"?n.allImgs.slice(0,n.left.length):n.kind==="order"?n.allImgs.slice(0,1):n.kind==="imgopt"?n.allImgs:c==="covered"?n.qImgs:n.aImgs,h=j.useMemo(()=>[...new Set([...n.allImgs,...n.qImgs,...n.aImgs])],[n]),m=lf(h),g=m?f.map(T=>m[h.indexOf(T)]??{w:1200,h:900}):null,y=g?JSON.stringify(f.map((T,w)=>[T,g[w].w,g[w].h])):"",x=j.useMemo(()=>y?JSON.parse(y).map(([T,w,R])=>({src:T,w,h:R})):[],[y]),p=e&&e.length?e:null,M=p?`Ответили: ${t} из ${p.length}`:void 0,S=(r+600)/1e3;if(!g)return a.jsx("div",{className:"s1 fo-wait"});const b={stage:c,judged:u,done:d,rows:p,count:M,doneS:S};return n.kind==="match"?a.jsx(ay,{inp:n,photos:x,...b},l):n.kind==="order"?a.jsx(oy,{inp:n,photos:x,...b},l):a.jsxs(a.Fragment,{children:[a.jsx(ry,{inp:n,photos:x,video:o,...b},l),o&&n.kind!=="img"&&a.jsx("div",{className:"s4-vid corner",children:o})]})}function ry({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,video:c}){const l=t!=="covered",u=j.useRef(n.kind==="img"&&t==="covered"&&e.length===0),d=n.kind,f=j.useMemo(()=>{var S;const M=d==="img"&&l&&c?[{src:"",w:16,h:9,video:!0},...e].slice(0,4):e;return{kind:d,title:n.title,qn:n.qn,qcount:n.qcount,question:n.question,answer:n.answer,options:n.options,correct:d==="imgopt"||d==="mc"?n.options.findIndex(b=>b.key===n.correctKey):-1,photos:d==="img"||d==="imgopt"?M:[],keys:n.options.map(b=>b.key),caption:((S=n.options.find(b=>b.key===n.correctKey))==null?void 0:S.text.trim())??"",note:n.note,captions:n.captions}},[n,e,l,d,!!c]),h=!!r,m=j.useMemo(()=>CM(f,h?0:310),[f,h]),g=j.useMemo(()=>{const M=m.frame.rects.length;return{grow:Array(M).fill(1),reveal:Array(M).fill(1),bloom:Array(M).fill(0),pulse:0}},[m]),y=j.useMemo(()=>SM((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),x=Ou(f.answer),p=cc(t,i,s,(M,S)=>{RM(M,S),NM(M,S)},(M,S)=>{const b=d==="text"?{R:.4,k:td(x)}:d==="img"?{R:0,k:td(x),lt:.35}:{R:.2,k:.14},{show:T}=IM(M,S,f,g,b,u.current);PM(M,S,T)},(M,S)=>{LM(M,S,0,Math.min(.2,2.4/Math.max(1,(r==null?void 0:r.length)??1))),M.fromTo(S(".s4-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5},.2)});return a.jsx(DM,{d:f,ly:m,fs:g,rows:r,phase:oc(t),judged:i,colLay:y,count:o,shown:l,rootRef:p,cls:r?" fg":" fg paper",video:c})}function ay({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=j.useMemo(()=>({title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,items:n.left.map((M,S)=>e[S]?{kind:"img",src:e[S].src,w:e[S].w,h:e[S].h}:{kind:"txt",text:n.hasAudio?`Трек ${M}`:M}),right:n.right,right_labels:n.right.map((M,S)=>n.rightLabels[S]??""),correct_pairs:n.pairs}),[n,e]),u=j.useMemo(()=>Nu((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),d=958-u.lift,f=l.right_labels.some(M=>M.length>60),h=!!r,m=j.useMemo(()=>kM(l,{long:f,lift:u.lift,stripTop:h?d:void 0}),[l,f,u,h,d]),g=l.items.length,y=ty(g,c,g>4?.95:1.25),x=.3+(g-1)*y+1,p=cc(t,i,s,(M,S)=>{zM(M,S),GM(M,S),zu(M,S)},(M,S)=>{HM(M,S,l,m,{t0:.3,step:y,pairsAt:x}),Bu(M,S,x+.4)},(M,S)=>{ku(M,S)});return a.jsx(jM,{S:l,Ly:m,rev:t!=="covered",done:!1,n:null,rootRef:p,cls:" fg",strip:r?{rows:r,top:d,phase:oc(t),judged:i,lay:u,count:o}:null})}function oy({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=j.useMemo(()=>{var g;return{title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,choices:n.options,correct_order:n.correctOrder,media:((g=e[0])==null?void 0:g.src)??null}},[n,e]),u=j.useMemo(()=>Nu((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),d=l.choices.some(g=>g.text.length>50),f=j.useMemo(()=>WM(l,{long:d,lift:u.lift}),[l,d,u]),h=ny(f.n,c,f.n>5?.85:1),m=cc(t,i,s,(g,y)=>{qM(g,y),YM(g,y),zu(g,y)},(g,y)=>{KM(g,y,l,f,{t0:.3,step:h}),Bu(g,y,.3+f.n*h+.2)},(g,y)=>{ku(g,y)});return a.jsx(ZM,{S:l,Ly:f,rev:t!=="covered",done:!1,n:null,rootRef:m,cls:" fg",strip:r?{rows:r,top:968-u.lift,phase:oc(t),judged:i,lay:u,count:o}:null})}function cy(n,e){const t=(r,o)=>{const c=(r??"").trim();if(!c)return null;const l=o?Math.max(0,c.length-3):3;return o?{plain:c.slice(0,l),hot:c.slice(l),first:o}:{plain:c.slice(l),hot:c.slice(0,l),first:o}},i=t(n,!0),s=t(e,!1);return i||s?[i??{plain:"",hot:"",first:!0},s??{plain:"",hot:"",first:!1}]:void 0}const nd=n=>!/\.(mp3|mp4|webm|wav|m4a|ogg)$/i.test(n),ly=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n);function dy({round:n,q:e,step:t,answers:i,teams:s,allTeams:r,revealed:o,checked:c,paper:l,revealMs:u,answerText:d,effects:f,video:h,actions:m}){const g=j.useMemo(()=>{var O;const T=e.media.question??[],w=e.media.answer??[],R=T.filter(nd),v=w.filter(nd),E=v.length?v:R,I=!!e.media.hidden&&T.some($=>/\.(mp4|webm)$/i.test($)),P=JM(e,n.mechanic,{qImgs:R.length,revealImgs:E.length,video:I}),L=e.answer,z=L.mode==="choice"||L.mode==="order"?L.choices.map($=>({key:$.key,text:$.text})):[];return{kind:P,title:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qn:t+1,qcount:n.questions.length,question:e.question_text.trim(),answer:d,options:z,correctKey:L.mode==="choice"?L.correct_choice:"",correctOrder:L.mode==="order"?L.correct_order:"",left:L.mode==="match"?L.left:[],right:L.mode==="match"?L.right:[],rightLabels:L.mode==="match"?L.right_labels??[]:[],pairs:L.mode==="match"?L.correct_pairs:[],qImgs:e.media.hidden?[]:R.map(He),aImgs:E.map(He),allImgs:(P==="imgopt"||!e.media.hidden?R:[]).map(He),hasAudio:T.some(ly),note:((O=e.answer_note)==null?void 0:O.trim())??"",captions:n.mechanic==="rebus"?cy(e.service.word1,e.service.word2):void 0}},[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),e.answer_note,d,n.mechanic,n.title_lines.join("|"),n.questions.length,t]),{rows:y,answered:x}=ey(e,s,r,i,c),p=j.useMemo(()=>Ed(e,He,d),[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),d]),[M,S]=j.useState(!0);j.useEffect(()=>{if(!o){S(!0);return}const T=setTimeout(()=>S(!1),1e3);return()=>clearTimeout(T)},[o,e.id]),j.useEffect(()=>{o&&cf.set({hidden:!1})},[o]);const b=(o?M:!0)&&a.jsx("div",{className:`fo-x ${o?"fo-xout":""}`,children:a.jsx(Td,{q:p,roundName:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Вопрос ${t+1} из ${n.questions.length}`,startedAt:null,seconds:n.timer_seconds,reveal:!1,calm:!0,from:"E",noTimer:!0})});return o?a.jsxs(a.Fragment,{children:[f,b,a.jsx("div",{className:"fo-x fo-xin",children:a.jsx(sy,{inp:g,rows:l?null:y,answered:x,revealed:o,checked:c,revealMs:u,video:h},e.id)}),m]}):a.jsxs(a.Fragment,{children:[f,b,m]})}function Qy(){var u,d,f,h;const{gameState:n,loading:e,roomId:t}=Zu(),[i,s]=j.useState(null);if(j.useEffect(()=>{n!=null&&n.pack_id?Ph(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),j.useEffect(()=>mf(),[]),!e&&!t)return a.jsx(Ju,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",o=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"",c=(n==null?void 0:n.phase)==="question"?`Q-${((n.round_number+1)*97+n.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null,l=wd(r)&&(n==null?void 0:n.phase)==="question"&&i?nf((u=i.rounds[n.round_number])==null?void 0:u.questions[n.question_index],(d=i.rounds[n.round_number])==null?void 0:d.mechanic):!1;return a.jsxs(sf,{theme:r,isProjector:!0,phase:n==null?void 0:n.phase,plain:l,paper:((f=i==null?void 0:i.settings)==null?void 0:f.play_mode)==="paper",children:[r==="new_year"&&a.jsx(rf,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),a.jsx(uy,{gameState:n,pack:i}),a.jsx(Ep,{theme:r,trigger:o,hud:c}),a.jsx(_p,{on:Rt(r),phase:n==null?void 0:n.phase}),i&&a.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((h=i.settings)==null?void 0:h.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name}),a.jsx(df,{corner:!0})]})}function xr({theme:n}){return n==="new_year"?a.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?a.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function id({theme:n}){return n!=="classic"?null:a.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[a.jsx("span",{className:"cd-line"}),a.jsx("span",{className:"cd-chip",children:"◆"}),a.jsx("span",{className:"cd-line"})]})}function uy({gameState:n,pack:e}){var S,b,T,w,R,v,E,I;const[t,i]=j.useState([]),[s,r]=j.useState("");j.useEffect(()=>{Lh().then(i).catch(()=>i([]))},[]);const o=Ln((n==null?void 0:n.game_id)??null),c=j.useMemo(()=>Lp(o),[o]),l=j.useMemo(()=>{const P=`${location.origin}${location.pathname}#/player?room=${Ih()??""}`;return n!=null&&n.pack_id?`${P}&pack=${n.pack_id}`:P},[n==null?void 0:n.pack_id]),u=((n==null?void 0:n.random_groups)??[]).filter(P=>Array.isArray(P)&&P.length>0),d=u.map(P=>P.join(",")).join("|"),[f,h]=j.useState(!0);j.useEffect(()=>{h(!0)},[d]);const m=u.length>0&&f;Ey((S=e==null?void 0:e.rounds)==null?void 0:S[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0);const g=((T=(b=e==null?void 0:e.rounds)==null?void 0:b[(n==null?void 0:n.round_number)??0])==null?void 0:T.mechanic)==="race"||((R=(w=e==null?void 0:e.rounds)==null?void 0:w[((n==null?void 0:n.round_number)??0)+1])==null?void 0:R.mechanic)==="race";if(j.useEffect(()=>{g&&ff("/quiz-party/")},[g]),Ty(e,(n==null?void 0:n.round_number)??0),!n)return a.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const y=((v=e==null?void 0:e.settings)==null?void 0:v.play_mode)==="paper",x=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Ks()},children:"⟲ Сменить пакет"}),a.jsx("button",{onClick:()=>{var P,L;return void Fh({intro:!!((P=e==null?void 0:e.settings)!=null&&P.show_intro),slide:Ac((L=e==null?void 0:e.settings)==null?void 0:L.info_slides,0)??void 0},_t(n)).catch(vt)},children:"К первому раунду →"})]});if(n.phase==="lobby"&&n.pack_id&&e&&Rt(e.theme))return a.jsxs(a.Fragment,{children:[a.jsx(Uc,{pack:e}),a.jsx(Bf,{teams:c.map(P=>({id:P.id,name:P.name,color:P.color,alive:Cr(P)})),playerUrl:l,paper:y,groups:u,groupsOpen:f,onGroupsOpen:()=>h(!0),onGroupsClose:()=>h(!1)}),x]});if(n.phase==="lobby"||!n.pack_id||!e)return a.jsxs("div",{className:`host-screen grid-bg lobby-screen${y?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&a.jsx(Uc,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?a.jsxs("div",{className:"cyber-lobby-head",children:[a.jsx(cd,{side:"left"}),a.jsxs("div",{className:"clh-title",children:[a.jsx(En,{theme:"classic",lines:["QUIZ","PARTY"]}),a.jsx(id,{theme:"classic"})]}),a.jsx(cd,{side:"right"})]}):a.jsxs(a.Fragment,{children:[a.jsx(En,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),a.jsx(xr,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?a.jsxs(a.Fragment,{children:[m&&a.jsx(Sy,{groups:u,onClose:()=>h(!1)}),u.length>0&&!f&&a.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>h(!0),children:"СОСТАВЫ КОМАНД"}),wd(e==null?void 0:e.theme)?a.jsx(vp,{theme:e.theme,showQr:!y,lit:m,playerUrl:l,teams:c.map(P=>({id:P.id,name:P.name,icon:P.icon,color:P.color,alive:Cr(P)}))}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"lobby-teams",children:[o.length>0&&a.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",o.length,")"]}),o.length===0?y?null:a.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):c.map(P=>a.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":P.color,opacity:Cr(P)?1:.4},children:[P.icon&&a.jsx("span",{className:"lobby-team-icon",children:P.icon}),P.name]},P.id))]}),!y&&a.jsx(ar,{className:`lobby-qr-corner${m?" lobby-qr-lit":""}`,value:l,title:"QR для подключения"}),!y&&m&&a.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"})]}),x]}):a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[a.jsxs("select",{value:s,onChange:P=>r(P.target.value),style:{fontSize:"1.2rem"},children:[a.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(P=>a.jsxs("option",{value:P.id,children:[P.name," (",P.status==="ready"?"готов":P.status==="played"?"сыгран":P.status,")"]},P.id))]}),a.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const P=t.find(L=>L.id===s);P&&P.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Dh(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return a.jsx(Jv,{onDone:()=>{var P;Uh(0,Ac((P=e==null?void 0:e.settings)==null?void 0:P.info_slides,0)??void 0)}});const p=e.rounds[n.round_number];if(!p)return a.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const M=p.questions[n.question_index];if(n.phase==="round_intro"){const P=p.settings.grid,L=a.jsx("div",{className:"host-actions",children:p.mechanic==="anagram"?a.jsx(fy,{round:p,gameState:n}):a.jsx("button",{onClick:()=>void di(0,_t(n)).catch(vt),children:p.mechanic==="jeopardy"?"Начать раунд →":p.mechanic==="race"?"К скачкам →":p.mechanic==="melody"?"К трекам →":p.mechanic==="four_pics"||p.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})});return Rt(e.theme)?a.jsxs(a.Fragment,{children:[p.rules_audio&&a.jsx("audio",{autoPlay:!0,src:He(p.rules_audio)}),a.jsx(pp,{kind:$f(p.mechanic),intro:{num:tn(e,n.round_number),titleLines:p.title_lines,meta:Rr(p),rules:p.rules}}),L]}):a.jsxs("div",{className:"host-screen grid-bg round-intro",children:[p.rules_audio&&a.jsx("audio",{autoPlay:!0,src:He(p.rules_audio)}),e.theme==="potter"&&a.jsx("div",{className:"mg-veil","aria-hidden":!0}),p.mechanic==="crossword"&&P?a.jsxs("div",{className:"cw-layout",children:[a.jsx(uf,{grid:P,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/P.cols,innerHeight*.8/P.rows))))}),a.jsxs("div",{className:"side",children:[a.jsxs("div",{className:"mono-tag",children:["РАУНД ",tn(e,n.round_number)]}),a.jsx(En,{theme:e.theme,lines:p.title_lines}),a.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:Rr(p)}),p.rules.map((z,O)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+O*.5}s`},children:[a.jsx("span",{className:"idx",children:String(O+1).padStart(2,"0")}),z]},O))]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"round-badge",children:[a.jsx("span",{className:"rb-word",children:"РАУНД"}),a.jsx("span",{className:"rb-num",children:tn(e,n.round_number)})]}),a.jsxs("div",{className:"ri-main",children:[a.jsx(En,{theme:e.theme,lines:p.title_lines}),a.jsx(xr,{theme:e.theme}),a.jsx(id,{theme:e.theme}),a.jsx("div",{className:"meta-line",children:Rr(p)})]}),p.rules.length>0&&a.jsx(Ip,{rules:p.rules,delay:z=>(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+z*.7})]}),L]})}if(n.phase==="question"&&p.mechanic==="sprint")return Rt(e.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Ec,{pack:e,round:p,gameState:n,timerNode:null}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void ds(0,!1,_t(n)).catch(vt),children:"К ответам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsx(Ec,{pack:e,round:p,gameState:n,timerNode:a.jsx(as,{startedAt:n.timer_started_at,seconds:p.timer_seconds,theme:e.theme})}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void ds(0,!1,_t(n)).catch(vt),children:"К ответам →"})})]});if(n.phase==="question"&&p.mechanic==="blitz")return a.jsx(Ny,{pack:e,round:p,gameState:n});if(n.phase==="question"&&p.mechanic==="race")return a.jsx(dh,{pack:e,round:p,gameState:n},`${n.game_id}-${n.round_number}`);if(n.phase==="question"&&p.mechanic==="melody")return a.jsx(uh,{pack:e,round:p,gameState:n});if(n.phase==="question"&&p.mechanic==="four_pics")return a.jsx(hh,{pack:e,round:p,gameState:n,timerNode:(P,L,z)=>{var O,$;return a.jsx(as,{startedAt:(($=(O=n.melody)==null?void 0:O.rv)==null?void 0:$.startedAt)??null,seconds:P,theme:e.theme,chime:z},L)}});if(n.phase==="question"&&p.mechanic==="jeopardy")return a.jsx(fh,{pack:e,round:p,gameState:n});if(n.phase==="question"&&p.mechanic==="anagram"&&M){const P=n.question_index+1>=p.questions.length;return a.jsx(ph,{pack:e,round:p,roundIdx:n.round_number,q:M,qIndex:n.question_index,qCount:p.questions.length,gameState:n,timerSlot:n.reveal&&!n.timer_started_at?null:a.jsx(as,{startedAt:n.timer_started_at,seconds:p.timer_seconds,theme:e.theme},M.id),effectsSlot:a.jsxs(a.Fragment,{children:[!(n.reveal&&!n.timer_started_at)&&a.jsx(ld,{startedAt:n.timer_started_at,seconds:p.timer_seconds,q:M,round:p,pack:e,timerRunning:!!n.timer_started_at,manual:y,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(hd,{round:p,gameState:n,isLast:P}),a.jsx(ud,{enabled:!n.reveal,startedAt:n.timer_started_at,seconds:p.timer_seconds,from:_t(n)})]}),actionsSlot:a.jsx(hy,{pack:e,round:p,gameState:n})},M.id)}if(n.phase==="question"&&M){const P=!!n.timer_started_at&&(St()-new Date(n.timer_started_at).getTime())/1e3>p.timer_seconds-10,L=((E=e.settings)!=null&&E.answers_reveal&&p.answers_reveal==="after_question",p.answers_reveal??"after_round"),z=p.mechanic!=="jeopardy"&&a.jsxs(a.Fragment,{children:[a.jsx(ld,{startedAt:n.timer_started_at,seconds:p.timer_seconds,q:M,round:p,pack:e,timerRunning:!!n.timer_started_at,manual:y,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(hd,{round:p,gameState:n,isLast:n.question_index+1>=p.questions.length}),a.jsx(ud,{enabled:L==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:p.timer_seconds,from:_t(n)})]}),O=a.jsxs("div",{className:"host-actions",children:[a.jsx(py,{gameState:n}),(L==="after_question"||p.mechanic==="jeopardy")&&!n.reveal&&a.jsx("button",{onClick:()=>void ki(),children:"Показать ответ"}),n.question_index+1<p.questions.length?a.jsx("button",{onClick:()=>void di(n.question_index+1,_t(n)).catch(vt),children:"Дальше →"}):L==="after_round"?a.jsx("button",{onClick:()=>void bd(_t(n)).catch(vt),children:"Время ответов →"}):a.jsx(Rn,{pack:e,gameState:n})]});return p.mechanic==="crossword"&&Rt(e.theme)&&sc(p)?a.jsx(yM,{pack:e,round:p,q:M,qIndex:n.question_index,qCount:p.questions.length,gameState:n,effectsSlot:z,actionsSlot:O},M.id):a.jsx(gd,{pack:e,round:p,roundIdx:n.round_number,q:M,qIndex:n.question_index,qCount:p.questions.length,timeLow:P,reveal:n.reveal,timerRunning:!!n.timer_started_at,timerStartedAt:n.timer_started_at,timerSlot:p.mechanic!=="jeopardy"&&a.jsx(as,{startedAt:n.timer_started_at,seconds:p.timer_seconds,theme:e.theme},M.id),effectsSlot:z,actionsSlot:O})}if(n.phase==="info"){const P=((I=e==null?void 0:e.settings)==null?void 0:I.info_slides)??[],L=P[n.question_index]??P[0];if(L)return a.jsx(Ay,{pack:e,slide:L,packId:n.pack_id,gameState:n})}return n.phase==="recap"?a.jsx(wy,{pack:e,round:p,gameState:n}):n.phase==="answer_time"?a.jsx(Py,{pack:e,round:p,gameState:n}):n.phase==="show_answers"&&M?a.jsx(Ly,{pack:e,round:p,q:M,gameState:n}):n.phase==="scoreboard"?a.jsx(Uy,{pack:e,gameState:n}):n.phase==="break"?a.jsx(Fy,{pack:e,round:p,gameState:n}):n.phase==="counting"?a.jsx(Oy,{pack:e,gameState:n}):n.phase==="finale"?a.jsx(By,{pack:e,gameId:n.game_id,gameState:n}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!M&&a.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void vr("round_intro"),children:"← К титулу раунда"})})]})}function hy({pack:n,round:e,gameState:t}){var h,m;const i=Vh(),s=_d(t.game_id),r=Sd(s,e.questions),o=Ln(t.game_id),c=Vi(t.game_id,t.round_number),l=Wh(o,c,((h=e.questions[t.question_index])==null?void 0:h.id)??"",((m=n.settings)==null?void 0:m.play_mode)==="paper"),u=Lc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:St(),wasRun:r,allAnswered:l}),d=()=>{const g=qh(t.question_index),y=_t(t);(g.kind==="shown"?Da(g.index,y):vr("round_intro",y)).catch(vt)},f=()=>{const g=Lc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:St(),wasRun:r,allAnswered:l});if(g.kind==="wait")return i.show(g.text);const y=_t(t);if(g.kind==="reveal")return void ki(y).catch(vt);if(g.kind==="next")return void(g.shown?Da(g.index,y):di(g.index,y)).catch(vt)};return a.jsxs("div",{className:"host-actions",children:[a.jsx($h,{text:i.text}),a.jsx("button",{className:"ghost",onClick:d,children:t.question_index>0?"← Назад":"← К титулу"}),!t.reveal&&a.jsx("button",{onClick:()=>void ki(_t(t)).catch(vt),children:"Показать ответ"}),u.kind==="afterRound"?a.jsx(Rn,{pack:n,gameState:t}):a.jsx("button",{onClick:f,children:"Дальше →"})]})}function fy({round:n,gameState:e}){const t=_d(e.game_id),i=Oh(Sd(t,n.questions));return a.jsx("button",{onClick:()=>void(i.shown?Da(0,_t(e)):di(0,_t(e))).catch(vt),children:"Первый вопрос →"})}function py({gameState:n}){return n.question_index>0?a.jsx("button",{className:"ghost",onClick:()=>void di(n.question_index-1,_t(n)).catch(vt),children:"← Назад"}):a.jsx("button",{className:"ghost",onClick:()=>void vr("round_intro",_t(n)).catch(vt),children:"← К титулу"})}function my(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function gy(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const En=j.forwardRef(function({theme:e,lines:t},i){const s=gy(t),r=t.join(`
`),o=mh(r,e==="classic"),c=e==="classic"?o.split(`
`):t;if(e!=="new_year")return a.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((u,d)=>a.jsxs("span",{style:d===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[d]??u,a.jsx("br",{})]},d))});let l=0;return a.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((u,d)=>a.jsx("span",{style:{display:"block"},children:[...u].map((f,h)=>f===" "?a.jsx("span",{children:" "},h):a.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*l++}s`},children:f},h))},d))})});function xy(){lh()}function _y(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?a.jsxs(a.Fragment,{children:[s,a.jsx("b",{className:"rebus-hot",children:r})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"rebus-hot",children:r}),s]})}function vy(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}const My=5e3,Gu=3300,yy=500,by=900,sd=100,rd=600,ad=500;function od(n){const e=n.answer;return e.mode==="choice"?Gu+yy+by:e.mode==="match"?sd+rd*Math.max(0,Math.min(e.left.length,6)-1)+ad:e.mode==="order"?sd+rd*Math.max(0,e.correct_order.length-1)+ad:1200}function Na({src:n}){const e=j.useRef(null);return j.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),a.jsx("div",{className:"reveal-video",children:a.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Hu(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function cd({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return a.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"cp-bar"}),a.jsx("div",{className:"cp-rows",children:e.map((t,i)=>a.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),a.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>a.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function Sy({groups:n,onClose:e}){j.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return a.jsx("div",{className:"groups-overlay",onClick:e,children:a.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[a.jsxs("div",{className:"gm-head",children:[a.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),a.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),a.jsx("div",{className:"lg-list",children:n.map((i,s)=>a.jsxs("div",{className:"lg-team",children:[a.jsxs("div",{className:"lg-name",style:{color:Ia(s)},children:["Команда ",s+1]}),a.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function wy({pack:n,round:e,gameState:t}){const i=j.useMemo(()=>e.questions.filter(m=>!m.hidden),[e.questions]),[s,r]=j.useState(0),o=i[s],c=s+1>=i.length,l=()=>void bd({phase:"recap",round_number:t.round_number}).catch(vt),u=()=>{c?l():r(m=>m+1)};if(j.useEffect(()=>{if(!o){l();return}let m=!0;const g=()=>{m&&u()},y=setTimeout(g,My),x=o.media.voice;if(!x)return()=>{m=!1,clearTimeout(y)};let p=!1;const M=Qt();M.src=He(x),M.play().then(()=>{if(p)try{M.pause(),M.src=""}catch{}}).catch(()=>{});const S=()=>{clearTimeout(y),g()};return M.addEventListener("ended",S),()=>{m=!1,p=!0,clearTimeout(y),M.removeEventListener("ended",S);try{M.pause(),M.src=""}catch{}}},[s,o==null?void 0:o.id]),!o)return null;const d=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost",onClick:l,children:"Пропустить повтор"}),a.jsx("button",{onClick:u,children:c?"К ответам →":"Следующий →"})]});if(Rt(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(xp,{q:o,roundName:e.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Повтор вопросов · ${s+1} из ${i.length}`,seconds:e.timer_seconds},o.id),d]});const f=(o.media.question??[]).filter(m=>!/\.(mp3|wav|mp4|webm)$/i.test(m)),h=!!o.question_text.trim();return a.jsxs("div",{className:`host-screen grid-bg recap-screen${f.length?" has-media":""}${h?"":" no-qtext"}`,children:[a.jsxs("div",{className:"host-topbar",children:[a.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),a.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),a.jsxs("div",{className:"recap-body",children:[h&&a.jsx("p",{className:`q-text${La(o.question_text)}`,children:o.question_text}),f.length>0&&a.jsx("div",{className:`q-media-grid n${Math.min(f.length,4)}${f.length>1?" eq-row":""}${f.length>4?" wrap2":""}`,style:vd(o),children:f.map((m,g)=>a.jsx(Pa,{src:He(m)},g))})]},o.id),a.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((m,g)=>a.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),d]})}function Ey(n,e){j.useEffect(()=>{if(!n)return;const i=n.questions.filter(o=>!o.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const o of s){const c=He(o);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(o)){const l=document.createElement(/\.(mp4|webm)$/i.test(o)?"video":"audio");l.preload="auto",l.src=c,r.push(l)}else{const l=new Image;l.src=c,r.push(l)}}return()=>{for(const o of r)try{o.src=""}catch{}}},[n,e])}function Ty(n,e){j.useEffect(()=>{if(!n)return;const t=[n.rounds[e],n.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const i=[...Sh({id:n.id,rounds:t})];return wh(i),()=>Eh(i)},[n,e])}function Ay({pack:n,slide:e,packId:t,gameState:i}){var f,h;const s=n.rounds.filter(m=>!m.off_scoreboard).map(m=>({id:m.id,name:(m.title_lines??[]).join(" ")||"—",count:m.questions.filter(g=>!g.hidden).length})),r=Ln(i.game_id),o=_h(n,r.length),c=Rt(n.theme),l=c&&(e.images??[]).length===1?[He(e.images[0])]:[],u=vh(l),d=a.jsx("div",{className:"host-actions",children:a.jsx(Ry,{slides:((f=n.settings)==null?void 0:f.info_slides)??[],index:Cy(n,e),packId:t,paper:((h=n.settings)==null?void 0:h.play_mode)==="paper"})});if(c){const m=zf({slide:e,rounds:s,stats:o,image:l.length?{src:l[0],...u.sizes[0]}:null});if(m)return a.jsxs(a.Fragment,{children:[l.length&&!u.ready?null:a.jsx(fp,{view:m}),d]})}return a.jsxs(a.Fragment,{children:[a.jsx(Mh,{slide:e,rounds:s,stats:o,mediaUrl:He}),d]})}function Cy(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function Ry({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return a.jsxs(a.Fragment,{children:[e>0&&a.jsx("button",{className:"ghost",onClick:()=>void ei(e-1),children:"← Назад"}),e+1<n.length&&a.jsx("button",{className:"ghost",onClick:()=>void ei(e+1),children:"Дальше →"}),s?i?a.jsx("button",{onClick:()=>void Yh(),children:"К подсчёту →"}):a.jsx("button",{onClick:()=>void Ua(t),children:"К итогам →"}):a.jsx("button",{onClick:()=>void vr("round_intro"),children:"К раунду →"})]})}function Ny({pack:n,round:e,gameState:t}){var p;const{state:i,setState:s}=Qu(t.game_id,t.round_number),r=Ln(t.game_id),o=Vi(t.game_id,t.round_number,400),c=j.useMemo(()=>e.questions.map(M=>({id:M.id,hidden:M.hidden})),[e.questions]),l=e.settings;j.useEffect(()=>{var T;const M=l.bg_music??((T=n.settings)==null?void 0:T.bg_music);if(!M)return;let S=!1;const b=Qt();return b.src=He(M),b.loop=!0,b.volume=.6,b.play().then(()=>{if(S)try{b.pause(),b.src=""}catch{}}).catch(()=>{}),()=>{S=!0;try{b.pause(),b.src=""}catch{}}},[e.id,l.bg_music,(p=n.settings)==null?void 0:p.bg_music]);const u=j.useRef(!1),d=async M=>{if(!u.current){u.current=!0,s(M);try{await eh(t.game_id,t.round_number,M),M.finished&&!(i!=null&&i.finished)&&(await th(t.game_id,t.round_number,Cc(Pc(M),l.timeoutPenalty??10)),Ah(e.id,Ch(i,M)).catch(S=>console.warn("банк блица: неотыгранные не вернулись —",S instanceof Error?S.message:S)))}finally{u.current=!1}}};j.useEffect(()=>{if(i||r.length<2)return;const M=setTimeout(()=>{const S=[...r].sort(()=>Math.random()-.5).map(b=>b.id);d(Bh(S,l.teamSeconds??60))},3e3);return()=>clearTimeout(M)},[i,r.length]),j.useEffect(()=>{if(!i||i.finished||i.current)return;const M=setTimeout(()=>{const S=kh(c,i.used);if(!S)return void d(Nr(i));Th(S.id).catch(()=>{}),d(zh(i,S.id,St()))},Rc);return()=>clearTimeout(M)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const f=i==null?void 0:i.current,h=f?e.questions.find(M=>M.id===f.questionId):void 0,m=i?Gh(i):void 0;j.useEffect(()=>{if(!i||!f||!h||!m)return;const M=o.find(b=>b.team_id===m&&b.question_ref===`q-${h.id}`);if(!(M!=null&&M.answer_text)||f.lastAnswer===M.answer_text)return;if(M.answer_text===Hh){d(Pr(vs(i,St()),St()));return}const S=Li(h.answer,M.answer_text)===!0;d(jh(i,St(),S?"ok":"no",M.answer_text))},[o,f==null?void 0:f.questionId,f==null?void 0:f.lastAnswer]);const g=(f==null?void 0:f.verdict)==="no"&&f.attempts+1>=Nc;if(j.useEffect(()=>{if(!i||!(f!=null&&f.verdict))return;const S=Math.max(0,(g?Xh:Rc)-(St()-(f.pausedAt??St()))),b=setTimeout(()=>{const T=St(),w=vs(i,T),R=o.find(v=>v.team_id===m&&v.question_ref===`q-${f.questionId}`);R&&Ad.patchAnswer(R.id,{is_correct:f.verdict==="ok"}).catch(()=>{}),d(f.verdict==="ok"?Lr(w,T):Ir(w,T))},S);return()=>clearTimeout(b)},[f==null?void 0:f.verdict,f==null?void 0:f.lastAnswer]),Rt(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(gh,{state:i,teams:r,bank:c,teamSeconds:l.teamSeconds??60,penalty:l.timeoutPenalty??10,question:M=>{const S=e.questions.find(b=>b.id===M);return S?{text:S.question_text,answer:si(S)}:void 0}}),a.jsx("div",{className:"host-actions",children:i!=null&&i.finished?a.jsx(Rn,{pack:n,gameState:t}):i&&a.jsxs(a.Fragment,{children:[(f==null?void 0:f.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const M=St(),S=vs(i,M);d(f.verdict==="ok"?Ir(S,M):Lr(S,M))},children:["Исправить на «",f.verdict==="ok"?"неверно":"верно","»"]}),f&&f.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void d(Pr(i,St())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&d(Nr(i))},children:"Завершить раунд"})]})})]});if(!i)return a.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[a.jsx("div",{className:"host-topbar",children:a.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),a.jsx(Tc,{teams:r,rolling:!0})]});if(i.finished){const M=Cc(Pc(i),l.timeoutPenalty??10);return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),a.jsxs("table",{className:"score-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),a.jsx("th",{children:"Очки"}),a.jsx("th",{children:"Баллы"})]})}),a.jsx("tbody",{children:M.map(S=>{var b;return a.jsxs("tr",{children:[a.jsxs("td",{children:[S.place,S.shared?"=":""]}),a.jsx("td",{children:((b=r.find(T=>T.id===S.teamId))==null?void 0:b.name)??"—"}),a.jsx("td",{children:S.points}),a.jsx("td",{children:S.score})]},S.teamId)})})]}),a.jsx("div",{className:"host-actions",children:a.jsx(Rn,{pack:n,gameState:t})})]})}const y=i.current!=null||Object.values(i.correct).some(M=>M>0)||Object.values(i.missed).some(M=>M>0),x=!f&&i.lastReveal?(()=>{const M=e.questions.find(S=>S.id===i.lastReveal.questionId);if(M)return{questionText:M.question_text,answerText:si(M),verdict:i.lastReveal.verdict}})():void 0;return a.jsxs(a.Fragment,{children:[a.jsx(xh,{teams:r,state:i,bank:c,questionText:h==null?void 0:h.question_text,verdict:f==null?void 0:f.verdict,reveal:x,answerText:(f==null?void 0:f.verdict)==="ok"||(f==null?void 0:f.verdict)==="no"&&f.attempts+1>=Nc?si(h):void 0,dice:y?void 0:a.jsx(Tc,{teams:r,rolling:!1,pickedId:i.order[0]})}),a.jsxs("div",{className:"host-actions",children:[(f==null?void 0:f.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const M=St(),S=vs(i,M);d(f.verdict==="ok"?Ir(S,M):Lr(S,M))},children:["Исправить на «",f.verdict==="ok"?"неверно":"верно","»"]}),f&&f.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void d(Pr(i,St())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&d(Nr(i))},children:"Завершить раунд"})]})]})}function ld({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:o=!1,gameId:c,roundNumber:l}){const u=(n.media.question??[]).some(m=>/\.(mp3|mp4|webm|wav)$/i.test(m)),d=j.useRef(null),f=j.useRef(null),h=j.useRef(!1);return j.useEffect(()=>{if(xy(),o&&!u||t)return;let m=!1;const g=(n.media.question??[]).find(p=>/\.(mp3|wav|m4a|ogg)$/i.test(p));h.current=!1;const y=()=>{if(!m){if(h.current=!0,g){const p=Qt();p.src=He(g),f.current=p,p.play().catch(()=>{})}Ic(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){y();return}const x=Qt();return x.src=He(n.media.voice),d.current=x,x.onended=y,x.onerror=y,x.play().then(()=>{if(m)try{x.pause(),x.src=""}catch{}}).catch(y),()=>{var M;m=!0;const p=d.current;if(p){p.onended=null,p.onerror=null;try{p.pause(),p.src=""}catch{}}d.current=null,(M=f.current)==null||M.pause()}},[n.id,o]),j.useEffect(()=>{if(!o||!t||u)return;let m=!1;const g=(n.media.question??[]).find(x=>/\.(mp3|wav|m4a|ogg)$/i.test(x)),y=()=>{if(m||!g)return;const x=Qt();x.src=He(g),f.current=x,x.play().catch(()=>{})};if(n.media.voice){const x=Qt();x.src=He(n.media.voice),d.current=x,x.onended=y,x.onerror=y,x.play().then(()=>{if(m)try{x.pause(),x.src=""}catch{}}).catch(y)}else y();return()=>{var p;m=!0;const x=d.current;if(x){x.onended=null,x.onerror=null;try{x.pause(),x.src=""}catch{}}d.current=null,(p=f.current)==null||p.pause()}},[n.id,o,t]),j.useEffect(()=>{if(t||o)return;const m=setInterval(()=>{if(t)return;const g=d.current;g&&!g.paused&&!g.ended||Ic(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(m)},[n.id,t,o]),j.useEffect(()=>{var b;const m=e.settings.bg_music??((b=i==null?void 0:i.settings)==null?void 0:b.bg_music);if(!t||!m||u)return;let g=!1;const y=Qt();y.src=He(m),y.loop=!0,y.volume=.6,y.play().then(()=>{if(g)try{y.pause(),y.src=""}catch{}}).catch(()=>{});let x;const p=(r??e.timer_seconds??60)*1e3,M=s?p-(St()-new Date(s).getTime()):p,S=window.setTimeout(()=>{x=window.setInterval(()=>{y.volume=Math.max(0,y.volume-.1),y.volume<=.01&&(x&&clearInterval(x),y.pause())},80)},Math.max(0,M)+3e3);return()=>{g=!0,clearTimeout(S),x&&clearInterval(x);try{y.pause(),y.src=""}catch{}}},[t,n.id]),null}function Py({pack:n,round:e,gameState:t}){var u;const i=e.settings.answerTimeSeconds??60,s=((u=n.settings)==null?void 0:u.play_mode)==="paper",r=Ln(t.game_id),o=Vi(t.game_id,t.round_number),c=e.questions.filter(d=>!d.hidden).length;j.useEffect(()=>{var m;const d=e.settings.bg_music??((m=n.settings)==null?void 0:m.bg_music);if(!d)return;let f=!1;const h=Qt();return h.src=He(d),h.loop=!0,h.volume=.6,h.play().then(()=>{if(f)try{h.pause(),h.src=""}catch{}}).catch(()=>{}),()=>{f=!0;try{h.pause(),h.src=""}catch{}}},[e.id]);const l=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>void di(e.questions.length-1,_t(t)).catch(vt),children:"← Назад"}),a.jsx("button",{onClick:()=>void ds(0,!1,_t(t)).catch(vt),children:"К ответам →"})]});return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(gp,{num:tn(n,t.round_number),paper:s,startedAt:t.timer_started_at,seconds:i,teams:s?null:r.map(d=>{const f=o.filter(h=>{var m;return h.team_id===d.id&&((m=h.answer_text)==null?void 0:m.trim())}).length;return{id:d.id,name:d.name,color:ri(d.color),got:f,total:c,done:f>=c}})}),l]}):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[a.jsxs("div",{className:"mono-tag",children:["РАУНД ",tn(n,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),a.jsx("div",{className:"answer-pulse",children:a.jsx(En,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),a.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),a.jsx(as,{startedAt:t.timer_started_at,seconds:i,theme:n.theme,variant:"ring"}),!s&&a.jsx("div",{className:"answer-time-teams",children:r.map(d=>{const f=o.filter(m=>{var g;return m.team_id===d.id&&((g=m.answer_text)==null?void 0:g.trim())}).length,h=f>=c;return a.jsxs("div",{className:`at-team${h?" done":""}`,children:[a.jsx("span",{style:{color:d.color},children:d.name})," · ",f,"/",c]},d.id)})}),l]})}function Ly({pack:n,round:e,q:t,gameState:i}){var R;const s=((R=n.settings)==null?void 0:R.play_mode)==="paper",r=Vi(i.game_id,i.round_number),o=i.reveal,c=Ln(i.game_id),[l,u]=j.useState([]);j.useEffect(()=>{Ku.from("teams").select("id,name,color").then(({data:v})=>u(v??[]))},[]);const d=r.filter(v=>v.question_ref===`q-${t.id}`),f=e.questions.length,h=i.question_index;j.useEffect(()=>{if(o)return;const v=_t(i),E=setTimeout(()=>{ki(v).catch(vt)},3e3);return()=>clearTimeout(E)},[o,h]);const[m,g]=j.useState(!1);j.useEffect(()=>{if(g(!1),!o)return;const v=setTimeout(()=>g(!0),od(t)+600);return()=>clearTimeout(v)},[o,t.id]),j.useEffect(()=>{!m||document.hidden||d.forEach(v=>{if(v.is_correct!=null)return;const E=Li(t.answer,v.answer_text);E!==null&&Ad.patchAnswer(v.id,{is_correct:E}).catch(()=>{})})},[m,h,d.length,d.map(v=>v.answer_text).join("|")]);const y=t.answer.mode==="choice"?t.answer.choices:null,x=(t.media.question??[]).filter(v=>!/\.(mp3|mp4|webm|wav)$/i.test(v)),p=(t.media.answer??[]).filter(v=>!/\.(mp3|mp4|webm|wav)$/i.test(v)),M=(t.media.question??[]).filter(v=>!/\.(mp3|mp4|webm|wav)$/i.test(v)),S=p.length?p:M,b=t.media.hidden?(t.media.question??[]).find(v=>/\.(mp4|webm)$/i.test(v)):void 0,T=(t.media.answer??[]).find(v=>/\.(mp3|wav|m4a|ogg)$/i.test(v)),w=a.jsxs("div",{className:"host-actions",children:[h>0&&a.jsx("button",{className:"ghost",onClick:()=>void ds(h-1,!0,_t(i)).catch(vt),children:"← Назад"}),o?h<f-1?a.jsx("button",{onClick:()=>void ds(h+1,!1,_t(i)).catch(vt),children:"Следующий вопрос →"}):a.jsx(Rn,{pack:n,gameState:i}):a.jsx("button",{onClick:()=>void ki(_t(i)).catch(vt),children:"Показать ответ →"})]});if(e.mechanic==="crossword"&&Rt(n.theme)&&sc(e))return a.jsx(bM,{pack:n,round:e,q:t,step:h,answers:r,teams:c,allTeams:l,revealed:o,checked:m,paper:s,effects:o&&T?a.jsx(rs,{src:He(T)}):null,video:o&&b?a.jsx(Na,{src:He(b)}):void 0,imgs:o?S:t.media.hidden?[]:M,actions:w},t.id);if(Rt(n.theme)&&e.mechanic==="sprint")return a.jsxs(a.Fragment,{children:[a.jsx(yh,{title:e.title_lines.join(" "),count:f,step:h,q:{text:t.question_text,answer:si(t)},shown:o,verdicts:m,answers:s?null:d.map(v=>{const E=c.find(I=>I.id===v.team_id)??l.find(I=>I.id===v.team_id);return{team:(E==null?void 0:E.name)??"—",color:ri(E==null?void 0:E.color),text:v.answer_text||"—",ok:m?v.is_correct??Li(t.answer,v.answer_text):null}}),qImgs:t.media.hidden?[]:M.map(He),aImgs:S.map(He),note:t.answer_note||void 0,extra:o&&T?a.jsx(rs,{src:He(T)}):null}),w]});if(Rt(n.theme)&&e.mechanic!=="crossword"&&e.mechanic!=="anagram"&&t.answer.mode!=="crossword_word"&&t.answer.mode!=="anagram")return a.jsx(dy,{round:e,q:t,step:h,answers:r,teams:c,allTeams:l,revealed:o,checked:m,paper:s,revealMs:od(t),answerText:si(t),effects:o&&T?a.jsx(rs,{src:He(T)}):null,video:o&&b?a.jsx(Na,{src:He(b)}):void 0,actions:w},t.id);if(!o&&e.mechanic!=="anagram"&&t.answer.mode!=="anagram"){const v=new Set(d.filter(E=>E.answer_text!==""&&E.answer_text!=null).map(E=>E.team_id));return a.jsxs(a.Fragment,{children:[a.jsx(gd,{pack:n,round:e,roundIdx:i.round_number,q:t,qIndex:h,qCount:f,timeLow:!1,reveal:!1,timerRunning:!1,timerStartedAt:null,quiet:!0,timerSlot:null,effectsSlot:null,actionsSlot:w}),!s&&c.length>0&&a.jsxs("div",{className:"answered-chip",role:"status",children:["Ответили ",a.jsx("b",{children:v.size})," из ",a.jsx("b",{children:c.length})]})]})}return a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[a.jsxs("div",{className:"host-topbar",children:[a.jsxs("span",{className:"mono-tag",children:["РАУНД ",tn(n,i.round_number)," :: ОТВЕТЫ"]}),a.jsxs("span",{className:"qnum",children:["ВОПРОС ",a.jsx("b",{children:h+1})," / ",f]})]}),a.jsxs("div",{className:`answers-layout${o?" revealed":""}`,style:{marginTop:60},children:[a.jsxs("div",{className:`answers-main${o?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!o&&a.jsxs(a.Fragment,{children:[a.jsx("p",{className:`q-text${La(t.question_text)}`,children:t.question_text}),M.length>0&&!t.media.hidden&&a.jsx("div",{className:`q-media-grid n${Math.min(M.length,4)}${M.length>1?" eq-row":""}${M.length>4?" wrap2":""}`,style:vd(t),children:M.map((v,E)=>a.jsx(Pa,{src:He(v)},E))})]}),o&&t.answer.mode!=="match"&&t.question_text.trim()&&a.jsx("p",{className:`q-recall${La(t.question_text)}`,children:t.question_text}),o&&a.jsxs("div",{className:"answer-block reveal-in",children:[a.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),b&&a.jsx(Na,{src:He(b)}),T&&a.jsx(rs,{src:He(T)}),e.mechanic==="rebus"?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"answer-main",children:si(t)}),a.jsx("div",{className:"rebus-answer",children:M.slice(0,2).map((v,E)=>a.jsxs("figure",{className:"q-img",children:[a.jsx("img",{src:He(v),alt:""}),a.jsx("figcaption",{children:_y(E===0?t.service.word1:t.service.word2,E===0)})]},E))})]}):t.answer.mode==="match"?a.jsx(Dy,{q:t}):y&&x.length===y.length?a.jsx(dd,{q:t,choices:y,imgs:x,theme:n.theme}):y?a.jsx(dd,{q:t,choices:y,theme:n.theme}):t.answer.mode==="order"?a.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((v,E)=>{const I=t.answer.choices.find(P=>P.key===v);return a.jsxs("div",{className:"oi",children:[a.jsx("b",{children:v}),a.jsx("span",{className:"oi-pos",children:E+1}),a.jsx("span",{className:"oi-text",children:(I==null?void 0:I.text)??""})]},E)})}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"answer-main",children:si(t)}),S.length>0&&a.jsx("div",{className:`q-media-grid answer-media n${Math.min(S.length,4)}${S.length>1?" eq-row":""}${S.length>4?" wrap2":""}`,children:S.map((v,E)=>a.jsx(Pa,{src:He(v)},E))})]}),m&&t.answer_note&&a.jsx("div",{className:`answer-note${my(t.answer_note)}`,children:t.answer_note})]})]}),!s&&a.jsxs("div",{className:"team-answers",children:[a.jsx("div",{className:"mono-tag",children:o?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${d.length}`}),d.length===0&&a.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),d.map(v=>{const E=c.find(P=>P.id===v.team_id)??l.find(P=>P.id===v.team_id),I=m?v.is_correct??Li(t.answer,v.answer_text):null;return a.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${I===!0?"var(--ok)":I===!1?"var(--danger)":"var(--dim)"}`},children:[a.jsx("span",{className:"name",style:{color:E==null?void 0:E.color},children:(E==null?void 0:E.name)??"—"}),a.jsxs("span",{className:"text",children:[o?v.answer_text||"—":"• • •",v.stake!=null&&v.stake!==0&&a.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",v.stake]})]}),I!=null&&a.jsx("span",{className:"mark",style:{color:I?"var(--ok)":"var(--danger)"},children:I?"✓":"✗"})]},v.id)})]})]}),w]})}function dd({q:n,choices:e,imgs:t,theme:i}){const[s,r]=j.useState(0);j.useEffect(()=>{r(0);const h=setTimeout(()=>r(1),2200),m=setTimeout(()=>r(2),Gu);return()=>{clearTimeout(h),clearTimeout(m)}},[n.id]);const o=n.answer.correct_choice??"",c=e.filter(h=>h.key!==o),l=new Set(vy(c.map(h=>h.key),n.id).slice(0,2)),u=h=>s>=1||l.has(h)?s<2?"":h===o?" correct":" dimmed":" hidden-yet",d=h=>l.has(h)?0:.25*e.filter(m=>!l.has(m.key)).findIndex(m=>m.key===h),f=i==="potter";return t?a.jsx("div",{className:"choice-imgs",children:e.map((h,m)=>a.jsxs("div",{className:`choice-img${u(h.key)}`,style:{animationDelay:`${d(h.key)}s`},children:[a.jsx("img",{src:He(t[m]),alt:""}),a.jsxs("span",{className:"key",children:[h.key,h.text?` — ${h.text}`:""]})]},h.key))}):a.jsx("div",{className:`choices-grid${bh(e.map(h=>h.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(h=>a.jsxs("div",{className:`choice-plate${u(h.key)}`,style:{animationDelay:`${d(h.key)}s`},children:[a.jsx("span",{className:"key",children:h.key}),h.text,f&&u(h.key)===" correct"&&a.jsx(Iy,{})]},h.key))})}function Iy(){return a.jsx("svg",{className:"mg-check",viewBox:"0 0 24 24",width:"26",height:"26","aria-hidden":"true",children:a.jsx("path",{d:"M4 13l5 5L20 6",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}function ud({enabled:n,startedAt:e,seconds:t,from:i}){const s=j.useRef(i);return s.current=i,j.useEffect(()=>{if(!n||!e)return;const r=new Date(e).getTime()+t*1e3-St(),o=s.current,c=setTimeout(()=>{ki(o).catch(vt)},Math.max(0,r));return()=>clearTimeout(c)},[n,e,t]),null}function hd({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return j.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,o=Math.max(500,r-St()),c=_t(e),l=setTimeout(()=>{di(e.question_index+1,c).catch(vt)},o);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function Dy({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return a.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var l;const o=((l=i.find(u=>u.startsWith(s)))==null?void 0:l.slice(s.length))??"—",c=(e.right_labels??[])[(e.right??[]).indexOf(o)]||o;return a.jsxs("div",{className:"mi",children:[t[r]&&a.jsx("img",{src:He(t[r]),alt:""}),a.jsxs("div",{className:"mi-label",children:[a.jsxs("b",{children:[s," → ",o]}),c&&c!==o&&a.jsx("span",{className:"mi-text",children:c})]})]},s)})})}function Uy({pack:n,gameState:e}){const t=Ln(e.game_id),i=Vi(e.game_id),s=Md(n,t,i),r=yd(n,t,i),o=n.rounds.filter(x=>!x.off_scoreboard),c=Fa(t,s,i,r),l=c.map(x=>x.team),[u,d]=j.useState(0);j.useEffect(()=>{if(d(0),l.length===0)return;const x=setInterval(()=>d(p=>p>=l.length?p:p+1),2200);return()=>clearInterval(x)},[l.length,e.round_number]);const f=j.useRef(null),h=Oo([l.length,o.length],{shrinkBefore:f}),m=j.useMemo(()=>{const x=new Map(t.map(M=>{const S=s.get(M.id)??0,b=(r.get(M.id)??[])[e.round_number]??0;return[M.id,S-b]})),p=new Map(t.map(M=>[M.id,(r.get(M.id)??[]).slice(0,e.round_number)]));return Fa(t,x,i,p).map(M=>M.team)},[t,s,r,i,e.round_number]),g=j.useRef(new Map),y=j.useRef(null);if(j.useLayoutEffect(()=>{if(n.theme!=="classic"&&n.theme!=="potter"||l.length===0||u<l.length||y.current===e.round_number||(y.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const p=new Map(m.map((S,b)=>[S.id,b]));l.forEach((S,b)=>{const T=g.current.get(S.id);if(!T)return;const R=(p.get(S.id)??b)-b;if(R===0)return;const v=T.getBoundingClientRect().height;T.style.transition="none",T.style.transform=`translateY(${R*v}px)`,T.classList.add("sb-flip"),T.offsetHeight,requestAnimationFrame(()=>{T.style.transition="",T.style.transform=""})});const M=setTimeout(()=>{g.current.forEach(S=>S.classList.remove("sb-flip"))},900);return()=>clearTimeout(M)},[u,l,m,n.theme,e.round_number]),Rt(n.theme)){const x=o.map(T=>n.rounds.indexOf(T)),p=Gf(x,e.round_number,c.map(T=>x.map(w=>(r.get(T.team.id)??[])[w]??0))),M=x.slice(0,p),S=x.some(T=>T<e.round_number),b={kind:"regular",title:"Табло",sub:`после раунда ${p} из ${o.length}`,flip:!1,cols:M.map(T=>tn(n,T)),rows:Ld(c,r,M,ri,S?{order:m.map(T=>T.id)}:void 0)};return a.jsxs(a.Fragment,{children:[a.jsx(Ud,{view:b,reveal:u,flipKey:S?String(e.round_number):null}),a.jsx("div",{className:"host-actions",children:a.jsx(Rn,{pack:n,gameState:e})})]})}return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),a.jsx("h2",{className:"sb-title",ref:f,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),a.jsx("div",{className:"sb-table-wrap",children:a.jsxs("table",{ref:h,className:`score-table${Hu(l.length)}`,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),o.map((x,p)=>a.jsxs("th",{children:["Р",p+1]},x.id)),a.jsx("th",{children:"Σ"})]})}),a.jsx("tbody",{children:l.map((x,p)=>{const M=c.find(T=>T.team.id===x.id),S=(M==null?void 0:M.place)??1,b=p>=l.length-u;return a.jsxs("tr",{ref:T=>{T?g.current.set(x.id,T):g.current.delete(x.id)},className:`sb-row${b?" is-in":" is-veiled"}${S===1?" leader":""}`,children:[a.jsxs("td",{children:[S<=3?a.jsx("span",{className:"sb-medal",children:a.jsx(ka,{theme:n.theme,place:S})}):S,(M==null?void 0:M.shared)&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:x.color,fontFamily:"var(--font-display)"},children:a.jsx("span",{className:"sb-name",children:x.name})}),o.map(T=>{const w=r.get(x.id)??[];return a.jsx("td",{children:w[n.rounds.indexOf(T)]??0},T.id)}),a.jsx("td",{className:"total",children:s.get(x.id)??0})]},x.id)})})]})}),a.jsx("div",{className:"host-actions",children:a.jsx(Rn,{pack:n,gameState:e})})]})}function Fy({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=j.useState(i*60);j.useEffect(()=>{const l=t.timer_started_at?new Date(t.timer_started_at).getTime():St(),u=()=>r(Math.max(0,Math.round(i*60-(St()-l)/1e3)));u();const d=setInterval(u,500);return()=>clearInterval(d)},[t.timer_started_at,i]);const o=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Ii,{view:{state:"break",clock:Id(s),sub:"Антракт · скоро продолжим"},step:"break"}),a.jsx("div",{className:"host-actions",children:a.jsx(Rn,{pack:n,gameState:t})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen",children:[n.theme!=="potter"&&a.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),a.jsx(En,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),a.jsx(xr,{theme:n.theme}),n.theme==="potter"&&a.jsx(xd,{left:s,seconds:i*60,low:s<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"host-actions",children:a.jsx(Rn,{pack:n,gameState:t})})]})}function Oy({pack:n,gameState:e}){var l,u;const[i,s]=j.useState(300);j.useEffect(()=>{const d=e.timer_started_at?new Date(e.timer_started_at).getTime():St(),f=()=>s(Math.max(0,Math.round(5*60-(St()-d)/1e3)));f();const h=setInterval(f,500);return()=>clearInterval(h)},[e.timer_started_at]),j.useEffect(()=>{var h,m;const d=((h=n.settings)==null?void 0:h.finale_music)??((m=n.settings)==null?void 0:m.bg_music);if(!d||document.hidden)return;const f=Qt();return f.src=He(d),f.loop=!0,f.volume=.55,f.play().catch(()=>{}),()=>{try{f.pause(),f.src=""}catch{}}},[(l=n.settings)==null?void 0:l.finale_music,(u=n.settings)==null?void 0:u.bg_music]);const r=Ln(Rt(n.theme)?e.game_id:null),o=String(Math.floor(i/60)).padStart(2,"0"),c=String(i%60).padStart(2,"0");return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Ii,{view:{state:"antic",hues:r.map(d=>Tn(d.color)),title:"Подводим итоги",sub:"Скоро объявим победителей",clock:Id(i)},step:`antic-${r.length>0}`}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void Ua(e.pack_id,!0),children:"К итогам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[a.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),a.jsx(En,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),a.jsx(xr,{theme:n.theme}),n.theme==="potter"&&a.jsx(xd,{left:i,seconds:5*60,low:i<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void Ua(e.pack_id,!0),children:"К итогам →"})})]})}function By({pack:n,gameId:e,gameState:t}){var E,I,P,L,z,O,$;const i=Ln(e),s=Vi(e),r=Md(n,i,s),o=yd(n,i,s),c=Fa(i,r,s,o),l=!!t.reveal,u=t.question_index??0,[d,f]=j.useState(!((E=n.settings)!=null&&E.show_final_cinematic));j.useEffect(()=>{var K,ie;const k=((K=n.settings)==null?void 0:K.finale_music)??((ie=n.settings)==null?void 0:ie.bg_music);if(!k||document.hidden||!d)return;const U=Qt();return U.src=He(k),U.loop=!0,U.volume=.55,U.play().catch(()=>{}),()=>{try{U.pause(),U.src=""}catch{}}},[(I=n.settings)==null?void 0:I.finale_music,(P=n.settings)==null?void 0:P.bg_music,d]);const h=j.useRef(null),m=Oo([c.length],{shrinkBefore:h,minScale:.3}),g=n.rounds.map((k,U)=>({r:k,i:U})).filter(k=>!k.r.off_scoreboard),y=g.map(({r:k,i:U})=>{var pe;let K=null,ie=-1/0;for(const he of i){const me=((pe=o.get(he.id))==null?void 0:pe[U])??0;me>ie&&(ie=me,K=he)}return{round:k,idx:U,team:K,score:ie}}),x=3e3,p=1e4,M=y.length;j.useEffect(()=>{if(l||u>M||!d)return;const U=setTimeout(()=>void ei(u+1),u===M?p:x);return()=>clearTimeout(U)},[l,u,M,d]);const[S,b]=j.useState(0);j.useEffect(()=>{if(b(0),c.length===0)return;let k=!1,U=0,K;const ie=()=>{k||(U+=1,b(U),!(U>=c.length)&&(K=setTimeout(ie,Math.max(320,900-90*U))))};return K=setTimeout(ie,Math.max(320,900-90*U)),()=>{k=!0,clearTimeout(K)}},[c.length,u,l]);const T=Rt(n.theme);if(!d)return T?a.jsx(mp,{hues:i.map(k=>Tn(k.color)),onDone:()=>f(!0)}):a.jsx(sM,{onDone:()=>f(!0)});if(T){const k=a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Ks()},children:"⟲ Новая игра"})}),U=g.map(he=>he.i),K={kind:"final",title:"Итоги игры",sub:"разбивка по раундам",flip:!1,cols:U.map(he=>tn(n,he)),rows:Ld(c,o,U,ri)},ie=a.jsxs(a.Fragment,{children:[a.jsx(Ud,{view:K,reveal:S,flipKey:null}),k]}),pe=()=>void ei(u+1);if(l){const he=[...new Set(c.map(ge=>ge.place))].filter(ge=>ge<=3).sort((ge,Be)=>Be-ge);if(u>=he.length)return ie;const me=new Set(he.slice(0,u+1)),Pe=Hf(c,ri,Tn).filter(ge=>me.has(ge.place));return a.jsx(Ii,{view:{state:"medals",slots:Pe},step:`medals-${u}`,only:he[u]-1,onClick:pe})}if(u<M){const he=y.map(me=>({n:tn(n,me.idx),name:me.round.title_lines.join(" ").replace(/\s+/g," ").trim(),team:me.team?{name:me.team.name,color:ri(me.team.color)}:null,pts:me.team?me.score:0}));return a.jsx(Ii,{view:{state:"retro",cards:he,shown:u+1},step:`retro-${u}`,only:u,onClick:pe})}if(u===M){const he=c.filter(me=>me.place===1);return a.jsx(Ii,{view:{state:"winner",names:he.map(me=>({name:me.team.name,color:ri(me.team.color)})),sum:((L=he[0])==null?void 0:L.total)??0,hues:i.map(me=>Tn(me.color))},step:"winner",onClick:pe})}return ie}const w=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],R=a.jsx(a.Fragment,{children:Array.from({length:5},(k,U)=>a.jsxs("div",{className:"fw-burst",style:{left:`${12+U*19}%`,top:`${18+U%3*14}%`},children:[a.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${w[U%w.length]}55, transparent 70%)`,"--dur":`${2.2+U*.3}s`,"--delay":`${U*.45}s`}}),Array.from({length:10},(K,ie)=>a.jsx("span",{className:"fw-spark",style:{background:w[(U+ie)%w.length],"--a":`${ie*36}deg`,"--dur":`${2.2+U*.3}s`,"--delay":`${U*.45}s`}},ie))]},U))}),v=a.jsxs("div",{className:"fin-breakdown",children:[a.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),a.jsx("div",{className:"fin-table-wrap",children:a.jsxs("table",{ref:m,className:`fin-table${Hu(c.length)}`,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),n.rounds.map((k,U)=>!k.off_scoreboard&&a.jsxs("th",{children:["Р",tn(n,U)]},k.id)),a.jsx("th",{children:"Σ"})]})}),a.jsx("tbody",{children:c.map(({team:k,place:U,shared:K},ie)=>{const pe=ie>=c.length-S;return a.jsxs("tr",{style:{"--tc":k.color},className:`fin-row${U<=3?" top3":""}${U===1?" fin-first":""}${pe?" is-in":" is-veiled"}`,children:[a.jsxs("td",{className:"fin-pos",children:[U<=3&&a.jsx(Up,{place:U}),U,K&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:k.color},children:a.jsx("span",{className:"sb-name",children:k.name})}),n.rounds.map((he,me)=>{var Pe;return!he.off_scoreboard&&a.jsx("td",{children:((Pe=o.get(k.id))==null?void 0:Pe[me])??0},he.id)}),a.jsx("td",{children:a.jsx("b",{children:r.get(k.id)??0})})]},k.id)})})]})})]});if(l){const k=[...new Set(c.map(ie=>ie.place))].filter(ie=>ie<=3).sort((ie,pe)=>pe-ie);if(u>=k.length)return a.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[R,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(En,{ref:h,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),v,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Ks()},children:"⟲ Новая игра"})})]});const U=k[u],K=c.filter(ie=>ie.place===U);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ei(u+1),children:[U===1&&R,a.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),a.jsxs("div",{className:`fin-award p${U}`,children:[a.jsxs("div",{className:"fin-award-place",children:[U," МЕСТО"]}),a.jsx("div",{className:"fin-award-medal",children:a.jsx(ka,{theme:n.theme,place:U})}),K.length>0?K.map(ie=>a.jsx("div",{className:"fin-award-name",style:{color:ie.team.color},children:ie.team.name},ie.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(u<M){const k=y[u];return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ei(u+1),children:[a.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),a.jsxs("div",{className:"fin-slide",children:[a.jsxs("div",{className:"fin-slide-round",children:["Раунд ",tn(n,k.idx)," · ",k.round.title_lines.join(" ")]}),a.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),a.jsx("div",{className:"fin-slide-team",style:{color:(z=k.team)==null?void 0:z.color},children:((O=k.team)==null?void 0:O.name)??"—"})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"3s"}})},u),a.jsx("div",{className:"fin-dots",children:y.map((U,K)=>a.jsx("span",{className:K===u?"on":""},K))})]})}if(u===M){const k=c.filter(U=>U.place===1);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ei(u+1),children:[R,a.jsx("div",{className:"mono-tag",children:k.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),a.jsxs("div",{className:"fin-award p1",children:[a.jsx("div",{className:"fin-award-medal",children:a.jsx(ka,{theme:n.theme,place:1})}),k.length>0?k.map(U=>a.jsx("div",{className:"fin-award-name",style:{color:U.team.color},children:U.team.name},U.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"}),a.jsx("div",{className:"fin-award-score",children:(($=k[0])==null?void 0:$.total)??0})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return a.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[R,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(En,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),v,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Ks()},children:"⟲ Новая игра"})})]})}export{Qy as HostScreen,my as noteClass,xy as stopAllMedia};
