import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {

  @ApiProperty()
  @AutoMap()
  categoryName: string;

  @ApiProperty()
  @AutoMap()
  categoryDesc?: string;

  @ApiProperty()
  @AutoMap()
  status: string;

  @ApiProperty()
  @AutoMap()
  userId: string;
}
