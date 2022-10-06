import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { Post } from '../@generated/post/post.model';
import { FindManyPostArgs } from 'src/@generated/post/find-many-post.args';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args: FindManyPostArgs): Promise<Post[]> {
    return this.prisma.post.findMany(args);
  }

  async count(args: FindManyPostArgs): Promise<number> {
    return this.prisma.post.count(args);
  }
}
