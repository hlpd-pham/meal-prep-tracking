import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockCustomerModel: typeof Customer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    })
      .overrideProvider(Customer)
      .useValue(mockCustomerModel)
      .compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it.todo('test findAll, findOne, create, update, remove');
});
