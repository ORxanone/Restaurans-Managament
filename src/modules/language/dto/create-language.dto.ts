import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @ApiProperty({
    example: 'en-US',
  })
  code: string;

  @IsString()
  @ApiProperty({
    example: 'AZ',
  })
  title: string;
}
