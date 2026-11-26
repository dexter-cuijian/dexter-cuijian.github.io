// Content is authored once in Chinese. English strings are local, keyed by source text.
const siteTranslations = new Map();
const hanText = /\p{Script=Han}/u;
const localizableAttributes = ['aria-label','aria-valuetext','alt','label','placeholder','title'];
const sourceText = new WeakMap();
const sourceAttributes = new WeakMap();

function storedSiteLanguage() {
  try {
    return localStorage.getItem('crown-chronicle-language') === 'en' ? 'en' : 'zh-CN';
  } catch {
    return 'zh-CN';
  }
}
let siteLanguage = storedSiteLanguage();
document.documentElement.lang = siteLanguage;

function registerSiteTranslations(messages) {
  for (const [source, translation] of Object.entries(messages)) {
    const key = source.trim();
    if (key && translation) siteTranslations.set(key, translation);
  }
}

function englishSiteText(value) {
  if (!hanText.test(value)) return value;
  const text = value.trim();
  const english = lookupEnglish(text);
  return value.replace(text, () => english);
}

function lookupEnglish(text) {
  const exact = siteTranslations.get(text);
  if (exact) return exact;
  const quoted = text.match(/^《(.+)》$/);
  if (quoted && siteTranslations.has(quoted[1])) return siteTranslations.get(quoted[1]);
  for (const [pattern, format] of sitePatterns) {
    const match = pattern.exec(text);
    if (match) return format(...match.slice(1));
  }
  const dates = text
    .replace(/(?:(公元|约)\s*)?(\d{1,4})\s*年\s*(\d{1,2})\s*月(?:\s*(\d{1,2})\s*日)?/g, (_, prefix, year, month, day) => {
      const monthName = siteMonths[Number(month)-1];
      return monthName ? (prefix === '约' ? 'c. ' : '') + monthName + (day ? ' ' + day + ',' : '') + ' ' + year : year;
    })
    .replace(/(\d{3,4})\s*年代/g, '$1s')
    .replace(/(\d{1,4})\s*年/g, '$1')
    .replace(/约\s*(?=\d)/g, 'c. ')
    .replace(/公元\s*(?=\d)/g, 'AD ')
    .replace(/至今/g, 'present');
  if (!hanText.test(dates)) return dates;
  // Labels are often combined with dates, another label, or a source name.
  return dates.split(/(\s+·\s+|／|\s+↗|\s+→|\s+↓|←\s+)/).map(piece => {
    if (piece === '／') return ' / ';
    const translated = siteTranslations.get(piece.trim());
    if (translated) return piece.replace(piece.trim(), () => translated);
    if (piece.includes('、') && piece.split('、').every(word => siteTranslations.has(word))) {
      return piece.split('、').map(word => siteTranslations.get(word)).join(', ');
    }
    return piece;
  }).join('');
}

const siteMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const sitePatterns = [
  [/^开始阅读(.+)$/, name => 'Start reading ' + englishSiteText(name)],
  [/^(下一|上一)专题 · (.+)$/, (direction, name) => (direction === '下一' ? 'Next: ' : 'Previous: ') + englishSiteText(name)],
  [/^历代(.+)$/, name => 'Rulers named ' + englishSiteText(name)],
  [/^对照\s*(\d+)\s*位同名君王的在位时期及王朝。$/, count => 'Compare the reigns and dynasties of ' + count + ' rulers who share a name.'],
  [/^展开(.+)资料$/, name => 'View details for ' + englishSiteText(name)],
  [/^打开(.+)详情$/, name => 'View details for ' + englishSiteText(name)],
  [/^(\d+\.\s*)(.+)$/, (number,name) => number + englishSiteText(name)],
  [/^剧集演员\s+(.+)$/, name => 'Cast: ' + englishSiteText(name).replace(/／/g,' / ')],
  [/^查阅文献\s+(\d+)$/, number => 'Read reference ' + number],
  [/^(.+)历史图像$/, name => 'Historical image of ' + englishSiteText(name)],
  [/^第\s*(\d+)\s*代(?:\s*·\s*(.+))?$/, (number, rest) => 'Generation ' + number + (rest ? ' · ' + englishSiteText(rest) : '')],
  [/^(第一部|第二部)\s*·\s*第\s*(\d+)\s*集$/, (part, number) => 'Part ' + (part === '第一部' ? '1' : '2') + ' · Episode ' + number],
  [/^小说原文\s*·\s*第\s*(\d+)\s*章$/, number => 'Novel excerpt · Chapter ' + number],
  [/^相关段落\s*·\s*(.+)$/, title => 'Related passage · ' + englishSiteText(title)],
  [/^(\d+)\s*个时期与王朝\s*·\s*(\d+)\s*位人物\s*·\s*(\d+)\s*件大事$/, (eras, people, events) => eras + ' eras and dynasties · ' + people + ' people · ' + events + ' events'],
  [/^符合条件的条目：\s*(\d+)$/, count => 'Matching entries: ' + count],
  [/^(.+?)\s+·\s+(\d+)\s*件大事$/, (range, count) => englishSiteText(range) + ' · ' + count + ' events'],
  [/^(\d+)\s*件大事可定位。跨地区事件以有史料支持的代表地点标注。$/, count => count + ' events have mapped locations. Events spanning regions use a representative site documented in the sources.'],
  [/^(\d+)\s*件肖像展品$/, count => count + ' portraits on display'],
  [/^边界参考\s*(\d+)\s*年的地图概略快照。快照之间沿用上一份资料。$/, year => 'Boundaries use an approximate snapshot from ' + year + '. Each snapshot applies until the next.']
];

function siteText(text) {
  return siteLanguage === 'en' ? englishSiteText(text) : text;
}

function localizeTextNode(node) {
  const previous = sourceText.get(node);
  const source = previous?.rendered === node.data ? previous.source : node.data;
  if (!previous && !hanText.test(source)) return;
  const rendered = siteText(source);
  if (rendered !== node.data) node.data = rendered;
  sourceText.set(node, {source,rendered});
}

function localizeElement(element) {
  if (element.matches('script,style,[data-keep-language]')) return;
  for (const name of localizableAttributes) localizeAttribute(element,name);
  for (const child of element.childNodes) localizeNode(child);
}

function localizeAttribute(element,name) {
  const value = element.getAttribute(name);
  if (value === null) return;
  let records = sourceAttributes.get(element);
  const previous = records?.get(name);
  const source = previous?.rendered === value ? previous.source : value;
  if (!previous && !hanText.test(source)) return;
  const rendered = siteText(source);
  if (rendered !== value) element.setAttribute(name,rendered);
  if (!records) sourceAttributes.set(element,records = new Map());
  records.set(name,{source,rendered});
}

function localizeNode(node) {
  if (node.nodeType === Node.TEXT_NODE) localizeTextNode(node);
  else if (node.nodeType === Node.ELEMENT_NODE) localizeElement(node);
}

function mountSiteLanguage() {
  const control = document.querySelector('.site-language');
  const buttons = control.querySelectorAll('[data-site-language]');
  function updateScreen() {
    document.documentElement.lang = siteLanguage;
    buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.siteLanguage === siteLanguage)));
    localizeElement(document.documentElement);
  }
  updateScreen();
  control.addEventListener('click',event => {
    const button = event.target.closest('[data-site-language]');
    if (!button || button.dataset.siteLanguage === siteLanguage) return;
    siteLanguage = button.dataset.siteLanguage;
    try { localStorage.setItem('crown-chronicle-language',siteLanguage); } catch {}
    updateScreen();
  });
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'childList') record.addedNodes.forEach(localizeNode);
      else if (record.type === 'characterData') localizeNode(record.target);
      else localizeAttribute(record.target,record.attributeName);
    }
  }).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:localizableAttributes});
}
