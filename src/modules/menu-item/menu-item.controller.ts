import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { MenuItemEntity } from './entity/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemService } from './menu-item.service';

@Controller({
  path: 'menu-items/',
})
export class MenuItemController extends GenericController<
  MenuItemEntity,
  CreateMenuItemDto,
  UpdateMenuItemDto
> {
  constructor(private readonly menuItemService: MenuItemService) {
    super(menuItemService);
  }

  @Post()
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto): Promise<MenuItemEntity> {
    return this.menuItemService.createMenuItem(createMenuItemDto);
  }

  @Get()
  async getMenuItems(): Promise<MenuItemEntity[]> {
    return this.menuItemService.findAll();
  }

  @Get(":id")
  async findById(id: number): Promise<MenuItemEntity> {
    return this.menuItemService.findById(id)
  }
}
