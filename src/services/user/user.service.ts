import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/User/create-user.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../entities/User/user.entity';
import { HashService } from '../../shared/hash/hash/hash.service';
import { UpdateUserDto } from '../../dtos/User/update-user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { v4 as uuid } from 'uuid';


@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
    private hashSvc: HashService,
  ) {}
  async createUser(newUser: CreateUserDto) {
    const {  userEmail, userName } = newUser;
    const isUserExist = await this.isUserExist(userName, userEmail);
    if (isUserExist) {
      throw new BadRequestException('Użytkownik o takich danych już istnieje');
    }
    newUser.password = await this.hashSvc.hashPassword(newUser.password);
    const user = this.classMapper.map(newUser, CreateUserDto, User);
    user.userId = uuid();
    await this.entities
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
  }

  async updateUser(updateDataUser: UpdateUserDto) {
    const { userId, userEmail, userName } = updateDataUser;
    const isUserIdExist = await this.isUserIdExist(userId);
    if (!isUserIdExist) {
      throw new NotFoundException('Nie znaleziono takie użytkownika');
    } else {
      const user = this.classMapper.map(updateDataUser, UpdateUserDto, User);
      console.log(user);
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

  private async isUserIdExist(userId: string): Promise<boolean> {
    const isUserIdExist = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getExists();
    return isUserIdExist;
  }
  private async isUserExist(userName: string, userEmail: string) {
    const isUserExist = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userEmail = :userEmail', { userEmail })
      .orWhere('user.userName = :userName', { userName })
      .getExists();
    return isUserExist;
  }
}
