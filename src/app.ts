import { Hono } from "hono";
import { EnvSchema } from "./env.js";
import { logger } from "hono/logger";
import { auth } from "./auth.js";
import { env } from "hono/adapter";

export const app = new Hono()
  .use(logger())
  .use(auth())
  .all("/*", async (c) => {
    const vars = EnvSchema.assert(env(c));

    const proxyUrl = new URL(vars.PROXY_URL);
    const url = new URL(c.req.url);
    url.protocol = proxyUrl.protocol;
    url.host = proxyUrl.host;
    url.port = proxyUrl.port;

    const proxyReq = new Request(url, {
      method: c.req.method,
      headers: c.req.header(),
      body: await c.req.arrayBuffer(),
    });

    const response = await fetch(proxyReq);

    return c.newResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  });
