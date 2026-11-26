const eventTypes = [
  ['war','战争与战役','conquest bannockburn hundred-years agincourt roses bosworth armada civil-war waterloo world-war-i world-war-ii ve-day'],
  ['law','法案与条约','magna-carta model-parliament union-1707 union-1801 bill-rights reform-act'],
  ['crown','王位与制度','henry-vi-return crowns republic restoration revolution windsor elizabeth-coronation charles-coronation'],
  ['society','宗教与社会','domesday becket black-death peasants reformation great-fire american-independence']
];
const eventTypeById = new Map(eventTypes.flatMap(([type,label,ids]) => [...ids.split(' '), ...earlyEvents.filter(event => event.category === type).map(event => event.id)].map(id=>[id,{type,label}])));

const exactEventDates = {
  ...Object.fromEntries(earlyEvents.filter(event => event.date).map(({id,date}) => [id,date])),
  'magna-carta':'1215 年 6 月 15 日',
  bosworth:'1485 年 8 月 22 日',
  've-day':'1945 年 5 月 8 日',
  'elizabeth-coronation':'1953 年 6 月 2 日',
  'charles-coronation':'2023 年 5 月 6 日'
};
const portraitRecords = {
  'richard-iii':['归属有争议','1520 年代','伦敦古物学会'],
  'henry-vii':['佚名','1505 年','英国国家肖像馆'],
  'henry-viii':['见原图档案的作者归属','1540 年代','华沙国家博物馆（曾存放于华沙王宫）'],
  'elizabeth-i':['佚名','约 1575 年','英国国家肖像馆'],
  'elizabeth-ii':['Donald McKague','1958 年 12 月','加拿大图书档案馆']
};

const extraReferences = {
  'richard-iii':[['莱斯特大学 · 理查三世生平','https://le.ac.uk/richard-iii/richard-iii-and-leicester/who-was-richard-iii']],
  'magna-carta':[['英国国家档案馆 · 《大宪章》','https://www.nationalarchives.gov.uk/education/resources/magna-carta/']]
};

const glossaryEvents = {
  '玫瑰战争':['roses','兰开斯特与约克两支围绕英格兰王位的争夺。'],
  '百年战争':['hundred-years','英格兰与法国围绕王位主张和领地展开的长期战争。'],
  '光荣革命':['revolution','1688 年的政权更替，威廉与玛丽随后共同继承王位。'],
  '大宪章':['magna-carta','1215 年约翰与贵族达成的宪章，限制王权。']
};

function glossaryLinks(text, currentId) {
  const terms = Object.entries(glossaryEvents).map(([term,value])=>[siteText(term),value]);
  const byTerm = new Map(terms);
  const pattern = new RegExp(terms.map(([term])=>term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
  return siteText(text).replace(pattern,term=>{
    const [id,definition] = byTerm.get(term);
    return id === currentId ? term : `<a class="glossary-term" href="${guideLink(guideEntries.get(id))}" title="${siteText(definition)}">${term}</a>`;
  });
}

function referencesFor(entry, reference) {
  const label = entry.event ? '事件档案 · '+entry.cn : '英国王室资料 · '+(specialBiographySources[entry.id] ? entry.cn : houses[entry.house][1]);
  return [[label,reference],...(extraReferences[entry.id] || [])];
}

function referenceMark(references, index = 1) {
  return `<sup><a class="reference-mark" href="#sheet-reference-${index}" data-reference="${index}" title="${references[index-1][0]}" aria-label="查阅文献 ${index}">[${index}]</a></sup>`;
}

function portraitRecord(entry) {
  const credit = credits[entry.id];
  if (!credit) return '';
  const record = portraitRecords[entry.id];
  return `<section class="sheet-portrait-record"><h3>肖像资料</h3>
    ${record ? `<dl>${['创作者','创作年代','馆藏'].map((term,i)=>`<div><dt>${term}</dt><dd>${record[i]}</dd></div>`).join('')}</dl>` : ''}
    ${source(entry)}
  </section>`;
}
