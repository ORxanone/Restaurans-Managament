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

  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  languageId: number;
}
