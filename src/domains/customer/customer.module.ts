import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Module({ 
    imports: [DatabaseModule, ObjectionModule.forFeature([Customer])],
    exports: [CustomerService],
    controllers: [CustomerController],
    providers: [CustomerService] 
})
export class CustomerModule {}