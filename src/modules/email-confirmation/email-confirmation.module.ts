import { Module } from '@nestjs/common';
import { EmailConfirmationController } from 'src/modules/email-confirmation/controller/email-confirmation.controller';
import { EmailConfirmationService } from 'src/modules/email-confirmation/service/email-confirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [JwtModule.register({}), SharedModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
