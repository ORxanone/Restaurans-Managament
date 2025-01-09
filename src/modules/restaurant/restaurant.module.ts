import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from './restaurant.repository';
import { EntityMapper } from 'common/utils/entity-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository, EntityMapper],
})
export class RestaurantModule {}
