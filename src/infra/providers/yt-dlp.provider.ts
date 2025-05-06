/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Provider } from '@nestjs/common';
import { ENVIRONMENT } from '@/environment/environment';
import { create } from 'youtube-dl-exec';

export const YTDLP_PROVIDER = 'YT-DLP-CLIENT';

export const YoutubeDlProvider: Provider = {
  provide: YTDLP_PROVIDER,
  useValue: create(ENVIRONMENT.YT_DLP_PATH), // ou useValue: create() se estiver no path global
};
