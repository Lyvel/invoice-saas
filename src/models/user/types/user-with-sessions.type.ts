import { Session } from "@prisma/client";
import { TUser } from "./user.type";

export type TUserWithSessions = TUser & {
    sessions: Session[];
};
