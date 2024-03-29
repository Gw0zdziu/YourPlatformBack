import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from 'src/modules/category/service/category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';
import { CategoryListDto } from 'src/shared/dtos/category/category-list.dto';
import { UpdateCategoryDto } from 'src/shared/dtos/category/update-category.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Category } from 'src/shared/entities/category/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categorySvc: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new category' })
  @HttpCode(204)
  @Post('add')
  async createNewCategory(@Body() newCategory: CategoryDto): Promise<void> {
    await this.categorySvc.createNewCategory(newCategory);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all categories' })
  @Get('all')
  async getAllCategories(): Promise<CategoryListDto[]> {
    return await this.categorySvc.getCategories();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get categories names'})
  @Get('categories-names')
  async getCategoriesNames(@Headers('userId') userId){
    return this.categorySvc.getCategoriesNames(userId)
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get('/:categoryId')
  async getCategoryById(
    @Param('categoryId') categoryId: string,
  ): Promise<Category> {
    return this.categorySvc.getCategoryById(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deactivate category' })
  @Put(':categoryId')
  async deactivateCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<void> {
    await this.categorySvc.deactivateCategory(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update category' })
  @Put('update/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updatedCategory: UpdateCategoryDto,
  ): Promise<void> {
    await this.categorySvc.updateCategory(categoryId, updatedCategory);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all user categories' })
  @Get('by/user')
  async getCategoriesByUserId(@Headers('userId') userId): Promise<Category[]> {
    return this.categorySvc.getCategoriesByUserId(userId);
  }
}
