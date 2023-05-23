import { Module } from '@nestjs/common';
import { HashService } from 'src/shared/hash/hash.service';
import { UserService } from 'src/services/user/user.service';

@Module({
  providers: [HashService, UserService],
  exports: [HashService, UserService],
})
export class SharedModule {}
