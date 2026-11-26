const main = document.querySelector('main');
const royalHeader = document.querySelector('.royal-top');
const royalSections = [...royalHeader.querySelectorAll('.royal-sections a')];

function measureRoyalHeader() {
  if (royalHeader.offsetHeight) main.style.setProperty('--royal-header-height',royalHeader.offsetHeight + 'px');
}
const search = document.querySelector('#search');
const results = document.querySelector('#results');
const people = new Map(monarchs.map(person => [person.id, person]));
const credits = window.portraitCredits || {};
const exhibits = monarchs.filter(person => credits[person.id]);

const nameGroups = [
  ['Henry','亨利'],['Edward','爱德华'],['William','威廉'],
  ['Richard','理查'],['James','詹姆斯'],['Charles','查理／查尔斯'],
  ['Mary','玛丽'],['Elizabeth','伊丽莎白'],['George','乔治']
].map(([english, chinese]) => ({
  id: english.toLowerCase(),
  name: chinese,
  members: monarchs.filter(person => person.en.startsWith(english + ' '))
}));

const historicalTypes = {
  'henry-i':'后世描绘','henry-ii':'后世描绘','henry-iii':'后世描绘',
  'henry-iv':'后世描绘','henry-v':'后世描绘','henry-vi':'后世描绘',
  'richard-iii':'后世描绘','william-i':'近同时代刺绣','henry-vii':'同时代肖像',
  'henry-viii':'同时代肖像','elizabeth-i':'同时代肖像','mary-i':'同时代肖像',
  'edward-i':'传统归属','edward-v':'后世描绘','jane-grey':'后世描绘 · 传统归属',
  'athelstan':'银币图版','edward-confessor':'近同时代刺绣','harold-ii':'近同时代刺绣',
  'edward-vii':'加冕肖像','elizabeth-ii':'档案照片','charles-iii':'档案照片'
};

const routeTo = entry => guideLink(entry, true);
const label = person => siteLanguage === 'en' && person.en ? person.en : person.cn + (person.en ? ' · ' + person.en : '');

function sourceNote(label, url, licenseUrl) {
  return `<details class="source-note"><summary>${label}</summary><p>${url}</p>${licenseUrl ? `<p>许可 · ${licenseUrl}</p>` : ''}</details>`;
}

function source(person) {
  const credit = credits[person.id];
  if (!credit) return '';
  return sourceNote(`${historicalTypes[person.id] || '历史图像'} · ${credit.license}`,credit.url,credit.licenseUrl);
}

function portrait(person, eager = false) {
  if (!credits[person.id]) return `<div class="empty"><span>${person.en}</span><small>暂无肖像</small></div>`;
  return `<img src="assets/${person.id}.webp" alt="${person.cn}历史图像" ${eager ? '' : 'loading="lazy"'}>`;
}

function monarchCard(person, compare = false, href = routeTo(person)) {
  const deeds = compare ? siteText(biographies[person.id][1]) : '';
  const excerpt = siteLanguage === 'en' ? deeds.match(/^.*?[.!?](?=\s|$)/)?.[0] || deeds : deeds.split('。')[0] + '。';
  return `<article class="card">
    <a class="card-link" href="${href}">
      <div class="portrait">${portrait(person)}</div>
      <div class="card-copy"><div class="reign">${person.reign}</div><h3>${person.cn}</h3><div class="en">${person.en}</div>
      ${person.tag ? `<span class="status">${person.tag}</span>` : ''}
      ${compare ? `<p>${houses[person.house][1]}<br>${person.note || excerpt}</p>` : ''}</div>
    </a>${source(person)}
  </article>`;
}

