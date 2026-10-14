"use client";

import { useSearchParams } from "next/navigation";
import { themeSlug, type Publication } from "@/lib/publications";
import { PublicationEntry } from "./PublicationEntry";
import styles from "./Publications.module.css";

type Props = { publications: Publication[]; themes: string[] };

/** Filter chips + list. The active theme lives in ?theme= so research cards can deep-link to it. */
export function PublicationExplorer({ publications, themes }: Props) {
  const params = useSearchParams();
  const requested = params.get("theme");
  const active = themes.find((t) => themeSlug(t) === requested) ?? null;
  return <PublicationListView publications={publications} themes={themes} active={active} interactive />;
}

export function PublicationListView({
  publications,
  themes,
  active,
  interactive = false,
}: Props & { active: string | null; interactive?: boolean }) {
  const shown = active ? publications.filter((p) => p.theme === active) : publications;

  const select = (theme: string | null) => {
    const url = new URL(window.location.href);
    if (theme) url.searchParams.set("theme", themeSlug(theme));
    else url.searchParams.delete("theme");
    // Next.js syncs useSearchParams with native history updates; no scroll, no reload.
    window.history.replaceState(null, "", `${url.pathname}${url.search}#publications`);
  };

  const options: { label: string; value: string | null; count: number }[] = [
    { label: "All", value: null, count: publications.length },
    ...themes.map((t) => ({ label: t, value: t, count: publications.filter((p) => p.theme === t).length })),
  ];

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter publications by theme">
        {options.map((o) => (
          <button
            key={o.label}
            type="button"
            className={styles.filter}
            aria-pressed={active === o.value}
            disabled={!interactive}
            onClick={() => select(o.value)}
          >
            {o.label}
            <span className={styles.count}>{o.count}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" role="status">
        {interactive ? `Showing ${shown.length} of ${publications.length} publications${active ? ` on ${active}` : ""}` : ""}
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
