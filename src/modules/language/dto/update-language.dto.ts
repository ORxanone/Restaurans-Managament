import { PartialType } from '@nestjs/swagger';
import { CreateLanguageDto } from './create-language.dto';
import { IsNumber } from 'class-validator';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  @IsNumber()
  id: number;
}
