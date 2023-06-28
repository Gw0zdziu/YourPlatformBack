import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmationController } from 'src/modules/email-confirmation/controller/email-confirmation.controller';

describe('EmailConfirmationController', () => {
  let controller: EmailConfirmationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailConfirmationController],
    }).compile();

    controller = module.get<EmailConfirmationController>(EmailConfirmationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
