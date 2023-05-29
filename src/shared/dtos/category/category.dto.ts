import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @AutoMap()
  categoryName: string;

  @IsString()
  @AutoMap()
  categoryDesc?: string;

  @IsString()
  @AutoMap()
  status: string;

  @IsString()
  @AutoMap()
  userId: string;
}
