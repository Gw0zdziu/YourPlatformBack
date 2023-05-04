import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from "@automapper/classes";

export class CreateUserDto {

  @AutoMap()
  @IsEmail()
  userEmail: string;

  @AutoMap()
  @IsString()
  userName: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  password: string;
}
