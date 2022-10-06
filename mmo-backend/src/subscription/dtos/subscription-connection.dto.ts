import { ObjectType } from '@nestjs/graphql'
import { Sub } from 'src/@generated/sub/sub.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class SubConnection extends PaginatedResponse(Sub) {}
