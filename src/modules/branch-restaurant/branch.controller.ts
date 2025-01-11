import { Controller, Get, Post } from '@nestjs/common';
import { GenericController } from 'common/resource/generic-controller';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { BranchEntity } from './entity/branch.entity';
import { BranchService } from './branch.service';

@Controller({
  path: 'branches',
})
export class BranchController extends GenericController<
  BranchEntity,
  CreateBranchDto,
  UpdateBranchDto
> {
  constructor(private readonly branchService: BranchService) {
    super(branchService);
  }


  @Get()
  async findAll(): Promise<BranchEntity[]> {
    return this.branchService.findAll();
  }

  @Get(':id')
  async findById(id: number): Promise<BranchEntity> {
    return this.branchService.findById(id);
  }
}
