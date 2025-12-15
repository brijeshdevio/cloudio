import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from './entities/folder.entity';
import { File } from './entities/file.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Folder.name)
    private folderModel: Model<Folder>,
    @InjectModel(File.name)
    private fileModel: Model<File>,
  ) {}

  getHello(): string {
    return 'Welcome to Cloudio API!';
  }

  async getStarredItems(owner: string): Promise<{
    folders: Folder[];
    files: File[];
  }> {
    const folders = await this.folderModel
      .find({ owner, starred: true, trashed: false })
      .lean()
      .select('_id name starred updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    const files = await this.fileModel
      .find({ owner, starred: true, trashed: false })
      .lean()
      .select('_id name starred updatedAt size mimeType')
      .sort({ updatedAt: -1 })
      .limit(20);

    return { folders, files };
  }

  async getRecentItems(owner: string): Promise<{
    folders: Folder[];
    files: File[];
  }> {
    const folders = await this.folderModel
      .find({ owner, trashed: false })
      .lean()
      .select('_id name starred updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    const files = await this.fileModel
      .find({ owner, trashed: false })
      .lean()
      .select('_id name starred updatedAt size mimeType')
      .sort({ updatedAt: -1 })
      .limit(20);

    return { folders, files };
  }

  async getTrashItems(owner: string): Promise<{
    folders: Folder[];
    files: File[];
  }> {
    const folders = await this.folderModel
      .find({ owner, trashed: true })
      .lean()
      .select('_id name trashed updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    const files = await this.fileModel
      .find({ owner, trashed: true })
      .lean()
      .select('_id name starred updatedAt size mimeType')
      .sort({ updatedAt: -1 })
      .limit(20);

    return { folders, files };
  }

  async trashEmpty(owner: string): Promise<void> {
    await this.folderModel.deleteMany({ owner, trashed: true });
    await this.fileModel.deleteMany({ owner, trashed: true });
  }
}
