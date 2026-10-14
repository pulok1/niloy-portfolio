import raw from "@data/publications.json";
import { dataFileSchema, type DataFile, type Publication } from "./schema";

export type { Publication, Person } from "./schema";
export * from "./publication-helpers";

/** Validates publications.json. Imported by server components, so a bad file fails the build. */
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

/** Distinct themes in order of first appearance. */
export function themesOf(pubs: readonly Publication[]): string[] {
  return [...new Set(pubs.map((p) => p.theme))];
}

export function journalsOf(pubs: readonly Publication[]): string[] {
  return [...new Set(pubs.map((p) => p.journal))];
}
