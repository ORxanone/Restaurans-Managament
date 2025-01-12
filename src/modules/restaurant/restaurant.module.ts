import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entity/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from './restaurant.repository';
import { EntityMapper } from 'common/utils/entity-mapper';
import { LanguageModule } from 'modules/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity]), LanguageModule],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository, EntityMapper],
  exports: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule {}
