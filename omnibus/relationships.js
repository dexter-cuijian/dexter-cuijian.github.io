function relationHref(id, figureId) {
  return `#/relations${id ? '/' + id : ''}${figureId ? '/' + figureId : ''}`;
}

function relationSelection(id, figureId) {
  const figure = historicalFigureById.get(figureId) || historicalFigureById.get(id);
  const houseId = figure && id === figure.id ? figure.house : id;
  const explicitHouse = houses.findIndex(house => house[0] === houseId);
  const relatedRuler = figure && id === figure.id && figure.links
    .map(([rulerId]) => people.get(rulerId))
    .find(person => person.house === explicitHouse);
  const ruler = people.get(id) || relatedRuler || (explicitHouse >= 0
    ? monarchs.find(person => person.house === explicitHouse)
    : people.get('henry-viii'));
  const index = explicitHouse >= 0 ? explicitHouse : ruler.house;
  return {ruler, figure, index, house:houses[index]};
}

function relationshipEdges(ruler) {
  const handoffs = [];
  const kin = [];
  for (const [from,to,year,label] of reignTransitions) {
    if (ruler.id === from) handoffs.push({id:to, label, prefix:`后续 · ${year}`});
    if (ruler.id === to) handoffs.push({id:from, label:`→ ${ruler.cn} · ${label}`, prefix:`前序 · ${year}`});
  }
  for (const [left,right,toRight,toLeft] of rulerRelationships) {
    if (ruler.id === left) kin.push({id:right,label:toRight});
    if (ruler.id === right) kin.push({id:left,label:toLeft});
  }
  const figures = historicalFigures.flatMap(person =>
    person.links.filter(([id]) => id === ruler.id).map(([,label]) => ({id:person.id,label})));
  return {handoffs,kin,figures};
}

function relationList(edges) {
  return edges.length ? `<ul>${edges.map(({id,label,prefix}) => {
      const person = people.get(id);
      return `<li><a href="${relationHref(id)}">
        ${prefix ? `<span class="relation-edge-date">${prefix}</span>` : ''}
        <strong>${person.cn}</strong><span>${label}</span>
      </a></li>`;
    }).join('')}</ul>` : '<p>暂无收录</p>';
}

function relationProfile(ruler, figure, house) {
  const person = figure || ruler;
  if (!person) return `<aside class="relation-profile" aria-labelledby="relation-profile-title">
    <h2 id="relation-profile-title" tabindex="-1">${house[1]}</h2>
    <p>选择下方人物，查看他与不列颠历史的关系。</p>
  </aside>`;
  return `<aside class="relation-profile" aria-labelledby="relation-profile-title">
    <h2 id="relation-profile-title" tabindex="-1">${person.cn}</h2>
    <p class="guide-english">${person.en}</p>
    <p class="relation-profile-role">${figure ? `${figure.role} · ${figure.dates}` : ruler.reign}</p>
    <p class="relation-profile-summary">${figure ? figure.summary : biographies[ruler.id][0]}</p>
    ${figure?.links.length ? `<ul class="relation-profile-links">${figure.links.map(([id,label]) =>
      `<li><a href="${relationHref(id)}">${people.get(id).cn} ↗</a><span>${label}</span></li>`).join('')}</ul>` : ''}
    <div class="relation-profile-actions">
      ${figure ? sourceNote(figure.sourceName,figure.source) : `<a href="${guideLink(ruler,true)}">查看君主资料 ↗</a>`}
      ${figure?.event ? `<a href="${guideLink(guideEntries.get(figure.event),true)}">查看相关大事 ↗</a>` : ''}
    </div>
  </aside>`;
}

function relationshipPage(tree) {
  return `<section class="shell relation-page" aria-labelledby="relation-title">
    <header class="relation-header">
      <a class="back" href="#/exhibit">← 返回君王与大事</a>
      <h1 id="relation-title">君主家谱</h1>
      <p>点击人物查看资料，再点一次收起。父母之间的圆点连到共同子女，虚线标记王位交接。</p>
      <div class="relation-selectors">
        <label>时期与王朝 <select aria-label="选择人物时期" data-relation-select>${houses.map(([id,name]) =>
          `<option value="${id}">${name}</option>`).join('')}</select></label>
        <label>君主 <select aria-label="选择图谱君主" data-relation-select>
          <option value="">未选中君主</option>
          ${houses.map(([,name],i) => {
            const members = monarchs.filter(person => person.house === i);
            return members.length ? `<optgroup label="${name}">${members.map(person =>
              `<option value="${person.id}">${person.cn} · ${person.reign}</option>`).join('')}</optgroup>` : '';
          }).join('')}
        </select></label>
      </div>
    </header>
    <div class="relation-workspace">
      ${familyTree(tree)}
      <section class="relation-network relation-era" data-relation-era hidden></section>
      ${familyInspector()}
    </div>
    <div class="relation-credit">连线按站内资料绘制，标注早期缺录、复位、共治与争位。
      ${sourceNote('编年资料',royalIndex)}
      ${sourceNote('英格兰遗产委员会 · 阿基坦的埃莉诺','https://www.english-heritage.org.uk/members-area/past-lives/eleanor-of-aquitaine/')}
      ${sourceNote('威斯敏斯特教堂 · 亨利六世','https://www.westminster-abbey.org/abbey-commemorations/royals/henry-vi')}
      ${sourceNote('历史皇家宫殿 · 约克的伊丽莎白','https://www.hrp.org.uk/tower-of-london/history-and-stories/elizabeth-of-york/')}
      ${sourceNote('历史皇家宫殿 · 亨利八世的子女','https://www.hrp.org.uk/hampton-court-palace/history-and-stories/henry-viiis-children/')}
      ${sourceNote('英国王室 · 爱德华七世','https://www.royal.uk/edward-vii')}
      ${sourceNote('英国王室 · 查尔斯三世','https://www.royal.uk/the-king')}
    </div>
  </section>`;
}

