const historicalLocations = [
  ...earlyEvents.filter(event => event.coords).map(event => [
    event.id, event.cn, event.place, event.coords, event.date || `${event.reign} 年`, event.sourceName, event.source
  ]),
  ['domesday', '末日审判书调查', '格洛斯特（下令调查的王廷集会）', [51.865, -2.245], '1085 年圣诞下令，1086 年开展', '牛津大学研究档案', 'https://ora.ox.ac.uk/objects/uuid:af025383-716a-449c-a2af-699eb7e72c19', ['william-i']],
  ['becket', '托马斯·贝克特遇害', '坎特伯雷大教堂', [51.2798, 1.0831], '1170 年 12 月 29 日', '坎特伯雷大教堂', 'https://www.canterbury-cathedral.org/our-story/', ['henry-ii']],
  ['model-parliament', '模范议会', '威斯敏斯特（议会召集地）', [51.499, -0.124], '1295 年 11 月', '福特汉姆大学 · 1295 年议会召集令', 'https://sourcebooks.fordham.edu/source/ed1-summons.asp', ['edward-i']],
  ['hundred-years', '百年战争开始', '阿基坦（以波尔多定位争议区域）', [44.8378, -0.5792], '1337 年', '剑桥大学出版社 · 阿基坦战事研究', 'https://www.cambridge.org/core/books/henry-of-lancasters-expedition-to-aquitaine-13451346/AF23133BC09D606288466F91AF6F1FE4/listing', ['edward-iii']],
  ['black-death', '黑死病抵达英格兰', '梅尔科姆里吉斯（今韦茅斯，早期登陆记载）', [50.612, -2.456], '1348 年', '英格兰历史遗产局', 'https://historicengland.org.uk/images-books/publications/weymouths-seaside-heritage/weymouths-seaside-heritage/'],
  ['peasants', '英格兰农民起义', '伦敦史密斯菲尔德（理查二世与起义者会面）', [51.519, -0.10], '1381 年 6 月', '伦敦博物馆', 'https://www.londonmuseum.org.uk/collections/london-stories/how-peasants-revolt-rocked-medieval-london/', ['richard-ii']],
  ['agincourt', '阿金库尔战役', '法国阿赞库尔附近（战场区域）', [50.463, 2.143], '1415 年 10 月 25 日', '阿赞库尔战役博物馆', 'https://azincourt1415.com/bataille-azincourt-1415/', ['henry-v']],
  ['roses', '玫瑰战争', '圣奥尔本斯（首战地点）', [51.753, -0.336], '1455 年 5 月 22 日（首战）', '圣奥尔本斯博物馆', 'https://www.stalbansmuseums.org.uk/node/996'],
  ['henry-vi-return', '亨利六世复位', '伦敦塔（复位前关押地点）', [51.5081, -0.0759], '1470 年', '英国王室', 'https://www.royal.uk/henry-vi'],
  ['reformation', '英格兰宗教改革', '威斯敏斯特（议会通过《至尊法案》）', [51.499, -0.124], '1534 年（《至尊法案》）', '英国议会档案', 'https://www.parliament.uk/about/living-heritage/transformingsociety/private-lives/religion/collections/common-prayer/act-of-supremacy/'],
  ['armada', '西班牙无敌舰队来袭', '格拉沃利讷外海（海战区域）', [51.055, 2.08], '1588 年 8 月 8 日（格拉沃利讷海战）', '格林尼治皇家博物馆', 'https://www.rmg.co.uk/collections/objects/rmgc-object-542820', ['elizabeth-i']],
  ['crowns', '英格兰与苏格兰共主', '伦敦里士满宫（伊丽莎白一世去世地点）', [51.461, -0.309], '1603 年 3 月 24 日', '英国王室', 'https://www.royal.uk/elizabeth-i'],
  ['civil-war', '英格兰内战爆发', '诺丁汉（查理一世树起王旗）', [52.95, -1.15], '1642 年 8 月 22 日', '英国国家陆军博物馆', 'https://collection.nam.ac.uk/detail.php?acc=1990-06-34-1', ['charles-i']],
  ['republic', '共和时期', '伦敦白厅（查理一世被处决地点）', [51.5045, -0.1264], '1649 年 1 月 30 日（处决）', '历史皇家宫殿机构', 'https://www.hrp.org.uk/banqueting-house/whats-on/charles-i-s-execution-site/'],
  ['restoration', '君主制复辟', '伦敦（查理二世回城）', [51.507, -0.128], '1660 年 5 月 29 日', '英国国家陆军博物馆', 'https://www.nam.ac.uk/explore/restoration-and-birth-british-army', ['charles-ii']],
  ['revolution', '光荣革命', '布里克瑟姆（威廉登陆）', [50.398, -3.51], '1688 年 11 月 5 日（登陆）', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/invasiondesertion/'],
  ['bill-rights', '权利法案', '威斯敏斯特（议会立法）', [51.499, -0.124], '1689 年 12 月', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/overview/billofrights/', ['william-iii', 'mary-ii']],
  ['american-independence', '美国发表《独立宣言》', '费城独立厅（大陆会议通过地点）', [39.9489, -75.15], '1776 年 7 月 4 日', '美国国家公园管理局', 'https://home.nps.gov/articles/000/assembly-room-furnishings.htm', ['george-iii']],
  ['union-1801', '联合王国成立', '都柏林（原爱尔兰议会所在地）', [53.345, -6.26], '1801 年 1 月 1 日', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliamentandireland/overview/parliamentary-union/'],
  ['waterloo', '滑铁卢战役', '今比利时蒙圣让一带（战场区域）', [50.679, 4.413], '1815 年 6 月 18 日', '英国国家陆军博物馆', 'https://www.nam.ac.uk/explore/battle-waterloo'],
  ['reform-act', '改革法案', '威斯敏斯特（议会立法）', [51.499, -0.124], '1832 年', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/houseofcommons/reformacts/', ['william-iv']],
  ['world-war-i', '英国加入第一次世界大战', '伦敦唐宁街（内阁获悉宣战消息）', [51.5034, -0.1276], '1914 年 8 月 4 日', '帝国战争博物馆', 'https://www.iwm.org.uk/sites/default/files/press-release/4_August_1914_Factsheet.pdf', ['george-v']],
  ['windsor', '王室更名为温莎', '白金汉宫（王室公告签发地）', [51.501, -0.142], '1917 年 7 月 17 日', '《伦敦公报》公告原件', 'https://www.thegazette.co.uk/London/issue/30186/page/7119/data.pdf'],
  ['world-war-ii', '英国加入第二次世界大战', '威斯敏斯特（首相向议会宣布战争状态）', [51.499, -0.124], '1939 年 9 月 3 日', '英国议会辩论记录', 'https://api.parliament.uk/historic-hansard/commons/1939/sep/03/prime-ministers-announcement', ['george-vi']],
  ['ve-day', '欧洲胜利日', '白金汉宫（伦敦庆祝活动）', [51.501, -0.142], '1945 年 5 月 8 日', '英国皇家公园管理机构', 'https://www.royalparks.org.uk/read-watch-listen/ve-day-royal-parks', ['george-vi']],
  ['conquest', '黑斯廷斯战役', '巴特尔修道院一带（传统战场位置）', [50.914, 0.487], '1066 年 10 月 14 日', '英格兰遗产委员会', 'https://www.english-heritage.org.uk/visit/places/1066-battle-of-hastings-abbey-and-battlefield/history-and-stories/battle-of-hastings-location/'],
  ['magna-carta', '大宪章', '兰尼米德', [51.444, -0.567], exactEventDates['magna-carta'], '英国议会', 'https://www.parliament.uk/magnacarta/'],
  ['bannockburn', '班诺克本战役', '斯特灵南郊（战场区域）', [56.09, -3.93], '1314 年 6 月 23–24 日', '苏格兰历史环境局', 'https://portal.historicenvironment.scot/designation/BTL4', ['edward-ii']],
  ['bosworth', '博斯沃思战役', '莱斯特郡西部（战场区域）', [52.596, -1.417], exactEventDates.bosworth, '英格兰历史遗产局', 'https://historicengland.org.uk/listing/the-list/list-entry/1000004'],
  ['great-fire', '伦敦大火', '伦敦城布丁巷（起火地点）', [51.510, -0.086], '1666 年 9 月 2–6 日', '伦敦博物馆', 'https://www.londonmuseum.org.uk/collections/london-stories/great-fire-of-london/', ['charles-ii']],
  ['union-1707', '大不列颠王国成立', '威斯敏斯特（英格兰议会所在地）', [51.499, -0.124], '1707 年 5 月 1 日', '英国议会', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/act-of-union-1707/key-dates/'],
  ['elizabeth-coronation', '伊丽莎白二世加冕', '威斯敏斯特教堂', [51.4993, -0.1273], exactEventDates['elizabeth-coronation'], '威斯敏斯特教堂', 'https://www.westminster-abbey.org/abbey-commemorations/royals/elizabeth-ii', ['elizabeth-ii']],
  ['charles-coronation', '查尔斯三世加冕', '威斯敏斯特教堂', [51.4993, -0.1273], exactEventDates['charles-coronation'], '威斯敏斯特教堂', 'https://www.westminster-abbey.org/abbey-commemorations/royals/charles-iii', ['charles-iii']]
].map(([id, title, place, coords, date, sourceName, sourceUrl, related]) => {
  const entry = guideEntries.get(id);
  return {entry, year:Math.floor(entry.year), title, place, coords, date, sourceName, sourceUrl, related: related || entry.people || [], kind: eventTypeById.get(id)};
}).sort((a,b) => a.entry.year - b.entry.year);

const hasHistoricalLocation = id => historicalLocations.some(event => event.entry.id === id);
const firstMapYear = historicalLocations[0].year;
const lastMapYear = historicalLocations.at(-1).year;

let leafletReady;
function loadLeaflet() {
  if (!leafletReady) {
    const assets = [['link', {rel:'stylesheet', href:'vendor/leaflet/leaflet.css'}], ['script', {src:'vendor/leaflet/leaflet.js'}]];
    const elements = assets.map(([tag, attributes]) => Object.assign(document.createElement(tag), attributes));
    leafletReady = Promise.all(elements.map(element => new Promise((resolve, reject) => {
      element.onload = resolve;
      element.onerror = reject;
      document.head.append(element);
    }))).then(() => window.L).catch(error => {
      elements.forEach(element => element.remove());
      leafletReady = undefined;
      throw error;
    });
  }
  return leafletReady;
}

function historicalMap() {
  return `<section class="map-page" aria-labelledby="map-title">
    <header class="map-heading">
      <h1 id="map-title">历史地图</h1>
      <p>${historicalLocations.length} 件大事可定位。跨地区事件以有史料支持的代表地点标注。</p>
      <div class="map-episode-entries">
        <a class="map-episode-entry" href="#/map/norman-1066">1066 诺曼征服 →</a>
        <a class="map-episode-entry" href="#/map/wars-of-the-roses">玫瑰战争 →</a>
        <button type="button" class="map-episode-entry" data-episode-open disabled>观看专题动画 <span>1688–1707 →</span></button>
      </div>
    </header>
    <div class="map-experience">
      <div class="map-stage">
        <div class="history-map" role="region" aria-label="英国历史事件互动地图"></div>
        <div class="map-status" role="status">正在加载地图…</div>
        <fieldset class="map-layers" hidden>
          <legend>图层</legend>
          <label><input type="checkbox" name="events" checked> 历史地点</label>
          <label><input type="checkbox" name="cities" checked> 城市标记</label>
          <label><input type="checkbox" name="territories" checked> 历史疆域</label>
        </fieldset>
      </div>
      <article class="map-event-card" aria-live="polite"></article>
      ${mapEpisodePanel()}
      <div class="map-timeline">
        <div class="map-transport">
          <button class="map-play" type="button" data-play>播放</button>
          <select aria-label="播放倍速" data-map-speed><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select>
        </div>
        <div class="map-scrub">
          <span>${firstMapYear}</span>
          <div class="map-scrub-track">
            <span class="map-year"></span>
            <input id="map-scrubber" type="range" aria-label="历史地图年份" min="${firstMapYear}" max="${lastMapYear}" value="${firstMapYear}">
            <div class="map-axis-events" role="group" aria-label="时间轴上的大事"></div>
          </div>
          <span>${lastMapYear}</span>
        </div>
        <div class="map-cluster-events" role="group" aria-label="同一时间段的大事" hidden></div>
        <div class="map-navigation">
          <label>定位事件 <select aria-label="选择历史事件" data-map-jump>${historicalLocations.map(({entry, year, title}) => `<option value="${entry.id}">${year} · ${title}</option>`).join('')}</select></label>
          ${territorySelector()}
        </div>
        <div class="map-territory-summary"></div>
      </div>
    </div>
    <div class="map-credit">底图显示现代海岸与河流。部分事件标记采用代表地点或大致区域。${sourceNote('底图 · Natural Earth','https://www.naturalearthdata.com/about/terms-of-use/')}</div>
  </section>`;
}

function mapEventCard(event) {
  const {entry, title, place, date, sourceName, sourceUrl, related, kind} = event;
  return `<p class="map-event-type" data-kind="${kind.type}">${kind.label}</p>
    <h2>${title}</h2>
    <dl><div><dt>时间</dt><dd>${date}</dd></div><div><dt>地点</dt><dd>${place}</dd></div></dl>
    <p class="map-event-note">${entry.note}</p>
    ${related.length ? `<div class="map-related">${related.map(id => {
      const person = people.get(id);
      return person ? `<a href="${guideLink(person, true)}">${portrait(person)}<span>${person.cn}</span></a>` : '';
    }).join('')}</div>` : ''}
    <div class="map-event-links">${sourceNote(sourceName,sourceUrl)}
    ${['roses','henry-vi-return','bosworth'].includes(entry.id) ? '<a href="#/map/wars-of-the-roses">查看玫瑰战争专题 ↗</a>' : ''}
    ${entry.id === 'conquest' || entry.id === 'stamford-bridge' ? '<a href="#/map/norman-1066">查看 1066 专题 ↗</a>' : ''}
    <a href="${guideLink(entry, true)}">在时间线查看资料 <span aria-hidden="true">↗</span></a></div>`;
}

function mountHistoricalMap(section, locationId, signal, setLocation) {
  const card = section.querySelector('.map-event-card');
  const timeline = section.querySelector('.map-timeline');
  const canvas = section.querySelector('.history-map');
  const status = section.querySelector('.map-status');
  const layers = section.querySelector('.map-layers');
  const scrubber = section.querySelector('#map-scrubber');
  const year = section.querySelector('.map-year');
  const play = section.querySelector('[data-play]');
  const speed = timeline.querySelector('[data-map-speed]');
  const jump = timeline.querySelector('[data-map-jump]');
  const periodSelect = timeline.querySelector('[data-map-territory]');
  const track = timeline.querySelector('.map-scrub-track');
  const axis = timeline.querySelector('.map-axis-events');
  const cluster = timeline.querySelector('.map-cluster-events');
  const fraction = date => (date - firstMapYear) / (lastMapYear - firstMapYear);
  const territoryControl = layers.elements.territories;
  let territory;
  let groups = [];
  let openGroup;
  let axisWidth = 0;
  const dateRoute = Number(/^year-(\d{1,4})$/.exec(locationId)?.[1]);
  const initialYear = dateRoute >= firstMapYear && dateRoute <= lastMapYear ? dateRoute : null;
  let selected = historicalLocations.find(event => event.entry.id === locationId) || historicalLocations[0];
  let displayed;
  let frame = 0;
  let updateMarker;
  let resetBritainView;

  function showYear(value, event, locate = Boolean(event)) {
    scrubber.value = value;
    year.textContent = `${value} 年`;
    scrubber.setAttribute('aria-valuetext', year.textContent);
    track.style.setProperty('--year-progress', `${fraction(value)*100}%`);
    territory?.setYear(value);
    selected = event || historicalLocations.findLast(item => item.year <= value);
    if (selected === displayed) {
      if (locate) updateMarker?.(selected);
      return;
    }
    displayed = selected;
    jump.value = selected.entry.id;
    card.innerHTML = mapEventCard(selected);
    markSelectedEvent();
    updateMarker?.(selected);
  }

  function markSelectedEvent() {
    [...axis.children].forEach((marker, index) => {
      if (groups[index].includes(selected)) marker.setAttribute('aria-current','true');
      else marker.removeAttribute('aria-current');
    });
  }

  function hideCluster() {
    openGroup = undefined;
    cluster.hidden = true;
    axis.querySelector('[aria-expanded="true"]')?.setAttribute('aria-expanded','false');
  }

  function drawAxis() {
    const width = axis.clientWidth;
    if (!width || width === axisWidth) return;
    axisWidth = width;
    hideCluster();
    groups = [];
    const axisPosition = event => Math.max(13, Math.min(width - 13, fraction(event.year)*width));
    historicalLocations.forEach(event => {
      const previous = groups.at(-1);
      if (previous && axisPosition(event) - axisPosition(previous[0]) < 27) previous.push(event);
      else groups.push([event]);
    });
    axis.innerHTML = groups.map((group, index) => {
      const first = group[0];
      const multiple = group.length > 1;
      const endYear = group.at(-1).year;
      const date = endYear === first.year ? first.year : `${first.year}–${endYear}`;
      const description = `${date} 年 · ${multiple ? group.length + ' 件大事' : first.title}`;
      return `<button type="button" data-group="${index}" data-kind="${multiple ? 'group' : first.kind.type}"
        style="--event-position:${axisPosition(first)}px" title="${description}" aria-label="${description}"${multiple ? ' aria-expanded="false"' : ''}>${multiple ? group.length : ''}</button>`;
    }).join('');
    markSelectedEvent();
  }

  axis.addEventListener('click', event => {
    const button = event.target.closest('[data-group]');
    if (!button) return;
    const group = groups[Number(button.dataset.group)];
    const wasOpen = openGroup === group;
    hideCluster();
    if (group.length === 1) return selectEvent(group[0]);
    if (wasOpen) return;
    openGroup = group;
    button.setAttribute('aria-expanded','true');
    cluster.innerHTML = group.map(item => `<button type="button" data-event-id="${item.entry.id}">${item.year} · ${item.title}</button>`).join('');
    cluster.hidden = false;
    if (event.detail === 0) cluster.firstElementChild?.focus({preventScroll:true});
  }, {signal});

  cluster.addEventListener('click', event => {
    const button = event.target.closest('[data-event-id]');
    if (!button) return;
    const marker = axis.querySelector('[aria-expanded="true"]');
    selectEvent(openGroup.find(item => item.entry.id === button.dataset.eventId));
    marker?.focus({preventScroll:true});
  }, {signal});

  const axisResize = new ResizeObserver(drawAxis);
  axisResize.observe(axis);
  signal.addEventListener('abort', () => axisResize.disconnect(), {once:true});

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    play.textContent = '播放';
  }

  function selectEvent(event) {
    stop();
    hideCluster();
    showYear(event.year, event);
    // Persist an explicitly chosen event so browser Back returns to the same map stop.
    setLocation(event.entry.id);
  }

  play.addEventListener('click', () => {
    if (frame) return stop();
    if (+scrubber.value === lastMapYear) showYear(firstMapYear);
    const startYear = +scrubber.value;
    const next = selected.year === startYear
      ? historicalLocations[historicalLocations.indexOf(selected) + 1]
      : historicalLocations.find(item => item.year > startYear);
    const start = performance.now();
    const duration = 2600 / Number(speed.value);
    const distance = next.year - startYear;
    play.textContent = '暂停';
    function tick(now) {
      const progress = (now - start) / duration;
      if (progress >= 1) return selectEvent(next);
      if (distance) showYear(startYear + Math.floor(Math.max(0, progress) * distance), selected, false);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }, {signal});

  scrubber.addEventListener('input', () => {
    stop();
    hideCluster();
    showYear(+scrubber.value);
  }, {signal});
  periodSelect.addEventListener('change', () => {
    stop();
    hideCluster();
    const targetYear = Number(periodSelect.value);
    showYear(targetYear);
    resetBritainView?.();
    setLocation(`year-${targetYear}`);
  }, {signal});
  jump.addEventListener('change', () => selectEvent(historicalLocations.find(event => event.entry.id === jump.value)), {signal});
  signal.addEventListener('abort', stop, {once:true});
  showYear(initialYear ?? selected.year, initialYear ? undefined : selected);

  Promise.all([loadLeaflet(),fetchMapGeometry('assets/britain-base.geojson', signal)]).then(([L, land]) => {
    if (signal.aborted) return;
    const map = L.map(canvas, {scrollWheelZoom:false, fadeAnimation:false, attributionControl:false, zoomSnap:.5, minZoom:4, maxZoom:11, maxBounds:[[25,-94],[67,15]], maxBoundsViscosity:.8});
    signal.addEventListener('abort', () => map.remove(), {once:true});
    resetBritainView = () => map.fitBounds([[49.5,-10.6],[60.9,2.2]], {
      padding:[10,10], maxZoom:5.5, animate:false
    });
    resetBritainView();
    L.geoJSON(land, {interactive:false, style:{stroke:false, fillColor:'#4c5f4d', fillOpacity:1}}).addTo(map);
    L.control.scale({imperial:false, position:'bottomright'}).addTo(map);
    map.createPane('rivers').style.zIndex = 408;
    fetchMapGeometry('assets/map-rivers.geojson', signal).then(rivers => {
      if (!signal.aborted) L.geoJSON(rivers, {pane:'rivers',interactive:false, style:{color:'#8ab6c4',weight:1,opacity:.65}}).addTo(map);
    }).catch(() => {});
    const waters = [['北海',55.77,2.3], ['爱尔兰海',54.06,-5.12,'secondary'], ['英吉利海峡',50.03,-0.9], ['大西洋',39.15,-70]];
    L.layerGroup(waters.map(([name, lat, lng, prominence]) => L.marker([lat,lng], {interactive:false, keyboard:false,
      icon:L.divIcon({className:prominence ? 'map-water-label map-label-secondary' : 'map-water-label',html:name,iconSize:[90,18]})
    }))).addTo(map);
    const unionGeometry = fetchMapGeometry('assets/britain-union.geojson',signal);
    territory = mountMapTerritories(section, L, map, unionGeometry, signal);
    territory.setYear(Number(scrubber.value));
    territory.setVisible(territoryControl.checked);
    const cities = L.layerGroup([
      ['爱丁堡',55.953,-3.189], ['约克',53.96,-1.08], ['伦敦',51.51,-0.13],
      ['加的夫',51.48,-3.18,'left'], ['都柏林',53.35,-6.26,'left'], ['贝尔法斯特',54.60,-5.93,'left','secondary'],
      ['巴黎',48.86,2.35], ['波尔多',44.84,-.58], ['布鲁塞尔',50.85,4.35], ['费城',39.95,-75.16], ['纽约',40.71,-74.01]
    ].map(([name, lat, lng, direction = 'right', prominence]) => L.circleMarker([lat,lng], {radius:2, color:'#ddd2b7', weight:1, fillOpacity:.8, interactive:false})
      .bindTooltip(name, {permanent:true, className:prominence ? 'map-city-label map-label-secondary' : 'map-city-label', direction, offset:[direction === 'left' ? -4 : 4,0]}))).addTo(map);
    const markers = L.layerGroup().addTo(map);
    updateMarker = event => {
      markers.clearLayers();
      L.marker(event.coords, {interactive:false, keyboard:false, icon:L.divIcon({
        className:`map-location-pin map-location-${event.kind.type}`, iconSize:[22,22]
      })}).addTo(markers);
      const inNorthAmerica = event.coords[1] < -45;
      const wasInNorthAmerica = map.getCenter().lng < -45;
      if (inNorthAmerica !== wasInNorthAmerica) {
        if (inNorthAmerica) map.setView([41,-75], 5.5, {animate:false});
        else resetBritainView();
      }
      if (!map.getBounds().pad(-.035).contains(event.coords)) map.panTo(event.coords, {animate:false});
    };
    updateMarker(selected);
    layers.addEventListener('change', ({target}) => {
      if (target === territoryControl) return territory.setVisible(target.checked);
      const layer = target.name === 'cities' ? cities : markers;
      if (target.checked) layer.addTo(map);
      else layer.remove();
    }, {signal});
    const resize = new ResizeObserver(() => map.invalidateSize({pan:false}));
    resize.observe(canvas);
    signal.addEventListener('abort', () => resize.disconnect(), {once:true});
    status.hidden = true;
    layers.hidden = false;
    const experience = section.querySelector('.map-experience');
    const openEpisode = mountMapEpisode(section, L, map, signal, unionGeometry, () => {
      stop();
      territory.setVisible(false);
      markers.remove();
      if (layers.elements.cities.checked) cities.remove();
      layers.hidden = true;
      card.hidden = true;
      timeline.hidden = true;
      experience.classList.add('showing-episode');
      setLocation('stuart-union');
    }, () => {
      layers.hidden = false;
      if (layers.elements.events.checked) markers.addTo(map);
      if (layers.elements.cities.checked) cities.addTo(map);
      card.hidden = false;
      timeline.hidden = false;
      experience.classList.remove('showing-episode');
      territory.setVisible(territoryControl.checked);
      resetBritainView();
      updateMarker(selected);
      setLocation(Number(scrubber.value) === selected.year ? selected.entry.id : `year-${scrubber.value}`);
    });
    if (locationId === 'stuart-union') openEpisode();
    canvas.dataset.ready = 'true';
  }).catch(error => {
    if (signal.aborted) return;
    status.textContent = '地图加载失败，仍可浏览下方的大事。';
    console.error(error);
  });
}
