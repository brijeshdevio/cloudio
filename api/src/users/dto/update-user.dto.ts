import { z } from 'zod';

export const UpdateUserSchema = z
  .object({
    name: z
      .string('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be at most 30 characters'),
  })
  .strict();
