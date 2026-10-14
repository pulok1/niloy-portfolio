// Visual check: full-page screenshots at phone, tablet and desktop widths.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
// Uses an installed Edge or Chrome (no browser download needed):
//   BROWSER_CHANNEL=chrome SCHEMES=light,dark node scripts/screenshots.mjs
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const outDir = process.argv[3] ?? "screenshots";
const widths = [375, 768, 1440];
const pages = ["/", "/research/slct-2025-cox2/"];
const schemes = (process.env.SCHEMES ?? "light").split(",");

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? "msedge" });
for (const scheme of schemes) {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    for (const path of pages) {
      await page.goto(base + path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const name = `${outDir}/${path === "/" ? "home" : path.split("/").filter(Boolean).pop()}-${width}-${scheme}.png`;
      await page.screenshot({ path: name, fullPage: true });
      console.log(`${name}  horizontal overflow: ${overflow}px`);
    }
    if (errors.length) console.log(`  console errors @${width}:`, errors);
    await ctx.close();
  }
}
await browser.close();
