import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string('Old password is required'),
    newPassword: z
      .string('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password must be at most 30 characters'),
  })
  .strict();
