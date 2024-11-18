import jwtConfig from './jwt.config';
import databaseConfig from './database.config';
import redisConfig from './redis.config';

export const configLoads = [jwtConfig, databaseConfig, redisConfig];