import raw from "@data/publications.json";
import { dataFileSchema, type DataFile, type Publication } from "./schema";

export type { Publication, Person } from "./schema";

export function parseDataFile(input: unknown): DataFile {
  const result = dataFileSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`publications.json is invalid:\n${result.error.message}`);
  }
  const ids = new Set<string>();
  for (const p of result.data.publications) {
    if (ids.has(p.id)) throw new Error(`publications.json: duplicate id "${p.id}"`);
    ids.add(p.id);
  }
  return result.data;
}

const data = parseDataFile(raw);

export const person = data.person;

/** Reverse-chronological; ties keep the order they have in the JSON file. */
export function sortByYearDesc(pubs: readonly Publication[]): Publication[] {
  return pubs
    .map((p, i) => ({ p, i }))
    .sort((a, b) => b.p.year - a.p.year || a.i - b.i)
    .map(({ p }) => p);
}

export const publications: Publication[] = sortByYearDesc(data.publications);

export function getPublication(id: string): Publication | undefined {
  return publications.find((p) => p.id === id);
}

/**
 * Author entries that are notes rather than names, e.g.
 * "et al. — VERIFY full list on the DOI page". They mark an incomplete list.
 */
export function isAuthorNote(author: string): boolean {
  return /^et al\.?/i.test(author.trim()) || /\bVERIFY\b/.test(author);
}

export function namedAuthors(p: Publication): string[] {
  return p.authors.filter((a) => !isAuthorNote(a));
}

export function hasIncompleteAuthors(p: Publication): boolean {
  return p.authors.some(isAuthorNote);
}

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

export function isSelf(author: string): boolean {
  return normalise(author) === normalise(person.name);
}

export function isFirstAuthor(p: Publication): boolean {
  const first = p.authors[0];
  return first !== undefined && isSelf(first);
}

export function themeSlug(theme: string): string {
  return theme
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Distinct themes in order of first appearance. */
export function themesOf(pubs: readonly Publication[]): string[] {
  return [...new Set(pubs.map((p) => p.theme))];
}

export function journalsOf(pubs: readonly Publication[]): string[] {
  return [...new Set(pubs.map((p) => p.journal))];
}

export function doiUrl(doi: string): string {
  return `https://doi.org/${doi}`;
}

/** "ChemistrySelect 10(5)", "Materials Advances 7(14), 7084–7105", "Next Materials 13, 103749" */
export function sourceLine(p: Publication): string {
  let s = p.journal;
  if (p.volume) s += ` ${p.volume}${p.issue ? `(${p.issue})` : ""}`;
  const loc = p.pages ? p.pages.replace("-", "–") : p.articleNumber;
  if (loc) s += `, ${loc}`;
  return s;
}
