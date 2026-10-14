import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorList } from "@/components/AuthorList";
import { CopyCitationButton } from "@/components/CopyCitationButton";
import { ArrowLeft, ExternalLink, Unlock } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { TodoBadge } from "@/components/Placeholder";
import { RichTitle } from "@/components/RichTitle";
import { featuredStats, researchAreas } from "@/content/research";
import { formatApa } from "@/lib/citation";
import { dateLabel, doiUrl, getPublication, isFirstAuthor, isMethodNote, publications, sourceLine, themeSlug } from "@/lib/publications";
import { ogImage } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";
import styles from "./page.module.css";

type Params = { id: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return publications.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const pub = getPublication((await params).id);
  if (!pub) return {};
  return {
    title: pub.title,
    description: pub.summary,
    alternates: { canonical: `/research/${pub.id}/` },
    // Page-level openGraph replaces the layout's, so the shared image is repeated here.
    openGraph: { type: "article", title: pub.title, description: pub.summary, url: `/research/${pub.id}/`, images: [ogImage] },
  };
}

export default async function ResearchPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const pub = getPublication(id);
  if (!pub) notFound();

  const stats = featuredStats[pub.id] ?? [];
  const area = researchAreas.find((a) => a.themes.includes(pub.theme));
  const citation = formatApa(pub);

  return (
    <article className={styles.page}>
      <JsonLd data={articleJsonLd(pub, `/research/${pub.id}/`)} />
      <header className={styles.header}>
        <div className="container">
          <Link href="/#publications" className={styles.back}>
            <ArrowLeft width={16} height={16} /> All publications
          </Link>
          <div className={styles.tags}>
            <span className={styles.theme}>{pub.theme}</span>
            {pub.type !== "Journal article" && <span className={styles.badgeOnDark}>{pub.type}</span>}
            <span className={isFirstAuthor(pub) ? "badge badge-accent" : styles.badgeOnDark}>{pub.authorPosition}</span>
            {pub.openAccess && (
              <span className={styles.badgeOnDark}>
                <Unlock width={13} height={13} /> Open access
              </span>
            )}
          </div>
          <h1 className={styles.title}>
            <RichTitle pub={pub} />
          </h1>
          <p className={styles.source}>
            <cite>{sourceLine(pub)}</cite> · {dateLabel(pub)}
            {pub.publisher && <> · {pub.publisher}</>}
          </p>
          <div className={styles.actions}>
            <a href={doiUrl(pub.doi)} className="btn btn-primary" target="_blank" rel="noopener">
              Read {pub.type === "Book chapter" ? "chapter" : "paper"} <ExternalLink />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <CopyCitationButton citation={citation} className={`btn ${styles.btnOnDark}`} />
            {pub.researchGateUrl && (
              <a href={pub.researchGateUrl} className={`btn ${styles.btnOnDark}`} target="_blank" rel="noopener">
                ResearchGate <ExternalLink />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className={`container ${styles.body}`}>
        <div className={styles.main}>
          <section aria-labelledby="summary">
            <h2 id="summary" className={styles.h2}>
              In plain language
            </h2>
            <p className={styles.summary}>{pub.summary}</p>
          </section>

          {stats.length > 0 && (
            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <dt>{s.label}</dt>
                  <dd>
                    {s.value}
                    {s.unit && <span> {s.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {pub.highlights.length > 0 && (
            <section aria-labelledby="highlights">
              <h2 id="highlights" className={styles.h2}>
                Highlights
              </h2>
              <ul className={styles.highlights}>
                {pub.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="cite">
            <h2 id="cite" className={styles.h2}>
              Cite this work (APA)
            </h2>
            <p className={styles.citation}>{citation}</p>
          </section>
        </div>

        <aside className={styles.side}>
          <section className={`card ${styles.panel}`} aria-labelledby="authors">
            <h2 id="authors" className={styles.h3}>
              Authors
            </h2>
            <AuthorList pub={pub} className={styles.authors} />
          </section>
          <section className={`card ${styles.panel}`} aria-labelledby="paper-methods">
            <h2 id="paper-methods" className={styles.h3}>
              Methods
            </h2>
            <ul className="chip-list">
              {pub.methods.map((m) =>
                isMethodNote(m) ? (
                  <li key={m}>
                    <TodoBadge label={m.replace(/\s*[—-]\s*VERIFY.*$/i, "") + ": verify"} />
                  </li>
                ) : (
                  <li key={m} className="chip">
                    {m}
                  </li>
                ),
              )}
            </ul>
          </section>
          <section className={`card ${styles.panel}`} aria-labelledby="details">
            <h2 id="details" className={styles.h3}>
              Details
            </h2>
            <dl className={styles.meta}>
              <dt>{pub.type === "Book chapter" ? "Book" : "Journal"}</dt>
              <dd>
                <i>{pub.journal ?? pub.bookTitle}</i>
              </dd>
              {pub.publisher && (
                <>
                  <dt>Publisher</dt>
                  <dd>{pub.publisher}</dd>
                </>
              )}
              {pub.volume && (
                <>
                  <dt>Volume</dt>
                  <dd>
                    {pub.volume}
                    {pub.issue && ` (issue ${pub.issue})`}
                  </dd>
                </>
              )}
              {(pub.pages || pub.articleNumber) && (
                <>
                  <dt>{pub.pages ? "Pages" : "Article"}</dt>
                  <dd>{pub.pages?.replace("-", "–") ?? pub.articleNumber}</dd>
                </>
              )}
              <dt>DOI</dt>
              <dd>
                <a href={doiUrl(pub.doi)} target="_blank" rel="noopener" className={styles.doi}>
                  {pub.doi}
                </a>
              </dd>
            </dl>
          </section>
          {area && (
            <Link href={`/?theme=${area.themes.map(themeSlug).join(",")}#publications`} className={styles.related}>
              More on {area.title.toLowerCase()} →
            </Link>
          )}
        </aside>
      </div>
    </article>
  );
}
