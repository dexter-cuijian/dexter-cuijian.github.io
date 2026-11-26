import * as T from './vendor/three.module.js';

function sculptRichard() {
  const figure = new T.Group();
  const stone = new T.MeshStandardMaterial({color:0xcab08b,roughness:.73});
  const shaded = new T.MeshStandardMaterial({color:0x8c7559,roughness:.87});
  const hair = new T.MeshStandardMaterial({color:0x796046,roughness:.82});
  const cloth = new T.MeshStandardMaterial({color:0x523633,roughness:.9});
  const cap = new T.MeshStandardMaterial({color:0x342b27,roughness:.82});
  const gold = new T.MeshStandardMaterial({color:0xb78d54,metalness:.53,roughness:.48});
  const marble = new T.MeshStandardMaterial({color:0x393631,roughness:.75});

  function add(geometry,material,x=0,y=0,z=0) {
    const mesh = new T.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    figure.add(mesh);
    return mesh;
  }
  function oval(material,x,y,z,sx,sy,sz) {
    const mesh = add(new T.SphereGeometry(1,40,24),material,x,y,z);
    mesh.scale.set(sx,sy,sz);
    return mesh;
  }
  function sweep(points, thickness, material) {
    const curve = new T.CatmullRomCurve3(points.map(point=>new T.Vector3(...point)));
    return add(new T.TubeGeometry(curve,22,thickness,6),material);
  }

  add(new T.CylinderGeometry(.98,1.02,.19,64),marble,0,.12);
  add(new T.CylinderGeometry(.98,.98,.026,64),gold,0,.2);
  add(new T.CylinderGeometry(.65,.72,.18,64),marble,0,.31);
  const torso = oval(cloth,0,.93,-.065,1.03,.59,.52);
  const positions = torso.geometry.attributes.position;
  for (let i=0;i<positions.count;i++) {
    const y=positions.getY(i);
    if(y<-.77)positions.setY(i,-.77);
  }
  positions.needsUpdate=true;
  torso.geometry.computeVertexNormals();
  oval(stone,0,1.48,-.06,.30,.44,.28);
  add(new T.CylinderGeometry(.32,.46,.26,64),cloth,0,1.37,-.03);
  sweep([[-.41,1.45,.19],[-.25,1.37,.38],[0,1.27,.44],[.25,1.37,.38],[.41,1.45,.19]],.027,gold);
  sweep([[0,1.27,.44],[.035,1.04,.463],[.01,.82,.44],[.02,.53,.31]],.012,gold);
  for (let i=0;i<5;i++) oval(gold,.025,1.22-i*.14,.455-Math.max(0,i-2)*.025,.033,.033,.015);
  for (const sign of [-1,1]){
    for (let i=0;i<5;i++) sweep([[sign*(.44+i*.075),1.36-i*.027,.24],[sign*(.44+i*.09),1.15,.34],[sign*(.40+i*.105),.93,.35],[sign*(.34+i*.11),.63,.32]],.011,shaded);
  }

  const profile = new T.CatmullRomCurve3([
    [0.001,1.59,.015],[.265,1.66,.275],[.39,1.81,.375],[.43,2.025,.42],
    [.465,2.24,.421],[.465,2.48,.43],[.405,2.68,.395],[.27,2.78,.27],[.001,2.82,.001]
  ].map(row=>new T.Vector3(...row)));
  const head = new T.SphereGeometry(1,112,100);
  const vertices = head.attributes.position;
  const gauss = (distance,scale) => Math.exp(-Math.pow(distance/scale,2));
  function depth(x,y,z) {
    const both = point => Math.abs(x)-point;
    const nose = .236*gauss(x,.10)*gauss(y-2.085,.103)+.105*gauss(x,.085)*gauss(y-2.255,.216);
    const lowerNose = .066*gauss(both(.092),.057)*gauss(y-2.045,.052);
    const cheeks = .064*gauss(both(.29),.115)*gauss(y-2.13,.11);
    const sockets = -.074*gauss(both(.194),.115)*gauss(y-2.28,.085);
    const brow = .056*gauss(both(.19),.14)*gauss(y-2.39,.061);
    const mouth = .055*gauss(x,.19)*gauss(y-1.925,.105) - .012*gauss(x,.13)*gauss(y-1.909,.009);
    const chin = .079*gauss(x,.17)*gauss(y-1.742,.079);
    return z+nose+lowerNose+cheeks+sockets+brow+mouth+chin;
  }
  for(let i=0;i<vertices.count;i++){
    const v=vertices.getY(i);
    const contour=profile.getPoint(1-Math.acos(T.MathUtils.clamp(v,-1,1))/Math.PI);
    const theta=Math.atan2(vertices.getX(i),vertices.getZ(i));
    const front=Math.cos(theta);
    const x=Math.sin(theta)*contour.x;
    const z=front*contour.z-.045;
    vertices.setXYZ(i,x,contour.y,front>0 ? T.MathUtils.lerp(z,depth(x,contour.y,z),Math.min(front*2,1)) : z);
  }
  head.computeVertexNormals();
  add(head,stone);

  for(const side of [-1,1]){
    oval(stone,side*.463,2.118,-.022,.074,.142,.071);
    oval(shaded,side*.501,2.127,.021,.028,.077,.025);
    oval(shaded,side*.181,2.278,.33,.095,.032,.034);
    oval(stone,side*.18,2.278,.352,.079,.025,.02);
    oval(shaded,side*.162,2.277,.37,.023,.021,.009);
    sweep([[side*.103,2.277,.37],[side*.143,2.3,.378],[side*.207,2.3,.376],[side*.255,2.276,.353]],.013,stone);
    sweep([[side*.108,2.344,.396],[side*.156,2.362,.403],[side*.209,2.37,.386],[side*.274,2.35,.362]],.018,shaded);
    oval(shaded,side*.09,2.025,.48,.029,.012,.016);
  }
  sweep([[-.158,1.903,.378],[-.079,1.909,.413],[0,1.904,.422],[.079,1.911,.414],[.15,1.906,.378]],.007,shaded);

  oval(hair,0,2.36,-.185,.495,.49,.34);
  for(const side of [-1,1]){
    oval(hair,side*.437,2.045,-.105,.14,.60,.25).rotation.z=side*.11;
    for(let i=0;i<11;i++){
      const x=.365+i*.013;
      const z=.13-i*.037;
      sweep([
        [side*(x-.02),2.62,z-.035],[side*(x+.029),2.44,z],
        [side*(x+.042),2.24,z+.037],[side*(x+.047),2.05,z+.041],
        [side*(x+.077),1.85,z+.01],[side*(x+.092),1.58+(i%4)*.028,z-.017]
      ],.034,i%3 ? hair : shaded);
    }
  }
  const crown=oval(cap,-.046,2.775,-.04,.606,.235,.54);
  crown.rotation.z=.13;
  const band=oval(cap,0,2.661,-.038,.546,.068,.471);
  band.rotation.z=.08;
  oval(gold,-.207,2.729,.427,.053,.055,.025);
  oval(shaded,-.207,2.729,.447,.026,.027,.008);
  figure.rotation.y=-.22;
  return figure;
}

