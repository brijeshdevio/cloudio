import { z } from 'zod';

export const RenameFileSchema = z
  .object({
    name: z
      .string()
      .min(1, 'File name must be at least 1 character long')
      .max(255, 'File name must be at most 255 characters long'),
  })
  .strict();
