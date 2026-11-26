// Guide copy follows the royal chronologies, with parliamentary sources for constitutional events.
const royalIndex='https://www.royal.uk/kings-and-queens-1066';
const houseSources=[
  ...earlyChapters.map(chapter => chapter.note[3]),
  'https://www.royal.uk/normans',
  'https://www.royal.uk/english-monarchs-ad-400-1603',
  'https://www.royal.uk/lancastrians',
  'https://www.royal.uk/yorkists',
  'https://www.royal.uk/tudors',
  'https://www.royal.uk/stuarts',
  'https://www.royal.uk/hanoverians',
  'https://www.royal.uk/edward-vii',
  'https://www.royal.uk/house-windsor'
];

const biographies = {
  ...Object.fromEntries(earlyMonarchs.map(({id,life,deeds}) => [id,[life,deeds]])),
  'william-i':['原为诺曼底公爵。英格兰王位在 1066 年出现争夺，他渡海击败哈罗德二世，同年加冕。','重分土地并兴建城堡，巩固诺曼统治。下令调查土地与财富，留下《末日审判书》。'],
  'william-ii':['威廉一世之子，因绰号 Rufus 又称「红脸威廉」。父亲去世后，他继承英格兰，兄长罗贝尔获得诺曼底。','曾压制支持罗贝尔的叛乱。1100 年在新森林狩猎时中箭身亡，弟弟亨利随即继位。'],
  'henry-i':['威廉一世幼子，在威廉二世死后取得英格兰王位。独子威廉在白船沉没后，他指定女儿玛蒂尔达为继承人。','登基时颁布《自由宪章》。1106 年击败兄长罗贝尔，再度将英格兰与诺曼底置于同一统治者之下。'],
  'stephen':['威廉一世的外孙，在舅父亨利一世去世后即位，与玛蒂尔达争夺王位。','内战延续多年。1153 年达成继承协议，保留斯蒂芬王位，并由玛蒂尔达之子亨利继承。'],
  'matilda':['亨利一世之女，曾嫁给神圣罗马皇帝亨利五世。亨利一世去世后，她主张继承英格兰王位。','1141 年斯蒂芬被俘后，她一度掌握政局并获称「英格兰人的女主人」，但未加冕。其子后来即位为亨利二世。'],
  'henry-ii':['玛蒂尔达与安茹伯爵若弗鲁瓦之子。妻子阿基坦的埃莉诺带来的领地使家族势力横跨英吉利海峡。','发展王室司法体系。与坎特伯雷大主教托马斯·贝克特的冲突，以贝克特于 1170 年遇害告终。'],
  'richard-i':['亨利二世与阿基坦的埃莉诺之子，绰号「狮心王」。即位后大部分时间在英格兰以外度过。','领导第三次十字军东征。返程时被俘，获赎后继续在法国作战，1199 年伤重去世。'],
  'john':['理查一世的弟弟。即位后与法国国王腓力二世作战，失去诺曼底等法兰西领地。','与贵族的冲突促成 1215 年《大宪章》。协议破裂后内战延续，约翰于次年去世。'],
  'henry-iii':['约翰之子，9 岁即位，早年由摄政者主持政府。长期统治中，王室财政和贵族改革要求时有冲突。','主持重建威斯敏斯特教堂。西蒙·德·蒙福尔起兵后，王党在 1265 年伊夫舍姆战役中恢复控制。'],
  'edward-i':['亨利三世之子，早年参加十字军东征。继位后加强王室行政，并将军力投向不列颠内外。','征服威尔士，后又介入苏格兰王位争端。1295 年召集后来被称为「模范议会」的议会。'],
  'edward-ii':['爱德华一世之子。他对亲信的倚重加剧了与贵族的冲突，王后伊莎贝拉后来支持反对派。','1314 年败于苏格兰的罗伯特·布鲁斯，随后于 1327 年被废，由儿子爱德华三世继位。'],
  'edward-iii':['少年时继位，早年由母亲伊莎贝拉与莫蒂默控制政局，后夺回实权。','对法国王位提出主张，百年战争由此展开。其统治也经历了 1348 年起席卷英格兰的黑死病。'],
  'richard-ii':['黑太子爱德华之子、爱德华三世之孙，幼年继位。1381 年农民起义时，他曾直接与起义者会面。','与部分贵族长期冲突。1399 年，流亡归来的堂兄亨利·博林布鲁克废黜了他。'],
  'henry-iv':['冈特的约翰之子。1399 年从流亡中返回，取代理查二世，成为第一位兰开斯特君王。','在位期间面对威尔士的欧文·格林杜尔起义，以及珀西家族等贵族的挑战。'],
  'henry-v':['亨利四世之子，登基后恢复英格兰对法国的大规模攻势。','1415 年赢得阿金库尔战役，1420 年《特鲁瓦条约》承认其法国王位继承权；他却先于法国国王去世。'],
  'henry-vi':['亨利五世之子，襁褓中即位。成年后政局由不同贵族集团争夺，英格兰也失去了绝大部分在法领地。','创办伊顿公学与剑桥大学国王学院。玫瑰战争中两次失去王位，1470 至 1471 年间曾短暂复位。'],
  'edward-iv':['约克公爵理查之子，在玫瑰战争中击败兰开斯特一方，于 1461 年夺取王位。','1470 年一度流亡，次年击败复位的亨利六世一方并重掌王位。1483 年去世后，其子爱德华五世短暂继位。'],
  'edward-v':['爱德华四世长子，12 岁时继位。叔父格洛斯特公爵理查随后掌握政局。','他与弟弟进入伦敦塔后失去可靠记载。爱德华未加冕，王位转归理查三世，两兄弟的命运至今未明。'],
  'richard-iii':['爱德华四世之弟，原为格洛斯特公爵。1483 年任爱德华五世的护国公，随后取代侄子登基。','在位期间首次出现完全以英语写成的法令。1485 年在博斯沃思战役中败于亨利·都铎并战死。'],
  'henry-vii':['经母系拥有兰开斯特血统。1485 年击败理查三世即位，后与约克的伊丽莎白结婚。','建立都铎王朝，通过财政管理与婚姻外交稳固王位。1497 年资助约翰·卡伯特向北美航行。'],
  'henry-viii':['亨利七世次子，兄长亚瑟去世后成为继承人。与阿拉贡的凯瑟琳的婚姻争端推动了英国宗教政治的转折。','1534 年议会通过《至尊法案》，确认君主为英格兰教会最高首领。随后解散修道院；一生共有六段婚姻。'],
  'edward-vi':['亨利八世与简·西摩之子，9 岁即位。先后由萨默塞特公爵与诺森伯兰公爵主导政务。','在位期间推进新教改革，颁行《公祷书》。去世前试图将王位传给简·格雷。'],
  'jane-grey':['亨利七世的曾外孙女，被爱德华六世指定为继承人，于 1553 年 7 月被宣布为女王。','玛丽一世赢得枢密院支持后取得王位。简的争议统治通常称为「九日」。她于次年被处决。'],
  'mary-i':['亨利八世与阿拉贡的凯瑟琳之女，在击败简·格雷一方后取得王位，后与西班牙的腓力结婚。','恢复英格兰与罗马教廷的关系，并迫害部分新教徒。在位末期，英格兰失去法国的加来。'],
  'elizabeth-i':['亨利八世与安妮·博林之女，继半姐玛丽一世登基。未婚、无子女，是最后一位都铎君主。','1559 年推行宗教和解，重立英格兰教会。1588 年西班牙无敌舰队来袭失败，成为其统治的重要节点。'],
  'james-i':['苏格兰女王玛丽之子，原为苏格兰国王詹姆斯六世。1603 年继承英格兰王位，两个王国开始共主。','在位期间发生 1605 年火药阴谋，并推动出版 1611 年《英王钦定本圣经》。'],
  'charles-i':['詹姆斯一世之子，长期与议会围绕征税、宗教和王权发生冲突。','1642 年英格兰内战爆发。王党战败后，他于 1649 年受审并被处决，君主制一度废除。'],
  'charles-ii':['查理一世之子，流亡多年后在 1660 年君主制复辟中返回英格兰。','在位期间经历 1665 年伦敦大瘟疫与 1666 年伦敦大火，重建改变了伦敦面貌。'],
  'james-ii':['查理二世的弟弟，信奉天主教。其宗教政策与 1688 年天主教男性继承人的出生，引发新一轮政治冲突。','光荣革命中，荷兰的威廉登陆，詹姆斯逃往法国。英格兰王位随后由玛丽与威廉共同继承。'],
  'william-iii':['荷兰奥兰治亲王，妻子玛丽是詹姆斯二世之女。1688 年登陆英格兰，次年与玛丽共治。','1689 年《权利法案》限制王权。玛丽于 1694 年去世后，由威廉独自执政至 1702 年。'],
  'mary-ii':['詹姆斯二世长女，依新教信仰长大，嫁给奥兰治亲王威廉。光荣革命后，两人共同登基。','威廉出征时，玛丽负责国内政务。她于 1694 年死于天花，威廉此后单独统治。'],
  'anne':['詹姆斯二世之女、玛丽二世的妹妹，1702 年继承王位，是斯图亚特王朝最后一位君主。','1707 年英格兰与苏格兰正式合并为大不列颠王国。她去世后，王位按继承法转入汉诺威王朝。'],
  'george-i':['原为汉诺威选帝侯。1714 年依据新教王位继承规则继承安妮的王位，同时继续统治汉诺威。','在位初期经历 1715 年詹姆斯党起义。罗伯特·沃波尔后来成为政府中最重要的大臣。'],
  'george-ii':['乔治一世之子，继承大不列颠王位与汉诺威选帝侯头衔。','在位期间，1745 年詹姆斯党起义于次年的卡洛登战役后失败。英国也在其统治末期参与七年战争。'],
  'george-iii':['乔治二世之孙，1760 年即位。他晚年长期患病，由儿子于 1811 年起摄政。','在位期间北美十三殖民地取得独立。1801 年大不列颠与爱尔兰联合，英国亦参与对拿破仑的战争。'],
  'george-iv':['乔治三世长子，1811 年起担任摄政王，1820 年继位。以宫廷风格和对艺术建筑的赞助闻名。','推动布莱顿皇家行宫的改造。1829 年，在政治压力下批准《天主教解放法案》。'],
  'william-iv':['乔治四世的弟弟，早年在皇家海军服役，兄长无存活婚生子女，故由他继位。','在位期间通过 1832 年《改革法案》和 1833 年《废除奴隶制法案》。王位随后由侄女维多利亚继承。'],
  'victoria':['威廉四世的侄女，18 岁即位。1840 年与阿尔伯特亲王结婚，后者去世后长期服丧。','在位时期，工业化与帝国扩张深刻改变英国。1876 年获授印度女皇称号。'],
  'edward-vii':['维多利亚女王与阿尔伯特亲王长子，1901 年继位时已近 60 岁。','在位期间英国与法国签订 1904 年《英法协约》，两国缓和许多殖民争端。'],
  'george-v':['爱德华七世之子，年轻时在海军服役。他在第一次世界大战及战间期担任君主。','1917 年将王室名称从萨克森-科堡-哥达改为温莎，同一位君主继续统治至 1936 年。'],
  'edward-viii':['乔治五世长子，于 1936 年继位。他希望迎娶美国人沃利斯·辛普森，引发宪政危机。','同年签署退位文书，由弟弟乔治六世继位。此后获封温莎公爵。'],
  'george-vi':['乔治五世次子，原为约克公爵，因哥哥退位于 1936 年即位。','第二次世界大战期间与王后留在英国，主持战时王室公务。其长女伊丽莎白于 1952 年继位。'],
  'elizabeth-ii':['乔治六世长女，于 1952 年继位，1953 年加冕。她在位逾 70 年，于 2022 年去世。','在战后去殖民化与英联邦转型期间长期担任英联邦元首。1953 年加冕典礼首次通过电视直播。'],
  'charles-iii':['伊丽莎白二世长子，曾任威尔士亲王多年。于 2022 年 9 月 8 日继位，2023 年 5 月加冕。','即位前创建或推动多项慈善计划，包括支持年轻人就业与创业的王子信托基金，并长期关注环境保护。']
};

