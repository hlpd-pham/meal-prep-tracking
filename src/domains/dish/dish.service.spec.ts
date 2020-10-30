import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Dish, DishType } from './dish.model';
import { DishService } from './dish.service';
import { Order } from '../order/order.model';
import { QueryBuilder } from 'objection';
import { NotFoundException } from '@nestjs/common';
import { DishDto, UpdateDishDto } from './dish.dto';
import { dishFactory, orderFactory } from './../../test/factories';
import * as faker from 'faker';

describe('CustomerService', () => {
  let dishService: DishService;
  let mockDishType: typeof Dish;
  let mockOrderType: typeof Order;
  let dishQuerySpy: jest.SpyInstance<QueryBuilder<Dish, Dish | Dish[]>>;
  let orderQuerySpy: jest.SpyInstance<QueryBuilder<Order, Order | Order[]>>;

  beforeEach(async () => {
    mockDishType = Dish;
    mockOrderType = Order;

    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectionModule.forFeature([Dish, Order])],
      providers: [DishService],
    })
      .overrideProvider(Dish)
      .useValue(mockDishType)
      .overrideProvider(Order)
      .useValue(mockOrderType)
      .compile();

    dishQuerySpy = jest.spyOn(mockDishType, 'query');
    orderQuerySpy = jest.spyOn(mockOrderType, 'query');
    dishService = module.get<DishService>(DishService);
  });

  describe('findOne()', () => {
    it('should return one dish item', async () => {
      const dishItem = dishFactory();
      dishQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Dish).resolve(dishItem),
      );

      const queryResult = await dishService.findOne('1');

      expect(queryResult).toBe(dishItem);
    });

    it('should return an error when item not found', async () => {
      dishQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Dish).resolve(undefined),
      );
      try {
        dishService.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAll()', () => {
    it('should return all dish items', async () => {
      let dishItems: Dish[] = [];
      for (var i = 0; i < 5; i++) {
        let dish = dishFactory();
        dishItems.push(dish);
      }
      dishQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Dish).resolve(dishItems),
      );
      expect(await dishService.findAll()).toBe(dishItems);
    });
  });

  describe('create()', () => {
    let dishName: string;
    let dishType: DishType;
    let quantity: number;
    let dishDto: DishDto;
    let dishItem: Dish;

    beforeEach(() => {
      dishName = faker.random.word();
      dishType = DishType.Breakfast;
      quantity = faker.random.number();
      dishDto = {
        name: dishName,
        type: dishType,
        quantity: quantity,
        orderId: 1,
      };
      dishItem = dishFactory();

      dishQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Dish).resolve(dishItem),
      );
    });

    it('should return an error when creating a dish without an orderId', async () => {
      orderQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Order).resolve(undefined),
      );

      try {
        await dishService.create(dishDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return a dish on successful create', async () => {
      let mockOrder = orderFactory();

      orderQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Order).resolve(mockOrder),
      );

      let resultDishItem = await dishService.create(dishDto);
      expect(resultDishItem).toBeInstanceOf(Dish);
      expect(resultDishItem.name).toEqual(dishName);
      expect(resultDishItem.type).toEqual(dishType);
      expect(resultDishItem.quantity).toEqual(quantity);
    });
  });

  describe('update()', () => {
    let dishName: string;
    let dishType: DishType;
    let quantity: number;
    let dishId: number;
    let updatedDishItem: Dish;
    let updatedDishName: string;
    let updateDishDto: UpdateDishDto;

    beforeEach(() => {
      dishId = faker.random.number();
      dishName = faker.random.word();
      dishType = DishType.Breakfast;
      quantity = faker.random.number();
      updatedDishName = 'updated dish name';
      updateDishDto = { name: updatedDishName };

      updatedDishItem = dishFactory({
        id: dishId,
        name: updatedDishName,
        type: DishType.Dinner,
        quantity: quantity,
      });
    });

    it('should return 1 for 1 updated record', async () => {
      dishQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Dish).resolve(updatedDishItem),
      );
      let updatingResult = await dishService.update('1', updateDishDto);

      expect(updatingResult.name).toEqual(updatedDishName);
    });

    it("should return an error when the dish doens't exist", () => {
      dishQuerySpy.mockReturnValue(
        QueryBuilder.forClass(Dish).resolve(undefined),
      );
      try {
        dishService.update('1', updateDishDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove()', () => {
    it('should return 1 for deleting an existing item', async () => {
      dishQuerySpy.mockReturnValue(QueryBuilder.forClass(Dish).resolve(1));
      expect(await dishService.remove('1')).toEqual(1);
    });
    it('should return an error for deleting non existent item', async () => {
      dishQuerySpy.mockReturnValue(QueryBuilder.forClass(Dish).resolve(0));
      try {
        await dishService.remove('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
