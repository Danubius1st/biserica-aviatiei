import fs from 'fs/promises';

export const getFileJsonContent = async (filePath: string): Promise<string> => await fs.readFile(filePath, 'utf-8');
