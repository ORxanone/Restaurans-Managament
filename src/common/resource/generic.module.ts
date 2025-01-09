import { Global, Module } from "@nestjs/common";
import { Repository } from "typeorm";

import { EntityMapper } from "../utils/entity-mapper";
import { GenericRepository } from "./generic-repository";

@Global()
@Module({
  imports: [],
  providers: [GenericRepository, Repository, EntityMapper],
  exports: [GenericRepository, Repository],
})
export class GenericModule {}
