import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/domains/order/order.model';
import { CustomerService } from '../customer/customer.service';
import { OrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        @Inject(Order)
        private readonly orderModel: typeof Order,
        private readonly customerService: CustomerService,
    ) {}
    
    async findAll(): Promise<Order[]> {
        return await this.orderModel.query()
            .whereExists(this.orderModel.relatedQuery('dishes'))
            .whereExists(this.orderModel.relatedQuery('customer'));
    } 

    async findOne(id: string) {
        const order = await this.orderModel.query().findById(+id);
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`)
        }
        return order
    }

    async create(createOrderDto: OrderDto) {
        const customer = await this.customerService.preloadCustomerByName(createOrderDto.customer);
        return await this.orderModel.query().insert({ ...createOrderDto, customer });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {

        const customer = 
            updateOrderDto.customer && 
            await this.customerService.preloadCustomerByName(updateOrderDto.customer);

        const order = await this.orderModel.query().findById(+id).patch({
            id: +id,
            customer: customer,
            ...updateOrderDto,
            
        });
        
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }
        return order;
    }

    async remove(id: string) {
        return await this.orderModel.query().deleteById(+id);
    }
}
