# Niloy Bhattacharjee: research portfolio

A personal research portfolio for Niloy Bhattacharjee (Department of Chemistry, University of Chittagong). It is a single-page site with anchored sections, plus one page per paper. The site is built with Next.js (static export), TypeScript and CSS Modules.

- **Content:** [`publications.json`](publications.json) is the single source of truth for papers. Personal details and copy are in [`src/content/`](src/content/).
- **Missing information:** listed in [TODO.md](TODO.md). It renders as clearly marked TODO badges and is never invented.
- **Deploying:** see [DEPLOYMENT.md](DEPLOYMENT.md) (GitHub Pages workflow included; Vercel also works).

## Quick start

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` (fails on type errors or invalid `publications.json`) |
| `npm start` | Serve `out/` locally |
| `npm run typecheck` / `npm run lint` / `npm test` | TypeScript, ESLint, Vitest unit tests |
| `npm run check:links` | Confirms every DOI is registered and resolves |
| `npm run check:crossref` | Lists DOIs Crossref links to his ORCID that are missing from the JSON, and any metadata differences. **It only prints.** |
| `node scripts/screenshots.mjs` | Full-page screenshots at 375, 768 and 1440 px against a running preview (uses installed Edge; set `BROWSER_CHANNEL=chrome` for Chrome) |

## Editing content

### Add or change a paper

Edit `publications.json`. Each entry is validated against a zod schema ([`src/lib/schema.ts`](src/lib/schema.ts)), so a typo fails the build with a clear message instead of shipping a broken page.

- `id`: URL slug for the paper page (`/research/<id>/`). Use lowercase letters, digits and dashes.
- `titleHtml` *(optional)*: the title with `<sub>`, `<sup>` or `<i>` for formulas, e.g. `K<sub>2</sub>LiGa(Cl/Br)<sub>6</sub>`. Other tags are stripped; no raw HTML reaches the page.
- `featured: true` gives the paper a large card. Its position comes from `featuredOrder` in [`src/content/research.ts`](src/content/research.ts). Optional headline numbers go in `featuredStats`; quote them from the paper's own highlights.
- `theme` must match one of the `researchAreas` themes, or the paper has no research card. A unit test checks this.
- `summary` should be plain language and must not be copied from the abstract.
- An author entry containing `VERIFY` (or starting with `et al.`) marks an incomplete list. The site shows "et al." plus a VERIFY badge.
- Every value in `methods` must appear in `methodGroups` (also enforced by a test).

His name is bolded automatically wherever it matches `person.name`. The publication count, journal count and first-author count in the metrics strip are all computed from the JSON.

### Personal details

Edit [`src/content/profile.ts`](src/content/profile.ts): tagline, About paragraphs, education, links and placeholders.

### Data-source rules

- **Do not use OpenAlex** for his works or metrics. It has merged his ORCID with a different researcher of the same name.
- ORCID and Scopus block scraping, so the site does not fetch from them. Copy the h-index and citation counts by hand.
- The Crossref script is for review only. Add new papers by hand after checking the publisher's page.

## Project structure

```
publications.json            Source of truth for papers
src/
  app/                       Routes: home, /research/[id], og.png, sitemap, robots, icon
  components/                UI components, each with a CSS Module
  content/                   Editable copy: profile.ts, research.ts
  lib/
    schema.ts                zod schema + types for publications.json
    publications.ts          Validated data (server only; fails the build if invalid)
    publication-helpers.ts   Pure helpers that are safe in client components
    citation.ts              APA 7 formatter
    rich-text.ts             Safe <sub>/<sup>/<i> parser; Unicode formulas for copied citations
    placeholder.ts           Typed TODO placeholders
    structured-data.ts       JSON-LD (Person, ScholarlyArticle)
    site.ts                  Env-driven URL / base-path helpers
scripts/                     Link check, Crossref review, screenshots
```

## Design notes

- **Palette:** deep navy with one teal accent. The hero is navy in both themes. Light and dark mode follow the system setting, with a toggle saved in `localStorage` and applied before first paint, so there is no flash.
- **Type:** Fraunces (serif headings) and Inter (body), self-hosted through `next/font`.
- **Motif:** a honeycomb lattice with a fused-ring "molecule", rendered as server-side SVG. It adds no JavaScript and only a few KB.
- **Accessibility:** skip link, landmarks, labelled sections, `aria-pressed` filter chips with a live result count, keyboard-operable mobile menu (Escape closes it and returns focus), visible focus rings, 44 px touch targets, and `prefers-reduced-motion` respected throughout.
- **Phones:** the publication list is in the static HTML, and filtering upgrades it after load. Copy citation falls back to `execCommand` in in-app browsers (WhatsApp, Messenger) that lack the async clipboard API. A 1200×630 `og.png` gives link previews.

## Verified (October 2026)

- `npm run build`: passes with no type errors. All 3 paper pages are prerendered.
- 15 unit tests and ESLint pass.
- Screenshots at 375, 768 and 1440 px in light and dark mode show no horizontal overflow and no console errors.
- Lighthouse (mobile, served with gzip as on Pages/Vercel): Performance 93–97, Accessibility 100, Best Practices 100, SEO 100, CLS 0.
- All three DOIs are registered and resolve (`npm run check:links`).
