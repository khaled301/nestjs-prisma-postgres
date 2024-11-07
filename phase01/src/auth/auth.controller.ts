import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { validateStaffDto } from './dto/validateStaff.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() body: validateStaffDto) {
    return this.authService.authenticate(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getStaffInfo(@Request() request) {
    console.log(request.staff);
    return request.staff;
  }

}
