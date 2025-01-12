import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { RestaurantEntity } from './entity/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-reataurant.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { RestaurantRepository } from './restaurant.repository';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';
import { LanguageRepository } from 'modules/language/language.repository';
import { In } from 'typeorm';

@Injectable()
export class RestaurantService extends GenericService<
  RestaurantEntity,
  CreateRestaurantDto,
  UpdateRestaurantDto
> {
  constructor(
    protected readonly restaurantRepository: RestaurantRepository,
    protected readonly languageRepository: LanguageRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(restaurantRepository, entityMapper, RestaurantEntity);
  }

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantEntity> {
    const languages = await this.languageRepository.find({
      where: { id: In(createRestaurantDto.supportedLanguages) },
    });

    // if (!languages || languages.length === 0) {
    //   throw new Error('Languages not found');
    // }
    const saveDto = {
      ...createRestaurantDto,
      languages,
    }
    const restaurant = await this.restaurantRepository.save(
      this.entityMapper.toEntity(saveDto, RestaurantEntity),
    );
    return restaurant;
  }

  async findAll(): Promise<RestaurantEntity[]> {
    const restData = await this.restaurantRepository.find({
      relations: ['branches', "languages"],
      select: {
        languages: true,
      }
    });
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
    const restDataId = await this.restaurantRepository.findOne({
      where: { id },
      relations: ['branches'],
    });
    const restaurant = new RestaurantEntity();
    Object.assign(restaurant, restDataId, {
      createdAt: convertToTimeZone(restDataId.createdAt, restDataId.timeZone),
      updatedAt: convertToTimeZone(restDataId.updatedAt, restDataId.timeZone),
    });
    return restaurant;
  }
}