function mountRelationshipPage(panel, tree, signal) {
  const [periodSelect,rulerSelect] = panel.querySelectorAll('[data-relation-select]');
  const drawer = mountFamilyInspector(panel,rulerSelect,signal);
  const inspector = drawer.content;
  const canvas = panel.querySelector('.relation-network');
  const era = panel.querySelector('[data-relation-era]');
  let currentRuler;
  let currentHouse;
  let currentSelection;
  let picked;
  const camera = mountFamilyTree(panel,signal,id => {
    if (currentSelection === id) {
      location.hash = relationHref(currentHouse);
      return;
    }
    picked = id;
    if (historicalFigureById.get(id)?.links.some(([rulerId]) => rulerId === currentRuler?.id)) {
      location.hash = relationHref(currentRuler.id,id);
    } else {
      location.hash = relationHref(id);
    }
  },tree);
  periodSelect.addEventListener('change',() => { location.hash = relationHref(periodSelect.value); },{signal});
  rulerSelect.addEventListener('change',() => {
    location.hash = relationHref(rulerSelect.value || currentHouse);
  },{signal});

  function update(id, figureId) {
    const {ruler,figure,index,house} = relationSelection(id,figureId);
    const base = ruler?.id || house[0];
    const selected = figure?.id || (people.has(id) ? ruler.id : undefined);
    const graphId = tree.positions.has(selected) ? selected : selected ? ruler?.id : undefined;
    const preserveCamera = picked === selected && Boolean(selected);
    const recenter = !currentHouse || (selected ? currentSelection !== selected : currentHouse !== house[0]);
    picked = undefined;
    currentRuler = ruler;
    currentHouse = house[0];
    currentSelection = selected;
    canvas.hidden = !ruler;
    era.hidden = Boolean(ruler);
    periodSelect.value = house[0];
    rulerSelect.value = selected && ruler ? ruler.id : '';
    drawer.setOpen(Boolean(selected));
    camera.setRuler(graphId,false);
    if (ruler && recenter && !preserveCamera) camera.center(graphId || ruler.id);
    if (!selected && ruler) return;

    const {handoffs,kin,figures} = ruler ? relationshipEdges(ruler) : {handoffs:[],kin:[],figures:[]};
    const related = new Map(figures.map(({id,label}) => [id,label]));
    const periodRulers = new Set(monarchs.filter(person => person.house === index).map(person => person.id));
    const period = historicalFigures.filter(person => person.house === house[0] || person.links.some(([member]) => periodRulers.has(member)));
    const roster = [...historicalFigures.filter(person => related.has(person.id)), ...period.filter(person => !related.has(person.id))];
    const rosterTitle = ruler ? 'relation-roster-title' : 'relation-era-roster-title';
    const rosterHtml = `
      <section class="relation-roster" aria-labelledby="${rosterTitle}">
        <h3 id="${rosterTitle}">${ruler ? '重臣与同时代人物' : house[1] + ' · 人物选录'}</h3>
        <ul>${roster.map(person => `<li><a href="${relationHref(base,person.id)}"${figure === person ? ' aria-current="true"' : ''}>
          <strong>${person.cn}</strong><span>${related.get(person.id) || person.role}${ruler && !related.has(person.id) ? ' · 同时期选录' : ''}</span>
        </a></li>`).join('')}</ul>
      </section>`;
    if (!ruler) {
      era.innerHTML = `<h2>${house[1]}</h2><p>${earlyChapters[index].note[2]}</p>${rosterHtml}`;
    }
    if (!selected) return;
    inspector.innerHTML = `${relationProfile(ruler,figure,house)}
      ${ruler ? rosterHtml : ''}
      ${ruler ? `<details class="relation-text"><summary>查看关系文字详情</summary>
        <h3>王位交接</h3>${relationList(handoffs)}
        <h3>亲属与对手</h3>${relationList(kin)}
      </details>` : ''}`;
    if (figure) inspector.querySelector('#relation-profile-title').focus({preventScroll:true});
    if (preserveCamera && inspector.getBoundingClientRect().top > innerHeight - 70) {
      drawer.reveal();
    }
  }
  return {update};
}
