import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HourlyPriceHistoryRepository } from '../repositories/priceHourlyHistory.repository'
import { HourlyPriceResponseDto } from '../dto/hourlyPriceResponse.dto';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class HourlyPriceHistoryService {
    constructor(
        private readonly hourlyPriceHistoryRepository: HourlyPriceHistoryRepository,
    ) { }

    async fetchHourlyChainData(): Promise<HourlyPriceResponseDto> {
        try {
            const twentyFourHoursAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

            const ethereumHistory = await this.hourlyPriceHistoryRepository.findHourlyPrice({
                where: { chain: 'ETH', timestamp: MoreThanOrEqual(twentyFourHoursAgo) },
                order: { timestamp: 'ASC' },
            });

            const polygonHistory = await this.hourlyPriceHistoryRepository.findHourlyPrice({
                where: { chain: 'POLYGON', timestamp: MoreThanOrEqual(twentyFourHoursAgo) },
                order: { timestamp: 'ASC' },
            });

            if (ethereumHistory || polygonHistory) {
                return {
                    status: 1,
                    message: 'Hourly price history reterived successfully',
                    data: { ethereumHistory, polygonHistory },
                };
            } else {
                return {
                    status: 2,
                    message: 'Failed to retrieve hourly price history'
                };
            }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}