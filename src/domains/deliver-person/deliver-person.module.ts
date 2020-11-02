import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Order } from '../order/order.model';
import { DeliverPerson } from './deliver-person.model';
import { DeliverPersonService } from './deliver-person.service';
import { DeliverPersonController } from './deliver-person.controller';

@Module({
  imports: [ObjectionModule.forFeature([DeliverPerson, Order])],
  exports: [DeliverPersonService],
  controllers: [DeliverPersonController],
  providers: [DeliverPersonService],
})
export class DeliverPersonModule {}
