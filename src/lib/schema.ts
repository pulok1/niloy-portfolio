import { z } from "zod";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** Runtime schema for publications.json. The build fails if the file drifts from it. */
export const publicationSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, "ids must be URL-safe (lowercase, digits, dashes)"),
    featured: z.boolean(),
    type: z.enum(["Journal article", "Book chapter"]).default("Journal article"),
    year: z.number().int().min(1900).max(2100),
    month: z.enum(MONTHS).optional(),
    title: z.string().min(1),
    /** Optional title with <sub>/<sup>/<i> markup for chemical formulas and species names. */
    titleHtml: z.string().optional(),
    journal: z.string().min(1).optional(),
    bookTitle: z.string().min(1).optional(),
    publisher: z.string().min(1).optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    articleNumber: z.string().optional(),
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/, "DOI must look like 10.xxxx/…"),
    researchGateUrl: z.url().optional(),
    openAccess: z.boolean().optional(),
    authorPosition: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    theme: z.string().min(1),
    summary: z.string().min(1),
    highlights: z.array(z.string()),
    methods: z.array(z.string()),
  })
  .refine((p) => (p.type === "Book chapter" ? !!p.bookTitle : !!p.journal), {
    message: "journal articles need `journal`; book chapters need `bookTitle`",
  });

export const personSchema = z.object({
  name: z.string().min(1),
  orcid: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/),
  scopusAuthorId: z.string().regex(/^\d+$/),
  researchGate: z.url().optional(),
  linkedIn: z.url().optional(),
  affiliation: z.string().min(1),
  lab: z.string().min(1).optional(),
  /** Profile counters copied by hand (never fetched). `source` says where and when. */
  stats: z
    .object({
      source: z.string().min(1),
      publications: z.number().int().nonnegative().optional(),
      citations: z.number().int().nonnegative().optional(),
      reads: z.number().int().nonnegative().optional(),
    })
    .optional(),
});

export const awardSchema = z.object({
  title: z.string().min(1),
  event: z.string().min(1).optional(),
  /** A year, or a "TODO: …" note while unconfirmed. */
  year: z.string().min(1).optional(),
});

export const courseSchema = z.object({
  title: z.string().min(1),
  provider: z.string().min(1).optional(),
  year: z.string().min(1).optional(),
});

export const dataFileSchema = z.object({
  person: personSchema,
  awards: z.array(awardSchema).default([]),
  courses: z.array(courseSchema).default([]),
  publications: z.array(publicationSchema),
  notes: z.string().optional(),
});

export type Publication = z.infer<typeof publicationSchema>;
export type Person = z.infer<typeof personSchema>;
export type Award = z.infer<typeof awardSchema>;
export type Course = z.infer<typeof courseSchema>;
export type DataFile = z.infer<typeof dataFileSchema>;
