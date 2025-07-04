import { db } from "@/utils/db";
import { Customer, Prisma } from "@prisma/client";

export const getCustomer = async <T = Customer>(
    where: Prisma.CustomerWhereInput,
    include?: Prisma.CustomerInclude
) => {
    return (await db.customer.findFirst({
        where,
        include,
    })) as T;
};
