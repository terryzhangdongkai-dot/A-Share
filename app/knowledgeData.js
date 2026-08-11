const term = (name, category, plain, investment, watch, url) => ({ name, category, plain, investment, watch, url });

const OCP = "https://www.opencompute.org/";
const JEDEC = "https://www.jedec.org/standards-documents";
const SEMI = "https://www.semi.org/en/products-services/market-data";
const IPC = "https://www.ipc.org/solutions/standards";
const OFC = "https://www.ofcconference.org/";

export const knowledgeTerms = [
  term("CPO", "光通信", "Co-Packaged Optics，把光引擎与交换 ASIC 放进同一封装附近，缩短高频电连接。", "降低交换机高速电通道损耗，价值可能向光引擎、CW 激光、FAU、封装测试迁移。", "客户导入、102.4T 平台、量产时间、良率与可维护性", "https://www.broadcom.com/info/optics/cpo"),
  term("NPO", "光通信", "Near-Packaged Optics，光引擎靠近 ASIC，但仍保留相对独立的封装与维护边界。", "是可插拔到 CPO 之间的工程折中，不能仅凭名称判断最终份额。", "电通道长度、散热、连接密度、现场更换", OFC),
  term("LPO / LRO", "光通信", "通过线性驱动或接收架构弱化模块侧 DSP，目标是降低功耗与时延。", "可能减少 DSP 价值，但提高主机 SerDes、模拟前端和链路工程要求。", "误码率、链路距离、互操作、客户认证", OFC),
  term("硅光", "光通信", "在硅工艺平台集成调制器、耦合器、探测器等光学功能。", "规模制造潜力强，但激光源、耦合、封装和测试仍决定成本与良率。", "晶圆良率、耦合损耗、封装自动化、光源方案", OFC),
  term("EML", "光通信", "电吸收调制激光器，把激光与高速调制功能结合，常用于高速长距离光模块。", "高速率升级会提高器件难度，供给份额与良率比名义产能更重要。", "单通道速率、外延片、良率、温度性能", OFC),
  term("CW Laser", "光通信", "连续波激光器，为硅光或 CPO 光引擎持续提供稳定光源。", "外置光源架构可能提高高功率、多通道与高可靠激光器价值。", "功率、寿命、备份、多源供应", "https://www.lumentum.com/en/products/data-center/cw-lasers"),
  term("FAU", "光通信", "Fiber Array Unit，按精确间距排列并固定多根光纤的组件。", "通道数提高会增加精密耦合与封装价值，但仍需核验单件价格和自制率。", "通道数、耦合良率、自动化、客户认证", OFC),
  term("DSP", "光通信", "数字信号处理器，用算法补偿高速链路损伤。", "改善可插拔模块性能但带来功耗和成本，LPO/CPO 路线会改变其放置位置与价值。", "制程、功耗、误码率、供给周期", "https://www.marvell.com/solutions/data-center/optical-dsp.html"),
  term("SerDes", "芯片互连", "Serializer/Deserializer，负责芯片内部并行数据与高速串行链路之间转换。", "每代交换 ASIC 和加速器升级都会推高 SerDes 速率，牵动封装、PCB 与光互连。", "单通道速率、功耗、链路预算、IP授权", OCP),
  term("Scale-up", "芯片互连", "加速器域内的高带宽、低时延互连，用于多个 GPU/XPU 协同工作。", "影响交换芯片、高速铜连接、封装内互连与 HBM 带宽。", "拓扑、端口数、带宽、软件兼容", OCP),
  term("Scale-out", "芯片互连", "跨服务器或机柜扩展 AI 集群的网络。", "是 800G/1.6T 光模块、交换机和光纤连接的核心需求来源。", "集群规模、端口速率、网络利用率", OCP),
  term("OCS", "光通信", "Optical Circuit Switch，通过光路重构连接，不必每一跳都做光电转换。", "可能降低特定集群的网络功耗，但软件调度、切换速度和拓扑适配决定落地。", "端口数、切换时间、可靠性、客户部署", OCP),
  term("HBM", "存储", "High Bandwidth Memory，把多层 DRAM 通过 TSV 堆叠，放在 GPU/XPU 附近提供高带宽。", "价值链横跨 DRAM、TSV、先进封装、测试与基板，不能只映射到普通存储模组。", "堆叠层数、带宽、客户认证、良率、供给", JEDEC),
  term("TSV", "先进封装", "Through-Silicon Via，在硅片内形成垂直导电通孔，用于多层芯片互连。", "HBM 和 3D 封装层数增加会提高工艺与检测难度。", "孔深宽比、填铜、键合良率、热应力", SEMI),
  term("Chiplet", "先进封装", "把大芯片拆成多个功能小芯粒，再通过高速封装互连组合。", "降低单颗大 Die 的制造风险，但把价值转移到互连标准、中介层、封装和测试。", "Die-to-Die接口、KGD、封装良率、系统验证", "https://www.uciexpress.org/"),
  term("CoWoS", "先进封装", "台积电面向高性能计算的 2.5D/3D 封装家族，常用于 GPU 与多颗 HBM 集成。", "产能瓶颈影响 AI 加速器交付，但不同子路线的设备与材料需求不完全相同。", "月产能、良率、基板/中介层、客户分配", "https://3dfabric.tsmc.com/"),
  term("Hybrid Bonding", "先进封装", "混合键合把金属和介质表面直接连接，可实现更细间距和更低互连阻抗。", "若量产扩大，将增加清洗、键合、检测和表面平坦化设备价值。", "键合间距、颗粒控制、对准、良率", SEMI),
  term("KGD", "先进封装", "Known Good Die，经过充分测试、确认可用的裸芯片。", "Chiplet 中一颗坏 Die 可能拖累整个封装，因此前测和测试覆盖率价值上升。", "测试覆盖、漏测率、测试时间、成本", SEMI),
  term("DRAM", "存储", "动态随机存储器，以电容保存数据，需要周期刷新。", "服务器容量、价格周期和 HBM 产能挤占共同影响传统 DRAM 盈利。", "合约价、库存、位元供给、服务器容量", JEDEC),
  term("NAND", "存储", "非易失闪存，断电后仍保存数据，主要用于 SSD、手机和存储卡。", "盈利受层数升级、位元成本、供给纪律和企业级 SSD 结构影响。", "合约价、层数、eSSD占比、库存", JEDEC),
  term("NOR Flash", "存储", "适合存放启动代码与固件，容量较小但随机读取快、可靠性高。", "汽车、工业和 IoT 需求比大宗 NAND 更重要。", "容量结构、汽车认证、ASP、渠道库存", JEDEC),
  term("eSSD", "存储", "Enterprise SSD，面向数据中心的企业级固态硬盘。", "AI 数据管线需要高吞吐与可靠存储，价值不只在 NAND，也在控制器、固件和整机认证。", "客户认证、容量、控制器、耐久性", JEDEC),
  term("DDR5 / MRDIMM", "存储", "服务器主存的高速标准；MRDIMM 通过缓冲和并行提高带宽。", "带动 DRAM 容量、内存接口芯片与模组价值升级。", "服务器平台渗透、接口芯片、容量与价格", JEDEC),
  term("Low-Dk / Low-Df", "PCB材料", "低介电常数/低介质损耗材料，可降低高速信号延迟与能量损耗。", "推动电子布、树脂、覆铜板和铜箔从普通品升级到高端规格。", "介电性能、认证等级、良率、量产占比", IPC),
  term("HVLP 铜箔", "PCB材料", "超低轮廓铜箔，表面更平滑，可减少高速信号的导体损耗。", "高端加工费可能高于普通铜箔，但客户认证与量产良率决定盈利。", "粗糙度、剥离强度、认证、加工费", IPC),
  term("电子布", "PCB材料", "用电子级玻璃纤维纱织成的薄布，是覆铜板的增强骨架。", "AI 高速板更在意薄型、低介电和低热膨胀规格，普通玻纤产能不能直接等同。", "布种、克重、Low-Dk占比、客户认证", IPC),
  term("CCL", "PCB材料", "Copper Clad Laminate，铜箔覆在树脂和增强材料上的基板。", "材料等级决定 PCB 高频性能，M7/M8/M9 等市场说法需回到客户规格核验。", "等级结构、涨价、原料成本、稼动率", IPC),
  term("HDI", "PCB", "High Density Interconnect，用微孔和细线路提高单位面积连接密度。", "服务器与加速器板复杂度提升会增加层数、钻孔与良率要求。", "层数、微孔、良率、单位面积价值", IPC),
  term("EUV", "晶圆制造", "极紫外光刻使用 13.5nm 波长完成先进制程关键图形化。", "影响光刻设备、光刻胶、掩膜和量检测需求；设备台数不是唯一变量。", "层数、设备利用率、胶材、缺陷率", "https://www.asml.com/en/technology/lithography-principles/euv-lithography"),
  term("GAA", "晶圆制造", "Gate-All-Around，让栅极从多面包围沟道，提高先进晶体管控制能力。", "节点迁移会增加沉积、刻蚀、量测和材料难度。", "良率、客户流片、晶圆成本、量产节奏", SEMI),
  term("成熟制程", "晶圆制造", "通常指不追求最小线宽、强调成本和可靠性的工艺平台，服务模拟、功率、MCU 等芯片。", "景气更多由汽车、工业和消费周期决定，不能直接套用 AI 先进节点逻辑。", "稼动率、库存、晶圆价、终端需求", SEMI),
  term("WFE", "半导体设备", "Wafer Fab Equipment，晶圆厂前道设备支出。", "是设备行业需求总盘子的常用指标，但不同工序和厂商份额差异很大。", "逻辑/存储拆分、地区、订单、交付", SEMI),
  term("稼动率", "财务指标", "实际产出相对于可用产能的比例。", "重资产材料、晶圆、封测与 PCB 企业的利润弹性通常随稼动率显著变化。", "产能口径、良率、库存、价格", "https://www.sec.gov/edgar/search/"),
  term("Bit Growth", "财务指标", "存储厂商出货的数据位元总量增速。", "必须与每位元价格和每位元成本一起看，位元增长不等于收入或利润增长。", "出货位元、ASP、成本下降、库存", JEDEC),
  term("Capex", "财务指标", "Capital Expenditure，购置厂房、设备和基础设施的资本开支。", "云厂 capex 是 AI 硬件需求线索，但要拆分服务器、网络、土地厂房和融资租赁。", "支出结构、折旧、自由现金流、利用率", "https://www.sec.gov/edgar/search/"),
  term("RPO", "财务指标", "Remaining Performance Obligations，已签合同但尚未确认的剩余履约义务。", "可辅助观察云服务订单可见度，但合同期限和可取消条款会影响解释。", "增速、期限结构、转收入速度", "https://www.sec.gov/edgar/search/"),
];

export const knowledgeCategories = ["全部", ...new Set(knowledgeTerms.map((item) => item.category))];
