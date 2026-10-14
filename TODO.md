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
| `{{SUPERVISOR}}` | Supervisor's name and title | Education timeline |
| `{{EMAIL}}` | Email address | Contact section and JSON-LD |
| `{{LINKEDIN}}` | Full profile URL | Contact section and JSON-LD `sameAs` |
| `{{GOOGLE_SCHOLAR}}` | Full profile URL | Contact section and JSON-LD `sameAs` |
| `{{RESEARCHGATE}}` | Full profile URL | Contact section and JSON-LD `sameAs` |
| `{{CV_PDF}}` *(optional)* | e.g. `public/cv/niloy-bhattacharjee-cv.pdf` → `"/cv/niloy-bhattacharjee-cv.pdf"` | Hidden until set, then a "Download CV" button appears under Contact. |
| `{{H_INDEX}}` *(optional)* | Number, copied by hand from the [Scopus author page](https://www.scopus.com/authid/detail.uri?authorId=59321448600) | Hidden until set. **Do not take it from OpenAlex**, which has merged his ORCID with a different Niloy Bhattacharjee (Jadavpur University). |
| `{{CITATIONS}}` *(optional)* | Number, from Scopus as above | Hidden until set. Same OpenAlex warning. |

## Publication data (`publications.json`)

These come from `npm run check:crossref`, which compares the JSON with Crossref. **Check each one on the publisher's page before changing anything.**

- [ ] **VERIFY the full author list of the ChemistrySelect paper** ([10.1002/slct.202502470](https://doi.org/10.1002/slct.202502470)).
  The JSON lists 3 names plus "et al.", and the site shows "et al." with a VERIFY badge. Crossref lists 7 authors:
  Niloy Bhattacharjee; Jubaer Ahmod Shakil; Shassatha Paul Saikat; Md. Rithoan Hossain; Prinsa; Supriyo Saha; Sarkar M. A. Kawsar.
  Once you have confirmed it on the article page, replace the `authors` array (and drop the "et al. — VERIFY…" entry). The badge disappears and the APA citation becomes complete.
- [ ] **Check the ChemistrySelect issue number.** The JSON says issue `5`; Crossref says issue `30`. The site currently shows "10(5)".
- [ ] **Confirm FMO and MEP.** The Methods section lists them under Quantum chemistry with a "TODO: confirm" badge, because they are not in any paper's `methods` array. If his papers include frontier-molecular-orbital and electrostatic-potential analyses, add them to those papers' `methods` in `publications.json` and set `match: "FMO"` / `match: "MEP"` in [`src/content/research.ts`](src/content/research.ts). If not, delete the two lines.
- [ ] **Confirm software names** (DFT package, docking and MD codes). Only SCAPS-1D is named in the data. The Methods section shows "TODO: confirm software names". Add confirmed names to the relevant papers' `methods` and to `methodGroups` in `src/content/research.ts`, or remove the note in `src/components/Methods.tsx`.

## Before sharing the link

- [ ] Fill in at least the photo, email and education details, or build with `NEXT_PUBLIC_HIDE_PLACEHOLDERS=true`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real URL so link previews in WhatsApp and Messenger show the right image (see [DEPLOYMENT.md](DEPLOYMENT.md)).
- [ ] Optionally adjust the tagline and the About text in `src/content/profile.ts`. Both were written from the brief.
