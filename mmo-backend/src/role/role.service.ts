import { PrismaService } from 'nestjs-prisma'
import { AuthZRBACService } from 'nest-authz'
import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common'

import { FindManyRoleArgs } from 'src/@generated/role/find-many-role.args'
import { Role } from 'src/@generated/role/role.model'

import { UserService } from '../user/user.service'
import { RoleCreateInput } from 'src/@generated/role/role-create.input'
import { UpdateOneRoleArgs } from 'src/@generated/role/update-one-role.args'
import { FindFirstRoleArgs } from 'src/@generated/role/find-first-role.args'
import { PermissionInput } from './dto/gant-permission.input'

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly authzService: AuthZRBACService
  ) {}

  /**
   * check role exist by name
   * @param name
   * @returns
   */
  async exists(id: string): Promise<boolean> {
    const role = await this.prisma.role.findFirst({
      where: { id },
    })
    return !!role
  }

  async checkExistsByName(name: string): Promise<boolean> {
    const role = await this.prisma.role.findFirst({
      where: { name },
    })
    return !!role
  }

  async checkExistsByNames(names: string[]): Promise<boolean> {
    Promise.all(names.map((name) => this.checkExistsByName(name))).then((response) => {
      console.log('res...............', response)
    })

    return false
  }

  /**
   * get all roles
   * @returns
   */
  roles(args: FindManyRoleArgs): Promise<Role[]> {
    return this.prisma.role.findMany(args)
  }

  /**
   * find first role
   * @param args
   * @returns
   */
  role(args: FindFirstRoleArgs): Promise<Role> {
    return this.prisma.role.findFirst(args)
  }

  /**
   * get role by id
   * @param id
   * @returns
   */
  // async role(id: string): Promise<Role | null> {
  //   return this.prisma.role.findFirst({ where: { id } })
  // }

  /**
   * create role
   * @param role
   * @returns
   */
  async createOneRole(role: RoleCreateInput): Promise<Role> {
    const isExists = await this.exists(role.name)
    if (isExists) {
      throw new BadRequestException(`The role ${role.name} is already exists`)
    }

    return this.prisma.role.create({
      data: role,
    })
  }

  /**
   *
   * @param args
   * @returns
   */
  async updateOneRole(args: UpdateOneRoleArgs): Promise<Role> {
    return this.prisma.role.update(args)
  }

  /**
   * delete role
   * @param name
   * @returns
   */
  async deleteOneRole(name: string): Promise<Role> {
    if (!this.checkExistsByName(name)) {
      throw new NotFoundException(`The role ${name} not found.`)
    }
    await this.authzService.deleteRole(name)

    return this.prisma.role.delete({ where: { name } })
  }

  /**
   * assign role to user
   * @param username
   * @param rolename
   * @returns
   */
  async assignUser(username: string, rolename: string): Promise<boolean> {
    const [isUserExists, isRoleExists] = await Promise.all([
      this.userService.checkExistsByName(username),
      this.checkExistsByName(rolename),
    ])

    if (!isUserExists) {
      throw new NotFoundException(`The user ${username} not found`)
    }

    if (!isRoleExists) {
      throw new NotFoundException(`The role ${rolename} not found`)
    }

    return this.authzService.addRoleForUser(username, rolename)
  }

  /**
   * assigned roles to user
   * @param username
   * @returns
   */
  async assignedRoles(username: string): Promise<string[]> {
    const isExists = await this.userService.checkExistsByName(username)

    if (!isExists) {
      throw new NotFoundException(`The user ${username} not found.`)
    }

    return this.authzService.getImplicitRolesForUser(username)
  }

  /**
   * deassign role from user
   * @param username
   * @param rolename
   * @returns
   */
  async deAssignUser(username: string, rolename: string): Promise<boolean> {
    const [isUserExists, isRoleExists] = await Promise.all([
      this.userService.checkExistsByName(username),
      this.checkExistsByName(rolename),
    ])
    if (!isUserExists) {
      throw new NotFoundException(`The user ${username} not found`)
    }

    if (!isRoleExists) {
      throw new NotFoundException(`The role ${rolename} not found`)
    }

    const hasRole = await this.authzService.hasRoleForUser(username, rolename)

    if (!hasRole) {
      throw new BadRequestException(`The user ${username} does not have role ${this.role}`)
    }

    return this.authzService.deleteRoleForUser(username, rolename)
  }

  /**
   * grant permission to role
   * @param role
   * @param operation
   * @param object
   * @returns
   */
  async grantPermission(role: string, operation: string, object: string): Promise<boolean> {
    const isRoleExists = await this.checkExistsByName(role)
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`)
    }

    return this.authzService.addPermissionForUser(role, object, operation)
  }

  /**
   * grant permission to role
   * @param role
   * @param operation
   * @param object
   * @returns
   */
  async grantPermissions(role: string, permissions: PermissionInput[]): Promise<boolean> {
    const isRoleExists = await this.checkExistsByName(role)

    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`)
    }

    permissions.forEach((permission) => {
      this.authzService.addPermissionForUser(role, permission.object, permission.operation)
    })

    return true
  }

  /**
   *
   * @param role
   * @param operation
   * @param object
   * @returns
   */
  async revokePermission(role: string, operation: string, object: string) {
    const isRoleExists = await this.checkExistsByName(role)
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`)
    }

    if (!this.authzService.hasPermissionForUser(role, object, operation)) {
      throw new BadRequestException(
        `The permission ${operation} ${object} isn't assigned to the role ${role}`
      )
    }

    return this.authzService.deletePermissionForUser(role, object, operation)
  }

  // /**
  //  *
  //  * @param role
  //  * @param operation
  //  * @param object
  //  * @returns
  //  */
  // async revokePermissions(role: string, permissions: string[]): Promise<boolean> {
  //   const isRoleExists = await this.checkExistsByName(role)
  //   if (!isRoleExists) {
  //     throw new NotFoundException(`The role ${role} not found`)
  //   }

  //   permissions.forEach((permission) => {
  //     this.authzService.deletePermissionForUser(role, ...permission)
  //   })

  //   return true
  // }

  /**
   * assigned users
   * @param role
   * @returns
   */
  async assignedUsers(role: string): Promise<string[]> {
    const isRoleExists = await this.exists(role)
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`)
    }

    return this.authzService.getUsersForRole(role)
  }

  /**
   *
   * @param role
   * @returns
   */
  async rolePermissions(role: string): Promise<string[][]> {
    const isRoleExists = await this.checkExistsByName(role)
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`)
    }

    return this.authzService.getPermissionsForUser(role)
  }

  /**
   * get all permissions for role
   * @param role
   * @returns
   */
  async getPermissionsForRole(role: string): Promise<string[][]> {
    const isRoleExists = await this.exists(role)
    if (!isRoleExists) {
      throw new NotFoundException(`The role ${role} not found`)
    }
    return this.authzService.getPermissionsForUser(role)
  }

  /**
   * get permissions for user
   * @param username
   * @returns
   */
  async getuserPermissions(username: string): Promise<string[][]> {
    const isExists = await this.userService.checkExistsByName(username)

    if (!isExists) {
      throw new NotFoundException(`The user ${username} not found.`)
    }

    return this.authzService.getImplicitPermissionsForUser(username)
  }
}
