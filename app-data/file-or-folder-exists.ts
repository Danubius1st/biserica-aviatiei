import fs from 'fs/promises';

export const fileOrFolderExists = async (folderPath: string): Promise<boolean> => {
  try {
    await fs.access(folderPath);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
