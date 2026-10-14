import Link from "next/link";
import { featuredOrder, featuredStats } from "@/content/research";
import { doiUrl, getPublication, isFirstAuthor, type Publication } from "@/lib/publications";
import { ArrowRight, ExternalLink } from "./Icons";
import { RichTitle } from "./RichTitle";
import styles from "./FeaturedResearch.module.css";

function FeaturedCard({ pub, lead }: { pub: Publication; lead: boolean }) {
  const stats = featuredStats[pub.id] ?? [];
  const headingId = `featured-${pub.id}`;
  return (
    <article className={`card ${styles.card} ${lead ? styles.lead : ""}`} aria-labelledby={headingId}>
      <div className={styles.main}>
        <div className={styles.meta}>
          <span className="eyebrow">{pub.theme}</span>
          <span className={isFirstAuthor(pub) ? "badge badge-accent" : "badge"}>{pub.authorPosition}</span>
        </div>
        <h3 id={headingId} className={styles.title}>
          <Link href={`/research/${pub.id}/`}>
            <RichTitle pub={pub} />
          </Link>
        </h3>
        <p className={styles.source}>
          <cite>{pub.journal}</cite> · {pub.year} · {pub.publisher}
        </p>

        <div className={styles.summary}>
          <h4 className={styles.subhead}>In plain language</h4>
          <p>{pub.summary}</p>
        </div>

        <ul className="chip-list" aria-label="Methods">
          {pub.methods.map((m) => (
            <li key={m} className="chip">
              {m}
            </li>
          ))}
        </ul>
      </div>

      {stats.length > 0 && (
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statLabel}>{s.label}</dt>
              <dd className={styles.statValue}>
                {s.value}
                {s.unit && <span className={styles.unit}> {s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className={styles.actions}>
        <a href={doiUrl(pub.doi)} className="btn btn-primary btn-sm" target="_blank" rel="noopener">
          Read paper <ExternalLink />
          <span className="visually-hidden"> (DOI {pub.doi}, opens in a new tab)</span>
        </a>
        <Link href={`/research/${pub.id}/`} className="btn btn-ghost btn-sm">
          Details <ArrowRight />
          <span className="visually-hidden"> about this paper</span>
        </Link>
      </div>
    </article>
  );
}

export function FeaturedResearch() {
  const featured = featuredOrder.map(getPublication).filter((p): p is Publication => !!p?.featured);
  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Featured research</h3>
      <div className={styles.list}>
        {featured.map((pub, i) => (
          <FeaturedCard key={pub.id} pub={pub} lead={i === 0} />
        ))}
      </div>
    </div>
  );
}
