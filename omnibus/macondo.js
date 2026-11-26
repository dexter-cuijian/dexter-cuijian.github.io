const macondoNetflix = 'https://www.netflix.com/title/81087583';
const macondoPress = 'https://about.netflix.com/en/news/one-hundred-years-of-solitude-concludes-this-august';
const macondoBook = 'https://cdn.penguin.co.uk/dam-assets/books/9780241968581/9780241968581-sample.pdf';
const macondoPhotos = 'https://www.noticiascaracol.com/entretenimiento/fotos-asi-se-ven-los-personajes-de-cien-anos-de-soledad-en-la-serie-de-netflix-pr30';
const macondoPublisher = 'https://www.penguinrandomhouse.com/books/196323/cien-anos-de-soledad-50-aniversario--one-hundred-years-of-solitude-by-gabriel-garcia-marquez/';
const macondoAdaptation = 'https://www.netflix.com/tudum/articles/one-hundred-years-of-solitude-release-date-news-cast-trailer';
const macondoHistory = 'https://babel.banrepcultural.org/digital/collection/r_rendon/id/429/';
const macondoGaboGuide = 'https://centrogabo.org/tags/guia-de-visionado-de-la-serie-cien-anos-de-soledad';
const macondoNovelChapter = chapter => 'https://people.duke.edu/~garci/garcitextos/bilingues/GARCIA-MARQUEZ-G/CIEN-ANOS-SOLEDAD/CAP' + chapter + '.HTM';

