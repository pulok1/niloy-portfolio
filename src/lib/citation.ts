import { richTextToPlain } from "./rich-text";
import { doiUrl, isAuthorNote, type Publication } from "./publication-helpers";

/** "Sarkar M.A. Kawsar" → "Kawsar, S. M. A.";  "Md. Atikur Rahman" → "Rahman, M. A." */
export function apaName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const family = parts.pop() ?? "";
  const initials = parts
    .flatMap((given) => given.split(".").filter(Boolean))
    .map((given) =>
      given
        .split("-")
        .map((g) => `${g.charAt(0).toUpperCase()}.`)
        .join("-"),
    );
  return initials.length ? `${family}, ${initials.join(" ")}` : family;
}

/**
 * APA author list. A VERIFY note at the end becomes "et al."; a note in the
 * middle (unknown middle authors) becomes APA's ". . ." before the final author.
 */
function apaAuthorList(p: Publication): string {
  const noteAt = p.authors.findIndex(isAuthorNote);
  const names = p.authors.filter((a) => !isAuthorNote(a)).map(apaName);
  if (noteAt !== -1 && noteAt >= names.length) return `${names.join(", ")}, et al.`;
  if (noteAt !== -1) return `${names.slice(0, -1).join(", ")}, . . . ${names[names.length - 1]}`;
  if (names.length === 1) return names[0] ?? "";
  if (names.length <= 20) return `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
  // APA 7: first 19 authors, an ellipsis, then the final author.
  return `${names.slice(0, 19).join(", ")}, . . . ${names[names.length - 1]}`;
}

/** APA 7 reference as plain text (titles kept as published; italics not representable). */
export function formatApa(p: Publication): string {
  const title = (p.titleHtml ? richTextToPlain(p.titleHtml) : p.title).replace(/\.$/, "");
  const pages = p.pages?.replace("-", "–");
  const head = `${apaAuthorList(p)} (${p.year}). ${title}.`;

  if (p.type === "Book chapter") {
    const book = `In ${p.bookTitle}${pages ? ` (pp. ${pages})` : ""}.`;
    return [head, book, p.publisher ? `${p.publisher}.` : "", doiUrl(p.doi)].filter(Boolean).join(" ");
  }

  let source = p.journal ?? "";
  if (p.volume) source += `, ${p.volume}${p.issue ? `(${p.issue})` : ""}`;
  const loc = pages ?? p.articleNumber;
  if (loc) source += `, ${loc}`;
  return `${head} ${source}. ${doiUrl(p.doi)}`;
}
