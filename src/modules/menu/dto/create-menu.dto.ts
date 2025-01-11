import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { time } from 'console';

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

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
  })
  branchId: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isActive: boolean;
}
