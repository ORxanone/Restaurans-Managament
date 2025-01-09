import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Restaurant')
export class RestaurantEntity extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  country: string;

  @Column({ nullable: true })
  @IsString()
  phone: string;

  @Column({ nullable: true })
  @IsString()
  email: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;
}
