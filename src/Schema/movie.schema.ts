import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
  IsNotEmpty,
    IsNumber,
    IsString,
    IsStrongPassword,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;
@Schema({ collection: 'movie', versionKey: false, timestamps: true })
export class Movie {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  picture: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  synopsis: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  movie: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  rating: number;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  slug: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie)
