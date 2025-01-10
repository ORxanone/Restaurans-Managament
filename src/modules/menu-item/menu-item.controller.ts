import { Controller } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { MenuItemEntity } from './entity/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemService } from './menu-item.service';

@Controller({
  path: 'menu-items',
})
export class MenuItemController extends GenericController<
  MenuItemEntity,
  CreateMenuItemDto,
  UpdateMenuItemDto
> {
  constructor(private readonly menuItemService: MenuItemService) {
    super(menuItemService);
  }
}
