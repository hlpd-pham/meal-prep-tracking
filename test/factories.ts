import * as faker from 'faker';
import { QueryBuilder } from 'objection';
import { Dish, DishType } from '../src/domains/dish/dish.model';
import { Order, OrderStatus } from '../src/domains/order/order.model';

export function dishFactory({
  id,
  name,
  type,
  quantity,
}: Partial<Dish> = {}): Dish {
  const dishItem = new Dish();
  const dishTypes = Object.values(DishType);
  dishItem.id = id ?? faker.random.number();
  dishItem.name = name ?? faker.random.word();
  dishItem.type =
    type ?? dishTypes[Math.floor(Math.random() * dishTypes.length)];
  dishItem.quantity = quantity ?? faker.random.number();
  return dishItem;
}

export function orderFactory({
  id,
  orderDate,
  deliveryDate,
  status,
}: Partial<Order> = {}) {
  const order = new Order();
  const orderStatusValues = Object.values(OrderStatus);
  order.id = id ?? faker.random.number();
  order.orderDate = orderDate ?? new Date();
  order.deliveryDate = deliveryDate ?? faker.date.future();
  order.status =
    status ??
    orderStatusValues[Math.floor(Math.random() * orderStatusValues.length)];
  order.$relatedQuery = () =>
    QueryBuilder.forClass(Order).resolve('mockRelatedQuery');
  return order;
}

export function mockModel(Model) {
  const query = QueryBuilder.forClass(Model);
  jest.spyOn(Model, 'query').mockReturnValue(query);
  return query;
}
