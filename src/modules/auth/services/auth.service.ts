import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { HashService } from 'src/shared/hash/hash.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { User } from 'src/entities/User/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/dtos/User/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UserService } from 'src/services/user/user.service';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
    private hashSvc: HashService,
    private jwtSvc: JwtService,
    private confSvc: ConfigService,
    private userSvc: UserService,
  ) {}

  async signUp(newUser: CreateUserDto) {
    const { userEmail, username } = newUser;
    const isUserExist = await this.userSvc.isUserExist(username, userEmail);
    if (isUserExist) {
      throw new BadRequestException('Użytkownik o takich danych już istnieje');
    }
    newUser.password = await this.hashSvc.hashPassword(newUser.password);
    const user = this.classMapper.map(newUser, CreateUserDto, User);
    user.userId = uuid();
    await this.entities
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
    const tokens = await this.getTokens(user.userId, username, user.userEmail);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  async signIn(signInData: SignInDto): Promise<object> {
    const { username, password } = signInData;
    const user = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
    if (!user) {
      throw new UnauthorizedException('Nie znaleziono użytkownika');
    }
    if (!(await this.hashSvc.comparePassword(user?.password, password))) {
      throw new UnauthorizedException('Brak dostępu');
    }
    const tokens = await this.getTokens(
      user.userId,
      user.username,
      user.userEmail,
    );
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashSvc.hashPassword(refreshToken);
    await this.userSvc.updateToken(userId, hashedRefreshToken);
  }

  async logout(userId: string) {
    const refreshToken = null;
    return this.userSvc.updateToken(userId, refreshToken);
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
      throw new ForbiddenException('Brak dostępu');
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
