import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  chain: string;

  @Column({ type: 'decimal' })
  dollar: number;

  @Column({ type: 'varchar', length: 20, default: false })
  notified: string;

  @Column({ type: 'varchar', nullable: true })
  tokenSymbol: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'integer', default: 1 })
  status: number;
}
