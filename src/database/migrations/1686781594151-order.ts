import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Order1686781594151 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn("order", new TableColumn({
			name: "status",
			type: "varchar",
			isNullable: false,
		}))
		await queryRunner.addColumn("order", new TableColumn({
			name: "finished_at",
			type: "timestamp",
			isNullable: true,
		}))
		await queryRunner.addColumn("order", new TableColumn({
			name: "created_at",
			type: "timestamp",
			default: "now()",
		}))
		await queryRunner.addColumn("order", new TableColumn({
			name: "updated_at",
			type: "timestamp",
			default: "now()",
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("order", "status")
		await queryRunner.dropColumn("order", "created_at")
		await queryRunner.dropColumn("order", "updated_at")
	}

}
