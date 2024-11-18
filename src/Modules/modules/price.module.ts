import { Module } from "@nestjs/common";
import { ChainService } from "../services/price.service";
import { ChainController } from "../controllers/price.controller";
import { MoralisApiService } from '../services/moralis-api.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPrice } from '../entities/cryptoPrice.entity';
import { PriceRepository } from '../repositories/price.repository';
import { ScheduleModule } from "@nestjs/schedule";
import { HourlyPriceHistoryRepository } from "../repositories/priceHourlyHistory.repository"
import { HourlyPriceHistory } from "../entities/hourlyPriceHistory.entity";
import { EmailService } from '../services/email.service'

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([CryptoPrice, HourlyPriceHistory]), // Register the Price entity
        ScheduleModule.forRoot(),
    ],
    providers: [
        ChainService,
        MoralisApiService,
        PriceRepository, // Register PriceRepository for dependency injection
        HourlyPriceHistoryRepository,
        EmailService
    ],
    exports: [ChainService],
    controllers: [ChainController],
})
export class PriceModule { }