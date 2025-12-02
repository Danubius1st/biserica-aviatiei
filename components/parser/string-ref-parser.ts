import { bibleBookJsonType3 } from '@/models/app/bible';

export const stringRefParser = (stringRef: string) => {
  if (stringRef) {
    // abbrev
    const lastSpaceIndex = stringRef.lastIndexOf(' ');
    const abbrev = lastSpaceIndex !== -1 ? stringRef.slice(0, lastSpaceIndex).trim() : '';

    // chapter
    const nos = stringRef.slice(lastSpaceIndex + 1).trim();
    const colonIndex = nos.indexOf(':');
    const chapter = colonIndex !== -1 ? nos.slice(0, colonIndex).trim() : '';

    // verseId1, verseId2
    const range = colonIndex !== -1 ? nos.slice(colonIndex + 1).trim() : '';
    const verseIds = range.split('÷');
    const verseId1 = verseIds[0];
    const verseId2 = verseIds[1] || verseIds[0];

    const result: bibleBookJsonType3 = {
      abbrev,
      chapter,
      verseId1,
      verseId2
    };

    return result;
  } else {
    return {
      abbrev: '',
      chapter: '',
      verseId1: '',
      verseId2: ''
    } as bibleBookJsonType3;
  }
};
