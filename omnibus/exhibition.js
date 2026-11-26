const guideEvents = [...earlyEvents, ...events, ...extraGuideEvents];
const guideEntries = new Map([...monarchs, ...guideEvents].map(entry => [entry.id, entry]));
const guideLink = (entry, detail = false) => `#/exhibit/${entry.event && !detail ? 'event/' : ''}${entry.id}${detail ? '/detail' : ''}`;

function detailLink(entry, text) {
  return `<a class="guide-expand" data-open-detail="${entry.id}" href="${guideLink(entry, true)}" aria-label="展开${entry.cn.replace(/[《》]/g, '')}资料">${text} <span aria-hidden="true">↗</span></a>`;
}

function guidePerson(person, houseName) {
  const [life, deeds] = biographies[person.id];
  return `<article class="guide-person" id="guide-${person.id}" aria-labelledby="guide-title-${person.id}" tabindex="-1">
    <figure class="guide-portrait">
      <div class="guide-image">${portrait(person)}</div>
      <figcaption>${source(person) || '<span>暂无可用历史图像</span>'}</figcaption>
    </figure>
    <div class="guide-copy">
      <div class="guide-date">${person.reign} <span>${houseName}</span></div>
      <h3 id="guide-title-${person.id}">${person.cn}</h3><p class="guide-english">${person.en}</p>
      ${person.tag ? `<span class="status">${person.tag}</span>` : ''}
      <dl><div><dt>生平</dt><dd>${life}</dd></div><div><dt>主要事迹</dt><dd>${deeds}</dd></div></dl>
      ${detailLink(person, '展开人物资料')} <a class="guide-expand" href="${relationHref(person.id)}">人物关系 <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;
}

function guideEvent(event) {
  const kind = eventTypeById.get(event.id);
  return `<article class="guide-event" id="guide-${event.id}" tabindex="-1">
    <div class="guide-date">${event.reign}</div>
    <div><h3>${event.cn} ${kind ? `<small>${kind.label}</small>` : ''}</h3><p>${event.note}</p></div>
    ${detailLink(event, '展开资料')}
  </article>`;
}

function guideDetail(entry) {
  const house = houses[entry.house][1];
  const reference = entry.event ? entry.source : specialBiographySources[entry.id] || houseSources[entry.house] || royalIndex;
  const references = referencesFor(entry,reference);
  const richard = entry.id === 'richard-iii';
  const linked = entry.event ? (entry.people || []).map(id=>people.get(id)).filter(Boolean) : guideEvents.filter(event=>event.people?.includes(entry.id));
  const linkedFigures = entry.event ? historicalFigures.filter(person => person.event === entry.id) : [];
  const title = entry.cn.replace(/[《》]/g,'');
  const effects = {
    'magna-carta':'《大宪章》表明君主也应受法律约束。约翰死后，摄政政府重新颁布了修订版本。',
    'bosworth':'约克一支失去英格兰王位。亨利七世建立都铎王朝，次年与约克的伊丽莎白结婚。'
  };
  const richardMilestones = [['1452','出身约克家族','出生于福瑟林盖城堡，是爱德华四世的弟弟。'],
    ['1483','取代侄子即位','先任爱德华五世的护国公，随后取得王位。'],
    ['1485','战死于博斯沃思','8 月 22 日败于亨利·都铎，约克王朝结束。']];
  const sections = entry.event
    ? `<section><h3>发生了什么</h3><p>${glossaryLinks(entry.note,entry.id)}${referenceMark(references)}</p></section>${effects[entry.id] ? `<section><h3>后续影响</h3><p>${glossaryLinks(effects[entry.id],entry.id)}${referenceMark(references,references.length)}</p></section>` : ''}`
    : richard
      ? `<ol class="sheet-life">${richardMilestones.map(([year,heading,text],index)=>`<li><span>${year}</span><div><h3>${heading}</h3><p>${text}${referenceMark(references,index===0?2:1)}</p></div></li>`).join('')}</ol>`
    : biographies[entry.id].map((text,index)=>`<section><h3>${index ? '主要事迹' : '生平'}</h3><p>${glossaryLinks(text,entry.id)}${referenceMark(references)}</p></section>`).join('');
  return `<header class="sheet-heading">
    <div><p class="guide-date">${(entry.event && exactEventDates[entry.id]) || entry.reign} · ${house}</p><h2 id="sheet-title">${title}</h2>
    ${entry.en ? `<p class="guide-english">${entry.en}</p>` : ''}${entry.tag ? `<span class="status">${entry.tag}</span>` : ''}</div>
    ${entry.event ? '' : `<figure>${portrait(entry,true)}</figure>`}
  </header>
  <div class="sheet-sections">${sections}
    ${linked.length ? `<section><h3>${entry.event ? '相关君王' : '相关大事'}</h3><div class="sheet-links">${linked.map(item=>`<a href="${guideLink(item)}">${item.cn} ↗</a>`).join('')}</div></section>` : ''}
    ${linkedFigures.length ? `<section><h3>同一事件的人物</h3><div class="sheet-links">${linkedFigures.map(person => `<a href="${relationHref(person.id)}">${person.cn} ↗</a>`).join('')}</div></section>` : ''}
    ${entry.event ? '' : portraitRecord(entry)}
    <section class="sheet-references"><h3>参考文献</h3><ol>${references.map(([name,url],index)=>`<li id="sheet-reference-${index+1}" tabindex="-1">${sourceNote(name,url)}</li>`).join('')}</ol></section>
  </div>
  <div class="sheet-actions">${hasHistoricalLocation(entry.id) ? `<a class="button secondary" href="#/map/${entry.id}">在地图查看 ↗</a>` : ''}${entry.id === 'conquest' || entry.id === 'stamford-bridge' ? '<a class="button secondary" href="#/map/norman-1066">查看 1066 专题 ↗</a>' : ''}${entry.event ? '' : `<a class="button secondary" href="${relationHref(entry.id)}">人物关系 ↗</a>`}${['roses','henry-vi-return','bosworth'].includes(entry.id) ? '<a class="button secondary" href="#/map/wars-of-the-roses">查看玫瑰战争专题 ↗</a>' : ''}<button class="button secondary" type="button" data-copy-detail>复制链接</button></div>
  ${richard ? `<details class="sheet-reconstruction"><summary>理查三世的艺术重建</summary><figure class="bust">
    <div class="bust-stage" aria-label="理查三世可旋转 3D 艺术半身像"><img class="bust-fallback" src="assets/richard-reconstruction.png" alt="理查三世二维艺术重建"></div>
    <div class="bust-controls" hidden><button type="button" data-turn="-1" aria-label="向左旋转半身像">←</button><span>拖动旋转</span><button type="button" data-turn="1" aria-label="向右旋转半身像">→</button></div>
    <figcaption>参考后世画像的艺术诠释，五官与服饰含推测。${sourceNote('莱斯特大学面貌复原研究','https://le.ac.uk/richard-iii/identification/what-we-know-now/face-of-a-king')}</figcaption>
  </figure></details>` : ''}`;
}

function landing() {
  return `<div class="cover-guide">
  <header class="landing-masthead">万象志</header>
  <section class="cover" aria-labelledby="cover-title">
    <div class="cover-copy">
      <img src="assets/crown.svg" alt="" width="48" height="48">
      <h1 id="cover-title" tabindex="-1">王冠纪年</h1>
      <p>英国君王图谱 <span aria-hidden="true">·</span> 公元 43 年至今</p>
      <a class="cover-entry" href="#/exhibit" aria-label="开始阅读王冠纪年">开始阅读 <span aria-hidden="true">→</span></a>
    </div>
    <figure class="cover-art">
      <img src="assets/westminster-photochrom.webp" alt="约 1890 年的伦敦威斯敏斯特宫与街景" fetchpriority="high">
      <figcaption>${sourceNote('威斯敏斯特宫 · 约 1890 年 · 美国国会图书馆','https://commons.wikimedia.org/wiki/File:Houses_of_Parliament,_London,_England_LCCN92518894.jpg')}</figcaption>
    </figure>
  </section>
  <section class="cover cover-macondo" aria-labelledby="cover-macondo-title">
    <div class="cover-copy">
      <p class="cover-original" lang="es">Cien años de soledad</p>
      <h2 id="cover-macondo-title" tabindex="-1">百年孤独</h2>
      <p>从马孔多的建立，读到布恩迪亚家族第七代。</p>
      <a class="cover-entry" href="#/macondo" aria-label="开始阅读百年孤独">开始阅读 <span aria-hidden="true">→</span></a>
    </div>
    <figure class="cover-art">
      <img src="assets/aracataca-station.jpg" alt="哥伦比亚阿拉卡塔卡火车站" loading="lazy">
      <figcaption>${sourceNote('阿拉卡塔卡火车站 · Daniel Mendez Moran · CC BY-SA 4.0 · 缩放','https://commons.wikimedia.org/wiki/File:Aracataca_train_station.jpg','https://creativecommons.org/licenses/by-sa/4.0/')}</figcaption>
    </figure>
  </section>
  </div>`;
}

function mountLanding(guide, signal) {
  const covers = [...guide.querySelectorAll('.cover')];
  covers.forEach((cover,index) => {
    cover.style.setProperty('--cover-palette',carouselPalettes[index % carouselPalettes.length]);
  });
  const titles = covers.map(cover => document.getElementById(cover.getAttribute('aria-labelledby')));
  if (titles.length < 2) return;
  const compact = matchMedia('(max-width: 700px)');
  const nav = document.createElement('nav');
  nav.className = 'cover-nav';
  nav.setAttribute('aria-label','首页专题目录');
  nav.innerHTML = '<details><summary>专题目录</summary><ol></ol></details>';
  const menu = nav.querySelector('details');
  const list = menu.querySelector('ol');
  const summary = menu.querySelector('summary');
  const buttons = titles.map((title,index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.coverTarget = title.id;
    const name = document.createElement('span');
    name.className = 'cover-nav-title';
    name.textContent = title.textContent;
    const dot = document.createElement('span');
    dot.className = 'cover-nav-dot';
    dot.setAttribute('aria-hidden','true');
    button.append(name,dot);
    item.append(button);
    list.append(item);

    const next = index+1 < titles.length;
    const adjacent = titles[next ? index+1 : index-1];
    const step = document.createElement('button');
    step.type = 'button';
    step.className = 'cover-switch';
    step.dataset.coverTarget = adjacent.id;
    step.textContent = (next ? '下一专题 · ' : '上一专题 · ') + adjacent.textContent;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden','true');
    arrow.textContent = next ? '↓' : '↑';
    step.append(arrow);
    covers[index].querySelector('.cover-copy').append(step);
    return button;
  });
  guide.prepend(nav);

  let current = -1;
  let focusIndex = -1;
  let pointerY;
  let frame = 0;
  function layoutTopicArc() {
    if (compact.matches) return;
    const middle = list.scrollTop + list.clientHeight/2;
    const halfSpan = Math.PI*.55/2;
    const radius = 50*2.2;
    // With two topics, use the upper shoulder and the middle of the arc.
    const center = middle + (buttons.length === 2 ? 20 : 0);
    const height = Math.max(40,list.clientHeight/2-25);
    for (const button of buttons) {
      const y = (button.offsetTop+button.offsetHeight/2-center)/height;
      const angle = Math.asin(Math.max(-1,Math.min(1,y))*Math.sin(halfSpan));
      const inset = radius * (Math.cos(angle)-Math.cos(halfSpan));
      button.style.setProperty('--arc-inset',`${inset}px`);
    }
  }
  function emphasizeTopics() {
    if (compact.matches) return;
    const focus = focusIndex < 0 ? current : focusIndex;
    const mouseY = pointerY === undefined ? undefined : pointerY-list.getBoundingClientRect().top+list.scrollTop;
    const distances = buttons.map((button,i) => mouseY === undefined
      ? Math.abs(focus-i)
      : Math.abs(mouseY-button.offsetTop-button.offsetHeight/2)/button.offsetHeight);
    const closest = Math.min(...distances);
    const closestIndex = distances.indexOf(closest);
    buttons.forEach((button,i) => {
      const distance = distances[i]-closest;
      button.style.setProperty('--topic-scale',Math.max(.63,1.13-distance*.14));
      button.style.setProperty('--topic-opacity',Math.max(.5,1-distance*.15));
      button.classList.toggle('cover-nav-emphasis',i === closestIndex);
    });
  }
  function updateTopicArc() {
    layoutTopicArc();
    emphasizeTopics();
  }
  const syncMenu = () => {
    menu.open = !compact.matches;
    updateTopicArc();
  };
  syncMenu();
  compact.addEventListener('change',syncMenu,{signal});
  function revealCurrentInMenu() {
    if (current < 0 || !menu.open) return;
    const item = buttons[current].getBoundingClientRect();
    const bounds = list.getBoundingClientRect();
    if (item.top < bounds.top) list.scrollTop += item.top-bounds.top;
    if (item.bottom > bounds.bottom) list.scrollTop += item.bottom-bounds.bottom;
  }
  function markCurrentCover() {
    frame = 0;
    const midpoint = innerHeight/2;
    const index = covers.findIndex(cover => cover.getBoundingClientRect().bottom > midpoint);
    if (index < 0 || index === current) return;
    buttons[current]?.removeAttribute('aria-current');
    buttons[index].setAttribute('aria-current','location');
    current = index;
    emphasizeTopics();
    revealCurrentInMenu();
  }
  const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(markCurrentCover); };
  window.addEventListener('scroll',scheduleUpdate,{passive:true,signal});
  window.addEventListener('resize',() => {
    updateTopicArc();
    scheduleUpdate();
  },{signal});
  menu.addEventListener('toggle',revealCurrentInMenu,{signal});
  list.addEventListener('pointermove',event => {
    if (event.pointerType === 'touch') return;
    pointerY = event.clientY;
    emphasizeTopics();
  },{signal});
  list.addEventListener('scroll',updateTopicArc,{passive:true,signal});
  list.addEventListener('pointerleave',() => {
    pointerY = undefined;
    emphasizeTopics();
  },{signal});
  list.addEventListener('focusin',event => {
    focusIndex = buttons.indexOf(event.target);
    pointerY = undefined;
    emphasizeTopics();
  },{signal});
  list.addEventListener('focusout',event => {
    if (list.contains(event.relatedTarget)) return;
    focusIndex = -1;
    emphasizeTopics();
  },{signal});
  signal.addEventListener('abort',() => cancelAnimationFrame(frame),{once:true});
  markCurrentCover();

  guide.addEventListener('click',event => {
    const button = event.target.closest('[data-cover-target]');
    if (!button) return;
    const title = document.getElementById(button.dataset.coverTarget);
    title.focus({preventScroll:true});
    if (compact.matches) menu.open = false;
    title.closest('.cover').scrollIntoView({
      behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  },{signal});
  nav.addEventListener('keydown',event => {
    if (event.key === 'Escape' && compact.matches && menu.open) {
      menu.open = false;
      summary.focus();
    }
  },{signal});
}

function exhibition() {
  return `<section class="exhibition" aria-labelledby="guide-main-title">
    <div class="guide-layout">
      <aside class="guide-rail">
        <nav class="guide-nav" aria-label="按时期和王朝跳转">
          <p class="guide-rail-title">时期与王朝</p>
          <div>${houses.map(([id,name,,dates])=>`<button type="button" data-house-jump="${id}">${dynastyBadge(id)}<span>${name}<small>${dates}</small></span></button>`).join('')}</div>
        </nav>
      </aside>
      <div class="guide-line">
      <h1 id="guide-main-title" class="guide-title">君王与大事</h1>
      <div class="guide-tools">
        <div role="group" aria-label="时间线筛选"><button type="button" data-filter="all" aria-pressed="true">全部</button><button type="button" data-filter="events" aria-pressed="false">只看大事</button></div>
        <div role="group" aria-label="时间线密度"><button type="button" data-density="standard" aria-pressed="true">阅读模式</button><button type="button" data-density="compact" aria-pressed="false">年代概览</button></div>
        <p>${houses.length} 个时期与王朝 · ${monarchs.length} 位人物 · ${guideEvents.length} 件大事</p>
      </div>
      <details class="guide-research"><summary>高级筛选</summary>
        <form class="guide-filter-form">
          <label>开始年份 <input name="from" aria-label="开始年份" type="number" min="1" max="9999" placeholder="例如 878"></label>
          <label>结束年份 <input name="to" aria-label="结束年份" type="number" min="1" max="9999" placeholder="例如 1603"></label>
          <label>王朝 <select name="house" aria-label="筛选时间线王朝"><option value="">全部王朝</option>${houses.map((house,index)=>`<option value="${index}">${house[1]}</option>`).join('')}</select></label>
          <label>事件类型 <select name="eventType" aria-label="事件类型"><option value="">全部类型</option>${eventTypes.map(([id,name])=>`<option value="${id}">${name}</option>`).join('')}</select></label>
          <button type="button" data-reset-filters>清除筛选</button>
        </form>
      </details>
      <p class="guide-filter-result" role="status" hidden></p>
      ${houses.map(([id,name,,dates],index)=>{
        const entries = [
          ...monarchs.filter(person=>person.house===index),
          ...guideEvents.filter(event=>event.house===index)
        ].sort((a,b)=>a.year-b.year || Number(Boolean(b.event))-Number(Boolean(a.event)));
        return `<section class="guide-house" id="guide-house-${id}" aria-labelledby="guide-title-${id}" tabindex="-1">
          <header class="guide-house-head"><span>${dates}</span><h2 id="guide-title-${id}">${name}</h2></header>
          ${dynastyIntroduction(index)}
          <div class="guide-entries">${entries.map(entry=>entry.event?guideEvent(entry):guidePerson(entry,name)).join('')}</div>
        </section>`;
      }).join('')}
      </div>
    </div>
  </section>`;
}

function mountExhibition(section, signal) {
  const nav = section.querySelector('.guide-nav');
  const buttons = [...nav.querySelectorAll('[data-house-jump]')];
  const chapters = buttons.map(button=>document.getElementById('guide-house-'+button.dataset.houseJump));
  const list = nav.querySelector('div');
  const mobileRail = matchMedia('(max-width: 900px)');
  const top = document.querySelector('.top');
  const filters = section.querySelectorAll('[data-filter]');
  const densityButtons = section.querySelectorAll('[data-density]');
  const form = section.querySelector('.guide-filter-form');
  const result = section.querySelector('.guide-filter-result');
  const rows = [...guideEntries.values()].map(entry => {
    const start = Math.floor(entry.year);
    const dates = [...entry.reign.matchAll(/\d{1,4}/g)].map(match => Number(match[0]));
    const end = entry.reign.endsWith('至今') ? new Date().getFullYear() : Math.max(start,...dates);
    return {entry,start,end,node:document.getElementById('guide-'+entry.id)};
  });
  let mode = 'all';
  let active = -1;
  let frame = 0;

  function update() {
    frame = 0;
    const boundary = (mobileRail.matches ? nav.getBoundingClientRect().bottom : top.offsetHeight) + 52;
    let index = chapters.findLastIndex(chapter=>!chapter.hidden && chapter.getBoundingClientRect().top<=boundary);
    if (index < 0) index = chapters.findIndex(chapter=>!chapter.hidden);
    if (active===index) return;
    if (active>=0) buttons[active].removeAttribute('aria-current');
    active=index;
    if (index < 0) return;
    const button=buttons[index];
    button.setAttribute('aria-current','location');
    if (mobileRail.matches && (button.offsetLeft<list.scrollLeft ||
        button.offsetLeft+button.offsetWidth>list.scrollLeft+list.clientWidth)) {
      list.scrollLeft=button.offsetLeft;
    }
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  function filter() {
    const {from, to, house, eventType} = form.elements;
    const start = from.valueAsNumber || 0;
    const end = to.valueAsNumber || Infinity;
    const selectedCount = Array(houses.length).fill(0);
    const kind = eventType.value;
    const effectiveMode = kind ? 'events' : mode;
    for (const row of rows) {
      const {entry,node} = row;
      node.hidden = start > end || row.end < start || row.start > end ||
        (house.value !== '' && Number(house.value) !== entry.house) ||
        (effectiveMode === 'events' && !entry.event) || (kind && eventTypeById.get(entry.id)?.type !== kind);
      if (!node.hidden) selectedCount[entry.house]++;
    }
    chapters.forEach((chapter,index)=>chapter.hidden = selectedCount[index]===0);
    const count = selectedCount.reduce((sum, amount)=>sum+amount,0);
    result.hidden = start===0 && end===Infinity && house.value==='' && !kind && effectiveMode==='all';
    result.textContent = start > end ? '开始年份需早于或等于结束年份。' : count ? `符合条件的条目：${count}` : '没有符合条件的条目。';
    for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.filter === effectiveMode));
    schedule();
  }
  function resetFilters() {
    mode = 'all';
    form.reset();
    filter();
  }
  function locate(target, reveal = true) {
    if (!target) return;
    if (target.hidden || target.closest('.guide-house')?.hidden) {
      resetFilters();
    }
    section.querySelector('.is-target')?.classList.remove('is-target');
    if (reveal) target.classList.add('is-target');
    target.scrollIntoView({block:'start'});
    schedule();
  }
  filters.forEach(button=>button.addEventListener('click', ()=>{
    if (button.getAttribute('aria-pressed') === 'true') return;
    const chapter=chapters[active] || chapters[0];
    const wasInGuide=chapter.getBoundingClientRect().top<=top.offsetHeight+64;
    mode = button.dataset.filter;
    if (mode === 'all') form.elements.eventType.value='';
    filter();
    if (wasInGuide && !chapter.hidden) locate(chapter,false);
  },{signal}));
  form.addEventListener('input',filter,{signal});
  form.querySelector('[data-reset-filters]').addEventListener('click',resetFilters,{signal});
  form.addEventListener('submit',event=>event.preventDefault(),{signal});
  densityButtons.forEach(button=>button.addEventListener('click',()=>{
    const compact=button.dataset.density==='compact';
    section.classList.toggle('guide-compact',compact);
    for (const control of densityButtons) control.setAttribute('aria-pressed',String(control===button));
    schedule();
  },{signal}));
  buttons.forEach((button,index)=>button.addEventListener('click',()=>locate(chapters[index],false),{signal}));
  window.addEventListener('scroll',schedule,{passive:true,signal});
  window.addEventListener('resize',schedule,{signal});
  signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
  schedule();
  return {locate};
}
