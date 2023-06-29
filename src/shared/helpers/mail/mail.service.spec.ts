import { Test, TestingModule } from '@nestjs/testing';
import { MailHelperService } from 'src/shared/helpers/mail/mail-helper.service';

describe('MailService', () => {
  let service: MailHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailHelperService],
    }).compile();

    service = module.get<MailHelperService>(MailHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
