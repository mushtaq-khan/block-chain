import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MoralisApiService } from './moralis-api.service';
import { PriceRepository } from '../repositories/price.repository';
import { Cron } from '@nestjs/schedule';
import { ChainType } from '../types/chain.types';
import {HourlyPriceHistoryRepository} from '../repositories/priceHourlyHistory.repository';
import { EmailService } from './email.service';


@Injectable()
export class ChainService {
  constructor(
    private readonly moralisApiService: MoralisApiService,
    private readonly priceRepository: PriceRepository,
    private readonly hourlyPriceHistoryRepository: HourlyPriceHistoryRepository,
    private readonly emailService: EmailService,
  ) {}

  private calculatePercentageIncrease(oldPrice: number, newPrice: number): number {
    return ((newPrice - oldPrice) / oldPrice) * 100;
  }

  async saveChainData(type: string): Promise<any> {
    try {
      const chain: ChainType[] = ['polygon', 'eth'];
      const chainData = await this.moralisApiService.getPrices(chain);

      if (!chainData || chainData.length === 0) {
        return {
          status: 2,
          message: 'Failed to fetch price from Moralis API',
        };
      }

      const savedData = await Promise.all(
        chainData.map(async (data, index) => {
          const { tokenName, tokenSymbol, tokenLogo, usdPrice, usd_price, name, symbol, logo } = data;
          
          const body = {
            chain: tokenName ? 'POLYGON' : 'ETH',
            tokenName: tokenName || name,
            tokenSymbol: tokenSymbol || symbol,
            tokenLogo: tokenLogo || logo,
            price: usdPrice || usd_price
          };

        let priceData;
          if(type === "EVERY_5_MIN"){
            priceData = await this.priceRepository.savePrice(body);
          }else if(type === "EVERY_HOUR_OF_DAY"){
            delete body.tokenName
            delete body.tokenSymbol
            delete body.tokenLogo
            priceData= await this.hourlyPriceHistoryRepository.saveHourlyPrice(body)
          }else {
            throw new Error(`Unsupported type: ${type}`);
          }

          if(type === "EVERY_HOUR_OF_DAY"){
            const previousPriceData = await this.hourlyPriceHistoryRepository.findHourlyPrice({
              where: { chain: body.chain, timestamp: { $lt: new Date() } },
              order: { timestamp: 'DESC' },
              take: 1,
            });
  
            if (previousPriceData && previousPriceData.length > 0) {
              const previousPrice = previousPriceData[0].price;
              const percentageIncrease = this.calculatePercentageIncrease(previousPrice, body.price);
  
              if (percentageIncrease > 3) {
                await this.emailService.sendEmail(
                  'hyperhire_assignment@hyperhire.in',
                  `Price Increase Alert for ${body.chain}`,
                  `The price of ${body.chain} has increased by ${percentageIncrease.toFixed(2)}% compared to the price one hour ago.`,
                );
              }
            }
          }
          return priceData;
        }),
      );

      if (savedData && savedData.length > 0) {
        return {
          status: 1,
          message: 'Chain data saved successfully',
          data: savedData,
        };
      } else {
        return {
          status: 2,
          message: 'Failed to save chain data',
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Cron('*/5 * * * *')
  async handleCron(): Promise<void> {
    try {
      const type = "EVERY_5_MIN"
      await this.saveChainData(type);
    } catch (error) {
      console.error('Error during scheduled task execution:', error.message);
    }
  }

  @Cron('0 * * * *')
  async hourlyHandleCron(): Promise<void> {
    try {
      const type = "EVERY_HOUR_OF_DAY"
      await this.saveChainData(type);
    } catch (error) {
      console.error(`Error during scheduled task execution:`, error.message);
    }
  }
}