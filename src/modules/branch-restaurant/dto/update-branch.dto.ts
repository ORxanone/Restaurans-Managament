import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateBranchDto } from './create-branch.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsNumber()
  id: number;
}
