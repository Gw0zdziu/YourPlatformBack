import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Category } from 'src/shared/entities/category/category.entity';
import { v4 as uuid } from 'uuid';
import { User } from 'src/shared/entities/user/user.entity';
import { CategoryListDto } from 'src/shared/dtos/category/category-list.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async createNewCategory(newCategory: CategoryDto): Promise<void> {
    const { categoryName, userId } = newCategory;
    const user = await this.entities
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getExists();
    if (!user) {
      throw new HttpException(
        'Nie znaleziono użytkownika',
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = await this.entities
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.categoryName = :categoryName', {
        categoryName,
      })
      .getExists();
    if (category) {
      throw new HttpException(
        'Kategoria o takiej nazwie istnieje',
        HttpStatus.BAD_REQUEST,
      );
    }
    const categoryMap = this.classMapper.map(
      newCategory,
      CategoryDto,
      Category,
    );
    categoryMap.categoryId = uuid();
    console.log(categoryMap);
    await this.entities
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(categoryMap)
      .execute();
  }

  async getCategories(): Promise<CategoryListDto[]> {
    const categories = await this.entities
      .getRepository(Category)
      .createQueryBuilder('categories')
      .getMany();
    console.log(categories)
    const mappedCategories = this.classMapper.mapArray(
      categories,
      Category,
      CategoryListDto,
    );
    console.log(mappedCategories);
    return mappedCategories;
  }
}
