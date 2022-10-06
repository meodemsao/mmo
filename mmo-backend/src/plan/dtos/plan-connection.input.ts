import { ObjectType } from '@nestjs/graphql'
import { Plan } from 'src/@generated/plan/plan.model'
import PaginatedResponse from 'src/common/pagination/pagination'

@ObjectType()
export class PlanConnection extends PaginatedResponse(Plan) {}
