import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
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
import {
  CreateFolderSchema,
  QueryFolderSchema,
  RenameFolderSchema,
  SearchFolderSchema,
} from './dto';
// types
import type { Response } from 'express';
import type {
  CreateFolderDto,
  QueryFolderDto,
  RenameFolderDto,
  SearchFolderDto,
} from './folders.types';

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

  @Get('search')
  async search(
    @CurrentUser('id') ownerId: string,
    @Query(new ZodValidationPipe(SearchFolderSchema)) query: SearchFolderDto,
    @Res() res: Response,
  ) {
    const data = await this.foldersService.search(ownerId, query);
    return apiResponse(res, { data });
  }

  @Patch(':id')
  async rename(
    @CurrentUser('id') ownerId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(RenameFolderSchema)) body: RenameFolderDto,
    @Res() res: Response,
  ) {
    const folder = await this.foldersService.rename(ownerId, id, body);
    return apiResponse(res, { data: { folder } });
  }

  @Delete(':id')
  async remove(
    @CurrentUser('id') ownerId: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.foldersService.remove(ownerId, id);
    return apiResponse(res, { statusCode: 204 });
  }
}
