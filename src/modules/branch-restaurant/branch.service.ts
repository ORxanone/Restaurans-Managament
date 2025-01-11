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
    protected readonly restaurantRepository: BranchRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(branchRepository, entityMapper, BranchEntity);
  }

  async findAll(): Promise<BranchEntity[]> {
    const restData = await this.branchRepository.findAll();

    const chgTimeData = restData.map(async (item) => {
      const branch = new BranchEntity();
      const menuList = [...item.menu, ...item.restaurant.menus];
      Object.assign(branch, item, {
        createdAt: convertToTimeZone(item.createdAt, item.timeZone),
        updatedAt: convertToTimeZone(item.updatedAt, item.timeZone),
        menu: menuList,
      });

      delete branch.restaurant;
      return branch;
    });

    const result = await Promise.all(chgTimeData);
    return result;
  }

  async findById(id: number): Promise<BranchEntity> {
    const restDataId = await this.branchRepository.findId(id);
    console.log(restDataId);

    const branch = new BranchEntity();
    const menuList = [...restDataId.menu, ...restDataId.restaurant.menus];

    Object.assign(branch, restDataId, {
      createdAt: convertToTimeZone(restDataId.createdAt, restDataId.timeZone),
      updatedAt: convertToTimeZone(restDataId.updatedAt, restDataId.timeZone),
      menu: menuList,
    });
    delete branch.restaurant;
    return branch;
  }
}
