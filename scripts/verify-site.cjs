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
  await page.getByText("东方财富准实时行情已连接").waitFor();
  assert(marketResponses === 4, `首次批量行情请求应为 4 次，实际 ${marketResponses}`);
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
  await page.getByRole("button", { name: "立即刷新" }).click();
  await page.getByText("东方财富准实时行情已连接").waitFor();
  assert(marketResponses === 8, `手动刷新后累计行情请求应为 8 次，实际 ${marketResponses}`);
  await page.locator(".atlas-search input").fill("600176");
  await page.locator(".atlas-search input").press("Enter");
  await page.waitForSelector(".company-onepager");
  const companyText = await page.locator(".company-onepager").innerText();
  assert(companyText.includes("中国巨石"), "未打开中国巨石一页纸");
  assert(companyText.includes("¥38.39"), "中国巨石最新现价未渲染");
  assert(companyText.includes("≈1,536.8亿元"), "中国巨石最新市值未渲染");
  assert(companyText.includes("2026-07-29"), "行情日期未显示");
  assert(companyText.includes("东方财富行情中心"), "行情来源未显示");
  assert(!companyText.includes("打开原始页核验"), "仍存在旧行情占位文字");

  await page.locator(".atlas-panel-head button").click();
  console.log("checkpoint: sources");
  assert((await page.locator(".atlas-update-grid article").count()) === 15, "来源监测站数量错误");
  assert((await page.getByText(/检查 2026-07-29 15:43/).count()) > 0, "来源检查日期未更新");

  await page.getByRole("button", { name: /业绩前瞻日历/ }).click();
  console.log("checkpoint: earnings");
  assert((await page.locator(".calendar-board tbody tr").count()) === 35, "业绩日历公司数错误");
  assert((await page.locator(".calendar-board tbody tr .source-link").count()) >= 35, "业绩日历缺少原始来源");
  assert((await page.locator(".earnings-details > details[open]").count()) >= 17, "最新已披露业绩未展开");

  await page.getByRole("button", { name: /每日半导体日报聚合/ }).click();
  assert(await page.getByText(/FY26 Q4 营收 900 亿美元/).first().isVisible(), "今天新增的 Microsoft 动态未进入每日更新");
  assert(await page.getByText(/Meta 发布 2026 年二季度业绩/).first().isVisible(), "今天新增的 Meta 动态未进入每日更新");

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
    earningsCompanies: 35,
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
