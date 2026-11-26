const parliamentaryUnion = 'https://commonslibrary.parliament.uk/research-briefings/cbp-10649/';
const commonwealthSource = 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/act-of-union-1707/overview/revolution-and-civil-war/';
const medievalMapSource = 'https://github.com/aourednik/historical-basemaps/tree/4b5039e50d8d2464b065bd76ad6086cd4597108d';
const unionSource = 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/act-of-union-1707/overview/the-articles-constitution-and-trade/';

const territoryColors = {
  ROM:['罗马不列颠', '#bf6857'], WSX:['威塞克斯', '#cda261'], MER:['麦西亚', '#966cb8'],
  NTH:['诺森布里亚', '#75aac6'], KNT:['肯特', '#91b979'], ESS:['埃塞克斯', '#d29aa5'],
  WEL:['威尔士诸政权', '#79ac9b'], PIC:['皮克特人诸地', '#a691ca'], SCO:['达尔里阿达等盖尔人诸地', '#c49067'],
  IRL:['爱尔兰诸政权（概括）', '#91b774'],
  ENG:['英格兰', '#b6755b'], SCT:['苏格兰', '#6ba6c4'], CEL:['凯尔特诸政权（概括）', '#84ad7d'],
  ANG:['金雀花王室领地', '#c9825e'], ENW:['英格兰（含威尔士）', '#b6755b'],
  IRE:['爱尔兰王国', '#83ae85'], REP:['英格兰共和国', '#9b8bc7'], CMW:['英格兰、苏格兰及爱尔兰共和国', '#9b8bc7'],
  GB:['大不列颠王国', '#cea058'], UKI:['大不列颠及爱尔兰联合王国', '#8f9ed1'],
  UK:['英国（含北爱尔兰）', '#5db3a5'], IFS:['爱尔兰自由邦及其后继国家', '#82aa76']
};
const preUnion = {ENG:'ENW', WLS:'ENW', SCT:'SCT', IRL:'IRE', NIR:'IRE'};
const insularUnion = color => ({ENG:color, WLS:color, SCT:color, IRL:color, NIR:color});

const territoryPeriods = [
  {since:43, title:'罗马入侵初期', source:earlyChapters[0].note[3], note:'罗马控制范围逐步扩大。地图标出有史料支持的地点。'},
  {since:100, title:'罗马不列颠', snapshot:100},
  {since:410, title:'后罗马时代与早期诸国', source:earlyMedievalSource, note:'政权边界随时间变化，地图标出有史料支持的地点。'},
  {since:800, title:'盎格鲁-撒克逊诸国', snapshot:800},
  {since:866, title:'维京扩张与英格兰王国形成', source:earlyMedievalSource, note:'地图标出约克、埃丁顿等可定位节点。此段疆界尚未加入。'},
  {since:1000, title:'诺曼征服前后', snapshot:1000},
  {since:1200, title:'金雀花跨海领地', snapshot:1200},
  {since:1300, title:'中世纪英格兰与苏格兰', snapshot:1300},
  {since:1500, title:'都铎王朝初期', snapshot:1500},
  {since:1543, title:'英格兰与威尔士合并后', units:preUnion, source:parliamentaryUnion, note:'威尔士纳入英格兰法制。爱尔兰王国色块示意法理范围。'},
  {since:1603, title:'英格兰与苏格兰共主', units:preUnion, source:parliamentaryUnion, note:'两个王国共用君主，各有议会和法律。'},
  {since:1649, title:'共和初期与王国冲突', units:{ENG:'REP', WLS:'REP', SCT:'SCT'}, source:commonwealthSource, note:'爱尔兰和战时实际控制线暂留空。'},
  {since:1654, title:'护国公时期的合并', units:insularUnion('CMW'), source:commonwealthSource, note:'1654 年，三地向同一座威斯敏斯特议会派出代表。'},
  {since:1660, title:'王政复辟', units:preUnion, source:commonwealthSource, note:'共和时期的合并结束，恢复分立的王国框架。'},
  {since:1707, title:'大不列颠王国成立', units:{ENG:'GB', WLS:'GB', SCT:'GB', IRL:'IRE', NIR:'IRE'}, source:unionSource, note:'英格兰与苏格兰合为大不列颠王国。爱尔兰仍在合并之外。'},
  {since:1801, title:'大不列颠及爱尔兰联合', units:insularUnion('UKI'), source:parliamentaryUnion, note:'大不列颠与爱尔兰合为联合王国。'},
  {since:1922, title:'爱尔兰自由邦成立后', units:{ENG:'UK', WLS:'UK', SCT:'UK', NIR:'UK', IRL:'IFS'}, source:parliamentaryUnion, note:'爱尔兰自由邦成立，北爱尔兰留在英国。'}
];

