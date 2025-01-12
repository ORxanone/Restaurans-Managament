import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from './entity/translation.entity';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { TranslateRepository } from './translation.repository';
import { EntityMapper } from 'common/utils/entity-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationEntity])],
  controllers: [TranslationController],
  providers: [TranslationService, TranslateRepository, EntityMapper],
  exports: [TranslationService, TranslateRepository],
})
export class TranslationModule {}
