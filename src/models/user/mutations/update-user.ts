import { db } from "@/utils/db";
import { Prisma, User } from "@prisma/client";

export const updateUser = async <T = User>(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    include?: Prisma.UserInclude
) => {
    return (await db.user.update({
        where,
        data,
        include,
    })) as T;
};
