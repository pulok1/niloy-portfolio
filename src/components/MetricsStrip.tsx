import { profile } from "@/content/profile";
import { isFilled } from "@/lib/placeholder";
import { isFirstAuthor, journalsOf, person, publications } from "@/lib/publications";
import styles from "./MetricsStrip.module.css";

type Metric = { value: string; label: string; hint?: string; title?: string };

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Counts computed from publications.json, plus citation/read counters that were
 * copied by hand (Scopus if filled in, otherwise ResearchGate). Nothing is fetched.
 */
export function MetricsStrip() {
  const firstAuthor = publications.filter(isFirstAuthor).length;
  const stats = person.stats;
  const statsTitle = stats?.source;

  const metrics: Metric[] = [
    { value: fmt(publications.length), label: "publications" },
    { value: fmt(journalsOf(publications).length), label: "journals" },
    ...(firstAuthor ? [{ value: fmt(firstAuthor), label: `first-author paper${firstAuthor === 1 ? "" : "s"}` }] : []),
    {
      value: fmt(profile.collaboratingCountries.length),
      label: "collaborating countries abroad",
      hint: profile.collaboratingCountries.join(", "),
    },
  ];

  if (isFilled(profile.citations)) metrics.push({ value: fmt(profile.citations.value), label: "citations", hint: "Scopus" });
  else if (stats?.citations !== undefined)
    metrics.push({ value: fmt(stats.citations), label: "citations", hint: "ResearchGate", title: statsTitle });
  if (isFilled(profile.hIndex)) metrics.push({ value: fmt(profile.hIndex.value), label: "h-index", hint: "Scopus" });
  if (stats?.reads !== undefined) metrics.push({ value: fmt(stats.reads), label: "reads", hint: "ResearchGate", title: statsTitle });

  return (
    <section aria-label="Research at a glance" className={styles.strip}>
      <dl className={`container ${styles.list}`}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.item} title={m.title}>
            <dt className={styles.label}>
              {m.label}
              {m.hint && <span className={styles.hint}>{m.hint}</span>}
            </dt>
            <dd className={styles.value}>{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
