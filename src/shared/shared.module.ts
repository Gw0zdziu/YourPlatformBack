import { Module } from '@nestjs/common';
import { HashService } from 'src/shared/helpers/hash/hash.service';
import { UserService } from 'src/modules/user/service/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [HashService, UserService],
  exports: [HashService, UserService],
})
export class SharedModule {}
