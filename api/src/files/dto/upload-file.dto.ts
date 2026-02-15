import { z } from 'zod';

export const UploadFileSchema = z.object({
  folderId: z.string().uuid().nullable().optional(),
});
