import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
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

    const foreignKey = new TableForeignKey({
      columnNames: ['applicant_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'applicant',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('users', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('applicants');
  }
}
