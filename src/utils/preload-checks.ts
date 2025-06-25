import { getUser } from "@/models/user/queries/get-user";
import { TUserWithSessions } from "@/models/user/types/user-with-sessions.type";
import { Prisma, User } from "@prisma/client";
import { createHash } from "crypto";
import { getSessionFromCookie } from "./auth";
import {
    serverRedirectWithError,
    serverRedirectWithErrorAndClearSession,
} from "./redirect-with-toast";
import { urls } from "./urls";

export const preloadChecks = async <T extends User = User>(
    include?: Prisma.UserInclude
) => {
    const cookieUser = await getSessionFromCookie();
    if (!cookieUser) {
        return serverRedirectWithErrorAndClearSession(
            urls.app.auth.signin,
            "Please sign in"
        );
    }
    const authedUser = await getUser<TUserWithSessions>(
        { id: cookieUser.id },
        { sessions: true }
    );
    if (!authedUser) {
        return serverRedirectWithError(urls.app.auth.signin, "Please sign in");
    }
    const user = await getUser({ id: authedUser.id }, include);
    if (!user) {
        return serverRedirectWithError(
            urls.app.auth.signin,
            "Something went wrong"
        );
    }

    // Get Gravatar
    const gravatar = await getGravatar(user.email);

    return { ...user, gravatar } as T & { gravatar: string | null };
};

const getGravatar = async (email: string) => {
    const hash = createHash("sha256").update(email).digest("hex");
    const url = `https://api.gravatar.com/v3/profiles/${hash}`;
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data.avatar_url;
};
