const rosesAbbey = 'https://www.westminster-abbey.org/abbey-commemorations/royals/henry-vii-and-elizabeth-of-york';
const rosesBosworth = 'https://historicengland.org.uk/content/docs/listing/battlefields/bosworth/';
const rosesWestminster = [51.499,-.127];
const rosesStory = {
  id:'wars-of-the-roses',
  title:'玫瑰战争与都铎王朝的建立',
  intro:'1455–1486 · 从兰开斯特与约克争夺王位，到亨利七世加冕并与约克的伊丽莎白成婚。',
  bounds:[[50.55,-5.35],[54.35,.25]],
  markerShifts:{0:16,1:16,3:-16,4:-14,6:16,9:16,10:16},
  familyLinks:true,
  credit:'虚线连接亨利·都铎在 1485 年有记载的登陆地与行军节点。点位为概略位置，地貌采用现代底图。',
  steps:[
    {date:'1455 年 5 月 22 日',title:'圣奥尔本斯首战',place:'圣奥尔本斯',coords:[51.753,-.336],person:'henry-vi',
      note:'约克公爵理查与沃里克伯爵在圣奥尔本斯击败王军。亨利六世仍是国王，约克派借此控制了他身边的政局。',
      source:'圣奥尔本斯博物馆',url:'https://www.stalbansmuseums.org.uk/node/996',event:'roses'},
    {date:'1460 年 10 月 31 日',title:'议会确立约克继承权',place:'威斯敏斯特',coords:rosesWestminster,person:'henry-vi',
      note:'约克公爵理查提出王位主张。议会达成妥协：亨利六世继续在位，约克公爵及其后代取得继承权，亨利之子被排除在外。理查同年在韦克菲尔德战死。',
      source:'英国议会史项目',url:'https://historyofparliament.com/2020/10/28/the-brief-triumph-of-richard-duke-of-york-the-parliamentary-accord-of-31-october-1460/'},
    {date:'1461 年 3 月 29 日',title:'陶顿战役',place:'北约克郡陶顿',coords:[53.841,-1.274],person:'edward-iv',
      note:'约克公爵之子爱德华已在伦敦取得王位，随后在陶顿击败兰开斯特军，巩固了他的统治。亨利六世仍在世，王位之争也随之延续。',
      source:'英格兰历史遗产局',url:'https://historicengland.org.uk/listing/the-list/list-entry/1000040'},
    {date:'1470 年',title:'亨利六世复位',place:'伦敦塔',coords:[51.508,-.076],person:'henry-vi',
      note:'曾拥立爱德华四世的沃里克转而支持亨利六世。爱德华出逃，亨利离开伦敦塔短暂复位。',
      source:'英国议会史项目',url:'https://historyofparliament.com/2020/11/26/readeption-parliament-henry-vi/',event:'henry-vi-return'},
    {date:'1471 年 4 月 14 日',title:'巴尼特战役',place:'巴尼特战场区域',coords:[51.662,-.200],person:'edward-iv',
      note:'爱德华四世返回英格兰并恢复王位。他在巴尼特击败沃里克，沃里克在战役中身亡。',
      source:'英格兰历史遗产局',url:'https://historicengland.org.uk/listing/the-list/list-entry/1000001'},
    {date:'1471 年 5 月 4 日',title:'图克斯伯里战役',place:'图克斯伯里南郊',coords:[51.983,-2.167],person:'edward-iv',
      note:'爱德华四世再次获胜。亨利六世的儿子威斯敏斯特的爱德华身亡，兰开斯特派失去其直接继承人。',
      source:'英格兰历史遗产局',url:'https://historicengland.org.uk/content/docs/listing/battlefields/tewkesbury/'},
    {date:'1483 年 7 月 6 日',title:'理查三世加冕',place:'威斯敏斯特教堂',coords:rosesWestminster,person:'richard-iii',
      note:'爱德华四世去世后，儿子爱德华五世继位但未加冕。叔父理查随后取得王位，并在威斯敏斯特加冕。',
      source:'威斯敏斯特教堂',url:'https://www.westminster-abbey.org/history/coronations-at-the-abbey/coronation-stories'},
    {date:'1485 年 8 月',title:'亨利·都铎在威尔士登陆',place:'米尔福德港一带',coords:[51.704,-5.095],person:'henry-vii',
      note:'亨利·都铎从法国流亡归来，在米尔福德港一带登陆，随后经什鲁斯伯里向英格兰中部推进。',
      source:'英格兰历史遗产局',url:rosesBosworth},
    {date:'1485 年 8 月 22 日',title:'博斯沃思战役',place:'莱斯特郡西部战场区域',coords:[52.596,-1.417],person:'henry-vii',
      note:'亨利·都铎获胜，理查三世阵亡。亨利即位为亨利七世，建立都铎王朝。此后约克派仍有反抗。',
      source:'英格兰历史遗产局',url:'https://historicengland.org.uk/listing/the-list/list-entry/1000004',event:'bosworth'},
    {date:'1485 年 10 月 30 日',title:'亨利七世加冕',place:'威斯敏斯特教堂',coords:rosesWestminster,person:'henry-vii',
      note:'亨利在威斯敏斯特教堂加冕。他通过母亲玛格丽特·博福特拥有兰开斯特血统，可上溯至爱德华三世之子冈特的约翰。',
      source:'威斯敏斯特教堂',url:rosesAbbey},
    {date:'1486 年 1 月',title:'与约克的伊丽莎白成婚',place:'威斯敏斯特',coords:rosesWestminster,person:'henry-vii',figure:'elizabeth-york',
      note:'亨利娶了爱德华四世的女儿约克的伊丽莎白。两人的婚姻使兰开斯特与约克的血统汇入都铎王室。',
      source:'威斯敏斯特教堂',url:rosesAbbey}
  ],
  routes:[{from:7, points:[[51.704,-5.095],[52.708,-2.755]], next:[52.596,-1.417],waypoint:'什鲁斯伯里'}]
};

