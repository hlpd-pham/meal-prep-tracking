import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../order/order.model';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { DishService } from '../dish/dish.service';
import { OrderDto, UpdateOrderDto } from './order.dto';
import { DeliverPerson } from '../deliver-person/deliver-person.model';
import { DeliverPersonService } from '../deliver-person/deliver-person.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(Order)
    private readonly orderModel: typeof Order,
    @Inject(Customer)
    private readonly customerModel: typeof Customer,
    @Inject(DeliverPerson)
    private readonly deliverPersonModel: typeof DeliverPerson,
    private readonly deliverPersonService: DeliverPersonService,
    private readonly customerService: CustomerService,
    private readonly dishService: DishService,
  ) {}

  async findAll() {
    return await this.orderModel.query().withGraphFetched({
      dishes: true,
      deliverPersons: true,
    });
  }

  async findOne(orderId: string) {
    const order = await this.orderModel
      .query()
      .findById(+orderId)
      .withGraphFetched({ dishes: true });
    return order;
  }

  async create(orderDto: OrderDto) {
    const { customer, dishes, ...orderInfo } = orderDto;

    const order = await this.orderModel
      .query()
      .insert(orderInfo)
      .withGraphFetched('dishes');

    // associate customer with order
    if (customer) {
      const preloadedCustomer = await this.customerService.preloadCustomer(
        customer,
      );
      await preloadedCustomer.$relatedQuery('orders').relate(order.id);
    }

    // associate dishes with order
    if (dishes) {
      for (var i = 0; i < dishes.length; i++) {
        const preloadedDish = await this.dishService.preloadDish(dishes[i]);
        await order.$relatedQuery('dishes').relate(preloadedDish.id);
      }
    }

    return order.$fetchGraph({ dishes: true });
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const { deliverPerson, customer, dishes, ...orderInfo } = updateOrderDto;

    const order = await this.orderModel
      .query()
      .findById(+orderId)
      .withGraphFetched('dishes');
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    await this.orderModel
      .query()
      .findById(+orderId)
      .patch(orderInfo);

    // associate customer with order
    if (customer) {
      const preloadedCustomer = await this.customerService.preloadCustomer(
        customer,
      );

      await preloadedCustomer.$relatedQuery('orders').relate(order.id);
    }

    // associate order with dishes
    if (dishes) {
      for (var i = 0; i < dishes.length; i++) {
        const preloadedDish = await this.dishService.preloadDish(dishes[i]);
        await order.$relatedQuery('dishes').relate(preloadedDish.id);
      }
    }

    // associate deliver person with order
    if (deliverPerson) {
      const preloadedDeliverPerson = await this.deliverPersonService.preloadDeliverPerson(
        deliverPerson,
      );

      await preloadedDeliverPerson.$relatedQuery('orders').relate(order.id);
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
    await this.deliverPersonModel
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
