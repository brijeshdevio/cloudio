import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards';
import { ZodValidationPipe } from '../common/pipes';
import { CurrentUser } from '../common/decorators';
import { apiResponse } from '../utils';
import { FoldersService } from './folders.service';
import { CreateFolderSchema, QueryFolderSchema } from './dto';
// types
import type { Response } from 'express';
import type { CreateFolderDto, QueryFolderDto } from './folders.types';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async create(
    @CurrentUser('id') ownerId: string,
    @Body(new ZodValidationPipe(CreateFolderSchema)) body: CreateFolderDto,
    @Res() res: Response,
  ) {
    const folder = await this.foldersService.create(ownerId, body);
    return apiResponse(res, { data: { folder }, statusCode: 201 });
  }

  @Get()
  async findAll(
    @CurrentUser('id') ownerId: string,
    @Query(new ZodValidationPipe(QueryFolderSchema)) query: QueryFolderDto,
    @Res()
    res: Response,
  ) {
    const data = await this.foldersService.findAll(ownerId, query);
    return apiResponse(res, { data });
  }
}
