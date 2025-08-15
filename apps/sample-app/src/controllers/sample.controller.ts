import { Controller, Get, Post, Body, Query, HttpException } from '@nestjs/common';
import { LoggerService, LogContext } from '@org/nest-gcp-logger';

@Controller()
export class AppController {
  constructor(private readonly logger: LoggerService) {}

  @Get('ping')
  ping() {
    return { ok: true };
  }

  @Get('error')
  error() {
    throw new HttpException('boom', 500);
  }

  @Get('latency')
  async latency(@Query('ms') ms = '0') {
    const wait = parseInt(ms, 10);
    await new Promise((r) => setTimeout(r, wait));
    return { latency_ms: wait };
  }

  @Post('echo')
  @LogContext({ endpoint: 'echo' })
  echo(@Body() body: any) {
    this.logger.log({ event: 'echo', body });
    return body;
  }
}
