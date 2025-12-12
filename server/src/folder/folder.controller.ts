import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto';

@UseGuards(AuthGuard)
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async handleCreateFolder(
    @Req() req: { user: { sub: string } },
    @Body() body: CreateFolderDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.createFolder(sub, body);
    return res.json({ folder, message: 'Folder created successfully.' });
  }

  @Get()
  async handleGetFolders(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folders = await this.folderService.getFolders(sub);
    return res.json({ folders });
  }

  @Get('trashed')
  async handleGetTrashedFolders(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folders = await this.folderService.getTrashedFolders(sub);
    return res.json({ folders });
  }

  @Get(':id')
  async handleGetFolderById(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const result = await this.folderService.getFolder(sub, id);
    return res.json(result);
  }

  @Put(':id')
  async handleRenameFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Body() body: CreateFolderDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.renameFolder(sub, id, body);
    return res.json({ folder, message: 'Folder renamed successfully.' });
  }

  @Post(':id')
  async handleTrashFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.markTrashFolder(sub, id);
    return res.json({ folder, message: 'Folder trashed successfully.' });
  }

  @Delete(':id')
  async handleDeleteFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.deleteFolder(sub, id);
    return res.json({ folder, message: 'Folder deleted successfully.' });
  }
}
