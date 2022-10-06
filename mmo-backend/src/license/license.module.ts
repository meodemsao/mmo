import { Module } from '@nestjs/common'
import { LicenseResolver } from './License.resolver'
import { LicenseService } from './License.service'

@Module({
  providers: [LicenseResolver, LicenseService],
  imports: [],
  exports: [LicenseService],
})
export class LicenseModule {}
