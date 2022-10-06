import { ObjectType } from '@nestjs/graphql'
import { License } from 'src/@generated/license/license.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class LicenseConnection extends PaginatedResponse(License) {}
