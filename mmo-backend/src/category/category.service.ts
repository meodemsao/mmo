import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
}
