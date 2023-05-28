import { Module } from '@nestjs/common';
import { HashService } from 'src/shared/services/hash/hash.service';
import { UserService } from 'src/modules/user/service/user.service';

@Module({
  providers: [HashService, UserService],
  exports: [HashService, UserService],
})
export class SharedModule {}
