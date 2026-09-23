import { describe, it, expect } from 'vitest';
import { buildApp } from './app';


describe('Fastify Application Setup', () => {
  it('GET /health should return 200 and status ok', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/health'
    });
    console.log('🤖 app.test.ts 🤖')

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.status).toBe('ok')
    expect(body).toHaveProperty('timestamp')
  })
})