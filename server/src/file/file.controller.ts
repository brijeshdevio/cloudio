import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { FileService } from './file.service';
import { cloudinary } from '@/config/cloudinary.config';
import { AuthGuard } from '@/common';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

@UseGuards(AuthGuard)
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {} // Assume fileService is properly injected

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
      throw new BadRequestException('Invalid file type');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File size exceeds 5MB');
    }

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

    return {
      message: 'File uploaded successfully',
      file: savedFile,
    };
  }

  /** ☁️ Cloudinary Upload Helper */
  private async uploadToCloudinary(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
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
