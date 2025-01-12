import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { MenuItemEntity } from './entity/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { MenuItemRepository } from './menu-item.repository';
import { TranslateRepository } from 'modules/translation/translation.repository';
import { LanguageRepository } from 'modules/language/language.repository';
import { TranslationEntity } from 'modules/translation/entity/translation.entity';

@Injectable()
export class MenuItemService extends GenericService<
  MenuItemEntity,
  CreateMenuItemDto,
  UpdateMenuItemDto
> {
  constructor(
    protected readonly menuItemRepository: MenuItemRepository,
    protected readonly translationRepository: TranslateRepository,
    protected readonly languageRepository: LanguageRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(menuItemRepository, entityMapper, MenuItemEntity);
  }

  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItemEntity> {
    const menuItem = await this.menuItemRepository.save(
      this.entityMapper.toEntity(createMenuItemDto, MenuItemEntity),
    );

    for (const translation of createMenuItemDto.translations) {
      const obj = {
        branchId: createMenuItemDto.branchId,
        menuItemId: menuItem.id,
        language: translation.language,
        keyWord: translation.keyWord,
        value: translation.value,
      };
  
      const translationEntity = this.entityMapper.toEntity(obj, TranslationEntity);  
      await this.translationRepository.save(translationEntity);
    }
  
    return menuItem;
  }
  

  async findAll(): Promise<MenuItemEntity[]> {
    return this.menuItemRepository.find({
      relations: ['translations'],
    });
  }
}