registerSiteTranslations({
  [rosesStory.title]:'The Wars of the Roses and the Rise of the Tudors',
  [rosesStory.intro]:'1455–1486 · From the Lancaster–York struggle to Henry VII’s coronation and marriage to Elizabeth of York.',
  [rosesStory.credit]:'Dashes link documented locations in Henry Tudor’s 1485 march. Pins mark approximate sites on a modern basemap.',
  '查看玫瑰战争专题':'Explore the Wars of the Roses',
  '查看君主家谱':'View the royal family tree',
  '专题时间轴':'Story timeline',
  '什鲁斯伯里':'Shrewsbury',
  '诺曼征服事件地图':'Map of the Norman Conquest'
});
[
  ['First Battle of St Albans','St Albans','Richard, Duke of York, and the Earl of Warwick defeated the royal army at St Albans. Henry VI remained king, with the Yorkists gaining influence over his government.'],
  ['Parliament names York as heir','Westminster','Richard, Duke of York, laid claim to the crown. Parliament agreed that Henry VI would remain king, with Richard and his descendants named to inherit in place of Henry’s son. Richard died at Wakefield that year.'],
  ['Battle of Towton','Towton, North Yorkshire','Richard’s son Edward had already taken the throne in London. His defeat of the Lancastrian army at Towton consolidated his rule. Henry VI was still alive, and the struggle continued.'],
  ['Henry VI restored','Tower of London','Warwick, who had backed Edward IV, switched his allegiance to Henry VI. Edward fled and Henry left the Tower of London to reign again briefly.'],
  ['Battle of Barnet','Barnet battlefield area','Edward IV returned to England and regained the crown. He defeated Warwick at Barnet, where Warwick was killed.'],
  ['Battle of Tewkesbury','South of Tewkesbury','Edward IV won again. Henry VI’s son, Edward of Westminster, was killed, leaving the Lancastrians without their direct heir.'],
  ['Richard III crowned','Westminster Abbey','Edward IV’s son Edward V succeeded him but was never crowned. His uncle Richard took the crown and was crowned at Westminster.'],
  ['Henry Tudor lands in Wales','Milford Haven area','Returning from exile in France, Henry Tudor landed near Milford Haven and advanced through Shrewsbury towards the English Midlands.'],
  ['Battle of Bosworth','Battlefield area, western Leicestershire','Henry Tudor won and Richard III was killed. Henry became Henry VII, founding the Tudor dynasty. Yorkist resistance continued.'],
  ['Henry VII crowned','Westminster Abbey','Henry was crowned at Westminster Abbey. His mother, Margaret Beaufort, traced her Lancastrian descent to John of Gaunt, a son of Edward III.'],
  ['Marriage to Elizabeth of York','Westminster','Henry married Edward IV’s daughter, Elizabeth of York. Their marriage brought the Lancastrian and Yorkist lines together in the Tudor royal family.']
].forEach(([title,place,note], index) => {
  const step = rosesStory.steps[index];
  registerSiteTranslations({[step.title]:title,[step.place]:place,[step.note]:note});
});
