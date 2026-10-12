import{j as a,s as qu}from"./index-B1h7WqTw.js";import{u as Yu,R as Ku,a as Zu,s as Ju,b as Qu}from"./useGameState-CcIkRzMU.js";import{r as H}from"./vendor-BbIxR9j-.js";import{c as Jt,t as Oi,h as En,m as eh,u as hs,a as ud,S as pn,s as Mc,R as th,B as nh,b as ih,d as sh,i as rh,e as hd,f as Do,D as ah,g as fd,A as Uo,j as Fo,T as Oo,Q as yc,k as is,l as oh,n as bc,o as ss,p as ch,M as lh,q as dh,J as uh,r as hh,v as Cn,w as fh,x as ph,F as mh,y as ii,z as Sc,C as gh,E as xh,G as _h,I as vh,H as Ra,K as si,L as Mh,N as pd,O as md,P as yh}from"./JeopardyRound-gfiI5h0P.js";import{m as He,a as Pi,u as Wn,i as Ar,s as wc,c as bh,p as Sh,r as wh,b as gd,d as Eh,e as Ec,l as Na,f as xd,g as _d,h as vd,j as Th,k as Ah}from"./jeopardyActions-CiMO8exF.js";import{t as Pa,n as Ch,l as Rh,a as Nh,b as Ph,g as Lh,s as Ih,c as Tc,d as li,e as Lt,q as Tt,m as Cr,f as en,h as cs,r as Bi,i as Md,j as _r,k as Ys,o as Dh,p as Uh,u as yd,v as La,w as fs,x as Fh,y as Oh,z as Rr,A as Bh,N as Ac,B as kh,S as zh,C as Nr,D as _s,E as Gh,M as Cc,F as bd,G as Pr,H as Lr,I as Rc,J as Hh,K as Nc,L as Vh,O as Pc,P as Ia,Q as Qn,R as jh,T as Wh,U as $h}from"./Hint-Lk6in6un.js";import{N as Lc,a as Xh,P as qh,S as Yh,b as Kh,Q as Zh,T as Jh,i as Sd,c as Qh,d as ef,e as tf,f as At}from"./ThemeLayer-HNITtYru.js";import{u as nf,F as sf,g as nt,f as rf}from"./shell-L4wZIDvx.js";import{Q as rr}from"./QrCode-DjkzGEXS.js";import{f as wd,F as Ed,u as af}from"./fromQuestion-9t_Gjso9.js";import{L as of,r as Da}from"./ranking-39C9V5Sp.js";import{C as cf}from"./CrosswordView-BoVnnW38.js";import"./pollLoop-BPx8gArJ.js";function Ic({pack:n}){var e,t;return H.useEffect(()=>{var l,d;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=Jt();s.src=He(i),s.loop=!0,s.volume=.45;let r=!1,o=!1;const c=()=>{o||r||(o=!0,s.play().then(()=>{if(r)try{s.pause(),s.src=""}catch{}}).catch(()=>{}),window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c))};return s.play().then(()=>{if(o=!0,r)try{s.pause(),s.src=""}catch{}}).catch(()=>{r||(window.addEventListener("pointerdown",c),window.addEventListener("keydown",c))}),()=>{r=!0,window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c);try{s.pause(),s.src=""}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}let vs=null;const lf=1e-4;function Dc(){try{if(vs){vs.state==="suspended"&&vs.resume().catch(()=>{});return}const n=window.AudioContext??window.webkitAudioContext;if(!n)return;const e=new n,t=Math.max(1,Math.floor(e.sampleRate*2)),i=e.createBuffer(1,t,e.sampleRate),s=i.getChannelData(0);for(let c=0;c<t;c++)s[c]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=i,r.loop=!0;const o=e.createGain();o.gain.value=lf,r.connect(o),o.connect(e.destination),r.start(),vs=e,e.state==="suspended"&&e.resume().catch(()=>{})}catch{}}function df(){const n=()=>Dc();return Dc(),window.addEventListener("pointerdown",n),window.addEventListener("keydown",n),()=>{window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)}}function Td({hue:n,id:e}){const t=`hsl(${n} 90% 88%)`,i=`hsl(${n} 78% 62%)`,s=`hsl(${n} 60% 26%)`;return a.jsxs("svg",{className:"b-lan",viewBox:"-60 0 120 170","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:`bl-${e}`,cx:"50%",cy:"58%",r:"60%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf0"}),a.jsx("stop",{offset:".22",stopColor:t}),a.jsx("stop",{offset:".62",stopColor:i}),a.jsx("stop",{offset:"1",stopColor:s})]}),a.jsxs("radialGradient",{id:`bg-${e}`,children:[a.jsx("stop",{offset:"0",stopColor:`hsl(${n} 95% 76%)`,stopOpacity:".65"}),a.jsx("stop",{offset:"1",stopColor:`hsl(${n} 95% 60%)`,stopOpacity:"0"})]})]}),a.jsx("ellipse",{className:"glow",cx:"0",cy:"92",rx:"92",ry:"98",fill:`url(#bg-${e})`}),a.jsx("g",{className:"cordg",children:a.jsx("line",{className:"cord",x1:"0",y1:"0",x2:"0",y2:"34",stroke:"#c9a566",strokeWidth:"2.4"})}),a.jsx("g",{transform:"translate(0 34)",children:a.jsxs("g",{className:"lbody",children:[a.jsx("ellipse",{cx:"0",cy:"4",rx:"13",ry:"5",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"1.6"}),a.jsx("path",{d:"M 0 8 C 32 12 46 54 31 96 C 23 116 9 128 0 134 C -9 128 -23 116 -31 96 C -46 54 -32 12 0 8 Z",fill:`url(#bl-${e})`,stroke:"#d9b36a",strokeWidth:"2"}),a.jsxs("g",{className:"ribs",fill:"none",stroke:"#d9b36a",strokeWidth:"1.8",opacity:".85",children:[a.jsx("path",{d:"M 0 8 C 14 40 14 100 0 134"}),a.jsx("path",{d:"M 0 8 C -14 40 -14 100 0 134"}),a.jsx("path",{d:"M 0 8 C 28 40 30 96 0 134"}),a.jsx("path",{d:"M 0 8 C -28 40 -30 96 0 134"})]}),a.jsx("ellipse",{cx:"-14",cy:"44",rx:"6",ry:"14",fill:"#fff",opacity:".35",transform:"rotate(14 -14 44)"}),a.jsx("path",{d:"M -10 136 L 0 156 L 10 136 Z",fill:"#d9b36a",opacity:".9"}),a.jsx("path",{d:"M -18 130 L -14 150 L -6 134 Z M 18 130 L 14 150 L 6 134 Z",fill:"#b88c46",opacity:".8"})]})})]})}const tt={x:960,y:592,rx:250,ry:270},Ks=704,Zs=1216,uf=[{py:322,ey:200},{py:474,ey:420},{py:626,ey:630}],hf=[{py:304,ey:188},{py:424,ey:366},{py:544,ey:522},{py:664,ey:664}],ff=n=>n<=12?uf:hf,Ua=(n,e,t,i)=>{const s=n[t],r=e<0?Ks:Zs,o=e<0?-30:1950,c=(i-r)/(o-r);return s.py+(s.ey-s.py)*c+Math.sin(c*Math.PI)*38},pf=n=>n<=4?44:n<=6?38:n<=9?34:n<=12?31:n<=16?27:24;function mf(n){const e=ff(n),t=e.length,i=Math.ceil(n/2),s=Math.max(1,Math.ceil(i/t)),r=c=>(n<=6?580:570)-c*(s===2?300:215),o=[];for(let c=0;c<n;c++){const l=c%2?1:-1,d=Math.floor(c/2),u=Math.floor(d/t),f=d%t,h=l<0?r(u):1920-r(u);o.push({x:h,ay:Ua(e,l,f,h),side:l,k:f,col:u})}return{slots:o,ropes:e,cols:s,sc:n<=6?1.15:n<=12?.8:n<=16?.72:.62,nameW:s===1?270:s===2?204:150,fs:pf(n)}}const gf=(n,e)=>`M ${tt.x} ${tt.y} C ${tt.x+(n-tt.x)*.2} ${tt.y-260}, ${n-(n-tt.x)*.35} ${e-180}, ${n} ${e}`,Ir={Q:.735,U:.694,I:.304,Z:.599," ":.25,P:.577,A:.647,R:.616,T:.575,Y:.638},xf=n=>{const e=(n-380)/1160;return 66+Math.sin(Math.max(0,Math.min(1,e))*Math.PI)*54},_f=(()=>{let i=960-[..."QUIZ PARTY"].reduce((s,r)=>s+Ir[r]*170+12,-12)/2;return[..."QUIZ PARTY"].flatMap((s,r)=>{const o=i+Ir[s]*170/2;return i+=Ir[s]*170+12,s===" "?[]:[{c:s,i:r,x:o}]})})(),Fa=24,Uc=Array.from({length:Fa},(n,e)=>{const t=e/Fa*Math.PI*2-Math.PI/2;return{x:tt.x+Math.cos(t)*tt.rx,y:tt.y+Math.sin(t)*tt.ry}}),Bo=n=>Math.min(Fa,4+n*2);function vf({teams:n,layout:e,fresh:t,qr:i,qrLit:s,litN:r,wait:o,rootRef:c,children:l}){const d=nf(),{slots:u,ropes:f,sc:h,nameW:p}=e,x=[-1,1].flatMap(g=>f.flatMap((y,w)=>Array.from({length:9},(S,T)=>{const M=g<0?Ks:Zs,R=M+g*(40+T*76);return{x:R,y:Ua(f,g,w,R)+4,o:w*9+T+(g<0?0:1)}}))).sort((g,y)=>g.o-y.o),b=Array.from({length:9},(g,y)=>{const w=y/8;return{x:960+(y%2?14:-14)*(1-w*.4),y:1040-w*190,w:120-w*70,h:24-w*12}}),m=r;return a.jsxs("div",{className:"lb3 lb3-b s1",ref:c,children:[!d&&a.jsx(sf,{rects:[],hazeK:0}),a.jsx("div",{className:"b-grade"}),a.jsxs("svg",{className:"lb3-bg b-bg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:"bMoonG",children:[a.jsx("stop",{offset:"0",stopColor:"#fff7dc",stopOpacity:".95"}),a.jsx("stop",{offset:".3",stopColor:"#ffe6a8",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffe6a8",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bMoon",cx:"40%",cy:"38%",r:"70%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf2"}),a.jsx("stop",{offset:".6",stopColor:"#f3e2ae"}),a.jsx("stop",{offset:"1",stopColor:"#c9b27a"})]}),a.jsxs("linearGradient",{id:"bWood",x1:"0",y1:"0",x2:"1",y2:"0",children:[a.jsx("stop",{offset:"0",stopColor:"#1a0f08"}),a.jsx("stop",{offset:".35",stopColor:"#6b4526"}),a.jsx("stop",{offset:".6",stopColor:"#4a2e18"}),a.jsx("stop",{offset:"1",stopColor:"#140b06"})]}),a.jsxs("linearGradient",{id:"bText",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0",stopColor:"#fffbe6"}),a.jsx("stop",{offset:".5",stopColor:"#ffe29a"}),a.jsx("stop",{offset:"1",stopColor:"#f0b350"})]}),a.jsxs("radialGradient",{id:"bPool",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd98a",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffd98a",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bGoldG",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd68a",stopOpacity:".3"}),a.jsx("stop",{offset:"1",stopColor:"#ffd68a",stopOpacity:"0"})]}),a.jsx("filter",{id:"bBlur2",children:a.jsx("feGaussianBlur",{stdDeviation:"5"})}),a.jsxs("filter",{id:"bNoise",x:"0",y:"0",width:"100%",height:"100%",children:[a.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.02 0.3",numOctaves:"3",seed:"3"}),a.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -1"})]})]}),a.jsx("circle",{cx:tt.x,cy:tt.y,r:"430",fill:"url(#bMoonG)",opacity:".5"}),a.jsx("g",{transform:`translate(${tt.x} ${tt.y})`,children:a.jsxs("g",{className:"b-moon",children:[a.jsx("circle",{r:"210",fill:"url(#bMoon)"}),a.jsx("circle",{cx:"-70",cy:"-50",r:"34",fill:"#cdb67f",opacity:".5"}),a.jsx("circle",{cx:"50",cy:"40",r:"52",fill:"#cdb67f",opacity:".38"}),a.jsx("circle",{cx:"-20",cy:"96",r:"22",fill:"#cdb67f",opacity:".45"}),a.jsx("circle",{cx:"94",cy:"-84",r:"20",fill:"#cdb67f",opacity:".4"})]})}),b.map((g,y)=>a.jsxs("g",{className:"b-stones",children:[a.jsx("ellipse",{cx:g.x,cy:g.y,rx:g.w,ry:g.h,fill:"#17352c",stroke:"#0a1d17",strokeWidth:"2"}),a.jsx("ellipse",{className:"b-stone",cx:g.x,cy:g.y,rx:g.w*.9,ry:g.h*.8,fill:"url(#bPool)",opacity:y<2+Math.min(1,n.length/12)*7?.9:.18})]},y)),a.jsxs("g",{className:"b-ringg",children:[[Ks,Zs].map((g,y)=>a.jsxs("g",{children:[a.jsx("rect",{x:g-32,y:"250",width:"64",height:"590",rx:"14",fill:"url(#bWood)"}),[0,1,2,3,4,5,6].map(w=>a.jsx("path",{d:`M ${g-32} ${300+w*80} h 64`,stroke:"#0a0502",strokeWidth:"3",opacity:".6"},w)),a.jsx("rect",{x:g-32,y:"250",width:"64",height:"590",rx:"14",filter:"url(#bNoise)",opacity:".5"}),a.jsx("rect",{x:g-42,y:"236",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"}),a.jsx("rect",{x:g-42,y:"826",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"})]},y)),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"#0e0804",strokeWidth:"38"}),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"url(#bWood)",strokeWidth:"30"}),[0,1,2].map(g=>a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx+(g-1)*7,ry:tt.ry+(g-1)*7,fill:"none",stroke:g===1?"#9b6a3a":"#2f1c0e",strokeWidth:"3",strokeDasharray:g===1?"70 22":"40 40",opacity:".8"},g)),Uc.filter((g,y)=>y%2===0).map((g,y)=>a.jsxs("g",{transform:`translate(${g.x} ${g.y}) rotate(${y*47%360})`,children:[a.jsx("ellipse",{cx:"14",cy:"-6",rx:"15",ry:"6",fill:"#2f7a4a",stroke:"#144a2a",strokeWidth:"1.2"}),a.jsx("ellipse",{cx:"-12",cy:"7",rx:"12",ry:"5",fill:"#3f9a5c",stroke:"#144a2a",strokeWidth:"1.2"})]},`l${y}`)),Uc.map((g,y)=>a.jsx("g",{transform:`translate(${g.x} ${g.y})`,children:a.jsx("circle",{className:`b-rb${y<m?" on":""}`,r:"8",fill:"#ffe2a0",opacity:y<m?1:.28,style:{filter:"drop-shadow(0 0 7px #ffc766)"}})},y))]}),a.jsx("g",{className:"b-ropes",fill:"none",stroke:"#c9a566",strokeWidth:"2.4",opacity:".85",children:[-1,1].flatMap(g=>f.map((y,w)=>{const S=g<0?Ks:Zs,T=g<0?-30:1950,M=Array.from({length:21},(R,v)=>{const E=S+(T-S)*(v/20);return`${E.toFixed(0)} ${Ua(f,g,w,E).toFixed(0)}`});return a.jsx("path",{d:`M ${M.join(" L ")}`},`${g}${w}`)}))}),x.map((g,y)=>a.jsx("circle",{className:"b-bulb",cx:g.x,cy:g.y,r:"4.5",fill:"#ffe2a0",opacity:y<10+n.length*4?.9:.25,style:{filter:"drop-shadow(0 0 6px #ffc766)"}},y)),u.map((g,y)=>a.jsx("ellipse",{cx:g.x,cy:g.ay+80,rx:"140",ry:"120",fill:"url(#bPool)",opacity:".35"},`p${n[y].id}`)),a.jsx("g",{className:"b-gold",opacity:"0",children:a.jsx("ellipse",{cx:"960",cy:tt.y,rx:"980",ry:"500",fill:"url(#bGoldG)"})}),u.map((g,y)=>a.jsx("path",{className:"b-spark","data-id":n[y].id,d:gf(g.x,g.ay),pathLength:1,fill:"none",stroke:"#fff6cf",strokeWidth:"7",strokeLinecap:"round",strokeDasharray:"0.07 1.2",opacity:"0",style:{filter:"drop-shadow(0 0 10px #ffd37a)"}},`k${n[y].id}`)),a.jsxs("g",{className:"b-logo",children:[a.jsx("path",{className:"b-swag",d:"M 380 66 C 640 140 1280 140 1540 66",fill:"none",stroke:"#c9a566",strokeWidth:"3"}),Array.from({length:15},(g,y)=>{const w=y/14,S=380+w*1160,T=66+Math.sin(w*Math.PI)*54+4;return a.jsx("circle",{className:"b-swag",cx:S,cy:T+2,r:"5",fill:"#ffe2a0",style:{filter:"drop-shadow(0 0 6px #ffc766)"}},y)}),_f.map(g=>a.jsxs("g",{children:[a.jsx("line",{className:"b-cordL",x1:g.x,y1:xf(g.x)+2,x2:g.x,y2:"112",stroke:"#c9a566",strokeWidth:"2"}),a.jsx("text",{className:"b-letter-glow",x:g.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"#ffd98a",filter:"url(#bBlur2)",opacity:".85",children:g.c}),a.jsx("text",{className:"b-letter",x:g.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"url(#bText)",stroke:"#8a5a22",strokeWidth:"3",children:g.c})]},g.i))]})]}),i&&a.jsxs("div",{className:"b-stand",style:{left:64,top:806,"--lit":s?1:.3},children:[a.jsxs("svg",{viewBox:"0 0 270 270","aria-hidden":!0,children:[a.jsx("ellipse",{className:"b-aura",cx:"135",cy:"125",rx:"200",ry:"170",fill:"url(#bPool)",opacity:s?1:0}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"#2a1a0e",stroke:"#d9b36a",strokeWidth:"4"}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"none",stroke:"#ffe2a0",strokeWidth:"2",opacity:"var(--lit)",style:{filter:"drop-shadow(0 0 8px #ffc766)"}}),[34,80,135,190,236].map((g,y)=>a.jsx("circle",{cx:g,cy:y%2?16:20,r:"4.5",fill:"#ffe2a0",opacity:".75",style:{filter:"drop-shadow(0 0 5px #ffc766)"}},y))]}),a.jsx("div",{className:"b-qrbox",children:i}),a.jsx("div",{className:"b-qrcap",children:"Сканируй, чтобы играть"})]}),u.map((g,y)=>{const w=n[y];return a.jsxs("div",{className:`b-team side${g.side<0?"L":"R"}${t.has(w.id)?" fresh":""}`,"data-id":w.id,style:{left:g.x,top:g.ay,"--tc":Oi(w.hue),"--sc":h,"--nm":`${w.name.length>26?Math.round(e.fs*.84):e.fs}px`,"--nw":`${p}px`},children:[a.jsx("div",{className:"b-scale",children:a.jsx(Td,{hue:w.hue,id:w.id})}),a.jsx("div",{className:"nm",children:a.jsx("span",{children:w.name})})]},w.id)}),o&&a.jsx("div",{className:"b-wait",children:"ждём команды…"}),l]})}const ei=3.4,ar=.11,or=.8,Fc=.9;function Mf(n){const e=n.reduce((r,o)=>r+o.length,0);let t=2166136261;for(const r of n.flat())for(let o=0;o<r.length;o++)t^=r.charCodeAt(o),t=Math.imul(t,16777619);const i=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296),s=Array.from({length:e},(r,o)=>o);for(let r=e-1;r>0;r--){const o=Math.floor(i()*(r+1));[s[r],s[o]]=[s[o],s[r]]}return s}function ko(n){const e=n.flatMap((t,i)=>t.map((s,r)=>({name:s,gi:i,j:r})));return{people:e,order:Mf(n),N:e.length,groups:n}}function Ad(n,e){const t=Math.max(1,...e.map(s=>s.length)),i=Math.min(n,4);return s=>{const r=1100+(s%i-(i-1)/2)*410;if(n<=4)return{cx:r,names:650,sigil:330,size:190,pitch:Math.max(28,Math.min(52,380/t))};const o=t<=4;return s<4?{cx:r,names:o?420:300,sigil:o?210:130,size:o?140:110,pitch:Math.max(26,Math.min(44,(o?140:250)/t))}:{cx:r,names:o?780:740,sigil:o?570:575,size:o?140:110,pitch:Math.max(26,Math.min(44,280/t))}}}const yf=(n,e,t)=>{const i=n*Math.PI*2+e*Math.PI*6;return{x:1030+Math.cos(i)*(t>4?760:700),y:540+Math.sin(i)*230-Math.sin(e*Math.PI)*30}};function bf(n,e,t,i){H.useEffect(()=>{if(!t||!t.length||!i)return;const{people:s,order:r,N:o}=ko(t),c=t.length,l=Ad(c,t),d=s.map(f=>{const h=l(f.gi);return{x:h.cx,y:h.names+f.j*h.pitch}}),u=()=>{const f=n()+(i==="done"||i==="back"?20:0),h=o*ar+or,p=Math.max(0,Math.min(1,(f-Fc)/(ei+h-Fc))),x=i==="intro"?0:Math.max(0,Math.min(1,(f-ei)/h));e.current.forEach((b,m)=>{if(!b)return;const g=Math.max(0,Math.min(1,(x*h-r[m]*ar)/or)),y=g*g*(3-2*g),w=yf(r[m]/o,p,c),S=d[m];b.style.transform=`translate(${w.x+(S.x-w.x)*y-S.x}px, ${w.y+(S.y-w.y)*y-S.y}px) scale(${.82+.18*y})`,b.style.opacity=String(i==="back"?0:Math.min(1,p*14)),b.classList.toggle("landed",y>.98)})};return nt.ticker.add(u),u(),()=>nt.ticker.remove(u)},[t,i])}function Sf({groups:n,pills:e}){const{people:t}=ko(n),i=n.length,s=Ad(i,n),r=t.length;return a.jsxs("div",{className:`rz3 rz-B${i>4?" k8":""}`,children:[a.jsxs("div",{className:"rz-head",children:[a.jsx("b",{children:"Составы команд"}),a.jsxs("span",{children:[i," · ",r," чел."]})]}),n.map((o,c)=>{const l=s(c),d=En(Pa(c));return a.jsxs("div",{className:"rz-grp","data-g":c,style:{left:l.cx-190,top:l.sigil,width:380},children:[a.jsx("div",{className:"rz-sg b-sg",style:{height:l.size},children:a.jsx(Td,{hue:d,id:`sg${c}`})}),a.jsxs("div",{className:"rz-gn",style:{color:Oi(d)},children:["Команда ",c+1]})]},c)}),t.map((o,c)=>{const l=s(o.gi);return a.jsx("span",{ref:d=>{d&&(e.current[c]=d)},className:"rz-n",style:{left:l.cx-115,top:l.names+o.j*l.pitch-20,opacity:0,"--tc":Oi(En(Pa(o.gi)))},children:o.name},c)})]})}function wf(n,e,t,i,s,r){const{groups:o,order:c,people:l,N:d}=ko(t);if(i==="back"){n.fromTo(e(s),{opacity:0},{opacity:1,duration:1.2,stagger:.05},.5).fromTo(e(".rz-veil"),{opacity:1},{opacity:0,duration:1.2,ease:"power2.inOut"},.3).fromTo(e(".rz-head, .rz-grp"),{opacity:1},{opacity:0,duration:.8,stagger:.04},.2);return}if(i==="done"){n.set(e(s),{opacity:0},0).set(e(".rz-veil, .rz-head, .rz-grp"),{opacity:1},0).fromTo(e(".rz-grp .rz-gn"),{opacity:.35,scale:.92},{opacity:1,scale:1,duration:.7,stagger:.12,ease:"back.out(2)"},.3).fromTo(e(".rz-grp .rz-sg"),{filter:"brightness(1.9)"},{filter:"brightness(1)",duration:1.2,stagger:.12},.3).to({},{duration:2.4},0);return}if(n.to(e(s),{opacity:0,duration:.8},.1).fromTo(e(".rz-veil"),{opacity:0},{opacity:1,duration:.8},.1).fromTo(e(".rz-head"),{opacity:0,y:14},{opacity:1,y:0,duration:.6},.5),i==="intro"){n.to({},{duration:4.6},0);return}n.fromTo(e(".rz-grp"),{opacity:0,y:14},{opacity:1,y:0,duration:.6,stagger:.1},ei-1),o.forEach((u,f)=>{const h=Math.max(...u.map((p,x)=>c[l.findIndex(b=>b.gi===f&&b.j===x)]))*ar+or;n.fromTo(e(`.rz-grp[data-g="${f}"] .rz-sg`),{filter:"brightness(1)"},{filter:"brightness(1.9)",duration:.4,yoyo:!0,repeat:1},ei+h),r==null||r(ei+h,f),n.fromTo(e(`.rz-grp[data-g="${f}"] .rz-gn`),{scale:.9},{scale:1,duration:.5,ease:"back.out(2)"},ei+h)}),n.to({},{duration:ei+d*ar+or+.8},.1)}const zo=n=>`.b-team[data-id="${CSS.escape(n)}"]`;function Ef(n,e,t,i=0){n.fromTo(e(".b-bg"),{opacity:0},{opacity:1,duration:1},i).fromTo(e(".b-moon"),{opacity:0,scale:.7},{opacity:1,scale:1,duration:1.4,ease:"power2.out",transformOrigin:"0px 0px"},i+.2).fromTo(e(".b-ringg"),{opacity:0},{opacity:1,duration:1},i+.5).fromTo(e(".b-rb"),{opacity:0,scale:0},{opacity:s=>{var r;return(r=e(".b-rb")[s])!=null&&r.classList.contains("on")?1:.28},scale:1,duration:.4,stagger:{each:.045,from:"start"},ease:"back.out(3)",transformOrigin:"0px 0px"},i+.8).fromTo(e(".b-swag, .b-cordL"),{opacity:0},{opacity:1,duration:.8},i+1).fromTo(e(".b-letter"),{opacity:0,y:-50},{opacity:1,y:0,duration:.7,stagger:.07,ease:"back.out(1.6)"},i+1.2).fromTo(e(".b-letter-glow"),{opacity:.2},{opacity:1,duration:1,stagger:.05},i+1.9).fromTo(e(".b-stand"),{opacity:0,y:24},{opacity:1,y:0,duration:.9,ease:"power2.out"},i+.9),t.wait&&n.fromTo(e(".b-wait"),{opacity:0,y:10},{opacity:1,y:0,duration:.8},i+2.2),t.settled&&n.fromTo(e(".b-team:not(.fresh)"),{opacity:0},{opacity:1,duration:1.2,stagger:.06},i+.9)}function Tf(n,e,t,i,s){const r=zo(t),o=Bo(i);n.set(e(r),{visibility:"visible"},s).fromTo(e(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},s).fromTo(e(".b-rb"),{scale:1},{scale:1.9,duration:.25,yoyo:!0,repeat:1,stagger:.012,transformOrigin:"0px 0px"},s).fromTo(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{strokeDashoffset:.08,opacity:1},{strokeDashoffset:-1,duration:.85,ease:"power1.inOut"},s+.15).to(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{opacity:0,duration:.2},s+.85).fromTo(e(`${r} .cordg`),{scaleY:0},{scaleY:1,duration:.45,ease:"power2.out",transformOrigin:"0px 0px"},s+.9).fromTo(e(`${r} .lbody`),{scale:.18,opacity:0,y:-10},{scale:1,opacity:1,y:0,duration:.8,ease:"back.out(1.7)",transformOrigin:"0px 0px"},s+1.2).fromTo(e(`${r} .ribs`),{scaleX:.2},{scaleX:1,duration:.7,ease:"power2.out",transformOrigin:"0px 0px"},s+1.3).fromTo(e(`${r} .glow`),{opacity:0},{opacity:1,duration:.9},s+1.4).fromTo(e(`${r} .b-lan`),{rotation:-5},{rotation:0,duration:1.6,ease:"elastic.out(1,0.35)",transformOrigin:"50% 0%"},s+1.7).fromTo(e(`${r} .nm`),{clipPath:"inset(0 100% 0 0)",opacity:0},{clipPath:"inset(0 0% 0 0)",opacity:1,duration:.8,ease:"power1.inOut"},s+1.8).to(e(".b-rb"),{opacity:c=>c<o?1:.28,duration:.5},s+.3)}function Dr(n,e,t,i){const s=zo(t);n.to(e(`${s} .glow`),{opacity:.08,duration:1},i).to(e(`${s} .lbody`),{filter:"saturate(.2) brightness(.45)",y:10,duration:1.2},i).to(e(`${s} .nm`),{opacity:.38,duration:1},i)}function Af(n,e,t,i){const s=zo(t);n.to(e(`${s} .glow`),{opacity:1,duration:.8},i).to(e(`${s} .lbody`),{filter:"none",y:0,duration:.9},i).to(e(`${s} .nm`),{opacity:1,duration:.8},i)}function Ur(n,e,t){n.fromTo(e(".b-stand"),{"--lit":.3},{"--lit":1,duration:1.1},t).fromTo(e(".b-aura"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:1.2,transformOrigin:"50% 50%"},t)}function Cf(n,e,t){n.to(e(".b-stand"),{"--lit":.3,duration:.8},t).to(e(".b-aura"),{opacity:0,duration:.8},t)}function Rf(n,e,t,i){n.to(e(".b-rb"),{opacity:s=>s<Bo(t)?1:.28,duration:.6},i)}function Nf(n,e,t,i=0){n.to(e(".b-team .nm"),{opacity:0,duration:.7},i+1).to(e(".b-team"),{x:s=>{var r;return(tt.x-(((r=t[s])==null?void 0:r.x)??tt.x))*.9},y:s=>{var r;return(tt.y-(((r=t[s])==null?void 0:r.y)??tt.y))*.9},scale:.15,opacity:0,duration:1.5,stagger:.06,ease:"power2.in",transformOrigin:"0px 0px"},i+1.1).to(e(".b-stand, .b-wait"),{opacity:0,y:40,duration:.9},i+1.6).to(e(".b-bulb, .b-ropes, .b-stones"),{opacity:0,duration:1},i+2.2).to(e(".b-logo"),{opacity:0,y:-80,duration:1,ease:"power2.in"},i+2.4).to(e(".b-rb"),{opacity:0,duration:.8,stagger:.02},i+2.5).to(e(".b-moon"),{scale:1.5,y:-130,opacity:0,duration:1.8,ease:"power2.in",transformOrigin:"0px 0px"},i+3).to(e(".b-ringg"),{y:100,opacity:0,duration:1.6,ease:"power2.in"},i+3.4).to(e(".b-grade"),{opacity:0,duration:1.4},i+3.6)}function Pf({value:n,ink:e="#0d1a15"}){return a.jsx("div",{className:"fo-qr",children:a.jsx(rr,{value:n,quiet:!0,ink:e,title:"QR для подключения"})})}const Lf=".b-team, .b-wait";function If({teams:n,playerUrl:e,paper:t,groups:i,groupsOpen:s,onGroupsOpen:r,onGroupsClose:o,leaving:c,onLeft:l}){const d=H.useRef(null),u=H.useMemo(()=>n.map(L=>({id:L.id,name:L.name,hue:En(L.color),alive:L.alive})),[n]),f=H.useMemo(()=>mf(u.length),[u.length]),h=H.useMemo(()=>nt.utils.selector(d),[]),p=H.useRef(new Set(u.map(L=>L.id))),[,x]=H.useState(0),b=new Set(u.filter(L=>!p.current.has(L.id)).map(L=>L.id)),m=H.useRef(new Map(u.map(L=>[L.id,L.alive]))),g=H.useRef(new Set),y=H.useRef(Bo(u.length)),w=i.map(L=>L.join(",")).join("|"),S=i.length>0&&s,[T,M]=H.useState(i.length?s?"done":"back":void 0),R=H.useRef(null),v=H.useRef([]);bf(()=>{var L;return((L=R.current)==null?void 0:L.time())??0},v,i.length?i:null,T),H.useLayoutEffect(()=>{const L=nt.timeline();return Ef(L,h,{settled:!i.length,wait:u.length===0&&!i.length}),u.filter(W=>!W.alive).forEach(W=>{const B=nt.timeline();Dr(B,h,W.id,0),B.progress(1)}),()=>{L.kill()}},[]),H.useLayoutEffect(()=>{const L=u.filter(B=>!p.current.has(B.id)&&!g.current.has(B.id));L.forEach((B,X)=>{g.current.add(B.id);const k=nt.timeline({onComplete:()=>{p.current.add(B.id),g.current.delete(B.id),x(U=>U+1)}});Tf(k,h,B.id,u.length,X*.35),B.alive||Dr(k,h,B.id,2.6+X*.35)}),u.forEach(B=>{const X=m.current.get(B.id);if(X!==void 0&&X!==B.alive&&p.current.has(B.id)){const k=nt.timeline();B.alive?Af(k,h,B.id,0):Dr(k,h,B.id,0)}m.current.set(B.id,B.alive)}),!L.length&&u.length!==p.current.size&&Rf(nt.timeline(),h,u.length,0);const W=new Set(u.map(B=>B.id));p.current.forEach(B=>{W.has(B)||p.current.delete(B)})},[u.map(L=>`${L.id}:${L.alive}`).join("|")]);const E=H.useRef(S),P=H.useRef(w),D=H.useRef(!0);return H.useLayoutEffect(()=>{if(!i.length){M(void 0),E.current=!1,P.current=w,D.current=!1;return}const L=P.current!==w,W=E.current;P.current=w,E.current=S;const B=X=>{var K;(K=R.current)==null||K.kill();const k=nt.timeline();wf(k,h,i,X,Lf,ie=>{k.fromTo(h(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},ie)}),R.current=k,M(X);const U=nt.timeline();X==="back"?Ur(U,h,.2):Ur(U,h,0)};if(D.current){D.current=!1,B(S?"done":"back");return}S&&(L||!W)?B(L?"run":"done"):!S&&W&&B("back")},[w,S]),H.useEffect(()=>{i.length?Ur(nt.timeline(),h,0):Cf(nt.timeline(),h,0)},[i.length]),H.useEffect(()=>{if(!S)return;const L=W=>{W.key==="Escape"&&o()};return addEventListener("keydown",L),()=>removeEventListener("keydown",L)},[S,o]),H.useLayoutEffect(()=>{if(!c)return;const L=f.slots.map((B,X)=>({id:u[X].id,x:B.x,y:B.ay})),W=nt.timeline({onComplete:()=>l==null?void 0:l()});return Nf(W,h,L,0),()=>{W.kill()}},[c]),a.jsxs(vf,{teams:u,layout:f,fresh:b,qr:t?null:a.jsx(Pf,{value:e}),qrLit:i.length>0,litN:y.current,wait:u.length===0&&!t&&!i.length,rootRef:d,children:[i.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"rz-veil",onClick:S?o:void 0,style:{pointerEvents:S?"auto":"none"}}),a.jsx(Sf,{groups:i,pills:v})]}),i.length>0&&!S&&a.jsx("button",{type:"button",className:"lb3-grp-btn",onClick:r,children:"СОСТАВЫ КОМАНД"})]})}function Cd({rects:n,srcs:e,fs:t,panel:i}){const s=H.useRef(null);return H.useEffect(()=>{const r=s.current.getContext("2d"),o=eh({rects:n,srcs:e,panel:i},40),c=()=>{r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,1920,1080),o(r,t)};return nt.ticker.add(c),()=>nt.ticker.remove(c)},[n,e,t,i]),a.jsx("canvas",{ref:s,className:"s4-cv",width:1920,height:1080,"aria-hidden":!0})}function Js(n,e,t,i,s){const r=Math.min(i/n.w,s/n.h),o=Math.round(n.w*r),c=Math.round(n.h*r);return{x:Math.round(e-o/2),y:t,w:o,h:c}}const Df=n=>n<60?`~${n} мин`:`~${Math.floor(n/60)} ч ${n%60?`${n%60} мин`:""}`.trim();function Uf(n){var d;const e=n.slide,t=(e.body??"").split(`
`).map(u=>u.trim()).filter(Boolean),i=e.images??[],s=e.show_rounds&&n.rounds.length?n.rounds.map((u,f)=>({n:f+1,name:u.name,count:u.count})):null,r=e.show_stats&&n.stats?n.stats:null,o=r?[[r.roundsCount,"раундов"],[r.questionsCount,"вопросов"],...r.hasMiniGame?[[1,"мини-игра"]]:[],...r.musicTracks>0?[[r.musicTracks,"треков"]]:[],[Df(r.totalMinutes),"на игру"]]:null;if(i.length>1||i.length===1&&(s||o||t.length===0))return null;const c=i.length===1&&n.image?{src:n.image.src,w:n.image.w,h:n.image.h}:null;if(i.length===1&&!c)return null;const l=t.length===0?"rstats":c?"rimg":t.length>5?"dense":"rules";return{title:(e.title??"").trim()||"ПРАВИЛА",lines:t,rounds:s,stats:o,note:((d=e.note)==null?void 0:d.trim())||null,photo:c,layout:l}}function Rd(n,e){const t=n<=8;let i=t?84:66,s=t?9:5;const r=t?200:168;if(n>12){const p=(1060-r)/n;s=p>=44?4:3,i=Math.floor(p-s)}const o=t?790:760,c=t?76:58,l=t?60:46,d=1150-o,u=e>0?Math.min(c,Math.floor(d/e)):c,f=Math.max(14,Math.min(l,u-Math.max(6,Math.round(u*.2)),i-8)),h=n>12||u<c||f<l;return{big:t,rh:i,gap:s,y0:r,brLeft:o,step:u,berry:f,custom:h,nameFs:i>=60?27:Math.max(14,Math.floor(i*.6)),medFs:Math.min(30,Math.round(i*.43)),totFs:Math.min(44,Math.round(i*.78)),berryFs:Math.min(t?32:26,Math.round(f*.56)),colFs:Math.min(24,Math.max(13,Math.round(f*.55)))}}function Ff(n,e,t){let i=n.filter(s=>s<=e).length;return t.forEach(s=>s.forEach((r,o)=>{r!==0&&o+1>i&&(i=o+1)})),Math.min(i,n.length)}function Nd(n,e,t,i,s){const r=s?new Map(s.order.map((o,c)=>[o,c])):null;return n.map((o,c)=>{const l=e.get(o.team.id)??[],d=r==null?void 0:r.get(o.team.id);return{id:o.team.id,name:o.team.name,color:i(o.team.color),place:o.place,sum:o.total,scores:t.map(u=>l[u]??0),...s?{delta:d==null?0:d-c,prevIdx:d}:{}}})}function Of(n,e,t){return[...new Set(n.map(s=>s.place))].filter(s=>s<=3).sort((s,r)=>s-r).map(s=>{var o;const r=n.filter(c=>c.place===s);return{k:s-1,place:s,sum:((o=r[0])==null?void 0:o.total)??0,names:r.map(c=>({name:c.team.name,color:e(c.team.color),hue:t(c.team.color)}))}})}function Bf(n){if(n<=0)return[];const e=Math.ceil(n/6),t=Math.ceil(n/e),i=Math.min(280,Math.floor((1800-(t-1)*20)/t)),s=i+20,r=e===1?0:e===2?380:270,o=e===1?400:e===2?240:200;return Array.from({length:n},(c,l)=>{const d=Math.floor(l/t),u=l%t,f=Math.min(t,n-d*t);return{x:(n===6?60:Math.round((1920-(f*s-20))/2))+u*s,y:o+d*r,w:i}})}function kf(n,e){return!n||!e||n===e?null:e==="finale"?"bloom":n==="lobby"&&(e==="info"||e==="intro"||e==="round_intro")?"vine":n==="info"&&e==="round_intro"?"wind":n==="round_intro"&&e==="question"?"fly":e==="scoreboard"?"petal":n==="scoreboard"&&e==="break"?"mist":null}const Pd=n=>`${String(Math.floor(Math.max(0,n)/60)).padStart(2,"0")}:${String(Math.max(0,n)%60).padStart(2,"0")}`,Fr=n=>n%10===1&&n%100!==11?"балл":n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?"балла":"баллов";function zf(n){if(n<=0)return{cols:1,rowH:84,fz:32};const e=n<=7?1:n<=16?2:3,t=Math.ceil(n/e),i=Math.min(84,Math.floor((800-(t-1)*10)/t));return{cols:e,rowH:i,fz:Math.min(32,Math.max(15,Math.round(i*.42)))}}function Gf(n){switch(n){case"crossword":return"crossword";case"jeopardy":return"jeopardy";case"melody":return"melody";case"anagram":return"anagram";case"sprint":return"sprint";case"blitz":return"blitz";case"four_pics":return"reveal";default:return"standard"}}const Hf=n=>Math.min(112,Math.floor(1500/Math.max(1,...n.map(e=>e.length)))),Vf=n=>Math.max(0,...n.map(e=>e.length))>24;function jf(n,e=20){if(!Vf(n))return n;const t=[];for(const i of n){let s="";for(const r of i.split(/\s+/).filter(Boolean))s&&(s+" "+r).length>e?(t.push(s),s=r):s=s?s+" "+r:r;s&&t.push(s)}return t}const Wf="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function $f({v:n,onReady:e}){const t=n.lines,i=n.layout==="dense",s=n.layout==="rimg"&&!!n.photo,r=n.stats,o=H.useMemo(()=>({grow:[0],reveal:[0],bloom:[0],pulse:0}),[]),c=n.photo,l=H.useMemo(()=>c?[Js(c,1560,250,560,600)]:[],[c]),d=t.length>7?29:t.length>5?34:40,u=JSON.stringify(n),f=hs(),{root:h}=ud(e,(m,g)=>{m.fromTo(g(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(g(".ru-vine"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.6,ease:"power2.inOut"},.2).fromTo(g(".ru-pl"),{opacity:0,x:-24,clipPath:"inset(0 100% 0 0 round 40px)"},{opacity:1,x:0,clipPath:"inset(0 0% 0 0 round 40px)",duration:.6,stagger:i?.3:.45,ease:"power2.out"},.9);const y=.9+t.length*(i?.3:.45);m.fromTo(g(".ru-rd"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.1},.9).fromTo(g(".ru-st"),{opacity:0,scale:.6},{opacity:1,scale:1,duration:.5,stagger:.12,ease:"back.out(2)"},1.6).fromTo(g(".ru-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},y),s&&m.fromTo(o.grow,{0:0},{0:1,duration:1.1,ease:"power2.inOut"},.4).fromTo(o.reveal,{0:0},{0:1,duration:.95,ease:"power2.inOut"},1.4).fromTo(o,{pulse:0},{pulse:1.15,duration:1.1},.4)},null,[u,o]),p=[{x:60,y:30,w:1160,h:980},{x:1250,y:180,w:620,h:780}],x=t.length===0,b=s?!1:!!n.rounds;return H.useLayoutEffect(()=>{const m=h.current;if(!m)return;const g=R=>m.querySelector(R),y=g(".ru-note"),w=y?y.offsetTop-12:1060,S=g(".ru-title");if(S){S.style.fontSize=x?"170px":"";const R=g(".ru-right"),v=x&&R&&R.offsetHeight>0?R.offsetLeft:1880;let E=parseFloat(getComputedStyle(S).fontSize)||120;for(;S.offsetLeft+S.offsetWidth>v&&E>48;)E-=4,S.style.fontSize=`${E}px`}const T=g(".ru-list");if(T){T.style.setProperty("--fz",`${d}px`);let R=d;for(;T.offsetTop+T.offsetHeight>w&&R>18;)R-=1,T.style.setProperty("--fz",`${R}px`)}const M=g(".ru-right");if(M){M.style.transform="";const R=M.offsetHeight,v=w-M.offsetTop;R>v&&R>0&&(M.style.transformOrigin="0 0",M.style.transform=`scale(${Math.max(.4,v/R).toFixed(3)})`)}},[u,d,f,x,h]),a.jsxs(pn,{rects:p,n:null,rootRef:h,cls:`s5 ru ru-${n.layout}`,children:[a.jsx("h1",{className:"ru-title",style:x?{fontSize:170,top:330}:void 0,children:n.title.split("").map((m,g)=>a.jsx("span",{className:"ch",children:m===" "?" ":m},g))}),!x&&a.jsx("svg",{className:"ru-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"ru-vine",d:"M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010"})}),!x&&a.jsx("ol",{className:"ru-list",style:{"--fz":`${d}px`},children:t.map((m,g)=>a.jsxs("li",{className:"ru-pl",children:[a.jsx("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Wf})}),a.jsx("span",{className:"idx",children:String(g+1).padStart(2,"0")}),a.jsx("span",{className:"t",children:m})]},g))}),a.jsxs("div",{className:`ru-right${s?" img":""}`,children:[b&&n.rounds&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"ru-h",children:"Раунды вечера"}),a.jsx("ul",{className:"ru-rounds",children:n.rounds.map((m,g)=>a.jsxs("li",{className:"ru-rd",children:[a.jsx("b",{children:m.n}),a.jsx("span",{children:m.name}),m.count>0&&a.jsxs("em",{children:[m.count," вопр."]})]},g))})]}),r&&a.jsx("div",{className:"ru-stats",children:r.map(([m,g],y)=>a.jsxs("div",{className:"ru-st",children:[a.jsx("b",{className:String(m).length>5?"sm":"",children:m}),a.jsx("span",{children:g})]},y))})]}),s&&c&&a.jsxs(a.Fragment,{children:[a.jsx(Cd,{rects:l,srcs:[c.src],fs:o}),c.caption&&a.jsx("div",{className:"ru-cap",style:{left:l[0].x,width:l[0].w,top:l[0].y+l[0].h+28},children:c.caption})]}),n.note&&a.jsx("div",{className:"ru-note",children:n.note})]})}const Xf={crossword:"#ffd98a",standard:"#7ff2d8",jeopardy:"#c9b6ff",melody:"#8fc8ff",anagram:"#ffc27a"},qf={sprint:{cls:"spA",emblem:ih},blitz:{cls:"bz bzC",mood:"calm",emblem:nh},reveal:{cls:"rv rvA",emblem:th}};function Yf({id:n}){if(n==="crossword")return a.jsxs("svg",{className:"em em-cw",viewBox:"0 0 290 270",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"vn vh",d:"M 4 184 L 284 184"}),a.jsx("path",{className:"vn vv",d:"M 90 14 L 90 262"}),[..."РОМАН"].map((c,l)=>a.jsxs("g",{className:"ce r",transform:`translate(${14+l*50} 162)`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"r"+l)),[..."ГЕРОЙ"].map((c,l)=>l===3?null:a.jsxs("g",{className:"ce c",transform:`translate(64 ${12+l*50})`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"c"+l))]});if(n==="standard")return a.jsx("svg",{className:"em em-q",viewBox:"0 40 220 220",width:"180","aria-hidden":!0,children:a.jsx("g",{transform:"translate(110 222)",children:a.jsxs("g",{className:"qb",children:[Array.from({length:8},(i,s)=>a.jsx("g",{transform:`rotate(${s*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"9",ry:"20"})},s)),a.jsx("circle",{r:"8"})]})})});if(n==="jeopardy")return a.jsx("svg",{className:"em em-jp",viewBox:"0 0 260 260",width:"240","aria-hidden":!0,children:a.jsxs("g",{transform:"translate(130 130)",children:[[["100",-45],["200",45],["300",135],["400",225]].map(([i,s],r)=>a.jsx("g",{transform:`rotate(${s})`,children:a.jsxs("g",{className:"jpt","data-i":r,children:[a.jsx("path",{d:"M 0 -26 C -34 -50 -38 -98 0 -112 C 38 -98 34 -50 0 -26 Z"}),a.jsx("g",{transform:"translate(0 -72)",children:a.jsx("text",{textAnchor:"middle",dominantBaseline:"middle",style:{transform:`rotate(${-s}deg)`},children:i})})]})},r)),a.jsx("circle",{r:"24",className:"jpc"})]})});if(n==="melody")return a.jsxs("svg",{className:"em em-ml",viewBox:"0 0 290 240",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"ms",d:"M 14 44 C 90 6 200 6 276 46"}),[60,145,230].map((i,s)=>a.jsx("g",{transform:`translate(${i} ${30+(s===1?-4:6)})`,children:a.jsxs("g",{className:"bell","data-i":s,children:[a.jsx("path",{className:"bs",d:"M 0 0 L 0 26"}),a.jsx("path",{className:"bc",d:"M -34 96 C -30 60 -18 34 0 30 C 18 34 30 60 34 96 C 20 90 -20 90 -34 96 Z"}),a.jsx("circle",{className:"bk",cy:"102",r:"7"})]})},s)),[[40,150],[250,120],[150,180]].map(([i,s],r)=>a.jsx("text",{className:"nt",x:i,y:s,"data-i":r,children:"♪"},r))]});const e="ЛЕТО",t=[2,0,3,1];return a.jsxs("svg",{className:"em em-an",viewBox:"0 0 270 230",width:"250","aria-hidden":!0,children:[[...e].map((i,s)=>a.jsx("path",{className:"cup",d:`M ${16+s*62} 168 C ${16+s*62+4} 196 ${16+s*62+22} 206 ${16+s*62+28} 206 C ${16+s*62+36} 206 ${16+s*62+52} 196 ${16+s*62+56} 168 C ${16+s*62+40} 178 ${16+s*62+16} 178 ${16+s*62} 168 Z`},s)),[...e].map((i,s)=>a.jsx("g",{transform:`translate(${44+s*62} 120)`,children:a.jsxs("g",{className:"sd","data-o":t[s],"data-i":s,children:[a.jsx("circle",{r:"25"}),a.jsx("text",{y:"2",children:i})]})},s))]})}function Kf(n,e,t){rh(n,e);const i=.9;t==="crossword"&&n.fromTo(e(".em .vn"),{strokeDashoffset:300,opacity:1},{strokeDashoffset:0,duration:.9,stagger:.25,ease:"power2.out"},i).fromTo(e(".em .ce.r"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.3).fromTo(e(".em .ce.c"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.9),t==="standard"&&n.fromTo(e(".em .qb"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},i+.2),t==="jeopardy"&&n.fromTo(e(".em .jpt"),{scale:0,opacity:0},{scale:1,opacity:1,svgOrigin:"0 0",duration:.5,stagger:.18,ease:"back.out(2)"},i).to(e('.em .jpt[data-i="1"]'),{y:-22,duration:.6,ease:"sine.inOut",yoyo:!0,repeat:1},i+1.2),t==="melody"&&n.fromTo(e(".em .bell"),{rotation:-26,opacity:0},{rotation:0,opacity:1,svgOrigin:"0 0",duration:1.2,stagger:.25,ease:"elastic.out(1,0.35)"},i).fromTo(e(".em .nt"),{opacity:0,y:14},{opacity:1,y:-16,duration:.7,stagger:.2},i+.8),t==="anagram"&&n.fromTo(e(".em .sd"),{y:-150,opacity:0},{y:0,opacity:1,duration:.7,stagger:.16,ease:"bounce.out"},i).fromTo(e(".em .cup"),{opacity:0},{opacity:1,duration:.4,stagger:.1},i-.2)}function Zf({kind:n,intro:e,onReady:t}){const i=qf[n],s=jf(e.titleLines),r=Hf(s),o=`${n}|${JSON.stringify(e)}`,c=hs(),{root:l}=ud(t,(u,f)=>Kf(u,f,n),null,[o]);H.useLayoutEffect(()=>{const u=l.current;if(!u)return;const f=u.querySelector(".s1-intro-main"),h=u.querySelector(".s1-intro-title"),p=u.querySelector(".s1-intro-rules");p&&Mc([...p.querySelectorAll(".t")],()=>p.offsetTop+p.offsetHeight<=1050,22);const x=p?p.offsetLeft:1880,b=()=>Math.max(0,...[...(h==null?void 0:h.querySelectorAll(".ln"))??[]].map(m=>[...m.children].reduce((g,y)=>g+y.offsetWidth,0)));f&&h&&Mc([h],()=>{const m=f.offsetLeft+f.clientWidth/2,g=i?Math.min(b(),f.clientWidth):b();return m+g/2<=x&&m-g/2>=20&&f.offsetTop+f.offsetHeight<=1050},40)},[o,c,l,i]);const d=a.jsx(sh,{intro:s===e.titleLines?e:{...e,titleLines:s},emblem:i?i.emblem:a.jsx(Yf,{id:n})});return i?a.jsx(pn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:i.cls,moodOverride:i.mood,children:d}):a.jsx(pn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:`rv ri ri-${n}`,children:a.jsx("div",{style:{"--acc":Xf[n],"--tfs":`${r}px`},children:d})})}const Jf="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",Qf=["","gold","silver","bronze"];function ep({v:n,rootRef:e,reveal:t}){const{rows:i,flip:s,cols:r}=n,o=i.length,c=r.length,l=Rd(o,c),{big:d,rh:u,gap:f,y0:h,custom:p}=l,x=Array.from({length:c},(M,R)=>Math.max(0,...i.map(v=>v.scores[R]??0))),b=t!==void 0,m=M=>!b||M>=o-t,g=hs(),y=i.map(M=>M.name).join("|");H.useLayoutEffect(()=>{const M=e.current;M&&M.querySelectorAll(".bd-nm").forEach(R=>{R.style.fontSize=p?`${l.nameFs}px`:"";let v=parseFloat(getComputedStyle(R).fontSize)||27;for(;R.offsetHeight>u-4&&v>12;)v-=1,R.style.fontSize=`${v}px`})},[y,u,p,l.nameFs,g,e]);const w=[{x:200,y:20,w:1520,h:1040}],S=i.map((M,R)=>R>0&&i[R-1].place===M.place?R:-1).filter(M=>M>=0),T=M=>p?M:void 0;return a.jsxs(pn,{rects:w,n:null,rootRef:e,cls:`s5 bd bd-${n.kind}${d?" big":""}${b?" bd-game":""}${b&&t>=o?" all-in":""}`,children:[a.jsxs("div",{className:"bd-title",children:[a.jsx("b",{children:n.title}),a.jsx("span",{children:n.sub})]}),a.jsxs("div",{className:"bd-colh",style:{top:h-40},children:[r.map((M,R)=>a.jsx("i",{className:R===c-1&&s?"last":"",style:{left:p?l.brLeft+R*l.step:(d?790:760)+R*(d?76:58),width:p?l.berry:d?60:46,...p?{fontSize:l.colFs}:{}},children:M},R)),a.jsx("em",{children:"Σ"})]}),i.map((M,R)=>{const v=M.delta??0;return a.jsxs("div",{className:`bd-row${M.place<=3?" pod p"+M.place:""}${b&&m(R)?" is-in":""}`,"data-i":R,style:{top:h+R*(u+f),height:u,...p?{"--rh":`${u}px`}:{}},children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Jf})}),a.jsx("span",{className:`bd-med ${Qf[M.place]??""}`,style:T({fontSize:l.medFs}),children:M.place}),a.jsx("span",{className:"bd-chip",style:v===0?{visibility:"hidden",...T({fontSize:Math.min(22,Math.round(u*.55))})}:T({fontSize:Math.min(22,Math.round(u*.55))}),children:v>0?`▲ ${v}`:`▼ ${-v}`}),a.jsx("span",{className:"bd-nm",style:{color:M.color},children:M.name}),a.jsx("span",{className:"bd-brs",style:T({left:l.brLeft,gap:l.step-l.berry}),children:Array.from({length:c},(E,P)=>{const D=M.scores[P]??0;return a.jsx("i",{className:`bd-bry${D===x[P]&&x[P]>0?" best":""}${D===0?" z":""}${s&&P===c-1?" last":""}`,style:T({width:l.berry,height:l.berry,fontSize:l.berryFs}),children:D},P)})}),a.jsx("span",{className:"bd-tot",style:T({fontSize:l.totFs}),children:s?a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"a",children:M.prevSum??M.sum}),a.jsx("b",{className:"b",children:M.sum})]}):a.jsx("b",{children:M.sum})})]},M.id)}),S.map(M=>a.jsxs("svg",{className:`bd-knot${b&&m(M-1)?" is-in":""}`,style:{top:h+M*(u+f)-f-12,...p?{width:Math.min(70,u+4)}:{}},viewBox:"0 0 60 30","aria-hidden":!0,children:[a.jsx("path",{d:"M 6 4 C 20 4 18 26 30 26 C 42 26 40 4 54 4"}),a.jsx("circle",{cx:"30",cy:"15",r:"6"})]},M))]})}function Xi({hue:n,o:e=1}){const t=`hsl(${n} 55% 74%)`,i=`hsl(${n} 40% 28%)`;return a.jsxs("svg",{className:"lb-fl",viewBox:"-90 -82 180 250","aria-hidden":!0,children:[a.jsx("path",{className:"stem",d:"M 0 56 C -10 100 10 130 0 164"}),a.jsx("path",{className:"lf",d:"M 0 112 C -30 100 -50 112 -56 126 C -34 130 -14 126 0 112 Z"}),a.jsx("path",{className:"lf",d:"M 0 128 C 30 114 50 124 58 138 C 34 144 14 140 0 128 Z"}),a.jsx("g",{transform:"translate(0 0)",children:a.jsxs("g",{className:"bl",style:{transform:`scale(${e})`},children:[Array.from({length:8},(s,r)=>a.jsx("g",{transform:`rotate(${r*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-36",rx:"19",ry:"38",style:{fill:t,stroke:i}})},r)),a.jsx("circle",{r:"17",className:"ct"})]})})]})}const Ms=n=>Math.sin(n*91.7+13.1)*43758.5453%1,tp=[32,352,205,150,270,12,185,48,320,95,228,0],Oc=(n,e)=>n.length?n[e%n.length]:tp[e%12];function np(n,e,t,i){const s=t.state;s==="last"&&n.fromTo(e(".fl-lab, .fl-q"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6,stagger:.15},.2).fromTo(e(".fl-ans .l"),{opacity:0,scale:.25,y:40},{opacity:1,scale:1,y:0,duration:.55,stagger:.13,ease:"back.out(2)"},1.1).fromTo(e(".fl-vine"),{strokeDashoffset:1200},{strokeDashoffset:0,duration:1.6,ease:"power1.inOut"},2).fromTo(e(".fl-dawn"),{opacity:0},{opacity:1,duration:2.4,ease:"power1.in"},2.4).fromTo(e(".fl-go"),{opacity:0,x:-20},{opacity:1,x:0,duration:.6},3.4),s==="antic"&&(n.fromTo(e(".fl-bud"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.6,stagger:.07,ease:"back.out(1.6)"},.2).fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.6).fromTo(e(".fl-orb"),{x:0,y:0,opacity:0},{opacity:1,x:r=>0*r,duration:.01},.8),e(".fl-orb").forEach((r,o)=>{const c=o/30*Math.PI*2,l=520+o%5*60;n.fromTo(r,{x:Math.cos(c)*l,y:Math.sin(c)*l*.5},{x:0,y:0,duration:2.6,ease:"power2.in"},1+o%10*.08)}),n.fromTo(e(".fl-pod"),{scale:.7},{scale:1.1,duration:3,ease:"power2.in"},1).fromTo(e(".fl-pod"),{rotation:-3},{rotation:3,duration:.12,yoyo:!0,repeat:15,ease:"none"},2.6).fromTo(e(".fl-flash"),{opacity:0},{opacity:.9,duration:.5,yoyo:!0,repeat:1},4.2)),s==="medals"&&(i===void 0?[2,1,0]:[i]).forEach((o,c)=>{const l=.5+c*1.5;n.fromTo(e(`.fl-md[data-k="${o}"] .stem`),{scaleY:0},{scaleY:1,duration:.7,ease:"power2.out",transformOrigin:"50% 100%"},l).fromTo(e(`.fl-md[data-k="${o}"] .bl`),{scale:.2},{scale:1,svgOrigin:"0 0",duration:.9,ease:"back.out(1.8)"},l+.5).fromTo(e(`.fl-md[data-k="${o}"] .disc, .fl-md[data-k="${o}"] .nm, .fl-md[data-k="${o}"] .pt`),{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.12},l+1.1)}),s==="retro"&&t.cards.forEach((r,o)=>{if(i!==void 0&&o!==i)return;const c=i===void 0?o:0;n.fromTo(e(`.fl-rc[data-i="${o}"]`),{opacity:0,y:40,scale:.9},{opacity:1,y:0,scale:1,duration:.6,ease:"back.out(1.5)"},.4+c*.7).fromTo(e(`.fl-rc[data-i="${o}"] .win`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.5},.8+c*.7)}),s==="winner"&&n.fromTo(e(".fl-rays"),{opacity:0,rotation:-30},{opacity:1,rotation:0,duration:2,ease:"power2.out"},.1).fromTo(e(".fl-big .stem"),{scaleY:0},{scaleY:1,duration:.8,ease:"power2.out",transformOrigin:"50% 100%"},.3).fromTo(e(".fl-big .bl"),{scale:.15},{scale:1,svgOrigin:"0 0",duration:1.6,ease:"back.out(1.5)"},.9).fromTo(e(".fl-w1"),{opacity:0,y:-14},{opacity:1,y:0,duration:.7},2).fromTo(e(".fl-w2 .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.04,ease:"back.out(1.8)"},2.3).fromTo(e(".fl-w3"),{opacity:0},{opacity:1,duration:.7},3.2).fromTo(e(".fl-pet"),{opacity:0,y:-80},{opacity:.95,y:r=>120+r%7*120,rotation:r=>r%2?160:-160,duration:3.4,stagger:.07,ease:"sine.out"},2.2),s==="party"&&(n.fromTo(e(".fl-lant"),{y:1200,opacity:0},{y:0,opacity:1,duration:3.6,stagger:.12,ease:"power2.out"},.2).fromTo(e(".fl-th .ch"),{opacity:0,y:36,rotation:-7},{opacity:1,y:0,rotation:0,duration:.6,stagger:.05,ease:"back.out(1.8)"},1).fromTo(e(".fl-pod3 > *"),{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.2},2.4),e(".fl-fw").forEach((r,o)=>n.fromTo(r,{scale:0,opacity:1},{scale:1,duration:1.1,ease:"power2.out"},1.2+o*.5).to(r,{opacity:0,duration:1.2},1.9+o*.5))),s==="break"&&n.fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.2).fromTo(e(".fl-clock"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:.8,ease:"back.out(1.6)"},.6)}const Or=n=>n.split("").map((e,t)=>a.jsx("span",{className:"ch",children:e===" "?" ":e},t));function ip({v:n,rootRef:e}){const t=n.state,i=t==="winner"||t==="party"||t==="medals"||t==="last",s="hues"in n?n.hues:[],r=s.join(","),o=H.useMemo(()=>Array.from({length:46},(u,f)=>({x:120+Math.abs(Ms(f))*1680,d:Math.abs(Ms(f+7))*3,s:.6+Math.abs(Ms(f+3))*.9,h:Oc(s,f),y:90+Math.abs(Ms(f+11))*880})),[r]),c=hs(),l=JSON.stringify(n);H.useLayoutEffect(()=>{const u=e.current;if(!u)return;u.querySelectorAll(".fl-md").forEach(h=>{const p=h.querySelector(".nm"),x=h.querySelector(".pt");if(!p||!x)return;p.style.fontSize="";let b=parseFloat(getComputedStyle(p).fontSize)||38;for(;p.offsetTop+p.offsetHeight+50>1070&&b>16;)b-=2,p.style.fontSize=`${b}px`;const m=p.offsetTop+p.offsetHeight+8;x.offsetTop<m&&(x.style.top=`${m}px`)});const f=u.querySelector(".fl-w2");if(f){const h=f.style.fontSize;let p=parseFloat(h)||100;const x=f.querySelector(":scope > div")?[...f.querySelectorAll(":scope > div")]:[f],b=()=>Math.max(0,...x.map(m=>[...m.querySelectorAll(":scope > .ch")].reduce((g,y)=>g+y.offsetWidth,0)));for(;(b()>f.clientWidth||f.offsetHeight>170)&&p>30;)p-=4,f.style.fontSize=`${p}px`}},[l,c,e]);const d=[{x:300,y:200,w:1400,h:700}];return a.jsxs(pn,{rects:d,n:null,rootRef:e,cls:`s5 fl fl-${t}`,moodOverride:i?"warning":void 0,children:[n.state==="last"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-dawn"}),a.jsxs("div",{className:"fl-lab",style:{left:120,width:1500,top:120},children:["Последний ответ · раунд ",n.round," · вопрос ",n.q," из ",n.of]}),a.jsx("div",{className:"fl-q",style:{left:120,width:1500,top:180},children:n.text}),a.jsx("div",{className:"fl-ans",style:{left:120,width:1500,top:380},children:n.answer.toUpperCase().split("").map((u,f)=>a.jsx("span",{className:"l",children:u},f))}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"fl-vine",d:"M 220 740 C 520 790 760 700 1020 750 S 1500 800 1780 740"})}),a.jsx("div",{className:"fl-go",children:"Подводим итоги →"})]}),n.state==="antic"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:90},children:n.title??"Подводим итоги"}),a.jsx("div",{className:"fl-t2",style:{left:300,width:1500,top:190},children:n.sub??"Скоро объявим победителей"}),n.hues.map((u,f)=>{const h=f/n.hues.length*Math.PI*2-Math.PI/2;return a.jsx("div",{className:"fl-bud",style:{left:1100+Math.cos(h)*640-40,top:590+Math.sin(h)*300-40},children:a.jsx(Xi,{hue:u,o:.38})},f)}),a.jsx("div",{className:"fl-pod",style:{left:1010,top:490},children:a.jsx(Xi,{hue:46,o:.5})}),Array.from({length:30},(u,f)=>a.jsx("i",{className:"fl-orb",style:{left:1091,top:581}},f)),a.jsx("div",{className:"fl-flash"}),n.clock&&a.jsx("div",{className:"fl-clock fl-clock-sm",children:n.clock})]}),n.state==="medals"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:50},children:"Награждение"}),n.slots.map(u=>{var b;const[f,h]=[[1100,250],[560,330],[1640,420]][u.k]??[1100,250],p=["gold","silver","bronze"][u.k],x=u.names.length>1||u.names.some(m=>m.name.length>20);return a.jsxs("div",{className:"fl-md","data-k":u.k,style:{left:f-200,top:0,width:400},children:[a.jsx("div",{className:"stem",style:{left:197,top:h+90,height:720-h}}),a.jsx("div",{className:"fl-fw1",style:{left:100,top:h-100},children:a.jsx(Xi,{hue:((b=u.names[0])==null?void 0:b.hue)??46,o:1})}),a.jsx("div",{className:`disc ${p}`,style:{left:160,top:h-10},children:u.place}),a.jsx("div",{className:"nm",style:{top:800,color:u.names.length===1?u.names[0].color:void 0},children:u.names.length===1?u.names[0].name:u.names.map((m,g)=>a.jsx("div",{style:{color:m.color},children:m.name},g))}),a.jsxs("div",{className:"pt",style:{top:800+(x?118:70)},children:[u.sum," ",Fr(u.sum)]})]},u.k)})]}),n.state==="retro"&&(()=>{const u=Bf(n.cards.length),f=n.cards.length!==6,h=[...new Set(u.map(p=>p.y))];return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:h.length>1?40:60},children:"Победители раундов"}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:h.map(p=>a.jsx("path",{className:"fl-limb",d:"M 70 380 C 500 340 1400 420 1850 360",transform:p!==400?`translate(0 ${p-400})`:void 0},p))}),n.cards.map((p,x)=>{var b,m;return x>=(n.shown??n.cards.length)?null:a.jsxs("div",{className:"fl-rc","data-i":x,style:{left:u[x].x,top:u[x].y,...f&&u[x].w!==280?{width:u[x].w}:{},...h.length>2?{minHeight:230}:{}},children:[a.jsx("i",{className:"cord"}),a.jsx("b",{className:"rn",children:p.n}),a.jsx("span",{className:"rname",children:p.name}),a.jsx("span",{className:"win",style:{color:(b=p.team)==null?void 0:b.color},children:((m=p.team)==null?void 0:m.name)??"—"}),a.jsxs("em",{children:[p.pts," ",Fr(p.pts)]})]},x)})]})})(),n.state==="winner"&&a.jsxs(a.Fragment,{children:[a.jsx("svg",{className:"fl-rays",viewBox:"-960 -540 1920 1080","aria-hidden":!0,children:Array.from({length:16},(u,f)=>a.jsx("path",{d:"M 0 0 L -60 -1200 L 60 -1200 Z",transform:`rotate(${f*22.5})`},f))}),a.jsx("div",{className:"fl-w1",style:{left:300,width:1500,top:60},children:n.names.length>1?"ПОБЕДИТЕЛИ":"ПОБЕДИТЕЛЬ"}),a.jsxs("div",{className:"fl-big",style:{left:770,top:150},children:[a.jsx("div",{className:"stem"}),a.jsx(Xi,{hue:46,o:1})]}),a.jsx("div",{className:"fl-w2",style:{left:300,width:1500,top:700,fontSize:n.names.length>1||n.names.some(u=>u.name.length>20)?64:100},children:n.names.length===1?Or(n.names[0].name):n.names.map((u,f)=>a.jsx("div",{children:Or(u.name)},f))}),a.jsxs("div",{className:"fl-w3",style:{left:300,width:1500,top:880},children:[n.sum," ",Fr(n.sum)]}),o.map((u,f)=>a.jsx("i",{className:"fl-pet",style:{left:u.x,top:-40,"--h":u.h,transform:`scale(${u.s})`}},f))]}),n.state==="party"&&a.jsxs(a.Fragment,{children:[Array.from({length:5},(u,f)=>a.jsx("div",{className:"fl-fw",style:{left:260+f*350,top:180+f%2*150},children:Array.from({length:14},(h,p)=>a.jsx("i",{style:{transform:`rotate(${p*25.7}deg) translateY(-110px)`,background:Oi(Oc(s,f*3+p))}},p))},f)),o.slice(0,26).map((u,f)=>a.jsx("div",{className:"fl-lant",style:{left:u.x,top:u.y,transform:`scale(${u.s*.9})`},children:a.jsx(Xi,{hue:u.h,o:1})},f)),a.jsx("div",{className:"fl-th",style:{left:300,width:1500,top:380},children:Or("Спасибо за игру!")}),a.jsx("div",{className:"fl-pod3",style:{left:300,width:1500,top:560},children:n.top.map((u,f)=>a.jsxs("span",{style:{color:u.color},children:[a.jsx("b",{children:f+1}),u.name]},f))})]}),n.state==="break"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:210,width:1500,top:150},children:"Перерыв"}),a.jsx("div",{className:"fl-t2",style:{left:210,width:1500,top:270},children:n.sub}),a.jsx("div",{className:"fl-clock",children:n.clock})]})]})}const ys=n=>Math.abs(Math.sin(n*91.7+13.1)*43758.5453%1),sp=()=>Array.from({length:40},(n,e)=>({y:60+ys(e)*960,d:ys(e+5)*.5,s:.7+ys(e+9),r:ys(e+3)*360}));function rp({state:n,bits:e}){return a.jsxs(a.Fragment,{children:[n==="vine"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-veil"}),a.jsx("svg",{className:"tr-vine",viewBox:"0 0 1920 1080","aria-hidden":!0,children:Array.from({length:7},(t,i)=>a.jsx("path",{d:`M ${130+i*280} -20 C ${60+i*280} 260 ${230+i*280} 420 ${130+i*280} 560 S ${60+i*280} 860 ${150+i*280} 1100`},i))})]}),n==="wind"&&e.slice(0,26).map((t,i)=>a.jsx("i",{className:"tr-leaf",style:{top:t.y,transform:`scale(${t.s})`}},i)),n==="fly"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-flash"}),Array.from({length:36},(t,i)=>a.jsx("i",{className:"tr-orb",style:{left:960,top:540}},i))]}),n==="petal"&&e.map((t,i)=>a.jsx("i",{className:"tr-pet",style:{top:t.y-140,"--h":i*37%360}},i)),n==="mist"&&[0,1,2,3].map(t=>a.jsx("div",{className:"tr-fog",style:{top:t*270}},t)),n==="bloom"&&a.jsxs("svg",{className:"tr-iris",viewBox:"-300 -300 600 600","aria-hidden":!0,children:[Array.from({length:8},(t,i)=>a.jsx("g",{transform:`rotate(${i*45})`,children:a.jsx("ellipse",{className:"p",cx:"0",cy:"-150",rx:"60",ry:"150"})},i)),a.jsx("circle",{r:"46",fill:"#f0c055"})]})]})}function ap(n,e,t,i){t==="vine"&&n.set(e(".tr-vine path"),{strokeDashoffset:0},0).set(e(".tr-veil"),{opacity:1},0).to(e(".tr-vine path"),{strokeDashoffset:-1400,duration:.7,stagger:.06,ease:"power2.in"},.1).to(e(".tr-veil"),{opacity:0,duration:.5},.2),t==="wind"&&n.fromTo(e(".tr-leaf"),{x:-400,opacity:0,rotation:s=>s*40},{x:2400,opacity:1,rotation:s=>s*40+540,duration:1.5,stagger:.03,ease:"power1.inOut"},0),t==="fly"&&(e(".tr-orb").forEach((s,r)=>n.fromTo(s,{x:0,y:0,opacity:1,scale:.4},{x:Math.cos(r)*(300+r%7*120),y:Math.sin(r)*(200+r%5*90),scale:1.2,duration:.9,ease:"power2.out"},0).to(s,{opacity:0,duration:.6},.8)),n.fromTo(e(".tr-flash"),{opacity:.95},{opacity:0,duration:.45},0)),t==="petal"&&n.fromTo(e(".tr-pet"),{x:-200,opacity:0},{x:s=>2100+s%4*80,opacity:1,y:s=>i[s].y+140,rotation:s=>i[s].r+500,duration:1.7,stagger:.025,ease:"sine.inOut"},0),t==="mist"&&n.set(e(".tr-fog"),{xPercent:0},0).to(e(".tr-fog"),{xPercent:110,duration:.8,stagger:.1,ease:"power2.in"},.1),t==="bloom"&&n.set(e(".tr-iris"),{scale:1,rotation:50},0).to(e(".tr-iris"),{scale:3.2,opacity:0,rotation:90,duration:.8,ease:"power2.out"},0)}function op({kind:n,onDone:e}){const t=H.useRef(null),i=H.useMemo(sp,[]),s=H.useRef(e);return s.current=e,H.useLayoutEffect(()=>{const r=nt.utils.selector(t),o=nt.timeline({onComplete:()=>s.current()});return ap(o,r,n,i),()=>{o.kill()}},[n,i]),a.jsx("div",{ref:t,className:`s5 tr tr-ov tr-${n}`,"aria-hidden":!0,children:a.jsx(rp,{state:n,bits:i})})}const Ld=n=>{n.tl.play()};function cp({view:n}){return a.jsx("div",{className:"fo-screen",children:a.jsx($f,{v:n,onReady:Ld})})}function lp({kind:n,intro:e}){return a.jsx("div",{className:"fo-screen",children:a.jsx(Zf,{kind:n,intro:e,onReady:Ld})})}function Id({view:n,reveal:e,flipKey:t}){const i=H.useRef(null);Do(i,"in",(d,u)=>{d.fromTo(u(".bd-title"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6},.1).fromTo(u(".bd-colh"),{opacity:0},{opacity:1,duration:.5},.4)});const s=n.rows.length,r=s>0&&e>=s,o=Rd(s,n.cols.length),c=H.useRef(null),l=H.useRef(n.rows);return l.current=n.rows,H.useLayoutEffect(()=>{if(!r||!t||c.current===t||!i.current||(c.current=t,typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const d=nt.utils.selector(i),u=nt.timeline({delay:.6});l.current.forEach((f,h)=>{const p=((f.prevIdx??h)-h)*(o.rh+o.gap);p&&u.fromTo(d(`.bd-row[data-i="${h}"]`),{y:p},{y:0,duration:1.3,ease:"power3.inOut",clearProps:"transform"},0)})},[r,t]),a.jsx("div",{className:"fo-screen",children:a.jsx(ep,{v:n,rootRef:i,reveal:e})})}function Li({view:n,step:e,only:t,onClick:i}){const s=H.useRef(null),r=H.useRef(n);return r.current=n,Do(s,e,(o,c)=>np(o,c,r.current,t)),a.jsx("div",{className:"fo-screen",onClick:i,children:a.jsx(ip,{v:n,rootRef:s})})}function dp({hues:n,onDone:e}){const t=H.useRef(e);return t.current=e,H.useEffect(()=>{const i=setTimeout(()=>t.current(),5600);return()=>clearTimeout(i)},[]),a.jsx(Li,{view:{state:"antic",hues:n},step:"antic"})}function up({num:n,paper:e,startedAt:t,seconds:i,teams:s}){const r=H.useRef(null),o=hd(t,i,!0);Do(r,"in",(f,h)=>{f.fromTo(h(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(h(".at5-sub"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},.5).fromTo(h(".at5-timer"),{clipPath:"inset(100% -40% 0 -40%)"},{clipPath:"inset(0% -40% 0 -40%)",duration:1.3,ease:"power2.out"},.2).fromTo(h(".at5-t"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.05},.8)});const c=zf((s==null?void 0:s.length)??0),l=hs(),d=(s??[]).map(f=>f.name).join("|");H.useLayoutEffect(()=>{var f;(f=r.current)==null||f.querySelectorAll(".at5-t .nm").forEach(h=>{h.style.fontSize="";const p=h.parentElement;let x=parseFloat(getComputedStyle(h).fontSize)||30;for(;h.offsetHeight>p.clientHeight-6&&x>12;)x-=1,h.style.fontSize=`${x}px`})},[d,l,c.rowH,c.fz]);const u=e?"Сдавайте бланки":"Отвечайте!";return a.jsx("div",{className:"fo-screen",children:a.jsxs(pn,{rects:e?[{x:560,y:160,w:800,h:880}]:[{x:60,y:30,w:600,h:1e3},{x:680,y:220,w:1200,h:830}],n:t?o.left:null,rootRef:r,cls:`s5 ru at5${e?" paper":""}`,children:[a.jsx("h1",{className:"ru-title",children:u.split("").map((f,h)=>a.jsx("span",{className:"ch",children:f===" "?" ":f},h))}),a.jsxs("div",{className:"at5-sub",children:["Раунд ",n," · ",e?"передайте бланки ведущему":"капитаны отправляют ответы с телефонов"]}),a.jsx("div",{className:"at5-timer",children:a.jsx(ah,{n:o.left,total:i,size:e?420:380,seeds:24,stem:e?530:585})}),s&&a.jsx("ul",{className:"at5-teams",style:{gridTemplateColumns:`repeat(${c.cols}, 1fr)`,gridAutoRows:c.rowH,"--fz":`${c.fz}px`},children:s.map(f=>a.jsxs("li",{className:`at5-t${f.done?" done":""}`,children:[a.jsx("span",{className:"nm",style:{color:f.color},children:f.name}),a.jsxs("em",{children:[f.got,"/",f.total]})]},f.id))})]})})}function hp({q:n,roundName:e,qno:t,seconds:i}){const s=H.useMemo(()=>wd(n,He,""),[n.id,n.question_text,JSON.stringify(n.media),JSON.stringify(n.answer)]);return a.jsx("div",{className:"fo-screen",children:a.jsx(Ed,{q:s,roundName:e,qno:t,startedAt:null,seconds:i,reveal:!1,calm:!0,from:"D"})})}function fp({on:n,phase:e}){const t=H.useRef(e),[i,s]=H.useState(null);H.useLayoutEffect(()=>{const o=n?kf(t.current,e):null;t.current=e,o&&(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||s(c=>({kind:o,n:((c==null?void 0:c.n)??0)+1})))},[n,e]);const r=H.useCallback(()=>s(null),[]);return!n||!i?null:a.jsx(op,{kind:i.kind,onDone:r},i.n)}function pp({theme:n,teams:e,playerUrl:t,showQr:i,lit:s}){const r=n==="ny_book";return a.jsxs(a.Fragment,{children:[e.length>0&&a.jsx(Lc,{where:Xh,children:r?a.jsx(qh,{teams:e}):a.jsx(Yh,{teams:e})}),i&&a.jsx(Lc,{where:Kh,children:r?a.jsx(Zh,{lit:s,children:a.jsx(rr,{value:t,quiet:!0,ink:"#1d2b4a",title:"QR для подключения",className:"ny-qr-svg"})}):a.jsx(Jh,{lit:s,children:a.jsx(rr,{value:t,quiet:!0,ink:"#0b1735",title:"QR для подключения",className:"ny-qr-svg"})})})]})}const Dd="qp-fx-enabled",mp=4e3,gp={classic:520,potter:700};function xp(){try{const n=localStorage.getItem(Dd);return n===null?!0:n==="1"}catch{return!0}}function _p(n){try{localStorage.setItem(Dd,n?"1":"0")}catch{}}function vp(){return typeof location<"u"&&location.href.includes("nofx=1")}function Mp({theme:n,trigger:e,hud:t}){const[i,s]=H.useState(xp),r=H.useRef(null),o=H.useRef(0),[c,l]=H.useState(null);H.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",i),()=>{document.documentElement.classList.remove("fx-force-motion")}),[i]),H.useEffect(()=>{const u=r.current===null;if(r.current=e,u||!i||n==="new_year"||vp())return;const f=Date.now();f-o.current<mp||(o.current=f,l(f))},[e]),H.useEffect(()=>{if(c===null)return;const u=(gp[n]??300)+50,f=setTimeout(()=>l(null),u);return()=>clearTimeout(f)},[c,n]);const d=n==="classic"||n==="potter";return a.jsxs(a.Fragment,{children:[d&&a.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":i,title:i?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(u=>{const f=!u;return _p(f),f}),children:"✨"}),c!==null&&n==="classic"&&a.jsx(bp,{},c),c!==null&&n==="potter"&&a.jsx(Sp,{},c),n==="classic"&&t&&a.jsx(yp,{label:t},t)]})}function yp({label:n}){const[e,t]=H.useState(()=>90+Math.floor(Math.random()*10));return H.useEffect(()=>{const i=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(i)},[]),a.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",n," · SIG ",e,"%"]})}function bp(){return a.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[a.jsx("span",{className:"fx-beam"}),a.jsx("span",{className:"fx-rgb"})]})}function Sp(){const n=Array.from({length:22},(e,t)=>t);return a.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>a.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const Bc=["🥇","🥈","🥉"];function Oa({theme:n,place:e}){return n==="classic"?a.jsx(wp,{place:e}):n==="potter"?a.jsx(Tp,{place:e}):n==="new_year"?a.jsx(Ep,{place:e}):a.jsx("span",{className:"award-emoji",children:Bc[e-1]??Bc[2]})}function wp({place:n}){return a.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ah-orbit"}),a.jsx("span",{className:"ah-face",children:a.jsx("b",{children:n})})]})}function Ep({place:n}){return a.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ab-cap"}),a.jsxs("span",{className:"ab-ball",children:[a.jsx("span",{className:"ab-shine"}),a.jsx("b",{children:n})]})]})}function Tp({place:n}){return a.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"am-ribbon"}),a.jsxs("span",{className:"am-disc",children:[a.jsx("span",{className:"am-shine"}),a.jsx("b",{children:n})]})]})}function Ap(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Go="185",Cp=0,kc=1,Rp=2,Qs=1,Np=2,rs=3,Vn=0,Gt=1,bn=2,Tn=0,Ii=1,di=2,zc=3,Gc=4,Pp=5,ti=100,Lp=101,Ip=102,Dp=103,Up=104,Fp=200,Op=201,Bp=202,kp=203,Ba=204,ka=205,zp=206,Gp=207,Hp=208,Vp=209,jp=210,Wp=211,$p=212,Xp=213,qp=214,za=0,Ga=1,Ha=2,ki=3,Va=4,ja=5,Wa=6,$a=7,Ud=0,Yp=1,Kp=2,hn=0,Fd=1,Od=2,Bd=3,kd=4,zd=5,Gd=6,Hd=7,Vd=300,ui=301,zi=302,Br=303,kr=304,vr=306,Xa=1e3,Sn=1001,qa=1002,Ct=1003,Zp=1004,bs=1005,It=1006,zr=1007,ri=1008,Wt=1009,jd=1010,Wd=1011,ls=1012,Ho=1013,mn=1014,dn=1015,Rn=1016,Vo=1017,jo=1018,ds=1020,$d=35902,Xd=35899,qd=1021,Yd=1022,tn=1023,Nn=1026,ai=1027,Kd=1028,Wo=1029,hi=1030,$o=1031,Xo=1033,er=33776,tr=33777,nr=33778,ir=33779,Ya=35840,Ka=35841,Za=35842,Ja=35843,Qa=36196,eo=37492,to=37496,no=37488,io=37489,cr=37490,so=37491,ro=37808,ao=37809,oo=37810,co=37811,lo=37812,uo=37813,ho=37814,fo=37815,po=37816,mo=37817,go=37818,xo=37819,_o=37820,vo=37821,Mo=36492,yo=36494,bo=36495,So=36283,wo=36284,lr=36285,Eo=36286,Jp=3200,To=0,Qp=1,zn="",qt="srgb",dr="srgb-linear",ur="linear",it="srgb",xi=7680,Hc=519,em=512,tm=513,nm=514,qo=515,im=516,sm=517,Yo=518,rm=519,Vc=35044,jc="300 es",un=2e3,us=2001;function am(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function hr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function om(){const n=hr("canvas");return n.style.display="block",n}const Wc={};function $c(...n){const e="THREE."+n.shift();console.log(e,...n)}function Zd(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=Zd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=Zd(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Di(...n){const e=n.join(" ");e in Wc||(Wc[e]=!0,Oe(...n))}function cm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const lm={[za]:Ga,[Ha]:Wa,[Va]:$a,[ki]:ja,[Ga]:za,[Wa]:Ha,[$a]:Va,[ja]:ki};class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gr=Math.PI/180,Ao=180/Math.PI;function ps(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function dm(n,e){return(n%e+e)%e}function Hr(n,e,t){return(1-t)*n+t*e}function qi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ac=class ac{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ac.prototype.isVector2=!0;let Ze=ac;class Vi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,c){let l=i[s+0],d=i[s+1],u=i[s+2],f=i[s+3],h=r[o+0],p=r[o+1],x=r[o+2],b=r[o+3];if(f!==b||l!==h||d!==p||u!==x){let m=l*h+d*p+u*x+f*b;m<0&&(h=-h,p=-p,x=-x,b=-b,m=-m);let g=1-c;if(m<.9995){const y=Math.acos(m),w=Math.sin(y);g=Math.sin(g*y)/w,c=Math.sin(c*y)/w,l=l*g+h*c,d=d*g+p*c,u=u*g+x*c,f=f*g+b*c}else{l=l*g+h*c,d=d*g+p*c,u=u*g+x*c,f=f*g+b*c;const y=1/Math.sqrt(l*l+d*d+u*u+f*f);l*=y,d*=y,u*=y,f*=y}}e[t]=l,e[t+1]=d,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,o){const c=i[s],l=i[s+1],d=i[s+2],u=i[s+3],f=r[o],h=r[o+1],p=r[o+2],x=r[o+3];return e[t]=c*x+u*f+l*p-d*h,e[t+1]=l*x+u*h+d*f-c*p,e[t+2]=d*x+u*p+c*h-l*f,e[t+3]=u*x-c*f-l*h-d*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,c=Math.cos,l=Math.sin,d=c(i/2),u=c(s/2),f=c(r/2),h=l(i/2),p=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=h*u*f+d*p*x,this._y=d*p*f-h*u*x,this._z=d*u*x+h*p*f,this._w=d*u*f-h*p*x;break;case"YXZ":this._x=h*u*f+d*p*x,this._y=d*p*f-h*u*x,this._z=d*u*x-h*p*f,this._w=d*u*f+h*p*x;break;case"ZXY":this._x=h*u*f-d*p*x,this._y=d*p*f+h*u*x,this._z=d*u*x+h*p*f,this._w=d*u*f-h*p*x;break;case"ZYX":this._x=h*u*f-d*p*x,this._y=d*p*f+h*u*x,this._z=d*u*x-h*p*f,this._w=d*u*f+h*p*x;break;case"YZX":this._x=h*u*f+d*p*x,this._y=d*p*f+h*u*x,this._z=d*u*x-h*p*f,this._w=d*u*f-h*p*x;break;case"XZY":this._x=h*u*f-d*p*x,this._y=d*p*f-h*u*x,this._z=d*u*x+h*p*f,this._w=d*u*f+h*p*x;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],c=t[5],l=t[9],d=t[2],u=t[6],f=t[10],h=i+c+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-d)*p,this._z=(o-s)*p}else if(i>c&&i>f){const p=2*Math.sqrt(1+i-c-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+d)/p}else if(c>f){const p=2*Math.sqrt(1+c-i-f);this._w=(r-d)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-c);this._w=(o-s)/p,this._x=(r+d)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,c=t._x,l=t._y,d=t._z,u=t._w;return this._x=i*u+o*c+s*d-r*l,this._y=s*u+o*l+r*c-i*d,this._z=r*u+o*d+i*l-s*c,this._w=o*u-i*c-s*l-r*d,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,o=-o,c=-c);let l=1-t;if(c<.9995){const d=Math.acos(c),u=Math.sin(d);l=Math.sin(l*d)/u,t=Math.sin(t*d)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const oc=class oc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,c=e.z,l=e.w,d=2*(o*s-c*i),u=2*(c*t-r*s),f=2*(r*i-o*t);return this.x=t+l*d+o*f-c*u,this.y=i+l*u+c*d-r*f,this.z=s+l*f+r*u-o*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,c=t.y,l=t.z;return this.x=s*l-r*c,this.y=r*o-i*l,this.z=i*c-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vr.copy(this).projectOnVector(e),this.sub(Vr)}reflect(e){return this.sub(Vr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};oc.prototype.isVector3=!0;let J=oc;const Vr=new J,Xc=new Vi,cc=class cc{constructor(e,t,i,s,r,o,c,l,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,d)}set(e,t,i,s,r,o,c,l,d){const u=this.elements;return u[0]=e,u[1]=s,u[2]=c,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[3],l=i[6],d=i[1],u=i[4],f=i[7],h=i[2],p=i[5],x=i[8],b=s[0],m=s[3],g=s[6],y=s[1],w=s[4],S=s[7],T=s[2],M=s[5],R=s[8];return r[0]=o*b+c*y+l*T,r[3]=o*m+c*w+l*M,r[6]=o*g+c*S+l*R,r[1]=d*b+u*y+f*T,r[4]=d*m+u*w+f*M,r[7]=d*g+u*S+f*R,r[2]=h*b+p*y+x*T,r[5]=h*m+p*w+x*M,r[8]=h*g+p*S+x*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],d=e[7],u=e[8];return t*o*u-t*c*d-i*r*u+i*c*l+s*r*d-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],d=e[7],u=e[8],f=u*o-c*d,h=c*l-u*r,p=d*r-o*l,x=t*f+i*h+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/x;return e[0]=f*b,e[1]=(s*d-u*i)*b,e[2]=(c*i-s*o)*b,e[3]=h*b,e[4]=(u*t-s*l)*b,e[5]=(s*r-c*t)*b,e[6]=p*b,e[7]=(i*l-d*t)*b,e[8]=(o*t-i*r)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,c){const l=Math.cos(r),d=Math.sin(r);return this.set(i*l,i*d,-i*(l*o+d*c)+o+e,-s*d,s*l,-s*(-d*o+l*c)+c+t,0,0,1),this}scale(e,t){return Di("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jr.makeScale(e,t)),this}rotate(e){return Di("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jr.makeRotation(-e)),this}translate(e,t){return Di("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};cc.prototype.isMatrix3=!0;let ke=cc;const jr=new ke,qc=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function um(){const n={enabled:!0,workingColorSpace:dr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=An(s.r),s.g=An(s.g),s.b=An(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?ur:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Di("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Di("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[dr]:{primaries:e,whitePoint:i,transfer:ur,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),n}const Ye=um();function An(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ui(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let _i;class hm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{_i===void 0&&(_i=hr("canvas")),_i.width=e.width,_i.height=e.height;const s=_i.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=_i}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=An(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(An(t[i]/255)*255):t[i]=An(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fm=0;class Ko{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=ps(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,c=s.length;o<c;o++)s[o].isDataTexture?r.push(Wr(s[o].image)):r.push(Wr(s[o]))}else r=Wr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Wr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?hm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let pm=0;const $r=new J;class Dt extends pi{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,i=Sn,s=Sn,r=It,o=ri,c=tn,l=Wt,d=Dt.DEFAULT_ANISOTROPY,u=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=ps(),this.name="",this.source=new Ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($r).x}get height(){return this.source.getSize($r).y}get depth(){return this.source.getSize($r).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Vd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xa:e.x=e.x-Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xa:e.y=e.y-Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Vd;Dt.DEFAULT_ANISOTROPY=1;const lc=class lc{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,d=l[0],u=l[4],f=l[8],h=l[1],p=l[5],x=l[9],b=l[2],m=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-b)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+b)<.1&&Math.abs(x+m)<.1&&Math.abs(d+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(d+1)/2,S=(p+1)/2,T=(g+1)/2,M=(u+h)/4,R=(f+b)/4,v=(x+m)/4;return w>S&&w>T?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=M/i,r=R/i):S>T?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=M/s,r=v/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=R/r,s=v/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-x)*(m-x)+(f-b)*(f-b)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(f-b)/y,this.z=(h-u)/y,this.w=Math.acos((d+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};lc.prototype.isVector4=!0;let ft=lc;class mm extends pi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Dt(s),o=i.count;for(let c=0;c<o;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ko(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends mm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Jd extends Dt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gm extends Dt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xr=class xr{constructor(e,t,i,s,r,o,c,l,d,u,f,h,p,x,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,d,u,f,h,p,x,b,m)}set(e,t,i,s,r,o,c,l,d,u,f,h,p,x,b,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=c,g[13]=l,g[2]=d,g[6]=u,g[10]=f,g[14]=h,g[3]=p,g[7]=x,g[11]=b,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xr().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/vi.setFromMatrixColumn(e,0).length(),r=1/vi.setFromMatrixColumn(e,1).length(),o=1/vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),c=Math.sin(i),l=Math.cos(s),d=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=o*u,p=o*f,x=c*u,b=c*f;t[0]=l*u,t[4]=-l*f,t[8]=d,t[1]=p+x*d,t[5]=h-b*d,t[9]=-c*l,t[2]=b-h*d,t[6]=x+p*d,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,x=d*u,b=d*f;t[0]=h+b*c,t[4]=x*c-p,t[8]=o*d,t[1]=o*f,t[5]=o*u,t[9]=-c,t[2]=p*c-x,t[6]=b+h*c,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,x=d*u,b=d*f;t[0]=h-b*c,t[4]=-o*f,t[8]=x+p*c,t[1]=p+x*c,t[5]=o*u,t[9]=b-h*c,t[2]=-o*d,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*f,x=c*u,b=c*f;t[0]=l*u,t[4]=x*d-p,t[8]=h*d+b,t[1]=l*f,t[5]=b*d+h,t[9]=p*d-x,t[2]=-d,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*d,x=c*l,b=c*d;t[0]=l*u,t[4]=b-h*f,t[8]=x*f+p,t[1]=f,t[5]=o*u,t[9]=-c*u,t[2]=-d*u,t[6]=p*f+x,t[10]=h-b*f}else if(e.order==="XZY"){const h=o*l,p=o*d,x=c*l,b=c*d;t[0]=l*u,t[4]=-f,t[8]=d*u,t[1]=h*f+b,t[5]=o*u,t[9]=p*f-x,t[2]=x*f-p,t[6]=c*u,t[10]=b*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xm,e,_m)}lookAt(e,t,i){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Dn.crossVectors(i,Vt),Dn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Dn.crossVectors(i,Vt)),Dn.normalize(),Ss.crossVectors(Vt,Dn),s[0]=Dn.x,s[4]=Ss.x,s[8]=Vt.x,s[1]=Dn.y,s[5]=Ss.y,s[9]=Vt.y,s[2]=Dn.z,s[6]=Ss.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[4],l=i[8],d=i[12],u=i[1],f=i[5],h=i[9],p=i[13],x=i[2],b=i[6],m=i[10],g=i[14],y=i[3],w=i[7],S=i[11],T=i[15],M=s[0],R=s[4],v=s[8],E=s[12],P=s[1],D=s[5],L=s[9],W=s[13],B=s[2],X=s[6],k=s[10],U=s[14],K=s[3],ie=s[7],pe=s[11],he=s[15];return r[0]=o*M+c*P+l*B+d*K,r[4]=o*R+c*D+l*X+d*ie,r[8]=o*v+c*L+l*k+d*pe,r[12]=o*E+c*W+l*U+d*he,r[1]=u*M+f*P+h*B+p*K,r[5]=u*R+f*D+h*X+p*ie,r[9]=u*v+f*L+h*k+p*pe,r[13]=u*E+f*W+h*U+p*he,r[2]=x*M+b*P+m*B+g*K,r[6]=x*R+b*D+m*X+g*ie,r[10]=x*v+b*L+m*k+g*pe,r[14]=x*E+b*W+m*U+g*he,r[3]=y*M+w*P+S*B+T*K,r[7]=y*R+w*D+S*X+T*ie,r[11]=y*v+w*L+S*k+T*pe,r[15]=y*E+w*W+S*U+T*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],c=e[5],l=e[9],d=e[13],u=e[2],f=e[6],h=e[10],p=e[14],x=e[3],b=e[7],m=e[11],g=e[15],y=l*p-d*h,w=c*p-d*f,S=c*h-l*f,T=o*p-d*u,M=o*h-l*u,R=o*f-c*u;return t*(b*y-m*w+g*S)-i*(x*y-m*T+g*M)+s*(x*w-b*T+g*R)-r*(x*S-b*M+m*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],c=e[9],l=e[2],d=e[6],u=e[10];return t*(o*u-c*d)-i*(r*u-c*l)+s*(r*d-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],d=e[7],u=e[8],f=e[9],h=e[10],p=e[11],x=e[12],b=e[13],m=e[14],g=e[15],y=t*c-i*o,w=t*l-s*o,S=t*d-r*o,T=i*l-s*c,M=i*d-r*c,R=s*d-r*l,v=u*b-f*x,E=u*m-h*x,P=u*g-p*x,D=f*m-h*b,L=f*g-p*b,W=h*g-p*m,B=y*W-w*L+S*D+T*P-M*E+R*v;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const X=1/B;return e[0]=(c*W-l*L+d*D)*X,e[1]=(s*L-i*W-r*D)*X,e[2]=(b*R-m*M+g*T)*X,e[3]=(h*M-f*R-p*T)*X,e[4]=(l*P-o*W-d*E)*X,e[5]=(t*W-s*P+r*E)*X,e[6]=(m*S-x*R-g*w)*X,e[7]=(u*R-h*S+p*w)*X,e[8]=(o*L-c*P+d*v)*X,e[9]=(i*P-t*L-r*v)*X,e[10]=(x*M-b*S+g*y)*X,e[11]=(f*S-u*M-p*y)*X,e[12]=(c*E-o*D-l*v)*X,e[13]=(t*D-i*E+s*v)*X,e[14]=(b*w-x*T-m*y)*X,e[15]=(u*T-f*w+h*y)*X,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,c=e.y,l=e.z,d=r*o,u=r*c;return this.set(d*o+i,d*c-s*l,d*l+s*c,0,d*c+s*l,u*c+i,u*l-s*o,0,d*l-s*c,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,c=t._z,l=t._w,d=r+r,u=o+o,f=c+c,h=r*d,p=r*u,x=r*f,b=o*u,m=o*f,g=c*f,y=l*d,w=l*u,S=l*f,T=i.x,M=i.y,R=i.z;return s[0]=(1-(b+g))*T,s[1]=(p+S)*T,s[2]=(x-w)*T,s[3]=0,s[4]=(p-S)*M,s[5]=(1-(h+g))*M,s[6]=(m+y)*M,s[7]=0,s[8]=(x+w)*R,s[9]=(m-y)*R,s[10]=(1-(h+b))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=vi.set(s[0],s[1],s[2]).length();const c=vi.set(s[4],s[5],s[6]).length(),l=vi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Yt.copy(this);const d=1/o,u=1/c,f=1/l;return Yt.elements[0]*=d,Yt.elements[1]*=d,Yt.elements[2]*=d,Yt.elements[4]*=u,Yt.elements[5]*=u,Yt.elements[6]*=u,Yt.elements[8]*=f,Yt.elements[9]*=f,Yt.elements[10]*=f,t.setFromRotationMatrix(Yt),i.x=o,i.y=c,i.z=l,this}makePerspective(e,t,i,s,r,o,c=un,l=!1){const d=this.elements,u=2*r/(t-e),f=2*r/(i-s),h=(t+e)/(t-e),p=(i+s)/(i-s);let x,b;if(l)x=r/(o-r),b=o*r/(o-r);else if(c===un)x=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(c===us)x=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return d[0]=u,d[4]=0,d[8]=h,d[12]=0,d[1]=0,d[5]=f,d[9]=p,d[13]=0,d[2]=0,d[6]=0,d[10]=x,d[14]=b,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,i,s,r,o,c=un,l=!1){const d=this.elements,u=2/(t-e),f=2/(i-s),h=-(t+e)/(t-e),p=-(i+s)/(i-s);let x,b;if(l)x=1/(o-r),b=o/(o-r);else if(c===un)x=-2/(o-r),b=-(o+r)/(o-r);else if(c===us)x=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return d[0]=u,d[4]=0,d[8]=0,d[12]=h,d[1]=0,d[5]=f,d[9]=0,d[13]=p,d[2]=0,d[6]=0,d[10]=x,d[14]=b,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};xr.prototype.isMatrix4=!0;let pt=xr;const vi=new J,Yt=new pt,xm=new J(0,0,0),_m=new J(1,1,1),Dn=new J,Ss=new J,Vt=new J,Kc=new pt,Zc=new Vi;class jn{constructor(e=0,t=0,i=0,s=jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],c=s[8],l=s[1],d=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,p),this._z=Math.atan2(l,d)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,d)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,d));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,p));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,d),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Kc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}jn.DEFAULT_ORDER="XYZ";class Qd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vm=0;const Jc=new J,Mi=new Vi,xn=new pt,ws=new J,Yi=new J,Mm=new J,ym=new Vi,Qc=new J(1,0,0),el=new J(0,1,0),tl=new J(0,0,1),nl={type:"added"},bm={type:"removed"},yi={type:"childadded",child:null},Xr={type:"childremoved",child:null};class Ot extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new J,t=new jn,i=new Vi,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new ke}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(Qc,e)}rotateY(e){return this.rotateOnAxis(el,e)}rotateZ(e){return this.rotateOnAxis(tl,e)}translateOnAxis(e,t){return Jc.copy(e).applyQuaternion(this.quaternion),this.position.add(Jc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qc,e)}translateY(e){return this.translateOnAxis(el,e)}translateZ(e){return this.translateOnAxis(tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ws.copy(e):ws.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Yi,ws,this.up):xn.lookAt(ws,Yi,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(xn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nl),yi.child=e,this.dispatchEvent(yi),yi.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bm),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nl),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,Mm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,ym,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let d=0,u=l.length;d<u;d++){const f=l[d];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,d=this.material.length;l<d;l++)c.push(r(e.materials,this.material[l]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];s.animations.push(r(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),d=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),x=o(e.nodes);c.length>0&&(i.geometries=c),l.length>0&&(i.materials=l),d.length>0&&(i.textures=d),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(c){const l=[];for(const d in c){const u=c[d];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Ot.DEFAULT_UP=new J(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class oi extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sm={type:"move"};class qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const c=this._targetRay,l=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){o=!0;for(const b of e.hand.values()){const m=t.getJointPose(b,i),g=this._getHandJoint(d,b);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=d.joints["index-finger-tip"],f=d.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,x=.005;d.inputState.pinching&&h>p+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&h<=p-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Sm)))}return c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),d!==null&&(d.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new oi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Es={h:0,s:0,l:0};function Yr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=dm(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Yr(o,r,e+1/3),this.g=Yr(o,r,e),this.b=Yr(o,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=qt){function i(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],c=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=eu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Ye.workingToColorSpace(Pt.copy(this),e),Math.round(Ke(Pt.r*255,0,255))*65536+Math.round(Ke(Pt.g*255,0,255))*256+Math.round(Ke(Pt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Pt.copy(this),t);const i=Pt.r,s=Pt.g,r=Pt.b,o=Math.max(i,s,r),c=Math.min(i,s,r);let l,d;const u=(c+o)/2;if(c===o)l=0,d=0;else{const f=o-c;switch(d=u<=.5?f/(o+c):f/(2-o-c),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=d,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=qt){Ye.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,s=Pt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(Es);const i=Hr(Un.h,Es.h,t),s=Hr(Un.s,Es.s,t),r=Hr(Un.l,Es.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new Xe;Xe.NAMES=eu;class Mr{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new Mr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tu extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Kt=new J,_n=new J,Kr=new J,vn=new J,bi=new J,Si=new J,il=new J,Zr=new J,Jr=new J,Qr=new J,ea=new ft,ta=new ft,na=new ft;class Qt{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Kt.subVectors(e,t),s.cross(Kt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Kt.subVectors(s,t),_n.subVectors(i,t),Kr.subVectors(e,t);const o=Kt.dot(Kt),c=Kt.dot(_n),l=Kt.dot(Kr),d=_n.dot(_n),u=_n.dot(Kr),f=o*d-c*c;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(d*l-c*u)*h,x=(o*u-c*l)*h;return r.set(1-p-x,x,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,i,s,r,o,c,l){return this.getBarycoord(e,t,i,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(o,vn.y),l.addScaledVector(c,vn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ea.setScalar(0),ta.setScalar(0),na.setScalar(0),ea.fromBufferAttribute(e,t),ta.fromBufferAttribute(e,i),na.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ea,r.x),o.addScaledVector(ta,r.y),o.addScaledVector(na,r.z),o}static isFrontFacing(e,t,i,s){return Kt.subVectors(i,t),_n.subVectors(e,t),Kt.cross(_n).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Kt.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Qt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,c;bi.subVectors(s,i),Si.subVectors(r,i),Zr.subVectors(e,i);const l=bi.dot(Zr),d=Si.dot(Zr);if(l<=0&&d<=0)return t.copy(i);Jr.subVectors(e,s);const u=bi.dot(Jr),f=Si.dot(Jr);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*d;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(bi,o);Qr.subVectors(e,r);const p=bi.dot(Qr),x=Si.dot(Qr);if(x>=0&&p<=x)return t.copy(r);const b=p*d-l*x;if(b<=0&&d>=0&&x<=0)return c=d/(d-x),t.copy(i).addScaledVector(Si,c);const m=u*x-p*f;if(m<=0&&f-u>=0&&p-x>=0)return il.subVectors(r,s),c=(f-u)/(f-u+(p-x)),t.copy(s).addScaledVector(il,c);const g=1/(m+b+h);return o=b*g,c=h*g,t.copy(i).addScaledVector(bi,o).addScaledVector(Si,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ms{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=r.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Zt):Zt.fromBufferAttribute(r,o),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ts.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ts.copy(i.boundingBox)),Ts.applyMatrix4(e.matrixWorld),this.union(Ts)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ki),As.subVectors(this.max,Ki),wi.subVectors(e.a,Ki),Ei.subVectors(e.b,Ki),Ti.subVectors(e.c,Ki),Fn.subVectors(Ei,wi),On.subVectors(Ti,Ei),Xn.subVectors(wi,Ti);let t=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-Xn.z,Xn.y,Fn.z,0,-Fn.x,On.z,0,-On.x,Xn.z,0,-Xn.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-Xn.y,Xn.x,0];return!ia(t,wi,Ei,Ti,As)||(t=[1,0,0,0,1,0,0,0,1],!ia(t,wi,Ei,Ti,As))?!1:(Cs.crossVectors(Fn,On),t=[Cs.x,Cs.y,Cs.z],ia(t,wi,Ei,Ti,As))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mn=[new J,new J,new J,new J,new J,new J,new J,new J],Zt=new J,Ts=new ms,wi=new J,Ei=new J,Ti=new J,Fn=new J,On=new J,Xn=new J,Ki=new J,As=new J,Cs=new J,qn=new J;function ia(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){qn.fromArray(n,r);const c=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),l=e.dot(qn),d=t.dot(qn),u=i.dot(qn);if(Math.max(-Math.max(l,d,u),Math.min(l,d,u))>c)return!1}return!0}const yt=new J,Rs=new Ze;let wm=0;class Bt extends pi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Vc,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=qi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),i=kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),i=kt(i,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),i=kt(i,this.array),s=kt(s,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class nu extends Bt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class iu extends Bt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Et extends Bt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Em=new ms,Zi=new J,sa=new J;class yr{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Em.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zi.subVectors(e,this.center);const t=Zi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Zi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zi.copy(e.center).add(sa)),this.expandByPoint(Zi.copy(e.center).sub(sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Tm=0;const Xt=new pt,ra=new Ot,Ai=new J,jt=new ms,Ji=new ms,wt=new J;class Ut extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(am(e)?iu:nu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,i){return Xt.makeTranslation(e,t,i),this.applyMatrix4(Xt),this}scale(e,t,i){return Xt.makeScale(e,t,i),this.applyMatrix4(Xt),this}lookAt(e){return ra.lookAt(e),ra.updateMatrix(),this.applyMatrix4(ra.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Et(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ms);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const c=t[r];Ji.setFromBufferAttribute(c),this.morphTargetsRelative?(wt.addVectors(jt.min,Ji.min),jt.expandByPoint(wt),wt.addVectors(jt.max,Ji.max),jt.expandByPoint(wt)):(jt.expandByPoint(Ji.min),jt.expandByPoint(Ji.max))}jt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(wt));if(t)for(let r=0,o=t.length;r<o;r++){const c=t[r],l=this.morphTargetsRelative;for(let d=0,u=c.count;d<u;d++)wt.fromBufferAttribute(c,d),l&&(Ai.fromBufferAttribute(e,d),wt.add(Ai)),s=Math.max(s,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Bt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const c=[],l=[];for(let v=0;v<i.count;v++)c[v]=new J,l[v]=new J;const d=new J,u=new J,f=new J,h=new Ze,p=new Ze,x=new Ze,b=new J,m=new J;function g(v,E,P){d.fromBufferAttribute(i,v),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,P),h.fromBufferAttribute(r,v),p.fromBufferAttribute(r,E),x.fromBufferAttribute(r,P),u.sub(d),f.sub(d),p.sub(h),x.sub(h);const D=1/(p.x*x.y-x.x*p.y);isFinite(D)&&(b.copy(u).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(D),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(D),c[v].add(b),c[E].add(b),c[P].add(b),l[v].add(m),l[E].add(m),l[P].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,E=y.length;v<E;++v){const P=y[v],D=P.start,L=P.count;for(let W=D,B=D+L;W<B;W+=3)g(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const w=new J,S=new J,T=new J,M=new J;function R(v){T.fromBufferAttribute(s,v),M.copy(T);const E=c[v];w.copy(E),w.sub(T.multiplyScalar(T.dot(E))).normalize(),S.crossVectors(M,E);const D=S.dot(l[v])<0?-1:1;o.setXYZW(v,w.x,w.y,w.z,D)}for(let v=0,E=y.length;v<E;++v){const P=y[v],D=P.start,L=P.count;for(let W=D,B=D+L;W<B;W+=3)R(e.getX(W+0)),R(e.getX(W+1)),R(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new J,r=new J,o=new J,c=new J,l=new J,d=new J,u=new J,f=new J;if(e)for(let h=0,p=e.count;h<p;h+=3){const x=e.getX(h+0),b=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,b),d.fromBufferAttribute(i,m),c.add(u),l.add(u),d.add(u),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(m,d.x,d.y,d.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(c,l){const d=c.array,u=c.itemSize,f=c.normalized,h=new d.constructor(l.length*u);let p=0,x=0;for(let b=0,m=l.length;b<m;b++){c.isInterleavedBufferAttribute?p=l[b]*c.data.stride+c.offset:p=l[b]*u;for(let g=0;g<u;g++)h[x++]=d[p++]}return new Bt(h,u,f)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,i=this.index.array,s=this.attributes;for(const c in s){const l=s[c],d=e(l,i);t.setAttribute(c,d)}const r=this.morphAttributes;for(const c in r){const l=[],d=r[c];for(let u=0,f=d.length;u<f;u++){const h=d[u],p=e(h,i);l.push(p)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const d=o[c];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const d in l)l[d]!==void 0&&(e[d]=l[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const d=i[l];e.data.attributes[l]=d.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const d=this.morphAttributes[l],u=[];for(let f=0,h=d.length;f<h;f++){const p=d[f];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const d in s){const u=s[d];this.setAttribute(d,u.clone(t))}const r=e.morphAttributes;for(const d in r){const u=[],f=r[d];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[d]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let d=0,u=o.length;d<u;d++){const f=o[d];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Am=0;class ji extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=Ii,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=ka,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(i.blending=this.blending),this.side!==Vn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ba&&(i.blendSrc=this.blendSrc),this.blendDst!==ka&&(i.blendDst=this.blendDst),this.blendEquation!==ti&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ki&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const c in r){const l=r[c];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const yn=new J,aa=new J,Ns=new J,Bn=new J,oa=new J,Ps=new J,ca=new J;class su{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,t),yn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){aa.copy(e).add(t).multiplyScalar(.5),Ns.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(aa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ns),c=Bn.dot(this.direction),l=-Bn.dot(Ns),d=Bn.lengthSq(),u=Math.abs(1-o*o);let f,h,p,x;if(u>0)if(f=o*l-c,h=o*c-l,x=r*u,f>=0)if(h>=-x)if(h<=x){const b=1/u;f*=b,h*=b,p=f*(f+o*h+2*c)+h*(o*f+h+2*l)+d}else h=r,f=Math.max(0,-(o*h+c)),p=-f*f+h*(h+2*l)+d;else h=-r,f=Math.max(0,-(o*h+c)),p=-f*f+h*(h+2*l)+d;else h<=-x?(f=Math.max(0,-(-o*r+c)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+d):h<=x?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+d):(f=Math.max(0,-(o*r+c)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+d);else h=o>0?-r:r,f=Math.max(0,-(o*h+c)),p=-f*f+h*(h+2*l)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(aa).addScaledVector(Ns,h),p}intersectSphere(e,t){yn.subVectors(e.center,this.origin);const i=yn.dot(this.direction),s=yn.dot(yn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),c=i-o,l=i+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,c,l;const d=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return d>=0?(i=(e.min.x-h.x)*d,s=(e.max.x-h.x)*d):(i=(e.max.x-h.x)*d,s=(e.min.x-h.x)*d),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(c=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(c=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||c>s)||((c>i||i!==i)&&(i=c),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,t,i,s,r){oa.subVectors(t,e),Ps.subVectors(i,e),ca.crossVectors(oa,Ps);let o=this.direction.dot(ca),c;if(o>0){if(s)return null;c=1}else if(o<0)c=-1,o=-o;else return null;Bn.subVectors(this.origin,e);const l=c*this.direction.dot(Ps.crossVectors(Bn,Ps));if(l<0)return null;const d=c*this.direction.dot(oa.cross(Bn));if(d<0||l+d>o)return null;const u=-c*Bn.dot(ca);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Hn extends ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Ud,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const sl=new pt,Yn=new su,Ls=new yr,rl=new J,Is=new J,Ds=new J,Us=new J,la=new J,Fs=new J,al=new J,Os=new J;class ut extends Ot{constructor(e=new Ut,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Fs.set(0,0,0);for(let l=0,d=r.length;l<d;l++){const u=c[l],f=r[l];u!==0&&(la.fromBufferAttribute(f,e),o?Fs.addScaledVector(la,u):Fs.addScaledVector(la.sub(t),u))}t.add(Fs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(r),Yn.copy(e.ray).recast(e.near),!(Ls.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(Ls,rl)===null||Yn.origin.distanceToSquared(rl)>(e.far-e.near)**2))&&(sl.copy(r).invert(),Yn.copy(e.ray).applyMatrix4(sl),!(i.boundingBox!==null&&Yn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Yn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,c=r.index,l=r.attributes.position,d=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(c!==null)if(Array.isArray(o))for(let x=0,b=h.length;x<b;x++){const m=h[x],g=o[m.materialIndex],y=Math.max(m.start,p.start),w=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,T=w;S<T;S+=3){const M=c.getX(S),R=c.getX(S+1),v=c.getX(S+2);s=Bs(this,g,e,i,d,u,f,M,R,v),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=x,g=b;m<g;m+=3){const y=c.getX(m),w=c.getX(m+1),S=c.getX(m+2);s=Bs(this,o,e,i,d,u,f,y,w,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,b=h.length;x<b;x++){const m=h[x],g=o[m.materialIndex],y=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=y,T=w;S<T;S+=3){const M=S,R=S+1,v=S+2;s=Bs(this,g,e,i,d,u,f,M,R,v),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let m=x,g=b;m<g;m+=3){const y=m,w=m+1,S=m+2;s=Bs(this,o,e,i,d,u,f,y,w,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Cm(n,e,t,i,s,r,o,c){let l;if(e.side===Gt?l=i.intersectTriangle(o,r,s,!0,c):l=i.intersectTriangle(s,r,o,e.side===Vn,c),l===null)return null;Os.copy(c),Os.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(Os);return d<t.near||d>t.far?null:{distance:d,point:Os.clone(),object:n}}function Bs(n,e,t,i,s,r,o,c,l,d){n.getVertexPosition(c,Is),n.getVertexPosition(l,Ds),n.getVertexPosition(d,Us);const u=Cm(n,e,t,i,Is,Ds,Us,al);if(u){const f=new J;Qt.getBarycoord(al,Is,Ds,Us,f),s&&(u.uv=Qt.getInterpolatedAttribute(s,c,l,d,f,new Ze)),r&&(u.uv1=Qt.getInterpolatedAttribute(r,c,l,d,f,new Ze)),o&&(u.normal=Qt.getInterpolatedAttribute(o,c,l,d,f,new J),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:l,c:d,normal:new J,materialIndex:0};Qt.getNormal(Is,Ds,Us,h.normal),u.face=h,u.barycoord=f}return u}class Rm extends Dt{constructor(e=null,t=1,i=1,s,r,o,c,l,d=Ct,u=Ct,f,h){super(null,o,c,l,d,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const da=new J,Nm=new J,Pm=new ke;class Jn{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=da.subVectors(i,t).cross(Nm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(da),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Pm.getNormalMatrix(e),s=this.coplanarPoint(da).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new yr,Lm=new Ze(.5,.5),ks=new J;class Zo{constructor(e=new Jn,t=new Jn,i=new Jn,s=new Jn,r=new Jn,o=new Jn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=un,i=!1){const s=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],d=r[3],u=r[4],f=r[5],h=r[6],p=r[7],x=r[8],b=r[9],m=r[10],g=r[11],y=r[12],w=r[13],S=r[14],T=r[15];if(s[0].setComponents(d-o,p-u,g-x,T-y).normalize(),s[1].setComponents(d+o,p+u,g+x,T+y).normalize(),s[2].setComponents(d+c,p+f,g+b,T+w).normalize(),s[3].setComponents(d-c,p-f,g-b,T-w).normalize(),i)s[4].setComponents(l,h,m,S).normalize(),s[5].setComponents(d-l,p-h,g-m,T-S).normalize();else if(s[4].setComponents(d-l,p-h,g-m,T-S).normalize(),t===un)s[5].setComponents(d+l,p+h,g+m,T+S).normalize();else if(t===us)s[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){Kn.center.set(0,0,0);const t=Lm.distanceTo(e.center);return Kn.radius=.7071067811865476+t,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ks.x=s.normal.x>0?e.max.x:e.min.x,ks.y=s.normal.y>0?e.max.y:e.min.y,ks.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class br extends ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ol=new pt,Co=new su,zs=new yr,Gs=new J;class Jo extends Ot{constructor(e=new Ut,t=new br){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(s),zs.radius+=r,e.ray.intersectsSphere(zs)===!1)return;ol.copy(s).invert(),Co.copy(e.ray).applyMatrix4(ol);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,d=i.index,f=i.attributes.position;if(d!==null){const h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let x=h,b=p;x<b;x++){const m=d.getX(x);Gs.fromBufferAttribute(f,m),cl(Gs,m,l,s,e,t,this)}}else{const h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let x=h,b=p;x<b;x++)Gs.fromBufferAttribute(f,x),cl(Gs,x,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function cl(n,e,t,i,s,r,o){const c=Co.distanceSqToPoint(n);if(c<t){const l=new J;Co.closestPointToPoint(n,l),l.applyMatrix4(i);const d=s.ray.origin.distanceTo(l);if(d<s.near||d>s.far)return;r.push({distance:d,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class ru extends Dt{constructor(e=[],t=ui,i,s,r,o,c,l,d,u){super(e,t,i,s,r,o,c,l,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class au extends Dt{constructor(e,t,i,s,r,o,c,l,d){super(e,t,i,s,r,o,c,l,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gi extends Dt{constructor(e,t,i=mn,s,r,o,c=Ct,l=Ct,d,u=Nn,f=1){if(u!==Nn&&u!==ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,o,c,l,u,i,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Im extends Gi{constructor(e,t=mn,i=ui,s,r,o=Ct,c=Ct,l,d=Nn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,o,c,l,d),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ou extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fi extends Ut{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const c=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],d=[],u=[],f=[];let h=0,p=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Et(d,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(f,2));function x(b,m,g,y,w,S,T,M,R,v,E){const P=S/R,D=T/v,L=S/2,W=T/2,B=M/2,X=R+1,k=v+1;let U=0,K=0;const ie=new J;for(let pe=0;pe<k;pe++){const he=pe*D-W;for(let me=0;me<X;me++){const Pe=me*P-L;ie[b]=Pe*y,ie[m]=he*w,ie[g]=B,d.push(ie.x,ie.y,ie.z),ie[b]=0,ie[m]=0,ie[g]=M>0?1:-1,u.push(ie.x,ie.y,ie.z),f.push(me/R),f.push(1-pe/v),U+=1}}for(let pe=0;pe<v;pe++)for(let he=0;he<R;he++){const me=h+he+X*pe,Pe=h+he+X*(pe+1),ge=h+(he+1)+X*(pe+1),Be=h+(he+1)+X*pe;l.push(me,Pe,Be),l.push(Pe,ge,Be),K+=6}c.addGroup(p,K,E),p+=K,h+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Fi extends Ut{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l};const d=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],p=[];let x=0;const b=[],m=i/2;let g=0;y(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Et(f,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(p,2));function y(){const S=new J,T=new J;let M=0;const R=(t-e)/i;for(let v=0;v<=r;v++){const E=[],P=v/r,D=P*(t-e)+e;for(let L=0;L<=s;L++){const W=L/s,B=W*l+c,X=Math.sin(B),k=Math.cos(B);T.x=D*X,T.y=-P*i+m,T.z=D*k,f.push(T.x,T.y,T.z),S.set(X,R,k).normalize(),h.push(S.x,S.y,S.z),p.push(W,1-P),E.push(x++)}b.push(E)}for(let v=0;v<s;v++)for(let E=0;E<r;E++){const P=b[E][v],D=b[E+1][v],L=b[E+1][v+1],W=b[E][v+1];(e>0||E!==0)&&(u.push(P,D,W),M+=3),(t>0||E!==r-1)&&(u.push(D,L,W),M+=3)}d.addGroup(g,M,0),g+=M}function w(S){const T=x,M=new Ze,R=new J;let v=0;const E=S===!0?e:t,P=S===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,m*P,0),h.push(0,P,0),p.push(.5,.5),x++;const D=x;for(let L=0;L<=s;L++){const B=L/s*l+c,X=Math.cos(B),k=Math.sin(B);R.x=E*k,R.y=m*P,R.z=E*X,f.push(R.x,R.y,R.z),h.push(0,P,0),M.x=X*.5+.5,M.y=k*.5*P+.5,p.push(M.x,M.y),x++}for(let L=0;L<s;L++){const W=T+L,B=D+L;S===!0?u.push(B,B+1,W):u.push(B+1,B,W),v+=3}d.addGroup(g,v,S===!0?1:2),g+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qo extends Fi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,c=Math.PI*2){super(0,e,t,i,s,r,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c}}static fromJSON(e){return new Qo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wi extends Ut{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,c=Math.floor(i),l=Math.floor(s),d=c+1,u=l+1,f=e/c,h=t/l,p=[],x=[],b=[],m=[];for(let g=0;g<u;g++){const y=g*h-o;for(let w=0;w<d;w++){const S=w*f-r;x.push(S,-y,0),b.push(0,0,1),m.push(w/c),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<c;y++){const w=y+d*g,S=y+d*(g+1),T=y+1+d*(g+1),M=y+1+d*g;p.push(w,S,M),p.push(S,T,M)}this.setIndex(p),this.setAttribute("position",new Et(x,3)),this.setAttribute("normal",new Et(b,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.width,e.height,e.widthSegments,e.heightSegments)}}class fr extends Ut{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+c,Math.PI);let d=0;const u=[],f=new J,h=new J,p=[],x=[],b=[],m=[];for(let g=0;g<=i;g++){const y=[],w=g/i,S=o+w*c,T=e*Math.cos(S),M=Math.sqrt(e*e-T*T);let R=0;g===0&&o===0?R=.5/t:g===i&&l===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const E=v/t,P=s+E*r;f.x=-M*Math.cos(P),f.y=T,f.z=M*Math.sin(P),x.push(f.x,f.y,f.z),h.copy(f).normalize(),b.push(h.x,h.y,h.z),m.push(E+R,1-w),y.push(d++)}u.push(y)}for(let g=0;g<i;g++)for(let y=0;y<t;y++){const w=u[g][y+1],S=u[g][y],T=u[g+1][y],M=u[g+1][y+1];(g!==0||o>0)&&p.push(w,S,M),(g!==i-1||l<Math.PI)&&p.push(S,T,M)}this.setIndex(p),this.setAttribute("position",new Et(x,3)),this.setAttribute("normal",new Et(b,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ec extends Ut{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const l=[],d=[],u=[],f=[],h=new J,p=new J,x=new J;for(let b=0;b<=i;b++){const m=o+b/i*c;for(let g=0;g<=s;g++){const y=g/s*r;p.x=(e+t*Math.cos(m))*Math.cos(y),p.y=(e+t*Math.cos(m))*Math.sin(y),p.z=t*Math.sin(m),d.push(p.x,p.y,p.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),x.subVectors(p,h).normalize(),u.push(x.x,x.y,x.z),f.push(g/s),f.push(b/i)}}for(let b=1;b<=i;b++)for(let m=1;m<=s;m++){const g=(s+1)*b+m-1,y=(s+1)*(b-1)+m-1,w=(s+1)*(b-1)+m,S=(s+1)*b+m;l.push(g,y,S),l.push(y,w,S)}this.setIndex(l),this.setAttribute("position",new Et(d,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Hi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(ll(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(ll(s[0])){const r=[];for(let o=0,c=s.length;o<c;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=Hi(n[t]);for(const s in i)e[s]=i[s]}return e}function ll(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Dm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function cu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Um={clone:Hi,merge:Ft};var Fm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Om=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fm,this.fragmentShader=Om,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Dm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new pt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Bm extends gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Zn extends ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=To,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class km extends ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zm extends ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class lu extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ua=new pt,dl=new J,ul=new J;class Gm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=Wt,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zo,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(dl),ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ul),t.updateMatrixWorld(),ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===us||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Hs=new J,Vs=new Vi,an=new J;class du extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hs,Vs,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hs,Vs,an.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Hs,Vs,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hs,Vs,an.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const kn=new J,hl=new Ze,fl=new Ze;class zt extends du{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ao*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,hl,fl),t.subVectors(fl,hl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,d=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/d,s*=o.width/l,i*=o.height/d}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Hm extends Gm{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0}}class ci extends lu{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Hm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class uu extends du{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,c=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=d*this.view.offsetX,o=r+d*this.view.width,c-=u*this.view.offsetY,l=c-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hu extends lu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ci=-90,Ri=1;class Vm extends Ot{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zt(Ci,Ri,e,t);s.layers=this.layers,this.add(s);const r=new zt(Ci,Ri,e,t);r.layers=this.layers,this.add(r);const o=new zt(Ci,Ri,e,t);o.layers=this.layers,this.add(o);const c=new zt(Ci,Ri,e,t);c.layers=this.layers,this.add(c);const l=new zt(Ci,Ri,e,t);l.layers=this.layers,this.add(l);const d=new zt(Ci,Ri,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,c,l]=t;for(const d of t)this.remove(d);if(e===un)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===us)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,c,l,d,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class jm extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const dc=class dc{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};dc.prototype.isMatrix2=!0;let pl=dc;function ml(n,e,t,i){const s=Wm(i);switch(t){case qd:return n*e;case Kd:return n*e/s.components*s.byteLength;case Wo:return n*e/s.components*s.byteLength;case hi:return n*e*2/s.components*s.byteLength;case $o:return n*e*2/s.components*s.byteLength;case Yd:return n*e*3/s.components*s.byteLength;case tn:return n*e*4/s.components*s.byteLength;case Xo:return n*e*4/s.components*s.byteLength;case er:case tr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case nr:case ir:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ka:case Ja:return Math.max(n,16)*Math.max(e,8)/4;case Ya:case Za:return Math.max(n,8)*Math.max(e,8)/2;case Qa:case eo:case no:case io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case to:case cr:case so:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ao:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case oo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case co:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case lo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case uo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ho:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case fo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case po:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case mo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case go:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case _o:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case vo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Mo:case yo:case bo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case So:case wo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case lr:case Eo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wm(n){switch(n){case Wt:case jd:return{byteLength:1,components:1};case ls:case Wd:case Rn:return{byteLength:2,components:1};case Vo:case jo:return{byteLength:2,components:4};case mn:case Ho:case dn:return{byteLength:4,components:1};case $d:case Xd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Go}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Go);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function fu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function $m(n){const e=new WeakMap;function t(c,l){const d=c.array,u=c.usage,f=d.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,d,u),c.onUploadCallback();let p;if(d instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)p=n.HALF_FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)p=n.SHORT;else if(d instanceof Uint32Array)p=n.UNSIGNED_INT;else if(d instanceof Int32Array)p=n.INT;else if(d instanceof Int8Array)p=n.BYTE;else if(d instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:h,type:p,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function i(c,l,d){const u=l.array,f=l.updateRanges;if(n.bindBuffer(d,c),f.length===0)n.bufferSubData(d,0,u);else{f.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<f.length;p++){const x=f[h],b=f[p];b.start<=x.start+x.count+1?x.count=Math.max(x.count,b.start+b.count-x.start):(++h,f[h]=b)}f.length=h+1;for(let p=0,x=f.length;p<x;p++){const b=f[p];n.bufferSubData(d,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(n.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const u=e.get(c);(!u||u.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const d=e.get(c);if(d===void 0)e.set(c,t(c,l));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,c,l),d.version=c.version}}return{get:s,remove:r,update:o}}var Xm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qm=`#ifdef USE_ALPHAHASH
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
#endif`,Ym=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Km=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qm=`#ifdef USE_AOMAP
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
#endif`,e0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t0=`#ifdef USE_BATCHING
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
#endif`,n0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,s0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,r0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,a0=`#ifdef USE_IRIDESCENCE
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
#endif`,o0=`#ifdef USE_BUMPMAP
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
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,h0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,f0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,g0=`#define PI 3.141592653589793
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
} // validated`,x0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_0=`vec3 transformedNormal = objectNormal;
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
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,y0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,S0="gl_FragColor = linearToOutputTexel( gl_FragColor );",w0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,E0=`#ifdef USE_ENVMAP
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
#endif`,T0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
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
#endif`,C0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
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
#endif`,N0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,L0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,I0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D0=`#ifdef USE_GRADIENTMAP
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
}`,U0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,F0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,k0=`#ifdef USE_ENVMAP
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
#endif`,z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,V0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,j0=`PhysicalMaterial material;
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
#endif`,W0=`uniform sampler2D dfgLUT;
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
}`,$0=`
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
#endif`,X0=`#if defined( RE_IndirectDiffuse )
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
#endif`,q0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Y0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,K0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ig=`#if defined( USE_POINTS_UV )
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
#endif`,sg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ag=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,og=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lg=`#ifdef USE_MORPHTARGETS
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
#endif`,dg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ug=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,gg=`#ifdef USE_NORMALMAP
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
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ag=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ng=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lg=`float getShadowMask() {
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
}`,Ig=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dg=`#ifdef USE_SKINNING
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
#endif`,Ug=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
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
#endif`,Og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gg=`#ifdef USE_TRANSMISSION
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
#endif`,Hg=`#ifdef USE_TRANSMISSION
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
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$g=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qg=`uniform sampler2D t2D;
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
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`#include <common>
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
}`,ex=`#if DEPTH_PACKING == 3200
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
}`,tx=`#define DISTANCE
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
}`,nx=`#define DISTANCE
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`uniform float scale;
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
}`,ax=`uniform vec3 diffuse;
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
}`,ox=`#include <common>
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
}`,cx=`uniform vec3 diffuse;
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
}`,lx=`#define LAMBERT
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
}`,dx=`#define LAMBERT
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
}`,ux=`#define MATCAP
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
}`,hx=`#define MATCAP
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
}`,fx=`#define NORMAL
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
}`,px=`#define NORMAL
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
}`,mx=`#define PHONG
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
}`,gx=`#define PHONG
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
}`,xx=`#define STANDARD
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
}`,_x=`#define STANDARD
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
}`,vx=`#define TOON
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
}`,Mx=`#define TOON
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
}`,yx=`uniform float size;
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
}`,bx=`uniform vec3 diffuse;
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
}`,Sx=`#include <common>
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
}`,wx=`uniform vec3 color;
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
}`,Ex=`uniform float rotation;
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
}`,Tx=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:Xm,alphahash_pars_fragment:qm,alphamap_fragment:Ym,alphamap_pars_fragment:Km,alphatest_fragment:Zm,alphatest_pars_fragment:Jm,aomap_fragment:Qm,aomap_pars_fragment:e0,batching_pars_vertex:t0,batching_vertex:n0,begin_vertex:i0,beginnormal_vertex:s0,bsdfs:r0,iridescence_fragment:a0,bumpmap_pars_fragment:o0,clipping_planes_fragment:c0,clipping_planes_pars_fragment:l0,clipping_planes_pars_vertex:d0,clipping_planes_vertex:u0,color_fragment:h0,color_pars_fragment:f0,color_pars_vertex:p0,color_vertex:m0,common:g0,cube_uv_reflection_fragment:x0,defaultnormal_vertex:_0,displacementmap_pars_vertex:v0,displacementmap_vertex:M0,emissivemap_fragment:y0,emissivemap_pars_fragment:b0,colorspace_fragment:S0,colorspace_pars_fragment:w0,envmap_fragment:E0,envmap_common_pars_fragment:T0,envmap_pars_fragment:A0,envmap_pars_vertex:C0,envmap_physical_pars_fragment:k0,envmap_vertex:R0,fog_vertex:N0,fog_pars_vertex:P0,fog_fragment:L0,fog_pars_fragment:I0,gradientmap_pars_fragment:D0,lightmap_pars_fragment:U0,lights_lambert_fragment:F0,lights_lambert_pars_fragment:O0,lights_pars_begin:B0,lights_toon_fragment:z0,lights_toon_pars_fragment:G0,lights_phong_fragment:H0,lights_phong_pars_fragment:V0,lights_physical_fragment:j0,lights_physical_pars_fragment:W0,lights_fragment_begin:$0,lights_fragment_maps:X0,lights_fragment_end:q0,lightprobes_pars_fragment:Y0,logdepthbuf_fragment:K0,logdepthbuf_pars_fragment:Z0,logdepthbuf_pars_vertex:J0,logdepthbuf_vertex:Q0,map_fragment:eg,map_pars_fragment:tg,map_particle_fragment:ng,map_particle_pars_fragment:ig,metalnessmap_fragment:sg,metalnessmap_pars_fragment:rg,morphinstance_vertex:ag,morphcolor_vertex:og,morphnormal_vertex:cg,morphtarget_pars_vertex:lg,morphtarget_vertex:dg,normal_fragment_begin:ug,normal_fragment_maps:hg,normal_pars_fragment:fg,normal_pars_vertex:pg,normal_vertex:mg,normalmap_pars_fragment:gg,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:_g,clearcoat_pars_fragment:vg,iridescence_pars_fragment:Mg,opaque_fragment:yg,packing:bg,premultiplied_alpha_fragment:Sg,project_vertex:wg,dithering_fragment:Eg,dithering_pars_fragment:Tg,roughnessmap_fragment:Ag,roughnessmap_pars_fragment:Cg,shadowmap_pars_fragment:Rg,shadowmap_pars_vertex:Ng,shadowmap_vertex:Pg,shadowmask_pars_fragment:Lg,skinbase_vertex:Ig,skinning_pars_vertex:Dg,skinning_vertex:Ug,skinnormal_vertex:Fg,specularmap_fragment:Og,specularmap_pars_fragment:Bg,tonemapping_fragment:kg,tonemapping_pars_fragment:zg,transmission_fragment:Gg,transmission_pars_fragment:Hg,uv_pars_fragment:Vg,uv_pars_vertex:jg,uv_vertex:Wg,worldpos_vertex:$g,background_vert:Xg,background_frag:qg,backgroundCube_vert:Yg,backgroundCube_frag:Kg,cube_vert:Zg,cube_frag:Jg,depth_vert:Qg,depth_frag:ex,distance_vert:tx,distance_frag:nx,equirect_vert:ix,equirect_frag:sx,linedashed_vert:rx,linedashed_frag:ax,meshbasic_vert:ox,meshbasic_frag:cx,meshlambert_vert:lx,meshlambert_frag:dx,meshmatcap_vert:ux,meshmatcap_frag:hx,meshnormal_vert:fx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:xx,meshphysical_frag:_x,meshtoon_vert:vx,meshtoon_frag:Mx,points_vert:yx,points_frag:bx,shadow_vert:Sx,shadow_frag:wx,sprite_vert:Ex,sprite_frag:Tx},ye={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},ln={basic:{uniforms:Ft([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Ft([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Ft([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Ft([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Ft([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Ft([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Ft([ye.points,ye.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Ft([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Ft([ye.common,ye.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Ft([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Ft([ye.sprite,ye.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Ft([ye.common,ye.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Ft([ye.lights,ye.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ln.physical={uniforms:Ft([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const js={r:0,b:0,g:0},Ax=new pt,pu=new ke;pu.set(-1,0,0,0,1,0,0,0,1);function Cx(n,e,t,i,s,r){const o=new Xe(0);let c=s===!0?0:1,l,d,u=null,f=0,h=null;function p(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const S=y.backgroundBlurriness>0;w=e.get(w,S)}return w}function x(y){let w=!1;const S=p(y);S===null?m(o,c):S&&S.isColor&&(m(S,1),w=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function b(y,w){const S=p(w);S&&(S.isCubeTexture||S.mapping===vr)?(d===void 0&&(d=new ut(new fi(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Hi(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(T,M,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),d.material.uniforms.envMap.value=S,d.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(pu),d.material.toneMapped=Ye.getTransfer(S.colorSpace)!==it,(u!==S||f!==S.version||h!==n.toneMapping)&&(d.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ut(new Wi(2,2),new gn({name:"BackgroundMaterial",uniforms:Hi(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(S.colorSpace)!==it,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,w){y.getRGB(js,cu(n)),t.buffers.color.setClear(js.r,js.g,js.b,w,r)}function g(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,w=1){o.set(y),c=w,m(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(o,c)},render:x,addToRenderList:b,dispose:g}}function Rx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function c(D,L,W,B,X){let k=!1;const U=f(D,B,W,L);r!==U&&(r=U,d(r.object)),k=p(D,B,W,X),k&&x(D,B,W,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,S(D,L,W,B),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function d(D){return n.bindVertexArray(D)}function u(D){return n.deleteVertexArray(D)}function f(D,L,W,B){const X=B.wireframe===!0;let k=i[L.id];k===void 0&&(k={},i[L.id]=k);const U=D.isInstancedMesh===!0?D.id:0;let K=k[U];K===void 0&&(K={},k[U]=K);let ie=K[W.id];ie===void 0&&(ie={},K[W.id]=ie);let pe=ie[X];return pe===void 0&&(pe=h(l()),ie[X]=pe),pe}function h(D){const L=[],W=[],B=[];for(let X=0;X<t;X++)L[X]=0,W[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:B,object:D,attributes:{},index:null}}function p(D,L,W,B){const X=r.attributes,k=L.attributes;let U=0;const K=W.getAttributes();for(const ie in K)if(K[ie].location>=0){const he=X[ie];let me=k[ie];if(me===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(me=D.instanceColor)),he===void 0||he.attribute!==me||me&&he.data!==me.data)return!0;U++}return r.attributesNum!==U||r.index!==B}function x(D,L,W,B){const X={},k=L.attributes;let U=0;const K=W.getAttributes();for(const ie in K)if(K[ie].location>=0){let he=k[ie];he===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(he=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(he=D.instanceColor));const me={};me.attribute=he,he&&he.data&&(me.data=he.data),X[ie]=me,U++}r.attributes=X,r.attributesNum=U,r.index=B}function b(){const D=r.newAttributes;for(let L=0,W=D.length;L<W;L++)D[L]=0}function m(D){g(D,0)}function g(D,L){const W=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;W[D]=1,B[D]===0&&(n.enableVertexAttribArray(D),B[D]=1),X[D]!==L&&(n.vertexAttribDivisor(D,L),X[D]=L)}function y(){const D=r.newAttributes,L=r.enabledAttributes;for(let W=0,B=L.length;W<B;W++)L[W]!==D[W]&&(n.disableVertexAttribArray(W),L[W]=0)}function w(D,L,W,B,X,k,U){U===!0?n.vertexAttribIPointer(D,L,W,X,k):n.vertexAttribPointer(D,L,W,B,X,k)}function S(D,L,W,B){b();const X=B.attributes,k=W.getAttributes(),U=L.defaultAttributeValues;for(const K in k){const ie=k[K];if(ie.location>=0){let pe=X[K];if(pe===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(pe=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(pe=D.instanceColor)),pe!==void 0){const he=pe.normalized,me=pe.itemSize,Pe=e.get(pe);if(Pe===void 0)continue;const ge=Pe.buffer,Be=Pe.type,re=Pe.bytesPerElement,$=Be===n.INT||Be===n.UNSIGNED_INT||pe.gpuType===Ho;if(pe.isInterleavedBufferAttribute){const Q=pe.data,Me=Q.stride,Le=pe.offset;if(Q.isInstancedInterleavedBuffer){for(let Ce=0;Ce<ie.locationSize;Ce++)g(ie.location+Ce,Q.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Ce=0;Ce<ie.locationSize;Ce++)m(ie.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Ce=0;Ce<ie.locationSize;Ce++)w(ie.location+Ce,me/ie.locationSize,Be,he,Me*re,(Le+me/ie.locationSize*Ce)*re,$)}else{if(pe.isInstancedBufferAttribute){for(let Q=0;Q<ie.locationSize;Q++)g(ie.location+Q,pe.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Q=0;Q<ie.locationSize;Q++)m(ie.location+Q);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Q=0;Q<ie.locationSize;Q++)w(ie.location+Q,me/ie.locationSize,Be,he,me*re,me/ie.locationSize*Q*re,$)}}else if(U!==void 0){const he=U[K];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(ie.location,he);break;case 3:n.vertexAttrib3fv(ie.location,he);break;case 4:n.vertexAttrib4fv(ie.location,he);break;default:n.vertexAttrib1fv(ie.location,he)}}}}y()}function T(){E();for(const D in i){const L=i[D];for(const W in L){const B=L[W];for(const X in B){const k=B[X];for(const U in k)u(k[U].object),delete k[U];delete B[X]}}delete i[D]}}function M(D){if(i[D.id]===void 0)return;const L=i[D.id];for(const W in L){const B=L[W];for(const X in B){const k=B[X];for(const U in k)u(k[U].object),delete k[U];delete B[X]}}delete i[D.id]}function R(D){for(const L in i){const W=i[L];for(const B in W){const X=W[B];if(X[D.id]===void 0)continue;const k=X[D.id];for(const U in k)u(k[U].object),delete k[U];delete X[D.id]}}}function v(D){for(const L in i){const W=i[L],B=D.isInstancedMesh===!0?D.id:0,X=W[B];if(X!==void 0){for(const k in X){const U=X[k];for(const K in U)u(U[K].object),delete U[K];delete X[k]}delete W[B],Object.keys(W).length===0&&delete i[L]}}}function E(){P(),o=!0,r!==s&&(r=s,d(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:E,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:m,disableUnusedAttributes:y}}function Nx(n,e,t){let i;function s(l){i=l}function r(l,d){n.drawArrays(i,l,d),t.update(d,i,1)}function o(l,d,u){u!==0&&(n.drawArraysInstanced(i,l,d,u),t.update(d,i,u))}function c(l,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,u);let h=0;for(let p=0;p<u;p++)h+=d[p];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=c}function Px(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==tn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===Rn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Wt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==dn&&!v)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const u=l(d);u!==d&&(Oe("WebGLRenderer:",d,"not supported, using",u,"instead."),d=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:d,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:S,maxSamples:T,samples:M}}function Lx(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Jn,c=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const x=f.clippingPlanes,b=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!s||x===null||x.length===0||r&&!m)r?u(null):d();else{const y=r?0:i,w=y*4;let S=g.clippingState||null;l.value=S,S=u(x,h,w,p);for(let T=0;T!==w;++T)S[T]=t[T];g.clippingState=S,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function d(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,x){const b=f!==null?f.length:0;let m=null;if(b!==0){if(m=l.value,x!==!0||m===null){const g=p+b*4,y=h.matrixWorldInverse;c.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let w=0,S=p;w!==b;++w,S+=4)o.copy(f[w]).applyMatrix4(y,c),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}const Gn=4,gl=[.125,.215,.35,.446,.526,.582],ni=20,Ix=256,Qi=new uu,xl=new Xe;let ha=null,fa=0,pa=0,ma=!1;const Dx=new J;class _l{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:c=Dx}=r;ha=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ha,fa,pa),this._renderer.xr.enabled=ma,e.scissorTest=!1,Ni(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ui||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ha=this._renderer.getRenderTarget(),fa=this._renderer.getActiveCubeFace(),pa=this._renderer.getActiveMipmapLevel(),ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:It,minFilter:It,generateMipmaps:!1,type:Rn,format:tn,colorSpace:dr,depthBuffer:!1},s=vl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ux(r)),this._blurMaterial=Ox(r,e,t),this._ggxMaterial=Fx(r,e,t)}return s}_compileMaterial(e){const t=new ut(new Ut,e);this._renderer.compile(t,Qi)}_sceneToCubeUV(e,t,i,s,r){const l=new zt(90,1,t,i),d=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(xl),f.toneMapping=hn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ut(new fi,new Hn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let g=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,g=!0):(m.color.copy(xl),g=!0);for(let w=0;w<6;w++){const S=w%3;S===0?(l.up.set(0,d[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[w],r.y,r.z)):S===1?(l.up.set(0,0,d[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[w],r.z)):(l.up.set(0,d[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[w]));const T=this._cubeSize;Ni(s,S*T,w>2?T:0,T,T),f.setRenderTarget(s),g&&f.render(b,l),f.render(e,l)}f.toneMapping=p,f.autoClear=h,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ui||e.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const c=r.uniforms;c.envMap.value=e;const l=this._cubeSize;Ni(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Qi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms,d=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(d*d-u*u),h=0+d*1.25,p=f*h,{_lodMax:x}=this,b=this._sizeLods[i],m=3*b*(i>x-Gn?i-x+Gn:0),g=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-t,Ni(r,m,g,3*b,2*b),s.setRenderTarget(r),s.render(c,Qi),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,Ni(e,m,g,3*b,2*b),s.setRenderTarget(e),s.render(c,Qi)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,c){const l=this._renderer,d=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=d;const h=d.uniforms,p=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ni-1),b=r/x,m=isFinite(r)?1+Math.floor(u*b):ni;m>ni&&Oe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const g=[];let y=0;for(let R=0;R<ni;++R){const v=R/b,E=Math.exp(-v*v/2);g.push(E),R===0?y+=E:R<m&&(y+=2*E)}for(let R=0;R<g.length;R++)g[R]=g[R]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=g,h.latitudinal.value=o==="latitudinal",c&&(h.poleAxis.value=c);const{_lodMax:w}=this;h.dTheta.value=x,h.mipInt.value=w-i;const S=this._sizeLods[s],T=3*S*(s>w-Gn?s-w+Gn:0),M=4*(this._cubeSize-S);Ni(t,T,M,3*S,2*S),l.setRenderTarget(t),l.render(f,Qi)}}function Ux(n){const e=[],t=[],i=[];let s=n;const r=n-Gn+1+gl.length;for(let o=0;o<r;o++){const c=Math.pow(2,s);e.push(c);let l=1/c;o>n-Gn?l=gl[o-n+Gn-1]:o===0&&(l=0),t.push(l);const d=1/(c-2),u=-d,f=1+d,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,x=6,b=3,m=2,g=1,y=new Float32Array(b*x*p),w=new Float32Array(m*x*p),S=new Float32Array(g*x*p);for(let M=0;M<p;M++){const R=M%3*2/3-1,v=M>2?0:-1,E=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];y.set(E,b*x*M),w.set(h,m*x*M);const P=[M,M,M,M,M,M];S.set(P,g*x*M)}const T=new Ut;T.setAttribute("position",new Bt(y,b)),T.setAttribute("uv",new Bt(w,m)),T.setAttribute("faceIndex",new Bt(S,g)),i.push(new ut(T,null)),s>Gn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function vl(n,e,t){const i=new fn(n,e,t);return i.texture.mapping=vr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ni(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Fx(n,e,t){return new gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ix,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sr(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Ox(n,e,t){const i=new Float32Array(ni),s=new J(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sr(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Ml(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sr(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function yl(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Sr(){return`

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
	`}class mu extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ru(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fi(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:Hi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Tn});r.uniforms.tEquirect.value=t;const o=new ut(s,r),c=t.minFilter;return t.minFilter===ri&&(t.minFilter=It),new Vm(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function Bx(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,p=!1){return h==null?null:p?o(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===Br||p===kr)if(e.has(h)){const x=e.get(h).texture;return c(x,h.mapping)}else{const x=h.image;if(x&&x.height>0){const b=new mu(x.height);return b.fromEquirectangularTexture(n,h),e.set(h,b),h.addEventListener("dispose",d),c(b.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const p=h.mapping,x=p===Br||p===kr,b=p===ui||p===zi;if(x||b){let m=t.get(h);const g=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new _l(n)),m=x?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const y=h.image;return x&&y&&y.height>0||b&&y&&l(y)?(i===null&&(i=new _l(n)),m=x?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function c(h,p){return p===Br?h.mapping=ui:p===kr&&(h.mapping=zi),h}function l(h){let p=0;const x=6;for(let b=0;b<x;b++)h[b]!==void 0&&p++;return p===x}function d(h){const p=h.target;p.removeEventListener("dispose",d);const x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function kx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Di("WebGLRenderer: "+i+" extension not supported."),s}}}function zx(n,e,t,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",o),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function d(f){const h=[],p=f.index,x=f.attributes.position;let b=0;if(x===void 0)return;if(p!==null){const y=p.array;b=p.version;for(let w=0,S=y.length;w<S;w+=3){const T=y[w+0],M=y[w+1],R=y[w+2];h.push(T,M,M,R,R,T)}}else{const y=x.array;b=x.version;for(let w=0,S=y.length/3-1;w<S;w+=3){const T=w+0,M=w+1,R=w+2;h.push(T,M,M,R,R,T)}}const m=new(x.count>=65535?iu:nu)(h,1);m.version=b;const g=r.get(f);g&&e.remove(g),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&d(f)}else d(f);return r.get(f)}return{get:c,update:l,getWireframeAttribute:u}}function Gx(n,e,t){let i;function s(f){i=f}let r,o;function c(f){r=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*o),t.update(h,i,1)}function d(f,h,p){p!==0&&(n.drawElementsInstanced(i,h,r,f*o,p),t.update(h,i,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,p);let b=0;for(let m=0;m<p;m++)b+=h[m];t.update(b,i,1)}this.setMode=s,this.setIndex=c,this.render=l,this.renderInstances=d,this.renderMultiDraw=u}function Hx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,c){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:et("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Vx(n,e,t){const i=new WeakMap,s=new ft;function r(o,c,l){const d=o.morphTargetInfluences,u=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(c);if(h===void 0||h.count!==f){let E=function(){R.dispose(),i.delete(c),c.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();const p=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,b=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],g=c.morphAttributes.normal||[],y=c.morphAttributes.color||[];let w=0;p===!0&&(w=1),x===!0&&(w=2),b===!0&&(w=3);let S=c.attributes.position.count*w,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const M=new Float32Array(S*T*4*f),R=new Jd(M,S,T,f);R.type=dn,R.needsUpdate=!0;const v=w*4;for(let P=0;P<f;P++){const D=m[P],L=g[P],W=y[P],B=S*T*4*P;for(let X=0;X<D.count;X++){const k=X*v;p===!0&&(s.fromBufferAttribute(D,X),M[B+k+0]=s.x,M[B+k+1]=s.y,M[B+k+2]=s.z,M[B+k+3]=0),x===!0&&(s.fromBufferAttribute(L,X),M[B+k+4]=s.x,M[B+k+5]=s.y,M[B+k+6]=s.z,M[B+k+7]=0),b===!0&&(s.fromBufferAttribute(W,X),M[B+k+8]=s.x,M[B+k+9]=s.y,M[B+k+10]=s.z,M[B+k+11]=W.itemSize===4?s.w:1)}}h={count:f,texture:R,size:new Ze(S,T)},i.set(c,h),c.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let b=0;b<d.length;b++)p+=d[b];const x=c.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",d)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function jx(n,e,t,i,s){let r=new WeakMap;function o(d){const u=s.render.frame,f=d.geometry,h=e.get(d,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),d.isInstancedMesh&&(d.hasEventListener("dispose",l)===!1&&d.addEventListener("dispose",l),r.get(d)!==u&&(t.update(d.instanceMatrix,n.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,n.ARRAY_BUFFER),r.set(d,u))),d.isSkinnedMesh){const p=d.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function c(){r=new WeakMap}function l(d){const u=d.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:c}}const Wx={[Fd]:"LINEAR_TONE_MAPPING",[Od]:"REINHARD_TONE_MAPPING",[Bd]:"CINEON_TONE_MAPPING",[kd]:"ACES_FILMIC_TONE_MAPPING",[Gd]:"AGX_TONE_MAPPING",[Hd]:"NEUTRAL_TONE_MAPPING",[zd]:"CUSTOM_TONE_MAPPING"};function $x(n,e,t,i,s,r){const o=new fn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Gi(e,t):void 0}),c=new fn(e,t,{type:Rn,depthBuffer:!1,stencilBuffer:!1}),l=new Ut;l.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Et([0,2,0,0,2,0],2));const d=new Bm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ut(l,d),f=new uu(-1,1,1,-1,0,1);let h=null,p=null,x=!1,b,m=null,g=[],y=!1;this.setSize=function(w,S){o.setSize(w,S),c.setSize(w,S);for(let T=0;T<g.length;T++){const M=g[T];M.setSize&&M.setSize(w,S)}},this.setEffects=function(w){g=w,y=g.length>0&&g[0].isRenderPass===!0;const S=o.width,T=o.height;for(let M=0;M<g.length;M++){const R=g[M];R.setSize&&R.setSize(S,T)}},this.begin=function(w,S){if(x||w.toneMapping===hn&&g.length===0)return!1;if(m=S,S!==null){const T=S.width,M=S.height;(o.width!==T||o.height!==M)&&this.setSize(T,M)}return y===!1&&w.setRenderTarget(o),b=w.toneMapping,w.toneMapping=hn,!0},this.hasRenderPass=function(){return y},this.end=function(w,S){w.toneMapping=b,x=!0;let T=o,M=c;for(let R=0;R<g.length;R++){const v=g[R];if(v.enabled!==!1&&(v.render(w,M,T,S),v.needsSwap!==!1)){const E=T;T=M,M=E}}if(h!==w.outputColorSpace||p!==w.toneMapping){h=w.outputColorSpace,p=w.toneMapping,d.defines={},Ye.getTransfer(h)===it&&(d.defines.SRGB_TRANSFER="");const R=Wx[p];R&&(d.defines[R]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(m),w.render(u,f),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),c.dispose(),l.dispose(),d.dispose()}}const gu=new Dt,Ro=new Gi(1,1),xu=new Jd,_u=new gm,vu=new ru,bl=[],Sl=[],wl=new Float32Array(16),El=new Float32Array(9),Tl=new Float32Array(4);function $i(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=bl[s];if(r===void 0&&(r=new Float32Array(s),bl[s]=r),e!==0){i.toArray(r,0);for(let o=1,c=0;o!==e;++o)c+=t,n[o].toArray(r,c)}return r}function bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function wr(n,e){let t=Sl[e];t===void 0&&(t=new Int32Array(e),Sl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Xx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function qx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Yx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Zx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(bt(t,i))return;Tl.set(i),n.uniformMatrix2fv(this.addr,!1,Tl),St(t,i)}}function Jx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(bt(t,i))return;El.set(i),n.uniformMatrix3fv(this.addr,!1,El),St(t,i)}}function Qx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(bt(t,i))return;wl.set(i),n.uniformMatrix4fv(this.addr,!1,wl),St(t,i)}}function e_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function t_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function n_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function s_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function r_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function a_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function o_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function c_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ro.compareFunction=t.isReversedDepthBuffer()?Yo:qo,r=Ro):r=gu,t.setTexture2D(e||r,s)}function l_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||_u,s)}function d_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||vu,s)}function u_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||xu,s)}function h_(n){switch(n){case 5126:return Xx;case 35664:return qx;case 35665:return Yx;case 35666:return Kx;case 35674:return Zx;case 35675:return Jx;case 35676:return Qx;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return s_;case 36294:return r_;case 36295:return a_;case 36296:return o_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return u_}}function f_(n,e){n.uniform1fv(this.addr,e)}function p_(n,e){const t=$i(e,this.size,2);n.uniform2fv(this.addr,t)}function m_(n,e){const t=$i(e,this.size,3);n.uniform3fv(this.addr,t)}function g_(n,e){const t=$i(e,this.size,4);n.uniform4fv(this.addr,t)}function x_(n,e){const t=$i(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function __(n,e){const t=$i(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function v_(n,e){const t=$i(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function M_(n,e){n.uniform1iv(this.addr,e)}function y_(n,e){n.uniform2iv(this.addr,e)}function b_(n,e){n.uniform3iv(this.addr,e)}function S_(n,e){n.uniform4iv(this.addr,e)}function w_(n,e){n.uniform1uiv(this.addr,e)}function E_(n,e){n.uniform2uiv(this.addr,e)}function T_(n,e){n.uniform3uiv(this.addr,e)}function A_(n,e){n.uniform4uiv(this.addr,e)}function C_(n,e,t){const i=this.cache,s=e.length,r=wr(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Ro:o=gu;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||o,r[c])}function R_(n,e,t){const i=this.cache,s=e.length,r=wr(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||_u,r[o])}function N_(n,e,t){const i=this.cache,s=e.length,r=wr(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||vu,r[o])}function P_(n,e,t){const i=this.cache,s=e.length,r=wr(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||xu,r[o])}function L_(n){switch(n){case 5126:return f_;case 35664:return p_;case 35665:return m_;case 35666:return g_;case 35674:return x_;case 35675:return __;case 35676:return v_;case 5124:case 35670:return M_;case 35667:case 35671:return y_;case 35668:case 35672:return b_;case 35669:case 35673:return S_;case 5125:return w_;case 36294:return E_;case 36295:return T_;case 36296:return A_;case 35678:case 36198:case 36298:case 36306:case 35682:return C_;case 35679:case 36299:case 36307:return R_;case 35680:case 36300:case 36308:case 36293:return N_;case 36289:case 36303:case 36311:case 36292:return P_}}class I_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=h_(t.type)}}class D_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=L_(t.type)}}class U_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const ga=/(\w+)(\])?(\[|\.)?/g;function Al(n,e){n.seq.push(e),n.map[e.id]=e}function F_(n,e,t){const i=n.name,s=i.length;for(ga.lastIndex=0;;){const r=ga.exec(i),o=ga.lastIndex;let c=r[1];const l=r[2]==="]",d=r[3];if(l&&(c=c|0),d===void 0||d==="["&&o+2===s){Al(t,d===void 0?new I_(c,n,e):new D_(c,n,e));break}else{let f=t.map[c];f===void 0&&(f=new U_(c),Al(t,f)),t=f}}}class sr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);F_(c,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const c=t[r],l=i[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const O_=37297;let B_=0;function k_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const c=o+1;i.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return i.join(`
`)}const Rl=new ke;function z_(n){Ye._getMatrix(Rl,Ye.workingColorSpace,n);const e=`mat3( ${Rl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case ur:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Nl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+k_(n.getShaderSource(e),c)}else return r}function G_(n,e){const t=z_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const H_={[Fd]:"Linear",[Od]:"Reinhard",[Bd]:"Cineon",[kd]:"ACESFilmic",[Gd]:"AgX",[Hd]:"Neutral",[zd]:"Custom"};function V_(n,e){const t=H_[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ws=new J;function j_(){Ye.getLuminanceCoefficients(Ws);const n=Ws.x.toFixed(4),e=Ws.y.toFixed(4),t=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(as).join(`
`)}function $_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function X_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:c}}return t}function as(n){return n!==""}function Pl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ll(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(n){return n.replace(q_,K_)}const Y_=new Map;function K_(n,e){let t=Ve[e];if(t===void 0){const i=Y_.get(e);if(i!==void 0)t=Ve[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return No(t)}const Z_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(n){return n.replace(Z_,J_)}function J_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Q_={[Qs]:"SHADOWMAP_TYPE_PCF",[rs]:"SHADOWMAP_TYPE_VSM"};function ev(n){return Q_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const tv={[ui]:"ENVMAP_TYPE_CUBE",[zi]:"ENVMAP_TYPE_CUBE",[vr]:"ENVMAP_TYPE_CUBE_UV"};function nv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":tv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const iv={[zi]:"ENVMAP_MODE_REFRACTION"};function sv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":iv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const rv={[Ud]:"ENVMAP_BLENDING_MULTIPLY",[Yp]:"ENVMAP_BLENDING_MIX",[Kp]:"ENVMAP_BLENDING_ADD"};function av(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":rv[n.combine]||"ENVMAP_BLENDING_NONE"}function ov(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function cv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=ev(t),d=nv(t),u=sv(t),f=av(t),h=ov(t),p=W_(t),x=$_(r),b=s.createProgram();let m,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(as).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(as).join(`
`),g.length>0&&(g+=`
`)):(m=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(as).join(`
`),g=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hn?"#define TONE_MAPPING":"",t.toneMapping!==hn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==hn?V_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,G_("linearToOutputTexel",t.outputColorSpace),j_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(as).join(`
`)),o=No(o),o=Pl(o,t),o=Ll(o,t),c=No(c),c=Pl(c,t),c=Ll(c,t),o=Il(o),c=Il(c),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const w=y+m+o,S=y+g+c,T=Cl(s,s.VERTEX_SHADER,w),M=Cl(s,s.FRAGMENT_SHADER,S);s.attachShader(b,T),s.attachShader(b,M),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function R(D){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(b)||"",W=s.getShaderInfoLog(T)||"",B=s.getShaderInfoLog(M)||"",X=L.trim(),k=W.trim(),U=B.trim();let K=!0,ie=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,b,T,M);else{const pe=Nl(s,T,"vertex"),he=Nl(s,M,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+X+`
`+pe+`
`+he)}else X!==""?Oe("WebGLProgram: Program Info Log:",X):(k===""||U==="")&&(ie=!1);ie&&(D.diagnostics={runnable:K,programLog:X,vertexShader:{log:k,prefix:m},fragmentShader:{log:U,prefix:g}})}s.deleteShader(T),s.deleteShader(M),v=new sr(s,b),E=X_(s,b)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(b,O_)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B_++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=T,this.fragmentShader=M,this}let lv=0;class dv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new uv(e),t.set(e,i)),i}}class uv{constructor(e){this.id=lv++,this.code=e,this.usedTimes=0}}function hv(n){return n===hi||n===cr||n===lr}function fv(n,e,t,i,s,r){const o=new Qd,c=new dv,l=new Set,d=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return l.add(v),v===0?"uv":`uv${v}`}function b(v,E,P,D,L,W){const B=D.fog,X=L.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,U=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||k,U),ie=K&&K.mapping===vr?K.image.height:null,pe=p[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const he=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,me=he!==void 0?he.length:0;let Pe=0;X.morphAttributes.position!==void 0&&(Pe=1),X.morphAttributes.normal!==void 0&&(Pe=2),X.morphAttributes.color!==void 0&&(Pe=3);let ge,Be,re,$;if(pe){const Re=ln[pe];ge=Re.vertexShader,Be=Re.fragmentShader}else{ge=v.vertexShader,Be=v.fragmentShader;const Re=c.getVertexShaderStage(v),gt=c.getFragmentShaderStage(v);c.update(v,Re,gt),re=Re.id,$=gt.id}const Q=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Le=L.isInstancedMesh===!0,Ce=L.isBatchedMesh===!0,qe=!!v.map,Ge=!!v.matcap,Je=!!K,$e=!!v.aoMap,je=!!v.lightMap,dt=!!v.bumpMap&&v.wireframe===!1,ht=!!v.normalMap,mt=!!v.displacementMap,_t=!!v.emissiveMap,ot=!!v.metalnessMap,Y=!!v.roughnessMap,N=v.anisotropy>0,ae=v.clearcoat>0,oe=v.dispersion>0,A=v.iridescence>0,_=v.sheen>0,I=v.transmission>0,F=N&&!!v.anisotropyMap,z=ae&&!!v.clearcoatMap,Z=ae&&!!v.clearcoatNormalMap,G=ae&&!!v.clearcoatRoughnessMap,O=A&&!!v.iridescenceMap,V=A&&!!v.iridescenceThicknessMap,se=_&&!!v.sheenColorMap,ue=_&&!!v.sheenRoughnessMap,le=!!v.specularMap,ce=!!v.specularColorMap,ve=!!v.specularIntensityMap,Se=I&&!!v.transmissionMap,De=I&&!!v.thicknessMap,j=!!v.gradientMap,_e=!!v.alphaMap,de=v.alphaTest>0,xe=!!v.alphaHash,Ee=!!v.extensions;let fe=hn;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(fe=n.toneMapping);const Ie={shaderID:pe,shaderType:v.type,shaderName:v.name,vertexShader:ge,fragmentShader:Be,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Ce,batchingColor:Ce&&L._colorsTexture!==null,instancing:Le,instancingColor:Le&&L.instanceColor!==null,instancingMorph:Le&&L.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:qe,matcap:Ge,envMap:Je,envMapMode:Je&&K.mapping,envMapCubeUVHeight:ie,aoMap:$e,lightMap:je,bumpMap:dt,normalMap:ht,displacementMap:mt,emissiveMap:_t,normalMapObjectSpace:ht&&v.normalMapType===Qp,normalMapTangentSpace:ht&&v.normalMapType===To,packedNormalMap:ht&&v.normalMapType===To&&hv(v.normalMap.format),metalnessMap:ot,roughnessMap:Y,anisotropy:N,anisotropyMap:F,clearcoat:ae,clearcoatMap:z,clearcoatNormalMap:Z,clearcoatRoughnessMap:G,dispersion:oe,iridescence:A,iridescenceMap:O,iridescenceThicknessMap:V,sheen:_,sheenColorMap:se,sheenRoughnessMap:ue,specularMap:le,specularColorMap:ce,specularIntensityMap:ve,transmission:I,transmissionMap:Se,thicknessMap:De,gradientMap:j,opaque:v.transparent===!1&&v.blending===Ii&&v.alphaToCoverage===!1,alphaMap:_e,alphaTest:de,alphaHash:xe,combine:v.combine,mapUv:qe&&x(v.map.channel),aoMapUv:$e&&x(v.aoMap.channel),lightMapUv:je&&x(v.lightMap.channel),bumpMapUv:dt&&x(v.bumpMap.channel),normalMapUv:ht&&x(v.normalMap.channel),displacementMapUv:mt&&x(v.displacementMap.channel),emissiveMapUv:_t&&x(v.emissiveMap.channel),metalnessMapUv:ot&&x(v.metalnessMap.channel),roughnessMapUv:Y&&x(v.roughnessMap.channel),anisotropyMapUv:F&&x(v.anisotropyMap.channel),clearcoatMapUv:z&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:Z&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:O&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:V&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:se&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:ue&&x(v.sheenRoughnessMap.channel),specularMapUv:le&&x(v.specularMap.channel),specularColorMapUv:ce&&x(v.specularColorMap.channel),specularIntensityMapUv:ve&&x(v.specularIntensityMap.channel),transmissionMapUv:Se&&x(v.transmissionMap.channel),thicknessMapUv:De&&x(v.thicknessMap.channel),alphaMapUv:_e&&x(v.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(ht||N),vertexNormals:!!X.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(qe||_e),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||X.attributes.normal===void 0&&ht===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Me,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Pe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:fe,decodeVideoTexture:qe&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===it,decodeVideoTextureEmissive:_t&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===it,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===bn,flipSided:v.side===Gt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ee&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&v.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function m(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)E.push(P),E.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(g(E,v),y(E,v),E.push(n.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function g(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function y(v,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function w(v){const E=p[v.type];let P;if(E){const D=ln[E];P=Um.clone(D.uniforms)}else P=v.uniforms;return P}function S(v,E){let P=u.get(E);return P!==void 0?++P.usedTimes:(P=new cv(n,E,v,s),d.push(P),u.set(E,P)),P}function T(v){if(--v.usedTimes===0){const E=d.indexOf(v);d[E]=d[d.length-1],d.pop(),u.delete(v.cacheKey),v.destroy()}}function M(v){c.remove(v)}function R(){c.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:w,acquireProgram:S,releaseProgram:T,releaseShaderCache:M,programs:d,dispose:R}}function pv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let c=n.get(o);return c===void 0&&(c={},n.set(o,c)),c}function i(o){n.delete(o)}function s(o,c,l){n.get(o)[c]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function mv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Ul(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Fl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function c(h,p,x,b,m,g){let y=n[e];return y===void 0?(y={id:h.id,object:h,geometry:p,material:x,materialVariant:o(h),groupOrder:b,renderOrder:h.renderOrder,z:m,group:g},n[e]=y):(y.id=h.id,y.object=h,y.geometry=p,y.material=x,y.materialVariant=o(h),y.groupOrder=b,y.renderOrder=h.renderOrder,y.z=m,y.group=g),e++,y}function l(h,p,x,b,m,g){const y=c(h,p,x,b,m,g);x.transmission>0?i.push(y):x.transparent===!0?s.push(y):t.push(y)}function d(h,p,x,b,m,g){const y=c(h,p,x,b,m,g);x.transmission>0?i.unshift(y):x.transparent===!0?s.unshift(y):t.unshift(y)}function u(h,p,x){t.length>1&&t.sort(h||mv),i.length>1&&i.sort(p||Ul),s.length>1&&s.sort(p||Ul),x&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let h=e,p=n.length;h<p;h++){const x=n[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:d,finish:f,sort:u}}function gv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Fl,n.set(i,[o])):s>=r.length?(o=new Fl,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function xv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new Xe};break;case"SpotLight":t={position:new J,direction:new J,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function _v(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let vv=0;function Mv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function yv(n){const e=new xv,t=_v(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new J);const s=new J,r=new pt,o=new pt;function c(d){let u=0,f=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,x=0,b=0,m=0,g=0,y=0,w=0,S=0,T=0,M=0,R=0;d.sort(Mv);for(let E=0,P=d.length;E<P;E++){const D=d[E],L=D.color,W=D.intensity,B=D.distance;let X=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===hi?X=D.shadow.map.texture:X=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=L.r*W,f+=L.g*W,h+=L.b*W;else if(D.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(D.sh.coefficients[k],W);R++}else if(D.isDirectionalLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const U=D.shadow,K=t.get(D);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,i.directionalShadow[p]=K,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=D.shadow.matrix,y++}i.directional[p]=k,p++}else if(D.isSpotLight){const k=e.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy(L).multiplyScalar(W),k.distance=B,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,i.spot[b]=k;const U=D.shadow;if(D.map&&(i.spotLightMap[T]=D.map,T++,U.updateMatrices(D),D.castShadow&&M++),i.spotLightMatrix[b]=U.matrix,D.castShadow){const K=t.get(D);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,i.spotShadow[b]=K,i.spotShadowMap[b]=X,S++}b++}else if(D.isRectAreaLight){const k=e.get(D);k.color.copy(L).multiplyScalar(W),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=k,m++}else if(D.isPointLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),k.distance=D.distance,k.decay=D.decay,D.castShadow){const U=D.shadow,K=t.get(D);K.shadowIntensity=U.intensity,K.shadowBias=U.bias,K.shadowNormalBias=U.normalBias,K.shadowRadius=U.radius,K.shadowMapSize=U.mapSize,K.shadowCameraNear=U.camera.near,K.shadowCameraFar=U.camera.far,i.pointShadow[x]=K,i.pointShadowMap[x]=X,i.pointShadowMatrix[x]=D.shadow.matrix,w++}i.point[x]=k,x++}else if(D.isHemisphereLight){const k=e.get(D);k.skyColor.copy(D.color).multiplyScalar(W),k.groundColor.copy(D.groundColor).multiplyScalar(W),i.hemi[g]=k,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==p||v.pointLength!==x||v.spotLength!==b||v.rectAreaLength!==m||v.hemiLength!==g||v.numDirectionalShadows!==y||v.numPointShadows!==w||v.numSpotShadows!==S||v.numSpotMaps!==T||v.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=m,i.point.length=x,i.hemi.length=g,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+T-M,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=R,v.directionalLength=p,v.pointLength=x,v.spotLength=b,v.rectAreaLength=m,v.hemiLength=g,v.numDirectionalShadows=y,v.numPointShadows=w,v.numSpotShadows=S,v.numSpotMaps=T,v.numLightProbes=R,i.version=vv++)}function l(d,u){let f=0,h=0,p=0,x=0,b=0;const m=u.matrixWorldInverse;for(let g=0,y=d.length;g<y;g++){const w=d[g];if(w.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(w.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const S=i.rectArea[x];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(w.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){const S=i.hemi[b];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),b++}}}return{setup:c,setupView:l,state:i}}function Ol(n){const e=new yv(n),t=[],i=[],s=[];function r(h){f.camera=h,t.length=0,i.length=0,s.length=0}function o(h){t.push(h)}function c(h){i.push(h)}function l(h){s.push(h)}function d(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:d,setupLightsView:u,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function bv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let c;return o===void 0?(c=new Ol(n),e.set(s,[c])):r>=o.length?(c=new Ol(n),o.push(c)):c=o[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const Sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wv=`uniform sampler2D shadow_pass;
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
}`,Ev=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],Tv=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Bl=new pt,es=new J,xa=new J;function Av(n,e,t){let i=new Zo;const s=new Ze,r=new Ze,o=new ft,c=new km,l=new zm,d={},u=t.maxTextureSize,f={[Vn]:Gt,[Gt]:Vn,[bn]:bn},h=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:Sv,fragmentShader:wv}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const x=new Ut;x.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new ut(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qs;let g=this.type;this.render=function(M,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===Np&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qs);const E=n.getRenderTarget(),P=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Tn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const W=g!==this.type;W&&R.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(X=>X.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,X=M.length;B<X;B++){const k=M[B],U=k.shadow;if(U===void 0){Oe("WebGLShadowMap:",k,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const K=U.getFrameExtents();s.multiply(K),r.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/K.x),s.x=r.x*K.x,U.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/K.y),s.y=r.y*K.y,U.mapSize.y=r.y));const ie=n.state.buffers.depth.getReversed();if(U.camera._reversedDepth=ie,U.map===null||W===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===rs){if(k.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new fn(s.x,s.y,{format:hi,type:Rn,minFilter:It,magFilter:It,generateMipmaps:!1}),U.map.texture.name=k.name+".shadowMap",U.map.depthTexture=new Gi(s.x,s.y,dn),U.map.depthTexture.name=k.name+".shadowMapDepth",U.map.depthTexture.format=Nn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ct,U.map.depthTexture.magFilter=Ct}else k.isPointLight?(U.map=new mu(s.x),U.map.depthTexture=new Im(s.x,mn)):(U.map=new fn(s.x,s.y),U.map.depthTexture=new Gi(s.x,s.y,mn)),U.map.depthTexture.name=k.name+".shadowMap",U.map.depthTexture.format=Nn,this.type===Qs?(U.map.depthTexture.compareFunction=ie?Yo:qo,U.map.depthTexture.minFilter=It,U.map.depthTexture.magFilter=It):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ct,U.map.depthTexture.magFilter=Ct);U.camera.updateProjectionMatrix()}const pe=U.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<pe;he++){if(U.map.isWebGLCubeRenderTarget)n.setRenderTarget(U.map,he),n.clear();else{he===0&&(n.setRenderTarget(U.map),n.clear());const me=U.getViewport(he);o.set(r.x*me.x,r.y*me.y,r.x*me.z,r.y*me.w),L.viewport(o)}if(k.isPointLight){const me=U.camera,Pe=U.matrix,ge=k.distance||me.far;ge!==me.far&&(me.far=ge,me.updateProjectionMatrix()),es.setFromMatrixPosition(k.matrixWorld),me.position.copy(es),xa.copy(me.position),xa.add(Ev[he]),me.up.copy(Tv[he]),me.lookAt(xa),me.updateMatrixWorld(),Pe.makeTranslation(-es.x,-es.y,-es.z),Bl.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Bl,me.coordinateSystem,me.reversedDepth)}else U.updateMatrices(k);i=U.getFrustum(),S(R,v,U.camera,k,this.type)}U.isPointLightShadow!==!0&&this.type===rs&&y(U,v),U.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(E,P,D)};function y(M,R){const v=e.update(b);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new fn(s.x,s.y,{format:hi,type:Rn})),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(R,null,v,h,b,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(R,null,v,p,b,null)}function w(M,R,v,E){let P=null;const D=v.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)P=D;else if(P=v.isPointLight===!0?l:c,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const L=P.uuid,W=R.uuid;let B=d[L];B===void 0&&(B={},d[L]=B);let X=B[W];X===void 0&&(X=P.clone(),B[W]=X,R.addEventListener("dispose",T)),P=X}if(P.visible=R.visible,P.wireframe=R.wireframe,E===rs?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:f[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=n.properties.get(P);L.light=v}return P}function S(M,R,v,E,P){if(M.visible===!1)return;if(M.layers.test(R.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===rs)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,M.matrixWorld);const W=e.update(M),B=M.material;if(Array.isArray(B)){const X=W.groups;for(let k=0,U=X.length;k<U;k++){const K=X[k],ie=B[K.materialIndex];if(ie&&ie.visible){const pe=w(M,ie,E,P);M.onBeforeShadow(n,M,R,v,W,pe,K),n.renderBufferDirect(v,null,W,pe,M,K),M.onAfterShadow(n,M,R,v,W,pe,K)}}}else if(B.visible){const X=w(M,B,E,P);M.onBeforeShadow(n,M,R,v,W,X,null),n.renderBufferDirect(v,null,W,X,M,null),M.onAfterShadow(n,M,R,v,W,X,null)}}const L=M.children;for(let W=0,B=L.length;W<B;W++)S(L[W],R,v,E,P)}function T(M){M.target.removeEventListener("dispose",T);for(const v in d){const E=d[v],P=M.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function Cv(n,e){function t(){let j=!1;const _e=new ft;let de=null;const xe=new ft(0,0,0,0);return{setMask:function(Ee){de!==Ee&&!j&&(n.colorMask(Ee,Ee,Ee,Ee),de=Ee)},setLocked:function(Ee){j=Ee},setClear:function(Ee,fe,Ie,Re,gt){gt===!0&&(Ee*=Re,fe*=Re,Ie*=Re),_e.set(Ee,fe,Ie,Re),xe.equals(_e)===!1&&(n.clearColor(Ee,fe,Ie,Re),xe.copy(_e))},reset:function(){j=!1,de=null,xe.set(-1,0,0,0)}}}function i(){let j=!1,_e=!1,de=null,xe=null,Ee=null;return{setReversed:function(fe){if(_e!==fe){const Ie=e.get("EXT_clip_control");fe?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),_e=fe;const Re=Ee;Ee=null,this.setClear(Re)}},getReversed:function(){return _e},setTest:function(fe){fe?Q(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(fe){de!==fe&&!j&&(n.depthMask(fe),de=fe)},setFunc:function(fe){if(_e&&(fe=lm[fe]),xe!==fe){switch(fe){case za:n.depthFunc(n.NEVER);break;case Ga:n.depthFunc(n.ALWAYS);break;case Ha:n.depthFunc(n.LESS);break;case ki:n.depthFunc(n.LEQUAL);break;case Va:n.depthFunc(n.EQUAL);break;case ja:n.depthFunc(n.GEQUAL);break;case Wa:n.depthFunc(n.GREATER);break;case $a:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=fe}},setLocked:function(fe){j=fe},setClear:function(fe){Ee!==fe&&(Ee=fe,_e&&(fe=1-fe),n.clearDepth(fe))},reset:function(){j=!1,de=null,xe=null,Ee=null,_e=!1}}}function s(){let j=!1,_e=null,de=null,xe=null,Ee=null,fe=null,Ie=null,Re=null,gt=null;return{setTest:function(ct){j||(ct?Q(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(ct){_e!==ct&&!j&&(n.stencilMask(ct),_e=ct)},setFunc:function(ct,nn,sn){(de!==ct||xe!==nn||Ee!==sn)&&(n.stencilFunc(ct,nn,sn),de=ct,xe=nn,Ee=sn)},setOp:function(ct,nn,sn){(fe!==ct||Ie!==nn||Re!==sn)&&(n.stencilOp(ct,nn,sn),fe=ct,Ie=nn,Re=sn)},setLocked:function(ct){j=ct},setClear:function(ct){gt!==ct&&(n.clearStencil(ct),gt=ct)},reset:function(){j=!1,_e=null,de=null,xe=null,Ee=null,fe=null,Ie=null,Re=null,gt=null}}}const r=new t,o=new i,c=new s,l=new WeakMap,d=new WeakMap;let u={},f={},h={},p=new WeakMap,x=[],b=null,m=!1,g=null,y=null,w=null,S=null,T=null,M=null,R=null,v=new Xe(0,0,0),E=0,P=!1,D=null,L=null,W=null,B=null,X=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,K=0;const ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ie)[1]),U=K>=1):ie.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),U=K>=2);let pe=null,he={};const me=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),ge=new ft().fromArray(me),Be=new ft().fromArray(Pe);function re(j,_e,de,xe){const Ee=new Uint8Array(4),fe=n.createTexture();n.bindTexture(j,fe),n.texParameteri(j,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(j,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<de;Ie++)j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(_e+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return fe}const $={};$[n.TEXTURE_2D]=re(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Q(n.DEPTH_TEST),o.setFunc(ki),dt(!1),ht(kc),Q(n.CULL_FACE),$e(Tn);function Q(j){u[j]!==!0&&(n.enable(j),u[j]=!0)}function Me(j){u[j]!==!1&&(n.disable(j),u[j]=!1)}function Le(j,_e){return h[j]!==_e?(n.bindFramebuffer(j,_e),h[j]=_e,j===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=_e),j===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ce(j,_e){let de=x,xe=!1;if(j){de=p.get(_e),de===void 0&&(de=[],p.set(_e,de));const Ee=j.textures;if(de.length!==Ee.length||de[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,Ie=Ee.length;fe<Ie;fe++)de[fe]=n.COLOR_ATTACHMENT0+fe;de.length=Ee.length,xe=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,xe=!0);xe&&n.drawBuffers(de)}function qe(j){return b!==j?(n.useProgram(j),b=j,!0):!1}const Ge={[ti]:n.FUNC_ADD,[Lp]:n.FUNC_SUBTRACT,[Ip]:n.FUNC_REVERSE_SUBTRACT};Ge[Dp]=n.MIN,Ge[Up]=n.MAX;const Je={[Fp]:n.ZERO,[Op]:n.ONE,[Bp]:n.SRC_COLOR,[Ba]:n.SRC_ALPHA,[jp]:n.SRC_ALPHA_SATURATE,[Hp]:n.DST_COLOR,[zp]:n.DST_ALPHA,[kp]:n.ONE_MINUS_SRC_COLOR,[ka]:n.ONE_MINUS_SRC_ALPHA,[Vp]:n.ONE_MINUS_DST_COLOR,[Gp]:n.ONE_MINUS_DST_ALPHA,[Wp]:n.CONSTANT_COLOR,[$p]:n.ONE_MINUS_CONSTANT_COLOR,[Xp]:n.CONSTANT_ALPHA,[qp]:n.ONE_MINUS_CONSTANT_ALPHA};function $e(j,_e,de,xe,Ee,fe,Ie,Re,gt,ct){if(j===Tn){m===!0&&(Me(n.BLEND),m=!1);return}if(m===!1&&(Q(n.BLEND),m=!0),j!==Pp){if(j!==g||ct!==P){if((y!==ti||T!==ti)&&(n.blendEquation(n.FUNC_ADD),y=ti,T=ti),ct)switch(j){case Ii:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case di:n.blendFunc(n.ONE,n.ONE);break;case zc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",j);break}else switch(j){case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case di:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case zc:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gc:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",j);break}w=null,S=null,M=null,R=null,v.set(0,0,0),E=0,g=j,P=ct}return}Ee=Ee||_e,fe=fe||de,Ie=Ie||xe,(_e!==y||Ee!==T)&&(n.blendEquationSeparate(Ge[_e],Ge[Ee]),y=_e,T=Ee),(de!==w||xe!==S||fe!==M||Ie!==R)&&(n.blendFuncSeparate(Je[de],Je[xe],Je[fe],Je[Ie]),w=de,S=xe,M=fe,R=Ie),(Re.equals(v)===!1||gt!==E)&&(n.blendColor(Re.r,Re.g,Re.b,gt),v.copy(Re),E=gt),g=j,P=!1}function je(j,_e){j.side===bn?Me(n.CULL_FACE):Q(n.CULL_FACE);let de=j.side===Gt;_e&&(de=!de),dt(de),j.blending===Ii&&j.transparent===!1?$e(Tn):$e(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),o.setFunc(j.depthFunc),o.setTest(j.depthTest),o.setMask(j.depthWrite),r.setMask(j.colorWrite);const xe=j.stencilWrite;c.setTest(xe),xe&&(c.setMask(j.stencilWriteMask),c.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),c.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),_t(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(j){D!==j&&(j?n.frontFace(n.CW):n.frontFace(n.CCW),D=j)}function ht(j){j!==Cp?(Q(n.CULL_FACE),j!==L&&(j===kc?n.cullFace(n.BACK):j===Rp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),L=j}function mt(j){j!==W&&(U&&n.lineWidth(j),W=j)}function _t(j,_e,de){j?(Q(n.POLYGON_OFFSET_FILL),(B!==_e||X!==de)&&(B=_e,X=de,o.getReversed()&&(_e=-_e),n.polygonOffset(_e,de))):Me(n.POLYGON_OFFSET_FILL)}function ot(j){j?Q(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function Y(j){j===void 0&&(j=n.TEXTURE0+k-1),pe!==j&&(n.activeTexture(j),pe=j)}function N(j,_e,de){de===void 0&&(pe===null?de=n.TEXTURE0+k-1:de=pe);let xe=he[de];xe===void 0&&(xe={type:void 0,texture:void 0},he[de]=xe),(xe.type!==j||xe.texture!==_e)&&(pe!==de&&(n.activeTexture(de),pe=de),n.bindTexture(j,_e||$[j]),xe.type=j,xe.texture=_e)}function ae(){const j=he[pe];j!==void 0&&j.type!==void 0&&(n.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function oe(){try{n.compressedTexImage2D(...arguments)}catch(j){et("WebGLState:",j)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(j){et("WebGLState:",j)}}function _(){try{n.texSubImage2D(...arguments)}catch(j){et("WebGLState:",j)}}function I(){try{n.texSubImage3D(...arguments)}catch(j){et("WebGLState:",j)}}function F(){try{n.compressedTexSubImage2D(...arguments)}catch(j){et("WebGLState:",j)}}function z(){try{n.compressedTexSubImage3D(...arguments)}catch(j){et("WebGLState:",j)}}function Z(){try{n.texStorage2D(...arguments)}catch(j){et("WebGLState:",j)}}function G(){try{n.texStorage3D(...arguments)}catch(j){et("WebGLState:",j)}}function O(){try{n.texImage2D(...arguments)}catch(j){et("WebGLState:",j)}}function V(){try{n.texImage3D(...arguments)}catch(j){et("WebGLState:",j)}}function se(j){return f[j]!==void 0?f[j]:n.getParameter(j)}function ue(j,_e){f[j]!==_e&&(n.pixelStorei(j,_e),f[j]=_e)}function le(j){ge.equals(j)===!1&&(n.scissor(j.x,j.y,j.z,j.w),ge.copy(j))}function ce(j){Be.equals(j)===!1&&(n.viewport(j.x,j.y,j.z,j.w),Be.copy(j))}function ve(j,_e){let de=d.get(_e);de===void 0&&(de=new WeakMap,d.set(_e,de));let xe=de.get(j);xe===void 0&&(xe=n.getUniformBlockIndex(_e,j.name),de.set(j,xe))}function Se(j,_e){const xe=d.get(_e).get(j);l.get(_e)!==xe&&(n.uniformBlockBinding(_e,xe,j.__bindingPointIndex),l.set(_e,xe))}function De(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},pe=null,he={},h={},p=new WeakMap,x=[],b=null,m=!1,g=null,y=null,w=null,S=null,T=null,M=null,R=null,v=new Xe(0,0,0),E=0,P=!1,D=null,L=null,W=null,B=null,X=null,ge.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:Q,disable:Me,bindFramebuffer:Le,drawBuffers:Ce,useProgram:qe,setBlending:$e,setMaterial:je,setFlipSided:dt,setCullFace:ht,setLineWidth:mt,setPolygonOffset:_t,setScissorTest:ot,activeTexture:Y,bindTexture:N,unbindTexture:ae,compressedTexImage2D:oe,compressedTexImage3D:A,texImage2D:O,texImage3D:V,pixelStorei:ue,getParameter:se,updateUBOMapping:ve,uniformBlockBinding:Se,texStorage2D:Z,texStorage3D:G,texSubImage2D:_,texSubImage3D:I,compressedTexSubImage2D:F,compressedTexSubImage3D:z,scissor:le,viewport:ce,reset:De}}function Rv(n,e,t,i,s,r,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Ze,u=new WeakMap,f=new Set;let h;const p=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(A,_){return x?new OffscreenCanvas(A,_):hr("canvas")}function m(A,_,I){let F=1;const z=oe(A);if((z.width>I||z.height>I)&&(F=I/Math.max(z.width,z.height)),F<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(F*z.width),G=Math.floor(F*z.height);h===void 0&&(h=b(Z,G));const O=_?b(Z,G):h;return O.width=Z,O.height=G,O.getContext("2d").drawImage(A,0,0,Z,G),Oe("WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+Z+"x"+G+")."),O}else return"data"in A&&Oe("WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),A;return A}function g(A){return A.generateMipmaps}function y(A){n.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,_,I,F,z,Z=!1){if(A!==null){if(n[A]!==void 0)return n[A];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let G;F&&(G=e.get("EXT_texture_norm16"),G||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let O=_;if(_===n.RED&&(I===n.FLOAT&&(O=n.R32F),I===n.HALF_FLOAT&&(O=n.R16F),I===n.UNSIGNED_BYTE&&(O=n.R8),I===n.UNSIGNED_SHORT&&G&&(O=G.R16_EXT),I===n.SHORT&&G&&(O=G.R16_SNORM_EXT)),_===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(O=n.R8UI),I===n.UNSIGNED_SHORT&&(O=n.R16UI),I===n.UNSIGNED_INT&&(O=n.R32UI),I===n.BYTE&&(O=n.R8I),I===n.SHORT&&(O=n.R16I),I===n.INT&&(O=n.R32I)),_===n.RG&&(I===n.FLOAT&&(O=n.RG32F),I===n.HALF_FLOAT&&(O=n.RG16F),I===n.UNSIGNED_BYTE&&(O=n.RG8),I===n.UNSIGNED_SHORT&&G&&(O=G.RG16_EXT),I===n.SHORT&&G&&(O=G.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(I===n.UNSIGNED_BYTE&&(O=n.RG8UI),I===n.UNSIGNED_SHORT&&(O=n.RG16UI),I===n.UNSIGNED_INT&&(O=n.RG32UI),I===n.BYTE&&(O=n.RG8I),I===n.SHORT&&(O=n.RG16I),I===n.INT&&(O=n.RG32I)),_===n.RGB_INTEGER&&(I===n.UNSIGNED_BYTE&&(O=n.RGB8UI),I===n.UNSIGNED_SHORT&&(O=n.RGB16UI),I===n.UNSIGNED_INT&&(O=n.RGB32UI),I===n.BYTE&&(O=n.RGB8I),I===n.SHORT&&(O=n.RGB16I),I===n.INT&&(O=n.RGB32I)),_===n.RGBA_INTEGER&&(I===n.UNSIGNED_BYTE&&(O=n.RGBA8UI),I===n.UNSIGNED_SHORT&&(O=n.RGBA16UI),I===n.UNSIGNED_INT&&(O=n.RGBA32UI),I===n.BYTE&&(O=n.RGBA8I),I===n.SHORT&&(O=n.RGBA16I),I===n.INT&&(O=n.RGBA32I)),_===n.RGB&&(I===n.UNSIGNED_SHORT&&G&&(O=G.RGB16_EXT),I===n.SHORT&&G&&(O=G.RGB16_SNORM_EXT),I===n.UNSIGNED_INT_5_9_9_9_REV&&(O=n.RGB9_E5),I===n.UNSIGNED_INT_10F_11F_11F_REV&&(O=n.R11F_G11F_B10F)),_===n.RGBA){const V=Z?ur:Ye.getTransfer(z);I===n.FLOAT&&(O=n.RGBA32F),I===n.HALF_FLOAT&&(O=n.RGBA16F),I===n.UNSIGNED_BYTE&&(O=V===it?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT&&G&&(O=G.RGBA16_EXT),I===n.SHORT&&G&&(O=G.RGBA16_SNORM_EXT),I===n.UNSIGNED_SHORT_4_4_4_4&&(O=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(O=n.RGB5_A1)}return(O===n.R16F||O===n.R32F||O===n.RG16F||O===n.RG32F||O===n.RGBA16F||O===n.RGBA32F)&&e.get("EXT_color_buffer_float"),O}function T(A,_){let I;return A?_===null||_===mn||_===ds?I=n.DEPTH24_STENCIL8:_===dn?I=n.DEPTH32F_STENCIL8:_===ls&&(I=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===mn||_===ds?I=n.DEPTH_COMPONENT24:_===dn?I=n.DEPTH_COMPONENT32F:_===ls&&(I=n.DEPTH_COMPONENT16),I}function M(A,_){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ct&&A.minFilter!==It?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function R(A){const _=A.target;_.removeEventListener("dispose",R),E(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function v(A){const _=A.target;_.removeEventListener("dispose",v),D(_)}function E(A){const _=i.get(A);if(_.__webglInit===void 0)return;const I=A.source,F=p.get(I);if(F){const z=F[_.__cacheKey];z.usedTimes--,z.usedTimes===0&&P(A),Object.keys(F).length===0&&p.delete(I)}i.remove(A)}function P(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const I=A.source,F=p.get(I);delete F[_.__cacheKey],o.memory.textures--}function D(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(_.__webglFramebuffer[F]))for(let z=0;z<_.__webglFramebuffer[F].length;z++)n.deleteFramebuffer(_.__webglFramebuffer[F][z]);else n.deleteFramebuffer(_.__webglFramebuffer[F]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[F])}else{if(Array.isArray(_.__webglFramebuffer))for(let F=0;F<_.__webglFramebuffer.length;F++)n.deleteFramebuffer(_.__webglFramebuffer[F]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let F=0;F<_.__webglColorRenderbuffer.length;F++)_.__webglColorRenderbuffer[F]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[F]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=A.textures;for(let F=0,z=I.length;F<z;F++){const Z=i.get(I[F]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(I[F])}i.remove(A)}let L=0;function W(){L=0}function B(){return L}function X(A){L=A}function k(){const A=L;return A>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),L+=1,A}function U(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function K(A,_){const I=i.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&I.__version!==A.version){const F=A.image;if(F===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(I,A,_);return}}else A.isExternalTexture&&(I.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+_)}function ie(A,_){const I=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version){Me(I,A,_);return}else A.isExternalTexture&&(I.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+_)}function pe(A,_){const I=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version){Me(I,A,_);return}t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+_)}function he(A,_){const I=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&I.__version!==A.version){Le(I,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+_)}const me={[Xa]:n.REPEAT,[Sn]:n.CLAMP_TO_EDGE,[qa]:n.MIRRORED_REPEAT},Pe={[Ct]:n.NEAREST,[Zp]:n.NEAREST_MIPMAP_NEAREST,[bs]:n.NEAREST_MIPMAP_LINEAR,[It]:n.LINEAR,[zr]:n.LINEAR_MIPMAP_NEAREST,[ri]:n.LINEAR_MIPMAP_LINEAR},ge={[em]:n.NEVER,[rm]:n.ALWAYS,[tm]:n.LESS,[qo]:n.LEQUAL,[nm]:n.EQUAL,[Yo]:n.GEQUAL,[im]:n.GREATER,[sm]:n.NOTEQUAL};function Be(A,_){if(_.type===dn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===It||_.magFilter===zr||_.magFilter===bs||_.magFilter===ri||_.minFilter===It||_.minFilter===zr||_.minFilter===bs||_.minFilter===ri)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,me[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,me[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,me[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,Pe[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,Pe[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==bs&&_.minFilter!==ri||_.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function re(A,_){let I=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",R));const F=_.source;let z=p.get(F);z===void 0&&(z={},p.set(F,z));const Z=U(_);if(Z!==A.__cacheKey){z[Z]===void 0&&(z[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),z[Z].usedTimes++;const G=z[A.__cacheKey];G!==void 0&&(z[A.__cacheKey].usedTimes--,G.usedTimes===0&&P(_)),A.__cacheKey=Z,A.__webglTexture=z[Z].texture}return I}function $(A,_,I){return Math.floor(Math.floor(A/I)/_)}function Q(A,_,I,F){const Z=A.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,I,F,_.data);else{Z.sort((ue,le)=>ue.start-le.start);let G=0;for(let ue=1;ue<Z.length;ue++){const le=Z[G],ce=Z[ue],ve=le.start+le.count,Se=$(ce.start,_.width,4),De=$(le.start,_.width,4);ce.start<=ve+1&&Se===De&&$(ce.start+ce.count-1,_.width,4)===Se?le.count=Math.max(le.count,ce.start+ce.count-le.start):(++G,Z[G]=ce)}Z.length=G+1;const O=t.getParameter(n.UNPACK_ROW_LENGTH),V=t.getParameter(n.UNPACK_SKIP_PIXELS),se=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ue=0,le=Z.length;ue<le;ue++){const ce=Z[ue],ve=Math.floor(ce.start/4),Se=Math.ceil(ce.count/4),De=ve%_.width,j=Math.floor(ve/_.width),_e=Se,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,De),t.pixelStorei(n.UNPACK_SKIP_ROWS,j),t.texSubImage2D(n.TEXTURE_2D,0,De,j,_e,de,I,F,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,O),t.pixelStorei(n.UNPACK_SKIP_PIXELS,V),t.pixelStorei(n.UNPACK_SKIP_ROWS,se)}}function Me(A,_,I){let F=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(F=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(F=n.TEXTURE_3D);const z=re(A,_),Z=_.source;t.bindTexture(F,A.__webglTexture,n.TEXTURE0+I);const G=i.get(Z);if(Z.version!==G.__version||z===!0){if(t.activeTexture(n.TEXTURE0+I),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const de=Ye.getPrimaries(Ye.workingColorSpace),xe=_.colorSpace===zn?null:Ye.getPrimaries(_.colorSpace),Ee=_.colorSpace===zn||de===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let V=m(_.image,!1,s.maxTextureSize);V=ae(_,V);const se=r.convert(_.format,_.colorSpace),ue=r.convert(_.type);let le=S(_.internalFormat,se,ue,_.normalized,_.colorSpace,_.isVideoTexture);Be(F,_);let ce;const ve=_.mipmaps,Se=_.isVideoTexture!==!0,De=G.__version===void 0||z===!0,j=Z.dataReady,_e=M(_,V);if(_.isDepthTexture)le=T(_.format===ai,_.type),De&&(Se?t.texStorage2D(n.TEXTURE_2D,1,le,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,le,V.width,V.height,0,se,ue,null));else if(_.isDataTexture)if(ve.length>0){Se&&De&&t.texStorage2D(n.TEXTURE_2D,_e,le,ve[0].width,ve[0].height);for(let de=0,xe=ve.length;de<xe;de++)ce=ve[de],Se?j&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,se,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,se,ue,ce.data);_.generateMipmaps=!1}else Se?(De&&t.texStorage2D(n.TEXTURE_2D,_e,le,V.width,V.height),j&&Q(_,V,se,ue)):t.texImage2D(n.TEXTURE_2D,0,le,V.width,V.height,0,se,ue,V.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Se&&De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,le,ve[0].width,ve[0].height,V.depth);for(let de=0,xe=ve.length;de<xe;de++)if(ce=ve[de],_.format!==tn)if(se!==null)if(Se){if(j)if(_.layerUpdates.size>0){const Ee=ml(ce.width,ce.height,_.format,_.type);for(const fe of _.layerUpdates){const Ie=ce.data.subarray(fe*Ee/ce.data.BYTES_PER_ELEMENT,(fe+1)*Ee/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,fe,ce.width,ce.height,1,se,Ie)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,V.depth,se,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,V.depth,0,ce.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?j&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,ce.width,ce.height,V.depth,se,ue,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,le,ce.width,ce.height,V.depth,0,se,ue,ce.data)}else{Se&&De&&t.texStorage2D(n.TEXTURE_2D,_e,le,ve[0].width,ve[0].height);for(let de=0,xe=ve.length;de<xe;de++)ce=ve[de],_.format!==tn?se!==null?Se?j&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,se,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?j&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,ce.width,ce.height,se,ue,ce.data):t.texImage2D(n.TEXTURE_2D,de,le,ce.width,ce.height,0,se,ue,ce.data)}else if(_.isDataArrayTexture)if(Se){if(De&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,le,V.width,V.height,V.depth),j)if(_.layerUpdates.size>0){const de=ml(V.width,V.height,_.format,_.type);for(const xe of _.layerUpdates){const Ee=V.data.subarray(xe*de/V.data.BYTES_PER_ELEMENT,(xe+1)*de/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,V.width,V.height,1,se,ue,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,se,ue,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,V.width,V.height,V.depth,0,se,ue,V.data);else if(_.isData3DTexture)Se?(De&&t.texStorage3D(n.TEXTURE_3D,_e,le,V.width,V.height,V.depth),j&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,se,ue,V.data)):t.texImage3D(n.TEXTURE_3D,0,le,V.width,V.height,V.depth,0,se,ue,V.data);else if(_.isFramebufferTexture){if(De)if(Se)t.texStorage2D(n.TEXTURE_2D,_e,le,V.width,V.height);else{let de=V.width,xe=V.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,le,de,xe,0,se,ue,null),de>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),V.parentNode!==de){de.appendChild(V),f.add(_),de.onpaint=xe=>{const Ee=xe.changedElements;for(const fe of f)Ee.includes(fe.image)&&(fe.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,V);else{const Ee=n.RGBA,fe=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,fe,Ie,V)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Se&&De){const de=oe(ve[0]);t.texStorage2D(n.TEXTURE_2D,_e,le,de.width,de.height)}for(let de=0,xe=ve.length;de<xe;de++)ce=ve[de],Se?j&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,se,ue,ce):t.texImage2D(n.TEXTURE_2D,de,le,se,ue,ce);_.generateMipmaps=!1}else if(Se){if(De){const de=oe(V);t.texStorage2D(n.TEXTURE_2D,_e,le,de.width,de.height)}j&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se,ue,V)}else t.texImage2D(n.TEXTURE_2D,0,le,se,ue,V);g(_)&&y(F),G.__version=Z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Le(A,_,I){if(_.image.length!==6)return;const F=re(A,_),z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+I);const Z=i.get(z);if(z.version!==Z.__version||F===!0){t.activeTexture(n.TEXTURE0+I);const G=Ye.getPrimaries(Ye.workingColorSpace),O=_.colorSpace===zn?null:Ye.getPrimaries(_.colorSpace),V=_.colorSpace===zn||G===O?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const se=_.isCompressedTexture||_.image[0].isCompressedTexture,ue=_.image[0]&&_.image[0].isDataTexture,le=[];for(let fe=0;fe<6;fe++)!se&&!ue?le[fe]=m(_.image[fe],!0,s.maxCubemapSize):le[fe]=ue?_.image[fe].image:_.image[fe],le[fe]=ae(_,le[fe]);const ce=le[0],ve=r.convert(_.format,_.colorSpace),Se=r.convert(_.type),De=S(_.internalFormat,ve,Se,_.normalized,_.colorSpace),j=_.isVideoTexture!==!0,_e=Z.__version===void 0||F===!0,de=z.dataReady;let xe=M(_,ce);Be(n.TEXTURE_CUBE_MAP,_);let Ee;if(se){j&&_e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,De,ce.width,ce.height);for(let fe=0;fe<6;fe++){Ee=le[fe].mipmaps;for(let Ie=0;Ie<Ee.length;Ie++){const Re=Ee[Ie];_.format!==tn?ve!==null?j?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,0,0,Re.width,Re.height,ve,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,De,Re.width,Re.height,0,Re.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,0,0,Re.width,Re.height,ve,Se,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie,De,Re.width,Re.height,0,ve,Se,Re.data)}}}else{if(Ee=_.mipmaps,j&&_e){Ee.length>0&&xe++;const fe=oe(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,De,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ue){j?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,le[fe].width,le[fe].height,ve,Se,le[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,De,le[fe].width,le[fe].height,0,ve,Se,le[fe].data);for(let Ie=0;Ie<Ee.length;Ie++){const gt=Ee[Ie].image[fe].image;j?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,0,0,gt.width,gt.height,ve,Se,gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,De,gt.width,gt.height,0,ve,Se,gt.data)}}else{j?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,ve,Se,le[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,De,ve,Se,le[fe]);for(let Ie=0;Ie<Ee.length;Ie++){const Re=Ee[Ie];j?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,0,0,ve,Se,Re.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ie+1,De,ve,Se,Re.image[fe])}}}g(_)&&y(n.TEXTURE_CUBE_MAP),Z.__version=z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Ce(A,_,I,F,z,Z){const G=r.convert(I.format,I.colorSpace),O=r.convert(I.type),V=S(I.internalFormat,G,O,I.normalized,I.colorSpace),se=i.get(_),ue=i.get(I);if(ue.__renderTarget=_,!se.__hasExternalTextures){const le=Math.max(1,_.width>>Z),ce=Math.max(1,_.height>>Z);z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?t.texImage3D(z,Z,V,le,ce,_.depth,0,G,O,null):t.texImage2D(z,Z,V,le,ce,0,G,O,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Y(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,z,ue.__webglTexture,0,ot(_)):(z===n.TEXTURE_2D||z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,F,z,ue.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(A,_,I){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const F=_.depthTexture,z=F&&F.isDepthTexture?F.type:null,Z=T(_.stencilBuffer,z),G=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Y(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),Z,_.width,_.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,A)}else{const F=_.textures;for(let z=0;z<F.length;z++){const Z=F[z],G=r.convert(Z.format,Z.colorSpace),O=r.convert(Z.type),V=S(Z.internalFormat,G,O,Z.normalized,Z.colorSpace);Y(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),V,_.width,_.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),V,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,V,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ge(A,_,I){const F=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const z=i.get(_.depthTexture);if(z.__renderTarget=_,(!z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),F){if(z.__webglInit===void 0&&(z.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),z.__webglTexture===void 0){z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Be(n.TEXTURE_CUBE_MAP,_.depthTexture);const se=r.convert(_.depthTexture.format),ue=r.convert(_.depthTexture.type);let le;_.depthTexture.format===Nn?le=n.DEPTH_COMPONENT24:_.depthTexture.format===ai&&(le=n.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,le,_.width,_.height,0,se,ue,null)}}else K(_.depthTexture,0);const Z=z.__webglTexture,G=ot(_),O=F?n.TEXTURE_CUBE_MAP_POSITIVE_X+I:n.TEXTURE_2D,V=_.depthTexture.format===ai?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Nn)Y(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,O,Z,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,V,O,Z,0);else if(_.depthTexture.format===ai)Y(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,O,Z,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,V,O,Z,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(A){const _=i.get(A),I=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const F=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),F){const z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,F.removeEventListener("dispose",z)};F.addEventListener("dispose",z),_.__depthDisposeCallback=z}_.__boundDepthTexture=F}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let F=0;F<6;F++)Ge(_.__webglFramebuffer[F],A,F);else{const F=A.texture.mipmaps;F&&F.length>0?Ge(_.__webglFramebuffer[0],A,0):Ge(_.__webglFramebuffer,A,0)}else if(I){_.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[F]),_.__webglDepthbuffer[F]===void 0)_.__webglDepthbuffer[F]=n.createRenderbuffer(),qe(_.__webglDepthbuffer[F],A,!1);else{const z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer[F];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,Z)}}else{const F=A.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),qe(_.__webglDepthbuffer,A,!1);else{const z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(A,_,I){const F=i.get(A);_!==void 0&&Ce(F.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&Je(A)}function je(A){const _=A.texture,I=i.get(A),F=i.get(_);A.addEventListener("dispose",v);const z=A.textures,Z=A.isWebGLCubeRenderTarget===!0,G=z.length>1;if(G||(F.__webglTexture===void 0&&(F.__webglTexture=n.createTexture()),F.__version=_.version,o.memory.textures++),Z){I.__webglFramebuffer=[];for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[O]=[];for(let V=0;V<_.mipmaps.length;V++)I.__webglFramebuffer[O][V]=n.createFramebuffer()}else I.__webglFramebuffer[O]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let O=0;O<_.mipmaps.length;O++)I.__webglFramebuffer[O]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(G)for(let O=0,V=z.length;O<V;O++){const se=i.get(z[O]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Y(A)===!1){I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let O=0;O<z.length;O++){const V=z[O];I.__webglColorRenderbuffer[O]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[O]);const se=r.convert(V.format,V.colorSpace),ue=r.convert(V.type),le=S(V.internalFormat,se,ue,V.normalized,V.colorSpace,A.isXRRenderTarget===!0),ce=ot(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,le,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+O,n.RENDERBUFFER,I.__webglColorRenderbuffer[O])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),qe(I.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture),Be(n.TEXTURE_CUBE_MAP,_);for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ce(I.__webglFramebuffer[O][V],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+O,V);else Ce(I.__webglFramebuffer[O],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+O,0);g(_)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let O=0,V=z.length;O<V;O++){const se=z[O],ue=i.get(se);let le=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(le=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ue.__webglTexture),Be(le,se),Ce(I.__webglFramebuffer,A,se,n.COLOR_ATTACHMENT0+O,le,0),g(se)&&y(le)}t.unbindTexture()}else{let O=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(O=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(O,F.__webglTexture),Be(O,_),_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ce(I.__webglFramebuffer[V],A,_,n.COLOR_ATTACHMENT0,O,V);else Ce(I.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,O,0);g(_)&&y(O),t.unbindTexture()}A.depthBuffer&&Je(A)}function dt(A){const _=A.textures;for(let I=0,F=_.length;I<F;I++){const z=_[I];if(g(z)){const Z=w(A),G=i.get(z).__webglTexture;t.bindTexture(Z,G),y(Z),t.unbindTexture()}}}const ht=[],mt=[];function _t(A){if(A.samples>0){if(Y(A)===!1){const _=A.textures,I=A.width,F=A.height;let z=n.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=i.get(A),O=_.length>1;if(O)for(let se=0;se<_.length;se++)t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);const V=A.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let se=0;se<_.length;se++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(z|=n.STENCIL_BUFFER_BIT)),O){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,G.__webglColorRenderbuffer[se]);const ue=i.get(_[se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,I,F,0,0,I,F,z,n.NEAREST),l===!0&&(ht.length=0,mt.length=0,ht.push(n.COLOR_ATTACHMENT0+se),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ht.push(Z),mt.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,mt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),O)for(let se=0;se<_.length;se++){t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,G.__webglColorRenderbuffer[se]);const ue=i.get(_[se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ot(A){return Math.min(s.maxSamples,A.samples)}function Y(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(A){const _=o.render.frame;u.get(A)!==_&&(u.set(A,_),A.update())}function ae(A,_){const I=A.colorSpace,F=A.format,z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||I!==dr&&I!==zn&&(Ye.getTransfer(I)===it?(F!==tn||z!==Wt)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",I)),_}function oe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(d.width=A.naturalWidth||A.width,d.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(d.width=A.displayWidth,d.height=A.displayHeight):(d.width=A.width,d.height=A.height),d}this.allocateTextureUnit=k,this.resetTextureUnits=W,this.getTextureUnits=B,this.setTextureUnits=X,this.setTexture2D=K,this.setTexture2DArray=ie,this.setTexture3D=pe,this.setTextureCube=he,this.rebindTextures=$e,this.setupRenderTarget=je,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Y,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Nv(n,e){function t(i,s=zn){let r;const o=Ye.getTransfer(s);if(i===Wt)return n.UNSIGNED_BYTE;if(i===Vo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===jo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$d)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jd)return n.BYTE;if(i===Wd)return n.SHORT;if(i===ls)return n.UNSIGNED_SHORT;if(i===Ho)return n.INT;if(i===mn)return n.UNSIGNED_INT;if(i===dn)return n.FLOAT;if(i===Rn)return n.HALF_FLOAT;if(i===qd)return n.ALPHA;if(i===Yd)return n.RGB;if(i===tn)return n.RGBA;if(i===Nn)return n.DEPTH_COMPONENT;if(i===ai)return n.DEPTH_STENCIL;if(i===Kd)return n.RED;if(i===Wo)return n.RED_INTEGER;if(i===hi)return n.RG;if(i===$o)return n.RG_INTEGER;if(i===Xo)return n.RGBA_INTEGER;if(i===er||i===tr||i===nr||i===ir)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ya||i===Ka||i===Za||i===Ja)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qa||i===eo||i===to||i===no||i===io||i===cr||i===so)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Qa||i===eo)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===to)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===no)return r.COMPRESSED_R11_EAC;if(i===io)return r.COMPRESSED_SIGNED_R11_EAC;if(i===cr)return r.COMPRESSED_RG11_EAC;if(i===so)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ro||i===ao||i===oo||i===co||i===lo||i===uo||i===ho||i===fo||i===po||i===mo||i===go||i===xo||i===_o||i===vo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ro)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ao)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===oo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===co)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===uo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ho)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===po)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===go)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_o)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Mo||i===yo||i===bo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Mo)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===So||i===wo||i===lr||i===Eo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===So)return r.COMPRESSED_RED_RGTC1_EXT;if(i===wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Eo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ds?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lv=`
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

}`;class Iv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ou(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new gn({vertexShader:Pv,fragmentShader:Lv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new Wi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dv extends pi{constructor(e,t){super();const i=this;let s=null,r=1,o=null,c="local-floor",l=1,d=null,u=null,f=null,h=null,p=null,x=null;const b=typeof XRWebGLBinding<"u",m=new Iv,g={},y=t.getContextAttributes();let w=null,S=null;const T=[],M=[],R=new Ze;let v=null;const E=new zt;E.viewport=new ft;const P=new zt;P.viewport=new ft;const D=[E,P],L=new jm;let W=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let $=T[re];return $===void 0&&($=new qr,T[re]=$),$.getTargetRaySpace()},this.getControllerGrip=function(re){let $=T[re];return $===void 0&&($=new qr,T[re]=$),$.getGripSpace()},this.getHand=function(re){let $=T[re];return $===void 0&&($=new qr,T[re]=$),$.getHandSpace()};function X(re){const $=M.indexOf(re.inputSource);if($===-1)return;const Q=T[$];Q!==void 0&&(Q.update(re.inputSource,re.frame,d||o),Q.dispatchEvent({type:re.type,data:re.inputSource}))}function k(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",U);for(let re=0;re<T.length;re++){const $=M[re];$!==null&&(M[re]=null,T[re].disconnect($))}W=null,B=null,m.reset();for(const re in g)delete g[re];e.setRenderTarget(w),p=null,h=null,f=null,s=null,S=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){c=re,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||o},this.setReferenceSpace=function(re){d=re},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",k),s.addEventListener("inputsourceschange",U),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let Q=null,Me=null,Le=null;y.depth&&(Le=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=y.stencil?ai:Nn,Me=y.stencil?ds:mn);const Ce={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ce),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new fn(h.textureWidth,h.textureHeight,{format:tn,type:Wt,depthTexture:new Gi(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Q={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new fn(p.framebufferWidth,p.framebufferHeight,{format:tn,type:Wt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),d=null,o=await s.requestReferenceSpace(c),Be.setContext(s),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(re){for(let $=0;$<re.removed.length;$++){const Q=re.removed[$],Me=M.indexOf(Q);Me>=0&&(M[Me]=null,T[Me].disconnect(Q))}for(let $=0;$<re.added.length;$++){const Q=re.added[$];let Me=M.indexOf(Q);if(Me===-1){for(let Ce=0;Ce<T.length;Ce++)if(Ce>=M.length){M.push(Q),Me=Ce;break}else if(M[Ce]===null){M[Ce]=Q,Me=Ce;break}if(Me===-1)break}const Le=T[Me];Le&&Le.connect(Q)}}const K=new J,ie=new J;function pe(re,$,Q){K.setFromMatrixPosition($.matrixWorld),ie.setFromMatrixPosition(Q.matrixWorld);const Me=K.distanceTo(ie),Le=$.projectionMatrix.elements,Ce=Q.projectionMatrix.elements,qe=Le[14]/(Le[10]-1),Ge=Le[14]/(Le[10]+1),Je=(Le[9]+1)/Le[5],$e=(Le[9]-1)/Le[5],je=(Le[8]-1)/Le[0],dt=(Ce[8]+1)/Ce[0],ht=qe*je,mt=qe*dt,_t=Me/(-je+dt),ot=_t*-je;if($.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(ot),re.translateZ(_t),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Le[10]===-1)re.projectionMatrix.copy($.projectionMatrix),re.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Y=qe+_t,N=Ge+_t,ae=ht-ot,oe=mt+(Me-ot),A=Je*Ge/N*Y,_=$e*Ge/N*Y;re.projectionMatrix.makePerspective(ae,oe,A,_,Y,N),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function he(re,$){$===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices($.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let $=re.near,Q=re.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(Q=m.depthFar)),L.near=P.near=E.near=$,L.far=P.far=E.far=Q,(W!==L.near||B!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),W=L.near,B=L.far),L.layers.mask=re.layers.mask|6,E.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const Me=re.parent,Le=L.cameras;he(L,Me);for(let Ce=0;Ce<Le.length;Ce++)he(Le[Ce],Me);Le.length===2?pe(L,E,P):L.projectionMatrix.copy(E.projectionMatrix),me(re,L,Me)};function me(re,$,Q){Q===null?re.matrix.copy($.matrixWorld):(re.matrix.copy(Q.matrixWorld),re.matrix.invert(),re.matrix.multiply($.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy($.projectionMatrix),re.projectionMatrixInverse.copy($.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Ao*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(re){l=re,h!==null&&(h.fixedFoveation=re),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(re){return g[re]};let Pe=null;function ge(re,$){if(u=$.getViewerPose(d||o),x=$,u!==null){const Q=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Me=!1;Q.length!==L.cameras.length&&(L.cameras.length=0,Me=!0);for(let Ge=0;Ge<Q.length;Ge++){const Je=Q[Ge];let $e=null;if(p!==null)$e=p.getViewport(Je);else{const dt=f.getViewSubImage(h,Je);$e=dt.viewport,Ge===0&&(e.setRenderTargetTextures(S,dt.colorTexture,dt.depthStencilTexture),e.setRenderTarget(S))}let je=D[Ge];je===void 0&&(je=new zt,je.layers.enable(Ge),je.viewport=new ft,D[Ge]=je),je.matrix.fromArray(Je.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(Je.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set($e.x,$e.y,$e.width,$e.height),Ge===0&&(L.matrix.copy(je.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Me===!0&&L.cameras.push(je)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){f=i.getBinding();const Ge=f.getDepthInformation(Q[0]);Ge&&Ge.isValid&&Ge.texture&&m.init(Ge,s.renderState)}if(Le&&Le.includes("camera-access")&&b){e.state.unbindTexture(),f=i.getBinding();for(let Ge=0;Ge<Q.length;Ge++){const Je=Q[Ge].camera;if(Je){let $e=g[Je];$e||($e=new ou,g[Je]=$e);const je=f.getCameraImage(Je);$e.sourceTexture=je}}}}for(let Q=0;Q<T.length;Q++){const Me=M[Q],Le=T[Q];Me!==null&&Le!==void 0&&Le.update(Me,$,d||o)}Pe&&Pe(re,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),x=null}const Be=new fu;Be.setAnimationLoop(ge),this.setAnimationLoop=function(re){Pe=re},this.dispose=function(){}}}const Uv=new pt,Mu=new ke;Mu.set(-1,0,0,0,1,0,0,0,1);function Fv(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,cu(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,y,w,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),f(m,g)):g.isMeshPhongMaterial?(r(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),h(m,g),g.isMeshPhysicalMaterial&&p(m,g,S)):g.isMeshMatcapMaterial?(r(m,g),x(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),b(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&c(m,g)):g.isPointsMaterial?l(m,g,y,w):g.isSpriteMaterial?d(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Gt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Gt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const y=e.get(g),w=y.envMap,S=y.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(Uv.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Mu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function c(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,w){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=w*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function d(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function h(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function p(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Gt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,g){g.matcap&&(m.matcap.value=g.matcap)}function b(m,g){const y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ov(n,e,t,i){let s={},r={},o=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const M=T.program;i.uniformBlockBinding(S,M)}function d(S,T){let M=s[S.id];M===void 0&&(m(S),M=u(S),s[S.id]=M,S.addEventListener("dispose",y));const R=T.program;i.updateUBOMapping(S,R);const v=e.render.frame;r[S.id]!==v&&(h(S),r[S.id]=v)}function u(S){const T=f();S.__bindingPointIndex=T;const M=n.createBuffer(),R=S.__size,v=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,M),M}function f(){for(let S=0;S<c;S++)if(o.indexOf(S)===-1)return o.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const T=s[S.id],M=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let v=0,E=M.length;v<E;v++){const P=M[v];if(Array.isArray(P))for(let D=0,L=P.length;D<L;D++)p(P[D],v,D,R);else p(P,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,T,M,R){if(b(S,T,M,R)===!0){const v=S.__offset,E=S.value;if(Array.isArray(E)){let P=0;for(let D=0;D<E.length;D++){const L=E[D],W=g(L);x(L,S.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,S.__data)}}function x(S,T,M){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,M)}function b(S,T,M,R){const v=S.value,E=T+"_"+M;if(R[E]===void 0)return typeof v=="number"||typeof v=="boolean"?R[E]=v:ArrayBuffer.isView(v)?R[E]=v.slice():R[E]=v.clone(),!0;{const P=R[E];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(S){const T=S.uniforms;let M=0;const R=16;for(let E=0,P=T.length;E<P;E++){const D=Array.isArray(T[E])?T[E]:[T[E]];for(let L=0,W=D.length;L<W;L++){const B=D[L],X=Array.isArray(B.value)?B.value:[B.value];for(let k=0,U=X.length;k<U;k++){const K=X[k],ie=g(K),pe=M%R,he=pe%ie.boundary,me=pe+he;M+=he,me!==0&&R-me<ie.storage&&(M+=R-me),B.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=M,M+=ie.storage}}}const v=M%R;return v>0&&(M+=R-v),S.__size=M,S.__cache={},this}function g(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",S),T}function y(S){const T=S.target;T.removeEventListener("dispose",y);const M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:d,dispose:w}}const Bv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let on=null;function kv(){return on===null&&(on=new Rm(Bv,16,16,hi,Rn),on.name="DFG_LUT",on.minFilter=It,on.magFilter=It,on.wrapS=Sn,on.wrapT=Sn,on.generateMipmaps=!1,on.needsUpdate=!0),on}class yu{constructor(e={}){const{canvas:t=om(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Wt}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;const b=p,m=new Set([Xo,$o,Wo]),g=new Set([Wt,mn,ls,ds,Vo,jo]),y=new Uint32Array(4),w=new Int32Array(4),S=new J;let T=null,M=null;const R=[],v=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,L=null,W=null,B=null,X=null;this._outputColorSpace=qt;let k=0,U=0,K=null,ie=-1,pe=null;const he=new ft,me=new ft;let Pe=null;const ge=new Xe(0);let Be=0,re=t.width,$=t.height,Q=1,Me=null,Le=null;const Ce=new ft(0,0,re,$),qe=new ft(0,0,re,$);let Ge=!1;const Je=new Zo;let $e=!1,je=!1;const dt=new pt,ht=new J,mt=new ft,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function Y(){return K===null?Q:1}let N=i;function ae(C,q){return t.getContext(C,q)}try{const C={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Go}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",nn,!1),N===null){const q="webgl2";if(N=ae(q,C),N===null)throw ae(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw et("WebGLRenderer: "+C.message),C}let oe,A,_,I,F,z,Z,G,O,V,se,ue,le,ce,ve,Se,De,j,_e,de,xe,Ee,fe;function Ie(){oe=new kx(N),oe.init(),xe=new Nv(N,oe),A=new Px(N,oe,e,xe),_=new Cv(N,oe),A.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),W=N.createFramebuffer(),B=N.createFramebuffer(),X=N.createFramebuffer(),I=new Hx(N),F=new pv,z=new Rv(N,oe,_,F,A,xe,I),Z=new Bx(P),G=new $m(N),Ee=new Rx(N,G),O=new zx(N,G,I,Ee),V=new jx(N,O,G,Ee,I),j=new Vx(N,A,z),ve=new Lx(F),se=new fv(P,Z,oe,A,Ee,ve),ue=new Fv(P,F),le=new gv,ce=new bv(oe),De=new Cx(P,Z,_,V,x,l),Se=new Av(P,V,A),fe=new Ov(N,I,A,_),_e=new Nx(N,oe,I),de=new Gx(N,oe,I),I.programs=se.programs,P.capabilities=A,P.extensions=oe,P.properties=F,P.renderLists=le,P.shadowMap=Se,P.state=_,P.info=I}Ie(),b!==Wt&&(E=new $x(b,t.width,t.height,c,s,r));const Re=new Dv(P,N);this.xr=Re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const C=oe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=oe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(C){C!==void 0&&(Q=C,this.setSize(re,$,!1))},this.getSize=function(C){return C.set(re,$)},this.setSize=function(C,q,ne=!0){if(Re.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}re=C,$=q,t.width=Math.floor(C*Q),t.height=Math.floor(q*Q),ne===!0&&(t.style.width=C+"px",t.style.height=q+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,C,q)},this.getDrawingBufferSize=function(C){return C.set(re*Q,$*Q).floor()},this.setDrawingBufferSize=function(C,q,ne){re=C,$=q,Q=ne,t.width=Math.floor(C*ne),t.height=Math.floor(q*ne),this.setViewport(0,0,C,q)},this.setEffects=function(C){if(b===Wt){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let q=0;q<C.length;q++)if(C[q].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(he)},this.getViewport=function(C){return C.copy(Ce)},this.setViewport=function(C,q,ne,ee){C.isVector4?Ce.set(C.x,C.y,C.z,C.w):Ce.set(C,q,ne,ee),_.viewport(he.copy(Ce).multiplyScalar(Q).round())},this.getScissor=function(C){return C.copy(qe)},this.setScissor=function(C,q,ne,ee){C.isVector4?qe.set(C.x,C.y,C.z,C.w):qe.set(C,q,ne,ee),_.scissor(me.copy(qe).multiplyScalar(Q).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(C){_.setScissorTest(Ge=C)},this.setOpaqueSort=function(C){Me=C},this.setTransparentSort=function(C){Le=C},this.getClearColor=function(C){return C.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(C=!0,q=!0,ne=!0){let ee=0;if(C){let te=!1;if(K!==null){const we=K.texture.format;te=m.has(we)}if(te){const we=K.texture.type,Ae=g.has(we),be=De.getClearColor(),Ne=De.getClearAlpha(),Ue=be.r,ze=be.g,We=be.b;Ae?(y[0]=Ue,y[1]=ze,y[2]=We,y[3]=Ne,N.clearBufferuiv(N.COLOR,0,y)):(w[0]=Ue,w[1]=ze,w[2]=We,w[3]=Ne,N.clearBufferiv(N.COLOR,0,w))}else ee|=N.COLOR_BUFFER_BIT}q&&(ee|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(ee|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&N.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),L=C},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",nn,!1),De.dispose(),le.dispose(),ce.dispose(),F.dispose(),Z.dispose(),V.dispose(),Ee.dispose(),fe.dispose(),se.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",hc),Re.removeEventListener("sessionend",fc),$n.stop()};function gt(C){C.preventDefault(),$c("WebGLRenderer: Context Lost."),D=!0}function ct(){$c("WebGLRenderer: Context Restored."),D=!1;const C=I.autoReset,q=Se.enabled,ne=Se.autoUpdate,ee=Se.needsUpdate,te=Se.type;Ie(),I.autoReset=C,Se.enabled=q,Se.autoUpdate=ne,Se.needsUpdate=ee,Se.type=te}function nn(C){et("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function sn(C){const q=C.target;q.removeEventListener("dispose",sn),Gu(q)}function Gu(C){Hu(C),F.remove(C)}function Hu(C){const q=F.get(C).programs;q!==void 0&&(q.forEach(function(ne){se.releaseProgram(ne)}),C.isShaderMaterial&&se.releaseShaderCache(C))}this.renderBufferDirect=function(C,q,ne,ee,te,we){q===null&&(q=_t);const Ae=te.isMesh&&te.matrixWorld.determinantAffine()<0,be=Wu(C,q,ne,ee,te);_.setMaterial(ee,Ae);let Ne=ne.index,Ue=1;if(ee.wireframe===!0){if(Ne=O.getWireframeAttribute(ne),Ne===void 0)return;Ue=2}const ze=ne.drawRange,We=ne.attributes.position;let Fe=ze.start*Ue,st=(ze.start+ze.count)*Ue;we!==null&&(Fe=Math.max(Fe,we.start*Ue),st=Math.min(st,(we.start+we.count)*Ue)),Ne!==null?(Fe=Math.max(Fe,0),st=Math.min(st,Ne.count)):We!=null&&(Fe=Math.max(Fe,0),st=Math.min(st,We.count));const vt=st-Fe;if(vt<0||vt===1/0)return;Ee.setup(te,ee,be,ne,Ne);let xt,rt=_e;if(Ne!==null&&(xt=G.get(Ne),rt=de,rt.setIndex(xt)),te.isMesh)ee.wireframe===!0?(_.setLineWidth(ee.wireframeLinewidth*Y()),rt.setMode(N.LINES)):rt.setMode(N.TRIANGLES);else if(te.isLine){let Rt=ee.linewidth;Rt===void 0&&(Rt=1),_.setLineWidth(Rt*Y()),te.isLineSegments?rt.setMode(N.LINES):te.isLineLoop?rt.setMode(N.LINE_LOOP):rt.setMode(N.LINE_STRIP)}else te.isPoints?rt.setMode(N.POINTS):te.isSprite&&rt.setMode(N.TRIANGLES);if(te.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))rt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const Rt=te._multiDrawStarts,Te=te._multiDrawCounts,Ht=te._multiDrawCount,Qe=Ne?G.get(Ne).bytesPerElement:1,$t=F.get(ee).currentProgram.getUniforms();for(let rn=0;rn<Ht;rn++)$t.setValue(N,"_gl_DrawID",rn),rt.render(Rt[rn]/Qe,Te[rn])}else if(te.isInstancedMesh)rt.renderInstances(Fe,vt,te.count);else if(ne.isInstancedBufferGeometry){const Rt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Te=Math.min(ne.instanceCount,Rt);rt.renderInstances(Fe,vt,Te)}else rt.render(Fe,vt)};function uc(C,q,ne){C.transparent===!0&&C.side===bn&&C.forceSinglePass===!1?(C.side=Gt,C.needsUpdate=!0,xs(C,q,ne),C.side=Vn,C.needsUpdate=!0,xs(C,q,ne),C.side=bn):xs(C,q,ne)}this.compile=function(C,q,ne=null){ne===null&&(ne=C),M=ce.get(ne),M.init(q),v.push(M),ne.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(M.pushLight(te),te.castShadow&&M.pushShadow(te))}),C!==ne&&C.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(M.pushLight(te),te.castShadow&&M.pushShadow(te))}),M.setupLights();const ee=new Set;return C.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const we=te.material;if(we)if(Array.isArray(we))for(let Ae=0;Ae<we.length;Ae++){const be=we[Ae];uc(be,ne,te),ee.add(be)}else uc(we,ne,te),ee.add(we)}),M=v.pop(),ee},this.compileAsync=function(C,q,ne=null){const ee=this.compile(C,q,ne);return new Promise(te=>{function we(){if(ee.forEach(function(Ae){F.get(Ae).currentProgram.isReady()&&ee.delete(Ae)}),ee.size===0){te(C);return}setTimeout(we,10)}oe.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Er=null;function Vu(C){Er&&Er(C)}function hc(){$n.stop()}function fc(){$n.start()}const $n=new fu;$n.setAnimationLoop(Vu),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(C){Er=C,Re.setAnimationLoop(C),C===null?$n.stop():$n.start()},Re.addEventListener("sessionstart",hc),Re.addEventListener("sessionend",fc),this.render=function(C,q){if(q!==void 0&&q.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;L!==null&&L.renderStart(C,q);const ne=Re.enabled===!0&&Re.isPresenting===!0,ee=E!==null&&(K===null||ne)&&E.begin(P,K);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(q),q=Re.getCamera()),C.isScene===!0&&C.onBeforeRender(P,C,q,K),M=ce.get(C,v.length),M.init(q),M.state.textureUnits=z.getTextureUnits(),v.push(M),dt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Je.setFromProjectionMatrix(dt,un,q.reversedDepth),je=this.localClippingEnabled,$e=ve.init(this.clippingPlanes,je),T=le.get(C,R.length),T.init(),R.push(T),Re.enabled===!0&&Re.isPresenting===!0){const Ae=P.xr.getDepthSensingMesh();Ae!==null&&Tr(Ae,q,-1/0,P.sortObjects)}Tr(C,q,0,P.sortObjects),T.finish(),P.sortObjects===!0&&T.sort(Me,Le,q.reversedDepth),ot=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,ot&&De.addToRenderList(T,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&ve.beginShadows();const te=M.state.shadowsArray;if(Se.render(te,C,q),$e===!0&&ve.endShadows(),(ee&&E.hasRenderPass())===!1){const Ae=T.opaque,be=T.transmissive;if(M.setupLights(),q.isArrayCamera){const Ne=q.cameras;if(be.length>0)for(let Ue=0,ze=Ne.length;Ue<ze;Ue++){const We=Ne[Ue];mc(Ae,be,C,We)}ot&&De.render(C);for(let Ue=0,ze=Ne.length;Ue<ze;Ue++){const We=Ne[Ue];pc(T,C,We,We.viewport)}}else be.length>0&&mc(Ae,be,C,q),ot&&De.render(C),pc(T,C,q)}K!==null&&U===0&&(z.updateMultisampleRenderTarget(K),z.updateRenderTargetMipmap(K)),ee&&E.end(P),C.isScene===!0&&C.onAfterRender(P,C,q),Ee.resetDefaultState(),ie=-1,pe=null,v.pop(),v.length>0?(M=v[v.length-1],z.setTextureUnits(M.state.textureUnits),$e===!0&&ve.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,L!==null&&L.renderEnd()};function Tr(C,q,ne,ee){if(C.visible===!1)return;if(C.layers.test(q.layers)){if(C.isGroup)ne=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(q);else if(C.isLightProbeGrid)M.pushLightProbeGrid(C);else if(C.isLight)M.pushLight(C),C.castShadow&&M.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Je.intersectsSprite(C)){ee&&mt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(dt);const Ae=V.update(C),be=C.material;be.visible&&T.push(C,Ae,be,ne,mt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Je.intersectsObject(C))){const Ae=V.update(C),be=C.material;if(ee&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),mt.copy(C.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),mt.copy(Ae.boundingSphere.center)),mt.applyMatrix4(C.matrixWorld).applyMatrix4(dt)),Array.isArray(be)){const Ne=Ae.groups;for(let Ue=0,ze=Ne.length;Ue<ze;Ue++){const We=Ne[Ue],Fe=be[We.materialIndex];Fe&&Fe.visible&&T.push(C,Ae,Fe,ne,mt.z,We)}}else be.visible&&T.push(C,Ae,be,ne,mt.z,null)}}const we=C.children;for(let Ae=0,be=we.length;Ae<be;Ae++)Tr(we[Ae],q,ne,ee)}function pc(C,q,ne,ee){const{opaque:te,transmissive:we,transparent:Ae}=C;M.setupLightsView(ne),$e===!0&&ve.setGlobalState(P.clippingPlanes,ne),ee&&_.viewport(he.copy(ee)),te.length>0&&gs(te,q,ne),we.length>0&&gs(we,q,ne),Ae.length>0&&gs(Ae,q,ne),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function mc(C,q,ne,ee){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[ee.id]===void 0){const Fe=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[ee.id]=new fn(1,1,{generateMipmaps:!0,type:Fe?Rn:Wt,minFilter:ri,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const we=M.state.transmissionRenderTarget[ee.id],Ae=ee.viewport||he;we.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);const be=P.getRenderTarget(),Ne=P.getActiveCubeFace(),Ue=P.getActiveMipmapLevel();P.setRenderTarget(we),P.getClearColor(ge),Be=P.getClearAlpha(),Be<1&&P.setClearColor(16777215,.5),P.clear(),ot&&De.render(ne);const ze=P.toneMapping;P.toneMapping=hn;const We=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),M.setupLightsView(ee),$e===!0&&ve.setGlobalState(P.clippingPlanes,ee),gs(C,ne,ee),z.updateMultisampleRenderTarget(we),z.updateRenderTargetMipmap(we),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let st=0,vt=q.length;st<vt;st++){const xt=q[st],{object:rt,geometry:Rt,material:Te,group:Ht}=xt;if(Te.side===bn&&rt.layers.test(ee.layers)){const Qe=Te.side;Te.side=Gt,Te.needsUpdate=!0,gc(rt,ne,ee,Rt,Te,Ht),Te.side=Qe,Te.needsUpdate=!0,Fe=!0}}Fe===!0&&(z.updateMultisampleRenderTarget(we),z.updateRenderTargetMipmap(we))}P.setRenderTarget(be,Ne,Ue),P.setClearColor(ge,Be),We!==void 0&&(ee.viewport=We),P.toneMapping=ze}function gs(C,q,ne){const ee=q.isScene===!0?q.overrideMaterial:null;for(let te=0,we=C.length;te<we;te++){const Ae=C[te],{object:be,geometry:Ne,group:Ue}=Ae;let ze=Ae.material;ze.allowOverride===!0&&ee!==null&&(ze=ee),be.layers.test(ne.layers)&&gc(be,q,ne,Ne,ze,Ue)}}function gc(C,q,ne,ee,te,we){C.onBeforeRender(P,q,ne,ee,te,we),C.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),te.onBeforeRender(P,q,ne,ee,C,we),te.transparent===!0&&te.side===bn&&te.forceSinglePass===!1?(te.side=Gt,te.needsUpdate=!0,P.renderBufferDirect(ne,q,ee,te,C,we),te.side=Vn,te.needsUpdate=!0,P.renderBufferDirect(ne,q,ee,te,C,we),te.side=bn):P.renderBufferDirect(ne,q,ee,te,C,we),C.onAfterRender(P,q,ne,ee,te,we)}function xs(C,q,ne){q.isScene!==!0&&(q=_t);const ee=F.get(C),te=M.state.lights,we=M.state.shadowsArray,Ae=te.state.version,be=se.getParameters(C,te.state,we,q,ne,M.state.lightProbeGridArray),Ne=se.getProgramCacheKey(be);let Ue=ee.programs;ee.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?q.environment:null,ee.fog=q.fog;const ze=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ee.envMap=Z.get(C.envMap||ee.environment,ze),ee.envMapRotation=ee.environment!==null&&C.envMap===null?q.environmentRotation:C.envMapRotation,Ue===void 0&&(C.addEventListener("dispose",sn),Ue=new Map,ee.programs=Ue);let We=Ue.get(Ne);if(We!==void 0){if(ee.currentProgram===We&&ee.lightsStateVersion===Ae)return _c(C,be),We}else be.uniforms=se.getUniforms(C),L!==null&&C.isNodeMaterial&&L.build(C,ne,be),C.onBeforeCompile(be,P),We=se.acquireProgram(be,Ne),Ue.set(Ne,We),ee.uniforms=be.uniforms;const Fe=ee.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Fe.clippingPlanes=ve.uniform),_c(C,be),ee.needsLights=Xu(C),ee.lightsStateVersion=Ae,ee.needsLights&&(Fe.ambientLightColor.value=te.state.ambient,Fe.lightProbe.value=te.state.probe,Fe.directionalLights.value=te.state.directional,Fe.directionalLightShadows.value=te.state.directionalShadow,Fe.spotLights.value=te.state.spot,Fe.spotLightShadows.value=te.state.spotShadow,Fe.rectAreaLights.value=te.state.rectArea,Fe.ltc_1.value=te.state.rectAreaLTC1,Fe.ltc_2.value=te.state.rectAreaLTC2,Fe.pointLights.value=te.state.point,Fe.pointLightShadows.value=te.state.pointShadow,Fe.hemisphereLights.value=te.state.hemi,Fe.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Fe.spotLightMatrix.value=te.state.spotLightMatrix,Fe.spotLightMap.value=te.state.spotLightMap,Fe.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=M.state.lightProbeGridArray.length>0,ee.currentProgram=We,ee.uniformsList=null,We}function xc(C){if(C.uniformsList===null){const q=C.currentProgram.getUniforms();C.uniformsList=sr.seqWithValue(q.seq,C.uniforms)}return C.uniformsList}function _c(C,q){const ne=F.get(C);ne.outputColorSpace=q.outputColorSpace,ne.batching=q.batching,ne.batchingColor=q.batchingColor,ne.instancing=q.instancing,ne.instancingColor=q.instancingColor,ne.instancingMorph=q.instancingMorph,ne.skinning=q.skinning,ne.morphTargets=q.morphTargets,ne.morphNormals=q.morphNormals,ne.morphColors=q.morphColors,ne.morphTargetsCount=q.morphTargetsCount,ne.numClippingPlanes=q.numClippingPlanes,ne.numIntersection=q.numClipIntersection,ne.vertexAlphas=q.vertexAlphas,ne.vertexTangents=q.vertexTangents,ne.toneMapping=q.toneMapping}function ju(C,q){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;S.setFromMatrixPosition(q.matrixWorld);for(let ne=0,ee=C.length;ne<ee;ne++){const te=C[ne];if(te.texture!==null&&te.boundingBox.containsPoint(S))return te}return null}function Wu(C,q,ne,ee,te){q.isScene!==!0&&(q=_t),z.resetTextureUnits();const we=q.fog,Ae=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?q.environment:null,be=K===null?P.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ye.workingColorSpace,Ne=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Ue=Z.get(ee.envMap||Ae,Ne),ze=ee.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,We=!!ne.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Fe=!!ne.morphAttributes.position,st=!!ne.morphAttributes.normal,vt=!!ne.morphAttributes.color;let xt=hn;ee.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(xt=P.toneMapping);const rt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Rt=rt!==void 0?rt.length:0,Te=F.get(ee),Ht=M.state.lights;if($e===!0&&(je===!0||C!==pe)){const lt=C===pe&&ee.id===ie;ve.setState(ee,C,lt)}let Qe=!1;ee.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Ht.state.version||Te.outputColorSpace!==be||te.isBatchedMesh&&Te.batching===!1||!te.isBatchedMesh&&Te.batching===!0||te.isBatchedMesh&&Te.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Te.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Te.instancing===!1||!te.isInstancedMesh&&Te.instancing===!0||te.isSkinnedMesh&&Te.skinning===!1||!te.isSkinnedMesh&&Te.skinning===!0||te.isInstancedMesh&&Te.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Te.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Te.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Te.instancingMorph===!1&&te.morphTexture!==null||Te.envMap!==Ue||ee.fog===!0&&Te.fog!==we||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ve.numPlanes||Te.numIntersection!==ve.numIntersection)||Te.vertexAlphas!==ze||Te.vertexTangents!==We||Te.morphTargets!==Fe||Te.morphNormals!==st||Te.morphColors!==vt||Te.toneMapping!==xt||Te.morphTargetsCount!==Rt||!!Te.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Te.__version=ee.version);let $t=Te.currentProgram;Qe===!0&&($t=xs(ee,q,te),L&&ee.isNodeMaterial&&L.onUpdateProgram(ee,$t,Te));let rn=!1,Pn=!1,mi=!1;const at=$t.getUniforms(),Mt=Te.uniforms;if(_.useProgram($t.program)&&(rn=!0,Pn=!0,mi=!0),ee.id!==ie&&(ie=ee.id,Pn=!0),Te.needsLights){const lt=ju(M.state.lightProbeGridArray,te);Te.lightProbeGrid!==lt&&(Te.lightProbeGrid=lt,Pn=!0)}if(rn||pe!==C){_.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),at.setValue(N,"projectionMatrix",C.projectionMatrix),at.setValue(N,"viewMatrix",C.matrixWorldInverse);const In=at.map.cameraPosition;In!==void 0&&In.setValue(N,ht.setFromMatrixPosition(C.matrixWorld)),A.logarithmicDepthBuffer&&at.setValue(N,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&at.setValue(N,"isOrthographic",C.isOrthographicCamera===!0),pe!==C&&(pe=C,Pn=!0,mi=!0)}if(Te.needsLights&&(Ht.state.directionalShadowMap.length>0&&at.setValue(N,"directionalShadowMap",Ht.state.directionalShadowMap,z),Ht.state.spotShadowMap.length>0&&at.setValue(N,"spotShadowMap",Ht.state.spotShadowMap,z),Ht.state.pointShadowMap.length>0&&at.setValue(N,"pointShadowMap",Ht.state.pointShadowMap,z)),te.isSkinnedMesh){at.setOptional(N,te,"bindMatrix"),at.setOptional(N,te,"bindMatrixInverse");const lt=te.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),at.setValue(N,"boneTexture",lt.boneTexture,z))}te.isBatchedMesh&&(at.setOptional(N,te,"batchingTexture"),at.setValue(N,"batchingTexture",te._matricesTexture,z),at.setOptional(N,te,"batchingIdTexture"),at.setValue(N,"batchingIdTexture",te._indirectTexture,z),at.setOptional(N,te,"batchingColorTexture"),te._colorsTexture!==null&&at.setValue(N,"batchingColorTexture",te._colorsTexture,z));const Ln=ne.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&j.update(te,ne,$t),(Pn||Te.receiveShadow!==te.receiveShadow)&&(Te.receiveShadow=te.receiveShadow,at.setValue(N,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&q.environment!==null&&(Mt.envMapIntensity.value=q.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=kv()),Pn){if(at.setValue(N,"toneMappingExposure",P.toneMappingExposure),Te.needsLights&&$u(Mt,mi),we&&ee.fog===!0&&ue.refreshFogUniforms(Mt,we),ue.refreshMaterialUniforms(Mt,ee,Q,$,M.state.transmissionRenderTarget[C.id]),Te.needsLights&&Te.lightProbeGrid){const lt=Te.lightProbeGrid;Mt.probesSH.value=lt.texture,Mt.probesMin.value.copy(lt.boundingBox.min),Mt.probesMax.value.copy(lt.boundingBox.max),Mt.probesResolution.value.copy(lt.resolution)}sr.upload(N,xc(Te),Mt,z)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(sr.upload(N,xc(Te),Mt,z),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&at.setValue(N,"center",te.center),at.setValue(N,"modelViewMatrix",te.modelViewMatrix),at.setValue(N,"normalMatrix",te.normalMatrix),at.setValue(N,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const lt=ee.uniformsGroups;for(let In=0,gi=lt.length;In<gi;In++){const vc=lt[In];fe.update(vc,$t),fe.bind(vc,$t)}}return $t}function $u(C,q){C.ambientLightColor.needsUpdate=q,C.lightProbe.needsUpdate=q,C.directionalLights.needsUpdate=q,C.directionalLightShadows.needsUpdate=q,C.pointLights.needsUpdate=q,C.pointLightShadows.needsUpdate=q,C.spotLights.needsUpdate=q,C.spotLightShadows.needsUpdate=q,C.rectAreaLights.needsUpdate=q,C.hemisphereLights.needsUpdate=q}function Xu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(C,q,ne){const ee=F.get(C);ee.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),F.get(C.texture).__webglTexture=q,F.get(C.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ne,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,q){const ne=F.get(C);ne.__webglFramebuffer=q,ne.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(C,q=0,ne=0){K=C,k=q,U=ne;let ee=null,te=!1,we=!1;if(C){const be=F.get(C);if(be.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,be.__webglFramebuffer),he.copy(C.viewport),me.copy(C.scissor),Pe=C.scissorTest,_.viewport(he),_.scissor(me),_.setScissorTest(Pe),ie=-1;return}else if(be.__webglFramebuffer===void 0)z.setupRenderTarget(C);else if(be.__hasExternalTextures)z.rebindTextures(C,F.get(C.texture).__webglTexture,F.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ze=C.depthTexture;if(be.__boundDepthTexture!==ze){if(ze!==null&&F.has(ze)&&(C.width!==ze.image.width||C.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(C)}}const Ne=C.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(we=!0);const Ue=F.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ue[q])?ee=Ue[q][ne]:ee=Ue[q],te=!0):C.samples>0&&z.useMultisampledRTT(C)===!1?ee=F.get(C).__webglMultisampledFramebuffer:Array.isArray(Ue)?ee=Ue[ne]:ee=Ue,he.copy(C.viewport),me.copy(C.scissor),Pe=C.scissorTest}else he.copy(Ce).multiplyScalar(Q).floor(),me.copy(qe).multiplyScalar(Q).floor(),Pe=Ge;if(ne!==0&&(ee=W),_.bindFramebuffer(N.FRAMEBUFFER,ee)&&_.drawBuffers(C,ee),_.viewport(he),_.scissor(me),_.setScissorTest(Pe),te){const be=F.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+q,be.__webglTexture,ne)}else if(we){const be=q;for(let Ne=0;Ne<C.textures.length;Ne++){const Ue=F.get(C.textures[Ne]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ne,Ue.__webglTexture,ne,be)}}else if(C!==null&&ne!==0){const be=F.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,be.__webglTexture,ne)}ie=-1},this.readRenderTargetPixels=function(C,q,ne,ee,te,we,Ae,be=0){if(!(C&&C.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=F.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne){_.bindFramebuffer(N.FRAMEBUFFER,Ne);try{const Ue=C.textures[be],ze=Ue.format,We=Ue.type;if(C.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+be),!A.textureFormatReadable(ze)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(We)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=C.width-ee&&ne>=0&&ne<=C.height-te&&N.readPixels(q,ne,ee,te,xe.convert(ze),xe.convert(We),we)}finally{const Ue=K!==null?F.get(K).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(C,q,ne,ee,te,we,Ae,be=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=F.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne)if(q>=0&&q<=C.width-ee&&ne>=0&&ne<=C.height-te){_.bindFramebuffer(N.FRAMEBUFFER,Ne);const Ue=C.textures[be],ze=Ue.format,We=Ue.type;if(C.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+be),!A.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Fe),N.bufferData(N.PIXEL_PACK_BUFFER,we.byteLength,N.STREAM_READ),N.readPixels(q,ne,ee,te,xe.convert(ze),xe.convert(We),0);const st=K!==null?F.get(K).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,st);const vt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await cm(N,vt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Fe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,we),N.deleteBuffer(Fe),N.deleteSync(vt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,q=null,ne=0){const ee=Math.pow(2,-ne),te=Math.floor(C.image.width*ee),we=Math.floor(C.image.height*ee),Ae=q!==null?q.x:0,be=q!==null?q.y:0;z.setTexture2D(C,0),N.copyTexSubImage2D(N.TEXTURE_2D,ne,0,0,Ae,be,te,we),_.unbindTexture()},this.copyTextureToTexture=function(C,q,ne=null,ee=null,te=0,we=0){let Ae,be,Ne,Ue,ze,We,Fe,st,vt;const xt=C.isCompressedTexture?C.mipmaps[we]:C.image;if(ne!==null)Ae=ne.max.x-ne.min.x,be=ne.max.y-ne.min.y,Ne=ne.isBox3?ne.max.z-ne.min.z:1,Ue=ne.min.x,ze=ne.min.y,We=ne.isBox3?ne.min.z:0;else{const Mt=Math.pow(2,-te);Ae=Math.floor(xt.width*Mt),be=Math.floor(xt.height*Mt),C.isDataArrayTexture?Ne=xt.depth:C.isData3DTexture?Ne=Math.floor(xt.depth*Mt):Ne=1,Ue=0,ze=0,We=0}ee!==null?(Fe=ee.x,st=ee.y,vt=ee.z):(Fe=0,st=0,vt=0);const rt=xe.convert(q.format),Rt=xe.convert(q.type);let Te;q.isData3DTexture?(z.setTexture3D(q,0),Te=N.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(z.setTexture2DArray(q,0),Te=N.TEXTURE_2D_ARRAY):(z.setTexture2D(q,0),Te=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,q.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,q.unpackAlignment);const Ht=_.getParameter(N.UNPACK_ROW_LENGTH),Qe=_.getParameter(N.UNPACK_IMAGE_HEIGHT),$t=_.getParameter(N.UNPACK_SKIP_PIXELS),rn=_.getParameter(N.UNPACK_SKIP_ROWS),Pn=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,xt.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xt.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Ue),_.pixelStorei(N.UNPACK_SKIP_ROWS,ze),_.pixelStorei(N.UNPACK_SKIP_IMAGES,We);const mi=C.isDataArrayTexture||C.isData3DTexture,at=q.isDataArrayTexture||q.isData3DTexture;if(C.isDepthTexture){const Mt=F.get(C),Ln=F.get(q),lt=F.get(Mt.__renderTarget),In=F.get(Ln.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,lt.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,In.__webglFramebuffer);for(let gi=0;gi<Ne;gi++)mi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(C).__webglTexture,te,We+gi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(q).__webglTexture,we,vt+gi)),N.blitFramebuffer(Ue,ze,Ae,be,Fe,st,Ae,be,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(te!==0||C.isRenderTargetTexture||F.has(C)){const Mt=F.get(C),Ln=F.get(q);_.bindFramebuffer(N.READ_FRAMEBUFFER,B),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,X);for(let lt=0;lt<Ne;lt++)mi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mt.__webglTexture,te,We+lt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mt.__webglTexture,te),at?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ln.__webglTexture,we,vt+lt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ln.__webglTexture,we),te!==0?N.blitFramebuffer(Ue,ze,Ae,be,Fe,st,Ae,be,N.COLOR_BUFFER_BIT,N.NEAREST):at?N.copyTexSubImage3D(Te,we,Fe,st,vt+lt,Ue,ze,Ae,be):N.copyTexSubImage2D(Te,we,Fe,st,Ue,ze,Ae,be);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else at?C.isDataTexture||C.isData3DTexture?N.texSubImage3D(Te,we,Fe,st,vt,Ae,be,Ne,rt,Rt,xt.data):q.isCompressedArrayTexture?N.compressedTexSubImage3D(Te,we,Fe,st,vt,Ae,be,Ne,rt,xt.data):N.texSubImage3D(Te,we,Fe,st,vt,Ae,be,Ne,rt,Rt,xt):C.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,we,Fe,st,Ae,be,rt,Rt,xt.data):C.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,we,Fe,st,xt.width,xt.height,rt,xt.data):N.texSubImage2D(N.TEXTURE_2D,we,Fe,st,Ae,be,rt,Rt,xt);_.pixelStorei(N.UNPACK_ROW_LENGTH,Ht),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(N.UNPACK_SKIP_PIXELS,$t),_.pixelStorei(N.UNPACK_SKIP_ROWS,rn),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Pn),we===0&&q.generateMipmaps&&N.generateMipmap(Te),_.unbindTexture()},this.initRenderTarget=function(C){F.get(C).__webglFramebuffer===void 0&&z.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?z.setTextureCube(C,0):C.isData3DTexture?z.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?z.setTexture2DArray(C,0):z.setTexture2D(C,0),_.unbindTexture()},this.resetState=function(){k=0,U=0,K=null,_.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const $s=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],bu=620,zv=560,Gv=300,Hv=2800,kl=850,zl=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Gl=210,_a=300,Hl=.42,Vl=740,Xs=n=>-(n+1)*bu,Vv=n=>n===1?1:1-Math.pow(2,-10*n),va=n=>new Promise(e=>setTimeout(e,n)),jl=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function Wl(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${jl[t%jl.length]}`)}function jv({onDone:n}){const e=H.useRef(null),t=H.useRef(null),i=H.useRef(null),s=H.useRef(null),r=H.useRef(null),o=H.useRef(null),c=H.useRef(null),l=H.useRef(null),d=H.useRef(null),u=H.useRef(null),f=H.useRef(n);f.current=n,fd();const h=H.useMemo(()=>Wl(16),[]),p=H.useMemo(()=>Wl(16),[]);return H.useEffect(()=>{let x=!1,b=!1;const m=()=>{b||(b=!0,f.current())};let g=null;function y(){if(!g)try{const Y=window.AudioContext??window.webkitAudioContext;g=new Y}catch{}return g}function w(){const Y=y();if(!Y)return;Y.state==="suspended"&&Y.resume();const N=Y.currentTime,ae=Y.createOscillator();ae.type="sine",ae.frequency.setValueAtTime(130,N),ae.frequency.exponentialRampToValueAtTime(42,N+.16);const oe=Y.createGain();oe.gain.setValueAtTime(1,N),oe.gain.exponentialRampToValueAtTime(.001,N+.38),ae.connect(oe).connect(Y.destination),ae.start(N),ae.stop(N+.42);const A=Math.floor(Y.sampleRate*.14),_=Y.createBuffer(1,A,Y.sampleRate),I=_.getChannelData(0);for(let G=0;G<A;G++)I[G]=(Math.random()*2-1)*Math.pow(1-G/A,2.2);const F=Y.createBufferSource();F.buffer=_;const z=Y.createBiquadFilter();z.type="lowpass",z.frequency.value=850;const Z=Y.createGain();Z.gain.setValueAtTime(.55,N),Z.gain.exponentialRampToValueAtTime(.001,N+.13),F.connect(z).connect(Z).connect(Y.destination),F.start(N)}function S(){const Y=i.current;Y&&(Y.currentTime=0,Y.play().catch(()=>{}))}const T=t.current,M=(T==null?void 0:T.getContext("2d"))??null;let R=[],v=0;function E(){T&&(T.width=window.innerWidth,T.height=window.innerHeight)}E();function P(Y,N){R=[];let ae=0;const oe=6;function A(I,F,z,Z,G,O){const V=3+Math.floor(Math.random()*3),se=[[I,F]];let ue=z,le=I,ce=F;for(let ve=0;ve<V;ve++){ue+=(Math.random()-.5)*.6;const Se=Z/V;if(le+=Math.cos(ue)*Se,ce+=Math.sin(ue)*Se,se.push([le,ce]),G>0&&Math.random()<.5){const De=ue+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);A(le,ce,De,Z*(.35+Math.random()*.3),G-1,O*.78)}}R.push({pts:se,color:zl[ae++%zl.length],width:O})}const _=[N*(.06+Math.random()*.1),N*(.84+Math.random()*.1)];for(let I=0;I<oe;I++){const F=Y*(.15+Math.random()*.7),z=I<_.length?_[I]:N*(.1+Math.random()*.8),Z=9+Math.floor(Math.random()*6);for(let G=0;G<Z;G++){const O=G/Z*Math.PI*2+(Math.random()-.5)*.4,V=Math.max(Y,N)*(.18+Math.random()*.38);A(F,z,O,V,2,.9)}}}function D(Y){if(!M||Y<=0)return;const N=Math.min(1,Y/2.4),ae=Math.round(R.length*N);for(let oe=0;oe<ae;oe++){const A=R[oe];M.lineWidth=A.width*(.9+Y*.1),M.strokeStyle=A.color,M.globalAlpha=.75+Y*.1,M.shadowColor=A.color,M.shadowBlur=5+Y*2.2,M.beginPath(),A.pts.forEach(([_,I],F)=>F===0?M.moveTo(_,I):M.lineTo(_,I)),M.stroke()}M.globalAlpha=1,M.shadowBlur=0}function L(Y,N,ae){M&&(M.clearRect(0,0,N,ae),D(Y))}function W(){const Y=d.current;Y&&(Y.classList.remove("intro-hit"),Y.offsetWidth,Y.classList.add("intro-hit"))}function B(){var N,ae,oe,A;const Y=(N=r.current)==null?void 0:N.firstElementChild;Y&&(Y.classList.remove("intro-rgbslam"),Y.offsetWidth,Y.classList.add("intro-rgbslam")),(ae=r.current)==null||ae.classList.remove("intro-jitter"),(oe=r.current)==null||oe.offsetWidth,(A=r.current)==null||A.classList.add("intro-jitter"),W(),$e()}async function X(){for(let Y=5;Y>=1&&!x;Y--){const N=r.current;if(!N)return;N.innerHTML="";const ae=document.createElement("div");ae.className="intro-glyph",ae.setAttribute("data-t",String(Y)),ae.textContent=String(Y),N.appendChild(ae),B(),w(),await ae.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:kl*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await va(kl*.3)}}let k=null,U=null,K=null,ie=0,pe=!1,he=-1;const Pe=document.createElement("canvas").getContext("2d");Pe.font=`700 ${Gl}px "Rajdhani", sans-serif`;const ge=[],Be=[];function re(Y,N){const ae=Math.ceil(Pe.measureText(Y).width),oe=Math.max(200,ae+120),A=document.createElement("canvas");A.width=oe,A.height=_a;const _=A.getContext("2d");_.font=`700 ${Gl}px "Rajdhani", sans-serif`,_.textAlign="center",_.textBaseline="middle",_.shadowColor=N,_.shadowBlur=56,_.fillStyle="#d24e01",_.fillText(Y,oe/2,_a/2);const I=new au(A);I.anisotropy=4;let F=oe*Hl,z=_a*Hl;if(F>Vl){const Z=Vl/F;F*=Z,z*=Z}return{tex:I,worldW:F,worldH:z}}function $(Y,N,ae){const{tex:oe,worldW:A,worldH:_}=re(Y,ae),I=new Wi(A,_),F=new Hn({map:oe,transparent:!0,depthWrite:!1,opacity:0}),z=new ut(I,F);z.position.set(0,10,N),z.visible=!1,U.add(z);const Z=new ut(I,new Hn({map:oe,transparent:!0,depthWrite:!1,blending:di,color:2875596,opacity:0})),G=new ut(I,new Hn({map:oe,transparent:!0,depthWrite:!1,blending:di,color:10116351,opacity:0}));return Z.position.copy(z.position),G.position.copy(z.position),Z.visible=!1,G.visible=!1,U.add(Z),U.add(G),Be.push(I,F,oe,Z.material,G.material),{mesh:z,ghostCy:Z,ghostMg:G}}const Q={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Me,Le;function Ce(){const Y=e.current;if(!Y)return;k=new yu({canvas:Y,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),k.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),U=new tu,U.fog=new Mr(263946,.0011),K=new zt(62,window.innerWidth/window.innerHeight,1,6e3),K.position.set(0,0,40),U.add(new hu(928300,1.1));const N=bu*$s.length+500,ae=900,oe=new Ut,A=new Float32Array(ae*3),_=new Float32Array(ae*3),I=[2875596,15357964,15357964,10116351];for(let G=0;G<ae;G++){const O=60+Math.random()*260,V=Math.random()*Math.PI*2;A[G*3]=Math.cos(V)*O,A[G*3+1]=Math.sin(V)*O,A[G*3+2]=-Math.random()*N;const se=new Xe(I[G%I.length]);_[G*3]=se.r,_[G*3+1]=se.g,_[G*3+2]=se.b}oe.setAttribute("position",new Bt(A,3)),oe.setAttribute("color",new Bt(_,3));const F=new br({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});U.add(new Jo(oe,F)),Be.push(oe,F),$s.forEach((G,O)=>{const V=Xs(O),se="#"+G.light.toString(16).padStart(6,"0");ge.push($(G.text,V,se));const ue=new ci(G.light,2.4,900,2);ue.position.set(0,40,V+60),U.add(ue)}),Me=new ci(15357964,4,550,2),Le=new ci(10116351,2.6,550,2),U.add(Me),U.add(Le),pe=!0,qe();const z=Math.random()*1e3;Q.camZ=0;function Z(G){if(!k||!U||!K)return;{const ue=Math.sin(G*.0016+z)*1.1+Math.sin(G*.0043)*.5,le=Math.cos(G*.002+z)*.9+Math.cos(G*.0038)*.45;K.position.x=ue+Q.camX,K.position.y=le+6}K.position.z=Q.camZ+Q.warpKick;const O=Q.yawKick,V=K.position.x+Math.sin(O)*640;K.lookAt(V,K.position.y-4,Q.focusZ),K.rotateZ(-O*.5);const se=62+Q.fovKick*14;K.fov!==se&&(K.fov=se,K.updateProjectionMatrix()),Me.position.set(Math.sin(G*6e-4)*80,30,Q.camZ-120),Le.position.set(Math.cos(G*7e-4)*80,-10,Q.camZ-200),ge.forEach(ue=>{ue.mesh.visible&&ue.mesh.quaternion.copy(K.quaternion),ue.ghostCy.visible&&ue.ghostCy.quaternion.copy(K.quaternion),ue.ghostMg.visible&&ue.ghostMg.quaternion.copy(K.quaternion)}),k.render(U,K),ie=requestAnimationFrame(Z)}ie=requestAnimationFrame(Z)}function qe(){!pe||!k||!K||(k.setSize(window.innerWidth,window.innerHeight),K.aspect=window.innerWidth/window.innerHeight,K.updateProjectionMatrix())}function Ge(){qe(),E(),P(window.innerWidth,window.innerHeight),L(v,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Ge,{passive:!0});function Je(Y,N=650){const ae=he;he=Y;const oe=ge[Y];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const A=ae>=0?ge[ae]:null,_=performance.now();function I(){const F=Math.min(1,(performance.now()-_)/N);oe.mesh.material.opacity=F,A&&(A.mesh.material.opacity=1-F),F<1?requestAnimationFrame(I):A&&(A.mesh.visible=!1)}I()}function $e(){if(he<0)return;const Y=ge[he];if(!Y)return;const N=16+Math.random()*14;Y.ghostCy.visible=!0,Y.ghostCy.material.opacity=.6,Y.ghostCy.position.x=-N,Y.ghostMg.visible=!0,Y.ghostMg.material.opacity=.6,Y.ghostMg.position.x=N,setTimeout(()=>{Y.ghostCy.material.opacity=0,Y.ghostCy.visible=!1,Y.ghostCy.position.x=0,Y.ghostMg.material.opacity=0,Y.ghostMg.visible=!1,Y.ghostMg.position.x=0},140+Math.random()*100)}async function je(Y,N,ae,oe,A){const _=Q.camZ,I=Q.camX,F=performance.now();return Q.warpKick=(Math.random()-.5)*34,Q.yawKick=A*oe,Q.fovKick=1,new Promise(z=>{function Z(G){const O=Math.min(1,(G-F)/ae),V=Vv(O);Q.camZ=_+(Y-_)*V,Q.camX=I+(N-I)*V,Q.warpKick*=.92,Q.yawKick*=.975,Q.fovKick*=.965,O<1?requestAnimationFrame(Z):z()}requestAnimationFrame(Z)})}function dt(Y=1,N=420){if(!pe||!M||!e.current)return;const ae=window.innerWidth,oe=window.innerHeight,A=performance.now()+N;function _(){if(performance.now()>A){L(v,ae,oe);return}M.clearRect(0,0,ae,oe),D(v);const F=5+Math.floor(Math.random()*8*Y);for(let Z=0;Z<F;Z++){const G=Math.random()*oe,O=4+Math.random()*52*Y,V=(Math.random()-.5)*130*Y;try{M.drawImage(e.current,0,G,ae,O,V,G,ae,O)}catch{}}const z=Math.round(6*Y);M.globalCompositeOperation="screen";for(let Z=0;Z<z;Z++){const G=Math.random()*oe;M.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],M.globalAlpha=.35+Math.random()*.35,M.lineWidth=.6+Math.random()*1.6,M.beginPath(),M.moveTo(0,G),M.lineTo(ae,G),M.stroke()}if(M.globalCompositeOperation="source-over",M.globalAlpha=1,Math.random()<Y*.12){M.globalAlpha=.5;for(let Z=0;Z<220;Z++)M.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",M.fillRect(Math.random()*ae,Math.random()*oe,2,2);M.globalAlpha=1}requestAnimationFrame(_)}_()}function ht(Y=1,N=340){if(!pe||!M)return;const ae=window.innerWidth,oe=window.innerHeight,A=ae/2,_=oe/2,I=12+Math.floor(10*Y),F=Array.from({length:I},()=>Math.random()*Math.PI*2),z=performance.now();function Z(){const O=(performance.now()-z)/N;if(O>=1){L(v,ae,oe);return}M.save(),M.globalCompositeOperation="screen",F.forEach(V=>{const se=30+O*300,ue=se+90+Math.random()*150,le=A+Math.cos(V)*se,ce=_+Math.sin(V)*se,ve=A+Math.cos(V)*ue,Se=_+Math.sin(V)*ue;M.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",M.globalAlpha=(1-O)*(.28+Math.random()*.32)*Y,M.lineWidth=1.2+Math.random()*1.8,M.beginPath(),M.moveTo(le,ce),M.lineTo(ve,Se),M.stroke()}),M.restore(),requestAnimationFrame(Z)}Z()}async function mt(Y=900){const N=window.innerWidth,ae=window.innerHeight;if(!M)return;const oe=performance.now(),A=R.map(()=>Math.random()*.25);await new Promise(_=>{function I(){const F=Math.min(1,(performance.now()-oe)/Y);M.clearRect(0,0,N,ae),R.forEach((z,Z)=>{const G=Math.min(1,Math.max(0,(F-A[Z])/(1-A[Z])));if(G<=0)return;const O=z.pts,V=O.length-1,se=G*V;M.lineWidth=z.width*(1+F*.4),M.strokeStyle=z.color,M.globalAlpha=.65+F*.3,M.shadowColor=z.color,M.shadowBlur=3+F*5,M.beginPath(),M.moveTo(O[0][0],O[0][1]);for(let ce=0;ce<Math.floor(se);ce++)M.lineTo(O[ce+1][0],O[ce+1][1]);const ue=Math.floor(se),le=se-ue;if(ue<V&&le>0){const[ce,ve]=O[ue],[Se,De]=O[ue+1];M.lineTo(ce+(Se-ce)*le,ve+(De-ve)*le)}M.stroke()}),M.globalAlpha=1,M.shadowBlur=0,F<1?requestAnimationFrame(I):_()}I()})}async function _t(){var G;W(),(G=r.current)==null||G.classList.add("intro-jitter");const Y=u.current;if(!Y)return;Y.innerHTML="";const N=window.innerWidth,ae=window.innerHeight,oe=11,A=8,_=N/oe,I=ae/A,F=N/2,z=ae/2,Z=[];for(let O=0;O<A;O++)for(let V=0;V<oe;V++){const se=V*_,ue=O*I,le=()=>(Math.random()-.5)*16,ce=document.createElement("div");ce.className="intro-shard",ce.style.left=se+"px",ce.style.top=ue+"px",ce.style.width=_+2+"px",ce.style.height=I+2+"px",ce.style.clipPath=`polygon(${le()}px ${le()}px, ${_+le()}px ${le()}px, ${_+le()}px ${I+le()}px, ${le()}px ${I+le()}px)`,Y.appendChild(ce);const ve=se+_/2-F,Se=ue+I/2-z,De=Math.hypot(ve,Se)||1;Z.push({div:ce,dx:ve/De,dy:Se/De,delay:De/Math.max(N,ae)*220+Math.random()*80})}Z.forEach(({div:O,dx:V,dy:se,delay:ue})=>{const le=60+Math.random()*140,ce=420+Math.random()*420,ve=(Math.random()-.5)*420;O.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${V*le}px, ${se*le-20}px) rotate(${ve*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${V*le*1.4}px, ${se*le+ce}px) rotate(${ve}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:ue,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await va(1600),Y.innerHTML=""}async function ot(){var Y;if(P(window.innerWidth,window.innerHeight),Ce(),s.current&&(s.current.style.display="flex"),await X(),!x){s.current&&(s.current.style.display="none"),(Y=c.current)==null||Y.classList.add("intro-on"),S();for(let N=0;N<$s.length&&!x;N++){const ae=$s[N];v=ae.crack,l.current&&(l.current.innerHTML=ae.final?ae.sub:`${ae.sub} · трещина канала <b>${ae.crack}/4</b>`),Je(N),Q.focusZ=Xs(N);const oe=N%2===0?1:-1,A=ae.final?0:oe*60,_=ae.final?Xs(N)-Gv:Xs(N)+zv;if(await je(_,A,Hv,.5+ae.crack*.09,oe),x)return;B(),dt(Math.min(1,.5+ae.crack*.14),ae.final?300:260),ae.final||ht(.8+ae.crack*.1,320),L(v,window.innerWidth,window.innerHeight)}x||(await mt(900),!x&&(await va(150),await _t(),!x&&m()))}}return ot(),()=>{x=!0,window.removeEventListener("resize",Ge),cancelAnimationFrame(ie),Be.forEach(Y=>Y.dispose()),k==null||k.dispose(),g==null||g.close().catch(()=>{})}},[]),a.jsx("div",{className:"host-screen grid-bg intro-screen",children:a.jsxs("div",{className:"intro-root",children:[a.jsx("canvas",{ref:e,className:"intro-gl"}),a.jsx("canvas",{ref:t,className:"intro-crack"}),a.jsx("div",{ref:u,className:"intro-shatter-layer"}),a.jsx("div",{className:"intro-vignette"}),a.jsx("div",{className:"intro-scanlines"}),a.jsx("div",{ref:d,className:"intro-noise"}),a.jsx("div",{className:"intro-bracket tl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket tr",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket bl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket br",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-ticker left",children:a.jsx("div",{className:"intro-ticker-col",children:[...h,...h].map((x,b)=>a.jsx("span",{className:b%6===0?"hi":void 0,children:x},b))})}),a.jsx("div",{className:"intro-ticker right",children:a.jsx("div",{className:"intro-ticker-col",children:[...p,...p].map((x,b)=>a.jsx("span",{className:b%5===0?"hi":void 0,children:x},b))})}),a.jsxs("div",{ref:s,className:"intro-stage",children:[a.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),a.jsx("div",{ref:r,className:"intro-frame"}),a.jsx("div",{ref:o,className:"intro-subline",children:"инициализация канала связи…"})]}),a.jsx("div",{ref:c,className:"intro-flight-label",children:a.jsx("div",{ref:l,className:"intro-subline"})}),a.jsx(Uo,{}),a.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const Wv=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],Ma=[3400,2700,2200,1900],Po=640,$l=560,$v=320,Xl=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],ya=220,qs=300,ql=.46,Yl=820,ts=n=>-(n+1)*Po,Xv=n=>n===1?1:1-Math.pow(2,-10*n),ns=n=>new Promise(e=>setTimeout(e,n));function qv(){const n=new oi,e=[],t=new Zn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new Qo(.42,.95,12),s=new ut(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new Fi(.42,.36,1.9,12),o=new ut(r,t);o.rotation.x=Math.PI/2,o.position.set(0,0,-.15),n.add(o),e.push(r);const c=new fi(.5,.14,1),l=new Zn({color:1316636,metalness:.5,roughness:.6}),d=new ut(c,l);d.position.set(.08,.38,-.1),d.rotation.z=.1,n.add(d),e.push(c,l);const u=new Zn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),f=new fr(.13,12,12),h=new ut(f,u);h.position.set(0,-.05,-2),n.add(h),e.push(f,u);const p=new fr(.06,8,8);[-.22,.22].forEach(E=>{const P=new ut(p,u);P.position.set(E,.12,-1.7),n.add(P)}),e.push(p);const x=new Fi(.06,.06,1.4,6),b=new Zn({color:1711394,metalness:.7,roughness:.4});e.push(x,b);const m=new fi(.04,.86,.05),g=new Zn({color:658447,metalness:.4,roughness:.6});e.push(m,g);const y=new Fi(.5,.5,.07,16),w=new Zn({color:1382429,metalness:.6,roughness:.45});e.push(y,w);const S=new ec(.6,.09,8,20);e.push(S);function T(E,P){const D=new oi,L=new ut(x,b);L.rotation.z=Math.PI/2,L.position.set(E*.72,-.08,.15),D.add(L);const W=E*1.45,B=new ut(y,w);B.rotation.x=Math.PI/2,B.position.set(W,-.08,.15),D.add(B);const X=new Zn({color:855826,metalness:.75,roughness:.3,emissive:P,emissiveIntensity:1.4}),k=new ut(S,X);k.position.copy(B.position),D.add(k),e.push(X);const U=new oi;U.position.copy(B.position);for(let K=0;K<5;K++){const ie=new ut(m,g);ie.rotation.z=K/5*Math.PI,U.add(ie)}return D.add(U),{pod:D,rim:k,spokes:U}}const M=T(-1,2875596),R=T(1,15357964);n.add(M.pod,R.pod);const v=new ci(2875596,2.2,14,2);return v.position.set(0,0,-1.4),n.add(v),{group:n,rotorL:M,rotorR:R,engineLight:v,disposables:e}}function Yv(n=60){const e=new Ut,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new Bt(t,3));const r=new br({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:di,depthWrite:!1}),o=new Jo(e,r);let c=0;function l(u,f,h,p){for(let x=0;x<p;x++){const b=c;c=(c+1)%n,i[b]=.4+Math.random()*.35,t[b*3]=u,t[b*3+1]=f,t[b*3+2]=h,s[b*3]=(Math.random()-.5)*3.2,s[b*3+1]=(Math.random()-.5)*3.2-1,s[b*3+2]=(Math.random()-.5)*3.2}}function d(u){for(let f=0;f<n;f++){if(i[f]<=0){t[f*3+1]=-9999;continue}i[f]-=u,t[f*3]+=s[f*3]*u,t[f*3+1]+=s[f*3+1]*u,t[f*3+2]+=s[f*3+2]*u,i[f]<=0&&(t[f*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:o,geo:e,mat:r,spawn:l,tick:d}}function Kv({onDone:n,phases:e=Wv}){const t=H.useRef(null),i=H.useRef(null),s=H.useRef(null),r=H.useRef(null),o=H.useRef(null),c=H.useRef(null),l=H.useRef(null),d=H.useRef(n);d.current=n;const u=H.useRef(e);u.current=e;const f=H.useRef(()=>{});fd();const h=H.useMemo(()=>e.map(p=>p.text).join(" → "),[e]);return H.useEffect(()=>{let p=!1,x=!1;const b=()=>{x||(x=!0,d.current())};f.current=b;const m=u.current,g=l.current,y=i.current,w=(y==null?void 0:y.getContext("2d"))??null;let S=[],T=0;function M(){y&&(y.width=window.innerWidth,y.height=window.innerHeight)}M();function R(Y,N){S=[];let ae=0;const oe=7;function A(I,F,z,Z,G,O){const V=3+Math.floor(Math.random()*4),se=[[I,F]];let ue=z,le=I,ce=F;for(let ve=0;ve<V;ve++){ue+=(Math.random()-.5)*.9;const Se=Z/V*(.55+Math.random()*.85);if(le+=Math.cos(ue)*Se,ce+=Math.sin(ue)*Se,se.push([le,ce]),G>0&&Math.random()<.58){const De=ue+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);A(le,ce,De,Z*(.3+Math.random()*.35),G-1,O*.76)}}S.push({pts:se,color:Xl[ae++%Xl.length],width:O})}for(let I=0;I<oe;I++){const F=Y*(.1+Math.random()*.8),z=N*(.08+Math.random()*.84),Z=7+Math.floor(Math.random()*7);let G=Math.random()*Math.PI*2;for(let O=0;O<Z;O++){G+=Math.PI*2/Z*(.55+Math.random()*.9);const V=Math.max(Y,N)*(.16+Math.random()*.46);A(F,z,G,V,2,.9)}}S.slice().forEach(I=>{if(I.pts.length<3||Math.random()>=.55)return;const[F,z]=I.pts[1+Math.floor(Math.random()*(I.pts.length-2))];A(F,z,Math.random()*Math.PI*2,Math.max(Y,N)*(.08+Math.random()*.22),1,.55)})}function v(Y){if(!w||Y<=0)return;const N=Math.min(1,Y/2.5),ae=Math.round(S.length*N);for(let oe=0;oe<ae;oe++){const A=S[oe];w.lineWidth=A.width*(.9+Y*.1),w.strokeStyle=A.color,w.globalAlpha=.7+Y*.07,w.shadowColor=A.color,w.shadowBlur=5+Y*2.4,w.beginPath(),A.pts.forEach(([_,I],F)=>F===0?w.moveTo(_,I):w.lineTo(_,I)),w.stroke()}w.globalAlpha=1,w.shadowBlur=0}function E(Y,N,ae){w&&(w.clearRect(0,0,N,ae),v(Y))}function P(Y=!1){const N=o.current;if(!N)return;const ae=Y?"fincine-hit-big":"fincine-hit";N.classList.remove("fincine-hit","fincine-hit-big"),N.offsetWidth,N.classList.add(ae)}function D(){g&&(g.currentTime=0,g.play().catch(()=>{}))}let L=null,W=null,B=null,X=0,k=!1,U=-1;const ie=document.createElement("canvas").getContext("2d");ie.font=`700 ${ya}px "Rajdhani", sans-serif`;const pe=[],he=[];function me(Y,N,ae=1){const oe=Y.toUpperCase(),A=ya*.05,_=Math.ceil(ie.measureText(oe).width),I=Math.max(200,_+140+A*2),F=document.createElement("canvas");F.width=I,F.height=qs;const z=F.getContext("2d");z.font=`700 ${ya}px "Rajdhani", sans-serif`,z.textAlign="center",z.textBaseline="middle",z.lineJoin="round",z.shadowColor=N,z.shadowBlur=60,z.strokeStyle="#eef6f4",z.lineWidth=A,z.strokeText(oe,I/2,qs/2),z.fillStyle="#eef6f4",z.fillText(oe,I/2,qs/2);const Z=new au(F);Z.anisotropy=4;let G=I*ql*ae,O=qs*ql*ae;if(G>Yl*ae){const V=Yl*ae/G;G*=V,O*=V}return{tex:Z,worldW:G,worldH:O}}function Pe(Y,N,ae,oe){const{tex:A,worldW:_,worldH:I}=me(Y,ae,oe),F=new Wi(_,I),z=new Hn({map:A,transparent:!0,depthWrite:!1,opacity:0}),Z=new ut(F,z);Z.position.set(0,8,N),Z.visible=!1,W.add(Z);const G=new ut(F,new Hn({map:A,transparent:!0,depthWrite:!1,blending:di,color:2875596,opacity:0})),O=new ut(F,new Hn({map:A,transparent:!0,depthWrite:!1,blending:di,color:16723804,opacity:0}));return G.position.copy(Z.position),O.position.copy(Z.position),G.visible=!1,O.visible=!1,W.add(G),W.add(O),he.push(F,z,A,G.material,O.material),{mesh:Z,ghostCy:G,ghostMg:O}}const ge={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let Be,re,$=null,Q=null,Me=0;function Le(){const Y=t.current;if(!Y)return;L=new yu({canvas:Y,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),L.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),W=new tu,W.fog=new Mr(263946,.0012),B=new zt(58,window.innerWidth/window.innerHeight,1,6e3),B.position.set(0,0,40),W.add(new hu(928300,1));const N=Po*m.length+600,ae=700,oe=new Ut,A=new Float32Array(ae*3),_=new Float32Array(ae*3),I=[2875596,10116351,15357964];for(let G=0;G<ae;G++){const O=60+Math.random()*280,V=Math.random()*Math.PI*2;A[G*3]=Math.cos(V)*O,A[G*3+1]=Math.sin(V)*O,A[G*3+2]=-Math.random()*N;const se=new Xe(I[G%I.length]);_[G*3]=se.r,_[G*3+1]=se.g,_[G*3+2]=se.b}oe.setAttribute("position",new Bt(A,3)),oe.setAttribute("color",new Bt(_,3));const F=new br({size:3,vertexColors:!0,transparent:!0,opacity:.8});W.add(new Jo(oe,F)),he.push(oe,F),m.forEach((G,O)=>{const V=ts(O),se="#"+G.light.toString(16).padStart(6,"0");pe.push(Pe(G.text,V,se,G.final?1.35:1));const ue=new ci(G.light,2.6,950,2);ue.position.set(0,40,V+60),W.add(ue)}),Be=new ci(15357964,3.4,550,2),re=new ci(10116351,2.2,550,2),W.add(Be),W.add(re),$=qv(),B.add($.group),$.group.position.set(1.3,-1,-6.5),Q=Yv(),$.group.add(Q.points),he.push(Q.geo,Q.mat),W.add(B),k=!0,Ce();const z=Math.random()*1e3;ge.camZ=-Po*.6;function Z(G){if(!L||!W||!B||!$||!Q)return;const O=Me?Math.min(.05,(G-Me)/1e3):.016;Me=G;const V=.15+Math.min(1,Math.max(0,(U+1)/m.length))*.85,se=ge.impactT;se>0&&(ge.impactT=Math.max(0,se-O));const ue=Math.sin(G*.0016+z)*(1+V*2.2+se*6)+Math.sin(G*.0043)*.5*V,le=Math.cos(G*.002+z)*(.9+V*1.8+se*5)+Math.cos(G*.0038)*.45*V;B.position.x=ue+ge.camX,B.position.y=le+6,B.position.z=ge.camZ+ge.warpKick;const ce=ge.yawKick,ve=B.position.x+Math.sin(ce)*640,Se=ge.focusY??B.position.y-4;B.lookAt(ve,Se,ge.focusZ),B.rotateZ(-ce*.55);const De=58+ge.fovKick*(14+V*10)+se*24;Math.abs(B.fov-De)>.01&&(B.fov=De,B.updateProjectionMatrix()),Be.position.set(Math.sin(G*6e-4)*80,30,ge.camZ-120),re.position.set(Math.cos(G*7e-4)*80,-10,ge.camZ-200),ge.droneRoll=ge.droneRoll*.9+-ce*1.4*.1;const j=1.6+V*2.4;ge.droneBob=Math.sin(G*.001*j)*(.12+V*.35),$.group.rotation.z=ge.droneRoll*.6+(se>0?Math.sin(G*.09)*1.15*se:0),$.group.rotation.x=Math.sin(G*.0013)*.06*(1+V)+(se>0?Math.cos(G*.11)*.75*se:0);const _e=O*(6+V*10);$.rotorR.spokes.rotation.z+=_e;let de=-1+ge.droneBob;ge.engineOutT>0?(ge.engineOutT-=O,de-=1-Math.max(0,ge.engineOutT)/.5<1?Math.sin((.5-ge.engineOutT)*9)*.4:0,$.rotorL.spokes.rotation.z+=_e*.12,$.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&Q.spawn(-1.45,-.08,.15,2)):($.rotorL.spokes.rotation.z+=_e,$.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(G*.01)*.3),$.group.position.y=de,$.group.position.x=1.3+Math.sin(G*9e-4)*.25*(1+V),$.group.position.z=-6.5-(se>0?se*2.6:0),Q.tick(O),pe.forEach(xe=>{xe.mesh.visible&&xe.mesh.quaternion.copy(B.quaternion),xe.ghostCy.visible&&xe.ghostCy.quaternion.copy(B.quaternion),xe.ghostMg.visible&&xe.ghostMg.quaternion.copy(B.quaternion)}),L.render(W,B),X=requestAnimationFrame(Z)}X=requestAnimationFrame(Z)}function Ce(){!k||!L||!B||(L.setSize(window.innerWidth,window.innerHeight),B.aspect=window.innerWidth/window.innerHeight,B.updateProjectionMatrix())}function qe(){Ce(),M(),R(window.innerWidth,window.innerHeight),E(T,window.innerWidth,window.innerHeight)}window.addEventListener("resize",qe,{passive:!0});function Ge(Y,N=600){const ae=U;U=Y;const oe=pe[Y];if(!oe)return;oe.mesh.visible=!0,oe.mesh.material.opacity=0;const A=ae>=0?pe[ae]:null,_=performance.now();function I(){const F=Math.min(1,(performance.now()-_)/N);oe.mesh.material.opacity=F,A&&(A.mesh.material.opacity=1-F),F<1?requestAnimationFrame(I):A&&(A.mesh.visible=!1)}I()}function Je(Y=.5){if(U<0)return;const N=pe[U];if(!N)return;const ae=(14+Math.random()*12)*(.7+Y*.6),oe=Math.min(1,.45+Y*.3);N.ghostCy.visible=!0,N.ghostCy.material.opacity=oe,N.ghostCy.position.x=-ae,N.ghostMg.visible=!0,N.ghostMg.material.opacity=oe,N.ghostMg.position.x=ae,setTimeout(()=>{N.ghostCy.material.opacity=0,N.ghostCy.visible=!1,N.ghostCy.position.x=0,N.ghostMg.material.opacity=0,N.ghostMg.visible=!1,N.ghostMg.position.x=0},(120+Math.random()*90)*(.8+Y*.5)),Y>.75&&Math.random()<.65&&setTimeout(()=>Je(Y*.55),70+Math.random()*70)}async function $e(Y,N,ae,oe,A){const _=ge.camZ,I=ge.camX,F=performance.now();return ge.warpKick=(Math.random()-.5)*40,ge.yawKick=A*oe,ge.fovKick=1,new Promise(z=>{function Z(G){if(p){z();return}const O=Math.min(1,(G-F)/ae),V=Xv(O);ge.camZ=_+(Y-_)*V,ge.camX=I+(N-I)*V,ge.warpKick*=.91,ge.yawKick*=.972,ge.fovKick*=.96,O<1?requestAnimationFrame(Z):z()}requestAnimationFrame(Z)})}function je(Y=1,N=420){if(!k||!w||!t.current)return;const ae=window.innerWidth,oe=window.innerHeight,A=performance.now()+N;function _(){if(performance.now()>A){E(T,ae,oe);return}w.clearRect(0,0,ae,oe),v(T);const F=5+Math.floor(Math.random()*9*Y);for(let Z=0;Z<F;Z++){const G=Math.random()*oe,O=4+Math.random()*56*Y,V=(Math.random()-.5)*150*Y;try{w.drawImage(t.current,0,G,ae,O,V,G,ae,O)}catch{}}w.globalCompositeOperation="screen";const z=Math.round(6*Y);for(let Z=0;Z<z;Z++){const G=Math.random()*oe;w.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],w.globalAlpha=.35+Math.random()*.35,w.lineWidth=.6+Math.random()*1.8,w.beginPath(),w.moveTo(0,G),w.lineTo(ae,G),w.stroke()}if(w.globalCompositeOperation="source-over",w.globalAlpha=1,Math.random()<Y*.14){w.globalAlpha=.5;for(let Z=0;Z<240;Z++)w.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",w.fillRect(Math.random()*ae,Math.random()*oe,2,2);w.globalAlpha=1}requestAnimationFrame(_)}_()}function dt(Y=1,N=340){if(!k||!w)return;const ae=window.innerWidth,oe=window.innerHeight,A=ae/2,_=oe/2,I=14+Math.floor(14*Y),F=Array.from({length:I},()=>Math.random()*Math.PI*2),z=performance.now();function Z(){const O=(performance.now()-z)/N;if(O>=1){E(T,ae,oe);return}w.save(),w.globalCompositeOperation="screen",F.forEach(V=>{const se=30+O*340,ue=se+100+Math.random()*170,le=A+Math.cos(V)*se,ce=_+Math.sin(V)*se,ve=A+Math.cos(V)*ue,Se=_+Math.sin(V)*ue;w.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",w.globalAlpha=(1-O)*(.3+Math.random()*.34)*Y,w.lineWidth=1.2+Math.random()*2,w.beginPath(),w.moveTo(le,ce),w.lineTo(ve,Se),w.stroke()}),w.restore(),requestAnimationFrame(Z)}Z()}async function ht(Y=900){const N=window.innerWidth,ae=window.innerHeight;if(!w)return;const oe=performance.now(),A=S.map(()=>Math.random()*.25);await new Promise(_=>{function I(){if(p){_();return}const F=Math.min(1,(performance.now()-oe)/Y);w.clearRect(0,0,N,ae),S.forEach((z,Z)=>{const G=Math.min(1,Math.max(0,(F-A[Z])/(1-A[Z])));if(G<=0)return;const O=z.pts,V=O.length-1,se=G*V;w.lineWidth=z.width*(1+F*.45),w.strokeStyle=z.color,w.globalAlpha=.65+F*.32,w.shadowColor=z.color,w.shadowBlur=3+F*6,w.beginPath(),w.moveTo(O[0][0],O[0][1]);for(let ce=0;ce<Math.floor(se);ce++)w.lineTo(O[ce+1][0],O[ce+1][1]);const ue=Math.floor(se),le=se-ue;if(ue<V&&le>0){const[ce,ve]=O[ue],[Se,De]=O[ue+1];w.lineTo(ce+(Se-ce)*le,ve+(De-ve)*le)}w.stroke()}),w.globalAlpha=1,w.shadowBlur=0,F<1?requestAnimationFrame(I):_()}I()})}async function mt(){ge.impactT=.55,P(!0),Q&&(Q.spawn(0,-.05,-2,28),Q.spawn(-1.45,-.08,.15,16),Q.spawn(1.45,-.08,.15,16)),je(1.6,340),dt(1.4,260),await ns(160)}async function _t(){P(!0);const Y=c.current;if(!Y)return;Y.innerHTML="";const N=window.innerWidth,ae=window.innerHeight,oe=12,A=8,_=N/oe,I=ae/A,F=N/2,z=ae/2,Z=[];for(let G=0;G<A;G++)for(let O=0;O<oe;O++){const V=O*_,se=G*I,ue=()=>(Math.random()-.5)*16,le=document.createElement("div");le.className="fincine-shard",le.style.left=V+"px",le.style.top=se+"px",le.style.width=_+2+"px",le.style.height=I+2+"px",le.style.clipPath=`polygon(${ue()}px ${ue()}px, ${_+ue()}px ${ue()}px, ${_+ue()}px ${I+ue()}px, ${ue()}px ${I+ue()}px)`,Y.appendChild(le);const ce=V+_/2-F,ve=se+I/2-z,Se=Math.hypot(ce,ve)||1;Z.push({div:le,dx:ce/Se,dy:ve/Se,delay:Se/Math.max(N,ae)*200+Math.random()*70})}Z.forEach(({div:G,dx:O,dy:V,delay:se})=>{const ue=70+Math.random()*160,le=460+Math.random()*460,ce=(Math.random()-.5)*460;G.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${O*ue}px, ${V*ue-22}px) rotate(${ce*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${O*ue*1.4}px, ${V*ue+le}px) rotate(${ce}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:se,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await ns(1530),Y.innerHTML=""}async function ot(){if(R(window.innerWidth,window.innerHeight),Le(),D(),s.current&&s.current.classList.add("fincine-on"),await ns(900),!p){for(let Y=0;Y<m.length&&!p;Y++){const N=m[Y];T=N.crack,r.current&&(r.current.innerHTML=N.final?N.sub:`${N.sub} · рассинхрон канала <b>${N.crack}/4</b>`),Ge(Y),ge.focusZ=ts(Y),N.final&&(ge.focusY=8);const ae=Y%2===0?1:-1;if(N.final){const oe=ts(Y)+$l+280;if(await $e(oe,0,Ma[Y]??2200,.35,ae),p||(Je(.4+N.crack*.2),je(Math.min(1.5,.45+N.crack*.27),300),E(T,window.innerWidth,window.innerHeight),await ns(700),await $e(ts(Y)-$v,-150,950,.5,ae),p))return}else{const oe=ae*70,A=ts(Y)+$l;if(N.crack>=2&&setTimeout(()=>{p||(ge.engineOutT=.5)},Ma[Y]*.4),await $e(A,oe,Ma[Y]??2200,.55+N.crack*.1,ae),p)return}Je(.4+N.crack*.2),je(Math.min(1.5,.45+N.crack*.27),N.final?360:240+N.crack*30),N.final||dt(.8+N.crack*.2,300+N.crack*20),N.crack>=3&&P(!0),E(T,window.innerWidth,window.innerHeight)}p||(await mt(),!p&&(await ht(850),!p&&(await ns(140),await _t(),!p&&b())))}}return ot(),()=>{p=!0,window.removeEventListener("resize",qe),cancelAnimationFrame(X),he.forEach(Y=>Y.dispose()),$==null||$.disposables.forEach(Y=>Y.dispose()),L==null||L.dispose();try{g==null||g.pause()}catch{}}},[]),a.jsxs("div",{className:"fincine-root",onClick:()=>f.current(),children:[a.jsx("canvas",{ref:t,className:"fincine-gl"}),a.jsx("canvas",{ref:i,className:"fincine-crack"}),a.jsx("div",{ref:c,className:"fincine-shatter-layer"}),a.jsx("div",{className:"fincine-vignette"}),a.jsx("div",{className:"fincine-scanlines"}),a.jsx("div",{ref:o,className:"fincine-noise"}),a.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!h,children:[a.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),a.jsx("div",{ref:r,className:"fincine-sub"})]}),a.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),a.jsx(Uo,{}),a.jsx("audio",{ref:l,src:"/quiz-party/intro.mp3",preload:"auto"})]})}function Zv(n){const e=new Map;n.words.forEach((l,d)=>{for(let u=0;u<l.word.length;u++){const f=l.dir==="down"?l.row+u:l.row,h=l.dir==="across"?l.col+u:l.col,p=`${f},${h}`,x=e.get(p)??{r:f,c:h,words:[],ch:l.word[u].toUpperCase()};x.words.push(d),u===0&&(x.num=l.number),e.set(p,x)}});const t=[...e.values()],i=l=>n.words.findIndex(d=>d.number===l),s=l=>n.words[i(l)],r=l=>{const d=s(l),u=i(l);return d?t.filter(f=>f.words.includes(u)).sort((f,h)=>d.dir==="down"?f.r-h.r:f.c-h.c):[]},o=t.map(l=>l.r),c=t.map(l=>l.c);return{grid:n,cells:t,nums:[...n.words.map(l=>l.number)].sort((l,d)=>l-d),W:s,wordCells:r,cellNums:l=>l.words.map(d=>n.words[d].number),dirRu:l=>{var d;return((d=s(l))==null?void 0:d.dir)==="down"?"по вертикали":"по горизонтали"},bb:t.length?{r0:Math.min(...o),r1:Math.max(...o),c0:Math.min(...c),c1:Math.max(...c)}:{r0:0,r1:0,c0:0,c1:0}}}const pr=n=>Ch(n).replace(/\s/g,"");function Jv(n,e,t){var o;const i=pr(e??""),s=i?n.words.filter(c=>pr(c.word)===i):[];if(s.length===1)return s[0].number;const r=n.words.find(c=>c.number===t+1);return r&&(!s.length||s.includes(r))?r.number:((o=s[0])==null?void 0:o.number)??(r==null?void 0:r.number)??null}function Qv(n,e){return e.map((t,i)=>Jv(n,t.answer.mode==="crossword_word"?t.answer.word:void 0,i))}function eM(n,e){const t=pr(n).toUpperCase(),i=pr(e).toUpperCase();return t.length>i.length+2?null:[...t].map((s,r)=>({ch:s,st:r>=i.length?"extra":s===i[r]?"ok":"bad"}))}const mr=n=>n.length>160?" xl xxl":n.length>70?" xl":n.length>40?" lg":"",ba={review:560,complete:660};function tM(n,e,t={}){const i=n.c1-n.c0+1,s=n.r1-n.r0+1;if(e==="question"){const c=t.right??1520,l=1920-c,d=Math.max(200,(t.bottom??876)-96),u=Math.max(24,Math.min(78,Math.floor((c-l)/i),Math.floor(d/s))),f=(l+c)/2;return{P:u,OX:f-i*u/2,OY:96+Math.max(0,(d-s*u)/2)}}if(e==="complete"){const o=Math.max(24,Math.min(66,Math.floor((t.maxW??924)/i),Math.floor(660/s)));return{P:o,OX:70,OY:200+Math.max(0,(660-s*o)/2)}}const r=Math.max(22,Math.min(56,Math.floor((t.maxW??784)/i),Math.floor(560/s)));return{P:r,OX:44,OY:310+Math.max(0,(560-s*r)/2)}}function Su(n,e){const i=Math.max(40,Math.min(88,Math.floor(680/Math.max(1,n)))),s=Math.max(34,Math.min(62,Math.floor(704/Math.max(1,e+2)))),r=Math.min(s-8,i-10);return{ROW0:392,ROWH:i,COL:s,lt:r}}function nM(n,e){const t=Math.max(40,Math.min(92,Math.floor(740/Math.max(1,n)))),i=Math.max(26,Math.min(40,Math.floor(t-12),Math.floor(560/Math.max(1,e))-8));return{top:300,step:t,pip:i}}function iM(n){const e=n%10,t=n%100;return e===1&&t!==11?"команда":e>=2&&e<=4&&(t<12||t>14)?"команды":"команд"}const Lo=1e3,os=292,sM=Array.from({length:70},(n,e)=>({x:e*977%1900+10,y:e*613%1040+20,s:2+e%3,d:e%9*.6})),rM=[{x:60,y:80,w:860,h:860}];function wu(n,e,t){const i=tM(n.bb,e,t);return{g:i,cx:o=>i.OX+(o-n.bb.c0)*i.P+i.P/2,cy:o=>i.OY+(o-n.bb.r0)*i.P+i.P/2,orb:i.P*(e==="complete"?.72:.62)}}function Eu({m:n,mode:e,title:t,qn:i,qcount:s,cur:r,next:o=null,past:c,shown:l,curLit:d,clue:u,parts:f,lifts:h,tally:p,n:x,total:b,rootRef:m,cls:g="",bottom:y,right:w,maxW:S,side:T,timer:M=!0}){var re;const R=e!=="question",v=e==="complete",{cx:E,cy:P,orb:D}=wu(n,e,{bottom:y,right:w,maxW:S}),L=r!=null?n.wordCells(r):[],W=new Set(L.map($=>`${$.r},${$.c}`)),B=new Set(o!=null?n.wordCells(o).map($=>`${$.r},${$.c}`):[]),X=$=>n.wordCells($).map((Q,Me)=>`${Me?"L":"M"} ${E(Q.c)} ${P(Q.r)}`).join(" "),k=r!=null?((re=n.W(r))==null?void 0:re.word)??"":"",U=Su(Math.max(1,...(f??[]).map($=>$.rows.length)),Math.max(k.length,...(f??[]).map($=>{var Q;return((Q=n.W($.num))==null?void 0:Q.word.length)??0}))),K=U.ROWH===88&&U.COL===62&&U.lt===54,ie=K?void 0:{"--lt":`${U.lt}px`,"--ltf":`${Math.round(U.lt*.555)}px`,"--gap":`${U.COL-U.lt}px`},pe=$=>{const Q=n.cellNums($),Me=`${$.r},${$.c}`,Le=Q.some(qe=>l(qe)),Ce=W.has(Me)&&!v;return v?"rev":Ce?d?"rev":R?"seal":"act":Le?"rev":Q.some(qe=>c(qe))?"seal":"cold"},he=$=>$.rows.map((Q,Me)=>a.jsxs("div",{className:`cwC-trow ${$.cls}`,"data-ti":Me,style:{top:U.ROW0+Me*U.ROWH-U.ROWH/2,...K?null:{height:U.ROWH,...ie},...$.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-nm ${$.cls}`,style:{color:Q.color},children:Q.name}),a.jsx("span",{className:"cwC-cells",children:$.covered?a.jsx("span",{className:"cwC-al",children:Array.from({length:n.W($.num).word.length},(Le,Ce)=>a.jsx("i",{className:"cwC-lt cov",children:a.jsx("b",{className:"ch",style:{opacity:0},children:"•"})},Ce))}):a.jsx(oM,{answer:Q.answer,word:n.W($.num).word,judged:$.judged})}),!$.covered&&$.judged&&a.jsx(cM,{v:Q.verdict})]},Q.key)),me=$=>a.jsxs("div",{className:`cwC-ans ${$.cls}`,style:{top:os-44,...ie,...$.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-lab ${$.cls}`,children:"Правильный ответ"}),a.jsx("span",{className:"cwC-cells",children:a.jsx("span",{className:"cwC-al",children:[...n.W($.num).word.toUpperCase()].map((Q,Me)=>a.jsx("i",{className:"cwC-lt ok big",children:a.jsx("b",{className:"ch",style:$.covered?{opacity:0}:void 0,children:Q})},Me))})})]}),Pe=$=>a.jsxs("div",{className:`cwC-rec ${$.cls}${mr($.clue)}`,style:$.hidden?{opacity:0}:void 0,children:[a.jsxs("em",{children:["Разбор · слово ",$.num," · ",n.dirRu($.num),$.recExtra??""]}),$.clue,$.note?a.jsx("span",{className:"cwC-rnote",children:$.note}):null]}),ge=p?nM(p.rows.length,n.nums.length):null,Be=!ge||ge.step===92&&ge.pip===40;return a.jsxs(pn,{rects:rM,n:x,rootRef:m,cls:`s3 cw cwC ${g}`,children:[Fo(t,i,s),a.jsx("div",{className:"cwC-dust","aria-hidden":!0,children:sM.map(($,Q)=>a.jsx("i",{style:{left:$.x,top:$.y,width:$.s,height:$.s,animationDelay:`${$.d}s`}},Q))}),a.jsxs("div",{className:"cwC-map",children:[a.jsxs("svg",{className:"cwC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[n.nums.map($=>{const Q=v||c($),Me=$===r&&!v;return a.jsx("path",{className:`cwC-line${Me?" now":Q?" old":""}`,"data-n":$,...$===o?{"data-nx":1}:{},d:X($)},$)}),h&&L.map(($,Q)=>{const Me=Lo+Q*U.COL+U.COL/2,Le=E($.c),Ce=P($.r);return a.jsx("path",{className:"cwC-beam","data-k":Q,d:`M ${Le} ${Ce} C ${Le+120} ${Ce} ${Me-160} ${os} ${Me} ${os}`},Q)})]}),n.cells.map($=>{const Q=n.cellNums($),Me=`${$.r},${$.c}`,Le=W.has(Me)&&!v,Ce=L.findIndex(qe=>qe===$);return a.jsxs("div",{className:`cwC-orb ${pe($)}${$.words.length>1?" x":""}`,"data-n":Q.join(" "),style:{left:E($.c)-D/2,top:P($.r)-D/2,width:D,height:D,"--d":`${($.r*3+$.c)%7*.5}s`},...Le&&R?{"data-cur":1,"data-k":Ce,...Q.some(qe=>l(qe))?{"data-old":1}:{}}:{},...B.has(Me)?{"data-nx":1}:{},children:[$.words.length>1&&a.jsx("i",{className:"flare"}),a.jsx("span",{className:"core",children:a.jsx("b",{className:"ch",style:{fontSize:D*.56},children:$.ch})}),$.num&&a.jsx("em",{className:"num",style:{left:-D*.1,top:-D*.28},children:$.num})]},Me)})]}),T,!R&&u&&a.jsxs("div",{className:"cwC-clue",children:[r!=null&&a.jsxs("div",{className:"k",children:["слово ",r," · ",n.dirRu(r)," · ",k.length," ",aM(k.length)]}),a.jsx("div",{className:`t${mr(u.text)}`,children:u.text}),u.answer?a.jsx("div",{className:"cwC-open",children:u.answer}):null,u.note?a.jsx("div",{className:"cwC-note",children:u.note}):null]}),R&&!v&&f&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cwC-veil"}),f.map($=>a.jsxs(H.Fragment,{children:[Pe($),me($),he($),$.cls==="p1"&&h&&L.map((Q,Me)=>a.jsx("div",{className:"cwC-lift","data-k":Me,style:{left:Lo+Me*U.COL,top:os-U.lt/2,...K?null:{width:U.lt,height:U.lt,...ie}},children:a.jsx("i",{className:"cwC-lt ok big"})},"l"+Me))]},$.cls+$.num))]}),v&&p&&a.jsxs("div",{className:"cwC-tally",children:[a.jsxs("div",{className:"cwC-rec pd",children:[a.jsx("em",{children:"Кроссворд разгадан"}),"Угадано слов из ",n.nums.length]}),p.rows.map(($,Q)=>a.jsxs("div",{className:"cwC-tr",style:{top:ge.top+Q*ge.step,...Be?null:{height:Math.min(80,ge.step),"--pip":`${ge.pip}px`,"--pipf":`${Math.round(ge.pip/2)}px`}},children:[a.jsx("span",{className:"cwC-nm",style:{color:$.color},children:$.name}),a.jsx("span",{className:"pips",children:n.nums.map((Me,Le)=>a.jsx("i",{className:$.pips[Le]===!0?"ok":$.pips[Le]===!1?"no":"nil",children:Me},Me))}),a.jsx("b",{className:"sum",children:$.sum})]},$.key))]}),!R&&M&&a.jsx(Oo,{n:x,total:b})]})}const aM=n=>{const e=n%10,t=n%100;return e===1&&t!==11?"буква":e>=2&&e<=4&&(t<12||t>14)?"буквы":"букв"};function oM({answer:n,word:e,judged:t=!0}){if(n==null)return a.jsx("span",{className:"cwC-none",children:"не ответили"});const i=eM(n,e);if(!i)return a.jsx("span",{className:`cwC-txt${mr(n)}`,children:a.jsx("b",{className:"ch",children:n})});const s=Math.max(e.length,i.length);return a.jsx("span",{className:"cwC-al",children:Array.from({length:s},(r,o)=>{const c=i[o];return a.jsx("i",{className:`cwC-lt ${c?t?c.st:"neu":"miss"}`,children:a.jsx("b",{className:"ch",children:(c==null?void 0:c.ch)??""})},o)})})}function cM({v:n}){return a.jsx("span",{className:`cwC-mk ${n===!0?"ok":n===!1?"no":"nil"}`,children:n===!0?a.jsxs(a.Fragment,{children:[a.jsx("b",{children:"✓"}),a.jsx("em",{children:"+1"})]}):n===!1?a.jsx("b",{children:"✗"}):a.jsx("b",{children:"—"})})}function lM(n,e,t){const i=mr(n),s=i.includes("xxl")?31:i.includes("xl")?38:i.includes("lg")?44:52,o=40+Math.max(1,Math.ceil(n.length/(1260/(s*.52))))*s*1.14+(e?62:0)+(t?Math.ceil(t.length/90)*30:0);return Math.round(1046-o-24)}function dM({m:n,title:e,qn:t,qcount:i,cur:s,past:r,clue:o,answer:c,note:l,n:d,total:u,side:f,sideN:h}){const p=H.useRef(null),x=H.useMemo(()=>nt.utils.selector(p),[]),b=lM(o,!!c,c?l:""),m=h?1300:void 0;H.useLayoutEffect(()=>{const S=nt.timeline();return S.fromTo(x(".cwC-dust i"),{opacity:0},{opacity:1,duration:1,stagger:.01},0).fromTo(x(".cwC-line"),{strokeDashoffset:900},{strokeDashoffset:0,duration:1.2,stagger:.08,ease:"power2.out"},.2).fromTo(x(".cwC-orb"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,stagger:{each:.016,from:"random"},ease:"back.out(2)"},.4).fromTo(x(".cwC-clue"),{y:30,opacity:0},{y:0,opacity:1,duration:.7},1.2).fromTo(x(".cwC-side"),{opacity:0},{opacity:1,duration:.7},.8),()=>{S.kill()}},[]);const g=!!c,y=H.useRef(g);H.useLayoutEffect(()=>{if(!g||y.current){y.current=g;return}y.current=!0;const S=nt.timeline();return S.fromTo(x(".cwC-orb.rev .ch"),{opacity:0},{opacity:1,duration:.4,stagger:.1},0).fromTo(x(".cwC-open, .cwC-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5,stagger:.15},.3),()=>{S.kill()}},[g]);const w=h>0&&f?a.jsx("div",{className:`cwC-side${h>2?" grid":""}`,style:{left:1340,right:40,top:110,height:Math.max(180,b-130)},children:f}):null;return a.jsx(Eu,{m:n,mode:"question",title:e,qn:t,qcount:i,cur:s,past:S=>r.has(S),shown:()=>!1,curLit:g,clue:{text:o,answer:c??void 0,note:c&&l?l:void 0},n:d,total:u,rootRef:p,cls:`st-question${g?" open":""}`,bottom:b,right:m,side:w})}function uM({m:n,title:e,qn:t,qcount:i,cur:s,reviewed:r,revealed:o,checked:c,clue:l,note:d,rows:u,answered:f,tally:h,side:p,sideN:x}){var L;const b=H.useRef(null),m=H.useMemo(()=>nt.utils.selector(b),[]),[g,y]=H.useState(o?"open":"covered"),[w,S]=H.useState(!1);H.useEffect(()=>{o?g==="covered"&&y("anim"):y("covered")},[o]);const T=c&&g==="open",M=w&&h?"complete":"review",R=s!=null?((L=n.W(s))==null?void 0:L.word)??"":"",v=Su(u.length,R.length);H.useLayoutEffect(()=>{const W=nt.timeline();return W.fromTo(m(".cwC-veil"),{opacity:0},{opacity:1,duration:.6},0).fromTo(m(".cwC-rec, .cwC-lab, .cwC-nm, .cwC-trow, .cwC-ans, .cwC-side"),{opacity:0,y:-14},{opacity:1,y:0,duration:.5,stagger:.03},.1),()=>{W.kill()}},[]),H.useLayoutEffect(()=>{if(g!=="anim"||s==null)return;const W=n.wordCells(s),B=Math.max(1,W.length),{cx:X,cy:k,orb:U}=wu(n,"review",{maxW:ba.review}),K=nt.timeline({onComplete:()=>y(me=>me==="anim"?"open":me)});K.fromTo(m(".cwC-ans .ch, .cwC-trow .ch"),{opacity:0},{opacity:0,duration:.01},0).fromTo(m(".cwC-ans .cwC-lt, .cwC-trow .cwC-lt, .cwC-trow .cwC-none, .cwC-trow .cwC-txt"),{opacity:0,scale:.4},{opacity:0,scale:.4,duration:.01},0);const ie=Math.min(.12,.5/B);W.forEach((me,Pe)=>{const ge=m(`.cwC-lift[data-k="${Pe}"]`)[0],Be=X(me.c)-(Lo+Pe*v.COL+v.lt/2),re=k(me.r)-os,$=.1+Pe*ie,Q=$+.9;ge&&K.fromTo(ge,{x:Be,y:re,scale:U/v.lt,opacity:1},{keyframes:[{x:Be*.4,y:re*.4-60,scale:1.1,duration:.5,ease:"sine.inOut"},{x:0,y:0,scale:1,duration:.4,ease:"power2.out"}]},$).to(ge,{opacity:0,duration:.15},Q),K.fromTo(m(`.cwC-beam[data-k="${Pe}"]`),{strokeDashoffset:600,opacity:0},{strokeDashoffset:0,opacity:.9,duration:.5,ease:"power1.out"},$).to(m(`.cwC-beam[data-k="${Pe}"]`),{opacity:0,duration:.4},Q-.1).fromTo(m(`.cwC-ans .cwC-lt:nth-child(${Pe+1})`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2},Q).fromTo(m(`.cwC-ans .cwC-lt:nth-child(${Pe+1}) .ch`),{opacity:0},{opacity:1,duration:.2},Q).fromTo(m(`.cwC-orb[data-cur][data-k="${Pe}"]`),{"--on":0,"--glow":.6},{"--on":1,"--glow":1,duration:.35,ease:"power1.out"},Q)});const pe=Math.max(.1+(B-1)*ie+.9+.5,2),he=Math.min(.55,2.4/Math.max(1,u.length));return u.forEach((me,Pe)=>{K.fromTo(m(`.cwC-trow[data-ti="${Pe}"] .cwC-lt, .cwC-trow[data-ti="${Pe}"] .cwC-none, .cwC-trow[data-ti="${Pe}"] .cwC-txt`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.3,stagger:.04,ease:"back.out(2)"},pe+Pe*he).fromTo(m(`.cwC-trow[data-ti="${Pe}"] .ch`),{opacity:0},{opacity:1,duration:.25,stagger:.04},pe+Pe*he+.1)}),K.to({},{duration:.3}),()=>{K.kill()}},[g]),H.useLayoutEffect(()=>{if(!T||M!=="review")return;const W=nt.timeline();return W.fromTo(m(".cwC-mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:.12,ease:"back.out(2.5)"},0),()=>{W.kill()}},[T]);const E=!!h&&T;H.useEffect(()=>{if(!E){S(!1);return}const W=setTimeout(()=>S(!0),8e3);return()=>clearTimeout(W)},[E]),H.useLayoutEffect(()=>{if(M!=="complete")return;const W=nt.timeline();return W.fromTo(m(".cwC-orb"),{"--glow":.4,scale:1},{"--glow":1,scale:1.12,duration:.5,yoyo:!0,repeat:1,stagger:{each:.02,from:"center"}},.2).fromTo(m(".cwC-tally > *"),{opacity:0,x:20},{opacity:1,x:0,duration:.45,stagger:.1},.6),()=>{W.kill()}},[M]);const P=g==="covered",D=s!=null?[{num:s,cls:"p1",covered:P,clue:l,judged:T,recExtra:P&&u.length?` · ответили ${f} ${iM(f)}`:"",note:T&&d?d:void 0,rows:u.map(W=>({...W,verdict:T?W.verdict:null}))}]:[];return a.jsx(Eu,{m:n,mode:M,title:e,qn:t,qcount:i,cur:s,past:W=>r.has(W),shown:W=>r.has(W),curLit:g==="open",parts:D,lifts:g==="anim",tally:M==="complete"&&h?{rows:h}:void 0,n:null,total:1,rootRef:b,cls:`st-${M==="complete"?"complete":"review"} rev`,timer:!1,maxW:M==="complete"?ba.complete:ba.review,side:M==="review"&&x>0&&p?a.jsx("div",{className:`cwC-side${x>1?" row":""}`,style:{left:44,top:96,width:540,height:190},children:p}):void 0})}const hM=n=>/\.(mp3|mp4|webm|wav)$/i.test(n),Kl=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n),tc=n=>{var e;return((e=n.settings)==null?void 0:e.grid)??null};function Tu(n){const e=tc(n),t=H.useMemo(()=>Zv(e),[e]),i=H.useMemo(()=>Qv(e,n.questions),[e,n.questions]);return{m:t,nums:i}}const Au=(n,e)=>a.jsx("div",{className:"cwC-sc",children:a.jsx("img",{src:n,alt:""})},e);function fM({pack:n,round:e,q:t,qIndex:i,qCount:s,gameState:r,effectsSlot:o,actionsSlot:c}){var v;const{m:l,nums:d}=Tu(e),u=r.timer_started_at,f=hd(u,e.timer_seconds,!0),p=((v=n.settings)!=null&&v.answers_reveal&&e.answers_reveal==="after_question",e.answers_reveal??"after_round")==="after_question"&&r.reveal,x=new Set(d.slice(0,i).filter(E=>E!=null)),b=t.media.question??[],m=t.media.hidden?[]:b.filter(E=>!hM(E)),g=b.filter(E=>/\.(mp4|webm)$/i.test(E)),y=t.media.answer??[],w=p?y.filter(E=>!Kl(E)):[],S=p?y.find(Kl):void 0,T=w.length?w:m,M=t.answer.mode==="crossword_word"?t.answer.word:"",R=[...T.slice(0,4).map((E,P)=>Au(He(E),P)),...t.media.hidden?[]:g.map((E,P)=>a.jsx("div",{className:"cwC-sc",children:a.jsx(yc,{src:He(E),hidden:!1,waitFor:!!t.media.voice,go:!!u})},"v"+P))];return a.jsxs(a.Fragment,{children:[a.jsx(Uo,{}),o,S&&a.jsx(is,{src:He(S)}),t.media.hidden&&g.map((E,P)=>a.jsx(yc,{src:He(E),hidden:!0,waitFor:!!t.media.voice,go:!!u},P)),a.jsx(dM,{m:l,title:e.title_lines.join(" "),qn:i+1,qcount:s,cur:d[i]??null,past:x,clue:t.question_text.trim(),answer:p?M.toUpperCase():null,note:t.answer_note??"",n:u?f.left:e.timer_seconds,total:e.timer_seconds,side:R,sideN:R.length}),c]})}function pM({pack:n,round:e,q:t,step:i,answers:s,teams:r,allTeams:o,revealed:c,checked:l,paper:d,effects:u,imgs:f,video:h,actions:p}){const{m:x,nums:b}=Tu(e),m=(E,P)=>P?P.is_correct??Pi(E.answer,P.answer_text):null,g=s.filter(E=>E.question_ref===`q-${t.id}`),y=[...r,...o.filter(E=>!r.some(P=>P.id===E.id)&&s.some(P=>P.team_id===E.id))],w=E=>Oi(En(E)),S=d?[]:y.map(E=>{var L;const P=g.find(W=>W.team_id===E.id),D=((L=P==null?void 0:P.answer_text)==null?void 0:L.trim())||null;return{key:E.id,name:`${"icon"in E&&E.icon?`${E.icon} `:""}${E.name}`,color:w(E.color),answer:D,verdict:m(t,P)}}),T=g.filter(E=>{var P;return(P=E.answer_text)==null?void 0:P.trim()}).length,M=new Set(b.slice(0,i).filter(E=>E!=null)),R=i>=e.questions.length-1;let v=null;return R&&!d&&y.length&&(v=y.map((E,P)=>{const D=x.nums.map(L=>{const W=b.indexOf(L),B=e.questions[W];return B?m(B,s.find(X=>X.question_ref===`q-${B.id}`&&X.team_id===E.id)):null});return{key:E.id,name:E.name,color:w(E.color),pips:D,sum:D.filter(L=>L===!0).length,i:P}}).sort((E,P)=>P.sum-E.sum||E.i-P.i)),a.jsxs(a.Fragment,{children:[u,a.jsx(uM,{m:x,title:e.title_lines.join(" "),qn:i+1,qcount:e.questions.length,cur:b[i]??null,reviewed:M,revealed:c,checked:l,clue:t.question_text.trim(),note:t.answer_note??"",rows:S,answered:T,tally:v,side:[...h?[a.jsx("div",{className:"cwC-sc",children:h},"v")]:[],...f.slice(0,h?1:2).map((E,P)=>Au(He(E),P))],sideN:Math.min(2,f.length+(h?1:0))}),p]})}const Sa={top:92,bottom:1050,head:56};function mM(n){if(n<=7)return{cols:1,rowH:null,gap:8,nameFs:21,txtFs:32,mk:56,txtLines:2,padL:44};const e=n<=12?1:2,t=Math.ceil(n/e),i=n<=12?6:5,s=Math.floor((Sa.bottom-Sa.top-Sa.head-i*(t-1))/t),r=Math.min(1,s/118);return e===1?{cols:e,rowH:s,gap:i,nameFs:Math.round(Math.max(15,21*Math.sqrt(r))),txtFs:Math.round(Math.max(20,32*r)),mk:Math.round(Math.max(30,56*r)),txtLines:s>=90?2:1,padL:34}:{cols:e,rowH:s,gap:i,nameFs:s>=60?15:13,txtFs:s>=60?20:17,mk:s>=60?30:24,txtLines:1,padL:22}}const cn={width:1800,gap:10,labH:100};function Cu(n){if(n<=0)return{cols:0,rows:0,cw:null,rowH:0,gap:0,nameFs:17,txtFs:25,mk:34,lift:0,height:0};if(n===6)return{cols:6,rows:1,cw:null,rowH:cn.labH,gap:10,nameFs:17,txtFs:25,mk:34,lift:0,height:cn.labH};const e=n<=6?1:n<=12?2:n<=24?3:4,t=Math.ceil(n/e),i=(cn.width-cn.gap*5)/6,s=Math.min(e===1?i:440,Math.floor((cn.width-cn.gap*(t-1))/t)),r=e===1?cn.labH:e===2?56:e===3?40:32,o=e===1?10:6,c=e*r+(e-1)*o,l=e===1?[17,25,34]:e===2?[15,21,30]:e===3?[13,17,24]:[12,15,22];return{cols:t,rows:e,cw:s,rowH:r,gap:o,nameFs:l[0],txtFs:l[1],mk:l[2],lift:Math.max(0,c-cn.labH),height:c}}function nc(n,e,t,i,s=Math.round(t*.6),r=.52){const o=Math.max(1,n.length);for(let c=t;c>s;c-=1)if(Math.ceil(o*r*c/e)<=i)return c;return s}const Ru="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",Nu=(n,e)=>n.text==null?"nil":e?n.ok===!0?"ok":n.ok===!1?"no":"un":"un",Pu=n=>n==="ok"?"✓":n==="no"?"✗":n==="nil"?"—":null,Lu=n=>n.stake!=null&&n.stake!==0&&n.text!=null?a.jsxs("small",{className:"stk",children:[" · ",n.stake]}):null;function gM({rows:n,phase:e="all",judged:t=!0,lay:i,count:s}){const r=!!i,o=i?{"--rh":`${i.rowH??118}px`,"--gap":`${i.gap}px`,"--nfs":`${i.nameFs}px`,"--tfs":`${i.txtFs}px`,"--mks":`${i.mk}px`,"--tl":i.txtLines,"--pl":`${i.padL}px`,"--cols":i.cols}:void 0,c=i?(580-(i.cols-1)*12)/i.cols-i.padL-i.mk-30:0;return a.jsxs("div",{className:`s4-teams${r?` g c${i.cols}`:""}`,style:o,children:[a.jsxs("div",{className:"s4-th",children:["Ответы команд",s!=null&&a.jsx("span",{className:"s4-cnt",children:s})]}),n.map((l,d)=>{const u=Nu(l,t),f=e==="all"||t?Pu(u):null,h=l.text??"не ответили",p=r&&l.text!=null?nc(h,c,i.txtFs,i.txtLines):void 0;return a.jsxs("div",{className:`s4-ta ${u}`,"data-i":d,children:[a.jsx("svg",{className:"s4-ta-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Ru})}),a.jsx("span",{className:"nm",style:{color:l.color},children:l.name}),e!=="open"&&a.jsx("span",{className:"dots",children:"• • •"}),e!=="dots"&&a.jsxs("span",{className:"txt",style:p&&p!==i.txtFs?{fontSize:p}:void 0,children:[h,Lu(l)]}),(e==="all"||f!=null)&&a.jsx("i",{className:"mk",children:f})]},l.key)})]})}function Iu({rows:n,top:e=958,phase:t="all",judged:i=!0,lay:s,count:r}){const o=!!s,c={top:e};s&&Object.assign(c,{"--cols":s.cols,"--cw":s.cw!=null?`${s.cw}px`:"1fr","--rh":`${s.rowH}px`,"--gap":`${s.gap}px`,"--nfs":`${s.nameFs}px`,"--tfs":`${s.txtFs}px`,"--mks":`${s.mk}px`});const l=s?s.cw??(cn.width-cn.gap*5)/6:0;return a.jsxs(a.Fragment,{children:[r!=null&&a.jsx("div",{className:"s4-scnt",style:{top:e-40},children:r}),a.jsx("div",{className:`s4-strip${o?` g r${s.rows}`:""}`,style:c,children:n.map(d=>{const u=Nu(d,i),f=t==="all"||i?Pu(u):null,h=d.text??"не ответили",p=o&&d.text!=null?nc(h,l-s.mk-40,s.txtFs,1):void 0;return a.jsxs("div",{className:`s4-sl ${u}`,children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:Ru})}),a.jsx("span",{className:"nm",style:{color:d.color},children:d.name}),o&&t!=="open"&&t!=="all"&&a.jsx("span",{className:"dots",children:"• • •"}),t!=="dots"&&a.jsxs("span",{className:"txt",style:p&&p!==s.txtFs?{fontSize:p}:void 0,children:[h,Lu(d)]}),(t==="all"||f!=null)&&a.jsx("i",{className:"mk",children:f})]},d.key)})})]})}const xM="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",_M={text:"revtext",mc:"revmc",img:"revimg",imgopt:"revimgopt"},Io={top:84,width:1160};function Du(n){const e=(t,i)=>Math.ceil(Math.max(1,n.length)*.5*t/Io.width)<=i;for(const[t,i]of[[40,3],[34,4],[30,5]])if(e(t,i))return t;return 26}const vM=(n,e=Du(n))=>Io.top+Math.ceil(Math.max(1,n.length)*.5*e/Io.width)*e*1.14;function wa(n,e,t,i,s=40){const r=n.toUpperCase().split(/\s+/).filter(Boolean);for(let o=t;o>=s;o-=2){const c=u=>u.length*(.66*o+6);if(r.some(u=>c(u)>e))continue;let l=1,d=0;for(const u of r){const f=(d?.35*o:0)+c(u);d&&d+f>e?(l++,d=c(u)):d+=f}if(l*o<=i)return{fs:o,lines:l}}return{fs:s,lines:3}}function MM(n,e=0){var h;const t=Du(n.question),i=vM(n.question,t),s=Math.max(190,Math.round(i+22));let r=[],o=[];if(n.kind==="img"&&n.photos.length){const p=n.photos.slice(0,4),x=((h=n.captions)!=null&&h.length?620:710)-s;if(p.length===1&&!p[0].video)r=[Js(p[0],380+e,s,640,880-s)];else if(p.length===1)r=[Js(p[0],650+e,s,900,x)];else{const m=p.reduce((T,M)=>T+M.w/M.h,0),g=Math.round(Math.min(x,(1160-40*(p.length-1))/m)),y=p.map(T=>Math.round(T.w/T.h*g)),w=y.reduce((T,M)=>T+M,0)+40*(p.length-1);let S=Math.round(650+e-w/2);r=y.map(T=>{const M={x:S,y:s,w:T,h:g};return S+=T+40,M})}o=p.map(b=>b.video?xM:b.src)}if(n.kind==="imgopt"&&n.photos.length){const p=n.photos.length,x=p<=3?p:p===4?2:3,b=Math.ceil(p/x),m=1200/x,g=(890-s+40)/b;r=n.photos.map((y,w)=>Js(y,60+e+m*(w%x+.5),Math.round(s+Math.floor(w/x)*g),m-80,Math.min(520,g-40))),o=n.photos.map(y=>y.src)}const c=Math.max(1,n.options.length),l=1160/c,d=n.kind==="img"&&n.photos.length===1&&!n.photos[0].video,u=d?wa(n.answer,540,330,104):n.kind==="img"?wa(n.answer,1160,104,150):wa(n.answer,1160,150,250),f=d?Math.max(s+70,s+Math.round(r[0].h/2)-40):0;return{side:d,sideTop:f,dx:e,recallFs:t,frame:{rects:r,srcs:o},ans:u,ansBase:n.kind==="img"?104:150,cx:p=>70+e+l*(p+.5),optW:Math.min(270,Math.round(l-20)),flower:Math.min(1,l/290),optFs:Math.min(32,...n.options.map(p=>nc(p.text,Math.min(270,Math.round(l-20)),32,3,20,.56))),noteTop:n.kind==="text"?730:n.kind==="mc"?900:992}}function yM(n,e){n.fromTo(e(".s4-recall"),{opacity:0,y:-10},{opacity:1,y:0,duration:.5},.1)}function bM(n,e){n.fromTo(e(".s4-th, .s4-ta"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.07},.3).fromTo(e(".s4-ta .txt, .s4-ta .mk"),{opacity:0},{opacity:0,duration:.01},.3)}function SM(n,e,t){n.to(e(".s4-ta .dots"),{opacity:0,duration:.3,stagger:.06},t).fromTo(e(".s4-ta .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.07},t)}function wM(n,e,t,i=.2){n.fromTo(e(".s4-ta .mk"),{opacity:0,scale:0,rotation:-40},{opacity:1,scale:1,rotation:0,duration:.4,stagger:i,ease:"back.out(2.4)"},t)}const Uu=n=>n.replace(/\s/g,"").length;function EM(n,e,t,i,s,r=!1){const{R:o,k:c}=s,l=Uu(t.answer);if(t.kind==="text")return n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},o-.4).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},o).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},o+.1).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1.2},o+.6).fromTo(e(".s4-fl"),{scale:0,rotation:-60},{scale:1,rotation:0,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},o+l*c+.3),{show:o+.9,mark:o+l*c+1.2};if(t.kind==="mc"){const u=t.correct;return t.options.forEach((f,h)=>{h===u?n.fromTo(e(`.s4-mf[data-i="${h}"]`),{scale:1},{scale:1.25,svgOrigin:"0 0",duration:.9,ease:"back.out(2)"},o+.9).fromTo(e(`.s4-mf[data-i="${h}"] .pt`),{fill:"#c9b6ff"},{fill:"#ffd986",duration:.9},o+.9).fromTo(e(`.s4-halo[data-i="${h}"]`),{opacity:0,attr:{r:36}},{opacity:1,attr:{r:124},duration:.9,ease:"power2.out"},o+.9).fromTo(e(`.s4-opt[data-i="${h}"]`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.6},o+1):u>=0&&n.to(e(`.s4-mf[data-i="${h}"]`),{scale:.62,rotation:h%2?-16:16,svgOrigin:"0 0",duration:1,ease:"power2.inOut"},o+.2+h*.1).to(e(`.s4-mf[data-i="${h}"] .pt`),{fill:"#5d5a7a",duration:1},o+.2+h*.1).to(e(`.s4-opt[data-i="${h}"]`),{opacity:.45,duration:.8},o+.3+h*.1)}),n.fromTo(e(".s4-gl"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.3,ease:"power1.in"},o),{show:o+.9,mark:o+2.3}}if(t.kind==="img"){const u=s.lt??o+1.1,f=i.bloom.map((p,x)=>x),h=p=>Object.fromEntries(f.map(x=>[x,p]));return r&&f.length&&n.fromTo(i.grow,h(0),{...h(1),duration:.6,ease:"power2.out"},o).fromTo(i.reveal,h(0),{...h(1),duration:.6,ease:"power2.inOut"},o+.2),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o),f.length&&n.fromTo(i.bloom,h(0),{...h(1),duration:1.4,ease:"power1.out"},o+.6),n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},u-.3).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},u-.1).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},u).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1},u+.3),{show:u+.5,mark:u+1.9}}const d=t.correct;return t.photos.forEach((u,f)=>{f===d?n.fromTo(i.bloom,{[f]:0},{[f]:1,duration:1.4,ease:"power1.out"},o+.8):d>=0&&n.fromTo(i.reveal,{[f]:1},{[f]:0,duration:1.1,ease:"power2.in"},o+.2+f*.12)}),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o+.5).fromTo(e(".s4-capt"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},o+1.8),{show:o+1.4,mark:o+2.8}}const Zl=(n,e,t,i)=>Array.from({length:n},(s,r)=>a.jsx("g",{transform:`rotate(${r*360/n})`,children:a.jsx("ellipse",{className:"pt",cx:"0",cy:i,rx:e,ry:t})},r));function Ea(n){const e=n.toUpperCase().split(/\s+/).filter(Boolean);return e.length<=1?(e[0]??"").split("").map((t,i)=>a.jsx("span",{className:"l",children:t},i)):e.map((t,i)=>a.jsx("span",{className:"wd",children:t.split("").map((s,r)=>a.jsx("span",{className:"l",children:s},r))},i))}function TM({d:n,ly:e,fs:t,rows:i,phase:s="all",judged:r=!0,colLay:o,count:c,shown:l=!0,n:d=null,rootRef:u,cls:f="",video:h}){const{dx:p}=e,x=M=>M+p,b=[{x:x(40),y:80,w:1220,h:900},...i?[{x:1270,y:90,w:620,h:860}]:[]],m=e.recallFs!==40?{fontSize:e.recallFs,left:x(70)}:p?{left:x(70)}:void 0,g=M=>({left:x(70),width:1160,top:M,...e.ans.fs!==e.ansBase?{fontSize:e.ans.fs}:{}}),y=n.answer.trim().includes(" ")?" wrap":"",w=n.correct,S=n.kind==="img"?n.photos.findIndex(M=>M.video):-1,T=S>=0?e.frame.rects[S]:null;return a.jsxs(pn,{rects:b,n:d,rootRef:u,cls:`s3 s4 st-${_M[n.kind]}${f}`,children:[a.jsxs("div",{className:"s3-head",children:[a.jsx("b",{children:n.title}),a.jsxs("span",{children:["разбор · вопрос ",n.qn," / ",n.qcount]})]}),e.frame.rects.length>0&&a.jsx(Cd,{rects:e.frame.rects,srcs:e.frame.srcs,fs:t}),n.kind==="text"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:m,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(120),top:330,width:1060,height:340}}),a.jsx("div",{className:"s4-lab",style:{left:x(70),width:1160,top:300},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans${y}`,style:g(350),children:Ea(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${x(250)} 650 C ${x(380)} 690 ${x(520)} 620 ${x(650)} 660 S ${x(920)} 690 ${x(1020)} 640`}),a.jsx("path",{className:"s4-vine-light",d:`M ${x(250)} 650 C ${x(380)} 690 ${x(520)} 620 ${x(650)} 660 S ${x(920)} 690 ${x(1020)} 640`}),a.jsx("g",{transform:`translate(${x(1100)} 636)`,children:a.jsxs("g",{className:"s4-fl",children:[Zl(8,13,26,-30),a.jsx("circle",{r:"12",className:"ct"})]})})]})]})]}),n.kind==="mc"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:m,children:n.question}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-ground",d:`M ${x(70)} 700 C ${x(400)} 690 ${x(800)} 712 ${x(1230)} 696`}),l&&w>=0&&a.jsx("path",{className:"s4-gl",d:`M ${x(70)} 700 C ${x(300)} 692 ${e.cx(w)-200} 706 ${e.cx(w)} 700`}),n.options.map((M,R)=>a.jsxs("g",{transform:`translate(${e.cx(R)} 520)${e.flower<1?` scale(${e.flower.toFixed(3)})`:""}`,children:[a.jsx("path",{className:"s4-stem",d:"M 0 60 C -10 110 10 150 0 180"}),a.jsx("circle",{className:"s4-halo","data-i":R,r:"124"}),a.jsxs("g",{className:"s4-mf","data-i":R,children:[Zl(8,22,44,-52),a.jsx("circle",{r:"34",className:"ct"})]})]},M.key))]}),n.options.map((M,R)=>a.jsxs("div",{className:"s4-opt","data-i":R,style:{left:e.cx(R)-e.optW/2,top:730,...e.optW!==270?{width:e.optW}:{},...e.optFs!==32?{fontSize:e.optFs}:{}},children:[a.jsx("b",{children:M.key}),a.jsx("span",{children:M.text})]},M.key)),n.options.map((M,R)=>a.jsx("b",{className:"s4-key",style:{left:e.cx(R)-24,top:496},children:M.key},M.key))]}),n.kind==="img"&&e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:m,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(700),top:e.sideTop-90,width:620,height:330}}),a.jsx("div",{className:"s4-lab",style:{left:x(740),width:540,top:e.sideTop-48},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${y}`,style:{left:x(740),width:540,top:e.sideTop,fontSize:e.ans.fs},children:Ea(n.answer)})]})]}),n.kind==="img"&&!e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:m,children:n.question}),l&&n.captions&&e.frame.rects.map((M,R)=>n.captions[R]&&a.jsx("div",{className:"s4-rcap",style:{left:M.x-20,top:M.y+M.h+26,width:M.w+40},children:n.captions[R].first?a.jsxs(a.Fragment,{children:[n.captions[R].plain,a.jsx("b",{children:n.captions[R].hot})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{children:n.captions[R].hot}),n.captions[R].plain]})},"rc"+R)),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(120),top:760,width:1060,height:240}}),a.jsx("div",{className:"s4-lab",style:{left:x(70),width:1160,top:744},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${y}`,style:g(780),children:Ea(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${x(330)} 944 C ${x(440)} 970 ${x(520)} 920 ${x(650)} 950 S ${x(860)} 972 ${x(970)} 936`}),a.jsx("path",{className:"s4-vine-light",d:`M ${x(330)} 944 C ${x(440)} 970 ${x(520)} 920 ${x(650)} 950 S ${x(860)} 972 ${x(970)} 936`})]})]})]}),n.kind==="imgopt"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:m,children:n.question}),e.frame.rects.map((M,R)=>a.jsx("b",{className:"s4-pk",style:{left:M.x-6,top:M.y-6},children:n.keys[R]},R)),l&&w>=0&&a.jsxs("div",{className:"s4-capt",style:p?{left:x(70)}:void 0,children:["Ответ: ",a.jsx("b",{children:n.keys[w]}),n.caption?` — ${n.caption}`:""]})]}),i&&a.jsx(gM,{rows:i,phase:s,judged:r,lay:o,count:c}),T&&h&&a.jsx("div",{className:"s4-vid",style:{left:T.x,top:T.y,width:T.w,height:T.h},children:h}),r&&l&&n.note&&a.jsx("div",{className:"s4-note",style:{left:x(70),top:e.noteTop},children:n.note})]})}const Ta=60,AM=290,CM=960,Aa=226,RM=(n,e)=>{var t;return((t=n.correct_pairs.find(i=>i.startsWith(e)))==null?void 0:t.slice(e.length))??""},ic=n=>n.items.map((e,t)=>n.right.indexOf(RM(n,String(t+1))));function NM(n,e,t){const i=t>4?26:n.length>60?25:n.length>40?27:30,s=Math.ceil(n.length*.5*i/Math.max(80,e-(t>4?86:100)));return Math.max(t>4?100:120,Math.round(s*i*1.14+26))}function PM(n,e={}){const t=!!e.long,i=e.lift??0,s=n.items.length,r=n.items.map(S=>S.kind==="img"?S.w/S.h:0),o=n.items.filter(S=>S.kind==="txt").length,c=s>4?250:AM,l=r.reduce((S,T)=>S+T,0),d=Math.round(Math.min((s>4?300:380)-i,l?(1800-Ta*(s-1)-c*o)/l:380)),u=n.items.map((S,T)=>S.kind==="img"?Math.round(r[T]*d):c),f=u.reduce((S,T)=>S+T,0)+Ta*(s-1);let h=CM-f/2;const p=u.map(S=>{const T={x:h,y:Aa,w:S,h:d};return h+=S+Ta,T}),x=s>4?250:t?400:330,b=p.map(S=>{const T=Math.max(x,Math.min(470,Math.round(S.w*.97)));return{x:S.x+S.w/2-T/2,y:Aa+d+56,w:T,h:0}}),m=n.right.length,g=1450,y=g/Math.max(1,m),w=n.right.map((S,T)=>({cx:400+y*(T+.5)+(T%2?14:-14),y:(s>4?T%2?790:640:T%2?936:t?796:806)-i}));if(e.stripTop!=null){const S=ic(n),T=E=>{const P=S.indexOf(E);return P>=0?b[P].w:x},M=Math.max(...w.map((E,P)=>E.y+NM(n.right_labels[P]??"",T(P),s))),R=Math.max(0,M-(e.stripTop-52)),v=Aa+d+40;w.forEach(E=>{E.y=Math.max(v,E.y-R)})}return{img:p,fin:b,bank:w,h:d,lift:i,minW:x}}const Jl=n=>n.length>60?" xl":n.length>40?" lg":"";function LM(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function IM(n,e){n.fromTo(e(".mt-img"),{opacity:0,scale:.92},{opacity:1,scale:1,duration:.6,stagger:.1,ease:"power2.out"},.3).fromTo(e(".mtC-bud"),{scale:0},{scale:1,duration:.4,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},.8).fromTo(e(".mt-lab"),{opacity:0,y:40,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.4)"},.9)}function DM(n,e,t,i,s){const r=ic(t);t.items.forEach((o,c)=>{const l=s.t0+c*s.step,d=r[c]>=0?e(`.mt-lab[data-k="${r[c]}"]`)[0]:void 0,u=i.bank[r[c]],f=i.fin[c];n.fromTo(e(`.mtC-img[data-k="${c}"]`),{"--hl":0},{"--hl":1,duration:.3,yoyo:!0,repeat:1},l).fromTo(e(`.mtC-stalk[data-k="${c}"]`),{strokeDashoffset:400},{strokeDashoffset:0,duration:.55,ease:"power2.out"},l+.1).fromTo(e(`.mtC-leaf[data-k="${c}"]`),{opacity:0},{opacity:1,duration:.3,stagger:.12},l+.35),d&&u&&n.fromTo(d,{x:0,y:0,rotation:r[c]%2?3:-3},{keyframes:[{y:-60,rotation:0,duration:.3,ease:"power2.out"},{x:f.x+f.w/2-u.cx,y:f.y-u.y,duration:.6,ease:"power2.inOut"}]},l+.35),n.fromTo(e(`.mt-num[data-k="${c}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.45,ease:"back.out(2.2)"},l+1)}),n.fromTo(e(".mt-pairs > *"),{opacity:0,y:10},{opacity:1,y:0,duration:.35,stagger:.08},s.pairsAt)}function UM({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,cls:c=""}){const l=ic(n),d=n.items.length,u=e.lift,f=[...e.img,{x:300,y:(d>4?620:780)-u,w:1500,h:280},{x:360,y:40,w:1200,h:90}];return a.jsxs(pn,{rects:f,n:s,rootRef:r,cls:`s3 mt mtC st-${t?"reveal":"question"}${i?" done":""} n${d}${c}`,children:[Fo(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q mt-q",children:n.text.split(" ").map((h,p)=>a.jsxs("span",{className:"w",children:[h," "]},p))}),a.jsxs("svg",{className:"mtC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("ellipse",{className:"mtC-meadow",cx:"1040",cy:(d>4?740:900)-u,rx:"900",ry:"170"}),t&&n.items.map((h,p)=>{const x=e.img[p],b=e.fin[p],m=x.x+x.w/2,g=x.y+x.h+4,y=b.y+2;return a.jsxs("g",{children:[a.jsx("path",{className:"mtC-stalk","data-k":p,d:`M ${m} ${g} C ${m-10} ${g+18} ${m+10} ${y-18} ${m} ${y}`}),a.jsxs("g",{transform:`translate(${m} ${(g+y)/2})`,children:[a.jsx("path",{className:"mtC-leaf","data-k":p,d:"M 0 0 C 16 -14 34 -12 40 -4 C 28 4 12 6 0 0 Z"}),a.jsx("path",{className:"mtC-leaf","data-k":p,d:"M 0 4 C -16 -8 -34 -6 -40 2 C -28 10 -12 12 0 4 Z"})]})]},p)})]}),e.img.map((h,p)=>{const x=n.items[p];return a.jsxs("div",{className:`mt-img mtC-img${x.kind==="txt"?" txtcard":""}`,"data-k":p,style:{left:h.x,top:h.y,width:h.w,height:h.h},children:[x.kind==="img"?a.jsx("img",{src:x.src,alt:""}):a.jsx("span",{className:`mtC-itxt${Jl(x.text)}`,children:x.text}),a.jsx("b",{className:"mt-imgno",children:p+1}),!t&&a.jsx("i",{className:"mtC-bud",style:{left:h.w/2-14}})]},p)}),n.right.map((h,p)=>{const x=l.indexOf(p),b=x>=0?e.fin[x].w:e.minW,m=i&&x>=0?e.fin[x]:{x:e.bank[p].cx-b/2,y:e.bank[p].y};return a.jsxs("div",{className:`mt-lab mtC-lab${Jl(n.right_labels[p]??"")}`,"data-k":p,style:{left:m.x,top:m.y,width:b},children:[a.jsx("svg",{className:"mt-labbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:"M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z"})}),a.jsx("span",{className:"key",children:h}),a.jsx("span",{className:"txt",children:n.right_labels[p]??""}),t&&x>=0&&a.jsx("b",{className:"mt-num","data-k":x,children:x+1})]},h)}),o&&a.jsx(Iu,{...o}),t&&a.jsx("div",{className:"mt-pairs",style:u?{top:884-u}:void 0,children:n.items.map((h,p)=>a.jsxs("span",{children:[a.jsx("b",{children:p+1})," — ",a.jsx("b",{children:n.right[l[p]]??"—"})]},p))}),a.jsx(Oo,{n:s,total:n.timer})]})}const FM="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function OM(n,e={}){const t=n.choices.length,i=!!e.long,s=858-(e.lift??0),r=t>=6?244:t===5?292:n.media?300:360,o=t>=6?112:t===5?140:i?196:150,c=n.media?470:380,l=1880,d=Array.from({length:t},(h,p)=>c+r/2+(t===1?0:p*(l-c-r)/(t-1))),u=d.map(h=>({x:h,y:s-130-o/2})),f=n.choices.map((h,p)=>({x:d[p],y:350+p%2*(i?130:60)}));return{n:t,cw:r,ch:o,slot:u,home:f,xs:d,VY:s}}const BM=n=>n.length>50?" xl":n.length>28?" lg":"",kM=(n,e)=>n.correct_order.indexOf(e);function zM(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function GM(n,e){n.fromTo(e(".orA-vine"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:1.4,ease:"power2.inOut"},.1).fromTo(e(".orA-bud"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.4,stagger:.2,ease:"back.out(2)"},.5).fromTo(e(".or-place"),{opacity:0},{opacity:1,duration:.4,stagger:.15},.6).fromTo(e(".or-card"),{opacity:0,y:-30,rotation:-4},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.5)"},.8)}function HM(n,e,t,i,s){const r=t.choices.map(c=>c.key),o=s.step;t.correct_order.split("").forEach((c,l)=>{const d=r.indexOf(c),u=d>=0?e(`.or-card[data-i="${d}"]`)[0]:void 0,f=i.home[d],h=i.slot[l],p=s.t0+l*o;u&&f&&h&&n.fromTo(u,{x:0,y:0,rotation:d%2?3:-3},{keyframes:[{x:(h.x-f.x)*.5,y:(h.y-f.y)*.5-50,rotation:h.x>f.x?7:-7,duration:o*.5,ease:"sine.inOut"},{x:h.x-f.x,y:h.y-f.y,rotation:0,duration:o*.45,ease:"power2.out"}]},p),n.fromTo(e(`.orA-stem[data-j="${l}"]`),{strokeDashoffset:120},{strokeDashoffset:0,duration:.3},p+o*.75).fromTo(e(`.orA-fl[data-j="${l}"]`),{scale:0},{scale:1,svgOrigin:"0 0",duration:.5,ease:"back.out(2.2)"},p+o*.8).to(e(`.orA-bud[data-j="${l}"]`),{scale:0,svgOrigin:"0 0",duration:.2},p+o*.75).fromTo(e(`.or-pos[data-i="${d}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.4,ease:"back.out(2.2)"},p+o*.9)}),n.fromTo(e(".orA-light"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:.4+i.n*o,ease:"none"},s.t0)}function VM({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,media:c,cls:l=""}){const d=e.VY,u=x=>kM(n,x),f=[...e.home,...e.slot].map(x=>({x:x.x-e.cw/2,y:x.y-e.ch/2,w:e.cw,h:e.ch})).concat([{x:360,y:40,w:1200,h:90}]),h=[{x:360,y:d},...e.xs.map((x,b)=>({x,y:d+(b%2?12:-12)})),{x:1850,y:d-6}],p=h.reduce((x,b,m)=>m===0?`M ${b.x} ${b.y}`:`${x} C ${(h[m-1].x+b.x)/2} ${h[m-1].y} ${(h[m-1].x+b.x)/2} ${b.y} ${b.x} ${b.y}`,"");return a.jsxs(pn,{rects:f,n:s,rootRef:r,cls:`s3 or orA st-${t?"reveal":"question"}${i?" done":""} n${e.n}${l}`,children:[Fo(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q or-q",style:n.media?{left:470,right:240}:void 0,children:n.text.split(" ").map((x,b)=>a.jsxs("span",{className:"w",children:[x," "]},b))}),n.media&&a.jsx("figure",{className:"or-media",children:a.jsx("img",{src:c??n.media,alt:""})}),a.jsxs("svg",{className:"orA-back",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"orA-vine",d:p}),a.jsx("path",{className:"orA-light",d:p}),a.jsxs("g",{className:"orA-seed",transform:`translate(360 ${d})`,children:[a.jsx("ellipse",{rx:"26",ry:"17"}),a.jsx("path",{d:"M -6 -14 C -2 -30 8 -34 16 -32"})]}),a.jsx("g",{transform:`translate(1850 ${d-6})`,children:a.jsxs("g",{className:"orA-flower",children:[Array.from({length:8},(x,b)=>a.jsx("g",{transform:`rotate(${b*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-26",rx:"12",ry:"26"})},b)),a.jsx("circle",{r:"11"})]})}),e.slot.map((x,b)=>a.jsxs("g",{transform:`translate(${x.x} ${h[b+1].y})`,children:[a.jsx("path",{className:"orA-stem","data-j":b,d:`M 0 0 L 0 ${x.y+e.ch/2-h[b+1].y}`}),a.jsx("ellipse",{className:"orA-bud","data-j":b,rx:"18",ry:"22",cy:"-6"}),a.jsxs("g",{className:"orA-fl","data-j":b,style:i?{transform:"scale(1)"}:void 0,children:[Array.from({length:7},(m,g)=>a.jsx("g",{transform:`rotate(${g*51.4})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"11",ry:"22"})},g)),a.jsx("circle",{r:"9"})]})]},b))]}),e.slot.map((x,b)=>a.jsx("b",{className:"or-place",style:{left:x.x,top:d+38},children:b+1},b)),n.choices.map((x,b)=>{const m=i&&u(x.key)>=0?e.slot[u(x.key)]:e.home[b];return a.jsxs("div",{className:`or-card orA-card${BM(x.text)}${t?" placed":""}`,"data-i":b,style:{left:m.x-e.cw/2,top:m.y-e.ch/2,width:e.cw,height:e.ch},children:[a.jsx("svg",{className:"or-cardbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:FM})}),a.jsx("span",{className:"key",children:x.key}),a.jsx("span",{className:"txt",children:x.text}),t&&u(x.key)>=0&&a.jsx("em",{className:"or-pos","data-i":b,children:u(x.key)+1})]},x.key)}),o&&a.jsx(Iu,{top:968,...o}),a.jsx(Oo,{n:s,total:n.timer})]})}function jM(n,e,t){const i=n.answer;return i.mode==="match"?"match":i.mode==="order"?"order":i.mode==="choice"?t.qImgs>0&&t.qImgs===i.choices.length?"imgopt":"mc":e==="rebus"||t.revealImgs>0||t.video?"img":"text"}function WM(n,e){const t=n.answer,i=e.trim();if(t.mode==="choice"){const s=t.choices.find(r=>Rh(i,r.key));return s&&s.text.trim()?`${s.key} · ${s.text.trim()}`:i}return t.mode==="match"?i.split(/[,;]\s*/).map(s=>s.trim()).filter(Boolean).join(" "):i}function $M(n,e,t,i,s){const r=`q-${n.id}`,o=i.filter(u=>u.question_ref===r),c=[...e,...t.filter(u=>!e.some(f=>f.id===u.id)&&o.some(f=>f.team_id===u.id))];let l=0;return{rows:c.map(u=>{var p;const f=o.find(x=>x.team_id===u.id),h=((p=f==null?void 0:f.answer_text)==null?void 0:p.trim())||"";return h&&l++,{key:u.id,name:`${u.icon?`${u.icon} `:""}${u.name}`,color:Oi(En(u.color??"")),text:h?WM(n,h):null,ok:s&&f&&h?f.is_correct??Pi(n.answer,f.answer_text):null,stake:(f==null?void 0:f.stake)??null}}),answered:l}}function XM(n,e,t){return n<=1?t:Math.max(.05,Math.min(t,(e-.3-1.45)/(n-1)))}function qM(n,e,t){return Math.max(.35,Math.min(t,(e-.3-.4)/Math.max(.9,n-.1)))}const Ql=(n,e=.7)=>Math.min(.14,e/Math.max(1,n-1));function YM(n,e){const[t,i]=H.useState(n?"open":"covered"),[s,r]=H.useState(0);H.useEffect(()=>{n?t==="covered"&&i("anim"):t!=="covered"&&(i("covered"),r(c=>c+1))},[n]);const o=H.useCallback(()=>i(c=>c==="anim"?"open":c),[]);return{stage:t,epoch:s,judged:e&&t==="open",done:o}}const sc=n=>n==="covered"?"dots":n;function rc(n,e,t,i,s,r){const o=H.useRef(null),c=H.useMemo(()=>nt.utils.selector(o),[]),l=H.useRef(n==="open"),d=H.useRef(!1);return H.useLayoutEffect(()=>{const u=nt.timeline();return i(u,c),l.current&&u.progress(1),()=>{u.kill()}},[]),H.useLayoutEffect(()=>{if(n==="covered"||d.current)return;d.current=!0;const u=nt.timeline({onComplete:t});if(s(u,c),n==="open"){u.progress(1);return}return()=>{u.progress()<1&&(d.current=!1,u.kill())}},[n]),H.useLayoutEffect(()=>{if(!e)return;const u=nt.timeline();return r(u,c),()=>{u.kill()}},[e]),o}const Fu=(n,e,t)=>n.to(e(".s4-sl .dots"),{opacity:0,duration:.3,stagger:.04},t).fromTo(e(".s4-sl .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.05},t),Ou=(n,e)=>{const t=e(".s4-sl .mk").length;return n.fromTo(e(".s4-sl .mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:Math.min(.1,2/Math.max(1,t)),ease:"back.out(2.4)"},0)},Bu=(n,e)=>n.fromTo(e(".s4-sl, .s4-scnt"),{opacity:0,y:14},{opacity:1,y:0,duration:.4,stagger:.05},.6);function KM({inp:n,rows:e,answered:t,revealed:i,checked:s,revealMs:r,video:o}){const{stage:c,epoch:l,judged:d,done:u}=YM(i,s),f=n.kind==="match"?n.allImgs.slice(0,n.left.length):n.kind==="order"?n.allImgs.slice(0,1):n.kind==="imgopt"?n.allImgs:c==="covered"?n.qImgs:n.aImgs,h=H.useMemo(()=>[...new Set([...n.allImgs,...n.qImgs,...n.aImgs])],[n]),p=af(h),x=p?f.map(T=>p[h.indexOf(T)]??{w:1200,h:900}):null,b=x?JSON.stringify(f.map((T,M)=>[T,x[M].w,x[M].h])):"",m=H.useMemo(()=>b?JSON.parse(b).map(([T,M,R])=>({src:T,w:M,h:R})):[],[b]),g=e&&e.length?e:null,y=g?`Ответили: ${t} из ${g.length}`:void 0,w=(r+600)/1e3;if(!x)return a.jsx("div",{className:"s1 fo-wait"});const S={stage:c,judged:d,done:u,rows:g,count:y,doneS:w};return n.kind==="match"?a.jsx(JM,{inp:n,photos:m,...S},l):n.kind==="order"?a.jsx(QM,{inp:n,photos:m,...S},l):a.jsxs(a.Fragment,{children:[a.jsx(ZM,{inp:n,photos:m,video:o,...S},l),o&&n.kind!=="img"&&a.jsx("div",{className:"s4-vid corner",children:o})]})}function ZM({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,video:c}){const l=t!=="covered",d=H.useRef(n.kind==="img"&&t==="covered"&&e.length===0),u=n.kind,f=H.useMemo(()=>{var w;const y=u==="img"&&l&&c?[{src:"",w:16,h:9,video:!0},...e].slice(0,4):e;return{kind:u,title:n.title,qn:n.qn,qcount:n.qcount,question:n.question,answer:n.answer,options:n.options,correct:u==="imgopt"||u==="mc"?n.options.findIndex(S=>S.key===n.correctKey):-1,photos:u==="img"||u==="imgopt"?y:[],keys:n.options.map(S=>S.key),caption:((w=n.options.find(S=>S.key===n.correctKey))==null?void 0:w.text.trim())??"",note:n.note,captions:n.captions}},[n,e,l,u,!!c]),h=!!r,p=H.useMemo(()=>MM(f,h?0:310),[f,h]),x=H.useMemo(()=>{const y=p.frame.rects.length;return{grow:Array(y).fill(1),reveal:Array(y).fill(1),bloom:Array(y).fill(0),pulse:0}},[p]),b=H.useMemo(()=>mM((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),m=Uu(f.answer),g=rc(t,i,s,(y,w)=>{yM(y,w),bM(y,w)},(y,w)=>{const S=u==="text"?{R:.4,k:Ql(m)}:u==="img"?{R:0,k:Ql(m),lt:.35}:{R:.2,k:.14},{show:T}=EM(y,w,f,x,S,d.current);SM(y,w,T)},(y,w)=>{wM(y,w,0,Math.min(.2,2.4/Math.max(1,(r==null?void 0:r.length)??1))),y.fromTo(w(".s4-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5},.2)});return a.jsx(TM,{d:f,ly:p,fs:x,rows:r,phase:sc(t),judged:i,colLay:b,count:o,shown:l,rootRef:g,cls:r?" fg":" fg paper",video:c})}function JM({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=H.useMemo(()=>({title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,items:n.left.map((y,w)=>e[w]?{kind:"img",src:e[w].src,w:e[w].w,h:e[w].h}:{kind:"txt",text:n.hasAudio?`Трек ${y}`:y}),right:n.right,right_labels:n.right.map((y,w)=>n.rightLabels[w]??""),correct_pairs:n.pairs}),[n,e]),d=H.useMemo(()=>Cu((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),u=958-d.lift,f=l.right_labels.some(y=>y.length>60),h=!!r,p=H.useMemo(()=>PM(l,{long:f,lift:d.lift,stripTop:h?u:void 0}),[l,f,d,h,u]),x=l.items.length,b=XM(x,c,x>4?.95:1.25),m=.3+(x-1)*b+1,g=rc(t,i,s,(y,w)=>{LM(y,w),IM(y,w),Bu(y,w)},(y,w)=>{DM(y,w,l,p,{t0:.3,step:b,pairsAt:m}),Fu(y,w,m+.4)},(y,w)=>{Ou(y,w)});return a.jsx(UM,{S:l,Ly:p,rev:t!=="covered",done:!1,n:null,rootRef:g,cls:" fg",strip:r?{rows:r,top:u,phase:sc(t),judged:i,lay:d,count:o}:null})}function QM({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=H.useMemo(()=>{var x;return{title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,choices:n.options,correct_order:n.correctOrder,media:((x=e[0])==null?void 0:x.src)??null}},[n,e]),d=H.useMemo(()=>Cu((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),u=l.choices.some(x=>x.text.length>50),f=H.useMemo(()=>OM(l,{long:u,lift:d.lift}),[l,u,d]),h=qM(f.n,c,f.n>5?.85:1),p=rc(t,i,s,(x,b)=>{zM(x,b),GM(x,b),Bu(x,b)},(x,b)=>{HM(x,b,l,f,{t0:.3,step:h}),Fu(x,b,.3+f.n*h+.2)},(x,b)=>{Ou(x,b)});return a.jsx(VM,{S:l,Ly:f,rev:t!=="covered",done:!1,n:null,rootRef:p,cls:" fg",strip:r?{rows:r,top:968-d.lift,phase:sc(t),judged:i,lay:d,count:o}:null})}function ey(n,e){const t=(r,o)=>{const c=(r??"").trim();if(!c)return null;const l=o?Math.max(0,c.length-3):3;return o?{plain:c.slice(0,l),hot:c.slice(l),first:o}:{plain:c.slice(l),hot:c.slice(0,l),first:o}},i=t(n,!0),s=t(e,!1);return i||s?[i??{plain:"",hot:"",first:!0},s??{plain:"",hot:"",first:!1}]:void 0}const ed=n=>!/\.(mp3|mp4|webm|wav|m4a|ogg)$/i.test(n),ty=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n);function ny({round:n,q:e,step:t,answers:i,teams:s,allTeams:r,revealed:o,checked:c,paper:l,revealMs:d,answerText:u,effects:f,video:h,actions:p}){const x=H.useMemo(()=>{var B;const T=e.media.question??[],M=e.media.answer??[],R=T.filter(ed),v=M.filter(ed),E=v.length?v:R,P=!!e.media.hidden&&T.some(X=>/\.(mp4|webm)$/i.test(X)),D=jM(e,n.mechanic,{qImgs:R.length,revealImgs:E.length,video:P}),L=e.answer,W=L.mode==="choice"||L.mode==="order"?L.choices.map(X=>({key:X.key,text:X.text})):[];return{kind:D,title:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qn:t+1,qcount:n.questions.length,question:e.question_text.trim(),answer:u,options:W,correctKey:L.mode==="choice"?L.correct_choice:"",correctOrder:L.mode==="order"?L.correct_order:"",left:L.mode==="match"?L.left:[],right:L.mode==="match"?L.right:[],rightLabels:L.mode==="match"?L.right_labels??[]:[],pairs:L.mode==="match"?L.correct_pairs:[],qImgs:e.media.hidden?[]:R.map(He),aImgs:E.map(He),allImgs:(D==="imgopt"||!e.media.hidden?R:[]).map(He),hasAudio:T.some(ty),note:((B=e.answer_note)==null?void 0:B.trim())??"",captions:n.mechanic==="rebus"?ey(e.service.word1,e.service.word2):void 0}},[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),e.answer_note,u,n.mechanic,n.title_lines.join("|"),n.questions.length,t]),{rows:b,answered:m}=$M(e,s,r,i,c),g=H.useMemo(()=>wd(e,He,u),[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),u]),[y,w]=H.useState(!0);H.useEffect(()=>{if(!o){w(!0);return}const T=setTimeout(()=>w(!1),1e3);return()=>clearTimeout(T)},[o,e.id]),H.useEffect(()=>{o&&rf.set({hidden:!1})},[o]);const S=(o?y:!0)&&a.jsx("div",{className:`fo-x ${o?"fo-xout":""}`,children:a.jsx(Ed,{q:g,roundName:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Вопрос ${t+1} из ${n.questions.length}`,startedAt:null,seconds:n.timer_seconds,reveal:!1,calm:!0,from:"E",noTimer:!0})});return o?a.jsxs(a.Fragment,{children:[f,S,a.jsx("div",{className:"fo-x fo-xin",children:a.jsx(KM,{inp:x,rows:l?null:b,answered:m,revealed:o,checked:c,revealMs:d,video:h},e.id)}),p]}):a.jsxs(a.Fragment,{children:[f,S,p]})}function jy(){var d,u,f,h;const{gameState:n,loading:e,roomId:t}=Yu(),[i,s]=H.useState(null);if(H.useEffect(()=>{n!=null&&n.pack_id?Nh(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),H.useEffect(()=>df(),[]),!e&&!t)return a.jsx(Ku,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",o=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"",c=(n==null?void 0:n.phase)==="question"?`Q-${((n.round_number+1)*97+n.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null,l=Sd(r)&&(n==null?void 0:n.phase)==="question"&&i?Qh((d=i.rounds[n.round_number])==null?void 0:d.questions[n.question_index],(u=i.rounds[n.round_number])==null?void 0:u.mechanic):!1;return a.jsxs(ef,{theme:r,isProjector:!0,phase:n==null?void 0:n.phase,plain:l,paper:((f=i==null?void 0:i.settings)==null?void 0:f.play_mode)==="paper",children:[r==="new_year"&&a.jsx(tf,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),a.jsx(iy,{gameState:n,pack:i}),a.jsx(Mp,{theme:r,trigger:o,hud:c}),a.jsx(fp,{on:At(r),phase:n==null?void 0:n.phase}),i&&a.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((h=i.settings)==null?void 0:h.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name}),a.jsx(of,{corner:!0})]})}function gr({theme:n}){return n==="new_year"?a.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?a.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function td({theme:n}){return n!=="classic"?null:a.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[a.jsx("span",{className:"cd-line"}),a.jsx("span",{className:"cd-chip",children:"◆"}),a.jsx("span",{className:"cd-line"})]})}function iy({gameState:n,pack:e}){var y,w,S,T;const[t,i]=H.useState([]),[s,r]=H.useState("");H.useEffect(()=>{Ph().then(i).catch(()=>i([]))},[]);const o=Wn((n==null?void 0:n.game_id)??null),c=H.useMemo(()=>Ap(o),[o]),l=H.useMemo(()=>{const M=`${location.origin}${location.pathname}#/player?room=${Lh()??""}`;return n!=null&&n.pack_id?`${M}&pack=${n.pack_id}`:M},[n==null?void 0:n.pack_id]),d=((n==null?void 0:n.random_groups)??[]).filter(M=>Array.isArray(M)&&M.length>0),u=d.map(M=>M.join(",")).join("|"),[f,h]=H.useState(!0);H.useEffect(()=>{h(!0)},[u]);const p=d.length>0&&f;if(xy((y=e==null?void 0:e.rounds)==null?void 0:y[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),_y(e,(n==null?void 0:n.round_number)??0),!n)return a.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const x=((w=e==null?void 0:e.settings)==null?void 0:w.play_mode)==="paper",b=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Ys()},children:"⟲ Сменить пакет"}),a.jsx("button",{onClick:()=>{var M,R;return void((M=e==null?void 0:e.settings)!=null&&M.show_intro?Dh():Tc(0,wc((R=e==null?void 0:e.settings)==null?void 0:R.info_slides,0)??void 0))},children:"К первому раунду →"})]});if(n.phase==="lobby"&&n.pack_id&&e&&At(e.theme))return a.jsxs(a.Fragment,{children:[a.jsx(Ic,{pack:e}),a.jsx(If,{teams:c.map(M=>({id:M.id,name:M.name,color:M.color,alive:Ar(M)})),playerUrl:l,paper:x,groups:d,groupsOpen:f,onGroupsOpen:()=>h(!0),onGroupsClose:()=>h(!1)}),b]});if(n.phase==="lobby"||!n.pack_id||!e)return a.jsxs("div",{className:`host-screen grid-bg lobby-screen${x?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&a.jsx(Ic,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?a.jsxs("div",{className:"cyber-lobby-head",children:[a.jsx(ad,{side:"left"}),a.jsxs("div",{className:"clh-title",children:[a.jsx(wn,{theme:"classic",lines:["QUIZ","PARTY"]}),a.jsx(td,{theme:"classic"})]}),a.jsx(ad,{side:"right"})]}):a.jsxs(a.Fragment,{children:[a.jsx(wn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),a.jsx(gr,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?a.jsxs(a.Fragment,{children:[p&&a.jsx(my,{groups:d,onClose:()=>h(!1)}),d.length>0&&!f&&a.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>h(!0),children:"СОСТАВЫ КОМАНД"}),Sd(e==null?void 0:e.theme)?a.jsx(pp,{theme:e.theme,showQr:!x,lit:p,playerUrl:l,teams:c.map(M=>({id:M.id,name:M.name,icon:M.icon,color:M.color,alive:Ar(M)}))}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"lobby-teams",children:[o.length>0&&a.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",o.length,")"]}),o.length===0?x?null:a.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):c.map(M=>a.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":M.color,opacity:Ar(M)?1:.4},children:[M.icon&&a.jsx("span",{className:"lobby-team-icon",children:M.icon}),M.name]},M.id))]}),!x&&a.jsx(rr,{className:`lobby-qr-corner${p?" lobby-qr-lit":""}`,value:l,title:"QR для подключения"}),!x&&p&&a.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"})]}),b]}):a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[a.jsxs("select",{value:s,onChange:M=>r(M.target.value),style:{fontSize:"1.2rem"},children:[a.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(M=>a.jsxs("option",{value:M.id,children:[M.name," (",M.status==="ready"?"готов":M.status==="played"?"сыгран":M.status,")"]},M.id))]}),a.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const M=t.find(R=>R.id===s);M&&M.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Ih(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return a.jsx(jv,{onDone:()=>{var M;Tc(0,wc((M=e==null?void 0:e.settings)==null?void 0:M.info_slides,0)??void 0)}});const m=e.rounds[n.round_number];if(!m)return a.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const g=m.questions[n.question_index];if(n.phase==="round_intro"){const M=m.settings.grid,R=a.jsx("div",{className:"host-actions",children:m.mechanic==="anagram"?a.jsx(ry,{round:m,gameState:n}):a.jsx("button",{onClick:()=>void li(0,Lt(n)).catch(Tt),children:m.mechanic==="jeopardy"?"Начать раунд →":m.mechanic==="race"?"К скачкам →":m.mechanic==="melody"?"К трекам →":m.mechanic==="four_pics"||m.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})});return At(e.theme)?a.jsxs(a.Fragment,{children:[m.rules_audio&&a.jsx("audio",{autoPlay:!0,src:He(m.rules_audio)}),a.jsx(lp,{kind:Gf(m.mechanic),intro:{num:en(e,n.round_number),titleLines:m.title_lines,meta:Cr(m),rules:m.rules}}),R]}):a.jsxs("div",{className:"host-screen grid-bg round-intro",children:[m.rules_audio&&a.jsx("audio",{autoPlay:!0,src:He(m.rules_audio)}),e.theme==="potter"&&a.jsx("div",{className:"mg-veil","aria-hidden":!0}),m.mechanic==="crossword"&&M?a.jsxs("div",{className:"cw-layout",children:[a.jsx(cf,{grid:M,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/M.cols,innerHeight*.8/M.rows))))}),a.jsxs("div",{className:"side",children:[a.jsxs("div",{className:"mono-tag",children:["РАУНД ",en(e,n.round_number)]}),a.jsx(wn,{theme:e.theme,lines:m.title_lines}),a.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:Cr(m)}),m.rules.map((v,E)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+E*.5}s`},children:[a.jsx("span",{className:"idx",children:String(E+1).padStart(2,"0")}),v]},E))]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"round-badge",children:[a.jsx("span",{className:"rb-word",children:"РАУНД"}),a.jsx("span",{className:"rb-num",children:en(e,n.round_number)})]}),a.jsxs("div",{className:"ri-main",children:[a.jsx(wn,{theme:e.theme,lines:m.title_lines}),a.jsx(gr,{theme:e.theme}),a.jsx(td,{theme:e.theme}),a.jsx("div",{className:"meta-line",children:Cr(m)})]}),m.rules.length>0&&a.jsxs("div",{className:"rules-frame","data-count":m.rules.length,children:[a.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),m.rules.map((v,E)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+E*.7}s`},children:[a.jsx("span",{className:"idx",children:String(E+1).padStart(2,"0")}),v]},E))]})]}),R]})}if(n.phase==="question"&&m.mechanic==="sprint")return At(e.theme)?a.jsxs(a.Fragment,{children:[a.jsx(bc,{pack:e,round:m,gameState:n,timerNode:null}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void cs(0,!1,Lt(n)).catch(Tt),children:"К ответам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsx(bc,{pack:e,round:m,gameState:n,timerNode:a.jsx(ss,{startedAt:n.timer_started_at,seconds:m.timer_seconds,theme:e.theme})}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void cs(0,!1,Lt(n)).catch(Tt),children:"К ответам →"})})]});if(n.phase==="question"&&m.mechanic==="blitz")return a.jsx(by,{pack:e,round:m,gameState:n});if(n.phase==="question"&&m.mechanic==="race")return a.jsx(ch,{pack:e,round:m,gameState:n});if(n.phase==="question"&&m.mechanic==="melody")return a.jsx(lh,{pack:e,round:m,gameState:n});if(n.phase==="question"&&m.mechanic==="four_pics")return a.jsx(dh,{pack:e,round:m,gameState:n,timerNode:(M,R,v)=>{var E,P;return a.jsx(ss,{startedAt:((P=(E=n.melody)==null?void 0:E.rv)==null?void 0:P.startedAt)??null,seconds:M,theme:e.theme,chime:v},R)}});if(n.phase==="question"&&m.mechanic==="jeopardy")return a.jsx(uh,{pack:e,round:m,gameState:n});if(n.phase==="question"&&m.mechanic==="anagram"&&g){const M=n.question_index+1>=m.questions.length;return a.jsx(hh,{pack:e,round:m,roundIdx:n.round_number,q:g,qIndex:n.question_index,qCount:m.questions.length,gameState:n,timerSlot:n.reveal&&!n.timer_started_at?null:a.jsx(ss,{startedAt:n.timer_started_at,seconds:m.timer_seconds,theme:e.theme},g.id),effectsSlot:a.jsxs(a.Fragment,{children:[!(n.reveal&&!n.timer_started_at)&&a.jsx(od,{startedAt:n.timer_started_at,seconds:m.timer_seconds,q:g,round:m,pack:e,timerRunning:!!n.timer_started_at,manual:x,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(dd,{round:m,gameState:n,isLast:M}),a.jsx(ld,{enabled:!n.reveal,startedAt:n.timer_started_at,seconds:m.timer_seconds})]}),actionsSlot:a.jsx(sy,{pack:e,round:m,gameState:n})},g.id)}if(n.phase==="question"&&g){const M=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>m.timer_seconds-10,R=((S=e.settings)!=null&&S.answers_reveal&&m.answers_reveal==="after_question",m.answers_reveal??"after_round"),v=m.mechanic!=="jeopardy"&&a.jsxs(a.Fragment,{children:[a.jsx(od,{startedAt:n.timer_started_at,seconds:m.timer_seconds,q:g,round:m,pack:e,timerRunning:!!n.timer_started_at,manual:x,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(dd,{round:m,gameState:n,isLast:n.question_index+1>=m.questions.length}),a.jsx(ld,{enabled:R==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:m.timer_seconds})]}),E=a.jsxs("div",{className:"host-actions",children:[a.jsx(ay,{gameState:n}),(R==="after_question"||m.mechanic==="jeopardy")&&!n.reveal&&a.jsx("button",{onClick:()=>void Bi(),children:"Показать ответ"}),n.question_index+1<m.questions.length?a.jsx("button",{onClick:()=>void li(n.question_index+1,Lt(n)).catch(Tt),children:"Дальше →"}):R==="after_round"?a.jsx("button",{onClick:()=>void Md(Lt(n)).catch(Tt),children:"Время ответов →"}):a.jsx(Cn,{pack:e,gameState:n})]});return m.mechanic==="crossword"&&At(e.theme)&&tc(m)?a.jsx(fM,{pack:e,round:m,q:g,qIndex:n.question_index,qCount:m.questions.length,gameState:n,effectsSlot:v,actionsSlot:E},g.id):a.jsx(fh,{pack:e,round:m,roundIdx:n.round_number,q:g,qIndex:n.question_index,qCount:m.questions.length,timeLow:M,reveal:n.reveal,timerRunning:!!n.timer_started_at,timerStartedAt:n.timer_started_at,timerSlot:m.mechanic!=="jeopardy"&&a.jsx(ss,{startedAt:n.timer_started_at,seconds:m.timer_seconds,theme:e.theme},g.id),effectsSlot:v,actionsSlot:E})}if(n.phase==="info"){const M=((T=e==null?void 0:e.settings)==null?void 0:T.info_slides)??[],R=M[n.question_index]??M[0];if(R)return a.jsx(vy,{pack:e,slide:R,packId:n.pack_id,gameState:n})}return n.phase==="recap"?a.jsx(gy,{pack:e,round:m,gameState:n}):n.phase==="answer_time"?a.jsx(Sy,{pack:e,round:m,gameState:n}):n.phase==="show_answers"&&g?a.jsx(wy,{pack:e,round:m,q:g,gameState:n}):n.phase==="scoreboard"?a.jsx(Ay,{pack:e,gameState:n}):n.phase==="break"?a.jsx(Cy,{pack:e,round:m,gameState:n}):n.phase==="counting"?a.jsx(Ry,{pack:e,gameState:n}):n.phase==="finale"?a.jsx(Ny,{pack:e,gameId:n.game_id,gameState:n}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!g&&a.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void _r("round_intro"),children:"← К титулу раунда"})})]})}function sy({pack:n,round:e,gameState:t}){const i=Hh(),s=gd(t.game_id),r=yd(s,e.questions),o=Nc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:Date.now(),wasRun:r}),c=()=>{const d=Wh(t.question_index),u=Lt(t);(d.kind==="shown"?La(d.index,u):_r("round_intro",u)).catch(Tt)},l=()=>{const d=Nc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:Date.now(),wasRun:r});if(d.kind==="wait")return i.show(d.text);const u=Lt(t);if(d.kind==="reveal")return void Bi(u).catch(Tt);if(d.kind==="next")return void(d.shown?La(d.index,u):li(d.index,u)).catch(Tt)};return a.jsxs("div",{className:"host-actions",children:[a.jsx(Vh,{text:i.text}),a.jsx("button",{className:"ghost",onClick:c,children:t.question_index>0?"← Назад":"← К титулу"}),!t.reveal&&a.jsx("button",{onClick:()=>void Bi(),children:"Показать ответ"}),o.kind==="afterRound"?a.jsx(Cn,{pack:n,gameState:t}):a.jsx("button",{onClick:l,children:"Дальше →"})]})}function ry({round:n,gameState:e}){const t=gd(e.game_id),i=Uh(yd(t,n.questions));return a.jsx("button",{onClick:()=>void(i.shown?La(0,Lt(e)):li(0,Lt(e))).catch(Tt),children:"Первый вопрос →"})}function ay({gameState:n}){return n.question_index>0?a.jsx("button",{className:"ghost",onClick:()=>void li(n.question_index-1,Lt(n)).catch(Tt),children:"← Назад"}):a.jsx("button",{className:"ghost",onClick:()=>void _r("round_intro",Lt(n)).catch(Tt),children:"← К титулу"})}function oy(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function cy(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const wn=H.forwardRef(function({theme:e,lines:t},i){const s=cy(t),r=t.join(`
`),o=ph(r,e==="classic"),c=e==="classic"?o.split(`
`):t;if(e!=="new_year")return a.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((d,u)=>a.jsxs("span",{style:u===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[u]??d,a.jsx("br",{})]},u))});let l=0;return a.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((d,u)=>a.jsx("span",{style:{display:"block"},children:[...d].map((f,h)=>f===" "?a.jsx("span",{children:" "},h):a.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*l++}s`},children:f},h))},u))})});function ly(){oh()}function dy(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?a.jsxs(a.Fragment,{children:[s,a.jsx("b",{className:"rebus-hot",children:r})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"rebus-hot",children:r}),s]})}function uy(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}const hy=5e3,ku=3300,fy=500,py=900,nd=100,id=600,sd=500;function rd(n){const e=n.answer;return e.mode==="choice"?ku+fy+py:e.mode==="match"?nd+id*Math.max(0,Math.min(e.left.length,6)-1)+sd:e.mode==="order"?nd+id*Math.max(0,e.correct_order.length-1)+sd:1200}function Ca({src:n}){const e=H.useRef(null);return H.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),a.jsx("div",{className:"reveal-video",children:a.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function zu(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function ad({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return a.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"cp-bar"}),a.jsx("div",{className:"cp-rows",children:e.map((t,i)=>a.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),a.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>a.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function my({groups:n,onClose:e}){H.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return a.jsx("div",{className:"groups-overlay",onClick:e,children:a.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[a.jsxs("div",{className:"gm-head",children:[a.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),a.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),a.jsx("div",{className:"lg-list",children:n.map((i,s)=>a.jsxs("div",{className:"lg-team",children:[a.jsxs("div",{className:"lg-name",style:{color:Pa(s)},children:["Команда ",s+1]}),a.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function gy({pack:n,round:e,gameState:t}){const i=H.useMemo(()=>e.questions.filter(p=>!p.hidden),[e.questions]),[s,r]=H.useState(0),o=i[s],c=s+1>=i.length,l=()=>void Md({phase:"recap",round_number:t.round_number}).catch(Tt),d=()=>{c?l():r(p=>p+1)};if(H.useEffect(()=>{if(!o){l();return}let p=!0;const x=()=>{p&&d()},b=setTimeout(x,hy),m=o.media.voice;if(!m)return()=>{p=!1,clearTimeout(b)};let g=!1;const y=Jt();y.src=He(m),y.play().then(()=>{if(g)try{y.pause(),y.src=""}catch{}}).catch(()=>{});const w=()=>{clearTimeout(b),x()};return y.addEventListener("ended",w),()=>{p=!1,g=!0,clearTimeout(b),y.removeEventListener("ended",w);try{y.pause(),y.src=""}catch{}}},[s,o==null?void 0:o.id]),!o)return null;const u=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost",onClick:l,children:"Пропустить повтор"}),a.jsx("button",{onClick:d,children:c?"К ответам →":"Следующий →"})]});if(At(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(hp,{q:o,roundName:e.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Повтор вопросов · ${s+1} из ${i.length}`,seconds:e.timer_seconds},o.id),u]});const f=(o.media.question??[]).filter(p=>!/\.(mp3|wav|mp4|webm)$/i.test(p)),h=!!o.question_text.trim();return a.jsxs("div",{className:`host-screen grid-bg recap-screen${f.length?" has-media":""}${h?"":" no-qtext"}`,children:[a.jsxs("div",{className:"host-topbar",children:[a.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),a.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),a.jsxs("div",{className:"recap-body",children:[h&&a.jsx("p",{className:`q-text${Na(o.question_text)}`,children:o.question_text}),f.length>0&&a.jsx("div",{className:`q-media-grid n${Math.min(f.length,4)}${f.length>1?" eq-row":""}${f.length>4?" wrap2":""}`,style:xd(o),children:f.map((p,x)=>a.jsx(Ra,{src:He(p)},x))})]},o.id),a.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((p,x)=>a.jsx("i",{className:x===s?"on":x<s?"done":""},x))}),u]})}function xy(n,e){H.useEffect(()=>{if(!n)return;const i=n.questions.filter(o=>!o.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const o of s){const c=He(o);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(o)){const l=document.createElement(/\.(mp4|webm)$/i.test(o)?"video":"audio");l.preload="auto",l.src=c,r.push(l)}else{const l=new Image;l.src=c,r.push(l)}}return()=>{for(const o of r)try{o.src=""}catch{}}},[n,e])}function _y(n,e){H.useEffect(()=>{if(!n)return;const t=[n.rounds[e],n.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const i=[...bh({id:n.id,rounds:t})];return Sh(i),()=>wh(i)},[n,e])}function vy({pack:n,slide:e,packId:t,gameState:i}){var f,h;const s=n.rounds.filter(p=>!p.off_scoreboard).map(p=>({id:p.id,name:(p.title_lines??[]).join(" ")||"—",count:p.questions.filter(x=>!x.hidden).length})),r=Wn(i.game_id),o=xh(n,r.length),c=At(n.theme),l=c&&(e.images??[]).length===1?[He(e.images[0])]:[],d=_h(l),u=a.jsx("div",{className:"host-actions",children:a.jsx(yy,{slides:((f=n.settings)==null?void 0:f.info_slides)??[],index:My(n,e),packId:t,paper:((h=n.settings)==null?void 0:h.play_mode)==="paper"})});if(c){const p=Uf({slide:e,rounds:s,stats:o,image:l.length?{src:l[0],...d.sizes[0]}:null});if(p)return a.jsxs(a.Fragment,{children:[l.length&&!d.ready?null:a.jsx(cp,{view:p}),u]})}return a.jsxs(a.Fragment,{children:[a.jsx(vh,{slide:e,rounds:s,stats:o,mediaUrl:He}),u]})}function My(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function yy({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return a.jsxs(a.Fragment,{children:[e>0&&a.jsx("button",{className:"ghost",onClick:()=>void Qn(e-1),children:"← Назад"}),e+1<n.length&&a.jsx("button",{className:"ghost",onClick:()=>void Qn(e+1),children:"Дальше →"}),s?i?a.jsx("button",{onClick:()=>void $h(),children:"К подсчёту →"}):a.jsx("button",{onClick:()=>void Ia(t),children:"К итогам →"}):a.jsx("button",{onClick:()=>void _r("round_intro"),children:"К раунду →"})]})}function by({pack:n,round:e,gameState:t}){var g;const{state:i,setState:s}=Zu(t.game_id,t.round_number),r=Wn(t.game_id),o=fs(t.game_id,t.round_number,400),c=H.useMemo(()=>e.questions.map(y=>({id:y.id,hidden:y.hidden})),[e.questions]),l=e.settings;H.useEffect(()=>{var T;const y=l.bg_music??((T=n.settings)==null?void 0:T.bg_music);if(!y)return;let w=!1;const S=Jt();return S.src=He(y),S.loop=!0,S.volume=.6,S.play().then(()=>{if(w)try{S.pause(),S.src=""}catch{}}).catch(()=>{}),()=>{w=!0;try{S.pause(),S.src=""}catch{}}},[e.id,l.bg_music,(g=n.settings)==null?void 0:g.bg_music]);const d=H.useRef(!1),u=async y=>{if(!d.current){d.current=!0,s(y);try{await Ju(t.game_id,t.round_number,y),y.finished&&!(i!=null&&i.finished)&&(await Qu(t.game_id,t.round_number,Ec(Rc(y),l.timeoutPenalty??10)),Th(e.id,Ah(i,y)).catch(w=>console.warn("банк блица: неотыгранные не вернулись —",w instanceof Error?w.message:w)))}finally{d.current=!1}}};H.useEffect(()=>{if(i||r.length<2)return;const y=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(S=>S.id);u(Fh(w,l.teamSeconds??60))},3e3);return()=>clearTimeout(y)},[i,r.length]),H.useEffect(()=>{if(!i||i.finished||i.current)return;const y=setTimeout(()=>{const w=Oh(c,i.used);if(!w)return void u(Rr(i));Eh(w.id).catch(()=>{}),u(Bh(i,w.id,Date.now()))},Ac);return()=>clearTimeout(y)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const f=i==null?void 0:i.current,h=f?e.questions.find(y=>y.id===f.questionId):void 0,p=i?kh(i):void 0;H.useEffect(()=>{if(!i||!f||!h||!p)return;const y=o.find(S=>S.team_id===p&&S.question_ref===`q-${h.id}`);if(!(y!=null&&y.answer_text)||f.lastAnswer===y.answer_text)return;if(y.answer_text===zh){u(Nr(_s(i,Date.now()),Date.now()));return}const w=Pi(h.answer,y.answer_text)===!0;u(Gh(i,Date.now(),w?"ok":"no",y.answer_text))},[o,f==null?void 0:f.questionId,f==null?void 0:f.lastAnswer]);const x=(f==null?void 0:f.verdict)==="no"&&f.attempts+1>=Cc;if(H.useEffect(()=>{if(!i||!(f!=null&&f.verdict))return;const w=Math.max(0,(x?jh:Ac)-(Date.now()-(f.pausedAt??Date.now()))),S=setTimeout(()=>{const T=Date.now(),M=_s(i,T),R=o.find(v=>v.team_id===p&&v.question_ref===`q-${f.questionId}`);R&&bd.patchAnswer(R.id,{is_correct:f.verdict==="ok"}).catch(()=>{}),u(f.verdict==="ok"?Pr(M,T):Lr(M,T))},w);return()=>clearTimeout(S)},[f==null?void 0:f.verdict,f==null?void 0:f.lastAnswer]),At(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(mh,{state:i,teams:r,bank:c,teamSeconds:l.teamSeconds??60,penalty:l.timeoutPenalty??10,question:y=>{const w=e.questions.find(S=>S.id===y);return w?{text:w.question_text,answer:ii(w)}:void 0}}),a.jsx("div",{className:"host-actions",children:i!=null&&i.finished?a.jsx(Cn,{pack:n,gameState:t}):i&&a.jsxs(a.Fragment,{children:[(f==null?void 0:f.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const y=Date.now(),w=_s(i,y);u(f.verdict==="ok"?Lr(w,y):Pr(w,y))},children:["Исправить на «",f.verdict==="ok"?"неверно":"верно","»"]}),f&&f.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void u(Nr(i,Date.now())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&u(Rr(i))},children:"Завершить раунд"})]})})]});if(!i)return a.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[a.jsx("div",{className:"host-topbar",children:a.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),a.jsx(Sc,{teams:r,rolling:!0})]});if(i.finished){const y=Ec(Rc(i),l.timeoutPenalty??10);return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),a.jsxs("table",{className:"score-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),a.jsx("th",{children:"Очки"}),a.jsx("th",{children:"Баллы"})]})}),a.jsx("tbody",{children:y.map(w=>{var S;return a.jsxs("tr",{children:[a.jsxs("td",{children:[w.place,w.shared?"=":""]}),a.jsx("td",{children:((S=r.find(T=>T.id===w.teamId))==null?void 0:S.name)??"—"}),a.jsx("td",{children:w.points}),a.jsx("td",{children:w.score})]},w.teamId)})})]}),a.jsx("div",{className:"host-actions",children:a.jsx(Cn,{pack:n,gameState:t})})]})}const b=i.current!=null||Object.values(i.correct).some(y=>y>0)||Object.values(i.missed).some(y=>y>0),m=!f&&i.lastReveal?(()=>{const y=e.questions.find(w=>w.id===i.lastReveal.questionId);if(y)return{questionText:y.question_text,answerText:ii(y),verdict:i.lastReveal.verdict}})():void 0;return a.jsxs(a.Fragment,{children:[a.jsx(gh,{teams:r,state:i,bank:c,questionText:h==null?void 0:h.question_text,verdict:f==null?void 0:f.verdict,reveal:m,answerText:(f==null?void 0:f.verdict)==="ok"||(f==null?void 0:f.verdict)==="no"&&f.attempts+1>=Cc?ii(h):void 0,dice:b?void 0:a.jsx(Sc,{teams:r,rolling:!1,pickedId:i.order[0]})}),a.jsxs("div",{className:"host-actions",children:[(f==null?void 0:f.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const y=Date.now(),w=_s(i,y);u(f.verdict==="ok"?Lr(w,y):Pr(w,y))},children:["Исправить на «",f.verdict==="ok"?"неверно":"верно","»"]}),f&&f.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void u(Nr(i,Date.now())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&u(Rr(i))},children:"Завершить раунд"})]})]})}function od({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:o=!1,gameId:c,roundNumber:l}){const d=(n.media.question??[]).some(p=>/\.(mp3|mp4|webm|wav)$/i.test(p)),u=H.useRef(null),f=H.useRef(null),h=H.useRef(!1);return H.useEffect(()=>{if(ly(),o&&!d||t)return;let p=!1;const x=(n.media.question??[]).find(g=>/\.(mp3|wav|m4a|ogg)$/i.test(g));h.current=!1;const b=()=>{if(!p){if(h.current=!0,x){const g=Jt();g.src=He(x),f.current=g,g.play().catch(()=>{})}Pc(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){b();return}const m=Jt();return m.src=He(n.media.voice),u.current=m,m.onended=b,m.onerror=b,m.play().then(()=>{if(p)try{m.pause(),m.src=""}catch{}}).catch(b),()=>{var y;p=!0;const g=u.current;if(g){g.onended=null,g.onerror=null;try{g.pause(),g.src=""}catch{}}u.current=null,(y=f.current)==null||y.pause()}},[n.id,o]),H.useEffect(()=>{if(!o||!t||d)return;let p=!1;const x=(n.media.question??[]).find(m=>/\.(mp3|wav|m4a|ogg)$/i.test(m)),b=()=>{if(p||!x)return;const m=Jt();m.src=He(x),f.current=m,m.play().catch(()=>{})};if(n.media.voice){const m=Jt();m.src=He(n.media.voice),u.current=m,m.onended=b,m.onerror=b,m.play().then(()=>{if(p)try{m.pause(),m.src=""}catch{}}).catch(b)}else b();return()=>{var g;p=!0;const m=u.current;if(m){m.onended=null,m.onerror=null;try{m.pause(),m.src=""}catch{}}u.current=null,(g=f.current)==null||g.pause()}},[n.id,o,t]),H.useEffect(()=>{if(t||o)return;const p=setInterval(()=>{if(t)return;const x=u.current;x&&!x.paused&&!x.ended||Pc(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(p)},[n.id,t,o]),H.useEffect(()=>{var S;const p=e.settings.bg_music??((S=i==null?void 0:i.settings)==null?void 0:S.bg_music);if(!t||!p||d)return;let x=!1;const b=Jt();b.src=He(p),b.loop=!0,b.volume=.6,b.play().then(()=>{if(x)try{b.pause(),b.src=""}catch{}}).catch(()=>{});let m;const g=(r??e.timer_seconds??60)*1e3,y=s?g-(Date.now()-new Date(s).getTime()):g,w=window.setTimeout(()=>{m=window.setInterval(()=>{b.volume=Math.max(0,b.volume-.1),b.volume<=.01&&(m&&clearInterval(m),b.pause())},80)},Math.max(0,y)+3e3);return()=>{x=!0,clearTimeout(w),m&&clearInterval(m);try{b.pause(),b.src=""}catch{}}},[t,n.id]),null}function Sy({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=Wn(t.game_id),o=fs(t.game_id,t.round_number),c=e.questions.filter(u=>!u.hidden).length;H.useEffect(()=>{var p;const u=e.settings.bg_music??((p=n.settings)==null?void 0:p.bg_music);if(!u)return;let f=!1;const h=Jt();return h.src=He(u),h.loop=!0,h.volume=.6,h.play().then(()=>{if(f)try{h.pause(),h.src=""}catch{}}).catch(()=>{}),()=>{f=!0;try{h.pause(),h.src=""}catch{}}},[e.id]);const l=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>void li(e.questions.length-1,Lt(t)).catch(Tt),children:"← Назад"}),a.jsx("button",{onClick:()=>void cs(0,!1,Lt(t)).catch(Tt),children:"К ответам →"})]});return At(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(up,{num:en(n,t.round_number),paper:s,startedAt:t.timer_started_at,seconds:i,teams:s?null:r.map(u=>{const f=o.filter(h=>{var p;return h.team_id===u.id&&((p=h.answer_text)==null?void 0:p.trim())}).length;return{id:u.id,name:u.name,color:si(u.color),got:f,total:c,done:f>=c}})}),l]}):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[a.jsxs("div",{className:"mono-tag",children:["РАУНД ",en(n,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),a.jsx("div",{className:"answer-pulse",children:a.jsx(wn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),a.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),a.jsx(ss,{startedAt:t.timer_started_at,seconds:i,theme:n.theme,variant:"ring"}),!s&&a.jsx("div",{className:"answer-time-teams",children:r.map(u=>{const f=o.filter(p=>{var x;return p.team_id===u.id&&((x=p.answer_text)==null?void 0:x.trim())}).length,h=f>=c;return a.jsxs("div",{className:`at-team${h?" done":""}`,children:[a.jsx("span",{style:{color:u.color},children:u.name})," · ",f,"/",c]},u.id)})}),l]})}function wy({pack:n,round:e,q:t,gameState:i}){var R;const s=((R=n.settings)==null?void 0:R.play_mode)==="paper",r=fs(i.game_id,i.round_number),o=i.reveal,c=Wn(i.game_id),[l,d]=H.useState([]);H.useEffect(()=>{qu.from("teams").select("id,name,color").then(({data:v})=>d(v??[]))},[]);const u=r.filter(v=>v.question_ref===`q-${t.id}`),f=e.questions.length,h=i.question_index;H.useEffect(()=>{if(o||document.hidden)return;const v=setTimeout(()=>{Bi()},3e3);return()=>clearTimeout(v)},[o,h]);const[p,x]=H.useState(!1);H.useEffect(()=>{if(x(!1),!o)return;const v=setTimeout(()=>x(!0),rd(t)+600);return()=>clearTimeout(v)},[o,t.id]),H.useEffect(()=>{!p||document.hidden||u.forEach(v=>{if(v.is_correct!=null)return;const E=Pi(t.answer,v.answer_text);E!==null&&bd.patchAnswer(v.id,{is_correct:E}).catch(()=>{})})},[p,h,u.length,u.map(v=>v.answer_text).join("|")]);const b=t.answer.mode==="choice"?t.answer.choices:null,m=(t.media.question??[]).filter(v=>!/\.(mp3|mp4|webm|wav)$/i.test(v)),g=(t.media.answer??[]).filter(v=>!/\.(mp3|mp4|webm|wav)$/i.test(v)),y=(t.media.question??[]).filter(v=>!/\.(mp3|mp4|webm|wav)$/i.test(v)),w=g.length?g:y,S=t.media.hidden?(t.media.question??[]).find(v=>/\.(mp4|webm)$/i.test(v)):void 0,T=(t.media.answer??[]).find(v=>/\.(mp3|wav|m4a|ogg)$/i.test(v)),M=a.jsxs("div",{className:"host-actions",children:[h>0&&a.jsx("button",{className:"ghost",onClick:()=>void cs(h-1,!0,Lt(i)).catch(Tt),children:"← Назад"}),o?h<f-1?a.jsx("button",{onClick:()=>void cs(h+1,!1,Lt(i)).catch(Tt),children:"Следующий вопрос →"}):a.jsx(Cn,{pack:n,gameState:i}):a.jsx("button",{onClick:()=>void Bi(),children:"Показать ответ →"})]});return e.mechanic==="crossword"&&At(n.theme)&&tc(e)?a.jsx(pM,{pack:n,round:e,q:t,step:h,answers:r,teams:c,allTeams:l,revealed:o,checked:p,paper:s,effects:o&&T?a.jsx(is,{src:He(T)}):null,video:o&&S?a.jsx(Ca,{src:He(S)}):void 0,imgs:o?w:t.media.hidden?[]:y,actions:M},t.id):At(n.theme)&&e.mechanic==="sprint"?a.jsxs(a.Fragment,{children:[a.jsx(Mh,{title:e.title_lines.join(" "),count:f,step:h,q:{text:t.question_text,answer:ii(t)},shown:o,verdicts:p,answers:s?null:u.map(v=>{const E=c.find(P=>P.id===v.team_id)??l.find(P=>P.id===v.team_id);return{team:(E==null?void 0:E.name)??"—",color:si(E==null?void 0:E.color),text:v.answer_text||"—",ok:p?v.is_correct??Pi(t.answer,v.answer_text):null}}),qImgs:t.media.hidden?[]:y.map(He),aImgs:w.map(He),note:t.answer_note||void 0,extra:o&&T?a.jsx(is,{src:He(T)}):null}),M]}):At(n.theme)&&e.mechanic!=="crossword"&&e.mechanic!=="anagram"&&t.answer.mode!=="crossword_word"&&t.answer.mode!=="anagram"?a.jsx(ny,{round:e,q:t,step:h,answers:r,teams:c,allTeams:l,revealed:o,checked:p,paper:s,revealMs:rd(t),answerText:ii(t),effects:o&&T?a.jsx(is,{src:He(T)}):null,video:o&&S?a.jsx(Ca,{src:He(S)}):void 0,actions:M},t.id):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[a.jsxs("div",{className:"host-topbar",children:[a.jsxs("span",{className:"mono-tag",children:["РАУНД ",en(n,i.round_number)," :: ОТВЕТЫ"]}),a.jsxs("span",{className:"qnum",children:["ВОПРОС ",a.jsx("b",{children:h+1})," / ",f]})]}),a.jsxs("div",{className:`answers-layout${o?" revealed":""}`,style:{marginTop:60},children:[a.jsxs("div",{className:`answers-main${o?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!o&&a.jsxs(a.Fragment,{children:[a.jsx("p",{className:`q-text${Na(t.question_text)}`,children:t.question_text}),y.length>0&&!t.media.hidden&&a.jsx("div",{className:`q-media-grid n${Math.min(y.length,4)}${y.length>1?" eq-row":""}${y.length>4?" wrap2":""}`,style:xd(t),children:y.map((v,E)=>a.jsx(Ra,{src:He(v)},E))})]}),o&&t.answer.mode!=="match"&&t.question_text.trim()&&a.jsx("p",{className:`q-recall${Na(t.question_text)}`,children:t.question_text}),o&&a.jsxs("div",{className:"answer-block reveal-in",children:[a.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),S&&a.jsx(Ca,{src:He(S)}),T&&a.jsx(is,{src:He(T)}),e.mechanic==="rebus"?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"answer-main",children:ii(t)}),a.jsx("div",{className:"rebus-answer",children:y.slice(0,2).map((v,E)=>a.jsxs("figure",{className:"q-img",children:[a.jsx("img",{src:He(v),alt:""}),a.jsx("figcaption",{children:dy(E===0?t.service.word1:t.service.word2,E===0)})]},E))})]}):t.answer.mode==="match"?a.jsx(Ty,{q:t}):b&&m.length===b.length?a.jsx(cd,{q:t,choices:b,imgs:m,theme:n.theme}):b?a.jsx(cd,{q:t,choices:b,theme:n.theme}):t.answer.mode==="order"?a.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((v,E)=>{const P=t.answer.choices.find(D=>D.key===v);return a.jsxs("div",{className:"oi",children:[a.jsx("b",{children:v}),a.jsx("span",{className:"oi-pos",children:E+1}),a.jsx("span",{className:"oi-text",children:(P==null?void 0:P.text)??""})]},E)})}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"answer-main",children:ii(t)}),w.length>0&&a.jsx("div",{className:`q-media-grid answer-media n${Math.min(w.length,4)}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,children:w.map((v,E)=>a.jsx(Ra,{src:He(v)},E))})]}),p&&t.answer_note&&a.jsx("div",{className:`answer-note${oy(t.answer_note)}`,children:t.answer_note})]})]}),!s&&a.jsxs("div",{className:"team-answers",children:[a.jsx("div",{className:"mono-tag",children:o?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${u.length}`}),u.length===0&&a.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),u.map(v=>{const E=c.find(D=>D.id===v.team_id)??l.find(D=>D.id===v.team_id),P=p?v.is_correct??Pi(t.answer,v.answer_text):null;return a.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${P===!0?"var(--ok)":P===!1?"var(--danger)":"var(--dim)"}`},children:[a.jsx("span",{className:"name",style:{color:E==null?void 0:E.color},children:(E==null?void 0:E.name)??"—"}),a.jsxs("span",{className:"text",children:[o?v.answer_text||"—":"• • •",v.stake!=null&&v.stake!==0&&a.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",v.stake]})]}),P!=null&&a.jsx("span",{className:"mark",style:{color:P?"var(--ok)":"var(--danger)"},children:P?"✓":"✗"})]},v.id)})]})]}),M]})}function cd({q:n,choices:e,imgs:t,theme:i}){const[s,r]=H.useState(0);H.useEffect(()=>{r(0);const h=setTimeout(()=>r(1),2200),p=setTimeout(()=>r(2),ku);return()=>{clearTimeout(h),clearTimeout(p)}},[n.id]);const o=n.answer.correct_choice??"",c=e.filter(h=>h.key!==o),l=new Set(uy(c.map(h=>h.key),n.id).slice(0,2)),d=h=>s>=1||l.has(h)?s<2?"":h===o?" correct":" dimmed":" hidden-yet",u=h=>l.has(h)?0:.25*e.filter(p=>!l.has(p.key)).findIndex(p=>p.key===h),f=i==="potter";return t?a.jsx("div",{className:"choice-imgs",children:e.map((h,p)=>a.jsxs("div",{className:`choice-img${d(h.key)}`,style:{animationDelay:`${u(h.key)}s`},children:[a.jsx("img",{src:He(t[p]),alt:""}),a.jsxs("span",{className:"key",children:[h.key,h.text?` — ${h.text}`:""]})]},h.key))}):a.jsx("div",{className:`choices-grid${yh(e.map(h=>h.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(h=>a.jsxs("div",{className:`choice-plate${d(h.key)}`,style:{animationDelay:`${u(h.key)}s`},children:[a.jsx("span",{className:"key",children:h.key}),h.text,f&&d(h.key)===" correct"&&a.jsx(Ey,{})]},h.key))})}function Ey(){return a.jsx("svg",{className:"mg-check",viewBox:"0 0 24 24",width:"26",height:"26","aria-hidden":"true",children:a.jsx("path",{d:"M4 13l5 5L20 6",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}function ld({enabled:n,startedAt:e,seconds:t}){return H.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Bi()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function dd({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return H.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,o=Math.max(500,r-Date.now()),c=Lt(e),l=setTimeout(()=>{li(e.question_index+1,c).catch(Tt)},o);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function Ty({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return a.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var l;const o=((l=i.find(d=>d.startsWith(s)))==null?void 0:l.slice(s.length))??"—",c=(e.right_labels??[])[(e.right??[]).indexOf(o)]||o;return a.jsxs("div",{className:"mi",children:[t[r]&&a.jsx("img",{src:He(t[r]),alt:""}),a.jsxs("div",{className:"mi-label",children:[a.jsxs("b",{children:[s," → ",o]}),c&&c!==o&&a.jsx("span",{className:"mi-text",children:c})]})]},s)})})}function Ay({pack:n,gameState:e}){const t=Wn(e.game_id),i=fs(e.game_id),s=_d(n,t,i),r=vd(n,t,i),o=n.rounds.filter(m=>!m.off_scoreboard),c=Da(t,s,i,r),l=c.map(m=>m.team),[d,u]=H.useState(0);H.useEffect(()=>{if(u(0),l.length===0)return;const m=setInterval(()=>u(g=>g>=l.length?g:g+1),2200);return()=>clearInterval(m)},[l.length,e.round_number]);const f=H.useRef(null),h=pd([l.length,o.length],{shrinkBefore:f}),p=H.useMemo(()=>{const m=new Map(t.map(y=>{const w=s.get(y.id)??0,S=(r.get(y.id)??[])[e.round_number]??0;return[y.id,w-S]})),g=new Map(t.map(y=>[y.id,(r.get(y.id)??[]).slice(0,e.round_number)]));return Da(t,m,i,g).map(y=>y.team)},[t,s,r,i,e.round_number]),x=H.useRef(new Map),b=H.useRef(null);if(H.useLayoutEffect(()=>{if(n.theme!=="classic"&&n.theme!=="potter"||l.length===0||d<l.length||b.current===e.round_number||(b.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const g=new Map(p.map((w,S)=>[w.id,S]));l.forEach((w,S)=>{const T=x.current.get(w.id);if(!T)return;const R=(g.get(w.id)??S)-S;if(R===0)return;const v=T.getBoundingClientRect().height;T.style.transition="none",T.style.transform=`translateY(${R*v}px)`,T.classList.add("sb-flip"),T.offsetHeight,requestAnimationFrame(()=>{T.style.transition="",T.style.transform=""})});const y=setTimeout(()=>{x.current.forEach(w=>w.classList.remove("sb-flip"))},900);return()=>clearTimeout(y)},[d,l,p,n.theme,e.round_number]),At(n.theme)){const m=o.map(T=>n.rounds.indexOf(T)),g=Ff(m,e.round_number,c.map(T=>m.map(M=>(r.get(T.team.id)??[])[M]??0))),y=m.slice(0,g),w=m.some(T=>T<e.round_number),S={kind:"regular",title:"Табло",sub:`после раунда ${g} из ${o.length}`,flip:!1,cols:y.map(T=>en(n,T)),rows:Nd(c,r,y,si,w?{order:p.map(T=>T.id)}:void 0)};return a.jsxs(a.Fragment,{children:[a.jsx(Id,{view:S,reveal:d,flipKey:w?String(e.round_number):null}),a.jsx("div",{className:"host-actions",children:a.jsx(Cn,{pack:n,gameState:e})})]})}return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),a.jsx("h2",{className:"sb-title",ref:f,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),a.jsx("div",{className:"sb-table-wrap",children:a.jsxs("table",{ref:h,className:`score-table${zu(l.length)}`,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),o.map((m,g)=>a.jsxs("th",{children:["Р",g+1]},m.id)),a.jsx("th",{children:"Σ"})]})}),a.jsx("tbody",{children:l.map((m,g)=>{const y=c.find(T=>T.team.id===m.id),w=(y==null?void 0:y.place)??1,S=g>=l.length-d;return a.jsxs("tr",{ref:T=>{T?x.current.set(m.id,T):x.current.delete(m.id)},className:`sb-row${S?" is-in":" is-veiled"}${w===1?" leader":""}`,children:[a.jsxs("td",{children:[w<=3?a.jsx("span",{className:"sb-medal",children:a.jsx(Oa,{theme:n.theme,place:w})}):w,(y==null?void 0:y.shared)&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:m.color,fontFamily:"var(--font-display)"},children:a.jsx("span",{className:"sb-name",children:m.name})}),o.map(T=>{const M=r.get(m.id)??[];return a.jsx("td",{children:M[n.rounds.indexOf(T)]??0},T.id)}),a.jsx("td",{className:"total",children:s.get(m.id)??0})]},m.id)})})]})}),a.jsx("div",{className:"host-actions",children:a.jsx(Cn,{pack:n,gameState:e})})]})}function Cy({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=H.useState(i*60);H.useEffect(()=>{const l=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),d=()=>r(Math.max(0,Math.round(i*60-(Date.now()-l)/1e3)));d();const u=setInterval(d,500);return()=>clearInterval(u)},[t.timer_started_at,i]);const o=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return At(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Li,{view:{state:"break",clock:Pd(s),sub:"Антракт · скоро продолжим"},step:"break"}),a.jsx("div",{className:"host-actions",children:a.jsx(Cn,{pack:n,gameState:t})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen",children:[n.theme!=="potter"&&a.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),a.jsx(wn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),a.jsx(gr,{theme:n.theme}),n.theme==="potter"&&a.jsx(md,{left:s,seconds:i*60,low:s<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"host-actions",children:a.jsx(Cn,{pack:n,gameState:t})})]})}function Ry({pack:n,gameState:e}){var l,d;const[i,s]=H.useState(300);H.useEffect(()=>{const u=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),f=()=>s(Math.max(0,Math.round(5*60-(Date.now()-u)/1e3)));f();const h=setInterval(f,500);return()=>clearInterval(h)},[e.timer_started_at]),H.useEffect(()=>{var h,p;const u=((h=n.settings)==null?void 0:h.finale_music)??((p=n.settings)==null?void 0:p.bg_music);if(!u||document.hidden)return;const f=Jt();return f.src=He(u),f.loop=!0,f.volume=.55,f.play().catch(()=>{}),()=>{try{f.pause(),f.src=""}catch{}}},[(l=n.settings)==null?void 0:l.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=Wn(At(n.theme)?e.game_id:null),o=String(Math.floor(i/60)).padStart(2,"0"),c=String(i%60).padStart(2,"0");return At(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Li,{view:{state:"antic",hues:r.map(u=>En(u.color)),title:"Подводим итоги",sub:"Скоро объявим победителей",clock:Pd(i)},step:`antic-${r.length>0}`}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void Ia(e.pack_id,!0),children:"К итогам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[a.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),a.jsx(wn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),a.jsx(gr,{theme:n.theme}),n.theme==="potter"&&a.jsx(md,{left:i,seconds:5*60,low:i<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void Ia(e.pack_id,!0),children:"К итогам →"})})]})}function Ny({pack:n,gameId:e,gameState:t}){var E,P,D,L,W,B,X;const i=Wn(e),s=fs(e),r=_d(n,i,s),o=vd(n,i,s),c=Da(i,r,s,o),l=!!t.reveal,d=t.question_index??0,[u,f]=H.useState(!((E=n.settings)!=null&&E.show_final_cinematic));H.useEffect(()=>{var K,ie;const k=((K=n.settings)==null?void 0:K.finale_music)??((ie=n.settings)==null?void 0:ie.bg_music);if(!k||document.hidden||!u)return;const U=Jt();return U.src=He(k),U.loop=!0,U.volume=.55,U.play().catch(()=>{}),()=>{try{U.pause(),U.src=""}catch{}}},[(P=n.settings)==null?void 0:P.finale_music,(D=n.settings)==null?void 0:D.bg_music,u]);const h=H.useRef(null),p=pd([c.length],{shrinkBefore:h,minScale:.3}),x=n.rounds.map((k,U)=>({r:k,i:U})).filter(k=>!k.r.off_scoreboard),b=x.map(({r:k,i:U})=>{var pe;let K=null,ie=-1/0;for(const he of i){const me=((pe=o.get(he.id))==null?void 0:pe[U])??0;me>ie&&(ie=me,K=he)}return{round:k,idx:U,team:K,score:ie}}),m=3e3,g=1e4,y=b.length;H.useEffect(()=>{if(l||d>y||!u)return;const U=setTimeout(()=>void Qn(d+1),d===y?g:m);return()=>clearTimeout(U)},[l,d,y,u]);const[w,S]=H.useState(0);H.useEffect(()=>{if(S(0),c.length===0)return;let k=!1,U=0,K;const ie=()=>{k||(U+=1,S(U),!(U>=c.length)&&(K=setTimeout(ie,Math.max(320,900-90*U))))};return K=setTimeout(ie,Math.max(320,900-90*U)),()=>{k=!0,clearTimeout(K)}},[c.length,d,l]);const T=At(n.theme);if(!u)return T?a.jsx(dp,{hues:i.map(k=>En(k.color)),onDone:()=>f(!0)}):a.jsx(Kv,{onDone:()=>f(!0)});if(T){const k=a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Ys()},children:"⟲ Новая игра"})}),U=x.map(he=>he.i),K={kind:"final",title:"Итоги игры",sub:"разбивка по раундам",flip:!1,cols:U.map(he=>en(n,he)),rows:Nd(c,o,U,si)},ie=a.jsxs(a.Fragment,{children:[a.jsx(Id,{view:K,reveal:w,flipKey:null}),k]}),pe=()=>void Qn(d+1);if(l){const he=[...new Set(c.map(ge=>ge.place))].filter(ge=>ge<=3).sort((ge,Be)=>Be-ge);if(d>=he.length)return ie;const me=new Set(he.slice(0,d+1)),Pe=Of(c,si,En).filter(ge=>me.has(ge.place));return a.jsx(Li,{view:{state:"medals",slots:Pe},step:`medals-${d}`,only:he[d]-1,onClick:pe})}if(d<y){const he=b.map(me=>({n:en(n,me.idx),name:me.round.title_lines.join(" ").replace(/\s+/g," ").trim(),team:me.team?{name:me.team.name,color:si(me.team.color)}:null,pts:me.team?me.score:0}));return a.jsx(Li,{view:{state:"retro",cards:he,shown:d+1},step:`retro-${d}`,only:d,onClick:pe})}if(d===y){const he=c.filter(me=>me.place===1);return a.jsx(Li,{view:{state:"winner",names:he.map(me=>({name:me.team.name,color:si(me.team.color)})),sum:((L=he[0])==null?void 0:L.total)??0,hues:i.map(me=>En(me.color))},step:"winner",onClick:pe})}return ie}const M=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],R=a.jsx(a.Fragment,{children:Array.from({length:5},(k,U)=>a.jsxs("div",{className:"fw-burst",style:{left:`${12+U*19}%`,top:`${18+U%3*14}%`},children:[a.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${M[U%M.length]}55, transparent 70%)`,"--dur":`${2.2+U*.3}s`,"--delay":`${U*.45}s`}}),Array.from({length:10},(K,ie)=>a.jsx("span",{className:"fw-spark",style:{background:M[(U+ie)%M.length],"--a":`${ie*36}deg`,"--dur":`${2.2+U*.3}s`,"--delay":`${U*.45}s`}},ie))]},U))}),v=a.jsxs("div",{className:"fin-breakdown",children:[a.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),a.jsx("div",{className:"fin-table-wrap",children:a.jsxs("table",{ref:p,className:`fin-table${zu(c.length)}`,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),n.rounds.map((k,U)=>!k.off_scoreboard&&a.jsxs("th",{children:["Р",en(n,U)]},k.id)),a.jsx("th",{children:"Σ"})]})}),a.jsx("tbody",{children:c.map(({team:k,place:U,shared:K},ie)=>{const pe=ie>=c.length-w;return a.jsxs("tr",{className:`fin-row${U<=3?" top3":""}${U===1?" fin-first":""}${pe?" is-in":" is-veiled"}`,children:[a.jsxs("td",{className:"fin-pos",children:[U,K&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:k.color},children:a.jsx("span",{className:"sb-name",children:k.name})}),n.rounds.map((he,me)=>{var Pe;return!he.off_scoreboard&&a.jsx("td",{children:((Pe=o.get(k.id))==null?void 0:Pe[me])??0},he.id)}),a.jsx("td",{children:a.jsx("b",{children:r.get(k.id)??0})})]},k.id)})})]})})]});if(l){const k=[...new Set(c.map(ie=>ie.place))].filter(ie=>ie<=3).sort((ie,pe)=>pe-ie);if(d>=k.length)return a.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[R,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(wn,{ref:h,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),v,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Ys()},children:"⟲ Новая игра"})})]});const U=k[d],K=c.filter(ie=>ie.place===U);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void Qn(d+1),children:[U===1&&R,a.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),a.jsxs("div",{className:`fin-award p${U}`,children:[a.jsxs("div",{className:"fin-award-place",children:[U," МЕСТО"]}),a.jsx("div",{className:"fin-award-medal",children:a.jsx(Oa,{theme:n.theme,place:U})}),K.length>0?K.map(ie=>a.jsx("div",{className:"fin-award-name",style:{color:ie.team.color},children:ie.team.name},ie.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(d<y){const k=b[d];return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void Qn(d+1),children:[a.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),a.jsxs("div",{className:"fin-slide",children:[a.jsxs("div",{className:"fin-slide-round",children:["Раунд ",en(n,k.idx)," · ",k.round.title_lines.join(" ")]}),a.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),a.jsx("div",{className:"fin-slide-team",style:{color:(W=k.team)==null?void 0:W.color},children:((B=k.team)==null?void 0:B.name)??"—"})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"3s"}})},d),a.jsx("div",{className:"fin-dots",children:b.map((U,K)=>a.jsx("span",{className:K===d?"on":""},K))})]})}if(d===y){const k=c.filter(U=>U.place===1);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void Qn(d+1),children:[R,a.jsx("div",{className:"mono-tag",children:k.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),a.jsxs("div",{className:"fin-award p1",children:[a.jsx("div",{className:"fin-award-medal",children:a.jsx(Oa,{theme:n.theme,place:1})}),k.length>0?k.map(U=>a.jsx("div",{className:"fin-award-name",style:{color:U.team.color},children:U.team.name},U.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"}),a.jsx("div",{className:"fin-award-score",children:((X=k[0])==null?void 0:X.total)??0})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return a.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[R,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(wn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),v,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Ys()},children:"⟲ Новая игра"})})]})}export{jy as HostScreen,oy as noteClass,ly as stopAllMedia};
