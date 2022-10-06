import { Module } from '@nestjs/common'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [],
  exports: [CategoryService],
})
export class CategoryModule {}
