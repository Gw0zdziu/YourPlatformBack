import { AutoMap } from '@automapper/classes';

export class GameDto{

  @AutoMap()
  categoryId: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  gameName: string;

  @AutoMap()
  gameDesc: string;

  @AutoMap()
  gameRating: number;
}
