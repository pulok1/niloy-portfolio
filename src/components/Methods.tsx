import { methodGroups } from "@/content/research";
import { publications, themeSlug } from "@/lib/publications";
import { hidePlaceholders } from "@/lib/site";
import { TodoBadge } from "./Placeholder";
import styles from "./Methods.module.css";

export function Methods() {
  return (
    <>
      <div className={styles.grid}>
        {methodGroups.map((group) => {
          const items = group.items.filter((i) => i.match.length > 0 || !hidePlaceholders);
          if (items.length === 0) return null;
          return (
            <section key={group.title} className={`card ${styles.group}`} aria-labelledby={`methods-${themeSlug(group.title)}`}>
              <h3 id={`methods-${themeSlug(group.title)}`} className={styles.title}>
                {group.title}
              </h3>
              <ul className={styles.items}>
                {items.map((item) => {
                  const confirmed = item.match.length > 0;
                  const count = publications.filter((p) => item.match.some((m) => p.methods.includes(m))).length;
                  return (
                    <li key={item.label} className={`${styles.item} ${confirmed ? "" : styles.unconfirmed}`}>
                      <span className={styles.name}>
                        {item.abbr && <abbr title={item.label}>{item.abbr}</abbr>}
                        <span className={item.abbr ? styles.full : undefined}>{item.label}</span>
                      </span>
                      {confirmed ? (
                        <span className={styles.count}>
                          {count} paper{count === 1 ? "" : "s"}
                        </span>
                      ) : (
                        <TodoBadge label="confirm" title="Not yet confirmed from a paper: see TODO.md" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
      {!hidePlaceholders && (
        <p className={styles.note}>
          Software packages used (DFT, docking and MD codes) <TodoBadge label="confirm software names" />
        </p>
      )}
    </>
  );
}
