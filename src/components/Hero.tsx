import Link from "next/link";
import { profile } from "@/content/profile";
import { Avatar } from "./Avatar";
import { HexLattice } from "./HexLattice";
import { ArrowRight, Index, Mail, Orcid } from "./Icons";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <HexLattice />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={styles.kicker}>
            {profile.role} · {profile.institution}
          </p>
          <h1 id="hero-name" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.tagline}>{profile.tagline}</p>
          <p className={styles.affiliation}>{profile.affiliation}</p>

          <div className={styles.actions}>
            <Link href="/#research" className="btn btn-primary">
              View research <ArrowRight />
            </Link>
            <a href={profile.orcid.href} className={`btn ${styles.btnOnDark}`} target="_blank" rel="me noopener">
              <Orcid /> ORCID
            </a>
            <a href={profile.scopus.href} className={`btn ${styles.btnOnDark}`} target="_blank" rel="noopener">
              <Index /> Scopus
            </a>
            <Link href="/#contact" className={`btn ${styles.btnOnDark}`}>
              <Mail /> Contact
            </Link>
          </div>
        </div>
        <Avatar />
      </div>
    </section>
  );
}
