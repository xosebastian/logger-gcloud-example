import { LoggingInterceptor } from '../src/logging.interceptor';
import { LoggerService } from '../src/logger.service';
import { of } from 'rxjs';

function createCapture() {
  let buf = '';
  return {
    stream: { write: (msg: string) => (buf += msg) },
    get logs() {
      return buf
        .trim()
        .split('\n')
        .filter(Boolean)
        .map((l) => JSON.parse(l));
    },
  };
}

describe('LoggingInterceptor', () => {
  it('logs latency_ms', (done) => {
    const cap = createCapture();
    const logger = new LoggerService({ serviceName: 't', env: 'production' }, cap.stream as any);
    const interceptor = new LoggingInterceptor(logger);
    const raw = (logger as any).logger;
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ route: { path: '/' }, method: 'GET' }),
        getResponse: () => ({ statusCode: 200, getHeader: () => undefined }),
      }),
    };
    interceptor
      .intercept(context, { handle: () => of(null) })
      .subscribe({
        complete: () => {
          raw.flush();
          const log = cap.logs[0];
          expect(log.event).toBe('request_completed');
          expect(log.latency_ms).toBeGreaterThanOrEqual(0);
          done();
        },
      });
  });
});
