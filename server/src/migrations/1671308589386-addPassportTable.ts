import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class addPassportTable1671308589386 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'passports',
                columns: [
                    {
                        name: 'id',
                        type: 'UUID',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'identifier',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'u_number',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'p_number',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'nationality_code',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'issue_date',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'expiration_date',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'place_of_birth',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            }),
            true,
        )

        await queryRunner.createIndex(
            'passports',
            new TableIndex({
                name: 'IDX_PASSPORT_INDETIFIER',
                columnNames: ['identifier'],
            }),
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'passport_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'passports',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['passport_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'passports',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'passports',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tablePassports = await queryRunner.getTable('passports');
        const tableUsers = await queryRunner.getTable('users');

        const foreignKeyPassport = tablePassports.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('user_id') !== -1,
        );
        const foreignKeyUsers = tableUsers.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('passport_id') !== -1,
        );

        await queryRunner.dropForeignKey('passports', foreignKeyPassport);
        await queryRunner.dropForeignKey('users', foreignKeyUsers);

        await queryRunner.dropColumn('passports', 'user_id');
        await queryRunner.dropColumn('users', 'passport_id');

        await queryRunner.dropTable('passports');
        await queryRunner.dropIndex('passports', 'IDX_PASSPORT_INDETIFIER');
    }
}
