import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from '@repo/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheConfig } from '@repo/redis'
import { TraceModule } from '@repo/tracing';
import { WarrantyModule } from './warranty/warranty.module';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),

    // OpenTelemetry Configuration
    TraceModule,

    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: config.postgres.host,
        port: config.postgres.port,
        username: config.postgres.username,
        password: config.postgres.password,
        database: config.postgres.database,
        entities: ['dist/**/entities/*.entity.js'],
        synchronize: config.postgres.synchronize,
        autoLoadEntities: true,
        extra: {
          min: 2,
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        },
      }),
    }),

   // CacheModule.registerAsync(RedisCacheConfig),
    //TypeOrmModule.forFeature([User, TpLogSmsOtp]),
    WarrantyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
