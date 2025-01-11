import { Controller } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { LanguageEntity } from './entity/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageService } from './language.service';

@Controller({
  path: 'language',
})
export class LanguageController extends GenericController<
  LanguageEntity,
  CreateLanguageDto,
  UpdateLanguageDto
> {
  constructor(private readonly languageService: LanguageService) {
    super(languageService);
  }
}
