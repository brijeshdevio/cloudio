import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { File } from '@/entities/file.entity';
import { UploadFileDto } from './dto';
import { deleteFile } from '@/config/cloudinary.config';
import { UserService } from '@/user/user.service';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
    private readonly userService: UserService,
  ) {}

  isValidId(_id: string) {
    if (isValidObjectId(_id)) {
      return true;
    }
    throw new BadRequestException('Invalid Folder ID: ' + _id);
  }

  async uploadFile(owner: string, folder: string, data: UploadFileDto) {
    if (folder) this.isValidId(folder);
    const file = await this.fileModel.create({ ...data, owner, folder });
    return file;
  }

  async getFiles(owner: string): Promise<File[]> {
    const files = await this.fileModel
      .find({
        owner,
        folder: null,
        trashed: false,
      })
      .lean()
      .select('_id name starred size mimeType updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    return files;
  }

  async getFile(owner: string, fileId: string): Promise<File> {
    this.isValidId(fileId);

    const file = await this.fileModel
      .findOne({ _id: fileId, owner })
      .lean()
      .select('-__v -owner')
      .populate('folder', 'name');

    if (!file) {
      throw new ForbiddenException('Access to file denied');
    }

    return file;
  }

  async renameFile(
    owner: string,
    fileId: string,
    newName: string,
  ): Promise<File> {
    this.isValidId(fileId);

    const file = await this.fileModel
      .findOneAndUpdate(
        { _id: fileId, owner },
        { name: newName },
        { new: true },
      )
      .lean()
      .select('_id name updatedAt');

    if (!file) {
      throw new ForbiddenException('Access to file denied');
    }

    return file;
  }

  async starFile(owner: string, fileId: string): Promise<File> {
    this.isValidId(fileId);

    const file = await this.fileModel
      .findOneAndUpdate(
        { _id: fileId, owner },
        { starred: true },
        { new: true },
      )
      .lean()
      .select('_id name starred updatedAt');

    if (!file) {
      throw new ForbiddenException('Access to file denied');
    }

    return file;
  }

  async unstarFile(owner: string, fileId: string): Promise<File> {
    this.isValidId(fileId);

    const file = await this.fileModel
      .findOneAndUpdate(
        { _id: fileId, owner },
        { starred: false },
        { new: true },
      )
      .lean()
      .select('_id name starred updatedAt');

    if (!file) {
      throw new ForbiddenException('Access to file denied');
    }

    return file;
  }

  async getStarredFiles(owner: string): Promise<File[]> {
    const files = await this.fileModel
      .find({ owner, starred: true, trashed: false })
      .lean()
      .select('_id name starred updatedAt size type')
      .sort({ createdAt: -1 })
      .limit(20);

    return files;
  }

  async trashFile(owner: string, fileId: string): Promise<File> {
    this.isValidId(fileId);

    const file = await this.fileModel
      .findOneAndUpdate(
        { _id: fileId, owner },
        { trashed: true },
        { new: true },
      )
      .lean()
      .select('_id name trashed updatedAt');

    if (!file) {
      throw new ForbiddenException('Access to file denied');
    }

    return file;
  }

  async restoreFile(owner: string, fileId: string): Promise<File> {
    this.isValidId(fileId);

    const file = await this.fileModel
      .findOneAndUpdate(
        { _id: fileId, owner },
        { trashed: false },
        { new: true },
      )
      .lean()
      .select('_id name trashed updatedAt');

    if (!file) {
      throw new ForbiddenException('Access to file denied');
    }

    return file;
  }

  async getTrashedFiles(owner: string): Promise<File[]> {
    const files = await this.fileModel
      .find({ owner, trashed: true })
      .lean()
      .select('_id name trashed updatedAt size type')
      .sort({ updatedAt: -1 })
      .limit(20);

    return files;
  }

  async deleteFile(owner: string, fileId: string): Promise<File> {
    this.isValidId(fileId);

    const findFile = await this.getFile(owner, fileId);
    if (!findFile) {
      throw new ForbiddenException('Access to file denied');
    }

    const publicId = this.getCloudinaryPublicId(findFile.secureUrl);
    if (!publicId) {
      throw new BadRequestException('Invalid file URL');
    }
    await deleteFile(publicId);

    await this.fileModel
      .findOneAndDelete({
        _id: fileId,
        owner,
      })
      .lean()
      .select('_id name trashed updatedAt');

    await this.userService.reduceUsedSpace(owner, findFile.size);

    return findFile;
  }

  private getCloudinaryPublicId(url: string): string | null {
    try {
      const parsedUrl = new URL(url);
      const parts = parsedUrl.pathname.split('/').filter(Boolean);

      // Find the index of the version segment (e.g. v123456)
      const versionIndex = parts.findIndex((p) => /^v\d+$/.test(p));

      if (versionIndex === -1) return null;

      // Everything after the version is the public ID + extension
      const publicIdWithExt = parts.slice(versionIndex + 1).join('/');

      // Remove file extension
      return publicIdWithExt.replace(/\.[^/.]+$/, '');
    } catch {
      return null;
    }
  }
}
