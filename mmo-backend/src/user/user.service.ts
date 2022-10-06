import { PrismaService } from 'nestjs-prisma'
import { Injectable, BadRequestException } from '@nestjs/common'
import { PasswordService } from 'src/auth/password.service'
import { ChangePasswordInput } from './dto/change-password.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private passwordService: PasswordService) {}

  /**
   * check exist user by userid
   * @param id
   * @returns
   */
  async exists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    })
    return !!user
  }

  /**
   * check exist user by username
   * @param name
   * @returns
   */
  async checkExistsByName(username: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { username },
    })
    return !!user
  }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    })
  }

  async changePassword(userId: string, userPassword: string, changePassword: ChangePasswordInput) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    )

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    const hashedPassword = await this.passwordService.hashPassword(changePassword.newPassword)

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    })
  }
}
