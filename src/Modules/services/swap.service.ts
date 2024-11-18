import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SwapRate } from '../entities/swap.entity';
import { MoralisApiService } from '../services/moralis-api.service';

@Injectable()
export class SwapRateService {
  private readonly btcAddress: string;
  private readonly ethAddress: string;

  constructor(
    private readonly moralisApiService: MoralisApiService,
    @InjectRepository(SwapRate)
    private readonly swapRepository: Repository<SwapRate>,
  ) {
    this.btcAddress = process.env.BTC_ADDRESS;
    this.ethAddress = process.env.ETH_ADDRESS;

    if (!this.btcAddress || !this.ethAddress) {
      throw new InternalServerErrorException(
        'Environment variables for BTC or ETH address are not defined.',
      );
    }
  }

  async calculateSwapRate(ethAmount: number): Promise<any> {
    if (!ethAmount || ethAmount <= 0) {
      throw new BadRequestException('Invalid Ethereum amount. It must be greater than 0.');
    }

    try {
      const ethPrice = await this.moralisApiService.fetchEthPrice(this.ethAddress);
      const btcPrice = await this.moralisApiService.fetchBtcPrice(this.btcAddress);

      if (!ethPrice?.usd_price || !btcPrice?.usdPrice) {
        throw new InternalServerErrorException(
          'Failed to fetch cryptocurrency prices. Please try again later.',
        );
      }

      const ethToUsdRate = ethPrice.usd_price;
      const btcToUsdRate = btcPrice.usdPrice;
      
      const ethToBtcRate = ethToUsdRate / btcToUsdRate;

      const feePercentage = 0.03; 
      const ethFee = ethAmount * feePercentage;
      const usdFee = ethFee * ethToUsdRate;

      const usableEth = ethAmount - ethFee;
      const btcAmount = usableEth * ethToBtcRate;

      const swapRate = this.swapRepository.create({
        ethAmount,
        btcAmount,
        ethFee,
        feePercentage,
      });

      await this.swapRepository.save(swapRate);

      return {
        btcAddress: this.btcAddress,
        btcAmount: parseFloat(btcAmount.toFixed(8)),
        ethFee: parseFloat(ethFee.toFixed(8)),
        usdFee: parseFloat(usdFee.toFixed(2)),
      };
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new InternalServerErrorException('Database operation failed.');
      }

      console.error('Unexpected error during swap rate calculation:', error);
      throw new InternalServerErrorException(
        'An unexpected error occurred while calculating the swap rate. Please try again later.',
      );
    }
  }
}
