import { Test, TestingModule } from '@nestjs/testing';
import { PublicApisController } from './public-apis.controller';
import { PublicApisService } from './public-apis.service';

describe('PublicApisController', () => {
  let controller: PublicApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicApisController],
      providers: [PublicApisService],
    }).compile();

    controller = module.get<PublicApisController>(PublicApisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
