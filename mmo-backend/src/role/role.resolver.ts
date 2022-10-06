import { AuthActionVerb } from 'nest-authz'
import { PrismaService } from 'nestjs-prisma'

import { Resolver, Query, Args, Mutation, registerEnumType } from '@nestjs/graphql'
import { RoleService } from './role.service'

import { Role } from '../@generated/role/role.model'
import { FindManyRoleArgs } from 'src/@generated/role/find-many-role.args'
import { RoleCreateInput } from 'src/@generated/role/role-create.input'

import { Resource } from './resources'
import { UpdateOneRoleArgs } from 'src/@generated/role/update-one-role.args'
import { findManyCursorConnection } from 'src/prisma-relay'

import { RoleConnection } from './models/role-connection.model'
import { PermissionInput } from './dto/gant-permission.input'
import { FindUniqueRoleArgs } from 'src/@generated/role/find-unique-role.args'

// registerEnumType(AuthAction, {
//   name: 'AuthAction',
//   description: 'Auth actions.',
// })

registerEnumType(AuthActionVerb, {
  name: 'AuthActionVerb',
  description: 'Auth actions.',
})

registerEnumType(Resource, {
  name: 'Resource',
  description: 'Resource.',
})

@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService, private prisma: PrismaService) {}

  @Query(() => RoleConnection)
  async roles(@Args() args: FindManyRoleArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        console.log('params................', params)
        return this.prisma.role.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.role.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => Role)
  async role(@Args() args: FindUniqueRoleArgs): Promise<Role> {
    return this.prisma.role.findUnique(args)
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Role)
  async createOneRole(@Args('data') data: RoleCreateInput): Promise<Role> {
    return this.roleService.createOneRole(data)
  }

  @Mutation(() => Role)
  async updateOneRole(@Args() args: UpdateOneRoleArgs): Promise<Role> {
    return this.roleService.updateOneRole(args)
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Role)
  async deleteOneRole(@Args('name') name: string) {
    return this.roleService.deleteOneRole(name)
  }

  @Query(() => [[String]])
  async getRolePermissions(@Args('rolename') rolename: string): Promise<string[][]> {
    const rolePermissions = await this.roleService.rolePermissions(rolename)
    return rolePermissions
  }

  @Query(() => [[String]])
  async getUserPermissions(@Args('username') username: string): Promise<string[][]> {
    return this.roleService.getuserPermissions(username)
  }

  @Query(() => [String])
  async getUserRoles(@Args('username') username: string): Promise<string[]> {
    return this.roleService.assignedRoles(username)
  }

  @Mutation(() => Boolean)
  async assignUser(
    @Args('username') username: string,
    @Args('rolename') rolename: string
  ): Promise<boolean> {
    return this.roleService.assignUser(username, rolename)
  }

  @Mutation(() => Boolean)
  async deAssignUser(
    @Args('username') username: string,
    @Args('rolename') rolename: string
  ): Promise<boolean> {
    return this.roleService.deAssignUser(username, rolename)
  }

  @Mutation(() => Boolean)
  async grantPermission(
    @Args('role', { type: () => String }) role: string,
    @Args('operation', { type: () => String }) operation: string,
    @Args('object', { type: () => String })
    object: string
  ): Promise<boolean> {
    return this.roleService.grantPermission(role, operation, object)
  }

  @Mutation(() => Boolean)
  async grantPermissions(
    @Args('role', { type: () => String }) role: string,
    @Args('permissions', { type: () => [PermissionInput] }) permissions: PermissionInput[]
  ): Promise<boolean> {
    return this.roleService.grantPermissions(role, permissions)
  }

  @Mutation(() => Boolean)
  async revokePermission(
    @Args('role', { type: () => String }) role: string,
    @Args('operation', { type: () => String }) operation: string,
    @Args('object', { type: () => String })
    object: string
  ): Promise<boolean> {
    return this.roleService.revokePermission(role, operation, object)
  }
}
