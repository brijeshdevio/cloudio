// storage.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { ID, Storage } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { envConfig, storage } from '../config';
import { UploadFileResponse } from './storage.types';

@Injectable()
export class StorageService {
  private appWrite: Storage;
  constructor() {
    this.appWrite = storage;
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadFileResponse> {
    try {
      const inputFile = InputFile.fromBuffer(file.buffer, file.originalname);

      const result = await this.appWrite.createFile({
        bucketId: envConfig.APPWRITE_BUCKET_ID,
        fileId: ID.unique(),
        file: inputFile,
      });

      return {
        storage: result.$id,
        name: result.name,
        size: result.sizeOriginal,
        mimeType: result.mimeType,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to upload file');
    }
  }
}
