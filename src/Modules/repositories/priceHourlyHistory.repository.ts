import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HourlyPriceHistory } from '../entities/hourlyPriceHistory.entity';

@Injectable()
export class HourlyPriceHistoryRepository {
    constructor(
        @InjectRepository(HourlyPriceHistory)
        private readonly hourlyPriceHistoryRepository: Repository<HourlyPriceHistory>,
    ) { }

    async saveHourlyPrice(HourlyPriceeData: Partial<HourlyPriceHistory>): Promise<HourlyPriceHistory> {
        try {
            return this.hourlyPriceHistoryRepository.save(HourlyPriceeData);
        } catch (err) {
            console.log(err);
            throw new Error('Failed to save price data');
        }
    }

    async findHourlyPrice(a): Promise<HourlyPriceHistory[]> {
        try {
            return await this.hourlyPriceHistoryRepository.find(a);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch hourly price data');
        }
    }
}