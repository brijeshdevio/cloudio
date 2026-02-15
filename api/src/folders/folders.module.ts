import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
