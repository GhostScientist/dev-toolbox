import { z } from 'zod';

export const toolSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  website: z.string().url(),
  category: z.enum(['AI', 'Backend', 'Build', 'CLI', 'Cloud', 'Collab', 'Data', 'DevEx', 'Frontend', 'Infra', 'Mobile', 'Observability', 'Performance', 'Security', 'Testing', 'UX']),
  tags: z.array(z.string()).min(1),
  summary: z.string().max(200),
  why: z.string(),
  pricing: z.enum(['Free', 'Freemium', 'Paid', 'Open Source']),
  getting_started: z.string(),
  added_by: z.object({
    name: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
  github: z.string().url().optional(),
  docs: z.string().url().optional(),
});

export const tipFrontmatterSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  category: z.enum(['AI', 'Backend', 'Build', 'CLI', 'Cloud', 'Collab', 'Data', 'DevEx', 'Frontend', 'Infra', 'Mobile', 'Observability', 'Performance', 'Security', 'Testing', 'UX']),
  tags: z.array(z.string()).min(1),
  added_by: z.object({
    name: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
  summary: z.string().max(200).optional(),
});

export type Tool = z.infer<typeof toolSchema>;
export type TipFrontmatter = z.infer<typeof tipFrontmatterSchema>;

export interface Tip extends TipFrontmatter {
  content: string;
}