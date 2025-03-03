import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { MenuEntity } from 'modules/menu/entity/menu.entity';
import { TranslationEntity } from 'modules/translation/entity/translation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ManyToOne(() => MenuEntity, (menu) => menu.menuIds, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;

  @Column({ name: 'menu_id' , nullable: true })
  @IsNumber()
  menuId: number;

  @OneToMany(() => TranslationEntity, (language) => language.menuItem)
  translations: TranslationEntity[];
}
