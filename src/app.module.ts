import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './domains/customer/customer.module';
import { DishModule } from './domains/dish/dish.module';
import { OrderModule } from './domains/order/order.module';
import { CoreModule } from './core/core.module';
import { DeliverPersonModule } from './domains/deliver-person/deliver-person.module';
@Module({
  imports: [
    DatabaseModule,
    DishModule,
    CustomerModule,
    OrderModule,
    CoreModule,
    DeliverPersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
