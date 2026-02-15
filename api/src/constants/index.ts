export const PRISMA = {
  CONFLICT: 'P2002',
  NOT_FOUND: 'P2025',
  VIOLATION: 'P2003',
};
export const EXPIRED_ACCESS_TOKEN = '1h';
export const EXPIRED_REFRESH_TOKEN = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000,
);
export const COOKIE_NAME = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  EXPIRED_ACCESS_TOKEN: 1000 * 60 * 60 * 15,
  EXPIRED_REFRESH_TOKEN: 1000 * 60 * 60 * 24 * 7,
};
