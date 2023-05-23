import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dtos/User/create-user.dto';
import { SignInDto } from 'src/modules/auth/dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @Post('signup')
  async signUp(@Body() newUser: CreateUserDto) {
    return this.authSvc.signUp(newUser);
  }

  @Post('signin')
  async signIn(@Body() newUser: SignInDto) {
    return this.authSvc.signIn(newUser);
  }

  @Get('logout')
  async logout(@Req() req) {
    return this.authSvc.logout(req.user.sub);
  }
}
