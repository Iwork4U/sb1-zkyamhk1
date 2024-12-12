import helmet from 'helmet';
import compression from 'compression';

export const securityMiddleware = [
  helmet(),
  helmet.hidePoweredBy(),
  helmet.noSniff(),
  helmet.xssFilter(),
  compression()
];