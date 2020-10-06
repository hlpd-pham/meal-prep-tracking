import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './domains/customer/customer.module';
import { OrderModule } from './domains/order/order.module';
import { DishModule } from './domains/dish/dish.module';

@Module({
  imports: [
    CustomerModule,
    OrderModule,
    DishModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'pass123', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
