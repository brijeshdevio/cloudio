import { z } from 'zod';
import { ChangePasswordSchema, UpdateUserSchema } from './dto';

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

export type UserResponse = {
  id: string;
  name: string | null;
  email: string;
  storageUsed: string;
  storageLimit: string;
  createdAt: Date | null;
};
