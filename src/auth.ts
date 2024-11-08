import { createMiddleware } from "hono/factory";
import { EnvSchema } from "./env.js";
import { env } from "hono/adapter";

export const auth = () =>
  createMiddleware(async (c, next) => {
    const vars = EnvSchema.assert(env(c));

    const [bearer, authToken] = c.req.header("Authorization")?.split(" ") ?? ([undefined, undefined] as const);
    if (bearer !== "Bearer" || authToken !== vars.AUTH_TOKEN) return c.newResponse("Unauthorized", 403);

    await next();
  });
