import { Module } from '@nestjs/common'
import { SubHistoryService } from './subscription-history.service'
import { SubHistoryResolver } from './subscription-history.resolver'

@Module({
  providers: [SubHistoryResolver, SubHistoryService],
  imports: [],
  exports: [SubHistoryService],
})
export class SubHistoryModule {}
