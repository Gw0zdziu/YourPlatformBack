import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dtos/User/create-user.dto';
import { SignInDto } from 'src/modules/auth/dtos/sign-in.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { raw } from 'express';
import { RefreshTokenGuard } from 'src/modules/auth/guard/refresh-token.guard';


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

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    await this.authSvc.logout(req.user.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;
    return this.authSvc.refreshTokens(userId, refreshToken);
  }
}
