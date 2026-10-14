import { profile } from "@/content/profile";

/** Shared Open Graph image (rendered by src/app/og.png/route.tsx). Relative to metadataBase. */
export const ogImage = {
  url: "og.png",
  width: 1200,
  height: 630,
  alt: `${profile.name}, computational chemistry researcher, University of Chittagong`,
  type: "image/png",
};
