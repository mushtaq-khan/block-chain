import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoPrice } from '../entities/cryptoPrice.entity';

@Injectable()
export class PriceRepository {
    constructor(
        @InjectRepository(CryptoPrice)
        private readonly priceRepository: Repository<CryptoPrice>,
    ) { }

    async savePrice(priceData: Partial<CryptoPrice>): Promise<CryptoPrice> {
        try{
            return this.priceRepository.save(priceData);
        }catch(err){
            console.log(err);
            throw new Error('Failed to save price data');  
        }
    }
}

