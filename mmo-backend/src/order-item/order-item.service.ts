import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}
}
