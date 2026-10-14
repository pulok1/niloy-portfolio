import { z } from "zod";

/** Runtime schema for publications.json. The build fails if the file drifts from it. */
export const publicationSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "ids must be URL-safe (lowercase, digits, dashes)"),
  featured: z.boolean(),
  year: z.number().int().min(1900).max(2100),
  title: z.string().min(1),
  /** Optional title with <sub>/<sup>/<i> markup for chemical formulas. */
  titleHtml: z.string().optional(),
  journal: z.string().min(1),
  publisher: z.string().min(1),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  articleNumber: z.string().optional(),
  doi: z.string().regex(/^10\.\d{4,9}\/\S+$/, "DOI must look like 10.xxxx/…"),
  openAccess: z.boolean().optional(),
  authorPosition: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1),
  theme: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string()),
  methods: z.array(z.string()),
});

export const personSchema = z.object({
  name: z.string().min(1),
  orcid: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/),
  scopusAuthorId: z.string().regex(/^\d+$/),
  affiliation: z.string().min(1),
});

export const dataFileSchema = z.object({
  person: personSchema,
  publications: z.array(publicationSchema),
});

export type Publication = z.infer<typeof publicationSchema>;
export type Person = z.infer<typeof personSchema>;
export type DataFile = z.infer<typeof dataFileSchema>;
