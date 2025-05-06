import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadMusicUseCase } from '../../application/use-cases/download-music';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadMusic: DownloadMusicUseCase) {}

  @Get('music')
  async download(@Query('url') url: string, @Res() res: Response) {
    const stream = await this.downloadMusic.execute({ url });

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="music.mp3"',
    });

    stream.pipe(res);
  }
}
