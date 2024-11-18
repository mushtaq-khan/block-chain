import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Import from @nestjs/axios
import { lastValueFrom } from 'rxjs'; // Used to convert observable to a promise
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MoralisApiService {
  private readonly apiKey: string;
  private readonly polyAddress: string;
  private readonly ethAddress: string;
  private readonly btcAddress: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.MORALIS_API_KEY;
    this.polyAddress = process.env.POLY_ADDRESS;
    this.ethAddress = process.env.ETH_ADDRESS;
    this.btcAddress = process.env.BTC_ADDRESS;
  }

  private async fetchPolyPrice(address: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://deep-index.moralis.io/api/v2.2/erc20/${address}/price`, {
          headers: { 'X-API-Key': this.apiKey },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch price for address: ${address}`);
    }
  }

  async fetchEthPrice(address: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`, {
          headers: { 'X-API-Key': this.apiKey },
          // params: {chain: 'eth'}
        }),
      );
      
      return response.data.result.find(token => token.name === "Ether");
    } catch (error) {
      console.log(error, 'error');
      throw new Error(`Failed to fetch price for address: ${error}`);
    }
  }

  async fetchBtcPrice(address: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://deep-index.moralis.io/api/v2.2/erc20/${address}/price`, {
          headers: { 'X-API-Key': this.apiKey },
          // params: {chain: 'eth'}
        }),
      );

      return response.data;
      
    } catch (error) {
      console.log(error, 'error');
      throw new Error(`Failed to fetch price for address: ${error}`);
    }
  }

  async getPrices(chain: string[]): Promise<any[]> {
    const pricePromises = chain.map(async (chainType: string) => {
      
      if (chainType === 'polygon') {
        return this.fetchPolyPrice(this.polyAddress);
      } else if (chainType === 'eth') {
        return this.fetchEthPrice(this.ethAddress);
      }
      return null;
    });

    return await Promise.all(pricePromises);
  }
}
