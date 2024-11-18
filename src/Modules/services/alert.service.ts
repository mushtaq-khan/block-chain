import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoralisApiService } from '../services/moralis-api.service';
import { EmailService } from './email.service';
import { AlertRepository } from '../repositories/alert.repository';
import { AlertDto } from '../dto/alert.dto';

@Injectable()
export class AlertService {
    constructor(
        private readonly moralisApiService: MoralisApiService,
        private readonly emailService: EmailService,
        private readonly alertRepository: AlertRepository
    ) { }

    async setAlert(data: AlertDto) {
        const { chain, dollar } = data;
        await this.alertRepository.saveAlert(data);
        return { message: `Alert set for ${chain} at $${dollar}` };
    }

    @Cron('*/10 * * * * *')
    async checkAlerts() {
        try {
            const alerts = await this.alertRepository.findAlerts({ where: { notified: false } });

            if(!alerts || alerts.length === 0){
                return {
                    status: 1,
                    message: 'No alerts to check',
                    data: alerts
                }
            }

            const chains = alerts.map(alert => alert.chain);

            const prices = await this.moralisApiService.getPrices(chains);
            for (const alert of alerts) {

                const price = prices.find(p => p?.tokenSymbol === alert?.tokenSymbol || p?.symbol === alert.tokenSymbol);

                if (price) {
                    const dollar = price?.usdPrice || price?.usd_price

                    if (dollar === alert.dollar) {
                        const email = alert?.email || process.env.DEDEFAULT_EMAIL;

                        await this.emailService.sendEmail(
                            email,
                            `Price Alert: ${alert.chain} Reached $${alert.dollar}!`,
                            `This is a notification that the price for ${alert.chain} has reached your set threshold of $${alert.dollar}.`
                        );

                        await this.alertRepository.updateAlert(
                            { id: alert.id },
                            { notified: true }
                        );
                    }
                }
            }
        } catch (error) {
            console.error('Error in checkAlerts method:', error.message);
        }
    }
}
