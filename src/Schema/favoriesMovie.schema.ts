import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { MovieDocument } from './movie.schema';

@Schema({ collection: 'favorites', versionKey: false, timestamps: true })
export class Favorites {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Movie', required: true })
  movie_id: Types.ObjectId | MovieDocument | string;
}

export type FavoritesDocument = Favorites & Document;
export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
