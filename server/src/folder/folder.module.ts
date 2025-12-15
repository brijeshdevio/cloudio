import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from '@/entities/folder.entity';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { File, FileSchema } from '@/entities/file.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Folder.name, schema: FolderSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
