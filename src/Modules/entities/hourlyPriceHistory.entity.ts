import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class HourlyPriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  chain: string;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  price: number;

  @CreateDateColumn()
  timestamp: Date;
}
