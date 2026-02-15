import { z } from 'zod';
import {
  CreateFolderSchema,
  QueryFolderSchema,
  SearchFolderSchema,
  RenameFolderSchema,
} from './dto';

export type CreateFolderDto = z.infer<typeof CreateFolderSchema>;
export type QueryFolderDto = z.infer<typeof QueryFolderSchema>;
export type SearchFolderDto = z.infer<typeof SearchFolderSchema>;
export type RenameFolderDto = z.infer<typeof RenameFolderSchema>;

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
