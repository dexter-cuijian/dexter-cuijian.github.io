const normanFleetSource = 'https://www.english-heritage.org.uk/visit/places/pevensey-castle/history/norman-invasion/';
const normanSteps = [
  {date:'1 月 5 日', title:'王位空缺', place:'威斯敏斯特', coords:[51.499,-.127], person:'edward-confessor',
    note:'忏悔者爱德华去世，没有子嗣。哈罗德随后成为英格兰国王，诺曼底公爵威廉和挪威国王哈拉尔德也主张王位。',
    source:'威斯敏斯特教堂', url:'https://www.westminster-abbey.org/abbey-sermons/sermon-given-at-the-sung-eucharist-for-the-translation-of-st-edward-the-confessor-2016'},
  {date:'9 月 25 日', title:'斯坦福桥战役', place:'约克以东斯坦福桥', coords:[53.989,-.914], person:'harold-ii',
    note:'哈罗德率军北上，在斯坦福桥击败挪威军队。哈拉尔德在战役中死亡。三天后，威廉在英格兰南岸登陆。',
    source:'英格兰遗产委员会', url:'https://www.english-heritage.org.uk/learn/histories/1066-and-the-norman-conquest/northern-battles-1066/', event:'stamford-bridge'},
  {date:'9 月 27 日', title:'诺曼舰队启航', place:'索姆河畔圣瓦莱里', coords:[50.187,1.628], person:'william-i',
    note:'诺曼舰队在索姆河口等待有利风向。9 月 27 日，舰队从圣瓦莱里出发，连夜横渡英吉利海峡。',
    source:'英格兰遗产委员会', url:normanFleetSource},
  {date:'9 月 28 日', title:'在佩文西登陆', place:'佩文西湾', coords:[50.819,.345], person:'william-i',
    note:'威廉的舰队抵达苏塞克斯海岸，在佩文西登陆。诺曼军队随后向黑斯廷斯转移，在南岸建立据点。',
    source:'英格兰遗产委员会', url:normanFleetSource},
  {date:'10 月 14 日', title:'黑斯廷斯战役', place:'巴特尔修道院一带', coords:[50.914,.487], person:'harold-ii',
    note:'哈罗德率军南下迎击威廉，在战役中阵亡。威廉获胜，随后继续争取英格兰贵族接受其王位。地图标示传统战场区域。',
    source:'英格兰历史遗产局', url:'https://historicengland.org.uk/listing/the-list/list-entry/1000013', event:'conquest'},
  {date:'12 月 25 日', title:'威廉加冕', place:'威斯敏斯特教堂', coords:[51.499,-.127], person:'william-i',
    note:'威廉在圣诞节于威斯敏斯特教堂加冕，成为英格兰国王。取得王位之后，诺曼王室仍需数年巩固统治。',
    source:'威斯敏斯特教堂', url:'https://www.westminster-abbey.org/history/coronations-at-the-abbey/a-history-of-coronations'}
];

const normanStoryData = {
  id:'norman-1066',
  title:'1066 诺曼征服',
  intro:'从王位空缺、跨海登陆，到威廉在威斯敏斯特加冕。',
  back:'#/map/conquest',
  bounds:[[49.93,-2.15],[54.25,2.1]],
  credit:'虚线表示舰队渡海方向。地貌采用现代底图。',
  steps:normanSteps,
  routes:[{from:2,points:[normanSteps[2].coords,normanSteps[3].coords]}],
  markerShifts:{3:12,4:-12},
  datePrefix:'1066 年 '
};

function mapStory(story) {
  const {id,title,intro,back,steps,credit} = story;
  return `<section class="map-page norman-story ${id}" aria-labelledby="map-story-title">
    <header class="map-heading">
      <a href="${back}">← 返回历史地图</a>
      <h1 id="map-story-title">${title}</h1>
      <p>${intro}</p>
    </header>
    <div class="map-experience">
      <div class="map-stage">
        <div class="history-map" role="region" aria-label="${title}"></div>
        <p class="map-status" role="status">正在加载地图…</p>
      </div>
      <article class="map-event-card norman-event" aria-live="polite"></article>
      <div class="map-timeline norman-timeline">
        <div class="map-transport">
          <button type="button" class="map-play" data-norman-play>播放</button>
          <button type="button" data-norman-prev aria-label="上一阶段">←</button>
          <button type="button" data-norman-next aria-label="下一阶段">→</button>
        </div>
        <ol aria-label="专题时间轴" class="norman-stops">
          ${steps.map(({date,title},index) => `<li><button type="button" data-norman-step="${index}"><span>${date}</span><strong>${title}</strong></button></li>`).join('')}
        </ol>
      </div>
    </div>
    <div class="map-credit">${credit}${sourceNote('底图 · Natural Earth','https://www.naturalearthdata.com/about/terms-of-use/')}</div>
  </section>`;
}

