import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { UserDto } from 'src/shared/dtos/user/user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('User')
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
