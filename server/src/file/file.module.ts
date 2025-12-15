import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '@/entities/file.entity';
import { UserModule } from '@/user/user.module';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    UserModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
