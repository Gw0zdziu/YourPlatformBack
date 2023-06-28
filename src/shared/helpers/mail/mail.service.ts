import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  url: string = this.configService.get('FRONT_URL');
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async sendMailVerification(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_EMAIL_TOKEN'),
      expiresIn: `1h`,
    });
    console.log(token);
    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@yourplatform.com',
      subject: 'Testing Nest MailerModule ✔',
      template: './verify-email',
      context: {
        url: `${this.url}/confirm-email?token=${token}`,
      },
    });
  }
}
