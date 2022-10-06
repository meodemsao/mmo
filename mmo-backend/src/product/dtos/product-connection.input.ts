import { ObjectType } from '@nestjs/graphql'
import { Product } from 'src/@generated/product/product.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class ProductConnection extends PaginatedResponse(Product) {}
