import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tp_tyre_warranty_registration')
export class Warranty {
  @PrimaryGeneratedColumn()
  warranty_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  city_name: string;

  @Column({ type: 'varchar', length: 255 })
  dealer_name: string;

  @Column({ type: 'integer' })
  dealer_id: number;

  @Column({ type: 'varchar', length: 15 })
  dealer_mobile_number: string;

  @Column({ type: 'varchar', length: 100 })
  brand: string;

  @Column({ type: 'varchar', length: 50 })
  size: string;

  @Column({ type: 'varchar', length: 100 })
  item_pattern: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 100 })
  serial_number: string;

  @Column({ type: 'varchar', length: 50 })
  dot: string;

  @Column({ type: 'varchar', length: 255 })
  customer_name: string;

  @Column({ type: 'varchar', length: 15 })
  customer_mobile_number: string;

  @Column({ type: 'varchar', length: 255 })
  customer_email_id: string;

  @Column({ type: 'varchar', length: 50 })
  vehicle_number: string;

  @Column({ type: 'varchar', length: 100 })
  vehicle_name: string;

  @Column({ type: 'text' })
  vehicle_details: string;

  @Column({ type: 'varchar', length: 255 })
  bill_photo: string;

  @Column({ type: 'varchar', length: 250 })
  registration_copy: string;

  @Column({ type: 'varchar', length: 255 })
  customer_address_proof: string;

  @Column({ type: 'varchar', length: 10 })
  customer_area_pin_code: string;

  @Column({ type: 'varchar', length: 255 })
  dealer_rm_name: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'In Progress', 'Registered', 'Rejected'],
    default: 'Pending',
  })
  warranty_status: 'Pending' | 'In Progress' | 'Registered' | 'Rejected';

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;
}
