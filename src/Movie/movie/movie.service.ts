import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/Schema/movie.schema';
import { Model } from 'mongoose';
import { NatsMessengerService } from '@app/nats-messenger';
import { log } from 'console';

@Injectable()
export class MovieService {
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    private readonly natsMessengerService: NatsMessengerService,
  ) {}
  // create(createMovieDto: CreateMovieDto) {
  //   console.log("createMovieDto ~ MovieService", createMovieDto);
    
  //   return 'This action adds a new movie';
  // }

  // async findAll() {
  //   // return `This action returns all movie`;
  //   const email = "mathieu.gillet@hortmail.fr"
  //   try {
  //     const res = await this.natsMessengerService.send('FORGOT_PASSWORD', email);
      
  //   } catch (error) {
  //     console.log('====================================', error);
  //   }
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} movie`;
  // }

  // update(id: number, updateMovieDto: UpdateMovieDto) {
  //   return `This action updates a #${id} movie`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} movie`;
  // }
}
