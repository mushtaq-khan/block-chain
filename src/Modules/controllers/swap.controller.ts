import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SwapRateService } from '../services/swap.service';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapRateService: SwapRateService) {}

  @Post('rate')
  async getSwapRate(@Body() body: { ethAmount: number }) {
    try {
      if (!body || typeof body.ethAmount !== 'number') {
        throw new BadRequestException('Invalid request body. `ethAmount` is required and must be a number.');
      }

      return await this.swapRateService.calculateSwapRate(body.ethAmount);
    } catch (error) {
      console.error('Error in SwapController.getSwapRate:', error);
      throw error;
    }
  }
}
