import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

// only works with GET routes
// @Res() res ==> doesn't work well with the @UseInterceptors
@UseInterceptors(CacheInterceptor) 
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // override default ttl
  @CacheTTL(60000)
  @Get()
  async getStudents() {
    return await this.studentsService.getStudents();
  }
}
