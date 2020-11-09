import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  JWT_SECRETKEY: process.env.JWT_SECRETKEY,
  JWT_EXPIRESIN: process.env.JWT_EXPIRESIN,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
}));
