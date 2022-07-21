import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1658408299857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
          },
          {
            name: 'first_name',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'country_resident',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'is_verified',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'VARCHAR',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
