import { File } from '@/entities/file.entity';
import { Folder } from '@/entities/folder.entity';

export interface GetItemsType {
  folders: Folder[];
  files: File[];
  folder?: Folder;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
