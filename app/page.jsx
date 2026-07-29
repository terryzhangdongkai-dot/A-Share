"use client";

import React, { useEffect, useMemo, useState } from "react";

const sourceLinks = {
  tsmc: "https://investor.tsmc.com/english/quarterly-results/2026/q2",
  semi: "https://www.semi.org/en/products-services/market-data/world-fab-forecast",
  micron: "https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-record-results-third-quarter",
  nvidia: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Vera-Rubin-Ramps-Into-Full-Production-to-Power-Agentic-AI-Factories-Worldwide/default.aspx",
  broadcomCpo: "https://www.broadcom.com/products/ethernet-connectivity/optical-system-solutions",
  corning: "https://investor.corning.com/",
  coherent: "https://investors.coherent.com/",
};

const navGroups = [
  {
    label: "",
    items: [{ id: "home", icon: "⌂", label: "首页", count: "" }],
  },
  {
    label: "交互协同",
    items: [
      { id: "daily", icon: "◉", label: "每日半导体日报", count: "" },
      { id: "chain", icon: "◫", label: "产业链标的一页纸", count: "10" },
    ],
  },
  {
    label: "每日更新",
    items: [
      { id: "events", icon: "⌁", label: "产品与公司事件", count: "18" },
      { id: "papers", icon: "▤", label: "论文与技术前沿", count: "26" },
      { id: "deepread", icon: "▦", label: "机构与 KOL 深读", count: "32" },
      { id: "interviews", icon: "▶", label: "访谈与业绩会", count: "21" },
      { id: "hifreq", icon: "↗", label: "高频数据", count: "" },
      { id: "viewhub", icon: "❞", label: "观点聚合台", count: "" },
    ],
  },
  {
    label: "跟踪看板",
    items: [
      { id: "score", icon: "◇", label: "公司记分卡", count: "16" },
      { id: "cpo", icon: "✦", label: "CPO / 光模块", count: "重点" },
      { id: "capex", icon: "↗", label: "资本开支看板", count: "9" },
      { id: "statements", icon: "◌", label: "公司发言墙", count: "24" },
      { id: "tape", icon: "≋", label: "半导体 Tape", count: "" },
    ],
  },
  {
    label: "专题沉淀",
    items: [
      { id: "watch", icon: "☆", label: "精华沉淀 / 收藏", count: "" },
      { id: "knowledge", icon: "◎", label: "知识解读", count: "" },
      { id: "earnings", icon: "▦", label: "业绩前瞻日历", count: "" },
      { id: "xpu", icon: "⌬", label: "XPU 芯片光谱", count: "" },
      { id: "sources", icon: "↗", label: "来源与口径", count: "" },
    ],
  },
];

