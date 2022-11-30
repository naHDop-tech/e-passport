import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserAddressTable1664828469305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_addresses',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'country',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'line1',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'line2',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'zip',
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
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'user_addresses',
      new TableIndex({
        name: 'IDX_USER_ADDRESS_CITY',
        columnNames: ['city'],
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'user_addresses',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_addresses',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_addresses',
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
    const tableUserAddresses = await queryRunner.getTable('user_addresses');

    const foreignKeyUsers = tableUsers.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('address_id') !== -1,
    );
    const foreignKeyUserAddresses = tableUserAddresses.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );

    await queryRunner.dropForeignKey('users', foreignKeyUsers);
    await queryRunner.dropForeignKey('user_addresses', foreignKeyUserAddresses);

    await queryRunner.dropColumn('users', 'address_id');
    await queryRunner.dropColumn('user_addresses', 'user_id');

    await queryRunner.dropTable('user_addresses');

    await queryRunner.dropIndex('user_addresses', 'IDX_USER_ADDRESS_CITY');
  }
}
