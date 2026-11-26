const macondoStories = [
  {
    id:'sisters', title:'阿玛兰妲、丽贝卡与皮埃特罗',
    steps:[
      ['pianola','钢琴带来的相识','皮埃特罗来安装自动钢琴，也教阿玛兰妲和丽贝卡跳舞。两人对他的感情让原本一起长大的姐妹渐渐疏远。',['amaranta','rebeca','pietro'],'04',[]],
      ['sisters','订婚与积怨','皮埃特罗选择了丽贝卡。阿玛兰妲想阻止婚礼，两人的积怨从此远远超出了对同一个人的爱慕。',['amaranta','rebeca','pietro'],'04',[['amaranta','rebeca'],['pietro','rebeca']]],
      ['rebeca-wedding','丽贝卡另嫁','何塞·阿尔卡蒂奥归来后，丽贝卡解除婚约，嫁给了他。婚约虽然结束，姐妹并未因此和解。',['rebeca','jose-son','pietro','amaranta'],'05',[['amaranta','rebeca'],['jose-son','rebeca']]],
      ['pietro-rejection','阿玛兰妲拒绝求婚','皮埃特罗转而向阿玛兰妲求婚。她拒绝了他。小说和剧集都交代了皮埃特罗的结局。',['amaranta','pietro'],'06',[['pietro','amaranta']],true],
      ['gerineldo-courtship','格里内尔多的陪伴','格里内尔多长年来探望阿玛兰妲。两人关系亲近，阿玛兰妲仍拒绝了他的求婚。',['amaranta','gerineldo'],'09',[['gerineldo','amaranta']]],
      ['sisters-memory','旧怨延续到晚年','晚年的阿玛兰妲独处时依然会想起丽贝卡。皮埃特罗早已离开两人的生活，这段姐妹关系仍是她难以摆脱的记忆。',['amaranta','rebeca'],'11',[['amaranta','rebeca']]]
    ]
  },
  {
    id:'twins', title:'双胞胎与佩特拉',
    steps:[
      ['petra-twins','何塞先认识佩特拉','最初与佩特拉交往的是何塞·阿尔卡蒂奥第二。兄弟外貌极为相似，这给后来的误认埋下了伏笔。',['jose-twin','petra'],'10',[['jose-twin','petra']]],
      ['petra-twins','奥雷里亚诺被认成何塞','佩特拉把来访的奥雷里亚诺第二认作何塞。奥雷里亚诺没有立即表明身份，一度和兄弟先后与她来往。',['jose-twin','aureliano-twin','petra'],'10',[['jose-twin','petra'],['jose-twin','aureliano-twin']]],
      ['carnival','奥雷里亚诺与佩特拉相伴','何塞退出这段关系后，奥雷里亚诺与佩特拉长期相伴。两人的关系与家畜异常繁殖、马孔多的繁荣写在一起。',['aureliano-twin','petra'],'10',[['aureliano-twin','petra']]],
      ['fernanda-arrival','婚姻与伴侣并存','奥雷里亚诺娶了费尔南达，却继续与佩特拉来往。家谱中从奥雷里亚诺引出的两条关系线分别对应这段婚姻与长期伴侣关系。',['aureliano-twin','fernanda','petra'],'11',[['aureliano-twin','petra'],['aureliano-twin','fernanda']]],
      ['rain','繁荣退去以后','漫长的暴雨改变了两人的生活。小说后来写他们在贫困中重新理解这段关系，佩特拉开始筹办抽奖，想重建被洪水摧毁的生计。',['aureliano-twin','petra'],'16',[['aureliano-twin','petra']]]
    ]
  }
];

function macondoStoriesPanel() {
  return `<section class="macondo-stories" aria-labelledby="macondo-stories-title">
    <h2 id="macondo-stories-title" tabindex="-1">关系导读</h2>
    <div class="story-choices">
      ${macondoStories.map(({id,title}) => `<button type="button" data-macondo-story="${id}" aria-pressed="false">${title}</button>`).join('')}
    </div>
    <div class="story-reader" data-story-reader hidden>
      <ol class="story-steps" aria-label="关系变化时间线"></ol>
      <div data-story-detail aria-live="polite"></div>
    </div>
  </section>`;
}

