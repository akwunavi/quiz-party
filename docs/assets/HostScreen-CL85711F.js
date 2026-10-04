import{j as _,s as ad}from"./index-D14xKo0t.js";import{u as od,R as cd,a as ld,s as dd,b as ud}from"./useGameState-BqvPsdX7.js";import{r as he}from"./vendor-BbIxR9j-.js";import{c as $t,u as Kc,A as Zc,s as hd,S as fd,T as Wi,R as pd,M as md,a as gd,J as _d,b as xd,Q as vd,d as Pi,e as Md,B as po,f as Us,g as Sd,p as Ed,I as yd,F as zr,h as bd,i as Jc,j as Qc,k as Td}from"./QuestionScreen-qO2-wer0.js";import{m as mt,u as ti,i as wd,s as mo,c as Ad,p as Rd,r as Cd,a as el,b as Pd,d as Gr,l as Hr,e as tl,f as nl,g as il,h as Nd,j as Ld}from"./jeopardyActions-CRZxMPAp.js";import{l as Dd,a as Id,g as Ud,s as Fd,r as Vr,b as Od,c as go,d as bi,m as _o,e as Kn,n as Dt,q as Rt,f as Fs,h as Ti,i as sl,j as Xs,t as Bd,k as zd,o as rl,p as kr,u as Ki,v as Gd,w as Hd,x as xo,y as Vd,N as vo,z as kd,S as Wd,A as Mo,B as er,C as Xd,M as So,D as al,E as Eo,F as yo,G as bo,H as qd,I as To,J as jd,K as wo,L as ol,O as vi,P as Yd,Q as $d,R as Kd}from"./Hint-BEdSIG_S.js";import{L as Zd,b as Ao,r as Wr}from"./ranking-CDsUNLC6.js";import{T as Jd,S as Qd}from"./ThemeLayer-BRr8zefo.js";import{Q as eu}from"./QrCode-BC0yP7Tl.js";import{C as tu}from"./CrosswordView-Djwg7F3b.js";import"./pollLoop-BPx8gArJ.js";function nu({pack:n}){var e,t;return he.useEffect(()=>{var l,c;const i=((l=n==null?void 0:n.settings)==null?void 0:l.lobby_music)??((c=n==null?void 0:n.settings)==null?void 0:c.bg_music);if(!i)return;const s=$t();s.src=mt(i),s.loop=!0,s.volume=.45;let r=!1,a=!1;const o=()=>{a||r||(a=!0,s.play().then(()=>{if(r)try{s.pause(),s.src=""}catch{}}).catch(()=>{}),window.removeEventListener("pointerdown",o),window.removeEventListener("keydown",o))};return s.play().then(()=>{if(a=!0,r)try{s.pause(),s.src=""}catch{}}).catch(()=>{r||(window.addEventListener("pointerdown",o),window.addEventListener("keydown",o))}),()=>{r=!0,window.removeEventListener("pointerdown",o),window.removeEventListener("keydown",o);try{s.pause(),s.src=""}catch{}}},[(e=n==null?void 0:n.settings)==null?void 0:e.lobby_music,(t=n==null?void 0:n.settings)==null?void 0:t.bg_music]),null}let ts=null;const iu=1e-4;function Ro(){try{if(ts){ts.state==="suspended"&&ts.resume().catch(()=>{});return}const n=window.AudioContext??window.webkitAudioContext;if(!n)return;const e=new n,t=Math.max(1,Math.floor(e.sampleRate*2)),i=e.createBuffer(1,t,e.sampleRate),s=i.getChannelData(0);for(let o=0;o<t;o++)s[o]=Math.random()*2-1;const r=e.createBufferSource();r.buffer=i,r.loop=!0;const a=e.createGain();a.gain.value=iu,r.connect(a),a.connect(e.destination),r.start(),ts=e,e.state==="suspended"&&e.resume().catch(()=>{})}catch{}}function su(){const n=()=>Ro();return Ro(),window.addEventListener("pointerdown",n),window.addEventListener("keydown",n),()=>{window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)}}const cl="qp-fx-enabled",ru=4e3,au={classic:520,potter:700};function ou(){try{const n=localStorage.getItem(cl);return n===null?!0:n==="1"}catch{return!0}}function cu(n){try{localStorage.setItem(cl,n?"1":"0")}catch{}}function lu(){return typeof location<"u"&&location.href.includes("nofx=1")}function du({theme:n,trigger:e,hud:t}){const[i,s]=he.useState(ou),r=he.useRef(null),a=he.useRef(0),[o,l]=he.useState(null);he.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",i),()=>{document.documentElement.classList.remove("fx-force-motion")}),[i]),he.useEffect(()=>{const h=r.current===null;if(r.current=e,h||!i||n==="new_year"||lu())return;const u=Date.now();u-a.current<ru||(a.current=u,l(u))},[e]),he.useEffect(()=>{if(o===null)return;const h=(au[n]??300)+50,u=setTimeout(()=>l(null),h);return()=>clearTimeout(u)},[o,n]);const c=n==="classic"||n==="potter";return _.jsxs(_.Fragment,{children:[c&&_.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":i,title:i?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(h=>{const u=!h;return cu(u),u}),children:"✨"}),o!==null&&n==="classic"&&_.jsx(hu,{},o),o!==null&&n==="potter"&&_.jsx(fu,{},o),n==="classic"&&t&&_.jsx(uu,{label:t},t)]})}function uu({label:n}){const[e,t]=he.useState(()=>90+Math.floor(Math.random()*10));return he.useEffect(()=>{const i=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(i)},[]),_.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",n," · SIG ",e,"%"]})}function hu(){return _.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[_.jsx("span",{className:"fx-beam"}),_.jsx("span",{className:"fx-rgb"})]})}function fu(){const n=Array.from({length:22},(e,t)=>t);return _.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:n.map(e=>_.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/n.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const Co=["🥇","🥈","🥉"];function Xr({theme:n,place:e}){return n==="classic"?_.jsx(pu,{place:e}):n==="potter"?_.jsx(gu,{place:e}):n==="new_year"?_.jsx(mu,{place:e}):_.jsx("span",{className:"award-emoji",children:Co[e-1]??Co[2]})}function pu({place:n}){return _.jsxs("div",{className:`award-hex p${n}`,"aria-hidden":"true",children:[_.jsx("span",{className:"ah-orbit"}),_.jsx("span",{className:"ah-face",children:_.jsx("b",{children:n})})]})}function mu({place:n}){return _.jsxs("div",{className:`award-bauble p${n}`,"aria-hidden":"true",children:[_.jsx("span",{className:"ab-cap"}),_.jsxs("span",{className:"ab-ball",children:[_.jsx("span",{className:"ab-shine"}),_.jsx("b",{children:n})]})]})}function gu({place:n}){return _.jsxs("div",{className:`award-merlin p${n}`,"aria-hidden":"true",children:[_.jsx("span",{className:"am-ribbon"}),_.jsxs("span",{className:"am-disc",children:[_.jsx("span",{className:"am-shine"}),_.jsx("b",{children:n})]})]})}function _u(n){return[...n].sort((e,t)=>{const i=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return i!==s?i-s:e.id<t.id?-1:e.id>t.id?1:0})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const za="185",xu=0,Po=1,vu=2,Cs=1,Mu=2,Xi=3,Un=0,Bt=1,gn=2,vn=0,Mi=1,Zn=2,No=3,Lo=4,Su=5,Wn=100,Eu=101,yu=102,bu=103,Tu=104,wu=200,Au=201,Ru=202,Cu=203,qr=204,jr=205,Pu=206,Nu=207,Lu=208,Du=209,Iu=210,Uu=211,Fu=212,Ou=213,Bu=214,Yr=0,$r=1,Kr=2,wi=3,Zr=4,Jr=5,Qr=6,ea=7,ll=0,zu=1,Gu=2,on=0,dl=1,ul=2,hl=3,fl=4,pl=5,ml=6,gl=7,_l=300,Jn=301,Ai=302,tr=303,nr=304,qs=306,ta=1e3,_n=1001,na=1002,bt=1003,Hu=1004,ns=1005,Ct=1006,ir=1007,qn=1008,Vt=1009,xl=1010,vl=1011,ji=1012,Ga=1013,ln=1014,rn=1015,Sn=1016,Ha=1017,Va=1018,Yi=1020,Ml=35902,Sl=35899,El=1021,yl=1022,Zt=1023,En=1026,jn=1027,bl=1028,ka=1029,Qn=1030,Wa=1031,Xa=1033,Ps=33776,Ns=33777,Ls=33778,Ds=33779,ia=35840,sa=35841,ra=35842,aa=35843,oa=36196,ca=37492,la=37496,da=37488,ua=37489,Os=37490,ha=37491,fa=37808,pa=37809,ma=37810,ga=37811,_a=37812,xa=37813,va=37814,Ma=37815,Sa=37816,Ea=37817,ya=37818,ba=37819,Ta=37820,wa=37821,Aa=36492,Ra=36494,Ca=36495,Pa=36283,Na=36284,Bs=36285,La=36286,Vu=3200,Da=0,ku=1,Ln="",Xt="srgb",zs="srgb-linear",Gs="linear",Qe="srgb",ri=7680,Do=519,Wu=512,Xu=513,qu=514,qa=515,ju=516,Yu=517,ja=518,$u=519,Io=35044,Uo="300 es",an=2e3,$i=2001;function Ku(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Zu(){const n=Hs("canvas");return n.style.display="block",n}const Fo={};function Oo(...n){const e="THREE."+n.shift();console.log(e,...n)}function Tl(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=Tl(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Je(...n){n=Tl(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Si(...n){const e=n.join(" ");e in Fo||(Fo[e]=!0,Fe(...n))}function Ju(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Qu={[Yr]:$r,[Kr]:Qr,[Zr]:ea,[wi]:Jr,[$r]:Yr,[Qr]:Kr,[ea]:Zr,[Jr]:wi};class ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sr=Math.PI/180,Ia=180/Math.PI;function Zi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function eh(n,e){return(n%e+e)%e}function rr(n,e,t){return(1-t)*n+t*e}function Ui(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Qa=class Qa{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qa.prototype.isVector2=!0;let $e=Qa;class Ni{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],g=r[a+1],v=r[a+2],M=r[a+3];if(u!==M||l!==d||c!==g||h!==v){let m=l*d+c*g+h*v+u*M;m<0&&(d=-d,g=-g,v=-v,M=-M,m=-m);let f=1-o;if(m<.9995){const A=Math.acos(m),w=Math.sin(A);f=Math.sin(f*A)/w,o=Math.sin(o*A)/w,l=l*f+d*o,c=c*f+g*o,h=h*f+v*o,u=u*f+M*o}else{l=l*f+d*o,c=c*f+g*o,h=h*f+v*o,u=u*f+M*o;const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+h*u+l*g-c*d,e[t+1]=l*v+h*d+c*u-o*g,e[t+2]=c*v+h*g+o*d-l*u,e[t+3]=h*v-o*u-l*d-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*g*v,this._y=c*g*u-d*h*v,this._z=c*h*v+d*g*u,this._w=c*h*u-d*g*v;break;case"YXZ":this._x=d*h*u+c*g*v,this._y=c*g*u-d*h*v,this._z=c*h*v-d*g*u,this._w=c*h*u+d*g*v;break;case"ZXY":this._x=d*h*u-c*g*v,this._y=c*g*u+d*h*v,this._z=c*h*v+d*g*u,this._w=c*h*u-d*g*v;break;case"ZYX":this._x=d*h*u-c*g*v,this._y=c*g*u+d*h*v,this._z=c*h*v-d*g*u,this._w=c*h*u+d*g*v;break;case"YZX":this._x=d*h*u+c*g*v,this._y=c*g*u+d*h*v,this._z=c*h*v-d*g*u,this._w=c*h*u-d*g*v;break;case"XZY":this._x=d*h*u-c*g*v,this._y=c*g*u-d*h*v,this._z=c*h*v+d*g*u,this._w=c*h*u+d*g*v;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(i>o&&i>u){const g=2*Math.sqrt(1+i-o-u);this._w=(h-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>u){const g=2*Math.sqrt(1+o-i-u);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+u-i-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const eo=class eo{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ar.copy(this).projectOnVector(e),this.sub(ar)}reflect(e){return this.sub(ar.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};eo.prototype.isVector3=!0;let Y=eo;const ar=new Y,Bo=new Ni,to=class to{constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],g=i[5],v=i[8],M=s[0],m=s[3],f=s[6],A=s[1],w=s[4],y=s[7],T=s[2],E=s[5],P=s[8];return r[0]=a*M+o*A+l*T,r[3]=a*m+o*w+l*E,r[6]=a*f+o*y+l*P,r[1]=c*M+h*A+u*T,r[4]=c*m+h*w+u*E,r[7]=c*f+h*y+u*P,r[2]=d*M+g*A+v*T,r[5]=d*m+g*w+v*E,r[8]=d*f+g*y+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,g=c*r-a*l,v=t*u+i*d+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/v;return e[0]=u*M,e[1]=(s*c-h*i)*M,e[2]=(o*i-s*a)*M,e[3]=d*M,e[4]=(h*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=g*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Si("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(or.makeScale(e,t)),this}rotate(e){return Si("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(or.makeRotation(-e)),this}translate(e,t){return Si("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(or.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};to.prototype.isMatrix3=!0;let Oe=to;const or=new Oe,zo=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Go=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function th(){const n={enabled:!0,workingColorSpace:zs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=Mn(s.r),s.g=Mn(s.g),s.b=Mn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?Gs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Si("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Si("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[zs]:{primaries:e,whitePoint:i,transfer:Gs,toXYZ:zo,fromXYZ:Go,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:Qe,toXYZ:zo,fromXYZ:Go,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}const je=th();function Mn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ei(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ai;class nh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ai===void 0&&(ai=Hs("canvas")),ai.width=e.width,ai.height=e.height;const s=ai.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ai}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Mn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Mn(t[i]/255)*255):t[i]=Mn(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ih=0;class Ya{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cr(s[a].image)):r.push(cr(s[a]))}else r=cr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function cr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?nh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let sh=0;const lr=new Y;class Pt extends ni{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=_n,s=_n,r=Ct,a=qn,o=Zt,l=Vt,c=Pt.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=Zi(),this.name="",this.source=new Ya(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(lr).x}get height(){return this.source.getSize(lr).y}get depth(){return this.source.getSize(lr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ta:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ta:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=_l;Pt.DEFAULT_ANISOTROPY=1;const no=class no{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],g=l[5],v=l[9],M=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-M)<.01&&Math.abs(v-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+M)<.1&&Math.abs(v+m)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(g+1)/2,T=(f+1)/2,E=(h+d)/4,P=(u+M)/4,x=(v+m)/4;return w>y&&w>T?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=E/i,r=P/i):y>T?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=E/s,r=x/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=P/r,s=x/r),this.set(i,s,r,t),this}let A=Math.sqrt((m-v)*(m-v)+(u-M)*(u-M)+(d-h)*(d-h));return Math.abs(A)<.001&&(A=1),this.x=(m-v)/A,this.y=(u-M)/A,this.z=(d-h)/A,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};no.prototype.isVector4=!0;let dt=no;class rh extends ni{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Pt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ya(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends rh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class wl extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ah extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ws=class Ws{constructor(e,t,i,s,r,a,o,l,c,h,u,d,g,v,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,u,d,g,v,M,m)}set(e,t,i,s,r,a,o,l,c,h,u,d,g,v,M,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=g,f[7]=v,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ws().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/oi.setFromMatrixColumn(e,0).length(),r=1/oi.setFromMatrixColumn(e,1).length(),a=1/oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,g=a*u,v=o*h,M=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=g+v*c,t[5]=d-M*c,t[9]=-o*l,t[2]=M-d*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,g=l*u,v=c*h,M=c*u;t[0]=d+M*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=g*o-v,t[6]=M+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,g=l*u,v=c*h,M=c*u;t[0]=d-M*o,t[4]=-a*u,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*h,t[9]=M-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,g=a*u,v=o*h,M=o*u;t[0]=l*h,t[4]=v*c-g,t[8]=d*c+M,t[1]=l*u,t[5]=M*c+d,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,g=a*c,v=o*l,M=o*c;t[0]=l*h,t[4]=M-d*u,t[8]=v*u+g,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=g*u+v,t[10]=d-M*u}else if(e.order==="XZY"){const d=a*l,g=a*c,v=o*l,M=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+M,t[5]=a*h,t[9]=g*u-v,t[2]=v*u-g,t[6]=o*h,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oh,e,ch)}lookAt(e,t,i){const s=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),wn.crossVectors(i,Gt),wn.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),wn.crossVectors(i,Gt)),wn.normalize(),is.crossVectors(Gt,wn),s[0]=wn.x,s[4]=is.x,s[8]=Gt.x,s[1]=wn.y,s[5]=is.y,s[9]=Gt.y,s[2]=wn.z,s[6]=is.z,s[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],g=i[13],v=i[2],M=i[6],m=i[10],f=i[14],A=i[3],w=i[7],y=i[11],T=i[15],E=s[0],P=s[4],x=s[8],C=s[12],U=s[1],F=s[5],V=s[9],Z=s[13],z=s[2],I=s[6],j=s[10],k=s[14],Q=s[3],le=s[7],fe=s[11],pe=s[15];return r[0]=a*E+o*U+l*z+c*Q,r[4]=a*P+o*F+l*I+c*le,r[8]=a*x+o*V+l*j+c*fe,r[12]=a*C+o*Z+l*k+c*pe,r[1]=h*E+u*U+d*z+g*Q,r[5]=h*P+u*F+d*I+g*le,r[9]=h*x+u*V+d*j+g*fe,r[13]=h*C+u*Z+d*k+g*pe,r[2]=v*E+M*U+m*z+f*Q,r[6]=v*P+M*F+m*I+f*le,r[10]=v*x+M*V+m*j+f*fe,r[14]=v*C+M*Z+m*k+f*pe,r[3]=A*E+w*U+y*z+T*Q,r[7]=A*P+w*F+y*I+T*le,r[11]=A*x+w*V+y*j+T*fe,r[15]=A*C+w*Z+y*k+T*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],g=e[14],v=e[3],M=e[7],m=e[11],f=e[15],A=l*g-c*d,w=o*g-c*u,y=o*d-l*u,T=a*g-c*h,E=a*d-l*h,P=a*u-o*h;return t*(M*A-m*w+f*y)-i*(v*A-m*T+f*E)+s*(v*w-M*T+f*P)-r*(v*y-M*E+m*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],g=e[11],v=e[12],M=e[13],m=e[14],f=e[15],A=t*o-i*a,w=t*l-s*a,y=t*c-r*a,T=i*l-s*o,E=i*c-r*o,P=s*c-r*l,x=h*M-u*v,C=h*m-d*v,U=h*f-g*v,F=u*m-d*M,V=u*f-g*M,Z=d*f-g*m,z=A*Z-w*V+y*F+T*U-E*C+P*x;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/z;return e[0]=(o*Z-l*V+c*F)*I,e[1]=(s*V-i*Z-r*F)*I,e[2]=(M*P-m*E+f*T)*I,e[3]=(d*E-u*P-g*T)*I,e[4]=(l*U-a*Z-c*C)*I,e[5]=(t*Z-s*U+r*C)*I,e[6]=(m*y-v*P-f*w)*I,e[7]=(h*P-d*y+g*w)*I,e[8]=(a*V-o*U+c*x)*I,e[9]=(i*U-t*V-r*x)*I,e[10]=(v*E-M*y+f*A)*I,e[11]=(u*y-h*E-g*A)*I,e[12]=(o*C-a*F-l*x)*I,e[13]=(t*F-i*C+s*x)*I,e[14]=(M*w-v*T-m*A)*I,e[15]=(h*T-u*w+d*A)*I,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,g=r*h,v=r*u,M=a*h,m=a*u,f=o*u,A=l*c,w=l*h,y=l*u,T=i.x,E=i.y,P=i.z;return s[0]=(1-(M+f))*T,s[1]=(g+y)*T,s[2]=(v-w)*T,s[3]=0,s[4]=(g-y)*E,s[5]=(1-(d+f))*E,s[6]=(m+A)*E,s[7]=0,s[8]=(v+w)*P,s[9]=(m-A)*P,s[10]=(1-(d+M))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=oi.set(s[0],s[1],s[2]).length();const o=oi.set(s[4],s[5],s[6]).length(),l=oi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),qt.copy(this);const c=1/a,h=1/o,u=1/l;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=h,qt.elements[5]*=h,qt.elements[6]*=h,qt.elements[8]*=u,qt.elements[9]*=u,qt.elements[10]*=u,t.setFromRotationMatrix(qt),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=an,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),g=(i+s)/(i-s);let v,M;if(l)v=r/(a-r),M=a*r/(a-r);else if(o===an)v=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===$i)v=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=an,l=!1){const c=this.elements,h=2/(t-e),u=2/(i-s),d=-(t+e)/(t-e),g=-(i+s)/(i-s);let v,M;if(l)v=1/(a-r),M=a/(a-r);else if(o===an)v=-2/(a-r),M=-(a+r)/(a-r);else if(o===$i)v=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Ws.prototype.isMatrix4=!0;let ut=Ws;const oi=new Y,qt=new ut,oh=new Y(0,0,0),ch=new Y(1,1,1),wn=new Y,is=new Y,Gt=new Y,Ho=new ut,Vo=new Ni;class Fn{constructor(e=0,t=0,i=0,s=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ho.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ho,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vo.setFromEuler(this),this.setFromQuaternion(Vo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class Al{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lh=0;const ko=new Y,ci=new Ni,un=new ut,ss=new Y,Fi=new Y,dh=new Y,uh=new Ni,Wo=new Y(1,0,0),Xo=new Y(0,1,0),qo=new Y(0,0,1),jo={type:"added"},hh={type:"removed"},li={type:"childadded",child:null},dr={type:"childremoved",child:null};class It extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new Y,t=new Fn,i=new Ni,s=new Y(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new Oe}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.multiply(ci),this}rotateOnWorldAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.premultiply(ci),this}rotateX(e){return this.rotateOnAxis(Wo,e)}rotateY(e){return this.rotateOnAxis(Xo,e)}rotateZ(e){return this.rotateOnAxis(qo,e)}translateOnAxis(e,t){return ko.copy(e).applyQuaternion(this.quaternion),this.position.add(ko.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wo,e)}translateY(e){return this.translateOnAxis(Xo,e)}translateZ(e){return this.translateOnAxis(qo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ss.copy(e):ss.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(Fi,ss,this.up):un.lookAt(ss,Fi,this.up),this.quaternion.setFromRotationMatrix(un),s&&(un.extractRotation(s.matrixWorld),ci.setFromRotationMatrix(un),this.quaternion.premultiply(ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jo),li.child=e,this.dispatchEvent(li),li.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hh),dr.child=e,this.dispatchEvent(dr),dr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jo),li.child=e,this.dispatchEvent(li),li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,e,dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,uh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new Y(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Yn extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fh={type:"move"};class ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,i),f=this._getHandJoint(c,M);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),g=.02,v=.005;c.inputState.pinching&&d>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Yn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Rl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},rs={h:0,s:0,l:0};function hr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=je.workingColorSpace){if(e=eh(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=hr(a,r,e+1/3),this.g=hr(a,r,e),this.b=hr(a,r,e-1/3)}return je.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const i=Rl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return je.workingToColorSpace(At.copy(this),e),Math.round(Ye(At.r*255,0,255))*65536+Math.round(Ye(At.g*255,0,255))*256+Math.round(Ye(At.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(At.copy(this),t);const i=At.r,s=At.g,r=At.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Xt){je.workingToColorSpace(At.copy(this),e);const t=At.r,i=At.g,s=At.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(rs);const i=rr(An.h,rs.h,t),s=rr(An.s,rs.s,t),r=rr(An.l,rs.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Xe;Xe.NAMES=Rl;class js{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new js(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Cl extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jt=new Y,hn=new Y,fr=new Y,fn=new Y,di=new Y,ui=new Y,Yo=new Y,pr=new Y,mr=new Y,gr=new Y,_r=new dt,xr=new dt,vr=new dt;class Kt{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),jt.subVectors(e,t),s.cross(jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){jt.subVectors(s,t),hn.subVectors(i,t),fr.subVectors(e,t);const a=jt.dot(jt),o=jt.dot(hn),l=jt.dot(fr),c=hn.dot(hn),h=hn.dot(fr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,g=(c*l-o*h)*d,v=(a*h-o*l)*d;return r.set(1-g-v,v,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fn.x),l.addScaledVector(a,fn.y),l.addScaledVector(o,fn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return _r.setScalar(0),xr.setScalar(0),vr.setScalar(0),_r.fromBufferAttribute(e,t),xr.fromBufferAttribute(e,i),vr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(_r,r.x),a.addScaledVector(xr,r.y),a.addScaledVector(vr,r.z),a}static isFrontFacing(e,t,i,s){return jt.subVectors(i,t),hn.subVectors(e,t),jt.cross(hn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),jt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;di.subVectors(s,i),ui.subVectors(r,i),pr.subVectors(e,i);const l=di.dot(pr),c=ui.dot(pr);if(l<=0&&c<=0)return t.copy(i);mr.subVectors(e,s);const h=di.dot(mr),u=ui.dot(mr);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(di,a);gr.subVectors(e,r);const g=di.dot(gr),v=ui.dot(gr);if(v>=0&&g<=v)return t.copy(r);const M=g*c-l*v;if(M<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(ui,o);const m=h*v-g*u;if(m<=0&&u-h>=0&&g-v>=0)return Yo.subVectors(r,s),o=(u-h)/(u-h+(g-v)),t.copy(s).addScaledVector(Yo,o);const f=1/(m+M+d);return a=M*f,o=d*f,t.copy(i).addScaledVector(di,a).addScaledVector(ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ji{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(r,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),as.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),as.copy(i.boundingBox)),as.applyMatrix4(e.matrixWorld),this.union(as)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),os.subVectors(this.max,Oi),hi.subVectors(e.a,Oi),fi.subVectors(e.b,Oi),pi.subVectors(e.c,Oi),Rn.subVectors(fi,hi),Cn.subVectors(pi,fi),Bn.subVectors(hi,pi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Bn.z,Bn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Bn.z,0,-Bn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Bn.y,Bn.x,0];return!Mr(t,hi,fi,pi,os)||(t=[1,0,0,0,1,0,0,0,1],!Mr(t,hi,fi,pi,os))?!1:(cs.crossVectors(Rn,Cn),t=[cs.x,cs.y,cs.z],Mr(t,hi,fi,pi,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const pn=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Yt=new Y,as=new Ji,hi=new Y,fi=new Y,pi=new Y,Rn=new Y,Cn=new Y,Bn=new Y,Oi=new Y,os=new Y,cs=new Y,zn=new Y;function Mr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zn.fromArray(n,r);const o=s.x*Math.abs(zn.x)+s.y*Math.abs(zn.y)+s.z*Math.abs(zn.z),l=e.dot(zn),c=t.dot(zn),h=i.dot(zn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const vt=new Y,ls=new $e;let ph=0;class Ut extends ni{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ph++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Io,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ls.fromBufferAttribute(this,t),ls.applyMatrix3(e),this.setXY(t,ls.x,ls.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ui(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),s=Ft(s,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Io&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Pl extends Ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Nl extends Ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class yt extends Ut{constructor(e,t,i){super(new Float32Array(e),t,i)}}const mh=new Ji,Bi=new Y,Sr=new Y;class Ys{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):mh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Bi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(Sr)),this.expandByPoint(Bi.copy(e.center).sub(Sr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let gh=0;const Wt=new ut,Er=new It,mi=new Y,Ht=new Ji,zi=new Ji,Et=new Y;class Nt extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ku(e)?Nl:Pl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,i){return Wt.makeTranslation(e,t,i),this.applyMatrix4(Wt),this}scale(e,t,i){return Wt.makeScale(e,t,i),this.applyMatrix4(Wt),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ys);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];zi.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Ht.min,zi.min),Ht.expandByPoint(Et),Et.addVectors(Ht.max,zi.max),Ht.expandByPoint(Et)):(Ht.expandByPoint(zi.min),Ht.expandByPoint(zi.max))}Ht.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(mi.fromBufferAttribute(e,c),Et.add(mi)),s=Math.max(s,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ut(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new Y,l[x]=new Y;const c=new Y,h=new Y,u=new Y,d=new $e,g=new $e,v=new $e,M=new Y,m=new Y;function f(x,C,U){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,C),u.fromBufferAttribute(i,U),d.fromBufferAttribute(r,x),g.fromBufferAttribute(r,C),v.fromBufferAttribute(r,U),h.sub(c),u.sub(c),g.sub(d),v.sub(d);const F=1/(g.x*v.y-v.x*g.y);isFinite(F)&&(M.copy(h).multiplyScalar(v.y).addScaledVector(u,-g.y).multiplyScalar(F),m.copy(u).multiplyScalar(g.x).addScaledVector(h,-v.x).multiplyScalar(F),o[x].add(M),o[C].add(M),o[U].add(M),l[x].add(m),l[C].add(m),l[U].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let x=0,C=A.length;x<C;++x){const U=A[x],F=U.start,V=U.count;for(let Z=F,z=F+V;Z<z;Z+=3)f(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const w=new Y,y=new Y,T=new Y,E=new Y;function P(x){T.fromBufferAttribute(s,x),E.copy(T);const C=o[x];w.copy(C),w.sub(T.multiplyScalar(T.dot(C))).normalize(),y.crossVectors(E,C);const F=y.dot(l[x])<0?-1:1;a.setXYZW(x,w.x,w.y,w.z,F)}for(let x=0,C=A.length;x<C;++x){const U=A[x],F=U.start,V=U.count;for(let Z=F,z=F+V;Z<z;Z+=3)P(e.getX(Z+0)),P(e.getX(Z+1)),P(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const s=new Y,r=new Y,a=new Y,o=new Y,l=new Y,c=new Y,h=new Y,u=new Y;if(e)for(let d=0,g=e.count;d<g;d+=3){const v=e.getX(d+0),M=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let g=0,v=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?g=l[M]*o.data.stride+o.offset:g=l[M]*h;for(let f=0;f<h;f++)d[v++]=c[g++]}return new Ut(d,h,u)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],g=e(d,i);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const g=c[u];h.push(g.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,g=u.length;d<g;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let _h=0;class Li extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Mi,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qr,this.blendDst=jr,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Do,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(i.blending=this.blending),this.side!==Un&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qr&&(i.blendSrc=this.blendSrc),this.blendDst!==jr&&(i.blendDst=this.blendDst),this.blendEquation!==Wn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Do&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const mn=new Y,yr=new Y,ds=new Y,Pn=new Y,br=new Y,us=new Y,Tr=new Y;class Ll{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mn.copy(this.origin).addScaledVector(this.direction,t),mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){yr.copy(e).add(t).multiplyScalar(.5),ds.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(yr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ds),o=Pn.dot(this.direction),l=-Pn.dot(ds),c=Pn.lengthSq(),h=Math.abs(1-a*a);let u,d,g,v;if(h>0)if(u=a*l-o,d=a*o-l,v=r*h,u>=0)if(d>=-v)if(d<=v){const M=1/h;u*=M,d*=M,g=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*l)+c;else d<=-v?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),g=-u*u+d*(d+2*l)+c):d<=v?(u=0,d=Math.min(Math.max(-r,-l),r),g=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),g=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yr).addScaledVector(ds,d),g}intersectSphere(e,t){mn.subVectors(e.center,this.origin);const i=mn.dot(this.direction),s=mn.dot(mn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,mn)!==null}intersectTriangle(e,t,i,s,r){br.subVectors(t,e),us.subVectors(i,e),Tr.crossVectors(br,us);let a=this.direction.dot(Tr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,e);const l=o*this.direction.dot(us.crossVectors(Pn,us));if(l<0)return null;const c=o*this.direction.dot(br.cross(Pn));if(c<0||l+c>a)return null;const h=-o*Pn.dot(Tr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class In extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $o=new ut,Gn=new Ll,hs=new Ys,Ko=new Y,fs=new Y,ps=new Y,ms=new Y,wr=new Y,gs=new Y,Zo=new Y,_s=new Y;class ct extends It{constructor(e=new Nt,t=new In){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){gs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(wr.fromBufferAttribute(u,e),a?gs.addScaledVector(wr,h):gs.addScaledVector(wr.sub(t),h))}t.add(gs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(r),Gn.copy(e.ray).recast(e.near),!(hs.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(hs,Ko)===null||Gn.origin.distanceToSquared(Ko)>(e.far-e.near)**2))&&($o.copy(r).invert(),Gn.copy(e.ray).applyMatrix4($o),!(i.boundingBox!==null&&Gn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,M=d.length;v<M;v++){const m=d[v],f=a[m.materialIndex],A=Math.max(m.start,g.start),w=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let y=A,T=w;y<T;y+=3){const E=o.getX(y),P=o.getX(y+1),x=o.getX(y+2);s=xs(this,f,e,i,c,h,u,E,P,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),M=Math.min(o.count,g.start+g.count);for(let m=v,f=M;m<f;m+=3){const A=o.getX(m),w=o.getX(m+1),y=o.getX(m+2);s=xs(this,a,e,i,c,h,u,A,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,M=d.length;v<M;v++){const m=d[v],f=a[m.materialIndex],A=Math.max(m.start,g.start),w=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let y=A,T=w;y<T;y+=3){const E=y,P=y+1,x=y+2;s=xs(this,f,e,i,c,h,u,E,P,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),M=Math.min(l.count,g.start+g.count);for(let m=v,f=M;m<f;m+=3){const A=m,w=m+1,y=m+2;s=xs(this,a,e,i,c,h,u,A,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function xh(n,e,t,i,s,r,a,o){let l;if(e.side===Bt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Un,o),l===null)return null;_s.copy(o),_s.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(_s);return c<t.near||c>t.far?null:{distance:c,point:_s.clone(),object:n}}function xs(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,fs),n.getVertexPosition(l,ps),n.getVertexPosition(c,ms);const h=xh(n,e,t,i,fs,ps,ms,Zo);if(h){const u=new Y;Kt.getBarycoord(Zo,fs,ps,ms,u),s&&(h.uv=Kt.getInterpolatedAttribute(s,o,l,c,u,new $e)),r&&(h.uv1=Kt.getInterpolatedAttribute(r,o,l,c,u,new $e)),a&&(h.normal=Kt.getInterpolatedAttribute(a,o,l,c,u,new Y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new Y,materialIndex:0};Kt.getNormal(fs,ps,ms,d.normal),h.face=d,h.barycoord=u}return h}class vh extends Pt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=bt,h=bt,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ar=new Y,Mh=new Y,Sh=new Oe;class kn{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ar.subVectors(i,t).cross(Mh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Ar),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Sh.getNormalMatrix(e),s=this.coplanarPoint(Ar).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Ys,Eh=new $e(.5,.5),vs=new Y;class $a{constructor(e=new kn,t=new kn,i=new kn,s=new kn,r=new kn,a=new kn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=an,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],g=r[7],v=r[8],M=r[9],m=r[10],f=r[11],A=r[12],w=r[13],y=r[14],T=r[15];if(s[0].setComponents(c-a,g-h,f-v,T-A).normalize(),s[1].setComponents(c+a,g+h,f+v,T+A).normalize(),s[2].setComponents(c+o,g+u,f+M,T+w).normalize(),s[3].setComponents(c-o,g-u,f-M,T-w).normalize(),i)s[4].setComponents(l,d,m,y).normalize(),s[5].setComponents(c-l,g-d,f-m,T-y).normalize();else if(s[4].setComponents(c-l,g-d,f-m,T-y).normalize(),t===an)s[5].setComponents(c+l,g+d,f+m,T+y).normalize();else if(t===$i)s[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){Hn.center.set(0,0,0);const t=Eh.distanceTo(e.center);return Hn.radius=.7071067811865476+t,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(vs.x=s.normal.x>0?e.max.x:e.min.x,vs.y=s.normal.y>0?e.max.y:e.min.y,vs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $s extends Li{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jo=new ut,Ua=new Ll,Ms=new Ys,Ss=new Y;class Ka extends It{constructor(e=new Nt,t=new $s){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ms.copy(i.boundingSphere),Ms.applyMatrix4(s),Ms.radius+=r,e.ray.intersectsSphere(Ms)===!1)return;Jo.copy(s).invert(),Ua.copy(e.ray).applyMatrix4(Jo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let v=d,M=g;v<M;v++){const m=c.getX(v);Ss.fromBufferAttribute(u,m),Qo(Ss,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=d,M=g;v<M;v++)Ss.fromBufferAttribute(u,v),Qo(Ss,v,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Qo(n,e,t,i,s,r,a){const o=Ua.distanceSqToPoint(n);if(o<t){const l=new Y;Ua.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Dl extends Pt{constructor(e=[],t=Jn,i,s,r,a,o,l,c,h){super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Il extends Pt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ri extends Pt{constructor(e,t,i=ln,s,r,a,o=bt,l=bt,c,h=En,u=1){if(h!==En&&h!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ya(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class yh extends Ri{constructor(e,t=ln,i=Jn,s,r,a=bt,o=bt,l,c=En){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ul extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ei extends Nt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,g=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(u,2));function v(M,m,f,A,w,y,T,E,P,x,C){const U=y/P,F=T/x,V=y/2,Z=T/2,z=E/2,I=P+1,j=x+1;let k=0,Q=0;const le=new Y;for(let fe=0;fe<j;fe++){const pe=fe*F-Z;for(let be=0;be<I;be++){const qe=be*U-V;le[M]=qe*A,le[m]=pe*w,le[f]=z,c.push(le.x,le.y,le.z),le[M]=0,le[m]=0,le[f]=E>0?1:-1,h.push(le.x,le.y,le.z),u.push(be/P),u.push(1-fe/x),k+=1}}for(let fe=0;fe<x;fe++)for(let pe=0;pe<P;pe++){const be=d+pe+I*fe,qe=d+pe+I*(fe+1),we=d+(pe+1)+I*(fe+1),He=d+(pe+1)+I*fe;l.push(be,qe,He),l.push(qe,we,He),Q+=6}o.addGroup(g,Q,C),g+=Q,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ei(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yi extends Nt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],g=[];let v=0;const M=[],m=i/2;let f=0;A(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new yt(u,3)),this.setAttribute("normal",new yt(d,3)),this.setAttribute("uv",new yt(g,2));function A(){const y=new Y,T=new Y;let E=0;const P=(t-e)/i;for(let x=0;x<=r;x++){const C=[],U=x/r,F=U*(t-e)+e;for(let V=0;V<=s;V++){const Z=V/s,z=Z*l+o,I=Math.sin(z),j=Math.cos(z);T.x=F*I,T.y=-U*i+m,T.z=F*j,u.push(T.x,T.y,T.z),y.set(I,P,j).normalize(),d.push(y.x,y.y,y.z),g.push(Z,1-U),C.push(v++)}M.push(C)}for(let x=0;x<s;x++)for(let C=0;C<r;C++){const U=M[C][x],F=M[C+1][x],V=M[C+1][x+1],Z=M[C][x+1];(e>0||C!==0)&&(h.push(U,F,Z),E+=3),(t>0||C!==r-1)&&(h.push(F,V,Z),E+=3)}c.addGroup(f,E,0),f+=E}function w(y){const T=v,E=new $e,P=new Y;let x=0;const C=y===!0?e:t,U=y===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*U,0),d.push(0,U,0),g.push(.5,.5),v++;const F=v;for(let V=0;V<=s;V++){const z=V/s*l+o,I=Math.cos(z),j=Math.sin(z);P.x=C*j,P.y=m*U,P.z=C*I,u.push(P.x,P.y,P.z),d.push(0,U,0),E.x=I*.5+.5,E.y=j*.5*U+.5,g.push(E.x,E.y),v++}for(let V=0;V<s;V++){const Z=T+V,z=F+V;y===!0?h.push(z,z+1,Z):h.push(z+1,z,Z),x+=3}c.addGroup(f,x,y===!0?1:2),f+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Za extends yi{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Za(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Di extends Nt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,g=[],v=[],M=[],m=[];for(let f=0;f<h;f++){const A=f*d-a;for(let w=0;w<c;w++){const y=w*u-r;v.push(y,-A,0),M.push(0,0,1),m.push(w/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let A=0;A<o;A++){const w=A+c*f,y=A+c*(f+1),T=A+1+c*(f+1),E=A+1+c*f;g.push(w,y,E),g.push(y,T,E)}this.setIndex(g),this.setAttribute("position",new yt(v,3)),this.setAttribute("normal",new yt(M,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vs extends Nt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new Y,d=new Y,g=[],v=[],M=[],m=[];for(let f=0;f<=i;f++){const A=[],w=f/i,y=a+w*o,T=e*Math.cos(y),E=Math.sqrt(e*e-T*T);let P=0;f===0&&a===0?P=.5/t:f===i&&l===Math.PI&&(P=-.5/t);for(let x=0;x<=t;x++){const C=x/t,U=s+C*r;u.x=-E*Math.cos(U),u.y=T,u.z=E*Math.sin(U),v.push(u.x,u.y,u.z),d.copy(u).normalize(),M.push(d.x,d.y,d.z),m.push(C+P,1-w),A.push(c++)}h.push(A)}for(let f=0;f<i;f++)for(let A=0;A<t;A++){const w=h[f][A+1],y=h[f][A],T=h[f+1][A],E=h[f+1][A+1];(f!==0||a>0)&&g.push(w,y,E),(f!==i-1||l<Math.PI)&&g.push(y,T,E)}this.setIndex(g),this.setAttribute("position",new yt(v,3)),this.setAttribute("normal",new yt(M,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ja extends Nt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],h=[],u=[],d=new Y,g=new Y,v=new Y;for(let M=0;M<=i;M++){const m=a+M/i*o;for(let f=0;f<=s;f++){const A=f/s*r;g.x=(e+t*Math.cos(m))*Math.cos(A),g.y=(e+t*Math.cos(m))*Math.sin(A),g.z=t*Math.sin(m),c.push(g.x,g.y,g.z),d.x=e*Math.cos(A),d.y=e*Math.sin(A),v.subVectors(g,d).normalize(),h.push(v.x,v.y,v.z),u.push(f/s),u.push(M/i)}}for(let M=1;M<=i;M++)for(let m=1;m<=s;m++){const f=(s+1)*M+m-1,A=(s+1)*(M-1)+m-1,w=(s+1)*(M-1)+m,y=(s+1)*M+m;l.push(f,A,y),l.push(A,w,y)}this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Ci(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(ec(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(ec(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Lt(n){const e={};for(let t=0;t<n.length;t++){const i=Ci(n[t]);for(const s in i)e[s]=i[s]}return e}function ec(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function bh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Fl(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Th={clone:Ci,merge:Lt};var wh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ah=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wh,this.fragmentShader=Ah,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ci(e.uniforms),this.uniformsGroups=bh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(s.value);break;case"v4":this.uniforms[i].value=new dt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ut().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Rh extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Vn extends Li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Da,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ch extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ph extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ol extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Rr=new ut,tc=new Y,nc=new Y;class Nh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=Vt,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $a,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;tc.setFromMatrixPosition(e.matrixWorld),t.position.copy(tc),nc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nc),t.updateMatrixWorld(),Rr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===$i||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Rr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Es=new Y,ys=new Ni,tn=new Y;class Bl extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=an,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Es,ys,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Es,ys,tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Es,ys,tn),tn.x===1&&tn.y===1&&tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Es,ys,tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new Y,ic=new $e,sc=new $e;class Ot extends Bl{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ia*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ia*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,ic,sc),t.subVectors(sc,ic)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(sr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Lh extends Nh{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0}}class $n extends Ol{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Lh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class zl extends Bl{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gl extends Ol{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const gi=-90,_i=1;class Dh extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ot(gi,_i,e,t);s.layers=this.layers,this.add(s);const r=new Ot(gi,_i,e,t);r.layers=this.layers,this.add(r);const a=new Ot(gi,_i,e,t);a.layers=this.layers,this.add(a);const o=new Ot(gi,_i,e,t);o.layers=this.layers,this.add(o);const l=new Ot(gi,_i,e,t);l.layers=this.layers,this.add(l);const c=new Ot(gi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===an)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$i)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,g),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Ih extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const io=class io{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};io.prototype.isMatrix2=!0;let rc=io;function ac(n,e,t,i){const s=Uh(i);switch(t){case El:return n*e;case bl:return n*e/s.components*s.byteLength;case ka:return n*e/s.components*s.byteLength;case Qn:return n*e*2/s.components*s.byteLength;case Wa:return n*e*2/s.components*s.byteLength;case yl:return n*e*3/s.components*s.byteLength;case Zt:return n*e*4/s.components*s.byteLength;case Xa:return n*e*4/s.components*s.byteLength;case Ps:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ls:case Ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sa:case aa:return Math.max(n,16)*Math.max(e,8)/4;case ia:case ra:return Math.max(n,8)*Math.max(e,8)/2;case oa:case ca:case da:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case la:case Os:case ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ma:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ga:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case _a:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case va:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ya:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ba:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case wa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Aa:case Ra:case Ca:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Pa:case Na:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Bs:case La:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uh(n){switch(n){case Vt:case xl:return{byteLength:1,components:1};case ji:case vl:case Sn:return{byteLength:2,components:1};case Ha:case Va:return{byteLength:2,components:4};case ln:case Ga:case rn:return{byteLength:4,components:1};case Ml:case Sl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:za}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=za);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hl(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Fh(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((g,v)=>g.start-v.start);let d=0;for(let g=1;g<u.length;g++){const v=u[d],M=u[g];M.start<=v.start+v.count+1?v.count=Math.max(v.count,M.start+M.count-v.start):(++d,u[d]=M)}u.length=d+1;for(let g=0,v=u.length;g<v;g++){const M=u[g];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Oh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bh=`#ifdef USE_ALPHAHASH
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
#endif`,zh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kh=`#ifdef USE_AOMAP
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
#endif`,Wh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xh=`#ifdef USE_BATCHING
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
#endif`,qh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$h=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kh=`#ifdef USE_IRIDESCENCE
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
#endif`,Zh=`#ifdef USE_BUMPMAP
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
#endif`,Jh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,af=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,of=`#define PI 3.141592653589793
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
} // validated`,cf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lf=`vec3 transformedNormal = objectNormal;
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
#endif`,df=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pf="gl_FragColor = linearToOutputTexel( gl_FragColor );",mf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gf=`#ifdef USE_ENVMAP
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
#endif`,_f=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
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
#endif`,vf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
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
#endif`,Sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ef=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tf=`#ifdef USE_GRADIENTMAP
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
}`,wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Af=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Pf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Df=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Uf=`PhysicalMaterial material;
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
#endif`,Ff=`uniform sampler2D dfgLUT;
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
}`,Of=`
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
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
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
#endif`,zf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yf=`#if defined( USE_POINTS_UV )
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
#endif`,$f=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ep=`#ifdef USE_MORPHTARGETS
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
#endif`,tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,op=`#ifdef USE_NORMALMAP
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
#endif`,cp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yp=`float getShadowMask() {
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
}`,bp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tp=`#ifdef USE_SKINNING
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
#endif`,wp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ap=`#ifdef USE_SKINNING
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
#endif`,Rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Np=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lp=`#ifdef USE_TRANSMISSION
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
#endif`,Dp=`#ifdef USE_TRANSMISSION
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
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Op=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zp=`uniform sampler2D t2D;
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
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`#include <common>
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
}`,Xp=`#if DEPTH_PACKING == 3200
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
}`,qp=`#define DISTANCE
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
}`,jp=`#define DISTANCE
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
}`,Yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$p=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`uniform float scale;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Jp=`#include <common>
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
}`,Qp=`uniform vec3 diffuse;
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
}`,em=`#define LAMBERT
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
}`,tm=`#define LAMBERT
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
}`,nm=`#define MATCAP
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
}`,im=`#define MATCAP
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
}`,sm=`#define NORMAL
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
}`,rm=`#define NORMAL
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
}`,am=`#define PHONG
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
}`,om=`#define PHONG
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
}`,cm=`#define STANDARD
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
}`,lm=`#define STANDARD
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
}`,dm=`#define TOON
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
}`,um=`#define TOON
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
}`,hm=`uniform float size;
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
}`,fm=`uniform vec3 diffuse;
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
}`,pm=`#include <common>
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
}`,mm=`uniform vec3 color;
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
}`,gm=`uniform float rotation;
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
}`,_m=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Oh,alphahash_pars_fragment:Bh,alphamap_fragment:zh,alphamap_pars_fragment:Gh,alphatest_fragment:Hh,alphatest_pars_fragment:Vh,aomap_fragment:kh,aomap_pars_fragment:Wh,batching_pars_vertex:Xh,batching_vertex:qh,begin_vertex:jh,beginnormal_vertex:Yh,bsdfs:$h,iridescence_fragment:Kh,bumpmap_pars_fragment:Zh,clipping_planes_fragment:Jh,clipping_planes_pars_fragment:Qh,clipping_planes_pars_vertex:ef,clipping_planes_vertex:tf,color_fragment:nf,color_pars_fragment:sf,color_pars_vertex:rf,color_vertex:af,common:of,cube_uv_reflection_fragment:cf,defaultnormal_vertex:lf,displacementmap_pars_vertex:df,displacementmap_vertex:uf,emissivemap_fragment:hf,emissivemap_pars_fragment:ff,colorspace_fragment:pf,colorspace_pars_fragment:mf,envmap_fragment:gf,envmap_common_pars_fragment:_f,envmap_pars_fragment:xf,envmap_pars_vertex:vf,envmap_physical_pars_fragment:Pf,envmap_vertex:Mf,fog_vertex:Sf,fog_pars_vertex:Ef,fog_fragment:yf,fog_pars_fragment:bf,gradientmap_pars_fragment:Tf,lightmap_pars_fragment:wf,lights_lambert_fragment:Af,lights_lambert_pars_fragment:Rf,lights_pars_begin:Cf,lights_toon_fragment:Nf,lights_toon_pars_fragment:Lf,lights_phong_fragment:Df,lights_phong_pars_fragment:If,lights_physical_fragment:Uf,lights_physical_pars_fragment:Ff,lights_fragment_begin:Of,lights_fragment_maps:Bf,lights_fragment_end:zf,lightprobes_pars_fragment:Gf,logdepthbuf_fragment:Hf,logdepthbuf_pars_fragment:Vf,logdepthbuf_pars_vertex:kf,logdepthbuf_vertex:Wf,map_fragment:Xf,map_pars_fragment:qf,map_particle_fragment:jf,map_particle_pars_fragment:Yf,metalnessmap_fragment:$f,metalnessmap_pars_fragment:Kf,morphinstance_vertex:Zf,morphcolor_vertex:Jf,morphnormal_vertex:Qf,morphtarget_pars_vertex:ep,morphtarget_vertex:tp,normal_fragment_begin:np,normal_fragment_maps:ip,normal_pars_fragment:sp,normal_pars_vertex:rp,normal_vertex:ap,normalmap_pars_fragment:op,clearcoat_normal_fragment_begin:cp,clearcoat_normal_fragment_maps:lp,clearcoat_pars_fragment:dp,iridescence_pars_fragment:up,opaque_fragment:hp,packing:fp,premultiplied_alpha_fragment:pp,project_vertex:mp,dithering_fragment:gp,dithering_pars_fragment:_p,roughnessmap_fragment:xp,roughnessmap_pars_fragment:vp,shadowmap_pars_fragment:Mp,shadowmap_pars_vertex:Sp,shadowmap_vertex:Ep,shadowmask_pars_fragment:yp,skinbase_vertex:bp,skinning_pars_vertex:Tp,skinning_vertex:wp,skinnormal_vertex:Ap,specularmap_fragment:Rp,specularmap_pars_fragment:Cp,tonemapping_fragment:Pp,tonemapping_pars_fragment:Np,transmission_fragment:Lp,transmission_pars_fragment:Dp,uv_pars_fragment:Ip,uv_pars_vertex:Up,uv_vertex:Fp,worldpos_vertex:Op,background_vert:Bp,background_frag:zp,backgroundCube_vert:Gp,backgroundCube_frag:Hp,cube_vert:Vp,cube_frag:kp,depth_vert:Wp,depth_frag:Xp,distance_vert:qp,distance_frag:jp,equirect_vert:Yp,equirect_frag:$p,linedashed_vert:Kp,linedashed_frag:Zp,meshbasic_vert:Jp,meshbasic_frag:Qp,meshlambert_vert:em,meshlambert_frag:tm,meshmatcap_vert:nm,meshmatcap_frag:im,meshnormal_vert:sm,meshnormal_frag:rm,meshphong_vert:am,meshphong_frag:om,meshphysical_vert:cm,meshphysical_frag:lm,meshtoon_vert:dm,meshtoon_frag:um,points_vert:hm,points_frag:fm,shadow_vert:pm,shadow_frag:mm,sprite_vert:gm,sprite_frag:_m},xe={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},sn={basic:{uniforms:Lt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Lt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Lt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Lt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Lt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Lt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Lt([xe.points,xe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Lt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Lt([xe.common,xe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Lt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Lt([xe.sprite,xe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Lt([xe.common,xe.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Lt([xe.lights,xe.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};sn.physical={uniforms:Lt([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const bs={r:0,b:0,g:0},xm=new ut,Vl=new Oe;Vl.set(-1,0,0,0,1,0,0,0,1);function vm(n,e,t,i,s,r){const a=new Xe(0);let o=s===!0?0:1,l,c,h=null,u=0,d=null;function g(A){let w=A.isScene===!0?A.background:null;if(w&&w.isTexture){const y=A.backgroundBlurriness>0;w=e.get(w,y)}return w}function v(A){let w=!1;const y=g(A);y===null?m(a,o):y&&y.isColor&&(m(y,1),w=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(A,w){const y=g(w);y&&(y.isCubeTexture||y.mapping===qs)?(c===void 0&&(c=new ct(new ei(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Ci(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(xm.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Vl),c.material.toneMapped=je.getTransfer(y.colorSpace)!==Qe,(h!==y||u!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ct(new Di(2,2),new dn({name:"BackgroundMaterial",uniforms:Ci(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=je.getTransfer(y.colorSpace)!==Qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,w){A.getRGB(bs,Fl(n)),t.buffers.color.setClear(bs.r,bs.g,bs.b,w,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,w=1){a.set(A),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,m(a,o)},render:v,addToRenderList:M,dispose:f}}function Mm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(F,V,Z,z,I){let j=!1;const k=u(F,z,Z,V);r!==k&&(r=k,c(r.object)),j=g(F,z,Z,I),j&&v(F,z,Z,I),I!==null&&e.update(I,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,y(F,V,Z,z),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function h(F){return n.deleteVertexArray(F)}function u(F,V,Z,z){const I=z.wireframe===!0;let j=i[V.id];j===void 0&&(j={},i[V.id]=j);const k=F.isInstancedMesh===!0?F.id:0;let Q=j[k];Q===void 0&&(Q={},j[k]=Q);let le=Q[Z.id];le===void 0&&(le={},Q[Z.id]=le);let fe=le[I];return fe===void 0&&(fe=d(l()),le[I]=fe),fe}function d(F){const V=[],Z=[],z=[];for(let I=0;I<t;I++)V[I]=0,Z[I]=0,z[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:Z,attributeDivisors:z,object:F,attributes:{},index:null}}function g(F,V,Z,z){const I=r.attributes,j=V.attributes;let k=0;const Q=Z.getAttributes();for(const le in Q)if(Q[le].location>=0){const pe=I[le];let be=j[le];if(be===void 0&&(le==="instanceMatrix"&&F.instanceMatrix&&(be=F.instanceMatrix),le==="instanceColor"&&F.instanceColor&&(be=F.instanceColor)),pe===void 0||pe.attribute!==be||be&&pe.data!==be.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function v(F,V,Z,z){const I={},j=V.attributes;let k=0;const Q=Z.getAttributes();for(const le in Q)if(Q[le].location>=0){let pe=j[le];pe===void 0&&(le==="instanceMatrix"&&F.instanceMatrix&&(pe=F.instanceMatrix),le==="instanceColor"&&F.instanceColor&&(pe=F.instanceColor));const be={};be.attribute=pe,pe&&pe.data&&(be.data=pe.data),I[le]=be,k++}r.attributes=I,r.attributesNum=k,r.index=z}function M(){const F=r.newAttributes;for(let V=0,Z=F.length;V<Z;V++)F[V]=0}function m(F){f(F,0)}function f(F,V){const Z=r.newAttributes,z=r.enabledAttributes,I=r.attributeDivisors;Z[F]=1,z[F]===0&&(n.enableVertexAttribArray(F),z[F]=1),I[F]!==V&&(n.vertexAttribDivisor(F,V),I[F]=V)}function A(){const F=r.newAttributes,V=r.enabledAttributes;for(let Z=0,z=V.length;Z<z;Z++)V[Z]!==F[Z]&&(n.disableVertexAttribArray(Z),V[Z]=0)}function w(F,V,Z,z,I,j,k){k===!0?n.vertexAttribIPointer(F,V,Z,I,j):n.vertexAttribPointer(F,V,Z,z,I,j)}function y(F,V,Z,z){M();const I=z.attributes,j=Z.getAttributes(),k=V.defaultAttributeValues;for(const Q in j){const le=j[Q];if(le.location>=0){let fe=I[Q];if(fe===void 0&&(Q==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),Q==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor)),fe!==void 0){const pe=fe.normalized,be=fe.itemSize,qe=e.get(fe);if(qe===void 0)continue;const we=qe.buffer,He=qe.type,ae=qe.bytesPerElement,ue=He===n.INT||He===n.UNSIGNED_INT||fe.gpuType===Ga;if(fe.isInterleavedBufferAttribute){const re=fe.data,Ie=re.stride,Ue=fe.offset;if(re.isInstancedInterleavedBuffer){for(let De=0;De<le.locationSize;De++)f(le.location+De,re.meshPerAttribute);F.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let De=0;De<le.locationSize;De++)m(le.location+De);n.bindBuffer(n.ARRAY_BUFFER,we);for(let De=0;De<le.locationSize;De++)w(le.location+De,be/le.locationSize,He,pe,Ie*ae,(Ue+be/le.locationSize*De)*ae,ue)}else{if(fe.isInstancedBufferAttribute){for(let re=0;re<le.locationSize;re++)f(le.location+re,fe.meshPerAttribute);F.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let re=0;re<le.locationSize;re++)m(le.location+re);n.bindBuffer(n.ARRAY_BUFFER,we);for(let re=0;re<le.locationSize;re++)w(le.location+re,be/le.locationSize,He,pe,be*ae,be/le.locationSize*re*ae,ue)}}else if(k!==void 0){const pe=k[Q];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(le.location,pe);break;case 3:n.vertexAttrib3fv(le.location,pe);break;case 4:n.vertexAttrib4fv(le.location,pe);break;default:n.vertexAttrib1fv(le.location,pe)}}}}A()}function T(){C();for(const F in i){const V=i[F];for(const Z in V){const z=V[Z];for(const I in z){const j=z[I];for(const k in j)h(j[k].object),delete j[k];delete z[I]}}delete i[F]}}function E(F){if(i[F.id]===void 0)return;const V=i[F.id];for(const Z in V){const z=V[Z];for(const I in z){const j=z[I];for(const k in j)h(j[k].object),delete j[k];delete z[I]}}delete i[F.id]}function P(F){for(const V in i){const Z=i[V];for(const z in Z){const I=Z[z];if(I[F.id]===void 0)continue;const j=I[F.id];for(const k in j)h(j[k].object),delete j[k];delete I[F.id]}}}function x(F){for(const V in i){const Z=i[V],z=F.isInstancedMesh===!0?F.id:0,I=Z[z];if(I!==void 0){for(const j in I){const k=I[j];for(const Q in k)h(k[Q].object),delete k[Q];delete I[j]}delete Z[z],Object.keys(Z).length===0&&delete i[V]}}}function C(){U(),a=!0,r!==s&&(r=s,c(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:U,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:m,disableUnusedAttributes:A}}function Sm(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let g=0;g<h;g++)d+=c[g];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Em(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Zt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const x=P===Sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Vt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==rn&&!x)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Fe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:v,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:A,maxVaryings:w,maxFragmentUniforms:y,maxSamples:T,samples:E}}function ym(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new kn,o=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const g=u.length!==0||d||i!==0||s;return s=d,i=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,g){const v=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||v===null||v.length===0||r&&!m)r?h(null):c();else{const A=r?0:i,w=A*4;let y=f.clippingState||null;l.value=y,y=h(v,d,w,g);for(let T=0;T!==w;++T)y[T]=t[T];f.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,g,v){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=l.value,v!==!0||m===null){const f=g+M*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,y=g;w!==M;++w,y+=4)a.copy(u[w]).applyMatrix4(A,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const Dn=4,oc=[.125,.215,.35,.446,.526,.582],Xn=20,bm=256,Gi=new zl,cc=new Xe;let Cr=null,Pr=0,Nr=0,Lr=!1;const Tm=new Y;class lc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Tm}=r;Cr=this._renderer.getRenderTarget(),Pr=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Lr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Cr,Pr,Nr),this._renderer.xr.enabled=Lr,e.scissorTest=!1,xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jn||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cr=this._renderer.getRenderTarget(),Pr=this._renderer.getActiveCubeFace(),Nr=this._renderer.getActiveMipmapLevel(),Lr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:Sn,format:Zt,colorSpace:zs,depthBuffer:!1},s=dc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=wm(r)),this._blurMaterial=Rm(r,e,t),this._ggxMaterial=Am(r,e,t)}return s}_compileMaterial(e){const t=new ct(new Nt,e);this._renderer.compile(t,Gi)}_sceneToCubeUV(e,t,i,s,r){const l=new Ot(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,g=u.toneMapping;u.getClearColor(cc),u.toneMapping=on,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new ei,new In({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let f=!1;const A=e.background;A?A.isColor&&(m.color.copy(A),e.background=null,f=!0):(m.color.copy(cc),f=!0);for(let w=0;w<6;w++){const y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;xi(s,y*T,w>2?T:0,T,T),u.setRenderTarget(s),f&&u.render(M,l),u.render(e,l)}u.toneMapping=g,u.autoClear=d,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Jn||e.mapping===Ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;xi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Gi)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,g=u*d,{_lodMax:v}=this,M=this._sizeLods[i],m=3*M*(i>v-Dn?i-v+Dn:0),f=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-t,xi(r,m,f,3*M,2*M),s.setRenderTarget(r),s.render(o,Gi),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-i,xi(e,m,f,3*M,2*M),s.setRenderTarget(e),s.render(o,Gi)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const d=c.uniforms,g=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Xn-1),M=r/v,m=isFinite(r)?1+Math.floor(h*M):Xn;m>Xn&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xn}`);const f=[];let A=0;for(let P=0;P<Xn;++P){const x=P/M,C=Math.exp(-x*x/2);f.push(C),P===0?A+=C:P<m&&(A+=2*C)}for(let P=0;P<f.length;P++)f[P]=f[P]/A;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:w}=this;d.dTheta.value=v,d.mipInt.value=w-i;const y=this._sizeLods[s],T=3*y*(s>w-Dn?s-w+Dn:0),E=4*(this._cubeSize-y);xi(t,T,E,3*y,2*y),l.setRenderTarget(t),l.render(u,Gi)}}function wm(n){const e=[],t=[],i=[];let s=n;const r=n-Dn+1+oc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Dn?l=oc[a-n+Dn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],g=6,v=6,M=3,m=2,f=1,A=new Float32Array(M*v*g),w=new Float32Array(m*v*g),y=new Float32Array(f*v*g);for(let E=0;E<g;E++){const P=E%3*2/3-1,x=E>2?0:-1,C=[P,x,0,P+2/3,x,0,P+2/3,x+1,0,P,x,0,P+2/3,x+1,0,P,x+1,0];A.set(C,M*v*E),w.set(d,m*v*E);const U=[E,E,E,E,E,E];y.set(U,f*v*E)}const T=new Nt;T.setAttribute("position",new Ut(A,M)),T.setAttribute("uv",new Ut(w,m)),T.setAttribute("faceIndex",new Ut(y,f)),i.push(new ct(T,null)),s>Dn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function dc(n,e,t){const i=new cn(n,e,t);return i.texture.mapping=qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xi(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Am(n,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ks(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Rm(n,e,t){const i=new Float32Array(Xn),s=new Y(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ks(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function uc(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ks(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function hc(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ks(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Ks(){return`

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
	`}class kl extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Dl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ei(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:Ci(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bt,blending:vn});r.uniforms.tEquirect.value=t;const a=new ct(s,r),o=t.minFilter;return t.minFilter===qn&&(t.minFilter=Ct),new Dh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function Cm(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,g=!1){return d==null?null:g?a(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===tr||g===nr)if(e.has(d)){const v=e.get(d).texture;return o(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const M=new kl(v.height);return M.fromEquirectangularTexture(n,d),e.set(d,M),d.addEventListener("dispose",c),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const g=d.mapping,v=g===tr||g===nr,M=g===Jn||g===Ai;if(v||M){let m=t.get(d);const f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return i===null&&(i=new lc(n)),m=v?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const A=d.image;return v&&A&&A.height>0||M&&A&&l(A)?(i===null&&(i=new lc(n)),m=v?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,g){return g===tr?d.mapping=Jn:g===nr&&(d.mapping=Ai),d}function l(d){let g=0;const v=6;for(let M=0;M<v;M++)d[M]!==void 0&&g++;return g===v}function c(d){const g=d.target;g.removeEventListener("dispose",c);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function h(d){const g=d.target;g.removeEventListener("dispose",h);const v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function Pm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Si("WebGLRenderer: "+i+" extension not supported."),s}}}function Nm(n,e,t,i){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete s[d.id];const g=r.get(d);g&&(e.remove(g),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER)}function c(u){const d=[],g=u.index,v=u.attributes.position;let M=0;if(v===void 0)return;if(g!==null){const A=g.array;M=g.version;for(let w=0,y=A.length;w<y;w+=3){const T=A[w+0],E=A[w+1],P=A[w+2];d.push(T,E,E,P,P,T)}}else{const A=v.array;M=v.version;for(let w=0,y=A.length/3-1;w<y;w+=3){const T=w+0,E=w+1,P=w+2;d.push(T,E,E,P,P,T)}}const m=new(v.count>=65535?Nl:Pl)(d,1);m.version=M;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const g=u.index;g!==null&&d.version<g.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Lm(n,e,t){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){n.drawElements(i,d,r,u*a),t.update(d,i,1)}function c(u,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,u*a,g),t.update(d,i,g))}function h(u,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,g);let M=0;for(let m=0;m<g;m++)M+=d[m];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Dm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Im(n,e,t){const i=new WeakMap,s=new dt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let C=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let w=0;g===!0&&(w=1),v===!0&&(w=2),M===!0&&(w=3);let y=o.attributes.position.count*w,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*T*4*u),P=new wl(E,y,T,u);P.type=rn,P.needsUpdate=!0;const x=w*4;for(let U=0;U<u;U++){const F=m[U],V=f[U],Z=A[U],z=y*T*4*U;for(let I=0;I<F.count;I++){const j=I*x;g===!0&&(s.fromBufferAttribute(F,I),E[z+j+0]=s.x,E[z+j+1]=s.y,E[z+j+2]=s.z,E[z+j+3]=0),v===!0&&(s.fromBufferAttribute(V,I),E[z+j+4]=s.x,E[z+j+5]=s.y,E[z+j+6]=s.z,E[z+j+7]=0),M===!0&&(s.fromBufferAttribute(Z,I),E[z+j+8]=s.x,E[z+j+9]=s.y,E[z+j+10]=s.z,E[z+j+11]=Z.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new $e(y,T)},i.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let M=0;M<c.length;M++)g+=c[M];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Um(n,e,t,i,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const g=c.skeleton;r.get(g)!==h&&(g.update(),r.set(g,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const Fm={[dl]:"LINEAR_TONE_MAPPING",[ul]:"REINHARD_TONE_MAPPING",[hl]:"CINEON_TONE_MAPPING",[fl]:"ACES_FILMIC_TONE_MAPPING",[ml]:"AGX_TONE_MAPPING",[gl]:"NEUTRAL_TONE_MAPPING",[pl]:"CUSTOM_TONE_MAPPING"};function Om(n,e,t,i,s,r){const a=new cn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Ri(e,t):void 0}),o=new cn(e,t,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),l=new Nt;l.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new yt([0,2,0,0,2,0],2));const c=new Rh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new ct(l,c),u=new zl(-1,1,1,-1,0,1);let d=null,g=null,v=!1,M,m=null,f=[],A=!1;this.setSize=function(w,y){a.setSize(w,y),o.setSize(w,y);for(let T=0;T<f.length;T++){const E=f[T];E.setSize&&E.setSize(w,y)}},this.setEffects=function(w){f=w,A=f.length>0&&f[0].isRenderPass===!0;const y=a.width,T=a.height;for(let E=0;E<f.length;E++){const P=f[E];P.setSize&&P.setSize(y,T)}},this.begin=function(w,y){if(v||w.toneMapping===on&&f.length===0)return!1;if(m=y,y!==null){const T=y.width,E=y.height;(a.width!==T||a.height!==E)&&this.setSize(T,E)}return A===!1&&w.setRenderTarget(a),M=w.toneMapping,w.toneMapping=on,!0},this.hasRenderPass=function(){return A},this.end=function(w,y){w.toneMapping=M,v=!0;let T=a,E=o;for(let P=0;P<f.length;P++){const x=f[P];if(x.enabled!==!1&&(x.render(w,E,T,y),x.needsSwap!==!1)){const C=T;T=E,E=C}}if(d!==w.outputColorSpace||g!==w.toneMapping){d=w.outputColorSpace,g=w.toneMapping,c.defines={},je.getTransfer(d)===Qe&&(c.defines.SRGB_TRANSFER="");const P=Fm[g];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(m),w.render(h,u),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Wl=new Pt,Fa=new Ri(1,1),Xl=new wl,ql=new ah,jl=new Dl,fc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),_c=new Float32Array(4);function Ii(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=fc[s];if(r===void 0&&(r=new Float32Array(s),fc[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Zs(n,e){let t=pc[e];t===void 0&&(t=new Int32Array(e),pc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Bm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Vm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;_c.set(i),n.uniformMatrix2fv(this.addr,!1,_c),St(t,i)}}function km(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;gc.set(i),n.uniformMatrix3fv(this.addr,!1,gc),St(t,i)}}function Wm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;mc.set(i),n.uniformMatrix4fv(this.addr,!1,mc),St(t,i)}}function Xm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function Ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function $m(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function Zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function Jm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function Qm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Fa.compareFunction=t.isReversedDepthBuffer()?ja:qa,r=Fa):r=Wl,t.setTexture2D(e||r,s)}function eg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||ql,s)}function tg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||jl,s)}function ng(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Xl,s)}function ig(n){switch(n){case 5126:return Bm;case 35664:return zm;case 35665:return Gm;case 35666:return Hm;case 35674:return Vm;case 35675:return km;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return qm;case 35668:case 35672:return jm;case 35669:case 35673:return Ym;case 5125:return $m;case 36294:return Km;case 36295:return Zm;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return ng}}function sg(n,e){n.uniform1fv(this.addr,e)}function rg(n,e){const t=Ii(e,this.size,2);n.uniform2fv(this.addr,t)}function ag(n,e){const t=Ii(e,this.size,3);n.uniform3fv(this.addr,t)}function og(n,e){const t=Ii(e,this.size,4);n.uniform4fv(this.addr,t)}function cg(n,e){const t=Ii(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function lg(n,e){const t=Ii(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function dg(n,e){const t=Ii(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ug(n,e){n.uniform1iv(this.addr,e)}function hg(n,e){n.uniform2iv(this.addr,e)}function fg(n,e){n.uniform3iv(this.addr,e)}function pg(n,e){n.uniform4iv(this.addr,e)}function mg(n,e){n.uniform1uiv(this.addr,e)}function gg(n,e){n.uniform2uiv(this.addr,e)}function _g(n,e){n.uniform3uiv(this.addr,e)}function xg(n,e){n.uniform4uiv(this.addr,e)}function vg(n,e,t){const i=this.cache,s=e.length,r=Zs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Fa:a=Wl;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Mg(n,e,t){const i=this.cache,s=e.length,r=Zs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ql,r[a])}function Sg(n,e,t){const i=this.cache,s=e.length,r=Zs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||jl,r[a])}function Eg(n,e,t){const i=this.cache,s=e.length,r=Zs(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),St(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Xl,r[a])}function yg(n){switch(n){case 5126:return sg;case 35664:return rg;case 35665:return ag;case 35666:return og;case 35674:return cg;case 35675:return lg;case 35676:return dg;case 5124:case 35670:return ug;case 35667:case 35671:return hg;case 35668:case 35672:return fg;case 35669:case 35673:return pg;case 5125:return mg;case 36294:return gg;case 36295:return _g;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return vg;case 35679:case 36299:case 36307:return Mg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return Eg}}class bg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ig(t.type)}}class Tg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yg(t.type)}}class wg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Dr=/(\w+)(\])?(\[|\.)?/g;function xc(n,e){n.seq.push(e),n.map[e.id]=e}function Ag(n,e,t){const i=n.name,s=i.length;for(Dr.lastIndex=0;;){const r=Dr.exec(i),a=Dr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){xc(t,c===void 0?new bg(o,n,e):new Tg(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new wg(o),xc(t,u)),t=u}}}class Is{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ag(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function vc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Rg=37297;let Cg=0;function Pg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Mc=new Oe;function Ng(n){je._getMatrix(Mc,je.workingColorSpace,n);const e=`mat3( ${Mc.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case Gs:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Sc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Pg(n.getShaderSource(e),o)}else return r}function Lg(n,e){const t=Ng(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Dg={[dl]:"Linear",[ul]:"Reinhard",[hl]:"Cineon",[fl]:"ACESFilmic",[ml]:"AgX",[gl]:"Neutral",[pl]:"Custom"};function Ig(n,e){const t=Dg[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ts=new Y;function Ug(){je.getLuminanceCoefficients(Ts);const n=Ts.x.toFixed(4),e=Ts.y.toFixed(4),t=Ts.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qi).join(`
`)}function Og(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Bg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function qi(n){return n!==""}function Ec(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(n){return n.replace(zg,Hg)}const Gg=new Map;function Hg(n,e){let t=Ge[e];if(t===void 0){const i=Gg.get(e);if(i!==void 0)t=Ge[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Oa(t)}const Vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bc(n){return n.replace(Vg,kg)}function kg(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Wg={[Cs]:"SHADOWMAP_TYPE_PCF",[Xi]:"SHADOWMAP_TYPE_VSM"};function Xg(n){return Wg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const qg={[Jn]:"ENVMAP_TYPE_CUBE",[Ai]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE_UV"};function jg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":qg[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Yg={[Ai]:"ENVMAP_MODE_REFRACTION"};function $g(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Yg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Kg={[ll]:"ENVMAP_BLENDING_MULTIPLY",[zu]:"ENVMAP_BLENDING_MIX",[Gu]:"ENVMAP_BLENDING_ADD"};function Zg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Kg[n.combine]||"ENVMAP_BLENDING_NONE"}function Jg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Qg(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Xg(t),c=jg(t),h=$g(t),u=Zg(t),d=Jg(t),g=Fg(t),v=Og(r),M=s.createProgram();let m,f,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(qi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(qi).join(`
`),f.length>0&&(f+=`
`)):(m=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qi).join(`
`),f=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==on?"#define TONE_MAPPING":"",t.toneMapping!==on?Ge.tonemapping_pars_fragment:"",t.toneMapping!==on?Ig("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Lg("linearToOutputTexel",t.outputColorSpace),Ug(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qi).join(`
`)),a=Oa(a),a=Ec(a,t),a=yc(a,t),o=Oa(o),o=Ec(o,t),o=yc(o,t),a=bc(a),o=bc(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=A+m+a,y=A+f+o,T=vc(s,s.VERTEX_SHADER,w),E=vc(s,s.FRAGMENT_SHADER,y);s.attachShader(M,T),s.attachShader(M,E),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function P(F){if(n.debug.checkShaderErrors){const V=s.getProgramInfoLog(M)||"",Z=s.getShaderInfoLog(T)||"",z=s.getShaderInfoLog(E)||"",I=V.trim(),j=Z.trim(),k=z.trim();let Q=!0,le=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,T,E);else{const fe=Sc(s,T,"vertex"),pe=Sc(s,E,"fragment");Je("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+I+`
`+fe+`
`+pe)}else I!==""?Fe("WebGLProgram: Program Info Log:",I):(j===""||k==="")&&(le=!1);le&&(F.diagnostics={runnable:Q,programLog:I,vertexShader:{log:j,prefix:m},fragmentShader:{log:k,prefix:f}})}s.deleteShader(T),s.deleteShader(E),x=new Is(s,M),C=Bg(s,M)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(M,Rg)),U},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cg++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=T,this.fragmentShader=E,this}let e0=0;class t0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new n0(e),t.set(e,i)),i}}class n0{constructor(e){this.id=e0++,this.code=e,this.usedTimes=0}}function i0(n){return n===Qn||n===Os||n===Bs}function s0(n,e,t,i,s,r){const a=new Al,o=new t0,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return l.add(x),x===0?"uv":`uv${x}`}function M(x,C,U,F,V,Z){const z=F.fog,I=V.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=e.get(x.envMap||j,k),le=Q&&Q.mapping===qs?Q.image.height:null,fe=g[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Fe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const pe=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,be=pe!==void 0?pe.length:0;let qe=0;I.morphAttributes.position!==void 0&&(qe=1),I.morphAttributes.normal!==void 0&&(qe=2),I.morphAttributes.color!==void 0&&(qe=3);let we,He,ae,ue;if(fe){const Ae=sn[fe];we=Ae.vertexShader,He=Ae.fragmentShader}else{we=x.vertexShader,He=x.fragmentShader;const Ae=o.getVertexShaderStage(x),ft=o.getFragmentShaderStage(x);o.update(x,Ae,ft),ae=Ae.id,ue=ft.id}const re=n.getRenderTarget(),Ie=n.state.buffers.depth.getReversed(),Ue=V.isInstancedMesh===!0,De=V.isBatchedMesh===!0,tt=!!x.map,ze=!!x.matcap,Ke=!!Q,We=!!x.aoMap,Ve=!!x.lightMap,ot=!!x.bumpMap&&x.wireframe===!1,lt=!!x.normalMap,ht=!!x.displacementMap,gt=!!x.emissiveMap,st=!!x.metalnessMap,X=!!x.roughnessMap,R=x.anisotropy>0,te=x.clearcoat>0,ne=x.dispersion>0,S=x.iridescence>0,p=x.sheen>0,N=x.transmission>0,L=R&&!!x.anisotropyMap,O=te&&!!x.clearcoatMap,q=te&&!!x.clearcoatNormalMap,B=te&&!!x.clearcoatRoughnessMap,D=S&&!!x.iridescenceMap,G=S&&!!x.iridescenceThicknessMap,ee=p&&!!x.sheenColorMap,ce=p&&!!x.sheenRoughnessMap,se=!!x.specularMap,ie=!!x.specularColorMap,_e=!!x.specularIntensityMap,Me=N&&!!x.transmissionMap,Pe=N&&!!x.thicknessMap,H=!!x.gradientMap,ge=!!x.alphaMap,oe=x.alphaTest>0,me=!!x.alphaHash,Ee=!!x.extensions;let de=on;x.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(de=n.toneMapping);const Ce={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:we,fragmentShader:He,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:ue,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:De,batchingColor:De&&V._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&V.instanceColor!==null,instancingMorph:Ue&&V.morphTexture!==null,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:tt,matcap:ze,envMap:Ke,envMapMode:Ke&&Q.mapping,envMapCubeUVHeight:le,aoMap:We,lightMap:Ve,bumpMap:ot,normalMap:lt,displacementMap:ht,emissiveMap:gt,normalMapObjectSpace:lt&&x.normalMapType===ku,normalMapTangentSpace:lt&&x.normalMapType===Da,packedNormalMap:lt&&x.normalMapType===Da&&i0(x.normalMap.format),metalnessMap:st,roughnessMap:X,anisotropy:R,anisotropyMap:L,clearcoat:te,clearcoatMap:O,clearcoatNormalMap:q,clearcoatRoughnessMap:B,dispersion:ne,iridescence:S,iridescenceMap:D,iridescenceThicknessMap:G,sheen:p,sheenColorMap:ee,sheenRoughnessMap:ce,specularMap:se,specularColorMap:ie,specularIntensityMap:_e,transmission:N,transmissionMap:Me,thicknessMap:Pe,gradientMap:H,opaque:x.transparent===!1&&x.blending===Mi&&x.alphaToCoverage===!1,alphaMap:ge,alphaTest:oe,alphaHash:me,combine:x.combine,mapUv:tt&&v(x.map.channel),aoMapUv:We&&v(x.aoMap.channel),lightMapUv:Ve&&v(x.lightMap.channel),bumpMapUv:ot&&v(x.bumpMap.channel),normalMapUv:lt&&v(x.normalMap.channel),displacementMapUv:ht&&v(x.displacementMap.channel),emissiveMapUv:gt&&v(x.emissiveMap.channel),metalnessMapUv:st&&v(x.metalnessMap.channel),roughnessMapUv:X&&v(x.roughnessMap.channel),anisotropyMapUv:L&&v(x.anisotropyMap.channel),clearcoatMapUv:O&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:q&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:D&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:G&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:ce&&v(x.sheenRoughnessMap.channel),specularMapUv:se&&v(x.specularMap.channel),specularColorMapUv:ie&&v(x.specularColorMap.channel),specularIntensityMapUv:_e&&v(x.specularIntensityMap.channel),transmissionMapUv:Me&&v(x.transmissionMap.channel),thicknessMapUv:Pe&&v(x.thicknessMap.channel),alphaMapUv:ge&&v(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(lt||R),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!I.attributes.uv&&(tt||ge),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&lt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ie,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:qe,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:de,decodeVideoTexture:tt&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===Qe,decodeVideoTextureEmissive:gt&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===Qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===gn,flipSided:x.side===Bt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ee&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&x.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function m(x){const C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(const U in x.defines)C.push(U),C.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(f(C,x),A(C,x),C.push(n.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function f(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function A(x,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function w(x){const C=g[x.type];let U;if(C){const F=sn[C];U=Th.clone(F.uniforms)}else U=x.uniforms;return U}function y(x,C){let U=h.get(C);return U!==void 0?++U.usedTimes:(U=new Qg(n,C,x,s),c.push(U),h.set(C,U)),U}function T(x){if(--x.usedTimes===0){const C=c.indexOf(x);c[C]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function P(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:w,acquireProgram:y,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:P}}function r0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function a0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function wc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ac(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,v,M,m,f){let A=n[e];return A===void 0?(A={id:d.id,object:d,geometry:g,material:v,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:m,group:f},n[e]=A):(A.id=d.id,A.object=d,A.geometry=g,A.material=v,A.materialVariant=a(d),A.groupOrder=M,A.renderOrder=d.renderOrder,A.z=m,A.group=f),e++,A}function l(d,g,v,M,m,f){const A=o(d,g,v,M,m,f);v.transmission>0?i.push(A):v.transparent===!0?s.push(A):t.push(A)}function c(d,g,v,M,m,f){const A=o(d,g,v,M,m,f);v.transmission>0?i.unshift(A):v.transparent===!0?s.unshift(A):t.unshift(A)}function h(d,g,v){t.length>1&&t.sort(d||a0),i.length>1&&i.sort(g||wc),s.length>1&&s.sort(g||wc),v&&(t.reverse(),i.reverse(),s.reverse())}function u(){for(let d=e,g=n.length;d<g;d++){const v=n[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function o0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Ac,n.set(i,[a])):s>=r.length?(a=new Ac,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function c0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new Xe};break;case"SpotLight":t={position:new Y,direction:new Y,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function l0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let d0=0;function u0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function h0(n){const e=new c0,t=l0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Y);const s=new Y,r=new ut,a=new ut;function o(c){let h=0,u=0,d=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let g=0,v=0,M=0,m=0,f=0,A=0,w=0,y=0,T=0,E=0,P=0;c.sort(u0);for(let C=0,U=c.length;C<U;C++){const F=c[C],V=F.color,Z=F.intensity,z=F.distance;let I=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Qn?I=F.shadow.map.texture:I=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)h+=V.r*Z,u+=V.g*Z,d+=V.b*Z;else if(F.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(F.sh.coefficients[j],Z);P++}else if(F.isDirectionalLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const k=F.shadow,Q=t.get(F);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=I,i.directionalShadowMatrix[g]=F.shadow.matrix,A++}i.directional[g]=j,g++}else if(F.isSpotLight){const j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(V).multiplyScalar(Z),j.distance=z,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,i.spot[M]=j;const k=F.shadow;if(F.map&&(i.spotLightMap[T]=F.map,T++,k.updateMatrices(F),F.castShadow&&E++),i.spotLightMatrix[M]=k.matrix,F.castShadow){const Q=t.get(F);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=I,y++}M++}else if(F.isRectAreaLight){const j=e.get(F);j.color.copy(V).multiplyScalar(Z),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),i.rectArea[m]=j,m++}else if(F.isPointLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){const k=F.shadow,Q=t.get(F);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,Q.shadowCameraNear=k.camera.near,Q.shadowCameraFar=k.camera.far,i.pointShadow[v]=Q,i.pointShadowMap[v]=I,i.pointShadowMatrix[v]=F.shadow.matrix,w++}i.point[v]=j,v++}else if(F.isHemisphereLight){const j=e.get(F);j.skyColor.copy(F.color).multiplyScalar(Z),j.groundColor.copy(F.groundColor).multiplyScalar(Z),i.hemi[f]=j,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const x=i.hash;(x.directionalLength!==g||x.pointLength!==v||x.spotLength!==M||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==A||x.numPointShadows!==w||x.numSpotShadows!==y||x.numSpotMaps!==T||x.numLightProbes!==P)&&(i.directional.length=g,i.spot.length=M,i.rectArea.length=m,i.point.length=v,i.hemi.length=f,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=y+T-E,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,x.directionalLength=g,x.pointLength=v,x.spotLength=M,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=A,x.numPointShadows=w,x.numSpotShadows=y,x.numSpotMaps=T,x.numLightProbes=P,i.version=d0++)}function l(c,h){let u=0,d=0,g=0,v=0,M=0;const m=h.matrixWorldInverse;for(let f=0,A=c.length;f<A;f++){const w=c[f];if(w.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(w.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),g++}else if(w.isRectAreaLight){const y=i.rectArea[v];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),v++}else if(w.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){const y=i.hemi[M];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:i}}function Rc(n){const e=new h0(n),t=[],i=[],s=[];function r(d){u.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function f0(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Rc(n),e.set(s,[o])):r>=a.length?(o=new Rc(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const p0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m0=`uniform sampler2D shadow_pass;
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
}`,g0=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],_0=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Cc=new ut,Hi=new Y,Ir=new Y;function x0(n,e,t){let i=new $a;const s=new $e,r=new $e,a=new dt,o=new Ch,l=new Ph,c={},h=t.maxTextureSize,u={[Un]:Bt,[Bt]:Un,[gn]:gn},d=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:p0,fragmentShader:m0}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const v=new Nt;v.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ct(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cs;let f=this.type;this.render=function(E,P,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Mu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Cs);const C=n.getRenderTarget(),U=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),V=n.state;V.setBlending(vn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const Z=f!==this.type;Z&&P.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(I=>I.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,I=E.length;z<I;z++){const j=E[z],k=j.shadow;if(k===void 0){Fe("WebGLShadowMap:",j,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const Q=k.getFrameExtents();s.multiply(Q),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y));const le=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=le,k.map===null||Z===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Xi){if(j.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new cn(s.x,s.y,{format:Qn,type:Sn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),k.map.texture.name=j.name+".shadowMap",k.map.depthTexture=new Ri(s.x,s.y,rn),k.map.depthTexture.name=j.name+".shadowMapDepth",k.map.depthTexture.format=En,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=bt,k.map.depthTexture.magFilter=bt}else j.isPointLight?(k.map=new kl(s.x),k.map.depthTexture=new yh(s.x,ln)):(k.map=new cn(s.x,s.y),k.map.depthTexture=new Ri(s.x,s.y,ln)),k.map.depthTexture.name=j.name+".shadowMap",k.map.depthTexture.format=En,this.type===Cs?(k.map.depthTexture.compareFunction=le?ja:qa,k.map.depthTexture.minFilter=Ct,k.map.depthTexture.magFilter=Ct):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=bt,k.map.depthTexture.magFilter=bt);k.camera.updateProjectionMatrix()}const fe=k.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<fe;pe++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(k.map),n.clear());const be=k.getViewport(pe);a.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),V.viewport(a)}if(j.isPointLight){const be=k.camera,qe=k.matrix,we=j.distance||be.far;we!==be.far&&(be.far=we,be.updateProjectionMatrix()),Hi.setFromMatrixPosition(j.matrixWorld),be.position.copy(Hi),Ir.copy(be.position),Ir.add(g0[pe]),be.up.copy(_0[pe]),be.lookAt(Ir),be.updateMatrixWorld(),qe.makeTranslation(-Hi.x,-Hi.y,-Hi.z),Cc.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Cc,be.coordinateSystem,be.reversedDepth)}else k.updateMatrices(j);i=k.getFrustum(),y(P,x,k.camera,j,this.type)}k.isPointLightShadow!==!0&&this.type===Xi&&A(k,x),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(C,U,F)};function A(E,P){const x=e.update(M);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,g.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new cn(s.x,s.y,{format:Qn,type:Sn})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,x,d,M,null),g.uniforms.shadow_pass.value=E.mapPass.texture,g.uniforms.resolution.value=E.mapSize,g.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,x,g,M,null)}function w(E,P,x,C){let U=null;const F=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(F!==void 0)U=F;else if(U=x.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const V=U.uuid,Z=P.uuid;let z=c[V];z===void 0&&(z={},c[V]=z);let I=z[Z];I===void 0&&(I=U.clone(),z[Z]=I,P.addEventListener("dispose",T)),U=I}if(U.visible=P.visible,U.wireframe=P.wireframe,C===Xi?U.side=P.shadowSide!==null?P.shadowSide:P.side:U.side=P.shadowSide!==null?P.shadowSide:u[P.side],U.alphaMap=P.alphaMap,U.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,U.map=P.map,U.clipShadows=P.clipShadows,U.clippingPlanes=P.clippingPlanes,U.clipIntersection=P.clipIntersection,U.displacementMap=P.displacementMap,U.displacementScale=P.displacementScale,U.displacementBias=P.displacementBias,U.wireframeLinewidth=P.wireframeLinewidth,U.linewidth=P.linewidth,x.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const V=n.properties.get(U);V.light=x}return U}function y(E,P,x,C,U){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&U===Xi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const Z=e.update(E),z=E.material;if(Array.isArray(z)){const I=Z.groups;for(let j=0,k=I.length;j<k;j++){const Q=I[j],le=z[Q.materialIndex];if(le&&le.visible){const fe=w(E,le,C,U);E.onBeforeShadow(n,E,P,x,Z,fe,Q),n.renderBufferDirect(x,null,Z,fe,E,Q),E.onAfterShadow(n,E,P,x,Z,fe,Q)}}}else if(z.visible){const I=w(E,z,C,U);E.onBeforeShadow(n,E,P,x,Z,I,null),n.renderBufferDirect(x,null,Z,I,E,null),E.onAfterShadow(n,E,P,x,Z,I,null)}}const V=E.children;for(let Z=0,z=V.length;Z<z;Z++)y(V[Z],P,x,C,U)}function T(E){E.target.removeEventListener("dispose",T);for(const x in c){const C=c[x],U=E.target.uuid;U in C&&(C[U].dispose(),delete C[U])}}}function v0(n,e){function t(){let H=!1;const ge=new dt;let oe=null;const me=new dt(0,0,0,0);return{setMask:function(Ee){oe!==Ee&&!H&&(n.colorMask(Ee,Ee,Ee,Ee),oe=Ee)},setLocked:function(Ee){H=Ee},setClear:function(Ee,de,Ce,Ae,ft){ft===!0&&(Ee*=Ae,de*=Ae,Ce*=Ae),ge.set(Ee,de,Ce,Ae),me.equals(ge)===!1&&(n.clearColor(Ee,de,Ce,Ae),me.copy(ge))},reset:function(){H=!1,oe=null,me.set(-1,0,0,0)}}}function i(){let H=!1,ge=!1,oe=null,me=null,Ee=null;return{setReversed:function(de){if(ge!==de){const Ce=e.get("EXT_clip_control");de?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ge=de;const Ae=Ee;Ee=null,this.setClear(Ae)}},getReversed:function(){return ge},setTest:function(de){de?re(n.DEPTH_TEST):Ie(n.DEPTH_TEST)},setMask:function(de){oe!==de&&!H&&(n.depthMask(de),oe=de)},setFunc:function(de){if(ge&&(de=Qu[de]),me!==de){switch(de){case Yr:n.depthFunc(n.NEVER);break;case $r:n.depthFunc(n.ALWAYS);break;case Kr:n.depthFunc(n.LESS);break;case wi:n.depthFunc(n.LEQUAL);break;case Zr:n.depthFunc(n.EQUAL);break;case Jr:n.depthFunc(n.GEQUAL);break;case Qr:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=de}},setLocked:function(de){H=de},setClear:function(de){Ee!==de&&(Ee=de,ge&&(de=1-de),n.clearDepth(de))},reset:function(){H=!1,oe=null,me=null,Ee=null,ge=!1}}}function s(){let H=!1,ge=null,oe=null,me=null,Ee=null,de=null,Ce=null,Ae=null,ft=null;return{setTest:function(rt){H||(rt?re(n.STENCIL_TEST):Ie(n.STENCIL_TEST))},setMask:function(rt){ge!==rt&&!H&&(n.stencilMask(rt),ge=rt)},setFunc:function(rt,Jt,Qt){(oe!==rt||me!==Jt||Ee!==Qt)&&(n.stencilFunc(rt,Jt,Qt),oe=rt,me=Jt,Ee=Qt)},setOp:function(rt,Jt,Qt){(de!==rt||Ce!==Jt||Ae!==Qt)&&(n.stencilOp(rt,Jt,Qt),de=rt,Ce=Jt,Ae=Qt)},setLocked:function(rt){H=rt},setClear:function(rt){ft!==rt&&(n.clearStencil(rt),ft=rt)},reset:function(){H=!1,ge=null,oe=null,me=null,Ee=null,de=null,Ce=null,Ae=null,ft=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d={},g=new WeakMap,v=[],M=null,m=!1,f=null,A=null,w=null,y=null,T=null,E=null,P=null,x=new Xe(0,0,0),C=0,U=!1,F=null,V=null,Z=null,z=null,I=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Q=0;const le=n.getParameter(n.VERSION);le.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(le)[1]),k=Q>=1):le.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),k=Q>=2);let fe=null,pe={};const be=n.getParameter(n.SCISSOR_BOX),qe=n.getParameter(n.VIEWPORT),we=new dt().fromArray(be),He=new dt().fromArray(qe);function ae(H,ge,oe,me){const Ee=new Uint8Array(4),de=n.createTexture();n.bindTexture(H,de),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ce=0;Ce<oe;Ce++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(ge+Ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return de}const ue={};ue[n.TEXTURE_2D]=ae(n.TEXTURE_2D,n.TEXTURE_2D,1),ue[n.TEXTURE_CUBE_MAP]=ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[n.TEXTURE_2D_ARRAY]=ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ue[n.TEXTURE_3D]=ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(n.DEPTH_TEST),a.setFunc(wi),ot(!1),lt(Po),re(n.CULL_FACE),We(vn);function re(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function Ie(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function Ue(H,ge){return d[H]!==ge?(n.bindFramebuffer(H,ge),d[H]=ge,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ge),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function De(H,ge){let oe=v,me=!1;if(H){oe=g.get(ge),oe===void 0&&(oe=[],g.set(ge,oe));const Ee=H.textures;if(oe.length!==Ee.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let de=0,Ce=Ee.length;de<Ce;de++)oe[de]=n.COLOR_ATTACHMENT0+de;oe.length=Ee.length,me=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,me=!0);me&&n.drawBuffers(oe)}function tt(H){return M!==H?(n.useProgram(H),M=H,!0):!1}const ze={[Wn]:n.FUNC_ADD,[Eu]:n.FUNC_SUBTRACT,[yu]:n.FUNC_REVERSE_SUBTRACT};ze[bu]=n.MIN,ze[Tu]=n.MAX;const Ke={[wu]:n.ZERO,[Au]:n.ONE,[Ru]:n.SRC_COLOR,[qr]:n.SRC_ALPHA,[Iu]:n.SRC_ALPHA_SATURATE,[Lu]:n.DST_COLOR,[Pu]:n.DST_ALPHA,[Cu]:n.ONE_MINUS_SRC_COLOR,[jr]:n.ONE_MINUS_SRC_ALPHA,[Du]:n.ONE_MINUS_DST_COLOR,[Nu]:n.ONE_MINUS_DST_ALPHA,[Uu]:n.CONSTANT_COLOR,[Fu]:n.ONE_MINUS_CONSTANT_COLOR,[Ou]:n.CONSTANT_ALPHA,[Bu]:n.ONE_MINUS_CONSTANT_ALPHA};function We(H,ge,oe,me,Ee,de,Ce,Ae,ft,rt){if(H===vn){m===!0&&(Ie(n.BLEND),m=!1);return}if(m===!1&&(re(n.BLEND),m=!0),H!==Su){if(H!==f||rt!==U){if((A!==Wn||T!==Wn)&&(n.blendEquation(n.FUNC_ADD),A=Wn,T=Wn),rt)switch(H){case Mi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zn:n.blendFunc(n.ONE,n.ONE);break;case No:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Lo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Je("WebGLState: Invalid blending: ",H);break}else switch(H){case Mi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case No:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lo:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",H);break}w=null,y=null,E=null,P=null,x.set(0,0,0),C=0,f=H,U=rt}return}Ee=Ee||ge,de=de||oe,Ce=Ce||me,(ge!==A||Ee!==T)&&(n.blendEquationSeparate(ze[ge],ze[Ee]),A=ge,T=Ee),(oe!==w||me!==y||de!==E||Ce!==P)&&(n.blendFuncSeparate(Ke[oe],Ke[me],Ke[de],Ke[Ce]),w=oe,y=me,E=de,P=Ce),(Ae.equals(x)===!1||ft!==C)&&(n.blendColor(Ae.r,Ae.g,Ae.b,ft),x.copy(Ae),C=ft),f=H,U=!1}function Ve(H,ge){H.side===gn?Ie(n.CULL_FACE):re(n.CULL_FACE);let oe=H.side===Bt;ge&&(oe=!oe),ot(oe),H.blending===Mi&&H.transparent===!1?We(vn):We(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),gt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Ie(n.SAMPLE_ALPHA_TO_COVERAGE)}function ot(H){F!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),F=H)}function lt(H){H!==xu?(re(n.CULL_FACE),H!==V&&(H===Po?n.cullFace(n.BACK):H===vu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ie(n.CULL_FACE),V=H}function ht(H){H!==Z&&(k&&n.lineWidth(H),Z=H)}function gt(H,ge,oe){H?(re(n.POLYGON_OFFSET_FILL),(z!==ge||I!==oe)&&(z=ge,I=oe,a.getReversed()&&(ge=-ge),n.polygonOffset(ge,oe))):Ie(n.POLYGON_OFFSET_FILL)}function st(H){H?re(n.SCISSOR_TEST):Ie(n.SCISSOR_TEST)}function X(H){H===void 0&&(H=n.TEXTURE0+j-1),fe!==H&&(n.activeTexture(H),fe=H)}function R(H,ge,oe){oe===void 0&&(fe===null?oe=n.TEXTURE0+j-1:oe=fe);let me=pe[oe];me===void 0&&(me={type:void 0,texture:void 0},pe[oe]=me),(me.type!==H||me.texture!==ge)&&(fe!==oe&&(n.activeTexture(oe),fe=oe),n.bindTexture(H,ge||ue[H]),me.type=H,me.texture=ge)}function te(){const H=pe[fe];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ne(){try{n.compressedTexImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function S(){try{n.compressedTexImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function p(){try{n.texSubImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function N(){try{n.texSubImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function L(){try{n.compressedTexSubImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function O(){try{n.compressedTexSubImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function q(){try{n.texStorage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function B(){try{n.texStorage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function D(){try{n.texImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function G(){try{n.texImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function ee(H){return u[H]!==void 0?u[H]:n.getParameter(H)}function ce(H,ge){u[H]!==ge&&(n.pixelStorei(H,ge),u[H]=ge)}function se(H){we.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),we.copy(H))}function ie(H){He.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),He.copy(H))}function _e(H,ge){let oe=c.get(ge);oe===void 0&&(oe=new WeakMap,c.set(ge,oe));let me=oe.get(H);me===void 0&&(me=n.getUniformBlockIndex(ge,H.name),oe.set(H,me))}function Me(H,ge){const me=c.get(ge).get(H);l.get(ge)!==me&&(n.uniformBlockBinding(ge,me,H.__bindingPointIndex),l.set(ge,me))}function Pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},fe=null,pe={},d={},g=new WeakMap,v=[],M=null,m=!1,f=null,A=null,w=null,y=null,T=null,E=null,P=null,x=new Xe(0,0,0),C=0,U=!1,F=null,V=null,Z=null,z=null,I=null,we.set(0,0,n.canvas.width,n.canvas.height),He.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:Ie,bindFramebuffer:Ue,drawBuffers:De,useProgram:tt,setBlending:We,setMaterial:Ve,setFlipSided:ot,setCullFace:lt,setLineWidth:ht,setPolygonOffset:gt,setScissorTest:st,activeTexture:X,bindTexture:R,unbindTexture:te,compressedTexImage2D:ne,compressedTexImage3D:S,texImage2D:D,texImage3D:G,pixelStorei:ce,getParameter:ee,updateUBOMapping:_e,uniformBlockBinding:Me,texStorage2D:q,texStorage3D:B,texSubImage2D:p,texSubImage3D:N,compressedTexSubImage2D:L,compressedTexSubImage3D:O,scissor:se,viewport:ie,reset:Pe}}function M0(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,h=new WeakMap,u=new Set;let d;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(S,p){return v?new OffscreenCanvas(S,p):Hs("canvas")}function m(S,p,N){let L=1;const O=ne(S);if((O.width>N||O.height>N)&&(L=N/Math.max(O.width,O.height)),L<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const q=Math.floor(L*O.width),B=Math.floor(L*O.height);d===void 0&&(d=M(q,B));const D=p?M(q,B):d;return D.width=q,D.height=B,D.getContext("2d").drawImage(S,0,0,q,B),Fe("WebGLRenderer: Texture has been resized from ("+O.width+"x"+O.height+") to ("+q+"x"+B+")."),D}else return"data"in S&&Fe("WebGLRenderer: Image in DataTexture is too big ("+O.width+"x"+O.height+")."),S;return S}function f(S){return S.generateMipmaps}function A(S){n.generateMipmap(S)}function w(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(S,p,N,L,O,q=!1){if(S!==null){if(n[S]!==void 0)return n[S];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let B;L&&(B=e.get("EXT_texture_norm16"),B||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let D=p;if(p===n.RED&&(N===n.FLOAT&&(D=n.R32F),N===n.HALF_FLOAT&&(D=n.R16F),N===n.UNSIGNED_BYTE&&(D=n.R8),N===n.UNSIGNED_SHORT&&B&&(D=B.R16_EXT),N===n.SHORT&&B&&(D=B.R16_SNORM_EXT)),p===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(D=n.R8UI),N===n.UNSIGNED_SHORT&&(D=n.R16UI),N===n.UNSIGNED_INT&&(D=n.R32UI),N===n.BYTE&&(D=n.R8I),N===n.SHORT&&(D=n.R16I),N===n.INT&&(D=n.R32I)),p===n.RG&&(N===n.FLOAT&&(D=n.RG32F),N===n.HALF_FLOAT&&(D=n.RG16F),N===n.UNSIGNED_BYTE&&(D=n.RG8),N===n.UNSIGNED_SHORT&&B&&(D=B.RG16_EXT),N===n.SHORT&&B&&(D=B.RG16_SNORM_EXT)),p===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(D=n.RG8UI),N===n.UNSIGNED_SHORT&&(D=n.RG16UI),N===n.UNSIGNED_INT&&(D=n.RG32UI),N===n.BYTE&&(D=n.RG8I),N===n.SHORT&&(D=n.RG16I),N===n.INT&&(D=n.RG32I)),p===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(D=n.RGB8UI),N===n.UNSIGNED_SHORT&&(D=n.RGB16UI),N===n.UNSIGNED_INT&&(D=n.RGB32UI),N===n.BYTE&&(D=n.RGB8I),N===n.SHORT&&(D=n.RGB16I),N===n.INT&&(D=n.RGB32I)),p===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(D=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(D=n.RGBA16UI),N===n.UNSIGNED_INT&&(D=n.RGBA32UI),N===n.BYTE&&(D=n.RGBA8I),N===n.SHORT&&(D=n.RGBA16I),N===n.INT&&(D=n.RGBA32I)),p===n.RGB&&(N===n.UNSIGNED_SHORT&&B&&(D=B.RGB16_EXT),N===n.SHORT&&B&&(D=B.RGB16_SNORM_EXT),N===n.UNSIGNED_INT_5_9_9_9_REV&&(D=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(D=n.R11F_G11F_B10F)),p===n.RGBA){const G=q?Gs:je.getTransfer(O);N===n.FLOAT&&(D=n.RGBA32F),N===n.HALF_FLOAT&&(D=n.RGBA16F),N===n.UNSIGNED_BYTE&&(D=G===Qe?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT&&B&&(D=B.RGBA16_EXT),N===n.SHORT&&B&&(D=B.RGBA16_SNORM_EXT),N===n.UNSIGNED_SHORT_4_4_4_4&&(D=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(D=n.RGB5_A1)}return(D===n.R16F||D===n.R32F||D===n.RG16F||D===n.RG32F||D===n.RGBA16F||D===n.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function T(S,p){let N;return S?p===null||p===ln||p===Yi?N=n.DEPTH24_STENCIL8:p===rn?N=n.DEPTH32F_STENCIL8:p===ji&&(N=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===ln||p===Yi?N=n.DEPTH_COMPONENT24:p===rn?N=n.DEPTH_COMPONENT32F:p===ji&&(N=n.DEPTH_COMPONENT16),N}function E(S,p){return f(S)===!0||S.isFramebufferTexture&&S.minFilter!==bt&&S.minFilter!==Ct?Math.log2(Math.max(p.width,p.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?p.mipmaps.length:1}function P(S){const p=S.target;p.removeEventListener("dispose",P),C(p),p.isVideoTexture&&h.delete(p),p.isHTMLTexture&&u.delete(p)}function x(S){const p=S.target;p.removeEventListener("dispose",x),F(p)}function C(S){const p=i.get(S);if(p.__webglInit===void 0)return;const N=S.source,L=g.get(N);if(L){const O=L[p.__cacheKey];O.usedTimes--,O.usedTimes===0&&U(S),Object.keys(L).length===0&&g.delete(N)}i.remove(S)}function U(S){const p=i.get(S);n.deleteTexture(p.__webglTexture);const N=S.source,L=g.get(N);delete L[p.__cacheKey],a.memory.textures--}function F(S){const p=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(p.__webglFramebuffer[L]))for(let O=0;O<p.__webglFramebuffer[L].length;O++)n.deleteFramebuffer(p.__webglFramebuffer[L][O]);else n.deleteFramebuffer(p.__webglFramebuffer[L]);p.__webglDepthbuffer&&n.deleteRenderbuffer(p.__webglDepthbuffer[L])}else{if(Array.isArray(p.__webglFramebuffer))for(let L=0;L<p.__webglFramebuffer.length;L++)n.deleteFramebuffer(p.__webglFramebuffer[L]);else n.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&n.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&n.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let L=0;L<p.__webglColorRenderbuffer.length;L++)p.__webglColorRenderbuffer[L]&&n.deleteRenderbuffer(p.__webglColorRenderbuffer[L]);p.__webglDepthRenderbuffer&&n.deleteRenderbuffer(p.__webglDepthRenderbuffer)}const N=S.textures;for(let L=0,O=N.length;L<O;L++){const q=i.get(N[L]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),i.remove(N[L])}i.remove(S)}let V=0;function Z(){V=0}function z(){return V}function I(S){V=S}function j(){const S=V;return S>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),V+=1,S}function k(S){const p=[];return p.push(S.wrapS),p.push(S.wrapT),p.push(S.wrapR||0),p.push(S.magFilter),p.push(S.minFilter),p.push(S.anisotropy),p.push(S.internalFormat),p.push(S.format),p.push(S.type),p.push(S.generateMipmaps),p.push(S.premultiplyAlpha),p.push(S.flipY),p.push(S.unpackAlignment),p.push(S.colorSpace),p.join()}function Q(S,p){const N=i.get(S);if(S.isVideoTexture&&R(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&N.__version!==S.version){const L=S.image;if(L===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(L.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(N,S,p);return}}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+p)}function le(S,p){const N=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){Ie(N,S,p);return}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+p)}function fe(S,p){const N=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){Ie(N,S,p);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+p)}function pe(S,p){const N=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&N.__version!==S.version){Ue(N,S,p);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+p)}const be={[ta]:n.REPEAT,[_n]:n.CLAMP_TO_EDGE,[na]:n.MIRRORED_REPEAT},qe={[bt]:n.NEAREST,[Hu]:n.NEAREST_MIPMAP_NEAREST,[ns]:n.NEAREST_MIPMAP_LINEAR,[Ct]:n.LINEAR,[ir]:n.LINEAR_MIPMAP_NEAREST,[qn]:n.LINEAR_MIPMAP_LINEAR},we={[Wu]:n.NEVER,[$u]:n.ALWAYS,[Xu]:n.LESS,[qa]:n.LEQUAL,[qu]:n.EQUAL,[ja]:n.GEQUAL,[ju]:n.GREATER,[Yu]:n.NOTEQUAL};function He(S,p){if(p.type===rn&&e.has("OES_texture_float_linear")===!1&&(p.magFilter===Ct||p.magFilter===ir||p.magFilter===ns||p.magFilter===qn||p.minFilter===Ct||p.minFilter===ir||p.minFilter===ns||p.minFilter===qn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,be[p.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,be[p.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,be[p.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,qe[p.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,qe[p.minFilter]),p.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,we[p.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===bt||p.minFilter!==ns&&p.minFilter!==qn||p.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||i.get(p).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),i.get(p).__currentAnisotropy=p.anisotropy}}}function ae(S,p){let N=!1;S.__webglInit===void 0&&(S.__webglInit=!0,p.addEventListener("dispose",P));const L=p.source;let O=g.get(L);O===void 0&&(O={},g.set(L,O));const q=k(p);if(q!==S.__cacheKey){O[q]===void 0&&(O[q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,N=!0),O[q].usedTimes++;const B=O[S.__cacheKey];B!==void 0&&(O[S.__cacheKey].usedTimes--,B.usedTimes===0&&U(p)),S.__cacheKey=q,S.__webglTexture=O[q].texture}return N}function ue(S,p,N){return Math.floor(Math.floor(S/N)/p)}function re(S,p,N,L){const q=S.updateRanges;if(q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,p.width,p.height,N,L,p.data);else{q.sort((ce,se)=>ce.start-se.start);let B=0;for(let ce=1;ce<q.length;ce++){const se=q[B],ie=q[ce],_e=se.start+se.count,Me=ue(ie.start,p.width,4),Pe=ue(se.start,p.width,4);ie.start<=_e+1&&Me===Pe&&ue(ie.start+ie.count-1,p.width,4)===Me?se.count=Math.max(se.count,ie.start+ie.count-se.start):(++B,q[B]=ie)}q.length=B+1;const D=t.getParameter(n.UNPACK_ROW_LENGTH),G=t.getParameter(n.UNPACK_SKIP_PIXELS),ee=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,p.width);for(let ce=0,se=q.length;ce<se;ce++){const ie=q[ce],_e=Math.floor(ie.start/4),Me=Math.ceil(ie.count/4),Pe=_e%p.width,H=Math.floor(_e/p.width),ge=Me,oe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,Pe,H,ge,oe,N,L,p.data)}S.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,D),t.pixelStorei(n.UNPACK_SKIP_PIXELS,G),t.pixelStorei(n.UNPACK_SKIP_ROWS,ee)}}function Ie(S,p,N){let L=n.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(L=n.TEXTURE_2D_ARRAY),p.isData3DTexture&&(L=n.TEXTURE_3D);const O=ae(S,p),q=p.source;t.bindTexture(L,S.__webglTexture,n.TEXTURE0+N);const B=i.get(q);if(q.version!==B.__version||O===!0){if(t.activeTexture(n.TEXTURE0+N),(typeof ImageBitmap<"u"&&p.image instanceof ImageBitmap)===!1){const oe=je.getPrimaries(je.workingColorSpace),me=p.colorSpace===Ln?null:je.getPrimaries(p.colorSpace),Ee=p.colorSpace===Ln||oe===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,p.unpackAlignment);let G=m(p.image,!1,s.maxTextureSize);G=te(p,G);const ee=r.convert(p.format,p.colorSpace),ce=r.convert(p.type);let se=y(p.internalFormat,ee,ce,p.normalized,p.colorSpace,p.isVideoTexture);He(L,p);let ie;const _e=p.mipmaps,Me=p.isVideoTexture!==!0,Pe=B.__version===void 0||O===!0,H=q.dataReady,ge=E(p,G);if(p.isDepthTexture)se=T(p.format===jn,p.type),Pe&&(Me?t.texStorage2D(n.TEXTURE_2D,1,se,G.width,G.height):t.texImage2D(n.TEXTURE_2D,0,se,G.width,G.height,0,ee,ce,null));else if(p.isDataTexture)if(_e.length>0){Me&&Pe&&t.texStorage2D(n.TEXTURE_2D,ge,se,_e[0].width,_e[0].height);for(let oe=0,me=_e.length;oe<me;oe++)ie=_e[oe],Me?H&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ie.width,ie.height,ee,ce,ie.data):t.texImage2D(n.TEXTURE_2D,oe,se,ie.width,ie.height,0,ee,ce,ie.data);p.generateMipmaps=!1}else Me?(Pe&&t.texStorage2D(n.TEXTURE_2D,ge,se,G.width,G.height),H&&re(p,G,ee,ce)):t.texImage2D(n.TEXTURE_2D,0,se,G.width,G.height,0,ee,ce,G.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){Me&&Pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,se,_e[0].width,_e[0].height,G.depth);for(let oe=0,me=_e.length;oe<me;oe++)if(ie=_e[oe],p.format!==Zt)if(ee!==null)if(Me){if(H)if(p.layerUpdates.size>0){const Ee=ac(ie.width,ie.height,p.format,p.type);for(const de of p.layerUpdates){const Ce=ie.data.subarray(de*Ee/ie.data.BYTES_PER_ELEMENT,(de+1)*Ee/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,de,ie.width,ie.height,1,ee,Ce)}p.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,G.depth,ee,ie.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,se,ie.width,ie.height,G.depth,0,ie.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,G.depth,ee,ce,ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,se,ie.width,ie.height,G.depth,0,ee,ce,ie.data)}else{Me&&Pe&&t.texStorage2D(n.TEXTURE_2D,ge,se,_e[0].width,_e[0].height);for(let oe=0,me=_e.length;oe<me;oe++)ie=_e[oe],p.format!==Zt?ee!==null?Me?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,ie.width,ie.height,ee,ie.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,se,ie.width,ie.height,0,ie.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?H&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ie.width,ie.height,ee,ce,ie.data):t.texImage2D(n.TEXTURE_2D,oe,se,ie.width,ie.height,0,ee,ce,ie.data)}else if(p.isDataArrayTexture)if(Me){if(Pe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,se,G.width,G.height,G.depth),H)if(p.layerUpdates.size>0){const oe=ac(G.width,G.height,p.format,p.type);for(const me of p.layerUpdates){const Ee=G.data.subarray(me*oe/G.data.BYTES_PER_ELEMENT,(me+1)*oe/G.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,G.width,G.height,1,ee,ce,Ee)}p.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,ee,ce,G.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,se,G.width,G.height,G.depth,0,ee,ce,G.data);else if(p.isData3DTexture)Me?(Pe&&t.texStorage3D(n.TEXTURE_3D,ge,se,G.width,G.height,G.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,ee,ce,G.data)):t.texImage3D(n.TEXTURE_3D,0,se,G.width,G.height,G.depth,0,ee,ce,G.data);else if(p.isFramebufferTexture){if(Pe)if(Me)t.texStorage2D(n.TEXTURE_2D,ge,se,G.width,G.height);else{let oe=G.width,me=G.height;for(let Ee=0;Ee<ge;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,se,oe,me,0,ee,ce,null),oe>>=1,me>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in n){const oe=n.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),G.parentNode!==oe){oe.appendChild(G),u.add(p),oe.onpaint=me=>{const Ee=me.changedElements;for(const de of u)Ee.includes(de.image)&&(de.needsUpdate=!0)},oe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,G);else{const Ee=n.RGBA,de=n.RGBA,Ce=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,de,Ce,G)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(_e.length>0){if(Me&&Pe){const oe=ne(_e[0]);t.texStorage2D(n.TEXTURE_2D,ge,se,oe.width,oe.height)}for(let oe=0,me=_e.length;oe<me;oe++)ie=_e[oe],Me?H&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ee,ce,ie):t.texImage2D(n.TEXTURE_2D,oe,se,ee,ce,ie);p.generateMipmaps=!1}else if(Me){if(Pe){const oe=ne(G);t.texStorage2D(n.TEXTURE_2D,ge,se,oe.width,oe.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee,ce,G)}else t.texImage2D(n.TEXTURE_2D,0,se,ee,ce,G);f(p)&&A(L),B.__version=q.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function Ue(S,p,N){if(p.image.length!==6)return;const L=ae(S,p),O=p.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+N);const q=i.get(O);if(O.version!==q.__version||L===!0){t.activeTexture(n.TEXTURE0+N);const B=je.getPrimaries(je.workingColorSpace),D=p.colorSpace===Ln?null:je.getPrimaries(p.colorSpace),G=p.colorSpace===Ln||B===D?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,p.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);const ee=p.isCompressedTexture||p.image[0].isCompressedTexture,ce=p.image[0]&&p.image[0].isDataTexture,se=[];for(let de=0;de<6;de++)!ee&&!ce?se[de]=m(p.image[de],!0,s.maxCubemapSize):se[de]=ce?p.image[de].image:p.image[de],se[de]=te(p,se[de]);const ie=se[0],_e=r.convert(p.format,p.colorSpace),Me=r.convert(p.type),Pe=y(p.internalFormat,_e,Me,p.normalized,p.colorSpace),H=p.isVideoTexture!==!0,ge=q.__version===void 0||L===!0,oe=O.dataReady;let me=E(p,ie);He(n.TEXTURE_CUBE_MAP,p);let Ee;if(ee){H&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Pe,ie.width,ie.height);for(let de=0;de<6;de++){Ee=se[de].mipmaps;for(let Ce=0;Ce<Ee.length;Ce++){const Ae=Ee[Ce];p.format!==Zt?_e!==null?H?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,0,0,Ae.width,Ae.height,_e,Ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,Pe,Ae.width,Ae.height,0,Ae.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,0,0,Ae.width,Ae.height,_e,Me,Ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,Pe,Ae.width,Ae.height,0,_e,Me,Ae.data)}}}else{if(Ee=p.mipmaps,H&&ge){Ee.length>0&&me++;const de=ne(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Pe,de.width,de.height)}for(let de=0;de<6;de++)if(ce){H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,se[de].width,se[de].height,_e,Me,se[de].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Pe,se[de].width,se[de].height,0,_e,Me,se[de].data);for(let Ce=0;Ce<Ee.length;Ce++){const ft=Ee[Ce].image[de].image;H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,0,0,ft.width,ft.height,_e,Me,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,Pe,ft.width,ft.height,0,_e,Me,ft.data)}}else{H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,_e,Me,se[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Pe,_e,Me,se[de]);for(let Ce=0;Ce<Ee.length;Ce++){const Ae=Ee[Ce];H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,0,0,_e,Me,Ae.image[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,Pe,_e,Me,Ae.image[de])}}}f(p)&&A(n.TEXTURE_CUBE_MAP),q.__version=O.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function De(S,p,N,L,O,q){const B=r.convert(N.format,N.colorSpace),D=r.convert(N.type),G=y(N.internalFormat,B,D,N.normalized,N.colorSpace),ee=i.get(p),ce=i.get(N);if(ce.__renderTarget=p,!ee.__hasExternalTextures){const se=Math.max(1,p.width>>q),ie=Math.max(1,p.height>>q);O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?t.texImage3D(O,q,G,se,ie,p.depth,0,B,D,null):t.texImage2D(O,q,G,se,ie,0,B,D,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),X(p)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,L,O,ce.__webglTexture,0,st(p)):(O===n.TEXTURE_2D||O>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&O<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,L,O,ce.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(S,p,N){if(n.bindRenderbuffer(n.RENDERBUFFER,S),p.depthBuffer){const L=p.depthTexture,O=L&&L.isDepthTexture?L.type:null,q=T(p.stencilBuffer,O),B=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;X(p)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,st(p),q,p.width,p.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,st(p),q,p.width,p.height):n.renderbufferStorage(n.RENDERBUFFER,q,p.width,p.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,S)}else{const L=p.textures;for(let O=0;O<L.length;O++){const q=L[O],B=r.convert(q.format,q.colorSpace),D=r.convert(q.type),G=y(q.internalFormat,B,D,q.normalized,q.colorSpace);X(p)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,st(p),G,p.width,p.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,st(p),G,p.width,p.height):n.renderbufferStorage(n.RENDERBUFFER,G,p.width,p.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ze(S,p,N){const L=p.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const O=i.get(p.depthTexture);if(O.__renderTarget=p,(!O.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),L){if(O.__webglInit===void 0&&(O.__webglInit=!0,p.depthTexture.addEventListener("dispose",P)),O.__webglTexture===void 0){O.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),He(n.TEXTURE_CUBE_MAP,p.depthTexture);const ee=r.convert(p.depthTexture.format),ce=r.convert(p.depthTexture.type);let se;p.depthTexture.format===En?se=n.DEPTH_COMPONENT24:p.depthTexture.format===jn&&(se=n.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,se,p.width,p.height,0,ee,ce,null)}}else Q(p.depthTexture,0);const q=O.__webglTexture,B=st(p),D=L?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,G=p.depthTexture.format===jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(p.depthTexture.format===En)X(p)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,D,q,0,B):n.framebufferTexture2D(n.FRAMEBUFFER,G,D,q,0);else if(p.depthTexture.format===jn)X(p)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,D,q,0,B):n.framebufferTexture2D(n.FRAMEBUFFER,G,D,q,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(S){const p=i.get(S),N=S.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==S.depthTexture){const L=S.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),L){const O=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,L.removeEventListener("dispose",O)};L.addEventListener("dispose",O),p.__depthDisposeCallback=O}p.__boundDepthTexture=L}if(S.depthTexture&&!p.__autoAllocateDepthBuffer)if(N)for(let L=0;L<6;L++)ze(p.__webglFramebuffer[L],S,L);else{const L=S.texture.mipmaps;L&&L.length>0?ze(p.__webglFramebuffer[0],S,0):ze(p.__webglFramebuffer,S,0)}else if(N){p.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(n.FRAMEBUFFER,p.__webglFramebuffer[L]),p.__webglDepthbuffer[L]===void 0)p.__webglDepthbuffer[L]=n.createRenderbuffer(),tt(p.__webglDepthbuffer[L],S,!1);else{const O=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=p.__webglDepthbuffer[L];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,O,n.RENDERBUFFER,q)}}else{const L=S.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(n.FRAMEBUFFER,p.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=n.createRenderbuffer(),tt(p.__webglDepthbuffer,S,!1);else{const O=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=p.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,O,n.RENDERBUFFER,q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(S,p,N){const L=i.get(S);p!==void 0&&De(L.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Ke(S)}function Ve(S){const p=S.texture,N=i.get(S),L=i.get(p);S.addEventListener("dispose",x);const O=S.textures,q=S.isWebGLCubeRenderTarget===!0,B=O.length>1;if(B||(L.__webglTexture===void 0&&(L.__webglTexture=n.createTexture()),L.__version=p.version,a.memory.textures++),q){N.__webglFramebuffer=[];for(let D=0;D<6;D++)if(p.mipmaps&&p.mipmaps.length>0){N.__webglFramebuffer[D]=[];for(let G=0;G<p.mipmaps.length;G++)N.__webglFramebuffer[D][G]=n.createFramebuffer()}else N.__webglFramebuffer[D]=n.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){N.__webglFramebuffer=[];for(let D=0;D<p.mipmaps.length;D++)N.__webglFramebuffer[D]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(B)for(let D=0,G=O.length;D<G;D++){const ee=i.get(O[D]);ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&X(S)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let D=0;D<O.length;D++){const G=O[D];N.__webglColorRenderbuffer[D]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[D]);const ee=r.convert(G.format,G.colorSpace),ce=r.convert(G.type),se=y(G.internalFormat,ee,ce,G.normalized,G.colorSpace,S.isXRRenderTarget===!0),ie=st(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,se,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.RENDERBUFFER,N.__webglColorRenderbuffer[D])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),tt(N.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture),He(n.TEXTURE_CUBE_MAP,p);for(let D=0;D<6;D++)if(p.mipmaps&&p.mipmaps.length>0)for(let G=0;G<p.mipmaps.length;G++)De(N.__webglFramebuffer[D][G],S,p,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+D,G);else De(N.__webglFramebuffer[D],S,p,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);f(p)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(B){for(let D=0,G=O.length;D<G;D++){const ee=O[D],ce=i.get(ee);let se=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(se=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,ce.__webglTexture),He(se,ee),De(N.__webglFramebuffer,S,ee,n.COLOR_ATTACHMENT0+D,se,0),f(ee)&&A(se)}t.unbindTexture()}else{let D=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(D=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(D,L.__webglTexture),He(D,p),p.mipmaps&&p.mipmaps.length>0)for(let G=0;G<p.mipmaps.length;G++)De(N.__webglFramebuffer[G],S,p,n.COLOR_ATTACHMENT0,D,G);else De(N.__webglFramebuffer,S,p,n.COLOR_ATTACHMENT0,D,0);f(p)&&A(D),t.unbindTexture()}S.depthBuffer&&Ke(S)}function ot(S){const p=S.textures;for(let N=0,L=p.length;N<L;N++){const O=p[N];if(f(O)){const q=w(S),B=i.get(O).__webglTexture;t.bindTexture(q,B),A(q),t.unbindTexture()}}}const lt=[],ht=[];function gt(S){if(S.samples>0){if(X(S)===!1){const p=S.textures,N=S.width,L=S.height;let O=n.COLOR_BUFFER_BIT;const q=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,B=i.get(S),D=p.length>1;if(D)for(let ee=0;ee<p.length;ee++)t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,B.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,B.__webglMultisampledFramebuffer);const G=S.texture.mipmaps;G&&G.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,B.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,B.__webglFramebuffer);for(let ee=0;ee<p.length;ee++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(O|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(O|=n.STENCIL_BUFFER_BIT)),D){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,B.__webglColorRenderbuffer[ee]);const ce=i.get(p[ee]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ce,0)}n.blitFramebuffer(0,0,N,L,0,0,N,L,O,n.NEAREST),l===!0&&(lt.length=0,ht.length=0,lt.push(n.COLOR_ATTACHMENT0+ee),S.depthBuffer&&S.resolveDepthBuffer===!1&&(lt.push(q),ht.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ht)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),D)for(let ee=0;ee<p.length;ee++){t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.RENDERBUFFER,B.__webglColorRenderbuffer[ee]);const ce=i.get(p[ee]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,B.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.TEXTURE_2D,ce,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,B.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const p=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[p])}}}function st(S){return Math.min(s.maxSamples,S.samples)}function X(S){const p=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function R(S){const p=a.render.frame;h.get(S)!==p&&(h.set(S,p),S.update())}function te(S,p){const N=S.colorSpace,L=S.format,O=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||N!==zs&&N!==Ln&&(je.getTransfer(N)===Qe?(L!==Zt||O!==Vt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",N)),p}function ne(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=Z,this.getTextureUnits=z,this.setTextureUnits=I,this.setTexture2D=Q,this.setTexture2DArray=le,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=We,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=De,this.useMultisampledRTT=X,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function S0(n,e){function t(i,s=Ln){let r;const a=je.getTransfer(s);if(i===Vt)return n.UNSIGNED_BYTE;if(i===Ha)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Va)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ml)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Sl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===xl)return n.BYTE;if(i===vl)return n.SHORT;if(i===ji)return n.UNSIGNED_SHORT;if(i===Ga)return n.INT;if(i===ln)return n.UNSIGNED_INT;if(i===rn)return n.FLOAT;if(i===Sn)return n.HALF_FLOAT;if(i===El)return n.ALPHA;if(i===yl)return n.RGB;if(i===Zt)return n.RGBA;if(i===En)return n.DEPTH_COMPONENT;if(i===jn)return n.DEPTH_STENCIL;if(i===bl)return n.RED;if(i===ka)return n.RED_INTEGER;if(i===Qn)return n.RG;if(i===Wa)return n.RG_INTEGER;if(i===Xa)return n.RGBA_INTEGER;if(i===Ps||i===Ns||i===Ls||i===Ds)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ps)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ps)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ls)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ds)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ia||i===sa||i===ra||i===aa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oa||i===ca||i===la||i===da||i===ua||i===Os||i===ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oa||i===ca)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===la)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===da)return r.COMPRESSED_R11_EAC;if(i===ua)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Os)return r.COMPRESSED_RG11_EAC;if(i===ha)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fa||i===pa||i===ma||i===ga||i===_a||i===xa||i===va||i===Ma||i===Sa||i===Ea||i===ya||i===ba||i===Ta||i===wa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===fa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ga)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_a)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===va)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ea)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ya)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ba)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ta)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Aa||i===Ra||i===Ca)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Aa)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ca)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pa||i===Na||i===Bs||i===La)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Pa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Na)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===La)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Yi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y0=`
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

}`;class b0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Ul(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new dn({vertexShader:E0,fragmentShader:y0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Di(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class T0 extends ni{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,g=null,v=null;const M=typeof XRWebGLBinding<"u",m=new b0,f={},A=t.getContextAttributes();let w=null,y=null;const T=[],E=[],P=new $e;let x=null;const C=new Ot;C.viewport=new dt;const U=new Ot;U.viewport=new dt;const F=[C,U],V=new Ih;let Z=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let ue=T[ae];return ue===void 0&&(ue=new ur,T[ae]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(ae){let ue=T[ae];return ue===void 0&&(ue=new ur,T[ae]=ue),ue.getGripSpace()},this.getHand=function(ae){let ue=T[ae];return ue===void 0&&(ue=new ur,T[ae]=ue),ue.getHandSpace()};function I(ae){const ue=E.indexOf(ae.inputSource);if(ue===-1)return;const re=T[ue];re!==void 0&&(re.update(ae.inputSource,ae.frame,c||a),re.dispatchEvent({type:ae.type,data:ae.inputSource}))}function j(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",k);for(let ae=0;ae<T.length;ae++){const ue=E[ae];ue!==null&&(E[ae]=null,T[ae].disconnect(ue))}Z=null,z=null,m.reset();for(const ae in f)delete f[ae];e.setRenderTarget(w),g=null,d=null,u=null,s=null,y=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){o=ae,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ae){c=ae},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",j),s.addEventListener("inputsourceschange",k),A.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(P),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ie=null,Ue=null;A.depth&&(Ue=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=A.stencil?jn:En,Ie=A.stencil?Yi:ln);const De={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(De),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new cn(d.textureWidth,d.textureHeight,{format:Zt,type:Vt,depthTexture:new Ri(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new cn(g.framebufferWidth,g.framebufferHeight,{format:Zt,type:Vt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),He.setContext(s),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(ae){for(let ue=0;ue<ae.removed.length;ue++){const re=ae.removed[ue],Ie=E.indexOf(re);Ie>=0&&(E[Ie]=null,T[Ie].disconnect(re))}for(let ue=0;ue<ae.added.length;ue++){const re=ae.added[ue];let Ie=E.indexOf(re);if(Ie===-1){for(let De=0;De<T.length;De++)if(De>=E.length){E.push(re),Ie=De;break}else if(E[De]===null){E[De]=re,Ie=De;break}if(Ie===-1)break}const Ue=T[Ie];Ue&&Ue.connect(re)}}const Q=new Y,le=new Y;function fe(ae,ue,re){Q.setFromMatrixPosition(ue.matrixWorld),le.setFromMatrixPosition(re.matrixWorld);const Ie=Q.distanceTo(le),Ue=ue.projectionMatrix.elements,De=re.projectionMatrix.elements,tt=Ue[14]/(Ue[10]-1),ze=Ue[14]/(Ue[10]+1),Ke=(Ue[9]+1)/Ue[5],We=(Ue[9]-1)/Ue[5],Ve=(Ue[8]-1)/Ue[0],ot=(De[8]+1)/De[0],lt=tt*Ve,ht=tt*ot,gt=Ie/(-Ve+ot),st=gt*-Ve;if(ue.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(st),ae.translateZ(gt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Ue[10]===-1)ae.projectionMatrix.copy(ue.projectionMatrix),ae.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const X=tt+gt,R=ze+gt,te=lt-st,ne=ht+(Ie-st),S=Ke*ze/R*X,p=We*ze/R*X;ae.projectionMatrix.makePerspective(te,ne,S,p,X,R),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function pe(ae,ue){ue===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(ue.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let ue=ae.near,re=ae.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(re=m.depthFar)),V.near=U.near=C.near=ue,V.far=U.far=C.far=re,(Z!==V.near||z!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),Z=V.near,z=V.far),V.layers.mask=ae.layers.mask|6,C.layers.mask=V.layers.mask&-5,U.layers.mask=V.layers.mask&-3;const Ie=ae.parent,Ue=V.cameras;pe(V,Ie);for(let De=0;De<Ue.length;De++)pe(Ue[De],Ie);Ue.length===2?fe(V,C,U):V.projectionMatrix.copy(C.projectionMatrix),be(ae,V,Ie)};function be(ae,ue,re){re===null?ae.matrix.copy(ue.matrixWorld):(ae.matrix.copy(re.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(ue.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(ue.projectionMatrix),ae.projectionMatrixInverse.copy(ue.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Ia*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(ae){l=ae,d!==null&&(d.fixedFoveation=ae),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ae)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(ae){return f[ae]};let qe=null;function we(ae,ue){if(h=ue.getViewerPose(c||a),v=ue,h!==null){const re=h.views;g!==null&&(e.setRenderTargetFramebuffer(y,g.framebuffer),e.setRenderTarget(y));let Ie=!1;re.length!==V.cameras.length&&(V.cameras.length=0,Ie=!0);for(let ze=0;ze<re.length;ze++){const Ke=re[ze];let We=null;if(g!==null)We=g.getViewport(Ke);else{const ot=u.getViewSubImage(d,Ke);We=ot.viewport,ze===0&&(e.setRenderTargetTextures(y,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(y))}let Ve=F[ze];Ve===void 0&&(Ve=new Ot,Ve.layers.enable(ze),Ve.viewport=new dt,F[ze]=Ve),Ve.matrix.fromArray(Ke.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ke.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(We.x,We.y,We.width,We.height),ze===0&&(V.matrix.copy(Ve.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Ie===!0&&V.cameras.push(Ve)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=i.getBinding();const ze=u.getDepthInformation(re[0]);ze&&ze.isValid&&ze.texture&&m.init(ze,s.renderState)}if(Ue&&Ue.includes("camera-access")&&M){e.state.unbindTexture(),u=i.getBinding();for(let ze=0;ze<re.length;ze++){const Ke=re[ze].camera;if(Ke){let We=f[Ke];We||(We=new Ul,f[Ke]=We);const Ve=u.getCameraImage(Ke);We.sourceTexture=Ve}}}}for(let re=0;re<T.length;re++){const Ie=E[re],Ue=T[re];Ie!==null&&Ue!==void 0&&Ue.update(Ie,ue,c||a)}qe&&qe(ae,ue),ue.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ue}),v=null}const He=new Hl;He.setAnimationLoop(we),this.setAnimationLoop=function(ae){qe=ae},this.dispose=function(){}}}const w0=new ut,Yl=new Oe;Yl.set(-1,0,0,0,1,0,0,0,1);function A0(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Fl(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,A,w,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&g(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),v(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),M(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,A,w):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Bt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Bt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const A=e.get(f),w=A.envMap,y=A.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(w0.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Yl),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,A,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*A,m.scale.value=w*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function g(m,f,A){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Bt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){const A=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function R0(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){const E=T.program;i.uniformBlockBinding(y,E)}function c(y,T){let E=s[y.id];E===void 0&&(m(y),E=h(y),s[y.id]=E,y.addEventListener("dispose",A));const P=T.program;i.updateUBOMapping(y,P);const x=e.render.frame;r[y.id]!==x&&(d(y),r[y.id]=x)}function h(y){const T=u();y.__bindingPointIndex=T;const E=n.createBuffer(),P=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,P,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const T=s[y.id],E=y.uniforms,P=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let x=0,C=E.length;x<C;x++){const U=E[x];if(Array.isArray(U))for(let F=0,V=U.length;F<V;F++)g(U[F],x,F,P);else g(U,x,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,T,E,P){if(M(y,T,E,P)===!0){const x=y.__offset,C=y.value;if(Array.isArray(C)){let U=0;for(let F=0;F<C.length;F++){const V=C[F],Z=f(V);v(V,y.__data,U),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(U+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(C,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function v(y,T,E){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,E)}function M(y,T,E,P){const x=y.value,C=T+"_"+E;if(P[C]===void 0)return typeof x=="number"||typeof x=="boolean"?P[C]=x:ArrayBuffer.isView(x)?P[C]=x.slice():P[C]=x.clone(),!0;{const U=P[C];if(typeof x=="number"||typeof x=="boolean"){if(U!==x)return P[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(U.equals(x)===!1)return U.copy(x),!0}}return!1}function m(y){const T=y.uniforms;let E=0;const P=16;for(let C=0,U=T.length;C<U;C++){const F=Array.isArray(T[C])?T[C]:[T[C]];for(let V=0,Z=F.length;V<Z;V++){const z=F[V],I=Array.isArray(z.value)?z.value:[z.value];for(let j=0,k=I.length;j<k;j++){const Q=I[j],le=f(Q),fe=E%P,pe=fe%le.boundary,be=fe+pe;E+=pe,be!==0&&P-be<le.storage&&(E+=P-be),z.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=E,E+=le.storage}}}const x=E%P;return x>0&&(E+=P-x),y.__size=E,y.__cache={},this}function f(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",y),T}function A(y){const T=y.target;T.removeEventListener("dispose",A);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const C0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nn=null;function P0(){return nn===null&&(nn=new vh(C0,16,16,Qn,Sn),nn.name="DFG_LUT",nn.minFilter=Ct,nn.magFilter=Ct,nn.wrapS=_n,nn.wrapT=_n,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}class $l{constructor(e={}){const{canvas:t=Zu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:g=Vt}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const M=g,m=new Set([Xa,Wa,ka]),f=new Set([Vt,ln,ji,Yi,Ha,Va]),A=new Uint32Array(4),w=new Int32Array(4),y=new Y;let T=null,E=null;const P=[],x=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=on,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let F=!1,V=null,Z=null,z=null,I=null;this._outputColorSpace=Xt;let j=0,k=0,Q=null,le=-1,fe=null;const pe=new dt,be=new dt;let qe=null;const we=new Xe(0);let He=0,ae=t.width,ue=t.height,re=1,Ie=null,Ue=null;const De=new dt(0,0,ae,ue),tt=new dt(0,0,ae,ue);let ze=!1;const Ke=new $a;let We=!1,Ve=!1;const ot=new ut,lt=new Y,ht=new dt,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function X(){return Q===null?re:1}let R=i;function te(b,W){return t.getContext(b,W)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${za}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Jt,!1),R===null){const W="webgl2";if(R=te(W,b),R===null)throw te(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Je("WebGLRenderer: "+b.message),b}let ne,S,p,N,L,O,q,B,D,G,ee,ce,se,ie,_e,Me,Pe,H,ge,oe,me,Ee,de;function Ce(){ne=new Pm(R),ne.init(),me=new S0(R,ne),S=new Em(R,ne,e,me),p=new v0(R,ne),S.reversedDepthBuffer&&d&&p.buffers.depth.setReversed(!0),Z=R.createFramebuffer(),z=R.createFramebuffer(),I=R.createFramebuffer(),N=new Dm(R),L=new r0,O=new M0(R,ne,p,L,S,me,N),q=new Cm(U),B=new Fh(R),Ee=new Mm(R,B),D=new Nm(R,B,N,Ee),G=new Um(R,D,B,Ee,N),H=new Im(R,S,O),_e=new ym(L),ee=new s0(U,q,ne,S,Ee,_e),ce=new A0(U,L),se=new o0,ie=new f0(ne),Pe=new vm(U,q,p,G,v,l),Me=new x0(U,G,S),de=new R0(R,N,S,p),ge=new Sm(R,ne,N),oe=new Lm(R,ne,N),N.programs=ee.programs,U.capabilities=S,U.extensions=ne,U.properties=L,U.renderLists=se,U.shadowMap=Me,U.state=p,U.info=N}Ce(),M!==Vt&&(C=new Om(M,t.width,t.height,o,s,r));const Ae=new T0(U,R);this.xr=Ae,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const b=ne.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ne.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(b){b!==void 0&&(re=b,this.setSize(ae,ue,!1))},this.getSize=function(b){return b.set(ae,ue)},this.setSize=function(b,W,J=!0){if(Ae.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=b,ue=W,t.width=Math.floor(b*re),t.height=Math.floor(W*re),J===!0&&(t.style.width=b+"px",t.style.height=W+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(ae*re,ue*re).floor()},this.setDrawingBufferSize=function(b,W,J){ae=b,ue=W,re=J,t.width=Math.floor(b*J),t.height=Math.floor(W*J),this.setViewport(0,0,b,W)},this.setEffects=function(b){if(M===Vt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let W=0;W<b.length;W++)if(b[W].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(pe)},this.getViewport=function(b){return b.copy(De)},this.setViewport=function(b,W,J,$){b.isVector4?De.set(b.x,b.y,b.z,b.w):De.set(b,W,J,$),p.viewport(pe.copy(De).multiplyScalar(re).round())},this.getScissor=function(b){return b.copy(tt)},this.setScissor=function(b,W,J,$){b.isVector4?tt.set(b.x,b.y,b.z,b.w):tt.set(b,W,J,$),p.scissor(be.copy(tt).multiplyScalar(re).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(b){p.setScissorTest(ze=b)},this.setOpaqueSort=function(b){Ie=b},this.setTransparentSort=function(b){Ue=b},this.getClearColor=function(b){return b.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(b=!0,W=!0,J=!0){let $=0;if(b){let K=!1;if(Q!==null){const Se=Q.texture.format;K=m.has(Se)}if(K){const Se=Q.texture.type,Te=f.has(Se),ve=Pe.getClearColor(),Re=Pe.getClearAlpha(),Ne=ve.r,Be=ve.g,ke=ve.b;Te?(A[0]=Ne,A[1]=Be,A[2]=ke,A[3]=Re,R.clearBufferuiv(R.COLOR,0,A)):(w[0]=Ne,w[1]=Be,w[2]=ke,w[3]=Re,R.clearBufferiv(R.COLOR,0,w))}else $|=R.COLOR_BUFFER_BIT}W&&($|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&($|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&R.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),V=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),Pe.dispose(),se.dispose(),ie.dispose(),L.dispose(),q.dispose(),G.dispose(),Ee.dispose(),de.dispose(),ee.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",ro),Ae.removeEventListener("sessionend",ao),On.stop()};function ft(b){b.preventDefault(),Oo("WebGLRenderer: Context Lost."),F=!0}function rt(){Oo("WebGLRenderer: Context Restored."),F=!1;const b=N.autoReset,W=Me.enabled,J=Me.autoUpdate,$=Me.needsUpdate,K=Me.type;Ce(),N.autoReset=b,Me.enabled=W,Me.autoUpdate=J,Me.needsUpdate=$,Me.type=K}function Jt(b){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Qt(b){const W=b.target;W.removeEventListener("dispose",Qt),Ql(W)}function Ql(b){ed(b),L.remove(b)}function ed(b){const W=L.get(b).programs;W!==void 0&&(W.forEach(function(J){ee.releaseProgram(J)}),b.isShaderMaterial&&ee.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,J,$,K,Se){W===null&&(W=gt);const Te=K.isMesh&&K.matrixWorld.determinantAffine()<0,ve=id(b,W,J,$,K);p.setMaterial($,Te);let Re=J.index,Ne=1;if($.wireframe===!0){if(Re=D.getWireframeAttribute(J),Re===void 0)return;Ne=2}const Be=J.drawRange,ke=J.attributes.position;let Le=Be.start*Ne,et=(Be.start+Be.count)*Ne;Se!==null&&(Le=Math.max(Le,Se.start*Ne),et=Math.min(et,(Se.start+Se.count)*Ne)),Re!==null?(Le=Math.max(Le,0),et=Math.min(et,Re.count)):ke!=null&&(Le=Math.max(Le,0),et=Math.min(et,ke.count));const _t=et-Le;if(_t<0||_t===1/0)return;Ee.setup(K,$,ve,J,Re);let pt,nt=ge;if(Re!==null&&(pt=B.get(Re),nt=oe,nt.setIndex(pt)),K.isMesh)$.wireframe===!0?(p.setLineWidth($.wireframeLinewidth*X()),nt.setMode(R.LINES)):nt.setMode(R.TRIANGLES);else if(K.isLine){let Tt=$.linewidth;Tt===void 0&&(Tt=1),p.setLineWidth(Tt*X()),K.isLineSegments?nt.setMode(R.LINES):K.isLineLoop?nt.setMode(R.LINE_LOOP):nt.setMode(R.LINE_STRIP)}else K.isPoints?nt.setMode(R.POINTS):K.isSprite&&nt.setMode(R.TRIANGLES);if(K.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))nt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Tt=K._multiDrawStarts,ye=K._multiDrawCounts,zt=K._multiDrawCount,Ze=Re?B.get(Re).bytesPerElement:1,kt=L.get($).currentProgram.getUniforms();for(let en=0;en<zt;en++)kt.setValue(R,"_gl_DrawID",en),nt.render(Tt[en]/Ze,ye[en])}else if(K.isInstancedMesh)nt.renderInstances(Le,_t,K.count);else if(J.isInstancedBufferGeometry){const Tt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ye=Math.min(J.instanceCount,Tt);nt.renderInstances(Le,_t,ye)}else nt.render(Le,_t)};function so(b,W,J){b.transparent===!0&&b.side===gn&&b.forceSinglePass===!1?(b.side=Bt,b.needsUpdate=!0,es(b,W,J),b.side=Un,b.needsUpdate=!0,es(b,W,J),b.side=gn):es(b,W,J)}this.compile=function(b,W,J=null){J===null&&(J=b),E=ie.get(J),E.init(W),x.push(E),J.traverseVisible(function(K){K.isLight&&K.layers.test(W.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),b!==J&&b.traverseVisible(function(K){K.isLight&&K.layers.test(W.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),E.setupLights();const $=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Se=K.material;if(Se)if(Array.isArray(Se))for(let Te=0;Te<Se.length;Te++){const ve=Se[Te];so(ve,J,K),$.add(ve)}else so(Se,J,K),$.add(Se)}),E=x.pop(),$},this.compileAsync=function(b,W,J=null){const $=this.compile(b,W,J);return new Promise(K=>{function Se(){if($.forEach(function(Te){L.get(Te).currentProgram.isReady()&&$.delete(Te)}),$.size===0){K(b);return}setTimeout(Se,10)}ne.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Js=null;function td(b){Js&&Js(b)}function ro(){On.stop()}function ao(){On.start()}const On=new Hl;On.setAnimationLoop(td),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(b){Js=b,Ae.setAnimationLoop(b),b===null?On.stop():On.start()},Ae.addEventListener("sessionstart",ro),Ae.addEventListener("sessionend",ao),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;V!==null&&V.renderStart(b,W);const J=Ae.enabled===!0&&Ae.isPresenting===!0,$=C!==null&&(Q===null||J)&&C.begin(U,Q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(W),W=Ae.getCamera()),b.isScene===!0&&b.onBeforeRender(U,b,W,Q),E=ie.get(b,x.length),E.init(W),E.state.textureUnits=O.getTextureUnits(),x.push(E),ot.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Ke.setFromProjectionMatrix(ot,an,W.reversedDepth),Ve=this.localClippingEnabled,We=_e.init(this.clippingPlanes,Ve),T=se.get(b,P.length),T.init(),P.push(T),Ae.enabled===!0&&Ae.isPresenting===!0){const Te=U.xr.getDepthSensingMesh();Te!==null&&Qs(Te,W,-1/0,U.sortObjects)}Qs(b,W,0,U.sortObjects),T.finish(),U.sortObjects===!0&&T.sort(Ie,Ue,W.reversedDepth),st=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,st&&Pe.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),We===!0&&_e.beginShadows();const K=E.state.shadowsArray;if(Me.render(K,b,W),We===!0&&_e.endShadows(),($&&C.hasRenderPass())===!1){const Te=T.opaque,ve=T.transmissive;if(E.setupLights(),W.isArrayCamera){const Re=W.cameras;if(ve.length>0)for(let Ne=0,Be=Re.length;Ne<Be;Ne++){const ke=Re[Ne];co(Te,ve,b,ke)}st&&Pe.render(b);for(let Ne=0,Be=Re.length;Ne<Be;Ne++){const ke=Re[Ne];oo(T,b,ke,ke.viewport)}}else ve.length>0&&co(Te,ve,b,W),st&&Pe.render(b),oo(T,b,W)}Q!==null&&k===0&&(O.updateMultisampleRenderTarget(Q),O.updateRenderTargetMipmap(Q)),$&&C.end(U),b.isScene===!0&&b.onAfterRender(U,b,W),Ee.resetDefaultState(),le=-1,fe=null,x.pop(),x.length>0?(E=x[x.length-1],O.setTextureUnits(E.state.textureUnits),We===!0&&_e.setGlobalState(U.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?T=P[P.length-1]:T=null,V!==null&&V.renderEnd()};function Qs(b,W,J,$){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ke.intersectsSprite(b)){$&&ht.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ot);const Te=G.update(b),ve=b.material;ve.visible&&T.push(b,Te,ve,J,ht.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ke.intersectsObject(b))){const Te=G.update(b),ve=b.material;if($&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ht.copy(b.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ht.copy(Te.boundingSphere.center)),ht.applyMatrix4(b.matrixWorld).applyMatrix4(ot)),Array.isArray(ve)){const Re=Te.groups;for(let Ne=0,Be=Re.length;Ne<Be;Ne++){const ke=Re[Ne],Le=ve[ke.materialIndex];Le&&Le.visible&&T.push(b,Te,Le,J,ht.z,ke)}}else ve.visible&&T.push(b,Te,ve,J,ht.z,null)}}const Se=b.children;for(let Te=0,ve=Se.length;Te<ve;Te++)Qs(Se[Te],W,J,$)}function oo(b,W,J,$){const{opaque:K,transmissive:Se,transparent:Te}=b;E.setupLightsView(J),We===!0&&_e.setGlobalState(U.clippingPlanes,J),$&&p.viewport(pe.copy($)),K.length>0&&Qi(K,W,J),Se.length>0&&Qi(Se,W,J),Te.length>0&&Qi(Te,W,J),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function co(b,W,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[$.id]===void 0){const Le=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[$.id]=new cn(1,1,{generateMipmaps:!0,type:Le?Sn:Vt,minFilter:qn,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const Se=E.state.transmissionRenderTarget[$.id],Te=$.viewport||pe;Se.setSize(Te.z*U.transmissionResolutionScale,Te.w*U.transmissionResolutionScale);const ve=U.getRenderTarget(),Re=U.getActiveCubeFace(),Ne=U.getActiveMipmapLevel();U.setRenderTarget(Se),U.getClearColor(we),He=U.getClearAlpha(),He<1&&U.setClearColor(16777215,.5),U.clear(),st&&Pe.render(J);const Be=U.toneMapping;U.toneMapping=on;const ke=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),E.setupLightsView($),We===!0&&_e.setGlobalState(U.clippingPlanes,$),Qi(b,J,$),O.updateMultisampleRenderTarget(Se),O.updateRenderTargetMipmap(Se),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let et=0,_t=W.length;et<_t;et++){const pt=W[et],{object:nt,geometry:Tt,material:ye,group:zt}=pt;if(ye.side===gn&&nt.layers.test($.layers)){const Ze=ye.side;ye.side=Bt,ye.needsUpdate=!0,lo(nt,J,$,Tt,ye,zt),ye.side=Ze,ye.needsUpdate=!0,Le=!0}}Le===!0&&(O.updateMultisampleRenderTarget(Se),O.updateRenderTargetMipmap(Se))}U.setRenderTarget(ve,Re,Ne),U.setClearColor(we,He),ke!==void 0&&($.viewport=ke),U.toneMapping=Be}function Qi(b,W,J){const $=W.isScene===!0?W.overrideMaterial:null;for(let K=0,Se=b.length;K<Se;K++){const Te=b[K],{object:ve,geometry:Re,group:Ne}=Te;let Be=Te.material;Be.allowOverride===!0&&$!==null&&(Be=$),ve.layers.test(J.layers)&&lo(ve,W,J,Re,Be,Ne)}}function lo(b,W,J,$,K,Se){b.onBeforeRender(U,W,J,$,K,Se),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(U,W,J,$,b,Se),K.transparent===!0&&K.side===gn&&K.forceSinglePass===!1?(K.side=Bt,K.needsUpdate=!0,U.renderBufferDirect(J,W,$,K,b,Se),K.side=Un,K.needsUpdate=!0,U.renderBufferDirect(J,W,$,K,b,Se),K.side=gn):U.renderBufferDirect(J,W,$,K,b,Se),b.onAfterRender(U,W,J,$,K,Se)}function es(b,W,J){W.isScene!==!0&&(W=gt);const $=L.get(b),K=E.state.lights,Se=E.state.shadowsArray,Te=K.state.version,ve=ee.getParameters(b,K.state,Se,W,J,E.state.lightProbeGridArray),Re=ee.getProgramCacheKey(ve);let Ne=$.programs;$.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?W.environment:null,$.fog=W.fog;const Be=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;$.envMap=q.get(b.envMap||$.environment,Be),$.envMapRotation=$.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,Ne===void 0&&(b.addEventListener("dispose",Qt),Ne=new Map,$.programs=Ne);let ke=Ne.get(Re);if(ke!==void 0){if($.currentProgram===ke&&$.lightsStateVersion===Te)return ho(b,ve),ke}else ve.uniforms=ee.getUniforms(b),V!==null&&b.isNodeMaterial&&V.build(b,J,ve),b.onBeforeCompile(ve,U),ke=ee.acquireProgram(ve,Re),Ne.set(Re,ke),$.uniforms=ve.uniforms;const Le=$.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Le.clippingPlanes=_e.uniform),ho(b,ve),$.needsLights=rd(b),$.lightsStateVersion=Te,$.needsLights&&(Le.ambientLightColor.value=K.state.ambient,Le.lightProbe.value=K.state.probe,Le.directionalLights.value=K.state.directional,Le.directionalLightShadows.value=K.state.directionalShadow,Le.spotLights.value=K.state.spot,Le.spotLightShadows.value=K.state.spotShadow,Le.rectAreaLights.value=K.state.rectArea,Le.ltc_1.value=K.state.rectAreaLTC1,Le.ltc_2.value=K.state.rectAreaLTC2,Le.pointLights.value=K.state.point,Le.pointLightShadows.value=K.state.pointShadow,Le.hemisphereLights.value=K.state.hemi,Le.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Le.spotLightMatrix.value=K.state.spotLightMatrix,Le.spotLightMap.value=K.state.spotLightMap,Le.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=E.state.lightProbeGridArray.length>0,$.currentProgram=ke,$.uniformsList=null,ke}function uo(b){if(b.uniformsList===null){const W=b.currentProgram.getUniforms();b.uniformsList=Is.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function ho(b,W){const J=L.get(b);J.outputColorSpace=W.outputColorSpace,J.batching=W.batching,J.batchingColor=W.batchingColor,J.instancing=W.instancing,J.instancingColor=W.instancingColor,J.instancingMorph=W.instancingMorph,J.skinning=W.skinning,J.morphTargets=W.morphTargets,J.morphNormals=W.morphNormals,J.morphColors=W.morphColors,J.morphTargetsCount=W.morphTargetsCount,J.numClippingPlanes=W.numClippingPlanes,J.numIntersection=W.numClipIntersection,J.vertexAlphas=W.vertexAlphas,J.vertexTangents=W.vertexTangents,J.toneMapping=W.toneMapping}function nd(b,W){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(W.matrixWorld);for(let J=0,$=b.length;J<$;J++){const K=b[J];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function id(b,W,J,$,K){W.isScene!==!0&&(W=gt),O.resetTextureUnits();const Se=W.fog,Te=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?W.environment:null,ve=Q===null?U.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:je.workingColorSpace,Re=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ne=q.get($.envMap||Te,Re),Be=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ke=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Le=!!J.morphAttributes.position,et=!!J.morphAttributes.normal,_t=!!J.morphAttributes.color;let pt=on;$.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(pt=U.toneMapping);const nt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Tt=nt!==void 0?nt.length:0,ye=L.get($),zt=E.state.lights;if(We===!0&&(Ve===!0||b!==fe)){const at=b===fe&&$.id===le;_e.setState($,b,at)}let Ze=!1;$.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==zt.state.version||ye.outputColorSpace!==ve||K.isBatchedMesh&&ye.batching===!1||!K.isBatchedMesh&&ye.batching===!0||K.isBatchedMesh&&ye.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&ye.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&ye.instancing===!1||!K.isInstancedMesh&&ye.instancing===!0||K.isSkinnedMesh&&ye.skinning===!1||!K.isSkinnedMesh&&ye.skinning===!0||K.isInstancedMesh&&ye.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&ye.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&ye.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&ye.instancingMorph===!1&&K.morphTexture!==null||ye.envMap!==Ne||$.fog===!0&&ye.fog!==Se||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==_e.numPlanes||ye.numIntersection!==_e.numIntersection)||ye.vertexAlphas!==Be||ye.vertexTangents!==ke||ye.morphTargets!==Le||ye.morphNormals!==et||ye.morphColors!==_t||ye.toneMapping!==pt||ye.morphTargetsCount!==Tt||!!ye.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,ye.__version=$.version);let kt=ye.currentProgram;Ze===!0&&(kt=es($,W,K),V&&$.isNodeMaterial&&V.onUpdateProgram($,kt,ye));let en=!1,yn=!1,ii=!1;const it=kt.getUniforms(),xt=ye.uniforms;if(p.useProgram(kt.program)&&(en=!0,yn=!0,ii=!0),$.id!==le&&(le=$.id,yn=!0),ye.needsLights){const at=nd(E.state.lightProbeGridArray,K);ye.lightProbeGrid!==at&&(ye.lightProbeGrid=at,yn=!0)}if(en||fe!==b){p.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),it.setValue(R,"projectionMatrix",b.projectionMatrix),it.setValue(R,"viewMatrix",b.matrixWorldInverse);const Tn=it.map.cameraPosition;Tn!==void 0&&Tn.setValue(R,lt.setFromMatrixPosition(b.matrixWorld)),S.logarithmicDepthBuffer&&it.setValue(R,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&it.setValue(R,"isOrthographic",b.isOrthographicCamera===!0),fe!==b&&(fe=b,yn=!0,ii=!0)}if(ye.needsLights&&(zt.state.directionalShadowMap.length>0&&it.setValue(R,"directionalShadowMap",zt.state.directionalShadowMap,O),zt.state.spotShadowMap.length>0&&it.setValue(R,"spotShadowMap",zt.state.spotShadowMap,O),zt.state.pointShadowMap.length>0&&it.setValue(R,"pointShadowMap",zt.state.pointShadowMap,O)),K.isSkinnedMesh){it.setOptional(R,K,"bindMatrix"),it.setOptional(R,K,"bindMatrixInverse");const at=K.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),it.setValue(R,"boneTexture",at.boneTexture,O))}K.isBatchedMesh&&(it.setOptional(R,K,"batchingTexture"),it.setValue(R,"batchingTexture",K._matricesTexture,O),it.setOptional(R,K,"batchingIdTexture"),it.setValue(R,"batchingIdTexture",K._indirectTexture,O),it.setOptional(R,K,"batchingColorTexture"),K._colorsTexture!==null&&it.setValue(R,"batchingColorTexture",K._colorsTexture,O));const bn=J.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&H.update(K,J,kt),(yn||ye.receiveShadow!==K.receiveShadow)&&(ye.receiveShadow=K.receiveShadow,it.setValue(R,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&W.environment!==null&&(xt.envMapIntensity.value=W.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=P0()),yn){if(it.setValue(R,"toneMappingExposure",U.toneMappingExposure),ye.needsLights&&sd(xt,ii),Se&&$.fog===!0&&ce.refreshFogUniforms(xt,Se),ce.refreshMaterialUniforms(xt,$,re,ue,E.state.transmissionRenderTarget[b.id]),ye.needsLights&&ye.lightProbeGrid){const at=ye.lightProbeGrid;xt.probesSH.value=at.texture,xt.probesMin.value.copy(at.boundingBox.min),xt.probesMax.value.copy(at.boundingBox.max),xt.probesResolution.value.copy(at.resolution)}Is.upload(R,uo(ye),xt,O)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Is.upload(R,uo(ye),xt,O),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&it.setValue(R,"center",K.center),it.setValue(R,"modelViewMatrix",K.modelViewMatrix),it.setValue(R,"normalMatrix",K.normalMatrix),it.setValue(R,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const at=$.uniformsGroups;for(let Tn=0,si=at.length;Tn<si;Tn++){const fo=at[Tn];de.update(fo,kt),de.bind(fo,kt)}}return kt}function sd(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function rd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(b,W,J){const $=L.get(b);$.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),L.get(b.texture).__webglTexture=W,L.get(b.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:J,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,W){const J=L.get(b);J.__webglFramebuffer=W,J.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(b,W=0,J=0){Q=b,j=W,k=J;let $=null,K=!1,Se=!1;if(b){const ve=L.get(b);if(ve.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(R.FRAMEBUFFER,ve.__webglFramebuffer),pe.copy(b.viewport),be.copy(b.scissor),qe=b.scissorTest,p.viewport(pe),p.scissor(be),p.setScissorTest(qe),le=-1;return}else if(ve.__webglFramebuffer===void 0)O.setupRenderTarget(b);else if(ve.__hasExternalTextures)O.rebindTextures(b,L.get(b.texture).__webglTexture,L.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Be=b.depthTexture;if(ve.__boundDepthTexture!==Be){if(Be!==null&&L.has(Be)&&(b.width!==Be.image.width||b.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(b)}}const Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Se=!0);const Ne=L.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ne[W])?$=Ne[W][J]:$=Ne[W],K=!0):b.samples>0&&O.useMultisampledRTT(b)===!1?$=L.get(b).__webglMultisampledFramebuffer:Array.isArray(Ne)?$=Ne[J]:$=Ne,pe.copy(b.viewport),be.copy(b.scissor),qe=b.scissorTest}else pe.copy(De).multiplyScalar(re).floor(),be.copy(tt).multiplyScalar(re).floor(),qe=ze;if(J!==0&&($=Z),p.bindFramebuffer(R.FRAMEBUFFER,$)&&p.drawBuffers(b,$),p.viewport(pe),p.scissor(be),p.setScissorTest(qe),K){const ve=L.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve.__webglTexture,J)}else if(Se){const ve=W;for(let Re=0;Re<b.textures.length;Re++){const Ne=L.get(b.textures[Re]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Re,Ne.__webglTexture,J,ve)}}else if(b!==null&&J!==0){const ve=L.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ve.__webglTexture,J)}le=-1},this.readRenderTargetPixels=function(b,W,J,$,K,Se,Te,ve=0){if(!(b&&b.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=L.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re){p.bindFramebuffer(R.FRAMEBUFFER,Re);try{const Ne=b.textures[ve],Be=Ne.format,ke=Ne.type;if(b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ve),!S.textureFormatReadable(Be)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!S.textureTypeReadable(ke)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-$&&J>=0&&J<=b.height-K&&R.readPixels(W,J,$,K,me.convert(Be),me.convert(ke),Se)}finally{const Ne=Q!==null?L.get(Q).__webglFramebuffer:null;p.bindFramebuffer(R.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(b,W,J,$,K,Se,Te,ve=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=L.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re)if(W>=0&&W<=b.width-$&&J>=0&&J<=b.height-K){p.bindFramebuffer(R.FRAMEBUFFER,Re);const Ne=b.textures[ve],Be=Ne.format,ke=Ne.type;if(b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ve),!S.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!S.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Le),R.bufferData(R.PIXEL_PACK_BUFFER,Se.byteLength,R.STREAM_READ),R.readPixels(W,J,$,K,me.convert(Be),me.convert(ke),0);const et=Q!==null?L.get(Q).__webglFramebuffer:null;p.bindFramebuffer(R.FRAMEBUFFER,et);const _t=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Ju(R,_t,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Le),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,Se),R.deleteBuffer(Le),R.deleteSync(_t),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,W=null,J=0){const $=Math.pow(2,-J),K=Math.floor(b.image.width*$),Se=Math.floor(b.image.height*$),Te=W!==null?W.x:0,ve=W!==null?W.y:0;O.setTexture2D(b,0),R.copyTexSubImage2D(R.TEXTURE_2D,J,0,0,Te,ve,K,Se),p.unbindTexture()},this.copyTextureToTexture=function(b,W,J=null,$=null,K=0,Se=0){let Te,ve,Re,Ne,Be,ke,Le,et,_t;const pt=b.isCompressedTexture?b.mipmaps[Se]:b.image;if(J!==null)Te=J.max.x-J.min.x,ve=J.max.y-J.min.y,Re=J.isBox3?J.max.z-J.min.z:1,Ne=J.min.x,Be=J.min.y,ke=J.isBox3?J.min.z:0;else{const xt=Math.pow(2,-K);Te=Math.floor(pt.width*xt),ve=Math.floor(pt.height*xt),b.isDataArrayTexture?Re=pt.depth:b.isData3DTexture?Re=Math.floor(pt.depth*xt):Re=1,Ne=0,Be=0,ke=0}$!==null?(Le=$.x,et=$.y,_t=$.z):(Le=0,et=0,_t=0);const nt=me.convert(W.format),Tt=me.convert(W.type);let ye;W.isData3DTexture?(O.setTexture3D(W,0),ye=R.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(O.setTexture2DArray(W,0),ye=R.TEXTURE_2D_ARRAY):(O.setTexture2D(W,0),ye=R.TEXTURE_2D),p.activeTexture(R.TEXTURE0),p.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,W.flipY),p.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),p.pixelStorei(R.UNPACK_ALIGNMENT,W.unpackAlignment);const zt=p.getParameter(R.UNPACK_ROW_LENGTH),Ze=p.getParameter(R.UNPACK_IMAGE_HEIGHT),kt=p.getParameter(R.UNPACK_SKIP_PIXELS),en=p.getParameter(R.UNPACK_SKIP_ROWS),yn=p.getParameter(R.UNPACK_SKIP_IMAGES);p.pixelStorei(R.UNPACK_ROW_LENGTH,pt.width),p.pixelStorei(R.UNPACK_IMAGE_HEIGHT,pt.height),p.pixelStorei(R.UNPACK_SKIP_PIXELS,Ne),p.pixelStorei(R.UNPACK_SKIP_ROWS,Be),p.pixelStorei(R.UNPACK_SKIP_IMAGES,ke);const ii=b.isDataArrayTexture||b.isData3DTexture,it=W.isDataArrayTexture||W.isData3DTexture;if(b.isDepthTexture){const xt=L.get(b),bn=L.get(W),at=L.get(xt.__renderTarget),Tn=L.get(bn.__renderTarget);p.bindFramebuffer(R.READ_FRAMEBUFFER,at.__webglFramebuffer),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,Tn.__webglFramebuffer);for(let si=0;si<Re;si++)ii&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,L.get(b).__webglTexture,K,ke+si),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,L.get(W).__webglTexture,Se,_t+si)),R.blitFramebuffer(Ne,Be,Te,ve,Le,et,Te,ve,R.DEPTH_BUFFER_BIT,R.NEAREST);p.bindFramebuffer(R.READ_FRAMEBUFFER,null),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||L.has(b)){const xt=L.get(b),bn=L.get(W);p.bindFramebuffer(R.READ_FRAMEBUFFER,z),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,I);for(let at=0;at<Re;at++)ii?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xt.__webglTexture,K,ke+at):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,xt.__webglTexture,K),it?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bn.__webglTexture,Se,_t+at):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,bn.__webglTexture,Se),K!==0?R.blitFramebuffer(Ne,Be,Te,ve,Le,et,Te,ve,R.COLOR_BUFFER_BIT,R.NEAREST):it?R.copyTexSubImage3D(ye,Se,Le,et,_t+at,Ne,Be,Te,ve):R.copyTexSubImage2D(ye,Se,Le,et,Ne,Be,Te,ve);p.bindFramebuffer(R.READ_FRAMEBUFFER,null),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else it?b.isDataTexture||b.isData3DTexture?R.texSubImage3D(ye,Se,Le,et,_t,Te,ve,Re,nt,Tt,pt.data):W.isCompressedArrayTexture?R.compressedTexSubImage3D(ye,Se,Le,et,_t,Te,ve,Re,nt,pt.data):R.texSubImage3D(ye,Se,Le,et,_t,Te,ve,Re,nt,Tt,pt):b.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Se,Le,et,Te,ve,nt,Tt,pt.data):b.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Se,Le,et,pt.width,pt.height,nt,pt.data):R.texSubImage2D(R.TEXTURE_2D,Se,Le,et,Te,ve,nt,Tt,pt);p.pixelStorei(R.UNPACK_ROW_LENGTH,zt),p.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ze),p.pixelStorei(R.UNPACK_SKIP_PIXELS,kt),p.pixelStorei(R.UNPACK_SKIP_ROWS,en),p.pixelStorei(R.UNPACK_SKIP_IMAGES,yn),Se===0&&W.generateMipmaps&&R.generateMipmap(ye),p.unbindTexture()},this.initRenderTarget=function(b){L.get(b).__webglFramebuffer===void 0&&O.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?O.setTextureCube(b,0):b.isData3DTexture?O.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?O.setTexture2DArray(b,0):O.setTexture2D(b,0),p.unbindTexture()},this.resetState=function(){j=0,k=0,Q=null,p.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const ws=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],Kl=620,N0=560,L0=300,D0=2800,Pc=850,Nc=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],Lc=210,Ur=300,Dc=.42,Ic=740,As=n=>-(n+1)*Kl,I0=n=>n===1?1:1-Math.pow(2,-10*n),Fr=n=>new Promise(e=>setTimeout(e,n)),Uc=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function Fc(n){return Array.from({length:n},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${Uc[t%Uc.length]}`)}function U0({onDone:n}){const e=he.useRef(null),t=he.useRef(null),i=he.useRef(null),s=he.useRef(null),r=he.useRef(null),a=he.useRef(null),o=he.useRef(null),l=he.useRef(null),c=he.useRef(null),h=he.useRef(null),u=he.useRef(n);u.current=n,Kc();const d=he.useMemo(()=>Fc(16),[]),g=he.useMemo(()=>Fc(16),[]);return he.useEffect(()=>{let v=!1,M=!1;const m=()=>{M||(M=!0,u.current())};let f=null;function A(){if(!f)try{const X=window.AudioContext??window.webkitAudioContext;f=new X}catch{}return f}function w(){const X=A();if(!X)return;X.state==="suspended"&&X.resume();const R=X.currentTime,te=X.createOscillator();te.type="sine",te.frequency.setValueAtTime(130,R),te.frequency.exponentialRampToValueAtTime(42,R+.16);const ne=X.createGain();ne.gain.setValueAtTime(1,R),ne.gain.exponentialRampToValueAtTime(.001,R+.38),te.connect(ne).connect(X.destination),te.start(R),te.stop(R+.42);const S=Math.floor(X.sampleRate*.14),p=X.createBuffer(1,S,X.sampleRate),N=p.getChannelData(0);for(let B=0;B<S;B++)N[B]=(Math.random()*2-1)*Math.pow(1-B/S,2.2);const L=X.createBufferSource();L.buffer=p;const O=X.createBiquadFilter();O.type="lowpass",O.frequency.value=850;const q=X.createGain();q.gain.setValueAtTime(.55,R),q.gain.exponentialRampToValueAtTime(.001,R+.13),L.connect(O).connect(q).connect(X.destination),L.start(R)}function y(){const X=i.current;X&&(X.currentTime=0,X.play().catch(()=>{}))}const T=t.current,E=(T==null?void 0:T.getContext("2d"))??null;let P=[],x=0;function C(){T&&(T.width=window.innerWidth,T.height=window.innerHeight)}C();function U(X,R){P=[];let te=0;const ne=6;function S(N,L,O,q,B,D){const G=3+Math.floor(Math.random()*3),ee=[[N,L]];let ce=O,se=N,ie=L;for(let _e=0;_e<G;_e++){ce+=(Math.random()-.5)*.6;const Me=q/G;if(se+=Math.cos(ce)*Me,ie+=Math.sin(ce)*Me,ee.push([se,ie]),B>0&&Math.random()<.5){const Pe=ce+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);S(se,ie,Pe,q*(.35+Math.random()*.3),B-1,D*.78)}}P.push({pts:ee,color:Nc[te++%Nc.length],width:D})}const p=[R*(.06+Math.random()*.1),R*(.84+Math.random()*.1)];for(let N=0;N<ne;N++){const L=X*(.15+Math.random()*.7),O=N<p.length?p[N]:R*(.1+Math.random()*.8),q=9+Math.floor(Math.random()*6);for(let B=0;B<q;B++){const D=B/q*Math.PI*2+(Math.random()-.5)*.4,G=Math.max(X,R)*(.18+Math.random()*.38);S(L,O,D,G,2,.9)}}}function F(X){if(!E||X<=0)return;const R=Math.min(1,X/2.4),te=Math.round(P.length*R);for(let ne=0;ne<te;ne++){const S=P[ne];E.lineWidth=S.width*(.9+X*.1),E.strokeStyle=S.color,E.globalAlpha=.75+X*.1,E.shadowColor=S.color,E.shadowBlur=5+X*2.2,E.beginPath(),S.pts.forEach(([p,N],L)=>L===0?E.moveTo(p,N):E.lineTo(p,N)),E.stroke()}E.globalAlpha=1,E.shadowBlur=0}function V(X,R,te){E&&(E.clearRect(0,0,R,te),F(X))}function Z(){const X=c.current;X&&(X.classList.remove("intro-hit"),X.offsetWidth,X.classList.add("intro-hit"))}function z(){var R,te,ne,S;const X=(R=r.current)==null?void 0:R.firstElementChild;X&&(X.classList.remove("intro-rgbslam"),X.offsetWidth,X.classList.add("intro-rgbslam")),(te=r.current)==null||te.classList.remove("intro-jitter"),(ne=r.current)==null||ne.offsetWidth,(S=r.current)==null||S.classList.add("intro-jitter"),Z(),We()}async function I(){for(let X=5;X>=1&&!v;X--){const R=r.current;if(!R)return;R.innerHTML="";const te=document.createElement("div");te.className="intro-glyph",te.setAttribute("data-t",String(X)),te.textContent=String(X),R.appendChild(te),z(),w(),await te.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:Pc*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Fr(Pc*.3)}}let j=null,k=null,Q=null,le=0,fe=!1,pe=-1;const qe=document.createElement("canvas").getContext("2d");qe.font=`700 ${Lc}px "Rajdhani", sans-serif`;const we=[],He=[];function ae(X,R){const te=Math.ceil(qe.measureText(X).width),ne=Math.max(200,te+120),S=document.createElement("canvas");S.width=ne,S.height=Ur;const p=S.getContext("2d");p.font=`700 ${Lc}px "Rajdhani", sans-serif`,p.textAlign="center",p.textBaseline="middle",p.shadowColor=R,p.shadowBlur=56,p.fillStyle="#d24e01",p.fillText(X,ne/2,Ur/2);const N=new Il(S);N.anisotropy=4;let L=ne*Dc,O=Ur*Dc;if(L>Ic){const q=Ic/L;L*=q,O*=q}return{tex:N,worldW:L,worldH:O}}function ue(X,R,te){const{tex:ne,worldW:S,worldH:p}=ae(X,te),N=new Di(S,p),L=new In({map:ne,transparent:!0,depthWrite:!1,opacity:0}),O=new ct(N,L);O.position.set(0,10,R),O.visible=!1,k.add(O);const q=new ct(N,new In({map:ne,transparent:!0,depthWrite:!1,blending:Zn,color:2875596,opacity:0})),B=new ct(N,new In({map:ne,transparent:!0,depthWrite:!1,blending:Zn,color:10116351,opacity:0}));return q.position.copy(O.position),B.position.copy(O.position),q.visible=!1,B.visible=!1,k.add(q),k.add(B),He.push(N,L,ne,q.material,B.material),{mesh:O,ghostCy:q,ghostMg:B}}const re={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Ie,Ue;function De(){const X=e.current;if(!X)return;j=new $l({canvas:X,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),j.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),k=new Cl,k.fog=new js(263946,.0011),Q=new Ot(62,window.innerWidth/window.innerHeight,1,6e3),Q.position.set(0,0,40),k.add(new Gl(928300,1.1));const R=Kl*ws.length+500,te=900,ne=new Nt,S=new Float32Array(te*3),p=new Float32Array(te*3),N=[2875596,15357964,15357964,10116351];for(let B=0;B<te;B++){const D=60+Math.random()*260,G=Math.random()*Math.PI*2;S[B*3]=Math.cos(G)*D,S[B*3+1]=Math.sin(G)*D,S[B*3+2]=-Math.random()*R;const ee=new Xe(N[B%N.length]);p[B*3]=ee.r,p[B*3+1]=ee.g,p[B*3+2]=ee.b}ne.setAttribute("position",new Ut(S,3)),ne.setAttribute("color",new Ut(p,3));const L=new $s({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});k.add(new Ka(ne,L)),He.push(ne,L),ws.forEach((B,D)=>{const G=As(D),ee="#"+B.light.toString(16).padStart(6,"0");we.push(ue(B.text,G,ee));const ce=new $n(B.light,2.4,900,2);ce.position.set(0,40,G+60),k.add(ce)}),Ie=new $n(15357964,4,550,2),Ue=new $n(10116351,2.6,550,2),k.add(Ie),k.add(Ue),fe=!0,tt();const O=Math.random()*1e3;re.camZ=0;function q(B){if(!j||!k||!Q)return;{const ce=Math.sin(B*.0016+O)*1.1+Math.sin(B*.0043)*.5,se=Math.cos(B*.002+O)*.9+Math.cos(B*.0038)*.45;Q.position.x=ce+re.camX,Q.position.y=se+6}Q.position.z=re.camZ+re.warpKick;const D=re.yawKick,G=Q.position.x+Math.sin(D)*640;Q.lookAt(G,Q.position.y-4,re.focusZ),Q.rotateZ(-D*.5);const ee=62+re.fovKick*14;Q.fov!==ee&&(Q.fov=ee,Q.updateProjectionMatrix()),Ie.position.set(Math.sin(B*6e-4)*80,30,re.camZ-120),Ue.position.set(Math.cos(B*7e-4)*80,-10,re.camZ-200),we.forEach(ce=>{ce.mesh.visible&&ce.mesh.quaternion.copy(Q.quaternion),ce.ghostCy.visible&&ce.ghostCy.quaternion.copy(Q.quaternion),ce.ghostMg.visible&&ce.ghostMg.quaternion.copy(Q.quaternion)}),j.render(k,Q),le=requestAnimationFrame(q)}le=requestAnimationFrame(q)}function tt(){!fe||!j||!Q||(j.setSize(window.innerWidth,window.innerHeight),Q.aspect=window.innerWidth/window.innerHeight,Q.updateProjectionMatrix())}function ze(){tt(),C(),U(window.innerWidth,window.innerHeight),V(x,window.innerWidth,window.innerHeight)}window.addEventListener("resize",ze,{passive:!0});function Ke(X,R=650){const te=pe;pe=X;const ne=we[X];if(!ne)return;ne.mesh.visible=!0,ne.mesh.material.opacity=0;const S=te>=0?we[te]:null,p=performance.now();function N(){const L=Math.min(1,(performance.now()-p)/R);ne.mesh.material.opacity=L,S&&(S.mesh.material.opacity=1-L),L<1?requestAnimationFrame(N):S&&(S.mesh.visible=!1)}N()}function We(){if(pe<0)return;const X=we[pe];if(!X)return;const R=16+Math.random()*14;X.ghostCy.visible=!0,X.ghostCy.material.opacity=.6,X.ghostCy.position.x=-R,X.ghostMg.visible=!0,X.ghostMg.material.opacity=.6,X.ghostMg.position.x=R,setTimeout(()=>{X.ghostCy.material.opacity=0,X.ghostCy.visible=!1,X.ghostCy.position.x=0,X.ghostMg.material.opacity=0,X.ghostMg.visible=!1,X.ghostMg.position.x=0},140+Math.random()*100)}async function Ve(X,R,te,ne,S){const p=re.camZ,N=re.camX,L=performance.now();return re.warpKick=(Math.random()-.5)*34,re.yawKick=S*ne,re.fovKick=1,new Promise(O=>{function q(B){const D=Math.min(1,(B-L)/te),G=I0(D);re.camZ=p+(X-p)*G,re.camX=N+(R-N)*G,re.warpKick*=.92,re.yawKick*=.975,re.fovKick*=.965,D<1?requestAnimationFrame(q):O()}requestAnimationFrame(q)})}function ot(X=1,R=420){if(!fe||!E||!e.current)return;const te=window.innerWidth,ne=window.innerHeight,S=performance.now()+R;function p(){if(performance.now()>S){V(x,te,ne);return}E.clearRect(0,0,te,ne),F(x);const L=5+Math.floor(Math.random()*8*X);for(let q=0;q<L;q++){const B=Math.random()*ne,D=4+Math.random()*52*X,G=(Math.random()-.5)*130*X;try{E.drawImage(e.current,0,B,te,D,G,B,te,D)}catch{}}const O=Math.round(6*X);E.globalCompositeOperation="screen";for(let q=0;q<O;q++){const B=Math.random()*ne;E.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],E.globalAlpha=.35+Math.random()*.35,E.lineWidth=.6+Math.random()*1.6,E.beginPath(),E.moveTo(0,B),E.lineTo(te,B),E.stroke()}if(E.globalCompositeOperation="source-over",E.globalAlpha=1,Math.random()<X*.12){E.globalAlpha=.5;for(let q=0;q<220;q++)E.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",E.fillRect(Math.random()*te,Math.random()*ne,2,2);E.globalAlpha=1}requestAnimationFrame(p)}p()}function lt(X=1,R=340){if(!fe||!E)return;const te=window.innerWidth,ne=window.innerHeight,S=te/2,p=ne/2,N=12+Math.floor(10*X),L=Array.from({length:N},()=>Math.random()*Math.PI*2),O=performance.now();function q(){const D=(performance.now()-O)/R;if(D>=1){V(x,te,ne);return}E.save(),E.globalCompositeOperation="screen",L.forEach(G=>{const ee=30+D*300,ce=ee+90+Math.random()*150,se=S+Math.cos(G)*ee,ie=p+Math.sin(G)*ee,_e=S+Math.cos(G)*ce,Me=p+Math.sin(G)*ce;E.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",E.globalAlpha=(1-D)*(.28+Math.random()*.32)*X,E.lineWidth=1.2+Math.random()*1.8,E.beginPath(),E.moveTo(se,ie),E.lineTo(_e,Me),E.stroke()}),E.restore(),requestAnimationFrame(q)}q()}async function ht(X=900){const R=window.innerWidth,te=window.innerHeight;if(!E)return;const ne=performance.now(),S=P.map(()=>Math.random()*.25);await new Promise(p=>{function N(){const L=Math.min(1,(performance.now()-ne)/X);E.clearRect(0,0,R,te),P.forEach((O,q)=>{const B=Math.min(1,Math.max(0,(L-S[q])/(1-S[q])));if(B<=0)return;const D=O.pts,G=D.length-1,ee=B*G;E.lineWidth=O.width*(1+L*.4),E.strokeStyle=O.color,E.globalAlpha=.65+L*.3,E.shadowColor=O.color,E.shadowBlur=3+L*5,E.beginPath(),E.moveTo(D[0][0],D[0][1]);for(let ie=0;ie<Math.floor(ee);ie++)E.lineTo(D[ie+1][0],D[ie+1][1]);const ce=Math.floor(ee),se=ee-ce;if(ce<G&&se>0){const[ie,_e]=D[ce],[Me,Pe]=D[ce+1];E.lineTo(ie+(Me-ie)*se,_e+(Pe-_e)*se)}E.stroke()}),E.globalAlpha=1,E.shadowBlur=0,L<1?requestAnimationFrame(N):p()}N()})}async function gt(){var B;Z(),(B=r.current)==null||B.classList.add("intro-jitter");const X=h.current;if(!X)return;X.innerHTML="";const R=window.innerWidth,te=window.innerHeight,ne=11,S=8,p=R/ne,N=te/S,L=R/2,O=te/2,q=[];for(let D=0;D<S;D++)for(let G=0;G<ne;G++){const ee=G*p,ce=D*N,se=()=>(Math.random()-.5)*16,ie=document.createElement("div");ie.className="intro-shard",ie.style.left=ee+"px",ie.style.top=ce+"px",ie.style.width=p+2+"px",ie.style.height=N+2+"px",ie.style.clipPath=`polygon(${se()}px ${se()}px, ${p+se()}px ${se()}px, ${p+se()}px ${N+se()}px, ${se()}px ${N+se()}px)`,X.appendChild(ie);const _e=ee+p/2-L,Me=ce+N/2-O,Pe=Math.hypot(_e,Me)||1;q.push({div:ie,dx:_e/Pe,dy:Me/Pe,delay:Pe/Math.max(R,te)*220+Math.random()*80})}q.forEach(({div:D,dx:G,dy:ee,delay:ce})=>{const se=60+Math.random()*140,ie=420+Math.random()*420,_e=(Math.random()-.5)*420;D.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${G*se}px, ${ee*se-20}px) rotate(${_e*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${G*se*1.4}px, ${ee*se+ie}px) rotate(${_e}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:ce,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Fr(1600),X.innerHTML=""}async function st(){var X;if(U(window.innerWidth,window.innerHeight),De(),s.current&&(s.current.style.display="flex"),await I(),!v){s.current&&(s.current.style.display="none"),(X=o.current)==null||X.classList.add("intro-on"),y();for(let R=0;R<ws.length&&!v;R++){const te=ws[R];x=te.crack,l.current&&(l.current.innerHTML=te.final?te.sub:`${te.sub} · трещина канала <b>${te.crack}/4</b>`),Ke(R),re.focusZ=As(R);const ne=R%2===0?1:-1,S=te.final?0:ne*60,p=te.final?As(R)-L0:As(R)+N0;if(await Ve(p,S,D0,.5+te.crack*.09,ne),v)return;z(),ot(Math.min(1,.5+te.crack*.14),te.final?300:260),te.final||lt(.8+te.crack*.1,320),V(x,window.innerWidth,window.innerHeight)}v||(await ht(900),!v&&(await Fr(150),await gt(),!v&&m()))}}return st(),()=>{v=!0,window.removeEventListener("resize",ze),cancelAnimationFrame(le),He.forEach(X=>X.dispose()),j==null||j.dispose(),f==null||f.close().catch(()=>{})}},[]),_.jsx("div",{className:"host-screen grid-bg intro-screen",children:_.jsxs("div",{className:"intro-root",children:[_.jsx("canvas",{ref:e,className:"intro-gl"}),_.jsx("canvas",{ref:t,className:"intro-crack"}),_.jsx("div",{ref:h,className:"intro-shatter-layer"}),_.jsx("div",{className:"intro-vignette"}),_.jsx("div",{className:"intro-scanlines"}),_.jsx("div",{ref:c,className:"intro-noise"}),_.jsx("div",{className:"intro-bracket tl",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-bracket tr",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-bracket bl",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-bracket br",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-ticker left",children:_.jsx("div",{className:"intro-ticker-col",children:[...d,...d].map((v,M)=>_.jsx("span",{className:M%6===0?"hi":void 0,children:v},M))})}),_.jsx("div",{className:"intro-ticker right",children:_.jsx("div",{className:"intro-ticker-col",children:[...g,...g].map((v,M)=>_.jsx("span",{className:M%5===0?"hi":void 0,children:v},M))})}),_.jsxs("div",{ref:s,className:"intro-stage",children:[_.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),_.jsx("div",{ref:r,className:"intro-frame"}),_.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),_.jsx("div",{ref:o,className:"intro-flight-label",children:_.jsx("div",{ref:l,className:"intro-subline"})}),_.jsx(Zc,{}),_.jsx("audio",{ref:i,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const F0=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],Or=[3400,2700,2200,1900],Ba=640,Oc=560,O0=320,Bc=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Br=220,Rs=300,zc=.46,Gc=820,Vi=n=>-(n+1)*Ba,B0=n=>n===1?1:1-Math.pow(2,-10*n),ki=n=>new Promise(e=>setTimeout(e,n));function z0(){const n=new Yn,e=[],t=new Vn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),i=new Za(.42,.95,12),s=new ct(i,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),n.add(s),e.push(i,t);const r=new yi(.42,.36,1.9,12),a=new ct(r,t);a.rotation.x=Math.PI/2,a.position.set(0,0,-.15),n.add(a),e.push(r);const o=new ei(.5,.14,1),l=new Vn({color:1316636,metalness:.5,roughness:.6}),c=new ct(o,l);c.position.set(.08,.38,-.1),c.rotation.z=.1,n.add(c),e.push(o,l);const h=new Vn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),u=new Vs(.13,12,12),d=new ct(u,h);d.position.set(0,-.05,-2),n.add(d),e.push(u,h);const g=new Vs(.06,8,8);[-.22,.22].forEach(C=>{const U=new ct(g,h);U.position.set(C,.12,-1.7),n.add(U)}),e.push(g);const v=new yi(.06,.06,1.4,6),M=new Vn({color:1711394,metalness:.7,roughness:.4});e.push(v,M);const m=new ei(.04,.86,.05),f=new Vn({color:658447,metalness:.4,roughness:.6});e.push(m,f);const A=new yi(.5,.5,.07,16),w=new Vn({color:1382429,metalness:.6,roughness:.45});e.push(A,w);const y=new Ja(.6,.09,8,20);e.push(y);function T(C,U){const F=new Yn,V=new ct(v,M);V.rotation.z=Math.PI/2,V.position.set(C*.72,-.08,.15),F.add(V);const Z=C*1.45,z=new ct(A,w);z.rotation.x=Math.PI/2,z.position.set(Z,-.08,.15),F.add(z);const I=new Vn({color:855826,metalness:.75,roughness:.3,emissive:U,emissiveIntensity:1.4}),j=new ct(y,I);j.position.copy(z.position),F.add(j),e.push(I);const k=new Yn;k.position.copy(z.position);for(let Q=0;Q<5;Q++){const le=new ct(m,f);le.rotation.z=Q/5*Math.PI,k.add(le)}return F.add(k),{pod:F,rim:j,spokes:k}}const E=T(-1,2875596),P=T(1,15357964);n.add(E.pod,P.pod);const x=new $n(2875596,2.2,14,2);return x.position.set(0,0,-1.4),n.add(x),{group:n,rotorL:E,rotorR:P,engineLight:x,disposables:e}}function G0(n=60){const e=new Nt,t=new Float32Array(n*3),i=new Float32Array(n),s=new Float32Array(n*3);e.setAttribute("position",new Ut(t,3));const r=new $s({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:Zn,depthWrite:!1}),a=new Ka(e,r);let o=0;function l(h,u,d,g){for(let v=0;v<g;v++){const M=o;o=(o+1)%n,i[M]=.4+Math.random()*.35,t[M*3]=h,t[M*3+1]=u,t[M*3+2]=d,s[M*3]=(Math.random()-.5)*3.2,s[M*3+1]=(Math.random()-.5)*3.2-1,s[M*3+2]=(Math.random()-.5)*3.2}}function c(h){for(let u=0;u<n;u++){if(i[u]<=0){t[u*3+1]=-9999;continue}i[u]-=h,t[u*3]+=s[u*3]*h,t[u*3+1]+=s[u*3+1]*h,t[u*3+2]+=s[u*3+2]*h,i[u]<=0&&(t[u*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:a,geo:e,mat:r,spawn:l,tick:c}}function H0({onDone:n,phases:e=F0}){const t=he.useRef(null),i=he.useRef(null),s=he.useRef(null),r=he.useRef(null),a=he.useRef(null),o=he.useRef(null),l=he.useRef(null),c=he.useRef(n);c.current=n;const h=he.useRef(e);h.current=e;const u=he.useRef(()=>{});Kc();const d=he.useMemo(()=>e.map(g=>g.text).join(" → "),[e]);return he.useEffect(()=>{let g=!1,v=!1;const M=()=>{v||(v=!0,c.current())};u.current=M;const m=h.current,f=l.current,A=i.current,w=(A==null?void 0:A.getContext("2d"))??null;let y=[],T=0;function E(){A&&(A.width=window.innerWidth,A.height=window.innerHeight)}E();function P(X,R){y=[];let te=0;const ne=7;function S(N,L,O,q,B,D){const G=3+Math.floor(Math.random()*4),ee=[[N,L]];let ce=O,se=N,ie=L;for(let _e=0;_e<G;_e++){ce+=(Math.random()-.5)*.9;const Me=q/G*(.55+Math.random()*.85);if(se+=Math.cos(ce)*Me,ie+=Math.sin(ce)*Me,ee.push([se,ie]),B>0&&Math.random()<.58){const Pe=ce+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);S(se,ie,Pe,q*(.3+Math.random()*.35),B-1,D*.76)}}y.push({pts:ee,color:Bc[te++%Bc.length],width:D})}for(let N=0;N<ne;N++){const L=X*(.1+Math.random()*.8),O=R*(.08+Math.random()*.84),q=7+Math.floor(Math.random()*7);let B=Math.random()*Math.PI*2;for(let D=0;D<q;D++){B+=Math.PI*2/q*(.55+Math.random()*.9);const G=Math.max(X,R)*(.16+Math.random()*.46);S(L,O,B,G,2,.9)}}y.slice().forEach(N=>{if(N.pts.length<3||Math.random()>=.55)return;const[L,O]=N.pts[1+Math.floor(Math.random()*(N.pts.length-2))];S(L,O,Math.random()*Math.PI*2,Math.max(X,R)*(.08+Math.random()*.22),1,.55)})}function x(X){if(!w||X<=0)return;const R=Math.min(1,X/2.5),te=Math.round(y.length*R);for(let ne=0;ne<te;ne++){const S=y[ne];w.lineWidth=S.width*(.9+X*.1),w.strokeStyle=S.color,w.globalAlpha=.7+X*.07,w.shadowColor=S.color,w.shadowBlur=5+X*2.4,w.beginPath(),S.pts.forEach(([p,N],L)=>L===0?w.moveTo(p,N):w.lineTo(p,N)),w.stroke()}w.globalAlpha=1,w.shadowBlur=0}function C(X,R,te){w&&(w.clearRect(0,0,R,te),x(X))}function U(X=!1){const R=a.current;if(!R)return;const te=X?"fincine-hit-big":"fincine-hit";R.classList.remove("fincine-hit","fincine-hit-big"),R.offsetWidth,R.classList.add(te)}function F(){f&&(f.currentTime=0,f.play().catch(()=>{}))}let V=null,Z=null,z=null,I=0,j=!1,k=-1;const le=document.createElement("canvas").getContext("2d");le.font=`700 ${Br}px "Rajdhani", sans-serif`;const fe=[],pe=[];function be(X,R,te=1){const ne=X.toUpperCase(),S=Br*.05,p=Math.ceil(le.measureText(ne).width),N=Math.max(200,p+140+S*2),L=document.createElement("canvas");L.width=N,L.height=Rs;const O=L.getContext("2d");O.font=`700 ${Br}px "Rajdhani", sans-serif`,O.textAlign="center",O.textBaseline="middle",O.lineJoin="round",O.shadowColor=R,O.shadowBlur=60,O.strokeStyle="#eef6f4",O.lineWidth=S,O.strokeText(ne,N/2,Rs/2),O.fillStyle="#eef6f4",O.fillText(ne,N/2,Rs/2);const q=new Il(L);q.anisotropy=4;let B=N*zc*te,D=Rs*zc*te;if(B>Gc*te){const G=Gc*te/B;B*=G,D*=G}return{tex:q,worldW:B,worldH:D}}function qe(X,R,te,ne){const{tex:S,worldW:p,worldH:N}=be(X,te,ne),L=new Di(p,N),O=new In({map:S,transparent:!0,depthWrite:!1,opacity:0}),q=new ct(L,O);q.position.set(0,8,R),q.visible=!1,Z.add(q);const B=new ct(L,new In({map:S,transparent:!0,depthWrite:!1,blending:Zn,color:2875596,opacity:0})),D=new ct(L,new In({map:S,transparent:!0,depthWrite:!1,blending:Zn,color:16723804,opacity:0}));return B.position.copy(q.position),D.position.copy(q.position),B.visible=!1,D.visible=!1,Z.add(B),Z.add(D),pe.push(L,O,S,B.material,D.material),{mesh:q,ghostCy:B,ghostMg:D}}const we={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let He,ae,ue=null,re=null,Ie=0;function Ue(){const X=t.current;if(!X)return;V=new $l({canvas:X,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),V.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Z=new Cl,Z.fog=new js(263946,.0012),z=new Ot(58,window.innerWidth/window.innerHeight,1,6e3),z.position.set(0,0,40),Z.add(new Gl(928300,1));const R=Ba*m.length+600,te=700,ne=new Nt,S=new Float32Array(te*3),p=new Float32Array(te*3),N=[2875596,10116351,15357964];for(let B=0;B<te;B++){const D=60+Math.random()*280,G=Math.random()*Math.PI*2;S[B*3]=Math.cos(G)*D,S[B*3+1]=Math.sin(G)*D,S[B*3+2]=-Math.random()*R;const ee=new Xe(N[B%N.length]);p[B*3]=ee.r,p[B*3+1]=ee.g,p[B*3+2]=ee.b}ne.setAttribute("position",new Ut(S,3)),ne.setAttribute("color",new Ut(p,3));const L=new $s({size:3,vertexColors:!0,transparent:!0,opacity:.8});Z.add(new Ka(ne,L)),pe.push(ne,L),m.forEach((B,D)=>{const G=Vi(D),ee="#"+B.light.toString(16).padStart(6,"0");fe.push(qe(B.text,G,ee,B.final?1.35:1));const ce=new $n(B.light,2.6,950,2);ce.position.set(0,40,G+60),Z.add(ce)}),He=new $n(15357964,3.4,550,2),ae=new $n(10116351,2.2,550,2),Z.add(He),Z.add(ae),ue=z0(),z.add(ue.group),ue.group.position.set(1.3,-1,-6.5),re=G0(),ue.group.add(re.points),pe.push(re.geo,re.mat),Z.add(z),j=!0,De();const O=Math.random()*1e3;we.camZ=-Ba*.6;function q(B){if(!V||!Z||!z||!ue||!re)return;const D=Ie?Math.min(.05,(B-Ie)/1e3):.016;Ie=B;const G=.15+Math.min(1,Math.max(0,(k+1)/m.length))*.85,ee=we.impactT;ee>0&&(we.impactT=Math.max(0,ee-D));const ce=Math.sin(B*.0016+O)*(1+G*2.2+ee*6)+Math.sin(B*.0043)*.5*G,se=Math.cos(B*.002+O)*(.9+G*1.8+ee*5)+Math.cos(B*.0038)*.45*G;z.position.x=ce+we.camX,z.position.y=se+6,z.position.z=we.camZ+we.warpKick;const ie=we.yawKick,_e=z.position.x+Math.sin(ie)*640,Me=we.focusY??z.position.y-4;z.lookAt(_e,Me,we.focusZ),z.rotateZ(-ie*.55);const Pe=58+we.fovKick*(14+G*10)+ee*24;Math.abs(z.fov-Pe)>.01&&(z.fov=Pe,z.updateProjectionMatrix()),He.position.set(Math.sin(B*6e-4)*80,30,we.camZ-120),ae.position.set(Math.cos(B*7e-4)*80,-10,we.camZ-200),we.droneRoll=we.droneRoll*.9+-ie*1.4*.1;const H=1.6+G*2.4;we.droneBob=Math.sin(B*.001*H)*(.12+G*.35),ue.group.rotation.z=we.droneRoll*.6+(ee>0?Math.sin(B*.09)*1.15*ee:0),ue.group.rotation.x=Math.sin(B*.0013)*.06*(1+G)+(ee>0?Math.cos(B*.11)*.75*ee:0);const ge=D*(6+G*10);ue.rotorR.spokes.rotation.z+=ge;let oe=-1+we.droneBob;we.engineOutT>0?(we.engineOutT-=D,oe-=1-Math.max(0,we.engineOutT)/.5<1?Math.sin((.5-we.engineOutT)*9)*.4:0,ue.rotorL.spokes.rotation.z+=ge*.12,ue.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&re.spawn(-1.45,-.08,.15,2)):(ue.rotorL.spokes.rotation.z+=ge,ue.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(B*.01)*.3),ue.group.position.y=oe,ue.group.position.x=1.3+Math.sin(B*9e-4)*.25*(1+G),ue.group.position.z=-6.5-(ee>0?ee*2.6:0),re.tick(D),fe.forEach(me=>{me.mesh.visible&&me.mesh.quaternion.copy(z.quaternion),me.ghostCy.visible&&me.ghostCy.quaternion.copy(z.quaternion),me.ghostMg.visible&&me.ghostMg.quaternion.copy(z.quaternion)}),V.render(Z,z),I=requestAnimationFrame(q)}I=requestAnimationFrame(q)}function De(){!j||!V||!z||(V.setSize(window.innerWidth,window.innerHeight),z.aspect=window.innerWidth/window.innerHeight,z.updateProjectionMatrix())}function tt(){De(),E(),P(window.innerWidth,window.innerHeight),C(T,window.innerWidth,window.innerHeight)}window.addEventListener("resize",tt,{passive:!0});function ze(X,R=600){const te=k;k=X;const ne=fe[X];if(!ne)return;ne.mesh.visible=!0,ne.mesh.material.opacity=0;const S=te>=0?fe[te]:null,p=performance.now();function N(){const L=Math.min(1,(performance.now()-p)/R);ne.mesh.material.opacity=L,S&&(S.mesh.material.opacity=1-L),L<1?requestAnimationFrame(N):S&&(S.mesh.visible=!1)}N()}function Ke(X=.5){if(k<0)return;const R=fe[k];if(!R)return;const te=(14+Math.random()*12)*(.7+X*.6),ne=Math.min(1,.45+X*.3);R.ghostCy.visible=!0,R.ghostCy.material.opacity=ne,R.ghostCy.position.x=-te,R.ghostMg.visible=!0,R.ghostMg.material.opacity=ne,R.ghostMg.position.x=te,setTimeout(()=>{R.ghostCy.material.opacity=0,R.ghostCy.visible=!1,R.ghostCy.position.x=0,R.ghostMg.material.opacity=0,R.ghostMg.visible=!1,R.ghostMg.position.x=0},(120+Math.random()*90)*(.8+X*.5)),X>.75&&Math.random()<.65&&setTimeout(()=>Ke(X*.55),70+Math.random()*70)}async function We(X,R,te,ne,S){const p=we.camZ,N=we.camX,L=performance.now();return we.warpKick=(Math.random()-.5)*40,we.yawKick=S*ne,we.fovKick=1,new Promise(O=>{function q(B){if(g){O();return}const D=Math.min(1,(B-L)/te),G=B0(D);we.camZ=p+(X-p)*G,we.camX=N+(R-N)*G,we.warpKick*=.91,we.yawKick*=.972,we.fovKick*=.96,D<1?requestAnimationFrame(q):O()}requestAnimationFrame(q)})}function Ve(X=1,R=420){if(!j||!w||!t.current)return;const te=window.innerWidth,ne=window.innerHeight,S=performance.now()+R;function p(){if(performance.now()>S){C(T,te,ne);return}w.clearRect(0,0,te,ne),x(T);const L=5+Math.floor(Math.random()*9*X);for(let q=0;q<L;q++){const B=Math.random()*ne,D=4+Math.random()*56*X,G=(Math.random()-.5)*150*X;try{w.drawImage(t.current,0,B,te,D,G,B,te,D)}catch{}}w.globalCompositeOperation="screen";const O=Math.round(6*X);for(let q=0;q<O;q++){const B=Math.random()*ne;w.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],w.globalAlpha=.35+Math.random()*.35,w.lineWidth=.6+Math.random()*1.8,w.beginPath(),w.moveTo(0,B),w.lineTo(te,B),w.stroke()}if(w.globalCompositeOperation="source-over",w.globalAlpha=1,Math.random()<X*.14){w.globalAlpha=.5;for(let q=0;q<240;q++)w.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",w.fillRect(Math.random()*te,Math.random()*ne,2,2);w.globalAlpha=1}requestAnimationFrame(p)}p()}function ot(X=1,R=340){if(!j||!w)return;const te=window.innerWidth,ne=window.innerHeight,S=te/2,p=ne/2,N=14+Math.floor(14*X),L=Array.from({length:N},()=>Math.random()*Math.PI*2),O=performance.now();function q(){const D=(performance.now()-O)/R;if(D>=1){C(T,te,ne);return}w.save(),w.globalCompositeOperation="screen",L.forEach(G=>{const ee=30+D*340,ce=ee+100+Math.random()*170,se=S+Math.cos(G)*ee,ie=p+Math.sin(G)*ee,_e=S+Math.cos(G)*ce,Me=p+Math.sin(G)*ce;w.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",w.globalAlpha=(1-D)*(.3+Math.random()*.34)*X,w.lineWidth=1.2+Math.random()*2,w.beginPath(),w.moveTo(se,ie),w.lineTo(_e,Me),w.stroke()}),w.restore(),requestAnimationFrame(q)}q()}async function lt(X=900){const R=window.innerWidth,te=window.innerHeight;if(!w)return;const ne=performance.now(),S=y.map(()=>Math.random()*.25);await new Promise(p=>{function N(){if(g){p();return}const L=Math.min(1,(performance.now()-ne)/X);w.clearRect(0,0,R,te),y.forEach((O,q)=>{const B=Math.min(1,Math.max(0,(L-S[q])/(1-S[q])));if(B<=0)return;const D=O.pts,G=D.length-1,ee=B*G;w.lineWidth=O.width*(1+L*.45),w.strokeStyle=O.color,w.globalAlpha=.65+L*.32,w.shadowColor=O.color,w.shadowBlur=3+L*6,w.beginPath(),w.moveTo(D[0][0],D[0][1]);for(let ie=0;ie<Math.floor(ee);ie++)w.lineTo(D[ie+1][0],D[ie+1][1]);const ce=Math.floor(ee),se=ee-ce;if(ce<G&&se>0){const[ie,_e]=D[ce],[Me,Pe]=D[ce+1];w.lineTo(ie+(Me-ie)*se,_e+(Pe-_e)*se)}w.stroke()}),w.globalAlpha=1,w.shadowBlur=0,L<1?requestAnimationFrame(N):p()}N()})}async function ht(){we.impactT=.55,U(!0),re&&(re.spawn(0,-.05,-2,28),re.spawn(-1.45,-.08,.15,16),re.spawn(1.45,-.08,.15,16)),Ve(1.6,340),ot(1.4,260),await ki(160)}async function gt(){U(!0);const X=o.current;if(!X)return;X.innerHTML="";const R=window.innerWidth,te=window.innerHeight,ne=12,S=8,p=R/ne,N=te/S,L=R/2,O=te/2,q=[];for(let B=0;B<S;B++)for(let D=0;D<ne;D++){const G=D*p,ee=B*N,ce=()=>(Math.random()-.5)*16,se=document.createElement("div");se.className="fincine-shard",se.style.left=G+"px",se.style.top=ee+"px",se.style.width=p+2+"px",se.style.height=N+2+"px",se.style.clipPath=`polygon(${ce()}px ${ce()}px, ${p+ce()}px ${ce()}px, ${p+ce()}px ${N+ce()}px, ${ce()}px ${N+ce()}px)`,X.appendChild(se);const ie=G+p/2-L,_e=ee+N/2-O,Me=Math.hypot(ie,_e)||1;q.push({div:se,dx:ie/Me,dy:_e/Me,delay:Me/Math.max(R,te)*200+Math.random()*70})}q.forEach(({div:B,dx:D,dy:G,delay:ee})=>{const ce=70+Math.random()*160,se=460+Math.random()*460,ie=(Math.random()-.5)*460;B.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${D*ce}px, ${G*ce-22}px) rotate(${ie*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${D*ce*1.4}px, ${G*ce+se}px) rotate(${ie}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:ee,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await ki(1530),X.innerHTML=""}async function st(){if(P(window.innerWidth,window.innerHeight),Ue(),F(),s.current&&s.current.classList.add("fincine-on"),await ki(900),!g){for(let X=0;X<m.length&&!g;X++){const R=m[X];T=R.crack,r.current&&(r.current.innerHTML=R.final?R.sub:`${R.sub} · рассинхрон канала <b>${R.crack}/4</b>`),ze(X),we.focusZ=Vi(X),R.final&&(we.focusY=8);const te=X%2===0?1:-1;if(R.final){const ne=Vi(X)+Oc+280;if(await We(ne,0,Or[X]??2200,.35,te),g||(Ke(.4+R.crack*.2),Ve(Math.min(1.5,.45+R.crack*.27),300),C(T,window.innerWidth,window.innerHeight),await ki(700),await We(Vi(X)-O0,-150,950,.5,te),g))return}else{const ne=te*70,S=Vi(X)+Oc;if(R.crack>=2&&setTimeout(()=>{g||(we.engineOutT=.5)},Or[X]*.4),await We(S,ne,Or[X]??2200,.55+R.crack*.1,te),g)return}Ke(.4+R.crack*.2),Ve(Math.min(1.5,.45+R.crack*.27),R.final?360:240+R.crack*30),R.final||ot(.8+R.crack*.2,300+R.crack*20),R.crack>=3&&U(!0),C(T,window.innerWidth,window.innerHeight)}g||(await ht(),!g&&(await lt(850),!g&&(await ki(140),await gt(),!g&&M())))}}return st(),()=>{g=!0,window.removeEventListener("resize",tt),cancelAnimationFrame(I),pe.forEach(X=>X.dispose()),ue==null||ue.disposables.forEach(X=>X.dispose()),V==null||V.dispose();try{f==null||f.pause()}catch{}}},[]),_.jsxs("div",{className:"fincine-root",onClick:()=>u.current(),children:[_.jsx("canvas",{ref:t,className:"fincine-gl"}),_.jsx("canvas",{ref:i,className:"fincine-crack"}),_.jsx("div",{ref:o,className:"fincine-shatter-layer"}),_.jsx("div",{className:"fincine-vignette"}),_.jsx("div",{className:"fincine-scanlines"}),_.jsx("div",{ref:a,className:"fincine-noise"}),_.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!d,children:[_.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),_.jsx("div",{ref:r,className:"fincine-sub"})]}),_.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),_.jsx(Zc,{}),_.jsx("audio",{ref:l,src:"/quiz-party/intro.mp3",preload:"auto"})]})}function C_(){var l;const{gameState:n,loading:e,roomId:t}=od(),[i,s]=he.useState(null);if(he.useEffect(()=>{n!=null&&n.pack_id?Dd(n.pack_id,!0).then(s).catch(()=>{}):s(null)},[n==null?void 0:n.pack_id,n==null?void 0:n.round_number]),he.useEffect(()=>su(),[]),!e&&!t)return _.jsx(cd,{route:"/"});const r=(i==null?void 0:i.theme)??"classic",a=n?n.phase==="finale"||n.phase==="recap"?`${n.phase}-${n.round_number}`:`${n.phase}-${n.round_number}-${n.question_index}`:"",o=(n==null?void 0:n.phase)==="question"?`Q-${((n.round_number+1)*97+n.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null;return _.jsxs(Jd,{theme:r,isProjector:!0,phase:n==null?void 0:n.phase,children:[r==="new_year"&&_.jsx(Qd,{trigger:`${n==null?void 0:n.phase}-${n==null?void 0:n.round_number}-${n==null?void 0:n.question_index}`}),_.jsx(V0,{gameState:n,pack:i}),_.jsx(du,{theme:r,trigger:a,hud:o}),i&&_.jsx("div",{className:`pack-badge${(n==null?void 0:n.phase)==="lobby"&&((l=i.settings)==null?void 0:l.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:i.name}),_.jsx(Zd,{corner:!0})]})}function ks({theme:n}){return n==="new_year"?_.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):n==="potter"?_.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function Hc({theme:n}){return n!=="classic"?null:_.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[_.jsx("span",{className:"cd-line"}),_.jsx("span",{className:"cd-chip",children:"◆"}),_.jsx("span",{className:"cd-line"})]})}function V0({gameState:n,pack:e}){var f,A,w,y;const[t,i]=he.useState([]),[s,r]=he.useState("");he.useEffect(()=>{Id().then(i).catch(()=>i([]))},[]);const a=ti((n==null?void 0:n.game_id)??null),o=he.useMemo(()=>_u(a),[a]),l=he.useMemo(()=>{const T=`${location.origin}${location.pathname}#/player?room=${Ud()??""}`;return n!=null&&n.pack_id?`${T}&pack=${n.pack_id}`:T},[n==null?void 0:n.pack_id]),c=((n==null?void 0:n.random_groups)??[]).filter(T=>Array.isArray(T)&&T.length>0),h=c.map(T=>T.join(",")).join("|"),[u,d]=he.useState(!0);he.useEffect(()=>{d(!0)},[h]);const g=c.length>0&&u;if(s_((f=e==null?void 0:e.rounds)==null?void 0:f[(n==null?void 0:n.round_number)??0],(n==null?void 0:n.question_index)??0),r_(e,(n==null?void 0:n.round_number)??0),!n)return _.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const v=((A=e==null?void 0:e.settings)==null?void 0:A.play_mode)==="paper";if(n.phase==="lobby"||!n.pack_id||!e)return _.jsxs("div",{className:`host-screen grid-bg lobby-screen${v?" paper-lobby":""}`,children:[n.phase==="lobby"&&!!n.pack_id&&e&&_.jsx(nu,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?_.jsxs("div",{className:"cyber-lobby-head",children:[_.jsx(Xc,{side:"left"}),_.jsxs("div",{className:"clh-title",children:[_.jsx(xn,{theme:"classic",lines:["QUIZ","PARTY"]}),_.jsx(Hc,{theme:"classic"})]}),_.jsx(Xc,{side:"right"})]}):_.jsxs(_.Fragment,{children:[_.jsx(xn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),_.jsx(ks,{theme:(e==null?void 0:e.theme)??"classic"})]}),n.pack_id?_.jsxs(_.Fragment,{children:[g&&_.jsx(n_,{groups:c,onClose:()=>d(!1)}),c.length>0&&!u&&_.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>d(!0),children:"СОСТАВЫ КОМАНД"}),_.jsxs("div",{className:"lobby-teams",children:[a.length>0&&_.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?v?null:_.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):o.map(T=>_.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":T.color,opacity:wd(T)?1:.4},children:[T.icon&&_.jsx("span",{className:"lobby-team-icon",children:T.icon}),T.name]},T.id))]}),!v&&_.jsx(eu,{className:`lobby-qr-corner${g?" lobby-qr-lit":""}`,value:l,title:"QR для подключения"}),!v&&g&&_.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),_.jsxs("div",{className:"host-actions",children:[_.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Vr()},children:"⟲ Сменить пакет"}),_.jsx("button",{onClick:()=>{var T,E;return void((T=e==null?void 0:e.settings)!=null&&T.show_intro?Od():go(0,mo((E=e==null?void 0:e.settings)==null?void 0:E.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):_.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[_.jsxs("select",{value:s,onChange:T=>r(T.target.value),style:{fontSize:"1.2rem"},children:[_.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(T=>_.jsxs("option",{value:T.id,children:[T.name," (",T.status==="ready"?"готов":T.status==="played"?"сыгран":T.status,")"]},T.id))]}),_.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const T=t.find(E=>E.id===s);T&&T.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||Fd(s)},children:"Начать игру"})]})]});if(n.phase==="intro")return _.jsx(U0,{onDone:()=>{var T;go(0,mo((T=e==null?void 0:e.settings)==null?void 0:T.info_slides,0)??void 0)}});const M=e.rounds[n.round_number];if(!M)return _.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const m=M.questions[n.question_index];if(n.phase==="round_intro"){const T=M.settings.grid;return _.jsxs("div",{className:"host-screen grid-bg round-intro",children:[M.rules_audio&&_.jsx("audio",{autoPlay:!0,src:mt(M.rules_audio)}),e.theme==="potter"&&_.jsx("div",{className:"mg-veil","aria-hidden":!0}),M.mechanic==="crossword"&&T?_.jsxs("div",{className:"cw-layout",children:[_.jsx(tu,{grid:T,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/T.cols,innerHeight*.8/T.rows))))}),_.jsxs("div",{className:"side",children:[_.jsxs("div",{className:"mono-tag",children:["РАУНД ",bi(e,n.round_number)]}),_.jsx(xn,{theme:e.theme,lines:M.title_lines}),_.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:_o(M)}),M.rules.map((E,P)=>_.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+P*.5}s`},children:[_.jsx("span",{className:"idx",children:String(P+1).padStart(2,"0")}),E]},P))]})]}):_.jsxs(_.Fragment,{children:[_.jsxs("div",{className:"round-badge",children:[_.jsx("span",{className:"rb-word",children:"РАУНД"}),_.jsx("span",{className:"rb-num",children:bi(e,n.round_number)})]}),_.jsxs("div",{className:"ri-main",children:[_.jsx(xn,{theme:e.theme,lines:M.title_lines}),_.jsx(ks,{theme:e.theme}),_.jsx(Hc,{theme:e.theme}),_.jsx("div",{className:"meta-line",children:_o(M)})]}),M.rules.length>0&&_.jsxs("div",{className:"rules-frame","data-count":M.rules.length,children:[_.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),M.rules.map((E,P)=>_.jsxs("div",{className:"rule-item",style:{animationDelay:`${(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+P*.7}s`},children:[_.jsx("span",{className:"idx",children:String(P+1).padStart(2,"0")}),E]},P))]})]}),_.jsx("div",{className:"host-actions",children:M.mechanic==="anagram"?_.jsx(W0,{round:M,gameState:n}):_.jsx("button",{onClick:()=>void Kn(0,Dt(n)).catch(Rt),children:M.mechanic==="jeopardy"?"Начать раунд →":M.mechanic==="race"?"К скачкам →":M.mechanic==="melody"?"К трекам →":M.mechanic==="four_pics"||M.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(n.phase==="question"&&M.mechanic==="sprint")return _.jsxs("div",{className:"host-screen grid-bg",children:[_.jsx(fd,{pack:e,round:M,gameState:n,timerNode:_.jsx(Wi,{startedAt:n.timer_started_at,seconds:M.timer_seconds,theme:e.theme})}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{className:"ghost dark",onClick:()=>void Fs(0,!1,Dt(n)).catch(Rt),children:"К ответам →"})})]});if(n.phase==="question"&&M.mechanic==="blitz")return _.jsx(l_,{pack:e,round:M,gameState:n});if(n.phase==="question"&&M.mechanic==="race")return _.jsx(pd,{pack:e,round:M,gameState:n});if(n.phase==="question"&&M.mechanic==="melody")return _.jsx(md,{pack:e,round:M,gameState:n});if(n.phase==="question"&&M.mechanic==="four_pics")return _.jsx(gd,{pack:e,round:M,gameState:n,timerNode:(T,E,P)=>{var x,C;return _.jsx(Wi,{startedAt:((C=(x=n.melody)==null?void 0:x.rv)==null?void 0:C.startedAt)??null,seconds:T,theme:e.theme,chime:P},E)}});if(n.phase==="question"&&M.mechanic==="jeopardy")return _.jsx(_d,{pack:e,round:M,gameState:n});if(n.phase==="question"&&M.mechanic==="anagram"&&m){const T=n.question_index+1>=M.questions.length;return _.jsx(xd,{pack:e,round:M,roundIdx:n.round_number,q:m,qIndex:n.question_index,qCount:M.questions.length,gameState:n,timerSlot:n.reveal&&!n.timer_started_at?null:_.jsx(Wi,{startedAt:n.timer_started_at,seconds:M.timer_seconds,theme:e.theme},m.id),effectsSlot:_.jsxs(_.Fragment,{children:[!(n.reveal&&!n.timer_started_at)&&_.jsx(qc,{startedAt:n.timer_started_at,seconds:M.timer_seconds,q:m,round:M,pack:e,timerRunning:!!n.timer_started_at,manual:v,gameId:n.game_id,roundNumber:n.round_number}),_.jsx($c,{round:M,gameState:n,isLast:T}),_.jsx(Yc,{enabled:!n.reveal,startedAt:n.timer_started_at,seconds:M.timer_seconds})]}),actionsSlot:_.jsx(k0,{pack:e,round:M,gameState:n})},m.id)}if(n.phase==="question"&&m){const T=!!n.timer_started_at&&(Date.now()-new Date(n.timer_started_at).getTime())/1e3>M.timer_seconds-10,E=((w=e.settings)!=null&&w.answers_reveal&&M.answers_reveal==="after_question",M.answers_reveal??"after_round");return _.jsx(vd,{pack:e,round:M,roundIdx:n.round_number,q:m,qIndex:n.question_index,qCount:M.questions.length,timeLow:T,reveal:n.reveal,timerRunning:!!n.timer_started_at,timerSlot:M.mechanic!=="jeopardy"&&_.jsx(Wi,{startedAt:n.timer_started_at,seconds:M.timer_seconds,theme:e.theme},m.id),effectsSlot:M.mechanic!=="jeopardy"&&_.jsxs(_.Fragment,{children:[_.jsx(qc,{startedAt:n.timer_started_at,seconds:M.timer_seconds,q:m,round:M,pack:e,timerRunning:!!n.timer_started_at,manual:v,gameId:n.game_id,roundNumber:n.round_number}),_.jsx($c,{round:M,gameState:n,isLast:n.question_index+1>=M.questions.length}),_.jsx(Yc,{enabled:E==="after_question"&&!n.reveal,startedAt:n.timer_started_at,seconds:M.timer_seconds})]}),actionsSlot:_.jsxs("div",{className:"host-actions",children:[_.jsx(X0,{gameState:n}),(E==="after_question"||M.mechanic==="jeopardy")&&!n.reveal&&_.jsx("button",{onClick:()=>void Ti(),children:"Показать ответ"}),n.question_index+1<M.questions.length?_.jsx("button",{onClick:()=>void Kn(n.question_index+1,Dt(n)).catch(Rt),children:"Дальше →"}):E==="after_round"?_.jsx("button",{onClick:()=>void sl(Dt(n)).catch(Rt),children:"Время ответов →"}):_.jsx(Pi,{pack:e,gameState:n})]})})}if(n.phase==="info"){const T=((y=e==null?void 0:e.settings)==null?void 0:y.info_slides)??[],E=T[n.question_index]??T[0];if(E)return _.jsx(a_,{pack:e,slide:E,packId:n.pack_id,gameState:n})}return n.phase==="recap"?_.jsx(i_,{pack:e,round:M,gameState:n}):n.phase==="answer_time"?_.jsx(d_,{pack:e,round:M,gameState:n}):n.phase==="show_answers"&&m?_.jsx(u_,{pack:e,round:M,q:m,gameState:n}):n.phase==="scoreboard"?_.jsx(p_,{pack:e,gameState:n}):n.phase==="break"?_.jsx(m_,{pack:e,round:M,gameState:n}):n.phase==="counting"?_.jsx(g_,{pack:e,gameState:n}):n.phase==="finale"?_.jsx(__,{pack:e,gameId:n.game_id,gameState:n}):_.jsxs("div",{className:"host-screen grid-bg",children:[_.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",n.phase]}),n.phase==="question"&&!m&&_.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>void Xs("round_intro"),children:"← К титулу раунда"})})]})}function k0({pack:n,round:e,gameState:t}){const i=qd(),s=el(t.game_id),r=rl(s,e.questions),a=To({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:Date.now(),wasRun:r}),o=()=>{const c=$d(t.question_index),h=Dt(t);(c.kind==="shown"?kr(c.index,h):Xs("round_intro",h)).catch(Rt)},l=()=>{const c=To({reveal:t.reveal,timerStartedAt:t.timer_started_at,index:t.question_index,count:e.questions.length,nowMs:Date.now(),wasRun:r});if(c.kind==="wait")return i.show(c.text);const h=Dt(t);if(c.kind==="reveal")return void Ti(h).catch(Rt);if(c.kind==="next")return void(c.shown?kr(c.index,h):Kn(c.index,h)).catch(Rt)};return _.jsxs("div",{className:"host-actions",children:[_.jsx(jd,{text:i.text}),_.jsx("button",{className:"ghost",onClick:o,children:t.question_index>0?"← Назад":"← К титулу"}),!t.reveal&&_.jsx("button",{onClick:()=>void Ti(),children:"Показать ответ"}),a.kind==="afterRound"?_.jsx(Pi,{pack:n,gameState:t}):_.jsx("button",{onClick:l,children:"Дальше →"})]})}function W0({round:n,gameState:e}){const t=el(e.game_id),i=zd(rl(t,n.questions));return _.jsx("button",{onClick:()=>void(i.shown?kr(0,Dt(e)):Kn(0,Dt(e))).catch(Rt),children:"Первый вопрос →"})}function X0({gameState:n}){return n.question_index>0?_.jsx("button",{className:"ghost",onClick:()=>void Kn(n.question_index-1,Dt(n)).catch(Rt),children:"← Назад"}):_.jsx("button",{className:"ghost",onClick:()=>void Xs("round_intro",Dt(n)).catch(Rt),children:"← К титулу"})}function q0(n){const e=(n??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function j0(n){const e=n.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,i)=>Math.max(t,i.length),0))}const xn=he.forwardRef(function({theme:e,lines:t},i){const s=j0(t),r=t.join(`
`),a=Md(r,e==="classic"),o=e==="classic"?a.split(`
`):t;if(e!=="new_year")return _.jsx("h1",{ref:i,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((c,h)=>_.jsxs("span",{style:h===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[o[h]??c,_.jsx("br",{})]},h))});let l=0;return _.jsx("h1",{ref:i,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((c,h)=>_.jsx("span",{style:{display:"block"},children:[...c].map((u,d)=>u===" "?_.jsx("span",{children:" "},d):_.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*l++}s`},children:u},d))},h))})});function Y0(){hd()}function $0(n,e){const t=(n??"").trim();if(!t)return null;const i=e?Math.max(0,t.length-3):3,s=e?t.slice(0,i):t.slice(i),r=e?t.slice(i):t.slice(0,i);return e?_.jsxs(_.Fragment,{children:[s,_.jsx("b",{className:"rebus-hot",children:r})]}):_.jsxs(_.Fragment,{children:[_.jsx("b",{className:"rebus-hot",children:r}),s]})}function K0(n,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const i=[...n];for(let s=i.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[i[s],i[r]]=[i[r],i[s]]}return i}const Z0=5e3,Zl=3300,J0=500,Q0=900,Vc=100,kc=600,Wc=500;function e_(n){const e=n.answer;return e.mode==="choice"?Zl+J0+Q0:e.mode==="match"?Vc+kc*Math.max(0,Math.min(e.left.length,6)-1)+Wc:e.mode==="order"?Vc+kc*Math.max(0,e.correct_order.length-1)+Wc:1200}function t_({src:n}){const e=he.useRef(null);return he.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const i=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(i);try{t.pause()}catch{}}},[n]),_.jsx("div",{className:"reveal-video",children:_.jsx("video",{ref:e,src:n,playsInline:!0,muted:!1})})}function Jl(n){return n>15?" rows-16":n>13?" rows-14":n>11?" rows-12":n>9?" rows-10":n>6?" rows-7":""}function Xc({side:n}){const e=n==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return _.jsxs("div",{className:`cyber-panel cp-${n}`,"aria-hidden":"true",children:[_.jsx("span",{className:"cp-bar"}),_.jsx("div",{className:"cp-rows",children:e.map((t,i)=>_.jsx("span",{className:"cp-row",style:{animationDelay:`${i*.4}s`},children:t},t))}),_.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,i)=>_.jsx("i",{style:{width:`${2+i*7%5}px`}},i))})]})}function n_({groups:n,onClose:e}){he.useEffect(()=>{const i=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[e]);const t=n.reduce((i,s)=>i+s.length,0);return _.jsx("div",{className:"groups-overlay",onClick:e,children:_.jsxs("div",{className:"groups-modal","data-count":n.length,onClick:i=>i.stopPropagation(),children:[_.jsxs("div",{className:"gm-head",children:[_.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",n.length," · ",t," чел."]}),_.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),_.jsx("div",{className:"lg-list",children:n.map((i,s)=>_.jsxs("div",{className:"lg-team",children:[_.jsxs("div",{className:"lg-name",style:{color:Bd(s)},children:["Команда ",s+1]}),_.jsx("div",{className:"lg-players",children:i.join(" · ")})]},s))})]})})}function i_({pack:n,round:e,gameState:t}){const i=he.useMemo(()=>e.questions.filter(d=>!d.hidden),[e.questions]),[s,r]=he.useState(0),a=i[s],o=s+1>=i.length,l=()=>void sl({phase:"recap",round_number:t.round_number}).catch(Rt),c=()=>{o?l():r(d=>d+1)};if(he.useEffect(()=>{if(!a){l();return}let d=!0;const g=()=>{d&&c()},v=setTimeout(g,Z0),M=a.media.voice;if(!M)return()=>{d=!1,clearTimeout(v)};let m=!1;const f=$t();f.src=mt(M),f.play().then(()=>{if(m)try{f.pause(),f.src=""}catch{}}).catch(()=>{});const A=()=>{clearTimeout(v),g()};return f.addEventListener("ended",A),()=>{d=!1,m=!0,clearTimeout(v),f.removeEventListener("ended",A);try{f.pause(),f.src=""}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const h=(a.media.question??[]).filter(d=>!/\.(mp3|wav|mp4|webm)$/i.test(d)),u=!!a.question_text.trim();return _.jsxs("div",{className:`host-screen grid-bg recap-screen${h.length?" has-media":""}${u?"":" no-qtext"}`,children:[_.jsxs("div",{className:"host-topbar",children:[_.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),_.jsxs("span",{className:"qnum",children:[s+1," / ",i.length]})]}),_.jsxs("div",{className:"recap-body",children:[u&&_.jsx("p",{className:`q-text${Hr(a.question_text)}`,children:a.question_text}),h.length>0&&_.jsx("div",{className:`q-media-grid n${Math.min(h.length,4)}${h.length>1?" eq-row":""}${h.length>4?" wrap2":""}`,style:tl(a),children:h.map((d,g)=>_.jsx(zr,{src:mt(d)},g))})]},a.id),_.jsx("div",{className:"recap-dots","aria-hidden":"true",children:i.map((d,g)=>_.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),_.jsxs("div",{className:"host-actions",children:[_.jsx("button",{className:"ghost",onClick:l,children:"Пропустить повтор"}),_.jsx("button",{onClick:c,children:o?"К ответам →":"Следующий →"})]})]})}function s_(n,e){he.useEffect(()=>{if(!n)return;const i=n.questions.filter(a=>!a.hidden)[e+1];if(!i)return;const s=[...i.media.question??[],...i.media.answer??[],...i.media.voice?[i.media.voice]:[]],r=[];for(const a of s){const o=mt(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const l=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");l.preload="auto",l.src=o,r.push(l)}else{const l=new Image;l.src=o,r.push(l)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[n,e])}function r_(n,e){he.useEffect(()=>{if(!n)return;const t=[n.rounds[e],n.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const i=[...Ad({id:n.id,rounds:t})];return Rd(i),()=>Cd(i)},[n,e])}function a_({pack:n,slide:e,packId:t,gameState:i}){var o,l;const s=n.rounds.filter(c=>!c.off_scoreboard).map(c=>({id:c.id,name:(c.title_lines??[]).join(" ")||"—",count:c.questions.filter(h=>!h.hidden).length})),r=ti(i.game_id),a=Ed(n,r.length);return _.jsxs(_.Fragment,{children:[_.jsx(yd,{slide:e,rounds:s,stats:a,mediaUrl:mt}),_.jsx("div",{className:"host-actions",children:_.jsx(c_,{slides:((o=n.settings)==null?void 0:o.info_slides)??[],index:o_(n,e),packId:t,paper:((l=n.settings)==null?void 0:l.play_mode)==="paper"})})]})}function o_(n,e){var t;return(((t=n.settings)==null?void 0:t.info_slides)??[]).findIndex(i=>i.id===e.id)}function c_({slides:n,index:e,packId:t,paper:i}){var r;const s=((r=n[e])==null?void 0:r.show_at)==="finale";return _.jsxs(_.Fragment,{children:[e>0&&_.jsx("button",{className:"ghost",onClick:()=>void vi(e-1),children:"← Назад"}),e+1<n.length&&_.jsx("button",{className:"ghost",onClick:()=>void vi(e+1),children:"Дальше →"}),s?i?_.jsx("button",{onClick:()=>void Kd(),children:"К подсчёту →"}):_.jsx("button",{onClick:()=>void ol(t),children:"К итогам →"}):_.jsx("button",{onClick:()=>void Xs("round_intro"),children:"К раунду →"})]})}function l_({pack:n,round:e,gameState:t}){var f;const{state:i,setState:s}=ld(t.game_id,t.round_number),r=ti(t.game_id),a=Ki(t.game_id,t.round_number,400),o=he.useMemo(()=>e.questions.map(A=>({id:A.id,hidden:A.hidden})),[e.questions]),l=e.settings;he.useEffect(()=>{var T;const A=l.bg_music??((T=n.settings)==null?void 0:T.bg_music);if(!A)return;let w=!1;const y=$t();return y.src=mt(A),y.loop=!0,y.volume=.6,y.play().then(()=>{if(w)try{y.pause(),y.src=""}catch{}}).catch(()=>{}),()=>{w=!0;try{y.pause(),y.src=""}catch{}}},[e.id,l.bg_music,(f=n.settings)==null?void 0:f.bg_music]);const c=he.useRef(!1),h=async A=>{if(!c.current){c.current=!0,s(A);try{await dd(t.game_id,t.round_number,A),A.finished&&!(i!=null&&i.finished)&&(await ud(t.game_id,t.round_number,Ao(bo(A),l.timeoutPenalty??10)),Nd(e.id,Ld(i,A)).catch(w=>console.warn("банк блица: неотыгранные не вернулись —",w instanceof Error?w.message:w)))}finally{c.current=!1}}};he.useEffect(()=>{if(i||r.length<2)return;const A=setTimeout(()=>{const w=[...r].sort(()=>Math.random()-.5).map(y=>y.id);h(Gd(w,l.teamSeconds??60))},3e3);return()=>clearTimeout(A)},[i,r.length]),he.useEffect(()=>{if(!i||i.finished||i.current)return;const A=setTimeout(()=>{const w=Hd(o,i.used);if(!w)return void h(xo(i));Pd(w.id).catch(()=>{}),h(Vd(i,w.id,Date.now()))},vo);return()=>clearTimeout(A)},[i==null?void 0:i.current,i==null?void 0:i.turn,i==null?void 0:i.finished]);const u=i==null?void 0:i.current,d=u?e.questions.find(A=>A.id===u.questionId):void 0,g=i?kd(i):void 0;he.useEffect(()=>{if(!i||!u||!d||!g)return;const A=a.find(y=>y.team_id===g&&y.question_ref===`q-${d.id}`);if(!(A!=null&&A.answer_text)||u.lastAnswer===A.answer_text)return;if(A.answer_text===Wd){h(Mo(er(i,Date.now()),Date.now()));return}const w=Gr(d.answer,A.answer_text)===!0;h(Xd(i,Date.now(),w?"ok":"no",A.answer_text))},[a,u==null?void 0:u.questionId,u==null?void 0:u.lastAnswer]);const v=(u==null?void 0:u.verdict)==="no"&&u.attempts+1>=So;if(he.useEffect(()=>{if(!i||!(u!=null&&u.verdict))return;const w=Math.max(0,(v?Yd:vo)-(Date.now()-(u.pausedAt??Date.now()))),y=setTimeout(()=>{const T=Date.now(),E=er(i,T),P=a.find(x=>x.team_id===g&&x.question_ref===`q-${u.questionId}`);P&&al.patchAnswer(P.id,{is_correct:u.verdict==="ok"}).catch(()=>{}),h(u.verdict==="ok"?Eo(E,T):yo(E,T))},w);return()=>clearTimeout(y)},[u==null?void 0:u.verdict,u==null?void 0:u.lastAnswer]),!i)return _.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[_.jsx("div",{className:"host-topbar",children:_.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),_.jsx(po,{teams:r,rolling:!0})]});if(i.finished){const A=Ao(bo(i),l.timeoutPenalty??10);return _.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[_.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),_.jsxs("table",{className:"score-table",children:[_.jsx("thead",{children:_.jsxs("tr",{children:[_.jsx("th",{}),_.jsx("th",{children:"Команда"}),_.jsx("th",{children:"Очки"}),_.jsx("th",{children:"Баллы"})]})}),_.jsx("tbody",{children:A.map(w=>{var y;return _.jsxs("tr",{children:[_.jsxs("td",{children:[w.place,w.shared?"=":""]}),_.jsx("td",{children:((y=r.find(T=>T.id===w.teamId))==null?void 0:y.name)??"—"}),_.jsx("td",{children:w.points}),_.jsx("td",{children:w.score})]},w.teamId)})})]}),_.jsx("div",{className:"host-actions",children:_.jsx(Pi,{pack:n,gameState:t})})]})}const M=i.current!=null||Object.values(i.correct).some(A=>A>0)||Object.values(i.missed).some(A=>A>0),m=!u&&i.lastReveal?(()=>{const A=e.questions.find(w=>w.id===i.lastReveal.questionId);if(A)return{questionText:A.question_text,answerText:Us(A),verdict:i.lastReveal.verdict}})():void 0;return _.jsxs(_.Fragment,{children:[_.jsx(Sd,{teams:r,state:i,bank:o,questionText:d==null?void 0:d.question_text,verdict:u==null?void 0:u.verdict,reveal:m,answerText:(u==null?void 0:u.verdict)==="ok"||(u==null?void 0:u.verdict)==="no"&&u.attempts+1>=So?Us(d):void 0,dice:M?void 0:_.jsx(po,{teams:r,rolling:!1,pickedId:i.order[0]})}),_.jsxs("div",{className:"host-actions",children:[(u==null?void 0:u.verdict)&&_.jsxs("button",{className:"ghost",onClick:()=>{const A=Date.now(),w=er(i,A);h(u.verdict==="ok"?yo(w,A):Eo(w,A))},children:["Исправить на «",u.verdict==="ok"?"неверно":"верно","»"]}),u&&u.verdict!=="ok"&&_.jsx("button",{className:"ghost",onClick:()=>void h(Mo(i,Date.now())),children:"Скип −1"}),_.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&h(xo(i))},children:"Завершить раунд"})]})]})}function qc({q:n,round:e,timerRunning:t,pack:i,startedAt:s,seconds:r,manual:a=!1,gameId:o,roundNumber:l}){const c=(n.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),h=he.useRef(null),u=he.useRef(null),d=he.useRef(!1);return he.useEffect(()=>{if(Y0(),a&&!c||t)return;let g=!1;const v=(n.media.question??[]).find(f=>/\.(mp3|wav|m4a|ogg)$/i.test(f));d.current=!1;const M=()=>{if(!g){if(d.current=!0,v){const f=$t();f.src=mt(v),u.current=f,f.play().catch(()=>{})}wo(o&&l!=null?{gameId:o,roundNumber:l,questionRef:`q-${n.id}`}:void 0)}};if(!n.media.voice){M();return}const m=$t();return m.src=mt(n.media.voice),h.current=m,m.onended=M,m.onerror=M,m.play().then(()=>{if(g)try{m.pause(),m.src=""}catch{}}).catch(M),()=>{var A;g=!0;const f=h.current;if(f){f.onended=null,f.onerror=null;try{f.pause(),f.src=""}catch{}}h.current=null,(A=u.current)==null||A.pause()}},[n.id,a]),he.useEffect(()=>{if(!a||!t||c)return;let g=!1;const v=(n.media.question??[]).find(m=>/\.(mp3|wav|m4a|ogg)$/i.test(m)),M=()=>{if(g||!v)return;const m=$t();m.src=mt(v),u.current=m,m.play().catch(()=>{})};if(n.media.voice){const m=$t();m.src=mt(n.media.voice),h.current=m,m.onended=M,m.onerror=M,m.play().then(()=>{if(g)try{m.pause(),m.src=""}catch{}}).catch(M)}else M();return()=>{var f;g=!0;const m=h.current;if(m){m.onended=null,m.onerror=null;try{m.pause(),m.src=""}catch{}}h.current=null,(f=u.current)==null||f.pause()}},[n.id,a,t]),he.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const v=h.current;v&&!v.paused&&!v.ended||wo(o&&l!=null?{gameId:o,roundNumber:l,questionRef:`q-${n.id}`}:void 0)},2e3);return()=>clearInterval(g)},[n.id,t,a]),he.useEffect(()=>{var y;const g=e.settings.bg_music??((y=i==null?void 0:i.settings)==null?void 0:y.bg_music);if(!t||!g||c)return;let v=!1;const M=$t();M.src=mt(g),M.loop=!0,M.volume=.6,M.play().then(()=>{if(v)try{M.pause(),M.src=""}catch{}}).catch(()=>{});let m;const f=(r??e.timer_seconds??60)*1e3,A=s?f-(Date.now()-new Date(s).getTime()):f,w=window.setTimeout(()=>{m=window.setInterval(()=>{M.volume=Math.max(0,M.volume-.1),M.volume<=.01&&(m&&clearInterval(m),M.pause())},80)},Math.max(0,A)+3e3);return()=>{v=!0,clearTimeout(w),m&&clearInterval(m);try{M.pause(),M.src=""}catch{}}},[t,n.id]),null}function d_({pack:n,round:e,gameState:t}){var l;const i=e.settings.answerTimeSeconds??60,s=((l=n.settings)==null?void 0:l.play_mode)==="paper",r=ti(t.game_id),a=Ki(t.game_id,t.round_number),o=e.questions.filter(c=>!c.hidden).length;return he.useEffect(()=>{var d;const c=e.settings.bg_music??((d=n.settings)==null?void 0:d.bg_music);if(!c)return;let h=!1;const u=$t();return u.src=mt(c),u.loop=!0,u.volume=.6,u.play().then(()=>{if(h)try{u.pause(),u.src=""}catch{}}).catch(()=>{}),()=>{h=!0;try{u.pause(),u.src=""}catch{}}},[e.id]),_.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[_.jsxs("div",{className:"mono-tag",children:["РАУНД ",bi(n,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),_.jsx("div",{className:"answer-pulse",children:_.jsx(xn,{theme:n.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),_.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),_.jsx(Wi,{startedAt:t.timer_started_at,seconds:i,theme:n.theme,variant:"ring"}),!s&&_.jsx("div",{className:"answer-time-teams",children:r.map(c=>{const h=a.filter(d=>{var g;return d.team_id===c.id&&((g=d.answer_text)==null?void 0:g.trim())}).length,u=h>=o;return _.jsxs("div",{className:`at-team${u?" done":""}`,children:[_.jsx("span",{style:{color:c.color},children:c.name})," · ",h,"/",o]},c.id)})}),_.jsxs("div",{className:"host-actions",children:[_.jsx("button",{className:"ghost dark",onClick:()=>void Kn(e.questions.length-1,Dt(t)).catch(Rt),children:"← Назад"}),_.jsx("button",{onClick:()=>void Fs(0,!1,Dt(t)).catch(Rt),children:"К ответам →"})]})]})}function u_({pack:n,round:e,q:t,gameState:i}){var E;const s=((E=n.settings)==null?void 0:E.play_mode)==="paper",r=Ki(i.game_id,i.round_number),a=i.reveal,o=ti(i.game_id),[l,c]=he.useState([]);he.useEffect(()=>{ad.from("teams").select("id,name,color").then(({data:P})=>c(P??[]))},[]);const h=r.filter(P=>P.question_ref===`q-${t.id}`),u=e.questions.length,d=i.question_index;he.useEffect(()=>{if(a||document.hidden)return;const P=setTimeout(()=>{Ti()},3e3);return()=>clearTimeout(P)},[a,d]);const[g,v]=he.useState(!1);he.useEffect(()=>{if(v(!1),!a)return;const P=setTimeout(()=>v(!0),e_(t)+600);return()=>clearTimeout(P)},[a,t.id]),he.useEffect(()=>{!g||document.hidden||h.forEach(P=>{if(P.is_correct!=null)return;const x=Gr(t.answer,P.answer_text);x!==null&&al.patchAnswer(P.id,{is_correct:x}).catch(()=>{})})},[g,d,h.length,h.map(P=>P.answer_text).join("|")]);const M=t.answer.mode==="choice"?t.answer.choices:null,m=(t.media.question??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),f=(t.media.answer??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),A=(t.media.question??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),w=f.length?f:A,y=t.media.hidden?(t.media.question??[]).find(P=>/\.(mp4|webm)$/i.test(P)):void 0,T=(t.media.answer??[]).find(P=>/\.(mp3|wav|m4a|ogg)$/i.test(P));return _.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[_.jsxs("div",{className:"host-topbar",children:[_.jsxs("span",{className:"mono-tag",children:["РАУНД ",bi(n,i.round_number)," :: ОТВЕТЫ"]}),_.jsxs("span",{className:"qnum",children:["ВОПРОС ",_.jsx("b",{children:d+1})," / ",u]})]}),_.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[_.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&_.jsxs(_.Fragment,{children:[_.jsx("p",{className:`q-text${Hr(t.question_text)}`,children:t.question_text}),A.length>0&&!t.media.hidden&&_.jsx("div",{className:`q-media-grid n${Math.min(A.length,4)}${A.length>1?" eq-row":""}${A.length>4?" wrap2":""}`,style:tl(t),children:A.map((P,x)=>_.jsx(zr,{src:mt(P)},x))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&_.jsx("p",{className:`q-recall${Hr(t.question_text)}`,children:t.question_text}),a&&_.jsxs("div",{className:"answer-block reveal-in",children:[_.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),y&&_.jsx(t_,{src:mt(y)}),T&&_.jsx(bd,{src:mt(T)}),e.mechanic==="rebus"?_.jsxs(_.Fragment,{children:[_.jsx("div",{className:"answer-main",children:Us(t)}),_.jsx("div",{className:"rebus-answer",children:A.slice(0,2).map((P,x)=>_.jsxs("figure",{className:"q-img",children:[_.jsx("img",{src:mt(P),alt:""}),_.jsx("figcaption",{children:$0(x===0?t.service.word1:t.service.word2,x===0)})]},x))})]}):t.answer.mode==="match"?_.jsx(f_,{q:t}):M&&m.length===M.length?_.jsx(jc,{q:t,choices:M,imgs:m,theme:n.theme}):M?_.jsx(jc,{q:t,choices:M,theme:n.theme}):t.answer.mode==="order"?_.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((P,x)=>{const C=t.answer.choices.find(U=>U.key===P);return _.jsxs("div",{className:"oi",children:[_.jsx("b",{children:P}),_.jsx("span",{className:"oi-pos",children:x+1}),_.jsx("span",{className:"oi-text",children:(C==null?void 0:C.text)??""})]},x)})}):_.jsxs(_.Fragment,{children:[_.jsx("div",{className:"answer-main",children:Us(t)}),w.length>0&&_.jsx("div",{className:`q-media-grid answer-media n${Math.min(w.length,4)}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,children:w.map((P,x)=>_.jsx(zr,{src:mt(P)},x))})]}),g&&t.answer_note&&_.jsx("div",{className:`answer-note${q0(t.answer_note)}`,children:t.answer_note})]})]}),!s&&_.jsxs("div",{className:"team-answers",children:[_.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${h.length}`}),h.length===0&&_.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),h.map(P=>{const x=o.find(U=>U.id===P.team_id)??l.find(U=>U.id===P.team_id),C=g?P.is_correct??Gr(t.answer,P.answer_text):null;return _.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${C===!0?"var(--ok)":C===!1?"var(--danger)":"var(--dim)"}`},children:[_.jsx("span",{className:"name",style:{color:x==null?void 0:x.color},children:(x==null?void 0:x.name)??"—"}),_.jsxs("span",{className:"text",children:[a?P.answer_text||"—":"• • •",P.stake!=null&&P.stake!==0&&_.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",P.stake]})]}),C!=null&&_.jsx("span",{className:"mark",style:{color:C?"var(--ok)":"var(--danger)"},children:C?"✓":"✗"})]},P.id)})]})]}),_.jsxs("div",{className:"host-actions",children:[d>0&&_.jsx("button",{className:"ghost",onClick:()=>void Fs(d-1,!0,Dt(i)).catch(Rt),children:"← Назад"}),a?d<u-1?_.jsx("button",{onClick:()=>void Fs(d+1,!1,Dt(i)).catch(Rt),children:"Следующий вопрос →"}):_.jsx(Pi,{pack:n,gameState:i}):_.jsx("button",{onClick:()=>void Ti(),children:"Показать ответ →"})]})]})}function jc({q:n,choices:e,imgs:t,theme:i}){const[s,r]=he.useState(0);he.useEffect(()=>{r(0);const d=setTimeout(()=>r(1),2200),g=setTimeout(()=>r(2),Zl);return()=>{clearTimeout(d),clearTimeout(g)}},[n.id]);const a=n.answer.correct_choice??"",o=e.filter(d=>d.key!==a),l=new Set(K0(o.map(d=>d.key),n.id).slice(0,2)),c=d=>s>=1||l.has(d)?s<2?"":d===a?" correct":" dimmed":" hidden-yet",h=d=>l.has(d)?0:.25*e.filter(g=>!l.has(g.key)).findIndex(g=>g.key===d),u=i==="potter";return t?_.jsx("div",{className:"choice-imgs",children:e.map((d,g)=>_.jsxs("div",{className:`choice-img${c(d.key)}`,style:{animationDelay:`${h(d.key)}s`},children:[_.jsx("img",{src:mt(t[g]),alt:""}),_.jsxs("span",{className:"key",children:[d.key,d.text?` — ${d.text}`:""]})]},d.key))}):_.jsx("div",{className:`choices-grid${Td(e.map(d=>d.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(d=>_.jsxs("div",{className:`choice-plate${c(d.key)}`,style:{animationDelay:`${h(d.key)}s`},children:[_.jsx("span",{className:"key",children:d.key}),d.text,u&&c(d.key)===" correct"&&_.jsx(h_,{})]},d.key))})}function h_(){return _.jsx("svg",{className:"mg-check",viewBox:"0 0 24 24",width:"26",height:"26","aria-hidden":"true",children:_.jsx("path",{d:"M4 13l5 5L20 6",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}function Yc({enabled:n,startedAt:e,seconds:t}){return he.useEffect(()=>{if(!n||!e)return;const i=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Ti()},Math.max(0,i));return()=>clearTimeout(s)},[n,e,t]),null}function $c({round:n,gameState:e,isLast:t}){const i=n.settings.autoAdvanceSec??0;return he.useEffect(()=>{if(!i||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(n.timer_seconds+i)*1e3,a=Math.max(500,r-Date.now()),o=Dt(e),l=setTimeout(()=>{Kn(e.question_index+1,o).catch(Rt)},a);return()=>clearTimeout(l)},[e.timer_started_at,e.question_index,i]),null}function f_({q:n}){if(n.answer.mode!=="match")return null;const e=n.answer,t=(n.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),i=e.correct_pairs;return _.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var l;const a=((l=i.find(c=>c.startsWith(s)))==null?void 0:l.slice(s.length))??"—",o=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return _.jsxs("div",{className:"mi",children:[t[r]&&_.jsx("img",{src:mt(t[r]),alt:""}),_.jsxs("div",{className:"mi-label",children:[_.jsxs("b",{children:[s," → ",a]}),o&&o!==a&&_.jsx("span",{className:"mi-text",children:o})]})]},s)})})}function p_({pack:n,gameState:e}){const t=ti(e.game_id),i=Ki(e.game_id),s=nl(n,t,i),r=il(n,t,i),a=n.rounds.filter(m=>!m.off_scoreboard),o=Wr(t,s,i,r),l=o.map(m=>m.team),[c,h]=he.useState(0);he.useEffect(()=>{if(h(0),l.length===0)return;const m=setInterval(()=>h(f=>f>=l.length?f:f+1),2200);return()=>clearInterval(m)},[l.length,e.round_number]);const u=he.useRef(null),d=Jc([l.length,a.length],{shrinkBefore:u}),g=he.useMemo(()=>{const m=new Map(t.map(A=>{const w=s.get(A.id)??0,y=(r.get(A.id)??[])[e.round_number]??0;return[A.id,w-y]})),f=new Map(t.map(A=>[A.id,(r.get(A.id)??[]).slice(0,e.round_number)]));return Wr(t,m,i,f).map(A=>A.team)},[t,s,r,i,e.round_number]),v=he.useRef(new Map),M=he.useRef(null);return he.useLayoutEffect(()=>{if(n.theme!=="classic"&&n.theme!=="potter"||l.length===0||c<l.length||M.current===e.round_number||(M.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const f=new Map(g.map((w,y)=>[w.id,y]));l.forEach((w,y)=>{const T=v.current.get(w.id);if(!T)return;const P=(f.get(w.id)??y)-y;if(P===0)return;const x=T.getBoundingClientRect().height;T.style.transition="none",T.style.transform=`translateY(${P*x}px)`,T.classList.add("sb-flip"),T.offsetHeight,requestAnimationFrame(()=>{T.style.transition="",T.style.transform=""})});const A=setTimeout(()=>{v.current.forEach(w=>w.classList.remove("sb-flip"))},900);return()=>clearTimeout(A)},[c,l,g,n.theme,e.round_number]),_.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[_.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),_.jsx("h2",{className:"sb-title",ref:u,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),_.jsx("div",{className:"sb-table-wrap",children:_.jsxs("table",{ref:d,className:`score-table${Jl(l.length)}`,children:[_.jsx("thead",{children:_.jsxs("tr",{children:[_.jsx("th",{}),_.jsx("th",{children:"Команда"}),a.map((m,f)=>_.jsxs("th",{children:["Р",f+1]},m.id)),_.jsx("th",{children:"Σ"})]})}),_.jsx("tbody",{children:l.map((m,f)=>{const A=o.find(T=>T.team.id===m.id),w=(A==null?void 0:A.place)??1,y=f>=l.length-c;return _.jsxs("tr",{ref:T=>{T?v.current.set(m.id,T):v.current.delete(m.id)},className:`sb-row${y?" is-in":" is-veiled"}${w===1?" leader":""}`,children:[_.jsxs("td",{children:[w<=3?_.jsx("span",{className:"sb-medal",children:_.jsx(Xr,{theme:n.theme,place:w})}):w,(A==null?void 0:A.shared)&&_.jsx("span",{className:"sb-eq",children:"="})]}),_.jsx("td",{style:{color:m.color,fontFamily:"var(--font-display)"},children:_.jsx("span",{className:"sb-name",children:m.name})}),a.map(T=>{const E=r.get(m.id)??[];return _.jsx("td",{children:E[n.rounds.indexOf(T)]??0},T.id)}),_.jsx("td",{className:"total",children:s.get(m.id)??0})]},m.id)})})]})}),_.jsx("div",{className:"host-actions",children:_.jsx(Pi,{pack:n,gameState:e})})]})}function m_({pack:n,round:e,gameState:t}){const i=e.settings.break_after_minutes??10,[s,r]=he.useState(i*60);he.useEffect(()=>{const l=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),c=()=>r(Math.max(0,Math.round(i*60-(Date.now()-l)/1e3)));c();const h=setInterval(c,500);return()=>clearInterval(h)},[t.timer_started_at,i]);const a=String(Math.floor(s/60)).padStart(2,"0"),o=String(s%60).padStart(2,"0");return _.jsxs("div",{className:"host-screen grid-bg break-screen",children:[n.theme!=="potter"&&_.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),_.jsx(xn,{theme:n.theme,lines:["ПЕРЕРЫВ"]}),_.jsx(ks,{theme:n.theme}),n.theme==="potter"&&_.jsx(Qc,{left:s,seconds:i*60,low:s<=30}),_.jsxs("div",{className:"break-timer",children:[a,":",o]}),_.jsx("div",{className:"host-actions",children:_.jsx(Pi,{pack:n,gameState:t})})]})}function g_({pack:n,gameState:e}){var o,l;const[i,s]=he.useState(300);he.useEffect(()=>{const c=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),h=()=>s(Math.max(0,Math.round(5*60-(Date.now()-c)/1e3)));h();const u=setInterval(h,500);return()=>clearInterval(u)},[e.timer_started_at]),he.useEffect(()=>{var u,d;const c=((u=n.settings)==null?void 0:u.finale_music)??((d=n.settings)==null?void 0:d.bg_music);if(!c||document.hidden)return;const h=$t();return h.src=mt(c),h.loop=!0,h.volume=.55,h.play().catch(()=>{}),()=>{try{h.pause(),h.src=""}catch{}}},[(o=n.settings)==null?void 0:o.finale_music,(l=n.settings)==null?void 0:l.bg_music]);const r=String(Math.floor(i/60)).padStart(2,"0"),a=String(i%60).padStart(2,"0");return _.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[_.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),_.jsx(xn,{theme:n.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),_.jsx(ks,{theme:n.theme}),n.theme==="potter"&&_.jsx(Qc,{left:i,seconds:5*60,low:i<=30}),_.jsxs("div",{className:"break-timer",children:[r,":",a]}),_.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>void ol(e.pack_id,!0),children:"К итогам →"})})]})}function __({pack:n,gameId:e,gameState:t}){var x,C,U,F,V,Z;const i=ti(e),s=Ki(e),r=nl(n,i,s),a=il(n,i,s),o=Wr(i,r,s,a),l=!!t.reveal,c=t.question_index??0,[h,u]=he.useState(!((x=n.settings)!=null&&x.show_final_cinematic));he.useEffect(()=>{var j,k;const z=((j=n.settings)==null?void 0:j.finale_music)??((k=n.settings)==null?void 0:k.bg_music);if(!z||document.hidden||!h)return;const I=$t();return I.src=mt(z),I.loop=!0,I.volume=.55,I.play().catch(()=>{}),()=>{try{I.pause(),I.src=""}catch{}}},[(C=n.settings)==null?void 0:C.finale_music,(U=n.settings)==null?void 0:U.bg_music,h]);const d=he.useRef(null),g=Jc([o.length],{shrinkBefore:d,minScale:.3}),M=n.rounds.map((z,I)=>({r:z,i:I})).filter(z=>!z.r.off_scoreboard).map(({r:z,i:I})=>{var Q;let j=null,k=-1/0;for(const le of i){const fe=((Q=a.get(le.id))==null?void 0:Q[I])??0;fe>k&&(k=fe,j=le)}return{round:z,idx:I,team:j,score:k}}),m=3e3,f=1e4,A=M.length;he.useEffect(()=>{if(l||c>A||!h)return;const I=setTimeout(()=>void vi(c+1),c===A?f:m);return()=>clearTimeout(I)},[l,c,A,h]);const[w,y]=he.useState(0);if(he.useEffect(()=>{if(y(0),o.length===0)return;let z=!1,I=0,j;const k=()=>{z||(I+=1,y(I),!(I>=o.length)&&(j=setTimeout(k,Math.max(320,900-90*I))))};return j=setTimeout(k,Math.max(320,900-90*I)),()=>{z=!0,clearTimeout(j)}},[o.length,c,l]),!h)return _.jsx(H0,{onDone:()=>u(!0)});const T=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],E=_.jsx(_.Fragment,{children:Array.from({length:5},(z,I)=>_.jsxs("div",{className:"fw-burst",style:{left:`${12+I*19}%`,top:`${18+I%3*14}%`},children:[_.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${T[I%T.length]}55, transparent 70%)`,"--dur":`${2.2+I*.3}s`,"--delay":`${I*.45}s`}}),Array.from({length:10},(j,k)=>_.jsx("span",{className:"fw-spark",style:{background:T[(I+k)%T.length],"--a":`${k*36}deg`,"--dur":`${2.2+I*.3}s`,"--delay":`${I*.45}s`}},k))]},I))}),P=_.jsxs("div",{className:"fin-breakdown",children:[_.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),_.jsx("div",{className:"fin-table-wrap",children:_.jsxs("table",{ref:g,className:`fin-table${Jl(o.length)}`,children:[_.jsx("thead",{children:_.jsxs("tr",{children:[_.jsx("th",{}),_.jsx("th",{children:"Команда"}),n.rounds.map((z,I)=>!z.off_scoreboard&&_.jsxs("th",{children:["Р",bi(n,I)]},z.id)),_.jsx("th",{children:"Σ"})]})}),_.jsx("tbody",{children:o.map(({team:z,place:I,shared:j},k)=>{const Q=k>=o.length-w;return _.jsxs("tr",{className:`fin-row${I<=3?" top3":""}${I===1?" fin-first":""}${Q?" is-in":" is-veiled"}`,children:[_.jsxs("td",{className:"fin-pos",children:[I,j&&_.jsx("span",{className:"sb-eq",children:"="})]}),_.jsx("td",{style:{color:z.color},children:_.jsx("span",{className:"sb-name",children:z.name})}),n.rounds.map((le,fe)=>{var pe;return!le.off_scoreboard&&_.jsx("td",{children:((pe=a.get(z.id))==null?void 0:pe[fe])??0},le.id)}),_.jsx("td",{children:_.jsx("b",{children:r.get(z.id)??0})})]},z.id)})})]})})]});if(l){const z=[...new Set(o.map(k=>k.place))].filter(k=>k<=3).sort((k,Q)=>Q-k);if(c>=z.length)return _.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[E,_.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),_.jsx(xn,{ref:d,theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),P,_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Vr()},children:"⟲ Новая игра"})})]});const I=z[c],j=o.filter(k=>k.place===I);return _.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void vi(c+1),children:[I===1&&E,_.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),_.jsxs("div",{className:`fin-award p${I}`,children:[_.jsxs("div",{className:"fin-award-place",children:[I," МЕСТО"]}),_.jsx("div",{className:"fin-award-medal",children:_.jsx(Xr,{theme:n.theme,place:I})}),j.length>0?j.map(k=>_.jsx("div",{className:"fin-award-name",style:{color:k.team.color},children:k.team.name},k.team.id)):_.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(c<A){const z=M[c];return _.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void vi(c+1),children:[_.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),_.jsxs("div",{className:"fin-slide",children:[_.jsxs("div",{className:"fin-slide-round",children:["Раунд ",bi(n,z.idx)," · ",z.round.title_lines.join(" ")]}),_.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),_.jsx("div",{className:"fin-slide-team",style:{color:(F=z.team)==null?void 0:F.color},children:((V=z.team)==null?void 0:V.name)??"—"})]}),_.jsx("div",{className:"fin-progress",children:_.jsx("i",{style:{animationDuration:"3s"}})},c),_.jsx("div",{className:"fin-dots",children:M.map((I,j)=>_.jsx("span",{className:j===c?"on":""},j))})]})}if(c===A){const z=o.filter(I=>I.place===1);return _.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void vi(c+1),children:[E,_.jsx("div",{className:"mono-tag",children:z.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),_.jsxs("div",{className:"fin-award p1",children:[_.jsx("div",{className:"fin-award-medal",children:_.jsx(Xr,{theme:n.theme,place:1})}),z.length>0?z.map(I=>_.jsx("div",{className:"fin-award-name",style:{color:I.team.color},children:I.team.name},I.team.id)):_.jsx("div",{className:"fin-award-name",children:"—"}),_.jsx("div",{className:"fin-award-score",children:((Z=z[0])==null?void 0:Z.total)??0})]}),_.jsx("div",{className:"fin-progress",children:_.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return _.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[E,_.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),_.jsx(xn,{theme:n.theme,lines:["РЕЗУЛЬТАТЫ"]}),P,_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Vr()},children:"⟲ Новая игра"})})]})}export{C_ as HostScreen,q0 as noteClass,Y0 as stopAllMedia};
