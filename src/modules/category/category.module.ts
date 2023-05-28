import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from 'src/modules/category/controller/category.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
