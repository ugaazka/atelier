import * as THREE from './vendor/three.module.js';

// Original procedural garment studies. These are not scans of manufactured products.
const TAU=Math.PI*2, V=(x,y,z)=>new THREE.Vector3(x,y,z);
const textureCache=new Map();
function weave(kind){
  if(textureCache.has(kind))return textureCache.get(kind);
  const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d'),im=ctx.createImageData(256,256);
  for(let y=0;y<256;y++)for(let x=0;x<256;x++){
    const knit=kind==='knit';
    const grain=Math.sin(x*12.9898+y*78.233)*43758.5453%1;
    const thread=knit?Math.sin(x*.75+Math.sin(y*.32)*1.8)*25+Math.cos(y*.65)*18:Math.sin(x*Math.PI/2)*14+Math.cos(y*Math.PI/2)*14;
    const n=145+thread+grain*15, i=(y*256+x)*4;im.data.set([n,n,n,255],i);
  }
  ctx.putImageData(im,0,0);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(kind==='knit'?3:7,kind==='knit'?4:9);t.anisotropy=8;textureCache.set(kind,t);return t;
}
function fabric(color,kind='cotton') {return new THREE.MeshPhysicalMaterial({color,roughness:.88,metalness:0,bumpMap:weave(kind),bumpScale:kind==='knit'?.022:.009,sheen:.6,sheenRoughness:.85,sheenColor:new THREE.Color(color).lerp(new THREE.Color('white'),.3),side:THREE.DoubleSide});}
function mesh(group,geometry,material){const m=new THREE.Mesh(geometry,material);m.castShadow=m.receiveShadow=true;group.add(m);return m;}
function seam(group,points,material,r=.003){return mesh(group,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),Math.max(16,points.length*4),r,5,false),material);}
// Ring surfaces retain volume, open hems and cuffs, and drape in the geometry itself.
function tube(group,rows,material,seed=0){
  const positions=[],uv=[],indices=[],N=64,M=rows.length-1;
  rows.forEach((row,j)=>{for(let i=0;i<=N;i++){const a=i/N*TAU;
    const fold=(Math.sin(a*9+j*.13+seed)*.012+Math.sin(a*15-j*.19)*.005)*Math.sin(Math.PI*j/M);
    const ca=Math.cos(a),sa=Math.sin(a),r=1+fold*3;
    positions.push(row.x+ca*row.w*r,row.y+(row.tilt||0)*ca,row.z+sa*(row.d+fold));uv.push(i/N,j/M);
  }});
  for(let j=0;j<M;j++)for(let i=0;i<N;i++){const a=j*(N+1)+i,b=a+N+1;indices.push(a,b,a+1,b,b+1,a+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return mesh(group,g,material);
}
function patch(group,coords,material,depth=.008){const s=new THREE.Shape();coords.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.006,bevelThickness:.004});const m=mesh(group,g,material);m.position.z=.184;return m;}
function button(group,x,y,z,mat,r=.022){const b=mesh(group,new THREE.CylinderGeometry(r,r,.012,20),mat);b.rotation.x=Math.PI/2;b.position.set(x,y,z);for(const dx of [-.005,.005])seam(group,[V(x+dx,y-.005,z+.008),V(x+dx,y+.005,z+.009)],fabric('#b2aa97'),.0015);}
function hanger(group,pants){const wood=new THREE.MeshStandardMaterial({color:'#704c31',roughness:.48}),metal=new THREE.MeshStandardMaterial({color:'#aeb1b0',metalness:.9,roughness:.25});
  const y=pants?1.03:.92;
  seam(group,[V(-.52,y-.12,0),V(-.22,y+.04,0),V(0,y+.12,0),V(.22,y+.04,0),V(.52,y-.12,0),V(0,y-.15,0),V(-.52,y-.12,0)],wood,.026);
  seam(group,[V(0,y+.12,0),V(0,y+.27,0),V(.08,y+.32,0),V(.09,y+.42,0),V(.01,y+.46,0),V(-.065,y+.42,0)],metal,.012);
}
export function createGarment(p){
  const group=new THREE.Group(),kind=p.type==='knit'?'knit':p.id===12?'denim':'cotton';
  const cloth=fabric(p.color,kind),edge=fabric(new THREE.Color(p.color).multiplyScalar(.8)),stitch=new THREE.MeshStandardMaterial({color:new THREE.Color(p.color).lerp(new THREE.Color('#d8d1bd'),.35),roughness:1});
  const buttons=new THREE.MeshStandardMaterial({color:p.type==='coat'?'#342c26':'#c3bba8',roughness:.48,metalness:.08});
  const pants=p.type==='pants';hanger(group,pants);
  if(pants){
    const rows=[];for(let j=0;j<=14;j++){const t=j/14;rows.push({x:0,y:1-t*.6,z:0,w:.47-t*.015,d:.18+Math.sin(t*Math.PI)*.025})}tube(group,rows,cloth,p.id);
    for(const side of [-1,1]){
      const rows=[];for(let j=0;j<=38;j++){const t=j/38;rows.push({x:side*(.235+t*.025),y:.51-t*1.83,z:Math.sin(t*3)*.018,w:.24-t*(p.id===7?.005:.065),d:.18-t*.065+Math.sin(t*10)*.012})}tube(group,rows,cloth,p.id);
      seam(group,[V(side*.47,.9,.02),V(side*.46,.3,.03),V(side*.46,-.4,.02),V(side*(p.id===7?.495:.43),-1.3,0)],stitch);
      seam(group,[V(side*.24,.35,.189),V(side*.24,-.3,.17),V(side*.26,-1.3,.12)],edge,.002);
      patch(group,[[side*.08,.84],[side*.38,.84],[side*.37,.52],[side*.2,.48]],edge).position.z=-.206;
      seam(group,[V(side*.42,.83,.12),V(side*.33,.65,.18),V(side*.22,.6,.19)],stitch);
    }
    const belt=[];for(let j=0;j<=4;j++)belt.push({x:0,y:.99-j*.016,z:0,w:.476,d:.186});tube(group,belt,edge);
    for(const x of [-.35,-.16,.16,.35])patch(group,[[x-.018,1.01],[x+.018,1.01],[x+.018,.89],[x-.018,.89]],cloth);
    seam(group,[V(.02,.91,.199),V(.02,.6,.209),V(-.02,.49,.207)],stitch);button(group,0,.95,.207,buttons);
  }else{
    const coat=p.type==='coat',jacket=p.type==='jacket',short=['tee','polo'].includes(p.type)||p.id===0||p.id===3;
    const bottom=coat?-1.35:-.85,top=.76,rows=[];
    for(let j=0;j<=44;j++){const t=j/44,y=bottom+(top-bottom)*t;
      let w=.49+Math.sin(t*Math.PI)*.018+(coat?(1-t)*.09:0),d=.17+Math.sin(t*Math.PI)*.04;
      if(t>.85){const s=(t-.85)/.15;w=THREE.MathUtils.lerp(.5,.19,s);d=THREE.MathUtils.lerp(.17,.11,s)}
      rows.push({x:Math.sin(t*7+p.id)*.006,y,z:0,w,d});
    }tube(group,rows,cloth,p.id);
    for(const side of [-1,1]){
      const length=short?.55:1.36,rows=[];
      for(let j=0;j<=30;j++){const t=j/30;rows.push({x:side*(.455+t*(short?.38:.25)),y:.56-t*length,z:Math.sin(t*3)*.015,w:(short?.21:.205)-t*(short?.035:.08),d:.155-t*.045,tilt:side*(short?.1:.035)})}tube(group,rows,p.id===8?fabric('#c8bda4'):cloth,p.id+2);
      const last=rows.at(-1);tube(group,[{...last,y:last.y+.05,w:last.w+.004,d:last.d+.004},{...last,y:last.y-.01,w:last.w+.004,d:last.d+.004}],edge);
      seam(group,[V(side*.49,.4,.12),V(side*.59,-.1,.13),V(last.x,last.y,last.d)],stitch,.0025);
    }
    // Hem, back yoke and distinct construction details remain visible when turned.
    tube(group,[{...rows[0],y:bottom+.035,w:rows[0].w+.002},{...rows[0],y:bottom,w:rows[0].w+.003}],edge);
    seam(group,[V(-.43,.41,-.151),V(0,.38,-.215),V(.43,.41,-.151)],stitch);
    seam(group,[V(0,.37,-.215),V(.012,-.2,-.21),V(0,bottom+.02,-.175)],edge,.002);
    if(['tee','knit'].includes(p.type)){
      const collar=mesh(group,new THREE.TorusGeometry(.17,.024,12,64),edge);collar.rotation.x=Math.PI/2;collar.scale.y=.64;collar.position.y=.758;
    }else{
      const isCoat=coat;
      patch(group,[[-.19,.76],[-.03,.59],[-.19,isCoat?.05:.42],[-.32,isCoat?.47:.63]],cloth);
      patch(group,[[.19,.76],[.03,.59],[.19,isCoat?.05:.42],[.32,isCoat?.47:.63]],cloth);
      const placket=patch(group,[[-.025,.57],[.025,.57],[.025,bottom+.03],[-.025,bottom+.03]],edge);placket.position.z=.212;
      for(let y=.39;y>bottom+.13;y-=coat?.26:.22)button(group,coat?.11:0,y,.235,buttons,coat?.028:.018);
      if(p.type==='shirt'||jacket){for(const side of p.id===0||jacket?[-1,1]:[-1]){
        patch(group,[[side*.16,.28],[side*.39,.28],[side*.39,-.04],[side*.27,-.085],[side*.16,-.04]],cloth).position.z=.213;
        seam(group,[V(side*.16,.25,.231),V(side*.39,.25,.231)],stitch);
      }}
      if(coat||jacket)for(const side of [-1,1])seam(group,[V(side*.25,-.45,.208),V(side*.42,-.31,.168)],edge,.014);
    }
    if(p.id===4){for(const y of [.15,.07,-.01]){const stripe=fabric('#c8c4af');tube(group,[{x:0,y,z:0,w:.512,d:.218},{x:0,y:y-.035,z:0,w:.512,d:.218}],stripe)}}
    if(p.type==='knit')for(let x=-.4;x<=.4;x+=.08){const pts=[];for(let j=0;j<=40;j++){const y=bottom+.04+j*(1.35/40);pts.push(V(x+Math.sin(j*.7)*.012,y,.205+Math.sin(j*.7)*.008))}seam(group,pts,cloth,.009)}
  }
  group.userData.product=p.id;return group;
}
export function studio(renderer){
  renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(0xf6f7ff,0x676054,2));
  for(const [color,intensity,x,y,z]of [[0xfff4e6,4,-3,4,5],[0xe3eeff,2,4,2,-3],[0xffffff,1,1,0,4]]){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l)}
  const camera=new THREE.PerspectiveCamera(34,1,.1,30);camera.position.set(0,.08,5.4);camera.lookAt(0,0,0);return {scene,camera};
}
export {THREE};
