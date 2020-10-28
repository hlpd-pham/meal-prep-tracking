import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { QueryBuilder } from 'objection';
import { orderFactory, mockModel } from './../../test/factories';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { Dish } from '../dish/dish.model';
import { DishService } from '../dish/dish.service';
import { Order } from './order.model';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let dishService: DishService;
  let customerService: CustomerService;
  let mockDishType: typeof Dish;
  let mockCustomerType: typeof Customer;
  let mockOrderType: typeof Order;
  let dishQuerySpy: jest.SpyInstance<QueryBuilder<Dish, Dish | Dish[]>>;
  let orderQuerySpy: jest.SpyInstance<QueryBuilder<Order, Order | Order[]>>;
  let customerQuerySpy: jest.SpyInstance<QueryBuilder<
    Customer,
    Customer | Customer[]
  >>;

  beforeEach(async () => {
    mockDishType = Dish;
    mockCustomerType = Customer;
    mockOrderType = Order;

    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectionModule.forFeature([Dish, Order, Customer])],
      providers: [DishService, CustomerService, OrderService],
    })
      .overrideProvider(Order)
      .useValue(mockOrderType)
      .overrideProvider(Customer)
      .useValue(mockCustomerType)
      .overrideProvider(Dish)
      .useValue(mockDishType)
      .compile();

    dishQuerySpy = jest.spyOn(mockDishType, 'query');
    orderQuerySpy = jest.spyOn(mockOrderType, 'query');
    customerQuerySpy = jest.spyOn(mockCustomerType, 'query');
    orderService = module.get<OrderService>(OrderService);
    dishService = module.get<DishService>(DishService);
    customerService = module.get<CustomerService>(CustomerService);
  });

  describe('findAll()', () => {
    it('should return all orders', async () => {
      let orders: Order[] = [];
      for (var i = 0; i < 5; i++) {
        let order = orderFactory();
        orders.push(order);
      }

      orderQuerySpy.mockReturnValue(QueryBuilder.forClass(Order).resolve({}));

      expect(await orderService.findAll()).toBe(orders);
    });
  });
});
