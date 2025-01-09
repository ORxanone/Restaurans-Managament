import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsNumber } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsNumber()
  id: number;
}
