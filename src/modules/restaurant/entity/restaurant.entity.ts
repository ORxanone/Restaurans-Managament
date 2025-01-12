import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { BranchEntity } from 'modules/branch-restaurant/entity/branch.entity';
import { LanguageEntity } from 'modules/language/entity/language.entity';
import { MenuEntity } from 'modules/menu/entity/menu.entity';
import { TranslationEntity } from 'modules/translation/entity/translation.entity';
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

  @Column({ nullable: false })
  @IsString()
  timeZone: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @OneToMany(() => MenuEntity, (menu) => menu.restaurant)
  menus: MenuEntity[];

  @OneToMany(() => BranchEntity, (branch) => branch.restaurant)
  branches: BranchEntity[];

  @OneToMany(() => TranslationEntity, (language) => language.restaurant)
  translations: TranslationEntity[];

  @OneToMany(() => LanguageEntity, (language) => language.restaurant)
  languages: LanguageEntity[];
}
