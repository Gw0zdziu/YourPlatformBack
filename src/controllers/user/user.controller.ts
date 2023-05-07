import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/User/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { UpdateUserDto } from '../../dtos/User/update-user.dto';
import { UserDto } from '../../dtos/User/user.dto';

@Controller('user')
export class UserController {
  constructor(private userSvc: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<UserDto> {
    return await this.userSvc.getUser(userId);
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userSvc.getUsers();
  }

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

  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userSvc.deleteUser(userId);
  }
}
