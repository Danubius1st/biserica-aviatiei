import fs from 'fs/promises';
import { z } from 'zod';
// import { logMessage } from '@/lib/pino-logger';

export const getFileJsonContentWithSchema = async <T extends z.ZodTypeAny>(
  filePath: string,
  schema?: T
): Promise<z.infer<T>> => {
  const content = await fs.readFile(filePath, 'utf-8');
  const parsed = JSON.parse(content);
  // logMessage('info', { content }, `getFileJsonContentWithSchema`);
  // logMessage('info', { parsed }, `getFileJsonContentWithSchema`);

  return schema ? schema.parse(parsed) : parsed;
};
