import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { RestaurantEntity } from './entity/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-reataurant.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { RestaurantRepository } from './restaurant.repository';

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
}
