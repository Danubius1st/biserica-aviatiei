import * as z from 'zod';

const RefTypeSchema = z.object({
  id: z.number().int().positive(),
  stringRef: z.string().min(1),
  verse: z.string().min(1)
});

export const GodNameTypeSchema = z.object({
  id: z.number().int().positive(),
  godName: z.string().min(1),
  translation: z.string().min(1),
  refs: z.array(RefTypeSchema).optional()
});

export type refType = z.infer<typeof RefTypeSchema>;
export type godNameType = z.infer<typeof GodNameTypeSchema>;
