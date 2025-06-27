"use server";

import {
    authenticateUser,
    createSession,
    setSessionCookie,
} from "@/utils/auth";
import {
    serverRedirectWithError,
    serverRedirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { headers } from "next/headers";

export const signinAction = async (formData: FormData) => {
    const headersList = await headers();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return serverRedirectWithError(
            urls.app.auth.signin,
            "Email and password are required"
        );
    }

    let user;
    try {
        user = await authenticateUser(email, password);
    } catch (error) {
        console.error("Authentication error:", error);
        return serverRedirectWithError(
            urls.app.auth.signin,
            "Internal server error"
        );
    }

    if (!user) {
        return serverRedirectWithError(
            urls.app.auth.signin,
            "Invalid email or password"
        );
    }

    try {
        const session = await createSession(user.id);
        await setSessionCookie(session.sessionToken);
    } catch (error) {
        console.error("Session creation error:", error);
        return serverRedirectWithError(
            urls.app.auth.signin,
            "Failed to create session"
        );
    }

    // Check for return URL from query params
    const url = new URL(headersList.get("referer") || "");
    const returnUrl = url.searchParams.get("returnUrl");

    // Redirect to return URL if valid, otherwise to role-based dashboard
    let redirectUrl: string;
    if (returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//")) {
        redirectUrl = returnUrl;
    } else {
        redirectUrl = urls.app.authed.dashboard;
    }

    return serverRedirectWithSuccess(
        redirectUrl,
        "Welcome back! You have been successfully signed in."
    );
};
