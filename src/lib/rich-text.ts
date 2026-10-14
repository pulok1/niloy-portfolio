/**
 * Tiny, safe parser for titleHtml. Only <sub>, <sup>, <i> and <em> are honoured;
 * any other tag is dropped and its text kept. The output is plain data rendered
 * by <RichTitle>, so no HTML string ever reaches the DOM.
 */
export type RichSegment = { text: string; tag?: "sub" | "sup" | "i" };

const TAG = /<\s*(\/?)\s*([a-z]+)[^>]*>/gi;

export function parseRichText(html: string): RichSegment[] {
  const segments: RichSegment[] = [];
  let current: RichSegment["tag"];
  let last = 0;
  const push = (text: string) => {
    if (!text) return;
    const decoded = decodeEntities(text);
    const prev = segments[segments.length - 1];
    if (prev && prev.tag === current) prev.text += decoded;
    else segments.push(current ? { text: decoded, tag: current } : { text: decoded });
  };
  for (const m of html.matchAll(TAG)) {
    push(html.slice(last, m.index));
    last = (m.index ?? 0) + m[0].length;
    const closing = m[1] === "/";
    const name = (m[2] ?? "").toLowerCase();
    const tag = name === "em" ? "i" : name;
    if (tag === "sub" || tag === "sup" || tag === "i") current = closing ? undefined : tag;
  }
  push(html.slice(last));
  return segments;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

const SUB: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "(": "₍", ")": "₎",
};
const SUP: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "(": "⁽", ")": "⁾",
};

/** Plain-text rendering with Unicode sub/superscripts, e.g. for copied citations. */
export function richTextToPlain(html: string): string {
  return parseRichText(html)
    .map(({ text, tag }) => {
      const map = tag === "sub" ? SUB : tag === "sup" ? SUP : undefined;
      if (!map) return text;
      const chars = [...text];
      return chars.every((c) => c in map) ? chars.map((c) => map[c]).join("") : text;
    })
    .join("");
}
