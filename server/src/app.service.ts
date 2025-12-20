import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from './entities/folder.entity';
import { File } from './entities/file.entity';
import { QueryDto } from './common';
import { GetItemsType } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Folder.name)
    private folderModel: Model<Folder>,
    @InjectModel(File.name)
    private fileModel: Model<File>,
  ) {}

  defaultQuery: QueryDto = {
    page: '1',
    limit: '10',
  };

  getHello(): string {
    return 'Welcome to Cloudio API!';
  }

  private async runQueries(
    dbQuery: {
      owner: string;
      parent?: null;
      starred?: boolean;
      trashed?: boolean;
    },
    queries: QueryDto,
  ): Promise<GetItemsType> {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;

    const skip = (page - 1) * limit;

    const [folders, files, folderTotal, fileTotal] = await Promise.all([
      this.folderModel
        .find(dbQuery)
        .select('_id name createdAt starred updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.fileModel
        .find(dbQuery)
        .select('_id name createdAt starred updatedAt size mimeType')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.folderModel.countDocuments(dbQuery),

      this.fileModel.countDocuments(dbQuery),
    ]);

    const total = folderTotal + fileTotal;
    const totalPages = Math.ceil(total / limit);

    return {
      folders,
      files,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getItems(
    owner: string,
    queries: QueryDto = this.defaultQuery,
  ): Promise<GetItemsType> {
    const dbQuery = { owner, parent: null, trashed: false };
    return await this.runQueries(dbQuery, queries);
  }

  async getStarredItems(
    owner: string,
    queries: QueryDto = this.defaultQuery,
  ): Promise<GetItemsType> {
    const dbQuery = { owner, starred: true, trashed: false };
    return await this.runQueries(dbQuery, queries);
  }

  async getRecentItems(
    owner: string,
    queries: QueryDto = this.defaultQuery,
  ): Promise<{
    folders: Folder[];
    files: File[];
  }> {
    const dbQuery = { owner, trashed: false };
    return await this.runQueries(dbQuery, queries);
  }

  async getTrashItems(
    owner: string,
    queries: QueryDto = this.defaultQuery,
  ): Promise<GetItemsType> {
    const dbQuery = { owner, trashed: true };
    return await this.runQueries(dbQuery, queries);
  }

  async trashEmpty(owner: string): Promise<void> {
    await this.folderModel.deleteMany({ owner, trashed: true });
    await this.fileModel.deleteMany({ owner, trashed: true });
  }
}
