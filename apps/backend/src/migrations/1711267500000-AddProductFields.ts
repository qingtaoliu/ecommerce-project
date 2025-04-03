import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProductFields1711267500000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 添加新字段到产品表
        await queryRunner.addColumns('products', [
            new TableColumn({
                name: 'original_price',
                type: 'decimal',
                precision: 10,
                scale: 2,
                isNullable: true,
            }),
            new TableColumn({
                name: 'image_url',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'category',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'brief',
                type: 'text',
                isNullable: true,
            }),
            new TableColumn({
                name: 'rating',
                type: 'decimal',
                precision: 3,
                scale: 1,
                default: 0,
            }),
            new TableColumn({
                name: 'sales',
                type: 'int',
                default: 0,
            }),
            new TableColumn({
                name: 'specs',
                type: 'json',
                isNullable: true,
            }),
            new TableColumn({
                name: 'params',
                type: 'json',
                isNullable: true,
            }),
            new TableColumn({
                name: 'images',
                type: 'json',
                isNullable: true,
            }),
            new TableColumn({
                name: 'is_active',
                type: 'boolean',
                default: true,
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                onUpdate: 'CURRENT_TIMESTAMP',
            }),
        ]);

        // 重命名 category_id 列为 categoryId 以匹配实体类
        await queryRunner.renameColumn('products', 'category_id', 'categoryId');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 重命名回原来的列名
        await queryRunner.renameColumn('products', 'categoryId', 'category_id');

        // 删除添加的列
        await queryRunner.dropColumns('products', [
            'original_price',
            'image_url',
            'category',
            'brief',
            'rating',
            'sales',
            'specs',
            'params',
            'images',
            'is_active',
            'updated_at',
        ]);
    }
}
