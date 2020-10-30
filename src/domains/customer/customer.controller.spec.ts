import { Test, TestingModule } from '@nestjs/testing';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjectionModule.forFeature([Customer])],
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it.todo('should be defined');
});
