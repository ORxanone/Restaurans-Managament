import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Breakfast',
  })
  title: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  restaurantId: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive: boolean;
}
