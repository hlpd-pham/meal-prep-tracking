import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/domains/order/order.model';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { Dish } from '../dish/dish.model';
import { OrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        @Inject(Order)
        private readonly orderModel: typeof Order,
        @Inject(Customer)
        private readonly customerModel: typeof Customer,
        @Inject(Dish)
        private readonly dishModel: typeof Dish,
        private readonly customerService: CustomerService,
    ) {}
    
    async findAll(): Promise<Order[]> {
        const orders =  await this.orderModel.query();
        return orders;
    } 

    async findOne(orderId: string) {
        const order = await this.orderModel.query().findById(+orderId);
        if (!order) {
            throw new NotFoundException(`Order #${orderId} not found`)
        }
        return order
    }

    async create(orderDto: OrderDto) {
        const {customer, ...orderInfo} = orderDto;

        const customerModelItem = await this.customerService.preloadCustomer(customer);
        const order = await customerModelItem.$relatedQuery('orders').insert(orderInfo);
        return order;
    }

    async update(orderId: string, updateOrderDto: UpdateOrderDto) {

        const order = await this.orderModel.query().findById(+orderId);
        if (!order) {
            throw new NotFoundException(`Order #${orderId} not found`);
        }

        if (updateOrderDto.customer) {            
            // update customer relation
            const customer = 
                updateOrderDto.customer && 
                await this.customerService.preloadCustomer(updateOrderDto.customer);

            // associate customer with order
            await this.orderModel.query().findById(+orderId).patch(updateOrderDto);
            await this.customerModel.relatedQuery('orders').unrelate().where('id', +orderId);
            await customer.$relatedQuery('orders').relate(order)
        }

        // associate order with dishes
        if (updateOrderDto.dishes) {
            const dishIds = updateOrderDto.dishes.map(dish => dish.id);
            const dishModelItems = await this.dishModel.query().where('id', 'in', dishIds);
            if (dishModelItems.length === 0) {
                throw new NotFoundException(`One of the dishes isn't valid`);
            }
            for (var i = 0; i < dishModelItems.length; i++) {
                await order.$relatedQuery('dishes').relate(dishModelItems[0]);
            }
        }

        return order;
    }

    async remove(orderId: string) {
        await this.orderModel.relatedQuery('dishes').for(+orderId).delete();
        await this.customerModel.relatedQuery('orders').unrelate().where('id', +orderId);
        return await this.orderModel.query().deleteById(+orderId);
    }
}
