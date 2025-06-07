import { createSession, createUser, setSessionCookie } from "@/utils/auth";
import {
    redirectWithError,
    redirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
        return redirectWithError(
            urls.app.auth.register,
            "All fields are required",
            request
        );
    }

    if (password !== confirmPassword) {
        return redirectWithError(
            urls.app.auth.register,
            "Passwords do not match",
            request
        );
    }

    if (password.length < 6) {
        return redirectWithError(
            urls.app.auth.register,
            "Password must be at least 6 characters long",
            request
        );
    }

    let user;
    try {
        user = await createUser(email, password, name);
    } catch (error) {
        console.error("User creation error:", error);
        if (error instanceof Error && error.message === "User already exists") {
            return redirectWithError(
                urls.app.auth.register,
                "An account with this email already exists",
                request
            );
        } else {
            return redirectWithError(
                urls.app.auth.register,
                "Failed to create user account",
                request
            );
        }
    }

    try {
        const session = await createSession(user.id);
        await setSessionCookie(session.sessionToken);
    } catch (error) {
        console.error("Session creation error:", error);
        return redirectWithError(
            urls.app.auth.register,
            "Failed to create session",
            request
        );
    }
    const redirectUrl = urls.app.home;

    return redirectWithSuccess(
        redirectUrl,
        "Account created successfully! Welcome!",
        request
    );
};
