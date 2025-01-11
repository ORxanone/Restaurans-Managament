import { IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { TranslationEntity } from 'modules/translation/entity/translation.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
}
