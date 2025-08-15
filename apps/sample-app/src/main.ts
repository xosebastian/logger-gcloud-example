import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  LoggerService,
  RequestContextMiddleware,
  LoggingInterceptor,
  AllExceptionsFilter,
} from '@org/nest-gcp-logger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  app.use(new RequestContextMiddleware().use);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  return app;
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => app.listen(3000));
}
