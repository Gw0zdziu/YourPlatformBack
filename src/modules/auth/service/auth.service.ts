import {
  BadRequestException,
  ForbiddenException, HttpException, HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { HashService } from 'src/shared/helpers/hash/hash.service';
import { SignInDto } from 'src/shared/dtos/auth/sign-in.dto';
import { User } from 'src/shared/entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UserService } from 'src/modules/user/service/user.service';
import { MailHelperService } from 'src/shared/helpers/mail/mail-helper.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
    private hashSvc: HashService,
    private jwtSvc: JwtService,
    private confSvc: ConfigService,
    private userSvc: UserService,
    private mailSvc: MailHelperService,
  ) {}

  async signUp(newUser: CreateUserDto) {
    const { userEmail, username } = newUser;
    const isUserExist = await this.userSvc.isEmailExist(userEmail);
    if (isUserExist) {
      throw new BadRequestException('Użytkownik o takim emailu już istnieje');
    }
    const isUserNameExist = await this.userSvc.isUserNameExist(username);
    if (isUserNameExist) {
      throw new BadRequestException('Użytkownik o takiej nazwie już istnieje');
    }
    const user = this.classMapper.map(newUser, CreateUserDto, User);
    user.userId = uuid();
    user.password = await this.hashSvc.hashPassword(newUser.password);
    user.isEmailConfirmed = false;
    await this.entities
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
    const tokens = await this.getTokens(user.userId, username, user.userEmail);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    await this.mailSvc.sendMailVerification(userEmail);
  }

  async signIn(signInData: SignInDto): Promise<object> {
    const { username, password } = signInData;
    const user = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
    if (!user) {
      throw new HttpException(
        'Nie znaleziono użytkownika',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordMatch: boolean = await this.hashSvc.comparePassword(
      user?.password,
      password,
    );
    if (!isPasswordMatch) {
      throw new HttpException('Brak dostępu', HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.getTokens(
      user.userId,
      user.username,
      user.userEmail,
    );
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return {
      userId: user.userId,
      username: user.username,
      userEmail: user.userEmail,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isConfirmed: user.isEmailConfirmed,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashSvc.hashPassword(refreshToken);
    await this.userSvc.updateToken(userId, hashedRefreshToken);
  }

  async logout(userId: string) {
    return this.userSvc.updateToken(userId, null);
  }

  async getTokens(userId: string, username: string, userEmail: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSvc.signAsync(
        {
          userId,
          username,
          userEmail,
        },
        {
          secret: this.confSvc.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtSvc.signAsync(
        {
          userId,
          username,
          userEmail,
        },
        {
          secret: this.confSvc.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getOne();
    if (!user || !user.refreshToken) {
      throw new HttpException('Brak dostępu', HttpStatus.UNAUTHORIZED);
    }
    const refreshTokenMatch = await this.hashSvc.comparePassword(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatch) {
      throw new ForbiddenException('Brak dostępu');
    }
    const tokens = await this.getTokens(
      user.userId,
      user.username,
      user.userEmail,
    );
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }
}
