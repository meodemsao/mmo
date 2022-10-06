import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { FindFirstLicenseArgs } from 'src/@generated/license/find-first-license.args'
import { FindManyLicenseArgs } from 'src/@generated/license/find-many-license.args'
import { License } from 'src/@generated/license/license.model'

@Injectable()
export class LicenseService {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(args: FindFirstLicenseArgs): Promise<License> {
    return this.prisma.license.findFirst(args)
  }

  async findMany(args: FindManyLicenseArgs): Promise<License[]> {
    return this.prisma.license.findMany(args)
  }
}
