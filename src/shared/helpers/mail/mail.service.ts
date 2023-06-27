import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendMail(email: string) {
    this.mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'noreply@yourplatform.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        html: '<b>Założono nowe konto na platformie yourPlatform</b>', // HTML body content
      })
      .then()
      .catch();
  }
}
