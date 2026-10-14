import { profile } from "@/content/profile";
import { Graduation } from "./Icons";
import { PlaceholderValue } from "./Placeholder";
import styles from "./Education.module.css";

export function Education() {
  return (
    <ol className={styles.timeline}>
      {profile.education.map((e) => (
        <li key={e.degree} className={styles.item}>
          <span className={styles.marker} aria-hidden="true">
            <Graduation width={18} height={18} />
          </span>
          <div className={`card ${styles.card}`}>
            <p className={styles.years}>
              <PlaceholderValue p={e.years} />
            </p>
            <h3 className={styles.degree}>{e.degree}</h3>
            <p className={styles.institution}>
              {profile.department}, {e.institution}
            </p>
            <dl className={styles.details}>
              <div>
                <dt>Result</dt>
                <dd>
                  <PlaceholderValue p={e.result} />
                </dd>
              </div>
              {e.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>
                    <PlaceholderValue p={d.value} />
                  </dd>
                </div>
              ))}
            </dl>
            {"note" in e && e.note && (
              <div className={styles.note}>
                <p className={styles.noteTitle}>{e.note.title}</p>
                <p>{e.note.body}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
