const treeNodeWidth = 147;
const treeNodeHeight = 60;
const treeColumnGap = 206;
const treeRowGap = 174;
const treeMinScale = .55;
const treeMaxScale = 2.2;

const royalFamilies = [
  [['henry-ii','eleanor-aquitaine'],{'richard-i':'儿子','john':'幼子'},'父母'],
  [['henry-v','catherine-valois'],{'henry-vi':'独子'},'父母'],
  [['henry-vii','elizabeth-york'],{'henry-viii':'次子'},'父母'],
  [['henry-viii','jane-seymour'],{'edward-vi':'独子'},'父母'],
  [['henry-viii','catherine-aragon'],{'mary-i':'女儿'},'父母'],
  [['henry-viii','anne-boleyn'],{'elizabeth-i':'女儿'},'父母',18],
  [['victoria','prince-albert'],{'edward-vii':'长子'},'父母'],
  [['elizabeth-ii','prince-philip'],{'charles-iii':'长子'},'父母']
].map(([parents,childRoles,label,lane]) => ({parents,children:Object.keys(childRoles),childRoles,label,lane}));

function familyTreeData() {
  const rowStarts = new Set(['edgar','william-i','richard-i','richard-ii','henry-vi','henry-vii','henry-viii',
    'edward-vi','charles-ii','george-i','victoria','edward-vii','george-vi','charles-iii']);
  const context = new Set(royalFamilies.flatMap(family => family.parents).filter(id => !people.has(id)));
  const before = {'henry-viii':['jane-seymour']};
  const after = {'henry-ii':['eleanor-aquitaine'],'henry-v':['catherine-valois'],'henry-vii':['elizabeth-york'],
    'henry-viii':['catherine-aragon','anne-boleyn'],'victoria':['prince-albert'],'elizabeth-ii':['prince-philip']};
  const rows = [[]];
  for (const person of monarchs) {
    if (rowStarts.has(person.id)) rows.push([]);
    rows.at(-1).push(...(before[person.id] || []),person.id,...(after[person.id] || []));
  }
  const width = Math.max(...rows.map(row => row.length)) * treeColumnGap + 120;
  const height = rows.length * treeRowGap + 140;
  const positions = new Map(rows.flatMap((row,y) => row.map((id,x) =>
    [id,{x:width/2+(x-(row.length-1)/2)*treeColumnGap,y:112+y*treeRowGap}])));
  const relationshipLabels = {
    儿子:'父子', 女儿:'父女', 母亲:'母子', 弟弟:'兄弟', 异母弟弟:'异母兄弟',
    异母妹妹:'异母姐妹', 妹妹:'姐妹', 孙子:'祖孙', 孙女:'祖孙', 外孙:'外祖孙',
    外甥:'舅甥', 叔父:'叔侄', 侄女:'伯侄', 曾外孙:'曾外祖孙', 曾外孙女:'曾外祖孙'
  };
  const edges = rulerRelationships.filter(([from,to,label]) =>
    !royalFamilies.some(({parents,children}) => parents.includes(from) && children.includes(to) &&
      ['儿子','女儿'].includes(label))).map(([from,to,relationship]) => ({
    from,to,kind:/战役对手|战争对手|分治/.test(relationship) ? 'contest' : 'kin',
    label:relationshipLabels[relationship] || relationship
  }));
  const handoffs = new Map();
  for (const entry of reignTransitions) {
    const pair = entry.slice(0,2).sort().join('/');
    if (!handoffs.has(pair)) handoffs.set(pair,[]);
    handoffs.get(pair).push(entry);
  }
  for (const entries of handoffs.values()) {
    const [from,to,year,change] = entries[0];
    edges.push({from,to,kind:'succession',directed:entries.every(entry => entry[0] === from),
      label:entries.length > 1 ? entries.map(entry => entry[2]).join(' / ') + ' · 王位交替' : `${year} · ${change}`});
  }
  return {width,height,positions,edges,families:royalFamilies,context,
    people:[...monarchs,...[...context].map(id => {
      const figure = historicalFigureById.get(id);
      return {...figure,reign:figure.role};
    })]};
}

