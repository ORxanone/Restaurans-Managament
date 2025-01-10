import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'common/resource/generic-repository';
import { RestaurantEntity } from './entity/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantRepository extends GenericRepository<RestaurantEntity> {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepo: Repository<RestaurantEntity>,
  ) {
    super(restaurantRepo);
  }

}
