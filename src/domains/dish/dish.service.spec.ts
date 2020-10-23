import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Dish, DishType } from './dish.model';
import { DishService } from './dish.service';
import * as faker from 'faker';
import { Order } from '../order/order.model';

describe('CustomerService', () => {
  let service: DishService;
  const mockDishType = typeof Dish;
  const mockOrderType = typeof Order;
  let querySpy: jest.SpyInstance<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectionModule.forFeature([Dish, Order])],
      providers: [DishService],
    })
      .overrideProvider(Dish)
      .useValue(mockDishType)
      .overrideProvider(Order)
      .useValue(mockOrderType)
      .compile();

    service = module.get<DishService>(DishService);
  });

  describe('findOne()', () => {
    it('should return one dish item', () => {
      const dishItem = dishItemFactory();
    });
  });
});

function dishItemFactory() {
  const dishItem = new Dish();
  const dishTypes = Object.values(DishType);
  dishItem.id = faker.random.number();
  dishItem.name = faker.random.word();
  dishItem.type = dishTypes[Math.floor(Math.random() * dishTypes.length)];
  return dishItem;
}
