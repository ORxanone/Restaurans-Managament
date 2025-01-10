import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsNotEmpty, IsString } from 'class-validator';

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
    example: '19.34',
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

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive: boolean;
}
