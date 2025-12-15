import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Get,
  Res,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { FileService } from './file.service';
import { cloudinary } from '@/config/cloudinary.config';
import { AuthGuard } from '@/common';
import { UserService } from '@/user/user.service';
import { RenameFileDto } from './dto';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

@UseGuards(AuthGuard)
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async handleUploadFile(
    @Req() req: { user: { sub: string } },
    @Body('folder') folder: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    /** 1️⃣ Validate input */
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (folder) this.fileService.isValidId(folder);

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(`File size exceeds ${MAX_FILE_SIZE}MB`);
    }

    /** 2️⃣ Check disk space */
    await this.userService.checkDiskSpace(req.user.sub, file.size);

    /** 2️⃣ Upload to Cloudinary */
    const uploadResult = (await this.uploadToCloudinary(
      file,
      folder,
    )) as unknown as { secure_url: string };

    /** 3️⃣ Save metadata */
    const data = {
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      secureUrl: uploadResult.secure_url,
    };

    const owner = req.user.sub;

    const savedFile = await this.fileService.uploadFile(owner, folder, data);
    await this.userService.updateUsedSpace(owner, file.size);

    return {
      message: 'File uploaded successfully',
      file: savedFile,
    };
  }

  @Get()
  async handleGetFiles(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const files = await this.fileService.getFiles(owner);
    return res.json({ files });
  }

  @Get('stars')
  async handleGetStarredFiles(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const files = await this.fileService.getStarredFiles(owner);
    return res.json({ files });
  }

  @Get('trash')
  async handleGetTrashedFiles(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const files = await this.fileService.getTrashedFiles(owner);
    return res.json({ files });
  }

  @Get(':id')
  async handleGetFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const file = await this.fileService.getFile(owner, id);
    return res.json({ file });
  }

  @Put(':id')
  async handleRenameFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Body() body: RenameFileDto,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const renamedFile = await this.fileService.renameFile(
      owner,
      id,
      body.newName,
    );
    return res.json({ file: renamedFile });
  }

  @Patch(':id/star')
  async handleStarFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const starredFile = await this.fileService.starFile(owner, id);
    return res.json({ file: starredFile });
  }

  @Patch(':id/unstar')
  async handleUnstarFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const unstarredFile = await this.fileService.unstarFile(owner, id);
    return res.json({ file: unstarredFile });
  }

  @Patch(':id/trash')
  async handleTrashFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const trashedFile = await this.fileService.trashFile(owner, id);
    return res.json({ file: trashedFile });
  }

  @Patch(':id/restore')
  async handleRestoreFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    const restoredFile = await this.fileService.restoreFile(owner, id);
    return res.json({ file: restoredFile });
  }

  @Delete(':id')
  async handleDeleteFile(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const owner = req.user.sub;
    await this.fileService.deleteFile(owner, id);
    return res.json({ message: 'File deleted successfully' });
  }

  /** ☁️ Cloudinary Upload Helper */
  private async uploadToCloudinary(
    file: Express.Multer.File,
    owner: string,
    folder?: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder || owner,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            throw new BadRequestException(`Cloudinary Error: ${error.message}`);
          }

          if (!result) return reject(new Error('Cloudinary upload failed'));
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
