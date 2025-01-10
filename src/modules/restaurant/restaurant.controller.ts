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
    const restData = await this.restaurantService.findAll();
    const chgTimeData = restData.map((item) => {
      const restaurant = new RestaurantEntity();
      Object.assign(restaurant, item, {
        createdAt: convertToTimeZone(item.createdAt, item.timeZone),
        updatedAt: convertToTimeZone(item.updatedAt, item.timeZone),
      });
      return restaurant;
    });
    return chgTimeData;
  }
  @Get(':id')
  async findById(id: number): Promise<RestaurantEntity> {
    const restDataId = await this.restaurantService.findById(id);
    const restaurant = new RestaurantEntity();
    Object.assign(restaurant, restDataId, {
      createdAt: convertToTimeZone(restDataId.createdAt, restDataId.timeZone),
      updatedAt: convertToTimeZone(restDataId.updatedAt, restDataId.timeZone),
    });
    return restaurant;
  }
}
