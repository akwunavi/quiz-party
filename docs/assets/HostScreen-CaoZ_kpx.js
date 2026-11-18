import{j as a,s as St,a as rh}from"./index-CNoXAYc8.js";import{u as ah,R as oh,a as ch,s as lh,b as dh}from"./useGameState-rw_TqGAE.js";import{r as z}from"./vendor-BbIxR9j-.js";import{c as en,t as ji,h as Rn,m as uh,u as gs,a as yd,S as gn,s as Ac,R as hh,B as fh,b as ph,d as mh,i as gh,e as bd,f as jo,D as xh,g as Tn,j as wr,k as _h,l as Sd,A as Go,n as Ho,T as Vo,Q as Cc,o as Ui,p as vh,q as Rc,r as cs,v as Mh,M as yh,w as bh,J as Sh,x as wh,y as Ln,z as wd,C as Eh,F as Th,E as wn,G as Nc,H as Ah,I as Ch,K as Rh,L as Nh,N as Oa,O as oi,P as Ph,U as Lh,V as Ih,W as Dh,X as Uh,Y as Pc,Z as Ed,_ as Fh}from"./AnswerScreen-C-49FJj9.js";import{m as je,a as ci,u as Un,i as Dr,s as Lc,c as Oh,p as Bh,r as kh,b as Td,d as zh,e as Ic,l as Ba,f as Ad,g as Cd,h as Rd,j as jh,k as Gh}from"./jeopardyActions-BdpRuUHu.js";import{t as dr,n as Hh,l as Vh,a as Wh,b as $h,g as Xh,s as qh,c as Yh,d as fi,e as _t,q as vt,m as ys,f as Kt,h as hs,r as Gi,i as Nd,j as Er,k as er,o as Kh,p as Zh,u as Pd,v as ka,w as Xi,x as Jh,y as Qh,z as Ur,A as ef,N as Dc,B as tf,S as nf,C as Fr,D as bs,E as sf,M as Uc,F as Or,G as Br,H as Fc,I as rf,J as af,K as Oc,L as of,O as Bc,P as za,Q as ii,R as cf,T as lf,U as df}from"./Hint-B8gZwtVO.js";import{l as uf,N as Ss,a as kc,b as zc,S as hf,T as ff,i as Ld,c as pf,d as mf,e as gf,f as Rt,R as xf,r as _f,g as vf,B as Mf}from"./ThemeLayer-B7HBYfQ1.js";import{u as yf,F as bf,g as nt,f as Sf}from"./shell-CwSJGN8U.js";import{Q as ur}from"./QrCode-Yqr8ncZ0.js";import{f as Id,F as Dd,u as wf}from"./fromQuestion-DHozCkwC.js";import{L as Ef,r as ja}from"./ranking-DowkjL5n.js";import{C as jc}from"./CrosswordView-DfTEUy3j.js";import{room as Ud}from"./index-DWE1OUJx.js";import"./pollLoop-BPx8gArJ.js";import"./localPin-DkJiSnQz.js";function Gc({pack:n}){var e,t;return z.useEffect(()=>{var l,d;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((d=n==null?void 0:n.settings)==null?void 0:d.bg_music);if(!i)return;const s=en();s.src=je(i),s.loop=!0,s.volume=.45;let r=!1,o=!1;const c=()=>{o||r||(o=!0,s.play().then(()=>{if(r)try{s.pause(),s.src=""}catch{}}).catch(()=>{}),window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c))};return s.play().then(()=>{if(o=!0,r)try{s.pause(),s.src=""}catch{}}).catch(()=>{r||(window.addEventListener("pointerdown",c),window.addEventListener("keydown",c))}),()=>{r=!0,window.removeEventListener("pointerdown",c),window.removeEventListener("keydown",c);try{s.pause(),s.src=""}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}const Tf=["stands_crowd.webp","village_mid.webp","village_2.webp","spruce_set.webp","butterfly.webp"];let kr=!1;function Af(n,e=fetch){if(!kr){kr=!0;for(const t of Tf)e(`${n}arena/${t}`).then(i=>i.blob()).catch(()=>{kr=!1})}}let ws=null;const Cf=1e-4;function Hc(){try{if(ws){ws.state==="suspended"&&ws.resume().catch(()=>{});return}const n=window.AudioContext??window.webkitAudioContext;if(!n)return;const e=new n,t=Math.max(1,Math.floor(e.sampleRate*2)),i=e.createBuffer(1,t,e.sampleRate),s=i.getChannelData(0);for(let c=0;c<t;c++)s[c]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=i,r.loop=!0;const o=e.createGain();o.gain.value=Cf,r.connect(o),o.connect(e.destination),r.start(),ws=e,e.state==="suspended"&&e.resume().catch(()=>{})}catch{}}function Rf(){const n=()=>Hc();return Hc(),window.addEventListener("pointerdown",n),window.addEventListener("keydown",n),()=>{window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)}}function Fd({hue:n,id:e}){const t=`hsl(${n} 90% 88%)`,i=`hsl(${n} 78% 62%)`,s=`hsl(${n} 60% 26%)`;return a.jsxs("svg",{className:"b-lan",viewBox:"-60 0 120 170","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:`bl-${e}`,cx:"50%",cy:"58%",r:"60%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf0"}),a.jsx("stop",{offset:".22",stopColor:t}),a.jsx("stop",{offset:".62",stopColor:i}),a.jsx("stop",{offset:"1",stopColor:s})]}),a.jsxs("radialGradient",{id:`bg-${e}`,children:[a.jsx("stop",{offset:"0",stopColor:`hsl(${n} 95% 76%)`,stopOpacity:".65"}),a.jsx("stop",{offset:"1",stopColor:`hsl(${n} 95% 60%)`,stopOpacity:"0"})]})]}),a.jsx("ellipse",{className:"glow",cx:"0",cy:"92",rx:"92",ry:"98",fill:`url(#bg-${e})`}),a.jsx("g",{className:"cordg",children:a.jsx("line",{className:"cord",x1:"0",y1:"0",x2:"0",y2:"34",stroke:"#c9a566",strokeWidth:"2.4"})}),a.jsx("g",{transform:"translate(0 34)",children:a.jsxs("g",{className:"lbody",children:[a.jsx("ellipse",{cx:"0",cy:"4",rx:"13",ry:"5",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"1.6"}),a.jsx("path",{d:"M 0 8 C 32 12 46 54 31 96 C 23 116 9 128 0 134 C -9 128 -23 116 -31 96 C -46 54 -32 12 0 8 Z",fill:`url(#bl-${e})`,stroke:"#d9b36a",strokeWidth:"2"}),a.jsxs("g",{className:"ribs",fill:"none",stroke:"#d9b36a",strokeWidth:"1.8",opacity:".85",children:[a.jsx("path",{d:"M 0 8 C 14 40 14 100 0 134"}),a.jsx("path",{d:"M 0 8 C -14 40 -14 100 0 134"}),a.jsx("path",{d:"M 0 8 C 28 40 30 96 0 134"}),a.jsx("path",{d:"M 0 8 C -28 40 -30 96 0 134"})]}),a.jsx("ellipse",{cx:"-14",cy:"44",rx:"6",ry:"14",fill:"#fff",opacity:".35",transform:"rotate(14 -14 44)"}),a.jsx("path",{d:"M -10 136 L 0 156 L 10 136 Z",fill:"#d9b36a",opacity:".9"}),a.jsx("path",{d:"M -18 130 L -14 150 L -6 134 Z M 18 130 L 14 150 L 6 134 Z",fill:"#b88c46",opacity:".8"})]})})]})}const tt={x:960,y:592,rx:250,ry:270},tr=704,nr=1216,Nf=[{py:322,ey:200},{py:474,ey:420},{py:626,ey:630}],Pf=[{py:304,ey:188},{py:424,ey:366},{py:544,ey:522},{py:664,ey:664}],Lf=n=>n<=12?Nf:Pf,Ga=(n,e,t,i)=>{const s=n[t],r=e<0?tr:nr,o=e<0?-30:1950,c=(i-r)/(o-r);return s.py+(s.ey-s.py)*c+Math.sin(c*Math.PI)*38},If=n=>n<=4?44:n<=6?38:n<=9?34:n<=12?31:n<=16?27:24;function Df(n){const e=Lf(n),t=e.length,i=Math.ceil(n/2),s=Math.max(1,Math.ceil(i/t)),r=c=>(n<=6?580:570)-c*(s===2?300:215),o=[];for(let c=0;c<n;c++){const l=c%2?1:-1,d=Math.floor(c/2),u=Math.floor(d/t),f=d%t,h=l<0?r(u):1920-r(u);o.push({x:h,ay:Ga(e,l,f,h),side:l,k:f,col:u})}return{slots:o,ropes:e,cols:s,sc:n<=6?1.15:n<=12?.8:n<=16?.72:.62,nameW:s===1?270:s===2?204:150,fs:If(n)}}const Uf=(n,e)=>`M ${tt.x} ${tt.y} C ${tt.x+(n-tt.x)*.2} ${tt.y-260}, ${n-(n-tt.x)*.35} ${e-180}, ${n} ${e}`,zr={Q:.735,U:.694,I:.304,Z:.599," ":.25,P:.577,A:.647,R:.616,T:.575,Y:.638},Ff=n=>{const e=(n-380)/1160;return 66+Math.sin(Math.max(0,Math.min(1,e))*Math.PI)*54},Of=(()=>{let i=960-[..."QUIZ PARTY"].reduce((s,r)=>s+zr[r]*170+12,-12)/2;return[..."QUIZ PARTY"].flatMap((s,r)=>{const o=i+zr[s]*170/2;return i+=zr[s]*170+12,s===" "?[]:[{c:s,i:r,x:o}]})})(),Ha=24,Vc=Array.from({length:Ha},(n,e)=>{const t=e/Ha*Math.PI*2-Math.PI/2;return{x:tt.x+Math.cos(t)*tt.rx,y:tt.y+Math.sin(t)*tt.ry}}),Wo=n=>Math.min(Ha,4+n*2);function Bf({teams:n,layout:e,fresh:t,qr:i,qrLit:s,litN:r,wait:o,rootRef:c,children:l}){const d=yf(),{slots:u,ropes:f,sc:h,nameW:m}=e,x=[-1,1].flatMap(p=>f.flatMap((v,w)=>Array.from({length:9},(S,E)=>{const b=p<0?tr:nr,N=b+p*(40+E*76);return{x:N,y:Ga(f,p,w,N)+4,o:w*9+E+(p<0?0:1)}}))).sort((p,v)=>p.o-v.o),M=Array.from({length:9},(p,v)=>{const w=v/8;return{x:960+(v%2?14:-14)*(1-w*.4),y:1040-w*190,w:120-w*70,h:24-w*12}}),g=r;return a.jsxs("div",{className:"lb3 lb3-b s1",ref:c,children:[!d&&a.jsx(bf,{rects:[],hazeK:0}),a.jsx("div",{className:"b-grade"}),a.jsxs("svg",{className:"lb3-bg b-bg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsxs("defs",{children:[a.jsxs("radialGradient",{id:"bMoonG",children:[a.jsx("stop",{offset:"0",stopColor:"#fff7dc",stopOpacity:".95"}),a.jsx("stop",{offset:".3",stopColor:"#ffe6a8",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffe6a8",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bMoon",cx:"40%",cy:"38%",r:"70%",children:[a.jsx("stop",{offset:"0",stopColor:"#fffdf2"}),a.jsx("stop",{offset:".6",stopColor:"#f3e2ae"}),a.jsx("stop",{offset:"1",stopColor:"#c9b27a"})]}),a.jsxs("linearGradient",{id:"bWood",x1:"0",y1:"0",x2:"1",y2:"0",children:[a.jsx("stop",{offset:"0",stopColor:"#1a0f08"}),a.jsx("stop",{offset:".35",stopColor:"#6b4526"}),a.jsx("stop",{offset:".6",stopColor:"#4a2e18"}),a.jsx("stop",{offset:"1",stopColor:"#140b06"})]}),a.jsxs("linearGradient",{id:"bText",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0",stopColor:"#fffbe6"}),a.jsx("stop",{offset:".5",stopColor:"#ffe29a"}),a.jsx("stop",{offset:"1",stopColor:"#f0b350"})]}),a.jsxs("radialGradient",{id:"bPool",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd98a",stopOpacity:".5"}),a.jsx("stop",{offset:"1",stopColor:"#ffd98a",stopOpacity:"0"})]}),a.jsxs("radialGradient",{id:"bGoldG",children:[a.jsx("stop",{offset:"0",stopColor:"#ffd68a",stopOpacity:".3"}),a.jsx("stop",{offset:"1",stopColor:"#ffd68a",stopOpacity:"0"})]}),a.jsx("filter",{id:"bBlur2",children:a.jsx("feGaussianBlur",{stdDeviation:"5"})}),a.jsxs("filter",{id:"bNoise",x:"0",y:"0",width:"100%",height:"100%",children:[a.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.02 0.3",numOctaves:"3",seed:"3"}),a.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -1"})]})]}),a.jsx("circle",{cx:tt.x,cy:tt.y,r:"430",fill:"url(#bMoonG)",opacity:".5"}),a.jsx("g",{transform:`translate(${tt.x} ${tt.y})`,children:a.jsxs("g",{className:"b-moon",children:[a.jsx("circle",{r:"210",fill:"url(#bMoon)"}),a.jsx("circle",{cx:"-70",cy:"-50",r:"34",fill:"#cdb67f",opacity:".5"}),a.jsx("circle",{cx:"50",cy:"40",r:"52",fill:"#cdb67f",opacity:".38"}),a.jsx("circle",{cx:"-20",cy:"96",r:"22",fill:"#cdb67f",opacity:".45"}),a.jsx("circle",{cx:"94",cy:"-84",r:"20",fill:"#cdb67f",opacity:".4"})]})}),M.map((p,v)=>a.jsxs("g",{className:"b-stones",children:[a.jsx("ellipse",{cx:p.x,cy:p.y,rx:p.w,ry:p.h,fill:"#17352c",stroke:"#0a1d17",strokeWidth:"2"}),a.jsx("ellipse",{className:"b-stone",cx:p.x,cy:p.y,rx:p.w*.9,ry:p.h*.8,fill:"url(#bPool)",opacity:v<2+Math.min(1,n.length/12)*7?.9:.18})]},v)),a.jsxs("g",{className:"b-ringg",children:[[tr,nr].map((p,v)=>a.jsxs("g",{children:[a.jsx("rect",{x:p-32,y:"250",width:"64",height:"590",rx:"14",fill:"url(#bWood)"}),[0,1,2,3,4,5,6].map(w=>a.jsx("path",{d:`M ${p-32} ${300+w*80} h 64`,stroke:"#0a0502",strokeWidth:"3",opacity:".6"},w)),a.jsx("rect",{x:p-32,y:"250",width:"64",height:"590",rx:"14",filter:"url(#bNoise)",opacity:".5"}),a.jsx("rect",{x:p-42,y:"236",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"}),a.jsx("rect",{x:p-42,y:"826",width:"84",height:"26",rx:"10",fill:"#8a6428",stroke:"#d9b36a",strokeWidth:"2.4"})]},v)),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"#0e0804",strokeWidth:"38"}),a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx,ry:tt.ry,fill:"none",stroke:"url(#bWood)",strokeWidth:"30"}),[0,1,2].map(p=>a.jsx("ellipse",{cx:tt.x,cy:tt.y,rx:tt.rx+(p-1)*7,ry:tt.ry+(p-1)*7,fill:"none",stroke:p===1?"#9b6a3a":"#2f1c0e",strokeWidth:"3",strokeDasharray:p===1?"70 22":"40 40",opacity:".8"},p)),Vc.filter((p,v)=>v%2===0).map((p,v)=>a.jsxs("g",{transform:`translate(${p.x} ${p.y}) rotate(${v*47%360})`,children:[a.jsx("ellipse",{cx:"14",cy:"-6",rx:"15",ry:"6",fill:"#2f7a4a",stroke:"#144a2a",strokeWidth:"1.2"}),a.jsx("ellipse",{cx:"-12",cy:"7",rx:"12",ry:"5",fill:"#3f9a5c",stroke:"#144a2a",strokeWidth:"1.2"})]},`l${v}`)),Vc.map((p,v)=>a.jsx("g",{transform:`translate(${p.x} ${p.y})`,children:a.jsx("circle",{className:`b-rb${v<g?" on":""}`,r:"8",fill:"#ffe2a0",opacity:v<g?1:.28,style:{filter:"drop-shadow(0 0 7px #ffc766)"}})},v))]}),a.jsx("g",{className:"b-ropes",fill:"none",stroke:"#c9a566",strokeWidth:"2.4",opacity:".85",children:[-1,1].flatMap(p=>f.map((v,w)=>{const S=p<0?tr:nr,E=p<0?-30:1950,b=Array.from({length:21},(N,y)=>{const A=S+(E-S)*(y/20);return`${A.toFixed(0)} ${Ga(f,p,w,A).toFixed(0)}`});return a.jsx("path",{d:`M ${b.join(" L ")}`},`${p}${w}`)}))}),x.map((p,v)=>a.jsx("circle",{className:"b-bulb",cx:p.x,cy:p.y,r:"4.5",fill:"#ffe2a0",opacity:v<10+n.length*4?.9:.25,style:{filter:"drop-shadow(0 0 6px #ffc766)"}},v)),u.map((p,v)=>a.jsx("ellipse",{cx:p.x,cy:p.ay+80,rx:"140",ry:"120",fill:"url(#bPool)",opacity:".35"},`p${n[v].id}`)),a.jsx("g",{className:"b-gold",opacity:"0",children:a.jsx("ellipse",{cx:"960",cy:tt.y,rx:"980",ry:"500",fill:"url(#bGoldG)"})}),u.map((p,v)=>a.jsx("path",{className:"b-spark","data-id":n[v].id,d:Uf(p.x,p.ay),pathLength:1,fill:"none",stroke:"#fff6cf",strokeWidth:"7",strokeLinecap:"round",strokeDasharray:"0.07 1.2",opacity:"0",style:{filter:"drop-shadow(0 0 10px #ffd37a)"}},`k${n[v].id}`)),a.jsxs("g",{className:"b-logo",children:[a.jsx("path",{className:"b-swag",d:"M 380 66 C 640 140 1280 140 1540 66",fill:"none",stroke:"#c9a566",strokeWidth:"3"}),Array.from({length:15},(p,v)=>{const w=v/14,S=380+w*1160,E=66+Math.sin(w*Math.PI)*54+4;return a.jsx("circle",{className:"b-swag",cx:S,cy:E+2,r:"5",fill:"#ffe2a0",style:{filter:"drop-shadow(0 0 6px #ffc766)"}},v)}),Of.map(p=>a.jsxs("g",{children:[a.jsx("line",{className:"b-cordL",x1:p.x,y1:Ff(p.x)+2,x2:p.x,y2:"112",stroke:"#c9a566",strokeWidth:"2"}),a.jsx("text",{className:"b-letter-glow",x:p.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"#ffd98a",filter:"url(#bBlur2)",opacity:".85",children:p.c}),a.jsx("text",{className:"b-letter",x:p.x,y:"214",textAnchor:"middle",fontFamily:"Philosopher, sans-serif",fontWeight:"700",fontSize:"170",fill:"url(#bText)",stroke:"#8a5a22",strokeWidth:"3",children:p.c})]},p.i))]})]}),i&&a.jsxs("div",{className:"b-stand",style:{left:64,top:806,"--lit":s?1:.3},children:[a.jsxs("svg",{viewBox:"0 0 270 270","aria-hidden":!0,children:[a.jsx("ellipse",{className:"b-aura",cx:"135",cy:"125",rx:"200",ry:"170",fill:"url(#bPool)",opacity:s?1:0}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"#2a1a0e",stroke:"#d9b36a",strokeWidth:"4"}),a.jsx("rect",{x:"14",y:"6",width:"242",height:"256",rx:"18",fill:"none",stroke:"#ffe2a0",strokeWidth:"2",opacity:"var(--lit)",style:{filter:"drop-shadow(0 0 8px #ffc766)"}}),[34,80,135,190,236].map((p,v)=>a.jsx("circle",{cx:p,cy:v%2?16:20,r:"4.5",fill:"#ffe2a0",opacity:".75",style:{filter:"drop-shadow(0 0 5px #ffc766)"}},v))]}),a.jsx("div",{className:"b-qrbox",children:i}),a.jsx("div",{className:"b-qrcap",children:"Сканируй, чтобы играть"})]}),u.map((p,v)=>{const w=n[v];return a.jsxs("div",{className:`b-team side${p.side<0?"L":"R"}${t.has(w.id)?" fresh":""}`,"data-id":w.id,style:{left:p.x,top:p.ay,"--tc":ji(w.hue),"--sc":h,"--nm":`${w.name.length>26?Math.round(e.fs*.84):e.fs}px`,"--nw":`${m}px`},children:[a.jsx("div",{className:"b-scale",children:a.jsx(Fd,{hue:w.hue,id:w.id})}),a.jsx("div",{className:"nm",children:a.jsx("span",{children:w.name})})]},w.id)}),o&&a.jsx("div",{className:"b-wait",children:"ждём команды…"}),l]})}const si=3.4,hr=.11,fr=.8,Wc=.9;function kf(n){const e=n.reduce((r,o)=>r+o.length,0);let t=2166136261;for(const r of n.flat())for(let o=0;o<r.length;o++)t^=r.charCodeAt(o),t=Math.imul(t,16777619);const i=()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296),s=Array.from({length:e},(r,o)=>o);for(let r=e-1;r>0;r--){const o=Math.floor(i()*(r+1));[s[r],s[o]]=[s[o],s[r]]}return s}function $o(n){const e=n.flatMap((t,i)=>t.map((s,r)=>({name:s,gi:i,j:r})));return{people:e,order:kf(n),N:e.length,groups:n}}function Od(n,e){const t=Math.max(1,...e.map(s=>s.length)),i=Math.min(n,4);return s=>{const r=1100+(s%i-(i-1)/2)*410;if(n<=4)return{cx:r,names:650,sigil:330,size:190,pitch:Math.max(28,Math.min(52,380/t))};const o=t<=4;return s<4?{cx:r,names:o?420:300,sigil:o?210:130,size:o?140:110,pitch:Math.max(26,Math.min(44,(o?140:250)/t))}:{cx:r,names:o?780:740,sigil:o?570:575,size:o?140:110,pitch:Math.max(26,Math.min(44,280/t))}}}const zf=(n,e,t)=>{const i=n*Math.PI*2+e*Math.PI*6;return{x:1030+Math.cos(i)*(t>4?760:700),y:540+Math.sin(i)*230-Math.sin(e*Math.PI)*30}};function jf(n,e,t,i){z.useEffect(()=>{if(!t||!t.length||!i)return;const{people:s,order:r,N:o}=$o(t),c=t.length,l=Od(c,t),d=s.map(f=>{const h=l(f.gi);return{x:h.cx,y:h.names+f.j*h.pitch}}),u=()=>{const f=n()+(i==="done"||i==="back"?20:0),h=o*hr+fr,m=Math.max(0,Math.min(1,(f-Wc)/(si+h-Wc))),x=i==="intro"?0:Math.max(0,Math.min(1,(f-si)/h));e.current.forEach((M,g)=>{if(!M)return;const p=Math.max(0,Math.min(1,(x*h-r[g]*hr)/fr)),v=p*p*(3-2*p),w=zf(r[g]/o,m,c),S=d[g];M.style.transform=`translate(${w.x+(S.x-w.x)*v-S.x}px, ${w.y+(S.y-w.y)*v-S.y}px) scale(${.82+.18*v})`,M.style.opacity=String(i==="back"?0:Math.min(1,m*14)),M.classList.toggle("landed",v>.98)})};return nt.ticker.add(u),u(),()=>nt.ticker.remove(u)},[t,i])}function Gf({groups:n,pills:e}){const{people:t}=$o(n),i=n.length,s=Od(i,n),r=t.length;return a.jsxs("div",{className:`rz3 rz-B${i>4?" k8":""}`,children:[a.jsxs("div",{className:"rz-head",children:[a.jsx("b",{children:"Составы команд"}),a.jsxs("span",{children:[i," · ",r," чел."]})]}),n.map((o,c)=>{const l=s(c),d=Rn(dr(c));return a.jsxs("div",{className:"rz-grp","data-g":c,style:{left:l.cx-190,top:l.sigil,width:380},children:[a.jsx("div",{className:"rz-sg b-sg",style:{height:l.size},children:a.jsx(Fd,{hue:d,id:`sg${c}`})}),a.jsxs("div",{className:"rz-gn",style:{color:ji(d)},children:["Команда ",c+1]})]},c)}),t.map((o,c)=>{const l=s(o.gi);return a.jsx("span",{ref:d=>{d&&(e.current[c]=d)},className:"rz-n",style:{left:l.cx-115,top:l.names+o.j*l.pitch-20,opacity:0,"--tc":ji(Rn(dr(o.gi)))},children:o.name},c)})]})}function Hf(n,e,t,i,s,r){const{groups:o,order:c,people:l,N:d}=$o(t);if(i==="back"){n.fromTo(e(s),{opacity:0},{opacity:1,duration:1.2,stagger:.05},.5).fromTo(e(".rz-veil"),{opacity:1},{opacity:0,duration:1.2,ease:"power2.inOut"},.3).fromTo(e(".rz-head, .rz-grp"),{opacity:1},{opacity:0,duration:.8,stagger:.04},.2);return}if(i==="done"){n.set(e(s),{opacity:0},0).set(e(".rz-veil, .rz-head, .rz-grp"),{opacity:1},0).fromTo(e(".rz-grp .rz-gn"),{opacity:.35,scale:.92},{opacity:1,scale:1,duration:.7,stagger:.12,ease:"back.out(2)"},.3).fromTo(e(".rz-grp .rz-sg"),{filter:"brightness(1.9)"},{filter:"brightness(1)",duration:1.2,stagger:.12},.3).to({},{duration:2.4},0);return}if(n.to(e(s),{opacity:0,duration:.8},.1).fromTo(e(".rz-veil"),{opacity:0},{opacity:1,duration:.8},.1).fromTo(e(".rz-head"),{opacity:0,y:14},{opacity:1,y:0,duration:.6},.5),i==="intro"){n.to({},{duration:4.6},0);return}n.fromTo(e(".rz-grp"),{opacity:0,y:14},{opacity:1,y:0,duration:.6,stagger:.1},si-1),o.forEach((u,f)=>{const h=Math.max(...u.map((m,x)=>c[l.findIndex(M=>M.gi===f&&M.j===x)]))*hr+fr;n.fromTo(e(`.rz-grp[data-g="${f}"] .rz-sg`),{filter:"brightness(1)"},{filter:"brightness(1.9)",duration:.4,yoyo:!0,repeat:1},si+h),r==null||r(si+h,f),n.fromTo(e(`.rz-grp[data-g="${f}"] .rz-gn`),{scale:.9},{scale:1,duration:.5,ease:"back.out(2)"},si+h)}),n.to({},{duration:si+d*hr+fr+.8},.1)}const Xo=n=>`.b-team[data-id="${CSS.escape(n)}"]`;function Vf(n,e,t,i=0){n.fromTo(e(".b-bg"),{opacity:0},{opacity:1,duration:1},i).fromTo(e(".b-moon"),{opacity:0,scale:.7},{opacity:1,scale:1,duration:1.4,ease:"power2.out",transformOrigin:"0px 0px"},i+.2).fromTo(e(".b-ringg"),{opacity:0},{opacity:1,duration:1},i+.5).fromTo(e(".b-rb"),{opacity:0,scale:0},{opacity:s=>{var r;return(r=e(".b-rb")[s])!=null&&r.classList.contains("on")?1:.28},scale:1,duration:.4,stagger:{each:.045,from:"start"},ease:"back.out(3)",transformOrigin:"0px 0px"},i+.8).fromTo(e(".b-swag, .b-cordL"),{opacity:0},{opacity:1,duration:.8},i+1).fromTo(e(".b-letter"),{opacity:0,y:-50},{opacity:1,y:0,duration:.7,stagger:.07,ease:"back.out(1.6)"},i+1.2).fromTo(e(".b-letter-glow"),{opacity:.2},{opacity:1,duration:1,stagger:.05},i+1.9).fromTo(e(".b-stand"),{opacity:0,y:24},{opacity:1,y:0,duration:.9,ease:"power2.out"},i+.9),t.wait&&n.fromTo(e(".b-wait"),{opacity:0,y:10},{opacity:1,y:0,duration:.8},i+2.2),t.settled&&n.fromTo(e(".b-team:not(.fresh)"),{opacity:0},{opacity:1,duration:1.2,stagger:.06},i+.9)}function Wf(n,e,t,i,s){const r=Xo(t),o=Wo(i);n.set(e(r),{visibility:"visible"},s).fromTo(e(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},s).fromTo(e(".b-rb"),{scale:1},{scale:1.9,duration:.25,yoyo:!0,repeat:1,stagger:.012,transformOrigin:"0px 0px"},s).fromTo(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{strokeDashoffset:.08,opacity:1},{strokeDashoffset:-1,duration:.85,ease:"power1.inOut"},s+.15).to(e(`.b-spark[data-id="${CSS.escape(t)}"]`),{opacity:0,duration:.2},s+.85).fromTo(e(`${r} .cordg`),{scaleY:0},{scaleY:1,duration:.45,ease:"power2.out",transformOrigin:"0px 0px"},s+.9).fromTo(e(`${r} .lbody`),{scale:.18,opacity:0,y:-10},{scale:1,opacity:1,y:0,duration:.8,ease:"back.out(1.7)",transformOrigin:"0px 0px"},s+1.2).fromTo(e(`${r} .ribs`),{scaleX:.2},{scaleX:1,duration:.7,ease:"power2.out",transformOrigin:"0px 0px"},s+1.3).fromTo(e(`${r} .glow`),{opacity:0},{opacity:1,duration:.9},s+1.4).fromTo(e(`${r} .b-lan`),{rotation:-5},{rotation:0,duration:1.6,ease:"elastic.out(1,0.35)",transformOrigin:"50% 0%"},s+1.7).fromTo(e(`${r} .nm`),{clipPath:"inset(0 100% 0 0)",opacity:0},{clipPath:"inset(0 0% 0 0)",opacity:1,duration:.8,ease:"power1.inOut"},s+1.8).to(e(".b-rb"),{opacity:c=>c<o?1:.28,duration:.5},s+.3)}function jr(n,e,t,i){const s=Xo(t);n.to(e(`${s} .glow`),{opacity:.08,duration:1},i).to(e(`${s} .lbody`),{filter:"saturate(.2) brightness(.45)",y:10,duration:1.2},i).to(e(`${s} .nm`),{opacity:.38,duration:1},i)}function $f(n,e,t,i){const s=Xo(t);n.to(e(`${s} .glow`),{opacity:1,duration:.8},i).to(e(`${s} .lbody`),{filter:"none",y:0,duration:.9},i).to(e(`${s} .nm`),{opacity:1,duration:.8},i)}function Gr(n,e,t){n.fromTo(e(".b-stand"),{"--lit":.3},{"--lit":1,duration:1.1},t).fromTo(e(".b-aura"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:1.2,transformOrigin:"50% 50%"},t)}function Xf(n,e,t){n.to(e(".b-stand"),{"--lit":.3,duration:.8},t).to(e(".b-aura"),{opacity:0,duration:.8},t)}function qf(n,e,t,i){n.to(e(".b-rb"),{opacity:s=>s<Wo(t)?1:.28,duration:.6},i)}function Yf(n,e,t,i=0){n.to(e(".b-team .nm"),{opacity:0,duration:.7},i+1).to(e(".b-team"),{x:s=>{var r;return(tt.x-(((r=t[s])==null?void 0:r.x)??tt.x))*.9},y:s=>{var r;return(tt.y-(((r=t[s])==null?void 0:r.y)??tt.y))*.9},scale:.15,opacity:0,duration:1.5,stagger:.06,ease:"power2.in",transformOrigin:"0px 0px"},i+1.1).to(e(".b-stand, .b-wait"),{opacity:0,y:40,duration:.9},i+1.6).to(e(".b-bulb, .b-ropes, .b-stones"),{opacity:0,duration:1},i+2.2).to(e(".b-logo"),{opacity:0,y:-80,duration:1,ease:"power2.in"},i+2.4).to(e(".b-rb"),{opacity:0,duration:.8,stagger:.02},i+2.5).to(e(".b-moon"),{scale:1.5,y:-130,opacity:0,duration:1.8,ease:"power2.in",transformOrigin:"0px 0px"},i+3).to(e(".b-ringg"),{y:100,opacity:0,duration:1.6,ease:"power2.in"},i+3.4).to(e(".b-grade"),{opacity:0,duration:1.4},i+3.6)}function Kf({value:n,ink:e="#0d1a15"}){return a.jsx("div",{className:"fo-qr",children:a.jsx(ur,{value:n,quiet:!0,ink:e,title:"QR для подключения"})})}const Zf=".b-team, .b-wait";function Jf({teams:n,playerUrl:e,paper:t,groups:i,groupsOpen:s,onGroupsOpen:r,onGroupsClose:o,leaving:c,onLeft:l}){const d=z.useRef(null),u=z.useMemo(()=>n.map(P=>({id:P.id,name:P.name,hue:Rn(P.color),alive:P.alive})),[n]),f=z.useMemo(()=>Df(u.length),[u.length]),h=z.useMemo(()=>nt.utils.selector(d),[]),m=z.useRef(new Set(u.map(P=>P.id))),[,x]=z.useState(0),M=new Set(u.filter(P=>!m.current.has(P.id)).map(P=>P.id)),g=z.useRef(new Map(u.map(P=>[P.id,P.alive]))),p=z.useRef(new Set),v=z.useRef(Wo(u.length)),w=i.map(P=>P.join(",")).join("|"),S=i.length>0&&s,[E,b]=z.useState(i.length?s?"done":"back":void 0),N=z.useRef(null),y=z.useRef([]);jf(()=>{var P;return((P=N.current)==null?void 0:P.time())??0},y,i.length?i:null,E),z.useLayoutEffect(()=>{const P=nt.timeline();return Vf(P,h,{settled:!i.length,wait:u.length===0&&!i.length}),u.filter(F=>!F.alive).forEach(F=>{const O=nt.timeline();jr(O,h,F.id,0),O.progress(1)}),()=>{P.kill()}},[]),z.useLayoutEffect(()=>{const P=u.filter(O=>!m.current.has(O.id)&&!p.current.has(O.id));P.forEach((O,H)=>{p.current.add(O.id);const Y=nt.timeline({onComplete:()=>{m.current.add(O.id),p.current.delete(O.id),x($=>$+1)}});Wf(Y,h,O.id,u.length,H*.35),O.alive||jr(Y,h,O.id,2.6+H*.35)}),u.forEach(O=>{const H=g.current.get(O.id);if(H!==void 0&&H!==O.alive&&m.current.has(O.id)){const Y=nt.timeline();O.alive?$f(Y,h,O.id,0):jr(Y,h,O.id,0)}g.current.set(O.id,O.alive)}),!P.length&&u.length!==m.current.size&&qf(nt.timeline(),h,u.length,0);const F=new Set(u.map(O=>O.id));m.current.forEach(O=>{F.has(O)||m.current.delete(O)})},[u.map(P=>`${P.id}:${P.alive}`).join("|")]);const A=z.useRef(S),I=z.useRef(w),C=z.useRef(!0);return z.useLayoutEffect(()=>{if(!i.length){b(void 0),A.current=!1,I.current=w,C.current=!1;return}const P=I.current!==w,F=A.current;I.current=w,A.current=S;const O=H=>{var ne;(ne=N.current)==null||ne.kill();const Y=nt.timeline();Hf(Y,h,i,H,Zf,Q=>{Y.fromTo(h(".b-moon"),{filter:"brightness(1)"},{filter:"brightness(1.16)",duration:.3,yoyo:!0,repeat:1},Q)}),N.current=Y,b(H);const $=nt.timeline();H==="back"?Gr($,h,.2):Gr($,h,0)};if(C.current){C.current=!1,O(S?"done":"back");return}S&&(P||!F)?O(P?"run":"done"):!S&&F&&O("back")},[w,S]),z.useEffect(()=>{i.length?Gr(nt.timeline(),h,0):Xf(nt.timeline(),h,0)},[i.length]),z.useEffect(()=>{if(!S)return;const P=F=>{F.key==="Escape"&&o()};return addEventListener("keydown",P),()=>removeEventListener("keydown",P)},[S,o]),z.useLayoutEffect(()=>{if(!c)return;const P=f.slots.map((O,H)=>({id:u[H].id,x:O.x,y:O.ay})),F=nt.timeline({onComplete:()=>l==null?void 0:l()});return Yf(F,h,P,0),()=>{F.kill()}},[c]),a.jsxs(Bf,{teams:u,layout:f,fresh:M,qr:t?null:a.jsx(Kf,{value:e}),qrLit:i.length>0,litN:v.current,wait:u.length===0&&!t&&!i.length,rootRef:d,children:[i.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"rz-veil",onClick:S?o:void 0,style:{pointerEvents:S?"auto":"none"}}),a.jsx(Gf,{groups:i,pills:y})]}),i.length>0&&!S&&a.jsx("button",{type:"button",className:"lb3-grp-btn",onClick:r,children:"СОСТАВЫ КОМАНД"})]})}function Bd({rects:n,srcs:e,fs:t,panel:i}){const s=z.useRef(null);return z.useEffect(()=>{const r=s.current.getContext("2d"),o=uh({rects:n,srcs:e,panel:i},40),c=()=>{r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,1920,1080),o(r,t)};return nt.ticker.add(c),()=>nt.ticker.remove(c)},[n,e,t,i]),a.jsx("canvas",{ref:s,className:"s4-cv",width:1920,height:1080,"aria-hidden":!0})}function ir(n,e,t,i,s){const r=Math.min(i/n.w,s/n.h),o=Math.round(n.w*r),c=Math.round(n.h*r);return{x:Math.round(e-o/2),y:t,w:o,h:c}}const Qf=n=>n<60?`~${n} мин`:`~${Math.floor(n/60)} ч ${n%60?`${n%60} мин`:""}`.trim();function ep(n){var d;const e=n.slide,t=(e.body??"").split(`
`).map(u=>u.trim()).filter(Boolean),i=e.images??[],s=e.show_rounds&&n.rounds.length?n.rounds.map((u,f)=>({n:f+1,name:u.name,count:u.count})):null,r=e.show_stats&&n.stats?n.stats:null,o=r?[[r.roundsCount,"раундов"],[r.questionsCount,"вопросов"],...r.hasMiniGame?[[1,"мини-игра"]]:[],...r.musicTracks>0?[[r.musicTracks,"треков"]]:[],[Qf(r.totalMinutes),"на игру"]]:null;if(i.length>1||i.length===1&&(s||o||t.length===0))return null;const c=i.length===1&&n.image?{src:n.image.src,w:n.image.w,h:n.image.h}:null;if(i.length===1&&!c)return null;const l=t.length===0?"rstats":c?"rimg":t.length>5?"dense":"rules";return{title:(e.title??"").trim()||"ПРАВИЛА",lines:t,rounds:s,stats:o,note:((d=e.note)==null?void 0:d.trim())||null,photo:c,layout:l}}function kd(n,e){const t=n<=8;let i=t?84:66,s=t?9:5;const r=t?200:168;if(n>12){const m=(1060-r)/n;s=m>=44?4:3,i=Math.floor(m-s)}const o=t?790:760,c=t?76:58,l=t?60:46,d=1150-o,u=e>0?Math.min(c,Math.floor(d/e)):c,f=Math.max(14,Math.min(l,u-Math.max(6,Math.round(u*.2)),i-8)),h=n>12||u<c||f<l;return{big:t,rh:i,gap:s,y0:r,brLeft:o,step:u,berry:f,custom:h,nameFs:i>=60?27:Math.max(14,Math.floor(i*.6)),medFs:Math.min(30,Math.round(i*.43)),totFs:Math.min(44,Math.round(i*.78)),berryFs:Math.min(t?32:26,Math.round(f*.56)),colFs:Math.min(24,Math.max(13,Math.round(f*.55)))}}function tp(n,e,t){let i=n.filter(s=>s<=e).length;return t.forEach(s=>s.forEach((r,o)=>{r!==0&&o+1>i&&(i=o+1)})),Math.min(i,n.length)}function zd(n,e,t,i,s){const r=s?new Map(s.order.map((o,c)=>[o,c])):null;return n.map((o,c)=>{const l=e.get(o.team.id)??[],d=r==null?void 0:r.get(o.team.id);return{id:o.team.id,name:o.team.name,color:i(o.team.color),place:o.place,sum:o.total,scores:t.map(u=>l[u]??0),...s?{delta:d==null?0:d-c,prevIdx:d}:{}}})}function np(n,e,t){return[...new Set(n.map(s=>s.place))].filter(s=>s<=3).sort((s,r)=>s-r).map(s=>{var o;const r=n.filter(c=>c.place===s);return{k:s-1,place:s,sum:((o=r[0])==null?void 0:o.total)??0,names:r.map(c=>({name:c.team.name,color:e(c.team.color),hue:t(c.team.color)}))}})}function ip(n){if(n<=0)return[];const e=Math.ceil(n/6),t=Math.ceil(n/e),i=Math.min(280,Math.floor((1800-(t-1)*20)/t)),s=i+20,r=e===1?0:e===2?380:270,o=e===1?400:e===2?240:200;return Array.from({length:n},(c,l)=>{const d=Math.floor(l/t),u=l%t,f=Math.min(t,n-d*t);return{x:(n===6?60:Math.round((1920-(f*s-20))/2))+u*s,y:o+d*r,w:i}})}function sp(n,e){return!n||!e||n===e?null:e==="finale"?"bloom":n==="lobby"&&(e==="info"||e==="intro"||e==="round_intro")?"vine":n==="info"&&e==="round_intro"?"wind":n==="round_intro"&&e==="question"?"fly":e==="scoreboard"?"petal":n==="scoreboard"&&e==="break"?"mist":null}const jd=n=>`${String(Math.floor(Math.max(0,n)/60)).padStart(2,"0")}:${String(Math.max(0,n)%60).padStart(2,"0")}`,Hr=n=>n%10===1&&n%100!==11?"балл":n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?"балла":"баллов";function rp(n){if(n<=0)return{cols:1,rowH:84,fz:32};const e=n<=7?1:n<=16?2:3,t=Math.ceil(n/e),i=Math.min(84,Math.floor((800-(t-1)*10)/t));return{cols:e,rowH:i,fz:Math.min(32,Math.max(15,Math.round(i*.42)))}}function ap(n){switch(n){case"crossword":return"crossword";case"jeopardy":return"jeopardy";case"melody":return"melody";case"anagram":return"anagram";case"sprint":return"sprint";case"blitz":return"blitz";case"four_pics":return"reveal";default:return"standard"}}const op=n=>Math.min(112,Math.floor(1500/Math.max(1,...n.map(e=>e.length)))),cp=n=>Math.max(0,...n.map(e=>e.length))>24;function lp(n,e=20){if(!cp(n))return n;const t=[];for(const i of n){let s="";for(const r of i.split(/\s+/).filter(Boolean))s&&(s+" "+r).length>e?(t.push(s),s=r):s=s?s+" "+r:r;s&&t.push(s)}return t}const dp="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function up({v:n,onReady:e}){const t=n.lines,i=n.layout==="dense",s=n.layout==="rimg"&&!!n.photo,r=n.stats,o=z.useMemo(()=>({grow:[0],reveal:[0],bloom:[0],pulse:0}),[]),c=n.photo,l=z.useMemo(()=>c?[ir(c,1560,250,560,600)]:[],[c]),d=t.length>7?29:t.length>5?34:40,u=JSON.stringify(n),f=gs(),{root:h}=yd(e,(g,p)=>{g.fromTo(p(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(p(".ru-vine"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.6,ease:"power2.inOut"},.2).fromTo(p(".ru-pl"),{opacity:0,x:-24,clipPath:"inset(0 100% 0 0 round 40px)"},{opacity:1,x:0,clipPath:"inset(0 0% 0 0 round 40px)",duration:.6,stagger:i?.3:.45,ease:"power2.out"},.9);const v=.9+t.length*(i?.3:.45);g.fromTo(p(".ru-rd"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.1},.9).fromTo(p(".ru-st"),{opacity:0,scale:.6},{opacity:1,scale:1,duration:.5,stagger:.12,ease:"back.out(2)"},1.6).fromTo(p(".ru-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},v),s&&g.fromTo(o.grow,{0:0},{0:1,duration:1.1,ease:"power2.inOut"},.4).fromTo(o.reveal,{0:0},{0:1,duration:.95,ease:"power2.inOut"},1.4).fromTo(o,{pulse:0},{pulse:1.15,duration:1.1},.4)},null,[u,o]),m=[{x:60,y:30,w:1160,h:980},{x:1250,y:180,w:620,h:780}],x=t.length===0,M=s?!1:!!n.rounds;return z.useLayoutEffect(()=>{const g=h.current;if(!g)return;const p=N=>g.querySelector(N),v=p(".ru-note"),w=v?v.offsetTop-12:1060,S=p(".ru-title");if(S){S.style.fontSize=x?"170px":"";const N=p(".ru-right"),y=x&&N&&N.offsetHeight>0?N.offsetLeft:1880;let A=parseFloat(getComputedStyle(S).fontSize)||120;for(;S.offsetLeft+S.offsetWidth>y&&A>48;)A-=4,S.style.fontSize=`${A}px`}const E=p(".ru-list");if(E){E.style.setProperty("--fz",`${d}px`);let N=d;for(;E.offsetTop+E.offsetHeight>w&&N>18;)N-=1,E.style.setProperty("--fz",`${N}px`)}const b=p(".ru-right");if(b){b.style.transform="";const N=b.offsetHeight,y=w-b.offsetTop;N>y&&N>0&&(b.style.transformOrigin="0 0",b.style.transform=`scale(${Math.max(.4,y/N).toFixed(3)})`)}},[u,d,f,x,h]),a.jsxs(gn,{rects:m,n:null,rootRef:h,cls:`s5 ru ru-${n.layout}`,children:[a.jsx("h1",{className:"ru-title",style:x?{fontSize:170,top:330}:void 0,children:n.title.split("").map((g,p)=>a.jsx("span",{className:"ch",children:g===" "?" ":g},p))}),!x&&a.jsx("svg",{className:"ru-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"ru-vine",d:"M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010"})}),!x&&a.jsx("ol",{className:"ru-list",style:{"--fz":`${d}px`},children:t.map((g,p)=>a.jsxs("li",{className:"ru-pl",children:[a.jsx("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:dp})}),a.jsx("span",{className:"idx",children:String(p+1).padStart(2,"0")}),a.jsx("span",{className:"t",children:g})]},p))}),a.jsxs("div",{className:`ru-right${s?" img":""}`,children:[M&&n.rounds&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"ru-h",children:"Раунды вечера"}),a.jsx("ul",{className:"ru-rounds",children:n.rounds.map((g,p)=>a.jsxs("li",{className:"ru-rd",children:[a.jsx("b",{children:g.n}),a.jsx("span",{children:g.name}),g.count>0&&a.jsxs("em",{children:[g.count," вопр."]})]},p))})]}),r&&a.jsx("div",{className:"ru-stats",children:r.map(([g,p],v)=>a.jsxs("div",{className:"ru-st",children:[a.jsx("b",{className:String(g).length>5?"sm":"",children:g}),a.jsx("span",{children:p})]},v))})]}),s&&c&&a.jsxs(a.Fragment,{children:[a.jsx(Bd,{rects:l,srcs:[c.src],fs:o}),c.caption&&a.jsx("div",{className:"ru-cap",style:{left:l[0].x,width:l[0].w,top:l[0].y+l[0].h+28},children:c.caption})]}),n.note&&a.jsx("div",{className:"ru-note",children:n.note})]})}const hp={crossword:"#ffd98a",standard:"#7ff2d8",jeopardy:"#c9b6ff",melody:"#8fc8ff",anagram:"#ffc27a"},fp={sprint:{cls:"spA",emblem:ph},blitz:{cls:"bz bzC",mood:"calm",emblem:fh},reveal:{cls:"rv rvA",emblem:hh}};function pp({id:n}){if(n==="crossword")return a.jsxs("svg",{className:"em em-cw",viewBox:"0 0 290 270",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"vn vh",d:"M 4 184 L 284 184"}),a.jsx("path",{className:"vn vv",d:"M 90 14 L 90 262"}),[..."РОМАН"].map((c,l)=>a.jsxs("g",{className:"ce r",transform:`translate(${14+l*50} 162)`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"r"+l)),[..."ГЕРОЙ"].map((c,l)=>l===3?null:a.jsxs("g",{className:"ce c",transform:`translate(64 ${12+l*50})`,children:[a.jsx("rect",{width:44,height:44,rx:"6"}),a.jsx("text",{x:44/2,y:44/2+1,children:c})]},"c"+l))]});if(n==="standard")return a.jsx("svg",{className:"em em-q",viewBox:"0 40 220 220",width:"180","aria-hidden":!0,children:a.jsx("g",{transform:"translate(110 222)",children:a.jsxs("g",{className:"qb",children:[Array.from({length:8},(i,s)=>a.jsx("g",{transform:`rotate(${s*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"9",ry:"20"})},s)),a.jsx("circle",{r:"8"})]})})});if(n==="jeopardy")return a.jsx("svg",{className:"em em-jp",viewBox:"0 0 260 260",width:"240","aria-hidden":!0,children:a.jsxs("g",{transform:"translate(130 130)",children:[[["100",-45],["200",45],["300",135],["400",225]].map(([i,s],r)=>a.jsx("g",{transform:`rotate(${s})`,children:a.jsxs("g",{className:"jpt","data-i":r,children:[a.jsx("path",{d:"M 0 -26 C -34 -50 -38 -98 0 -112 C 38 -98 34 -50 0 -26 Z"}),a.jsx("g",{transform:"translate(0 -72)",children:a.jsx("text",{textAnchor:"middle",dominantBaseline:"middle",style:{transform:`rotate(${-s}deg)`},children:i})})]})},r)),a.jsx("circle",{r:"24",className:"jpc"})]})});if(n==="melody")return a.jsxs("svg",{className:"em em-ml",viewBox:"0 0 290 240",width:"270","aria-hidden":!0,children:[a.jsx("path",{className:"ms",d:"M 14 44 C 90 6 200 6 276 46"}),[60,145,230].map((i,s)=>a.jsx("g",{transform:`translate(${i} ${30+(s===1?-4:6)})`,children:a.jsxs("g",{className:"bell","data-i":s,children:[a.jsx("path",{className:"bs",d:"M 0 0 L 0 26"}),a.jsx("path",{className:"bc",d:"M -34 96 C -30 60 -18 34 0 30 C 18 34 30 60 34 96 C 20 90 -20 90 -34 96 Z"}),a.jsx("circle",{className:"bk",cy:"102",r:"7"})]})},s)),[[40,150],[250,120],[150,180]].map(([i,s],r)=>a.jsx("text",{className:"nt",x:i,y:s,"data-i":r,children:"♪"},r))]});const e="ЛЕТО",t=[2,0,3,1];return a.jsxs("svg",{className:"em em-an",viewBox:"0 0 270 230",width:"250","aria-hidden":!0,children:[[...e].map((i,s)=>a.jsx("path",{className:"cup",d:`M ${16+s*62} 168 C ${16+s*62+4} 196 ${16+s*62+22} 206 ${16+s*62+28} 206 C ${16+s*62+36} 206 ${16+s*62+52} 196 ${16+s*62+56} 168 C ${16+s*62+40} 178 ${16+s*62+16} 178 ${16+s*62} 168 Z`},s)),[...e].map((i,s)=>a.jsx("g",{transform:`translate(${44+s*62} 120)`,children:a.jsxs("g",{className:"sd","data-o":t[s],"data-i":s,children:[a.jsx("circle",{r:"25"}),a.jsx("text",{y:"2",children:i})]})},s))]})}function mp(n,e,t){gh(n,e);const i=.9;t==="crossword"&&n.fromTo(e(".em .vn"),{strokeDashoffset:300,opacity:1},{strokeDashoffset:0,duration:.9,stagger:.25,ease:"power2.out"},i).fromTo(e(".em .ce.r"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.3).fromTo(e(".em .ce.c"),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},i+.9),t==="standard"&&n.fromTo(e(".em .qb"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},i+.2),t==="jeopardy"&&n.fromTo(e(".em .jpt"),{scale:0,opacity:0},{scale:1,opacity:1,svgOrigin:"0 0",duration:.5,stagger:.18,ease:"back.out(2)"},i).to(e('.em .jpt[data-i="1"]'),{y:-22,duration:.6,ease:"sine.inOut",yoyo:!0,repeat:1},i+1.2),t==="melody"&&n.fromTo(e(".em .bell"),{rotation:-26,opacity:0},{rotation:0,opacity:1,svgOrigin:"0 0",duration:1.2,stagger:.25,ease:"elastic.out(1,0.35)"},i).fromTo(e(".em .nt"),{opacity:0,y:14},{opacity:1,y:-16,duration:.7,stagger:.2},i+.8),t==="anagram"&&n.fromTo(e(".em .sd"),{y:-150,opacity:0},{y:0,opacity:1,duration:.7,stagger:.16,ease:"bounce.out"},i).fromTo(e(".em .cup"),{opacity:0},{opacity:1,duration:.4,stagger:.1},i-.2)}function gp({kind:n,intro:e,onReady:t}){const i=fp[n],s=lp(e.titleLines),r=op(s),o=`${n}|${JSON.stringify(e)}`,c=gs(),{root:l}=yd(t,(u,f)=>mp(u,f,n),null,[o]);z.useLayoutEffect(()=>{const u=l.current;if(!u)return;const f=u.querySelector(".s1-intro-main"),h=u.querySelector(".s1-intro-title"),m=u.querySelector(".s1-intro-rules");m&&Ac([...m.querySelectorAll(".t")],()=>m.offsetTop+m.offsetHeight<=1050,22);const x=m?m.offsetLeft:1880,M=()=>Math.max(0,...[...(h==null?void 0:h.querySelectorAll(".ln"))??[]].map(g=>[...g.children].reduce((p,v)=>p+v.offsetWidth,0)));f&&h&&Ac([h],()=>{const g=f.offsetLeft+f.clientWidth/2,p=i?Math.min(M(),f.clientWidth):M();return g+p/2<=x&&g-p/2>=20&&f.offsetTop+f.offsetHeight<=1050},40)},[o,c,l,i]);const d=a.jsx(mh,{intro:s===e.titleLines?e:{...e,titleLines:s},emblem:i?i.emblem:a.jsx(pp,{id:n})});return i?a.jsx(gn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:i.cls,moodOverride:i.mood,children:d}):a.jsx(gn,{rects:[{x:460,y:300,w:1e3,h:520}],n:null,rootRef:l,cls:`rv ri ri-${n}`,children:a.jsx("div",{style:{"--acc":hp[n],"--tfs":`${r}px`},children:d})})}const xp="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",_p=["","gold","silver","bronze"];function vp({v:n,rootRef:e,reveal:t}){const{rows:i,flip:s,cols:r}=n,o=i.length,c=r.length,l=kd(o,c),{big:d,rh:u,gap:f,y0:h,custom:m}=l,x=Array.from({length:c},(b,N)=>Math.max(0,...i.map(y=>y.scores[N]??0))),M=t!==void 0,g=b=>!M||b>=o-t,p=gs(),v=i.map(b=>b.name).join("|");z.useLayoutEffect(()=>{const b=e.current;b&&b.querySelectorAll(".bd-nm").forEach(N=>{N.style.fontSize=m?`${l.nameFs}px`:"";let y=parseFloat(getComputedStyle(N).fontSize)||27;for(;N.offsetHeight>u-4&&y>12;)y-=1,N.style.fontSize=`${y}px`})},[v,u,m,l.nameFs,p,e]);const w=[{x:200,y:20,w:1520,h:1040}],S=i.map((b,N)=>N>0&&i[N-1].place===b.place?N:-1).filter(b=>b>=0),E=b=>m?b:void 0;return a.jsxs(gn,{rects:w,n:null,rootRef:e,cls:`s5 bd bd-${n.kind}${d?" big":""}${M?" bd-game":""}${M&&t>=o?" all-in":""}`,children:[a.jsxs("div",{className:"bd-title",children:[a.jsx("b",{children:n.title}),a.jsx("span",{children:n.sub})]}),a.jsxs("div",{className:"bd-colh",style:{top:h-40},children:[r.map((b,N)=>a.jsx("i",{className:N===c-1&&s?"last":"",style:{left:m?l.brLeft+N*l.step:(d?790:760)+N*(d?76:58),width:m?l.berry:d?60:46,...m?{fontSize:l.colFs}:{}},children:b},N)),a.jsx("em",{children:"Σ"})]}),i.map((b,N)=>{const y=b.delta??0;return a.jsxs("div",{className:`bd-row${b.place<=3?" pod p"+b.place:""}${M&&g(N)?" is-in":""}`,"data-i":N,style:{top:h+N*(u+f),height:u,...m?{"--rh":`${u}px`}:{}},children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:xp})}),a.jsx("span",{className:`bd-med ${_p[b.place]??""}`,style:E({fontSize:l.medFs}),children:b.place}),a.jsx("span",{className:"bd-chip",style:y===0?{visibility:"hidden",...E({fontSize:Math.min(22,Math.round(u*.55))})}:E({fontSize:Math.min(22,Math.round(u*.55))}),children:y>0?`▲ ${y}`:`▼ ${-y}`}),a.jsx("span",{className:"bd-nm",style:{color:b.color},children:b.name}),a.jsx("span",{className:"bd-brs",style:E({left:l.brLeft,gap:l.step-l.berry}),children:Array.from({length:c},(A,I)=>{const C=b.scores[I]??0;return a.jsx("i",{className:`bd-bry${C===x[I]&&x[I]>0?" best":""}${C===0?" z":""}${s&&I===c-1?" last":""}`,style:E({width:l.berry,height:l.berry,fontSize:l.berryFs}),children:C},I)})}),a.jsx("span",{className:"bd-tot",style:E({fontSize:l.totFs}),children:s?a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"a",children:b.prevSum??b.sum}),a.jsx("b",{className:"b",children:b.sum})]}):a.jsx("b",{children:b.sum})})]},b.id)}),S.map(b=>a.jsxs("svg",{className:`bd-knot${M&&g(b-1)?" is-in":""}`,style:{top:h+b*(u+f)-f-12,...m?{width:Math.min(70,u+4)}:{}},viewBox:"0 0 60 30","aria-hidden":!0,children:[a.jsx("path",{d:"M 6 4 C 20 4 18 26 30 26 C 42 26 40 4 54 4"}),a.jsx("circle",{cx:"30",cy:"15",r:"6"})]},b))]})}function Ji({hue:n,o:e=1}){const t=`hsl(${n} 55% 74%)`,i=`hsl(${n} 40% 28%)`;return a.jsxs("svg",{className:"lb-fl",viewBox:"-90 -82 180 250","aria-hidden":!0,children:[a.jsx("path",{className:"stem",d:"M 0 56 C -10 100 10 130 0 164"}),a.jsx("path",{className:"lf",d:"M 0 112 C -30 100 -50 112 -56 126 C -34 130 -14 126 0 112 Z"}),a.jsx("path",{className:"lf",d:"M 0 128 C 30 114 50 124 58 138 C 34 144 14 140 0 128 Z"}),a.jsx("g",{transform:"translate(0 0)",children:a.jsxs("g",{className:"bl",style:{transform:`scale(${e})`},children:[Array.from({length:8},(s,r)=>a.jsx("g",{transform:`rotate(${r*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-36",rx:"19",ry:"38",style:{fill:t,stroke:i}})},r)),a.jsx("circle",{r:"17",className:"ct"})]})})]})}const Es=n=>Math.sin(n*91.7+13.1)*43758.5453%1,Mp=[32,352,205,150,270,12,185,48,320,95,228,0],$c=(n,e)=>n.length?n[e%n.length]:Mp[e%12];function yp(n,e,t,i){const s=t.state;s==="last"&&n.fromTo(e(".fl-lab, .fl-q"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6,stagger:.15},.2).fromTo(e(".fl-ans .l"),{opacity:0,scale:.25,y:40},{opacity:1,scale:1,y:0,duration:.55,stagger:.13,ease:"back.out(2)"},1.1).fromTo(e(".fl-vine"),{strokeDashoffset:1200},{strokeDashoffset:0,duration:1.6,ease:"power1.inOut"},2).fromTo(e(".fl-dawn"),{opacity:0},{opacity:1,duration:2.4,ease:"power1.in"},2.4).fromTo(e(".fl-go"),{opacity:0,x:-20},{opacity:1,x:0,duration:.6},3.4),s==="antic"&&(n.fromTo(e(".fl-bud"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.6,stagger:.07,ease:"back.out(1.6)"},.2).fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.6).fromTo(e(".fl-orb"),{x:0,y:0,opacity:0},{opacity:1,x:r=>0*r,duration:.01},.8),e(".fl-orb").forEach((r,o)=>{const c=o/30*Math.PI*2,l=520+o%5*60;n.fromTo(r,{x:Math.cos(c)*l,y:Math.sin(c)*l*.5},{x:0,y:0,duration:2.6,ease:"power2.in"},1+o%10*.08)}),n.fromTo(e(".fl-pod"),{scale:.7},{scale:1.1,duration:3,ease:"power2.in"},1).fromTo(e(".fl-pod"),{rotation:-3},{rotation:3,duration:.12,yoyo:!0,repeat:15,ease:"none"},2.6).fromTo(e(".fl-flash"),{opacity:0},{opacity:.9,duration:.5,yoyo:!0,repeat:1},4.2)),s==="medals"&&(i===void 0?[2,1,0]:[i]).forEach((o,c)=>{const l=.5+c*1.5;n.fromTo(e(`.fl-md[data-k="${o}"] .stem`),{scaleY:0},{scaleY:1,duration:.7,ease:"power2.out",transformOrigin:"50% 100%"},l).fromTo(e(`.fl-md[data-k="${o}"] .bl`),{scale:.2},{scale:1,svgOrigin:"0 0",duration:.9,ease:"back.out(1.8)"},l+.5).fromTo(e(`.fl-md[data-k="${o}"] .disc, .fl-md[data-k="${o}"] .nm, .fl-md[data-k="${o}"] .pt`),{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.12},l+1.1)}),s==="retro"&&t.cards.forEach((r,o)=>{if(i!==void 0&&o!==i)return;const c=i===void 0?o:0;n.fromTo(e(`.fl-rc[data-i="${o}"]`),{opacity:0,y:40,scale:.9},{opacity:1,y:0,scale:1,duration:.6,ease:"back.out(1.5)"},.4+c*.7).fromTo(e(`.fl-rc[data-i="${o}"] .win`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.5},.8+c*.7)}),s==="winner"&&n.fromTo(e(".fl-rays"),{opacity:0,rotation:-30},{opacity:1,rotation:0,duration:2,ease:"power2.out"},.1).fromTo(e(".fl-big .stem"),{scaleY:0},{scaleY:1,duration:.8,ease:"power2.out",transformOrigin:"50% 100%"},.3).fromTo(e(".fl-big .bl"),{scale:.15},{scale:1,svgOrigin:"0 0",duration:1.6,ease:"back.out(1.5)"},.9).fromTo(e(".fl-w1"),{opacity:0,y:-14},{opacity:1,y:0,duration:.7},2).fromTo(e(".fl-w2 .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.04,ease:"back.out(1.8)"},2.3).fromTo(e(".fl-w3"),{opacity:0},{opacity:1,duration:.7},3.2).fromTo(e(".fl-pet"),{opacity:0,y:-80},{opacity:.95,y:r=>120+r%7*120,rotation:r=>r%2?160:-160,duration:3.4,stagger:.07,ease:"sine.out"},2.2),s==="party"&&(n.fromTo(e(".fl-lant"),{y:1200,opacity:0},{y:0,opacity:1,duration:3.6,stagger:.12,ease:"power2.out"},.2).fromTo(e(".fl-th .ch"),{opacity:0,y:36,rotation:-7},{opacity:1,y:0,rotation:0,duration:.6,stagger:.05,ease:"back.out(1.8)"},1).fromTo(e(".fl-pod3 > *"),{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.2},2.4),e(".fl-fw").forEach((r,o)=>n.fromTo(r,{scale:0,opacity:1},{scale:1,duration:1.1,ease:"power2.out"},1.2+o*.5).to(r,{opacity:0,duration:1.2},1.9+o*.5))),s==="break"&&n.fromTo(e(".fl-t1, .fl-t2"),{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.3},.2).fromTo(e(".fl-clock"),{opacity:0,scale:.8},{opacity:1,scale:1,duration:.8,ease:"back.out(1.6)"},.6)}const Vr=n=>n.split("").map((e,t)=>a.jsx("span",{className:"ch",children:e===" "?" ":e},t));function bp({v:n,rootRef:e}){const t=n.state,i=t==="winner"||t==="party"||t==="medals"||t==="last",s="hues"in n?n.hues:[],r=s.join(","),o=z.useMemo(()=>Array.from({length:46},(u,f)=>({x:120+Math.abs(Es(f))*1680,d:Math.abs(Es(f+7))*3,s:.6+Math.abs(Es(f+3))*.9,h:$c(s,f),y:90+Math.abs(Es(f+11))*880})),[r]),c=gs(),l=JSON.stringify(n);z.useLayoutEffect(()=>{const u=e.current;if(!u)return;u.querySelectorAll(".fl-md").forEach(h=>{const m=h.querySelector(".nm"),x=h.querySelector(".pt");if(!m||!x)return;m.style.fontSize="";let M=parseFloat(getComputedStyle(m).fontSize)||38;for(;m.offsetTop+m.offsetHeight+50>1070&&M>16;)M-=2,m.style.fontSize=`${M}px`;const g=m.offsetTop+m.offsetHeight+8;x.offsetTop<g&&(x.style.top=`${g}px`)});const f=u.querySelector(".fl-w2");if(f){const h=f.style.fontSize;let m=parseFloat(h)||100;const x=f.querySelector(":scope > div")?[...f.querySelectorAll(":scope > div")]:[f],M=()=>Math.max(0,...x.map(g=>[...g.querySelectorAll(":scope > .ch")].reduce((p,v)=>p+v.offsetWidth,0)));for(;(M()>f.clientWidth||f.offsetHeight>170)&&m>30;)m-=4,f.style.fontSize=`${m}px`}},[l,c,e]);const d=[{x:300,y:200,w:1400,h:700}];return a.jsxs(gn,{rects:d,n:null,rootRef:e,cls:`s5 fl fl-${t}`,moodOverride:i?"warning":void 0,children:[n.state==="last"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-dawn"}),a.jsxs("div",{className:"fl-lab",style:{left:120,width:1500,top:120},children:["Последний ответ · раунд ",n.round," · вопрос ",n.q," из ",n.of]}),a.jsx("div",{className:"fl-q",style:{left:120,width:1500,top:180},children:n.text}),a.jsx("div",{className:"fl-ans",style:{left:120,width:1500,top:380},children:n.answer.toUpperCase().split("").map((u,f)=>a.jsx("span",{className:"l",children:u},f))}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:a.jsx("path",{className:"fl-vine",d:"M 220 740 C 520 790 760 700 1020 750 S 1500 800 1780 740"})}),a.jsx("div",{className:"fl-go",children:"Подводим итоги →"})]}),n.state==="antic"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:90},children:n.title??"Подводим итоги"}),a.jsx("div",{className:"fl-t2",style:{left:300,width:1500,top:190},children:n.sub??"Скоро объявим победителей"}),n.hues.map((u,f)=>{const h=f/n.hues.length*Math.PI*2-Math.PI/2;return a.jsx("div",{className:"fl-bud",style:{left:1100+Math.cos(h)*640-40,top:590+Math.sin(h)*300-40},children:a.jsx(Ji,{hue:u,o:.38})},f)}),a.jsx("div",{className:"fl-pod",style:{left:1010,top:490},children:a.jsx(Ji,{hue:46,o:.5})}),Array.from({length:30},(u,f)=>a.jsx("i",{className:"fl-orb",style:{left:1091,top:581}},f)),a.jsx("div",{className:"fl-flash"}),n.clock&&a.jsx("div",{className:"fl-clock fl-clock-sm",children:n.clock})]}),n.state==="medals"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:50},children:"Награждение"}),n.slots.map(u=>{var M;const[f,h]=[[1100,250],[560,330],[1640,420]][u.k]??[1100,250],m=["gold","silver","bronze"][u.k],x=u.names.length>1||u.names.some(g=>g.name.length>20);return a.jsxs("div",{className:"fl-md","data-k":u.k,style:{left:f-200,top:0,width:400},children:[a.jsx("div",{className:"stem",style:{left:197,top:h+90,height:720-h}}),a.jsx("div",{className:"fl-fw1",style:{left:100,top:h-100},children:a.jsx(Ji,{hue:((M=u.names[0])==null?void 0:M.hue)??46,o:1})}),a.jsx("div",{className:`disc ${m}`,style:{left:160,top:h-10},children:u.place}),a.jsx("div",{className:"nm",style:{top:800,color:u.names.length===1?u.names[0].color:void 0},children:u.names.length===1?u.names[0].name:u.names.map((g,p)=>a.jsx("div",{style:{color:g.color},children:g.name},p))}),a.jsxs("div",{className:"pt",style:{top:800+(x?118:70)},children:[u.sum," ",Hr(u.sum)]})]},u.k)})]}),n.state==="retro"&&(()=>{const u=ip(n.cards.length),f=n.cards.length!==6,h=[...new Set(u.map(m=>m.y))];return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:300,width:1500,top:h.length>1?40:60},children:"Победители раундов"}),a.jsx("svg",{className:"fl-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:h.map(m=>a.jsx("path",{className:"fl-limb",d:"M 70 380 C 500 340 1400 420 1850 360",transform:m!==400?`translate(0 ${m-400})`:void 0},m))}),n.cards.map((m,x)=>{var M,g;return x>=(n.shown??n.cards.length)?null:a.jsxs("div",{className:"fl-rc","data-i":x,style:{left:u[x].x,top:u[x].y,...f&&u[x].w!==280?{width:u[x].w}:{},...h.length>2?{minHeight:230}:{}},children:[a.jsx("i",{className:"cord"}),a.jsx("b",{className:"rn",children:m.n}),a.jsx("span",{className:"rname",children:m.name}),a.jsx("span",{className:"win",style:{color:(M=m.team)==null?void 0:M.color},children:((g=m.team)==null?void 0:g.name)??"—"}),a.jsxs("em",{children:[m.pts," ",Hr(m.pts)]})]},x)})]})})(),n.state==="winner"&&a.jsxs(a.Fragment,{children:[a.jsx("svg",{className:"fl-rays",viewBox:"-960 -540 1920 1080","aria-hidden":!0,children:Array.from({length:16},(u,f)=>a.jsx("path",{d:"M 0 0 L -60 -1200 L 60 -1200 Z",transform:`rotate(${f*22.5})`},f))}),a.jsx("div",{className:"fl-w1",style:{left:300,width:1500,top:60},children:n.names.length>1?"ПОБЕДИТЕЛИ":"ПОБЕДИТЕЛЬ"}),a.jsxs("div",{className:"fl-big",style:{left:770,top:150},children:[a.jsx("div",{className:"stem"}),a.jsx(Ji,{hue:46,o:1})]}),a.jsx("div",{className:"fl-w2",style:{left:300,width:1500,top:700,fontSize:n.names.length>1||n.names.some(u=>u.name.length>20)?64:100},children:n.names.length===1?Vr(n.names[0].name):n.names.map((u,f)=>a.jsx("div",{children:Vr(u.name)},f))}),a.jsxs("div",{className:"fl-w3",style:{left:300,width:1500,top:880},children:[n.sum," ",Hr(n.sum)]}),o.map((u,f)=>a.jsx("i",{className:"fl-pet",style:{left:u.x,top:-40,"--h":u.h,transform:`scale(${u.s})`}},f))]}),n.state==="party"&&a.jsxs(a.Fragment,{children:[Array.from({length:5},(u,f)=>a.jsx("div",{className:"fl-fw",style:{left:260+f*350,top:180+f%2*150},children:Array.from({length:14},(h,m)=>a.jsx("i",{style:{transform:`rotate(${m*25.7}deg) translateY(-110px)`,background:ji($c(s,f*3+m))}},m))},f)),o.slice(0,26).map((u,f)=>a.jsx("div",{className:"fl-lant",style:{left:u.x,top:u.y,transform:`scale(${u.s*.9})`},children:a.jsx(Ji,{hue:u.h,o:1})},f)),a.jsx("div",{className:"fl-th",style:{left:300,width:1500,top:380},children:Vr("Спасибо за игру!")}),a.jsx("div",{className:"fl-pod3",style:{left:300,width:1500,top:560},children:n.top.map((u,f)=>a.jsxs("span",{style:{color:u.color},children:[a.jsx("b",{children:f+1}),u.name]},f))})]}),n.state==="break"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"fl-t1",style:{left:210,width:1500,top:150},children:"Перерыв"}),a.jsx("div",{className:"fl-t2",style:{left:210,width:1500,top:270},children:n.sub}),a.jsx("div",{className:"fl-clock",children:n.clock})]})]})}const Ts=n=>Math.abs(Math.sin(n*91.7+13.1)*43758.5453%1),Sp=()=>Array.from({length:40},(n,e)=>({y:60+Ts(e)*960,d:Ts(e+5)*.5,s:.7+Ts(e+9),r:Ts(e+3)*360}));function wp({state:n,bits:e}){return a.jsxs(a.Fragment,{children:[n==="vine"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-veil"}),a.jsx("svg",{className:"tr-vine",viewBox:"0 0 1920 1080","aria-hidden":!0,children:Array.from({length:7},(t,i)=>a.jsx("path",{d:`M ${130+i*280} -20 C ${60+i*280} 260 ${230+i*280} 420 ${130+i*280} 560 S ${60+i*280} 860 ${150+i*280} 1100`},i))})]}),n==="wind"&&e.slice(0,26).map((t,i)=>a.jsx("i",{className:"tr-leaf",style:{top:t.y,transform:`scale(${t.s})`}},i)),n==="fly"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"tr-flash"}),Array.from({length:36},(t,i)=>a.jsx("i",{className:"tr-orb",style:{left:960,top:540}},i))]}),n==="petal"&&e.map((t,i)=>a.jsx("i",{className:"tr-pet",style:{top:t.y-140,"--h":i*37%360}},i)),n==="mist"&&[0,1,2,3].map(t=>a.jsx("div",{className:"tr-fog",style:{top:t*270}},t)),n==="bloom"&&a.jsxs("svg",{className:"tr-iris",viewBox:"-300 -300 600 600","aria-hidden":!0,children:[Array.from({length:8},(t,i)=>a.jsx("g",{transform:`rotate(${i*45})`,children:a.jsx("ellipse",{className:"p",cx:"0",cy:"-150",rx:"60",ry:"150"})},i)),a.jsx("circle",{r:"46",fill:"#f0c055"})]})]})}function Ep(n,e,t,i){t==="vine"&&n.set(e(".tr-vine path"),{strokeDashoffset:0},0).set(e(".tr-veil"),{opacity:1},0).to(e(".tr-vine path"),{strokeDashoffset:-1400,duration:.7,stagger:.06,ease:"power2.in"},.1).to(e(".tr-veil"),{opacity:0,duration:.5},.2),t==="wind"&&n.fromTo(e(".tr-leaf"),{x:-400,opacity:0,rotation:s=>s*40},{x:2400,opacity:1,rotation:s=>s*40+540,duration:1.5,stagger:.03,ease:"power1.inOut"},0),t==="fly"&&(e(".tr-orb").forEach((s,r)=>n.fromTo(s,{x:0,y:0,opacity:1,scale:.4},{x:Math.cos(r)*(300+r%7*120),y:Math.sin(r)*(200+r%5*90),scale:1.2,duration:.9,ease:"power2.out"},0).to(s,{opacity:0,duration:.6},.8)),n.fromTo(e(".tr-flash"),{opacity:.95},{opacity:0,duration:.45},0)),t==="petal"&&n.fromTo(e(".tr-pet"),{x:-200,opacity:0},{x:s=>2100+s%4*80,opacity:1,y:s=>i[s].y+140,rotation:s=>i[s].r+500,duration:1.7,stagger:.025,ease:"sine.inOut"},0),t==="mist"&&n.set(e(".tr-fog"),{xPercent:0},0).to(e(".tr-fog"),{xPercent:110,duration:.8,stagger:.1,ease:"power2.in"},.1),t==="bloom"&&n.set(e(".tr-iris"),{scale:1,rotation:50},0).to(e(".tr-iris"),{scale:3.2,opacity:0,rotation:90,duration:.8,ease:"power2.out"},0)}function Tp({kind:n,onDone:e}){const t=z.useRef(null),i=z.useMemo(Sp,[]),s=z.useRef(e);return s.current=e,z.useLayoutEffect(()=>{const r=nt.utils.selector(t),o=nt.timeline({onComplete:()=>s.current()});return Ep(o,r,n,i),()=>{o.kill()}},[n,i]),a.jsx("div",{ref:t,className:`s5 tr tr-ov tr-${n}`,"aria-hidden":!0,children:a.jsx(wp,{state:n,bits:i})})}const Gd=n=>{n.tl.play()};function Ap({view:n}){return a.jsx("div",{className:"fo-screen",children:a.jsx(up,{v:n,onReady:Gd})})}function Cp({kind:n,intro:e}){return a.jsx("div",{className:"fo-screen",children:a.jsx(gp,{kind:n,intro:e,onReady:Gd})})}function Hd({view:n,reveal:e,flipKey:t}){const i=z.useRef(null);jo(i,"in",(d,u)=>{d.fromTo(u(".bd-title"),{opacity:0,y:-14},{opacity:1,y:0,duration:.6},.1).fromTo(u(".bd-colh"),{opacity:0},{opacity:1,duration:.5},.4)});const s=n.rows.length,r=s>0&&e>=s,o=kd(s,n.cols.length),c=z.useRef(null),l=z.useRef(n.rows);return l.current=n.rows,z.useLayoutEffect(()=>{if(!r||!t||c.current===t||!i.current||(c.current=t,typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const d=nt.utils.selector(i),u=nt.timeline({delay:.6});l.current.forEach((f,h)=>{const m=((f.prevIdx??h)-h)*(o.rh+o.gap);m&&u.fromTo(d(`.bd-row[data-i="${h}"]`),{y:m},{y:0,duration:1.3,ease:"power3.inOut",clearProps:"transform"},0)})},[r,t]),a.jsx("div",{className:"fo-screen",children:a.jsx(vp,{v:n,rootRef:i,reveal:e})})}function Fi({view:n,step:e,only:t,onClick:i}){const s=z.useRef(null),r=z.useRef(n);return r.current=n,jo(s,e,(o,c)=>yp(o,c,r.current,t)),a.jsx("div",{className:"fo-screen",onClick:i,children:a.jsx(bp,{v:n,rootRef:s})})}function Rp({hues:n,onDone:e}){const t=z.useRef(e);return t.current=e,z.useEffect(()=>{const i=setTimeout(()=>t.current(),5600);return()=>clearTimeout(i)},[]),a.jsx(Fi,{view:{state:"antic",hues:n},step:"antic"})}function Np({num:n,paper:e,startedAt:t,seconds:i,teams:s}){const r=z.useRef(null),o=bd(t,i,!0);jo(r,"in",(f,h)=>{f.fromTo(h(".ru-title .ch"),{opacity:0,y:30,rotation:-6},{opacity:1,y:0,rotation:0,duration:.55,stagger:.05,ease:"back.out(1.8)"},.1).fromTo(h(".at5-sub"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},.5).fromTo(h(".at5-timer"),{clipPath:"inset(100% -40% 0 -40%)"},{clipPath:"inset(0% -40% 0 -40%)",duration:1.3,ease:"power2.out"},.2).fromTo(h(".at5-t"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.05},.8)});const c=rp((s==null?void 0:s.length)??0),l=gs(),d=(s??[]).map(f=>f.name).join("|");z.useLayoutEffect(()=>{var f;(f=r.current)==null||f.querySelectorAll(".at5-t .nm").forEach(h=>{h.style.fontSize="";const m=h.parentElement;let x=parseFloat(getComputedStyle(h).fontSize)||30;for(;h.offsetHeight>m.clientHeight-6&&x>12;)x-=1,h.style.fontSize=`${x}px`})},[d,l,c.rowH,c.fz]);const u=e?"Сдавайте бланки":"Отвечайте!";return a.jsx("div",{className:"fo-screen",children:a.jsxs(gn,{rects:e?[{x:560,y:160,w:800,h:880}]:[{x:60,y:30,w:600,h:1e3},{x:680,y:220,w:1200,h:830}],n:t?o.left:null,rootRef:r,cls:`s5 ru at5${e?" paper":""}`,children:[a.jsx("h1",{className:"ru-title",children:u.split("").map((f,h)=>a.jsx("span",{className:"ch",children:f===" "?" ":f},h))}),a.jsxs("div",{className:"at5-sub",children:["Раунд ",n," · ",e?"передайте бланки ведущему":"капитаны отправляют ответы с телефонов"]}),a.jsx("div",{className:"at5-timer",children:a.jsx(xh,{n:o.left,total:i,size:e?420:380,seeds:24,stem:e?530:585})}),s&&a.jsx("ul",{className:"at5-teams",style:{gridTemplateColumns:`repeat(${c.cols}, 1fr)`,gridAutoRows:c.rowH,"--fz":`${c.fz}px`},children:s.map(f=>a.jsxs("li",{className:`at5-t${f.done?" done":""}`,children:[a.jsx("span",{className:"nm",style:{color:f.color},children:f.name}),a.jsxs("em",{children:[f.got,"/",f.total]})]},f.id))})]})})}function Pp({q:n,roundName:e,qno:t,seconds:i}){const s=z.useMemo(()=>Id(n,je,""),[n.id,n.question_text,JSON.stringify(n.media),JSON.stringify(n.answer)]);return a.jsx("div",{className:"fo-screen",children:a.jsx(Dd,{q:s,roundName:e,qno:t,startedAt:null,seconds:i,reveal:!1,calm:!0,from:"D"})})}function Lp({on:n,phase:e}){const t=z.useRef(e),[i,s]=z.useState(null);z.useLayoutEffect(()=>{const o=n?sp(t.current,e):null;t.current=e,o&&(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches||s(c=>({kind:o,n:((c==null?void 0:c.n)??0)+1})))},[n,e]);const r=z.useCallback(()=>s(null),[]);return!n||!i?null:a.jsx(Tp,{kind:i.kind,onDone:r},i.n)}function Ip({teams:n,paper:e}){const t=uf(n.length);if(t.mode==="invite")return a.jsxs("div",{className:"bk-teams is-invite",children:[a.jsx("div",{className:"bk-teams-head",children:a.jsx("span",{children:"КОМАНДЫ ЗА СТОЛОМ"})}),a.jsx("p",{className:"bk-invite-big",children:"Ждём первую команду"}),a.jsx("p",{className:"bk-invite-sub",children:e?"Ведущий впишет названия — они появятся на этой странице":"Отсканируйте код слева — название вашей команды появится здесь"})]});const i=n.length,s=i<=8?1:i<=16?2:3,r=Math.ceil(i/s),o=600,c=8,l=Math.max(52,Math.min(150,Math.floor((o-c*(r-1))/r))),d=i>s*8?n.slice(0,s*8-1):n,u=i-d.length;return a.jsxs("div",{className:`bk-teams is-${t.mode} bk-tcards`,style:{"--cols":s,"--per":r,"--ch":l},children:[a.jsxs("div",{className:"bk-teams-head",children:[a.jsx("span",{children:"КОМАНДЫ ЗА СТОЛОМ"}),a.jsx("b",{children:n.length})]}),a.jsxs("ol",{className:"bk-teams-grid bk-tc-grid",style:{gridTemplateColumns:`repeat(${s}, minmax(0, 1fr))`,gridAutoFlow:"row",gridTemplateRows:"none",gap:`${c}px 14px`,alignContent:"start"},children:[d.map(f=>a.jsx("li",{className:"bk-tc-item",children:a.jsx(Tn,{scene:!0,name:f.name,ch:l,color:f.color,icon:f.icon,away:!f.alive})},f.id)),u>0&&a.jsxs("li",{className:"bk-tc-item bk-tc-more",children:["+",u," ещё"]})]})]})}function Dp({paper:n}){return n?a.jsxs("div",{className:`bk-invite${n?" is-paper":""}`,children:[a.jsx("p",{className:"bk-invite-title",children:"Добро пожаловать!"}),a.jsx("p",{className:"bk-invite-text",children:"Бланки — на столах. Впишите название команды и передайте ведущему."})]}):null}function Up({lit:n,children:e}){return a.jsxs("div",{className:`bk-qr${n?" is-lit":""}`,children:[a.jsx("div",{className:"bk-qr-card"}),a.jsx("div",{className:"bk-qr-tile",children:e})]})}function Fp({theme:n,teams:e,playerUrl:t,showQr:i,lit:s}){return n==="ny_book"?a.jsxs(a.Fragment,{children:[a.jsxs(Ss,{where:kc,children:[a.jsx(Ip,{teams:e,paper:!i}),a.jsx(Dp,{paper:!i})]}),i&&a.jsx(Ss,{where:zc,children:a.jsx(Up,{lit:s,children:a.jsx(ur,{value:t,quiet:!0,ink:"#2a1a12",title:"QR для подключения",className:"ny-qr-svg"})})})]}):a.jsxs(a.Fragment,{children:[e.length>0&&a.jsx(Ss,{where:kc,children:a.jsx(hf,{teams:e})}),i&&a.jsx(Ss,{where:zc,children:a.jsx(ff,{lit:s,children:a.jsx(ur,{value:t,quiet:!0,ink:"#0b1735",title:"QR для подключения",className:"ny-qr-svg"})})})]})}const Op=new Set("аеёиоуыэюяАЕЁИОУЫЭЮЯ".split("")),Bp="­",on=n=>Op.has(n),kp=n=>/[А-Яа-яЁё]/.test(n);function zp(n,e=3){const t=[...n];if(t.length<9||!t.every(kp))return[];const i=[];for(let r=1;r<t.length;r++){const o=t[r-1],c=t[r];if("йьъЙЬЪ".includes(c))continue;let l=!1;if(on(o)&&!on(c))l=r+1<t.length&&on(t[r+1]);else if(!on(o)&&!on(c)&&r>=2&&on(t[r-2])&&!"ьъЬЪ".includes(o)){let d=r;for(;d<t.length&&!on(t[d])&&d-r<3;)d++;l=d<t.length&&on(t[d])}else on(o)&&on(c)&&(l=!0);l&&r>=e&&t.length-r>=e&&i.push(r)}const s=[];for(const r of i)(!s.length||r-s[s.length-1]>=4)&&s.push(r);return s}function jp(n){return n.replace(/[А-Яа-яЁё]{9,}/g,e=>{const t=new Set(zp(e));return[...e].map((i,s)=>t.has(s)?Bp+i:i).join("")})}function Xc({lines:n,size:e="lg"}){const t=z.useMemo(()=>n.map(l=>jp(l)),[n]),[i,s]=e==="lg"?[30,132]:[30,64],[r,o]=z.useState(0);z.useEffect(()=>{const l=[window.setTimeout(()=>o(1),400),window.setTimeout(()=>o(2),1600)];return()=>l.forEach(clearTimeout)},[]);const c=wr([t.join("|"),e,r],{range:()=>{const l=_h({w:window.innerWidth,h:window.innerHeight});return{min:i*l,max:s*l}}});return a.jsxs("div",{className:`bk-rt bk-rt-${e}`,children:[a.jsxs("div",{className:"bk-rt-orn","aria-hidden":"true",children:[a.jsx("i",{className:"bk-rt-sprig l"}),a.jsxs("svg",{className:"bk-rt-bow",viewBox:"0 0 120 70",focusable:"false",children:[a.jsx("path",{className:"lp",d:"M60 36 C40 4 8 6 8 28 C8 52 40 52 60 36Z"}),a.jsx("path",{className:"lp",d:"M60 36 C80 4 112 6 112 28 C112 52 80 52 60 36Z"}),a.jsx("path",{className:"tl",d:"M54 40 L36 68 L50 62 L58 44Z"}),a.jsx("path",{className:"tl",d:"M66 40 L84 68 L70 62 L62 44Z"}),a.jsx("ellipse",{className:"kn",cx:"60",cy:"37",rx:"9",ry:"10"})]}),a.jsx("i",{className:"bk-rt-sprig r"})]}),a.jsx("div",{className:"bk-rt-box",children:a.jsx("div",{ref:c,className:"bk-rt-h",role:"heading","aria-level":1,lang:"ru",children:t.map((l,d)=>a.jsxs("span",{className:"bk-rt-line",children:[l,a.jsx("br",{})]},d))})}),a.jsxs("div",{className:"bk-rt-rule","aria-hidden":"true",children:[a.jsx("i",{}),a.jsx("b",{children:"❖"}),a.jsx("i",{})]})]})}const Vd="qp-fx-enabled",Gp=4e3,Hp={classic:520,potter:700};function Vp(){try{const n=localStorage.getItem(Vd);return n===null?!0:n==="1"}catch{return!0}}function Wp(n){try{localStorage.setItem(Vd,n?"1":"0")}catch{}}function $p(){return typeof location<"u"&&location.href.includes("nofx=1")}function Xp({theme:n,trigger:e,hud:t}){const[i,s]=z.useState(Vp),r=z.useRef(null),o=z.useRef(0),[c,l]=z.useState(null);z.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",i),()=>{document.documentElement.classList.remove("fx-force-motion")}),[i]),z.useEffect(()=>{const u=r.current===null;if(r.current=e,u||!i||n==="new_year"||$p())return;const f=Date.now();f-o.current<Gp||(o.current=f,l(f))},[e]),z.useEffect(()=>{if(c===null)return;const u=(Hp[n]??300)+50,f=setTimeout(()=>l(null),u);return()=>clearTimeout(f)},[c,n]);const d=n==="classic"||n==="potter";return a.jsxs(a.Fragment,{children:[d&&a.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":i,title:i?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(u=>{const f=!u;return Wp(f),f}),children:"✨"}),c!==null&&n==="classic"&&a.jsx(Yp,{},c),c!==null&&n==="potter"&&a.jsx(Kp,{},c),n==="classic"&&t&&a.jsx(qp,{label:t},t)]})}function qp({label:n}){const[e,t]=z.useState(()=>90+Math.floor(Math.random()*10));return z.useEffect(()=>{const i=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(i)},[]),a.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",n," · SIG ",e,"%"]})}function Yp(){return a.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[a.jsx("span",{className:"fx-beam"}),a.jsx("span",{className:"fx-rgb"})]})}function Kp(){const n=Array.from({length:22},(e,t)=>t);return a.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>a.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const Zp={1:["#f6d56a","#b8861b","#7b5410"],2:["#eef2f6","#9aa7b4","#5b6671"],3:["#ecae7a","#a8612c","#6b3a17"]};function Wd({place:n}){const[e,t,i]=Zp[n],s=`fm${n}`;let r="";for(let o=0;o<10;o++){const c=o*Math.PI/5-Math.PI/2,l=o%2?7:17;r+=`${o?"L":"M"}${(50+Math.cos(c)*l).toFixed(1)} ${(54+Math.sin(c)*l).toFixed(1)}`}return a.jsxs("svg",{className:`fin-medal m${n}`,viewBox:"0 0 100 124","aria-hidden":"true",children:[a.jsx("defs",{children:a.jsxs("radialGradient",{id:s,cx:"35%",cy:"30%",children:[a.jsx("stop",{offset:"0",stopColor:e}),a.jsx("stop",{offset:".6",stopColor:t}),a.jsx("stop",{offset:"1",stopColor:i})]})}),a.jsx("path",{d:"M30 56 L18 120 L40 108 L50 123 L60 108 L82 120 L70 56Z",fill:"#b3263a",stroke:"#7a1626",strokeWidth:"2"}),a.jsx("circle",{cx:"50",cy:"48",r:"40",fill:`url(#${s})`,stroke:i,strokeWidth:"3"}),a.jsx("circle",{cx:"50",cy:"48",r:"31",fill:"none",stroke:"rgba(255,255,255,.55)",strokeWidth:"2"}),a.jsx("path",{d:`${r}Z`,transform:"translate(0 -6)",fill:"rgba(255,255,255,.92)"})]})}const qc=["🥇","🥈","🥉"];function Va({theme:n,place:e}){return n==="classic"?a.jsx(Jp,{place:e}):n==="potter"?a.jsx(em,{place:e}):n==="new_year"?a.jsx(Qp,{place:e}):n==="ny_book"?a.jsx(Wd,{place:e>=1&&e<=3?e:3}):a.jsx("span",{className:"award-emoji",children:qc[e-1]??qc[2]})}function Jp({place:n}){return a.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ah-orbit"}),a.jsx("span",{className:"ah-face",children:a.jsx("b",{children:n})})]})}function Qp({place:n}){return a.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"ab-cap"}),a.jsxs("span",{className:"ab-ball",children:[a.jsx("span",{className:"ab-shine"}),a.jsx("b",{children:n})]})]})}function em({place:n}){return a.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"am-ribbon"}),a.jsxs("span",{className:"am-disc",children:[a.jsx("span",{className:"am-shine"}),a.jsx("b",{children:n})]})]})}function tm(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}function Wr({rules:n,delay:e,minScale:t=.5}){const i=wr([n.join("|")],{items:".rule-item",minScale:t});return a.jsxs("div",{className:"rules-frame","data-count":n.length,children:[a.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),a.jsx("div",{className:"rules-fit",children:a.jsx("div",{className:"rules-body",ref:i,children:n.map((s,r)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${e(r)}s`},children:[a.jsx("span",{className:"idx",children:String(r+1).padStart(2,"0")}),s]},r))})})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="185",nm=0,Yc=1,im=2,sr=1,sm=2,ls=3,qn=0,Gt=1,En=2,Nn=0,Oi=1,pi=2,Kc=3,Zc=4,rm=5,ri=100,am=101,om=102,cm=103,lm=104,dm=200,um=201,hm=202,fm=203,Wa=204,$a=205,pm=206,mm=207,gm=208,xm=209,_m=210,vm=211,Mm=212,ym=213,bm=214,Xa=0,qa=1,Ya=2,Hi=3,Ka=4,Za=5,Ja=6,Qa=7,$d=0,Sm=1,wm=2,pn=0,Xd=1,qd=2,Yd=3,Kd=4,Zd=5,Jd=6,Qd=7,eu=300,mi=301,Vi=302,$r=303,Xr=304,Tr=306,eo=1e3,An=1001,to=1002,Nt=1003,Em=1004,As=1005,Dt=1006,qr=1007,li=1008,$t=1009,tu=1010,nu=1011,fs=1012,Yo=1013,xn=1014,hn=1015,In=1016,Ko=1017,Zo=1018,ps=1020,iu=35902,su=35899,ru=1021,au=1022,nn=1023,Dn=1026,di=1027,ou=1028,Jo=1029,gi=1030,Qo=1031,ec=1033,rr=33776,ar=33777,or=33778,cr=33779,no=35840,io=35841,so=35842,ro=35843,ao=36196,oo=37492,co=37496,lo=37488,uo=37489,pr=37490,ho=37491,fo=37808,po=37809,mo=37810,go=37811,xo=37812,_o=37813,vo=37814,Mo=37815,yo=37816,bo=37817,So=37818,wo=37819,Eo=37820,To=37821,Ao=36492,Co=36494,Ro=36495,No=36283,Po=36284,mr=36285,Lo=36286,Tm=3200,Io=0,Am=1,Wn="",Yt="srgb",gr="srgb-linear",xr="linear",it="srgb",yi=7680,Jc=519,Cm=512,Rm=513,Nm=514,tc=515,Pm=516,Lm=517,nc=518,Im=519,Qc=35044,el="300 es",fn=2e3,ms=2001;function Dm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function _r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Um(){const n=_r("canvas");return n.style.display="block",n}const tl={};function nl(...n){const e="THREE."+n.shift();console.log(e,...n)}function cu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Be(...n){n=cu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=cu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Bi(...n){const e=n.join(" ");e in tl||(tl[e]=!0,Be(...n))}function Fm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Om={[Xa]:qa,[Ya]:Ja,[Ka]:Qa,[Hi]:Za,[qa]:Xa,[Ja]:Ya,[Qa]:Ka,[Za]:Hi};class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,Do=180/Math.PI;function xs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function Bm(n,e){return(n%e+e)%e}function Kr(n,e,t){return(1-t)*n+t*e}function Qi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const fc=class fc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fc.prototype.isVector2=!0;let Ze=fc;class qi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,c){let l=i[s+0],d=i[s+1],u=i[s+2],f=i[s+3],h=r[o+0],m=r[o+1],x=r[o+2],M=r[o+3];if(f!==M||l!==h||d!==m||u!==x){let g=l*h+d*m+u*x+f*M;g<0&&(h=-h,m=-m,x=-x,M=-M,g=-g);let p=1-c;if(g<.9995){const v=Math.acos(g),w=Math.sin(v);p=Math.sin(p*v)/w,c=Math.sin(c*v)/w,l=l*p+h*c,d=d*p+m*c,u=u*p+x*c,f=f*p+M*c}else{l=l*p+h*c,d=d*p+m*c,u=u*p+x*c,f=f*p+M*c;const v=1/Math.sqrt(l*l+d*d+u*u+f*f);l*=v,d*=v,u*=v,f*=v}}e[t]=l,e[t+1]=d,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,o){const c=i[s],l=i[s+1],d=i[s+2],u=i[s+3],f=r[o],h=r[o+1],m=r[o+2],x=r[o+3];return e[t]=c*x+u*f+l*m-d*h,e[t+1]=l*x+u*h+d*f-c*m,e[t+2]=d*x+u*m+c*h-l*f,e[t+3]=u*x-c*f-l*h-d*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,c=Math.cos,l=Math.sin,d=c(i/2),u=c(s/2),f=c(r/2),h=l(i/2),m=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=h*u*f+d*m*x,this._y=d*m*f-h*u*x,this._z=d*u*x+h*m*f,this._w=d*u*f-h*m*x;break;case"YXZ":this._x=h*u*f+d*m*x,this._y=d*m*f-h*u*x,this._z=d*u*x-h*m*f,this._w=d*u*f+h*m*x;break;case"ZXY":this._x=h*u*f-d*m*x,this._y=d*m*f+h*u*x,this._z=d*u*x+h*m*f,this._w=d*u*f-h*m*x;break;case"ZYX":this._x=h*u*f-d*m*x,this._y=d*m*f+h*u*x,this._z=d*u*x-h*m*f,this._w=d*u*f+h*m*x;break;case"YZX":this._x=h*u*f+d*m*x,this._y=d*m*f+h*u*x,this._z=d*u*x-h*m*f,this._w=d*u*f-h*m*x;break;case"XZY":this._x=h*u*f-d*m*x,this._y=d*m*f-h*u*x,this._z=d*u*x+h*m*f,this._w=d*u*f+h*m*x;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],c=t[5],l=t[9],d=t[2],u=t[6],f=t[10],h=i+c+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-d)*m,this._z=(o-s)*m}else if(i>c&&i>f){const m=2*Math.sqrt(1+i-c-f);this._w=(u-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+d)/m}else if(c>f){const m=2*Math.sqrt(1+c-i-f);this._w=(r-d)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-i-c);this._w=(o-s)/m,this._x=(r+d)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,c=t._x,l=t._y,d=t._z,u=t._w;return this._x=i*u+o*c+s*d-r*l,this._y=s*u+o*l+r*c-i*d,this._z=r*u+o*d+i*l-s*c,this._w=o*u-i*c-s*l-r*d,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,c=this.dot(e);c<0&&(i=-i,s=-s,r=-r,o=-o,c=-c);let l=1-t;if(c<.9995){const d=Math.acos(c),u=Math.sin(d);l=Math.sin(l*d)/u,t=Math.sin(t*d)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const pc=class pc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,c=e.z,l=e.w,d=2*(o*s-c*i),u=2*(c*t-r*s),f=2*(r*i-o*t);return this.x=t+l*d+o*f-c*u,this.y=i+l*u+c*d-r*f,this.z=s+l*f+r*u-o*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,c=t.y,l=t.z;return this.x=s*l-r*c,this.y=r*o-i*l,this.z=i*c-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Zr.copy(this).projectOnVector(e),this.sub(Zr)}reflect(e){return this.sub(Zr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};pc.prototype.isVector3=!0;let J=pc;const Zr=new J,il=new qi,mc=class mc{constructor(e,t,i,s,r,o,c,l,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,d)}set(e,t,i,s,r,o,c,l,d){const u=this.elements;return u[0]=e,u[1]=s,u[2]=c,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[3],l=i[6],d=i[1],u=i[4],f=i[7],h=i[2],m=i[5],x=i[8],M=s[0],g=s[3],p=s[6],v=s[1],w=s[4],S=s[7],E=s[2],b=s[5],N=s[8];return r[0]=o*M+c*v+l*E,r[3]=o*g+c*w+l*b,r[6]=o*p+c*S+l*N,r[1]=d*M+u*v+f*E,r[4]=d*g+u*w+f*b,r[7]=d*p+u*S+f*N,r[2]=h*M+m*v+x*E,r[5]=h*g+m*w+x*b,r[8]=h*p+m*S+x*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],d=e[7],u=e[8];return t*o*u-t*c*d-i*r*u+i*c*l+s*r*d-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],d=e[7],u=e[8],f=u*o-c*d,h=c*l-u*r,m=d*r-o*l,x=t*f+i*h+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/x;return e[0]=f*M,e[1]=(s*d-u*i)*M,e[2]=(c*i-s*o)*M,e[3]=h*M,e[4]=(u*t-s*l)*M,e[5]=(s*r-c*t)*M,e[6]=m*M,e[7]=(i*l-d*t)*M,e[8]=(o*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,c){const l=Math.cos(r),d=Math.sin(r);return this.set(i*l,i*d,-i*(l*o+d*c)+o+e,-s*d,s*l,-s*(-d*o+l*c)+c+t,0,0,1),this}scale(e,t){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jr.makeScale(e,t)),this}rotate(e){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jr.makeRotation(-e)),this}translate(e,t){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};mc.prototype.isMatrix3=!0;let ke=mc;const Jr=new ke,sl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rl=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function km(){const n={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===it&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?xr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[gr]:{primaries:e,whitePoint:i,transfer:xr,toXYZ:sl,fromXYZ:rl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:sl,fromXYZ:rl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),n}const Ye=km();function Pn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ki(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let bi;class zm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{bi===void 0&&(bi=_r("canvas")),bi.width=e.width,bi.height=e.height;const s=bi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=bi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=_r("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pn(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pn(t[i]/255)*255):t[i]=Pn(t[i]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jm=0;class ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=xs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,c=s.length;o<c;o++)s[o].isDataTexture?r.push(Qr(s[o].image)):r.push(Qr(s[o]))}else r=Qr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Qr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Gm=0;const ea=new J;class Ut extends _i{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,i=An,s=An,r=Dt,o=li,c=nn,l=$t,d=Ut.DEFAULT_ANISOTROPY,u=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=xs(),this.name="",this.source=new ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ea).x}get height(){return this.source.getSize(ea).y}get depth(){return this.source.getSize(ea).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case eo:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case eo:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=eu;Ut.DEFAULT_ANISOTROPY=1;const gc=class gc{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,d=l[0],u=l[4],f=l[8],h=l[1],m=l[5],x=l[9],M=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-M)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+M)<.1&&Math.abs(x+g)<.1&&Math.abs(d+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(d+1)/2,S=(m+1)/2,E=(p+1)/2,b=(u+h)/4,N=(f+M)/4,y=(x+g)/4;return w>S&&w>E?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=b/i,r=N/i):S>E?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=b/s,r=y/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=N/r,s=y/r),this.set(i,s,r,t),this}let v=Math.sqrt((g-x)*(g-x)+(f-M)*(f-M)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-x)/v,this.y=(f-M)/v,this.z=(h-u)/v,this.w=Math.acos((d+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gc.prototype.isVector4=!0;let ft=gc;class Hm extends _i{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Ut(s),o=i.count;for(let c=0;c<o;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ic(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mn extends Hm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class lu extends Ut{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vm extends Ut{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sr=class Sr{constructor(e,t,i,s,r,o,c,l,d,u,f,h,m,x,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,c,l,d,u,f,h,m,x,M,g)}set(e,t,i,s,r,o,c,l,d,u,f,h,m,x,M,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=c,p[13]=l,p[2]=d,p[6]=u,p[10]=f,p[14]=h,p[3]=m,p[7]=x,p[11]=M,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Sr().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Si.setFromMatrixColumn(e,0).length(),r=1/Si.setFromMatrixColumn(e,1).length(),o=1/Si.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),c=Math.sin(i),l=Math.cos(s),d=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=o*u,m=o*f,x=c*u,M=c*f;t[0]=l*u,t[4]=-l*f,t[8]=d,t[1]=m+x*d,t[5]=h-M*d,t[9]=-c*l,t[2]=M-h*d,t[6]=x+m*d,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,m=l*f,x=d*u,M=d*f;t[0]=h+M*c,t[4]=x*c-m,t[8]=o*d,t[1]=o*f,t[5]=o*u,t[9]=-c,t[2]=m*c-x,t[6]=M+h*c,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,m=l*f,x=d*u,M=d*f;t[0]=h-M*c,t[4]=-o*f,t[8]=x+m*c,t[1]=m+x*c,t[5]=o*u,t[9]=M-h*c,t[2]=-o*d,t[6]=c,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,m=o*f,x=c*u,M=c*f;t[0]=l*u,t[4]=x*d-m,t[8]=h*d+M,t[1]=l*f,t[5]=M*d+h,t[9]=m*d-x,t[2]=-d,t[6]=c*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*d,x=c*l,M=c*d;t[0]=l*u,t[4]=M-h*f,t[8]=x*f+m,t[1]=f,t[5]=o*u,t[9]=-c*u,t[2]=-d*u,t[6]=m*f+x,t[10]=h-M*f}else if(e.order==="XZY"){const h=o*l,m=o*d,x=c*l,M=c*d;t[0]=l*u,t[4]=-f,t[8]=d*u,t[1]=h*f+M,t[5]=o*u,t[9]=m*f-x,t[2]=x*f-m,t[6]=c*u,t[10]=M*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wm,e,$m)}lookAt(e,t,i){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),kn.crossVectors(i,Vt),kn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),kn.crossVectors(i,Vt)),kn.normalize(),Cs.crossVectors(Vt,kn),s[0]=kn.x,s[4]=Cs.x,s[8]=Vt.x,s[1]=kn.y,s[5]=Cs.y,s[9]=Vt.y,s[2]=kn.z,s[6]=Cs.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],c=i[4],l=i[8],d=i[12],u=i[1],f=i[5],h=i[9],m=i[13],x=i[2],M=i[6],g=i[10],p=i[14],v=i[3],w=i[7],S=i[11],E=i[15],b=s[0],N=s[4],y=s[8],A=s[12],I=s[1],C=s[5],P=s[9],F=s[13],O=s[2],H=s[6],Y=s[10],$=s[14],ne=s[3],Q=s[7],ie=s[11],pe=s[15];return r[0]=o*b+c*I+l*O+d*ne,r[4]=o*N+c*C+l*H+d*Q,r[8]=o*y+c*P+l*Y+d*ie,r[12]=o*A+c*F+l*$+d*pe,r[1]=u*b+f*I+h*O+m*ne,r[5]=u*N+f*C+h*H+m*Q,r[9]=u*y+f*P+h*Y+m*ie,r[13]=u*A+f*F+h*$+m*pe,r[2]=x*b+M*I+g*O+p*ne,r[6]=x*N+M*C+g*H+p*Q,r[10]=x*y+M*P+g*Y+p*ie,r[14]=x*A+M*F+g*$+p*pe,r[3]=v*b+w*I+S*O+E*ne,r[7]=v*N+w*C+S*H+E*Q,r[11]=v*y+w*P+S*Y+E*ie,r[15]=v*A+w*F+S*$+E*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],c=e[5],l=e[9],d=e[13],u=e[2],f=e[6],h=e[10],m=e[14],x=e[3],M=e[7],g=e[11],p=e[15],v=l*m-d*h,w=c*m-d*f,S=c*h-l*f,E=o*m-d*u,b=o*h-l*u,N=o*f-c*u;return t*(M*v-g*w+p*S)-i*(x*v-g*E+p*b)+s*(x*w-M*E+p*N)-r*(x*S-M*b+g*N)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],c=e[9],l=e[2],d=e[6],u=e[10];return t*(o*u-c*d)-i*(r*u-c*l)+s*(r*d-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],c=e[5],l=e[6],d=e[7],u=e[8],f=e[9],h=e[10],m=e[11],x=e[12],M=e[13],g=e[14],p=e[15],v=t*c-i*o,w=t*l-s*o,S=t*d-r*o,E=i*l-s*c,b=i*d-r*c,N=s*d-r*l,y=u*M-f*x,A=u*g-h*x,I=u*p-m*x,C=f*g-h*M,P=f*p-m*M,F=h*p-m*g,O=v*F-w*P+S*C+E*I-b*A+N*y;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/O;return e[0]=(c*F-l*P+d*C)*H,e[1]=(s*P-i*F-r*C)*H,e[2]=(M*N-g*b+p*E)*H,e[3]=(h*b-f*N-m*E)*H,e[4]=(l*I-o*F-d*A)*H,e[5]=(t*F-s*I+r*A)*H,e[6]=(g*S-x*N-p*w)*H,e[7]=(u*N-h*S+m*w)*H,e[8]=(o*P-c*I+d*y)*H,e[9]=(i*I-t*P-r*y)*H,e[10]=(x*b-M*S+p*v)*H,e[11]=(f*S-u*b-m*v)*H,e[12]=(c*A-o*C-l*y)*H,e[13]=(t*C-i*A+s*y)*H,e[14]=(M*w-x*E-g*v)*H,e[15]=(u*E-f*w+h*v)*H,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,c=e.y,l=e.z,d=r*o,u=r*c;return this.set(d*o+i,d*c-s*l,d*l+s*c,0,d*c+s*l,u*c+i,u*l-s*o,0,d*l-s*c,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,c=t._z,l=t._w,d=r+r,u=o+o,f=c+c,h=r*d,m=r*u,x=r*f,M=o*u,g=o*f,p=c*f,v=l*d,w=l*u,S=l*f,E=i.x,b=i.y,N=i.z;return s[0]=(1-(M+p))*E,s[1]=(m+S)*E,s[2]=(x-w)*E,s[3]=0,s[4]=(m-S)*b,s[5]=(1-(h+p))*b,s[6]=(g+v)*b,s[7]=0,s[8]=(x+w)*N,s[9]=(g-v)*N,s[10]=(1-(h+M))*N,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=Si.set(s[0],s[1],s[2]).length();const c=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Zt.copy(this);const d=1/o,u=1/c,f=1/l;return Zt.elements[0]*=d,Zt.elements[1]*=d,Zt.elements[2]*=d,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=f,Zt.elements[9]*=f,Zt.elements[10]*=f,t.setFromRotationMatrix(Zt),i.x=o,i.y=c,i.z=l,this}makePerspective(e,t,i,s,r,o,c=fn,l=!1){const d=this.elements,u=2*r/(t-e),f=2*r/(i-s),h=(t+e)/(t-e),m=(i+s)/(i-s);let x,M;if(l)x=r/(o-r),M=o*r/(o-r);else if(c===fn)x=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(c===ms)x=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return d[0]=u,d[4]=0,d[8]=h,d[12]=0,d[1]=0,d[5]=f,d[9]=m,d[13]=0,d[2]=0,d[6]=0,d[10]=x,d[14]=M,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,i,s,r,o,c=fn,l=!1){const d=this.elements,u=2/(t-e),f=2/(i-s),h=-(t+e)/(t-e),m=-(i+s)/(i-s);let x,M;if(l)x=1/(o-r),M=o/(o-r);else if(c===fn)x=-2/(o-r),M=-(o+r)/(o-r);else if(c===ms)x=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return d[0]=u,d[4]=0,d[8]=0,d[12]=h,d[1]=0,d[5]=f,d[9]=0,d[13]=m,d[2]=0,d[6]=0,d[10]=x,d[14]=M,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Sr.prototype.isMatrix4=!0;let pt=Sr;const Si=new J,Zt=new pt,Wm=new J(0,0,0),$m=new J(1,1,1),kn=new J,Cs=new J,Vt=new J,al=new pt,ol=new qi;class Yn{constructor(e=0,t=0,i=0,s=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],c=s[8],l=s[1],d=s[5],u=s[9],f=s[2],h=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,d)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,d)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,d));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,d),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return al.makeRotationFromQuaternion(e),this.setFromRotationMatrix(al,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ol.setFromEuler(this),this.setFromQuaternion(ol,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class du{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Xm=0;const cl=new J,wi=new qi,vn=new pt,Rs=new J,es=new J,qm=new J,Ym=new qi,ll=new J(1,0,0),dl=new J(0,1,0),ul=new J(0,0,1),hl={type:"added"},Km={type:"removed"},Ei={type:"childadded",child:null},ta={type:"childremoved",child:null};class Bt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new J,t=new Yn,i=new qi,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new ke}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new du,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(ll,e)}rotateY(e){return this.rotateOnAxis(dl,e)}rotateZ(e){return this.rotateOnAxis(ul,e)}translateOnAxis(e,t){return cl.copy(e).applyQuaternion(this.quaternion),this.position.add(cl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ll,e)}translateY(e){return this.translateOnAxis(dl,e)}translateZ(e){return this.translateOnAxis(ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rs.copy(e):Rs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(es,Rs,this.up):vn.lookAt(Rs,es,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),wi.setFromRotationMatrix(vn),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Km),ta.child=e,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,qm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,Ym,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,c=r.length;o<c;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let d=0,u=l.length;d<u;d++){const f=l[d];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,d=this.material.length;l<d;l++)c.push(r(e.materials,this.material[l]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];s.animations.push(r(e.animations,l))}}if(t){const c=o(e.geometries),l=o(e.materials),d=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),m=o(e.animations),x=o(e.nodes);c.length>0&&(i.geometries=c),l.length>0&&(i.materials=l),d.length>0&&(i.textures=d),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(c){const l=[];for(const d in c){const u=c[d];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Bt.DEFAULT_UP=new J(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ui extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zm={type:"move"};class na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const c=this._targetRay,l=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){o=!0;for(const M of e.hand.values()){const g=t.getJointPose(M,i),p=this._getHandJoint(d,M);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=d.joints["index-finger-tip"],f=d.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,x=.005;d.inputState.pinching&&h>m+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&h<=m-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Zm)))}return c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),d!==null&&(d.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function ia(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=Bm(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ia(o,r,e+1/3),this.g=ia(o,r,e),this.b=ia(o,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Yt){function i(r){r!==void 0&&parseFloat(r)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],c=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const i=uu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pn(e.r),this.g=Pn(e.g),this.b=Pn(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Ye.workingToColorSpace(It.copy(this),e),Math.round(Ke(It.r*255,0,255))*65536+Math.round(Ke(It.g*255,0,255))*256+Math.round(Ke(It.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(It.copy(this),t);const i=It.r,s=It.g,r=It.b,o=Math.max(i,s,r),c=Math.min(i,s,r);let l,d;const u=(c+o)/2;if(c===o)l=0,d=0;else{const f=o-c;switch(d=u<=.5?f/(o+c):f/(2-o-c),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=d,e.l=u,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Yt){Ye.workingToColorSpace(It.copy(this),e);const t=It.r,i=It.g,s=It.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Ns);const i=Kr(zn.h,Ns.h,t),s=Kr(zn.s,Ns.s,t),r=Kr(zn.l,Ns.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Xe;Xe.NAMES=uu;class Ar{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new Ar(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class hu extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jt=new J,Mn=new J,sa=new J,yn=new J,Ti=new J,Ai=new J,fl=new J,ra=new J,aa=new J,oa=new J,ca=new ft,la=new ft,da=new ft;class tn{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Jt.subVectors(e,t),s.cross(Jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Jt.subVectors(s,t),Mn.subVectors(i,t),sa.subVectors(e,t);const o=Jt.dot(Jt),c=Jt.dot(Mn),l=Jt.dot(sa),d=Mn.dot(Mn),u=Mn.dot(sa),f=o*d-c*c;if(f===0)return r.set(0,0,0),null;const h=1/f,m=(d*l-c*u)*h,x=(o*u-c*l)*h;return r.set(1-m-x,x,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,i,s,r,o,c,l){return this.getBarycoord(e,t,i,s,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yn.x),l.addScaledVector(o,yn.y),l.addScaledVector(c,yn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ca.setScalar(0),la.setScalar(0),da.setScalar(0),ca.fromBufferAttribute(e,t),la.fromBufferAttribute(e,i),da.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ca,r.x),o.addScaledVector(la,r.y),o.addScaledVector(da,r.z),o}static isFrontFacing(e,t,i,s){return Jt.subVectors(i,t),Mn.subVectors(e,t),Jt.cross(Mn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),Jt.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,c;Ti.subVectors(s,i),Ai.subVectors(r,i),ra.subVectors(e,i);const l=Ti.dot(ra),d=Ai.dot(ra);if(l<=0&&d<=0)return t.copy(i);aa.subVectors(e,s);const u=Ti.dot(aa),f=Ai.dot(aa);if(u>=0&&f<=u)return t.copy(s);const h=l*f-u*d;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ti,o);oa.subVectors(e,r);const m=Ti.dot(oa),x=Ai.dot(oa);if(x>=0&&m<=x)return t.copy(r);const M=m*d-l*x;if(M<=0&&d>=0&&x<=0)return c=d/(d-x),t.copy(i).addScaledVector(Ai,c);const g=u*x-m*f;if(g<=0&&f-u>=0&&m-x>=0)return fl.subVectors(r,s),c=(f-u)/(f-u+(m-x)),t.copy(s).addScaledVector(fl,c);const p=1/(g+M+h);return o=M*p,c=h*p,t.copy(i).addScaledVector(Ti,o).addScaledVector(Ai,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _s{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=r.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Qt):Qt.fromBufferAttribute(r,o),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ps.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ps.copy(i.boundingBox)),Ps.applyMatrix4(e.matrixWorld),this.union(Ps)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ts),Ls.subVectors(this.max,ts),Ci.subVectors(e.a,ts),Ri.subVectors(e.b,ts),Ni.subVectors(e.c,ts),jn.subVectors(Ri,Ci),Gn.subVectors(Ni,Ri),Zn.subVectors(Ci,Ni);let t=[0,-jn.z,jn.y,0,-Gn.z,Gn.y,0,-Zn.z,Zn.y,jn.z,0,-jn.x,Gn.z,0,-Gn.x,Zn.z,0,-Zn.x,-jn.y,jn.x,0,-Gn.y,Gn.x,0,-Zn.y,Zn.x,0];return!ua(t,Ci,Ri,Ni,Ls)||(t=[1,0,0,0,1,0,0,0,1],!ua(t,Ci,Ri,Ni,Ls))?!1:(Is.crossVectors(jn,Gn),t=[Is.x,Is.y,Is.z],ua(t,Ci,Ri,Ni,Ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bn=[new J,new J,new J,new J,new J,new J,new J,new J],Qt=new J,Ps=new _s,Ci=new J,Ri=new J,Ni=new J,jn=new J,Gn=new J,Zn=new J,ts=new J,Ls=new J,Is=new J,Jn=new J;function ua(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Jn.fromArray(n,r);const c=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),l=e.dot(Jn),d=t.dot(Jn),u=i.dot(Jn);if(Math.max(-Math.max(l,d,u),Math.min(l,d,u))>c)return!1}return!0}const wt=new J,Ds=new Ze;let Jm=0;class kt extends _i{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qc,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ds.fromBufferAttribute(this,t),Ds.applyMatrix3(e),this.setXY(t,Ds.x,Ds.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class fu extends kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class pu extends kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ct extends kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Qm=new _s,ns=new J,ha=new J;class Cr{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Qm.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ns.subVectors(e,this.center);const t=ns.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ns,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ns.copy(e.center).add(ha)),this.expandByPoint(ns.copy(e.center).sub(ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let e0=0;const qt=new pt,fa=new Bt,Pi=new J,Wt=new _s,is=new _s,At=new J;class Ft extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dm(e)?pu:fu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ct(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Wt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const c=t[r];is.setFromBufferAttribute(c),this.morphTargetsRelative?(At.addVectors(Wt.min,is.min),Wt.expandByPoint(At),At.addVectors(Wt.max,is.max),Wt.expandByPoint(At)):(Wt.expandByPoint(is.min),Wt.expandByPoint(is.max))}Wt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)At.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(At));if(t)for(let r=0,o=t.length;r<o;r++){const c=t[r],l=this.morphTargetsRelative;for(let d=0,u=c.count;d<u;d++)At.fromBufferAttribute(c,d),l&&(Pi.fromBufferAttribute(e,d),At.add(Pi)),s=Math.max(s,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new kt(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const c=[],l=[];for(let y=0;y<i.count;y++)c[y]=new J,l[y]=new J;const d=new J,u=new J,f=new J,h=new Ze,m=new Ze,x=new Ze,M=new J,g=new J;function p(y,A,I){d.fromBufferAttribute(i,y),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,I),h.fromBufferAttribute(r,y),m.fromBufferAttribute(r,A),x.fromBufferAttribute(r,I),u.sub(d),f.sub(d),m.sub(h),x.sub(h);const C=1/(m.x*x.y-x.x*m.y);isFinite(C)&&(M.copy(u).multiplyScalar(x.y).addScaledVector(f,-m.y).multiplyScalar(C),g.copy(f).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(C),c[y].add(M),c[A].add(M),c[I].add(M),l[y].add(g),l[A].add(g),l[I].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let y=0,A=v.length;y<A;++y){const I=v[y],C=I.start,P=I.count;for(let F=C,O=C+P;F<O;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const w=new J,S=new J,E=new J,b=new J;function N(y){E.fromBufferAttribute(s,y),b.copy(E);const A=c[y];w.copy(A),w.sub(E.multiplyScalar(E.dot(A))).normalize(),S.crossVectors(b,A);const C=S.dot(l[y])<0?-1:1;o.setXYZW(y,w.x,w.y,w.z,C)}for(let y=0,A=v.length;y<A;++y){const I=v[y],C=I.start,P=I.count;for(let F=C,O=C+P;F<O;F+=3)N(e.getX(F+0)),N(e.getX(F+1)),N(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new J,r=new J,o=new J,c=new J,l=new J,d=new J,u=new J,f=new J;if(e)for(let h=0,m=e.count;h<m;h+=3){const x=e.getX(h+0),M=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,g),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,M),d.fromBufferAttribute(i,g),c.add(u),l.add(u),d.add(u),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(g,d.x,d.y,d.z)}else for(let h=0,m=t.count;h<m;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(c,l){const d=c.array,u=c.itemSize,f=c.normalized,h=new d.constructor(l.length*u);let m=0,x=0;for(let M=0,g=l.length;M<g;M++){c.isInterleavedBufferAttribute?m=l[M]*c.data.stride+c.offset:m=l[M]*u;for(let p=0;p<u;p++)h[x++]=d[m++]}return new kt(h,u,f)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,i=this.index.array,s=this.attributes;for(const c in s){const l=s[c],d=e(l,i);t.setAttribute(c,d)}const r=this.morphAttributes;for(const c in r){const l=[],d=r[c];for(let u=0,f=d.length;u<f;u++){const h=d[u],m=e(h,i);l.push(m)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,l=o.length;c<l;c++){const d=o[c];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const d in l)l[d]!==void 0&&(e[d]=l[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const d=i[l];e.data.attributes[l]=d.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const d=this.morphAttributes[l],u=[];for(let f=0,h=d.length;f<h;f++){const m=d[f];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const d in s){const u=s[d];this.setAttribute(d,u.clone(t))}const r=e.morphAttributes;for(const d in r){const u=[],f=r[d];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(t));this.morphAttributes[d]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let d=0,u=o.length;d<u;d++){const f=o[d];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let t0=0;class Yi extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=xs(),this.name="",this.type="Material",this.blending=Oi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=$a,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(i.blending=this.blending),this.side!==qn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wa&&(i.blendSrc=this.blendSrc),this.blendDst!==$a&&(i.blendDst=this.blendDst),this.blendEquation!==ri&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const c in r){const l=r[c];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Sn=new J,pa=new J,Us=new J,Hn=new J,ma=new J,Fs=new J,ga=new J;class mu{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){pa.copy(e).add(t).multiplyScalar(.5),Us.copy(t).sub(e).normalize(),Hn.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Us),c=Hn.dot(this.direction),l=-Hn.dot(Us),d=Hn.lengthSq(),u=Math.abs(1-o*o);let f,h,m,x;if(u>0)if(f=o*l-c,h=o*c-l,x=r*u,f>=0)if(h>=-x)if(h<=x){const M=1/u;f*=M,h*=M,m=f*(f+o*h+2*c)+h*(o*f+h+2*l)+d}else h=r,f=Math.max(0,-(o*h+c)),m=-f*f+h*(h+2*l)+d;else h=-r,f=Math.max(0,-(o*h+c)),m=-f*f+h*(h+2*l)+d;else h<=-x?(f=Math.max(0,-(-o*r+c)),h=f>0?-r:Math.min(Math.max(-r,-l),r),m=-f*f+h*(h+2*l)+d):h<=x?(f=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+d):(f=Math.max(0,-(o*r+c)),h=f>0?r:Math.min(Math.max(-r,-l),r),m=-f*f+h*(h+2*l)+d);else h=o>0?-r:r,f=Math.max(0,-(o*h+c)),m=-f*f+h*(h+2*l)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(pa).addScaledVector(Us,h),m}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const i=Sn.dot(this.direction),s=Sn.dot(Sn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),c=i-o,l=i+o;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,c,l;const d=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return d>=0?(i=(e.min.x-h.x)*d,s=(e.max.x-h.x)*d):(i=(e.max.x-h.x)*d,s=(e.min.x-h.x)*d),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(c=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(c=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||c>s)||((c>i||i!==i)&&(i=c),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,i,s,r){ma.subVectors(t,e),Fs.subVectors(i,e),ga.crossVectors(ma,Fs);let o=this.direction.dot(ga),c;if(o>0){if(s)return null;c=1}else if(o<0)c=-1,o=-o;else return null;Hn.subVectors(this.origin,e);const l=c*this.direction.dot(Fs.crossVectors(Hn,Fs));if(l<0)return null;const d=c*this.direction.dot(ma.cross(Hn));if(d<0||l+d>o)return null;const u=-c*Hn.dot(ga);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xn extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=$d,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pl=new pt,Qn=new mu,Os=new Cr,ml=new J,Bs=new J,ks=new J,zs=new J,xa=new J,js=new J,gl=new J,Gs=new J;class ut extends Bt{constructor(e=new Ft,t=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){js.set(0,0,0);for(let l=0,d=r.length;l<d;l++){const u=c[l],f=r[l];u!==0&&(xa.fromBufferAttribute(f,e),o?js.addScaledVector(xa,u):js.addScaledVector(xa.sub(t),u))}t.add(js)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere),Os.applyMatrix4(r),Qn.copy(e.ray).recast(e.near),!(Os.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Os,ml)===null||Qn.origin.distanceToSquared(ml)>(e.far-e.near)**2))&&(pl.copy(r).invert(),Qn.copy(e.ray).applyMatrix4(pl),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,c=r.index,l=r.attributes.position,d=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(c!==null)if(Array.isArray(o))for(let x=0,M=h.length;x<M;x++){const g=h[x],p=o[g.materialIndex],v=Math.max(g.start,m.start),w=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let S=v,E=w;S<E;S+=3){const b=c.getX(S),N=c.getX(S+1),y=c.getX(S+2);s=Hs(this,p,e,i,d,u,f,b,N,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let g=x,p=M;g<p;g+=3){const v=c.getX(g),w=c.getX(g+1),S=c.getX(g+2);s=Hs(this,o,e,i,d,u,f,v,w,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,M=h.length;x<M;x++){const g=h[x],p=o[g.materialIndex],v=Math.max(g.start,m.start),w=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let S=v,E=w;S<E;S+=3){const b=S,N=S+1,y=S+2;s=Hs(this,p,e,i,d,u,f,b,N,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let g=x,p=M;g<p;g+=3){const v=g,w=g+1,S=g+2;s=Hs(this,o,e,i,d,u,f,v,w,S),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function n0(n,e,t,i,s,r,o,c){let l;if(e.side===Gt?l=i.intersectTriangle(o,r,s,!0,c):l=i.intersectTriangle(s,r,o,e.side===qn,c),l===null)return null;Gs.copy(c),Gs.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(Gs);return d<t.near||d>t.far?null:{distance:d,point:Gs.clone(),object:n}}function Hs(n,e,t,i,s,r,o,c,l,d){n.getVertexPosition(c,Bs),n.getVertexPosition(l,ks),n.getVertexPosition(d,zs);const u=n0(n,e,t,i,Bs,ks,zs,gl);if(u){const f=new J;tn.getBarycoord(gl,Bs,ks,zs,f),s&&(u.uv=tn.getInterpolatedAttribute(s,c,l,d,f,new Ze)),r&&(u.uv1=tn.getInterpolatedAttribute(r,c,l,d,f,new Ze)),o&&(u.normal=tn.getInterpolatedAttribute(o,c,l,d,f,new J),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:l,c:d,normal:new J,materialIndex:0};tn.getNormal(Bs,ks,zs,h.normal),u.face=h,u.barycoord=f}return u}class i0 extends Ut{constructor(e=null,t=1,i=1,s,r,o,c,l,d=Nt,u=Nt,f,h){super(null,o,c,l,d,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _a=new J,s0=new J,r0=new ke;class ni{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=_a.subVectors(i,t).cross(s0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(_a),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||r0.getNormalMatrix(e),s=this.coplanarPoint(_a).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Cr,a0=new Ze(.5,.5),Vs=new J;class sc{constructor(e=new ni,t=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(s),c[4].copy(r),c[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fn,i=!1){const s=this.planes,r=e.elements,o=r[0],c=r[1],l=r[2],d=r[3],u=r[4],f=r[5],h=r[6],m=r[7],x=r[8],M=r[9],g=r[10],p=r[11],v=r[12],w=r[13],S=r[14],E=r[15];if(s[0].setComponents(d-o,m-u,p-x,E-v).normalize(),s[1].setComponents(d+o,m+u,p+x,E+v).normalize(),s[2].setComponents(d+c,m+f,p+M,E+w).normalize(),s[3].setComponents(d-c,m-f,p-M,E-w).normalize(),i)s[4].setComponents(l,h,g,S).normalize(),s[5].setComponents(d-l,m-h,p-g,E-S).normalize();else if(s[4].setComponents(d-l,m-h,p-g,E-S).normalize(),t===fn)s[5].setComponents(d+l,m+h,p+g,E+S).normalize();else if(t===ms)s[5].setComponents(l,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){ei.center.set(0,0,0);const t=a0.distanceTo(e.center);return ei.radius=.7071067811865476+t,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Vs.x=s.normal.x>0?e.max.x:e.min.x,Vs.y=s.normal.y>0?e.max.y:e.min.y,Vs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rr extends Yi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xl=new pt,Uo=new mu,Ws=new Cr,$s=new J;class rc extends Bt{constructor(e=new Ft,t=new Rr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ws.copy(i.boundingSphere),Ws.applyMatrix4(s),Ws.radius+=r,e.ray.intersectsSphere(Ws)===!1)return;xl.copy(s).invert(),Uo.copy(e.ray).applyMatrix4(xl);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=c*c,d=i.index,f=i.attributes.position;if(d!==null){const h=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=h,M=m;x<M;x++){const g=d.getX(x);$s.fromBufferAttribute(f,g),_l($s,g,l,s,e,t,this)}}else{const h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let x=h,M=m;x<M;x++)$s.fromBufferAttribute(f,x),_l($s,x,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function _l(n,e,t,i,s,r,o){const c=Uo.distanceSqToPoint(n);if(c<t){const l=new J;Uo.closestPointToPoint(n,l),l.applyMatrix4(i);const d=s.ray.origin.distanceTo(l);if(d<s.near||d>s.far)return;r.push({distance:d,distanceToRay:Math.sqrt(c),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class gu extends Ut{constructor(e=[],t=mi,i,s,r,o,c,l,d,u){super(e,t,i,s,r,o,c,l,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xu extends Ut{constructor(e,t,i,s,r,o,c,l,d){super(e,t,i,s,r,o,c,l,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wi extends Ut{constructor(e,t,i=xn,s,r,o,c=Nt,l=Nt,d,u=Dn,f=1){if(u!==Dn&&u!==di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,o,c,l,u,i,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ic(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class o0 extends Wi{constructor(e,t=xn,i=mi,s,r,o=Nt,c=Nt,l,d=Dn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,o,c,l,d),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class _u extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xi extends Ft{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const c=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],d=[],u=[],f=[];let h=0,m=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ct(d,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(f,2));function x(M,g,p,v,w,S,E,b,N,y,A){const I=S/N,C=E/y,P=S/2,F=E/2,O=b/2,H=N+1,Y=y+1;let $=0,ne=0;const Q=new J;for(let ie=0;ie<Y;ie++){const pe=ie*C-F;for(let fe=0;fe<H;fe++){const Re=fe*I-P;Q[M]=Re*v,Q[g]=pe*w,Q[p]=O,d.push(Q.x,Q.y,Q.z),Q[M]=0,Q[g]=0,Q[p]=b>0?1:-1,u.push(Q.x,Q.y,Q.z),f.push(fe/N),f.push(1-ie/y),$+=1}}for(let ie=0;ie<y;ie++)for(let pe=0;pe<N;pe++){const fe=h+pe+H*ie,Re=h+pe+H*(ie+1),ge=h+(pe+1)+H*(ie+1),Ae=h+(pe+1)+H*ie;l.push(fe,Re,Ae),l.push(Re,ge,Ae),ne+=6}c.addGroup(m,ne,A),m+=ne,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class zi extends Ft{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:c,thetaLength:l};const d=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],m=[];let x=0;const M=[],g=i/2;let p=0;v(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Ct(f,3)),this.setAttribute("normal",new Ct(h,3)),this.setAttribute("uv",new Ct(m,2));function v(){const S=new J,E=new J;let b=0;const N=(t-e)/i;for(let y=0;y<=r;y++){const A=[],I=y/r,C=I*(t-e)+e;for(let P=0;P<=s;P++){const F=P/s,O=F*l+c,H=Math.sin(O),Y=Math.cos(O);E.x=C*H,E.y=-I*i+g,E.z=C*Y,f.push(E.x,E.y,E.z),S.set(H,N,Y).normalize(),h.push(S.x,S.y,S.z),m.push(F,1-I),A.push(x++)}M.push(A)}for(let y=0;y<s;y++)for(let A=0;A<r;A++){const I=M[A][y],C=M[A+1][y],P=M[A+1][y+1],F=M[A][y+1];(e>0||A!==0)&&(u.push(I,C,F),b+=3),(t>0||A!==r-1)&&(u.push(C,P,F),b+=3)}d.addGroup(p,b,0),p+=b}function w(S){const E=x,b=new Ze,N=new J;let y=0;const A=S===!0?e:t,I=S===!0?1:-1;for(let P=1;P<=s;P++)f.push(0,g*I,0),h.push(0,I,0),m.push(.5,.5),x++;const C=x;for(let P=0;P<=s;P++){const O=P/s*l+c,H=Math.cos(O),Y=Math.sin(O);N.x=A*Y,N.y=g*I,N.z=A*H,f.push(N.x,N.y,N.z),h.push(0,I,0),b.x=H*.5+.5,b.y=Y*.5*I+.5,m.push(b.x,b.y),x++}for(let P=0;P<s;P++){const F=E+P,O=C+P;S===!0?u.push(O,O+1,F):u.push(O+1,O,F),y+=3}d.addGroup(p,y,S===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ac extends zi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,c=Math.PI*2){super(0,e,t,i,s,r,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:c}}static fromJSON(e){return new ac(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ki extends Ft{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,c=Math.floor(i),l=Math.floor(s),d=c+1,u=l+1,f=e/c,h=t/l,m=[],x=[],M=[],g=[];for(let p=0;p<u;p++){const v=p*h-o;for(let w=0;w<d;w++){const S=w*f-r;x.push(S,-v,0),M.push(0,0,1),g.push(w/c),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<c;v++){const w=v+d*p,S=v+d*(p+1),E=v+1+d*(p+1),b=v+1+d*p;m.push(w,S,b),m.push(S,E,b)}this.setIndex(m),this.setAttribute("position",new Ct(x,3)),this.setAttribute("normal",new Ct(M,3)),this.setAttribute("uv",new Ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.widthSegments,e.heightSegments)}}class vr extends Ft{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+c,Math.PI);let d=0;const u=[],f=new J,h=new J,m=[],x=[],M=[],g=[];for(let p=0;p<=i;p++){const v=[],w=p/i,S=o+w*c,E=e*Math.cos(S),b=Math.sqrt(e*e-E*E);let N=0;p===0&&o===0?N=.5/t:p===i&&l===Math.PI&&(N=-.5/t);for(let y=0;y<=t;y++){const A=y/t,I=s+A*r;f.x=-b*Math.cos(I),f.y=E,f.z=b*Math.sin(I),x.push(f.x,f.y,f.z),h.copy(f).normalize(),M.push(h.x,h.y,h.z),g.push(A+N,1-w),v.push(d++)}u.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){const w=u[p][v+1],S=u[p][v],E=u[p+1][v],b=u[p+1][v+1];(p!==0||o>0)&&m.push(w,S,b),(p!==i-1||l<Math.PI)&&m.push(S,E,b)}this.setIndex(m),this.setAttribute("position",new Ct(x,3)),this.setAttribute("normal",new Ct(M,3)),this.setAttribute("uv",new Ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class oc extends Ft{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:c},i=Math.floor(i),s=Math.floor(s);const l=[],d=[],u=[],f=[],h=new J,m=new J,x=new J;for(let M=0;M<=i;M++){const g=o+M/i*c;for(let p=0;p<=s;p++){const v=p/s*r;m.x=(e+t*Math.cos(g))*Math.cos(v),m.y=(e+t*Math.cos(g))*Math.sin(v),m.z=t*Math.sin(g),d.push(m.x,m.y,m.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),x.subVectors(m,h).normalize(),u.push(x.x,x.y,x.z),f.push(p/s),f.push(M/i)}}for(let M=1;M<=i;M++)for(let g=1;g<=s;g++){const p=(s+1)*M+g-1,v=(s+1)*(M-1)+g-1,w=(s+1)*(M-1)+g,S=(s+1)*M+g;l.push(p,v,S),l.push(v,w,S)}this.setIndex(l),this.setAttribute("position",new Ct(d,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(vl(s))s.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(vl(s[0])){const r=[];for(let o=0,c=s.length;o<c;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Ot(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const s in i)e[s]=i[s]}return e}function vl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function c0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function vu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const l0={clone:$i,merge:Ot};var d0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,u0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=d0,this.fragmentShader=u0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=c0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new pt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class h0 extends _n{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ti extends Yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Io,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class f0 extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class p0 extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Mu extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const va=new pt,Ml=new J,yl=new J;class m0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=$t,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sc,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ml),yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yl),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ms||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Xs=new J,qs=new qi,cn=new J;class yu extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xs,qs,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,cn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Xs,qs,cn),cn.x===1&&cn.y===1&&cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new J,bl=new Ze,Sl=new Ze;class jt extends yu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Do*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Do*2*Math.atan(Math.tan(Yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,Sl),t.subVectors(Sl,bl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Yr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,d=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/d,s*=o.width/l,i*=o.height/d}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class g0 extends m0{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}}class hi extends Mu{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new g0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class bu extends yu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,c=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=d*this.view.offsetX,o=r+d*this.view.width,c-=u*this.view.offsetY,l=c-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Su extends Mu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Li=-90,Ii=1;class x0 extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(Li,Ii,e,t);s.layers=this.layers,this.add(s);const r=new jt(Li,Ii,e,t);r.layers=this.layers,this.add(r);const o=new jt(Li,Ii,e,t);o.layers=this.layers,this.add(o);const c=new jt(Li,Ii,e,t);c.layers=this.layers,this.add(c);const l=new jt(Li,Ii,e,t);l.layers=this.layers,this.add(l);const d=new jt(Li,Ii,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,c,l]=t;for(const d of t)this.remove(d);if(e===fn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,c,l,d,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class _0 extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const xc=class xc{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};xc.prototype.isMatrix2=!0;let wl=xc;function El(n,e,t,i){const s=v0(i);switch(t){case ru:return n*e;case ou:return n*e/s.components*s.byteLength;case Jo:return n*e/s.components*s.byteLength;case gi:return n*e*2/s.components*s.byteLength;case Qo:return n*e*2/s.components*s.byteLength;case au:return n*e*3/s.components*s.byteLength;case nn:return n*e*4/s.components*s.byteLength;case ec:return n*e*4/s.components*s.byteLength;case rr:case ar:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case or:case cr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case io:case ro:return Math.max(n,16)*Math.max(e,8)/4;case no:case so:return Math.max(n,8)*Math.max(e,8)/2;case ao:case oo:case lo:case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case co:case pr:case ho:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case po:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case mo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case go:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case _o:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case vo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case yo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case So:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case wo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case To:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ao:case Co:case Ro:return Math.ceil(n/4)*Math.ceil(e/4)*16;case No:case Po:return Math.ceil(n/4)*Math.ceil(e/4)*8;case mr:case Lo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function v0(n){switch(n){case $t:case tu:return{byteLength:1,components:1};case fs:case nu:case In:return{byteLength:2,components:1};case Ko:case Zo:return{byteLength:2,components:4};case xn:case Yo:case hn:return{byteLength:4,components:1};case iu:case su:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function M0(n){const e=new WeakMap;function t(c,l){const d=c.array,u=c.usage,f=d.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,d,u),c.onUploadCallback();let m;if(d instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)m=n.HALF_FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)m=n.SHORT;else if(d instanceof Uint32Array)m=n.UNSIGNED_INT;else if(d instanceof Int32Array)m=n.INT;else if(d instanceof Int8Array)m=n.BYTE;else if(d instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:h,type:m,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function i(c,l,d){const u=l.array,f=l.updateRanges;if(n.bindBuffer(d,c),f.length===0)n.bufferSubData(d,0,u);else{f.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<f.length;m++){const x=f[h],M=f[m];M.start<=x.start+x.count+1?x.count=Math.max(x.count,M.start+M.count-x.start):(++h,f[h]=M)}f.length=h+1;for(let m=0,x=f.length;m<x;m++){const M=f[m];n.bufferSubData(d,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(n.deleteBuffer(l.buffer),e.delete(c))}function o(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const u=e.get(c);(!u||u.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const d=e.get(c);if(d===void 0)e.set(c,t(c,l));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,c,l),d.version=c.version}}return{get:s,remove:r,update:o}}var y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,b0=`#ifdef USE_ALPHAHASH
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
#endif`,S0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,w0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,A0=`#ifdef USE_AOMAP
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
#endif`,C0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,R0=`#ifdef USE_BATCHING
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
#endif`,N0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,P0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,D0=`#ifdef USE_IRIDESCENCE
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
#endif`,U0=`#ifdef USE_BUMPMAP
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
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,j0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,G0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,H0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,V0=`#define PI 3.141592653589793
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
} // validated`,W0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$0=`vec3 transformedNormal = objectNormal;
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
#endif`,X0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,q0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z0="gl_FragColor = linearToOutputTexel( gl_FragColor );",J0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Q0=`#ifdef USE_ENVMAP
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
#endif`,eg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tg=`#ifdef USE_ENVMAP
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
#endif`,ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ig=`#ifdef USE_ENVMAP
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
#endif`,sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cg=`#ifdef USE_GRADIENTMAP
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
}`,lg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,fg=`#ifdef USE_ENVMAP
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
#endif`,pg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_g=`PhysicalMaterial material;
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
#endif`,vg=`uniform sampler2D dfgLUT;
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
}`,Mg=`
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
#endif`,yg=`#if defined( RE_IndirectDiffuse )
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
#endif`,bg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pg=`#if defined( USE_POINTS_UV )
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
#endif`,Lg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ug=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Og=`#ifdef USE_MORPHTARGETS
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
#endif`,Bg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vg=`#ifdef USE_NORMALMAP
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
#endif`,Wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ex=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ix=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ax=`float getShadowMask() {
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
}`,ox=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cx=`#ifdef USE_SKINNING
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
#endif`,lx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dx=`#ifdef USE_SKINNING
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
#endif`,ux=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,px=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mx=`#ifdef USE_TRANSMISSION
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
#endif`,gx=`#ifdef USE_TRANSMISSION
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
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bx=`uniform sampler2D t2D;
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
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ex=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`#include <common>
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
}`,Cx=`#if DEPTH_PACKING == 3200
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
}`,Rx=`#define DISTANCE
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
}`,Nx=`#define DISTANCE
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
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ix=`uniform float scale;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,Ux=`#include <common>
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
}`,Fx=`uniform vec3 diffuse;
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
}`,Ox=`#define LAMBERT
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
}`,Bx=`#define LAMBERT
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
}`,kx=`#define MATCAP
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
}`,zx=`#define MATCAP
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
}`,jx=`#define NORMAL
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
}`,Gx=`#define NORMAL
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
}`,Hx=`#define PHONG
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
}`,Vx=`#define PHONG
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
}`,Wx=`#define STANDARD
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
}`,$x=`#define STANDARD
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
}`,Xx=`#define TOON
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
}`,qx=`#define TOON
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
}`,Yx=`uniform float size;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,Zx=`#include <common>
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
}`,Jx=`uniform vec3 color;
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
}`,Qx=`uniform float rotation;
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
}`,e_=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:y0,alphahash_pars_fragment:b0,alphamap_fragment:S0,alphamap_pars_fragment:w0,alphatest_fragment:E0,alphatest_pars_fragment:T0,aomap_fragment:A0,aomap_pars_fragment:C0,batching_pars_vertex:R0,batching_vertex:N0,begin_vertex:P0,beginnormal_vertex:L0,bsdfs:I0,iridescence_fragment:D0,bumpmap_pars_fragment:U0,clipping_planes_fragment:F0,clipping_planes_pars_fragment:O0,clipping_planes_pars_vertex:B0,clipping_planes_vertex:k0,color_fragment:z0,color_pars_fragment:j0,color_pars_vertex:G0,color_vertex:H0,common:V0,cube_uv_reflection_fragment:W0,defaultnormal_vertex:$0,displacementmap_pars_vertex:X0,displacementmap_vertex:q0,emissivemap_fragment:Y0,emissivemap_pars_fragment:K0,colorspace_fragment:Z0,colorspace_pars_fragment:J0,envmap_fragment:Q0,envmap_common_pars_fragment:eg,envmap_pars_fragment:tg,envmap_pars_vertex:ng,envmap_physical_pars_fragment:fg,envmap_vertex:ig,fog_vertex:sg,fog_pars_vertex:rg,fog_fragment:ag,fog_pars_fragment:og,gradientmap_pars_fragment:cg,lightmap_pars_fragment:lg,lights_lambert_fragment:dg,lights_lambert_pars_fragment:ug,lights_pars_begin:hg,lights_toon_fragment:pg,lights_toon_pars_fragment:mg,lights_phong_fragment:gg,lights_phong_pars_fragment:xg,lights_physical_fragment:_g,lights_physical_pars_fragment:vg,lights_fragment_begin:Mg,lights_fragment_maps:yg,lights_fragment_end:bg,lightprobes_pars_fragment:Sg,logdepthbuf_fragment:wg,logdepthbuf_pars_fragment:Eg,logdepthbuf_pars_vertex:Tg,logdepthbuf_vertex:Ag,map_fragment:Cg,map_pars_fragment:Rg,map_particle_fragment:Ng,map_particle_pars_fragment:Pg,metalnessmap_fragment:Lg,metalnessmap_pars_fragment:Ig,morphinstance_vertex:Dg,morphcolor_vertex:Ug,morphnormal_vertex:Fg,morphtarget_pars_vertex:Og,morphtarget_vertex:Bg,normal_fragment_begin:kg,normal_fragment_maps:zg,normal_pars_fragment:jg,normal_pars_vertex:Gg,normal_vertex:Hg,normalmap_pars_fragment:Vg,clearcoat_normal_fragment_begin:Wg,clearcoat_normal_fragment_maps:$g,clearcoat_pars_fragment:Xg,iridescence_pars_fragment:qg,opaque_fragment:Yg,packing:Kg,premultiplied_alpha_fragment:Zg,project_vertex:Jg,dithering_fragment:Qg,dithering_pars_fragment:ex,roughnessmap_fragment:tx,roughnessmap_pars_fragment:nx,shadowmap_pars_fragment:ix,shadowmap_pars_vertex:sx,shadowmap_vertex:rx,shadowmask_pars_fragment:ax,skinbase_vertex:ox,skinning_pars_vertex:cx,skinning_vertex:lx,skinnormal_vertex:dx,specularmap_fragment:ux,specularmap_pars_fragment:hx,tonemapping_fragment:fx,tonemapping_pars_fragment:px,transmission_fragment:mx,transmission_pars_fragment:gx,uv_pars_fragment:xx,uv_pars_vertex:_x,uv_vertex:vx,worldpos_vertex:Mx,background_vert:yx,background_frag:bx,backgroundCube_vert:Sx,backgroundCube_frag:wx,cube_vert:Ex,cube_frag:Tx,depth_vert:Ax,depth_frag:Cx,distance_vert:Rx,distance_frag:Nx,equirect_vert:Px,equirect_frag:Lx,linedashed_vert:Ix,linedashed_frag:Dx,meshbasic_vert:Ux,meshbasic_frag:Fx,meshlambert_vert:Ox,meshlambert_frag:Bx,meshmatcap_vert:kx,meshmatcap_frag:zx,meshnormal_vert:jx,meshnormal_frag:Gx,meshphong_vert:Hx,meshphong_frag:Vx,meshphysical_vert:Wx,meshphysical_frag:$x,meshtoon_vert:Xx,meshtoon_frag:qx,points_vert:Yx,points_frag:Kx,shadow_vert:Zx,shadow_frag:Jx,sprite_vert:Qx,sprite_frag:e_},ye={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},un={basic:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Ot([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Ot([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Ot([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Xe(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Ot([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Ot([ye.points,ye.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Ot([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Ot([ye.common,ye.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Ot([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Ot([ye.sprite,ye.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:Ot([ye.common,ye.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:Ot([ye.lights,ye.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};un.physical={uniforms:Ot([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Ys={r:0,b:0,g:0},t_=new pt,Eu=new ke;Eu.set(-1,0,0,0,1,0,0,0,1);function n_(n,e,t,i,s,r){const o=new Xe(0);let c=s===!0?0:1,l,d,u=null,f=0,h=null;function m(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const S=v.backgroundBlurriness>0;w=e.get(w,S)}return w}function x(v){let w=!1;const S=m(v);S===null?g(o,c):S&&S.isColor&&(g(S,1),w=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,w){const S=m(w);S&&(S.isCubeTexture||S.mapping===Tr)?(d===void 0&&(d=new ut(new xi(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:$i(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(E,b,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),d.material.uniforms.envMap.value=S,d.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(t_.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Eu),d.material.toneMapped=Ye.getTransfer(S.colorSpace)!==it,(u!==S||f!==S.version||h!==n.toneMapping)&&(d.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ut(new Ki(2,2),new _n({name:"BackgroundMaterial",uniforms:$i(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(S.colorSpace)!==it,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,w){v.getRGB(Ys,vu(n)),t.buffers.color.setClear(Ys.r,Ys.g,Ys.b,w,r)}function p(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,w=1){o.set(v),c=w,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,g(o,c)},render:x,addToRenderList:M,dispose:p}}function i_(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function c(C,P,F,O,H){let Y=!1;const $=f(C,O,F,P);r!==$&&(r=$,d(r.object)),Y=m(C,O,F,H),Y&&x(C,O,F,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,S(C,P,F,O),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function d(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,P,F,O){const H=O.wireframe===!0;let Y=i[P.id];Y===void 0&&(Y={},i[P.id]=Y);const $=C.isInstancedMesh===!0?C.id:0;let ne=Y[$];ne===void 0&&(ne={},Y[$]=ne);let Q=ne[F.id];Q===void 0&&(Q={},ne[F.id]=Q);let ie=Q[H];return ie===void 0&&(ie=h(l()),Q[H]=ie),ie}function h(C){const P=[],F=[],O=[];for(let H=0;H<t;H++)P[H]=0,F[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:O,object:C,attributes:{},index:null}}function m(C,P,F,O){const H=r.attributes,Y=P.attributes;let $=0;const ne=F.getAttributes();for(const Q in ne)if(ne[Q].location>=0){const pe=H[Q];let fe=Y[Q];if(fe===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(fe=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(fe=C.instanceColor)),pe===void 0||pe.attribute!==fe||fe&&pe.data!==fe.data)return!0;$++}return r.attributesNum!==$||r.index!==O}function x(C,P,F,O){const H={},Y=P.attributes;let $=0;const ne=F.getAttributes();for(const Q in ne)if(ne[Q].location>=0){let pe=Y[Q];pe===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(pe=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(pe=C.instanceColor));const fe={};fe.attribute=pe,pe&&pe.data&&(fe.data=pe.data),H[Q]=fe,$++}r.attributes=H,r.attributesNum=$,r.index=O}function M(){const C=r.newAttributes;for(let P=0,F=C.length;P<F;P++)C[P]=0}function g(C){p(C,0)}function p(C,P){const F=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;F[C]=1,O[C]===0&&(n.enableVertexAttribArray(C),O[C]=1),H[C]!==P&&(n.vertexAttribDivisor(C,P),H[C]=P)}function v(){const C=r.newAttributes,P=r.enabledAttributes;for(let F=0,O=P.length;F<O;F++)P[F]!==C[F]&&(n.disableVertexAttribArray(F),P[F]=0)}function w(C,P,F,O,H,Y,$){$===!0?n.vertexAttribIPointer(C,P,F,H,Y):n.vertexAttribPointer(C,P,F,O,H,Y)}function S(C,P,F,O){M();const H=O.attributes,Y=F.getAttributes(),$=P.defaultAttributeValues;for(const ne in Y){const Q=Y[ne];if(Q.location>=0){let ie=H[ne];if(ie===void 0&&(ne==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),ne==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){const pe=ie.normalized,fe=ie.itemSize,Re=e.get(ie);if(Re===void 0)continue;const ge=Re.buffer,Ae=Re.type,ae=Re.bytesPerElement,j=Ae===n.INT||Ae===n.UNSIGNED_INT||ie.gpuType===Yo;if(ie.isInterleavedBufferAttribute){const Z=ie.data,Me=Z.stride,Ie=ie.offset;if(Z.isInstancedInterleavedBuffer){for(let Ne=0;Ne<Q.locationSize;Ne++)p(Q.location+Ne,Z.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ne=0;Ne<Q.locationSize;Ne++)g(Q.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Ne=0;Ne<Q.locationSize;Ne++)w(Q.location+Ne,fe/Q.locationSize,Ae,pe,Me*ae,(Ie+fe/Q.locationSize*Ne)*ae,j)}else{if(ie.isInstancedBufferAttribute){for(let Z=0;Z<Q.locationSize;Z++)p(Q.location+Z,ie.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Z=0;Z<Q.locationSize;Z++)g(Q.location+Z);n.bindBuffer(n.ARRAY_BUFFER,ge);for(let Z=0;Z<Q.locationSize;Z++)w(Q.location+Z,fe/Q.locationSize,Ae,pe,fe*ae,fe/Q.locationSize*Z*ae,j)}}else if($!==void 0){const pe=$[ne];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(Q.location,pe);break;case 3:n.vertexAttrib3fv(Q.location,pe);break;case 4:n.vertexAttrib4fv(Q.location,pe);break;default:n.vertexAttrib1fv(Q.location,pe)}}}}v()}function E(){A();for(const C in i){const P=i[C];for(const F in P){const O=P[F];for(const H in O){const Y=O[H];for(const $ in Y)u(Y[$].object),delete Y[$];delete O[H]}}delete i[C]}}function b(C){if(i[C.id]===void 0)return;const P=i[C.id];for(const F in P){const O=P[F];for(const H in O){const Y=O[H];for(const $ in Y)u(Y[$].object),delete Y[$];delete O[H]}}delete i[C.id]}function N(C){for(const P in i){const F=i[P];for(const O in F){const H=F[O];if(H[C.id]===void 0)continue;const Y=H[C.id];for(const $ in Y)u(Y[$].object),delete Y[$];delete H[C.id]}}}function y(C){for(const P in i){const F=i[P],O=C.isInstancedMesh===!0?C.id:0,H=F[O];if(H!==void 0){for(const Y in H){const $=H[Y];for(const ne in $)u($[ne].object),delete $[ne];delete H[Y]}delete F[O],Object.keys(F).length===0&&delete i[P]}}}function A(){I(),o=!0,r!==s&&(r=s,d(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:A,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:N,initAttributes:M,enableAttribute:g,disableUnusedAttributes:v}}function s_(n,e,t){let i;function s(l){i=l}function r(l,d){n.drawArrays(i,l,d),t.update(d,i,1)}function o(l,d,u){u!==0&&(n.drawArraysInstanced(i,l,d,u),t.update(d,i,u))}function c(l,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,u);let h=0;for(let m=0;m<u;m++)h+=d[m];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=c}function r_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(N){return!(N!==nn&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(N){const y=N===In&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==$t&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==hn&&!y)}function l(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const u=l(d);u!==d&&(Be("WebGLRenderer:",d,"not supported, using",u,"instead."),d=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:d,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:M,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:S,maxSamples:E,samples:b}}function a_(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new ni,c=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||s;return s=h,i=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,m){const x=f.clippingPlanes,M=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||x===null||x.length===0||r&&!g)r?u(null):d();else{const v=r?0:i,w=v*4;let S=p.clippingState||null;l.value=S,S=u(x,h,w,m);for(let E=0;E!==w;++E)S[E]=t[E];p.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function d(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,m,x){const M=f!==null?f.length:0;let g=null;if(M!==0){if(g=l.value,x!==!0||g===null){const p=m+M*4,v=h.matrixWorldInverse;c.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,S=m;w!==M;++w,S+=4)o.copy(f[w]).applyMatrix4(v,c),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,g}}const $n=4,Tl=[.125,.215,.35,.446,.526,.582],ai=20,o_=256,ss=new bu,Al=new Xe;let Ma=null,ya=0,ba=0,Sa=!1;const c_=new J;class Cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:c=c_}=r;Ma=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ma,ya,ba),this._renderer.xr.enabled=Sa,e.scissorTest=!1,Di(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ma=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:In,format:nn,colorSpace:gr,depthBuffer:!1},s=Rl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=l_(r)),this._blurMaterial=u_(r,e,t),this._ggxMaterial=d_(r,e,t)}return s}_compileMaterial(e){const t=new ut(new Ft,e);this._renderer.compile(t,ss)}_sceneToCubeUV(e,t,i,s,r){const l=new jt(90,1,t,i),d=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(Al),f.toneMapping=pn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ut(new xi,new Xn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,g=M.material;let p=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy(Al),p=!0);for(let w=0;w<6;w++){const S=w%3;S===0?(l.up.set(0,d[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[w],r.y,r.z)):S===1?(l.up.set(0,0,d[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[w],r.z)):(l.up.set(0,d[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[w]));const E=this._cubeSize;Di(s,S*E,w>2?E:0,E,E),f.setRenderTarget(s),p&&f.render(M,l),f.render(e,l)}f.toneMapping=m,f.autoClear=h,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===mi||e.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const c=r.uniforms;c.envMap.value=e;const l=this._cubeSize;Di(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ss)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms,d=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(d*d-u*u),h=0+d*1.25,m=f*h,{_lodMax:x}=this,M=this._sizeLods[i],g=3*M*(i>x-$n?i-x+$n:0),p=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=x-t,Di(r,g,p,3*M,2*M),s.setRenderTarget(r),s.render(c,ss),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,Di(e,g,p,3*M,2*M),s.setRenderTarget(e),s.render(c,ss)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,c){const l=this._renderer,d=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=d;const h=d.uniforms,m=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ai-1),M=r/x,g=isFinite(r)?1+Math.floor(u*M):ai;g>ai&&Be(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ai}`);const p=[];let v=0;for(let N=0;N<ai;++N){const y=N/M,A=Math.exp(-y*y/2);p.push(A),N===0?v+=A:N<g&&(v+=2*A)}for(let N=0;N<p.length;N++)p[N]=p[N]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=o==="latitudinal",c&&(h.poleAxis.value=c);const{_lodMax:w}=this;h.dTheta.value=x,h.mipInt.value=w-i;const S=this._sizeLods[s],E=3*S*(s>w-$n?s-w+$n:0),b=4*(this._cubeSize-S);Di(t,E,b,3*S,2*S),l.setRenderTarget(t),l.render(f,ss)}}function l_(n){const e=[],t=[],i=[];let s=n;const r=n-$n+1+Tl.length;for(let o=0;o<r;o++){const c=Math.pow(2,s);e.push(c);let l=1/c;o>n-$n?l=Tl[o-n+$n-1]:o===0&&(l=0),t.push(l);const d=1/(c-2),u=-d,f=1+d,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,x=6,M=3,g=2,p=1,v=new Float32Array(M*x*m),w=new Float32Array(g*x*m),S=new Float32Array(p*x*m);for(let b=0;b<m;b++){const N=b%3*2/3-1,y=b>2?0:-1,A=[N,y,0,N+2/3,y,0,N+2/3,y+1,0,N,y,0,N+2/3,y+1,0,N,y+1,0];v.set(A,M*x*b),w.set(h,g*x*b);const I=[b,b,b,b,b,b];S.set(I,p*x*b)}const E=new Ft;E.setAttribute("position",new kt(v,M)),E.setAttribute("uv",new kt(w,g)),E.setAttribute("faceIndex",new kt(S,p)),i.push(new ut(E,null)),s>$n&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Rl(n,e,t){const i=new mn(n,e,t);return i.texture.mapping=Tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Di(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function d_(n,e,t){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:o_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nr(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function u_(n,e,t){const i=new Float32Array(ai),s=new J(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nr(),fragmentShader:`

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
	`}class Tu extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new gu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xi(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Nn});r.uniforms.tEquirect.value=t;const o=new ut(s,r),c=t.minFilter;return t.minFilter===li&&(t.minFilter=Dt),new x0(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function h_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?o(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===$r||m===Xr)if(e.has(h)){const x=e.get(h).texture;return c(x,h.mapping)}else{const x=h.image;if(x&&x.height>0){const M=new Tu(x.height);return M.fromEquirectangularTexture(n,h),e.set(h,M),h.addEventListener("dispose",d),c(M.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const m=h.mapping,x=m===$r||m===Xr,M=m===mi||m===Vi;if(x||M){let g=t.get(h);const p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Cl(n)),g=x?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const v=h.image;return x&&v&&v.height>0||M&&v&&l(v)?(i===null&&(i=new Cl(n)),g=x?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function c(h,m){return m===$r?h.mapping=mi:m===Xr&&(h.mapping=Vi),h}function l(h){let m=0;const x=6;for(let M=0;M<x;M++)h[M]!==void 0&&m++;return m===x}function d(h){const m=h.target;m.removeEventListener("dispose",d);const x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function f_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Bi("WebGLRenderer: "+i+" extension not supported."),s}}}function p_(n,e,t,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",o),delete s[h.id];const m=r.get(h);m&&(e.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER)}function d(f){const h=[],m=f.index,x=f.attributes.position;let M=0;if(x===void 0)return;if(m!==null){const v=m.array;M=m.version;for(let w=0,S=v.length;w<S;w+=3){const E=v[w+0],b=v[w+1],N=v[w+2];h.push(E,b,b,N,N,E)}}else{const v=x.array;M=x.version;for(let w=0,S=v.length/3-1;w<S;w+=3){const E=w+0,b=w+1,N=w+2;h.push(E,b,b,N,N,E)}}const g=new(x.count>=65535?pu:fu)(h,1);g.version=M;const p=r.get(f);p&&e.remove(p),r.set(f,g)}function u(f){const h=r.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&d(f)}else d(f);return r.get(f)}return{get:c,update:l,getWireframeAttribute:u}}function m_(n,e,t){let i;function s(f){i=f}let r,o;function c(f){r=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*o),t.update(h,i,1)}function d(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,r,f*o,m),t.update(h,i,m))}function u(f,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,m);let M=0;for(let g=0;g<m;g++)M+=h[g];t.update(M,i,1)}this.setMode=s,this.setIndex=c,this.render=l,this.renderInstances=d,this.renderMultiDraw=u}function g_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,c){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=c*(r/3);break;case n.LINES:t.lines+=c*(r/2);break;case n.LINE_STRIP:t.lines+=c*(r-1);break;case n.LINE_LOOP:t.lines+=c*r;break;case n.POINTS:t.points+=c*r;break;default:et("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function x_(n,e,t){const i=new WeakMap,s=new ft;function r(o,c,l){const d=o.morphTargetInfluences,u=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(c);if(h===void 0||h.count!==f){let A=function(){N.dispose(),i.delete(c),c.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,M=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],v=c.morphAttributes.color||[];let w=0;m===!0&&(w=1),x===!0&&(w=2),M===!0&&(w=3);let S=c.attributes.position.count*w,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const b=new Float32Array(S*E*4*f),N=new lu(b,S,E,f);N.type=hn,N.needsUpdate=!0;const y=w*4;for(let I=0;I<f;I++){const C=g[I],P=p[I],F=v[I],O=S*E*4*I;for(let H=0;H<C.count;H++){const Y=H*y;m===!0&&(s.fromBufferAttribute(C,H),b[O+Y+0]=s.x,b[O+Y+1]=s.y,b[O+Y+2]=s.z,b[O+Y+3]=0),x===!0&&(s.fromBufferAttribute(P,H),b[O+Y+4]=s.x,b[O+Y+5]=s.y,b[O+Y+6]=s.z,b[O+Y+7]=0),M===!0&&(s.fromBufferAttribute(F,H),b[O+Y+8]=s.x,b[O+Y+9]=s.y,b[O+Y+10]=s.z,b[O+Y+11]=F.itemSize===4?s.w:1)}}h={count:f,texture:N,size:new Ze(S,E)},i.set(c,h),c.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let M=0;M<d.length;M++)m+=d[M];const x=c.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",d)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function __(n,e,t,i,s){let r=new WeakMap;function o(d){const u=s.render.frame,f=d.geometry,h=e.get(d,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),d.isInstancedMesh&&(d.hasEventListener("dispose",l)===!1&&d.addEventListener("dispose",l),r.get(d)!==u&&(t.update(d.instanceMatrix,n.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,n.ARRAY_BUFFER),r.set(d,u))),d.isSkinnedMesh){const m=d.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function c(){r=new WeakMap}function l(d){const u=d.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:c}}const v_={[Xd]:"LINEAR_TONE_MAPPING",[qd]:"REINHARD_TONE_MAPPING",[Yd]:"CINEON_TONE_MAPPING",[Kd]:"ACES_FILMIC_TONE_MAPPING",[Jd]:"AGX_TONE_MAPPING",[Qd]:"NEUTRAL_TONE_MAPPING",[Zd]:"CUSTOM_TONE_MAPPING"};function M_(n,e,t,i,s,r){const o=new mn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Wi(e,t):void 0}),c=new mn(e,t,{type:In,depthBuffer:!1,stencilBuffer:!1}),l=new Ft;l.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ct([0,2,0,0,2,0],2));const d=new h0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ut(l,d),f=new bu(-1,1,1,-1,0,1);let h=null,m=null,x=!1,M,g=null,p=[],v=!1;this.setSize=function(w,S){o.setSize(w,S),c.setSize(w,S);for(let E=0;E<p.length;E++){const b=p[E];b.setSize&&b.setSize(w,S)}},this.setEffects=function(w){p=w,v=p.length>0&&p[0].isRenderPass===!0;const S=o.width,E=o.height;for(let b=0;b<p.length;b++){const N=p[b];N.setSize&&N.setSize(S,E)}},this.begin=function(w,S){if(x||w.toneMapping===pn&&p.length===0)return!1;if(g=S,S!==null){const E=S.width,b=S.height;(o.width!==E||o.height!==b)&&this.setSize(E,b)}return v===!1&&w.setRenderTarget(o),M=w.toneMapping,w.toneMapping=pn,!0},this.hasRenderPass=function(){return v},this.end=function(w,S){w.toneMapping=M,x=!0;let E=o,b=c;for(let N=0;N<p.length;N++){const y=p[N];if(y.enabled!==!1&&(y.render(w,b,E,S),y.needsSwap!==!1)){const A=E;E=b,b=A}}if(h!==w.outputColorSpace||m!==w.toneMapping){h=w.outputColorSpace,m=w.toneMapping,d.defines={},Ye.getTransfer(h)===it&&(d.defines.SRGB_TRANSFER="");const N=v_[m];N&&(d.defines[N]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=E.texture,w.setRenderTarget(g),w.render(u,f),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),c.dispose(),l.dispose(),d.dispose()}}const Au=new Ut,Fo=new Wi(1,1),Cu=new lu,Ru=new Vm,Nu=new gu,Ll=[],Il=[],Dl=new Float32Array(16),Ul=new Float32Array(9),Fl=new Float32Array(4);function Zi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ll[s];if(r===void 0&&(r=new Float32Array(s),Ll[s]=r),e!==0){i.toArray(r,0);for(let o=1,c=0;o!==e;++o)c+=t,n[o].toArray(r,c)}return r}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Pr(n,e){let t=Il[e];t===void 0&&(t=new Int32Array(e),Il[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function y_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function b_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function S_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function w_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function E_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Fl.set(i),n.uniformMatrix2fv(this.addr,!1,Fl),Tt(t,i)}}function T_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Ul.set(i),n.uniformMatrix3fv(this.addr,!1,Ul),Tt(t,i)}}function A_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Dl.set(i),n.uniformMatrix4fv(this.addr,!1,Dl),Tt(t,i)}}function C_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function R_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function N_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function P_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function L_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function I_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function D_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function U_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function F_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Fo.compareFunction=t.isReversedDepthBuffer()?nc:tc,r=Fo):r=Au,t.setTexture2D(e||r,s)}function O_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ru,s)}function B_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Nu,s)}function k_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Cu,s)}function z_(n){switch(n){case 5126:return y_;case 35664:return b_;case 35665:return S_;case 35666:return w_;case 35674:return E_;case 35675:return T_;case 35676:return A_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return N_;case 35669:case 35673:return P_;case 5125:return L_;case 36294:return I_;case 36295:return D_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return F_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return k_}}function j_(n,e){n.uniform1fv(this.addr,e)}function G_(n,e){const t=Zi(e,this.size,2);n.uniform2fv(this.addr,t)}function H_(n,e){const t=Zi(e,this.size,3);n.uniform3fv(this.addr,t)}function V_(n,e){const t=Zi(e,this.size,4);n.uniform4fv(this.addr,t)}function W_(n,e){const t=Zi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $_(n,e){const t=Zi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function X_(n,e){const t=Zi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function q_(n,e){n.uniform1iv(this.addr,e)}function Y_(n,e){n.uniform2iv(this.addr,e)}function K_(n,e){n.uniform3iv(this.addr,e)}function Z_(n,e){n.uniform4iv(this.addr,e)}function J_(n,e){n.uniform1uiv(this.addr,e)}function Q_(n,e){n.uniform2uiv(this.addr,e)}function ev(n,e){n.uniform3uiv(this.addr,e)}function tv(n,e){n.uniform4uiv(this.addr,e)}function nv(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Fo:o=Au;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||o,r[c])}function iv(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ru,r[o])}function sv(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Nu,r[o])}function rv(n,e,t){const i=this.cache,s=e.length,r=Pr(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Cu,r[o])}function av(n){switch(n){case 5126:return j_;case 35664:return G_;case 35665:return H_;case 35666:return V_;case 35674:return W_;case 35675:return $_;case 35676:return X_;case 5124:case 35670:return q_;case 35667:case 35671:return Y_;case 35668:case 35672:return K_;case 35669:case 35673:return Z_;case 5125:return J_;case 36294:return Q_;case 36295:return ev;case 36296:return tv;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}class ov{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=z_(t.type)}}class cv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=av(t.type)}}class lv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const c=s[r];c.setValue(e,t[c.id],i)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function Ol(n,e){n.seq.push(e),n.map[e.id]=e}function dv(n,e,t){const i=n.name,s=i.length;for(wa.lastIndex=0;;){const r=wa.exec(i),o=wa.lastIndex;let c=r[1];const l=r[2]==="]",d=r[3];if(l&&(c=c|0),d===void 0||d==="["&&o+2===s){Ol(t,d===void 0?new ov(c,n,e):new cv(c,n,e));break}else{let f=t.map[c];f===void 0&&(f=new lv(c),Ol(t,f)),t=f}}}class lr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const c=e.getActiveUniform(t,o),l=e.getUniformLocation(t,c.name);dv(c,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const c=t[r],l=i[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Bl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const uv=37297;let hv=0;function fv(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const c=o+1;i.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return i.join(`
`)}const kl=new ke;function pv(n){Ye._getMatrix(kl,Ye.workingColorSpace,n);const e=`mat3( ${kl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case xr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function zl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+fv(n.getShaderSource(e),c)}else return r}function mv(n,e){const t=pv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const gv={[Xd]:"Linear",[qd]:"Reinhard",[Yd]:"Cineon",[Kd]:"ACESFilmic",[Jd]:"AgX",[Qd]:"Neutral",[Zd]:"Custom"};function xv(n,e){const t=gv[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ks=new J;function _v(){Ye.getLuminanceCoefficients(Ks);const n=Ks.x.toFixed(4),e=Ks.y.toFixed(4),t=Ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function Mv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function yv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let c=1;r.type===n.FLOAT_MAT2&&(c=2),r.type===n.FLOAT_MAT3&&(c=3),r.type===n.FLOAT_MAT4&&(c=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:c}}return t}function ds(n){return n!==""}function jl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(n){return n.replace(bv,wv)}const Sv=new Map;function wv(n,e){let t=He[e];if(t===void 0){const i=Sv.get(e);if(i!==void 0)t=He[i],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Oo(t)}const Ev=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(n){return n.replace(Ev,Tv)}function Tv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Av={[sr]:"SHADOWMAP_TYPE_PCF",[ls]:"SHADOWMAP_TYPE_VSM"};function Cv(n){return Av[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Rv={[mi]:"ENVMAP_TYPE_CUBE",[Vi]:"ENVMAP_TYPE_CUBE",[Tr]:"ENVMAP_TYPE_CUBE_UV"};function Nv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Rv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Pv={[Vi]:"ENVMAP_MODE_REFRACTION"};function Lv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Pv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Iv={[$d]:"ENVMAP_BLENDING_MULTIPLY",[Sm]:"ENVMAP_BLENDING_MIX",[wm]:"ENVMAP_BLENDING_ADD"};function Dv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Iv[n.combine]||"ENVMAP_BLENDING_NONE"}function Uv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Fv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,c=t.fragmentShader;const l=Cv(t),d=Nv(t),u=Lv(t),f=Dv(t),h=Uv(t),m=vv(t),x=Mv(r),M=s.createProgram();let g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ds).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ds).join(`
`),p.length>0&&(p+=`
`)):(g=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),p=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pn?"#define TONE_MAPPING":"",t.toneMapping!==pn?He.tonemapping_pars_fragment:"",t.toneMapping!==pn?xv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,mv("linearToOutputTexel",t.outputColorSpace),_v(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ds).join(`
`)),o=Oo(o),o=jl(o,t),o=Gl(o,t),c=Oo(c),c=jl(c,t),c=Gl(c,t),o=Hl(o),c=Hl(c),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===el?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===el?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=v+g+o,S=v+p+c,E=Bl(s,s.VERTEX_SHADER,w),b=Bl(s,s.FRAGMENT_SHADER,S);s.attachShader(M,E),s.attachShader(M,b),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function N(C){if(n.debug.checkShaderErrors){const P=s.getProgramInfoLog(M)||"",F=s.getShaderInfoLog(E)||"",O=s.getShaderInfoLog(b)||"",H=P.trim(),Y=F.trim(),$=O.trim();let ne=!0,Q=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,b);else{const ie=zl(s,E,"vertex"),pe=zl(s,b,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+ie+`
`+pe)}else H!==""?Be("WebGLProgram: Program Info Log:",H):(Y===""||$==="")&&(Q=!1);Q&&(C.diagnostics={runnable:ne,programLog:H,vertexShader:{log:Y,prefix:g},fragmentShader:{log:$,prefix:p}})}s.deleteShader(E),s.deleteShader(b),y=new lr(s,M),A=yv(s,M)}let y;this.getUniforms=function(){return y===void 0&&N(this),y};let A;this.getAttributes=function(){return A===void 0&&N(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(M,uv)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hv++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=b,this}let Ov=0;class Bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new kv(e),t.set(e,i)),i}}class kv{constructor(e){this.id=Ov++,this.code=e,this.usedTimes=0}}function zv(n){return n===gi||n===pr||n===mr}function jv(n,e,t,i,s,r){const o=new du,c=new Bv,l=new Set,d=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function M(y,A,I,C,P,F){const O=C.fog,H=P.geometry,Y=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?C.environment:null,$=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ne=e.get(y.envMap||Y,$),Q=ne&&ne.mapping===Tr?ne.image.height:null,ie=m[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&Be("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const pe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,fe=pe!==void 0?pe.length:0;let Re=0;H.morphAttributes.position!==void 0&&(Re=1),H.morphAttributes.normal!==void 0&&(Re=2),H.morphAttributes.color!==void 0&&(Re=3);let ge,Ae,ae,j;if(ie){const Pe=un[ie];ge=Pe.vertexShader,Ae=Pe.fragmentShader}else{ge=y.vertexShader,Ae=y.fragmentShader;const Pe=c.getVertexShaderStage(y),gt=c.getFragmentShaderStage(y);c.update(y,Pe,gt),ae=Pe.id,j=gt.id}const Z=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Ie=P.isInstancedMesh===!0,Ne=P.isBatchedMesh===!0,qe=!!y.map,Ge=!!y.matcap,Je=!!ne,$e=!!y.aoMap,Ve=!!y.lightMap,dt=!!y.bumpMap&&y.wireframe===!1,ht=!!y.normalMap,mt=!!y.displacementMap,Mt=!!y.emissiveMap,ot=!!y.metalnessMap,q=!!y.roughnessMap,L=y.anisotropy>0,oe=y.clearcoat>0,ce=y.dispersion>0,T=y.iridescence>0,_=y.sheen>0,D=y.transmission>0,U=L&&!!y.anisotropyMap,k=oe&&!!y.clearcoatMap,K=oe&&!!y.clearcoatNormalMap,G=oe&&!!y.clearcoatRoughnessMap,B=T&&!!y.iridescenceMap,V=T&&!!y.iridescenceThicknessMap,re=_&&!!y.sheenColorMap,he=_&&!!y.sheenRoughnessMap,de=!!y.specularMap,le=!!y.specularColorMap,ve=!!y.specularIntensityMap,Se=D&&!!y.transmissionMap,Ue=D&&!!y.thicknessMap,W=!!y.gradientMap,_e=!!y.alphaMap,ue=y.alphaTest>0,xe=!!y.alphaHash,Ee=!!y.extensions;let me=pn;y.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(me=n.toneMapping);const De={shaderID:ie,shaderType:y.type,shaderName:y.name,vertexShader:ge,fragmentShader:Ae,defines:y.defines,customVertexShaderID:ae,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Ne,batchingColor:Ne&&P._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&P.instanceColor!==null,instancingMorph:Ie&&P.morphTexture!==null,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:qe,matcap:Ge,envMap:Je,envMapMode:Je&&ne.mapping,envMapCubeUVHeight:Q,aoMap:$e,lightMap:Ve,bumpMap:dt,normalMap:ht,displacementMap:mt,emissiveMap:Mt,normalMapObjectSpace:ht&&y.normalMapType===Am,normalMapTangentSpace:ht&&y.normalMapType===Io,packedNormalMap:ht&&y.normalMapType===Io&&zv(y.normalMap.format),metalnessMap:ot,roughnessMap:q,anisotropy:L,anisotropyMap:U,clearcoat:oe,clearcoatMap:k,clearcoatNormalMap:K,clearcoatRoughnessMap:G,dispersion:ce,iridescence:T,iridescenceMap:B,iridescenceThicknessMap:V,sheen:_,sheenColorMap:re,sheenRoughnessMap:he,specularMap:de,specularColorMap:le,specularIntensityMap:ve,transmission:D,transmissionMap:Se,thicknessMap:Ue,gradientMap:W,opaque:y.transparent===!1&&y.blending===Oi&&y.alphaToCoverage===!1,alphaMap:_e,alphaTest:ue,alphaHash:xe,combine:y.combine,mapUv:qe&&x(y.map.channel),aoMapUv:$e&&x(y.aoMap.channel),lightMapUv:Ve&&x(y.lightMap.channel),bumpMapUv:dt&&x(y.bumpMap.channel),normalMapUv:ht&&x(y.normalMap.channel),displacementMapUv:mt&&x(y.displacementMap.channel),emissiveMapUv:Mt&&x(y.emissiveMap.channel),metalnessMapUv:ot&&x(y.metalnessMap.channel),roughnessMapUv:q&&x(y.roughnessMap.channel),anisotropyMapUv:U&&x(y.anisotropyMap.channel),clearcoatMapUv:k&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:K&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:B&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:V&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:re&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:he&&x(y.sheenRoughnessMap.channel),specularMapUv:de&&x(y.specularMap.channel),specularColorMapUv:le&&x(y.specularColorMap.channel),specularIntensityMapUv:ve&&x(y.specularIntensityMap.channel),transmissionMapUv:Se&&x(y.transmissionMap.channel),thicknessMapUv:Ue&&x(y.thicknessMap.channel),alphaMapUv:_e&&x(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ht||L),vertexNormals:!!H.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!H.attributes.uv&&(qe||_e),fog:!!O,useFog:y.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&ht===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Me,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Re,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:me,decodeVideoTexture:qe&&y.map.isVideoTexture===!0&&Ye.getTransfer(y.map.colorSpace)===it,decodeVideoTextureEmissive:Mt&&y.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(y.emissiveMap.colorSpace)===it,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===En,flipSided:y.side===Gt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ee&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&y.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function g(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)A.push(I),A.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(p(A,y),v(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function p(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function v(y,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function w(y){const A=m[y.type];let I;if(A){const C=un[A];I=l0.clone(C.uniforms)}else I=y.uniforms;return I}function S(y,A){let I=u.get(A);return I!==void 0?++I.usedTimes:(I=new Fv(n,A,y,s),d.push(I),u.set(A,I)),I}function E(y){if(--y.usedTimes===0){const A=d.indexOf(y);d[A]=d[d.length-1],d.pop(),u.delete(y.cacheKey),y.destroy()}}function b(y){c.remove(y)}function N(){c.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:w,acquireProgram:S,releaseProgram:E,releaseShaderCache:b,programs:d,dispose:N}}function Gv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let c=n.get(o);return c===void 0&&(c={},n.set(o,c)),c}function i(o){n.delete(o)}function s(o,c,l){n.get(o)[c]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Hv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Wl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $l(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function c(h,m,x,M,g,p){let v=n[e];return v===void 0?(v={id:h.id,object:h,geometry:m,material:x,materialVariant:o(h),groupOrder:M,renderOrder:h.renderOrder,z:g,group:p},n[e]=v):(v.id=h.id,v.object=h,v.geometry=m,v.material=x,v.materialVariant=o(h),v.groupOrder=M,v.renderOrder=h.renderOrder,v.z=g,v.group=p),e++,v}function l(h,m,x,M,g,p){const v=c(h,m,x,M,g,p);x.transmission>0?i.push(v):x.transparent===!0?s.push(v):t.push(v)}function d(h,m,x,M,g,p){const v=c(h,m,x,M,g,p);x.transmission>0?i.unshift(v):x.transparent===!0?s.unshift(v):t.unshift(v)}function u(h,m,x){t.length>1&&t.sort(h||Hv),i.length>1&&i.sort(m||Wl),s.length>1&&s.sort(m||Wl),x&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let h=e,m=n.length;h<m;h++){const x=n[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:d,finish:f,sort:u}}function Vv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new $l,n.set(i,[o])):s>=r.length?(o=new $l,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Wv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new Xe};break;case"SpotLight":t={position:new J,direction:new J,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function $v(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Xv=0;function qv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Yv(n){const e=new Wv,t=$v(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new J);const s=new J,r=new pt,o=new pt;function c(d){let u=0,f=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let m=0,x=0,M=0,g=0,p=0,v=0,w=0,S=0,E=0,b=0,N=0;d.sort(qv);for(let A=0,I=d.length;A<I;A++){const C=d[A],P=C.color,F=C.intensity,O=C.distance;let H=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===gi?H=C.shadow.map.texture:H=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=P.r*F,f+=P.g*F,h+=P.b*F;else if(C.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(C.sh.coefficients[Y],F);N++}else if(C.isDirectionalLight){const Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const $=C.shadow,ne=t.get(C);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,i.directionalShadow[m]=ne,i.directionalShadowMap[m]=H,i.directionalShadowMatrix[m]=C.shadow.matrix,v++}i.directional[m]=Y,m++}else if(C.isSpotLight){const Y=e.get(C);Y.position.setFromMatrixPosition(C.matrixWorld),Y.color.copy(P).multiplyScalar(F),Y.distance=O,Y.coneCos=Math.cos(C.angle),Y.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Y.decay=C.decay,i.spot[M]=Y;const $=C.shadow;if(C.map&&(i.spotLightMap[E]=C.map,E++,$.updateMatrices(C),C.castShadow&&b++),i.spotLightMatrix[M]=$.matrix,C.castShadow){const ne=t.get(C);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,i.spotShadow[M]=ne,i.spotShadowMap[M]=H,S++}M++}else if(C.isRectAreaLight){const Y=e.get(C);Y.color.copy(P).multiplyScalar(F),Y.halfWidth.set(C.width*.5,0,0),Y.halfHeight.set(0,C.height*.5,0),i.rectArea[g]=Y,g++}else if(C.isPointLight){const Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),Y.distance=C.distance,Y.decay=C.decay,C.castShadow){const $=C.shadow,ne=t.get(C);ne.shadowIntensity=$.intensity,ne.shadowBias=$.bias,ne.shadowNormalBias=$.normalBias,ne.shadowRadius=$.radius,ne.shadowMapSize=$.mapSize,ne.shadowCameraNear=$.camera.near,ne.shadowCameraFar=$.camera.far,i.pointShadow[x]=ne,i.pointShadowMap[x]=H,i.pointShadowMatrix[x]=C.shadow.matrix,w++}i.point[x]=Y,x++}else if(C.isHemisphereLight){const Y=e.get(C);Y.skyColor.copy(C.color).multiplyScalar(F),Y.groundColor.copy(C.groundColor).multiplyScalar(F),i.hemi[p]=Y,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const y=i.hash;(y.directionalLength!==m||y.pointLength!==x||y.spotLength!==M||y.rectAreaLength!==g||y.hemiLength!==p||y.numDirectionalShadows!==v||y.numPointShadows!==w||y.numSpotShadows!==S||y.numSpotMaps!==E||y.numLightProbes!==N)&&(i.directional.length=m,i.spot.length=M,i.rectArea.length=g,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+E-b,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=N,y.directionalLength=m,y.pointLength=x,y.spotLength=M,y.rectAreaLength=g,y.hemiLength=p,y.numDirectionalShadows=v,y.numPointShadows=w,y.numSpotShadows=S,y.numSpotMaps=E,y.numLightProbes=N,i.version=Xv++)}function l(d,u){let f=0,h=0,m=0,x=0,M=0;const g=u.matrixWorldInverse;for(let p=0,v=d.length;p<v;p++){const w=d[p];if(w.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),f++}else if(w.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const S=i.rectArea[x];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(g),o.identity(),r.copy(w.matrixWorld),r.premultiply(g),o.extractRotation(r),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(w.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(g),h++}else if(w.isHemisphereLight){const S=i.hemi[M];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(g),M++}}}return{setup:c,setupView:l,state:i}}function Xl(n){const e=new Yv(n),t=[],i=[],s=[];function r(h){f.camera=h,t.length=0,i.length=0,s.length=0}function o(h){t.push(h)}function c(h){i.push(h)}function l(h){s.push(h)}function d(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:d,setupLightsView:u,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function Kv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let c;return o===void 0?(c=new Xl(n),e.set(s,[c])):r>=o.length?(c=new Xl(n),o.push(c)):c=o[r],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const Zv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jv=`uniform sampler2D shadow_pass;
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
}`,Qv=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],eM=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],ql=new pt,rs=new J,Ea=new J;function tM(n,e,t){let i=new sc;const s=new Ze,r=new Ze,o=new ft,c=new f0,l=new p0,d={},u=t.maxTextureSize,f={[qn]:Gt,[Gt]:qn,[En]:En},h=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:Zv,fragmentShader:Jv}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const x=new Ft;x.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ut(x,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sr;let p=this.type;this.render=function(b,N,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===sm&&(Be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=sr);const A=n.getRenderTarget(),I=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),P=n.state;P.setBlending(Nn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const F=p!==this.type;F&&N.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=b.length;O<H;O++){const Y=b[O],$=Y.shadow;if($===void 0){Be("WebGLShadowMap:",Y,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ne=$.getFrameExtents();s.multiply(ne),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,$.mapSize.y=r.y));const Q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=Q,$.map===null||F===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===ls){if(Y.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new mn(s.x,s.y,{format:gi,type:In,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),$.map.texture.name=Y.name+".shadowMap",$.map.depthTexture=new Wi(s.x,s.y,hn),$.map.depthTexture.name=Y.name+".shadowMapDepth",$.map.depthTexture.format=Dn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Nt,$.map.depthTexture.magFilter=Nt}else Y.isPointLight?($.map=new Tu(s.x),$.map.depthTexture=new o0(s.x,xn)):($.map=new mn(s.x,s.y),$.map.depthTexture=new Wi(s.x,s.y,xn)),$.map.depthTexture.name=Y.name+".shadowMap",$.map.depthTexture.format=Dn,this.type===sr?($.map.depthTexture.compareFunction=Q?nc:tc,$.map.depthTexture.minFilter=Dt,$.map.depthTexture.magFilter=Dt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Nt,$.map.depthTexture.magFilter=Nt);$.camera.updateProjectionMatrix()}const ie=$.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<ie;pe++){if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,pe),n.clear();else{pe===0&&(n.setRenderTarget($.map),n.clear());const fe=$.getViewport(pe);o.set(r.x*fe.x,r.y*fe.y,r.x*fe.z,r.y*fe.w),P.viewport(o)}if(Y.isPointLight){const fe=$.camera,Re=$.matrix,ge=Y.distance||fe.far;ge!==fe.far&&(fe.far=ge,fe.updateProjectionMatrix()),rs.setFromMatrixPosition(Y.matrixWorld),fe.position.copy(rs),Ea.copy(fe.position),Ea.add(Qv[pe]),fe.up.copy(eM[pe]),fe.lookAt(Ea),fe.updateMatrixWorld(),Re.makeTranslation(-rs.x,-rs.y,-rs.z),ql.multiplyMatrices(fe.projectionMatrix,fe.matrixWorldInverse),$._frustum.setFromProjectionMatrix(ql,fe.coordinateSystem,fe.reversedDepth)}else $.updateMatrices(Y);i=$.getFrustum(),S(N,y,$.camera,Y,this.type)}$.isPointLightShadow!==!0&&this.type===ls&&v($,y),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(A,I,C)};function v(b,N){const y=e.update(M);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new mn(s.x,s.y,{format:gi,type:In})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(N,null,y,h,M,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(N,null,y,m,M,null)}function w(b,N,y,A){let I=null;const C=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)I=C;else if(I=y.isPointLight===!0?l:c,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const P=I.uuid,F=N.uuid;let O=d[P];O===void 0&&(O={},d[P]=O);let H=O[F];H===void 0&&(H=I.clone(),O[F]=H,N.addEventListener("dispose",E)),I=H}if(I.visible=N.visible,I.wireframe=N.wireframe,A===ls?I.side=N.shadowSide!==null?N.shadowSide:N.side:I.side=N.shadowSide!==null?N.shadowSide:f[N.side],I.alphaMap=N.alphaMap,I.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,I.map=N.map,I.clipShadows=N.clipShadows,I.clippingPlanes=N.clippingPlanes,I.clipIntersection=N.clipIntersection,I.displacementMap=N.displacementMap,I.displacementScale=N.displacementScale,I.displacementBias=N.displacementBias,I.wireframeLinewidth=N.wireframeLinewidth,I.linewidth=N.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const P=n.properties.get(I);P.light=y}return I}function S(b,N,y,A,I){if(b.visible===!1)return;if(b.layers.test(N.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===ls)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);const F=e.update(b),O=b.material;if(Array.isArray(O)){const H=F.groups;for(let Y=0,$=H.length;Y<$;Y++){const ne=H[Y],Q=O[ne.materialIndex];if(Q&&Q.visible){const ie=w(b,Q,A,I);b.onBeforeShadow(n,b,N,y,F,ie,ne),n.renderBufferDirect(y,null,F,ie,b,ne),b.onAfterShadow(n,b,N,y,F,ie,ne)}}}else if(O.visible){const H=w(b,O,A,I);b.onBeforeShadow(n,b,N,y,F,H,null),n.renderBufferDirect(y,null,F,H,b,null),b.onAfterShadow(n,b,N,y,F,H,null)}}const P=b.children;for(let F=0,O=P.length;F<O;F++)S(P[F],N,y,A,I)}function E(b){b.target.removeEventListener("dispose",E);for(const y in d){const A=d[y],I=b.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function nM(n,e){function t(){let W=!1;const _e=new ft;let ue=null;const xe=new ft(0,0,0,0);return{setMask:function(Ee){ue!==Ee&&!W&&(n.colorMask(Ee,Ee,Ee,Ee),ue=Ee)},setLocked:function(Ee){W=Ee},setClear:function(Ee,me,De,Pe,gt){gt===!0&&(Ee*=Pe,me*=Pe,De*=Pe),_e.set(Ee,me,De,Pe),xe.equals(_e)===!1&&(n.clearColor(Ee,me,De,Pe),xe.copy(_e))},reset:function(){W=!1,ue=null,xe.set(-1,0,0,0)}}}function i(){let W=!1,_e=!1,ue=null,xe=null,Ee=null;return{setReversed:function(me){if(_e!==me){const De=e.get("EXT_clip_control");me?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),_e=me;const Pe=Ee;Ee=null,this.setClear(Pe)}},getReversed:function(){return _e},setTest:function(me){me?Z(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(me){ue!==me&&!W&&(n.depthMask(me),ue=me)},setFunc:function(me){if(_e&&(me=Om[me]),xe!==me){switch(me){case Xa:n.depthFunc(n.NEVER);break;case qa:n.depthFunc(n.ALWAYS);break;case Ya:n.depthFunc(n.LESS);break;case Hi:n.depthFunc(n.LEQUAL);break;case Ka:n.depthFunc(n.EQUAL);break;case Za:n.depthFunc(n.GEQUAL);break;case Ja:n.depthFunc(n.GREATER);break;case Qa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=me}},setLocked:function(me){W=me},setClear:function(me){Ee!==me&&(Ee=me,_e&&(me=1-me),n.clearDepth(me))},reset:function(){W=!1,ue=null,xe=null,Ee=null,_e=!1}}}function s(){let W=!1,_e=null,ue=null,xe=null,Ee=null,me=null,De=null,Pe=null,gt=null;return{setTest:function(ct){W||(ct?Z(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(ct){_e!==ct&&!W&&(n.stencilMask(ct),_e=ct)},setFunc:function(ct,sn,rn){(ue!==ct||xe!==sn||Ee!==rn)&&(n.stencilFunc(ct,sn,rn),ue=ct,xe=sn,Ee=rn)},setOp:function(ct,sn,rn){(me!==ct||De!==sn||Pe!==rn)&&(n.stencilOp(ct,sn,rn),me=ct,De=sn,Pe=rn)},setLocked:function(ct){W=ct},setClear:function(ct){gt!==ct&&(n.clearStencil(ct),gt=ct)},reset:function(){W=!1,_e=null,ue=null,xe=null,Ee=null,me=null,De=null,Pe=null,gt=null}}}const r=new t,o=new i,c=new s,l=new WeakMap,d=new WeakMap;let u={},f={},h={},m=new WeakMap,x=[],M=null,g=!1,p=null,v=null,w=null,S=null,E=null,b=null,N=null,y=new Xe(0,0,0),A=0,I=!1,C=null,P=null,F=null,O=null,H=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ne=0;const Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(Q)[1]),$=ne>=1):Q.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),$=ne>=2);let ie=null,pe={};const fe=n.getParameter(n.SCISSOR_BOX),Re=n.getParameter(n.VIEWPORT),ge=new ft().fromArray(fe),Ae=new ft().fromArray(Re);function ae(W,_e,ue,xe){const Ee=new Uint8Array(4),me=n.createTexture();n.bindTexture(W,me),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<ue;De++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(_e+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return me}const j={};j[n.TEXTURE_2D]=ae(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Z(n.DEPTH_TEST),o.setFunc(Hi),dt(!1),ht(Yc),Z(n.CULL_FACE),$e(Nn);function Z(W){u[W]!==!0&&(n.enable(W),u[W]=!0)}function Me(W){u[W]!==!1&&(n.disable(W),u[W]=!1)}function Ie(W,_e){return h[W]!==_e?(n.bindFramebuffer(W,_e),h[W]=_e,W===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=_e),W===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ne(W,_e){let ue=x,xe=!1;if(W){ue=m.get(_e),ue===void 0&&(ue=[],m.set(_e,ue));const Ee=W.textures;if(ue.length!==Ee.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let me=0,De=Ee.length;me<De;me++)ue[me]=n.COLOR_ATTACHMENT0+me;ue.length=Ee.length,xe=!0}}else ue[0]!==n.BACK&&(ue[0]=n.BACK,xe=!0);xe&&n.drawBuffers(ue)}function qe(W){return M!==W?(n.useProgram(W),M=W,!0):!1}const Ge={[ri]:n.FUNC_ADD,[am]:n.FUNC_SUBTRACT,[om]:n.FUNC_REVERSE_SUBTRACT};Ge[cm]=n.MIN,Ge[lm]=n.MAX;const Je={[dm]:n.ZERO,[um]:n.ONE,[hm]:n.SRC_COLOR,[Wa]:n.SRC_ALPHA,[_m]:n.SRC_ALPHA_SATURATE,[gm]:n.DST_COLOR,[pm]:n.DST_ALPHA,[fm]:n.ONE_MINUS_SRC_COLOR,[$a]:n.ONE_MINUS_SRC_ALPHA,[xm]:n.ONE_MINUS_DST_COLOR,[mm]:n.ONE_MINUS_DST_ALPHA,[vm]:n.CONSTANT_COLOR,[Mm]:n.ONE_MINUS_CONSTANT_COLOR,[ym]:n.CONSTANT_ALPHA,[bm]:n.ONE_MINUS_CONSTANT_ALPHA};function $e(W,_e,ue,xe,Ee,me,De,Pe,gt,ct){if(W===Nn){g===!0&&(Me(n.BLEND),g=!1);return}if(g===!1&&(Z(n.BLEND),g=!0),W!==rm){if(W!==p||ct!==I){if((v!==ri||E!==ri)&&(n.blendEquation(n.FUNC_ADD),v=ri,E=ri),ct)switch(W){case Oi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFunc(n.ONE,n.ONE);break;case Kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",W);break}else switch(W){case Oi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Kc:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zc:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",W);break}w=null,S=null,b=null,N=null,y.set(0,0,0),A=0,p=W,I=ct}return}Ee=Ee||_e,me=me||ue,De=De||xe,(_e!==v||Ee!==E)&&(n.blendEquationSeparate(Ge[_e],Ge[Ee]),v=_e,E=Ee),(ue!==w||xe!==S||me!==b||De!==N)&&(n.blendFuncSeparate(Je[ue],Je[xe],Je[me],Je[De]),w=ue,S=xe,b=me,N=De),(Pe.equals(y)===!1||gt!==A)&&(n.blendColor(Pe.r,Pe.g,Pe.b,gt),y.copy(Pe),A=gt),p=W,I=!1}function Ve(W,_e){W.side===En?Me(n.CULL_FACE):Z(n.CULL_FACE);let ue=W.side===Gt;_e&&(ue=!ue),dt(ue),W.blending===Oi&&W.transparent===!1?$e(Nn):$e(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);const xe=W.stencilWrite;c.setTest(xe),xe&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Mt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(W){C!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),C=W)}function ht(W){W!==nm?(Z(n.CULL_FACE),W!==P&&(W===Yc?n.cullFace(n.BACK):W===im?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),P=W}function mt(W){W!==F&&($&&n.lineWidth(W),F=W)}function Mt(W,_e,ue){W?(Z(n.POLYGON_OFFSET_FILL),(O!==_e||H!==ue)&&(O=_e,H=ue,o.getReversed()&&(_e=-_e),n.polygonOffset(_e,ue))):Me(n.POLYGON_OFFSET_FILL)}function ot(W){W?Z(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function q(W){W===void 0&&(W=n.TEXTURE0+Y-1),ie!==W&&(n.activeTexture(W),ie=W)}function L(W,_e,ue){ue===void 0&&(ie===null?ue=n.TEXTURE0+Y-1:ue=ie);let xe=pe[ue];xe===void 0&&(xe={type:void 0,texture:void 0},pe[ue]=xe),(xe.type!==W||xe.texture!==_e)&&(ie!==ue&&(n.activeTexture(ue),ie=ue),n.bindTexture(W,_e||j[W]),xe.type=W,xe.texture=_e)}function oe(){const W=pe[ie];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function ce(){try{n.compressedTexImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function _(){try{n.texSubImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function D(){try{n.texSubImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function U(){try{n.compressedTexSubImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function k(){try{n.compressedTexSubImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function K(){try{n.texStorage2D(...arguments)}catch(W){et("WebGLState:",W)}}function G(){try{n.texStorage3D(...arguments)}catch(W){et("WebGLState:",W)}}function B(){try{n.texImage2D(...arguments)}catch(W){et("WebGLState:",W)}}function V(){try{n.texImage3D(...arguments)}catch(W){et("WebGLState:",W)}}function re(W){return f[W]!==void 0?f[W]:n.getParameter(W)}function he(W,_e){f[W]!==_e&&(n.pixelStorei(W,_e),f[W]=_e)}function de(W){ge.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),ge.copy(W))}function le(W){Ae.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),Ae.copy(W))}function ve(W,_e){let ue=d.get(_e);ue===void 0&&(ue=new WeakMap,d.set(_e,ue));let xe=ue.get(W);xe===void 0&&(xe=n.getUniformBlockIndex(_e,W.name),ue.set(W,xe))}function Se(W,_e){const xe=d.get(_e).get(W);l.get(_e)!==xe&&(n.uniformBlockBinding(_e,xe,W.__bindingPointIndex),l.set(_e,xe))}function Ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ie=null,pe={},h={},m=new WeakMap,x=[],M=null,g=!1,p=null,v=null,w=null,S=null,E=null,b=null,N=null,y=new Xe(0,0,0),A=0,I=!1,C=null,P=null,F=null,O=null,H=null,ge.set(0,0,n.canvas.width,n.canvas.height),Ae.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:Z,disable:Me,bindFramebuffer:Ie,drawBuffers:Ne,useProgram:qe,setBlending:$e,setMaterial:Ve,setFlipSided:dt,setCullFace:ht,setLineWidth:mt,setPolygonOffset:Mt,setScissorTest:ot,activeTexture:q,bindTexture:L,unbindTexture:oe,compressedTexImage2D:ce,compressedTexImage3D:T,texImage2D:B,texImage3D:V,pixelStorei:he,getParameter:re,updateUBOMapping:ve,uniformBlockBinding:Se,texStorage2D:K,texStorage3D:G,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:U,compressedTexSubImage3D:k,scissor:de,viewport:le,reset:Ue}}function iM(n,e,t,i,s,r,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Ze,u=new WeakMap,f=new Set;let h;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(T,_){return x?new OffscreenCanvas(T,_):_r("canvas")}function g(T,_,D){let U=1;const k=ce(T);if((k.width>D||k.height>D)&&(U=D/Math.max(k.width,k.height)),U<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor(U*k.width),G=Math.floor(U*k.height);h===void 0&&(h=M(K,G));const B=_?M(K,G):h;return B.width=K,B.height=G,B.getContext("2d").drawImage(T,0,0,K,G),Be("WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+K+"x"+G+")."),B}else return"data"in T&&Be("WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),T;return T}function p(T){return T.generateMipmaps}function v(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(T,_,D,U,k,K=!1){if(T!==null){if(n[T]!==void 0)return n[T];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let G;U&&(G=e.get("EXT_texture_norm16"),G||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let B=_;if(_===n.RED&&(D===n.FLOAT&&(B=n.R32F),D===n.HALF_FLOAT&&(B=n.R16F),D===n.UNSIGNED_BYTE&&(B=n.R8),D===n.UNSIGNED_SHORT&&G&&(B=G.R16_EXT),D===n.SHORT&&G&&(B=G.R16_SNORM_EXT)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.R8UI),D===n.UNSIGNED_SHORT&&(B=n.R16UI),D===n.UNSIGNED_INT&&(B=n.R32UI),D===n.BYTE&&(B=n.R8I),D===n.SHORT&&(B=n.R16I),D===n.INT&&(B=n.R32I)),_===n.RG&&(D===n.FLOAT&&(B=n.RG32F),D===n.HALF_FLOAT&&(B=n.RG16F),D===n.UNSIGNED_BYTE&&(B=n.RG8),D===n.UNSIGNED_SHORT&&G&&(B=G.RG16_EXT),D===n.SHORT&&G&&(B=G.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.RG8UI),D===n.UNSIGNED_SHORT&&(B=n.RG16UI),D===n.UNSIGNED_INT&&(B=n.RG32UI),D===n.BYTE&&(B=n.RG8I),D===n.SHORT&&(B=n.RG16I),D===n.INT&&(B=n.RG32I)),_===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.RGB8UI),D===n.UNSIGNED_SHORT&&(B=n.RGB16UI),D===n.UNSIGNED_INT&&(B=n.RGB32UI),D===n.BYTE&&(B=n.RGB8I),D===n.SHORT&&(B=n.RGB16I),D===n.INT&&(B=n.RGB32I)),_===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(B=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(B=n.RGBA16UI),D===n.UNSIGNED_INT&&(B=n.RGBA32UI),D===n.BYTE&&(B=n.RGBA8I),D===n.SHORT&&(B=n.RGBA16I),D===n.INT&&(B=n.RGBA32I)),_===n.RGB&&(D===n.UNSIGNED_SHORT&&G&&(B=G.RGB16_EXT),D===n.SHORT&&G&&(B=G.RGB16_SNORM_EXT),D===n.UNSIGNED_INT_5_9_9_9_REV&&(B=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(B=n.R11F_G11F_B10F)),_===n.RGBA){const V=K?xr:Ye.getTransfer(k);D===n.FLOAT&&(B=n.RGBA32F),D===n.HALF_FLOAT&&(B=n.RGBA16F),D===n.UNSIGNED_BYTE&&(B=V===it?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT&&G&&(B=G.RGBA16_EXT),D===n.SHORT&&G&&(B=G.RGBA16_SNORM_EXT),D===n.UNSIGNED_SHORT_4_4_4_4&&(B=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(B=n.RGB5_A1)}return(B===n.R16F||B===n.R32F||B===n.RG16F||B===n.RG32F||B===n.RGBA16F||B===n.RGBA32F)&&e.get("EXT_color_buffer_float"),B}function E(T,_){let D;return T?_===null||_===xn||_===ps?D=n.DEPTH24_STENCIL8:_===hn?D=n.DEPTH32F_STENCIL8:_===fs&&(D=n.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===xn||_===ps?D=n.DEPTH_COMPONENT24:_===hn?D=n.DEPTH_COMPONENT32F:_===fs&&(D=n.DEPTH_COMPONENT16),D}function b(T,_){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Nt&&T.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function N(T){const _=T.target;_.removeEventListener("dispose",N),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function y(T){const _=T.target;_.removeEventListener("dispose",y),C(_)}function A(T){const _=i.get(T);if(_.__webglInit===void 0)return;const D=T.source,U=m.get(D);if(U){const k=U[_.__cacheKey];k.usedTimes--,k.usedTimes===0&&I(T),Object.keys(U).length===0&&m.delete(D)}i.remove(T)}function I(T){const _=i.get(T);n.deleteTexture(_.__webglTexture);const D=T.source,U=m.get(D);delete U[_.__cacheKey],o.memory.textures--}function C(T){const _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(_.__webglFramebuffer[U]))for(let k=0;k<_.__webglFramebuffer[U].length;k++)n.deleteFramebuffer(_.__webglFramebuffer[U][k]);else n.deleteFramebuffer(_.__webglFramebuffer[U]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[U])}else{if(Array.isArray(_.__webglFramebuffer))for(let U=0;U<_.__webglFramebuffer.length;U++)n.deleteFramebuffer(_.__webglFramebuffer[U]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let U=0;U<_.__webglColorRenderbuffer.length;U++)_.__webglColorRenderbuffer[U]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[U]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=T.textures;for(let U=0,k=D.length;U<k;U++){const K=i.get(D[U]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(D[U])}i.remove(T)}let P=0;function F(){P=0}function O(){return P}function H(T){P=T}function Y(){const T=P;return T>=s.maxTextures&&Be("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function $(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function ne(T,_){const D=i.get(T);if(T.isVideoTexture&&L(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&D.__version!==T.version){const U=T.image;if(U===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(D,T,_);return}}else T.isExternalTexture&&(D.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function Q(T,_){const D=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&D.__version!==T.version){Me(D,T,_);return}else T.isExternalTexture&&(D.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function ie(T,_){const D=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&D.__version!==T.version){Me(D,T,_);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function pe(T,_){const D=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&D.__version!==T.version){Ie(D,T,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}const fe={[eo]:n.REPEAT,[An]:n.CLAMP_TO_EDGE,[to]:n.MIRRORED_REPEAT},Re={[Nt]:n.NEAREST,[Em]:n.NEAREST_MIPMAP_NEAREST,[As]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[qr]:n.LINEAR_MIPMAP_NEAREST,[li]:n.LINEAR_MIPMAP_LINEAR},ge={[Cm]:n.NEVER,[Im]:n.ALWAYS,[Rm]:n.LESS,[tc]:n.LEQUAL,[Nm]:n.EQUAL,[nc]:n.GEQUAL,[Pm]:n.GREATER,[Lm]:n.NOTEQUAL};function Ae(T,_){if(_.type===hn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===qr||_.magFilter===As||_.magFilter===li||_.minFilter===Dt||_.minFilter===qr||_.minFilter===As||_.minFilter===li)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,fe[_.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,fe[_.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,fe[_.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Re[_.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Re[_.minFilter]),_.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Nt||_.minFilter!==As&&_.minFilter!==li||_.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function ae(T,_){let D=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",N));const U=_.source;let k=m.get(U);k===void 0&&(k={},m.set(U,k));const K=$(_);if(K!==T.__cacheKey){k[K]===void 0&&(k[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,D=!0),k[K].usedTimes++;const G=k[T.__cacheKey];G!==void 0&&(k[T.__cacheKey].usedTimes--,G.usedTimes===0&&I(_)),T.__cacheKey=K,T.__webglTexture=k[K].texture}return D}function j(T,_,D){return Math.floor(Math.floor(T/D)/_)}function Z(T,_,D,U){const K=T.updateRanges;if(K.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,D,U,_.data);else{K.sort((he,de)=>he.start-de.start);let G=0;for(let he=1;he<K.length;he++){const de=K[G],le=K[he],ve=de.start+de.count,Se=j(le.start,_.width,4),Ue=j(de.start,_.width,4);le.start<=ve+1&&Se===Ue&&j(le.start+le.count-1,_.width,4)===Se?de.count=Math.max(de.count,le.start+le.count-de.start):(++G,K[G]=le)}K.length=G+1;const B=t.getParameter(n.UNPACK_ROW_LENGTH),V=t.getParameter(n.UNPACK_SKIP_PIXELS),re=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let he=0,de=K.length;he<de;he++){const le=K[he],ve=Math.floor(le.start/4),Se=Math.ceil(le.count/4),Ue=ve%_.width,W=Math.floor(ve/_.width),_e=Se,ue=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,Ue,W,_e,ue,D,U,_.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,B),t.pixelStorei(n.UNPACK_SKIP_PIXELS,V),t.pixelStorei(n.UNPACK_SKIP_ROWS,re)}}function Me(T,_,D){let U=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(U=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(U=n.TEXTURE_3D);const k=ae(T,_),K=_.source;t.bindTexture(U,T.__webglTexture,n.TEXTURE0+D);const G=i.get(K);if(K.version!==G.__version||k===!0){if(t.activeTexture(n.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ue=Ye.getPrimaries(Ye.workingColorSpace),xe=_.colorSpace===Wn?null:Ye.getPrimaries(_.colorSpace),Ee=_.colorSpace===Wn||ue===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let V=g(_.image,!1,s.maxTextureSize);V=oe(_,V);const re=r.convert(_.format,_.colorSpace),he=r.convert(_.type);let de=S(_.internalFormat,re,he,_.normalized,_.colorSpace,_.isVideoTexture);Ae(U,_);let le;const ve=_.mipmaps,Se=_.isVideoTexture!==!0,Ue=G.__version===void 0||k===!0,W=K.dataReady,_e=b(_,V);if(_.isDepthTexture)de=E(_.format===di,_.type),Ue&&(Se?t.texStorage2D(n.TEXTURE_2D,1,de,V.width,V.height):t.texImage2D(n.TEXTURE_2D,0,de,V.width,V.height,0,re,he,null));else if(_.isDataTexture)if(ve.length>0){Se&&Ue&&t.texStorage2D(n.TEXTURE_2D,_e,de,ve[0].width,ve[0].height);for(let ue=0,xe=ve.length;ue<xe;ue++)le=ve[ue],Se?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,le.width,le.height,re,he,le.data):t.texImage2D(n.TEXTURE_2D,ue,de,le.width,le.height,0,re,he,le.data);_.generateMipmaps=!1}else Se?(Ue&&t.texStorage2D(n.TEXTURE_2D,_e,de,V.width,V.height),W&&Z(_,V,re,he)):t.texImage2D(n.TEXTURE_2D,0,de,V.width,V.height,0,re,he,V.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Se&&Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,de,ve[0].width,ve[0].height,V.depth);for(let ue=0,xe=ve.length;ue<xe;ue++)if(le=ve[ue],_.format!==nn)if(re!==null)if(Se){if(W)if(_.layerUpdates.size>0){const Ee=El(le.width,le.height,_.format,_.type);for(const me of _.layerUpdates){const De=le.data.subarray(me*Ee/le.data.BYTES_PER_ELEMENT,(me+1)*Ee/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,me,le.width,le.height,1,re,De)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,le.width,le.height,V.depth,re,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,de,le.width,le.height,V.depth,0,le.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Se?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,le.width,le.height,V.depth,re,he,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,de,le.width,le.height,V.depth,0,re,he,le.data)}else{Se&&Ue&&t.texStorage2D(n.TEXTURE_2D,_e,de,ve[0].width,ve[0].height);for(let ue=0,xe=ve.length;ue<xe;ue++)le=ve[ue],_.format!==nn?re!==null?Se?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,le.width,le.height,re,le.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,de,le.width,le.height,0,le.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Se?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,le.width,le.height,re,he,le.data):t.texImage2D(n.TEXTURE_2D,ue,de,le.width,le.height,0,re,he,le.data)}else if(_.isDataArrayTexture)if(Se){if(Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,de,V.width,V.height,V.depth),W)if(_.layerUpdates.size>0){const ue=El(V.width,V.height,_.format,_.type);for(const xe of _.layerUpdates){const Ee=V.data.subarray(xe*ue/V.data.BYTES_PER_ELEMENT,(xe+1)*ue/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,V.width,V.height,1,re,he,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,re,he,V.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,de,V.width,V.height,V.depth,0,re,he,V.data);else if(_.isData3DTexture)Se?(Ue&&t.texStorage3D(n.TEXTURE_3D,_e,de,V.width,V.height,V.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,re,he,V.data)):t.texImage3D(n.TEXTURE_3D,0,de,V.width,V.height,V.depth,0,re,he,V.data);else if(_.isFramebufferTexture){if(Ue)if(Se)t.texStorage2D(n.TEXTURE_2D,_e,de,V.width,V.height);else{let ue=V.width,xe=V.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,de,ue,xe,0,re,he,null),ue>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ue=n.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),V.parentNode!==ue){ue.appendChild(V),f.add(_),ue.onpaint=xe=>{const Ee=xe.changedElements;for(const me of f)Ee.includes(me.image)&&(me.needsUpdate=!0)},ue.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,V);else{const Ee=n.RGBA,me=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,me,De,V)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ve.length>0){if(Se&&Ue){const ue=ce(ve[0]);t.texStorage2D(n.TEXTURE_2D,_e,de,ue.width,ue.height)}for(let ue=0,xe=ve.length;ue<xe;ue++)le=ve[ue],Se?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,re,he,le):t.texImage2D(n.TEXTURE_2D,ue,de,re,he,le);_.generateMipmaps=!1}else if(Se){if(Ue){const ue=ce(V);t.texStorage2D(n.TEXTURE_2D,_e,de,ue.width,ue.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,re,he,V)}else t.texImage2D(n.TEXTURE_2D,0,de,re,he,V);p(_)&&v(U),G.__version=K.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ie(T,_,D){if(_.image.length!==6)return;const U=ae(T,_),k=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+D);const K=i.get(k);if(k.version!==K.__version||U===!0){t.activeTexture(n.TEXTURE0+D);const G=Ye.getPrimaries(Ye.workingColorSpace),B=_.colorSpace===Wn?null:Ye.getPrimaries(_.colorSpace),V=_.colorSpace===Wn||G===B?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const re=_.isCompressedTexture||_.image[0].isCompressedTexture,he=_.image[0]&&_.image[0].isDataTexture,de=[];for(let me=0;me<6;me++)!re&&!he?de[me]=g(_.image[me],!0,s.maxCubemapSize):de[me]=he?_.image[me].image:_.image[me],de[me]=oe(_,de[me]);const le=de[0],ve=r.convert(_.format,_.colorSpace),Se=r.convert(_.type),Ue=S(_.internalFormat,ve,Se,_.normalized,_.colorSpace),W=_.isVideoTexture!==!0,_e=K.__version===void 0||U===!0,ue=k.dataReady;let xe=b(_,le);Ae(n.TEXTURE_CUBE_MAP,_);let Ee;if(re){W&&_e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ue,le.width,le.height);for(let me=0;me<6;me++){Ee=de[me].mipmaps;for(let De=0;De<Ee.length;De++){const Pe=Ee[De];_.format!==nn?ve!==null?W?ue&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,0,0,Pe.width,Pe.height,ve,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,Ue,Pe.width,Pe.height,0,Pe.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,0,0,Pe.width,Pe.height,ve,Se,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De,Ue,Pe.width,Pe.height,0,ve,Se,Pe.data)}}}else{if(Ee=_.mipmaps,W&&_e){Ee.length>0&&xe++;const me=ce(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ue,me.width,me.height)}for(let me=0;me<6;me++)if(he){W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,de[me].width,de[me].height,ve,Se,de[me].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,Ue,de[me].width,de[me].height,0,ve,Se,de[me].data);for(let De=0;De<Ee.length;De++){const gt=Ee[De].image[me].image;W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,0,0,gt.width,gt.height,ve,Se,gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,Ue,gt.width,gt.height,0,ve,Se,gt.data)}}else{W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,ve,Se,de[me]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,Ue,ve,Se,de[me]);for(let De=0;De<Ee.length;De++){const Pe=Ee[De];W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,0,0,ve,Se,Pe.image[me]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,De+1,Ue,ve,Se,Pe.image[me])}}}p(_)&&v(n.TEXTURE_CUBE_MAP),K.__version=k.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Ne(T,_,D,U,k,K){const G=r.convert(D.format,D.colorSpace),B=r.convert(D.type),V=S(D.internalFormat,G,B,D.normalized,D.colorSpace),re=i.get(_),he=i.get(D);if(he.__renderTarget=_,!re.__hasExternalTextures){const de=Math.max(1,_.width>>K),le=Math.max(1,_.height>>K);k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?t.texImage3D(k,K,V,de,le,_.depth,0,G,B,null):t.texImage2D(k,K,V,de,le,0,G,B,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),q(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,U,k,he.__webglTexture,0,ot(_)):(k===n.TEXTURE_2D||k>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,U,k,he.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(T,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,T),_.depthBuffer){const U=_.depthTexture,k=U&&U.isDepthTexture?U.type:null,K=E(_.stencilBuffer,k),G=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;q(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),K,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),K,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,K,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,T)}else{const U=_.textures;for(let k=0;k<U.length;k++){const K=U[k],G=r.convert(K.format,K.colorSpace),B=r.convert(K.type),V=S(K.internalFormat,G,B,K.normalized,K.colorSpace);q(_)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot(_),V,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot(_),V,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,V,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ge(T,_,D){const U=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const k=i.get(_.depthTexture);if(k.__renderTarget=_,(!k.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),U){if(k.__webglInit===void 0&&(k.__webglInit=!0,_.depthTexture.addEventListener("dispose",N)),k.__webglTexture===void 0){k.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,_.depthTexture);const re=r.convert(_.depthTexture.format),he=r.convert(_.depthTexture.type);let de;_.depthTexture.format===Dn?de=n.DEPTH_COMPONENT24:_.depthTexture.format===di&&(de=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,de,_.width,_.height,0,re,he,null)}}else ne(_.depthTexture,0);const K=k.__webglTexture,G=ot(_),B=U?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,V=_.depthTexture.format===di?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Dn)q(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,B,K,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,V,B,K,0);else if(_.depthTexture.format===di)q(_)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,B,K,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,V,B,K,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(T){const _=i.get(T),D=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const U=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),U){const k=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,U.removeEventListener("dispose",k)};U.addEventListener("dispose",k),_.__depthDisposeCallback=k}_.__boundDepthTexture=U}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let U=0;U<6;U++)Ge(_.__webglFramebuffer[U],T,U);else{const U=T.texture.mipmaps;U&&U.length>0?Ge(_.__webglFramebuffer[0],T,0):Ge(_.__webglFramebuffer,T,0)}else if(D){_.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[U]),_.__webglDepthbuffer[U]===void 0)_.__webglDepthbuffer[U]=n.createRenderbuffer(),qe(_.__webglDepthbuffer[U],T,!1);else{const k=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer[U];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,K)}}else{const U=T.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),qe(_.__webglDepthbuffer,T,!1);else{const k=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,K)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(T,_,D){const U=i.get(T);_!==void 0&&Ne(U.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Je(T)}function Ve(T){const _=T.texture,D=i.get(T),U=i.get(_);T.addEventListener("dispose",y);const k=T.textures,K=T.isWebGLCubeRenderTarget===!0,G=k.length>1;if(G||(U.__webglTexture===void 0&&(U.__webglTexture=n.createTexture()),U.__version=_.version,o.memory.textures++),K){D.__webglFramebuffer=[];for(let B=0;B<6;B++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[B]=[];for(let V=0;V<_.mipmaps.length;V++)D.__webglFramebuffer[B][V]=n.createFramebuffer()}else D.__webglFramebuffer[B]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let B=0;B<_.mipmaps.length;B++)D.__webglFramebuffer[B]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(G)for(let B=0,V=k.length;B<V;B++){const re=i.get(k[B]);re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&q(T)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let B=0;B<k.length;B++){const V=k[B];D.__webglColorRenderbuffer[B]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[B]);const re=r.convert(V.format,V.colorSpace),he=r.convert(V.type),de=S(V.internalFormat,re,he,V.normalized,V.colorSpace,T.isXRRenderTarget===!0),le=ot(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,de,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+B,n.RENDERBUFFER,D.__webglColorRenderbuffer[B])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),qe(D.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,_);for(let B=0;B<6;B++)if(_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ne(D.__webglFramebuffer[B][V],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+B,V);else Ne(D.__webglFramebuffer[B],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+B,0);p(_)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(G){for(let B=0,V=k.length;B<V;B++){const re=k[B],he=i.get(re);let de=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(de=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,he.__webglTexture),Ae(de,re),Ne(D.__webglFramebuffer,T,re,n.COLOR_ATTACHMENT0+B,de,0),p(re)&&v(de)}t.unbindTexture()}else{let B=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(B=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(B,U.__webglTexture),Ae(B,_),_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)Ne(D.__webglFramebuffer[V],T,_,n.COLOR_ATTACHMENT0,B,V);else Ne(D.__webglFramebuffer,T,_,n.COLOR_ATTACHMENT0,B,0);p(_)&&v(B),t.unbindTexture()}T.depthBuffer&&Je(T)}function dt(T){const _=T.textures;for(let D=0,U=_.length;D<U;D++){const k=_[D];if(p(k)){const K=w(T),G=i.get(k).__webglTexture;t.bindTexture(K,G),v(K),t.unbindTexture()}}}const ht=[],mt=[];function Mt(T){if(T.samples>0){if(q(T)===!1){const _=T.textures,D=T.width,U=T.height;let k=n.COLOR_BUFFER_BIT;const K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=i.get(T),B=_.length>1;if(B)for(let re=0;re<_.length;re++)t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer);const V=T.texture.mipmaps;V&&V.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let re=0;re<_.length;re++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(k|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(k|=n.STENCIL_BUFFER_BIT)),B){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,G.__webglColorRenderbuffer[re]);const he=i.get(_[re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,he,0)}n.blitFramebuffer(0,0,D,U,0,0,D,U,k,n.NEAREST),l===!0&&(ht.length=0,mt.length=0,ht.push(n.COLOR_ATTACHMENT0+re),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ht.push(K),mt.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,mt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),B)for(let re=0;re<_.length;re++){t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,G.__webglColorRenderbuffer[re]);const he=i.get(_[re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,G.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.TEXTURE_2D,he,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ot(T){return Math.min(s.maxSamples,T.samples)}function q(T){const _=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(T){const _=o.render.frame;u.get(T)!==_&&(u.set(T,_),T.update())}function oe(T,_){const D=T.colorSpace,U=T.format,k=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||D!==gr&&D!==Wn&&(Ye.getTransfer(D)===it?(U!==nn||k!==$t)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",D)),_}function ce(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(d.width=T.naturalWidth||T.width,d.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(d.width=T.displayWidth,d.height=T.displayHeight):(d.width=T.width,d.height=T.height),d}this.allocateTextureUnit=Y,this.resetTextureUnits=F,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=ne,this.setTexture2DArray=Q,this.setTexture3D=ie,this.setTextureCube=pe,this.rebindTextures=$e,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sM(n,e){function t(i,s=Wn){let r;const o=Ye.getTransfer(s);if(i===$t)return n.UNSIGNED_BYTE;if(i===Ko)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===iu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===su)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===tu)return n.BYTE;if(i===nu)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===Yo)return n.INT;if(i===xn)return n.UNSIGNED_INT;if(i===hn)return n.FLOAT;if(i===In)return n.HALF_FLOAT;if(i===ru)return n.ALPHA;if(i===au)return n.RGB;if(i===nn)return n.RGBA;if(i===Dn)return n.DEPTH_COMPONENT;if(i===di)return n.DEPTH_STENCIL;if(i===ou)return n.RED;if(i===Jo)return n.RED_INTEGER;if(i===gi)return n.RG;if(i===Qo)return n.RG_INTEGER;if(i===ec)return n.RGBA_INTEGER;if(i===rr||i===ar||i===or||i===cr)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===no||i===io||i===so||i===ro)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===no)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===so)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ao||i===oo||i===co||i===lo||i===uo||i===pr||i===ho)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ao||i===oo)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===co)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===lo)return r.COMPRESSED_R11_EAC;if(i===uo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===pr)return r.COMPRESSED_RG11_EAC;if(i===ho)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fo||i===po||i===mo||i===go||i===xo||i===_o||i===vo||i===Mo||i===yo||i===bo||i===So||i===wo||i===Eo||i===To)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===po)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===go)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_o)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Mo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===So)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eo)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===To)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ao||i===Co||i===Ro)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ao)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===No||i===Po||i===mr||i===Lo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===No)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Po)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===mr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ps?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const rM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aM=`
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

}`;class oM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new _u(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new _n({vertexShader:rM,fragmentShader:aM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new Ki(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cM extends _i{constructor(e,t){super();const i=this;let s=null,r=1,o=null,c="local-floor",l=1,d=null,u=null,f=null,h=null,m=null,x=null;const M=typeof XRWebGLBinding<"u",g=new oM,p={},v=t.getContextAttributes();let w=null,S=null;const E=[],b=[],N=new Ze;let y=null;const A=new jt;A.viewport=new ft;const I=new jt;I.viewport=new ft;const C=[A,I],P=new _0;let F=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let j=E[ae];return j===void 0&&(j=new na,E[ae]=j),j.getTargetRaySpace()},this.getControllerGrip=function(ae){let j=E[ae];return j===void 0&&(j=new na,E[ae]=j),j.getGripSpace()},this.getHand=function(ae){let j=E[ae];return j===void 0&&(j=new na,E[ae]=j),j.getHandSpace()};function H(ae){const j=b.indexOf(ae.inputSource);if(j===-1)return;const Z=E[j];Z!==void 0&&(Z.update(ae.inputSource,ae.frame,d||o),Z.dispatchEvent({type:ae.type,data:ae.inputSource}))}function Y(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",$);for(let ae=0;ae<E.length;ae++){const j=b[ae];j!==null&&(b[ae]=null,E[ae].disconnect(j))}F=null,O=null,g.reset();for(const ae in p)delete p[ae];e.setRenderTarget(w),m=null,h=null,f=null,s=null,S=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,i.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){c=ae,i.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||o},this.setReferenceSpace=function(ae){d=ae},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",$),v.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(N),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,Me=null,Ie=null;v.depth&&(Ie=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=v.stencil?di:Dn,Me=v.stencil?ps:xn);const Ne={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ne),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new mn(h.textureWidth,h.textureHeight,{format:nn,type:$t,depthTexture:new Wi(h.textureWidth,h.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const Z={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new mn(m.framebufferWidth,m.framebufferHeight,{format:nn,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),d=null,o=await s.requestReferenceSpace(c),Ae.setContext(s),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(ae){for(let j=0;j<ae.removed.length;j++){const Z=ae.removed[j],Me=b.indexOf(Z);Me>=0&&(b[Me]=null,E[Me].disconnect(Z))}for(let j=0;j<ae.added.length;j++){const Z=ae.added[j];let Me=b.indexOf(Z);if(Me===-1){for(let Ne=0;Ne<E.length;Ne++)if(Ne>=b.length){b.push(Z),Me=Ne;break}else if(b[Ne]===null){b[Ne]=Z,Me=Ne;break}if(Me===-1)break}const Ie=E[Me];Ie&&Ie.connect(Z)}}const ne=new J,Q=new J;function ie(ae,j,Z){ne.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(Z.matrixWorld);const Me=ne.distanceTo(Q),Ie=j.projectionMatrix.elements,Ne=Z.projectionMatrix.elements,qe=Ie[14]/(Ie[10]-1),Ge=Ie[14]/(Ie[10]+1),Je=(Ie[9]+1)/Ie[5],$e=(Ie[9]-1)/Ie[5],Ve=(Ie[8]-1)/Ie[0],dt=(Ne[8]+1)/Ne[0],ht=qe*Ve,mt=qe*dt,Mt=Me/(-Ve+dt),ot=Mt*-Ve;if(j.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(ot),ae.translateZ(Mt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Ie[10]===-1)ae.projectionMatrix.copy(j.projectionMatrix),ae.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const q=qe+Mt,L=Ge+Mt,oe=ht-ot,ce=mt+(Me-ot),T=Je*Ge/L*q,_=$e*Ge/L*q;ae.projectionMatrix.makePerspective(oe,ce,T,_,q,L),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function pe(ae,j){j===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(j.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let j=ae.near,Z=ae.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(Z=g.depthFar)),P.near=I.near=A.near=j,P.far=I.far=A.far=Z,(F!==P.near||O!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,O=P.far),P.layers.mask=ae.layers.mask|6,A.layers.mask=P.layers.mask&-5,I.layers.mask=P.layers.mask&-3;const Me=ae.parent,Ie=P.cameras;pe(P,Me);for(let Ne=0;Ne<Ie.length;Ne++)pe(Ie[Ne],Me);Ie.length===2?ie(P,A,I):P.projectionMatrix.copy(A.projectionMatrix),fe(ae,P,Me)};function fe(ae,j,Z){Z===null?ae.matrix.copy(j.matrixWorld):(ae.matrix.copy(Z.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(j.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(j.projectionMatrix),ae.projectionMatrixInverse.copy(j.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Do*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(ae){l=ae,h!==null&&(h.fixedFoveation=ae),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ae)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(ae){return p[ae]};let Re=null;function ge(ae,j){if(u=j.getViewerPose(d||o),x=j,u!==null){const Z=u.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let Me=!1;Z.length!==P.cameras.length&&(P.cameras.length=0,Me=!0);for(let Ge=0;Ge<Z.length;Ge++){const Je=Z[Ge];let $e=null;if(m!==null)$e=m.getViewport(Je);else{const dt=f.getViewSubImage(h,Je);$e=dt.viewport,Ge===0&&(e.setRenderTargetTextures(S,dt.colorTexture,dt.depthStencilTexture),e.setRenderTarget(S))}let Ve=C[Ge];Ve===void 0&&(Ve=new jt,Ve.layers.enable(Ge),Ve.viewport=new ft,C[Ge]=Ve),Ve.matrix.fromArray(Je.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Je.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set($e.x,$e.y,$e.width,$e.height),Ge===0&&(P.matrix.copy(Ve.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Me===!0&&P.cameras.push(Ve)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const Ge=f.getDepthInformation(Z[0]);Ge&&Ge.isValid&&Ge.texture&&g.init(Ge,s.renderState)}if(Ie&&Ie.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let Ge=0;Ge<Z.length;Ge++){const Je=Z[Ge].camera;if(Je){let $e=p[Je];$e||($e=new _u,p[Je]=$e);const Ve=f.getCameraImage(Je);$e.sourceTexture=Ve}}}}for(let Z=0;Z<E.length;Z++){const Me=b[Z],Ie=E[Z];Me!==null&&Ie!==void 0&&Ie.update(Me,j,d||o)}Re&&Re(ae,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),x=null}const Ae=new wu;Ae.setAnimationLoop(ge),this.setAnimationLoop=function(ae){Re=ae},this.dispose=function(){}}}const lM=new pt,Pu=new ke;Pu.set(-1,0,0,0,1,0,0,0,1);function dM(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,vu(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,w,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&m(g,p,S)):p.isMeshMatcapMaterial?(r(g,p),x(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),M(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&c(g,p)):p.isPointsMaterial?l(g,p,v,w):p.isSpriteMaterial?d(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Gt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Gt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p),w=v.envMap,S=v.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(lM.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Pu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function c(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=w*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Gt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function M(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function uM(n,e,t,i){let s={},r={},o=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,E){const b=E.program;i.uniformBlockBinding(S,b)}function d(S,E){let b=s[S.id];b===void 0&&(g(S),b=u(S),s[S.id]=b,S.addEventListener("dispose",v));const N=E.program;i.updateUBOMapping(S,N);const y=e.render.frame;r[S.id]!==y&&(h(S),r[S.id]=y)}function u(S){const E=f();S.__bindingPointIndex=E;const b=n.createBuffer(),N=S.__size,y=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,N,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function f(){for(let S=0;S<c;S++)if(o.indexOf(S)===-1)return o.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const E=s[S.id],b=S.uniforms,N=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let y=0,A=b.length;y<A;y++){const I=b[y];if(Array.isArray(I))for(let C=0,P=I.length;C<P;C++)m(I[C],y,C,N);else m(I,y,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,E,b,N){if(M(S,E,b,N)===!0){const y=S.__offset,A=S.value;if(Array.isArray(A)){let I=0;for(let C=0;C<A.length;C++){const P=A[C],F=p(P);x(P,S.__data,I),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(I+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,S.__data)}}function x(S,E,b){typeof S=="number"||typeof S=="boolean"?E[0]=S:S.isMatrix3?(E[0]=S.elements[0],E[1]=S.elements[1],E[2]=S.elements[2],E[3]=0,E[4]=S.elements[3],E[5]=S.elements[4],E[6]=S.elements[5],E[7]=0,E[8]=S.elements[6],E[9]=S.elements[7],E[10]=S.elements[8],E[11]=0):ArrayBuffer.isView(S)?E.set(new S.constructor(S.buffer,S.byteOffset,E.length)):S.toArray(E,b)}function M(S,E,b,N){const y=S.value,A=E+"_"+b;if(N[A]===void 0)return typeof y=="number"||typeof y=="boolean"?N[A]=y:ArrayBuffer.isView(y)?N[A]=y.slice():N[A]=y.clone(),!0;{const I=N[A];if(typeof y=="number"||typeof y=="boolean"){if(I!==y)return N[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(I.equals(y)===!1)return I.copy(y),!0}}return!1}function g(S){const E=S.uniforms;let b=0;const N=16;for(let A=0,I=E.length;A<I;A++){const C=Array.isArray(E[A])?E[A]:[E[A]];for(let P=0,F=C.length;P<F;P++){const O=C[P],H=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,$=H.length;Y<$;Y++){const ne=H[Y],Q=p(ne),ie=b%N,pe=ie%Q.boundary,fe=ie+pe;b+=pe,fe!==0&&N-fe<Q.storage&&(b+=N-fe),O.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=b,b+=Q.storage}}}const y=b%N;return y>0&&(b+=N-y),S.__size=b,S.__cache={},this}function p(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(E.boundary=16,E.storage=S.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",S),E}function v(S){const E=S.target;E.removeEventListener("dispose",v);const b=o.indexOf(E.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function w(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:d,dispose:w}}const hM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function fM(){return ln===null&&(ln=new i0(hM,16,16,gi,In),ln.name="DFG_LUT",ln.minFilter=Dt,ln.magFilter=Dt,ln.wrapS=An,ln.wrapT=An,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class Lu{constructor(e={}){const{canvas:t=Um(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=$t}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;const M=m,g=new Set([ec,Qo,Jo]),p=new Set([$t,xn,fs,ps,Ko,Zo]),v=new Uint32Array(4),w=new Int32Array(4),S=new J;let E=null,b=null;const N=[],y=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let C=!1,P=null,F=null,O=null,H=null;this._outputColorSpace=Yt;let Y=0,$=0,ne=null,Q=-1,ie=null;const pe=new ft,fe=new ft;let Re=null;const ge=new Xe(0);let Ae=0,ae=t.width,j=t.height,Z=1,Me=null,Ie=null;const Ne=new ft(0,0,ae,j),qe=new ft(0,0,ae,j);let Ge=!1;const Je=new sc;let $e=!1,Ve=!1;const dt=new pt,ht=new J,mt=new ft,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function q(){return ne===null?Z:1}let L=i;function oe(R,X){return t.getContext(R,X)}try{const R={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qo}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",sn,!1),L===null){const X="webgl2";if(L=oe(X,R),L===null)throw oe(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw et("WebGLRenderer: "+R.message),R}let ce,T,_,D,U,k,K,G,B,V,re,he,de,le,ve,Se,Ue,W,_e,ue,xe,Ee,me;function De(){ce=new f_(L),ce.init(),xe=new sM(L,ce),T=new r_(L,ce,e,xe),_=new nM(L,ce),T.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),F=L.createFramebuffer(),O=L.createFramebuffer(),H=L.createFramebuffer(),D=new g_(L),U=new Gv,k=new iM(L,ce,_,U,T,xe,D),K=new h_(I),G=new M0(L),Ee=new i_(L,G),B=new p_(L,G,D,Ee),V=new __(L,B,G,Ee,D),W=new x_(L,T,k),ve=new a_(U),re=new jv(I,K,ce,T,Ee,ve),he=new dM(I,U),de=new Vv,le=new Kv(ce),Ue=new n_(I,K,_,V,x,l),Se=new tM(I,V,T),me=new uM(L,D,T,_),_e=new s_(L,ce,D),ue=new m_(L,ce,D),D.programs=re.programs,I.capabilities=T,I.extensions=ce,I.properties=U,I.renderLists=de,I.shadowMap=Se,I.state=_,I.info=D}De(),M!==$t&&(A=new M_(M,t.width,t.height,c,s,r));const Pe=new cM(I,L);this.xr=Pe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const R=ce.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ce.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(R){R!==void 0&&(Z=R,this.setSize(ae,j,!1))},this.getSize=function(R){return R.set(ae,j)},this.setSize=function(R,X,se=!0){if(Pe.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=R,j=X,t.width=Math.floor(R*Z),t.height=Math.floor(X*Z),se===!0&&(t.style.width=R+"px",t.style.height=X+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(ae*Z,j*Z).floor()},this.setDrawingBufferSize=function(R,X,se){ae=R,j=X,Z=se,t.width=Math.floor(R*se),t.height=Math.floor(X*se),this.setViewport(0,0,R,X)},this.setEffects=function(R){if(M===$t){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let X=0;X<R.length;X++)if(R[X].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(pe)},this.getViewport=function(R){return R.copy(Ne)},this.setViewport=function(R,X,se,ee){R.isVector4?Ne.set(R.x,R.y,R.z,R.w):Ne.set(R,X,se,ee),_.viewport(pe.copy(Ne).multiplyScalar(Z).round())},this.getScissor=function(R){return R.copy(qe)},this.setScissor=function(R,X,se,ee){R.isVector4?qe.set(R.x,R.y,R.z,R.w):qe.set(R,X,se,ee),_.scissor(fe.copy(qe).multiplyScalar(Z).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(R){_.setScissorTest(Ge=R)},this.setOpaqueSort=function(R){Me=R},this.setTransparentSort=function(R){Ie=R},this.getClearColor=function(R){return R.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(R=!0,X=!0,se=!0){let ee=0;if(R){let te=!1;if(ne!==null){const we=ne.texture.format;te=g.has(we)}if(te){const we=ne.texture.type,Ce=p.has(we),be=Ue.getClearColor(),Le=Ue.getClearAlpha(),Fe=be.r,ze=be.g,We=be.b;Ce?(v[0]=Fe,v[1]=ze,v[2]=We,v[3]=Le,L.clearBufferuiv(L.COLOR,0,v)):(w[0]=Fe,w[1]=ze,w[2]=We,w[3]=Le,L.clearBufferiv(L.COLOR,0,w))}else ee|=L.COLOR_BUFFER_BIT}X&&(ee|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(ee|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&L.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),P=R},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),Ue.dispose(),de.dispose(),le.dispose(),U.dispose(),K.dispose(),V.dispose(),Ee.dispose(),me.dispose(),re.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",vc),Pe.removeEventListener("sessionend",Mc),Kn.stop()};function gt(R){R.preventDefault(),nl("WebGLRenderer: Context Lost."),C=!0}function ct(){nl("WebGLRenderer: Context Restored."),C=!1;const R=D.autoReset,X=Se.enabled,se=Se.autoUpdate,ee=Se.needsUpdate,te=Se.type;De(),D.autoReset=R,Se.enabled=X,Se.autoUpdate=se,Se.needsUpdate=ee,Se.type=te}function sn(R){et("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function rn(R){const X=R.target;X.removeEventListener("dispose",rn),Ju(X)}function Ju(R){Qu(R),U.remove(R)}function Qu(R){const X=U.get(R).programs;X!==void 0&&(X.forEach(function(se){re.releaseProgram(se)}),R.isShaderMaterial&&re.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,se,ee,te,we){X===null&&(X=Mt);const Ce=te.isMesh&&te.matrixWorld.determinantAffine()<0,be=nh(R,X,se,ee,te);_.setMaterial(ee,Ce);let Le=se.index,Fe=1;if(ee.wireframe===!0){if(Le=B.getWireframeAttribute(se),Le===void 0)return;Fe=2}const ze=se.drawRange,We=se.attributes.position;let Oe=ze.start*Fe,st=(ze.start+ze.count)*Fe;we!==null&&(Oe=Math.max(Oe,we.start*Fe),st=Math.min(st,(we.start+we.count)*Fe)),Le!==null?(Oe=Math.max(Oe,0),st=Math.min(st,Le.count)):We!=null&&(Oe=Math.max(Oe,0),st=Math.min(st,We.count));const yt=st-Oe;if(yt<0||yt===1/0)return;Ee.setup(te,ee,be,se,Le);let xt,rt=_e;if(Le!==null&&(xt=G.get(Le),rt=ue,rt.setIndex(xt)),te.isMesh)ee.wireframe===!0?(_.setLineWidth(ee.wireframeLinewidth*q()),rt.setMode(L.LINES)):rt.setMode(L.TRIANGLES);else if(te.isLine){let Pt=ee.linewidth;Pt===void 0&&(Pt=1),_.setLineWidth(Pt*q()),te.isLineSegments?rt.setMode(L.LINES):te.isLineLoop?rt.setMode(L.LINE_LOOP):rt.setMode(L.LINE_STRIP)}else te.isPoints?rt.setMode(L.POINTS):te.isSprite&&rt.setMode(L.TRIANGLES);if(te.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))rt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const Pt=te._multiDrawStarts,Te=te._multiDrawCounts,Ht=te._multiDrawCount,Qe=Le?G.get(Le).bytesPerElement:1,Xt=U.get(ee).currentProgram.getUniforms();for(let an=0;an<Ht;an++)Xt.setValue(L,"_gl_DrawID",an),rt.render(Pt[an]/Qe,Te[an])}else if(te.isInstancedMesh)rt.renderInstances(Oe,yt,te.count);else if(se.isInstancedBufferGeometry){const Pt=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Te=Math.min(se.instanceCount,Pt);rt.renderInstances(Oe,yt,Te)}else rt.render(Oe,yt)};function _c(R,X,se){R.transparent===!0&&R.side===En&&R.forceSinglePass===!1?(R.side=Gt,R.needsUpdate=!0,Ms(R,X,se),R.side=qn,R.needsUpdate=!0,Ms(R,X,se),R.side=En):Ms(R,X,se)}this.compile=function(R,X,se=null){se===null&&(se=R),b=le.get(se),b.init(X),y.push(b),se.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(b.pushLight(te),te.castShadow&&b.pushShadow(te))}),R!==se&&R.traverseVisible(function(te){te.isLight&&te.layers.test(X.layers)&&(b.pushLight(te),te.castShadow&&b.pushShadow(te))}),b.setupLights();const ee=new Set;return R.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const we=te.material;if(we)if(Array.isArray(we))for(let Ce=0;Ce<we.length;Ce++){const be=we[Ce];_c(be,se,te),ee.add(be)}else _c(we,se,te),ee.add(we)}),b=y.pop(),ee},this.compileAsync=function(R,X,se=null){const ee=this.compile(R,X,se);return new Promise(te=>{function we(){if(ee.forEach(function(Ce){U.get(Ce).currentProgram.isReady()&&ee.delete(Ce)}),ee.size===0){te(R);return}setTimeout(we,10)}ce.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Lr=null;function eh(R){Lr&&Lr(R)}function vc(){Kn.stop()}function Mc(){Kn.start()}const Kn=new wu;Kn.setAnimationLoop(eh),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(R){Lr=R,Pe.setAnimationLoop(R),R===null?Kn.stop():Kn.start()},Pe.addEventListener("sessionstart",vc),Pe.addEventListener("sessionend",Mc),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;P!==null&&P.renderStart(R,X);const se=Pe.enabled===!0&&Pe.isPresenting===!0,ee=A!==null&&(ne===null||se)&&A.begin(I,ne);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(X),X=Pe.getCamera()),R.isScene===!0&&R.onBeforeRender(I,R,X,ne),b=le.get(R,y.length),b.init(X),b.state.textureUnits=k.getTextureUnits(),y.push(b),dt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Je.setFromProjectionMatrix(dt,fn,X.reversedDepth),Ve=this.localClippingEnabled,$e=ve.init(this.clippingPlanes,Ve),E=de.get(R,N.length),E.init(),N.push(E),Pe.enabled===!0&&Pe.isPresenting===!0){const Ce=I.xr.getDepthSensingMesh();Ce!==null&&Ir(Ce,X,-1/0,I.sortObjects)}Ir(R,X,0,I.sortObjects),E.finish(),I.sortObjects===!0&&E.sort(Me,Ie,X.reversedDepth),ot=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,ot&&Ue.addToRenderList(E,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&ve.beginShadows();const te=b.state.shadowsArray;if(Se.render(te,R,X),$e===!0&&ve.endShadows(),(ee&&A.hasRenderPass())===!1){const Ce=E.opaque,be=E.transmissive;if(b.setupLights(),X.isArrayCamera){const Le=X.cameras;if(be.length>0)for(let Fe=0,ze=Le.length;Fe<ze;Fe++){const We=Le[Fe];bc(Ce,be,R,We)}ot&&Ue.render(R);for(let Fe=0,ze=Le.length;Fe<ze;Fe++){const We=Le[Fe];yc(E,R,We,We.viewport)}}else be.length>0&&bc(Ce,be,R,X),ot&&Ue.render(R),yc(E,R,X)}ne!==null&&$===0&&(k.updateMultisampleRenderTarget(ne),k.updateRenderTargetMipmap(ne)),ee&&A.end(I),R.isScene===!0&&R.onAfterRender(I,R,X),Ee.resetDefaultState(),Q=-1,ie=null,y.pop(),y.length>0?(b=y[y.length-1],k.setTextureUnits(b.state.textureUnits),$e===!0&&ve.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,N.pop(),N.length>0?E=N[N.length-1]:E=null,P!==null&&P.renderEnd()};function Ir(R,X,se,ee){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLightProbeGrid)b.pushLightProbeGrid(R);else if(R.isLight)b.pushLight(R),R.castShadow&&b.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Je.intersectsSprite(R)){ee&&mt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(dt);const Ce=V.update(R),be=R.material;be.visible&&E.push(R,Ce,be,se,mt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Je.intersectsObject(R))){const Ce=V.update(R),be=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),mt.copy(R.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),mt.copy(Ce.boundingSphere.center)),mt.applyMatrix4(R.matrixWorld).applyMatrix4(dt)),Array.isArray(be)){const Le=Ce.groups;for(let Fe=0,ze=Le.length;Fe<ze;Fe++){const We=Le[Fe],Oe=be[We.materialIndex];Oe&&Oe.visible&&E.push(R,Ce,Oe,se,mt.z,We)}}else be.visible&&E.push(R,Ce,be,se,mt.z,null)}}const we=R.children;for(let Ce=0,be=we.length;Ce<be;Ce++)Ir(we[Ce],X,se,ee)}function yc(R,X,se,ee){const{opaque:te,transmissive:we,transparent:Ce}=R;b.setupLightsView(se),$e===!0&&ve.setGlobalState(I.clippingPlanes,se),ee&&_.viewport(pe.copy(ee)),te.length>0&&vs(te,X,se),we.length>0&&vs(we,X,se),Ce.length>0&&vs(Ce,X,se),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function bc(R,X,se,ee){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[ee.id]===void 0){const Oe=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[ee.id]=new mn(1,1,{generateMipmaps:!0,type:Oe?In:$t,minFilter:li,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const we=b.state.transmissionRenderTarget[ee.id],Ce=ee.viewport||pe;we.setSize(Ce.z*I.transmissionResolutionScale,Ce.w*I.transmissionResolutionScale);const be=I.getRenderTarget(),Le=I.getActiveCubeFace(),Fe=I.getActiveMipmapLevel();I.setRenderTarget(we),I.getClearColor(ge),Ae=I.getClearAlpha(),Ae<1&&I.setClearColor(16777215,.5),I.clear(),ot&&Ue.render(se);const ze=I.toneMapping;I.toneMapping=pn;const We=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),b.setupLightsView(ee),$e===!0&&ve.setGlobalState(I.clippingPlanes,ee),vs(R,se,ee),k.updateMultisampleRenderTarget(we),k.updateRenderTargetMipmap(we),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let st=0,yt=X.length;st<yt;st++){const xt=X[st],{object:rt,geometry:Pt,material:Te,group:Ht}=xt;if(Te.side===En&&rt.layers.test(ee.layers)){const Qe=Te.side;Te.side=Gt,Te.needsUpdate=!0,Sc(rt,se,ee,Pt,Te,Ht),Te.side=Qe,Te.needsUpdate=!0,Oe=!0}}Oe===!0&&(k.updateMultisampleRenderTarget(we),k.updateRenderTargetMipmap(we))}I.setRenderTarget(be,Le,Fe),I.setClearColor(ge,Ae),We!==void 0&&(ee.viewport=We),I.toneMapping=ze}function vs(R,X,se){const ee=X.isScene===!0?X.overrideMaterial:null;for(let te=0,we=R.length;te<we;te++){const Ce=R[te],{object:be,geometry:Le,group:Fe}=Ce;let ze=Ce.material;ze.allowOverride===!0&&ee!==null&&(ze=ee),be.layers.test(se.layers)&&Sc(be,X,se,Le,ze,Fe)}}function Sc(R,X,se,ee,te,we){R.onBeforeRender(I,X,se,ee,te,we),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),te.onBeforeRender(I,X,se,ee,R,we),te.transparent===!0&&te.side===En&&te.forceSinglePass===!1?(te.side=Gt,te.needsUpdate=!0,I.renderBufferDirect(se,X,ee,te,R,we),te.side=qn,te.needsUpdate=!0,I.renderBufferDirect(se,X,ee,te,R,we),te.side=En):I.renderBufferDirect(se,X,ee,te,R,we),R.onAfterRender(I,X,se,ee,te,we)}function Ms(R,X,se){X.isScene!==!0&&(X=Mt);const ee=U.get(R),te=b.state.lights,we=b.state.shadowsArray,Ce=te.state.version,be=re.getParameters(R,te.state,we,X,se,b.state.lightProbeGridArray),Le=re.getProgramCacheKey(be);let Fe=ee.programs;ee.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?X.environment:null,ee.fog=X.fog;const ze=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ee.envMap=K.get(R.envMap||ee.environment,ze),ee.envMapRotation=ee.environment!==null&&R.envMap===null?X.environmentRotation:R.envMapRotation,Fe===void 0&&(R.addEventListener("dispose",rn),Fe=new Map,ee.programs=Fe);let We=Fe.get(Le);if(We!==void 0){if(ee.currentProgram===We&&ee.lightsStateVersion===Ce)return Ec(R,be),We}else be.uniforms=re.getUniforms(R),P!==null&&R.isNodeMaterial&&P.build(R,se,be),R.onBeforeCompile(be,I),We=re.acquireProgram(be,Le),Fe.set(Le,We),ee.uniforms=be.uniforms;const Oe=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Oe.clippingPlanes=ve.uniform),Ec(R,be),ee.needsLights=sh(R),ee.lightsStateVersion=Ce,ee.needsLights&&(Oe.ambientLightColor.value=te.state.ambient,Oe.lightProbe.value=te.state.probe,Oe.directionalLights.value=te.state.directional,Oe.directionalLightShadows.value=te.state.directionalShadow,Oe.spotLights.value=te.state.spot,Oe.spotLightShadows.value=te.state.spotShadow,Oe.rectAreaLights.value=te.state.rectArea,Oe.ltc_1.value=te.state.rectAreaLTC1,Oe.ltc_2.value=te.state.rectAreaLTC2,Oe.pointLights.value=te.state.point,Oe.pointLightShadows.value=te.state.pointShadow,Oe.hemisphereLights.value=te.state.hemi,Oe.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Oe.spotLightMatrix.value=te.state.spotLightMatrix,Oe.spotLightMap.value=te.state.spotLightMap,Oe.pointShadowMatrix.value=te.state.pointShadowMatrix),ee.lightProbeGrid=b.state.lightProbeGridArray.length>0,ee.currentProgram=We,ee.uniformsList=null,We}function wc(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=lr.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Ec(R,X){const se=U.get(R);se.outputColorSpace=X.outputColorSpace,se.batching=X.batching,se.batchingColor=X.batchingColor,se.instancing=X.instancing,se.instancingColor=X.instancingColor,se.instancingMorph=X.instancingMorph,se.skinning=X.skinning,se.morphTargets=X.morphTargets,se.morphNormals=X.morphNormals,se.morphColors=X.morphColors,se.morphTargetsCount=X.morphTargetsCount,se.numClippingPlanes=X.numClippingPlanes,se.numIntersection=X.numClipIntersection,se.vertexAlphas=X.vertexAlphas,se.vertexTangents=X.vertexTangents,se.toneMapping=X.toneMapping}function th(R,X){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;S.setFromMatrixPosition(X.matrixWorld);for(let se=0,ee=R.length;se<ee;se++){const te=R[se];if(te.texture!==null&&te.boundingBox.containsPoint(S))return te}return null}function nh(R,X,se,ee,te){X.isScene!==!0&&(X=Mt),k.resetTextureUnits();const we=X.fog,Ce=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?X.environment:null,be=ne===null?I.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ye.workingColorSpace,Le=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,Fe=K.get(ee.envMap||Ce,Le),ze=ee.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,We=!!se.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Oe=!!se.morphAttributes.position,st=!!se.morphAttributes.normal,yt=!!se.morphAttributes.color;let xt=pn;ee.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(xt=I.toneMapping);const rt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Pt=rt!==void 0?rt.length:0,Te=U.get(ee),Ht=b.state.lights;if($e===!0&&(Ve===!0||R!==ie)){const lt=R===ie&&ee.id===Q;ve.setState(ee,R,lt)}let Qe=!1;ee.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Ht.state.version||Te.outputColorSpace!==be||te.isBatchedMesh&&Te.batching===!1||!te.isBatchedMesh&&Te.batching===!0||te.isBatchedMesh&&Te.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Te.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Te.instancing===!1||!te.isInstancedMesh&&Te.instancing===!0||te.isSkinnedMesh&&Te.skinning===!1||!te.isSkinnedMesh&&Te.skinning===!0||te.isInstancedMesh&&Te.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Te.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Te.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Te.instancingMorph===!1&&te.morphTexture!==null||Te.envMap!==Fe||ee.fog===!0&&Te.fog!==we||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ve.numPlanes||Te.numIntersection!==ve.numIntersection)||Te.vertexAlphas!==ze||Te.vertexTangents!==We||Te.morphTargets!==Oe||Te.morphNormals!==st||Te.morphColors!==yt||Te.toneMapping!==xt||Te.morphTargetsCount!==Pt||!!Te.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,Te.__version=ee.version);let Xt=Te.currentProgram;Qe===!0&&(Xt=Ms(ee,X,te),P&&ee.isNodeMaterial&&P.onUpdateProgram(ee,Xt,Te));let an=!1,Fn=!1,vi=!1;const at=Xt.getUniforms(),bt=Te.uniforms;if(_.useProgram(Xt.program)&&(an=!0,Fn=!0,vi=!0),ee.id!==Q&&(Q=ee.id,Fn=!0),Te.needsLights){const lt=th(b.state.lightProbeGridArray,te);Te.lightProbeGrid!==lt&&(Te.lightProbeGrid=lt,Fn=!0)}if(an||ie!==R){_.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),at.setValue(L,"projectionMatrix",R.projectionMatrix),at.setValue(L,"viewMatrix",R.matrixWorldInverse);const Bn=at.map.cameraPosition;Bn!==void 0&&Bn.setValue(L,ht.setFromMatrixPosition(R.matrixWorld)),T.logarithmicDepthBuffer&&at.setValue(L,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&at.setValue(L,"isOrthographic",R.isOrthographicCamera===!0),ie!==R&&(ie=R,Fn=!0,vi=!0)}if(Te.needsLights&&(Ht.state.directionalShadowMap.length>0&&at.setValue(L,"directionalShadowMap",Ht.state.directionalShadowMap,k),Ht.state.spotShadowMap.length>0&&at.setValue(L,"spotShadowMap",Ht.state.spotShadowMap,k),Ht.state.pointShadowMap.length>0&&at.setValue(L,"pointShadowMap",Ht.state.pointShadowMap,k)),te.isSkinnedMesh){at.setOptional(L,te,"bindMatrix"),at.setOptional(L,te,"bindMatrixInverse");const lt=te.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),at.setValue(L,"boneTexture",lt.boneTexture,k))}te.isBatchedMesh&&(at.setOptional(L,te,"batchingTexture"),at.setValue(L,"batchingTexture",te._matricesTexture,k),at.setOptional(L,te,"batchingIdTexture"),at.setValue(L,"batchingIdTexture",te._indirectTexture,k),at.setOptional(L,te,"batchingColorTexture"),te._colorsTexture!==null&&at.setValue(L,"batchingColorTexture",te._colorsTexture,k));const On=se.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&W.update(te,se,Xt),(Fn||Te.receiveShadow!==te.receiveShadow)&&(Te.receiveShadow=te.receiveShadow,at.setValue(L,"receiveShadow",te.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&X.environment!==null&&(bt.envMapIntensity.value=X.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=fM()),Fn){if(at.setValue(L,"toneMappingExposure",I.toneMappingExposure),Te.needsLights&&ih(bt,vi),we&&ee.fog===!0&&he.refreshFogUniforms(bt,we),he.refreshMaterialUniforms(bt,ee,Z,j,b.state.transmissionRenderTarget[R.id]),Te.needsLights&&Te.lightProbeGrid){const lt=Te.lightProbeGrid;bt.probesSH.value=lt.texture,bt.probesMin.value.copy(lt.boundingBox.min),bt.probesMax.value.copy(lt.boundingBox.max),bt.probesResolution.value.copy(lt.resolution)}lr.upload(L,wc(Te),bt,k)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(lr.upload(L,wc(Te),bt,k),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&at.setValue(L,"center",te.center),at.setValue(L,"modelViewMatrix",te.modelViewMatrix),at.setValue(L,"normalMatrix",te.normalMatrix),at.setValue(L,"modelMatrix",te.matrixWorld),ee.uniformsGroups!==void 0){const lt=ee.uniformsGroups;for(let Bn=0,Mi=lt.length;Bn<Mi;Bn++){const Tc=lt[Bn];me.update(Tc,Xt),me.bind(Tc,Xt)}}return Xt}function ih(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function sh(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(R,X,se){const ee=U.get(R);ee.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),U.get(R.texture).__webglTexture=X,U.get(R.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:se,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,X){const se=U.get(R);se.__webglFramebuffer=X,se.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,se=0){ne=R,Y=X,$=se;let ee=null,te=!1,we=!1;if(R){const be=U.get(R);if(be.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,be.__webglFramebuffer),pe.copy(R.viewport),fe.copy(R.scissor),Re=R.scissorTest,_.viewport(pe),_.scissor(fe),_.setScissorTest(Re),Q=-1;return}else if(be.__webglFramebuffer===void 0)k.setupRenderTarget(R);else if(be.__hasExternalTextures)k.rebindTextures(R,U.get(R.texture).__webglTexture,U.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const ze=R.depthTexture;if(be.__boundDepthTexture!==ze){if(ze!==null&&U.has(ze)&&(R.width!==ze.image.width||R.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(R)}}const Le=R.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(we=!0);const Fe=U.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Fe[X])?ee=Fe[X][se]:ee=Fe[X],te=!0):R.samples>0&&k.useMultisampledRTT(R)===!1?ee=U.get(R).__webglMultisampledFramebuffer:Array.isArray(Fe)?ee=Fe[se]:ee=Fe,pe.copy(R.viewport),fe.copy(R.scissor),Re=R.scissorTest}else pe.copy(Ne).multiplyScalar(Z).floor(),fe.copy(qe).multiplyScalar(Z).floor(),Re=Ge;if(se!==0&&(ee=F),_.bindFramebuffer(L.FRAMEBUFFER,ee)&&_.drawBuffers(R,ee),_.viewport(pe),_.scissor(fe),_.setScissorTest(Re),te){const be=U.get(R.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+X,be.__webglTexture,se)}else if(we){const be=X;for(let Le=0;Le<R.textures.length;Le++){const Fe=U.get(R.textures[Le]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Le,Fe.__webglTexture,se,be)}}else if(R!==null&&se!==0){const be=U.get(R.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,se)}Q=-1},this.readRenderTargetPixels=function(R,X,se,ee,te,we,Ce,be=0){if(!(R&&R.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=U.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce]),Le){_.bindFramebuffer(L.FRAMEBUFFER,Le);try{const Fe=R.textures[be],ze=Fe.format,We=Fe.type;if(R.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),!T.textureFormatReadable(ze)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(We)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-ee&&se>=0&&se<=R.height-te&&L.readPixels(X,se,ee,te,xe.convert(ze),xe.convert(We),we)}finally{const Fe=ne!==null?U.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(R,X,se,ee,te,we,Ce,be=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=U.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce]),Le)if(X>=0&&X<=R.width-ee&&se>=0&&se<=R.height-te){_.bindFramebuffer(L.FRAMEBUFFER,Le);const Fe=R.textures[be],ze=Fe.format,We=Fe.type;if(R.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+be),!T.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Oe),L.bufferData(L.PIXEL_PACK_BUFFER,we.byteLength,L.STREAM_READ),L.readPixels(X,se,ee,te,xe.convert(ze),xe.convert(We),0);const st=ne!==null?U.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,st);const yt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Fm(L,yt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Oe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,we),L.deleteBuffer(Oe),L.deleteSync(yt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,X=null,se=0){const ee=Math.pow(2,-se),te=Math.floor(R.image.width*ee),we=Math.floor(R.image.height*ee),Ce=X!==null?X.x:0,be=X!==null?X.y:0;k.setTexture2D(R,0),L.copyTexSubImage2D(L.TEXTURE_2D,se,0,0,Ce,be,te,we),_.unbindTexture()},this.copyTextureToTexture=function(R,X,se=null,ee=null,te=0,we=0){let Ce,be,Le,Fe,ze,We,Oe,st,yt;const xt=R.isCompressedTexture?R.mipmaps[we]:R.image;if(se!==null)Ce=se.max.x-se.min.x,be=se.max.y-se.min.y,Le=se.isBox3?se.max.z-se.min.z:1,Fe=se.min.x,ze=se.min.y,We=se.isBox3?se.min.z:0;else{const bt=Math.pow(2,-te);Ce=Math.floor(xt.width*bt),be=Math.floor(xt.height*bt),R.isDataArrayTexture?Le=xt.depth:R.isData3DTexture?Le=Math.floor(xt.depth*bt):Le=1,Fe=0,ze=0,We=0}ee!==null?(Oe=ee.x,st=ee.y,yt=ee.z):(Oe=0,st=0,yt=0);const rt=xe.convert(X.format),Pt=xe.convert(X.type);let Te;X.isData3DTexture?(k.setTexture3D(X,0),Te=L.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(k.setTexture2DArray(X,0),Te=L.TEXTURE_2D_ARRAY):(k.setTexture2D(X,0),Te=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,X.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,X.unpackAlignment);const Ht=_.getParameter(L.UNPACK_ROW_LENGTH),Qe=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Xt=_.getParameter(L.UNPACK_SKIP_PIXELS),an=_.getParameter(L.UNPACK_SKIP_ROWS),Fn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Fe),_.pixelStorei(L.UNPACK_SKIP_ROWS,ze),_.pixelStorei(L.UNPACK_SKIP_IMAGES,We);const vi=R.isDataArrayTexture||R.isData3DTexture,at=X.isDataArrayTexture||X.isData3DTexture;if(R.isDepthTexture){const bt=U.get(R),On=U.get(X),lt=U.get(bt.__renderTarget),Bn=U.get(On.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,lt.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let Mi=0;Mi<Le;Mi++)vi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,U.get(R).__webglTexture,te,We+Mi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,U.get(X).__webglTexture,we,yt+Mi)),L.blitFramebuffer(Fe,ze,Ce,be,Oe,st,Ce,be,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(te!==0||R.isRenderTargetTexture||U.has(R)){const bt=U.get(R),On=U.get(X);_.bindFramebuffer(L.READ_FRAMEBUFFER,O),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,H);for(let lt=0;lt<Le;lt++)vi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,bt.__webglTexture,te,We+lt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bt.__webglTexture,te),at?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,On.__webglTexture,we,yt+lt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,On.__webglTexture,we),te!==0?L.blitFramebuffer(Fe,ze,Ce,be,Oe,st,Ce,be,L.COLOR_BUFFER_BIT,L.NEAREST):at?L.copyTexSubImage3D(Te,we,Oe,st,yt+lt,Fe,ze,Ce,be):L.copyTexSubImage2D(Te,we,Oe,st,Fe,ze,Ce,be);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else at?R.isDataTexture||R.isData3DTexture?L.texSubImage3D(Te,we,Oe,st,yt,Ce,be,Le,rt,Pt,xt.data):X.isCompressedArrayTexture?L.compressedTexSubImage3D(Te,we,Oe,st,yt,Ce,be,Le,rt,xt.data):L.texSubImage3D(Te,we,Oe,st,yt,Ce,be,Le,rt,Pt,xt):R.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,we,Oe,st,Ce,be,rt,Pt,xt.data):R.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,we,Oe,st,xt.width,xt.height,rt,xt.data):L.texSubImage2D(L.TEXTURE_2D,we,Oe,st,Ce,be,rt,Pt,xt);_.pixelStorei(L.UNPACK_ROW_LENGTH,Ht),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Xt),_.pixelStorei(L.UNPACK_SKIP_ROWS,an),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Fn),we===0&&X.generateMipmaps&&L.generateMipmap(Te),_.unbindTexture()},this.initRenderTarget=function(R){U.get(R).__webglFramebuffer===void 0&&k.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?k.setTextureCube(R,0):R.isData3DTexture?k.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?k.setTexture2DArray(R,0):k.setTexture2D(R,0),_.unbindTexture()},this.resetState=function(){Y=0,$=0,ne=null,_.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Zs=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],Iu=620,pM=560,mM=300,gM=2800,Yl=850,Kl=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Zl=210,Ta=300,Jl=.42,Ql=740,Js=n=>-(n+1)*Iu,xM=n=>n===1?1:1-Math.pow(2,-10*n),Aa=n=>new Promise(e=>setTimeout(e,n)),ed=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function td(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${ed[t%ed.length]}`)}function _M({onDone:n}){const e=z.useRef(null),t=z.useRef(null),i=z.useRef(null),s=z.useRef(null),r=z.useRef(null),o=z.useRef(null),c=z.useRef(null),l=z.useRef(null),d=z.useRef(null),u=z.useRef(null),f=z.useRef(n);f.current=n,Sd();const h=z.useMemo(()=>td(16),[]),m=z.useMemo(()=>td(16),[]);return z.useEffect(()=>{let x=!1,M=!1;const g=()=>{M||(M=!0,f.current())};let p=null;function v(){if(!p)try{const q=window.AudioContext??window.webkitAudioContext;p=new q}catch{}return p}function w(){const q=v();if(!q)return;q.state==="suspended"&&q.resume();const L=q.currentTime,oe=q.createOscillator();oe.type="sine",oe.frequency.setValueAtTime(130,L),oe.frequency.exponentialRampToValueAtTime(42,L+.16);const ce=q.createGain();ce.gain.setValueAtTime(1,L),ce.gain.exponentialRampToValueAtTime(.001,L+.38),oe.connect(ce).connect(q.destination),oe.start(L),oe.stop(L+.42);const T=Math.floor(q.sampleRate*.14),_=q.createBuffer(1,T,q.sampleRate),D=_.getChannelData(0);for(let G=0;G<T;G++)D[G]=(Math.random()*2-1)*Math.pow(1-G/T,2.2);const U=q.createBufferSource();U.buffer=_;const k=q.createBiquadFilter();k.type="lowpass",k.frequency.value=850;const K=q.createGain();K.gain.setValueAtTime(.55,L),K.gain.exponentialRampToValueAtTime(.001,L+.13),U.connect(k).connect(K).connect(q.destination),U.start(L)}function S(){const q=i.current;q&&(q.currentTime=0,q.play().catch(()=>{}))}const E=t.current,b=(E==null?void 0:E.getContext("2d"))??null;let N=[],y=0;function A(){E&&(E.width=window.innerWidth,E.height=window.innerHeight)}A();function I(q,L){N=[];let oe=0;const ce=6;function T(D,U,k,K,G,B){const V=3+Math.floor(Math.random()*3),re=[[D,U]];let he=k,de=D,le=U;for(let ve=0;ve<V;ve++){he+=(Math.random()-.5)*.6;const Se=K/V;if(de+=Math.cos(he)*Se,le+=Math.sin(he)*Se,re.push([de,le]),G>0&&Math.random()<.5){const Ue=he+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);T(de,le,Ue,K*(.35+Math.random()*.3),G-1,B*.78)}}N.push({pts:re,color:Kl[oe++%Kl.length],width:B})}const _=[L*(.06+Math.random()*.1),L*(.84+Math.random()*.1)];for(let D=0;D<ce;D++){const U=q*(.15+Math.random()*.7),k=D<_.length?_[D]:L*(.1+Math.random()*.8),K=9+Math.floor(Math.random()*6);for(let G=0;G<K;G++){const B=G/K*Math.PI*2+(Math.random()-.5)*.4,V=Math.max(q,L)*(.18+Math.random()*.38);T(U,k,B,V,2,.9)}}}function C(q){if(!b||q<=0)return;const L=Math.min(1,q/2.4),oe=Math.round(N.length*L);for(let ce=0;ce<oe;ce++){const T=N[ce];b.lineWidth=T.width*(.9+q*.1),b.strokeStyle=T.color,b.globalAlpha=.75+q*.1,b.shadowColor=T.color,b.shadowBlur=5+q*2.2,b.beginPath(),T.pts.forEach(([_,D],U)=>U===0?b.moveTo(_,D):b.lineTo(_,D)),b.stroke()}b.globalAlpha=1,b.shadowBlur=0}function P(q,L,oe){b&&(b.clearRect(0,0,L,oe),C(q))}function F(){const q=d.current;q&&(q.classList.remove("intro-hit"),q.offsetWidth,q.classList.add("intro-hit"))}function O(){var L,oe,ce,T;const q=(L=r.current)==null?void 0:L.firstElementChild;q&&(q.classList.remove("intro-rgbslam"),q.offsetWidth,q.classList.add("intro-rgbslam")),(oe=r.current)==null||oe.classList.remove("intro-jitter"),(ce=r.current)==null||ce.offsetWidth,(T=r.current)==null||T.classList.add("intro-jitter"),F(),$e()}async function H(){for(let q=5;q>=1&&!x;q--){const L=r.current;if(!L)return;L.innerHTML="";const oe=document.createElement("div");oe.className="intro-glyph",oe.setAttribute("data-t",String(q)),oe.textContent=String(q),L.appendChild(oe),O(),w(),await oe.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Yl*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Aa(Yl*.3)}}let Y=null,$=null,ne=null,Q=0,ie=!1,pe=-1;const Re=document.createElement("canvas").getContext("2d");Re.font=`700 ${Zl}px "Rajdhani", sans-serif`;const ge=[],Ae=[];function ae(q,L){const oe=Math.ceil(Re.measureText(q).width),ce=Math.max(200,oe+120),T=document.createElement("canvas");T.width=ce,T.height=Ta;const _=T.getContext("2d");_.font=`700 ${Zl}px "Rajdhani", sans-serif`,_.textAlign="center",_.textBaseline="middle",_.shadowColor=L,_.shadowBlur=56,_.fillStyle="#d24e01",_.fillText(q,ce/2,Ta/2);const D=new xu(T);D.anisotropy=4;let U=ce*Jl,k=Ta*Jl;if(U>Ql){const K=Ql/U;U*=K,k*=K}return{tex:D,worldW:U,worldH:k}}function j(q,L,oe){const{tex:ce,worldW:T,worldH:_}=ae(q,oe),D=new Ki(T,_),U=new Xn({map:ce,transparent:!0,depthWrite:!1,opacity:0}),k=new ut(D,U);k.position.set(0,10,L),k.visible=!1,$.add(k);const K=new ut(D,new Xn({map:ce,transparent:!0,depthWrite:!1,blending:pi,color:2875596,opacity:0})),G=new ut(D,new Xn({map:ce,transparent:!0,depthWrite:!1,blending:pi,color:10116351,opacity:0}));return K.position.copy(k.position),G.position.copy(k.position),K.visible=!1,G.visible=!1,$.add(K),$.add(G),Ae.push(D,U,ce,K.material,G.material),{mesh:k,ghostCy:K,ghostMg:G}}const Z={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Me,Ie;function Ne(){const q=e.current;if(!q)return;Y=new Lu({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),Y.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),$=new hu,$.fog=new Ar(263946,.0011),ne=new jt(62,window.innerWidth/window.innerHeight,1,6e3),ne.position.set(0,0,40),$.add(new Su(928300,1.1));const L=Iu*Zs.length+500,oe=900,ce=new Ft,T=new Float32Array(oe*3),_=new Float32Array(oe*3),D=[2875596,15357964,15357964,10116351];for(let G=0;G<oe;G++){const B=60+Math.random()*260,V=Math.random()*Math.PI*2;T[G*3]=Math.cos(V)*B,T[G*3+1]=Math.sin(V)*B,T[G*3+2]=-Math.random()*L;const re=new Xe(D[G%D.length]);_[G*3]=re.r,_[G*3+1]=re.g,_[G*3+2]=re.b}ce.setAttribute("position",new kt(T,3)),ce.setAttribute("color",new kt(_,3));const U=new Rr({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});$.add(new rc(ce,U)),Ae.push(ce,U),Zs.forEach((G,B)=>{const V=Js(B),re="#"+G.light.toString(16).padStart(6,"0");ge.push(j(G.text,V,re));const he=new hi(G.light,2.4,900,2);he.position.set(0,40,V+60),$.add(he)}),Me=new hi(15357964,4,550,2),Ie=new hi(10116351,2.6,550,2),$.add(Me),$.add(Ie),ie=!0,qe();const k=Math.random()*1e3;Z.camZ=0;function K(G){if(!Y||!$||!ne)return;{const he=Math.sin(G*.0016+k)*1.1+Math.sin(G*.0043)*.5,de=Math.cos(G*.002+k)*.9+Math.cos(G*.0038)*.45;ne.position.x=he+Z.camX,ne.position.y=de+6}ne.position.z=Z.camZ+Z.warpKick;const B=Z.yawKick,V=ne.position.x+Math.sin(B)*640;ne.lookAt(V,ne.position.y-4,Z.focusZ),ne.rotateZ(-B*.5);const re=62+Z.fovKick*14;ne.fov!==re&&(ne.fov=re,ne.updateProjectionMatrix()),Me.position.set(Math.sin(G*6e-4)*80,30,Z.camZ-120),Ie.position.set(Math.cos(G*7e-4)*80,-10,Z.camZ-200),ge.forEach(he=>{he.mesh.visible&&he.mesh.quaternion.copy(ne.quaternion),he.ghostCy.visible&&he.ghostCy.quaternion.copy(ne.quaternion),he.ghostMg.visible&&he.ghostMg.quaternion.copy(ne.quaternion)}),Y.render($,ne),Q=requestAnimationFrame(K)}Q=requestAnimationFrame(K)}function qe(){!ie||!Y||!ne||(Y.setSize(window.innerWidth,window.innerHeight),ne.aspect=window.innerWidth/window.innerHeight,ne.updateProjectionMatrix())}function Ge(){qe(),A(),I(window.innerWidth,window.innerHeight),P(y,window.innerWidth,window.innerHeight)}window.addEventListener("resize",Ge,{passive:!0});function Je(q,L=650){const oe=pe;pe=q;const ce=ge[q];if(!ce)return;ce.mesh.visible=!0,ce.mesh.material.opacity=0;const T=oe>=0?ge[oe]:null,_=performance.now();function D(){const U=Math.min(1,(performance.now()-_)/L);ce.mesh.material.opacity=U,T&&(T.mesh.material.opacity=1-U),U<1?requestAnimationFrame(D):T&&(T.mesh.visible=!1)}D()}function $e(){if(pe<0)return;const q=ge[pe];if(!q)return;const L=16+Math.random()*14;q.ghostCy.visible=!0,q.ghostCy.material.opacity=.6,q.ghostCy.position.x=-L,q.ghostMg.visible=!0,q.ghostMg.material.opacity=.6,q.ghostMg.position.x=L,setTimeout(()=>{q.ghostCy.material.opacity=0,q.ghostCy.visible=!1,q.ghostCy.position.x=0,q.ghostMg.material.opacity=0,q.ghostMg.visible=!1,q.ghostMg.position.x=0},140+Math.random()*100)}async function Ve(q,L,oe,ce,T){const _=Z.camZ,D=Z.camX,U=performance.now();return Z.warpKick=(Math.random()-.5)*34,Z.yawKick=T*ce,Z.fovKick=1,new Promise(k=>{function K(G){const B=Math.min(1,(G-U)/oe),V=xM(B);Z.camZ=_+(q-_)*V,Z.camX=D+(L-D)*V,Z.warpKick*=.92,Z.yawKick*=.975,Z.fovKick*=.965,B<1?requestAnimationFrame(K):k()}requestAnimationFrame(K)})}function dt(q=1,L=420){if(!ie||!b||!e.current)return;const oe=window.innerWidth,ce=window.innerHeight,T=performance.now()+L;function _(){if(performance.now()>T){P(y,oe,ce);return}b.clearRect(0,0,oe,ce),C(y);const U=5+Math.floor(Math.random()*8*q);for(let K=0;K<U;K++){const G=Math.random()*ce,B=4+Math.random()*52*q,V=(Math.random()-.5)*130*q;try{b.drawImage(e.current,0,G,oe,B,V,G,oe,B)}catch{}}const k=Math.round(6*q);b.globalCompositeOperation="screen";for(let K=0;K<k;K++){const G=Math.random()*ce;b.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],b.globalAlpha=.35+Math.random()*.35,b.lineWidth=.6+Math.random()*1.6,b.beginPath(),b.moveTo(0,G),b.lineTo(oe,G),b.stroke()}if(b.globalCompositeOperation="source-over",b.globalAlpha=1,Math.random()<q*.12){b.globalAlpha=.5;for(let K=0;K<220;K++)b.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",b.fillRect(Math.random()*oe,Math.random()*ce,2,2);b.globalAlpha=1}requestAnimationFrame(_)}_()}function ht(q=1,L=340){if(!ie||!b)return;const oe=window.innerWidth,ce=window.innerHeight,T=oe/2,_=ce/2,D=12+Math.floor(10*q),U=Array.from({length:D},()=>Math.random()*Math.PI*2),k=performance.now();function K(){const B=(performance.now()-k)/L;if(B>=1){P(y,oe,ce);return}b.save(),b.globalCompositeOperation="screen",U.forEach(V=>{const re=30+B*300,he=re+90+Math.random()*150,de=T+Math.cos(V)*re,le=_+Math.sin(V)*re,ve=T+Math.cos(V)*he,Se=_+Math.sin(V)*he;b.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",b.globalAlpha=(1-B)*(.28+Math.random()*.32)*q,b.lineWidth=1.2+Math.random()*1.8,b.beginPath(),b.moveTo(de,le),b.lineTo(ve,Se),b.stroke()}),b.restore(),requestAnimationFrame(K)}K()}async function mt(q=900){const L=window.innerWidth,oe=window.innerHeight;if(!b)return;const ce=performance.now(),T=N.map(()=>Math.random()*.25);await new Promise(_=>{function D(){const U=Math.min(1,(performance.now()-ce)/q);b.clearRect(0,0,L,oe),N.forEach((k,K)=>{const G=Math.min(1,Math.max(0,(U-T[K])/(1-T[K])));if(G<=0)return;const B=k.pts,V=B.length-1,re=G*V;b.lineWidth=k.width*(1+U*.4),b.strokeStyle=k.color,b.globalAlpha=.65+U*.3,b.shadowColor=k.color,b.shadowBlur=3+U*5,b.beginPath(),b.moveTo(B[0][0],B[0][1]);for(let le=0;le<Math.floor(re);le++)b.lineTo(B[le+1][0],B[le+1][1]);const he=Math.floor(re),de=re-he;if(he<V&&de>0){const[le,ve]=B[he],[Se,Ue]=B[he+1];b.lineTo(le+(Se-le)*de,ve+(Ue-ve)*de)}b.stroke()}),b.globalAlpha=1,b.shadowBlur=0,U<1?requestAnimationFrame(D):_()}D()})}async function Mt(){var G;F(),(G=r.current)==null||G.classList.add("intro-jitter");const q=u.current;if(!q)return;q.innerHTML="";const L=window.innerWidth,oe=window.innerHeight,ce=11,T=8,_=L/ce,D=oe/T,U=L/2,k=oe/2,K=[];for(let B=0;B<T;B++)for(let V=0;V<ce;V++){const re=V*_,he=B*D,de=()=>(Math.random()-.5)*16,le=document.createElement("div");le.className="intro-shard",le.style.left=re+"px",le.style.top=he+"px",le.style.width=_+2+"px",le.style.height=D+2+"px",le.style.clipPath=`polygon(${de()}px ${de()}px, ${_+de()}px ${de()}px, ${_+de()}px ${D+de()}px, ${de()}px ${D+de()}px)`,q.appendChild(le);const ve=re+_/2-U,Se=he+D/2-k,Ue=Math.hypot(ve,Se)||1;K.push({div:le,dx:ve/Ue,dy:Se/Ue,delay:Ue/Math.max(L,oe)*220+Math.random()*80})}K.forEach(({div:B,dx:V,dy:re,delay:he})=>{const de=60+Math.random()*140,le=420+Math.random()*420,ve=(Math.random()-.5)*420;B.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${V*de}px, ${re*de-20}px) rotate(${ve*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${V*de*1.4}px, ${re*de+le}px) rotate(${ve}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:he,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Aa(1600),q.innerHTML=""}async function ot(){var q;if(I(window.innerWidth,window.innerHeight),Ne(),s.current&&(s.current.style.display="flex"),await H(),!x){s.current&&(s.current.style.display="none"),(q=c.current)==null||q.classList.add("intro-on"),S();for(let L=0;L<Zs.length&&!x;L++){const oe=Zs[L];y=oe.crack,l.current&&(l.current.innerHTML=oe.final?oe.sub:`${oe.sub} · трещина канала <b>${oe.crack}/4</b>`),Je(L),Z.focusZ=Js(L);const ce=L%2===0?1:-1,T=oe.final?0:ce*60,_=oe.final?Js(L)-mM:Js(L)+pM;if(await Ve(_,T,gM,.5+oe.crack*.09,ce),x)return;O(),dt(Math.min(1,.5+oe.crack*.14),oe.final?300:260),oe.final||ht(.8+oe.crack*.1,320),P(y,window.innerWidth,window.innerHeight)}x||(await mt(900),!x&&(await Aa(150),await Mt(),!x&&g()))}}return ot(),()=>{x=!0,window.removeEventListener("resize",Ge),cancelAnimationFrame(Q),Ae.forEach(q=>q.dispose()),Y==null||Y.dispose(),p==null||p.close().catch(()=>{})}},[]),a.jsx("div",{className:"host-screen grid-bg intro-screen",children:a.jsxs("div",{className:"intro-root",children:[a.jsx("canvas",{ref:e,className:"intro-gl"}),a.jsx("canvas",{ref:t,className:"intro-crack"}),a.jsx("div",{ref:u,className:"intro-shatter-layer"}),a.jsx("div",{className:"intro-vignette"}),a.jsx("div",{className:"intro-scanlines"}),a.jsx("div",{ref:d,className:"intro-noise"}),a.jsx("div",{className:"intro-bracket tl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket tr",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket bl",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-bracket br",children:a.jsx("b",{})}),a.jsx("div",{className:"intro-ticker left",children:a.jsx("div",{className:"intro-ticker-col",children:[...h,...h].map((x,M)=>a.jsx("span",{className:M%6===0?"hi":void 0,children:x},M))})}),a.jsx("div",{className:"intro-ticker right",children:a.jsx("div",{className:"intro-ticker-col",children:[...m,...m].map((x,M)=>a.jsx("span",{className:M%5===0?"hi":void 0,children:x},M))})}),a.jsxs("div",{ref:s,className:"intro-stage",children:[a.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),a.jsx("div",{ref:r,className:"intro-frame"}),a.jsx("div",{ref:o,className:"intro-subline",children:"инициализация канала связи…"})]}),a.jsx("div",{ref:c,className:"intro-flight-label",children:a.jsx("div",{ref:l,className:"intro-subline"})}),a.jsx(Go,{}),a.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const vM=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],Ca=[3400,2700,2200,1900],Bo=640,nd=560,MM=320,id=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Ra=220,Qs=300,sd=.46,rd=820,as=n=>-(n+1)*Bo,yM=n=>n===1?1:1-Math.pow(2,-10*n),os=n=>new Promise(e=>setTimeout(e,n));function bM(){const n=new ui,e=[],t=new ti({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new ac(.42,.95,12),s=new ut(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new zi(.42,.36,1.9,12),o=new ut(r,t);o.rotation.x=Math.PI/2,o.position.set(0,0,-.15),n.add(o),e.push(r);const c=new xi(.5,.14,1),l=new ti({color:1316636,metalness:.5,roughness:.6}),d=new ut(c,l);d.position.set(.08,.38,-.1),d.rotation.z=.1,n.add(d),e.push(c,l);const u=new ti({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),f=new vr(.13,12,12),h=new ut(f,u);h.position.set(0,-.05,-2),n.add(h),e.push(f,u);const m=new vr(.06,8,8);[-.22,.22].forEach(A=>{const I=new ut(m,u);I.position.set(A,.12,-1.7),n.add(I)}),e.push(m);const x=new zi(.06,.06,1.4,6),M=new ti({color:1711394,metalness:.7,roughness:.4});e.push(x,M);const g=new xi(.04,.86,.05),p=new ti({color:658447,metalness:.4,roughness:.6});e.push(g,p);const v=new zi(.5,.5,.07,16),w=new ti({color:1382429,metalness:.6,roughness:.45});e.push(v,w);const S=new oc(.6,.09,8,20);e.push(S);function E(A,I){const C=new ui,P=new ut(x,M);P.rotation.z=Math.PI/2,P.position.set(A*.72,-.08,.15),C.add(P);const F=A*1.45,O=new ut(v,w);O.rotation.x=Math.PI/2,O.position.set(F,-.08,.15),C.add(O);const H=new ti({color:855826,metalness:.75,roughness:.3,emissive:I,emissiveIntensity:1.4}),Y=new ut(S,H);Y.position.copy(O.position),C.add(Y),e.push(H);const $=new ui;$.position.copy(O.position);for(let ne=0;ne<5;ne++){const Q=new ut(g,p);Q.rotation.z=ne/5*Math.PI,$.add(Q)}return C.add($),{pod:C,rim:Y,spokes:$}}const b=E(-1,2875596),N=E(1,15357964);n.add(b.pod,N.pod);const y=new hi(2875596,2.2,14,2);return y.position.set(0,0,-1.4),n.add(y),{group:n,rotorL:b,rotorR:N,engineLight:y,disposables:e}}function SM(n=60){const e=new Ft,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new kt(t,3));const r=new Rr({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:pi,depthWrite:!1}),o=new rc(e,r);let c=0;function l(u,f,h,m){for(let x=0;x<m;x++){const M=c;c=(c+1)%n,i[M]=.4+Math.random()*.35,t[M*3]=u,t[M*3+1]=f,t[M*3+2]=h,s[M*3]=(Math.random()-.5)*3.2,s[M*3+1]=(Math.random()-.5)*3.2-1,s[M*3+2]=(Math.random()-.5)*3.2}}function d(u){for(let f=0;f<n;f++){if(i[f]<=0){t[f*3+1]=-9999;continue}i[f]-=u,t[f*3]+=s[f*3]*u,t[f*3+1]+=s[f*3+1]*u,t[f*3+2]+=s[f*3+2]*u,i[f]<=0&&(t[f*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:o,geo:e,mat:r,spawn:l,tick:d}}function wM({onDone:n,phases:e=vM}){const t=z.useRef(null),i=z.useRef(null),s=z.useRef(null),r=z.useRef(null),o=z.useRef(null),c=z.useRef(null),l=z.useRef(null),d=z.useRef(n);d.current=n;const u=z.useRef(e);u.current=e;const f=z.useRef(()=>{});Sd();const h=z.useMemo(()=>e.map(m=>m.text).join(" → "),[e]);return z.useEffect(()=>{let m=!1,x=!1;const M=()=>{x||(x=!0,d.current())};f.current=M;const g=u.current,p=l.current,v=i.current,w=(v==null?void 0:v.getContext("2d"))??null;let S=[],E=0;function b(){v&&(v.width=window.innerWidth,v.height=window.innerHeight)}b();function N(q,L){S=[];let oe=0;const ce=7;function T(D,U,k,K,G,B){const V=3+Math.floor(Math.random()*4),re=[[D,U]];let he=k,de=D,le=U;for(let ve=0;ve<V;ve++){he+=(Math.random()-.5)*.9;const Se=K/V*(.55+Math.random()*.85);if(de+=Math.cos(he)*Se,le+=Math.sin(he)*Se,re.push([de,le]),G>0&&Math.random()<.58){const Ue=he+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);T(de,le,Ue,K*(.3+Math.random()*.35),G-1,B*.76)}}S.push({pts:re,color:id[oe++%id.length],width:B})}for(let D=0;D<ce;D++){const U=q*(.1+Math.random()*.8),k=L*(.08+Math.random()*.84),K=7+Math.floor(Math.random()*7);let G=Math.random()*Math.PI*2;for(let B=0;B<K;B++){G+=Math.PI*2/K*(.55+Math.random()*.9);const V=Math.max(q,L)*(.16+Math.random()*.46);T(U,k,G,V,2,.9)}}S.slice().forEach(D=>{if(D.pts.length<3||Math.random()>=.55)return;const[U,k]=D.pts[1+Math.floor(Math.random()*(D.pts.length-2))];T(U,k,Math.random()*Math.PI*2,Math.max(q,L)*(.08+Math.random()*.22),1,.55)})}function y(q){if(!w||q<=0)return;const L=Math.min(1,q/2.5),oe=Math.round(S.length*L);for(let ce=0;ce<oe;ce++){const T=S[ce];w.lineWidth=T.width*(.9+q*.1),w.strokeStyle=T.color,w.globalAlpha=.7+q*.07,w.shadowColor=T.color,w.shadowBlur=5+q*2.4,w.beginPath(),T.pts.forEach(([_,D],U)=>U===0?w.moveTo(_,D):w.lineTo(_,D)),w.stroke()}w.globalAlpha=1,w.shadowBlur=0}function A(q,L,oe){w&&(w.clearRect(0,0,L,oe),y(q))}function I(q=!1){const L=o.current;if(!L)return;const oe=q?"fincine-hit-big":"fincine-hit";L.classList.remove("fincine-hit","fincine-hit-big"),L.offsetWidth,L.classList.add(oe)}function C(){p&&(p.currentTime=0,p.play().catch(()=>{}))}let P=null,F=null,O=null,H=0,Y=!1,$=-1;const Q=document.createElement("canvas").getContext("2d");Q.font=`700 ${Ra}px "Rajdhani", sans-serif`;const ie=[],pe=[];function fe(q,L,oe=1){const ce=q.toUpperCase(),T=Ra*.05,_=Math.ceil(Q.measureText(ce).width),D=Math.max(200,_+140+T*2),U=document.createElement("canvas");U.width=D,U.height=Qs;const k=U.getContext("2d");k.font=`700 ${Ra}px "Rajdhani", sans-serif`,k.textAlign="center",k.textBaseline="middle",k.lineJoin="round",k.shadowColor=L,k.shadowBlur=60,k.strokeStyle="#eef6f4",k.lineWidth=T,k.strokeText(ce,D/2,Qs/2),k.fillStyle="#eef6f4",k.fillText(ce,D/2,Qs/2);const K=new xu(U);K.anisotropy=4;let G=D*sd*oe,B=Qs*sd*oe;if(G>rd*oe){const V=rd*oe/G;G*=V,B*=V}return{tex:K,worldW:G,worldH:B}}function Re(q,L,oe,ce){const{tex:T,worldW:_,worldH:D}=fe(q,oe,ce),U=new Ki(_,D),k=new Xn({map:T,transparent:!0,depthWrite:!1,opacity:0}),K=new ut(U,k);K.position.set(0,8,L),K.visible=!1,F.add(K);const G=new ut(U,new Xn({map:T,transparent:!0,depthWrite:!1,blending:pi,color:2875596,opacity:0})),B=new ut(U,new Xn({map:T,transparent:!0,depthWrite:!1,blending:pi,color:16723804,opacity:0}));return G.position.copy(K.position),B.position.copy(K.position),G.visible=!1,B.visible=!1,F.add(G),F.add(B),pe.push(U,k,T,G.material,B.material),{mesh:K,ghostCy:G,ghostMg:B}}const ge={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let Ae,ae,j=null,Z=null,Me=0;function Ie(){const q=t.current;if(!q)return;P=new Lu({canvas:q,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),P.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),F=new hu,F.fog=new Ar(263946,.0012),O=new jt(58,window.innerWidth/window.innerHeight,1,6e3),O.position.set(0,0,40),F.add(new Su(928300,1));const L=Bo*g.length+600,oe=700,ce=new Ft,T=new Float32Array(oe*3),_=new Float32Array(oe*3),D=[2875596,10116351,15357964];for(let G=0;G<oe;G++){const B=60+Math.random()*280,V=Math.random()*Math.PI*2;T[G*3]=Math.cos(V)*B,T[G*3+1]=Math.sin(V)*B,T[G*3+2]=-Math.random()*L;const re=new Xe(D[G%D.length]);_[G*3]=re.r,_[G*3+1]=re.g,_[G*3+2]=re.b}ce.setAttribute("position",new kt(T,3)),ce.setAttribute("color",new kt(_,3));const U=new Rr({size:3,vertexColors:!0,transparent:!0,opacity:.8});F.add(new rc(ce,U)),pe.push(ce,U),g.forEach((G,B)=>{const V=as(B),re="#"+G.light.toString(16).padStart(6,"0");ie.push(Re(G.text,V,re,G.final?1.35:1));const he=new hi(G.light,2.6,950,2);he.position.set(0,40,V+60),F.add(he)}),Ae=new hi(15357964,3.4,550,2),ae=new hi(10116351,2.2,550,2),F.add(Ae),F.add(ae),j=bM(),O.add(j.group),j.group.position.set(1.3,-1,-6.5),Z=SM(),j.group.add(Z.points),pe.push(Z.geo,Z.mat),F.add(O),Y=!0,Ne();const k=Math.random()*1e3;ge.camZ=-Bo*.6;function K(G){if(!P||!F||!O||!j||!Z)return;const B=Me?Math.min(.05,(G-Me)/1e3):.016;Me=G;const V=.15+Math.min(1,Math.max(0,($+1)/g.length))*.85,re=ge.impactT;re>0&&(ge.impactT=Math.max(0,re-B));const he=Math.sin(G*.0016+k)*(1+V*2.2+re*6)+Math.sin(G*.0043)*.5*V,de=Math.cos(G*.002+k)*(.9+V*1.8+re*5)+Math.cos(G*.0038)*.45*V;O.position.x=he+ge.camX,O.position.y=de+6,O.position.z=ge.camZ+ge.warpKick;const le=ge.yawKick,ve=O.position.x+Math.sin(le)*640,Se=ge.focusY??O.position.y-4;O.lookAt(ve,Se,ge.focusZ),O.rotateZ(-le*.55);const Ue=58+ge.fovKick*(14+V*10)+re*24;Math.abs(O.fov-Ue)>.01&&(O.fov=Ue,O.updateProjectionMatrix()),Ae.position.set(Math.sin(G*6e-4)*80,30,ge.camZ-120),ae.position.set(Math.cos(G*7e-4)*80,-10,ge.camZ-200),ge.droneRoll=ge.droneRoll*.9+-le*1.4*.1;const W=1.6+V*2.4;ge.droneBob=Math.sin(G*.001*W)*(.12+V*.35),j.group.rotation.z=ge.droneRoll*.6+(re>0?Math.sin(G*.09)*1.15*re:0),j.group.rotation.x=Math.sin(G*.0013)*.06*(1+V)+(re>0?Math.cos(G*.11)*.75*re:0);const _e=B*(6+V*10);j.rotorR.spokes.rotation.z+=_e;let ue=-1+ge.droneBob;ge.engineOutT>0?(ge.engineOutT-=B,ue-=1-Math.max(0,ge.engineOutT)/.5<1?Math.sin((.5-ge.engineOutT)*9)*.4:0,j.rotorL.spokes.rotation.z+=_e*.12,j.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&Z.spawn(-1.45,-.08,.15,2)):(j.rotorL.spokes.rotation.z+=_e,j.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(G*.01)*.3),j.group.position.y=ue,j.group.position.x=1.3+Math.sin(G*9e-4)*.25*(1+V),j.group.position.z=-6.5-(re>0?re*2.6:0),Z.tick(B),ie.forEach(xe=>{xe.mesh.visible&&xe.mesh.quaternion.copy(O.quaternion),xe.ghostCy.visible&&xe.ghostCy.quaternion.copy(O.quaternion),xe.ghostMg.visible&&xe.ghostMg.quaternion.copy(O.quaternion)}),P.render(F,O),H=requestAnimationFrame(K)}H=requestAnimationFrame(K)}function Ne(){!Y||!P||!O||(P.setSize(window.innerWidth,window.innerHeight),O.aspect=window.innerWidth/window.innerHeight,O.updateProjectionMatrix())}function qe(){Ne(),b(),N(window.innerWidth,window.innerHeight),A(E,window.innerWidth,window.innerHeight)}window.addEventListener("resize",qe,{passive:!0});function Ge(q,L=600){const oe=$;$=q;const ce=ie[q];if(!ce)return;ce.mesh.visible=!0,ce.mesh.material.opacity=0;const T=oe>=0?ie[oe]:null,_=performance.now();function D(){const U=Math.min(1,(performance.now()-_)/L);ce.mesh.material.opacity=U,T&&(T.mesh.material.opacity=1-U),U<1?requestAnimationFrame(D):T&&(T.mesh.visible=!1)}D()}function Je(q=.5){if($<0)return;const L=ie[$];if(!L)return;const oe=(14+Math.random()*12)*(.7+q*.6),ce=Math.min(1,.45+q*.3);L.ghostCy.visible=!0,L.ghostCy.material.opacity=ce,L.ghostCy.position.x=-oe,L.ghostMg.visible=!0,L.ghostMg.material.opacity=ce,L.ghostMg.position.x=oe,setTimeout(()=>{L.ghostCy.material.opacity=0,L.ghostCy.visible=!1,L.ghostCy.position.x=0,L.ghostMg.material.opacity=0,L.ghostMg.visible=!1,L.ghostMg.position.x=0},(120+Math.random()*90)*(.8+q*.5)),q>.75&&Math.random()<.65&&setTimeout(()=>Je(q*.55),70+Math.random()*70)}async function $e(q,L,oe,ce,T){const _=ge.camZ,D=ge.camX,U=performance.now();return ge.warpKick=(Math.random()-.5)*40,ge.yawKick=T*ce,ge.fovKick=1,new Promise(k=>{function K(G){if(m){k();return}const B=Math.min(1,(G-U)/oe),V=yM(B);ge.camZ=_+(q-_)*V,ge.camX=D+(L-D)*V,ge.warpKick*=.91,ge.yawKick*=.972,ge.fovKick*=.96,B<1?requestAnimationFrame(K):k()}requestAnimationFrame(K)})}function Ve(q=1,L=420){if(!Y||!w||!t.current)return;const oe=window.innerWidth,ce=window.innerHeight,T=performance.now()+L;function _(){if(performance.now()>T){A(E,oe,ce);return}w.clearRect(0,0,oe,ce),y(E);const U=5+Math.floor(Math.random()*9*q);for(let K=0;K<U;K++){const G=Math.random()*ce,B=4+Math.random()*56*q,V=(Math.random()-.5)*150*q;try{w.drawImage(t.current,0,G,oe,B,V,G,oe,B)}catch{}}w.globalCompositeOperation="screen";const k=Math.round(6*q);for(let K=0;K<k;K++){const G=Math.random()*ce;w.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],w.globalAlpha=.35+Math.random()*.35,w.lineWidth=.6+Math.random()*1.8,w.beginPath(),w.moveTo(0,G),w.lineTo(oe,G),w.stroke()}if(w.globalCompositeOperation="source-over",w.globalAlpha=1,Math.random()<q*.14){w.globalAlpha=.5;for(let K=0;K<240;K++)w.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",w.fillRect(Math.random()*oe,Math.random()*ce,2,2);w.globalAlpha=1}requestAnimationFrame(_)}_()}function dt(q=1,L=340){if(!Y||!w)return;const oe=window.innerWidth,ce=window.innerHeight,T=oe/2,_=ce/2,D=14+Math.floor(14*q),U=Array.from({length:D},()=>Math.random()*Math.PI*2),k=performance.now();function K(){const B=(performance.now()-k)/L;if(B>=1){A(E,oe,ce);return}w.save(),w.globalCompositeOperation="screen",U.forEach(V=>{const re=30+B*340,he=re+100+Math.random()*170,de=T+Math.cos(V)*re,le=_+Math.sin(V)*re,ve=T+Math.cos(V)*he,Se=_+Math.sin(V)*he;w.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",w.globalAlpha=(1-B)*(.3+Math.random()*.34)*q,w.lineWidth=1.2+Math.random()*2,w.beginPath(),w.moveTo(de,le),w.lineTo(ve,Se),w.stroke()}),w.restore(),requestAnimationFrame(K)}K()}async function ht(q=900){const L=window.innerWidth,oe=window.innerHeight;if(!w)return;const ce=performance.now(),T=S.map(()=>Math.random()*.25);await new Promise(_=>{function D(){if(m){_();return}const U=Math.min(1,(performance.now()-ce)/q);w.clearRect(0,0,L,oe),S.forEach((k,K)=>{const G=Math.min(1,Math.max(0,(U-T[K])/(1-T[K])));if(G<=0)return;const B=k.pts,V=B.length-1,re=G*V;w.lineWidth=k.width*(1+U*.45),w.strokeStyle=k.color,w.globalAlpha=.65+U*.32,w.shadowColor=k.color,w.shadowBlur=3+U*6,w.beginPath(),w.moveTo(B[0][0],B[0][1]);for(let le=0;le<Math.floor(re);le++)w.lineTo(B[le+1][0],B[le+1][1]);const he=Math.floor(re),de=re-he;if(he<V&&de>0){const[le,ve]=B[he],[Se,Ue]=B[he+1];w.lineTo(le+(Se-le)*de,ve+(Ue-ve)*de)}w.stroke()}),w.globalAlpha=1,w.shadowBlur=0,U<1?requestAnimationFrame(D):_()}D()})}async function mt(){ge.impactT=.55,I(!0),Z&&(Z.spawn(0,-.05,-2,28),Z.spawn(-1.45,-.08,.15,16),Z.spawn(1.45,-.08,.15,16)),Ve(1.6,340),dt(1.4,260),await os(160)}async function Mt(){I(!0);const q=c.current;if(!q)return;q.innerHTML="";const L=window.innerWidth,oe=window.innerHeight,ce=12,T=8,_=L/ce,D=oe/T,U=L/2,k=oe/2,K=[];for(let G=0;G<T;G++)for(let B=0;B<ce;B++){const V=B*_,re=G*D,he=()=>(Math.random()-.5)*16,de=document.createElement("div");de.className="fincine-shard",de.style.left=V+"px",de.style.top=re+"px",de.style.width=_+2+"px",de.style.height=D+2+"px",de.style.clipPath=`polygon(${he()}px ${he()}px, ${_+he()}px ${he()}px, ${_+he()}px ${D+he()}px, ${he()}px ${D+he()}px)`,q.appendChild(de);const le=V+_/2-U,ve=re+D/2-k,Se=Math.hypot(le,ve)||1;K.push({div:de,dx:le/Se,dy:ve/Se,delay:Se/Math.max(L,oe)*200+Math.random()*70})}K.forEach(({div:G,dx:B,dy:V,delay:re})=>{const he=70+Math.random()*160,de=460+Math.random()*460,le=(Math.random()-.5)*460;G.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${B*he}px, ${V*he-22}px) rotate(${le*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${B*he*1.4}px, ${V*he+de}px) rotate(${le}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:re,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await os(1530),q.innerHTML=""}async function ot(){if(N(window.innerWidth,window.innerHeight),Ie(),C(),s.current&&s.current.classList.add("fincine-on"),await os(900),!m){for(let q=0;q<g.length&&!m;q++){const L=g[q];E=L.crack,r.current&&(r.current.innerHTML=L.final?L.sub:`${L.sub} · рассинхрон канала <b>${L.crack}/4</b>`),Ge(q),ge.focusZ=as(q),L.final&&(ge.focusY=8);const oe=q%2===0?1:-1;if(L.final){const ce=as(q)+nd+280;if(await $e(ce,0,Ca[q]??2200,.35,oe),m||(Je(.4+L.crack*.2),Ve(Math.min(1.5,.45+L.crack*.27),300),A(E,window.innerWidth,window.innerHeight),await os(700),await $e(as(q)-MM,-150,950,.5,oe),m))return}else{const ce=oe*70,T=as(q)+nd;if(L.crack>=2&&setTimeout(()=>{m||(ge.engineOutT=.5)},Ca[q]*.4),await $e(T,ce,Ca[q]??2200,.55+L.crack*.1,oe),m)return}Je(.4+L.crack*.2),Ve(Math.min(1.5,.45+L.crack*.27),L.final?360:240+L.crack*30),L.final||dt(.8+L.crack*.2,300+L.crack*20),L.crack>=3&&I(!0),A(E,window.innerWidth,window.innerHeight)}m||(await mt(),!m&&(await ht(850),!m&&(await os(140),await Mt(),!m&&M())))}}return ot(),()=>{m=!0,window.removeEventListener("resize",qe),cancelAnimationFrame(H),pe.forEach(q=>q.dispose()),j==null||j.disposables.forEach(q=>q.dispose()),P==null||P.dispose();try{p==null||p.pause()}catch{}}},[]),a.jsxs("div",{className:"fincine-root",onClick:()=>f.current(),children:[a.jsx("canvas",{ref:t,className:"fincine-gl"}),a.jsx("canvas",{ref:i,className:"fincine-crack"}),a.jsx("div",{ref:c,className:"fincine-shatter-layer"}),a.jsx("div",{className:"fincine-vignette"}),a.jsx("div",{className:"fincine-scanlines"}),a.jsx("div",{ref:o,className:"fincine-noise"}),a.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!h,children:[a.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),a.jsx("div",{ref:r,className:"fincine-sub"})]}),a.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),a.jsx(Go,{}),a.jsx("audio",{ref:l,src:"/quiz-party/intro.mp3",preload:"auto"})]})}function EM(n){const e=new Map;n.words.forEach((l,d)=>{for(let u=0;u<l.word.length;u++){const f=l.dir==="down"?l.row+u:l.row,h=l.dir==="across"?l.col+u:l.col,m=`${f},${h}`,x=e.get(m)??{r:f,c:h,words:[],ch:l.word[u].toUpperCase()};x.words.push(d),u===0&&(x.num=l.number),e.set(m,x)}});const t=[...e.values()],i=l=>n.words.findIndex(d=>d.number===l),s=l=>n.words[i(l)],r=l=>{const d=s(l),u=i(l);return d?t.filter(f=>f.words.includes(u)).sort((f,h)=>d.dir==="down"?f.r-h.r:f.c-h.c):[]},o=t.map(l=>l.r),c=t.map(l=>l.c);return{grid:n,cells:t,nums:[...n.words.map(l=>l.number)].sort((l,d)=>l-d),W:s,wordCells:r,cellNums:l=>l.words.map(d=>n.words[d].number),dirRu:l=>{var d;return((d=s(l))==null?void 0:d.dir)==="down"?"по вертикали":"по горизонтали"},bb:t.length?{r0:Math.min(...o),r1:Math.max(...o),c0:Math.min(...c),c1:Math.max(...c)}:{r0:0,r1:0,c0:0,c1:0}}}const Mr=n=>Hh(n).replace(/\s/g,"");function TM(n,e,t){var o;const i=Mr(e??""),s=i?n.words.filter(c=>Mr(c.word)===i):[];if(s.length===1)return s[0].number;const r=n.words.find(c=>c.number===t+1);return r&&(!s.length||s.includes(r))?r.number:((o=s[0])==null?void 0:o.number)??(r==null?void 0:r.number)??null}function AM(n,e){return e.map((t,i)=>TM(n,t.answer.mode==="crossword_word"?t.answer.word:void 0,i))}function CM(n,e){const t=Mr(n).toUpperCase(),i=Mr(e).toUpperCase();return t.length>i.length+2?null:[...t].map((s,r)=>({ch:s,st:r>=i.length?"extra":s===i[r]?"ok":"bad"}))}const yr=n=>n.length>160?" xl xxl":n.length>70?" xl":n.length>40?" lg":"",Na={review:560,complete:660};function RM(n,e,t={}){const i=n.c1-n.c0+1,s=n.r1-n.r0+1;if(e==="question"){const c=t.right??1520,l=1920-c,d=Math.max(200,(t.bottom??876)-96),u=Math.max(24,Math.min(78,Math.floor((c-l)/i),Math.floor(d/s))),f=(l+c)/2;return{P:u,OX:f-i*u/2,OY:96+Math.max(0,(d-s*u)/2)}}if(e==="complete"){const o=Math.max(24,Math.min(66,Math.floor((t.maxW??924)/i),Math.floor(660/s)));return{P:o,OX:70,OY:200+Math.max(0,(660-s*o)/2)}}const r=Math.max(22,Math.min(56,Math.floor((t.maxW??784)/i),Math.floor(560/s)));return{P:r,OX:44,OY:310+Math.max(0,(560-s*r)/2)}}function Du(n,e){const i=Math.max(40,Math.min(88,Math.floor(680/Math.max(1,n)))),s=Math.max(34,Math.min(62,Math.floor(704/Math.max(1,e+2)))),r=Math.min(s-8,i-10);return{ROW0:392,ROWH:i,COL:s,lt:r}}function NM(n,e){const t=Math.max(40,Math.min(92,Math.floor(740/Math.max(1,n)))),i=Math.max(26,Math.min(40,Math.floor(t-12),Math.floor(560/Math.max(1,e))-8));return{top:300,step:t,pip:i}}function PM(n){const e=n%10,t=n%100;return e===1&&t!==11?"команда":e>=2&&e<=4&&(t<12||t>14)?"команды":"команд"}const ko=1e3,us=292,LM=Array.from({length:70},(n,e)=>({x:e*977%1900+10,y:e*613%1040+20,s:2+e%3,d:e%9*.6})),IM=[{x:60,y:80,w:860,h:860}];function Uu(n,e,t){const i=RM(n.bb,e,t);return{g:i,cx:o=>i.OX+(o-n.bb.c0)*i.P+i.P/2,cy:o=>i.OY+(o-n.bb.r0)*i.P+i.P/2,orb:i.P*(e==="complete"?.72:.62)}}function Fu({m:n,mode:e,title:t,qn:i,qcount:s,cur:r,next:o=null,past:c,shown:l,curLit:d,clue:u,parts:f,lifts:h,tally:m,n:x,total:M,rootRef:g,cls:p="",bottom:v,right:w,maxW:S,side:E,timer:b=!0}){var ae;const N=e!=="question",y=e==="complete",{cx:A,cy:I,orb:C}=Uu(n,e,{bottom:v,right:w,maxW:S}),P=r!=null?n.wordCells(r):[],F=new Set(P.map(j=>`${j.r},${j.c}`)),O=new Set(o!=null?n.wordCells(o).map(j=>`${j.r},${j.c}`):[]),H=j=>n.wordCells(j).map((Z,Me)=>`${Me?"L":"M"} ${A(Z.c)} ${I(Z.r)}`).join(" "),Y=r!=null?((ae=n.W(r))==null?void 0:ae.word)??"":"",$=Du(Math.max(1,...(f??[]).map(j=>j.rows.length)),Math.max(Y.length,...(f??[]).map(j=>{var Z;return((Z=n.W(j.num))==null?void 0:Z.word.length)??0}))),ne=$.ROWH===88&&$.COL===62&&$.lt===54,Q=ne?void 0:{"--lt":`${$.lt}px`,"--ltf":`${Math.round($.lt*.555)}px`,"--gap":`${$.COL-$.lt}px`},ie=j=>{const Z=n.cellNums(j),Me=`${j.r},${j.c}`,Ie=Z.some(qe=>l(qe)),Ne=F.has(Me)&&!y;return y?"rev":Ne?d?"rev":N?"seal":"act":Ie?"rev":Z.some(qe=>c(qe))?"seal":"cold"},pe=j=>j.rows.map((Z,Me)=>a.jsxs("div",{className:`cwC-trow ${j.cls}`,"data-ti":Me,style:{top:$.ROW0+Me*$.ROWH-$.ROWH/2,...ne?null:{height:$.ROWH,...Q},...j.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-nm ${j.cls}`,style:{color:Z.color},children:Z.name}),a.jsx("span",{className:"cwC-cells",children:j.covered?a.jsx("span",{className:"cwC-al",children:Array.from({length:n.W(j.num).word.length},(Ie,Ne)=>a.jsx("i",{className:"cwC-lt cov",children:a.jsx("b",{className:"ch",style:{opacity:0},children:"•"})},Ne))}):a.jsx(UM,{answer:Z.answer,word:n.W(j.num).word,judged:j.judged})}),!j.covered&&j.judged&&a.jsx(FM,{v:Z.verdict})]},Z.key)),fe=j=>a.jsxs("div",{className:`cwC-ans ${j.cls}`,style:{top:us-44,...Q,...j.hidden?{opacity:0}:null},children:[a.jsx("span",{className:`cwC-lab ${j.cls}`,children:"Правильный ответ"}),a.jsx("span",{className:"cwC-cells",children:a.jsx("span",{className:"cwC-al",children:[...n.W(j.num).word.toUpperCase()].map((Z,Me)=>a.jsx("i",{className:"cwC-lt ok big",children:a.jsx("b",{className:"ch",style:j.covered?{opacity:0}:void 0,children:Z})},Me))})})]}),Re=j=>a.jsxs("div",{className:`cwC-rec ${j.cls}${yr(j.clue)}`,style:j.hidden?{opacity:0}:void 0,children:[a.jsxs("em",{children:["Разбор · слово ",j.num," · ",n.dirRu(j.num),j.recExtra??""]}),j.clue,j.note?a.jsx("span",{className:"cwC-rnote",children:j.note}):null]}),ge=m?NM(m.rows.length,n.nums.length):null,Ae=!ge||ge.step===92&&ge.pip===40;return a.jsxs(gn,{rects:IM,n:x,rootRef:g,cls:`s3 cw cwC ${p}`,children:[Ho(t,i,s),a.jsx("div",{className:"cwC-dust","aria-hidden":!0,children:LM.map((j,Z)=>a.jsx("i",{style:{left:j.x,top:j.y,width:j.s,height:j.s,animationDelay:`${j.d}s`}},Z))}),a.jsxs("div",{className:"cwC-map",children:[a.jsxs("svg",{className:"cwC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[n.nums.map(j=>{const Z=y||c(j),Me=j===r&&!y;return a.jsx("path",{className:`cwC-line${Me?" now":Z?" old":""}`,"data-n":j,...j===o?{"data-nx":1}:{},d:H(j)},j)}),h&&P.map((j,Z)=>{const Me=ko+Z*$.COL+$.COL/2,Ie=A(j.c),Ne=I(j.r);return a.jsx("path",{className:"cwC-beam","data-k":Z,d:`M ${Ie} ${Ne} C ${Ie+120} ${Ne} ${Me-160} ${us} ${Me} ${us}`},Z)})]}),n.cells.map(j=>{const Z=n.cellNums(j),Me=`${j.r},${j.c}`,Ie=F.has(Me)&&!y,Ne=P.findIndex(qe=>qe===j);return a.jsxs("div",{className:`cwC-orb ${ie(j)}${j.words.length>1?" x":""}`,"data-n":Z.join(" "),style:{left:A(j.c)-C/2,top:I(j.r)-C/2,width:C,height:C,"--d":`${(j.r*3+j.c)%7*.5}s`},...Ie&&N?{"data-cur":1,"data-k":Ne,...Z.some(qe=>l(qe))?{"data-old":1}:{}}:{},...O.has(Me)?{"data-nx":1}:{},children:[j.words.length>1&&a.jsx("i",{className:"flare"}),a.jsx("span",{className:"core",children:a.jsx("b",{className:"ch",style:{fontSize:C*.56},children:j.ch})}),j.num&&a.jsx("em",{className:"num",style:{left:-C*.1,top:-C*.28},children:j.num})]},Me)})]}),E,!N&&u&&a.jsxs("div",{className:"cwC-clue",children:[r!=null&&a.jsxs("div",{className:"k",children:["слово ",r," · ",n.dirRu(r)," · ",Y.length," ",DM(Y.length)]}),a.jsx("div",{className:`t${yr(u.text)}`,children:u.text}),u.answer?a.jsx("div",{className:"cwC-open",children:u.answer}):null,u.note?a.jsx("div",{className:"cwC-note",children:u.note}):null]}),N&&!y&&f&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cwC-veil"}),f.map(j=>a.jsxs(z.Fragment,{children:[Re(j),fe(j),pe(j),j.cls==="p1"&&h&&P.map((Z,Me)=>a.jsx("div",{className:"cwC-lift","data-k":Me,style:{left:ko+Me*$.COL,top:us-$.lt/2,...ne?null:{width:$.lt,height:$.lt,...Q}},children:a.jsx("i",{className:"cwC-lt ok big"})},"l"+Me))]},j.cls+j.num))]}),y&&m&&a.jsxs("div",{className:"cwC-tally",children:[a.jsxs("div",{className:"cwC-rec pd",children:[a.jsx("em",{children:"Кроссворд разгадан"}),"Угадано слов из ",n.nums.length]}),m.rows.map((j,Z)=>a.jsxs("div",{className:"cwC-tr",style:{top:ge.top+Z*ge.step,...Ae?null:{height:Math.min(80,ge.step),"--pip":`${ge.pip}px`,"--pipf":`${Math.round(ge.pip/2)}px`}},children:[a.jsx("span",{className:"cwC-nm",style:{color:j.color},children:j.name}),a.jsx("span",{className:"pips",children:n.nums.map((Me,Ie)=>a.jsx("i",{className:j.pips[Ie]===!0?"ok":j.pips[Ie]===!1?"no":"nil",children:Me},Me))}),a.jsx("b",{className:"sum",children:j.sum})]},j.key))]}),!N&&b&&a.jsx(Vo,{n:x,total:M})]})}const DM=n=>{const e=n%10,t=n%100;return e===1&&t!==11?"буква":e>=2&&e<=4&&(t<12||t>14)?"буквы":"букв"};function UM({answer:n,word:e,judged:t=!0}){if(n==null)return a.jsx("span",{className:"cwC-none",children:"не ответили"});const i=CM(n,e);if(!i)return a.jsx("span",{className:`cwC-txt${yr(n)}`,children:a.jsx("b",{className:"ch",children:n})});const s=Math.max(e.length,i.length);return a.jsx("span",{className:"cwC-al",children:Array.from({length:s},(r,o)=>{const c=i[o];return a.jsx("i",{className:`cwC-lt ${c?t?c.st:"neu":"miss"}`,children:a.jsx("b",{className:"ch",children:(c==null?void 0:c.ch)??""})},o)})})}function FM({v:n}){return a.jsx("span",{className:`cwC-mk ${n===!0?"ok":n===!1?"no":"nil"}`,children:n===!0?a.jsxs(a.Fragment,{children:[a.jsx("b",{children:"✓"}),a.jsx("em",{children:"+1"})]}):n===!1?a.jsx("b",{children:"✗"}):a.jsx("b",{children:"—"})})}function OM(n,e,t){const i=yr(n),s=i.includes("xxl")?31:i.includes("xl")?38:i.includes("lg")?44:52,o=40+Math.max(1,Math.ceil(n.length/(1260/(s*.52))))*s*1.14+(e?62:0)+(t?Math.ceil(t.length/90)*30:0);return Math.round(1046-o-24)}function BM({m:n,title:e,qn:t,qcount:i,cur:s,past:r,clue:o,answer:c,note:l,n:d,total:u,side:f,sideN:h}){const m=z.useRef(null),x=z.useMemo(()=>nt.utils.selector(m),[]),M=OM(o,!!c,c?l:""),g=h?1300:void 0;z.useLayoutEffect(()=>{const S=nt.timeline();return S.fromTo(x(".cwC-dust i"),{opacity:0},{opacity:1,duration:1,stagger:.01},0).fromTo(x(".cwC-line"),{strokeDashoffset:900},{strokeDashoffset:0,duration:1.2,stagger:.08,ease:"power2.out"},.2).fromTo(x(".cwC-orb"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,stagger:{each:.016,from:"random"},ease:"back.out(2)"},.4).fromTo(x(".cwC-clue"),{y:30,opacity:0},{y:0,opacity:1,duration:.7},1.2).fromTo(x(".cwC-side"),{opacity:0},{opacity:1,duration:.7},.8),()=>{S.kill()}},[]);const p=!!c,v=z.useRef(p);z.useLayoutEffect(()=>{if(!p||v.current){v.current=p;return}v.current=!0;const S=nt.timeline();return S.fromTo(x(".cwC-orb.rev .ch"),{opacity:0},{opacity:1,duration:.4,stagger:.1},0).fromTo(x(".cwC-open, .cwC-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5,stagger:.15},.3),()=>{S.kill()}},[p]);const w=h>0&&f?a.jsx("div",{className:`cwC-side${h>2?" grid":""}`,style:{left:1340,right:40,top:110,height:Math.max(180,M-130)},children:f}):null;return a.jsx(Fu,{m:n,mode:"question",title:e,qn:t,qcount:i,cur:s,past:S=>r.has(S),shown:()=>!1,curLit:p,clue:{text:o,answer:c??void 0,note:c&&l?l:void 0},n:d,total:u,rootRef:m,cls:`st-question${p?" open":""}`,bottom:M,right:g,side:w})}function kM({m:n,title:e,qn:t,qcount:i,cur:s,reviewed:r,revealed:o,checked:c,clue:l,note:d,rows:u,answered:f,tally:h,side:m,sideN:x}){var P;const M=z.useRef(null),g=z.useMemo(()=>nt.utils.selector(M),[]),[p,v]=z.useState(o?"open":"covered"),[w,S]=z.useState(!1);z.useEffect(()=>{o?p==="covered"&&v("anim"):v("covered")},[o]);const E=c&&p==="open",b=w&&h?"complete":"review",N=s!=null?((P=n.W(s))==null?void 0:P.word)??"":"",y=Du(u.length,N.length);z.useLayoutEffect(()=>{const F=nt.timeline();return F.fromTo(g(".cwC-veil"),{opacity:0},{opacity:1,duration:.6},0).fromTo(g(".cwC-rec, .cwC-lab, .cwC-nm, .cwC-trow, .cwC-ans, .cwC-side"),{opacity:0,y:-14},{opacity:1,y:0,duration:.5,stagger:.03},.1),()=>{F.kill()}},[]),z.useLayoutEffect(()=>{if(p!=="anim"||s==null)return;const F=n.wordCells(s),O=Math.max(1,F.length),{cx:H,cy:Y,orb:$}=Uu(n,"review",{maxW:Na.review}),ne=nt.timeline({onComplete:()=>v(fe=>fe==="anim"?"open":fe)});ne.fromTo(g(".cwC-ans .ch, .cwC-trow .ch"),{opacity:0},{opacity:0,duration:.01},0).fromTo(g(".cwC-ans .cwC-lt, .cwC-trow .cwC-lt, .cwC-trow .cwC-none, .cwC-trow .cwC-txt"),{opacity:0,scale:.4},{opacity:0,scale:.4,duration:.01},0);const Q=Math.min(.12,.5/O);F.forEach((fe,Re)=>{const ge=g(`.cwC-lift[data-k="${Re}"]`)[0],Ae=H(fe.c)-(ko+Re*y.COL+y.lt/2),ae=Y(fe.r)-us,j=.1+Re*Q,Z=j+.9;ge&&ne.fromTo(ge,{x:Ae,y:ae,scale:$/y.lt,opacity:1},{keyframes:[{x:Ae*.4,y:ae*.4-60,scale:1.1,duration:.5,ease:"sine.inOut"},{x:0,y:0,scale:1,duration:.4,ease:"power2.out"}]},j).to(ge,{opacity:0,duration:.15},Z),ne.fromTo(g(`.cwC-beam[data-k="${Re}"]`),{strokeDashoffset:600,opacity:0},{strokeDashoffset:0,opacity:.9,duration:.5,ease:"power1.out"},j).to(g(`.cwC-beam[data-k="${Re}"]`),{opacity:0,duration:.4},Z-.1).fromTo(g(`.cwC-ans .cwC-lt:nth-child(${Re+1})`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.2},Z).fromTo(g(`.cwC-ans .cwC-lt:nth-child(${Re+1}) .ch`),{opacity:0},{opacity:1,duration:.2},Z).fromTo(g(`.cwC-orb[data-cur][data-k="${Re}"]`),{"--on":0,"--glow":.6},{"--on":1,"--glow":1,duration:.35,ease:"power1.out"},Z)});const ie=Math.max(.1+(O-1)*Q+.9+.5,2),pe=Math.min(.55,2.4/Math.max(1,u.length));return u.forEach((fe,Re)=>{ne.fromTo(g(`.cwC-trow[data-ti="${Re}"] .cwC-lt, .cwC-trow[data-ti="${Re}"] .cwC-none, .cwC-trow[data-ti="${Re}"] .cwC-txt`),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.3,stagger:.04,ease:"back.out(2)"},ie+Re*pe).fromTo(g(`.cwC-trow[data-ti="${Re}"] .ch`),{opacity:0},{opacity:1,duration:.25,stagger:.04},ie+Re*pe+.1)}),ne.to({},{duration:.3}),()=>{ne.kill()}},[p]),z.useLayoutEffect(()=>{if(!E||b!=="review")return;const F=nt.timeline();return F.fromTo(g(".cwC-mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:.12,ease:"back.out(2.5)"},0),()=>{F.kill()}},[E]);const A=!!h&&E;z.useEffect(()=>{if(!A){S(!1);return}const F=setTimeout(()=>S(!0),8e3);return()=>clearTimeout(F)},[A]),z.useLayoutEffect(()=>{if(b!=="complete")return;const F=nt.timeline();return F.fromTo(g(".cwC-orb"),{"--glow":.4,scale:1},{"--glow":1,scale:1.12,duration:.5,yoyo:!0,repeat:1,stagger:{each:.02,from:"center"}},.2).fromTo(g(".cwC-tally > *"),{opacity:0,x:20},{opacity:1,x:0,duration:.45,stagger:.1},.6),()=>{F.kill()}},[b]);const I=p==="covered",C=s!=null?[{num:s,cls:"p1",covered:I,clue:l,judged:E,recExtra:I&&u.length?` · ответили ${f} ${PM(f)}`:"",note:E&&d?d:void 0,rows:u.map(F=>({...F,verdict:E?F.verdict:null}))}]:[];return a.jsx(Fu,{m:n,mode:b,title:e,qn:t,qcount:i,cur:s,past:F=>r.has(F),shown:F=>r.has(F),curLit:p==="open",parts:C,lifts:p==="anim",tally:b==="complete"&&h?{rows:h}:void 0,n:null,total:1,rootRef:M,cls:`st-${b==="complete"?"complete":"review"} rev`,timer:!1,maxW:b==="complete"?Na.complete:Na.review,side:b==="review"&&x>0&&m?a.jsx("div",{className:`cwC-side${x>1?" row":""}`,style:{left:44,top:96,width:540,height:190},children:m}):void 0})}const zM=n=>/\.(mp3|mp4|webm|wav)$/i.test(n),ad=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n),cc=n=>{var e;return((e=n.settings)==null?void 0:e.grid)??null};function Ou(n){const e=cc(n),t=z.useMemo(()=>EM(e),[e]),i=z.useMemo(()=>AM(e,n.questions),[e,n.questions]);return{m:t,nums:i}}const Bu=(n,e)=>a.jsx("div",{className:"cwC-sc",children:a.jsx("img",{src:n,alt:""})},e);function jM({pack:n,round:e,q:t,qIndex:i,qCount:s,gameState:r,effectsSlot:o,actionsSlot:c}){var y;const{m:l,nums:d}=Ou(e),u=r.timer_started_at,f=bd(u,e.timer_seconds,!0),m=((y=n.settings)!=null&&y.answers_reveal&&e.answers_reveal==="after_question",e.answers_reveal??"after_round")==="after_question"&&r.reveal,x=new Set(d.slice(0,i).filter(A=>A!=null)),M=t.media.question??[],g=t.media.hidden?[]:M.filter(A=>!zM(A)),p=M.filter(A=>/\.(mp4|webm)$/i.test(A)),v=t.media.answer??[],w=m?v.filter(A=>!ad(A)):[],S=m?v.find(ad):void 0,E=w.length?w:g,b=t.answer.mode==="crossword_word"?t.answer.word:"",N=[...E.slice(0,4).map((A,I)=>Bu(je(A),I)),...t.media.hidden?[]:p.map((A,I)=>a.jsx("div",{className:"cwC-sc",children:a.jsx(Cc,{src:je(A),hidden:!1,waitFor:!!t.media.voice,go:!!u})},"v"+I))];return a.jsxs(a.Fragment,{children:[a.jsx(Go,{}),o,S&&a.jsx(Ui,{src:je(S)}),t.media.hidden&&p.map((A,I)=>a.jsx(Cc,{src:je(A),hidden:!0,waitFor:!!t.media.voice,go:!!u},I)),a.jsx(BM,{m:l,title:e.title_lines.join(" "),qn:i+1,qcount:s,cur:d[i]??null,past:x,clue:t.question_text.trim(),answer:m?b.toUpperCase():null,note:t.answer_note??"",n:u?f.left:e.timer_seconds,total:e.timer_seconds,side:N,sideN:N.length}),c]})}function GM({pack:n,round:e,q:t,step:i,answers:s,teams:r,allTeams:o,revealed:c,checked:l,paper:d,effects:u,imgs:f,video:h,actions:m}){const{m:x,nums:M}=Ou(e),g=(A,I)=>I?I.is_correct??ci(A.answer,I.answer_text):null,p=s.filter(A=>A.question_ref===`q-${t.id}`),v=[...r,...o.filter(A=>!r.some(I=>I.id===A.id)&&s.some(I=>I.team_id===A.id))],w=A=>ji(Rn(A)),S=d?[]:v.map(A=>{var P;const I=p.find(F=>F.team_id===A.id),C=((P=I==null?void 0:I.answer_text)==null?void 0:P.trim())||null;return{key:A.id,name:`${"icon"in A&&A.icon?`${A.icon} `:""}${A.name}`,color:w(A.color),answer:C,verdict:g(t,I)}}),E=p.filter(A=>{var I;return(I=A.answer_text)==null?void 0:I.trim()}).length,b=new Set(M.slice(0,i).filter(A=>A!=null)),N=i>=e.questions.length-1;let y=null;return N&&!d&&v.length&&(y=v.map((A,I)=>{const C=x.nums.map(P=>{const F=M.indexOf(P),O=e.questions[F];return O?g(O,s.find(H=>H.question_ref===`q-${O.id}`&&H.team_id===A.id)):null});return{key:A.id,name:A.name,color:w(A.color),pips:C,sum:C.filter(P=>P===!0).length,i:I}}).sort((A,I)=>I.sum-A.sum||A.i-I.i)),a.jsxs(a.Fragment,{children:[u,a.jsx(kM,{m:x,title:e.title_lines.join(" "),qn:i+1,qcount:e.questions.length,cur:M[i]??null,reviewed:b,revealed:c,checked:l,clue:t.question_text.trim(),note:t.answer_note??"",rows:S,answered:E,tally:y,side:[...h?[a.jsx("div",{className:"cwC-sc",children:h},"v")]:[],...f.slice(0,h?1:2).map((A,I)=>Bu(je(A),I))],sideN:Math.min(2,f.length+(h?1:0))}),m]})}const Pa={top:92,bottom:1050,head:56};function HM(n){if(n<=7)return{cols:1,rowH:null,gap:8,nameFs:21,txtFs:32,mk:56,txtLines:2,padL:44};const e=n<=12?1:2,t=Math.ceil(n/e),i=n<=12?6:5,s=Math.floor((Pa.bottom-Pa.top-Pa.head-i*(t-1))/t),r=Math.min(1,s/118);return e===1?{cols:e,rowH:s,gap:i,nameFs:Math.round(Math.max(15,21*Math.sqrt(r))),txtFs:Math.round(Math.max(20,32*r)),mk:Math.round(Math.max(30,56*r)),txtLines:s>=90?2:1,padL:34}:{cols:e,rowH:s,gap:i,nameFs:s>=60?15:13,txtFs:s>=60?20:17,mk:s>=60?30:24,txtLines:1,padL:22}}const dn={width:1800,gap:10,labH:100};function ku(n){if(n<=0)return{cols:0,rows:0,cw:null,rowH:0,gap:0,nameFs:17,txtFs:25,mk:34,lift:0,height:0};if(n===6)return{cols:6,rows:1,cw:null,rowH:dn.labH,gap:10,nameFs:17,txtFs:25,mk:34,lift:0,height:dn.labH};const e=n<=6?1:n<=12?2:n<=24?3:4,t=Math.ceil(n/e),i=(dn.width-dn.gap*5)/6,s=Math.min(e===1?i:440,Math.floor((dn.width-dn.gap*(t-1))/t)),r=e===1?dn.labH:e===2?56:e===3?40:32,o=e===1?10:6,c=e*r+(e-1)*o,l=e===1?[17,25,34]:e===2?[15,21,30]:e===3?[13,17,24]:[12,15,22];return{cols:t,rows:e,cw:s,rowH:r,gap:o,nameFs:l[0],txtFs:l[1],mk:l[2],lift:Math.max(0,c-dn.labH),height:c}}function lc(n,e,t,i,s=Math.round(t*.6),r=.52){const o=Math.max(1,n.length);for(let c=t;c>s;c-=1)if(Math.ceil(o*r*c/e)<=i)return c;return s}const zu="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z",ju=(n,e)=>n.text==null?"nil":e?n.ok===!0?"ok":n.ok===!1?"no":"un":"un",Gu=n=>n==="ok"?"✓":n==="no"?"✗":n==="nil"?"—":null,Hu=n=>n.stake!=null&&n.stake!==0&&n.text!=null?a.jsxs("small",{className:"stk",children:[" · ",n.stake]}):null;function VM({rows:n,phase:e="all",judged:t=!0,lay:i,count:s}){const r=!!i,o=i?{"--rh":`${i.rowH??118}px`,"--gap":`${i.gap}px`,"--nfs":`${i.nameFs}px`,"--tfs":`${i.txtFs}px`,"--mks":`${i.mk}px`,"--tl":i.txtLines,"--pl":`${i.padL}px`,"--cols":i.cols}:void 0,c=i?(580-(i.cols-1)*12)/i.cols-i.padL-i.mk-30:0;return a.jsxs("div",{className:`s4-teams${r?` g c${i.cols}`:""}`,style:o,children:[a.jsxs("div",{className:"s4-th",children:["Ответы команд",s!=null&&a.jsx("span",{className:"s4-cnt",children:s})]}),n.map((l,d)=>{const u=ju(l,t),f=e==="all"||t?Gu(u):null,h=l.text??"не ответили",m=r&&l.text!=null?lc(h,c,i.txtFs,i.txtLines):void 0;return a.jsxs("div",{className:`s4-ta ${u}`,"data-i":d,children:[a.jsx("svg",{className:"s4-ta-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:zu})}),a.jsx("span",{className:"nm",style:{color:l.color},children:l.name}),e!=="open"&&a.jsx("span",{className:"dots",children:"• • •"}),e!=="dots"&&a.jsxs("span",{className:"txt",style:m&&m!==i.txtFs?{fontSize:m}:void 0,children:[h,Hu(l)]}),(e==="all"||f!=null)&&a.jsx("i",{className:"mk",children:f})]},l.key)})]})}function Vu({rows:n,top:e=958,phase:t="all",judged:i=!0,lay:s,count:r}){const o=!!s,c={top:e};s&&Object.assign(c,{"--cols":s.cols,"--cw":s.cw!=null?`${s.cw}px`:"1fr","--rh":`${s.rowH}px`,"--gap":`${s.gap}px`,"--nfs":`${s.nameFs}px`,"--tfs":`${s.txtFs}px`,"--mks":`${s.mk}px`});const l=s?s.cw??(dn.width-dn.gap*5)/6:0;return a.jsxs(a.Fragment,{children:[r!=null&&a.jsx("div",{className:"s4-scnt",style:{top:e-40},children:r}),a.jsx("div",{className:`s4-strip${o?` g r${s.rows}`:""}`,style:c,children:n.map(d=>{const u=ju(d,i),f=t==="all"||i?Gu(u):null,h=d.text??"не ответили",m=o&&d.text!=null?lc(h,l-s.mk-40,s.txtFs,1):void 0;return a.jsxs("div",{className:`s4-sl ${u}`,children:[a.jsx("svg",{className:"bg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:zu})}),a.jsx("span",{className:"nm",style:{color:d.color},children:d.name}),o&&t!=="open"&&t!=="all"&&a.jsx("span",{className:"dots",children:"• • •"}),t!=="dots"&&a.jsxs("span",{className:"txt",style:m&&m!==s.txtFs?{fontSize:m}:void 0,children:[h,Hu(d)]}),(t==="all"||f!=null)&&a.jsx("i",{className:"mk",children:f})]},d.key)})})]})}const WM="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",$M={text:"revtext",mc:"revmc",img:"revimg",imgopt:"revimgopt"},zo={top:84,width:1160};function Wu(n){const e=(t,i)=>Math.ceil(Math.max(1,n.length)*.5*t/zo.width)<=i;for(const[t,i]of[[40,3],[34,4],[30,5]])if(e(t,i))return t;return 26}const XM=(n,e=Wu(n))=>zo.top+Math.ceil(Math.max(1,n.length)*.5*e/zo.width)*e*1.14;function La(n,e,t,i,s=40){const r=n.toUpperCase().split(/\s+/).filter(Boolean);for(let o=t;o>=s;o-=2){const c=u=>u.length*(.66*o+6);if(r.some(u=>c(u)>e))continue;let l=1,d=0;for(const u of r){const f=(d?.35*o:0)+c(u);d&&d+f>e?(l++,d=c(u)):d+=f}if(l*o<=i)return{fs:o,lines:l}}return{fs:s,lines:3}}function qM(n,e=0){var h;const t=Wu(n.question),i=XM(n.question,t),s=Math.max(190,Math.round(i+22));let r=[],o=[];if(n.kind==="img"&&n.photos.length){const m=n.photos.slice(0,4),x=((h=n.captions)!=null&&h.length?620:710)-s;if(m.length===1&&!m[0].video)r=[ir(m[0],380+e,s,640,880-s)];else if(m.length===1)r=[ir(m[0],650+e,s,900,x)];else{const g=m.reduce((E,b)=>E+b.w/b.h,0),p=Math.round(Math.min(x,(1160-40*(m.length-1))/g)),v=m.map(E=>Math.round(E.w/E.h*p)),w=v.reduce((E,b)=>E+b,0)+40*(m.length-1);let S=Math.round(650+e-w/2);r=v.map(E=>{const b={x:S,y:s,w:E,h:p};return S+=E+40,b})}o=m.map(M=>M.video?WM:M.src)}if(n.kind==="imgopt"&&n.photos.length){const m=n.photos.length,x=m<=3?m:m===4?2:3,M=Math.ceil(m/x),g=1200/x,p=(890-s+40)/M;r=n.photos.map((v,w)=>ir(v,60+e+g*(w%x+.5),Math.round(s+Math.floor(w/x)*p),g-80,Math.min(520,p-40))),o=n.photos.map(v=>v.src)}const c=Math.max(1,n.options.length),l=1160/c,d=n.kind==="img"&&n.photos.length===1&&!n.photos[0].video,u=d?La(n.answer,540,330,104):n.kind==="img"?La(n.answer,1160,104,150):La(n.answer,1160,150,250),f=d?Math.max(s+70,s+Math.round(r[0].h/2)-40):0;return{side:d,sideTop:f,dx:e,recallFs:t,frame:{rects:r,srcs:o},ans:u,ansBase:n.kind==="img"?104:150,cx:m=>70+e+l*(m+.5),optW:Math.min(270,Math.round(l-20)),flower:Math.min(1,l/290),optFs:Math.min(32,...n.options.map(m=>lc(m.text,Math.min(270,Math.round(l-20)),32,3,20,.56))),noteTop:n.kind==="text"?730:n.kind==="mc"?900:992}}function YM(n,e){n.fromTo(e(".s4-recall"),{opacity:0,y:-10},{opacity:1,y:0,duration:.5},.1)}function KM(n,e){n.fromTo(e(".s4-th, .s4-ta"),{opacity:0,x:24},{opacity:1,x:0,duration:.45,stagger:.07},.3).fromTo(e(".s4-ta .txt, .s4-ta .mk"),{opacity:0},{opacity:0,duration:.01},.3)}function ZM(n,e,t){n.to(e(".s4-ta .dots"),{opacity:0,duration:.3,stagger:.06},t).fromTo(e(".s4-ta .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.07},t)}function JM(n,e,t,i=.2){n.fromTo(e(".s4-ta .mk"),{opacity:0,scale:0,rotation:-40},{opacity:1,scale:1,rotation:0,duration:.4,stagger:i,ease:"back.out(2.4)"},t)}const $u=n=>n.replace(/\s/g,"").length;function QM(n,e,t,i,s,r=!1){const{R:o,k:c}=s,l=$u(t.answer);if(t.kind==="text")return n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},o-.4).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},o).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},o+.1).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1.2},o+.6).fromTo(e(".s4-fl"),{scale:0,rotation:-60},{scale:1,rotation:0,svgOrigin:"0 0",duration:.8,ease:"back.out(2)"},o+l*c+.3),{show:o+.9,mark:o+l*c+1.2};if(t.kind==="mc"){const u=t.correct;return t.options.forEach((f,h)=>{h===u?n.fromTo(e(`.s4-mf[data-i="${h}"]`),{scale:1},{scale:1.25,svgOrigin:"0 0",duration:.9,ease:"back.out(2)"},o+.9).fromTo(e(`.s4-mf[data-i="${h}"] .pt`),{fill:"#c9b6ff"},{fill:"#ffd986",duration:.9},o+.9).fromTo(e(`.s4-halo[data-i="${h}"]`),{opacity:0,attr:{r:36}},{opacity:1,attr:{r:124},duration:.9,ease:"power2.out"},o+.9).fromTo(e(`.s4-opt[data-i="${h}"]`),{color:"#f4fff9"},{color:"#ffe2a0",duration:.6},o+1):u>=0&&n.to(e(`.s4-mf[data-i="${h}"]`),{scale:.62,rotation:h%2?-16:16,svgOrigin:"0 0",duration:1,ease:"power2.inOut"},o+.2+h*.1).to(e(`.s4-mf[data-i="${h}"] .pt`),{fill:"#5d5a7a",duration:1},o+.2+h*.1).to(e(`.s4-opt[data-i="${h}"]`),{opacity:.45,duration:.8},o+.3+h*.1)}),n.fromTo(e(".s4-gl"),{strokeDashoffset:1400},{strokeDashoffset:0,duration:1.3,ease:"power1.in"},o),{show:o+.9,mark:o+2.3}}if(t.kind==="img"){const u=s.lt??o+1.1,f=i.bloom.map((m,x)=>x),h=m=>Object.fromEntries(f.map(x=>[x,m]));return r&&f.length&&n.fromTo(i.grow,h(0),{...h(1),duration:.6,ease:"power2.out"},o).fromTo(i.reveal,h(0),{...h(1),duration:.6,ease:"power2.inOut"},o+.2),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o),f.length&&n.fromTo(i.bloom,h(0),{...h(1),duration:1.4,ease:"power1.out"},o+.6),n.fromTo(e(".s4-lab"),{opacity:0},{opacity:1,duration:.5},u-.3).fromTo(e(".s4-vine-light"),{strokeDashoffset:1e3},{strokeDashoffset:0,duration:l*c+.5,ease:"none"},u-.1).fromTo(e(".s4-ans .l"),{opacity:0,scale:.25,y:34},{opacity:1,scale:1,y:0,duration:.5,stagger:c,ease:"back.out(2)"},u).fromTo(e(".s4-glow"),{opacity:0},{opacity:1,duration:1},u+.3),{show:u+.5,mark:u+1.9}}const d=t.correct;return t.photos.forEach((u,f)=>{f===d?n.fromTo(i.bloom,{[f]:0},{[f]:1,duration:1.4,ease:"power1.out"},o+.8):d>=0&&n.fromTo(i.reveal,{[f]:1},{[f]:0,duration:1.1,ease:"power2.in"},o+.2+f*.12)}),n.fromTo(i,{pulse:0},{pulse:1.15,duration:1.3,ease:"power1.inOut"},o+.5).fromTo(e(".s4-capt"),{opacity:0,y:10},{opacity:1,y:0,duration:.6},o+1.8),{show:o+1.4,mark:o+2.8}}const od=(n,e,t,i)=>Array.from({length:n},(s,r)=>a.jsx("g",{transform:`rotate(${r*360/n})`,children:a.jsx("ellipse",{className:"pt",cx:"0",cy:i,rx:e,ry:t})},r));function Ia(n){const e=n.toUpperCase().split(/\s+/).filter(Boolean);return e.length<=1?(e[0]??"").split("").map((t,i)=>a.jsx("span",{className:"l",children:t},i)):e.map((t,i)=>a.jsx("span",{className:"wd",children:t.split("").map((s,r)=>a.jsx("span",{className:"l",children:s},r))},i))}function ey({d:n,ly:e,fs:t,rows:i,phase:s="all",judged:r=!0,colLay:o,count:c,shown:l=!0,n:d=null,rootRef:u,cls:f="",video:h}){const{dx:m}=e,x=b=>b+m,M=[{x:x(40),y:80,w:1220,h:900},...i?[{x:1270,y:90,w:620,h:860}]:[]],g=e.recallFs!==40?{fontSize:e.recallFs,left:x(70)}:m?{left:x(70)}:void 0,p=b=>({left:x(70),width:1160,top:b,...e.ans.fs!==e.ansBase?{fontSize:e.ans.fs}:{}}),v=n.answer.trim().includes(" ")?" wrap":"",w=n.correct,S=n.kind==="img"?n.photos.findIndex(b=>b.video):-1,E=S>=0?e.frame.rects[S]:null;return a.jsxs(gn,{rects:M,n:d,rootRef:u,cls:`s3 s4 st-${$M[n.kind]}${f}`,children:[a.jsxs("div",{className:"s3-head",children:[a.jsx("b",{children:n.title}),a.jsxs("span",{children:["разбор · вопрос ",n.qn," / ",n.qcount]})]}),e.frame.rects.length>0&&a.jsx(Bd,{rects:e.frame.rects,srcs:e.frame.srcs,fs:t}),n.kind==="text"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(120),top:330,width:1060,height:340}}),a.jsx("div",{className:"s4-lab",style:{left:x(70),width:1160,top:300},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans${v}`,style:p(350),children:Ia(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${x(250)} 650 C ${x(380)} 690 ${x(520)} 620 ${x(650)} 660 S ${x(920)} 690 ${x(1020)} 640`}),a.jsx("path",{className:"s4-vine-light",d:`M ${x(250)} 650 C ${x(380)} 690 ${x(520)} 620 ${x(650)} 660 S ${x(920)} 690 ${x(1020)} 640`}),a.jsx("g",{transform:`translate(${x(1100)} 636)`,children:a.jsxs("g",{className:"s4-fl",children:[od(8,13,26,-30),a.jsx("circle",{r:"12",className:"ct"})]})})]})]})]}),n.kind==="mc"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-ground",d:`M ${x(70)} 700 C ${x(400)} 690 ${x(800)} 712 ${x(1230)} 696`}),l&&w>=0&&a.jsx("path",{className:"s4-gl",d:`M ${x(70)} 700 C ${x(300)} 692 ${e.cx(w)-200} 706 ${e.cx(w)} 700`}),n.options.map((b,N)=>a.jsxs("g",{transform:`translate(${e.cx(N)} 520)${e.flower<1?` scale(${e.flower.toFixed(3)})`:""}`,children:[a.jsx("path",{className:"s4-stem",d:"M 0 60 C -10 110 10 150 0 180"}),a.jsx("circle",{className:"s4-halo","data-i":N,r:"124"}),a.jsxs("g",{className:"s4-mf","data-i":N,children:[od(8,22,44,-52),a.jsx("circle",{r:"34",className:"ct"})]})]},b.key))]}),n.options.map((b,N)=>a.jsxs("div",{className:"s4-opt","data-i":N,style:{left:e.cx(N)-e.optW/2,top:730,...e.optW!==270?{width:e.optW}:{},...e.optFs!==32?{fontSize:e.optFs}:{}},children:[a.jsx("b",{children:b.key}),a.jsx("span",{children:b.text})]},b.key)),n.options.map((b,N)=>a.jsx("b",{className:"s4-key",style:{left:e.cx(N)-24,top:496},children:b.key},b.key))]}),n.kind==="img"&&e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(700),top:e.sideTop-90,width:620,height:330}}),a.jsx("div",{className:"s4-lab",style:{left:x(740),width:540,top:e.sideTop-48},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${v}`,style:{left:x(740),width:540,top:e.sideTop,fontSize:e.ans.fs},children:Ia(n.answer)})]})]}),n.kind==="img"&&!e.side&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),l&&n.captions&&e.frame.rects.map((b,N)=>n.captions[N]&&a.jsx("div",{className:"s4-rcap",style:{left:b.x-20,top:b.y+b.h+26,width:b.w+40},children:n.captions[N].first?a.jsxs(a.Fragment,{children:[n.captions[N].plain,a.jsx("b",{children:n.captions[N].hot})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{children:n.captions[N].hot}),n.captions[N].plain]})},"rc"+N)),l&&a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"s4-glow",style:{left:x(120),top:760,width:1060,height:240}}),a.jsx("div",{className:"s4-lab",style:{left:x(70),width:1160,top:744},children:"Правильный ответ"}),a.jsx("div",{className:`s4-ans sm${v}`,style:p(780),children:Ia(n.answer)}),a.jsxs("svg",{className:"s4-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"s4-vine",d:`M ${x(330)} 944 C ${x(440)} 970 ${x(520)} 920 ${x(650)} 950 S ${x(860)} 972 ${x(970)} 936`}),a.jsx("path",{className:"s4-vine-light",d:`M ${x(330)} 944 C ${x(440)} 970 ${x(520)} 920 ${x(650)} 950 S ${x(860)} 972 ${x(970)} 936`})]})]})]}),n.kind==="imgopt"&&a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"s4-recall",style:g,children:n.question}),e.frame.rects.map((b,N)=>a.jsx("b",{className:"s4-pk",style:{left:b.x-6,top:b.y-6},children:n.keys[N]},N)),l&&w>=0&&a.jsxs("div",{className:"s4-capt",style:m?{left:x(70)}:void 0,children:["Ответ: ",a.jsx("b",{children:n.keys[w]}),n.caption?` — ${n.caption}`:""]})]}),i&&a.jsx(VM,{rows:i,phase:s,judged:r,lay:o,count:c}),E&&h&&a.jsx("div",{className:"s4-vid",style:{left:E.x,top:E.y,width:E.w,height:E.h},children:h}),r&&l&&n.note&&a.jsx("div",{className:"s4-note",style:{left:x(70),top:e.noteTop},children:n.note})]})}const Da=60,ty=290,ny=960,Ua=226,iy=(n,e)=>{var t;return((t=n.correct_pairs.find(i=>i.startsWith(e)))==null?void 0:t.slice(e.length))??""},dc=n=>n.items.map((e,t)=>n.right.indexOf(iy(n,String(t+1))));function sy(n,e,t){const i=t>4?26:n.length>60?25:n.length>40?27:30,s=Math.ceil(n.length*.5*i/Math.max(80,e-(t>4?86:100)));return Math.max(t>4?100:120,Math.round(s*i*1.14+26))}function ry(n,e={}){const t=!!e.long,i=e.lift??0,s=n.items.length,r=n.items.map(S=>S.kind==="img"?S.w/S.h:0),o=n.items.filter(S=>S.kind==="txt").length,c=s>4?250:ty,l=r.reduce((S,E)=>S+E,0),d=Math.round(Math.min((s>4?300:380)-i,l?(1800-Da*(s-1)-c*o)/l:380)),u=n.items.map((S,E)=>S.kind==="img"?Math.round(r[E]*d):c),f=u.reduce((S,E)=>S+E,0)+Da*(s-1);let h=ny-f/2;const m=u.map(S=>{const E={x:h,y:Ua,w:S,h:d};return h+=S+Da,E}),x=s>4?250:t?400:330,M=m.map(S=>{const E=Math.max(x,Math.min(470,Math.round(S.w*.97)));return{x:S.x+S.w/2-E/2,y:Ua+d+56,w:E,h:0}}),g=n.right.length,p=1450,v=p/Math.max(1,g),w=n.right.map((S,E)=>({cx:400+v*(E+.5)+(E%2?14:-14),y:(s>4?E%2?790:640:E%2?936:t?796:806)-i}));if(e.stripTop!=null){const S=dc(n),E=A=>{const I=S.indexOf(A);return I>=0?M[I].w:x},b=Math.max(...w.map((A,I)=>A.y+sy(n.right_labels[I]??"",E(I),s))),N=Math.max(0,b-(e.stripTop-52)),y=Ua+d+40;w.forEach(A=>{A.y=Math.max(y,A.y-N)})}return{img:m,fin:M,bank:w,h:d,lift:i,minW:x}}const cd=n=>n.length>60?" xl":n.length>40?" lg":"";function ay(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function oy(n,e){n.fromTo(e(".mt-img"),{opacity:0,scale:.92},{opacity:1,scale:1,duration:.6,stagger:.1,ease:"power2.out"},.3).fromTo(e(".mtC-bud"),{scale:0},{scale:1,duration:.4,stagger:.1,ease:"back.out(2)",transformOrigin:"50% 50%"},.8).fromTo(e(".mt-lab"),{opacity:0,y:40,rotation:-6},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.4)"},.9)}function cy(n,e,t,i,s){const r=dc(t);t.items.forEach((o,c)=>{const l=s.t0+c*s.step,d=r[c]>=0?e(`.mt-lab[data-k="${r[c]}"]`)[0]:void 0,u=i.bank[r[c]],f=i.fin[c];n.fromTo(e(`.mtC-img[data-k="${c}"]`),{"--hl":0},{"--hl":1,duration:.3,yoyo:!0,repeat:1},l).fromTo(e(`.mtC-stalk[data-k="${c}"]`),{strokeDashoffset:400},{strokeDashoffset:0,duration:.55,ease:"power2.out"},l+.1).fromTo(e(`.mtC-leaf[data-k="${c}"]`),{opacity:0},{opacity:1,duration:.3,stagger:.12},l+.35),d&&u&&n.fromTo(d,{x:0,y:0,rotation:r[c]%2?3:-3},{keyframes:[{y:-60,rotation:0,duration:.3,ease:"power2.out"},{x:f.x+f.w/2-u.cx,y:f.y-u.y,duration:.6,ease:"power2.inOut"}]},l+.35),n.fromTo(e(`.mt-num[data-k="${c}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.45,ease:"back.out(2.2)"},l+1)}),n.fromTo(e(".mt-pairs > *"),{opacity:0,y:10},{opacity:1,y:0,duration:.35,stagger:.08},s.pairsAt)}function ly({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,cls:c=""}){const l=dc(n),d=n.items.length,u=e.lift,f=[...e.img,{x:300,y:(d>4?620:780)-u,w:1500,h:280},{x:360,y:40,w:1200,h:90}];return a.jsxs(gn,{rects:f,n:s,rootRef:r,cls:`s3 mt mtC st-${t?"reveal":"question"}${i?" done":""} n${d}${c}`,children:[Ho(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q mt-q",children:n.text.split(" ").map((h,m)=>a.jsxs("span",{className:"w",children:[h," "]},m))}),a.jsxs("svg",{className:"mtC-svg",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("ellipse",{className:"mtC-meadow",cx:"1040",cy:(d>4?740:900)-u,rx:"900",ry:"170"}),t&&n.items.map((h,m)=>{const x=e.img[m],M=e.fin[m],g=x.x+x.w/2,p=x.y+x.h+4,v=M.y+2;return a.jsxs("g",{children:[a.jsx("path",{className:"mtC-stalk","data-k":m,d:`M ${g} ${p} C ${g-10} ${p+18} ${g+10} ${v-18} ${g} ${v}`}),a.jsxs("g",{transform:`translate(${g} ${(p+v)/2})`,children:[a.jsx("path",{className:"mtC-leaf","data-k":m,d:"M 0 0 C 16 -14 34 -12 40 -4 C 28 4 12 6 0 0 Z"}),a.jsx("path",{className:"mtC-leaf","data-k":m,d:"M 0 4 C -16 -8 -34 -6 -40 2 C -28 10 -12 12 0 4 Z"})]})]},m)})]}),e.img.map((h,m)=>{const x=n.items[m];return a.jsxs("div",{className:`mt-img mtC-img${x.kind==="txt"?" txtcard":""}`,"data-k":m,style:{left:h.x,top:h.y,width:h.w,height:h.h},children:[x.kind==="img"?a.jsx("img",{src:x.src,alt:""}):a.jsx("span",{className:`mtC-itxt${cd(x.text)}`,children:x.text}),a.jsx("b",{className:"mt-imgno",children:m+1}),!t&&a.jsx("i",{className:"mtC-bud",style:{left:h.w/2-14}})]},m)}),n.right.map((h,m)=>{const x=l.indexOf(m),M=x>=0?e.fin[x].w:e.minW,g=i&&x>=0?e.fin[x]:{x:e.bank[m].cx-M/2,y:e.bank[m].y};return a.jsxs("div",{className:`mt-lab mtC-lab${cd(n.right_labels[m]??"")}`,"data-k":m,style:{left:g.x,top:g.y,width:M},children:[a.jsx("svg",{className:"mt-labbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:"M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z"})}),a.jsx("span",{className:"key",children:h}),a.jsx("span",{className:"txt",children:n.right_labels[m]??""}),t&&x>=0&&a.jsx("b",{className:"mt-num","data-k":x,children:x+1})]},h)}),o&&a.jsx(Vu,{...o}),t&&a.jsx("div",{className:"mt-pairs",style:u?{top:884-u}:void 0,children:n.items.map((h,m)=>a.jsxs("span",{children:[a.jsx("b",{children:m+1})," — ",a.jsx("b",{children:n.right[l[m]]??"—"})]},m))}),a.jsx(Vo,{n:s,total:n.timer})]})}const dy="M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z";function uy(n,e={}){const t=n.choices.length,i=!!e.long,s=858-(e.lift??0),r=t>=6?244:t===5?292:n.media?300:360,o=t>=6?112:t===5?140:i?196:150,c=n.media?470:380,l=1880,d=Array.from({length:t},(h,m)=>c+r/2+(t===1?0:m*(l-c-r)/(t-1))),u=d.map(h=>({x:h,y:s-130-o/2})),f=n.choices.map((h,m)=>({x:d[m],y:350+m%2*(i?130:60)}));return{n:t,cw:r,ch:o,slot:u,home:f,xs:d,VY:s}}const hy=n=>n.length>50?" xl":n.length>28?" lg":"",fy=(n,e)=>n.correct_order.indexOf(e);function py(n,e){n.fromTo(e(".s3-q .w"),{opacity:0,y:12},{opacity:1,y:0,duration:.45,stagger:.04},.1)}function my(n,e){n.fromTo(e(".orA-vine"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:1.4,ease:"power2.inOut"},.1).fromTo(e(".orA-bud"),{scale:0},{scale:1,svgOrigin:"0 0",duration:.4,stagger:.2,ease:"back.out(2)"},.5).fromTo(e(".or-place"),{opacity:0},{opacity:1,duration:.4,stagger:.15},.6).fromTo(e(".or-card"),{opacity:0,y:-30,rotation:-4},{opacity:1,y:0,rotation:0,duration:.6,stagger:.1,ease:"back.out(1.5)"},.8)}function gy(n,e,t,i,s){const r=t.choices.map(c=>c.key),o=s.step;t.correct_order.split("").forEach((c,l)=>{const d=r.indexOf(c),u=d>=0?e(`.or-card[data-i="${d}"]`)[0]:void 0,f=i.home[d],h=i.slot[l],m=s.t0+l*o;u&&f&&h&&n.fromTo(u,{x:0,y:0,rotation:d%2?3:-3},{keyframes:[{x:(h.x-f.x)*.5,y:(h.y-f.y)*.5-50,rotation:h.x>f.x?7:-7,duration:o*.5,ease:"sine.inOut"},{x:h.x-f.x,y:h.y-f.y,rotation:0,duration:o*.45,ease:"power2.out"}]},m),n.fromTo(e(`.orA-stem[data-j="${l}"]`),{strokeDashoffset:120},{strokeDashoffset:0,duration:.3},m+o*.75).fromTo(e(`.orA-fl[data-j="${l}"]`),{scale:0},{scale:1,svgOrigin:"0 0",duration:.5,ease:"back.out(2.2)"},m+o*.8).to(e(`.orA-bud[data-j="${l}"]`),{scale:0,svgOrigin:"0 0",duration:.2},m+o*.75).fromTo(e(`.or-pos[data-i="${d}"]`),{scale:0,rotation:-60},{scale:1,rotation:0,duration:.4,ease:"back.out(2.2)"},m+o*.9)}),n.fromTo(e(".orA-light"),{strokeDashoffset:2400},{strokeDashoffset:0,duration:.4+i.n*o,ease:"none"},s.t0)}function xy({S:n,Ly:e,rev:t,done:i,n:s,rootRef:r,strip:o,media:c,cls:l=""}){const d=e.VY,u=x=>fy(n,x),f=[...e.home,...e.slot].map(x=>({x:x.x-e.cw/2,y:x.y-e.ch/2,w:e.cw,h:e.ch})).concat([{x:360,y:40,w:1200,h:90}]),h=[{x:360,y:d},...e.xs.map((x,M)=>({x,y:d+(M%2?12:-12)})),{x:1850,y:d-6}],m=h.reduce((x,M,g)=>g===0?`M ${M.x} ${M.y}`:`${x} C ${(h[g-1].x+M.x)/2} ${h[g-1].y} ${(h[g-1].x+M.x)/2} ${M.y} ${M.x} ${M.y}`,"");return a.jsxs(gn,{rects:f,n:s,rootRef:r,cls:`s3 or orA st-${t?"reveal":"question"}${i?" done":""} n${e.n}${l}`,children:[Ho(n.title,n.qn,n.qcount),a.jsx("div",{className:"s3-q or-q",style:n.media?{left:470,right:240}:void 0,children:n.text.split(" ").map((x,M)=>a.jsxs("span",{className:"w",children:[x," "]},M))}),n.media&&a.jsx("figure",{className:"or-media",children:a.jsx("img",{src:c??n.media,alt:""})}),a.jsxs("svg",{className:"orA-back",viewBox:"0 0 1920 1080","aria-hidden":!0,children:[a.jsx("path",{className:"orA-vine",d:m}),a.jsx("path",{className:"orA-light",d:m}),a.jsxs("g",{className:"orA-seed",transform:`translate(360 ${d})`,children:[a.jsx("ellipse",{rx:"26",ry:"17"}),a.jsx("path",{d:"M -6 -14 C -2 -30 8 -34 16 -32"})]}),a.jsx("g",{transform:`translate(1850 ${d-6})`,children:a.jsxs("g",{className:"orA-flower",children:[Array.from({length:8},(x,M)=>a.jsx("g",{transform:`rotate(${M*45})`,children:a.jsx("ellipse",{cx:"0",cy:"-26",rx:"12",ry:"26"})},M)),a.jsx("circle",{r:"11"})]})}),e.slot.map((x,M)=>a.jsxs("g",{transform:`translate(${x.x} ${h[M+1].y})`,children:[a.jsx("path",{className:"orA-stem","data-j":M,d:`M 0 0 L 0 ${x.y+e.ch/2-h[M+1].y}`}),a.jsx("ellipse",{className:"orA-bud","data-j":M,rx:"18",ry:"22",cy:"-6"}),a.jsxs("g",{className:"orA-fl","data-j":M,style:i?{transform:"scale(1)"}:void 0,children:[Array.from({length:7},(g,p)=>a.jsx("g",{transform:`rotate(${p*51.4})`,children:a.jsx("ellipse",{cx:"0",cy:"-22",rx:"11",ry:"22"})},p)),a.jsx("circle",{r:"9"})]})]},M))]}),e.slot.map((x,M)=>a.jsx("b",{className:"or-place",style:{left:x.x,top:d+38},children:M+1},M)),n.choices.map((x,M)=>{const g=i&&u(x.key)>=0?e.slot[u(x.key)]:e.home[M];return a.jsxs("div",{className:`or-card orA-card${hy(x.text)}${t?" placed":""}`,"data-i":M,style:{left:g.x-e.cw/2,top:g.y-e.ch/2,width:e.cw,height:e.ch},children:[a.jsx("svg",{className:"or-cardbg",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":!0,children:a.jsx("path",{d:dy})}),a.jsx("span",{className:"key",children:x.key}),a.jsx("span",{className:"txt",children:x.text}),t&&u(x.key)>=0&&a.jsx("em",{className:"or-pos","data-i":M,children:u(x.key)+1})]},x.key)}),o&&a.jsx(Vu,{top:968,...o}),a.jsx(Vo,{n:s,total:n.timer})]})}function _y(n,e,t){const i=n.answer;return i.mode==="match"?"match":i.mode==="order"?"order":i.mode==="choice"?t.qImgs>0&&t.qImgs===i.choices.length?"imgopt":"mc":e==="rebus"||t.revealImgs>0||t.video?"img":"text"}function vy(n,e){const t=n.answer,i=e.trim();if(t.mode==="choice"){const s=t.choices.find(r=>Vh(i,r.key));return s&&s.text.trim()?`${s.key} · ${s.text.trim()}`:i}return t.mode==="match"?i.split(/[,;]\s*/).map(s=>s.trim()).filter(Boolean).join(" "):i}function My(n,e,t,i,s){const r=`q-${n.id}`,o=i.filter(u=>u.question_ref===r),c=[...e,...t.filter(u=>!e.some(f=>f.id===u.id)&&o.some(f=>f.team_id===u.id))];let l=0;return{rows:c.map(u=>{var m;const f=o.find(x=>x.team_id===u.id),h=((m=f==null?void 0:f.answer_text)==null?void 0:m.trim())||"";return h&&l++,{key:u.id,name:`${u.icon?`${u.icon} `:""}${u.name}`,color:ji(Rn(u.color??"")),text:h?vy(n,h):null,ok:s&&f&&h?f.is_correct??ci(n.answer,f.answer_text):null,stake:(f==null?void 0:f.stake)??null}}),answered:l}}function yy(n,e,t){return n<=1?t:Math.max(.05,Math.min(t,(e-.3-1.45)/(n-1)))}function by(n,e,t){return Math.max(.35,Math.min(t,(e-.3-.4)/Math.max(.9,n-.1)))}const ld=(n,e=.7)=>Math.min(.14,e/Math.max(1,n-1));function Sy(n,e){const[t,i]=z.useState(n?"open":"covered"),[s,r]=z.useState(0);z.useEffect(()=>{n?t==="covered"&&i("anim"):t!=="covered"&&(i("covered"),r(c=>c+1))},[n]);const o=z.useCallback(()=>i(c=>c==="anim"?"open":c),[]);return{stage:t,epoch:s,judged:e&&t==="open",done:o}}const uc=n=>n==="covered"?"dots":n;function hc(n,e,t,i,s,r){const o=z.useRef(null),c=z.useMemo(()=>nt.utils.selector(o),[]),l=z.useRef(n==="open"),d=z.useRef(!1);return z.useLayoutEffect(()=>{const u=nt.timeline();return i(u,c),l.current&&u.progress(1),()=>{u.kill()}},[]),z.useLayoutEffect(()=>{if(n==="covered"||d.current)return;d.current=!0;const u=nt.timeline({onComplete:t});if(s(u,c),n==="open"){u.progress(1);return}return()=>{u.progress()<1&&(d.current=!1,u.kill())}},[n]),z.useLayoutEffect(()=>{if(!e)return;const u=nt.timeline();return r(u,c),()=>{u.kill()}},[e]),o}const Xu=(n,e,t)=>n.to(e(".s4-sl .dots"),{opacity:0,duration:.3,stagger:.04},t).fromTo(e(".s4-sl .txt"),{opacity:0,y:8},{opacity:1,y:0,duration:.4,stagger:.05},t),qu=(n,e)=>{const t=e(".s4-sl .mk").length;return n.fromTo(e(".s4-sl .mk"),{opacity:0,scale:0},{opacity:1,scale:1,duration:.35,stagger:Math.min(.1,2/Math.max(1,t)),ease:"back.out(2.4)"},0)},Yu=(n,e)=>n.fromTo(e(".s4-sl, .s4-scnt"),{opacity:0,y:14},{opacity:1,y:0,duration:.4,stagger:.05},.6);function wy({inp:n,rows:e,answered:t,revealed:i,checked:s,revealMs:r,video:o}){const{stage:c,epoch:l,judged:d,done:u}=Sy(i,s),f=n.kind==="match"?n.allImgs.slice(0,n.left.length):n.kind==="order"?n.allImgs.slice(0,1):n.kind==="imgopt"?n.allImgs:c==="covered"?n.qImgs:n.aImgs,h=z.useMemo(()=>[...new Set([...n.allImgs,...n.qImgs,...n.aImgs])],[n]),m=wf(h),x=m?f.map(E=>m[h.indexOf(E)]??{w:1200,h:900}):null,M=x?JSON.stringify(f.map((E,b)=>[E,x[b].w,x[b].h])):"",g=z.useMemo(()=>M?JSON.parse(M).map(([E,b,N])=>({src:E,w:b,h:N})):[],[M]),p=e&&e.length?e:null,v=p?`Ответили: ${t} из ${p.length}`:void 0,w=(r+600)/1e3;if(!x)return a.jsx("div",{className:"s1 fo-wait"});const S={stage:c,judged:d,done:u,rows:p,count:v,doneS:w};return n.kind==="match"?a.jsx(Ty,{inp:n,photos:g,...S},l):n.kind==="order"?a.jsx(Ay,{inp:n,photos:g,...S},l):a.jsxs(a.Fragment,{children:[a.jsx(Ey,{inp:n,photos:g,video:o,...S},l),o&&n.kind!=="img"&&a.jsx("div",{className:"s4-vid corner",children:o})]})}function Ey({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,video:c}){const l=t!=="covered",d=z.useRef(n.kind==="img"&&t==="covered"&&e.length===0),u=n.kind,f=z.useMemo(()=>{var w;const v=u==="img"&&l&&c?[{src:"",w:16,h:9,video:!0},...e].slice(0,4):e;return{kind:u,title:n.title,qn:n.qn,qcount:n.qcount,question:n.question,answer:n.answer,options:n.options,correct:u==="imgopt"||u==="mc"?n.options.findIndex(S=>S.key===n.correctKey):-1,photos:u==="img"||u==="imgopt"?v:[],keys:n.options.map(S=>S.key),caption:((w=n.options.find(S=>S.key===n.correctKey))==null?void 0:w.text.trim())??"",note:n.note,captions:n.captions}},[n,e,l,u,!!c]),h=!!r,m=z.useMemo(()=>qM(f,h?0:310),[f,h]),x=z.useMemo(()=>{const v=m.frame.rects.length;return{grow:Array(v).fill(1),reveal:Array(v).fill(1),bloom:Array(v).fill(0),pulse:0}},[m]),M=z.useMemo(()=>HM((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),g=$u(f.answer),p=hc(t,i,s,(v,w)=>{YM(v,w),KM(v,w)},(v,w)=>{const S=u==="text"?{R:.4,k:ld(g)}:u==="img"?{R:0,k:ld(g),lt:.35}:{R:.2,k:.14},{show:E}=QM(v,w,f,x,S,d.current);ZM(v,w,E)},(v,w)=>{JM(v,w,0,Math.min(.2,2.4/Math.max(1,(r==null?void 0:r.length)??1))),v.fromTo(w(".s4-note"),{opacity:0,y:10},{opacity:1,y:0,duration:.5},.2)});return a.jsx(ey,{d:f,ly:m,fs:x,rows:r,phase:uc(t),judged:i,colLay:M,count:o,shown:l,rootRef:p,cls:r?" fg":" fg paper",video:c})}function Ty({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=z.useMemo(()=>({title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,items:n.left.map((v,w)=>e[w]?{kind:"img",src:e[w].src,w:e[w].w,h:e[w].h}:{kind:"txt",text:n.hasAudio?`Трек ${v}`:v}),right:n.right,right_labels:n.right.map((v,w)=>n.rightLabels[w]??""),correct_pairs:n.pairs}),[n,e]),d=z.useMemo(()=>ku((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),u=958-d.lift,f=l.right_labels.some(v=>v.length>60),h=!!r,m=z.useMemo(()=>ry(l,{long:f,lift:d.lift,stripTop:h?u:void 0}),[l,f,d,h,u]),x=l.items.length,M=yy(x,c,x>4?.95:1.25),g=.3+(x-1)*M+1,p=hc(t,i,s,(v,w)=>{ay(v,w),oy(v,w),Yu(v,w)},(v,w)=>{cy(v,w,l,m,{t0:.3,step:M,pairsAt:g}),Xu(v,w,g+.4)},(v,w)=>{qu(v,w)});return a.jsx(ly,{S:l,Ly:m,rev:t!=="covered",done:!1,n:null,rootRef:p,cls:" fg",strip:r?{rows:r,top:u,phase:uc(t),judged:i,lay:d,count:o}:null})}function Ay({inp:n,photos:e,stage:t,judged:i,done:s,rows:r,count:o,doneS:c}){const l=z.useMemo(()=>{var x;return{title:n.title,qn:n.qn,qcount:n.qcount,text:n.question,timer:0,choices:n.options,correct_order:n.correctOrder,media:((x=e[0])==null?void 0:x.src)??null}},[n,e]),d=z.useMemo(()=>ku((r==null?void 0:r.length)??0),[r==null?void 0:r.length]),u=l.choices.some(x=>x.text.length>50),f=z.useMemo(()=>uy(l,{long:u,lift:d.lift}),[l,u,d]),h=by(f.n,c,f.n>5?.85:1),m=hc(t,i,s,(x,M)=>{py(x,M),my(x,M),Yu(x,M)},(x,M)=>{gy(x,M,l,f,{t0:.3,step:h}),Xu(x,M,.3+f.n*h+.2)},(x,M)=>{qu(x,M)});return a.jsx(xy,{S:l,Ly:f,rev:t!=="covered",done:!1,n:null,rootRef:m,cls:" fg",strip:r?{rows:r,top:968-d.lift,phase:uc(t),judged:i,lay:d,count:o}:null})}function Cy(n,e){const t=(r,o)=>{const c=(r??"").trim();if(!c)return null;const l=o?Math.max(0,c.length-3):3;return o?{plain:c.slice(0,l),hot:c.slice(l),first:o}:{plain:c.slice(l),hot:c.slice(0,l),first:o}},i=t(n,!0),s=t(e,!1);return i||s?[i??{plain:"",hot:"",first:!0},s??{plain:"",hot:"",first:!1}]:void 0}const dd=n=>!/\.(mp3|mp4|webm|wav|m4a|ogg)$/i.test(n),Ry=n=>/\.(mp3|wav|m4a|ogg)$/i.test(n);function Ny({round:n,q:e,step:t,answers:i,teams:s,allTeams:r,revealed:o,checked:c,paper:l,revealMs:d,answerText:u,effects:f,video:h,actions:m}){const x=z.useMemo(()=>{var O;const E=e.media.question??[],b=e.media.answer??[],N=E.filter(dd),y=b.filter(dd),A=y.length?y:N,I=!!e.media.hidden&&E.some(H=>/\.(mp4|webm)$/i.test(H)),C=_y(e,n.mechanic,{qImgs:N.length,revealImgs:A.length,video:I}),P=e.answer,F=P.mode==="choice"||P.mode==="order"?P.choices.map(H=>({key:H.key,text:H.text})):[];return{kind:C,title:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qn:t+1,qcount:n.questions.length,question:e.question_text.trim(),answer:u,options:F,correctKey:P.mode==="choice"?P.correct_choice:"",correctOrder:P.mode==="order"?P.correct_order:"",left:P.mode==="match"?P.left:[],right:P.mode==="match"?P.right:[],rightLabels:P.mode==="match"?P.right_labels??[]:[],pairs:P.mode==="match"?P.correct_pairs:[],qImgs:e.media.hidden?[]:N.map(je),aImgs:A.map(je),allImgs:(C==="imgopt"||!e.media.hidden?N:[]).map(je),hasAudio:E.some(Ry),note:((O=e.answer_note)==null?void 0:O.trim())??"",captions:n.mechanic==="rebus"?Cy(e.service.word1,e.service.word2):void 0}},[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),e.answer_note,u,n.mechanic,n.title_lines.join("|"),n.questions.length,t]),{rows:M,answered:g}=My(e,s,r,i,c),p=z.useMemo(()=>Id(e,je,u),[e.id,e.question_text,JSON.stringify(e.media),JSON.stringify(e.answer),u]),[v,w]=z.useState(!0);z.useEffect(()=>{if(!o){w(!0);return}const E=setTimeout(()=>w(!1),1e3);return()=>clearTimeout(E)},[o,e.id]),z.useEffect(()=>{o&&Sf.set({hidden:!1})},[o]);const S=(o?v:!0)&&a.jsx("div",{className:`fo-x ${o?"fo-xout":""}`,children:a.jsx(Dd,{q:p,roundName:n.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Вопрос ${t+1} из ${n.questions.length}`,startedAt:null,seconds:n.timer_seconds,reveal:!1,calm:!0,from:"E",noTimer:!0})});return o?a.jsxs(a.Fragment,{children:[f,S,a.jsx("div",{className:"fo-x fo-xin",children:a.jsx(wy,{inp:x,rows:l?null:M,answered:g,revealed:o,checked:c,revealMs:d,video:h},e.id)}),m]}):a.jsxs(a.Fragment,{children:[f,S,m]})}function v1(){var d,u,f,h;const{gameState:n,loading:e,roomId:t}=ah(),[i,s]=z.useState(null);if(z.useEffect(()=>{n!=null&&n.pack_id?Wh(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),z.useEffect(()=>Rf(),[]),!e&&!t)return a.jsx(oh,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",o=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"",c=(n==null?void 0:n.phase)==="question"?`Q-${((n.round_number+1)*97+n.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null,l=Ld(r)&&(n==null?void 0:n.phase)==="question"&&i?pf((d=i.rounds[n.round_number])==null?void 0:d.questions[n.question_index],(u=i.rounds[n.round_number])==null?void 0:u.mechanic):!1;return a.jsxs(mf,{theme:r,isProjector:!0,phase:n==null?void 0:n.phase,plain:l,paper:((f=i==null?void 0:i.settings)==null?void 0:f.play_mode)==="paper",turn:n?{game_id:n.game_id,phase:n.phase,round_number:n.round_number,question_index:n.question_index}:null,children:[r==="new_year"&&a.jsx(gf,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),a.jsx(Py,{gameState:n,pack:i}),a.jsx(Xp,{theme:r,trigger:o,hud:c}),a.jsx(Lp,{on:Rt(r),phase:n==null?void 0:n.phase}),i&&a.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((h=i.settings)==null?void 0:h.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name}),a.jsx(Ef,{corner:!0})]})}function br({theme:n}){return n==="new_year"?a.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?a.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function ud({theme:n}){return n!=="classic"?null:a.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[a.jsx("span",{className:"cd-line"}),a.jsx("span",{className:"cd-chip",children:"◆"}),a.jsx("span",{className:"cd-line"})]})}function Py({gameState:n,pack:e}){var w,S,E,b,N,y,A,I;const[t,i]=z.useState([]),[s,r]=z.useState("");z.useEffect(()=>{$h().then(i).catch(()=>i([]))},[]);const o=Un((n==null?void 0:n.game_id)??null),c=z.useMemo(()=>tm(o),[o]),l=z.useMemo(()=>{const C=`${location.origin}${location.pathname}#/player?room=${Xh()??""}`;return n!=null&&n.pack_id?`${C}&pack=${n.pack_id}`:C},[n==null?void 0:n.pack_id]),d=((n==null?void 0:n.random_groups)??[]).filter(C=>Array.isArray(C)&&C.length>0),u=d.map(C=>C.join(",")).join("|"),[f,h]=z.useState(!0);z.useEffect(()=>{h(!0)},[u]);const m=d.length>0&&f;Vy((w=e==null?void 0:e.rounds)==null?void 0:w[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0);const x=((E=(S=e==null?void 0:e.rounds)==null?void 0:S[(n==null?void 0:n.round_number)??0])==null?void 0:E.mechanic)==="race"||((N=(b=e==null?void 0:e.rounds)==null?void 0:b[((n==null?void 0:n.round_number)??0)+1])==null?void 0:N.mechanic)==="race";if(z.useEffect(()=>{x&&Af("/quiz-party/")},[x]),Wy(e,(n==null?void 0:n.round_number)??0),!n)return a.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const M=((y=e==null?void 0:e.settings)==null?void 0:y.play_mode)==="paper",g=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&er()},children:"⟲ Сменить пакет"}),a.jsx("button",{onClick:()=>{var C,P;return void Kh({intro:!!((C=e==null?void 0:e.settings)!=null&&C.show_intro),slide:Lc((P=e==null?void 0:e.settings)==null?void 0:P.info_slides,0)??void 0},_t(n)).catch(vt)},children:"К первому раунду →"})]});if(n.phase==="lobby"&&n.pack_id&&e&&Rt(e.theme))return a.jsxs(a.Fragment,{children:[a.jsx(Gc,{pack:e}),a.jsx(Jf,{teams:c.map(C=>({id:C.id,name:C.name,color:C.color,alive:Dr(C)})),playerUrl:l,paper:M,groups:d,groupsOpen:f,onGroupsOpen:()=>h(!0),onGroupsClose:()=>h(!1)}),g]});if(n.phase==="lobby"||!n.pack_id||!e)return a.jsxs("div",{className:`host-screen grid-bg lobby-screen${M?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&a.jsx(Gc,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?a.jsxs("div",{className:"cyber-lobby-head",children:[a.jsx(gd,{side:"left"}),a.jsxs("div",{className:"clh-title",children:[a.jsx(Cn,{theme:"classic",lines:["QUIZ","PARTY"]}),a.jsx(ud,{theme:"classic"})]}),a.jsx(gd,{side:"right"})]}):a.jsxs(a.Fragment,{children:[a.jsx(Cn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),a.jsx(br,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?a.jsxs(a.Fragment,{children:[m&&a.jsx(Gy,{groups:d,book:(e==null?void 0:e.theme)==="ny_book",onClose:()=>h(!1)}),d.length>0&&!f&&a.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>h(!0),children:"СОСТАВЫ КОМАНД"}),Ld(e==null?void 0:e.theme)?a.jsx(Fp,{theme:e.theme,showQr:!M,lit:m,playerUrl:l,teams:c.map(C=>({id:C.id,name:C.name,icon:C.icon,color:C.color,alive:Dr(C)}))}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"lobby-teams",children:[o.length>0&&a.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",o.length,")"]}),o.length===0?M?null:a.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):c.map(C=>a.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":C.color,opacity:Dr(C)?1:.4},children:[C.icon&&a.jsx("span",{className:"lobby-team-icon",children:C.icon}),C.name]},C.id))]}),!M&&a.jsx(ur,{className:`lobby-qr-corner${m?" lobby-qr-lit":""}`,value:l,title:"QR для подключения"}),!M&&m&&a.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"})]}),g]}):a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[a.jsxs("select",{value:s,onChange:C=>r(C.target.value),style:{fontSize:"1.2rem"},children:[a.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(C=>a.jsxs("option",{value:C.id,children:[C.name," (",C.status==="ready"?"готов":C.status==="played"?"сыгран":C.status,")"]},C.id))]}),a.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const C=t.find(P=>P.id===s);C&&C.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||qh(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return a.jsx(_M,{onDone:()=>{var C;Yh(0,Lc((C=e==null?void 0:e.settings)==null?void 0:C.info_slides,0)??void 0)}});const p=e.rounds[n.round_number];if(!p)return a.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const v=p.questions[n.question_index];if(n.phase==="round_intro"){const C=p.settings.grid,P=a.jsx("div",{className:"host-actions",children:p.mechanic==="anagram"?a.jsx(Iy,{round:p,gameState:n}):a.jsx("button",{onClick:()=>void fi(0,_t(n)).catch(vt),children:p.mechanic==="jeopardy"?"Начать раунд →":p.mechanic==="race"?"К скачкам →":p.mechanic==="melody"?"К трекам →":p.mechanic==="four_pics"||p.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})});return Rt(e.theme)?a.jsxs(a.Fragment,{children:[p.rules_audio&&a.jsx("audio",{autoPlay:!0,src:je(p.rules_audio)}),a.jsx(Cp,{kind:ap(p.mechanic),intro:{num:Kt(e,n.round_number),titleLines:p.title_lines,meta:ys(p),rules:p.rules}}),P]}):a.jsxs("div",{className:"host-screen grid-bg round-intro",children:[p.rules_audio&&a.jsx("audio",{autoPlay:!0,src:je(p.rules_audio)}),e.theme==="potter"&&a.jsx("div",{className:"mg-veil","aria-hidden":!0}),p.mechanic==="crossword"&&C&&e.theme==="ny_book"?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"round-badge",children:a.jsx("span",{className:"rb-num",children:Kt(e,n.round_number)})}),a.jsxs("div",{className:"bk-cw",children:[a.jsxs("div",{className:"bk-cw-left",children:[a.jsx(Xc,{lines:p.title_lines,size:"sm"}),a.jsx("div",{className:"meta-line",children:ys(p)}),a.jsx("div",{className:"bk-cw-grid",children:a.jsx(jc,{grid:C,cellSize:(()=>{const F=Math.min(innerWidth/1920,innerHeight/1080);return Math.max(10,Math.floor(Math.min(640*F/C.cols,350*F/C.rows,64*F)))})()})})]}),a.jsx("div",{className:"bk-cw-right",children:p.rules.length>0&&a.jsx(Wr,{rules:p.rules,minScale:.3,delay:F=>.5+F*.6})})]})]}):p.mechanic==="crossword"&&C?a.jsxs("div",{className:"cw-layout",children:[a.jsx(jc,{grid:C,cellSize:e.theme==="ny_book"?Math.max(24,Math.min(68,Math.floor(Math.min(innerWidth*.3/C.cols,innerHeight*.55/C.rows)))):Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/C.cols,innerHeight*.8/C.rows))))}),a.jsxs("div",{className:"side",children:[a.jsx("div",{className:"round-badge",children:a.jsx("span",{className:"rb-num",children:Kt(e,n.round_number)})}),a.jsx(Cn,{theme:e.theme,lines:p.title_lines}),a.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:ys(p)}),e.theme==="ny_book"?p.rules.length>0&&a.jsx(Wr,{rules:p.rules,minScale:.3,delay:F=>.5+F*.6}):p.rules.map((F,O)=>a.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+O*.5}s`},children:[a.jsx("span",{className:"idx",children:String(O+1).padStart(2,"0")}),F]},O))]})]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"round-badge",children:a.jsx("span",{className:"rb-num",children:Kt(e,n.round_number)})}),a.jsxs("div",{className:"ri-main",children:[e.theme==="ny_book"?a.jsx(Xc,{lines:p.title_lines}):a.jsx(Cn,{theme:e.theme,lines:p.title_lines}),a.jsx(br,{theme:e.theme}),a.jsx(ud,{theme:e.theme}),a.jsx("div",{className:"meta-line",children:ys(p)})]}),p.rules.length>0&&a.jsx(Wr,{rules:p.rules,minScale:e.theme==="ny_book"?.3:.5,delay:F=>(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+F*.7})]}),P]})}if(n.phase==="question"&&p.mechanic==="sprint")return Rt(e.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Rc,{pack:e,round:p,gameState:n,timerNode:null}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void hs(0,!1,_t(n)).catch(vt),children:"К ответам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsx(Rc,{pack:e,round:p,gameState:n,timerNode:a.jsx(cs,{startedAt:n.timer_started_at,seconds:p.timer_seconds,theme:e.theme})}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{className:"ghost dark",onClick:()=>void hs(0,!1,_t(n)).catch(vt),children:"К ответам →"})})]});if(n.phase==="question"&&p.mechanic==="blitz")return a.jsx(Yy,{pack:e,round:p,gameState:n});if(n.phase==="question"&&p.mechanic==="race")return a.jsx(Mh,{pack:e,round:p,gameState:n},`${n.game_id}-${n.round_number}`);if(n.phase==="question"&&p.mechanic==="melody")return a.jsx(yh,{pack:e,round:p,gameState:n});if(n.phase==="question"&&p.mechanic==="four_pics")return a.jsx(bh,{pack:e,round:p,gameState:n,timerNode:(C,P,F)=>{var O,H;return a.jsx(cs,{startedAt:((H=(O=n.melody)==null?void 0:O.rv)==null?void 0:H.startedAt)??null,seconds:C,theme:e.theme,chime:F},P)}});if(n.phase==="question"&&p.mechanic==="jeopardy")return a.jsx(Sh,{pack:e,round:p,gameState:n});if(n.phase==="question"&&p.mechanic==="anagram"&&v){const C=n.question_index+1>=p.questions.length;return a.jsx(wh,{pack:e,round:p,roundIdx:n.round_number,q:v,qIndex:n.question_index,qCount:p.questions.length,gameState:n,timerSlot:n.reveal&&!n.timer_started_at?null:a.jsx(cs,{startedAt:n.timer_started_at,seconds:p.timer_seconds,theme:e.theme},v.id),effectsSlot:a.jsxs(a.Fragment,{children:[!(n.reveal&&!n.timer_started_at)&&a.jsx(xd,{startedAt:n.timer_started_at,seconds:p.timer_seconds,q:v,round:p,pack:e,timerRunning:!!n.timer_started_at,manual:M,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(Md,{round:p,gameState:n,isLast:C}),a.jsx(vd,{enabled:!n.reveal,startedAt:n.timer_started_at,seconds:p.timer_seconds,from:_t(n)})]}),actionsSlot:a.jsx(Ly,{pack:e,round:p,gameState:n})},v.id)}if(n.phase==="question"&&v){const C=!!n.timer_started_at&&(St()-new Date(n.timer_started_at).getTime())/1e3>p.timer_seconds-10,P=((A=e.settings)!=null&&A.answers_reveal&&p.answers_reveal==="after_question",p.answers_reveal??"after_round"),F=p.mechanic!=="jeopardy"&&a.jsxs(a.Fragment,{children:[a.jsx(xd,{startedAt:n.timer_started_at,seconds:p.timer_seconds,q:v,round:p,pack:e,timerRunning:!!n.timer_started_at,manual:M,gameId:n.game_id,roundNumber:n.round_number}),a.jsx(Md,{round:p,gameState:n,isLast:n.question_index+1>=p.questions.length}),a.jsx(vd,{enabled:P==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:p.timer_seconds,from:_t(n)})]}),O=a.jsxs("div",{className:"host-actions",children:[a.jsx(Dy,{gameState:n}),(P==="after_question"||p.mechanic==="jeopardy")&&!n.reveal&&a.jsx("button",{onClick:()=>void Gi(),children:"Показать ответ"}),n.question_index+1<p.questions.length?a.jsx("button",{onClick:()=>void fi(n.question_index+1,_t(n)).catch(vt),children:"Дальше →"}):P==="after_round"?a.jsx("button",{onClick:()=>void Nd(_t(n)).catch(vt),children:"Время ответов →"}):a.jsx(Ln,{pack:e,gameState:n})]});return p.mechanic==="crossword"&&Rt(e.theme)&&cc(p)?a.jsx(jM,{pack:e,round:p,q:v,qIndex:n.question_index,qCount:p.questions.length,gameState:n,effectsSlot:F,actionsSlot:O},v.id):a.jsx(wd,{pack:e,round:p,roundIdx:n.round_number,q:v,qIndex:n.question_index,qCount:p.questions.length,timeLow:C,reveal:n.reveal,timerRunning:!!n.timer_started_at,timerStartedAt:n.timer_started_at,timerSlot:p.mechanic!=="jeopardy"&&a.jsx(cs,{startedAt:n.timer_started_at,seconds:p.timer_seconds,theme:e.theme},v.id),effectsSlot:F,actionsSlot:O})}if(n.phase==="info"){const C=((I=e==null?void 0:e.settings)==null?void 0:I.info_slides)??[],P=C[n.question_index]??C[0];if(P)return a.jsx($y,{pack:e,slide:P,packId:n.pack_id,gameState:n})}return n.phase==="recap"?a.jsx(Hy,{pack:e,round:p,gameState:n}):n.phase==="answer_time"?a.jsx(Ky,{pack:e,round:p,gameState:n}):n.phase==="show_answers"&&v?a.jsx(Zy,{pack:e,round:p,q:v,gameState:n}):n.phase==="scoreboard"?a.jsx(e1,{pack:e,gameState:n}):n.phase==="break"?a.jsx(t1,{pack:e,round:p,gameState:n}):n.phase==="counting"?a.jsx(n1,{pack:e,gameState:n}):n.phase==="finale"?a.jsx(i1,{pack:e,gameId:n.game_id,gameState:n}):a.jsxs("div",{className:"host-screen grid-bg",children:[a.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!v&&a.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void Er("round_intro"),children:"← К титулу раунда"})})]})}function Ly({pack:n,round:e,gameState:t}){var h,m;const i=rf(),s=Td(t.game_id),r=Pd(s,e.questions),o=Un(t.game_id),c=Xi(t.game_id,t.round_number),l=af(o,c,((h=e.questions[t.question_index])==null?void 0:h.id)??"",((m=n.settings)==null?void 0:m.play_mode)==="paper"),d=Oc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:St(),wasRun:r,allAnswered:l}),u=()=>{const x=lf(t.question_index),M=_t(t);(x.kind==="shown"?ka(x.index,M):Er("round_intro",M)).catch(vt)},f=()=>{const x=Oc({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:St(),wasRun:r,allAnswered:l});if(x.kind==="wait")return i.show(x.text);const M=_t(t);if(x.kind==="reveal")return void Gi(M).catch(vt);if(x.kind==="next")return void(x.shown?ka(x.index,M):fi(x.index,M)).catch(vt)};return a.jsxs("div",{className:"host-actions",children:[a.jsx(of,{text:i.text}),a.jsx("button",{className:"ghost",onClick:u,children:t.question_index>0?"← Назад":"← К титулу"}),!t.reveal&&a.jsx("button",{onClick:()=>void Gi(_t(t)).catch(vt),children:"Показать ответ"}),d.kind==="afterRound"?a.jsx(Ln,{pack:n,gameState:t}):a.jsx("button",{onClick:f,children:"Дальше →"})]})}function Iy({round:n,gameState:e}){const t=Td(e.game_id),i=Zh(Pd(t,n.questions));return a.jsx("button",{onClick:()=>void(i.shown?ka(0,_t(e)):fi(0,_t(e))).catch(vt),children:"Первый вопрос →"})}function Dy({gameState:n}){return n.question_index>0?a.jsx("button",{className:"ghost",onClick:()=>void fi(n.question_index-1,_t(n)).catch(vt),children:"← Назад"}):a.jsx("button",{className:"ghost",onClick:()=>void Er("round_intro",_t(n)).catch(vt),children:"← К титулу"})}function Uy(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const Cn=z.forwardRef(function({theme:e,lines:t},i){const s=Uy(t),r=t.join(`
`),o=Eh(r,e==="classic"),c=e==="classic"?o.split(`
`):t;if(e!=="new_year")return a.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((d,u)=>a.jsxs("span",{style:u===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[c[u]??d,a.jsx("br",{})]},u))});let l=0;return a.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((d,u)=>a.jsx("span",{style:{display:"block"},children:[...d].map((f,h)=>f===" "?a.jsx("span",{children:" "},h):a.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*l++}s`},children:f},h))},u))})});function Fy(){vh()}function Oy(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?a.jsxs(a.Fragment,{children:[s,a.jsx("b",{className:"rebus-hot",children:r})]}):a.jsxs(a.Fragment,{children:[a.jsx("b",{className:"rebus-hot",children:r}),s]})}function By(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}const ky=5e3,Ku=3300,zy=500,jy=900,hd=100,fd=600,pd=500;function md(n){const e=n.answer;return e.mode==="choice"?Ku+zy+jy:e.mode==="match"?hd+fd*Math.max(0,Math.min(e.left.length,6)-1)+pd:e.mode==="order"?hd+fd*Math.max(0,e.correct_order.length-1)+pd:1200}function Fa({src:n}){const e=z.useRef(null);return z.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),a.jsx("div",{className:"reveal-video",children:a.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Zu(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function gd({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return a.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[a.jsx("span",{className:"cp-bar"}),a.jsx("div",{className:"cp-rows",children:e.map((t,i)=>a.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),a.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>a.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function Gy({groups:n,onClose:e,book:t}){z.useEffect(()=>{const s=r=>{r.key==="Escape"&&e()};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[e]);const i=n.reduce((s,r)=>s+r.length,0);return a.jsx("div",{className:"groups-overlay",onClick:e,children:a.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:s=>s.stopPropagation(),children:[a.jsxs("div",{className:"gm-head",children:[a.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",i," чел."]}),a.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),a.jsx("div",{className:"lg-list",children:n.map((s,r)=>a.jsxs("div",{className:"lg-team",children:[t?a.jsx("div",{className:"lg-name bk-lg",children:a.jsx(Tn,{name:`Команда ${r+1}`,ch:54,color:dr(r)})}):a.jsxs("div",{className:"lg-name",style:{color:dr(r)},children:["Команда ",r+1]}),a.jsx("div",{className:"lg-players",children:s.join(" · ")})]},r))})]})})}function Hy({pack:n,round:e,gameState:t}){const i=z.useMemo(()=>e.questions.filter(m=>!m.hidden),[e.questions]),[s,r]=z.useState(0),o=i[s],c=s+1>=i.length,l=()=>void Nd({phase:"recap",round_number:t.round_number}).catch(vt),d=()=>{c?l():r(m=>m+1)};if(z.useEffect(()=>{if(!o){l();return}let m=!0;const x=()=>{m&&d()},M=setTimeout(x,ky),g=o.media.voice;if(!g)return()=>{m=!1,clearTimeout(M)};let p=!1;const v=en();v.src=je(g),v.play().then(()=>{if(p)try{v.pause(),v.src=""}catch{}}).catch(()=>{});const w=()=>{clearTimeout(M),x()};return v.addEventListener("ended",w),()=>{m=!1,p=!0,clearTimeout(M),v.removeEventListener("ended",w);try{v.pause(),v.src=""}catch{}}},[s,o==null?void 0:o.id]),!o)return null;const u=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost",onClick:l,children:"Пропустить повтор"}),a.jsx("button",{onClick:d,children:c?"К ответам →":"Следующий →"})]});if(Rt(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(Pp,{q:o,roundName:e.title_lines.join(" ").replace(/\s+/g," ").trim(),qno:`Повтор вопросов · ${s+1} из ${i.length}`,seconds:e.timer_seconds},o.id),u]});const f=(o.media.question??[]).filter(m=>!/\.(mp3|wav|mp4|webm)$/i.test(m)),h=!!o.question_text.trim();return a.jsxs("div",{className:`host-screen grid-bg recap-screen${f.length?" has-media":""}${h?"":" no-qtext"}`,children:[a.jsxs("div",{className:"host-topbar",children:[a.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),a.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),a.jsxs("div",{className:"recap-body",children:[h&&a.jsx("p",{className:`q-text${Ba(o.question_text)}`,children:o.question_text}),f.length>0&&a.jsx("div",{className:`q-media-grid n${Math.min(f.length,4)}${f.length>1?" eq-row":""}${f.length>4?" wrap2":""}`,style:Ad(o),children:f.map((m,x)=>a.jsx(Oa,{src:je(m)},x))})]},o.id),a.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((m,x)=>a.jsx("i",{className:x===s?"on":x<s?"done":""},x))}),u]})}function Vy(n,e){z.useEffect(()=>{if(!n)return;const i=n.questions.filter(o=>!o.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const o of s){const c=je(o);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(o)){const l=document.createElement(/\.(mp4|webm)$/i.test(o)?"video":"audio");l.preload="auto",l.src=c,r.push(l)}else{const l=new Image;l.src=c,r.push(l)}}return()=>{for(const o of r)try{o.src=""}catch{}}},[n,e])}function Wy(n,e){z.useEffect(()=>{if(!n)return;const t=[n.rounds[e],n.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const i=[...Oh({id:n.id,rounds:t})];return Bh(i),()=>kh(i)},[n,e])}function $y({pack:n,slide:e,packId:t,gameState:i}){var f,h;const s=n.rounds.filter(m=>!m.off_scoreboard).map(m=>({id:m.id,name:(m.title_lines??[]).join(" ")||"—",count:m.questions.filter(x=>!x.hidden).length})),r=Un(i.game_id),o=Ch(n,r.length),c=Rt(n.theme),l=c&&(e.images??[]).length===1?[je(e.images[0])]:[],d=Rh(l),u=a.jsx("div",{className:"host-actions",children:a.jsx(qy,{slides:((f=n.settings)==null?void 0:f.info_slides)??[],index:Xy(n,e),packId:t,paper:((h=n.settings)==null?void 0:h.play_mode)==="paper"})});if(c){const m=ep({slide:e,rounds:s,stats:o,image:l.length?{src:l[0],...d.sizes[0]}:null});if(m)return a.jsxs(a.Fragment,{children:[l.length&&!d.ready?null:a.jsx(Ap,{view:m}),u]})}return a.jsxs(a.Fragment,{children:[a.jsx(Nh,{slide:e,rounds:s,stats:o,mediaUrl:je}),u]})}function Xy(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function qy({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return a.jsxs(a.Fragment,{children:[e>0&&a.jsx("button",{className:"ghost",onClick:()=>void ii(e-1),children:"← Назад"}),e+1<n.length&&a.jsx("button",{className:"ghost",onClick:()=>void ii(e+1),children:"Дальше →"}),s?i?a.jsx("button",{onClick:()=>void df(),children:"К подсчёту →"}):a.jsx("button",{onClick:()=>void za(t),children:"К итогам →"}):a.jsx("button",{onClick:()=>void Er("round_intro"),children:"К раунду →"})]})}function Yy({pack:n,round:e,gameState:t}){var p;const{state:i,setState:s}=ch(t.game_id,t.round_number),r=Un(t.game_id),o=Xi(t.game_id,t.round_number,400),c=z.useMemo(()=>e.questions.map(v=>({id:v.id,hidden:v.hidden})),[e.questions]),l=e.settings;z.useEffect(()=>{var E;const v=l.bg_music??((E=n.settings)==null?void 0:E.bg_music);if(!v)return;let w=!1;const S=en();return S.src=je(v),S.loop=!0,S.volume=.6,S.play().then(()=>{if(w)try{S.pause(),S.src=""}catch{}}).catch(()=>{}),()=>{w=!0;try{S.pause(),S.src=""}catch{}}},[e.id,l.bg_music,(p=n.settings)==null?void 0:p.bg_music]);const d=z.useRef(!1),u=async v=>{if(!d.current){d.current=!0,s(v);try{await lh(t.game_id,t.round_number,v),v.finished&&!(i!=null&&i.finished)&&(await dh(t.game_id,t.round_number,Ic(Fc(v),l.timeoutPenalty??10)),jh(e.id,Gh(i,v)).catch(w=>console.warn("банк блица: неотыгранные не вернулись —",w instanceof Error?w.message:w)))}finally{d.current=!1}}};z.useEffect(()=>{if(i||r.length<2)return;const v=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(S=>S.id);u(Jh(w,l.teamSeconds??60))},3e3);return()=>clearTimeout(v)},[i,r.length]),z.useEffect(()=>{if(!i||i.finished||i.current)return;const v=setTimeout(()=>{const w=Qh(c,i.used);if(!w)return void u(Ur(i));zh(w.id).catch(()=>{}),u(ef(i,w.id,St()))},Dc);return()=>clearTimeout(v)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const f=i==null?void 0:i.current,h=f?e.questions.find(v=>v.id===f.questionId):void 0,m=i?tf(i):void 0;z.useEffect(()=>{if(!i||!f||!h||!m)return;const v=o.find(S=>S.team_id===m&&S.question_ref===`q-${h.id}`);if(!(v!=null&&v.answer_text)||f.lastAnswer===v.answer_text)return;if(v.answer_text===nf){u(Fr(bs(i,St()),St()));return}const w=ci(h.answer,v.answer_text)===!0;u(sf(i,St(),w?"ok":"no",v.answer_text))},[o,f==null?void 0:f.questionId,f==null?void 0:f.lastAnswer]);const x=(f==null?void 0:f.verdict)==="no"&&f.attempts+1>=Uc;if(z.useEffect(()=>{if(!i||!(f!=null&&f.verdict))return;const w=Math.max(0,(x?cf:Dc)-(St()-(f.pausedAt??St()))),S=setTimeout(()=>{const E=St(),b=bs(i,E),N=o.find(y=>y.team_id===m&&y.question_ref===`q-${f.questionId}`);N&&Ud.patchAnswer(N.id,{is_correct:f.verdict==="ok"}).catch(()=>{}),u(f.verdict==="ok"?Or(b,E):Br(b,E))},w);return()=>clearTimeout(S)},[f==null?void 0:f.verdict,f==null?void 0:f.lastAnswer]),Rt(n.theme))return a.jsxs(a.Fragment,{children:[a.jsx(Th,{state:i,teams:r,bank:c,teamSeconds:l.teamSeconds??60,penalty:l.timeoutPenalty??10,question:v=>{const w=e.questions.find(S=>S.id===v);return w?{text:w.question_text,answer:wn(w)}:void 0}}),a.jsx("div",{className:"host-actions",children:i!=null&&i.finished?a.jsx(Ln,{pack:n,gameState:t}):i&&a.jsxs(a.Fragment,{children:[(f==null?void 0:f.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const v=St(),w=bs(i,v);u(f.verdict==="ok"?Br(w,v):Or(w,v))},children:["Исправить на «",f.verdict==="ok"?"неверно":"верно","»"]}),f&&f.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void u(Fr(i,St())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&u(Ur(i))},children:"Завершить раунд"})]})})]});if(!i)return a.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[a.jsx("div",{className:"host-topbar",children:a.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),a.jsx(Nc,{teams:r,rolling:!0,book:n.theme==="ny_book"})]});if(i.finished){const v=Ic(Fc(i),l.timeoutPenalty??10);return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),a.jsxs("table",{className:"score-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),a.jsx("th",{children:"Очки"}),a.jsx("th",{children:"Баллы"})]})}),a.jsx("tbody",{children:v.map(w=>{var S;return a.jsxs("tr",{children:[a.jsxs("td",{children:[w.place,w.shared?"=":""]}),a.jsx("td",{children:((S=r.find(E=>E.id===w.teamId))==null?void 0:S.name)??"—"}),a.jsx("td",{children:w.points}),a.jsx("td",{children:w.score})]},w.teamId)})})]}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:t})})]})}const M=i.current!=null||Object.values(i.correct).some(v=>v>0)||Object.values(i.missed).some(v=>v>0),g=!f&&i.lastReveal?(()=>{const v=e.questions.find(w=>w.id===i.lastReveal.questionId);if(v)return{questionText:v.question_text,answerText:wn(v),verdict:i.lastReveal.verdict}})():void 0;return a.jsxs(a.Fragment,{children:[a.jsx(Ah,{book:n.theme==="ny_book",teams:r,state:i,bank:c,questionText:h==null?void 0:h.question_text,verdict:f==null?void 0:f.verdict,reveal:g,answerText:(f==null?void 0:f.verdict)==="ok"||(f==null?void 0:f.verdict)==="no"&&f.attempts+1>=Uc?wn(h):void 0,dice:M?void 0:a.jsx(Nc,{teams:r,rolling:!1,pickedId:i.order[0],book:n.theme==="ny_book"})}),a.jsxs("div",{className:"host-actions",children:[(f==null?void 0:f.verdict)&&a.jsxs("button",{className:"ghost",onClick:()=>{const v=St(),w=bs(i,v);u(f.verdict==="ok"?Br(w,v):Or(w,v))},children:["Исправить на «",f.verdict==="ok"?"неверно":"верно","»"]}),f&&f.verdict!=="ok"&&a.jsx("button",{className:"ghost",onClick:()=>void u(Fr(i,St())),children:"Скип −1"}),a.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&u(Ur(i))},children:"Завершить раунд"})]})]})}function xd({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:o=!1,gameId:c,roundNumber:l}){const d=(n.media.question??[]).some(m=>/\.(mp3|mp4|webm|wav)$/i.test(m)),u=z.useRef(null),f=z.useRef(null),h=z.useRef(!1);return z.useEffect(()=>{if(Fy(),o&&!d||t)return;let m=!1;const x=(n.media.question??[]).find(p=>/\.(mp3|wav|m4a|ogg)$/i.test(p));h.current=!1;const M=()=>{if(!m){if(h.current=!0,x){const p=en();p.src=je(x),f.current=p,p.play().catch(()=>{})}Bc(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){M();return}const g=en();return g.src=je(n.media.voice),u.current=g,g.onended=M,g.onerror=M,g.play().then(()=>{if(m)try{g.pause(),g.src=""}catch{}}).catch(M),()=>{var v;m=!0;const p=u.current;if(p){p.onended=null,p.onerror=null;try{p.pause(),p.src=""}catch{}}u.current=null,(v=f.current)==null||v.pause()}},[n.id,o]),z.useEffect(()=>{if(!o||!t||d)return;let m=!1;const x=(n.media.question??[]).find(g=>/\.(mp3|wav|m4a|ogg)$/i.test(g)),M=()=>{if(m||!x)return;const g=en();g.src=je(x),f.current=g,g.play().catch(()=>{})};if(n.media.voice){const g=en();g.src=je(n.media.voice),u.current=g,g.onended=M,g.onerror=M,g.play().then(()=>{if(m)try{g.pause(),g.src=""}catch{}}).catch(M)}else M();return()=>{var p;m=!0;const g=u.current;if(g){g.onended=null,g.onerror=null;try{g.pause(),g.src=""}catch{}}u.current=null,(p=f.current)==null||p.pause()}},[n.id,o,t]),z.useEffect(()=>{if(t||o)return;const m=setInterval(()=>{if(t)return;const x=u.current;x&&!x.paused&&!x.ended||Bc(c&&l!=null?{gameId:c,roundNumber:l,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(m)},[n.id,t,o]),z.useEffect(()=>{var S;const m=e.settings.bg_music??((S=i==null?void 0:i.settings)==null?void 0:S.bg_music);if(!t||!m||d)return;let x=!1;const M=en();M.src=je(m),M.loop=!0,M.volume=.6,M.play().then(()=>{if(x)try{M.pause(),M.src=""}catch{}}).catch(()=>{});let g;const p=(r??e.timer_seconds??60)*1e3,v=s?p-(St()-new Date(s).getTime()):p,w=window.setTimeout(()=>{g=window.setInterval(()=>{M.volume=Math.max(0,M.volume-.1),M.volume<=.01&&(g&&clearInterval(g),M.pause())},80)},Math.max(0,v)+3e3);return()=>{x=!0,clearTimeout(w),g&&clearInterval(g);try{M.pause(),M.src=""}catch{}}},[t,n.id]),null}function Ky({pack:n,round:e,gameState:t}){var d;const i=e.settings.answerTimeSeconds??60,s=((d=n.settings)==null?void 0:d.play_mode)==="paper",r=Un(t.game_id),o=Xi(t.game_id,t.round_number),c=e.questions.filter(u=>!u.hidden).length;z.useEffect(()=>{var m;const u=e.settings.bg_music??((m=n.settings)==null?void 0:m.bg_music);if(!u)return;let f=!1;const h=en();return h.src=je(u),h.loop=!0,h.volume=.6,h.play().then(()=>{if(f)try{h.pause(),h.src=""}catch{}}).catch(()=>{}),()=>{f=!0;try{h.pause(),h.src=""}catch{}}},[e.id]);const l=a.jsxs("div",{className:"host-actions",children:[a.jsx("button",{className:"ghost dark",onClick:()=>void fi(e.questions.length-1,_t(t)).catch(vt),children:"← Назад"}),a.jsx("button",{onClick:()=>void hs(0,!1,_t(t)).catch(vt),children:"К ответам →"})]});return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Np,{num:Kt(n,t.round_number),paper:s,startedAt:t.timer_started_at,seconds:i,teams:s?null:r.map(u=>{const f=o.filter(h=>{var m;return h.team_id===u.id&&((m=h.answer_text)==null?void 0:m.trim())}).length;return{id:u.id,name:u.name,color:oi(u.color),got:f,total:c,done:f>=c}})}),l]}):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[a.jsxs("div",{className:"mono-tag",children:["РАУНД ",Kt(n,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),a.jsx("div",{className:"answer-pulse",children:a.jsx(Cn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),a.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),a.jsx(cs,{startedAt:t.timer_started_at,seconds:i,theme:n.theme,variant:"ring"}),!s&&a.jsx("div",{className:"answer-time-teams",children:r.map(u=>{const f=o.filter(m=>{var x;return m.team_id===u.id&&((x=m.answer_text)==null?void 0:x.trim())}).length,h=f>=c;return n.theme==="ny_book"?a.jsx("div",{className:"at-team bk-at",children:a.jsx(Tn,{name:u.name,ch:74,color:u.color,score:`${f}/${c}`,state:h?"selected":f===0?"none":"normal"})},u.id):a.jsxs("div",{className:`at-team${h?" done":""}`,children:[a.jsx("span",{style:{color:u.color},children:u.name})," · ",f,"/",c]},u.id)})}),l]})}function Zy({pack:n,round:e,q:t,gameState:i}){var I;const s=((I=n.settings)==null?void 0:I.play_mode)==="paper",r=Xi(i.game_id,i.round_number),o=i.reveal,c=Un(i.game_id),[l,d]=z.useState([]);z.useEffect(()=>{rh.from("teams").select("id,name,color").then(({data:C})=>d(C??[]))},[]);const u=r.filter(C=>C.question_ref===`q-${t.id}`),f=e.questions.length,h=i.question_index,m=z.useRef(xf);m.current=_f(m.current,`${i.game_id}:${i.round_number}:${h}`,o);const x=m.current.live,M=n.theme==="ny_book";z.useEffect(()=>{if(o)return;const C=_t(i),P=setTimeout(()=>{Gi(C).catch(vt)},3e3);return()=>clearTimeout(P)},[o,h]);const[g,p]=z.useState(!1);z.useEffect(()=>{if(p(!1),!o)return;const C=setTimeout(()=>p(!0),md(t)+600);return()=>clearTimeout(C)},[o,t.id]),z.useEffect(()=>{!g||document.hidden||u.forEach(C=>{if(C.is_correct!=null)return;const P=ci(t.answer,C.answer_text);P!==null&&Ud.patchAnswer(C.id,{is_correct:P}).catch(()=>{})})},[g,h,u.length,u.map(C=>C.answer_text).join("|")]);const v=t.answer.mode==="choice"?t.answer.choices:null,w=(t.media.question??[]).filter(C=>!/\.(mp3|mp4|webm|wav)$/i.test(C)),{answerImgs:S,questionImgs:E,revealImgs:b}=Ph(t.media),N=t.media.hidden?(t.media.question??[]).find(C=>/\.(mp4|webm)$/i.test(C)):void 0,y=(t.media.answer??[]).find(C=>/\.(mp3|wav|m4a|ogg)$/i.test(C)),A=a.jsxs("div",{className:"host-actions",children:[h>0&&a.jsx("button",{className:"ghost",onClick:()=>void hs(h-1,!0,_t(i)).catch(vt),children:"← Назад"}),o?h<f-1?a.jsx("button",{onClick:()=>void hs(h+1,!1,_t(i)).catch(vt),children:"Следующий вопрос →"}):a.jsx(Ln,{pack:n,gameState:i}):a.jsx("button",{onClick:()=>void Gi(_t(i)).catch(vt),children:"Показать ответ →"})]});if(e.mechanic==="crossword"&&Rt(n.theme)&&cc(e))return a.jsx(GM,{pack:n,round:e,q:t,step:h,answers:r,teams:c,allTeams:l,revealed:o,checked:g,paper:s,effects:o&&y?a.jsx(Ui,{src:je(y)}):null,video:o&&N?a.jsx(Fa,{src:je(N)}):void 0,imgs:o?b:t.media.hidden?[]:E,actions:A},t.id);if(Rt(n.theme)&&e.mechanic==="sprint")return a.jsxs(a.Fragment,{children:[a.jsx(Lh,{title:e.title_lines.join(" "),count:f,step:h,q:{text:t.question_text,answer:wn(t)},shown:o,verdicts:g,answers:s?null:u.map(C=>{const P=c.find(F=>F.id===C.team_id)??l.find(F=>F.id===C.team_id);return{team:(P==null?void 0:P.name)??"—",color:oi(P==null?void 0:P.color),text:C.answer_text||"—",ok:g?C.is_correct??ci(t.answer,C.answer_text):null}}),qImgs:t.media.hidden?[]:E.map(je),aImgs:b.map(je),note:t.answer_note||void 0,extra:o&&y?a.jsx(Ui,{src:je(y)}):null}),A]});if(Rt(n.theme)&&e.mechanic!=="crossword"&&e.mechanic!=="anagram"&&t.answer.mode!=="crossword_word"&&t.answer.mode!=="anagram")return a.jsx(Ny,{round:e,q:t,step:h,answers:r,teams:c,allTeams:l,revealed:o,checked:g,paper:s,revealMs:md(t),answerText:wn(t),effects:o&&y?a.jsx(Ui,{src:je(y)}):null,video:o&&N?a.jsx(Fa,{src:je(N)}):void 0,actions:A},t.id);if(!o&&e.mechanic!=="anagram"&&t.answer.mode!=="anagram"){const C=new Set(u.filter(P=>P.answer_text!==""&&P.answer_text!=null).map(P=>P.team_id));return a.jsxs(a.Fragment,{children:[a.jsx(wd,{pack:n,round:e,roundIdx:i.round_number,q:t,qIndex:h,qCount:f,timeLow:!1,reveal:!1,timerRunning:!1,timerStartedAt:null,quiet:!0,timerSlot:null,effectsSlot:null,actionsSlot:A}),!s&&c.length>0&&a.jsxs("div",{className:"answered-chip",role:"status",children:["Ответили ",a.jsx("b",{children:C.size})," из ",a.jsx("b",{children:c.length})]})]})}return Ih(n.theme,e.mechanic,t,o)?a.jsx(Dh,{pack:n,round:e,q:t,step:h,total:f,roundIdx:i.round_number,paper:s,rows:u,teamOf:C=>c.find(P=>P.id===C)??l.find(P=>P.id===C),checked:g,revealLive:x,shownOf:C=>C.is_correct??ci(t.answer,C.answer_text),actions:A,extra:y?a.jsx(Ui,{src:je(y)}):null}):a.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[a.jsxs("div",{className:"host-topbar",children:[a.jsxs("span",{className:"mono-tag",children:["РАУНД ",Kt(n,i.round_number)," :: ОТВЕТЫ"]}),a.jsxs("span",{className:"qnum",children:["ВОПРОС ",a.jsx("b",{children:h+1})," / ",f]})]}),a.jsxs("div",{className:`answers-layout${o?" revealed":""}`,style:{marginTop:60},children:[a.jsxs("div",{className:`answers-main${o?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!o&&a.jsxs(a.Fragment,{children:[a.jsx("p",{className:`q-text${Ba(t.question_text)}`,children:t.question_text}),E.length>0&&!t.media.hidden&&a.jsx("div",{className:`q-media-grid n${Math.min(E.length,4)}${E.length>1?" eq-row":""}${E.length>4?" wrap2":""}`,style:Ad(t),children:E.map((C,P)=>a.jsx(Oa,{src:je(C)},P))})]}),o&&t.answer.mode!=="match"&&t.question_text.trim()&&a.jsx("p",{className:`q-recall${Ba(t.question_text)}`,children:t.question_text}),o&&a.jsxs("div",{className:`answer-block reveal-in${x?" bk-live":""}${M&&(t.answer_note??"").length<=160?" bk-shortnote":""}`,children:[a.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),N&&a.jsx(Fa,{src:je(N)}),y&&a.jsx(Ui,{src:je(y)}),e.mechanic==="rebus"?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"answer-main",children:wn(t)}),a.jsx("div",{className:"rebus-answer",children:E.slice(0,2).map((C,P)=>a.jsxs("figure",{className:"q-img",children:[a.jsx("img",{src:je(C),alt:""}),a.jsx("figcaption",{children:Oy(P===0?t.service.word1:t.service.word2,P===0)})]},P))})]}):t.answer.mode==="match"?a.jsx(Qy,{q:t}):v&&w.length===v.length?a.jsx(_d,{q:t,choices:v,imgs:w,theme:n.theme}):v?a.jsx(_d,{q:t,choices:v,theme:n.theme}):t.answer.mode==="order"?a.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((C,P)=>{const F=t.answer.choices.find(O=>O.key===C);return a.jsxs("div",{className:"oi",children:[a.jsx("b",{children:C}),a.jsx("span",{className:"oi-pos",children:P+1}),a.jsx("span",{className:"oi-text",children:(F==null?void 0:F.text)??""})]},P)})}):a.jsxs(a.Fragment,{children:[a.jsx("div",{className:`answer-main${wn(t).length>70?" am-xl":wn(t).length>36?" am-l":""}`,children:wn(t)}),b.length>0&&a.jsx("div",{className:`q-media-grid answer-media n${Math.min(b.length,4)}${b.length>1?" eq-row":""}${b.length>4?" wrap2":""}${S.length?" is-own":" is-recall"}`,children:b.map((C,P)=>a.jsx(Oa,{src:je(C)},P))})]}),g&&t.answer_note&&(M?a.jsx(Uh,{text:t.answer_note,className:Pc(t.answer_note).trim()}):a.jsx("div",{className:`answer-note${Pc(t.answer_note)}`,children:t.answer_note}))]})]}),!s&&a.jsxs("div",{className:"team-answers","data-n":u.length,children:[a.jsx("div",{className:"mono-tag",children:o?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${u.length}`}),u.length===0&&a.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),u.map(C=>{var O,H;const P=c.find(Y=>Y.id===C.team_id)??l.find(Y=>Y.id===C.team_id),F=g?C.is_correct??ci(t.answer,C.answer_text):null;return n.theme==="ny_book"?a.jsxs("div",{className:"team-answer bk-ta",children:[a.jsx(Tn,{name:(P==null?void 0:P.name)??"—",ch:u.length>12?40:u.length>8?46:56,color:P==null?void 0:P.color}),a.jsxs("span",{className:"text",children:[o?C.answer_text||"—":"• • •",C.stake!=null&&C.stake!==0&&a.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",C.stake]})]}),a.jsx("span",{className:`bk-ball is-${(O=C.answer_text)!=null&&O.trim()?F===!0?"ok":F===!1?"no":"wait":"none"}`,"aria-hidden":"true",children:a.jsx("i",{children:(H=C.answer_text)!=null&&H.trim()?F===!0?"✓":F===!1?"✗":"":""})})]},C.id):a.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${F===!0?"var(--ok)":F===!1?"var(--danger)":"var(--dim)"}`},children:[a.jsx("span",{className:"name",style:{color:P==null?void 0:P.color},children:(P==null?void 0:P.name)??"—"}),a.jsxs("span",{className:"text",children:[o?C.answer_text||"—":"• • •",C.stake!=null&&C.stake!==0&&a.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",C.stake]})]}),F!=null&&a.jsx("span",{className:"mark",style:{color:F?"var(--ok)":"var(--danger)"},children:F?"✓":"✗"})]},C.id)})]})]}),A]})}function _d({q:n,choices:e,imgs:t,theme:i}){const[s,r]=z.useState(0);z.useEffect(()=>{r(0);const h=setTimeout(()=>r(1),2200),m=setTimeout(()=>r(2),Ku);return()=>{clearTimeout(h),clearTimeout(m)}},[n.id]);const o=n.answer.correct_choice??"",c=e.filter(h=>h.key!==o),l=new Set(By(c.map(h=>h.key),n.id).slice(0,2)),d=h=>s>=1||l.has(h)?s<2?"":h===o?" correct":" dimmed":" hidden-yet",u=h=>l.has(h)?0:.25*e.filter(m=>!l.has(m.key)).findIndex(m=>m.key===h),f=i==="potter";return t?a.jsx("div",{className:"choice-imgs",children:e.map((h,m)=>a.jsxs("div",{className:`choice-img${d(h.key)}`,style:{animationDelay:`${u(h.key)}s`},children:[a.jsx("img",{src:je(t[m]),alt:""}),a.jsxs("span",{className:"key",children:[h.key,h.text?` — ${h.text}`:""]})]},h.key))}):a.jsx("div",{className:`choices-grid${Fh(e.map(h=>h.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(h=>a.jsxs("div",{className:`choice-plate${d(h.key)}`,style:{animationDelay:`${u(h.key)}s`},children:[a.jsx("span",{className:"key",children:h.key}),h.text,f&&d(h.key)===" correct"&&a.jsx(Jy,{})]},h.key))})}function Jy(){return a.jsx("svg",{className:"mg-check",viewBox:"0 0 24 24",width:"26",height:"26","aria-hidden":"true",children:a.jsx("path",{d:"M4 13l5 5L20 6",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}function vd({enabled:n,startedAt:e,seconds:t,from:i}){const s=z.useRef(i);return s.current=i,z.useEffect(()=>{if(!n||!e)return;const r=new Date(e).getTime()+t*1e3-St(),o=s.current,c=setTimeout(()=>{Gi(o).catch(vt)},Math.max(0,r));return()=>clearTimeout(c)},[n,e,t]),null}function Md({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return z.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,o=Math.max(500,r-St()),c=_t(e),l=setTimeout(()=>{fi(e.question_index+1,c).catch(vt)},o);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function Qy({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return a.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var l;const o=((l=i.find(d=>d.startsWith(s)))==null?void 0:l.slice(s.length))??"—",c=(e.right_labels??[])[(e.right??[]).indexOf(o)]||o;return a.jsxs("div",{className:"mi",children:[t[r]&&a.jsx("img",{src:je(t[r]),alt:""}),a.jsxs("div",{className:"mi-label",children:[a.jsxs("b",{children:[s," → ",o]}),c&&c!==o&&a.jsx("span",{className:"mi-text",children:c})]})]},s)})})}function e1({pack:n,gameState:e}){const t=Un(e.game_id),i=Xi(e.game_id),s=Cd(n,t,i),r=Rd(n,t,i),o=n.rounds.filter(g=>!g.off_scoreboard),c=ja(t,s,i,r),l=c.map(g=>g.team),[d,u]=z.useState(0);z.useEffect(()=>{if(u(0),l.length===0)return;const g=setInterval(()=>u(p=>p>=l.length?p:p+1),2200);return()=>clearInterval(g)},[l.length,e.round_number]);const f=z.useRef(null),h=wr([l.length,o.length],{shrinkBefore:f}),m=z.useMemo(()=>{const g=new Map(t.map(v=>{const w=s.get(v.id)??0,S=(r.get(v.id)??[])[e.round_number]??0;return[v.id,w-S]})),p=new Map(t.map(v=>[v.id,(r.get(v.id)??[]).slice(0,e.round_number)]));return ja(t,g,i,p).map(v=>v.team)},[t,s,r,i,e.round_number]),x=z.useRef(new Map),M=z.useRef(null);if(z.useLayoutEffect(()=>{if(n.theme!=="classic"&&n.theme!=="potter"||l.length===0||d<l.length||M.current===e.round_number||(M.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const p=new Map(m.map((w,S)=>[w.id,S]));l.forEach((w,S)=>{const E=x.current.get(w.id);if(!E)return;const N=(p.get(w.id)??S)-S;if(N===0)return;const y=E.getBoundingClientRect().height;E.style.transition="none",E.style.transform=`translateY(${N*y}px)`,E.classList.add("sb-flip"),E.offsetHeight,requestAnimationFrame(()=>{E.style.transition="",E.style.transform=""})});const v=setTimeout(()=>{x.current.forEach(w=>w.classList.remove("sb-flip"))},900);return()=>clearTimeout(v)},[d,l,m,n.theme,e.round_number]),Rt(n.theme)){const g=o.map(E=>n.rounds.indexOf(E)),p=tp(g,e.round_number,c.map(E=>g.map(b=>(r.get(E.team.id)??[])[b]??0))),v=g.slice(0,p),w=g.some(E=>E<e.round_number),S={kind:"regular",title:"Табло",sub:`после раунда ${p} из ${o.length}`,flip:!1,cols:v.map(E=>Kt(n,E)),rows:zd(c,r,v,oi,w?{order:m.map(E=>E.id)}:void 0)};return a.jsxs(a.Fragment,{children:[a.jsx(Hd,{view:S,reveal:d,flipKey:w?String(e.round_number):null}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:e})})]})}return a.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[a.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),a.jsx("h2",{className:"sb-title",ref:f,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),a.jsx("div",{className:"sb-table-wrap",children:a.jsxs("table",{ref:h,className:`score-table${Zu(l.length)}`,children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),o.map((g,p)=>a.jsxs("th",{children:["Р",p+1]},g.id)),a.jsx("th",{children:"Σ"})]})}),a.jsx("tbody",{children:l.map((g,p)=>{const v=c.find(E=>E.team.id===g.id),w=(v==null?void 0:v.place)??1,S=p>=l.length-d;return a.jsxs("tr",{ref:E=>{E?x.current.set(g.id,E):x.current.delete(g.id)},className:`sb-row${S?" is-in":" is-veiled"}${w===1?" leader":""}`,children:[a.jsxs("td",{children:[w<=3?a.jsx("span",{className:"sb-medal",children:a.jsx(Va,{theme:n.theme,place:w})}):w,(v==null?void 0:v.shared)&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:g.color,fontFamily:"var(--font-display)"},children:n.theme==="ny_book"?a.jsx(Tn,{em:!0,ch:1.9,name:g.name,color:g.color}):a.jsx("span",{className:"sb-name",children:g.name})}),o.map(E=>{const b=r.get(g.id)??[];return a.jsx("td",{children:b[n.rounds.indexOf(E)]??0},E.id)}),a.jsx("td",{className:"total",children:s.get(g.id)??0})]},g.id)})})]})}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:e})})]})}function t1({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=z.useState(i*60);z.useEffect(()=>{const l=t.timer_started_at?new Date(t.timer_started_at).getTime():St(),d=()=>r(Math.max(0,Math.round(i*60-(St()-l)/1e3)));d();const u=setInterval(d,500);return()=>clearInterval(u)},[t.timer_started_at,i]);const o=String(Math.floor(s/60)).padStart(2,"0"),c=String(s%60).padStart(2,"0");return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Fi,{view:{state:"break",clock:jd(s),sub:"Антракт · скоро продолжим"},step:"break"}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:t})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen",children:[n.theme!=="potter"&&a.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),a.jsx(Cn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),a.jsx(br,{theme:n.theme}),n.theme==="potter"&&a.jsx(Ed,{left:s,seconds:i*60,low:s<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"host-actions",children:a.jsx(Ln,{pack:n,gameState:t})})]})}function n1({pack:n,gameState:e}){var l,d;const[i,s]=z.useState(300);z.useEffect(()=>{const u=e.timer_started_at?new Date(e.timer_started_at).getTime():St(),f=()=>s(Math.max(0,Math.round(5*60-(St()-u)/1e3)));f();const h=setInterval(f,500);return()=>clearInterval(h)},[e.timer_started_at]),z.useEffect(()=>{var h,m;const u=((h=n.settings)==null?void 0:h.finale_music)??((m=n.settings)==null?void 0:m.bg_music);if(!u||document.hidden)return;const f=en();return f.src=je(u),f.loop=!0,f.volume=.55,f.play().catch(()=>{}),()=>{try{f.pause(),f.src=""}catch{}}},[(l=n.settings)==null?void 0:l.finale_music,(d=n.settings)==null?void 0:d.bg_music]);const r=Un(Rt(n.theme)?e.game_id:null),o=String(Math.floor(i/60)).padStart(2,"0"),c=String(i%60).padStart(2,"0");return Rt(n.theme)?a.jsxs(a.Fragment,{children:[a.jsx(Fi,{view:{state:"antic",hues:r.map(u=>Rn(u.color)),title:"Подводим итоги",sub:"Скоро объявим победителей",clock:jd(i)},step:`antic-${r.length>0}`}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void za(e.pack_id,!0),children:"К итогам →"})})]}):a.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[a.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),a.jsx(Cn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),a.jsx(br,{theme:n.theme}),n.theme==="potter"&&a.jsx(Ed,{left:i,seconds:5*60,low:i<=30}),a.jsxs("div",{className:"break-timer",children:[o,":",c]}),a.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>void za(e.pack_id,!0),children:"К итогам →"})})]})}function i1({pack:n,gameId:e,gameState:t}){var P,F,O,H,Y,$,ne;const i=Un(e),s=Xi(e),r=Cd(n,i,s),o=Rd(n,i,s),c=ja(i,r,s,o),l=!!t.reveal,d=t.question_index??0,[u,f]=z.useState(!((P=n.settings)!=null&&P.show_final_cinematic));z.useEffect(()=>{var pe,fe;const Q=((pe=n.settings)==null?void 0:pe.finale_music)??((fe=n.settings)==null?void 0:fe.bg_music);if(!Q||document.hidden||!u)return;const ie=en();return ie.src=je(Q),ie.loop=!0,ie.volume=.55,ie.play().catch(()=>{}),()=>{try{ie.pause(),ie.src=""}catch{}}},[(F=n.settings)==null?void 0:F.finale_music,(O=n.settings)==null?void 0:O.bg_music,u]);const h=z.useRef(null),m=wr([c.length],{shrinkBefore:h,minScale:.3}),x=n.rounds.map((Q,ie)=>({r:Q,i:ie})).filter(Q=>!Q.r.off_scoreboard),M=x.map(({r:Q,i:ie})=>{var Re;let pe=null,fe=-1/0;for(const ge of i){const Ae=((Re=o.get(ge.id))==null?void 0:Re[ie])??0;Ae>fe&&(fe=Ae,pe=ge)}return{round:Q,idx:ie,team:pe,score:fe}}),g=3e3,p=1e4,v=M.length;z.useEffect(()=>{if(l||d>v||!u)return;const ie=setTimeout(()=>void ii(d+1),d===v?p:g);return()=>clearTimeout(ie)},[l,d,v,u]);const[w,S]=z.useState(0);z.useEffect(()=>{if(S(0),c.length===0)return;let Q=!1,ie=0,pe;const fe=()=>{Q||(ie+=1,S(ie),!(ie>=c.length)&&(pe=setTimeout(fe,Math.max(320,900-90*ie))))};return pe=setTimeout(fe,Math.max(320,900-90*ie)),()=>{Q=!0,clearTimeout(pe)}},[c.length,d,l]);const E=Rt(n.theme);if(!u)return E?a.jsx(Rp,{hues:i.map(Q=>Rn(Q.color)),onDone:()=>f(!0)}):a.jsx(wM,{onDone:()=>f(!0)});if(E){const Q=a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&er()},children:"⟲ Новая игра"})}),ie=x.map(ge=>ge.i),pe={kind:"final",title:"Итоги игры",sub:"разбивка по раундам",flip:!1,cols:ie.map(ge=>Kt(n,ge)),rows:zd(c,o,ie,oi)},fe=a.jsxs(a.Fragment,{children:[a.jsx(Hd,{view:pe,reveal:w,flipKey:null}),Q]}),Re=()=>void ii(d+1);if(l){const ge=[...new Set(c.map(j=>j.place))].filter(j=>j<=3).sort((j,Z)=>Z-j);if(d>=ge.length)return fe;const Ae=new Set(ge.slice(0,d+1)),ae=np(c,oi,Rn).filter(j=>Ae.has(j.place));return a.jsx(Fi,{view:{state:"medals",slots:ae},step:`medals-${d}`,only:ge[d]-1,onClick:Re})}if(d<v){const ge=M.map(Ae=>({n:Kt(n,Ae.idx),name:Ae.round.title_lines.join(" ").replace(/\s+/g," ").trim(),team:Ae.team?{name:Ae.team.name,color:oi(Ae.team.color)}:null,pts:Ae.team?Ae.score:0}));return a.jsx(Fi,{view:{state:"retro",cards:ge,shown:d+1},step:`retro-${d}`,only:d,onClick:Re})}if(d===v){const ge=c.filter(Ae=>Ae.place===1);return a.jsx(Fi,{view:{state:"winner",names:ge.map(Ae=>({name:Ae.team.name,color:oi(Ae.team.color)})),sum:((H=ge[0])==null?void 0:H.total)??0,hues:i.map(Ae=>Rn(Ae.color))},step:"winner",onClick:Re})}return fe}const b=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],N=a.jsx(a.Fragment,{children:Array.from({length:5},(Q,ie)=>a.jsxs("div",{className:"fw-burst",style:{left:`${12+ie*19}%`,top:`${18+ie%3*14}%`},children:[a.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${b[ie%b.length]}55, transparent 70%)`,"--dur":`${2.2+ie*.3}s`,"--delay":`${ie*.45}s`}}),Array.from({length:10},(pe,fe)=>a.jsx("span",{className:"fw-spark",style:{background:b[(ie+fe)%b.length],"--a":`${fe*36}deg`,"--dur":`${2.2+ie*.3}s`,"--delay":`${ie*.45}s`}},fe))]},ie))}),y=n.theme==="ny_book",A=y?` bk-fin bk-fin-v${vf()}`:"",I=y?[...Mf]:["РЕЗУЛЬТАТЫ"],C=a.jsxs("div",{className:"fin-breakdown",children:[a.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),a.jsx("div",{className:"fin-table-wrap",children:a.jsxs("table",{ref:m,className:`fin-table${Zu(c.length)}`,style:{"--half":Math.ceil(c.length/2)},children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{}),a.jsx("th",{children:"Команда"}),n.rounds.map((Q,ie)=>!Q.off_scoreboard&&a.jsxs("th",{children:["Р",Kt(n,ie),y&&a.jsx("small",{className:"fin-rname",children:Q.title_lines.join(" ").replace(/\s+/g," ").trim()})]},Q.id)),a.jsx("th",{children:y?"Итого":"Σ"})]})}),a.jsx("tbody",{children:c.map(({team:Q,place:ie,shared:pe},fe)=>{const Re=fe>=c.length-w;return a.jsxs("tr",{style:{"--tc":Q.color},className:`fin-row${ie<=3?" top3":""}${ie===1?" fin-first":""}${Re?" is-in":" is-veiled"}`,children:[a.jsxs("td",{className:"fin-pos",children:[ie<=3&&a.jsx(Wd,{place:ie}),ie,pe&&a.jsx("span",{className:"sb-eq",children:"="})]}),a.jsx("td",{style:{color:Q.color},children:n.theme==="ny_book"?a.jsx(Tn,{em:!0,ch:1.9,name:Q.name,color:Q.color}):a.jsx("span",{className:"sb-name",children:Q.name})}),n.rounds.map((ge,Ae)=>{var ae;return!ge.off_scoreboard&&a.jsx("td",{children:((ae=o.get(Q.id))==null?void 0:ae[Ae])??0},ge.id)}),a.jsx("td",{children:a.jsx("b",{children:r.get(Q.id)??0})})]},Q.id)})})]})})]});if(l){const Q=[...new Set(c.map(fe=>fe.place))].filter(fe=>fe<=3).sort((fe,Re)=>Re-fe);if(d>=Q.length)return a.jsxs("div",{className:`host-screen grid-bg fin-screen${A}`,children:[N,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(Cn,{ref:h,theme:n.theme,lines:I}),C,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&er()},children:"⟲ Новая игра"})})]});const ie=Q[d],pe=c.filter(fe=>fe.place===ie);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ii(d+1),children:[ie===1&&N,a.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),a.jsxs("div",{className:`fin-award p${ie}`,children:[a.jsxs("div",{className:"fin-award-place",children:[ie," МЕСТО"]}),a.jsx("div",{className:"fin-award-medal",children:a.jsx(Va,{theme:n.theme,place:ie})}),pe.length>0?pe.map(fe=>y?a.jsx("div",{className:"fin-award-name bk-award-card",children:a.jsx(Tn,{name:fe.team.name,icon:fe.team.icon,color:fe.team.color,ch:104})},fe.team.id):a.jsx("div",{className:"fin-award-name",style:{color:fe.team.color},children:fe.team.name},fe.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(d<v){const Q=M[d];return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ii(d+1),children:[a.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),a.jsxs("div",{className:"fin-slide",children:[a.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Kt(n,Q.idx)," · ",Q.round.title_lines.join(" ")]}),a.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),y&&Q.team?a.jsx("div",{className:"fin-slide-team bk-award-card",children:a.jsx(Tn,{name:Q.team.name,icon:Q.team.icon,color:Q.team.color,ch:104})}):a.jsx("div",{className:"fin-slide-team",style:{color:(Y=Q.team)==null?void 0:Y.color},children:(($=Q.team)==null?void 0:$.name)??"—"})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"3s"}})},d),a.jsx("div",{className:"fin-dots",children:M.map((ie,pe)=>a.jsx("span",{className:pe===d?"on":""},pe))})]})}if(d===v){const Q=c.filter(ie=>ie.place===1);return a.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void ii(d+1),children:[N,a.jsx("div",{className:"mono-tag",children:Q.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),a.jsxs("div",{className:"fin-award p1",children:[a.jsx("div",{className:"fin-award-medal",children:a.jsx(Va,{theme:n.theme,place:1})}),Q.length>0?Q.map(ie=>y?a.jsx("div",{className:"fin-award-name bk-award-card",children:a.jsx(Tn,{name:ie.team.name,icon:ie.team.icon,color:ie.team.color,ch:104})},ie.team.id):a.jsx("div",{className:"fin-award-name",style:{color:ie.team.color},children:ie.team.name},ie.team.id)):a.jsx("div",{className:"fin-award-name",children:"—"}),a.jsx("div",{className:"fin-award-score",children:((ne=Q[0])==null?void 0:ne.total)??0})]}),a.jsx("div",{className:"fin-progress",children:a.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return a.jsxs("div",{className:`host-screen grid-bg fin-screen${A}`,children:[N,a.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),a.jsx(Cn,{ref:y?h:void 0,theme:n.theme,lines:I}),C,a.jsx("div",{className:"host-actions",children:a.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&er()},children:"⟲ Новая игра"})})]})}export{v1 as HostScreen,Fy as stopAllMedia};
