import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { File } from '@/entities/file.entity';
import { UploadFileDto } from './dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
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
}
