import { PrismaService } from 'nestjs-prisma'
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql'
// import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions'
import { UseGuards } from '@nestjs/common'

import { UserEntity } from 'src/common/decorators/user.decorator'
// import { User } from 'src/users/models/user.model';
import { User } from '../@generated/user/user.model'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { PostIdArgs } from './args/post-id.args'
import { UserIdArgs } from './args/user-id.args'
// import { Post } from './models/post.model';
import { Post } from '../@generated/post/post.model'
import { PostConnection } from './models/post-connection.model'
import { CreatePostInput } from './dto/createPost.input'
import { FindManyPostArgs } from 'src/@generated/post/find-many-post.args'
import { PostService } from './post.service'
import { findManyCursorConnection } from '../prisma-relay'

const pubSub = new PubSub()

@Resolver(() => Post)
export class PostResolver {
  constructor(private prisma: PrismaService, private postService: PostService) {}

  @Subscription(() => Post)
  postCreated() {
    return pubSub.asyncIterator('postCreated')
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async createPost(@UserEntity() user: User, @Args('data') data: CreatePostInput) {
    const newPost = this.prisma.post.create({
      data: {
        published: true,
        title: data.title,
        content: data.content,
        authorId: user.id,
      },
    })
    pubSub.publish('postCreated', { postCreated: newPost })
    return newPost
  }

  @Query(() => [Post])
  userPosts(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .posts({ where: { published: true } })
  }

  @Query(() => PostConnection)
  async posts(@Args() args: FindManyPostArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        return this.postService.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.post.count({
          where: args.where,
        }),
      {
        cursor: args.cursor,
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => Post)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findUnique({ where: { id: id.postId } })
  }

  @ResolveField('author')
  async author(@Parent() post: Post) {
    return this.prisma.post.findUnique({ where: { id: post.id } }).author()
  }
}
