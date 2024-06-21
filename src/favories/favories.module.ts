import { Module } from '@nestjs/common';
import { FavoriesService } from './favories.service';
import { FavoriesController } from './favories.controller';

@Module({
  controllers: [FavoriesController],
  providers: [FavoriesService]
})
export class FavoriesModule {}