function mountMacondoStories(panel, signal, camera, eventVisible) {
  const reader = panel.querySelector('[data-story-reader]');
  const rail = reader.querySelector('.story-steps');
  const detail = reader.querySelector('[data-story-detail]');
  const choices = [...panel.querySelectorAll('[data-macondo-story]')];
  const events = new Map(macondoEvents.map(event => [event.id,event]));
  let active;
  let selected = 0;

  function show(index) {
    selected = index;
    const [eventId,title,note,ids,chapter,edges,spoiler] = active.steps[index];
    const event = events.get(eventId);
    rail.querySelectorAll('button').forEach(button => {
      if (Number(button.dataset.storyStep) === index) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    detail.innerHTML = `<h3>${title}</h3><p>${note}</p><div class="story-participants">${ids.map(id =>
      `<a href="${macondoProfileHref(id)}">${macondoPeople.get(id).cn} ↗</a>`).join('')}</div>
      <button class="story-to-tree" type="button" data-story-tree>查看高亮家谱 ↓</button>
      <div class="story-sources">${sourceNote('小说原文 · 第 ' + Number(chapter) + ' 章',macondoNovelChapter(chapter))}
      ${event.source && event.source !== macondoNovelChapter(chapter) ? sourceNote('小说或剧集出处',event.source) : ''}</div>
      ${spoiler ? `<details class="relation-text"><summary>展开这段情节 · 含剧透</summary><p>${event.note}</p></details>` : ''}`;
    camera.setStoryGroup(ids,edges);
  }

  function refresh() {
    if (!active) return;
    const visible = active.steps.map(([id],index) => eventVisible(events.get(id)) ? index : -1).filter(index => index !== -1);
    rail.innerHTML = visible.map(index => {
      const [id,title] = active.steps[index];
      const event = events.get(id);
      return `<li><button type="button" data-story-step="${index}"><small>${event.novel || macondoEpisodeLabel(event.episode)}</small><strong>${title}</strong></button></li>`;
    }).join('');
    if (visible.length) show(visible.includes(selected) ? selected : visible[0]);
    else {
      detail.innerHTML = '<p>这条关系线尚未进入已看集数。</p>';
      camera.setStoryGroup([],[]);
    }
  }

  choices.forEach(button => button.addEventListener('click',() => {
    const story = macondoStories.find(item => item.id === button.dataset.macondoStory);
    active = active === story ? undefined : story;
    choices.forEach(choice => choice.setAttribute('aria-pressed',String(choice.dataset.macondoStory === active?.id)));
    reader.hidden = !active;
    selected = 0;
    if (active) refresh();
    else camera.setStoryGroup([],[]);
  },{signal}));
  detail.addEventListener('click',event => {
    if (!event.target.closest('[data-story-tree]')) return;
    const viewport = panel.querySelector('.tree-viewport');
    viewport.focus({preventScroll:true});
    panel.querySelector('.relation-workspace').scrollIntoView({block:'start'});
  },{signal});
  rail.addEventListener('click',event => {
    const button = event.target.closest('[data-story-step]');
    if (button) show(Number(button.dataset.storyStep));
  },{signal});
  return refresh;
}

registerSiteTranslations({
  '关系导读':'Relationship guide',
  '查看高亮家谱':'View highlighted family tree',
  '关系变化时间线':'Relationship timeline',
  '阿玛兰妲、丽贝卡与皮埃特罗':'Amaranta, Rebeca and Pietro',
  '双胞胎与佩特拉':'The twins and Petra',
  '这条关系线尚未进入已看集数。':'This storyline comes after the episode selected.',
  '已看集数保存在本机，并筛选剧情、关系导读和档案里的「相关大事」。':'Your episode progress is saved on this device and filters events, relationship guides and related events in profiles.'
});
[
  [
    ['A piano brings them together','Pietro comes to install the pianola and teaches Amaranta and Rebeca to dance. Their feelings for him pull the sisters, who grew up together, apart.'],
    ['An engagement and a grudge','Pietro chooses Rebeca. Amaranta tries to stop the wedding, and their grudge outlasts their feelings for the same man.'],
    ['Rebeca marries José Arcadio','After José Arcadio returns, Rebeca breaks her engagement and marries him. The end of the engagement does not reconcile the sisters.'],
    ['Amaranta turns down Pietro','Pietro asks Amaranta to marry him. She refuses. Both the novel and the series reveal what happens to him.'],
    ['Gerineldo keeps visiting','Gerineldo visits Amaranta for years. They grow close, yet she turns down his proposal.'],
    ['A grudge that lasts into old age','Alone in old age, Amaranta still thinks of Rebeca. Pietro has long since left their lives, but she cannot put her memories of her sister behind her.']
  ],
  [
    ['José meets Petra first','José Arcadio Segundo is the first of the twins to become involved with Petra. The brothers are nearly identical, setting up a case of mistaken identity.'],
    ['Petra mistakes Aureliano for José','Petra takes Aureliano Segundo for José. Aureliano plays along, and for a time both brothers visit her.'],
    ['Aureliano stays with Petra','After José leaves, Aureliano remains Petra’s partner. Their relationship runs alongside the extraordinary growth of their herds and Macondo’s prosperity.'],
    ['A marriage and a partnership','Aureliano marries Fernanda and continues seeing Petra. The tree connects Aureliano to both women, one as his wife and one as his long-term partner.'],
    ['After the prosperity ends','Years of rain change their lives. The novel later shows them rediscovering their bond in poverty, as Petra starts a raffle to rebuild their livelihood.']
  ]
].forEach((story,i) => story.forEach(([title,note],j) => {
  const [,originalTitle,originalNote] = macondoStories[i].steps[j];
  registerSiteTranslations({[originalTitle]:title,[originalNote]:note});
}));
