import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tp_location_cities')
export class TpLocationCity{ 
    @PrimaryGeneratedColumn({ type: 'integer' })
    city_id: number;
  
    @Column({ length: 80 })
    city_name: string;
  
    @Column({ length: 255 })
    city_alias: string;
  
    @Column({ length: 100 })
    city_slug: string;
  
    @Column({ type: 'int' })
    parent_city_id: number;
  
    @Column({ type: 'smallint' })
    state_id: number;
  
    @Column({ type: 'smallint' })
    old_state_id: number;
  
    @Column({ type: 'smallint' })
    country_id: number;
  
    @Column({ type: 'smallint' })
    is_capital: number;
  
    @Column({ type: 'smallint' })
    central_city_id: number;
  
    @Column({ type: 'smallint' })
    priority: number;
  
    @Column({ length: 50 })
    city_group: string;
  
    @Column({ type: 'smallint' })
    popularity_rank: number;
  
    @Column({ length: 50 })
    city_latitude: string;
  
    @Column({ length: 50 })
    city_longitude: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    ne_lat: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    ne_lon: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    sw_lat: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    sw_lon: string;
  
    @Column({ type: 'int' })
    google_city_id: number;
  
    @Column({ type: 'smallint' })
    city_status: number;
  
    @Column({ type: 'smallint', default: 0 })
    is_deleted: number;
  
    @Column({ type: 'smallint' })
    flag: number;
  
    @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    added: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated: Date;
}