function mountMapStory(section, story, signal) {
  const {steps,bounds,routes,markerShifts = {},datePrefix = ''} = story;
  const canvas = section.querySelector('.history-map');
  const status = section.querySelector('.map-status');
  const card = section.querySelector('.norman-event');
  const play = section.querySelector('[data-norman-play]');
  const prev = section.querySelector('[data-norman-prev]');
  const next = section.querySelector('[data-norman-next]');
  const stops = [...section.querySelectorAll('[data-norman-step]')];
  let current = 0;
  let timer;
  let updateMap;

  function show(index) {
    current = index;
    const {date,title,place,note,person,figure,source:sourceName,url,event} = steps[index];
    const monarch = people.get(person);
    card.innerHTML = `<p class="map-episode-date">${datePrefix}${date} · ${place}</p>
      <h2>${title}</h2><p class="map-event-note">${note}</p>
      <figure class="norman-object">${portrait(monarch,true)}
        <figcaption><a href="${guideLink(monarch,true)}">${monarch.cn} ↗</a>${source(monarch)}
        ${story.familyLinks ? `<a href="${relationHref(monarch.id,figure)}">查看君主家谱 ↗</a>` : ''}</figcaption>
      </figure>
      <div class="map-event-links">${sourceNote(sourceName,url)}
      ${event ? `<a href="${guideLink(guideEntries.get(event),true)}">查看时间线资料 ↗</a>` : ''}</div>`;
    prev.disabled = index === 0;
    next.disabled = index === stops.length - 1;
    stops.forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    const button = stops[index];
    const rail = button.closest('.norman-stops');
    const bounds = rail.getBoundingClientRect();
    const active = button.getBoundingClientRect();
    if (active.left < bounds.left || active.right > bounds.right) {
      rail.scrollLeft += active.left - bounds.left;
    }
    updateMap?.(index);
  }

  function stop() {
    clearInterval(timer);
    timer = undefined;
    play.textContent = '播放';
  }

  function choose(index) {
    stop();
    show(index);
  }

  stops.forEach((button, index) => button.addEventListener('click', () => choose(index), {signal}));
  prev.addEventListener('click', () => choose(current - 1), {signal});
  next.addEventListener('click', () => choose(current + 1), {signal});
  play.addEventListener('click', () => {
    if (timer) return stop();
    if (current === stops.length - 1) show(0);
    play.textContent = '暂停';
    timer = setInterval(() => {
      show(current + 1);
      if (current === stops.length - 1) stop();
    }, 2800);
  }, {signal});
  signal.addEventListener('abort', stop, {once:true});
  show(0);

  Promise.all([loadLeaflet(), fetchMapGeometry('assets/britain-base.geojson',signal)]).then(([L,land]) => {
    if (signal.aborted) return;
    const map = L.map(canvas, {scrollWheelZoom:false, attributionControl:false, zoomSnap:.5, minZoom:4, maxZoom:10});
    map.fitBounds(bounds, {padding:[28,24],animate:false});
    L.geoJSON(land, {interactive:false, style:{stroke:false, fillColor:'#4c5f4d',fillOpacity:1}}).addTo(map);
    L.control.scale({imperial:false,position:'bottomright'}).addTo(map);
    const lines = routes.map(({points}) => L.polyline(points, {
      color:'#f0c47f', weight:2.6, dashArray:'7 6', interactive:false
    }));
    const waypoints = routes.map(({points,waypoint}) => waypoint ?
      L.circleMarker(points.at(-1),{radius:4,color:'#f0c47f',weight:2,fillOpacity:1,fillColor:'#242b29'})
        .bindTooltip(waypoint,{direction:'top',offset:[0,-5],className:'map-episode-place'}) : null);
    const locations = new Map();
    steps.forEach(({coords},index) => {
      const key = coords.join(',');
      if (!locations.has(key)) locations.set(key,[]);
      locations.get(key).push(index);
    });
    const markers = [...locations.values()].map(indices => {
      const {coords} = steps[indices[0]];
      const marker = L.marker(coords, {autoPanOnFocus:false, icon:L.divIcon({className:'norman-pin'})}).addTo(map);
      marker.on('click', () => choose(Number(marker.getElement().dataset.step)));
      return {marker,indices};
    });

    updateMap = index => {
      lines.forEach((line,i) => {
        const {from,points,next} = routes[i];
        if (index < from) {
          line.remove();
          waypoints[i]?.remove();
        } else {
          line.setLatLngs(next && index > from ? [...points,next] : points).addTo(map);
          waypoints[i]?.addTo(map);
        }
      });
      markers.forEach(({marker,indices}) => {
        // Shared sites use the current stage, or the nearest stage at that site.
        const stepIndex = indices.reduce((best,step) => Math.abs(step-index) < Math.abs(best-index) ? step : best);
        const active = stepIndex === index;
        const previous = stepIndex < index;
        const shift = markerShifts[stepIndex] || 0;
        marker.setIcon(L.divIcon({
          className:`norman-pin${active ? ' is-active' : previous ? ' is-past' : ''}`,
          html:`<span aria-hidden="true">${stepIndex + 1}</span>`,
          iconSize:[30,30], iconAnchor:[15 + shift,15]
        }));
        const pin = marker.getElement();
        const {title,place} = steps[stepIndex];
        pin.dataset.step = stepIndex;
        pin.setAttribute('aria-label', `${title} · ${place}`);
        pin.title = `${title} · ${place}`;
        marker.unbindTooltip();
        if (active) {
          pin.setAttribute('aria-current','step');
          marker.bindTooltip(place, {permanent:true, direction:shift > 0 ? 'bottom' : 'top', offset:[-shift,shift > 0 ? 18 : -18], className:'map-episode-place'});
        } else {
          pin.removeAttribute('aria-current');
        }
      });
    };

    const resize = new ResizeObserver(() => map.invalidateSize({pan:false}));
    resize.observe(canvas);
    signal.addEventListener('abort', () => {
      resize.disconnect();
      map.remove();
    }, {once:true});
    status.hidden = true;
    canvas.dataset.ready = 'true';
    updateMap(current);
  }).catch(error => {
    if (signal.aborted) return;
    status.textContent = '地图暂时无法加载，仍可阅读下方的各阶段。';
    console.error(error);
  });
}
