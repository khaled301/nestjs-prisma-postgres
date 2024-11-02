import { Test, TestingModule } from '@nestjs/testing';
import { PublicApisService } from './public-apis.service';

describe('PublicApisService', () => {
  let service: PublicApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicApisService],
    }).compile();

    service = module.get<PublicApisService>(PublicApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
