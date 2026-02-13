import z from 'zod';
import { LoginSchema, RegisterSchema } from './dto';

export type BaseResponse = {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
};

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;

export type RegisterResponse = BaseResponse;
export type LoginResponse = {
  user: BaseResponse;
  accessToken: string;
  refreshToken: string;
};
