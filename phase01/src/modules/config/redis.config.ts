import { registerAs } from '@nestjs/config';

export default registerAs('redisConf', () => ({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // db: process.env.REDIS_DB_NUMBER,
    password: process.env.REDIS_PASSWORD
}));