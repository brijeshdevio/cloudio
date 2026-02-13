import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes';
import { JwtAuthGuard } from '../common/guards';
import { apiResponse } from '../utils';
import { COOKIE_NAME } from '../constants';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards';
import { LoginSchema, RegisterSchema } from './dto';
// types
import type { Response } from 'express';
import type { LoginDto, RegisterDto } from './auth.types';
import { setCookie } from './auth.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    const user = await this.authService.register(body);
    return apiResponse(res, { data: { user }, statusCode: 201 });
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(body);
    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, data.accessToken, {
      maxAge: COOKIE_NAME.EXPIRED_ACCESS_TOKEN,
    });
    setCookie(res, COOKIE_NAME.REFRESH_TOKEN, data.refreshToken, {
      maxAge: COOKIE_NAME.EXPIRED_REFRESH_TOKEN,
    });
    return apiResponse(res, { data });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RefreshTokenGuard)
  async logout(
    @Req() req: { user: { refreshToken: string } },
    @Res() res: Response,
  ) {
    await this.authService.logout(req.user.refreshToken);
    res.clearCookie(COOKIE_NAME.REFRESH_TOKEN);
    res.clearCookie(COOKIE_NAME.ACCESS_TOKEN);
    return apiResponse(res, { statusCode: 204 });
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Req() req: { user: { refreshToken: string } },
    @Res() res: Response,
  ) {
    const data = await this.authService.refresh(req.user.refreshToken);
    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, data.accessToken, {
      maxAge: COOKIE_NAME.EXPIRED_ACCESS_TOKEN,
    });
    return apiResponse(res, { data });
  }
}
