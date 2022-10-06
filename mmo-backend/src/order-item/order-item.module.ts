import { Module } from '@nestjs/common';
import { OrderItemResolver } from './order-item.resolver';
import { OrderItemService } from './order-item.service';

@Module({
  providers: [OrderItemResolver, OrderItemService],
  imports: [],
  exports: [OrderItemService],
})
export class OrderItemModule {}
