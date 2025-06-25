import { db } from "@/utils/db";
import { Prisma, User } from "@prisma/client";

export const getUser = async <T = User>(
    where: Prisma.UserWhereUniqueInput,
    include?: Prisma.UserInclude
) => {
    return (await db.user.findUnique({
        where,
        include,
    })) as T;
};
