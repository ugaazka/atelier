import {THREE,createGarment,studio} from './garment-3d.js';
const $=s=>document.querySelector(s);
const models=new Map();
let renderer,scene,camera,model,activeId=-1,detail=false,frame=0,auto=false,last=0;
const state={yaw:.18,pitch:0,zoom:1},pointers=new Map();let dragged=false,pinch=0;
const canvas=document.createElement('canvas');canvas.className='garment-canvas';canvas.tabIndex=0;canvas.setAttribute('role','img');
function getModel(id){if(!models.has(id))models.set(id,createGarment(PRODUCTS[id]));return models.get(id)}
function invalidate(){if(!frame)frame=requestAnimationFrame(draw)}
function draw(time){frame=0;if(!model)return;
  if(auto&&!document.hidden){state.yaw+=Math.min((time-last)||16,50)*.00035}last=time;
  model.rotation.set(state.pitch,state.yaw,0);camera.position.z=5.4/state.zoom;renderer.render(scene,camera);
  const degrees=((Math.round(state.yaw*180/Math.PI)%360)+360)%360;$('#rotationValue').textContent=degrees+'°';
  if(auto&&!document.hidden)invalidate();
}
function size(){const host=canvas.parentElement;if(!host||!renderer)return;const r=host.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();invalidate()}
function mount(){
  if(!renderer)return;
  const dialog=$('#productDialog');detail=dialog.open;
  const id=detail?Number(dialog.dataset.productId):Number(document.querySelector('.garment.selected')?.dataset.productId);
  if(!Number.isInteger(id)||!PRODUCTS[id])return;
  const host=detail?$('#detail3D'):document.querySelector('.garment.selected');if(!host)return;
  if(activeId!==id){if(model)scene.remove(model);model=getModel(id);scene.add(model);activeId=id;reset()}
  if(canvas.parentElement!==host){canvas.parentElement?.classList.remove('has-3d');host.append(canvas);host.classList.add('has-3d');size()}
  canvas.setAttribute('aria-label',PRODUCTS[id].name+'. Jiid si aad u rogrogo, fallaaraha keyboard-ka ama + iyo - si aad u dhoweyso.');
  $('#studioControls').classList.toggle('hidden',detail||$('#showroom').classList.contains('hidden'));
  size();invalidate();
}
function reset(){state.yaw=.18;state.pitch=0;state.zoom=1;auto=false;syncAuto();invalidate()}
function syncAuto(){document.querySelectorAll('[data-3d="auto"]').forEach(b=>{b.setAttribute('aria-pressed',String(auto));b.textContent=auto?'Jooji wareegga':'Is-wareeji'})}
function action(a){if(a==='front'){state.yaw=0;state.pitch=0}else if(a==='back'){state.yaw=Math.PI;state.pitch=0}else if(a==='in')state.zoom=Math.min(1.65,state.zoom+.15);else if(a==='out')state.zoom=Math.max(.7,state.zoom-.15);else if(a==='reset')reset();else if(a==='auto'){auto=!auto;syncAuto()}invalidate()}
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.stopPropagation();canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});dragged=false;auto=false;syncAuto();if(pointers.size===2){const [a,b]=[...pointers.values()];pinch=Math.hypot(a.x-b.x,a.y-b.y)}});
canvas.addEventListener('pointermove',e=>{const old=pointers.get(e.pointerId);if(!old)return;const dx=e.clientX-old.x,dy=e.clientY-old.y;if(Math.abs(dx)+Math.abs(dy)>2)dragged=true;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(pinch)state.zoom=THREE.MathUtils.clamp(state.zoom*d/pinch,.7,1.65);pinch=d}else{state.yaw+=dx*.012;state.pitch=THREE.MathUtils.clamp(state.pitch+dy*.007,-.65,.65)}invalidate()});
function release(e){pointers.delete(e.pointerId);pinch=0}
canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
canvas.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false}});
canvas.addEventListener('keydown',e=>{const k=e.key;if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','0'].includes(k))return;e.preventDefault();e.stopPropagation();if(k==='ArrowLeft')state.yaw-=.18;if(k==='ArrowRight')state.yaw+=.18;if(k==='ArrowUp')state.pitch=Math.max(-.65,state.pitch-.1);if(k==='ArrowDown')state.pitch=Math.min(.65,state.pitch+.1);if(k==='+')action('in');if(k==='-')action('out');if(k==='0')reset();invalidate()});
canvas.addEventListener('wheel',e=>{e.preventDefault();e.stopPropagation();state.zoom=THREE.MathUtils.clamp(state.zoom-e.deltaY*.001,.7,1.65);invalidate()},{passive:false});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();auto=false;cancelAnimationFrame(frame);frame=0;canvas.style.visibility='hidden';$('#modelStatus').textContent='3D-ga waa hakaday. Cusboonaysii bogga si aad dib ugu furto.'});
canvas.addEventListener('webglcontextrestored',()=>{canvas.style.visibility='';$('#modelStatus').textContent='Jiid dharka si aad u rogrogo · Laba farood ku dhowee';size()});
document.querySelectorAll('[data-3d]').forEach(b=>b.addEventListener('click',()=>action(b.dataset['3d'])));
$('#productDialog').addEventListener('close',()=>{pointers.clear();requestAnimationFrame(mount)});
document.addEventListener('atelier:change',()=>requestAnimationFrame(mount));
window.addEventListener('resize',size);new ResizeObserver(size).observe($('#detail3D'));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)invalidate()});
async function init(){
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));({scene,camera}=studio(renderer));
    // One temporary context produces all catalog views, then is explicitly released.
    const preview=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});preview.setSize(420,550);const shot=studio(preview);shot.camera.aspect=420/550;shot.camera.updateProjectionMatrix();
    for(const p of PRODUCTS){const m=getModel(p.id);m.rotation.y=.18;shot.scene.add(m);preview.render(shot.scene,shot.camera);p.image=preview.domElement.toDataURL('image/png');shot.scene.remove(m);await new Promise(resolve=>requestAnimationFrame(resolve))}
    preview.dispose();preview.forceContextLoss();render();renderBag();
    $('#modelStatus').textContent='Jiid dharka si aad u rogrogo · Laba farood ku dhowee';document.body.classList.add('models-ready');mount();
  }catch(error){console.error('3D showroom:',error);$('#modelStatus').textContent='3D ma furmin. Isticmaal browser taageera WebGL 2, kadib cusboonaysii.';$('#studioControls').classList.add('hidden');$('#detail3D').textContent='3D-ga lama furi karo browser-kan.'}
}
init();