const macondoCharacters = [
  ['patriarch','何塞·阿尔卡蒂奥·布恩迪亚','José Arcadio Buendía',1,'马孔多创立者','与表亲乌尔苏拉成婚并建立马孔多。对炼金术和吉卜赛人带来的发明着迷。','精神失常后被拴在院中栗树下，最终在那里度过余生。','Marco González／Diego Vásquez'],
  ['ursula','乌尔苏拉·伊瓜兰','Úrsula Iguarán',1,'布恩迪亚家族的主母','与丈夫建立马孔多。经营家庭生计，在子孙反复陷入冲突时维持这个家。','晚年失明，依靠对房屋和家人的熟悉生活，在高龄时去世。','Susana Morales／Marleyda Soto'],
  ['melquiades','梅尔基亚德斯','Melquíades',1,'吉卜赛人、手稿作者','把磁铁、炼金术等带到马孔多，与创镇者成为朋友，留下羊皮卷。','去世后仍以幽灵形象出现在房间里。他留下的羊皮卷记录了家族的一生。','Moreno Borja'],
  ['jose-son','何塞·阿尔卡蒂奥','José Arcadio',2,'创镇者长子','与皮拉尔育有阿尔卡蒂奥。年轻时离开马孔多，回来后与丽贝卡结婚。','在家中中枪身亡，原著未揭明凶手。','Edgar Vittorino'],
  ['pilar','皮拉尔·特尔内拉','Pilar Ternera',2,'占卜者、两支血脉的母亲','她分别与兄弟何塞·阿尔卡蒂奥和奥雷里亚诺上校生下阿尔卡蒂奥与奥雷里亚诺·何塞。','年迈去世，按遗愿坐在藤椅中下葬。','Viña Machado'],
  ['rebeca','丽贝卡','Rebeca',2,'布恩迪亚家的养女','幼年被布恩迪亚家收养，有吃土的习惯。她和皮埃特罗订婚，引起养妹阿玛兰妲的嫉妒。她后来转而嫁给归来的何塞·阿尔卡蒂奥，两姐妹的嫌隙并未就此消散。','丈夫死后长期闭门生活，最终在与世隔绝中去世。','Laura Grueso'],
  ['colonel','奥雷里亚诺·布恩迪亚','Aureliano Buendía',2,'上校 · 创镇者次子','原是银匠，后来成为自由派军事领袖。他与蕾梅黛丝·莫斯科特结婚，与皮拉尔另有一子。','战争结束后回家反复制作小金鱼，最终在马孔多去世。','Claudio Cataño'],
  ['remedios-wife','蕾梅黛丝·莫斯科特','Remedios Moscote',2,'上校的妻子','地方行政官的女儿。她的婚姻将布恩迪亚家族和莫斯科特家族联系起来。','怀着一对双胞胎时突然去世，两个孩子都未能出生。'],
  ['amaranta','阿玛兰妲','Amaranta',2,'创镇者之女','爱上皮埃特罗后，她极力阻挠他与丽贝卡的婚事；皮埃特罗转而求婚时，她却拒绝了他，后来也拒绝了格里内尔多。','她终身未婚，临终前为自己织好寿衣。小说写她晚年仍然反复想起丽贝卡，姐妹间的旧怨始终没有消解。','Loren Sofía Paz'],
  ['pietro','皮埃特罗·克雷斯皮','Pietro Crespi',0,'意大利音乐家与商人','为布恩迪亚家安装自动钢琴，教两姐妹跳舞。与丽贝卡订婚，婚事告吹后渐渐亲近阿玛兰妲，并向她求婚。','阿玛兰妲拒绝求婚后，他自杀身亡。乌尔苏拉坚持为他举行葬礼。','Ruggero Pasquarelli'],
  ['gerineldo','格里内尔多·马尔克斯','Gerineldo Márquez',0,'自由派上校','奥雷里亚诺上校的好友与战友，跟随他参加内战。战事再紧，他也常去看阿玛兰妲；他的求婚最终被拒。','战后身患瘫痪，长期等待军人抚恤。小说写他的送葬队伍在大雨中经过布恩迪亚家的门前。','Edwin Zamorano（青年）／Enrique Poveda（成年）'],
  ['arcadio','阿尔卡蒂奥','Arcadio',3,'何塞·阿尔卡蒂奥与皮拉尔之子','由布恩迪亚家抚养。内战中暂管马孔多，并与圣索菲娅有三个孩子。','保守派夺回马孔多后，他被枪决。'],
  ['sofia','圣索菲娅·德拉彼达','Santa Sofía de la Piedad',3,'阿尔卡蒂奥的伴侣','生下美人儿蕾梅黛丝和双胞胎。多年亲手维持布恩迪亚家的日常生活。','年老后离开布恩迪亚家，从此没有再回来。'],
  ['aureliano-jose','奥雷里亚诺·何塞','Aureliano José',3,'上校与皮拉尔之子','由姑母阿玛兰妲照料，后来加入战争，又返回马孔多。','返回马孔多后，被保守派军官开枪打死。'],
  ['seventeen','十七个奥雷里亚诺','Los diecisiete Aurelianos',3,'上校在战争期间出生的儿子','上校与不同母亲生下的十七个儿子，名字都叫奥雷里亚诺。图中用一个节点合并呈现。','额头的灰十字成为辨认标记。他们先后遇害，最后幸存者多年后也被杀死。'],
  ['remedios-beauty','美人儿蕾梅黛丝','Remedios la Bella',4,'阿尔卡蒂奥之女','双胞胎的姐姐。她与上校妻子蕾梅黛丝·莫斯科特分属不同代际。','与家人收床单时升上天空，从此消失。'],
  ['jose-twin','何塞·阿尔卡蒂奥第二','José Arcadio Segundo',4,'双胞胎之一 · 香蕉工人组织者','他先与佩特拉交往，双胞胎兄弟一度利用长相相似也去见她。这段交往过后，他与佩特拉分开。后来，他参与组织香蕉工人并亲历镇上的屠杀。','幸存后躲入梅尔基亚德斯的房间，努力让后辈记住屠杀。与双胞胎兄弟同日去世。'],
  ['aureliano-twin','奥雷里亚诺第二','Aureliano Segundo',4,'双胞胎之一 · 费尔南达的丈夫','佩特拉起初把他认成何塞·阿尔卡蒂奥第二，他顺势隐瞒身份。后来两人成为长期伴侣，靠抽奖和畜牧发家；他与费尔南达结婚后仍与佩特拉相伴。','经历多年暴雨与家道衰败，后来病逝，与双胞胎兄弟同日去世。'],
  ['fernanda','费尔南达·德尔卡皮奥','Fernanda del Carpio',4,'奥雷里亚诺第二的妻子','把严格的宗教和家族规矩带进布恩迪亚家，是梅梅、何塞·阿尔卡蒂奥及阿玛兰妲·乌尔苏拉的母亲。','晚年孤居，丈夫去世后独自守着空荡的房子，最终在家中去世。'],
  ['petra','佩特拉·科特斯','Petra Cotes',4,'经营抽奖的商人 · 奥雷里亚诺第二的伴侣','她先与何塞·阿尔卡蒂奥第二交往，起初分不清长相相同的双胞胎。前一段关系很快结束；后来她与奥雷里亚诺第二长期相伴，靠抽奖与畜牧积累财富。','在家道衰败时仍照料奥雷里亚诺第二，原著没有刻画她的死亡。'],
  ['meme','蕾娜塔·蕾梅黛丝','Renata Remedios',5,'梅梅 · 费尔南达的长女','爱上香蕉公司的技工毛里西奥·巴比伦。两人的孩子是奥雷里亚诺·巴比伦。','被母亲送进修道院，其后长期保持沉默，最终客死异乡。'],
  ['mauricio','毛里西奥·巴比伦','Mauricio Babilonia',5,'香蕉公司技工、梅梅的恋人','与梅梅相恋。黄色蝴蝶反复伴随他的出现。','私会梅梅时中枪，瘫痪后过着孤独的生活，最终去世。'],
  ['jose-young','何塞·阿尔卡蒂奥','José Arcadio',5,'费尔南达之子 · 曾留学罗马','被家人送往罗马，希望他成为教士。他后来返回马孔多。与创镇者及其长子同名。','发现家中藏金后，被闯入家中的少年们溺死。'],
  ['amaranta-ursula','阿玛兰妲·乌尔苏拉','Amaranta Úrsula',5,'费尔南达的幼女 · 梅梅的妹妹','与丈夫加斯东从欧洲回到马孔多，想重整祖宅。后来与奥雷里亚诺·巴比伦相恋。','生下两人的孩子后，因产后出血去世。'],
  ['gaston','加斯东','Gastón',5,'阿玛兰妲·乌尔苏拉的丈夫','陪妻子从欧洲回到马孔多，尝试发展航空邮递。','回欧洲处理事务后，得知妻子的新恋情，从此没有返回马孔多。','Lucas Tavernier'],
  ['babilonia','奥雷里亚诺·巴比伦','Aureliano Babilonia',6,'梅梅之子 · 羊皮卷的解读者','在祖宅长大，与梅尔基亚德斯留下的手稿关系密切。与同名的上校相隔数代。','在最后时刻读懂羊皮卷，发现自己及整个家族早已写在其中。读到结尾时，马孔多被风暴摧毁。'],
  ['last','最后的奥雷里亚诺','Aureliano',7,'阿玛兰妲·乌尔苏拉与巴比伦之子','布恩迪亚家族最后一代，父亲与他使用相同的名字。','出生时带有猪尾巴。母亲死后无人照料，最终被蚂蚁拖走。']
].map(([id,cn,en,generation,reign,summary,outcome,actor]) => ({id,cn,en,generation,reign,summary,outcome,actor}));

