import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieInterface } from 'src/interface/movie.interface';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // @MessagePattern('CREATE_MOVIE')
  // async create(@Payload() payload: CreateMovieDto) {
  //   console.log('hello create movie hello eurp!');
  //   console.log('payload', payload);

  //   const movieCreate = await this.movieService.create(payload);
  //   console.log("MovieController ~ movieCreate", movieCreate);
    
  // }

  // @MessagePattern('GET_MOVIES')
  // findAll() {
  //   return this.movieService.findAll();
  // }

  // @MessagePattern('GET_ONE_MOVIE')
  // findOne(@Payload() id: number) {
  //   return this.movieService.findOne(id);
  // }

//   @MessagePattern('UPDATE_MOVIE')
//   update(@Payload() updateMovieDto: UpdateMovieDto) {
//     return this.movieService.update(updateMovieDto.id, updateMovieDto);
//   }

//   @MessagePattern('DELETE_MOVIE')
//   remove(@Payload() id: number) {
//     return this.movieService.remove(id);
//   }
}
