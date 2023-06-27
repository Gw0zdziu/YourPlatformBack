import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { SignInDto } from 'src/shared/dtos/auth/sign-in.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MailService } from 'src/shared/helpers/mail/mail.service';



@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService, private mailService: MailService) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post('signup')
  async signUp(@Body() newUser: CreateUserDto) {
    return this.authSvc.signUp(newUser);
  }


  @ApiOperation({ summary: 'Login user' })
  @Post('signin')
  async signIn(@Body() newUser: SignInDto) {
    return this.authSvc.signIn(newUser);
  }

  @ApiOperation({ summary: 'Logout user' })
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    await this.authSvc.logout(req.user.userId);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;
    return this.authSvc.refreshTokens(userId, refreshToken);
  }
}