const macondoPeople = new Map(macondoCharacters.map(person => [person.id,person]));
const macondoBylines = {
  patriarch:'创建马孔多，痴迷炼金术',
  ursula:'共同建镇，撑起布恩迪亚家',
  melquiades:'带来新发明，留下羊皮卷',
  'jose-son':'离家远行，返乡娶了丽贝卡',
  pilar:'占卜为生，连接两支血脉',
  rebeca:'小时候爱吃土',
  colonel:'从银匠成为自由派上校',
  'remedios-wife':'嫁给上校，联结两大家族',
  amaranta:'戴黑色手带，拒绝两次求婚',
  pietro:'带来钢琴，教两姐妹跳舞',
  gerineldo:'上校挚友，向阿玛兰妲求婚',
  arcadio:'内战中接管马孔多',
  sofia:'养育双胞胎，多年照料祖宅',
  'aureliano-jose':'由姑母养大，后来参加内战',
  seventeen:'上校的十七个同名儿子',
  'remedios-beauty':'以美貌闻名，在收床单时升天',
  'jose-twin':'组织香蕉工人，见证镇压',
  'aureliano-twin':'靠畜牧发家，家业随暴雨衰落',
  fernanda:'以严苛礼法管理布恩迪亚家',
  petra:'与奥雷里亚诺第二经营畜牧',
  meme:'爱上香蕉公司技工毛里西奥',
  mauricio:'香蕉公司技工，常伴黄色蝴蝶',
  'jose-young':'少年赴罗马，后来返回祖宅',
  'amaranta-ursula':'从欧洲归来，一心重整祖宅',
  gaston:'比利时飞行员，计划开通航空邮递',
  babilonia:'在祖宅长大，解读羊皮卷',
  last:'长猪尾巴的孩子'
};
const macondoEdges = [
  ['patriarch','ursula','succession','夫妻 · 表亲'], ['patriarch','melquiades','contest','朋友'],
  ...['patriarch','ursula'].flatMap(parent => [
    [parent,'jose-son','kin','长子'],[parent,'colonel','kin','次子'],[parent,'amaranta','kin','女儿'],[parent,'rebeca','contest','养女']
  ]),
  ['jose-son','rebeca','succession','夫妻'],['jose-son','pilar','succession','曾相恋'],
  ['amaranta','rebeca','contest','姐妹积怨'],
  ['pietro','rebeca','succession','曾订婚'],
  ['pietro','amaranta','contest','求婚遭拒'],
  ['gerineldo','amaranta','contest','求婚遭拒'],
  ['gerineldo','colonel','contest','好友 · 战友'],
  ['colonel','remedios-wife','succession','夫妻'],['colonel','pilar','succession','曾相恋'],
  ['jose-son','arcadio','kin','父子'],['pilar','arcadio','kin','母子'],
  ['colonel','aureliano-jose','kin','父子'],['pilar','aureliano-jose','kin','母子'],
  ['colonel','seventeen','kin','父子'],['arcadio','sofia','succession','伴侣'],
  ...['arcadio','sofia'].flatMap(parent => [
    [parent,'remedios-beauty','kin','女儿'],[parent,'jose-twin','kin','儿子'],[parent,'aureliano-twin','kin','儿子']
  ]),
  ['jose-twin','aureliano-twin','kin','双胞胎兄弟'],
  ['jose-twin','petra','succession','短暂交往'],
  ['aureliano-twin','fernanda','succession','夫妻'],['aureliano-twin','petra','succession','长期伴侣'],
  ...['aureliano-twin','fernanda'].flatMap(parent => [
    [parent,'meme','kin','女儿'],[parent,'jose-young','kin','儿子'],[parent,'amaranta-ursula','kin','女儿']
  ]),
  ['meme','mauricio','succession','恋人'],['meme','babilonia','kin','母子'],['mauricio','babilonia','kin','父子'],
  ['amaranta-ursula','gaston','succession','夫妻'],
  ['amaranta-ursula','babilonia','succession','姨甥 · 恋人'],
  ['amaranta-ursula','last','kin','母子'],['babilonia','last','kin','父子']
].map(([from,to,kind,label]) => ({from,to,kind,label,directed:false}));

const macondoFamilies = [
  [['patriarch','ursula'],{'rebeca':'养女','jose-son':'长子','colonel':'次子','amaranta':'独女'},'夫妻 · 表亲'],
  [['jose-son','pilar'],{'arcadio':'儿子'},'曾相恋'],
  [['colonel','pilar'],{'aureliano-jose':'儿子'},'曾相恋'],
  [['arcadio','sofia'],{'remedios-beauty':'长女','jose-twin':'儿子 · 双胞胎','aureliano-twin':'儿子 · 双胞胎'},'伴侣'],
  [['aureliano-twin','fernanda'],{'meme':'长女','jose-young':'独子','amaranta-ursula':'幼女'},'夫妻'],
  [['meme','mauricio'],{'babilonia':'儿子'},'恋人'],
  [['amaranta-ursula','babilonia'],{'last':'儿子'},'姨甥 · 恋人']
].map(([parents,childRoles,label]) => ({parents,children:Object.keys(childRoles),childRoles,label}));

