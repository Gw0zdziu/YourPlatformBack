import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/User/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { UpdateUserDto } from '../../dtos/User/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userSvc: UserService) {}

  @Post()
  @HttpCode(204)
  async createUser(@Body() newUser: CreateUserDto): Promise<void> {
    await this.userSvc.createUser(newUser);
  }

  @Put()
  @HttpCode(204)
  async updateUser(@Body() updateUser: UpdateUserDto): Promise<void> {
    await this.userSvc.updateUser(updateUser);
  }
  // TODO: Add update User
}
