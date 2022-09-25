import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateImageTable1664114358865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_photos',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'filename',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'mimetype',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'encoding',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
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
      'user_photos',
      new TableIndex({
        name: 'IDX_USER_PHOTOS_FILENAME',
        columnNames: ['filename'],
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'photo_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'user_photos',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['photo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_photos',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_photos',
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
    const tableUserPhotos = await queryRunner.getTable('user_photos');

    const foreignKeyUsers = tableUsers.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('photo_id') !== -1,
    );
    const foreignKeyUserPhotos = tableUserPhotos.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );

    await queryRunner.dropForeignKey('users', foreignKeyUsers);
    await queryRunner.dropForeignKey('user_photos', foreignKeyUserPhotos);

    await queryRunner.dropColumn('users', 'photo_id');
    await queryRunner.dropColumn('user_photos', 'user_id');

    await queryRunner.dropTable('user_photos');

    await queryRunner.dropIndex('user_photos', 'IDX_USER_PHOTOS_FILENAME');
  }
}
