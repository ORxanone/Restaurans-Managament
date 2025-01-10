import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './entity/branch.entity';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchRepository } from './branch.repository';
import { EntityMapper } from 'common/utils/entity-mapper';
import { RestaurantModule } from 'modules/restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity]), RestaurantModule],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository, EntityMapper],
  exports: [BranchService, BranchRepository],
})
export class BranchModule {}
