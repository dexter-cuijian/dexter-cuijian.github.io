// The Chinese source stays in the historical data files. Pair prose by stable entry ID
// so both the full text and its links can use the same English wording.
{
  const copy = {};
  const add = (source, english) => {
    if (source && english && source !== english) copy[source] = english;
  };

  for (const [, chinese, english] of houses) add(chinese, english);
  for (const person of [...monarchs, ...historicalFigures]) add(person.cn, person.en);

  const biographyEnglish = {
    'aethelberht': [
      'He ruled Kent. His marriage to the Frankish princess Bertha kept him connected to continental Europe.',
      'He welcomed Augustine’s mission in 597. He later converted to Christianity, laying the foundations for Canterbury’s importance as a religious centre.'
    ],
    alfred: [
      'He inherited the throne of Wessex after his elder brother died. Viking armies had already seized much of England.',
      'He defeated Guthrum at Edington, strengthened town defences and encouraged the translation of Latin works into Old English.'
    ],
    'edward-elder': [
      'Alfred’s son worked with his elder sister Æthelflæd, who ruled Mercia.',
      'He established fortified strongholds and gradually took control of Danish-held lands in the Midlands and eastern England, laying the groundwork for further unification under his son Athelstan.'
    ],
    athelstan: [
      'Edward the Elder’s son was crowned in 925 and had close ties to Mercia in his early years.',
      'He took York in 927, bringing northern England under his rule. In 937 he defeated an allied army of Scots and Vikings at Brunanburh.'
    ],
    edgar: [
      'A son of Edmund I, he succeeded his elder brother Eadwig as ruler of all England.',
      'He supported the monastic reforms of Dunstan and others. His well-documented coronation at Bath in 973 influenced later coronation traditions.'
    ],
    'aethelred-ii': [
      'He succeeded his murdered elder half-brother, Edward the Martyr. Sweyn took England in 1013, and Æthelred returned the following year.',
      'His reign saw repeated Viking attacks. After the Battle of Maldon in 991, the Crown paid tribute to the raiders.'
    ],
    'edmund-ironside': [
      'A son of Æthelred II, he was proclaimed king in London after his father’s death.',
      'He fought Cnut repeatedly before agreeing to divide the kingdom. He died later that year, leaving Cnut king of all England.'
    ],
    cnut: [
      'A son of the Danish king Sweyn, Cnut became undisputed king of England after Edmund Ironside died.',
      'He ruled England, Denmark and Norway. He married Emma of Normandy and continued to use many established English institutions.'
    ],
    'edward-confessor': [
      'A son of Æthelred II, he spent many years in Normandy. In 1042 he succeeded his maternal half-brother Harthacnut.',
      'He rebuilt Westminster Abbey. His death without children in January 1066 prompted rival claims to the throne.'
    ],
    'harold-ii': [
      'A member of the Godwin family, he took the English throne after Edward the Confessor died.',
      'He defeated King Harald III of Norway at Stamford Bridge, then hurried south and was killed at the Battle of Hastings.'
    ],
    'william-i': [
      'The Duke of Normandy crossed the Channel to contest the English throne in 1066. He defeated Harold II and was crowned that year.',
      'He consolidated Norman rule by redistributing land and building castles. He commissioned the survey of land and wealth recorded in Domesday Book.'
    ],
    'william-ii': [
      'William I’s son was known as William Rufus. He inherited England on his father’s death, while his elder brother Robert received Normandy.',
      'He put down a rebellion in support of Robert. An arrow killed him while hunting in the New Forest in 1100, and his younger brother Henry immediately succeeded him.'
    ],
    'henry-i': [
      'William I’s youngest son took the English throne after William II died. After his only son William drowned in the White Ship disaster, he named his daughter Matilda as heir.',
      'He issued the Charter of Liberties on his accession. In 1106 he defeated his elder brother Robert and reunited England and Normandy under one ruler.'
    ],
    stephen: [
      'William I’s grandson took the throne after his uncle Henry I died. Matilda contested his claim.',
      'Civil war continued for years. Under the succession agreement of 1153, Stephen kept his throne and Matilda’s son Henry would succeed him.'
    ],
    matilda: [
      'The daughter of Henry I and widow of Holy Roman Emperor Henry V claimed the English throne after her father’s death.',
      'She briefly gained the upper hand after Stephen’s capture in 1141 and was styled Lady of the English. Her coronation never took place. Her son later succeeded as Henry II.'
    ],
    'henry-ii': [
      'The son of Matilda and Geoffrey, Count of Anjou, he married Eleanor of Aquitaine, whose lands extended the family’s power across the Channel.',
      'He developed the royal justice system. His dispute with the Archbishop of Canterbury, Thomas Becket, ended with Becket’s murder in 1170.'
    ],
    'richard-i': [
      'The son of Henry II and Eleanor of Aquitaine was known as the Lionheart. He spent most of his reign outside England.',
      'He led the Third Crusade and was captured on his way home. After his ransom he resumed fighting in France, where he died of his wounds in 1199.'
    ],
    john: [
      'Richard I’s younger brother fought Philip II of France after becoming king and lost Normandy along with other French territories.',
      'His conflict with the barons led to Magna Carta in 1215. Civil war continued after the agreement broke down and John died the following year.'
    ],
    'henry-iii': [
      'John’s son became king at nine, with regents governing initially. During his long reign, royal finances repeatedly collided with baronial demands for reform.',
      'He rebuilt Westminster Abbey. After Simon de Montfort rebelled, the royalists regained control at the Battle of Evesham in 1265.'
    ],
    'edward-i': [
      'The son of Henry III took part in a crusade before becoming king. He strengthened royal administration and fought campaigns in Britain and abroad.',
      'He conquered Wales and intervened in the dispute over the Scottish crown. In 1295 he summoned what later became known as the Model Parliament.'
    ],
    'edward-ii': [
      'Edward I’s son relied on royal favourites, deepening conflict with the nobility. His queen, Isabella, later joined his opponents.',
      'Robert the Bruce defeated him in Scotland in 1314. He was deposed in 1327, and his son Edward III took the throne.'
    ],
    'edward-iii': [
      'He became king in his teens. His mother Isabella and Roger Mortimer initially controlled government, until Edward took power himself.',
      'His claim to the French throne began the Hundred Years’ War. His reign also saw the Black Death reach England in 1348.'
    ],
    'richard-ii': [
      'The son of Edward the Black Prince and grandson of Edward III became king as a child. In 1381 he met the rebels during the Peasants’ Revolt.',
      'He was in prolonged conflict with some of the nobility. His cousin Henry Bolingbroke returned from exile and deposed him in 1399.'
    ],
    'henry-iv': [
      'John of Gaunt’s son returned from exile in 1399 and displaced Richard II, becoming the first Lancastrian monarch.',
      'His reign faced Owain Glyndŵr’s uprising in Wales and challenges from powerful nobles, including the Percy family.'
    ],
    'henry-v': [
      'Henry IV’s son resumed major English offensives in France after coming to the throne.',
      'He won at Agincourt in 1415. The Treaty of Troyes recognised him as heir to the French crown in 1420, but he died before the French king.'
    ],
    'henry-vi': [
      'Henry V’s son came to the throne as an infant. Rival noble factions competed for power in his adult reign, and England lost most of its French territories.',
      'He founded Eton College and King’s College, Cambridge. He lost the crown twice during the Wars of the Roses, with a brief restoration in 1470–1471.'
    ],
    'edward-iv': [
      'The son of Richard, Duke of York, defeated the Lancastrians in the Wars of the Roses and took the crown in 1461.',
      'Driven into exile in 1470, he defeated the restored Henry VI’s supporters and regained the throne the following year. His son Edward V briefly succeeded him in 1483.'
    ],
    'edward-v': [
      'Edward IV’s eldest son came to the throne at 12. His uncle Richard, Duke of Gloucester, soon took control of government.',
      'Reliable records of him and his younger brother end after they entered the Tower of London. Edward was never crowned, Richard III took the throne and the brothers’ fate remains unknown.'
    ],
    'richard-iii': [
      'Edward IV’s younger brother was Duke of Gloucester. In 1483 he became Protector to Edward V and then took his nephew’s throne.',
      'The first statutes entirely in English appeared in his reign. Henry Tudor defeated him at Bosworth in 1485, where Richard was killed.'
    ],
    'henry-vii': [
      'He had Lancastrian ancestry through his mother. He defeated Richard III in 1485 and later married Elizabeth of York.',
      'He founded the Tudor dynasty and secured the throne through financial management and marriage alliances. In 1497 he backed John Cabot’s voyage to North America.'
    ],
    'henry-viii': [
      'Henry VII’s second son became heir after his elder brother Arthur died. The dispute over his marriage to Catherine of Aragon changed England’s religious and political course.',
      'Parliament’s 1534 Act of Supremacy recognised the monarch as Supreme Head of the Church of England. The dissolution of the monasteries followed. Henry married six times.'
    ],
    'edward-vi': [
      'Henry VIII and Jane Seymour’s son became king at nine. The Dukes of Somerset and Northumberland successively directed affairs.',
      'His reign saw Protestant reforms and the introduction of the Book of Common Prayer. Before his death he tried to pass the Crown to Lady Jane Grey.'
    ],
    'jane-grey': [
      'A great-granddaughter of Henry VII, Jane was named heir by Edward VI and proclaimed queen in July 1553.',
      'Mary I gained the Privy Council’s backing and took the throne. Jane’s disputed reign is usually called the Nine Days. She was executed the following year.'
    ],
    'mary-i': [
      'The daughter of Henry VIII and Catherine of Aragon took the throne after defeating Lady Jane Grey’s faction. She later married Philip of Spain.',
      'She restored ties with Rome and persecuted Protestants. England lost Calais near the end of her reign.'
    ],
    'elizabeth-i': [
      'The daughter of Henry VIII and Anne Boleyn succeeded her half-sister Mary I. The last Tudor monarch never married and had no children.',
      'Her 1559 religious settlement re-established the Church of England. The failure of the Spanish Armada in 1588 became a defining moment of her reign.'
    ],
    'james-i': [
      'The son of Mary, Queen of Scots, he was already James VI of Scotland when he inherited the English throne in 1603. The two kingdoms now shared a monarch.',
      'His reign saw the Gunpowder Plot of 1605. He commissioned the King James Bible, published in 1611.'
    ],
    'charles-i': [
      'James I’s son repeatedly clashed with Parliament over taxation, religion and royal authority.',
      'The English Civil War broke out in 1642. After the Royalists’ defeat, he was tried and executed in 1649, and the monarchy was temporarily abolished.'
    ],
    'charles-ii': [
      'The son of Charles I returned to England in the Restoration of 1660 after years in exile.',
      'His reign saw the Great Plague in 1665 and the Great Fire in 1666. The rebuilding that followed reshaped London.'
    ],
    'james-ii': [
      'Charles II’s younger brother was Catholic. His religious policies and the birth of a Catholic male heir in 1688 prompted renewed conflict.',
      'During the Glorious Revolution William of Orange landed in England and James fled to France. Mary and William subsequently inherited the English throne together.'
    ],
    'william-iii': [
      'The Dutch Prince of Orange married Mary, daughter of James II. He landed in England in 1688 and began a joint reign with Mary the following year.',
      'The Bill of Rights of 1689 limited royal power. After Mary died in 1694, William ruled alone until 1702.'
    ],
    'mary-ii': [
      'James II’s eldest daughter was raised Protestant and married William of Orange. They took the throne together after the Glorious Revolution.',
      'Mary directed domestic affairs while William was campaigning. She died of smallpox in 1694, after which William ruled alone.'
    ],
    anne: [
      'The daughter of James II and younger sister of Mary II succeeded in 1702 and was the last Stuart monarch.',
      'England and Scotland formally united as the Kingdom of Great Britain in 1707. The throne passed to the House of Hanover under the statutory rules of succession after her death.'
    ],
    'george-i': [
      'The Elector of Hanover succeeded Anne in 1714 under the rules for Protestant succession and continued to rule Hanover.',
      'The Jacobite rising of 1715 came early in his reign. Robert Walpole later became the government’s most influential minister.'
    ],
    'george-ii': [
      'George I’s son inherited the British Crown and the title of Elector of Hanover.',
      'The Jacobite rising of 1745 ended with defeat at Culloden the following year. Britain entered the Seven Years’ War towards the end of his reign.'
    ],
    'george-iii': [
      'The grandson of George II came to the throne in 1760. Long illness late in his reign led to his son becoming regent in 1811.',
      'The Thirteen Colonies gained independence during his reign. Great Britain and Ireland united in 1801, and Britain fought in the wars against Napoleon.'
    ],
    'george-iv': [
      'George III’s eldest son was Prince Regent from 1811 and succeeded in 1820. He was known for his courtly style and his patronage of art and architecture.',
      'He supported the remodelling of Brighton’s Royal Pavilion. Under political pressure, he approved the Roman Catholic Relief Act of 1829.'
    ],
    'william-iv': [
      'George IV’s younger brother served in the Royal Navy and succeeded because George had no surviving legitimate children.',
      'The Reform Act 1832 and Slavery Abolition Act 1833 passed in his reign. His niece Victoria succeeded him.'
    ],
    victoria: [
      'William IV’s niece became queen at 18. She married Prince Albert in 1840 and mourned him for many years after his death.',
      'Industrialisation and imperial expansion transformed Britain in her reign. She was granted the title Empress of India in 1876.'
    ],
    'edward-vii': [
      'Queen Victoria and Prince Albert’s eldest son was nearly 60 when he succeeded in 1901.',
      'Britain and France signed the Entente Cordiale in 1904, easing many of their colonial disputes.'
    ],
    'george-v': [
      'The son of Edward VII served in the navy as a young man. He was king during the First World War and the interwar years.',
      'He changed the royal house’s name from Saxe-Coburg and Gotha to Windsor in 1917 and reigned until 1936.'
    ],
    'edward-viii': [
      'George V’s eldest son became king in 1936. His intention to marry the American Wallis Simpson caused a constitutional crisis.',
      'He signed the instrument of abdication the same year and his younger brother succeeded as George VI. Edward was later made Duke of Windsor.'
    ],
    'george-vi': [
      'George V’s second son was Duke of York until his elder brother’s abdication brought him to the throne in 1936.',
      'He and the queen remained in Britain during the Second World War and carried out wartime royal duties. Their eldest daughter, Elizabeth, succeeded in 1952.'
    ],
    'elizabeth-ii': [
      'George VI’s eldest daughter succeeded in 1952 and was crowned in 1953. She reigned for more than 70 years and died in 2022.',
      'She was Head of the Commonwealth through postwar decolonisation and its evolution. Her 1953 coronation was the first to be televised live.'
    ],
    'charles-iii': [
      'Elizabeth II’s eldest son was Prince of Wales for many years. He succeeded on 8 September 2022 and was crowned in May 2023.',
      'Before becoming king he founded or supported numerous charities, including the Prince’s Trust for young people seeking work or starting businesses. He has long taken an interest in environmental conservation.'
    ]
  };
  for (const [id, english] of Object.entries(biographyEnglish)) {
    biographies[id].forEach((chinese, index) => add(chinese, english[index]));
  }

  const eventEnglish = {
    'roman-invasion': ['Roman invasion of Britain', 'Claudius sent troops across the Channel. The remains of an early Roman camp at Richborough make it a strong candidate for one of the main landing sites.'],
    'hadrians-wall': ['Construction of Hadrian’s Wall begins', 'Rome built a wall across northern Britain and later added camps and forts along it. Housesteads is one of the best-known sites along the Wall.'],
    'roman-rule-ends': ['Roman rule ends', 'In the early fifth century Britain separated from the Roman imperial administration. Around 410 is the conventional date for a transition involving several regions and processes.'],
    'augustine-mission': ['Augustine arrives in Kent', 'Augustine’s mission landed on Thanet, where Æthelberht of Kent welcomed it. Canterbury then became the mission’s base.'],
    'sutton-hoo': ['Sutton Hoo ship burial', 'A ship burial with rich grave goods testifies to the standing of the East Anglian kingdom. The person buried there has yet to be conclusively identified.'],
    'lindisfarne-raid': ['Raid on Lindisfarne', 'Viking raiders plundered Lindisfarne Priory. It is one of the earliest raids with a recorded date.'],
    'viking-york': ['Viking army takes York', 'A large Viking army took York, which became a major centre of Viking government and trade in northern England.'],
    edington: ['Battle of Edington', 'Alfred of Wessex defeated the Viking leader Guthrum, securing Wessex.'],
    'unified-england': ['Athelstan takes York', 'Athelstan took York, bringing northern and southern England under one monarch for the first time. Control of York changed hands several more times.'],
    brunanburh: ['Battle of Brunanburh', 'Athelstan defeated an alliance including forces from Scotland and Dublin, strengthening his rule. The location of the battle remains disputed.'],
    'edgar-coronation': ['Edgar crowned at Bath', 'Dunstan, Archbishop of Canterbury, crowned Edgar at Bath. The details of the ceremony survive in historical records and influenced later coronations.'],
    maldon: ['Battle of Maldon', 'Viking forces landed in Essex and defeated the local English army. England then paid tribute to the raiders.'],
    assandun: ['Battle of Assandun', 'Cnut defeated Edmund II and they agreed to divide the kingdom. Which site in Essex was Assandun remains disputed.'],
    'westminster-1065': ['Dedication of the new Westminster Abbey', 'The church rebuilt under Edward the Confessor was dedicated late in 1065. He was buried there the following January.'],
    'stamford-bridge': ['Battle of Stamford Bridge', 'Harold II defeated the army of Harald III of Norway near York. Weeks later he marched south to face the Normans.'],
    conquest: ['Norman Conquest', 'William, Duke of Normandy, won the Battle of Hastings and was crowned King of England that year.'],
    'magna-carta': ['Magna Carta', 'Under pressure from the barons, King John agreed to Magna Carta, which placed limits on royal power.'],
    roses: ['Wars of the Roses', 'The Lancastrian and Yorkist branches fought for the English throne, which changed hands several times.'],
    'henry-vi-return': ['Restoration of Henry VI', 'Edward IV briefly lost the throne. Henry VI was restored for a short time, and Edward regained the throne the following year.'],
    bosworth: ['Battle of Bosworth', 'Richard III was killed at Bosworth. Henry Tudor won the battle and took the throne as Henry VII.'],
    reformation: ['English Reformation', 'The Church of England broke with Rome during Henry VIII’s reign.'],
    crowns: ['Union of the Crowns', 'James VI of Scotland inherited the English throne as James I. The two kingdoms retained separate parliaments.'],
    republic: ['Republican period', 'England had no monarch. Oliver Cromwell served as Lord Protector from 1653 to 1658.'],
    revolution: ['Glorious Revolution', 'James II lost the throne. William III and Mary II took the throne jointly in 1689.'],
    'union-1707': ['Formation of the Kingdom of Great Britain', 'England and Scotland united to form the Kingdom of Great Britain.'],
    'union-1801': ['Formation of the United Kingdom', 'Great Britain and Ireland united as the United Kingdom of Great Britain and Ireland.'],
    windsor: ['Royal house renamed Windsor', 'The royal house changed its name to Windsor during the reign of George V.'],
    domesday: ['Domesday Book', 'William I commissioned a survey of land and property, creating records for taxation and administration.'],
    becket: ['Murder of Thomas Becket', 'Becket, Archbishop of Canterbury, clashed repeatedly with Henry II and was killed in his cathedral.'],
    'model-parliament': ['Model Parliament', 'Edward I summoned a parliament that brought representatives of counties and boroughs together with nobles and clergy.'],
    bannockburn: ['Battle of Bannockburn', 'Robert the Bruce defeated Edward II’s army, strengthening Scotland’s independence.'],
    'hundred-years': ['Start of the Hundred Years’ War', 'The dispute between Edward III and the French royal house became a prolonged war.'],
    'black-death': ['Black Death reaches England', 'Plague killed much of the population and profoundly changed the labour supply and the manorial economy.'],
    peasants: ['English Peasants’ Revolt', 'Grievances including the poll tax sparked the revolt. The young Richard II met the rebels in London.'],
    agincourt: ['Battle of Agincourt', 'Henry V’s army defeated the French during the Hundred Years’ War.'],
    armada: ['Spanish Armada sails against England', 'The Spanish fleet failed to carry out its planned invasion of England.'],
    'civil-war': ['English Civil War begins', 'The dispute between Charles I and Parliament escalated into war, changing the relationship between Crown and Parliament.'],
    restoration: ['Restoration of the monarchy', 'Charles II returned to England, ending the republican period.'],
    'great-fire': ['Great Fire of London', 'The fire destroyed much of the City of London and was followed by widespread rebuilding.'],
    'bill-rights': ['Bill of Rights', 'Parliament set limits on the monarch’s authority over laws, taxation and the military.'],
    'american-independence': ['American Declaration of Independence', 'The Thirteen Colonies declared independence. Britain formally recognised American independence in 1783.'],
    waterloo: ['Battle of Waterloo', 'A coalition army under the Duke of Wellington and the Prussians defeated Napoleon, ending the Hundred Days.'],
    'reform-act': ['Reform Act', 'Parliamentary seats were redistributed and the right to vote was extended.'],
    'world-war-i': ['Britain enters the First World War', 'Britain declared war on Germany after it invaded Belgium. During the war, George V renamed the royal house Windsor.'],
    'world-war-ii': ['Britain enters the Second World War', 'Britain declared war on Germany after it invaded Poland. George VI addressed the nation on the radio.'],
    've-day': ['Victory in Europe Day', 'After Germany surrendered, Britain celebrated the end of the war in Europe on 8 May.'],
    'elizabeth-coronation': ['Coronation of Elizabeth II', 'Elizabeth II was crowned at Westminster Abbey on 2 June. The ceremony was televised.'],
    'charles-coronation': ['Coronation of Charles III', 'Charles III and Camilla were crowned at Westminster Abbey on 6 May.']
  };
  for (const event of [...earlyEvents, ...events, ...extraGuideEvents]) {
    const [title, summary] = eventEnglish[event.id];
    add(event.cn, title);
    add(event.cn.replace(/[《》「」]/g, ''), title);
    add(event.note, summary);
  }

  const dynastyEnglish = {
    'roman-britain': ['Roman arch', 'The period emblem draws on surviving Roman architecture.', 'Rome launched a full invasion in AD 43. Over the following centuries it built roads, towns and frontier defences in parts of Britain. Its direct administration ended early in the fifth century.'],
    'early-kingdoms': ['Prow and waves', 'The period emblem represents journeys and migrations across the sea.', 'Several states took shape in Britain after Roman rule ended. Kent, Mercia and Wessex rose to prominence in turn. From the late eighth century, Viking raids and settlement reshaped the balance of power.'],
    'early-england': ['Silver penny', 'The period emblem draws on early English silver coins.', 'Athelstan’s capture of York helped bring the Kingdom of England together. The throne then passed between the houses of Wessex and Denmark before coming under dispute again in 1066.'],
    norman: ['Norman lions', 'The two lions, used in later Norman heraldry, represent the region in this chapter.', 'The conquest of 1066 tied England closely to Normandy. Castle building, the redistribution of land and Domesday Book transformed local rule. A civil war over the succession opened the way for a new dynasty.'],
    plantagenet: ['Three lions of England', 'From the arms of the medieval English monarchy.', 'Henry II and Eleanor of Aquitaine brought extensive territories on both sides of the Channel under the royal house. Magna Carta, the growth of Parliament, the Hundred Years’ War and the Black Death reshaped royal authority and society.'],
    lancaster: ['Red Rose of Lancaster', 'The red rose later became a common symbol of the Lancastrian house.', 'Henry IV took the throne in 1399. Henry V won victories in France, but these gains were gradually lost under Henry VI. The family fought York for the crown in the Wars of the Roses.'],
    york: ['White Rose of York', 'The white rose is associated with the House of York.', 'Edward IV took the throne twice during the Wars of the Roses. His son Edward V reigned briefly before Richard III took power. After defeat at Bosworth in 1485, the crown passed to the Tudors.'],
    tudor: ['Tudor rose', 'The red and white roses represent the Tudor union of York and Lancaster.', 'Henry VII founded the dynasty. Henry VIII set the Church of England on a course away from Rome. Religious policy shifted again under Edward VI, Mary I and Elizabeth I, and the dynasty ended in 1603.'],
    stuart: ['Scottish thistle', 'The Scottish emblem represents the Stuart family’s origins.', 'James VI inherited the English crown in 1603 and the two kingdoms shared a monarch. Civil war, a republic, Restoration and the Glorious Revolution followed. Under Anne, England and Scotland formally united in 1707.'],
    hanover: ['White Horse of Hanover', 'From the white horse emblem associated with the House of Hanover.', 'George I succeeded under the Protestant succession rules. The period saw American independence, union with Ireland, parliamentary reform and industrialisation. Queen Victoria was the last Hanoverian monarch.'],
    saxe: ['Saxon black and gold arms', 'The black and gold stripes and green crown of rue draw on the heraldry of the House of Wettin.', 'Victoria’s son Edward VII inherited the throne and used his father’s family name, Saxe-Coburg and Gotha. During the First World War, George V adopted the name Windsor in 1917.'],
    windsor: ['Windsor crown', 'The crown represents the modern British monarchy in this chapter.', 'George V named the House of Windsor in 1917. The years that followed saw Edward VIII’s abdication, the Second World War, changes in the Commonwealth and Elizabeth II’s reign of more than 70 years. Charles III succeeded in 2022.']
  };
  houses.forEach(([id], index) => {
    dynastyNotes[index].slice(0, 3).forEach((chinese, noteIndex) => add(chinese, dynastyEnglish[id][noteIndex]));
  });

  const monarchNotes = {
    aethelberht: 'King of Kent, who welcomed Augustine’s mission.',
    alfred: 'King of Wessex, who defeated Guthrum in 878.',
    'edward-elder': 'Succeeded Alfred.',
    athelstan: 'Took York in 927 as the Kingdom of England began to unify.',
    edgar: 'Crowned at Bath in 973.',
    'aethelred-ii': 'Went into exile when Sweyn invaded and regained the throne the following year.',
    'edmund-ironside': 'Contested the throne with Cnut.',
    cnut: 'The Danish royal house took the English throne.',
    'edward-confessor': 'Oversaw the rebuilding of Westminster Abbey.',
    'harold-ii': 'After winning at Stamford Bridge, he marched south to confront William.',
    'william-i': 'The Norman conqueror became king after his victory at Hastings.',
    'henry-i': 'A son of William I, he issued the Charter of Liberties on his accession.',
    matilda: 'Briefly gained control and is usually omitted from the formal succession.',
    'henry-ii': 'The first Plantagenet king advanced legal reform in England.',
    'richard-i': 'Known for his role in the Third Crusade.',
    john: 'Agreed to Magna Carta in 1215 under pressure from the barons.',
    'henry-iii': 'A son of John, he oversaw the rebuilding of Westminster Abbey.',
    'henry-iv': 'Displaced Richard II and founded the House of Lancaster.',
    'henry-v': 'Won the Battle of Agincourt during the Hundred Years’ War.',
    'henry-vi': 'A Lancastrian king in the Wars of the Roses. He was deposed and later restored.',
    'edward-iv': 'The Yorkist king regained the throne in 1471.',
    'edward-v': 'Reigned briefly and was never crowned.',
    'richard-iii': 'The last Yorkist king was killed at Bosworth.',
    'henry-vii': 'Won at Bosworth and founded the Tudor dynasty.',
    'henry-viii': 'Led the Church of England’s break with Rome.',
    'jane-grey': 'Mary I took the throne about nine days later.',
    'elizabeth-i': 'The last Tudor monarch.',
    'james-i': 'James VI of Scotland inherited the English throne and the two kingdoms began to share a monarch.',
    'charles-ii': 'The monarchy was restored in 1660.',
    'william-iii': 'Reigned jointly with Mary II from 1689 to 1694 and alone from 1694 to 1702.',
    'mary-ii': 'Reigned jointly with William III.',
    anne: 'Queen of Great Britain from 1707.',
    'george-iii': 'Great Britain and Ireland united during his reign.',
    'george-v': 'Renamed the royal house Windsor in 1917.',
    'edward-viii': 'Abdicated the same year.'
  };
  for (const person of monarchs) add(person.note, monarchNotes[person.id]);

  const figureEnglish = {
    'catherine-valois': 'The daughter of Charles VI of France married Henry V in 1420. Their only son became Henry VI.',
    'catherine-aragon': 'Henry VIII’s first wife and the mother of Mary I. The dispute over their marriage was closely tied to the English Reformation.',
    'anne-boleyn': 'Henry VIII’s second wife and the mother of Elizabeth I. She was executed at the Tower of London in 1536.',
    'jane-seymour': 'Henry VIII’s third wife gave birth to the future Edward VI in 1537 and died soon afterwards.',
    'prince-philip': 'He married Elizabeth in 1947. They had four children, of whom Charles was the eldest.',
    claudius: 'He launched the full Roman invasion of Britain in AD 43. The expedition laid the foundations of Roman rule in Britain.',
    hadrian: 'He visited Britain in 122. Construction began that year on the Wall that bears his name, a major Roman frontier defence.',
    'augustine-canterbury': 'Æthelberht of Kent welcomed his mission, which established its base in Canterbury.',
    aethelflaed: 'Alfred’s daughter continued to lead Mercia after her husband died, fighting the Vikings alongside her younger brother Edward the Elder.',
    guthrum: 'Defeated by Alfred at Edington in 878, he was baptised and established his rule in East Anglia.',
    dunstan: 'He advanced monastic reforms with Edgar’s backing and presided at Edgar’s coronation in Bath in 973.',
    'emma-normandy': 'She married Æthelred II and later Cnut. The mother of Edward the Confessor and Harthacnut, she linked the royal houses of Wessex and Denmark.',
    'odo-bayeux': 'The maternal half-brother of William I took part in the Norman Conquest. Scholars often identify him as a possible patron of the Bayeux Tapestry.',
    'eleanor-aquitaine': 'Her marriage to Henry II extended the royal house’s lands to Aquitaine. She was the mother of Richard I and John.',
    'thomas-becket': 'He served as Henry II’s chancellor. After becoming archbishop he clashed with the king over the Church’s powers and was murdered in 1170.',
    'simon-de-montfort': 'He led a faction of nobles in seeking limits on royal power. His parliament of 1265 included representatives of counties and boroughs.',
    'robert-bruce': 'He ruled Scotland as Robert I. In 1314 he defeated Edward II’s army at Bannockburn.',
    'margaret-anjou': 'Henry VI’s queen led the Lancastrians in the Wars of the Roses and fought for her son Edward’s claim.',
    warwick: 'Known as the Kingmaker, he first backed Edward IV, then broke with him and supported the restoration of Henry VI.',
    'elizabeth-york': 'The daughter of Edward IV married Henry VII, linking the houses of York and Tudor.',
    'thomas-wolsey': 'He led government and diplomacy early in Henry VIII’s reign and fell from power after failing to resolve the king’s dispute over his marriage to Catherine.',
    'thomas-cromwell': 'He advanced the legislation of the English Reformation and helped oversee the dissolution of the monasteries. He fell from power and was executed in 1540.',
    'william-cecil': 'A trusted adviser to Elizabeth I for many years, he served as Secretary of State and then Lord Treasurer.',
    'john-pym': 'On the eve of the Civil War he rallied parliamentary opposition to the expansion of royal power. In 1642 he was one of five MPs Charles I attempted to arrest.',
    'oliver-cromwell': 'A Parliamentary commander, he became Lord Protector after England abolished the monarchy. Political instability followed his death, and Charles II was restored in 1660.',
    marlborough: 'A commander under Anne, he led Allied forces to victory at Blenheim in the War of the Spanish Succession.',
    walpole: 'He led the government late in the reign of George I and early in that of George II. He is generally regarded as Britain’s first prime minister.',
    'pitt-younger': 'He first became prime minister at 24. His time in office saw war with France and the union of Great Britain and Ireland.',
    'robert-peel': 'He served as prime minister under William IV and Victoria. In his second term he advanced the repeal of the Corn Laws.',
    'prince-albert': 'He married Victoria in 1840 and helped organise the Great Exhibition of 1851.',
    asquith: 'He took office under Edward VII and remained prime minister when George V succeeded. His government took Britain into the war in 1914.',
    'stanley-baldwin': 'He served three terms as prime minister and handled Edward VIII’s abdication crisis in 1936.',
    'winston-churchill': 'He served as prime minister during the Second World War. His second term spanned the death of George VI and the accession of Elizabeth II.',
    'margaret-thatcher': 'Britain’s first woman prime minister advanced privatisation and other economic reforms.',
    camilla: 'She married Charles in 2005. They were crowned at Westminster Abbey in 2023.',
    'rishi-sunak': 'He took office as prime minister in October 2022, early in the reign of Charles III.'
  };
  for (const person of historicalFigures) add(person.summary, figureEnglish[person.id]);

  Object.assign(copy, {
    '肯特国王': 'King of Kent',
    '威塞克斯国王': 'King of Wessex',
    '丹麦王室': 'Danish royal house',
    '争位者': 'Claimant',
    '两段在位': 'Two reigns',
    '在位极短': 'Brief reign',
    '争议统治': 'Disputed reign',
    '先共治，后独治': 'Joint and then sole reign',
    '共治': 'Joint reign',
    '退位': 'Abdication',
    '至今': 'present',
    '16 世纪': '16th century',
    '1553 年 7 月': 'July 1553',
    '1066 年 1–10 月': 'January–October 1066',
    '1533–1536 年为王后': 'Queen, 1533–1536',
    '1536–1537 年为王后': 'Queen, 1536–1537',
    '41–54 年在位': 'Reigned 41–54',
    '117–138 年在位': 'Reigned 117–138',
    '597 年抵达肯特': 'Reached Kent in 597',
    '约 890 年去世': 'Died around 890',
    '960–988 年任大主教': 'Archbishop, 960–988',
    '1306–1329 年在位': 'Reigned 1306–1329',
    '1515–1529 年任大法官': 'Lord Chancellor, 1515–1529',
    '1653–1658 年任护国公': 'Lord Protector, 1653–1658',
    '1721–1742 年主政': 'In office, 1721–1742',
    '2022 年起为王后': 'Queen from 2022',
    '英格兰王后': 'Queen of England',
    '爱丁堡公爵': 'Duke of Edinburgh',
    '罗马皇帝': 'Roman emperor',
    '传教士、坎特伯雷大主教': 'Missionary and Archbishop of Canterbury',
    '麦西亚人的女领主': 'Lady of the Mercians',
    '维京首领、东盎格利亚国王': 'Viking leader and King of East Anglia',
    '坎特伯雷大主教': 'Archbishop of Canterbury',
    '巴约主教、肯特伯爵': 'Bishop of Bayeux and Earl of Kent',
    '阿基坦女公爵、英格兰王后': 'Duchess of Aquitaine and Queen of England',
    '大法官、坎特伯雷大主教': 'Lord Chancellor and Archbishop of Canterbury',
    '莱斯特伯爵、改革派领袖': 'Earl of Leicester and reform leader',
    '苏格兰国王': 'King of Scotland',
    '英格兰王后、兰开斯特派领袖': 'Queen of England and Lancastrian leader',
    '沃里克伯爵': 'Earl of Warwick',
    '大法官、枢机主教': 'Lord Chancellor and cardinal',
    '首席大臣': 'Chief minister',
    '国务大臣、财政大臣': 'Secretary of State and Lord Treasurer',
    '下议院领袖': 'Leader in the House of Commons',
    '议会军将领、护国公': 'Parliamentary commander and Lord Protector',
    '马尔伯勒公爵、联军统帅': 'Duke of Marlborough and Allied commander',
    '第一财政大臣': 'First Lord of the Treasury',
    '首相': 'Prime minister',
    '王夫': 'Prince consort',
    '英国王后': 'Queen of the United Kingdom',
    '威斯敏斯特教堂': 'Westminster Abbey',
    '历史皇家宫殿机构': 'Historic Royal Palaces',
    '历史皇家宫殿': 'Historic Royal Palaces',
    '英国王室': 'The Royal Family',
    '英格兰遗产委员会': 'English Heritage',
    '大英博物馆': 'British Museum',
    '约克博物馆信托': 'York Museums Trust',
    '英格兰历史遗产局': 'Historic England',
    '坎特伯雷大教堂': 'Canterbury Cathedral',
    '英国议会': 'UK Parliament',
    '苏格兰历史环境局': 'Historic Environment Scotland',
    '英国国家陆军博物馆': 'National Army Museum',
    '英国政府': 'UK Government',
    '肯特里奇伯勒（可能的早期登陆地点）': 'Richborough, Kent (possible early landing site)',
    '胡斯泰兹罗马堡（长城沿线遗址）': 'Housesteads Roman Fort (Hadrian’s Wall site)',
    '肯特萨尼特岛一带（登陆区域）': 'Isle of Thanet, Kent (landing area)',
    '萨福克萨顿胡遗址': 'Sutton Hoo, Suffolk',
    '林迪斯法恩岛修道院': 'Lindisfarne Priory',
    '约克': 'York',
    '威尔特郡埃丁顿一带（传统战场）': 'Edington, Wiltshire (traditional battlefield site)',
    '巴斯修道院所在地': 'Site of Bath Abbey',
    '莫尔登附近布莱克沃特河口（战场区域）': 'Blackwater estuary near Maldon (battlefield area)',
    '约克以东斯坦福桥一带（战场区域）': 'Stamford Bridge east of York (battlefield area)',
    '继位': 'Accession',
    '其间另有君主': 'Intervening monarchs',
    '伦敦拥立': 'Proclaimed in London',
    '由分治转为独掌王位': 'Sole ruler after partition',
    '征服后加冕': 'Crowned after the conquest',
    '继承英格兰王位': 'Succeeded to the English throne',
    '争议继位': 'Disputed accession',
    '依继承协议即位': 'Succeeded under an agreement',
    '废黜后继位': 'Succeeded after a deposition',
    '废黜后即位': 'Succeeded after a deposition',
    '夺位': 'Seized the throne',
    '爱德华四世复位': 'Restoration of Edward IV',
    '继位，未加冕': 'Succeeded without coronation',
    '取代侄子即位': 'Took his nephew’s throne',
    '战胜后即位': 'Succeeded after victory in battle',
    '获宣布为女王，继位有争议': 'Proclaimed queen in a disputed succession',
    '争位后即位': 'Succeeded after a contest for the crown',
    '英格兰共和时期，1660 年复辟': 'English republic, followed by the Restoration in 1660',
    '与玛丽二世共同即位': 'Succeeded jointly with Mary II',
    '与威廉三世共同即位': 'Succeeded jointly with William III',
    '共治结束，威廉单独统治': 'William became sole ruler',
    '依据王位继承法继位': 'Succeeded under the Act of Settlement',
    '兄长退位后继位': 'Succeeded on his elder brother’s abdication',
    '儿子': 'Son',
    '父亲': 'Father',
    '异母弟弟': 'Younger half-brother',
    '异母兄长': 'Elder half-brother',
    '争位后分治': 'Rivals who divided the kingdom',
    '外孙': 'Grandson through a daughter',
    '外祖父': 'Maternal grandfather',
    '弟弟': 'Younger brother',
    '兄长': 'Elder brother',
    '女儿': 'Daughter',
    '外甥': 'Sister’s son',
    '舅父': 'Maternal uncle',
    '表亲 · 王位争夺': 'Cousins and rivals for the throne',
    '母亲': 'Mother',
    '孙子': 'Grandson',
    '祖父': 'Grandfather',
    '堂兄弟 · 王位争夺': 'Paternal cousins and rivals for the throne',
    '玫瑰战争对手': 'Rival in the Wars of the Roses',
    '叔父': 'Father’s younger brother',
    '侄子': 'Brother’s son',
    '博斯沃思战役对手': 'Opponent at Bosworth',
    '曾外孙女': 'Great-granddaughter through a daughter',
    '曾外祖父': 'Great-grandfather through a daughter',
    '异母妹妹': 'Younger half-sister',
    '异母姐姐': 'Elder half-sister',
    '外甥兼女婿': 'Nephew and son-in-law',
    '舅父兼岳父': 'Uncle and father-in-law',
    '妻子 · 共治君主': 'Wife and joint monarch',
    '丈夫 · 共治君主': 'Husband and joint monarch',
    '妹妹': 'Younger sister',
    '姐姐': 'Elder sister',
    '曾外孙': 'Great-grandson through a daughter',
    '孙女': 'Granddaughter',
    '侄女': 'Niece',
    '伯父': 'Father’s elder brother',
    '妻子': 'Wife',
    '第一任妻子': 'First wife',
    '第二任妻子': 'Second wife',
    '第三任妻子': 'Third wife',
    '丈夫': 'Husband',
    '受国王接纳的传教士': 'Missionary welcomed by the king',
    '姐姐、麦西亚盟友': 'Elder sister and Mercian ally',
    '埃丁顿战役对手': 'Opponent at Edington',
    '支持的宗教改革者': 'Religious reformer backed by the king',
    '异父弟弟、诺曼征服参与者': 'Younger half-brother and participant in the Norman Conquest',
    '大法官，后与国王冲突': 'Lord Chancellor and later opponent',
    '改革派对手': 'Reformist opponent',
    '班诺克本战役对手': 'Opponent at Bannockburn',
    '妻子、兰开斯特派领袖': 'Wife and Lancastrian leader',
    '从拥立者转为对手': 'Former supporter and later opponent',
    '支持其复位': 'Supported his restoration',
    '大法官、重臣': 'Lord Chancellor and senior minister',
    '首席顾问': 'Chief adviser',
    '议会反对派领袖': 'Leader of the parliamentary opposition',
    '内战中的议会军将领': 'Parliamentary commander in the Civil War',
    '复辟前的护国公': 'Lord Protector before the Restoration',
    '联军统帅': 'Allied commander',
    '在位期间的首相': 'Prime minister during the reign',
    '首相，处理退位危机': 'Prime minister during the abdication crisis',
    '继位时的首相': 'Prime minister at accession',
    '战时首相': 'Wartime prime minister',
    '即位时的首相': 'Prime minister at accession',
    '妻子、王后': 'Wife and queen'
  });

  Object.assign(copy, {
    '时期资料': 'Period source',
    '纹章资料': 'Heraldry source',
    '暂无可用历史图像': 'No historical image available',
    '生平': 'Life',
    '主要事迹': 'Key events and achievements',
    '展开人物资料': 'Read biography',
    '人物关系': 'Relationships',
    '展开资料': 'Read more',
    '《大宪章》表明君主也应受法律约束。约翰死后，摄政政府重新颁布了修订版本。': 'Magna Carta established that the monarch should also be subject to the law. After John’s death the regency reissued a revised version.',
    '约克一支失去英格兰王位。亨利七世建立都铎王朝，次年与约克的伊丽莎白结婚。': 'The House of York lost the English throne. Henry VII founded the Tudor dynasty and married Elizabeth of York the following year.',
    '出身约克家族': 'Born into the House of York',
    '出生于福瑟林盖城堡，是爱德华四世的弟弟。': 'Edward IV’s younger brother was born at Fotheringhay Castle.',
    '先任爱德华五世的护国公，随后取得王位。': 'He became Protector to Edward V and then took the throne.',
    '战死于博斯沃思': 'Killed at Bosworth',
    '8 月 22 日败于亨利·都铎，约克王朝结束。': 'Henry Tudor defeated him on 22 August, ending the House of York’s rule.',
    '发生了什么': 'What happened',
    '后续影响': 'Aftermath',
    '相关君王': 'Related monarchs',
    '相关大事': 'Related events',
    '同一事件的人物': 'People connected to this event',
    '参考文献': 'References',
    '在地图查看 ↗': 'View on the map ↗',
    '查看 1066 专题 ↗': 'Explore 1066 ↗',
    '复制链接': 'Copy link',
    '理查三世的艺术重建': 'Artistic reconstruction of Richard III',
    '理查三世可旋转 3D 艺术半身像': 'Rotatable 3D artistic bust of Richard III',
    '理查三世二维艺术重建': '2D artistic reconstruction of Richard III',
    '向左旋转半身像': 'Rotate the bust left',
    '向右旋转半身像': 'Rotate the bust right',
    '拖动旋转': 'Drag to rotate',
    '参考后世画像的艺术诠释，五官与服饰含推测。': 'An artistic interpretation based on later portraits, with conjectural facial features and clothing.',
    '莱斯特大学面貌复原研究': 'University of Leicester facial reconstruction research',
    '按时期和王朝跳转': 'Jump to a period or dynasty',
    '时期与王朝': 'Periods and dynasties',
    '历史地图': 'Historical map',
    '肖像索引 ↗': 'Portrait index ↗',
    '3D 展厅 ↗': '3D exhibition ↗',
    '君王与大事': 'Monarchs and key events',
    '时间线筛选': 'Timeline filters',
    '全部': 'All',
    '只看大事': 'Events only',
    '时间线密度': 'Timeline view',
    '阅读模式': 'Reading view',
    '年代概览': 'Chronological overview',
    '高级筛选': 'Advanced filters',
    '开始年份': 'Start year',
    '结束年份': 'End year',
    '例如 878': 'e.g. 878',
    '例如 1603': 'e.g. 1603',
    '王朝': 'Dynasty',
    '筛选时间线王朝': 'Filter the timeline by dynasty',
    '全部王朝': 'All dynasties',
    '事件类型': 'Event type',
    '全部类型': 'All types',
    '清除筛选': 'Clear filters',
    '开始年份需早于或等于结束年份。': 'The start year must be on or before the end year.',
    '没有符合条件的条目。': 'No entries match the filters.',
    '符合条件的条目：': 'Matching entries: ',
    '后续': 'Next',
    '前序': 'Previous',
    '暂无收录': 'None recorded',
    '选择下方人物，查看他与不列颠历史的关系。': 'Choose a person below to explore their connection to British history.',
    '查看君主资料 ↗': 'View biography ↗',
    '查看相关大事 ↗': 'View related event ↗',
    '← 返回君王与大事': '← Back to monarchs and key events',
    '君主家谱': 'Royal family tree',
    '点击人物查看资料，再点一次收起。父母之间的圆点连到共同子女，虚线标记王位交接。': 'Select a person to open their profile. Select them again to close it. Dots between parents connect to their children, and dashed lines mark transitions of the crown.',
    '选择人物时期': 'Select a historical period',
    '君主': 'Monarch',
    '选择图谱君主': 'Select a monarch in the tree',
    '未选中君主': 'No monarch selected',
    '连线按站内资料绘制，标注早期缺录、复位、共治与争位。': 'The lines follow the site’s chronology and mark gaps in early records, restorations, joint reigns and disputed successions.',
    '编年资料': 'Chronology source',
    '英格兰遗产委员会 · 阿基坦的埃莉诺': 'English Heritage · Eleanor of Aquitaine',
    '威斯敏斯特教堂 · 亨利六世': 'Westminster Abbey · Henry VI',
    '历史皇家宫殿 · 约克的伊丽莎白': 'Historic Royal Palaces · Elizabeth of York',
    '历史皇家宫殿 · 亨利八世的子女': 'Historic Royal Palaces · The children of Henry VIII',
    '英国王室 · 爱德华七世': 'The Royal Family · Edward VII',
    '英国王室 · 查尔斯三世': 'The Royal Family · Charles III',
    '重臣与同时代人物': 'Ministers and contemporaries',
    '人物选录': 'Selected figures',
    '同时期选录': 'Selected contemporary',
    '查看关系文字详情': 'Read relationship details',
    '王位交接': 'Transitions of the crown',
    '亲属与对手': 'Relatives and rivals',
    '战争与战役': 'Wars and battles',
    '法案与条约': 'Acts and treaties',
    '王位与制度': 'Crown and institutions',
    '宗教与社会': 'Religion and society',
    '归属有争议': 'Disputed attribution',
    '1520 年代': '1520s',
    '伦敦古物学会': 'Society of Antiquaries of London',
    '佚名': 'Unknown',
    '1505 年': '1505',
    '英国国家肖像馆': 'National Portrait Gallery',
    '见原图档案的作者归属': 'See the image record for attribution',
    '1540 年代': '1540s',
    '华沙国家博物馆（曾存放于华沙王宫）': 'National Museum in Warsaw (formerly held at the Royal Castle in Warsaw)',
    '约 1575 年': 'c. 1575',
    '1958 年 12 月': 'December 1958',
    '加拿大图书档案馆': 'Library and Archives Canada',
    '莱斯特大学 · 理查三世生平': 'University of Leicester · Life of Richard III',
    '英国国家档案馆 · 《大宪章》': 'The National Archives · Magna Carta',
    '兰开斯特与约克两支围绕英格兰王位的争夺。': 'A struggle between the houses of Lancaster and York for the English throne.',
    '百年战争': 'Hundred Years’ War',
    '英格兰与法国围绕王位主张和领地展开的长期战争。': 'A long war between England and France over claims to the French throne and territories.',
    '1688 年的政权更替，威廉与玛丽随后共同继承王位。': 'The change of regime in 1688, after which William and Mary took the throne jointly.',
    '1215 年约翰与贵族达成的宪章，限制王权。': 'A charter agreed by John and the barons in 1215 that limited royal power.',
    '事件档案': 'Event sources',
    '英国王室资料': 'Royal Family sources',
    '查阅文献': 'Read reference',
    '肖像资料': 'Portrait record',
    '创作者': 'Artist',
    '创作年代': 'Date created',
    '馆藏': 'Collection'
  });

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  for (const date of Object.values(exactEventDates)) {
    const match = date.match(/^(\d+) 年 (\d+) 月 (\d+) 日$/);
    if (!match) continue;
    const [, year, month, day] = match;
    add(date, day + ' ' + months[Number(month) - 1] + ' ' + year);
  }

  const dateRanges = [
    ...houses.map(([, , , dates]) => dates),
    ...monarchs.map(person => person.reign),
    ...[...earlyEvents, ...events, ...extraGuideEvents].map(event => event.reign),
    ...historicalFigures.map(person => person.dates)
  ];
  for (const range of dateRanges) {
    if (copy[range]) continue;
    const english = range.replace(/约 /g, 'c. ').replace('至今', 'present');
    if (!/[\u3400-\u9fff]/.test(english)) add(range, english);
  }

  for (const person of historicalFigures) {
    add(person.role + ' · ' + person.dates, copy[person.role] + ' · ' + (copy[person.dates] || person.dates));
  }

  for (const person of monarchs) {
    add(person.cn + ' · ' + person.reign, person.en + ' · ' + (copy[person.reign] || person.reign));
  }

  const rulerById = new Map(monarchs.map(person => [person.id, person]));
  for (const [, id, , label] of reignTransitions) {
    const person = rulerById.get(id);
    add('→ ' + person.cn + ' · ' + label, '→ ' + person.en + ' · ' + copy[label]);
  }

  add(houses.length + ' 个时期与王朝 · ' + monarchs.length + ' 位人物 · ' + guideEvents.length + ' 件大事',
      houses.length + ' periods and dynasties · ' + monarchs.length + ' monarchs · ' + guideEvents.length + ' key events');

  for (const entry of [...monarchs, ...guideEvents]) {
    const title = entry.cn.replace(/[《》]/g, '');
    const date = (entry.event && exactEventDates[entry.id]) || entry.reign;
    const [, house, englishHouse] = houses[entry.house];
    add('展开' + title + '资料', 'Read more about ' + (copy[title] || title));
    add(date + ' · ' + house, (copy[date] || date) + ' · ' + englishHouse);
  }

  registerSiteTranslations(copy);
}
