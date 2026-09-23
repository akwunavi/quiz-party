import{j as _,s as $c}from"./index-DzpPJhs2.js";import{u as Kc,R as Zc,a as Jc,s as Qc,b as ed}from"./scoring-CO1bqTNc.js";import{r as he}from"./vendor-BbIxR9j-.js";import{c as jt,u as Hl,A as Vl,s as td,S as nd,T as bs,R as id,M as sd,a as rd,J as ad,Q as od,b as Xi,d as ld,B as co,e as Ns,f as cd,p as dd,I as ud,F as Ur,g as hd,h as kl,i as Wl,j as fd}from"./QuestionScreen-ZDWmaBh4.js";import{m as mt,u as Jn,i as pd,s as uo,c as md,p as gd,r as _d,a as qi,b as xd,d as Fr,l as Or,e as Xl}from"./jeopardyActions-DUyU-zvp.js";import{l as vd,a as Md,g as Sd,s as yd,r as Br,b as Ed,c as ho,d as Si,m as fo,e as Hi,f as Ls,h as Ds,i as ql,j as Ia,t as bd,k as Td,p as wd,n as po,o as Ad,N as mo,q as Rd,S as Cd,u as go,v as Ks,w as Pd,M as _o,x as jl,y as xo,z as vo,A as Mo,B as So,C as Yl,D as gi,F as Nd,E as Ld}from"./teamColors-7NzG9nXU.js";import{L as Dd,b as yo,c as $l,a as Kl,r as zr}from"./ranking-G5eRtlAH.js";import{T as Id,S as Ud}from"./ThemeLayer-HEJJFIKC.js";import{Q as Fd}from"./QrCode-D3ccYYrm.js";import{C as Od}from"./CrosswordView-DC6bfw69.js";import"./pollLoop-BPx8gArJ.js";function Bd({pack:i}){var e,t;return he.useEffect(()=>{var c,l;const n=((c=i==null?void 0:i.settings)==null?void 0:c.lobby_music)??((l=i==null?void 0:i.settings)==null?void 0:l.bg_music);if(!n)return;const s=jt();s.src=mt(n),s.loop=!0,s.volume=.45;let r=!1,a=!1;const o=()=>{a||r||(a=!0,s.play().then(()=>{if(r)try{s.pause(),s.src=""}catch{}}).catch(()=>{}),window.removeEventListener("pointerdown",o),window.removeEventListener("keydown",o))};return s.play().then(()=>{if(a=!0,r)try{s.pause(),s.src=""}catch{}}).catch(()=>{r||(window.addEventListener("pointerdown",o),window.addEventListener("keydown",o))}),()=>{r=!0,window.removeEventListener("pointerdown",o),window.removeEventListener("keydown",o);try{s.pause(),s.src=""}catch{}}},[(e=i==null?void 0:i.settings)==null?void 0:e.lobby_music,(t=i==null?void 0:i.settings)==null?void 0:t.bg_music]),null}const Zl="qp-fx-enabled",zd=4e3,Gd={classic:520,potter:700};function Hd(){try{const i=localStorage.getItem(Zl);return i===null?!0:i==="1"}catch{return!0}}function Vd(i){try{localStorage.setItem(Zl,i?"1":"0")}catch{}}function kd(){return typeof location<"u"&&location.href.includes("nofx=1")}function Wd({theme:i,trigger:e,hud:t}){const[n,s]=he.useState(Hd),r=he.useRef(null),a=he.useRef(0),[o,c]=he.useState(null);he.useEffect(()=>(document.documentElement.classList.toggle("fx-force-motion",n),()=>{document.documentElement.classList.remove("fx-force-motion")}),[n]),he.useEffect(()=>{const f=r.current===null;if(r.current=e,f||!n||i==="new_year"||kd())return;const u=Date.now();u-a.current<zd||(a.current=u,c(u))},[e]),he.useEffect(()=>{if(o===null)return;const f=(Gd[i]??300)+50,u=setTimeout(()=>c(null),f);return()=>clearTimeout(u)},[o,i]);const l=i==="classic"||i==="potter";return _.jsxs(_.Fragment,{children:[l&&_.jsx("button",{type:"button",className:"fx-toggle","aria-pressed":n,title:n?"Эффекты перехода включены — выключить":"Эффекты перехода выключены — включить",onClick:()=>s(f=>{const u=!f;return Vd(u),u}),children:"✨"}),o!==null&&i==="classic"&&_.jsx(qd,{},o),o!==null&&i==="potter"&&_.jsx(jd,{},o),i==="classic"&&t&&_.jsx(Xd,{label:t},t)]})}function Xd({label:i}){const[e,t]=he.useState(()=>90+Math.floor(Math.random()*10));return he.useEffect(()=>{const n=setInterval(()=>t(90+Math.floor(Math.random()*10)),1400);return()=>clearInterval(n)},[]),_.jsxs("div",{className:"fx-hud","aria-hidden":"true",children:["SYS://",i," · SIG ",e,"%"]})}function qd(){return _.jsxs("div",{className:"fx-flash fx-cyber","aria-hidden":"true",children:[_.jsx("span",{className:"fx-beam"}),_.jsx("span",{className:"fx-rgb"})]})}function jd(){const i=Array.from({length:22},(e,t)=>t);return _.jsx("div",{className:"fx-flash fx-potter","aria-hidden":"true",children:i.map(e=>_.jsx("span",{className:"fx-mote",style:{"--a":`${Math.round(e/i.length*360)}deg`,"--d":`${40+e%5*16}px`,animationDelay:`${e%4*.015}s`}},e))})}const Eo=["🥇","🥈","🥉"];function Gr({theme:i,place:e}){return i==="classic"?_.jsx(Yd,{place:e}):i==="potter"?_.jsx(Kd,{place:e}):i==="new_year"?_.jsx($d,{place:e}):_.jsx("span",{className:"award-emoji",children:Eo[e-1]??Eo[2]})}function Yd({place:i}){return _.jsxs("div",{className:`award-hex p${i}`,"aria-hidden":"true",children:[_.jsx("span",{className:"ah-orbit"}),_.jsx("span",{className:"ah-face",children:_.jsx("b",{children:i})})]})}function $d({place:i}){return _.jsxs("div",{className:`award-bauble p${i}`,"aria-hidden":"true",children:[_.jsx("span",{className:"ab-cap"}),_.jsxs("span",{className:"ab-ball",children:[_.jsx("span",{className:"ab-shine"}),_.jsx("b",{children:i})]})]})}function Kd({place:i}){return _.jsxs("div",{className:`award-merlin p${i}`,"aria-hidden":"true",children:[_.jsx("span",{className:"am-ribbon"}),_.jsxs("span",{className:"am-disc",children:[_.jsx("span",{className:"am-shine"}),_.jsx("b",{children:i})]})]})}function Zd(i){return[...i].sort((e,t)=>{const n=e.created_at?Date.parse(e.created_at):0,s=t.created_at?Date.parse(t.created_at):0;return n!==s?n-s:e.id<t.id?-1:e.id>t.id?1:0})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ua="185",Jd=0,bo=1,Qd=2,Ts=1,eu=2,zi=3,Dn=0,Ft=1,pn=2,_n=0,_i=1,Yn=2,To=3,wo=4,tu=5,Vn=100,nu=101,iu=102,su=103,ru=104,au=200,ou=201,lu=202,cu=203,Hr=204,Vr=205,du=206,uu=207,hu=208,fu=209,pu=210,mu=211,gu=212,_u=213,xu=214,kr=0,Wr=1,Xr=2,yi=3,qr=4,jr=5,Yr=6,$r=7,Jl=0,vu=1,Mu=2,rn=0,Ql=1,ec=2,tc=3,nc=4,ic=5,sc=6,rc=7,ac=300,$n=301,Ei=302,Zs=303,Js=304,Vs=306,Kr=1e3,mn=1001,Zr=1002,bt=1003,Su=1004,Zi=1005,Rt=1006,Qs=1007,Wn=1008,Gt=1009,oc=1010,lc=1011,Vi=1012,Fa=1013,on=1014,nn=1015,vn=1016,Oa=1017,Ba=1018,ki=1020,cc=35902,dc=35899,uc=1021,hc=1022,$t=1023,Mn=1026,Xn=1027,fc=1028,za=1029,Kn=1030,Ga=1031,Ha=1033,ws=33776,As=33777,Rs=33778,Cs=33779,Jr=35840,Qr=35841,ea=35842,ta=35843,na=36196,ia=37492,sa=37496,ra=37488,aa=37489,Is=37490,oa=37491,la=37808,ca=37809,da=37810,ua=37811,ha=37812,fa=37813,pa=37814,ma=37815,ga=37816,_a=37817,xa=37818,va=37819,Ma=37820,Sa=37821,ya=36492,Ea=36494,ba=36495,Ta=36283,wa=36284,Us=36285,Aa=36286,yu=3200,Ra=0,Eu=1,Pn="",kt="srgb",Fs="srgb-linear",Os="linear",Qe="srgb",ni=7680,Ao=519,bu=512,Tu=513,wu=514,Va=515,Au=516,Ru=517,ka=518,Cu=519,Ro=35044,Co="300 es",sn=2e3,Wi=2001;function Pu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Bs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Nu(){const i=Bs("canvas");return i.style.display="block",i}const Po={};function No(...i){const e="THREE."+i.shift();console.log(e,...i)}function pc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Fe(...i){i=pc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=pc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function xi(...i){const e=i.join(" ");e in Po||(Po[e]=!0,Fe(...i))}function Lu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Du={[kr]:Wr,[Xr]:Yr,[qr]:$r,[yi]:jr,[Wr]:kr,[Yr]:Xr,[$r]:qr,[jr]:yi};class Qn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],er=Math.PI/180,Ca=180/Math.PI;function ji(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function Iu(i,e){return(i%e+e)%e}function tr(i,e,t){return(1-t)*i+t*e}function Pi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const $a=class $a{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};$a.prototype.isVector2=!0;let $e=$a;class wi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],f=n[s+2],u=n[s+3],d=r[a+0],g=r[a+1],v=r[a+2],M=r[a+3];if(u!==M||c!==d||l!==g||f!==v){let m=c*d+l*g+f*v+u*M;m<0&&(d=-d,g=-g,v=-v,M=-M,m=-m);let h=1-o;if(m<.9995){const w=Math.acos(m),A=Math.sin(w);h=Math.sin(h*w)/A,o=Math.sin(o*w)/A,c=c*h+d*o,l=l*h+g*o,f=f*h+v*o,u=u*h+M*o}else{c=c*h+d*o,l=l*h+g*o,f=f*h+v*o,u=u*h+M*o;const w=1/Math.sqrt(c*c+l*l+f*f+u*u);c*=w,l*=w,f*=w,u*=w}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],f=n[s+3],u=r[a],d=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+f*u+c*g-l*d,e[t+1]=c*v+f*d+l*u-o*g,e[t+2]=l*v+f*g+o*d-c*u,e[t+3]=f*v-o*u-c*d-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),f=o(s/2),u=o(r/2),d=c(n/2),g=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=d*f*u+l*g*v,this._y=l*g*u-d*f*v,this._z=l*f*v+d*g*u,this._w=l*f*u-d*g*v;break;case"YXZ":this._x=d*f*u+l*g*v,this._y=l*g*u-d*f*v,this._z=l*f*v-d*g*u,this._w=l*f*u+d*g*v;break;case"ZXY":this._x=d*f*u-l*g*v,this._y=l*g*u+d*f*v,this._z=l*f*v+d*g*u,this._w=l*f*u-d*g*v;break;case"ZYX":this._x=d*f*u-l*g*v,this._y=l*g*u+d*f*v,this._z=l*f*v-d*g*u,this._w=l*f*u+d*g*v;break;case"YZX":this._x=d*f*u+l*g*v,this._y=l*g*u+d*f*v,this._z=l*f*v-d*g*u,this._w=l*f*u-d*g*v;break;case"XZY":this._x=d*f*u-l*g*v,this._y=l*g*u-d*f*v,this._z=l*f*v+d*g*u,this._w=l*f*u+d*g*v;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],f=t[6],u=t[10],d=n+o+u;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(f-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(n>o&&n>u){const g=2*Math.sqrt(1+n-o-u);this._w=(f-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>u){const g=2*Math.sqrt(1+o-n-u);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+f)/g}else{const g=2*Math.sqrt(1+u-n-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=n*f+a*o+s*l-r*c,this._y=s*f+a*c+r*o-n*l,this._z=r*f+a*l+n*c-s*o,this._w=a*f-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),f=Math.sin(l);c=Math.sin(c*l)/f,t=Math.sin(t*l)/f,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ka=class Ka{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),f=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*f,this.y=n+c*f+o*l-r*u,this.z=s+c*u+r*f-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nr.copy(this).projectOnVector(e),this.sub(nr)}reflect(e){return this.sub(nr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ka.prototype.isVector3=!0;let Y=Ka;const nr=new Y,Lo=new wi,Za=class Za{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const f=this.elements;return f[0]=e,f[1]=s,f[2]=o,f[3]=t,f[4]=r,f[5]=c,f[6]=n,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],f=n[4],u=n[7],d=n[2],g=n[5],v=n[8],M=s[0],m=s[3],h=s[6],w=s[1],A=s[4],E=s[7],T=s[2],y=s[5],P=s[8];return r[0]=a*M+o*w+c*T,r[3]=a*m+o*A+c*y,r[6]=a*h+o*E+c*P,r[1]=l*M+f*w+u*T,r[4]=l*m+f*A+u*y,r[7]=l*h+f*E+u*P,r[2]=d*M+g*w+v*T,r[5]=d*m+g*A+v*y,r[8]=d*h+g*E+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*o*l-n*r*f+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],u=f*a-o*l,d=o*c-f*r,g=l*r-a*c,v=t*u+n*d+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/v;return e[0]=u*M,e[1]=(s*l-f*n)*M,e[2]=(o*n-s*a)*M,e[3]=d*M,e[4]=(f*t-s*c)*M,e[5]=(s*r-o*t)*M,e[6]=g*M,e[7]=(n*c-l*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ir.makeScale(e,t)),this}rotate(e){return xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ir.makeRotation(-e)),this}translate(e,t){return xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ir.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Za.prototype.isMatrix3=!0;let Oe=Za;const ir=new Oe,Do=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Io=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uu(){const i={enabled:!0,workingColorSpace:Fs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=xn(s.r),s.g=xn(s.g),s.b=xn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Pn?Os:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Fs]:{primaries:e,whitePoint:n,transfer:Os,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:Qe,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),i}const je=Uu();function xn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ii;class Fu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ii===void 0&&(ii=Bs("canvas")),ii.width=e.width,ii.height=e.height;const s=ii.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ii}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Bs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=xn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xn(t[n]/255)*255):t[n]=xn(t[n]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ou=0;class Wa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sr(s[a].image)):r.push(sr(s[a]))}else r=sr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function sr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Bu=0;const rr=new Y;class Ct extends Qn{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=mn,s=mn,r=Rt,a=Wn,o=$t,c=Gt,l=Ct.DEFAULT_ANISOTROPY,f=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=ji(),this.name="",this.source=new Wa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rr).x}get height(){return this.source.getSize(rr).y}get depth(){return this.source.getSize(rr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ac)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Kr:e.x=e.x-Math.floor(e.x);break;case mn:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Kr:e.y=e.y-Math.floor(e.y);break;case mn:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=ac;Ct.DEFAULT_ANISOTROPY=1;const Ja=class Ja{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],f=c[4],u=c[8],d=c[1],g=c[5],v=c[9],M=c[2],m=c[6],h=c[10];if(Math.abs(f-d)<.01&&Math.abs(u-M)<.01&&Math.abs(v-m)<.01){if(Math.abs(f+d)<.1&&Math.abs(u+M)<.1&&Math.abs(v+m)<.1&&Math.abs(l+g+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,E=(g+1)/2,T=(h+1)/2,y=(f+d)/4,P=(u+M)/4,x=(v+m)/4;return A>E&&A>T?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=y/n,r=P/n):E>T?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=y/s,r=x/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=P/r,s=x/r),this.set(n,s,r,t),this}let w=Math.sqrt((m-v)*(m-v)+(u-M)*(u-M)+(d-f)*(d-f));return Math.abs(w)<.001&&(w=1),this.x=(m-v)/w,this.y=(u-M)/w,this.z=(d-f)/w,this.w=Math.acos((l+g+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ja.prototype.isVector4=!0;let dt=Ja;class zu extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Ct(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Wa(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class an extends zu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class mc extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gu extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Hs=class Hs{constructor(e,t,n,s,r,a,o,c,l,f,u,d,g,v,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,f,u,d,g,v,M,m)}set(e,t,n,s,r,a,o,c,l,f,u,d,g,v,M,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=f,h[10]=u,h[14]=d,h[3]=g,h[7]=v,h[11]=M,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Hs().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/si.setFromMatrixColumn(e,0).length(),r=1/si.setFromMatrixColumn(e,1).length(),a=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),f=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*f,g=a*u,v=o*f,M=o*u;t[0]=c*f,t[4]=-c*u,t[8]=l,t[1]=g+v*l,t[5]=d-M*l,t[9]=-o*c,t[2]=M-d*l,t[6]=v+g*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*f,g=c*u,v=l*f,M=l*u;t[0]=d+M*o,t[4]=v*o-g,t[8]=a*l,t[1]=a*u,t[5]=a*f,t[9]=-o,t[2]=g*o-v,t[6]=M+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*f,g=c*u,v=l*f,M=l*u;t[0]=d-M*o,t[4]=-a*u,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*f,t[9]=M-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*f,g=a*u,v=o*f,M=o*u;t[0]=c*f,t[4]=v*l-g,t[8]=d*l+M,t[1]=c*u,t[5]=M*l+d,t[9]=g*l-v,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,g=a*l,v=o*c,M=o*l;t[0]=c*f,t[4]=M-d*u,t[8]=v*u+g,t[1]=u,t[5]=a*f,t[9]=-o*f,t[2]=-l*f,t[6]=g*u+v,t[10]=d-M*u}else if(e.order==="XZY"){const d=a*c,g=a*l,v=o*c,M=o*l;t[0]=c*f,t[4]=-u,t[8]=l*f,t[1]=d*u+M,t[5]=a*f,t[9]=g*u-v,t[2]=v*u-g,t[6]=o*f,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hu,e,Vu)}lookAt(e,t,n){const s=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),bn.crossVectors(n,Bt),bn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),bn.crossVectors(n,Bt)),bn.normalize(),Ji.crossVectors(Bt,bn),s[0]=bn.x,s[4]=Ji.x,s[8]=Bt.x,s[1]=bn.y,s[5]=Ji.y,s[9]=Bt.y,s[2]=bn.z,s[6]=Ji.z,s[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],f=n[1],u=n[5],d=n[9],g=n[13],v=n[2],M=n[6],m=n[10],h=n[14],w=n[3],A=n[7],E=n[11],T=n[15],y=s[0],P=s[4],x=s[8],C=s[12],U=s[1],F=s[5],V=s[9],Z=s[13],z=s[2],I=s[6],j=s[10],k=s[14],Q=s[3],ce=s[7],fe=s[11],pe=s[15];return r[0]=a*y+o*U+c*z+l*Q,r[4]=a*P+o*F+c*I+l*ce,r[8]=a*x+o*V+c*j+l*fe,r[12]=a*C+o*Z+c*k+l*pe,r[1]=f*y+u*U+d*z+g*Q,r[5]=f*P+u*F+d*I+g*ce,r[9]=f*x+u*V+d*j+g*fe,r[13]=f*C+u*Z+d*k+g*pe,r[2]=v*y+M*U+m*z+h*Q,r[6]=v*P+M*F+m*I+h*ce,r[10]=v*x+M*V+m*j+h*fe,r[14]=v*C+M*Z+m*k+h*pe,r[3]=w*y+A*U+E*z+T*Q,r[7]=w*P+A*F+E*I+T*ce,r[11]=w*x+A*V+E*j+T*fe,r[15]=w*C+A*Z+E*k+T*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],f=e[2],u=e[6],d=e[10],g=e[14],v=e[3],M=e[7],m=e[11],h=e[15],w=c*g-l*d,A=o*g-l*u,E=o*d-c*u,T=a*g-l*f,y=a*d-c*f,P=a*u-o*f;return t*(M*w-m*A+h*E)-n*(v*w-m*T+h*y)+s*(v*A-M*T+h*P)-r*(v*E-M*y+m*P)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],f=e[10];return t*(a*f-o*l)-n*(r*f-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],u=e[9],d=e[10],g=e[11],v=e[12],M=e[13],m=e[14],h=e[15],w=t*o-n*a,A=t*c-s*a,E=t*l-r*a,T=n*c-s*o,y=n*l-r*o,P=s*l-r*c,x=f*M-u*v,C=f*m-d*v,U=f*h-g*v,F=u*m-d*M,V=u*h-g*M,Z=d*h-g*m,z=w*Z-A*V+E*F+T*U-y*C+P*x;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/z;return e[0]=(o*Z-c*V+l*F)*I,e[1]=(s*V-n*Z-r*F)*I,e[2]=(M*P-m*y+h*T)*I,e[3]=(d*y-u*P-g*T)*I,e[4]=(c*U-a*Z-l*C)*I,e[5]=(t*Z-s*U+r*C)*I,e[6]=(m*E-v*P-h*A)*I,e[7]=(f*P-d*E+g*A)*I,e[8]=(a*V-o*U+l*x)*I,e[9]=(n*U-t*V-r*x)*I,e[10]=(v*y-M*E+h*w)*I,e[11]=(u*E-f*y-g*w)*I,e[12]=(o*C-a*F-c*x)*I,e[13]=(t*F-n*C+s*x)*I,e[14]=(M*A-v*T-m*w)*I,e[15]=(f*T-u*A+d*w)*I,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,f=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,f*o+n,f*c-s*a,0,l*c-s*o,f*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,f=a+a,u=o+o,d=r*l,g=r*f,v=r*u,M=a*f,m=a*u,h=o*u,w=c*l,A=c*f,E=c*u,T=n.x,y=n.y,P=n.z;return s[0]=(1-(M+h))*T,s[1]=(g+E)*T,s[2]=(v-A)*T,s[3]=0,s[4]=(g-E)*y,s[5]=(1-(d+h))*y,s[6]=(m+w)*y,s[7]=0,s[8]=(v+A)*P,s[9]=(m-w)*P,s[10]=(1-(d+M))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=si.set(s[0],s[1],s[2]).length();const o=si.set(s[4],s[5],s[6]).length(),c=si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Wt.copy(this);const l=1/a,f=1/o,u=1/c;return Wt.elements[0]*=l,Wt.elements[1]*=l,Wt.elements[2]*=l,Wt.elements[4]*=f,Wt.elements[5]*=f,Wt.elements[6]*=f,Wt.elements[8]*=u,Wt.elements[9]*=u,Wt.elements[10]*=u,t.setFromRotationMatrix(Wt),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=sn,c=!1){const l=this.elements,f=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),g=(n+s)/(n-s);let v,M;if(c)v=r/(a-r),M=a*r/(a-r);else if(o===sn)v=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Wi)v=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=sn,c=!1){const l=this.elements,f=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),g=-(n+s)/(n-s);let v,M;if(c)v=1/(a-r),M=a/(a-r);else if(o===sn)v=-2/(a-r),M=-(a+r)/(a-r);else if(o===Wi)v=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=v,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Hs.prototype.isMatrix4=!0;let ut=Hs;const si=new Y,Wt=new ut,Hu=new Y(0,0,0),Vu=new Y(1,1,1),bn=new Y,Ji=new Y,Bt=new Y,Uo=new ut,Fo=new wi;class In{constructor(e=0,t=0,n=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],f=s[9],u=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-f,g),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Uo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fo.setFromEuler(this),this.setFromQuaternion(Fo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class gc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ku=0;const Oo=new Y,ri=new wi,cn=new ut,Qi=new Y,Ni=new Y,Wu=new Y,Xu=new wi,Bo=new Y(1,0,0),zo=new Y(0,1,0),Go=new Y(0,0,1),Ho={type:"added"},qu={type:"removed"},ai={type:"childadded",child:null},ar={type:"childremoved",child:null};class Lt extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new Y,t=new In,n=new wi,s=new Y(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new Oe}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.multiply(ri),this}rotateOnWorldAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.premultiply(ri),this}rotateX(e){return this.rotateOnAxis(Bo,e)}rotateY(e){return this.rotateOnAxis(zo,e)}rotateZ(e){return this.rotateOnAxis(Go,e)}translateOnAxis(e,t){return Oo.copy(e).applyQuaternion(this.quaternion),this.position.add(Oo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bo,e)}translateY(e){return this.translateOnAxis(zo,e)}translateZ(e){return this.translateOnAxis(Go,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qi.copy(e):Qi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(Ni,Qi,this.up):cn.lookAt(Qi,Ni,this.up),this.quaternion.setFromRotationMatrix(cn),s&&(cn.extractRotation(s.matrixWorld),ri.setFromRotationMatrix(cn),this.quaternion.premultiply(ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ho),ai.child=e,this.dispatchEvent(ai),ai.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qu),ar.child=e,this.dispatchEvent(ar),ar.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ho),ai.child=e,this.dispatchEvent(ai),ai.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,e,Wu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,Xu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),u=a(e.shapes),d=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new Y(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class qn extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ju={type:"move"};class or{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,n),h=this._getHandJoint(l,M);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const f=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=f.position.distanceTo(u.position),g=.02,v=.005;l.inputState.pinching&&d>g+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=g-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ju)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new qn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const _c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tn={h:0,s:0,l:0},es={h:0,s:0,l:0};function lr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=je.workingColorSpace){if(e=Iu(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=lr(a,r,e+1/3),this.g=lr(a,r,e),this.b=lr(a,r,e-1/3)}return je.colorSpaceToWorking(this,s),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const n=_c[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xn(e.r),this.g=xn(e.g),this.b=xn(e.b),this}copyLinearToSRGB(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return je.workingToColorSpace(At.copy(this),e),Math.round(Ye(At.r*255,0,255))*65536+Math.round(Ye(At.g*255,0,255))*256+Math.round(Ye(At.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(At.copy(this),t);const n=At.r,s=At.g,r=At.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=f<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=kt){je.workingToColorSpace(At.copy(this),e);const t=At.r,n=At.g,s=At.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Tn),this.setHSL(Tn.h+e,Tn.s+t,Tn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Tn),e.getHSL(es);const n=tr(Tn.h,es.h,t),s=tr(Tn.s,es.s,t),r=tr(Tn.l,es.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Xe;Xe.NAMES=_c;class ks{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=t}clone(){return new ks(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xc extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Xt=new Y,dn=new Y,cr=new Y,un=new Y,oi=new Y,li=new Y,Vo=new Y,dr=new Y,ur=new Y,hr=new Y,fr=new dt,pr=new dt,mr=new dt;class Yt{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xt.subVectors(e,t),s.cross(Xt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xt.subVectors(s,t),dn.subVectors(n,t),cr.subVectors(e,t);const a=Xt.dot(Xt),o=Xt.dot(dn),c=Xt.dot(cr),l=dn.dot(dn),f=dn.dot(cr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,g=(l*c-o*f)*d,v=(a*f-o*c)*d;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,un.x),c.addScaledVector(a,un.y),c.addScaledVector(o,un.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return fr.setScalar(0),pr.setScalar(0),mr.setScalar(0),fr.fromBufferAttribute(e,t),pr.fromBufferAttribute(e,n),mr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(fr,r.x),a.addScaledVector(pr,r.y),a.addScaledVector(mr,r.z),a}static isFrontFacing(e,t,n,s){return Xt.subVectors(n,t),dn.subVectors(e,t),Xt.cross(dn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),Xt.cross(dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;oi.subVectors(s,n),li.subVectors(r,n),dr.subVectors(e,n);const c=oi.dot(dr),l=li.dot(dr);if(c<=0&&l<=0)return t.copy(n);ur.subVectors(e,s);const f=oi.dot(ur),u=li.dot(ur);if(f>=0&&u<=f)return t.copy(s);const d=c*u-f*l;if(d<=0&&c>=0&&f<=0)return a=c/(c-f),t.copy(n).addScaledVector(oi,a);hr.subVectors(e,r);const g=oi.dot(hr),v=li.dot(hr);if(v>=0&&g<=v)return t.copy(r);const M=g*l-c*v;if(M<=0&&l>=0&&v<=0)return o=l/(l-v),t.copy(n).addScaledVector(li,o);const m=f*v-g*u;if(m<=0&&u-f>=0&&g-v>=0)return Vo.subVectors(r,s),o=(u-f)/(u-f+(g-v)),t.copy(s).addScaledVector(Vo,o);const h=1/(m+M+d);return a=M*h,o=d*h,t.copy(n).addScaledVector(oi,a).addScaledVector(li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Yi{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qt):qt.fromBufferAttribute(r,a),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Li),ns.subVectors(this.max,Li),ci.subVectors(e.a,Li),di.subVectors(e.b,Li),ui.subVectors(e.c,Li),wn.subVectors(di,ci),An.subVectors(ui,di),Fn.subVectors(ci,ui);let t=[0,-wn.z,wn.y,0,-An.z,An.y,0,-Fn.z,Fn.y,wn.z,0,-wn.x,An.z,0,-An.x,Fn.z,0,-Fn.x,-wn.y,wn.x,0,-An.y,An.x,0,-Fn.y,Fn.x,0];return!gr(t,ci,di,ui,ns)||(t=[1,0,0,0,1,0,0,0,1],!gr(t,ci,di,ui,ns))?!1:(is.crossVectors(wn,An),t=[is.x,is.y,is.z],gr(t,ci,di,ui,ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const hn=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],qt=new Y,ts=new Yi,ci=new Y,di=new Y,ui=new Y,wn=new Y,An=new Y,Fn=new Y,Li=new Y,ns=new Y,is=new Y,On=new Y;function gr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){On.fromArray(i,r);const o=s.x*Math.abs(On.x)+s.y*Math.abs(On.y)+s.z*Math.abs(On.z),c=e.dot(On),l=t.dot(On),f=n.dot(On);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const vt=new Y,ss=new $e;let Yu=0;class Dt extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ro,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ss.fromBufferAttribute(this,t),ss.applyMatrix3(e),this.setXY(t,ss.x,ss.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class vc extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Mc extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Et extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const $u=new Yi,Di=new Y,_r=new Y;class Ws{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$u.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Di.subVectors(e,this.center);const t=Di.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Di,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Di.copy(e.center).add(_r)),this.expandByPoint(Di.copy(e.center).sub(_r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Ku=0;const Vt=new ut,xr=new Lt,hi=new Y,zt=new Yi,Ii=new Yi,yt=new Y;class Pt extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pu(e)?Mc:vc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return xr.lookAt(e),xr.updateMatrix(),this.applyMatrix4(xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Et(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];zt.setFromBufferAttribute(r),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ii.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(zt.min,Ii.min),zt.expandByPoint(yt),yt.addVectors(zt.max,Ii.max),zt.expandByPoint(yt)):(zt.expandByPoint(Ii.min),zt.expandByPoint(Ii.max))}zt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(yt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)yt.fromBufferAttribute(o,l),c&&(hi.fromBufferAttribute(e,l),yt.add(hi)),s=Math.max(s,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new Y,c[x]=new Y;const l=new Y,f=new Y,u=new Y,d=new $e,g=new $e,v=new $e,M=new Y,m=new Y;function h(x,C,U){l.fromBufferAttribute(n,x),f.fromBufferAttribute(n,C),u.fromBufferAttribute(n,U),d.fromBufferAttribute(r,x),g.fromBufferAttribute(r,C),v.fromBufferAttribute(r,U),f.sub(l),u.sub(l),g.sub(d),v.sub(d);const F=1/(g.x*v.y-v.x*g.y);isFinite(F)&&(M.copy(f).multiplyScalar(v.y).addScaledVector(u,-g.y).multiplyScalar(F),m.copy(u).multiplyScalar(g.x).addScaledVector(f,-v.x).multiplyScalar(F),o[x].add(M),o[C].add(M),o[U].add(M),c[x].add(m),c[C].add(m),c[U].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let x=0,C=w.length;x<C;++x){const U=w[x],F=U.start,V=U.count;for(let Z=F,z=F+V;Z<z;Z+=3)h(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const A=new Y,E=new Y,T=new Y,y=new Y;function P(x){T.fromBufferAttribute(s,x),y.copy(T);const C=o[x];A.copy(C),A.sub(T.multiplyScalar(T.dot(C))).normalize(),E.crossVectors(y,C);const F=E.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,F)}for(let x=0,C=w.length;x<C;++x){const U=w[x],F=U.start,V=U.count;for(let Z=F,z=F+V;Z<z;Z+=3)P(e.getX(Z+0)),P(e.getX(Z+1)),P(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);const s=new Y,r=new Y,a=new Y,o=new Y,c=new Y,l=new Y,f=new Y,u=new Y;if(e)for(let d=0,g=e.count;d<g;d+=3){const v=e.getX(d+0),M=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),f.subVectors(a,r),u.subVectors(s,r),f.cross(u),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,m),o.add(f),c.add(f),l.add(f),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,r),u.subVectors(s,r),f.cross(u),n.setXYZ(d+0,f.x,f.y,f.z),n.setXYZ(d+1,f.x,f.y,f.z),n.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,u=o.normalized,d=new l.constructor(c.length*f);let g=0,v=0;for(let M=0,m=c.length;M<m;M++){o.isInterleavedBufferAttribute?g=c[M]*o.data.stride+o.offset:g=c[M]*f;for(let h=0;h<f;h++)d[v++]=l[g++]}return new Dt(d,f,u)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let f=0,u=l.length;f<u;f++){const d=l[f],g=e(d,n);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let u=0,d=l.length;u<d;u++){const g=l[u];f.push(g.toJSON(e.data))}f.length>0&&(s[c]=f,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const f=s[l];this.setAttribute(l,f.clone(t))}const r=e.morphAttributes;for(const l in r){const f=[],u=r[l];for(let d=0,g=u.length;d<g;d++)f.push(u[d].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,f=a.length;l<f;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Zu=0;class Ai extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=_i,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Vr,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ao,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_i&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hr&&(n.blendSrc=this.blendSrc),this.blendDst!==Vr&&(n.blendDst=this.blendDst),this.blendEquation!==Vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ao&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Xe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new $e().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const fn=new Y,vr=new Y,rs=new Y,Rn=new Y,Mr=new Y,as=new Y,Sr=new Y;class Sc{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){vr.copy(e).add(t).multiplyScalar(.5),rs.copy(t).sub(e).normalize(),Rn.copy(this.origin).sub(vr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(rs),o=Rn.dot(this.direction),c=-Rn.dot(rs),l=Rn.lengthSq(),f=Math.abs(1-a*a);let u,d,g,v;if(f>0)if(u=a*c-o,d=a*o-c,v=r*f,u>=0)if(d>=-v)if(d<=v){const M=1/f;u*=M,d*=M,g=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*c)+l;else d<=-v?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),g=-u*u+d*(d+2*c)+l):d<=v?(u=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),g=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(vr).addScaledVector(rs,d),g}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),s=fn.dot(fn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),f>=0?(r=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(r=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,s,r){Mr.subVectors(t,e),as.subVectors(n,e),Sr.crossVectors(Mr,as);let a=this.direction.dot(Sr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Rn.subVectors(this.origin,e);const c=o*this.direction.dot(as.crossVectors(Rn,as));if(c<0)return null;const l=o*this.direction.dot(Mr.cross(Rn));if(l<0||c+l>a)return null;const f=-o*Rn.dot(Sr);return f<0?null:this.at(f/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ln extends Ai{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ko=new ut,Bn=new Sc,os=new Ws,Wo=new Y,ls=new Y,cs=new Y,ds=new Y,yr=new Y,us=new Y,Xo=new Y,hs=new Y;class lt extends Lt{constructor(e=new Pt,t=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){us.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const f=o[c],u=r[c];f!==0&&(yr.fromBufferAttribute(u,e),a?us.addScaledVector(yr,f):us.addScaledVector(yr.sub(t),f))}t.add(us)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),os.copy(n.boundingSphere),os.applyMatrix4(r),Bn.copy(e.ray).recast(e.near),!(os.containsPoint(Bn.origin)===!1&&(Bn.intersectSphere(os,Wo)===null||Bn.origin.distanceToSquared(Wo)>(e.far-e.near)**2))&&(ko.copy(r).invert(),Bn.copy(e.ray).applyMatrix4(ko),!(n.boundingBox!==null&&Bn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,f=r.attributes.uv1,u=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,M=d.length;v<M;v++){const m=d[v],h=a[m.materialIndex],w=Math.max(m.start,g.start),A=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let E=w,T=A;E<T;E+=3){const y=o.getX(E),P=o.getX(E+1),x=o.getX(E+2);s=fs(this,h,e,n,l,f,u,y,P,x),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),M=Math.min(o.count,g.start+g.count);for(let m=v,h=M;m<h;m+=3){const w=o.getX(m),A=o.getX(m+1),E=o.getX(m+2);s=fs(this,a,e,n,l,f,u,w,A,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,M=d.length;v<M;v++){const m=d[v],h=a[m.materialIndex],w=Math.max(m.start,g.start),A=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let E=w,T=A;E<T;E+=3){const y=E,P=E+1,x=E+2;s=fs(this,h,e,n,l,f,u,y,P,x),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),M=Math.min(c.count,g.start+g.count);for(let m=v,h=M;m<h;m+=3){const w=m,A=m+1,E=m+2;s=fs(this,a,e,n,l,f,u,w,A,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Ju(i,e,t,n,s,r,a,o){let c;if(e.side===Ft?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Dn,o),c===null)return null;hs.copy(o),hs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(hs);return l<t.near||l>t.far?null:{distance:l,point:hs.clone(),object:i}}function fs(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ls),i.getVertexPosition(c,cs),i.getVertexPosition(l,ds);const f=Ju(i,e,t,n,ls,cs,ds,Xo);if(f){const u=new Y;Yt.getBarycoord(Xo,ls,cs,ds,u),s&&(f.uv=Yt.getInterpolatedAttribute(s,o,c,l,u,new $e)),r&&(f.uv1=Yt.getInterpolatedAttribute(r,o,c,l,u,new $e)),a&&(f.normal=Yt.getInterpolatedAttribute(a,o,c,l,u,new Y),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new Y,materialIndex:0};Yt.getNormal(ls,cs,ds,d.normal),f.face=d,f.barycoord=u}return f}class Qu extends Ct{constructor(e=null,t=1,n=1,s,r,a,o,c,l=bt,f=bt,u,d){super(null,a,o,c,l,f,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Er=new Y,eh=new Y,th=new Oe;class Hn{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Er.subVectors(n,t).cross(eh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Er),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||th.getNormalMatrix(e),s=this.coplanarPoint(Er).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zn=new Ws,nh=new $e(.5,.5),ps=new Y;class Xa{constructor(e=new Hn,t=new Hn,n=new Hn,s=new Hn,r=new Hn,a=new Hn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=sn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],f=r[4],u=r[5],d=r[6],g=r[7],v=r[8],M=r[9],m=r[10],h=r[11],w=r[12],A=r[13],E=r[14],T=r[15];if(s[0].setComponents(l-a,g-f,h-v,T-w).normalize(),s[1].setComponents(l+a,g+f,h+v,T+w).normalize(),s[2].setComponents(l+o,g+u,h+M,T+A).normalize(),s[3].setComponents(l-o,g-u,h-M,T-A).normalize(),n)s[4].setComponents(c,d,m,E).normalize(),s[5].setComponents(l-c,g-d,h-m,T-E).normalize();else if(s[4].setComponents(l-c,g-d,h-m,T-E).normalize(),t===sn)s[5].setComponents(l+c,g+d,h+m,T+E).normalize();else if(t===Wi)s[5].setComponents(c,d,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zn)}intersectsSprite(e){zn.center.set(0,0,0);const t=nh.distanceTo(e.center);return zn.radius=.7071067811865476+t,zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(zn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ps.x=s.normal.x>0?e.max.x:e.min.x,ps.y=s.normal.y>0?e.max.y:e.min.y,ps.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xs extends Ai{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const qo=new ut,Pa=new Sc,ms=new Ws,gs=new Y;class qa extends Lt{constructor(e=new Pt,t=new Xs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(s),ms.radius+=r,e.ray.intersectsSphere(ms)===!1)return;qo.copy(s).invert(),Pa.copy(e.ray).applyMatrix4(qo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let v=d,M=g;v<M;v++){const m=l.getX(v);gs.fromBufferAttribute(u,m),jo(gs,m,c,s,e,t,this)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=d,M=g;v<M;v++)gs.fromBufferAttribute(u,v),jo(gs,v,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jo(i,e,t,n,s,r,a){const o=Pa.distanceSqToPoint(i);if(o<t){const c=new Y;Pa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class yc extends Ct{constructor(e=[],t=$n,n,s,r,a,o,c,l,f){super(e,t,n,s,r,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ec extends Ct{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bi extends Ct{constructor(e,t,n=on,s,r,a,o=bt,c=bt,l,f=Mn,u=1){if(f!==Mn&&f!==Xn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ih extends bi{constructor(e,t=on,n=$n,s,r,a=bt,o=bt,c,l=Mn){const f={width:e,height:e,depth:1},u=[f,f,f,f,f,f];super(e,e,t,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class bc extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zn extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],f=[],u=[];let d=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(f,3)),this.setAttribute("uv",new Et(u,2));function v(M,m,h,w,A,E,T,y,P,x,C){const U=E/P,F=T/x,V=E/2,Z=T/2,z=y/2,I=P+1,j=x+1;let k=0,Q=0;const ce=new Y;for(let fe=0;fe<j;fe++){const pe=fe*F-Z;for(let be=0;be<I;be++){const qe=be*U-V;ce[M]=qe*w,ce[m]=pe*A,ce[h]=z,l.push(ce.x,ce.y,ce.z),ce[M]=0,ce[m]=0,ce[h]=y>0?1:-1,f.push(ce.x,ce.y,ce.z),u.push(be/P),u.push(1-fe/x),k+=1}}for(let fe=0;fe<x;fe++)for(let pe=0;pe<P;pe++){const be=d+pe+I*fe,qe=d+pe+I*(fe+1),we=d+(pe+1)+I*(fe+1),He=d+(pe+1)+I*fe;c.push(be,qe,He),c.push(qe,we,He),Q+=6}o.addGroup(g,Q,C),g+=Q,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Mi extends Pt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const f=[],u=[],d=[],g=[];let v=0;const M=[],m=n/2;let h=0;w(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(f),this.setAttribute("position",new Et(u,3)),this.setAttribute("normal",new Et(d,3)),this.setAttribute("uv",new Et(g,2));function w(){const E=new Y,T=new Y;let y=0;const P=(t-e)/n;for(let x=0;x<=r;x++){const C=[],U=x/r,F=U*(t-e)+e;for(let V=0;V<=s;V++){const Z=V/s,z=Z*c+o,I=Math.sin(z),j=Math.cos(z);T.x=F*I,T.y=-U*n+m,T.z=F*j,u.push(T.x,T.y,T.z),E.set(I,P,j).normalize(),d.push(E.x,E.y,E.z),g.push(Z,1-U),C.push(v++)}M.push(C)}for(let x=0;x<s;x++)for(let C=0;C<r;C++){const U=M[C][x],F=M[C+1][x],V=M[C+1][x+1],Z=M[C][x+1];(e>0||C!==0)&&(f.push(U,F,Z),y+=3),(t>0||C!==r-1)&&(f.push(F,V,Z),y+=3)}l.addGroup(h,y,0),h+=y}function A(E){const T=v,y=new $e,P=new Y;let x=0;const C=E===!0?e:t,U=E===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*U,0),d.push(0,U,0),g.push(.5,.5),v++;const F=v;for(let V=0;V<=s;V++){const z=V/s*c+o,I=Math.cos(z),j=Math.sin(z);P.x=C*j,P.y=m*U,P.z=C*I,u.push(P.x,P.y,P.z),d.push(0,U,0),y.x=I*.5+.5,y.y=j*.5*U+.5,g.push(y.x,y.y),v++}for(let V=0;V<s;V++){const Z=T+V,z=F+V;E===!0?f.push(z,z+1,Z):f.push(z+1,z,Z),x+=3}l.addGroup(h,x,E===!0?1:2),h+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ja extends Mi{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ja(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ri extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,f=c+1,u=e/o,d=t/c,g=[],v=[],M=[],m=[];for(let h=0;h<f;h++){const w=h*d-a;for(let A=0;A<l;A++){const E=A*u-r;v.push(E,-w,0),M.push(0,0,1),m.push(A/o),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let w=0;w<o;w++){const A=w+l*h,E=w+l*(h+1),T=w+1+l*(h+1),y=w+1+l*h;g.push(A,E,y),g.push(E,T,y)}this.setIndex(g),this.setAttribute("position",new Et(v,3)),this.setAttribute("normal",new Et(M,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.width,e.height,e.widthSegments,e.heightSegments)}}class zs extends Pt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const f=[],u=new Y,d=new Y,g=[],v=[],M=[],m=[];for(let h=0;h<=n;h++){const w=[],A=h/n,E=a+A*o,T=e*Math.cos(E),y=Math.sqrt(e*e-T*T);let P=0;h===0&&a===0?P=.5/t:h===n&&c===Math.PI&&(P=-.5/t);for(let x=0;x<=t;x++){const C=x/t,U=s+C*r;u.x=-y*Math.cos(U),u.y=T,u.z=y*Math.sin(U),v.push(u.x,u.y,u.z),d.copy(u).normalize(),M.push(d.x,d.y,d.z),m.push(C+P,1-A),w.push(l++)}f.push(w)}for(let h=0;h<n;h++)for(let w=0;w<t;w++){const A=f[h][w+1],E=f[h][w],T=f[h+1][w],y=f[h+1][w+1];(h!==0||a>0)&&g.push(A,E,y),(h!==n-1||c<Math.PI)&&g.push(E,T,y)}this.setIndex(g),this.setAttribute("position",new Et(v,3)),this.setAttribute("normal",new Et(M,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ya extends Pt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],f=[],u=[],d=new Y,g=new Y,v=new Y;for(let M=0;M<=n;M++){const m=a+M/n*o;for(let h=0;h<=s;h++){const w=h/s*r;g.x=(e+t*Math.cos(m))*Math.cos(w),g.y=(e+t*Math.cos(m))*Math.sin(w),g.z=t*Math.sin(m),l.push(g.x,g.y,g.z),d.x=e*Math.cos(w),d.y=e*Math.sin(w),v.subVectors(g,d).normalize(),f.push(v.x,v.y,v.z),u.push(h/s),u.push(M/n)}}for(let M=1;M<=n;M++)for(let m=1;m<=s;m++){const h=(s+1)*M+m-1,w=(s+1)*(M-1)+m-1,A=(s+1)*(M-1)+m,E=(s+1)*M+m;c.push(h,w,E),c.push(w,A,E)}this.setIndex(c),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(f,3)),this.setAttribute("uv",new Et(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ya(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Ti(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Yo(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Yo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Ti(i[t]);for(const s in n)e[s]=n[s]}return e}function Yo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function sh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Tc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const rh={clone:Ti,merge:Nt};var ah=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ln extends Ai{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ah,this.fragmentShader=oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ti(e.uniforms),this.uniformsGroups=sh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Xe().setHex(s.value);break;case"v2":this.uniforms[n].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[n].value=new Y().fromArray(s.value);break;case"v4":this.uniforms[n].value=new dt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ut().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class lh extends ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gn extends Ai{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ra,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ch extends Ai{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dh extends Ai{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class wc extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const br=new ut,$o=new Y,Ko=new Y;class uh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=Gt,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xa,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;$o.setFromMatrixPosition(e.matrixWorld),t.position.copy($o),Ko.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ko),t.updateMatrixWorld(),br.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(br,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Wi||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(br)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const _s=new Y,xs=new wi,Qt=new Y;class Ac extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_s,xs,Qt),Qt.x===1&&Qt.y===1&&Qt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,xs,Qt.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_s,xs,Qt),Qt.x===1&&Qt.y===1&&Qt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,xs,Qt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new Y,Zo=new $e,Jo=new $e;class Ut extends Ac{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ca*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ca*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cn.x,Cn.y).multiplyScalar(-e/Cn.z)}getViewSize(e,t){return this.getViewBounds(e,Zo,Jo),t.subVectors(Jo,Zo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(er*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class hh extends uh{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0}}class jn extends wc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new hh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Rc extends Ac{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cc extends wc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const fi=-90,pi=1;class fh extends Lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ut(fi,pi,e,t);s.layers=this.layers,this.add(s);const r=new Ut(fi,pi,e,t);r.layers=this.layers,this.add(r);const a=new Ut(fi,pi,e,t);a.layers=this.layers,this.add(a);const o=new Ut(fi,pi,e,t);o.layers=this.layers,this.add(o);const c=new Ut(fi,pi,e,t);c.layers=this.layers,this.add(c);const l=new Ut(fi,pi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Wi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,f]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(u,d,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class ph extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Qa=class Qa{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Qa.prototype.isMatrix2=!0;let Qo=Qa;function el(i,e,t,n){const s=mh(n);switch(t){case uc:return i*e;case fc:return i*e/s.components*s.byteLength;case za:return i*e/s.components*s.byteLength;case Kn:return i*e*2/s.components*s.byteLength;case Ga:return i*e*2/s.components*s.byteLength;case hc:return i*e*3/s.components*s.byteLength;case $t:return i*e*4/s.components*s.byteLength;case Ha:return i*e*4/s.components*s.byteLength;case ws:case As:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rs:case Cs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qr:case ta:return Math.max(i,16)*Math.max(e,8)/4;case Jr:case ea:return Math.max(i,8)*Math.max(e,8)/2;case na:case ia:case ra:case aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sa:case Is:case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ca:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case da:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ha:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case fa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case pa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ma:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case xa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case va:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ma:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ya:case Ea:case ba:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ta:case wa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Us:case Aa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mh(i){switch(i){case Gt:case oc:return{byteLength:1,components:1};case Vi:case lc:case vn:return{byteLength:2,components:1};case Oa:case Ba:return{byteLength:2,components:4};case on:case Fa:case nn:return{byteLength:4,components:1};case cc:case dc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ua}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ua);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Pc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function gh(i){const e=new WeakMap;function t(o,c){const l=o.array,f=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,f),o.onUploadCallback();let g;if(l instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=i.SHORT;else if(l instanceof Uint32Array)g=i.UNSIGNED_INT;else if(l instanceof Int32Array)g=i.INT;else if(l instanceof Int8Array)g=i.BYTE;else if(l instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const f=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,f);else{u.sort((g,v)=>g.start-v.start);let d=0;for(let g=1;g<u.length;g++){const v=u[d],M=u[g];M.start<=v.start+v.count+1?v.count=Math.max(v.count,M.start+M.count-v.start):(++d,u[d]=M)}u.length=d+1;for(let g=0,v=u.length;g<v;g++){const M=u[g];i.bufferSubData(l,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var _h=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xh=`#ifdef USE_ALPHAHASH
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
#endif`,vh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eh=`#ifdef USE_AOMAP
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
#endif`,bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Th=`#ifdef USE_BATCHING
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
#endif`,wh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ah=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ch=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ph=`#ifdef USE_IRIDESCENCE
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
#endif`,Nh=`#ifdef USE_BUMPMAP
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
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Oh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gh=`#define PI 3.141592653589793
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
} // validated`,Hh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vh=`vec3 transformedNormal = objectNormal;
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
#endif`,kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$h=`#ifdef USE_ENVMAP
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
#endif`,Kh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zh=`#ifdef USE_ENVMAP
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
#endif`,Jh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qh=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rf=`#ifdef USE_GRADIENTMAP
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
}`,af=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,of=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,df=`#ifdef USE_ENVMAP
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
#endif`,uf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ff=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mf=`PhysicalMaterial material;
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
#endif`,gf=`uniform sampler2D dfgLUT;
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
}`,_f=`
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
#endif`,xf=`#if defined( RE_IndirectDiffuse )
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
#endif`,vf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rf=`#if defined( USE_POINTS_UV )
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
#endif`,Cf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Df=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,If=`#ifdef USE_MORPHTARGETS
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
#endif`,Uf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Of=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Hf=`#ifdef USE_NORMALMAP
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
#endif`,Vf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$f=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ip=`float getShadowMask() {
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
}`,sp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rp=`#ifdef USE_SKINNING
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
#endif`,ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,op=`#ifdef USE_SKINNING
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
#endif`,lp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,up=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hp=`#ifdef USE_TRANSMISSION
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
#endif`,fp=`#ifdef USE_TRANSMISSION
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
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vp=`uniform sampler2D t2D;
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
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`#include <common>
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
}`,Tp=`#if DEPTH_PACKING == 3200
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
}`,wp=`#define DISTANCE
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
}`,Ap=`#define DISTANCE
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
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`uniform float scale;
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
}`,Np=`uniform vec3 diffuse;
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
}`,Lp=`#include <common>
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Ip=`#define LAMBERT
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
}`,Up=`#define LAMBERT
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
}`,Fp=`#define MATCAP
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
}`,Op=`#define MATCAP
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
}`,Bp=`#define NORMAL
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
}`,zp=`#define NORMAL
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
}`,Gp=`#define PHONG
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
}`,Hp=`#define PHONG
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
}`,Vp=`#define STANDARD
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
}`,kp=`#define STANDARD
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
}`,Wp=`#define TOON
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
}`,Xp=`#define TOON
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
}`,qp=`uniform float size;
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
}`,jp=`uniform vec3 diffuse;
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
}`,Yp=`#include <common>
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
}`,$p=`uniform vec3 color;
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
}`,Kp=`uniform float rotation;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:_h,alphahash_pars_fragment:xh,alphamap_fragment:vh,alphamap_pars_fragment:Mh,alphatest_fragment:Sh,alphatest_pars_fragment:yh,aomap_fragment:Eh,aomap_pars_fragment:bh,batching_pars_vertex:Th,batching_vertex:wh,begin_vertex:Ah,beginnormal_vertex:Rh,bsdfs:Ch,iridescence_fragment:Ph,bumpmap_pars_fragment:Nh,clipping_planes_fragment:Lh,clipping_planes_pars_fragment:Dh,clipping_planes_pars_vertex:Ih,clipping_planes_vertex:Uh,color_fragment:Fh,color_pars_fragment:Oh,color_pars_vertex:Bh,color_vertex:zh,common:Gh,cube_uv_reflection_fragment:Hh,defaultnormal_vertex:Vh,displacementmap_pars_vertex:kh,displacementmap_vertex:Wh,emissivemap_fragment:Xh,emissivemap_pars_fragment:qh,colorspace_fragment:jh,colorspace_pars_fragment:Yh,envmap_fragment:$h,envmap_common_pars_fragment:Kh,envmap_pars_fragment:Zh,envmap_pars_vertex:Jh,envmap_physical_pars_fragment:df,envmap_vertex:Qh,fog_vertex:ef,fog_pars_vertex:tf,fog_fragment:nf,fog_pars_fragment:sf,gradientmap_pars_fragment:rf,lightmap_pars_fragment:af,lights_lambert_fragment:of,lights_lambert_pars_fragment:lf,lights_pars_begin:cf,lights_toon_fragment:uf,lights_toon_pars_fragment:hf,lights_phong_fragment:ff,lights_phong_pars_fragment:pf,lights_physical_fragment:mf,lights_physical_pars_fragment:gf,lights_fragment_begin:_f,lights_fragment_maps:xf,lights_fragment_end:vf,lightprobes_pars_fragment:Mf,logdepthbuf_fragment:Sf,logdepthbuf_pars_fragment:yf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:bf,map_fragment:Tf,map_pars_fragment:wf,map_particle_fragment:Af,map_particle_pars_fragment:Rf,metalnessmap_fragment:Cf,metalnessmap_pars_fragment:Pf,morphinstance_vertex:Nf,morphcolor_vertex:Lf,morphnormal_vertex:Df,morphtarget_pars_vertex:If,morphtarget_vertex:Uf,normal_fragment_begin:Ff,normal_fragment_maps:Of,normal_pars_fragment:Bf,normal_pars_vertex:zf,normal_vertex:Gf,normalmap_pars_fragment:Hf,clearcoat_normal_fragment_begin:Vf,clearcoat_normal_fragment_maps:kf,clearcoat_pars_fragment:Wf,iridescence_pars_fragment:Xf,opaque_fragment:qf,packing:jf,premultiplied_alpha_fragment:Yf,project_vertex:$f,dithering_fragment:Kf,dithering_pars_fragment:Zf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:Qf,shadowmap_pars_fragment:ep,shadowmap_pars_vertex:tp,shadowmap_vertex:np,shadowmask_pars_fragment:ip,skinbase_vertex:sp,skinning_pars_vertex:rp,skinning_vertex:ap,skinnormal_vertex:op,specularmap_fragment:lp,specularmap_pars_fragment:cp,tonemapping_fragment:dp,tonemapping_pars_fragment:up,transmission_fragment:hp,transmission_pars_fragment:fp,uv_pars_fragment:pp,uv_pars_vertex:mp,uv_vertex:gp,worldpos_vertex:_p,background_vert:xp,background_frag:vp,backgroundCube_vert:Mp,backgroundCube_frag:Sp,cube_vert:yp,cube_frag:Ep,depth_vert:bp,depth_frag:Tp,distance_vert:wp,distance_frag:Ap,equirect_vert:Rp,equirect_frag:Cp,linedashed_vert:Pp,linedashed_frag:Np,meshbasic_vert:Lp,meshbasic_frag:Dp,meshlambert_vert:Ip,meshlambert_frag:Up,meshmatcap_vert:Fp,meshmatcap_frag:Op,meshnormal_vert:Bp,meshnormal_frag:zp,meshphong_vert:Gp,meshphong_frag:Hp,meshphysical_vert:Vp,meshphysical_frag:kp,meshtoon_vert:Wp,meshtoon_frag:Xp,points_vert:qp,points_frag:jp,shadow_vert:Yp,shadow_frag:$p,sprite_vert:Kp,sprite_frag:Zp},xe={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},tn={basic:{uniforms:Nt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Nt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Nt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Nt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Nt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Nt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Nt([xe.points,xe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Nt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Nt([xe.common,xe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Nt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Nt([xe.sprite,xe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Nt([xe.common,xe.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Nt([xe.lights,xe.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};tn.physical={uniforms:Nt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const vs={r:0,b:0,g:0},Jp=new ut,Nc=new Oe;Nc.set(-1,0,0,0,1,0,0,0,1);function Qp(i,e,t,n,s,r){const a=new Xe(0);let o=s===!0?0:1,c,l,f=null,u=0,d=null;function g(w){let A=w.isScene===!0?w.background:null;if(A&&A.isTexture){const E=w.backgroundBlurriness>0;A=e.get(A,E)}return A}function v(w){let A=!1;const E=g(w);E===null?m(a,o):E&&E.isColor&&(m(E,1),A=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(w,A){const E=g(A);E&&(E.isCubeTexture||E.mapping===Vs)?(l===void 0&&(l=new lt(new Zn(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:Ti(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,y,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(A.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Nc),l.material.toneMapped=je.getTransfer(E.colorSpace)!==Qe,(f!==E||u!==E.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=E,u=E.version,d=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new lt(new Ri(2,2),new ln({name:"BackgroundMaterial",uniforms:Ti(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=je.getTransfer(E.colorSpace)!==Qe,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||u!==E.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=E,u=E.version,d=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function m(w,A){w.getRGB(vs,Tc(i)),t.buffers.color.setClear(vs.r,vs.g,vs.b,A,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,A=1){a.set(w),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:v,addToRenderList:M,dispose:h}}function em(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(F,V,Z,z,I){let j=!1;const k=u(F,z,Z,V);r!==k&&(r=k,l(r.object)),j=g(F,z,Z,I),j&&v(F,z,Z,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,E(F,V,Z,z),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function c(){return i.createVertexArray()}function l(F){return i.bindVertexArray(F)}function f(F){return i.deleteVertexArray(F)}function u(F,V,Z,z){const I=z.wireframe===!0;let j=n[V.id];j===void 0&&(j={},n[V.id]=j);const k=F.isInstancedMesh===!0?F.id:0;let Q=j[k];Q===void 0&&(Q={},j[k]=Q);let ce=Q[Z.id];ce===void 0&&(ce={},Q[Z.id]=ce);let fe=ce[I];return fe===void 0&&(fe=d(c()),ce[I]=fe),fe}function d(F){const V=[],Z=[],z=[];for(let I=0;I<t;I++)V[I]=0,Z[I]=0,z[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:Z,attributeDivisors:z,object:F,attributes:{},index:null}}function g(F,V,Z,z){const I=r.attributes,j=V.attributes;let k=0;const Q=Z.getAttributes();for(const ce in Q)if(Q[ce].location>=0){const pe=I[ce];let be=j[ce];if(be===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(be=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(be=F.instanceColor)),pe===void 0||pe.attribute!==be||be&&pe.data!==be.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function v(F,V,Z,z){const I={},j=V.attributes;let k=0;const Q=Z.getAttributes();for(const ce in Q)if(Q[ce].location>=0){let pe=j[ce];pe===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(pe=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(pe=F.instanceColor));const be={};be.attribute=pe,pe&&pe.data&&(be.data=pe.data),I[ce]=be,k++}r.attributes=I,r.attributesNum=k,r.index=z}function M(){const F=r.newAttributes;for(let V=0,Z=F.length;V<Z;V++)F[V]=0}function m(F){h(F,0)}function h(F,V){const Z=r.newAttributes,z=r.enabledAttributes,I=r.attributeDivisors;Z[F]=1,z[F]===0&&(i.enableVertexAttribArray(F),z[F]=1),I[F]!==V&&(i.vertexAttribDivisor(F,V),I[F]=V)}function w(){const F=r.newAttributes,V=r.enabledAttributes;for(let Z=0,z=V.length;Z<z;Z++)V[Z]!==F[Z]&&(i.disableVertexAttribArray(Z),V[Z]=0)}function A(F,V,Z,z,I,j,k){k===!0?i.vertexAttribIPointer(F,V,Z,I,j):i.vertexAttribPointer(F,V,Z,z,I,j)}function E(F,V,Z,z){M();const I=z.attributes,j=Z.getAttributes(),k=V.defaultAttributeValues;for(const Q in j){const ce=j[Q];if(ce.location>=0){let fe=I[Q];if(fe===void 0&&(Q==="instanceMatrix"&&F.instanceMatrix&&(fe=F.instanceMatrix),Q==="instanceColor"&&F.instanceColor&&(fe=F.instanceColor)),fe!==void 0){const pe=fe.normalized,be=fe.itemSize,qe=e.get(fe);if(qe===void 0)continue;const we=qe.buffer,He=qe.type,ae=qe.bytesPerElement,ue=He===i.INT||He===i.UNSIGNED_INT||fe.gpuType===Fa;if(fe.isInterleavedBufferAttribute){const re=fe.data,Ie=re.stride,Ue=fe.offset;if(re.isInstancedInterleavedBuffer){for(let De=0;De<ce.locationSize;De++)h(ce.location+De,re.meshPerAttribute);F.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let De=0;De<ce.locationSize;De++)m(ce.location+De);i.bindBuffer(i.ARRAY_BUFFER,we);for(let De=0;De<ce.locationSize;De++)A(ce.location+De,be/ce.locationSize,He,pe,Ie*ae,(Ue+be/ce.locationSize*De)*ae,ue)}else{if(fe.isInstancedBufferAttribute){for(let re=0;re<ce.locationSize;re++)h(ce.location+re,fe.meshPerAttribute);F.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let re=0;re<ce.locationSize;re++)m(ce.location+re);i.bindBuffer(i.ARRAY_BUFFER,we);for(let re=0;re<ce.locationSize;re++)A(ce.location+re,be/ce.locationSize,He,pe,be*ae,be/ce.locationSize*re*ae,ue)}}else if(k!==void 0){const pe=k[Q];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv(ce.location,pe);break;case 3:i.vertexAttrib3fv(ce.location,pe);break;case 4:i.vertexAttrib4fv(ce.location,pe);break;default:i.vertexAttrib1fv(ce.location,pe)}}}}w()}function T(){C();for(const F in n){const V=n[F];for(const Z in V){const z=V[Z];for(const I in z){const j=z[I];for(const k in j)f(j[k].object),delete j[k];delete z[I]}}delete n[F]}}function y(F){if(n[F.id]===void 0)return;const V=n[F.id];for(const Z in V){const z=V[Z];for(const I in z){const j=z[I];for(const k in j)f(j[k].object),delete j[k];delete z[I]}}delete n[F.id]}function P(F){for(const V in n){const Z=n[V];for(const z in Z){const I=Z[z];if(I[F.id]===void 0)continue;const j=I[F.id];for(const k in j)f(j[k].object),delete j[k];delete I[F.id]}}}function x(F){for(const V in n){const Z=n[V],z=F.isInstancedMesh===!0?F.id:0,I=Z[z];if(I!==void 0){for(const j in I){const k=I[j];for(const Q in k)f(k[Q].object),delete k[Q];delete I[j]}delete Z[z],Object.keys(Z).length===0&&delete n[V]}}}function C(){U(),a=!0,r!==s&&(r=s,l(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:U,dispose:T,releaseStatesOfGeometry:y,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:m,disableUnusedAttributes:w}}function tm(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),t.update(l,n,f))}function o(c,l,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let d=0;for(let g=0;g<f;g++)d+=l[g];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function nm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==$t&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const x=P===vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Gt&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==nn&&!x)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const f=c(l);f!==l&&(Fe("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:v,maxTextureSize:M,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:w,maxVaryings:A,maxFragmentUniforms:E,maxSamples:T,samples:y}}function im(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Hn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const g=u.length!==0||d||n!==0||s;return s=d,n=u.length,g},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=f(u,d,0)},this.setState=function(u,d,g){const v=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,h=i.get(u);if(!s||v===null||v.length===0||r&&!m)r?f(null):l();else{const w=r?0:n,A=w*4;let E=h.clippingState||null;c.value=E,E=f(v,d,A,g);for(let T=0;T!==A;++T)E[T]=t[T];h.clippingState=E,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(u,d,g,v){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=c.value,v!==!0||m===null){const h=g+M*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<h)&&(m=new Float32Array(h));for(let A=0,E=g;A!==M;++A,E+=4)a.copy(u[A]).applyMatrix4(w,o),a.normal.toArray(m,E),m[E+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const Nn=4,tl=[.125,.215,.35,.446,.526,.582],kn=20,sm=256,Ui=new Rc,nl=new Xe;let Tr=null,wr=0,Ar=0,Rr=!1;const rm=new Y;class il{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=rm}=r;Tr=this._renderer.getRenderTarget(),wr=this._renderer.getActiveCubeFace(),Ar=this._renderer.getActiveMipmapLevel(),Rr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Tr,wr,Ar),this._renderer.xr.enabled=Rr,e.scissorTest=!1,mi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$n||e.mapping===Ei?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tr=this._renderer.getRenderTarget(),wr=this._renderer.getActiveCubeFace(),Ar=this._renderer.getActiveMipmapLevel(),Rr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:vn,format:$t,colorSpace:Fs,depthBuffer:!1},s=sl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sl(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=am(r)),this._blurMaterial=lm(r,e,t),this._ggxMaterial=om(r,e,t)}return s}_compileMaterial(e){const t=new lt(new Pt,e);this._renderer.compile(t,Ui)}_sceneToCubeUV(e,t,n,s,r){const c=new Ut(90,1,t,n),l=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,g=u.toneMapping;u.getClearColor(nl),u.toneMapping=rn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new Zn,new Ln({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let h=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,h=!0):(m.color.copy(nl),h=!0);for(let A=0;A<6;A++){const E=A%3;E===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+f[A],r.y,r.z)):E===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+f[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+f[A]));const T=this._cubeSize;mi(s,E*T,A>2?T:0,T,T),u.setRenderTarget(s),h&&u.render(M,c),u.render(e,c)}u.toneMapping=g,u.autoClear=d,e.background=w}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===$n||e.mapping===Ei;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=al()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;mi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ui)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-f*f),d=0+l*1.25,g=u*d,{_lodMax:v}=this,M=this._sizeLods[n],m=3*M*(n>v-Nn?n-v+Nn:0),h=4*(this._cubeSize-M);c.envMap.value=e.texture,c.roughness.value=g,c.mipInt.value=v-t,mi(r,m,h,3*M,2*M),s.setRenderTarget(r),s.render(o,Ui),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-n,mi(e,m,h,3*M,2*M),s.setRenderTarget(e),s.render(o,Ui)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const f=3,u=this._lodMeshes[s];u.material=l;const d=l.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*kn-1),M=r/v,m=isFinite(r)?1+Math.floor(f*M):kn;m>kn&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${kn}`);const h=[];let w=0;for(let P=0;P<kn;++P){const x=P/M,C=Math.exp(-x*x/2);h.push(C),P===0?w+=C:P<m&&(w+=2*C)}for(let P=0;P<h.length;P++)h[P]=h[P]/w;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:A}=this;d.dTheta.value=v,d.mipInt.value=A-n;const E=this._sizeLods[s],T=3*E*(s>A-Nn?s-A+Nn:0),y=4*(this._cubeSize-E);mi(t,T,y,3*E,2*E),c.setRenderTarget(t),c.render(u,Ui)}}function am(i){const e=[],t=[],n=[];let s=i;const r=i-Nn+1+tl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Nn?c=tl[a-i+Nn-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),f=-l,u=1+l,d=[f,f,u,f,u,u,f,f,u,u,f,u],g=6,v=6,M=3,m=2,h=1,w=new Float32Array(M*v*g),A=new Float32Array(m*v*g),E=new Float32Array(h*v*g);for(let y=0;y<g;y++){const P=y%3*2/3-1,x=y>2?0:-1,C=[P,x,0,P+2/3,x,0,P+2/3,x+1,0,P,x,0,P+2/3,x+1,0,P,x+1,0];w.set(C,M*v*y),A.set(d,m*v*y);const U=[y,y,y,y,y,y];E.set(U,h*v*y)}const T=new Pt;T.setAttribute("position",new Dt(w,M)),T.setAttribute("uv",new Dt(A,m)),T.setAttribute("faceIndex",new Dt(E,h)),n.push(new lt(T,null)),s>Nn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function sl(i,e,t){const n=new an(i,e,t);return n.texture.mapping=Vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mi(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function om(i,e,t){return new ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

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
		`,blending:_n,depthTest:!1,depthWrite:!1})}function lm(i,e,t){const n=new Float32Array(kn),s=new Y(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:qs(),fragmentShader:`

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
		`,blending:_n,depthTest:!1,depthWrite:!1})}function rl(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

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
		`,blending:_n,depthTest:!1,depthWrite:!1})}function al(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function qs(){return`

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
	`}class Lc extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new yc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Zn(5,5,5),r=new ln({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:_n});r.uniforms.tEquirect.value=t;const a=new lt(s,r),o=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Rt),new fh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function cm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,g=!1){return d==null?null:g?a(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===Zs||g===Js)if(e.has(d)){const v=e.get(d).texture;return o(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const M=new Lc(v.height);return M.fromEquirectangularTexture(i,d),e.set(d,M),d.addEventListener("dispose",l),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const g=d.mapping,v=g===Zs||g===Js,M=g===$n||g===Ei;if(v||M){let m=t.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return n===null&&(n=new il(i)),m=v?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const w=d.image;return v&&w&&w.height>0||M&&w&&c(w)?(n===null&&(n=new il(i)),m=v?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",f),m.texture):null}}}return d}function o(d,g){return g===Zs?d.mapping=$n:g===Js&&(d.mapping=Ei),d}function c(d){let g=0;const v=6;for(let M=0;M<v;M++)d[M]!==void 0&&g++;return g===v}function l(d){const g=d.target;g.removeEventListener("dispose",l);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function f(d){const g=d.target;g.removeEventListener("dispose",f);const v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function dm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&xi("WebGLRenderer: "+n+" extension not supported."),s}}}function um(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete s[d.id];const g=r.get(d);g&&(e.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER)}function l(u){const d=[],g=u.index,v=u.attributes.position;let M=0;if(v===void 0)return;if(g!==null){const w=g.array;M=g.version;for(let A=0,E=w.length;A<E;A+=3){const T=w[A+0],y=w[A+1],P=w[A+2];d.push(T,y,y,P,P,T)}}else{const w=v.array;M=v.version;for(let A=0,E=w.length/3-1;A<E;A+=3){const T=A+0,y=A+1,P=A+2;d.push(T,y,y,P,P,T)}}const m=new(v.count>=65535?Mc:vc)(d,1);m.version=M;const h=r.get(u);h&&e.remove(h),r.set(u,m)}function f(u){const d=r.get(u);if(d){const g=u.index;g!==null&&d.version<g.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:f}}function hm(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*a),t.update(d,n,1)}function l(u,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,u*a,g),t.update(d,n,g))}function f(u,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,g);let M=0;for(let m=0;m<g;m++)M+=d[m];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function fm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function pm(i,e,t){const n=new WeakMap,s=new dt;function r(a,o,c){const l=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=f!==void 0?f.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let C=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let A=0;g===!0&&(A=1),v===!0&&(A=2),M===!0&&(A=3);let E=o.attributes.position.count*A,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const y=new Float32Array(E*T*4*u),P=new mc(y,E,T,u);P.type=nn,P.needsUpdate=!0;const x=A*4;for(let U=0;U<u;U++){const F=m[U],V=h[U],Z=w[U],z=E*T*4*U;for(let I=0;I<F.count;I++){const j=I*x;g===!0&&(s.fromBufferAttribute(F,I),y[z+j+0]=s.x,y[z+j+1]=s.y,y[z+j+2]=s.z,y[z+j+3]=0),v===!0&&(s.fromBufferAttribute(V,I),y[z+j+4]=s.x,y[z+j+5]=s.y,y[z+j+6]=s.z,y[z+j+7]=0),M===!0&&(s.fromBufferAttribute(Z,I),y[z+j+8]=s.x,y[z+j+9]=s.y,y[z+j+10]=s.z,y[z+j+11]=Z.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new $e(E,T)},n.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let M=0;M<l.length;M++)g+=l[M];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function mm(i,e,t,n,s){let r=new WeakMap;function a(l){const f=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==f&&(e.update(d),r.set(d,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==f&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,f))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==f&&(g.update(),r.set(g,f))}return d}function o(){r=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const gm={[Ql]:"LINEAR_TONE_MAPPING",[ec]:"REINHARD_TONE_MAPPING",[tc]:"CINEON_TONE_MAPPING",[nc]:"ACES_FILMIC_TONE_MAPPING",[sc]:"AGX_TONE_MAPPING",[rc]:"NEUTRAL_TONE_MAPPING",[ic]:"CUSTOM_TONE_MAPPING"};function _m(i,e,t,n,s,r){const a=new an(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new bi(e,t):void 0}),o=new an(e,t,{type:vn,depthBuffer:!1,stencilBuffer:!1}),c=new Pt;c.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Et([0,2,0,0,2,0],2));const l=new lh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new lt(c,l),u=new Rc(-1,1,1,-1,0,1);let d=null,g=null,v=!1,M,m=null,h=[],w=!1;this.setSize=function(A,E){a.setSize(A,E),o.setSize(A,E);for(let T=0;T<h.length;T++){const y=h[T];y.setSize&&y.setSize(A,E)}},this.setEffects=function(A){h=A,w=h.length>0&&h[0].isRenderPass===!0;const E=a.width,T=a.height;for(let y=0;y<h.length;y++){const P=h[y];P.setSize&&P.setSize(E,T)}},this.begin=function(A,E){if(v||A.toneMapping===rn&&h.length===0)return!1;if(m=E,E!==null){const T=E.width,y=E.height;(a.width!==T||a.height!==y)&&this.setSize(T,y)}return w===!1&&A.setRenderTarget(a),M=A.toneMapping,A.toneMapping=rn,!0},this.hasRenderPass=function(){return w},this.end=function(A,E){A.toneMapping=M,v=!0;let T=a,y=o;for(let P=0;P<h.length;P++){const x=h[P];if(x.enabled!==!1&&(x.render(A,y,T,E),x.needsSwap!==!1)){const C=T;T=y,y=C}}if(d!==A.outputColorSpace||g!==A.toneMapping){d=A.outputColorSpace,g=A.toneMapping,l.defines={},je.getTransfer(d)===Qe&&(l.defines.SRGB_TRANSFER="");const P=gm[g];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,A.setRenderTarget(m),A.render(f,u),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Dc=new Ct,Na=new bi(1,1),Ic=new mc,Uc=new Gu,Fc=new yc,ol=[],ll=[],cl=new Float32Array(16),dl=new Float32Array(9),ul=new Float32Array(4);function Ci(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=ol[s];if(r===void 0&&(r=new Float32Array(s),ol[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function js(i,e){let t=ll[e];t===void 0&&(t=new Int32Array(e),ll[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function xm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function ym(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;ul.set(n),i.uniformMatrix2fv(this.addr,!1,ul),St(t,n)}}function Em(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;dl.set(n),i.uniformMatrix3fv(this.addr,!1,dl),St(t,n)}}function bm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;cl.set(n),i.uniformMatrix4fv(this.addr,!1,cl),St(t,n)}}function Tm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function Cm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function Nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function Dm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Na.compareFunction=t.isReversedDepthBuffer()?ka:Va,r=Na):r=Dc,t.setTexture2D(e||r,s)}function Im(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Uc,s)}function Um(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Fc,s)}function Fm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ic,s)}function Om(i){switch(i){case 5126:return xm;case 35664:return vm;case 35665:return Mm;case 35666:return Sm;case 35674:return ym;case 35675:return Em;case 35676:return bm;case 5124:case 35670:return Tm;case 35667:case 35671:return wm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Nm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Im;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}function Bm(i,e){i.uniform1fv(this.addr,e)}function zm(i,e){const t=Ci(e,this.size,2);i.uniform2fv(this.addr,t)}function Gm(i,e){const t=Ci(e,this.size,3);i.uniform3fv(this.addr,t)}function Hm(i,e){const t=Ci(e,this.size,4);i.uniform4fv(this.addr,t)}function Vm(i,e){const t=Ci(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function km(i,e){const t=Ci(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wm(i,e){const t=Ci(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xm(i,e){i.uniform1iv(this.addr,e)}function qm(i,e){i.uniform2iv(this.addr,e)}function jm(i,e){i.uniform3iv(this.addr,e)}function Ym(i,e){i.uniform4iv(this.addr,e)}function $m(i,e){i.uniform1uiv(this.addr,e)}function Km(i,e){i.uniform2uiv(this.addr,e)}function Zm(i,e){i.uniform3uiv(this.addr,e)}function Jm(i,e){i.uniform4uiv(this.addr,e)}function Qm(i,e,t){const n=this.cache,s=e.length,r=js(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Na:a=Dc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function eg(i,e,t){const n=this.cache,s=e.length,r=js(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Uc,r[a])}function tg(i,e,t){const n=this.cache,s=e.length,r=js(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Fc,r[a])}function ng(i,e,t){const n=this.cache,s=e.length,r=js(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ic,r[a])}function ig(i){switch(i){case 5126:return Bm;case 35664:return zm;case 35665:return Gm;case 35666:return Hm;case 35674:return Vm;case 35675:return km;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return qm;case 35668:case 35672:return jm;case 35669:case 35673:return Ym;case 5125:return $m;case 36294:return Km;case 36295:return Zm;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return ng}}class sg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Om(t.type)}}class rg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ig(t.type)}}class ag{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Cr=/(\w+)(\])?(\[|\.)?/g;function hl(i,e){i.seq.push(e),i.map[e.id]=e}function og(i,e,t){const n=i.name,s=n.length;for(Cr.lastIndex=0;;){const r=Cr.exec(n),a=Cr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){hl(t,l===void 0?new sg(o,i,e):new rg(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new ag(o),hl(t,u)),t=u}}}class Ps{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);og(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function fl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const lg=37297;let cg=0;function dg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const pl=new Oe;function ug(i){je._getMatrix(pl,je.workingColorSpace,i);const e=`mat3( ${pl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case Os:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ml(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+dg(i.getShaderSource(e),o)}else return r}function hg(i,e){const t=ug(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const fg={[Ql]:"Linear",[ec]:"Reinhard",[tc]:"Cineon",[nc]:"ACESFilmic",[sc]:"AgX",[rc]:"Neutral",[ic]:"Custom"};function pg(i,e){const t=fg[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ms=new Y;function mg(){je.getLuminanceCoefficients(Ms);const i=Ms.x.toFixed(4),e=Ms.y.toFixed(4),t=Ms.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gi).join(`
`)}function _g(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Gi(i){return i!==""}function gl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _l(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function La(i){return i.replace(vg,Sg)}const Mg=new Map;function Sg(i,e){let t=Ge[e];if(t===void 0){const n=Mg.get(e);if(n!==void 0)t=Ge[n],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return La(t)}const yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xl(i){return i.replace(yg,Eg)}function Eg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const bg={[Ts]:"SHADOWMAP_TYPE_PCF",[zi]:"SHADOWMAP_TYPE_VSM"};function Tg(i){return bg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wg={[$n]:"ENVMAP_TYPE_CUBE",[Ei]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE_UV"};function Ag(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":wg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Rg={[Ei]:"ENVMAP_MODE_REFRACTION"};function Cg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Rg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Pg={[Jl]:"ENVMAP_BLENDING_MULTIPLY",[vu]:"ENVMAP_BLENDING_MIX",[Mu]:"ENVMAP_BLENDING_ADD"};function Ng(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Pg[i.combine]||"ENVMAP_BLENDING_NONE"}function Lg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Dg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Tg(t),l=Ag(t),f=Cg(t),u=Ng(t),d=Lg(t),g=gg(t),v=_g(r),M=s.createProgram();let m,h,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Gi).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Gi).join(`
`),h.length>0&&(h+=`
`)):(m=[vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gi).join(`
`),h=[vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==rn?"#define TONE_MAPPING":"",t.toneMapping!==rn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==rn?pg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,hg("linearToOutputTexel",t.outputColorSpace),mg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gi).join(`
`)),a=La(a),a=gl(a,t),a=_l(a,t),o=La(o),o=gl(o,t),o=_l(o,t),a=xl(a),o=xl(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===Co?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const A=w+m+a,E=w+h+o,T=fl(s,s.VERTEX_SHADER,A),y=fl(s,s.FRAGMENT_SHADER,E);s.attachShader(M,T),s.attachShader(M,y),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function P(F){if(i.debug.checkShaderErrors){const V=s.getProgramInfoLog(M)||"",Z=s.getShaderInfoLog(T)||"",z=s.getShaderInfoLog(y)||"",I=V.trim(),j=Z.trim(),k=z.trim();let Q=!0,ce=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,T,y);else{const fe=ml(s,T,"vertex"),pe=ml(s,y,"fragment");Je("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+I+`
`+fe+`
`+pe)}else I!==""?Fe("WebGLProgram: Program Info Log:",I):(j===""||k==="")&&(ce=!1);ce&&(F.diagnostics={runnable:Q,programLog:I,vertexShader:{log:j,prefix:m},fragmentShader:{log:k,prefix:h}})}s.deleteShader(T),s.deleteShader(y),x=new Ps(s,M),C=xg(s,M)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(M,lg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cg++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=T,this.fragmentShader=y,this}let Ig=0;class Ug{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Fg(e),t.set(e,n)),n}}class Fg{constructor(e){this.id=Ig++,this.code=e,this.usedTimes=0}}function Og(i){return i===Kn||i===Is||i===Us}function Bg(i,e,t,n,s,r){const a=new gc,o=new Ug,c=new Set,l=[],f=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return c.add(x),x===0?"uv":`uv${x}`}function M(x,C,U,F,V,Z){const z=F.fog,I=V.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=e.get(x.envMap||j,k),ce=Q&&Q.mapping===Vs?Q.image.height:null,fe=g[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Fe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const pe=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,be=pe!==void 0?pe.length:0;let qe=0;I.morphAttributes.position!==void 0&&(qe=1),I.morphAttributes.normal!==void 0&&(qe=2),I.morphAttributes.color!==void 0&&(qe=3);let we,He,ae,ue;if(fe){const Ae=tn[fe];we=Ae.vertexShader,He=Ae.fragmentShader}else{we=x.vertexShader,He=x.fragmentShader;const Ae=o.getVertexShaderStage(x),ft=o.getFragmentShaderStage(x);o.update(x,Ae,ft),ae=Ae.id,ue=ft.id}const re=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Ue=V.isInstancedMesh===!0,De=V.isBatchedMesh===!0,tt=!!x.map,ze=!!x.matcap,Ke=!!Q,We=!!x.aoMap,Ve=!!x.lightMap,ot=!!x.bumpMap&&x.wireframe===!1,ct=!!x.normalMap,ht=!!x.displacementMap,gt=!!x.emissiveMap,st=!!x.metalnessMap,X=!!x.roughnessMap,R=x.anisotropy>0,te=x.clearcoat>0,ne=x.dispersion>0,S=x.iridescence>0,p=x.sheen>0,N=x.transmission>0,L=R&&!!x.anisotropyMap,O=te&&!!x.clearcoatMap,q=te&&!!x.clearcoatNormalMap,B=te&&!!x.clearcoatRoughnessMap,D=S&&!!x.iridescenceMap,G=S&&!!x.iridescenceThicknessMap,ee=p&&!!x.sheenColorMap,le=p&&!!x.sheenRoughnessMap,se=!!x.specularMap,ie=!!x.specularColorMap,_e=!!x.specularIntensityMap,Me=N&&!!x.transmissionMap,Pe=N&&!!x.thicknessMap,H=!!x.gradientMap,ge=!!x.alphaMap,oe=x.alphaTest>0,me=!!x.alphaHash,ye=!!x.extensions;let de=rn;x.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(de=i.toneMapping);const Ce={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:we,fragmentShader:He,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:ue,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:De,batchingColor:De&&V._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&V.instanceColor!==null,instancingMorph:Ue&&V.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:tt,matcap:ze,envMap:Ke,envMapMode:Ke&&Q.mapping,envMapCubeUVHeight:ce,aoMap:We,lightMap:Ve,bumpMap:ot,normalMap:ct,displacementMap:ht,emissiveMap:gt,normalMapObjectSpace:ct&&x.normalMapType===Eu,normalMapTangentSpace:ct&&x.normalMapType===Ra,packedNormalMap:ct&&x.normalMapType===Ra&&Og(x.normalMap.format),metalnessMap:st,roughnessMap:X,anisotropy:R,anisotropyMap:L,clearcoat:te,clearcoatMap:O,clearcoatNormalMap:q,clearcoatRoughnessMap:B,dispersion:ne,iridescence:S,iridescenceMap:D,iridescenceThicknessMap:G,sheen:p,sheenColorMap:ee,sheenRoughnessMap:le,specularMap:se,specularColorMap:ie,specularIntensityMap:_e,transmission:N,transmissionMap:Me,thicknessMap:Pe,gradientMap:H,opaque:x.transparent===!1&&x.blending===_i&&x.alphaToCoverage===!1,alphaMap:ge,alphaTest:oe,alphaHash:me,combine:x.combine,mapUv:tt&&v(x.map.channel),aoMapUv:We&&v(x.aoMap.channel),lightMapUv:Ve&&v(x.lightMap.channel),bumpMapUv:ot&&v(x.bumpMap.channel),normalMapUv:ct&&v(x.normalMap.channel),displacementMapUv:ht&&v(x.displacementMap.channel),emissiveMapUv:gt&&v(x.emissiveMap.channel),metalnessMapUv:st&&v(x.metalnessMap.channel),roughnessMapUv:X&&v(x.roughnessMap.channel),anisotropyMapUv:L&&v(x.anisotropyMap.channel),clearcoatMapUv:O&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:q&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:D&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:G&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:le&&v(x.sheenRoughnessMap.channel),specularMapUv:se&&v(x.specularMap.channel),specularColorMapUv:ie&&v(x.specularColorMap.channel),specularIntensityMapUv:_e&&v(x.specularIntensityMap.channel),transmissionMapUv:Me&&v(x.transmissionMap.channel),thicknessMapUv:Pe&&v(x.thicknessMap.channel),alphaMapUv:ge&&v(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ct||R),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!I.attributes.uv&&(tt||ge),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&ct===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ie,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:qe,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:tt&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===Qe,decodeVideoTextureEmissive:gt&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===Qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===pn,flipSided:x.side===Ft,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ye&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&x.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(x){const C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(const U in x.defines)C.push(U),C.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(h(C,x),w(C,x),C.push(i.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function h(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function w(x,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){const C=g[x.type];let U;if(C){const F=tn[C];U=rh.clone(F.uniforms)}else U=x.uniforms;return U}function E(x,C){let U=f.get(C);return U!==void 0?++U.usedTimes:(U=new Dg(i,C,x,s),l.push(U),f.set(C,U)),U}function T(x){if(--x.usedTimes===0){const C=l.indexOf(x);l[C]=l[l.length-1],l.pop(),f.delete(x.cacheKey),x.destroy()}}function y(x){o.remove(x)}function P(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:A,acquireProgram:E,releaseProgram:T,releaseShaderCache:y,programs:l,dispose:P}}function zg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Gg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ml(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Sl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,v,M,m,h){let w=i[e];return w===void 0?(w={id:d.id,object:d,geometry:g,material:v,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:m,group:h},i[e]=w):(w.id=d.id,w.object=d,w.geometry=g,w.material=v,w.materialVariant=a(d),w.groupOrder=M,w.renderOrder=d.renderOrder,w.z=m,w.group=h),e++,w}function c(d,g,v,M,m,h){const w=o(d,g,v,M,m,h);v.transmission>0?n.push(w):v.transparent===!0?s.push(w):t.push(w)}function l(d,g,v,M,m,h){const w=o(d,g,v,M,m,h);v.transmission>0?n.unshift(w):v.transparent===!0?s.unshift(w):t.unshift(w)}function f(d,g,v){t.length>1&&t.sort(d||Gg),n.length>1&&n.sort(g||Ml),s.length>1&&s.sort(g||Ml),v&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let d=e,g=i.length;d<g;d++){const v=i[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:f}}function Hg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Sl,i.set(n,[a])):s>=r.length?(a=new Sl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new Xe};break;case"SpotLight":t={position:new Y,direction:new Y,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return i[e.id]=t,t}}}function kg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Wg=0;function Xg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function qg(i){const e=new Vg,t=kg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new Y);const s=new Y,r=new ut,a=new ut;function o(l){let f=0,u=0,d=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let g=0,v=0,M=0,m=0,h=0,w=0,A=0,E=0,T=0,y=0,P=0;l.sort(Xg);for(let C=0,U=l.length;C<U;C++){const F=l[C],V=F.color,Z=F.intensity,z=F.distance;let I=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Kn?I=F.shadow.map.texture:I=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)f+=V.r*Z,u+=V.g*Z,d+=V.b*Z;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],Z);P++}else if(F.isDirectionalLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const k=F.shadow,Q=t.get(F);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,n.directionalShadow[g]=Q,n.directionalShadowMap[g]=I,n.directionalShadowMatrix[g]=F.shadow.matrix,w++}n.directional[g]=j,g++}else if(F.isSpotLight){const j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(V).multiplyScalar(Z),j.distance=z,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[M]=j;const k=F.shadow;if(F.map&&(n.spotLightMap[T]=F.map,T++,k.updateMatrices(F),F.castShadow&&y++),n.spotLightMatrix[M]=k.matrix,F.castShadow){const Q=t.get(F);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,n.spotShadow[M]=Q,n.spotShadowMap[M]=I,E++}M++}else if(F.isRectAreaLight){const j=e.get(F);j.color.copy(V).multiplyScalar(Z),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),n.rectArea[m]=j,m++}else if(F.isPointLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){const k=F.shadow,Q=t.get(F);Q.shadowIntensity=k.intensity,Q.shadowBias=k.bias,Q.shadowNormalBias=k.normalBias,Q.shadowRadius=k.radius,Q.shadowMapSize=k.mapSize,Q.shadowCameraNear=k.camera.near,Q.shadowCameraFar=k.camera.far,n.pointShadow[v]=Q,n.pointShadowMap[v]=I,n.pointShadowMatrix[v]=F.shadow.matrix,A++}n.point[v]=j,v++}else if(F.isHemisphereLight){const j=e.get(F);j.skyColor.copy(F.color).multiplyScalar(Z),j.groundColor.copy(F.groundColor).multiplyScalar(Z),n.hemi[h]=j,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=u,n.ambient[2]=d;const x=n.hash;(x.directionalLength!==g||x.pointLength!==v||x.spotLength!==M||x.rectAreaLength!==m||x.hemiLength!==h||x.numDirectionalShadows!==w||x.numPointShadows!==A||x.numSpotShadows!==E||x.numSpotMaps!==T||x.numLightProbes!==P)&&(n.directional.length=g,n.spot.length=M,n.rectArea.length=m,n.point.length=v,n.hemi.length=h,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=E+T-y,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=P,x.directionalLength=g,x.pointLength=v,x.spotLength=M,x.rectAreaLength=m,x.hemiLength=h,x.numDirectionalShadows=w,x.numPointShadows=A,x.numSpotShadows=E,x.numSpotMaps=T,x.numLightProbes=P,n.version=Wg++)}function c(l,f){let u=0,d=0,g=0,v=0,M=0;const m=f.matrixWorldInverse;for(let h=0,w=l.length;h<w;h++){const A=l[h];if(A.isDirectionalLight){const E=n.directional[u];E.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),u++}else if(A.isSpotLight){const E=n.spot[g];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),g++}else if(A.isRectAreaLight){const E=n.rectArea[v];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(A.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(A.width*.5,0,0),E.halfHeight.set(0,A.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(A.isPointLight){const E=n.point[d];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),d++}else if(A.isHemisphereLight){const E=n.hemi[M];E.direction.setFromMatrixPosition(A.matrixWorld),E.direction.transformDirection(m),M++}}}return{setup:o,setupView:c,state:n}}function yl(i){const e=new qg(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function f(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function jg(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new yl(i),e.set(s,[o])):r>=a.length?(o=new yl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Yg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$g=`uniform sampler2D shadow_pass;
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
}`,Kg=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],Zg=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],El=new ut,Fi=new Y,Pr=new Y;function Jg(i,e,t){let n=new Xa;const s=new $e,r=new $e,a=new dt,o=new ch,c=new dh,l={},f=t.maxTextureSize,u={[Dn]:Ft,[Ft]:Dn,[pn]:pn},d=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Yg,fragmentShader:$g}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const v=new Pt;v.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new lt(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ts;let h=this.type;this.render=function(y,P,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===eu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ts);const C=i.getRenderTarget(),U=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),V=i.state;V.setBlending(_n),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const Z=h!==this.type;Z&&P.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(I=>I.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,I=y.length;z<I;z++){const j=y[z],k=j.shadow;if(k===void 0){Fe("WebGLShadowMap:",j,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const Q=k.getFrameExtents();s.multiply(Q),r.copy(k.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y));const ce=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=ce,k.map===null||Z===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===zi){if(j.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new an(s.x,s.y,{format:Kn,type:vn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),k.map.texture.name=j.name+".shadowMap",k.map.depthTexture=new bi(s.x,s.y,nn),k.map.depthTexture.name=j.name+".shadowMapDepth",k.map.depthTexture.format=Mn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=bt,k.map.depthTexture.magFilter=bt}else j.isPointLight?(k.map=new Lc(s.x),k.map.depthTexture=new ih(s.x,on)):(k.map=new an(s.x,s.y),k.map.depthTexture=new bi(s.x,s.y,on)),k.map.depthTexture.name=j.name+".shadowMap",k.map.depthTexture.format=Mn,this.type===Ts?(k.map.depthTexture.compareFunction=ce?ka:Va,k.map.depthTexture.minFilter=Rt,k.map.depthTexture.magFilter=Rt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=bt,k.map.depthTexture.magFilter=bt);k.camera.updateProjectionMatrix()}const fe=k.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<fe;pe++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,pe),i.clear();else{pe===0&&(i.setRenderTarget(k.map),i.clear());const be=k.getViewport(pe);a.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),V.viewport(a)}if(j.isPointLight){const be=k.camera,qe=k.matrix,we=j.distance||be.far;we!==be.far&&(be.far=we,be.updateProjectionMatrix()),Fi.setFromMatrixPosition(j.matrixWorld),be.position.copy(Fi),Pr.copy(be.position),Pr.add(Kg[pe]),be.up.copy(Zg[pe]),be.lookAt(Pr),be.updateMatrixWorld(),qe.makeTranslation(-Fi.x,-Fi.y,-Fi.z),El.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),k._frustum.setFromProjectionMatrix(El,be.coordinateSystem,be.reversedDepth)}else k.updateMatrices(j);n=k.getFrustum(),E(P,x,k.camera,j,this.type)}k.isPointLightShadow!==!0&&this.type===zi&&w(k,x),k.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(C,U,F)};function w(y,P){const x=e.update(M);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,g.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new an(s.x,s.y,{format:Kn,type:vn})),d.uniforms.shadow_pass.value=y.map.depthTexture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(P,null,x,d,M,null),g.uniforms.shadow_pass.value=y.mapPass.texture,g.uniforms.resolution.value=y.mapSize,g.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(P,null,x,g,M,null)}function A(y,P,x,C){let U=null;const F=x.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(F!==void 0)U=F;else if(U=x.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const V=U.uuid,Z=P.uuid;let z=l[V];z===void 0&&(z={},l[V]=z);let I=z[Z];I===void 0&&(I=U.clone(),z[Z]=I,P.addEventListener("dispose",T)),U=I}if(U.visible=P.visible,U.wireframe=P.wireframe,C===zi?U.side=P.shadowSide!==null?P.shadowSide:P.side:U.side=P.shadowSide!==null?P.shadowSide:u[P.side],U.alphaMap=P.alphaMap,U.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,U.map=P.map,U.clipShadows=P.clipShadows,U.clippingPlanes=P.clippingPlanes,U.clipIntersection=P.clipIntersection,U.displacementMap=P.displacementMap,U.displacementScale=P.displacementScale,U.displacementBias=P.displacementBias,U.wireframeLinewidth=P.wireframeLinewidth,U.linewidth=P.linewidth,x.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const V=i.properties.get(U);V.light=x}return U}function E(y,P,x,C,U){if(y.visible===!1)return;if(y.layers.test(P.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&U===zi)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,y.matrixWorld);const Z=e.update(y),z=y.material;if(Array.isArray(z)){const I=Z.groups;for(let j=0,k=I.length;j<k;j++){const Q=I[j],ce=z[Q.materialIndex];if(ce&&ce.visible){const fe=A(y,ce,C,U);y.onBeforeShadow(i,y,P,x,Z,fe,Q),i.renderBufferDirect(x,null,Z,fe,y,Q),y.onAfterShadow(i,y,P,x,Z,fe,Q)}}}else if(z.visible){const I=A(y,z,C,U);y.onBeforeShadow(i,y,P,x,Z,I,null),i.renderBufferDirect(x,null,Z,I,y,null),y.onAfterShadow(i,y,P,x,Z,I,null)}}const V=y.children;for(let Z=0,z=V.length;Z<z;Z++)E(V[Z],P,x,C,U)}function T(y){y.target.removeEventListener("dispose",T);for(const x in l){const C=l[x],U=y.target.uuid;U in C&&(C[U].dispose(),delete C[U])}}}function Qg(i,e){function t(){let H=!1;const ge=new dt;let oe=null;const me=new dt(0,0,0,0);return{setMask:function(ye){oe!==ye&&!H&&(i.colorMask(ye,ye,ye,ye),oe=ye)},setLocked:function(ye){H=ye},setClear:function(ye,de,Ce,Ae,ft){ft===!0&&(ye*=Ae,de*=Ae,Ce*=Ae),ge.set(ye,de,Ce,Ae),me.equals(ge)===!1&&(i.clearColor(ye,de,Ce,Ae),me.copy(ge))},reset:function(){H=!1,oe=null,me.set(-1,0,0,0)}}}function n(){let H=!1,ge=!1,oe=null,me=null,ye=null;return{setReversed:function(de){if(ge!==de){const Ce=e.get("EXT_clip_control");de?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ge=de;const Ae=ye;ye=null,this.setClear(Ae)}},getReversed:function(){return ge},setTest:function(de){de?re(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(de){oe!==de&&!H&&(i.depthMask(de),oe=de)},setFunc:function(de){if(ge&&(de=Du[de]),me!==de){switch(de){case kr:i.depthFunc(i.NEVER);break;case Wr:i.depthFunc(i.ALWAYS);break;case Xr:i.depthFunc(i.LESS);break;case yi:i.depthFunc(i.LEQUAL);break;case qr:i.depthFunc(i.EQUAL);break;case jr:i.depthFunc(i.GEQUAL);break;case Yr:i.depthFunc(i.GREATER);break;case $r:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=de}},setLocked:function(de){H=de},setClear:function(de){ye!==de&&(ye=de,ge&&(de=1-de),i.clearDepth(de))},reset:function(){H=!1,oe=null,me=null,ye=null,ge=!1}}}function s(){let H=!1,ge=null,oe=null,me=null,ye=null,de=null,Ce=null,Ae=null,ft=null;return{setTest:function(rt){H||(rt?re(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(rt){ge!==rt&&!H&&(i.stencilMask(rt),ge=rt)},setFunc:function(rt,Kt,Zt){(oe!==rt||me!==Kt||ye!==Zt)&&(i.stencilFunc(rt,Kt,Zt),oe=rt,me=Kt,ye=Zt)},setOp:function(rt,Kt,Zt){(de!==rt||Ce!==Kt||Ae!==Zt)&&(i.stencilOp(rt,Kt,Zt),de=rt,Ce=Kt,Ae=Zt)},setLocked:function(rt){H=rt},setClear:function(rt){ft!==rt&&(i.clearStencil(rt),ft=rt)},reset:function(){H=!1,ge=null,oe=null,me=null,ye=null,de=null,Ce=null,Ae=null,ft=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let f={},u={},d={},g=new WeakMap,v=[],M=null,m=!1,h=null,w=null,A=null,E=null,T=null,y=null,P=null,x=new Xe(0,0,0),C=0,U=!1,F=null,V=null,Z=null,z=null,I=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Q=0;const ce=i.getParameter(i.VERSION);ce.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(ce)[1]),k=Q>=1):ce.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),k=Q>=2);let fe=null,pe={};const be=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),we=new dt().fromArray(be),He=new dt().fromArray(qe);function ae(H,ge,oe,me){const ye=new Uint8Array(4),de=i.createTexture();i.bindTexture(H,de),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<oe;Ce++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(ge+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return de}const ue={};ue[i.TEXTURE_2D]=ae(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(yi),ot(!1),ct(bo),re(i.CULL_FACE),We(_n);function re(H){f[H]!==!0&&(i.enable(H),f[H]=!0)}function Ie(H){f[H]!==!1&&(i.disable(H),f[H]=!1)}function Ue(H,ge){return d[H]!==ge?(i.bindFramebuffer(H,ge),d[H]=ge,H===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ge),H===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function De(H,ge){let oe=v,me=!1;if(H){oe=g.get(ge),oe===void 0&&(oe=[],g.set(ge,oe));const ye=H.textures;if(oe.length!==ye.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Ce=ye.length;de<Ce;de++)oe[de]=i.COLOR_ATTACHMENT0+de;oe.length=ye.length,me=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,me=!0);me&&i.drawBuffers(oe)}function tt(H){return M!==H?(i.useProgram(H),M=H,!0):!1}const ze={[Vn]:i.FUNC_ADD,[nu]:i.FUNC_SUBTRACT,[iu]:i.FUNC_REVERSE_SUBTRACT};ze[su]=i.MIN,ze[ru]=i.MAX;const Ke={[au]:i.ZERO,[ou]:i.ONE,[lu]:i.SRC_COLOR,[Hr]:i.SRC_ALPHA,[pu]:i.SRC_ALPHA_SATURATE,[hu]:i.DST_COLOR,[du]:i.DST_ALPHA,[cu]:i.ONE_MINUS_SRC_COLOR,[Vr]:i.ONE_MINUS_SRC_ALPHA,[fu]:i.ONE_MINUS_DST_COLOR,[uu]:i.ONE_MINUS_DST_ALPHA,[mu]:i.CONSTANT_COLOR,[gu]:i.ONE_MINUS_CONSTANT_COLOR,[_u]:i.CONSTANT_ALPHA,[xu]:i.ONE_MINUS_CONSTANT_ALPHA};function We(H,ge,oe,me,ye,de,Ce,Ae,ft,rt){if(H===_n){m===!0&&(Ie(i.BLEND),m=!1);return}if(m===!1&&(re(i.BLEND),m=!0),H!==tu){if(H!==h||rt!==U){if((w!==Vn||T!==Vn)&&(i.blendEquation(i.FUNC_ADD),w=Vn,T=Vn),rt)switch(H){case _i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yn:i.blendFunc(i.ONE,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",H);break}else switch(H){case _i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case To:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wo:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",H);break}A=null,E=null,y=null,P=null,x.set(0,0,0),C=0,h=H,U=rt}return}ye=ye||ge,de=de||oe,Ce=Ce||me,(ge!==w||ye!==T)&&(i.blendEquationSeparate(ze[ge],ze[ye]),w=ge,T=ye),(oe!==A||me!==E||de!==y||Ce!==P)&&(i.blendFuncSeparate(Ke[oe],Ke[me],Ke[de],Ke[Ce]),A=oe,E=me,y=de,P=Ce),(Ae.equals(x)===!1||ft!==C)&&(i.blendColor(Ae.r,Ae.g,Ae.b,ft),x.copy(Ae),C=ft),h=H,U=!1}function Ve(H,ge){H.side===pn?Ie(i.CULL_FACE):re(i.CULL_FACE);let oe=H.side===Ft;ge&&(oe=!oe),ot(oe),H.blending===_i&&H.transparent===!1?We(_n):We(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),gt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function ot(H){F!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),F=H)}function ct(H){H!==Jd?(re(i.CULL_FACE),H!==V&&(H===bo?i.cullFace(i.BACK):H===Qd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),V=H}function ht(H){H!==Z&&(k&&i.lineWidth(H),Z=H)}function gt(H,ge,oe){H?(re(i.POLYGON_OFFSET_FILL),(z!==ge||I!==oe)&&(z=ge,I=oe,a.getReversed()&&(ge=-ge),i.polygonOffset(ge,oe))):Ie(i.POLYGON_OFFSET_FILL)}function st(H){H?re(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function X(H){H===void 0&&(H=i.TEXTURE0+j-1),fe!==H&&(i.activeTexture(H),fe=H)}function R(H,ge,oe){oe===void 0&&(fe===null?oe=i.TEXTURE0+j-1:oe=fe);let me=pe[oe];me===void 0&&(me={type:void 0,texture:void 0},pe[oe]=me),(me.type!==H||me.texture!==ge)&&(fe!==oe&&(i.activeTexture(oe),fe=oe),i.bindTexture(H,ge||ue[H]),me.type=H,me.texture=ge)}function te(){const H=pe[fe];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ne(){try{i.compressedTexImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function p(){try{i.texSubImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function N(){try{i.texSubImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function L(){try{i.compressedTexSubImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function O(){try{i.compressedTexSubImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function q(){try{i.texStorage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function B(){try{i.texStorage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function D(){try{i.texImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function G(){try{i.texImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function ee(H){return u[H]!==void 0?u[H]:i.getParameter(H)}function le(H,ge){u[H]!==ge&&(i.pixelStorei(H,ge),u[H]=ge)}function se(H){we.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),we.copy(H))}function ie(H){He.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),He.copy(H))}function _e(H,ge){let oe=l.get(ge);oe===void 0&&(oe=new WeakMap,l.set(ge,oe));let me=oe.get(H);me===void 0&&(me=i.getUniformBlockIndex(ge,H.name),oe.set(H,me))}function Me(H,ge){const me=l.get(ge).get(H);c.get(ge)!==me&&(i.uniformBlockBinding(ge,me,H.__bindingPointIndex),c.set(ge,me))}function Pe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},u={},fe=null,pe={},d={},g=new WeakMap,v=[],M=null,m=!1,h=null,w=null,A=null,E=null,T=null,y=null,P=null,x=new Xe(0,0,0),C=0,U=!1,F=null,V=null,Z=null,z=null,I=null,we.set(0,0,i.canvas.width,i.canvas.height),He.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:re,disable:Ie,bindFramebuffer:Ue,drawBuffers:De,useProgram:tt,setBlending:We,setMaterial:Ve,setFlipSided:ot,setCullFace:ct,setLineWidth:ht,setPolygonOffset:gt,setScissorTest:st,activeTexture:X,bindTexture:R,unbindTexture:te,compressedTexImage2D:ne,compressedTexImage3D:S,texImage2D:D,texImage3D:G,pixelStorei:le,getParameter:ee,updateUBOMapping:_e,uniformBlockBinding:Me,texStorage2D:q,texStorage3D:B,texSubImage2D:p,texSubImage3D:N,compressedTexSubImage2D:L,compressedTexSubImage3D:O,scissor:se,viewport:ie,reset:Pe}}function e0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $e,f=new WeakMap,u=new Set;let d;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(S,p){return v?new OffscreenCanvas(S,p):Bs("canvas")}function m(S,p,N){let L=1;const O=ne(S);if((O.width>N||O.height>N)&&(L=N/Math.max(O.width,O.height)),L<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const q=Math.floor(L*O.width),B=Math.floor(L*O.height);d===void 0&&(d=M(q,B));const D=p?M(q,B):d;return D.width=q,D.height=B,D.getContext("2d").drawImage(S,0,0,q,B),Fe("WebGLRenderer: Texture has been resized from ("+O.width+"x"+O.height+") to ("+q+"x"+B+")."),D}else return"data"in S&&Fe("WebGLRenderer: Image in DataTexture is too big ("+O.width+"x"+O.height+")."),S;return S}function h(S){return S.generateMipmaps}function w(S){i.generateMipmap(S)}function A(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(S,p,N,L,O,q=!1){if(S!==null){if(i[S]!==void 0)return i[S];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let B;L&&(B=e.get("EXT_texture_norm16"),B||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let D=p;if(p===i.RED&&(N===i.FLOAT&&(D=i.R32F),N===i.HALF_FLOAT&&(D=i.R16F),N===i.UNSIGNED_BYTE&&(D=i.R8),N===i.UNSIGNED_SHORT&&B&&(D=B.R16_EXT),N===i.SHORT&&B&&(D=B.R16_SNORM_EXT)),p===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(D=i.R8UI),N===i.UNSIGNED_SHORT&&(D=i.R16UI),N===i.UNSIGNED_INT&&(D=i.R32UI),N===i.BYTE&&(D=i.R8I),N===i.SHORT&&(D=i.R16I),N===i.INT&&(D=i.R32I)),p===i.RG&&(N===i.FLOAT&&(D=i.RG32F),N===i.HALF_FLOAT&&(D=i.RG16F),N===i.UNSIGNED_BYTE&&(D=i.RG8),N===i.UNSIGNED_SHORT&&B&&(D=B.RG16_EXT),N===i.SHORT&&B&&(D=B.RG16_SNORM_EXT)),p===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(D=i.RG8UI),N===i.UNSIGNED_SHORT&&(D=i.RG16UI),N===i.UNSIGNED_INT&&(D=i.RG32UI),N===i.BYTE&&(D=i.RG8I),N===i.SHORT&&(D=i.RG16I),N===i.INT&&(D=i.RG32I)),p===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(D=i.RGB8UI),N===i.UNSIGNED_SHORT&&(D=i.RGB16UI),N===i.UNSIGNED_INT&&(D=i.RGB32UI),N===i.BYTE&&(D=i.RGB8I),N===i.SHORT&&(D=i.RGB16I),N===i.INT&&(D=i.RGB32I)),p===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(D=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(D=i.RGBA16UI),N===i.UNSIGNED_INT&&(D=i.RGBA32UI),N===i.BYTE&&(D=i.RGBA8I),N===i.SHORT&&(D=i.RGBA16I),N===i.INT&&(D=i.RGBA32I)),p===i.RGB&&(N===i.UNSIGNED_SHORT&&B&&(D=B.RGB16_EXT),N===i.SHORT&&B&&(D=B.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(D=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(D=i.R11F_G11F_B10F)),p===i.RGBA){const G=q?Os:je.getTransfer(O);N===i.FLOAT&&(D=i.RGBA32F),N===i.HALF_FLOAT&&(D=i.RGBA16F),N===i.UNSIGNED_BYTE&&(D=G===Qe?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&B&&(D=B.RGBA16_EXT),N===i.SHORT&&B&&(D=B.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(D=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(D=i.RGB5_A1)}return(D===i.R16F||D===i.R32F||D===i.RG16F||D===i.RG32F||D===i.RGBA16F||D===i.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function T(S,p){let N;return S?p===null||p===on||p===ki?N=i.DEPTH24_STENCIL8:p===nn?N=i.DEPTH32F_STENCIL8:p===Vi&&(N=i.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===on||p===ki?N=i.DEPTH_COMPONENT24:p===nn?N=i.DEPTH_COMPONENT32F:p===Vi&&(N=i.DEPTH_COMPONENT16),N}function y(S,p){return h(S)===!0||S.isFramebufferTexture&&S.minFilter!==bt&&S.minFilter!==Rt?Math.log2(Math.max(p.width,p.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?p.mipmaps.length:1}function P(S){const p=S.target;p.removeEventListener("dispose",P),C(p),p.isVideoTexture&&f.delete(p),p.isHTMLTexture&&u.delete(p)}function x(S){const p=S.target;p.removeEventListener("dispose",x),F(p)}function C(S){const p=n.get(S);if(p.__webglInit===void 0)return;const N=S.source,L=g.get(N);if(L){const O=L[p.__cacheKey];O.usedTimes--,O.usedTimes===0&&U(S),Object.keys(L).length===0&&g.delete(N)}n.remove(S)}function U(S){const p=n.get(S);i.deleteTexture(p.__webglTexture);const N=S.source,L=g.get(N);delete L[p.__cacheKey],a.memory.textures--}function F(S){const p=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(p.__webglFramebuffer[L]))for(let O=0;O<p.__webglFramebuffer[L].length;O++)i.deleteFramebuffer(p.__webglFramebuffer[L][O]);else i.deleteFramebuffer(p.__webglFramebuffer[L]);p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer[L])}else{if(Array.isArray(p.__webglFramebuffer))for(let L=0;L<p.__webglFramebuffer.length;L++)i.deleteFramebuffer(p.__webglFramebuffer[L]);else i.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&i.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let L=0;L<p.__webglColorRenderbuffer.length;L++)p.__webglColorRenderbuffer[L]&&i.deleteRenderbuffer(p.__webglColorRenderbuffer[L]);p.__webglDepthRenderbuffer&&i.deleteRenderbuffer(p.__webglDepthRenderbuffer)}const N=S.textures;for(let L=0,O=N.length;L<O;L++){const q=n.get(N[L]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(N[L])}n.remove(S)}let V=0;function Z(){V=0}function z(){return V}function I(S){V=S}function j(){const S=V;return S>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),V+=1,S}function k(S){const p=[];return p.push(S.wrapS),p.push(S.wrapT),p.push(S.wrapR||0),p.push(S.magFilter),p.push(S.minFilter),p.push(S.anisotropy),p.push(S.internalFormat),p.push(S.format),p.push(S.type),p.push(S.generateMipmaps),p.push(S.premultiplyAlpha),p.push(S.flipY),p.push(S.unpackAlignment),p.push(S.colorSpace),p.join()}function Q(S,p){const N=n.get(S);if(S.isVideoTexture&&R(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&N.__version!==S.version){const L=S.image;if(L===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(L.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(N,S,p);return}}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+p)}function ce(S,p){const N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){Ie(N,S,p);return}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+p)}function fe(S,p){const N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){Ie(N,S,p);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+p)}function pe(S,p){const N=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&N.__version!==S.version){Ue(N,S,p);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+p)}const be={[Kr]:i.REPEAT,[mn]:i.CLAMP_TO_EDGE,[Zr]:i.MIRRORED_REPEAT},qe={[bt]:i.NEAREST,[Su]:i.NEAREST_MIPMAP_NEAREST,[Zi]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[Qs]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},we={[bu]:i.NEVER,[Cu]:i.ALWAYS,[Tu]:i.LESS,[Va]:i.LEQUAL,[wu]:i.EQUAL,[ka]:i.GEQUAL,[Au]:i.GREATER,[Ru]:i.NOTEQUAL};function He(S,p){if(p.type===nn&&e.has("OES_texture_float_linear")===!1&&(p.magFilter===Rt||p.magFilter===Qs||p.magFilter===Zi||p.magFilter===Wn||p.minFilter===Rt||p.minFilter===Qs||p.minFilter===Zi||p.minFilter===Wn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,be[p.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,be[p.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,be[p.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,qe[p.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,qe[p.minFilter]),p.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,we[p.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===bt||p.minFilter!==Zi&&p.minFilter!==Wn||p.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||n.get(p).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(S,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),n.get(p).__currentAnisotropy=p.anisotropy}}}function ae(S,p){let N=!1;S.__webglInit===void 0&&(S.__webglInit=!0,p.addEventListener("dispose",P));const L=p.source;let O=g.get(L);O===void 0&&(O={},g.set(L,O));const q=k(p);if(q!==S.__cacheKey){O[q]===void 0&&(O[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),O[q].usedTimes++;const B=O[S.__cacheKey];B!==void 0&&(O[S.__cacheKey].usedTimes--,B.usedTimes===0&&U(p)),S.__cacheKey=q,S.__webglTexture=O[q].texture}return N}function ue(S,p,N){return Math.floor(Math.floor(S/N)/p)}function re(S,p,N,L){const q=S.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,p.width,p.height,N,L,p.data);else{q.sort((le,se)=>le.start-se.start);let B=0;for(let le=1;le<q.length;le++){const se=q[B],ie=q[le],_e=se.start+se.count,Me=ue(ie.start,p.width,4),Pe=ue(se.start,p.width,4);ie.start<=_e+1&&Me===Pe&&ue(ie.start+ie.count-1,p.width,4)===Me?se.count=Math.max(se.count,ie.start+ie.count-se.start):(++B,q[B]=ie)}q.length=B+1;const D=t.getParameter(i.UNPACK_ROW_LENGTH),G=t.getParameter(i.UNPACK_SKIP_PIXELS),ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,p.width);for(let le=0,se=q.length;le<se;le++){const ie=q[le],_e=Math.floor(ie.start/4),Me=Math.ceil(ie.count/4),Pe=_e%p.width,H=Math.floor(_e/p.width),ge=Me,oe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,Pe,H,ge,oe,N,L,p.data)}S.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,D),t.pixelStorei(i.UNPACK_SKIP_PIXELS,G),t.pixelStorei(i.UNPACK_SKIP_ROWS,ee)}}function Ie(S,p,N){let L=i.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(L=i.TEXTURE_2D_ARRAY),p.isData3DTexture&&(L=i.TEXTURE_3D);const O=ae(S,p),q=p.source;t.bindTexture(L,S.__webglTexture,i.TEXTURE0+N);const B=n.get(q);if(q.version!==B.__version||O===!0){if(t.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap<"u"&&p.image instanceof ImageBitmap)===!1){const oe=je.getPrimaries(je.workingColorSpace),me=p.colorSpace===Pn?null:je.getPrimaries(p.colorSpace),ye=p.colorSpace===Pn||oe===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment);let G=m(p.image,!1,s.maxTextureSize);G=te(p,G);const ee=r.convert(p.format,p.colorSpace),le=r.convert(p.type);let se=E(p.internalFormat,ee,le,p.normalized,p.colorSpace,p.isVideoTexture);He(L,p);let ie;const _e=p.mipmaps,Me=p.isVideoTexture!==!0,Pe=B.__version===void 0||O===!0,H=q.dataReady,ge=y(p,G);if(p.isDepthTexture)se=T(p.format===Xn,p.type),Pe&&(Me?t.texStorage2D(i.TEXTURE_2D,1,se,G.width,G.height):t.texImage2D(i.TEXTURE_2D,0,se,G.width,G.height,0,ee,le,null));else if(p.isDataTexture)if(_e.length>0){Me&&Pe&&t.texStorage2D(i.TEXTURE_2D,ge,se,_e[0].width,_e[0].height);for(let oe=0,me=_e.length;oe<me;oe++)ie=_e[oe],Me?H&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,ee,le,ie.data):t.texImage2D(i.TEXTURE_2D,oe,se,ie.width,ie.height,0,ee,le,ie.data);p.generateMipmaps=!1}else Me?(Pe&&t.texStorage2D(i.TEXTURE_2D,ge,se,G.width,G.height),H&&re(p,G,ee,le)):t.texImage2D(i.TEXTURE_2D,0,se,G.width,G.height,0,ee,le,G.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){Me&&Pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,se,_e[0].width,_e[0].height,G.depth);for(let oe=0,me=_e.length;oe<me;oe++)if(ie=_e[oe],p.format!==$t)if(ee!==null)if(Me){if(H)if(p.layerUpdates.size>0){const ye=el(ie.width,ie.height,p.format,p.type);for(const de of p.layerUpdates){const Ce=ie.data.subarray(de*ye/ie.data.BYTES_PER_ELEMENT,(de+1)*ye/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,de,ie.width,ie.height,1,ee,Ce)}p.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,G.depth,ee,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,se,ie.width,ie.height,G.depth,0,ie.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,G.depth,ee,le,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,se,ie.width,ie.height,G.depth,0,ee,le,ie.data)}else{Me&&Pe&&t.texStorage2D(i.TEXTURE_2D,ge,se,_e[0].width,_e[0].height);for(let oe=0,me=_e.length;oe<me;oe++)ie=_e[oe],p.format!==$t?ee!==null?Me?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,ee,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,se,ie.width,ie.height,0,ie.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?H&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,ee,le,ie.data):t.texImage2D(i.TEXTURE_2D,oe,se,ie.width,ie.height,0,ee,le,ie.data)}else if(p.isDataArrayTexture)if(Me){if(Pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,se,G.width,G.height,G.depth),H)if(p.layerUpdates.size>0){const oe=el(G.width,G.height,p.format,p.type);for(const me of p.layerUpdates){const ye=G.data.subarray(me*oe/G.data.BYTES_PER_ELEMENT,(me+1)*oe/G.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,G.width,G.height,1,ee,le,ye)}p.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,ee,le,G.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,G.width,G.height,G.depth,0,ee,le,G.data);else if(p.isData3DTexture)Me?(Pe&&t.texStorage3D(i.TEXTURE_3D,ge,se,G.width,G.height,G.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,ee,le,G.data)):t.texImage3D(i.TEXTURE_3D,0,se,G.width,G.height,G.depth,0,ee,le,G.data);else if(p.isFramebufferTexture){if(Pe)if(Me)t.texStorage2D(i.TEXTURE_2D,ge,se,G.width,G.height);else{let oe=G.width,me=G.height;for(let ye=0;ye<ge;ye++)t.texImage2D(i.TEXTURE_2D,ye,se,oe,me,0,ee,le,null),oe>>=1,me>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in i){const oe=i.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),G.parentNode!==oe){oe.appendChild(G),u.add(p),oe.onpaint=me=>{const ye=me.changedElements;for(const de of u)ye.includes(de.image)&&(de.needsUpdate=!0)},oe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,G);else{const ye=i.RGBA,de=i.RGBA,Ce=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ye,de,Ce,G)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(_e.length>0){if(Me&&Pe){const oe=ne(_e[0]);t.texStorage2D(i.TEXTURE_2D,ge,se,oe.width,oe.height)}for(let oe=0,me=_e.length;oe<me;oe++)ie=_e[oe],Me?H&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ee,le,ie):t.texImage2D(i.TEXTURE_2D,oe,se,ee,le,ie);p.generateMipmaps=!1}else if(Me){if(Pe){const oe=ne(G);t.texStorage2D(i.TEXTURE_2D,ge,se,oe.width,oe.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee,le,G)}else t.texImage2D(i.TEXTURE_2D,0,se,ee,le,G);h(p)&&w(L),B.__version=q.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function Ue(S,p,N){if(p.image.length!==6)return;const L=ae(S,p),O=p.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+N);const q=n.get(O);if(O.version!==q.__version||L===!0){t.activeTexture(i.TEXTURE0+N);const B=je.getPrimaries(je.workingColorSpace),D=p.colorSpace===Pn?null:je.getPrimaries(p.colorSpace),G=p.colorSpace===Pn||B===D?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);const ee=p.isCompressedTexture||p.image[0].isCompressedTexture,le=p.image[0]&&p.image[0].isDataTexture,se=[];for(let de=0;de<6;de++)!ee&&!le?se[de]=m(p.image[de],!0,s.maxCubemapSize):se[de]=le?p.image[de].image:p.image[de],se[de]=te(p,se[de]);const ie=se[0],_e=r.convert(p.format,p.colorSpace),Me=r.convert(p.type),Pe=E(p.internalFormat,_e,Me,p.normalized,p.colorSpace),H=p.isVideoTexture!==!0,ge=q.__version===void 0||L===!0,oe=O.dataReady;let me=y(p,ie);He(i.TEXTURE_CUBE_MAP,p);let ye;if(ee){H&&ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Pe,ie.width,ie.height);for(let de=0;de<6;de++){ye=se[de].mipmaps;for(let Ce=0;Ce<ye.length;Ce++){const Ae=ye[Ce];p.format!==$t?_e!==null?H?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,0,0,Ae.width,Ae.height,_e,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,Pe,Ae.width,Ae.height,0,Ae.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,0,0,Ae.width,Ae.height,_e,Me,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce,Pe,Ae.width,Ae.height,0,_e,Me,Ae.data)}}}else{if(ye=p.mipmaps,H&&ge){ye.length>0&&me++;const de=ne(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Pe,de.width,de.height)}for(let de=0;de<6;de++)if(le){H?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,se[de].width,se[de].height,_e,Me,se[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Pe,se[de].width,se[de].height,0,_e,Me,se[de].data);for(let Ce=0;Ce<ye.length;Ce++){const ft=ye[Ce].image[de].image;H?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,0,0,ft.width,ft.height,_e,Me,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,Pe,ft.width,ft.height,0,_e,Me,ft.data)}}else{H?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,_e,Me,se[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Pe,_e,Me,se[de]);for(let Ce=0;Ce<ye.length;Ce++){const Ae=ye[Ce];H?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,0,0,_e,Me,Ae.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ce+1,Pe,_e,Me,Ae.image[de])}}}h(p)&&w(i.TEXTURE_CUBE_MAP),q.__version=O.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function De(S,p,N,L,O,q){const B=r.convert(N.format,N.colorSpace),D=r.convert(N.type),G=E(N.internalFormat,B,D,N.normalized,N.colorSpace),ee=n.get(p),le=n.get(N);if(le.__renderTarget=p,!ee.__hasExternalTextures){const se=Math.max(1,p.width>>q),ie=Math.max(1,p.height>>q);O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?t.texImage3D(O,q,G,se,ie,p.depth,0,B,D,null):t.texImage2D(O,q,G,se,ie,0,B,D,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),X(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,L,O,le.__webglTexture,0,st(p)):(O===i.TEXTURE_2D||O>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&O<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,L,O,le.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(S,p,N){if(i.bindRenderbuffer(i.RENDERBUFFER,S),p.depthBuffer){const L=p.depthTexture,O=L&&L.isDepthTexture?L.type:null,q=T(p.stencilBuffer,O),B=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;X(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st(p),q,p.width,p.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,st(p),q,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,q,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,S)}else{const L=p.textures;for(let O=0;O<L.length;O++){const q=L[O],B=r.convert(q.format,q.colorSpace),D=r.convert(q.type),G=E(q.internalFormat,B,D,q.normalized,q.colorSpace);X(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st(p),G,p.width,p.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,st(p),G,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,G,p.width,p.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(S,p,N){const L=p.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const O=n.get(p.depthTexture);if(O.__renderTarget=p,(!O.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),L){if(O.__webglInit===void 0&&(O.__webglInit=!0,p.depthTexture.addEventListener("dispose",P)),O.__webglTexture===void 0){O.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),He(i.TEXTURE_CUBE_MAP,p.depthTexture);const ee=r.convert(p.depthTexture.format),le=r.convert(p.depthTexture.type);let se;p.depthTexture.format===Mn?se=i.DEPTH_COMPONENT24:p.depthTexture.format===Xn&&(se=i.DEPTH24_STENCIL8);for(let ie=0;ie<6;ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,se,p.width,p.height,0,ee,le,null)}}else Q(p.depthTexture,0);const q=O.__webglTexture,B=st(p),D=L?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,G=p.depthTexture.format===Xn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(p.depthTexture.format===Mn)X(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,D,q,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,G,D,q,0);else if(p.depthTexture.format===Xn)X(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,D,q,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,G,D,q,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(S){const p=n.get(S),N=S.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==S.depthTexture){const L=S.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),L){const O=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,L.removeEventListener("dispose",O)};L.addEventListener("dispose",O),p.__depthDisposeCallback=O}p.__boundDepthTexture=L}if(S.depthTexture&&!p.__autoAllocateDepthBuffer)if(N)for(let L=0;L<6;L++)ze(p.__webglFramebuffer[L],S,L);else{const L=S.texture.mipmaps;L&&L.length>0?ze(p.__webglFramebuffer[0],S,0):ze(p.__webglFramebuffer,S,0)}else if(N){p.__webglDepthbuffer=[];for(let L=0;L<6;L++)if(t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[L]),p.__webglDepthbuffer[L]===void 0)p.__webglDepthbuffer[L]=i.createRenderbuffer(),tt(p.__webglDepthbuffer[L],S,!1);else{const O=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=p.__webglDepthbuffer[L];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,O,i.RENDERBUFFER,q)}}else{const L=S.texture.mipmaps;if(L&&L.length>0?t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=i.createRenderbuffer(),tt(p.__webglDepthbuffer,S,!1);else{const O=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=p.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,O,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(S,p,N){const L=n.get(S);p!==void 0&&De(L.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ke(S)}function Ve(S){const p=S.texture,N=n.get(S),L=n.get(p);S.addEventListener("dispose",x);const O=S.textures,q=S.isWebGLCubeRenderTarget===!0,B=O.length>1;if(B||(L.__webglTexture===void 0&&(L.__webglTexture=i.createTexture()),L.__version=p.version,a.memory.textures++),q){N.__webglFramebuffer=[];for(let D=0;D<6;D++)if(p.mipmaps&&p.mipmaps.length>0){N.__webglFramebuffer[D]=[];for(let G=0;G<p.mipmaps.length;G++)N.__webglFramebuffer[D][G]=i.createFramebuffer()}else N.__webglFramebuffer[D]=i.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){N.__webglFramebuffer=[];for(let D=0;D<p.mipmaps.length;D++)N.__webglFramebuffer[D]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(B)for(let D=0,G=O.length;D<G;D++){const ee=n.get(O[D]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&X(S)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let D=0;D<O.length;D++){const G=O[D];N.__webglColorRenderbuffer[D]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[D]);const ee=r.convert(G.format,G.colorSpace),le=r.convert(G.type),se=E(G.internalFormat,ee,le,G.normalized,G.colorSpace,S.isXRRenderTarget===!0),ie=st(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,se,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+D,i.RENDERBUFFER,N.__webglColorRenderbuffer[D])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),tt(N.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture),He(i.TEXTURE_CUBE_MAP,p);for(let D=0;D<6;D++)if(p.mipmaps&&p.mipmaps.length>0)for(let G=0;G<p.mipmaps.length;G++)De(N.__webglFramebuffer[D][G],S,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+D,G);else De(N.__webglFramebuffer[D],S,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);h(p)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(B){for(let D=0,G=O.length;D<G;D++){const ee=O[D],le=n.get(ee);let se=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(se=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,le.__webglTexture),He(se,ee),De(N.__webglFramebuffer,S,ee,i.COLOR_ATTACHMENT0+D,se,0),h(ee)&&w(se)}t.unbindTexture()}else{let D=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(D=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(D,L.__webglTexture),He(D,p),p.mipmaps&&p.mipmaps.length>0)for(let G=0;G<p.mipmaps.length;G++)De(N.__webglFramebuffer[G],S,p,i.COLOR_ATTACHMENT0,D,G);else De(N.__webglFramebuffer,S,p,i.COLOR_ATTACHMENT0,D,0);h(p)&&w(D),t.unbindTexture()}S.depthBuffer&&Ke(S)}function ot(S){const p=S.textures;for(let N=0,L=p.length;N<L;N++){const O=p[N];if(h(O)){const q=A(S),B=n.get(O).__webglTexture;t.bindTexture(q,B),w(q),t.unbindTexture()}}}const ct=[],ht=[];function gt(S){if(S.samples>0){if(X(S)===!1){const p=S.textures,N=S.width,L=S.height;let O=i.COLOR_BUFFER_BIT;const q=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=n.get(S),D=p.length>1;if(D)for(let ee=0;ee<p.length;ee++)t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,B.__webglMultisampledFramebuffer);const G=S.texture.mipmaps;G&&G.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer);for(let ee=0;ee<p.length;ee++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(O|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(O|=i.STENCIL_BUFFER_BIT)),D){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,B.__webglColorRenderbuffer[ee]);const le=n.get(p[ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,N,L,0,0,N,L,O,i.NEAREST),c===!0&&(ct.length=0,ht.length=0,ct.push(i.COLOR_ATTACHMENT0+ee),S.depthBuffer&&S.resolveDepthBuffer===!1&&(ct.push(q),ht.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ht)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),D)for(let ee=0;ee<p.length;ee++){t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,B.__webglColorRenderbuffer[ee]);const le=n.get(p[ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&c){const p=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[p])}}}function st(S){return Math.min(s.maxSamples,S.samples)}function X(S){const p=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function R(S){const p=a.render.frame;f.get(S)!==p&&(f.set(S,p),S.update())}function te(S,p){const N=S.colorSpace,L=S.format,O=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||N!==Fs&&N!==Pn&&(je.getTransfer(N)===Qe?(L!==$t||O!==Gt)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",N)),p}function ne(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(l.width=S.naturalWidth||S.width,l.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(l.width=S.displayWidth,l.height=S.displayHeight):(l.width=S.width,l.height=S.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=Z,this.getTextureUnits=z,this.setTextureUnits=I,this.setTexture2D=Q,this.setTexture2DArray=ce,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=We,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=De,this.useMultisampledRTT=X,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function t0(i,e){function t(n,s=Pn){let r;const a=je.getTransfer(s);if(n===Gt)return i.UNSIGNED_BYTE;if(n===Oa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ba)return i.UNSIGNED_SHORT_5_5_5_1;if(n===cc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===oc)return i.BYTE;if(n===lc)return i.SHORT;if(n===Vi)return i.UNSIGNED_SHORT;if(n===Fa)return i.INT;if(n===on)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===vn)return i.HALF_FLOAT;if(n===uc)return i.ALPHA;if(n===hc)return i.RGB;if(n===$t)return i.RGBA;if(n===Mn)return i.DEPTH_COMPONENT;if(n===Xn)return i.DEPTH_STENCIL;if(n===fc)return i.RED;if(n===za)return i.RED_INTEGER;if(n===Kn)return i.RG;if(n===Ga)return i.RG_INTEGER;if(n===Ha)return i.RGBA_INTEGER;if(n===ws||n===As||n===Rs||n===Cs)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ws)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===As)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ws)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===As)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jr||n===Qr||n===ea||n===ta)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===na||n===ia||n===sa||n===ra||n===aa||n===Is||n===oa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===na||n===ia)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ra)return r.COMPRESSED_R11_EAC;if(n===aa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Is)return r.COMPRESSED_RG11_EAC;if(n===oa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===la||n===ca||n===da||n===ua||n===ha||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===va||n===Ma||n===Sa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===la)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ca)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===da)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ua)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ha)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ga)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_a)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===va)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ya||n===Ea||n===ba)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ya)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ea)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ta||n===wa||n===Us||n===Aa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ta)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Us)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Aa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const n0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i0=`
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

}`;class s0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new bc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ln({vertexShader:n0,fragmentShader:i0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r0 extends Qn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,f=null,u=null,d=null,g=null,v=null;const M=typeof XRWebGLBinding<"u",m=new s0,h={},w=t.getContextAttributes();let A=null,E=null;const T=[],y=[],P=new $e;let x=null;const C=new Ut;C.viewport=new dt;const U=new Ut;U.viewport=new dt;const F=[C,U],V=new ph;let Z=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let ue=T[ae];return ue===void 0&&(ue=new or,T[ae]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(ae){let ue=T[ae];return ue===void 0&&(ue=new or,T[ae]=ue),ue.getGripSpace()},this.getHand=function(ae){let ue=T[ae];return ue===void 0&&(ue=new or,T[ae]=ue),ue.getHandSpace()};function I(ae){const ue=y.indexOf(ae.inputSource);if(ue===-1)return;const re=T[ue];re!==void 0&&(re.update(ae.inputSource,ae.frame,l||a),re.dispatchEvent({type:ae.type,data:ae.inputSource}))}function j(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",k);for(let ae=0;ae<T.length;ae++){const ue=y[ae];ue!==null&&(y[ae]=null,T[ae].disconnect(ue))}Z=null,z=null,m.reset();for(const ae in h)delete h[ae];e.setRenderTarget(A),g=null,d=null,u=null,s=null,E=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,n.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){o=ae,n.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ae){l=ae},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",j),s.addEventListener("inputsourceschange",k),w.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(P),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ie=null,Ue=null;w.depth&&(Ue=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=w.stencil?Xn:Mn,Ie=w.stencil?ki:on);const De={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(De),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new an(d.textureWidth,d.textureHeight,{format:$t,type:Gt,depthTexture:new bi(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),E=new an(g.framebufferWidth,g.framebufferHeight,{format:$t,type:Gt,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),He.setContext(s),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(ae){for(let ue=0;ue<ae.removed.length;ue++){const re=ae.removed[ue],Ie=y.indexOf(re);Ie>=0&&(y[Ie]=null,T[Ie].disconnect(re))}for(let ue=0;ue<ae.added.length;ue++){const re=ae.added[ue];let Ie=y.indexOf(re);if(Ie===-1){for(let De=0;De<T.length;De++)if(De>=y.length){y.push(re),Ie=De;break}else if(y[De]===null){y[De]=re,Ie=De;break}if(Ie===-1)break}const Ue=T[Ie];Ue&&Ue.connect(re)}}const Q=new Y,ce=new Y;function fe(ae,ue,re){Q.setFromMatrixPosition(ue.matrixWorld),ce.setFromMatrixPosition(re.matrixWorld);const Ie=Q.distanceTo(ce),Ue=ue.projectionMatrix.elements,De=re.projectionMatrix.elements,tt=Ue[14]/(Ue[10]-1),ze=Ue[14]/(Ue[10]+1),Ke=(Ue[9]+1)/Ue[5],We=(Ue[9]-1)/Ue[5],Ve=(Ue[8]-1)/Ue[0],ot=(De[8]+1)/De[0],ct=tt*Ve,ht=tt*ot,gt=Ie/(-Ve+ot),st=gt*-Ve;if(ue.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(st),ae.translateZ(gt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Ue[10]===-1)ae.projectionMatrix.copy(ue.projectionMatrix),ae.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const X=tt+gt,R=ze+gt,te=ct-st,ne=ht+(Ie-st),S=Ke*ze/R*X,p=We*ze/R*X;ae.projectionMatrix.makePerspective(te,ne,S,p,X,R),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function pe(ae,ue){ue===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(ue.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let ue=ae.near,re=ae.far;m.texture!==null&&(m.depthNear>0&&(ue=m.depthNear),m.depthFar>0&&(re=m.depthFar)),V.near=U.near=C.near=ue,V.far=U.far=C.far=re,(Z!==V.near||z!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),Z=V.near,z=V.far),V.layers.mask=ae.layers.mask|6,C.layers.mask=V.layers.mask&-5,U.layers.mask=V.layers.mask&-3;const Ie=ae.parent,Ue=V.cameras;pe(V,Ie);for(let De=0;De<Ue.length;De++)pe(Ue[De],Ie);Ue.length===2?fe(V,C,U):V.projectionMatrix.copy(C.projectionMatrix),be(ae,V,Ie)};function be(ae,ue,re){re===null?ae.matrix.copy(ue.matrixWorld):(ae.matrix.copy(re.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(ue.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(ue.projectionMatrix),ae.projectionMatrixInverse.copy(ue.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Ca*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(ae){c=ae,d!==null&&(d.fixedFoveation=ae),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ae)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(ae){return h[ae]};let qe=null;function we(ae,ue){if(f=ue.getViewerPose(l||a),v=ue,f!==null){const re=f.views;g!==null&&(e.setRenderTargetFramebuffer(E,g.framebuffer),e.setRenderTarget(E));let Ie=!1;re.length!==V.cameras.length&&(V.cameras.length=0,Ie=!0);for(let ze=0;ze<re.length;ze++){const Ke=re[ze];let We=null;if(g!==null)We=g.getViewport(Ke);else{const ot=u.getViewSubImage(d,Ke);We=ot.viewport,ze===0&&(e.setRenderTargetTextures(E,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(E))}let Ve=F[ze];Ve===void 0&&(Ve=new Ut,Ve.layers.enable(ze),Ve.viewport=new dt,F[ze]=Ve),Ve.matrix.fromArray(Ke.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ke.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(We.x,We.y,We.width,We.height),ze===0&&(V.matrix.copy(Ve.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Ie===!0&&V.cameras.push(Ve)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const ze=u.getDepthInformation(re[0]);ze&&ze.isValid&&ze.texture&&m.init(ze,s.renderState)}if(Ue&&Ue.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let ze=0;ze<re.length;ze++){const Ke=re[ze].camera;if(Ke){let We=h[Ke];We||(We=new bc,h[Ke]=We);const Ve=u.getCameraImage(Ke);We.sourceTexture=Ve}}}}for(let re=0;re<T.length;re++){const Ie=y[re],Ue=T[re];Ie!==null&&Ue!==void 0&&Ue.update(Ie,ue,l||a)}qe&&qe(ae,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),v=null}const He=new Pc;He.setAnimationLoop(we),this.setAnimationLoop=function(ae){qe=ae},this.dispose=function(){}}}const a0=new ut,Oc=new Oe;Oc.set(-1,0,0,0,1,0,0,0,1);function o0(i,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,Tc(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,w,A,E){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(m,h):h.isMeshLambertMaterial?(r(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(m,h),u(m,h)):h.isMeshPhongMaterial?(r(m,h),f(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(m,h),d(m,h),h.isMeshPhysicalMaterial&&g(m,h,E)):h.isMeshMatcapMaterial?(r(m,h),v(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),M(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?c(m,h,w,A):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Ft&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Ft&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const w=e.get(h),A=w.envMap,E=w.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(a0.makeRotationFromEuler(E)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Oc),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,w,A){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*w,m.scale.value=A*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function f(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function u(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function g(m,h,w){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ft&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,h){h.matcap&&(m.matcap.value=h.matcap)}function M(m,h){const w=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function l0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,T){const y=T.program;n.uniformBlockBinding(E,y)}function l(E,T){let y=s[E.id];y===void 0&&(m(E),y=f(E),s[E.id]=y,E.addEventListener("dispose",w));const P=T.program;n.updateUBOMapping(E,P);const x=e.render.frame;r[E.id]!==x&&(d(E),r[E.id]=x)}function f(E){const T=u();E.__bindingPointIndex=T;const y=i.createBuffer(),P=E.__size,x=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,P,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,y),y}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const T=s[E.id],y=E.uniforms,P=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let x=0,C=y.length;x<C;x++){const U=y[x];if(Array.isArray(U))for(let F=0,V=U.length;F<V;F++)g(U[F],x,F,P);else g(U,x,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(E,T,y,P){if(M(E,T,y,P)===!0){const x=E.__offset,C=E.value;if(Array.isArray(C)){let U=0;for(let F=0;F<C.length;F++){const V=C[F],Z=h(V);v(V,E.__data,U),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(U+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(C,E.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,E.__data)}}function v(E,T,y){typeof E=="number"||typeof E=="boolean"?T[0]=E:E.isMatrix3?(T[0]=E.elements[0],T[1]=E.elements[1],T[2]=E.elements[2],T[3]=0,T[4]=E.elements[3],T[5]=E.elements[4],T[6]=E.elements[5],T[7]=0,T[8]=E.elements[6],T[9]=E.elements[7],T[10]=E.elements[8],T[11]=0):ArrayBuffer.isView(E)?T.set(new E.constructor(E.buffer,E.byteOffset,T.length)):E.toArray(T,y)}function M(E,T,y,P){const x=E.value,C=T+"_"+y;if(P[C]===void 0)return typeof x=="number"||typeof x=="boolean"?P[C]=x:ArrayBuffer.isView(x)?P[C]=x.slice():P[C]=x.clone(),!0;{const U=P[C];if(typeof x=="number"||typeof x=="boolean"){if(U!==x)return P[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(U.equals(x)===!1)return U.copy(x),!0}}return!1}function m(E){const T=E.uniforms;let y=0;const P=16;for(let C=0,U=T.length;C<U;C++){const F=Array.isArray(T[C])?T[C]:[T[C]];for(let V=0,Z=F.length;V<Z;V++){const z=F[V],I=Array.isArray(z.value)?z.value:[z.value];for(let j=0,k=I.length;j<k;j++){const Q=I[j],ce=h(Q),fe=y%P,pe=fe%ce.boundary,be=fe+pe;y+=pe,be!==0&&P-be<ce.storage&&(y+=P-be),z.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=ce.storage}}}const x=y%P;return x>0&&(y+=P-x),E.__size=y,E.__cache={},this}function h(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(T.boundary=16,T.storage=E.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",E),T}function w(E){const T=E.target;T.removeEventListener("dispose",w);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function A(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}const c0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let en=null;function d0(){return en===null&&(en=new Qu(c0,16,16,Kn,vn),en.name="DFG_LUT",en.minFilter=Rt,en.magFilter=Rt,en.wrapS=mn,en.wrapT=mn,en.generateMipmaps=!1,en.needsUpdate=!0),en}class Bc{constructor(e={}){const{canvas:t=Nu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:g=Gt}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;const M=g,m=new Set([Ha,Ga,za]),h=new Set([Gt,on,Vi,ki,Oa,Ba]),w=new Uint32Array(4),A=new Int32Array(4),E=new Y;let T=null,y=null;const P=[],x=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let F=!1,V=null,Z=null,z=null,I=null;this._outputColorSpace=kt;let j=0,k=0,Q=null,ce=-1,fe=null;const pe=new dt,be=new dt;let qe=null;const we=new Xe(0);let He=0,ae=t.width,ue=t.height,re=1,Ie=null,Ue=null;const De=new dt(0,0,ae,ue),tt=new dt(0,0,ae,ue);let ze=!1;const Ke=new Xa;let We=!1,Ve=!1;const ot=new ut,ct=new Y,ht=new dt,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function X(){return Q===null?re:1}let R=n;function te(b,W){return t.getContext(b,W)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ua}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Kt,!1),R===null){const W="webgl2";if(R=te(W,b),R===null)throw te(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Je("WebGLRenderer: "+b.message),b}let ne,S,p,N,L,O,q,B,D,G,ee,le,se,ie,_e,Me,Pe,H,ge,oe,me,ye,de;function Ce(){ne=new dm(R),ne.init(),me=new t0(R,ne),S=new nm(R,ne,e,me),p=new Qg(R,ne),S.reversedDepthBuffer&&d&&p.buffers.depth.setReversed(!0),Z=R.createFramebuffer(),z=R.createFramebuffer(),I=R.createFramebuffer(),N=new fm(R),L=new zg,O=new e0(R,ne,p,L,S,me,N),q=new cm(U),B=new gh(R),ye=new em(R,B),D=new um(R,B,N,ye),G=new mm(R,D,B,ye,N),H=new pm(R,S,O),_e=new im(L),ee=new Bg(U,q,ne,S,ye,_e),le=new o0(U,L),se=new Hg,ie=new jg(ne),Pe=new Qp(U,q,p,G,v,c),Me=new Jg(U,G,S),de=new l0(R,N,S,p),ge=new tm(R,ne,N),oe=new hm(R,ne,N),N.programs=ee.programs,U.capabilities=S,U.extensions=ne,U.properties=L,U.renderLists=se,U.shadowMap=Me,U.state=p,U.info=N}Ce(),M!==Gt&&(C=new _m(M,t.width,t.height,o,s,r));const Ae=new r0(U,R);this.xr=Ae,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const b=ne.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ne.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(b){b!==void 0&&(re=b,this.setSize(ae,ue,!1))},this.getSize=function(b){return b.set(ae,ue)},this.setSize=function(b,W,J=!0){if(Ae.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=b,ue=W,t.width=Math.floor(b*re),t.height=Math.floor(W*re),J===!0&&(t.style.width=b+"px",t.style.height=W+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(ae*re,ue*re).floor()},this.setDrawingBufferSize=function(b,W,J){ae=b,ue=W,re=J,t.width=Math.floor(b*J),t.height=Math.floor(W*J),this.setViewport(0,0,b,W)},this.setEffects=function(b){if(M===Gt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let W=0;W<b.length;W++)if(b[W].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(pe)},this.getViewport=function(b){return b.copy(De)},this.setViewport=function(b,W,J,$){b.isVector4?De.set(b.x,b.y,b.z,b.w):De.set(b,W,J,$),p.viewport(pe.copy(De).multiplyScalar(re).round())},this.getScissor=function(b){return b.copy(tt)},this.setScissor=function(b,W,J,$){b.isVector4?tt.set(b.x,b.y,b.z,b.w):tt.set(b,W,J,$),p.scissor(be.copy(tt).multiplyScalar(re).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(b){p.setScissorTest(ze=b)},this.setOpaqueSort=function(b){Ie=b},this.setTransparentSort=function(b){Ue=b},this.getClearColor=function(b){return b.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(b=!0,W=!0,J=!0){let $=0;if(b){let K=!1;if(Q!==null){const Se=Q.texture.format;K=m.has(Se)}if(K){const Se=Q.texture.type,Te=h.has(Se),ve=Pe.getClearColor(),Re=Pe.getClearAlpha(),Ne=ve.r,Be=ve.g,ke=ve.b;Te?(w[0]=Ne,w[1]=Be,w[2]=ke,w[3]=Re,R.clearBufferuiv(R.COLOR,0,w)):(A[0]=Ne,A[1]=Be,A[2]=ke,A[3]=Re,R.clearBufferiv(R.COLOR,0,A))}else $|=R.COLOR_BUFFER_BIT}W&&($|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&($|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&R.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),V=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Kt,!1),Pe.dispose(),se.dispose(),ie.dispose(),L.dispose(),q.dispose(),G.dispose(),ye.dispose(),de.dispose(),ee.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",to),Ae.removeEventListener("sessionend",no),Un.stop()};function ft(b){b.preventDefault(),No("WebGLRenderer: Context Lost."),F=!0}function rt(){No("WebGLRenderer: Context Restored."),F=!1;const b=N.autoReset,W=Me.enabled,J=Me.autoUpdate,$=Me.needsUpdate,K=Me.type;Ce(),N.autoReset=b,Me.enabled=W,Me.autoUpdate=J,Me.needsUpdate=$,Me.type=K}function Kt(b){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Zt(b){const W=b.target;W.removeEventListener("dispose",Zt),Vc(W)}function Vc(b){kc(b),L.remove(b)}function kc(b){const W=L.get(b).programs;W!==void 0&&(W.forEach(function(J){ee.releaseProgram(J)}),b.isShaderMaterial&&ee.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,J,$,K,Se){W===null&&(W=gt);const Te=K.isMesh&&K.matrixWorld.determinantAffine()<0,ve=qc(b,W,J,$,K);p.setMaterial($,Te);let Re=J.index,Ne=1;if($.wireframe===!0){if(Re=D.getWireframeAttribute(J),Re===void 0)return;Ne=2}const Be=J.drawRange,ke=J.attributes.position;let Le=Be.start*Ne,et=(Be.start+Be.count)*Ne;Se!==null&&(Le=Math.max(Le,Se.start*Ne),et=Math.min(et,(Se.start+Se.count)*Ne)),Re!==null?(Le=Math.max(Le,0),et=Math.min(et,Re.count)):ke!=null&&(Le=Math.max(Le,0),et=Math.min(et,ke.count));const _t=et-Le;if(_t<0||_t===1/0)return;ye.setup(K,$,ve,J,Re);let pt,nt=ge;if(Re!==null&&(pt=B.get(Re),nt=oe,nt.setIndex(pt)),K.isMesh)$.wireframe===!0?(p.setLineWidth($.wireframeLinewidth*X()),nt.setMode(R.LINES)):nt.setMode(R.TRIANGLES);else if(K.isLine){let Tt=$.linewidth;Tt===void 0&&(Tt=1),p.setLineWidth(Tt*X()),K.isLineSegments?nt.setMode(R.LINES):K.isLineLoop?nt.setMode(R.LINE_LOOP):nt.setMode(R.LINE_STRIP)}else K.isPoints?nt.setMode(R.POINTS):K.isSprite&&nt.setMode(R.TRIANGLES);if(K.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))nt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Tt=K._multiDrawStarts,Ee=K._multiDrawCounts,Ot=K._multiDrawCount,Ze=Re?B.get(Re).bytesPerElement:1,Ht=L.get($).currentProgram.getUniforms();for(let Jt=0;Jt<Ot;Jt++)Ht.setValue(R,"_gl_DrawID",Jt),nt.render(Tt[Jt]/Ze,Ee[Jt])}else if(K.isInstancedMesh)nt.renderInstances(Le,_t,K.count);else if(J.isInstancedBufferGeometry){const Tt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ee=Math.min(J.instanceCount,Tt);nt.renderInstances(Le,_t,Ee)}else nt.render(Le,_t)};function eo(b,W,J){b.transparent===!0&&b.side===pn&&b.forceSinglePass===!1?(b.side=Ft,b.needsUpdate=!0,Ki(b,W,J),b.side=Dn,b.needsUpdate=!0,Ki(b,W,J),b.side=pn):Ki(b,W,J)}this.compile=function(b,W,J=null){J===null&&(J=b),y=ie.get(J),y.init(W),x.push(y),J.traverseVisible(function(K){K.isLight&&K.layers.test(W.layers)&&(y.pushLight(K),K.castShadow&&y.pushShadow(K))}),b!==J&&b.traverseVisible(function(K){K.isLight&&K.layers.test(W.layers)&&(y.pushLight(K),K.castShadow&&y.pushShadow(K))}),y.setupLights();const $=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Se=K.material;if(Se)if(Array.isArray(Se))for(let Te=0;Te<Se.length;Te++){const ve=Se[Te];eo(ve,J,K),$.add(ve)}else eo(Se,J,K),$.add(Se)}),y=x.pop(),$},this.compileAsync=function(b,W,J=null){const $=this.compile(b,W,J);return new Promise(K=>{function Se(){if($.forEach(function(Te){L.get(Te).currentProgram.isReady()&&$.delete(Te)}),$.size===0){K(b);return}setTimeout(Se,10)}ne.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Ys=null;function Wc(b){Ys&&Ys(b)}function to(){Un.stop()}function no(){Un.start()}const Un=new Pc;Un.setAnimationLoop(Wc),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(b){Ys=b,Ae.setAnimationLoop(b),b===null?Un.stop():Un.start()},Ae.addEventListener("sessionstart",to),Ae.addEventListener("sessionend",no),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;V!==null&&V.renderStart(b,W);const J=Ae.enabled===!0&&Ae.isPresenting===!0,$=C!==null&&(Q===null||J)&&C.begin(U,Q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(W),W=Ae.getCamera()),b.isScene===!0&&b.onBeforeRender(U,b,W,Q),y=ie.get(b,x.length),y.init(W),y.state.textureUnits=O.getTextureUnits(),x.push(y),ot.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Ke.setFromProjectionMatrix(ot,sn,W.reversedDepth),Ve=this.localClippingEnabled,We=_e.init(this.clippingPlanes,Ve),T=se.get(b,P.length),T.init(),P.push(T),Ae.enabled===!0&&Ae.isPresenting===!0){const Te=U.xr.getDepthSensingMesh();Te!==null&&$s(Te,W,-1/0,U.sortObjects)}$s(b,W,0,U.sortObjects),T.finish(),U.sortObjects===!0&&T.sort(Ie,Ue,W.reversedDepth),st=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,st&&Pe.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),We===!0&&_e.beginShadows();const K=y.state.shadowsArray;if(Me.render(K,b,W),We===!0&&_e.endShadows(),($&&C.hasRenderPass())===!1){const Te=T.opaque,ve=T.transmissive;if(y.setupLights(),W.isArrayCamera){const Re=W.cameras;if(ve.length>0)for(let Ne=0,Be=Re.length;Ne<Be;Ne++){const ke=Re[Ne];so(Te,ve,b,ke)}st&&Pe.render(b);for(let Ne=0,Be=Re.length;Ne<Be;Ne++){const ke=Re[Ne];io(T,b,ke,ke.viewport)}}else ve.length>0&&so(Te,ve,b,W),st&&Pe.render(b),io(T,b,W)}Q!==null&&k===0&&(O.updateMultisampleRenderTarget(Q),O.updateRenderTargetMipmap(Q)),$&&C.end(U),b.isScene===!0&&b.onAfterRender(U,b,W),ye.resetDefaultState(),ce=-1,fe=null,x.pop(),x.length>0?(y=x[x.length-1],O.setTextureUnits(y.state.textureUnits),We===!0&&_e.setGlobalState(U.clippingPlanes,y.state.camera)):y=null,P.pop(),P.length>0?T=P[P.length-1]:T=null,V!==null&&V.renderEnd()};function $s(b,W,J,$){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLightProbeGrid)y.pushLightProbeGrid(b);else if(b.isLight)y.pushLight(b),b.castShadow&&y.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ke.intersectsSprite(b)){$&&ht.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ot);const Te=G.update(b),ve=b.material;ve.visible&&T.push(b,Te,ve,J,ht.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ke.intersectsObject(b))){const Te=G.update(b),ve=b.material;if($&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ht.copy(b.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ht.copy(Te.boundingSphere.center)),ht.applyMatrix4(b.matrixWorld).applyMatrix4(ot)),Array.isArray(ve)){const Re=Te.groups;for(let Ne=0,Be=Re.length;Ne<Be;Ne++){const ke=Re[Ne],Le=ve[ke.materialIndex];Le&&Le.visible&&T.push(b,Te,Le,J,ht.z,ke)}}else ve.visible&&T.push(b,Te,ve,J,ht.z,null)}}const Se=b.children;for(let Te=0,ve=Se.length;Te<ve;Te++)$s(Se[Te],W,J,$)}function io(b,W,J,$){const{opaque:K,transmissive:Se,transparent:Te}=b;y.setupLightsView(J),We===!0&&_e.setGlobalState(U.clippingPlanes,J),$&&p.viewport(pe.copy($)),K.length>0&&$i(K,W,J),Se.length>0&&$i(Se,W,J),Te.length>0&&$i(Te,W,J),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function so(b,W,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[$.id]===void 0){const Le=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[$.id]=new an(1,1,{generateMipmaps:!0,type:Le?vn:Gt,minFilter:Wn,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const Se=y.state.transmissionRenderTarget[$.id],Te=$.viewport||pe;Se.setSize(Te.z*U.transmissionResolutionScale,Te.w*U.transmissionResolutionScale);const ve=U.getRenderTarget(),Re=U.getActiveCubeFace(),Ne=U.getActiveMipmapLevel();U.setRenderTarget(Se),U.getClearColor(we),He=U.getClearAlpha(),He<1&&U.setClearColor(16777215,.5),U.clear(),st&&Pe.render(J);const Be=U.toneMapping;U.toneMapping=rn;const ke=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),y.setupLightsView($),We===!0&&_e.setGlobalState(U.clippingPlanes,$),$i(b,J,$),O.updateMultisampleRenderTarget(Se),O.updateRenderTargetMipmap(Se),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let et=0,_t=W.length;et<_t;et++){const pt=W[et],{object:nt,geometry:Tt,material:Ee,group:Ot}=pt;if(Ee.side===pn&&nt.layers.test($.layers)){const Ze=Ee.side;Ee.side=Ft,Ee.needsUpdate=!0,ro(nt,J,$,Tt,Ee,Ot),Ee.side=Ze,Ee.needsUpdate=!0,Le=!0}}Le===!0&&(O.updateMultisampleRenderTarget(Se),O.updateRenderTargetMipmap(Se))}U.setRenderTarget(ve,Re,Ne),U.setClearColor(we,He),ke!==void 0&&($.viewport=ke),U.toneMapping=Be}function $i(b,W,J){const $=W.isScene===!0?W.overrideMaterial:null;for(let K=0,Se=b.length;K<Se;K++){const Te=b[K],{object:ve,geometry:Re,group:Ne}=Te;let Be=Te.material;Be.allowOverride===!0&&$!==null&&(Be=$),ve.layers.test(J.layers)&&ro(ve,W,J,Re,Be,Ne)}}function ro(b,W,J,$,K,Se){b.onBeforeRender(U,W,J,$,K,Se),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(U,W,J,$,b,Se),K.transparent===!0&&K.side===pn&&K.forceSinglePass===!1?(K.side=Ft,K.needsUpdate=!0,U.renderBufferDirect(J,W,$,K,b,Se),K.side=Dn,K.needsUpdate=!0,U.renderBufferDirect(J,W,$,K,b,Se),K.side=pn):U.renderBufferDirect(J,W,$,K,b,Se),b.onAfterRender(U,W,J,$,K,Se)}function Ki(b,W,J){W.isScene!==!0&&(W=gt);const $=L.get(b),K=y.state.lights,Se=y.state.shadowsArray,Te=K.state.version,ve=ee.getParameters(b,K.state,Se,W,J,y.state.lightProbeGridArray),Re=ee.getProgramCacheKey(ve);let Ne=$.programs;$.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?W.environment:null,$.fog=W.fog;const Be=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;$.envMap=q.get(b.envMap||$.environment,Be),$.envMapRotation=$.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,Ne===void 0&&(b.addEventListener("dispose",Zt),Ne=new Map,$.programs=Ne);let ke=Ne.get(Re);if(ke!==void 0){if($.currentProgram===ke&&$.lightsStateVersion===Te)return oo(b,ve),ke}else ve.uniforms=ee.getUniforms(b),V!==null&&b.isNodeMaterial&&V.build(b,J,ve),b.onBeforeCompile(ve,U),ke=ee.acquireProgram(ve,Re),Ne.set(Re,ke),$.uniforms=ve.uniforms;const Le=$.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Le.clippingPlanes=_e.uniform),oo(b,ve),$.needsLights=Yc(b),$.lightsStateVersion=Te,$.needsLights&&(Le.ambientLightColor.value=K.state.ambient,Le.lightProbe.value=K.state.probe,Le.directionalLights.value=K.state.directional,Le.directionalLightShadows.value=K.state.directionalShadow,Le.spotLights.value=K.state.spot,Le.spotLightShadows.value=K.state.spotShadow,Le.rectAreaLights.value=K.state.rectArea,Le.ltc_1.value=K.state.rectAreaLTC1,Le.ltc_2.value=K.state.rectAreaLTC2,Le.pointLights.value=K.state.point,Le.pointLightShadows.value=K.state.pointShadow,Le.hemisphereLights.value=K.state.hemi,Le.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Le.spotLightMatrix.value=K.state.spotLightMatrix,Le.spotLightMap.value=K.state.spotLightMap,Le.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=y.state.lightProbeGridArray.length>0,$.currentProgram=ke,$.uniformsList=null,ke}function ao(b){if(b.uniformsList===null){const W=b.currentProgram.getUniforms();b.uniformsList=Ps.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function oo(b,W){const J=L.get(b);J.outputColorSpace=W.outputColorSpace,J.batching=W.batching,J.batchingColor=W.batchingColor,J.instancing=W.instancing,J.instancingColor=W.instancingColor,J.instancingMorph=W.instancingMorph,J.skinning=W.skinning,J.morphTargets=W.morphTargets,J.morphNormals=W.morphNormals,J.morphColors=W.morphColors,J.morphTargetsCount=W.morphTargetsCount,J.numClippingPlanes=W.numClippingPlanes,J.numIntersection=W.numClipIntersection,J.vertexAlphas=W.vertexAlphas,J.vertexTangents=W.vertexTangents,J.toneMapping=W.toneMapping}function Xc(b,W){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;E.setFromMatrixPosition(W.matrixWorld);for(let J=0,$=b.length;J<$;J++){const K=b[J];if(K.texture!==null&&K.boundingBox.containsPoint(E))return K}return null}function qc(b,W,J,$,K){W.isScene!==!0&&(W=gt),O.resetTextureUnits();const Se=W.fog,Te=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?W.environment:null,ve=Q===null?U.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:je.workingColorSpace,Re=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ne=q.get($.envMap||Te,Re),Be=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ke=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Le=!!J.morphAttributes.position,et=!!J.morphAttributes.normal,_t=!!J.morphAttributes.color;let pt=rn;$.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(pt=U.toneMapping);const nt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Tt=nt!==void 0?nt.length:0,Ee=L.get($),Ot=y.state.lights;if(We===!0&&(Ve===!0||b!==fe)){const at=b===fe&&$.id===ce;_e.setState($,b,at)}let Ze=!1;$.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ot.state.version||Ee.outputColorSpace!==ve||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==Ne||$.fog===!0&&Ee.fog!==Se||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==_e.numPlanes||Ee.numIntersection!==_e.numIntersection)||Ee.vertexAlphas!==Be||Ee.vertexTangents!==ke||Ee.morphTargets!==Le||Ee.morphNormals!==et||Ee.morphColors!==_t||Ee.toneMapping!==pt||Ee.morphTargetsCount!==Tt||!!Ee.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,Ee.__version=$.version);let Ht=Ee.currentProgram;Ze===!0&&(Ht=Ki($,W,K),V&&$.isNodeMaterial&&V.onUpdateProgram($,Ht,Ee));let Jt=!1,Sn=!1,ei=!1;const it=Ht.getUniforms(),xt=Ee.uniforms;if(p.useProgram(Ht.program)&&(Jt=!0,Sn=!0,ei=!0),$.id!==ce&&(ce=$.id,Sn=!0),Ee.needsLights){const at=Xc(y.state.lightProbeGridArray,K);Ee.lightProbeGrid!==at&&(Ee.lightProbeGrid=at,Sn=!0)}if(Jt||fe!==b){p.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),it.setValue(R,"projectionMatrix",b.projectionMatrix),it.setValue(R,"viewMatrix",b.matrixWorldInverse);const En=it.map.cameraPosition;En!==void 0&&En.setValue(R,ct.setFromMatrixPosition(b.matrixWorld)),S.logarithmicDepthBuffer&&it.setValue(R,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&it.setValue(R,"isOrthographic",b.isOrthographicCamera===!0),fe!==b&&(fe=b,Sn=!0,ei=!0)}if(Ee.needsLights&&(Ot.state.directionalShadowMap.length>0&&it.setValue(R,"directionalShadowMap",Ot.state.directionalShadowMap,O),Ot.state.spotShadowMap.length>0&&it.setValue(R,"spotShadowMap",Ot.state.spotShadowMap,O),Ot.state.pointShadowMap.length>0&&it.setValue(R,"pointShadowMap",Ot.state.pointShadowMap,O)),K.isSkinnedMesh){it.setOptional(R,K,"bindMatrix"),it.setOptional(R,K,"bindMatrixInverse");const at=K.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),it.setValue(R,"boneTexture",at.boneTexture,O))}K.isBatchedMesh&&(it.setOptional(R,K,"batchingTexture"),it.setValue(R,"batchingTexture",K._matricesTexture,O),it.setOptional(R,K,"batchingIdTexture"),it.setValue(R,"batchingIdTexture",K._indirectTexture,O),it.setOptional(R,K,"batchingColorTexture"),K._colorsTexture!==null&&it.setValue(R,"batchingColorTexture",K._colorsTexture,O));const yn=J.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&H.update(K,J,Ht),(Sn||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,it.setValue(R,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&W.environment!==null&&(xt.envMapIntensity.value=W.environmentIntensity),xt.dfgLUT!==void 0&&(xt.dfgLUT.value=d0()),Sn){if(it.setValue(R,"toneMappingExposure",U.toneMappingExposure),Ee.needsLights&&jc(xt,ei),Se&&$.fog===!0&&le.refreshFogUniforms(xt,Se),le.refreshMaterialUniforms(xt,$,re,ue,y.state.transmissionRenderTarget[b.id]),Ee.needsLights&&Ee.lightProbeGrid){const at=Ee.lightProbeGrid;xt.probesSH.value=at.texture,xt.probesMin.value.copy(at.boundingBox.min),xt.probesMax.value.copy(at.boundingBox.max),xt.probesResolution.value.copy(at.resolution)}Ps.upload(R,ao(Ee),xt,O)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Ps.upload(R,ao(Ee),xt,O),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&it.setValue(R,"center",K.center),it.setValue(R,"modelViewMatrix",K.modelViewMatrix),it.setValue(R,"normalMatrix",K.normalMatrix),it.setValue(R,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const at=$.uniformsGroups;for(let En=0,ti=at.length;En<ti;En++){const lo=at[En];de.update(lo,Ht),de.bind(lo,Ht)}}return Ht}function jc(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function Yc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(b,W,J){const $=L.get(b);$.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),L.get(b.texture).__webglTexture=W,L.get(b.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:J,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,W){const J=L.get(b);J.__webglFramebuffer=W,J.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(b,W=0,J=0){Q=b,j=W,k=J;let $=null,K=!1,Se=!1;if(b){const ve=L.get(b);if(ve.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(R.FRAMEBUFFER,ve.__webglFramebuffer),pe.copy(b.viewport),be.copy(b.scissor),qe=b.scissorTest,p.viewport(pe),p.scissor(be),p.setScissorTest(qe),ce=-1;return}else if(ve.__webglFramebuffer===void 0)O.setupRenderTarget(b);else if(ve.__hasExternalTextures)O.rebindTextures(b,L.get(b.texture).__webglTexture,L.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Be=b.depthTexture;if(ve.__boundDepthTexture!==Be){if(Be!==null&&L.has(Be)&&(b.width!==Be.image.width||b.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(b)}}const Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Se=!0);const Ne=L.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ne[W])?$=Ne[W][J]:$=Ne[W],K=!0):b.samples>0&&O.useMultisampledRTT(b)===!1?$=L.get(b).__webglMultisampledFramebuffer:Array.isArray(Ne)?$=Ne[J]:$=Ne,pe.copy(b.viewport),be.copy(b.scissor),qe=b.scissorTest}else pe.copy(De).multiplyScalar(re).floor(),be.copy(tt).multiplyScalar(re).floor(),qe=ze;if(J!==0&&($=Z),p.bindFramebuffer(R.FRAMEBUFFER,$)&&p.drawBuffers(b,$),p.viewport(pe),p.scissor(be),p.setScissorTest(qe),K){const ve=L.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve.__webglTexture,J)}else if(Se){const ve=W;for(let Re=0;Re<b.textures.length;Re++){const Ne=L.get(b.textures[Re]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Re,Ne.__webglTexture,J,ve)}}else if(b!==null&&J!==0){const ve=L.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ve.__webglTexture,J)}ce=-1},this.readRenderTargetPixels=function(b,W,J,$,K,Se,Te,ve=0){if(!(b&&b.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=L.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re){p.bindFramebuffer(R.FRAMEBUFFER,Re);try{const Ne=b.textures[ve],Be=Ne.format,ke=Ne.type;if(b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ve),!S.textureFormatReadable(Be)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!S.textureTypeReadable(ke)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-$&&J>=0&&J<=b.height-K&&R.readPixels(W,J,$,K,me.convert(Be),me.convert(ke),Se)}finally{const Ne=Q!==null?L.get(Q).__webglFramebuffer:null;p.bindFramebuffer(R.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(b,W,J,$,K,Se,Te,ve=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=L.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re)if(W>=0&&W<=b.width-$&&J>=0&&J<=b.height-K){p.bindFramebuffer(R.FRAMEBUFFER,Re);const Ne=b.textures[ve],Be=Ne.format,ke=Ne.type;if(b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ve),!S.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!S.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Le),R.bufferData(R.PIXEL_PACK_BUFFER,Se.byteLength,R.STREAM_READ),R.readPixels(W,J,$,K,me.convert(Be),me.convert(ke),0);const et=Q!==null?L.get(Q).__webglFramebuffer:null;p.bindFramebuffer(R.FRAMEBUFFER,et);const _t=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Lu(R,_t,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Le),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,Se),R.deleteBuffer(Le),R.deleteSync(_t),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,W=null,J=0){const $=Math.pow(2,-J),K=Math.floor(b.image.width*$),Se=Math.floor(b.image.height*$),Te=W!==null?W.x:0,ve=W!==null?W.y:0;O.setTexture2D(b,0),R.copyTexSubImage2D(R.TEXTURE_2D,J,0,0,Te,ve,K,Se),p.unbindTexture()},this.copyTextureToTexture=function(b,W,J=null,$=null,K=0,Se=0){let Te,ve,Re,Ne,Be,ke,Le,et,_t;const pt=b.isCompressedTexture?b.mipmaps[Se]:b.image;if(J!==null)Te=J.max.x-J.min.x,ve=J.max.y-J.min.y,Re=J.isBox3?J.max.z-J.min.z:1,Ne=J.min.x,Be=J.min.y,ke=J.isBox3?J.min.z:0;else{const xt=Math.pow(2,-K);Te=Math.floor(pt.width*xt),ve=Math.floor(pt.height*xt),b.isDataArrayTexture?Re=pt.depth:b.isData3DTexture?Re=Math.floor(pt.depth*xt):Re=1,Ne=0,Be=0,ke=0}$!==null?(Le=$.x,et=$.y,_t=$.z):(Le=0,et=0,_t=0);const nt=me.convert(W.format),Tt=me.convert(W.type);let Ee;W.isData3DTexture?(O.setTexture3D(W,0),Ee=R.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(O.setTexture2DArray(W,0),Ee=R.TEXTURE_2D_ARRAY):(O.setTexture2D(W,0),Ee=R.TEXTURE_2D),p.activeTexture(R.TEXTURE0),p.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,W.flipY),p.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),p.pixelStorei(R.UNPACK_ALIGNMENT,W.unpackAlignment);const Ot=p.getParameter(R.UNPACK_ROW_LENGTH),Ze=p.getParameter(R.UNPACK_IMAGE_HEIGHT),Ht=p.getParameter(R.UNPACK_SKIP_PIXELS),Jt=p.getParameter(R.UNPACK_SKIP_ROWS),Sn=p.getParameter(R.UNPACK_SKIP_IMAGES);p.pixelStorei(R.UNPACK_ROW_LENGTH,pt.width),p.pixelStorei(R.UNPACK_IMAGE_HEIGHT,pt.height),p.pixelStorei(R.UNPACK_SKIP_PIXELS,Ne),p.pixelStorei(R.UNPACK_SKIP_ROWS,Be),p.pixelStorei(R.UNPACK_SKIP_IMAGES,ke);const ei=b.isDataArrayTexture||b.isData3DTexture,it=W.isDataArrayTexture||W.isData3DTexture;if(b.isDepthTexture){const xt=L.get(b),yn=L.get(W),at=L.get(xt.__renderTarget),En=L.get(yn.__renderTarget);p.bindFramebuffer(R.READ_FRAMEBUFFER,at.__webglFramebuffer),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,En.__webglFramebuffer);for(let ti=0;ti<Re;ti++)ei&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,L.get(b).__webglTexture,K,ke+ti),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,L.get(W).__webglTexture,Se,_t+ti)),R.blitFramebuffer(Ne,Be,Te,ve,Le,et,Te,ve,R.DEPTH_BUFFER_BIT,R.NEAREST);p.bindFramebuffer(R.READ_FRAMEBUFFER,null),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||L.has(b)){const xt=L.get(b),yn=L.get(W);p.bindFramebuffer(R.READ_FRAMEBUFFER,z),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,I);for(let at=0;at<Re;at++)ei?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,xt.__webglTexture,K,ke+at):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,xt.__webglTexture,K),it?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,yn.__webglTexture,Se,_t+at):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,yn.__webglTexture,Se),K!==0?R.blitFramebuffer(Ne,Be,Te,ve,Le,et,Te,ve,R.COLOR_BUFFER_BIT,R.NEAREST):it?R.copyTexSubImage3D(Ee,Se,Le,et,_t+at,Ne,Be,Te,ve):R.copyTexSubImage2D(Ee,Se,Le,et,Ne,Be,Te,ve);p.bindFramebuffer(R.READ_FRAMEBUFFER,null),p.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else it?b.isDataTexture||b.isData3DTexture?R.texSubImage3D(Ee,Se,Le,et,_t,Te,ve,Re,nt,Tt,pt.data):W.isCompressedArrayTexture?R.compressedTexSubImage3D(Ee,Se,Le,et,_t,Te,ve,Re,nt,pt.data):R.texSubImage3D(Ee,Se,Le,et,_t,Te,ve,Re,nt,Tt,pt):b.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Se,Le,et,Te,ve,nt,Tt,pt.data):b.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Se,Le,et,pt.width,pt.height,nt,pt.data):R.texSubImage2D(R.TEXTURE_2D,Se,Le,et,Te,ve,nt,Tt,pt);p.pixelStorei(R.UNPACK_ROW_LENGTH,Ot),p.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ze),p.pixelStorei(R.UNPACK_SKIP_PIXELS,Ht),p.pixelStorei(R.UNPACK_SKIP_ROWS,Jt),p.pixelStorei(R.UNPACK_SKIP_IMAGES,Sn),Se===0&&W.generateMipmaps&&R.generateMipmap(Ee),p.unbindTexture()},this.initRenderTarget=function(b){L.get(b).__webglFramebuffer===void 0&&O.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?O.setTextureCube(b,0):b.isData3DTexture?O.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?O.setTexture2DArray(b,0):O.setTexture2D(b,0),p.unbindTexture()},this.resetState=function(){j=0,k=0,Q=null,p.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const Ss=[{text:"ВЫ ГОТОВЫ?",sub:"канал синхронизирован",crack:0,light:2875596},{text:"УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ",sub:"протокол начат",crack:1,light:15357964},{text:"ВЫБИРАЙТЕ КАПИТАНОВ",sub:"формирование команд",crack:2,light:2875596},{text:"ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...",sub:"база вопросов синхронизируется",crack:3,light:15357964},{text:"ВСЕ НА МЕСТЕ",sub:"все каналы подтверждены",crack:3,light:10116351},{text:"ПОГНАЛИ!",sub:"раунд 01 // на связи",crack:4,light:15357964,final:!0}],zc=620,u0=560,h0=300,f0=2800,bl=850,Tl=["#2be0cc","#ea580c","#9a5cff","#ff3d7f","#4d9fff","#c6ff3d"],wl=210,Nr=300,Al=.42,Rl=740,ys=i=>-(i+1)*zc,p0=i=>i===1?1:1-Math.pow(2,-10*i),Lr=i=>new Promise(e=>setTimeout(e,i)),Cl=["SYNC","AUTH","NODE","PING","LOAD","SCAN","LINK","BUFF","CORE","GRID"];function Pl(i){return Array.from({length:i},(e,t)=>`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4,"0")} ${Cl[t%Cl.length]}`)}function m0({onDone:i}){const e=he.useRef(null),t=he.useRef(null),n=he.useRef(null),s=he.useRef(null),r=he.useRef(null),a=he.useRef(null),o=he.useRef(null),c=he.useRef(null),l=he.useRef(null),f=he.useRef(null),u=he.useRef(i);u.current=i,Hl();const d=he.useMemo(()=>Pl(16),[]),g=he.useMemo(()=>Pl(16),[]);return he.useEffect(()=>{let v=!1,M=!1;const m=()=>{M||(M=!0,u.current())};let h=null;function w(){if(!h)try{const X=window.AudioContext??window.webkitAudioContext;h=new X}catch{}return h}function A(){const X=w();if(!X)return;X.state==="suspended"&&X.resume();const R=X.currentTime,te=X.createOscillator();te.type="sine",te.frequency.setValueAtTime(130,R),te.frequency.exponentialRampToValueAtTime(42,R+.16);const ne=X.createGain();ne.gain.setValueAtTime(1,R),ne.gain.exponentialRampToValueAtTime(.001,R+.38),te.connect(ne).connect(X.destination),te.start(R),te.stop(R+.42);const S=Math.floor(X.sampleRate*.14),p=X.createBuffer(1,S,X.sampleRate),N=p.getChannelData(0);for(let B=0;B<S;B++)N[B]=(Math.random()*2-1)*Math.pow(1-B/S,2.2);const L=X.createBufferSource();L.buffer=p;const O=X.createBiquadFilter();O.type="lowpass",O.frequency.value=850;const q=X.createGain();q.gain.setValueAtTime(.55,R),q.gain.exponentialRampToValueAtTime(.001,R+.13),L.connect(O).connect(q).connect(X.destination),L.start(R)}function E(){const X=n.current;X&&(X.currentTime=0,X.play().catch(()=>{}))}const T=t.current,y=(T==null?void 0:T.getContext("2d"))??null;let P=[],x=0;function C(){T&&(T.width=window.innerWidth,T.height=window.innerHeight)}C();function U(X,R){P=[];let te=0;const ne=6;function S(N,L,O,q,B,D){const G=3+Math.floor(Math.random()*3),ee=[[N,L]];let le=O,se=N,ie=L;for(let _e=0;_e<G;_e++){le+=(Math.random()-.5)*.6;const Me=q/G;if(se+=Math.cos(le)*Me,ie+=Math.sin(le)*Me,ee.push([se,ie]),B>0&&Math.random()<.5){const Pe=le+(Math.random()<.5?1:-1)*(.5+Math.random()*.9);S(se,ie,Pe,q*(.35+Math.random()*.3),B-1,D*.78)}}P.push({pts:ee,color:Tl[te++%Tl.length],width:D})}const p=[R*(.06+Math.random()*.1),R*(.84+Math.random()*.1)];for(let N=0;N<ne;N++){const L=X*(.15+Math.random()*.7),O=N<p.length?p[N]:R*(.1+Math.random()*.8),q=9+Math.floor(Math.random()*6);for(let B=0;B<q;B++){const D=B/q*Math.PI*2+(Math.random()-.5)*.4,G=Math.max(X,R)*(.18+Math.random()*.38);S(L,O,D,G,2,.9)}}}function F(X){if(!y||X<=0)return;const R=Math.min(1,X/2.4),te=Math.round(P.length*R);for(let ne=0;ne<te;ne++){const S=P[ne];y.lineWidth=S.width*(.9+X*.1),y.strokeStyle=S.color,y.globalAlpha=.75+X*.1,y.shadowColor=S.color,y.shadowBlur=5+X*2.2,y.beginPath(),S.pts.forEach(([p,N],L)=>L===0?y.moveTo(p,N):y.lineTo(p,N)),y.stroke()}y.globalAlpha=1,y.shadowBlur=0}function V(X,R,te){y&&(y.clearRect(0,0,R,te),F(X))}function Z(){const X=l.current;X&&(X.classList.remove("intro-hit"),X.offsetWidth,X.classList.add("intro-hit"))}function z(){var R,te,ne,S;const X=(R=r.current)==null?void 0:R.firstElementChild;X&&(X.classList.remove("intro-rgbslam"),X.offsetWidth,X.classList.add("intro-rgbslam")),(te=r.current)==null||te.classList.remove("intro-jitter"),(ne=r.current)==null||ne.offsetWidth,(S=r.current)==null||S.classList.add("intro-jitter"),Z(),We()}async function I(){for(let X=5;X>=1&&!v;X--){const R=r.current;if(!R)return;R.innerHTML="";const te=document.createElement("div");te.className="intro-glyph",te.setAttribute("data-t",String(X)),te.textContent=String(X),R.appendChild(te),z(),A(),await te.animate([{transform:"scale(.4)",opacity:0,filter:"blur(14px)"},{transform:"scale(1.22)",opacity:1,filter:"blur(0px)",offset:.55},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:bl*.7,easing:"cubic-bezier(.2,1.4,.4,1)"}).finished,await Lr(bl*.3)}}let j=null,k=null,Q=null,ce=0,fe=!1,pe=-1;const qe=document.createElement("canvas").getContext("2d");qe.font=`700 ${wl}px "Rajdhani", sans-serif`;const we=[],He=[];function ae(X,R){const te=Math.ceil(qe.measureText(X).width),ne=Math.max(200,te+120),S=document.createElement("canvas");S.width=ne,S.height=Nr;const p=S.getContext("2d");p.font=`700 ${wl}px "Rajdhani", sans-serif`,p.textAlign="center",p.textBaseline="middle",p.shadowColor=R,p.shadowBlur=56,p.fillStyle="#d24e01",p.fillText(X,ne/2,Nr/2);const N=new Ec(S);N.anisotropy=4;let L=ne*Al,O=Nr*Al;if(L>Rl){const q=Rl/L;L*=q,O*=q}return{tex:N,worldW:L,worldH:O}}function ue(X,R,te){const{tex:ne,worldW:S,worldH:p}=ae(X,te),N=new Ri(S,p),L=new Ln({map:ne,transparent:!0,depthWrite:!1,opacity:0}),O=new lt(N,L);O.position.set(0,10,R),O.visible=!1,k.add(O);const q=new lt(N,new Ln({map:ne,transparent:!0,depthWrite:!1,blending:Yn,color:2875596,opacity:0})),B=new lt(N,new Ln({map:ne,transparent:!0,depthWrite:!1,blending:Yn,color:10116351,opacity:0}));return q.position.copy(O.position),B.position.copy(O.position),q.visible=!1,B.visible=!1,k.add(q),k.add(B),He.push(N,L,ne,q.material,B.material),{mesh:O,ghostCy:q,ghostMg:B}}const re={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0};let Ie,Ue;function De(){const X=e.current;if(!X)return;j=new Bc({canvas:X,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),j.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),k=new xc,k.fog=new ks(263946,.0011),Q=new Ut(62,window.innerWidth/window.innerHeight,1,6e3),Q.position.set(0,0,40),k.add(new Cc(928300,1.1));const R=zc*Ss.length+500,te=900,ne=new Pt,S=new Float32Array(te*3),p=new Float32Array(te*3),N=[2875596,15357964,15357964,10116351];for(let B=0;B<te;B++){const D=60+Math.random()*260,G=Math.random()*Math.PI*2;S[B*3]=Math.cos(G)*D,S[B*3+1]=Math.sin(G)*D,S[B*3+2]=-Math.random()*R;const ee=new Xe(N[B%N.length]);p[B*3]=ee.r,p[B*3+1]=ee.g,p[B*3+2]=ee.b}ne.setAttribute("position",new Dt(S,3)),ne.setAttribute("color",new Dt(p,3));const L=new Xs({size:3.4,vertexColors:!0,transparent:!0,opacity:.85});k.add(new qa(ne,L)),He.push(ne,L),Ss.forEach((B,D)=>{const G=ys(D),ee="#"+B.light.toString(16).padStart(6,"0");we.push(ue(B.text,G,ee));const le=new jn(B.light,2.4,900,2);le.position.set(0,40,G+60),k.add(le)}),Ie=new jn(15357964,4,550,2),Ue=new jn(10116351,2.6,550,2),k.add(Ie),k.add(Ue),fe=!0,tt();const O=Math.random()*1e3;re.camZ=0;function q(B){if(!j||!k||!Q)return;{const le=Math.sin(B*.0016+O)*1.1+Math.sin(B*.0043)*.5,se=Math.cos(B*.002+O)*.9+Math.cos(B*.0038)*.45;Q.position.x=le+re.camX,Q.position.y=se+6}Q.position.z=re.camZ+re.warpKick;const D=re.yawKick,G=Q.position.x+Math.sin(D)*640;Q.lookAt(G,Q.position.y-4,re.focusZ),Q.rotateZ(-D*.5);const ee=62+re.fovKick*14;Q.fov!==ee&&(Q.fov=ee,Q.updateProjectionMatrix()),Ie.position.set(Math.sin(B*6e-4)*80,30,re.camZ-120),Ue.position.set(Math.cos(B*7e-4)*80,-10,re.camZ-200),we.forEach(le=>{le.mesh.visible&&le.mesh.quaternion.copy(Q.quaternion),le.ghostCy.visible&&le.ghostCy.quaternion.copy(Q.quaternion),le.ghostMg.visible&&le.ghostMg.quaternion.copy(Q.quaternion)}),j.render(k,Q),ce=requestAnimationFrame(q)}ce=requestAnimationFrame(q)}function tt(){!fe||!j||!Q||(j.setSize(window.innerWidth,window.innerHeight),Q.aspect=window.innerWidth/window.innerHeight,Q.updateProjectionMatrix())}function ze(){tt(),C(),U(window.innerWidth,window.innerHeight),V(x,window.innerWidth,window.innerHeight)}window.addEventListener("resize",ze,{passive:!0});function Ke(X,R=650){const te=pe;pe=X;const ne=we[X];if(!ne)return;ne.mesh.visible=!0,ne.mesh.material.opacity=0;const S=te>=0?we[te]:null,p=performance.now();function N(){const L=Math.min(1,(performance.now()-p)/R);ne.mesh.material.opacity=L,S&&(S.mesh.material.opacity=1-L),L<1?requestAnimationFrame(N):S&&(S.mesh.visible=!1)}N()}function We(){if(pe<0)return;const X=we[pe];if(!X)return;const R=16+Math.random()*14;X.ghostCy.visible=!0,X.ghostCy.material.opacity=.6,X.ghostCy.position.x=-R,X.ghostMg.visible=!0,X.ghostMg.material.opacity=.6,X.ghostMg.position.x=R,setTimeout(()=>{X.ghostCy.material.opacity=0,X.ghostCy.visible=!1,X.ghostCy.position.x=0,X.ghostMg.material.opacity=0,X.ghostMg.visible=!1,X.ghostMg.position.x=0},140+Math.random()*100)}async function Ve(X,R,te,ne,S){const p=re.camZ,N=re.camX,L=performance.now();return re.warpKick=(Math.random()-.5)*34,re.yawKick=S*ne,re.fovKick=1,new Promise(O=>{function q(B){const D=Math.min(1,(B-L)/te),G=p0(D);re.camZ=p+(X-p)*G,re.camX=N+(R-N)*G,re.warpKick*=.92,re.yawKick*=.975,re.fovKick*=.965,D<1?requestAnimationFrame(q):O()}requestAnimationFrame(q)})}function ot(X=1,R=420){if(!fe||!y||!e.current)return;const te=window.innerWidth,ne=window.innerHeight,S=performance.now()+R;function p(){if(performance.now()>S){V(x,te,ne);return}y.clearRect(0,0,te,ne),F(x);const L=5+Math.floor(Math.random()*8*X);for(let q=0;q<L;q++){const B=Math.random()*ne,D=4+Math.random()*52*X,G=(Math.random()-.5)*130*X;try{y.drawImage(e.current,0,B,te,D,G,B,te,D)}catch{}}const O=Math.round(6*X);y.globalCompositeOperation="screen";for(let q=0;q<O;q++){const B=Math.random()*ne;y.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],y.globalAlpha=.35+Math.random()*.35,y.lineWidth=.6+Math.random()*1.6,y.beginPath(),y.moveTo(0,B),y.lineTo(te,B),y.stroke()}if(y.globalCompositeOperation="source-over",y.globalAlpha=1,Math.random()<X*.12){y.globalAlpha=.5;for(let q=0;q<220;q++)y.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",y.fillRect(Math.random()*te,Math.random()*ne,2,2);y.globalAlpha=1}requestAnimationFrame(p)}p()}function ct(X=1,R=340){if(!fe||!y)return;const te=window.innerWidth,ne=window.innerHeight,S=te/2,p=ne/2,N=12+Math.floor(10*X),L=Array.from({length:N},()=>Math.random()*Math.PI*2),O=performance.now();function q(){const D=(performance.now()-O)/R;if(D>=1){V(x,te,ne);return}y.save(),y.globalCompositeOperation="screen",L.forEach(G=>{const ee=30+D*300,le=ee+90+Math.random()*150,se=S+Math.cos(G)*ee,ie=p+Math.sin(G)*ee,_e=S+Math.cos(G)*le,Me=p+Math.sin(G)*le;y.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",y.globalAlpha=(1-D)*(.28+Math.random()*.32)*X,y.lineWidth=1.2+Math.random()*1.8,y.beginPath(),y.moveTo(se,ie),y.lineTo(_e,Me),y.stroke()}),y.restore(),requestAnimationFrame(q)}q()}async function ht(X=900){const R=window.innerWidth,te=window.innerHeight;if(!y)return;const ne=performance.now(),S=P.map(()=>Math.random()*.25);await new Promise(p=>{function N(){const L=Math.min(1,(performance.now()-ne)/X);y.clearRect(0,0,R,te),P.forEach((O,q)=>{const B=Math.min(1,Math.max(0,(L-S[q])/(1-S[q])));if(B<=0)return;const D=O.pts,G=D.length-1,ee=B*G;y.lineWidth=O.width*(1+L*.4),y.strokeStyle=O.color,y.globalAlpha=.65+L*.3,y.shadowColor=O.color,y.shadowBlur=3+L*5,y.beginPath(),y.moveTo(D[0][0],D[0][1]);for(let ie=0;ie<Math.floor(ee);ie++)y.lineTo(D[ie+1][0],D[ie+1][1]);const le=Math.floor(ee),se=ee-le;if(le<G&&se>0){const[ie,_e]=D[le],[Me,Pe]=D[le+1];y.lineTo(ie+(Me-ie)*se,_e+(Pe-_e)*se)}y.stroke()}),y.globalAlpha=1,y.shadowBlur=0,L<1?requestAnimationFrame(N):p()}N()})}async function gt(){var B;Z(),(B=r.current)==null||B.classList.add("intro-jitter");const X=f.current;if(!X)return;X.innerHTML="";const R=window.innerWidth,te=window.innerHeight,ne=11,S=8,p=R/ne,N=te/S,L=R/2,O=te/2,q=[];for(let D=0;D<S;D++)for(let G=0;G<ne;G++){const ee=G*p,le=D*N,se=()=>(Math.random()-.5)*16,ie=document.createElement("div");ie.className="intro-shard",ie.style.left=ee+"px",ie.style.top=le+"px",ie.style.width=p+2+"px",ie.style.height=N+2+"px",ie.style.clipPath=`polygon(${se()}px ${se()}px, ${p+se()}px ${se()}px, ${p+se()}px ${N+se()}px, ${se()}px ${N+se()}px)`,X.appendChild(ie);const _e=ee+p/2-L,Me=le+N/2-O,Pe=Math.hypot(_e,Me)||1;q.push({div:ie,dx:_e/Pe,dy:Me/Pe,delay:Pe/Math.max(R,te)*220+Math.random()*80})}q.forEach(({div:D,dx:G,dy:ee,delay:le})=>{const se=60+Math.random()*140,ie=420+Math.random()*420,_e=(Math.random()-.5)*420;D.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.95,offset:0},{transform:`translate(${G*se}px, ${ee*se-20}px) rotate(${_e*.3}deg) scale(.9)`,opacity:.9,offset:.22},{transform:`translate(${G*se*1.4}px, ${ee*se+ie}px) rotate(${_e}deg) scale(.35)`,opacity:0,offset:1}],{duration:1300,delay:le,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Lr(1600),X.innerHTML=""}async function st(){var X;if(U(window.innerWidth,window.innerHeight),De(),s.current&&(s.current.style.display="flex"),await I(),!v){s.current&&(s.current.style.display="none"),(X=o.current)==null||X.classList.add("intro-on"),E();for(let R=0;R<Ss.length&&!v;R++){const te=Ss[R];x=te.crack,c.current&&(c.current.innerHTML=te.final?te.sub:`${te.sub} · трещина канала <b>${te.crack}/4</b>`),Ke(R),re.focusZ=ys(R);const ne=R%2===0?1:-1,S=te.final?0:ne*60,p=te.final?ys(R)-h0:ys(R)+u0;if(await Ve(p,S,f0,.5+te.crack*.09,ne),v)return;z(),ot(Math.min(1,.5+te.crack*.14),te.final?300:260),te.final||ct(.8+te.crack*.1,320),V(x,window.innerWidth,window.innerHeight)}v||(await ht(900),!v&&(await Lr(150),await gt(),!v&&m()))}}return st(),()=>{v=!0,window.removeEventListener("resize",ze),cancelAnimationFrame(ce),He.forEach(X=>X.dispose()),j==null||j.dispose(),h==null||h.close().catch(()=>{})}},[]),_.jsx("div",{className:"host-screen grid-bg intro-screen",children:_.jsxs("div",{className:"intro-root",children:[_.jsx("canvas",{ref:e,className:"intro-gl"}),_.jsx("canvas",{ref:t,className:"intro-crack"}),_.jsx("div",{ref:f,className:"intro-shatter-layer"}),_.jsx("div",{className:"intro-vignette"}),_.jsx("div",{className:"intro-scanlines"}),_.jsx("div",{ref:l,className:"intro-noise"}),_.jsx("div",{className:"intro-bracket tl",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-bracket tr",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-bracket bl",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-bracket br",children:_.jsx("b",{})}),_.jsx("div",{className:"intro-ticker left",children:_.jsx("div",{className:"intro-ticker-col",children:[...d,...d].map((v,M)=>_.jsx("span",{className:M%6===0?"hi":void 0,children:v},M))})}),_.jsx("div",{className:"intro-ticker right",children:_.jsx("div",{className:"intro-ticker-col",children:[...g,...g].map((v,M)=>_.jsx("span",{className:M%5===0?"hi":void 0,children:v},M))})}),_.jsxs("div",{ref:s,className:"intro-stage",children:[_.jsx("div",{className:"intro-eyebrow",children:"protocol // boot sequence"}),_.jsx("div",{ref:r,className:"intro-frame"}),_.jsx("div",{ref:a,className:"intro-subline",children:"инициализация канала связи…"})]}),_.jsx("div",{ref:o,className:"intro-flight-label",children:_.jsx("div",{ref:c,className:"intro-subline"})}),_.jsx(Vl,{}),_.jsx("audio",{ref:n,src:"/quiz-party/intro.mp3",preload:"auto"})]})})}const g0=[{text:"Вопросы кончились",sub:"сближение с массивом данных",crack:0,light:2875596},{text:"Считаем результаты..",sub:"манёвр уклонения выполнен",crack:1,light:15357964},{text:"Финал уже близко",sub:"отказ двигателя левого борта",crack:2,light:16723804},{text:"Кто же победил?",sub:"критический разлом системы",crack:4,light:10116351,final:!0}],Dr=[3400,2700,2200,1900],Da=640,Nl=560,_0=320,Ll=["#2be0cc","#ea580c","#9a5cff","#ff2f5c","#4d9fff"],Ir=220,Es=300,Dl=.46,Il=820,Oi=i=>-(i+1)*Da,x0=i=>i===1?1:1-Math.pow(2,-10*i),Bi=i=>new Promise(e=>setTimeout(e,i));function v0(){const i=new qn,e=[],t=new Gn({color:8003624,metalness:.55,roughness:.38,emissive:1705224,emissiveIntensity:.4}),n=new ja(.42,.95,12),s=new lt(n,t);s.rotation.x=Math.PI/2,s.position.set(0,0,-1.55),i.add(s),e.push(n,t);const r=new Mi(.42,.36,1.9,12),a=new lt(r,t);a.rotation.x=Math.PI/2,a.position.set(0,0,-.15),i.add(a),e.push(r);const o=new Zn(.5,.14,1),c=new Gn({color:1316636,metalness:.5,roughness:.6}),l=new lt(o,c);l.position.set(.08,.38,-.1),l.rotation.z=.1,i.add(l),e.push(o,c);const f=new Gn({color:790547,emissive:2875596,emissiveIntensity:2.2,metalness:.2,roughness:.3}),u=new zs(.13,12,12),d=new lt(u,f);d.position.set(0,-.05,-2),i.add(d),e.push(u,f);const g=new zs(.06,8,8);[-.22,.22].forEach(C=>{const U=new lt(g,f);U.position.set(C,.12,-1.7),i.add(U)}),e.push(g);const v=new Mi(.06,.06,1.4,6),M=new Gn({color:1711394,metalness:.7,roughness:.4});e.push(v,M);const m=new Zn(.04,.86,.05),h=new Gn({color:658447,metalness:.4,roughness:.6});e.push(m,h);const w=new Mi(.5,.5,.07,16),A=new Gn({color:1382429,metalness:.6,roughness:.45});e.push(w,A);const E=new Ya(.6,.09,8,20);e.push(E);function T(C,U){const F=new qn,V=new lt(v,M);V.rotation.z=Math.PI/2,V.position.set(C*.72,-.08,.15),F.add(V);const Z=C*1.45,z=new lt(w,A);z.rotation.x=Math.PI/2,z.position.set(Z,-.08,.15),F.add(z);const I=new Gn({color:855826,metalness:.75,roughness:.3,emissive:U,emissiveIntensity:1.4}),j=new lt(E,I);j.position.copy(z.position),F.add(j),e.push(I);const k=new qn;k.position.copy(z.position);for(let Q=0;Q<5;Q++){const ce=new lt(m,h);ce.rotation.z=Q/5*Math.PI,k.add(ce)}return F.add(k),{pod:F,rim:j,spokes:k}}const y=T(-1,2875596),P=T(1,15357964);i.add(y.pod,P.pod);const x=new jn(2875596,2.2,14,2);return x.position.set(0,0,-1.4),i.add(x),{group:i,rotorL:y,rotorR:P,engineLight:x,disposables:e}}function M0(i=60){const e=new Pt,t=new Float32Array(i*3),n=new Float32Array(i),s=new Float32Array(i*3);e.setAttribute("position",new Dt(t,3));const r=new Xs({color:16757575,size:2.6,transparent:!0,opacity:.9,blending:Yn,depthWrite:!1}),a=new qa(e,r);let o=0;function c(f,u,d,g){for(let v=0;v<g;v++){const M=o;o=(o+1)%i,n[M]=.4+Math.random()*.35,t[M*3]=f,t[M*3+1]=u,t[M*3+2]=d,s[M*3]=(Math.random()-.5)*3.2,s[M*3+1]=(Math.random()-.5)*3.2-1,s[M*3+2]=(Math.random()-.5)*3.2}}function l(f){for(let u=0;u<i;u++){if(n[u]<=0){t[u*3+1]=-9999;continue}n[u]-=f,t[u*3]+=s[u*3]*f,t[u*3+1]+=s[u*3+1]*f,t[u*3+2]+=s[u*3+2]*f,n[u]<=0&&(t[u*3+1]=-9999)}e.attributes.position.needsUpdate=!0}return{points:a,geo:e,mat:r,spawn:c,tick:l}}function S0({onDone:i,phases:e=g0}){const t=he.useRef(null),n=he.useRef(null),s=he.useRef(null),r=he.useRef(null),a=he.useRef(null),o=he.useRef(null),c=he.useRef(null),l=he.useRef(i);l.current=i;const f=he.useRef(e);f.current=e;const u=he.useRef(()=>{});Hl();const d=he.useMemo(()=>e.map(g=>g.text).join(" → "),[e]);return he.useEffect(()=>{let g=!1,v=!1;const M=()=>{v||(v=!0,l.current())};u.current=M;const m=f.current,h=c.current,w=n.current,A=(w==null?void 0:w.getContext("2d"))??null;let E=[],T=0;function y(){w&&(w.width=window.innerWidth,w.height=window.innerHeight)}y();function P(X,R){E=[];let te=0;const ne=7;function S(N,L,O,q,B,D){const G=3+Math.floor(Math.random()*4),ee=[[N,L]];let le=O,se=N,ie=L;for(let _e=0;_e<G;_e++){le+=(Math.random()-.5)*.9;const Me=q/G*(.55+Math.random()*.85);if(se+=Math.cos(le)*Me,ie+=Math.sin(le)*Me,ee.push([se,ie]),B>0&&Math.random()<.58){const Pe=le+(Math.random()<.5?1:-1)*(.4+Math.random()*1.1);S(se,ie,Pe,q*(.3+Math.random()*.35),B-1,D*.76)}}E.push({pts:ee,color:Ll[te++%Ll.length],width:D})}for(let N=0;N<ne;N++){const L=X*(.1+Math.random()*.8),O=R*(.08+Math.random()*.84),q=7+Math.floor(Math.random()*7);let B=Math.random()*Math.PI*2;for(let D=0;D<q;D++){B+=Math.PI*2/q*(.55+Math.random()*.9);const G=Math.max(X,R)*(.16+Math.random()*.46);S(L,O,B,G,2,.9)}}E.slice().forEach(N=>{if(N.pts.length<3||Math.random()>=.55)return;const[L,O]=N.pts[1+Math.floor(Math.random()*(N.pts.length-2))];S(L,O,Math.random()*Math.PI*2,Math.max(X,R)*(.08+Math.random()*.22),1,.55)})}function x(X){if(!A||X<=0)return;const R=Math.min(1,X/2.5),te=Math.round(E.length*R);for(let ne=0;ne<te;ne++){const S=E[ne];A.lineWidth=S.width*(.9+X*.1),A.strokeStyle=S.color,A.globalAlpha=.7+X*.07,A.shadowColor=S.color,A.shadowBlur=5+X*2.4,A.beginPath(),S.pts.forEach(([p,N],L)=>L===0?A.moveTo(p,N):A.lineTo(p,N)),A.stroke()}A.globalAlpha=1,A.shadowBlur=0}function C(X,R,te){A&&(A.clearRect(0,0,R,te),x(X))}function U(X=!1){const R=a.current;if(!R)return;const te=X?"fincine-hit-big":"fincine-hit";R.classList.remove("fincine-hit","fincine-hit-big"),R.offsetWidth,R.classList.add(te)}function F(){h&&(h.currentTime=0,h.play().catch(()=>{}))}let V=null,Z=null,z=null,I=0,j=!1,k=-1;const ce=document.createElement("canvas").getContext("2d");ce.font=`700 ${Ir}px "Rajdhani", sans-serif`;const fe=[],pe=[];function be(X,R,te=1){const ne=X.toUpperCase(),S=Ir*.05,p=Math.ceil(ce.measureText(ne).width),N=Math.max(200,p+140+S*2),L=document.createElement("canvas");L.width=N,L.height=Es;const O=L.getContext("2d");O.font=`700 ${Ir}px "Rajdhani", sans-serif`,O.textAlign="center",O.textBaseline="middle",O.lineJoin="round",O.shadowColor=R,O.shadowBlur=60,O.strokeStyle="#eef6f4",O.lineWidth=S,O.strokeText(ne,N/2,Es/2),O.fillStyle="#eef6f4",O.fillText(ne,N/2,Es/2);const q=new Ec(L);q.anisotropy=4;let B=N*Dl*te,D=Es*Dl*te;if(B>Il*te){const G=Il*te/B;B*=G,D*=G}return{tex:q,worldW:B,worldH:D}}function qe(X,R,te,ne){const{tex:S,worldW:p,worldH:N}=be(X,te,ne),L=new Ri(p,N),O=new Ln({map:S,transparent:!0,depthWrite:!1,opacity:0}),q=new lt(L,O);q.position.set(0,8,R),q.visible=!1,Z.add(q);const B=new lt(L,new Ln({map:S,transparent:!0,depthWrite:!1,blending:Yn,color:2875596,opacity:0})),D=new lt(L,new Ln({map:S,transparent:!0,depthWrite:!1,blending:Yn,color:16723804,opacity:0}));return B.position.copy(q.position),D.position.copy(q.position),B.visible=!1,D.visible=!1,Z.add(B),Z.add(D),pe.push(L,O,S,B.material,D.material),{mesh:q,ghostCy:B,ghostMg:D}}const we={camZ:0,camX:0,warpKick:0,yawKick:0,focusZ:-300,fovKick:0,focusY:null,droneRoll:0,droneBob:0,engineOutT:0,impactT:0};let He,ae,ue=null,re=null,Ie=0;function Ue(){const X=t.current;if(!X)return;V=new Bc({canvas:X,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),V.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Z=new xc,Z.fog=new ks(263946,.0012),z=new Ut(58,window.innerWidth/window.innerHeight,1,6e3),z.position.set(0,0,40),Z.add(new Cc(928300,1));const R=Da*m.length+600,te=700,ne=new Pt,S=new Float32Array(te*3),p=new Float32Array(te*3),N=[2875596,10116351,15357964];for(let B=0;B<te;B++){const D=60+Math.random()*280,G=Math.random()*Math.PI*2;S[B*3]=Math.cos(G)*D,S[B*3+1]=Math.sin(G)*D,S[B*3+2]=-Math.random()*R;const ee=new Xe(N[B%N.length]);p[B*3]=ee.r,p[B*3+1]=ee.g,p[B*3+2]=ee.b}ne.setAttribute("position",new Dt(S,3)),ne.setAttribute("color",new Dt(p,3));const L=new Xs({size:3,vertexColors:!0,transparent:!0,opacity:.8});Z.add(new qa(ne,L)),pe.push(ne,L),m.forEach((B,D)=>{const G=Oi(D),ee="#"+B.light.toString(16).padStart(6,"0");fe.push(qe(B.text,G,ee,B.final?1.35:1));const le=new jn(B.light,2.6,950,2);le.position.set(0,40,G+60),Z.add(le)}),He=new jn(15357964,3.4,550,2),ae=new jn(10116351,2.2,550,2),Z.add(He),Z.add(ae),ue=v0(),z.add(ue.group),ue.group.position.set(1.3,-1,-6.5),re=M0(),ue.group.add(re.points),pe.push(re.geo,re.mat),Z.add(z),j=!0,De();const O=Math.random()*1e3;we.camZ=-Da*.6;function q(B){if(!V||!Z||!z||!ue||!re)return;const D=Ie?Math.min(.05,(B-Ie)/1e3):.016;Ie=B;const G=.15+Math.min(1,Math.max(0,(k+1)/m.length))*.85,ee=we.impactT;ee>0&&(we.impactT=Math.max(0,ee-D));const le=Math.sin(B*.0016+O)*(1+G*2.2+ee*6)+Math.sin(B*.0043)*.5*G,se=Math.cos(B*.002+O)*(.9+G*1.8+ee*5)+Math.cos(B*.0038)*.45*G;z.position.x=le+we.camX,z.position.y=se+6,z.position.z=we.camZ+we.warpKick;const ie=we.yawKick,_e=z.position.x+Math.sin(ie)*640,Me=we.focusY??z.position.y-4;z.lookAt(_e,Me,we.focusZ),z.rotateZ(-ie*.55);const Pe=58+we.fovKick*(14+G*10)+ee*24;Math.abs(z.fov-Pe)>.01&&(z.fov=Pe,z.updateProjectionMatrix()),He.position.set(Math.sin(B*6e-4)*80,30,we.camZ-120),ae.position.set(Math.cos(B*7e-4)*80,-10,we.camZ-200),we.droneRoll=we.droneRoll*.9+-ie*1.4*.1;const H=1.6+G*2.4;we.droneBob=Math.sin(B*.001*H)*(.12+G*.35),ue.group.rotation.z=we.droneRoll*.6+(ee>0?Math.sin(B*.09)*1.15*ee:0),ue.group.rotation.x=Math.sin(B*.0013)*.06*(1+G)+(ee>0?Math.cos(B*.11)*.75*ee:0);const ge=D*(6+G*10);ue.rotorR.spokes.rotation.z+=ge;let oe=-1+we.droneBob;we.engineOutT>0?(we.engineOutT-=D,oe-=1-Math.max(0,we.engineOutT)/.5<1?Math.sin((.5-we.engineOutT)*9)*.4:0,ue.rotorL.spokes.rotation.z+=ge*.12,ue.rotorL.rim.material.emissiveIntensity=Math.random()*.6,Math.random()<.5&&re.spawn(-1.45,-.08,.15,2)):(ue.rotorL.spokes.rotation.z+=ge,ue.rotorL.rim.material.emissiveIntensity=1.4+Math.sin(B*.01)*.3),ue.group.position.y=oe,ue.group.position.x=1.3+Math.sin(B*9e-4)*.25*(1+G),ue.group.position.z=-6.5-(ee>0?ee*2.6:0),re.tick(D),fe.forEach(me=>{me.mesh.visible&&me.mesh.quaternion.copy(z.quaternion),me.ghostCy.visible&&me.ghostCy.quaternion.copy(z.quaternion),me.ghostMg.visible&&me.ghostMg.quaternion.copy(z.quaternion)}),V.render(Z,z),I=requestAnimationFrame(q)}I=requestAnimationFrame(q)}function De(){!j||!V||!z||(V.setSize(window.innerWidth,window.innerHeight),z.aspect=window.innerWidth/window.innerHeight,z.updateProjectionMatrix())}function tt(){De(),y(),P(window.innerWidth,window.innerHeight),C(T,window.innerWidth,window.innerHeight)}window.addEventListener("resize",tt,{passive:!0});function ze(X,R=600){const te=k;k=X;const ne=fe[X];if(!ne)return;ne.mesh.visible=!0,ne.mesh.material.opacity=0;const S=te>=0?fe[te]:null,p=performance.now();function N(){const L=Math.min(1,(performance.now()-p)/R);ne.mesh.material.opacity=L,S&&(S.mesh.material.opacity=1-L),L<1?requestAnimationFrame(N):S&&(S.mesh.visible=!1)}N()}function Ke(X=.5){if(k<0)return;const R=fe[k];if(!R)return;const te=(14+Math.random()*12)*(.7+X*.6),ne=Math.min(1,.45+X*.3);R.ghostCy.visible=!0,R.ghostCy.material.opacity=ne,R.ghostCy.position.x=-te,R.ghostMg.visible=!0,R.ghostMg.material.opacity=ne,R.ghostMg.position.x=te,setTimeout(()=>{R.ghostCy.material.opacity=0,R.ghostCy.visible=!1,R.ghostCy.position.x=0,R.ghostMg.material.opacity=0,R.ghostMg.visible=!1,R.ghostMg.position.x=0},(120+Math.random()*90)*(.8+X*.5)),X>.75&&Math.random()<.65&&setTimeout(()=>Ke(X*.55),70+Math.random()*70)}async function We(X,R,te,ne,S){const p=we.camZ,N=we.camX,L=performance.now();return we.warpKick=(Math.random()-.5)*40,we.yawKick=S*ne,we.fovKick=1,new Promise(O=>{function q(B){if(g){O();return}const D=Math.min(1,(B-L)/te),G=x0(D);we.camZ=p+(X-p)*G,we.camX=N+(R-N)*G,we.warpKick*=.91,we.yawKick*=.972,we.fovKick*=.96,D<1?requestAnimationFrame(q):O()}requestAnimationFrame(q)})}function Ve(X=1,R=420){if(!j||!A||!t.current)return;const te=window.innerWidth,ne=window.innerHeight,S=performance.now()+R;function p(){if(performance.now()>S){C(T,te,ne);return}A.clearRect(0,0,te,ne),x(T);const L=5+Math.floor(Math.random()*9*X);for(let q=0;q<L;q++){const B=Math.random()*ne,D=4+Math.random()*56*X,G=(Math.random()-.5)*150*X;try{A.drawImage(t.current,0,B,te,D,G,B,te,D)}catch{}}A.globalCompositeOperation="screen";const O=Math.round(6*X);for(let q=0;q<O;q++){const B=Math.random()*ne;A.strokeStyle=["#2be0cc","#ea580c","#9a5cff"][Math.floor(Math.random()*3)],A.globalAlpha=.35+Math.random()*.35,A.lineWidth=.6+Math.random()*1.8,A.beginPath(),A.moveTo(0,B),A.lineTo(te,B),A.stroke()}if(A.globalCompositeOperation="source-over",A.globalAlpha=1,Math.random()<X*.14){A.globalAlpha=.5;for(let q=0;q<240;q++)A.fillStyle=Math.random()<.5?"#eef6f4":"#04070a",A.fillRect(Math.random()*te,Math.random()*ne,2,2);A.globalAlpha=1}requestAnimationFrame(p)}p()}function ot(X=1,R=340){if(!j||!A)return;const te=window.innerWidth,ne=window.innerHeight,S=te/2,p=ne/2,N=14+Math.floor(14*X),L=Array.from({length:N},()=>Math.random()*Math.PI*2),O=performance.now();function q(){const D=(performance.now()-O)/R;if(D>=1){C(T,te,ne);return}A.save(),A.globalCompositeOperation="screen",L.forEach(G=>{const ee=30+D*340,le=ee+100+Math.random()*170,se=S+Math.cos(G)*ee,ie=p+Math.sin(G)*ee,_e=S+Math.cos(G)*le,Me=p+Math.sin(G)*le;A.strokeStyle=Math.random()<.5?"#ea580c":"#eef6f4",A.globalAlpha=(1-D)*(.3+Math.random()*.34)*X,A.lineWidth=1.2+Math.random()*2,A.beginPath(),A.moveTo(se,ie),A.lineTo(_e,Me),A.stroke()}),A.restore(),requestAnimationFrame(q)}q()}async function ct(X=900){const R=window.innerWidth,te=window.innerHeight;if(!A)return;const ne=performance.now(),S=E.map(()=>Math.random()*.25);await new Promise(p=>{function N(){if(g){p();return}const L=Math.min(1,(performance.now()-ne)/X);A.clearRect(0,0,R,te),E.forEach((O,q)=>{const B=Math.min(1,Math.max(0,(L-S[q])/(1-S[q])));if(B<=0)return;const D=O.pts,G=D.length-1,ee=B*G;A.lineWidth=O.width*(1+L*.45),A.strokeStyle=O.color,A.globalAlpha=.65+L*.32,A.shadowColor=O.color,A.shadowBlur=3+L*6,A.beginPath(),A.moveTo(D[0][0],D[0][1]);for(let ie=0;ie<Math.floor(ee);ie++)A.lineTo(D[ie+1][0],D[ie+1][1]);const le=Math.floor(ee),se=ee-le;if(le<G&&se>0){const[ie,_e]=D[le],[Me,Pe]=D[le+1];A.lineTo(ie+(Me-ie)*se,_e+(Pe-_e)*se)}A.stroke()}),A.globalAlpha=1,A.shadowBlur=0,L<1?requestAnimationFrame(N):p()}N()})}async function ht(){we.impactT=.55,U(!0),re&&(re.spawn(0,-.05,-2,28),re.spawn(-1.45,-.08,.15,16),re.spawn(1.45,-.08,.15,16)),Ve(1.6,340),ot(1.4,260),await Bi(160)}async function gt(){U(!0);const X=o.current;if(!X)return;X.innerHTML="";const R=window.innerWidth,te=window.innerHeight,ne=12,S=8,p=R/ne,N=te/S,L=R/2,O=te/2,q=[];for(let B=0;B<S;B++)for(let D=0;D<ne;D++){const G=D*p,ee=B*N,le=()=>(Math.random()-.5)*16,se=document.createElement("div");se.className="fincine-shard",se.style.left=G+"px",se.style.top=ee+"px",se.style.width=p+2+"px",se.style.height=N+2+"px",se.style.clipPath=`polygon(${le()}px ${le()}px, ${p+le()}px ${le()}px, ${p+le()}px ${N+le()}px, ${le()}px ${N+le()}px)`,X.appendChild(se);const ie=G+p/2-L,_e=ee+N/2-O,Me=Math.hypot(ie,_e)||1;q.push({div:se,dx:ie/Me,dy:_e/Me,delay:Me/Math.max(R,te)*200+Math.random()*70})}q.forEach(({div:B,dx:D,dy:G,delay:ee})=>{const le=70+Math.random()*160,se=460+Math.random()*460,ie=(Math.random()-.5)*460;B.animate([{transform:"translate(0,0) rotate(0deg) scale(1)",opacity:.96,offset:0},{transform:`translate(${D*le}px, ${G*le-22}px) rotate(${ie*.3}deg) scale(.9)`,opacity:.9,offset:.2},{transform:`translate(${D*le*1.4}px, ${G*le+se}px) rotate(${ie}deg) scale(.32)`,opacity:0,offset:1}],{duration:1250,delay:ee,easing:"cubic-bezier(.35,.02,.6,1)",fill:"forwards"})}),await Bi(1530),X.innerHTML=""}async function st(){if(P(window.innerWidth,window.innerHeight),Ue(),F(),s.current&&s.current.classList.add("fincine-on"),await Bi(900),!g){for(let X=0;X<m.length&&!g;X++){const R=m[X];T=R.crack,r.current&&(r.current.innerHTML=R.final?R.sub:`${R.sub} · рассинхрон канала <b>${R.crack}/4</b>`),ze(X),we.focusZ=Oi(X),R.final&&(we.focusY=8);const te=X%2===0?1:-1;if(R.final){const ne=Oi(X)+Nl+280;if(await We(ne,0,Dr[X]??2200,.35,te),g||(Ke(.4+R.crack*.2),Ve(Math.min(1.5,.45+R.crack*.27),300),C(T,window.innerWidth,window.innerHeight),await Bi(700),await We(Oi(X)-_0,-150,950,.5,te),g))return}else{const ne=te*70,S=Oi(X)+Nl;if(R.crack>=2&&setTimeout(()=>{g||(we.engineOutT=.5)},Dr[X]*.4),await We(S,ne,Dr[X]??2200,.55+R.crack*.1,te),g)return}Ke(.4+R.crack*.2),Ve(Math.min(1.5,.45+R.crack*.27),R.final?360:240+R.crack*30),R.final||ot(.8+R.crack*.2,300+R.crack*20),R.crack>=3&&U(!0),C(T,window.innerWidth,window.innerHeight)}g||(await ht(),!g&&(await ct(850),!g&&(await Bi(140),await gt(),!g&&M())))}}return st(),()=>{g=!0,window.removeEventListener("resize",tt),cancelAnimationFrame(I),pe.forEach(X=>X.dispose()),ue==null||ue.disposables.forEach(X=>X.dispose()),V==null||V.dispose();try{h==null||h.pause()}catch{}}},[]),_.jsxs("div",{className:"fincine-root",onClick:()=>u.current(),children:[_.jsx("canvas",{ref:t,className:"fincine-gl"}),_.jsx("canvas",{ref:n,className:"fincine-crack"}),_.jsx("div",{ref:o,className:"fincine-shatter-layer"}),_.jsx("div",{className:"fincine-vignette"}),_.jsx("div",{className:"fincine-scanlines"}),_.jsx("div",{ref:a,className:"fincine-noise"}),_.jsxs("div",{ref:s,className:"fincine-label","aria-hidden":!d,children:[_.jsx("div",{className:"fincine-eyebrow",children:"// финальный заход"}),_.jsx("div",{ref:r,className:"fincine-sub"})]}),_.jsx("div",{className:"fincine-skip",children:"нажмите, чтобы пропустить →"}),_.jsx(Vl,{}),_.jsx("audio",{ref:c,src:"/quiz-party/intro.mp3",preload:"auto"})]})}function d_(){var c;const{gameState:i,loading:e,roomId:t}=Kc(),[n,s]=he.useState(null);if(he.useEffect(()=>{i!=null&&i.pack_id?vd(i.pack_id,!0).then(s).catch(()=>{}):s(null)},[i==null?void 0:i.pack_id,i==null?void 0:i.round_number]),!e&&!t)return _.jsx(Zc,{route:"/"});const r=(n==null?void 0:n.theme)??"classic",a=i?i.phase==="finale"||i.phase==="recap"?`${i.phase}-${i.round_number}`:`${i.phase}-${i.round_number}-${i.question_index}`:"",o=(i==null?void 0:i.phase)==="question"?`Q-${((i.round_number+1)*97+i.question_index).toString(16).toUpperCase().padStart(3,"0")}`:null;return _.jsxs(Id,{theme:r,isProjector:!0,phase:i==null?void 0:i.phase,children:[r==="new_year"&&_.jsx(Ud,{trigger:`${i==null?void 0:i.phase}-${i==null?void 0:i.round_number}-${i==null?void 0:i.question_index}`}),_.jsx(y0,{gameState:i,pack:n}),_.jsx(Wd,{theme:r,trigger:a,hud:o}),n&&_.jsx("div",{className:`pack-badge${(i==null?void 0:i.phase)==="lobby"&&((c=n.settings)==null?void 0:c.play_mode)!=="paper"?" pack-badge-lobby":""}`,children:n.name}),_.jsx(Dd,{corner:!0})]})}function Gs({theme:i}){return i==="new_year"?_.jsx("div",{className:"title-deco",children:"🎄 ❄ 🎁 ❄ 🎄"}):i==="potter"?_.jsx("div",{className:"title-deco mg-glow",children:"✧ ◆ ✦ ◆ ✧"}):null}function Ul({theme:i}){return i!=="classic"?null:_.jsxs("div",{className:"cyber-deco","aria-hidden":"true",children:[_.jsx("span",{className:"cd-line"}),_.jsx("span",{className:"cd-chip",children:"◆"}),_.jsx("span",{className:"cd-line"})]})}function y0({gameState:i,pack:e}){var h,w,A,E;const[t,n]=he.useState([]),[s,r]=he.useState("");he.useEffect(()=>{Md().then(n).catch(()=>n([]))},[]);const a=Jn((i==null?void 0:i.game_id)??null),o=he.useMemo(()=>Zd(a),[a]),c=he.useMemo(()=>{const T=`${location.origin}${location.pathname}#/player?room=${Sd()??""}`;return i!=null&&i.pack_id?`${T}&pack=${i.pack_id}`:T},[i==null?void 0:i.pack_id]),l=((i==null?void 0:i.random_groups)??[]).filter(T=>Array.isArray(T)&&T.length>0),f=l.map(T=>T.join(",")).join("|"),[u,d]=he.useState(!0);he.useEffect(()=>{d(!0)},[f]);const g=l.length>0&&u;if(F0((h=e==null?void 0:e.rounds)==null?void 0:h[(i==null?void 0:i.round_number)??0],(i==null?void 0:i.question_index)??0),O0(e,(i==null?void 0:i.round_number)??0),!i)return _.jsx("div",{className:"host-screen grid-bg",children:"Загрузка…"});const v=((w=e==null?void 0:e.settings)==null?void 0:w.play_mode)==="paper";if(i.phase==="lobby"||!i.pack_id||!e)return _.jsxs("div",{className:`host-screen grid-bg lobby-screen${v?" paper-lobby":""}`,children:[i.phase==="lobby"&&!!i.pack_id&&e&&_.jsx(Bd,{pack:e}),((e==null?void 0:e.theme)??"classic")==="classic"?_.jsxs("div",{className:"cyber-lobby-head",children:[_.jsx(zl,{side:"left"}),_.jsxs("div",{className:"clh-title",children:[_.jsx(gn,{theme:"classic",lines:["QUIZ","PARTY"]}),_.jsx(Ul,{theme:"classic"})]}),_.jsx(zl,{side:"right"})]}):_.jsxs(_.Fragment,{children:[_.jsx(gn,{theme:(e==null?void 0:e.theme)??"classic",lines:["QUIZ PARTY"]}),_.jsx(Gs,{theme:(e==null?void 0:e.theme)??"classic"})]}),i.pack_id?_.jsxs(_.Fragment,{children:[g&&_.jsx(I0,{groups:l,onClose:()=>d(!1)}),l.length>0&&!u&&_.jsx("button",{className:"ghost dark lobby-groups-btn",onClick:()=>d(!0),children:"СОСТАВЫ КОМАНД"}),_.jsxs("div",{className:"lobby-teams",children:[a.length>0&&_.jsxs("div",{className:"mono-tag",children:["ПОДКЛЮЧИЛИСЬ (",a.length,")"]}),a.length===0?v?null:_.jsx("span",{style:{opacity:.5},children:"ждём команды…"}):o.map(T=>_.jsxs("span",{className:"lobby-team team-chip-fx",style:{"--tc":T.color,opacity:pd(T)?1:.4},children:[T.icon&&_.jsx("span",{className:"lobby-team-icon",children:T.icon}),T.name]},T.id))]}),!v&&_.jsx(Fd,{className:`lobby-qr-corner${g?" lobby-qr-lit":""}`,value:c,title:"QR для подключения"}),!v&&g&&_.jsx("div",{className:"lobby-qr-hint",children:"СКАНИРУЙ, ЧТОБЫ ИГРАТЬ"}),_.jsxs("div",{className:"host-actions",children:[_.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Сбросить игру и выбрать другой пакет?")&&Br()},children:"⟲ Сменить пакет"}),_.jsx("button",{onClick:()=>{var T,y;return void((T=e==null?void 0:e.settings)!=null&&T.show_intro?Ed():ho(0,uo((y=e==null?void 0:e.settings)==null?void 0:y.info_slides,0)??void 0))},children:"К первому раунду →"})]})]}):_.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[_.jsxs("select",{value:s,onChange:T=>r(T.target.value),style:{fontSize:"1.2rem"},children:[_.jsx("option",{value:"",children:"— выбрать пакет —"}),t.map(T=>_.jsxs("option",{value:T.id,children:[T.name," (",T.status==="ready"?"готов":T.status==="played"?"сыгран":T.status,")"]},T.id))]}),_.jsx("button",{disabled:!s,style:{fontSize:"1.2rem"},onClick:()=>{const T=t.find(y=>y.id===s);T&&T.status==="draft"&&!confirm("Пакет — черновик (валидатор не пройден). Играть как есть?")||yd(s)},children:"Начать игру"})]})]});if(i.phase==="intro")return _.jsx(m0,{onDone:()=>{var T;ho(0,uo((T=e==null?void 0:e.settings)==null?void 0:T.info_slides,0)??void 0)}});const M=e.rounds[i.round_number];if(!M)return _.jsx("div",{className:"host-screen grid-bg",children:"Раунд не найден — проверь пакет"});const m=M.questions[i.question_index];if(i.phase==="round_intro"){const T=M.settings.grid;return _.jsxs("div",{className:"host-screen grid-bg round-intro",children:[M.rules_audio&&_.jsx("audio",{autoPlay:!0,src:mt(M.rules_audio)}),e.theme==="potter"&&_.jsx("div",{className:"mg-veil","aria-hidden":!0}),M.mechanic==="crossword"&&T?_.jsxs("div",{className:"cw-layout",children:[_.jsx(Od,{grid:T,cellSize:Math.max(18,Math.min(44,Math.floor(Math.min(innerWidth*.48/T.cols,innerHeight*.8/T.rows))))}),_.jsxs("div",{className:"side",children:[_.jsxs("div",{className:"mono-tag",children:["РАУНД ",Si(e,i.round_number)]}),_.jsx(gn,{theme:e.theme,lines:M.title_lines}),_.jsx("div",{className:"meta-line",style:{alignSelf:"flex-start"},children:fo(M)}),M.rules.map((y,P)=>_.jsxs("div",{className:"rule-item",style:{animationDelay:`${.5+P*.5}s`},children:[_.jsx("span",{className:"idx",children:String(P+1).padStart(2,"0")}),y]},P))]})]}):_.jsxs(_.Fragment,{children:[_.jsxs("div",{className:"round-badge",children:[_.jsx("span",{className:"rb-word",children:"РАУНД"}),_.jsx("span",{className:"rb-num",children:Si(e,i.round_number)})]}),_.jsxs("div",{className:"ri-main",children:[_.jsx(gn,{theme:e.theme,lines:M.title_lines}),_.jsx(Gs,{theme:e.theme}),_.jsx(Ul,{theme:e.theme}),_.jsx("div",{className:"meta-line",children:fo(M)})]}),M.rules.length>0&&_.jsxs("div",{className:"rules-frame","data-count":M.rules.length,children:[_.jsx("div",{className:"rules-frame-label",children:"ПРАВИЛА"}),M.rules.map((y,P)=>_.jsxs("div",{className:"rule-item",style:{animationDelay:`${(e.theme==="classic"?1.3:e.theme==="potter"?1.7:.5)+P*.7}s`},children:[_.jsx("span",{className:"idx",children:String(P+1).padStart(2,"0")}),y]},P))]})]}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>void Hi(0),children:M.mechanic==="jeopardy"?"Начать раунд →":M.mechanic==="race"?"К скачкам →":M.mechanic==="melody"?"К трекам →":M.mechanic==="four_pics"||M.mechanic==="sprint"?"Поехали →":"Первый вопрос →"})})]})}if(i.phase==="question"&&M.mechanic==="sprint")return _.jsxs("div",{className:"host-screen grid-bg",children:[_.jsx(nd,{pack:e,round:M,gameState:i,timerNode:_.jsx(bs,{startedAt:i.timer_started_at,seconds:M.timer_seconds,theme:e.theme})}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{className:"ghost dark",onClick:()=>void Ls(0),children:"К ответам →"})})]});if(i.phase==="question"&&M.mechanic==="blitz")return _.jsx(H0,{pack:e,round:M,gameState:i});if(i.phase==="question"&&M.mechanic==="race")return _.jsx(id,{pack:e,round:M,gameState:i});if(i.phase==="question"&&M.mechanic==="melody")return _.jsx(sd,{pack:e,round:M,gameState:i});if(i.phase==="question"&&M.mechanic==="four_pics")return _.jsx(rd,{pack:e,round:M,gameState:i,timerNode:(T,y,P)=>{var x,C;return _.jsx(bs,{startedAt:((C=(x=i.melody)==null?void 0:x.rv)==null?void 0:C.startedAt)??null,seconds:T,theme:e.theme,chime:P},y)}});if(i.phase==="question"&&M.mechanic==="jeopardy")return _.jsx(ad,{pack:e,round:M,gameState:i});if(i.phase==="question"&&m){const T=!!i.timer_started_at&&(Date.now()-new Date(i.timer_started_at).getTime())/1e3>M.timer_seconds-10,y=((A=e.settings)!=null&&A.answers_reveal&&M.answers_reveal==="after_question",M.answers_reveal??"after_round");return _.jsx(od,{pack:e,round:M,roundIdx:i.round_number,q:m,qIndex:i.question_index,qCount:M.questions.length,timeLow:T,reveal:i.reveal,timerRunning:!!i.timer_started_at,timerSlot:M.mechanic!=="jeopardy"&&_.jsx(bs,{startedAt:i.timer_started_at,seconds:M.timer_seconds,theme:e.theme},m.id),effectsSlot:M.mechanic!=="jeopardy"&&_.jsxs(_.Fragment,{children:[_.jsx(V0,{startedAt:i.timer_started_at,seconds:M.timer_seconds,q:m,round:M,pack:e,timerRunning:!!i.timer_started_at,manual:v,gameId:i.game_id,roundNumber:i.round_number}),_.jsx(j0,{round:M,gameState:i,isLast:i.question_index+1>=M.questions.length}),_.jsx(q0,{enabled:y==="after_question"&&!i.reveal,startedAt:i.timer_started_at,seconds:M.timer_seconds})]}),actionsSlot:_.jsxs("div",{className:"host-actions",children:[_.jsx(E0,{gameState:i}),(y==="after_question"||M.mechanic==="jeopardy")&&!i.reveal&&_.jsx("button",{onClick:()=>void Ds(),children:"Показать ответ"}),i.question_index+1<M.questions.length?_.jsx("button",{onClick:()=>void Hi(i.question_index+1),children:"Дальше →"}):y==="after_round"?_.jsx("button",{onClick:()=>void ql(),children:"Время ответов →"}):_.jsx(Xi,{pack:e,gameState:i})]})})}if(i.phase==="info"){const T=((E=e==null?void 0:e.settings)==null?void 0:E.info_slides)??[],y=T[i.question_index]??T[0];if(y)return _.jsx(B0,{pack:e,slide:y,packId:i.pack_id,gameState:i})}return i.phase==="recap"?_.jsx(U0,{pack:e,round:M,gameState:i}):i.phase==="answer_time"?_.jsx(k0,{pack:e,round:M,gameState:i}):i.phase==="show_answers"&&m?_.jsx(W0,{pack:e,round:M,q:m,gameState:i}):i.phase==="scoreboard"?_.jsx($0,{pack:e,gameState:i}):i.phase==="break"?_.jsx(K0,{pack:e,round:M,gameState:i}):i.phase==="counting"?_.jsx(Z0,{pack:e,gameState:i}):i.phase==="finale"?_.jsx(J0,{pack:e,gameId:i.game_id,gameState:i}):_.jsxs("div",{className:"host-screen grid-bg",children:[_.jsxs("div",{className:"mono-tag",children:["ФАЗА: ",i.phase]}),i.phase==="question"&&!m&&_.jsx("p",{style:{opacity:.7},children:"В этом раунде нет вопросов — добавь их в редакторе"}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>void Ia("round_intro"),children:"← К титулу раунда"})})]})}function E0({gameState:i}){return i.question_index>0?_.jsx("button",{className:"ghost",onClick:()=>void Hi(i.question_index-1),children:"← Назад"}):_.jsx("button",{className:"ghost",onClick:()=>void Ia("round_intro"),children:"← К титулу"})}function b0(i){const e=(i??"").trim().length;return e<=90?"":e<=200?" n-m":e<=360?" n-l":" n-xl"}function T0(i){const e=i.join(" ").split(/\s+/).filter(Boolean);return Math.min(20,e.reduce((t,n)=>Math.max(t,n.length),0))}const gn=he.forwardRef(function({theme:e,lines:t},n){const s=T0(t),r=t.join(`
`),a=ld(r,e==="classic"),o=e==="classic"?a.split(`
`):t;if(e!=="new_year")return _.jsx("h1",{ref:n,className:"neon-title title-anim","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,f)=>_.jsxs("span",{style:f===t.length-1&&t.length>1?{color:"var(--accent)"}:{},children:[o[f]??l,_.jsx("br",{})]},f))});let c=0;return _.jsx("h1",{ref:n,className:"neon-title","data-longest":s,style:{"--longest":s,"--lines":t.length},children:t.map((l,f)=>_.jsx("span",{style:{display:"block"},children:[...l].map((u,d)=>u===" "?_.jsx("span",{children:" "},d):_.jsx("span",{className:"ny-letter",style:{animationDelay:`${.06*c++}s`},children:u},d))},f))})});function w0(){td()}function A0(i,e){const t=(i??"").trim();if(!t)return null;const n=e?Math.max(0,t.length-3):3,s=e?t.slice(0,n):t.slice(n),r=e?t.slice(n):t.slice(0,n);return e?_.jsxs(_.Fragment,{children:[s,_.jsx("b",{className:"rebus-hot",children:r})]}):_.jsxs(_.Fragment,{children:[_.jsx("b",{className:"rebus-hot",children:r}),s]})}function R0(i,e){let t=0;for(const s of e)t=t*31+s.charCodeAt(0)>>>0;const n=[...i];for(let s=n.length-1;s>0;s--){t=t*1664525+1013904223>>>0;const r=t%(s+1);[n[s],n[r]]=[n[r],n[s]]}return n}const C0=5e3,Gc=3300,P0=500,N0=900,Fl=100,Ol=600,Bl=500;function L0(i){const e=i.answer;return e.mode==="choice"?Gc+P0+N0:e.mode==="match"?Fl+Ol*Math.max(0,Math.min(e.left.length,6)-1)+Bl:e.mode==="order"?Fl+Ol*Math.max(0,e.correct_order.length-1)+Bl:1200}function D0({src:i}){const e=he.useRef(null);return he.useEffect(()=>{const t=e.current;if(!t)return;t.currentTime=0,t.play().catch(()=>{});const n=setTimeout(()=>{try{t.pause()}catch{}},1e4);return()=>{clearTimeout(n);try{t.pause()}catch{}}},[i]),_.jsx("div",{className:"reveal-video",children:_.jsx("video",{ref:e,src:i,playsInline:!0,muted:!1})})}function Hc(i){return i>15?" rows-16":i>13?" rows-14":i>11?" rows-12":i>9?" rows-10":i>6?" rows-7":""}function zl({side:i}){const e=i==="left"?["SYS::READY","NET 100%","NODE 07","SYNC OK","BUF 4096","CH 02"]:["LINK UP","PING 12ms","QUEUE 0","AUTH OK","TEMP 41C","RUN"];return _.jsxs("div",{className:`cyber-panel cp-${i}`,"aria-hidden":"true",children:[_.jsx("span",{className:"cp-bar"}),_.jsx("div",{className:"cp-rows",children:e.map((t,n)=>_.jsx("span",{className:"cp-row",style:{animationDelay:`${n*.4}s`},children:t},t))}),_.jsx("div",{className:"cp-code",children:Array.from({length:14},(t,n)=>_.jsx("i",{style:{width:`${2+n*7%5}px`}},n))})]})}function I0({groups:i,onClose:e}){he.useEffect(()=>{const n=s=>{s.key==="Escape"&&e()};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e]);const t=i.reduce((n,s)=>n+s.length,0);return _.jsx("div",{className:"groups-overlay",onClick:e,children:_.jsxs("div",{className:"groups-modal","data-count":i.length,onClick:n=>n.stopPropagation(),children:[_.jsxs("div",{className:"gm-head",children:[_.jsxs("span",{className:"mono-tag",children:["СОСТАВЫ КОМАНД · ",i.length," · ",t," чел."]}),_.jsx("button",{className:"gm-close",onClick:e,"aria-label":"Закрыть",children:"✕"})]}),_.jsx("div",{className:"lg-list",children:i.map((n,s)=>_.jsxs("div",{className:"lg-team",children:[_.jsxs("div",{className:"lg-name",style:{color:bd(s)},children:["Команда ",s+1]}),_.jsx("div",{className:"lg-players",children:n.join(" · ")})]},s))})]})})}function U0({pack:i,round:e,gameState:t}){const n=he.useMemo(()=>e.questions.filter(d=>!d.hidden),[e.questions]),[s,r]=he.useState(0),a=n[s],o=s+1>=n.length,c=()=>void ql(),l=()=>{o?c():r(d=>d+1)};if(he.useEffect(()=>{if(!a){c();return}let d=!0;const g=()=>{d&&l()},v=setTimeout(g,C0),M=a.media.voice;if(!M)return()=>{d=!1,clearTimeout(v)};let m=!1;const h=jt();h.src=mt(M),h.play().then(()=>{if(m)try{h.pause(),h.src=""}catch{}}).catch(()=>{});const w=()=>{clearTimeout(v),g()};return h.addEventListener("ended",w),()=>{d=!1,m=!0,clearTimeout(v),h.removeEventListener("ended",w);try{h.pause(),h.src=""}catch{}}},[s,a==null?void 0:a.id]),!a)return null;const f=(a.media.question??[]).filter(d=>!/\.(mp3|wav|mp4|webm)$/i.test(d)),u=!!a.question_text.trim();return _.jsxs("div",{className:`host-screen grid-bg recap-screen${f.length?" has-media":""}${u?"":" no-qtext"}`,children:[_.jsxs("div",{className:"host-topbar",children:[_.jsx("span",{className:"mono-tag",children:"ПОВТОР ВОПРОСОВ"}),_.jsxs("span",{className:"qnum",children:[s+1," / ",n.length]})]}),_.jsxs("div",{className:"recap-body",children:[u&&_.jsx("p",{className:`q-text${Or(a.question_text)}`,children:a.question_text}),f.length>0&&_.jsx("div",{className:`q-media-grid n${Math.min(f.length,4)}${f.length>1?" eq-row":""}${f.length>4?" wrap2":""}`,style:Xl(a),children:f.map((d,g)=>_.jsx(Ur,{src:mt(d)},g))})]},a.id),_.jsx("div",{className:"recap-dots","aria-hidden":"true",children:n.map((d,g)=>_.jsx("i",{className:g===s?"on":g<s?"done":""},g))}),_.jsxs("div",{className:"host-actions",children:[_.jsx("button",{className:"ghost",onClick:c,children:"Пропустить повтор"}),_.jsx("button",{onClick:l,children:o?"К ответам →":"Следующий →"})]})]})}function F0(i,e){he.useEffect(()=>{if(!i)return;const n=i.questions.filter(a=>!a.hidden)[e+1];if(!n)return;const s=[...n.media.question??[],...n.media.answer??[],...n.media.voice?[n.media.voice]:[]],r=[];for(const a of s){const o=mt(a);if(/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(a)){const c=document.createElement(/\.(mp4|webm)$/i.test(a)?"video":"audio");c.preload="auto",c.src=o,r.push(c)}else{const c=new Image;c.src=o,r.push(c)}}return()=>{for(const a of r)try{a.src=""}catch{}}},[i,e])}function O0(i,e){he.useEffect(()=>{if(!i)return;const t=[i.rounds[e],i.rounds[e+1]].filter(s=>!!s);if(t.length===0)return;const n=[...md({id:i.id,rounds:t})];return gd(n),()=>_d(n)},[i,e])}function B0({pack:i,slide:e,packId:t,gameState:n}){var o,c;const s=i.rounds.filter(l=>!l.off_scoreboard).map(l=>({id:l.id,name:(l.title_lines??[]).join(" ")||"—",count:l.questions.filter(f=>!f.hidden).length})),r=Jn(n.game_id),a=dd(i,r.length);return _.jsxs(_.Fragment,{children:[_.jsx(ud,{slide:e,rounds:s,stats:a,mediaUrl:mt}),_.jsx("div",{className:"host-actions",children:_.jsx(G0,{slides:((o=i.settings)==null?void 0:o.info_slides)??[],index:z0(i,e),packId:t,paper:((c=i.settings)==null?void 0:c.play_mode)==="paper"})})]})}function z0(i,e){var t;return(((t=i.settings)==null?void 0:t.info_slides)??[]).findIndex(n=>n.id===e.id)}function G0({slides:i,index:e,packId:t,paper:n}){var r;const s=((r=i[e])==null?void 0:r.show_at)==="finale";return _.jsxs(_.Fragment,{children:[e>0&&_.jsx("button",{className:"ghost",onClick:()=>void gi(e-1),children:"← Назад"}),e+1<i.length&&_.jsx("button",{className:"ghost",onClick:()=>void gi(e+1),children:"Дальше →"}),s?n?_.jsx("button",{onClick:()=>void Ld(),children:"К подсчёту →"}):_.jsx("button",{onClick:()=>void Yl(t),children:"К итогам →"}):_.jsx("button",{onClick:()=>void Ia("round_intro"),children:"К раунду →"})]})}function H0({pack:i,round:e,gameState:t}){var h;const{state:n,setState:s}=Jc(t.game_id,t.round_number),r=Jn(t.game_id),a=qi(t.game_id,t.round_number,400),o=he.useMemo(()=>e.questions.map(w=>({id:w.id,hidden:w.hidden})),[e.questions]),c=e.settings;he.useEffect(()=>{var T;const w=c.bg_music??((T=i.settings)==null?void 0:T.bg_music);if(!w)return;let A=!1;const E=jt();return E.src=mt(w),E.loop=!0,E.volume=.6,E.play().then(()=>{if(A)try{E.pause(),E.src=""}catch{}}).catch(()=>{}),()=>{A=!0;try{E.pause(),E.src=""}catch{}}},[e.id,c.bg_music,(h=i.settings)==null?void 0:h.bg_music]);const l=he.useRef(!1),f=async w=>{if(!l.current){l.current=!0,s(w);try{await Qc(t.game_id,t.round_number,w),w.finished&&!(n!=null&&n.finished)&&await ed(t.game_id,t.round_number,yo(Mo(w),c.timeoutPenalty??10))}finally{l.current=!1}}};he.useEffect(()=>{if(n||r.length<2)return;const w=setTimeout(()=>{const A=[...r].sort(()=>Math.random()-.5).map(E=>E.id);f(Td(A,c.teamSeconds??60))},3e3);return()=>clearTimeout(w)},[n,r.length]),he.useEffect(()=>{if(!n||n.finished||n.current)return;const w=setTimeout(()=>{const A=wd(o,n.used);if(!A)return void f(po(n));xd(A.id).catch(()=>{}),f(Ad(n,A.id,Date.now()))},mo);return()=>clearTimeout(w)},[n==null?void 0:n.current,n==null?void 0:n.turn,n==null?void 0:n.finished]);const u=n==null?void 0:n.current,d=u?e.questions.find(w=>w.id===u.questionId):void 0,g=n?Rd(n):void 0;he.useEffect(()=>{if(!n||!u||!d||!g)return;const w=a.find(E=>E.team_id===g&&E.question_ref===`q-${d.id}`);if(!(w!=null&&w.answer_text)||u.lastAnswer===w.answer_text)return;if(w.answer_text===Cd){f(go(Ks(n,Date.now()),Date.now()));return}const A=Fr(d.answer,w.answer_text)===!0;f(Pd(n,Date.now(),A?"ok":"no",w.answer_text))},[a,u==null?void 0:u.questionId,u==null?void 0:u.lastAnswer]);const v=(u==null?void 0:u.verdict)==="no"&&u.attempts+1>=_o;if(he.useEffect(()=>{if(!n||!(u!=null&&u.verdict))return;const A=Math.max(0,(v?Nd:mo)-(Date.now()-(u.pausedAt??Date.now()))),E=setTimeout(()=>{const T=Date.now(),y=Ks(n,T),P=a.find(x=>x.team_id===g&&x.question_ref===`q-${u.questionId}`);P&&jl.patchAnswer(P.id,{is_correct:u.verdict==="ok"}).catch(()=>{}),f(u.verdict==="ok"?xo(y,T):vo(y,T))},A);return()=>clearTimeout(E)},[u==null?void 0:u.verdict,u==null?void 0:u.lastAnswer]),!n)return _.jsxs("div",{className:"host-screen grid-bg bz-screen",children:[_.jsx("div",{className:"host-topbar",children:_.jsx("span",{className:"mono-tag",children:"БЛИЦ"})}),_.jsx(co,{teams:r,rolling:!0})]});if(n.finished){const w=yo(Mo(n),c.timeoutPenalty??10);return _.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[_.jsx("div",{className:"mono-tag",children:"ИТОГИ БЛИЦА"}),_.jsxs("table",{className:"score-table",children:[_.jsx("thead",{children:_.jsxs("tr",{children:[_.jsx("th",{}),_.jsx("th",{children:"Команда"}),_.jsx("th",{children:"Очки"}),_.jsx("th",{children:"Баллы"})]})}),_.jsx("tbody",{children:w.map(A=>{var E;return _.jsxs("tr",{children:[_.jsxs("td",{children:[A.place,A.shared?"=":""]}),_.jsx("td",{children:((E=r.find(T=>T.id===A.teamId))==null?void 0:E.name)??"—"}),_.jsx("td",{children:A.points}),_.jsx("td",{children:A.score})]},A.teamId)})})]}),_.jsx("div",{className:"host-actions",children:_.jsx(Xi,{pack:i,gameState:t})})]})}const M=n.current!=null||Object.values(n.correct).some(w=>w>0)||Object.values(n.missed).some(w=>w>0),m=!u&&n.lastReveal?(()=>{const w=e.questions.find(A=>A.id===n.lastReveal.questionId);if(w)return{questionText:w.question_text,answerText:Ns(w),verdict:n.lastReveal.verdict}})():void 0;return _.jsxs(_.Fragment,{children:[_.jsx(cd,{teams:r,state:n,bank:o,questionText:d==null?void 0:d.question_text,verdict:u==null?void 0:u.verdict,reveal:m,answerText:(u==null?void 0:u.verdict)==="ok"||(u==null?void 0:u.verdict)==="no"&&u.attempts+1>=_o?Ns(d):void 0,dice:M?void 0:_.jsx(co,{teams:r,rolling:!1,pickedId:n.order[0]})}),_.jsxs("div",{className:"host-actions",children:[(u==null?void 0:u.verdict)&&_.jsxs("button",{className:"ghost",onClick:()=>{const w=Date.now(),A=Ks(n,w);f(u.verdict==="ok"?vo(A,w):xo(A,w))},children:["Исправить на «",u.verdict==="ok"?"неверно":"верно","»"]}),u&&u.verdict!=="ok"&&_.jsx("button",{className:"ghost",onClick:()=>void f(go(n,Date.now())),children:"Скип −1"}),_.jsx("button",{className:"ghost dark",onClick:()=>{confirm("Завершить блиц досрочно?")&&f(po(n))},children:"Завершить раунд"})]})]})}function V0({q:i,round:e,timerRunning:t,pack:n,startedAt:s,seconds:r,manual:a=!1,gameId:o,roundNumber:c}){const l=(i.media.question??[]).some(g=>/\.(mp3|mp4|webm|wav)$/i.test(g)),f=he.useRef(null),u=he.useRef(null),d=he.useRef(!1);return he.useEffect(()=>{if(w0(),a&&!l||t)return;let g=!1;const v=(i.media.question??[]).find(h=>/\.(mp3|wav|m4a|ogg)$/i.test(h));d.current=!1;const M=()=>{if(!g){if(d.current=!0,v){const h=jt();h.src=mt(v),u.current=h,h.play().catch(()=>{})}So(o&&c!=null?{gameId:o,roundNumber:c,questionRef:`q-${i.id}`}:void 0)}};if(!i.media.voice){M();return}const m=jt();return m.src=mt(i.media.voice),f.current=m,m.onended=M,m.onerror=M,m.play().then(()=>{if(g)try{m.pause(),m.src=""}catch{}}).catch(M),()=>{var w;g=!0;const h=f.current;if(h){h.onended=null,h.onerror=null;try{h.pause(),h.src=""}catch{}}f.current=null,(w=u.current)==null||w.pause()}},[i.id,a]),he.useEffect(()=>{if(!a||!t||l)return;let g=!1;const v=(i.media.question??[]).find(m=>/\.(mp3|wav|m4a|ogg)$/i.test(m)),M=()=>{if(g||!v)return;const m=jt();m.src=mt(v),u.current=m,m.play().catch(()=>{})};if(i.media.voice){const m=jt();m.src=mt(i.media.voice),f.current=m,m.onended=M,m.onerror=M,m.play().then(()=>{if(g)try{m.pause(),m.src=""}catch{}}).catch(M)}else M();return()=>{var h;g=!0;const m=f.current;if(m){m.onended=null,m.onerror=null;try{m.pause(),m.src=""}catch{}}f.current=null,(h=u.current)==null||h.pause()}},[i.id,a,t]),he.useEffect(()=>{if(t||a)return;const g=setInterval(()=>{if(t)return;const v=f.current;v&&!v.paused&&!v.ended||So(o&&c!=null?{gameId:o,roundNumber:c,questionRef:`q-${i.id}`}:void 0)},2e3);return()=>clearInterval(g)},[i.id,t,a]),he.useEffect(()=>{var E;const g=e.settings.bg_music??((E=n==null?void 0:n.settings)==null?void 0:E.bg_music);if(!t||!g||l)return;let v=!1;const M=jt();M.src=mt(g),M.loop=!0,M.volume=.6,M.play().then(()=>{if(v)try{M.pause(),M.src=""}catch{}}).catch(()=>{});let m;const h=(r??e.timer_seconds??60)*1e3,w=s?h-(Date.now()-new Date(s).getTime()):h,A=window.setTimeout(()=>{m=window.setInterval(()=>{M.volume=Math.max(0,M.volume-.1),M.volume<=.01&&(m&&clearInterval(m),M.pause())},80)},Math.max(0,w)+3e3);return()=>{v=!0,clearTimeout(A),m&&clearInterval(m);try{M.pause(),M.src=""}catch{}}},[t,i.id]),null}function k0({pack:i,round:e,gameState:t}){var c;const n=e.settings.answerTimeSeconds??60,s=((c=i.settings)==null?void 0:c.play_mode)==="paper",r=Jn(t.game_id),a=qi(t.game_id,t.round_number),o=e.questions.filter(l=>!l.hidden).length;return he.useEffect(()=>{var d;const l=e.settings.bg_music??((d=i.settings)==null?void 0:d.bg_music);if(!l)return;let f=!1;const u=jt();return u.src=mt(l),u.loop=!0,u.volume=.6,u.play().then(()=>{if(f)try{u.pause(),u.src=""}catch{}}).catch(()=>{}),()=>{f=!0;try{u.pause(),u.src=""}catch{}}},[e.id]),_.jsxs("div",{className:`host-screen grid-bg${s?" paper-answer-time":""}`,children:[_.jsxs("div",{className:"mono-tag",children:["РАУНД ",Si(i,t.round_number)," :: ОЖИДАЮ ОТВЕТЫ"]}),_.jsx("div",{className:"answer-pulse",children:_.jsx(gn,{theme:i.theme,lines:[s?"СДАВАЙТЕ БЛАНКИ":"ОТВЕЧАЙТЕ!"]})}),_.jsx("div",{className:"meta-line",children:s?"ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ":"КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ"}),_.jsx(bs,{startedAt:t.timer_started_at,seconds:n,theme:i.theme,variant:"ring"}),!s&&_.jsx("div",{className:"answer-time-teams",children:r.map(l=>{const f=a.filter(d=>{var g;return d.team_id===l.id&&((g=d.answer_text)==null?void 0:g.trim())}).length,u=f>=o;return _.jsxs("div",{className:`at-team${u?" done":""}`,children:[_.jsx("span",{style:{color:l.color},children:l.name})," · ",f,"/",o]},l.id)})}),_.jsxs("div",{className:"host-actions",children:[_.jsx("button",{className:"ghost dark",onClick:()=>void Hi(e.questions.length-1),children:"← Назад"}),_.jsx("button",{onClick:()=>void Ls(0),children:"К ответам →"})]})]})}function W0({pack:i,round:e,q:t,gameState:n}){var y;const s=((y=i.settings)==null?void 0:y.play_mode)==="paper",r=qi(n.game_id,n.round_number),a=n.reveal,o=Jn(n.game_id),[c,l]=he.useState([]);he.useEffect(()=>{$c.from("teams").select("id,name,color").then(({data:P})=>l(P??[]))},[]);const f=r.filter(P=>P.question_ref===`q-${t.id}`),u=e.questions.length,d=n.question_index;he.useEffect(()=>{if(a||document.hidden)return;const P=setTimeout(()=>{Ds()},3e3);return()=>clearTimeout(P)},[a,d]);const[g,v]=he.useState(!1);he.useEffect(()=>{if(v(!1),!a)return;const P=setTimeout(()=>v(!0),L0(t)+600);return()=>clearTimeout(P)},[a,t.id]),he.useEffect(()=>{!g||document.hidden||f.forEach(P=>{if(P.is_correct!=null)return;const x=Fr(t.answer,P.answer_text);x!==null&&jl.patchAnswer(P.id,{is_correct:x}).catch(()=>{})})},[g,d,f.length,f.map(P=>P.answer_text).join("|")]);const M=t.answer.mode==="choice"?t.answer.choices:null,m=(t.media.question??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),h=(t.media.answer??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),w=(t.media.question??[]).filter(P=>!/\.(mp3|mp4|webm|wav)$/i.test(P)),A=h.length?h:w,E=t.media.hidden?(t.media.question??[]).find(P=>/\.(mp4|webm)$/i.test(P)):void 0,T=(t.media.answer??[]).find(P=>/\.(mp3|wav|m4a|ogg)$/i.test(P));return _.jsxs("div",{className:`host-screen grid-bg${s?" paper-answers":""}`,style:{justifyContent:"flex-start"},children:[_.jsxs("div",{className:"host-topbar",children:[_.jsxs("span",{className:"mono-tag",children:["РАУНД ",Si(i,n.round_number)," :: ОТВЕТЫ"]}),_.jsxs("span",{className:"qnum",children:["ВОПРОС ",_.jsx("b",{children:d+1})," / ",u]})]}),_.jsxs("div",{className:`answers-layout${a?" revealed":""}`,style:{marginTop:60},children:[_.jsxs("div",{className:`answers-main${a?" revealed":""}`,style:{flex:1.4,minHeight:0},children:[!a&&_.jsxs(_.Fragment,{children:[_.jsx("p",{className:`q-text${Or(t.question_text)}`,children:t.question_text}),w.length>0&&!t.media.hidden&&_.jsx("div",{className:`q-media-grid n${Math.min(w.length,4)}${w.length>1?" eq-row":""}${w.length>4?" wrap2":""}`,style:Xl(t),children:w.map((P,x)=>_.jsx(Ur,{src:mt(P)},x))})]}),a&&t.answer.mode!=="match"&&t.question_text.trim()&&_.jsx("p",{className:`q-recall${Or(t.question_text)}`,children:t.question_text}),a&&_.jsxs("div",{className:"answer-block reveal-in",children:[_.jsx("div",{className:"answer-label",children:"ПРАВИЛЬНЫЙ ОТВЕТ"}),E&&_.jsx(D0,{src:mt(E)}),T&&_.jsx(hd,{src:mt(T)}),e.mechanic==="rebus"?_.jsxs(_.Fragment,{children:[_.jsx("div",{className:"answer-main",children:Ns(t)}),_.jsx("div",{className:"rebus-answer",children:w.slice(0,2).map((P,x)=>_.jsxs("figure",{className:"q-img",children:[_.jsx("img",{src:mt(P),alt:""}),_.jsx("figcaption",{children:A0(x===0?t.service.word1:t.service.word2,x===0)})]},x))})]}):t.answer.mode==="match"?_.jsx(Y0,{q:t}):M&&m.length===M.length?_.jsx(Gl,{q:t,choices:M,imgs:m,theme:i.theme}):M?_.jsx(Gl,{q:t,choices:M,theme:i.theme}):t.answer.mode==="order"?_.jsx("div",{className:"order-answer",children:t.answer.correct_order.split("").map((P,x)=>{const C=t.answer.choices.find(U=>U.key===P);return _.jsxs("div",{className:"oi",children:[_.jsx("b",{children:P}),_.jsx("span",{className:"oi-pos",children:x+1}),_.jsx("span",{className:"oi-text",children:(C==null?void 0:C.text)??""})]},x)})}):_.jsxs(_.Fragment,{children:[_.jsx("div",{className:"answer-main",children:Ns(t)}),A.length>0&&_.jsx("div",{className:`q-media-grid answer-media n${Math.min(A.length,4)}${A.length>1?" eq-row":""}${A.length>4?" wrap2":""}`,children:A.map((P,x)=>_.jsx(Ur,{src:mt(P)},x))})]}),g&&t.answer_note&&_.jsx("div",{className:`answer-note${b0(t.answer_note)}`,children:t.answer_note})]})]}),!s&&_.jsxs("div",{className:"team-answers",children:[_.jsx("div",{className:"mono-tag",children:a?"ОТВЕТЫ КОМАНД":`ОТВЕТИЛИ: ${f.length}`}),f.length===0&&_.jsx("div",{style:{color:"var(--dim)"},children:"нет ответов"}),f.map(P=>{const x=o.find(U=>U.id===P.team_id)??c.find(U=>U.id===P.team_id),C=g?P.is_correct??Fr(t.answer,P.answer_text):null;return _.jsxs("div",{className:"team-answer",style:{borderLeft:`5px solid ${C===!0?"var(--ok)":C===!1?"var(--danger)":"var(--dim)"}`},children:[_.jsx("span",{className:"name",style:{color:x==null?void 0:x.color},children:(x==null?void 0:x.name)??"—"}),_.jsxs("span",{className:"text",children:[a?P.answer_text||"—":"• • •",P.stake!=null&&P.stake!==0&&_.jsxs("span",{style:{color:"var(--accent)",fontSize:".7em"},children:[" · ",P.stake]})]}),C!=null&&_.jsx("span",{className:"mark",style:{color:C?"var(--ok)":"var(--danger)"},children:C?"✓":"✗"})]},P.id)})]})]}),_.jsxs("div",{className:"host-actions",children:[d>0&&_.jsx("button",{className:"ghost",onClick:()=>void Ls(d-1,!0),children:"← Назад"}),a?d<u-1?_.jsx("button",{onClick:()=>void Ls(d+1),children:"Следующий вопрос →"}):_.jsx(Xi,{pack:i,gameState:n}):_.jsx("button",{onClick:()=>void Ds(),children:"Показать ответ →"})]})]})}function Gl({q:i,choices:e,imgs:t,theme:n}){const[s,r]=he.useState(0);he.useEffect(()=>{r(0);const d=setTimeout(()=>r(1),2200),g=setTimeout(()=>r(2),Gc);return()=>{clearTimeout(d),clearTimeout(g)}},[i.id]);const a=i.answer.correct_choice??"",o=e.filter(d=>d.key!==a),c=new Set(R0(o.map(d=>d.key),i.id).slice(0,2)),l=d=>s>=1||c.has(d)?s<2?"":d===a?" correct":" dimmed":" hidden-yet",f=d=>c.has(d)?0:.25*e.filter(g=>!c.has(g.key)).findIndex(g=>g.key===d),u=n==="potter";return t?_.jsx("div",{className:"choice-imgs",children:e.map((d,g)=>_.jsxs("div",{className:`choice-img${l(d.key)}`,style:{animationDelay:`${f(d.key)}s`},children:[_.jsx("img",{src:mt(t[g]),alt:""}),_.jsxs("span",{className:"key",children:[d.key,d.text?` — ${d.text}`:""]})]},d.key))}):_.jsx("div",{className:`choices-grid${fd(e.map(d=>d.text))}`,style:{width:"100%",marginTop:0,paddingTop:0},children:e.map(d=>_.jsxs("div",{className:`choice-plate${l(d.key)}`,style:{animationDelay:`${f(d.key)}s`},children:[_.jsx("span",{className:"key",children:d.key}),d.text,u&&l(d.key)===" correct"&&_.jsx(X0,{})]},d.key))})}function X0(){return _.jsx("svg",{className:"mg-check",viewBox:"0 0 24 24",width:"26",height:"26","aria-hidden":"true",children:_.jsx("path",{d:"M4 13l5 5L20 6",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}function q0({enabled:i,startedAt:e,seconds:t}){return he.useEffect(()=>{if(!i||!e)return;const n=new Date(e).getTime()+t*1e3-Date.now(),s=setTimeout(()=>{Ds()},Math.max(0,n));return()=>clearTimeout(s)},[i,e,t]),null}function j0({round:i,gameState:e,isLast:t}){const n=i.settings.autoAdvanceSec??0;return he.useEffect(()=>{if(!n||!e.timer_started_at||t)return;const r=new Date(e.timer_started_at).getTime()+(i.timer_seconds+n)*1e3,a=Math.max(500,r-Date.now()),o=setTimeout(()=>{Hi(e.question_index+1)},a);return()=>clearTimeout(o)},[e.timer_started_at,e.question_index,n]),null}function Y0({q:i}){if(i.answer.mode!=="match")return null;const e=i.answer,t=(i.media.question??[]).filter(s=>!/\.(mp3|mp4|webm|wav)$/i.test(s)),n=e.correct_pairs;return _.jsx("div",{className:`match-answer n${Math.min(e.left.length,6)}`,children:e.left.map((s,r)=>{var c;const a=((c=n.find(l=>l.startsWith(s)))==null?void 0:c.slice(s.length))??"—",o=(e.right_labels??[])[(e.right??[]).indexOf(a)]||a;return _.jsxs("div",{className:"mi",children:[t[r]&&_.jsx("img",{src:mt(t[r]),alt:""}),_.jsxs("div",{className:"mi-label",children:[_.jsxs("b",{children:[s," → ",a]}),o&&o!==a&&_.jsx("span",{className:"mi-text",children:o})]})]},s)})})}function $0({pack:i,gameState:e}){const t=Jn(e.game_id),n=qi(e.game_id),s=$l(i,t,n),r=Kl(i,t,n),a=i.rounds.filter(m=>!m.off_scoreboard),o=zr(t,s,n,r),c=o.map(m=>m.team),[l,f]=he.useState(0);he.useEffect(()=>{if(f(0),c.length===0)return;const m=setInterval(()=>f(h=>h>=c.length?h:h+1),2200);return()=>clearInterval(m)},[c.length,e.round_number]);const u=he.useRef(null),d=kl([c.length,a.length],{shrinkBefore:u}),g=he.useMemo(()=>{const m=new Map(t.map(w=>{const A=s.get(w.id)??0,E=(r.get(w.id)??[])[e.round_number]??0;return[w.id,A-E]})),h=new Map(t.map(w=>[w.id,(r.get(w.id)??[]).slice(0,e.round_number)]));return zr(t,m,n,h).map(w=>w.team)},[t,s,r,n,e.round_number]),v=he.useRef(new Map),M=he.useRef(null);return he.useLayoutEffect(()=>{if(i.theme!=="classic"&&i.theme!=="potter"||c.length===0||l<c.length||M.current===e.round_number||(M.current=e.round_number,!(typeof document<"u"&&document.documentElement.classList.contains("fx-force-motion"))&&typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches))return;const h=new Map(g.map((A,E)=>[A.id,E]));c.forEach((A,E)=>{const T=v.current.get(A.id);if(!T)return;const P=(h.get(A.id)??E)-E;if(P===0)return;const x=T.getBoundingClientRect().height;T.style.transition="none",T.style.transform=`translateY(${P*x}px)`,T.classList.add("sb-flip"),T.offsetHeight,requestAnimationFrame(()=>{T.style.transition="",T.style.transform=""})});const w=setTimeout(()=>{v.current.forEach(A=>A.classList.remove("sb-flip"))},900);return()=>clearTimeout(w)},[l,c,g,i.theme,e.round_number]),_.jsxs("div",{className:"host-screen grid-bg sb-screen",children:[_.jsx("div",{className:"mono-tag",children:"ПОЛОЖЕНИЕ КОМАНД"}),_.jsx("h2",{className:"sb-title",ref:u,children:"ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ"}),_.jsx("div",{className:"sb-table-wrap",children:_.jsxs("table",{ref:d,className:`score-table${Hc(c.length)}`,children:[_.jsx("thead",{children:_.jsxs("tr",{children:[_.jsx("th",{}),_.jsx("th",{children:"Команда"}),a.map((m,h)=>_.jsxs("th",{children:["Р",h+1]},m.id)),_.jsx("th",{children:"Σ"})]})}),_.jsx("tbody",{children:c.map((m,h)=>{const w=o.find(T=>T.team.id===m.id),A=(w==null?void 0:w.place)??1,E=h>=c.length-l;return _.jsxs("tr",{ref:T=>{T?v.current.set(m.id,T):v.current.delete(m.id)},className:`sb-row${E?" is-in":" is-veiled"}${A===1?" leader":""}`,children:[_.jsxs("td",{children:[A<=3?_.jsx("span",{className:"sb-medal",children:_.jsx(Gr,{theme:i.theme,place:A})}):A,(w==null?void 0:w.shared)&&_.jsx("span",{className:"sb-eq",children:"="})]}),_.jsx("td",{style:{color:m.color,fontFamily:"var(--font-display)"},children:_.jsx("span",{className:"sb-name",children:m.name})}),a.map(T=>{const y=r.get(m.id)??[];return _.jsx("td",{children:y[i.rounds.indexOf(T)]??0},T.id)}),_.jsx("td",{className:"total",children:s.get(m.id)??0})]},m.id)})})]})}),_.jsx("div",{className:"host-actions",children:_.jsx(Xi,{pack:i,gameState:e})})]})}function K0({pack:i,round:e,gameState:t}){const n=e.settings.break_after_minutes??10,[s,r]=he.useState(n*60);he.useEffect(()=>{const c=t.timer_started_at?new Date(t.timer_started_at).getTime():Date.now(),l=()=>r(Math.max(0,Math.round(n*60-(Date.now()-c)/1e3)));l();const f=setInterval(l,500);return()=>clearInterval(f)},[t.timer_started_at,n]);const a=String(Math.floor(s/60)).padStart(2,"0"),o=String(s%60).padStart(2,"0");return _.jsxs("div",{className:"host-screen grid-bg break-screen",children:[i.theme!=="potter"&&_.jsx("div",{className:"mono-tag accent",children:"АНТРАКТ"}),_.jsx(gn,{theme:i.theme,lines:["ПЕРЕРЫВ"]}),_.jsx(Gs,{theme:i.theme}),i.theme==="potter"&&_.jsx(Wl,{left:s,seconds:n*60,low:s<=30}),_.jsxs("div",{className:"break-timer",children:[a,":",o]}),_.jsx("div",{className:"host-actions",children:_.jsx(Xi,{pack:i,gameState:t})})]})}function Z0({pack:i,gameState:e}){var o,c;const[n,s]=he.useState(300);he.useEffect(()=>{const l=e.timer_started_at?new Date(e.timer_started_at).getTime():Date.now(),f=()=>s(Math.max(0,Math.round(5*60-(Date.now()-l)/1e3)));f();const u=setInterval(f,500);return()=>clearInterval(u)},[e.timer_started_at]),he.useEffect(()=>{var u,d;const l=((u=i.settings)==null?void 0:u.finale_music)??((d=i.settings)==null?void 0:d.bg_music);if(!l||document.hidden)return;const f=jt();return f.src=mt(l),f.loop=!0,f.volume=.55,f.play().catch(()=>{}),()=>{try{f.pause(),f.src=""}catch{}}},[(o=i.settings)==null?void 0:o.finale_music,(c=i.settings)==null?void 0:c.bg_music]);const r=String(Math.floor(n/60)).padStart(2,"0"),a=String(n%60).padStart(2,"0");return _.jsxs("div",{className:"host-screen grid-bg break-screen counting-screen",children:[_.jsx("div",{className:"mono-tag accent",children:"ПОДВОДИМ ИТОГИ"}),_.jsx(gn,{theme:i.theme,lines:["СЧИТАЕМ","БАЛЛЫ"]}),_.jsx(Gs,{theme:i.theme}),i.theme==="potter"&&_.jsx(Wl,{left:n,seconds:5*60,low:n<=30}),_.jsxs("div",{className:"break-timer",children:[r,":",a]}),_.jsx("div",{className:"counting-sub",children:"Скоро объявим победителей"}),_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>void Yl(e.pack_id,!0),children:"К итогам →"})})]})}function J0({pack:i,gameId:e,gameState:t}){var x,C,U,F,V,Z;const n=Jn(e),s=qi(e),r=$l(i,n,s),a=Kl(i,n,s),o=zr(n,r,s,a),c=!!t.reveal,l=t.question_index??0,[f,u]=he.useState(!((x=i.settings)!=null&&x.show_final_cinematic));he.useEffect(()=>{var j,k;const z=((j=i.settings)==null?void 0:j.finale_music)??((k=i.settings)==null?void 0:k.bg_music);if(!z||document.hidden||!f)return;const I=jt();return I.src=mt(z),I.loop=!0,I.volume=.55,I.play().catch(()=>{}),()=>{try{I.pause(),I.src=""}catch{}}},[(C=i.settings)==null?void 0:C.finale_music,(U=i.settings)==null?void 0:U.bg_music,f]);const d=he.useRef(null),g=kl([o.length],{shrinkBefore:d,minScale:.3}),M=i.rounds.map((z,I)=>({r:z,i:I})).filter(z=>!z.r.off_scoreboard).map(({r:z,i:I})=>{var Q;let j=null,k=-1/0;for(const ce of n){const fe=((Q=a.get(ce.id))==null?void 0:Q[I])??0;fe>k&&(k=fe,j=ce)}return{round:z,idx:I,team:j,score:k}}),m=3e3,h=1e4,w=M.length;he.useEffect(()=>{if(c||l>w||!f)return;const I=setTimeout(()=>void gi(l+1),l===w?h:m);return()=>clearTimeout(I)},[c,l,w,f]);const[A,E]=he.useState(0);if(he.useEffect(()=>{if(E(0),o.length===0)return;let z=!1,I=0,j;const k=()=>{z||(I+=1,E(I),!(I>=o.length)&&(j=setTimeout(k,Math.max(320,900-90*I))))};return j=setTimeout(k,Math.max(320,900-90*I)),()=>{z=!0,clearTimeout(j)}},[o.length,l,c]),!f)return _.jsx(S0,{onDone:()=>u(!0)});const T=["#ffd700","#ff2fa0","#00e5ff","#b6ff3c","#ff8c42"],y=_.jsx(_.Fragment,{children:Array.from({length:5},(z,I)=>_.jsxs("div",{className:"fw-burst",style:{left:`${12+I*19}%`,top:`${18+I%3*14}%`},children:[_.jsx("span",{className:"fw-flash",style:{background:`radial-gradient(circle, ${T[I%T.length]}55, transparent 70%)`,"--dur":`${2.2+I*.3}s`,"--delay":`${I*.45}s`}}),Array.from({length:10},(j,k)=>_.jsx("span",{className:"fw-spark",style:{background:T[(I+k)%T.length],"--a":`${k*36}deg`,"--dur":`${2.2+I*.3}s`,"--delay":`${I*.45}s`}},k))]},I))}),P=_.jsxs("div",{className:"fin-breakdown",children:[_.jsx("div",{className:"mono-tag",children:"РАЗБИВКА ПО РАУНДАМ"}),_.jsx("div",{className:"fin-table-wrap",children:_.jsxs("table",{ref:g,className:`fin-table${Hc(o.length)}`,children:[_.jsx("thead",{children:_.jsxs("tr",{children:[_.jsx("th",{}),_.jsx("th",{children:"Команда"}),i.rounds.map((z,I)=>!z.off_scoreboard&&_.jsxs("th",{children:["Р",Si(i,I)]},z.id)),_.jsx("th",{children:"Σ"})]})}),_.jsx("tbody",{children:o.map(({team:z,place:I,shared:j},k)=>{const Q=k>=o.length-A;return _.jsxs("tr",{className:`fin-row${I<=3?" top3":""}${I===1?" fin-first":""}${Q?" is-in":" is-veiled"}`,children:[_.jsxs("td",{className:"fin-pos",children:[I,j&&_.jsx("span",{className:"sb-eq",children:"="})]}),_.jsx("td",{style:{color:z.color},children:_.jsx("span",{className:"sb-name",children:z.name})}),i.rounds.map((ce,fe)=>{var pe;return!ce.off_scoreboard&&_.jsx("td",{children:((pe=a.get(z.id))==null?void 0:pe[fe])??0},ce.id)}),_.jsx("td",{children:_.jsx("b",{children:r.get(z.id)??0})})]},z.id)})})]})})]});if(c){const z=[...new Set(o.map(k=>k.place))].filter(k=>k<=3).sort((k,Q)=>Q-k);if(l>=z.length)return _.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[y,_.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),_.jsx(gn,{ref:d,theme:i.theme,lines:["РЕЗУЛЬТАТЫ"]}),P,_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Br()},children:"⟲ Новая игра"})})]});const I=z[l],j=o.filter(k=>k.place===I);return _.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void gi(l+1),children:[I===1&&y,_.jsx("div",{className:"mono-tag",children:"НАГРАЖДЕНИЕ"}),_.jsxs("div",{className:`fin-award p${I}`,children:[_.jsxs("div",{className:"fin-award-place",children:[I," МЕСТО"]}),_.jsx("div",{className:"fin-award-medal",children:_.jsx(Gr,{theme:i.theme,place:I})}),j.length>0?j.map(k=>_.jsx("div",{className:"fin-award-name",style:{color:k.team.color},children:k.team.name},k.team.id)):_.jsx("div",{className:"fin-award-name",children:"—"})]})]})}if(l<w){const z=M[l];return _.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void gi(l+1),children:[_.jsx("div",{className:"mono-tag",children:"ВСПОМИНАЕМ ИГРУ"}),_.jsxs("div",{className:"fin-slide",children:[_.jsxs("div",{className:"fin-slide-round",children:["Раунд ",Si(i,z.idx)," · ",z.round.title_lines.join(" ")]}),_.jsx("div",{className:"fin-slide-label",children:"лучший результат"}),_.jsx("div",{className:"fin-slide-team",style:{color:(F=z.team)==null?void 0:F.color},children:((V=z.team)==null?void 0:V.name)??"—"})]}),_.jsx("div",{className:"fin-progress",children:_.jsx("i",{style:{animationDuration:"3s"}})},l),_.jsx("div",{className:"fin-dots",children:M.map((I,j)=>_.jsx("span",{className:j===l?"on":""},j))})]})}if(l===w){const z=o.filter(I=>I.place===1);return _.jsxs("div",{className:"host-screen grid-bg fin-screen",onClick:()=>void gi(l+1),children:[y,_.jsx("div",{className:"mono-tag",children:z.length>1?"ПОБЕДИТЕЛИ ИГРЫ":"ПОБЕДИТЕЛЬ ИГРЫ"}),_.jsxs("div",{className:"fin-award p1",children:[_.jsx("div",{className:"fin-award-medal",children:_.jsx(Gr,{theme:i.theme,place:1})}),z.length>0?z.map(I=>_.jsx("div",{className:"fin-award-name",style:{color:I.team.color},children:I.team.name},I.team.id)):_.jsx("div",{className:"fin-award-name",children:"—"}),_.jsx("div",{className:"fin-award-score",children:((Z=z[0])==null?void 0:Z.total)??0})]}),_.jsx("div",{className:"fin-progress",children:_.jsx("i",{style:{animationDuration:"10s"}})},"w")]})}return _.jsxs("div",{className:"host-screen grid-bg fin-screen",children:[y,_.jsx("div",{className:"mono-tag",children:"ИТОГИ ИГРЫ"}),_.jsx(gn,{theme:i.theme,lines:["РЕЗУЛЬТАТЫ"]}),P,_.jsx("div",{className:"host-actions",children:_.jsx("button",{onClick:()=>{confirm("Начать новую игру?")&&Br()},children:"⟲ Новая игра"})})]})}export{d_ as HostScreen,b0 as noteClass,w0 as stopAllMedia};
