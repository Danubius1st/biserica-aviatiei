import {
  BibleBook,
  PrismaClient
} from '@/prisma/generated/prisma-db-app/client';
import fs from 'fs';

import { dictionary } from '@/config/dictionary';
import { parseTextWithRef } from '@/components/parser/parse-text-with-ref';
// import { godNames } from '@/config/godNames';
// import { useState } from 'react';
// import { bibleVerseType } from '@/models/bible';

const db = new PrismaClient();
const url = './public/data/bible/';

type refType = {
  ref: string;
  verse: string;
};

type hintType = {
  res: string;
  ref?: string;
  verse?: string;
};

type hType = {
  hint: string;
  // refs?: refType[];
};

type godNameRefType = {
  ref: string;
  verse: string;
};

/*
const listDirectories = (pth: string) => {
  const { readdirSync } = require('fs');

  return readdirSync(pth, { withFileTypes: true })
    .filter((dirent: { isDirectory: () => any; }) => dirent.isDirectory())
    .map((dirent: { name: any; }) => dirent.name);
};
*/

const extractBookNo = (fileName: string): number | null => {
  const match = fileName.match(/(\d+)/); // Extrage orice secvență de cifre din numele fișierului

  if (match) {
    const number = parseInt(match[0], 10); // Convertiți secvența de cifre într-un număr întreg
    return isNaN(number) ? null : number; // Verificați dacă conversia a reușit
  }

  return null; // În cazul în care nu există nicio secvență de cifre în nume
};

