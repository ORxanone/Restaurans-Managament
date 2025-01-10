import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'common/resource/generic-repository';
import { MenuEntity } from './entity/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuRepository extends GenericRepository<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
  ) {
    super(menuRepo);
  }
}
