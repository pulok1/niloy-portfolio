import { profile } from "@/content/profile";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.name}>{profile.name}</p>
        <p className={styles.meta}>{profile.affiliation}</p>
        <p className={styles.links}>
          <a href={profile.orcid.href} rel="me noopener" target="_blank">
            ORCID
          </a>
          <span aria-hidden="true">·</span>
          <a href={profile.scopus.href} rel="noopener" target="_blank">
            Scopus
          </a>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
