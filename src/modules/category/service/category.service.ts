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
import { Statuses } from 'src/shared/misc/statuses';
import { UpdateCategoryDto } from 'src/shared/dtos/category/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectDataSource() private entities: DataSource,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async deactivateCategory(categoryId: string): Promise<void> {
    const category = await this.isCategoryExist(categoryId, Statuses.ACT);
    if (!category) {
      throw new HttpException(
        'Taka kategoria nie istnieje',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.entities
      .getRepository(Category)
      .createQueryBuilder()
      .update(Category)
      .set({ status: Statuses.UAC })
      .where('categoryId = :categoryId', { categoryId })
      .execute();
  }

  async getCategoriesByUserId(userId: string): Promise<Category[]> {
    const categories = await this.entities
      .getRepository(Category)
      .createQueryBuilder('category')
      .leftJoin('category.games', 'game')
      .loadRelationCountAndMap('category.gameCount', 'category.games')
      .where('category.userId = :userId', { userId })
      .andWhere('category.status = :status', { status: Statuses.ACT })
      .getMany();
    if (!categories) {
      throw new HttpException(
        'Użytkownik nie posiada żadnych kategorii',
        HttpStatus.NOT_FOUND,
      );
    }
    return categories;
  }

  async getCategoriesNames(userId: string): Promise<Category[]> {
    const categories = await this.entities
      .getRepository(Category)
      .createQueryBuilder('category')
      .select(['category.categoryId', 'category.categoryName'])
      .where('category.userId = :userId', { userId })
      .andWhere('category.status = :status', { status: Statuses.ACT })
      .getMany();
    if (!categories) {
      throw new HttpException(
        'Użytkownik nie posiada żadnych kategorii',
        HttpStatus.NOT_FOUND,
      );
    }
    return categories;
  }

  async getCategoryById(categoryId: string): Promise<CategoryListDto> {
    const category = await this.isCategoryExist(categoryId, Statuses.ACT);
    if (!category) {
      throw new HttpException(
        'Taka kategoria nie istnieje',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.classMapper.map(category, Category, CategoryListDto);
  }
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
      .andWhere('category.status = :status', { status: Statuses.ACT })
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
    categoryMap.status = Statuses.ACT;
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
    return this.classMapper.mapArray(categories, Category, CategoryListDto);
  }

  async updateCategory(
    categoryId: string,
    updatedCategory: UpdateCategoryDto,
  ): Promise<void> {
    const isUpdatedCategoryExist = await this.isCategoryExist(
      categoryId,
      Statuses.ACT,
    );
    if (!isUpdatedCategoryExist) {
      throw new HttpException(
        'Taka kategoria nie istnieje',
        HttpStatus.NOT_FOUND,
      );
    }
    const categoryMap = this.classMapper.map(
      updatedCategory,
      UpdateCategoryDto,
      Category,
    );
    await this.entities
      .createQueryBuilder()
      .update(Category)
      .set(categoryMap)
      .where('categoryId = :categoryId', { categoryId })
      .execute();
  }

  private async isCategoryExist(
    categoryId: string,
    status: string,
  ): Promise<Category> {
    return await this.entities
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.categoryId = :categoryId', { categoryId })
      .andWhere('category.status = :status', { status })
      .getOne();
  }
}
