import { timeStamp } from "console";
import Fastify, { type FastifyInstance, } from "fastify";
import { uptime } from "process";


export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),

    }
  });
  return app;
}


