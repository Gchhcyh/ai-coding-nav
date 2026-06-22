/**
 * Link Check Script for AI Coding Nav
 * Reads tools.json, checks all URLs with HTTP HEAD, outputs a report.
 * Uses only Node.js built-in http/https modules (no third-party deps).
 * Concurrency limit: 5, Timeout: 10s.
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const TOOLS_PATH = path.join(__dirname, "..", "data", "tools.json");
const FAILURES_PATH = path.join(__dirname, "..", "data", "link-failures.json");
const REPORT_PATH = path.join(__dirname, "..", "output", "link-check-report.md");

const CONCURRENCY = 5;
const TIMEOUT_MS = 10000;

const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf-8"));

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.request(
      url,
      { method: "HEAD", timeout: TIMEOUT_MS },
      (res) => {
        const status = res.statusCode;
        resolve({
          url,
          statusCode: status,
          ok: status >= 200 && status < 400,
          error: null,
        });
      }
    );
    req.on("timeout", () => {
      req.destroy();
      resolve({ url, statusCode: null, ok: false, error: "Timeout" });
    });
    req.on("error", (err) => {
      resolve({ url, statusCode: null, ok: false, error: err.message });
    });
    req.end();
  });
}

async function run() {
  console.log(`Checking ${tools.length} URLs (concurrency: ${CONCURRENCY})...\n`);

  const results = [];
  const entries = tools.map((t) => ({ slug: t.slug, name: t.name, url: t.url }));

  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map((e) => checkUrl(e.url)));
    for (let j = 0; j < batch.length; j++) {
      results.push({ ...batch[j], ...batchResults[j] });
    }
    // Small delay between batches to be respectful
    if (i + CONCURRENCY < entries.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  const failures = results.filter((r) => !r.ok);
  const failureSlugs = failures.map((r) => r.slug);

  // Write link-failures.json
  if (!fs.existsSync(path.dirname(FAILURES_PATH))) {
    fs.mkdirSync(path.dirname(FAILURES_PATH), { recursive: true });
  }
  fs.writeFileSync(FAILURES_PATH, JSON.stringify(failureSlugs, null, 2), "utf-8");

  // Write Markdown report
  if (!fs.existsSync(path.dirname(REPORT_PATH))) {
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  }

  const now = new Date().toISOString().split("T")[0];
  let report = `# Link Check Report\n\n`;
  report += `**Date**: ${now}  \n`;
  report += `**Total**: ${results.length} | **Passed**: ${results.length - failures.length} | **Failed**: ${failures.length}\n\n`;

  if (failures.length > 0) {
    report += `| # | Tool | URL | Status |\n`;
    report += `|---|------|-----|--------|\n`;
    failures.forEach((f, i) => {
      const status = f.statusCode ? f.statusCode : f.error;
      report += `| ${i + 1} | ${f.name} | ${f.url} | ${status} |\n`;
    });
  } else {
    report += `All ${results.length} links are reachable.\n`;
  }

  fs.writeFileSync(REPORT_PATH, report, "utf-8");

  console.log(`Passed: ${results.length - failures.length}, Failed: ${failures.length}`);
  if (failures.length > 0) {
    console.log("Failures:");
    failures.forEach((f) =>
      console.log(`  ${f.name} (${f.url}): ${f.statusCode || f.error}`)
    );
  }
  console.log(`\nReport: ${REPORT_PATH}`);
  console.log(`Failures list: ${FAILURES_PATH}`);

  // Always exit 0 so it doesn't block the build pipeline.
  // The report and link-failures.json are still generated.
  process.exit(0);
}

run().catch((err) => {
  console.error("Link check failed:", err);
  process.exit(1);
});
