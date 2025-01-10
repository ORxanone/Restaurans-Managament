import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entity/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepository } from './menu.repository';
import { EntityMapper } from 'common/utils/entity-mapper';
import { RestaurantService } from 'modules/restaurant/restaurant.service';
import { RestaurantModule } from 'modules/restaurant/restaurant.module';
import { RestaurantRepository } from 'modules/restaurant/restaurant.repository';
import { RestaurantEntity } from 'modules/restaurant/entity/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    TypeOrmModule.forFeature([RestaurantEntity]),
    RestaurantModule,
  ],
  controllers: [MenuController],
  providers: [
    MenuService,
    RestaurantService,
    RestaurantRepository,
    MenuRepository,
    EntityMapper,
  ],
})
export class MenuModule {}
