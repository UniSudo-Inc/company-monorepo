// src/index.test.ts
import { env } from 'cloudflare:test';
import app from './index.js';

describe('example', () => {
  it('should return 200 response', async () => {
    const res = await app.request('/health', {}, env);

    expect(res.status).toBe(200);
    expect(await res.text()).toEqual('OK');
  });
});
