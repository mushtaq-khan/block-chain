import { Module } from "@nestjs/common";
import { MoralisApiService } from '../services/moralis-api.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from "@nestjs/schedule";
import { EmailService } from '../services/email.service'
import { Alert } from "../entities/alerts.entity";
import { AlertService } from "../services/alert.service";
import { AlertController } from "../controllers/alert.controller";
import { AlertRepository } from "../repositories/alert.repository";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Alert]),
        ScheduleModule.forRoot(),
    ],
    providers: [
        MoralisApiService,
        EmailService,
        AlertService,
        AlertRepository,
    ],
    exports: [AlertService],
    controllers: [AlertController],
})
export class AlertModule { }