import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { IsNull } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty({ message: 'Adres e-mail nie może być pusty' })
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  userEmail: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: 'Nazwa użytkownika nie może pusta' })
  username: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: 'Hasło nie może być puste' })
  password: string;
}
