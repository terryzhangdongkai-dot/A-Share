"use client";

import { useEffect, useMemo, useState } from "react";

const sourceLinks = {
  tsmc: "https://investor.tsmc.com/english/quarterly-results/2026/q2",
  semi: "https://www.semi.org/en/products-services/market-data/world-fab-forecast",
  micron: "https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-record-results-third-quarter",
  nvidia: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Vera-Rubin-Ramps-Into-Full-Production-to-Power-Agentic-AI-Factories-Worldwide/default.aspx",
};

const navGroups = [
  {
    label: "",
    items: [{ id: "home", icon: "⌂", label: "首页", count: "" }],
  },
  {
    label: "研究协同",
    items: [
      { id: "chain", icon: "◫", label: "产业链地图", count: "8" },
      { id: "events", icon: "⌁", label: "关键事件流", count: "12" },
    ],
  },
  {
    label: "每日更新",
    items: [
      { id: "foundry", icon: "▦", label: "晶圆代工", count: "24" },
      { id: "memory", icon: "▤", label: "存储周期", count: "18" },
      { id: "equipment", icon: "⚙", label: "设备与材料", count: "31" },
      { id: "ai", icon: "✦", label: "AI 芯片", count: "27" },
      { id: "policy", icon: "◎", label: "政策与产能", count: "14" },
    ],
  },
  {
    label: "跟踪看板",
    items: [
      { id: "score", icon: "◇", label: "公司记分卡", count: "16" },
      { id: "capex", icon: "↗", label: "资本开支", count: "9" },
      { id: "watch", icon: "☆", label: "我的关注", count: "6" },
    ],
  },
  {
    label: "专题沉淀",
    items: [
      { id: "node", icon: "⌬", label: "先进制程", count: "" },
      { id: "advanced-packaging", icon: "⬡", label: "先进封装", count: "" },
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
];

const companies = [
  { rank: 1, name: "TSMC", segment: "晶圆代工", score: 94, trend: "+4", signal: "景气上修", color: "#2674ff" },
  { rank: 2, name: "Micron", segment: "存储", score: 91, trend: "+7", signal: "量价齐升", color: "#a856e7" },
  { rank: 3, name: "NVIDIA", segment: "AI 芯片", score: 90, trend: "+2", signal: "系统放量", color: "#58a929" },
  { rank: 4, name: "ASML", segment: "光刻设备", score: 82, trend: "-1", signal: "订单验证", color: "#e08d22" },
  { rank: 5, name: "长鑫科技", segment: "DRAM", score: 78, trend: "+9", signal: "上市观察", color: "#d64d4d" },
];

const chain = [
  { name: "EDA / IP", names: "Synopsys · Cadence · Arm", heat: 78, change: "+2" },
  { name: "AI 芯片设计", names: "NVIDIA · AMD · 国产算力", heat: 94, change: "+5" },
  { name: "晶圆代工", names: "TSMC · Samsung · 中芯国际", heat: 91, change: "+4" },
  { name: "存储", names: "SK hynix · Micron · 长鑫科技", heat: 96, change: "+8" },
  { name: "设备", names: "ASML · AMAT · 北方华创", heat: 88, change: "+3" },
  { name: "材料", names: "硅片 · 光刻胶 · 电子特气", heat: 74, change: "+1" },
  { name: "先进封装", names: "CoWoS · HBM · 玻璃基板", heat: 93, change: "+6" },
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
        <a href="#chain-heat">产业链热度</a>
        <a href="#companies">公司记分卡</a>
        <a href="#capex-chart">资本开支</a>
      </aside>
      <div className="home-main">
        <section className="digest" id="verdict">
          <div><b>📌 今日速读：</b>存储与先进封装热度居前 · 设备投资预期再上修 · 代工龙头指引强化 AI 需求</div>
          <small>阅读路径：2 分钟看判断 → 5 分钟看事件 → 10 分钟看产业链与公司评分</small>
        </section>

        <SectionTitle icon="◉" title="今日三条判断" note="更新于 2026-07-29 · 研究判断优先于信息堆叠" />
        <section className="verdict-list">
          {[
            ["1", "需求", "AI 半导体景气继续由“单芯片”走向“系统级”", "算力芯片、HBM、先进封装、光互连和电源散热的交付节奏正在同步化，研究框架应从单点涨价转向系统 BOM 价值量。"],
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
          <MetricCard label="产业链景气温度" value="86 / 100" delta="+4 周环比" note="硅脉研究模型 · B级" tone="green" points={[62, 66, 71, 74, 79, 82, 86]} />
        </section>

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
  const [favorites, setFavorites] = useState([]);
  const [updated, setUpdated] = useState("07-29 08:42");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("silicon-pulse-favorites");
    if (saved) setFavorites(JSON.parse(saved));
    if (window.innerWidth < 820) setSidebarOpen(false);
  }, []);

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
  else if (active === "chain" || active === "node" || active === "advanced-packaging") content = <ChainPage />;
  else if (active === "score") content = <ScorePage />;
  else if (active === "capex" || active === "policy") content = <CapexPage />;
  else if (active === "sources") content = <SourcesPage />;
  else if (active === "watch") content = <EventStream items={filteredEvents.filter((item) => favorites.includes(item.id))} favorites={favorites} toggleFavorite={toggleFavorite} title="我的关注" />;
  else content = <EventStream items={activeEvents} favorites={favorites} toggleFavorite={toggleFavorite} title={titles[active] || "关键事件流"} />;

  return (
    <main className={`app theme-${theme} font-${fontSize} ${sidebarOpen ? "" : "sidebar-hidden"}`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">Si</span>
          <div><b>硅脉 · 行业动态站</b><small>SEMICONDUCTOR INTELLIGENCE</small></div>
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
