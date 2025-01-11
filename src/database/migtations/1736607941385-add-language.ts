import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLanguage1736607941385 implements MigrationInterface {
  name = 'AddLanguage1736607941385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE \`Language\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`code\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `CREATE TABLE \`Translation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`keyWord\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`languageId\` int NOT NULL, \`language_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Translation\` ADD CONSTRAINT \`FK_4a1e99d967641ca71fe59f827e2\` FOREIGN KEY (\`language_id\`) REFERENCES \`Language\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
        `ALTER TABLE \`Translation\` DROP FOREIGN KEY \`FK_4a1e99d967641ca71fe59f827e2\``,
      );
      await queryRunner.query(`DROP TABLE \`Translation\``);
      await queryRunner.query(`DROP TABLE \`Language\``);

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
}
