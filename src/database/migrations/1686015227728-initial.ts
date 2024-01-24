/* v8 ignore start */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getIntId } from '../utils/migration';

export class Initial1686015227728 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "client",
			columns: [
				getIntId(),
				{
					name: "document",
					type: "varchar",
					length: "11",
					isNullable: true
				},
				{
					name: "name",
					type: "varchar",
					length: "45",
					isNullable: true
				},
				{
					name: "email",
					type: "varchar",
					length: "100",
					isNullable: true
				},
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('client');
	}
}

/* v8 ignore stop */