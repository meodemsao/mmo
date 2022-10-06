import { ObjectType } from '@nestjs/graphql'
import { SubHistory } from 'src/@generated/sub-history/sub-history.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class SubHistoryConnection extends PaginatedResponse(SubHistory) {}
