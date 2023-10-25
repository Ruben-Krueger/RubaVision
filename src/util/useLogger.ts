import pino, { Logger } from 'pino';

const token = 'eSfQsiGt3NkYJbMpTjEYvtAY';

const logger = pino({
  target: '@logtail/pino',
  options: { sourceToken: token },
  browser: {
    serialize: true,
    asObject: true,
  },
});

export default function useLogger(): Logger {
  return logger;
}
