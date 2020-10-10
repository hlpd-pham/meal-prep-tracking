import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderDto, UpdateOrderDto } from './../order/order.dto';
import { OrderService } from './../order/order.service';

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
    create(@Body() createOrderDto: OrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Patch(':id') 
    update(@Param(':id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.orderService.remove(id)
    }
}
