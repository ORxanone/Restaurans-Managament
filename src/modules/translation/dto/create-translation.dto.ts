import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @ApiProperty({
    example: 'Hello',
  })
  keyWord: string;

  @IsString()
  @ApiProperty({
    example: 'Hello',
  })
  value: string;

  @IsString()
  @ApiProperty({
    example: 'EN',
  })
  language: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  restaurantId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  branchId: number;
}
