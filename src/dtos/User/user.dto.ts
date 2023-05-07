import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  userEmail: string;

  @AutoMap()
  userName: string;
}
