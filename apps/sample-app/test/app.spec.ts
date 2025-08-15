import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  LoggerService,
  RequestContextMiddleware,
  LoggingInterceptor,
  AllExceptionsFilter,
} from '@org/nest-gcp-logger';

describe('sample-app', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication({ bufferLogs: true });
    const logger = app.get(LoggerService);
    app.useLogger(logger);
    app.use(new RequestContextMiddleware().use);
    app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.useGlobalFilters(new AllExceptionsFilter(logger));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ping', () => request(app.getHttpServer()).get('/ping').expect(200).expect({ ok: true }));
  it('/error', () => request(app.getHttpServer()).get('/error').expect(500));
  it('/latency', () => request(app.getHttpServer()).get('/latency?ms=5').expect(200));
});
