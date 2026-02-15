import { z } from 'zod';

export const QueryFolderSchema = z.object({
  parentId: z.uuid().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
