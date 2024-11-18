import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePriceTable1731654628364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'price',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'chain',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'tokenName',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'tokenSymbol',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'tokenLogo',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                    },
                    {
                        name: 'timestamp',
                        type: 'timestamptz',
                        default: 'NOW()',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('price');
    }

}
