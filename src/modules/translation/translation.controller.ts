import { Controller } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { TranslationEntity } from './entity/translation.entity';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController extends GenericController<
  TranslationEntity,
  CreateTranslationDto,
  UpdateTranslationDto
> {
    constructor(private readonly translationService: TranslationService) {
        super(translationService);
    }
}
