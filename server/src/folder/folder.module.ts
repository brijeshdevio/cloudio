import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from '@/entities/folder.entity';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
