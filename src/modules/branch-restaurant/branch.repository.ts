import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'common/resource/generic-repository';
import { BranchEntity } from './entity/branch.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BranchRepository extends GenericRepository<BranchEntity> {
  constructor(
    @InjectRepository(BranchEntity)
    protected readonly branchRepository: Repository<BranchEntity>,
  ) {
    super(branchRepository);
  }
}
