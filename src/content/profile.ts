import { person } from "@/lib/publications";
import { todo, type Placeholder } from "@/lib/placeholder";

/*
 * Personal content for the site. Facts here come from the brief supplied by the
 * site owner; anything unknown is a todo(...) placeholder. Fill a placeholder by
 * passing its value as the third argument, e.g.
 *   email: todo("{{EMAIL}}", "Email address", "niloy@example.com"),
 */

export type ExternalLink = { label: string; href: string };

export type EducationEntry = {
  degree: string;
  institution: string;
  years: Placeholder;
  result: Placeholder;
  details: { label: string; value: Placeholder }[];
  note?: { title: string; body: string };
};

export const profile = {
  name: person.name,
  initials: "NB",
  role: "Chemistry researcher",
  tagline: "Computational chemist designing better medicines and cleaner energy materials, one molecule at a time.",
  department: "Department of Chemistry, Faculty of Science",
  institution: "University of Chittagong",
  country: "Bangladesh",
  affiliation: person.affiliation,

  /** Path under public/, e.g. "/images/niloy.webp" (square, ≥ 480 px). */
  photo: todo("{{PHOTO}}", "Headshot photo"),
  /** Path under public/, e.g. "/cv/niloy-bhattacharjee-cv.pdf". Optional: hidden until set. */
  cv: todo("{{CV_PDF}}", "CV (PDF)"),

  orcid: {
    id: person.orcid,
    href: `https://orcid.org/${person.orcid}`,
  },
  scopus: {
    id: person.scopusAuthorId,
    href: `https://www.scopus.com/authid/detail.uri?authorId=${person.scopusAuthorId}`,
  },

  email: todo("{{EMAIL}}", "Email address"),
  linkedin: todo("{{LINKEDIN}}", "LinkedIn profile URL"),
  googleScholar: todo("{{GOOGLE_SCHOLAR}}", "Google Scholar profile URL"),
  researchGate: todo("{{RESEARCHGATE}}", "ResearchGate profile URL"),

  /**
   * Copy these by hand from the Scopus author page. Do NOT use OpenAlex: it has
   * merged this ORCID with a different researcher of the same name.
   * Hidden until filled.
   */
  hIndex: todo<number>("{{H_INDEX}}", "h-index (Scopus)"),
  citations: todo<number>("{{CITATIONS}}", "Citations (Scopus)"),

  /** International collaborators' countries (from the brief and paper highlights). */
  collaboratingCountries: ["Japan", "Malaysia", "USA"],

  about: [
    "Niloy Bhattacharjee is a chemistry researcher in the Department of Chemistry at the University of Chittagong, Bangladesh. He found his way into research early, as an undergraduate during his BSc in Chemistry, and has kept at it ever since.",
    "He went on to an MSc in Chemistry at the same university and now works where computation meets chemistry: using density functional theory, molecular docking, molecular dynamics, and free-energy and ADMET analysis to work out which molecules are worth making, and why.",
    "He points those tools at two problems: safer anti-inflammatory drug candidates and new sugar-based antimicrobials on one side, and lead-free perovskite absorbers for solar cells on the other. Alongside the modelling he has hands-on synthesis experience at the bench, and he works with collaborators in Japan, Malaysia and the USA.",
  ],

  education: [
    {
      degree: "MSc in Chemistry",
      institution: "University of Chittagong",
      years: todo("{{MSC_YEARS}}", "MSc years", "2025 – 2026"),
      result: todo("{{MSC_RESULT}}", "MSc result"),
      details: [
        { label: "Thesis", value: todo("{{MSC_THESIS_TITLE}}", "MSc thesis title") },
        { label: "Supervisor", value: todo("{{SUPERVISOR}}", "Supervisor") },
      ],
    },
    {
      degree: "BSc in Chemistry",
      institution: "University of Chittagong",
      years: todo("{{BSC_YEARS}}", "BSc years", "2020 – 2025"),
      result: todo("{{BSC_RESULT}}", "BSc result"),
      details: [],
      note: {
        title: "Undergraduate research",
        body: "Began doing research while still an undergraduate, during his BSc.",
      },
    },
  ] satisfies EducationEntry[],
} as const;
