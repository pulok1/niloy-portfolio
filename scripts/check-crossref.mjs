// Review helper: asks Crossref for works linked to the ORCID iD and reports
//   1. DOIs that are NOT yet in publications.json, and
//   2. metadata differences (year, volume, issue, pages, authors) for DOIs that are.
// It only prints. It never edits publications.json: every new paper must be
// checked by a human before it is added.
//
// Do not replace this with OpenAlex: OpenAlex has merged this ORCID with a
// different researcher of the same name, so its works and metrics are wrong.
//
// Usage: npm run check:crossref
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../publications.json", import.meta.url), "utf8"));
const orcid = data.person.orcid;
const known = new Map(data.publications.map((p) => [p.doi.toLowerCase(), p]));
const UA = { "User-Agent": "niloy-portfolio-crossref-check/1.0" };

async function crossref(path) {
  const res = await fetch(`https://api.crossref.org${path}`, { headers: UA });
  if (!res.ok) throw new Error(`Crossref ${res.status} for ${path}`);
  return (await res.json()).message;
}

const yearOf = (w) => (w["published-print"] ?? w["published-online"] ?? w.issued)?.["date-parts"]?.[0]?.[0];

// 1. Works Crossref links to the ORCID iD (publishers deposit ORCIDs inconsistently,
//    so an empty result does not mean there are no papers).
const listed = await crossref(`/works?filter=orcid:${orcid}&rows=100&select=DOI,title,container-title,issued`);
const fresh = listed.items.filter((w) => !known.has(w.DOI.toLowerCase()));
console.log(`Crossref lists ${listed.items.length} work(s) for ORCID ${orcid}.`);
if (fresh.length) {
  console.log(`\nNEW DOIs not in publications.json (review before adding):`);
  for (const w of fresh) console.log(`  + ${w.DOI}  (${w.issued?.["date-parts"]?.[0]?.[0] ?? "?"}) ${w.title?.[0] ?? ""} — ${w["container-title"]?.[0] ?? ""}`);
} else {
  console.log("No new DOIs.");
}

// 2. Compare stored metadata with Crossref for each known DOI.
console.log("\nMetadata check for papers in publications.json:");
for (const [doi, pub] of known) {
  try {
    const w = await crossref(`/works/${encodeURIComponent(doi)}`);
    const diffs = [];
    const cmp = (field, ours, theirs) => {
      if (theirs !== undefined && String(ours ?? "") !== String(theirs)) diffs.push(`${field}: json=${ours ?? "—"} crossref=${theirs}`);
    };
    cmp("year", pub.year, yearOf(w));
    cmp("volume", pub.volume, w.volume);
    cmp("issue", pub.issue, w.issue);
    // Crossref stores article numbers (e.g. Elsevier) in "page".
    if (pub.pages || pub.articleNumber || w.page) cmp("pages", pub.pages ?? pub.articleNumber, w.page);
    const authors = (w.author ?? []).map((a) => [a.given, a.family].filter(Boolean).join(" "));
    if (authors.length && authors.length !== pub.authors.length) diffs.push(`authors: json lists ${pub.authors.length}, crossref lists ${authors.length}: ${authors.join("; ")}`);
    console.log(diffs.length ? `  ! ${doi}\n      ${diffs.join("\n      ")}` : `  ✓ ${doi}`);
  } catch (e) {
    console.log(`  ? ${doi}  ${e.message}`);
  }
}
console.log("\nNothing was changed. Update publications.json by hand after checking the publisher page.");
