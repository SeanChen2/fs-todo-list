import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { redirect } from 'react-router';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {
            // Send an email to the user with a link to reset their password
        },
    },

    database: new Pool({
        connectionString: process.env.DB_URL as string,
    }),

    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        // cookieCache: {
        //     enabled: true,
        //     maxAge: 5 * 60, // 5 min
        // }
    },

    /** if no database is provided, the user data will be stored in memory.
     * Make sure to provide a database to persist user data **/
});

export async function requireUser(request: Request) {
    if (!request) {
        console.log("REQUEST IS EMPTY");
        throw redirect("/login");
    }

    const session = await auth.api.getSession({
        headers: request.headers,
    });

    console.log(session)

    if (!session?.user) {
        console.log("SESSION USER IS EMPTY");
        throw redirect("/login");
    }

    return session.user;
}