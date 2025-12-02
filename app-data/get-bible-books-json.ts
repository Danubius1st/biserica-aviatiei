import fs from 'fs/promises';
import path from 'path';
import { fileOrFolderExists } from '@/app-data/file-or-folder-exists';
import { getBibleBookJsonParams } from '@/app-data/get-bible-book-json-params';
import { publicBibleDir } from '@/app-data/public-bible-dir';
import { bibleBookJsonType1 } from '@/schemas/app/bible-book-schema';
// import { logger } from '@/lib/pino-logger';

export const getBibleBooksJson = async (): Promise<bibleBookJsonType1[]> => {
  const bibleDir = publicBibleDir();
  // const allFiles = await fs.readdir(bibleDir);
  // console.log(`Fișiere găsite în director: ${allFiles.length}`);
  // allFiles.forEach((file) => {
  //   logger.debug(`Fișier în director: ${file}`);
  // });

  if (await fileOrFolderExists(bibleDir)) {

    const indexFilePath = path.join(bibleDir, 'index.json');
    const jsonIndexData = await fs.readFile(indexFilePath, 'utf-8');

    const files = JSON.parse(jsonIndexData);

    const books = await Promise.all(
      files.map(async (file: { id: string; fileName: string; }/*, index: number*/) => {
        try {
          const filePath = path.join(bibleDir, file.fileName);
          const book = await getBibleBookJsonParams(filePath);
          // logger.debug(`Procesare fișier ${index + 1}/${files.length}: ${file.fileName}`);
          // console.log(`Procesare fișier ${index + 1}/${files.length}: ${file.fileName}`);

          return {
            id: Number.parseInt(file.id),
            book: book.name,
            abbrev: book.abbrev,
            path: filePath
          };
        } catch (error) {
          console.error(`Error processing file ${file.fileName}:`, error);
          return null;
        }
      }),
    );

    return books;
  } else {
    // return {};
    throw new Error(`File not found: ${bibleDir}`);
  }
};
