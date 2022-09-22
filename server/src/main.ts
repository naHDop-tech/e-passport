import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  const config: ConfigService = app.get(ConfigService);

  await app.listen(config.get<string>('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
