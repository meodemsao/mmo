import { ObjectType } from '@nestjs/graphql'
import { User } from 'src/@generated/user/user.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class UserConnection extends PaginatedResponse(User) {}