const macondoEvents = [
  ['founding','创建马孔多',1,'创镇夫妇离开故乡，和同行者一起在河边建立马孔多。',['patriarch','ursula']],
  ['inventions','梅尔基亚德斯带来新发明',2,'梅尔基亚德斯把新奇事物带到镇上。创镇者着迷于炼金术，乌尔苏拉靠做糖果支撑家计。',['patriarch','melquiades','ursula']],
  ['insomnia','失眠与遗忘',3,'失眠症使村民逐渐遗忘事物的名字。梅尔基亚德斯回到马孔多，帮助镇民恢复记忆。',['rebeca','melquiades','patriarch']],
  ['pianola','皮埃特罗来到布恩迪亚家',3,'皮埃特罗来安装自动钢琴，也教丽贝卡和阿玛兰妲跳舞。两人都被他吸引。',['pietro','rebeca','amaranta']],
  ['sisters','书信引发姐妹失和',4,'皮埃特罗给丽贝卡写情书。阿玛兰妲眼看两人日渐亲密，由嫉妒转为怨恨，发誓要阻止婚事。',['amaranta','rebeca','pietro'],'https://drupal7.centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-episodio-4-la-peste-del-amor'],
  ['wedding-grief','小蕾梅黛丝的婚礼与丧事',5,'蕾梅黛丝·莫斯科特和奥雷里亚诺结婚，给一家人带来短暂的平静。她怀着一对双胞胎突然去世，两个孩子都未能出生。',['remedios-wife','colonel','amaranta','rebeca'],'https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-episodio-5-bodas-terribles-lutos-tristes'],
  ['rebeca-wedding','丽贝卡解除婚约',6,'返乡的何塞·阿尔卡蒂奥吸引了丽贝卡。她解除与皮埃特罗的婚约，选择嫁给何塞；剧集用阿玛兰妲烧掉婚纱的场景表现姐妹之间的积怨。',['rebeca','jose-son','pietro','amaranta'],'https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-episodio-6-el-estallido-de-la-guerra'],
  ['war','内战蔓延到马孔多',6,'争议选举和保守派的压迫使马孔多走向反抗。奥雷里亚诺投身自由派，开始了他的军事生涯。',['colonel','gerineldo','ursula']],
  ['pietro-rejection','皮埃特罗向阿玛兰妲求婚',7,'婚约解除后，皮埃特罗转而追求阿玛兰妲。她拒绝求婚，皮埃特罗随后自尽。剧集保留了这条情节，也省略了乌尔苏拉为葬礼与神父争论的段落。',['pietro','amaranta','ursula'],'https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-episodio-7-la-dictadura-de-un-liberal'],
  ['capture','奥雷里亚诺被俘',8,'阿尔卡蒂奥被处决数月后，奥雷里亚诺也被保守派俘获。格里内尔多跟随他走到被捕之时。',['colonel','gerineldo','arcadio'],'https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-episodio-8-un-corazon-endurecido-por-la-guerra'],
  ['gerineldo-courtship','格里内尔多的长期求婚',null,'战事再紧，格里内尔多也常到家里看阿玛兰妲。这份陪伴持续多年，阿玛兰妲最终仍拒绝结婚。',['gerineldo','amaranta','colonel'],macondoNovelChapter('09'),'小说 · 第九章'],
  ['gerineldo-sentence','格里内尔多反对停战条件',null,'格里内尔多认为让自由派放弃原来主张的条件等同背叛。他因此被判死刑。乌尔苏拉出面质问儿子，奥雷里亚诺最后撤销了处决。',['gerineldo','colonel','ursula'],macondoNovelChapter('09'),'小说 · 第九章'],
  ['armistice','停战与战后生活',9,'停战为战争划下阶段性的句号，仍在马孔多的家人开始面对战后生活。',['colonel','gerineldo','ursula']],
  ['petra-twins','佩特拉误认双胞胎',9,'佩特拉先与何塞·阿尔卡蒂奥第二交往。奥雷里亚诺第二被她认成双胞胎兄弟时顺势隐瞒身份，一度与何塞先后去见她。何塞这段交往结束后，奥雷里亚诺第二与她长期相伴。',['petra','jose-twin','aureliano-twin'],macondoNovelChapter('10')],
  ['carnival','狂欢节与费尔南达',10,'狂欢节上，来自外地的费尔南达出现在马孔多，节庆随后变成一场暴力冲突。与此同时，奥雷里亚诺第二与佩特拉的家畜越来越多。',['fernanda','aureliano-twin','petra','colonel'],'https://centrogabo.org/index.php/gabo/contemos-gabo/cien-anos-de-soledad-temporada-2-episodio-2-el-carnaval-sangriento'],
  ['fernanda-arrival','费尔南达来到布恩迪亚家',11,'费尔南达与奥雷里亚诺第二结婚。他仍与佩特拉相伴。剧集安排乌尔苏拉劝费尔南达留下；小说里由奥雷里亚诺第二出面劝说。',['fernanda','aureliano-twin','petra','ursula'],'https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-temporada-2-episodio-3-la-mujer-de-las-palmas-funebres'],
  ['rail','铁路进入马孔多',12,'铁路改变马孔多与外界的联系，也为香蕉公司的到来铺平道路。剧集凸显何塞·阿尔卡蒂奥第二推进铁路的角色，小说把引入铁路归于奥雷里亚诺·特里斯特。',['jose-twin'],'https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-temporada-2-episodio-3-la-mujer-de-las-palmas-funebres'],
  ['butterflies','梅梅与黄色蝴蝶',13,'梅梅与香蕉公司的技工毛里西奥相恋。黄色蝴蝶反复出现在他的身边。两人的交往引来费尔南达的干预。',['meme','mauricio','fernanda']],
  ['banana','香蕉工人事件',14,'工人和公司之间的冲突升级。何塞·阿尔卡蒂奥第二见证了镇上最关键的转折。',['jose-twin']],
  ['sisters-memory','阿玛兰妲晚年的旧怨',null,'小说写她独处时总会想起丽贝卡，还试图把那些充满怨恨的回忆讲给美人儿蕾梅黛丝。皮埃特罗的故事早已结束，这段姐妹关系却一直困住她。重读婚事冲突时，也可对照小说中她一度打算毒害丽贝卡、最终没有下手的段落。',['amaranta','rebeca','pietro','remedios-beauty'],macondoNovelChapter('11'),'小说 · 姐妹旧怨'],
  ['rain','多年暴雨',15,'漫长的暴雨使镇上的繁荣退去，布恩迪亚家也逐渐衰落。',['ursula','aureliano-twin','fernanda','petra']],
  ['return','阿玛兰妲·乌尔苏拉重返祖宅',16,'阿玛兰妲·乌尔苏拉与加斯东从欧洲回来，想修整祖宅。此时的马孔多已失去铁路与香蕉公司到来时的繁荣。',['amaranta-ursula','gaston','babilonia']],
  ['parchments','解读羊皮卷',16,'奥雷里亚诺·巴比伦开始读懂梅尔基亚德斯留下的文字。最终命运可在人物档案里展开。',['babilonia','amaranta-ursula','melquiades']]
].map(([id,title,episode,note,people,source,novel]) => ({id,title,episode,note,people,source,novel}));

function macondoEpisodeLabel(episode) {
  if (episode === 16) return '第二部 · 终章';
  return `${episode <= 8 ? '第一部' : '第二部'} · 第 ${episode <= 8 ? episode : episode-8} 集`;
}

