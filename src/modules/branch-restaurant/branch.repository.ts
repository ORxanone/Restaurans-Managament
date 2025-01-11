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

  public async findAll() {
    return this.branchRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.restaurant', 'restaurant')
      .leftJoinAndSelect('restaurant.menus', 'menu')
      .leftJoinAndSelect('branch.menu', 'branchMenu')
      .select(['branch', 'branchMenu', 'restaurant.title', 'menu'])
      .getMany();
  }

  public async findId(id: number) {
    return this.branchRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.restaurant', 'restaurant')
      .leftJoinAndSelect('restaurant.menus', 'menu')
      .leftJoinAndSelect('branch.menu', 'branchMenu')
      .select(['branch', 'branchMenu', 'restaurant.title', 'menu'])
      .where('branch.id = :id', { id })
      .getOne();
  }
}
