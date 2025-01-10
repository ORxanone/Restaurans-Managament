import { IsBoolean, IsDecimal, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { MenuEntity } from 'modules/menu/entity/menu.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('MenuItem')
export class MenuItemEntity extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column('decimal', { precision: 6, scale: 2 })
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  price: string;

  @Column()
  @IsString()
  ingredients: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsBoolean()
  isActive: boolean;

  @ManyToOne(() => MenuEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;
}
