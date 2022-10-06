import { ObjectType } from '@nestjs/graphql'
import { Role } from 'src/@generated/role/role.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class RoleConnection extends PaginatedResponse(Role) {}
