import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/shared/entities/user/user.entity';
import { MailHelperService } from 'src/shared/helpers/mail/mail-helper.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailHelperService,
  ) {}

  async confirmEmail(token: string) {
    try {
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
      }
    }
    catch (error) {
      if (error?.name === 'TokenExpiredError'){
        throw new HttpException(
          'Link aktywacyjny wygasł',
          HttpStatus.CONFLICT,
        );
      }
    }
    throw new HttpException(
      'Nie poprawny link aktywacyjny',
      HttpStatus.CONFLICT,
    );
  }

  async resendEmailVerificationLink(email: string) {
    await this.mailService.sendMailVerification(email);
  }
}
