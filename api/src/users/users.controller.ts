import { Body, Controller, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes';
import { JwtAuthGuard } from '../common/guards';
import { CurrentUser } from '../common/decorators';
import { apiResponse } from '../utils';
import { UsersService } from './users.service';
import { ChangePasswordSchema, UpdateUserSchema } from './dto';
// types
import type { Response } from 'express';
import type { ChangePasswordDto, UpdateUserDto } from './users.types';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@CurrentUser('id') id: string, @Res() res: Response) {
    const user = await this.usersService.me(id);
    return apiResponse(res, { data: { user } });
  }

  @Patch('me')
  async update(
    @CurrentUser('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) body: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.update(id, body);
    return apiResponse(res, { data: { user } });
  }

  @Patch('me/password')
  async changePassword(
    @CurrentUser('id') id: string,
    @Body(new ZodValidationPipe(ChangePasswordSchema)) body: ChangePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.changePassword(id, body);
    return apiResponse(res, { statusCode: 204 });
  }
}
