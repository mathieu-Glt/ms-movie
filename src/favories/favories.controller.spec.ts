import { Test, TestingModule } from '@nestjs/testing';
import { FavoriesController } from './favories.controller';
import { FavoriesService } from './favories.service';

describe('FavoriesController', () => {
  let controller: FavoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriesController],
      providers: [FavoriesService],
    }).compile();

    controller = module.get<FavoriesController>(FavoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
