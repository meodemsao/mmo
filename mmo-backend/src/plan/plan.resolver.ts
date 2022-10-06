import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PrismaService } from 'nestjs-prisma'
import { CreateOnePlanArgs } from 'src/@generated/plan/create-one-plan.args'
import { DeleteOnePlanArgs } from 'src/@generated/plan/delete-one-plan.args'
import { FindManyPlanArgs } from 'src/@generated/plan/find-many-plan.args'
import { FindUniquePlanArgs } from 'src/@generated/plan/find-unique-plan.args'
import { Plan } from 'src/@generated/plan/plan.model'
import { UpdateOnePlanArgs } from 'src/@generated/plan/update-one-plan.args'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { findManyCursorConnection } from 'src/prisma-relay'
import { PlanConnection } from './dtos/plan-connection.input'

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => PlanConnection)
  async plans(@Args() args: FindManyPlanArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        return this.prisma.plan.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.plan.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => Plan)
  async plan(@Args() args: FindUniquePlanArgs): Promise<Plan> {
    return this.prisma.plan.findUnique({
      ...args,
      include: {
        subscriptions: true,
      },
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Plan)
  async createOnePlan(@Args() args: CreateOnePlanArgs) {
    return this.prisma.plan.create(args)
  }

  @Mutation(() => Plan)
  async updateOnePlan(@Args() args: UpdateOnePlanArgs): Promise<Plan> {
    return this.prisma.plan.update(args)
  }

  @Mutation(() => Plan)
  async deleteOnePlan(@Args() args: DeleteOnePlanArgs): Promise<Plan> {
    return this.prisma.plan.delete(args)
  }
}
