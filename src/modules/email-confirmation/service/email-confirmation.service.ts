import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/shared/entities/user/user.entity';

@Injectable()
export class EmailConfirmationService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async confirmEmail(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_VERIFICATION_EMAIL_TOKEN'),
    });
    if (typeof payload === 'object' && 'email' in payload) {
      const user = await this.entities
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.userEmail = :userEmail', {
          userEmail: payload.email,
        })
        .getOne();
      console.log(user);
      if (!user) {
        throw new HttpException(
          'Nie znaleziono użytkownika',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.entities
        .createQueryBuilder()
        .update(User)
        .set({ isEmailConfirmed: true })
        .where('userEmail = :userEmail', { userEmail: user.userEmail })
        .execute();
    } else {
      throw new HttpException(
        'Nie poprawny link aktywacyjny',
        HttpStatus.CONFLICT,
      );
    }
  }
}
