import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { Product } from './modules/products/entities/product.entity';
import { Category } from './modules/categories/entities/category.entity';
import { Order } from './modules/orders/entities/order.entity';
import { OrderItem } from './modules/orders/entities/order-item.entity';
import { Cart } from './modules/orders/entities/cart.entity';
import { CartItem } from './modules/orders/entities/cart-item.entity';
import { Review } from './modules/products/entities/review.entity';
import { Favorite } from './modules/products/entities/favorite.entity';
import { ShippingAddress } from './modules/orders/entities/shipping-address.entity';
import { Shipment } from './modules/orders/entities/shipment.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'ecommerce',
  entities: [
    User,
    Product,
    Category,
    Order,
    OrderItem,
    Cart,
    CartItem,
    Review,
    Favorite,
    ShippingAddress,
    Shipment,
  ],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
