import { Controller, Get, Param } from '@nestjs/common';
import { EmailConfirmationService } from 'src/modules/email-confirmation/service/email-confirmation.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Email confirmation')
@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private emailConfirmationService: EmailConfirmationService) {}

  @ApiOperation({ summary: 'Confirm email' })
  @Get(':token')
  async confirmEmail(@Param('token') token: string) {
    return this.emailConfirmationService.confirmEmail(token);
  }
}
