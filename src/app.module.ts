import { Module } from '@nestjs/common';
import { OrderModule } from './domains/order/order.module';

@Module({
  imports: [
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
