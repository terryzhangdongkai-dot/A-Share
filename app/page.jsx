"use client";

import React, { useEffect, useMemo, useState } from "react";
import { chainAtlasCompanyCount, chainAtlasSectors, chainAtlasStreams, chainAtlasUpdates } from "./chainAtlasData";
import { earningsCompanies, earningsPhases } from "./earningsData";
import { marketData, MARKET_DATA_COVERAGE, MARKET_DATA_GENERATED_AT } from "./marketData";
import { dailyMarketArchive, MARKET_HISTORY_GENERATED_AT } from "./marketHistoryData";
import { sourceMonitorData, SOURCE_MONITOR_GENERATED_AT } from "./sourceMonitorData";
import { dailyNewsArchive } from "./dailyNewsData";
import { sectorLogic, featuredSectorNames } from "./sectorLogicData";
import { knowledgeCategories, knowledgeTerms } from "./knowledgeData";
import chainEducationImage from "../static/assets/semiconductor-chain-education.png";

const sourceLinks = {
  tsmc: "https://investor.tsmc.com/english/quarterly-results/2026/q2",
  semi: "https://www.semi.org/en/products-services/market-data/world-fab-forecast",
  micron: "https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-record-results-third-quarter",
  nvidia: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Vera-Rubin-Ramps-Into-Full-Production-to-Power-Agentic-AI-Factories-Worldwide/default.aspx",
  broadcomCpo: "https://www.broadcom.com/info/optics/cpo",
  broadcomIr: "https://investors.broadcom.com/",
  corning: "https://investor.corning.com/",
  coherent: "https://www.coherent.com/company/investor-relations",
  lumentum: "https://investor.lumentum.com/",
  asml: "https://www.asml.com/en/investors/financial-results",
  amat: "https://ir.appliedmaterials.com/",
  lam: "https://investor.lamresearch.com/",
  skHynix: "https://news.skhynix.com/category/ir/",
  arxiv: "https://arxiv.org/search/?query=co-packaged+optics&searchtype=all",
  ieee: "https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=co-packaged%20optics",
  ofc: "https://www.ofcconference.org/",
  openCompute: "https://www.opencompute.org/",
  sec: "https://www.sec.gov/edgar/search/",
  marvellOptical: "https://www.marvell.com/solutions/data-center/optical-dsp.html",
  coherentCpo: "https://www.coherent.com/news/press-releases/coherent-co-packaged-optics-cpo-technologies-ofc-2026",
  coherentPluggable: "https://www.coherent.com/news/press-releases/coherent-demonstrates-next-gen-pluggable-transceiver-ofc-2026",
  lumentumCw: "https://www.lumentum.com/en/products/data-center/cw-lasers",
  corningAi: "https://investor.corning.com/news-and-events/news/news-details/2026/Corning-Expands-AI-Data-Center-Connectivity-Portfolio-with-PRIZM-TMT-Technology/default.aspx",
  skHbm4: "https://news.skhynix.com/sk-hynix-completes-worlds-first-hbm4-development-and-readies-mass-production/",
  besiBonding: "https://www.besi.com/investor-relations/press-releases/2020/details/applied-materials-and-be-semiconductor-industries-to-accelerate-chip-integration-technology-for-the-semiconductor-industry/",
  eoptolink16t: "https://www.eoptolink.com/news/13-new-products/352-eoptolink-releases-osfp-1-6t-dr8-and-2fr4-series-transceivers-for-ai-ml-clusters-and-cloud-datacenter-networks",
  cninfo: "https://www.cninfo.com.cn/new/index",
  innolightIr: "https://www.zj-innolight.com/index/index/inv1.html",
  infineon: "https://www.infineon.com/about/investor/reports-and-presentations",
  microsoftQ4: "https://www.microsoft.com/en-us/Investor/earnings/FY-2026-Q4/press-release-webcast",
  metaQ2: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/default.aspx",
  qualcommQ3: "https://investor.qualcomm.com/financial-information",
  samsungQ2: "https://www.samsung.com/global/ir/financial-information/earnings-release/",
  klaQ4: "https://ir.kla.com/news-events/press-releases/detail/518/kla-corporation-reports-fiscal-2026-fourth-quarter-and-full",
  nxpQ2: "https://investors.nxp.com/news-releases/news-release-details/nxp-semiconductors-reports-second-quarter-2026-results",
  armQ1: "https://investors.arm.com/financials/quarterly-annual-results",
  amphenolQ2: "https://investors.amphenol.com/news-and-events/events/event-details/2026/2nd-Quarter-2026-Earnings-2026-vSdZ9Zxy8Q/default.aspx",
  eastmoneyMarket: "https://quote.eastmoney.com/center/",
};

const navGroups = [
  {
    label: "",
    items: [{ id: "home", icon: "⌂", label: "首页", count: "" }],
  },
  {
    label: "交互协同",
    items: [
      { id: "daily", icon: "◉", label: "每日半导体日报聚合", count: "" },
      { id: "chain", icon: "◫", label: "半导体产业链标的一页纸", count: "303" },
    ],
  },
  {
    label: "每日更新",
    items: [
      { id: "events", icon: "⌁", label: "产品发布", count: "10" },
      { id: "papers", icon: "▤", label: "论文前沿", count: "9" },
      { id: "deepread", icon: "▦", label: "KOL 深读", count: "9" },
      { id: "interviews", icon: "▶", label: "访谈视频", count: "9" },
      { id: "hifreq", icon: "↗", label: "高频数据", count: "" },
      { id: "viewhub", icon: "❞", label: "观点聚合台", count: "" },
    ],
  },
  {
    label: "跟踪看板",
    items: [
      { id: "score", icon: "◇", label: "公司记分卡", count: "8" },
      { id: "cpo", icon: "✦", label: "CPO / 光模块", count: "重点" },
      { id: "capex", icon: "↗", label: "资本开支看板", count: "5" },
      { id: "statements", icon: "◌", label: "公司发言墙", count: "5" },
      { id: "tape", icon: "≋", label: "半导体 Tape", count: "" },
    ],
  },
  {
    label: "专题沉淀",
    items: [
      { id: "watch", icon: "☆", label: "精华沉淀 / 收藏", count: "" },
      { id: "knowledge", icon: "◎", label: "知识解读", count: String(knowledgeTerms.length) },
      { id: "earnings", icon: "▦", label: "业绩前瞻日历", count: String(earningsCompanies.length) },
      { id: "xpu", icon: "⌬", label: "XPU 芯片光谱", count: "" },
      { id: "sources", icon: "↗", label: "来源与口径", count: "" },
    ],
  },
];

const legacyEvents = [
  {
    id: 18,
    date: "07-30",
    grade: "A",
    importance: 3,
    category: "A股盘后",
    company: "半导体产业链",
    title: "7 月 30 日半导体样本普遍回调：硅片均幅 -10.67%，光通信均幅 -9.92%",
    summary: "按本站 266 个可识别证券的收盘涨跌幅做板块内算术平均：云计算 -0.21%、存储 -1.29% 相对抗跌；硅片 -10.67%、AI 设备 -10.52%、光通信 -9.92%、封测 -9.65% 跌幅居前。",
    takeaway: "今日属于高波动与拥挤度快速释放，盘后研究应优先区分基本面变化与估值/交易结构冲击；下一步核验成交额、龙头相对强弱、次日修复和业绩兑现。",
    source: "东方财富收盘行情 · 本站算术平均",
    url: sourceLinks.eastmoneyMarket,
  },
  {
    id: 17,
    date: "07-30",
    grade: "A",
    importance: 3,
    category: "存储 / 晶圆代工",
    company: "Samsung Electronics",
    title: "Samsung 发布 2026 年二季度业绩材料，存储、HBM 与先进代工进入新一轮验证窗口",
    summary: "公司二季度业绩入口已上线；此前预告合并销售约 171 万亿韩元、营业利润约 89.4 万亿韩元，市场关注 HBM4、服务器内存、2nm 与先进封装的增量贡献。",
    takeaway: "存储高景气需要继续由 HBM 产品结构、传统 DRAM/NAND 价格及资本开支共同验证；代工端重点观察 2nm 客户爬坡和良率。",
    source: "Samsung Electronics Investor Relations",
    url: sourceLinks.samsungQ2,
  },
  {
    id: 16,
    date: "07-30",
    grade: "A",
    importance: 3,
    category: "半导体设备",
    company: "KLA",
    title: "KLA FY26 Q4 营收 36.6 亿美元，下一季指引中值升至 40 亿美元",
    summary: "季度收入高于指引中值；公司判断先进逻辑、存储复杂度与先进封装正在共同提高过程控制和量检测需求。",
    takeaway: "设备链景气不只来自新增晶圆产能，制程复杂度提升也会增加单位产能的量检测强度；需跟踪订单、交付与客户资本开支兑现。",
    source: "KLA Investor Relations",
    url: sourceLinks.klaQ4,
  },
  {
    id: 15,
    date: "07-30",
    grade: "A",
    importance: 2,
    category: "汽车芯片 / 边缘 AI",
    company: "NXP",
    title: "NXP Q2 营收 35.0 亿美元、同比增长 19%，三季度指引中值 37.5 亿美元",
    summary: "汽车、工业与 IoT 等终端实现广泛改善，公司把软件定义汽车、Physical AI 和数据中心列为增长引擎。",
    takeaway: "成熟制程复苏开始出现公司级证据，但仍应区分库存补库与终端真实增长；重点观察汽车订单、工业需求和毛利率持续性。",
    source: "NXP Investor Relations",
    url: sourceLinks.nxpQ2,
  },
  {
    id: 14,
    date: "07-30",
    grade: "A",
    importance: 2,
    category: "CPU / IP",
    company: "Arm",
    title: "Arm FY27 Q1 业绩材料上线，云端 CPU、DPU/SmartNIC 与边缘 AI 仍是核心跟踪方向",
    summary: "公司已举行 FY27 Q1 业绩会；研究重点从手机授权收入进一步扩展至云服务器 CPU、网络处理器和 Arm AGI CPU 的客户与供给兑现。",
    takeaway: "Arm 架构在 AI 数据中心的渗透将影响 CPU、先进制程、Chiplet、内存带宽和网络芯片需求，但需按量产收入而非合作声明验证。",
    source: "Arm Investor Relations",
    url: sourceLinks.armQ1,
  },
  {
    id: 13,
    date: "07-30",
    grade: "A",
    importance: 2,
    category: "CPO / 连接器",
    company: "Amphenol",
    title: "Amphenol 举行 2026 年二季度业绩会，高速连接与 AI 数据中心需求进入财务验证",
    summary: "连接器龙头二季度业绩会已举行；对 CPO/光模块链的关键读数是通信解决方案、服务器连接、铜缆与光纤互连的订单和利润率。",
    takeaway: "AI 互连价值量并非只在光模块，背板、高速铜缆、连接器和光纤组件同样受益；需比较收入增速与库存、并购贡献和有机增长。",
    source: "Amphenol Investor Relations",
    url: sourceLinks.amphenolQ2,
  },
  {
    id: 12,
    date: "07-30",
    grade: "A",
    importance: 3,
    category: "云厂资本开支",
    company: "Microsoft",
    title: "FY26 Q4 营收 900 亿美元，Azure 增长 43%，商业剩余履约义务增长 84%",
    summary: "Microsoft Cloud 收入达到 593 亿美元、同比增长 27%；Azure 年收入首次超过 1000 亿美元，AI 与云需求继续支撑数据中心基础设施投入。",
    takeaway: "对半导体链的直接验证点是 GPU/ASIC 服务器、交换网络、光互连、电源与液冷需求；后续需继续核对资本开支、折旧和供给约束。",
    source: "Microsoft FY26 Q4 官方业绩",
    url: sourceLinks.microsoftQ4,
  },
  {
    id: 11,
    date: "07-30",
    grade: "A",
    importance: 3,
    category: "云厂资本开支",
    company: "Meta",
    title: "Meta 发布 2026 年二季度业绩，AI 基础设施投入仍是供应链核心变量",
    summary: "二季度收入约 608 亿美元、同比增长 28%；广告业务继续为 AI 算力、数据中心和网络建设提供现金流支持。",
    takeaway: "市场需要同步观察全年资本开支区间、训练与推理算力结构，以及光模块、交换机和数据中心配套设备的订单兑现。",
    source: "Meta Q2 2026 官方业绩",
    url: sourceLinks.metaQ2,
  },
  {
    id: 10,
    date: "07-30",
    grade: "A",
    importance: 2,
    category: "AI 芯片",
    company: "Qualcomm",
    title: "Qualcomm 发布 FY26 Q3 业绩，手机链压力与数据中心多元化并行",
    summary: "公司季度业绩已在官方投资者关系页面发布；短期关注手机客户结构与存储供给约束，中期关注 Dragonfly 数据中心路线及非手机业务占比。",
    takeaway: "对产业链而言，手机 SoC 需求与先进制程投片仍需谨慎，数据中心 CPU/AI 芯片则提供新的先进封装、互连和服务器增量观察点。",
    source: "Qualcomm Investor Relations",
    url: sourceLinks.qualcommQ3,
  },
  {
    id: 1,
    date: "07-29",
    grade: "A",
    importance: 3,
    category: "晶圆代工",
    company: "TSMC",
    title: "2Q26 营收 402 亿美元、毛利率 67.7%，3Q 指引继续上修至 446–458 亿美元",
    summary: "先进制程与 AI 加速器需求仍是收入和毛利的主驱动，供给侧关注 CoWoS 扩产与 2nm 爬坡节奏。",
    takeaway: "需求可见度继续向 2027 年延伸，先进节点与封装设备链仍是高景气核心。",
    source: "TSMC IR",
    url: sourceLinks.tsmc,
  },
  {
    id: 2,
    date: "07-29",
    grade: "A",
    importance: 3,
    category: "设备",
    company: "SEMI",
    title: "2026 年全球晶圆厂设备投资预计 1520 亿美元，同比增长 24%",
    summary: "SEMI 2Q26 World Fab Forecast 同时预计 2027 年达到 1660 亿美元，逻辑与存储是两大投入方向。",
    takeaway: "设备上行周期斜率抬升，但订单兑现仍需按客户、区域和工艺环节拆分。",
    source: "SEMI",
    url: sourceLinks.semi,
  },
  {
    id: 3,
    date: "07-28",
    grade: "A",
    importance: 3,
    category: "存储",
    company: "Micron",
    title: "FY26 Q3 收入 414.6 亿美元，HBM4 已面向头部平台进入量产出货",
    summary: "公司给出 FY26 Q4 收入 500 亿美元上下 10 亿美元的指引，AI 内存供需继续紧张。",
    takeaway: "存储景气由价格修复转向结构升级，HBM、DDR5 与企业级 SSD 贡献更高增量。",
    source: "Micron IR",
    url: sourceLinks.micron,
  },
  {
    id: 4,
    date: "07-28",
    grade: "A",
    importance: 2,
    category: "AI 芯片",
    company: "NVIDIA",
    title: "Vera Rubin 平台进入全面量产爬坡，系统级创新继续推高互连与封装价值量",
    summary: "平台从单颗 GPU 延伸到 CPU、交换芯片、光互连与机柜级系统，供应链验证转向交付节奏。",
    takeaway: "算力投资的观察单位已从芯片升级为系统，电源、散热、互连和先进封装同步受益。",
    source: "NVIDIA IR",
    url: sourceLinks.nvidia,
  },
  {
    id: 5,
    date: "07-27",
    grade: "B",
    importance: 2,
    category: "材料",
    company: "产业跟踪",
    title: "先进封装与先进节点继续抬升晶圆厂设备和关键材料投入强度",
    summary: "SEMI 的晶圆厂预测显示先进逻辑与存储仍是主要投资方向，材料研究需把认证、量产和份额提升分阶段验证。",
    takeaway: "材料环节可能具备较大盈利弹性，但未经公司公告或原始行业数据确认的金额与时点不进入核心结论。",
    source: "SEMI World Fab Forecast",
    url: sourceLinks.semi,
  },
  {
    id: 6,
    date: "07-26",
    grade: "B",
    importance: 1,
    category: "汽车芯片",
    company: "行业渠道",
    title: "汽车与工业半导体仍处库存调整期，复苏判断需等待公司正式披露",
    summary: "成熟制程不能仅凭渠道传闻判断反转，页面将库存、稼动率与价格列为待公司财报共同确认的三项指标。",
    takeaway: "在三项指标未形成共振前，AI 仅把该环节列为观察，不将其作为已经确认的景气反转。",
    source: "Infineon 官方财报与演示材料",
    url: sourceLinks.infineon,
  },
  {
    id: 7,
    date: "07-29",
    grade: "A",
    importance: 3,
    category: "CPO / 光模块",
    company: "Broadcom",
    title: "CPO 从技术验证走向系统导入，交换芯片、光引擎与封装协同成为竞争核心",
    summary: "51.2T/102.4T 交换平台推动可插拔光模块向更高带宽密度演进，CPO、NPO 与线性光学并行验证。",
    takeaway: "短期收入仍由 800G/1.6T 可插拔贡献，CPO 的投资价值先体现在硅光、光引擎、CW 激光器、FAU 与先进封装能力。",
    source: "Broadcom Optical System Solutions",
    url: sourceLinks.broadcomCpo,
  },
  {
    id: 8,
    date: "07-29",
    grade: "B",
    importance: 3,
    category: "CPO / 光模块",
    company: "中际旭创",
    title: "1.6T 产品进入放量验证期，价格、良率与客户结构将决定盈利弹性",
    summary: "市场关注从 800G 出货总量切换到 1.6T 渗透率、单通道 200G 良率、DSP 与光芯片供应，以及北美云厂订单份额。",
    takeaway: "判断不能只看出货量；需要同步跟踪产品结构、单位成本、客户集中度和资本开支回收期。",
    source: "中际旭创投资者关系",
    url: sourceLinks.innolightIr,
  },
  {
    id: 9,
    date: "07-28",
    grade: "A",
    importance: 3,
    category: "光通信",
    company: "Corning",
    title: "AI 数据中心继续拉动企业网络与光纤连接需求，光通信链从模块向布线系统扩散",
    summary: "高密度机柜、scale-up/scale-out 网络与园区互联共同提高光纤、连接器和布线系统的价值量。",
    takeaway: "CPO 并不会消灭外部光连接，反而可能提高机柜内外光纤密度；需区分模块份额迁移与全系统光口数量增长。",
    source: "Corning IR",
    url: sourceLinks.corning,
  },
];

