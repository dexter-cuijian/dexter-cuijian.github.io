const earlyMedievalSource = 'https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/';
const saxonKingsSource = 'https://www.royal.uk/saxon-kings';

const earlyChapters = [
  {
    house:['roman-britain','罗马不列颠','Roman Britain','43–约 410'],
    note:['罗马拱门','章节标志 · 取意于罗马建筑遗迹。','公元 43 年，罗马发动全面入侵。此后数世纪，罗马在不列颠部分地区修建道路、城镇和边防工事。5 世纪初，罗马帝国对当地的直接行政管理走向终结。','https://www.english-heritage.org.uk/learn/story-of-england/romans/introduction/']
  },
  {
    house:['early-kingdoms','早期诸国与维京时代','Early Kingdoms and the Viking Age','约 410–924'],
    note:['船首与海浪','章节标志 · 示意跨海迁徙与航行。','罗马统治结束后，不列颠逐渐出现多个政权。肯特、麦西亚和威塞克斯等王国先后兴盛。8 世纪末起，维京袭击和随后建立的定居点改变了权力格局。',earlyMedievalSource]
  },
  {
    house:['early-england','早期英格兰王国','Early Kingdom of England','924–1066'],
    note:['银便士','章节标志 · 取意于早期英格兰银币。','埃塞尔斯坦取得约克后，英格兰王国的统一逐步成形。此后王位在威塞克斯王室和丹麦王室之间转换，至 1066 年再次陷入争夺。',saxonKingsSource]
  }
];

const earlyMonarchs = [
  ['aethelberht','埃塞尔伯特','Æthelberht of Kent','约 589–616',1,589,'肯特国王，迎接奥古斯丁使团。','肯特国王','https://www.english-heritage.org.uk/visit/places/st-augustines-abbey/history-and-stories/history/','统治肯特。通过与法兰克公主贝尔塔联姻，与欧洲大陆保持联系。','597 年接纳奥古斯丁使团。后来皈依基督教，为坎特伯雷成为宗教中心奠定基础。'],
  ['alfred','阿尔弗雷德大帝','Alfred the Great','871–899',1,871,'威塞克斯国王，878 年击败古斯鲁姆。','威塞克斯国王','https://www.royal.uk/alfred-great-r-871-899','在兄长去世后继承威塞克斯王位。当时维京军队已夺取英格兰多地。','在埃丁顿击败古斯鲁姆，整顿城防，并推动将拉丁文著作译成古英语。'],
  ['edward-elder','长者爱德华','Edward the Elder','899–924',1,899,'继承阿尔弗雷德的王位。','威塞克斯国王','https://www.royal.uk/edward-elder-r-899-924','阿尔弗雷德之子。继位后与统治麦西亚的姐姐埃塞尔弗莱德协作。','建设设防据点，逐步夺取丹麦人控制的中部和东部地区，为其子埃塞尔斯坦进一步统一打下基础。'],
  ['athelstan','埃塞尔斯坦','Athelstan','924–939',2,924,'927 年取得约克，当时英格兰王国开始统一。',null,'https://www.royal.uk/athelstan-r924-939','长者爱德华之子，925 年加冕。早年与麦西亚关系密切。','927 年取得约克，将英格兰北部纳入其统治。937 年在布鲁南堡击败苏格兰与维京势力组成的联军。'],
  ['edgar','埃德加','Edgar the Peaceful','959–975',2,959,'973 年在巴斯举行加冕礼。',null,'https://www.royal.uk/edgar-r-959-975','埃德蒙一世之子，继兄长埃德威格之后统治全英格兰。','支持邓斯坦等人的修道院改革。973 年的巴斯加冕礼留下详细记录，对后来的加冕传统有影响。'],
  ['aethelred-ii','埃塞尔雷德二世','Æthelred II','978–1013 · 1014–1016',2,978,'斯文入侵时流亡，次年复位。',null,saxonKingsSource,'在异母兄长殉教者爱德华遇害后继位。斯文于 1013 年夺取英格兰，埃塞尔雷德次年返回。','其统治经历多次维京进攻。991 年莫尔登战役后，王室向袭击者支付贡金。'],
  ['edmund-ironside','刚勇者埃德蒙二世','Edmund II Ironside','1016',2,1016,'与克努特争夺王位。',null,saxonKingsSource,'埃塞尔雷德二世之子，父亲去世后在伦敦获拥立。','与克努特多次交战，最终达成分治安排。同年去世后，克努特成为全英格兰国王。'],
  ['cnut','克努特大帝','Cnut the Great','1016–1035',2,1016.1,'丹麦王室进入英格兰。','丹麦王室','https://www.royal.uk/canute-great-r-1016-1035','丹麦国王斯文之子。刚勇者埃德蒙去世后，克努特成为无争议的英格兰国王。','先后统治英格兰、丹麦和挪威。与诺曼底的埃玛结婚，并保留和运用不少英格兰既有的治理制度。'],
  ['edward-confessor','忏悔者爱德华','Edward the Confessor','1042–1066',2,1042,'主持重建威斯敏斯特教堂。',null,'https://www.royal.uk/edward-iii-confessor-r-1042-1066','埃塞尔雷德二世之子，曾长期在诺曼底居住。1042 年继承同母异父兄弟哈德克努特的王位。','重建威斯敏斯特教堂。1066 年 1 月无子嗣去世，继承争议引发各方争夺。'],
  ['harold-ii','哈罗德二世','Harold II','1066 年 1–10 月',2,1066,'在斯坦福桥获胜后南下迎击威廉。',null,'https://www.royal.uk/harold-ii-r-jan-oct-1066','出身戈德温家族，在忏悔者爱德华去世后取得英格兰王位。','于斯坦福桥击败挪威国王哈拉尔德三世，随后赶赴南部，在黑斯廷斯战役中阵亡。']
].map(([id,cn,en,reign,house,year,note,tag,source,life,deeds]) => ({id,cn,en,reign,house,year,note,tag,source,life,deeds}));

