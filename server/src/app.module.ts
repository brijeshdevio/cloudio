import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';
import { Folder, FolderSchema } from './entities/folder.entity';
import { File, FileSchema } from './entities/file.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([
      { name: Folder.name, schema: FolderSchema },
      { name: File.name, schema: FileSchema },
    ]),
    AuthModule,
    UserModule,
    FolderModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
