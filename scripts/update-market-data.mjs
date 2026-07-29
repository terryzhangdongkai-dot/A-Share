import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chainAtlasSectors } from "../app/chainAtlasData.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const companies = [...new Map(
  chainAtlasSectors
    .flatMap((sector) => sector.companies)
    .filter((company) => company.code)
    .map((company) => [company.code, company]),
).values()];

const marketInfo = (code) => {
  if (code.length < 6) {
    const normalized = code.padStart(5, "0");
    return {
      secid: `116.${normalized}`,
      normalized,
      market: "港股",
      currency: "HKD",
      sourceUrl: `https://quote.eastmoney.com/hk/${normalized}.html`,
    };
  }
  if (code.startsWith("6")) {
    return {
      secid: `1.${code}`,
      normalized: code,
      market: "沪市",
      currency: "CNY",
      sourceUrl: `https://quote.eastmoney.com/sh${code}.html`,
    };
  }
  const prefix = code.startsWith("9") ? "bj" : "sz";
  return {
    secid: `0.${code}`,
    normalized: code,
    market: code.startsWith("9") ? "北交所" : "深市",
    currency: "CNY",
    sourceUrl: `https://quote.eastmoney.com/${prefix}${code}.html`,
  };
};

const requests = companies.map((company) => ({ company, ...marketInfo(company.code) }));
const rows = [];
for (let offset = 0; offset < requests.length; offset += 70) {
  const batch = requests.slice(offset, offset + 70);
  const url = new URL("https://push2.eastmoney.com/api/qt/ulist.np/get");
  url.searchParams.set("fltt", "2");
  url.searchParams.set("secids", batch.map((item) => item.secid).join(","));
  url.searchParams.set("fields", "f2,f3,f9,f12,f14,f20,f23,f124");
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "Mozilla/5.0",
    },
  });
  if (!response.ok) throw new Error(`行情接口请求失败：${response.status}`);
  const payload = await response.json();
  rows.push(...(payload?.data?.diff || []));
}

const byNormalizedCode = new Map(rows.map((row) => [String(row.f12), row]));
const formatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
const generatedAt = formatter.format(new Date()).replaceAll("/", "-");
const marketData = {};
for (const request of requests) {
  const row = byNormalizedCode.get(request.normalized);
  if (!row || typeof row.f2 !== "number" || row.f2 <= 0) continue;
  const updatedAt = typeof row.f124 === "number"
    ? formatter.format(new Date(row.f124 * 1000)).replaceAll("/", "-")
    : generatedAt;
  marketData[request.company.code] = {
    name: row.f14 || request.company.name,
    code: request.company.code,
    market: request.market,
    currency: request.currency,
    price: row.f2,
    changePercent: typeof row.f3 === "number" ? row.f3 : null,
    marketCap: typeof row.f20 === "number" ? row.f20 : null,
    pe: typeof row.f9 === "number" ? row.f9 : null,
    pb: typeof row.f23 === "number" ? row.f23 : null,
    totalShares: typeof row.f20 === "number" ? row.f20 / row.f2 : null,
    updatedAt,
    sourceName: "东方财富行情中心",
    sourceUrl: request.sourceUrl,
  };
}

const output = `// 此文件由 scripts/update-market-data.mjs 自动生成，请勿手工修改。\n` +
  `export const MARKET_DATA_GENERATED_AT = ${JSON.stringify(generatedAt)};\n` +
  `export const MARKET_DATA_COVERAGE = ${JSON.stringify({
    listedCodes: requests.length,
    updatedCodes: Object.keys(marketData).length,
    missingCodes: requests.filter((item) => !marketData[item.company.code]).map((item) => item.company.code),
  }, null, 2)};\n` +
  `export const marketData = ${JSON.stringify(marketData, null, 2)};\n`;

await writeFile(resolve(root, "app/marketData.js"), output, "utf8");
console.log(JSON.stringify({
  generatedAt,
  listedCodes: requests.length,
  updatedCodes: Object.keys(marketData).length,
  missingCodes: requests.filter((item) => !marketData[item.company.code]).map((item) => item.company.code),
}));
