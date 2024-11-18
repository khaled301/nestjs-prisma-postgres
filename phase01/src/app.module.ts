import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { CsLoggerModule } from './cs-logger/cs-logger.module';
import { PublicApisModule } from './public-apis/public-apis.module';
import { PostsModule } from './posts/posts.module';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configLoads } from './modules/config';
import { CacheModule } from '@nestjs/cache-manager';
import { StudentsModule } from './students/students.module';
import { redisStore } from 'cache-manager-redis-yet';

// Main/Roots application module
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configLoads,
      envFilePath: '.env'
    }),
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'short',
        ttl: 60000,
        limit: 100
      }
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          // The "ttl" is required to set here inside redis store because 
          // the default "ttl" will not work with "registerAsync" as expected
          ttl: 30 * 1000,
          socket: {
              host: config.get('REDIS_HOST').host,
              port: config.get('REDIS_PORT').port
          }
        });

        return { store };
      },
      
      // // like abovein production we need to configure the redisStore to connect to the redis server with
      // // username,password,host, port ...
      // // using configService & .env
      // store: redisStore,

      //// the below "ttl" will work if the "CacheModule" uses "register" instead of "registerAsync"
      // ttl: 10000,
    }),
    CsLoggerModule,
    PublicApisModule,
    PostsModule,
    StaffModule,
    AuthModule,
    StudentsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
