import { PartialType } from '@nestjs/swagger';
import { CreateMenuItemDto } from './create-menu-item.dto';
import { IsNumber } from 'class-validator';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  @IsNumber()
  id: number;
}
