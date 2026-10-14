/*
 * Pure helpers for publications. Safe to import from client components: this
 * module does not pull in zod. Validation lives in ./publications.ts, which
 * runs at build time from server components.
 */
import raw from "@data/publications.json";
import type { Publication } from "./schema";

export type { Publication };

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
const selfName = normalise(raw.person.name);

export function isSelf(author: string): boolean {
  return normalise(author) === selfName;
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
