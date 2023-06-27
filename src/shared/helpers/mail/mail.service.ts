import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendMail(email: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'noreply@yourplatform.com',
      subject: 'Testing Nest MailerModule ✔',
      html: '<b>Założono nowe konto na platformie yourPlatform</b>'s,
    });
  }
}
