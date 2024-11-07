import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { StaffService } from 'src/staff/staff.service';
import { validateStaffDto } from './dto/validateStaff.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly staffService: StaffService,
        private readonly jwtService: JwtService
    ) {}

    async register(data: Prisma.StaffCreateInput): Promise<any> {
        return this.databaseService.staff.create({ data });
    }

    async authenticate(data: validateStaffDto): Promise<AuthenticateDto> {
        const staff = await this.validateUser(data);

        if(!staff) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        return this.login(staff);
    }

    async login(staff: LoginDto): Promise<AuthenticateDto> {
        const tokenPayload = {
            sub: staff.id,
            username: staff.name
        };
        
        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {...staff, accessToken};
    }

    async validateUser(input: validateStaffDto): Promise<LoginDto | null> {
        const staff = await this.staffService.findStaffByEmail(input?.email);

        if(staff && staff?.password === input?.password) {
            return {
                id: staff.id,
                name: staff.name
            };
        }

        null;
    }  
}
