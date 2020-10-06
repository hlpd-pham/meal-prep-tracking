import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/domains/order/order.dto';
import { OrderService } from 'src/domains/order/order.service';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    findAll() {
        return this.orderService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Patch(':id') 
    update(@Param(':id') id: string, @Body() body) {
        return this.orderService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.orderService.remove(id)
    }
}
