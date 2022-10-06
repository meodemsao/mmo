import { PrismaService } from 'nestjs-prisma'
import { Resolver } from '@nestjs/graphql'
import { OrderItem } from 'src/@generated/order-item/order-item.model'

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private prisma: PrismaService) {}
}
