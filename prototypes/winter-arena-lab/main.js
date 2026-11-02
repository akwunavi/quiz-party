import * as THREE from 'three';

const root=document.getElementById('scene');
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(root.clientWidth,root.clientHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;root.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#b6d4d5');scene.fog=new THREE.Fog('#b6d4d5',32,62);
const camera=new THREE.PerspectiveCamera(36,root.clientWidth/root.clientHeight,.1,100);
const hemi=new THREE.HemisphereLight('#f5fbff','#7d999b',2.3);scene.add(hemi);
const sun=new THREE.DirectionalLight('#fff0d7',2.5);sun.position.set(-7,16,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-22;sun.shadow.camera.right=22;sun.shadow.camera.top=22;sun.shadow.camera.bottom=-22;scene.add(sun);
const world=new THREE.Group();scene.add(world);
const mat=(c,rough=1)=>new THREE.MeshStandardMaterial({color:c,roughness:rough});
const snow=mat('#e9f3ef'), pine=mat('#1c594c'),pine2=mat('#286956'),trunk=mat('#69543d'),ice=mat('#a9d9d8',.22),stripe=mat('#e5f3ed');
const ground=new THREE.Mesh(new THREE.PlaneGeometry(60,50),snow);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;ground.position.y=-.1;world.add(ground);
const laneZ=[-6,-3,0,3,6];
const laneParts=[];
for(let i=0;i<5;i++){
  const lane=new THREE.Mesh(new THREE.BoxGeometry(20,.08,2.75),ice);lane.position.set(0,-.02,laneZ[i]);lane.receiveShadow=true;world.add(lane);laneParts.push([lane,i,0]);
  const edge=new THREE.Mesh(new THREE.BoxGeometry(20,.025,.045),stripe);edge.position.set(0,.025,laneZ[i]+1.375);world.add(edge);laneParts.push([edge,i,1.375]);
}
function checker(x){for(let i=0;i<5;i++)for(let j=0;j<2;j++){const box=new THREE.Mesh(new THREE.BoxGeometry(.33,.018,1.375),mat((i+j)%2?'#24575a':'#f7f4e9',.5));box.position.set(x+(j-.5)*.33,.033,laneZ[i]+(j-.5)*1.375);world.add(box);laneParts.push([box,i,(j-.5)*1.375])}}
checker(-8.4);checker(8.4);
function tree(x,z,s=1){const g=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.1,.16,.58,7),trunk);t.position.y=.25;g.add(t);for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry((.86-k*.15)*s,1.35*s,8),k%2?pine2:pine);c.position.y=.95*s+k*.55*s;c.castShadow=true;g.add(c);const cap=new THREE.Mesh(new THREE.ConeGeometry((.52-k*.09)*s,.25*s,8),snow);cap.position.y=1.52*s+k*.55*s;g.add(cap)}g.position.set(x,0,z);world.add(g)}
for(const [x,z,s] of [[-10,-11,1.1],[-7,-11.5,.8],[-3,-11.7,1.2],[2,-11.6,.9],[6,-11.4,1.15],[10,-11,.9],[-11,10.5,1],[11,10.5,1.25]])tree(x,z,s);
for(let i=0;i<5;i++){const slab=new THREE.Mesh(new THREE.BoxGeometry(.7,.13,.5),mat('#fff4db'));slab.position.set(-9,.05,laneZ[i]);world.add(slab);laneParts.push([slab,i,0])}
const shadowMat=new THREE.MeshBasicMaterial({color:'#183b45',transparent:true,opacity:.27,depthWrite:false});
const dogs=[['Фрэнк','frank'],['Зефир','zephyr'],['Рокки','rocky'],['Бульдог №4','dog4'],['Пупс','pups']];
const alphaBounds=[[95,38,271,203],[55,34,293,209],[82,6,283,204],[113,22,254,200],[45,18,299,199]];
const racers=[];
for(let i=0;i<5;i++){
  const dog=dogs[i],canvas=document.createElement('canvas');canvas.width=384;canvas.height=216;
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
  const h=1.8*216/(alphaBounds[i][3]-alphaBounds[i][1]);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(h*384/216,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,alphaTest:.018,side:THREE.DoubleSide,depthWrite:false}));
  // The source canvas includes transparent padding. The bottom of the visible paws is
  // calibrated per atlas; the graphic remains at fixed scale and world lane height.
  mesh.position.set(-7.4,h/2-(216-alphaBounds[i][3])*h/216+.04,laneZ[i]);mesh.renderOrder=10-i;world.add(mesh);
  const sh=new THREE.Mesh(new THREE.CircleGeometry(.78,32),shadowMat);sh.rotation.x=-Math.PI/2;sh.scale.y=.43;sh.position.set(-7.4,.045,laneZ[i]);sh.renderOrder=1;world.add(sh);
  const img=new Image();img.src=`./assets/${dog[1]}-run-atlas.png`;
  racers.push({name:dog[0],img,canvas,tex,mesh,sh,frame:-1,
    footOffset:h/2-(216-alphaBounds[i][3])*h/216});
}
const comp=document.getElementById('composition'),angle=document.getElementById('camera');
let motion=false,elapsed=0,last=performance.now();
function cameraPosition(){const v=Number(angle.value)/100,spacing=comp.value==='A'?.87:1;
  for(const [mesh,i,offset] of laneParts)mesh.position.z=laneZ[i]*spacing+offset;
  for(let i=0;i<racers.length;i++){racers[i].mesh.position.z=laneZ[i]*spacing;racers[i].sh.position.z=laneZ[i]*spacing}
  if(comp.value==='A'){camera.position.set(0,8+v*3,25+v*2);camera.lookAt(0,.2,0);camera.zoom=1.2}else{camera.position.set(1.5,13+v*4,26+v*2);camera.lookAt(0,0,-.3);camera.zoom=1.32}camera.updateProjectionMatrix()}
