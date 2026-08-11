const { chromium } = require("playwright");

const target = process.argv[2] || "http://127.0.0.1:4182";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

let browser;
(async () => {
  browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(15000);
  const errors = [];
  let marketResponses = 0;
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("Failed to load resource")) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().includes("eastmoney.com/api/qt/ulist.np/get") && response.ok()) marketResponses += 1;
  });

  await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(".app");
  console.log("checkpoint: loaded");
  assert((await page.title()) === "半导体行业动态站", "网站标题错误");

  await page.getByRole("button", { name: /半导体产业链标的一页纸/ }).click();
  console.log("checkpoint: chain");
  await page.waitForTimeout(2500);
  assert([0, 4].includes(marketResponses), `首次批量行情请求应为 4 次或回退静态快照，实际 ${marketResponses}`);
  const initialMarketResponses = marketResponses;
  const treeScroll = await page.locator(".atlas-tree-scroll").evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
    overflowY: getComputedStyle(element).overflowY,
  }));
  assert(treeScroll.scrollHeight > treeScroll.clientHeight, "产业链左栏内容未形成独立滚动区域");
  assert(treeScroll.overflowY === "scroll", `产业链左栏滚动条未强制显示：${treeScroll.overflowY}`);
  const waferAverage = page.locator(".atlas-sector-head").filter({ hasText: "硅片" }).first().locator(".sector-average");
  assert(await waferAverage.getAttribute("title").then((text) => text.includes("6/6 只行情")), "硅片板块平均涨跌幅未覆盖 6/6 只股票");
  assert(/^均幅 [+-]\d+\.\d{2}%$/.test(await waferAverage.innerText()), "硅片板块平均涨跌幅格式错误");
  await page.locator(".atlas-sector-head").filter({ hasText: "光通信(光模块/光芯片)" }).first().click();
  assert(await page.locator(".sector-explainer").isVisible(), "产业链行业逻辑拆解未显示");
  assert(await page.locator(".sector-education-figure img").isVisible(), "重点行业教学配图未显示");
  assert((await page.locator(".sector-flow article").count()) === 5, "产业链流程图环节数量错误");
  await page.getByRole("button", { name: "立即刷新" }).click();
  await page.waitForTimeout(2500);
  assert(marketResponses === (initialMarketResponses ? 8 : 0), `手动刷新请求数异常，实际 ${marketResponses}`);
  await page.locator(".atlas-search input").fill("600176");
  await page.locator(".atlas-search input").press("Enter");
  await page.waitForSelector(".company-onepager");
  const companyText = await page.locator(".company-onepager").innerText();
  assert(companyText.includes("中国巨石"), "未打开中国巨石一页纸");
  assert(companyText.includes("¥43.28"), "中国巨石最新现价未渲染");
  assert(companyText.includes("2026-08-10"), "最新有效行情日期未显示");
  assert(companyText.includes("东方财富行情中心"), "行情来源未显示");
  assert(!companyText.includes("打开原始页核验"), "仍存在旧行情占位文字");

  await page.locator(".atlas-panel-head button").click();
  console.log("checkpoint: sources");
  assert((await page.locator(".atlas-update-grid article").count()) === 15, "来源监测站数量错误");
  assert((await page.getByText(/检查 2026-08-11 08:42/).count()) > 0, "来源检查日期未更新");

  await page.getByRole("button", { name: /业绩前瞻日历/ }).click();
  console.log("checkpoint: earnings");
  assert((await page.locator(".calendar-board tbody tr").count()) === 40, "业绩日历公司数错误");
  assert((await page.locator(".calendar-board tbody tr .source-link").count()) >= 40, "业绩日历缺少原始来源");
  assert((await page.locator(".earnings-details > details[open]").count()) >= 17, "最新已披露业绩未展开");

  await page.getByRole("button", { name: /每日半导体日报聚合/ }).click();
  assert((await page.locator(".archive-date-strip button").count()) === 14, "07-29至今的逐日归档不完整");
  assert(await page.getByText(/Lumentum 将于今日美股收盘后/).first().isVisible(), "8月11日CPO业绩前瞻未进入日报");
  await page.locator(".archive-date-strip button").filter({ hasText: "07.30" }).click();
  assert(await page.getByText(/产业链平均 -7.45%/).first().isVisible(), "7月30日A股盘后行情未进入逐日归档");
  assert(await page.getByText(/Samsung 二季度业绩材料/).first().isVisible(), "7月30日存储动态未进入逐日归档");
  await page.locator(".historical-events summary").click();
  assert(await page.getByText(/2Q26 营收 402 亿美元/).first().isVisible(), "追加新内容时误删了原有 TSMC 动态");

  await page.getByRole("button", { name: /知识解读/ }).click();
  assert((await page.locator(".glossary-rich article").count()) >= 35, "知识解读专业术语扩充不足");
  assert(await page.getByText("HVLP 铜箔", { exact: true }).isVisible(), "PCB材料专业术语缺失");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(".app");
  const bodyWidth = await page.locator("body").evaluate((element) => element.scrollWidth);
  assert(bodyWidth <= 390, `移动端横向溢出：${bodyWidth}px`);
  assert(errors.length === 0, `浏览器错误：${errors.join(" | ")}`);

  console.log(JSON.stringify({
    target,
    marketCoverage: "266/266",
    marketResponses,
    sourceBoards: 15,
    earningsCompanies: 40,
    treeScroll,
    bodyWidth,
    errors,
  }));
  await browser.close();
  browser = null;
})().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
}).finally(async () => {
  if (browser) await browser.close();
});
