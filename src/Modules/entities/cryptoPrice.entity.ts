import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CryptoPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  chain: string;

  @Column({ type: 'varchar', nullable: true })
  tokenSymbol: string;

  @Column({ type: 'varchar', nullable: true })
  tokenLogo: string;

  @Column({ type: 'varchar', nullable: true })
  tokenName: string;

  @Column({ type: 'decimal' })
  price: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

