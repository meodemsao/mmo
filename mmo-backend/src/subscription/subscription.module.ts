import { Module } from '@nestjs/common'
import { SubService } from './subscription.service'
import { SubResolver } from './subscription.resolver'

@Module({
  providers: [SubResolver, SubService],
  imports: [],
  exports: [SubService],
})
export class SubModule {}
