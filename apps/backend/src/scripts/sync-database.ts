import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Cart } from '../modules/orders/entities/cart.entity';
import { CartItem } from '../modules/orders/entities/cart-item.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get<DataSource>(getDataSourceToken());

  try {
    console.log('开始同步数据库...');
    
    // 检查表是否存在
    const checkTableExists = async (tableName: string) => {
      try {
        const result = await dataSource.query(`
          SHOW TABLES LIKE '${tableName}'
        `);
        return result.length > 0;
      } catch (error) {
        console.error(`检查表 ${tableName} 是否存在时出错:`, error);
        return false;
      }
    };
    
    // 描述表结构
    const describeTable = async (tableName: string) => {
      try {
        const result = await dataSource.query(`DESCRIBE ${tableName}`);
        return result;
      } catch (error) {
        console.error(`描述表 ${tableName} 结构时出错:`, error);
        return [];
      }
    };
    
    // 检查 carts 表
    const cartsExists = await checkTableExists('carts');
    
    if (cartsExists) {
      console.log('carts 表已存在，检查表结构...');
      const tableStructure = await describeTable('carts');
      console.log('carts 表结构:', tableStructure);
      
      // 检查必要的列是否存在
      const columnNames = tableStructure.map(col => col.Field);
      
      // 检查是否有必要的列
      const requiredColumns = ['id', 'userId', 'isCheckedOut', 'created_at', 'updated_at'];
      const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
      
      if (missingColumns.length > 0) {
        console.log('缺少的列:', missingColumns);
        
        // 添加缺失的列
        for (const column of missingColumns) {
          try {
            if (column === 'id') {
              await dataSource.query(`
                ALTER TABLE carts 
                ADD COLUMN id varchar(36) NOT NULL,
                ADD PRIMARY KEY (id)
              `);
            } else if (column === 'userId') {
              await dataSource.query(`
                ALTER TABLE carts 
                ADD COLUMN userId varchar(255) NOT NULL
              `);
            } else if (column === 'isCheckedOut') {
              await dataSource.query(`
                ALTER TABLE carts 
                ADD COLUMN isCheckedOut tinyint NOT NULL DEFAULT 0
              `);
            } else if (column === 'created_at') {
              await dataSource.query(`
                ALTER TABLE carts 
                ADD COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
              `);
            } else if (column === 'updated_at') {
              await dataSource.query(`
                ALTER TABLE carts 
                ADD COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
              `);
            }
            console.log(`已添加列 ${column}`);
          } catch (error) {
            console.error(`添加列 ${column} 时出错:`, error);
          }
        }
      } else {
        console.log('carts 表结构完整');
      }
    } else {
      console.log('carts 表不存在，正在创建...');
      
      // 创建 carts 表
      await dataSource.query(`
        CREATE TABLE carts (
          id varchar(36) NOT NULL,
          userId varchar(255) NOT NULL,
          isCheckedOut tinyint NOT NULL DEFAULT 0,
          created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      `);
      console.log('carts 表创建成功');
    }
    
    // 检查 cart_items 表
    const cartItemsExists = await checkTableExists('cart_items');
    
    if (cartItemsExists) {
      console.log('cart_items 表已存在，检查表结构...');
      const tableStructure = await describeTable('cart_items');
      console.log('cart_items 表结构:', tableStructure);
      
      // 检查必要的列是否存在
      const columnNames = tableStructure.map(col => col.Field);
      
      // 检查是否有必要的列
      const requiredColumns = ['id', 'cartId', 'productId', 'quantity', 'price', 'created_at', 'updated_at'];
      const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
      
      if (missingColumns.length > 0) {
        console.log('缺少的列:', missingColumns);
        
        // 添加缺失的列
        for (const column of missingColumns) {
          try {
            if (column === 'id') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN id varchar(36) NOT NULL,
                ADD PRIMARY KEY (id)
              `);
            } else if (column === 'cartId') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN cartId varchar(36) NOT NULL,
                ADD KEY FK_cart_items_cart (cartId),
                ADD CONSTRAINT FK_cart_items_cart FOREIGN KEY (cartId) REFERENCES carts (id) ON DELETE CASCADE
              `);
            } else if (column === 'productId') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN productId varchar(36) NOT NULL
              `);
            } else if (column === 'quantity') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN quantity int NOT NULL
              `);
            } else if (column === 'price') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN price varchar(255) NOT NULL
              `);
            } else if (column === 'created_at') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
              `);
            } else if (column === 'updated_at') {
              await dataSource.query(`
                ALTER TABLE cart_items 
                ADD COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
              `);
            }
            console.log(`已添加列 ${column}`);
          } catch (error) {
            console.error(`添加列 ${column} 时出错:`, error);
          }
        }
      } else {
        console.log('cart_items 表结构完整');
      }
    } else {
      console.log('cart_items 表不存在，正在创建...');
      
      // 创建 cart_items 表
      await dataSource.query(`
        CREATE TABLE cart_items (
          id varchar(36) NOT NULL,
          cartId varchar(36) NOT NULL,
          productId varchar(36) NOT NULL,
          quantity int NOT NULL,
          price varchar(255) NOT NULL,
          created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          KEY FK_cart_items_cart (cartId),
          CONSTRAINT FK_cart_items_cart FOREIGN KEY (cartId) REFERENCES carts (id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      `);
      console.log('cart_items 表创建成功');
    }
    
    console.log('数据库同步完成！');
  } catch (error) {
    console.error('数据库同步失败:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
