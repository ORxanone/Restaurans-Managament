import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { TranslationEntity } from './entity/translation.entity';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityMapper } from 'common/utils/entity-mapper';
import { TranslateRepository } from './translation.repository';

@Injectable()
export class TranslationService extends GenericService<
  TranslationEntity,
  CreateTranslationDto,
  UpdateTranslationDto
> {
  constructor(
    protected readonly translationRepository: TranslateRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(translationRepository, entityMapper, TranslationEntity);
  }
}
