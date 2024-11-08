import { type } from "arktype";

export const EnvSchema = type({
  PROXY_URL: "string.url",
  AUTH_TOKEN: "string",
});
