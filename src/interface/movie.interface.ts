import { Types } from "mongoose";

export interface MovieInterface {
  id?: string;
  title: string;
  picture: string;
  synopsis: string;
  movie: string;
  rating: string,
  slug: string
}

export interface IdsInterface {
  movieId: MovieId;
  userId: string | Types.ObjectId | number;
}

export interface MovieId {
  id: string | Types.ObjectId | number;
}