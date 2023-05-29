import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/service/category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';
import { CategoryListDto } from 'src/shared/dtos/category/category-list.dto';
import * as http from 'http';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categorySvc: CategoryService) {}

  @ApiOperation({ summary: 'Create new category' })
  @HttpCode(204)
  @Post('add')
  async createNewCategory(@Body() newCategory: CategoryDto): Promise<void> {
    await this.categorySvc.createNewCategory(newCategory);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async getAllCategories(): Promise<CategoryListDto[]> {
    return await this.categorySvc.getCategories();
  }

  @ApiOperation({ summary: 'Get category by id'})
  @Get(':categoryId')
  async getCategoryById(@Param('categoryId') categoryId: string): Promise<CategoryListDto> {
    return this.categorySvc.getCategoryById(categoryId);
  }

  @ApiOperation( { summary: 'Deactivate category'})
  @Put(':categoryId')
  async deactivateCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<void> {
    await this.categorySvc.deactivateCategory(categoryId);
  }
}
