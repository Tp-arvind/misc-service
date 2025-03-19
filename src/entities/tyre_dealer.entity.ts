import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum InvoiceOrientation {
  LANDSCAPE = 'L',
  PORTRAIT = 'P',
}

@Entity('tp_tyre_dealers')
export class TpTyreDealer {
  @PrimaryGeneratedColumn({ type: 'integer' })
  dealer_id: number;

  @Column({ type: 'smallint', nullable: false })
  make_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  dealer_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  dealer_slug: string;

  @Column({ type: 'boolean', nullable: false })
  is_b2b: boolean;

  @Column({ type: 'boolean', default: false })
  is_b2b_auto: boolean;

  @Column({ type: 'integer', nullable: false })
  city_id: number;

  @Column({ type: 'integer', nullable: false })
  pin_code: number;

  @Column({ type: 'boolean', default: false })
  partner_store: boolean;

  @Column({ type: 'boolean', nullable: false })
  active_for_lead_campaign: boolean;

  @Column({ type: 'integer', nullable: false, comment: 'e.g. 2 Make ID is for CEAT Shoppe, or for MRF Exclusive etc.' })
  make_id_of_exclusive_brand_store: number;

  @Column({ type: 'boolean', default: true })
  send_invoice_sms: boolean;

  @Column({ type: 'enum', enum: InvoiceOrientation, default: InvoiceOrientation.LANDSCAPE })
  invoice_orientation: InvoiceOrientation;

  @Column({ type: 'integer', default: 0 })
  tyre_percentage: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  base_invoice_string: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  base_invoice_number: string | null;

  @Column({ type: 'varchar', length: 50, nullable: false })
  contact_person: string;

  @Column({ type: 'integer', nullable: false })
  old2_city_id: number;

  @Column({ type: 'integer', nullable: false })
  wheel_alignment_charges: number;

  @Column({ type: 'integer', nullable: false })
  wheel_balancing_charges: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city_name: string;

  @Column({ type: 'integer', nullable: false })
  old_city_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  longitude: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  latitude: string;

  @Column({ type: 'varchar', length: 12, nullable: false })
  mobile: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  virtual_number: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  fax: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  organization: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  dealer_address: string;

  @Column({ type: 'text', nullable: false })
  old_dealer_address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email_id: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'boolean', default: true })
  bnpl_status: boolean;

  @Column({ type: 'boolean', default: false })
  kyc_verified: boolean;

  @Column({ type: 'integer', nullable: false })
  popularity_rank: number;

  @Column({ type: 'text', nullable: false })
  gmb_link: string;

  @Column({ type: 'text', nullable: false })
  map_link: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  dealer_invoice_name: string;

  @Column({ type: 'text', nullable: false })
  dealer_t_c: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  dealer_logo: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @Column({ type: 'text', nullable: false })
  raw_data: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  raw_state_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  raw_city_name: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  invoice_labelling: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  dealer_cin: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  dealer_signature: string;

  @Column({ type: 'integer', nullable: false })
  review_rating_count: number;

  @Column({ type: 'numeric', precision: 2, scale: 1, nullable: false })
  review_rating_average: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  flag: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  verified_on: Date | null;

  @Column({ type: 'integer', default: 0 })
  repayment_period_out: number;

  @Column({ type: 'integer', default: 0 })
  credit_period_in: number;

  @Column({ type: 'bigint', nullable: false })
  credit_amount_limit: number;

  @Column({ type: 'boolean', default: false })
  communication_enabled: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified: Date;
}

