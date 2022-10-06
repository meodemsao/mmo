import { PrismaService } from 'nestjs-prisma'
import { Resolver, Query, Parent, Mutation, Args, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UserEntity } from 'src/common/decorators/user.decorator'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { UserService } from './user.service'
// import { User } from './models/user.model';
import { User } from '../@generated/user/user.model'
import { ChangePasswordInput } from './dto/change-password.input'
import { UpdateUserInput } from './dto/update-user.input'
import { FindManyUserArgs } from 'src/@generated/user/find-many-user.args'
import { UserConnection } from './models/user-connection.model'
import { findManyCursorConnection } from 'src/prisma-relay'
import { AuthActionVerb, AuthPossession, AuthZGuard, UsePermissions } from 'nest-authz'
import { Resource } from 'src/role/resources'

@Resolver(() => User)
// @UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private usersService: UserService, private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user
  }

  @Query(() => UserConnection)
  // @UseGuards(GqlAuthGuard, AuthZGuard)
  // @UsePermissions({
  //   action: AuthActionVerb.READ,
  //   resource: Resource.USER,
  //   possession: AuthPossession.OWN_ANY,
  // })
  async users(@Args() args: FindManyUserArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        return this.prisma.user.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.user.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@UserEntity() user: User, @Args('data') newUserData: UpdateUserInput) {
    return this.usersService.updateUser(user.id, newUserData)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(user.id, user.password, changePassword)
  }

  @ResolveField('posts')
  posts(@Parent() author: User) {
    return this.prisma.user.findUnique({ where: { id: author.id } }).posts()
  }
}
