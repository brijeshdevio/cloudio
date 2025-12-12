import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@/common';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async handleGetProfile(
    @Req() req: { user: { sub: string; email: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub, email } = req.user;
    const user = await this.userService.getProfile(sub, email);
    return res.json({ user });
  }
}
