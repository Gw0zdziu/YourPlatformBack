import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GameDto {
  @ApiProperty()
  @AutoMap()
  gameName: string;

  @ApiProperty()
  @AutoMap()
  gameDesc: string;

  @ApiProperty()
  @AutoMap()
  gameRating: number;

  @ApiProperty()
  @AutoMap()
  categoryId: string;

  @ApiProperty()
  @AutoMap()
  userId: string;
}
