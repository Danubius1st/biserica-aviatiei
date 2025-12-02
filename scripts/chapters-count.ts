import { PrismaClient } from '@/prisma/generated/prisma-db-app/client';

const db = new PrismaClient();

const testQuery = async () => {
  try {
    const bibleBookId = 1;

    const distinctChapters = await db.bibleVerse.findMany({
      where: {
        bibleBookId,
      },
      select: {
        chapterId: true,
      },
      distinct: ['chapterId'],
    });

    console.log('Distinct chapters:', distinctChapters);
    console.log('Number of chapters:', distinctChapters.length);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    await db.$disconnect();
  }
};

testQuery();
