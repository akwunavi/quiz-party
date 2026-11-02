import * as THREE from 'three';

const root=document.getElementById('stage');
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
renderer.setSize(root.clientWidth,root.clientHeight);renderer.setPixelRatio(1);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=false;
root.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#b1cbd2');scene.fog=new THREE.Fog('#b1cbd2',32,85);
const camera=new THREE.PerspectiveCamera(35,root.clientWidth/root.clientHeight,.1,140);
const hemi=new THREE.HemisphereLight('#e7f7ff','#66868c',2);scene.add(hemi);
const sun=new THREE.DirectionalLight('#fff3d8',2.1);sun.position.set(20,20,12);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-28;sun.shadow.camera.right=28;sun.shadow.camera.top=18;sun.shadow.camera.bottom=-18;scene.add(sun);
const material=(color,roughness=1)=>new THREE.MeshStandardMaterial({color,roughness});
const snow=material('#f3faf7'),ice=material('#accfd7',.28),ice2=material('#bddde2',.26),wood=material('#6b4435'),pine=material('#225549'),white=material('#ffffff'),red=material('#b9323b'),gold=material('#e0af60');
function mesh(geom,mat,x,y,z,shadow=false){const m=new THREE.Mesh(geom,mat);m.position.set(x,y,z);m.castShadow=shadow;m.receiveShadow=true;scene.add(m);return m}
const ground=mesh(new THREE.PlaneGeometry(110,55),snow,45,-.09,0);ground.rotation.x=-Math.PI/2;
const lanes=[-6,-3,0,3,6];
for(const z of lanes)for(let section=0;section<9;section++){
  mesh(new THREE.BoxGeometry(10,.07,2.25),section%3===1?ice2:ice,section*10+5,-.025,z);
  mesh(new THREE.BoxGeometry(10,.015,.025),white,section*10+5,.03,z+1.1);
}
function tree(x,z,h=2.4){mesh(new THREE.CylinderGeometry(.12,.17,.7,7),wood,x,.31,z,true);for(let j=0;j<3;j++)mesh(new THREE.ConeGeometry((.9-j*.16)*h/2.4,.9*h/2.4,8),pine,x,.75*h/2.4+j*.5*h/2.4,z,true)}
function flag(x,z,color=red){mesh(new THREE.CylinderGeometry(.025,.025,3,6),wood,x,1.5,z);mesh(new THREE.PlaneGeometry(.75,.5),color,x+.38,2.65,z)}
function stand(x,z,color=wood){for(let level=0;level<3;level++)mesh(new THREE.BoxGeometry(11,.45,1.2),color,x,.2+level*.5,z-level*.8,true);
  // Crowd silhouettes are world objects; no external asset or paid service.
  const crowd=new THREE.InstancedMesh(new THREE.SphereGeometry(.11,6,5),new THREE.MeshStandardMaterial({color:'#ffffff'}),69);
  const dummy=new THREE.Object3D();let n=0;
  for(let row=0;row<3;row++)for(let col=0;col<23;col++){
    dummy.position.set(x-5.2+col*.46,.55+row*.5,z-row*.8);dummy.updateMatrix();crowd.setMatrixAt(n,dummy.matrix);
    crowd.setColorAt(n,new THREE.Color(['#b9323b','#e0af60','#225549','#ffffff'][(row+col*3)%4]));n++;
  }
  crowd.instanceMatrix.needsUpdate=true;scene.add(crowd);
}
// Distinct route sections, all safely behind the dogs (negative Z).
stand(2,-10);flag(-2,-8);flag(6,-8,gold);
for(let x=14;x<33;x+=3.4)tree(x,-11-(x%3),2+(x%4)*.25);
for(let x=33;x<48;x+=3.8)mesh(new THREE.IcosahedronGeometry(1.4,0),ice2,x,1.2,-12-(x%3),true);
stand(52,-10,material('#4b6871'));flag(48,-8,gold);flag(57,-8,red);
for(let x=62;x<76;x+=2.8)tree(x,-11,2.5);
stand(82,-10);flag(77,-8);flag(86,-8,gold);
for(const x of [0,80])for(const z of lanes){mesh(new THREE.BoxGeometry(.22,.018,2.25),white,x,.035,z);mesh(new THREE.BoxGeometry(.18,.018,1.1),material('#263844'),x+.2,.04,z+.5)}
for(let x=0;x<=80;x+=10){const marker=mesh(new THREE.CylinderGeometry(.09,.13,.7,7),gold,x,.3,-7.3);marker.castShadow=true}

