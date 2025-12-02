import * as z from 'zod';

const MAX_HINT_LENGTH = 750;

const BookSketchHintSchema = z.object({
  id: z.number().int().positive(),
  hint: z.string()
    .min(1, 'Indicația nu poate fi goală')
    .max(MAX_HINT_LENGTH, `Indicația nu poate depăși ${MAX_HINT_LENGTH} caractere`)
});

const SketchSchema = z.object({
  id: z.number().int().positive(),
  sketch: z.string().min(1, 'Schița nu poate fi goală'),
  hints: z.array(BookSketchHintSchema)
  // .nonempty('Trebuie cel puțin o indicație')
});

export const BookSketchSchema = z.object({
  id: z.number().int().positive(),
  book: z.string().min(1, 'Numele cărții nu poate fi gol'),
  sketches: z.array(SketchSchema).nonempty('Trebuie cel puțin o schiță')
});

export const BookSketchSearchSchema = z.object({
  id: z.number().int().positive(),
  book: z.string().min(1)
});

export type bookSketchHintType = z.infer<typeof BookSketchHintSchema>;
export type sketchType = z.infer<typeof SketchSchema>;
export type bookSketchType = z.infer<typeof BookSketchSchema>;
export type bookSketchSearchType = z.infer<typeof BookSketchSearchSchema>;
