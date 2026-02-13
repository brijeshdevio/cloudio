import { randomBytes, createHash } from 'node:crypto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from '../utils';
import { EXPIRED_REFRESH_TOKEN, PRISMA } from '../constants';
import {
  LoginDto,
  LoginResponse,
  RegisterDto,
  RegisterResponse,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private refreshToken(): string {
    return randomBytes(64).toString('hex');
  }

  private async accessToken(payload: Record<string, any>): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async register(data: RegisterDto): Promise<RegisterResponse> {
    try {
      data.password = await hashPassword(data.password);
      const user = await this.prisma.user.create({
        data,
        select: { id: true, name: true, email: true, createdAt: true },
      });
      return user;
    } catch (error: unknown) {
      const err = error as { code: string };
      if (err?.code === PRISMA.CONFLICT) {
        throw new ConflictException(`User with ${data.email} already exists.`);
      }
      throw error;
    }
  }

  async login(data: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: true,
      },
    });
    if (!user || !user.password) {
      throw new UnauthorizedException(`Invalid credentials.`);
    }

    const { password, ...safeUser } = user;
    if (!(await comparePassword(password, data.password))) {
      throw new UnauthorizedException(`Invalid credentials.`);
    }

    const accessToken = await this.accessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = this.refreshToken();
    const tokenHash = this.hashToken(refreshToken);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokens: {
          create: {
            tokenHash,
            expiresAt: EXPIRED_REFRESH_TOKEN,
          },
        },
      },
    });
    return { user: safeUser, accessToken, refreshToken };
  }

  async logout(token: string): Promise<void> {
    const tokenHash = this.hashToken(token);
    await this.prisma.refreshToken.deleteMany({
      where: { tokenHash },
    });
  }

  async refresh(token: string) {
    const tokenHash = this.hashToken(token);
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { tokenHash, expiresAt: { gt: new Date() } },
      select: {
        user: {
          select: { id: true, email: true },
        },
      },
    });
    if (!refreshToken) {
      throw new UnauthorizedException(`Invalid or expired refresh token.`);
    }

    const accessToken = await this.accessToken({
      id: refreshToken.user.id,
      email: refreshToken.user.email,
    });

    return { accessToken };
  }
}
