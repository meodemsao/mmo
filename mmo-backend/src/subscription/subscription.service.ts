import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateOneSubArgs } from 'src/@generated/sub/create-one-sub.args'
import { Sub } from 'src/@generated/sub/sub.model'

@Injectable()
export class SubService {
  constructor(private prisma: PrismaService) {}

  async checkSubExist(args: CreateOneSubArgs): Promise<boolean> {
    const existSub = await this.prisma.sub.findFirst({
      where: {
        planId: args.data.plan.connect.id,
        userId: args.data.user.connect.id,
      },
    })
    if (existSub) return true
    else return false
  }

  async createOneSub(args: CreateOneSubArgs): Promise<Sub> {
    const isExistSub = this.checkSubExist(args)
    if (!isExistSub) {
      return this.prisma.sub.create({
        ...args,
        include: {
          plan: true,
          user: true,
        },
      })
    } else {
      throw new BadRequestException(`Subcription exist`)
    }
  }
}
