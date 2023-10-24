import pino, { Logger } from 'pino';

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
  },
});

export default function useLogger(): Logger {
  return logger;
}
