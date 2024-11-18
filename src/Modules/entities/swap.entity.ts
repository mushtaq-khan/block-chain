import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("swap_rate")
export class SwapRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "decimal", nullable: true})
  ethAmount: number; 

  @Column({type: "decimal", nullable: true})
  btcAmount: number;

  @Column({type: "decimal", nullable: true})
  ethFee: number;

  @Column({type: "decimal", nullable: true} )
  usdFee: number; // Fee in USD

  @Column({type: "decimal", nullable: true} )
  feePercentage: number; // Fee percentage

  @CreateDateColumn()
  createdAt: Date; // Timestamp for the swap creation
}
