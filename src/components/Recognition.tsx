import { awards, courses } from "@/lib/publications";
import { TodoBadge } from "./Placeholder";
import styles from "./Recognition.module.css";

const isTodo = (v?: string) => !!v && /^TODO\b/i.test(v.trim());

/** A value from the JSON, or a TODO badge if it is a "TODO: …" note. */
function Value({ v }: { v?: string }) {
  if (!v) return null;
  return isTodo(v) ? <TodoBadge label={v.replace(/^TODO:?\s*/i, "")} /> : <>{v}</>;
}

/** Awards and courses from publications.json, shown under Education. */
export function Recognition() {
  if (awards.length === 0 && courses.length === 0) return null;
  return (
    <div className={styles.grid}>
      {awards.length > 0 && (
        <section className={`card ${styles.panel}`} aria-labelledby="awards-heading">
          <h3 id="awards-heading" className={styles.heading}>
            Awards
          </h3>
          <ul className={styles.list}>
            {awards.map((a) => (
              <li key={a.title + (a.event ?? "")}>
                <span className={styles.medal} aria-hidden="true">
                  ★
                </span>
                <div>
                  <p className={styles.title}>{a.title}</p>
                  {a.event && <p className={styles.meta}>{a.event}</p>}
                  {a.year && (
                    <p className={styles.meta}>
                      <Value v={a.year} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {courses.length > 0 && (
        <section className={`card ${styles.panel}`} aria-labelledby="courses-heading">
          <h3 id="courses-heading" className={styles.heading}>
            Courses & training
          </h3>
          <ul className={styles.list}>
            {courses.map((c) => (
              <li key={c.title}>
                <span className={styles.medal} aria-hidden="true">
                  ◆
                </span>
                <div>
                  <p className={styles.title}>{c.title}</p>
                  {(c.provider || c.year) && (
                    <p className={styles.meta}>
                      <Value v={c.provider} />
                      {c.provider && c.year && " · "}
                      <Value v={c.year} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
