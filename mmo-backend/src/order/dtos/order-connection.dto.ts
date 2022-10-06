import { ObjectType } from '@nestjs/graphql'
import PaginatedResponse from 'src/common/pagination/pagination'
import { Order } from '../../@generated/order/order.model'

@ObjectType()
export class OrderConnection extends PaginatedResponse(Order) {}
