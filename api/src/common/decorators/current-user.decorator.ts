import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type User = {
  id: string;
  email: string;
};

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const rowUser = request as unknown as {
      user: User;
    };
    const user = rowUser.user;
    return data ? user[data] : user;
  },
);
