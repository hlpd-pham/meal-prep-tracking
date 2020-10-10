import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './domains/customer/customer.module';
import { DishModule } from './domains/dish/dish.module';
import { OrderModule } from './domains/order/order.module';
@Module({
  imports: [
    DatabaseModule, 
    DishModule, 
    CustomerModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
