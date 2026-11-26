const pngScaleLimit = 4096;
const textStyles = ['fill','stroke','stroke-width','stroke-dasharray','stroke-linejoin','paint-order',
  'opacity','visibility','font-size','font-family','font-weight','text-anchor'];
const transparentColors = ['#356957','#855424','#994e52'];
const labelOffsets = [];
for (let y = -120; y <= 120; y += 15) {
  for (let x = -144; x <= 144; x += 12) labelOffsets.push({x,y});
}
labelOffsets.sort((a,b) => Math.hypot(a.x*1.2,a.y)-Math.hypot(b.x*1.2,b.y));

function relationshipColor(node) {
  if (node.closest('.tree-adopted-branch,.tree-edge-contest')) return transparentColors[2];
  if (node.closest('.tree-family-pair,.tree-edge-succession,#tree-arrow')) return transparentColors[1];
  return transparentColors[0];
}

function relationshipAnchor(label) {
  const group = label.parentElement;
  const child = label.hasAttribute('data-child-role');
  const path = child ? label.previousElementSibling : group.querySelector('path');
  const junction = !child && group.querySelector('circle');
  if (junction) return {path,x:junction.cx.baseVal.value,y:junction.cy.baseVal.value};
  const x = Number(label.getAttribute('x'));
  const y = Number(label.getAttribute('y'));
  const length = path.getTotalLength();
  let nearest = 0;
  let distance = Infinity;
  const search = (start,end,steps) => {
    for (let i = 0; i <= steps; i++) {
      const offset = start+(end-start)*i/steps;
      const point = path.getPointAtLength(offset);
      const delta = (point.x-x)**2+(point.y-y)**2;
      if (delta < distance) {
        nearest = offset;
        distance = delta;
      }
    }
  };
  search(0,length,32);
  search(Math.max(0,nearest-length/32),Math.min(length,nearest+length/32),12);
  const point = path.getPointAtLength(nearest);
  return {path,x:point.x,y:point.y};
}

function placeLabel(original,label,occupied,wires,width,height) {
  const box = original.getBBox();
  const anchor = relationshipAnchor(original);
  function candidate(x,y) {
    const rect = {left:box.x+x-7,right:box.x+box.width+x+7,top:box.y+y-5,bottom:box.y+box.height+y+5};
    if (rect.left < 0 || rect.right > width || rect.top < 0 || rect.bottom > height ||
      occupied.some(other => rect.left < other.right && rect.right > other.left &&
        rect.top < other.bottom && rect.bottom > other.top)) return;
    const target = {
      x:Math.max(rect.left+4,Math.min(anchor.x,rect.right-4)),
      y:Math.max(rect.top+3,Math.min(anchor.y,rect.bottom-3))
    };
    return {x,y,rect,target};
  }
  let placement;
  let bestScore = Infinity;
  for (const {x,y} of labelOffsets) {
    const displacement = Math.hypot(x*1.2,y);
    if (displacement >= bestScore) break;
    const point = candidate(x,y);
    if (!point) continue;
    const blocked = [.2,.4,.6,.8].some(t => {
      const sx = anchor.x+(point.target.x-anchor.x)*t;
      const sy = anchor.y+(point.target.y-anchor.y)*t;
      return occupied.some(rect => sx > rect.left && sx < rect.right && sy > rect.top && sy < rect.bottom);
    });
    const {left,right,top,bottom} = point.rect;
    const crossesOtherWire = wires.some(({path,points}) => path !== anchor.path &&
      points.some(({x,y}) => x > left+3 && x < right-3 && y > top+2 && y < bottom-2));
    const score = displacement+(blocked ? 48 : 0)+(crossesOtherWire ? 36 : 0);
    if (score < bestScore) {
      placement = point;
      bestScore = score;
    }
  }
  // If a dense stretch fills the immediate area, use the nearest free row.
  for (let dy = 135; !placement && dy < height; dy += 15) {
    for (let dx = 0; !placement && dx < width; dx += 12) {
      placement = candidate(dx,-dy) || candidate(-dx,-dy) || candidate(dx,dy) || candidate(-dx,dy);
    }
  }
  if (!placement) throw new Error('Unable to place a family tree relationship label.');
  const {x,y,rect,target} = placement;
  label.setAttribute('x',String(Number(label.getAttribute('x'))+x));
  label.setAttribute('y',String(Number(label.getAttribute('y'))+y));
  occupied.push(rect);
  if (Math.hypot(anchor.x-target.x,anchor.y-target.y) <= 8) return null;
  return {anchor,target};
}

