import { Inject } from '@nestjs/common';
import { ChildProcess } from 'node:child_process';
import { PassThrough } from 'node:stream';
import { Create } from 'youtube-dl-exec';

export class DownloadMusicUseCase {
  constructor(
    @Inject('YT-DLP-CLIENT')
    private readonly ytdlp: ReturnType<Create>,
  ) {}

  execute({ url }: Input): Promise<Output> {
    const subprocess = this.ytdlp.exec(url, {
      output: '-', // envia para stdout
      format: 'bestaudio',
      audioFormat: 'mp3',
      audioQuality: 0,
      quiet: true,
    }) as unknown as ChildProcess;

    const stream = new PassThrough();

    if (!subprocess.stdout) {
      throw new Error('No stdout stream from yt-dlp');
    }

    subprocess.stdout.pipe(stream);

    subprocess.stderr?.on('data', (data) => {
      console.error('yt-dlp stderr:', data);
    });

    subprocess.on('error', (err) => {
      stream.destroy(err);
    });

    subprocess.on('close', (code) => {
      if (code !== 0) {
        stream.destroy(new Error(`yt-dlp exited with code ${code}`));
      }
    });

    return Promise.resolve(stream);
  }
}

export type Input = {
  url: string;
};

export type Output = PassThrough;
