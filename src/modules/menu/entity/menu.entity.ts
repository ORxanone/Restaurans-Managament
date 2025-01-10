import { IsBoolean, IsDecimal, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { RestaurantEntity } from 'modules/restaurant/entity/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Menu')
export class MenuEntity extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.menus)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;
}
