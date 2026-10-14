import { richTextToPlain } from "./rich-text";
import { doiUrl, hasIncompleteAuthors, namedAuthors, type Publication } from "./publications";

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

function apaAuthorList(p: Publication): string {
  const names = namedAuthors(p).map(apaName);
  if (hasIncompleteAuthors(p)) return `${names.join(", ")}, et al.`;
  if (names.length === 1) return names[0] ?? "";
  if (names.length <= 20) return `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
  // APA 7: first 19 authors, an ellipsis, then the final author.
  return `${names.slice(0, 19).join(", ")}, . . . ${names[names.length - 1]}`;
}

/** APA 7 reference as plain text (titles kept as published; journal not italicised). */
export function formatApa(p: Publication): string {
  const title = (p.titleHtml ? richTextToPlain(p.titleHtml) : p.title).replace(/\.$/, "");
  let source = p.journal;
  if (p.volume) source += `, ${p.volume}${p.issue ? `(${p.issue})` : ""}`;
  const loc = p.pages ? p.pages.replace("-", "–") : p.articleNumber;
  if (loc) source += `, ${loc}`;
  return `${apaAuthorList(p)} (${p.year}). ${title}. ${source}. ${doiUrl(p.doi)}`;
}
