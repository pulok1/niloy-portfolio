import { describe, expect, it } from "vitest";
import raw from "@data/publications.json";
import { apaName, formatApa } from "./citation";
import {
  awards,
  confirmedMethods,
  dateLabel,
  getPublication,
  hasIncompleteAuthors,
  isFirstAuthor,
  isMethodNote,
  isSelf,
  parseDataFile,
  publications,
  sortByDateDesc,
  sourceLine,
  themeSlug,
  type Publication,
} from "./publications";
import { parseRichText, richTextToPlain } from "./rich-text";
import { MONTHS } from "./schema";
import { featuredOrder, featuredStats, methodGroups, researchAreas } from "@/content/research";

const pub = (id: string) => {
  const p = getPublication(id);
  if (!p) throw new Error(`missing ${id}`);
  return p;
};

describe("publications.json", () => {
  it("passes schema validation", () => {
    expect(() => parseDataFile(raw)).not.toThrow();
  });

  it("rejects malformed DOIs, duplicate ids and chapters without a book", () => {
    const bad = structuredClone(raw) as { publications: { doi: string; id: string }[] };
    bad.publications[0]!.doi = "TODO: find it";
    expect(() => parseDataFile(bad)).toThrow(/DOI/);
    const dup = structuredClone(raw) as { publications: { id: string }[] };
    dup.publications[1]!.id = dup.publications[0]!.id;
    expect(() => parseDataFile(dup)).toThrow(/duplicate/);
    const chapter = structuredClone(raw) as { publications: { id: string; bookTitle?: string }[] };
    delete chapter.publications.find((p) => p.id === "chapter-2025-uridine")!.bookTitle;
    expect(() => parseDataFile(chapter)).toThrow(/bookTitle/);
  });

  it("is sorted newest first by year then month, stable on ties", () => {
    const key = (p: Publication) => p.year * 12 + (p.month ? MONTHS.indexOf(p.month) : -1);
    const keys = publications.map(key);
    expect(keys).toEqual([...keys].sort((a, b) => b - a));
    const base = pub("slct-2025-cox2");
    const sorted = sortByDateDesc([
      { ...base, id: "a", year: 2026, month: "Jan" },
      { ...base, id: "b", year: 2026, month: "Jun" },
      { ...base, id: "c", year: 2024, month: undefined },
      { ...base, id: "d", year: 2026, month: "Jan" },
    ]);
    expect(sorted.map((p) => p.id)).toEqual(["b", "a", "d", "c"]);
  });

  it("names him in every author list", () => {
    for (const p of publications) expect(p.authors.some(isSelf)).toBe(true);
  });

  it("knows which papers are first-author", () => {
    expect(publications.filter(isFirstAuthor).map((p) => p.id).sort()).toEqual(["slct-2025-cox2", "slct-2026-denv2"]);
  });

  it("loads awards with unconfirmed years kept as TODO notes", () => {
    expect(awards[0]?.year).toMatch(/^TODO/);
  });
});

describe("content config matches the data", () => {
  it("every theme belongs to exactly one research area", () => {
    for (const theme of new Set(publications.map((p) => p.theme))) {
      expect(researchAreas.filter((a) => a.themes.includes(theme))).toHaveLength(1);
    }
  });

  it("every research-area theme exists in the data", () => {
    const themes = new Set(publications.map((p) => p.theme));
    for (const t of researchAreas.flatMap((a) => a.themes)) expect(themes).toContain(t);
  });

  it("featured order and stats reference featured papers", () => {
    const featured = publications.filter((p) => p.featured).map((p) => p.id);
    expect([...featuredOrder].sort()).toEqual([...featured].sort());
    for (const id of Object.keys(featuredStats)) expect(featured).toContain(id);
  });

  it("every confirmed method used in a paper appears in a method group", () => {
    const listed = new Set(methodGroups.flatMap((g) => g.items.flatMap((i) => i.match)));
    for (const m of publications.flatMap(confirmedMethods)) expect(listed).toContain(m);
  });

  it("treats VERIFY method entries as notes", () => {
    expect(isMethodNote("In silico analysis — VERIFY")).toBe(true);
    expect(confirmedMethods(pub("chapter-2025-uridine"))).toEqual(["Nucleoside chemistry"]);
  });
});

