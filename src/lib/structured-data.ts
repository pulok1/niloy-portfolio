import { profile } from "@/content/profile";
import { methodGroups } from "@/content/research";
import { isFilled } from "./placeholder";
import { doiUrl, isAuthorNote, type Publication } from "./publications";
import { MONTHS } from "./schema";
import { absoluteUrl } from "./site";

const university = {
  "@type": "CollegeOrUniversity",
  name: "University of Chittagong",
  address: { "@type": "PostalAddress", addressLocality: "Chittagong", addressCountry: "BD" },
};

/** schema.org Person. Only filled-in profile links are included in sameAs. */
export function personJsonLd() {
  const sameAs = [
    profile.orcid.href,
    profile.scopus.href,
    ...[profile.linkedin, profile.googleScholar, profile.researchGate].filter(isFilled).map((p) => p.value),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: profile.name,
    url: absoluteUrl("/"),
    description: profile.tagline,
    jobTitle: profile.role,
    affiliation: { ...university, department: { "@type": "Organization", name: "Department of Chemistry" } },
    alumniOf: university,
    ...(profile.lab ? { memberOf: { "@type": "Organization", name: profile.lab } } : {}),
    identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: profile.orcid.id },
    sameAs,
    knowsAbout: methodGroups.flatMap((g) => g.items.filter((i) => i.match.length > 0).map((i) => i.label)),
    ...(isFilled(profile.email) ? { email: `mailto:${profile.email.value}` } : {}),
    // siteUrl already includes any base path, so the raw public/ path is used here.
    ...(isFilled(profile.photo) ? { image: absoluteUrl(profile.photo.value) } : {}),
  };
}

/** schema.org ScholarlyArticle for a paper detail page. */
export function articleJsonLd(pub: Publication, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": pub.type === "Book chapter" ? "Chapter" : "ScholarlyArticle",
    headline: pub.title,
    name: pub.title,
    datePublished: pub.month ? `${pub.year}-${String(MONTHS.indexOf(pub.month) + 1).padStart(2, "0")}` : String(pub.year),
    url: absoluteUrl(path),
    sameAs: doiUrl(pub.doi),
    identifier: { "@type": "PropertyValue", propertyID: "DOI", value: pub.doi },
    author: pub.authors.filter((a) => !isAuthorNote(a)).map((name) => ({ "@type": "Person", name })),
    isPartOf: {
      "@type": pub.type === "Book chapter" ? "Book" : "Periodical",
      name: pub.journal ?? pub.bookTitle,
      ...(pub.publisher ? { publisher: { "@type": "Organization", name: pub.publisher } } : {}),
    },
    abstract: pub.summary,
    keywords: pub.methods.filter((m) => !/VERIFY|TODO/.test(m)).join(", "),
    ...(pub.openAccess ? { isAccessibleForFree: true } : {}),
  };
}
