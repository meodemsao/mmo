import { PrismaService } from 'nestjs-prisma'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Order } from 'src/@generated/order/order.model'
import { OrderConnection } from './dtos/order-connection.dto'
import { FindManyOrderArgs } from 'src/@generated/order/find-many-order.args'
import { OrderService } from './order.service'
import { findManyCursorConnection } from 'src/prisma-relay'

@Resolver(() => Order)
// @UseGuards(GqlAuthGuard)
export class OrderResolver {
  constructor(private prisma: PrismaService, private orderService: OrderService) {}

  @Query(() => OrderConnection)
  // @UseGuards(GqlAuthGuard)
  // @UsePermissions({
  //   action: AuthActionVerb.READ,
  //   resource: Resource.USER,
  //   possession: AuthPossession.ANY,
  // })
  async orders(@Args() args: FindManyOrderArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        return this.orderService.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.order.count({
          where: args.where,
        }),
      {
        cursor: args.cursor,
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }
}
