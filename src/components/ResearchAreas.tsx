import Link from "next/link";
import { researchAreas, type ResearchArea } from "@/content/research";
import { publications, themeSlug } from "@/lib/publications";
import { ArrowRight, CapsuleMotif, SolarMotif, SugarMotif } from "./Icons";
import styles from "./ResearchAreas.module.css";

const icons: Record<ResearchArea["icon"], typeof CapsuleMotif> = {
  capsule: CapsuleMotif,
  sugar: SugarMotif,
  sun: SolarMotif,
};

export function ResearchAreas() {
  return (
    <ul className={styles.grid}>
      {researchAreas.map((area) => {
        const Icon = icons[area.icon];
        const count = publications.filter((p) => area.themes.includes(p.theme)).length;
        const headingId = `area-${area.id}`;
        return (
          <li key={area.id} className={`card ${styles.card}`}>
            <span className={styles.icon}>
              <Icon width={44} height={44} />
            </span>
            <h3 id={headingId} className={styles.title}>
              {area.title}
            </h3>
            <p className={styles.question}>{area.question}</p>
            <p className={styles.body}>{area.description}</p>
            <Link href={`/?theme=${area.themes.map(themeSlug).join(",")}#publications`} className={styles.link}>
              {count} related paper{count === 1 ? "" : "s"}
              <span className="visually-hidden"> on {area.title.toLowerCase()}</span>
              <ArrowRight width={16} height={16} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
