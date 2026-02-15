import { z } from 'zod';

export const CreateFolderSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Folder name must be at least 1 character long')
      .max(30, 'Folder name must be at most 30 characters long'),
    parentId: z.uuid().optional(),
  })
  .strict();
