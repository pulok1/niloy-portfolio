import { profile } from "@/content/profile";
import { Section } from "./Section";
import styles from "./About.module.css";

export function About() {
  const [lead, ...rest] = profile.about;
  return (
    <Section id="about" eyebrow="About" title="From undergraduate curiosity to computational research">
      <div className={styles.grid}>
        <div className={styles.prose}>
          <p className={styles.lead}>{lead}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside className={`card ${styles.facts}`} aria-label="Quick facts">
          <dl>
            <div>
              <dt>Affiliation</dt>
              <dd>
                {profile.department}
                <br />
                {profile.institution}, {profile.country}
              </dd>
            </div>
            {profile.lab && (
              <div>
                <dt>Research group</dt>
                <dd>{profile.lab}</dd>
              </div>
            )}
            <div>
              <dt>Focus</dt>
              <dd>Computational chemistry for drug design, anti-infectives and clean-energy materials</dd>
            </div>
            <div>
              <dt>Collaborations</dt>
              <dd>{profile.collaboratingCountries.join(" · ")}</dd>
            </div>
            <div>
              <dt>ORCID</dt>
              <dd>
                <a href={profile.orcid.href} target="_blank" rel="me noopener">
                  {profile.orcid.id}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
