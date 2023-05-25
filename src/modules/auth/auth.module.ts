import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/modules/auth/strategy/jwt.strategy';
import { RefreshTokenStrategy } from 'src/modules/auth/strategy/refreshtoken.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
