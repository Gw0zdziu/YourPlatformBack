import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'rxjs';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  async sendMail(email: string) {
    const url = this.configService.get('VERIFY_EMAIL_PAGE_URL');
    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@yourplatform.com',
      subject: 'Testing Nest MailerModule ✔',
      template: './verify-email',
      context: {
        email: email,
        url: url,
      },
    });
  }
}
