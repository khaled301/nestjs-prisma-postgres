import { 
    Body, Controller, Delete, Get, 
    Param, Patch, Post, Query, ParseIntPipe,
    ValidationPipe, UsePipes
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleType } from './users.types';
import { NewCreateUserDto } from './dto/newCreateUser.dto';
import { NewUpdateUserDto } from './dto/newUpdateUser.dto';
import { Prisma } from '@prisma/client';

// Data transfer Object Schemas | DTOs
// Pipes are special type of middleware
// decorator | route order matters like water fall
@Controller('users') // route /users
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    /*
    /* We should use DTO in the controller because we need to validate, and
    /* "Prisma.UserCreateInput" or "Prisma.UserUpdateInput" may not provide
    /* a formatted or meaningful response for validation errors
    /* 
    /*
        newCreateUser(@Body() createUserDto: Prisma.UserCreateInput) {
            return this.usersService.newCreateUser(createUserDto);
        }

        newUpdateUser(@Param('id', ParseIntPipe) id: number,  @Body() updateUserDto: Prisma.UserUpdateInput) {
            return this.usersService.newUpdateUser(id, updateUserDto);
        }
    /*
    */

    @Post('new')
    @UsePipes(ValidationPipe)
    newCreateUser(@Body() createUserDto: NewCreateUserDto) {
        return this.usersService.newCreateUser(createUserDto);
    }

    @Patch('new/:id')
    @UsePipes(ValidationPipe)
    newUpdateUser(@Param('id', ParseIntPipe) id: number,  @Body() updateUserDto: NewUpdateUserDto) {
        return this.usersService.newUpdateUser(id, updateUserDto);
    }

    @Delete('new/:id')
    newDeleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.newDeleteUser(id);
    }

    @Get('new')
    newFindAllUsers() {
        return this.usersService.newFindAllUsers();
    }

    @Get('new/:id')
    newFindUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.newFindUser(id);
    }

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: UserRoleType){
        return this.usersService.findAll(role);
    }

    @Get(':id') // GET /users/:id
    // findOne(@Param('id') id: string) {
    //     // unary plus
    //     return this.usersService.findOne(+id);
    // }
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // POST /users
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') // GET /users/:id
    async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // GET /users/interns
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }

}
