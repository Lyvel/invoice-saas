"use server";

import { createSession, createUser, setSessionCookie } from "@/utils/auth";
import {
    serverRedirectWithError,
    serverRedirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";

export const registerAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
        return serverRedirectWithError(
            urls.app.auth.register,
            "All fields are required"
        );
    }

    if (password !== confirmPassword) {
        return serverRedirectWithError(
            urls.app.auth.register,
            "Passwords do not match"
        );
    }

    if (password.length < 8) {
        return serverRedirectWithError(
            urls.app.auth.register,
            "Password must be at least 8 characters long"
        );
    }

    let user;
    try {
        user = await createUser(email, password, name);
    } catch (error) {
        console.error("User creation error:", error);
        if (error instanceof Error && error.message === "User already exists") {
            return serverRedirectWithError(
                urls.app.auth.register,
                "An account with this email already exists"
            );
        } else {
            return serverRedirectWithError(
                urls.app.auth.register,
                "Failed to create user account"
            );
        }
    }

    try {
        const session = await createSession(user.id);
        await setSessionCookie(session.sessionToken);
    } catch (error) {
        console.error("Session creation error:", error);
        return serverRedirectWithError(
            urls.app.auth.register,
            "Failed to create session"
        );
    }
    const redirectUrl = urls.app.authed.setup.garageName;

    return serverRedirectWithSuccess(
        redirectUrl,
        "Account created successfully! Welcome!"
    );
};