const archiveMarketEvents = dailyMarketArchive
  .filter((day) => day.date > "2026-07-30")
  .map((day, index) => ({
    id: 2000 + index,
    date: day.date.slice(5),
    grade: "A",
    importance: 3,
    category: "A股盘后",
    company: "半导体产业链",
    title: `${day.date.slice(5)} 产业链算术平均 ${day.averageChange > 0 ? "+" : ""}${day.averageChange.toFixed(2)}%，${day.rising}/${day.coverage} 家上涨`,
    summary: `领涨：${day.leaders.slice(0, 3).map((row) => `${row.sector} ${row.averageChange > 0 ? "+" : ""}${row.averageChange.toFixed(2)}%`).join("、")}；相对落后：${day.laggards.slice(0, 3).map((row) => `${row.sector} ${row.averageChange > 0 ? "+" : ""}${row.averageChange.toFixed(2)}%`).join("、")}。`,
    takeaway: "板块数据为现有成分股简单算术平均，用于观察行情广度；不代表市值加权指数，也不能替代公司基本面。",
    source: "东方财富历史收盘行情 · 本站算术平均",
    url: sourceLinks.eastmoneyMarket,
  }));

const archiveResearchEvents = dailyNewsArchive
  .filter((day) => day.date > "2026-07-30")
  .flatMap((day, dayIndex) => day.items.map((item, itemIndex) => ({
    id: 3000 + dayIndex * 20 + itemIndex,
    date: day.date.slice(5),
    grade: "A",
    importance: item.category.includes("前瞻") || item.category.includes("CPO") ? 3 : 2,
    category: item.category,
    company: item.company,
    title: item.title,
    summary: item.takeaway,
    takeaway: day.focus,
    source: item.source,
    url: item.url,
  })));

const events = [...archiveResearchEvents, ...archiveMarketEvents, ...legacyEvents];

const companies = [
  { rank: 1, name: "中际旭创", segment: "光模块", score: 94, trend: "+5", signal: "1.6T 验证", color: "#2674ff", source: sourceLinks.innolightIr },
  { rank: 2, name: "TSMC", segment: "晶圆代工", score: 93, trend: "+4", signal: "景气上修", color: "#147bb8", source: sourceLinks.tsmc },
  { rank: 3, name: "新易盛", segment: "光模块", score: 91, trend: "+6", signal: "份额跟踪", color: "#17a589", source: sourceLinks.eoptolink16t },
  { rank: 4, name: "天孚通信", segment: "光器件", score: 89, trend: "+4", signal: "上游卡位", color: "#a856e7", source: sourceLinks.cninfo },
  { rank: 5, name: "NVIDIA", segment: "AI 芯片", score: 88, trend: "+2", signal: "系统放量", color: "#58a929", source: sourceLinks.nvidia },
  { rank: 6, name: "Coherent", segment: "光芯片/器件", score: 84, trend: "+3", signal: "供给验证", color: "#e08d22", source: sourceLinks.coherent },
  { rank: 7, name: "Micron", segment: "存储", score: 83, trend: "+5", signal: "量价齐升", color: "#7f55b3", source: sourceLinks.micron },
  { rank: 8, name: "光迅科技", segment: "光模块/器件", score: 78, trend: "+2", signal: "客户突破", color: "#d64d4d", source: sourceLinks.cninfo },
];

const chain = [
  { name: "EDA / IP", names: "Synopsys · Cadence · Arm", heat: 78, change: "+2", source: "https://investor.cadence.com/" },
  { name: "AI 芯片设计", names: "NVIDIA · AMD · 国产算力", heat: 94, change: "+5", source: sourceLinks.nvidia },
  { name: "晶圆代工", names: "TSMC · Samsung · 中芯国际", heat: 91, change: "+4", source: sourceLinks.tsmc },
  { name: "存储", names: "SK hynix · Micron · 长鑫科技", heat: 96, change: "+8", source: sourceLinks.micron },
  { name: "设备", names: "ASML · AMAT · 北方华创", heat: 88, change: "+3", source: sourceLinks.semi },
  { name: "材料", names: "硅片 · 光刻胶 · 电子特气", heat: 74, change: "+1", source: sourceLinks.semi },
  { name: "先进封装", names: "CoWoS · HBM · 玻璃基板", heat: 93, change: "+6", source: sourceLinks.tsmc },
  { name: "CPO / 光模块", names: "800G · 1.6T · CPO · LPO · 硅光", heat: 97, change: "+8", source: sourceLinks.broadcomCpo },
  { name: "终端需求", names: "AI 服务器 · 汽车 · 消费电子", heat: 85, change: "+2", source: sourceLinks.sec },
];

const capex = [
  { year: "2024", value: 97, type: "actual" },
  { year: "2025", value: 123, type: "actual" },
  { year: "2026E", value: 152, type: "forecast" },
  { year: "2027E", value: 166, type: "forecast" },
];

function Grade({ value }) {
  return <span className={`grade grade-${value}`}>{value}</span>;
}

function SourceLink({ href, label = "原始网站", compact = false }) {
  if (!/^https?:\/\//i.test(href || "")) return null;
  return <a className={`source-link ${compact ? "compact" : ""}`} href={href} target="_blank" rel="noreferrer">↗ {label}</a>;
}

const formatPrice = (quote) => {
  if (!quote) return "暂无公开行情";
  const prefix = quote.currency === "HKD" ? "HK$" : "¥";
  return `${prefix}${Number(quote.price).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 3 })}`;
};

const formatMarketCap = (quote) => {
  if (!quote?.marketCap) return "暂无公开数据";
  const unit = quote.currency === "HKD" ? "亿港元" : "亿元";
  return `≈${(quote.marketCap / 1e8).toLocaleString("zh-CN", { maximumFractionDigits: 1 })}${unit}`;
};

const formatMultiple = (value, lossLabel = "亏损 / 不适用") =>
  typeof value === "number" && value > 0 ? `${value.toFixed(2)}×` : lossLabel;

const formatShares = (quote) =>
  quote?.totalShares ? `${(quote.totalShares / 1e8).toLocaleString("zh-CN", { maximumFractionDigits: 2 })}亿股` : "暂无公开数据";
const sectorAverageChange = (sector, quotes) => {
  const changes = sector.companies
    .map((company) => company.code ? quotes[company.code]?.changePercent : null)
    .filter((value) => typeof value === "number" && Number.isFinite(value));
  if (!changes.length) return null;
  return changes.reduce((sum, value) => sum + value, 0) / changes.length;
};
const formatAverageChange = (value) =>
  value == null ? "均幅 —" : `均幅 ${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

const MARKET_POLL_INTERVAL = 60_000;
const marketSecid = (code) => {
  if (code.length < 6) return `116.${code.padStart(5, "0")}`;
  return `${code.startsWith("6") ? "1" : "0"}.${code}`;
};
const marketTimestamp = (seconds) => new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
}).format(new Date(seconds * 1000)).replaceAll("/", "-");
const isMainlandTradingSession = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  if (["Sat", "Sun"].includes(values.weekday)) return false;
  const minutes = Number(values.hour) * 60 + Number(values.minute);
  return (minutes >= 9 * 60 + 15 && minutes <= 11 * 60 + 35)
    || (minutes >= 12 * 60 + 55 && minutes <= 15 * 60 + 5);
};
const fetchLatestMarketData = async (signal) => {
  const codes = Object.keys(marketData);
  const batches = [];
  for (let offset = 0; offset < codes.length; offset += 70) batches.push(codes.slice(offset, offset + 70));
  const rows = (await Promise.all(batches.map(async (batch) => {
    const url = new URL("https://push2delay.eastmoney.com/api/qt/ulist.np/get");
    url.searchParams.set("fltt", "2");
    url.searchParams.set("secids", batch.map(marketSecid).join(","));
    url.searchParams.set("fields", "f2,f3,f9,f12,f14,f20,f23,f124");
    url.searchParams.set("_", String(Date.now()));
    const response = await fetch(url, { cache: "no-store", signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    return payload?.data?.diff || [];
  }))).flat();
  const byCode = new Map(rows.map((row) => [String(row.f12), row]));
  return Object.fromEntries(codes.map((code) => {
    const previous = marketData[code];
    const row = byCode.get(code.length < 6 ? code.padStart(5, "0") : code);
    if (!row || typeof row.f2 !== "number" || row.f2 <= 0) return [code, previous];
    return [code, {
      ...previous,
      name: row.f14 || previous.name,
      price: row.f2,
      changePercent: typeof row.f3 === "number" ? row.f3 : previous.changePercent,
      marketCap: typeof row.f20 === "number" ? row.f20 : previous.marketCap,
      pe: typeof row.f9 === "number" ? row.f9 : previous.pe,
      pb: typeof row.f23 === "number" ? row.f23 : previous.pb,
      totalShares: typeof row.f20 === "number" ? row.f20 / row.f2 : previous.totalShares,
      updatedAt: typeof row.f124 === "number" ? marketTimestamp(row.f124) : previous.updatedAt,
    }];
  }));
};

function Sparkline({ points = [18, 23, 21, 30, 34, 45, 51] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${34 - ((p - min) / (max - min || 1)) * 28}`)
    .join(" ");
  return (
    <svg className="spark" viewBox="0 0 100 38" aria-label="趋势向上">
      <polyline points={coords} fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="100" cy={coords.split(" ").at(-1).split(",")[1]} r="2.8" fill="currentColor" />
    </svg>
  );
}

function MetricCard({ label, value, delta, note, tone = "blue", points, sourceUrl }) {
  return (
    <article className={`metric metric-${tone}`}>
      <div>
        <div className="metric-label">{label}</div>
        <strong>{value}</strong>
        <span className="delta">{delta}</span>
      </div>
      <Sparkline points={points} />
      <small>{note}</small>
      {sourceUrl && <SourceLink href={sourceUrl} label="原始网站" compact />}
    </article>
  );
}

