import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, CustomerType } from 'src/domains/customer/customer.entity';
import { Order, OrderStatus } from 'src/domains/order/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}
    
    findAll() {
        return this.orderRepository.find({
            relations: ['customer']
        });
    } 

    async findOne(id: string) {
        const order = await this.orderRepository.findOne(id, { relations: ['customer'] });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`)
        }
        return order
    }

    create(createOrderDto: CreateOrderDto) {
        const order = this.orderRepository.create(createOrderDto);
        return this.orderRepository.save(order);
    }

    async update(id: string, updateCoffeeDto: UpdateOrderDto) {
        const order = await this.orderRepository.preload({
            id: +id,
            ...updateCoffeeDto,
        });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }
        return this.orderRepository.save(order);
    }

    async remove(id: string) {
        const order = await this.findOne(id);
        return this.orderRepository.remove(order);
    }
}
