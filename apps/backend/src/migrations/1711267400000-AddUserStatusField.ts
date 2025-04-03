import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserStatusField1711267400000 implements MigrationInterface {
    name = 'AddUserStatusField1711267400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
    }
}
