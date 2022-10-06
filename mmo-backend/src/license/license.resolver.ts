import { PrismaService } from 'nestjs-prisma'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { LicenseConnection } from './dtos/license-connection.input'
import { findManyCursorConnection } from 'src/prisma-relay'
import { FindManyLicenseArgs } from 'src/@generated/license/find-many-license.args'
import { FindFirstLicenseArgs } from 'src/@generated/license/find-first-license.args'
import { License } from 'src/@generated/license/license.model'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { UpdateOneLicenseArgs } from 'src/@generated/license/update-one-license.args'
import { CreateOneLicenseArgs } from 'src/@generated/license/create-one-license.args'
import { DeleteOneLicenseArgs } from 'src/@generated/license/delete-one-license.args'

@Resolver(() => License)
export class LicenseResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => LicenseConnection)
  async licenses(@Args() args: FindManyLicenseArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        console.log('params................', params)
        return this.prisma.license.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.license.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => License)
  async license(@Args() args: FindFirstLicenseArgs): Promise<License> {
    return this.prisma.license.findFirst(args)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => License)
  async createOneLicense(@Args() args: CreateOneLicenseArgs) {
    return this.prisma.license.create(args)
  }

  @Mutation(() => License)
  async updateOneLicense(@Args() args: UpdateOneLicenseArgs): Promise<License> {
    return this.prisma.license.update(args)
  }

  @Mutation(() => License)
  async deleteOneLicense(@Args() args: DeleteOneLicenseArgs): Promise<License> {
    return this.prisma.license.delete(args)
  }
}
