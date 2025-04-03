import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'ecommerce',
  autoLoadEntities: true,
  // 警告：在开发环境启用自动同步会重建数据库表结构，可能导致数据丢失
  // 生产环境应该使用迁移而不是自动同步
  synchronize: process.env.NODE_ENV !== 'production',
}));
