import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    database_url: process.env.DATABASE_URL,
    database_url_unpooled: process.env.DATABASE_URL_UNPOOLED
}));