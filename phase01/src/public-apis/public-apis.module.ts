import { Module } from '@nestjs/common';
import { PublicApisService } from './public-apis.service';
import { PublicApisController } from './public-apis.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PublicApisController],
  providers: [PublicApisService],
})
export class PublicApisModule {}