const SeedBible = async () => {
  // P2024: Timed out fetching a new connection from the connection pool
  const filenames = fs.readdirSync(url);

  // await db.bibleBook.deleteMany();
  // await db.bibleVerse.deleteMany();

  filenames.map(book => {
    /*
    console.log(book);
    const rawData = fs.readFileSync(url + book, 'utf8');
    const jsonData = JSON.parse(rawData);
    console.log(jsonData);
    */

    fs.readFile(url + book, 'utf8', async (err, data) => {
      // console.log(book);

      try {
        type chapterVerse = {
          chapter: number;
          verse: string;
        };

        const jsonData = JSON.parse(data);
        // console.log(jsonData);
        for (const d of jsonData) {
          // console.log(d);
          const verses: chapterVerse[] = [];

          let chapterNo = 0;
          d.chapters.map(async (ch: string[]) => {
            // console.log(ch);
            chapterNo++;
            // let verseNo = 0;
            ch.map(verse => {
              // verseNo++;
              // console.log(`${chapterNo}: ${verseNo}: ${verse}`);
              const item: chapterVerse = {
                chapter: chapterNo,
                verse
              };
              verses.push(item);
              // console.log(item);
            });

            // const item = await db.bibleBook.create({
            //   data: {
            //     book: d.name,
            //     abbrev: d.abbrev,
            //     verses: {
            //       create: verses
            //     }
            //   }
            // });
            // console.log('--------------------\n', item);
          });
          // console.log('verses: ', verses);
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
};

const seedBibleBook = () => {
  // await db.bibleBook.deleteMany();

  const filenames = fs.readdirSync(url);

  filenames.map(book => {
    fs.readFile(url + book, 'utf8', async (err, data) => {
      try {
        const jsonData = JSON.parse(data);
        for (const d of jsonData) {
          // console.log(d.name);
          const item = await db.bibleBook.create({
            data: {
              book: d.name,
              abbrev: d.abbrev,
            }
          });
          console.log('--------------------\n', item);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const seedBibleBookIndex = () => {
  // await db.bibleBook.deleteMany();

  const book = url + 'index.json';
  fs.readFile(book, 'utf8', async (err, data) => {
    try {
      const jsonData = JSON.parse(data);
      for (const d of jsonData) {
        // console.log(d);
        const item = await db.bibleBook.create({
          data: {
            book: d.book,
            abbrev: d.abbrev,
          }
        });
        console.log('--------------------\n', item);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const seedBibleVerse = async (Book: number, Chapter: number) => {
  // await db.bibleVerse.deleteMany();

  // P2024: Timed out fetching a new connection from the connection pool
  const filenames = fs.readdirSync(url);
  // console.log(filenames);

  filenames.map(book => {
    if (book !== 'index.json') {
      // console.log(book);
      fs.readFile(url + book, 'utf8', async (err, data) => {
        const bookNo = extractBookNo(book);

        if (Book === bookNo) {
          // console.log(`seedBibleVerse: Book: ${bookNo}, Chapter: ${Chapter}`);
          try {
            const jsonData = JSON.parse(data);
            // console.log('seedBibleVerse: jsonData', jsonData);

            let versesNo = 0;
            const existingBook = await db.bibleBook.findUnique({
              where: {
                id: bookNo!
              },
            });

            if (existingBook) {
              console.log('seedBibleVerse: Existing Book', existingBook.book);

              jsonData.chapters.forEach(async (ch: string[], chapterNo: number) => {
                // console.log(`\nCap. ${chapterNo + 1}:`, ch);
                // console.log(`\nCap. ${chapterNo + 1}:\n-----------`);

                if (chapterNo === Chapter - 1) {
                  ch.forEach(async (verse: string, verseNo: number) => {
                    // console.log(`${verseNo + 1}`, v);
                    // console.log(`------ ${v} ------`);

                    const item = await db.bibleVerse.create({
                      data: {
                        chapterId: chapterNo + 1,
                        verseId: verseNo + 1,
                        verse,
                        bibleBookId: bookNo
                      },
                    });
                    console.log('--------------------\n', item, ++versesNo);
                  });
                }
              });
            } else {
              console.log('No more books');
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  });
};

const seedBibleVerseWithChapterCounter = async (Book: number) => {
  const FILE_PATH = './counter.txt';

  const readChapterFromFile = (): number => {
    try {
      const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
      return fileContent ? parseInt(fileContent, 10) : 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const writeChapterToFile = (chapter: number): void => {
    fs.writeFileSync(FILE_PATH, chapter.toString(), 'utf-8');
  };

  const incrementChapter = (): number => {
    const currentChapter = readChapterFromFile();
    const newChapter = currentChapter + 1;
    writeChapterToFile(newChapter);
    return newChapter;
  };

  const chapter = incrementChapter();
  console.log(`Book: ${Book}, chapter: ${chapter}`);
  seedBibleVerse(Book, chapter);
};

/*
const SeedCovenants = async () => {
  const response = await fetch('/public/data/covenants.json');
  const data = await response.json();

  if (data) {
    await db.covenant.deleteMany();

    for (const d of data) {
      const item = await db.covenant.create({
        data: {
          covenant: d.covenant,
          ref: d.ref,
        },
      });
      console.log('--------------------\n', item);
    }
  }
};

const seedCovenantRef = async () => {
  const verseIds = [2559, 2571, 2578, 2564, 2560, 2570]; // 1
  const items = await Promise.all(
    verseIds.map(async (verseId) => {
      const item = await db.covenantRef.create({
        data: {
          covenantId: 1,
          bibleVerseId: verseId,
        },
      });
      // console.log('--------------------\n', item);
      return item;
    })
  );
  console.log('Rezultate createMany:', items);
};

const SeedCovenantRefIds = async () => {
  try {
    const source = await db.covenantRef.findMany();

    const destination = await db.covenantRefId.createMany({
      data: source.map(data => ({
        covenantRefId: data.covenantId,
        bibleVerseId: data.bibleVerseId,
      }))
    });

    console.log('Datele au fost copiate cu succes.');
  } catch (error) {
    console.error('A apărut o eroare:', error);
  }
};

const seedCovenantBibleRef1 = async (id1: number, id2: number) => {
  const item = await db.covenantRef.create({
    data: {
      covenantId: id1,
      bibleVerseId: id2,
    },
  });
  console.log('--------------------\n', item);
};
*/

const seedDictionary = async () => {
  await db.dictionary.deleteMany();

  for (const d of dictionary) {
    const item = await db.dictionary.create({
      data: {
        word: d.word,
        translation: d.translation,
        explanation: d.explanation,
      },
    });
    console.log('--------------------\n', item);
  }
};

const deleteHeresyHintRef = async () => {
  await db.heresyHintRef.deleteMany({
    where: {
      heresyHintId: 19
    }
  });
};

/*
const SeedDiscrepancies = async () => {
const response = await fetch('/public/data/discrepancies.json');
const data = await response.json();

if (data) {
// await db.discrepancy.deleteMany();
// await db.discrepancyRef.deleteMany();
// await db.discrepancyHint.deleteMany();

for (const d of data) {
const refs2: refType[] = [];
const hints2: hType[] = [];

d.refs.map((r: refType) => {
  const item: refType = {
    ref: r.ref,
    verse: r.verse,
  };
  refs2.push(item);
  // console.log('--------------------\n', r);
});

d.hints?.map((h: any) => {
  const href: refType[] = [];
  h.refs?.map((r: refType) => {
    const item: refType = {
      ref: r.ref,
      verse: r.verse
    };
    href.push(item);
  });
  const item: hType = {
    hint: h.hint,
    // refs: href
  };
  hints2.push(item);

  // console.log('--------------------\n', h);
});

await db.discrepancy.create({
  data: {
    discrepancy: d.discrepancy,
    refs: { create: refs2 },
    hints: { create: hints2 }
  },
});

// console.log('--------------------\n', refs2);
// console.log('--------------------\n', hints2);
// hints2.map(h => {
//   console.log('--------------------\n', h);
// });
}
}

// await db.discrepancy.createMany({
//   data: discrepancies
// });
};
*/

const SeedGodCelebration = async () => {
  const response = await fetch('/public/data/godCelebrations.json');
  const data = await response.json();

  if (data) {
    // await db.godCelebration.deleteMany();

    for (const d of data) {
      const item = await db.godCelebration.create({
        data: {
          celebrationName: d.celebrationName,
        },
      });
      console.log('--------------------\n', item);
    }
  }
};

const SeedGodCelebrationRefIds = async () => {
  try {
    const source = await db.godCelebrationRef.findMany();

    const destination = await db.godCelebrationRefId.createMany({
      data: source.map(data => ({
        godCelebrationRefId: data.godCelebrationId,
        bibleVerseId: data.bibleVerseId,
      }))
    });

    console.log('Datele au fost copiate cu succes.');
  } catch (error) {
    console.error('A apărut o eroare:', error);
  }
};

/*
const seedGodNames = async () => {
  const url = './public/data/godNames.json';

  fs.readFile(url, 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // await db.godName.deleteMany();

    const jsonData = JSON.parse(data);

    for (const d of jsonData) {
      const ref2: godNameRefType[] = [];

      d.refs?.map((r: godNameRefType) => {
        const item: godNameRefType = {
          ref: r.ref,
          verse: r.verse,
        };
        ref2.push(item);
      });
      console.log('ref: ', ref2);

      await db.godName.create({
        data: {
          godName: d.godName,
          translation: d.translation,
          refs: { create: ref2 },
        },
      });
    }
  });
};
*/

// const SeedGodPromises = async () => {
//   const response = await fetch('/public/data/godPromises.json');
//   const data = await response.json();

//   if (data) {
//     // await db.godPromise.deleteMany();

//     for (const d of data) {
//       const item = await db.godPromise.create({
//         data: {
//           // promise: d.promise,
//           refs: d.ref,
//         },
//       });
//       console.log('--------------------\n', item);
//     }
//   }
// };

const SeedGodPromiseRefIds = async () => {
  try {
    const source = await db.godPromiseRefId.findMany();

    const destination = await db.godPromiseRefId.createMany({
      data: source.map(data => ({
        godPromiseRefId: data.godPromiseRefId,
        bibleVerseId: data.bibleVerseId,
      }))
    });

    console.log('Datele au fost copiate cu succes.');
  } catch (error) {
    console.error('A apărut o eroare:', error);
  }
};

const SeedMosesLaws = async () => {
  // const response = await fetch('/public/data/mosesLaws.json');
  // const data = await response.json();

  // if (data) {
  // await db.mosesLaw.deleteMany();

  // for (const d of data) {
  //   const item = await db.mosesLaw.create({
  //     data: {
  //       verse: d.verse,
  //       ref: d.ref,
  //     },
  //   });
  //   console.log('--------------------\n', item);
  // }
  // }

  const url = './public/data/mosesLaws.json';

  fs.readFile(url, 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // await db.mosesLaw.deleteMany();

    const jsonData = JSON.parse(data);

    for (const d of jsonData) {
      const ref2: refType[] = [];

      d.refs?.map((r: refType) => {
        const item: refType = {
          ref: r.ref,
          verse: r.verse,
        };
        ref2.push(item);
      });
      console.log('ref: ', ref2);

      // await db.mosesLaw.create({
      //   data: {
      //     // godName: d.godName,
      //     // translation: d.translation,
      //     refs: { create: ref2 },
      //   },
      // });
    }
  });
};

/*
const SeedMosesLawRefIds = async () => {
  try {
    const source = await db.mosesLawRef.findMany();

    const destination = await db.mosesLawRefId.createMany({
      data: source.map(data => ({
        mosesLawRefId: data.mosesLawId,
        bibleVerseId: data.bibleVerseId,
      }))
    });

    console.log('Datele au fost copiate cu succes.');
  } catch (error) {
    console.error('A apărut o eroare:', error);
  }
};

const SeedProphecies = async () => {
  const response = await fetch('/public/data/prophecies.json');
  const data = await response.json();

  if (data) {
    // await db.prophecie.deleteMany();

    for (const d of data) {
      const item = await db.prophecy.create({
        data: {
          prophecy: d.prophecy,
          ref: d.ref,
          fulfilled: d.fulfilled,
          history: d.history,
        },
      });
      console.log('--------------------\n', item);
    }
  }
};

const SeedProphecyRefIds = async () => {
  try {
    const source = await db.prophecyRef.findMany();

    const destination = await db.prophecyRefId.createMany({
      data: source.map(data => ({
        prophecyRefId: data.prophecyId,
        bibleVerseId: data.bibleVerseId,
      }))
    });

    console.log('Datele au fost copiate cu succes.');
  } catch (error) {
    console.error('A apărut o eroare:', error);
  }
};

const SeedTopics = async () => {
  const [topics, setTopics] = useState<topicType[]>();
  const fetchJson = () => {
    fetch('/public/data/topics.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTopics(data);
      });
  };

  fetchJson();

  if (topics) {
    // await db.topics.deleteMany();
    // await db.questionRef.deleteMany();
    // await db.questionHint.deleteMany();

    for (const t of topics) {
      const ref2: refType[] = [];
      const hint2: hintType[] = [];

      t?.refs?.map((r) => {
        const item: refType = {
          ref: r.ref,
          verse: r.verse,
        };
        ref2.push(item);
      });
      console.log('ref: ', ref2);

      t?.hints?.map((h) => {
        const item: hintType = {
          res: h.res,
          ref: h.ref,
          verse: h.verse,
        };
        hint2.push(item);
      });
      console.log('hint: ', hint2);

      await db.topic.create({
        data: {
          ord: t.ord,
          question: t.question,
          refs: { create: ref2 },
          hints: { create: hint2 },
        },
      });
    }
  }
};
*/

// ====================================================
const getBibleBooks = async () => {
  try {
    const bibleBooks = await db.bibleBook?.findMany({
      select: {
        id: true,
        book: true,
        abbrev: true,
        verses: {
          select: {
            id: true,
            bibleBookId: true,
            chapterId: true,
            verseId: true,
            verse: true
          }
        }
      },
      orderBy: {
        id: 'asc',
      }
    });

    console.log('bibleBooks: ', bibleBooks);
  } catch (error) {
    console.log('get-bible-books.ts (getBibleBooks): ', error);
  }
};

const getChaptersCount = async (bibleBookId: number) => {
  try {
    const distinctChapters = await db.bibleVerse?.findMany({
      where: {
        bibleBookId
      },
      select: {
        chapterId: true
      },
      distinct: ['chapterId'],
    });

    console.log('distinctChapters: ', distinctChapters?.length);
  } catch (error) {
    console.log('get-chapters-count.ts (getChaptersCount): ', error);
  }
};

const getChapterVerses = async (
  bibleBookId: number,
  chapterId: number
) => {
  try {
    const chapterVerses = await db.bibleVerse?.findMany({
      where: {
        bibleBookId,
        chapterId,
      },
      orderBy: {
        verseId: 'asc'
      }
    });

    console.log('chapterVerses: ', chapterVerses);
  } catch (error) {
    console.log('get-chapters-verses.ts (getChaptersVerses): ', error);
  }
};

// ====================================================

const readBibleBooks = async () => {
  const item = await db.bibleBook.findMany();
  console.log('--------------------\n', item);
};

const readBibleVerses = async (searchedText: string) => {
  const verses = await db.bibleVerse.findMany({
    where: {
      verse: {
        contains: searchedText
      },
    },
    orderBy: [
      {
        chapterId: 'asc'
      },
      {
        verseId: 'asc',
      }
    ],
    select: {
      chapterId: true,
      verseId: true,
      verse: true,
    },
  });

  console.log(verses);
};

const readBibleVersesByRef = async (ref: string) => {
  parseTextWithRef(ref);
};

const readBibleVerses2 = async () => {
  const verses = await db.bibleVerse.findMany({
    where: {
      bibleBook: {
        abbrev: 'Judc.',
      },
      // chapterId: 1,
    },
  });
  console.log('Verses found:', verses);
};

// const ReadCovenants = async () => {
//   const response = await fetch('/public/data/covenants.json');
//   const data = await response.json();

//   if (data) {
//     const item = await db.covenant.findMany({
//       select: {
//         id: true,
//         covenant: true,
//         ref: true,
//       },
//     });
//     console.log('--------------------\n', item);
//   }
// };

const readDictionary = async () => {
  const item = await db.dictionary.findMany({
    select: {
      id: true,
      word: true,
      translation: true,
      explanation: true,
    },
  });
  console.log('--------------------\n', item);
};

const readGodNames = async () => {
  const item = await db.godName.findMany({
    select: {
      id: true,
      // godName: true,
      nameOfGod: true,
      translation: true,
    },
  });
  console.log('--------------------\n', item);
};

const ReadDiscrepancies = async () => {
  const response = await fetch('/public/data/discrepancies.json');
  const data = await response.json();

  if (data) {
    const item = await db.discrepancy.findMany({
      select: {
        id: true,
        discrepancy: true,
      },
    });
  }
};
// ====================================================

const updateBibleBook = async () => {
  const filenames = fs.readdirSync(url);

  filenames.map(book => {
    const bookNo = extractBookNo(book);

    fs.readFile(url + book, 'utf8', async (err, data) => {
      try {
        const jsonData = JSON.parse(data);

        let chapterNo = 0;
        for (const d of jsonData) {
          chapterNo++;
          // console.log(d);
          const existingBook = await db.bibleBook.findUnique({
            where: {
              id: bookNo!
            },
          });

          if (existingBook) {
            // console.log(existingBook);

            const item = await db.bibleBook.update({
              data: {
                // book: '- ' + d.name,
                book: d.name,
                // abbrev: '- ' + d.abbrev
                abbrev: d.abbrev
              },
              where: {
                id: bookNo!
              }
            });
            console.log('--------------------\n', item);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const updateBibleVerseChapterId = async (id: number, chapterId: number) => {
  //     const item = await db.covenant.findMany({
  //       select: {
  //         id: true,
  //         covenant: true,
  //         ref: true,
  //       },
  const item = await db.bibleVerse.findUnique({
    select: {
      id: true,
      chapterId: true,
      verseId: true,
      verse: true
    },
    where: {
      id
    }
  });
  console.log(`id: ${item?.id}, chapterId: ${item?.chapterId} => ${chapterId}, ${item?.verse}`);

  await db.bibleVerse.update({
    data: {
      chapterId
    },
    where: {
      id,
    },
  });
};

/*
const updateCovenantRef = async (id1: number, id2: number) => {
  const item = await db.covenantRef.update({
    where: {
      id: id1
    },
    data: {
      bibleVerseId: id2
    }
  });
};

const UpdateDiscrepancies = async () => {
  const response = await fetch('/public/data/discrepancies.json');
  const data = await response.json();

  if (data) {
    for (let i = 0; i < data.length; i++) {
      const ref2: refType[] = [];
      const hint2: hType[] = [];

      data[i].refs.map((r: refType) => {
        const item: refType = {
          ref: r.ref,
          verse: r.verse,
        };
        ref2.push(item);
      });
      console.log('ref: ', ref2);

      data[i].hints?.map((h: any) => {
        const item: hType = { hint: h.hint };
        hint2.push(item);
      });
      console.log('hint: ', hint2);

      await db.discrepancy.upsert({
        update: {
          discrepancy: data[i].discrepancy,
          // refs: data[i].refs
        },
        create: {
          discrepancy: data[i].discrepancy,
          refs: { create: ref2 },
          // hints: { create: hint2 },
        },
        where: {
          id: i + 1,
        },
      });
      console.log(data[i]);
    }
  }
};

const UpdateGodPromises = async () => {
  const response = await fetch('/public/data/godPromises.json');
  const data = await response.json();

  if (data) {
    for (let i = 0; i < data.length; i++) {
      await db.godPromise.upsert({
        update: {
          promise: data[i].promise,
          ref: data[i].ref,
        },
        create: {
          promise: data[i].promise,
          ref: data[i].ref,
        },
        where: {
          id: i + 1,
        },
      });
      console.log(data[i]);
    }
  };
};

const UpdateProphecies = async () => {
  const response = await fetch('/public/data/prophecies.json');
  const data = await response.json();

  if (data) {
    for (let i = 0; i < data.length; i++) {
      await db.prophecy.upsert({
        update: {
          prophecy: data[i].prophecie,
          ref: data[i].ref,
          fulfilled: data[i].fulfilled,
          history: data[i].history,
        },
        create: {
          prophecy: data[i].prophecie,
          ref: data[i].ref,
          fulfilled: data[i].fulfilled,
          history: data[i].history,
        },
        where: {
          id: i + 1,
        },
      });
      console.log(data[i]);
    }
  }
};
*/

// ====================================================

// const UpdateQuestionHint1 = async () => {
//   const copyResToHint = async (questionHintId: number) => {
//     const questionHint = await db.questionHint.findUnique({
//       where: { id: questionHintId },
//     });

//     if (questionHint) {
//       await db.questionHint.update({
//         where: { id: questionHintId },
//         data: {
//           hint: questionHint.hint,
//         },
//       });
//       console.log(`${questionHint.id}: ${questionHint.res}`);
//     }
//   };

//   for (let i = 0; i < 40; i++) {
//     copyResToHint(i);
//   }
// };

// const UpdateQuestionHint2 = async () => {
//   const copyResToHint = async (questionHintId: number) => {
//     const questionHint = await db.questionHint.findUnique({
//       where: { id: questionHintId },
//     });

//     if (questionHint) {
//       await db.questionHintRef.create({
//         data: {
//           ref: questionHint.ref!,
//           verse: questionHint.verse!,
//           questionHintId: questionHint.id
//         },
//       });
//       console.log(`${questionHint.id}: ${questionHint.res}`);
//     }
//   };

//   for (let i = 0; i < 40; i++) {
//     copyResToHint(i);
//   }
// };


/*
UPDATE Dictionary SET `word`=`name`;
select * from Dictionary;

UPDATE GodName SET `godName`=`name`;
select * from GodName;
*/

/*
const createTopics = async () => {
  // await db.topics.deleteMany();
  // await db.questionRef.deleteMany();
  // await db.questionHint.deleteMany();

  for (const t of topics) {
    await db.topic.create({
      data: {
        ord: t.ord,
        question: t.question,
        ref: {},
        hint: {},
      },
    });
  }
};

const updateAllTopics = async () => {
  for (const t of topics) {
    const ref2: refType[] = [];
    const hint2: hintType[] = [];

    // console.log('--------------------\n', t.id, t.ord, t.question);
    t.ref.map((r) => {
      const item: refType = { ref: r.ref, verse: r.verse };
      ref2.push(item);
    });
    // console.log('ref: ', ref2);

    t.hint.map((h) => {
      const item: hintType = { res: h.res, ref: h.ref, verse: h.verse };
      hint2.push(item);
    });
    // console.log('hint: ', hint2);

    await db.topic.update({
      data: {
        ref: { create: ref2 },
        hint: { create: hint2 },
      },
      where: {
        // id: t.id + 28,
        id: t.id,
      },
    });
  }
};

const addField = async () => {
  await db.$executeRaw`ALTER TABLE "Topics" ADD COLUMN "ord2" INTEGER;`;
};

const dropTable = async () => {
  await db.$executeRaw`DROP schema QuestionRef`;
};

const readTopics = async () => {
  const item = await db.topic.findMany({
    select: {
      id: true,
      question: true,
      ord: true,
      ref: true,
      hint: true,
    },
  });
  console.log('--------------------\n', item);
};

const readQuestionHint = async () => {
  const item = await db.questionHint.findFirst({
    cursor: {
      id: 2,
    },
  });
  console.log(item);
};

const readQuestionHints = async () => {
  // const result = await db.$queryRaw`SELECT name FROM dev.db WHERE type = "table";`
  const result = await db.$queryRaw`SELECT * FROM QuestionHint;`;
  console.log(result);
};

const readQuestionRefs = async () => {
  // const result = await db.$queryRaw`SELECT name FROM dev.db WHERE type = "table";`
  const result = await db.$queryRaw`SELECT * FROM QuestionRef;`;
  console.log(result);
};

const addQuestionHint21 = async () => {
  await db.questionHint.upsert({
    update: {
      res: topics[1].hint[0].res,
      ref: topics[1].hint[0].ref,
      verse: topics[1].hint[0].verse,
    },
    create: {
      res: '=====================',
      ref: '---------------------',
      verse: '.................',
    },
    where: {
      id: 2,
    },
  });
};

const addQuestionHint22 = async () => {
  // Added the record twice
  await db.questionHint.create({
    data: {
      res: topics[1].hint[1].res,
      ref: topics[1].hint[1].ref,
      verse: topics[1].hint[1].verse,
      topicId: 2,
    },
  });
};

const addQuestionRef41 = async () => {
  await db.questionRef.update({
    data: {
      ref: topics[3].ref[0].ref,
      verse: topics[3].ref[0].verse,
    },
    where: {
      id: 6,
    },
  });
};

const addQuestionHint41 = async () => {
  await db.questionHint.upsert({
    update: {
      res: topics[3].hint[0].res,
      ref: topics[3].hint[0].ref,
      verse: topics[3].hint[0].verse,
    },
    create: {
      res: '=====================',
      ref: '---------------------',
      verse: '.................',
    },
    where: {
      id: 4,
    },
  });
};

const addQuestionHint42 = async () => {
  await db.questionHint.upsert({
    update: {
      res: topics[3].hint[1].res,
      ref: topics[3].hint[1].ref,
      verse: topics[3].hint[1].verse,
      topicId: 4,
    },
    create: {
      res: '=====================',
      ref: '---------------------',
      verse: '.................',
    },
    where: {
      id: 22,
    },
  });
};

const readGodPromises = async () => {
  const item = await db.godPromise.findMany({
    select: {
      id: true,
      promise: true,
      ref: true,
    },
  });
  console.log('--------------------\n', item);
};
*/

async function main() {
  // seedBibleBookIndex();  // one at a time! (First one)
  seedBibleVerseWithChapterCounter(66); // (Book) (The second)

  // SeedBible();
  // seedBibleVerse(6, 1); // (Book, Chapter)

  // SeedCovenants();
  // seedCovenantRef();
  // SeedCovenantRefIds();
  // const verseIds = [, , , , , , ];
  // seedCovenantRef1(21, 28343);
  // seedDictionary();
  // SeedDiscrepancies();
  // SeedGodCelebration();
  // SeedGodCelebrationRefIds();
  // seedGodNames();
  // SeedGodPromises();
  // SeedGodPromiseRefIds();
  // SeedMosesLaws();
  // SeedMosesLawRefIds();
  // SeedProphecies();
  // SeedProphecyRefIds();
  // SeedTopics();
  // ======================
  // getBibleBooks();
  // getChaptersCount(1);
  // getChapterVerses(1, 1);
  // ======================
  // readBibleVerses('Pentruce');
  // readBibleVerses('Dumnezeu');
  // readBibleVersesByRef('Judc. 1:27÷36');
  // readBibleVerses2();
  // ReadCovenants();
  // readDictionary();
  // ReadDiscrepancies();
  // readGodNames();
  // readBibleBooks();
  // ======================
  // updateBibleBook();
  // updateBibleVerseChapterId(19009, 2);  // (id, chapterId)
  // const verseIds = [2559, 2571, 2578, 2564, 2560, 2570]; // 1
  // updateCovenantRef(23, 4532);
  // UpdateDiscrepancies();
  // UpdateGodPromises();
  // UpdateProphecies();
  // UpdateQuestionHint1();
  // UpdateQuestionHint2();
  // createTopics();
  // updateTopics();
  // addField();
  // dropTable();
  // readTopics();
  // readGodPromises();
  // addQuestionHint21();
  // addQuestionHint22();
  // addQuestionRef41();
  // addQuestionHint41();
  // addQuestionHint42();
  // readQuestionHint();
  // readQuestionHints();
  // readQuestionRefs();
  // deleteHeresyHintRef();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

// npx prisma db seed
// npx db migrate reset
// npx db studio
// mysqldump --host aws.connect.psdb.cloud --port --user <user> --password <pass> > backup.sql


//  UPDATE `GodName` SET `nameOfGod` = `godName`;
//  UPDATE `GodNameRef` SET `bibleVerseId` = 0;