const specialBiographySources={
  ...Object.fromEntries(earlyMonarchs.map(({id,source}) => [id,source])),
  'richard-iii':'https://www.royal.uk/richard-iii',
  'elizabeth-ii':'https://www.royal.uk/her-majesty-the-queen',
  'charles-iii':'https://www.royal.uk/the-king'
};

const extraGuideEvents = [
  ['domesday','《末日审判书》','1086',0,1086,'威廉一世组织土地与财产调查，为征税与行政留下记录。','https://www.nationalarchives.gov.uk/explore-the-collection/stories/domesday-book/'],
  ['becket','托马斯·贝克特遇害','1170',1,1170,'坎特伯雷大主教贝克特与亨利二世长期冲突，最终在大教堂内被杀。','https://www.royal.uk/english-monarchs-ad-400-1603'],
  ['model-parliament','「模范议会」','1295',1,1295,'爱德华一世召集议会，邀请郡和城镇代表，与贵族与教士同席。','https://www.parliament.uk/about/living-heritage/evolutionofparliament/originsofparliament/birthofparliament/'],
  ['bannockburn','班诺克本战役','1314',1,1314,'罗伯特·布鲁斯击败爱德华二世的军队，巩固苏格兰独立。','https://www.royal.uk/english-monarchs-ad-400-1603'],
  ['hundred-years','百年战争开始','1337',1,1337,'爱德华三世与法国王室的争端演变为长期战争。','https://www.royal.uk/english-monarchs-ad-400-1603'],
  ['black-death','黑死病抵达英格兰','1348',1,1348,'鼠疫造成大量人口死亡，深刻改变劳动力与庄园经济。','https://www.nationalarchives.gov.uk/education/resources/black-death/'],
  ['peasants','英格兰农民起义','1381',1,1381,'人头税等矛盾引发起义。年少的理查二世曾在伦敦与起义者会面。','https://www.royal.uk/english-monarchs-ad-400-1603'],
  ['agincourt','阿金库尔战役','1415',2,1415,'亨利五世的军队在百年战争中击败法军。','https://www.royal.uk/lancastrians'],
  ['armada','西班牙无敌舰队来袭','1588',4,1588,'西班牙舰队未能实现入侵英格兰的计划。','https://www.royal.uk/elizabeth-i'],
  ['civil-war','英格兰内战爆发','1642',5,1642,'查理一世与议会的争端升级为战争，最终改变王权与议会的关系。','https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/civilwar/'],
  ['restoration','君主制复辟','1660',5,1660,'查理二世返回英格兰，结束共和时期。','https://www.royal.uk/stuarts'],
  ['great-fire','伦敦大火','1666',5,1666,'大火摧毁伦敦城大片地区，随后展开城市重建。','https://www.royal.uk/stuarts'],
  ['bill-rights','《权利法案》','1689',5,1689.2,'议会明确限制君主在法律、税收和军事等方面的权力。','https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/keydates/keydates1689-1714/'],
  ['american-independence','美国发表《独立宣言》','1776',6,1776,'北美十三殖民地宣布独立。英国在 1783 年正式承认美国独立。','https://www.archives.gov/founding-docs/declaration'],
  ['waterloo','滑铁卢战役','1815',6,1815,'威灵顿公爵率领的联军与普鲁士军队击败拿破仑，结束其百日统治。','https://www.nam.ac.uk/explore/battle-waterloo'],
  ['reform-act','《改革法案》','1832',6,1832,'议席重新分配，选举资格有所扩大。','https://www.parliament.uk/about/living-heritage/evolutionofparliament/houseofcommons/reformacts/'],
  ['world-war-i','英国加入第一次世界大战','1914',7,1914,'英国在德国入侵比利时后向德国宣战。战时，乔治五世将王室名称改为温莎。','https://www.iwm.org.uk/history/how-britain-entered-the-first-world-war'],
  ['world-war-ii','英国加入第二次世界大战','1939',8,1939,'德国入侵波兰后，英国向德国宣战。乔治六世通过广播向全国讲话。','https://www.iwm.org.uk/history/how-britain-and-poland-came-to-be-at-war-with-germany-in-1939'],
  ['ve-day','欧洲胜利日','1945',8,1945,'德国投降后，英国于 5 月 8 日庆祝欧洲战事结束。','https://www.iwm.org.uk/history/what-you-need-to-know-about-ve-day'],
  ['elizabeth-coronation','伊丽莎白二世加冕','1953',8,1953,'6 月 2 日在威斯敏斯特教堂加冕。典礼通过电视转播。','https://www.royal.uk/50-facts-about-queens-coronation'],
  ['charles-coronation','查尔斯三世加冕','2023',8,2023,'查尔斯三世与卡米拉于 5 月 6 日在威斯敏斯特教堂举行加冕典礼。','https://www.royal.uk/100-coronation-facts']
].map(([id,cn,reign,house,year,note,source])=>({id,cn,reign,house:house + earlyChapters.length,year,note,source,event:true}));

