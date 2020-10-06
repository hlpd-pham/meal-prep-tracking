import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Module({ 
    imports: [TypeOrmModule.forFeature([Customer])],
    exports: [CustomerService],
    controllers: [CustomerController],
    providers: [CustomerService] 
})
export class CustomerModule {}