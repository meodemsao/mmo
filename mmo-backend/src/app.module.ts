import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AppService } from './app.service'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from 'src/user/user.module'
import { RoleModule } from './role/role.module'
import { PostsModule } from 'src/post/post.module'
import config from 'src/common/configs/config'
import { loggingMiddleware } from 'src/common/middleware/logging.middleware'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AuthZModule } from 'nest-authz'
import { PrismaAdapter } from 'casbin-prisma-adapter'
import { GqlConfigService } from './gql-config.service'
import { ProductModule } from './product/product.module'
import { OrderModule } from './order/order.module'
import { CategoryModule } from './category/category.module'
import { OrderItemModule } from './order-item/order-item.module'
import { LicenseModule } from './license/license.module'
import { PlanModule } from './plan/plan.module'
import { SubModule } from './subscription/subscription.module'
import { SubHistoryModule } from './subscription-history/subscription-history.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()], // configure your prisma middleware
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthZModule.register({
      model: 'rbac_model.conf',
      policy: PrismaAdapter.newAdapter(),
      usernameFromContext: (context) => {
        // https://stackoverflow.com/a/58498512
        const ctx = GqlExecutionContext.create(context)
        const user = ctx.getContext().req.user
        return user && user.username
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PostsModule,
    ProductModule,
    LicenseModule,
    PlanModule,
    SubModule,
    SubHistoryModule,
    OrderModule,
    CategoryModule,
    OrderItemModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
