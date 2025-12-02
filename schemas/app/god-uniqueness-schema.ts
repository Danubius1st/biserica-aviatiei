import * as z from 'zod';

const RefTypeSchema = z.object({
  id: z.number().positive().int(),
  stringRef: z.string().min(1, 'Referința nu poate fi goală'),
  verse: z.string().min(1, 'Versetul nu poate fi gol'),
});

export const GodUniquenessTypeSchema = z.object({
  id: z.number().positive().int(),
  description: z.string().min(1, 'Unicitatea lui Dumnezeu nu poate fi goală'),
  refs: z.array(RefTypeSchema),
});

export type godUniquenessType = z.infer<typeof GodUniquenessTypeSchema>;
// export type RefType = z.infer<typeof refTypeSchema>;
