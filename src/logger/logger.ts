import { ILogObj, Logger } from 'tslog';

export enum LogLevel {
  SILLY = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6,
}

let logger: Logger<ILogObj>;

export function initLogger(level: LogLevel, name: string): void {
  logger = new Logger<ILogObj>({
    minLevel: level,
    type: 'pretty',
    name: name,
    hideLogPositionForProduction: true,
  });
}

export { logger };
