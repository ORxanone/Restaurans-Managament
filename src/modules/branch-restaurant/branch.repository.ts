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
      .leftJoinAndSelect('branch.languages', 'language')
      .leftJoinAndSelect('branch.translations', 'translation')
      .select(['branch', 'branchMenu', 'restaurant.title', 'menu', 'language', 'translation'])
      .getMany();
  }

  public async findId(id: number) {
    return this.branchRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.restaurant', 'restaurant')
      .leftJoinAndSelect('restaurant.menus', 'menu', "menu.branchId = :id", { id })
      .leftJoinAndSelect('branch.menu', 'branchMenu',)
      .leftJoinAndSelect('branch.languages', 'language', "language.branchId = :id", { id })
      .leftJoinAndSelect('branch.translations', 'translation', "translation.branch_id = :id", { id })
      .select(['branch', 'branchMenu', 'restaurant.title', 'menu', 'language', 'translation'])
      .where('branch.id = :id', { id })
      .getOne();
  }
}
