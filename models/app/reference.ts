import { verseSelectionType } from '@/models/app/bible';

export type refType = {
  id: number;
  stringRef: string;
  verse: string;
};

export type refDbType = {
  id: number;
  stringRef: string;
  refIds?: refIdDbType[];
};

export type refIdDbType = {
  id: number;
  bibleVerse: verseSelectionType;
};
