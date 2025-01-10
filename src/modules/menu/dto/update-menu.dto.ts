import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { IsNumber } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsNumber()
  id: number;
}
