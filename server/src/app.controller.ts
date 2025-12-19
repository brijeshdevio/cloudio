import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('items')
  async handleGetItems(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const items = await this.appService.getItems(req.user.sub);
    return res.json(items);
  }

  @UseGuards(AuthGuard)
  @Get('stars')
  async handleGetStarItems(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const items = await this.appService.getStarredItems(req.user.sub);
    return res.json(items);
  }

  @UseGuards(AuthGuard)
  @Get('trash')
  async handleGetTrashItems(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const items = await this.appService.getTrashItems(req.user.sub);
    return res.json(items);
  }

  @UseGuards(AuthGuard)
  @Get('recent')
  async handleGetRecentItems(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    const items = await this.appService.getRecentItems(req.user.sub);
    return res.json(items);
  }

  @UseGuards(AuthGuard)
  @Delete('trash/empty')
  async handleTrashEmpty(
    @Req() req: { user: { sub: string } },
    @Res() res: Response,
  ): Promise<Response> {
    await this.appService.trashEmpty(req.user.sub);
    return res.json({ message: 'Trash emptied successfully' });
  }
}