function familyTreeEdge(edge, positions, graphPeople) {
  const {from,to,kind,label,offset = 0} = edge;
  const start = positions.get(from);
  const end = positions.get(to);
  const succession = kind === 'succession';
  const arrow = succession && edge.directed !== false;
  let path;
  let x = (start.x + end.x)/2;
  let y = (start.y + end.y)/2;
  if (start.y === end.y) {
    const rise = succession ? 45 + offset*25 : -42 - Math.min(28,Math.abs(start.x-end.x)/20);
    const side = Math.sign(rise) * treeNodeHeight / 2;
    const startX = start.x + Math.sign(end.x-start.x)*31;
    const endX = end.x - Math.sign(end.x-start.x)*31;
    const lineY = start.y + side;
    path = `M${startX} ${lineY} Q${x} ${lineY+rise*1.9} ${endX} ${lineY}`;
    y += side + rise*.95;
  } else {
    const spin = succession ? 19 + offset*16 : -19;
    const side = Math.sign(end.y-start.y) * treeNodeHeight/2;
    path = `M${start.x+spin} ${start.y+side} C${start.x+spin} ${y} ${end.x+spin} ${y} ${end.x+spin} ${end.y-side}`;
    x += spin;
    y += succession ? 12+offset*17 : -12;
  }
  return `<g class="tree-edge tree-edge-${kind}" data-edge-from="${from}" data-edge-to="${to}">
    <title>${graphPeople.get(from).cn} → ${graphPeople.get(to).cn} · ${label}</title>
    <path d="${path}"${arrow ? ' marker-end="url(#tree-arrow)"' : ''}></path>
    <text x="${x}" y="${y}">${label}</text>
  </g>`;
}

function familyTreeBranch({parents,children,childRoles,label,lane = 0}, positions, graphPeople) {
  const pair = parents.map(id => positions.get(id)).sort((a,b) => a.x-b.x);
  const [left,right] = pair;
  const childNodes = children.map(id => positions.get(id));
  const childTop = Math.min(...childNodes.map(point => point.y))-treeNodeHeight/2;
  const sideJoin = left.y !== right.y;
  const direct = !sideJoin && right.x-left.x <= 240;
  const x = sideJoin ? right.x+treeNodeWidth/2+28 : (left.x+right.x)/2;
  const y = sideJoin ? (left.y+right.y)/2 : direct ? left.y : left.y+treeNodeHeight/2+34+lane;
  const stemX = x + (sideJoin ? 19 : 0);
  const railY = sideJoin ? childTop-34 : (y+childTop)/2;
  const names = ids => ids.map(id => graphPeople.get(id).cn).join('、');
  // At adjacent partnerships a shared parent has a distinct port on each side.
  const inset = Math.min(22,(right.x-left.x)/4);
  const parentY = left.y+treeNodeHeight/2;
  const bridge = sideJoin
    ? `M${left.x+treeNodeWidth/2} ${left.y} H${x} V${right.y} H${right.x+treeNodeWidth/2}`
    : direct ? `M${left.x+treeNodeWidth/2} ${y} H${right.x-treeNodeWidth/2}`
      : `M${left.x+inset} ${parentY} V${y} H${right.x-inset} V${parentY}`;
  const minX = Math.min(stemX,...childNodes.map(point => point.x));
  const maxX = Math.max(stemX,...childNodes.map(point => point.x));
  const descendants = `M${x} ${y} H${stemX} V${railY} M${minX} ${railY} H${maxX}`;
  return `<g class="tree-edge tree-family" data-edge-members="${[...parents,...children].join(' ')}"
    data-family-parents="${parents.join(' ')}" data-family-children="${children.join(' ')}">
    <title>${names(parents)} · ${label} · 共同子女：${names(children)}</title>
    <path class="tree-family-pair" d="${bridge}"></path>
    <path class="tree-family-descendants" d="${descendants}"></path>
    <circle cx="${x}" cy="${y}" r="4"></circle>
    <text x="${x}" y="${y-8}">${label}</text>
    ${children.map(id => {
      const point = positions.get(id);
      const top = point.y-treeNodeHeight/2;
      const role = childRoles[id];
      const adopted = role === '养女' || role === '养子';
      return `<path${adopted ? ' class="tree-adopted-branch"' : ''} d="M${point.x} ${railY} V${top}"></path>
        <text class="tree-child-role${adopted ? ' tree-adopted-role' : ''}" data-child-role="${id}" x="${point.x}" y="${Math.max(railY+13,top-15)}">${role}</text>`;
    }).join('')}
  </g>`;
}

