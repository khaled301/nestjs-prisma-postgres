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
import { ConfigModule } from '@nestjs/config';
import { configLoads } from './modules/config';

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
    CsLoggerModule,
    PublicApisModule,
    PostsModule,
    StaffModule,
    AuthModule
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
