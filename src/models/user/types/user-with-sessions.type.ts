import { Session, User } from "@prisma/client";

export type TUserWithSessions = User & {
    sessions: Session[];
};
