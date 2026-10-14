import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { isFilled, type Placeholder } from "@/lib/placeholder";
import { asset, hidePlaceholders } from "@/lib/site";
import { Download, Index, LinkedIn, Mail, Orcid, ResearchGate, Scholar } from "./Icons";
import { TodoBadge } from "./Placeholder";
import styles from "./Contact.module.css";

type Item = { label: string; icon: ReactNode; href?: string; text: ReactNode; external?: boolean };

const fromPlaceholder = (
  label: string,
  icon: ReactNode,
  p: Placeholder,
  toHref: (v: string) => string,
  toText: (v: string) => string = (v) => v.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
  external = true,
): Item | null => {
  if (isFilled(p)) return { label, icon, href: toHref(p.value), text: toText(p.value), external };
  if (hidePlaceholders) return null;
  return { label, icon, text: <TodoBadge label={p.label} title={`Placeholder ${p.token}: see TODO.md`} /> };
};

export function Contact() {
  const items = [
    fromPlaceholder("Email", <Mail />, profile.email, (v) => `mailto:${v}`, (v) => v, false),
    fromPlaceholder("LinkedIn", <LinkedIn />, profile.linkedin, (v) => v),
    { label: "ORCID", icon: <Orcid />, href: profile.orcid.href, text: profile.orcid.id, external: true },
    { label: "Scopus", icon: <Index />, href: profile.scopus.href, text: `Author ID ${profile.scopus.id}`, external: true },
    fromPlaceholder("Google Scholar", <Scholar />, profile.googleScholar, (v) => v),
    fromPlaceholder("ResearchGate", <ResearchGate />, profile.researchGate, (v) => v),
  ].filter((i): i is Item => i !== null);

  return (
    <>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a
                className={`card ${styles.card} ${styles.linked}`}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: item.label === "ORCID" ? "me noopener" : "noopener" } : {})}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.text}>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.value}>{item.text}</span>
                </span>
              </a>
            ) : (
              <div className={`card ${styles.card}`}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.text}>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.value}>{item.text}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      {isFilled(profile.cv) && (
        <p className={styles.cv}>
          <a href={asset(profile.cv.value)} className="btn btn-primary" download>
            <Download /> Download CV (PDF)
          </a>
        </p>
      )}
    </>
  );
}
