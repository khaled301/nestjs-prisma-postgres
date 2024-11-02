import { 
  Controller, Get, Post, Body, Patch, 
  Param, Delete, ValidationPipe, ParseIntPipe,
  Query, Ip
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CsLoggerService } from 'src/cs-logger/cs-logger.service';
// To avoid Throttle for entire controller | by default it is true for all routes when not specified
@SkipThrottle()
@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService) {}

  // instantiate logger with the controller name context
  private readonly logger = new CsLoggerService(EmployeesController.name);

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  // to skip throttling for this specific GET route
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(`Request for All Employees\t${ip}`, EmployeesController.name);
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  // Override default throttle/rate-limiting configuration for this specific PATCH route
  @Throttle({ short: { limit: 1, ttl: 1000 } })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
