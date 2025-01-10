import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBranch1736522929807 implements MigrationInterface {
  name = 'AddBranch1736522929807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE \`BranchRestaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`branchName\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`email\` varchar(255) NULL, \`timeZone\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`restaurant_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Menu\` ADD \`branch_id\` int NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE \`BranchRestaurant\` ADD CONSTRAINT \`FK_b10a680dfa3950d4d37997ffb26\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Menu\` ADD CONSTRAINT \`FK_bb6ccc715f3bdf6f26509bac9b9\` FOREIGN KEY (\`branch_id\`) REFERENCES \`BranchRestaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      if (!queryRunner.isTransactionActive) {
        await queryRunner.release();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(
        `ALTER TABLE \`Menu\` DROP FOREIGN KEY \`FK_bb6ccc715f3bdf6f26509bac9b9\``,
      );
      await queryRunner.query(
        `ALTER TABLE \`BranchRestaurant\` DROP FOREIGN KEY \`FK_b10a680dfa3950d4d37997ffb26\``,
      );
      await queryRunner.query(`ALTER TABLE \`Menu\` DROP COLUMN \`branch_id\``);
      await queryRunner.query(`DROP TABLE \`BranchRestaurant\``);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
