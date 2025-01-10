import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { MenuEntity } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityMapper } from 'common/utils/entity-mapper';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService extends GenericService<
  MenuEntity,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor(
    protected readonly menuRepo: MenuRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(menuRepo, entityMapper, MenuEntity);
  }
}
