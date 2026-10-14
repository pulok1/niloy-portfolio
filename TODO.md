# TODO: information to fill in

Everything below shows on the site as a dashed amber **TODO** badge until you fill it in. Nothing has been guessed.
To hide unfilled badges without filling them, build with `NEXT_PUBLIC_HIDE_PLACEHOLDERS=true`. Optional items are hidden automatically.

## How to fill a placeholder

Open [`src/content/profile.ts`](src/content/profile.ts) and pass the value as the third argument of `todo(...)`:

```ts
email: todo("{{EMAIL}}", "Email address", "niloy@example.com"),
```

Files such as the photo and CV go in `public/`, and the value is their path (e.g. `"/images/niloy.webp"`).

## Personal details (`src/content/profile.ts`)

| Token | What to provide | Notes |
| --- | --- | --- |
| ~~`{{PHOTO}}`~~ | ✅ Filled: `public/images/niloy-bhattacharjee.webp` | 560×647 WebP, 18 KB, cropped for the hexagon frame. |
| ~~`{{BSC_YEARS}}`~~ | ✅ Filled: `"2020 – 2025"` | Education timeline |
| `{{BSC_RESULT}}` | e.g. CGPA / class | Education timeline |
| ~~`{{MSC_YEARS}}`~~ | ✅ Filled: `"2025 – 2026"` | Education timeline |
| `{{MSC_RESULT}}` | e.g. CGPA / class | Education timeline |
| `{{MSC_THESIS_TITLE}}` | Exact thesis title | Education timeline |
| `{{SUPERVISOR}}` | Supervisor's name and title | Education timeline. The DENV2 paper's highlights call its co-author, Sarkar M.A. Kawsar, "his supervisor". Confirm he was the MSc supervisor before filling this in. |
| `{{EMAIL}}` | Email address | Contact section and JSON-LD |
| ~~`{{LINKEDIN}}`~~ | ✅ Filled from `publications.json` → `person.linkedIn` | Contact section and JSON-LD `sameAs` |
| `{{GOOGLE_SCHOLAR}}` | Full profile URL | Contact section and JSON-LD `sameAs` |
| ~~`{{RESEARCHGATE}}`~~ | ✅ Filled from `publications.json` → `person.researchGate` | Contact section and JSON-LD `sameAs` |
| `{{CV_PDF}}` *(optional)* | e.g. `public/cv/niloy-bhattacharjee-cv.pdf` → `"/cv/niloy-bhattacharjee-cv.pdf"` | Hidden until set, then a "Download CV" button appears under Contact. |
| `{{H_INDEX}}` *(optional)* | Number, copied by hand from the [Scopus author page](https://www.scopus.com/authid/detail.uri?authorId=59321448600) | Hidden until set. **Do not take it from OpenAlex**, which has merged his ORCID with a different Niloy Bhattacharjee (Jadavpur University). |
| `{{CITATIONS}}` *(optional)* | Number, from Scopus as above | Until set, the metrics strip shows the ResearchGate citation count from `person.stats`. Same OpenAlex warning. |

## Publication data (`publications.json`)

### Resolved from Crossref (14 Oct 2026)

These gaps in the ResearchGate data were filled from Crossref, the publishers' DOI registry, using exact title and author matches. `npm run check:crossref` now reports every paper as matching.

- ChemistrySelect COX-2 paper: full 7-author list, and issue **30** (not 5), which matches the Aug 2025 date.
- ChemistrySelect DENV2 paper: DOI `10.1002/slct.202506021`, volume 11, issue 2.
- Uridine book chapter: DOI `10.9734/bpi/cbrp/v8/6586`, book *Chemistry and Biochemistry: Research Progress Vol. 8* (BP International), pp. 102–122, and the full 10-author list (Niloy is 8th).
- CUJS SARS-CoV-2 paper: the missing author, Jannatul Ferdous, and pp. 137–163.

### Still to confirm

- [ ] **The 8th publication.** ResearchGate counts 8, but only 7 are public. Ask Niloy or check Scopus; then add it to `publications.json` with a real DOI.
- [ ] **Award year.** *Best Poster Presentation Award*, 1st International Conference on Science and Humanities for Sustainable Development. Replace `"TODO: confirm year"` in `awards`.
- [ ] **Uridine chapter methods.** `"In silico analysis — VERIFY"` shows as a TODO badge on that paper's page. Replace it with the actual methods (e.g. "Molecular docking") or remove it.
- [ ] **ResearchGate counters** (`person.stats`: 33 citations, 1,627 reads, checked 14 Oct 2026). These were copied by hand and show in the metrics strip. Refresh them just before sharing the link.
- [ ] **Confirm FMO and MEP.** The Methods section lists them under Quantum chemistry with a "TODO: confirm" badge, because they are not in any paper's `methods` array. If his papers include frontier-molecular-orbital and electrostatic-potential analyses, add them to those papers' `methods` in `publications.json` and set `match: ["FMO"]` / `match: ["MEP"]` in [`src/content/research.ts`](src/content/research.ts). If not, delete the two lines.
- [ ] **Confirm software names** (DFT package, docking and MD codes). Only SCAPS-1D is named in the data. The Methods section shows "TODO: confirm software names". Add confirmed names to the relevant papers' `methods` and to `methodGroups` in `src/content/research.ts`, or remove the note in `src/components/Methods.tsx`.

## Before sharing the link

- [ ] Fill in at least the email and education results, or build with `NEXT_PUBLIC_HIDE_PLACEHOLDERS=true`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real URL so link previews in WhatsApp and Messenger show the right image (see [DEPLOYMENT.md](DEPLOYMENT.md)).
- [ ] Optionally adjust the tagline and the About text in `src/content/profile.ts`. Both were written from the brief.
