import { clearSessionCookie } from "@/utils/auth";
import {
    redirectWithError,
    redirectWithSuccess,
} from "@/utils/redirect-with-toast";
import { urls } from "@/utils/urls";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await clearSessionCookie();
        return redirectWithSuccess(
            urls.app.auth.signin,
            "You have been successfully signed out.",
            request
        );
    } catch (error) {
        console.error("Sign out error:", error);
        return redirectWithError(
            urls.app.auth.signin,
            "There was an issue signing out, but you have been redirected.",
            request
        );
    }
};
