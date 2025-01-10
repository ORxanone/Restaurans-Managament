import { Controller, Get } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { MenuEntity } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';
import { RestaurantService } from 'modules/restaurant/restaurant.service';

@Controller({
  path: 'menus',
})
@ApiTags('Menu')
export class MenuController extends GenericController<
  MenuEntity,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor(private readonly menuService: MenuService,
    private readonly restaurantService: RestaurantService,
  ) {
    super(menuService);
  }

  @Get()
  async findAll(): Promise<MenuEntity[]> {
    const menuData = await this.menuService.findAll();
    const restaurantIds = menuData.map(menu => menu.restaurantId);
    const restaurants = await Promise.all(restaurantIds.map(id => this.restaurantService.findById(id)));

    const restaurantTimeZones = restaurants.reduce((acc: { [key: number]: string }, restaurant) => {
      acc[restaurant.id] = restaurant.timeZone;
      return acc;
    }, {});

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

  @Get(':id')
    async findById(id: number): Promise<MenuEntity> {
      const menuDataId = await this.menuService.findById(id);
      const restaurant = await this.restaurantService.findById(menuDataId.restaurantId);
      const menu = new MenuEntity();
      Object.assign(menu, menuDataId, {
        createdAt: convertToTimeZone(menuDataId.createdAt, restaurant.timeZone),
        updatedAt: convertToTimeZone(menuDataId.updatedAt, restaurant.timeZone),
      });
      return menu;
    }
}
