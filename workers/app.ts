import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const start = Date.now();
    try {
      const res = await requestHandler(request, { cloudflare: { env, ctx } });
      console.log("TOTAL ms", Date.now() - start, request.method, new URL(request.url).pathname, res.status);
      return res;
    } catch (e) {
      console.log("TOTAL ms (error)", Date.now() - start, request.method, new URL(request.url).pathname);
      throw e;
    }

  },
} satisfies ExportedHandler<Env>;