const macondoGenerations = [
  ['建镇与立家','何塞·阿尔卡蒂奥·布恩迪亚迷恋发明和实验，乌尔苏拉撑起日常生计。梅尔基亚德斯带来的新事物，使这座新村与外界相连。',['patriarch','ursula','melquiades']],
  ['同一家族走向不同道路','长子何塞·阿尔卡蒂奥出走又归来，次子奥雷里亚诺从银匠变为上校。皮埃特罗与丽贝卡订婚，使阿玛兰妲对养姐积怨日深。格里内尔多则在战事中与上校并肩，也在战火之外追求阿玛兰妲。',['jose-son','colonel','rebeca','amaranta','pietro','gerineldo']],
  ['皮拉尔连接的两支血脉','阿尔卡蒂奥的父亲是长子何塞·阿尔卡蒂奥；奥雷里亚诺·何塞的父亲是上校。两人同母异父，都被卷入内战。',['pilar','arcadio','aureliano-jose']],
  ['双胞胎与马孔多的繁荣','两兄弟容貌相同，佩特拉最初把他们认作同一人。她与何塞·阿尔卡蒂奥第二短暂交往，之后和奥雷里亚诺第二长期相伴；何塞后来走入香蕉工人的抗争。',['jose-twin','aureliano-twin','petra','fernanda']],
  ['祖宅里的三姐弟','费尔南达的孩子里，梅梅的恋情把家族与香蕉公司联系起来；何塞·阿尔卡蒂奥被送往罗马，阿玛兰妲·乌尔苏拉后来从欧洲归来。',['meme','jose-young','amaranta-ursula']],
  ['在手稿中寻找来处','奥雷里亚诺·巴比伦是梅梅的孩子，在祖宅长大。辨认他时，可以看「巴比伦」这一姓氏和他对羊皮卷的兴趣。',['babilonia','melquiades']],
  ['家族的最终一代','最后一代的身份与命运涉及小说结尾，可在人物档案中展开。',['last']]
];

const macondoPortraits = new Map();

function macondoHref(id) {
  return `#/macondo${id ? '/' + id : ''}`;
}

function macondoGraphic(person) {
  const portrait = macondoPortraits.get(person.id);
  return `<span class="macondo-monogram" aria-hidden="true">${person.cn.slice(0,1)}</span>${portrait
    ? `<img src="${portrait.src}"${portrait.scene ? ' class="macondo-scene"' : ''} alt="" loading="lazy">` : ''}`;
}

function macondoTreeData() {
  const rivalry = ['gerineldo','amaranta','pietro','rebeca'];
  const rows = [
    ['melquiades','patriarch','ursula'],
    [...rivalry,'jose-son','pilar','colonel','remedios-wife'],
    ['arcadio','sofia','aureliano-jose','seventeen'],
    ['remedios-beauty','jose-twin','petra','aureliano-twin','fernanda'],
    ['mauricio','meme','jose-young','amaranta-ursula','gaston'],
    ['babilonia'],
    ['last']
  ];
  const width = 1750;
  const height = 1390;
  const positions = new Map(rows.flatMap((row,y) => row.map((id,x) =>
    [id,{x:width/2+(x-(row.length-1)/2)*(y === 1 ? 186 : 228),y:112+y*190}])));
  const edges = macondoEdges.filter(({from,to,kind,label}) => !macondoFamilies.some(({parents,childRoles}) =>
    parents.includes(from) && ((kind === 'succession' && parents.includes(to)) ||
      (Object.hasOwn(childRoles,to) && (kind === 'kin' || childRoles[to] === label)))));
  const bands = rows.map((_,i) => ({title:`第 ${i+1} 代`,y:19+i*190}));
  return {width,height,positions,edges,families:macondoFamilies,people:macondoCharacters,bands,focusGroup:rivalry,simpleView:true,
    link:macondoHref,graphic:macondoGraphic,meta:person => macondoBylines[person.id],legend:['血缘','婚姻与伴侣','收养及其他'],title:'布恩迪亚家族家谱画布'};
}

function macondoPersonLinks(ids) {
  return `<div class="macondo-event-people">${ids.map(id => `<a href="${macondoHref(id)}">${macondoPeople.get(id).cn} ↗</a>`).join('')}</div>`;
}

const macondoNameGroups = [
  ['奥雷里亚诺',['colonel','aureliano-jose','seventeen','aureliano-twin','babilonia','last']],
  ['何塞·阿尔卡蒂奥',['patriarch','jose-son','jose-twin','jose-young']],
  ['蕾梅黛丝',['remedios-wife','remedios-beauty','meme']]
];

function macondoNameCards(ids) {
  return ids.map(id => {
    const person = macondoPeople.get(id);
    const parents = macondoFamilies.find(family => family.children.includes(id))?.parents
      ?? macondoEdges.filter(edge => edge.to === id && ['父子','母子'].includes(edge.label)).map(edge => edge.from);
    const parentNames = parents.map(parent => macondoPeople.get(parent).cn).join('、');
    return `<li><a href="${macondoHref(id)}">
      <span class="macondo-name-portrait">${macondoGraphic(person)}</span>
      <span>第 ${person.generation} 代<strong>${person.cn}</strong></span>
      <p>${macondoBylines[id]}</p>
      ${parentNames ? `<small>${parents.length === 2 ? '父母' : '父亲'} · ${parentNames}</small>` : ''}
    </a></li>`;
  }).join('');
}

function macondoProfileHref(id) {
  return '#/macondo/person/' + id;
}

function macondoPortraitFigure(person) {
  const photo = macondoPortraits.get(person.id);
  return photo ? `<figure class="macondo-still"><img src="${photo.src}" alt="${photo.alt || person.cn + ' · 哥伦比亚版剧照'}" loading="lazy"><figcaption>${sourceNote(photo.credit,photo.source)}</figcaption></figure>` : '';
}

function macondoRelativeLinks(person, href) {
  return macondoEdges.filter(edge => edge.from === person.id || edge.to === person.id).map(edge => {
    const relative = macondoPeople.get(edge.from === person.id ? edge.to : edge.from);
    return `<li><a href="${href(relative.id)}">${relative.cn} ↗</a><span>${relative.generation ? '第 ' + relative.generation + ' 代' : '同时代人物'} · ${macondoRelativeRole(edge,person.id)}</span></li>`;
  }).join('');
}

