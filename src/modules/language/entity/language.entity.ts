import { IsArray, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { BranchEntity } from 'modules/branch-restaurant/entity/branch.entity';
import { RestaurantEntity } from 'modules/restaurant/entity/restaurant.entity';
import { TranslationEntity } from 'modules/translation/entity/translation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('Language')
export class LanguageEntity extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column({ length: '10' })
  @IsString()
  code: string;

  @OneToMany(() => TranslationEntity, (translation) => translation.language)
  translations: TranslationEntity[];

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.languages)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;

  @Column({ name: 'restaurant_id' })
  restaurantId: number;

  @ManyToOne(() => BranchEntity, (branch) => branch.translations)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({ name: 'branch_id' , nullable: true})
  branchId: number;
}