function drawLeader(layer,{anchor,target},background,canvasColor) {
  const color = background ? getComputedStyle(anchor.path).stroke : relationshipColor(anchor.path);
  const namespace = layer.namespaceURI;
  const leader = document.createElementNS(namespace,'g');
  leader.setAttribute('class','tree-export-leader');
  for (const [stroke,width] of [[background ? canvasColor : '#fffaf1',3],[color,1]]) {
    const line = document.createElementNS(namespace,'line');
    for (const [name,value] of Object.entries({x1:target.x,y1:target.y,x2:anchor.x,y2:anchor.y,stroke,'stroke-width':width})) {
      line.setAttribute(name,String(value));
    }
    leader.append(line);
  }
  const marker = document.createElementNS(namespace,'circle');
  marker.setAttribute('cx',anchor.x);
  marker.setAttribute('cy',anchor.y);
  marker.setAttribute('r','1.9');
  marker.setAttribute('fill',color);
  leader.append(marker);
  layer.append(leader);
}

function wireImage(stage,cards,{width,height,background,canvasColor}) {
  const source = stage.querySelector('.tree-wires');
  const copy = source.cloneNode(true);
  copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
  const nodes = [...source.querySelectorAll('path,circle,text')];
  const labels = [];
  [...copy.querySelectorAll('path,circle,text')].forEach((element,index) => {
    const original = nodes[index];
    const style = getComputedStyle(original);
    for (const name of textStyles) element.style.setProperty(name,style.getPropertyValue(name));
    if (element.localName === 'text') {
      element.style.visibility = 'visible';
      element.style.strokeWidth = '4px';
      if (!background) {
        element.style.fill = '#212728';
        element.style.stroke = '#fffaf1';
      }
      labels.push({original,element});
    } else {
      const relation = original.closest('.tree-edge');
      if (relation) {
        element.style.opacity = '1';
        if (element.localName === 'path') element.style.strokeWidth = relation.classList.contains('tree-family') ? '1.85px' : '1.55px';
      }
      if (!background) element.style[style.stroke === 'none' ? 'fill' : 'stroke'] = relationshipColor(original);
    }
  });
  const occupied = cards.map(({x,y,width,height}) => ({left:x-4,right:x+width+4,top:y-4,bottom:y+height+4}));
  const wires = [...source.querySelectorAll('.tree-edge path')].map(path => {
    const length = path.getTotalLength();
    const steps = Math.max(1,Math.ceil(length/7));
    const points = Array.from({length:steps+1},(_,i) => path.getPointAtLength(i*length/steps));
    return {path,points};
  });
  // Keep the labels for shared parents and children nearest their original positions.
  const ordered = [
    ...labels.filter(({original}) => original.closest('.tree-family')),
    ...labels.filter(({original}) => !original.closest('.tree-family'))
  ];
  const leaderLayer = document.createElementNS(copy.namespaceURI,'g');
  copy.append(leaderLayer);
  for (const {original,element} of ordered) {
    const leader = placeLabel(original,element,occupied,wires,width,height);
    if (leader) drawLeader(leaderLayer,leader,background,canvasColor);
  }
  copy.append(...ordered.map(({element}) => element));
  return new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml;charset=utf-8'});
}

