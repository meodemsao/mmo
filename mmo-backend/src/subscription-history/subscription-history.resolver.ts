import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PrismaService } from 'nestjs-prisma'
import { CreateOneSubHistoryArgs } from 'src/@generated/sub-history/create-one-sub-history.args'
import { DeleteOneSubHistoryArgs } from 'src/@generated/sub-history/delete-one-sub-history.args'
import { FindManySubHistoryArgs } from 'src/@generated/sub-history/find-many-sub-history.args'
import { FindUniqueSubHistoryArgs } from 'src/@generated/sub-history/find-unique-sub-history.args'
import { SubHistory } from 'src/@generated/sub-history/sub-history.model'
import { UpdateOneSubHistoryArgs } from 'src/@generated/sub-history/update-one-sub-history.args'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { findManyCursorConnection } from 'src/prisma-relay'
import { SubHistoryConnection } from './dtos/subscription-connection.dto'
import { SubHistoryService } from './subscription-history.service'

@Resolver(() => SubHistory)
export class SubHistoryResolver {
  constructor(private prisma: PrismaService, private subService: SubHistoryService) {}

  @Query(() => SubHistoryConnection)
  async subHistories(@Args() args: FindManySubHistoryArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        return this.prisma.subHistory.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.subHistory.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => SubHistory)
  async subHistory(@Args() args: FindUniqueSubHistoryArgs): Promise<SubHistory> {
    return this.prisma.subHistory.findUnique({
      ...args,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SubHistory)
  async createOneSubHistory(@Args() args: CreateOneSubHistoryArgs) {
    return this.prisma.subHistory.create(args)
  }

  @Mutation(() => SubHistory)
  async updateOneSubHistory(@Args() args: UpdateOneSubHistoryArgs): Promise<SubHistory> {
    return this.prisma.subHistory.update(args)
  }

  @Mutation(() => SubHistory)
  async deleteOneSubHistory(@Args() args: DeleteOneSubHistoryArgs): Promise<SubHistory> {
    return this.prisma.subHistory.delete(args)
  }
}
