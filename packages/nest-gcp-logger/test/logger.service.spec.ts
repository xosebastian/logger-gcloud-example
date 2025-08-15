import { LoggerService, als } from '../src/logger.service';

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

describe('LoggerService', () => {
  it('maps severity levels', () => {
    const cap = createCapture();
    const logger = new LoggerService({ serviceName: 't', env: 'production' }, cap.stream as any);
    logger.warn('warn');
    (logger as any).logger.flush();
    expect(cap.logs[0].severity).toBe('WARNING');
  });

  it('redacts and merges context', () => {
    const cap = createCapture();
    const logger = new LoggerService({ serviceName: 't', env: 'production' }, cap.stream as any);
    als.run({ requestId: 'abc' }, () => {
      logger.log({ password: 'secret' });
    });
    (logger as any).logger.flush();
    const log = cap.logs[0];
    expect(log.requestId).toBe('abc');
    expect(log.password).toBe('[Redacted]');
  });
});
