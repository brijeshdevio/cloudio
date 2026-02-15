import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { CurrentUser } from '../common/decorators';
import { JwtAuthGuard } from '../common/guards';
import { ZodValidationPipe } from '../common/pipes';
import { apiResponse } from '../utils';
import { RenameFileSchema, UploadFileSchema } from './dto';
import { FilesService } from './files.service';
// types
import type { RenameFileDto, UploadFileDto } from './files.types';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @CurrentUser('id') ownerId: string,
    @Body(new ZodValidationPipe(UploadFileSchema)) body: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const data = await this.filesService.upload(ownerId, body, file);
    return apiResponse(res, { data, statusCode: 201 });
  }

  @Get(':id/meta')
  async findOne(
    @CurrentUser('id') ownerId: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const data = await this.filesService.findOne(ownerId, id);
    return apiResponse(res, { data });
  }

  @Delete(':id')
  async remove(
    @CurrentUser('id') ownerId: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.filesService.remove(ownerId, id);
    return apiResponse(res, { statusCode: 204 });
  }

  @Patch(':id')
  async rename(
    @CurrentUser('id') ownerId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(RenameFileSchema)) body: RenameFileDto,
    @Res() res: Response,
  ) {
    const data = await this.filesService.rename(ownerId, id, body);
    return apiResponse(res, { data });
  }
}
