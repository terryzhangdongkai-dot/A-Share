import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chainAtlasUpdates } from "../app/chainAtlasData.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
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

const results = await Promise.all(chainAtlasUpdates.map(async (item) => {
  try {
    const response = await fetch(item.source, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "Mozilla/5.0",
      },
    });
    const body = await response.text();
    const hash = createHash("sha1").update(body).digest("hex");
    return {
      source: item.source,
      ok: response.ok,
      httpStatus: response.status,
      checkedAt: generatedAt,
      lastModified: response.headers.get("last-modified") || "",
      hash,
      changedSincePreviousCheck: Boolean(item.hash) && item.hash !== hash,
    };
  } catch (error) {
    return {
      source: item.source,
      ok: false,
      httpStatus: 0,
      checkedAt: generatedAt,
      lastModified: "",
      hash: item.hash,
      changedSincePreviousCheck: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}));

const monitorData = Object.fromEntries(results.map((item) => [item.source, item]));
const output = `// 此文件由 scripts/update-source-monitor.mjs 自动生成，请勿手工修改。\n` +
  `export const SOURCE_MONITOR_GENERATED_AT = ${JSON.stringify(generatedAt)};\n` +
  `export const sourceMonitorData = ${JSON.stringify(monitorData, null, 2)};\n`;
await writeFile(resolve(root, "app/sourceMonitorData.js"), output, "utf8");
console.log(JSON.stringify({
  generatedAt,
  total: results.length,
  ok: results.filter((item) => item.ok).length,
  failed: results.filter((item) => !item.ok).map((item) => ({ source: item.source, status: item.httpStatus, error: item.error })),
  changed: results.filter((item) => item.changedSincePreviousCheck).map((item) => item.source),
}));
