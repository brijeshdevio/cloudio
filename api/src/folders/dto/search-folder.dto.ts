import { z } from 'zod';

export const SearchFolderSchema = z
  .object({
    query: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  })
  .strict();
