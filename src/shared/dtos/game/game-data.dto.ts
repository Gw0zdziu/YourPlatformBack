import { AutoMap } from '@automapper/classes';

export class GameDataDto {

  @AutoMap()
  gameId: string;

  @AutoMap()
  categoryId: string;

  @AutoMap()
  gameName: string;

  @AutoMap()
  gameDesc: string;

  @AutoMap()
  gameRating: number;
}