const earlyEvents = [
  ['roman-invasion','罗马入侵不列颠','43',0,43,'克劳狄一世派军渡海。里奇伯勒留下早期罗马军营遗迹，是主要登陆地点之一的有力候选。',[],'war','英格兰遗产委员会','https://www.english-heritage.org.uk/learn/story-of-england/romans/invasion','肯特里奇伯勒（可能的早期登陆地点）',[51.294,1.332]],
  ['hadrians-wall','哈德良长城开建','122',0,122,'罗马沿不列颠北部修建长城，随后在沿线增加军营与堡垒。胡斯泰兹是沿线的代表遗址。',[],'society','英格兰遗产委员会','https://www.english-heritage.org.uk/visit/places/housesteads-roman-fort-hadrians-wall/history/','胡斯泰兹罗马堡（长城沿线遗址）',[55.013,-2.331]],
  ['roman-rule-ends','罗马统治结束','约 410',1,410,'5 世纪初，不列颠与罗马帝国行政体系分离。传统上约以 410 年为界，转变涉及多个地区与过程。',[],'crown','英格兰遗产委员会','https://www.english-heritage.org.uk/visit/inspire-me/why-did-the-romans-leave-britain/'],
  ['augustine-mission','奥古斯丁抵达肯特','597',1,597,'奥古斯丁使团在萨尼特登陆，得到肯特国王埃塞尔伯特接纳，随后以坎特伯雷为传教中心。',['aethelberht'],'society','英格兰遗产委员会','https://www.english-heritage.org.uk/visit/places/st-augustines-abbey/history-and-stories/history/','肯特萨尼特岛一带（登陆区域）',[51.356,1.382]],
  ['sutton-hoo','萨顿胡船葬','约 625',1,625,'一座装有大量珍贵随葬品的船葬见证了东盎格利亚王国的地位。墓主人身份尚无定论。',[],'society','大英博物馆','https://www.britishmuseum.org/sites/default/files/2021-05/large_print_guide_room_41.pdf','萨福克萨顿胡遗址',[52.089,1.339]],
  ['lindisfarne-raid','林迪斯法恩遇袭','793',1,793,'维京袭击者掠夺林迪斯法恩修道院。这是有明确日期记载的早期袭击之一。',[],'war','英格兰遗产委员会','https://www.english-heritage.org.uk/visit/places/lindisfarne-priory/history/viking-raid/','林迪斯法恩岛修道院',[55.669,-1.801],'793 年 6 月 8 日'],
  ['viking-york','维京军队夺取约克','866',1,866,'维京大军占领约克，这座城市随后成为北英格兰的重要维京统治与贸易中心。',[],'war','约克博物馆信托','https://www.yorkmuseumstrust.org.uk/blog/from-buckles-to-board-games-discovering-the-timeless-objects-of-viking-yorkshire/','约克',[53.96,-1.08]],
  ['edington','埃丁顿战役','878',1,878,'威塞克斯国王阿尔弗雷德击败维京首领古斯鲁姆，稳定了威塞克斯的局势。',['alfred'],'war','英格兰遗产委员会','https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/','威尔特郡埃丁顿一带（传统战场）',[51.279,-2.107]],
  ['unified-england','埃塞尔斯坦取得约克','927',2,927,'埃塞尔斯坦取得约克，英格兰北部和南部首次置于同一君主统治。此后约克的归属仍数次反复。',['athelstan'],'crown','英国王室','https://www.royal.uk/athelstan-r924-939','约克',[53.96,-1.08]],
  ['brunanburh','布鲁南堡战役','937',2,937,'埃塞尔斯坦击败来自苏格兰和都柏林等地的联军，巩固王权。这场战役的具体遗址仍有争议。',['athelstan'],'war','英国王室','https://www.royal.uk/athelstan-r924-939'],
  ['edgar-coronation','埃德加在巴斯加冕','973',2,973,'坎特伯雷大主教邓斯坦在巴斯为埃德加加冕。仪式细节留存于史料，并影响后世加冕典礼。',['edgar'],'crown','英格兰遗产委员会','https://www.english-heritage.org.uk/learn/histories/coronations-what-to-look-out-for/','巴斯修道院所在地',[51.381,-2.359]],
  ['maldon','莫尔登战役','991',2,991,'维京军队在埃塞克斯登陆，击败当地英军。英格兰随后向袭击者支付贡金。',['aethelred-ii'],'war','英格兰历史遗产局','https://historicengland.org.uk/listing/the-list/list-entry/1000019','莫尔登附近布莱克沃特河口（战场区域）',[51.719,0.713],'991 年 8 月 10 日'],
  ['assandun','阿桑敦战役','1016',2,1016.05,'克努特击败埃德蒙二世，双方随后达成分治。阿桑敦究竟对应埃塞克斯的哪个地点，仍有争议。',['edmund-ironside','cnut'],'war','英格兰历史遗产局','https://historicengland.org.uk/listing/heritage-gateway/results/record/47e876d1-227a-40b9-af73-135787c45ed2/MEX1010838'],
  ['westminster-1065','威斯敏斯特新教堂奉献','1065',2,1065,'忏悔者爱德华主持重建的教堂在 1065 年末举行奉献礼。次年 1 月，他被安葬在这里。',['edward-confessor'],'society','威斯敏斯特教堂','https://www.westminster-abbey.org/media/k2theug0/st-edward-the-confessor-factsheet-docx.pdf','威斯敏斯特教堂',[51.4993,-0.1273],'1065 年 12 月 28 日'],
  ['stamford-bridge','斯坦福桥战役','1066',2,1066.05,'哈罗德二世在约克附近击败挪威国王哈拉尔德三世的军队。数周后，他南下迎战诺曼军队。',['harold-ii'],'war','英格兰遗产委员会','https://www.english-heritage.org.uk/learn/histories/1066-and-the-norman-conquest/northern-battles-1066/','约克以东斯坦福桥一带（战场区域）',[53.989,-0.914],'1066 年 9 月 25 日']
].map(([id,cn,reign,house,year,note,people,category,sourceName,source,place,coords,date]) =>
  ({id,cn,reign,house,year,note,people,category,sourceName,source,place,coords,date,event:true}));
