import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Statuses } from 'src/shared/misc/statuses';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  categoryName: string;

  @ApiProperty()
  @AutoMap()
  categoryDesc?: string;
  
}
