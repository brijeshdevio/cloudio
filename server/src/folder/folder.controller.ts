import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
    const result = await this.folderService.getFolders(sub);
    return res.json(result);
  }

  @Get('stars')
  async handleGetStarredFolders(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folders = await this.folderService.getStarredFolders(sub);
    return res.json({ folders });
  }

  @Get('trash')
  async handleGetTrashFolders(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folders = await this.folderService.getTrashedFolders(sub);
    return res.json({ folders });
  }

  @Get(':id')
  async handleGetFolder(
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

  @Patch(':id/star')
  async handleStarFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.starFolder(sub, id);
    return res.json({ folder, message: 'Folder starred successfully.' });
  }

  @Patch(':id/unstar')
  async handleUnStarFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.unstarFolder(sub, id);
    return res.json({ folder, message: 'Folder unstarred successfully.' });
  }

  @Patch(':id/trash')
  async handleTrashFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.trashFolder(sub, id);
    return res.json({ folder, message: 'Folder moved to trash successfully.' });
  }

  @Patch(':id/restore')
  async handleRestoreFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    const folder = await this.folderService.restoreFolder(sub, id);
    return res.json({ folder, message: 'Folder restored successfully.' });
  }

  @Delete(':id')
  async handleDeleteFolder(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const { sub } = req.user;
    await this.folderService.deleteFolder(sub, id);
    return res.json({ message: 'Folder deleted successfully.' });
  }
}
