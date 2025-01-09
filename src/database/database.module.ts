import { Module } from "@nestjs/common";

import { databaseProviders } from "./database.provaider";

@Module({
  exports: [...databaseProviders],
  imports: [...databaseProviders],
})
export class DatabaseModule {}
