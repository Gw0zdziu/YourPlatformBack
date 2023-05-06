import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { Unique } from 'typeorm';

export class UpdateUserDto {
  userId: string;

  @AutoMap()
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  @IsNotEmpty({ message: 'Adres e-mail nie może być pusty' })
  userEmail: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: 'Nazwa użytkownika nie może pusta' })
  userName: string;
}
