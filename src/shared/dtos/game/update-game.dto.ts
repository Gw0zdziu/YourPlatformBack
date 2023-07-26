import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto{

  @ApiProperty()
  @AutoMap()
  categoryId: string;g

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