function compareMonarchs(group) {
  if (!group) return `<section class="shell interior"><h1>同名君王</h1><p>从导航的「同名君王」选择要对照的名字。</p></section>`;
  const houseIds = [...new Set(group.members.map(person => person.house))];
  return `<section class="shell interior"><div class="interior-head"><div><h1>历代${group.name}</h1><p>对照 ${group.members.length} 位同名君王的在位时期及王朝。<a class="pair-entry" href="#/compare/pair">双人对照 ↗</a></p></div>
    <label class="filter">王朝 <select id="compare-filter" aria-label="筛选对照王朝"><option value="">全部王朝</option>${houseIds.map(index => `<option value="${index}">${houses[index][1]}</option>`).join('')}</select></label></div>
    <div class="comparison" id="comparison">${group.members.map(person => `<div data-dynasty="${person.house}">${monarchCard(person, true)}</div>`).join('')}</div></section>`;
}

function pairCards(left,right) {
  if (left === right) return '<p class="pair-message" role="status">请选择两位不同的君王。</p>';
  return `<div class="pair-grid">${[left,right].map(person=>`<article class="pair-card">
    <div class="pair-heading"><figure>${portrait(person,true)}</figure><div class="pair-identity">
      <p class="guide-date">${person.reign}</p><h2>${person.cn}</h2><p class="guide-english">${person.en}</p>
      <p>${houses[person.house][1]}</p></div></div>
    <dl><dt>生平</dt><dd>${biographies[person.id][0]}</dd><dt>主要事迹</dt><dd>${biographies[person.id][1]}</dd></dl>
    <a class="guide-source" href="${guideLink(person)}">查看时间线 ↗</a>
  </article>`).join('')}</div>`;
}

function pairComparison(leftId,rightId) {
  const left = people.get(leftId) || people.get('henry-viii');
  const right = people.get(rightId) || people.get('elizabeth-i');
  const choices = (name,selected) => `<label>${name}<select aria-label="${name}">${monarchs.map(person=>`<option value="${person.id}" ${person===selected?'selected':''}>${person.cn} · ${person.reign}</option>`).join('')}</select></label>`;
  return `<section class="shell interior"><div class="interior-head"><div><h1>双人对照</h1><p>任选两位君王，并排查看在位时期、生平和主要事迹。</p></div></div>
    <div class="pair-controls" data-pair>${choices('左侧君王',left)}${choices('右侧君王',right)}</div>
    <div class="pair-result">${pairCards(left,right)}</div>
  </section>`;
}

function gallery(id) {
  const selected = exhibits.find(person => person.id === id);
  const exhibitHouses = [...new Set(exhibits.map(person => person.house))];
  return `<section class="shell interior portrait-index">
    <div class="interior-head"><div><h1>肖像索引</h1><p>按时期或王朝查找历史图像，点开即可回到这位君王的时间线。</p></div>
    <label class="filter">王朝 <select id="portrait-filter" aria-label="筛选肖像王朝"><option value="">全部时期与王朝</option>${exhibitHouses.map(index => `<option value="${index}">${houses[index][1]}</option>`).join('')}</select></label></div>
    <div class="comparison">${exhibits.map(person => `<div data-dynasty="${person.house}" id="portrait-${person.id}" ${person === selected ? 'class="is-target"' : ''}>${monarchCard(person, false, guideLink(person))}</div>`).join('')}</div>
  </section>`;
}

