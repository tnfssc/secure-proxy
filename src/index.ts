import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { EnvSchema } from "./env.js";

EnvSchema.assert(process.env);

const server = serve({
  fetch: app.fetch,
  port: 3000,
});

server.on("listening", () => {
  console.log(`> Server is running`);
});

process.on("SIGINT", () => {
  server.close();
  process.exit();
});

process.on("SIGTERM", () => {
  server.close();
  process.exit();
});
