import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemEntity } from './entity/menu-item.entity';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { EntityMapper } from 'common/utils/entity-mapper';
import { MenuItemRepository } from './menu-item.repository';
import { TranslationModule } from 'modules/translation/translation.module';
import { LanguageModule } from 'modules/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity]), TranslationModule, LanguageModule],
  controllers: [MenuItemController],
  providers: [MenuItemService, MenuItemRepository, EntityMapper],
})
export class MenuItemModule {}
