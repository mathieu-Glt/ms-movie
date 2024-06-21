import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from 'src/Schema/movie.schema';
import { Model, Types } from 'mongoose';
import { NatsMessengerService } from '@app/nats-messenger';
import { IdDto } from './dto/id.dto';
import { Favorites, FavoritesDocument } from 'src/Schema/favoriesMovie.schema';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';
@Injectable()
export class MovieService {

  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    private readonly natsMessengerService: NatsMessengerService,
    @InjectModel(Favorites.name)
    private readonly favoriteModel: Model<FavoritesDocument>,
  ) {}

  async createMovie(data: CreateMovieDto): Promise<Movie> {
    try {
      console.log('createMovieDto ~ MovieService', data);
      const movie = await this.movieModel.create(data)
      return movie
  
    } catch (error) {
      console.log("🚀 ~ AppService ~ createMovie ~ error:", error)
      throw new Error(error.message);

    }
    
  }

  async addFavorite(data: any) {
    try {
      console.log("addFavorite ~ MovieService", data);
      const { userId, movieId } = data;

      // Convertir movieId en ObjectId si ce n'est pas déjà fait
      const objectIdMovieId = new Types.ObjectId(movieId);

      const favoriteMovie = await this.favoriteModel.findOne(
        { movie_id: objectIdMovieId}
      )
      console.log('====================================');
      console.log("favoriteMovie", favoriteMovie);
      console.log('====================================');
      const movie = await this.movieModel.findById(objectIdMovieId)
      console.log('====================================');
      console.log(movie);
      console.log('====================================');

      if (!favoriteMovie) {
        const favorite = await this.favoriteModel.create({
          userId,
          movie_id: objectIdMovieId, // Assurez-vous que movie_id est correctement défini comme ObjectId
        });
        
        return {
          status: 200,
          error: false,
          message: `The movie ${movie.title} has been added to your favorites list`,
          results: favorite,
        };
  
      } else {
        return {
          status: 400,
          error: true,
          message: `The movie ${movie.title} already exists within of your list favorite`,
        }
      }
      

    } catch (error) {
      console.log("🚀 ~ AppService ~ addFavorite ~ error:", error)
      throw new Error(error.message);
    }
  }

  async findAll(id: string | number | Types.ObjectId) {
    console.log("id- findAll", id);
    
    try {
      //RECUPERER LES DETAILS DE L'USER
      const userDetails = await this.natsMessengerService.send(
        'GET_USER_BY_ID',
        {  id }
      )
      console.log('🚀 ~ AppService ~ findAll ~ userDetails:', userDetails);

      const movies = await this.movieModel.find()
      return { movies, userDetails };
      // return { movies, userDetails };
    } catch (error) {
      console.log("🚀 ~ AppService ~ createMovie ~ error:", error)
      throw new Error(error.message);

    }
  }

  async findOne(id: string | number | Types.ObjectId) {
    try {
      const movie = await this.movieModel.findById(id)
      return movie
    } catch (error) {
      console.log("🚀 ~ AppService ~ createMovie ~ error:", error)
      throw new Error(error.message);

    }
  }

  async updateMovie(movieId: string | number | Types.ObjectId, data: any) {
    // return `This action updates a #${id} movie`;
    console.log('Updated Movie:', movieId, data);

    try {
      const updateMovie = await this.movieModel.findByIdAndUpdate(
        movieId,
        data,
        { new: true }
      )

      return updateMovie;
      // console.log('Updated Movie:', updateMovie);
    } catch (error) {
      console.log("🚀 ~ AppService ~ createMovie ~ error:", error)
      throw new Error(error.message);

    }
  }

  async deleteMovie(id: string | number | Types.ObjectId) {
    try {
      const movieDelete = await this.movieModel.findByIdAndDelete(id)
      return movieDelete;
    } catch (error) {
      console.log("🚀 ~ AppService ~ createMovie ~ error:", error)
      throw new Error(error.message);

    }
  }
}
