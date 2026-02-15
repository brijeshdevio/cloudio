import { z } from 'zod';
import { CreateFolderSchema, QueryFolderSchema } from './dto';

export type CreateFolderDto = z.infer<typeof CreateFolderSchema>;
export type QueryFolderDto = z.infer<typeof QueryFolderSchema>;

export type CreateFolderResponse = {
  id: string;
  name: string;
  createdAt: Date | null;
};

export type FindAllResponse = {
  folders: {
    id: string;
    name: string;
    createdAt: Date;
  }[];
  files: {
    id: string;
    name: string;
    mimeType: string;
    size: bigint;
    createdAt: Date;
  }[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};
