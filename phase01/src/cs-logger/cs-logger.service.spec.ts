import { Test, TestingModule } from '@nestjs/testing';
import { CsLoggerService } from './cs-logger.service';

describe('CsLoggerService', () => {
  let service: CsLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsLoggerService],
    }).compile();

    service = module.get<CsLoggerService>(CsLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
