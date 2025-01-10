import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateRestaurantDto } from 'modules/restaurant/dto/create-restaurant.dto';

export class CreateBranchDto extends PartialType(CreateRestaurantDto) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  restaurantId: number;
}
