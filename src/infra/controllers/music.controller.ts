import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadMusicUseCase } from '../../application/use-cases/download-music';
import { GetMusicInfoUseCase } from '@/application/use-cases/get-music-info';

@Controller('download')
export class DownloadController {
  constructor(
    private readonly downloadMusic: DownloadMusicUseCase,
    private readonly getMusicInfo: GetMusicInfoUseCase,
  ) {}

  @Get('music')
  async download(@Query('url') url: string, @Res() res: Response) {
    const stream = await this.downloadMusic.execute({ url });

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="music.mp3"',
    });

    stream.pipe(res);
  }

  @Get('music-info')
  async musicInfo(@Query('url') url: string) {
    const info = await this.getMusicInfo.execute({ url });
    return info;
  }
}
