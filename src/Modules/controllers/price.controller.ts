import {
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Query,
    Res,
} from '@nestjs/common';

import { ChainService } from '../services/price.service';
import { PriceQueryDto } from '../dto/query.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Chain')
@Controller('crypto-price')
export class ChainController {
    constructor(private chainService: ChainService) { }

    @Post('save')
    @ApiOperation({ summary: 'Save chain data for a cryptocurrency' })
    @ApiQuery({
      name: 'type',
      type: String,
      description: 'Type of data update (e.g., EVERY_HOUR_OF_DAY, EVERY_5_MIN)',
      required: false,
      example: 'EVERY_5_MIN',
    })
  
    async savePrice(
        @Res() res,
        @Query() query: PriceQueryDto
    ): Promise<any> {
        try {
            const type =query.type || "EVERY_5_MIN"
            const { data, status } = await this.chainService.saveChainData(type);

            if (status == 1) {
                return res.status(HttpStatus.OK).json({
                    message: 'Chain data saved successfully!',
                    status: 1,
                    result: data,
                });
            } else if (status == 2) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: `.`,
                    status: 0,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: `Something went wrong, please check logs`,
                    status: 0,
                });
            }
        } catch (error) {
            throw new HttpException(
                `Sorry! Something went wrong while getting chain data, ${error.message}`,
                error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
