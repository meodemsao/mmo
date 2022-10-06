import { Module } from '@nestjs/common'
import { PlanResolver } from './plan.resolver'
import { PlanService } from './plan.service'

@Module({
  providers: [PlanResolver, PlanService],
  imports: [],
  exports: [PlanService],
})
export class PlanModule {}
