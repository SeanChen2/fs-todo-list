import { Pool } from "@neondatabase/serverless";
import type { AppLoadContext } from "react-router";

export function getDb(context: AppLoadContext) {
    const env = context.cloudflare.env;
    return new Pool({ connectionString: env.DB_URL })
}