import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { RenameFileDto, UploadFileDto } from './files.types';

@Injectable()
export class FilesService {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_EXTENSIONS = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'pdf',
    'mv4',
    'mp4',
    'm4v',
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async upload(
    ownerId: string,
    data: UploadFileDto,
    file: Express.Multer.File,
  ) {
    // 1. Validate File Size
    if (file?.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    // 2. Validate File Extension
    const extension = file?.originalname.split('.').pop()?.toLowerCase();
    if (!extension || !this.ALLOWED_EXTENSIONS.includes(extension)) {
      throw new BadRequestException(
        `Invalid file extension. Allowed: ${this.ALLOWED_EXTENSIONS.join(', ')}`,
      );
    }

    if (data.folderId) {
      const folder = await this.prisma.folder.findUnique({
        where: {
          id: data.folderId,
          ownerId,
        },
      });
      if (!folder) {
        throw new BadRequestException(
          `Folder with id ${data.folderId} not found.`,
        );
      }
    }

    // 3. Upload to Appwrite
    const uploadResult = await this.storage.uploadFile(file);

    // 4. Save to Database
    const fileRecord = await this.prisma.file.create({
      data: {
        name: file?.originalname,
        mimeType: uploadResult.mimeType,
        size: BigInt(uploadResult.size),
        storageKey: uploadResult.storage,
        ownerId,
        folderId: data.folderId || null,
      },
      select: {
        id: true,
        name: true,
        mimeType: true,
        size: true,
      },
    });

    return {
      ...fileRecord,
      size: fileRecord.size.toString(), // Convert BigInt for JSON response
    };
  }

  async findOne(ownerId: string, id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id, ownerId, deletedAt: null },
      select: {
        id: true,
        name: true,
        mimeType: true,
        size: true,
        createdAt: true,
        folder: {
          select: { id: true, name: true },
        },
      },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${id} not found.`);
    }

    return {
      ...file,
      size: file.size.toString(),
    };
  }

  async remove(ownerId: string, id: string): Promise<void> {
    const file = await this.prisma.file.findUnique({
      where: { id, ownerId, deletedAt: null },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${id} not found.`);
    }

    await this.prisma.file.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async rename(ownerId: string, id: string, data: RenameFileDto) {
    const file = await this.prisma.file.findUnique({
      where: { id, ownerId, deletedAt: null },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${id} not found.`);
    }

    const updatedFile = await this.prisma.file.update({
      where: { id },
      data: { name: data.name },
      select: {
        id: true,
        name: true,
        mimeType: true,
        size: true,
      },
    });

    return {
      ...updatedFile,
      size: updatedFile.size.toString(),
    };
  }
}
