import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL: process.env.PUBLIC_APP_URL,
    baseURL: "http://localhost:5173",
})

export const { signIn, signOut, signUp, useSession } = authClient;
