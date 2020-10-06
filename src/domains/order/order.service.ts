import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/domains/order/order.entity';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly customerService: CustomerService
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

    async create(createOrderDto: CreateOrderDto) {
        const customer = await this.customerService.preloadCustomerByName(createOrderDto.customer);
        const order = this.orderRepository.create({ ...createOrderDto, customer });
        return this.orderRepository.save(order);
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const customer = 
            updateOrderDto.customer && 
            await this.customerService.preloadCustomerByName(updateOrderDto.customer);

        const order = await this.orderRepository.preload({
            id: +id,
            ...updateOrderDto,
            customer,
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
