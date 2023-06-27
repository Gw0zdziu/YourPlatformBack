import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/shared/entities/user/user.entity';
import { HashService } from 'src/shared/helpers/hash/hash.service';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserDto } from 'src/shared/dtos/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
    private hashSvc: HashService,
  ) {}

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getOne();
    if (!user) {
      throw new NotFoundException('Nie znaleziono użytkownika');
    } else {
      const userMap = this.classMapper.map(user, User, UserDto);
      return userMap;
    }
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    if (!users) {
      throw new NotFoundException('Nie znaleziono użytkowników');
    } else {
      const usersMap = this.classMapper.mapArray(users, User, UserDto);
      return usersMap;
    }
  }
  async updateToken(userId: string, refreshToken?: string){
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
      throw new NotFoundException('Nie znaleziono takie użytkownika');
    } else {
      const user = this.classMapper.map(updateDataUser, UpdateUserDto, User);
      await this.entities
        .createQueryBuilder()
        .update(User)
        .set(user)
        .where('userId = :userId', { userId })
        .execute();
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const isUserIdExist = await this.isUserIdExist(userId);
    if (!isUserIdExist) {
      throw new NotFoundException('Nie znaleziono takie użytkownika');
    } else {
      await this.entities
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('userId = :userId', { userId })
        .execute();
    }
  }

  async isUserIdExist(userId: string): Promise<boolean> {
    return  await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getExists();
  }
  async isUserExist(username: string, userEmail: string): Promise<boolean> {
    return await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userEmail = :userEmail', { userEmail })
      .orWhere('user.username = :username', { username })
      .getExists();
  }
}
