import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'common/resource/generic-repository';
import { MenuItemEntity } from './entity/menu-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemRepository extends GenericRepository<MenuItemEntity> {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuItemRepo: Repository<MenuItemEntity>,
  ) {
    super(menuItemRepo);
  }
}