function captureCard(node,simple) {
  const style = getComputedStyle(node);
  const name = node.querySelector('strong');
  const subtitle = node.querySelector('small');
  const portrait = node.querySelector('.tree-node-portrait');
  const portraitImage = portrait.querySelector('img:not([hidden])');
  const nameStyle = getComputedStyle(name);
  const subtitleStyle = getComputedStyle(subtitle);
  const portraitStyle = getComputedStyle(portrait);
  return {
    x:node.offsetLeft, y:node.offsetTop, width:node.offsetWidth, height:node.offsetHeight,
    selected:node.hasAttribute('aria-current'), border:style.borderColor, background:style.backgroundColor,
    name:name.textContent, nameFont:fontString(nameStyle), nameSize:parseFloat(nameStyle.fontSize), nameColor:nameStyle.color,
    subtitle:simple ? '' : subtitle.textContent,
    subtitleFont:fontString(subtitleStyle), subtitleSize:parseFloat(subtitleStyle.fontSize), subtitleColor:subtitleStyle.color,
    portrait:portraitImage?.src, scene:portraitImage?.classList.contains('macondo-scene'),
    icon:portrait.querySelector('.tree-context-icon,.macondo-monogram')?.textContent || '♔',
    portraitColor:portraitStyle.backgroundColor, portraitBorder:portraitStyle.borderColor
  };
}

function fontString(style) {
  return style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
}

async function decodeImage(src) {
  const image = new Image();
  image.src = src;
  await image.decode();
  return image;
}

function wrapText(ctx,text,width,maxLines) {
  if (!text) return [];
  const lines = [];
  let line = '';
  for (const character of text) {
    if (line && ctx.measureText(line+character).width > width) {
      if (lines.length === maxLines-1) {
        while (line && ctx.measureText(line+'…').width > width) line = line.slice(0,-1);
        return [...lines,line+'…'];
      }
      lines.push(line);
      line = '';
    }
    line += character;
  }
  return [...lines,line];
}

function paintCard(ctx,card,image) {
  const {x,y,width,height} = card;
  ctx.fillStyle = card.background;
  ctx.fillRect(x,y,width,height);
  ctx.strokeStyle = card.border;
  ctx.strokeRect(x+.5,y+.5,width-1,height-1);
  if (card.selected) {
    ctx.strokeStyle = '#dfb878';
    ctx.lineWidth = 2;
    ctx.strokeRect(x-2,y-2,width+4,height+4);
    ctx.lineWidth = 1;
  }

  const photoWidth = 34;
  const photoHeight = 44;
  const photoX = x+6;
  const photoY = y+(height-photoHeight)/2;
  ctx.fillStyle = card.portraitColor;
  ctx.fillRect(photoX,photoY,photoWidth,photoHeight);
  if (image) {
    const fit = card.scene ? Math.min : Math.max;
    const ratio = fit(photoWidth/image.width,photoHeight/image.height);
    const w = image.width*ratio;
    const h = image.height*ratio;
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX,photoY,photoWidth,photoHeight);
    ctx.clip();
    ctx.drawImage(image,photoX+(photoWidth-w)/2,photoY+(photoHeight-h)/2,w,h);
    ctx.restore();
  } else {
    ctx.font = '19px serif';
    ctx.fillStyle = '#d5b982';
    ctx.textAlign = 'center';
    ctx.fillText(card.icon,photoX+photoWidth/2,photoY+29);
    ctx.textAlign = 'left';
  }
  ctx.strokeStyle = card.portraitBorder;
  ctx.strokeRect(photoX+.5,photoY+.5,photoWidth-1,photoHeight-1);
  ctx.font = card.nameFont;
  const textX = photoX+photoWidth+7;
  const textWidth = x+width-textX-6;
  const names = wrapText(ctx,card.name,textWidth,2);
  ctx.font = card.subtitleFont;
  const subtitles = wrapText(ctx,card.subtitle,textWidth,2);
  const nameHeight = card.nameSize*1.1;
  const subHeight = card.subtitleSize*1.1;
  const top = y+(height-names.length*nameHeight-subtitles.length*subHeight)/2;
  ctx.font = card.nameFont;
  ctx.fillStyle = card.nameColor;
  names.forEach((line,i) => ctx.fillText(line,textX,top+card.nameSize+i*nameHeight));
  ctx.font = card.subtitleFont;
  ctx.fillStyle = card.subtitleColor;
  subtitles.forEach((line,i) => ctx.fillText(line,textX,top+names.length*nameHeight+card.subtitleSize+i*subHeight));
}

