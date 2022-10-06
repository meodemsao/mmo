import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'

@Module({
  providers: [RoleResolver, RoleService],
  imports: [UserModule],
  exports: [RoleService],
})
export class RoleModule {}
