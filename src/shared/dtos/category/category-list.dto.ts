import { AutoMap } from '@automapper/classes';

export class CategoryListDto {
  @AutoMap()
  categoryId: string;

  @AutoMap()
  categoryName: string;

  @AutoMap()
  categoryDesc?: string;

  @AutoMap()
  status: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  gameCount: number;
}
