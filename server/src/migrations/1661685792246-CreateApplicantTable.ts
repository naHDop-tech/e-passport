import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export class CreateApplicantTable1661685792246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'applicants',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
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
            type: 'timestamp without time zone',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'applicant_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['applicant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('applicants');
  }
}
