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

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name)
    private folderModel: Model<Folder>,
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

  async createFolder(owner: string, data: CreateFolderDto) {
    await this.isUniqueFolder(owner, data.parent, data.name);

    const folder = await this.folderModel.create({ ...data, owner });
    return folder;
  }

  async getFolder(owner: string, _id: string): Promise<unknown> {
    this.isValidId(_id);
    const folder = await this.folderModel
      .findOne({ owner, _id })
      .lean()
      .select('-owner -__v')
      .populate('parent', 'name')
      .populate('path', 'name');

    if (!folder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    const subFolders = await this.folderModel
      .find({
        owner,
        parent: String(folder._id),
      })
      .lean()
      .select('-owner -parent -__v -path');

    return { folder, subFolders };
  }

  async getRootFolders(owner: string) {
    const subFolders = await this.folderModel
      .find({ owner, parent: null })
      .lean()
      .select('-owner -parent -path -__v')
      .sort({ updatedAt: -1 });
    const files = [];
    return { subFolders, files };
  }

  public async renameFolder(owner: string, _id: string, data: RenameFolderDto) {
    this.isValidId(_id);
    const folder = await this.folderModel.findById(_id);

    const renamedFolder = await this.folderModel.findByIdAndUpdate(
      _id,
      { ...data },
      { new: true },
    );

    if (!renamedFolder) {
      throw new ForbiddenException('You do not have access to this folder.');
    }

    const parent = folder?.parent ? String(folder?.parent) : undefined;
    await this.isUniqueFolder(owner, parent, data.name);

    return renamedFolder;
  }
}
