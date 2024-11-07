import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [StaffService],
  exports: [StaffService],
  imports: [DatabaseModule]
})
export class StaffModule {}
