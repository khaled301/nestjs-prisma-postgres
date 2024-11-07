import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { StaffService } from 'src/staff/staff.service';
import { validateStaffDto } from './dto/validateStaff.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly staffService: StaffService
    ) {}

    async register(data: Prisma.StaffCreateInput): Promise<any> {
        return this.databaseService.staff.create({ data });
    }

    async login(): Promise<any> {
        return {};
    }

    async authenticate(data: validateStaffDto): Promise<AuthenticateDto> {
        const staff = await this.validateUser(data);

        if(!staff) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        return {
            id: staff.id,
            name: staff.name,
            accessToken: 'token'
        };
    }

    async validateUser(input: validateStaffDto): Promise<LoginDto | null> {
        const staff = await this.staffService.findUserByName(input?.email);

        if(staff && staff?.password === input?.password) {
            return {
                id: staff.id,
                name: staff.name
            };
        }

        null;
    }  
}
