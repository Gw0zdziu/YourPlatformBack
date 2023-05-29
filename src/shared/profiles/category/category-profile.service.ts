import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { User } from 'src/shared/entities/user/user.entity';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { UserDto } from 'src/shared/dtos/user/user.dto';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';
import { Category } from 'src/shared/entities/category/category.entity';
import { CategoryListDto } from 'src/shared/dtos/category/category-list.dto';
import { UpdateCategoryDto } from 'src/shared/dtos/category/update-category.dto';

@Injectable()
export class CategoryProfileService extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CategoryDto,
        Category,
        forMember((dest: Category) => dest.categoryId, ignore()),
      );
      createMap(mapper, Category, CategoryListDto);
      createMap(
        mapper,
        UpdateCategoryDto,
        Category,
        forMember((dest: Category) => dest.categoryId, ignore()),
      );
    };
  }
}