const roster=[['Фрэнк','frank'],['Зефир','zephyr'],['Пупс','dog4'],['Фрэнк · дубль','frank'],['Зефир · дубль','zephyr']];
const bounds={frank:[95,38,271,203],zephyr:[55,34,293,209],dog4:[113,22,254,200]};
const racers=[];const shadowMaterial=new THREE.MeshBasicMaterial({color:'#263c47',transparent:true,opacity:.22,depthWrite:false});
for(let i=0;i<5;i++){
  const [name,key]=roster[i],b=bounds[key],h=1.8*216/(b[3]-b[1]);
  const canvas=document.createElement('canvas');canvas.width=384;canvas.height=216;
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
  const plane=mesh(new THREE.PlaneGeometry(h*384/216,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,alphaTest:.02,depthWrite:false,side:THREE.DoubleSide}),0,0,lanes[i]);
  plane.renderOrder=15-i;
  const shadow=mesh(new THREE.CircleGeometry(.68,24),shadowMaterial,0,.04,lanes[i]);shadow.rotation.x=-Math.PI/2;shadow.renderOrder=1;
  const raw=new Image(),stable=new Image();raw.src=`./assets/${key}-raw.png`;stable.src=`./assets/${key}-stable.png`;
  racers.push({name,key,canvas,tex,plane,shadow,raw,stable,h,b,frameKey:''});
}

// A real world X trajectory. One racer pauses from 6.0–7.2 s; others pass it.
function racerX(t,i){const base=[4.7,4.9,5.1,4.6,5.0][i],lead=[0,.3,-.2,.8,-.5][i];
  const pause=i===2?Math.max(0,Math.min(t-6,1.2)):0;
  const acceleration=Math.min(t,1.2)*.4;
  return lead+base*(t-pause)+acceleration;
}
function median(values){return [...values].sort((a,b)=>a-b)[2]}
const cameraPath=[1.5];
for(let step=1;step<=1200;step++){
  const t=step/60,target=median(roster.map((_,i)=>racerX(t,i)))+1;
  const prev=cameraPath.at(-1),delta=target-prev;
  // Smooth follow with capped speed. A single stop cannot jerk the camera.
  cameraPath.push(prev+Math.max(-5.5/60,Math.min(5.5/60,delta*(1-Math.exp(-1/60/.85)))));
}
const followedX=t=>{const a=Math.min(1199,Math.max(0,Math.floor(t*60))),u=t*60-a;return cameraPath[a]*(1-u)+cameraPath[a+1]*u};
let time=0,playing=false,stableMode=true,playBase=0,playStart=0,framesRendered=0;
function renderAt(t,stable=stableMode){time=t;stableMode=stable;
  const cx=followedX(t);camera.position.set(cx,12.5,28);camera.lookAt(cx,0,0);camera.zoom=1.22;camera.updateProjectionMatrix();
  for(let i=0;i<5;i++){
    const r=racers[i],cycle=stable&&r.key==='dog4'?11:12;
    const frame=Math.floor(t*24+i*2)%cycle,img=stable?r.stable:r.raw,key=`${stable}-${frame}`;
    if(img.complete&&img.naturalWidth&&r.frameKey!==key){const ctx=r.canvas.getContext('2d');ctx.clearRect(0,0,384,216);ctx.drawImage(img,(frame%4)*384,Math.floor(frame/4)*216,384,216,0,0,384,216);r.tex.needsUpdate=true;r.frameKey=key}
    const x=racerX(t,i);r.plane.position.x=x;r.shadow.position.x=x;
    const depth=Math.hypot(cx-x,12.5,28-r.plane.position.z),reference=Math.hypot(cx-x,12.5,28),scale=depth/reference;
    r.plane.scale.setScalar(scale);r.plane.position.y=.04+(r.h/2-(216-r.b[3])*r.h/216)*scale;
    r.shadow.scale.set(scale,scale*.4,scale);
  }
  scene.fog.near=32;scene.fog.far=85;
  renderer.render(scene,camera);
  document.getElementById('readout').textContent=`t ${t.toFixed(1)} c · камера X ${cx.toFixed(1)} · группа ${Math.min(...racers.map((_,i)=>racerX(t,i))).toFixed(1)}–${Math.max(...racers.map((_,i)=>racerX(t,i))).toFixed(1)}`;
  return {t,cameraX:cx,dogs:roster.map((r,i)=>({name:r[0],x:racerX(t,i),z:lanes[i]}))};
}
function tick(now){if(playing){renderAt(Math.min(19,playBase+(now-playStart)/1000));framesRendered++}requestAnimationFrame(tick)}requestAnimationFrame(tick);
document.getElementById('play').onclick=()=>{playing=!playing;if(playing){playBase=time;playStart=performance.now()}document.getElementById('play').textContent=playing?'Ⅱ Пауза':'▶ Play'};
document.getElementById('reset').onclick=()=>{playing=false;document.getElementById('play').textContent='▶ Play';renderAt(0)};
document.getElementById('mode').onclick=()=>{stableMode=!stableMode;renderAt(time);document.getElementById('mode').textContent=stableMode?'Стабильные якоря':'Без коррекции'};
addEventListener('resize',()=>{camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight)});
window.routeLab={ready:true,renderAt,canvas:renderer.domElement,get stable(){return stableMode},get time(){return time},get framesRendered(){return framesRendered}};
Promise.all(racers.flatMap(r=>[r.raw.decode(),r.stable.decode()])).then(()=>renderAt(0));
