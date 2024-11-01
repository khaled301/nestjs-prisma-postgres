import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

type UserRoleType = 'INTERN' | 'ADMIN' | 'ENGINEER';

// decorator | route order matters like water fall
@Controller('users') // route /users
export class UsersController {


    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role: Partial<UserRoleType>, @Query('department') department: string): string[]{
        return [`${role}`, `${department}`];
    }

    @Get('interns') // GET /users/interns
    findInterns(): []{
        return []
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return { id }
    }

    @Post() // POST /users
    createUser(@Body() user: {}) {
        return user
    }

    @Patch(':id') // GET /users/:id
    async update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    @Delete(':id') // GET /users/interns
    delete(@Param('id') id: string){
        return { id }
    }
}