function paintHeading(ctx,text,x,y,background) {
  if (!background) {
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#fffaf1';
    ctx.strokeText(text,x,y);
    ctx.restore();
  }
  ctx.fillText(text,x,y);
}

export async function exportFamilyTree(viewport,stage,{width,height,signal,background,simple}) {
  await document.fonts.ready;
  if (signal.aborted) return;
  const title = viewport.getAttribute('aria-label').replace(/(?:画布| canvas)$/,'');
  const canvasColor = getComputedStyle(viewport).backgroundColor;
  const cards = [...stage.querySelectorAll('.tree-node')].map(node => captureCard(node,simple));
  const bands = [...stage.querySelectorAll('.tree-band')].map(band => ({top:band.offsetTop,text:band.textContent}));
  const legend = [...viewport.parentElement.querySelectorAll('.tree-guide li')].map((item,index) => ({
    text:item.textContent, color:background ? getComputedStyle(item,'::before').borderTopColor : transparentColors[index]
  }));
  const wireUrl = URL.createObjectURL(wireImage(stage,cards,{width,height,background,canvasColor}));
  const border = 24;
  const headerHeight = 62;
  const imageWidth = width+border*2;
  const imageHeight = height+headerHeight+border;
  const scale = Math.min(2,pngScaleLimit/Math.max(imageWidth,imageHeight));
  try {
    const [wires,portraits] = await Promise.all([
      decodeImage(wireUrl),
      Promise.all(cards.map(card => card.portrait ? decodeImage(card.portrait).catch(() => null) : null))
    ]);
    if (signal.aborted) return;
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(imageWidth*scale);
    canvas.height = Math.ceil(imageHeight*scale);
    const ctx = canvas.getContext('2d');
    ctx.scale(scale,scale);
    if (background) {
      ctx.fillStyle = canvasColor;
      ctx.fillRect(0,0,canvas.width/scale,canvas.height/scale);
    }
    ctx.fillStyle = background ? '#eed7ae' : '#212728';
    ctx.font = 'bold 23px serif';
    paintHeading(ctx,title,border,39,background);
    ctx.font = '14px sans-serif';
    let legendX = imageWidth-border;
    for (let i=legend.length-1;i>=0;i--) {
      const {text,color} = legend[i];
      const textX = legendX-ctx.measureText(text).width;
      ctx.fillStyle = background ? '#d4c8aa' : '#3d4546';
      paintHeading(ctx,text,textX,38,background);
      ctx.strokeStyle = color;
      ctx.setLineDash(i === 0 ? [] : i === 1 ? [5,4] : [2,4]);
      ctx.beginPath();
      ctx.moveTo(textX-24,33);
      ctx.lineTo(textX-8,33);
      ctx.stroke();
      legendX = textX-44;
    }
    ctx.setLineDash([]);
    ctx.translate(border,headerHeight);
    ctx.font = 'bold 16px serif';
    for (const band of bands) {
      ctx.fillStyle = background ? '#c5ad83' : '#4e4036';
      paintHeading(ctx,band.text,31,band.top+16,background);
      ctx.fillStyle = background ? '#776c52' : '#9a8d80';
      ctx.fillRect(31,band.top+24,width-62,1);
    }
    ctx.drawImage(wires,0,0,width,height);
    cards.forEach((card,index) => paintCard(ctx,card,portraits[index]));
    const png = await new Promise(resolve => canvas.toBlob(resolve,'image/png'));
    if (signal.aborted) return;
    if (!png) throw new Error('Unable to encode the family tree image.');
    const download = document.createElement('a');
    download.href = URL.createObjectURL(png);
    download.download = title+'.png';
    download.click();
    const downloadUrl = download.href;
    setTimeout(() => URL.revokeObjectURL(downloadUrl),5000);
  } finally {
    URL.revokeObjectURL(wireUrl);
  }
}
