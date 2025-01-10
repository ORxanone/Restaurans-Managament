import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMenuAndMenuItems1736472263208 implements MigrationInterface {
  name = 'AddMenuAndMenuItems1736472263208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE \`Menu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`restaurant_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `CREATE TABLE \`MenuItem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`price\` decimal(6,2) NOT NULL, \`ingredients\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`menu_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Restaurant\` CHANGE \`phone\` \`phone\` varchar(255) NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Restaurant\` CHANGE \`email\` \`email\` varchar(255) NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Menu\` ADD CONSTRAINT \`FK_2c660f6887b28800637bd82ea55\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`Restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
      await queryRunner.query(
        `ALTER TABLE \`MenuItem\` ADD CONSTRAINT \`FK_3fbc47c47f4a7a910e4c0a28b47\` FOREIGN KEY (\`menu_id\`) REFERENCES \`Menu\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
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
        `ALTER TABLE \`MenuItem\` DROP FOREIGN KEY \`FK_3fbc47c47f4a7a910e4c0a28b47\``,
      );
      await queryRunner.query(
        `ALTER TABLE \`Menu\` DROP FOREIGN KEY \`FK_2c660f6887b28800637bd82ea55\``,
      );
      await queryRunner.query(
        `ALTER TABLE \`Restaurant\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE \`Restaurant\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`,
      );
      await queryRunner.query(`DROP TABLE \`MenuItem\``);
      await queryRunner.query(`DROP TABLE \`Menu\``);
      await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
  }
}
