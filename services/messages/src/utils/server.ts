import fastify from "fastify";
import { routes } from "../routes";

export function createServer() {
  const app = fastify({ logger: true });

  app.register(routes, { prefix: "/api/v1/messages" });

  return app;
}
