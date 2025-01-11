import { GenericService } from 'common/resource/generic-service';
import { LanguageEntity } from './entity/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { Injectable } from '@nestjs/common';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService extends GenericService<
  LanguageEntity,
  CreateLanguageDto,
  UpdateLanguageDto
> {
  constructor(
    protected readonly languageRepository: LanguageRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(languageRepository, entityMapper, LanguageEntity);
  }
}
