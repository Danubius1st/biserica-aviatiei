import fs from 'fs/promises';
import path from 'path';
import { publicBibleDir } from '@/app-data/public-bible-dir';

interface bibleEntryOriginal {
  id: number;
  fileName: string;
};

interface bibleEntryUpdated {
  id: number;
  fileName: string;
  book: string;
  abbrev: string;
};

export const addAbbreviationsToBibleData = async () => {
  const bibleDir = publicBibleDir();
  const indexFilePath = path.join(bibleDir, 'index.json');
  const indexContent = await fs.readFile(indexFilePath, 'utf8');
  const indexData: bibleEntryOriginal[] = JSON.parse(indexContent);
  const updatedData: bibleEntryUpdated[] = [];

  for (const entry of indexData) {
    const filePath = path.join(bibleDir, entry.fileName);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const fileData = JSON.parse(fileContent);

    updatedData.push({
      ...entry,
      book: fileData.name,
      abbrev: fileData.abbrev
    });
  }

  await fs.writeFile(indexFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
  // console.log(updatedData);
};
