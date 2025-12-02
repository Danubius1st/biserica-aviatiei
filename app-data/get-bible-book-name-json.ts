import { BookSketchSearchSchema } from '@/schemas/app';
import { getFileJsonContentWithSchema } from '@/app-data/get-file-json-content-with-schema';

export const getBibleBookNameJson = async (filePath: string): Promise<string | null> => {
  try {
    const jsonData = await getFileJsonContentWithSchema(filePath, BookSketchSearchSchema);
    if (typeof jsonData === 'object' && jsonData !== null && 'book' in jsonData) {
      const value = (jsonData as { book: unknown; }).book;

      if (typeof value === 'string') {
        return value;
      }
    }

    return null;
  } catch (error) {
    console.error('Eroare la procesarea fișierului JSON:', error);
    return null;
  }
};