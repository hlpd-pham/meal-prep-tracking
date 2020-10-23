import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../order/order.model';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { DishService } from '../dish/dish.service';
import { OrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(Order)
    private readonly orderModel: typeof Order,
    @Inject(Customer)
    private readonly customerModel: typeof Customer,
    private readonly customerService: CustomerService,
    private readonly dishService: DishService,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderModel.query().withGraphFetched('dishes');
  }

  async findOne(orderId: string) {
    const order = await this.orderModel
      .query()
      .findById(+orderId)
      .withGraphFetched('dishes');
    return order;
  }

  async create(orderDto: OrderDto) {
    const { customer, dishes, ...orderInfo } = orderDto;

    // associate customer with order
    const preloadedCustomer = await this.customerService.preloadCustomer(
      customer,
    );
    const order = await this.orderModel.query().insert(orderInfo);
    await preloadedCustomer.$relatedQuery('orders').relate(order);

    // associate dishes with order
    if (dishes) {
      for (var i = 0; i < dishes.length; i++) {
        const preloadedDish = await this.dishService.preloadDish(dishes[i]);
        await order.$relatedQuery('dishes').relate(preloadedDish);
      }
    }

    return order;
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const { customer, dishes, ...orderInfo } = updateOrderDto;

    const order = await this.orderModel.query().findById(+orderId);
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    // associate customer with order
    if (customer) {
      const preloadedCustomer = await this.customerService.preloadCustomer(
        customer,
      );

      await this.orderModel
        .query()
        .findById(+orderId)
        .patch(orderInfo);
      await preloadedCustomer.$relatedQuery('orders').relate(order);
    }

    // associate order with dishes
    if (dishes) {
      for (var i = 0; i < dishes.length; i++) {
        const preloadedDish = await this.dishService.preloadDish(dishes[i]);
        await order.$relatedQuery('dishes').relate(preloadedDish);
      }
    }

    return order;
  }

  async remove(orderId: string) {
    await this.orderModel
      .relatedQuery('dishes')
      .for(+orderId)
      .delete();
    await this.customerModel
      .relatedQuery('orders')
      .unrelate()
      .where('id', +orderId);
    return await this.orderModel.query().deleteById(+orderId);
  }

  async preloadOrder(order: Order): Promise<Order> {
    if (order.id) {
      const existingOrder = await this.orderModel.query().findById(order.id);
      if (!existingOrder) {
        throw new NotFoundException(`Order #${order.id} not found`);
      }
      return existingOrder;
    }
    return await this.orderModel.query().insert(order);
  }
}
