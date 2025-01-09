import { NotFoundException } from "@nestjs/common";

import { BaseEntity } from "../entity/base.entity";
import { EntityMapper } from "../utils/entity-mapper";
import { GenericRepository } from "./generic-repository";

export abstract class GenericService<
  T extends BaseEntity,
  CreateDto,
  UpdateDto,
> {
  protected constructor(
    protected readonly repository: GenericRepository<T>,
    private readonly mapper: EntityMapper,
    private readonly entity: new () => T,
  ) {}

  public async save(createDto: CreateDto): Promise<T> {
    return this.repository.save(this.mapper.toEntity(createDto, this.entity));
  }

  public async findById(id: number): Promise<null | T> {
    return this.repository.findById(id);
  }

  public async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  public async findOne(options: any): Promise<null | T> {
    return this.repository.findOne(options);
  }

  public async find(options: any): Promise<T[]> {
    return this.repository.find(options);
  }

  public async updateById(id: number, updateDto: UpdateDto): Promise<T> {
    const entity = this.mapper.toPartialEntity(updateDto, this.entity);
    const updateResult = await this.repository.updateById(id, entity);

    if (!updateResult) {
      throw new NotFoundException("Entity not found");
    }

    return updateResult;
  }

  public async deleteById(id: number): Promise<T> {
    const entity = await this.repository.deleteById(id);

    if (!entity) {
      throw new NotFoundException("Entity not found");
    }

    return entity;
  }

  public async count(): Promise<number> {
    return this.repository.count();
  }

  // async changePosition(fromId: number, toId: number) {
  //   const from: any = await this.findById(fromId);
  //   const to: any = await this.findById(toId);

  //   if (!from || !to) {
  //     throw new NotFoundException("One or both entities not found");
  //   }

  //   const tempPosition = from.position;
  //   from.position = to.position;
  //   to.position = tempPosition;

  //   await this.repository.updateById(fromId, from);

  //   await this.repository.updateById(toId, to);
  // }
}
