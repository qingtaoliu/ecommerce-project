import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Cart } from '../../orders/entities/cart.entity';
import { Order } from '../../orders/entities/order.entity';
import { ShippingAddress } from '../../orders/entities/shipping-address.entity';
import { Favorite } from '../../products/entities/favorite.entity';
// import { Review } from '../../products/entities/review.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status: UserStatus;

  @Column({ nullable: true })
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => ShippingAddress, address => address.user)
  shippingAddresses: ShippingAddress[];

  // @OneToMany(() => Review, review => review.user)
  // reviews: Review[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];
}
