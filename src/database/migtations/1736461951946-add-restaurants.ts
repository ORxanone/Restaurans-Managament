import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRestaurants1736461951946 implements MigrationInterface {
  name = 'AddRestaurants1736461951946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE \`Restaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      await queryRunner.query(`DROP TABLE \`Restaurant\``);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