export function mountBust(host,signal) {
  const stage=host.querySelector('.bust-stage');
  const fallback=host.querySelector('.bust-fallback');
  const controls=host.querySelector('.bust-controls');
  const renderer=new T.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  stage.append(renderer.domElement);
  const scene=new T.Scene();
  const camera=new T.PerspectiveCamera(35,1,.05,30);
  const figure=sculptRichard();
  scene.add(figure);
  scene.add(new T.HemisphereLight(0xe9d3bf,0x4b3731,2.4));
  const key=new T.DirectionalLight(0xffe2b5,2.1);
  const fill=new T.DirectionalLight(0xf5c48c,1.8);
  key.position.set(-3,5,4);
  fill.position.set(3,4,-3);
  scene.add(key,fill);

  function draw(){
    const {clientWidth:w,clientHeight:h}=stage;
    if(!w||!h||signal.aborted)return;
    camera.aspect=w/h;
    camera.position.set(0,1.76,camera.aspect<.75?5.92:5.62);
    camera.lookAt(0,1.52,0);
    camera.updateProjectionMatrix();
    renderer.setSize(w,h,false);
    renderer.render(scene,camera);
  }
  function change(value){
    figure.rotation.y+=value;
    draw();
  }
  const observer=new ResizeObserver(draw);
  observer.observe(stage);
  let drag;
  stage.addEventListener('pointerdown',event=>{
    if(!event.isPrimary||event.button!==0)return;
    stage.setPointerCapture(event.pointerId);
    drag=event.clientX;
  },{signal});
  stage.addEventListener('pointermove',event=>{
    if(drag===undefined||!event.isPrimary)return;
    change((event.clientX-drag)*.014);
    drag=event.clientX;
  },{signal});
  stage.addEventListener('lostpointercapture',()=>drag=undefined,{signal});
  controls.addEventListener('click',event=>{
    const turn=event.target.closest('button')?.dataset.turn;
    if(turn)change(Number(turn)*Math.PI/6);
  },{signal});
  function dispose(){
    observer.disconnect();
    scene.traverse(mesh=>{
      mesh.geometry?.dispose();
      mesh.material?.dispose();
    });
    renderer.dispose();
  }
  signal.addEventListener('abort',dispose,{once:true});
  renderer.domElement.addEventListener('webglcontextlost',event=>{
    event.preventDefault();
    renderer.domElement.hidden=true;
    controls.hidden=true;
    fallback.hidden=false;
    dispose();
  },{signal,once:true});
  draw();
  fallback.hidden=true;
  controls.hidden=false;
  host.dataset.ready='true';
}
