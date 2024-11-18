import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
} from '@nestjs/common';

import { HourlyPriceHistoryService } from '../services/hourlyPriceHistory.service';
import { PriceQueryDto } from '../dto/query.dto';

@Controller('price-history')
export class HourlyPriceController {
    constructor(private hourlyPriceHistoryService: HourlyPriceHistoryService) { }

    @Get('list')
    async ListPriceHstory(
        @Res() res,
        @Query() query: PriceQueryDto
    ): Promise<any> {
        try {
            const { data, status } = await this.hourlyPriceHistoryService.fetchHourlyChainData();

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