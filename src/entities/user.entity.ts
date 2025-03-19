import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tp_users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'int' })
  role_id: number;

  @Column({ type: 'varchar', length: 255 })
  anchor_retailer_user_id: string;

  @Column({ type: 'int' })
  parent_user: number;

  @Column({ type: 'int', default: 0, comment: '1-Backend access allowed' })
  backend_access_allowed: number;

  @Column({ type: 'int' })
  dealer_id: number;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  middle_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 30 })
  mobile_phone_number: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  fax_number: string;

  @Column({ type: 'int', comment: '1-Verified, 0-Unverified' })
  mobile_verified: number;

  @Column({ type: 'int', comment: '0-Non-DND Registered, 1-DND Registered' })
  dnd_status: number;

  @Column({ type: 'varchar', length: 30 })
  alternate_phone_number: string;

  @Column({ type: 'text' })
  about_me: string;

  @Column({ type: 'text' })
  profile_image: string;

  @Column({ type: 'int' })
  profile_rating: number;

  @Column({ type: 'text', comment: '1-Male, 2-Female, 3-Prefer not to say' })
  gender: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'date' })
  anniversary: Date;

  @Column({ type: 'varchar', length: 255, comment: 'User knows these languages' })
  languages: string;

  @Column({ type: 'int' })
  source_id: number;

  @Column({ type: 'int' })
  sub_source_id: number;

  @Column({ type: 'text' })
  internal_comments: string;

  @Column({ type: 'varchar', length: 255 })
  registered_from_ip: string;

  @Column({ type: 'varchar', length: 255 })
  last_signin_ip: string;

  @Column({ type: 'timestamp' })
  last_email_sent_on: Date;

  @Column({ type: 'int', comment: 'User Added by whom - 1-Admin, 2-Customer, 3-Virtual Number' })
  added_by: number;

  @Column({ type: 'int', default: 1, comment: "0=>'Bounce', 1=>'Active', 2=>'Unsubscribed'" })
  email_status: number;

  @Column({ type: 'int', default: 1, comment: '0-Inactive, 1-Active' })
  mobile_status: number;

  @Column({ type: 'text' })
  device_id: string;

  @Column({ type: 'int' })
  total_discount: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  associated_vn_agent_id: string;

  @Column({ type: 'int', comment: '1-Active, 0-Inactive' })
  status: number;

  @Column({ type: 'timestamp' })
  last_signin_time: Date;

  @Column({ type: 'int', default: 0, comment: '1-Deleted, 0- Active' })
  is_deleted: number;

  @CreateDateColumn({ type: 'timestamp' })
  added: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified: Date;
}