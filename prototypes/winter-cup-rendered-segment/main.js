import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// A single real 3D section. Its visual time is local to this lab; Race V3 is untouched.
const canvas=document.querySelector('#stage');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
renderer.setSize(960,540,false);renderer.setPixelRatio(1);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.38;
const scene=new THREE.Scene();scene.background=new THREE.Color('#172541');scene.fog=new THREE.Fog('#293a57',58,135);
const viewH=13.5,camera=new THREE.OrthographicCamera(-viewH*16/9/2,viewH*16/9/2,viewH/2,-viewH/2,.1,160);
camera.position.set(0,21,39);camera.lookAt(0,1,0);
function skyTexture(){
  const c=document.createElement('canvas');c.width=1536;c.height=864;const q=c.getContext('2d');
  const g=q.createLinearGradient(0,0,0,864);g.addColorStop(0,'#111b35');g.addColorStop(.13,'#363358');g.addColorStop(.28,'#765475');g.addColorStop(.52,'#b47b86');g.addColorStop(1,'#d29a90');q.fillStyle=g;q.fillRect(0,0,1536,864);
  const rand=seeded(92831);for(let i=0;i<220;i++){const x=rand()*1536,y=rand()*530,r=.45+rand()*1.5;q.fillStyle=`rgba(255,237,219,${.24+rand()*.65})`;q.beginPath();q.arc(x,y,r,0,Math.PI*2);q.fill()}
  for(let k=0;k<4;k++){q.lineWidth=27+k*10;q.strokeStyle=['rgba(120,212,194,.13)','rgba(186,153,209,.13)','rgba(132,211,179,.12)','rgba(230,183,185,.07)'][k];q.beginPath();for(let x=0;x<=1536;x+=14){let y=65+k*22+25*Math.sin(x*.005+k*.7)+17*Math.sin(x*.013-k);if(x===0)q.moveTo(x,y);else q.lineTo(x,y)}q.stroke()}
  const halo=q.createRadialGradient(1285,112,8,1285,112,88);halo.addColorStop(0,'rgba(255,231,196,.65)');halo.addColorStop(1,'rgba(255,231,196,0)');q.fillStyle=halo;q.beginPath();q.arc(1285,112,88,0,Math.PI*2);q.fill();q.fillStyle='#f4e6d9';q.beginPath();q.arc(1285,112,28,0,Math.PI*2);q.fill();
  q.fillStyle='rgba(42,62,91,.75)';q.beginPath();q.moveTo(0,300);for(let x=0;x<=1536;x+=39)q.lineTo(x,148+31*Math.sin(x*.011)+15*Math.sin(x*.034));q.lineTo(1536,340);q.closePath();q.fill();
  q.fillStyle='rgba(87,99,131,.63)';q.beginPath();q.moveTo(0,340);for(let x=0;x<=1536;x+=33)q.lineTo(x,189+20*Math.sin(x*.008+2)+13*Math.sin(x*.029));q.lineTo(1536,370);q.closePath();q.fill();
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const sky=mesh(new THREE.PlaneGeometry(viewH*16/9,viewH),new THREE.MeshBasicMaterial({map:skyTexture(),depthWrite:false,fog:false,side:THREE.DoubleSide}),0,0,-100,camera);
scene.add(camera);
scene.add(new THREE.HemisphereLight('#adcaff','#33445c',2.4));
const moonLight=new THREE.DirectionalLight('#d6defb',1.35);moonLight.position.set(-18,32,19);scene.add(moonLight);
const warmLight=new THREE.DirectionalLight('#f8c98e',.8);warmLight.position.set(25,10,-13);scene.add(warmLight);

const materialCache=new Map();
function mat(color,roughness=.9,extra={}){
  if(Object.keys(extra).length)return new THREE.MeshLambertMaterial({color,...extra});
  const key=`lambert/${color}`;if(!materialCache.has(key))materialCache.set(key,new THREE.MeshLambertMaterial({color}));return materialCache.get(key);
}
function basic(color,extra={}){
  if(Object.keys(extra).length)return new THREE.MeshBasicMaterial({color,...extra});
  const key=`basic/${color}`;if(!materialCache.has(key))materialCache.set(key,new THREE.MeshBasicMaterial({color}));return materialCache.get(key);
}
const snowMat=mat('#e9f1ed',.94),snowEdgeMat=mat('#f6f3ec',.98),darkWood=mat('#342d32',1),wood=mat('#70514c',.94),woodLight=mat('#a37860',.95),pine=mat('#164951',.96),pineLight=mat('#27676a',.93),pineDark=mat('#123840',.98),gold=mat('#d4aa68',.5),copper=mat('#bb7558',.6);
const glowMat=basic('#ffd59a');
const unitBox=new THREE.BoxGeometry(1,1,1),unitSphere=new THREE.SphereGeometry(1,10,8),unitCone=new THREE.ConeGeometry(1,1,8);
const world=new THREE.Group();scene.add(world);
function mesh(geom,material,x=0,y=0,z=0,parent=world){const m=new THREE.Mesh(geom,material);m.position.set(x,y,z);parent.add(m);return m}
function box(w,h,d,material,x,y,z,parent=world){return mesh(new THREE.BoxGeometry(w,h,d),material,x,y,z,parent)}
function orb(r,material,x,y,z,parent=world){const m=mesh(unitSphere,material,x,y,z,parent);m.scale.setScalar(r);return m}
function line3(points,r,material,parent=world){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),Math.max(4,points.length*5),r,5,false),material,0,0,0,parent)}
function seeded(seed){let s=seed>>>0;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296)}
const rng=seeded(51124);

