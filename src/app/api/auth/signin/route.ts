import {
    authenticateUser,
    createSession,
    setSessionCookie,
} from "@/utils/auth";
import {
    redirectWithError,
    redirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return redirectWithError(
            urls.app.auth.signin,
            "Email and password are required",
            request
        );
    }

    let user;
    try {
        user = await authenticateUser(email, password);
    } catch (error) {
        console.error("Authentication error:", error);
        return redirectWithError(
            urls.app.auth.signin,
            "Internal server error",
            request
        );
    }

    if (!user) {
        return redirectWithError(
            urls.app.auth.signin,
            "Invalid email or password",
            request
        );
    }

    try {
        const session = await createSession(user.id);
        await setSessionCookie(session.sessionToken);
    } catch (error) {
        console.error("Session creation error:", error);
        return redirectWithError(
            urls.app.auth.signin,
            "Failed to create session",
            request
        );
    }

    // Check for return URL from query params
    const url = new URL(request.headers.get("referer") || "");
    const returnUrl = url.searchParams.get("returnUrl");

    // Redirect to return URL if valid, otherwise to role-based dashboard
    let redirectUrl: string;
    if (returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//")) {
        redirectUrl = returnUrl;
    } else {
        redirectUrl = urls.app.home;
    }

    return redirectWithSuccess(
        redirectUrl,
        "Welcome back! You have been successfully signed in.",
        request
    );
};
