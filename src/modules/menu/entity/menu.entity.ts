import { IsBoolean, IsDecimal, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { BranchEntity } from 'modules/branch-restaurant/entity/branch.entity';
import { MenuItemEntity } from 'modules/menu-item/entity/menu-item.entity';
import { RestaurantEntity } from 'modules/restaurant/entity/restaurant.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @Column({ name: 'restaurant_id' })
  restaurantId: number;

  @ManyToOne(() => BranchEntity, (branch) => branch.menu, {nullable: true})
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;
  

  @OneToMany(() => MenuItemEntity, (menu) => menu.menu)
  menuIds: MenuEntity[];
}
