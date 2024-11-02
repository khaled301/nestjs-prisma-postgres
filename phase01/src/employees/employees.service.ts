import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ 
      data: createEmployeeDto 
    });
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    const employeesArray = this.databaseService.employee.findMany({
      where: { role: { in: role ? [role] : undefined } }
    });

    return employeesArray;

    // const employeesArray = await this.databaseService.employee.findMany({
    //   where: { role: { in: role ? [role] : undefined}}
    // });
    // return employeesArray?.length ? employeesArray : "No Employees Found";
  }

  async findOne(id: number) {
    return this.databaseService.employee.findFirst({
      where: { id : id }
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      data: updateEmployeeDto,
      where: { id: id }
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id: id }
    })
  }
}
