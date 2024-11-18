import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourlyPriceHistoryRepository } from "../repositories/priceHourlyHistory.repository"
import { HourlyPriceHistory } from "../entities/hourlyPriceHistory.entity";
import { HourlyPriceHistoryService } from '../services/hourlyPriceHistory.service';
import { HourlyPriceController } from "../controllers/hourlyPriceHistory.controller";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([HourlyPriceHistory]),
    ],
    providers: [
        HourlyPriceHistoryService ,
        HourlyPriceHistoryRepository
    ],
    exports: [HourlyPriceHistoryService],
    controllers: [HourlyPriceController],
})
export class HourlyPriceHistoryModule { }