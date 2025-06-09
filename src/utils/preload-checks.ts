import { getUser } from "@/models/user/queries/get-user";
import { TUserWithSessions } from "@/models/user/types/user-with-sessions.type";
import { Prisma } from "@prisma/client";
import { getSessionFromCookie } from "./auth";
import { serverRedirectWithError } from "./redirect-with-toast";
import { urls } from "./urls";

export const preloadChecks = async <T>(include?: Prisma.UserInclude) => {
    const cookieUser = await getSessionFromCookie();
    if (!cookieUser) {
        return serverRedirectWithError(urls.app.auth.signin, "Please sign in");
    }
    const authedUser = await getUser<TUserWithSessions>(
        { id: cookieUser.id },
        { sessions: true }
    );
    if (!authedUser) {
        return serverRedirectWithError(urls.app.auth.signin, "Please sign in");
    }
    const user = await getUser<T>({ id: authedUser.id }, include);
    if (!user) {
        return serverRedirectWithError(
            urls.app.auth.signin,
            "Something went wrong"
        );
    }
    return user;
};
