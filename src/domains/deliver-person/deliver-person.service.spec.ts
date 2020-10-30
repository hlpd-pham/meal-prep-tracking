import { Test, TestingModule } from '@nestjs/testing';
import { DeliverPersonService } from './deliver-person.service';

describe('DeliverPersonService', () => {
  let service: DeliverPersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliverPersonService],
    }).compile();

    service = module.get<DeliverPersonService>(DeliverPersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
