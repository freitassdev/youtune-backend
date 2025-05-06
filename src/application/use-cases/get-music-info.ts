import { Inject } from '@nestjs/common';
import { Create } from 'youtube-dl-exec';

export class GetMusicInfoUseCase {
  constructor(
    @Inject('YT-DLP-CLIENT')
    private readonly ytdlp: ReturnType<Create>,
  ) {}

  async execute({ url }: Input): Promise<Output> {
    const info = await this.ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: url,
    });

    return {
      title: info.title,
      thumbnail: info.thumbnail,
      artist: info.uploader,
      duration: info.duration,
    };
  }
}

export type Input = {
  url: string;
};

export type Output = {
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
};
