import { dbApp as db } from '@/lib/prisma/db-app';
import { refParseType } from '@/models/app/ref-parse';
import { refDbType } from '@/models/app/reference';

const generateVerseList = (chapterVerses: string) => {
  const rangePattern: RegExp = /\d+/g;
  const match = chapterVerses.match(rangePattern);

  if (match) {
    const startVerse = parseInt(match[1], 10);
    const endVerse =
      match[2] === undefined ? startVerse : parseInt(match[2], 10);
    if (startVerse <= endVerse) {
      return Array.from(
        { length: endVerse - startVerse + 1 },
        (_, index) => startVerse + index
      );
    } else {
      // console.log(`\x1b[33mparse-text-with-ref.ts -> generateVerseList: Invalid verse range: ${JSON.stringify(chapterVerses)}\x1b[0m`);
    }
  }

  return null;
};

const bibleVerses = async (ref: refParseType): Promise<refDbType> => {
  try {
    const verses = await db.bibleVerse?.findMany({
      where: {
        bibleBook: {
          abbrev: ref.book,
        },
        // bibleBookId: bibleBookId?.id,
        chapterId: ref.chapter,
        verseId: {
          // gte: ref.verseIds![0],
          // lte: ref.verseIds![ref.verseIds!.length - 1],
          in: ref.verseIds?.map((v) => v),
        },
      },
      orderBy: {
        verseId: 'asc',
      },
      select: {
        id: true,
        verseId: true,
        verse: true,
      },
    });

    return {
      id: 0,
      stringRef: ref.stringRef,
      refIds: verses.map((verse: {
        id: number;
        verseId: number;
        verse: string;
      }) => ({
        id: verse.id,
        bibleVerse: {
          id: verse.id,
          verseId: verse.verseId,
          verse: verse.verse,
        },
      })),
    };
  } catch (error) {
    console.error('Error fetching from BibleVerse:', error);

    return {
      id: 0,
      stringRef: ref.stringRef,
      refIds: [
        {
          id: 0,
          bibleVerse: {
            id: 0,
            verseId: 0,
            verse: 'Versetul nu face parte biblia canonică.',
          },
        },
      ],
    };
  }
};

export const parseTextWithRef = async (ref: string): Promise<refDbType> => {
  const chapterVersesPattern = /(\d+:\d+).*$/;
  const chapterPattern: RegExp = /^(\d+:)/;

  const book = ref.replace(chapterVersesPattern, '').trim();
  const chapterVerses = ref.replace(book, '').trim();
  const chapterMatch = chapterVerses.match(chapterPattern);
  const chapter = chapterMatch ? chapterMatch[1] : '';

  // console.log(`parse-text-with-ref.ts -> book: \x1b[32m${JSON.stringify(book)}\x1b[0m`);
  // console.log(`parse-text-with-ref.ts -> chapterVerses: \x1b[32m${JSON.stringify(chapterVerses)}\x1b[0m`);
  // console.log(`parse-text-with-ref.ts -> chapter: \x1b[32m${JSON.stringify(chapter)}\x1b[0m`);
  // console.log(`parse-text-with-ref.ts -> chapterVerses: \x1b[32m${JSON.stringify(chapterVerses)}\x1b[0m`);
  const versesList = generateVerseList(chapterVerses);
  // console.log(`\x1b[32mparse-text-with-ref.ts -> versesList: ${JSON.stringify(versesList)}\x1b[0m`);

  const res: refParseType = {
    stringRef: ref,
    book,
    chapter: parseInt(chapter, 10),
    verseIds: versesList,
  };
  // console.log(`\x1b[36mparse-text-with-ref.ts -> res: ${JSON.stringify(res)}\x1b[0m`);

  const bibleVersesList = await bibleVerses(res);
  // console.log(`parse-text-with-ref.ts -> bibleVersesList: ${JSON.stringify(bibleVersesList)}`);

  const refData: refDbType = {
    id: 0,
    stringRef: ref,
    refIds: bibleVersesList.refIds?.map((v) => ({
      id: 0,
      bibleVerse: {
        id: v.id,
        verseId: v.bibleVerse.verseId,
        verse: v.bibleVerse.verse,
      },
    })),
  };

  return refData;
};