function macondoProfilePage(person) {
  if (!person) return `<section class="shell relation-page macondo-page"><h1 tabindex="-1">未找到人物</h1><a class="back" href="#/macondo">← 返回人物家谱</a></section>`;
  const events = macondoEvents.filter(event => event.people.includes(person.id));
  const clues = macondoCharacterKeys[person.id];
  return `<article class="shell relation-page macondo-page macondo-biography" aria-labelledby="macondo-biography-title">
    <a class="back" href="${macondoHref(person.id)}">← 返回家谱中的人物</a>
    <header class="macondo-biography-header">
      <div><p class="relation-profile-role">${person.generation ? '第 ' + person.generation + ' 代' : '同时代人物'} · ${person.reign}</p>
        <h1 id="macondo-biography-title" tabindex="-1">${person.cn}</h1><p class="guide-english">${person.en}</p>
        <p class="macondo-biography-summary">${person.summary}</p>
        ${person.actor ? `<p class="macondo-cast">剧集演员 ${person.actor}</p>` : ''}
      </div>
      ${macondoPortraitFigure(person)}
    </header>
    <div class="macondo-biography-columns">
      <div>
        <section class="macondo-clues" aria-labelledby="macondo-clues-title">
          <h2 id="macondo-clues-title">人物线索</h2>
          <dl>${clues.map(([label,note,,spoiler]) => `<div><dt>${label}</dt><dd><p>${note}</p>
            ${spoiler ? `<details class="relation-text macondo-clue-spoiler"><summary>展开这段情节 · 含剧透</summary><p>${spoiler}</p></details>` : ''}
          </dd></div>`).join('')}</dl>
        </section>
        <h2>人物经历</h2>
        <ol class="macondo-portrait-story">${macondoBiographies[person.id].map(([title,detail]) =>
          `<li><h3>${title}</h3><p>${detail}</p></li>`).join('')}</ol>
        <details class="relation-text macondo-outcome"><summary>小说人物结局 · 含剧透</summary><p>${person.outcome}</p></details>
      </div>
      <aside>
        <h2>相关人物</h2>
        <ul class="relation-profile-links">${macondoRelativeLinks(person,macondoProfileHref)}</ul>
        ${events.length ? `<h2>相关大事</h2><ul class="macondo-biography-events">${events.map(event =>
          `<li><a href="#/macondo/event/${event.id}">${event.title} ↗</a></li>`).join('')}</ul>` : ''}
      </aside>
    </div>
    <div class="relation-credit">${sourceNote('小说 · 出版方版本说明',macondoPublisher)}
      ${sourceNote('Centro Gabo · 小说与剧集分集对照',macondoGaboGuide)}
      ${[...new Set(clues.map(clue => clue[2]).filter(Boolean))].map(chapter => sourceNote('小说原文 · 第 ' + Number(chapter) + ' 章',macondoNovelChapter(chapter))).join('')}
      ${[...new Set(events.map(event => event.source).filter(Boolean))].map(url => sourceNote('相关段落 · ' + events.find(event => event.source === url).title,url)).join('')}
    </div>
  </article>`;
}

function macondoPage(tree) {
  return `<section class="shell relation-page macondo-page" aria-labelledby="macondo-title">
    <header class="relation-header">
      <h1 id="macondo-title" tabindex="-1">百年孤独</h1>
      <p class="guide-english" lang="es">Cien años de soledad</p>
      <div class="macondo-intro">
        <p>哥伦比亚作家加夫列尔·加西亚·马尔克斯的长篇小说，1967 年首次出版。故事从一对表亲在河边建立马孔多写起，沿布恩迪亚家族七代人的生活，经历内战、铁路通车和香蕉公司的兴衰。</p>
      </div>
      <h2 id="macondo-tree-title" tabindex="-1">人物家谱</h2>
      <p>父母之间的圆点连接共同子女。点击人物查看资料，再点一次收起。</p>
      <div class="relation-selectors">
        <label>查找人物 <select data-macondo-select aria-label="选择百年孤独人物"><option value="">未选中人物</option>${Array.from({length:7},(_,i) =>
          `<optgroup label="第 ${i+1} 代">${macondoCharacters.filter(person => person.generation === i+1).map(person =>
            `<option value="${person.id}">${person.cn} · ${person.reign}</option>`).join('')}</optgroup>`).join('')}
            <optgroup label="同时代人物">${macondoCharacters.filter(person => !person.generation).map(person =>
              `<option value="${person.id}">${person.cn} · ${person.reign}</option>`).join('')}</optgroup></select></label>
      </div>
    </header>
    ${macondoStoriesPanel()}
    <div class="relation-workspace">
      ${familyTree(tree)}
      ${familyInspector()}
    </div>
    <section class="macondo-reader" aria-labelledby="macondo-names-title">
      <div class="macondo-section-controls">
        <h2 id="macondo-names-title" tabindex="-1">同名人物速查</h2>
        <label>按名字 <select data-macondo-name>${macondoNameGroups.map(([name],i) => `<option value="${i}">${name}</option>`).join('')}</select></label>
      </div>
      <ul class="macondo-name-grid" data-macondo-name-grid>${macondoNameCards(macondoNameGroups[0][1])}</ul>
    </section>
    <section class="macondo-events" aria-labelledby="macondo-events-title">
      <div class="macondo-section-controls">
        <h2 id="macondo-events-title" tabindex="-1">马孔多大事</h2>
        <label>看到第几集 <select data-macondo-episode aria-describedby="macondo-episode-note">
          <option value="">全部剧情</option>${Array.from({length:16},(_,i)=>`<option value="${i+1}">${macondoEpisodeLabel(i+1)}</option>`).join('')}
        </select></label>
      </div>
      <p id="macondo-episode-note">已看集数保存在本机，并筛选剧情、关系导读和档案里的「相关大事」。</p>
      <div class="macondo-event-carousel">
        <button class="macondo-event-arrow" type="button" data-macondo-scroll="-1" aria-label="向前翻事件" aria-controls="macondo-event-track">←</button>
        <ol id="macondo-event-track">${macondoEvents.map(({id,title,episode,novel}) => `<li><button type="button" data-macondo-event="${id}">
          <span>${novel || macondoEpisodeLabel(episode)}</span><strong>${title}</strong></button></li>`).join('')}</ol>
        <button class="macondo-event-arrow" type="button" data-macondo-scroll="1" aria-label="向后翻事件" aria-controls="macondo-event-track">→</button>
      </div>
      <div data-macondo-event-detail aria-live="polite"></div>
    </section>
    <section class="macondo-reader" aria-labelledby="macondo-generations-title">
      <h2 id="macondo-generations-title" tabindex="-1">七代导读</h2>
      <ol class="macondo-generations">${macondoGenerations.map(([title,note,ids],index) => `<li>
        <span>第 ${index+1} 代</span><div><h3>${title}</h3><p>${note}</p>${macondoPersonLinks(ids)}</div>
      </li>`).join('')}</ol>
    </section>
    <section class="macondo-reader" aria-labelledby="macondo-background-title">
      <h2 id="macondo-background-title" tabindex="-1">作品背景</h2>
      <div class="macondo-background">
        <article><h3>马孔多与阿拉卡塔卡</h3><p>马孔多是虚构小镇，马尔克斯在哥伦比亚阿拉卡塔卡的童年为作品提供了素材。他曾提到，书中讲述离奇事物的方式与外祖母讲故事的口吻有关。失眠、遗忘和黄色蝴蝶，就这样与家庭、战争和生计写在一起。</p>
          ${sourceNote('出版方 · 马尔克斯传记导读','https://www.penguinrandomhouse.com/books/108374/gabriel-garcia-marquez-by-gerald-martin/9780307472281/readers-guide/')}</article>
        <article><h3>香蕉工人事件的历史背景</h3><p>1928 年，哥伦比亚马格达莱纳地区的联合果品公司工人罢工，军队在谢纳加镇压罢工者。小说让双胞胎中的何塞·阿尔卡蒂奥第二见证了马孔多的相关事件，并借他的经历写集体记忆如何被抹去。</p>
          ${sourceNote('哥伦比亚共和国银行 · 1928 年历史档案',macondoHistory)}</article>
        <article><h3>小说与哥伦比亚剧集</h3><p>Netflix 改编剧分两部，共 16 集。剧组在哥伦比亚搭建马孔多布景。站内家谱和人物结局以小说为依据，配图注明剧照、演员照或场景，事件栏注明剧集集数或小说中的阶段。</p>
          ${sourceNote('Netflix Tudum · 改编与分集',macondoAdaptation)}</article>
      </div>
    </section>
    <div class="relation-credit">家谱依据小说，章回参考哥伦比亚剧集。
      ${sourceNote('出版方 · 首版 50 周年纪念版',macondoPublisher)}
      ${sourceNote('出版方家谱',macondoBook)}
      ${sourceNote('Netflix 剧集',macondoNetflix)}
      ${sourceNote('第二部与终章',macondoPress)}
      ${sourceNote('Centro Gabo · 第二部第 5 集与小说对照','https://centrogabo.org/gabo/contemos-gabo/cien-anos-de-soledad-temporada-2-episodio-5-el-origen-de-las-mariposas-amarillas')}
    </div>
  </section>`;
}

