import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Product } from '../@generated/product/product.model';
import { FindManyPostArgs } from 'src/@generated/post/find-many-post.args';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
}
