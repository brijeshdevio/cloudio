import type { CookieOptions, Response } from 'express';
import { envConfig } from '../config';

const isProd = envConfig.NODE_ENV === 'production';

export function setCookie(
  res: Response,
  key: string,
  token: string,
  options?: CookieOptions,
): void {
  res.cookie(key, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 1000 * 60 * 60 * 15,
    ...options,
  });
}
