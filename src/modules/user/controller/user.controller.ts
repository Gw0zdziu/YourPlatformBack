import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param, Patch,
  Put,
  UseGuards
} from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { UserDto } from 'src/shared/dtos/user/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user/current-user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UpdatePasswordDto } from 'src/shared/dtos/user/update-password.dto';
import { UpdateUsernameDto } from 'src/shared/dtos/user/update-username.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userSvc: UserService) {}

  @ApiOperation({ summary: 'Get data logged user' })
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUser(@CurrentUser() req): Promise<UserDto> {
    return await this.userSvc.getUser(req.userId);
  }

  @ApiOperation({ summary: 'Get data all users' })
  @Get('all')
  async getUsers(): Promise<UserDto[]> {
    return await this.userSvc.getUsers();
  }

  @ApiOperation({ summary: 'Update user' })
  @Put()
  @HttpCode(204)
  async updateUser(@Body() updateUser: UpdateUserDto): Promise<void> {
    await this.userSvc.updateUser(updateUser);
  }

  @ApiOperation({ summary: 'Update password'})
  @Patch('update-password')
  async updatePassword(@Body() updatePassword: UpdatePasswordDto): Promise<void>{
    await this.userSvc.updatePassword(updatePassword);
  }

  @ApiOperation({ summary: 'Update username'})
  @Patch('update-username')
  async updateUsername(@Body() updateUsername: UpdateUsernameDto): Promise<void>{
    await this.userSvc.updateUsername(updateUsername);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userSvc.deleteUser(userId);
  }

  @ApiOperation({ summary: 'Does the email address exist?' })
  @Get(':userEmail')
  async isEmailExist(@Param('userEmail') userEmail: string): Promise<boolean> {
    return this.userSvc.isEmailExist(userEmail);
  }

  @ApiOperation({ summary: 'Does the username exist?' })
  @Get(':username')
  async isUserNameExist(@Param('username') username: string): Promise<boolean> {
    return this.userSvc.isUserNameExist(username);
  }
}
