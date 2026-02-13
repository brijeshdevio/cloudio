import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PRISMA } from '../constants';
import { comparePassword, hashPassword } from '../utils';
import { ChangePasswordDto, UpdateUserDto, UserResponse } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async me(id: string): Promise<UserResponse> {
    const rowUser = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        storageUsed: true,
        storageLimit: true,
      },
    });
    if (rowUser) {
      const user = {
        ...rowUser,
        storageUsed: rowUser.storageUsed.toString(),
        storageLimit: rowUser.storageLimit.toString(),
      };
      return user;
    }
    throw new UnauthorizedException("You're not logged in.");
  }

  async update(
    id: string,
    data: UpdateUserDto,
  ): Promise<Pick<UserResponse, 'id' | 'name'>> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
        },
      });
      return user;
    } catch (error: unknown) {
      const err = error as { code: string };
      if (err.code === PRISMA.CONFLICT) {
        throw new UnauthorizedException("You're not logged in.");
      }
      throw error;
    }
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { password: true },
    });
    if (!user) {
      throw new UnauthorizedException("You're not logged in.");
    }

    if (!(await comparePassword(user.password, data.oldPassword))) {
      throw new BadRequestException('Old password is incorrect.');
    }

    const password = await hashPassword(data.newPassword);
    await this.prisma.user.update({
      where: { id },
      data: {
        password,
        refreshTokens: {
          deleteMany: {},
        },
      },
    });
  }
}
