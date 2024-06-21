import { Injectable } from '@nestjs/common';
import { CreateFavoryDto } from './dto/create-favory.dto';
import { UpdateFavoryDto } from './dto/update-favory.dto';

@Injectable()
export class FavoriesService {
  create(createFavoryDto: CreateFavoryDto) {
    return 'This action adds a new favory';
  }

  findAll() {
    return `This action returns all favories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favory`;
  }

  update(id: number, updateFavoryDto: UpdateFavoryDto) {
    return `This action updates a #${id} favory`;
  }

  remove(id: number) {
    return `This action removes a #${id} favory`;
  }
}
