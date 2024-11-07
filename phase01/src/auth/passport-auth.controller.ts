import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { validateStaffDto } from './dto/validateStaff.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt-auth.guard';

@Controller('auth-v2')
export class AuthV2Controller {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    /**
     * Logs in a user.
     * @remarks
     * The login body must be a valid {@link validateStaffDto}.
     * The user object is added to the request by passport, so we can just ask for it.
     * @returns The user object with an access token.
     */
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    @UsePipes(ValidationPipe)
    login(@Body() body: validateStaffDto, @Request() request) {
        // passport will add the "user" object to the request object
        // console.log(request.user);
        return this.authService.login(request.user);
    }

    @Get('me')
    @UseGuards(PassportJwtAuthGuard)
    getStaffInfo(@Request() request) {
        console.log(request.user, ` <<--------- request.user`);

        // passport will add the "user" object to the request object
        // the "user" object will be different in different strategies
        // for "login" and "me" the "request.user" will be different
        return request.user;
    }

}
