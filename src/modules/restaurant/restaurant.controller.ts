import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-reataurant.dto';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { ApiTags } from '@nestjs/swagger';

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

  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto): Promise<RestaurantEntity> {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get()
  async findAll() {
    return this.restaurantService.findAll();
  }
  @Get(':id')
  async findById(id: number): Promise<RestaurantEntity> {
    return this.restaurantService.findById(id);
  }

}