function fetchMapGeometry(url, signal) {
  return fetch(url, {signal}).then(response => {
    if (!response.ok) throw new Error(`Map data unavailable: ${url}`);
    return response.json();
  });
}

function territorySelector() {
  return `<label>疆域时期 <select aria-label="选择疆域时期" data-map-territory>${territoryPeriods.map(({since,title}) =>
    `<option value="${since}">${since} · ${title}</option>`).join('')}</select></label>`;
}

function mountMapTerritories(section, L, map, unionGeometry, signal) {
  const summary = section.querySelector('.map-territory-summary');
  const periodSelect = section.querySelector('[data-map-territory]');
  map.createPane('historical-territories').style.zIndex = 405;
  const overlays = L.geoJSON(undefined, {pane:'historical-territories', interactive:false});
  let period;
  let geography;
  let unavailable = false;

  function draw() {
    const {snapshot, title, units, source, note} = period;
    const features = geography?.[snapshotIndex()]?.features.filter(feature => snapshot
      ? feature.properties.snapshot === snapshot : units[feature.properties.unit]);
    const groupFor = feature => {
      const {unit} = feature.properties;
      return snapshot ? unit : units[unit];
    };
    overlays.clearLayers();
    if (features) {
      overlays.options.style = feature => {
        const [, color] = territoryColors[groupFor(feature)];
        return {fillColor:color, color, fillOpacity:.65, stroke:Boolean(snapshot), weight:1.4, opacity:.96, dashArray:snapshot ? '3 2' : null, className:'map-period-shape'};
      };
      overlays.addData(features);
    }
    const groups = features ? [...new Set(features.map(groupFor))] : [];
    const labels = groups.map(key => {
      const [name, color] = territoryColors[key];
      return `<span style="--union-color:${color}">${name}</span>`;
    }).join('');
    const description = snapshot
      ? `边界参考 ${snapshot} 年的地图概略快照。快照之间沿用上一份资料。`
      : units ? `${note} 色块以现代轮廓示意政治归属。覆盖不列颠群岛。` : note;
    summary.innerHTML = `<strong>${title}</strong>
      <div class="map-episode-legend">${labels}</div>
      <p>${unavailable ? '疆域数据加载失败。' : description}</p>${sourceNote('疆域资料',source || medievalMapSource)}`;
  }

  Promise.allSettled([fetchMapGeometry('assets/britain-medieval.geojson',signal), unionGeometry]).then(results => {
    if (signal.aborted) return;
    geography = results.map(result => result.status === 'fulfilled' ? result.value : {features:[]});
    unavailable = results[snapshotIndex()]?.status === 'rejected';
    draw();
  });

  function snapshotIndex() { return period.snapshot ? 0 : period.units ? 1 : undefined; }

  return {
    setYear(year) {
      const next = territoryPeriods.findLast(item => item.since <= year);
      if (period === next) return;
      period = next;
      periodSelect.value = next.since;
      if (geography) unavailable = geography[snapshotIndex()]?.features.length === 0;
      draw();
    },
    setVisible(show) {
      summary.hidden = !show;
      if (show) overlays.addTo(map);
      else overlays.remove();
    }
  };
}
