import { fileOrFolderExists } from '@/app-data/file-or-folder-exists';
import { getFileJsonContentWithSchema } from '@/app-data/get-file-json-content-with-schema';
import { BibleBookJsonType2Schema } from '@/schemas/app';
import { bibleBookJsonParamsType } from '@/models/app/bible';
// import { logger, logMessage } from '@/lib/pino-logger';

export const getBibleBookJsonParams = async (filePath: string): Promise<bibleBookJsonParamsType> => {
  if (await fileOrFolderExists(filePath)) {

    const content = await getFileJsonContentWithSchema(filePath, BibleBookJsonType2Schema);
    // logger.debug(`getBibleBookJsonParams: ${content}`);
    // logMessage('info', { content }, `getFileJsonContentWithSchema`);

    return {
      id: 0,
      abbrev: content.abbrev,
      name: content.name,
      chaptersCount: content.chapters.length
    };
  } else {
    throw new Error(`File not found: ${filePath}`);
  }
};
