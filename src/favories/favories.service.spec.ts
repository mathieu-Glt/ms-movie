import { Test, TestingModule } from '@nestjs/testing';
import { FavoriesService } from './favories.service';

describe('FavoriesService', () => {
  let service: FavoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriesService],
    }).compile();

    service = module.get<FavoriesService>(FavoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
