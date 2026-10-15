import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const audits = [
  "audit-questions.mjs",
  "audit-result-catalog.mjs",
  "audit-diagnostic-routing.mjs",
  "audit-result-narrative.mjs",
  "audit-result-share.mjs",
  "audit-title-contract.mjs",
  "audit-primary-commitment.mjs",
  "audit-whole-profile.mjs",
  "audit-eskridge-dynamic.mjs",
  "audit-moral-consolidation.mjs",
  "audit-kavanaugh-retirement.mjs"
];
const results = [];

// Run every independent audit even when an earlier one fails. Each keeps its
// own assertions and exit status; the aggregate fails if any check did not pass.
for (const audit of audits) {
  console.log(`\n=== ${audit} ===`);
  const result = spawnSync(process.execPath, [path.join(here, audit)], {
    cwd: root,
    stdio: "inherit"
  });
  if (result.error) console.error(result.error.message);
  if (result.signal) console.error(`${audit} stopped by ${result.signal}`);
  results.push({ audit, passed: !result.error && result.status === 0 });
}

console.log("\n=== Audit summary ===");
for (const { audit, passed } of results) {
  console.log(`${passed ? "PASS" : "FAIL"}: ${audit}`);
}
process.exitCode = results.every(({ passed }) => passed) ? 0 : 1;
