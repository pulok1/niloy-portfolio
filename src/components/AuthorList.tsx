import { Fragment } from "react";
import { isAuthorNote, isSelf, type Publication } from "@/lib/publications";
import { TodoBadge } from "./Placeholder";

/** Author list with his name in bold. Incomplete lists show "et al." plus a VERIFY marker. */
export function AuthorList({ pub, className }: { pub: Publication; className?: string }) {
  const named = pub.authors.filter((a) => !isAuthorNote(a));
  const incomplete = named.length !== pub.authors.length;
  return (
    <p className={className}>
      {named.map((a, i) => (
        <Fragment key={a}>
          {i > 0 && ", "}
          {isSelf(a) ? <strong>{a}</strong> : a}
        </Fragment>
      ))}
      {incomplete && (
        <>
          , et al.{" "}
          <TodoBadge label="VERIFY full author list" title="Author list incomplete in publications.json: check the DOI page" />
        </>
      )}
    </p>
  );
}
