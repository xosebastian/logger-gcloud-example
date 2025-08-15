# @org/nest-gcp-logger

Logger for NestJS applications targeting Google Cloud.

## Installation

```bash
npm install @org/nest-gcp-logger
```

## Usage

```ts
import { GcpLoggerModule } from '@org/nest-gcp-logger';

@Module({
  imports: [
    GcpLoggerModule.forRoot({ serviceName: 'my-service' }),
  ],
})
export class AppModule {}
```

See sample application in `apps/sample-app` for a complete setup.
