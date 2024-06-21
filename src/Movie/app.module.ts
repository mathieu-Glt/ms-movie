import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NatsMessengerModule } from '@app/nats-messenger';
import { MovieController } from './app.controller';
import { MovieService } from './app.service';
import { Movie, MovieSchema } from 'src/Schema/movie.schema';
import { Favorites, FavoritesSchema } from 'src/Schema/favoriesMovie.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB, { 
       dbName: 'cpa42',
      }),
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Favorites.name, schema: FavoritesSchema },
    ]),
    NatsMessengerModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class AppModule {}
