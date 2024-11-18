import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  console.log('Registered Entities:', dataSource.entityMetadatas.map(meta => meta.name));
  const config = new DocumentBuilder()
    .setTitle('Blockchain Price Tracker & Alert System')
    .setDescription('API documentation for Blockchain Price Tracker & Alert System')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
