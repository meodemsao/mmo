import { PrismaService } from 'nestjs-prisma'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Category } from 'src/@generated/category/category.model'
import { FindManyCategoryArgs } from 'src/@generated/category/find-many-category.args'
import { FindFirstCategoryArgs } from 'src/@generated/category/find-first-category.args'
import { findManyCursorConnection } from 'src/prisma-relay'
import { CategoryConnection } from './dtos/category-connection.input'
import { CategoryService } from './category.service'
import { CreateOneCategoryArgs } from 'src/@generated/category/create-one-category.args'
import { UpdateOneCategoryArgs } from 'src/@generated/category/update-one-category.args'
import { DeleteOneCategoryArgs } from 'src/@generated/category/delete-one-category.args'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private prisma: PrismaService, private categoryService: CategoryService) {}

  @Query(() => CategoryConnection)
  async categories(@Args() args: FindManyCategoryArgs) {
    const result = await findManyCursorConnection(
      (params) => {
        console.log('params................', params)
        return this.prisma.category.findMany({
          ...args,
          ...params,
        })
      },
      () =>
        this.prisma.category.count({
          where: args.where,
        }),
      {
        skip: args.skip,
        take: args.take,
      }
    )
    return result
  }

  @Query(() => Category)
  async category(@Args() args: FindFirstCategoryArgs): Promise<Category> {
    return this.prisma.category.findFirst(args)
  }

  @Mutation(() => Category)
  async createOneCategory(@Args() args: CreateOneCategoryArgs): Promise<Category> {
    return this.prisma.category.create(args)
  }

  @Mutation(() => Category)
  async updateOneCategory(@Args() args: UpdateOneCategoryArgs): Promise<Category> {
    return this.prisma.category.update(args)
  }

  @Mutation(() => Category)
  async deleteOneCategory(@Args() args: DeleteOneCategoryArgs): Promise<Category> {
    return this.prisma.category.delete(args)
  }
}
