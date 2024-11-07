import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

export type User = {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class StaffService {
    constructor(private readonly databaseService: DatabaseService){}
    async findStaffByEmail(email: string) {
        return this.databaseService.staff.findFirst({ where: { email } });
    }
}
