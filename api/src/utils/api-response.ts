import type { Response } from 'express';

type ApiResponse<D, R> = {
  data?: D;
  rest?: R | { [key: string]: any };
  message?: string;
  success?: boolean;
  statusCode?: number;
};

export function apiResponse<D, R>(
  res: Response,
  {
    data,
    rest = {},
    message,
    success = true,
    statusCode = 200,
  }: ApiResponse<D, R>,
) {
  return res.status(statusCode).json({
    success,
    statusCode,
    data,
    message,
    ...rest,
  });
}