function iceTexture(){
  const c=document.createElement('canvas');c.width=1024;c.height=256;const q=c.getContext('2d');
  const g=q.createLinearGradient(0,0,0,256);g.addColorStop(0,'#bbd9e2');g.addColorStop(.42,'#92becf');g.addColorStop(1,'#c8e0e4');q.fillStyle=g;q.fillRect(0,0,1024,256);
  for(let i=0;i<380;i++){const x=rng()*1024,y=rng()*256,len=8+rng()*95;q.strokeStyle=rng()>.48?'rgba(240,252,255,.27)':'rgba(44,110,133,.12)';q.lineWidth=.4+rng()*1.4;q.beginPath();q.moveTo(x,y);q.lineTo(x+len,y+(rng()-.5)*7);q.stroke()}
  for(let i=0;i<26;i++){let x=rng()*1024,y=rng()*256;q.strokeStyle='rgba(249,253,253,.25)';q.lineWidth=.5;q.beginPath();q.moveTo(x,y);for(let j=0;j<5;j++){x+=10+rng()*25;y+=(rng()-.5)*17;q.lineTo(x,y)}q.stroke()}
  for(let i=0;i<1100;i++){q.fillStyle=rng()>.5?'rgba(255,255,255,.12)':'rgba(31,83,112,.075)';q.fillRect(rng()*1024,rng()*256,1+rng()*3,1+rng()*2)}
  const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;t.wrapT=THREE.RepeatWrapping;t.repeat.set(7,1);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;
}
function woodTexture(){const c=document.createElement('canvas');c.width=512;c.height=256;const q=c.getContext('2d');q.fillStyle='#6d5146';q.fillRect(0,0,512,256);for(let y=0;y<256;y+=17){q.fillStyle=y%2?'#7b5b4b':'#765447';q.fillRect(0,y,512,15);q.strokeStyle='rgba(25,20,25,.45)';q.beginPath();q.moveTo(0,y+16);q.lineTo(512,y+16);q.stroke();for(let i=0;i<9;i++){q.strokeStyle='rgba(220,176,135,.12)';q.beginPath();let yy=y+3+rng()*11;q.moveTo(i*65,yy);q.lineTo(i*65+35+rng()*20,yy+.7);q.stroke()}}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=THREE.RepeatWrapping;t.repeat.set(2,1);return t}
const ice=mat('#d2ecf2',.37,{metalness:.12,map:iceTexture()}),plank=mat('#ffffff',.95,{map:woodTexture()});
const scarMat=basic('#e9f8f7',{transparent:true,opacity:.23}),lampHaloMat=basic('#ffca83',{transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide}),bannerMat=mat('#ae4b58',.9,{side:THREE.DoubleSide});
const ground=mesh(new THREE.PlaneGeometry(145,34),snowMat,37,-.12,5);ground.rotation.x=-Math.PI/2;
const lanes=[-8.3,-4.15,0,4.15,8.3],laneWidth=4.15;
for(let i=0;i<5;i++){
  const lane=mesh(new THREE.PlaneGeometry(145,laneWidth-.16),ice,37,.015,lanes[i]);lane.rotation.x=-Math.PI/2;
  const wear=mat(i%2?'#d9eff0':'#b9dce3',.7,{transparent:true,opacity:.35});
  for(let j=-1;j<=1;j+=2){const stripe=mesh(new THREE.PlaneGeometry(145,.12),wear,37,.021,lanes[i]+j*.98);stripe.rotation.x=-Math.PI/2}
  for(let x=-28;x<112;x+=1.9){
    const f=(Math.sin(x*1.3+i*2.2)+1)/2;
    if(f>.6){const scar=mesh(new THREE.PlaneGeometry(.46,.018),scarMat,x,.024,lanes[i]+(rng()-.5)*2.5);scar.rotation.x=-Math.PI/2;scar.rotation.z=(rng()-.5)*.18}
  }
}
// A continuous, low irregular snow extrusion separates lanes without blocking paws.
function snowRidge(z,outer=false){
  const verts=[],idx=[],steps=158,start=-30,end=111,hw=outer?.33:.13;
  for(let i=0;i<=steps;i++){
    const x=start+(end-start)*i/steps,wig=.035*Math.sin(i*.7+z*4),height=(outer?.27:.105)+.035*Math.sin(i*.83+z);
    verts.push(x,0,z-hw+wig,x,height,z+wig,x,0,z+hw+wig);
    if(i<steps){let b=i*3;idx.push(b,b+3,b+1,b+1,b+3,b+4,b+1,b+4,b+2,b+2,b+4,b+5)}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();mesh(g,outer?snowEdgeMat:snowMat);
  const base=box(end-start,.07,hw*2.3,mat('#8eb5c2',.8),40.5,.03,z);
  base.position.y=.015;
  const crest=[];for(let x=start;x<=end;x+=1.35)crest.push([x,(outer?.28:.12)+.022*Math.sin(x*1.35+z),z+.015*Math.sin(x*2+z)]);
  line3(crest,outer?.095:.047,snowEdgeMat);
}
for(let i=0;i<=5;i++)snowRidge(-10.375+i*4.15,i===0||i===5);

// The spectator safety rail is behind all five lanes. The near edge remains low.
for(let x=-25;x<109;x+=2.9){box(.12,.88,.12,darkWood,x,.42,-10.95);box(.16,.33,.17,snowEdgeMat,x,.92,-10.95)}
box(143,.11,.1,woodLight,40,.82,-10.95);
box(143,.08,.13,woodLight,40,.32,-10.95);
for(let x=-24;x<109;x+=3.4){box(.075,.23,.1,snowEdgeMat,x,.13,10.62)}

// Distant stars and moon move at their own parallax rate. The ridge is a
// procedural sky texture, never a scrolling concept JPEG.
const distant=new THREE.Group();scene.add(distant);
const starGeo=new THREE.BufferGeometry(),stars=[];for(let i=0;i<140;i++)stars.push(-45+rng()*165,1+rng()*23,-30);starGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
distant.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:'#ffe8cf',size:.105,sizeAttenuation:true,transparent:true,opacity:.72})));
const moon=orb(2,basic('#f5e7d5'),54,17,-29,distant);moon.scale.z=.1;
const halo=orb(3.5,basic('#d4c9e9',{transparent:true,opacity:.12,depthWrite:false}),54,17,-29.15,distant);halo.scale.z=.02;

