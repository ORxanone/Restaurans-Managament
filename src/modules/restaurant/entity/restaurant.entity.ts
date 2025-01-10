import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { MenuEntity } from 'modules/menu/entity/menu.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('Restaurant')
export class RestaurantEntity extends BaseEntity {
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

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @OneToMany(() => MenuEntity, (menu) => menu.restaurant)
  menus: MenuEntity[];
}
