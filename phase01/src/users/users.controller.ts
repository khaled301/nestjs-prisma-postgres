import { 
    Body, Controller, Delete, Get, 
    Param, Patch, Post, Query, ParseIntPipe,
    ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleType } from './users.types';

// Data transfer Object Schemas | DTOs
// Pipes are special type of middleware
// decorator | route order matters like water fall
@Controller('users') // route /users
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

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
