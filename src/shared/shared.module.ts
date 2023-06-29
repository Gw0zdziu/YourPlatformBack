import { Module } from '@nestjs/common';
import { HashService } from 'src/shared/helpers/hash/hash.service';
import { UserService } from 'src/modules/user/service/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailHelperService } from 'src/shared/helpers/mail/mail-helper.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: config.get('EMAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: 'gw0zdziu09@gmail.com',
        },
        template: {
          dir: join('src/shared/helpers/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({}),
  ],
  providers: [HashService, UserService, MailHelperService],
  exports: [HashService, UserService, MailHelperService],
})
export class SharedModule {}
