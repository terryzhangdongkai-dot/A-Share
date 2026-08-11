export const dailyNewsArchive = [
  {
    date: "2026-08-11", label: "今日 · 盘前", state: "更新中",
    headline: "A股尚未开盘：先观察设备/零部件延续性，再等待设备龙头业绩",
    summary: "截至北京时间 08:25，A股最新有效收盘日为 08-10。onsemi 二季度业绩会已于 08-03 举行，今日安排 KeyBanc 技术论坛；Applied Materials 将于 08-13 披露，不能把尚未发布的结果提前写入。",
    focus: "盘中关注半导体设备、零部件能否延续 08-10 相对强势，以及 AI 芯片、PCB 是否止跌。",
    items: [
      { category: "公司交流", company: "onsemi", title: "onsemi 今日参加 KeyBanc Technology Leadership Forum", takeaway: "二季度业绩已于 08-03 披露；今日交流重点转向汽车/工业复苏、AI 数据中心电源和 Synaptics 整合。", source: "onsemi Investor Relations", url: "https://investor.onsemi.com/events" },
      { category: "CPO / 光器件", company: "Lumentum", title: "Lumentum 将于今日美股收盘后披露 FY26 Q4", takeaway: "重点核验云与网络收入、CW 激光/高速光器件供给、产能爬坡、毛利率和下一季指引。", source: "Lumentum Investor Relations", url: "https://investor.lumentum.com/financial-news-releases/news-details/2026/Lumentum-Announces-Reporting-Date-for-Fourth-Quarter-and-Fiscal-Year-2026-Results/default.aspx" },
      { category: "业绩前瞻", company: "Applied Materials", title: "Applied Materials 将于 08-13 披露季度业绩", takeaway: "重点核对先进逻辑、HBM/存储与服务收入，避免只看单季 EPS。", source: "Applied Materials IR", url: "https://ir.appliedmaterials.com/" },
    ],
  },
  {
    date: "2026-08-10", label: "周一 · 收盘", state: "已归档",
    headline: "产业链算术平均 -0.16%，设备与零部件逆势占优",
    summary: "266 个样本中 113 家上涨；半导体零部件 +3.39%、半导体设备 +2.49%、半导体材料 +1.77% 居前，AI 芯片 -3.51%、AI 设备 -2.47%、PCB -1.80% 居后。",
    focus: "从普涨转入分化后，订单、验收与国产份额比题材扩散更重要。",
    items: [
      { category: "晶圆代工", company: "TSMC", title: "TSMC 07 月营收原定 08-10 13:30 发布", takeaway: "当前官方月度营收页尚未填入 07 月数值，本站保持‘待官方更新’，不使用未经核验的数字。", source: "TSMC Financial Calendar", url: "https://investor.tsmc.com/english/financial-calendar" },
    ],
  },
  {
    date: "2026-08-09", label: "周日 · 周末研究", state: "已归档",
    headline: "下周验证清单：模拟芯片、设备龙头与 NAND 指引",
    summary: "把下周事件拆成成熟制程需求、晶圆设备订单、存储价格与数据中心资本开支四条证据链。",
    focus: "ON 08-11、Applied Materials 08-13、Sandisk Investor Day 08-13。",
    items: [
      { category: "存储", company: "Sandisk", title: "Sandisk Investor Day 安排在 08-13", takeaway: "关注 NAND 长协、新商业模式、数据中心 SSD、BiCS10 与资本回报，而非只看现货价格。", source: "Sandisk Events", url: "https://investor.sandisk.com/news-events/events" },
    ],
  },
  {
    date: "2026-08-08", label: "周六 · 周度复盘", state: "已归档",
    headline: "本周主线从恐慌修复扩散至 PCB、材料、硅片与设备",
    summary: "08-03 下跌后，08-04 至 08-07 连续修复；但光通信在 08-05 仅 +1.17%，明显弱于材料与设备，说明高位方向需要更强业绩证据。",
    focus: "下周不追逐单日平均涨幅，优先跟踪相对强度与业绩兑现。",
    items: [
      { category: "方法论", company: "本站研究台", title: "四日反弹不等于所有细分行业基本面同步改善", takeaway: "板块算术平均用于观察广度，不代表可直接交易的指数收益。", source: "东方财富历史收盘行情", url: "https://quote.eastmoney.com/center/" },
    ],
  },
  {
    date: "2026-08-07", label: "周五 · 收盘", state: "已归档",
    headline: "产业链平均 +4.28%，CCL、铜箔与 PCB 领涨",
    summary: "235/266 家上涨；CCL/覆铜板 +11.09%、铜箔 +9.72%、PCB +9.20%，资金向 AI 高速板材链集中。",
    focus: "验证 M9 级材料、Low-Dk 电子布与 HVLP 铜箔的真实收入占比，避免把普通产能等同于高端供给。",
    items: [
      { category: "PCB材料", company: "产业链", title: "高频高速板材链成为当日最强方向", takeaway: "后续应比较涨价、产能利用率和客户认证，而不是只看行业标签。", source: "东方财富历史收盘行情", url: "https://quote.eastmoney.com/center/" },
    ],
  },
  {
    date: "2026-08-06", label: "周四 · 收盘", state: "已归档",
    headline: "产业链平均 +2.41%，硅片与 AI 材料领涨，云与应用回落",
    summary: "206/266 家上涨；硅片 +6.25%、AI 材料 +6.16%、PCB +5.46%，大模型/AI 应用 -3.10%、云计算 -2.76%。",
    focus: "硬件链占优时更要区分订单驱动与超跌修复。",
    items: [
      { category: "封测设备", company: "Kulicke & Soffa", title: "K&S 安排 FY26 Q3 业绩会", takeaway: "封装设备需要从订单、先进封装占比和客户资本开支三端验证。", source: "Kulicke & Soffa IR", url: "https://investor.kns.com/" },
      { category: "边缘芯片", company: "Synaptics", title: "Synaptics 安排 FY26 Q4 及全年业绩披露", takeaway: "边缘 AI 的需求信号需与库存、毛利率和下一季指引共同判断。", source: "Synaptics IR", url: "https://investor.synaptics.com/" },
    ],
  },
  {
    date: "2026-08-05", label: "周三 · 收盘", state: "已归档",
    headline: "产业链平均 +6.27%，硅片、钻针与半导体零部件领涨",
    summary: "249/266 家上涨；硅片 +11.22%、PCB 刀具钻针 +10.97%、半导体零部件 +10.73%，光通信 +1.17% 相对落后。",
    focus: "观察修复是否由成交与订单预期共同支撑，并警惕高波动后的分化。",
    items: [
      { category: "NAND", company: "Sandisk", title: "Sandisk FY26 Q4 业绩会安排在 08-05", takeaway: "重点核验数据中心收入、NAND 定价、长协模式、BiCS 节点与下一季毛利率。", source: "Sandisk Investor Relations", url: "https://investor.sandisk.com/news-events/events" },
      { category: "特色工艺", company: "GlobalFoundries", title: "GlobalFoundries 进入二季度业绩验证窗口", takeaway: "汽车、工业、通信基础设施与硅光/先进封装项目应拆分观察。", source: "GlobalFoundries IR", url: "https://investors.globalfoundries.com/" },
    ],
  },
  {
    date: "2026-08-04", label: "周二 · 收盘", state: "已归档",
    headline: "产业链平均 +7.13%，264/266 家上涨，情绪全面修复",
    summary: "AI 设备 +9.62%、AI 材料 +9.39%、CCL/覆铜板 +9.25% 领涨；这是广度修复，不等于盈利预期同步上修。",
    focus: "后续以成交额、次日留存和公司业绩验证修复质量。",
    items: [
      { category: "AI芯片", company: "AMD", title: "AMD FY26 Q2 业绩会安排在 08-04", takeaway: "数据中心 GPU/CPU、MI450/Helios 客户进展、供给与毛利率是关键变量。", source: "AMD Investor Relations", url: "https://ir.amd.com/news-events/ir-calendar/detail/20260804-amd-fiscal-second-quarter-2026-financial-results" },
      { category: "硅光代工", company: "Tower Semiconductor", title: "Tower Semiconductor 安排二季度业绩及三季度指引", takeaway: "硅光、射频与特色模拟代工的产能利用率和客户长约是核心。", source: "Tower Semiconductor IR", url: "https://ir.towersemi.com/news-releases/news-release-details/tower-semiconductor-announces-second-quarter-2026-financial" },
    ],
  },
  {
    date: "2026-08-03", label: "周一 · 收盘", state: "已归档",
    headline: "产业链平均 -2.73%，材料和存储承压，云与光通信相对抗跌",
    summary: "81/266 家上涨；云计算 +5.11%、大模型/AI 应用 +2.04%、光通信 +1.53%，半导体材料 -7.79%、存储 -7.73%、电子布 -7.59%。",
    focus: "板块内部出现软硬分化，先判断是否为前期拥挤度释放。",
    items: [
      { category: "本周前瞻", company: "全球半导体", title: "AMD、Tower、Sandisk 与封测设备公司进入密集业绩周", takeaway: "将 GPU、NAND、硅光代工与封测设备放在同一资本开支链条交叉验证。", source: "公司 IR 日历汇总", url: "https://www.sec.gov/edgar/search/" },
    ],
  },
  {
    date: "2026-08-02", label: "周日 · 周末研究", state: "已归档",
    headline: "业绩密集周前的三条证据链：算力、存储、先进封装",
    summary: "算力看 GPU/CPU 与云厂需求，存储看 NAND/HBM 价格和供给纪律，先进封装看设备订单与良率。",
    focus: "同一事件至少用需求、供给和财务三类变量核验。",
    items: [
      { category: "研究框架", company: "本站研究台", title: "把即将公布的业绩映射到 A 股产业链", takeaway: "海外龙头给方向，A股公司仍需用自身业务占比、客户和盈利验证。", source: "SEC EDGAR", url: "https://www.sec.gov/edgar/search/" },
    ],
  },
  {
    date: "2026-08-01", label: "周六 · 周度复盘", state: "已归档",
    headline: "07-30 急跌后 07-31 广度修复，但高端材料并未同步最强",
    summary: "07-31 全样本平均 +4.46%，251/266 家上涨；AIDC、PCB、AI 设备领涨，电子布与玻璃基板相对滞后。",
    focus: "把反弹分成超跌、业绩与产业催化三类，避免混为一谈。",
    items: [
      { category: "周度复盘", company: "A股半导体", title: "波动率抬升后应优先观察相对收益", takeaway: "算术平均反映行业广度，龙头相对强弱与成交结构决定行情质量。", source: "东方财富历史收盘行情", url: "https://quote.eastmoney.com/center/" },
    ],
  },
  {
    date: "2026-07-31", label: "周五 · 收盘", state: "已归档",
    headline: "产业链平均 +4.46%，AIDC、PCB 与 AI 设备领涨",
    summary: "251/266 家上涨；AIDC/算力租赁 +9.79%、PCB +6.96%、AI 设备 +6.92%，电子布 +1.44% 相对落后。",
    focus: "急跌后的普涨修复需要以次周订单和业绩信号二次确认。",
    items: [
      { category: "消费电子/云", company: "Apple & Amazon", title: "Apple 与 Amazon 业绩后的供应链解读进入交易日", takeaway: "Apple 看终端芯片与存储需求，Amazon 看 AWS 增速和基础设施资本开支；两者传导路径不同。", source: "公司官方 IR", url: "https://ir.aboutamazon.com/" },
    ],
  },
  {
    date: "2026-07-30", label: "周四 · 收盘", state: "已归档",
    headline: "产业链平均 -7.45%，11/266 家上涨，高位硬件链集中回撤",
    summary: "云计算 -0.21%、存储 -1.29% 相对抗跌；硅片 -10.67%、AI 设备 -10.53%、光通信 -9.92% 跌幅居前。",
    focus: "单日急跌先检查交易结构，再判断产业趋势是否反转。",
    items: [
      { category: "云厂资本开支", company: "Apple & Amazon", title: "Apple、Amazon 进入季度业绩披露窗口", takeaway: "Amazon 的 AWS 与 capex 直接映射服务器、网络、电源和液冷；Apple 更多映射消费电子、先进制程与存储。", source: "Amazon IR", url: "https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-to-Webcast-Second-Quarter-2026-Financial-Results-Conference-Call/default.aspx" },
      { category: "存储/代工", company: "Samsung", title: "Samsung 二季度业绩材料进入核验窗口", takeaway: "同时核验 HBM、传统 DRAM/NAND、2nm 代工和资本开支，不用单一总利润替代分部分析。", source: "Samsung IR", url: "https://www.samsung.com/global/ir/financial-information/earnings-release/" },
    ],
  },
  {
    date: "2026-07-29", label: "周三 · 收盘", state: "已归档",
    headline: "产业链平均 -1.68%，应用、云与被动元件相对占优",
    summary: "83/266 家上涨；大模型/AI 应用 +7.08%、云计算 +2.86%、被动元件 +2.51%，硅片 -5.11%、封测 -4.80%、CCL -4.79%。",
    focus: "海外云厂和芯片公司密集披露，A股硬件链等待 capex 与订单指引验证。",
    items: [
      { category: "云厂资本开支", company: "Microsoft", title: "Microsoft FY26 Q4 营收 900 亿美元，Azure 增长 43%", takeaway: "云收入、剩余履约义务和资本开支共同验证 AI 基础设施需求。", source: "Microsoft Investor Relations", url: "https://www.microsoft.com/en-us/Investor/earnings/FY-2026-Q4/press-release-webcast" },
      { category: "云厂资本开支", company: "Meta", title: "Meta Q2 营收 608.01 亿美元，资本开支 310.8 亿美元", takeaway: "高投入继续支撑 GPU、网络、光互连、电源和液冷需求，但自由现金流承压需同步观察。", source: "Meta Investor Relations", url: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/default.aspx" },
      { category: "边缘AI", company: "Qualcomm", title: "Qualcomm FY26 Q3 进入业绩披露窗口", takeaway: "手机、汽车、IoT 与数据中心多元化需要用分部收入和指引兑现。", source: "Qualcomm Investor Relations", url: "https://investor.qualcomm.com/financial-information" },
    ],
  },
];
