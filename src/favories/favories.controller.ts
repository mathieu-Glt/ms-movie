import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FavoriesService } from './favories.service';
import { CreateFavoryDto } from './dto/create-favory.dto';
import { UpdateFavoryDto } from './dto/update-favory.dto';

@Controller()
export class FavoriesController {
  constructor(private readonly favoriesService: FavoriesService) {}

  @MessagePattern('ADD_MOVIE_FAVORIS')
  create(@Payload() data: any) {
    console.log("ADD_MOVIE_FAVORIS");
    console.log("data", data);
    
    // return this.favoriesService.create(createFavoryDto);
  }

  @MessagePattern('findAllFavories')
  findAll() {
    return this.favoriesService.findAll();
  }

  @MessagePattern('findOneFavory')
  findOne(@Payload() id: number) {
    return this.favoriesService.findOne(id);
  }

  @MessagePattern('updateFavory')
  update(@Payload() updateFavoryDto: UpdateFavoryDto) {
    return this.favoriesService.update(updateFavoryDto.id, updateFavoryDto);
  }

  @MessagePattern('removeFavory')
  remove(@Payload() id: number) {
    return this.favoriesService.remove(id);
  }
}