function walk(id) {
  const exhibit = exhibits.find(person => person.id === id);
  const back = exhibit ? guideLink(exhibit) : '#/exhibit';
  main.innerHTML = `<section class="museum" aria-label="3D 君王展厅">
    <div class="museum-header">
      <button class="museum-exit" type="button" hidden>收起全景 <span aria-hidden="true">↙</span></button>
      <label class="museum-index">前往展品 <select aria-label="前往展品">
        <option value="">选择君王</option>${exhibits.map(person => `<option value="${person.id}">${person.cn}</option>`).join('')}
      </select></label>
    </div>
    <div class="museum-spread">
      <div class="museum-intro">
        <p class="museum-edition">历代英格兰与英国君王 <span aria-hidden="true"></span> ${exhibits.length} 件肖像展品</p>
        <div class="museum-intro-copy">
          <h1>王冠<em>展厅</em></h1>
          <p class="museum-summary">沿着展墙看见历代君王。走近一幅肖像，点开它背后的人物与往事。</p>
          <button class="museum-expand" type="button" aria-controls="museum-viewport"><span aria-hidden="true">↗</span> 展开参观</button>
        </div>
        <p class="museum-reading">拖动转向 <span>／</span> 点击地面前往</p>
      </div>
      <div class="museum-exhibition">
        <div class="museum-stage-label"><span>3D 肖像展墙</span><span class="museum-stage-date">${exhibit ? exhibit.cn + ' · ' + exhibit.reign : '展厅入口'}</span></div>
        <div class="museum-viewport" id="museum-viewport">
          <div class="museum-scene" tabindex="0" aria-label="可走动的 3D 展厅，使用 W A S D 或方向键，拖动转向，靠近肖像后点击查看详情"></div>
          <div class="museum-loading" role="status"><span class="museum-compass" aria-hidden="true"></span><span>正在开启展厅…</span></div>
          <div class="museum-guide" hidden>
            <p class="museum-desktop">W A S D 或方向键移动 · 拖动转向 · 点击地面前往</p>
            <p class="museum-touch">拖动转向 · 点地面前往 · 点肖像靠近</p>
          </div>
          <div class="museum-plaque" hidden aria-live="polite"></div>
          <div class="museum-controls" hidden aria-label="移动控制">
            <button type="button" data-move="left" aria-label="向左转">↶</button>
            <button type="button" data-move="forward" aria-label="前进">↑</button>
            <button type="button" data-move="back" aria-label="后退">↓</button>
            <button type="button" data-move="right" aria-label="向右转">↷</button>
          </div>
          <button class="museum-reset" type="button" hidden>返回入口</button>
        </div>
      </div>
    </div>
  </section>`;
  const section = main.firstElementChild;
  const controller = new AbortController();
  const loading = section.querySelector('.museum-loading');
  const intro = section.querySelector('.museum-intro');
  const expand = section.querySelector('.museum-expand');
  const exit = section.querySelector('.museum-exit');
  const scene = section.querySelector('.museum-scene');
  function setExpanded(expanded) {
    section.classList.toggle('museum-expanded', expanded);
    intro.hidden = expanded;
    exit.hidden = !expanded;
    if (expanded) {
      scene.focus({preventScroll:true});
      section.scrollIntoView({block:'start'});
    } else {
      expand.focus({preventScroll:true});
    }
  }
  const {signal} = controller;
  expand.addEventListener('click', () => setExpanded(true), {signal});
  exit.addEventListener('click', () => setExpanded(false), {signal});
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !exit.hidden && event.target.tagName !== 'SELECT') setExpanded(false);
  }, {signal});
  const showFallback = () => {
    loading.hidden = false;
    loading.replaceChildren('此浏览器暂时无法开启 3D 展厅。', document.createElement('a'));
    loading.lastChild.href = back;
    loading.lastChild.textContent = '返回时间线';
    section.querySelector('.museum-index').hidden = true;
    if (!exit.hidden) setExpanded(false);
    expand.hidden = true;
    section.querySelectorAll('.museum-guide, .museum-controls, .museum-plaque, .museum-reset').forEach(item => item.hidden = true);
  };
  import('./museum.js').then(({mountMuseum}) => {
    if (controller.signal.aborted) return;
    mountMuseum(section, exhibits, exhibit?.id, controller.signal, person => {
      history.replaceState(null, '', '#/walk/' + person.id);
      location.hash = routeTo(person);
    }, showFallback);
  }).catch(() => {
    if (!controller.signal.aborted) showFallback();
  });
  return () => controller.abort();
}

