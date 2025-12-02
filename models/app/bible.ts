// import { bookSketchType } from '@/models/book-sketch';

import { bookSketchType } from '@/schemas/app/book-sketch-schema';

export type bibleType = {
  id: number;
  book: string;
  abbrev: string;
  verses: bibleVerseType[];
  sketches: bookSketchType[];
};

export type bibleType1 = {
  id: number;
  book: string;
  abbrev: string;
};

export interface bibleBookJsonInfo {
  id: number;
  fileName: string;
  fullPath: string;
  abbrev: string;
  chaptersCount: number;
}

// export type bibleBookJsonType1 = {
//   id: number;
//   book: string;
//   abbrev: string;
//   path: string;
// };

// export type bibleBookJsonType2 = {
//   abbrev: string;
//   chapters: string[][];
//   name: string;
// };

export type bibleBookJsonType3 = {
  abbrev: string;
  chapter: string;
  verseId1: string;
  verseId2: string;
};

export type bibleBookJsonType4 = {
  abbrev: string;
  chapter: string;
  verses: verseSelectionType[];
};

export type bibleBookJsonParamsType = {
  id: number;
  abbrev: string;
  name: string;
  chaptersCount: number;
};

export type bibleVerseType = {
  id: number;
  bibleBook: bibleType;
  chapterId: number;
  verseId: number;
  verse: string;
};

export type bibleVerseType2 = {
  id: number;
  bibleBookId: number;
  chapterId: number;
  verseId: number;
  verse: string;
  book?: string;
};

export type bibleVerseType3 = {
  stringRef: string,
  book: string,
  bibleBookId: number,
  chapterId: number,
  verses: verseSelectionType[];
};

export type bibleVerseType4 = {
  stringRef: string,
  verses: verseSelectionType[];
};

export type verseSelectionType = {
  id: number;
  verseId: number;
  verse: string;
};

export type bibleSearch = {
  book: string;
  chapter: number;
  verseId: number;
  verse: string;
};
