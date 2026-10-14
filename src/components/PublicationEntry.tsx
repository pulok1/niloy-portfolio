import Link from "next/link";
import { formatApa } from "@/lib/citation";
import { dateLabel, doiUrl, isFirstAuthor, sourceLine, type Publication } from "@/lib/publication-helpers";
import { AuthorList } from "./AuthorList";
import { CopyCitationButton } from "./CopyCitationButton";
import { ExternalLink, Unlock } from "./Icons";
import { RichTitle } from "./RichTitle";
import styles from "./Publications.module.css";

export function PublicationEntry({ pub }: { pub: Publication }) {
  return (
    <article className={styles.entry} aria-labelledby={`pub-${pub.id}`}>
      <p className={styles.year} aria-hidden="true">
        {pub.year}
      </p>
      <div className={styles.body}>
        <div className={styles.tags}>
          <span className="chip chip-accent">{pub.theme}</span>
          {pub.type !== "Journal article" && <span className="badge">{pub.type}</span>}
          <span className={isFirstAuthor(pub) ? "badge badge-accent" : "badge"}>{pub.authorPosition}</span>
          {pub.openAccess && (
            <span className="badge">
              <Unlock width={13} height={13} /> Open access
            </span>
          )}
        </div>
        <h3 id={`pub-${pub.id}`} className={styles.title}>
          <Link href={`/research/${pub.id}/`}>
            <RichTitle pub={pub} />
          </Link>
        </h3>
        <AuthorList pub={pub} className={styles.authors} />
        <p className={styles.source}>
          <cite>{sourceLine(pub)}</cite> · {dateLabel(pub)}
          {pub.publisher && <> · {pub.publisher}</>}
        </p>
        <div className={styles.actions}>
          <a href={doiUrl(pub.doi)} className={styles.doi} target="_blank" rel="noopener">
            doi:{pub.doi}
            <ExternalLink width={14} height={14} />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <CopyCitationButton citation={formatApa(pub)} />
          {pub.researchGateUrl && (
            <a href={pub.researchGateUrl} className={styles.secondaryLink} target="_blank" rel="noopener">
              ResearchGate
              <span className="visually-hidden"> page for this publication (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