const compareNav = document.querySelector('.compare-nav');
const compareTrigger = compareNav.querySelector('button');
const compareMenu = compareNav.querySelector('ul');
compareMenu.innerHTML = nameGroups.map(group => `<li><a href="#/compare/${group.id}">${group.name}</a></li>`).join('')+
  '<li class="menu-pair"><a href="#/compare/pair">双人对照 ↗</a></li>';
let comparePinned = false;

function showCompareMenu(open) {
  compareMenu.hidden = !open;
  compareTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (!open) comparePinned = false;
}

compareNav.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') showCompareMenu(true);
});
compareNav.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !comparePinned && !compareMenu.contains(document.activeElement)) showCompareMenu(false);
});
compareTrigger.addEventListener('click', () => {
  comparePinned = !comparePinned;
  showCompareMenu(comparePinned);
});
compareNav.addEventListener('focusout', event => {
  if (!compareNav.contains(event.relatedTarget)) showCompareMenu(false);
});
compareNav.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || compareMenu.hidden) return;
  event.preventDefault();
  showCompareMenu(false);
  compareTrigger.focus();
});
compareMenu.addEventListener('click', event => {
  if (event.target.closest('a')) {
    showCompareMenu(false);
    compareTrigger.focus();
  }
});

const sheet = document.querySelector('#guide-detail');
const sheetClose = sheet.querySelector('[data-close-detail]');
const sheetBody = sheet.querySelector('.sheet-body');
let view = '';
let mountedGuide;
let cleanupPage;
let openedFromGuide;
let shownEntry;
let bustController;
let focusGuideTarget = false;
let mountedRelations;
let mountedMacondo;

function readRoute() {
  const [, type, id, part, second] = location.hash.split('/');
  switch (type) {
    case undefined:
    case '':
      return {view:'landing'};
    case 'macondo':
      if (id === 'person') return {view:'macondo-profile', id:part};
      if (id === 'section') return {view:'macondo', section:part};
      if (id === 'event') return {view:'macondo', event:part};
      return {view:'macondo', id};
    case 'relations':
      return {view:'relations', id, figure:part};
    case 'map':
      return {view:[normanStoryData.id,rosesStory.id].includes(id) ? 'map-story' : 'map', id};
    case 'walk':
    case 'gallery':
    case 'compare':
      return {view: type, id, left:part, right:second};
    case 'henry':
      return {view: 'compare', id: 'henry'};
    case 'house':
      return {view:'exhibit', target: 'guide-house-' + id};
    case 'monarch':
    case 'event':
      return {view:'exhibit', target:'guide-' + id, detail: guideEntries.get(id)};
    case 'exhibit':
      if (id === 'event' && part) return {view:'exhibit', target:'guide-' + part};
      if (part === 'detail') return {view:'exhibit', target:'guide-' + id, detail:guideEntries.get(id)};
      if (houses.some(house => house[0] === id)) return {view:'exhibit', target:'guide-house-' + id};
      return {view:'exhibit', target:id ? 'guide-' + id : null};
    default:
      return {view:'exhibit'};
  }
}

function dismissSheet() {
  if (openedFromGuide) {
    history.back();
  } else if (shownEntry) {
    history.replaceState(null,'',guideLink(shownEntry));
    render();
  }
}

function closeSheet() {
  bustController?.abort();
  bustController = undefined;
  sheet.close();
  shownEntry = undefined;
}

function showSheet(entry) {
  if (shownEntry === entry) return;
  bustController?.abort();
  sheetBody.innerHTML = guideDetail(entry);
  shownEntry = entry;
  if (!sheet.open) sheet.showModal();
  sheet.scrollTop = 0;
  sheetClose.focus({preventScroll:true});
  const model = sheetBody.querySelector('.sheet-reconstruction');
  if (model) {
    bustController = new AbortController();
    const {signal} = bustController;
    model.addEventListener('toggle', function loadModel() {
      if (!model.open) return;
      model.removeEventListener('toggle',loadModel);
      import('./bust.js').then(({mountBust}) => {
        if (!signal.aborted) mountBust(model.querySelector('.bust'),signal);
      }).catch(() => { /* The labeled reconstruction image remains visible. */ });
    },{signal});
  }
}

