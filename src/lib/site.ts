/** Deployment settings, read from NEXT_PUBLIC_* env vars at build time. See .env.example. */

const trimSlash = (s: string) => s.replace(/\/+$/, "");

export const basePath = trimSlash(process.env.NEXT_PUBLIC_BASE_PATH ?? "");

/** Public origin + base path, e.g. https://user.github.io/niloy-portfolio */
export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

export const hidePlaceholders = process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS === "true";

/** Prefix a public/ asset path with the base path (needed for <a> and unoptimised images). */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for a route, for canonical links and structured data. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
