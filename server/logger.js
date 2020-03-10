import pino from 'pino';
import expressPinoLogger from 'express-pino-logger';
const pinoLogger = pino({ prettyPrint: true });
const pinoLoggerMiddleware = expressPinoLogger();

export { pinoLogger as logger };
export { pinoLoggerMiddleware as loggerMiddleware };
export default {
  debug: (message, ...args) => pinoLogger.debug(message, args),
  error: (message, ...args) => pinoLogger.error(message, args),
  info: (message, ...args) => pinoLogger.info(message, args)
};
