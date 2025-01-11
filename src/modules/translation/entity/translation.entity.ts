import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { LanguageEntity } from 'modules/language/entity/language.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Translation')
export class TranslationEntity extends BaseEntity {
  @Column()
  @IsString()
  keyWord: string;

  @Column()
  @IsString()
  value: string;

  
  @ManyToOne(() => LanguageEntity, (language) => language.translations)
  @JoinColumn({ name: 'language_id' })
  language: LanguageEntity;
  
  @Column({ name: 'language_id' })
  languageId: number;
}
