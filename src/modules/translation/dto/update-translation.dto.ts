import { PartialType } from '@nestjs/swagger';
import { CreateTranslationDto } from './create-translation.dto';
import { IsNumber } from 'class-validator';

export class UpdateTranslationDto extends PartialType(CreateTranslationDto) {
  @IsNumber()
  id: number;
}
