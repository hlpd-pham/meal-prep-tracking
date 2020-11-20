import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from '@willsoto/nestjs-objection';

import { seedDeliverPersons } from './../../database/seeds/test_data/deliver_person.seed';
import { mockModel } from './../../test/factories';
import { Order } from '../order/order.model';
import { DeliverPerson } from './deliver-person.model';
import { DeliverPersonService } from './deliver-person.service';
import { NotFoundException } from '@nestjs/common';
import { DeliverPersonDto } from './deliver-person.dto';
import { QueryBuilder } from 'objection';

describe('DeliverPersonService', () => {
  let deliverPersonService: DeliverPersonService;
  let mockDeliverPersonModel: any;
  let mockDeliverPersonQuery: any;
  let mockOrderModel: any;
  let mockOrderQuery: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectionModule.forFeature([DeliverPerson, Order])],
      providers: [DeliverPersonService],
    }).compile();

    deliverPersonService = module.get<DeliverPersonService>(
      DeliverPersonService,
    );
    mockDeliverPersonModel = mockModel(DeliverPerson);
    mockOrderModel = mockModel(Order);
  });

  describe('findAll()', () => {
    it('should return all deliver person entries', async () => {
      mockDeliverPersonQuery = mockDeliverPersonModel.resolve(
        seedDeliverPersons,
      );
      const queryResult = await deliverPersonService.findAll();
      expect(queryResult).toEqual(seedDeliverPersons);
    });
  });

  describe('findOne()', () => {
    it('should return one item', async () => {
      mockDeliverPersonQuery = mockDeliverPersonModel.resolve(
        seedDeliverPersons[0],
      );
      const queryResult = await deliverPersonService.findOne('1');
      expect(queryResult).toEqual(seedDeliverPersons[0]);
    });

    it('should return an error when item not found', async () => {
      mockDeliverPersonQuery = mockDeliverPersonModel.resolve(undefined);
      try {
        await deliverPersonService.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toEqual(404);
      }
    });
  });
});