const events = [
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
    title: "先进封装材料验证周期拉长，低损耗基板与高端底填胶成为扩产瓶颈",
    summary: "多家供应链反馈称验证资源向 AI 服务器倾斜，消费电子相关新材料导入节奏分化。",
    takeaway: "材料环节弹性大于设备，但需要严格区分认证、量产与份额提升三个阶段。",
    source: "供应链交叉验证",
    url: "#sources",
  },
  {
    id: 6,
    date: "07-26",
    grade: "B",
    importance: 1,
    category: "汽车芯片",
    company: "行业渠道",
    title: "汽车 MCU 库存继续去化，功率半导体价格压力边际收敛",
    summary: "工业与汽车需求仍弱于 AI 相关链条，但渠道库存周转已较一季度改善。",
    takeaway: "成熟制程尚未进入全面反转，优先跟踪库存、稼动率和价格三项是否共振。",
    source: "渠道调研",
    url: "#sources",
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
    company: "中际旭创 / 新易盛",
    title: "1.6T 产品进入放量验证期，价格、良率与客户结构将决定盈利弹性",
    summary: "市场关注从 800G 出货总量切换到 1.6T 渗透率、单通道 200G 良率、DSP 与光芯片供应，以及北美云厂订单份额。",
    takeaway: "判断不能只看出货量；需要同步跟踪产品结构、单位成本、客户集中度和资本开支回收期。",
    source: "公司公告与产业链交叉验证",
    url: "#sources",
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

const companies = [
  { rank: 1, name: "中际旭创", segment: "光模块", score: 94, trend: "+5", signal: "1.6T 验证", color: "#2674ff" },
  { rank: 2, name: "TSMC", segment: "晶圆代工", score: 93, trend: "+4", signal: "景气上修", color: "#147bb8" },
  { rank: 3, name: "新易盛", segment: "光模块", score: 91, trend: "+6", signal: "份额跟踪", color: "#17a589" },
  { rank: 4, name: "天孚通信", segment: "光器件", score: 89, trend: "+4", signal: "上游卡位", color: "#a856e7" },
  { rank: 5, name: "NVIDIA", segment: "AI 芯片", score: 88, trend: "+2", signal: "系统放量", color: "#58a929" },
  { rank: 6, name: "Coherent", segment: "光芯片/器件", score: 84, trend: "+3", signal: "供给验证", color: "#e08d22" },
  { rank: 7, name: "Micron", segment: "存储", score: 83, trend: "+5", signal: "量价齐升", color: "#7f55b3" },
  { rank: 8, name: "光迅科技", segment: "光模块/器件", score: 78, trend: "+2", signal: "客户突破", color: "#d64d4d" },
];

const chain = [
  { name: "EDA / IP", names: "Synopsys · Cadence · Arm", heat: 78, change: "+2" },
  { name: "AI 芯片设计", names: "NVIDIA · AMD · 国产算力", heat: 94, change: "+5" },
  { name: "晶圆代工", names: "TSMC · Samsung · 中芯国际", heat: 91, change: "+4" },
  { name: "存储", names: "SK hynix · Micron · 长鑫科技", heat: 96, change: "+8" },
  { name: "设备", names: "ASML · AMAT · 北方华创", heat: 88, change: "+3" },
  { name: "材料", names: "硅片 · 光刻胶 · 电子特气", heat: 74, change: "+1" },
  { name: "先进封装", names: "CoWoS · HBM · 玻璃基板", heat: 93, change: "+6" },
  { name: "CPO / 光模块", names: "800G · 1.6T · CPO · LPO · 硅光", heat: 97, change: "+8" },
  { name: "终端需求", names: "AI 服务器 · 汽车 · 消费电子", heat: 85, change: "+2" },
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

function MetricCard({ label, value, delta, note, tone = "blue", points }) {
  return (
    <article className={`metric metric-${tone}`}>
      <div>
        <div className="metric-label">{label}</div>
        <strong>{value}</strong>
        <span className="delta">{delta}</span>
      </div>
      <Sparkline points={points} />
      <small>{note}</small>
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
      <div className="source">来源：{item.source} · 可信度 {item.grade}</div>
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
          <small>阅读路径：1 分钟看判断 → 5 分钟看事件 → 10 分钟进入 CPO 专题与公司矩阵</small>
        </section>

        <SectionTitle icon="◉" title="今日三条判断" note="更新于 2026-07-29 · 研究判断优先于信息堆叠" />
        <section className="verdict-list">
          {[
            ["1", "CPO", "光互连从 800G/1.6T 可插拔走向多技术路线并行", "近期业绩由可插拔模块兑现，中期 CPO/NPO/LPO 提供增量；研究重点转向光芯片、CW 激光、FAU 与封装测试。"],
            ["2", "供给", "设备周期上修，但订单兑现将显著分化", "SEMI 将 2026 年全球晶圆厂设备投资预期推至 1520 亿美元。先进节点与存储更强，成熟制程仍需观察稼动率。"],
            ["3", "估值", "高景气赛道进入业绩与份额验证期", "二季度财报窗口将决定高估值能否维持。优先寻找订单、收入、毛利三项同时改善的公司，回避只靠主题扩散的标的。"],
          ].map(([num, tag, title, desc]) => (
            <article className="verdict" key={num}>
              <span className="number">{num}</span>
              <div>
                <span className="pill">{tag}</span>
                <b>{title}</b>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </section>

        <SectionTitle icon="⌁" title="高频数据" note="官方披露与研究口径分开呈现" />
        <section className="metric-grid" id="metrics">
          <MetricCard label="全球晶圆厂设备 2026E" value="$152B" delta="+24% YoY" note="SEMI · A级" points={[82, 91, 97, 123, 152]} />
          <MetricCard label="TSMC 2Q26 营收" value="$40.2B" delta="超指引上沿" note="TSMC IR · A级" tone="orange" points={[25, 28, 31, 36, 40]} />
          <MetricCard label="Micron FY26 Q3 营收" value="$41.46B" delta="+74% QoQ" note="Micron IR · A级" tone="purple" points={[9, 12, 24, 41]} />
          <MetricCard label="CPO / 光模块热度" value="97 / 100" delta="+8 周环比" note="研究事件模型 · B级" tone="green" points={[62, 66, 73, 79, 85, 91, 97]} />
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
            <button className="chain-card" key={item.name} onClick={() => go(item.name.includes("存储") ? "memory" : "chain")}>
              <div className="chain-top"><b>{item.name}</b><span>{item.change}</span></div>
              <div className="heat"><i style={{ width: `${item.heat}%` }} /></div>
              <div className="chain-bottom"><span>{item.names}</span><strong>{item.heat}</strong></div>
            </button>
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
              <span><em>{company.signal}</em></span>
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

function ChainPage() {
  return (
    <>
      <SectionTitle icon="◫" title="半导体产业链地图" note="从需求到材料的八层拆解" />
      <div className="chain-map">
        {chain.map((item, index) => (
          <article key={item.name}>
            <div className="chain-index">{String(index + 1).padStart(2, "0")}</div>
            <div><b>{item.name}</b><p>{item.names}</p></div>
            <div className="heat large"><i style={{ width: `${item.heat}%` }} /></div>
            <strong>{item.heat}</strong>
          </article>
        ))}
      </div>
      <SectionTitle icon="◎" title="传导关系" note="核心因果链" />
      <div className="flow">
        {["AI 资本开支", "GPU / ASIC", "HBM + 先进封装", "晶圆与设备", "材料与零部件"].map((item, i) => (
          <div key={item}><span>{i + 1}</span><b>{item}</b>{i < 4 && <i>→</i>}</div>
        ))}
      </div>
      <div className="note-box">
        <b>读图提示</b>
        <p>热度反映事件密度、业绩斜率与市场关注度的合成结果，不代表证券评级。产业链传导通常存在 1–4 个季度时滞。</p>
      </div>
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
          </article>
        ))}
      </div>
    </>
  );
}

function CapexPage() {
  return (
    <>
      <SectionTitle icon="↗" title="资本开支追踪" note="晶圆厂、设备与先进封装" />
      <div className="capex-hero">
        <div><small>2026E 全球晶圆厂设备投资</small><strong>$152B</strong><em>+24% YoY</em></div>
        <div><small>2027E</small><strong>$166B</strong><em>+9% YoY</em></div>
        <div><small>300mm 2026E</small><strong>$133B</strong><em>+18% YoY</em></div>
      </div>
      <div className="capex-table-wrap">
        <table className="capex-table">
          <thead><tr><th>环节</th><th>2026E 方向</th><th>核心驱动</th><th>跟踪变量</th><th>景气</th></tr></thead>
          <tbody>
            {[
              ["先进逻辑", "强增长", "2nm / GAA、AI 加速器", "EUV、刻蚀、薄膜订单", "高"],
              ["DRAM / HBM", "强增长", "HBM4、先进 DRAM 节点", "良率、封装能力、合约价", "高"],
              ["NAND", "修复", "层数升级与企业级 SSD", "资本纪律、库存", "中高"],
              ["成熟制程", "分化", "本地化与汽车工业需求", "稼动率、价格", "中"],
              ["先进封装", "强增长", "CoWoS / Hybrid Bonding", "设备交期、基板供给", "高"],
            ].map((row) => (
              <tr key={row[0]}>{row.map((cell, i) => <td key={cell}>{i === 4 ? <span className={`signal signal-${cell}`}>{cell}</span> : cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
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
    ],
  },
  deepread: {
    title: "机构与 KOL 深读",
    note: "专题阅读包：先读核心问题，再看证据与证伪变量",
    groups: [
      ["CPO 阅读包", "CPO 会替代多少可插拔光模块？", "按交换机代际、光口位置、激光器架构与维护成本拆分，不采用‘全部替代’线性假设", "60 分钟"],
      ["1.6T 阅读包", "1.6T 放量由需求还是良率主导？", "跟踪单通道 200G 良率、DSP 供给、客户认证、长协价与散单价", "45 分钟"],
      ["光芯片阅读包", "EML、硅光与薄膜铌酸锂的边界", "比较速率、距离、功耗、温度稳定性、成本与量产成熟度", "50 分钟"],
      ["算力资本开支", "云厂自由现金流能否支撑 AI 网络升级", "将 GPU、交换机、光模块、电力和园区网络放进同一资本回收模型", "60 分钟"],
    ],
  },
  interviews: {
    title: "访谈与业绩会",
    note: "管理层原话优先；每条配置下一验证点",
    groups: [
      ["云厂", "AI 集群网络架构与 1.6T 采购节奏", "关注交换机端口速率、网络拓扑、双供应商策略和年度降价", "T1 / A-B"],
      ["模块厂", "800G→1.6T 产品结构与产能利用率", "关注出货量以外的良率、毛利、客户集中度和资本开支", "公司交流 / B"],
      ["器件厂", "CW 激光器、FAU、MPO 与硅光封装需求", "验证 CPO/NPO 样品收入与批量收入的时间差", "供应链 / B"],
      ["海外龙头", "Coherent / Lumentum / Fabrinet 订单与供给", "关注激光器供给、制造外包、北美客户库存和交期", "IR / A"],
    ],
  },
};

function ResearchFeed({ type }) {
  const feed = researchFeeds[type];
  const [scope, setScope] = useState("全部");
  const scopes = ["全部", ...new Set(feed.groups.map((item) => item[0]))];
  return (
    <>
      <SectionTitle icon={type === "papers" ? "▤" : type === "deepread" ? "▦" : "▶"} title={feed.title} note={feed.note} />
      <div className="filter-row">{scopes.map((item) => <button key={item} className={scope === item ? "active" : ""} onClick={() => setScope(item)}>{item}</button>)}</div>
      <div className="research-list">
        {feed.groups.filter((item) => scope === "全部" || item[0] === scope).map(([tag, title, copy, source], index) => (
          <article key={title} data-search={`${tag} ${title} ${copy} ${source}`}>
            <span className="research-index">{String(index + 1).padStart(2, "0")}</span>
            <div><span className="pill">{tag}</span><b>{title}</b><p>{copy}</p><small>{source} · ☆ 可收藏到精华沉淀</small></div>
          </article>
        ))}
      </div>
    </>
  );
}

function DailyPage({ items, favorites, toggleFavorite, go }) {
  return (
    <>
      <section className="digest"><div><b>📌 每日半导体日报：</b>CPO/光模块位于首页第一优先级；其次为 HBM、先进封装与晶圆设备。</div><small>结构：三条判断 → 重点事件 → 高频指标 → 观点分歧 → 下一验证点</small></section>
      <SectionTitle icon="◉" title="今日三条投资判断" note="结论先行，并给出可证伪变量" />
      <div className="verdict-list">
        {[
          ["CPO", "可插拔仍是近端业绩主体，CPO 是中期增量期权", "跟踪 1.6T 出货、102.4T 交换平台、CPO 样机转量产与外置激光器订单。"],
          ["光器件", "价值量向光芯片、FAU、CW 激光与精密封装迁移", "跟踪上游器件自制率、耦合良率、单通道 200G 认证和供给份额。"],
          ["估值", "高景气必须由份额与盈利兑现，而非速率升级叙事", "跟踪收入结构、毛利率、客户集中度、存货与资本开支回报。"],
        ].map(([tag, title, copy], i) => <article className="verdict" key={tag}><span className="number">{i + 1}</span><div><span className="pill">{tag}</span><b>{title}</b><p>{copy}</p></div></article>)}
      </div>
      <SectionTitle icon="⌁" title="今日重点事件" note="跨日去重 · A/B 来源优先" action={<button className="text-btn" onClick={() => go("events")}>查看全部 →</button>} />
      {items.slice(0, 6).map((item) => <EventCard key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={toggleFavorite} />)}
    </>
  );
}

function HighFreqPage() {
  const rows = [
    ["800G 光模块", "需求高位", "云厂网络 capex / 模块厂出货结构", "周"],
    ["1.6T 光模块", "放量验证", "单通道 200G 良率 / 客户认证 / DSP 供给", "周"],
    ["CPO / NPO", "样机→导入", "102.4T 平台 / 光引擎订单 / 外置激光器", "月"],
    ["CW 激光器", "供给偏紧", "功率、通道数、寿命与多源供应", "月"],
    ["GPU 租价", "需求代理", "H100/H200/B200 现货租价与利用率", "日"],
    ["云厂债券 YTM", "融资约束", "CoreWeave 与大云厂信用利差", "日"],
  ];
  return (
    <>
      <SectionTitle icon="↗" title="高频数据" note="跟踪频率、方向与解释口径分开呈现" />
      <div className="metric-grid">
        <MetricCard label="CPO 研究热度" value="97 / 100" delta="周环比 +8" note="事件密度模型 · B" points={[61,67,72,79,88,97]} />
        <MetricCard label="1.6T 产品阶段" value="验证→放量" delta="核心窗口" note="客户与供应链 · B" tone="orange" points={[18,24,35,48,66,84]} />
        <MetricCard label="光互连景气" value="高位" delta="结构升级" note="多源交叉 · B" tone="purple" points={[55,58,63,71,82,91]} />
        <MetricCard label="风险温度" value="中等" delta="估值/降价" note="研究模型 · C" tone="green" points={[42,48,45,51,49,54]} />
      </div>
      <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>指标</th><th>当前信号</th><th>核心观测</th><th>频率</th></tr></thead><tbody>{rows.map(row=><tr key={row[0]} data-search={row.join(" ")}>{row.map(x=><td key={x}>{x}</td>)}</tr>)}</tbody></table></div>
    </>
  );
}

function ViewHubPage() {
  const [direction, setDirection] = useState("全部");
  const views = [
    ["上调", "CPO", "102.4T 交换平台提升光引擎与连接器价值量", "关注导入节奏而非远期 TAM"],
    ["分歧", "光模块", "1.6T 年降与结构升级能否同时改善毛利", "验证长协价、散单价与产品良率"],
    ["确认", "光器件", "CW 激光、FAU 与高密度连接需求上升", "验证批量订单与多源供应"],
    ["观察", "硅光", "硅光渗透率提升但封装测试成本仍高", "跟踪 Known Good Die 与耦合自动化"],
    ["下调", "估值", "高拥挤度放大业绩窗口波动", "区分产业趋势与交易赔率"],
  ];
  return <><SectionTitle icon="❞" title="观点聚合台" note="按上调、下调、确认、分歧与观察归类" /><div className="filter-row">{["全部","上调","下调","确认","分歧","观察"].map(x=><button className={direction===x?"active":""} onClick={()=>setDirection(x)} key={x}>{x}</button>)}</div><div className="research-list">{views.filter(x=>direction==="全部"||x[0]===direction).map(([dir,topic,title,copy],i)=><article key={title} data-search={`${dir} ${topic} ${title} ${copy}`}><span className="research-index">{i+1}</span><div><span className="pill">{dir} · {topic}</span><b>{title}</b><p>{copy}</p><small>观点需回公司公告、业绩会与客户 capex 验证</small></div></article>)}</div></>;
}

function CPOPage() {
  const [tab, setTab] = useState("总览");
  const companies = [
    ["中际旭创", "光模块", "800G/1.6T", "客户与产品结构", "高"],
    ["新易盛", "光模块", "高速率模块", "份额与盈利弹性", "高"],
    ["天孚通信", "光器件", "FAU/精密封装", "上游卡位与自制率", "高"],
    ["光迅科技", "模块+器件", "数通/电信", "客户突破与产品节奏", "中高"],
    ["源杰科技", "光芯片", "EML/激光器", "认证、良率与产能", "中高"],
    ["仕佳光子", "光芯片/器件", "AWG/PLC", "高速数通产品占比", "中"],
    ["Coherent", "光芯片+模块", "激光器/收发器", "供给份额与盈利", "高"],
    ["Fabrinet", "制造服务", "光模块代工", "客户集中与产能利用", "中高"],
  ];
  const tech = [
    ["800G 可插拔", "成熟放量", "DSP + EML/硅光", "出货结构、价格、毛利"],
    ["1.6T 可插拔", "导入/放量", "单通道 200G", "良率、认证、DSP 与光芯片"],
    ["LPO/LRO", "客户验证", "弱化/移除 DSP", "链路预算、距离、误码率"],
    ["NPO", "系统验证", "光引擎靠近 ASIC", "可维护性、热与封装"],
    ["CPO", "中期导入", "ASIC 与光引擎共封装", "102.4T 平台、CW 激光、良率"],
    ["OCS/全光交换", "早期扩张", "光路重构", "拓扑、可靠性、成本"],
  ];
  return (
    <>
      <section className="cpo-hero"><div><small>重点研究专题</small><h1>CPO / 光模块投资工作台</h1><p>从 800G 与 1.6T 近端业绩，延伸到 CPO/NPO/LPO、硅光、光芯片、CW 激光与精密封装的中期技术迁移。</p></div><strong>97<small>研究热度</small></strong></section>
      <div className="filter-row cpo-tabs">{["总览","技术路线","公司矩阵","跟踪清单","风险证伪"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}</div>
      {tab === "总览" && <><div className="metric-grid"><MetricCard label="近端主线" value="1.6T" delta="验证→放量" note="收入主体仍是可插拔" points={[12,24,39,58,76,91]} /><MetricCard label="中期主线" value="CPO" delta="系统导入" note="关注 102.4T 交换平台" tone="orange" points={[8,14,20,31,46,63]} /><MetricCard label="上游弹性" value="光芯片" delta="+精密封装" note="良率与份额优先" tone="purple" points={[41,48,55,63,76,86]} /><MetricCard label="核心风险" value="年降" delta="+客户集中" note="不等于产业趋势反转" tone="green" points={[45,48,57,52,61,58]} /></div><div className="note-box"><b>核心判断</b><p>未来两年不应把 CPO 与可插拔视为简单替代关系：可插拔贡献订单与利润，CPO 提供技术期权；真正可持续的价值量更可能沉淀在光芯片、CW 激光、FAU/连接器、封装测试和系统设计。</p></div></>}
      {tab === "技术路线" && <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>路线</th><th>阶段</th><th>关键架构</th><th>跟踪变量</th></tr></thead><tbody>{tech.map(row=><tr key={row[0]} data-search={row.join(" ")}>{row.map(x=><td key={x}>{x}</td>)}</tr>)}</tbody></table></div>}
      {tab === "公司矩阵" && <div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>公司</th><th>环节</th><th>核心暴露</th><th>研究重点</th><th>景气</th></tr></thead><tbody>{companies.map(row=><tr key={row[0]} data-search={row.join(" ")}>{row.map((x,i)=><td key={x}>{i===4?<span className={`signal signal-${x}`}>{x}</span>:x}</td>)}</tr>)}</tbody></table></div>}
      {tab === "跟踪清单" && <div className="research-list">{["北美云厂网络 capex 与交换机端口升级","800G/1.6T 出货结构及长协价格","单通道 200G 光芯片与 DSP 供给","模块与器件厂良率、存货和资本开支","CPO 光引擎、CW 激光器样品转量产","客户集中度、第二供应商与份额变化"].map((x,i)=><article key={x} data-search={x}><span className="research-index">{i+1}</span><div><b>{x}</b><p>每次财报与产业链更新后记录“方向—幅度—来源—下一验证点”。</p></div></article>)}</div>}
      {tab === "风险证伪" && <div className="risk-grid">{[["需求","云厂 capex 下修或网络投入滞后于算力投入"],["价格","1.6T 年降快于良率和成本改善"],["技术","LPO/CPO 链路预算、热或可靠性验证延期"],["竞争","新进入者低价抢份额、客户推动多供应商"],["财务","存货和应收增速显著高于收入"],["交易","估值和拥挤度透支两年以上增长"]].map(([t,c])=><article key={t} data-search={`${t} ${c}`}><b>{t}</b><p>{c}</p></article>)}</div>}
    </>
  );
}

function StatementPage() {
  return <><SectionTitle icon="◌" title="公司发言墙" note="管理层原话摘要 · 下一验证点" /><div className="research-list">{[["Broadcom","交换芯片与光系统协同是带宽密度升级的重要方向","下一验证：CPO 客户导入与量产节奏"],["Corning","AI 数据中心推动企业网络与高密度光连接需求","下一验证：分部增速和大客户协议兑现"],["Coherent","高速数据通信需求牵引激光器、器件与模块组合","下一验证：供给瓶颈与毛利修复"],["中际旭创","高速率产品升级是结构性增长主线","下一验证：1.6T 产品占比、价格与盈利"],["天孚通信","精密光器件与先进封装能力决定客户黏性","下一验证：新产品认证和产能利用率"]].map(([c,q,n],i)=><article key={c} data-search={`${c} ${q} ${n}`}><span className="research-index">{i+1}</span><div><span className="pill">{c}</span><b>{q}</b><p>{n}</p><small>A/B 级口径优先，转述不作为事实 pass-through</small></div></article>)}</div></>;
}

function TapePage() {
  return <><SectionTitle icon="≋" title="半导体 Tape" note="宏观、卖方调整与跨资产信号" /><div className="timeline">{[["07-29","光通信","市场重新定价 1.6T 产品结构与年降假设","分歧"],["07-29","设备","先进逻辑与存储资本开支保持高位","确认"],["07-28","存储","HBM 与传统 DRAM/NAND 继续分化","上调"],["07-28","AI 基建","云厂自由现金流成为 capex 可持续性约束","观察"],["07-27","政策","出口限制与本地化扩产影响设备订单节奏","风险"]].map(([d,t,c,s])=><article key={d+t} data-search={`${d} ${t} ${c} ${s}`}><time>{d}</time><span>{t}</span><b>{c}</b><em>{s}</em></article>)}</div></>;
}

function KnowledgePage() {
  const terms = [["CPO","Co-Packaged Optics，光引擎与交换 ASIC 共封装"],["NPO","Near-Packaged Optics，光引擎靠近但不与 ASIC 同封装"],["LPO","Linear Pluggable Optics，弱化 DSP 以降低功耗"],["硅光","在硅平台集成调制、耦合等光学功能"],["EML","电吸收调制激光器，高速光模块常见光源方案"],["CW Laser","连续波激光器，CPO 外置光源的重要候选"],["FAU","Fiber Array Unit，光纤阵列组件"],["DSP","数字信号处理器，改善链路质量但带来功耗和成本"],["SerDes","芯片高速串并转换接口"],["Scale-up","加速器域内高速互连"],["Scale-out","集群节点之间的网络扩展"],["OCS","Optical Circuit Switch，光路交换"]];
  return <><SectionTitle icon="◎" title="知识解读" note="从术语到投资传导" /><div className="glossary">{terms.map(([t,c])=><article key={t} data-search={`${t} ${c}`}><b>{t}</b><p>{c}</p><small>投资映射：技术阶段 → 价值环节 → 受益公司 → 验证变量</small></article>)}</div></>;
}

function EarningsPage() {
  const rows=[["TSMC","晶圆代工","7 月","先进节点、CoWoS、capex"],["ASML","设备","7 月","订单、EUV/High-NA、地区结构"],["SK hynix","存储/HBM","7 月","HBM 供需、DRAM ASP、长约"],["Coherent","光芯片/模块","8 月","数据通信增速、激光器供给、毛利"],["Lumentum","激光器/器件","8 月","云数通需求、产能与客户集中"],["Fabrinet","光模块代工","8 月","光通信收入、产能利用、客户结构"],["NVIDIA","AI 芯片","8 月","平台交付、网络业务、供应链"],["Broadcom","交换/CPO","9 月","AI 网络收入、交换平台、CPO 导入"]];
  return <><SectionTitle icon="▦" title="业绩前瞻日历" note="看数字，更看管理层对下一季度的措辞" /><div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>公司</th><th>环节</th><th>窗口</th><th>核心关注点</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]} data-search={r.join(" ")}>{r.map(x=><td key={x}>{x}</td>)}</tr>)}</tbody></table></div></>;
}

function XpuPage() {
  const chips=[["NVIDIA Rubin","商品 GPU","极强","NVLink / Spectrum-X","HBM + 光互连"],["AMD MI400","商品 GPU","强","机架级系统","HBM + 以太网"],["Google TPU","云自研 ASIC","中","OCS / 自研网络","光交换 + 光模块"],["AWS Trainium","云自研 ASIC","中","EFA / 以太网","scale-out 光互连"],["Broadcom XPU","定制 ASIC","中低","定制交换与 CPO","硅光 + 光引擎"],["华为昇腾","国产算力","中","全光 scale-up 探索","光模块 + 光纤连接"]];
  return <><SectionTitle icon="⌬" title="XPU 芯片光谱" note="真实比较单位是系统和互连域，不是单芯片" /><div className="capex-table-wrap"><table className="capex-table"><thead><tr><th>平台</th><th>类型</th><th>生态</th><th>互连</th><th>光通信映射</th></tr></thead><tbody>{chips.map(r=><tr key={r[0]} data-search={r.join(" ")}>{r.map(x=><td key={x}>{x}</td>)}</tr>)}</tbody></table></div><div className="note-box"><b>研究结论</b><p>加速器性能越高，互连域越大，光通信需求越应从“单模块数量”升级为“每机架/每兆瓦光口、带宽与功耗”三维度量。</p></div></>;
}

function SourcesPage() {
  const sources = [
    ["A", "公司公告 / IR / 监管文件", "用于财务数据、指引、产品发布与产能规划", sourceLinks.tsmc],
    ["A", "SEMI 等行业组织", "用于设备、产能与市场规模的统一口径", sourceLinks.semi],
    ["B", "供应链交叉验证", "至少两个独立渠道方向一致，金额与时点仍需验证", "#"],
    ["C", "单一渠道 / 市场传闻", "仅用于建立观察项，不进入核心结论", "#"],
  ];
  return (
    <>
      <SectionTitle icon="↗" title="来源与口径" note="先判断可信度，再判断重要性" />
      <div className="source-grid">
        {sources.map(([grade, title, copy, url]) => (
          <article key={title}>
            <Grade value={grade} />
            <div><b>{title}</b><p>{copy}</p>{url !== "#" && <a href={url} target="_blank">查看示例来源 ↗</a>}</div>
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
  const [updated, setUpdated] = useState("07-29 08:42");
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
          <small>A级来源 4 · 研究事件 {events.length}</small>
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
