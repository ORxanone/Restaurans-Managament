import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemEntity } from './entity/menu-item.entity';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { EntityMapper } from 'common/utils/entity-mapper';
import { MenuItemRepository } from './menu-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity])],
  controllers: [MenuItemController],
  providers: [MenuItemService, MenuItemRepository, EntityMapper],
})
export class MenuItemModule {}
