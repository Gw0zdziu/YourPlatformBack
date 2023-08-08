import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { SignInDto } from 'src/shared/dtos/auth/sign-in.dto';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

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
  @Get('logout')
  async logout(@Headers('userId') userId) {
    await this.authSvc.logout(userId);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req) {
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;
    return this.authSvc.refreshTokens(userId, refreshToken);
  }

  @Get('check-token')
  async checkToken(@Headers('authorization') header: string) {
    if (!header || !header.startsWith('Bearer ')) {
      throw new HttpException('Błędny token', HttpStatus.UNAUTHORIZED);
    }
    const token = header.split(' ')[1];

    try {
      const isValid = await this.authSvc.verifyToken(token);
      return isValid;
    } catch (error) {
      throw new HttpException('Błędny token', HttpStatus.UNAUTHORIZED);
    }
  }
}
