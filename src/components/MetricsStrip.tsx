import { profile } from "@/content/profile";
import { isFilled } from "@/lib/placeholder";
import { isFirstAuthor, journalsOf, publications } from "@/lib/publications";
import styles from "./MetricsStrip.module.css";

/** Counts computed from publications.json. h-index and citations appear only once filled in by hand. */
export function MetricsStrip() {
  const firstAuthor = publications.filter(isFirstAuthor).length;
  const metrics = [
    { value: publications.length, label: "journal publications" },
    { value: journalsOf(publications).length, label: "journals" },
    { value: profile.collaboratingCountries.length, label: "collaborating countries abroad", hint: profile.collaboratingCountries.join(", ") },
    ...(firstAuthor ? [{ value: firstAuthor, label: `first-author paper${firstAuthor === 1 ? "" : "s"}` }] : []),
    ...(isFilled(profile.hIndex) ? [{ value: profile.hIndex.value, label: "h-index (Scopus)" }] : []),
    ...(isFilled(profile.citations) ? [{ value: profile.citations.value, label: "citations (Scopus)" }] : []),
  ];

  return (
    <section aria-label="Research at a glance" className={styles.strip}>
      <dl className={`container ${styles.list}`}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.item}>
            <dt className={styles.label}>
              {m.label}
              {m.hint && <span className={styles.hint}>{m.hint}</span>}
            </dt>
            <dd className={styles.value}>
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
