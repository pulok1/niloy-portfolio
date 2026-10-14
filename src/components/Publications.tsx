import { Suspense } from "react";
import { publications, themesOf } from "@/lib/publications";
import { PublicationExplorer, PublicationListView } from "./PublicationExplorer";

export function Publications() {
  const themes = themesOf(publications);
  return (
    // The fallback is the full, unfiltered list, so the static HTML always contains every paper.
    <Suspense fallback={<PublicationListView publications={publications} themes={themes} active={null} />}>
      <PublicationExplorer publications={publications} themes={themes} />
    </Suspense>
  );
}
