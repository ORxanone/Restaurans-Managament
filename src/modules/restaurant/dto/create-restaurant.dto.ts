import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Old Town',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Baku, Nizami street 216A',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Azerbaijan',
  })
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '+994554640473',
  })
  phone?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'recebovorxan3@gmail.com',
  })
  email?: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
  })
  isActive: boolean;
}
