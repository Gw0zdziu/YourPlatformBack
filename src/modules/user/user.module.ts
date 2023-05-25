import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/user/controller/user.controller';
import { UserService } from 'src/modules/user/service/user.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
