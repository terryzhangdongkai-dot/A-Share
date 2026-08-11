import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chainAtlasSectors } from "../app/chainAtlasData.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const begin = process.argv[2] || "20260729";
const end = process.argv[3] || new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date()).replaceAll("-", "");

const marketInfo = (code) => {
  if (code.length < 6) return `116.${code.padStart(5, "0")}`;
  return `${code.startsWith("6") ? "1" : "0"}.${code}`;
};

const companies = [...new Map(chainAtlasSectors
  .flatMap((sector) => sector.companies)
  .filter((company) => company.code)
  .map((company) => [company.code, company])).values()];

async function fetchHistory(company) {
  const url = new URL("https://push2his.eastmoney.com/api/qt/stock/kline/get");
  url.searchParams.set("secid", marketInfo(company.code));
  url.searchParams.set("fields1", "f1,f2,f3,f4,f5,f6");
  url.searchParams.set("fields2", "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61");
  url.searchParams.set("klt", "101");
  url.searchParams.set("fqt", "1");
  url.searchParams.set("beg", begin);
  url.searchParams.set("end", end);
  const response = await fetch(url, { headers: { accept: "application/json", "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${company.code}: ${response.status}`);
  const payload = await response.json();
  const days = {};
  for (const line of payload?.data?.klines || []) {
    const [date, open, close, high, low, volume, amount, amplitude, changePercent, change, turnover] = line.split(",");
    days[date] = {
      open: Number(open), close: Number(close), high: Number(high), low: Number(low),
      amount: Number(amount), changePercent: Number(changePercent), turnover: Number(turnover),
    };
  }
  return [company.code, days];
}

const histories = {};
for (let offset = 0; offset < companies.length; offset += 16) {
  const batch = companies.slice(offset, offset + 16);
  const results = await Promise.allSettled(batch.map(fetchHistory));
  for (const result of results) if (result.status === "fulfilled") histories[result.value[0]] = result.value[1];
}

const dates = [...new Set(Object.values(histories).flatMap((history) => Object.keys(history)))].sort();
const round = (value) => Math.round(value * 100) / 100;
const sectorDays = {};
for (const sector of chainAtlasSectors) {
  sectorDays[sector.name] = {};
  for (const date of dates) {
    const rows = sector.companies.map((company) => histories[company.code]?.[date]).filter(Boolean);
    if (!rows.length) continue;
    sectorDays[sector.name][date] = {
      averageChange: round(rows.reduce((sum, row) => sum + row.changePercent, 0) / rows.length),
      rising: rows.filter((row) => row.changePercent > 0).length,
      falling: rows.filter((row) => row.changePercent < 0).length,
      flat: rows.filter((row) => row.changePercent === 0).length,
      coverage: rows.length,
      amount: Math.round(rows.reduce((sum, row) => sum + row.amount, 0)),
    };
  }
}

const dailyMarketArchive = dates.map((date) => {
  const sectorRows = chainAtlasSectors.map((sector) => ({ sector: sector.name, ...sectorDays[sector.name]?.[date] })).filter((row) => row.coverage);
  const companyRows = companies.map((company) => histories[company.code]?.[date]).filter(Boolean);
  const sorted = [...sectorRows].sort((a, b) => b.averageChange - a.averageChange);
  return {
    date,
    averageChange: round(companyRows.reduce((sum, row) => sum + row.changePercent, 0) / companyRows.length),
    rising: companyRows.filter((row) => row.changePercent > 0).length,
    falling: companyRows.filter((row) => row.changePercent < 0).length,
    flat: companyRows.filter((row) => row.changePercent === 0).length,
    coverage: companyRows.length,
    leaders: sorted.slice(0, 5),
    laggards: sorted.slice(-5).reverse(),
  };
});

const generatedAt = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
}).format(new Date()).replaceAll("/", "-");
const output = `// 此文件由 scripts/update-market-history.mjs 自动生成，请勿手工修改。\n` +
  `export const MARKET_HISTORY_GENERATED_AT = ${JSON.stringify(generatedAt)};\n` +
  `export const dailyMarketArchive = ${JSON.stringify(dailyMarketArchive, null, 2)};\n` +
  `export const sectorMarketHistory = ${JSON.stringify(sectorDays, null, 2)};\n`;
await writeFile(resolve(root, "app/marketHistoryData.js"), output, "utf8");
console.log(JSON.stringify({ begin, end, dates, companies: companies.length, covered: Object.keys(histories).length }));