function familyTree(config) {
  const {width,height,positions,edges,people:members, families = [], context = new Set(), bands = [], legend = ['亲属','王位交接','争位与对手'],
    graphic = portrait, link = relationHref, meta = person => person.reign, title = '君主家谱画布', simpleView = false} = config;
  const graphPeople = new Map(members.map(person => [person.id,person]));
  const childRoles = new Map(families.flatMap(family => Object.entries(family.childRoles)));
  return `<section class="relation-network">
    <div class="tree-toolbar">
      <div class="tree-tools" aria-label="家谱画布控制">
        <button type="button" data-tree-action="zoom-out" aria-label="缩小家谱">−</button>
        <button type="button" data-tree-action="zoom-in" aria-label="放大家谱">＋</button>
        <button type="button" data-tree-action="center" disabled>定位所选</button>
        <button type="button" data-tree-action="fit">总览</button>
        ${simpleView ? '<button type="button" data-tree-action="simple" aria-pressed="false" title="隐藏人物名字下方的简介">简化版</button>' : ''}
        <button type="button" data-tree-action="fullscreen" aria-pressed="false">全屏</button>
        <button type="button" data-tree-action="export" aria-haspopup="dialog">导出图片</button>
      </div>
      <output class="tree-scale" aria-live="off"></output>
    </div>
    <dialog class="tree-export-dialog" aria-labelledby="tree-export-title">
      <form>
        <h2 id="tree-export-title">导出图片</h2>
        <label><input name="background" type="checkbox" checked> 保留背景</label>
        <label><input name="simple" type="checkbox"> 简化版（只显示名字）</label>
        <div class="tree-export-actions">
          <button type="button" data-export-cancel>取消</button>
          <button type="submit">下载 PNG</button>
        </div>
        <p class="tree-export-error" role="alert" hidden></p>
      </form>
    </dialog>
    <div class="tree-viewport" tabindex="0" role="region" aria-label="${title}" aria-describedby="tree-instructions">
      <div class="tree-stage" style="width:${width}px;height:${height}px">
        <svg class="tree-wires" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">
          <defs><marker id="tree-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0 0 7 3 0 6Z"></path>
          </marker></defs>
          ${edges.map(edge => familyTreeEdge(edge,positions,graphPeople)).join('')}
          ${families.map(family => familyTreeBranch(family,positions,graphPeople)).join('')}
        </svg>
        ${bands.map(({title,y}) => `<span class="tree-band" style="top:${y}px">${title}</span>`).join('')}
        ${members.map(person => {
          const {x,y} = positions.get(person.id);
          const subtitle = meta(person);
          return `<a class="tree-node${context.has(person.id) ? ' tree-context' : ''}" data-tree-ruler="${person.id}" href="${link(person.id)}" draggable="false"
            style="width:${treeNodeWidth}px;height:${treeNodeHeight}px;left:${x-treeNodeWidth/2}px;top:${y-treeNodeHeight/2}px"
            aria-label="${person.cn} · ${subtitle}${childRoles.has(person.id) ? ' · ' + childRoles.get(person.id) : ''}">
            <span class="tree-node-portrait">${context.has(person.id) ? '<span class="tree-context-icon" aria-hidden="true">◇</span>' : graphic(person)}</span>
            <span class="tree-node-copy"><strong>${person.cn}</strong><small>${subtitle}</small></span>
          </a>`;
        }).join('')}
      </div>
    </div>
    <div class="tree-guide">
      <p id="tree-instructions">拖动画布 · 滚轮或双指缩放</p>
      <ul aria-label="关系线图例">${legend.map(label => `<li>${label}</li>`).join('')}</ul>
    </div>
  </section>`;
}

function familyInspector() {
  return '<div class="tree-inspector" aria-hidden="true" inert><div class="tree-inspector-clip"><div class="relation-inspector"></div></div></div>';
}

