import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Module({
  imports: [ObjectionModule.forFeature([Customer])],
  exports: [CustomerService],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
