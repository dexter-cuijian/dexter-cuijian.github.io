import * as T from './vendor/three.module.js';

export function mountMuseum(section, people, entryId, signal, open, fallback) {
  if (!people.length) return fallback();
  const host = section.querySelector('.museum-scene');
  const plaque = section.querySelector('.museum-plaque');
  const select = section.querySelector('select');
  const stageDate = section.querySelector('.museum-stage-date');
  const renderer = new T.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  host.append(renderer.domElement);

  const scene = new T.Scene();
  scene.background = new T.Color(0x201b18);
  scene.fog = new T.FogExp2(0x231d19,.022);
  const camera = new T.PerspectiveCamera(59,1,.06,85);
  camera.rotation.order = 'YXZ';
  const halfWidth = 5.4;
  const halfLength = Math.ceil(people.length/2)*2.5+2.5;
  const wallHeight = 4.7;
  const materials = Object.fromEntries(Object.entries({
    wall:0x4b3430, panel:0x573c35, wood:0x261d18, trim:0x946746,
    dark:0x35231a, metal:0xb58c52, ceiling:0x3e342b, lamp:0xf9c982, plaster:0xc6a584
  }).map(([name,color])=>[name,new T.MeshLambertMaterial({color, emissive: name==='lamp' ? color : 0,emissiveIntensity:.8})]));

  function box(parent,material,w,h,d,x,y,z) {
    const mesh = new T.Mesh(new T.BoxGeometry(w,h,d),material);
    mesh.position.set(x,y,z);
    parent.add(mesh);
    return mesh;
  }
  function texture(w,h,draw) {
    const surface = document.createElement('canvas');
    surface.width=w;
    surface.height=h;
    draw(surface.getContext('2d'),w,h);
    const map = new T.CanvasTexture(surface);
    map.colorSpace = T.SRGBColorSpace;
    return map;
  }

  const floorMap = texture(256,256,(ctx,w,h)=>{
    ctx.fillStyle='#776253';
    ctx.fillRect(0,0,w,h);
    for(let k=0;k<1700;k++){
      const x=(k*937)%w, y=(k*613+Math.floor(k/7)*11)%h;
      ctx.fillStyle=k%2 ? '#d2bda01b' : '#21181025';
      ctx.fillRect(x,y,2+(k%11),1+(k%3));
    }
    ctx.strokeStyle='#322820';
    ctx.lineWidth=3;
    ctx.strokeRect(0,0,w,h);
    ctx.strokeStyle='#ad9271';
    ctx.lineWidth=1;
    ctx.strokeRect(4,4,w-8,h-8);
  });
  floorMap.wrapS=floorMap.wrapT=T.RepeatWrapping;
  floorMap.repeat.set(8,Math.round(halfLength*1.5));
  const floor = new T.Mesh(new T.PlaneGeometry(halfWidth*2,halfLength*2),new T.MeshLambertMaterial({map:floorMap}));
  floor.rotation.x=-Math.PI/2;
  scene.add(floor);
  const runner = texture(128,256,(ctx,w,h)=>{
    ctx.fillStyle='#442622';
    ctx.fillRect(0,0,w,h);
    for(const x of [5,10,w-10,w-5]){
      ctx.fillStyle=x===5||x===w-5?'#98764b':'#694d39';
      ctx.fillRect(x,0,2,h);
    }
    ctx.strokeStyle='#78523a';
    for(const y of [32,96,160,224]){
      ctx.beginPath();
      ctx.moveTo(64,y-18);ctx.lineTo(85,y);ctx.lineTo(64,y+18);ctx.lineTo(43,y);ctx.closePath();ctx.stroke();
    }
  });
  runner.wrapT=T.RepeatWrapping;
  runner.repeat.y=10;
  const rug = new T.Mesh(new T.PlaneGeometry(3.15,halfLength*2-5),new T.MeshLambertMaterial({map:runner}));
  rug.rotation.x=-Math.PI/2;
  rug.position.y=.012;
  scene.add(rug);

  const length=halfLength*2;
  for(const side of [-1,1]){
    box(scene,materials.wall,.22,wallHeight,length,side*halfWidth,wallHeight/2,0);
    box(scene,materials.wood,.29,.82,length,side*(halfWidth-.09),.43,0);
    box(scene,materials.trim,.32,.07,length,side*(halfWidth-.1),.86,0);
    box(scene,materials.trim,.35,.10,length,side*(halfWidth-.12),4.5,0);
    box(scene,materials.dark,.48,.16,length,side*(halfWidth-.21),4.58,0);
  }
  for(const z of [-halfLength,halfLength]){
    box(scene,materials.wall,halfWidth*2,wallHeight,.25,0,wallHeight/2,z);
    box(scene,materials.dark,5.6,4,.28,0,2,z*.994);
    box(scene,materials.wood,4.7,3.8,.32,0,1.9,z*.991);
  }
  box(scene,materials.ceiling,halfWidth*2,.2,length,0,wallHeight,0);
  const rows = Math.ceil(people.length/2);
  for(let row=0;row<=rows;row++){
    const z=halfLength-2.4-row*5;
    box(scene,materials.dark,halfWidth*2,.18,.22,0,4.51,z);
    for(const side of [-1,1]){
      box(scene,materials.dark,.33,wallHeight,.19,side*(halfWidth-.18),wallHeight/2,z);
      box(scene,materials.trim,.38,.13,.31,side*(halfWidth-.2),4.32,z);
    }
  }
  scene.add(new T.HemisphereLight(0xffe9c9,0x6b5545,2.05));
  const key=new T.DirectionalLight(0xffdab0,1.2);
  key.position.set(-2,6,6);
  scene.add(key);

  const spread = texture(128,128,(ctx,w,h)=>{
    const gradient=ctx.createRadialGradient(w/2,h/2,2,w/2,h/2,w/2);
    gradient.addColorStop(0,'#ffc69073');
    gradient.addColorStop(.4,'#ffc69029');
    gradient.addColorStop(1,'#ffc69000');
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,w,h);
  });

  const loader=new T.TextureLoader();
  const picks=[];
  let frame=0;
  let lastTime=0;
  let target;
  let ready=false;
  let disposed=false;
  const clockKeys=new Set();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const on=(node,name,fn,options={})=>node.addEventListener(name,fn,{...options,signal});
  const wake=()=>{if(!frame&&!signal.aborted&&!disposed) frame=requestAnimationFrame(tick);};
  const exhibits=people.map((person,index)=>{
    const side=index%2 ? 1 : -1;
    const position=new T.Vector3(side*(halfWidth-.27),2.45,halfLength-4.9-Math.floor(index/2)*5);
    const group=new T.Group();
    group.position.copy(position);
    group.rotation.y=-side*Math.PI/2;
    scene.add(group);

    box(group,materials.panel,4,3.27,.05,0,.07,-.12);
    const glow=new T.Mesh(new T.PlaneGeometry(4.8,4.15),new T.MeshBasicMaterial({map:spread,transparent:true,depthWrite:false}));
    glow.position.set(0,.38,-.057);
    group.add(glow);
    box(group,materials.dark,1.02,.16,.30,0,1.19,.17);
    box(group,materials.lamp,.9,.04,.17,0,1.11,.22);

    const artFrame = new T.Group();
    group.add(artFrame);
    box(artFrame,materials.dark,1,1,.17,0,0,.045);
    box(artFrame,materials.metal,.96,.96,.19,0,0,.058);
    box(artFrame,materials.wood,.905,.905,.20,0,0,.061);
    const artMaterial=new T.MeshBasicMaterial({color:0xa38b6c});
    const art=new T.Mesh(new T.PlaneGeometry(.87,.87),artMaterial);
    art.position.z=.17;
    artFrame.add(art);
    artFrame.scale.set(1.68,2.2,1);

    const map=loader.load('assets/'+person.id+'.webp',image=>{
      if(signal.aborted)return;
      const ratio=image.image.width/image.image.height;
      artFrame.scale.set(Math.min(2.92,2.16*ratio)+.18,Math.min(2.16,2.92/ratio)+.18,1);
      artMaterial.color.set(0xffffff);
      artMaterial.map=image;
      artMaterial.needsUpdate=true;
      wake();
    });
    map.colorSpace=T.SRGBColorSpace;

    const labelMap=texture(384,100,(ctx,w,h)=>{
      ctx.fillStyle='#302219';
      ctx.fillRect(0,0,w,h);
      ctx.strokeStyle='#b88b51';
      ctx.lineWidth=3;
      ctx.strokeRect(4,4,w-8,h-8);
      ctx.textAlign='center';
      ctx.fillStyle='#ead8b4';
      ctx.font='29px sans-serif';
      ctx.fillText(siteText(person.cn),w/2,45,w-16);
      ctx.font='21px Georgia';
      ctx.fillText(siteText(person.reign),w/2,77,w-16);
    });
    const nameplate=new T.Mesh(new T.PlaneGeometry(1.17,.31),new T.MeshBasicMaterial({map:labelMap}));
    nameplate.position.set(0,-1.31,.04);
    group.add(nameplate);
    const pick=new T.Mesh(new T.PlaneGeometry(3.15,2.62),new T.MeshBasicMaterial({visible:false}));
    pick.position.z=.23;
    group.add(pick);
    const exhibit={person,position,side,map};
    pick.userData.exhibit=exhibit;
    picks.push(pick);
    return exhibit;
  });

  const entrance=new T.Vector3(0,1.67,halfLength-1.7);
  const forward=new T.Vector3();
  const difference=new T.Vector3();
  const movement=new T.Vector3();
  const aim=new T.Vector3();
  const floorPlane=new T.Plane(new T.Vector3(0,1,0),0);
  const ray=new T.Raycaster();
  const ndc=new T.Vector2();
  const selected=exhibits.find(item=>item.person.id===entryId);
  let shown;
  let pointer;
  function identify(exhibit) {
    stageDate.textContent=exhibit ? exhibit.person.cn+' · '+exhibit.person.reign : '展厅入口';
  }
  function lookAt(position) {
    aim.subVectors(position,camera.position);
    return Math.atan2(-aim.x,-aim.z);
  }
  function liftTo(position) {
    aim.subVectors(position,camera.position);
    return Math.atan2(aim.y,Math.hypot(aim.x,aim.z));
  }
  function start(exhibit) {
    clockKeys.clear();
    target=undefined;
    camera.position.copy(entrance);
    camera.rotation.set(-.03,0,0,'YXZ');
    if(exhibit){
      camera.position.z=Math.min(entrance.z,exhibit.position.z+2.65);
      camera.rotation.y=lookAt(exhibit.position);
    }
    identify(exhibit);
    wake();
  }
  function clampPosition(vector) {
    vector.x=T.MathUtils.clamp(vector.x,-halfWidth+.6,halfWidth-.6);
    vector.z=T.MathUtils.clamp(vector.z,-halfLength+.65,halfLength-.65);
    return vector;
  }
  function approach(exhibit) {
    const position=new T.Vector3(exhibit.side*(halfWidth-2.4),1.67,exhibit.position.z);
    target={position,exhibit};
    if(reduced) {
      camera.position.copy(position);
      camera.rotation.set(liftTo(exhibit.position),lookAt(exhibit.position),0,'YXZ');
      target=undefined;
    }
    wake();
  }
  function near() {
    forward.set(0,0,-1).applyQuaternion(camera.quaternion);
    let nearest;
    let distance=3.65;
    for(const exhibit of exhibits) {
      difference.subVectors(exhibit.position,camera.position);
      const length=difference.length();
      if(length<distance && difference.multiplyScalar(1/length).dot(forward)>.42){
        nearest=exhibit;
        distance=length;
      }
    }
    return nearest;
  }
  function showPlaque(exhibit) {
    if(shown===exhibit)return;
    shown=exhibit;
    plaque.replaceChildren();
    plaque.hidden=!exhibit;
    if(!exhibit)return;
    identify(exhibit);
    const title=document.createElement('strong');
    title.textContent=exhibit.person.cn;
    const link=document.createElement('a');
    link.href='#/monarch/'+exhibit.person.id;
    link.textContent='打开'+exhibit.person.cn+'详情';
    on(link,'click',event=>{event.preventDefault();open(exhibit.person);});
    plaque.append(title,link);
  }
  function resize() {
    if(!host.clientWidth||!host.clientHeight)return;
    camera.aspect=host.clientWidth/host.clientHeight;
    camera.fov=camera.aspect<.85?69:59;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth,host.clientHeight,false);
    wake();
  }
  function tick(time) {
    frame=0;
    const elapsed=lastTime?Math.min(.05,(time-lastTime)/1000):.016;
    lastTime=time;
    if(clockKeys.size) {
      target=undefined;
      movement.set(Number(clockKeys.has('d'))-Number(clockKeys.has('a')),0,
        Number(clockKeys.has('s')||clockKeys.has('arrowdown'))-Number(clockKeys.has('w')||clockKeys.has('arrowup')));
      if(movement.lengthSq()) camera.position.add(movement.normalize().applyAxisAngle(T.Object3D.DEFAULT_UP,camera.rotation.y).multiplyScalar(3.9*elapsed));
      camera.rotation.y+= (Number(clockKeys.has('arrowleft'))-Number(clockKeys.has('arrowright')))*1.6*elapsed;
    }
    if(target) {
      difference.subVectors(target.position,camera.position);
      const length=difference.length();
      if(length<=.09){
        camera.position.copy(target.position);
        if(target.exhibit)camera.rotation.set(liftTo(target.exhibit.position),lookAt(target.exhibit.position),0,'YXZ');
        target=undefined;
      } else {
        camera.position.add(difference.multiplyScalar(Math.min(1,8.5*elapsed/length)));
        if(target.exhibit){
          const delta=lookAt(target.exhibit.position)-camera.rotation.y;
          camera.rotation.y+=Math.atan2(Math.sin(delta),Math.cos(delta))*Math.min(1,elapsed*8);
          camera.rotation.x+=(liftTo(target.exhibit.position)-camera.rotation.x)*Math.min(1,elapsed*7);
        }
      }
    }
    clampPosition(camera.position);
    showPlaque(near());
    renderer.render(scene,camera);
    if(!ready){
      ready=true;
      section.dataset.ready='true';
      section.querySelector('.museum-loading').hidden=true;
      section.querySelectorAll('.museum-guide,.museum-controls,.museum-reset').forEach(item=>item.hidden=false);
    }
    if(clockKeys.size||target)wake();
    else lastTime=0;
  }

  const keys=new Set(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright']);
  on(window,'keydown',event=>{
    const key=event.key.toLowerCase();
    if(!ready||!keys.has(key)||event.altKey||event.ctrlKey||event.metaKey||event.target.closest?.('input,select,textarea,[contenteditable]'))return;
    event.preventDefault();
    clockKeys.add(key);
    wake();
  });
  on(window,'keyup',event=>clockKeys.delete(event.key.toLowerCase()));
  on(window,'blur',()=>clockKeys.clear());

  on(host,'pointerdown',event=>{
    if(disposed||!event.isPrimary||event.button!==0)return;
    host.focus({preventScroll:true});
    host.setPointerCapture(event.pointerId);
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false};
  });
  on(host,'pointermove',event=>{
    if(pointer?.id!==event.pointerId)return;
    const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
    if(!pointer.moved&&Math.hypot(dx,dy)<5)return;
    pointer.moved=true;
    target=undefined;
    camera.rotation.y+=dx*.005;
    camera.rotation.x=T.MathUtils.clamp(camera.rotation.x+dy*.004,-.56,.45);
    pointer.x=event.clientX;
    pointer.y=event.clientY;
    wake();
  });
  on(host,'pointercancel',()=>{pointer=undefined;});
  on(host,'pointerup',event=>{
    if(pointer?.id!==event.pointerId)return;
    const moved=pointer.moved;
    pointer=undefined;
    if(moved)return;
    const rect=host.getBoundingClientRect();
    ndc.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    ray.setFromCamera(ndc,camera);
    const hit=ray.intersectObjects(picks,false)[0];
    if(hit){
      const exhibit=hit.object.userData.exhibit;
      if(exhibit===near())open(exhibit.person);
      else approach(exhibit);
      return;
    }
    const point=ray.ray.intersectPlane(floorPlane,new T.Vector3());
    if(point){
      point.y=1.67;
      target={position:clampPosition(point)};
      if(reduced){camera.position.copy(target.position);target=undefined;}
      wake();
    }
  });
  on(section.querySelector('.museum-controls'),'click',event=>{
    const direction=event.target.closest('button')?.dataset.move;
    if(!direction)return;
    target=undefined;
    if(direction==='left'||direction==='right')camera.rotation.y+=direction==='left'?.28:-.28;
    else camera.position.add(movement.set(0,0,direction==='forward'?-1.15:1.15).applyAxisAngle(T.Object3D.DEFAULT_UP,camera.rotation.y));
    wake();
  });
  on(select,'change',()=>{
    const exhibit=exhibits.find(item=>item.person.id===select.value);
    if(exhibit)approach(exhibit);
    select.value='';
    host.focus({preventScroll:true});
  });
  on(section.querySelector('.museum-reset'),'click',()=>start());
  const observer=new ResizeObserver(resize);
  observer.observe(host);
  const dispose = ()=>{
    if(disposed)return;
    disposed=true;
    ready=false;
    observer.disconnect();
    cancelAnimationFrame(frame);
    scene.traverse(object=>{
      object.geometry?.dispose();
      object.material?.map?.dispose();
      object.material?.dispose();
    });
    exhibits.forEach(item=>item.map.dispose());
    renderer.dispose();
  };
  signal.addEventListener('abort',dispose,{once:true});
  on(renderer.domElement,'webglcontextlost',event=>{
    event.preventDefault();
    delete section.dataset.ready;
    dispose();
    fallback();
  },{once:true});
  resize();
  start(selected);
}
