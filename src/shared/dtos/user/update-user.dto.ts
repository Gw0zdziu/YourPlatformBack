import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  @AutoMap()
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  @IsNotEmpty({ message: 'Adres e-mail nie może być pusty' })
  userEmail: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: 'Nazwa użytkownika nie może pusta' })
  userName: string;
}
