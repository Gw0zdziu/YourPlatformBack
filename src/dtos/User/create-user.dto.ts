import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @AutoMap()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  userEmail: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}
