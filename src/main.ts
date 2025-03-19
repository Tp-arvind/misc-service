import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import config from '@repo/config';
import { initializeTracing, shutdownTracing } from '@repo/tracing';
import { Logger } from 'nestjs-pino';

async function bootstrap() {

  const otelSDK = initializeTracing(config.serviceName);
  await otelSDK.start();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.serviceName,
          brokers: [config.kafka.host1, config.kafka.host2, config.kafka.host3],
          requestTimeout: 30000,
          retry: {
            initialRetryTime: 500,
            retries: 10
          }
        },
        consumer: {
          groupId: 'misc-service-consumer',
          sessionTimeout: 30000,
          heartbeatInterval: 3000
        }
      },
    },
  );

  // app.useLogger(app.get(Logger));

  app.enableShutdownHooks();


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );


  // const logger = app.get(Logger);

  await app.listen();
  // logger.log('🚀 Misc Microservice is running');
  console.log('🚀 Misc Microservice is running')

  const signals = ['SIGTERM', 'SIGINT'];
  signals.forEach(signal => {
    process.on(signal, async () => {
      await app.close();
      await shutdownTracing(otelSDK);
      process.exit(0);
    });
  });
}
bootstrap();
