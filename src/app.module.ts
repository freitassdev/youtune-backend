import { Module } from '@nestjs/common';
import { YoutubeDlProvider } from '@/infra/providers/yt-dlp.provider';
import { DownloadController } from '@/infra/controllers/music.controller';
import { DownloadMusicUseCase } from '@/application/use-cases/download-music';
import { GetMusicInfoUseCase } from '@/application/use-cases/get-music-info';

@Module({
  imports: [],
  controllers: [DownloadController],
  providers: [YoutubeDlProvider, DownloadMusicUseCase, GetMusicInfoUseCase],
})
export class AppModule {}
