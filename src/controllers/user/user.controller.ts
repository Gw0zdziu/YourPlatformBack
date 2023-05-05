import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/User/create-user.dto';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {

  constructor(
    private userSvc: UserService
  ) {
  }
  @Post()
  async createUser(@Body() newUser: CreateUserDto){
    return await this.userSvc.createUser(newUser);
  }
}