function EventCard({ item, favorite, onFavorite }) {
  return (
    <article className="event-card" data-search={`${item.company} ${item.category} ${item.title} ${item.summary}`}>
      <div className="event-meta">
        <span className="date">{item.date}</span>
        <Grade value={item.grade} />
        <span className="category">{item.category}</span>
        <span className="entity">{item.company}</span>
        <button
          className={`star ${favorite ? "on" : ""}`}
          onClick={() => onFavorite(item.id)}
          aria-label={favorite ? "取消收藏" : "收藏"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>
      <a className="event-title" href={item.url} target={item.url.startsWith("http") ? "_blank" : undefined}>
        {item.title}
      </a>
      <p>{item.summary}</p>
      <div className="takeaway"><b>研究判断</b>{item.takeaway}</div>
      <div className="source">来源：{item.source} · 可信度 {item.grade} <SourceLink href={item.url.startsWith("http") ? item.url : sourceLinks.cninfo} label="原始网站" compact /></div>
    </article>
  );
}

function SectionTitle({ icon, title, note, action }) {
  return (
    <div className="section-title">
      <span>{icon}</span>
      <h2>{title}</h2>
      <small>{note}</small>
      {action}
    </div>
  );
}

function Home({ filteredEvents, favorites, toggleFavorite, go }) {
  return (
    <div className="home-layout">
      <aside className="local-nav">
        <b>本页目录</b>
        <a href="#verdict">三条判断</a>
        <a href="#metrics">高频数据</a>
        <a href="#focus">重点事件</a>
        <a href="#cpo-focus">CPO 专题</a>
        <a href="#chain-heat">产业链热度</a>
        <a href="#companies">公司记分卡</a>
        <a href="#capex-chart">资本开支</a>
      </aside>
      <div className="home-main">
        <section className="digest" id="verdict">
          <div><b>📌 今日速读：</b>CPO / 光模块位于研究首位 · 1.6T 进入放量验证 · 光芯片、CW 激光与精密封装价值量提升</div>
          <small>阅读路径：1 分钟看判断 → 5 分钟看事件 → 10 分钟进入 CPO 专题与公司矩阵 <SourceLink href={sourceLinks.broadcomCpo} label="判断输入原始网站" compact /></small>
        </section>

        <SectionTitle icon="◉" title="今日三条判断" note={`更新于 ${MARKET_DATA_GENERATED_AT} · 研究判断优先于信息堆叠`} />
        <section className="verdict-list">
          {[
            ["1", "CPO", "光互连从 800G/1.6T 可插拔走向多技术路线并行", "近期业绩由可插拔模块兑现，中期 CPO/NPO/LPO 提供增量；研究重点转向光芯片、CW 激光、FAU 与封装测试。", sourceLinks.broadcomCpo],
            ["2", "供给", "设备周期上修，但订单兑现将显著分化", "SEMI 将 2026 年全球晶圆厂设备投资预期推至 1520 亿美元。先进节点与存储更强，成熟制程仍需观察稼动率。", sourceLinks.semi],
            ["3", "估值", "高景气赛道进入业绩与份额验证期", "二季度财报窗口将决定高估值能否维持。优先寻找订单、收入、毛利三项同时改善的公司，回避只靠主题扩散的标的。", sourceLinks.sec],
          ].map(([num, tag, title, desc, url]) => (
            <article className="verdict" key={num}>
              <span className="number">{num}</span>
              <div>
                <span className="pill">{tag}</span>
                <b>{title}</b>
                <p><b>AI 判断：</b>{desc}</p>
                <SourceLink href={url} label="原始网站" compact />
              </div>
            </article>
          ))}
        </section>

        <SectionTitle icon="⌁" title="高频数据" note="官方披露与研究口径分开呈现" />
        <section className="metric-grid" id="metrics">
          <MetricCard label="全球晶圆厂设备 2026E" value="$152B" delta="+24% YoY" note="SEMI · A级" points={[82, 91, 97, 123, 152]} sourceUrl={sourceLinks.semi} />
          <MetricCard label="TSMC 2Q26 营收" value="$40.2B" delta="超指引上沿" note="TSMC IR · A级" tone="orange" points={[25, 28, 31, 36, 40]} sourceUrl={sourceLinks.tsmc} />
          <MetricCard label="Micron FY26 Q3 营收" value="$41.46B" delta="+74% QoQ" note="Micron IR · A级" tone="purple" points={[9, 12, 24, 41]} sourceUrl={sourceLinks.micron} />
          <MetricCard label="CPO / 光模块热度" value="97 / 100" delta="+8 周环比" note="研究事件模型 · 输入来源 Broadcom" tone="green" points={[62, 66, 73, 79, 85, 91, 97]} sourceUrl={sourceLinks.broadcomCpo} />
        </section>

        <div id="cpo-focus" className="cpo-callout">
          <div><span>重点专题</span><b>CPO / 光模块投资工作台</b><p>技术路线、公司矩阵、跟踪清单、风险证伪五个视角完整展开。</p></div>
          <button onClick={() => go("cpo")}>进入专题 →</button>
        </div>

        <SectionTitle
          icon="◎"
          title="今日重点事件"
          note={`${filteredEvents.length} 条匹配`}
          action={<button className="text-btn" onClick={() => go("events")}>查看全部 →</button>}
        />
        <section id="focus">
          {filteredEvents.slice(0, 4).map((item) => (
            <EventCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={toggleFavorite} />
          ))}
          {filteredEvents.length === 0 && <div className="empty">没有匹配当前筛选条件的事件。</div>}
        </section>

        <SectionTitle icon="⬡" title="产业链热度" note="0–100 研究热度，不代表投资评级" />
        <section className="chain-grid" id="chain-heat">
          {chain.map((item) => (
            <article className="chain-card" key={item.name} role="button" tabIndex={0} onClick={() => go(item.name.includes("存储") ? "memory" : "chain")} onKeyDown={(event) => event.key === "Enter" && go(item.name.includes("存储") ? "memory" : "chain")}>
              <div className="chain-top"><b>{item.name}</b><span>{item.change}</span></div>
              <div className="heat"><i style={{ width: `${item.heat}%` }} /></div>
              <div className="chain-bottom"><span>{item.names}</span><strong>{item.heat}</strong></div>
              <span onClick={(event) => event.stopPropagation()}><SourceLink href={item.source} label="热度输入来源" compact /></span>
            </article>
          ))}
        </section>

        <SectionTitle icon="◇" title="公司记分卡" note="景气、竞争力、兑现度三维综合" />
        <section className="company-panel" id="companies">
          <div className="company-head"><span>排名 / 公司</span><span>赛道</span><span>评分</span><span>变化</span><span>信号</span></div>
          {companies.map((company) => (
            <div className="company-row" key={company.name}>
              <span><i>#{company.rank}</i><b>{company.name}</b></span>
              <span>{company.segment}</span>
              <span className="score"><i style={{ width: `${company.score}%`, background: company.color }} /> <b>{company.score}</b></span>
              <span className={company.trend.startsWith("+") ? "up" : "down"}>{company.trend}</span>
              <span><em>{company.signal}</em><SourceLink href={company.source} label="原始网站" compact /></span>
            </div>
          ))}
        </section>

        <SectionTitle icon="↗" title="全球晶圆厂设备资本开支" note="单位：十亿美元" />
        <section className="capex-panel" id="capex-chart">
          <div className="bars">
            {capex.map((item) => (
              <div className="bar-col" key={item.year}>
                <b>${item.value}B</b>
                <div className={`bar ${item.type}`} style={{ height: `${(item.value / 180) * 190}px` }} />
                <span>{item.year}</span>
              </div>
            ))}
          </div>
          <div className="capex-copy">
            <b>上行周期仍在加速</b>
            <p>2026 年设备投资预计同比增长 24%，2027 年继续增长 9%。逻辑与存储共同驱动，先进节点、HBM 和本地化扩产是三条主线。</p>
            <a href={sourceLinks.semi} target="_blank">查看 SEMI 原始口径 ↗</a>
          </div>
        </section>
      </div>
    </div>
  );
}

function EventStream({ items, favorites, toggleFavorite, title = "关键事件流" }) {
  const [category, setCategory] = useState("全部");
  const categories = ["全部", ...new Set(items.map((item) => item.category))];
  const visible = category === "全部" ? items : items.filter((item) => item.category === category);
  return (
    <>
      <SectionTitle icon="⌁" title={title} note="按事件—原因—跟踪变量组织" />
      <div className="filter-row">
        {categories.map((item) => (
          <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>
      {visible.map((item) => (
        <EventCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={toggleFavorite} />
      ))}
      {visible.length === 0 && <div className="empty">当前没有匹配事件。</div>}
    </>
  );
}

const sectorResearch = {
  "硅片": ["先进节点与国产替代的基础材料", "客户认证 · 大尺寸占比 · 稼动率"],
  "AI芯片": ["训练、推理与国产算力核心处理器", "客户导入 · 软件生态 · 系统交付"],
  "存储": ["NOR、DRAM、NAND 与控制器产业链", "合约价 · 位元出货 · 库存 · HBM 映射"],
  "光通信(光模块/光芯片)": ["800G、1.6T、硅光、CPO 与上游光器件", "客户份额 · 产品结构 · 良率 · 年降"],
  "半导体设备": ["刻蚀、薄膜、清洗、量检测、测试与封装设备", "订单 · 客户验证 · 交付验收 · 国产份额"],
  "液冷": ["AI 机柜热密度提升对应的冷却系统与零部件", "订单 · 单机价值量 · 客户认证 · 产能"],
  "电源": ["数据中心 UPS、HVDC、电源模块与供配电", "功率密度 · 订单 · 毛利率 · 海外份额"],
};

function ChainPage() {
  const defaultSector = chainAtlasSectors.find((item) => item.name.startsWith("光通信")) || chainAtlasSectors[0];
  const [selectedName, setSelectedName] = useState(defaultSector.name);
  const [openNames, setOpenNames] = useState([defaultSector.name]);
  const [treeQuery, setTreeQuery] = useState("");
  const [panelQuery, setPanelQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showUpdates, setShowUpdates] = useState(true);
  const [activeBoardTag, setActiveBoardTag] = useState("全部");
  const [embeddedUrl, setEmbeddedUrl] = useState("");
  const [liveMarketData, setLiveMarketData] = useState(marketData);
  const [marketStatus, setMarketStatus] = useState({
    loading: false,
    error: "",
    checkedAt: MARKET_DATA_GENERATED_AT,
  });
  const refreshMarket = async (signal) => {
    setMarketStatus((current) => ({ ...current, loading: true, error: "" }));
    try {
      const latest = await fetchLatestMarketData(signal);
      if (signal?.aborted) return;
      setLiveMarketData(latest);
      setMarketStatus({
        loading: false,
        error: "",
        checkedAt: marketTimestamp(Math.floor(Date.now() / 1000)),
      });
    } catch (error) {
      if (error?.name === "AbortError") return;
      setMarketStatus((current) => ({
        ...current,
        loading: false,
        error: "实时接口暂不可用，正在显示最近一次成功数据",
      }));
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    refreshMarket(controller.signal);
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible" && isMainlandTradingSession()) refreshMarket(controller.signal);
    }, MARKET_POLL_INTERVAL);
    return () => {
      window.clearInterval(timer);
      controller.abort();
    };
  }, []);
  const selected = chainAtlasSectors.find((item) => item.name === selectedName) || defaultSector;
  const selectedLogic = sectorLogic[selected.name];
  const [positioning, variables] = sectorResearch[selected.name] || [`${selected.name}产业链重点公司集合`, "订单 · 价格 · 份额 · 良率 · 资本开支"];
  const matchesTree = (sector) => !treeQuery || `${sector.name} ${sector.companies.map((company) => `${company.name} ${company.code}`).join(" ")}`.toLowerCase().includes(treeQuery.toLowerCase());
  const sourceGroupSectors = chainAtlasSectors.filter((sector) => sector.source === selected.source);
  const taggedSectors = activeBoardTag === "全部" ? sourceGroupSectors : sourceGroupSectors.filter((sector) => sector.name === activeBoardTag);
  const allBoardRows = taggedSectors.flatMap((sector) => {
    const [sectorPositioning, sectorVariables] = sectorResearch[sector.name] || [`${sector.name}产业链重点公司集合`, "订单 · 价格 · 份额 · 良率 · 资本开支"];
    return sector.companies.map((company) => ({ ...company, sector, positioning: sectorPositioning, variables: sectorVariables }));
  });
  const companyRows = allBoardRows.filter((company) => !panelQuery || `${company.name} ${company.code} ${company.sector.name} ${company.positioning} ${company.variables}`.toLowerCase().includes(panelQuery.toLowerCase()));
  const boardTotal = sourceGroupSectors.reduce((sum, sector) => sum + sector.companies.length, 0);
  const selectedCompanyRecord = selected.companies.find((company) => company.name === selectedCompany);
  const selectedQuote = selectedCompanyRecord?.code ? liveMarketData[selectedCompanyRecord.code] : null;
  const companySource = selectedCompanyRecord?.href || selected.source;
  const chooseSector = (sector) => {
    setSelectedName(sector.name);
    setSelectedCompany("");
    setPanelQuery("");
    setShowUpdates(false);
    setEmbeddedUrl("");
    setActiveBoardTag("全部");
    setOpenNames((current) => current.includes(sector.name) ? current : [...current, sector.name]);
  };
  const firstTreeMatch = chainAtlasSectors.flatMap((sector) => sector.companies.map((company) => ({ sector, company }))).find(({ company }) => `${company.name} ${company.code}`.toLowerCase().includes(treeQuery.toLowerCase()));
  const sourceBoards = chainAtlasUpdates.map((update) => ({
    ...update,
    ...(sourceMonitorData[update.source] || {}),
    names: chainAtlasSectors.filter((sector) => sector.source === update.source).map((sector) => sector.name),
  }));
  const changeTreeQuery = (value) => {
    setTreeQuery(value);
    if (value) {
      const matches = chainAtlasSectors.filter((sector) => `${sector.name} ${sector.companies.map((company) => `${company.name} ${company.code}`).join(" ")}`.toLowerCase().includes(value.toLowerCase())).map((sector) => sector.name);
      setOpenNames((current) => [...new Set([...current, ...matches])]);
    }
  };
  return (
    <>
      <SectionTitle icon="◫" title="半导体产业链标的一页纸" note={`${chainAtlasStreams.length} 层 · ${chainAtlasSectors.length} 子行业 · ${chainAtlasCompanyCount} 条映射 · ${MARKET_DATA_COVERAGE.updatedCodes}/${MARKET_DATA_COVERAGE.listedCodes} 个证券行情`} />
      <div className={`market-live-status ${marketStatus.error ? "has-error" : ""}`}>
        <span><i className="live-dot" />{marketStatus.loading ? "正在获取最新行情…" : marketStatus.error || "东方财富准实时行情已连接"}</span>
        <small>最近核验 {marketStatus.checkedAt} · 交易时段每 60 秒批量刷新 · 收盘后停止轮询</small>
        <button disabled={marketStatus.loading} onClick={() => refreshMarket()}>{marketStatus.loading ? "刷新中" : "立即刷新"}</button>
      </div>
      <div className="atlas-workbench">
        <aside className="atlas-tree">
          <label className="atlas-search">⌕ <input value={treeQuery} onChange={(event) => changeTreeQuery(event.target.value)} onKeyDown={(event) => {
            if (event.key === "Enter" && firstTreeMatch) {
              chooseSector(firstTreeMatch.sector);
              setSelectedCompany(firstTreeMatch.company.name);
            }
          }} placeholder="搜公司名 / 代码，回车打开第一个" /></label>
          <div className="atlas-tree-scroll">
            {chainAtlasStreams.map((stream) => (
              <section key={stream.id}>
                <h3 style={{ color: stream.color }}><i style={{ background: stream.color }} />{stream.name}</h3>
                {stream.sectors.filter(matchesTree).map((sector) => {
                  const open = openNames.includes(sector.name) || Boolean(treeQuery);
                  const averageChange = sectorAverageChange(sector, liveMarketData);
                  return <div className={`atlas-sector ${selected.name === sector.name ? "selected" : ""}`} key={sector.name}>
                    <button className="atlas-sector-head" onClick={() => {
                      setSelectedName(sector.name);
                      setSelectedCompany("");
                      setPanelQuery("");
                      setShowUpdates(false);
                      setEmbeddedUrl("");
                      setActiveBoardTag("全部");
                      setOpenNames((current) => current.includes(sector.name) ? current.filter((name) => name !== sector.name) : [...current, sector.name]);
                    }}>
                      <span>{open ? "▼" : "▶"}</span><i style={{ background: stream.color }} /><b>{sector.name}</b><em>LIVE</em><small>{sector.companies.length}</small><strong className={`sector-average ${averageChange > 0 ? "up" : averageChange < 0 ? "down" : "flat"}`} title={`${sector.name}成分股涨跌幅算术平均；已取得 ${sector.companies.filter((company) => company.code && liveMarketData[company.code]?.changePercent != null).length}/${sector.companies.length} 只行情`}>{formatAverageChange(averageChange)}</strong>
                    </button>
                    {open && <div className="atlas-company-list">
                      <SourceLink href={sector.source} label="该板块原始网站" compact />
                      {sector.companies.filter((company) => !treeQuery || `${company.name} ${company.code}`.toLowerCase().includes(treeQuery.toLowerCase())).map((company) => (
                        <button className={selectedCompany === company.name ? "active" : ""} key={`${company.name}-${company.code}`} onClick={() => { chooseSector(sector); setSelectedCompany(company.name); setShowUpdates(false); setEmbeddedUrl(""); }}>
                          {company.name}{company.code && <span>{company.code}</span>}
                        </button>
                      ))}
                    </div>}
                  </div>;
                })}
              </section>
            ))}
          </div>
        </aside>
        <section className="atlas-panel">
          <header className="atlas-panel-head">
            <button onClick={() => { setShowUpdates(true); setPanelQuery(""); setSelectedCompany(""); setEmbeddedUrl(""); }}>⌂ 更新看板</button>
            <b>{showUpdates ? "15 个来源站 · 更新状态" : embeddedUrl ? "原始来源站 · 内嵌预览" : `${selected.name} · ${selectedCompany || "板块全量"}`}</b><em>LIVE</em>
            {!showUpdates && <SourceLink href={embeddedUrl || companySource || selected.source} label="新标签打开" />}
          </header>
          {showUpdates ? <div className="atlas-updates">
            <div className="atlas-update-intro"><b>来源站更新看板</b><span>7 天内绿色 · 30 天内橙色 · 更早灰色 · 点击打开原始站点</span></div>
            <div className="atlas-update-grid">
              {sourceBoards.map((board) => <article key={board.source} role="button" tabIndex={0} onClick={() => { setEmbeddedUrl(board.boardHref); setShowUpdates(false); }} onKeyDown={(event) => {
                if (event.key === "Enter") { setEmbeddedUrl(board.boardHref); setShowUpdates(false); }
              }}>
                <div><span className={`freshness freshness-${board.freshness}`}>{board.relative}</span><em>LIVE</em></div>
                <b>{new URL(board.source).hostname}</b>
                <p>{board.names.join(" · ")}</p>
                <small>
                  {board.statedDate ? `来源声明 ${board.statedDate}` : "无站内日期 · 按页面内容指纹监测"}
                  {" · "}{board.ok ? `HTTP ${board.httpStatus}` : "本次连接失败，保留上次指纹"}
                  {" · "}SHA-1 {board.hash.slice(0, 8)}…
                  {" · "}检查 {board.checkedAt || SOURCE_MONITOR_GENERATED_AT}
                  {" · "}{board.changedSincePreviousCheck ? "检测到页面变化" : "未检测到新变化"}
                </small>
                <span onClick={(event) => event.stopPropagation()}><SourceLink href={board.source} label="打开原始来源站" /></span>
              </article>)}
            </div>
          </div> : embeddedUrl ? <div className="atlas-embed-stage">
            <div><b>已在工作区载入来源站</b><span>若来源站禁止 iframe，可使用右上角“新标签打开”。</span></div>
            <iframe title="产业链原始来源站" src={embeddedUrl} loading="lazy" referrerPolicy="no-referrer" />
          </div> : <>
            <div className="atlas-hero">
              <small>SEMICONDUCTOR INTELLIGENCE · 产业链一页纸合集</small>
              <h1>{selectedCompany || "半导体产业链"} · 个股扫描一页纸</h1>
              <p>{selected.streamName} / {sourceGroupSectors.map((sector) => sector.name).join(" / ")} · {boardTotal} NAMES</p>
              <b>事实由原始站点整理 · AI 摘要必须回源核验 · 点击公司查看完整研究卡片</b>
              <div><span>行情更新时间：{selectedQuote?.updatedAt || MARKET_DATA_GENERATED_AT}</span><span>研究来源：{new URL(selected.source).hostname}</span><span>行情来源：东方财富行情中心</span></div>
            </div>
            {selectedLogic && <section className={`sector-explainer ${featuredSectorNames.includes(selected.name) ? "featured" : ""}`} data-search={`${selected.name} ${selectedLogic.plain} ${selectedLogic.flow.join(" ")} ${selectedLogic.metrics.join(" ")}`}>
              {featuredSectorNames.includes(selected.name) && <figure className="sector-education-figure"><img src={chainEducationImage} alt="电子布、HBM存储与光通信CPO产业链科学示意图" /><figcaption><span>电子布 → 高速覆铜板</span><span>HBM → GPU先进封装</span><span>光芯片 → 1.6T/CPO</span></figcaption></figure>}
              <header><div><small>INDUSTRY LOGIC · 行业逻辑拆解</small><h2>{selected.name}：从上游投入到下游需求</h2><p>{selectedLogic.plain}</p></div><SourceLink href={selectedLogic.source || selected.source} label="行业技术原始网站" /></header>
              <div className="sector-flow">{selectedLogic.flow.map((step, index) => <React.Fragment key={step}><article><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b></article>{index < selectedLogic.flow.length - 1 && <i>→</i>}</React.Fragment>)}</div>
              <div className="sector-logic-grid">
                <article><small>商业角色</small><b>{selectedLogic.role}</b></article>
                <article><small>怎么赚钱</small><b>{selectedLogic.money}</b></article>
                <article><small>核心指标</small><div>{selectedLogic.metrics.map((item) => <span key={item}>{item}</span>)}</div></article>
                <article><small>催化剂</small><ul>{selectedLogic.catalysts.map((item) => <li key={item}>{item}</li>)}</ul></article>
                <article><small>风险 / 证伪</small><ul>{selectedLogic.risks.map((item) => <li key={item}>{item}</li>)}</ul></article>
                {selectedLogic.leaders && <article><small>公司角色辨析</small><b>{selectedLogic.leaders}</b></article>}
              </div>
              <p className="sector-method-note">研究顺序：先确认公司属于哪一环 → 再核验该业务收入占比 → 最后看价格、份额、良率与现金流；概念映射不能替代公司公告。</p>
            </section>}
            {!selectedCompany && <>
              <div className="atlas-panel-tools">
                <label>⌕ <input value={panelQuery} onChange={(event) => setPanelQuery(event.target.value)} placeholder="搜索公司名 / 代码 / 定位关键词（如 800G）" /></label>
                <button className={activeBoardTag === "全部" ? "active" : ""} onClick={() => setActiveBoardTag("全部")}>全部 ({boardTotal})</button>
                {sourceGroupSectors.map((sector) => <button className={activeBoardTag === sector.name ? "active" : ""} key={sector.name} onClick={() => setActiveBoardTag(sector.name)}>{sector.name} ({sector.companies.length})</button>)}
              </div>
              <div className="atlas-count">显示 {companyRows.length} / {activeBoardTag === "全部" ? boardTotal : taggedSectors[0]?.companies.length || 0} 家 · 搜索与板块标签可组合使用</div>
              <div className="atlas-company-grid">
                {companyRows.map((company) => (
                  <article key={`${company.name}-${company.code}`} data-search={`${company.name} ${company.code} ${selected.name} ${positioning} ${variables}`}>
                    <span>{company.sector.name}</span>
                    <h3>{company.name} {company.code && <em>{company.code}</em>}</h3>
                    <p>{company.positioning}。<b>AI 研究摘要：</b>该公司位于“{company.sector.name}”环节，需结合原始站点核对业务占比与最新财务数据。</p>
                    {(() => {
                      const quote = company.code ? liveMarketData[company.code] : null;
                      return <dl>
                        <div><dt>现价</dt><dd>{formatPrice(quote)}</dd></div>
                        <div><dt>总市值</dt><dd>{formatMarketCap(quote)}</dd></div>
                        <div><dt>PE / PB</dt><dd>{quote ? `${formatMultiple(quote.pe)} / ${formatMultiple(quote.pb, "—")}` : "暂无公开行情"}</dd></div>
                        <div><dt>数据日期</dt><dd>{quote?.updatedAt || MARKET_DATA_GENERATED_AT}</dd></div>
                        <div><dt>核心变量</dt><dd>{company.variables}</dd></div>
                        <div><dt>证伪条件</dt><dd>订单、份额或盈利趋势未能按预期兑现</dd></div>
                      </dl>;
                    })()}
                    <div className="atlas-card-actions"><button onClick={() => { chooseSector(company.sector); setSelectedCompany(company.name); }}>打开完整一页纸 →</button><SourceLink href={company.href} label={company.href === company.sector.source ? "板块原始站" : "公司原始一页纸"} compact />{company.code && liveMarketData[company.code] && <SourceLink href={liveMarketData[company.code].sourceUrl} label="最新行情原页" compact />}</div>
                  </article>
                ))}
              </div>
              {companyRows.length === 0 && <div className="empty">没有匹配的公司；请尝试公司名、代码、定位关键词或切换板块标签。</div>}
            </>}
            {selectedCompany && <div className="company-onepager">
              <header><div><span>个股扫描 · 一页纸</span><h2>{selectedCompany} <em>{selected.companies.find((company) => company.name === selectedCompany)?.code}</em></h2><p>{positioning}</p></div><button onClick={() => setSelectedCompany("")}>返回板块全量</button></header>
              <div className="onepager-metrics">
                <article><small>现价</small><b>{formatPrice(selectedQuote)}</b><em>{selectedQuote?.changePercent == null ? "—" : `${selectedQuote.changePercent >= 0 ? "+" : ""}${selectedQuote.changePercent.toFixed(2)}%`}</em></article>
                <article><small>总市值</small><b>{formatMarketCap(selectedQuote)}</b></article>
                <article><small>PE / PB</small><b>{selectedQuote ? `${formatMultiple(selectedQuote.pe)} / ${formatMultiple(selectedQuote.pb, "—")}` : "暂无公开行情"}</b></article>
                <article><small>总股本</small><b>{formatShares(selectedQuote)}</b></article>
                <article><small>产业链位置</small><b>{selected.streamName}</b></article>
                <article><small>细分环节</small><b>{selected.name}</b></article>
                <article><small>行情数据日期</small><b>{selectedQuote?.updatedAt || MARKET_DATA_GENERATED_AT}</b></article>
                <article><small>行情来源</small><b>{selectedQuote?.sourceName || "暂无上市证券代码"}</b>{selectedQuote && <SourceLink href={selectedQuote.sourceUrl} label="行情原页" compact />}</article>
              </div>
              {[
                ["01", "业务构成", `AI 总结：围绕${selected.name}梳理收入板块、业务占比、同比变化和毛利贡献；最新数字必须在原始网站或公司公告核验。`],
                ["02", "核心敞口、弹性与产业链位置", `AI 总结：${positioning}。核心跟踪变量为${variables}。`],
                ["03", "放量逻辑与敏感性", "AI 总结：把订单、价格、良率、产能和客户份额拆成中性/乐观/压力三种情景，不用单一 TAM 直接推导利润。"],
                ["04", "估值与市值空间", "AI 总结：采用分部估值、周期主业 PE 与核心成长业务独立倍数；页面不展示未经实时行情核验的目标价。"],
                ["05", "催化剂与风险证伪", "催化剂：订单、认证、扩产和财报兑现。证伪：需求下降、价格快降、份额流失、良率或现金流恶化。"],
              ].map(([num, title, copy]) => <article className="onepager-section" key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p><SourceLink href={companySource} label={companySource === selected.source ? `${selectedCompany} 板块原始站` : `${selectedCompany} 完整原始一页纸`} />{num === "04" && selectedQuote && <SourceLink href={selectedQuote.sourceUrl} label={`估值行情原页 · ${selectedQuote.updatedAt}`} />}</div></article>)}
              <div className="onepager-tables">
                <table><thead><tr><th>业务 / 指标</th><th>收入占比</th><th>同比</th><th>毛利率</th><th>核验状态</th></tr></thead><tbody><tr><td>{selected.name}核心业务</td><td colSpan="3">不在无实时数据时编造数值</td><td><SourceLink href={companySource} label="原始披露" compact /></td></tr></tbody></table>
                <table><thead><tr><th>情景</th><th>订单 / 价格 / 良率假设</th><th>估值口径</th><th>研究动作</th></tr></thead><tbody><tr><td>压力</td><td>任一核心变量低于验证线</td><td>周期主业保守倍数</td><td>等待证据</td></tr><tr><td>中性</td><td>订单与盈利按原始指引兑现</td><td>分部估值</td><td>持续跟踪</td></tr><tr><td>乐观</td><td>份额与产品结构共同改善</td><td>成长业务独立倍数</td><td>需二次核验</td></tr></tbody></table>
              </div>
              <div className="disclaimer">财务数据、行情、PE/PB、业务分部与管理层表述以原始站点及公司正式披露为准。</div>
            </div>}
          </>}
        </section>
      </div>
      <div className="disclaimer">完整清单来自参考站公开的产业链图谱；本站只做半导体投资研究编排，卡片中的 AI 解释必须通过“原始网站”复核，不构成投资建议。</div>
    </>
  );
}

function ScorePage() {
  return (
    <>
      <SectionTitle icon="◇" title="公司记分卡" note="高景气不等于高赔率" />
      <div className="score-grid">
        {companies.map((company) => (
          <article className="score-card" key={company.name}>
            <div className="score-title"><span>#{company.rank}</span><b>{company.name}</b><em>{company.segment}</em></div>
            <div className="score-body">
              <div className="score-ring" style={{ "--score": `${company.score * 3.6}deg`, "--ring": company.color }}>
                <strong>{company.score}</strong><small>总分</small>
              </div>
              <div className="dimensions">
                {[["景气", company.score], ["竞争力", company.score - 4], ["兑现度", company.score - 7]].map(([label, value]) => (
                  <div key={label}><span>{label}</span><i><b style={{ width: `${value}%`, background: company.color }} /></i><em>{value}</em></div>
                ))}
              </div>
            </div>
            <div className="score-signal"><span>{company.signal}</span><b className={company.trend.startsWith("+") ? "up" : "down"}>{company.trend}</b></div>
            <SourceLink href={company.source} label={`${company.name} 原始网站`} compact />
          </article>
        ))}
      </div>
      <div className="disclaimer">公司评分属于 AI 研究模型，不是外部事实；输入来源以公司公告、交易所文件和官方 IR 为准。 <SourceLink href={sourceLinks.cninfo} label="A股公告原始网站" compact /> <SourceLink href={sourceLinks.sec} label="美股公告原始网站" compact /></div>
    </>
  );
}

function CapexPage() {
  return (
    <>
      <SectionTitle icon="↗" title="资本开支追踪" note="晶圆厂、设备与先进封装" />
      <div className="capex-hero">
        <div><small>2026E 全球晶圆厂设备投资</small><strong>$152B</strong><em>+24% YoY</em><SourceLink href={sourceLinks.semi} label="SEMI 原始数据" compact /></div>
        <div><small>2027E</small><strong>$166B</strong><em>+9% YoY</em><SourceLink href={sourceLinks.semi} label="SEMI 原始数据" compact /></div>
        <div><small>300mm 2026E</small><strong>$133B</strong><em>+18% YoY</em><SourceLink href={sourceLinks.semi} label="SEMI 原始数据" compact /></div>
      </div>
      <div className="capex-table-wrap">
        <table className="capex-table">
          <thead><tr><th>环节</th><th>2026E 方向</th><th>核心驱动</th><th>跟踪变量</th><th>景气</th><th>原始网站</th></tr></thead>
          <tbody>
            {[
              ["先进逻辑", "强增长", "2nm / GAA、AI 加速器", "EUV、刻蚀、薄膜订单", "高", sourceLinks.semi],
              ["DRAM / HBM", "强增长", "HBM4、先进 DRAM 节点", "良率、封装能力、合约价", "高", sourceLinks.skHynix],
              ["NAND", "修复", "层数升级与企业级 SSD", "资本纪律、库存", "中高", sourceLinks.micron],
              ["成熟制程", "分化", "本地化与汽车工业需求", "稼动率、价格", "中", sourceLinks.semi],
              ["先进封装", "强增长", "CoWoS / Hybrid Bonding", "设备交期、基板供给", "高", sourceLinks.tsmc],
            ].map((row) => (
              <tr key={row[0]}>{row.slice(0, 5).map((cell, i) => <td key={cell}>{i === 4 ? <span className={`signal signal-${cell}`}>{cell}</span> : cell}</td>)}<td><SourceLink href={row[5]} label="查看" compact /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="disclaimer">资本开支方向由公开披露整理，正式引用请核对 SEMI 与公司 IR。 <SourceLink href={sourceLinks.semi} label="SEMI 原始网站" compact /></div>
    </>
  );
}

const productReleases = [
  ["07-29", "🔴", "CPO / 光模块", "Broadcom", "102.4T 交换平台与 CPO 光引擎路线继续推进", "平台带宽密度决定 CPO 导入窗口，外置 CW 激光和 FAU 的验证优先级上升。", "官方产品页", "A"],
  ["07-29", "🔴", "光模块", "中际旭创", "1.6T 产品由客户验证转向小批量交付观察期", "真正需要验证的是单通道 200G 良率、长协价格和客户结构，而不是只看样品发布。", "公司交流", "B"],
  ["07-28", "🟡", "GPU / XPU", "NVIDIA", "Rubin 平台进入系统级量产准备", "互连带宽与机架功耗同步上升，拉动 HBM、交换芯片、光互连和液冷价值量。", "公司公告", "A"],
  ["07-28", "🟡", "硅光", "Coherent", "新一代 200G/lane 光器件组合更新", "上游 EML、硅光耦合、驱动器和测试环节的良率是盈利弹性的核心。", "公司产品页", "A"],
  ["07-27", "🟡", "设备", "ASML", "High-NA EUV 客户导入里程碑更新", "先进逻辑资本开支能见度维持，但订单确认与收入确认存在明显时滞。", "公司新闻稿", "A"],
  ["07-27", "○", "存储 / HBM", "Micron", "HBM4 工程样品与产能规划更新", "关注客户认证、TSV 良率和传统 DRAM 与 HBM 之间的资本配置。", "公司 IR", "A"],
  ["07-26", "○", "先进封装", "BESI", "混合键合设备平台迭代", "若键合精度与吞吐率同时改善，可能改变先进封装设备价值量分配。", "技术发布", "B"],
  ["07-25", "○", "网络", "Marvell", "面向 AI 集群的 1.6T DSP 与互连方案", "DSP 功耗、链路预算及供给多元化影响 1.6T 模块成本曲线。", "官方博客", "A"],
  ["07-24", "○", "材料", "安集科技", "先进节点 CMP 材料验证进展", "量产验证比送样更重要，需结合客户产线份额和毛利率观察。", "公司公告", "A"],
  ["07-23", "○", "光器件", "Lumentum", "高功率 CW 激光器产品组合扩展", "CPO 外置光源架构扩大潜在市场，但可靠性和多源供应仍需验证。", "公司产品页", "A"],
];

const productReleaseSources = {
  Broadcom: sourceLinks.broadcomCpo,
  中际旭创: sourceLinks.innolightIr,
  NVIDIA: sourceLinks.nvidia,
  Coherent: sourceLinks.coherentPluggable,
  ASML: sourceLinks.asml,
  Micron: sourceLinks.micron,
  BESI: sourceLinks.besiBonding,
  Marvell: sourceLinks.marvellOptical,
  安集科技: sourceLinks.cninfo,
  Lumentum: sourceLinks.lumentumCw,
};

function ProductReleasePage() {
  const [scope, setScope] = useState("全部");
  const [saved, setSaved] = useState([]);
  const scopes = ["全部", ...new Set(productReleases.map((row) => row[2]))];
  const visible = productReleases.filter((row) => scope === "全部" || row[2] === scope);
  const toggle = (key) => setSaved((current) => current.includes(key) ? current.filter((x) => x !== key) : [...current, key]);
  return (
    <>
      <SectionTitle icon="⌁" title="产品发布" note="官方公告优先 · 按产业影响而非新闻热度排序" />
      <section className="digest"><div><b>先看这里：</b>近 7 天按重要性初筛，🔴 必看、🟡 关注；每条说明“为什么值得看”和下一步验证重点。</div><small>发布 ≠ 量产；样品、客户验证、小批量、规模收入分层记录。</small></section>
      <div className="filter-row">{scopes.map((item) => <button key={item} className={scope === item ? "active" : ""} onClick={() => setScope(item)}>{item}</button>)}</div>
      <div className="release-grid">
        {visible.map(([date, priority, category, company, title, why, source, grade]) => {
          const key = `${date}-${company}-${title}`;
          const sourceUrl = productReleaseSources[company];
          return <details key={key} data-search={`${date} ${category} ${company} ${title} ${why} ${source}`} open={priority === "🔴"}>
            <summary><span>{priority}</span><time>{date}</time><em>{category}</em><b>{company} · {title}</b><button className={saved.includes(key) ? "saved" : ""} onClick={(e) => { e.preventDefault(); toggle(key); }} aria-label="收藏">{saved.includes(key) ? "★" : "☆"}</button></summary>
            <p><b>AI 总结：</b>{why}</p><small><Grade value={grade} /> {source} · 下一验证：订单、良率、客户认证与收入确认 <SourceLink href={sourceUrl} label={`${company} 原始网站`} compact /></small>
          </details>;
        })}
      </div>
      <div className="source-columns">
        <article><b>官方公告 · 一手（A 级）</b><span>{productReleases.filter((x) => x[7] === "A").length} 条</span><p>公司 IR、产品页、监管文件与官方技术博客。</p></article>
        <article><b>产业链交叉验证（B 级）</b><span>{productReleases.filter((x) => x[7] === "B").length} 条</span><p>至少两个独立渠道方向一致，金额与时间仍回一手。</p></article>
        <article><b>我的收藏</b><span>{saved.length} 条</span><p>点击每条右上角 ☆，用于后续精华沉淀。</p></article>
      </div>
    </>
  );
}

const researchFeeds = {
  papers: {
    title: "论文与技术前沿",
    note: "按硬件传导价值筛选：互连、硅光、封装、内存与能效",
    groups: [
      ["光互连", "Co-packaged optics：交换 ASIC 与光引擎协同设计", "关注热密度、耦合损耗、可维护性与外置激光源架构", "技术论文 / B"],
      ["线性光学", "LPO / LRO：去 DSP 后的功耗收益与链路预算约束", "重点验证 SerDes 质量、通道距离、误码率和客户容错", "OFC 议题 / B"],
      ["硅光", "单通道 200G 光电接口与 1.6T 模块工程化", "光芯片、驱动器、TIA、封装耦合和测试成本共同决定良率", "产业技术报告 / B"],
      ["先进封装", "光电共封装中的热机械可靠性与 Known Good Die", "封装测试会成为 CPO 规模化的关键瓶颈", "IEEE / B"],
      ["AI 系统", "Scale-up 网络从铜互连向光互连迁移的边界", "机柜带宽密度和距离决定铜/光切换点，而非单一速率", "系统研究 / B"],
      ["推理效率", "KV cache 分层与存储带宽优化", "推理侧从单纯增加 HBM 转向 HBM、DRAM、SSD 的分层调度，影响存储需求结构", "arXiv / B"],
      ["网络架构", "102.4T 交换芯片下的 SerDes 与光口密度", "比较 200G/lane、铜缆距离、前面板功耗与 CPO 光引擎的系统边界", "OFC / B"],
      ["厂商报告", "Broadcom CPO 系统架构与外置光源", "官方方案用于确认产品结构；量产时点仍需客户与供应链交叉验证", "公司技术报告 / A"],
      ["厂商报告", "NVIDIA Rubin 网络与机架级互连", "从系统拓扑推导交换端口、光模块、铜缆与液冷价值量，而非只看 GPU 数量", "公司白皮书 / A"],
      ["测试可靠性", "1.6T 光模块误码、老化与自动化测试", "测试时长和设备吞吐率可能成为良率爬坡与交付节奏的隐性瓶颈", "IEEE / B"],
    ],
  },
  deepread: {
    title: "机构与 KOL 深读",
    note: "专题阅读包：先读核心问题，再看证据与证伪变量",
    groups: [
      ["云厂业绩包", "Microsoft、Meta 与 Amazon 的 AI capex 是否可持续？", "对比云收入、RPO、资本开支、折旧与自由现金流，再映射 GPU、光互连、电源和液冷", "08-11 更新"],
      ["GPU业绩包", "AMD Q2 数据中心收入翻倍后，增长由 CPU 还是 GPU 驱动？", "拆分 EPYC、Instinct、系统客户、供给与 Q3 指引，避免把分部增长全部归因于 AI GPU", "08-11 更新"],
      ["NAND业绩包", "Sandisk 的 NAND 价格、长协与 eSSD 能否形成持续盈利？", "跟踪 ASP、位元出货、数据中心收入、库存、BiCS 节点和资本纪律", "08-11 更新"],
      ["CPO 阅读包", "CPO 会替代多少可插拔光模块？", "按交换机代际、光口位置、激光器架构与维护成本拆分，不采用‘全部替代’线性假设", "60 分钟"],
      ["1.6T 阅读包", "1.6T 放量由需求还是良率主导？", "跟踪单通道 200G 良率、DSP 供给、客户认证、长协价与散单价", "45 分钟"],
      ["光芯片阅读包", "EML、硅光与薄膜铌酸锂的边界", "比较速率、距离、功耗、温度稳定性、成本与量产成熟度", "50 分钟"],
      ["算力资本开支", "云厂自由现金流能否支撑 AI 网络升级", "将 GPU、交换机、光模块、电力和园区网络放进同一资本回收模型", "60 分钟"],
      ["债务链阅读包", "AI 基建融资成本如何传导到光模块订单", "CoreWeave 等新云信用利差 → GPU 采购 → 交换机端口 → 光模块与器件订单", "55 分钟"],
      ["海外龙头阅读包", "Corning、Coherent、Lumentum 的交叉验证", "用海外公司的订单、产能、交期和毛利验证国内光通信高景气持续性", "45 分钟"],
      ["估值阅读包", "高景气赛道如何区分产业趋势与交易赔率", "拆分收入斜率、份额、毛利、资本开支、客户集中和估值隐含增速", "40 分钟"],
      ["设备阅读包", "先进制程与先进封装设备谁先兑现", "比较订单、收入确认、客户验收和国产替代的时间差", "50 分钟"],
    ],
  },
  interviews: {
    title: "访谈与业绩会",
    note: "管理层原话优先；每条配置下一验证点",
    groups: [
      ["光器件业绩会", "Lumentum FY26 Q4：CW 激光、高速器件供给与毛利", "08-11 美股盘后重点核验云与网络收入、产能、客户集中和下一季指引", "08-11 / A"],
      ["AI芯片业绩会", "AMD FY26 Q2：数据中心 GPU/CPU 与系统级路线", "收入 115 亿美元、数据中心 67 亿美元；继续核验 MI450/Helios、客户与毛利率", "08-04 / A"],
      ["存储业绩会", "Sandisk FY26 Q4：NAND、eSSD 与长协模式", "把价格周期、产品结构和新商业模式分开记录", "08-05 / A"],
      ["云厂", "AI 集群网络架构与 1.6T 采购节奏", "关注交换机端口速率、网络拓扑、双供应商策略和年度降价", "T1 / A-B"],
      ["模块厂", "800G→1.6T 产品结构与产能利用率", "关注出货量以外的良率、毛利、客户集中度和资本开支", "公司交流 / B"],
      ["器件厂", "CW 激光器、FAU、MPO 与硅光封装需求", "验证 CPO/NPO 样品收入与批量收入的时间差", "供应链 / B"],
      ["海外龙头", "Coherent / Lumentum / Fabrinet 订单与供给", "关注激光器供给、制造外包、北美客户库存和交期", "IR / A"],
      ["设备龙头", "ASML / AMAT / LRCX 订单与中国区收入", "区分先进逻辑、存储复苏和出口限制对订单的不同影响", "业绩会 / A"],
      ["存储龙头", "SK hynix / Micron HBM 长协与扩产", "关注 HBM4 认证、传统 DRAM 价格、资本纪律与 TSV 良率", "业绩会 / A"],
      ["交换芯片", "Broadcom / Marvell AI 网络与 CPO", "跟踪 51.2T→102.4T 代际、客户设计导入、DSP 与光引擎收入", "技术访谈 / A-B"],
      ["国内公司", "中际旭创 / 新易盛 / 天孚通信机构交流", "原话与财报数字分开记录，重点核验客户、价格、良率和资本开支", "公司交流 / B"],
      ["产业专家", "1.6T、LPO 与 CPO 的工程化约束", "把观点拆成可验证的链路距离、误码率、功耗、温度与维护成本", "专家访谈 / B-C"],
    ],
  },
};

function researchSourceFor(type, tag, title) {
  if (title.includes("AMD")) return "https://ir.amd.com/news-events/press-releases/detail/1295/amd-reports-second-quarter-2026-financial-results";
  if (title.includes("Amazon") || title.includes("云厂业绩")) return "https://www.aboutamazon.com/news/company-news/amazon-earnings-q2-2026-report";
  if (title.includes("Sandisk")) return "https://investor.sandisk.com/news-events/news-releases";
  if (title.includes("Lumentum")) return sourceLinks.lumentum;
  if (title.includes("Broadcom")) return sourceLinks.broadcomCpo;
  if (title.includes("NVIDIA") || title.includes("Rubin")) return sourceLinks.nvidia;
  if (title.includes("Coherent")) return sourceLinks.coherent;
  if (title.includes("Lumentum") || title.includes("CW")) return sourceLinks.lumentumCw;
  if (title.includes("ASML")) return sourceLinks.asml;
  if (title.includes("AMAT")) return sourceLinks.amat;
  if (title.includes("LRCX")) return sourceLinks.lam;
  if (title.includes("SK hynix") || title.includes("HBM")) return sourceLinks.skHbm4;
  if (title.includes("中际旭创")) return sourceLinks.innolightIr;
  if (title.includes("1.6T")) return sourceLinks.eoptolink16t;
  if (type === "papers" && (tag.includes("光") || tag.includes("网络"))) return sourceLinks.ofc;
  if (type === "papers" && tag.includes("封装")) return sourceLinks.ieee;
  if (type === "papers") return sourceLinks.arxiv;
  if (type === "interviews") return sourceLinks.sec;
  return sourceLinks.openCompute;
}

function ResearchFeed({ type }) {
  const feed = researchFeeds[type];
  const [scope, setScope] = useState("全部");
  const [saved, setSaved] = useState([]);
  const scopes = ["全部", ...new Set(feed.groups.map((item) => item[0]))];
  const intros = {
    papers: ["投资相关：硬件需求 / 推理效率", "厂商技术报告", "本周其余热度 TOP", "全部论文流"],
    deepread: ["专题阅读包", "半导体·硬件供应链", "资本开支与债务链", "估值与证伪"],
    interviews: ["本周值得看", "深度访谈", "投资视角", "公司业绩会"],
  };
  return (
    <>
      <SectionTitle icon={type === "papers" ? "▤" : type === "deepread" ? "▦" : "▶"} title={feed.title} note={feed.note} />
      <div className="section-path">{intros[type].map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}</div>
      {type === "deepread" && <section className="digest"><div><b>专题阅读包：</b>带着核心问题按顺序读，读完把结论、证据和证伪条件沉淀进研究笔记。</div><small>建议路径：读前假设 → 核心证据 → 反方材料 → 公司映射 → 下一复核日。</small></section>}
      {type === "papers" && <section className="digest"><div><b>投资筛选纪律：</b>优先呈现会改变算力需求结构、互连带宽、存储层级、功耗或制造良率的论文。</div><small>论文结论是技术证据，不直接等于商业化进度。</small></section>}
      {type === "interviews" && <section className="digest"><div><b>本周值得看：</b>先看管理层和核心产业人物原话，再看观点型访谈。</div><small>A=公司原话；B=可交叉验证；C=专家观点，数字必须回一手。</small></section>}
      <div className="filter-row">{scopes.map((item) => <button key={item} className={scope === item ? "active" : ""} onClick={() => setScope(item)}>{item}</button>)}</div>
      <div className="research-list">
        {feed.groups.filter((item) => scope === "全部" || item[0] === scope).map(([tag, title, copy, source], index) => {
          const sourceUrl = researchSourceFor(type, tag, title);
          return <article key={title} data-search={`${tag} ${title} ${copy} ${source}`}>
            <span className="research-index">{String(index + 1).padStart(2, "0")}</span>
            <div><span className="pill">{tag}</span><b>{title}</b><p><b>AI 总结：</b>{copy}</p><details><summary>展开研究框架</summary><p>核心问题：这项变化会影响需求、供给、价格、份额还是成本？下一验证点包括客户认证、订单、良率、量产时间和财务兑现。</p></details><small>{source} · 结论需按来源等级复核 <SourceLink href={sourceUrl} label="原始论文 / 原网站" compact /></small></div>
            <button className={`research-save ${saved.includes(title) ? "saved" : ""}`} onClick={() => setSaved((current) => current.includes(title) ? current.filter((x) => x !== title) : [...current, title])} aria-label="收藏">{saved.includes(title) ? "★" : "☆"}</button>
          </article>;
        })}
      </div>
      <div className="disclaimer">已收藏 {saved.length} 条 · 收藏用于本次浏览研究清单，不构成投资建议。</div>
    </>
  );
}

function DailyPage({ items, favorites, toggleFavorite, go }) {
  const [archiveDate, setArchiveDate] = useState(dailyNewsArchive[0].date);
  const archive = dailyNewsArchive.find((item) => item.date === archiveDate) || dailyNewsArchive[0];
  const marketDay = dailyMarketArchive.find((item) => item.date === archive.date);
  const dailySources = {
    "核心日报": [
      ["07-30 A股半导体盘后", "266 个证券收盘快照显示板块普遍回调：云计算和存储相对抗跌，硅片、AI 设备、光通信与封测跌幅居前", "07-30 17:30", sourceLinks.eastmoneyMarket],
      ["07-30 半导体业绩全景", "Samsung、KLA、NXP、Arm 与 Amphenol 最新披露共同覆盖存储、设备、汽车芯片、CPU IP 和高速连接", "07-30 08:40", sourceLinks.samsungQ2],
      ["07-30 海外科技业绩速递", "Microsoft Azure 增长 43%，Meta AI 基础设施投入与 Qualcomm 多元化路线成为今天新增验证信号", "07-30 08:20", sourceLinks.microsoftQ4],
      ["07-30 云厂算力需求核验", "云收入、剩余履约义务与资本开支共同验证 GPU/ASIC、光互连、电源和液冷需求", "07-30 08:18", sourceLinks.metaQ2],
      ["AI 硬件链晨报", "CPO、1.6T、HBM 与先进封装的跨市场信号", "07-29 08:40", sourceLinks.broadcomCpo],
      ["半导体设备材料日报", "晶圆厂资本开支、设备订单与国产验证", "07-29 08:36", sourceLinks.semi],
      ["海外科技业绩速递", "美股与全球科技公司业绩、指引和盘后反馈", "07-29 08:31", sourceLinks.sec],
    ],
    "CPO / 光通信": [
      ["07-30 高速连接财务验证", "Amphenol 二季度业绩会为高速连接器、服务器互连、铜缆与光纤组件提供新增财务读数", "07-30 08:36", sourceLinks.amphenolQ2],
      ["07-30 云厂光互连读数", "Microsoft Azure 与 Meta AI 投入继续验证 scale-out 网络、交换机和高速光连接需求", "07-30 08:16", sourceLinks.microsoftQ4],
      ["光通信产业链日报", "800G/1.6T 出货、价格、良率、客户与供应链", "07-29 08:42", sourceLinks.eoptolink16t],
      ["海外光器件跟踪", "Coherent、Lumentum、Corning、Fabrinet 交叉验证", "07-29 08:28", sourceLinks.coherent],
      ["CPO 技术雷达", "102.4T、光引擎、CW 激光、FAU 与硅光封装", "07-29 08:20", sourceLinks.broadcomCpo],
    ],
    "存储 / HBM": [
      ["07-30 Samsung 存储跟踪", "二季度业绩材料重点核验 HBM4、服务器 DRAM/NAND、先进封装与存储资本开支", "07-30 08:34", sourceLinks.samsungQ2],
      ["存储价格日报", "DRAM、NAND、HBM 合约价与现货价差", "07-29 08:25", sourceLinks.micron],
      ["HBM 供应链跟踪", "认证、TSV 良率、扩产与长协覆盖", "07-29 08:18", sourceLinks.skHbm4],
    ],
    "设备 / 材料": [
      ["07-30 过程控制景气验证", "KLA 最新收入与下一季指引验证先进逻辑、存储和先进封装带来的量检测强度提升", "07-30 08:32", sourceLinks.klaQ4],
      ["晶圆厂设备日报", "订单、交付、验收和收入确认节奏", "07-29 08:34", sourceLinks.asml],
      ["国产替代验证表", "客户端验证、份额、复购与毛利变化", "07-29 08:15", sourceLinks.cninfo],
    ],
  };
  const [sourceGroup, setSourceGroup] = useState("核心日报");
  const [sourceUpdated, setSourceUpdated] = useState(MARKET_DATA_GENERATED_AT.slice(5, 16));
  return (
    <>
      <SectionTitle icon="◉" title="每日半导体日报聚合台" note="07-29 至今逐日归档 · 历史内容完整保留 · 行情按成分股算术平均" action={<button className="text-btn" onClick={() => setSourceUpdated(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }))}>刷新 ↻</button>} />
      <section className="archive-date-strip" aria-label="日报日期切换">
        {dailyNewsArchive.map((day) => <button key={day.date} className={archive.date === day.date ? "active" : ""} onClick={() => setArchiveDate(day.date)}><b>{day.date.slice(5).replace("-", ".")}</b><small>{day.label.split(" · ")[0]}</small></button>)}
      </section>
      <section className="daily-archive-hero">
        <header><div><span>{archive.state}</span><small>{archive.date} · 北京时间</small><h1>{archive.headline}</h1><p>{archive.summary}</p></div><div className={`daily-market-badge ${marketDay?.averageChange > 0 ? "up" : marketDay?.averageChange < 0 ? "down" : "flat"}`}><small>本站产业链算术平均</small><b>{marketDay ? `${marketDay.averageChange > 0 ? "+" : ""}${marketDay.averageChange.toFixed(2)}%` : "盘前 / 休市"}</b><em>{marketDay ? `${marketDay.rising} 涨 / ${marketDay.falling} 跌 / ${marketDay.coverage} 样本` : "等待有效收盘行情"}</em></div></header>
        <div className="daily-focus"><b>今日研究焦点</b><p>{archive.focus}</p><small>行情归档核验 {MARKET_HISTORY_GENERATED_AT} · 仅作研究记录，不构成投资建议</small></div>
        {marketDay && <div className="daily-sector-rank">
          <div><b>领涨行业</b>{marketDay.leaders.map((row) => <article key={row.sector}><span>{row.sector}</span><i><em style={{ width: `${Math.min(100, Math.max(6, Math.abs(row.averageChange) * 8))}%` }} /></i><strong className={row.averageChange >= 0 ? "up" : "down"}>{row.averageChange > 0 ? "+" : ""}{row.averageChange.toFixed(2)}%</strong></article>)}</div>
          <div><b>相对落后</b>{marketDay.laggards.map((row) => <article key={row.sector}><span>{row.sector}</span><i><em style={{ width: `${Math.min(100, Math.max(6, Math.abs(row.averageChange) * 8))}%` }} /></i><strong className={row.averageChange >= 0 ? "up" : "down"}>{row.averageChange > 0 ? "+" : ""}{row.averageChange.toFixed(2)}%</strong></article>)}</div>
        </div>}
      </section>
      <SectionTitle icon="⌁" title={`${archive.date.slice(5).replace("-", "月")}日新增资讯与业绩事件`} note="每条均附公司或机构原始网站 · AI 结论与原始事实分开" />
      <div className="archive-news-grid">
        {archive.items.map((item) => <article key={`${archive.date}-${item.company}-${item.title}`} data-search={`${archive.date} ${item.category} ${item.company} ${item.title} ${item.takeaway}`}><header><span>{item.category}</span><small>{archive.date}</small></header><h3>{item.company} · {item.title}</h3><p><b>AI 投资解读：</b>{item.takeaway}</p><footer><em>{item.source}</em><SourceLink href={item.url} label="原始网站" compact /></footer></article>)}
      </div>
      <details className="archive-method"><summary>数据口径与日期说明</summary><p>个股每日涨跌幅来自东方财富历史收盘行情；行业涨跌幅为本站现有行业成分股的简单算术平均，不做市值加权。周末和盘前没有新的有效收盘价，因此只归档研究事件。尚未由公司官网发布的业绩数字保持“待公布”，不会用媒体预测冒充实际值。</p><SourceLink href={sourceLinks.eastmoneyMarket} label="东方财富行情原页" /></details>
      <div className="daily-hub">
        <nav>{Object.keys(dailySources).map((group) => <button key={group} className={sourceGroup === group ? "active" : ""} onClick={() => setSourceGroup(group)}>{group}<small>{dailySources[group].length} 源</small></button>)}</nav>
        <section>
          <div className="daily-hub-head"><b>{sourceGroup}</b><span>最后刷新 {sourceUpdated} · 无需登录</span></div>
          {dailySources[sourceGroup].map(([name, desc, , url]) => <article key={name} data-search={`${name} ${desc}`}><div><span className="live-dot" /><b>{name}</b><small>核验 {MARKET_DATA_GENERATED_AT.slice(5, 16)}</small></div><p><b>AI 总结：</b>{desc}</p><SourceLink href={url} label="打开原始网站" /></article>)}
        </section>
      </div>
      <section className="digest"><div><b>📌 今日导读：</b>CPO/光模块位于第一优先级；其次为 HBM、先进封装与晶圆设备。</div><small>阅读路径：1 分钟速览 → 10 分钟分页 → 1 小时 KOL 深读专题包 <SourceLink href={sourceLinks.broadcomCpo} label="判断输入原始网站" compact /></small></section>
      <SectionTitle icon="◉" title="今日新增与持续跟踪观点" note="新增观点置顶 · 历史判断完整保留 · 每条给出可证伪变量" />
      <div className="verdict-list">
        {[
          ["A股盘后", "剧烈回调后先判断交易结构，再判断产业趋势是否反转", "新增判断：硅片、AI 设备、光通信和封测算术平均跌幅较大，但单日价格不能替代基本面；后续核验成交额、龙头相对收益、订单和盈利预期是否同步下修。", sourceLinks.eastmoneyMarket],
          ["存储", "Samsung 业绩把 HBM 高景气从预期重新拉回财务验证", "新增判断：同时核验 HBM4 产品结构、传统 DRAM/NAND 价格、先进封装能力和资本开支，任何单项高增都不能替代完整盈利验证。", sourceLinks.samsungQ2],
          ["半导体设备", "制程复杂度正在成为量检测需求的第二增长曲线", "新增判断：KLA 下一季收入指引抬升，需继续跟踪先进逻辑、存储和先进封装带来的单位产能过程控制强度。", sourceLinks.klaQ4],
          ["成熟制程", "NXP 的广泛增长为汽车与工业复苏增加公司级证据", "新增判断：区分终端需求复苏和渠道补库存，继续核验汽车订单、工业 IoT 收入、毛利率和三季度指引兑现。", sourceLinks.nxpQ2],
          ["CPU / IP", "云端 Arm 渗透可能重塑服务器 CPU 与网络芯片价值分配", "新增判断：重点跟踪 Arm 数据中心版税、AGI CPU 量产收入、DPU/SmartNIC 渗透及先进制程供给，而非只看合作名单。", sourceLinks.armQ1],
          ["高速连接", "AI 互连扩张正在从光模块延伸到连接器、铜缆和光纤组件", "新增判断：Amphenol 财务读数需拆分有机增长、并购贡献、订单和利润率，验证连接价值量是否真正兑现。", sourceLinks.amphenolQ2],
          ["CPO", "可插拔仍是近端业绩主体，CPO 是中期增量期权", "跟踪 1.6T 出货、102.4T 交换平台、CPO 样机转量产与外置激光器订单。", sourceLinks.broadcomCpo],
          ["光器件", "价值量向光芯片、FAU、CW 激光与精密封装迁移", "跟踪上游器件自制率、耦合良率、单通道 200G 认证和供给份额。", sourceLinks.coherentCpo],
          ["估值", "高景气必须由份额与盈利兑现，而非速率升级叙事", "跟踪收入结构、毛利率、客户集中度、存货与资本开支回报。", sourceLinks.sec],
        ].map(([tag, title, copy, url], i) => <article className="verdict" key={tag}><span className="number">{i + 1}</span><div><span className="pill">{tag}</span><b>{title}</b><p><b>AI 判断：</b>{copy}</p><SourceLink href={url} label="原始网站" compact /></div></article>)}
      </div>
      <SectionTitle icon="⌁" title="今日重点事件" note="跨日去重 · A/B 来源优先" action={<button className="text-btn" onClick={() => go("events")}>查看全部 →</button>} />
      {items.slice(0, 12).map((item) => <EventCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={toggleFavorite} />)}
      {items.length > 12 && <details className="historical-events"><summary>展开此前持续跟踪事件（{items.length - 12} 条，原内容完整保留）</summary>{items.slice(12).map((item) => <EventCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={toggleFavorite} />)}</details>}
    </>
  );
}

function HighFreqPage() {
  const rows = [
    ["800G 光模块", "需求高位", "云厂网络 capex / 模块厂出货结构", "周", sourceLinks.coherent],
    ["1.6T 光模块", "放量验证", "单通道 200G 良率 / 客户认证 / DSP 供给", "周", sourceLinks.eoptolink16t],
    ["CPO / NPO", "样机→导入", "102.4T 平台 / 光引擎订单 / 外置激光器", "月", sourceLinks.broadcomCpo],
    ["CW 激光器", "供给偏紧", "功率、通道数、寿命与多源供应", "月", sourceLinks.lumentumCw],
    ["GPU 租价", "需求代理", "H100/H200/B200 现货租价与利用率", "日", sourceLinks.nvidia],
    ["云厂债券 YTM", "融资约束", "CoreWeave 与大云厂信用利差", "日", sourceLinks.sec],
  ];
  return (
    <>
      <SectionTitle icon="↗" title="高频数据" note="跟踪频率、方向与解释口径分开呈现" />
      <div className="metric-grid">
        <MetricCard label="CPO 研究热度" value="97 / 100" delta="周环比 +8" note="事件密度模型 · 输入 Broadcom" points={[61,67,72,79,88,97]} sourceUrl={sourceLinks.broadcomCpo} />
        <MetricCard label="1.6T 产品阶段" value="验证→放量" delta="核心窗口" note="客户与供应链 · B" tone="orange" points={[18,24,35,48,66,84]} sourceUrl={sourceLinks.eoptolink16t} />
        <MetricCard label="光互连景气" value="高位" delta="结构升级" note="多源交叉 · B" tone="purple" points={[55,58,63,71,82,91]} sourceUrl={sourceLinks.coherentCpo} />
        <MetricCard label="风险温度" value="中等" delta="估值/降价" note="研究模型 · C" tone="green" points={[42,48,45,51,49,54]} sourceUrl={sourceLinks.sec} />
      </div>
      <SectionTitle icon="↗" title="07-29 至今 A股半导体行情广度" note={`266 个证券 · 行业/全样本均为算术平均 · 更新 ${MARKET_HISTORY_GENERATED_AT}`} />
      <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>交易日</th><th>全样本均幅</th><th>上涨 / 下跌</th><th>领涨行业</th><th>相对落后</th><th>行情原页</th></tr></thead><tbody>{dailyMarketArchive.map((day) => <tr key={day.date} data-search={`${day.date} ${day.leaders.map((x) => x.sector).join(" ")} ${day.laggards.map((x) => x.sector).join(" ")}`}><td>{day.date}</td><td><span className={day.averageChange >= 0 ? "up" : "down"}>{day.averageChange > 0 ? "+" : ""}{day.averageChange.toFixed(2)}%</span></td><td>{day.rising} / {day.falling}</td><td>{day.leaders[0]?.sector} {day.leaders[0]?.averageChange > 0 ? "+" : ""}{day.leaders[0]?.averageChange.toFixed(2)}%</td><td>{day.laggards[0]?.sector} {day.laggards[0]?.averageChange > 0 ? "+" : ""}{day.laggards[0]?.averageChange.toFixed(2)}%</td><td><SourceLink href={sourceLinks.eastmoneyMarket} label="核验" compact /></td></tr>)}</tbody></table></div>
      <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>指标</th><th>当前信号</th><th>核心观测</th><th>频率</th><th>原始网站</th></tr></thead><tbody>{rows.map(([name, signal, watch, frequency, url])=><tr key={name} data-search={`${name} ${signal} ${watch}`}><td>{name}</td><td>{signal}</td><td>{watch}</td><td>{frequency}</td><td><SourceLink href={url} label="查看" compact /></td></tr>)}</tbody></table></div>
    </>
  );
}

function ViewHubPage() {
  const [direction, setDirection] = useState("全部");
  const views = [
    ["上调", "CPO", "102.4T 交换平台提升光引擎与连接器价值量", "关注导入节奏而非远期 TAM", sourceLinks.broadcomCpo],
    ["分歧", "光模块", "1.6T 年降与结构升级能否同时改善毛利", "验证长协价、散单价与产品良率", sourceLinks.eoptolink16t],
    ["确认", "光器件", "CW 激光、FAU 与高密度连接需求上升", "验证批量订单与多源供应", sourceLinks.lumentumCw],
    ["观察", "硅光", "硅光渗透率提升但封装测试成本仍高", "跟踪 Known Good Die 与耦合自动化", sourceLinks.coherentCpo],
    ["下调", "估值", "高拥挤度放大业绩窗口波动", "区分产业趋势与交易赔率", sourceLinks.sec],
  ];
  return <><SectionTitle icon="❞" title="观点聚合台" note="按上调、下调、确认、分歧与观察归类" /><div className="filter-row">{["全部","上调","下调","确认","分歧","观察"].map(x=><button className={direction===x?"active":""} onClick={()=>setDirection(x)} key={x}>{x}</button>)}</div><div className="research-list">{views.filter(x=>direction==="全部"||x[0]===direction).map(([dir,topic,title,copy,url],i)=><article key={title} data-search={`${dir} ${topic} ${title} ${copy}`}><span className="research-index">{i+1}</span><div><span className="pill">{dir} · {topic}</span><b>{title}</b><p><b>AI 归纳：</b>{copy}</p><small>观点需回公司公告、业绩会与客户 capex 验证 <SourceLink href={url} label="原始网站" compact /></small></div></article>)}</div></>;
}

function CPOPage() {
  const [tab, setTab] = useState("总览");
  const companies = [
    ["中际旭创", "光模块", "800G/1.6T", "客户与产品结构", "高", sourceLinks.innolightIr],
    ["新易盛", "光模块", "高速率模块", "份额与盈利弹性", "高", sourceLinks.eoptolink16t],
    ["天孚通信", "光器件", "FAU/精密封装", "上游卡位与自制率", "高", sourceLinks.cninfo],
    ["光迅科技", "模块+器件", "数通/电信", "客户突破与产品节奏", "中高", sourceLinks.cninfo],
    ["源杰科技", "光芯片", "EML/激光器", "认证、良率与产能", "中高", sourceLinks.cninfo],
    ["仕佳光子", "光芯片/器件", "AWG/PLC", "高速数通产品占比", "中", sourceLinks.cninfo],
    ["Coherent", "光芯片+模块", "激光器/收发器", "供给份额与盈利", "高", sourceLinks.coherentCpo],
    ["Fabrinet", "制造服务", "光模块代工", "客户集中与产能利用", "中高", "https://investor.fabrinet.com/"],
  ];
  const tech = [
    ["800G 可插拔", "成熟放量", "DSP + EML/硅光", "出货结构、价格、毛利", sourceLinks.coherentPluggable],
    ["1.6T 可插拔", "导入/放量", "单通道 200G", "良率、认证、DSP 与光芯片", sourceLinks.eoptolink16t],
    ["LPO/LRO", "客户验证", "弱化/移除 DSP", "链路预算、距离、误码率", sourceLinks.marvellOptical],
    ["NPO", "系统验证", "光引擎靠近 ASIC", "可维护性、热与封装", sourceLinks.broadcomCpo],
    ["CPO", "中期导入", "ASIC 与光引擎共封装", "102.4T 平台、CW 激光、良率", sourceLinks.broadcomCpo],
    ["OCS/全光交换", "早期扩张", "光路重构", "拓扑、可靠性、成本", sourceLinks.openCompute],
  ];
  return (
    <>
      <section className="cpo-hero"><div><small>重点研究专题</small><h1>CPO / 光模块投资工作台</h1><p>从 800G 与 1.6T 近端业绩，延伸到 CPO/NPO/LPO、硅光、光芯片、CW 激光与精密封装的中期技术迁移。</p><SourceLink href={sourceLinks.broadcomCpo} label="Broadcom CPO 原始网站" /></div><strong>97<small>研究热度</small></strong></section>
      <div className="filter-row cpo-tabs">{["总览","技术路线","公司矩阵","跟踪清单","风险证伪"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}</div>
      {tab === "总览" && <><div className="metric-grid"><MetricCard label="近端主线" value="1.6T" delta="验证→放量" note="收入主体仍是可插拔" points={[12,24,39,58,76,91]} sourceUrl={sourceLinks.eoptolink16t} /><MetricCard label="中期主线" value="CPO" delta="系统导入" note="关注 102.4T 交换平台" tone="orange" points={[8,14,20,31,46,63]} sourceUrl={sourceLinks.broadcomCpo} /><MetricCard label="上游弹性" value="光芯片" delta="+精密封装" note="良率与份额优先" tone="purple" points={[41,48,55,63,76,86]} sourceUrl={sourceLinks.coherentCpo} /><MetricCard label="核心风险" value="年降" delta="+客户集中" note="研究判断 · 需回公司 IR" tone="green" points={[45,48,57,52,61,58]} sourceUrl={sourceLinks.innolightIr} /></div><div className="note-box"><b>AI 核心判断</b><p>未来两年不应把 CPO 与可插拔视为简单替代关系：可插拔贡献订单与利润，CPO 提供技术期权；真正可持续的价值量更可能沉淀在光芯片、CW 激光、FAU/连接器、封装测试和系统设计。</p><SourceLink href={sourceLinks.broadcomCpo} label="支撑来源：Broadcom CPO" /></div></>}
      {tab === "技术路线" && <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>路线</th><th>阶段</th><th>关键架构</th><th>跟踪变量</th><th>原始网站</th></tr></thead><tbody>{tech.map(([route,stage,architecture,watch,url])=><tr key={route} data-search={`${route} ${stage} ${architecture} ${watch}`}><td>{route}</td><td>{stage}</td><td>{architecture}</td><td>{watch}</td><td><SourceLink href={url} label="查看" compact /></td></tr>)}</tbody></table></div>}
      {tab === "公司矩阵" && <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>公司</th><th>环节</th><th>核心暴露</th><th>研究重点</th><th>景气</th><th>原始网站</th></tr></thead><tbody>{companies.map(([name,segment,exposure,focus,signal,url])=><tr key={name} data-search={`${name} ${segment} ${exposure} ${focus}`}><td>{name}</td><td>{segment}</td><td>{exposure}</td><td>{focus}</td><td><span className={`signal signal-${signal}`}>{signal}</span></td><td><SourceLink href={url} label="查看" compact /></td></tr>)}</tbody></table></div>}
      {tab === "跟踪清单" && <div className="research-list">{[["北美云厂网络 capex 与交换机端口升级",sourceLinks.sec],["800G/1.6T 出货结构及长协价格",sourceLinks.eoptolink16t],["单通道 200G 光芯片与 DSP 供给",sourceLinks.marvellOptical],["模块与器件厂良率、存货和资本开支",sourceLinks.innolightIr],["CPO 光引擎、CW 激光器样品转量产",sourceLinks.broadcomCpo],["客户集中度、第二供应商与份额变化",sourceLinks.cninfo]].map(([x,url],i)=><article key={x} data-search={x}><span className="research-index">{i+1}</span><div><b>{x}</b><p>每次财报与产业链更新后记录“方向—幅度—来源—下一验证点”。</p><SourceLink href={url} label="原始网站" compact /></div></article>)}</div>}
      {tab === "风险证伪" && <div className="risk-grid">{[["需求","云厂 capex 下修或网络投入滞后于算力投入",sourceLinks.sec],["价格","1.6T 年降快于良率和成本改善",sourceLinks.eoptolink16t],["技术","LPO/CPO 链路预算、热或可靠性验证延期",sourceLinks.broadcomCpo],["竞争","新进入者低价抢份额、客户推动多供应商",sourceLinks.cninfo],["财务","存货和应收增速显著高于收入",sourceLinks.innolightIr],["交易","估值和拥挤度透支两年以上增长",sourceLinks.sec]].map(([t,c,url])=><article key={t} data-search={`${t} ${c}`}><b>{t}</b><p>AI 风险归纳：{c}</p><SourceLink href={url} label="原始网站" compact /></article>)}</div>}
    </>
  );
}

function StatementPage() {
  return <><SectionTitle icon="◌" title="公司发言墙" note="07-29 至今新增置顶 · AI 转述 · 下一验证点 · 每条附原始网站" /><div className="research-list">{[
    ["AMD","数据中心已成为收入增长核心，GPU 与 EPYC 需求共同驱动 Q2 数据中心收入翻倍","下一验证：Q3 130 亿美元收入指引、MI450/Helios 客户与毛利率","https://ir.amd.com/news-events/press-releases/detail/1295/amd-reports-second-quarter-2026-financial-results"],
    ["Amazon","AWS 加速至 37% 增长，AI 与自研芯片业务均达到超过 250 亿美元年化收入","下一验证：基础设施投入、自由现金流与 Trainium 规模部署","https://www.aboutamazon.com/news/company-news/amazon-earnings-q2-2026-report"],
    ["Microsoft","Azure 增长 43%，Azure 年收入首次超过 1000 亿美元","下一验证：FY27 capex、折旧、网络投入与 AI 产能约束",sourceLinks.microsoftQ4],
    ["Meta","AI 正在加速核心业务，同时基础设施投入继续处于高位","下一验证：全年 capex、自由现金流、定制芯片与网络扩张",sourceLinks.metaQ2],
    ["Broadcom","交换芯片与光系统协同是带宽密度升级的重要方向","下一验证：CPO 客户导入与量产节奏",sourceLinks.broadcomCpo],
    ["Corning","AI 数据中心推动企业网络与高密度光连接需求","下一验证：分部增速和大客户协议兑现",sourceLinks.corningAi],
    ["Coherent","高速数据通信需求牵引激光器、器件与模块组合","下一验证：供给瓶颈与毛利修复",sourceLinks.coherentCpo],
    ["中际旭创","高速率产品升级是结构性增长主线","下一验证：1.6T 产品占比、价格与盈利",sourceLinks.innolightIr],
    ["天孚通信","精密光器件与先进封装能力决定客户黏性","下一验证：新产品认证和产能利用率",sourceLinks.cninfo],
  ].map(([c,q,n,url],i)=><article key={c} data-search={`${c} ${q} ${n}`}><span className="research-index">{i+1}</span><div><span className="pill">{c}</span><b>AI 转述：{q}</b><p>{n}</p><small>非逐字引语，正式引用请打开原披露核验 <SourceLink href={url} label="原始网站" compact /></small></div></article>)}</div></>;
}

function TapePage() {
  return <><SectionTitle icon="≋" title="半导体 Tape" note="07-29 至今 · 行情结构、财务信号与下一验证点" /><div className="timeline">{[
    ["08-11","光器件","Lumentum 今晚披露，CW 激光、高速器件供给与毛利率是 CPO 链关键财务读数","前瞻",sourceLinks.lumentum],
    ["08-10","设备","A股设备与零部件逆势占优，行情从普涨转向订单和国产份额验证","确认",sourceLinks.eastmoneyMarket],
    ["08-07","PCB材料","CCL、铜箔与 PCB 同步领涨，高速板材升级成为交易焦点","上调",sourceLinks.eastmoneyMarket],
    ["08-05","存储","Sandisk 财报窗口验证 NAND 定价、eSSD 与长协模式","确认","https://investor.sandisk.com/news-events/news-releases"],
    ["08-04","AI芯片","AMD Q2 收入 115 亿美元，数据中心收入 67 亿美元、同比增长 107%","确认","https://ir.amd.com/news-events/press-releases/detail/1295/amd-reports-second-quarter-2026-financial-results"],
    ["07-30","云厂","Amazon AWS 增长 37%，AI 与芯片业务年化收入均超过 250 亿美元","确认","https://www.aboutamazon.com/news/company-news/amazon-earnings-q2-2026-report"],
    ["07-29","光通信","市场重新定价 1.6T 产品结构与年降假设","分歧",sourceLinks.eoptolink16t],
    ["07-29","设备","先进逻辑与存储资本开支保持高位","确认",sourceLinks.semi],
    ["07-28","存储","HBM 与传统 DRAM/NAND 继续分化","上调",sourceLinks.micron],
  ].map(([d,t,c,s,url])=><article key={d+t} data-search={`${d} ${t} ${c} ${s}`}><time>{d}</time><span>{t}</span><b>AI 归纳：{c}</b><em>{s}</em><SourceLink href={url} label="原始网站" compact /></article>)}</div></>;
}

function KnowledgePage() {
  const [category, setCategory] = useState("全部");
  const visible = category === "全部" ? knowledgeTerms : knowledgeTerms.filter((item) => item.category === category);
  return <>
    <SectionTitle icon="◎" title="知识解读" note={`${knowledgeTerms.length} 个专业术语 · 白话解释 → 产业链映射 → 可验证指标`} />
    <section className="knowledge-intro"><div><small>SEMICONDUCTOR LEARNING MAP</small><h1>把技术名词翻译成可验证的投资逻辑</h1><p>每个术语都回答三件事：它是什么、价值量流向哪里、下一步该看什么数据。术语解释用于研究入门，正式定义以标准组织和公司技术资料为准。</p></div><img src={chainEducationImage} alt="半导体材料、存储与光通信技术示意图" /></section>
    <div className="filter-row knowledge-filter">{knowledgeCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="glossary glossary-rich">{visible.map((item) => <article key={item.name} data-search={`${item.name} ${item.category} ${item.plain} ${item.investment} ${item.watch}`}><header><span>{item.category}</span><b>{item.name}</b></header><p><b>白话解释：</b>{item.plain}</p><p><b>产业链 / 投资映射：</b>{item.investment}</p><small><b>下一验证：</b>{item.watch}</small><SourceLink href={item.url} label="标准 / 技术原始网站" compact /></article>)}</div>
  </>;
}

function EarningsPage() {
  const [phase, setPhase] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [calendarQuery, setCalendarQuery] = useState("");
  const [handbookOpen, setHandbookOpen] = useState(false);
  const filtered = earningsCompanies.filter((company) => {
    const statusMatch = status === "全部" || company.status === status || (status === "已披露" && company.status.includes("已发"));
    const queryMatch = !calendarQuery || `${company.name} ${company.ticker} ${company.layer} ${company.focus} ${company.highlights}`.toLowerCase().includes(calendarQuery.toLowerCase());
    return statusMatch && queryMatch;
  });
  const visible = phase === "全部" ? filtered : filtered.filter((company) => company.phase === phase);
  const calendarGroups = earningsPhases
    .filter((item) => phase === "全部" || item.id === phase)
    .map((item) => ({ ...item, companies: filtered.filter((company) => company.phase === item.id) }))
    .filter((item) => item.companies.length);
  const consensusSource = (company) => /^[A-Z]+$/.test(company.ticker)
    ? `https://www.nasdaq.com/market-activity/stocks/${company.ticker.toLowerCase()}/earnings`
    : company.source;
  return (
    <>
      <SectionTitle icon="▦" title="美股与全球科技股业绩前瞻日历" note={`${earningsCompanies.length} 家 AI 五层产业链标的 · 预期与实际分离 · 每家公司附原始 IR`} />
      <section className="earnings-hero">
        <small>BUY-SIDE RESEARCH · GLOBAL TECH · EARNINGS MAP</small>
        <h1>AI 与半导体产业链业绩季地图</h1>
        <p>按“上游设备与代工 → 云厂大盘股 → GPU/WFE/存储 → ASIC/云/内存收尾”排序；已披露公司展示实际值，未披露公司展示一致预期或公司指引。</p>
        <div><span>数据截至 {MARKET_DATA_GENERATED_AT}</span><span>{earningsCompanies.length} 家核心与配套公司</span><span>A=公司 IR · B=一致预期 · C=待确认</span></div>
      </section>
      <section className="earnings-handbook-banner">
        <div><small>深挂载 · 半导体专题</small><b>核心公司业绩关注手册</b><p>收入兑现、利润质量、现金与资本开支、管理层语言四层指标；覆盖 TSMC、NVIDIA、Broadcom、Micron 与 CPO 读数。</p></div>
        <button onClick={() => setHandbookOpen((value) => !value)}>{handbookOpen ? "收起手册" : "打开手册 →"}</button>
      </section>
      {handbookOpen && <section className="earnings-handbook">
        <header><span>EXECUTIVE DECISION FRAMEWORK</span><h2>半导体核心公司业绩关注手册</h2><p>先定义信号和证伪线，再读财报；所有 AI 判断均绑定公司原始 IR。</p></header>
        <div className="handbook-decision">
          <b>置顶执行裁决与投票规则</b>
          <div><span>一级多头信号</span><p>收入/订单、毛利率、现金流与下一季指引中至少三项同时高于预设门槛。</p></div>
          <div><span>一级负面触发</span><p>核心产品收入或指引下修，并由库存、应收或自由现金流恶化交叉确认。</p></div>
          <div><span>判定纪律</span><p>每个信号只投一票；一次性收益不计入经营票；未给原始链接的数字不得投票。</p></div>
        </div>
        <div className="handbook-layers">
          {[["01","收入兑现","实际 vs 原一致预期、产品结构、订单与 backlog"],["02","利润质量","毛利率、一次性项目、价格/良率与产品组合"],["03","现金与融资","经营现金流、FCF、capex、库存与应收"],["04","语言与行为","上修/下修、客户认证、扩产、回购及风险措辞"]].map(([num,title,copy])=><article key={num}><span>{num}</span><b>{title}</b><p>{copy}</p></article>)}
        </div>
        <div className="handbook-scorecards">
          {[
            ["TSMC","先进节点与 CoWoS","3Q 指引、2nm、HPC 占比、capex","毛利率与 capex 同时上修","AI 需求放缓或海外厂稀释超预期","https://investor.tsmc.com/english/quarterly-results"],
            ["NVIDIA","GPU 系统与网络","平台交付、Rubin、网络收入、毛利率","交付与下季指引继续高于高预期","平台切换、供应或政策导致指引低于预期","https://investor.nvidia.com/"],
            ["Broadcom","ASIC / 交换 / CPO","AI 收入、客户数、102.4T 与 CPO","定制芯片和网络收入能见度延长","客户集中或 CPO 导入延期",sourceLinks.broadcomIr],
            ["Micron","HBM / DRAM / NAND","HBM 长协、价格、毛利率与 capex","HBM 与传统内存量价继续共振","供给扩张导致价格或毛利率先见顶","https://investors.micron.com/"],
            ["Corning","光纤与连接","光通信分部、企业网络、订单与指引","AI 数据中心订单持续加速","指引无法匹配高预期或客户项目延迟",sourceLinks.corning],
          ].map(([name,role,watch,bull,bear,url])=><details key={name}><summary><b>{name}</b><span>{role}</span></summary><dl><div><dt>关注点</dt><dd>{watch}</dd></div><div><dt>预期 / 门槛</dt><dd>财报前锁定原一致预期与公司指引，不在披露后倒改门槛。</dd></div><div><dt>实际</dt><dd>披露后从原始 IR 回填，当前空值不作推断。</dd></div><div><dt>判定</dt><dd>等待收入、利润、现金与语言四层投票。</dd></div><div><dt>多头验证</dt><dd>{bull}</dd></div><div><dt>空头证伪</dt><dd>{bear}</dd></div></dl><SourceLink href={url} label={`${name} 原始 IR`} /></details>)}
        </div>
        <div className="handbook-crosschecks"><b>场外对照指标</b><span>云厂 capex / 自由现金流</span><span>HBM 合约价与供给纪律</span><span>交换端口、1.6T 与 CPO 导入</span><span>WFE 订单与先进封装产能</span></div>
        <footer>引用纪律：事实、外部观点和 AI 推论分栏；每个数字保留财报前门槛、披露后实际与判定；币种、财季、GAAP/Non-GAAP 与披露时间必须回原始 IR 核验。更新：2026-07-29。</footer>
      </section>}
      <div className="earnings-theses">
        <article><span>01</span><b>上游先出，给 AI 链定调</b><p>ASML 与台积电先验证先进逻辑、设备与先进封装需求。</p><SourceLink href={sourceLinks.asml} label="ASML 原始 IR" /></article>
        <article><span>02</span><b>内存周期是关键宏观信号</b><p>SK海力士、三星、铠侠和美光共同验证 HBM、DRAM 与 NAND。</p><SourceLink href="https://investors.micron.com/" label="Micron 原始 IR" /></article>
        <article><span>03</span><b>英伟达与博通在后段收尾</b><p>GPU、定制 ASIC、交换平台和网络收入决定 AI 基建斜率。</p><SourceLink href="https://investor.nvidia.com/" label="NVIDIA 原始 IR" /></article>
      </div>
      <nav className="earnings-phases">
        <button className={phase === "全部" ? "active" : ""} onClick={() => setPhase("全部")}><b>全部公司</b><small>{earningsCompanies.length} 家</small></button>
        {earningsPhases.map((item) => <button key={item.id} className={phase === item.id ? "active" : ""} onClick={() => setPhase(item.id)}><b>{item.label}</b><small>{item.note}</small></button>)}
      </nav>
      <div className="earnings-tools">
        <label>⌕ <input value={calendarQuery} onChange={(event) => setCalendarQuery(event.target.value)} placeholder="搜索公司 / 代码 / 环节 / 关注点" /></label>
        {["全部", "已披露", "待公布", "待确认"].map((item) => <button key={item} className={status === item ? "active" : ""} onClick={() => setStatus(item)}>{item}</button>)}
      </div>
      {calendarGroups.map((group, index) => <section className="calendar-section" key={group.id}>
        <header><span>{String(index + 1).padStart(2, "0")}</span><div><b>{group.label}</b><small>{group.note} · {group.companies.length} 家</small></div></header>
        <div className="calendar-board">
          <table>
            <thead><tr><th>公司</th><th>日期 / 财季</th><th>营收（实际 / 原预期）</th><th>EPS / 利润</th><th>核心关注点</th><th>来源</th></tr></thead>
            <tbody>
              {group.companies.map((company) => <tr key={company.ticker} className={company.status.includes("已发") ? "reported" : ""} data-search={`${company.name} ${company.ticker} ${company.focus}`}>
                <td><a href={`#earn-${company.ticker}`}><b>{company.flag} {company.name}</b><small>{company.ticker} · {company.layer}</small></a><em className={`earn-status status-${company.status}`}>{company.status}</em></td>
                <td><b>{company.date}</b><small>{company.fiscal}</small></td>
                <td><small>{company.status.includes("已发") ? "实际 / 初值" : "财报前一致预期"}</small>{company.revenue}<small>{company.currency}</small></td>
                <td>{company.eps}</td>
                <td>{company.focus}</td>
                <td><Grade value={company.grade} /><SourceLink href={company.source} label="公司原始 IR" compact />{!company.status.includes("已发") && <SourceLink href={consensusSource(company)} label="预期数据页" compact />}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>)}
      {visible.length === 0 && <div className="empty">没有匹配的业绩公司。</div>}
      <SectionTitle icon="▤" title="各公司详细版" note="已发四宫格 · 初值中间态 · 待发两栏预期锚" />
      <div className="earnings-details">
        {visible.map((company) => {
          const initial = company.status.includes("初值");
          const reported = company.status.includes("已发") && !initial;
          const marketSource = consensusSource(company);
          return <details id={`earn-${company.ticker}`} key={company.ticker} open={company.status.includes("已发")}>
            <summary>
              <span>{company.flag}</span><b>{company.name} <em>{company.ticker}</em></b>
              <small>{company.fiscal} · {company.date}</small>
              <i className={`earn-status status-${company.status}`}>{company.status}</i>
              <strong>{company.highlights}</strong>
            </summary>
            {reported && <div className="earnings-quad">
              <article><span>📊</span><b>业绩要点（本季实际）</b><p>{company.highlights}</p><Grade value="A" /><SourceLink href={company.source} label="实际值原始 IR" compact /></article>
              <article><span>🎯</span><b>管理层指引</b><p>{company.guidance}</p><Grade value="A" /><SourceLink href={company.source} label="指引原始 IR" compact /></article>
              <article><span>🌐</span><b>外部预期与市场分歧</b><p>{company.external}</p><Grade value="B" /><SourceLink href={marketSource} label="外部业绩 / 预期页" compact /></article>
              <article><span>✦</span><b>AI 研究判断</b><p>{company.analysis}</p><Grade value={company.grade} /><SourceLink href={company.source} label="判断输入：公司 IR" compact /><SourceLink href={marketSource} label="判断输入：市场预期" compact /></article>
            </div>}
            {initial && <div className="earnings-quad earnings-initial">
              <article><span>◐</span><b>已披露初值</b><p>{company.highlights}</p><Grade value="A" /><SourceLink href={company.source} label="初值原始公告" compact /></article>
              <article><span>⌛</span><b>完整披露待补</b><p>分部收入、毛利率、现金流、资本开支与正式管理层指引仍待完整报告核验。</p><SourceLink href={company.source} label="正式披露入口" compact /></article>
              <article><span>✦</span><b>AI 暂定判断</b><p>{company.analysis}</p><Grade value="C" /><SourceLink href={company.source} label="判断输入原始站" compact /></article>
            </div>}
            {!reported && !initial && <div className="earnings-quad earnings-pending">
              <article><span>🎯</span><b>上一季 Guidance / 本季预期锚</b><p>{company.guidance}</p><Grade value={company.grade} /><SourceLink href={company.source} label="上一季公司指引" compact /><SourceLink href={marketSource} label="本季一致预期页" compact /></article>
              <article><span>▤</span><b>上一季纪要要点与待验证项</b><p>{company.highlights} {company.focus}</p><SourceLink href={company.source} label="公司 IR / 纪要入口" compact /></article>
            </div>}
            <footer><Grade value={company.grade} /><span>事实、外部预期和 AI 推论分栏；每段均附对应入口</span><SourceLink href={company.source} label={`${company.name} 原始 IR / 公告`} /></footer>
          </details>;
        })}
      </div>
      <div className="disclaimer">一致预期可能随时间变化；正式引用前必须打开每家公司原始 IR 页面复核财季、币种、GAAP/Non-GAAP 口径与披露时间。本页不构成投资建议。</div>
    </>
  );
}

function XpuPage() {
  const chips=[["NVIDIA Rubin","商品 GPU","极强","NVLink / Spectrum-X","HBM + 光互连",sourceLinks.nvidia],["AMD MI400","商品 GPU","强","机架级系统","HBM + 以太网","https://ir.amd.com/"],["Google TPU","云自研 ASIC","中","OCS / 自研网络","光交换 + 光模块","https://abc.xyz/investor/"],["AWS Trainium","云自研 ASIC","中","EFA / 以太网","scale-out 光互连","https://aws.amazon.com/machine-learning/trainium/"],["Broadcom XPU","定制 ASIC","中低","定制交换与 CPO","硅光 + 光引擎",sourceLinks.broadcomCpo],["华为昇腾","国产算力","中","全光 scale-up 探索","光模块 + 光纤连接","https://www.hiascend.com/"]];
  return <><SectionTitle icon="⌬" title="XPU 芯片光谱" note="真实比较单位是系统和互连域，不是单芯片" /><div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>平台</th><th>类型</th><th>生态</th><th>互连</th><th>光通信映射</th><th>原始网站</th></tr></thead><tbody>{chips.map(([name,type,eco,interconnect,optics,url])=><tr key={name} data-search={`${name} ${type} ${eco} ${interconnect} ${optics}`}><td>{name}</td><td>{type}</td><td>{eco}</td><td>{interconnect}</td><td>{optics}</td><td><SourceLink href={url} label="查看" compact /></td></tr>)}</tbody></table></div><div className="note-box"><b>AI 研究结论</b><p>加速器性能越高，互连域越大，光通信需求越应从“单模块数量”升级为“每机架/每兆瓦光口、带宽与功耗”三维度量。</p><SourceLink href={sourceLinks.nvidia} label="NVIDIA 系统原始资料" /></div></>;
}

function SourcesPage() {
  const sources = [
    ["A", "公司公告 / IR / 监管文件", "用于财务数据、指引、产品发布与产能规划", sourceLinks.tsmc],
    ["A", "SEMI 等行业组织", "用于设备、产能与市场规模的统一口径", sourceLinks.semi],
    ["B", "供应链交叉验证", "至少两个独立渠道方向一致；无公开原链时只列观察项，不展示为已核实结论", ""],
    ["C", "单一渠道 / 市场传闻", "无公开原链，不进入核心结论，也不生成看似可验证的 AI 摘要", ""],
  ];
  return (
    <>
      <SectionTitle icon="↗" title="来源与口径" note="先判断可信度，再判断重要性" />
      <div className="source-grid">
        {sources.map(([grade, title, copy, url]) => (
          <article key={title}>
            <Grade value={grade} />
            <div><b>{title}</b><p>{copy}</p>{url && <a href={url} target="_blank" rel="noreferrer">查看示例来源 ↗</a>}</div>
          </article>
        ))}
      </div>
      <div className="method">
        <h3>研究方法</h3>
        <ol>
          <li><b>事实层：</b>记录原始披露、时间、口径和链接，不先做方向判断。</li>
          <li><b>解释层：</b>回答“变化来自需求、供给、价格还是份额”。</li>
          <li><b>验证层：</b>给每条判断配置 1–3 个可跟踪变量和证伪条件。</li>
          <li><b>投资层：</b>区分景气、竞争力、估值与交易拥挤度。</li>
        </ol>
      </div>
      <div className="disclaimer">本站为行业研究演示，不提供实时行情，不构成投资建议。数据以来源页面最新披露为准。</div>
    </>
  );
}

export default function Page() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("paper");
  const [fontSize, setFontSize] = useState("m");
  const [query, setQuery] = useState("");
  const [onlyAB, setOnlyAB] = useState(false);
  const [onlyImportant, setOnlyImportant] = useState(false);
  const [last7Days, setLast7Days] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [updated, setUpdated] = useState(MARKET_DATA_GENERATED_AT.slice(5, 16));
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("silicon-pulse-favorites");
    if (saved) setFavorites(JSON.parse(saved));
    if (window.innerWidth < 820) setSidebarOpen(false);
  }, []);

  useEffect(() => {
    const normalized = query.trim().toLowerCase();
    document.querySelectorAll("[data-search]").forEach((node) => {
      node.hidden = Boolean(normalized) && !String(node.getAttribute("data-search") || "").toLowerCase().includes(normalized);
    });
  }, [query, active]);

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("silicon-pulse-favorites", JSON.stringify(next));
      return next;
    });
  };

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return events.filter((item) => {
      const matchesQuery = !normalized || `${item.company} ${item.category} ${item.title} ${item.summary} ${item.takeaway}`.toLowerCase().includes(normalized);
      const matchesGrade = !onlyAB || ["A", "B"].includes(item.grade);
      const matchesImportant = !onlyImportant || item.importance >= 3;
      return matchesQuery && matchesGrade && matchesImportant;
    });
  }, [query, onlyAB, onlyImportant]);

  const refresh = () => {
    const now = new Date();
    setUpdated(`${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    setToast("数据视图已刷新");
    setTimeout(() => setToast(""), 1800);
  };

  const titles = Object.fromEntries(navGroups.flatMap((group) => group.items.map((item) => [item.id, item.label])));
  const categoryMap = {
    foundry: "晶圆代工",
    memory: "存储",
    equipment: "设备",
    ai: "AI 芯片",
    policy: "政策",
  };
  const activeEvents = categoryMap[active]
    ? filteredEvents.filter((item) => item.category.includes(categoryMap[active]) || (active === "equipment" && item.category === "材料"))
    : filteredEvents;

  let content;
  if (active === "home") content = <Home filteredEvents={filteredEvents} favorites={favorites} toggleFavorite={toggleFavorite} go={setActive} />;
  else if (active === "daily") content = <DailyPage items={filteredEvents} favorites={favorites} toggleFavorite={toggleFavorite} go={setActive} />;
  else if (active === "chain") content = <ChainPage />;
  else if (active === "events") content = <ProductReleasePage />;
  else if (["papers","deepread","interviews"].includes(active)) content = <ResearchFeed type={active} />;
  else if (active === "hifreq") content = <HighFreqPage />;
  else if (active === "viewhub") content = <ViewHubPage />;
  else if (active === "score") content = <ScorePage />;
  else if (active === "cpo") content = <CPOPage />;
  else if (active === "capex") content = <CapexPage />;
  else if (active === "statements") content = <StatementPage />;
  else if (active === "tape") content = <TapePage />;
  else if (active === "knowledge") content = <KnowledgePage />;
  else if (active === "earnings") content = <EarningsPage />;
  else if (active === "xpu") content = <XpuPage />;
  else if (active === "sources") content = <SourcesPage />;
  else if (active === "watch") content = <EventStream items={filteredEvents.filter((item) => favorites.includes(item.id))} favorites={favorites} toggleFavorite={toggleFavorite} title="我的关注" />;
  else content = <EventStream items={activeEvents} favorites={favorites} toggleFavorite={toggleFavorite} title={titles[active] || "关键事件流"} />;

  return (
    <main className={`app theme-${theme} font-${fontSize} ${sidebarOpen ? "" : "sidebar-hidden"}`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">Si</span>
          <div><b>半导体行业动态站</b><small>SEMICONDUCTOR INTELLIGENCE</small></div>
          <button className="side-close" onClick={() => setSidebarOpen(false)} aria-label="关闭侧栏">×</button>
        </div>
        <nav>
          {navGroups.map((group) => (
            <div key={group.label || "home"}>
              {group.label && <div className="nav-label">{group.label}</div>}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={active === item.id ? "active" : ""}
                  onClick={() => { setActive(item.id); if (window.innerWidth < 760) setSidebarOpen(false); }}
                >
                  <span>{item.icon}</span><b>{item.label}</b>{item.count && <em>{item.count}</em>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="theme-switcher">
          <span>配色</span>
          {["paper", "slate", "cream"].map((item) => (
            <button key={item} aria-label={item} className={`${item} ${theme === item ? "on" : ""}`} onClick={() => setTheme(item)} />
          ))}
        </div>
        <div className="side-status">
          <span><i className="live-dot" />研究数据已同步</span>
          <small>更新 {updated} · 北京</small>
          <small>A级来源 {events.filter((event) => event.grade === "A").length} · 研究事件 {events.length}</small>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="menu" onClick={() => setSidebarOpen((value) => !value)}>☰</button>
          <b className="page-title">{titles[active] || "首页"}</b>
          <label className="search">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索公司 / 环节 / 事件 / 摘要…" />
            {query && <button onClick={() => setQuery("")}>×</button>}
          </label>
          <div className="toggles">
            <label><input type="checkbox" checked={onlyAB} onChange={(event) => setOnlyAB(event.target.checked)} />只看 A/B</label>
            <label><input type="checkbox" checked={onlyImportant} onChange={(event) => setOnlyImportant(event.target.checked)} />只看重点</label>
            <label><input type="checkbox" checked={last7Days} onChange={(event) => setLast7Days(event.target.checked)} />近 7 天</label>
          </div>
          <div className="font-switcher">
            {["s", "m", "l"].map((item) => <button key={item} className={fontSize === item ? "on" : ""} onClick={() => setFontSize(item)}>A{item === "s" ? "−" : item === "l" ? "+" : ""}</button>)}
          </div>
          <button className="refresh" onClick={refresh}>↻</button>
        </header>

        <div className="content">{content}</div>
      </section>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
