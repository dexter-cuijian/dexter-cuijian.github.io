const stuartMarch = [
  ['布里克瑟姆', [50.398,-3.51], 'left'],
  ['埃克塞特', [50.722,-3.532], 'right'],
  ['伦敦', [51.507,-0.128], 'right']
];

const stuartEpisode = [
  ['1688 年 11 月 5 日', '威廉登陆', '奥兰治亲王威廉率军在英格兰西南部的布里克瑟姆登陆。', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/invasiondesertion/'],
  ['1688 年 11 月', '在埃克塞特停留', '威廉的军队分段抵达埃克塞特，在当地休整并等待支持者集结。', '英国议会史项目', 'https://historyofparliament.com/2020/05/19/our-london-exeter-and-the-glorious-revolution/'],
  ['1688 年 12 月 18 日', '威廉抵达伦敦', '随着詹姆斯二世离开伦敦，威廉率军进入首都，随后召集会议商议王位安排。', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/invasiondesertion/'],
  ['1689 年', '威廉与玛丽共治', '威廉与玛丽接受英格兰王位。英格兰和苏格兰仍分别立法，当年英格兰议会通过《权利法案》。', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/billofrights/'],
  ['1707 年 5 月 1 日', '大不列颠王国成立', '安妮在位时，英格兰王国（包括威尔士）和苏格兰王国依法合并。爱尔兰在这次合并之外。', '英国议会 · 联合法条款', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/act-of-union-1707/overview/the-articles-constitution-and-trade/']
];

function mapEpisodePanel() {
  return `<article class="map-event-card map-episode" hidden aria-label="1688–1707 专题动画">
    <p class="map-event-type">1688–1707 · 从光荣革命到联合法案</p>
    <div data-episode-story aria-live="polite"></div>
    <div class="map-episode-legend" data-episode-legend></div>
    <div class="map-transport map-episode-controls">
      <button type="button" class="map-play" data-episode-play>播放动画</button>
      <label>步骤 <select aria-label="专题步骤">${stuartEpisode.map(([, title], index) => `<option value="${index}">${index+1}. ${title}</option>`).join('')}</select></label>
    </div>
    <label class="map-episode-option"><input type="checkbox" data-episode-territory checked> 政治归属</label>
    <label class="map-episode-option"><input type="checkbox" data-episode-route checked> 行军节点</label>
    <p class="map-episode-note">虚线连接史料记载的节点。色块沿用现代轮廓示意王国归属。</p>
    <p class="map-episode-note" data-episode-error hidden>政治归属图层加载失败。</p>
    <button class="map-episode-back" type="button" data-episode-close>← 返回事件地图</button>
  </article>`;
}

function mountMapEpisode(section, L, map, signal, unionGeometry, enter, leave) {
  const panel = section.querySelector('.map-episode');
  const story = panel.querySelector('[data-episode-story]');
  const legend = panel.querySelector('[data-episode-legend]');
  const play = panel.querySelector('[data-episode-play]');
  const step = panel.querySelector('select');
  const close = panel.querySelector('[data-episode-close]');
  const showTerritory = panel.querySelector('[data-episode-territory]');
  const showRoute = panel.querySelector('[data-episode-route]');
  const trigger = section.querySelector('[data-episode-open]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  map.createPane('stuart-territory').style.zIndex = 410;
  map.createPane('stuart-route').style.zIndex = 420;
  const route = L.layerGroup();
  const points = stuartMarch.map(([, coords]) => coords);
  const path = L.polyline([], {pane:'stuart-route', color:'#ffdb9c', weight:3, dashArray:'7 5', interactive:false, className:'map-campaign-line'}).addTo(route);
  const waypoints = L.layerGroup().addTo(route);
  const mover = L.circleMarker(points[0], {pane:'stuart-route', radius:6, color:'#fff2cc', fillColor:'#f4bf65', fillOpacity:1, interactive:false}).addTo(route);
  const territory = L.geoJSON(undefined, {pane:'stuart-territory', interactive:false, className:'map-territory'});
  let loadedTerritory;
  let current = 0;
  let frame = 0;
  let progress = 0;

  function updateTerritory() {
    const united = current === stuartEpisode.length - 1;
    territory.setStyle(feature => ({
      stroke:false, fillOpacity:.56,
      fillColor: united ? '#c5914f' : feature.properties.unit === 'SCT' ? '#67a1bb' : '#ae715b'
    }));
    legend.innerHTML = united
      ? '<span class="union-britain">大不列颠王国</span>'
      : '<span class="union-england">英格兰（含威尔士）</span><span class="union-scotland">苏格兰</span>';
  }

  function showStep(index) {
    current = index;
    progress = 0;
    step.value = index;
    const [date, title, description, source, url] = stuartEpisode[index];
    story.innerHTML = `<h2>${title}</h2><p class="map-episode-date">${date}</p><p>${description}</p>${sourceNote(source,url)}`;
    const reached = Math.min(index + 1, points.length);
    path.setLatLngs(points.slice(0, reached));
    mover.setLatLng(points[reached-1]);
    waypoints.clearLayers();
    stuartMarch.slice(0,reached).forEach(([name, coords, direction]) => {
      L.circleMarker(coords, {pane:'stuart-route', radius:3, weight:1, color:'#fae2b5', fillOpacity:1, interactive:false})
        .bindTooltip(name, {permanent:true, className:'map-episode-place', direction, offset:[direction === 'left' ? -6 : 6,0]})
        .addTo(waypoints);
    });
    updateTerritory();
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    play.textContent = '播放动画';
  }

  function syncLayers() {
    if (panel.hidden) return;
    if (showTerritory.checked) territory.addTo(map);
    else territory.remove();
    if (showRoute.checked) route.addTo(map);
    else route.remove();
    legend.hidden = !showTerritory.checked;
  }

  function open() {
    enter();
    panel.hidden = false;
    trigger.hidden = true;
    map.fitBounds([[50.05,-6.1],[58.6,1.8]], {padding:[10,10], maxZoom:5.5, animate:false});
    showStep(0);
    syncLayers();
    loadedTerritory ||= unionGeometry.then(data => {
      if (!signal.aborted) {
        territory.addData(data.features.filter(feature => ['ENG','WLS','SCT'].includes(feature.properties.unit)));
        updateTerritory();
      }
    }).catch(() => {
      if (!signal.aborted) panel.querySelector('[data-episode-error]').hidden = false;
      loadedTerritory = undefined;
    });
    play.focus({preventScroll:true});
  }

  play.addEventListener('click', () => {
    if (frame) return stop();
    if (current === stuartEpisode.length - 1) showStep(0);
    play.textContent = '暂停动画';
    const duration = 2400;
    let start = performance.now() - progress * duration;
    function tick(now) {
      progress = Math.min(Math.max(0, now - start) / duration, 1);
      if (!motion.matches && current < points.length - 1) {
        const [from, to] = points.slice(current, current + 2);
        const location = from.map((coordinate, axis) => coordinate + (to[axis] - coordinate) * progress);
        mover.setLatLng(location);
        path.setLatLngs([...points.slice(0, current + 1), location]);
      }
      if (progress === 1) {
        showStep(current+1);
        if (current === stuartEpisode.length - 1) return stop();
        start = now;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }, {signal});

  step.addEventListener('change', () => {
    stop();
    showStep(Number(step.value));
  }, {signal});
  [showRoute, showTerritory].forEach(box => box.addEventListener('change', syncLayers, {signal}));
  trigger.addEventListener('click', open, {signal});
  close.addEventListener('click', () => {
    stop();
    panel.hidden = true;
    trigger.hidden = false;
    territory.remove();
    route.remove();
    leave();
    trigger.focus({preventScroll:true});
  }, {signal});
  signal.addEventListener('abort', () => cancelAnimationFrame(frame), {once:true});
  trigger.disabled = false;
  return open;
}
