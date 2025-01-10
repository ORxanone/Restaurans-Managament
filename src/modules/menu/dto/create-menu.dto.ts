import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Breakfast',
  })
  title: string;


  @IsBoolean()
  @ApiProperty({
    example: true
  })
  isActive: boolean;
}
