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
                        name: 'mrz_l1',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'mrz_l2',
                        type: 'VARCHAR',
                        isNullable: false,
                    },
                    {
                        name: 'issuing_organization',
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
                        name: 'country_code',
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

        await queryRunner.createTable(
            new Table({
                name: 'fingerprints',
                columns: [
                    {
                        name: 'id',
                        type: 'UUID',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'public_key',
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
                name: 'IDX_PASSPORT_MRZ1',
                columnNames: ['mrz_l1'],
            }),
        );

        await queryRunner.createIndex(
            'passports',
            new TableIndex({
                name: 'IDX_PASSPORT_MRZ2',
                columnNames: ['mrz_l2'],
            }),
        );

        await queryRunner.createIndex(
            'fingerprints',
            new TableIndex({
                name: 'IDX_FINGERPRINT_PUBLIC_KEY',
                columnNames: ['public_key'],
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

        await queryRunner.addColumn(
            'passports',
            new TableColumn({
                name: 'fingerprint_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'fingerprints',
            new TableColumn({
                name: 'passport_id',
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

        await queryRunner.createForeignKey(
            'passports',
            new TableForeignKey({
                columnNames: ['fingerprint_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'fingerprints',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'fingerprints',
            new TableForeignKey({
                columnNames: ['passport_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'passports',
                onDelete: 'CASCADE',
            }),
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableFingerprints = await queryRunner.getTable('fingerprints');
        const tablePassports = await queryRunner.getTable('passports');
        const tableUsers = await queryRunner.getTable('users');

        const foreignKeyUserPassport = tablePassports.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('user_id') !== -1,
        );
        const foreignKeyFingerprintPassport = tablePassports.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('fingerprint_id') !== -1,
        );
        const foreignKeyPassportUsers = tableUsers.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('passport_id') !== -1,
        );
        const foreignKeyPassportFingerprint = tableFingerprints.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('passport_id') !== -1,
        );

        await queryRunner.dropForeignKey('passports', foreignKeyUserPassport);
        await queryRunner.dropForeignKey('passports', foreignKeyFingerprintPassport);
        await queryRunner.dropForeignKey('users', foreignKeyPassportUsers);
        await queryRunner.dropForeignKey('fingerprints', foreignKeyPassportFingerprint);

        await queryRunner.dropColumn('passports', 'user_id');
        await queryRunner.dropColumn('passports', 'fingerprint_id');
        await queryRunner.dropColumn('users', 'passport_id');
        await queryRunner.dropColumn('fingerprints', 'passport_id');

        await queryRunner.dropTable('passports');
        await queryRunner.dropTable('fingerprints');
        await queryRunner.dropIndex('passports', 'IDX_PASSPORT_MRZ1');
        await queryRunner.dropIndex('passports', 'IDX_PASSPORT_MRZ2');
        await queryRunner.dropIndex('fingerprints', 'IDX_FINGERPRINT_PUBLIC_KEY');
    }
}
