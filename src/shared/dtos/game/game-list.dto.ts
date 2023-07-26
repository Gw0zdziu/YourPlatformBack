import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GameListDto{
  @ApiProperty()
  @AutoMap()
  gameId: string

  @ApiProperty()
  @AutoMap()
  categoryName: string

  @ApiProperty()
  @AutoMap()
  categoryId: string;

  @ApiProperty()
  @AutoMap()
  userId: string;

  @ApiProperty()
  @AutoMap()
  gameName: string;

  @ApiProperty()
  @AutoMap()
  gameDesc: string;

  @ApiProperty()
  @AutoMap()
  gameRating: number;
}
