import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RestaurantEntity } from 'modules/restaurant/entity/restaurant.entity';
import { MenuEntity } from 'modules/menu/entity/menu.entity';
import { BaseEntity } from 'common/entity/base.entity';
import { TranslationEntity } from 'modules/translation/entity/translation.entity';
import { LanguageEntity } from 'modules/language/entity/language.entity';

@Entity('BranchRestaurant')
export class BranchEntity extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  country: string;

  @Column({ nullable: true })
  @IsString()
  phone: string;

  @Column({ nullable: true })
  @IsString()
  email: string;

  @Column({ nullable: false })
  @IsString()
  timeZone: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.branches)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;

  @Column({ name: 'restaurant_id', nullable: false })
  restaurantId: number;

  @OneToMany(() => MenuEntity, (menu) => menu.branch)
  menu: MenuEntity[];

  @OneToMany(() => TranslationEntity, (language) => language.branch)
  translations: TranslationEntity[];

  @OneToMany(()=> LanguageEntity, (language) => language.branch)
  languages: LanguageEntity[];

}
