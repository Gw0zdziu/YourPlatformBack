import { Module } from '@nestjs/common';
import { HashService } from 'src/shared/helpers/hash/hash.service';
import { UserService } from 'src/modules/user/service/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from 'src/shared/helpers/mail/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: '26738fea25f51b',
            pass: '0ef32fa7fb1aa0',
          },
        },
        defaults: {
          from: 'gw0zdziu09@gmail.com',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [HashService, UserService, MailService],
  exports: [HashService, UserService, MailService],
})
export class SharedModule {}
