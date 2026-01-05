import { betterAuth } from 'better-auth';
import { Pool } from '@neondatabase/serverless';
import { redirect, type AppLoadContext } from 'react-router';
import { getDb } from './db';

export function getAuth(context: AppLoadContext) {
    const env = context.cloudflare.env;

    return betterAuth({
        baseURL: env.BETTER_AUTH_URL!,
        secret: env.BETTER_AUTH_SECRET!,
    
        emailAndPassword: {
            enabled: true,
            async sendResetPassword(data, request) {
                // Send an email to the user with a link to reset their password
            },
        },
    
        database: getDb(context),
    
        session: {
            expiresIn: 60 * 60 * 24 * 7, // 7 days
            updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60, // 5 min
            }
        },
    });
}

let session: any;

export async function requireUser(request: Request, context: AppLoadContext) {
    if (!session) {
        const auth = getAuth(context);

        if (!request) {
            console.log("REQUEST IS EMPTY");
            throw redirect("/login");
        }

        const t0 = Date.now();
        session = await auth.api.getSession({
            headers: request.headers,
        });
        console.log("requireUser.getSession ms", Date.now() - t0)

        // console.log(session)

        if (!session?.user) {
            console.log("SESSION USER IS EMPTY");
            throw redirect("/login");
        }

        return session.user;
    } else {
        return session.user;
    }
}