import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRoleType } from './users.types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(private readonly databaseService: DatabaseService){}

    async findUserByName(username: string){
        return this.databaseService.user.findUnique({ where: { username } });
    }

    async newCreateUser(data: Prisma.UserCreateInput){
        const findUserByName: any = await this.findUserByName(data.username);
        if(findUserByName) throw new HttpException("Username already exists", 409);

        return this.databaseService.user.create({ data });
    }

    async newUpdateUser(id: number, data: Prisma.UserUpdateInput){
        const user = await this.newFindUser(id);
        if(!user) throw new HttpException("No Users Found", 404);

        const findUserByName: any = await this.findUserByName(data?.username as string);

        if(findUserByName) throw new HttpException("Username already exists", 409);

        return this.databaseService.user.update({ data, where: { id } });
    }

    async newDeleteUser(id: number){
        const user = await this.newFindUser(id);
        if(!user) throw new HttpException("No Users Found", 404);

        return this.databaseService.user.delete({ where: { id } });
    }

    async newFindAllUsers(){
        return await this.databaseService.user.findMany();
    }

    async newFindUser(id: number){
        const user = this.databaseService.user.findUnique({ where: { id } });

        if(!await user) throw new HttpException("No Users Found", 404);

        return user;
    }


    // APIs service with Static Data
    private users = [
        { 
            id: 1, 
            name: 'John',
            role: 'ADMIN',
            email: '2i9Qb@example.com',
        },
        { 
            id: 2, 
            name: 'Jane',
            role: 'ENGINEER',
            email: '3i9Qb@example.com',
        },
        { 
            id: 3, 
            name: 'Bob',
            role: 'INTERN',
            email: '4i9Qb@example.com',
        },
        { 
            id: 4, 
            name: 'Alice',
            role: 'ENGINEER',
            email: '5i9Qb@example.com',
        },
        { 
            id: 5, 
            name: 'Mark',
            role: 'INTERN',
            email: '6i9Qb@example.com',
        },
    ];

    findAll(role?: UserRoleType){
        if(role){
            const rolesArray =  this.users.filter(user => user?.role?.toLowerCase()?.trim() === role?.toLowerCase()?.trim());
            if(!rolesArray?.length) throw new NotFoundException("User Role Not Found");
            return rolesArray;  
        }

        return this.users;
    }

    findOne(id: number){
        const user = this.users.find(user => user?.id === id);
        if(!user) throw new NotFoundException("User not found");
        return user;
    }

    create(createUserDto: CreateUserDto){
        let usersByHighestID = [...this.users].sort((a, b) => b.id - a.id);

        const newUser = {
            id: usersByHighestID[0].id + 1,
            ...createUserDto
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map((user) => {
            if(user.id === id) return {...user, ...updateUserDto};
            return user;
        });

        this.findOne(id);
    }

    delete(id: number){
        let removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
