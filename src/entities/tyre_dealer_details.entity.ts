import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tp_tyre_dealer_details')
export class TpTyreDealerDetail {
  @PrimaryGeneratedColumn({ type: 'integer' })
  dealer_detail_id: number;

  @Column({ type: 'integer', nullable: false })
  dealer_id: number;

  @Column({ type: 'integer', nullable: true })
  client_id: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'External Dealer ID or Retailer Anchor ID' })
  retailer_anchor_id: string | null;

  @Column({ type: 'varchar', length: 255, nullable: false })
  dealer_name: string;

  @Column({ type: 'text', nullable: false })
  dealer_types: string;

  @Column({ type: 'text', nullable: false })
  dealer_other_types: string;

  @Column({ type: 'text', nullable: false })
  dealer_outlet_types: string;

  @Column({ type: 'text', nullable: false })
  vehicle_types: string;

  @Column({ type: 'text', nullable: false })
  popular_brands: string;

  @Column({ type: 'text', nullable: false })
  brand_outlet_names: string;

  @Column({ type: 'text', nullable: false })
  dealer_other_services: string;

  @Column({ type: 'text', nullable: false })
  dealer_current_status: string;

  @Column({ type: 'integer', default: 0 })
  average_monthly_sales: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  contact_person_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  contact_person_phone: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  contact_person_phone_alternate: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  contact_person_email: string;

  @Column({ type: 'integer', nullable: false })
  city_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  locality: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'integer', nullable: false })
  pincode: number;

  @Column({ type: 'integer', default: 0 })
  is_exclusive_brand_dealer: number;

  @Column({ type: 'text', nullable: false })
  gmb_link: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  bitly_link: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  gstin: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  gst_certificate: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  pan_number: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  pan_card: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cancelled_cheque: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  working_days: string;

  @Column({ type: 'time', nullable: false, comment: 'Example: 10:00' })
  work_time_from: string;

  @Column({ type: 'time', nullable: false })
  work_time_till: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  services_offered: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  number_of_employees: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  payment_modes: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  hear_about_us: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  hear_about_us_others: string;

  @Column({ type: 'boolean', nullable: false })
  balancing_machine: boolean;

  @Column({ type: 'varchar', length: 100, nullable: false })
  alignment_machine: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  ecommerce: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  brand_store_code: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  brand_virtual_number: string;

  @Column({ type: 'integer', nullable: true })
  industry_id: number | null;

  @Column({ type: 'integer', default: 0 })
  lead_package_enabled: boolean;

  @Column({ type: 'integer', default: 0 })
  day_max_lead_count: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  unverified_reason: string | null;

  @Column({ type: 'integer', nullable: false })
  unverified_by_user_id: number;

  @Column({ type: 'text', nullable: false })
  duplicate_onboarding_reason: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({ type: 'integer', nullable: false })
  serviceable_vehicles_estimated_count: number;
}

