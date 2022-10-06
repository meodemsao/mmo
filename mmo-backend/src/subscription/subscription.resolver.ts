import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { SubscriptionStatus } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { CreateOneSubArgs } from 'src/@generated/sub/create-one-sub.args'
import { DeleteOneSubArgs } from 'src/@generated/sub/delete-one-sub.args'
import { FindManySubArgs } from 'src/@generated/sub/find-many-sub.args'
import { FindUniqueSubArgs } from 'src/@generated/sub/find-unique-sub.args'
import { Sub } from 'src/@generated/sub/sub.model'
import { UpdateOneSubArgs } from 'src/@generated/sub/update-one-sub.args'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { findManyCursorConnection } from 'src/prisma-relay'
import { SubConnection } from './dtos/subscription-connection.dto'
import { SubService } from './subscription.service'

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
  description: 'Subscription status.',
})

@Resolver(() => Sub)
export class SubResolver {
  constructor(private prisma: PrismaService, private subService: SubService) {}

  @Query(() => SubConnection)
  async subs(@Args() args: FindManySubArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        return this.prisma.sub.findMany({
          ...args,
          ...params,
          include: {
            plan: true,
            user: true,
          },
        })
      },
      () =>
        this.prisma.sub.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => Sub)
  async sub(@Args() args: FindUniqueSubArgs): Promise<Sub> {
    return this.prisma.sub.findUnique({
      ...args,
      include: {
        user: true,
        plan: true,
      },
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Sub)
  async createOneSub(@Args() args: CreateOneSubArgs) {
    return this.subService.createOneSub(args)
  }

  @Mutation(() => Sub)
  async updateOneSub(@Args() args: UpdateOneSubArgs): Promise<Sub> {
    return this.prisma.sub.update(args)
  }

  @Mutation(() => Sub)
  async deleteOneSub(@Args() args: DeleteOneSubArgs): Promise<Sub> {
    return this.prisma.sub.delete(args)
  }
}
