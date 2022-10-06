import { PrismaService } from 'nestjs-prisma'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Product } from 'src/@generated/product/product.model'
import { FindManyProductArgs } from 'src/@generated/product/find-many-product.args'
import { findManyCursorConnection } from 'src/prisma-relay'
import { ProductConnection } from './dtos/product-connection.input'
import { FindFirstProductArgs } from 'src/@generated/product/find-first-product.args'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { CreateOneProductArgs } from 'src/@generated/product/create-one-product.args'
import { UpdateOneProductArgs } from 'src/@generated/product/update-one-product.args'
import { DeleteOneProductArgs } from 'src/@generated/product/delete-one-product.args'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => ProductConnection)
  async products(@Args() args: FindManyProductArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        console.log('params................', params)
        return this.prisma.product.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.product.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => Product)
  async product(@Args() args: FindFirstProductArgs): Promise<Product> {
    return this.prisma.product.findFirst(args)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createOneProduct(@Args() args: CreateOneProductArgs) {
    return this.prisma.product.create(args)
  }

  @Query(() => Product)
  async updateOneProduct(@Args() args: UpdateOneProductArgs): Promise<Product> {
    return this.prisma.product.update(args)
  }

  @Query(() => Product)
  async deleteOneProduct(@Args() args: DeleteOneProductArgs): Promise<Product> {
    return this.prisma.product.delete(args)
  }
}
