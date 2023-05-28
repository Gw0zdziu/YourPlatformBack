import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/service/category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';
import { CategoryListDto } from 'src/shared/dtos/category/category-list.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categorySvc: CategoryService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post('add')
  async createNewCategory(@Body() newCategory: CategoryDto): Promise<void> {
    await this.categorySvc.createNewCategory(newCategory);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async getAllCategories(): Promise<CategoryListDto[]> {
    return await this.categorySvc.getCategories();
  }
}
