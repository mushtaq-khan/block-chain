import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceModule } from './Modules/modules/price.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HourlyPriceHistoryModule } from './Modules/modules/hourlyPriceHistory.module';
import { AlertModule } from './Modules/modules/alert.Module';
import { SwapModule } from './Modules/modules/swap.Module';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Adjust this path if needed
      synchronize: true,
    }),
    PriceModule,
    HourlyPriceHistoryModule,
    AlertModule,
    SwapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
