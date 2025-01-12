import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Pizza',
  })
  title: string;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({
    example: 19.34,
  })
  price: number;

  @IsString()
  @ApiProperty({
    example: '',
  })
  ingredients: string;

  @IsString()
  @ApiProperty({
    example: 'Delicious cheese pizza',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  menuId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  branchId: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive: boolean;

  @IsString()
  @ApiProperty({
    example: ['en, az'],
  })
  translations: { language: string; keyWord: string; value: string }[];
}
