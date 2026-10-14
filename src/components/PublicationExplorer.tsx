"use client";

import { useSearchParams } from "next/navigation";
import { themeSlug, type Publication } from "@/lib/publication-helpers";
import { PublicationEntry } from "./PublicationEntry";
import styles from "./Publications.module.css";

type Props = { publications: Publication[]; themes: string[] };

/**
 * Filter chips + list. Selected themes live in ?theme=a,b so research-area
 * cards can deep-link to a group of themes. Chips toggle; "All" clears.
 */
export function PublicationExplorer({ publications, themes }: Props) {
  const params = useSearchParams();
  const requested = new Set((params.get("theme") ?? "").split(",").filter(Boolean));
  const active = themes.filter((t) => requested.has(themeSlug(t)));
  return <PublicationListView publications={publications} themes={themes} active={active} interactive />;
}

export function PublicationListView({
  publications,
  themes,
  active,
  interactive = false,
}: Props & { active: string[]; interactive?: boolean }) {
  const shown = active.length ? publications.filter((p) => active.includes(p.theme)) : publications;

  const setActive = (next: string[]) => {
    const url = new URL(window.location.href);
    if (next.length) url.searchParams.set("theme", next.map(themeSlug).join(","));
    else url.searchParams.delete("theme");
    // Next.js syncs useSearchParams with native history updates; no scroll, no reload.
    window.history.replaceState(null, "", `${url.pathname}${url.search.replace(/%2C/g, ",")}#publications`);
  };
  const toggle = (theme: string) =>
    setActive(active.includes(theme) ? active.filter((t) => t !== theme) : [...active, theme]);

  const count = (theme: string) => publications.filter((p) => p.theme === theme).length;

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter publications by theme">
        <button
          type="button"
          className={styles.filter}
          aria-pressed={active.length === 0}
          disabled={!interactive}
          onClick={() => setActive([])}
        >
          All
          <span className={styles.count}>{publications.length}</span>
        </button>
        {themes.map((t) => (
          <button
            key={t}
            type="button"
            className={styles.filter}
            aria-pressed={active.includes(t)}
            disabled={!interactive}
            onClick={() => toggle(t)}
          >
            {t}
            <span className={styles.count}>{count(t)}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" role="status">
        {interactive
          ? `Showing ${shown.length} of ${publications.length} publications${active.length ? `: ${active.join(", ")}` : ""}`
          : ""}
      </p>
      <ol className={styles.list}>
        {shown.map((p) => (
          <li key={p.id}>
            <PublicationEntry pub={p} />
          </li>
        ))}
      </ol>
    </>
  );
}
