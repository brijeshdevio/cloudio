import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Folder } from '@/entities/folder.entity';
import { CreateFolderDto, RenameFolderDto } from './dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  private async isUniqueFolder(
    userId: string,
    name: string,
    parentId?: string,
  ): Promise<void> {
    const isFolder = await this.folderRepository.findOne({
      where: {
        user: { id: userId },
        parent: parentId ? { id: parentId } : undefined,
        name,
      },
    });

    if (isFolder) {
      throw new ConflictException(`Folder '${name}' already exists`);
    }
  }

  async createFolder(userId: string, data: CreateFolderDto) {
    await this.isUniqueFolder(userId, data.name, data.parent as string);

    const folder = this.folderRepository.create({
      user: { id: userId },
      parent: data.parent ? { id: data.parent } : undefined,
      name: data.name,
    });

    await this.folderRepository.save(folder);
    return folder;
  }

  async getFolder(userId: string, folderId: string) {
    const folder = await this.folderRepository.findOne({
      where: { user: { id: userId }, id: folderId },
    });

    if (!folder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    const subFolders = await this.folderRepository.find({
      where: { user: { id: userId }, parent: { id: folder.id } },
    });

    return { folder, subFolders };
  }

  async getFolders(userId: string) {
    const folders = await this.folderRepository.find({
      where: { user: { id: userId }, parent: IsNull(), isTrashed: false },
    });
    return folders;
  }

  async renameFolder(userId: string, folderId: string, data: RenameFolderDto) {
    const folder = await this.folderRepository.findOne({
      where: { user: { id: userId }, id: folderId },
    });

    if (!folder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    await this.isUniqueFolder(
      userId,
      data.name,
      folder.parent as unknown as string,
    );

    const renameFolder = await this.folderRepository.findOneBy({
      id: folderId,
    });

    if (!renameFolder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    renameFolder.name = data.name;
    return this.folderRepository.save(renameFolder);
  }

  async markTrashFolder(userId: string, folderId: string) {
    const folder = await this.folderRepository.findOne({
      where: { user: { id: userId }, id: folderId },
    });

    if (!folder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    folder.isTrashed = true;
    folder.trashed_at = new Date();

    return this.folderRepository.save(folder);
  }

  async getTrashedFolders(userId: string) {
    const folders = await this.folderRepository.find({
      where: { user: { id: userId }, parent: IsNull(), isTrashed: true },
    });
    return folders;
  }

  async deleteFolder(userId: string, folderId: string) {
    const folder = await this.folderRepository.findOne({
      where: { user: { id: userId }, id: folderId },
    });

    if (!folder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    return this.folderRepository.remove(folder);
  }
}
