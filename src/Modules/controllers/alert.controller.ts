import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AlertService } from '../services/alert.service';
import { AlertDto } from '../dto/alert.dto'
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('alert')
export class AlertController {
    constructor(private readonly alertService: AlertService) { }

    @Post('set')
    @ApiOperation({ summary: 'Set an alert for a specific blockchain and dollar value' })
    @ApiBody({ type: AlertDto })
    async setAlert(@Body() body: AlertDto) {
        try {
            const response = await this.alertService.setAlert(body);
            return {
                status: HttpStatus.CREATED,
                message: response.message,
            };
        } catch (error) {
            console.error('Error in setAlert:', error.message);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Failed to set alert. Please try again later.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
