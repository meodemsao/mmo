import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { FindFirstOrderArgs } from 'src/@generated/order/find-first-order.args'
import { FindManyOrderArgs } from 'src/@generated/order/find-many-order.args'

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyOrderArgs): Promise<Order[]> {
    return this.prisma.order.findMany(args)
  }

  async findFirst(args: FindFirstOrderArgs): Promise<Order> {
    return this.prisma.order.findFirst(args)
  }
}
