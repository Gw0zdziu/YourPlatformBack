import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/User/create-user.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../entities/User/user.entity';
import { HashService } from '../../shared/hash/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    private hashSvc: HashService,
  ) {}
  async createUser(newUser: CreateUserDto) {
    newUser.password = await this.hashSvc.hashPassword(newUser.password);
    const user = this.entities
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(newUser)
      .execute();
  }
}
