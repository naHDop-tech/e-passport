import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateUsersTable1661716955738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            default: 'uuid_generate_v4()',
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
            type: 'timestamp',
            default: 'now()',
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

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'applicants',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            default: 'uuid_generate_v4()',
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
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'applicants',
      new TableIndex({
        name: 'IDX_APPLICANT_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'applicant_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'applicants',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['applicant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'applicants',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'applicants',
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
    const tableApplicants = await queryRunner.getTable('applicants');

    const foreignKeyUsers = tableUsers.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('applicant_id') !== -1,
    );
    const foreignKeyApplicants = tableApplicants.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );

    await queryRunner.dropForeignKey('users', foreignKeyUsers);
    await queryRunner.dropForeignKey('applicants', foreignKeyApplicants);

    await queryRunner.dropColumn('users', 'applicant_id');
    await queryRunner.dropColumn('applicants', 'user_id');

    await queryRunner.dropTable('users');
    await queryRunner.dropTable('applicants');

    await queryRunner.dropIndex('users', 'IDX_USER_EMAIL');
    await queryRunner.dropIndex('applicants', 'IDX_APPLICANT_EMAIL');
  }
}
