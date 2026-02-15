import z from 'zod';
import { RenameFileSchema, UploadFileSchema } from './dto';

export type UploadFileDto = z.infer<typeof UploadFileSchema>;
export type RenameFileDto = z.infer<typeof RenameFileSchema>;
