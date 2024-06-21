import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoryDto } from './create-favory.dto';

export class UpdateFavoryDto extends PartialType(CreateFavoryDto) {
  id: number;
}