cameraPosition();comp.addEventListener('change',cameraPosition);angle.addEventListener('input',cameraPosition);
document.getElementById('play').onclick=()=>{motion=!motion;document.getElementById('play').textContent=motion?'Ⅱ Пауза':'▶ Движение'};
document.getElementById('reset').onclick=()=>{elapsed=0;motion=false;document.getElementById('play').textContent='▶ Движение'};
function draw(now){let dt=Math.min((now-last)/1000,.1);last=now;if(motion)elapsed+=dt;
  for(let i=0;i<racers.length;i++){const d=racers[i],f=Math.floor(elapsed*24+i*2)%12;
    if(d.img.complete&&d.img.naturalWidth&&f!==d.frame){const ctx=d.canvas.getContext('2d');ctx.clearRect(0,0,384,216);ctx.drawImage(d.img,(f%4)*384,Math.floor(f/4)*216,384,216,0,0,384,216);d.tex.needsUpdate=true;d.frame=f}
    const start=-7.4+i*.37;
    const x=motion?start+((elapsed*(1.7+i*.14))%15.5):start;
    d.mesh.position.x=x;d.sh.position.x=x;
    // Perspective compensation keeps each approved 2D character at the same
    // projected height as it crosses the track and across all five lanes.
    const depth=Math.hypot(camera.position.x-x,camera.position.y, camera.position.z-d.mesh.position.z);
    const reference=Math.hypot(camera.position.x-x,camera.position.y,camera.position.z);
    const scale=depth/reference;
    d.mesh.scale.setScalar(scale);d.mesh.position.y=.04+d.footOffset*scale;
    d.sh.scale.set(scale,scale*.43,scale);
  }
  renderer.render(scene,camera);requestAnimationFrame(draw)}requestAnimationFrame(draw);
addEventListener('resize',()=>{camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight)});
window.winterArenaLab={ready:true,setComposition:v=>{comp.value=v;cameraPosition()},setCamera:v=>{angle.value=v;cameraPosition()},setClose:()=>{camera.position.set(-5.3,9,19);camera.lookAt(-5.3,.6,0);camera.zoom=1.2;camera.updateProjectionMatrix()},setMotion:v=>{motion=v;document.getElementById('play').textContent=motion?'Ⅱ Пауза':'▶ Движение'},seek:v=>{elapsed=v},getState:()=>({composition:comp.value,camera:camera.position.toArray(),elapsed,lanes:racers.map(r=>({name:r.name,x:r.mesh.position.x,z:r.mesh.position.z,y:r.mesh.position.y,scale:r.mesh.scale.toArray()}))})};
