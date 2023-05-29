import { AutoMap } from '@automapper/classes';

export class UpdateCategoryDto {

  @AutoMap()
  categoryName: string;

  @AutoMap()
  categoryDesc?: string;

  @AutoMap()
  status: string;

  @AutoMap()
  userId: string;
}
