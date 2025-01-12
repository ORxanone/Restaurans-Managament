import { Injectable } from '@nestjs/common';
import { GenericService } from 'common/resource/generic-service';
import { BranchEntity } from './entity/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { EntityMapper } from 'common/utils/entity-mapper';
import { BranchRepository } from './branch.repository';
import { convertToTimeZone } from 'common/utils/conertToTimeZone';
import { In } from 'typeorm';
import { LanguageRepository } from 'modules/language/language.repository';

@Injectable()
export class BranchService extends GenericService<
  BranchEntity,
  CreateBranchDto,
  UpdateBranchDto
> {
  constructor(
    protected readonly branchRepository: BranchRepository,
    protected readonly languageRepository: LanguageRepository,
    protected readonly entityMapper: EntityMapper,
  ) {
    super(branchRepository, entityMapper, BranchEntity);
  }

  // async createBranch(createBranch: CreateBranchDto): Promise<BranchEntity> {
  //   // const languages = await this.languageRepository.find({
  //   //   where: {
  //   //     id: In(createBranch.supportedLanguages),
  //   //     restaurantId: createBranch.restaurantId,
  //   //   },
  //   // });

  //   // if (!languages || languages.length === 0) {
  //   //   throw new Error('Languages not found');
  //   // }
  //   // const saveDto = {
  //   //   ...createBranch,
  //   //   languages,
  //   // };
  //   const restaurant = await this.branchRepository.save(
  //     this.entityMapper.toEntity(createBranch, BranchEntity),
  //   );
  //   return restaurant;
  // }

  async findAll(): Promise<BranchEntity[]> {
    const restData = await this.branchRepository.findAll();
    // const menuItems = await this.branchRepository.getBranchMenuItems();
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
    console.log(restDataId.restaurant.menus);

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

  async getBranchMenuItems(): Promise<BranchEntity[]> {
    throw new Error('Method not implemented.');
    // return this.branchRepository.getBranchMenuItems();
  }
}