function mountFamilyInspector(panel, focusFallback, signal) {
  const drawer = panel.querySelector('.tree-inspector');
  const workspace = drawer.closest('.relation-workspace');
  const content = drawer.querySelector('.relation-inspector');
  drawer.addEventListener('transitionend',event => {
    if (event.target === drawer && event.propertyName === 'visibility' && drawer.inert) content.replaceChildren();
  },{signal});
  return {
    content,
    setOpen(open) {
      if (!open && drawer.contains(document.activeElement)) focusFallback.focus({preventScroll:true});
      drawer.inert = !open;
      drawer.setAttribute('aria-hidden',String(!open));
      workspace.classList.toggle('has-selection',open);
      if (!open && getComputedStyle(drawer).visibility === 'hidden') content.replaceChildren();
    },
    reveal() {
      drawer.scrollIntoView({block:'start',
        behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  };
}

function mountFamilyTree(panel, signal, choose, {width,height,positions,focusGroup = []}) {
  const viewport = panel.querySelector('.tree-viewport');
  const workspace = viewport.closest('.relation-workspace');
  const stage = panel.querySelector('.tree-stage');
  const scaleOutput = panel.querySelector('.tree-scale');
  const controls = panel.querySelector('.tree-tools');
  const zoomOut = controls.querySelector('[data-tree-action="zoom-out"]');
  const zoomIn = controls.querySelector('[data-tree-action="zoom-in"]');
  const locate = controls.querySelector('[data-tree-action="center"]');
  const fullscreen = controls.querySelector('[data-tree-action="fullscreen"]');
  const exportDialog = panel.querySelector('.tree-export-dialog');
  const exportForm = exportDialog.querySelector('form');
  const exportError = exportForm.querySelector('.tree-export-error');
  const exportButton = exportForm.querySelector('[type="submit"]');
  const exportCancel = exportForm.querySelector('[data-export-cancel]');
  const nodes = [...stage.querySelectorAll('[data-tree-ruler]')];
  const edges = [...stage.querySelectorAll('[data-edge-from],[data-edge-members]')];
  const pointers = new Map();
  let camera = {x:0,y:0,scale:1};
  let activeId;
  let frameSize = {width:viewport.clientWidth,height:viewport.clientHeight};
  let dragged = false;
  let motion = 0;
  let hasOpenedExport = false;

  function draw() {
    stage.style.transform = `translate(${camera.x}px,${camera.y}px) scale(${camera.scale})`;
    scaleOutput.value = Math.round(camera.scale*100) + '%';
    zoomOut.setAttribute('aria-disabled',String(camera.scale <= treeMinScale));
    zoomIn.setAttribute('aria-disabled',String(camera.scale >= treeMaxScale));
  }

  function settle() {
    const pad = 96;
    camera.x = Math.min(viewport.clientWidth-pad, Math.max(pad-width*camera.scale,camera.x));
    camera.y = Math.min(viewport.clientHeight-pad, Math.max(pad-height*camera.scale,camera.y));
    draw();
  }

  function move(dx,dy) {
    camera.x += dx;
    camera.y += dy;
    settle();
  }

  function zoom(scale,x = viewport.clientWidth/2,y = viewport.clientHeight/2) {
    const next = Math.max(treeMinScale,Math.min(treeMaxScale,scale));
    if (next === camera.scale) return;
    const factor = next/camera.scale;
    camera = {x:x-(x-camera.x)*factor, y:y-(y-camera.y)*factor, scale:next};
    settle();
  }

  function showArea(left,top,areaWidth,areaHeight,limit) {
    const scale = Math.max(treeMinScale,Math.min(limit,(viewport.clientWidth-34)/areaWidth,(viewport.clientHeight-34)/areaHeight));
    camera = {x:(viewport.clientWidth-areaWidth*scale)/2-left*scale,
      y:(viewport.clientHeight-areaHeight*scale)/2-top*scale,scale};
    draw();
  }

  function center(id) {
    const point = positions.get(id);
    if (!point) return;
    if (viewport.clientWidth >= 740 && focusGroup.includes(id)) {
      const xs = focusGroup.map(member => positions.get(member).x);
      const padding = treeNodeWidth/2+16;
      const left = Math.min(...xs)-padding;
      const right = Math.max(...xs)+padding;
      showArea(left,point.y-200,right-left,400,1.07);
      return;
    }
    const areaWidth = viewport.clientWidth < 520 ? 405 : 720;
    showArea(point.x-areaWidth/2,point.y-200,areaWidth,400,1.07);
  }

  function fit() {
    showArea(0,0,width,height,1.07);
  }

  function setRuler(id, reposition) {
    activeId = id;
    locate.disabled = !id;
    const neighbours = new Set();
    edges.forEach(edge => {
      const {edgeFrom,edgeTo,edgeMembers} = edge.dataset;
      const members = edgeMembers ? edgeMembers.split(' ') : [edgeFrom,edgeTo];
      const related = members.includes(id);
      edge.classList.toggle('is-related',related);
      if (related) for (const member of members) if (member !== id) neighbours.add(member);
    });
    nodes.forEach(node => {
      const isActive = node.dataset.treeRuler === id;
      if (isActive) node.setAttribute('aria-current','true');
      else node.removeAttribute('aria-current');
      node.classList.toggle('is-near',neighbours.has(node.dataset.treeRuler));
    });
    if (reposition) center(id);
  }

  function setStoryGroup(ids, connections) {
    const group = new Set(ids);
    for (const node of nodes) node.classList.toggle('is-story',group.has(node.dataset.treeRuler));
    for (const edge of edges) {
      const {edgeFrom,edgeTo,edgeMembers} = edge.dataset;
      const members = edgeMembers ? edgeMembers.split(' ') : [edgeFrom,edgeTo];
      edge.classList.toggle('is-story',connections.some(pair => pair.every(id => members.includes(id))));
    }
    if (ids.length) {
      const points = ids.map(id => positions.get(id));
      const xs = points.map(point => point.x);
      const ys = points.map(point => point.y);
      showArea(Math.min(...xs)-90,Math.min(...ys)-72,Math.max(...xs)-Math.min(...xs)+180,
        Math.max(...ys)-Math.min(...ys)+144,1.07);
    }
  }

  function pointAt(event) {
    const bounds = viewport.getBoundingClientRect();
    return {x:event.clientX-bounds.left,y:event.clientY-bounds.top};
  }

  function toggleFullscreen() {
    const active = workspace.classList.toggle('tree-fullscreen');
    fullscreen.textContent = active ? '退出全屏' : '全屏';
    fullscreen.setAttribute('aria-pressed',String(active));
    fullscreen.focus({preventScroll:true});
  }

  exportForm.addEventListener('submit',async event => {
    event.preventDefault();
    if (exportButton.disabled) return;
    const {background,simple} = exportForm.elements;
    exportError.hidden = true;
    exportButton.disabled = true;
    exportCancel.disabled = true;
    exportButton.textContent = '正在导出…';
    try {
      const {exportFamilyTree} = await import('./tree-export.js');
      if (signal.aborted) return;
      await exportFamilyTree(viewport,stage,{width,height,signal,background:background.checked,simple:simple.checked});
      exportDialog.close();
    } catch {
      exportError.textContent = '导出失败，重试';
      exportError.hidden = false;
    } finally {
      exportButton.textContent = '下载 PNG';
      exportButton.disabled = false;
      exportCancel.disabled = false;
    }
  },{signal});
  exportCancel.addEventListener('click',() => exportDialog.close(),{signal});
  exportDialog.addEventListener('cancel',event => {
    if (exportButton.disabled) event.preventDefault();
  },{signal});

  document.addEventListener('keydown',event => {
    if (exportDialog.open || !workspace.classList.contains('tree-fullscreen')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      toggleFullscreen();
    } else if (event.key === 'Tab') {
      const stops = [...workspace.querySelectorAll('a[href],button:not(:disabled),[tabindex="0"],summary')]
        .filter(element => !element.closest('[inert]') && element.getClientRects().length);
      const from = event.shiftKey ? stops[0] : stops.at(-1);
      if (document.activeElement === from) {
        event.preventDefault();
        (event.shiftKey ? stops.at(-1) : stops[0]).focus();
      }
    }
  },{signal});

  viewport.addEventListener('wheel',event => {
    event.preventDefault();
    const {x,y} = pointAt(event);
    const delta = event.deltaY * (event.deltaMode === 1 ? 13 : event.deltaMode === 2 ? 170 : 1);
    zoom(camera.scale * Math.exp(-delta*.0018),x,y);
  }, {signal,passive:false});

  viewport.addEventListener('pointerdown',event => {
    if (event.button !== 0 || pointers.size >= 2) return;
    if (!pointers.size) {
      dragged = false;
      motion = 0;
    }
    pointers.set(event.pointerId,pointAt(event));
    if (pointers.size === 2) {
      dragged = true;
      for (const id of pointers.keys()) viewport.setPointerCapture(id);
      viewport.classList.add('is-dragging');
    }
  }, {signal});

  viewport.addEventListener('pointermove',event => {
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    const point = pointAt(event);
    pointers.set(event.pointerId,point);
    const dx = point.x-previous.x;
    const dy = point.y-previous.y;
    if (pointers.size === 2) {
      const other = [...pointers.entries()].find(([id]) => id !== event.pointerId)[1];
      const oldDistance = Math.hypot(previous.x-other.x,previous.y-other.y);
      const distance = Math.hypot(point.x-other.x,point.y-other.y);
      if (oldDistance > 0) zoom(camera.scale*distance/oldDistance,(previous.x+other.x)/2,(previous.y+other.y)/2);
      move(dx/2,dy/2);
      return;
    }
    motion += Math.hypot(dx,dy);
    if (motion < 5) return;
    if (!dragged) {
      dragged = true;
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('is-dragging');
    }
    move(dx,dy);
  }, {signal});

  function release(event) {
    pointers.delete(event.pointerId);
    if (!pointers.size) viewport.classList.remove('is-dragging');
  }
  for (const type of ['pointerup','pointercancel']) viewport.addEventListener(type,release,{signal});
  viewport.addEventListener('pointerleave',event => {
    if (event.pointerType === 'mouse' && !viewport.hasPointerCapture(event.pointerId)) release(event);
  },{signal});
  viewport.addEventListener('dragstart',event => event.preventDefault(),{signal});
  viewport.addEventListener('click',event => {
    const node = event.target.closest('[data-tree-ruler]');
    if (!node) return;
    if (dragged && event.detail) {
      event.preventDefault();
      return;
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    choose(node.dataset.treeRuler);
  },{signal});
  viewport.addEventListener('focusin',event => {
    if (event.target.matches('[data-tree-ruler]:focus-visible')) {
      const bounds = viewport.getBoundingClientRect();
      const node = event.target.getBoundingClientRect();
      if (node.left < bounds.left || node.right > bounds.right || node.top < bounds.top || node.bottom > bounds.bottom) {
        const point = positions.get(event.target.dataset.treeRuler);
        camera.x = viewport.clientWidth/2 - point.x*camera.scale;
        camera.y = viewport.clientHeight/2 - point.y*camera.scale;
        settle();
      }
    }
  },{signal});
  viewport.addEventListener('keydown',event => {
    if (event.target !== viewport) return;
    const actions = {ArrowLeft:() => move(65,0), ArrowRight:() => move(-65,0),
      ArrowUp:() => move(0,65), ArrowDown:() => move(0,-65), '+':() => zoom(camera.scale*1.2),
      '=':() => zoom(camera.scale*1.2), '-':() => zoom(camera.scale/1.2), Home:() => center(activeId)};
    if (!actions[event.key]) return;
    event.preventDefault();
    actions[event.key]();
  },{signal});
  controls.addEventListener('click',event => {
    const button = event.target.closest('button');
    const treeAction = button?.dataset.treeAction;
    if (treeAction === 'zoom-in') zoom(camera.scale*1.25);
    if (treeAction === 'zoom-out') zoom(camera.scale/1.25);
    if (treeAction === 'center') center(activeId);
    if (treeAction === 'fit') fit();
    if (treeAction === 'simple') button.setAttribute('aria-pressed',String(stage.classList.toggle('tree-simple')));
    if (treeAction === 'fullscreen') toggleFullscreen();
    if (treeAction === 'export') {
      if (!hasOpenedExport) exportForm.elements.simple.checked = stage.classList.contains('tree-simple');
      hasOpenedExport = true;
      exportError.hidden = true;
      exportDialog.showModal();
    }
  },{signal});
  const resize = new ResizeObserver(() => {
    const next = {width:viewport.clientWidth,height:viewport.clientHeight};
    if (!next.width || !next.height) return;
    move((next.width-frameSize.width)/2,(next.height-frameSize.height)/2);
    frameSize = next;
  });
  resize.observe(viewport);
  signal.addEventListener('abort',() => resize.disconnect(),{once:true});
  return {setRuler,center,setStoryGroup};
}