// Model library: detailed, textured assembly rather than bare geometric placeholders.
function fir(x,z,h,decorated=false){
  const g=new THREE.Group();g.position.set(x,-1.15,z);world.add(g);
  box(.23,h*.35,.23,wood,0,h*.16,0,g);
  for(let layer=0;layer<5;layer++){
    const w=h*(.30-layer*.042),height=h*.46;
    const cone=mesh(new THREE.ConeGeometry(w,height,9),layer%2?pine:pineLight,0,h*.28+layer*h*.135,0,g);cone.rotation.y=layer*.31;
    const cap=mesh(new THREE.ConeGeometry(w*.69,height*.20,9),snowEdgeMat,0,h*.44+layer*h*.135,0,g);cap.rotation.y=layer*.31;
  }
  if(decorated){for(let j=0;j<12;j++){let a=j*2.4,y=.55+j%5*h*.16,r=h*(.24-j%5*.034);orb(.035,j%2?glowMat:basic('#f8a797'),Math.cos(a)*r,y,Math.sin(a)*r,g)}}
  return g;
}
function lantern(x,z,h=2.4){
  const g=new THREE.Group();g.position.set(x,0,z);world.add(g);
  box(.11,h,.11,darkWood,0,h/2,0,g);box(.48,.12,.48,darkWood,0,h,0,g);
  box(.33,.36,.33,glowMat,0,h+.23,0,g);box(.45,.085,.45,snowEdgeMat,0,h+.46,0,g);
  const halo=mesh(new THREE.PlaneGeometry(1.65,1.65),lampHaloMat,0,h+.23,.01,g);
  halo.rotation.y=.06;return g;
}
function fan(x,y,z,k,parent){
  const g=new THREE.Group();g.position.set(x,y,z);g.userData.dynamic=k===0;parent.add(g);
  const coats=['#ab464d','#c78260','#4d7291','#7b638e','#d2a35f','#4c6d6c'];
  const coat=mat(coats[k%coats.length]),skin=mat(['#d49c7a','#f1c9a5','#a86f5b'][k%3]);
  const body=mesh(new THREE.CylinderGeometry(.13,.18,.45,7),coat,0,.36,0,g);
  orb(.13,skin,0,.72,0,g);mesh(new THREE.CylinderGeometry(.155,.14,.09,8),k%3?gold:copper,0,.83,0,g);
  const scarf=mesh(new THREE.TorusGeometry(.15,.038,5,12),k%2?gold:snowEdgeMat,0,.57,0,g);scarf.rotation.x=Math.PI/2;
  const left=new THREE.Group(),right=new THREE.Group();left.position.set(-.15,.56,0);right.position.set(.15,.56,0);g.add(left,right);
  mesh(new THREE.CylinderGeometry(.045,.053,.35,6),coat,-.09,-.13,0,left).rotation.z=-.36;
  mesh(new THREE.CylinderGeometry(.045,.053,.35,6),coat,.09,-.13,0,right).rotation.z=.36;
  left.rotation.z=k%5===0?-.9:-.18-(k%3)*.1;
  right.rotation.z=k%4===0?.9:.16+(k%3)*.12;
  orb(.05,skin,-.20,-.28,0,left);orb(.05,skin,.20,-.28,0,right);
  return {left,right,k,g};
}
const fans=[];
function grandstand(cx,w=12,rows=3){
  const g=new THREE.Group();g.position.set(cx,0,-11.9);world.add(g);
  box(w+.6,.36,3.9,wood,0,.17,-.2,g);
  for(let r=0;r<rows;r++){
    const z=.95-r*.93,y=.35+r*.58;
    box(w,.18,.84,plank,0,y,z,g);box(w,.42,.09,darkWood,0,y+.3,z-.37,g);
    const count=Math.floor(w/.68);for(let j=0;j<count;j++){
      let x=-w/2+.37+j*w/count+(rng()-.5)*.16;
      const person=fan(x,y+.15+(rng()-.5)*.07,z-.04+(rng()-.5)*.08,r*30+j,g);
      person.left.parent.scale.setScalar(.86+rng()*.25);
      if(person.g.userData.dynamic)fans.push(person);
    }
  }
  for(let x of [-w/2+.2,w/2-.2]){
    box(.18,2.75,.18,woodLight,x,1.38,-.6,g);box(.37,.16,.37,snowEdgeMat,x,2.83,-.6,g)
  }
  box(w+1,.17,4.4,darkWood,0,2.78,-.8,g);
  const roof=box(w+1.3,.18,4.5,wood,0,2.95,-.82,g);roof.rotation.x=.13;
  const roofSnow=box(w+1.3,.20,4.5,snowEdgeMat,0,3.12,-.84,g);roofSnow.rotation.x=.13;
  for(let x=-w/2;x<=w/2;x+=.68){orb(.055,Math.round(x*10)%2?glowMat:basic('#f5aaa1'),x,2.75,1.52,g)}
  line3([[-w/2,2.75,1.54],[-w/4,2.61,1.59],[0,2.72,1.58],[w/4,2.60,1.59],[w/2,2.75,1.54]],.026,pine,g);
  return g;
}

