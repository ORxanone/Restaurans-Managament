import { Controller } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { MenuEntity } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';

@Controller({
  path: 'menus',
})
@ApiTags("Menu")
export class MenuController extends GenericController<
  MenuEntity,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor(private readonly menuService: MenuService) {
    super(menuService);
  }
}
