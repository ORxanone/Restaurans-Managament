import { Controller, Get } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-reataurant.dto';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { ApiTags } from '@nestjs/swagger';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';

@Controller({
  path: 'restaurants',
})
@ApiTags('Restaurants')
export class RestaurantController extends GenericController<
  RestaurantEntity,
  CreateRestaurantDto,
  UpdateRestaurantDto
> {
  constructor(private readonly restaurantService: RestaurantService) {
    super(restaurantService);
  }

  @Get()
  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantService.findAll();
  }
  @Get(':id')
  async findById(id: number): Promise<RestaurantEntity> {
    return this.restaurantService.findById(id);
  }
}
