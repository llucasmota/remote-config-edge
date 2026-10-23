import { buildApp } from "./app.js";

export const VERSION = '1.0.0';

const app = buildApp();

const PORT = Number(process.env.PORT) || 3000;


app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running on ${address}`);
});