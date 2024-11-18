import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SwapRate } from '../entities/swap.entity';

@Injectable()
export class SwapRepository {
    constructor(
        @InjectRepository(SwapRate)
        private readonly swapRepository: Repository<SwapRate>,
    ) { }

    async savePrice(swapData: Partial<SwapRate>): Promise<SwapRate> {
        try {
            return this.swapRepository.save(swapData);
        } catch (err) {
            console.log(err);
            throw new Error('Failed to save price data');
        }
    }
}