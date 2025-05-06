import { get } from 'env-var';

interface Environment {
  YT_DLP_PATH: string;
}
const ENVIRONMENT: Environment = {
  YT_DLP_PATH: get('YT_DLP_PATH').default('yt-dlp').asString(),
};

export { ENVIRONMENT };
