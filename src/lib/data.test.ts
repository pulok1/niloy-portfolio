import { describe, expect, it } from "vitest";
import raw from "@data/publications.json";
import { apaName, formatApa } from "./citation";
import {
  getPublication,
  hasIncompleteAuthors,
  isFirstAuthor,
  isSelf,
  namedAuthors,
  parseDataFile,
  publications,
  sortByYearDesc,
  sourceLine,
  themeSlug,
} from "./publications";
import { parseRichText, richTextToPlain } from "./rich-text";
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

  it("rejects malformed DOIs and duplicate ids", () => {
    const bad = structuredClone(raw) as { publications: { doi: string; id: string }[] };
    bad.publications[0]!.doi = "not-a-doi";
    expect(() => parseDataFile(bad)).toThrow(/DOI/);
    const dup = structuredClone(raw) as { publications: { id: string }[] };
    dup.publications[1]!.id = dup.publications[0]!.id;
    expect(() => parseDataFile(dup)).toThrow(/duplicate/);
  });

  it("is sorted newest first, stable within a year", () => {
    const years = publications.map((p) => p.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    const sorted = sortByYearDesc([
      { ...pub("slct-2025-cox2"), id: "a", year: 2026 },
      { ...pub("slct-2025-cox2"), id: "b", year: 2024 },
      { ...pub("slct-2025-cox2"), id: "c", year: 2026 },
    ]);
    expect(sorted.map((p) => p.id)).toEqual(["a", "c", "b"]);
  });

  it("names him in every author list", () => {
    for (const p of publications) expect(p.authors.some(isSelf)).toBe(true);
  });

  it("keeps the incomplete ChemistrySelect author list flagged", () => {
    const p = pub("slct-2025-cox2");
    expect(hasIncompleteAuthors(p)).toBe(true);
    expect(namedAuthors(p)).toHaveLength(3);
    expect(isFirstAuthor(p)).toBe(true);
    expect(isFirstAuthor(pub("ma-2026-perovskite"))).toBe(false);
  });
});

describe("content config matches the data", () => {
  it("every research area points at an existing theme", () => {
    const themes = new Set(publications.map((p) => p.theme));
    for (const area of researchAreas) expect(themes).toContain(area.theme);
  });

  it("featured order and stats reference featured papers", () => {
    const featured = publications.filter((p) => p.featured).map((p) => p.id);
    expect([...featuredOrder].sort()).toEqual([...featured].sort());
    for (const id of Object.keys(featuredStats)) expect(featured).toContain(id);
  });

  it("every method used in a paper appears in a method group", () => {
    const listed = new Set(methodGroups.flatMap((g) => g.items.map((i) => i.match)));
    for (const m of publications.flatMap((p) => p.methods)) expect(listed).toContain(m);
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
    expect(apaName("Jubaer Ahmod Shakil")).toBe("Shakil, J. A.");
  });

  it("formats a full reference with pages and Unicode formula", () => {
    expect(formatApa(pub("ma-2026-perovskite"))).toBe(
      "Shakil, J. A., Saikat, S. P., Bhattacharjee, N., Rahman, M. A., Bhowmik, S., Khandaker, M. U., Uddin, J., & Chowdhury, F. I. (2026). " +
        "Toward efficient and sustainable perovskite solar cells: a combined first-principles and device simulation study of K₂LiGa(Cl/Br)₆ for photovoltaic performance optimization. " +
        "Materials Advances, 7(14), 7084–7105. https://doi.org/10.1039/d6ma00207b",
    );
  });

  it("uses the article number and marks incomplete author lists", () => {
    expect(formatApa(pub("nxmate-2026-mannopyranoside"))).toContain("Next Materials, 13, 103749.");
    expect(formatApa(pub("slct-2025-cox2"))).toMatch(/^Bhattacharjee, N\., Shakil, J\. A\., Saikat, S\. P\., et al\. \(2025\)/);
  });

  it("builds a short source line", () => {
    expect(sourceLine(pub("slct-2025-cox2"))).toBe("ChemistrySelect 10(5)");
  });
});

describe("themeSlug", () => {
  it("makes URL-safe slugs", () => {
    expect(themeSlug("Materials for clean energy")).toBe("materials-for-clean-energy");
  });
});
