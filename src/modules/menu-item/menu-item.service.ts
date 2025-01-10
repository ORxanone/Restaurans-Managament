import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { MenuItemEntity } from './entity/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { MenuItemRepository } from './menu-item.repository';

@Injectable()
export class MenuItemService extends GenericService<
  MenuItemEntity,
  CreateMenuItemDto,
  UpdateMenuItemDto
> {
  constructor(
    protected readonly menuItemRepository: MenuItemRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(menuItemRepository, entityMapper, MenuItemEntity);
  }
}
