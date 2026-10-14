import { Fragment } from "react";
import { isAuthorNote, isSelf, type Publication } from "@/lib/publication-helpers";
import { TodoBadge } from "./Placeholder";

/**
 * Author list with his name in bold. A VERIFY note stays where it is in the list:
 * "…" for unknown middle authors, "et al." at the end, each with a VERIFY badge.
 */
export function AuthorList({ pub, className }: { pub: Publication; className?: string }) {
  const last = pub.authors.length - 1;
  return (
    <p className={className}>
      {pub.authors.map((a, i) => (
        <Fragment key={`${i}-${a}`}>
          {i > 0 && ", "}
          {isAuthorNote(a) ? (
            <>
              {i === last ? "et al." : "…"}{" "}
              <TodoBadge label="VERIFY authors" title="Author list incomplete in publications.json: check the DOI page" />
            </>
          ) : isSelf(a) ? (
            <strong>{a}</strong>
          ) : (
            a
          )}
        </Fragment>
      ))}
    </p>
  );
}
