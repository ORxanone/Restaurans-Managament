import {
  Body,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { BaseEntity } from "../entity/base.entity";
import { GenericService } from "./generic-service";

@Injectable()
export class GenericController<T extends BaseEntity, CreateDto, UpdateDto> {
  protected constructor(
    protected readonly service: GenericService<T, CreateDto, UpdateDto>,
  ) {}

  @Get()
  public async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Post()
  public async create(@Body() createDto: CreateDto): Promise<T> {
    // console.log("createDto: ", createDto)
    return this.service.save(createDto);
  }

  @Get(":id")
  public async findById(
    @Param("id")
    id: number,
  ): Promise<null | T> {
    return this.service.findById(id);
  }

  @Delete(":id")
  public async delete(
    @Param("id")
    id: number,
  ): Promise<T> {
    return this.service.deleteById(id);
  }

  @Patch(":id")
  public async update(
    @Param("id")
    id: number,
    @Body()
    entity: UpdateDto,
  ): Promise<T> {
    return this.service.updateById(id, entity);
  }

}
