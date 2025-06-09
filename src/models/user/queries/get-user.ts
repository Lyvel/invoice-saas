import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

export const getUser = async <T>(
    where: Prisma.UserWhereUniqueInput,
    include?: Prisma.UserInclude
): Promise<T | null> => {
    const user = await db.user.findUnique({
        where,
        include,
    });
    return user as T;
};
