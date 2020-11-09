import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './domains/customer/customer.module';
import { DishModule } from './domains/dish/dish.module';
import { OrderModule } from './domains/order/order.module';
import { CoreModule } from './core/core.module';
import { DeliverPersonModule } from './domains/deliver-person/deliver-person.module';
import { UserModule } from './domains/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    DatabaseModule,
    DishModule,
    CustomerModule,
    OrderModule,
    CoreModule,
    DeliverPersonModule,
    UserModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PassportModule],
})
export class AppModule {}