const macondoMothers = new Set(['ursula','pilar','sofia','fernanda','meme','amaranta-ursula']);
const macondoSectionIds = {
  intro:'macondo-title', tree:'macondo-tree-title', names:'macondo-names-title',
  stories:'macondo-stories-title', events:'macondo-events-title', generations:'macondo-generations-title', background:'macondo-background-title'
};
const macondoProgressKey = 'crown-chronicle-macondo-episode';
let macondoEpisodeProgress = '';
try {
  const saved = localStorage.getItem(macondoProgressKey);
  if (/^(?:[1-9]|1[0-6])$/.test(saved || '')) macondoEpisodeProgress = saved;
} catch {}

function macondoRelativeRole(edge, id) {
  if (edge.to !== id) return edge.label;
  if (edge.label === '养女') return edge.from === 'ursula' ? '养母' : '养父';
  if (edge.label === '姨甥 · 恋人') return '姨母 · 恋人';
  if (edge.kind === 'kin' && edge.label !== '双胞胎兄弟') {
    return macondoMothers.has(edge.from) ? '母亲' : '父亲';
  }
  return edge.label;
}

function mountMacondo(panel, tree, signal) {
  const select = panel.querySelector('[data-macondo-select]');
  const drawer = mountFamilyInspector(panel,select,signal);
  const inspector = drawer.content;
  const eventDetail = panel.querySelector('[data-macondo-event-detail]');
  const eventPicker = panel.querySelector('[data-macondo-episode]');
  const eventTrack = panel.querySelector('#macondo-event-track');
  const [previousEvents,nextEvents] = panel.querySelectorAll('[data-macondo-scroll]');
  const namePicker = panel.querySelector('[data-macondo-name]');
  const nameGrid = panel.querySelector('[data-macondo-name-grid]');
  const eventButtons = [...panel.querySelectorAll('[data-macondo-event]')];
  let current;
  let picked;
  let currentEvent;
  let jumpToInspector = false;
  const camera = mountFamilyTree(panel,signal,id => {
    if (current?.id === id) {
      location.hash = macondoHref();
      return;
    }
    picked = id;
    location.hash = macondoHref(id);
  },tree);
  camera.center(macondoCharacters[0].id);
  const refreshStories = mountMacondoStories(panel,signal,camera,eventVisible);

  function updateEventArrows() {
    previousEvents.disabled = eventTrack.scrollLeft <= 1;
    nextEvents.disabled = eventTrack.scrollLeft >= eventTrack.scrollWidth-eventTrack.clientWidth-1;
  }

  for (const button of [previousEvents,nextEvents]) {
    button.addEventListener('click',() => {
      const cardWidth = eventTrack.querySelector('li:not([hidden])').getBoundingClientRect().width+5;
      const step = Math.max(1,Math.floor(eventTrack.clientWidth/cardWidth)-1)*cardWidth;
      eventTrack.scrollBy({left:Number(button.dataset.macondoScroll)*step,
        behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    },{signal});
  }
  eventTrack.addEventListener('scroll',updateEventArrows,{signal,passive:true});
  const eventResize = new ResizeObserver(updateEventArrows);
  eventResize.observe(eventTrack);
  signal.addEventListener('abort',() => eventResize.disconnect(),{once:true});

  function showEvent(id) {
    const event = macondoEvents.find(item => item.id === id);
    if (!event || !eventVisible(event)) return;
    currentEvent = event;
    eventButtons.forEach(button => {
      const selected = button.dataset.macondoEvent === id;
      button.setAttribute('aria-pressed',String(selected));
      if (selected) {
        const left = button.getBoundingClientRect().left-eventTrack.getBoundingClientRect().left;
        if (left < 0 || left+button.offsetWidth > eventTrack.clientWidth) eventTrack.scrollLeft += left-2;
      }
    });
    eventDetail.innerHTML = `<h3>${event.title}</h3><p>${event.note}</p>
      ${macondoPersonLinks(event.people)}
      ${event.source ? sourceNote('小说或剧集出处',event.source) : ''}
      ${event.id === 'petra-twins' ? sourceNote('Centro Gabo · 剧集第二部第 1 集','https://centrogabo.org/index.php/gabo/contemos-gabo/cien-anos-de-soledad-temporada-2-episodio-1-la-deshumanizacion-de-la-guerra') : ''}
      ${event.id === 'sisters-memory' ? sourceNote('小说 · 第五章婚事冲突',macondoNovelChapter('05')) : ''}`;
  }

  function eventVisible(event) {
    return !eventPicker.value || (event.episode !== null && event.episode <= Number(eventPicker.value));
  }

  function personEvents() {
    const holder = inspector.querySelector('.macondo-person-events');
    if (!holder || !current) return;
    const events = macondoEvents.filter(event => eventVisible(event) && event.people.includes(current.id));
    holder.hidden = !events.length;
    holder.querySelector('.macondo-event-people').innerHTML = events.map(event =>
      `<button type="button" data-macondo-event-jump="${event.id}">${event.title} ↓</button>`).join('');
  }

  function filterEvents() {
    const available = macondoEvents.filter(eventVisible);
    const visibleIds = new Set(available.map(event => event.id));
    eventButtons.forEach(button => { button.parentElement.hidden = !visibleIds.has(button.dataset.macondoEvent); });
    const latest = available.find(event => event.episode === Number(eventPicker.value));
    showEvent((latest || (visibleIds.has(currentEvent?.id) ? currentEvent : available[0])).id);
    updateEventArrows();
    personEvents();
    refreshStories();
  }

  function jumpSection(section) {
    if (!Object.hasOwn(macondoSectionIds,section)) return;
    const heading = panel.querySelector('#'+macondoSectionIds[section]);
    heading.focus({preventScroll:true});
    heading.scrollIntoView({block:'start'});
  }

  function jumpEvent(id) {
    const event = macondoEvents.find(item => item.id === id);
    if (!event) return jumpSection('events');
    if (!eventVisible(event)) {
      eventPicker.value = event.episode === null ? '' : String(event.episode);
      filterEvents();
    }
    showEvent(event.id);
    jumpSection('events');
  }

  function update(id) {
    const person = macondoPeople.get(id);
    if (current === person) {
      if (current && jumpToInspector) drawer.reveal();
      jumpToInspector = false;
      picked = undefined;
      return;
    }
    const fromCanvas = picked === person?.id;
    camera.setRuler(person?.id,Boolean(person && !fromCanvas));
    picked = undefined;
    current = person;
    select.value = person?.id || '';
    drawer.setOpen(Boolean(person));
    if (!person) {
      jumpToInspector = false;
      return;
    }
    inspector.innerHTML = `<aside class="relation-profile" aria-labelledby="macondo-person-title">
      <p class="relation-profile-role">${person.generation ? '第 ' + person.generation + ' 代' : '同时代人物'} · ${person.reign}</p>
      <h2 id="macondo-person-title" tabindex="-1">${person.cn}</h2>
      <p class="guide-english">${person.en}</p>
      ${person.actor ? `<p class="macondo-cast">剧集演员 ${person.actor}</p>` : ''}
      ${macondoPortraitFigure(person)}
      <p class="relation-profile-summary">${person.summary}</p>
      <ul class="macondo-clue-tags" aria-label="人物线索">${macondoCharacterKeys[person.id].map(([label]) => `<li>${label}</li>`).join('')}</ul>
      <a class="macondo-profile-link" href="${macondoProfileHref(person.id)}">查看完整经历 →</a>
      <ul class="relation-profile-links">${macondoRelativeLinks(person,macondoHref)}</ul>
      <section class="macondo-person-events"><h3>相关大事</h3><div class="macondo-event-people"></div></section>
      <details class="relation-text macondo-outcome"><summary>小说人物结局 · 含剧透</summary><p>${person.outcome}</p></details>
    </aside>`;
    personEvents();
    bindPhotoFallbacks(inspector);
    if (jumpToInspector || (fromCanvas && inspector.getBoundingClientRect().top > innerHeight - 70)) {
      drawer.reveal();
    }
    jumpToInspector = false;
  }

  // A missing local image leaves the name legible.
  function bindPhotoFallbacks(root) {
    root.querySelectorAll('img').forEach(img => {
      const hide = () => { img.hidden = true; };
      if (img.complete && !img.naturalWidth) hide();
      else img.addEventListener('error',hide,{once:true,signal});
    });
  }

  bindPhotoFallbacks(panel.querySelector('.tree-stage'));
  bindPhotoFallbacks(nameGrid);
  select.addEventListener('change', () => { location.hash = macondoHref(select.value); },{signal});
  eventButtons.forEach(button => button.addEventListener('click',() => showEvent(button.dataset.macondoEvent),{signal}));
  eventPicker.addEventListener('change',() => {
    macondoEpisodeProgress = eventPicker.value;
    try { localStorage.setItem(macondoProgressKey,macondoEpisodeProgress); } catch {}
    filterEvents();
  },{signal});
  namePicker.addEventListener('change',() => {
    nameGrid.innerHTML = macondoNameCards(macondoNameGroups[Number(namePicker.value)][1]);
    bindPhotoFallbacks(nameGrid);
  },{signal});
  panel.addEventListener('click',event => {
    const link = event.target.closest('.macondo-reader .macondo-event-people a, [data-macondo-event-detail] a, .macondo-name-grid a');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    jumpToInspector = true;
    if (link.hash === location.hash) update(current.id);
  },{signal});
  inspector.addEventListener('click',event => {
    const button = event.target.closest('[data-macondo-event-jump]');
    if (!button) return;
    showEvent(button.dataset.macondoEventJump);
    eventButtons.find(item => item.dataset.macondoEvent === currentEvent.id).focus({preventScroll:true});
    eventDetail.scrollIntoView({block:'center'});
  },{signal});
  eventPicker.value = macondoEpisodeProgress;
  filterEvents();
  return {update,jumpSection,jumpEvent};
}
