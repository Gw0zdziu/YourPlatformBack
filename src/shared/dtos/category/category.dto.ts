import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {

  @ApiProperty()
  @IsString()
  @AutoMap()
  categoryName: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  categoryDesc?: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  status: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  userId: string;
}
