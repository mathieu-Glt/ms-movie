import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovieService } from './app.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { responseErrorInterface, responseSucessInterface } from 'src/interface/response.interface';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IdDto } from './dto/id.dto';
import { Types, isValidObjectId } from 'mongoose';
import { IdsInterface } from 'src/interface/movie.interface';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @MessagePattern('CREATE_MOVIE')
  async create(
    @Payload() payload: CreateMovieDto,
  ): Promise<responseSucessInterface | responseErrorInterface> {
    console.log('hello create movie!');
    console.log('data ~ MovieController - payload', payload);
    try {
      const movieCreate = await this.movieService.createMovie(payload);
      console.log("MovieController ~ movieCreate", movieCreate);
      return {
        status: 201,
        error: false,
        message: 'Movie has been created',
        results: movieCreate,
      };
  
    } catch (error) {
      console.log("🚀 ~ AppController ~ createUser ~ error:", error)
      return { status: 500, error: true, message: error };

    }
  }

  @MessagePattern('GET_MOVIES')
  async findAll(
    @Payload() id: string | number | Types.ObjectId,
  ): Promise<responseSucessInterface | responseErrorInterface> {
    console.log("MovieController ~ payload", id);

    try {
      const movies = await this.movieService.findAll(id)
      console.log("MovieController ~ movies", movies);
      return {
        status: 200,
        error: false,
        message: 'Collection found',
        results: movies,
      };

    } catch (error) {
      console.log("🚀 ~ AppController ~ createUser ~ error:", error)
      return { status: 500, error: true, message: error };

    }
  }

  @MessagePattern('GET_MOVIE_BY_ID')
  async findOne(
    @Payload() id: string | number | Types.ObjectId,
  ): Promise<responseSucessInterface | responseErrorInterface> {
    console.log('id', id);
    
    try {
      const movie = await this.movieService.findOne(id) 
      console.log("MovieController ~ movie", movie);
      return {
        status: 200,
        error: false,
        message: `Movie ${movie.title} found`,
        results: movie,
      };

    } catch (error) {
      console.log("🚀 ~ AppController ~ createUser ~ error:", error)
      return { status: 500, error: true, message: error };

    }
  }

  @MessagePattern('UPDATE_MOVIE')
  async update(
    @Payload() payload: UpdateMovieDto,
  ): Promise<responseSucessInterface | responseErrorInterface> {
    // return this.movieService.update(updateMovieDto.id, updateMovieDto);
    console.log('payload', payload);
    
    try {
      const id = payload.id;
      const data = payload.body;

      const movieUpdate = await this.movieService.updateMovie(id, data)
      console.log('MovieController ~ movieUpdate', movieUpdate);
      return {
        status: 200,
        error: false,
        message: `Movie ${movieUpdate.title} updated`,
        results: movieUpdate,
      };

    } catch (error) {
      console.log("🚀 ~ AppController ~ createUser ~ error:", error)
      return { status: 500, error: true, message: error };
    }
  }

  @MessagePattern('ADD_MOVIE_FAVORIS')
  async addFavories(
    @Payload() data: IdsInterface,
  ): Promise<responseSucessInterface | responseErrorInterface> {
    try {
      const { movieId, userId } = data;
  
      // Vérifiez si movieId est un ObjectId valide
      // if (!isValidObjectId(movieId.id)) {
      //   console.log('invalid id ');
        
      // }

  
      const addMovieFavorite = await this.movieService.addFavorite({
        userId,
        movieId: movieId.id, // Utilisez movieObjectId ici
      });
      return {
        status: 200,
        error: false,
        message: `Movie has been added`,
        results: addMovieFavorite,
      };
    } catch (error) {
      console.log('Error in addFavories:', error);
      return { status: 500, error: true, message: error.message };
    }
  }


  @MessagePattern('DELETE_MOVIE')
  async remove(
    @Payload() id: string | number | Types.ObjectId,
  ): Promise<responseSucessInterface | responseErrorInterface> 
    {
    try {
      const movieDelete = await this.movieService.deleteMovie(id)
      return {
        status: 200,
        error: false,
        message: `Movie ${movieDelete.title} deleted`,
        results: movieDelete,
      };
    } catch (error) {
      console.log("🚀 ~ AppController ~ createUser ~ error:", error)
      return { status: 500, error: true, message: error };

    }
    // return this.movieService.remove(id);
  }
}


