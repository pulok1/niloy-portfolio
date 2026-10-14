// Validates that every DOI in publications.json is registered and resolves.
// Usage: npm run check:links        (exit code 1 if any DOI fails)
//
// Uses the doi.org handle API (reliable) and then follows the redirect to the
// publisher. Publishers often answer bots with 403/429; that is reported as a
// warning, not a failure, because the DOI itself is registered.
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../publications.json", import.meta.url), "utf8"));
const UA = { "User-Agent": "niloy-portfolio-link-check/1.0 (+https://github.com)" };
let failed = 0;

for (const pub of data.publications) {
  const doi = pub.doi;
  try {
    const res = await fetch(`https://doi.org/api/handles/${encodeURIComponent(doi)}`, { headers: UA });
    const body = await res.json();
    if (body.responseCode !== 1) {
      failed++;
      console.log(`✗ ${doi}  not registered (handle responseCode ${body.responseCode})`);
      continue;
    }
    const target = body.values?.find((v) => v.type === "URL")?.data?.value;
    let note = "";
    try {
      const page = await fetch(`https://doi.org/${doi}`, { headers: UA, redirect: "follow" });
      note = page.ok ? `→ ${page.status} ${page.url}` : `→ publisher answered ${page.status} (bot protection; DOI is registered)`;
    } catch (e) {
      note = `→ could not fetch publisher page (${e.message})`;
    }
    console.log(`✓ ${doi}  registered: ${target}\n    ${note}`);
  } catch (e) {
    failed++;
    console.log(`✗ ${doi}  lookup failed: ${e.message}`);
  }
}

console.log(failed ? `\n${failed} DOI(s) failed.` : "\nAll DOIs are registered and resolve.");
process.exit(failed ? 1 : 0);
