import { Module } from "@nestjs/common";
import { MoralisApiService } from '../services/moralis-api.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from "@nestjs/schedule";
import { SwapRate } from "../entities/swap.entity";
import { SwapRepository } from "../repositories/swap.repository"; // Import the repository
import { SwapRateService } from '../services/swap.service';
import { SwapController } from "../controllers/swap.controller";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([SwapRate]), // Add the entity associated with SwapRepository
    ScheduleModule.forRoot(),
  ],
  providers: [
    MoralisApiService,
    SwapRateService,
    SwapRepository, // Register the SwapRepository as a provider
  ],
  exports: [SwapRateService],
  controllers: [SwapController],
})
export class SwapModule {}
