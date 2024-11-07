import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { validateStaffDto } from './dto/validateStaff.dto';
import { RegisterDto } from './dto/register.dto';

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
    // throw new NotImplementedException('This method is not implemented');
  }
}
