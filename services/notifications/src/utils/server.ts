import fastify from "fastify";

export function createServer() {
  const app = fastify({ logger: true });

  return app;
}