function chalet(x,z,scale=1){
  const g=new THREE.Group();g.position.set(x,-1.5,z);g.scale.setScalar(scale);world.add(g);
  box(5.2,2.7,2.9,plank,0,1.36,0,g);box(5.55,.23,3.1,darkWood,0,2.71,0,g);
  // Pitched roof with a snow cap and exposed dark timber ends.
  for(const s of [-1,1]){
    let a=box(3.65,.23,3.8,wood,s*1.38,3.58,0,g);a.rotation.z=-s*.48;
    let b=box(3.7,.16,3.85,snowEdgeMat,s*1.39,3.76,0,g);b.rotation.z=-s*.48;
  }
  for(const wx of [-1.7,0,1.7]){
    box(.7,.87,.045,darkWood,wx,1.47,1.5,g);box(.58,.74,.06,glowMat,wx,1.48,1.54,g);
    box(.07,.82,.09,woodLight,wx,1.48,1.60,g);box(.64,.07,.08,woodLight,wx,1.48,1.61,g)
  }
  box(1.03,1.55,.07,darkWood,0,.82,1.55,g);box(.85,1.43,.08,wood,0,.75,1.6,g);
  const wreath=mesh(new THREE.TorusGeometry(.37,.085,7,20),pineLight,0,2.28,1.65,g);orb(.08,copper,0,1.92,1.69,g);
  for(let j=0;j<10;j++)orb(.05,j%2?glowMat:copper,-2.45+j*.54,2.83,1.63,g);
  return g;
}
function banner(x,z){
  box(.055,3.3,.055,darkWood,x,1.65,z);box(.13,.15,.13,gold,x,3.38,z);
  const s=new THREE.Shape();s.moveTo(0,0);s.lineTo(1.12,0);s.lineTo(.86,-.75);s.lineTo(.56,-.55);s.lineTo(.2,-.77);s.closePath();
  const flag=mesh(new THREE.ShapeGeometry(s),bannerMat,x,3.08,z+.02);flag.rotation.y=.07;
  line3([[x+.10,2.91,z+.04],[x+.45,2.87,z+.04],[x+.82,2.83,z+.04]],.022,gold);
}

