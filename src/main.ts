import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api');

  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: 4000,
  //   },
  // });
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
