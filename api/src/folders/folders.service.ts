import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFolderDto,
  CreateFolderResponse,
  FindAllResponse,
  QueryFolderDto,
} from './folders.types';

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaService) {}

  private async nameUniqueness(
    ownerId: string,
    name: string,
    parentId?: string,
  ): Promise<void> {
    const where: Record<string, string | null> = {
      ownerId,
      name,
      parentId: null,
    };
    if (parentId) {
      where.parentId = parentId;
    }
    const isExists = await this.prisma.folder.findFirst({ where });
    if (isExists) {
      throw new ConflictException(`Folder with ${name} already exists.`);
    }
  }

  async create(
    ownerId: string,
    data: CreateFolderDto,
  ): Promise<CreateFolderResponse> {
    await this.nameUniqueness(ownerId, data.name, data.parentId);

    const folder = await this.prisma.folder.create({
      data: { ...data, ownerId },
      select: { id: true, name: true, createdAt: true },
    });
    return folder;
  }

  async findAll(
    ownerId: string,
    data: QueryFolderDto,
  ): Promise<FindAllResponse> {
    const where = { ownerId };
    const page = parseInt(data.page || '1') || 1;
    const take = parseInt(data.limit || '10') || 10;
    const skip = (page - 1) * take;

    const [folders, files, folderCount, fileCount] = await Promise.all([
      this.prisma.folder.findMany({
        where,
        select: { id: true, name: true, createdAt: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.file.findMany({
        where,
        select: {
          id: true,
          name: true,
          mimeType: true,
          size: true,
          createdAt: true,
        },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.folder.count({ where, skip, take }),
      this.prisma.file.count({ where, skip, take }),
    ]);

    const totalCount = folderCount + fileCount;
    const totalPages = Math.ceil(totalCount / take);
    return {
      folders,
      files,
      pagination: {
        total: totalCount,
        page,
        limit: take,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
