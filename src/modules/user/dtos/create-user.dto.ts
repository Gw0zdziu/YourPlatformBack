import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  userId: string;

  @AutoMap()
  @IsNotEmpty({ message: 'Adres e-mail nie może być pusty' })
  @IsEmail({}, { message: 'Niepoprawny format adresu e-mail' })
  userEmail: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: 'Nazwa użytkownika nie może pusta' })
  username: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: 'Hasło nie może być puste' })
  password: string;

  refreshToken: string;
}
