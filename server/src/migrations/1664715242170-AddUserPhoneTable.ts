import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserPhoneTable1664715242170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_phones',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'country_code',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'integer',
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
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'user_phones',
      new TableIndex({
        name: 'IDX_USER_PHONES_NUMBER',
        columnNames: ['number'],
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'user_phones',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['phone_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_phones',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_phones',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableUsers = await queryRunner.getTable('users');
    const tableUserPhones = await queryRunner.getTable('user_phones');

    const foreignKeyUsers = tableUsers.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('phone_id') !== -1,
    );
    const foreignKeyUserPhones = tableUserPhones.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );

    await queryRunner.dropForeignKey('users', foreignKeyUsers);
    await queryRunner.dropForeignKey('user_phones', foreignKeyUserPhones);

    await queryRunner.dropColumn('users', 'phone_id');
    await queryRunner.dropColumn('user_phones', 'user_id');

    await queryRunner.dropTable('user_phones');

    await queryRunner.dropIndex('user_phones', 'IDX_USER_PHONES_NUMBER');
  }
}