// This is one village-sport section, not the five-zone route.
for(const x of [-16,8,31,55,78,102]){
  grandstand(x,11.5,3);
  chalet(x+9.5,-11.55,.65);
}
for(let x=-27;x<113;x+=7.8){
  if([8,31,55,78].some(q=>Math.abs(x-q)<5))continue;
  fir(x,-11.8,2.2+rng()*1.4,Math.floor(x)%3===0);
  if(Math.floor(x)%2===0)fir(x+2.8,-13.5,2+rng()*1.2);
}
for(let x=-18;x<110;x+=7.5){lantern(x,-9.8,2.15);if(Math.round(x)%3===0)banner(x+2,-9.9)}
// Suspended lights remain behind the far spectator rail.
for(let x=-22;x<107;x+=11){
  const pts=[];for(let j=0;j<=10;j++)pts.push([x+j*1.1,3.7-.55*Math.sin(j/10*Math.PI),-11.9]);
  line3(pts,.018,darkWood);for(let j=0;j<=10;j+=2)orb(.08,j%4?glowMat:basic('#eaa9a3'),pts[j][0],pts[j][1]-.02,-11.9);
}

// Collapse static meshes by material/vertex signature. This preserves world-space
// depth and materials while avoiding hundreds of SwiftShader draw calls.
function batchStatic(){
  world.updateMatrixWorld(true);const buckets=new Map(),removed=[];
  world.traverse(o=>{
    if(!o.isMesh)return;
    for(let p=o.parent;p&&p!==world;p=p.parent)if(p.userData.dynamic)return;
    const attrs=Object.keys(o.geometry.attributes).sort().join(',');
    const worldX=o.matrixWorld.elements[12];
    const global=o.geometry.boundingBox?.max.x-o.geometry.boundingBox?.min.x>30 || o.geometry.parameters?.width>30;
    const chunk=global?'global':Math.floor((worldX+30)/16);
    const key=`${o.material.uuid}/${attrs}/${!!o.geometry.index}/${chunk}`;
    if(!buckets.has(key))buckets.set(key,{material:o.material,geometries:[]});
    const geom=o.geometry.clone();geom.applyMatrix4(o.matrixWorld);
    buckets.get(key).geometries.push(geom);removed.push(o);
  });
  for(const o of removed)o.parent.remove(o);
  for(const {material,geometries} of buckets.values()){
    const geometry=geometries.length===1?geometries[0]:mergeGeometries(geometries,false);
    if(!geometry)throw Error('Static geometry merge failed');
    geometry.computeBoundingSphere();const m=new THREE.Mesh(geometry,material);world.add(m);
  }
  return {sources:removed.length,batches:buckets.size};
}
const batching=batchStatic();

