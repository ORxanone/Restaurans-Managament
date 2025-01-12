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
import { RestaurantRepository } from 'modules/restaurant/restaurant.repository';
import { BranchRepository } from 'modules/branch-restaurant/branch.repository';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';

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
    protected readonly branchRepo: BranchRepository,
    protected readonly restaurantRepo: RestaurantRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(menuItemRepository, entityMapper, MenuItemEntity);
  }

  async createMenuItem(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItemEntity> {
    // console.log("createMenuItemDto: ", createMenuItemDto)
    const menuItem = await this.menuItemRepository.save(
      this.entityMapper.toEntity(createMenuItemDto, MenuItemEntity),
    );
    const restaurant = await this.branchRepo.findOne({
      where: { id: createMenuItemDto.branchId },
    });
    console.log('restaurant: ', restaurant.restaurantId);

    for (const translation of createMenuItemDto.translations) {
      const obj = {
        restaurantId: restaurant.restaurantId,
        branchId: createMenuItemDto.branchId,
        menuItemId: menuItem.id,
        language: translation.language,
        keyWord: translation.keyWord,
        value: translation.value,
      };

      const translationEntity = this.entityMapper.toEntity(
        obj,
        TranslationEntity,
      );
      await this.translationRepository.save(translationEntity);
    }

    return menuItem;
  }

  async findAll(): Promise<MenuItemEntity[]> {
    return this.menuItemRepository.find({
      relations: ['translations'],
    });
  }

  async findById(id: number): Promise<MenuItemEntity> {
    const menuItemData = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['menu'],
      select: {
        menu: {
          branchId: true,
          restaurantId: true,
        },
      },
    });

    if (menuItemData.menu.branchId) {
      const branch = await this.branchRepo.findById(id);

      const menuItem = new MenuItemEntity();
      Object.assign(menuItem, menuItemData, {
        createdAt: convertToTimeZone(menuItemData.createdAt, branch.timeZone),
        updatedAt: convertToTimeZone(menuItemData.updatedAt, branch.timeZone),
      });
      return menuItem;
    }
    if (menuItemData.menu.restaurantId) {
      const restaurant = await this.restaurantRepo.findById(id);

      const menuItem = new MenuItemEntity();
      Object.assign(menuItem, menuItemData, {
        createdAt: convertToTimeZone(
          menuItemData.createdAt,
          restaurant.timeZone,
        ),
        updatedAt: convertToTimeZone(
          menuItemData.updatedAt,
          restaurant.timeZone,
        ),
      });
      return menuItem;
    }
    return this.menuItemRepository.findById(id);
  }
}
