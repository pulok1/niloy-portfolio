import type { MetadataRoute } from "next";
import { publications } from "@/lib/publications";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...publications.map((p) => ({
      url: absoluteUrl(`/research/${p.id}/`),
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
