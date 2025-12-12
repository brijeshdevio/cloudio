import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { AuthGuard } from '@/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async handleSignup(
    @Body() body: SignupDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.authService.signup(body);
    return res.json({ message: 'Account created successfully.' });
  }

  @Post('login')
  async handleLogin(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { token } = await this.authService.login(body);
    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.json({ accessToken: token, message: 'Login successful.' });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  handleLogout(@Res() res: Response): Response {
    res.clearCookie('accessToken');
    return res.json({ message: 'Logout successful.' });
  }
}
