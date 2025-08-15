import { Module } from '@nestjs/common';
import { AppController } from './controllers/sample.controller';
import { GcpLoggerModule } from '@org/nest-gcp-logger';

@Module({
  imports: [
    GcpLoggerModule.forRoot({ serviceName: 'sample-app' }),
  ],
  controllers: [AppController],
})
export class AppModule {}