describe("rich text", () => {
  it("keeps sub/sup/i and drops other tags", () => {
    expect(parseRichText("K<sub>2</sub>LiGa<script>x</script>")).toEqual([
      { text: "K" },
      { text: "2", tag: "sub" },
      { text: "LiGax" },
    ]);
  });

  it("converts formulas to Unicode for plain text", () => {
    expect(richTextToPlain("K<sub>2</sub>LiGa(Cl/Br)<sub>6</sub>")).toBe("K₂LiGa(Cl/Br)₆");
  });
});

describe("APA citations", () => {
  it("formats names with initials", () => {
    expect(apaName("Niloy Bhattacharjee")).toBe("Bhattacharjee, N.");
    expect(apaName("Sarkar M.A. Kawsar")).toBe("Kawsar, S. M. A.");
    expect(apaName("Md. Atikur Rahman")).toBe("Rahman, M. A.");
    expect(apaName("Prinsa")).toBe("Prinsa");
  });

  it("formats a journal reference with pages and a Unicode formula", () => {
    expect(formatApa(pub("ma-2026-perovskite"))).toBe(
      "Shakil, J. A., Saikat, S. P., Bhattacharjee, N., Rahman, M. A., Bhowmik, S., Khandaker, M. U., Uddin, J., & Chowdhury, F. I. (2026). " +
        "Toward efficient and sustainable perovskite solar cells: a combined first-principles and device simulation study of K₂LiGa(Cl/Br)₆ for photovoltaic performance optimization. " +
        "Materials Advances, 7(14), 7084–7105. https://doi.org/10.1039/d6ma00207b",
    );
  });

  it("formats a book chapter", () => {
    expect(formatApa(pub("chapter-2025-uridine"))).toBe(
      "Kawsar, S. M. A., Shammo, S. M. S. H., Labib, M. F., Sajal, J. I., Islam, A., Tabassum, T., Barua, A., Bhattacharjee, N., Hossain, M. R., & Islam, N. (2025). " +
        "Uridine Derivatives as Potential Human Gene Protein Inhibitors. In Chemistry and Biochemistry: Research Progress Vol. 8 (pp. 102–122). BP International. " +
        "https://doi.org/10.9734/bpi/cbrp/v8/6586",
    );
  });

  it("uses an article number when there are no pages", () => {
    expect(formatApa(pub("nxmate-2026-mannopyranoside"))).toContain("Next Materials, 13, 103749.");
  });

  it("marks gaps in author lists: middle gap → '. . .', trailing → 'et al.'", () => {
    const base = pub("slct-2025-cox2");
    const middle = { ...base, authors: ["Niloy Bhattacharjee", "Jubaer Ahmod Shakil", "... VERIFY middle authors", "Sarkar M.A. Kawsar"] };
    expect(hasIncompleteAuthors(middle)).toBe(true);
    expect(formatApa(middle)).toMatch(/^Bhattacharjee, N\., Shakil, J\. A\., \. \. \. Kawsar, S\. M\. A\. \(2025\)/);
    const trailing = { ...base, authors: ["Niloy Bhattacharjee", "et al. — VERIFY"] };
    expect(formatApa(trailing)).toMatch(/^Bhattacharjee, N\., et al\. \(2025\)/);
  });

  it("builds short source and date lines", () => {
    expect(sourceLine(pub("slct-2025-cox2"))).toBe("ChemistrySelect 10(30)");
    expect(sourceLine(pub("chapter-2025-uridine"))).toBe("In: Chemistry and Biochemistry: Research Progress Vol. 8, pp. 102–122");
    expect(dateLabel(pub("slct-2025-cox2"))).toBe("Aug 2025");
  });
});

describe("themeSlug", () => {
  it("makes URL-safe slugs", () => {
    expect(themeSlug("Anti-inflammatory drug design")).toBe("anti-inflammatory-drug-design");
  });
});
