import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    findAll() {
        return this.customerService.findAll()
    }

    @Get(':id') 
    findONe(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }

    @Patch(':id')
    update(@Param(':id') id: string, @Body() body) {
        return this.customerService.update(id, body);
    }

    @Delete(':id')
    remove(@Param(':id') id: string) {
        return this.customerService.remove(id);
    }
}