function render() {
  const route = readRoute();
  const key = ['exhibit','relations','macondo'].includes(route.view) ? route.view : route.view + '/' + (route.id || '') + (route.id==='pair' ? `/${route.left || ''}/${route.right || ''}` : route.figure ? '/' + route.figure : '');
  let restore;
  if (sheet.open && !route.detail) {
    if (openedFromGuide?.hash === location.hash) restore = openedFromGuide;
    closeSheet();
    openedFromGuide = undefined;
  }
  const changedView = key !== view;
  if (changedView) {
    cleanupPage?.();
    cleanupPage = undefined;
    mountedGuide = undefined;
    mountedRelations = undefined;
    mountedMacondo = undefined;
    view = key;
    const isMacondo = route.view === 'macondo' || route.view === 'macondo-profile';
    document.body.dataset.page = isMacondo ? 'macondo' : route.view;
    if (route.view === 'landing') document.body.style.removeProperty('--interior-palette');
    else document.body.style.setProperty('--interior-palette', carouselPalettes[isMacondo ? 1 : 0]);
    document.title = route.view === 'landing' ? '万象志' : isMacondo ? '百年孤独 · 马孔多' : '王冠纪年 · 英国君王图谱';
    if (route.view === 'landing') {
      const controller = new AbortController();
      cleanupPage = () => controller.abort();
      main.innerHTML = landing();
      mountLanding(main.firstElementChild,controller.signal);
    } else if (route.view === 'map-story') {
      const controller = new AbortController();
      cleanupPage = () => controller.abort();
      const story = route.id === rosesStory.id ? rosesStory : normanStoryData;
      main.innerHTML = mapStory(story);
      mountMapStory(main.firstElementChild,story,controller.signal);
    } else if (route.view === 'map') {
      const controller = new AbortController();
      cleanupPage = () => controller.abort();
      main.innerHTML = historicalMap();
      mountHistoricalMap(main.firstElementChild, route.id, controller.signal, id => {
        view = 'map/' + id;
        history.replaceState(null, '', '#/map/' + id);
      });
    } else if (route.view === 'macondo') {
      const controller = new AbortController();
      cleanupPage = () => controller.abort();
      const tree = macondoTreeData();
      main.innerHTML = macondoPage(tree);
      mountedMacondo = mountMacondo(main.firstElementChild, tree, controller.signal);
    } else if (route.view === 'macondo-profile') {
      const person = macondoPeople.get(route.id);
      main.innerHTML = macondoProfilePage(person);
      if (person) document.title = person.cn + ' · 百年孤独';
      main.querySelector('h1').focus({preventScroll:true});
    } else if (route.view === 'relations') {
      const controller = new AbortController();
      cleanupPage = () => controller.abort();
      const tree = familyTreeData();
      main.innerHTML = relationshipPage(tree);
      mountedRelations = mountRelationshipPage(main.firstElementChild, tree, controller.signal);
    } else if (route.view === 'compare') {
      main.innerHTML = route.id === 'pair' ? pairComparison(route.left,route.right) : compareMonarchs(nameGroups.find(group => group.id === route.id));
    } else if (route.view === 'walk') {
      cleanupPage = walk(route.id);
    } else if (route.view === 'gallery') {
      main.innerHTML = gallery(route.id);
    } else {
      const controller = new AbortController();
      cleanupPage = () => controller.abort();
      main.innerHTML = exhibition();
      measureRoyalHeader();
      mountedGuide = mountExhibition(main.firstElementChild,controller.signal);
    }
  }
  hideSearch(true);
  showCompareMenu(false);
  const activeTab = {exhibit:'gallery',compare:'compare'}[route.view];
  document.querySelectorAll('[data-tab]').forEach(item => item.dataset.tab === activeTab ? item.setAttribute('aria-current','page') : item.removeAttribute('aria-current'));
  const activeSection = route.view === 'map-story'
    ? (route.id === rosesStory.id ? 'map/' + route.id : 'map')
    : route.view;
  royalSections.forEach(link => link.hash === '#/' + activeSection
    ? link.setAttribute('aria-current','page')
    : link.removeAttribute('aria-current'));
  if (restore) {
    window.scrollTo(0,restore.y);
    restore.link.focus({preventScroll:true});
  } else if (route.detail) {
    if (!openedFromGuide && shownEntry !== route.detail) mountedGuide.locate(document.getElementById(route.target));
    showSheet(route.detail);
  } else if (route.target) {
    const target = document.getElementById(route.target);
    mountedGuide.locate(target);
    if (focusGuideTarget) target?.focus({preventScroll:true});
  } else if (route.view === 'macondo') {
    if (changedView) window.scrollTo(0,0);
    if (changedView || (!route.section && !route.event)) mountedMacondo.update(route.id);
    if (route.event) mountedMacondo.jumpEvent(route.event);
    if (route.section) mountedMacondo.jumpSection(route.section);
  } else if (route.view === 'relations') {
    if (changedView) window.scrollTo(0,0);
    mountedRelations.update(route.id,route.figure);
  } else if (route.view === 'gallery' && route.id) {
    document.getElementById('portrait-' + route.id)?.scrollIntoView({block:'center'});
  } else {
    window.scrollTo(0,0);
  }
  focusGuideTarget = false;
}

