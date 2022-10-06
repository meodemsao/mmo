import { ObjectType } from '@nestjs/graphql'
import { Category } from 'src/@generated/category/category.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class CategoryConnection extends PaginatedResponse(Category) {}
