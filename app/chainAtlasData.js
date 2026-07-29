const companies = (text) => text.split("|").filter(Boolean).map((item) => {
  const [name, code = ""] = item.split(":");
  return { name, code };
});

export const chainAtlasStreams = [
  {
    id: "upstream",
    name: "上游 · 基础材料 & 器件",
    color: "#2f77c9",
    sectors: [
      { name: "硅片", source: "https://throbbing-salad-ccec.zjz506014992.workers.dev/", companies: companies("西安奕材:688783|沪硅产业:688126|有研硅:688432|立昂微:605358|神工股份:688233|上海合晶:688584") },
      { name: "电子布", source: "https://pcb-e-glass-cloth-research.pages.dev/", companies: companies("中国巨石:600176|中材科技:002080|国际复材:301526|宏和科技:603256|山东玻纤:605006|长海股份:300196") },
      { name: "AI材料", source: "https://reports.ty-workplace.com/public/ai-materials-onepagers/", companies: companies("海星股份:603115|中钨高新:000657|厦门钨业:600549|龙磁科技:300835|旭光电子:600353|东方钽业:000962|云南锗业:002428|博迁新材:605376|有研粉材:688456|三祥新材:603663|有研新材:600206|江南新材:603124|斯瑞新材:688102|唯特偶:301319|艾森股份:688720|沃格光电:603773|兴森科技:002436|悦安新材:688786|欧莱新材:688530|斯迪克:300806") },
      { name: "新材料", source: "https://aimaterials.1243069066.workers.dev/", companies: companies("东材科技|圣泉集团|联瑞新材|容大感光|广信材料|雅克科技|新宙邦|彤程新材|兴福电子|上海新阳|飞凯材料|晶瑞电材|江化微|万润股份|中船特气|昊华科技|广钢气体|华特气体|金宏气体|国瓷材料|蓝晓科技|泛亚微透") },
      { name: "半导体材料", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("上海新阳:300236|安集科技:688019|江丰电子:300666|鼎龙股份:300054") },
      { name: "CCL/覆铜板", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("华正新材:603186|南亚新材:688519|建滔积层板:1888|生益科技:600183|金安国纪:002636") },
      { name: "铜箔", source: "https://pcb-copper-foil.pages.dev/", companies: companies("宝鼎科技:002552|铜冠铜箔:301217|德福科技:301511|泰金新能:688813|嘉元科技:688388|江西铜业:600362|中天科技:600522|海亮股份:002203|亨通股份:600226|隆扬电子:301389|中一科技:301150|诺德股份:600110|花园生物:300401") },
      { name: "被动元件", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("三环集团:300408|京泉华:002885|可立克:002782|江海股份:002484|法拉电子:600563|火炬电子:603678|艾华集团:603989|达利凯普:301566|铂科新材:300811|顺络电子:002138|风华高科:000636|麦捷科技:300319") },
      { name: "玻璃基板", source: "https://benwu514.github.io/scanner-site/", companies: companies("京东方A:000725|TCL科技:000100") },
    ],
  },
  {
    id: "midstream",
    name: "中游 · 硬件制造",
    color: "#d85a30",
    sectors: [
      { name: "AI芯片", source: "https://throbbing-salad-ccec.zjz506014992.workers.dev/", companies: companies("寒武纪:688256|海光信息:688041|沐曦股份:688802|摩尔线程:688795") },
      { name: "存储", source: "https://throbbing-salad-ccec.zjz506014992.workers.dev/", companies: companies("兆易创新:603986|江波龙:301308|大普微:301666|佰维存储:688525|德明利:001309|香农芯创:300475|北京君正:300223|普冉股份:688766|澜起科技:688008|东芯股份:688110|国科微:300672|联芸科技:688449|聚辰股份:688123") },
      { name: "光通信(光模块/光芯片)", source: "https://nf-scanners.surge.sh/", companies: companies("中际旭创:300308|新易盛:300502|天孚通信:300394|光迅科技:002281|仕佳光子:688313|源杰科技:688498|长光华芯:688048|腾景科技:688195|德科立:688205|剑桥科技:603083|联特科技:301205|长芯博创:300548|中兴通讯:000063|东山精密:002384|沃尔核材:002130|兆龙互连:300913|华丰科技:688629|鼎通科技:688668|科创新源:300731|英维克:002837|广和通:300638|移远通信:603236") },
      { name: "光纤光缆", source: "https://yiyezhi-scanner.pages.dev/", companies: companies("中天科技:600522|亨通光电:600487|杭电股份:603618|永鼎股份:600105|烽火通信:600498|特发信息:000070|远东股份:600869|通鼎互联:002491|长飞光纤:601869") },
      { name: "PCB", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("世运电路:603920|威尔高:301251|广合科技:001389|方正科技:600601|景旺电子:603228|沪电股份:002463|深南电路:002916|生益电子:688183|胜宏科技:300476|鹏鼎控股:002938") },
      { name: "PCB刀具钻针", source: "https://company-one-page.frederick521033.workers.dev/", companies: companies("鼎泰高科:301377|欧科亿:688308|新锐股份:688257|华锐精密:688059|沃尔德:688028|劲拓股份:300400") },
      { name: "AI设备", source: "https://ai-equipment-onepages.pages.dev/", companies: companies("大族数控:301200|东威科技:688700|凯格精机:301338|合锻智能:603011|芯碁微装:688630|科瑞技术:002957|博众精工:688097|罗博特科:300757|瑞松科技:688090|联讯仪器:688808|日联科技:688531|华盛昌:002980|泰金新能:688813|洪田股份:603800") },
      { name: "液冷", source: "https://liquid-cooling-onepagers.pages.dev/", companies: companies("冰轮环境:000811|川环科技:300547|川润股份:002272|大元泵业:603757|鼎通科技:688668|飞龙股份:002536|飞荣达:300602|高澜股份:300499|海鸥股份:603269|汉钟精机:002158|和胜股份:002824|宏盛股份:603090|鸿富瀚:301086|鸿日达:301285|佳力图:603912|捷邦科技:301326|金富科技:003018|锦富技术:300128|科创新源:300731|领益智造:002600|南方泵业:300145|强瑞技术:301128|乔锋智能:301603|申菱环境:301018|胜蓝股份:300843|曙光数创:920808|硕贝德:300322|思泉新材:301489|溯联股份:301397|同飞股份:300990|同星科技:301252|兴瑞科技:002937|依米康:300249|奕东电子:301123|银轮股份:002126|英特科技:301399|英维克:002837|裕同科技:002831|远东股份:600869|中航光电:002179|中石科技:300684") },
      { name: "半导体设备", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("ASMPT:0522|中微公司:688012|中科飞测:688361|光力科技:300480|北方华创:002371|华峰测控:688200|华海清科:688120|天准科技:688003|屹唐股份:688729|微导纳米:688147|拓荆科技:688072|晶盛机电:300316|盛美上海:688082|矽电股份:301629|精智达:688627|精测电子:300567|联动科技:301369|联讯仪器:688808|至纯科技:603690|芯源微:688037|迈为股份:300751|金海通:603061|长川科技:300604") },
      { name: "半导体零部件", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("京仪装备:688652|先导基电:600641|先锋精科:688605|华亚智能:003043|唯万密封:301161|埃科光电:688610|富创精密:688409|恒运昌:688785|新莱应材:300260|正帆科技:688596|珂玛科技:301611|神工股份:688233|美利信:301307|臻宝科技:688797|英杰电气:300820|茂莱光学:688502") },
      { name: "封测", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("华天科技:002185|晶方科技:603005|甬矽电子:688362|盛合晶微:688820|通富微电:002156|长电科技:600584") },
      { name: "晶圆厂", source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", companies: companies("中芯国际:688981|华润微:688396|华虹公司:688347|晶合集成:688249|燕东微:688172") },
      { name: "服务器", source: "https://yiyezhi-scanner.pages.dev/", companies: companies("中科曙光:603019|华勤技术:603296|工业富联:601138|浪潮信息:000977") },
      { name: "电源", source: "https://e8a31769.ai-power-onepager.pages.dev/", companies: companies("中恒电气:002364|京泉华:002885|优优绿能:301590|可立克:002782|四方股份:601126|思源电气:002028|新特电气:301120|新雷能:300593|新风光:688663|智光电气:002169|欧陆通:300870|泰永长征:002927|爱科赛博:688719|特锐德:300001|白云电器:603861|盛弘股份:300693|禾望电气:603063|科华数据:002335|科士达:002518|良信股份:002706|金盘科技:688676|锐明技术:002970|阳光电源:300274|麦格米特:002851") },
      { name: "AIDC/算力租赁", source: "https://yiyezhi-scanner.pages.dev/", companies: companies("光环新网:300383|协创数据:300857|大位科技:600589|奥飞数据:300738|宏景科技:301396|数据港:603881|润泽科技:300442") },
    ],
  },
  {
    id: "downstream",
    name: "下游 · 云 & 应用",
    color: "#2f9e73",
    sectors: [
      { name: "云计算", source: "https://hk-internet-scans.pages.dev/", companies: companies("腾讯控股:00700|阿里巴巴:09988") },
      { name: "大模型/AI应用", source: "https://aiappilication.pages.dev/", companies: companies("智谱|MiniMax|卓易信息|中控技术|合合信息|快手:01024|美图公司:01357") },
    ],
  },
];

const mirror15Sectors = new Set(["硅片", "AI芯片", "存储"]);
const opticalSector = "光通信(光模块/光芯片)";
const detailHref = (sector, company) => {
  if (!company.code) return sector.source;
  const file = `${encodeURIComponent(`${company.name}(${company.code})_扫描一页纸`)}.html`;
  if (mirror15Sectors.has(sector.name)) return `https://nf-llm-station.pages.dev/chainatlas/mirror/15/${file}`;
  if (sector.name === opticalSector) return `https://nf-scanners.surge.sh/${file}`;
  return sector.source;
};

export const chainAtlasSectors = chainAtlasStreams.flatMap((stream) =>
  stream.sectors.map((sector) => ({
    ...sector,
    streamId: stream.id,
    streamName: stream.name,
    color: stream.color,
    companies: sector.companies.map((company) => ({ ...company, href: detailHref(sector, company) })),
  }))
);

export const chainAtlasCompanyCount = chainAtlasSectors.reduce((sum, sector) => sum + sector.companies.length, 0);

export const chainAtlasUpdates = [
  { source: "https://throbbing-salad-ccec.zjz506014992.workers.dev/", boardHref: "https://nf-llm-station.pages.dev/chainatlas/mirror/15/index.html", statedDate: "2026-07-20", refreshed: "2026-07-20", relative: "9 天前", hash: "cb06f95898459abc95849cae6243a04c0dbee17f", freshness: "warm" },
  { source: "https://aimaterials.1243069066.workers.dev/", boardHref: "https://nf-llm-station.pages.dev/chainatlas/mirror/02/index.html", statedDate: "2026-07-19", refreshed: "2026-07-19", relative: "10 天前", hash: "6cbd9e80ae2ab9afa45a31d5e9bd9610a561d30c", freshness: "warm" },
  { source: "https://benwu514.github.io/scanner-site/", boardHref: "https://benwu514.github.io/scanner-site/", statedDate: "2026-07-19", refreshed: "2026-07-19", relative: "10 天前", hash: "ac62661623434228fd5517e855cbf09edf4970ff", freshness: "warm" },
  { source: "https://272ed63d.scanner-onepager-pilot.pages.dev/", boardHref: "https://272ed63d.scanner-onepager-pilot.pages.dev/", statedDate: "2026-07-19", refreshed: "2026-07-19", relative: "10 天前", hash: "95e13feb1f0e7a925a28730ffc7c10de0fdcc1ee", freshness: "warm" },
  { source: "https://hk-internet-scans.pages.dev/", boardHref: "https://hk-internet-scans.pages.dev/", statedDate: "2026-07-19", refreshed: "2026-07-19", relative: "10 天前", hash: "5cae91847d29c4e994f2e2e0ff87a32a8c743ce2", freshness: "warm" },
  { source: "https://pcb-copper-foil.pages.dev/", boardHref: "https://pcb-copper-foil.pages.dev/", statedDate: "2026-07-18", refreshed: "2026-07-18", relative: "11 天前", hash: "02d0d8c22868ab1f34ac964e02205c3decc4f000", freshness: "warm" },
  { source: "https://pcb-e-glass-cloth-research.pages.dev/", boardHref: "https://pcb-e-glass-cloth-research.pages.dev/", statedDate: "2026-07-18", refreshed: "2026-07-18", relative: "11 天前", hash: "a76ec65b0692a69a02991ad4492758bb6e166a27", freshness: "warm" },
  { source: "https://reports.ty-workplace.com/public/ai-materials-onepagers/", boardHref: "https://reports.ty-workplace.com/public/ai-materials-onepagers/", statedDate: "2026-07-17", refreshed: "2026-07-17", relative: "12 天前", hash: "f1881526096291ec350bfaca126bde9777438128", freshness: "warm" },
  { source: "https://ai-equipment-onepages.pages.dev/", boardHref: "https://ai-equipment-onepages.pages.dev/", statedDate: "2026-07-17", refreshed: "2026-07-17", relative: "12 天前", hash: "e68e5b772782182dcb45807b0f7cb2fd1f5bab9d", freshness: "warm" },
  { source: "https://yiyezhi-scanner.pages.dev/", boardHref: "https://yiyezhi-scanner.pages.dev/", statedDate: "2026-07-17", refreshed: "2026-07-17", relative: "12 天前", hash: "06ee20c71afb93c70040a85581de1ad364630c26", freshness: "warm" },
  { source: "https://company-one-page.frederick521033.workers.dev/", boardHref: "https://nf-llm-station.pages.dev/chainatlas/mirror/01/index.html", statedDate: "2026-07-15", refreshed: "2026-07-15", relative: "14 天前", hash: "1fb41b5e2c718bd217c44135dd102f2dd03035011", freshness: "warm" },
  { source: "https://e8a31769.ai-power-onepager.pages.dev/", boardHref: "https://e8a31769.ai-power-onepager.pages.dev/", statedDate: "2026-07-07", refreshed: "2026-07-07", relative: "22 天前", hash: "35f5db0207651d2c9b6aabe1012c64681feb6f12", freshness: "warm" },
  { source: "https://liquid-cooling-onepagers.pages.dev/", boardHref: "https://liquid-cooling-onepagers.pages.dev/", statedDate: "2026-06-24", refreshed: "2026-06-24", relative: "约 1 个月前", hash: "f203d678034941800998aab0b4b4118d0e3e3e21", freshness: "old" },
  { source: "https://nf-scanners.surge.sh/", boardHref: "https://nf-scanners.surge.sh/", statedDate: "", refreshed: "", relative: "监测中", hash: "72b5404fcba1d87673c4842dc5a8ac2cefe7ab16", freshness: "monitor" },
  { source: "https://aiappilication.pages.dev/", boardHref: "https://nf-llm-station.pages.dev/chainatlas/mirror/14/index.html", statedDate: "", refreshed: "", relative: "监测中", hash: "b7738f12ea6875ce90974a297a8f58fdfe607b75", freshness: "monitor" },
].map((item) => ({ ...item, checkedAt: "2026-07-29T09:12:04+08:00", ok: true, changedSinceStated: false }));
