import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from '../entity/base.entity';

@Injectable()
export class EntityMapper {
  public toEntity<T extends BaseEntity, Dto>(dto: Dto, entity: new () => T): T {
    const instance = new entity();
    Object.assign(instance, dto);
    return instance;
  }

  // return type should be QueryDeepPartialEntity<T>
  public toPartialEntity<T extends BaseEntity, Dto>(
    dto: Dto,
    entity: new () => T,
  ): QueryDeepPartialEntity<T> {
    const instance = new entity();
    Object.assign(instance, dto);
    return instance as QueryDeepPartialEntity<T>;
  }

  public toDto<T extends BaseEntity, Dto>(
    entity: T,
    dtoClass: new () => Dto,
  ): Dto {
    const dto = new dtoClass();
    Object.assign(dto, entity);
    return dto;
  }
}
