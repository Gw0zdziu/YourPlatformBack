import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/shared/entities/user/user.entity';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserDto } from 'src/shared/dtos/user/user.dto';
import { UpdateUsernameDto } from 'src/shared/dtos/user/update-username.dto';
import { UpdatePasswordDto } from 'src/shared/dtos/user/update-password.dto';
import { HashService } from 'src/shared/helpers/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private hashSvc: HashService,
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getOne();
    if (!user) {
      throw new NotFoundException('Nie znaleziono użytkownika');
    }
    return this.classMapper.map(user, User, UserDto);
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    if (!users) {
      throw new NotFoundException('Nie znaleziono użytkowników');
    }
    return this.classMapper.mapArray(users, User, UserDto);
  }

  async updateToken(userId: string, refreshToken?: string) {
    const isUserIdExist = await this.isUserIdExist(userId);
    if (!isUserIdExist) {
      throw new NotFoundException('Nie znaleziono użytkownika');
    }
    return await this.entities
      .createQueryBuilder()
      .update(User)
      .set({ refreshToken })
      .where('userId = :userId', { userId })
      .execute();
  }

  async updateUser(updateDataUser: UpdateUserDto) {
    const { userId, userEmail, userName } = updateDataUser;
    const isUserIdExist = await this.isUserIdExist(userId);
    if (!isUserIdExist) {
      throw new NotFoundException('Nie znaleziono użytkownika');
    }
    const isUserExist = await this.isEmailExist(userEmail);
    if (isUserExist) {
      throw new BadRequestException('Użytkownik o takim emailu już istnieje');
    }
    const isUserNameExist = await this.isUserNameExist(userName);
    if (isUserNameExist) {
      throw new BadRequestException('Użytkownik o takiej nazwie już istnieje');
    }
    const user = this.classMapper.map(updateDataUser, UpdateUserDto, User);
    await this.entities
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where('userId = :userId', { userId })
      .execute();
  }

  async updateUsername(
    newUsername: UpdateUsernameDto,
  ): Promise<void> {
    const { userId, username } = newUsername;
    const isUserExist: boolean = await this.isUserIdExist(userId);
    if (!isUserExist) {
      throw new HttpException(
        'Nie znaleziono użytkownika',
        HttpStatus.NOT_FOUND,
      );
    }
    const isUserNameExist = await this.isUserNameExist(username);
    if (isUserNameExist) {
      throw new HttpException(
        'Nazwa użytkownika jest zajęta',
        HttpStatus.CONFLICT,
      );
    }
    this.entities
      .createQueryBuilder()
      .update(User)
      .set({
        username: username,
      })
      .where('userId = :userId', { userId })
      .execute();
  }

  async updatePassword(updatePassword: UpdatePasswordDto): Promise<void> {
    const { userId, oldPassword, newPassword } = updatePassword;
    const isUserIdExist: boolean = await this.isUserIdExist(userId);
    if (!isUserIdExist) {
      throw new HttpException(
        'Nie znaleziono użytkownika',
        HttpStatus.NOT_FOUND,
      );
    }
    const userPassword = await this.entities
      .createQueryBuilder()
      .select('user.password')
      .from(User, 'user')
      .where('user.userId = :userId', { userId })
      .getOne();
    const arePasswordIdentical = await this.hashSvc.comparePassword(
      userPassword.password,
      oldPassword,
    );
    if (!arePasswordIdentical) {
      throw new HttpException(
        'Stare hasło jest nie prawidłowe',
        HttpStatus.CONFLICT,
      );
    }
    console.log(arePasswordIdentical);
    const newHashedPassword = await this.hashSvc.hashPassword(newPassword);
    await this.entities
      .createQueryBuilder()
      .update(User)
      .set({
        password: newHashedPassword,
      })
      .where('userId = :userId', { userId })
      .execute();
  }

  async deleteUser(userId: string): Promise<void> {
    const isUserIdExist = await this.isUserIdExist(userId);
    if (!isUserIdExist) {
      throw new NotFoundException('Nie znaleziono użytkownika');
    }
    await this.entities
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('userId = :userId', { userId })
      .execute();
  }

  async isUserIdExist(userId: string): Promise<boolean> {
    return await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getExists();
  }
  async isEmailExist(userEmail: string): Promise<boolean> {
    return await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userEmail = :userEmail', { userEmail })
      .getExists();
  }

  async isUserNameExist(username: string): Promise<boolean> {
    return await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getExists();
  }
}
