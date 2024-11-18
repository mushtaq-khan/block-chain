import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from '../entities/alerts.entity';
import { AlertDto } from '../dto/alert.dto'

@Injectable()
export class AlertRepository {
    constructor(
        @InjectRepository(Alert)
        private readonly alertRepository: Repository<Alert>,
    ) { }

    async saveAlert(data: Partial<Alert>): Promise<Alert> {
        try {
            return this.alertRepository.save(data);
        } catch (err) {
            console.log(err);
            throw new Error('Failed to save alerts');
        }
    }

    async findAlerts(query): Promise<AlertDto[]> {
        try {
            return await this.alertRepository.find(query);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch hourly price data');
        }
    }

    async updateAlert(query, data): Promise<any> {
        try {
            return await this.alertRepository.update(query, data);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch hourly price data');
        }
    }
}