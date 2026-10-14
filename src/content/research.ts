/*
 * Presentation content for the research sections. Everything here is derived
 * from publications.json; paper facts themselves are never duplicated except
 * as display stats, which quote the JSON highlights and summaries.
 */

export type ResearchArea = {
  id: string;
  title: string;
  /** Each must equal a `theme` value in publications.json. */
  themes: string[];
  question: string;
  description: string;
  icon: "capsule" | "sugar" | "sun";
};

export const researchAreas: ResearchArea[] = [
  {
    id: "drug-design",
    title: "Drug design",
    themes: ["Anti-inflammatory drug design", "Cancer therapy support"],
    question: "Can familiar medicines be made safer?",
    description:
      "Redesigning ibuprofen without the carboxylic acid group linked to its side effects and screening the new candidates against COX-2, and exploring uridine derivatives aimed at reducing the toxicity of the cancer drug 5-fluorouracil.",
    icon: "capsule",
  },
  {
    id: "anti-infectives",
    title: "Antimicrobials & antivirals",
    themes: ["Antimicrobials", "Antivirals"],
    question: "Can sugars help fight infection?",
    description:
      "Sugar-based (mannopyranoside and glucopyranoside) derivatives, made in the lab or studied in silico, against bacterial and fungal pathogens, drug-resistant E. coli, and the replication enzymes of dengue virus and SARS-CoV-2.",
    icon: "sugar",
  },
  {
    id: "solar-materials",
    title: "Solar materials",
    themes: ["Solar energy materials"],
    question: "Can solar cells be cleaner and more efficient?",
    description:
      "From lead-free double halide perovskite absorbers (DFT with SCAPS-1D device simulation) to new triphenylamine-based dyes for dye-sensitised solar cells (DFT/TD-DFT).",
    icon: "sun",
  },
];

/** Order of the featured cards. The first one is shown largest. */
export const featuredOrder = ["slct-2025-cox2", "slct-2026-denv2", "ma-2026-perovskite"];

export type Stat = { value: string; unit?: string; label: string };

/** Headline numbers for featured cards, quoted from each paper's summary/highlights. */
export const featuredStats: Record<string, Stat[]> = {
  "slct-2025-cox2": [
    { value: "14", label: "ibuprofen derivatives designed" },
    { value: "−9.0", unit: "kcal/mol", label: "docking score of the best derivative, I7 (ibuprofen: −7.3)" },
    { value: "−78.02", unit: "kJ/mol", label: "I7–COX-2 binding free energy (MMPBSA)" },
  ],
  "slct-2026-denv2": [
    { value: "2", label: "targets in one study: dengue virus (DENV2) RdRp and E. coli DNA GyrB" },
  ],
  "ma-2026-perovskite": [
    { value: "2", label: "lead-free double halide perovskites evaluated" },
    { value: "3", label: "countries in the collaboration (Bangladesh, Malaysia, USA)" },
  ],
};

export type MethodItem = {
  label: string;
  abbr?: string;
  /** Exact strings used in publications.json `methods`; empty if not yet confirmed from a paper. */
  match: string[];
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
      { label: "Density functional theory", abbr: "DFT", match: ["DFT"] },
      { label: "Time-dependent DFT", abbr: "TD-DFT", match: ["TD-DFT"] },
      { label: "Frontier molecular orbitals", abbr: "FMO", match: [] },
      { label: "Molecular electrostatic potential", abbr: "MEP", match: [] },
    ],
  },
  {
    title: "Simulation",
    items: [
      { label: "Molecular docking", match: ["Molecular docking"] },
      { label: "Molecular dynamics", abbr: "MD", match: ["Molecular dynamics"] },
      { label: "MM/PBSA binding free energy", abbr: "MMPBSA", match: ["MMPBSA"] },
      { label: "Free energy landscape", abbr: "FEL", match: ["Free energy landscape"] },
    ],
  },
  {
    title: "Drug-likeness",
    items: [{ label: "ADMET and pharmacokinetic prediction", abbr: "ADMET", match: ["ADMET", "ADMET / pharmacokinetics"] }],
  },
  {
    title: "Device simulation",
    items: [{ label: "SCAPS-1D solar cell simulation", abbr: "SCAPS-1D", match: ["SCAPS-1D device simulation"] }],
  },
  {
    title: "Lab & synthesis",
    items: [
      { label: "Organic synthesis", match: ["Organic synthesis"] },
      { label: "Nucleoside chemistry", match: ["Nucleoside chemistry"] },
      { label: "Antimicrobial assays", match: ["Antimicrobial assays"] },
    ],
  },
];