const dynastyNotes = [
  ...earlyChapters.map(chapter => chapter.note),
  ['诺曼双狮','采用后来流传的诺曼底双狮纹样，作为本章地域标志。','1066 年诺曼征服将英格兰与诺曼底紧密相连。城堡建设、土地重新分配与《末日审判书》重塑了地方统治；末期的继承内战则开启了新王朝。','https://www.normandie-cabourg-paysdauge-tourisme.fr/en/a-faire/culture/guillaume-le-conquerant/tout-savoir-sur-le-drapeau-normand/'],
  ['英格兰三狮','取自中世纪英格兰王室纹章。','亨利二世与阿基坦的埃莉诺使王室拥有大片跨海领地。此后，《大宪章》、议会发展、百年战争和黑死病先后改变了王权与社会。','https://www.royal.uk/coats-arms'],
  ['兰开斯特红玫瑰','后世常以红玫瑰代表兰开斯特一支。','亨利四世在 1399 年取得王位。亨利五世在法国获胜，亨利六世统治时期却逐步丢失战果，家族也在玫瑰战争中与约克争夺王位。','https://www.royal.uk/yorkists'],
  ['约克白玫瑰','与约克一支相联系的白玫瑰徽记。','玫瑰战争中，爱德华四世两度取得王位。其子爱德华五世短暂继位，随后由理查三世统治。1485 年博斯沃思战败后，王位转入都铎家族。','https://www.royal.uk/yorkists'],
  ['都铎玫瑰','红白玫瑰结合，象征都铎对约克与兰开斯特的联合。','亨利七世建立王朝，亨利八世推动英格兰教会与罗马决裂。从爱德华六世到玛丽一世、伊丽莎白一世，宗教政策再次转向，王朝最终在 1603 年结束。','https://www.shop.parliament.uk/products/copy-of-house-of-lords-tudor-rose-brooch'],
  ['苏格兰蓟花','以苏格兰徽记示意斯图亚特的家族渊源。','詹姆斯六世于 1603 年继承英格兰王位，两国开始共主。随后经历内战、共和、复辟与光荣革命。安妮在位期间，英格兰与苏格兰于 1707 年合并。','https://www.royal.uk/coats-arms'],
  ['汉诺威白马','取自与汉诺威家族相关的白马徽记。','乔治一世依据新教继承规则即位。英国在这一时期经历美国独立、与爱尔兰联合、议会改革与工业化。王朝最后一位君主是维多利亚女王。','https://artcollection.dcms.gov.uk/artwork/4852/'],
  ['萨克森黑金纹样','以家族所属韦廷传统的黑金条纹与绿色芸香环示意。','维多利亚的儿子爱德华七世承继王位，从父系沿用萨克森-科堡-哥达家族名称。第一次世界大战期间，乔治五世在 1917 年改用温莎之名。','https://www.freistaat.sachsen.de/wappen-und-flaggen-3916.html'],
  ['温莎冠饰','本站以王冠作章标，示意英国现代君主制。','乔治五世于 1917 年定名温莎家族。此后经历爱德华八世退位、第二次世界大战、英联邦转型，以及伊丽莎白二世逾七十年的统治。查尔斯三世于 2022 年继位。','https://www.royal.uk/house-windsor']
];

function dynastyBadge(id) {
  return `<svg class="dynasty-badge" viewBox="0 0 64 64" aria-hidden="true"><use href="assets/dynasties.svg#${id}"></use></svg>`;
}

function dynastyIntroduction(index) {
  const [id] = houses[index];
  const [emblem,caption,description,reference] = dynastyNotes[index];
  return `<div class="dynasty-introduction">
    <figure>${dynastyBadge(id)}<figcaption><strong>${emblem}</strong><p>${caption}</p>${sourceNote(index < earlyChapters.length ? '时期资料' : '纹章资料',reference)}</figcaption></figure>
    <p>${description}</p>
  </div>`;
}
