import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerDto, UpdateCustomerDto } from './../customer/customer.dto';
import { CustomerService } from './../customer/customer.service';

@Controller('customers')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    findAll() {
        return this.customerService.findAll()
    }

    @Get(':id') 
    findOne(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Post()
    create(@Body() createCustomerDto: CustomerDto) {
        return this.customerService.create(createCustomerDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customerService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }
}
