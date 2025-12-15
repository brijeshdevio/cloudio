import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Folder } from '@/entities/folder.entity';
import { CreateFolderDto, RenameFolderDto } from './dto';
import { File } from '@/entities/file.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name)
    private folderModel: Model<Folder>,
    @InjectModel(File.name)
    private fileModel: Model<File>,
  ) {}

  private async isUniqueFolder(
    owner: string,
    parent: string | undefined,
    name: string,
  ): Promise<boolean> {
    if (parent) this.isValidId(parent);
    const isFolder = await this.folderModel.findOne({ owner, name, parent });
    if (isFolder) {
      throw new ConflictException(`Folder ${name} already exists`);
    }
    return true;
  }

  private isValidId(_id: string) {
    if (isValidObjectId(_id)) {
      return true;
    }
    throw new BadRequestException('Invalid Folder ID: ' + _id);
  }

  async createFolder(owner: string, data: CreateFolderDto): Promise<Folder> {
    await this.isUniqueFolder(owner, data.parent, data.name);

    const folder = await this.folderModel.create({ ...data, owner });
    return folder;
  }

  async getFolders(owner: string): Promise<{
    folders: Folder[];
    files: File[];
  }> {
    const folders = await this.folderModel
      .find({
        owner,
        parent: null,
        trashed: false,
      })
      .lean()
      .select('_id name createdAt starred updatedAt')
      .sort({ createdAt: -1 })
      .limit(20);

    const files = await this.fileModel
      .find({
        owner,
        folder: null,
        trashed: false,
      })
      .lean()
      .select('_id name createdAt starred updatedAt size mimeType')
      .sort({ createdAt: -1 })
      .limit(20);
    return { folders, files };
  }

  async getFolder(
    owner: string,
    folderId: string,
  ): Promise<{
    folder: Folder;
    folders: Folder[];
    files: File[];
  }> {
    this.isValidId(folderId);

    const folder = await this.folderModel
      .findOne({ _id: folderId, owner })
      .lean()
      .select('-__v -parent -owner')
      .populate('path', 'name');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    const folders = await this.folderModel
      .find({ owner, parent: folderId })
      .lean()
      .select('_id name createdAt starred updatedAt')
      .sort({ createdAt: -1 })
      .limit(20);
    const files = await this.fileModel
      .find({ owner, folder: folderId })
      .lean()
      .select('_id name createdAt starred updatedAt size mimeType')
      .sort({ createdAt: -1 })
      .limit(20);
    return { folder, folders, files };
  }

  async renameFolder(
    owner: string,
    folderId: string,
    data: RenameFolderDto,
  ): Promise<Folder> {
    this.isValidId(folderId);
    // await this.isUniqueFolder(owner, data.parent, data.name);

    const folder = await this.folderModel
      .findOneAndUpdate(
        { _id: folderId, owner },
        { name: data.name },
        { new: true },
      )
      .lean()
      .select('_id name updatedAt');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    return folder;
  }

  async starFolder(owner: string, folderId: string): Promise<Folder> {
    this.isValidId(folderId);

    const folder = await this.folderModel
      .findOneAndUpdate(
        { _id: folderId, owner },
        { starred: true },
        { new: true },
      )
      .lean()
      .select('_id name starred updatedAt');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    return folder;
  }

  async unstarFolder(owner: string, folderId: string): Promise<Folder> {
    this.isValidId(folderId);

    const folder = await this.folderModel
      .findOneAndUpdate(
        { _id: folderId, owner },
        { starred: false },
        { new: true },
      )
      .lean()
      .select('_id name starred updatedAt');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    return folder;
  }

  async getStarredFolders(owner: string): Promise<Folder[]> {
    const folders = await this.folderModel
      .find({ owner, starred: true, trashed: false })
      .lean()
      .select('_id name starred updatedAt')
      .sort({ createdAt: -1 })
      .limit(20);

    return folders;
  }

  async trashFolder(owner: string, folderId: string): Promise<Folder> {
    this.isValidId(folderId);

    const folder = await this.folderModel
      .findOneAndUpdate(
        { _id: folderId, owner },
        { trashed: true },
        { new: true },
      )
      .lean()
      .select('_id name trashed updatedAt');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    return folder;
  }

  async restoreFolder(owner: string, folderId: string): Promise<Folder> {
    this.isValidId(folderId);

    const folder = await this.folderModel
      .findOneAndUpdate(
        { _id: folderId, owner },
        { trashed: false },
        { new: true },
      )
      .lean()
      .select('_id name trashed updatedAt');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    return folder;
  }

  async getTrashedFolders(owner: string): Promise<Folder[]> {
    const folders = await this.folderModel
      .find({ owner, trashed: true })
      .lean()
      .select('_id name trashed updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    return folders;
  }

  async deleteFolder(owner: string, folderId: string): Promise<Folder> {
    this.isValidId(folderId);

    const folder = await this.folderModel
      .findOneAndDelete({
        _id: folderId,
        owner,
      })
      .lean()
      .select('_id name trashed updatedAt');

    if (!folder) {
      throw new ForbiddenException('Access to folder denied');
    }

    return folder;
  }
}
