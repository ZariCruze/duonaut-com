import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const droga = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/droga' }),
  schema: z.object({
    title: z.string(),
    stage: z.enum(['kompetencja', 'implementacja', 'ewolucja']),
    order: z.number(),
    summary: z.string(),
    description: z.string(),
    lead: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    next: z.string().optional(),
  }),
});

const warsztat = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/warsztat' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    tagline: z.string(),
    summary: z.string(),
    description: z.string(),
    lead: z.string(),
    before: z.string(),
    after: z.string(),
    forClient: z.string(),
  }),
});

export const collections = { droga, warsztat };
