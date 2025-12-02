import z from 'zod';

export const BibleBookJsonType1Schema = z.object({
  id: z.number().int().positive(),
  book: z.string().min(1),
  abbrev: z.string().min(1),
  path: z.string().min(1),
});

export const BibleBookJsonType2Schema = z.object({
  abbrev: z.string().min(1).max(7),
  chapters: z.array(
    z.array(z.string().min(1)).min(1)
  ),
  name: z.string().min(3),
});

export type bibleBookJsonType1 = z.infer<typeof BibleBookJsonType1Schema>;
export type bibleBookJsonType2 = z.infer<typeof BibleBookJsonType2Schema>;
