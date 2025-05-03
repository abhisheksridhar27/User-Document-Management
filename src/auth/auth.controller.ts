import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResponseWrapper } from 'src/common/dto/response-wrapper.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const auth = await this.authService.register(dto);
    return new ResponseWrapper(201, 'User Registered Succesfully', auth);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const auth = await this.authService.login(dto);
    return new ResponseWrapper(201, 'User logged in successfully', auth);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const auth = await this.authService.logout(req.user);
    return new ResponseWrapper(200, 'User logged out successfully', auth);
  }
}
