import { Test, TestingModule } from '@nestjs/testing';
import { DeliverPersonController } from './deliver-person.controller';

describe('DeliverPersonController', () => {
  let controller: DeliverPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverPersonController],
    }).compile();

    controller = module.get<DeliverPersonController>(DeliverPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
