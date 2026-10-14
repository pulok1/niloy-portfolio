import type { ReactNode } from "react";
import styles from "./Section.module.css";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "default" | "alt";
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${tone === "alt" ? styles.alt : ""}`}>
      <div className="container">
        <header className={styles.header}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