// Five neutral size envelopes: optional diagnostic, never actual dog assets.
const markerTex=(()=>{const c=document.createElement('canvas');c.width=256;c.height=176;const q=c.getContext('2d');q.clearRect(0,0,256,176);q.strokeStyle='#ffe7b2';q.lineWidth=5;q.setLineDash([12,8]);q.strokeRect(14,16,228,146);q.setLineDash([]);q.fillStyle='rgba(248,226,188,.16)';q.fillRect(17,19,222,140);q.fillStyle='#ffe7b2';q.font='bold 41px system-ui';q.textAlign='center';q.fillText('2.4 × 2.1',128,100);let t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t})();
const markerMat=new THREE.MeshBasicMaterial({map:markerTex,transparent:true,depthWrite:false,side:THREE.DoubleSide});
const markers=lanes.map((z,i)=>{
  const p=mesh(new THREE.PlaneGeometry(2.4,2.05),markerMat,0,1.035,z);p.visible=false;
  const foot=mesh(new THREE.CircleGeometry(.52,20),basic('#d2e2e7',{transparent:true,opacity:.3,depthWrite:false}),0,.035,z);foot.rotation.x=-Math.PI/2;foot.visible=false;
  return {p,foot,i};
});

const play=document.querySelector('#play'),timeline=document.querySelector('#timeline'),markerToggle=document.querySelector('#markers'),status=document.querySelector('#status');
let t=0,last=0,running=false,frames=0,deltas=[],timeStart=performance.now(),lastPose=-1,poseSkips=0;
function renderAt(value){
  t=Math.max(0,Math.min(18,value));const camX=-4+t*3.23;
  camera.position.x=camX;camera.lookAt(camX,1,0);
  distant.position.x=camX*.68;
  for(const {p,foot,i} of markers){const x=-3+t*(3.23+[-.10,.05,-.03,.11,-.06][i])+[-.4,.15,0,.4,-.2][i];p.position.x=x;foot.position.x=x;p.visible=markerToggle.checked;foot.visible=markerToggle.checked}
  for(const fan of fans){if(fan.k%4===0)fan.right.rotation.z=.16+Math.sin(t*3+fan.k*.9)*.95;else if(fan.k%7===0)fan.left.rotation.z=-.1-Math.sin(t*2.4+fan.k)*.7}
  renderer.render(scene,camera);timeline.value=t.toFixed(2);status.textContent=`${t.toFixed(1)} / 18,0 с`;
}
function step(now){
  if(!last)last=now;const dt=Math.min(.25,(now-last)/1000);last=now;
  if(running){if(t>=18){running=false;play.textContent='Повторить';}else renderAt(t+dt)}
  if(running){frames++;if(now-timeStart>1000){deltas.push(now-timeStart);timeStart=now}}
  requestAnimationFrame(step);
}
play.addEventListener('click',()=>{if(t>=18)renderAt(0);running=!running;play.textContent=running?'Пауза':'Запустить камеру';last=performance.now()});
timeline.addEventListener('input',()=>{running=false;play.textContent='Запустить камеру';renderAt(Number(timeline.value))});
markerToggle.addEventListener('change',()=>renderAt(t));
renderAt(0);requestAnimationFrame(step);
window.winterCup={canvas,renderer,scene,camera,renderAt,play:()=>play.click(),setMarkers(v){markerToggle.checked=!!v;renderAt(t)},get time(){return t},get ready(){return true},get batching(){return batching},get memory(){return {...renderer.info.memory,render:{...renderer.info.render}}},get markerScreenBounds(){
  const rect=canvas.getBoundingClientRect(),project=(x,y,z)=>{const p=new THREE.Vector3(x,y,z).project(camera);return {x:rect.x+(p.x+1)*rect.width/2,y:rect.y+(1-p.y)*rect.height/2}};
  return markers.map(({p,i})=>{const z=p.position.z,x=p.position.x,a=project(x-1.2,.01,z),b=project(x+1.2,2.06,z);return {lane:i+1,left:a.x,right:b.x,top:b.y,bottom:a.y}});
}};