document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});

main.addEventListener('click', event => {
  const link = event.target.closest('[data-open-detail]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  event.preventDefault();
  openedFromGuide = {hash:location.hash,y:window.scrollY,link};
  history.pushState(null,'',link.href);
  render();
});
sheetClose.addEventListener('click',dismissSheet);
sheet.addEventListener('cancel',event => {
  event.preventDefault();
  dismissSheet();
});
sheet.addEventListener('click',event => {
  if (event.target === sheet) {
    dismissSheet();
    return;
  }
  const copy = event.target.closest('[data-copy-detail]');
  if (copy && shownEntry) {
    if (!navigator.clipboard) {
      copy.textContent = '请复制地址栏链接';
      return;
    }
    navigator.clipboard.writeText(new URL(guideLink(shownEntry,true),location.href).href)
      .then(() => { copy.textContent = '已复制链接'; })
      .catch(() => { copy.textContent = '请复制地址栏链接'; });
  }
});
sheetBody.addEventListener('click', event => {
  const reference = event.target.closest('[data-reference]');
  if (reference) {
    event.preventDefault();
    const note = document.getElementById('sheet-reference-' + reference.dataset.reference);
    note?.scrollIntoView({block:'nearest'});
    note?.focus({preventScroll:true});
  }
  if (event.target.closest('a[href^="#/exhibit/"]')) focusGuideTarget = true;
});

const romans = ['I','II','III','IV','V','VI','VII','VIII'];
const normalize = text => text.normalize('NFKC').toLowerCase().replace(/[《》\s]+/g,'');
function searchItems() {
  return [
    ...monarchs.map(person => {
      const [name, roman] = person.en.split(' ');
      const number = romans.indexOf(roman) + 1;
      return {title:label(person), date:person.reign, kind:'人物', href:guideLink(person), names:[person.cn, person.en, ...(number ? [name + number] : [])]};
    }),
    ...houses.map(([id, cn, en, date], index) => ({title:cn,date,kind:index < earlyChapters.length ? '时期' : '王朝',href:'#/exhibit/'+id,names:[cn,en]})),
    ...historicalFigures.map(person => ({title:label(person),date:person.dates,kind:person.role,href:relationHref(person.id),names:[person.cn,person.en]})),
    ...guideEvents.map(event => {
      const date = exactEventDates[event.id];
      const dateParts = date?.match(/\d+/g);
      const names = [event.cn,englishSiteText(event.cn),event.reign];
      if (dateParts) names.push(date,dateParts.map((part,index)=>index===0 ? part : part.padStart(2,'0')).join('-'));
      return {title:event.cn,date:date || event.reign,kind:'大事',href:guideLink(event),names};
    })
  ].map(item => ({...item,names:item.names.map(normalize)}));
}
let searchIndex;
let selectedResult = -1;

function hideSearch(clear = false) {
  results.hidden = true;
  search.setAttribute('aria-expanded','false');
  search.removeAttribute('aria-activedescendant');
  selectedResult = -1;
  if (clear) search.value = '';
}

function showResults() {
  const query = normalize(search.value);
  if (!query) return hideSearch();
  searchIndex ||= searchItems();
  const matches = searchIndex.filter(item => item.names.some(name => name.includes(query)))
    .sort((a,b) => Number(b.names.includes(query))-Number(a.names.includes(query))).slice(0,9);
  results.innerHTML = matches.length ? matches.map((item,index) =>
    `<a id="search-option-${index}" href="${item.href}" role="option" aria-selected="false" tabindex="-1"><span><strong>${item.title}</strong><small>${item.date}</small></span><span class="search-kind">${item.kind}</span></a>`).join('') : '<p role="status">没有匹配的人物、王朝或事件</p>';
  results.hidden = false;
  search.setAttribute('aria-expanded','true');
  search.removeAttribute('aria-activedescendant');
  selectedResult = -1;
}

search.addEventListener('input',showResults);
search.addEventListener('focus',() => { if (search.value) showResults(); });
search.addEventListener('keydown', event => {
  if (event.isComposing) return;
  if (event.key === 'Escape') return hideSearch();
  if (event.key === 'Tab') return hideSearch();
  if (results.hidden) return;
  const options = [...results.querySelectorAll('a')];
  if (event.key === 'Enter' && options.length) {
    event.preventDefault();
    options[Math.max(0,selectedResult)].click();
  }
  if (['ArrowDown','ArrowUp'].includes(event.key) && options.length) {
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    options[selectedResult]?.setAttribute('aria-selected','false');
    selectedResult = selectedResult < 0 ? (direction > 0 ? 0 : options.length - 1) : (selectedResult+direction+options.length)%options.length;
    const option = options[selectedResult];
    option.setAttribute('aria-selected','true');
    search.setAttribute('aria-activedescendant',option.id);
    option.scrollIntoView({block:'nearest'});
  }
});
results.addEventListener('click', event => {
  const option = event.target.closest('a');
  if (!option) return;
  focusGuideTarget = true;
  search.blur();
  if (option.hash === location.hash) render();
  else hideSearch();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.searchbox')) hideSearch();
  if (!compareNav.contains(event.target)) showCompareMenu(false);
  const homeLink = event.target.closest('.brand,[data-tab="gallery"]');
  if (homeLink?.hash === location.hash && !sheet.open) render();
  const macondoSection = event.target.closest('.macondo-top a[href^="#/macondo/section/"]');
  if (macondoSection?.hash === location.hash) render();
});
document.addEventListener('change', event => {
  const pair = event.target.closest('[data-pair]');
  if (pair) {
    const [left,right] = [...pair.querySelectorAll('select')].map(select=>people.get(select.value));
    if (!left || !right) return;
    history.replaceState(null,'',`#/compare/pair/${left.id}/${right.id}`);
    pair.nextElementSibling.innerHTML = pairCards(left,right);
    return;
  }
  if (!['compare-filter','portrait-filter'].includes(event.target.id)) return;
  const house = event.target.value;
  document.querySelectorAll('[data-dynasty]').forEach(card => card.hidden = Boolean(house && card.dataset.dynasty !== house));
});
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
new ResizeObserver(measureRoyalHeader).observe(royalHeader);
window.addEventListener('hashchange', render);
render();
mountSiteLanguage();
