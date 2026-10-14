import { parseRichText } from "@/lib/rich-text";
import type { Publication } from "@/lib/publications";

/** Keep stereo-descriptor prefixes such as "α-D-mannopyranoside" from breaking at a hyphen. */
const NO_BREAK = /([αβ]-[DL]-[\p{L}]+)/u;

function Text({ text }: { text: string }) {
  const parts = text.split(NO_BREAK);
  if (parts.length === 1) return <>{text}</>;
  return <>{parts.map((part, i) => (i % 2 ? <span key={i} style={{ whiteSpace: "nowrap" }}>{part}</span> : part))}</>;
}

/** Publication title with chemical formulas rendered via <sub>/<sup>. */
export function RichTitle({ pub }: { pub: Pick<Publication, "title" | "titleHtml"> }) {
  if (!pub.titleHtml) return <Text text={pub.title} />;
  return (
    <>
      {parseRichText(pub.titleHtml).map((s, i) => {
        if (s.tag === "sub") return <sub key={i}>{s.text}</sub>;
        if (s.tag === "sup") return <sup key={i}>{s.text}</sup>;
        if (s.tag === "i") return <i key={i}>{s.text}</i>;
        return <Text key={i} text={s.text} />;
      })}
    </>
  );
}
