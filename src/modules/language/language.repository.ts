import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'common/resource/generic-repository';
import { Repository } from 'typeorm';
import { LanguageEntity } from './entity/language.entity';

@Injectable()
export class LanguageRepository extends GenericRepository<LanguageEntity> {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepo: Repository<LanguageEntity>,
  ) {
    super(languageRepo);
  }
}
