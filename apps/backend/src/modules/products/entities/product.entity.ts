import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryId: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  brief: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  sales: number;

  @Column({ type: 'json', nullable: true })
  specs: Record<string, string[]>;

  @Column({ type: 'json', nullable: true })
  params: Record<string, string>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // 暂时注释掉 category 关系，解决循环依赖问题
  // @ManyToOne(() => Category, category => category.products)
  // @JoinColumn({ name: 'categoryId' })
  // category: Category;

  // 暂时注释掉 cartItems 和 orderItems 关系，解决循环依赖问题
  // @OneToMany(() => CartItem, item => item.product)
  // cartItems: CartItem[];

  // @OneToMany(() => OrderItem, item => item.product)
  // orderItems: OrderItem[];

  // @OneToMany(() => Review, review => review.product)
  // reviews: Review[];

  // @OneToMany(() => Favorite, favorite => favorite.product)
  // favorites: Favorite[];
}
