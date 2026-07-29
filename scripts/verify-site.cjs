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
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("Failed to load resource")) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(".app");
  console.log("checkpoint: loaded");
  assert((await page.title()) === "半导体行业动态站", "网站标题错误");

  await page.getByRole("button", { name: /半导体产业链标的一页纸/ }).click();
  console.log("checkpoint: chain");
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

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(".app");
  const bodyWidth = await page.locator("body").evaluate((element) => element.scrollWidth);
  assert(bodyWidth <= 390, `移动端横向溢出：${bodyWidth}px`);
  assert(errors.length === 0, `浏览器错误：${errors.join(" | ")}`);

  console.log(JSON.stringify({
    target,
    marketCoverage: "266/266",
    sourceBoards: 15,
    earningsCompanies: 35,
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
