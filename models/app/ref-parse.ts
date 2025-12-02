import { refType } from '@/models/app/reference';

export type refParseType = {
  stringRef: string,
  book: string;
  chapter: number;
  verseIds: number[] | null;
};

export type splitHintType = {
  id: number;
  splitHint: string;
  refs?: refType[];
};
