import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { RestaurantEntity } from './entity/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-reataurant.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { RestaurantRepository } from './restaurant.repository';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';

@Injectable()
export class RestaurantService extends GenericService<
  RestaurantEntity,
  CreateRestaurantDto,
  UpdateRestaurantDto
> {
  constructor(
    protected readonly restaurantRepository: RestaurantRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(restaurantRepository, entityMapper, RestaurantEntity);
  }

  async findAll(): Promise<RestaurantEntity[]> {
    const restData = await this.restaurantRepository.findAll();
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

  async findById(id: number): Promise<RestaurantEntity> {
    const restDataId = await this.restaurantRepository.findById(id);
    const restaurant = new RestaurantEntity();
    Object.assign(restaurant, restDataId, {
      createdAt: convertToTimeZone(restDataId.createdAt, restDataId.timeZone),
      updatedAt: convertToTimeZone(restDataId.updatedAt, restDataId.timeZone),
    });
    return restaurant;
  }
}
