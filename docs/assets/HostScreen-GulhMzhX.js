import{j as a,s as St,a as ih}from"./index-CNDrJPYO.js";import{u as sh,R as rh,a as ah,s as oh,b as ch}from"./useGameState-CYuCH00n.js";import{r as G}from"./vendor-BbIxR9j-.js";import{c as en,t as Gi,h as Rn,m as lh,u as gs,a as Md,S as gn,s as Ac,R as dh,B as uh,b as hh,d as fh,i as ph,e as yd,f as Go,D as mh,g as Tn,j as wr,k as gh,l as bd,A as jo,n as Ho,T as Vo,Q as Cc,o as Ui,p as xh,q as Rc,r as cs,v as _h,M as vh,w as Mh,J as yh,x as bh,y as Ln,z as Sd,C as Sh,F as wh,E as wn,G as Nc,H as Eh,I as Th,K as Ah,L as Ch,N as Oa,O as oi,P as Rh,U as Nh,V as Ph,W as Lh,X as Ih,Y as Dh,Z as Uh,_ as Fh,$ as Oh,a0 as Pc,a1 as wd,a2 as Bh,a3 as kh,a4 as zh}from"./AnswerScreen-BT2D-BUA.js";import{m as He,a as ci,u as Un,i as Dr,s as Lc,c as Gh,p as jh,r as Hh,b as Ed,d as Vh,e as Ic,l as Ba,f as Td,g as Ad,h as Cd,j as Wh,k as $h}from"./jeopardyActions-faxlgYlB.js";import{t as dr,n as Xh,l as qh,a as Yh,b as Kh,g as Zh,s as Jh,c as Qh,d as fi,e as _t,q as vt,m as ys,f as Kt,h as hs,r as ji,i as Rd,j as Er,k as er,o as ef,p as tf,u as Nd,v as ka,w as Xi,x as nf,y as sf,z as Ur,A as rf,N as Dc,B as af,S as of,C as Fr,D as bs,E as cf,M as Uc,F as Or,G as Br,H as Fc,I as lf,J as df,K as Oc,L as uf,O as Bc,P as za,Q as ii,R as hf,T as ff,U as pf}from"./Hint-Tta9wzeS.js";import{l as mf,N as Ss,a as kc,b as zc,S as gf,T as xf,i as Pd,c as _f,d as vf,e as Mf,f as Rt,R as yf,r as bf,g as Sf,B as wf}from"./ThemeLayer-BZ6N4PdB.js";import{u as Ef,F as Tf,g as nt,f as Af}from"./shell-CCmYLmlh.js";import{Q as ur}from"./QrCode-BoXuuOIS.js";import{f as Ld,F as Id,u as Cf}from"./fromQuestion-D0h7Kyrl.js";import{L as Rf,r as Ga}from"./ranking-UQFzelLG.js";import{C as Gc}from"./CrosswordView-C31_6oh9.js";import{room as Dd}from"./index-BUAp_KS_.js";import"./pollLoop-BPx8gArJ.js";import"./localPin-DkJiSnQz.js";function jc({pack:n}){var e,t;return G.useEffect(()=>{var l,u;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((u=n==null?void 0:n.settings)==null?void 0:u.bg_music);if(!i)return;const s=en();s.src=He(i),s.loop=!0,s.volume=.45;let r=!1,o=!1;const c=()=>{o||r||(o=!0,s.play().then(()=>{if(r)try{s.pause(),s.src=""}catch{}}).catch(()=>{}),window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c))};return s.play().then(()=>{if(o=!0,r)try{s.pause(),s.src=""}catch{}}).catch(()=>{r||(window.addEventListener("pointerdown",c),window.addEventListener("keydown",c))}),()=>{r=!0,window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c);try{s.pause(),s.src=""}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}const Nf=["stands_crowd.webp","village_mid.webp","village_2.webp","spruce_set.webp","butterfly.webp"];let kr=!1;function Pf(n,e=fetch){if(!kr){kr=!0;for(const t of Nf)e(`${n}arena/${t}`).then(i=>i.blob()).catch(()=>{kr=!1})}}let ws=null;const Lf=1e-4;function Hc(){try{if(ws){ws.state==="suspended"&&ws.resume().catch(()=>{});return}const n=window.AudioContext??window.webkitAudioContext;if(!n)return;const e=new n,t=Math.max(1,Math.floor(e.sampleRate*2)),i=e.createBuffer(1,t,e.sampleRate),s=i.getChannelData(0);for(let c=0;c<t;c++)s[c]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=i,r.loop=!0;const o=e.createGain();o.gain.value=Lf,r.connect(o),o.connect(e.destination),r.start(),ws=e,e.state==="suspended"&&e.resume().catch(()=>{})}catch{}}function If(){const n=()=>Hc();return Hc(),window.addEventListener("pointerdown",n),window.addEventListener("keydown",n),()=>{window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)}}function Ud({hue:n,id:e}){const t=`hsl(${n} 90% 88%)`,i=`hsl(${n} 78% 62%)`,s=`hsl(${n} 60% 26%)`;return a.jsxs("svg",{className:"b-lan",viewBox:"-60 0 120 170","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:`bl-${e}`,cx:"50%",cy:"58%",r:"60%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf0"}),a.jsx("stop",{offset:".22",stopColor:t}),a.jsx("stop",{offset:".62",stopColor:i}),a.jsx("stop",{offset:"1",stopColor:s})]}),a.jsxs("radialGradient",{id:`bg-${e}`,children:[a.jsx("stop",{offset:"0",stopColor:`hsl(${n} 95% 76%)`,stopOpacity:".65"}),a.jsx("stop",{offset:"1",stopColor:`hsl(${n} 95% 60%)`,stopOpacity:"0"})]})]}),a.jsx("ellipse",{className:"glow",cx:"0",cy:"92",rx:"92",ry:"98",fill:`url(#bg-${e})`}),a.jsx("g",{className:"cordg",children:a.jsx("line",{className:"cord",x1:"0",y1:"0",x2:"0",y2:"34",stroke:"#c9a566",strokeWidth:"2.4"})}),a.jsx("g",{transform:"translate(0 34)",children:a.jsxs("g",{className:"lbody",children:[a.jsx("ellipse",{cx:"0",cy:"4",rx:"13",ry:"5",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"1.6"}),a.jsx("path",{d:"M 0 8 C 32 12 46 54 31 96 C 23 116 9 128 0 134 C -9 128 -23 116 -31 96 C -46 54 -32 12 0 8 Z",fill:`url(#bl-${e})`,stroke:"#d9b36a",strokeWidth:"2"}),a.jsxs("g",{className:"ribs",fill:"none",stroke:"#d9b36a",strokeWidth:"1.8",opacity:".85",children:[a.jsx("path",{d:"M 0 8 C 14 40 14 100 0 134"}),a.jsx("path",{d:"M 0 8 C -14 40 -14 100 0 134"}),a.jsx("path",{d:"M 0 8 C 28 40 30 96 0 134"}),a.jsx("path",{d:"M 0 8 C -28 40 -30 96 0 134"})]}),a.jsx("ellipse",{cx:"-14",cy:"44",rx:"6",ry:"14",fill:"#fff",opacity:".35",transform:"rotate(14 -14 44)"}),a.jsx("path",{d:"M -10 136 L 0 156 L 10 136 Z",fill:"#d9b36a",opacity:".9"}),a.jsx("path",{d:"M -18 130 L -14 150 L -6 134 Z M 18 130 L 14 150 L 6 134 Z",fill:"#b88c46",opacity:".8"})]})})]})}const tt={x:960,y:592,rx:250,ry:270},tr=704,nr=1216,Df=[{py:322,ey:200},{py:474,ey:420},{py:626,ey:630}],Uf=[{py:304,ey:188},{py:424,ey:366},{py:544,ey:522},{py:664,ey:664}],Ff=n=>n<=12?Df:Uf,ja=(n,e,t,i)=>{const s=n[t],r=e<0?tr:nr,o=e<0?-30:1950,c=(i-r)/(o-r);return s.py+(s.ey-s.py)*c+Math.sin(c*Math.PI)*38},Of=n=>n<=4?44:n<=6?38:n<=9?34:n<=12?31:n<=16?27:24;function Bf(n){const e=Ff(n),t=e.length,i=Math.ceil(n/2),s=Math.max(1,Math.ceil(i/t)),r=c=>(n<=6?580:570)-c*(s===2?300:215),o=[];for(let c=0;c<n;c++){const l=c%2?1:-1,u=Math.floor(c/2),d=Math.floor(u/t),h=u%t,p=l<0?r(d):1920-r(d);o.push({x:p,ay:ja(e,l,h,p),side:l,k:h,col:d})}return{slots:o,ropes:e,cols:s,sc:n<=6?1.15:n<=12?.8:n<=16?.72:.62,nameW:s===1?270:s===2?204:150,fs:Of(n)}}const kf=(n,e)=>`M ${tt.x} ${tt.y} C ${tt.x+(n-tt.x)*.2} ${tt.y-260}, ${n-(n-tt.x)*.35} ${e-180}, ${n} ${e}`,zr={Q:.735,U:.694,I:.304,Z:.599," ":.25,P:.577,A:.647,R:.616,T:.575,Y:.638},zf=n=>{const e=(n-380)/1160;return 66+Math.sin(Math.max(0,Math.min(1,e))*Math.PI)*54},Gf=(()=>{let i=960-[..."QUIZ PARTY"].reduce((s,r)=>s+zr[r]*170+12,-12)/2;return[..."QUIZ PARTY"].flatMap((s,r)=>{const o=i+zr[s]*170/2;return i+=zr[s]*170+12,s===" "?[]:[{c:s,i:r,x:o}]})})(),Ha=24,Vc=Array.from({length:Ha},(n,e)=>{const t=e/Ha*Math.PI*2-Math.PI/2;return{x:tt.x+Math.cos(t)*tt.rx,y:tt.y+Math.sin(t)*tt.ry}}),Wo=n=>Math.min(Ha,4+n*2);function jf({teams:n,layout:e,fresh:t,qr:i,qrLit:s,litN:r,wait:o,rootRef:c,children:l}){const u=Ef(),{slots:d,ropes:h,sc:p,nameW:m}=e,x=[-1,1].flatMap(f=>h.flatMap((v,w)=>Array.from({length:9},(b,E)=>{const S=f<0?tr:nr,N=S+f*(40+E*76);return{x:N,y:ja(h,f,w,N)+4,o:w*9+E+(f<0?0:1)}}))).sort((f,v)=>f.o-v.o),M=Array.from({length:9},(f,v)=>{const w=v/8;return{x:960+(v%2?14:-14)*(1-w*.4),y:1040-w*190,w:120-w*70,h:24-w*12}}),g=r;return a.jsxs("div",{className:"lb3 lb3-b s1",ref:c,children:[!u&&a.jsx(Tf,{rects:[],hazeK:0}),a.jsx("div",{className:"b-grade"}),a.jsxs("svg",{className:"lb3-bg b-bg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:"bMoonG",children:[a.jsx("stop",{offset:"0",stopColor:"#fff7dc",stopOpacity:".95"}),a.jsx("stop",{offset:".3",stopColor:"#ffe6a8",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffe6a8",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bMoon",cx:"40%",cy:"38%",r:"70%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf2"}),a.jsx("stop",{offset:".6",stopColor:"#f3e2ae"}),a.jsx("stop",{offset:"1",stopColor:"#c9b27a"})]}),a.jsxs("linearGradient",{id:"bWood",x1:"0",y1:"0",x2:"1",y2:"0",children:[a.jsx("stop",{offset:"0",stopColor:"#1a0f08"}),a.jsx("stop",{offset:".35",stopColor:"#6b4526"}),a.jsx("stop",{offset:".6",stopColor:"#4a2e18"}),a.jsx("stop",{offset:"1",stopColor:"#140b06"})]}),a.jsxs("linearGradient",{id:"bText",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0",stopColor:"#fffbe6"}),a.jsx("stop",{offset:".5",stopColor:"#ffe29a"}),a.jsx("stop",{offset:"1",stopColor:"#f0b350"})]}),a.jsxs("radialGradient",{id:"bPool",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd98a",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffd98a",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bGoldG",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd68a",stopOpacity:".3"}),a.jsx("stop",{offset:"1",stopColor:"#ffd68a",stopOpacity:"0"})]}),a.jsx("filter",{id:"bBlur2",children:a.jsx("feGaussianBlur",{stdDeviation:"5"})}),a.jsxs("filter",{id:"bNoise",x:"0",y:"0",width:"100%",height:"100%",children:[a.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.02 0.3",numOctaves:"3",seed:"3"}),a.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -1"})]})]}),a.jsx("circle",{cx:tt.x,cy:tt.y,r:"430",fill:"url(#bMoonG)",opacity:".5"}),a.jsx("g",{transform:`translate(${tt.x} ${tt.y})`,children:a.jsxs("g",{className:"b-moon",children:[a.jsx("circle",{r:"210",fill:"url(#bMoon)"}),a.jsx("circle",{cx:"-70",cy:"-50",r:"34",fill:"#cdb67f",opacity:".5"}),a.jsx("circle",{cx:"50",cy:"40",r:"52",fill:"#cdb67f",opacity:".38"}),a.jsx("circle",{cx:"-20",cy:"96",r:"22",fill:"#cdb67f",opacity:".45"}),a.jsx("circle",{cx:"94",cy:"-84",r:"20",fill:"#cdb67f",opacity:".4"})]})}),M.map((f,v)=>a.jsxs("g",{className:"b-stones",children:[a.jsx("ellipse",{cx:f.x,cy:f.y,rx:f.w,ry:f.h,fill:"#17352c",stroke:"#0a1d17",strokeWidth:"2"}),a.jsx("ellipse",{className:"b-stone",cx:f.x,cy:f.y,rx:f.w*.9,ry:f.h*.8,fill:"url(#bPool)",opacity:v<2+Math.min(1,n.length/12)*7?.9:.18})]},v)),a.jsxs("g",{className:"b-ringg",children:[[tr,nr].map((f,v)=>a.jsxs("g",{children:[a.jsx("rect",{x:f-32,y:"250",width:"64",height:"590",rx:"14",fill:"url(#bWood)"}),[0,1,2,3,4,5,6].map(w=>a.jsx("path",{d:`M ${f-32} ${300+w*80} h 64`,stroke:"#0a0502",strokeWidth:"3",opacity:".6"},w)),a.jsx("rect",{x:f-32,y:"250",width:"64",height:"590",rx:"14",filter:"url(#bNoise)",opacity:".5"}),a.jsx("rect",{x:f-42,y:"236",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"}),a.jsx("rect",{x:f-42,y:"826",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"})]},v)),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"#0e0804",strokeWidth:"38"}),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"url(#bWood)",strokeWidth:"30"}),[0,1,2].map(f=>a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx+(f-1)*7,ry:tt.ry+(f-1)*7,fill:"none",stroke:f===1?"#9b6a3a":"#2f1c0e",strokeWidth:"3",strokeDasharray:f===1?"70 22":"40 40",opacity:".8"},f)),Vc.filter((f,v)=>v%2===0).map((f,v)=>a.jsxs("g",{transform:`translate(${f.x} ${f.y}) rotate(${v*47%360})`,children:[a.jsx("ellipse",{cx:"14",cy:"-6",rx:"15",ry:"6",fill:"#2f7a4a",stroke:"#144a2a",strokeWidth:"1.2"}),a.jsx("ellipse",{cx:"-12",cy:"7",rx:"12",ry:"5",fill:"#3f9a5c",stroke:"#144a2a",strokeWidth:"1.2"})]},`l${v}`)),Vc.map((f,v)=>a.jsx("g",{transform:`translate(${f.x} ${f.y})`,children:a.jsx("circle",{className:`b-rb${v<g?" on":""}`,r:"8",fill:"#ffe2a0",opacity:v<g?1:.28,style:{filter:"drop-shadow(0 0 7px #ffc766)"}})},v))]}),a.jsx("g",{className:"b-ropes",fill:"none",stroke:"#c9a566",strokeWidth:"2.4",opacity:".85",children:[-1,1].flatMap(f=>h.map((v,w)=>{const b=f<0?tr:nr,E=f<0?-30:1950,S=Array.from({length:21},(N,y)=>{const A=b+(E-b)*(y/20);return`${A.toFixed(0)} ${ja(h,f,w,A).toFixed(0)}`});return a.jsx("path",{d:`M ${S.join(" L ")}`},`${f}${w}`)}))}),x.map((f,v)=>a.jsx("circle",{className:"b-bulb",cx:f.x,cy:f.y,r:"4.5",fill:"#ffe2a0",opacity:v<10+n.length*4?.9:.25,style:{filter:"drop-shadow(0 0 6px #ffc766)"}},v)),d.map((f,v)=>a.jsx("ellipse",{cx:f.x,cy:f.ay+80,rx:"140",ry:"120",fill:"url(#bPool)",opacity:".35"},`p${n[v].id}`)),a.jsx("g",{className:"b-gold",opacity:"0",children:a.jsx("ellipse",{cx:"960",cy:tt.y,rx:"980",ry:"500",fill:"url(#bGoldG)"})}),d.map((f,v)=>a.jsx("path",{className:"b-spark","data-id":n[v].id,d:kf(f.x,f.ay),pathLength:1,fill:"none",stroke:"#fff6cf",strokeWidth:"7",strokeLinecap:"round",strokeDasharray:"0.07 1.2",opacity:"0",style:{filter:"drop-shadow(0 0 10px #ffd37a)"}},`k${n[v].id}`)),a.jsxs("g",{className:"b-logo",children:[a.jsx("path",{className:"b-swag",d:"M 380 66 C 640 140 1280 140 1540 66",fill:"none",stroke:"#c9a566",strokeWidth:"3"}),Array.from({length:15},(f,v)=>{const w=v/14,b=380+w*1160,E=66+Math.sin(w*Math.PI)*54+4;return a.jsx("circle",{className:"b-swag",cx:b,cy:E+2,r:"5",fill:"#ffe2a0",style:{filter:"drop-shadow(0 0 6px #ffc766)"}},v)}),Gf.map(f=>a.jsxs("g",{children:[a.jsx("line",{className:"b-cordL",x1:f.x,y1:zf(f.x)+2,x2:f.x,y2:"112",stroke:"#c9a566",strokeWidth:"2"}),a.jsx("text",{className:"b-letter-glow",x:f.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"#ffd98a",filter:"url(#bBlur2)",opacity:".85",children:f.c}),a.jsx("text",{className:"b-letter",x:f.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"url(#bText)",stroke:"#8a5a22",strokeWidth:"3",children:f.c})]},f.i))]})]}),i&&a.jsxs("div",{className:"b-stand",style:{left:64,top:806,"--lit":s?1:.3},children:[a.jsxs("svg",{viewBox:"0 0 270 270","aria-hidden":!0,children:[a.jsx("ellipse",{className:"b-aura",cx:"135",cy:"125",rx:"200",ry:"170",fill:"url(#bPool)",opacity:s?1:0}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"#2a1a0e",stroke:"#d9b36a",strokeWidth:"4"}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"none",stroke:"#ffe2a0",strokeWidth:"2",opacity:"var(--lit)",style:{filter:"drop-shadow(0 0 8px #ffc766)"}}),[34,80,135,190,236].map((f,v)=>a.jsx("circle",{cx:f,cy:v%2?16:20,r:"4.5",fill:"#ffe2a0",opacity:".75",style:{filter:"drop-shadow(0 0 5px #ffc766)"}},v))]}),a.jsx("div",{className:"b-qrbox",children:i}),a.jsx("div",{className:"b-qrcap",children:"Сканируй, чтобы играть"})]}),d.map((f,v)=>{const w=n[v];return a.jsxs("div",{className:`b-team side${f.side<0?"L":"R"}${t.has(w.id)?" fresh":""}`,"data-id":w.id,style:{left:f.x,top:f.ay,"--tc":Gi(w.hue),"--sc":p,"--nm":`${w.name.length>26?Math.round(e.fs*.84):e.fs}px`,"--nw":`${m}px`},children:[a.jsx("div",{className:"b-scale",children:a.jsx(Ud,{hue:w.hue,id:w.id})}),a.jsx("div",{className:"nm",children:a.jsx("span",{children:w.name})})]},w.id)}),o&&a.jsx("div",{className:"b-wait",children:"ждём команды…"}),l]})}const si=3.4,hr=.11,fr=.8,Wc=.9;function Hf(n){const e=n.reduce((r,o)=>r+o.length,0);let t=2166136261;for(const r of n.flat())for(let o=0;o<r.length;o++)t^=r.charCodeAt(o),t=Math.imul(t,16777619);const i=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296),s=Array.from({length:e},(r,o)=>o);for(let r=e-1;r>0;r--){const o=Math.floor(i()*(r+1));[s[r],s[o]]=[s[o],s[r]]}return s}function $o(n){const e=n.flatMap((t,i)=>t.map((s,r)=>({name:s,gi:i,j:r})));return{people:e,order:Hf(n),N:e.length,groups:n}}function Fd(n,e){const t=Math.max(1,...e.map(s=>s.length)),i=Math.min(n,4);return s=>{const r=1100+(s%i-(i-1)/2)*410;if(n<=4)return{cx:r,names:650,sigil:330,size:190,pitch:Math.max(28,Math.min(52,380/t))};const o=t<=4;return s<4?{cx:r,names:o?420:300,sigil:o?210:130,size:o?140:110,pitch:Math.max(26,Math.min(44,(o?140:250)/t))}:{cx:r,names:o?780:740,sigil:o?570:575,size:o?140:110,pitch:Math.max(26,Math.min(44,280/t))}}}const Vf=(n,e,t)=>{const i=n*Math.PI*2+e*Math.PI*6;return{x:1030+Math.cos(i)*(t>4?760:700),y:540+Math.sin(i)*230-Math.sin(e*Math.PI)*30}};function Wf(n,e,t,i){G.useEffect(()=>{if(!t||!t.length||!i)return;const{people:s,order:r,N:o}=$o(t),c=t.length,l=Fd(c,t),u=s.map(h=>{const p=l(h.gi);return{x:p.cx,y:p.names+h.j*p.pitch}}),d=()=>{const h=n()+(i==="done"||i==="back"?20:0),p=o*hr+fr,m=Math.max(0,Math.min(1,(h-Wc)/(si+p-Wc))),x=i==="intro"?0:Math.max(0,Math.min(1,(h-si)/p));e.current.forEach((M,g)=>{if(!M)return;const f=Math.max(0,Math.min(1,(x*p-r[g]*hr)/fr)),v=f*f*(3-2*f),w=Vf(r[g]/o,m,c),b=u[g];M.style.transform=`translate(${w.x+(b.x-w.x)*v-b.x}px, ${w.y+(b.y-w.y)*v-b.y}px) scale(${.82+.18*v})`,M.style.opacity=String(i==="back"?0:Math.min(1,m*14)),M.classList.toggle("landed",v>.98)})};return nt.ticker.add(d),d(),()=>nt.ticker.remove(d)},[t,i])}function $f({groups:n,pills:e}){const{people:t}=$o(n),i=n.length,s=Fd(i,n),r=t.length;return a.jsxs("div",{className:`rz3 rz-B${i>4?" k8":""}`,children:[a.jsxs("div",{className:"rz-head",children:[a.jsx("b",{children:"Составы команд"}),a.jsxs("span",{children:[i," · ",r," чел."]})]}),n.map((o,c)=>{const l=s(c),u=Rn(dr(c));return a.jsxs("div",{className:"rz-grp","data-g":c,style:{left:l.cx-190,top:l.sigil,width:380},children:[a.jsx("div",{className:"rz-sg b-sg",style:{height:l.size},children:a.jsx(Ud,{hue:u,id:`sg${c}`})}),a.jsxs("div",{className:"rz-gn",style:{color:Gi(u)},children:["Команда ",c+1]})]},c)}),t.map((o,c)=>{const l=s(o.gi);return a.jsx("span",{ref:u=>{u&&(e.current[c]=u)},className:"rz-n",style:{left:l.cx-115,top:l.names+o.j*l.pitch-20,opacity:0,"--tc":Gi(Rn(dr(o.gi)))},children:o.name},c)})]})}function Xf(n,e,t,i,s,r){const{groups:o,order:c,people:l,N:u}=$o(t);if(i==="back"){n.fromTo(e(s),{opacity:0},{opacity:1,duration:1.2,stagger:.05},.5).fromTo(e(".rz-veil"),{opacity:1},{opacity:0,duration:1.2,ease:"power2.inOut"},.3).fromTo(e(".rz-head, .rz-grp"),{opacity:1},{opacity:0,duration:.8,stagger:.04},.2);return}if(i==="done"){n.set(e(s),{opacity:0},0).set(e(".rz-veil, .rz-head, .rz-grp"),{opacity:1},0).fromTo(e(".rz-grp .rz-gn"),{opacity:.35,scale:.92},{opacity:1,scale:1,duration:.7,stagger:.12,ease:"back.out(2)"},.3).fromTo(e(".rz-grp .rz-sg"),{filter:"brightness(1.9)"},{filter:"brightness(1)",duration:1.2,stagger:.12},.3).to({},{duration:2.4},0);return}if(n.to(e(s),{opacity:0,duration:.8},.1).fromTo(e(".rz-veil"),{opacity:0},{opacity:1,duration:.8},.1).fromTo(e(".rz-head"),{opacity:0,y:14},{opacity:1,y:0,duration:.6},.5),i==="intro"){n.to({},{duration:4.6},0);return}n.fromTo(e(".rz-grp"),{opacity:0,y:14},{opacity:1,y:0,duration:.6,stagger:.1},si-1),o.forEach((d,h)=>{const p=Math.max(...d.map((m,x)=>c[l.findIndex(M=>M.gi===h&&M.j===x)]))*hr+fr;n.fromTo(e(`.rz-grp[data-g="${h}"] .rz-sg`),{filter:"brightness(1)"},{filter:"brightness(1.9)",duration:.4,yoyo:!0,repeat:1},si+p),r==null||r(si+p,h),n.fromTo(e(`.rz-grp[data-g="${h}"] .rz-gn`),{scale:.9},{scale:1,duration:.5,ease:"back.out(2)"},si+p)}),n.to({},{duration:si+u*hr+fr+.8},.1)}const Xo=n=>`.b-team[data-id="${CSS.escape(n)}"]`;function qf(n,e,t,i=0){n.fromTo(e(".b-bg"),{opacity:0},{opacity:1,duration:1},i).fromTo(e(".b-moon"),{opacity:0,scale:.7},{opacity:1,scale:1,duration:1.4,ease:"power2.out",transformOrigin:"0px 0px"},i+.2).fromTo(e(".b-ringg"),{opacity:0},{opacity:1,duration:1},i+.5).fromTo(e(".b-rb"),{opacity:0,scale:0},{opacity:s=>{var r;return(r=e(".b-rb")[s])!=null&&r.classList.contains("on")?1:.28},scale:1,duration:.4,stagger:{each:.045,from:"start"},ease:"back.out(3)",transformOrigin:"0px 0px"},i+.8).fromTo(e(".b-swag, .b-cordL"),{opacity:0},{opacity:1,duration:.8},i+1).fromTo(e(".b-letter"),{opacity:0,y:-50},{opacity:1,y:0,duration:.7,stagger:.07,ease:"back.out(1.6)"},i+1.2).fromTo(e(".b-letter-glow"),{opacity:.2},{opacity:1,duration:1,stagger:.05},i+1.9).fromTo(e(".b-stand"),{opacity:0,y:24},{opacity:1,y:0,duration:.9,ease:"power2.out"},i+.9),t.wait&&n.fromTo(e(".b-wait"),{opacity:0,y:10},{opacity:1,y:0,duration:.8},i+2.2),t.settled&&n.fromTo(e(".b-team:not(.fresh)"),{opacity:0},{opacity:1,duration:1.2,stagger:.06},i+.9)}function Yf(n,e,t,i,s){const r=Xo(t),o=Wo(i);n.set(e(r),{visibility:"visible"},s).fromTo(e(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},s).fromTo(e(".b-rb"),{scale:1},{scale:1.9,duration:.25,yoyo:!0,repeat:1,stagger:.012,transformOrigin:"0px 0px"},s).fromTo(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{strokeDashoffset:.08,opacity:1},{strokeDashoffset:-1,duration:.85,ease:"power1.inOut"},s+.15).to(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{opacity:0,duration:.2},s+.85).fromTo(e(`${r} .cordg`),{scaleY:0},{scaleY:1,duration:.45,ease:"power2.out",transformOrigin:"0px 0px"},s+.9).fromTo(e(`${r} .lbody`),{scale:.18,opacity:0,y:-10},{scale:1,opacity:1,y:0,duration:.8,ease:"back.out(1.7)",transformOrigin:"0px 0px"},s+1.2).fromTo(e(`${r} .ribs`),{scaleX:.2},{scaleX:1,duration:.7,ease:"power2.out",transformOrigin:"0px 0px"},s+1.3).fromTo(e(`${r} .glow`),{opacity:0},{opacity:1,duration:.9},s+1.4).fromTo(e(`${r} .b-lan`),{rotation:-5},{rotation:0,duration:1.6,ease:"elastic.out(1,0.35)",transformOrigin:"50% 0%"},s+1.7).fromTo(e(`${r} .nm`),{clipPath:"inset(0 100% 0 0)",opacity:0},{clipPath:"inset(0 0% 0 0)",opacity:1,duration:.8,ease:"power1.inOut"},s+1.8).to(e(".b-rb"),{opacity:c=>c<o?1:.28,duration:.5},s+.3)}function Gr(n,e,t,i){const s=Xo(t);n.to(e(`${s} .glow`),{opacity:.08,duration:1},i).to(e(`${s} .lbody`),{filter:"saturate(.2) brightness(.45)",y:10,duration:1.2},i).to(e(`${s} .nm`),{opacity:.38,duration:1},i)}function Kf(n,e,t,i){const s=Xo(t);n.to(e(`${s} .glow`),{opacity:1,duration:.8},i).to(e(`${s} .lbody`),{filter:"none",y:0,duration:.9},i).to(e(`${s} .nm`),{opacity:1,duration:.8},i)}function jr(n,e,t){n.fromTo(e(".b-stand"),{"--lit":.3},{"--lit":1,duration:1.1},t).fromTo(e(".b-aura"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:1.2,transformOrigin:"50% 50%"},t)}function Zf(n,e,t){n.to(e(".b-stand"),{"--lit":.3,duration:.8},t).to(e(".b-aura"),{opacity:0,duration:.8},t)}function Jf(n,e,t,i){n.to(e(".b-rb"),{opacity:s=>s<Wo(t)?1:.28,duration:.6},i)}function Qf(n,e,t,i=0){n.to(e(".b-team .nm"),{opacity:0,duration:.7},i+1).to(e(".b-team"),{x:s=>{var r;return(tt.x-(((r=t[s])==null?void 0:r.x)??tt.x))*.9},y:s=>{var r;return(tt.y-(((r=t[s])==null?void 0:r.y)??tt.y))*.9},scale:.15,opacity:0,duration:1.5,stagger:.06,ease:"power2.in",transformOrigin:"0px 0px"},i+1.1).to(e(".b-stand, .b-wait"),{opacity:0,y:40,duration:.9},i+1.6).to(e(".b-bulb, .b-ropes, .b-stones"),{opacity:0,duration:1},i+2.2).to(e(".b-logo"),{opacity:0,y:-80,duration:1,ease:"power2.in"},i+2.4).to(e(".b-rb"),{opacity:0,duration:.8,stagger:.02},i+2.5).to(e(".b-moon"),{scale:1.5,y:-130,opacity:0,duration:1.8,ease:"power2.in",transformOrigin:"0px 0px"},i+3).to(e(".b-ringg"),{y:100,opacity:0,duration:1.6,ease:"power2.in"},i+3.4).to(e(".b-grade"),{opacity:0,duration:1.4},i+3.6)}function ep({value:n,ink:e="#0d1a15"}){return a.jsx("div",{className:"fo-qr",children:a.jsx(ur,{value:n,quiet:!0,ink:e,title:"QR для подключения"})})}const tp=".b-team, .b-wait";function np({teams:n,playerUrl:e,paper:t,groups:i,groupsOpen:s,onGroupsOpen:r,onGroupsClose:o,leaving:c,onLeft:l}){const u=G.useRef(null),d=G.useMemo(()=>n.map(I=>({id:I.id,name:I.name,hue:Rn(I.color),alive:I.alive})),[n]),h=G.useMemo(()=>Bf(d.length),[d.length]),p=G.useMemo(()=>nt.utils.selector(u),[]),m=G.useRef(new Set(d.map(I=>I.id))),[,x]=G.useState(0),M=new Set(d.filter(I=>!m.current.has(I.id)).map(I=>I.id)),g=G.useRef(new Map(d.map(I=>[I.id,I.alive]))),f=G.useRef(new Set),v=G.useRef(Wo(d.length)),w=i.map(I=>I.join(",")).join("|"),b=i.length>0&&s,[E,S]=G.useState(i.length?s?"done":"back":void 0),N=G.useRef(null),y=G.useRef([]);Wf(()=>{var I;return((I=N.current)==null?void 0:I.time())??0},y,i.length?i:null,E),G.useLayoutEffect(()=>{const I=nt.timeline();return qf(I,p,{settled:!i.length,wait:d.length===0&&!i.length}),d.filter(B=>!B.alive).forEach(B=>{const F=nt.timeline();Gr(F,p,B.id,0),F.progress(1)}),()=>{I.kill()}},[]),G.useLayoutEffect(()=>{const I=d.filter(F=>!m.current.has(F.id)&&!f.current.has(F.id));I.forEach((F,H)=>{f.current.add(F.id);const K=nt.timeline({onComplete:()=>{m.current.add(F.id),f.current.delete(F.id),x($=>$+1)}});Yf(K,p,F.id,d.length,H*.35),F.alive||Gr(K,p,F.id,2.6+H*.35)}),d.forEach(F=>{const H=g.current.get(F.id);if(H!==void 0&&H!==F.alive&&m.current.has(F.id)){const K=nt.timeline();F.alive?Kf(K,p,F.id,0):Gr(K,p,F.id,0)}g.current.set(F.id,F.alive)}),!I.length&&d.length!==m.current.size&&Jf(nt.timeline(),p,d.length,0);const B=new Set(d.map(F=>F.id));m.current.forEach(F=>{B.has(F)||m.current.delete(F)})},[d.map(I=>`${I.id}:${I.alive}`).join("|")]);const A=G.useRef(b),P=G.useRef(w),R=G.useRef(!0);return G.useLayoutEffect(()=>{if(!i.length){S(void 0),A.current=!1,P.current=w,R.current=!1;return}const I=P.current!==w,B=A.current;P.current=w,A.current=b;const F=H=>{var ne;(ne=N.current)==null||ne.kill();const K=nt.timeline();Xf(K,p,i,H,tp,Q=>{K.fromTo(p(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},Q)}),N.current=K,S(H);const $=nt.timeline();H==="back"?jr($,p,.2):jr($,p,0)};if(R.current){R.current=!1,F(b?"done":"back");return}b&&(I||!B)?F(I?"run":"done"):!b&&B&&F("back")},[w,b]),G.useEffect(()=>{i.length?jr(nt.timeline(),p,0):Zf(nt.timeline(),p,0)},[i.length]),G.useEffect(()=>{if(!b)return;const I=B=>{B.key==="Escape"&&o()};return addEventListener("keydown",I),()=>removeEventListener("keydown",I)},[b,o]),G.useLayoutEffect(()=>{if(!c)return;const I=h.slots.map((F,H)=>({id:d[H].id,x:F.x,y:F.ay})),B=nt.timeline({onComplete:()=>l==null?void 0:l()});return Qf(B,p,I,0),()=>{B.kill()}},[c]),a.jsxs(jf,{teams:d,layout:h,fresh:M,qr:t?null:a.jsx(ep,{value:e}),qrLit:i.length>0,litN:v.current,wait:d.length===0&&!t&&!i.length,rootRef:u,children:[i.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"rz-veil",onClick:b?o:void 0,style:{pointerEvents:b?"auto":"none"}}),a.jsx($f,{groups:i,pills:y})]}),i.length>0&&!b&&a.jsx("button",{type:"button",className:"lb3-grp-btn",onClick:r,children:"СОСТАВЫ КОМАНД"})]})}function Od({rects:n,srcs:e,fs:t,panel:i}){const s=G.useRef(null);return G.useEffect(()=>{const r=s.current.getContext("2d"),o=lh({rects:n,srcs:e,panel:i},40),c=()=>{r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,1920,1080),o(r,t)};return nt.ticker.add(c),()=>nt.ticker.remove(c)},[n,e,t,i]),a.jsx("canvas",{ref:s,className:"s4-cv",width:1920,height:1080,"aria-hidden":!0})}function ir(n,e,t,i,s){const r=Math.min(i/n.w,s/n.h),o=Math.round(n.w*r),c=Math.round(n.h*r);return{x:Math.round(e-o/2),y:t,w:o,h:c}}const ip=n=>n<60?`~${n} мин`:`~${Math.floor(n/60)} ч ${n%60?`${n%60} мин`:""}`.trim();function sp(n){var u;const e=n.slide,t=(e.body??"").split(`
`).map(d=>d.trim()).filter(Boolean),i=e.images??[],s=e.show_rounds&&n.rounds.length?n.rounds.map((d,h)=>({n:h+1,name:d.name,count:d.count})):null,r=e.show_stats&&n.stats?n.stats:null,o=r?[[r.roundsCount,"раундов"],[r.questionsCount,"вопросов"],...r.hasMiniGame?[[1,"мини-игра"]]:[],...r.musicTracks>0?[[r.musicTracks,"треков"]]:[],[ip(r.totalMinutes),"на игру"]]:null;if(i.length>1||i.length===1&&(s||o||t.length===0))return null;const c=i.length===1&&n.image?{src:n.image.src,w:n.image.w,h:n.image.h}:null;if(i.length===1&&!c)return null;const l=t.length===0?"rstats":c?"rimg":t.length>5?"dense":"rules";return{title:(e.title??"").trim()||"ПРАВИЛА",lines:t,rounds:s,stats:o,note:((u=e.note)==null?void 0:u.trim())||null,photo:c,layout:l}}function Bd(n,e){const t=n<=8;let i=t?84:66,s=t?9:5;const r=t?200:168;if(n>12){const m=(1060-r)/n;s=m>=44?4:3,i=Math.floor(m-s)}const o=t?790:760,c=t?76:58,l=t?60:46,u=1150-o,d=e>0?Math.min(c,Math.floor(u/e)):c,h=Math.max(14,Math.min(l,d-Math.max(6,Math.round(d*.2)),i-8)),p=n>12||d<c||h<l;return{big:t,rh:i,gap:s,y0:r,brLeft:o,step:d,berry:h,custom:p,nameFs:i>=60?27:Math.max(14,Math.floor(i*.6)),medFs:Math.min(30,Math.round(i*.43)),totFs:Math.min(44,Math.round(i*.78)),berryFs:Math.min(t?32:26,Math.round(h*.56)),colFs:Math.min(24,Math.max(13,Math.round(h*.55)))}}function rp(n,e,t){let i=n.filter(s=>s<=e).length;return t.forEach(s=>s.forEach((r,o)=>{r!==0&&o+1>i&&(i=o+1)})),Math.min(i,n.length)}function kd(n,e,t,i,s){const r=s?new Map(s.order.map((o,c)=>[o,c])):null;return n.map((o,c)=>{const l=e.get(o.team.id)??[],u=r==null?void 0:r.get(o.team.id);return{id:o.team.id,name:o.team.name,color:i(o.team.color),place:o.place,sum:o.total,scores:t.map(d=>l[d]??0),...s?{delta:u==null?0:u-c,prevIdx:u}:{}}})}function ap(n,e,t){return[...new Set(n.map(s=>s.place))].filter(s=>s<=3).sort((s,r)=>s-r).map(s=>{var o;const r=n.filter(c=>c.place===s);return{k:s-1,place:s,sum:((o=r[0])==null?void 0:o.total)??0,names:r.map(c=>({name:c.team.name,color:e(c.team.color),hue:t(c.team.color)}))}})}function op(n){if(n<=0)return[];const e=Math.ceil(n/6),t=Math.ceil(n/e),i=Math.min(280,Math.floor((1800-(t-1)*20)/t)),s=i+20,r=e===1?0:e===2?380:270,o=e===1?400:e===2?240:200;return Array.from({length:n},(c,l)=>{const u=Math.floor(l/t),d=l%t,h=Math.min(t,n-u*t);return{x:(n===6?60:Math.round((1920-(h*s-20))/2))+d*s,y:o+u*r,w:i}})}function cp(n,e){return!n||!e||n===e?null:e==="finale"?"bloom":n==="lobby"&&(e==="info"||e==="intro"||e==="round_intro")?"vine":n==="info"&&e==="round_intro"?"wind":n==="round_intro"&&e==="question"?"fly":e==="scoreboard"?"petal":n==="scoreboard"&&e==="break"?"mist":null}const zd=n=>`${String(Math.floor(Math.max(0,n)/60)).padStart(2,"0")}:${String(Math.max(0,n)%60).padStart(2,"0")}`,Hr=n=>n%10===1&&n%100!==11?"балл":n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?"балла":"баллов";function lp(n){if(n<=0)return{cols:1,rowH:84,fz:32};const e=n<=7?1:n<=16?2:3,t=Math.ceil(n/e),i=Math.min(84,Math.floor((800-(t-1)*10)/t));return{cols:e,rowH:i,fz:Math.min(32,Math.max(15,Math.round(i*.42)))}}function dp(n){switch(n){case"crossword":return"crossword";case"jeopardy":return"jeopardy";case"melody":return"melody";case"anagram":return"anagram";case"sprint":return"sprint";case"blitz":return"blitz";case"four_pics":return"reveal";default:return"standard"}}const up=n=>Math.min(112,Math.floor(1500/Math.max(1,...n.map(e=>e.length)))),hp=n=>Math.max(0,...n.map(e=>e.length))>24;function fp(n,e=20){if(!hp(n))return n;const t=[];for(const i of n){let s="";for(const r of i.split(/\s+/).filter(Boolean))s&&(s+" "+r).length>e?(t.push(s),s=r):s=s?s+" "+r:r;s&&t.push(s)}return t}const pp="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function mp({v:n,onReady:e}){const t=n.lines,i=n.layout==="dense",s=n.layout==="rimg"&&!!n.photo,r=n.stats,o=G.useMemo(()=>({grow:[0],reveal:[0],bloom:[0],pulse:0}),[]),c=n.photo,l=G.useMemo(()=>c?[ir(c,1560,250,560,600)]:[],[c]),u=t.length>7?29:t.length>5?34:40,d=JSON.stringify(n),h=gs(),{root:p}=Md(e,(g,f)=>{g.fromTo(f(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(f(".ru-vine"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.6,ease:"power2.inOut"},.2).fromTo(f(".ru-pl"),{opacity:0,x:-24,clipPath:"inset(0 100% 0 0 round 40px)"},{opacity:1,x:0,clipPath:"inset(0 0% 0 0 round 40px)",duration:.6,stagger:i?.3:.45,ease:"power2.out"},.9);const v=.9+t.length*(i?.3:.45);g.fromTo(f(".ru-rd"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.1},.9).fromTo(f(".ru-st"),{opacity:0,scale:.6},{opacity:1,scale:1,duration:.5,stagger:.12,ease:"back.out(2)"},1.6).fromTo(f(".ru-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},v),s&&g.fromTo(o.grow,{0:0},{0:1,duration:1.1,ease:"power2.inOut"},.4).fromTo(o.reveal,{0:0},{0:1,duration:.95,ease:"power2.inOut"},1.4).fromTo(o,{pulse:0},{pulse:1.15,duration:1.1},.4)},null,[d,o]),m=[{x:60,y:30,w:1160,h:980},{x:1250,y:180,w:620,h:780}],x=t.length===0,M=s?!1:!!n.rounds;return G.useLayoutEffect(()=>{const g=p.current;if(!g)return;const f=N=>g.querySelector(N),v=f(".ru-note"),w=v?v.offsetTop-12:1060,b=f(".ru-title");if(b){b.style.fontSize=x?"170px":"";const N=f(".ru-right"),y=x&&N&&N.offsetHeight>0?N.offsetLeft:1880;let A=parseFloat(getComputedStyle(b).fontSize)||120;for(;b.offsetLeft+b.offsetWidth>y&&A>48;)A-=4,b.style.fontSize=`${A}px`}const E=f(".ru-list");if(E){E.style.setProperty("--fz",`${u}px`);let N=u;for(;E.offsetTop+E.offsetHeight>w&&N>18;)N-=1,E.style.setProperty("--fz",`${N}px`)}const S=f(".ru-right");if(S){S.style.transform="";const N=S.offsetHeight,y=w-S.offsetTop;N>y&&N>0&&(S.style.transformOrigin="0 0",S.style.transform=`scale(${Math.max(.4,y/N).toFixed(3)})`)}},[d,u,h,x,p]),a.jsxs(gn,{rects:m,n:null,rootRef:p,cls:`s5 ru ru-${n.layout}`,children:[a.jsx("h1",{className:"ru-title",style:x?{fontSize:170,top:330}:void 0,children:n.title.split("").map((g,f)=>a.jsx("span",{className:"ch",children:g===" "?" ":g},f))}),!x&&a.jsx("svg",{className:"ru-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"ru-vine",d:"M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010"})}),!x&&a.jsx("ol",{className:"ru-list",style:{"--fz":`${u}px`},children:t.map((g,f)=>a.jsxs("li",{className:"ru-pl",children:[a.jsx("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:pp})}),a.jsx("span",{className:"idx",children:String(f+1).padStart(2,"0")}),a.jsx("span",{className:"t",children:g})]},f))}),a.jsxs("div",{className:`ru-right${s?" img":""}`,children:[M&&n.rounds&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"ru-h",children:"Раунды вечера"}),a.jsx("ul",{className:"ru-rounds",children:n.rounds.map((g,f)=>a.jsxs("li",{className:"ru-rd",children:[a.jsx("b",{children:g.n}),a.jsx("span",{children:g.name}),g.count>0&&a.jsxs("em",{children:[g.count," вопр."]})]},f))})]}),r&&a.jsx("div",{className:"ru-stats",children:r.map(([g,f],v)=>a.jsxs("div",{className:"ru-st",children:[a.jsx("b",{className:String(g).length>5?"sm":"",children:g}),a.jsx("span",{children:f})]},v))})]}),s&&c&&a.jsxs(a.Fragment,{children:[a.jsx(Od,{rects:l,srcs:[c.src],fs:o}),c.caption&&a.jsx("div",{className:"ru-cap",style:{left:l[0].x,width:l[0].w,top:l[0].y+l[0].h+28},children:c.caption})]}),n.note&&a.jsx("div",{className:"ru-note",children:n.note})]})}const gp={crossword:"#ffd98a",standard:"#7ff2d8",jeopardy:"#c9b6ff",melody:"#8fc8ff",anagram:"#ffc27a"},xp={sprint:{cls:"spA",emblem:hh},blitz:{cls:"bz bzC",mood:"calm",emblem:uh},reveal:{cls:"rv rvA",emblem:dh}};function _p({id:n}){if(n==="crossword")return a.jsxs("svg",{className:"em em-cw",viewBox:"0 0 290 270",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"vn vh",d:"M 4 184 L 284 184"}),a.jsx("path",{className:"vn vv",d:"M 90 14 L 90 262"}),[..."РОМАН"].map((c,l)=>a.jsxs("g",{className:"ce r",transform:`translate(${14+l*50} 162)`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"r"+l)),[..."ГЕРОЙ"].map((c,l)=>l===3?null:a.jsxs("g",{className:"ce c",transform:`translate(64 ${12+l*50})`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"c"+l))]});if(n==="standard")return a.jsx("svg",{className:"em em-q",viewBox:"0 40 220 220",width:"180","aria-hidden":!0,children:a.jsx("g",{transform:"translate(110 222)",children:a.jsxs("g",{className:"qb",children:[Array.from({length:8},(i,s)=>a.jsx("g",{transform:`rotate(${s*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"9",ry:"20"})},s)),a.jsx("circle",{r:"8"})]})})});if(n==="jeopardy")return a.jsx("svg",{className:"em em-jp",viewBox:"0 0 260 260",width:"240","aria-hidden":!0,children:a.jsxs("g",{transform:"translate(130 130)",children:[[["100",-45],["200",45],["300",135],["400",225]].map(([i,s],r)=>a.jsx("g",{transform:`rotate(${s})`,children:a.jsxs("g",{className:"jpt","data-i":r,children:[a.jsx("path",{d:"M 0 -26 C -34 -50 -38 -98 0 -112 C 38 -98 34 -50 0 -26 Z"}),a.jsx("g",{transform:"translate(0 -72)",children:a.jsx("text",{textAnchor:"middle",dominantBaseline:"middle",style:{transform:`rotate(${-s}deg)`},children:i})})]})},r)),a.jsx("circle",{r:"24",className:"jpc"})]})});if(n==="melody")return a.jsxs("svg",{className:"em em-ml",viewBox:"0 0 290 240",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"ms",d:"M 14 44 C 90 6 200 6 276 46"}),[60,145,230].map((i,s)=>a.jsx("g",{transform:`translate(${i} ${30+(s===1?-4:6)})`,children:a.jsxs("g",{className:"bell","data-i":s,children:[a.jsx("path",{className:"bs",d:"M 0 0 L 0 26"}),a.jsx("path",{className:"bc",d:"M -34 96 C -30 60 -18 34 0 30 C 18 34 30 60 34 96 C 20 90 -20 90 -34 96 Z"}),a.jsx("circle",{className:"bk",cy:"102",r:"7"})]})},s)),[[40,150],[250,120],[150,180]].map(([i,s],r)=>a.jsx("text",{className:"nt",x:i,y:s,"data-i":r,children:"♪"},r))]});const e="ЛЕТО",t=[2,0,3,1];return a.jsxs("svg",{className:"em em-an",viewBox:"0 0 270 230",width:"250","aria-hidden":!0,children:[[...e].map((i,s)=>a.jsx("path",{className:"cup",d:`M ${16+s*62} 168 C ${16+s*62+4} 196 ${16+s*62+22} 206 ${16+s*62+28} 206 C ${16+s*62+36} 206 ${16+s*62+52} 196 ${16+s*62+56} 168 C ${16+s*62+40} 178 ${16+s*62+16} 178 ${16+s*62} 168 Z`},s)),[...e].map((i,s)=>a.jsx("g",{transform:`translate(${44+s*62} 120)`,children:a.jsxs("g",{className:"sd","data-o":t[s],"data-i":s,children:[a.jsx("circle",{r:"25"}),a.jsx("text",{y:"2",children:i})]})},s))]})}function vp(n,e,t){ph(n,e);const i=.9;t==="crossword"&&n.fromTo(e(".em .vn"),{strokeDashoffset:300,opacity:1},{strokeDashoffset:0,duration:.9,stagger:.25,ease:"power2.out"},i).fromTo(e(".em .ce.r"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.3).fromTo(e(".em .ce.c"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.9),t==="standard"&&n.fromTo(e(".em .qb"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},i+.2),t==="jeopardy"&&n.fromTo(e(".em .jpt"),{scale:0,opacity:0},{scale:1,opacity:1,svgOrigin:"0 0",duration:.5,stagger:.18,ease:"back.out(2)"},i).to(e('.em .jpt[data-i="1"]'),{y:-22,duration:.6,ease:"sine.inOut",yoyo:!0,repeat:1},i+1.2),t==="melody"&&n.fromTo(e(".em .bell"),{rotation:-26,opacity:0},{rotation:0,opacity:1,svgOrigin:"0 0",duration:1.2,stagger:.25,ease:"elastic.out(1,0.35)"},i).fromTo(e(".em .nt"),{opacity:0,y:14},{opacity:1,y:-16,duration:.7,stagger:.2},i+.8),t==="anagram"&&n.fromTo(e(".em .sd"),{y:-150,opacity:0},{y:0,opacity:1,duration:.7,stagger:.16,ease:"bounce.out"},i).fromTo(e(".em .cup"),{opacity:0},{opacity:1,duration:.4,stagger:.1},i-.2)}function Mp({kind:n,intro:e,onReady:t}){const i=xp[n],s=fp(e.titleLines),r=up(s),o=`${n}|${JSON.stringify(e)}`,c=gs(),{root:l}=Md(t,(d,h)=>vp(d,h,n),null,[o]);G.useLayoutEffect(()=>{const d=l.current;if(!d)return;const h=d.querySelector(".s1-intro-main"),p=d.querySelector(".s1-intro-title"),m=d.querySelector(".s1-intro-rules");m&&Ac([...m.querySelectorAll(".t")],()=>m.offsetTop+m.offsetHeight<=1050,22);const x=m?m.offsetLeft:1880,M=()=>Math.max(0,...[...(p==null?void 0:p.querySelectorAll(".ln"))??[]].map(g=>[...g.children].reduce((f,v)=>f+v.offsetWidth,0)));h&&p&&Ac([p],()=>{const g=h.offsetLeft+h.clientWidth/2,f=i?Math.min(M(),h.clientWidth):M();return g+f/2<=x&&g-f/2>=20&&h.offsetTop+h.offsetHeight<=1050},40)},[o,c,l,i]);const u=a.jsx(fh,{intro:s===e.titleLines?e:{...e,titleLines:s},emblem:i?i.emblem:a.jsx(_p,{id:n})});return i?a.jsx(gn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:i.cls,moodOverride:i.mood,children:u}):a.jsx(gn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:`rv ri ri-${n}`,children:a.jsx("div",{style:{"--acc":gp[n],"--tfs":`${r}px`},children:u})})}const yp="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",bp=["","gold","silver","bronze"];function Sp({v:n,rootRef:e,reveal:t}){const{rows:i,flip:s,cols:r}=n,o=i.length,c=r.length,l=Bd(o,c),{big:u,rh:d,gap:h,y0:p,custom:m}=l,x=Array.from({length:c},(S,N)=>Math.max(0,...i.map(y=>y.scores[N]??0))),M=t!==void 0,g=S=>!M||S>=o-t,f=gs(),v=i.map(S=>S.name).join("|");G.useLayoutEffect(()=>{const S=e.current;S&&S.querySelectorAll(".bd-nm").forEach(N=>{N.style.fontSize=m?`${l.nameFs}px`:"";let y=parseFloat(getComputedStyle(N).fontSize)||27;for(;N.offsetHeight>d-4&&y>12;)y-=1,N.style.fontSize=`${y}px`})},[v,d,m,l.nameFs,f,e]);const w=[{x:200,y:20,w:1520,h:1040}],b=i.map((S,N)=>N>0&&i[N-1].place===S.place?N:-1).filter(S=>S>=0),E=S=>m?S:void 0;return a.jsxs(gn,{rects:w,n:null,rootRef:e,cls:`s5 bd bd-${n.kind}${u?" big":""}${M?" bd-game":""}${M&&t>=o?" all-in":""}`,children:[a.jsxs("div",{className:"bd-title",children:[a.jsx("b",{children:n.title}),a.jsx("span",{children:n.sub})]}),a.jsxs("div",{className:"bd-colh",style:{top:p-40},children:[r.map((S,N)=>a.jsx("i",{className:N===c-1&&s?"last":"",style:{left:m?l.brLeft+N*l.step:(u?790:760)+N*(u?76:58),width:m?l.berry:u?60:46,...m?{fontSize:l.colFs}:{}},children:S},N)),a.jsx("em",{children:"Σ"})]}),i.map((S,N)=>{const y=S.delta??0;return a.jsxs("div",{className:`bd-row${S.place<=3?" pod p"+S.place:""}${M&&g(N)?" is-in":""}`,"data-i":N,style:{top:p+N*(d+h),height:d,...m?{"--rh":`${d}px`}:{}},children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:yp})}),a.jsx("span",{className:`bd-med ${bp[S.place]??""}`,style:E({fontSize:l.medFs}),children:S.place}),a.jsx("span",{className:"bd-chip",style:y===0?{visibility:"hidden",...E({fontSize:Math.min(22,Math.round(d*.55))})}:E({fontSize:Math.min(22,Math.round(d*.55))}),children:y>0?`▲ ${y}`:`▼ ${-y}`}),a.jsx("span",{className:"bd-nm",style:{color:S.color},children:S.name}),a.jsx("span",{className:"bd-brs",style:E({left:l.brLeft,gap:l.step-l.berry}),children:Array.from({length:c},(A,P)=>{const R=S.scores[P]??0;return a.jsx("i",{className:`bd-bry${R===x[P]&&x[P]>0?" best":""}${R===0?" z":""}${s&&P===c-1?" last":""}`,style:E({width:l.berry,height:l.berry,fontSize:l.berryFs}),children:R},P)})}),a.jsx("span",{className:"bd-tot",style:E({fontSize:l.totFs}),children:s?a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"a",children:S.prevSum??S.sum}),a.jsx("b",{className:"b",children:S.sum})]}):a.jsx("b",{children:S.sum})})]},S.id)}),b.map(S=>a.jsxs("svg",{className:`bd-knot${M&&g(S-1)?" is-in":""}`,style:{top:p+S*(d+h)-h-12,...m?{width:Math.min(70,d+4)}:{}},viewBox:"0 0 60 30","aria-hidden":!0,children:[a.jsx("path",{d:"M 6 4 C 20 4 18 26 30 26 C 42 26 40 4 54 4"}),a.jsx("circle",{cx:"30",cy:"15",r:"6"})]},S))]})}function Ji({hue:n,o:e=1}){const t=`hsl(${n} 55% 74%)`,i=`hsl(${n} 40% 28%)`;return a.jsxs("svg",{className:"lb-fl",viewBox:"-90 -82 180 250","aria-hidden":!0,children:[a.jsx("path",{className:"stem",d:"M 0 56 C -10 100 10 130 0 164"}),a.jsx("path",{className:"lf",d:"M 0 112 C -30 100 -50 112 -56 126 C -34 130 -14 126 0 112 Z"}),a.jsx("path",{className:"lf",d:"M 0 128 C 30 114 50 124 58 138 C 34 144 14 140 0 128 Z"}),a.jsx("g",{transform:"translate(0 0)",children:a.jsxs("g",{className:"bl",style:{transform:`scale(${e})`},children:[Array.from({length:8},(s,r)=>a.jsx("g",{transform:`rotate(${r*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-36",rx:"19",ry:"38",style:{fill:t,stroke:i}})},r)),a.jsx("circle",{r:"17",className:"ct"})]})})]})}const Es=n=>Math.sin(n*91.7+13.1)*43758.5453%1,wp=[32,352,205,150,270,12,185,48,320,95,228,0],$c=(n,e)=>n.length?n[e%n.length]:wp[e%12];function Ep(n,e,t,i){const s=t.state;s==="last"&&n.fromTo(e(".fl-lab, .fl-q"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6,stagger:.15},.2).fromTo(e(".fl-ans .l"),{opacity:0,scale:.25,y:40},{opacity:1,scale:1,y:0,duration:.55,stagger:.13,ease:"back.out(2)"},1.1).fromTo(e(".fl-vine"),{strokeDashoffset:1200},{strokeDashoffset:0,duration:1.6,ease:"power1.inOut"},2).fromTo(e(".fl-dawn"),{opacity:0},{opacity:1,duration:2.4,ease:"power1.in"},2.4).fromTo(e(".fl-go"),{opacity:0,x:-20},{opacity:1,x:0,duration:.6},3.4),s==="antic"&&(n.fromTo(e(".fl-bud"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.6,stagger:.07,ease:"back.out(1.6)"},.2).fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.6).fromTo(e(".fl-orb"),{x:0,y:0,opacity:0},{opacity:1,x:r=>0*r,duration:.01},.8),e(".fl-orb").forEach((r,o)=>{const c=o/30*Math.PI*2,l=520+o%5*60;n.fromTo(r,{x:Math.cos(c)*l,y:Math.sin(c)*l*.5},{x:0,y:0,duration:2.6,ease:"power2.in"},1+o%10*.08)}),n.fromTo(e(".fl-pod"),{scale:.7},{scale:1.1,duration:3,ease:"power2.in"},1).fromTo(e(".fl-pod"),{rotation:-3},{rotation:3,duration:.12,yoyo:!0,repeat:15,ease:"none"},2.6).fromTo(e(".fl-flash"),{opacity:0},{opacity:.9,duration:.5,yoyo:!0,repeat:1},4.2)),s==="medals"&&(i===void 0?[2,1,0]:[i]).forEach((o,c)=>{const l=.5+c*1.5;n.fromTo(e(`.fl-md[data-k="${o}"] .stem`),{scaleY:0},{scaleY:1,duration:.7,ease:"power2.out",transformOrigin:"50% 100%"},l).fromTo(e(`.fl-md[data-k="${o}"] .bl`),{scale:.2},{scale:1,svgOrigin:"0 0",duration:.9,ease:"back.out(1.8)"},l+.5).fromTo(e(`.fl-md[data-k="${o}"] .disc, .fl-md[data-k="${o}"] .nm, .fl-md[data-k="${o}"] .pt`),{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.12},l+1.1)}),s==="retro"&&t.cards.forEach((r,o)=>{if(i!==void 0&&o!==i)return;const c=i===void 0?o:0;n.fromTo(e(`.fl-rc[data-i="${o}"]`),{opacity:0,y:40,scale:.9},{opacity:1,y:0,scale:1,duration:.6,ease:"back.out(1.5)"},.4+c*.7).fromTo(e(`.fl-rc[data-i="${o}"] .win`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.5},.8+c*.7)}),s==="winner"&&n.fromTo(e(".fl-rays"),{opacity:0,rotation:-30},{opacity:1,rotation:0,duration:2,ease:"power2.out"},.1).fromTo(e(".fl-big .stem"),{scaleY:0},{scaleY:1,duration:.8,ease:"power2.out",transformOrigin:"50% 100%"},.3).fromTo(e(".fl-big .bl"),{scale:.15},{scale:1,svgOrigin:"0 0",duration:1.6,ease:"back.out(1.5)"},.9).fromTo(e(".fl-w1"),{opacity:0,y:-14},{opacity:1,y:0,duration:.7},2).fromTo(e(".fl-w2 .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.04,ease:"back.out(1.8)"},2.3).fromTo(e(".fl-w3"),{opacity:0},{opacity:1,duration:.7},3.2).fromTo(e(".fl-pet"),{opacity:0,y:-80},{opacity:.95,y:r=>120+r%7*120,rotation:r=>r%2?160:-160,duration:3.4,stagger:.07,ease:"sine.out"},2.2),s==="party"&&(n.fromTo(e(".fl-lant"),{y:1200,opacity:0},{y:0,opacity:1,duration:3.6,stagger:.12,ease:"power2.out"},.2).fromTo(e(".fl-th .ch"),{opacity:0,y:36,rotation:-7},{opacity:1,y:0,rotation:0,duration:.6,stagger:.05,ease:"back.out(1.8)"},1).fromTo(e(".fl-pod3 > *"),{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.2},2.4),e(".fl-fw").forEach((r,o)=>n.fromTo(r,{scale:0,opacity:1},{scale:1,duration:1.1,ease:"power2.out"},1.2+o*.5).to(r,{opacity:0,duration:1.2},1.9+o*.5))),s==="break"&&n.fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.2).fromTo(e(".fl-clock"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:.8,ease:"back.out(1.6)"},.6)}const Vr=n=>n.split("").map((e,t)=>a.jsx("span",{className:"ch",children:e===" "?" ":e},t));function Tp({v:n,rootRef:e}){const t=n.state,i=t==="winner"||t==="party"||t==="medals"||t==="last",s="hues"in n?n.hues:[],r=s.join(","),o=G.useMemo(()=>Array.from({length:46},(d,h)=>({x:120+Math.abs(Es(h))*1680,d:Math.abs(Es(h+7))*3,s:.6+Math.abs(Es(h+3))*.9,h:$c(s,h),y:90+Math.abs(Es(h+11))*880})),[r]),c=gs(),l=JSON.stringify(n);G.useLayoutEffect(()=>{const d=e.current;if(!d)return;d.querySelectorAll(".fl-md").forEach(p=>{const m=p.querySelector(".nm"),x=p.querySelector(".pt");if(!m||!x)return;m.style.fontSize="";let M=parseFloat(getComputedStyle(m).fontSize)||38;for(;m.offsetTop+m.offsetHeight+50>1070&&M>16;)M-=2,m.style.fontSize=`${M}px`;const g=m.offsetTop+m.offsetHeight+8;x.offsetTop<g&&(x.style.top=`${g}px`)});const h=d.querySelector(".fl-w2");if(h){const p=h.style.fontSize;let m=parseFloat(p)||100;const x=h.querySelector(":scope > div")?[...h.querySelectorAll(":scope > div")]:[h],M=()=>Math.max(0,...x.map(g=>[...g.querySelectorAll(":scope > .ch")].reduce((f,v)=>f+v.offsetWidth,0)));for(;(M()>h.clientWidth||h.offsetHeight>170)&&m>30;)m-=4,h.style.fontSize=`${m}px`}},[l,c,e]);const u=[{x:300,y:200,w:1400,h:700}];return a.jsxs(gn,{rects:u,n:null,rootRef:e,cls:`s5 fl fl-${t}`,moodOverride:i?"warning":void 0,children:[n.state==="last"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-dawn"}),a.jsxs("div",{className:"fl-lab",style:{left:120,width:1500,top:120},children:["Последний ответ · раунд ",n.round," · вопрос ",n.q," из ",n.of]}),a.jsx("div",{className:"fl-q",style:{left:120,width:1500,top:180},children:n.text}),a.jsx("div",{className:"fl-ans",style:{left:120,width:1500,top:380},children:n.answer.toUpperCase().split("").map((d,h)=>a.jsx("span",{className:"l",children:d},h))}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"fl-vine",d:"M 220 740 C 520 790 760 700 1020 750 S 1500 800 1780 740"})}),a.jsx("div",{className:"fl-go",children:"Подводим итоги →"})]}),n.state==="antic"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:90},children:n.title??"Подводим итоги"}),a.jsx("div",{className:"fl-t2",style:{left:300,width:1500,top:190},children:n.sub??"Скоро объявим победителей"}),n.hues.map((d,h)=>{const p=h/n.hues.length*Math.PI*2-Math.PI/2;return a.jsx("div",{className:"fl-bud",style:{left:1100+Math.cos(p)*640-40,top:590+Math.sin(p)*300-40},children:a.jsx(Ji,{hue:d,o:.38})},h)}),a.jsx("div",{className:"fl-pod",style:{left:1010,top:490},children:a.jsx(Ji,{hue:46,o:.5})}),Array.from({length:30},(d,h)=>a.jsx("i",{className:"fl-orb",style:{left:1091,top:581}},h)),a.jsx("div",{className:"fl-flash"}),n.clock&&a.jsx("div",{className:"fl-clock fl-clock-sm",children:n.clock})]}),n.state==="medals"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:50},children:"Награждение"}),n.slots.map(d=>{var M;const[h,p]=[[1100,250],[560,330],[1640,420]][d.k]??[1100,250],m=["gold","silver","bronze"][d.k],x=d.names.length>1||d.names.some(g=>g.name.length>20);return a.jsxs("div",{className:"fl-md","data-k":d.k,style:{left:h-200,top:0,width:400},children:[a.jsx("div",{className:"stem",style:{left:197,top:p+90,height:720-p}}),a.jsx("div",{className:"fl-fw1",style:{left:100,top:p-100},children:a.jsx(Ji,{hue:((M=d.names[0])==null?void 0:M.hue)??46,o:1})}),a.jsx("div",{className:`disc ${m}`,style:{left:160,top:p-10},children:d.place}),a.jsx("div",{className:"nm",style:{top:800,color:d.names.length===1?d.names[0].color:void 0},children:d.names.length===1?d.names[0].name:d.names.map((g,f)=>a.jsx("div",{style:{color:g.color},children:g.name},f))}),a.jsxs("div",{className:"pt",style:{top:800+(x?118:70)},children:[d.sum," ",Hr(d.sum)]})]},d.k)})]}),n.state==="retro"&&(()=>{const d=op(n.cards.length),h=n.cards.length!==6,p=[...new Set(d.map(m=>m.y))];return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:p.length>1?40:60},children:"Победители раундов"}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:p.map(m=>a.jsx("path",{className:"fl-limb",d:"M 70 380 C 500 340 1400 420 1850 360",transform:m!==400?`translate(0 ${m-400})`:void 0},m))}),n.cards.map((m,x)=>{var M,g;return x>=(n.shown??n.cards.length)?null:a.jsxs("div",{className:"fl-rc","data-i":x,style:{left:d[x].x,top:d[x].y,...h&&d[x].w!==280?{width:d[x].w}:{},...p.length>2?{minHeight:230}:{}},children:[a.jsx("i",{className:"cord"}),a.jsx("b",{className:"rn",children:m.n}),a.jsx("span",{className:"rname",children:m.name}),a.jsx("span",{className:"win",style:{color:(M=m.team)==null?void 0:M.color},children:((g=m.team)==null?void 0:g.name)??"—"}),a.jsxs("em",{children:[m.pts," ",Hr(m.pts)]})]},x)})]})})(),n.state==="winner"&&a.jsxs(a.Fragment,{children:[a.jsx("svg",{className:"fl-rays",viewBox:"-960 -540 1920 1080","aria-hidden":!0,children:Array.from({length:16},(d,h)=>a.jsx("path",{d:"M 0 0 L -60 -1200 L 60 -1200 Z",transform:`rotate(${h*22.5})`},h))}),a.jsx("div",{className:"fl-w1",style:{left:300,width:1500,top:60},children:n.names.length>1?"ПОБЕДИТЕЛИ":"ПОБЕДИТЕЛЬ"}),a.jsxs("div",{className:"fl-big",style:{left:770,top:150},children:[a.jsx("div",{className:"stem"}),a.jsx(Ji,{hue:46,o:1})]}),a.jsx("div",{className:"fl-w2",style:{left:300,width:1500,top:700,fontSize:n.names.length>1||n.names.some(d=>d.name.length>20)?64:100},children:n.names.length===1?Vr(n.names[0].name):n.names.map((d,h)=>a.jsx("div",{children:Vr(d.name)},h))}),a.jsxs("div",{className:"fl-w3",style:{left:300,width:1500,top:880},children:[n.sum," ",Hr(n.sum)]}),o.map((d,h)=>a.jsx("i",{className:"fl-pet",style:{left:d.x,top:-40,"--h":d.h,transform:`scale(${d.s})`}},h))]}),n.state==="party"&&a.jsxs(a.Fragment,{children:[Array.from({length:5},(d,h)=>a.jsx("div",{className:"fl-fw",style:{left:260+h*350,top:180+h%2*150},children:Array.from({length:14},(p,m)=>a.jsx("i",{style:{transform:`rotate(${m*25.7}deg) translateY(-110px)`,background:Gi($c(s,h*3+m))}},m))},h)),o.slice(0,26).map((d,h)=>a.jsx("div",{className:"fl-lant",style:{left:d.x,top:d.y,transform:`scale(${d.s*.9})`},children:a.jsx(Ji,{hue:d.h,o:1})},h)),a.jsx("div",{className:"fl-th",style:{left:300,width:1500,top:380},children:Vr("Спасибо за игру!")}),a.jsx("div",{className:"fl-pod3",style:{left:300,width:1500,top:560},children:n.top.map((d,h)=>a.jsxs("span",{style:{color:d.color},children:[a.jsx("b",{children:h+1}),d.name]},h))})]}),n.state==="break"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:210,width:1500,top:150},children:"Перерыв"}),a.jsx("div",{className:"fl-t2",style:{left:210,width:1500,top:270},children:n.sub}),a.jsx("div",{className:"fl-clock",children:n.clock})]})]})}const Ts=n=>Math.abs(Math.sin(n*91.7+13.1)*43758.5453%1),Ap=()=>Array.from({length:40},(n,e)=>({y:60+Ts(e)*960,d:Ts(e+5)*.5,s:.7+Ts(e+9),r:Ts(e+3)*360}));function Cp({state:n,bits:e}){return a.jsxs(a.Fragment,{children:[n==="vine"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-veil"}),a.jsx("svg",{className:"tr-vine",viewBox:"0 0 1920 1080","aria-hidden":!0,children:Array.from({length:7},(t,i)=>a.jsx("path",{d:`M ${130+i*280} -20 C ${60+i*280} 260 ${230+i*280} 420 ${130+i*280} 560 S ${60+i*280} 860 ${150+i*280} 1100`},i))})]}),n==="wind"&&e.slice(0,26).map((t,i)=>a.jsx("i",{className:"tr-leaf",style:{top:t.y,transform:`scale(${t.s})`}},i)),n==="fly"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-flash"}),Array.from({length:36},(t,i)=>a.jsx("i",{className:"tr-orb",style:{left:960,top:540}},i))]}),n==="petal"&&e.map((t,i)=>a.jsx("i",{className:"tr-pet",style:{top:t.y-140,"--h":i*37%360}},i)),n==="mist"&&[0,1,2,3].map(t=>a.jsx("div",{className:"tr-fog",style:{top:t*270}},t)),n==="bloom"&&a.jsxs("svg",{className:"tr-iris",viewBox:"-300 -300 600 600","aria-hidden":!0,children:[Array.from({length:8},(t,i)=>a.jsx("g",{transform:`rotate(${i*45})`,children:a.jsx("ellipse",{className:"p",cx:"0",cy:"-150",rx:"60",ry:"150"})},i)),a.jsx("circle",{r:"46",fill:"#f0c055"})]})]})}function Rp(n,e,t,i){t==="vine"&&n.set(e(".tr-vine path"),{strokeDashoffset:0},0).set(e(".tr-veil"),{opacity:1},0).to(e(".tr-vine path"),{strokeDashoffset:-1400,duration:.7,stagger:.06,ease:"power2.in"},.1).to(e(".tr-veil"),{opacity:0,duration:.5},.2),t==="wind"&&n.fromTo(e(".tr-leaf"),{x:-400,opacity:0,rotation:s=>s*40},{x:2400,opacity:1,rotation:s=>s*40+540,duration:1.5,stagger:.03,ease:"power1.inOut"},0),t==="fly"&&(e(".tr-orb").forEach((s,r)=>n.fromTo(s,{x:0,y:0,opacity:1,scale:.4},{x:Math.cos(r)*(300+r%7*120),y:Math.sin(r)*(200+r%5*90),scale:1.2,duration:.9,ease:"power2.out"},0).to(s,{opacity:0,duration:.6},.8)),n.fromTo(e(".tr-flash"),{opacity:.95},{opacity:0,duration:.45},0)),t==="petal"&&n.fromTo(e(".tr-pet"),{x:-200,opacity:0},{x:s=>2100+s%4*80,opacity:1,y:s=>i[s].y+140,rotation:s=>i[s].r+500,duration:1.7,stagger:.025,ease:"sine.inOut"},0),t==="mist"&&n.set(e(".tr-fog"),{xPercent:0},0).to(e(".tr-fog"),{xPercent:110,duration:.8,stagger:.1,ease:"power2.in"},.1),t==="bloom"&&n.set(e(".tr-iris"),{scale:1,rotation:50},0).to(e(".tr-iris"),{scale:3.2,opacity:0,rotation:90,duration:.8,ease:"power2.out"},0)}function Np({kind:n,onDone:e}){const t=G.useRef(null),i=G.useMemo(Ap,[]),s=G.useRef(e);return s.current=e,G.useLayoutEffect(()=>{const r=nt.utils.selector(t),o=nt.timeline({onComplete:()=>s.current()});return Rp(o,r,n,i),()=>{o.kill()}},[n,i]),a.jsx("div",{ref:t,className:`s5 tr tr-ov tr-${n}`,"aria-hidden":!0,children:a.jsx(Cp,{state:n,bits:i})})}const Gd=n=>{n.tl.play()};function Pp({view:n}){return a.jsx("div",{className:"fo-screen",children:a.jsx(mp,{v:n,onReady:Gd})})}function Lp({kind:n,intro:e}){return a.jsx("div",{className:"fo-screen",children:a.jsx(Mp,{kind:n,intro:e,onReady:Gd})})}function jd({view:n,reveal:e,flipKey:t}){const i=G.useRef(null);Go(i,"in",(u,d)=>{u.fromTo(d(".bd-title"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6},.1).fromTo(d(".bd-colh"),{opacity:0},{opacity:1,duration:.5},.4)});const s=n.rows.length,r=s>0&&e>=s,o=Bd(s,n.cols.length),c=G.useRef(null),l=G.useRef(n.rows);return l.current=n.rows,G.useLayoutEffect(()=>{if(!r||!t||c.current===t||!i.current||(c.current=t,typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const u=nt.utils.selector(i),d=nt.timeline({delay:.6});l.current.forEach((h,p)=>{const m=((h.prevIdx??p)-p)*(o.rh+o.gap);m&&d.fromTo(u(`.bd-row[data-i="${p}"]`),{y:m},{y:0,duration:1.3,ease:"power3.inOut",clearProps:"transform"},0)})},[r,t]),a.jsx("div",{className:"fo-screen",children:a.jsx(Sp,{v:n,rootRef:i,reveal:e})})}function Fi({view:n,step:e,only:t,onClick:i}){const s=G.useRef(null),r=G.useRef(n);return r.current=n,Go(s,e,(o,c)=>Ep(o,c,r.current,t)),a.jsx("div",{className:"fo-screen",onClick:i,children:a.jsx(Tp,{v:n,rootRef:s})})}function Ip({hues:n,onDone:e}){const t=G.useRef(e);return t.current=e,G.useEffect(()=>{const i=setTimeout(()=>t.current(),5600);return()=>clearTimeout(i)},[]),a.jsx(Fi,{view:{state:"antic",hues:n},step:"antic"})}function Dp({num:n,paper:e,startedAt:t,seconds:i,teams:s}){const r=G.useRef(null),o=yd(t,i,!0);Go(r,"in",(h,p)=>{h.fromTo(p(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(p(".at5-sub"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},.5).fromTo(p(".at5-timer"),{clipPath:"inset(100% -40% 0 -40%)"},{clipPath:"inset(0% -40% 0 -40%)",duration:1.3,ease:"power2.out"},.2).fromTo(p(".at5-t"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.05},.8)});const c=lp((s==null?void 0:s.length)??0),l=gs(),u=(s??[]).map(h=>h.name).join("|");G.useLayoutEffect(()=>{var h;(h=r.current)==null||h.querySelectorAll(".at5-t .nm").forEach(p=>{p.style.fontSize="";const m=p.parentElement;let x=parseFloat(getComputedStyle(p).fontSize)||30;for(;p.offsetHeight>m.clientHeight-6&&x>12;)x-=1,p.style.fontSize=`${x}px`})},[u,l,c.rowH,c.fz]);const d=e?"Сдавайте бланки":"Отвечайте!";return a.jsx("div",{className:"fo-screen",children:a.jsxs(gn,{rects:e?[{x:560,y:160,w:800,h:880}]:[{x:60,y:30,w:600,h:1e3},{x:680,y:220,w:1200,h:830}],n:t?o.left:null,rootRef:r,cls:`s5 ru at5${e?" paper":""}`,children:[a.jsx("h1",{className:"ru-title",children:d.split("").map((h,p)=>a.jsx("span",{className:"ch",children:h===" "?" ":h},p))}),a.jsxs("div",{className:"at5-sub",children:["Раунд ",n," · ",e?"передайте бланки ведущему":"капитаны отправляют ответы с телефонов"]}),a.jsx("div",{className:"at5-timer",children:a.jsx(mh,{n:o.left,total:i,size:e?420:380,seeds:24,stem:e?530:585})}),s&&a.jsx("ul",{className:"at5-teams",style:{gridTemplateColumns:`repeat(${c.cols}, 1fr)`,gridAutoRows:c.rowH,"--fz":`${c.fz}px`},children:s.map(h=>a.jsxs("li",{className:`at5-t${h.done?" done":""}`,children:[a.jsx("span",{className:"nm",style:{color:h.color},children:h.name}),a.jsxs("em",{children:[h.got,"/",h.total]})]},h.id))})]})})}function Up({q:n,roundName:e,qno:t,seconds:i}){const s=G.useMemo(()=>Ld(n,He,""),[n.id,n.question_text,JSON.stringify(n.media),JSON.stringify(n.answer)]);return a.jsx("div",{className:"fo-screen",children:a.jsx(Id,{q:s,roundName:e,qno:t,startedAt:null,seconds:i,reveal:!1,calm:!0,from:"D"})})}function Fp({on:n,phase:e}){const t=G.useRef(e),[i,s]=G.useState(null);G.useLayoutEffect(()=>{const o=n?cp(t.current,e):null;t.current=e,o&&(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||s(c=>({kind:o,n:((c==null?void 0:c.n)??0)+1})))},[n,e]);const r=G.useCallback(()=>s(null),[]);return!n||!i?null:a.jsx(Np,{kind:i.kind,onDone:r},i.n)}function Op({teams:n,paper:e}){const t=mf(n.length);if(t.mode==="invite")return a.jsxs("div",{className:"bk-teams is-invite",children:[a.jsx("div",{className:"bk-teams-head",children:a.jsx("span",{children:"КОМАНДЫ ЗА СТОЛОМ"})}),a.jsx("p",{className:"bk-invite-big",children:"Ждём первую команду"}),a.jsx("p",{className:"bk-invite-sub",children:e?"Ведущий впишет названия — они появятся на этой странице":"Отсканируйте код слева — название вашей команды появится здесь"})]});const i=n.length,s=i<=8?1:i<=16?2:3,r=Math.ceil(i/s),o=600,c=8,l=Math.max(52,Math.min(150,Math.floor((o-c*(r-1))/r))),u=i>s*8?n.slice(0,s*8-1):n,d=i-u.length;return a.jsxs("div",{className:`bk-teams is-${t.mode} bk-tcards`,style:{"--cols":s,"--per":r,"--ch":l},children:[a.jsxs("div",{className:"bk-teams-head",children:[a.jsx("span",{children:"КОМАНДЫ ЗА СТОЛОМ"}),a.jsx("b",{children:n.length})]}),a.jsxs("ol",{className:"bk-teams-grid bk-tc-grid",style:{gridTemplateColumns:`repeat(${s}, minmax(0, 1fr))`,gridAutoFlow:"row",gridTemplateRows:"none",gap:`${c}px 14px`,alignContent:"start"},children:[u.map(h=>a.jsx("li",{className:"bk-tc-item",children:a.jsx(Tn,{scene:!0,name:h.name,ch:l,color:h.color,icon:h.icon,away:!h.alive})},h.id)),d>0&&a.jsxs("li",{className:"bk-tc-item bk-tc-more",children:["+",d," ещё"]})]})]})}function Bp({paper:n}){return n?a.jsxs("div",{className:`bk-invite${n?" is-paper":""}`,children:[a.jsx("p",{className:"bk-invite-title",children:"Добро пожаловать!"}),a.jsx("p",{className:"bk-invite-text",children:"Бланки — на столах. Впишите название команды и передайте ведущему."})]}):null}function kp({lit:n,children:e}){return a.jsxs("div",{className:`bk-qr${n?" is-lit":""}`,children:[a.jsx("div",{className:"bk-qr-card"}),a.jsx("div",{className:"bk-qr-tile",children:e})]})}function zp({theme:n,teams:e,playerUrl:t,showQr:i,lit:s}){return n==="ny_book"?a.jsxs(a.Fragment,{children:[a.jsxs(Ss,{where:kc,children:[a.jsx(Op,{teams:e,paper:!i}),a.jsx(Bp,{paper:!i})]}),i&&a.jsx(Ss,{where:zc,children:a.jsx(kp,{lit:s,children:a.jsx(ur,{value:t,quiet:!0,ink:"#2a1a12",title:"QR для подключения",className:"ny-qr-svg"})})})]}):a.jsxs(a.Fragment,{children:[e.length>0&&a.jsx(Ss,{where:kc,children:a.jsx(gf,{teams:e})}),i&&a.jsx(Ss,{where:zc,children:a.jsx(xf,{lit:s,children:a.jsx(ur,{value:t,quiet:!0,ink:"#0b1735",title:"QR для подключения",className:"ny-qr-svg"})})})]})}const Gp=new Set("аеёиоуыэюяАЕЁИОУЫЭЮЯ".split("")),jp="­",on=n=>Gp.has(n),Hp=n=>/[А-Яа-яЁё]/.test(n);function Vp(n,e=3){const t=[...n];if(t.length<9||!t.every(Hp))return[];const i=[];for(let r=1;r<t.length;r++){const o=t[r-1],c=t[r];if("йьъЙЬЪ".includes(c))continue;let l=!1;if(on(o)&&!on(c))l=r+1<t.length&&on(t[r+1]);else if(!on(o)&&!on(c)&&r>=2&&on(t[r-2])&&!"ьъЬЪ".includes(o)){let u=r;for(;u<t.length&&!on(t[u])&&u-r<3;)u++;l=u<t.length&&on(t[u])}else on(o)&&on(c)&&(l=!0);l&&r>=e&&t.length-r>=e&&i.push(r)}const s=[];for(const r of i)(!s.length||r-s[s.length-1]>=4)&&s.push(r);return s}function Wp(n){return n.replace(/[А-Яа-яЁё]{9,}/g,e=>{const t=new Set(Vp(e));return[...e].map((i,s)=>t.has(s)?jp+i:i).join("")})}function Xc({lines:n,size:e="lg"}){const t=G.useMemo(()=>n.map(l=>Wp(l)),[n]),[i,s]=e==="lg"?[30,132]:[30,64],[r,o]=G.useState(0);G.useEffect(()=>{const l=[window.setTimeout(()=>o(1),400),window.setTimeout(()=>o(2),1600)];return()=>l.forEach(clearTimeout)},[]);const c=wr([t.join("|"),e,r],{range:()=>{const l=gh({w:window.innerWidth,h:window.innerHeight});return{min:i*l,max:s*l}}});return a.jsxs("div",{className:`bk-rt bk-rt-${e}`,children:[a.jsx("div",{className:"bk-rt-box",children:a.jsx("div",{ref:c,className:"bk-rt-h",role:"heading","aria-level":1,lang:"ru",children:t.map((l,u)=>a.jsxs("span",{className:"bk-rt-line",children:[l,a.jsx("br",{})]},u))})}),a.jsxs("div",{className:"bk-rt-rule","aria-hidden":"true",children:[a.jsx("i",{}),a.jsx("b",{children:"❖"}),a.jsx("i",{})]})]})}const Hd="qp-fx-enabled",$p=4e3,Xp={classic:520,potter:700};function qp(){try{const n=localStorage.getItem(Hd);return n===null?!0:n==="1"}catch{return!0}}function Yp(n){try{localStorage.setItem(Hd,n?"1":"0")}catch{}}function Kp(){return typeof location<"u"&&location.href.includes("nofx=1")}function Zp({theme:n,trigger:e,hud:t}){const[i,s]=G.useState(qp),r=G.useRef(null),o=G.useRef(0),[c,l]=G.useState(null);G.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",i),()=>{document.documentElement.classList.remove("fx-force-motion")}),[i]),G.useEffect(()=>{const d=r.current===null;if(r.current=e,d||!i||n==="new_year"||Kp())return;const h=Date.now();h-o.current<$p||(o.current=h,l(h))},[e]),G.useEffect(()=>{if(c===null)return;const d=(Xp[n]??300)+50,h=setTimeout(()=>l(null),d);return()=>clearTimeout(h)},[c,n]);const u=n==="classic"||n==="potter";return a.jsxs(a.Fragment,{children:[u&&a.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":i,title:i?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(d=>{const h=!d;return Yp(h),h}),children:"✨"}),c!==null&&n==="classic"&&a.jsx(Qp,{},c),c!==null&&n==="potter"&&a.jsx(em,{},c),n==="classic"&&t&&a.jsx(Jp,{label:t},t)]})}function Jp({label:n}){const[e,t]=G.useState(()=>90+Math.floor(Math.random()*10));return G.useEffect(()=>{const i=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(i)},[]),a.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",n," · SIG ",e,"%"]})}function Qp(){return a.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[a.jsx("span",{className:"fx-beam"}),a.jsx("span",{className:"fx-rgb"})]})}function em(){const n=Array.from({length:22},(e,t)=>t);return a.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>a.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const tm={1:["#f6d56a","#b8861b","#7b5410"],2:["#eef2f6","#9aa7b4","#5b6671"],3:["#ecae7a","#a8612c","#6b3a17"]};function Vd({place:n}){const[e,t,i]=tm[n],s=`fm${n}`;let r="";for(let o=0;o<10;o++){const c=o*Math.PI/5-Math.PI/2,l=o%2?7:17;r+=`${o?"L":"M"}${(50+Math.cos(c)*l).toFixed(1)} ${(54+Math.sin(c)*l).toFixed(1)}`}return a.jsxs("svg",{className:`fin-medal m${n}`,viewBox:"0 0 100 124","aria-hidden":"true",children:[a.jsx("defs",{children:a.jsxs("radialGradient",{id:s,cx:"35%",cy:"30%",children:[a.jsx("stop",{offset:"0",stopColor:e}),a.jsx("stop",{offset:".6",stopColor:t}),a.jsx("stop",{offset:"1",stopColor:i})]})}),a.jsx("path",{d:"M30 56 L18 120 L40 108 L50 123 L60 108 L82 120 L70 56Z",fill:"#b3263a",stroke:"#7a1626",strokeWidth:"2"}),a.jsx("circle",{cx:"50",cy:"48",r:"40",fill:`url(#${s})`,stroke:i,strokeWidth:"3"}),a.jsx("circle",{cx:"50",cy:"48",r:"31",fill:"none",stroke:"rgba(255,255,255,.55)",strokeWidth:"2"}),a.jsx("path",{d:`${r}Z`,transform:"translate(0 -6)",fill:"rgba(255,255,255,.92)"})]})}const qc=["🥇","🥈","🥉"];function Va({theme:n,place:e}){return n==="classic"?a.jsx(nm,{place:e}):n==="potter"?a.jsx(sm,{place:e}):n==="new_year"?a.jsx(im,{place:e}):n==="ny_book"?a.jsx(Vd,{place:e>=1&&e<=3?e:3}):a.jsx("span",{className:"award-emoji",children:qc[e-1]??qc[2]})}function nm({place:n}){return a.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ah-orbit"}),a.jsx("span",{className:"ah-face",children:a.jsx("b",{children:n})})]})}function im({place:n}){return a.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ab-cap"}),a.jsxs("span",{className:"ab-ball",children:[a.jsx("span",{className:"ab-shine"}),a.jsx("b",{children:n})]})]})}function sm({place:n}){return a.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"am-ribbon"}),a.jsxs("span",{className:"am-disc",children:[a.jsx("span",{className:"am-shine"}),a.jsx("b",{children:n})]})]})}function rm(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}function Wr({rules:n,delay:e,minScale:t=.5}){const i=wr([n.join("|")],{items:".rule-item",minScale:t});return a.jsxs("div",{className:"rules-frame","data-count":n.length,children:[a.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),a.jsx("div",{className:"rules-fit",children:a.jsx("div",{className:"rules-body",ref:i,children:n.map((s,r)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${e(r)}s`},children:[a.jsx("span",{className:"idx",children:String(r+1).padStart(2,"0")}),s]},r))})})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="185",am=0,Yc=1,om=2,sr=1,cm=2,ls=3,qn=0,jt=1,En=2,Nn=0,Oi=1,pi=2,Kc=3,Zc=4,lm=5,ri=100,dm=101,um=102,hm=103,fm=104,pm=200,mm=201,gm=202,xm=203,Wa=204,$a=205,_m=206,vm=207,Mm=208,ym=209,bm=210,Sm=211,wm=212,Em=213,Tm=214,Xa=0,qa=1,Ya=2,Hi=3,Ka=4,Za=5,Ja=6,Qa=7,Wd=0,Am=1,Cm=2,pn=0,$d=1,Xd=2,qd=3,Yd=4,Kd=5,Zd=6,Jd=7,Qd=300,mi=301,Vi=302,$r=303,Xr=304,Tr=306,eo=1e3,An=1001,to=1002,Nt=1003,Rm=1004,As=1005,Dt=1006,qr=1007,li=1008,$t=1009,eu=1010,tu=1011,fs=1012,Yo=1013,xn=1014,hn=1015,In=1016,Ko=1017,Zo=1018,ps=1020,nu=35902,iu=35899,su=1021,ru=1022,nn=1023,Dn=1026,di=1027,au=1028,Jo=1029,gi=1030,Qo=1031,ec=1033,rr=33776,ar=33777,or=33778,cr=33779,no=35840,io=35841,so=35842,ro=35843,ao=36196,oo=37492,co=37496,lo=37488,uo=37489,pr=37490,ho=37491,fo=37808,po=37809,mo=37810,go=37811,xo=37812,_o=37813,vo=37814,Mo=37815,yo=37816,bo=37817,So=37818,wo=37819,Eo=37820,To=37821,Ao=36492,Co=36494,Ro=36495,No=36283,Po=36284,mr=36285,Lo=36286,Nm=3200,Io=0,Pm=1,Wn="",Yt="srgb",gr="srgb-linear",xr="linear",it="srgb",yi=7680,Jc=519,Lm=512,Im=513,Dm=514,tc=515,Um=516,Fm=517,nc=518,Om=519,Qc=35044,el="300 es",fn=2e3,ms=2001;function Bm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function _r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function km(){const n=_r("canvas");return n.style.display="block",n}const tl={};function nl(...n){const e="THREE."+n.shift();console.log(e,...n)}function ou(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Be(...n){n=ou(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=ou(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Bi(...n){const e=n.join(" ");e in tl||(tl[e]=!0,Be(...n))}function zm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Gm={[Xa]:qa,[Ya]:Ja,[Ka]:Qa,[Hi]:Za,[qa]:Xa,[Ja]:Ya,[Qa]:Ka,[Za]:Hi};class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,Do=180/Math.PI;function xs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function jm(n,e){return(n%e+e)%e}function Kr(n,e,t){return(1-t)*n+t*e}function Qi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const fc=class fc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fc.prototype.isVector2=!0;let Ze=fc;class qi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,c){let l=i[s+0],u=i[s+1],d=i[s+2],h=i[s+3],p=r[o+0],m=r[o+1],x=r[o+2],M=r[o+3];if(h!==M||l!==p||u!==m||d!==x){let g=l*p+u*m+d*x+h*M;g<0&&(p=-p,m=-m,x=-x,M=-M,g=-g);let f=1-c;if(g<.9995){const v=Math.acos(g),w=Math.sin(v);f=Math.sin(f*v)/w,c=Math.sin(c*v)/w,l=l*f+p*c,u=u*f+m*c,d=d*f+x*c,h=h*f+M*c}else{l=l*f+p*c,u=u*f+m*c,d=d*f+x*c,h=h*f+M*c;const v=1/Math.sqrt(l*l+u*u+d*d+h*h);l*=v,u*=v,d*=v,h*=v}}e[t]=l,e[t+1]=u,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const c=i[s],l=i[s+1],u=i[s+2],d=i[s+3],h=r[o],p=r[o+1],m=r[o+2],x=r[o+3];return e[t]=c*x+d*h+l*m-u*p,e[t+1]=l*x+d*p+u*h-c*m,e[t+2]=u*x+d*m+c*p-l*h,e[t+3]=d*x-c*h-l*p-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,c=Math.cos,l=Math.sin,u=c(i/2),d=c(s/2),h=c(r/2),p=l(i/2),m=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=p*d*h+u*m*x,this._y=u*m*h-p*d*x,this._z=u*d*x+p*m*h,this._w=u*d*h-p*m*x;break;case"YXZ":this._x=p*d*h+u*m*x,this._y=u*m*h-p*d*x,this._z=u*d*x-p*m*h,this._w=u*d*h+p*m*x;break;case"ZXY":this._x=p*d*h-u*m*x,this._y=u*m*h+p*d*x,this._z=u*d*x+p*m*h,this._w=u*d*h-p*m*x;break;case"ZYX":this._x=p*d*h-u*m*x,this._y=u*m*h+p*d*x,this._z=u*d*x-p*m*h,this._w=u*d*h+p*m*x;break;case"YZX":this._x=p*d*h+u*m*x,this._y=u*m*h+p*d*x,this._z=u*d*x-p*m*h,this._w=u*d*h-p*m*x;break;case"XZY":this._x=p*d*h-u*m*x,this._y=u*m*h-p*d*x,this._z=u*d*x+p*m*h,this._w=u*d*h+p*m*x;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],c=t[5],l=t[9],u=t[2],d=t[6],h=t[10],p=i+c+h;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-u)*m,this._z=(o-s)*m}else if(i>c&&i>h){const m=2*Math.sqrt(1+i-c-h);this._w=(d-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+u)/m}else if(c>h){const m=2*Math.sqrt(1+c-i-h);this._w=(r-u)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+h-i-c);this._w=(o-s)/m,this._x=(r+u)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,c=t._x,l=t._y,u=t._z,d=t._w;return this._x=i*d+o*c+s*u-r*l,this._y=s*d+o*l+r*c-i*u,this._z=r*d+o*u+i*l-s*c,this._w=o*d-i*c-s*l-r*u,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,o=-o,c=-c);let l=1-t;if(c<.9995){const u=Math.acos(c),d=Math.sin(u);l=Math.sin(l*u)/d,t=Math.sin(t*u)/d,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const pc=class pc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,c=e.z,l=e.w,u=2*(o*s-c*i),d=2*(c*t-r*s),h=2*(r*i-o*t);return this.x=t+l*u+o*h-c*d,this.y=i+l*d+c*u-r*h,this.z=s+l*h+r*d-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,c=t.y,l=t.z;return this.x=s*l-r*c,this.y=r*o-i*l,this.z=i*c-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Zr.copy(this).projectOnVector(e),this.sub(Zr)}reflect(e){return this.sub(Zr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};pc.prototype.isVector3=!0;let J=pc;const Zr=new J,il=new qi,mc=class mc{constructor(e,t,i,s,r,o,c,l,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,u)}set(e,t,i,s,r,o,c,l,u){const d=this.elements;return d[0]=e,d[1]=s,d[2]=c,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=o,d[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[3],l=i[6],u=i[1],d=i[4],h=i[7],p=i[2],m=i[5],x=i[8],M=s[0],g=s[3],f=s[6],v=s[1],w=s[4],b=s[7],E=s[2],S=s[5],N=s[8];return r[0]=o*M+c*v+l*E,r[3]=o*g+c*w+l*S,r[6]=o*f+c*b+l*N,r[1]=u*M+d*v+h*E,r[4]=u*g+d*w+h*S,r[7]=u*f+d*b+h*N,r[2]=p*M+m*v+x*E,r[5]=p*g+m*w+x*S,r[8]=p*f+m*b+x*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],u=e[7],d=e[8];return t*o*d-t*c*u-i*r*d+i*c*l+s*r*u-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],u=e[7],d=e[8],h=d*o-c*u,p=c*l-d*r,m=u*r-o*l,x=t*h+i*p+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/x;return e[0]=h*M,e[1]=(s*u-d*i)*M,e[2]=(c*i-s*o)*M,e[3]=p*M,e[4]=(d*t-s*l)*M,e[5]=(s*r-c*t)*M,e[6]=m*M,e[7]=(i*l-u*t)*M,e[8]=(o*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,c){const l=Math.cos(r),u=Math.sin(r);return this.set(i*l,i*u,-i*(l*o+u*c)+o+e,-s*u,s*l,-s*(-u*o+l*c)+c+t,0,0,1),this}scale(e,t){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jr.makeScale(e,t)),this}rotate(e){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jr.makeRotation(-e)),this}translate(e,t){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};mc.prototype.isMatrix3=!0;let ke=mc;const Jr=new ke,sl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rl=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hm(){const n={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?xr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[gr]:{primaries:e,whitePoint:i,transfer:xr,toXYZ:sl,fromXYZ:rl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:sl,fromXYZ:rl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),n}const Ye=Hm();function Pn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ki(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let bi;class Vm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{bi===void 0&&(bi=_r("canvas")),bi.width=e.width,bi.height=e.height;const s=bi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=bi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_r("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pn(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pn(t[i]/255)*255):t[i]=Pn(t[i]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wm=0;class ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=xs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,c=s.length;o<c;o++)s[o].isDataTexture?r.push(Qr(s[o].image)):r.push(Qr(s[o]))}else r=Qr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Qr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let $m=0;const ea=new J;class Ut extends _i{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,i=An,s=An,r=Dt,o=li,c=nn,l=$t,u=Ut.DEFAULT_ANISOTROPY,d=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=xs(),this.name="",this.source=new ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ea).x}get height(){return this.source.getSize(ea).y}get depth(){return this.source.getSize(ea).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case eo:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case eo:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Qd;Ut.DEFAULT_ANISOTROPY=1;const gc=class gc{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,u=l[0],d=l[4],h=l[8],p=l[1],m=l[5],x=l[9],M=l[2],g=l[6],f=l[10];if(Math.abs(d-p)<.01&&Math.abs(h-M)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+p)<.1&&Math.abs(h+M)<.1&&Math.abs(x+g)<.1&&Math.abs(u+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(u+1)/2,b=(m+1)/2,E=(f+1)/2,S=(d+p)/4,N=(h+M)/4,y=(x+g)/4;return w>b&&w>E?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=S/i,r=N/i):b>E?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=S/s,r=y/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=N/r,s=y/r),this.set(i,s,r,t),this}let v=Math.sqrt((g-x)*(g-x)+(h-M)*(h-M)+(p-d)*(p-d));return Math.abs(v)<.001&&(v=1),this.x=(g-x)/v,this.y=(h-M)/v,this.z=(p-d)/v,this.w=Math.acos((u+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gc.prototype.isVector4=!0;let ft=gc;class Xm extends _i{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Ut(s),o=i.count;for(let c=0;c<o;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ic(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mn extends Xm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class cu extends Ut{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qm extends Ut{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sr=class Sr{constructor(e,t,i,s,r,o,c,l,u,d,h,p,m,x,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,u,d,h,p,m,x,M,g)}set(e,t,i,s,r,o,c,l,u,d,h,p,m,x,M,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=c,f[13]=l,f[2]=u,f[6]=d,f[10]=h,f[14]=p,f[3]=m,f[7]=x,f[11]=M,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Sr().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Si.setFromMatrixColumn(e,0).length(),r=1/Si.setFromMatrixColumn(e,1).length(),o=1/Si.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),c=Math.sin(i),l=Math.cos(s),u=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const p=o*d,m=o*h,x=c*d,M=c*h;t[0]=l*d,t[4]=-l*h,t[8]=u,t[1]=m+x*u,t[5]=p-M*u,t[9]=-c*l,t[2]=M-p*u,t[6]=x+m*u,t[10]=o*l}else if(e.order==="YXZ"){const p=l*d,m=l*h,x=u*d,M=u*h;t[0]=p+M*c,t[4]=x*c-m,t[8]=o*u,t[1]=o*h,t[5]=o*d,t[9]=-c,t[2]=m*c-x,t[6]=M+p*c,t[10]=o*l}else if(e.order==="ZXY"){const p=l*d,m=l*h,x=u*d,M=u*h;t[0]=p-M*c,t[4]=-o*h,t[8]=x+m*c,t[1]=m+x*c,t[5]=o*d,t[9]=M-p*c,t[2]=-o*u,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const p=o*d,m=o*h,x=c*d,M=c*h;t[0]=l*d,t[4]=x*u-m,t[8]=p*u+M,t[1]=l*h,t[5]=M*u+p,t[9]=m*u-x,t[2]=-u,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const p=o*l,m=o*u,x=c*l,M=c*u;t[0]=l*d,t[4]=M-p*h,t[8]=x*h+m,t[1]=h,t[5]=o*d,t[9]=-c*d,t[2]=-u*d,t[6]=m*h+x,t[10]=p-M*h}else if(e.order==="XZY"){const p=o*l,m=o*u,x=c*l,M=c*u;t[0]=l*d,t[4]=-h,t[8]=u*d,t[1]=p*h+M,t[5]=o*d,t[9]=m*h-x,t[2]=x*h-m,t[6]=c*d,t[10]=M*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ym,e,Km)}lookAt(e,t,i){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),kn.crossVectors(i,Vt),kn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),kn.crossVectors(i,Vt)),kn.normalize(),Cs.crossVectors(Vt,kn),s[0]=kn.x,s[4]=Cs.x,s[8]=Vt.x,s[1]=kn.y,s[5]=Cs.y,s[9]=Vt.y,s[2]=kn.z,s[6]=Cs.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[4],l=i[8],u=i[12],d=i[1],h=i[5],p=i[9],m=i[13],x=i[2],M=i[6],g=i[10],f=i[14],v=i[3],w=i[7],b=i[11],E=i[15],S=s[0],N=s[4],y=s[8],A=s[12],P=s[1],R=s[5],I=s[9],B=s[13],F=s[2],H=s[6],K=s[10],$=s[14],ne=s[3],Q=s[7],ie=s[11],pe=s[15];return r[0]=o*S+c*P+l*F+u*ne,r[4]=o*N+c*R+l*H+u*Q,r[8]=o*y+c*I+l*K+u*ie,r[12]=o*A+c*B+l*$+u*pe,r[1]=d*S+h*P+p*F+m*ne,r[5]=d*N+h*R+p*H+m*Q,r[9]=d*y+h*I+p*K+m*ie,r[13]=d*A+h*B+p*$+m*pe,r[2]=x*S+M*P+g*F+f*ne,r[6]=x*N+M*R+g*H+f*Q,r[10]=x*y+M*I+g*K+f*ie,r[14]=x*A+M*B+g*$+f*pe,r[3]=v*S+w*P+b*F+E*ne,r[7]=v*N+w*R+b*H+E*Q,r[11]=v*y+w*I+b*K+E*ie,r[15]=v*A+w*B+b*$+E*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],c=e[5],l=e[9],u=e[13],d=e[2],h=e[6],p=e[10],m=e[14],x=e[3],M=e[7],g=e[11],f=e[15],v=l*m-u*p,w=c*m-u*h,b=c*p-l*h,E=o*m-u*d,S=o*p-l*d,N=o*h-c*d;return t*(M*v-g*w+f*b)-i*(x*v-g*E+f*S)+s*(x*w-M*E+f*N)-r*(x*b-M*S+g*N)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],c=e[9],l=e[2],u=e[6],d=e[10];return t*(o*d-c*u)-i*(r*d-c*l)+s*(r*u-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],u=e[7],d=e[8],h=e[9],p=e[10],m=e[11],x=e[12],M=e[13],g=e[14],f=e[15],v=t*c-i*o,w=t*l-s*o,b=t*u-r*o,E=i*l-s*c,S=i*u-r*c,N=s*u-r*l,y=d*M-h*x,A=d*g-p*x,P=d*f-m*x,R=h*g-p*M,I=h*f-m*M,B=p*f-m*g,F=v*B-w*I+b*R+E*P-S*A+N*y;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/F;return e[0]=(c*B-l*I+u*R)*H,e[1]=(s*I-i*B-r*R)*H,e[2]=(M*N-g*S+f*E)*H,e[3]=(p*S-h*N-m*E)*H,e[4]=(l*P-o*B-u*A)*H,e[5]=(t*B-s*P+r*A)*H,e[6]=(g*b-x*N-f*w)*H,e[7]=(d*N-p*b+m*w)*H,e[8]=(o*I-c*P+u*y)*H,e[9]=(i*P-t*I-r*y)*H,e[10]=(x*S-M*b+f*v)*H,e[11]=(h*b-d*S-m*v)*H,e[12]=(c*A-o*R-l*y)*H,e[13]=(t*R-i*A+s*y)*H,e[14]=(M*w-x*E-g*v)*H,e[15]=(d*E-h*w+p*v)*H,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,c=e.y,l=e.z,u=r*o,d=r*c;return this.set(u*o+i,u*c-s*l,u*l+s*c,0,u*c+s*l,d*c+i,d*l-s*o,0,u*l-s*c,d*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,c=t._z,l=t._w,u=r+r,d=o+o,h=c+c,p=r*u,m=r*d,x=r*h,M=o*d,g=o*h,f=c*h,v=l*u,w=l*d,b=l*h,E=i.x,S=i.y,N=i.z;return s[0]=(1-(M+f))*E,s[1]=(m+b)*E,s[2]=(x-w)*E,s[3]=0,s[4]=(m-b)*S,s[5]=(1-(p+f))*S,s[6]=(g+v)*S,s[7]=0,s[8]=(x+w)*N,s[9]=(g-v)*N,s[10]=(1-(p+M))*N,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=Si.set(s[0],s[1],s[2]).length();const c=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Zt.copy(this);const u=1/o,d=1/c,h=1/l;return Zt.elements[0]*=u,Zt.elements[1]*=u,Zt.elements[2]*=u,Zt.elements[4]*=d,Zt.elements[5]*=d,Zt.elements[6]*=d,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),i.x=o,i.y=c,i.z=l,this}makePerspective(e,t,i,s,r,o,c=fn,l=!1){const u=this.elements,d=2*r/(t-e),h=2*r/(i-s),p=(t+e)/(t-e),m=(i+s)/(i-s);let x,M;if(l)x=r/(o-r),M=o*r/(o-r);else if(c===fn)x=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(c===ms)x=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=h,u[9]=m,u[13]=0,u[2]=0,u[6]=0,u[10]=x,u[14]=M,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,i,s,r,o,c=fn,l=!1){const u=this.elements,d=2/(t-e),h=2/(i-s),p=-(t+e)/(t-e),m=-(i+s)/(i-s);let x,M;if(l)x=1/(o-r),M=o/(o-r);else if(c===fn)x=-2/(o-r),M=-(o+r)/(o-r);else if(c===ms)x=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=0,u[12]=p,u[1]=0,u[5]=h,u[9]=0,u[13]=m,u[2]=0,u[6]=0,u[10]=x,u[14]=M,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Sr.prototype.isMatrix4=!0;let pt=Sr;const Si=new J,Zt=new pt,Ym=new J(0,0,0),Km=new J(1,1,1),kn=new J,Cs=new J,Vt=new J,al=new pt,ol=new qi;class Yn{constructor(e=0,t=0,i=0,s=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],c=s[8],l=s[1],u=s[5],d=s[9],h=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,u),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return al.makeRotationFromQuaternion(e),this.setFromRotationMatrix(al,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ol.setFromEuler(this),this.setFromQuaternion(ol,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class lu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zm=0;const cl=new J,wi=new qi,vn=new pt,Rs=new J,es=new J,Jm=new J,Qm=new qi,ll=new J(1,0,0),dl=new J(0,1,0),ul=new J(0,0,1),hl={type:"added"},e0={type:"removed"},Ei={type:"childadded",child:null},ta={type:"childremoved",child:null};class Bt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new J,t=new Yn,i=new qi,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new ke}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(ll,e)}rotateY(e){return this.rotateOnAxis(dl,e)}rotateZ(e){return this.rotateOnAxis(ul,e)}translateOnAxis(e,t){return cl.copy(e).applyQuaternion(this.quaternion),this.position.add(cl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ll,e)}translateY(e){return this.translateOnAxis(dl,e)}translateZ(e){return this.translateOnAxis(ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rs.copy(e):Rs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(es,Rs,this.up):vn.lookAt(Rs,es,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),wi.setFromRotationMatrix(vn),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(e0),ta.child=e,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,Jm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,Qm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){const h=l[u];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(r(e.materials,this.material[l]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];s.animations.push(r(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),u=o(e.textures),d=o(e.images),h=o(e.shapes),p=o(e.skeletons),m=o(e.animations),x=o(e.nodes);c.length>0&&(i.geometries=c),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),p.length>0&&(i.skeletons=p),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(c){const l=[];for(const u in c){const d=c[u];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Bt.DEFAULT_UP=new J(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ui extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const t0={type:"move"};class na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const c=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const M of e.hand.values()){const g=t.getJointPose(M,i),f=this._getHandJoint(u,M);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const d=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],p=d.position.distanceTo(h.position),m=.02,x=.005;u.inputState.pinching&&p>m+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&p<=m-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(t0)))}return c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function ia(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=jm(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ia(o,r,e+1/3),this.g=ia(o,r,e),this.b=ia(o,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function i(r){r!==void 0&&parseFloat(r)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],c=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const i=du[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pn(e.r),this.g=Pn(e.g),this.b=Pn(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Ye.workingToColorSpace(It.copy(this),e),Math.round(Ke(It.r*255,0,255))*65536+Math.round(Ke(It.g*255,0,255))*256+Math.round(Ke(It.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(It.copy(this),t);const i=It.r,s=It.g,r=It.b,o=Math.max(i,s,r),c=Math.min(i,s,r);let l,u;const d=(c+o)/2;if(c===o)l=0,u=0;else{const h=o-c;switch(u=d<=.5?h/(o+c):h/(2-o-c),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=u,e.l=d,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Yt){Ye.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,s=It.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Ns);const i=Kr(zn.h,Ns.h,t),s=Kr(zn.s,Ns.s,t),r=Kr(zn.l,Ns.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Xe;Xe.NAMES=du;class Ar{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new Ar(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class uu extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jt=new J,Mn=new J,sa=new J,yn=new J,Ti=new J,Ai=new J,fl=new J,ra=new J,aa=new J,oa=new J,ca=new ft,la=new ft,da=new ft;class tn{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Jt.subVectors(e,t),s.cross(Jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Jt.subVectors(s,t),Mn.subVectors(i,t),sa.subVectors(e,t);const o=Jt.dot(Jt),c=Jt.dot(Mn),l=Jt.dot(sa),u=Mn.dot(Mn),d=Mn.dot(sa),h=o*u-c*c;if(h===0)return r.set(0,0,0),null;const p=1/h,m=(u*l-c*d)*p,x=(o*d-c*l)*p;return r.set(1-m-x,x,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,i,s,r,o,c,l){return this.getBarycoord(e,t,i,s,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yn.x),l.addScaledVector(o,yn.y),l.addScaledVector(c,yn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ca.setScalar(0),la.setScalar(0),da.setScalar(0),ca.fromBufferAttribute(e,t),la.fromBufferAttribute(e,i),da.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ca,r.x),o.addScaledVector(la,r.y),o.addScaledVector(da,r.z),o}static isFrontFacing(e,t,i,s){return Jt.subVectors(i,t),Mn.subVectors(e,t),Jt.cross(Mn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),Jt.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,c;Ti.subVectors(s,i),Ai.subVectors(r,i),ra.subVectors(e,i);const l=Ti.dot(ra),u=Ai.dot(ra);if(l<=0&&u<=0)return t.copy(i);aa.subVectors(e,s);const d=Ti.dot(aa),h=Ai.dot(aa);if(d>=0&&h<=d)return t.copy(s);const p=l*h-d*u;if(p<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(i).addScaledVector(Ti,o);oa.subVectors(e,r);const m=Ti.dot(oa),x=Ai.dot(oa);if(x>=0&&m<=x)return t.copy(r);const M=m*u-l*x;if(M<=0&&u>=0&&x<=0)return c=u/(u-x),t.copy(i).addScaledVector(Ai,c);const g=d*x-m*h;if(g<=0&&h-d>=0&&m-x>=0)return fl.subVectors(r,s),c=(h-d)/(h-d+(m-x)),t.copy(s).addScaledVector(fl,c);const f=1/(g+M+p);return o=M*f,c=p*f,t.copy(i).addScaledVector(Ti,o).addScaledVector(Ai,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _s{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=r.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Qt):Qt.fromBufferAttribute(r,o),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ps.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ps.copy(i.boundingBox)),Ps.applyMatrix4(e.matrixWorld),this.union(Ps)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ts),Ls.subVectors(this.max,ts),Ci.subVectors(e.a,ts),Ri.subVectors(e.b,ts),Ni.subVectors(e.c,ts),Gn.subVectors(Ri,Ci),jn.subVectors(Ni,Ri),Zn.subVectors(Ci,Ni);let t=[0,-Gn.z,Gn.y,0,-jn.z,jn.y,0,-Zn.z,Zn.y,Gn.z,0,-Gn.x,jn.z,0,-jn.x,Zn.z,0,-Zn.x,-Gn.y,Gn.x,0,-jn.y,jn.x,0,-Zn.y,Zn.x,0];return!ua(t,Ci,Ri,Ni,Ls)||(t=[1,0,0,0,1,0,0,0,1],!ua(t,Ci,Ri,Ni,Ls))?!1:(Is.crossVectors(Gn,jn),t=[Is.x,Is.y,Is.z],ua(t,Ci,Ri,Ni,Ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bn=[new J,new J,new J,new J,new J,new J,new J,new J],Qt=new J,Ps=new _s,Ci=new J,Ri=new J,Ni=new J,Gn=new J,jn=new J,Zn=new J,ts=new J,Ls=new J,Is=new J,Jn=new J;function ua(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Jn.fromArray(n,r);const c=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),l=e.dot(Jn),u=t.dot(Jn),d=i.dot(Jn);if(Math.max(-Math.max(l,u,d),Math.min(l,u,d))>c)return!1}return!0}const wt=new J,Ds=new Ze;let n0=0;class kt extends _i{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qc,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ds.fromBufferAttribute(this,t),Ds.applyMatrix3(e),this.setXY(t,Ds.x,Ds.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class hu extends kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class fu extends kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ct extends kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const i0=new _s,ns=new J,ha=new J;class Cr{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):i0.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ns.subVectors(e,this.center);const t=ns.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ns,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ns.copy(e.center).add(ha)),this.expandByPoint(ns.copy(e.center).sub(ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let s0=0;const qt=new pt,fa=new Bt,Pi=new J,Wt=new _s,is=new _s,At=new J;class Ft extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bm(e)?fu:hu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ct(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Wt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const c=t[r];is.setFromBufferAttribute(c),this.morphTargetsRelative?(At.addVectors(Wt.min,is.min),Wt.expandByPoint(At),At.addVectors(Wt.max,is.max),Wt.expandByPoint(At)):(Wt.expandByPoint(is.min),Wt.expandByPoint(is.max))}Wt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)At.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(At));if(t)for(let r=0,o=t.length;r<o;r++){const c=t[r],l=this.morphTargetsRelative;for(let u=0,d=c.count;u<d;u++)At.fromBufferAttribute(c,u),l&&(Pi.fromBufferAttribute(e,u),At.add(Pi)),s=Math.max(s,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new kt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const c=[],l=[];for(let y=0;y<i.count;y++)c[y]=new J,l[y]=new J;const u=new J,d=new J,h=new J,p=new Ze,m=new Ze,x=new Ze,M=new J,g=new J;function f(y,A,P){u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,A),h.fromBufferAttribute(i,P),p.fromBufferAttribute(r,y),m.fromBufferAttribute(r,A),x.fromBufferAttribute(r,P),d.sub(u),h.sub(u),m.sub(p),x.sub(p);const R=1/(m.x*x.y-x.x*m.y);isFinite(R)&&(M.copy(d).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(R),g.copy(h).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(R),c[y].add(M),c[A].add(M),c[P].add(M),l[y].add(g),l[A].add(g),l[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let y=0,A=v.length;y<A;++y){const P=v[y],R=P.start,I=P.count;for(let B=R,F=R+I;B<F;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const w=new J,b=new J,E=new J,S=new J;function N(y){E.fromBufferAttribute(s,y),S.copy(E);const A=c[y];w.copy(A),w.sub(E.multiplyScalar(E.dot(A))).normalize(),b.crossVectors(S,A);const R=b.dot(l[y])<0?-1:1;o.setXYZW(y,w.x,w.y,w.z,R)}for(let y=0,A=v.length;y<A;++y){const P=v[y],R=P.start,I=P.count;for(let B=R,F=R+I;B<F;B+=3)N(e.getX(B+0)),N(e.getX(B+1)),N(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,m=i.count;p<m;p++)i.setXYZ(p,0,0,0);const s=new J,r=new J,o=new J,c=new J,l=new J,u=new J,d=new J,h=new J;if(e)for(let p=0,m=e.count;p<m;p+=3){const x=e.getX(p+0),M=e.getX(p+1),g=e.getX(p+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,g),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,M),u.fromBufferAttribute(i,g),c.add(d),l.add(d),u.add(d),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),i.setXYZ(p+0,d.x,d.y,d.z),i.setXYZ(p+1,d.x,d.y,d.z),i.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(c,l){const u=c.array,d=c.itemSize,h=c.normalized,p=new u.constructor(l.length*d);let m=0,x=0;for(let M=0,g=l.length;M<g;M++){c.isInterleavedBufferAttribute?m=l[M]*c.data.stride+c.offset:m=l[M]*d;for(let f=0;f<d;f++)p[x++]=u[m++]}return new kt(p,d,h)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,i=this.index.array,s=this.attributes;for(const c in s){const l=s[c],u=e(l,i);t.setAttribute(c,u)}const r=this.morphAttributes;for(const c in r){const l=[],u=r[c];for(let d=0,h=u.length;d<h;d++){const p=u[d],m=e(p,i);l.push(m)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const u=o[c];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],d=[];for(let h=0,p=u.length;h<p;h++){const m=u[h];d.push(m.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const u in s){const d=s[u];this.setAttribute(u,d.clone(t))}const r=e.morphAttributes;for(const u in r){const d=[],h=r[u];for(let p=0,m=h.length;p<m;p++)d.push(h[p].clone(t));this.morphAttributes[u]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,d=o.length;u<d;u++){const h=o[u];this.addGroup(h.start,h.count,h.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let r0=0;class Yi extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=xs(),this.name="",this.type="Material",this.blending=Oi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=$a,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(i.blending=this.blending),this.side!==qn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wa&&(i.blendSrc=this.blendSrc),this.blendDst!==$a&&(i.blendDst=this.blendDst),this.blendEquation!==ri&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const c in r){const l=r[c];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Sn=new J,pa=new J,Us=new J,Hn=new J,ma=new J,Fs=new J,ga=new J;class pu{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){pa.copy(e).add(t).multiplyScalar(.5),Us.copy(t).sub(e).normalize(),Hn.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Us),c=Hn.dot(this.direction),l=-Hn.dot(Us),u=Hn.lengthSq(),d=Math.abs(1-o*o);let h,p,m,x;if(d>0)if(h=o*l-c,p=o*c-l,x=r*d,h>=0)if(p>=-x)if(p<=x){const M=1/d;h*=M,p*=M,m=h*(h+o*p+2*c)+p*(o*h+p+2*l)+u}else p=r,h=Math.max(0,-(o*p+c)),m=-h*h+p*(p+2*l)+u;else p=-r,h=Math.max(0,-(o*p+c)),m=-h*h+p*(p+2*l)+u;else p<=-x?(h=Math.max(0,-(-o*r+c)),p=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+p*(p+2*l)+u):p<=x?(h=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+u):(h=Math.max(0,-(o*r+c)),p=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+p*(p+2*l)+u);else p=o>0?-r:r,h=Math.max(0,-(o*p+c)),m=-h*h+p*(p+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(pa).addScaledVector(Us,p),m}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const i=Sn.dot(this.direction),s=Sn.dot(Sn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),c=i-o,l=i+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,c,l;const u=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,p=this.origin;return u>=0?(i=(e.min.x-p.x)*u,s=(e.max.x-p.x)*u):(i=(e.max.x-p.x)*u,s=(e.min.x-p.x)*u),d>=0?(r=(e.min.y-p.y)*d,o=(e.max.y-p.y)*d):(r=(e.max.y-p.y)*d,o=(e.min.y-p.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(c=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(c=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),i>l||c>s)||((c>i||i!==i)&&(i=c),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,i,s,r){ma.subVectors(t,e),Fs.subVectors(i,e),ga.crossVectors(ma,Fs);let o=this.direction.dot(ga),c;if(o>0){if(s)return null;c=1}else if(o<0)c=-1,o=-o;else return null;Hn.subVectors(this.origin,e);const l=c*this.direction.dot(Fs.crossVectors(Hn,Fs));if(l<0)return null;const u=c*this.direction.dot(ma.cross(Hn));if(u<0||l+u>o)return null;const d=-c*Hn.dot(ga);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xn extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pl=new pt,Qn=new pu,Os=new Cr,ml=new J,Bs=new J,ks=new J,zs=new J,xa=new J,Gs=new J,gl=new J,js=new J;class ut extends Bt{constructor(e=new Ft,t=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Gs.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const d=c[l],h=r[l];d!==0&&(xa.fromBufferAttribute(h,e),o?Gs.addScaledVector(xa,d):Gs.addScaledVector(xa.sub(t),d))}t.add(Gs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere),Os.applyMatrix4(r),Qn.copy(e.ray).recast(e.near),!(Os.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Os,ml)===null||Qn.origin.distanceToSquared(ml)>(e.far-e.near)**2))&&(pl.copy(r).invert(),Qn.copy(e.ray).applyMatrix4(pl),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,c=r.index,l=r.attributes.position,u=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,p=r.groups,m=r.drawRange;if(c!==null)if(Array.isArray(o))for(let x=0,M=p.length;x<M;x++){const g=p[x],f=o[g.materialIndex],v=Math.max(g.start,m.start),w=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let b=v,E=w;b<E;b+=3){const S=c.getX(b),N=c.getX(b+1),y=c.getX(b+2);s=Hs(this,f,e,i,u,d,h,S,N,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let g=x,f=M;g<f;g+=3){const v=c.getX(g),w=c.getX(g+1),b=c.getX(g+2);s=Hs(this,o,e,i,u,d,h,v,w,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,M=p.length;x<M;x++){const g=p[x],f=o[g.materialIndex],v=Math.max(g.start,m.start),w=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let b=v,E=w;b<E;b+=3){const S=b,N=b+1,y=b+2;s=Hs(this,f,e,i,u,d,h,S,N,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let g=x,f=M;g<f;g+=3){const v=g,w=g+1,b=g+2;s=Hs(this,o,e,i,u,d,h,v,w,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function a0(n,e,t,i,s,r,o,c){let l;if(e.side===jt?l=i.intersectTriangle(o,r,s,!0,c):l=i.intersectTriangle(s,r,o,e.side===qn,c),l===null)return null;js.copy(c),js.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(js);return u<t.near||u>t.far?null:{distance:u,point:js.clone(),object:n}}function Hs(n,e,t,i,s,r,o,c,l,u){n.getVertexPosition(c,Bs),n.getVertexPosition(l,ks),n.getVertexPosition(u,zs);const d=a0(n,e,t,i,Bs,ks,zs,gl);if(d){const h=new J;tn.getBarycoord(gl,Bs,ks,zs,h),s&&(d.uv=tn.getInterpolatedAttribute(s,c,l,u,h,new Ze)),r&&(d.uv1=tn.getInterpolatedAttribute(r,c,l,u,h,new Ze)),o&&(d.normal=tn.getInterpolatedAttribute(o,c,l,u,h,new J),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const p={a:c,b:l,c:u,normal:new J,materialIndex:0};tn.getNormal(Bs,ks,zs,p.normal),d.face=p,d.barycoord=h}return d}class o0 extends Ut{constructor(e=null,t=1,i=1,s,r,o,c,l,u=Nt,d=Nt,h,p){super(null,o,c,l,u,d,s,r,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _a=new J,c0=new J,l0=new ke;class ni{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=_a.subVectors(i,t).cross(c0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(_a),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||l0.getNormalMatrix(e),s=this.coplanarPoint(_a).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Cr,d0=new Ze(.5,.5),Vs=new J;class sc{constructor(e=new ni,t=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fn,i=!1){const s=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],u=r[3],d=r[4],h=r[5],p=r[6],m=r[7],x=r[8],M=r[9],g=r[10],f=r[11],v=r[12],w=r[13],b=r[14],E=r[15];if(s[0].setComponents(u-o,m-d,f-x,E-v).normalize(),s[1].setComponents(u+o,m+d,f+x,E+v).normalize(),s[2].setComponents(u+c,m+h,f+M,E+w).normalize(),s[3].setComponents(u-c,m-h,f-M,E-w).normalize(),i)s[4].setComponents(l,p,g,b).normalize(),s[5].setComponents(u-l,m-p,f-g,E-b).normalize();else if(s[4].setComponents(u-l,m-p,f-g,E-b).normalize(),t===fn)s[5].setComponents(u+l,m+p,f+g,E+b).normalize();else if(t===ms)s[5].setComponents(l,p,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){ei.center.set(0,0,0);const t=d0.distanceTo(e.center);return ei.radius=.7071067811865476+t,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Vs.x=s.normal.x>0?e.max.x:e.min.x,Vs.y=s.normal.y>0?e.max.y:e.min.y,Vs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rr extends Yi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xl=new pt,Uo=new pu,Ws=new Cr,$s=new J;class rc extends Bt{constructor(e=new Ft,t=new Rr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ws.copy(i.boundingSphere),Ws.applyMatrix4(s),Ws.radius+=r,e.ray.intersectsSphere(Ws)===!1)return;xl.copy(s).invert(),Uo.copy(e.ray).applyMatrix4(xl);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=p,M=m;x<M;x++){const g=u.getX(x);$s.fromBufferAttribute(h,g),_l($s,g,l,s,e,t,this)}}else{const p=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=p,M=m;x<M;x++)$s.fromBufferAttribute(h,x),_l($s,x,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function _l(n,e,t,i,s,r,o){const c=Uo.distanceSqToPoint(n);if(c<t){const l=new J;Uo.closestPointToPoint(n,l),l.applyMatrix4(i);const u=s.ray.origin.distanceTo(l);if(u<s.near||u>s.far)return;r.push({distance:u,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class mu extends Ut{constructor(e=[],t=mi,i,s,r,o,c,l,u,d){super(e,t,i,s,r,o,c,l,u,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gu extends Ut{constructor(e,t,i,s,r,o,c,l,u){super(e,t,i,s,r,o,c,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wi extends Ut{constructor(e,t,i=xn,s,r,o,c=Nt,l=Nt,u,d=Dn,h=1){if(d!==Dn&&d!==di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:h};super(p,s,r,o,c,l,d,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ic(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class u0 extends Wi{constructor(e,t=xn,i=mi,s,r,o=Nt,c=Nt,l,u=Dn){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,s,r,o,c,l,u),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xu extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xi extends Ft{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const c=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],u=[],d=[],h=[];let p=0,m=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ct(u,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(h,2));function x(M,g,f,v,w,b,E,S,N,y,A){const P=b/N,R=E/y,I=b/2,B=E/2,F=S/2,H=N+1,K=y+1;let $=0,ne=0;const Q=new J;for(let ie=0;ie<K;ie++){const pe=ie*R-B;for(let fe=0;fe<H;fe++){const Re=fe*P-I;Q[M]=Re*v,Q[g]=pe*w,Q[f]=F,u.push(Q.x,Q.y,Q.z),Q[M]=0,Q[g]=0,Q[f]=S>0?1:-1,d.push(Q.x,Q.y,Q.z),h.push(fe/N),h.push(1-ie/y),$+=1}}for(let ie=0;ie<y;ie++)for(let pe=0;pe<N;pe++){const fe=p+pe+H*ie,Re=p+pe+H*(ie+1),ge=p+(pe+1)+H*(ie+1),Ae=p+(pe+1)+H*ie;l.push(fe,Re,Ae),l.push(Re,ge,Ae),ne+=6}c.addGroup(m,ne,A),m+=ne,p+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class zi extends Ft{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],p=[],m=[];let x=0;const M=[],g=i/2;let f=0;v(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new Ct(h,3)),this.setAttribute("normal",new Ct(p,3)),this.setAttribute("uv",new Ct(m,2));function v(){const b=new J,E=new J;let S=0;const N=(t-e)/i;for(let y=0;y<=r;y++){const A=[],P=y/r,R=P*(t-e)+e;for(let I=0;I<=s;I++){const B=I/s,F=B*l+c,H=Math.sin(F),K=Math.cos(F);E.x=R*H,E.y=-P*i+g,E.z=R*K,h.push(E.x,E.y,E.z),b.set(H,N,K).normalize(),p.push(b.x,b.y,b.z),m.push(B,1-P),A.push(x++)}M.push(A)}for(let y=0;y<s;y++)for(let A=0;A<r;A++){const P=M[A][y],R=M[A+1][y],I=M[A+1][y+1],B=M[A][y+1];(e>0||A!==0)&&(d.push(P,R,B),S+=3),(t>0||A!==r-1)&&(d.push(R,I,B),S+=3)}u.addGroup(f,S,0),f+=S}function w(b){const E=x,S=new Ze,N=new J;let y=0;const A=b===!0?e:t,P=b===!0?1:-1;for(let I=1;I<=s;I++)h.push(0,g*P,0),p.push(0,P,0),m.push(.5,.5),x++;const R=x;for(let I=0;I<=s;I++){const F=I/s*l+c,H=Math.cos(F),K=Math.sin(F);N.x=A*K,N.y=g*P,N.z=A*H,h.push(N.x,N.y,N.z),p.push(0,P,0),S.x=H*.5+.5,S.y=K*.5*P+.5,m.push(S.x,S.y),x++}for(let I=0;I<s;I++){const B=E+I,F=R+I;b===!0?d.push(F,F+1,B):d.push(F+1,F,B),y+=3}u.addGroup(f,y,b===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ac extends zi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,c=Math.PI*2){super(0,e,t,i,s,r,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c}}static fromJSON(e){return new ac(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ki extends Ft{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,c=Math.floor(i),l=Math.floor(s),u=c+1,d=l+1,h=e/c,p=t/l,m=[],x=[],M=[],g=[];for(let f=0;f<d;f++){const v=f*p-o;for(let w=0;w<u;w++){const b=w*h-r;x.push(b,-v,0),M.push(0,0,1),g.push(w/c),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<c;v++){const w=v+u*f,b=v+u*(f+1),E=v+1+u*(f+1),S=v+1+u*f;m.push(w,b,S),m.push(b,E,S)}this.setIndex(m),this.setAttribute("position",new Ct(x,3)),this.setAttribute("normal",new Ct(M,3)),this.setAttribute("uv",new Ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.widthSegments,e.heightSegments)}}class vr extends Ft{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+c,Math.PI);let u=0;const d=[],h=new J,p=new J,m=[],x=[],M=[],g=[];for(let f=0;f<=i;f++){const v=[],w=f/i,b=o+w*c,E=e*Math.cos(b),S=Math.sqrt(e*e-E*E);let N=0;f===0&&o===0?N=.5/t:f===i&&l===Math.PI&&(N=-.5/t);for(let y=0;y<=t;y++){const A=y/t,P=s+A*r;h.x=-S*Math.cos(P),h.y=E,h.z=S*Math.sin(P),x.push(h.x,h.y,h.z),p.copy(h).normalize(),M.push(p.x,p.y,p.z),g.push(A+N,1-w),v.push(u++)}d.push(v)}for(let f=0;f<i;f++)for(let v=0;v<t;v++){const w=d[f][v+1],b=d[f][v],E=d[f+1][v],S=d[f+1][v+1];(f!==0||o>0)&&m.push(w,b,S),(f!==i-1||l<Math.PI)&&m.push(b,E,S)}this.setIndex(m),this.setAttribute("position",new Ct(x,3)),this.setAttribute("normal",new Ct(M,3)),this.setAttribute("uv",new Ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class oc extends Ft{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const l=[],u=[],d=[],h=[],p=new J,m=new J,x=new J;for(let M=0;M<=i;M++){const g=o+M/i*c;for(let f=0;f<=s;f++){const v=f/s*r;m.x=(e+t*Math.cos(g))*Math.cos(v),m.y=(e+t*Math.cos(g))*Math.sin(v),m.z=t*Math.sin(g),u.push(m.x,m.y,m.z),p.x=e*Math.cos(v),p.y=e*Math.sin(v),x.subVectors(m,p).normalize(),d.push(x.x,x.y,x.z),h.push(f/s),h.push(M/i)}}for(let M=1;M<=i;M++)for(let g=1;g<=s;g++){const f=(s+1)*M+g-1,v=(s+1)*(M-1)+g-1,w=(s+1)*(M-1)+g,b=(s+1)*M+g;l.push(f,v,b),l.push(v,w,b)}this.setIndex(l),this.setAttribute("position",new Ct(u,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(vl(s))s.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(vl(s[0])){const r=[];for(let o=0,c=s.length;o<c;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const s in i)e[s]=i[s]}return e}function vl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function h0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function _u(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const f0={clone:$i,merge:Ot};var p0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,m0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=p0,this.fragmentShader=m0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=h0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new pt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class g0 extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ti extends Yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Io,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class x0 extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _0 extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class vu extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const va=new pt,Ml=new J,yl=new J;class v0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=$t,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sc,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ml),yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yl),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ms||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Xs=new J,qs=new qi,cn=new J;class Mu extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xs,qs,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,cn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Xs,qs,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new J,bl=new Ze,Sl=new Ze;class Gt extends Mu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Do*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Do*2*Math.atan(Math.tan(Yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,Sl),t.subVectors(Sl,bl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Yr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/u,s*=o.width/l,i*=o.height/u}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class M0 extends v0{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0}}class hi extends vu{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new M0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class yu extends Mu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,c=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,o=r+u*this.view.width,c-=d*this.view.offsetY,l=c-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bu extends vu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Li=-90,Ii=1;class y0 extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gt(Li,Ii,e,t);s.layers=this.layers,this.add(s);const r=new Gt(Li,Ii,e,t);r.layers=this.layers,this.add(r);const o=new Gt(Li,Ii,e,t);o.layers=this.layers,this.add(o);const c=new Gt(Li,Ii,e,t);c.layers=this.layers,this.add(c);const l=new Gt(Li,Ii,e,t);l.layers=this.layers,this.add(l);const u=new Gt(Li,Ii,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,c,l]=t;for(const u of t)this.remove(u);if(e===fn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,c,l,u,d]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,p,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class b0 extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const xc=class xc{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};xc.prototype.isMatrix2=!0;let wl=xc;function El(n,e,t,i){const s=S0(i);switch(t){case su:return n*e;case au:return n*e/s.components*s.byteLength;case Jo:return n*e/s.components*s.byteLength;case gi:return n*e*2/s.components*s.byteLength;case Qo:return n*e*2/s.components*s.byteLength;case ru:return n*e*3/s.components*s.byteLength;case nn:return n*e*4/s.components*s.byteLength;case ec:return n*e*4/s.components*s.byteLength;case rr:case ar:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case or:case cr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case io:case ro:return Math.max(n,16)*Math.max(e,8)/4;case no:case so:return Math.max(n,8)*Math.max(e,8)/2;case ao:case oo:case lo:case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case co:case pr:case ho:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case po:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case mo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case go:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case _o:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case vo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case yo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case So:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case wo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case To:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ao:case Co:case Ro:return Math.ceil(n/4)*Math.ceil(e/4)*16;case No:case Po:return Math.ceil(n/4)*Math.ceil(e/4)*8;case mr:case Lo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function S0(n){switch(n){case $t:case eu:return{byteLength:1,components:1};case fs:case tu:case In:return{byteLength:2,components:1};case Ko:case Zo:return{byteLength:2,components:4};case xn:case Yo:case hn:return{byteLength:4,components:1};case nu:case iu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Su(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function w0(n){const e=new WeakMap;function t(c,l){const u=c.array,d=c.usage,h=u.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,u,d),c.onUploadCallback();let m;if(u instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)m=n.HALF_FLOAT;else if(u instanceof Uint16Array)c.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=n.SHORT;else if(u instanceof Uint32Array)m=n.UNSIGNED_INT;else if(u instanceof Int32Array)m=n.INT;else if(u instanceof Int8Array)m=n.BYTE;else if(u instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:h}}function i(c,l,u){const d=l.array,h=l.updateRanges;if(n.bindBuffer(u,c),h.length===0)n.bufferSubData(u,0,d);else{h.sort((m,x)=>m.start-x.start);let p=0;for(let m=1;m<h.length;m++){const x=h[p],M=h[m];M.start<=x.start+x.count+1?x.count=Math.max(x.count,M.start+M.count-x.start):(++p,h[p]=M)}h.length=p+1;for(let m=0,x=h.length;m<x;m++){const M=h[m];n.bufferSubData(u,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(n.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const d=e.get(c);(!d||d.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const u=e.get(c);if(u===void 0)e.set(c,t(c,l));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,c,l),u.version=c.version}}return{get:s,remove:r,update:o}}var E0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T0=`#ifdef USE_ALPHAHASH
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
#endif`,A0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,C0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P0=`#ifdef USE_AOMAP
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
#endif`,L0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,I0=`#ifdef USE_BATCHING
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
#endif`,D0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,U0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,B0=`#ifdef USE_IRIDESCENCE
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
#endif`,k0=`#ifdef USE_BUMPMAP
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
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,V0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,W0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,X0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,q0=`#define PI 3.141592653589793
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
} // validated`,Y0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,K0=`vec3 transformedNormal = objectNormal;
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
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ng=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ig=`#ifdef USE_ENVMAP
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
#endif`,sg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rg=`#ifdef USE_ENVMAP
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
#endif`,ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,og=`#ifdef USE_ENVMAP
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
#endif`,cg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ug=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hg=`#ifdef USE_GRADIENTMAP
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
}`,fg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,xg=`#ifdef USE_ENVMAP
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
#endif`,_g=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bg=`PhysicalMaterial material;
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
#endif`,Sg=`uniform sampler2D dfgLUT;
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
}`,wg=`
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
#endif`,Eg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ag=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Cg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ig=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ug=`#if defined( USE_POINTS_UV )
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
#endif`,Fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gg=`#ifdef USE_MORPHTARGETS
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
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,qg=`#ifdef USE_NORMALMAP
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
#endif`,Yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ex=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ax=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dx=`float getShadowMask() {
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
}`,ux=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hx=`#ifdef USE_SKINNING
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
#endif`,fx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,px=`#ifdef USE_SKINNING
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
#endif`,mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_x=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vx=`#ifdef USE_TRANSMISSION
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
#endif`,Mx=`#ifdef USE_TRANSMISSION
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
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ex=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tx=`uniform sampler2D t2D;
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
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`#include <common>
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
}`,Lx=`#if DEPTH_PACKING == 3200
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
}`,Ix=`#define DISTANCE
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
}`,Dx=`#define DISTANCE
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
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ox=`uniform float scale;
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
}`,Bx=`uniform vec3 diffuse;
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
}`,kx=`#include <common>
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
}`,zx=`uniform vec3 diffuse;
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
}`,Gx=`#define LAMBERT
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
}`,jx=`#define LAMBERT
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
}`,Hx=`#define MATCAP
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
}`,Vx=`#define MATCAP
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
}`,Wx=`#define NORMAL
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
}`,$x=`#define NORMAL
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
}`,Xx=`#define PHONG
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
}`,qx=`#define PHONG
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
}`,Yx=`#define STANDARD
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
}`,Kx=`#define STANDARD
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
}`,Zx=`#define TOON
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
}`,Jx=`#define TOON
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
}`,Qx=`uniform float size;
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
}`,e_=`uniform vec3 diffuse;
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
}`,t_=`#include <common>
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
}`,n_=`uniform vec3 color;
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
}`,i_=`uniform float rotation;
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
}`,s_=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:E0,alphahash_pars_fragment:T0,alphamap_fragment:A0,alphamap_pars_fragment:C0,alphatest_fragment:R0,alphatest_pars_fragment:N0,aomap_fragment:P0,aomap_pars_fragment:L0,batching_pars_vertex:I0,batching_vertex:D0,begin_vertex:U0,beginnormal_vertex:F0,bsdfs:O0,iridescence_fragment:B0,bumpmap_pars_fragment:k0,clipping_planes_fragment:z0,clipping_planes_pars_fragment:G0,clipping_planes_pars_vertex:j0,clipping_planes_vertex:H0,color_fragment:V0,color_pars_fragment:W0,color_pars_vertex:$0,color_vertex:X0,common:q0,cube_uv_reflection_fragment:Y0,defaultnormal_vertex:K0,displacementmap_pars_vertex:Z0,displacementmap_vertex:J0,emissivemap_fragment:Q0,emissivemap_pars_fragment:eg,colorspace_fragment:tg,colorspace_pars_fragment:ng,envmap_fragment:ig,envmap_common_pars_fragment:sg,envmap_pars_fragment:rg,envmap_pars_vertex:ag,envmap_physical_pars_fragment:xg,envmap_vertex:og,fog_vertex:cg,fog_pars_vertex:lg,fog_fragment:dg,fog_pars_fragment:ug,gradientmap_pars_fragment:hg,lightmap_pars_fragment:fg,lights_lambert_fragment:pg,lights_lambert_pars_fragment:mg,lights_pars_begin:gg,lights_toon_fragment:_g,lights_toon_pars_fragment:vg,lights_phong_fragment:Mg,lights_phong_pars_fragment:yg,lights_physical_fragment:bg,lights_physical_pars_fragment:Sg,lights_fragment_begin:wg,lights_fragment_maps:Eg,lights_fragment_end:Tg,lightprobes_pars_fragment:Ag,logdepthbuf_fragment:Cg,logdepthbuf_pars_fragment:Rg,logdepthbuf_pars_vertex:Ng,logdepthbuf_vertex:Pg,map_fragment:Lg,map_pars_fragment:Ig,map_particle_fragment:Dg,map_particle_pars_fragment:Ug,metalnessmap_fragment:Fg,metalnessmap_pars_fragment:Og,morphinstance_vertex:Bg,morphcolor_vertex:kg,morphnormal_vertex:zg,morphtarget_pars_vertex:Gg,morphtarget_vertex:jg,normal_fragment_begin:Hg,normal_fragment_maps:Vg,normal_pars_fragment:Wg,normal_pars_vertex:$g,normal_vertex:Xg,normalmap_pars_fragment:qg,clearcoat_normal_fragment_begin:Yg,clearcoat_normal_fragment_maps:Kg,clearcoat_pars_fragment:Zg,iridescence_pars_fragment:Jg,opaque_fragment:Qg,packing:ex,premultiplied_alpha_fragment:tx,project_vertex:nx,dithering_fragment:ix,dithering_pars_fragment:sx,roughnessmap_fragment:rx,roughnessmap_pars_fragment:ax,shadowmap_pars_fragment:ox,shadowmap_pars_vertex:cx,shadowmap_vertex:lx,shadowmask_pars_fragment:dx,skinbase_vertex:ux,skinning_pars_vertex:hx,skinning_vertex:fx,skinnormal_vertex:px,specularmap_fragment:mx,specularmap_pars_fragment:gx,tonemapping_fragment:xx,tonemapping_pars_fragment:_x,transmission_fragment:vx,transmission_pars_fragment:Mx,uv_pars_fragment:yx,uv_pars_vertex:bx,uv_vertex:Sx,worldpos_vertex:wx,background_vert:Ex,background_frag:Tx,backgroundCube_vert:Ax,backgroundCube_frag:Cx,cube_vert:Rx,cube_frag:Nx,depth_vert:Px,depth_frag:Lx,distance_vert:Ix,distance_frag:Dx,equirect_vert:Ux,equirect_frag:Fx,linedashed_vert:Ox,linedashed_frag:Bx,meshbasic_vert:kx,meshbasic_frag:zx,meshlambert_vert:Gx,meshlambert_frag:jx,meshmatcap_vert:Hx,meshmatcap_frag:Vx,meshnormal_vert:Wx,meshnormal_frag:$x,meshphong_vert:Xx,meshphong_frag:qx,meshphysical_vert:Yx,meshphysical_frag:Kx,meshtoon_vert:Zx,meshtoon_frag:Jx,points_vert:Qx,points_frag:e_,shadow_vert:t_,shadow_frag:n_,sprite_vert:i_,sprite_frag:s_},ye={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},un={basic:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Ot([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Ot([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Ot([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Ot([ye.points,ye.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Ot([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Ot([ye.common,ye.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Ot([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Ot([ye.sprite,ye.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Ot([ye.common,ye.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Ot([ye.lights,ye.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};un.physical={uniforms:Ot([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Ys={r:0,b:0,g:0},r_=new pt,wu=new ke;wu.set(-1,0,0,0,1,0,0,0,1);function a_(n,e,t,i,s,r){const o=new Xe(0);let c=s===!0?0:1,l,u,d=null,h=0,p=null;function m(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const b=v.backgroundBlurriness>0;w=e.get(w,b)}return w}function x(v){let w=!1;const b=m(v);b===null?g(o,c):b&&b.isColor&&(g(b,1),w=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,w){const b=m(w);b&&(b.isCubeTexture||b.mapping===Tr)?(u===void 0&&(u=new ut(new xi(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:$i(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,S,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=b,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(r_.makeRotationFromEuler(w.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(wu),u.material.toneMapped=Ye.getTransfer(b.colorSpace)!==it,(d!==b||h!==b.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=b,h=b.version,p=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new ut(new Ki(2,2),new _n({name:"BackgroundMaterial",uniforms:$i(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(b.colorSpace)!==it,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=b,h=b.version,p=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,w){v.getRGB(Ys,_u(n)),t.buffers.color.setClear(Ys.r,Ys.g,Ys.b,w,r)}function f(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,w=1){o.set(v),c=w,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,g(o,c)},render:x,addToRenderList:M,dispose:f}}function o_(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=p(null);let r=s,o=!1;function c(R,I,B,F,H){let K=!1;const $=h(R,F,B,I);r!==$&&(r=$,u(r.object)),K=m(R,F,B,H),K&&x(R,F,B,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,b(R,I,B,F),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function u(R){return n.bindVertexArray(R)}function d(R){return n.deleteVertexArray(R)}function h(R,I,B,F){const H=F.wireframe===!0;let K=i[I.id];K===void 0&&(K={},i[I.id]=K);const $=R.isInstancedMesh===!0?R.id:0;let ne=K[$];ne===void 0&&(ne={},K[$]=ne);let Q=ne[B.id];Q===void 0&&(Q={},ne[B.id]=Q);let ie=Q[H];return ie===void 0&&(ie=p(l()),Q[H]=ie),ie}function p(R){const I=[],B=[],F=[];for(let H=0;H<t;H++)I[H]=0,B[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:F,object:R,attributes:{},index:null}}function m(R,I,B,F){const H=r.attributes,K=I.attributes;let $=0;const ne=B.getAttributes();for(const Q in ne)if(ne[Q].location>=0){const pe=H[Q];let fe=K[Q];if(fe===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),pe===void 0||pe.attribute!==fe||fe&&pe.data!==fe.data)return!0;$++}return r.attributesNum!==$||r.index!==F}function x(R,I,B,F){const H={},K=I.attributes;let $=0;const ne=B.getAttributes();for(const Q in ne)if(ne[Q].location>=0){let pe=K[Q];pe===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(pe=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(pe=R.instanceColor));const fe={};fe.attribute=pe,pe&&pe.data&&(fe.data=pe.data),H[Q]=fe,$++}r.attributes=H,r.attributesNum=$,r.index=F}function M(){const R=r.newAttributes;for(let I=0,B=R.length;I<B;I++)R[I]=0}function g(R){f(R,0)}function f(R,I){const B=r.newAttributes,F=r.enabledAttributes,H=r.attributeDivisors;B[R]=1,F[R]===0&&(n.enableVertexAttribArray(R),F[R]=1),H[R]!==I&&(n.vertexAttribDivisor(R,I),H[R]=I)}function v(){const R=r.newAttributes,I=r.enabledAttributes;for(let B=0,F=I.length;B<F;B++)I[B]!==R[B]&&(n.disableVertexAttribArray(B),I[B]=0)}function w(R,I,B,F,H,K,$){$===!0?n.vertexAttribIPointer(R,I,B,H,K):n.vertexAttribPointer(R,I,B,F,H,K)}function b(R,I,B,F){M();const H=F.attributes,K=B.getAttributes(),$=I.defaultAttributeValues;for(const ne in K){const Q=K[ne];if(Q.location>=0){let ie=H[ne];if(ie===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(ie=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(ie=R.instanceColor)),ie!==void 0){const pe=ie.normalized,fe=ie.itemSize,Re=e.get(ie);if(Re===void 0)continue;const ge=Re.buffer,Ae=Re.type,ae=Re.bytesPerElement,z=Ae===n.INT||Ae===n.UNSIGNED_INT||ie.gpuType===Yo;if(ie.isInterleavedBufferAttribute){const Z=ie.data,Me=Z.stride,Ie=ie.offset;if(Z.isInstancedInterleavedBuffer){for(let Ne=0;Ne<Q.locationSize;Ne++)f(Q.location+Ne,Z.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ne=0;Ne<Q.locationSize;Ne++)g(Q.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Ne=0;Ne<Q.locationSize;Ne++)w(Q.location+Ne,fe/Q.locationSize,Ae,pe,Me*ae,(Ie+fe/Q.locationSize*Ne)*ae,z)}else{if(ie.isInstancedBufferAttribute){for(let Z=0;Z<Q.locationSize;Z++)f(Q.location+Z,ie.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Z=0;Z<Q.locationSize;Z++)g(Q.location+Z);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Z=0;Z<Q.locationSize;Z++)w(Q.location+Z,fe/Q.locationSize,Ae,pe,fe*ae,fe/Q.locationSize*Z*ae,z)}}else if($!==void 0){const pe=$[ne];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(Q.location,pe);break;case 3:n.vertexAttrib3fv(Q.location,pe);break;case 4:n.vertexAttrib4fv(Q.location,pe);break;default:n.vertexAttrib1fv(Q.location,pe)}}}}v()}function E(){A();for(const R in i){const I=i[R];for(const B in I){const F=I[B];for(const H in F){const K=F[H];for(const $ in K)d(K[$].object),delete K[$];delete F[H]}}delete i[R]}}function S(R){if(i[R.id]===void 0)return;const I=i[R.id];for(const B in I){const F=I[B];for(const H in F){const K=F[H];for(const $ in K)d(K[$].object),delete K[$];delete F[H]}}delete i[R.id]}function N(R){for(const I in i){const B=i[I];for(const F in B){const H=B[F];if(H[R.id]===void 0)continue;const K=H[R.id];for(const $ in K)d(K[$].object),delete K[$];delete H[R.id]}}}function y(R){for(const I in i){const B=i[I],F=R.isInstancedMesh===!0?R.id:0,H=B[F];if(H!==void 0){for(const K in H){const $=H[K];for(const ne in $)d($[ne].object),delete $[ne];delete H[K]}delete B[F],Object.keys(B).length===0&&delete i[I]}}}function A(){P(),o=!0,r!==s&&(r=s,u(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:A,resetDefaultState:P,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfObject:y,releaseStatesOfProgram:N,initAttributes:M,enableAttribute:g,disableUnusedAttributes:v}}function c_(n,e,t){let i;function s(l){i=l}function r(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function c(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let p=0;for(let m=0;m<d;m++)p+=u[m];t.update(p,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=c}function l_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(N){return!(N!==nn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(N){const y=N===In&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==$t&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==hn&&!y)}function l(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const d=l(u);d!==u&&(Be("WebGLRenderer:",u,"not supported, using",d,"instead."),u=d);const h=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&p===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:x,maxTextureSize:M,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:b,maxSamples:E,samples:S}}function d_(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new ni,c=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const m=h.length!==0||p||i!==0||s;return s=p,i=h.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,p){t=d(h,p,0)},this.setState=function(h,p,m){const x=h.clippingPlanes,M=h.clipIntersection,g=h.clipShadows,f=n.get(h);if(!s||x===null||x.length===0||r&&!g)r?d(null):u();else{const v=r?0:i,w=v*4;let b=f.clippingState||null;l.value=b,b=d(x,p,w,m);for(let E=0;E!==w;++E)b[E]=t[E];f.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,p,m,x){const M=h!==null?h.length:0;let g=null;if(M!==0){if(g=l.value,x!==!0||g===null){const f=m+M*4,v=p.matrixWorldInverse;c.getNormalMatrix(v),(g===null||g.length<f)&&(g=new Float32Array(f));for(let w=0,b=m;w!==M;++w,b+=4)o.copy(h[w]).applyMatrix4(v,c),o.normal.toArray(g,b),g[b+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,g}}const $n=4,Tl=[.125,.215,.35,.446,.526,.582],ai=20,u_=256,ss=new yu,Al=new Xe;let Ma=null,ya=0,ba=0,Sa=!1;const h_=new J;class Cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:c=h_}=r;Ma=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ma,ya,ba),this._renderer.xr.enabled=Sa,e.scissorTest=!1,Di(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ma=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:In,format:nn,colorSpace:gr,depthBuffer:!1},s=Rl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=f_(r)),this._blurMaterial=m_(r,e,t),this._ggxMaterial=p_(r,e,t)}return s}_compileMaterial(e){const t=new ut(new Ft,e);this._renderer.compile(t,ss)}_sceneToCubeUV(e,t,i,s,r){const l=new Gt(90,1,t,i),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,m=h.toneMapping;h.getClearColor(Al),h.toneMapping=pn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ut(new xi,new Xn({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,g=M.material;let f=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,f=!0):(g.color.copy(Al),f=!0);for(let w=0;w<6;w++){const b=w%3;b===0?(l.up.set(0,u[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[w],r.y,r.z)):b===1?(l.up.set(0,0,u[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[w],r.z)):(l.up.set(0,u[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[w]));const E=this._cubeSize;Di(s,b*E,w>2?E:0,E,E),h.setRenderTarget(s),f&&h.render(M,l),h.render(e,l)}h.toneMapping=m,h.autoClear=p,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===mi||e.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const c=r.uniforms;c.envMap.value=e;const l=this._cubeSize;Di(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ss)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms,u=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(u*u-d*d),p=0+u*1.25,m=h*p,{_lodMax:x}=this,M=this._sizeLods[i],g=3*M*(i>x-$n?i-x+$n:0),f=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=x-t,Di(r,g,f,3*M,2*M),s.setRenderTarget(r),s.render(c,ss),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,Di(e,g,f,3*M,2*M),s.setRenderTarget(e),s.render(c,ss)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,c){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[s];h.material=u;const p=u.uniforms,m=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ai-1),M=r/x,g=isFinite(r)?1+Math.floor(d*M):ai;g>ai&&Be(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ai}`);const f=[];let v=0;for(let N=0;N<ai;++N){const y=N/M,A=Math.exp(-y*y/2);f.push(A),N===0?v+=A:N<g&&(v+=2*A)}for(let N=0;N<f.length;N++)f[N]=f[N]/v;p.envMap.value=e.texture,p.samples.value=g,p.weights.value=f,p.latitudinal.value=o==="latitudinal",c&&(p.poleAxis.value=c);const{_lodMax:w}=this;p.dTheta.value=x,p.mipInt.value=w-i;const b=this._sizeLods[s],E=3*b*(s>w-$n?s-w+$n:0),S=4*(this._cubeSize-b);Di(t,E,S,3*b,2*b),l.setRenderTarget(t),l.render(h,ss)}}function f_(n){const e=[],t=[],i=[];let s=n;const r=n-$n+1+Tl.length;for(let o=0;o<r;o++){const c=Math.pow(2,s);e.push(c);let l=1/c;o>n-$n?l=Tl[o-n+$n-1]:o===0&&(l=0),t.push(l);const u=1/(c-2),d=-u,h=1+u,p=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,x=6,M=3,g=2,f=1,v=new Float32Array(M*x*m),w=new Float32Array(g*x*m),b=new Float32Array(f*x*m);for(let S=0;S<m;S++){const N=S%3*2/3-1,y=S>2?0:-1,A=[N,y,0,N+2/3,y,0,N+2/3,y+1,0,N,y,0,N+2/3,y+1,0,N,y+1,0];v.set(A,M*x*S),w.set(p,g*x*S);const P=[S,S,S,S,S,S];b.set(P,f*x*S)}const E=new Ft;E.setAttribute("position",new kt(v,M)),E.setAttribute("uv",new kt(w,g)),E.setAttribute("faceIndex",new kt(b,f)),i.push(new ut(E,null)),s>$n&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Rl(n,e,t){const i=new mn(n,e,t);return i.texture.mapping=Tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Di(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function p_(n,e,t){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:u_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function m_(n,e,t){const i=new Float32Array(ai),s=new J(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Nl(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Pl(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Nr(){return`

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
	`}class Eu extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new mu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xi(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:Nn});r.uniforms.tEquirect.value=t;const o=new ut(s,r),c=t.minFilter;return t.minFilter===li&&(t.minFilter=Dt),new y0(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function g_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(p,m=!1){return p==null?null:m?o(p):r(p)}function r(p){if(p&&p.isTexture){const m=p.mapping;if(m===$r||m===Xr)if(e.has(p)){const x=e.get(p).texture;return c(x,p.mapping)}else{const x=p.image;if(x&&x.height>0){const M=new Eu(x.height);return M.fromEquirectangularTexture(n,p),e.set(p,M),p.addEventListener("dispose",u),c(M.texture,p.mapping)}else return null}}return p}function o(p){if(p&&p.isTexture){const m=p.mapping,x=m===$r||m===Xr,M=m===mi||m===Vi;if(x||M){let g=t.get(p);const f=g!==void 0?g.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==f)return i===null&&(i=new Cl(n)),g=x?i.fromEquirectangular(p,g):i.fromCubemap(p,g),g.texture.pmremVersion=p.pmremVersion,t.set(p,g),g.texture;if(g!==void 0)return g.texture;{const v=p.image;return x&&v&&v.height>0||M&&v&&l(v)?(i===null&&(i=new Cl(n)),g=x?i.fromEquirectangular(p):i.fromCubemap(p),g.texture.pmremVersion=p.pmremVersion,t.set(p,g),p.addEventListener("dispose",d),g.texture):null}}}return p}function c(p,m){return m===$r?p.mapping=mi:m===Xr&&(p.mapping=Vi),p}function l(p){let m=0;const x=6;for(let M=0;M<x;M++)p[M]!==void 0&&m++;return m===x}function u(p){const m=p.target;m.removeEventListener("dispose",u);const x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function d(p){const m=p.target;m.removeEventListener("dispose",d);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function x_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Bi("WebGLRenderer: "+i+" extension not supported."),s}}}function __(n,e,t,i){const s={},r=new WeakMap;function o(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const x in p.attributes)e.remove(p.attributes[x]);p.removeEventListener("dispose",o),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function c(h,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const m in p)e.update(p[m],n.ARRAY_BUFFER)}function u(h){const p=[],m=h.index,x=h.attributes.position;let M=0;if(x===void 0)return;if(m!==null){const v=m.array;M=m.version;for(let w=0,b=v.length;w<b;w+=3){const E=v[w+0],S=v[w+1],N=v[w+2];p.push(E,S,S,N,N,E)}}else{const v=x.array;M=x.version;for(let w=0,b=v.length/3-1;w<b;w+=3){const E=w+0,S=w+1,N=w+2;p.push(E,S,S,N,N,E)}}const g=new(x.count>=65535?fu:hu)(p,1);g.version=M;const f=r.get(h);f&&e.remove(f),r.set(h,g)}function d(h){const p=r.get(h);if(p){const m=h.index;m!==null&&p.version<m.version&&u(h)}else u(h);return r.get(h)}return{get:c,update:l,getWireframeAttribute:d}}function v_(n,e,t){let i;function s(h){i=h}let r,o;function c(h){r=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,r,h*o),t.update(p,i,1)}function u(h,p,m){m!==0&&(n.drawElementsInstanced(i,p,r,h*o,m),t.update(p,i,m))}function d(h,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,h,0,m);let M=0;for(let g=0;g<m;g++)M+=p[g];t.update(M,i,1)}this.setMode=s,this.setIndex=c,this.render=l,this.renderInstances=u,this.renderMultiDraw=d}function M_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,c){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:et("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function y_(n,e,t){const i=new WeakMap,s=new ft;function r(o,c,l){const u=o.morphTargetInfluences,d=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,h=d!==void 0?d.length:0;let p=i.get(c);if(p===void 0||p.count!==h){let A=function(){N.dispose(),i.delete(c),c.removeEventListener("dispose",A)};p!==void 0&&p.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,M=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],f=c.morphAttributes.normal||[],v=c.morphAttributes.color||[];let w=0;m===!0&&(w=1),x===!0&&(w=2),M===!0&&(w=3);let b=c.attributes.position.count*w,E=1;b>e.maxTextureSize&&(E=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const S=new Float32Array(b*E*4*h),N=new cu(S,b,E,h);N.type=hn,N.needsUpdate=!0;const y=w*4;for(let P=0;P<h;P++){const R=g[P],I=f[P],B=v[P],F=b*E*4*P;for(let H=0;H<R.count;H++){const K=H*y;m===!0&&(s.fromBufferAttribute(R,H),S[F+K+0]=s.x,S[F+K+1]=s.y,S[F+K+2]=s.z,S[F+K+3]=0),x===!0&&(s.fromBufferAttribute(I,H),S[F+K+4]=s.x,S[F+K+5]=s.y,S[F+K+6]=s.z,S[F+K+7]=0),M===!0&&(s.fromBufferAttribute(B,H),S[F+K+8]=s.x,S[F+K+9]=s.y,S[F+K+10]=s.z,S[F+K+11]=B.itemSize===4?s.w:1)}}p={count:h,texture:N,size:new Ze(b,E)},i.set(c,p),c.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let M=0;M<u.length;M++)m+=u[M];const x=c.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function b_(n,e,t,i,s){let r=new WeakMap;function o(u){const d=s.render.frame,h=u.geometry,p=e.get(u,h);if(r.get(p)!==d&&(e.update(p),r.set(p,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),r.get(u)!==d&&(t.update(u.instanceMatrix,n.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,n.ARRAY_BUFFER),r.set(u,d))),u.isSkinnedMesh){const m=u.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return p}function c(){r=new WeakMap}function l(u){const d=u.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:c}}const S_={[$d]:"LINEAR_TONE_MAPPING",[Xd]:"REINHARD_TONE_MAPPING",[qd]:"CINEON_TONE_MAPPING",[Yd]:"ACES_FILMIC_TONE_MAPPING",[Zd]:"AGX_TONE_MAPPING",[Jd]:"NEUTRAL_TONE_MAPPING",[Kd]:"CUSTOM_TONE_MAPPING"};function w_(n,e,t,i,s,r){const o=new mn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Wi(e,t):void 0}),c=new mn(e,t,{type:In,depthBuffer:!1,stencilBuffer:!1}),l=new Ft;l.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ct([0,2,0,0,2,0],2));const u=new g0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ut(l,u),h=new yu(-1,1,1,-1,0,1);let p=null,m=null,x=!1,M,g=null,f=[],v=!1;this.setSize=function(w,b){o.setSize(w,b),c.setSize(w,b);for(let E=0;E<f.length;E++){const S=f[E];S.setSize&&S.setSize(w,b)}},this.setEffects=function(w){f=w,v=f.length>0&&f[0].isRenderPass===!0;const b=o.width,E=o.height;for(let S=0;S<f.length;S++){const N=f[S];N.setSize&&N.setSize(b,E)}},this.begin=function(w,b){if(x||w.toneMapping===pn&&f.length===0)return!1;if(g=b,b!==null){const E=b.width,S=b.height;(o.width!==E||o.height!==S)&&this.setSize(E,S)}return v===!1&&w.setRenderTarget(o),M=w.toneMapping,w.toneMapping=pn,!0},this.hasRenderPass=function(){return v},this.end=function(w,b){w.toneMapping=M,x=!0;let E=o,S=c;for(let N=0;N<f.length;N++){const y=f[N];if(y.enabled!==!1&&(y.render(w,S,E,b),y.needsSwap!==!1)){const A=E;E=S,S=A}}if(p!==w.outputColorSpace||m!==w.toneMapping){p=w.outputColorSpace,m=w.toneMapping,u.defines={},Ye.getTransfer(p)===it&&(u.defines.SRGB_TRANSFER="");const N=S_[m];N&&(u.defines[N]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,w.setRenderTarget(g),w.render(d,h),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),c.dispose(),l.dispose(),u.dispose()}}const Tu=new Ut,Fo=new Wi(1,1),Au=new cu,Cu=new qm,Ru=new mu,Ll=[],Il=[],Dl=new Float32Array(16),Ul=new Float32Array(9),Fl=new Float32Array(4);function Zi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ll[s];if(r===void 0&&(r=new Float32Array(s),Ll[s]=r),e!==0){i.toArray(r,0);for(let o=1,c=0;o!==e;++o)c+=t,n[o].toArray(r,c)}return r}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Pr(n,e){let t=Il[e];t===void 0&&(t=new Int32Array(e),Il[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function E_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function T_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function A_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function C_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function R_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Fl.set(i),n.uniformMatrix2fv(this.addr,!1,Fl),Tt(t,i)}}function N_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Ul.set(i),n.uniformMatrix3fv(this.addr,!1,Ul),Tt(t,i)}}function P_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Dl.set(i),n.uniformMatrix4fv(this.addr,!1,Dl),Tt(t,i)}}function L_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function I_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function D_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function U_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function F_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function O_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function B_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function k_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function z_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Fo.compareFunction=t.isReversedDepthBuffer()?nc:tc,r=Fo):r=Tu,t.setTexture2D(e||r,s)}function G_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Cu,s)}function j_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ru,s)}function H_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Au,s)}function V_(n){switch(n){case 5126:return E_;case 35664:return T_;case 35665:return A_;case 35666:return C_;case 35674:return R_;case 35675:return N_;case 35676:return P_;case 5124:case 35670:return L_;case 35667:case 35671:return I_;case 35668:case 35672:return D_;case 35669:case 35673:return U_;case 5125:return F_;case 36294:return O_;case 36295:return B_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return z_;case 35679:case 36299:case 36307:return G_;case 35680:case 36300:case 36308:case 36293:return j_;case 36289:case 36303:case 36311:case 36292:return H_}}function W_(n,e){n.uniform1fv(this.addr,e)}function $_(n,e){const t=Zi(e,this.size,2);n.uniform2fv(this.addr,t)}function X_(n,e){const t=Zi(e,this.size,3);n.uniform3fv(this.addr,t)}function q_(n,e){const t=Zi(e,this.size,4);n.uniform4fv(this.addr,t)}function Y_(n,e){const t=Zi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function K_(n,e){const t=Zi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Z_(n,e){const t=Zi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function J_(n,e){n.uniform1iv(this.addr,e)}function Q_(n,e){n.uniform2iv(this.addr,e)}function ev(n,e){n.uniform3iv(this.addr,e)}function tv(n,e){n.uniform4iv(this.addr,e)}function nv(n,e){n.uniform1uiv(this.addr,e)}function iv(n,e){n.uniform2uiv(this.addr,e)}function sv(n,e){n.uniform3uiv(this.addr,e)}function rv(n,e){n.uniform4uiv(this.addr,e)}function av(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Fo:o=Tu;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||o,r[c])}function ov(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Cu,r[o])}function cv(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ru,r[o])}function lv(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Au,r[o])}function dv(n){switch(n){case 5126:return W_;case 35664:return $_;case 35665:return X_;case 35666:return q_;case 35674:return Y_;case 35675:return K_;case 35676:return Z_;case 5124:case 35670:return J_;case 35667:case 35671:return Q_;case 35668:case 35672:return ev;case 35669:case 35673:return tv;case 5125:return nv;case 36294:return iv;case 36295:return sv;case 36296:return rv;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return ov;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return lv}}class uv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=V_(t.type)}}class hv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dv(t.type)}}class fv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function Ol(n,e){n.seq.push(e),n.map[e.id]=e}function pv(n,e,t){const i=n.name,s=i.length;for(wa.lastIndex=0;;){const r=wa.exec(i),o=wa.lastIndex;let c=r[1];const l=r[2]==="]",u=r[3];if(l&&(c=c|0),u===void 0||u==="["&&o+2===s){Ol(t,u===void 0?new uv(c,n,e):new hv(c,n,e));break}else{let h=t.map[c];h===void 0&&(h=new fv(c),Ol(t,h)),t=h}}}class lr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);pv(c,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const c=t[r],l=i[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Bl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const mv=37297;let gv=0;function xv(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const c=o+1;i.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return i.join(`
`)}const kl=new ke;function _v(n){Ye._getMatrix(kl,Ye.workingColorSpace,n);const e=`mat3( ${kl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case xr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function zl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+xv(n.getShaderSource(e),c)}else return r}function vv(n,e){const t=_v(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Mv={[$d]:"Linear",[Xd]:"Reinhard",[qd]:"Cineon",[Yd]:"ACESFilmic",[Zd]:"AgX",[Jd]:"Neutral",[Kd]:"Custom"};function yv(n,e){const t=Mv[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ks=new J;function bv(){Ye.getLuminanceCoefficients(Ks);const n=Ks.x.toFixed(4),e=Ks.y.toFixed(4),t=Ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function wv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ev(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:c}}return t}function ds(n){return n!==""}function Gl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(n){return n.replace(Tv,Cv)}const Av=new Map;function Cv(n,e){let t=je[e];if(t===void 0){const i=Av.get(e);if(i!==void 0)t=je[i],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Oo(t)}const Rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(n){return n.replace(Rv,Nv)}function Nv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Pv={[sr]:"SHADOWMAP_TYPE_PCF",[ls]:"SHADOWMAP_TYPE_VSM"};function Lv(n){return Pv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Iv={[mi]:"ENVMAP_TYPE_CUBE",[Vi]:"ENVMAP_TYPE_CUBE",[Tr]:"ENVMAP_TYPE_CUBE_UV"};function Dv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Iv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Uv={[Vi]:"ENVMAP_MODE_REFRACTION"};function Fv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Uv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ov={[Wd]:"ENVMAP_BLENDING_MULTIPLY",[Am]:"ENVMAP_BLENDING_MIX",[Cm]:"ENVMAP_BLENDING_ADD"};function Bv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ov[n.combine]||"ENVMAP_BLENDING_NONE"}function kv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function zv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=Lv(t),u=Dv(t),d=Fv(t),h=Bv(t),p=kv(t),m=Sv(t),x=wv(r),M=s.createProgram();let g,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ds).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ds).join(`
`),f.length>0&&(f+=`
`)):(g=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),f=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pn?"#define TONE_MAPPING":"",t.toneMapping!==pn?je.tonemapping_pars_fragment:"",t.toneMapping!==pn?yv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,vv("linearToOutputTexel",t.outputColorSpace),bv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ds).join(`
`)),o=Oo(o),o=Gl(o,t),o=jl(o,t),c=Oo(c),c=Gl(c,t),c=jl(c,t),o=Hl(o),c=Hl(c),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===el?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===el?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=v+g+o,b=v+f+c,E=Bl(s,s.VERTEX_SHADER,w),S=Bl(s,s.FRAGMENT_SHADER,b);s.attachShader(M,E),s.attachShader(M,S),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function N(R){if(n.debug.checkShaderErrors){const I=s.getProgramInfoLog(M)||"",B=s.getShaderInfoLog(E)||"",F=s.getShaderInfoLog(S)||"",H=I.trim(),K=B.trim(),$=F.trim();let ne=!0,Q=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,S);else{const ie=zl(s,E,"vertex"),pe=zl(s,S,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+ie+`
`+pe)}else H!==""?Be("WebGLProgram: Program Info Log:",H):(K===""||$==="")&&(Q=!1);Q&&(R.diagnostics={runnable:ne,programLog:H,vertexShader:{log:K,prefix:g},fragmentShader:{log:$,prefix:f}})}s.deleteShader(E),s.deleteShader(S),y=new lr(s,M),A=Ev(s,M)}let y;this.getUniforms=function(){return y===void 0&&N(this),y};let A;this.getAttributes=function(){return A===void 0&&N(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(M,mv)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gv++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=S,this}let Gv=0;class jv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Hv(e),t.set(e,i)),i}}class Hv{constructor(e){this.id=Gv++,this.code=e,this.usedTimes=0}}function Vv(n){return n===gi||n===pr||n===mr}function Wv(n,e,t,i,s,r){const o=new lu,c=new jv,l=new Set,u=[],d=new Map,h=i.logarithmicDepthBuffer;let p=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function M(y,A,P,R,I,B){const F=R.fog,H=I.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,$=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ne=e.get(y.envMap||K,$),Q=ne&&ne.mapping===Tr?ne.image.height:null,ie=m[y.type];y.precision!==null&&(p=i.getMaxPrecision(y.precision),p!==y.precision&&Be("WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const pe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,fe=pe!==void 0?pe.length:0;let Re=0;H.morphAttributes.position!==void 0&&(Re=1),H.morphAttributes.normal!==void 0&&(Re=2),H.morphAttributes.color!==void 0&&(Re=3);let ge,Ae,ae,z;if(ie){const Pe=un[ie];ge=Pe.vertexShader,Ae=Pe.fragmentShader}else{ge=y.vertexShader,Ae=y.fragmentShader;const Pe=c.getVertexShaderStage(y),gt=c.getFragmentShaderStage(y);c.update(y,Pe,gt),ae=Pe.id,z=gt.id}const Z=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Ie=I.isInstancedMesh===!0,Ne=I.isBatchedMesh===!0,qe=!!y.map,Ge=!!y.matcap,Je=!!ne,$e=!!y.aoMap,Ve=!!y.lightMap,dt=!!y.bumpMap&&y.wireframe===!1,ht=!!y.normalMap,mt=!!y.displacementMap,Mt=!!y.emissiveMap,ot=!!y.metalnessMap,q=!!y.roughnessMap,L=y.anisotropy>0,oe=y.clearcoat>0,ce=y.dispersion>0,T=y.iridescence>0,_=y.sheen>0,D=y.transmission>0,U=L&&!!y.anisotropyMap,k=oe&&!!y.clearcoatMap,Y=oe&&!!y.clearcoatNormalMap,j=oe&&!!y.clearcoatRoughnessMap,O=T&&!!y.iridescenceMap,V=T&&!!y.iridescenceThicknessMap,re=_&&!!y.sheenColorMap,he=_&&!!y.sheenRoughnessMap,de=!!y.specularMap,le=!!y.specularColorMap,ve=!!y.specularIntensityMap,Se=D&&!!y.transmissionMap,Ue=D&&!!y.thicknessMap,W=!!y.gradientMap,_e=!!y.alphaMap,ue=y.alphaTest>0,xe=!!y.alphaHash,Ee=!!y.extensions;let me=pn;y.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(me=n.toneMapping);const De={shaderID:ie,shaderType:y.type,shaderName:y.name,vertexShader:ge,fragmentShader:Ae,defines:y.defines,customVertexShaderID:ae,customFragmentShaderID:z,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ne,batchingColor:Ne&&I._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&I.instanceColor!==null,instancingMorph:Ie&&I.morphTexture!==null,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:qe,matcap:Ge,envMap:Je,envMapMode:Je&&ne.mapping,envMapCubeUVHeight:Q,aoMap:$e,lightMap:Ve,bumpMap:dt,normalMap:ht,displacementMap:mt,emissiveMap:Mt,normalMapObjectSpace:ht&&y.normalMapType===Pm,normalMapTangentSpace:ht&&y.normalMapType===Io,packedNormalMap:ht&&y.normalMapType===Io&&Vv(y.normalMap.format),metalnessMap:ot,roughnessMap:q,anisotropy:L,anisotropyMap:U,clearcoat:oe,clearcoatMap:k,clearcoatNormalMap:Y,clearcoatRoughnessMap:j,dispersion:ce,iridescence:T,iridescenceMap:O,iridescenceThicknessMap:V,sheen:_,sheenColorMap:re,sheenRoughnessMap:he,specularMap:de,specularColorMap:le,specularIntensityMap:ve,transmission:D,transmissionMap:Se,thicknessMap:Ue,gradientMap:W,opaque:y.transparent===!1&&y.blending===Oi&&y.alphaToCoverage===!1,alphaMap:_e,alphaTest:ue,alphaHash:xe,combine:y.combine,mapUv:qe&&x(y.map.channel),aoMapUv:$e&&x(y.aoMap.channel),lightMapUv:Ve&&x(y.lightMap.channel),bumpMapUv:dt&&x(y.bumpMap.channel),normalMapUv:ht&&x(y.normalMap.channel),displacementMapUv:mt&&x(y.displacementMap.channel),emissiveMapUv:Mt&&x(y.emissiveMap.channel),metalnessMapUv:ot&&x(y.metalnessMap.channel),roughnessMapUv:q&&x(y.roughnessMap.channel),anisotropyMapUv:U&&x(y.anisotropyMap.channel),clearcoatMapUv:k&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:Y&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:O&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:V&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:re&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:he&&x(y.sheenRoughnessMap.channel),specularMapUv:de&&x(y.specularMap.channel),specularColorMapUv:le&&x(y.specularColorMap.channel),specularIntensityMapUv:ve&&x(y.specularIntensityMap.channel),transmissionMapUv:Se&&x(y.transmissionMap.channel),thicknessMapUv:Ue&&x(y.thicknessMap.channel),alphaMapUv:_e&&x(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ht||L),vertexNormals:!!H.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!H.attributes.uv&&(qe||_e),fog:!!F,useFog:y.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&ht===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Me,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Re,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:me,decodeVideoTexture:qe&&y.map.isVideoTexture===!0&&Ye.getTransfer(y.map.colorSpace)===it,decodeVideoTextureEmissive:Mt&&y.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(y.emissiveMap.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===En,flipSided:y.side===jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ee&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&y.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function g(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)A.push(P),A.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(f(A,y),v(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function f(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function v(y,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function w(y){const A=m[y.type];let P;if(A){const R=un[A];P=f0.clone(R.uniforms)}else P=y.uniforms;return P}function b(y,A){let P=d.get(A);return P!==void 0?++P.usedTimes:(P=new zv(n,A,y,s),u.push(P),d.set(A,P)),P}function E(y){if(--y.usedTimes===0){const A=u.indexOf(y);u[A]=u[u.length-1],u.pop(),d.delete(y.cacheKey),y.destroy()}}function S(y){c.remove(y)}function N(){c.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:w,acquireProgram:b,releaseProgram:E,releaseShaderCache:S,programs:u,dispose:N}}function $v(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let c=n.get(o);return c===void 0&&(c={},n.set(o,c)),c}function i(o){n.delete(o)}function s(o,c,l){n.get(o)[c]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Xv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Wl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $l(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(p){let m=0;return p.isInstancedMesh&&(m+=2),p.isSkinnedMesh&&(m+=1),m}function c(p,m,x,M,g,f){let v=n[e];return v===void 0?(v={id:p.id,object:p,geometry:m,material:x,materialVariant:o(p),groupOrder:M,renderOrder:p.renderOrder,z:g,group:f},n[e]=v):(v.id=p.id,v.object=p,v.geometry=m,v.material=x,v.materialVariant=o(p),v.groupOrder=M,v.renderOrder=p.renderOrder,v.z=g,v.group=f),e++,v}function l(p,m,x,M,g,f){const v=c(p,m,x,M,g,f);x.transmission>0?i.push(v):x.transparent===!0?s.push(v):t.push(v)}function u(p,m,x,M,g,f){const v=c(p,m,x,M,g,f);x.transmission>0?i.unshift(v):x.transparent===!0?s.unshift(v):t.unshift(v)}function d(p,m,x){t.length>1&&t.sort(p||Xv),i.length>1&&i.sort(m||Wl),s.length>1&&s.sort(m||Wl),x&&(t.reverse(),i.reverse(),s.reverse())}function h(){for(let p=e,m=n.length;p<m;p++){const x=n[p];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:u,finish:h,sort:d}}function qv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new $l,n.set(i,[o])):s>=r.length?(o=new $l,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Yv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new Xe};break;case"SpotLight":t={position:new J,direction:new J,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function Kv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Zv=0;function Jv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Qv(n){const e=new Yv,t=Kv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new J);const s=new J,r=new pt,o=new pt;function c(u){let d=0,h=0,p=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let m=0,x=0,M=0,g=0,f=0,v=0,w=0,b=0,E=0,S=0,N=0;u.sort(Jv);for(let A=0,P=u.length;A<P;A++){const R=u[A],I=R.color,B=R.intensity,F=R.distance;let H=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===gi?H=R.shadow.map.texture:H=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=I.r*B,h+=I.g*B,p+=I.b*B;else if(R.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(R.sh.coefficients[K],B);N++}else if(R.isDirectionalLight){const K=e.get(R);if(K.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const $=R.shadow,ne=t.get(R);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,i.directionalShadow[m]=ne,i.directionalShadowMap[m]=H,i.directionalShadowMatrix[m]=R.shadow.matrix,v++}i.directional[m]=K,m++}else if(R.isSpotLight){const K=e.get(R);K.position.setFromMatrixPosition(R.matrixWorld),K.color.copy(I).multiplyScalar(B),K.distance=F,K.coneCos=Math.cos(R.angle),K.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),K.decay=R.decay,i.spot[M]=K;const $=R.shadow;if(R.map&&(i.spotLightMap[E]=R.map,E++,$.updateMatrices(R),R.castShadow&&S++),i.spotLightMatrix[M]=$.matrix,R.castShadow){const ne=t.get(R);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,i.spotShadow[M]=ne,i.spotShadowMap[M]=H,b++}M++}else if(R.isRectAreaLight){const K=e.get(R);K.color.copy(I).multiplyScalar(B),K.halfWidth.set(R.width*.5,0,0),K.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=K,g++}else if(R.isPointLight){const K=e.get(R);if(K.color.copy(R.color).multiplyScalar(R.intensity),K.distance=R.distance,K.decay=R.decay,R.castShadow){const $=R.shadow,ne=t.get(R);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,ne.shadowCameraNear=$.camera.near,ne.shadowCameraFar=$.camera.far,i.pointShadow[x]=ne,i.pointShadowMap[x]=H,i.pointShadowMatrix[x]=R.shadow.matrix,w++}i.point[x]=K,x++}else if(R.isHemisphereLight){const K=e.get(R);K.skyColor.copy(R.color).multiplyScalar(B),K.groundColor.copy(R.groundColor).multiplyScalar(B),i.hemi[f]=K,f++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=p;const y=i.hash;(y.directionalLength!==m||y.pointLength!==x||y.spotLength!==M||y.rectAreaLength!==g||y.hemiLength!==f||y.numDirectionalShadows!==v||y.numPointShadows!==w||y.numSpotShadows!==b||y.numSpotMaps!==E||y.numLightProbes!==N)&&(i.directional.length=m,i.spot.length=M,i.rectArea.length=g,i.point.length=x,i.hemi.length=f,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+E-S,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=N,y.directionalLength=m,y.pointLength=x,y.spotLength=M,y.rectAreaLength=g,y.hemiLength=f,y.numDirectionalShadows=v,y.numPointShadows=w,y.numSpotShadows=b,y.numSpotMaps=E,y.numLightProbes=N,i.version=Zv++)}function l(u,d){let h=0,p=0,m=0,x=0,M=0;const g=d.matrixWorldInverse;for(let f=0,v=u.length;f<v;f++){const w=u[f];if(w.isDirectionalLight){const b=i.directional[h];b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),h++}else if(w.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const b=i.rectArea[x];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),o.identity(),r.copy(w.matrixWorld),r.premultiply(g),o.extractRotation(r),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(w.isPointLight){const b=i.point[p];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),p++}else if(w.isHemisphereLight){const b=i.hemi[M];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(g),M++}}}return{setup:c,setupView:l,state:i}}function Xl(n){const e=new Qv(n),t=[],i=[],s=[];function r(p){h.camera=p,t.length=0,i.length=0,s.length=0}function o(p){t.push(p)}function c(p){i.push(p)}function l(p){s.push(p)}function u(){e.setup(t)}function d(p){e.setupView(t,p)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:u,setupLightsView:d,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function eM(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let c;return o===void 0?(c=new Xl(n),e.set(s,[c])):r>=o.length?(c=new Xl(n),o.push(c)):c=o[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const tM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nM=`uniform sampler2D shadow_pass;
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
}`,iM=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],sM=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],ql=new pt,rs=new J,Ea=new J;function rM(n,e,t){let i=new sc;const s=new Ze,r=new Ze,o=new ft,c=new x0,l=new _0,u={},d=t.maxTextureSize,h={[qn]:jt,[jt]:qn,[En]:En},p=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:tM,fragmentShader:nM}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const x=new Ft;x.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ut(x,p),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sr;let f=this.type;this.render=function(S,N,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===cm&&(Be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=sr);const A=n.getRenderTarget(),P=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Nn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=f!==this.type;B&&N.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(H=>H.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,H=S.length;F<H;F++){const K=S[F],$=K.shadow;if($===void 0){Be("WebGLShadowMap:",K,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ne=$.getFrameExtents();s.multiply(ne),r.copy($.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,$.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,$.mapSize.y=r.y));const Q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=Q,$.map===null||B===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===ls){if(K.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new mn(s.x,s.y,{format:gi,type:In,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),$.map.texture.name=K.name+".shadowMap",$.map.depthTexture=new Wi(s.x,s.y,hn),$.map.depthTexture.name=K.name+".shadowMapDepth",$.map.depthTexture.format=Dn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Nt,$.map.depthTexture.magFilter=Nt}else K.isPointLight?($.map=new Eu(s.x),$.map.depthTexture=new u0(s.x,xn)):($.map=new mn(s.x,s.y),$.map.depthTexture=new Wi(s.x,s.y,xn)),$.map.depthTexture.name=K.name+".shadowMap",$.map.depthTexture.format=Dn,this.type===sr?($.map.depthTexture.compareFunction=Q?nc:tc,$.map.depthTexture.minFilter=Dt,$.map.depthTexture.magFilter=Dt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Nt,$.map.depthTexture.magFilter=Nt);$.camera.updateProjectionMatrix()}const ie=$.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<ie;pe++){if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,pe),n.clear();else{pe===0&&(n.setRenderTarget($.map),n.clear());const fe=$.getViewport(pe);o.set(r.x*fe.x,r.y*fe.y,r.x*fe.z,r.y*fe.w),I.viewport(o)}if(K.isPointLight){const fe=$.camera,Re=$.matrix,ge=K.distance||fe.far;ge!==fe.far&&(fe.far=ge,fe.updateProjectionMatrix()),rs.setFromMatrixPosition(K.matrixWorld),fe.position.copy(rs),Ea.copy(fe.position),Ea.add(iM[pe]),fe.up.copy(sM[pe]),fe.lookAt(Ea),fe.updateMatrixWorld(),Re.makeTranslation(-rs.x,-rs.y,-rs.z),ql.multiplyMatrices(fe.projectionMatrix,fe.matrixWorldInverse),$._frustum.setFromProjectionMatrix(ql,fe.coordinateSystem,fe.reversedDepth)}else $.updateMatrices(K);i=$.getFrustum(),b(N,y,$.camera,K,this.type)}$.isPointLightShadow!==!0&&this.type===ls&&v($,y),$.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(A,P,R)};function v(S,N){const y=e.update(M);p.defines.VSM_SAMPLES!==S.blurSamples&&(p.defines.VSM_SAMPLES=S.blurSamples,m.defines.VSM_SAMPLES=S.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new mn(s.x,s.y,{format:gi,type:In})),p.uniforms.shadow_pass.value=S.map.depthTexture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(N,null,y,p,M,null),m.uniforms.shadow_pass.value=S.mapPass.texture,m.uniforms.resolution.value=S.mapSize,m.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(N,null,y,m,M,null)}function w(S,N,y,A){let P=null;const R=y.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)P=R;else if(P=y.isPointLight===!0?l:c,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const I=P.uuid,B=N.uuid;let F=u[I];F===void 0&&(F={},u[I]=F);let H=F[B];H===void 0&&(H=P.clone(),F[B]=H,N.addEventListener("dispose",E)),P=H}if(P.visible=N.visible,P.wireframe=N.wireframe,A===ls?P.side=N.shadowSide!==null?N.shadowSide:N.side:P.side=N.shadowSide!==null?N.shadowSide:h[N.side],P.alphaMap=N.alphaMap,P.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,P.map=N.map,P.clipShadows=N.clipShadows,P.clippingPlanes=N.clippingPlanes,P.clipIntersection=N.clipIntersection,P.displacementMap=N.displacementMap,P.displacementScale=N.displacementScale,P.displacementBias=N.displacementBias,P.wireframeLinewidth=N.wireframeLinewidth,P.linewidth=N.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=n.properties.get(P);I.light=y}return P}function b(S,N,y,A,P){if(S.visible===!1)return;if(S.layers.test(N.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===ls)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,S.matrixWorld);const B=e.update(S),F=S.material;if(Array.isArray(F)){const H=B.groups;for(let K=0,$=H.length;K<$;K++){const ne=H[K],Q=F[ne.materialIndex];if(Q&&Q.visible){const ie=w(S,Q,A,P);S.onBeforeShadow(n,S,N,y,B,ie,ne),n.renderBufferDirect(y,null,B,ie,S,ne),S.onAfterShadow(n,S,N,y,B,ie,ne)}}}else if(F.visible){const H=w(S,F,A,P);S.onBeforeShadow(n,S,N,y,B,H,null),n.renderBufferDirect(y,null,B,H,S,null),S.onAfterShadow(n,S,N,y,B,H,null)}}const I=S.children;for(let B=0,F=I.length;B<F;B++)b(I[B],N,y,A,P)}function E(S){S.target.removeEventListener("dispose",E);for(const y in u){const A=u[y],P=S.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function aM(n,e){function t(){let W=!1;const _e=new ft;let ue=null;const xe=new ft(0,0,0,0);return{setMask:function(Ee){ue!==Ee&&!W&&(n.colorMask(Ee,Ee,Ee,Ee),ue=Ee)},setLocked:function(Ee){W=Ee},setClear:function(Ee,me,De,Pe,gt){gt===!0&&(Ee*=Pe,me*=Pe,De*=Pe),_e.set(Ee,me,De,Pe),xe.equals(_e)===!1&&(n.clearColor(Ee,me,De,Pe),xe.copy(_e))},reset:function(){W=!1,ue=null,xe.set(-1,0,0,0)}}}function i(){let W=!1,_e=!1,ue=null,xe=null,Ee=null;return{setReversed:function(me){if(_e!==me){const De=e.get("EXT_clip_control");me?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),_e=me;const Pe=Ee;Ee=null,this.setClear(Pe)}},getReversed:function(){return _e},setTest:function(me){me?Z(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(me){ue!==me&&!W&&(n.depthMask(me),ue=me)},setFunc:function(me){if(_e&&(me=Gm[me]),xe!==me){switch(me){case Xa:n.depthFunc(n.NEVER);break;case qa:n.depthFunc(n.ALWAYS);break;case Ya:n.depthFunc(n.LESS);break;case Hi:n.depthFunc(n.LEQUAL);break;case Ka:n.depthFunc(n.EQUAL);break;case Za:n.depthFunc(n.GEQUAL);break;case Ja:n.depthFunc(n.GREATER);break;case Qa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=me}},setLocked:function(me){W=me},setClear:function(me){Ee!==me&&(Ee=me,_e&&(me=1-me),n.clearDepth(me))},reset:function(){W=!1,ue=null,xe=null,Ee=null,_e=!1}}}function s(){let W=!1,_e=null,ue=null,xe=null,Ee=null,me=null,De=null,Pe=null,gt=null;return{setTest:function(ct){W||(ct?Z(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(ct){_e!==ct&&!W&&(n.stencilMask(ct),_e=ct)},setFunc:function(ct,sn,rn){(ue!==ct||xe!==sn||Ee!==rn)&&(n.stencilFunc(ct,sn,rn),ue=ct,xe=sn,Ee=rn)},setOp:function(ct,sn,rn){(me!==ct||De!==sn||Pe!==rn)&&(n.stencilOp(ct,sn,rn),me=ct,De=sn,Pe=rn)},setLocked:function(ct){W=ct},setClear:function(ct){gt!==ct&&(n.clearStencil(ct),gt=ct)},reset:function(){W=!1,_e=null,ue=null,xe=null,Ee=null,me=null,De=null,Pe=null,gt=null}}}const r=new t,o=new i,c=new s,l=new WeakMap,u=new WeakMap;let d={},h={},p={},m=new WeakMap,x=[],M=null,g=!1,f=null,v=null,w=null,b=null,E=null,S=null,N=null,y=new Xe(0,0,0),A=0,P=!1,R=null,I=null,B=null,F=null,H=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ne=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(Q)[1]),$=ne>=1):Q.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),$=ne>=2);let ie=null,pe={};const fe=n.getParameter(n.SCISSOR_BOX),Re=n.getParameter(n.VIEWPORT),ge=new ft().fromArray(fe),Ae=new ft().fromArray(Re);function ae(W,_e,ue,xe){const Ee=new Uint8Array(4),me=n.createTexture();n.bindTexture(W,me),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<ue;De++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(_e+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return me}const z={};z[n.TEXTURE_2D]=ae(n.TEXTURE_2D,n.TEXTURE_2D,1),z[n.TEXTURE_CUBE_MAP]=ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[n.TEXTURE_2D_ARRAY]=ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),z[n.TEXTURE_3D]=ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Z(n.DEPTH_TEST),o.setFunc(Hi),dt(!1),ht(Yc),Z(n.CULL_FACE),$e(Nn);function Z(W){d[W]!==!0&&(n.enable(W),d[W]=!0)}function Me(W){d[W]!==!1&&(n.disable(W),d[W]=!1)}function Ie(W,_e){return p[W]!==_e?(n.bindFramebuffer(W,_e),p[W]=_e,W===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=_e),W===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ne(W,_e){let ue=x,xe=!1;if(W){ue=m.get(_e),ue===void 0&&(ue=[],m.set(_e,ue));const Ee=W.textures;if(ue.length!==Ee.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let me=0,De=Ee.length;me<De;me++)ue[me]=n.COLOR_ATTACHMENT0+me;ue.length=Ee.length,xe=!0}}else ue[0]!==n.BACK&&(ue[0]=n.BACK,xe=!0);xe&&n.drawBuffers(ue)}function qe(W){return M!==W?(n.useProgram(W),M=W,!0):!1}const Ge={[ri]:n.FUNC_ADD,[dm]:n.FUNC_SUBTRACT,[um]:n.FUNC_REVERSE_SUBTRACT};Ge[hm]=n.MIN,Ge[fm]=n.MAX;const Je={[pm]:n.ZERO,[mm]:n.ONE,[gm]:n.SRC_COLOR,[Wa]:n.SRC_ALPHA,[bm]:n.SRC_ALPHA_SATURATE,[Mm]:n.DST_COLOR,[_m]:n.DST_ALPHA,[xm]:n.ONE_MINUS_SRC_COLOR,[$a]:n.ONE_MINUS_SRC_ALPHA,[ym]:n.ONE_MINUS_DST_COLOR,[vm]:n.ONE_MINUS_DST_ALPHA,[Sm]:n.CONSTANT_COLOR,[wm]:n.ONE_MINUS_CONSTANT_COLOR,[Em]:n.CONSTANT_ALPHA,[Tm]:n.ONE_MINUS_CONSTANT_ALPHA};function $e(W,_e,ue,xe,Ee,me,De,Pe,gt,ct){if(W===Nn){g===!0&&(Me(n.BLEND),g=!1);return}if(g===!1&&(Z(n.BLEND),g=!0),W!==lm){if(W!==f||ct!==P){if((v!==ri||E!==ri)&&(n.blendEquation(n.FUNC_ADD),v=ri,E=ri),ct)switch(W){case Oi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFunc(n.ONE,n.ONE);break;case Kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",W);break}else switch(W){case Oi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Kc:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zc:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",W);break}w=null,b=null,S=null,N=null,y.set(0,0,0),A=0,f=W,P=ct}return}Ee=Ee||_e,me=me||ue,De=De||xe,(_e!==v||Ee!==E)&&(n.blendEquationSeparate(Ge[_e],Ge[Ee]),v=_e,E=Ee),(ue!==w||xe!==b||me!==S||De!==N)&&(n.blendFuncSeparate(Je[ue],Je[xe],Je[me],Je[De]),w=ue,b=xe,S=me,N=De),(Pe.equals(y)===!1||gt!==A)&&(n.blendColor(Pe.r,Pe.g,Pe.b,gt),y.copy(Pe),A=gt),f=W,P=!1}function Ve(W,_e){W.side===En?Me(n.CULL_FACE):Z(n.CULL_FACE);let ue=W.side===jt;_e&&(ue=!ue),dt(ue),W.blending===Oi&&W.transparent===!1?$e(Nn):$e(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);const xe=W.stencilWrite;c.setTest(xe),xe&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Mt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(W){R!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),R=W)}function ht(W){W!==am?(Z(n.CULL_FACE),W!==I&&(W===Yc?n.cullFace(n.BACK):W===om?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),I=W}function mt(W){W!==B&&($&&n.lineWidth(W),B=W)}function Mt(W,_e,ue){W?(Z(n.POLYGON_OFFSET_FILL),(F!==_e||H!==ue)&&(F=_e,H=ue,o.getReversed()&&(_e=-_e),n.polygonOffset(_e,ue))):Me(n.POLYGON_OFFSET_FILL)}function ot(W){W?Z(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function q(W){W===void 0&&(W=n.TEXTURE0+K-1),ie!==W&&(n.activeTexture(W),ie=W)}function L(W,_e,ue){ue===void 0&&(ie===null?ue=n.TEXTURE0+K-1:ue=ie);let xe=pe[ue];xe===void 0&&(xe={type:void 0,texture:void 0},pe[ue]=xe),(xe.type!==W||xe.texture!==_e)&&(ie!==ue&&(n.activeTexture(ue),ie=ue),n.bindTexture(W,_e||z[W]),xe.type=W,xe.texture=_e)}function oe(){const W=pe[ie];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function ce(){try{n.compressedTexImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function _(){try{n.texSubImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function D(){try{n.texSubImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function U(){try{n.compressedTexSubImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function k(){try{n.compressedTexSubImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function Y(){try{n.texStorage2D(...arguments)}catch(W){et("WebGLState:",W)}}function j(){try{n.texStorage3D(...arguments)}catch(W){et("WebGLState:",W)}}function O(){try{n.texImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function V(){try{n.texImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function re(W){return h[W]!==void 0?h[W]:n.getParameter(W)}function he(W,_e){h[W]!==_e&&(n.pixelStorei(W,_e),h[W]=_e)}function de(W){ge.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),ge.copy(W))}function le(W){Ae.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),Ae.copy(W))}function ve(W,_e){let ue=u.get(_e);ue===void 0&&(ue=new WeakMap,u.set(_e,ue));let xe=ue.get(W);xe===void 0&&(xe=n.getUniformBlockIndex(_e,W.name),ue.set(W,xe))}function Se(W,_e){const xe=u.get(_e).get(W);l.get(_e)!==xe&&(n.uniformBlockBinding(_e,xe,W.__bindingPointIndex),l.set(_e,xe))}function Ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},ie=null,pe={},p={},m=new WeakMap,x=[],M=null,g=!1,f=null,v=null,w=null,b=null,E=null,S=null,N=null,y=new Xe(0,0,0),A=0,P=!1,R=null,I=null,B=null,F=null,H=null,ge.set(0,0,n.canvas.width,n.canvas.height),Ae.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:Z,disable:Me,bindFramebuffer:Ie,drawBuffers:Ne,useProgram:qe,setBlending:$e,setMaterial:Ve,setFlipSided:dt,setCullFace:ht,setLineWidth:mt,setPolygonOffset:Mt,setScissorTest:ot,activeTexture:q,bindTexture:L,unbindTexture:oe,compressedTexImage2D:ce,compressedTexImage3D:T,texImage2D:O,texImage3D:V,pixelStorei:he,getParameter:re,updateUBOMapping:ve,uniformBlockBinding:Se,texStorage2D:Y,texStorage3D:j,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:U,compressedTexSubImage3D:k,scissor:de,viewport:le,reset:Ue}}function oM(n,e,t,i,s,r,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ze,d=new WeakMap,h=new Set;let p;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(T,_){return x?new OffscreenCanvas(T,_):_r("canvas")}function g(T,_,D){let U=1;const k=ce(T);if((k.width>D||k.height>D)&&(U=D/Math.max(k.width,k.height)),U<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Y=Math.floor(U*k.width),j=Math.floor(U*k.height);p===void 0&&(p=M(Y,j));const O=_?M(Y,j):p;return O.width=Y,O.height=j,O.getContext("2d").drawImage(T,0,0,Y,j),Be("WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+Y+"x"+j+")."),O}else return"data"in T&&Be("WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),T;return T}function f(T){return T.generateMipmaps}function v(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,_,D,U,k,Y=!1){if(T!==null){if(n[T]!==void 0)return n[T];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j;U&&(j=e.get("EXT_texture_norm16"),j||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let O=_;if(_===n.RED&&(D===n.FLOAT&&(O=n.R32F),D===n.HALF_FLOAT&&(O=n.R16F),D===n.UNSIGNED_BYTE&&(O=n.R8),D===n.UNSIGNED_SHORT&&j&&(O=j.R16_EXT),D===n.SHORT&&j&&(O=j.R16_SNORM_EXT)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(O=n.R8UI),D===n.UNSIGNED_SHORT&&(O=n.R16UI),D===n.UNSIGNED_INT&&(O=n.R32UI),D===n.BYTE&&(O=n.R8I),D===n.SHORT&&(O=n.R16I),D===n.INT&&(O=n.R32I)),_===n.RG&&(D===n.FLOAT&&(O=n.RG32F),D===n.HALF_FLOAT&&(O=n.RG16F),D===n.UNSIGNED_BYTE&&(O=n.RG8),D===n.UNSIGNED_SHORT&&j&&(O=j.RG16_EXT),D===n.SHORT&&j&&(O=j.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(O=n.RG8UI),D===n.UNSIGNED_SHORT&&(O=n.RG16UI),D===n.UNSIGNED_INT&&(O=n.RG32UI),D===n.BYTE&&(O=n.RG8I),D===n.SHORT&&(O=n.RG16I),D===n.INT&&(O=n.RG32I)),_===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(O=n.RGB8UI),D===n.UNSIGNED_SHORT&&(O=n.RGB16UI),D===n.UNSIGNED_INT&&(O=n.RGB32UI),D===n.BYTE&&(O=n.RGB8I),D===n.SHORT&&(O=n.RGB16I),D===n.INT&&(O=n.RGB32I)),_===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(O=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(O=n.RGBA16UI),D===n.UNSIGNED_INT&&(O=n.RGBA32UI),D===n.BYTE&&(O=n.RGBA8I),D===n.SHORT&&(O=n.RGBA16I),D===n.INT&&(O=n.RGBA32I)),_===n.RGB&&(D===n.UNSIGNED_SHORT&&j&&(O=j.RGB16_EXT),D===n.SHORT&&j&&(O=j.RGB16_SNORM_EXT),D===n.UNSIGNED_INT_5_9_9_9_REV&&(O=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(O=n.R11F_G11F_B10F)),_===n.RGBA){const V=Y?xr:Ye.getTransfer(k);D===n.FLOAT&&(O=n.RGBA32F),D===n.HALF_FLOAT&&(O=n.RGBA16F),D===n.UNSIGNED_BYTE&&(O=V===it?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT&&j&&(O=j.RGBA16_EXT),D===n.SHORT&&j&&(O=j.RGBA16_SNORM_EXT),D===n.UNSIGNED_SHORT_4_4_4_4&&(O=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(O=n.RGB5_A1)}return(O===n.R16F||O===n.R32F||O===n.RG16F||O===n.RG32F||O===n.RGBA16F||O===n.RGBA32F)&&e.get("EXT_color_buffer_float"),O}function E(T,_){let D;return T?_===null||_===xn||_===ps?D=n.DEPTH24_STENCIL8:_===hn?D=n.DEPTH32F_STENCIL8:_===fs&&(D=n.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===xn||_===ps?D=n.DEPTH_COMPONENT24:_===hn?D=n.DEPTH_COMPONENT32F:_===fs&&(D=n.DEPTH_COMPONENT16),D}function S(T,_){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==Nt&&T.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function N(T){const _=T.target;_.removeEventListener("dispose",N),A(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function y(T){const _=T.target;_.removeEventListener("dispose",y),R(_)}function A(T){const _=i.get(T);if(_.__webglInit===void 0)return;const D=T.source,U=m.get(D);if(U){const k=U[_.__cacheKey];k.usedTimes--,k.usedTimes===0&&P(T),Object.keys(U).length===0&&m.delete(D)}i.remove(T)}function P(T){const _=i.get(T);n.deleteTexture(_.__webglTexture);const D=T.source,U=m.get(D);delete U[_.__cacheKey],o.memory.textures--}function R(T){const _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(_.__webglFramebuffer[U]))for(let k=0;k<_.__webglFramebuffer[U].length;k++)n.deleteFramebuffer(_.__webglFramebuffer[U][k]);else n.deleteFramebuffer(_.__webglFramebuffer[U]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[U])}else{if(Array.isArray(_.__webglFramebuffer))for(let U=0;U<_.__webglFramebuffer.length;U++)n.deleteFramebuffer(_.__webglFramebuffer[U]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let U=0;U<_.__webglColorRenderbuffer.length;U++)_.__webglColorRenderbuffer[U]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[U]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=T.textures;for(let U=0,k=D.length;U<k;U++){const Y=i.get(D[U]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(D[U])}i.remove(T)}let I=0;function B(){I=0}function F(){return I}function H(T){I=T}function K(){const T=I;return T>=s.maxTextures&&Be("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function $(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function ne(T,_){const D=i.get(T);if(T.isVideoTexture&&L(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&D.__version!==T.version){const U=T.image;if(U===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(D,T,_);return}}else T.isExternalTexture&&(D.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function Q(T,_){const D=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&D.__version!==T.version){Me(D,T,_);return}else T.isExternalTexture&&(D.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function ie(T,_){const D=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&D.__version!==T.version){Me(D,T,_);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function pe(T,_){const D=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&D.__version!==T.version){Ie(D,T,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}const fe={[eo]:n.REPEAT,[An]:n.CLAMP_TO_EDGE,[to]:n.MIRRORED_REPEAT},Re={[Nt]:n.NEAREST,[Rm]:n.NEAREST_MIPMAP_NEAREST,[As]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[qr]:n.LINEAR_MIPMAP_NEAREST,[li]:n.LINEAR_MIPMAP_LINEAR},ge={[Lm]:n.NEVER,[Om]:n.ALWAYS,[Im]:n.LESS,[tc]:n.LEQUAL,[Dm]:n.EQUAL,[nc]:n.GEQUAL,[Um]:n.GREATER,[Fm]:n.NOTEQUAL};function Ae(T,_){if(_.type===hn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===qr||_.magFilter===As||_.magFilter===li||_.minFilter===Dt||_.minFilter===qr||_.minFilter===As||_.minFilter===li)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,fe[_.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,fe[_.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,fe[_.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Re[_.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Re[_.minFilter]),_.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Nt||_.minFilter!==As&&_.minFilter!==li||_.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function ae(T,_){let D=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",N));const U=_.source;let k=m.get(U);k===void 0&&(k={},m.set(U,k));const Y=$(_);if(Y!==T.__cacheKey){k[Y]===void 0&&(k[Y]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,D=!0),k[Y].usedTimes++;const j=k[T.__cacheKey];j!==void 0&&(k[T.__cacheKey].usedTimes--,j.usedTimes===0&&P(_)),T.__cacheKey=Y,T.__webglTexture=k[Y].texture}return D}function z(T,_,D){return Math.floor(Math.floor(T/D)/_)}function Z(T,_,D,U){const Y=T.updateRanges;if(Y.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,D,U,_.data);else{Y.sort((he,de)=>he.start-de.start);let j=0;for(let he=1;he<Y.length;he++){const de=Y[j],le=Y[he],ve=de.start+de.count,Se=z(le.start,_.width,4),Ue=z(de.start,_.width,4);le.start<=ve+1&&Se===Ue&&z(le.start+le.count-1,_.width,4)===Se?de.count=Math.max(de.count,le.start+le.count-de.start):(++j,Y[j]=le)}Y.length=j+1;const O=t.getParameter(n.UNPACK_ROW_LENGTH),V=t.getParameter(n.UNPACK_SKIP_PIXELS),re=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let he=0,de=Y.length;he<de;he++){const le=Y[he],ve=Math.floor(le.start/4),Se=Math.ceil(le.count/4),Ue=ve%_.width,W=Math.floor(ve/_.width),_e=Se,ue=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,Ue,W,_e,ue,D,U,_.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,O),t.pixelStorei(n.UNPACK_SKIP_PIXELS,V),t.pixelStorei(n.UNPACK_SKIP_ROWS,re)}}function Me(T,_,D){let U=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(U=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(U=n.TEXTURE_3D);const k=ae(T,_),Y=_.source;t.bindTexture(U,T.__webglTexture,n.TEXTURE0+D);const j=i.get(Y);if(Y.version!==j.__version||k===!0){if(t.activeTexture(n.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ue=Ye.getPrimaries(Ye.workingColorSpace),xe=_.colorSpace===Wn?null:Ye.getPrimaries(_.colorSpace),Ee=_.colorSpace===Wn||ue===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let V=g(_.image,!1,s.maxTextureSize);V=oe(_,V);const re=r.convert(_.format,_.colorSpace),he=r.convert(_.type);let de=b(_.internalFormat,re,he,_.normalized,_.colorSpace,_.isVideoTexture);Ae(U,_);let le;const ve=_.mipmaps,Se=_.isVideoTexture!==!0,Ue=j.__version===void 0||k===!0,W=Y.dataReady,_e=S(_,V);if(_.isDepthTexture)de=E(_.format===di,_.type),Ue&&(Se?t.texStorage2D(n.TEXTURE_2D,1,de,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,de,V.width,V.height,0,re,he,null));else if(_.isDataTexture)if(ve.length>0){Se&&Ue&&t.texStorage2D(n.TEXTURE_2D,_e,de,ve[0].width,ve[0].height);for(let ue=0,xe=ve.length;ue<xe;ue++)le=ve[ue],Se?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,le.width,le.height,re,he,le.data):t.texImage2D(n.TEXTURE_2D,ue,de,le.width,le.height,0,re,he,le.data);_.generateMipmaps=!1}else Se?(Ue&&t.texStorage2D(n.TEXTURE_2D,_e,de,V.width,V.height),W&&Z(_,V,re,he)):t.texImage2D(n.TEXTURE_2D,0,de,V.width,V.height,0,re,he,V.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Se&&Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,de,ve[0].width,ve[0].height,V.depth);for(let ue=0,xe=ve.length;ue<xe;ue++)if(le=ve[ue],_.format!==nn)if(re!==null)if(Se){if(W)if(_.layerUpdates.size>0){const Ee=El(le.width,le.height,_.format,_.type);for(const me of _.layerUpdates){const De=le.data.subarray(me*Ee/le.data.BYTES_PER_ELEMENT,(me+1)*Ee/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,me,le.width,le.height,1,re,De)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,le.width,le.height,V.depth,re,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,de,le.width,le.height,V.depth,0,le.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,le.width,le.height,V.depth,re,he,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,de,le.width,le.height,V.depth,0,re,he,le.data)}else{Se&&Ue&&t.texStorage2D(n.TEXTURE_2D,_e,de,ve[0].width,ve[0].height);for(let ue=0,xe=ve.length;ue<xe;ue++)le=ve[ue],_.format!==nn?re!==null?Se?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,le.width,le.height,re,le.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,de,le.width,le.height,0,le.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,le.width,le.height,re,he,le.data):t.texImage2D(n.TEXTURE_2D,ue,de,le.width,le.height,0,re,he,le.data)}else if(_.isDataArrayTexture)if(Se){if(Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,de,V.width,V.height,V.depth),W)if(_.layerUpdates.size>0){const ue=El(V.width,V.height,_.format,_.type);for(const xe of _.layerUpdates){const Ee=V.data.subarray(xe*ue/V.data.BYTES_PER_ELEMENT,(xe+1)*ue/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,V.width,V.height,1,re,he,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,re,he,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,de,V.width,V.height,V.depth,0,re,he,V.data);else if(_.isData3DTexture)Se?(Ue&&t.texStorage3D(n.TEXTURE_3D,_e,de,V.width,V.height,V.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,re,he,V.data)):t.texImage3D(n.TEXTURE_3D,0,de,V.width,V.height,V.depth,0,re,he,V.data);else if(_.isFramebufferTexture){if(Ue)if(Se)t.texStorage2D(n.TEXTURE_2D,_e,de,V.width,V.height);else{let ue=V.width,xe=V.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,de,ue,xe,0,re,he,null),ue>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ue=n.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),V.parentNode!==ue){ue.appendChild(V),h.add(_),ue.onpaint=xe=>{const Ee=xe.changedElements;for(const me of h)Ee.includes(me.image)&&(me.needsUpdate=!0)},ue.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,V);else{const Ee=n.RGBA,me=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,me,De,V)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Se&&Ue){const ue=ce(ve[0]);t.texStorage2D(n.TEXTURE_2D,_e,de,ue.width,ue.height)}for(let ue=0,xe=ve.length;ue<xe;ue++)le=ve[ue],Se?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,re,he,le):t.texImage2D(n.TEXTURE_2D,ue,de,re,he,le);_.generateMipmaps=!1}else if(Se){if(Ue){const ue=ce(V);t.texStorage2D(n.TEXTURE_2D,_e,de,ue.width,ue.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,re,he,V)}else t.texImage2D(n.TEXTURE_2D,0,de,re,he,V);f(_)&&v(U),j.__version=Y.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ie(T,_,D){if(_.image.length!==6)return;const U=ae(T,_),k=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+D);const Y=i.get(k);if(k.version!==Y.__version||U===!0){t.activeTexture(n.TEXTURE0+D);const j=Ye.getPrimaries(Ye.workingColorSpace),O=_.colorSpace===Wn?null:Ye.getPrimaries(_.colorSpace),V=_.colorSpace===Wn||j===O?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const re=_.isCompressedTexture||_.image[0].isCompressedTexture,he=_.image[0]&&_.image[0].isDataTexture,de=[];for(let me=0;me<6;me++)!re&&!he?de[me]=g(_.image[me],!0,s.maxCubemapSize):de[me]=he?_.image[me].image:_.image[me],de[me]=oe(_,de[me]);const le=de[0],ve=r.convert(_.format,_.colorSpace),Se=r.convert(_.type),Ue=b(_.internalFormat,ve,Se,_.normalized,_.colorSpace),W=_.isVideoTexture!==!0,_e=Y.__version===void 0||U===!0,ue=k.dataReady;let xe=S(_,le);Ae(n.TEXTURE_CUBE_MAP,_);let Ee;if(re){W&&_e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ue,le.width,le.height);for(let me=0;me<6;me++){Ee=de[me].mipmaps;for(let De=0;De<Ee.length;De++){const Pe=Ee[De];_.format!==nn?ve!==null?W?ue&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,0,0,Pe.width,Pe.height,ve,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,Ue,Pe.width,Pe.height,0,Pe.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,0,0,Pe.width,Pe.height,ve,Se,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,Ue,Pe.width,Pe.height,0,ve,Se,Pe.data)}}}else{if(Ee=_.mipmaps,W&&_e){Ee.length>0&&xe++;const me=ce(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ue,me.width,me.height)}for(let me=0;me<6;me++)if(he){W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,de[me].width,de[me].height,ve,Se,de[me].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,Ue,de[me].width,de[me].height,0,ve,Se,de[me].data);for(let De=0;De<Ee.length;De++){const gt=Ee[De].image[me].image;W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,0,0,gt.width,gt.height,ve,Se,gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,Ue,gt.width,gt.height,0,ve,Se,gt.data)}}else{W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,ve,Se,de[me]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,Ue,ve,Se,de[me]);for(let De=0;De<Ee.length;De++){const Pe=Ee[De];W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,0,0,ve,Se,Pe.image[me]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,Ue,ve,Se,Pe.image[me])}}}f(_)&&v(n.TEXTURE_CUBE_MAP),Y.__version=k.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ne(T,_,D,U,k,Y){const j=r.convert(D.format,D.colorSpace),O=r.convert(D.type),V=b(D.internalFormat,j,O,D.normalized,D.colorSpace),re=i.get(_),he=i.get(D);if(he.__renderTarget=_,!re.__hasExternalTextures){const de=Math.max(1,_.width>>Y),le=Math.max(1,_.height>>Y);k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?t.texImage3D(k,Y,V,de,le,_.depth,0,j,O,null):t.texImage2D(k,Y,V,de,le,0,j,O,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),q(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,U,k,he.__webglTexture,0,ot(_)):(k===n.TEXTURE_2D||k>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,U,k,he.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(T,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,T),_.depthBuffer){const U=_.depthTexture,k=U&&U.isDepthTexture?U.type:null,Y=E(_.stencilBuffer,k),j=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;q(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),Y,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),Y,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Y,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,T)}else{const U=_.textures;for(let k=0;k<U.length;k++){const Y=U[k],j=r.convert(Y.format,Y.colorSpace),O=r.convert(Y.type),V=b(Y.internalFormat,j,O,Y.normalized,Y.colorSpace);q(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),V,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),V,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,V,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ge(T,_,D){const U=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const k=i.get(_.depthTexture);if(k.__renderTarget=_,(!k.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),U){if(k.__webglInit===void 0&&(k.__webglInit=!0,_.depthTexture.addEventListener("dispose",N)),k.__webglTexture===void 0){k.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,_.depthTexture);const re=r.convert(_.depthTexture.format),he=r.convert(_.depthTexture.type);let de;_.depthTexture.format===Dn?de=n.DEPTH_COMPONENT24:_.depthTexture.format===di&&(de=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,de,_.width,_.height,0,re,he,null)}}else ne(_.depthTexture,0);const Y=k.__webglTexture,j=ot(_),O=U?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,V=_.depthTexture.format===di?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Dn)q(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,O,Y,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,V,O,Y,0);else if(_.depthTexture.format===di)q(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,O,Y,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,V,O,Y,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(T){const _=i.get(T),D=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const U=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),U){const k=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,U.removeEventListener("dispose",k)};U.addEventListener("dispose",k),_.__depthDisposeCallback=k}_.__boundDepthTexture=U}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let U=0;U<6;U++)Ge(_.__webglFramebuffer[U],T,U);else{const U=T.texture.mipmaps;U&&U.length>0?Ge(_.__webglFramebuffer[0],T,0):Ge(_.__webglFramebuffer,T,0)}else if(D){_.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[U]),_.__webglDepthbuffer[U]===void 0)_.__webglDepthbuffer[U]=n.createRenderbuffer(),qe(_.__webglDepthbuffer[U],T,!1);else{const k=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[U];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,Y)}}else{const U=T.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),qe(_.__webglDepthbuffer,T,!1);else{const k=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,Y)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(T,_,D){const U=i.get(T);_!==void 0&&Ne(U.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Je(T)}function Ve(T){const _=T.texture,D=i.get(T),U=i.get(_);T.addEventListener("dispose",y);const k=T.textures,Y=T.isWebGLCubeRenderTarget===!0,j=k.length>1;if(j||(U.__webglTexture===void 0&&(U.__webglTexture=n.createTexture()),U.__version=_.version,o.memory.textures++),Y){D.__webglFramebuffer=[];for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[O]=[];for(let V=0;V<_.mipmaps.length;V++)D.__webglFramebuffer[O][V]=n.createFramebuffer()}else D.__webglFramebuffer[O]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let O=0;O<_.mipmaps.length;O++)D.__webglFramebuffer[O]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(j)for(let O=0,V=k.length;O<V;O++){const re=i.get(k[O]);re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&q(T)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let O=0;O<k.length;O++){const V=k[O];D.__webglColorRenderbuffer[O]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[O]);const re=r.convert(V.format,V.colorSpace),he=r.convert(V.type),de=b(V.internalFormat,re,he,V.normalized,V.colorSpace,T.isXRRenderTarget===!0),le=ot(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,de,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+O,n.RENDERBUFFER,D.__webglColorRenderbuffer[O])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),qe(D.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,_);for(let O=0;O<6;O++)if(_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ne(D.__webglFramebuffer[O][V],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+O,V);else Ne(D.__webglFramebuffer[O],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+O,0);f(_)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(j){for(let O=0,V=k.length;O<V;O++){const re=k[O],he=i.get(re);let de=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(de=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,he.__webglTexture),Ae(de,re),Ne(D.__webglFramebuffer,T,re,n.COLOR_ATTACHMENT0+O,de,0),f(re)&&v(de)}t.unbindTexture()}else{let O=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(O=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(O,U.__webglTexture),Ae(O,_),_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ne(D.__webglFramebuffer[V],T,_,n.COLOR_ATTACHMENT0,O,V);else Ne(D.__webglFramebuffer,T,_,n.COLOR_ATTACHMENT0,O,0);f(_)&&v(O),t.unbindTexture()}T.depthBuffer&&Je(T)}function dt(T){const _=T.textures;for(let D=0,U=_.length;D<U;D++){const k=_[D];if(f(k)){const Y=w(T),j=i.get(k).__webglTexture;t.bindTexture(Y,j),v(Y),t.unbindTexture()}}}const ht=[],mt=[];function Mt(T){if(T.samples>0){if(q(T)===!1){const _=T.textures,D=T.width,U=T.height;let k=n.COLOR_BUFFER_BIT;const Y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=i.get(T),O=_.length>1;if(O)for(let re=0;re<_.length;re++)t.bindFramebuffer(n.FRAMEBUFFER,j.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,j.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,j.__webglMultisampledFramebuffer);const V=T.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,j.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,j.__webglFramebuffer);for(let re=0;re<_.length;re++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(k|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(k|=n.STENCIL_BUFFER_BIT)),O){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,j.__webglColorRenderbuffer[re]);const he=i.get(_[re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,he,0)}n.blitFramebuffer(0,0,D,U,0,0,D,U,k,n.NEAREST),l===!0&&(ht.length=0,mt.length=0,ht.push(n.COLOR_ATTACHMENT0+re),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ht.push(Y),mt.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,mt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),O)for(let re=0;re<_.length;re++){t.bindFramebuffer(n.FRAMEBUFFER,j.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,j.__webglColorRenderbuffer[re]);const he=i.get(_[re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,j.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.TEXTURE_2D,he,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,j.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ot(T){return Math.min(s.maxSamples,T.samples)}function q(T){const _=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(T){const _=o.render.frame;d.get(T)!==_&&(d.set(T,_),T.update())}function oe(T,_){const D=T.colorSpace,U=T.format,k=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||D!==gr&&D!==Wn&&(Ye.getTransfer(D)===it?(U!==nn||k!==$t)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",D)),_}function ce(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(u.width=T.naturalWidth||T.width,u.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(u.width=T.displayWidth,u.height=T.displayHeight):(u.width=T.width,u.height=T.height),u}this.allocateTextureUnit=K,this.resetTextureUnits=B,this.getTextureUnits=F,this.setTextureUnits=H,this.setTexture2D=ne,this.setTexture2DArray=Q,this.setTexture3D=ie,this.setTextureCube=pe,this.rebindTextures=$e,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function cM(n,e){function t(i,s=Wn){let r;const o=Ye.getTransfer(s);if(i===$t)return n.UNSIGNED_BYTE;if(i===Ko)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===nu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===iu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===eu)return n.BYTE;if(i===tu)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===Yo)return n.INT;if(i===xn)return n.UNSIGNED_INT;if(i===hn)return n.FLOAT;if(i===In)return n.HALF_FLOAT;if(i===su)return n.ALPHA;if(i===ru)return n.RGB;if(i===nn)return n.RGBA;if(i===Dn)return n.DEPTH_COMPONENT;if(i===di)return n.DEPTH_STENCIL;if(i===au)return n.RED;if(i===Jo)return n.RED_INTEGER;if(i===gi)return n.RG;if(i===Qo)return n.RG_INTEGER;if(i===ec)return n.RGBA_INTEGER;if(i===rr||i===ar||i===or||i===cr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===no||i===io||i===so||i===ro)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===no)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===so)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ao||i===oo||i===co||i===lo||i===uo||i===pr||i===ho)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ao||i===oo)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===co)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===lo)return r.COMPRESSED_R11_EAC;if(i===uo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===pr)return r.COMPRESSED_RG11_EAC;if(i===ho)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fo||i===po||i===mo||i===go||i===xo||i===_o||i===vo||i===Mo||i===yo||i===bo||i===So||i===wo||i===Eo||i===To)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===po)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===go)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_o)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===So)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===To)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ao||i===Co||i===Ro)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ao)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===No||i===Po||i===mr||i===Lo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===No)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Po)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===mr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ps?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const lM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dM=`
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

}`;class uM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new _n({vertexShader:lM,fragmentShader:dM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new Ki(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hM extends _i{constructor(e,t){super();const i=this;let s=null,r=1,o=null,c="local-floor",l=1,u=null,d=null,h=null,p=null,m=null,x=null;const M=typeof XRWebGLBinding<"u",g=new uM,f={},v=t.getContextAttributes();let w=null,b=null;const E=[],S=[],N=new Ze;let y=null;const A=new Gt;A.viewport=new ft;const P=new Gt;P.viewport=new ft;const R=[A,P],I=new b0;let B=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let z=E[ae];return z===void 0&&(z=new na,E[ae]=z),z.getTargetRaySpace()},this.getControllerGrip=function(ae){let z=E[ae];return z===void 0&&(z=new na,E[ae]=z),z.getGripSpace()},this.getHand=function(ae){let z=E[ae];return z===void 0&&(z=new na,E[ae]=z),z.getHandSpace()};function H(ae){const z=S.indexOf(ae.inputSource);if(z===-1)return;const Z=E[z];Z!==void 0&&(Z.update(ae.inputSource,ae.frame,u||o),Z.dispatchEvent({type:ae.type,data:ae.inputSource}))}function K(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",$);for(let ae=0;ae<E.length;ae++){const z=S[ae];z!==null&&(S[ae]=null,E[ae].disconnect(z))}B=null,F=null,g.reset();for(const ae in f)delete f[ae];e.setRenderTarget(w),m=null,p=null,h=null,s=null,b=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){c=ae,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(ae){u=ae},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return h===null&&M&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",K),s.addEventListener("inputsourceschange",$),v.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(N),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,Me=null,Ie=null;v.depth&&(Ie=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=v.stencil?di:Dn,Me=v.stencil?ps:xn);const Ne={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};h=this.getBinding(),p=h.createProjectionLayer(Ne),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),b=new mn(p.textureWidth,p.textureHeight,{format:nn,type:$t,depthTexture:new Wi(p.textureWidth,p.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const Z={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new mn(m.framebufferWidth,m.framebufferHeight,{format:nn,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await s.requestReferenceSpace(c),Ae.setContext(s),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(ae){for(let z=0;z<ae.removed.length;z++){const Z=ae.removed[z],Me=S.indexOf(Z);Me>=0&&(S[Me]=null,E[Me].disconnect(Z))}for(let z=0;z<ae.added.length;z++){const Z=ae.added[z];let Me=S.indexOf(Z);if(Me===-1){for(let Ne=0;Ne<E.length;Ne++)if(Ne>=S.length){S.push(Z),Me=Ne;break}else if(S[Ne]===null){S[Ne]=Z,Me=Ne;break}if(Me===-1)break}const Ie=E[Me];Ie&&Ie.connect(Z)}}const ne=new J,Q=new J;function ie(ae,z,Z){ne.setFromMatrixPosition(z.matrixWorld),Q.setFromMatrixPosition(Z.matrixWorld);const Me=ne.distanceTo(Q),Ie=z.projectionMatrix.elements,Ne=Z.projectionMatrix.elements,qe=Ie[14]/(Ie[10]-1),Ge=Ie[14]/(Ie[10]+1),Je=(Ie[9]+1)/Ie[5],$e=(Ie[9]-1)/Ie[5],Ve=(Ie[8]-1)/Ie[0],dt=(Ne[8]+1)/Ne[0],ht=qe*Ve,mt=qe*dt,Mt=Me/(-Ve+dt),ot=Mt*-Ve;if(z.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(ot),ae.translateZ(Mt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Ie[10]===-1)ae.projectionMatrix.copy(z.projectionMatrix),ae.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{const q=qe+Mt,L=Ge+Mt,oe=ht-ot,ce=mt+(Me-ot),T=Je*Ge/L*q,_=$e*Ge/L*q;ae.projectionMatrix.makePerspective(oe,ce,T,_,q,L),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function pe(ae,z){z===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(z.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let z=ae.near,Z=ae.far;g.texture!==null&&(g.depthNear>0&&(z=g.depthNear),g.depthFar>0&&(Z=g.depthFar)),I.near=P.near=A.near=z,I.far=P.far=A.far=Z,(B!==I.near||F!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),B=I.near,F=I.far),I.layers.mask=ae.layers.mask|6,A.layers.mask=I.layers.mask&-5,P.layers.mask=I.layers.mask&-3;const Me=ae.parent,Ie=I.cameras;pe(I,Me);for(let Ne=0;Ne<Ie.length;Ne++)pe(Ie[Ne],Me);Ie.length===2?ie(I,A,P):I.projectionMatrix.copy(A.projectionMatrix),fe(ae,I,Me)};function fe(ae,z,Z){Z===null?ae.matrix.copy(z.matrixWorld):(ae.matrix.copy(Z.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(z.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(z.projectionMatrix),ae.projectionMatrixInverse.copy(z.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Do*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(ae){l=ae,p!==null&&(p.fixedFoveation=ae),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ae)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(ae){return f[ae]};let Re=null;function ge(ae,z){if(d=z.getViewerPose(u||o),x=z,d!==null){const Z=d.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let Me=!1;Z.length!==I.cameras.length&&(I.cameras.length=0,Me=!0);for(let Ge=0;Ge<Z.length;Ge++){const Je=Z[Ge];let $e=null;if(m!==null)$e=m.getViewport(Je);else{const dt=h.getViewSubImage(p,Je);$e=dt.viewport,Ge===0&&(e.setRenderTargetTextures(b,dt.colorTexture,dt.depthStencilTexture),e.setRenderTarget(b))}let Ve=R[Ge];Ve===void 0&&(Ve=new Gt,Ve.layers.enable(Ge),Ve.viewport=new ft,R[Ge]=Ve),Ve.matrix.fromArray(Je.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Je.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set($e.x,$e.y,$e.width,$e.height),Ge===0&&(I.matrix.copy(Ve.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Me===!0&&I.cameras.push(Ve)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){h=i.getBinding();const Ge=h.getDepthInformation(Z[0]);Ge&&Ge.isValid&&Ge.texture&&g.init(Ge,s.renderState)}if(Ie&&Ie.includes("camera-access")&&M){e.state.unbindTexture(),h=i.getBinding();for(let Ge=0;Ge<Z.length;Ge++){const Je=Z[Ge].camera;if(Je){let $e=f[Je];$e||($e=new xu,f[Je]=$e);const Ve=h.getCameraImage(Je);$e.sourceTexture=Ve}}}}for(let Z=0;Z<E.length;Z++){const Me=S[Z],Ie=E[Z];Me!==null&&Ie!==void 0&&Ie.update(Me,z,u||o)}Re&&Re(ae,z),z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:z}),x=null}const Ae=new Su;Ae.setAnimationLoop(ge),this.setAnimationLoop=function(ae){Re=ae},this.dispose=function(){}}}const fM=new pt,Nu=new ke;Nu.set(-1,0,0,0,1,0,0,0,1);function pM(n,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,_u(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,v,w,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),h(g,f)):f.isMeshPhongMaterial?(r(g,f),d(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),p(g,f),f.isMeshPhysicalMaterial&&m(g,f,b)):f.isMeshMatcapMaterial?(r(g,f),x(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),M(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(o(g,f),f.isLineDashedMaterial&&c(g,f)):f.isPointsMaterial?l(g,f,v,w):f.isSpriteMaterial?u(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===jt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===jt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const v=e.get(f),w=v.envMap,b=v.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(fM.makeRotationFromEuler(b)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Nu),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function o(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function c(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,v,w){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*v,g.scale.value=w*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function d(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function p(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function m(g,f,v){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,f){f.matcap&&(g.matcap.value=f.matcap)}function M(g,f){const v=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function mM(n,e,t,i){let s={},r={},o=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const S=E.program;i.uniformBlockBinding(b,S)}function u(b,E){let S=s[b.id];S===void 0&&(g(b),S=d(b),s[b.id]=S,b.addEventListener("dispose",v));const N=E.program;i.updateUBOMapping(b,N);const y=e.render.frame;r[b.id]!==y&&(p(b),r[b.id]=y)}function d(b){const E=h();b.__bindingPointIndex=E;const S=n.createBuffer(),N=b.__size,y=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,N,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function h(){for(let b=0;b<c;b++)if(o.indexOf(b)===-1)return o.push(b),b;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const E=s[b.id],S=b.uniforms,N=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let y=0,A=S.length;y<A;y++){const P=S[y];if(Array.isArray(P))for(let R=0,I=P.length;R<I;R++)m(P[R],y,R,N);else m(P,y,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(b,E,S,N){if(M(b,E,S,N)===!0){const y=b.__offset,A=b.value;if(Array.isArray(A)){let P=0;for(let R=0;R<A.length;R++){const I=A[R],B=f(I);x(I,b.__data,P),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(P+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,b.__data)}}function x(b,E,S){typeof b=="number"||typeof b=="boolean"?E[0]=b:b.isMatrix3?(E[0]=b.elements[0],E[1]=b.elements[1],E[2]=b.elements[2],E[3]=0,E[4]=b.elements[3],E[5]=b.elements[4],E[6]=b.elements[5],E[7]=0,E[8]=b.elements[6],E[9]=b.elements[7],E[10]=b.elements[8],E[11]=0):ArrayBuffer.isView(b)?E.set(new b.constructor(b.buffer,b.byteOffset,E.length)):b.toArray(E,S)}function M(b,E,S,N){const y=b.value,A=E+"_"+S;if(N[A]===void 0)return typeof y=="number"||typeof y=="boolean"?N[A]=y:ArrayBuffer.isView(y)?N[A]=y.slice():N[A]=y.clone(),!0;{const P=N[A];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return N[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(P.equals(y)===!1)return P.copy(y),!0}}return!1}function g(b){const E=b.uniforms;let S=0;const N=16;for(let A=0,P=E.length;A<P;A++){const R=Array.isArray(E[A])?E[A]:[E[A]];for(let I=0,B=R.length;I<B;I++){const F=R[I],H=Array.isArray(F.value)?F.value:[F.value];for(let K=0,$=H.length;K<$;K++){const ne=H[K],Q=f(ne),ie=S%N,pe=ie%Q.boundary,fe=ie+pe;S+=pe,fe!==0&&N-fe<Q.storage&&(S+=N-fe),F.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=Q.storage}}}const y=S%N;return y>0&&(S+=N-y),b.__size=S,b.__cache={},this}function f(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(E.boundary=16,E.storage=b.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",b),E}function v(b){const E=b.target;E.removeEventListener("dispose",v);const S=o.indexOf(E.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function w(){for(const b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:u,dispose:w}}const gM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function xM(){return ln===null&&(ln=new o0(gM,16,16,gi,In),ln.name="DFG_LUT",ln.minFilter=Dt,ln.magFilter=Dt,ln.wrapS=An,ln.wrapT=An,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class Pu{constructor(e={}){const{canvas:t=km(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:p=!1,outputBufferType:m=$t}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;const M=m,g=new Set([ec,Qo,Jo]),f=new Set([$t,xn,fs,ps,Ko,Zo]),v=new Uint32Array(4),w=new Int32Array(4),b=new J;let E=null,S=null;const N=[],y=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,I=null,B=null,F=null,H=null;this._outputColorSpace=Yt;let K=0,$=0,ne=null,Q=-1,ie=null;const pe=new ft,fe=new ft;let Re=null;const ge=new Xe(0);let Ae=0,ae=t.width,z=t.height,Z=1,Me=null,Ie=null;const Ne=new ft(0,0,ae,z),qe=new ft(0,0,ae,z);let Ge=!1;const Je=new sc;let $e=!1,Ve=!1;const dt=new pt,ht=new J,mt=new ft,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function q(){return ne===null?Z:1}let L=i;function oe(C,X){return t.getContext(C,X)}try{const C={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",sn,!1),L===null){const X="webgl2";if(L=oe(X,C),L===null)throw oe(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw et("WebGLRenderer: "+C.message),C}let ce,T,_,D,U,k,Y,j,O,V,re,he,de,le,ve,Se,Ue,W,_e,ue,xe,Ee,me;function De(){ce=new x_(L),ce.init(),xe=new cM(L,ce),T=new l_(L,ce,e,xe),_=new aM(L,ce),T.reversedDepthBuffer&&p&&_.buffers.depth.setReversed(!0),B=L.createFramebuffer(),F=L.createFramebuffer(),H=L.createFramebuffer(),D=new M_(L),U=new $v,k=new oM(L,ce,_,U,T,xe,D),Y=new g_(P),j=new w0(L),Ee=new o_(L,j),O=new __(L,j,D,Ee),V=new b_(L,O,j,Ee,D),W=new y_(L,T,k),ve=new d_(U),re=new Wv(P,Y,ce,T,Ee,ve),he=new pM(P,U),de=new qv,le=new eM(ce),Ue=new a_(P,Y,_,V,x,l),Se=new rM(P,V,T),me=new mM(L,D,T,_),_e=new c_(L,ce,D),ue=new v_(L,ce,D),D.programs=re.programs,P.capabilities=T,P.extensions=ce,P.properties=U,P.renderLists=de,P.shadowMap=Se,P.state=_,P.info=D}De(),M!==$t&&(A=new w_(M,t.width,t.height,c,s,r));const Pe=new hM(P,L);this.xr=Pe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const C=ce.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ce.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(C){C!==void 0&&(Z=C,this.setSize(ae,z,!1))},this.getSize=function(C){return C.set(ae,z)},this.setSize=function(C,X,se=!0){if(Pe.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=C,z=X,t.width=Math.floor(C*Z),t.height=Math.floor(X*Z),se===!0&&(t.style.width=C+"px",t.style.height=X+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,C,X)},this.getDrawingBufferSize=function(C){return C.set(ae*Z,z*Z).floor()},this.setDrawingBufferSize=function(C,X,se){ae=C,z=X,Z=se,t.width=Math.floor(C*se),t.height=Math.floor(X*se),this.setViewport(0,0,C,X)},this.setEffects=function(C){if(M===$t){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let X=0;X<C.length;X++)if(C[X].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(pe)},this.getViewport=function(C){return C.copy(Ne)},this.setViewport=function(C,X,se,ee){C.isVector4?Ne.set(C.x,C.y,C.z,C.w):Ne.set(C,X,se,ee),_.viewport(pe.copy(Ne).multiplyScalar(Z).round())},this.getScissor=function(C){return C.copy(qe)},this.setScissor=function(C,X,se,ee){C.isVector4?qe.set(C.x,C.y,C.z,C.w):qe.set(C,X,se,ee),_.scissor(fe.copy(qe).multiplyScalar(Z).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(C){_.setScissorTest(Ge=C)},this.setOpaqueSort=function(C){Me=C},this.setTransparentSort=function(C){Ie=C},this.getClearColor=function(C){return C.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(C=!0,X=!0,se=!0){let ee=0;if(C){let te=!1;if(ne!==null){const we=ne.texture.format;te=g.has(we)}if(te){const we=ne.texture.type,Ce=f.has(we),be=Ue.getClearColor(),Le=Ue.getClearAlpha(),Fe=be.r,ze=be.g,We=be.b;Ce?(v[0]=Fe,v[1]=ze,v[2]=We,v[3]=Le,L.clearBufferuiv(L.COLOR,0,v)):(w[0]=Fe,w[1]=ze,w[2]=We,w[3]=Le,L.clearBufferiv(L.COLOR,0,w))}else ee|=L.COLOR_BUFFER_BIT}X&&(ee|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(ee|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&L.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),I=C},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),Ue.dispose(),de.dispose(),le.dispose(),U.dispose(),Y.dispose(),V.dispose(),Ee.dispose(),me.dispose(),re.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",vc),Pe.removeEventListener("sessionend",Mc),Kn.stop()};function gt(C){C.preventDefault(),nl("WebGLRenderer: Context Lost."),R=!0}function ct(){nl("WebGLRenderer: Context Restored."),R=!1;const C=D.autoReset,X=Se.enabled,se=Se.autoUpdate,ee=Se.needsUpdate,te=Se.type;De(),D.autoReset=C,Se.enabled=X,Se.autoUpdate=se,Se.needsUpdate=ee,Se.type=te}function sn(C){et("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function rn(C){const X=C.target;X.removeEventListener("dispose",rn),Ku(X)}function Ku(C){Zu(C),U.remove(C)}function Zu(C){const X=U.get(C).programs;X!==void 0&&(X.forEach(function(se){re.releaseProgram(se)}),C.isShaderMaterial&&re.releaseShaderCache(C))}this.renderBufferDirect=function(C,X,se,ee,te,we){X===null&&(X=Mt);const Ce=te.isMesh&&te.matrixWorld.determinantAffine()<0,be=eh(C,X,se,ee,te);_.setMaterial(ee,Ce);let Le=se.index,Fe=1;if(ee.wireframe===!0){if(Le=O.getWireframeAttribute(se),Le===void 0)return;Fe=2}const ze=se.drawRange,We=se.attributes.position;let Oe=ze.start*Fe,st=(ze.start+ze.count)*Fe;we!==null&&(Oe=Math.max(Oe,we.start*Fe),st=Math.min(st,(we.start+we.count)*Fe)),Le!==null?(Oe=Math.max(Oe,0),st=Math.min(st,Le.count)):We!=null&&(Oe=Math.max(Oe,0),st=Math.min(st,We.count));const yt=st-Oe;if(yt<0||yt===1/0)return;Ee.setup(te,ee,be,se,Le);let xt,rt=_e;if(Le!==null&&(xt=j.get(Le),rt=ue,rt.setIndex(xt)),te.isMesh)ee.wireframe===!0?(_.setLineWidth(ee.wireframeLinewidth*q()),rt.setMode(L.LINES)):rt.setMode(L.TRIANGLES);else if(te.isLine){let Pt=ee.linewidth;Pt===void 0&&(Pt=1),_.setLineWidth(Pt*q()),te.isLineSegments?rt.setMode(L.LINES):te.isLineLoop?rt.setMode(L.LINE_LOOP):rt.setMode(L.LINE_STRIP)}else te.isPoints?rt.setMode(L.POINTS):te.isSprite&&rt.setMode(L.TRIANGLES);if(te.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))rt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const Pt=te._multiDrawStarts,Te=te._multiDrawCounts,Ht=te._multiDrawCount,Qe=Le?j.get(Le).bytesPerElement:1,Xt=U.get(ee).currentProgram.getUniforms();for(let an=0;an<Ht;an++)Xt.setValue(L,"_gl_DrawID",an),rt.render(Pt[an]/Qe,Te[an])}else if(te.isInstancedMesh)rt.renderInstances(Oe,yt,te.count);else if(se.isInstancedBufferGeometry){const Pt=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Te=Math.min(se.instanceCount,Pt);rt.renderInstances(Oe,yt,Te)}else rt.render(Oe,yt)};function _c(C,X,se){C.transparent===!0&&C.side===En&&C.forceSinglePass===!1?(C.side=jt,C.needsUpdate=!0,Ms(C,X,se),C.side=qn,C.needsUpdate=!0,Ms(C,X,se),C.side=En):Ms(C,X,se)}this.compile=function(C,X,se=null){se===null&&(se=C),S=le.get(se),S.init(X),y.push(S),se.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(S.pushLight(te),te.castShadow&&S.pushShadow(te))}),C!==se&&C.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(S.pushLight(te),te.castShadow&&S.pushShadow(te))}),S.setupLights();const ee=new Set;return C.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const we=te.material;if(we)if(Array.isArray(we))for(let Ce=0;Ce<we.length;Ce++){const be=we[Ce];_c(be,se,te),ee.add(be)}else _c(we,se,te),ee.add(we)}),S=y.pop(),ee},this.compileAsync=function(C,X,se=null){const ee=this.compile(C,X,se);return new Promise(te=>{function we(){if(ee.forEach(function(Ce){U.get(Ce).currentProgram.isReady()&&ee.delete(Ce)}),ee.size===0){te(C);return}setTimeout(we,10)}ce.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Lr=null;function Ju(C){Lr&&Lr(C)}function vc(){Kn.stop()}function Mc(){Kn.start()}const Kn=new Su;Kn.setAnimationLoop(Ju),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(C){Lr=C,Pe.setAnimationLoop(C),C===null?Kn.stop():Kn.start()},Pe.addEventListener("sessionstart",vc),Pe.addEventListener("sessionend",Mc),this.render=function(C,X){if(X!==void 0&&X.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(C,X);const se=Pe.enabled===!0&&Pe.isPresenting===!0,ee=A!==null&&(ne===null||se)&&A.begin(P,ne);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(X),X=Pe.getCamera()),C.isScene===!0&&C.onBeforeRender(P,C,X,ne),S=le.get(C,y.length),S.init(X),S.state.textureUnits=k.getTextureUnits(),y.push(S),dt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Je.setFromProjectionMatrix(dt,fn,X.reversedDepth),Ve=this.localClippingEnabled,$e=ve.init(this.clippingPlanes,Ve),E=de.get(C,N.length),E.init(),N.push(E),Pe.enabled===!0&&Pe.isPresenting===!0){const Ce=P.xr.getDepthSensingMesh();Ce!==null&&Ir(Ce,X,-1/0,P.sortObjects)}Ir(C,X,0,P.sortObjects),E.finish(),P.sortObjects===!0&&E.sort(Me,Ie,X.reversedDepth),ot=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,ot&&Ue.addToRenderList(E,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&ve.beginShadows();const te=S.state.shadowsArray;if(Se.render(te,C,X),$e===!0&&ve.endShadows(),(ee&&A.hasRenderPass())===!1){const Ce=E.opaque,be=E.transmissive;if(S.setupLights(),X.isArrayCamera){const Le=X.cameras;if(be.length>0)for(let Fe=0,ze=Le.length;Fe<ze;Fe++){const We=Le[Fe];bc(Ce,be,C,We)}ot&&Ue.render(C);for(let Fe=0,ze=Le.length;Fe<ze;Fe++){const We=Le[Fe];yc(E,C,We,We.viewport)}}else be.length>0&&bc(Ce,be,C,X),ot&&Ue.render(C),yc(E,C,X)}ne!==null&&$===0&&(k.updateMultisampleRenderTarget(ne),k.updateRenderTargetMipmap(ne)),ee&&A.end(P),C.isScene===!0&&C.onAfterRender(P,C,X),Ee.resetDefaultState(),Q=-1,ie=null,y.pop(),y.length>0?(S=y[y.length-1],k.setTextureUnits(S.state.textureUnits),$e===!0&&ve.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,N.pop(),N.length>0?E=N[N.length-1]:E=null,I!==null&&I.renderEnd()};function Ir(C,X,se,ee){if(C.visible===!1)return;if(C.layers.test(X.layers)){if(C.isGroup)se=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(X);else if(C.isLightProbeGrid)S.pushLightProbeGrid(C);else if(C.isLight)S.pushLight(C),C.castShadow&&S.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Je.intersectsSprite(C)){ee&&mt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(dt);const Ce=V.update(C),be=C.material;be.visible&&E.push(C,Ce,be,se,mt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Je.intersectsObject(C))){const Ce=V.update(C),be=C.material;if(ee&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),mt.copy(C.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),mt.copy(Ce.boundingSphere.center)),mt.applyMatrix4(C.matrixWorld).applyMatrix4(dt)),Array.isArray(be)){const Le=Ce.groups;for(let Fe=0,ze=Le.length;Fe<ze;Fe++){const We=Le[Fe],Oe=be[We.materialIndex];Oe&&Oe.visible&&E.push(C,Ce,Oe,se,mt.z,We)}}else be.visible&&E.push(C,Ce,be,se,mt.z,null)}}const we=C.children;for(let Ce=0,be=we.length;Ce<be;Ce++)Ir(we[Ce],X,se,ee)}function yc(C,X,se,ee){const{opaque:te,transmissive:we,transparent:Ce}=C;S.setupLightsView(se),$e===!0&&ve.setGlobalState(P.clippingPlanes,se),ee&&_.viewport(pe.copy(ee)),te.length>0&&vs(te,X,se),we.length>0&&vs(we,X,se),Ce.length>0&&vs(Ce,X,se),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function bc(C,X,se,ee){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[ee.id]===void 0){const Oe=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[ee.id]=new mn(1,1,{generateMipmaps:!0,type:Oe?In:$t,minFilter:li,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const we=S.state.transmissionRenderTarget[ee.id],Ce=ee.viewport||pe;we.setSize(Ce.z*P.transmissionResolutionScale,Ce.w*P.transmissionResolutionScale);const be=P.getRenderTarget(),Le=P.getActiveCubeFace(),Fe=P.getActiveMipmapLevel();P.setRenderTarget(we),P.getClearColor(ge),Ae=P.getClearAlpha(),Ae<1&&P.setClearColor(16777215,.5),P.clear(),ot&&Ue.render(se);const ze=P.toneMapping;P.toneMapping=pn;const We=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),S.setupLightsView(ee),$e===!0&&ve.setGlobalState(P.clippingPlanes,ee),vs(C,se,ee),k.updateMultisampleRenderTarget(we),k.updateRenderTargetMipmap(we),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let st=0,yt=X.length;st<yt;st++){const xt=X[st],{object:rt,geometry:Pt,material:Te,group:Ht}=xt;if(Te.side===En&&rt.layers.test(ee.layers)){const Qe=Te.side;Te.side=jt,Te.needsUpdate=!0,Sc(rt,se,ee,Pt,Te,Ht),Te.side=Qe,Te.needsUpdate=!0,Oe=!0}}Oe===!0&&(k.updateMultisampleRenderTarget(we),k.updateRenderTargetMipmap(we))}P.setRenderTarget(be,Le,Fe),P.setClearColor(ge,Ae),We!==void 0&&(ee.viewport=We),P.toneMapping=ze}function vs(C,X,se){const ee=X.isScene===!0?X.overrideMaterial:null;for(let te=0,we=C.length;te<we;te++){const Ce=C[te],{object:be,geometry:Le,group:Fe}=Ce;let ze=Ce.material;ze.allowOverride===!0&&ee!==null&&(ze=ee),be.layers.test(se.layers)&&Sc(be,X,se,Le,ze,Fe)}}function Sc(C,X,se,ee,te,we){C.onBeforeRender(P,X,se,ee,te,we),C.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),te.onBeforeRender(P,X,se,ee,C,we),te.transparent===!0&&te.side===En&&te.forceSinglePass===!1?(te.side=jt,te.needsUpdate=!0,P.renderBufferDirect(se,X,ee,te,C,we),te.side=qn,te.needsUpdate=!0,P.renderBufferDirect(se,X,ee,te,C,we),te.side=En):P.renderBufferDirect(se,X,ee,te,C,we),C.onAfterRender(P,X,se,ee,te,we)}function Ms(C,X,se){X.isScene!==!0&&(X=Mt);const ee=U.get(C),te=S.state.lights,we=S.state.shadowsArray,Ce=te.state.version,be=re.getParameters(C,te.state,we,X,se,S.state.lightProbeGridArray),Le=re.getProgramCacheKey(be);let Fe=ee.programs;ee.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?X.environment:null,ee.fog=X.fog;const ze=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ee.envMap=Y.get(C.envMap||ee.environment,ze),ee.envMapRotation=ee.environment!==null&&C.envMap===null?X.environmentRotation:C.envMapRotation,Fe===void 0&&(C.addEventListener("dispose",rn),Fe=new Map,ee.programs=Fe);let We=Fe.get(Le);if(We!==void 0){if(ee.currentProgram===We&&ee.lightsStateVersion===Ce)return Ec(C,be),We}else be.uniforms=re.getUniforms(C),I!==null&&C.isNodeMaterial&&I.build(C,se,be),C.onBeforeCompile(be,P),We=re.acquireProgram(be,Le),Fe.set(Le,We),ee.uniforms=be.uniforms;const Oe=ee.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Oe.clippingPlanes=ve.uniform),Ec(C,be),ee.needsLights=nh(C),ee.lightsStateVersion=Ce,ee.needsLights&&(Oe.ambientLightColor.value=te.state.ambient,Oe.lightProbe.value=te.state.probe,Oe.directionalLights.value=te.state.directional,Oe.directionalLightShadows.value=te.state.directionalShadow,Oe.spotLights.value=te.state.spot,Oe.spotLightShadows.value=te.state.spotShadow,Oe.rectAreaLights.value=te.state.rectArea,Oe.ltc_1.value=te.state.rectAreaLTC1,Oe.ltc_2.value=te.state.rectAreaLTC2,Oe.pointLights.value=te.state.point,Oe.pointLightShadows.value=te.state.pointShadow,Oe.hemisphereLights.value=te.state.hemi,Oe.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Oe.spotLightMatrix.value=te.state.spotLightMatrix,Oe.spotLightMap.value=te.state.spotLightMap,Oe.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=S.state.lightProbeGridArray.length>0,ee.currentProgram=We,ee.uniformsList=null,We}function wc(C){if(C.uniformsList===null){const X=C.currentProgram.getUniforms();C.uniformsList=lr.seqWithValue(X.seq,C.uniforms)}return C.uniformsList}function Ec(C,X){const se=U.get(C);se.outputColorSpace=X.outputColorSpace,se.batching=X.batching,se.batchingColor=X.batchingColor,se.instancing=X.instancing,se.instancingColor=X.instancingColor,se.instancingMorph=X.instancingMorph,se.skinning=X.skinning,se.morphTargets=X.morphTargets,se.morphNormals=X.morphNormals,se.morphColors=X.morphColors,se.morphTargetsCount=X.morphTargetsCount,se.numClippingPlanes=X.numClippingPlanes,se.numIntersection=X.numClipIntersection,se.vertexAlphas=X.vertexAlphas,se.vertexTangents=X.vertexTangents,se.toneMapping=X.toneMapping}function Qu(C,X){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;b.setFromMatrixPosition(X.matrixWorld);for(let se=0,ee=C.length;se<ee;se++){const te=C[se];if(te.texture!==null&&te.boundingBox.containsPoint(b))return te}return null}function eh(C,X,se,ee,te){X.isScene!==!0&&(X=Mt),k.resetTextureUnits();const we=X.fog,Ce=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?X.environment:null,be=ne===null?P.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ye.workingColorSpace,Le=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Fe=Y.get(ee.envMap||Ce,Le),ze=ee.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,We=!!se.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Oe=!!se.morphAttributes.position,st=!!se.morphAttributes.normal,yt=!!se.morphAttributes.color;let xt=pn;ee.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(xt=P.toneMapping);const rt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Pt=rt!==void 0?rt.length:0,Te=U.get(ee),Ht=S.state.lights;if($e===!0&&(Ve===!0||C!==ie)){const lt=C===ie&&ee.id===Q;ve.setState(ee,C,lt)}let Qe=!1;ee.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Ht.state.version||Te.outputColorSpace!==be||te.isBatchedMesh&&Te.batching===!1||!te.isBatchedMesh&&Te.batching===!0||te.isBatchedMesh&&Te.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Te.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Te.instancing===!1||!te.isInstancedMesh&&Te.instancing===!0||te.isSkinnedMesh&&Te.skinning===!1||!te.isSkinnedMesh&&Te.skinning===!0||te.isInstancedMesh&&Te.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Te.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Te.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Te.instancingMorph===!1&&te.morphTexture!==null||Te.envMap!==Fe||ee.fog===!0&&Te.fog!==we||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ve.numPlanes||Te.numIntersection!==ve.numIntersection)||Te.vertexAlphas!==ze||Te.vertexTangents!==We||Te.morphTargets!==Oe||Te.morphNormals!==st||Te.morphColors!==yt||Te.toneMapping!==xt||Te.morphTargetsCount!==Pt||!!Te.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Te.__version=ee.version);let Xt=Te.currentProgram;Qe===!0&&(Xt=Ms(ee,X,te),I&&ee.isNodeMaterial&&I.onUpdateProgram(ee,Xt,Te));let an=!1,Fn=!1,vi=!1;const at=Xt.getUniforms(),bt=Te.uniforms;if(_.useProgram(Xt.program)&&(an=!0,Fn=!0,vi=!0),ee.id!==Q&&(Q=ee.id,Fn=!0),Te.needsLights){const lt=Qu(S.state.lightProbeGridArray,te);Te.lightProbeGrid!==lt&&(Te.lightProbeGrid=lt,Fn=!0)}if(an||ie!==C){_.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),at.setValue(L,"projectionMatrix",C.projectionMatrix),at.setValue(L,"viewMatrix",C.matrixWorldInverse);const Bn=at.map.cameraPosition;Bn!==void 0&&Bn.setValue(L,ht.setFromMatrixPosition(C.matrixWorld)),T.logarithmicDepthBuffer&&at.setValue(L,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&at.setValue(L,"isOrthographic",C.isOrthographicCamera===!0),ie!==C&&(ie=C,Fn=!0,vi=!0)}if(Te.needsLights&&(Ht.state.directionalShadowMap.length>0&&at.setValue(L,"directionalShadowMap",Ht.state.directionalShadowMap,k),Ht.state.spotShadowMap.length>0&&at.setValue(L,"spotShadowMap",Ht.state.spotShadowMap,k),Ht.state.pointShadowMap.length>0&&at.setValue(L,"pointShadowMap",Ht.state.pointShadowMap,k)),te.isSkinnedMesh){at.setOptional(L,te,"bindMatrix"),at.setOptional(L,te,"bindMatrixInverse");const lt=te.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),at.setValue(L,"boneTexture",lt.boneTexture,k))}te.isBatchedMesh&&(at.setOptional(L,te,"batchingTexture"),at.setValue(L,"batchingTexture",te._matricesTexture,k),at.setOptional(L,te,"batchingIdTexture"),at.setValue(L,"batchingIdTexture",te._indirectTexture,k),at.setOptional(L,te,"batchingColorTexture"),te._colorsTexture!==null&&at.setValue(L,"batchingColorTexture",te._colorsTexture,k));const On=se.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&W.update(te,se,Xt),(Fn||Te.receiveShadow!==te.receiveShadow)&&(Te.receiveShadow=te.receiveShadow,at.setValue(L,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&X.environment!==null&&(bt.envMapIntensity.value=X.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=xM()),Fn){if(at.setValue(L,"toneMappingExposure",P.toneMappingExposure),Te.needsLights&&th(bt,vi),we&&ee.fog===!0&&he.refreshFogUniforms(bt,we),he.refreshMaterialUniforms(bt,ee,Z,z,S.state.transmissionRenderTarget[C.id]),Te.needsLights&&Te.lightProbeGrid){const lt=Te.lightProbeGrid;bt.probesSH.value=lt.texture,bt.probesMin.value.copy(lt.boundingBox.min),bt.probesMax.value.copy(lt.boundingBox.max),bt.probesResolution.value.copy(lt.resolution)}lr.upload(L,wc(Te),bt,k)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(lr.upload(L,wc(Te),bt,k),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&at.setValue(L,"center",te.center),at.setValue(L,"modelViewMatrix",te.modelViewMatrix),at.setValue(L,"normalMatrix",te.normalMatrix),at.setValue(L,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const lt=ee.uniformsGroups;for(let Bn=0,Mi=lt.length;Bn<Mi;Bn++){const Tc=lt[Bn];me.update(Tc,Xt),me.bind(Tc,Xt)}}return Xt}function th(C,X){C.ambientLightColor.needsUpdate=X,C.lightProbe.needsUpdate=X,C.directionalLights.needsUpdate=X,C.directionalLightShadows.needsUpdate=X,C.pointLights.needsUpdate=X,C.pointLightShadows.needsUpdate=X,C.spotLights.needsUpdate=X,C.spotLightShadows.needsUpdate=X,C.rectAreaLights.needsUpdate=X,C.hemisphereLights.needsUpdate=X}function nh(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(C,X,se){const ee=U.get(C);ee.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),U.get(C.texture).__webglTexture=X,U.get(C.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:se,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,X){const se=U.get(C);se.__webglFramebuffer=X,se.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(C,X=0,se=0){ne=C,K=X,$=se;let ee=null,te=!1,we=!1;if(C){const be=U.get(C);if(be.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,be.__webglFramebuffer),pe.copy(C.viewport),fe.copy(C.scissor),Re=C.scissorTest,_.viewport(pe),_.scissor(fe),_.setScissorTest(Re),Q=-1;return}else if(be.__webglFramebuffer===void 0)k.setupRenderTarget(C);else if(be.__hasExternalTextures)k.rebindTextures(C,U.get(C.texture).__webglTexture,U.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ze=C.depthTexture;if(be.__boundDepthTexture!==ze){if(ze!==null&&U.has(ze)&&(C.width!==ze.image.width||C.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(C)}}const Le=C.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(we=!0);const Fe=U.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Fe[X])?ee=Fe[X][se]:ee=Fe[X],te=!0):C.samples>0&&k.useMultisampledRTT(C)===!1?ee=U.get(C).__webglMultisampledFramebuffer:Array.isArray(Fe)?ee=Fe[se]:ee=Fe,pe.copy(C.viewport),fe.copy(C.scissor),Re=C.scissorTest}else pe.copy(Ne).multiplyScalar(Z).floor(),fe.copy(qe).multiplyScalar(Z).floor(),Re=Ge;if(se!==0&&(ee=B),_.bindFramebuffer(L.FRAMEBUFFER,ee)&&_.drawBuffers(C,ee),_.viewport(pe),_.scissor(fe),_.setScissorTest(Re),te){const be=U.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+X,be.__webglTexture,se)}else if(we){const be=X;for(let Le=0;Le<C.textures.length;Le++){const Fe=U.get(C.textures[Le]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Le,Fe.__webglTexture,se,be)}}else if(C!==null&&se!==0){const be=U.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,se)}Q=-1},this.readRenderTargetPixels=function(C,X,se,ee,te,we,Ce,be=0){if(!(C&&C.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=U.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce]),Le){_.bindFramebuffer(L.FRAMEBUFFER,Le);try{const Fe=C.textures[be],ze=Fe.format,We=Fe.type;if(C.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),!T.textureFormatReadable(ze)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(We)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=C.width-ee&&se>=0&&se<=C.height-te&&L.readPixels(X,se,ee,te,xe.convert(ze),xe.convert(We),we)}finally{const Fe=ne!==null?U.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(C,X,se,ee,te,we,Ce,be=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=U.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce]),Le)if(X>=0&&X<=C.width-ee&&se>=0&&se<=C.height-te){_.bindFramebuffer(L.FRAMEBUFFER,Le);const Fe=C.textures[be],ze=Fe.format,We=Fe.type;if(C.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),!T.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Oe),L.bufferData(L.PIXEL_PACK_BUFFER,we.byteLength,L.STREAM_READ),L.readPixels(X,se,ee,te,xe.convert(ze),xe.convert(We),0);const st=ne!==null?U.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,st);const yt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await zm(L,yt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Oe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,we),L.deleteBuffer(Oe),L.deleteSync(yt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,X=null,se=0){const ee=Math.pow(2,-se),te=Math.floor(C.image.width*ee),we=Math.floor(C.image.height*ee),Ce=X!==null?X.x:0,be=X!==null?X.y:0;k.setTexture2D(C,0),L.copyTexSubImage2D(L.TEXTURE_2D,se,0,0,Ce,be,te,we),_.unbindTexture()},this.copyTextureToTexture=function(C,X,se=null,ee=null,te=0,we=0){let Ce,be,Le,Fe,ze,We,Oe,st,yt;const xt=C.isCompressedTexture?C.mipmaps[we]:C.image;if(se!==null)Ce=se.max.x-se.min.x,be=se.max.y-se.min.y,Le=se.isBox3?se.max.z-se.min.z:1,Fe=se.min.x,ze=se.min.y,We=se.isBox3?se.min.z:0;else{const bt=Math.pow(2,-te);Ce=Math.floor(xt.width*bt),be=Math.floor(xt.height*bt),C.isDataArrayTexture?Le=xt.depth:C.isData3DTexture?Le=Math.floor(xt.depth*bt):Le=1,Fe=0,ze=0,We=0}ee!==null?(Oe=ee.x,st=ee.y,yt=ee.z):(Oe=0,st=0,yt=0);const rt=xe.convert(X.format),Pt=xe.convert(X.type);let Te;X.isData3DTexture?(k.setTexture3D(X,0),Te=L.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(k.setTexture2DArray(X,0),Te=L.TEXTURE_2D_ARRAY):(k.setTexture2D(X,0),Te=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,X.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,X.unpackAlignment);const Ht=_.getParameter(L.UNPACK_ROW_LENGTH),Qe=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Xt=_.getParameter(L.UNPACK_SKIP_PIXELS),an=_.getParameter(L.UNPACK_SKIP_ROWS),Fn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Fe),_.pixelStorei(L.UNPACK_SKIP_ROWS,ze),_.pixelStorei(L.UNPACK_SKIP_IMAGES,We);const vi=C.isDataArrayTexture||C.isData3DTexture,at=X.isDataArrayTexture||X.isData3DTexture;if(C.isDepthTexture){const bt=U.get(C),On=U.get(X),lt=U.get(bt.__renderTarget),Bn=U.get(On.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,lt.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let Mi=0;Mi<Le;Mi++)vi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,U.get(C).__webglTexture,te,We+Mi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,U.get(X).__webglTexture,we,yt+Mi)),L.blitFramebuffer(Fe,ze,Ce,be,Oe,st,Ce,be,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(te!==0||C.isRenderTargetTexture||U.has(C)){const bt=U.get(C),On=U.get(X);_.bindFramebuffer(L.READ_FRAMEBUFFER,F),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,H);for(let lt=0;lt<Le;lt++)vi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,bt.__webglTexture,te,We+lt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bt.__webglTexture,te),at?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,On.__webglTexture,we,yt+lt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,On.__webglTexture,we),te!==0?L.blitFramebuffer(Fe,ze,Ce,be,Oe,st,Ce,be,L.COLOR_BUFFER_BIT,L.NEAREST):at?L.copyTexSubImage3D(Te,we,Oe,st,yt+lt,Fe,ze,Ce,be):L.copyTexSubImage2D(Te,we,Oe,st,Fe,ze,Ce,be);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else at?C.isDataTexture||C.isData3DTexture?L.texSubImage3D(Te,we,Oe,st,yt,Ce,be,Le,rt,Pt,xt.data):X.isCompressedArrayTexture?L.compressedTexSubImage3D(Te,we,Oe,st,yt,Ce,be,Le,rt,xt.data):L.texSubImage3D(Te,we,Oe,st,yt,Ce,be,Le,rt,Pt,xt):C.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,we,Oe,st,Ce,be,rt,Pt,xt.data):C.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,we,Oe,st,xt.width,xt.height,rt,xt.data):L.texSubImage2D(L.TEXTURE_2D,we,Oe,st,Ce,be,rt,Pt,xt);_.pixelStorei(L.UNPACK_ROW_LENGTH,Ht),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Xt),_.pixelStorei(L.UNPACK_SKIP_ROWS,an),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Fn),we===0&&X.generateMipmaps&&L.generateMipmap(Te),_.unbindTexture()},this.initRenderTarget=function(C){U.get(C).__webglFramebuffer===void 0&&k.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?k.setTextureCube(C,0):C.isData3DTexture?k.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?k.setTexture2DArray(C,0):k.setTexture2D(C,0),_.unbindTexture()},this.resetState=function(){K=0,$=0,ne=null,_.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Zs=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],Lu=620,_M=560,vM=300,MM=2800,Yl=850,Kl=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Zl=210,Ta=300,Jl=.42,Ql=740,Js=n=>-(n+1)*Lu,yM=n=>n===1?1:1-Math.pow(2,-10*n),Aa=n=>new Promise(e=>setTimeout(e,n)),ed=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function td(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${ed[t%ed.length]}`)}function bM({onDone:n}){const e=G.useRef(null),t=G.useRef(null),i=G.useRef(null),s=G.useRef(null),r=G.useRef(null),o=G.useRef(null),c=G.useRef(null),l=G.useRef(null),u=G.useRef(null),d=G.useRef(null),h=G.useRef(n);h.current=n,bd();const p=G.useMemo(()=>td(16),[]),m=G.useMemo(()=>td(16),[]);return G.useEffect(()=>{let x=!1,M=!1;const g=()=>{M||(M=!0,h.current())};let f=null;function v(){if(!f)try{const q=window.AudioContext??window.webkitAudioContext;f=new q}catch{}return f}function w(){const q=v();if(!q)return;q.state==="suspended"&&q.resume();const L=q.currentTime,oe=q.createOscillator();oe.type="sine",oe.frequency.setValueAtTime(130,L),oe.frequency.exponentialRampToValueAtTime(42,L+.16);const ce=q.createGain();ce.gain.setValueAtTime(1,L),ce.gain.exponentialRampToValueAtTime(.001,L+.38),oe.connect(ce).connect(q.destination),oe.start(L),oe.stop(L+.42);const T=Math.floor(q.sampleRate*.14),_=q.createBuffer(1,T,q.sampleRate),D=_.getChannelData(0);for(let j=0;j<T;j++)D[j]=(Math.random()*2-1)*Math.pow(1-j/T,2.2);const U=q.createBufferSource();U.buffer=_;const k=q.createBiquadFilter();k.type="lowpass",k.frequency.value=850;const Y=q.createGain();Y.gain.setValueAtTime(.55,L),Y.gain.exponentialRampToValueAtTime(.001,L+.13),U.connect(k).connect(Y).connect(q.destination),U.start(L)}function b(){const q=i.current;q&&(q.currentTime=0,q.play().catch(()=>{}))}const E=t.current,S=(E==null?void 0:E.getContext("2d"))??null;let N=[],y=0;function A(){E&&(E.width=window.innerWidth,E.height=window.innerHeight)}A();function P(q,L){N=[];let oe=0;const ce=6;function T(D,U,k,Y,j,O){const V=3+Math.floor(Math.random()*3),re=[[D,U]];let he=k,de=D,le=U;for(let ve=0;ve<V;ve++){he+=(Math.random()-.5)*.6;const Se=Y/V;if(de+=Math.cos(he)*Se,le+=Math.sin(he)*Se,re.push([de,le]),j>0&&Math.random()<.5){const Ue=he+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);T(de,le,Ue,Y*(.35+Math.random()*.3),j-1,O*.78)}}N.push({pts:re,color:Kl[oe++%Kl.length],width:O})}const _=[L*(.06+Math.random()*.1),L*(.84+Math.random()*.1)];for(let D=0;D<ce;D++){const U=q*(.15+Math.random()*.7),k=D<_.length?_[D]:L*(.1+Math.random()*.8),Y=9+Math.floor(Math.random()*6);for(let j=0;j<Y;j++){const O=j/Y*Math.PI*2+(Math.random()-.5)*.4,V=Math.max(q,L)*(.18+Math.random()*.38);T(U,k,O,V,2,.9)}}}function R(q){if(!S||q<=0)return;const L=Math.min(1,q/2.4),oe=Math.round(N.length*L);for(let ce=0;ce<oe;ce++){const T=N[ce];S.lineWidth=T.width*(.9+q*.1),S.strokeStyle=T.color,S.globalAlpha=.75+q*.1,S.shadowColor=T.color,S.shadowBlur=5+q*2.2,S.beginPath(),T.pts.forEach(([_,D],U)=>U===0?S.moveTo(_,D):S.lineTo(_,D)),S.stroke()}S.globalAlpha=1,S.shadowBlur=0}function I(q,L,oe){S&&(S.clearRect(0,0,L,oe),R(q))}function B(){const q=u.current;q&&(q.classList.remove("intro-hit"),q.offsetWidth,q.classList.add("intro-hit"))}function F(){var L,oe,ce,T;const q=(L=r.current)==null?void 0:L.firstElementChild;q&&(q.classList.remove("intro-rgbslam"),q.offsetWidth,q.classList.add("intro-rgbslam")),(oe=r.current)==null||oe.classList.remove("intro-jitter"),(ce=r.current)==null||ce.offsetWidth,(T=r.current)==null||T.classList.add("intro-jitter"),B(),$e()}async function H(){for(let q=5;q>=1&&!x;q--){const L=r.current;if(!L)return;L.innerHTML="";const oe=document.createElement("div");oe.className="intro-glyph",oe.setAttribute("data-t",String(q)),oe.textContent=String(q),L.appendChild(oe),F(),w(),await oe.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Yl*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Aa(Yl*.3)}}let K=null,$=null,ne=null,Q=0,ie=!1,pe=-1;const Re=document.createElement("canvas").getContext("2d");Re.font=`700 ${Zl}px "Rajdhani", sans-serif`;const ge=[],Ae=[];function ae(q,L){const oe=Math.ceil(Re.measureText(q).width),ce=Math.max(200,oe+120),T=document.createElement("canvas");T.width=ce,T.height=Ta;const _=T.getContext("2d");_.font=`700 ${Zl}px "Rajdhani", sans-serif`,_.textAlign="center",_.textBaseline="middle",_.shadowColor=L,_.shadowBlur=56,_.fillStyle="#d24e01",_.fillText(q,ce/2,Ta/2);const D=new gu(T);D.anisotropy=4;let U=ce*Jl,k=Ta*Jl;if(U>Ql){const Y=Ql/U;U*=Y,k*=Y}return{tex:D,worldW:U,worldH:k}}function z(q,L,oe){const{tex:ce,worldW:T,worldH:_}=ae(q,oe),D=new Ki(T,_),U=new Xn({map:ce,transparent:!0,depthWrite:!1,opacity:0}),k=new ut(D,U);k.position.set(0,10,L),k.visible=!1,$.add(k);const Y=new ut(D,new Xn({map:ce,transparent:!0,depthWrite:!1,blending:pi,color:2875596,opacity:0})),j=new ut(D,new Xn({map:ce,transparent:!0,depthWrite:!1,blending:pi,color:10116351,opacity:0}));return Y.position.copy(k.position),j.position.copy(k.position),Y.visible=!1,j.visible=!1,$.add(Y),$.add(j),Ae.push(D,U,ce,Y.material,j.material),{mesh:k,ghostCy:Y,ghostMg:j}}const Z={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Me,Ie;function Ne(){const q=e.current;if(!q)return;K=new Pu({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),K.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),$=new uu,$.fog=new Ar(263946,.0011),ne=new Gt(62,window.innerWidth/window.innerHeight,1,6e3),ne.position.set(0,0,40),$.add(new bu(928300,1.1));const L=Lu*Zs.length+500,oe=900,ce=new Ft,T=new Float32Array(oe*3),_=new Float32Array(oe*3),D=[2875596,15357964,15357964,10116351];for(let j=0;j<oe;j++){const O=60+Math.random()*260,V=Math.random()*Math.PI*2;T[j*3]=Math.cos(V)*O,T[j*3+1]=Math.sin(V)*O,T[j*3+2]=-Math.random()*L;const re=new Xe(D[j%D.length]);_[j*3]=re.r,_[j*3+1]=re.g,_[j*3+2]=re.b}ce.setAttribute("position",new kt(T,3)),ce.setAttribute("color",new kt(_,3));const U=new Rr({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});$.add(new rc(ce,U)),Ae.push(ce,U),Zs.forEach((j,O)=>{const V=Js(O),re="#"+j.light.toString(16).padStart(6,"0");ge.push(z(j.text,V,re));const he=new hi(j.light,2.4,900,2);he.position.set(0,40,V+60),$.add(he)}),Me=new hi(15357964,4,550,2),Ie=new hi(10116351,2.6,550,2),$.add(Me),$.add(Ie),ie=!0,qe();const k=Math.random()*1e3;Z.camZ=0;function Y(j){if(!K||!$||!ne)return;{const he=Math.sin(j*.0016+k)*1.1+Math.sin(j*.0043)*.5,de=Math.cos(j*.002+k)*.9+Math.cos(j*.0038)*.45;ne.position.x=he+Z.camX,ne.position.y=de+6}ne.position.z=Z.camZ+Z.warpKick;const O=Z.yawKick,V=ne.position.x+Math.sin(O)*640;ne.lookAt(V,ne.position.y-4,Z.focusZ),ne.rotateZ(-O*.5);const re=62+Z.fovKick*14;ne.fov!==re&&(ne.fov=re,ne.updateProjectionMatrix()),Me.position.set(Math.sin(j*6e-4)*80,30,Z.camZ-120),Ie.position.set(Math.cos(j*7e-4)*80,-10,Z.camZ-200),ge.forEach(he=>{he.mesh.visible&&he.mesh.quaternion.copy(ne.quaternion),he.ghostCy.visible&&he.ghostCy.quaternion.copy(ne.quaternion),he.ghostMg.visible&&he.ghostMg.quaternion.copy(ne.quaternion)}),K.render($,ne),Q=requestAnimationFrame(Y)}Q=requestAnimationFrame(Y)}function qe(){!ie||!K||!ne||(K.setSize(window.innerWidth,window.innerHeight),ne.aspect=window.innerWidth/window.innerHeight,ne.updateProjectionMatrix())}function Ge(){qe(),A(),P(window.innerWidth,window.innerHeight),I(y,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Ge,{passive:!0});function Je(q,L=650){const oe=pe;pe=q;const ce=ge[q];if(!ce)return;ce.mesh.visible=!0,ce.mesh.material.opacity=0;const T=oe>=0?ge[oe]:null,_=performance.now();function D(){const U=Math.min(1,(performance.now()-_)/L);ce.mesh.material.opacity=U,T&&(T.mesh.material.opacity=1-U),U<1?requestAnimationFrame(D):T&&(T.mesh.visible=!1)}D()}function $e(){if(pe<0)return;const q=ge[pe];if(!q)return;const L=16+Math.random()*14;q.ghostCy.visible=!0,q.ghostCy.material.opacity=.6,q.ghostCy.position.x=-L,q.ghostMg.visible=!0,q.ghostMg.material.opacity=.6,q.ghostMg.position.x=L,setTimeout(()=>{q.ghostCy.material.opacity=0,q.ghostCy.visible=!1,q.ghostCy.position.x=0,q.ghostMg.material.opacity=0,q.ghostMg.visible=!1,q.ghostMg.position.x=0},140+Math.random()*100)}async function Ve(q,L,oe,ce,T){const _=Z.camZ,D=Z.camX,U=performance.now();return Z.warpKick=(Math.random()-.5)*34,Z.yawKick=T*ce,Z.fovKick=1,new Promise(k=>{function Y(j){const O=Math.min(1,(j-U)/oe),V=yM(O);Z.camZ=_+(q-_)*V,Z.camX=D+(L-D)*V,Z.warpKick*=.92,Z.yawKick*=.975,Z.fovKick*=.965,O<1?requestAnimationFrame(Y):k()}requestAnimationFrame(Y)})}function dt(q=1,L=420){if(!ie||!S||!e.current)return;const oe=window.innerWidth,ce=window.innerHeight,T=performance.now()+L;function _(){if(performance.now()>T){I(y,oe,ce);return}S.clearRect(0,0,oe,ce),R(y);const U=5+Math.floor(Math.random()*8*q);for(let Y=0;Y<U;Y++){const j=Math.random()*ce,O=4+Math.random()*52*q,V=(Math.random()-.5)*130*q;try{S.drawImage(e.current,0,j,oe,O,V,j,oe,O)}catch{}}const k=Math.round(6*q);S.globalCompositeOperation="screen";for(let Y=0;Y<k;Y++){const j=Math.random()*ce;S.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],S.globalAlpha=.35+Math.random()*.35,S.lineWidth=.6+Math.random()*1.6,S.beginPath(),S.moveTo(0,j),S.lineTo(oe,j),S.stroke()}if(S.globalCompositeOperation="source-over",S.globalAlpha=1,Math.random()<q*.12){S.globalAlpha=.5;for(let Y=0;Y<220;Y++)S.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",S.fillRect(Math.random()*oe,Math.random()*ce,2,2);S.globalAlpha=1}requestAnimationFrame(_)}_()}function ht(q=1,L=340){if(!ie||!S)return;const oe=window.innerWidth,ce=window.innerHeight,T=oe/2,_=ce/2,D=12+Math.floor(10*q),U=Array.from({length:D},()=>Math.random()*Math.PI*2),k=performance.now();function Y(){const O=(performance.now()-k)/L;if(O>=1){I(y,oe,ce);return}S.save(),S.globalCompositeOperation="screen",U.forEach(V=>{const re=30+O*300,he=re+90+Math.random()*150,de=T+Math.cos(V)*re,le=_+Math.sin(V)*re,ve=T+Math.cos(V)*he,Se=_+Math.sin(V)*he;S.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",S.globalAlpha=(1-O)*(.28+Math.random()*.32)*q,S.lineWidth=1.2+Math.random()*1.8,S.beginPath(),S.moveTo(de,le),S.lineTo(ve,Se),S.stroke()}),S.restore(),requestAnimationFrame(Y)}Y()}async function mt(q=900){const L=window.innerWidth,oe=window.innerHeight;if(!S)return;const ce=performance.now(),T=N.map(()=>Math.random()*.25);await new Promise(_=>{function D(){const U=Math.min(1,(performance.now()-ce)/q);S.clearRect(0,0,L,oe),N.forEach((k,Y)=>{const j=Math.min(1,Math.max(0,(U-T[Y])/(1-T[Y])));if(j<=0)return;const O=k.pts,V=O.length-1,re=j*V;S.lineWidth=k.width*(1+U*.4),S.strokeStyle=k.color,S.globalAlpha=.65+U*.3,S.shadowColor=k.color,S.shadowBlur=3+U*5,S.beginPath(),S.moveTo(O[0][0],O[0][1]);for(let le=0;le<Math.floor(re);le++)S.lineTo(O[le+1][0],O[le+1][1]);const he=Math.floor(re),de=re-he;if(he<V&&de>0){const[le,ve]=O[he],[Se,Ue]=O[he+1];S.lineTo(le+(Se-le)*de,ve+(Ue-ve)*de)}S.stroke()}),S.globalAlpha=1,S.shadowBlur=0,U<1?requestAnimationFrame(D):_()}D()})}async function Mt(){var j;B(),(j=r.current)==null||j.classList.add("intro-jitter");const q=d.current;if(!q)return;q.innerHTML="";const L=window.innerWidth,oe=window.innerHeight,ce=11,T=8,_=L/ce,D=oe/T,U=L/2,k=oe/2,Y=[];for(let O=0;O<T;O++)for(let V=0;V<ce;V++){const re=V*_,he=O*D,de=()=>(Math.random()-.5)*16,le=document.createElement("div");le.className="intro-shard",le.style.left=re+"px",le.style.top=he+"px",le.style.width=_+2+"px",le.style.height=D+2+"px",le.style.clipPath=`polygon(${de()}px ${de()}px, ${_+de()}px ${de()}px, ${_+de()}px ${D+de()}px, ${de()}px ${D+de()}px)`,q.appendChild(le);const ve=re+_/2-U,Se=he+D/2-k,Ue=Math.hypot(ve,Se)||1;Y.push({div:le,dx:ve/Ue,dy:Se/Ue,delay:Ue/Math.max(L,oe)*220+Math.random()*80})}Y.forEach(({div:O,dx:V,dy:re,delay:he})=>{const de=60+Math.random()*140,le=420+Math.random()*420,ve=(Math.random()-.5)*420;O.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${V*de}px, ${re*de-20}px) rotate(${ve*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${V*de*1.4}px, ${re*de+le}px) rotate(${ve}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:he,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Aa(1600),q.innerHTML=""}async function ot(){var q;if(P(window.innerWidth,window.innerHeight),Ne(),s.current&&(s.current.style.display="flex"),await H(),!x){s.current&&(s.current.style.display="none"),(q=c.current)==null||q.classList.add("intro-on"),b();for(let L=0;L<Zs.length&&!x;L++){const oe=Zs[L];y=oe.crack,l.current&&(l.current.innerHTML=oe.final?oe.sub:`${oe.sub} · трещина канала <b>${oe.crack}/4</b>`),Je(L),Z.focusZ=Js(L);const ce=L%2===0?1:-1,T=oe.final?0:ce*60,_=oe.final?Js(L)-vM:Js(L)+_M;if(await Ve(_,T,MM,.5+oe.crack*.09,ce),x)return;F(),dt(Math.min(1,.5+oe.crack*.14),oe.final?300:260),oe.final||ht(.8+oe.crack*.1,320),I(y,window.innerWidth,window.innerHeight)}x||(await mt(900),!x&&(await Aa(150),await Mt(),!x&&g()))}}return ot(),()=>{x=!0,window.removeEventListener("resize",Ge),cancelAnimationFrame(Q),Ae.forEach(q=>q.dispose()),K==null||K.dispose(),f==null||f.close().catch(()=>{})}},[]),a.jsx("div",{className:"host-screen grid-bg intro-screen",children:a.jsxs("div",{className:"intro-root",children:[a.jsx("canvas",{ref:e,className:"intro-gl"}),a.jsx("canvas",{ref:t,className:"intro-crack"}),a.jsx("div",{ref:d,className:"intro-shatter-layer"}),a.jsx("div",{className:"intro-vignette"}),a.jsx("div",{className:"intro-scanlines"}),a.jsx("div",{ref:u,className:"intro-noise"}),a.jsx("div",{className:"intro-bracket tl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket tr",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket bl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket br",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-ticker left",children:a.jsx("div",{className:"intro-ticker-col",children:[...p,...p].map((x,M)=>a.jsx("span",{className:M%6===0?"hi":void 0,children:x},M))})}),a.jsx("div",{className:"intro-ticker right",children:a.jsx("div",{className:"intro-ticker-col",children:[...m,...m].map((x,M)=>a.jsx("span",{className:M%5===0?"hi":void 0,children:x},M))})}),a.jsxs("div",{ref:s,className:"intro-stage",children:[a.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),a.jsx("div",{ref:r,className:"intro-frame"}),a.jsx("div",{ref:o,className:"intro-subline",children:"инициализация канала связи…"})]}),a.jsx("div",{ref:c,className:"intro-flight-label",children:a.jsx("div",{ref:l,className:"intro-subline"})}),a.jsx(jo,{}),a.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const SM=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],Ca=[3400,2700,2200,1900],Bo=640,nd=560,wM=320,id=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Ra=220,Qs=300,sd=.46,rd=820,as=n=>-(n+1)*Bo,EM=n=>n===1?1:1-Math.pow(2,-10*n),os=n=>new Promise(e=>setTimeout(e,n));function TM(){const n=new ui,e=[],t=new ti({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new ac(.42,.95,12),s=new ut(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new zi(.42,.36,1.9,12),o=new ut(r,t);o.rotation.x=Math.PI/2,o.position.set(0,0,-.15),n.add(o),e.push(r);const c=new xi(.5,.14,1),l=new ti({color:1316636,metalness:.5,roughness:.6}),u=new ut(c,l);u.position.set(.08,.38,-.1),u.rotation.z=.1,n.add(u),e.push(c,l);const d=new ti({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),h=new vr(.13,12,12),p=new ut(h,d);p.position.set(0,-.05,-2),n.add(p),e.push(h,d);const m=new vr(.06,8,8);[-.22,.22].forEach(A=>{const P=new ut(m,d);P.position.set(A,.12,-1.7),n.add(P)}),e.push(m);const x=new zi(.06,.06,1.4,6),M=new ti({color:1711394,metalness:.7,roughness:.4});e.push(x,M);const g=new xi(.04,.86,.05),f=new ti({color:658447,metalness:.4,roughness:.6});e.push(g,f);const v=new zi(.5,.5,.07,16),w=new ti({color:1382429,metalness:.6,roughness:.45});e.push(v,w);const b=new oc(.6,.09,8,20);e.push(b);function E(A,P){const R=new ui,I=new ut(x,M);I.rotation.z=Math.PI/2,I.position.set(A*.72,-.08,.15),R.add(I);const B=A*1.45,F=new ut(v,w);F.rotation.x=Math.PI/2,F.position.set(B,-.08,.15),R.add(F);const H=new ti({color:855826,metalness:.75,roughness:.3,emissive:P,emissiveIntensity:1.4}),K=new ut(b,H);K.position.copy(F.position),R.add(K),e.push(H);const $=new ui;$.position.copy(F.position);for(let ne=0;ne<5;ne++){const Q=new ut(g,f);Q.rotation.z=ne/5*Math.PI,$.add(Q)}return R.add($),{pod:R,rim:K,spokes:$}}const S=E(-1,2875596),N=E(1,15357964);n.add(S.pod,N.pod);const y=new hi(2875596,2.2,14,2);return y.position.set(0,0,-1.4),n.add(y),{group:n,rotorL:S,rotorR:N,engineLight:y,disposables:e}}function AM(n=60){const e=new Ft,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new kt(t,3));const r=new Rr({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:pi,depthWrite:!1}),o=new rc(e,r);let c=0;function l(d,h,p,m){for(let x=0;x<m;x++){const M=c;c=(c+1)%n,i[M]=.4+Math.random()*.35,t[M*3]=d,t[M*3+1]=h,t[M*3+2]=p,s[M*3]=(Math.random()-.5)*3.2,s[M*3+1]=(Math.random()-.5)*3.2-1,s[M*3+2]=(Math.random()-.5)*3.2}}function u(d){for(let h=0;h<n;h++){if(i[h]<=0){t[h*3+1]=-9999;continue}i[h]-=d,t[h*3]+=s[h*3]*d,t[h*3+1]+=s[h*3+1]*d,t[h*3+2]+=s[h*3+2]*d,i[h]<=0&&(t[h*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:o,geo:e,mat:r,spawn:l,tick:u}}function CM({onDone:n,phases:e=SM}){const t=G.useRef(null),i=G.useRef(null),s=G.useRef(null),r=G.useRef(null),o=G.useRef(null),c=G.useRef(null),l=G.useRef(null),u=G.useRef(n);u.current=n;const d=G.useRef(e);d.current=e;const h=G.useRef(()=>{});bd();const p=G.useMemo(()=>e.map(m=>m.text).join(" → "),[e]);return G.useEffect(()=>{let m=!1,x=!1;const M=()=>{x||(x=!0,u.current())};h.current=M;const g=d.current,f=l.current,v=i.current,w=(v==null?void 0:v.getContext("2d"))??null;let b=[],E=0;function S(){v&&(v.width=window.innerWidth,v.height=window.innerHeight)}S();function N(q,L){b=[];let oe=0;const ce=7;function T(D,U,k,Y,j,O){const V=3+Math.floor(Math.random()*4),re=[[D,U]];let he=k,de=D,le=U;for(let ve=0;ve<V;ve++){he+=(Math.random()-.5)*.9;const Se=Y/V*(.55+Math.random()*.85);if(de+=Math.cos(he)*Se,le+=Math.sin(he)*Se,re.push([de,le]),j>0&&Math.random()<.58){const Ue=he+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);T(de,le,Ue,Y*(.3+Math.random()*.35),j-1,O*.76)}}b.push({pts:re,color:id[oe++%id.length],width:O})}for(let D=0;D<ce;D++){const U=q*(.1+Math.random()*.8),k=L*(.08+Math.random()*.84),Y=7+Math.floor(Math.random()*7);let j=Math.random()*Math.PI*2;for(let O=0;O<Y;O++){j+=Math.PI*2/Y*(.55+Math.random()*.9);const V=Math.max(q,L)*(.16+Math.random()*.46);T(U,k,j,V,2,.9)}}b.slice().forEach(D=>{if(D.pts.length<3||Math.random()>=.55)return;const[U,k]=D.pts[1+Math.floor(Math.random()*(D.pts.length-2))];T(U,k,Math.random()*Math.PI*2,Math.max(q,L)*(.08+Math.random()*.22),1,.55)})}function y(q){if(!w||q<=0)return;const L=Math.min(1,q/2.5),oe=Math.round(b.length*L);for(let ce=0;ce<oe;ce++){const T=b[ce];w.lineWidth=T.width*(.9+q*.1),w.strokeStyle=T.color,w.globalAlpha=.7+q*.07,w.shadowColor=T.color,w.shadowBlur=5+q*2.4,w.beginPath(),T.pts.forEach(([_,D],U)=>U===0?w.moveTo(_,D):w.lineTo(_,D)),w.stroke()}w.globalAlpha=1,w.shadowBlur=0}function A(q,L,oe){w&&(w.clearRect(0,0,L,oe),y(q))}function P(q=!1){const L=o.current;if(!L)return;const oe=q?"fincine-hit-big":"fincine-hit";L.classList.remove("fincine-hit","fincine-hit-big"),L.offsetWidth,L.classList.add(oe)}function R(){f&&(f.currentTime=0,f.play().catch(()=>{}))}let I=null,B=null,F=null,H=0,K=!1,$=-1;const Q=document.createElement("canvas").getContext("2d");Q.font=`700 ${Ra}px "Rajdhani", sans-serif`;const ie=[],pe=[];function fe(q,L,oe=1){const ce=q.toUpperCase(),T=Ra*.05,_=Math.ceil(Q.measureText(ce).width),D=Math.max(200,_+140+T*2),U=document.createElement("canvas");U.width=D,U.height=Qs;const k=U.getContext("2d");k.font=`700 ${Ra}px "Rajdhani", sans-serif`,k.textAlign="center",k.textBaseline="middle",k.lineJoin="round",k.shadowColor=L,k.shadowBlur=60,k.strokeStyle="#eef6f4",k.lineWidth=T,k.strokeText(ce,D/2,Qs/2),k.fillStyle="#eef6f4",k.fillText(ce,D/2,Qs/2);const Y=new gu(U);Y.anisotropy=4;let j=D*sd*oe,O=Qs*sd*oe;if(j>rd*oe){const V=rd*oe/j;j*=V,O*=V}return{tex:Y,worldW:j,worldH:O}}function Re(q,L,oe,ce){const{tex:T,worldW:_,worldH:D}=fe(q,oe,ce),U=new Ki(_,D),k=new Xn({map:T,transparent:!0,depthWrite:!1,opacity:0}),Y=new ut(U,k);Y.position.set(0,8,L),Y.visible=!1,B.add(Y);const j=new ut(U,new Xn({map:T,transparent:!0,depthWrite:!1,blending:pi,color:2875596,opacity:0})),O=new ut(U,new Xn({map:T,transparent:!0,depthWrite:!1,blending:pi,color:16723804,opacity:0}));return j.position.copy(Y.position),O.position.copy(Y.position),j.visible=!1,O.visible=!1,B.add(j),B.add(O),pe.push(U,k,T,j.material,O.material),{mesh:Y,ghostCy:j,ghostMg:O}}const ge={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let Ae,ae,z=null,Z=null,Me=0;function Ie(){const q=t.current;if(!q)return;I=new Pu({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),I.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),B=new uu,B.fog=new Ar(263946,.0012),F=new Gt(58,window.innerWidth/window.innerHeight,1,6e3),F.position.set(0,0,40),B.add(new bu(928300,1));const L=Bo*g.length+600,oe=700,ce=new Ft,T=new Float32Array(oe*3),_=new Float32Array(oe*3),D=[2875596,10116351,15357964];for(let j=0;j<oe;j++){const O=60+Math.random()*280,V=Math.random()*Math.PI*2;T[j*3]=Math.cos(V)*O,T[j*3+1]=Math.sin(V)*O,T[j*3+2]=-Math.random()*L;const re=new Xe(D[j%D.length]);_[j*3]=re.r,_[j*3+1]=re.g,_[j*3+2]=re.b}ce.setAttribute("position",new kt(T,3)),ce.setAttribute("color",new kt(_,3));const U=new Rr({size:3,vertexColors:!0,transparent:!0,opacity:.8});B.add(new rc(ce,U)),pe.push(ce,U),g.forEach((j,O)=>{const V=as(O),re="#"+j.light.toString(16).padStart(6,"0");ie.push(Re(j.text,V,re,j.final?1.35:1));const he=new hi(j.light,2.6,950,2);he.position.set(0,40,V+60),B.add(he)}),Ae=new hi(15357964,3.4,550,2),ae=new hi(10116351,2.2,550,2),B.add(Ae),B.add(ae),z=TM(),F.add(z.group),z.group.position.set(1.3,-1,-6.5),Z=AM(),z.group.add(Z.points),pe.push(Z.geo,Z.mat),B.add(F),K=!0,Ne();const k=Math.random()*1e3;ge.camZ=-Bo*.6;function Y(j){if(!I||!B||!F||!z||!Z)return;const O=Me?Math.min(.05,(j-Me)/1e3):.016;Me=j;const V=.15+Math.min(1,Math.max(0,($+1)/g.length))*.85,re=ge.impactT;re>0&&(ge.impactT=Math.max(0,re-O));const he=Math.sin(j*.0016+k)*(1+V*2.2+re*6)+Math.sin(j*.0043)*.5*V,de=Math.cos(j*.002+k)*(.9+V*1.8+re*5)+Math.cos(j*.0038)*.45*V;F.position.x=he+ge.camX,F.position.y=de+6,F.position.z=ge.camZ+ge.warpKick;const le=ge.yawKick,ve=F.position.x+Math.sin(le)*640,Se=ge.focusY??F.position.y-4;F.lookAt(ve,Se,ge.focusZ),F.rotateZ(-le*.55);const Ue=58+ge.fovKick*(14+V*10)+re*24;Math.abs(F.fov-Ue)>.01&&(F.fov=Ue,F.updateProjectionMatrix()),Ae.position.set(Math.sin(j*6e-4)*80,30,ge.camZ-120),ae.position.set(Math.cos(j*7e-4)*80,-10,ge.camZ-200),ge.droneRoll=ge.droneRoll*.9+-le*1.4*.1;const W=1.6+V*2.4;ge.droneBob=Math.sin(j*.001*W)*(.12+V*.35),z.group.rotation.z=ge.droneRoll*.6+(re>0?Math.sin(j*.09)*1.15*re:0),z.group.rotation.x=Math.sin(j*.0013)*.06*(1+V)+(re>0?Math.cos(j*.11)*.75*re:0);const _e=O*(6+V*10);z.rotorR.spokes.rotation.z+=_e;let ue=-1+ge.droneBob;ge.engineOutT>0?(ge.engineOutT-=O,ue-=1-Math.max(0,ge.engineOutT)/.5<1?Math.sin((.5-ge.engineOutT)*9)*.4:0,z.rotorL.spokes.rotation.z+=_e*.12,z.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&Z.spawn(-1.45,-.08,.15,2)):(z.rotorL.spokes.rotation.z+=_e,z.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(j*.01)*.3),z.group.position.y=ue,z.group.position.x=1.3+Math.sin(j*9e-4)*.25*(1+V),z.group.position.z=-6.5-(re>0?re*2.6:0),Z.tick(O),ie.forEach(xe=>{xe.mesh.visible&&xe.mesh.quaternion.copy(F.quaternion),xe.ghostCy.visible&&xe.ghostCy.quaternion.copy(F.quaternion),xe.ghostMg.visible&&xe.ghostMg.quaternion.copy(F.quaternion)}),I.render(B,F),H=requestAnimationFrame(Y)}H=requestAnimationFrame(Y)}function Ne(){!K||!I||!F||(I.setSize(window.innerWidth,window.innerHeight),F.aspect=window.innerWidth/window.innerHeight,F.updateProjectionMatrix())}function qe(){Ne(),S(),N(window.innerWidth,window.innerHeight),A(E,window.innerWidth,window.innerHeight)}window.addEventListener("resize",qe,{passive:!0});function Ge(q,L=600){const oe=$;$=q;const ce=ie[q];if(!ce)return;ce.mesh.visible=!0,ce.mesh.material.opacity=0;const T=oe>=0?ie[oe]:null,_=performance.now();function D(){const U=Math.min(1,(performance.now()-_)/L);ce.mesh.material.opacity=U,T&&(T.mesh.material.opacity=1-U),U<1?requestAnimationFrame(D):T&&(T.mesh.visible=!1)}D()}function Je(q=.5){if($<0)return;const L=ie[$];if(!L)return;const oe=(14+Math.random()*12)*(.7+q*.6),ce=Math.min(1,.45+q*.3);L.ghostCy.visible=!0,L.ghostCy.material.opacity=ce,L.ghostCy.position.x=-oe,L.ghostMg.visible=!0,L.ghostMg.material.opacity=ce,L.ghostMg.position.x=oe,setTimeout(()=>{L.ghostCy.material.opacity=0,L.ghostCy.visible=!1,L.ghostCy.position.x=0,L.ghostMg.material.opacity=0,L.ghostMg.visible=!1,L.ghostMg.position.x=0},(120+Math.random()*90)*(.8+q*.5)),q>.75&&Math.random()<.65&&setTimeout(()=>Je(q*.55),70+Math.random()*70)}async function $e(q,L,oe,ce,T){const _=ge.camZ,D=ge.camX,U=performance.now();return ge.warpKick=(Math.random()-.5)*40,ge.yawKick=T*ce,ge.fovKick=1,new Promise(k=>{function Y(j){if(m){k();return}const O=Math.min(1,(j-U)/oe),V=EM(O);ge.camZ=_+(q-_)*V,ge.camX=D+(L-D)*V,ge.warpKick*=.91,ge.yawKick*=.972,ge.fovKick*=.96,O<1?requestAnimationFrame(Y):k()}requestAnimationFrame(Y)})}function Ve(q=1,L=420){if(!K||!w||!t.current)return;const oe=window.innerWidth,ce=window.innerHeight,T=performance.now()+L;function _(){if(performance.now()>T){A(E,oe,ce);return}w.clearRect(0,0,oe,ce),y(E);const U=5+Math.floor(Math.random()*9*q);for(let Y=0;Y<U;Y++){const j=Math.random()*ce,O=4+Math.random()*56*q,V=(Math.random()-.5)*150*q;try{w.drawImage(t.current,0,j,oe,O,V,j,oe,O)}catch{}}w.globalCompositeOperation="screen";const k=Math.round(6*q);for(let Y=0;Y<k;Y++){const j=Math.random()*ce;w.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],w.globalAlpha=.35+Math.random()*.35,w.lineWidth=.6+Math.random()*1.8,w.beginPath(),w.moveTo(0,j),w.lineTo(oe,j),w.stroke()}if(w.globalCompositeOperation="source-over",w.globalAlpha=1,Math.random()<q*.14){w.globalAlpha=.5;for(let Y=0;Y<240;Y++)w.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",w.fillRect(Math.random()*oe,Math.random()*ce,2,2);w.globalAlpha=1}requestAnimationFrame(_)}_()}function dt(q=1,L=340){if(!K||!w)return;const oe=window.innerWidth,ce=window.innerHeight,T=oe/2,_=ce/2,D=14+Math.floor(14*q),U=Array.from({length:D},()=>Math.random()*Math.PI*2),k=performance.now();function Y(){const O=(performance.now()-k)/L;if(O>=1){A(E,oe,ce);return}w.save(),w.globalCompositeOperation="screen",U.forEach(V=>{const re=30+O*340,he=re+100+Math.random()*170,de=T+Math.cos(V)*re,le=_+Math.sin(V)*re,ve=T+Math.cos(V)*he,Se=_+Math.sin(V)*he;w.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",w.globalAlpha=(1-O)*(.3+Math.random()*.34)*q,w.lineWidth=1.2+Math.random()*2,w.beginPath(),w.moveTo(de,le),w.lineTo(ve,Se),w.stroke()}),w.restore(),requestAnimationFrame(Y)}Y()}async function ht(q=900){const L=window.innerWidth,oe=window.innerHeight;if(!w)return;const ce=performance.now(),T=b.map(()=>Math.random()*.25);await new Promise(_=>{function D(){if(m){_();return}const U=Math.min(1,(performance.now()-ce)/q);w.clearRect(0,0,L,oe),b.forEach((k,Y)=>{const j=Math.min(1,Math.max(0,(U-T[Y])/(1-T[Y])));if(j<=0)return;const O=k.pts,V=O.length-1,re=j*V;w.lineWidth=k.width*(1+U*.45),w.strokeStyle=k.color,w.globalAlpha=.65+U*.32,w.shadowColor=k.color,w.shadowBlur=3+U*6,w.beginPath(),w.moveTo(O[0][0],O[0][1]);for(let le=0;le<Math.floor(re);le++)w.lineTo(O[le+1][0],O[le+1][1]);const he=Math.floor(re),de=re-he;if(he<V&&de>0){const[le,ve]=O[he],[Se,Ue]=O[he+1];w.lineTo(le+(Se-le)*de,ve+(Ue-ve)*de)}w.stroke()}),w.globalAlpha=1,w.shadowBlur=0,U<1?requestAnimationFrame(D):_()}D()})}async function mt(){ge.impactT=.55,P(!0),Z&&(Z.spawn(0,-.05,-2,28),Z.spawn(-1.45,-.08,.15,16),Z.spawn(1.45,-.08,.15,16)),Ve(1.6,340),dt(1.4,260),await os(160)}async function Mt(){P(!0);const q=c.current;if(!q)return;q.innerHTML="";const L=window.innerWidth,oe=window.innerHeight,ce=12,T=8,_=L/ce,D=oe/T,U=L/2,k=oe/2,Y=[];for(let j=0;j<T;j++)for(let O=0;O<ce;O++){const V=O*_,re=j*D,he=()=>(Math.random()-.5)*16,de=document.createElement("div");de.className="fincine-shard",de.style.left=V+"px",de.style.top=re+"px",de.style.width=_+2+"px",de.style.height=D+2+"px",de.style.clipPath=`polygon(${he()}px ${he()}px, ${_+he()}px ${he()}px, ${_+he()}px ${D+he()}px, ${he()}px ${D+he()}px)`,q.appendChild(de);const le=V+_/2-U,ve=re+D/2-k,Se=Math.hypot(le,ve)||1;Y.push({div:de,dx:le/Se,dy:ve/Se,delay:Se/Math.max(L,oe)*200+Math.random()*70})}Y.forEach(({div:j,dx:O,dy:V,delay:re})=>{const he=70+Math.random()*160,de=460+Math.random()*460,le=(Math.random()-.5)*460;j.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${O*he}px, ${V*he-22}px) rotate(${le*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${O*he*1.4}px, ${V*he+de}px) rotate(${le}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:re,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await os(1530),q.innerHTML=""}async function ot(){if(N(window.innerWidth,window.innerHeight),Ie(),R(),s.current&&s.current.classList.add("fincine-on"),await os(900),!m){for(let q=0;q<g.length&&!m;q++){const L=g[q];E=L.crack,r.current&&(r.current.innerHTML=L.final?L.sub:`${L.sub} · рассинхрон канала <b>${L.crack}/4</b>`),Ge(q),ge.focusZ=as(q),L.final&&(ge.focusY=8);const oe=q%2===0?1:-1;if(L.final){const ce=as(q)+nd+280;if(await $e(ce,0,Ca[q]??2200,.35,oe),m||(Je(.4+L.crack*.2),Ve(Math.min(1.5,.45+L.crack*.27),300),A(E,window.innerWidth,window.innerHeight),await os(700),await $e(as(q)-wM,-150,950,.5,oe),m))return}else{const ce=oe*70,T=as(q)+nd;if(L.crack>=2&&setTimeout(()=>{m||(ge.engineOutT=.5)},Ca[q]*.4),await $e(T,ce,Ca[q]??2200,.55+L.crack*.1,oe),m)return}Je(.4+L.crack*.2),Ve(Math.min(1.5,.45+L.crack*.27),L.final?360:240+L.crack*30),L.final||dt(.8+L.crack*.2,300+L.crack*20),L.crack>=3&&P(!0),A(E,window.innerWidth,window.innerHeight)}m||(await mt(),!m&&(await ht(850),!m&&(await os(140),await Mt(),!m&&M())))}}return ot(),()=>{m=!0,window.removeEventListener("resize",qe),cancelAnimationFrame(H),pe.forEach(q=>q.dispose()),z==null||z.disposables.forEach(q=>q.dispose()),I==null||I.dispose();try{f==null||f.pause()}catch{}}},[]),a.jsxs("div",{className:"fincine-root",onClick:()=>h.current(),children:[a.jsx("canvas",{ref:t,className:"fincine-gl"}),a.jsx("canvas",{ref:i,className:"fincine-crack"}),a.jsx("div",{ref:c,className:"fincine-shatter-layer"}),a.jsx("div",{className:"fincine-vignette"}),a.jsx("div",{className:"fincine-scanlines"}),a.jsx("div",{ref:o,className:"fincine-noise"}),a.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!p,children:[a.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),a.jsx("div",{ref:r,className:"fincine-sub"})]}),a.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),a.jsx(jo,{}),a.jsx("audio",{ref:l,src:"/quiz-party/intro.mp3",preload:"auto"})]})}function RM(n){const e=new Map;n.words.forEach((l,u)=>{for(let d=0;d<l.word.length;d++){const h=l.dir==="down"?l.row+d:l.row,p=l.dir==="across"?l.col+d:l.col,m=`${h},${p}`,x=e.get(m)??{r:h,c:p,words:[],ch:l.word[d].toUpperCase()};x.words.push(u),d===0&&(x.num=l.number),e.set(m,x)}});const t=[...e.values()],i=l=>n.words.findIndex(u=>u.number===l),s=l=>n.words[i(l)],r=l=>{const u=s(l),d=i(l);return u?t.filter(h=>h.words.includes(d)).sort((h,p)=>u.dir==="down"?h.r-p.r:h.c-p.c):[]},o=t.map(l=>l.r),c=t.map(l=>l.c);return{grid:n,cells:t,nums:[...n.words.map(l=>l.number)].sort((l,u)=>l-u),W:s,wordCells:r,cellNums:l=>l.words.map(u=>n.words[u].number),dirRu:l=>{var u;return((u=s(l))==null?void 0:u.dir)==="down"?"по вертикали":"по горизонтали"},bb:t.length?{r0:Math.min(...o),r1:Math.max(...o),c0:Math.min(...c),c1:Math.max(...c)}:{r0:0,r1:0,c0:0,c1:0}}}const Mr=n=>Xh(n).replace(/\s/g,"");function NM(n,e,t){var o;const i=Mr(e??""),s=i?n.words.filter(c=>Mr(c.word)===i):[];if(s.length===1)return s[0].number;const r=n.words.find(c=>c.number===t+1);return r&&(!s.length||s.includes(r))?r.number:((o=s[0])==null?void 0:o.number)??(r==null?void 0:r.number)??null}function PM(n,e){return e.map((t,i)=>NM(n,t.answer.mode==="crossword_word"?t.answer.word:void 0,i))}function LM(n,e){const t=Mr(n).toUpperCase(),i=Mr(e).toUpperCase();return t.length>i.length+2?null:[...t].map((s,r)=>({ch:s,st:r>=i.length?"extra":s===i[r]?"ok":"bad"}))}const yr=n=>n.length>160?" xl xxl":n.length>70?" xl":n.length>40?" lg":"",Na={review:560,complete:660};function IM(n,e,t={}){const i=n.c1-n.c0+1,s=n.r1-n.r0+1;if(e==="question"){const c=t.right??1520,l=1920-c,u=Math.max(200,(t.bottom??876)-96),d=Math.max(24,Math.min(78,Math.floor((c-l)/i),Math.floor(u/s))),h=(l+c)/2;return{P:d,OX:h-i*d/2,OY:96+Math.max(0,(u-s*d)/2)}}if(e==="complete"){const o=Math.max(24,Math.min(66,Math.floor((t.maxW??924)/i),Math.floor(660/s)));return{P:o,OX:70,OY:200+Math.max(0,(660-s*o)/2)}}const r=Math.max(22,Math.min(56,Math.floor((t.maxW??784)/i),Math.floor(560/s)));return{P:r,OX:44,OY:310+Math.max(0,(560-s*r)/2)}}function Iu(n,e){const i=Math.max(40,Math.min(88,Math.floor(680/Math.max(1,n)))),s=Math.max(34,Math.min(62,Math.floor(704/Math.max(1,e+2)))),r=Math.min(s-8,i-10);return{ROW0:392,ROWH:i,COL:s,lt:r}}function DM(n,e){const t=Math.max(40,Math.min(92,Math.floor(740/Math.max(1,n)))),i=Math.max(26,Math.min(40,Math.floor(t-12),Math.floor(560/Math.max(1,e))-8));return{top:300,step:t,pip:i}}function UM(n){const e=n%10,t=n%100;return e===1&&t!==11?"команда":e>=2&&e<=4&&(t<12||t>14)?"команды":"команд"}const ko=1e3,us=292,FM=Array.from({length:70},(n,e)=>({x:e*977%1900+10,y:e*613%1040+20,s:2+e%3,d:e%9*.6})),OM=[{x:60,y:80,w:860,h:860}];function Du(n,e,t){const i=IM(n.bb,e,t);return{g:i,cx:o=>i.OX+(o-n.bb.c0)*i.P+i.P/2,cy:o=>i.OY+(o-n.bb.r0)*i.P+i.P/2,orb:i.P*(e==="complete"?.72:.62)}}function Uu({m:n,mode:e,title:t,qn:i,qcount:s,cur:r,next:o=null,past:c,shown:l,curLit:u,clue:d,parts:h,lifts:p,tally:m,n:x,total:M,rootRef:g,cls:f="",bottom:v,right:w,maxW:b,side:E,timer:S=!0}){var ae;const N=e!=="question",y=e==="complete",{cx:A,cy:P,orb:R}=Du(n,e,{bottom:v,right:w,maxW:b}),I=r!=null?n.wordCells(r):[],B=new Set(I.map(z=>`${z.r},${z.c}`)),F=new Set(o!=null?n.wordCells(o).map(z=>`${z.r},${z.c}`):[]),H=z=>n.wordCells(z).map((Z,Me)=>`${Me?"L":"M"} ${A(Z.c)} ${P(Z.r)}`).join(" "),K=r!=null?((ae=n.W(r))==null?void 0:ae.word)??"":"",$=Iu(Math.max(1,...(h??[]).map(z=>z.rows.length)),Math.max(K.length,...(h??[]).map(z=>{var Z;return((Z=n.W(z.num))==null?void 0:Z.word.length)??0}))),ne=$.ROWH===88&&$.COL===62&&$.lt===54,Q=ne?void 0:{"--lt":`${$.lt}px`,"--ltf":`${Math.round($.lt*.555)}px`,"--gap":`${$.COL-$.lt}px`},ie=z=>{const Z=n.cellNums(z),Me=`${z.r},${z.c}`,Ie=Z.some(qe=>l(qe)),Ne=B.has(Me)&&!y;return y?"rev":Ne?u?"rev":N?"seal":"act":Ie?"rev":Z.some(qe=>c(qe))?"seal":"cold"},pe=z=>z.rows.map((Z,Me)=>a.jsxs("div",{className:`cwC-trow ${z.cls}`,"data-ti":Me,style:{top:$.ROW0+Me*$.ROWH-$.ROWH/2,...ne?null:{height:$.ROWH,...Q},...z.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-nm ${z.cls}`,style:{color:Z.color},children:Z.name}),a.jsx("span",{className:"cwC-cells",children:z.covered?a.jsx("span",{className:"cwC-al",children:Array.from({length:n.W(z.num).word.length},(Ie,Ne)=>a.jsx("i",{className:"cwC-lt cov",children:a.jsx("b",{className:"ch",style:{opacity:0},children:"•"})},Ne))}):a.jsx(kM,{answer:Z.answer,word:n.W(z.num).word,judged:z.judged})}),!z.covered&&z.judged&&a.jsx(zM,{v:Z.verdict})]},Z.key)),fe=z=>a.jsxs("div",{className:`cwC-ans ${z.cls}`,style:{top:us-44,...Q,...z.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-lab ${z.cls}`,children:"Правильный ответ"}),a.jsx("span",{className:"cwC-cells",children:a.jsx("span",{className:"cwC-al",children:[...n.W(z.num).word.toUpperCase()].map((Z,Me)=>a.jsx("i",{className:"cwC-lt ok big",children:a.jsx("b",{className:"ch",style:z.covered?{opacity:0}:void 0,children:Z})},Me))})})]}),Re=z=>a.jsxs("div",{className:`cwC-rec ${z.cls}${yr(z.clue)}`,style:z.hidden?{opacity:0}:void 0,children:[a.jsxs("em",{children:["Разбор · слово ",z.num," · ",n.dirRu(z.num),z.recExtra??""]}),z.clue,z.note?a.jsx("span",{className:"cwC-rnote",children:z.note}):null]}),ge=m?DM(m.rows.length,n.nums.length):null,Ae=!ge||ge.step===92&&ge.pip===40;return a.jsxs(gn,{rects:OM,n:x,rootRef:g,cls:`s3 cw cwC ${f}`,children:[Ho(t,i,s),a.jsx("div",{className:"cwC-dust","aria-hidden":!0,children:FM.map((z,Z)=>a.jsx("i",{style:{left:z.x,top:z.y,width:z.s,height:z.s,animationDelay:`${z.d}s`}},Z))}),a.jsxs("div",{className:"cwC-map",children:[a.jsxs("svg",{className:"cwC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[n.nums.map(z=>{const Z=y||c(z),Me=z===r&&!y;return a.jsx("path",{className:`cwC-line${Me?" now":Z?" old":""}`,"data-n":z,...z===o?{"data-nx":1}:{},d:H(z)},z)}),p&&I.map((z,Z)=>{const Me=ko+Z*$.COL+$.COL/2,Ie=A(z.c),Ne=P(z.r);return a.jsx("path",{className:"cwC-beam","data-k":Z,d:`M ${Ie} ${Ne} C ${Ie+120} ${Ne} ${Me-160} ${us} ${Me} ${us}`},Z)})]}),n.cells.map(z=>{const Z=n.cellNums(z),Me=`${z.r},${z.c}`,Ie=B.has(Me)&&!y,Ne=I.findIndex(qe=>qe===z);return a.jsxs("div",{className:`cwC-orb ${ie(z)}${z.words.length>1?" x":""}`,"data-n":Z.join(" "),style:{left:A(z.c)-R/2,top:P(z.r)-R/2,width:R,height:R,"--d":`${(z.r*3+z.c)%7*.5}s`},...Ie&&N?{"data-cur":1,"data-k":Ne,...Z.some(qe=>l(qe))?{"data-old":1}:{}}:{},...F.has(Me)?{"data-nx":1}:{},children:[z.words.length>1&&a.jsx("i",{className:"flare"}),a.jsx("span",{className:"core",children:a.jsx("b",{className:"ch",style:{fontSize:R*.56},children:z.ch})}),z.num&&a.jsx("em",{className:"num",style:{left:-R*.1,top:-R*.28},children:z.num})]},Me)})]}),E,!N&&d&&a.jsxs("div",{className:"cwC-clue",children:[r!=null&&a.jsxs("div",{className:"k",children:["слово ",r," · ",n.dirRu(r)," · ",K.length," ",BM(K.length)]}),a.jsx("div",{className:`t${yr(d.text)}`,children:d.text}),d.answer?a.jsx("div",{className:"cwC-open",children:d.answer}):null,d.note?a.jsx("div",{className:"cwC-note",children:d.note}):null]}),N&&!y&&h&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cwC-veil"}),h.map(z=>a.jsxs(G.Fragment,{children:[Re(z),fe(z),pe(z),z.cls==="p1"&&p&&I.map((Z,Me)=>a.jsx("div",{className:"cwC-lift","data-k":Me,style:{left:ko+Me*$.COL,top:us-$.lt/2,...ne?null:{width:$.lt,height:$.lt,...Q}},children:a.jsx("i",{className:"cwC-lt ok big"})},"l"+Me))]},z.cls+z.num))]}),y&&m&&a.jsxs("div",{className:"cwC-tally",children:[a.jsxs("div",{className:"cwC-rec pd",children:[a.jsx("em",{children:"Кроссворд разгадан"}),"Угадано слов из ",n.nums.length]}),m.rows.map((z,Z)=>a.jsxs("div",{className:"cwC-tr",style:{top:ge.top+Z*ge.step,...Ae?null:{height:Math.min(80,ge.step),"--pip":`${ge.pip}px`,"--pipf":`${Math.round(ge.pip/2)}px`}},children:[a.jsx("span",{className:"cwC-nm",style:{color:z.color},children:z.name}),a.jsx("span",{className:"pips",children:n.nums.map((Me,Ie)=>a.jsx("i",{className:z.pips[Ie]===!0?"ok":z.pips[Ie]===!1?"no":"nil",children:Me},Me))}),a.jsx("b",{className:"sum",children:z.sum})]},z.key))]}),!N&&S&&a.jsx(Vo,{n:x,total:M})]})}const BM=n=>{const e=n%10,t=n%100;return e===1&&t!==11?"буква":e>=2&&e<=4&&(t<12||t>14)?"буквы":"букв"};function kM({answer:n,word:e,judged:t=!0}){if(n==null)return a.jsx("span",{className:"cwC-none",children:"не ответили"});const i=LM(n,e);if(!i)return a.jsx("span",{className:`cwC-txt${yr(n)}`,children:a.jsx("b",{className:"ch",children:n})});const s=Math.max(e.length,i.length);return a.jsx("span",{className:"cwC-al",children:Array.from({length:s},(r,o)=>{const c=i[o];return a.jsx("i",{className:`cwC-lt ${c?t?c.st:"neu":"miss"}`,children:a.jsx("b",{className:"ch",children:(c==null?void 0:c.ch)??""})},o)})})}function zM({v:n}){return a.jsx("span",{className:`cwC-mk ${n===!0?"ok":n===!1?"no":"nil"}`,children:n===!0?a.jsxs(a.Fragment,{children:[a.jsx("b",{children:"✓"}),a.jsx("em",{children:"+1"})]}):n===!1?a.jsx("b",{children:"✗"}):a.jsx("b",{children:"—"})})}function GM(n,e,t){const i=yr(n),s=i.includes("xxl")?31:i.includes("xl")?38:i.includes("lg")?44:52,o=40+Math.max(1,Math.ceil(n.length/(1260/(s*.52))))*s*1.14+(e?62:0)+(t?Math.ceil(t.length/90)*30:0);return Math.round(1046-o-24)}function jM({m:n,title:e,qn:t,qcount:i,cur:s,past:r,clue:o,answer:c,note:l,n:u,total:d,side:h,sideN:p}){const m=G.useRef(null),x=G.useMemo(()=>nt.utils.selector(m),[]),M=GM(o,!!c,c?l:""),g=p?1300:void 0;G.useLayoutEffect(()=>{const b=nt.timeline();return b.fromTo(x(".cwC-dust i"),{opacity:0},{opacity:1,duration:1,stagger:.01},0).fromTo(x(".cwC-line"),{strokeDashoffset:900},{strokeDashoffset:0,duration:1.2,stagger:.08,ease:"power2.out"},.2).fromTo(x(".cwC-orb"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,stagger:{each:.016,from:"random"},ease:"back.out(2)"},.4).fromTo(x(".cwC-clue"),{y:30,opacity:0},{y:0,opacity:1,duration:.7},1.2).fromTo(x(".cwC-side"),{opacity:0},{opacity:1,duration:.7},.8),()=>{b.kill()}},[]);const f=!!c,v=G.useRef(f);G.useLayoutEffect(()=>{if(!f||v.current){v.current=f;return}v.current=!0;const b=nt.timeline();return b.fromTo(x(".cwC-orb.rev .ch"),{opacity:0},{opacity:1,duration:.4,stagger:.1},0).fromTo(x(".cwC-open, .cwC-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5,stagger:.15},.3),()=>{b.kill()}},[f]);const w=p>0&&h?a.jsx("div",{className:`cwC-side${p>2?" grid":""}`,style:{left:1340,right:40,top:110,height:Math.max(180,M-130)},children:h}):null;return a.jsx(Uu,{m:n,mode:"question",title:e,qn:t,qcount:i,cur:s,past:b=>r.has(b),shown:()=>!1,curLit:f,clue:{text:o,answer:c??void 0,note:c&&l?l:void 0},n:u,total:d,rootRef:m,cls:`st-question${f?" open":""}`,bottom:M,right:g,side:w})}function HM({m:n,title:e,qn:t,qcount:i,cur:s,reviewed:r,revealed:o,checked:c,clue:l,note:u,rows:d,answered:h,tally:p,side:m,sideN:x}){var I;const M=G.useRef(null),g=G.useMemo(()=>nt.utils.selector(M),[]),[f,v]=G.useState(o?"open":"covered"),[w,b]=G.useState(!1);G.useEffect(()=>{o?f==="covered"&&v("anim"):v("covered")},[o]);const E=c&&f==="open",S=w&&p?"complete":"review",N=s!=null?((I=n.W(s))==null?void 0:I.word)??"":"",y=Iu(d.length,N.length);G.useLayoutEffect(()=>{const B=nt.timeline();return B.fromTo(g(".cwC-veil"),{opacity:0},{opacity:1,duration:.6},0).fromTo(g(".cwC-rec, .cwC-lab, .cwC-nm, .cwC-trow, .cwC-ans, .cwC-side"),{opacity:0,y:-14},{opacity:1,y:0,duration:.5,stagger:.03},.1),()=>{B.kill()}},[]),G.useLayoutEffect(()=>{if(f!=="anim"||s==null)return;const B=n.wordCells(s),F=Math.max(1,B.length),{cx:H,cy:K,orb:$}=Du(n,"review",{maxW:Na.review}),ne=nt.timeline({onComplete:()=>v(fe=>fe==="anim"?"open":fe)});ne.fromTo(g(".cwC-ans .ch, .cwC-trow .ch"),{opacity:0},{opacity:0,duration:.01},0).fromTo(g(".cwC-ans .cwC-lt, .cwC-trow .cwC-lt, .cwC-trow .cwC-none, .cwC-trow .cwC-txt"),{opacity:0,scale:.4},{opacity:0,scale:.4,duration:.01},0);const Q=Math.min(.12,.5/F);B.forEach((fe,Re)=>{const ge=g(`.cwC-lift[data-k="${Re}"]`)[0],Ae=H(fe.c)-(ko+Re*y.COL+y.lt/2),ae=K(fe.r)-us,z=.1+Re*Q,Z=z+.9;ge&&ne.fromTo(ge,{x:Ae,y:ae,scale:$/y.lt,opacity:1},{keyframes:[{x:Ae*.4,y:ae*.4-60,scale:1.1,duration:.5,ease:"sine.inOut"},{x:0,y:0,scale:1,duration:.4,ease:"power2.out"}]},z).to(ge,{opacity:0,duration:.15},Z),ne.fromTo(g(`.cwC-beam[data-k="${Re}"]`),{strokeDashoffset:600,opacity:0},{strokeDashoffset:0,opacity:.9,duration:.5,ease:"power1.out"},z).to(g(`.cwC-beam[data-k="${Re}"]`),{opacity:0,duration:.4},Z-.1).fromTo(g(`.cwC-ans .cwC-lt:nth-child(${Re+1})`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2},Z).fromTo(g(`.cwC-ans .cwC-lt:nth-child(${Re+1}) .ch`),{opacity:0},{opacity:1,duration:.2},Z).fromTo(g(`.cwC-orb[data-cur][data-k="${Re}"]`),{"--on":0,"--glow":.6},{"--on":1,"--glow":1,duration:.35,ease:"power1.out"},Z)});const ie=Math.max(.1+(F-1)*Q+.9+.5,2),pe=Math.min(.55,2.4/Math.max(1,d.length));return d.forEach((fe,Re)=>{ne.fromTo(g(`.cwC-trow[data-ti="${Re}"] .cwC-lt, .cwC-trow[data-ti="${Re}"] .cwC-none, .cwC-trow[data-ti="${Re}"] .cwC-txt`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.3,stagger:.04,ease:"back.out(2)"},ie+Re*pe).fromTo(g(`.cwC-trow[data-ti="${Re}"] .ch`),{opacity:0},{opacity:1,duration:.25,stagger:.04},ie+Re*pe+.1)}),ne.to({},{duration:.3}),()=>{ne.kill()}},[f]),G.useLayoutEffect(()=>{if(!E||S!=="review")return;const B=nt.timeline();return B.fromTo(g(".cwC-mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:.12,ease:"back.out(2.5)"},0),()=>{B.kill()}},[E]);const A=!!p&&E;G.useEffect(()=>{if(!A){b(!1);return}const B=setTimeout(()=>b(!0),8e3);return()=>clearTimeout(B)},[A]),G.useLayoutEffect(()=>{if(S!=="complete")return;const B=nt.timeline();return B.fromTo(g(".cwC-orb"),{"--glow":.4,scale:1},{"--glow":1,scale:1.12,duration:.5,yoyo:!0,repeat:1,stagger:{each:.02,from:"center"}},.2).fromTo(g(".cwC-tally > *"),{opacity:0,x:20},{opacity:1,x:0,duration:.45,stagger:.1},.6),()=>{B.kill()}},[S]);const P=f==="covered",R=s!=null?[{num:s,cls:"p1",covered:P,clue:l,judged:E,recExtra:P&&d.length?` · ответили ${h} ${UM(h)}`:"",note:E&&u?u:void 0,rows:d.map(B=>({...B,verdict:E?B.verdict:null}))}]:[];return a.jsx(Uu,{m:n,mode:S,title:e,qn:t,qcount:i,cur:s,past:B=>r.has(B),shown:B=>r.has(B),curLit:f==="open",parts:R,lifts:f==="anim",tally:S==="complete"&&p?{rows:p}:void 0,n:null,total:1,rootRef:M,cls:`st-${S==="complete"?"complete":"review"} rev`,timer:!1,maxW:S==="complete"?Na.complete:Na.review,side:S==="review"&&x>0&&m?a.jsx("div",{className:`cwC-side${x>1?" row":""}`,style:{left:44,top:96,width:540,height:190},children:m}):void 0})}const VM=n=>/\.(mp3|mp4|webm|wav)$/i.test(n),ad=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n),cc=n=>{var e;return((e=n.settings)==null?void 0:e.grid)??null};function Fu(n){const e=cc(n),t=G.useMemo(()=>RM(e),[e]),i=G.useMemo(()=>PM(e,n.questions),[e,n.questions]);return{m:t,nums:i}}const Ou=(n,e)=>a.jsx("div",{className:"cwC-sc",children:a.jsx("img",{src:n,alt:""})},e);function WM({pack:n,round:e,q:t,qIndex:i,qCount:s,gameState:r,effectsSlot:o,actionsSlot:c}){var y;const{m:l,nums:u}=Fu(e),d=r.timer_started_at,h=yd(d,e.timer_seconds,!0),m=((y=n.settings)!=null&&y.answers_reveal&&e.answers_reveal==="after_question",e.answers_reveal??"after_round")==="after_question"&&r.reveal,x=new Set(u.slice(0,i).filter(A=>A!=null)),M=t.media.question??[],g=t.media.hidden?[]:M.filter(A=>!VM(A)),f=M.filter(A=>/\.(mp4|webm)$/i.test(A)),v=t.media.answer??[],w=m?v.filter(A=>!ad(A)):[],b=m?v.find(ad):void 0,E=w.length?w:g,S=t.answer.mode==="crossword_word"?t.answer.word:"",N=[...E.slice(0,4).map((A,P)=>Ou(He(A),P)),...t.media.hidden?[]:f.map((A,P)=>a.jsx("div",{className:"cwC-sc",children:a.jsx(Cc,{src:He(A),hidden:!1,waitFor:!!t.media.voice,go:!!d})},"v"+P))];return a.jsxs(a.Fragment,{children:[a.jsx(jo,{}),o,b&&a.jsx(Ui,{src:He(b)}),t.media.hidden&&f.map((A,P)=>a.jsx(Cc,{src:He(A),hidden:!0,waitFor:!!t.media.voice,go:!!d},P)),a.jsx(jM,{m:l,title:e.title_lines.join(" "),qn:i+1,qcount:s,cur:u[i]??null,past:x,clue:t.question_text.trim(),answer:m?S.toUpperCase():null,note:t.answer_note??"",n:d?h.left:e.timer_seconds,total:e.timer_seconds,side:N,sideN:N.length}),c]})}function $M({pack:n,round:e,q:t,step:i,answers:s,teams:r,allTeams:o,revealed:c,checked:l,paper:u,effects:d,imgs:h,video:p,actions:m}){const{m:x,nums:M}=Fu(e),g=(A,P)=>P?P.is_correct??ci(A.answer,P.answer_text):null,f=s.filter(A=>A.question_ref===`q-${t.id}`),v=[...r,...o.filter(A=>!r.some(P=>P.id===A.id)&&s.some(P=>P.team_id===A.id))],w=A=>Gi(Rn(A)),b=u?[]:v.map(A=>{var I;const P=f.find(B=>B.team_id===A.id),R=((I=P==null?void 0:P.answer_text)==null?void 0:I.trim())||null;return{key:A.id,name:`${"icon"in A&&A.icon?`${A.icon} `:""}${A.name}`,color:w(A.color),answer:R,verdict:g(t,P)}}),E=f.filter(A=>{var P;return(P=A.answer_text)==null?void 0:P.trim()}).length,S=new Set(M.slice(0,i).filter(A=>A!=null)),N=i>=e.questions.length-1;let y=null;return N&&!u&&v.length&&(y=v.map((A,P)=>{const R=x.nums.map(I=>{const B=M.indexOf(I),F=e.questions[B];return F?g(F,s.find(H=>H.question_ref===`q-${F.id}`&&H.team_id===A.id)):null});return{key:A.id,name:A.name,color:w(A.color),pips:R,sum:R.filter(I=>I===!0).length,i:P}}).sort((A,P)=>P.sum-A.sum||A.i-P.i)),a.jsxs(a.Fragment,{children:[d,a.jsx(HM,{m:x,title:e.title_lines.join(" "),qn:i+1,qcount:e.questions.length,cur:M[i]??null,reviewed:S,revealed:c,checked:l,clue:t.question_text.trim(),note:t.answer_note??"",rows:b,answered:E,tally:y,side:[...p?[a.jsx("div",{className:"cwC-sc",children:p},"v")]:[],...h.slice(0,p?1:2).map((A,P)=>Ou(He(A),P))],sideN:Math.min(2,h.length+(p?1:0))}),m]})}const Pa={top:92,bottom:1050,head:56};function XM(n){if(n<=7)return{cols:1,rowH:null,gap:8,nameFs:21,txtFs:32,mk:56,txtLines:2,padL:44};const e=n<=12?1:2,t=Math.ceil(n/e),i=n<=12?6:5,s=Math.floor((Pa.bottom-Pa.top-Pa.head-i*(t-1))/t),r=Math.min(1,s/118);return e===1?{cols:e,rowH:s,gap:i,nameFs:Math.round(Math.max(15,21*Math.sqrt(r))),txtFs:Math.round(Math.max(20,32*r)),mk:Math.round(Math.max(30,56*r)),txtLines:s>=90?2:1,padL:34}:{cols:e,rowH:s,gap:i,nameFs:s>=60?15:13,txtFs:s>=60?20:17,mk:s>=60?30:24,txtLines:1,padL:22}}const dn={width:1800,gap:10,labH:100};function Bu(n){if(n<=0)return{cols:0,rows:0,cw:null,rowH:0,gap:0,nameFs:17,txtFs:25,mk:34,lift:0,height:0};if(n===6)return{cols:6,rows:1,cw:null,rowH:dn.labH,gap:10,nameFs:17,txtFs:25,mk:34,lift:0,height:dn.labH};const e=n<=6?1:n<=12?2:n<=24?3:4,t=Math.ceil(n/e),i=(dn.width-dn.gap*5)/6,s=Math.min(e===1?i:440,Math.floor((dn.width-dn.gap*(t-1))/t)),r=e===1?dn.labH:e===2?56:e===3?40:32,o=e===1?10:6,c=e*r+(e-1)*o,l=e===1?[17,25,34]:e===2?[15,21,30]:e===3?[13,17,24]:[12,15,22];return{cols:t,rows:e,cw:s,rowH:r,gap:o,nameFs:l[0],txtFs:l[1],mk:l[2],lift:Math.max(0,c-dn.labH),height:c}}function lc(n,e,t,i,s=Math.round(t*.6),r=.52){const o=Math.max(1,n.length);for(let c=t;c>s;c-=1)if(Math.ceil(o*r*c/e)<=i)return c;return s}const ku="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",zu=(n,e)=>n.text==null?"nil":e?n.ok===!0?"ok":n.ok===!1?"no":"un":"un",Gu=n=>n==="ok"?"✓":n==="no"?"✗":n==="nil"?"—":null,ju=n=>n.stake!=null&&n.stake!==0&&n.text!=null?a.jsxs("small",{className:"stk",children:[" · ",n.stake]}):null;function qM({rows:n,phase:e="all",judged:t=!0,lay:i,count:s}){const r=!!i,o=i?{"--rh":`${i.rowH??118}px`,"--gap":`${i.gap}px`,"--nfs":`${i.nameFs}px`,"--tfs":`${i.txtFs}px`,"--mks":`${i.mk}px`,"--tl":i.txtLines,"--pl":`${i.padL}px`,"--cols":i.cols}:void 0,c=i?(580-(i.cols-1)*12)/i.cols-i.padL-i.mk-30:0;return a.jsxs("div",{className:`s4-teams${r?` g c${i.cols}`:""}`,style:o,children:[a.jsxs("div",{className:"s4-th",children:["Ответы команд",s!=null&&a.jsx("span",{className:"s4-cnt",children:s})]}),n.map((l,u)=>{const d=zu(l,t),h=e==="all"||t?Gu(d):null,p=l.text??"не ответили",m=r&&l.text!=null?lc(p,c,i.txtFs,i.txtLines):void 0;return a.jsxs("div",{className:`s4-ta ${d}`,"data-i":u,children:[a.jsx("svg",{className:"s4-ta-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:ku})}),a.jsx("span",{className:"nm",style:{color:l.color},children:l.name}),e!=="open"&&a.jsx("span",{className:"dots",children:"• • •"}),e!=="dots"&&a.jsxs("span",{className:"txt",style:m&&m!==i.txtFs?{fontSize:m}:void 0,children:[p,ju(l)]}),(e==="all"||h!=null)&&a.jsx("i",{className:"mk",children:h})]},l.key)})]})}function Hu({rows:n,top:e=958,phase:t="all",judged:i=!0,lay:s,count:r}){const o=!!s,c={top:e};s&&Object.assign(c,{"--cols":s.cols,"--cw":s.cw!=null?`${s.cw}px`:"1fr","--rh":`${s.rowH}px`,"--gap":`${s.gap}px`,"--nfs":`${s.nameFs}px`,"--tfs":`${s.txtFs}px`,"--mks":`${s.mk}px`});const l=s?s.cw??(dn.width-dn.gap*5)/6:0;return a.jsxs(a.Fragment,{children:[r!=null&&a.jsx("div",{className:"s4-scnt",style:{top:e-40},children:r}),a.jsx("div",{className:`s4-strip${o?` g r${s.rows}`:""}`,style:c,children:n.map(u=>{const d=zu(u,i),h=t==="all"||i?Gu(d):null,p=u.text??"не ответили",m=o&&u.text!=null?lc(p,l-s.mk-40,s.txtFs,1):void 0;return a.jsxs("div",{className:`s4-sl ${d}`,children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:ku})}),a.jsx("span",{className:"nm",style:{color:u.color},children:u.name}),o&&t!=="open"&&t!=="all"&&a.jsx("span",{className:"dots",children:"• • •"}),t!=="dots"&&a.jsxs("span",{className:"txt",style:m&&m!==s.txtFs?{fontSize:m}:void 0,children:[p,ju(u)]}),(t==="all"||h!=null)&&a.jsx("i",{className:"mk",children:h})]},u.key)})})]})}const YM="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",KM={text:"revtext",mc:"revmc",img:"revimg",imgopt:"revimgopt"},zo={top:84,width:1160};function Vu(n){const e=(t,i)=>Math.ceil(Math.max(1,n.length)*.5*t/zo.width)<=i;for(const[t,i]of[[40,3],[34,4],[30,5]])if(e(t,i))return t;return 26}const ZM=(n,e=Vu(n))=>zo.top+Math.ceil(Math.max(1,n.length)*.5*e/zo.width)*e*1.14;function La(n,e,t,i,s=40){const r=n.toUpperCase().split(/\s+/).filter(Boolean);for(let o=t;o>=s;o-=2){const c=d=>d.length*(.66*o+6);if(r.some(d=>c(d)>e))continue;let l=1,u=0;for(const d of r){const h=(u?.35*o:0)+c(d);u&&u+h>e?(l++,u=c(d)):u+=h}if(l*o<=i)return{fs:o,lines:l}}return{fs:s,lines:3}}function JM(n,e=0){var p;const t=Vu(n.question),i=ZM(n.question,t),s=Math.max(190,Math.round(i+22));let r=[],o=[];if(n.kind==="img"&&n.photos.length){const m=n.photos.slice(0,4),x=((p=n.captions)!=null&&p.length?620:710)-s;if(m.length===1&&!m[0].video)r=[ir(m[0],380+e,s,640,880-s)];else if(m.length===1)r=[ir(m[0],650+e,s,900,x)];else{const g=m.reduce((E,S)=>E+S.w/S.h,0),f=Math.round(Math.min(x,(1160-40*(m.length-1))/g)),v=m.map(E=>Math.round(E.w/E.h*f)),w=v.reduce((E,S)=>E+S,0)+40*(m.length-1);let b=Math.round(650+e-w/2);r=v.map(E=>{const S={x:b,y:s,w:E,h:f};return b+=E+40,S})}o=m.map(M=>M.video?YM:M.src)}if(n.kind==="imgopt"&&n.photos.length){const m=n.photos.length,x=m<=3?m:m===4?2:3,M=Math.ceil(m/x),g=1200/x,f=(890-s+40)/M;r=n.photos.map((v,w)=>ir(v,60+e+g*(w%x+.5),Math.round(s+Math.floor(w/x)*f),g-80,Math.min(520,f-40))),o=n.photos.map(v=>v.src)}const c=Math.max(1,n.options.length),l=1160/c,u=n.kind==="img"&&n.photos.length===1&&!n.photos[0].video,d=u?La(n.answer,540,330,104):n.kind==="img"?La(n.answer,1160,104,150):La(n.answer,1160,150,250),h=u?Math.max(s+70,s+Math.round(r[0].h/2)-40):0;return{side:u,sideTop:h,dx:e,recallFs:t,frame:{rects:r,srcs:o},ans:d,ansBase:n.kind==="img"?104:150,cx:m=>70+e+l*(m+.5),optW:Math.min(270,Math.round(l-20)),flower:Math.min(1,l/290),optFs:Math.min(32,...n.options.map(m=>lc(m.text,Math.min(270,Math.round(l-20)),32,3,20,.56))),noteTop:n.kind==="text"?730:n.kind==="mc"?900:992}}function QM(n,e){n.fromTo(e(".s4-recall"),{opacity:0,y:-10},{opacity:1,y:0,duration:.5},.1)}function ey(n,e){n.fromTo(e(".s4-th, .s4-ta"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.07},.3).fromTo(e(".s4-ta .txt, .s4-ta .mk"),{opacity:0},{opacity:0,duration:.01},.3)}function ty(n,e,t){n.to(e(".s4-ta .dots"),{opacity:0,duration:.3,stagger:.06},t).fromTo(e(".s4-ta .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.07},t)}function ny(n,e,t,i=.2){n.fromTo(e(".s4-ta .mk"),{opacity:0,scale:0,rotation:-40},{opacity:1,scale:1,rotation:0,duration:.4,stagger:i,ease:"back.out(2.4)"},t)}const Wu=n=>n.replace(/\s/g,"").length;function iy(n,e,t,i,s,r=!1){const{R:o,k:c}=s,l=Wu(t.answer);if(t.kind==="text")return n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},o-.4).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},o).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},o+.1).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1.2},o+.6).fromTo(e(".s4-fl"),{scale:0,rotation:-60},{scale:1,rotation:0,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},o+l*c+.3),{show:o+.9,mark:o+l*c+1.2};if(t.kind==="mc"){const d=t.correct;return t.options.forEach((h,p)=>{p===d?n.fromTo(e(`.s4-mf[data-i="${p}"]`),{scale:1},{scale:1.25,svgOrigin:"0 0",duration:.9,ease:"back.out(2)"},o+.9).fromTo(e(`.s4-mf[data-i="${p}"] .pt`),{fill:"#c9b6ff"},{fill:"#ffd986",duration:.9},o+.9).fromTo(e(`.s4-halo[data-i="${p}"]`),{opacity:0,attr:{r:36}},{opacity:1,attr:{r:124},duration:.9,ease:"power2.out"},o+.9).fromTo(e(`.s4-opt[data-i="${p}"]`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.6},o+1):d>=0&&n.to(e(`.s4-mf[data-i="${p}"]`),{scale:.62,rotation:p%2?-16:16,svgOrigin:"0 0",duration:1,ease:"power2.inOut"},o+.2+p*.1).to(e(`.s4-mf[data-i="${p}"] .pt`),{fill:"#5d5a7a",duration:1},o+.2+p*.1).to(e(`.s4-opt[data-i="${p}"]`),{opacity:.45,duration:.8},o+.3+p*.1)}),n.fromTo(e(".s4-gl"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.3,ease:"power1.in"},o),{show:o+.9,mark:o+2.3}}if(t.kind==="img"){const d=s.lt??o+1.1,h=i.bloom.map((m,x)=>x),p=m=>Object.fromEntries(h.map(x=>[x,m]));return r&&h.length&&n.fromTo(i.grow,p(0),{...p(1),duration:.6,ease:"power2.out"},o).fromTo(i.reveal,p(0),{...p(1),duration:.6,ease:"power2.inOut"},o+.2),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o),h.length&&n.fromTo(i.bloom,p(0),{...p(1),duration:1.4,ease:"power1.out"},o+.6),n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},d-.3).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},d-.1).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},d).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1},d+.3),{show:d+.5,mark:d+1.9}}const u=t.correct;return t.photos.forEach((d,h)=>{h===u?n.fromTo(i.bloom,{[h]:0},{[h]:1,duration:1.4,ease:"power1.out"},o+.8):u>=0&&n.fromTo(i.reveal,{[h]:1},{[h]:0,duration:1.1,ease:"power2.in"},o+.2+h*.12)}),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o+.5).fromTo(e(".s4-capt"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},o+1.8),{show:o+1.4,mark:o+2.8}}const od=(n,e,t,i)=>Array.from({length:n},(s,r)=>a.jsx("g",{transform:`rotate(${r*360/n})`,children:a.jsx("ellipse",{className:"pt",cx:"0",cy:i,rx:e,ry:t})},r));function Ia(n){const e=n.toUpperCase().split(/\s+/).filter(Boolean);return e.length<=1?(e[0]??"").split("").map((t,i)=>a.jsx("span",{className:"l",children:t},i)):e.map((t,i)=>a.jsx("span",{className:"wd",children:t.split("").map((s,r)=>a.jsx("span",{className:"l",children:s},r))},i))}function sy({d:n,ly:e,fs:t,rows:i,phase:s="all",judged:r=!0,colLay:o,count:c,shown:l=!0,n:u=null,rootRef:d,cls:h="",video:p}){const{dx:m}=e,x=S=>S+m,M=[{x:x(40),y:80,w:1220,h:900},...i?[{x:1270,y:90,w:620,h:860}]:[]],g=e.recallFs!==40?{fontSize:e.recallFs,left:x(70)}:m?{left:x(70)}:void 0,f=S=>({left:x(70),width:1160,top:S,...e.ans.fs!==e.ansBase?{fontSize:e.ans.fs}:{}}),v=n.answer.trim().includes(" ")?" wrap":"",w=n.correct,b=n.kind==="img"?n.photos.findIndex(S=>S.video):-1,E=b>=0?e.frame.rects[b]:null;return a.jsxs(gn,{rects:M,n:u,rootRef:d,cls:`s3 s4 st-${KM[n.kind]}${h}`,children:[a.jsxs("div",{className:"s3-head",children:[a.jsx("b",{children:n.title}),a.jsxs("span",{children:["разбор · вопрос ",n.qn," / ",n.qcount]})]}),e.frame.rects.length>0&&a.jsx(Od,{rects:e.frame.rects,srcs:e.frame.srcs,fs:t}),n.kind==="text"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(120),top:330,width:1060,height:340}}),a.jsx("div",{className:"s4-lab",style:{left:x(70),width:1160,top:300},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans${v}`,style:f(350),children:Ia(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${x(250)} 650 C ${x(380)} 690 ${x(520)} 620 ${x(650)} 660 S ${x(920)} 690 ${x(1020)} 640`}),a.jsx("path",{className:"s4-vine-light",d:`M ${x(250)} 650 C ${x(380)} 690 ${x(520)} 620 ${x(650)} 660 S ${x(920)} 690 ${x(1020)} 640`}),a.jsx("g",{transform:`translate(${x(1100)} 636)`,children:a.jsxs("g",{className:"s4-fl",children:[od(8,13,26,-30),a.jsx("circle",{r:"12",className:"ct"})]})})]})]})]}),n.kind==="mc"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-ground",d:`M ${x(70)} 700 C ${x(400)} 690 ${x(800)} 712 ${x(1230)} 696`}),l&&w>=0&&a.jsx("path",{className:"s4-gl",d:`M ${x(70)} 700 C ${x(300)} 692 ${e.cx(w)-200} 706 ${e.cx(w)} 700`}),n.options.map((S,N)=>a.jsxs("g",{transform:`translate(${e.cx(N)} 520)${e.flower<1?` scale(${e.flower.toFixed(3)})`:""}`,children:[a.jsx("path",{className:"s4-stem",d:"M 0 60 C -10 110 10 150 0 180"}),a.jsx("circle",{className:"s4-halo","data-i":N,r:"124"}),a.jsxs("g",{className:"s4-mf","data-i":N,children:[od(8,22,44,-52),a.jsx("circle",{r:"34",className:"ct"})]})]},S.key))]}),n.options.map((S,N)=>a.jsxs("div",{className:"s4-opt","data-i":N,style:{left:e.cx(N)-e.optW/2,top:730,...e.optW!==270?{width:e.optW}:{},...e.optFs!==32?{fontSize:e.optFs}:{}},children:[a.jsx("b",{children:S.key}),a.jsx("span",{children:S.text})]},S.key)),n.options.map((S,N)=>a.jsx("b",{className:"s4-key",style:{left:e.cx(N)-24,top:496},children:S.key},S.key))]}),n.kind==="img"&&e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(700),top:e.sideTop-90,width:620,height:330}}),a.jsx("div",{className:"s4-lab",style:{left:x(740),width:540,top:e.sideTop-48},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${v}`,style:{left:x(740),width:540,top:e.sideTop,fontSize:e.ans.fs},children:Ia(n.answer)})]})]}),n.kind==="img"&&!e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),l&&n.captions&&e.frame.rects.map((S,N)=>n.captions[N]&&a.jsx("div",{className:"s4-rcap",style:{left:S.x-20,top:S.y+S.h+26,width:S.w+40},children:n.captions[N].first?a.jsxs(a.Fragment,{children:[n.captions[N].plain,a.jsx("b",{children:n.captions[N].hot})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{children:n.captions[N].hot}),n.captions[N].plain]})},"rc"+N)),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(120),top:760,width:1060,height:240}}),a.jsx("div",{className:"s4-lab",style:{left:x(70),width:1160,top:744},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${v}`,style:f(780),children:Ia(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${x(330)} 944 C ${x(440)} 970 ${x(520)} 920 ${x(650)} 950 S ${x(860)} 972 ${x(970)} 936`}),a.jsx("path",{className:"s4-vine-light",d:`M ${x(330)} 944 C ${x(440)} 970 ${x(520)} 920 ${x(650)} 950 S ${x(860)} 972 ${x(970)} 936`})]})]})]}),n.kind==="imgopt"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),e.frame.rects.map((S,N)=>a.jsx("b",{className:"s4-pk",style:{left:S.x-6,top:S.y-6},children:n.keys[N]},N)),l&&w>=0&&a.jsxs("div",{className:"s4-capt",style:m?{left:x(70)}:void 0,children:["Ответ: ",a.jsx("b",{children:n.keys[w]}),n.caption?` — ${n.caption}`:""]})]}),i&&a.jsx(qM,{rows:i,phase:s,judged:r,lay:o,count:c}),E&&p&&a.jsx("div",{className:"s4-vid",style:{left:E.x,top:E.y,width:E.w,height:E.h},children:p}),r&&l&&n.note&&a.jsx("div",{className:"s4-note",style:{left:x(70),top:e.noteTop},children:n.note})]})}const Da=60,ry=290,ay=960,Ua=226,oy=(n,e)=>{var t;return((t=n.correct_pairs.find(i=>i.startsWith(e)))==null?void 0:t.slice(e.length))??""},dc=n=>n.items.map((e,t)=>n.right.indexOf(oy(n,String(t+1))));function cy(n,e,t){const i=t>4?26:n.length>60?25:n.length>40?27:30,s=Math.ceil(n.length*.5*i/Math.max(80,e-(t>4?86:100)));return Math.max(t>4?100:120,Math.round(s*i*1.14+26))}function ly(n,e={}){const t=!!e.long,i=e.lift??0,s=n.items.length,r=n.items.map(b=>b.kind==="img"?b.w/b.h:0),o=n.items.filter(b=>b.kind==="txt").length,c=s>4?250:ry,l=r.reduce((b,E)=>b+E,0),u=Math.round(Math.min((s>4?300:380)-i,l?(1800-Da*(s-1)-c*o)/l:380)),d=n.items.map((b,E)=>b.kind==="img"?Math.round(r[E]*u):c),h=d.reduce((b,E)=>b+E,0)+Da*(s-1);let p=ay-h/2;const m=d.map(b=>{const E={x:p,y:Ua,w:b,h:u};return p+=b+Da,E}),x=s>4?250:t?400:330,M=m.map(b=>{const E=Math.max(x,Math.min(470,Math.round(b.w*.97)));return{x:b.x+b.w/2-E/2,y:Ua+u+56,w:E,h:0}}),g=n.right.length,f=1450,v=f/Math.max(1,g),w=n.right.map((b,E)=>({cx:400+v*(E+.5)+(E%2?14:-14),y:(s>4?E%2?790:640:E%2?936:t?796:806)-i}));if(e.stripTop!=null){const b=dc(n),E=A=>{const P=b.indexOf(A);return P>=0?M[P].w:x},S=Math.max(...w.map((A,P)=>A.y+cy(n.right_labels[P]??"",E(P),s))),N=Math.max(0,S-(e.stripTop-52)),y=Ua+u+40;w.forEach(A=>{A.y=Math.max(y,A.y-N)})}return{img:m,fin:M,bank:w,h:u,lift:i,minW:x}}const cd=n=>n.length>60?" xl":n.length>40?" lg":"";function dy(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function uy(n,e){n.fromTo(e(".mt-img"),{opacity:0,scale:.92},{opacity:1,scale:1,duration:.6,stagger:.1,ease:"power2.out"},.3).fromTo(e(".mtC-bud"),{scale:0},{scale:1,duration:.4,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},.8).fromTo(e(".mt-lab"),{opacity:0,y:40,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.4)"},.9)}function hy(n,e,t,i,s){const r=dc(t);t.items.forEach((o,c)=>{const l=s.t0+c*s.step,u=r[c]>=0?e(`.mt-lab[data-k="${r[c]}"]`)[0]:void 0,d=i.bank[r[c]],h=i.fin[c];n.fromTo(e(`.mtC-img[data-k="${c}"]`),{"--hl":0},{"--hl":1,duration:.3,yoyo:!0,repeat:1},l).fromTo(e(`.mtC-stalk[data-k="${c}"]`),{strokeDashoffset:400},{strokeDashoffset:0,duration:.55,ease:"power2.out"},l+.1).fromTo(e(`.mtC-leaf[data-k="${c}"]`),{opacity:0},{opacity:1,duration:.3,stagger:.12},l+.35),u&&d&&n.fromTo(u,{x:0,y:0,rotation:r[c]%2?3:-3},{keyframes:[{y:-60,rotation:0,duration:.3,ease:"power2.out"},{x:h.x+h.w/2-d.cx,y:h.y-d.y,duration:.6,ease:"power2.inOut"}]},l+.35),n.fromTo(e(`.mt-num[data-k="${c}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.45,ease:"back.out(2.2)"},l+1)}),n.fromTo(e(".mt-pairs > *"),{opacity:0,y:10},{opacity:1,y:0,duration:.35,stagger:.08},s.pairsAt)}function fy({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,cls:c=""}){const l=dc(n),u=n.items.length,d=e.lift,h=[...e.img,{x:300,y:(u>4?620:780)-d,w:1500,h:280},{x:360,y:40,w:1200,h:90}];return a.jsxs(gn,{rects:h,n:s,rootRef:r,cls:`s3 mt mtC st-${t?"reveal":"question"}${i?" done":""} n${u}${c}`,children:[Ho(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q mt-q",children:n.text.split(" ").map((p,m)=>a.jsxs("span",{className:"w",children:[p," "]},m))}),a.jsxs("svg",{className:"mtC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("ellipse",{className:"mtC-meadow",cx:"1040",cy:(u>4?740:900)-d,rx:"900",ry:"170"}),t&&n.items.map((p,m)=>{const x=e.img[m],M=e.fin[m],g=x.x+x.w/2,f=x.y+x.h+4,v=M.y+2;return a.jsxs("g",{children:[a.jsx("path",{className:"mtC-stalk","data-k":m,d:`M ${g} ${f} C ${g-10} ${f+18} ${g+10} ${v-18} ${g} ${v}`}),a.jsxs("g",{transform:`translate(${g} ${(f+v)/2})`,children:[a.jsx("path",{className:"mtC-leaf","data-k":m,d:"M 0 0 C 16 -14 34 -12 40 -4 C 28 4 12 6 0 0 Z"}),a.jsx("path",{className:"mtC-leaf","data-k":m,d:"M 0 4 C -16 -8 -34 -6 -40 2 C -28 10 -12 12 0 4 Z"})]})]},m)})]}),e.img.map((p,m)=>{const x=n.items[m];return a.jsxs("div",{className:`mt-img mtC-img${x.kind==="txt"?" txtcard":""}`,"data-k":m,style:{left:p.x,top:p.y,width:p.w,height:p.h},children:[x.kind==="img"?a.jsx("img",{src:x.src,alt:""}):a.jsx("span",{className:`mtC-itxt${cd(x.text)}`,children:x.text}),a.jsx("b",{className:"mt-imgno",children:m+1}),!t&&a.jsx("i",{className:"mtC-bud",style:{left:p.w/2-14}})]},m)}),n.right.map((p,m)=>{const x=l.indexOf(m),M=x>=0?e.fin[x].w:e.minW,g=i&&x>=0?e.fin[x]:{x:e.bank[m].cx-M/2,y:e.bank[m].y};return a.jsxs("div",{className:`mt-lab mtC-lab${cd(n.right_labels[m]??"")}`,"data-k":m,style:{left:g.x,top:g.y,width:M},children:[a.jsx("svg",{className:"mt-labbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:"M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z"})}),a.jsx("span",{className:"key",children:p}),a.jsx("span",{className:"txt",children:n.right_labels[m]??""}),t&&x>=0&&a.jsx("b",{className:"mt-num","data-k":x,children:x+1})]},p)}),o&&a.jsx(Hu,{...o}),t&&a.jsx("div",{className:"mt-pairs",style:d?{top:884-d}:void 0,children:n.items.map((p,m)=>a.jsxs("span",{children:[a.jsx("b",{children:m+1})," — ",a.jsx("b",{children:n.right[l[m]]??"—"})]},m))}),a.jsx(Vo,{n:s,total:n.timer})]})}const py="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function my(n,e={}){const t=n.choices.length,i=!!e.long,s=858-(e.lift??0),r=t>=6?244:t===5?292:n.media?300:360,o=t>=6?112:t===5?140:i?196:150,c=n.media?470:380,l=1880,u=Array.from({length:t},(p,m)=>c+r/2+(t===1?0:m*(l-c-r)/(t-1))),d=u.map(p=>({x:p,y:s-130-o/2})),h=n.choices.map((p,m)=>({x:u[m],y:350+m%2*(i?130:60)}));return{n:t,cw:r,ch:o,slot:d,home:h,xs:u,VY:s}}const gy=n=>n.length>50?" xl":n.length>28?" lg":"",xy=(n,e)=>n.correct_order.indexOf(e);function _y(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function vy(n,e){n.fromTo(e(".orA-vine"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:1.4,ease:"power2.inOut"},.1).fromTo(e(".orA-bud"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.4,stagger:.2,ease:"back.out(2)"},.5).fromTo(e(".or-place"),{opacity:0},{opacity:1,duration:.4,stagger:.15},.6).fromTo(e(".or-card"),{opacity:0,y:-30,rotation:-4},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.5)"},.8)}function My(n,e,t,i,s){const r=t.choices.map(c=>c.key),o=s.step;t.correct_order.split("").forEach((c,l)=>{const u=r.indexOf(c),d=u>=0?e(`.or-card[data-i="${u}"]`)[0]:void 0,h=i.home[u],p=i.slot[l],m=s.t0+l*o;d&&h&&p&&n.fromTo(d,{x:0,y:0,rotation:u%2?3:-3},{keyframes:[{x:(p.x-h.x)*.5,y:(p.y-h.y)*.5-50,rotation:p.x>h.x?7:-7,duration:o*.5,ease:"sine.inOut"},{x:p.x-h.x,y:p.y-h.y,rotation:0,duration:o*.45,ease:"power2.out"}]},m),n.fromTo(e(`.orA-stem[data-j="${l}"]`),{strokeDashoffset:120},{strokeDashoffset:0,duration:.3},m+o*.75).fromTo(e(`.orA-fl[data-j="${l}"]`),{scale:0},{scale:1,svgOrigin:"0 0",duration:.5,ease:"back.out(2.2)"},m+o*.8).to(e(`.orA-bud[data-j="${l}"]`),{scale:0,svgOrigin:"0 0",duration:.2},m+o*.75).fromTo(e(`.or-pos[data-i="${u}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.4,ease:"back.out(2.2)"},m+o*.9)}),n.fromTo(e(".orA-light"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:.4+i.n*o,ease:"none"},s.t0)}function yy({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,media:c,cls:l=""}){const u=e.VY,d=x=>xy(n,x),h=[...e.home,...e.slot].map(x=>({x:x.x-e.cw/2,y:x.y-e.ch/2,w:e.cw,h:e.ch})).concat([{x:360,y:40,w:1200,h:90}]),p=[{x:360,y:u},...e.xs.map((x,M)=>({x,y:u+(M%2?12:-12)})),{x:1850,y:u-6}],m=p.reduce((x,M,g)=>g===0?`M ${M.x} ${M.y}`:`${x} C ${(p[g-1].x+M.x)/2} ${p[g-1].y} ${(p[g-1].x+M.x)/2} ${M.y} ${M.x} ${M.y}`,"");return a.jsxs(gn,{rects:h,n:s,rootRef:r,cls:`s3 or orA st-${t?"reveal":"question"}${i?" done":""} n${e.n}${l}`,children:[Ho(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q or-q",style:n.media?{left:470,right:240}:void 0,children:n.text.split(" ").map((x,M)=>a.jsxs("span",{className:"w",children:[x," "]},M))}),n.media&&a.jsx("figure",{className:"or-media",children:a.jsx("img",{src:c??n.media,alt:""})}),a.jsxs("svg",{className:"orA-back",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"orA-vine",d:m}),a.jsx("path",{className:"orA-light",d:m}),a.jsxs("g",{className:"orA-seed",transform:`translate(360 ${u})`,children:[a.jsx("ellipse",{rx:"26",ry:"17"}),a.jsx("path",{d:"M -6 -14 C -2 -30 8 -34 16 -32"})]}),a.jsx("g",{transform:`translate(1850 ${u-6})`,children:a.jsxs("g",{className:"orA-flower",children:[Array.from({length:8},(x,M)=>a.jsx("g",{transform:`rotate(${M*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-26",rx:"12",ry:"26"})},M)),a.jsx("circle",{r:"11"})]})}),e.slot.map((x,M)=>a.jsxs("g",{transform:`translate(${x.x} ${p[M+1].y})`,children:[a.jsx("path",{className:"orA-stem","data-j":M,d:`M 0 0 L 0 ${x.y+e.ch/2-p[M+1].y}`}),a.jsx("ellipse",{className:"orA-bud","data-j":M,rx:"18",ry:"22",cy:"-6"}),a.jsxs("g",{className:"orA-fl","data-j":M,style:i?{transform:"scale(1)"}:void 0,children:[Array.from({length:7},(g,f)=>a.jsx("g",{transform:`rotate(${f*51.4})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"11",ry:"22"})},f)),a.jsx("circle",{r:"9"})]})]},M))]}),e.slot.map((x,M)=>a.jsx("b",{className:"or-place",style:{left:x.x,top:u+38},children:M+1},M)),n.choices.map((x,M)=>{const g=i&&d(x.key)>=0?e.slot[d(x.key)]:e.home[M];return a.jsxs("div",{className:`or-card orA-card${gy(x.text)}${t?" placed":""}`,"data-i":M,style:{left:g.x-e.cw/2,top:g.y-e.ch/2,width:e.cw,height:e.ch},children:[a.jsx("svg",{className:"or-cardbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:py})}),a.jsx("span",{className:"key",children:x.key}),a.jsx("span",{className:"txt",children:x.text}),t&&d(x.key)>=0&&a.jsx("em",{className:"or-pos","data-i":M,children:d(x.key)+1})]},x.key)}),o&&a.jsx(Hu,{top:968,...o}),a.jsx(Vo,{n:s,total:n.timer})]})}function by(n,e,t){const i=n.answer;return i.mode==="match"?"match":i.mode==="order"?"order":i.mode==="choice"?t.qImgs>0&&t.qImgs===i.choices.length?"imgopt":"mc":e==="rebus"||t.revealImgs>0||t.video?"img":"text"}function Sy(n,e){const t=n.answer,i=e.trim();if(t.mode==="choice"){const s=t.choices.find(r=>qh(i,r.key));return s&&s.text.trim()?`${s.key} · ${s.text.trim()}`:i}return t.mode==="match"?i.split(/[,;]\s*/).map(s=>s.trim()).filter(Boolean).join(" "):i}function wy(n,e,t,i,s){const r=`q-${n.id}`,o=i.filter(d=>d.question_ref===r),c=[...e,...t.filter(d=>!e.some(h=>h.id===d.id)&&o.some(h=>h.team_id===d.id))];let l=0;return{rows:c.map(d=>{var m;const h=o.find(x=>x.team_id===d.id),p=((m=h==null?void 0:h.answer_text)==null?void 0:m.trim())||"";return p&&l++,{key:d.id,name:`${d.icon?`${d.icon} `:""}${d.name}`,color:Gi(Rn(d.color??"")),text:p?Sy(n,p):null,ok:s&&h&&p?h.is_correct??ci(n.answer,h.answer_text):null,stake:(h==null?void 0:h.stake)??null}}),answered:l}}function Ey(n,e,t){return n<=1?t:Math.max(.05,Math.min(t,(e-.3-1.45)/(n-1)))}function Ty(n,e,t){return Math.max(.35,Math.min(t,(e-.3-.4)/Math.max(.9,n-.1)))}const ld=(n,e=.7)=>Math.min(.14,e/Math.max(1,n-1));function Ay(n,e){const[t,i]=G.useState(n?"open":"covered"),[s,r]=G.useState(0);G.useEffect(()=>{n?t==="covered"&&i("anim"):t!=="covered"&&(i("covered"),r(c=>c+1))},[n]);const o=G.useCallback(()=>i(c=>c==="anim"?"open":c),[]);return{stage:t,epoch:s,judged:e&&t==="open",done:o}}const uc=n=>n==="covered"?"dots":n;function hc(n,e,t,i,s,r){const o=G.useRef(null),c=G.useMemo(()=>nt.utils.selector(o),[]),l=G.useRef(n==="open"),u=G.useRef(!1);return G.useLayoutEffect(()=>{const d=nt.timeline();return i(d,c),l.current&&d.progress(1),()=>{d.kill()}},[]),G.useLayoutEffect(()=>{if(n==="covered"||u.current)return;u.current=!0;const d=nt.timeline({onComplete:t});if(s(d,c),n==="open"){d.progress(1);return}return()=>{d.progress()<1&&(u.current=!1,d.kill())}},[n]),G.useLayoutEffect(()=>{if(!e)return;const d=nt.timeline();return r(d,c),()=>{d.kill()}},[e]),o}const $u=(n,e,t)=>n.to(e(".s4-sl .dots"),{opacity:0,duration:.3,stagger:.04},t).fromTo(e(".s4-sl .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.05},t),Xu=(n,e)=>{const t=e(".s4-sl .mk").length;return n.fromTo(e(".s4-sl .mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:Math.min(.1,2/Math.max(1,t)),ease:"back.out(2.4)"},0)},qu=(n,e)=>n.fromTo(e(".s4-sl, .s4-scnt"),{opacity:0,y:14},{opacity:1,y:0,duration:.4,stagger:.05},.6);function Cy({inp:n,rows:e,answered:t,revealed:i,checked:s,revealMs:r,video:o}){const{stage:c,epoch:l,judged:u,done:d}=Ay(i,s),h=n.kind==="match"?n.allImgs.slice(0,n.left.length):n.kind==="order"?n.allImgs.slice(0,1):n.kind==="imgopt"?n.allImgs:c==="covered"?n.qImgs:n.aImgs,p=G.useMemo(()=>[...new Set([...n.allImgs,...n.qImgs,...n.aImgs])],[n]),m=Cf(p),x=m?h.map(E=>m[p.indexOf(E)]??{w:1200,h:900}):null,M=x?JSON.stringify(h.map((E,S)=>[E,x[S].w,x[S].h])):"",g=G.useMemo(()=>M?JSON.parse(M).map(([E,S,N])=>({src:E,w:S,h:N})):[],[M]),f=e&&e.length?e:null,v=f?`Ответили: ${t} из ${f.length}`:void 0,w=(r+600)/1e3;if(!x)return a.jsx("div",{className:"s1 fo-wait"});const b={stage:c,judged:u,done:d,rows:f,count:v,doneS:w};return n.kind==="match"?a.jsx(Ny,{inp:n,photos:g,...b},l):n.kind==="order"?a.jsx(Py,{inp:n,photos:g,...b},l):a.jsxs(a.Fragment,{children:[a.jsx(Ry,{inp:n,photos:g,video:o,...b},l),o&&n.kind!=="img"&&a.jsx("div",{className:"s4-vid corner",children:o})]})}function Ry({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,video:c}){const l=t!=="covered",u=G.useRef(n.kind==="img"&&t==="covered"&&e.length===0),d=n.kind,h=G.useMemo(()=>{var w;const v=d==="img"&&l&&c?[{src:"",w:16,h:9,video:!0},...e].slice(0,4):e;return{kind:d,title:n.title,qn:n.qn,qcount:n.qcount,question:n.question,answer:n.answer,options:n.options,correct:d==="imgopt"||d==="mc"?n.options.findIndex(b=>b.key===n.correctKey):-1,photos:d==="img"||d==="imgopt"?v:[],keys:n.options.map(b=>b.key),caption:((w=n.options.find(b=>b.key===n.correctKey))==null?void 0:w.text.trim())??"",note:n.note,captions:n.captions}},[n,e,l,d,!!c]),p=!!r,m=G.useMemo(()=>JM(h,p?0:310),[h,p]),x=G.useMemo(()=>{const v=m.frame.rects.length;return{grow:Array(v).fill(1),reveal:Array(v).fill(1),bloom:Array(v).fill(0),pulse:0}},[m]),M=G.useMemo(()=>XM((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),g=Wu(h.answer),f=hc(t,i,s,(v,w)=>{QM(v,w),ey(v,w)},(v,w)=>{const b=d==="text"?{R:.4,k:ld(g)}:d==="img"?{R:0,k:ld(g),lt:.35}:{R:.2,k:.14},{show:E}=iy(v,w,h,x,b,u.current);ty(v,w,E)},(v,w)=>{ny(v,w,0,Math.min(.2,2.4/Math.max(1,(r==null?void 0:r.length)??1))),v.fromTo(w(".s4-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5},.2)});return a.jsx(sy,{d:h,ly:m,fs:x,rows:r,phase:uc(t),judged:i,colLay:M,count:o,shown:l,rootRef:f,cls:r?" fg":" fg paper",video:c})}function Ny({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=G.useMemo(()=>({title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,items:n.left.map((v,w)=>e[w]?{kind:"img",src:e[w].src,w:e[w].w,h:e[w].h}:{kind:"txt",text:n.hasAudio?`Трек ${v}`:v}),right:n.right,right_labels:n.right.map((v,w)=>n.rightLabels[w]??""),correct_pairs:n.pairs}),[n,e]),u=G.useMemo(()=>Bu((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),d=958-u.lift,h=l.right_labels.some(v=>v.length>60),p=!!r,m=G.useMemo(()=>ly(l,{long:h,lift:u.lift,stripTop:p?d:void 0}),[l,h,u,p,d]),x=l.items.length,M=Ey(x,c,x>4?.95:1.25),g=.3+(x-1)*M+1,f=hc(t,i,s,(v,w)=>{dy(v,w),uy(v,w),qu(v,w)},(v,w)=>{hy(v,w,l,m,{t0:.3,step:M,pairsAt:g}),$u(v,w,g+.4)},(v,w)=>{Xu(v,w)});return a.jsx(fy,{S:l,Ly:m,rev:t!=="covered",done:!1,n:null,rootRef:f,cls:" fg",strip:r?{rows:r,top:d,phase:uc(t),judged:i,lay:u,count:o}:null})}function Py({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=G.useMemo(()=>{var x;return{title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,choices:n.options,correct_order:n.correctOrder,media:((x=e[0])==null?void 0:x.src)??null}},[n,e]),u=G.useMemo(()=>Bu((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),d=l.choices.some(x=>x.text.length>50),h=G.useMemo(()=>my(l,{long:d,lift:u.lift}),[l,d,u]),p=Ty(h.n,c,h.n>5?.85:1),m=hc(t,i,s,(x,M)=>{_y(x,M),vy(x,M),qu(x,M)},(x,M)=>{My(x,M,l,h,{t0:.3,step:p}),$u(x,M,.3+h.n*p+.2)},(x,M)=>{Xu(x,M)});return a.jsx(yy,{S:l,Ly:h,rev:t!=="covered",done:!1,n:null,rootRef:m,cls:" fg",strip:r?{rows:r,top:968-u.lift,phase:uc(t),judged:i,lay:u,count:o}:null})}function Ly(n,e){const t=(r,o)=>{const c=(r??"").trim();if(!c)return null;const l=o?Math.max(0,c.length-3):3;return o?{plain:c.slice(0,l),hot:c.slice(l),first:o}:{plain:c.slice(l),hot:c.slice(0,l),first:o}},i=t(n,!0),s=t(e,!1);return i||s?[i??{plain:"",hot:"",first:!0},s??{plain:"",hot:"",first:!1}]:void 0}const dd=n=>!/\.(mp3|mp4|webm|wav|m4a|ogg)$/i.test(n),Iy=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n);function Dy({round:n,q:e,step:t,answers:i,teams:s,allTeams:r,revealed:o,checked:c,paper:l,revealMs:u,answerText:d,effects:h,video:p,actions:m}){const x=G.useMemo(()=>{var F;const E=e.media.question??[],S=e.media.answer??[],N=E.filter(dd),y=S.filter(dd),A=y.length?y:N,P=!!e.media.hidden&&E.some(H=>/\.(mp4|webm)$/i.test(H)),R=by(e,n.mechanic,{qImgs:N.length,revealImgs:A.length,video:P}),I=e.answer,B=I.mode==="choice"||I.mode==="order"?I.choices.map(H=>({key:H.key,text:H.text})):[];return{kind:R,title:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qn:t+1,qcount:n.questions.length,question:e.question_text.trim(),answer:d,options:B,correctKey:I.mode==="choice"?I.correct_choice:"",correctOrder:I.mode==="order"?I.correct_order:"",left:I.mode==="match"?I.left:[],right:I.mode==="match"?I.right:[],rightLabels:I.mode==="match"?I.right_labels??[]:[],pairs:I.mode==="match"?I.correct_pairs:[],qImgs:e.media.hidden?[]:N.map(He),aImgs:A.map(He),allImgs:(R==="imgopt"||!e.media.hidden?N:[]).map(He),hasAudio:E.some(Iy),note:((F=e.answer_note)==null?void 0:F.trim())??"",captions:n.mechanic==="rebus"?Ly(e.service.word1,e.service.word2):void 0}},[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),e.answer_note,d,n.mechanic,n.title_lines.join("|"),n.questions.length,t]),{rows:M,answered:g}=wy(e,s,r,i,c),f=G.useMemo(()=>Ld(e,He,d),[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),d]),[v,w]=G.useState(!0);G.useEffect(()=>{if(!o){w(!0);return}const E=setTimeout(()=>w(!1),1e3);return()=>clearTimeout(E)},[o,e.id]),G.useEffect(()=>{o&&Af.set({hidden:!1})},[o]);const b=(o?v:!0)&&a.jsx("div",{className:`fo-x ${o?"fo-xout":""}`,children:a.jsx(Id,{q:f,roundName:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Вопрос ${t+1} из ${n.questions.length}`,startedAt:null,seconds:n.timer_seconds,reveal:!1,calm:!0,from:"E",noTimer:!0})});return o?a.jsxs(a.Fragment,{children:[h,b,a.jsx("div",{className:"fo-x fo-xin",children:a.jsx(Cy,{inp:x,rows:l?null:M,answered:g,revealed:o,checked:c,revealMs:u,video:p},e.id)}),m]}):a.jsxs(a.Fragment,{children:[h,b,m]})}function _1(){var u,d,h,p;const{gameState:n,loading:e,roomId:t}=sh(),[i,s]=G.useState(null);if(G.useEffect(()=>{n!=null&&n.pack_id?Yh(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),G.useEffect(()=>If(),[]),!e&&!t)return a.jsx(rh,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",o=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"",c=(n==null?void 0:n.phase)==="question"?`Q-${((n.round_number+1)*97+n.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null,l=Pd(r)&&(n==null?void 0:n.phase)==="question"&&i?_f((u=i.rounds[n.round_number])==null?void 0:u.questions[n.question_index],(d=i.rounds[n.round_number])==null?void 0:d.mechanic):!1;return a.jsxs(vf,{theme:r,isProjector:!0,phase:n==null?void 0:n.phase,plain:l,paper:((h=i==null?void 0:i.settings)==null?void 0:h.play_mode)==="paper",turn:n?{game_id:n.game_id,phase:n.phase,round_number:n.round_number,question_index:n.question_index}:null,children:[r==="new_year"&&a.jsx(Mf,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),a.jsx(Uy,{gameState:n,pack:i}),a.jsx(Zp,{theme:r,trigger:o,hud:c}),a.jsx(Fp,{on:Rt(r),phase:n==null?void 0:n.phase}),i&&a.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((p=i.settings)==null?void 0:p.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name}),a.jsx(Rf,{corner:!0})]})}function br({theme:n}){return n==="new_year"?a.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?a.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function ud({theme:n}){return n!=="classic"?null:a.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[a.jsx("span",{className:"cd-line"}),a.jsx("span",{className:"cd-chip",children:"◆"}),a.jsx("span",{className:"cd-line"})]})}function Uy({gameState:n,pack:e}){var w,b,E,S,N,y,A,P;const[t,i]=G.useState([]),[s,r]=G.useState("");G.useEffect(()=>{Kh().then(i).catch(()=>i([]))},[]);const o=Un((n==null?void 0:n.game_id)??null),c=G.useMemo(()=>rm(o),[o]),l=G.useMemo(()=>{const R=`${location.origin}${location.pathname}#/player?room=${Zh()??""}`;return n!=null&&n.pack_id?`${R}&pack=${n.pack_id}`:R},[n==null?void 0:n.pack_id]),u=((n==null?void 0:n.random_groups)??[]).filter(R=>Array.isArray(R)&&R.length>0),d=u.map(R=>R.join(",")).join("|"),[h,p]=G.useState(!0);G.useEffect(()=>{p(!0)},[d]);const m=u.length>0&&h;Wy((w=e==null?void 0:e.rounds)==null?void 0:w[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0);const x=((E=(b=e==null?void 0:e.rounds)==null?void 0:b[(n==null?void 0:n.round_number)??0])==null?void 0:E.mechanic)==="race"||((N=(S=e==null?void 0:e.rounds)==null?void 0:S[((n==null?void 0:n.round_number)??0)+1])==null?void 0:N.mechanic)==="race";if(G.useEffect(()=>{x&&Pf("/quiz-party/")},[x]),$y(e,(n==null?void 0:n.round_number)??0),!n)return a.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const M=((y=e==null?void 0:e.settings)==null?void 0:y.play_mode)==="paper",g=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&er()},children:"⟲ Сменить пакет"}),a.jsx("button",{onClick:()=>{var R,I;return void ef({intro:!!((R=e==null?void 0:e.settings)!=null&&R.show_intro),slide:Lc((I=e==null?void 0:e.settings)==null?void 0:I.info_slides,0)??void 0},_t(n)).catch(vt)},children:"К первому раунду →"})]});if(n.phase==="lobby"&&n.pack_id&&e&&Rt(e.theme))return a.jsxs(a.Fragment,{children:[a.jsx(jc,{pack:e}),a.jsx(np,{teams:c.map(R=>({id:R.id,name:R.name,color:R.color,alive:Dr(R)})),playerUrl:l,paper:M,groups:u,groupsOpen:h,onGroupsOpen:()=>p(!0),onGroupsClose:()=>p(!1)}),g]});if(n.phase==="lobby"||!n.pack_id||!e)return a.jsxs("div",{className:`host-screen grid-bg lobby-screen${M?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&a.jsx(jc,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?a.jsxs("div",{className:"cyber-lobby-head",children:[a.jsx(gd,{side:"left"}),a.jsxs("div",{className:"clh-title",children:[a.jsx(Cn,{theme:"classic",lines:["QUIZ","PARTY"]}),a.jsx(ud,{theme:"classic"})]}),a.jsx(gd,{side:"right"})]}):a.jsxs(a.Fragment,{children:[a.jsx(Cn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),a.jsx(br,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?a.jsxs(a.Fragment,{children:[m&&a.jsx(Hy,{groups:u,book:(e==null?void 0:e.theme)==="ny_book",onClose:()=>p(!1)}),u.length>0&&!h&&a.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>p(!0),children:"СОСТАВЫ КОМАНД"}),Pd(e==null?void 0:e.theme)?a.jsx(zp,{theme:e.theme,showQr:!M,lit:m,playerUrl:l,teams:c.map(R=>({id:R.id,name:R.name,icon:R.icon,color:R.color,alive:Dr(R)}))}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"lobby-teams",children:[o.length>0&&a.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",o.length,")"]}),o.length===0?M?null:a.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):c.map(R=>a.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":R.color,opacity:Dr(R)?1:.4},children:[R.icon&&a.jsx("span",{className:"lobby-team-icon",children:R.icon}),R.name]},R.id))]}),!M&&a.jsx(ur,{className:`lobby-qr-corner${m?" lobby-qr-lit":""}`,value:l,title:"QR для подключения"}),!M&&m&&a.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"})]}),g]}):a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[a.jsxs("select",{value:s,onChange:R=>r(R.target.value),style:{fontSize:"1.2rem"},children:[a.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(R=>a.jsxs("option",{value:R.id,children:[R.name," (",R.status==="ready"?"готов":R.status==="played"?"сыгран":R.status,")"]},R.id))]}),a.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const R=t.find(I=>I.id===s);R&&R.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Jh(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return a.jsx(bM,{onDone:()=>{var R;Qh(0,Lc((R=e==null?void 0:e.settings)==null?void 0:R.info_slides,0)??void 0)}});const f=e.rounds[n.round_number];if(!f)return a.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const v=f.questions[n.question_index];if(n.phase==="round_intro"){const R=f.settings.grid,I=a.jsx("div",{className:"host-actions",children:f.mechanic==="anagram"?a.jsx(Oy,{round:f,gameState:n}):a.jsx("button",{onClick:()=>void fi(0,_t(n)).catch(vt),children:f.mechanic==="jeopardy"?"Начать раунд →":f.mechanic==="race"?"К скачкам →":f.mechanic==="melody"?"К трекам →":f.mechanic==="four_pics"||f.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})});return Rt(e.theme)?a.jsxs(a.Fragment,{children:[f.rules_audio&&a.jsx("audio",{autoPlay:!0,src:He(f.rules_audio)}),a.jsx(Lp,{kind:dp(f.mechanic),intro:{num:Kt(e,n.round_number),titleLines:f.title_lines,meta:ys(f),rules:f.rules}}),I]}):a.jsxs("div",{className:"host-screen grid-bg round-intro",children:[f.rules_audio&&a.jsx("audio",{autoPlay:!0,src:He(f.rules_audio)}),e.theme==="potter"&&a.jsx("div",{className:"mg-veil","aria-hidden":!0}),f.mechanic==="crossword"&&R&&e.theme==="ny_book"?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"round-badge",children:a.jsx("span",{className:"rb-num",children:Kt(e,n.round_number)})}),a.jsxs("div",{className:"bk-cw",children:[a.jsxs("div",{className:"bk-cw-left",children:[a.jsx(Xc,{lines:f.title_lines,size:"sm"}),a.jsx("div",{className:"meta-line",children:ys(f)}),a.jsx("div",{className:"bk-cw-grid",children:a.jsx(Gc,{grid:R,cellSize:(()=>{const B=Math.min(innerWidth/1920,innerHeight/1080);return Math.max(10,Math.floor(Math.min(640*B/R.cols,350*B/R.rows,64*B)))})()})})]}),a.jsx("div",{className:"bk-cw-right",children:f.rules.length>0&&a.jsx(Wr,{rules:f.rules,minScale:.3,delay:B=>.5+B*.6})})]})]}):f.mechanic==="crossword"&&R?a.jsxs("div",{className:"cw-layout",children:[a.jsx(Gc,{grid:R,cellSize:e.theme==="ny_book"?Math.max(24,Math.min(68,Math.floor(Math.min(innerWidth*.3/R.cols,innerHeight*.55/R.rows)))):Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/R.cols,innerHeight*.8/R.rows))))}),a.jsxs("div",{className:"side",children:[a.jsx("div",{className:"round-badge",children:a.jsx("span",{className:"rb-num",children:Kt(e,n.round_number)})}),a.jsx(Cn,{theme:e.theme,lines:f.title_lines}),a.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:ys(f)}),e.theme==="ny_book"?f.rules.length>0&&a.jsx(Wr,{rules:f.rules,minScale:.3,delay:B=>.5+B*.6}):f.rules.map((B,F)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+F*.5}s`},children:[a.jsx("span",{className:"idx",children:String(F+1).padStart(2,"0")}),B]},F))]})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"round-badge",children:a.jsx("span",{className:"rb-num",children:Kt(e,n.round_number)})}),a.jsxs("div",{className:"ri-main",children:[e.theme==="ny_book"?a.jsx(Xc,{lines:f.title_lines}):a.jsx(Cn,{theme:e.theme,lines:f.title_lines}),a.jsx(br,{theme:e.theme}),a.jsx(ud,{theme:e.theme}),a.jsx("div",{className:"meta-line",children:ys(f)})]}),f.rules.length>0&&a.jsx(Wr,{rules:f.rules,minScale:e.theme==="ny_book"?.3:.5,delay:B=>(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+B*.7})]}),I]})}if(n.phase==="question"&&f.mechanic==="sprint")return Rt(e.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Rc,{pack:e,round:f,gameState:n,timerNode:null}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void hs(0,!1,_t(n)).catch(vt),children:"К ответам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsx(Rc,{pack:e,round:f,gameState:n,timerNode:a.jsx(cs,{startedAt:n.timer_started_at,seconds:f.timer_seconds,theme:e.theme})}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void hs(0,!1,_t(n)).catch(vt),children:"К ответам →"})})]});if(n.phase==="question"&&f.mechanic==="blitz")return a.jsx(Ky,{pack:e,round:f,gameState:n});if(n.phase==="question"&&f.mechanic==="race")return a.jsx(_h,{pack:e,round:f,gameState:n},`${n.game_id}-${n.round_number}`);if(n.phase==="question"&&f.mechanic==="melody")return a.jsx(vh,{pack:e,round:f,gameState:n});if(n.phase==="question"&&f.mechanic==="four_pics")return a.jsx(Mh,{pack:e,round:f,gameState:n,timerNode:(R,I,B)=>{var F,H;return a.jsx(cs,{startedAt:((H=(F=n.melody)==null?void 0:F.rv)==null?void 0:H.startedAt)??null,seconds:R,theme:e.theme,chime:B},I)}});if(n.phase==="question"&&f.mechanic==="jeopardy")return a.jsx(yh,{pack:e,round:f,gameState:n});if(n.phase==="question"&&f.mechanic==="anagram"&&v){const R=n.question_index+1>=f.questions.length;return a.jsx(bh,{pack:e,round:f,roundIdx:n.round_number,q:v,qIndex:n.question_index,qCount:f.questions.length,gameState:n,timerSlot:n.reveal&&!n.timer_started_at?null:a.jsx(cs,{startedAt:n.timer_started_at,seconds:f.timer_seconds,theme:e.theme},v.id),effectsSlot:a.jsxs(a.Fragment,{children:[!(n.reveal&&!n.timer_started_at)&&a.jsx(xd,{startedAt:n.timer_started_at,seconds:f.timer_seconds,q:v,round:f,pack:e,timerRunning:!!n.timer_started_at,manual:M,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(vd,{round:f,gameState:n,isLast:R}),a.jsx(_d,{enabled:!n.reveal,startedAt:n.timer_started_at,seconds:f.timer_seconds,from:_t(n)})]}),actionsSlot:a.jsx(Fy,{pack:e,round:f,gameState:n})},v.id)}if(n.phase==="question"&&v){const R=!!n.timer_started_at&&(St()-new Date(n.timer_started_at).getTime())/1e3>f.timer_seconds-10,I=((A=e.settings)!=null&&A.answers_reveal&&f.answers_reveal==="after_question",f.answers_reveal??"after_round"),B=f.mechanic!=="jeopardy"&&a.jsxs(a.Fragment,{children:[a.jsx(xd,{startedAt:n.timer_started_at,seconds:f.timer_seconds,q:v,round:f,pack:e,timerRunning:!!n.timer_started_at,manual:M,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(vd,{round:f,gameState:n,isLast:n.question_index+1>=f.questions.length}),a.jsx(_d,{enabled:I==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:f.timer_seconds,from:_t(n)})]}),F=a.jsxs("div",{className:"host-actions",children:[a.jsx(By,{gameState:n}),(I==="after_question"||f.mechanic==="jeopardy")&&!n.reveal&&a.jsx("button",{onClick:()=>void ji(),children:"Показать ответ"}),n.question_index+1<f.questions.length?a.jsx("button",{onClick:()=>void fi(n.question_index+1,_t(n)).catch(vt),children:"Дальше →"}):I==="after_round"?a.jsx("button",{onClick:()=>void Rd(_t(n)).catch(vt),children:"Время ответов →"}):a.jsx(Ln,{pack:e,gameState:n})]});return f.mechanic==="crossword"&&Rt(e.theme)&&cc(f)?a.jsx(WM,{pack:e,round:f,q:v,qIndex:n.question_index,qCount:f.questions.length,gameState:n,effectsSlot:B,actionsSlot:F},v.id):a.jsx(Sd,{pack:e,round:f,roundIdx:n.round_number,q:v,qIndex:n.question_index,qCount:f.questions.length,timeLow:R,reveal:n.reveal,timerRunning:!!n.timer_started_at,timerStartedAt:n.timer_started_at,timerSlot:f.mechanic!=="jeopardy"&&a.jsx(cs,{startedAt:n.timer_started_at,seconds:f.timer_seconds,theme:e.theme},v.id),effectsSlot:B,actionsSlot:F})}if(n.phase==="info"){const R=((P=e==null?void 0:e.settings)==null?void 0:P.info_slides)??[],I=R[n.question_index]??R[0];if(I)return a.jsx(Xy,{pack:e,slide:I,packId:n.pack_id,gameState:n})}return n.phase==="recap"?a.jsx(Vy,{pack:e,round:f,gameState:n}):n.phase==="answer_time"?a.jsx(Zy,{pack:e,round:f,gameState:n}):n.phase==="show_answers"&&v?a.jsx(Jy,{pack:e,round:f,q:v,gameState:n}):n.phase==="scoreboard"?a.jsx(Qy,{pack:e,gameState:n}):n.phase==="break"?a.jsx(e1,{pack:e,round:f,gameState:n}):n.phase==="counting"?a.jsx(t1,{pack:e,gameState:n}):n.phase==="finale"?a.jsx(n1,{pack:e,gameId:n.game_id,gameState:n}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!v&&a.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void Er("round_intro"),children:"← К титулу раунда"})})]})}function Fy({pack:n,round:e,gameState:t}){var p,m;const i=lf(),s=Ed(t.game_id),r=Nd(s,e.questions),o=Un(t.game_id),c=Xi(t.game_id,t.round_number),l=df(o,c,((p=e.questions[t.question_index])==null?void 0:p.id)??"",((m=n.settings)==null?void 0:m.play_mode)==="paper"),u=Oc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:St(),wasRun:r,allAnswered:l}),d=()=>{const x=ff(t.question_index),M=_t(t);(x.kind==="shown"?ka(x.index,M):Er("round_intro",M)).catch(vt)},h=()=>{const x=Oc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:St(),wasRun:r,allAnswered:l});if(x.kind==="wait")return i.show(x.text);const M=_t(t);if(x.kind==="reveal")return void ji(M).catch(vt);if(x.kind==="next")return void(x.shown?ka(x.index,M):fi(x.index,M)).catch(vt)};return a.jsxs("div",{className:"host-actions",children:[a.jsx(uf,{text:i.text}),a.jsx("button",{className:"ghost",onClick:d,children:t.question_index>0?"← Назад":"← К титулу"}),!t.reveal&&a.jsx("button",{onClick:()=>void ji(_t(t)).catch(vt),children:"Показать ответ"}),u.kind==="afterRound"?a.jsx(Ln,{pack:n,gameState:t}):a.jsx("button",{onClick:h,children:"Дальше →"})]})}function Oy({round:n,gameState:e}){const t=Ed(e.game_id),i=tf(Nd(t,n.questions));return a.jsx("button",{onClick:()=>void(i.shown?ka(0,_t(e)):fi(0,_t(e))).catch(vt),children:"Первый вопрос →"})}function By({gameState:n}){return n.question_index>0?a.jsx("button",{className:"ghost",onClick:()=>void fi(n.question_index-1,_t(n)).catch(vt),children:"← Назад"}):a.jsx("button",{className:"ghost",onClick:()=>void Er("round_intro",_t(n)).catch(vt),children:"← К титулу"})}function ky(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const Cn=G.forwardRef(function({theme:e,lines:t},i){const s=ky(t),r=t.join(`
`),o=Sh(r,e==="classic"),c=e==="classic"?o.split(`
`):t;if(e!=="new_year")return a.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((u,d)=>a.jsxs("span",{style:d===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[d]??u,a.jsx("br",{})]},d))});let l=0;return a.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((u,d)=>a.jsx("span",{style:{display:"block"},children:[...u].map((h,p)=>h===" "?a.jsx("span",{children:" "},p):a.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*l++}s`},children:h},p))},d))})});function zy(){xh()}function Gy(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?a.jsxs(a.Fragment,{children:[s,a.jsx("b",{className:"rebus-hot",children:r})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"rebus-hot",children:r}),s]})}const jy=5e3,hd=100,fd=600,pd=500;function md(n){const e=n.answer;return e.mode==="choice"?Bh+kh+zh:e.mode==="match"?hd+fd*Math.max(0,Math.min(e.left.length,6)-1)+pd:e.mode==="order"?hd+fd*Math.max(0,e.correct_order.length-1)+pd:1200}function Fa({src:n}){const e=G.useRef(null);return G.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),a.jsx("div",{className:"reveal-video",children:a.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Yu(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function gd({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return a.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"cp-bar"}),a.jsx("div",{className:"cp-rows",children:e.map((t,i)=>a.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),a.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>a.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function Hy({groups:n,onClose:e,book:t}){G.useEffect(()=>{const s=r=>{r.key==="Escape"&&e()};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[e]);const i=n.reduce((s,r)=>s+r.length,0);return a.jsx("div",{className:"groups-overlay",onClick:e,children:a.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:s=>s.stopPropagation(),children:[a.jsxs("div",{className:"gm-head",children:[a.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",i," чел."]}),a.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),a.jsx("div",{className:"lg-list",children:n.map((s,r)=>a.jsxs("div",{className:"lg-team",children:[t?a.jsx("div",{className:"lg-name bk-lg",children:a.jsx(Tn,{name:`Команда ${r+1}`,ch:54,color:dr(r)})}):a.jsxs("div",{className:"lg-name",style:{color:dr(r)},children:["Команда ",r+1]}),a.jsx("div",{className:"lg-players",children:s.join(" · ")})]},r))})]})})}function Vy({pack:n,round:e,gameState:t}){const i=G.useMemo(()=>e.questions.filter(m=>!m.hidden),[e.questions]),[s,r]=G.useState(0),o=i[s],c=s+1>=i.length,l=()=>void Rd({phase:"recap",round_number:t.round_number}).catch(vt),u=()=>{c?l():r(m=>m+1)};if(G.useEffect(()=>{if(!o){l();return}let m=!0;const x=()=>{m&&u()},M=setTimeout(x,jy),g=o.media.voice;if(!g)return()=>{m=!1,clearTimeout(M)};let f=!1;const v=en();v.src=He(g),v.play().then(()=>{if(f)try{v.pause(),v.src=""}catch{}}).catch(()=>{});const w=()=>{clearTimeout(M),x()};return v.addEventListener("ended",w),()=>{m=!1,f=!0,clearTimeout(M),v.removeEventListener("ended",w);try{v.pause(),v.src=""}catch{}}},[s,o==null?void 0:o.id]),!o)return null;const d=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost",onClick:l,children:"Пропустить повтор"}),a.jsx("button",{onClick:u,children:c?"К ответам →":"Следующий →"})]});if(Rt(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(Up,{q:o,roundName:e.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Повтор вопросов · ${s+1} из ${i.length}`,seconds:e.timer_seconds},o.id),d]});const h=(o.media.question??[]).filter(m=>!/\.(mp3|wav|mp4|webm)$/i.test(m)),p=!!o.question_text.trim();return a.jsxs("div",{className:`host-screen grid-bg recap-screen${h.length?" has-media":""}${p?"":" no-qtext"}`,children:[a.jsxs("div",{className:"host-topbar",children:[a.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),a.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),a.jsxs("div",{className:"recap-body",children:[p&&a.jsx("p",{className:`q-text${Ba(o.question_text)}`,children:o.question_text}),h.length>0&&a.jsx("div",{className:`q-media-grid n${Math.min(h.length,4)}${h.length>1?" eq-row":""}${h.length>4?" wrap2":""}`,style:Td(o),children:h.map((m,x)=>a.jsx(Oa,{src:He(m)},x))})]},o.id),a.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((m,x)=>a.jsx("i",{className:x===s?"on":x<s?"done":""},x))}),d]})}function Wy(n,e){G.useEffect(()=>{if(!n)return;const i=n.questions.filter(o=>!o.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const o of s){const c=He(o);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(o)){const l=document.createElement(/\.(mp4|webm)$/i.test(o)?"video":"audio");l.preload="auto",l.src=c,r.push(l)}else{const l=new Image;l.src=c,r.push(l)}}return()=>{for(const o of r)try{o.src=""}catch{}}},[n,e])}function $y(n,e){G.useEffect(()=>{if(!n)return;const t=[n.rounds[e],n.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const i=[...Gh({id:n.id,rounds:t})];return jh(i),()=>Hh(i)},[n,e])}function Xy({pack:n,slide:e,packId:t,gameState:i}){var h,p;const s=n.rounds.filter(m=>!m.off_scoreboard).map(m=>({id:m.id,name:(m.title_lines??[]).join(" ")||"—",count:m.questions.filter(x=>!x.hidden).length})),r=Un(i.game_id),o=Th(n,r.length),c=Rt(n.theme),l=c&&(e.images??[]).length===1?[He(e.images[0])]:[],u=Ah(l),d=a.jsx("div",{className:"host-actions",children:a.jsx(Yy,{slides:((h=n.settings)==null?void 0:h.info_slides)??[],index:qy(n,e),packId:t,paper:((p=n.settings)==null?void 0:p.play_mode)==="paper"})});if(c){const m=sp({slide:e,rounds:s,stats:o,image:l.length?{src:l[0],...u.sizes[0]}:null});if(m)return a.jsxs(a.Fragment,{children:[l.length&&!u.ready?null:a.jsx(Pp,{view:m}),d]})}return a.jsxs(a.Fragment,{children:[a.jsx(Ch,{slide:e,rounds:s,stats:o,mediaUrl:He}),d]})}function qy(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function Yy({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return a.jsxs(a.Fragment,{children:[e>0&&a.jsx("button",{className:"ghost",onClick:()=>void ii(e-1),children:"← Назад"}),e+1<n.length&&a.jsx("button",{className:"ghost",onClick:()=>void ii(e+1),children:"Дальше →"}),s?i?a.jsx("button",{onClick:()=>void pf(),children:"К подсчёту →"}):a.jsx("button",{onClick:()=>void za(t),children:"К итогам →"}):a.jsx("button",{onClick:()=>void Er("round_intro"),children:"К раунду →"})]})}function Ky({pack:n,round:e,gameState:t}){var f;const{state:i,setState:s}=ah(t.game_id,t.round_number),r=Un(t.game_id),o=Xi(t.game_id,t.round_number,400),c=G.useMemo(()=>e.questions.map(v=>({id:v.id,hidden:v.hidden})),[e.questions]),l=e.settings;G.useEffect(()=>{var E;const v=l.bg_music??((E=n.settings)==null?void 0:E.bg_music);if(!v)return;let w=!1;const b=en();return b.src=He(v),b.loop=!0,b.volume=.6,b.play().then(()=>{if(w)try{b.pause(),b.src=""}catch{}}).catch(()=>{}),()=>{w=!0;try{b.pause(),b.src=""}catch{}}},[e.id,l.bg_music,(f=n.settings)==null?void 0:f.bg_music]);const u=G.useRef(!1),d=async v=>{if(!u.current){u.current=!0,s(v);try{await oh(t.game_id,t.round_number,v),v.finished&&!(i!=null&&i.finished)&&(await ch(t.game_id,t.round_number,Ic(Fc(v),l.timeoutPenalty??10)),Wh(e.id,$h(i,v)).catch(w=>console.warn("банк блица: неотыгранные не вернулись —",w instanceof Error?w.message:w)))}finally{u.current=!1}}};G.useEffect(()=>{if(i||r.length<2)return;const v=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(b=>b.id);d(nf(w,l.teamSeconds??60))},3e3);return()=>clearTimeout(v)},[i,r.length]),G.useEffect(()=>{if(!i||i.finished||i.current)return;const v=setTimeout(()=>{const w=sf(c,i.used);if(!w)return void d(Ur(i));Vh(w.id).catch(()=>{}),d(rf(i,w.id,St()))},Dc);return()=>clearTimeout(v)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const h=i==null?void 0:i.current,p=h?e.questions.find(v=>v.id===h.questionId):void 0,m=i?af(i):void 0;G.useEffect(()=>{if(!i||!h||!p||!m)return;const v=o.find(b=>b.team_id===m&&b.question_ref===`q-${p.id}`);if(!(v!=null&&v.answer_text)||h.lastAnswer===v.answer_text)return;if(v.answer_text===of){d(Fr(bs(i,St()),St()));return}const w=ci(p.answer,v.answer_text)===!0;d(cf(i,St(),w?"ok":"no",v.answer_text))},[o,h==null?void 0:h.questionId,h==null?void 0:h.lastAnswer]);const x=(h==null?void 0:h.verdict)==="no"&&h.attempts+1>=Uc;if(G.useEffect(()=>{if(!i||!(h!=null&&h.verdict))return;const w=Math.max(0,(x?hf:Dc)-(St()-(h.pausedAt??St()))),b=setTimeout(()=>{const E=St(),S=bs(i,E),N=o.find(y=>y.team_id===m&&y.question_ref===`q-${h.questionId}`);N&&Dd.patchAnswer(N.id,{is_correct:h.verdict==="ok"}).catch(()=>{}),d(h.verdict==="ok"?Or(S,E):Br(S,E))},w);return()=>clearTimeout(b)},[h==null?void 0:h.verdict,h==null?void 0:h.lastAnswer]),Rt(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(wh,{state:i,teams:r,bank:c,teamSeconds:l.teamSeconds??60,penalty:l.timeoutPenalty??10,question:v=>{const w=e.questions.find(b=>b.id===v);return w?{text:w.question_text,answer:wn(w)}:void 0}}),a.jsx("div",{className:"host-actions",children:i!=null&&i.finished?a.jsx(Ln,{pack:n,gameState:t}):i&&a.jsxs(a.Fragment,{children:[(h==null?void 0:h.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const v=St(),w=bs(i,v);d(h.verdict==="ok"?Br(w,v):Or(w,v))},children:["Исправить на «",h.verdict==="ok"?"неверно":"верно","»"]}),h&&h.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void d(Fr(i,St())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&d(Ur(i))},children:"Завершить раунд"})]})})]});if(!i)return a.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[a.jsx("div",{className:"host-topbar",children:a.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),a.jsx(Nc,{teams:r,rolling:!0,book:n.theme==="ny_book"})]});if(i.finished){const v=Ic(Fc(i),l.timeoutPenalty??10);return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),a.jsxs("table",{className:"score-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),a.jsx("th",{children:"Очки"}),a.jsx("th",{children:"Баллы"})]})}),a.jsx("tbody",{children:v.map(w=>{var b;return a.jsxs("tr",{children:[a.jsxs("td",{children:[w.place,w.shared?"=":""]}),a.jsx("td",{children:((b=r.find(E=>E.id===w.teamId))==null?void 0:b.name)??"—"}),a.jsx("td",{children:w.points}),a.jsx("td",{children:w.score})]},w.teamId)})})]}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:t})})]})}const M=i.current!=null||Object.values(i.correct).some(v=>v>0)||Object.values(i.missed).some(v=>v>0),g=!h&&i.lastReveal?(()=>{const v=e.questions.find(w=>w.id===i.lastReveal.questionId);if(v)return{questionText:v.question_text,answerText:wn(v),verdict:i.lastReveal.verdict}})():void 0;return a.jsxs(a.Fragment,{children:[a.jsx(Eh,{book:n.theme==="ny_book",teams:r,state:i,bank:c,questionText:p==null?void 0:p.question_text,verdict:h==null?void 0:h.verdict,reveal:g,answerText:(h==null?void 0:h.verdict)==="ok"||(h==null?void 0:h.verdict)==="no"&&h.attempts+1>=Uc?wn(p):void 0,dice:M?void 0:a.jsx(Nc,{teams:r,rolling:!1,pickedId:i.order[0],book:n.theme==="ny_book"})}),a.jsxs("div",{className:"host-actions",children:[(h==null?void 0:h.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const v=St(),w=bs(i,v);d(h.verdict==="ok"?Br(w,v):Or(w,v))},children:["Исправить на «",h.verdict==="ok"?"неверно":"верно","»"]}),h&&h.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void d(Fr(i,St())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&d(Ur(i))},children:"Завершить раунд"})]})]})}function xd({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:o=!1,gameId:c,roundNumber:l}){const u=(n.media.question??[]).some(m=>/\.(mp3|mp4|webm|wav)$/i.test(m)),d=G.useRef(null),h=G.useRef(null),p=G.useRef(!1);return G.useEffect(()=>{if(zy(),o&&!u||t)return;let m=!1;const x=(n.media.question??[]).find(f=>/\.(mp3|wav|m4a|ogg)$/i.test(f));p.current=!1;const M=()=>{if(!m){if(p.current=!0,x){const f=en();f.src=He(x),h.current=f,f.play().catch(()=>{})}Bc(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){M();return}const g=en();return g.src=He(n.media.voice),d.current=g,g.onended=M,g.onerror=M,g.play().then(()=>{if(m)try{g.pause(),g.src=""}catch{}}).catch(M),()=>{var v;m=!0;const f=d.current;if(f){f.onended=null,f.onerror=null;try{f.pause(),f.src=""}catch{}}d.current=null,(v=h.current)==null||v.pause()}},[n.id,o]),G.useEffect(()=>{if(!o||!t||u)return;let m=!1;const x=(n.media.question??[]).find(g=>/\.(mp3|wav|m4a|ogg)$/i.test(g)),M=()=>{if(m||!x)return;const g=en();g.src=He(x),h.current=g,g.play().catch(()=>{})};if(n.media.voice){const g=en();g.src=He(n.media.voice),d.current=g,g.onended=M,g.onerror=M,g.play().then(()=>{if(m)try{g.pause(),g.src=""}catch{}}).catch(M)}else M();return()=>{var f;m=!0;const g=d.current;if(g){g.onended=null,g.onerror=null;try{g.pause(),g.src=""}catch{}}d.current=null,(f=h.current)==null||f.pause()}},[n.id,o,t]),G.useEffect(()=>{if(t||o)return;const m=setInterval(()=>{if(t)return;const x=d.current;x&&!x.paused&&!x.ended||Bc(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(m)},[n.id,t,o]),G.useEffect(()=>{var b;const m=e.settings.bg_music??((b=i==null?void 0:i.settings)==null?void 0:b.bg_music);if(!t||!m||u)return;let x=!1;const M=en();M.src=He(m),M.loop=!0,M.volume=.6,M.play().then(()=>{if(x)try{M.pause(),M.src=""}catch{}}).catch(()=>{});let g;const f=(r??e.timer_seconds??60)*1e3,v=s?f-(St()-new Date(s).getTime()):f,w=window.setTimeout(()=>{g=window.setInterval(()=>{M.volume=Math.max(0,M.volume-.1),M.volume<=.01&&(g&&clearInterval(g),M.pause())},80)},Math.max(0,v)+3e3);return()=>{x=!0,clearTimeout(w),g&&clearInterval(g);try{M.pause(),M.src=""}catch{}}},[t,n.id]),null}function Zy({pack:n,round:e,gameState:t}){var u;const i=e.settings.answerTimeSeconds??60,s=((u=n.settings)==null?void 0:u.play_mode)==="paper",r=Un(t.game_id),o=Xi(t.game_id,t.round_number),c=e.questions.filter(d=>!d.hidden).length;G.useEffect(()=>{var m;const d=e.settings.bg_music??((m=n.settings)==null?void 0:m.bg_music);if(!d)return;let h=!1;const p=en();return p.src=He(d),p.loop=!0,p.volume=.6,p.play().then(()=>{if(h)try{p.pause(),p.src=""}catch{}}).catch(()=>{}),()=>{h=!0;try{p.pause(),p.src=""}catch{}}},[e.id]);const l=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>void fi(e.questions.length-1,_t(t)).catch(vt),children:"← Назад"}),a.jsx("button",{onClick:()=>void hs(0,!1,_t(t)).catch(vt),children:"К ответам →"})]});return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Dp,{num:Kt(n,t.round_number),paper:s,startedAt:t.timer_started_at,seconds:i,teams:s?null:r.map(d=>{const h=o.filter(p=>{var m;return p.team_id===d.id&&((m=p.answer_text)==null?void 0:m.trim())}).length;return{id:d.id,name:d.name,color:oi(d.color),got:h,total:c,done:h>=c}})}),l]}):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[a.jsxs("div",{className:"mono-tag",children:["РАУНД ",Kt(n,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),a.jsx("div",{className:"answer-pulse",children:a.jsx(Cn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),a.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),a.jsx(cs,{startedAt:t.timer_started_at,seconds:i,theme:n.theme,variant:"ring"}),!s&&a.jsx("div",{className:"answer-time-teams",children:r.map(d=>{const h=o.filter(m=>{var x;return m.team_id===d.id&&((x=m.answer_text)==null?void 0:x.trim())}).length,p=h>=c;return n.theme==="ny_book"?a.jsx("div",{className:"at-team bk-at",children:a.jsx(Tn,{name:d.name,ch:74,color:d.color,score:`${h}/${c}`,state:p?"selected":h===0?"none":"normal"})},d.id):a.jsxs("div",{className:`at-team${p?" done":""}`,children:[a.jsx("span",{style:{color:d.color},children:d.name})," · ",h,"/",c]},d.id)})}),l]})}function Jy({pack:n,round:e,q:t,gameState:i}){var A;const s=((A=n.settings)==null?void 0:A.play_mode)==="paper",r=Xi(i.game_id,i.round_number),o=i.reveal,c=Un(i.game_id),[l,u]=G.useState([]);G.useEffect(()=>{ih.from("teams").select("id,name,color").then(({data:P})=>u(P??[]))},[]);const d=r.filter(P=>P.question_ref===`q-${t.id}`),h=e.questions.length,p=i.question_index,m=G.useRef(yf);m.current=bf(m.current,`${i.game_id}:${i.round_number}:${p}`,o);const x=m.current.live,M=n.theme==="ny_book";G.useEffect(()=>{if(o)return;const P=_t(i),R=setTimeout(()=>{ji(P).catch(vt)},3e3);return()=>clearTimeout(R)},[o,p]);const[g,f]=G.useState(!1);G.useEffect(()=>{if(f(!1),!o)return;const P=setTimeout(()=>f(!0),md(t)+600);return()=>clearTimeout(P)},[o,t.id]),G.useEffect(()=>{!g||document.hidden||d.forEach(P=>{if(P.is_correct!=null)return;const R=ci(t.answer,P.answer_text);R!==null&&Dd.patchAnswer(P.id,{is_correct:R}).catch(()=>{})})},[g,p,d.length,d.map(P=>P.answer_text).join("|")]);const{answerImgs:v,questionImgs:w,revealImgs:b}=Rh(t.media),E=t.media.hidden?(t.media.question??[]).find(P=>/\.(mp4|webm)$/i.test(P)):void 0,S=(t.media.answer??[]).find(P=>/\.(mp3|wav|m4a|ogg)$/i.test(P)),N=a.jsxs("div",{className:"host-actions",children:[p>0&&a.jsx("button",{className:"ghost",onClick:()=>void hs(p-1,!0,_t(i)).catch(vt),children:"← Назад"}),o?p<h-1?a.jsx("button",{onClick:()=>void hs(p+1,!1,_t(i)).catch(vt),children:"Следующий вопрос →"}):a.jsx(Ln,{pack:n,gameState:i}):a.jsx("button",{onClick:()=>void ji(_t(i)).catch(vt),children:"Показать ответ →"})]});if(e.mechanic==="crossword"&&Rt(n.theme)&&cc(e))return a.jsx($M,{pack:n,round:e,q:t,step:p,answers:r,teams:c,allTeams:l,revealed:o,checked:g,paper:s,effects:o&&S?a.jsx(Ui,{src:He(S)}):null,video:o&&E?a.jsx(Fa,{src:He(E)}):void 0,imgs:o?b:t.media.hidden?[]:w,actions:N},t.id);if(Rt(n.theme)&&e.mechanic==="sprint")return a.jsxs(a.Fragment,{children:[a.jsx(Nh,{title:e.title_lines.join(" "),count:h,step:p,q:{text:t.question_text,answer:wn(t)},shown:o,verdicts:g,answers:s?null:d.map(P=>{const R=c.find(I=>I.id===P.team_id)??l.find(I=>I.id===P.team_id);return{team:(R==null?void 0:R.name)??"—",color:oi(R==null?void 0:R.color),text:P.answer_text||"—",ok:g?P.is_correct??ci(t.answer,P.answer_text):null}}),qImgs:t.media.hidden?[]:w.map(He),aImgs:b.map(He),note:t.answer_note||void 0,extra:o&&S?a.jsx(Ui,{src:He(S)}):null}),N]});if(Rt(n.theme)&&e.mechanic!=="crossword"&&e.mechanic!=="anagram"&&t.answer.mode!=="crossword_word"&&t.answer.mode!=="anagram")return a.jsx(Dy,{round:e,q:t,step:p,answers:r,teams:c,allTeams:l,revealed:o,checked:g,paper:s,revealMs:md(t),answerText:wn(t),effects:o&&S?a.jsx(Ui,{src:He(S)}):null,video:o&&E?a.jsx(Fa,{src:He(E)}):void 0,actions:N},t.id);if(!o&&e.mechanic!=="anagram"&&t.answer.mode!=="anagram"){const P=new Set(d.filter(R=>R.answer_text!==""&&R.answer_text!=null).map(R=>R.team_id));return a.jsxs(a.Fragment,{children:[a.jsx(Sd,{pack:n,round:e,roundIdx:i.round_number,q:t,qIndex:p,qCount:h,timeLow:!1,reveal:!1,timerRunning:!1,timerStartedAt:null,quiet:!0,timerSlot:null,effectsSlot:null,actionsSlot:N}),!s&&c.length>0&&a.jsxs("div",{className:"answered-chip",role:"status",children:["Ответили ",a.jsx("b",{children:P.size})," из ",a.jsx("b",{children:c.length})]})]})}const y=(t.answer.mode==="choice"||t.answer.mode==="order"||t.answer.mode==="match")&&Ph(t.service,"answer",[],n.theme,Lh(t))!==null;return Ih(n.theme,e.mechanic,t,o,y)?a.jsx(Dh,{pack:n,round:e,q:t,step:p,total:h,roundIdx:i.round_number,paper:s,rows:d,teamOf:P=>c.find(R=>R.id===P)??l.find(R=>R.id===P),checked:g,revealLive:x,shownOf:P=>P.is_correct??ci(t.answer,P.answer_text),actions:N,extra:S?a.jsx(Ui,{src:He(S)}):null}):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[a.jsxs("div",{className:"host-topbar",children:[a.jsxs("span",{className:"mono-tag",children:["РАУНД ",Kt(n,i.round_number)," :: ОТВЕТЫ"]}),a.jsxs("span",{className:"qnum",children:["ВОПРОС ",a.jsx("b",{children:p+1})," / ",h]})]}),a.jsxs("div",{className:`answers-layout${o?" revealed":""}`,style:{marginTop:60},children:[a.jsxs("div",{className:`answers-main${o?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!o&&a.jsxs(a.Fragment,{children:[a.jsx("p",{className:`q-text${Ba(t.question_text)}`,children:t.question_text}),w.length>0&&!t.media.hidden&&a.jsx("div",{className:`q-media-grid n${Math.min(w.length,4)}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,style:Td(t),children:w.map((P,R)=>a.jsx(Oa,{src:He(P)},R))})]}),o&&t.answer.mode!=="match"&&t.question_text.trim()&&a.jsx("p",{className:`q-recall${Ba(t.question_text)}`,children:t.question_text}),o&&a.jsxs("div",{className:`answer-block reveal-in${x?" bk-live":""}${M&&(t.answer_note??"").length<=160?" bk-shortnote":""}`,children:[a.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),E&&a.jsx(Fa,{src:He(E)}),S&&a.jsx(Ui,{src:He(S)}),e.mechanic==="rebus"?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"answer-main",children:wn(t)}),a.jsx("div",{className:"rebus-answer",children:w.slice(0,2).map((P,R)=>a.jsxs("figure",{className:"q-img",children:[a.jsx("img",{src:He(P),alt:""}),a.jsx("figcaption",{children:Gy(R===0?t.service.word1:t.service.word2,R===0)})]},R))})]}):Uh(t)?Fh(t,{theme:n.theme}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:`answer-main${wn(t).length>70?" am-xl":wn(t).length>36?" am-l":""}`,children:wn(t)}),b.length>0&&a.jsx("div",{className:`q-media-grid answer-media n${Math.min(b.length,4)}${b.length>1?" eq-row":""}${b.length>4?" wrap2":""}${v.length?" is-own":" is-recall"}`,children:b.map((P,R)=>a.jsx(Oa,{src:He(P)},R))})]}),g&&t.answer_note&&(M?a.jsx(Oh,{text:t.answer_note,className:Pc(t.answer_note).trim()}):a.jsx("div",{className:`answer-note${Pc(t.answer_note)}`,children:t.answer_note}))]})]}),!s&&a.jsxs("div",{className:"team-answers","data-n":d.length,children:[a.jsx("div",{className:"mono-tag",children:o?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${d.length}`}),d.length===0&&a.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),d.map(P=>{var B,F;const R=c.find(H=>H.id===P.team_id)??l.find(H=>H.id===P.team_id),I=g?P.is_correct??ci(t.answer,P.answer_text):null;return n.theme==="ny_book"?a.jsxs("div",{className:"team-answer bk-ta",children:[a.jsx(Tn,{name:(R==null?void 0:R.name)??"—",ch:d.length>12?40:d.length>8?46:56,color:R==null?void 0:R.color}),a.jsxs("span",{className:"text",children:[o?P.answer_text||"—":"• • •",P.stake!=null&&P.stake!==0&&a.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",P.stake]})]}),a.jsx("span",{className:`bk-ball is-${(B=P.answer_text)!=null&&B.trim()?I===!0?"ok":I===!1?"no":"wait":"none"}`,"aria-hidden":"true",children:a.jsx("i",{children:(F=P.answer_text)!=null&&F.trim()?I===!0?"✓":I===!1?"✗":"":""})})]},P.id):a.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${I===!0?"var(--ok)":I===!1?"var(--danger)":"var(--dim)"}`},children:[a.jsx("span",{className:"name",style:{color:R==null?void 0:R.color},children:(R==null?void 0:R.name)??"—"}),a.jsxs("span",{className:"text",children:[o?P.answer_text||"—":"• • •",P.stake!=null&&P.stake!==0&&a.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",P.stake]})]}),I!=null&&a.jsx("span",{className:"mark",style:{color:I?"var(--ok)":"var(--danger)"},children:I?"✓":"✗"})]},P.id)})]})]}),N]})}function _d({enabled:n,startedAt:e,seconds:t,from:i}){const s=G.useRef(i);return s.current=i,G.useEffect(()=>{if(!n||!e)return;const r=new Date(e).getTime()+t*1e3-St(),o=s.current,c=setTimeout(()=>{ji(o).catch(vt)},Math.max(0,r));return()=>clearTimeout(c)},[n,e,t]),null}function vd({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return G.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,o=Math.max(500,r-St()),c=_t(e),l=setTimeout(()=>{fi(e.question_index+1,c).catch(vt)},o);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function Qy({pack:n,gameState:e}){const t=Un(e.game_id),i=Xi(e.game_id),s=Ad(n,t,i),r=Cd(n,t,i),o=n.rounds.filter(g=>!g.off_scoreboard),c=Ga(t,s,i,r),l=c.map(g=>g.team),[u,d]=G.useState(0);G.useEffect(()=>{if(d(0),l.length===0)return;const g=setInterval(()=>d(f=>f>=l.length?f:f+1),2200);return()=>clearInterval(g)},[l.length,e.round_number]);const h=G.useRef(null),p=wr([l.length,o.length],{shrinkBefore:h}),m=G.useMemo(()=>{const g=new Map(t.map(v=>{const w=s.get(v.id)??0,b=(r.get(v.id)??[])[e.round_number]??0;return[v.id,w-b]})),f=new Map(t.map(v=>[v.id,(r.get(v.id)??[]).slice(0,e.round_number)]));return Ga(t,g,i,f).map(v=>v.team)},[t,s,r,i,e.round_number]),x=G.useRef(new Map),M=G.useRef(null);if(G.useLayoutEffect(()=>{if(n.theme!=="classic"&&n.theme!=="potter"||l.length===0||u<l.length||M.current===e.round_number||(M.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const f=new Map(m.map((w,b)=>[w.id,b]));l.forEach((w,b)=>{const E=x.current.get(w.id);if(!E)return;const N=(f.get(w.id)??b)-b;if(N===0)return;const y=E.getBoundingClientRect().height;E.style.transition="none",E.style.transform=`translateY(${N*y}px)`,E.classList.add("sb-flip"),E.offsetHeight,requestAnimationFrame(()=>{E.style.transition="",E.style.transform=""})});const v=setTimeout(()=>{x.current.forEach(w=>w.classList.remove("sb-flip"))},900);return()=>clearTimeout(v)},[u,l,m,n.theme,e.round_number]),Rt(n.theme)){const g=o.map(E=>n.rounds.indexOf(E)),f=rp(g,e.round_number,c.map(E=>g.map(S=>(r.get(E.team.id)??[])[S]??0))),v=g.slice(0,f),w=g.some(E=>E<e.round_number),b={kind:"regular",title:"Табло",sub:`после раунда ${f} из ${o.length}`,flip:!1,cols:v.map(E=>Kt(n,E)),rows:kd(c,r,v,oi,w?{order:m.map(E=>E.id)}:void 0)};return a.jsxs(a.Fragment,{children:[a.jsx(jd,{view:b,reveal:u,flipKey:w?String(e.round_number):null}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:e})})]})}return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),a.jsx("h2",{className:"sb-title",ref:h,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),a.jsx("div",{className:"sb-table-wrap",children:a.jsxs("table",{ref:p,className:`score-table${Yu(l.length)}`,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),o.map((g,f)=>a.jsxs("th",{children:["Р",f+1]},g.id)),a.jsx("th",{children:"Σ"})]})}),a.jsx("tbody",{children:l.map((g,f)=>{const v=c.find(E=>E.team.id===g.id),w=(v==null?void 0:v.place)??1,b=f>=l.length-u;return a.jsxs("tr",{ref:E=>{E?x.current.set(g.id,E):x.current.delete(g.id)},className:`sb-row${b?" is-in":" is-veiled"}${w===1?" leader":""}`,children:[a.jsxs("td",{children:[w<=3?a.jsx("span",{className:"sb-medal",children:a.jsx(Va,{theme:n.theme,place:w})}):w,(v==null?void 0:v.shared)&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:g.color,fontFamily:"var(--font-display)"},children:n.theme==="ny_book"?a.jsx(Tn,{em:!0,ch:1.9,name:g.name,color:g.color}):a.jsx("span",{className:"sb-name",children:g.name})}),o.map(E=>{const S=r.get(g.id)??[];return a.jsx("td",{children:S[n.rounds.indexOf(E)]??0},E.id)}),a.jsx("td",{className:"total",children:s.get(g.id)??0})]},g.id)})})]})}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:e})})]})}function e1({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=G.useState(i*60);G.useEffect(()=>{const l=t.timer_started_at?new Date(t.timer_started_at).getTime():St(),u=()=>r(Math.max(0,Math.round(i*60-(St()-l)/1e3)));u();const d=setInterval(u,500);return()=>clearInterval(d)},[t.timer_started_at,i]);const o=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Fi,{view:{state:"break",clock:zd(s),sub:"Антракт · скоро продолжим"},step:"break"}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:t})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen",children:[n.theme!=="potter"&&a.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),a.jsx(Cn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),a.jsx(br,{theme:n.theme}),n.theme==="potter"&&a.jsx(wd,{left:s,seconds:i*60,low:s<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:t})})]})}function t1({pack:n,gameState:e}){var l,u;const[i,s]=G.useState(300);G.useEffect(()=>{const d=e.timer_started_at?new Date(e.timer_started_at).getTime():St(),h=()=>s(Math.max(0,Math.round(5*60-(St()-d)/1e3)));h();const p=setInterval(h,500);return()=>clearInterval(p)},[e.timer_started_at]),G.useEffect(()=>{var p,m;const d=((p=n.settings)==null?void 0:p.finale_music)??((m=n.settings)==null?void 0:m.bg_music);if(!d||document.hidden)return;const h=en();return h.src=He(d),h.loop=!0,h.volume=.55,h.play().catch(()=>{}),()=>{try{h.pause(),h.src=""}catch{}}},[(l=n.settings)==null?void 0:l.finale_music,(u=n.settings)==null?void 0:u.bg_music]);const r=Un(Rt(n.theme)?e.game_id:null),o=String(Math.floor(i/60)).padStart(2,"0"),c=String(i%60).padStart(2,"0");return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Fi,{view:{state:"antic",hues:r.map(d=>Rn(d.color)),title:"Подводим итоги",sub:"Скоро объявим победителей",clock:zd(i)},step:`antic-${r.length>0}`}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void za(e.pack_id,!0),children:"К итогам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[a.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),a.jsx(Cn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),a.jsx(br,{theme:n.theme}),n.theme==="potter"&&a.jsx(wd,{left:i,seconds:5*60,low:i<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void za(e.pack_id,!0),children:"К итогам →"})})]})}function n1({pack:n,gameId:e,gameState:t}){var I,B,F,H,K,$,ne;const i=Un(e),s=Xi(e),r=Ad(n,i,s),o=Cd(n,i,s),c=Ga(i,r,s,o),l=!!t.reveal,u=t.question_index??0,[d,h]=G.useState(!((I=n.settings)!=null&&I.show_final_cinematic));G.useEffect(()=>{var pe,fe;const Q=((pe=n.settings)==null?void 0:pe.finale_music)??((fe=n.settings)==null?void 0:fe.bg_music);if(!Q||document.hidden||!d)return;const ie=en();return ie.src=He(Q),ie.loop=!0,ie.volume=.55,ie.play().catch(()=>{}),()=>{try{ie.pause(),ie.src=""}catch{}}},[(B=n.settings)==null?void 0:B.finale_music,(F=n.settings)==null?void 0:F.bg_music,d]);const p=G.useRef(null),m=wr([c.length],{shrinkBefore:p,minScale:.3}),x=n.rounds.map((Q,ie)=>({r:Q,i:ie})).filter(Q=>!Q.r.off_scoreboard),M=x.map(({r:Q,i:ie})=>{var Re;let pe=null,fe=-1/0;for(const ge of i){const Ae=((Re=o.get(ge.id))==null?void 0:Re[ie])??0;Ae>fe&&(fe=Ae,pe=ge)}return{round:Q,idx:ie,team:pe,score:fe}}),g=3e3,f=1e4,v=M.length;G.useEffect(()=>{if(l||u>v||!d)return;const ie=setTimeout(()=>void ii(u+1),u===v?f:g);return()=>clearTimeout(ie)},[l,u,v,d]);const[w,b]=G.useState(0);G.useEffect(()=>{if(b(0),c.length===0)return;let Q=!1,ie=0,pe;const fe=()=>{Q||(ie+=1,b(ie),!(ie>=c.length)&&(pe=setTimeout(fe,Math.max(320,900-90*ie))))};return pe=setTimeout(fe,Math.max(320,900-90*ie)),()=>{Q=!0,clearTimeout(pe)}},[c.length,u,l]);const E=Rt(n.theme);if(!d)return E?a.jsx(Ip,{hues:i.map(Q=>Rn(Q.color)),onDone:()=>h(!0)}):a.jsx(CM,{onDone:()=>h(!0)});if(E){const Q=a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&er()},children:"⟲ Новая игра"})}),ie=x.map(ge=>ge.i),pe={kind:"final",title:"Итоги игры",sub:"разбивка по раундам",flip:!1,cols:ie.map(ge=>Kt(n,ge)),rows:kd(c,o,ie,oi)},fe=a.jsxs(a.Fragment,{children:[a.jsx(jd,{view:pe,reveal:w,flipKey:null}),Q]}),Re=()=>void ii(u+1);if(l){const ge=[...new Set(c.map(z=>z.place))].filter(z=>z<=3).sort((z,Z)=>Z-z);if(u>=ge.length)return fe;const Ae=new Set(ge.slice(0,u+1)),ae=ap(c,oi,Rn).filter(z=>Ae.has(z.place));return a.jsx(Fi,{view:{state:"medals",slots:ae},step:`medals-${u}`,only:ge[u]-1,onClick:Re})}if(u<v){const ge=M.map(Ae=>({n:Kt(n,Ae.idx),name:Ae.round.title_lines.join(" ").replace(/\s+/g," ").trim(),team:Ae.team?{name:Ae.team.name,color:oi(Ae.team.color)}:null,pts:Ae.team?Ae.score:0}));return a.jsx(Fi,{view:{state:"retro",cards:ge,shown:u+1},step:`retro-${u}`,only:u,onClick:Re})}if(u===v){const ge=c.filter(Ae=>Ae.place===1);return a.jsx(Fi,{view:{state:"winner",names:ge.map(Ae=>({name:Ae.team.name,color:oi(Ae.team.color)})),sum:((H=ge[0])==null?void 0:H.total)??0,hues:i.map(Ae=>Rn(Ae.color))},step:"winner",onClick:Re})}return fe}const S=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],N=a.jsx(a.Fragment,{children:Array.from({length:5},(Q,ie)=>a.jsxs("div",{className:"fw-burst",style:{left:`${12+ie*19}%`,top:`${18+ie%3*14}%`},children:[a.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${S[ie%S.length]}55, transparent 70%)`,"--dur":`${2.2+ie*.3}s`,"--delay":`${ie*.45}s`}}),Array.from({length:10},(pe,fe)=>a.jsx("span",{className:"fw-spark",style:{background:S[(ie+fe)%S.length],"--a":`${fe*36}deg`,"--dur":`${2.2+ie*.3}s`,"--delay":`${ie*.45}s`}},fe))]},ie))}),y=n.theme==="ny_book",A=y?` bk-fin bk-fin-v${Sf()}`:"",P=y?[...wf]:["РЕЗУЛЬТАТЫ"],R=a.jsxs("div",{className:"fin-breakdown",children:[a.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),a.jsx("div",{className:"fin-table-wrap",children:a.jsxs("table",{ref:m,className:`fin-table${Yu(c.length)}`,style:{"--half":Math.ceil(c.length/2)},children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),n.rounds.map((Q,ie)=>!Q.off_scoreboard&&a.jsxs("th",{children:["Р",Kt(n,ie),y&&a.jsx("small",{className:"fin-rname",children:Q.title_lines.join(" ").replace(/\s+/g," ").trim()})]},Q.id)),a.jsx("th",{children:y?"Итого":"Σ"})]})}),a.jsx("tbody",{children:c.map(({team:Q,place:ie,shared:pe},fe)=>{const Re=fe>=c.length-w;return a.jsxs("tr",{style:{"--tc":Q.color},className:`fin-row${ie<=3?" top3":""}${ie===1?" fin-first":""}${Re?" is-in":" is-veiled"}`,children:[a.jsxs("td",{className:"fin-pos",children:[ie<=3&&a.jsx(Vd,{place:ie}),ie,pe&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:Q.color},children:n.theme==="ny_book"?a.jsx(Tn,{em:!0,ch:1.9,name:Q.name,color:Q.color}):a.jsx("span",{className:"sb-name",children:Q.name})}),n.rounds.map((ge,Ae)=>{var ae;return!ge.off_scoreboard&&a.jsx("td",{children:((ae=o.get(Q.id))==null?void 0:ae[Ae])??0},ge.id)}),a.jsx("td",{children:a.jsx("b",{children:r.get(Q.id)??0})})]},Q.id)})})]})})]});if(l){const Q=[...new Set(c.map(fe=>fe.place))].filter(fe=>fe<=3).sort((fe,Re)=>Re-fe);if(u>=Q.length)return a.jsxs("div",{className:`host-screen grid-bg fin-screen${A}`,children:[N,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(Cn,{ref:p,theme:n.theme,lines:P}),R,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&er()},children:"⟲ Новая игра"})})]});const ie=Q[u],pe=c.filter(fe=>fe.place===ie);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ii(u+1),children:[ie===1&&N,a.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),a.jsxs("div",{className:`fin-award p${ie}`,children:[a.jsxs("div",{className:"fin-award-place",children:[ie," МЕСТО"]}),a.jsx("div",{className:"fin-award-medal",children:a.jsx(Va,{theme:n.theme,place:ie})}),pe.length>0?pe.map(fe=>y?a.jsx("div",{className:"fin-award-name bk-award-card",children:a.jsx(Tn,{name:fe.team.name,icon:fe.team.icon,color:fe.team.color,ch:104})},fe.team.id):a.jsx("div",{className:"fin-award-name",style:{color:fe.team.color},children:fe.team.name},fe.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(u<v){const Q=M[u];return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ii(u+1),children:[a.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),a.jsxs("div",{className:"fin-slide",children:[a.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Kt(n,Q.idx)," · ",Q.round.title_lines.join(" ")]}),a.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),y&&Q.team?a.jsx("div",{className:"fin-slide-team bk-award-card",children:a.jsx(Tn,{name:Q.team.name,icon:Q.team.icon,color:Q.team.color,ch:104})}):a.jsx("div",{className:"fin-slide-team",style:{color:(K=Q.team)==null?void 0:K.color},children:(($=Q.team)==null?void 0:$.name)??"—"})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"3s"}})},u),a.jsx("div",{className:"fin-dots",children:M.map((ie,pe)=>a.jsx("span",{className:pe===u?"on":""},pe))})]})}if(u===v){const Q=c.filter(ie=>ie.place===1);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ii(u+1),children:[N,a.jsx("div",{className:"mono-tag",children:Q.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),a.jsxs("div",{className:"fin-award p1",children:[a.jsx("div",{className:"fin-award-medal",children:a.jsx(Va,{theme:n.theme,place:1})}),Q.length>0?Q.map(ie=>y?a.jsx("div",{className:"fin-award-name bk-award-card",children:a.jsx(Tn,{name:ie.team.name,icon:ie.team.icon,color:ie.team.color,ch:104})},ie.team.id):a.jsx("div",{className:"fin-award-name",style:{color:ie.team.color},children:ie.team.name},ie.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"}),a.jsx("div",{className:"fin-award-score",children:((ne=Q[0])==null?void 0:ne.total)??0})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return a.jsxs("div",{className:`host-screen grid-bg fin-screen${A}`,children:[N,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(Cn,{ref:y?p:void 0,theme:n.theme,lines:P}),R,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&er()},children:"⟲ Новая игра"})})]})}export{_1 as HostScreen,zy as stopAllMedia};
