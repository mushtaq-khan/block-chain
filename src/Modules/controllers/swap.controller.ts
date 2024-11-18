import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SwapRateService } from '../services/swap.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwapRateDto } from '../dto/query.dto';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapRateService: SwapRateService) {}

  @Post('rate')
  @ApiOperation({ summary: 'Get the swap rate for a given ETH amount' })
  @ApiBody({
    description: 'The ETH amount to calculate the swap rate',
    type: SwapRateDto,
  })
  @ApiResponse({ status: 200, description: 'Successfully calculated swap rate' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  async getSwapRate(@Body() body: SwapRateDto) {
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
