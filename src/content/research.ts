/*
 * Presentation content for the research sections. Everything here is derived
 * from publications.json; paper facts themselves are never duplicated except
 * as display stats, which quote the JSON highlights and summaries verbatim.
 */

export type ResearchArea = {
  id: string;
  title: string;
  /** Must equal a `theme` value in publications.json. */
  theme: string;
  question: string;
  description: string;
  icon: "capsule" | "sugar" | "sun";
};

export const researchAreas: ResearchArea[] = [
  {
    id: "drug-design",
    title: "Drug design",
    theme: "Drug design",
    question: "Can a familiar painkiller be made safer?",
    description:
      "Redesigning ibuprofen without the carboxylic acid group linked to its side effects, then screening the new candidates against COX-2 with DFT, docking, molecular dynamics and ADMET.",
    icon: "capsule",
  },
  {
    id: "antimicrobials",
    title: "Antimicrobials",
    theme: "Antimicrobial agents",
    question: "Can sugars become new antimicrobial agents?",
    description:
      "Making mannopyranoside (sugar-based) derivatives in the lab, testing them against bacterial and fungal pathogens, and explaining their activity with DFT, docking and dynamics.",
    icon: "sugar",
  },
  {
    id: "solar-materials",
    title: "Solar materials",
    theme: "Materials for clean energy",
    question: "Can solar cells do without lead?",
    description:
      "Evaluating lead-free double halide perovskites as solar-cell absorbers, from first-principles calculations through to SCAPS-1D device simulation.",
    icon: "sun",
  },
];

/** Order of the featured cards. The first one is shown largest. */
export const featuredOrder = ["slct-2025-cox2", "ma-2026-perovskite"];

export type Stat = { value: string; unit?: string; label: string };

/** Headline numbers for featured cards, quoted from each paper's summary/highlights. */
export const featuredStats: Record<string, Stat[]> = {
  "slct-2025-cox2": [
    { value: "14", label: "ibuprofen derivatives designed" },
    { value: "−9.0", unit: "kcal/mol", label: "docking score of the best derivative, I7 (ibuprofen: −7.3)" },
    { value: "−78.02", unit: "kJ/mol", label: "I7–COX-2 binding free energy (MMPBSA)" },
  ],
  "ma-2026-perovskite": [
    { value: "2", label: "lead-free double halide perovskites evaluated" },
    { value: "3", label: "countries in the collaboration (Bangladesh, Malaysia, USA)" },
  ],
};

export type MethodItem = {
  label: string;
  abbr?: string;
  /** Exact string used in publications.json `methods`, or null if not yet confirmed from a paper. */
  match: string | null;
};

export type MethodGroup = { title: string; items: MethodItem[] };

/*
 * Only methods that appear in his papers are listed as confirmed. FMO and MEP
 * analyses are not recorded in publications.json yet, so they show as
 * "TODO: confirm" until checked against the papers.
 */
export const methodGroups: MethodGroup[] = [
  {
    title: "Quantum chemistry",
    items: [
      { label: "Density functional theory", abbr: "DFT", match: "DFT" },
      { label: "Frontier molecular orbitals", abbr: "FMO", match: null },
      { label: "Molecular electrostatic potential", abbr: "MEP", match: null },
    ],
  },
  {
    title: "Simulation",
    items: [
      { label: "Molecular docking", match: "Molecular docking" },
      { label: "Molecular dynamics", abbr: "MD", match: "Molecular dynamics" },
      { label: "MM/PBSA binding free energy", abbr: "MMPBSA", match: "MMPBSA" },
      { label: "Free energy landscape", abbr: "FEL", match: "Free energy landscape" },
    ],
  },
  {
    title: "Drug-likeness",
    items: [{ label: "ADMET prediction", abbr: "ADMET", match: "ADMET" }],
  },
  {
    title: "Device simulation",
    items: [{ label: "SCAPS-1D solar cell simulation", abbr: "SCAPS-1D", match: "SCAPS-1D device simulation" }],
  },
  {
    title: "Lab",
    items: [
      { label: "Organic synthesis", match: "Organic synthesis" },
      { label: "Antimicrobial assays", match: "Antimicrobial assays" },
    ],
  },
];
