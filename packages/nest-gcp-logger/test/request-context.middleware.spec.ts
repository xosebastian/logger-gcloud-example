import { RequestContextMiddleware } from '../src/request-context.middleware';
import { als } from '../src/logger.service';

describe('RequestContextMiddleware', () => {
  it('parses trace headers and saves context', (done) => {
    const mw = new RequestContextMiddleware({ projectId: 'proj' });
    const req: any = {
      headers: {
        'x-cloud-trace-context': 'trace123/span123;o=1',
        'user-agent': 'agent',
      },
      method: 'GET',
      path: '/test',
      ip: '1.1.1.1',
    };
    mw.use(req, {} as any, () => {
      const store = als.getStore();
      expect(store?.requestId).toBeDefined();
      expect(store?.trace).toBe('projects/proj/traces/trace123');
      expect(store?.spanId).toBe('span123');
      done();
    });
  });
});
