import { AutoMap } from '@automapper/classes';

export class UpdateGameDto{

  @AutoMap()
  gameId: string;

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
