import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { BranchEntity } from 'modules/branch-restaurant/entity/branch.entity';
import { LanguageEntity } from 'modules/language/entity/language.entity';
import { MenuItemEntity } from 'modules/menu-item/entity/menu-item.entity';
import { RestaurantEntity } from 'modules/restaurant/entity/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Translation')
export class TranslationEntity extends BaseEntity {
  @Column()
  @IsString()
  keyWord: string;

  @Column()
  @IsString()
  value: string;

  // @ManyToOne(() => LanguageEntity, (language) => language.translations)
  // @JoinColumn({ name: 'language_id' })
  // language: LanguageEntity;

  // @Column({ name: 'language_id' })
  // languageId: number;

  @Column()
  @IsString()
  language: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.translations)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;

  @Column({ name: 'restaurant_id' })
  restaurantId: number;

  @ManyToOne(() => BranchEntity, (branch) => branch.translations)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @ManyToOne(() => MenuItemEntity, (menuItem) => menuItem.translations)
  @JoinColumn({ name: 'menu_item_id' })
  menuItem: MenuItemEntity;

  @Column({ name: 'menu_item_id' })
  menuItemId: number;
}
