import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum ShipmentStatus {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column({ unique: true, nullable: true })
  tracking_number: string;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.PROCESSING
  })
  status: ShipmentStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Order, order => order.shipment)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
