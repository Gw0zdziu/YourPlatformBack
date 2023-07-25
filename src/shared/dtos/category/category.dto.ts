import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  categoryName: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  categoryDesc?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  userId: string;
}
