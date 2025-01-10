import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { BranchEntity } from './entity/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { BranchRepository } from './branch.repository';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';

@Injectable()
export class BranchService extends GenericService<
  BranchEntity,
  CreateBranchDto,
  UpdateBranchDto
> {
  constructor(
    protected readonly branchRepository: BranchRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(branchRepository, entityMapper, BranchEntity);
  }

  async findAll(): Promise<BranchEntity[]> {
    const restData = await this.branchRepository.find({
      relations: ['menu'],
    });
    const chgTimeData = restData.map((item) => {
      const restaurant = new BranchEntity();
      Object.assign(restaurant, item, {
        createdAt: convertToTimeZone(item.createdAt, item.timeZone),
        updatedAt: convertToTimeZone(item.updatedAt, item.timeZone),
      });
      return restaurant;
    });
    return chgTimeData;
  }

  async findById(id: number): Promise<BranchEntity> {
    const restDataId = await this.branchRepository.findOne({
      where: { id },
      relations: ['menu'],
    });
    const restaurant = new BranchEntity();
    Object.assign(restaurant, restDataId, {
      createdAt: convertToTimeZone(restDataId.createdAt, restDataId.timeZone),
      updatedAt: convertToTimeZone(restDataId.updatedAt, restDataId.timeZone),
    });
    return restaurant;
  }
}
