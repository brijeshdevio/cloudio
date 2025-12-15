import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@/common';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async handleGetProfile(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const user = await this.userService.getProfile(sub);
    return res.json({ user });
  }

  @Get('storage')
  async handleGetDiskSpace(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const space = await this.userService.getDiskSpace(sub);
    return res.json(space);
  }
}
