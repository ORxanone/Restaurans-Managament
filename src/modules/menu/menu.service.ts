import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { MenuEntity } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityMapper } from 'common/utils/entity-mapper';
import { MenuRepository } from './menu.repository';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';
import { RestaurantRepository } from 'modules/restaurant/restaurant.repository';

@Injectable()
export class MenuService extends GenericService<
  MenuEntity,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor(
    protected readonly menuRepo: MenuRepository,
    protected readonly restaurantRepo: RestaurantRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(menuRepo, entityMapper, MenuEntity);
  }

  async findAll(): Promise<MenuEntity[]> {
    const menuData = await this.menuRepo.find({
      relations: ['menuIds'],
    });
    const restaurantIds = menuData.map((menu) => menu.restaurantId);
    const restaurants = await Promise.all(
      restaurantIds.map((id) => this.restaurantRepo.findById(id)),
    );

    const restaurantTimeZones = restaurants.reduce(
      (acc: { [key: number]: string }, restaurant) => {
        acc[restaurant.id] = restaurant.timeZone;
        return acc;
      },
      {},
    );

    const chgTimeData = menuData.map((item) => {
      const menu = new MenuEntity();
      const timeZone = restaurantTimeZones[item.restaurantId];
      Object.assign(menu, item, {
        createdAt: convertToTimeZone(item.createdAt, timeZone),
        updatedAt: convertToTimeZone(item.updatedAt, timeZone),
      });
      return menu;
    });

    return chgTimeData;
  }

  async findById(id: number): Promise<MenuEntity> {
    const menuDataId = await this.menuRepo.findOne({
      where: { id },
      relations: ['menuIds'],
    });
    const restaurant = await this.restaurantRepo.findById(
      menuDataId.restaurantId,
    );
    const menu = new MenuEntity();
    Object.assign(menu, menuDataId, {
      createdAt: convertToTimeZone(menuDataId.createdAt, restaurant.timeZone),
      updatedAt: convertToTimeZone(menuDataId.updatedAt, restaurant.timeZone),
    });
    return menu;
  }
}
